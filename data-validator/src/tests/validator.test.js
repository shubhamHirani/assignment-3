const request = require('supertest')
// const login = require('../../../user-validator/src/app')
const app = require('../../src/app')

test('should validate message',async()=>{
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBiNGJlMDUyYzc5ZGM0MmY0Y2ZhNmYiLCJpYXQiOjE2NDQ5MDc0ODh9.HELGxPm3YIpV0QyIVI-bQ7hOM2OnXygQfR8hGTGDZkI'
    const response = await request(app).get('/consumer').set('Authorization', `Bearer ${token}`).send().expect(200)
}) 
test('should not validate message',async()=>{
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBiNGJlMDUyYzc5ZGM0MmY0Y2ZhNmYiLCJpYXQiOjE2NDQ5MDc0ODh9.HELGxPm3YIpV0QyIVI-bQ7hOM2OnXygQfR8hGTGDZkI'
    const response = await request(app).get('/consumer').send().expect(404)
}) 

