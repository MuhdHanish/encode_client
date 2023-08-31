/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
  Constants,
} from "@videosdk.live/react-sdk";
import Hls from "hls.js";

import { authToken, createMeeting } from "../../api/videoSdkApi";
import ReactPlayer from "react-player";

interface JoinScreen {
  getMeetingAndToken: (value: string) => void;
  setMode: (value: "CONFERENCE" | "VIEWER") => void;
}

const JoinScreen:React.FC<JoinScreen> = ({ getMeetingAndToken, setMode }) => {
  const [meetingId, setMeetingId] = useState<string|null>(null);
  //Set the mode of joining participant and set the meeting id or generate new one
  const onClick = async (mode: "CONFERENCE" | "VIEWER") => {
    setMode(mode);
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await getMeetingAndToken(meetingId as string);
  };
  return (
    <div className="bg-white w-full h-full align-baseline">
      <button onClick={() => onClick("CONFERENCE")}>Create Meeting</button>
      <br />
      <br />
      {" or "}
      <br />
      <br />
      <input
        type="text"
        placeholder="Enter Meeting Id"
        value={meetingId ? meetingId : ""}
        onChange={(e) => {
          setMeetingId(e.target.value);
        }}
      />
      <br />
      <br />
      <button className="border" onClick={() => onClick("CONFERENCE")}>Join as Host</button>
      {" | "}
      <button className="border" onClick={() => onClick("VIEWER")}>Join as Viewer</button>
    </div>
  );
}

interface ParticipantView {
  participantId: string
}

const ParticipantView: React.FC<ParticipantView> = (props) => {
 const micRef = useRef<HTMLAudioElement|null>(null);
 const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
   useParticipant(props.participantId);

  const videoStream = useMemo(() => {
   if (webcamOn && webcamStream) {
     const mediaStream = new MediaStream();
     mediaStream.addTrack(webcamStream.track);
     return mediaStream;
   }
 }, [webcamStream, webcamOn]);

 //Playing the audio in the <audio>
 useEffect(() => {
   if (micRef.current) {
     if (micOn && micStream) {
       const mediaStream = new MediaStream();
       mediaStream.addTrack(micStream.track);
       micRef.current.srcObject = mediaStream;
       micRef.current
         .play()
         .catch((error) =>
           console.error("videoElem.current.play() failed", error)
         );
     } else {
       micRef.current.srcObject = null;
     }
   }
 }, [micStream, micOn]);

 return (
   <div>
     <p>
       Participant: {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
       {micOn ? "ON" : "OFF"}
     </p>
     <audio ref={micRef} autoPlay playsInline muted={isLocal} />
     {webcamOn && (
       <ReactPlayer
         //
         playsinline // very very imp prop
         pip={false}
         light={false}
         controls={false}
         muted={true}
         playing={true}
         //
         url={videoStream}
         //
         height={"300px"}
         width={"300px"}
         onError={(err) => {
           console.log(err, "participant video error");
         }}
       />
     )}
   </div>
 );
}

function Controls() {
  const { leave, toggleMic, toggleWebcam, startHls, stopHls } = useMeeting();
  return (
    <div>
      <button onClick={() => leave()}>Leave</button>
      &emsp;|&emsp;
      <button onClick={() => toggleMic()}>toggleMic</button>
      <button onClick={() => toggleWebcam()}>toggleWebcam</button>
      &emsp;|&emsp;
      <button
        onClick={() => {
          //We will start the HLS in SPOTLIGHT mode and PIN as
          //priority so only speakers are visible in the HLS stream
          startHls({
            layout: {
              type: "SPOTLIGHT",
              priority: "PIN",
              gridSize: 20,
            },
            theme: "LIGHT",
            mode: "video-and-audio",
            quality: "high",
            orientation: "landscape",
          });
        }}
      >
        Start HLS
      </button>
      <button onClick={() => stopHls()}>Stop HLS</button>
    </div>
  );
}

function SpeakerView() {
  //Get the participants and hlsState from useMeeting
  const { participants, hlsState } = useMeeting();

  //Filtering the host/speakers from all the participants
  const speakers = useMemo(() => {
    const speakerParticipants = [...participants.values()].filter(
      (participant) => {
        return participant.mode == Constants.modes.CONFERENCE;
      }
    );
    return speakerParticipants;
  }, [participants]);
  return (
    <div>
      <p>Current HLS State: {hlsState}</p>
      {/* Controls for the meeting */}
      <Controls />

      {/* Rendring all the HOST participants */}
      {speakers.map((participant) => (
        <ParticipantView participantId={participant.id} key={participant.id} />
      ))}
    </div>
  );
}

function ViewerView() {
  // States to store downstream url and current HLS state
  const playerRef = useRef<HTMLVideoElement|null>(null);
  //Getting the hlsUrls
  const { hlsUrls, hlsState } = useMeeting();

  //Playing the HLS stream when the downstreamUrl is present and it is playable
  useEffect(() => {
    if (hlsUrls.downstreamUrl && hlsState == "HLS_PLAYABLE") {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      if (Hls.isSupported()) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        const hls = new Hls({
          capLevelToPlayerSize: true,
          maxLoadingDelay: 4,
          minAutoBitrate: 0,
          autoStartLoad: true,
          defaultAudioCodec: "mp4a.40.2",
        });

        const player = document.querySelector("#hlsPlayer") as HTMLMediaElement;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        hls.loadSource(hlsUrls.downstreamUrl);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        hls.attachMedia(player);
      } else {
        if (typeof playerRef.current?.play === "function") {
          playerRef.current.src = hlsUrls.downstreamUrl;
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          playerRef.current.play();
        }
      }
    }
  }, [hlsUrls, hlsState]);

  return (
    <div>
      {/* Showing message if HLS is not started or is stopped by HOST */}
      {hlsState != "HLS_PLAYABLE" ? (
        <div>
          <p>HLS has not started yet or is stopped</p>
        </div>
      ) : (
        hlsState == "HLS_PLAYABLE" && (
          <div>
            <video
              ref={playerRef}
              id="hlsPlayer"
              autoPlay={true}
              controls
              style={{ width: "100%", height: "100%" }}
              playsInline
              muted={true}
              onError={(err) => {
                console.log(err, "hls video error");
              }}
            ></video>
          </div>
        )
      )}
    </div>
  );
}


