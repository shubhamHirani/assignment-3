const express = require('express')
const auth = require('../middleware/auth')
const makeConnection = require('../db/amqp')
const getRandom = require('../utils/random')
const axios = require('axios').default;
const {v4 : uuidv4} = require('uuid')

const router = express.Router()

router.get('/consumer', auth, async(req,res)=>{
    await makeConnection()
    // let input
    
    channel.consume('assignment-3', async (messages) => {
        const input = JSON.parse(messages.content.toString())
        console.log("message: ", input)
        if(input.random%10 ===0){
            await setTimeout(()=>{
                input.random =30
                input.category='retired'
                console.log("message: ", input)
            },4000)
        }
        if(input.random%10 ===0){
            console.log('1');
            await setTimeout(()=>{
                console.log('1')
                input.random = getRandom(60)
                input.category='failed'
                console.log("message: ", input)
            },4000)
        }
        const data = [{message:input.message,category: input.category ,user_id: input.user_id, created_time : new Date()}]
        const config = {
            headers: { 'Authorization' : `Bearer ${req.token}`, "CorelationId" : uuidv4()}
        }
        const url = 'http://127.0.0.1:3004/add/message'
        
        const request =await axios.post(url,data,config)
    
}, { noAck : true})

})
module.exports = router