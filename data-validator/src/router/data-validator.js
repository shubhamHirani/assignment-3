const express = require('express')
const auth = require('../middleware/auth')
const amqp = require('amqplib')
const getRandom = require('../utils/random')
const axios = require('axios').default; 
const {v4 : uuidv4} = require('uuid')
const promiseTimers = require('promise-timers')
const logger = require('../logger')

const router = express.Router()

router.get('/consumer', auth, async(req,res)=>{
    try{
    const connection = await amqp.connect("amqp://localhost:5672")
    const channel = await connection.createChannel()
    await channel.assertQueue('assignment-3')
    channel.consume('assignment-3', async (messages) => {
        const inputs= JSON.parse(messages.content.toString())
        inputs.forEach(async(input) => {
            async function setData(){ 
                if(input.random%10 ===0){
                    input.random =getRandom(60)
                    input.category='retired'
                    await promiseTimers.setTimeout(4000).then(async()=>{
                    if(input.random%10 ===0){
                           input.random = getRandom(60)
                           input.category='failed'
                   }
                })
            }
        }

        await setData()
        await logger.info('category is set')
        const url = process.env.API_URL
        const config = {
            headers: { 'Authorization' : `Bearer ${req.token}`, "CorelationId" : uuidv4()}
        }
        let data = [{message:input.message,category: input.category ,user_id: input.user_id, created_time : new Date()}]
        logger.info('invoking axios post method')
           await axios.post(url, data,config)
            })
            
     logger.info('completed axios post method')   
}, { noAck : true})
res.status(200).send('done')
    }
    catch(err){
        logger.error(err)
        res.status(400).send(err)
    }

})
module.exports = router