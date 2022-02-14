const request = require('supertest')
const app = require('../app')
const User = require('../models/usermodel')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should signup a new user', async () => {
    const response = await request(app).post('/create/user').send({
        userName: 'sukeshakha',
        password: 'sukesha123'
    }).expect(201)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
    expect(user.password).not.toBe('sukesha123')

})

// test('should login existing user', async()=>{
//     const response = await request(app).post('/login').send({
//         userName: 'sukesha',
//         password: 'sukesha123'
//     }).expect(200)
// })

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