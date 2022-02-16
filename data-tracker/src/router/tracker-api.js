const express = require('express')
const Message = require('../models/msg-model')
const auth = require('../middleware/auth')
const router = express.Router()
const logger = require('../logger')




router.post('/add/message',auth,  async (req,res)=>{
    req.body.messages.forEach((element)=>{
        element.user_id = req.user._id,
        element.request_id = req.header('CorelationId')
    })
    try {
        const message = await Message.insertMany(req.body.messages, (error, result) => {
            if (error) {
                logger.error(error)
                console.log(error)
                return res.status(400).send({error: error._message, ok: false})  
            }
            logger.info('data is inserted in the database')
            res.status(201).send({result: result, ok: true})
        })
    } catch (error) {
        logger.error(error)
        console.log(error)
        res.status(400).send({error: error, ok: false})
    }
})

router.get('/get/messages',auth, async(req, res)=>{
    if(!req.query.message){
        return res.status(400).send({error : 'please enter message n query'})
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
        logger.info('data is fetched using message query')
        res.status(200).send(result)
    }
    catch(err){
        logger.error(err)
        res.status(400).send({"error ":err})
    }
})

router.get('/get/category',auth, async(req, res)=>{
    const category = req.query.category
    const fromDate = new Date(req.query.date)
    const toDate = new Date(fromDate.getTime() + 86400000)
    try{
        if(!category|| !req.query.date){
            logger.error('category or date are not provided ')
            return res.status(400).send('please enter category and date values')
        }
        const count =await Message.countDocuments({
            created_time: {$gte: fromDate, $lt : toDate},
            category: category
        })
        logger.info('data is fetched using date and category query')
        res.status(200).send({'count is ':count})
    }
    catch(err){
        logger.error(err)
        res.status(400).send({"error ":err})
    }
})


module.exports = router