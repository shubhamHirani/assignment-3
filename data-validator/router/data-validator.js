const express = require('express')
const User = require('../../user-tracker/models/usermodel')
const Message = require('../../data-tracker/models/msg-model')
const { error } = require('console')
const auth = require('../../middleware/auth')
const router = express.Router()
const redis = require('redis')
const JSONCache = require('redis-json');
const  validator = require('express-validator')
const jwt = require('jsonwebtoken')
const { get } = require('express/lib/response')
const amqp = require('amqplib')
const getRandom = require('../../utils/random')
const http = require('http')
const axios = require('axios')
const { response } = require('express')

router.get('/consumer', auth, async(req,res)=>{
    const connection = await amqp.connect("amqp://localhost:5672")
    const channel = await connection.createChannel()
    await channel.assertQueue('assignment-3')
    // let input
    
    channel.consume('assignment-3', async (messages) => {
        const input = JSON.parse(messages.content.toString())
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
        // await axios({method:'post',url:'/add/message',
        // baseURL : 'http://localhost:3000',data:{
        //     firstName: 'Fred',
        //     lastName: 'Flintstone'
        //     },headers: { 'Authorization' : req.token}})
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