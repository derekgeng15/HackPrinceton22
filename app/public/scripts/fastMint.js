// const form = new FormData();
// form.append('allowPlatformToOperateToken', 'true');
// form.append('chain', 'goerli');
// form.append('name', 'SampleNFTName');
// form.append('description', 'Sample Description');
// form.append('recipientAddress', '0xb74Af1c951637062aB5066A30DE71e8cD2e4a6FB');

// const { response } = require("express");

// const options = {
//   method: 'POST',
//   headers: {
//     accept: 'application/json',
//     'X-API-Key': 'sk_live_a0bb5535-8e30-49a9-b8ad-862b918b8e22'
//   }
// };

// options.body = form;
// async function func(){
//   await fetch('https://api.verbwire.com/v1/nft/mint/quickMintFromFile', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));
// }
/* const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'X-API-Key': 'sk_live_a0bb5535-8e30-49a9-b8ad-862b918b8e22'
  }
};

async function func() {
    try{
      response = await fetch("http://localhost:3000/image", options).then(response => response.json())
      console.log(response)
    }
    catch(e){
      console.log(e)
    }
}
document.getElementById("send-button").addEventListener("click", ()=>{
  console.log('pressed');
  func();
}) */
const form = new FormData();


const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'X-API-Key': 'sk_live_a0bb5535-8e30-49a9-b8ad-862b918b8e22'
  }
};

options.body = form;

document.getElementById("send-button").addEventListener("click", () => {
  console.log('pressed');
  form.append('allowPlatformToOperateToken', document.getElementById('true-false').value);
  console.log(document.getElementById('true-false').value);

  form.append('chain', document.getElementById('blockchain').value);
  console.log(document.getElementById('blockchain').value);

  form.append('metadataUrl', document.getElementById('nft-link').value);
  console.log(document.getElementById('nft-link').value);
  form.append('recipientAddress', document.getElementById('wallet').value);
  func();
  document.getElementById("status").style.visibility = "visible";
})
async function func() {
  try {
    response = await fetch('https://api.verbwire.com/v1/nft/mint/quickMintFromMetadataUrl', options)
      .then(response => response.json())
      .then(response => console.log(response))
  }
  catch (e) {
    console.log(e);
  }
}

// const express = require('express')
