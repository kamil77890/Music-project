export const getDuration = (song) => {
  const re = /PT(\d+)M(\d+)S/;
  const [uselsessShit, minutes, seconds] =
    song.contentDetails.duration.match(re); // to nie działa
  return { minutes, seconds };
};
