const express = require('express')
require('../../db/db')
const User = require('../../models/usermodel')
const Message = require('../../models/msg-model')
const auth = require('../../middleware/auth')
const router = express.Router()
const redis = require('redis')
const jwt = require('jsonwebtoken')
const amqp = require('amqplib')
const getRandom = require('../../utils/random')
const { log } = require('console')
const client = redis.createClient({url : "redis://shubham:Hirani4536!@redis-11732.c239.us-east-1-2.ec2.cloud.redislabs.com:11732"})

router.post('/pusher',auth, async(req,res)=>{
    try{
        console.log('1');
        await client.connect()
        const token = req.token
        if(!token){
            console.log('please login');
        }
        const decoded  = jwt.verify(token, 'assignment3')
        const msg = req.body.message
        const random = 20
        const category = "direct"
        if(!decoded._id && !msg && !random){
            return res.send({error : 'please login or enter message'})
        }
        const user = req.user
        console.log(user.userName);
        const userkey = 'user_'+    user.userName
        console.log(userkey);
        await client.json.NUMINCRBY(userkey, ".count", 1)
        obj = {message:msg,user_id:decoded._id ,category:category,random:random}        
        console.log(obj)
        const connection =await amqp.connect("amqp://localhost:5672")
        const channel =await connection.createChannel()
        await channel.assertQueue('assignment-3')
        await channel.sendToQueue('assignment-3', Buffer.from(JSON.stringify(obj)))
        console.log(`message sent succesfully.......`)
        await channel.close()
        await connection.close()
        return res.json({message:'data sent succesfully'})

    }catch(err){
        res.send(err)
    }
    
})

module.exports = router