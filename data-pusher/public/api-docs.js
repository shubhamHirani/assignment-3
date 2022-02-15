const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'data pusher',
        version: '1.0.0',
        description: 'this is a data pusher api'
      },
      servers: [
          {
              url: 'localhost:3000'
          }
      ]
    },
    apis: ['./src/router/*.js'], // files containing annotations as above
  };
  
  const specs = swaggerJsDoc(options);

  module.exports = specs