const fetch = require('node-fetch');
const { io } = require("socket.io-client");
const { writeFile } = require('fs').promises;
BASE = "http://127.0.0.1:5000";
const socket = io(BASE);

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
      const response = await fetch(BASE + "/video/" + name, options);
      const buffer = await response.buffer();
      await writeFile("saved_videos/" + name, buffer);
      console.log("done!")
};

getVidFrom("Derek")