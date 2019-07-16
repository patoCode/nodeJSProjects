
const http = require('http')
const path = require('path')


const express = require('express')
const socketio = require('socket.io')
const mongoose = require('mongoose')

const app = express()
const servidor = http.createServer(app)
const io = socketio.listen(servidor)


require('./sockets')(io)
//DB CONNECTION
mongoose.connect('mongodb://localhost/chat-db',{
	 useNewUrlParser: true
})
	.then(db => console.log('DB IS CONNECTECD'))
	.catch(err => console.error(err))

// STATICS FILE
app.set('port', process.env.PORT || 5003)
app.use(express.static(path.join(__dirname, 'public')))


// START SERVER
servidor.listen(app.get('port'), () => {
	console.log("init FULL-CHAT ", app.get('port'))
})
