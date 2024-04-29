export const getDuration = (song) => {
  const re = /PT(\d+)M(\d+)S/;
  let [uselsessShit, minutes, seconds] = new Array(3).fill(undefined);
  if (song.contentDetails.duration.match(re)) {
    [uselsessShit, minutes, seconds] = song.contentDetails.duration.match(re);
  };
  return seconds !== undefined ? {minutes, seconds} : null;
};
