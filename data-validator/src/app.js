const express = require('express')
const dataValidator = require('./router/data-validator')
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const yaml = require('js-yaml')
const fs = require('fs')

const setapi = fs.readFileSync('./api-docs.yaml', 'utf8')
const options = yaml.load(setapi)
const specs = swaggerJsDoc(options)

const app = express()

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use(dataValidator)

module.exports = app