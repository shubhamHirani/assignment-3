const { response } = require('express')
const request = require('supertest')
const app = require('../../src/app')

test('send mesage when user is available', async()=>{
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBiNGJlMDUyYzc5ZGM0MmY0Y2ZhNmYiLCJpYXQiOjE2NDQ5MDc0ODh9.HELGxPm3YIpV0QyIVI-bQ7hOM2OnXygQfR8hGTGDZkI'
    const sendmessage = await request(app).post('/pusher').set('Authorization', 'Bearer '+token).send(
        {messages : [{
            message: 'good morning'
        },{message : 'good afternoon'}]}
    ).expect(200)
})

test('should not send mesage when user is not available', async()=>{
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBiNGJlMDUyYzc5ZGM0MmY0Y2ZhNmYiLCJpYXQiOjE2NDQ5MDc0ODh9.HELGxPm3YIpV0QyIVI-bQ7hOM2OnXygQfR8hGTGDZkI'
    const sendmessage = await request(app).post('/pusher').send(
        {messages : [{
           message: 'good morning'
       },{message : 'good afternoon'}]}
    ).expect(404)
})