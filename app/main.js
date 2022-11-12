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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})