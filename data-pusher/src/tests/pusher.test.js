const { response } = require('express')
const request = require('supertest')
const login = require('../../../user-validator/src/app')
const app = require('../../src/app')
// const { userOne, userTwo , setupDatabase} = require('./fixtures/db')
// beforeEach(setupDatabase)

test('should login first', async()=>{
 
    const response = await request(login).post('/login').send({
        userName: 'mayursinh',
        password: 'myhouse099'
    }).expect(200)
    // console.log(response.body.user.userName)
    
})



test('send mesage when user is available', async()=>{
    const sendmessage = await request(app).post('/pusher').send(
       [{ message: "good afternoon"}]
    ).expect(200)
})