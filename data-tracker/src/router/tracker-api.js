const express = require('express')
const Message = require('../models/msg-model')
const auth = require('../middleware/auth')
const router = express.Router()




router.post('/add/message',auth,  async (req,res)=>{
    console.log('inside /add/message api');
    console.log(req.header('CorelationId'))
    req.body.forEach((element)=>{
        element.user_id = req.user._id,
        element.request_id = req.header('CorelationId')
    })
    
    
    try {
        const message = await Message.insertMany(req.body, (error, result) => {
            if (error) {
                console.log(error)
                return res.status(400).send({error: error._message, ok: false})  
            }
            res.status(201).send({result: result, ok: true})
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({error: error, ok: false})
    }
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

router.get('/get/category',auth, async(req, res)=>{
    const category = req.query.category
    const fromDate = new Date(req.query.date)
    const toDate = new Date(fromDate.getTime() + 86400000)
    console.log(fromDate);
    console.log(toDate);
    try{
        if(!category|| !req.query.date){
            return res.send('please enter category and date values')
        }
        const count =await Message.countDocuments({
            created_time: {$gte: fromDate, $lt : toDate},
            category: category
        })
        res.status(201).send({'count is ':count})
    }
    catch(err){
        res.status(400).send(err)
    }
})


module.exports = router