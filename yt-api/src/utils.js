export const getDuration = (song) => {
  // Ensure song and song.contentDetails.duration exist
  if (!song || !song.contentDetails || !song.contentDetails.duration) {
    console.error("Invalid song data");
    return { minutes: undefined, seconds: undefined };
  }

  const duration = song.contentDetails.duration;
  const re = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const match = duration.match(re);

  // Check if the regex pattern matches the duration format
  if (!match) {
    console.error("Duration format not recognized:", duration);
    return { minutes: undefined, seconds: undefined };
  }

  // Extract hours, minutes, and seconds from the regex match, defaulting to 0 if not present
  const [, hours = "0", minutes = "0", seconds = "0"] = match;

  // Convert hours and minutes to numbers to sum up total minutes
  const totalMinutes = parseInt(hours, 10) * 60 + parseInt(minutes, 10);

  return {
    minutes: totalMinutes.toString(), // Return total minutes as string
    seconds: seconds, // Return seconds as string
  };
};
