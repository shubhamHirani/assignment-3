const express = require('express')
const dataValidator = require('./router/data-validator')

const app = express()

app.use(express.json())
app.use(dataValidator)

module.exports = app