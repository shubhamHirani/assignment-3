const { response } = require('express')
const request = require('supertest')
const login = require('../../../user-validator/src/app')
const app = require('../../src/app')
// const { userOne, userTwo , setupDatabase} = require('./fixtures/db')
// beforeEach(setupDatabase)

test('should login existing user', async()=>{
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjA2MjY4Njc5MzU0Nzg5ZDIwNTEwMTMiLCJpYXQiOjE2NDQ1NzAyNDZ9.grcmZ9dqf7iBq-Bhe3RdTyxrjlJsvf0Hptnm8ll3_QM'
    const response = await request(login).post('/login').set('Authorization', 'Bearer '+token).send({
        userName: 'sushmaj',
        password: 'sukesha123'
    }).expect(200)
    // response.headers('Authorization', 'Bearer '+token)
})



test('send mesage when user is available', async()=>{
    const sendmessage = await request(app).post('/pusher').send(
       [{ message: "good afternoon"}]
    ).expect(200)
})