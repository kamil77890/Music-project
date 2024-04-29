import DownloadButton from "../downloadButton";
import { getDuration } from "../../utils";
import "./songs.scss";

function Songs(props) {
  const { songs } = props;
;

  const filteredSongs = songs
    .map((song) => ({ ...song, duration: getDuration(song) }))
    .filter((song) => song.duration.minutes < 8);

  return (
    <ul className="songs">
      {filteredSongs.map((song) => (
        <div className="song">
          <img
            src={song.snippet.thumbnails.high.url}
            alt="img"
            className="song__image"
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
