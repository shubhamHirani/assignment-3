
const redis = require('redis')

const client = redis.createClient({url : "redis://shubham:Hirani4536!@redis-11732.c239.us-east-1-2.ec2.cloud.redislabs.com:11732"})
client.connect()

module.exports = client