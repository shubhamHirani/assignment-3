const { ObjectId, Timestamp, UUID, Binary } = require('bson')
const { uniqueId } = require('lodash')
const mongoose = require('mongoose')
const {v4: uuid} = require('uuid')
const joi = require('joi')

const messageSchema = joi.object({
    message: joi.string().required().error('message is required'),
    category: joi.string().required(),
    created_time : joi.date(),
    request_id : joi.string(),
    user_id = joi.ObjectId().required().error('please login')
})
// new mongoose.Schema({
//     message: {
//         type: String,
//         required: true
//     },
//     category: 'direct' | 'retired' | 'failed',
//     created_time : {
//         type : Date 
//     },
//     request_id : {
//         type: String,
//         required: true,
//     },
//     user_id : {
//         type : mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: 'User'
//     }
// })


const Message = mongoose.model("Message", messageSchema)

module.exports = Message