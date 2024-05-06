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
    console.error("Duration format not recognized:", duration);
    return { minutes: undefined, seconds: undefined };
  }
};
