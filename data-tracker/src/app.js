const express= require('express')
const trackerRouter = require('./router/tracker-api')

const app = express()

app.use(express.json())
app.use(trackerRouter)

module.exports = app