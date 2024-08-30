import axios from "axios";

export const getDuration = (song) => {
  const duration = song.contentDetails.duration;
  const re = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const match = duration.match(re);

  if (match) {
    const [, hours = "0", minutes = "0", seconds = "0"] = match;
    const totalMinutes = parseInt(hours, 10) * 60 + parseInt(minutes, 10);
    return {
      minutes: totalMinutes.toString(),
      seconds: seconds,
    };
  } else {
    return { minutes: undefined, seconds: undefined };
  }
};

const transformData = (data) => {
  return {
    [data.id]: {
      liked: data.liked,
      title: data.title,
      src: data.src,
      videoId: data.videoId,
      duration: data.duration,
    },
  };
};

export const sendData = async (data) => {
  const transformedData = transformData(data);
  try {
    const response = await axios.post(
      "server-weld-one.vercel.app/api/data",
      transformedData,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending data:", error);
    throw error;
  }
};

export const gettingSongsIds = async () => {
  const response = await axios.get("/songs/songs.json");
  const data = response.data;

  const ids = data.map((item) => {
    const key = Object.keys(item)[0];
    return parseInt(key, 10);
  });

  const maxId = Math.max(...ids, 0);
  const newId = maxId + 1;

  console.log("New ID:", newId);

  return newId;
};
