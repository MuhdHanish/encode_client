//Auth token we will use to generate a meeting and connect to it
export const authToken: string = import.meta.env.VITE_VIDEO_SDK_TOKEN as string;
// API call to create meeting
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty-pattern
export const createMeeting = async ({ }) => {
  try {
    const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
      method: "POST",
      headers: {
        authorization: `${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    //Destructuring the roomId from the response
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { roomId }: { roomId: string } = await res.json();
    return roomId;
  }
  catch (error) {
    console.log(error)
  }
};
