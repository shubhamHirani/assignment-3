const express = require('express')
const User = require('../models/usermodel')
const router = express.Router()
// const client = require('../db/redis')
const redis = require('redis')


router.post('/create/user', async(req,res)=>{


const client = redis.createClient({url : "redis://shubham:Hirani4536!@redis-11732.c239.us-east-1-2.ec2.cloud.redislabs.com:11732"})
client.connect()
    const iuser = await User.findOne({userName:req.body.userName})
    if(iuser){
        res.status(409).send('user already exist');
    }
    else{
    const user = new User(req.body)
    
    try{
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
                // console.log(token);
                const userdata = {id:user._id, username:user.userName, password: user.password,token: token, count : 0}
                // console.log(userkey);400
                await client.json.set(userkey,'.', userdata)
                 console.log(await client.json.get(userkey))
                res.status(201).send({user, token})
                
                }
        }
        
    }catch(err){
        res.status(400).send(err)
    }
}
})
router.post('/login', async(req,res)=>{
    try{
    const user = await User.findByCredentials(req.body.userName, req.body.password)
    res.status(200).send({user})
    }
    catch(err){
        res.status(400).send(err)
    }
})

module.exports= router