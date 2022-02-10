const { ObjectId, Timestamp } = require('bson')
const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    category: 'direct' | 'retired' | 'failed',
    created_time : {
        type : Date 
    },
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})


const Message = mongoose.model("Message", messageSchema)

module.exports = Message