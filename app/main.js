// server side handling
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const { io } = require("socket.io-client");
const fs = require("fs");
const { writeFile } = require('fs').promises;
BASE = "http://127.0.0.1:5000";
const socket = io(BASE);
let question = ""


socket.on("connect", () => {
  console.log(socket.connected); // true
});
socket.on("connection", (socket) => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx

});
socket.on("sending question", (socket) => {
  // console.log(socket); // x8WIv7-mJelg7on_ALbx
  question = socket.question;
  console.log(question)
});

async function getVidFrom(name) {
  const options = { 
      method: 'GET', // specify this is a GET request, not a PUT or POST
      headers: {
        "Accept" : "application/json" // request the response in JSON format
      }
    }
    // the final fetch request
    try {
      const response = await fetch(BASE + "/video/" + name, options);
      const buffer = await response.buffer();
      await writeFile("saved_videos/" + name, buffer);
      console.log("done!");
    } catch(error) {
      console.log(error);
    }
};
async function getQuestion() {
  const options = { 
    method: 'GET', // specify this is a GET request, not a PUT or POST
    headers: {
      "Accept" : "application/json" // request the response in JSON format
    }
  }
  try {
      // the final fetch request
      const response = await fetch(BASE + "/question", options).then((response)=>response.json());
      console.log(response.question)
      return response.question;
  } catch (error){
    console.log(error);
  }
};
// routing for app
const {resolve} = require('path');
const path = require('path')
const express = require('express')
const app = express()
const port = 3000
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(resolve('index.html'))
})

app.get('/dailyq', (req, res) => {

  res.sendFile(resolve('dailyq.html'))
})

app.get('/emotes', (req, res) => {
  res.sendFile(resolve('emotes.html'))
})

app.get('/nft', (req, res) => {
  res.sendFile(resolve('nft.html'))
})

app.get('/stories', (req, res) => {
  res.sendFile(resolve('stories.html'))
})

app.get('/question', async (req, res) => {
  if (question == "")
    question = await getQuestion()
  res.send({"question" : question})
})

let videoPath = ""
app.get("/vidplayer/:tagId", (req, res) => {
  console.log(req.params.tagId)
  videoPath = `public/saved_videos/${req.params.tagId}.mp4`
  res.sendFile(resolve('vidplayer.html'));
});

app.get("/video", function (req, res) {
  // Ensure there is a range given for the video
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  // get video stats (about 61MB)
  const videoSize = fs.statSync(videoPath).size;

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

