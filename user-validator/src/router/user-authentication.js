const express = require('express')
const User = require('../../models/usermodel')
const Message = require('../../models/msg-model')
const { error, countReset } = require('console')
const auth = require('../../middleware/auth')
const router = express.Router()
const redis = require('redis')
const  validator = require('express-validator')
const jwt = require('jsonwebtoken')
const { get } = require('express/lib/response')
const amqp = require('amqplib')
const getRandom = require('../../utils/random')

let counter =0


const client = redis.createClient({url : "redis://shubham:Hirani4536!@redis-11732.c239.us-east-1-2.ec2.cloud.redislabs.com:11732"})

router.post('/create/user', async(req,res)=>{
    //validating user with user model
    const user = new User(req.body)
    try{
        await client.connect()
        //checking for password validation
        if(req.body.userName.length<5){
            return res.status(400).send('please enter username of min-length = 5')
        }
        else if(req.body.userName.length>15){
            return res.status(400).send('please enter username of max-length = 15')
        }
        else{
            if(req.body.password.length<6){
                return res.status(400).send('please enter password of min-length = 6')
            }
            else if (req.body.password.length>12){
                return res.status(400).send('please enter password of max-length = 12')
            }
            else{
                const userkey = 'user_'+user.userName
                const token =await user.generateAuthToken()
                console.log(token);
                const userdata = {id:user._id, username:user.userName, password: user.password,token: token, count : 0}
                console.log(userkey);
                await client.json.set(userkey,'.', userdata)
                 console.log(await client.json.get(userkey))
                res.status(200).send({user, token})
                }
        }
        
    }catch(err){
        res.status(400).send(err)
    }
})
router.post('/login', async(req,res)=>{
    try{
    const user = await User.findByCredentials(req.body.userName, req.body.password)
    const token = await user.generateAuthToken()
    res.send({user, token})
    }
    catch(err){
        res.status(400).send(err)
    }
})

module.exports= router