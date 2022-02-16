const express = require('express')
const userRouter = require('./router/user-authentication')
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const yaml = require('js-yaml')
const fs = require('fs')


const setapi = fs.readFileSync('./user-validator.yml','utf8')
const options = yaml.load(setapi)
const specs = swaggerJsDoc(options)
const app =express()

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use(userRouter)

module.exports =app