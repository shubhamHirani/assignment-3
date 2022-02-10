const express = require('express')
const User = require('../../models/usermodel')
const Message = require('../../models/msg-model')
const auth = require('../../middleware/auth')
const jwt = require('jsonwebtoken')
const { get } = require('express/lib/response')
const amqp = require('amqplib')
const getRandom = require('../../utils/random')
const axios = require('axios').default;
const { response } = require('express')
const {v4 : uuidv4} = require('uuid')
const { error } = require('console')

const router = express.Router()

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

                const data = [{message:input.message,category: input.category ,user_id: input.user_id, created_time : new Date()}]
                const config = {
                    headers: { 'Authorization' : `Bearer ${req.token}`, CorelationId : uuidv4()}
                }
                const url = 'http://127.0.0.1:3002/add/message'
                
                const request =axios.post(url,data,config).then((response)=>console.log(response.data))
        
                        console.log("message: ", input)
                    },4000)
                }

                const data = [{message:input.message,category: input.category ,user_id: input.user_id, created_time : new Date()}]
                const config = {
                    headers: { 'Authorization' : `Bearer ${req.token}`, CorelationId : uuidv4()}
                }
                const url = 'http://127.0.0.1:3002/add/message'
                
                const request =axios.post(url,data,config).then((response)=>console.log(response.data))
            },4000)
        }
        const data = [{message:input.message,category: input.category ,user_id: input.user_id, created_time : new Date()}]
        const config = {
            headers: { 'Authorization' : `Bearer ${req.token}`, "CorelationId" : uuidv4()}
        }
        const url = 'http://127.0.0.1:3002/add/message'
        
        const request =axios.post(url,data,config).then((response)=>console.log(response.data))
        // request.end()
        // .then(response=>console.log(response.data), 
        // error=>{
        //     console.log(error)
        // }).catch('error')
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