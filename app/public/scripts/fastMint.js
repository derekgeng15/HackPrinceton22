const form = new FormData();
form.append('allowPlatformToOperateToken', 'true');
form.append('chain', 'goerli');
form.append('filePath', 'data:image/png;name=video-button.png;base64,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');
form.append('name', 'SampleNFTName');
form.append('description', 'Sample Description');
form.append('recipientAddress', '0xb74Af1c951637062aB5066A30DE71e8cD2e4a6FB');

const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'X-API-Key': 'sk_live_a0bb5535-8e30-49a9-b8ad-862b918b8e22'
  } 
};

options.body = form; 

fetch('https://api.verbwire.com/v1/nft/mint/quickMintFromFile', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
  
const express = require('express')
var parseUrl = require('body-parser')

const API_KEY = 'sk_live_a0bb5535-8e30-49a9-b8ad-862b918b8e22';
const app = express()
let encodeUrl = parseUrl.urlencoded({ extended: false })

app.get('/image', (req, res) => {
  res.sendFile(__dirname + '/form.html')
})

app.post('/image', encodeUrl, (req, res) => { 
  
  console.log('Request body:', req.body) 
  const sdk = require('api')('@verbwire/v1.0#hr2s143dl9hbr7s9');

sdk.auth(API_KEY);
sdk.post('/nft/mint/quickMintFromFile', {
  allowPlatformToOperateToken: req.body.allowPlatformToOperateToken,
  chain: req.body.chain, 
  filePath:  req.body.Image, 
  name: req.body.name,
  description: req.body.name,
  recipientAddress: req.body.recipientAddress,
}, {accept: 'application/json'})
  .then(resp => res.send(resp))
  .catch(err => console.error(err)); 
})

app.get('/url', (req, res) => {
    res.sendFile(__dirname + '/form2.html')
  })
  
  app.post('/url', encodeUrl, (req, res) => {
    console.log('Form request:', req.body)
   
	const sdk = require('api')('@verbwire/v1.0#hr2s143dl9hbr7s9');
  
  sdk.auth(API_KEY);
  sdk.post('/nft/mint/quickMintFromMetadataUrl', {
    allowPlatformToOperateToken: req.body.allowPlatformToOperateToken,
    chain: req.body.chain,
    metadataUrl: req.body.url,
    description: req.body.name,
    recipientAddress: req.body.recipientAddress,
  }, {accept: 'application/json'})
    .then(resp => res.send(resp))
    .catch(err => console.error(err)); 
  })
app.listen(8080)