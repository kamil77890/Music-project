import DownloadButton from "../downloadButton";
import "./songs.scss";

function Songs(props) {
  const { songs } = props;
  console.log(songs);

  const handleClick = () => {};

  return (
    <ul className="songs">
      {songs.map((song) => (
        <div className="song" onClick={handleClick}>
          <img
            src={song.snippet.thumbnails.high.url}
            alt="img"
            className="song__image"
          />
          <span className="text">
            <h3>{song.snippet.title.replace("&amp;", "&")}</h3>
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
