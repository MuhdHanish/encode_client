import "./App.css";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
  Constants,
} from "@videosdk.live/react-sdk";

import { authToken, createMeeting } from "../../api/videoSdkApi";
import ReactPlayer from "react-player";

interface JoinScreen {
  getMeetingAndToken: any;
  setMode: (value: "CONFERENCE" | "VIEWER") => void;
}

const JoinScreen: React.FC<JoinScreen> = ({ getMeetingAndToken, setMode }) => {
  console.log(getMeetingAndToken);
  return null;
}

interface ParticipantView {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any;
}

const ParticipantView: React.FC<ParticipantView> = (props) => {
  console.log(props);
  return null;
}

function Controls() {
  return null;
}

function SpeakerView() {
  return null;
}

function ViewerView() {
  return null;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Container = (props:any) => {
  console.log(props);
  return null;
}

const LiveStream:React.FC = () => {
  const [meetingId, setMeetingId] = useState(null);

  //State to handle the mode of the participant i.e. CONFERNCE or VIEWER
  const [mode, setMode] = useState<"CONFERENCE" | "VIEWER">("CONFERENCE");

  //Getting MeetingId from the API we created earlier
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getMeetingAndToken = async (id:any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const meetingId = id == null ? await createMeeting({ token: authToken }) : id;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setMeetingId(meetingId);
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
