const express = require('express')
const dataPusher = require('./router/data-pusher')
const app = express()

app.use(express.json())
app.use(dataPusher)

module.exports = app