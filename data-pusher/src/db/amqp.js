const amqp = require('amqplib')
async function makeConnection (){
const connection =await amqp.connect(process.env.AMQP_URL)
const channel =await connection.createChannel()
await channel.assertQueue('assignment-3')
}

module.exports = makeConnection