interface Container {
  meetingId: string,
  onMeetingLeave: () => void;
}

const Container:React.FC<Container> = (props) => {
    const [joined, setJoined] = useState<string|null>(null);
    //Get the method which will be used to join the meeting.
    const { join } = useMeeting();
    const mMeeting = useMeeting({
      //callback for when meeting is joined successfully
      onMeetingJoined: () => {
        setJoined("JOINED");
      },
      //callback for when meeting is left
      onMeetingLeft: () => {
        props.onMeetingLeave();
      },
      //callback for when there is error in meeting
      onError: (error) => {
        alert(error.message);
      },
    });
    const joinMeeting = () => {
      setJoined("JOINING");
      join();
  };
  
  const mMeetingRef = useRef(mMeeting);
  useEffect(() => {
    mMeetingRef.current = mMeeting;
  }, [mMeeting]);

    return (
      <div className="container">
        <h3>Meeting Id: {props.meetingId}</h3>
        {joined && joined == "JOINED" ? (
          mMeeting.localParticipant.mode == Constants.modes.CONFERENCE ? (
            <SpeakerView />
          ) : mMeeting.localParticipant.mode == Constants.modes.VIEWER ? (
            <ViewerView />
          ) : null
        ) : joined && joined == "JOINING" ? (
          <p>Joining the meeting...</p>
        ) : (
          <button onClick={joinMeeting}>Join</button>
        )}
      </div>
    );
}

const LiveStream: React.FC = () => {
  const [meetingId, setMeetingId] = useState<string|null>(null);

  //State to handle the mode of the participant i.e. CONFERNCE or VIEWER
  const [mode, setMode] = useState<"CONFERENCE" | "VIEWER">("CONFERENCE");

  //Getting MeetingId from the API we created earlier
  const getMeetingAndToken = async (id:string) => {
    const meetingId = id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId as string);
  };

  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: "Hanish",
        //These will be the mode of the participant CONFERENCE or VIEWER
        mode: mode,
      }}
      token={authToken}
    >
      <MeetingConsumer>
        {() => (
          <Container meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
        )}
      </MeetingConsumer>
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} setMode={setMode} />
  );
}

export default LiveStream;
