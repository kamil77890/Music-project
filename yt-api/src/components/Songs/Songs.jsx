import DownloadButton from "../DownloadButton";
import { getDuration } from "../../utils";
import "./songs.scss";

function Songs(props) {
  const { songs } = props;
<<<<<<< HEAD
  /* Filter out videos that:
    1. Are longer than 8 minutes
    2. Are shorts (we cannot get their length and we can't download them) */
  const filteredSongs = songs
    .map((song) => ({ ...song, duration: getDuration(song) }))
    .filter((song) => song.duration !== null ? song.duration.minutes < 8 : false)    
    .filter((song) => !song.snippet.title.includes("#"));
=======

  /* Filter out videos that:
    1. Are longer than 8 minutes
    2. Are shorts (we cannot get their length and we can't download them) */
  const filteredSongs = songs
    .map((song) => ({ ...song, duration: getDuration(song) }))
    .filter((song) =>
      song.duration !== null ? song.duration.minutes < 8 : false
    );
>>>>>>> 43dbf38d933149f2c5e43a6a3edf92543af70633

  return (
    <ul className="songs">
      {filteredSongs.map((song) => (
        <div className="song">
          <img
            src={song.snippet.thumbnails.high.url}
            alt="img"
            className="song__image"
<<<<<<< HEAD
          />  
          <span className="text">
            <h3>{song.snippet.title.replace("&amp;", "&")}</h3>
            <div>
              {song.duration.minutes}:
              {song.duration.seconds.length == 1
                ? "0" + song.duration.seconds
                : song.duration.seconds}
            </div>
          </span>
=======
          />
          <h3>{song.snippet.title.replace("&amp;", "&")}</h3>
          <p>
              {song.duration.seconds
                ? `${song.duration.minutes}:${
                    song.duration.seconds.length == 1
                      ? "0" + song.duration.seconds
                      : song.duration.seconds
                  }`
                : "Unknown length"}
            </p>
>>>>>>> 43dbf38d933149f2c5e43a6a3edf92543af70633

          <DownloadButton videoId={song.id} title={song.snippet.title} />
        </div>
      ))}
    </ul>
  );
}

export default Songs;
