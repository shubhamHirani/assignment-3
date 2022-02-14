const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../models/usermodel')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    userName: 'shubham',
    password: '56what!!'
}
const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    userName: 'clerks',
    password: 'myhouse099@@'
}

const setupDatabase = async () => {
    await User.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()

}



module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    setupDatabase
}