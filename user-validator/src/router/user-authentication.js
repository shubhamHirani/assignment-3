const express = require('express')
const User = require('../models/usermodel')
const router = express.Router()
const client = require('../db/redis')
const redis = require('redis')
const logger = require('../logger')

router.post('/create/user', async(req,res)=>{
    const iuser = await User.findOne({userName:req.body.userName})
    if(iuser){
        logger.error('user already exist')
        res.status(409).send('user already exist');
    }
    else{
    const user = new User(req.body)
    
    try{
        if(req.body.userName.length<5){
            logger.error('userame length is less than 5')
            return res.status(400).send('please enter username of min-length = 5')
        }
        else if(req.body.userName.length>15){
            logger.error('uername lenght is more than 15')
            return res.status(400).send('please enter username of max-length = 15')
        }
        else{
            if(req.body.password.length<6){
                logger.error('password is lessthan 6')
                return res.status(400).send('please enter password of min-length = 6')
            }
            else if (req.body.password.length>12){
                logger.error('passwod is morethan 12')
                return res.status(400).send('please enter password of max-length = 12')
                         }
            else{
                const userkey = 'user_'+user.userName
                const token =await user.generateAuthToken()
                logger.info('authentication token generated')
                const userdata = {id:user._id, username:user.userName, password: user.password,token: token, count : 0}
                await client.json.set(userkey,'.', userdata)
                 logger.info('data is added into redis')
                res.status(201).send({user, token})
                logger.info('user is added into database')
                
                }
        }
        
    }catch(err){
        logger.error(err)
        res.status(400).send(err)
        
    }
}
})
router.post('/login', async(req,res)=>{
    try{
    const user= await User.findByCredentials(req.body.userName, req.body.password)
    const token =await user.generateAuthToken()
    logger.info('logged in user '+user.userName)
    res.status(200).send({user,token})
    }
    catch(err){
        logger.error(err)
        res.status(400).send(err)
        
    }
})

module.exports= router