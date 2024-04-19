import DownloadButton from "../downloadButton";
import "./songs.scss";

function Songs(props) {
  const { songs } = props;
  console.log(songs);
  return (
    <ul className="songs">
      {songs.map((song) => (
        <li key={song.id.videoId} className="song">
          <div className="song__info">
            <img src={song.snippet.thumbnails.default.url} alt="img" className="song__image"/>
            <span className="text">
              <h3>{song.snippet.title.replace("&amp;", "&")}</h3>
            </span>

            <DownloadButton
              videoId={song.id.videoId}
              title={song.snippet.title}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Songs;
