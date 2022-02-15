const request = require('supertest')
const app = require('../app')

// test('should add data', async ()=>{
//     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBiNGJlMDUyYzc5ZGM0MmY0Y2ZhNmYiLCJpYXQiOjE2NDQ5MDc0ODh9.HELGxPm3YIpV0QyIVI-bQ7hOM2OnXygQfR8hGTGDZkI'
//     const response = await request(app).post('/add/message').set('Authorization','Bearer '+token).send(
//         [{
//             message: 'good bye',
//             category : "direct",
//             created_time : '2022-02-03 14:09:45',
//             user_id : '6206268679354789d2051013'
//         },{
//             message: 'good night',
//             category : "direct",
//             created_time : '2022-02-03 14:09:45',
//             user_id : '6206268679354789d2051013'
//         }]
//     ).set('CorelationId', 'dvsedggb').expect(201)

// }) 

test('should not add data without authorization', async ()=>{
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBiNGJlMDUyYzc5ZGM0MmY0Y2ZhNmYiLCJpYXQiOjE2NDQ5MDc0ODh9.HELGxPm3YIpV0QyIVI-bQ7hOM2OnXygQfR8hGTGDZkI'
    const response = await request(app).post('/add/message').send(
        [{
            message: 'good bye',
            category : "direct",
            created_time : '2022-02-03 14:09:45',
            user_id : '6206268679354789d2051013'
        },{
            message: 'good night',
            category : "direct",
            created_time : '2022-02-03 14:09:45',
            user_id : '6206268679354789d2051013'
        }]
    ).set('CorelationId', 'dvsedggb').expect(404)

}) 

test('should not add data without CorelationId', async ()=>{
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBiNGJlMDUyYzc5ZGM0MmY0Y2ZhNmYiLCJpYXQiOjE2NDQ5MDc0ODh9.HELGxPm3YIpV0QyIVI-bQ7hOM2OnXygQfR8hGTGDZkI'
    const response = await request(app).post('/add/message').set('Authorization','Bearer '+token).send(
        [{
            message: 'good bye',
            category : "direct",
            created_time : '2022-02-03 14:09:45',
            user_id : '6206268679354789d2051013'
        },{
            message: 'good night',
            category : "direct",
            created_time : '2022-02-03 14:09:45',
            user_id : '6206268679354789d2051013'
        }]
    ).expect(400)

}) 


test('should not add data without message', async ()=>{
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBiNGJlMDUyYzc5ZGM0MmY0Y2ZhNmYiLCJpYXQiOjE2NDQ5MDc0ODh9.HELGxPm3YIpV0QyIVI-bQ7hOM2OnXygQfR8hGTGDZkI'
    const response = await request(app).post('/add/message').set('Authorization','Bearer '+token).send(
        [{
            category : "direct",
            created_time : '2022-02-03 14:09:45',
            user_id : '6206268679354789d2051013'
        },{
            message: 'good night',
            category : "direct",
            created_time : '2022-02-03 14:09:45',
            user_id : '6206268679354789d2051013'
        }]
    ).set('CorelationId', 'dvsedggb').expect(400)

}) 


test('should get message which include given quert text',async()=>{   
     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBiNGJlMDUyYzc5ZGM0MmY0Y2ZhNmYiLCJpYXQiOjE2NDQ5MDc0ODh9.HELGxPm3YIpV0QyIVI-bQ7hOM2OnXygQfR8hGTGDZkI'
    const response = await request(app).get('/get/messages').set('Authorization', `Bearer ${token}`).query({message : 'good'}).send().expect(200)
})

test('should not get message which include given quert text',async()=>{   
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBiNGJlMDUyYzc5ZGM0MmY0Y2ZhNmYiLCJpYXQiOjE2NDQ5MDc0ODh9.HELGxPm3YIpV0QyIVI-bQ7hOM2OnXygQfR8hGTGDZkI'
   const response = await request(app).get('/get/messages').set('Authorization', `Bearer ${token}`).send().expect(400)
})

test('should not get message which include given Authorization',async()=>{   
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBiNGJlMDUyYzc5ZGM0MmY0Y2ZhNmYiLCJpYXQiOjE2NDQ5MDc0ODh9.HELGxPm3YIpV0QyIVI-bQ7hOM2OnXygQfR8hGTGDZkI'
   const response = await request(app).get('/get/messages').query({message : 'good'}).send().expect(404)
})

test('should get message which include given quert text',async()=>{   
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBiNGJlMDUyYzc5ZGM0MmY0Y2ZhNmYiLCJpYXQiOjE2NDQ5MDc0ODh9.HELGxPm3YIpV0QyIVI-bQ7hOM2OnXygQfR8hGTGDZkI'
   const response = await request(app).get('/get/category').set('Authorization', `Bearer ${token}`).query({category : 'retired', date: '2022-02-11'}).send().expect(200)
})

test('should not get message without date query',async()=>{   
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBiNGJlMDUyYzc5ZGM0MmY0Y2ZhNmYiLCJpYXQiOjE2NDQ5MDc0ODh9.HELGxPm3YIpV0QyIVI-bQ7hOM2OnXygQfR8hGTGDZkI'
   const response = await request(app).get('/get/category').set('Authorization', `Bearer ${token}`).query({category : 'retired'}).send().expect(400)
})

test('should not get message without category query',async()=>{   
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBiNGJlMDUyYzc5ZGM0MmY0Y2ZhNmYiLCJpYXQiOjE2NDQ5MDc0ODh9.HELGxPm3YIpV0QyIVI-bQ7hOM2OnXygQfR8hGTGDZkI'
   const response = await request(app).get('/get/category').set('Authorization', `Bearer ${token}`).query({date: '2022-02-11'}).send().expect(400)
})


test('should not get message without authorization',async()=>{   
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBiNGJlMDUyYzc5ZGM0MmY0Y2ZhNmYiLCJpYXQiOjE2NDQ5MDc0ODh9.HELGxPm3YIpV0QyIVI-bQ7hOM2OnXygQfR8hGTGDZkI'
   const response = await request(app).get('/get/category').query({category : 'retired', date: '2022-02-11'}).send().expect(404)
})
