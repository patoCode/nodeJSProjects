const amqp = require('amqplib')



const CONN_URL = 'amqp://admin:Password123@159.65.220.217:15672'

let ch = null
amqp.connect(CONN_URL,  (err, conn) => {
   conn.createChannel((err, channel) => {
      ch = channel;
   })
})


export const publishToQueue = async (queueName, data) => {
   ch.sendToQueue(queueName, new Buffer(data));
}