const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()
const jwt = require('jsonwebtoken')
const getRandom = require('../utils/random')
const client = require('../db/redis')
const amqp = require('amqplib')
const logger = require('../logger')
// const makeConnection = require('../db/amqp')

/**
 * @swagger
 * components:
 *  schemas:
 *      message:
 *          type : string
 *          required: true
 */

router.post('/pusher',auth, async(req,res)=>{
    try{
        const name = req.user.userName
        key = 'user_'+name
        const userdata =await client.json.get(key)
        const token = userdata.token
        if(!token){
            logger.error('no token available')
            console.log('please login');
        }
        const msg =req.body.messages
        const decoded  = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded._id && !msg){
            logger.error('please enter message or validate yourself')
            return res.send({error : 'please login or enter message'})
        }
        const connection =await amqp.connect("amqp://localhost:5672")
        const channel =await connection.createChannel()
        await channel.assertQueue('assignment-3')
        await client.json.NUMINCRBY(key, ".count", 1)
        const obj = []
        msg.forEach((element)=>{
            obj.push({message:element.message,user_id:decoded._id ,category:'direct',random:getRandom(60)})
        })     
        await channel.sendToQueue('assignment-3', Buffer.from(JSON.stringify(obj)))
        console.log(`message sent succesfully.......`)
        await channel.close()
        await connection.close()
        logger.info('messages pushed in to the queue')
        return res.status(200).json({message:'data sent succesfully'})

    }catch(err){
        res.status(400).send({"error ":err})
        
    }
    
})

module.exports = router