const amqp = require('amqplib')
async function makeConnection (){
const connection =await amqp.connect("amqp://localhost:5672")
const channel =await connection.createChannel()
await channel.assertQueue('assignment-3')

return channel
}

module.exports = makeConnection