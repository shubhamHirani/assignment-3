const { response } = require('express')
const request = require('supertest')
const login = require('../../../user-validator/src/app')
const app = require('../../src/app')
// const { userOne, userTwo , setupDatabase} = require('./fixtures/db')
// beforeEach(setupDatabase)

test('should login existing user', async()=>{
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBiNGJlMDUyYzc5ZGM0MmY0Y2ZhNmYiLCJpYXQiOjE2NDQ5MDc0ODh9.HELGxPm3YIpV0QyIVI-bQ7hOM2OnXygQfR8hGTGDZkI'
    const response = await request(login).post('/login').set('Authorization', 'Bearer '+token).send({
        userName: 'sushmaj',
        password: 'sukesha123'
    }).expect(200)
    // response.headers('Authorization', 'Bearer '+token)
})



test('send mesage when user is available', async()=>{
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBiNGJlMDUyYzc5ZGM0MmY0Y2ZhNmYiLCJpYXQiOjE2NDQ5MDc0ODh9.HELGxPm3YIpV0QyIVI-bQ7hOM2OnXygQfR8hGTGDZkI'
    const sendmessage = await request(app).post('/pusher').set('Authorization', 'Bearer '+token).send(
        [{
           message: 'good morning'
       },{message : 'good afternoon'}]
    ).expect(200)
})