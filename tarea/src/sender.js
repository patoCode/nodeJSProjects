const express = require('express')
const amqp = require('amqplib/callback_api')


const port = 9001

const opt = { credentials: require('amqplib')
              .credentials.plain('guest', 'guest') };

amqp.connect('amqp://localhost:5672/', opt, (err, conn) => {
   //console.log("data: ", conn)
   conn.createChannel( (err, channel) => {

   })
})

const app = express()

app.listen(port, () => {
   console.log("Escuchando el puerto ", port)
})
