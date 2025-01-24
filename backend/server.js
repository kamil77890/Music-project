const express = require("express");
const cors = require("cors");
const path = require("path");
const { exec } = require("child_process");
const fs = require("fs");

const app = express();

// Use CORS middleware for handling cross-origin requests
app.use(
  cors({
    origin: "*", // Allow all origins (you can set specific origins like 'http://localhost:5173')
    methods: ["GET", "POST", "OPTIONS"], // Allow GET, POST, and OPTIONS methods (important for preflight requests)
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Origin",
    ], // Allow necessary headers
    preflightContinue: false, // To stop sending a response for OPTIONS requests automatically
    optionsSuccessStatus: 200, // Some legacy browsers (e.g. IE11) choke on 204
  })
);

// Enable JSON parsing
app.use(express.json());

// Define download directory
const DOWNLOAD_DIR = path.join(__dirname, "..", "public", "songs");
app.use("/songs", express.static(DOWNLOAD_DIR));

// Define JSON file
const JSON_FILE = path.join(DOWNLOAD_DIR, "songs.json");

// Ensure that the download directory exists
if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

// Create the JSON file if it does not exist
if (!fs.existsSync(JSON_FILE)) {
  fs.writeFileSync(JSON_FILE, JSON.stringify([], null, 4));
}

// Main route
app.get("/", (req, res) => {
  res.send(DOWNLOAD_DIR);
});

// Endpoint for downloading MP3 files from YouTube
app.get("/mp3", async (req, res) => {
  const { videoId, id } = req.query;
  if (!videoId || !id) {
    return res.status(400).json({ error: "Brak parametrów" });
  }

  const url = `https://www.youtube.com/watch?v=${videoId}`;
  const outputFile = path.join(DOWNLOAD_DIR, `${id}.mp3`);

  // Check if the file already exists before downloading
  if (fs.existsSync(outputFile)) {
    console.log(`File already exists: ${outputFile}`);
    return res.download(outputFile);
  }

  const command = `yt-dlp -f bestaudio --extract-audio --audio-format mp3 --audio-quality 192K -o "${path.join(
    DOWNLOAD_DIR,
    `${id}.%(ext)s`
  )}" ${url}`;

  console.log(`Executing command: ${command}`);

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Błąd pobierania: ${error}`);
      return res.status(500).json({ error: "Błąd pobierania" });
    }

    console.log("stdout:", stdout); // Log stdout
    console.error("stderr:", stderr); // Log stderr

    // Now, save song info to JSON file
    const songData = {
      id: id,
      videoId: videoId,
      title: stdout.split("\n")[0], // Assuming the title is in the first line of stdout (change this based on yt-dlp output)
      liked: false, // Default liked status (can be updated later)
    };

    // Read current data from JSON
    const data = JSON.parse(fs.readFileSync(JSON_FILE, "utf8"));

    // Add the new song data
    data.push(songData);

    // Write the updated data to JSON file
    fs.writeFileSync(JSON_FILE, JSON.stringify(data, null, 4));

    // After saving JSON, send the file for download
    res.download(outputFile);
  });
});

// Serve list of songs from JSON file
app.get("/songs", (req, res) => {
  const data = JSON.parse(fs.readFileSync(JSON_FILE, "utf8"));
  res.json(data);
});

// Serve individual song files
app.get("/songs/:filename", (req, res) => {
  const filePath = path.join(DOWNLOAD_DIR, req.params.filename);
  console.log("File path being requested:", filePath); // Debug log to check path

  if (fs.existsSync(filePath)) {
    res.setHeader("Content-Type", "audio/mp3");
    res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
    res.sendFile(filePath); // Send the file for streaming
  } else {
    res.status(404).json({ error: "Nie znaleziono pliku" });
  }
});

// Add new data to the songs JSON
app.post("/api/data", (req, res) => {
  const newData = req.body;
  const data = JSON.parse(fs.readFileSync(JSON_FILE, "utf8"));
  data.push(newData);
  fs.writeFileSync(JSON_FILE, JSON.stringify(data, null, 4));
  res.json(newData);
});

// Update the like status of a song
app.post("/api/like", (req, res) => {
  const { id, liked } = req.body;
  const data = JSON.parse(fs.readFileSync(JSON_FILE, "utf8"));

  for (let entry of data) {
    const key = Object.keys(entry)[0];
    if (entry[key].videoId === id) {
      entry[key].liked = liked;
      break;
    }
  }

  fs.writeFileSync(JSON_FILE, JSON.stringify(data, null, 4));
  res.json({ message: `Zaktualizowano polubienie dla ${id}` });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
