const request = require('supertest')
const app = require('../app')
const User = require('../models/usermodel')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

// beforeEach(setupDatabase)

// test('Should signup a new user', async () => {
//     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjA2MjY4Njc5MzU0Nzg5ZDIwNTEwMTMiLCJpYXQiOjE2NDQ1NzAyNDZ9.grcmZ9dqf7iBq-Bhe3RdTyxrjlJsvf0Hptnm8ll3_QM'
//     const response = await request(app).post('/create/user').set('Authorization', 'Bearer '+token).send({
//         userName: 'sushmaj',
//         password: 'sukesha123'
//     }).expect(201)
//    const user = await User.findById(response.body.user._id)
//     expect(user).not.toBeNull()
//     expect(user.password).not.toBe('sukesha123')
    

// })
// jest.setTimeout(() => {
//     console.log('1');
// }, 5000);

test('should login existing user', async()=>{
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjA2MjY4Njc5MzU0Nzg5ZDIwNTEwMTMiLCJpYXQiOjE2NDQ1NzAyNDZ9.grcmZ9dqf7iBq-Bhe3RdTyxrjlJsvf0Hptnm8ll3_QM'
    const response = await request(app).post('/login').set('Authorization', 'Bearer '+token).send({
        userName: 'sushmaj',
        password: 'sukesha123'
    }).expect(200)
    // response.headers('Authorization', 'Bearer '+token)
})

test('should not login non-existing user', async()=>{
    const response = await request(app).post('/login').send({
        userName: 'sukes',
        password: 'sukesha123'
    }).expect(400)
})

test('should not create user with username less than 5 characters', async()=>{
    const response = await request(app).post('/create/user').send({
        userName: 'suk',
        password: 'sukesha123'
    }).expect(400)
})

test('should not create user with username more than 15 characters', async()=>{
    const response = await request(app).post('/create/user').send({
        userName: 'sukeshamaheshwari',
        password: 'sukesha123'
    }).expect(400)
})

test('should not create user with password less than 6 characters', async()=>{
    const response = await request(app).post('/create/user').send({
        userName: 'sukeshM',
        password: 'suki'
    }).expect(400)
})

test('should not create user with password more than 12 characters', async()=>{
    const response = await request(app).post('/create/user').send({
        userName: 'sukeshM',
        password: 'sukesha123456'
    }).expect(400)
})