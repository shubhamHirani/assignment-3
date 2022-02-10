const express = require('express')
const User = require('../../models/usermodel')
const Message = require('../../models/msg-model')
const { error } = require('console')
const auth = require('../../middleware/auth')
const redis = require('redis')
const jwt = require('jsonwebtoken')
const { get } = require('express/lib/response')
const amqp = require('amqplib')
const getRandom = require('../../utils/random')
const axios = require('axios')
const { response } = require('express')
const {v4 : uuidv4} = require('uuid')

const router = express.Router()

router.get('/consumer', auth, async(req,res)=>{
    const connection = await amqp.connect("amqp://localhost:5672")
    const channel = await connection.createChannel()
    await channel.assertQueue('assignment-3')
    // let input
    
    channel.consume('assignment-3', async (messages) => {
        const input = JSON.parse(messages.content.toString())
        const uuid = uuidv4()
        console.log("message: ", input)
        if(input.random%10 ===0){
            setTimeout(()=>{
                input.random = getRandom(60)
                input.category='retired'
                console.log("message: ", input)
                if(input.random%10 ===0){
                    console.log('1');
                    setTimeout(()=>{
                        console.log('1')
                        input.random = getRandom(60)
                        input.category='failed'
        
                        console.log("message: ", input)
                    },4000)
                }
            },4000)
        }
        const axios = require('axios').default;
        await axios({
            method:'POST',
            url:'http://127.0.0.1:3000/add/message',
        data:[{...input, created_time : new Date()}],
        headers: { 'Authorization' : `Bearer ${req.token}`,uuid: uuid}})
        // .then(response=>console.log(response))
        //     .then(function (response) {
        //         console.log(response);
        //       })
        //       .catch(function (error) {
        //         console.log(error);
        //       })
        //       console.log('1');
}, { noAck : true})

})
module.exports = router