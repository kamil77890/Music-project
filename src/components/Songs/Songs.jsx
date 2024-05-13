import DownloadButton from "../DownloadButton";
import { getDuration } from "../../utils";
import "./songs.scss";
import PropTypes from "prop-types";

function Songs(props) {
  const { songs } = props;

  const filteredSongs = songs
    .map((song) => ({ ...song, duration: getDuration(song) }))
    .filter((song) => song.duration.minutes > 1 || song.duration.minutes < 8)
    .filter((song) => !song.snippet.title.includes("#"));

  return (
    <main className="songs">
      {filteredSongs.map((song) => (
        <div className="song" key={song.id}>
          <div className="song__img__component">
            <img
              src={song.snippet.thumbnails.high.url}
              alt="img"
              className="song__image"
            />
            <p className="time">
              {song.duration.minutes}:
              {song.duration.seconds.length == 1
                ? "0" + song.duration.seconds
                : song.duration.seconds}
            </p>
          </div>

          <span className="text">
            <h3>{song.snippet.title.replace("&amp;", "&")}</h3>
          </span>

          <DownloadButton videoId={song.id} title={song.snippet.title} />
        </div>
      ))}
    </main>
  );
}

export default Songs;

Songs.PropTypes = {
  songs: PropTypes.object.isRequired,
};
