const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()
const jwt = require('jsonwebtoken')
const getRandom = require('../utils/random')
const client = require('../db/redis')
const makeConnection = require('../db/amqp')

router.post('/pusher',auth, async(req,res)=>{
    try{
        console.log('1');
        
        const token = req.token
        if(!token){
            console.log('please login');
        }
        const decoded  = jwt.verify(token, 'assignment3')
        const msg = req.body.message
        const random = getRandom(60)
        const category = "direct"
        if(!decoded._id && !msg && !random){
            return res.send({error : 'please login or enter message'})
        }
        const user = req.user
        console.log(user.userName);
        const userkey = 'user_'+    user.userName
        console.log(userkey)
        makeConnection()
        await client.json.NUMINCRBY(userkey, ".count", 1)
        obj = {message:msg,user_id:decoded._id ,category:category,random:random}        
        console.log(obj)
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