const express= require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const trackerRouter = require('./router/tracker-api')
const yaml = require('js-yaml')
const fs = require('fs')

const setapi = fs.readFileSync('./api-docs.yaml', 'utf8')
const options = yaml.load(setapi)
const specs = swaggerJsDoc(options)

const app = express()


app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

/**
 * @swagger
 * /:
 *  get: 
 *      summary: this api is used to check if get method is working or not
 *      description : this api is used to check if get method is working or not
 *      responses: 
 *          200:
 *              description: to test get method 
 */
app.get('/', (req,res)=>{
    res.status(200).send('inside data tracker service')
})
app.use(trackerRouter)

module.exports = app