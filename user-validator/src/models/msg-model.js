const { ObjectId, Timestamp, UUID, Binary } = require('bson')
const { uniqueId } = require('lodash')
const mongoose = require('mongoose')
const {v4: uuid} = require('uuid')

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    category: 'direct' | 'retired' | 'failed',
    created_time : {
        type : Date 
    },
    request_id : {
        type: String,
        required: true,
    },
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})


const Message = mongoose.model("Message", messageSchema)

module.exports = Message