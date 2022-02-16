const express = require('express')
const swaggerUi = require('swagger-ui-express')
const dataPusher = require('./router/data-pusher')
const swaggerJsDoc = require('swagger-jsdoc')
const fs= require('fs')
const yaml = require('js-yaml')



// const options = {
//     definition: {
//       openapi: '3.0.0',
//       info: {
//         title: 'data pusher',
//         version: '1.0.0',
//         description: 'this is a data pusher api'
//       },
//       servers: [
//           {
//               url: 'http:localhost:3000'
//           }
//       ]
//     },
//     apis: ['./src/router/*.js'], // files containing annotations as above
//   };
  const setapi = fs.readFileSync('./api-docs.yaml', 'utf8')
  const options = yaml.load(setapi)
  const specs = swaggerJsDoc(options);
const app = express()

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use(dataPusher)

module.exports = app