// server side handling
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const { io } = require("socket.io-client");
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
app.get('/vidplayer', (req, res) => {
  console.log("FRIJFOIERJFRI")
  res.sendFile(resolve('vidplayer.html'))
})

var parseUrl = require('body-parser')

const API_KEY = 'sk_live_a0bb5535-8e30-49a9-b8ad-862b918b8e22';
let encodeUrl = parseUrl.urlencoded({ extended: false })

/*app.get('/image', (req, res) => {
  res.sendFile(__dirname + '/nft.html')
})*/  
app.post('/image', encodeUrl, (req, res) => {

    console.log('Request body:', req.body)
    const sdk = require('api')('@verbwire/v1.0#hr2s143dl9hbr7s9');
  
    sdk.auth(API_KEY);
    sdk.post('/nft/mint/quickMintFromFile', {
      allowPlatformToOperateToken: "true",
      chain: "goerli",
      filePath: "C:\\Users\\derekgeng15\\Downloads\\red-heart.png",
      name: "heart",
      description: "this is a heart",
      recipientAddress: "0xb74Af1c951637062aB5066A30DE71e8cD2e4a6FB",
    }, { accept: 'application/json' })
      .then(resp => res.send(resp))
      .catch(err => console.error(err));
})





/*app.get('/url', (req, res) => {
  res.sendFile(__dirname + '/form2.html')
})*/

/*app.post('/url', encodeUrl, (req, res) => {
  console.log('Form request:', req.body)

  const sdk = require('api')('@verbwire/v1.0#hr2s143dl9hbr7s9');

  sdk.auth(API_KEY);
  sdk.post('/nft/mint/quickMintFromMetadataUrl', {
    allowPlatformToOperateToken: req.body.allowPlatformToOperateToken,
    chain: req.body.chain,
    metadataUrl: req.body.url,
    description: req.body.name,
    recipientAddress: req.body.recipientAddress,
  }, { accept: 'application/json' })
    .then(resp => res.send(resp))
    .catch(err => console.error(err));
})*/

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

