const express = require('express')
const User = require('../models/usermodel')
const Message = require('../models/msg-model')
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')
const { get } = require('express/lib/response')
const amqp = require('amqplib')
const getRandom = require('../utils/random')
const axios = require('axios').default;
const { response } = require('express') 
const {v4 : uuidv4} = require('uuid')
const { error } = require('console')
const promiseTimers = require('promise-timers')

const router = express.Router()

router.get('/consumer', auth, async(req,res)=>{
    const connection = await amqp.connect("amqp://localhost:5672")
    const channel = await connection.createChannel()
    await channel.assertQueue('assignment-3')
    
    channel.consume('assignment-3', async (messages) => {
        const inputs= JSON.parse(messages.content.toString())
        inputs.forEach(async(input) => {
            console.log("message: ", input)
            async function setData(){ 
                if(input.random%10 ===0){
                    input.random =20
                    input.category='retired'
                    console.log("message: ", input)
                    await promiseTimers.setTimeout(4000).then(async()=>{
                    if(input.random%10 ===0){
                           console.log('1')
                           input.random = getRandom(60)
                           input.category='failed'
                           console.log("message: ", input)
                   }
                })
            }
        }
        await setData()
        const url = 'http://127.0.0.1:3004/add/message'
        const config = {
            headers: { 'Authorization' : `Bearer ${req.token}`, "CorelationId" : uuidv4()}
        }
        let data = [{message:input.message,category: input.category ,user_id: input.user_id, created_time : new Date()}]

           await axios.post(url, data,config)
            })
            
            
}, { noAck : true})
res.status(200).send('done')

})
module.exports = router