const express= require('express')
require('./db/db')
const dataValidator= require('./router/data-validator')
const dataTracker = require('./router/tracker-api')
const dataPusher = require('./router/data-pusher')
const validateUser = require('./router/user-authentication')

const app = express()

app.use(express.json())
app.use(dataValidator)
app.use(dataTracker)
app.use(dataPusher)
app.use(validateUser)

module.exports = app