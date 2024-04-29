import { useState, useEffect } from "react";
import axios from "axios";
import Songs from "../../Songs";

const DetailedData = (props) => {
  const { songs } = props;
  const [music, setMusic] = useState([]);
  const key = "AIzaSyAzy1Qf_lhA4snxKLL7FP6EmNGk7euZRIE";

  useEffect(() => {
    const songIds = songs.map((song) => song.id.videoId).join(",");
    if (songIds.length > 0) {
      const fetchData = async () => {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos`,
          {
            params: {
              part: "snippet,contentDetails",
              id: songIds,
              key: key,
            },
          }
        );
        setMusic(response.data.items);
      };
      fetchData();
    }
  }, [songs]);

  return <section>{<Songs songs={music} />}</section>; //lepier rozplanować alie działa :)
};

export default DetailedData;
