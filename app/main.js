// server side handling
const fetch = require('node-fetch');
const { io } = require("socket.io-client");
const bodyParser = require('body-parser');
const Blob = require('node-blob');
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
      console.log(BASE + "/video/" + name)
      const response = await fetch(BASE + "/video/" + name, options);
      const buffer = await response.buffer();
      await writeFile("public/saved_videos/" + name + ".mp4", buffer);
      console.log("done!");
    } 
    catch(error) {
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
const express = require('express');
const { get } = require('http');
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(bodyParser.json({ limit: '500mb' }));
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
  videoPath = `public/saved_videos/${req.params.tagId}`
  res.sendFile(resolve('vidplayer.html'));
});
let videoStream = null;
app.get('/vidName/:name', (req, res) => {
  if (videoStream != null) {
    videoStream.destroy()
    console.log("destroying")
  }
  console.log("jdiofw")
  getVidFrom(req.params.name)
  console.log(req.params.name)
  res.redirect(`/vidplayer/${req.params.name}.mp4` )
})
app.get("/video", function (req, res) {
  console.log(videoPath)
  // Ensure there is a range given for the video
  let range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  // get video stats (about 61MB)
  let videoSize = fs.statSync(videoPath).size;

  // Parse Range
  // Example: "bytes=32324-"
  let CHUNK_SIZE = 10 ** 6; // 1MB
  let start = Number(range.replace(/\D/g, ""));
  let end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  let contentLength = end - start + 1;
  let headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
});


// async function getVidFromURL(url) {
  
//   try {
//     response = fetch(url, {method: 'GET', // specify this is a GET request, not a PUT or POST
//     headers: {
//       "Accept" : "application/json" // request the response in JSON format
//     }}).then((response)=>response.json()).then((response)=>console.log(response))
//   } catch(e) {console.log(e)}
// }
app.post("/vidsaver/:tagId", async (req, res) => {
  console.log(req.params.tagId)
  console.log(req.body.text)
  let blob = await fetch(req.body.text).then(r => r.blob());
  console.log(blob)
  return JSON.stringify({'result': 'valid'})
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

