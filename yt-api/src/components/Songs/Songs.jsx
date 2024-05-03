import DownloadButton from "../downloadButton";
import { getDuration } from "../../utils";
import "./songs.scss";

function Songs(props) {
  const { songs } = props;

  /* Filter out videos that:
    1. Are longer than 8 minutes
    2. Are shorts (we cannot get their length and we can't download them) */
  const filteredSongs = songs
    .map((song) => ({ ...song, duration: getDuration(song) }))
    .filter((song) =>
      song.duration !== null ? song.duration.minutes < 8 : false
    );

  return (
    <ul className="songs">
      {filteredSongs.map((song) => (
        <div className="song">
          <img
            src={song.snippet.thumbnails.high.url}
            alt="img"
            className="song__image"
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

          <DownloadButton
            videoId={song.id.videoId}
            title={song.snippet.title}
          />
        </div>
      ))}
    </ul>
  );
}

export default Songs;
