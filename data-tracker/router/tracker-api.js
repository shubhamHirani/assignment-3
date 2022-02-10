const express = require('express')
const User = require('../../models/usermodel')
const Message = require('../../models/msg-model')
const { error } = require('console')
const auth = require('../../middleware/auth')
const router = express.Router()
const  validator = require('express-validator')
const jwt = require('jsonwebtoken')
const { get } = require('express/lib/response')
const getRandom = require('../../utils/random')



router.post('/add/message',auth,  async (req,res)=>{
    console.log('inside /add/message api');
    // console.log(req.headers.uuid)
    const messages ={...req.body, request_id : req.headers.uuid}
    const message = new Message(messages)
    await message.save()
//     messages.forEach(async(element) => {
        
//             try{
               
//             }catch(err){
//                 return  res.status(400).send(err)
//             }
// })
    return res.status(200).send(messages)
})

router.get('/get/messages',auth, async(req, res)=>{
    if(!req.query.message){
        return res.send({error : 'please enter message n query'})
    }
    const msg =req.query.message
    result = []
    try{
        
        const arr = await Message.find({}, {message : 1, category:1, created_time:1, user_id :1})
        arr.forEach((element)=>{
            if(element.message.includes(msg)){
                result.push(element)
            }
        })
        res.send(result)
    }
    catch(err){
        res.send(err)
    }
})

router.get('/get/date',auth, async(req, res)=>{
    const category = req.query.category
    const date = req.query.date

    try{
        if(category == undefined || date == undefined ){
            return res.send('please enter category and date values')
        }
        const count =await Message.countDocuments({
            created_time: date,
            category: category
        })
        res.status(201).send({'count is ':count})
    }
    catch(err){
        res.status(400).send(err)
    }
})


module.exports = router