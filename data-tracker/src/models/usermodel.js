const { ObjectId } = require('bson')
const mongoose = require('mongoose')
const { isAsyncFunction } = require('util/types')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// const { use } = require('../router/data-validator')
const redis = require('redis')
const { sign } = require('crypto')

// const userSchema = joi.ob({
//     userName: joi.string()
//     .required()
//     .min(5)
//     .max(15)
//     .alphanum(),
   
//     password: joi.string().required()
// })

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 15,
        validate(value){
            var myRegxp = /^([a-zA-Z0-9_-]){5,15}$/;
        if (!myRegxp.test(value)) {
            throw new Error("Username must be between 5 to 15 characters long and only alphanumeric is allowed")
        }
        }
    },
    password:{
        type : String,
        required: true
    }
})
userSchema.methods.generateAuthToken = async function(){
    const user= this
    const token = jwt.sign({ _id : user._id.toString()}, process.env.JWT_SECRET)
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (name, password)=>{
    const client = redis.createClient({url : "redis://shubham:Hirani4536!@redis-11732.c239.us-east-1-2.ec2.cloud.redislabs.com:11732"})
    client.connect()
    const data = await client.sendCommand(['keys','*'])
    findkey = 'user_'+name
    const single = await client.json.get(findkey)
    console.log(single);
            if(!single){
                throw new Error('there is no such user with such credentials is available')
            }
            const isMatch = await bcrypt.compare(password, single.password)
            if(!isMatch){
                throw new Error('please enter valid password')
            }
            const user = await User.findById(single.id)
                if(!user){
                throw new Error('there is no suc user with such credentials is available')
            }
            return user
    }



userSchema.pre('save', async function(next) {
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model("User", userSchema)

module.exports = User