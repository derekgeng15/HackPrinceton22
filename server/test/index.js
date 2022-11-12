const { io } = require("socket.io-client");

const socket = io("http://127.0.0.1:5000");

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

