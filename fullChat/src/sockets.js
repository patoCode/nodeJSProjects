const Chat = require('./models/Chat')


module.exports = io => {

	let users = {}

	io.on('connection', async socket => {
      console.log("Usuario nuevo")

			const messages = await Chat.find({}).limit(8).sort('-created_at')
			if(messages)
			{
				socket.emit('load-msg', messages)
			}

			// ENVIAR MENSAJE
      socket.on('send-message', async (data, cb) => {
					// public: message
					// wishper:  /w {user} message
					var msg = data.trim();

					if(msg.substr(0,3) == '/w '){
						msg = msg.substr(3)
						const index = msg.indexOf(' ');
						if(index !== -1){
							var name = msg.substring(0, index)
							var msg = msg.substr(index + 1);
							if(name in users){
									users[name].emit('whisper',{
										msg,
										nick: socket.nickname
									})
							} else {
									cb('Error! Please enter a valid username')
							}
						} else {
							cb('Error! Please enter your message')
						}
					}else{
						var newMessage = new Chat({
							nick: socket.nickname,
							msg: data
						})
						await newMessage.save()

						io.sockets.emit('new-message', {
							msg: data,
							nick: socket.nickname
						})
					}
      })

			// nuevo usuario
			socket.on('new-user', (data, cb) => {

					if( data in users){
						cb(false)
					}else{
						socket.nickname = data
						users[socket.nickname] = socket
						updateNicknames()
						cb(true)
					}
			})
			// Disconect
			socket.on('disconnect', data => {
				if(!socket.nickname) return
				//nicknames.splice(nicknames.indexOf(socket.nickname), 1)
				delete users[socket.nickname]
				updateNicknames()
			})

			// UPDATE NICKNAMES
			function updateNicknames(){
				io.sockets.emit('usernames', Object.keys(users));
			}
	})
}
