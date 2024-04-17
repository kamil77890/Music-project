import { useEffect, useState } from "react";

export default async function getVideo() {
  const [file, setfile] = useState(false);
  useEffect(() => {
    fetch("/mp3")
      .then((res) => res)
      .then((data) => {
        setfile(data);
        console.log(data);
      });
  });
}
