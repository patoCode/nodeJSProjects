$(function(){

	const socket = io.connect();

	// VARIABLES
	const messageForm = $('#message-form');
	const message = $('#message')
	const chat = $('#chat')

	// DOM OBJECT
	const nickForm = $('#nick-form')
	const nickError = $('#nick-error')
	const nickName = $('#nick-name')
	const usuarios = $('#usernames');

	// EVENTOS
	 nickForm.submit( e => {
		 e.preventDefault()
		 socket.emit('new-user', nickName.val(), data =>{
			 if(data){
				 console.log('funciono')
				 $('#nickWrap').hide()
				 $('#contenWrap').show()
			 }else{
				console.log('ERROR')
				nickError.html(`
						<div class="alert alert-danger">
							El usuario ya existe
						</div>
					`)
			 }
			 nickName.val()
		 })
	 })

	messageForm.submit( e => {
		e.preventDefault();
		socket.emit('send-message', message.val(), data => {
			chat.append(`<p class="error-msg">${data}</p>`)
		})
		message.val('')
	})

	socket.on('load-msg', data =>{
		for (var i = 0; i < data.length; i++) {
			displayMessages(data[i])
		}
	})

	socket.on('new-message', data => {
		displayMessages(data)
	})

	socket.on('whisper', data => {
		chat.append(
			'<p class="whisper"><b>'+data.nick+':</b> '+data.msg+'</p>'
		);
	})

	socket.on('usernames', data => {
		console.log(data)
		let html = ''
		for (let i = 0; i < data.length; i++) {
			html += '<p><i class="fa fa-user"></i> '+data[i]+'</p>';
		}
		usuarios.html(html)	;
	})

	function displayMessages(data){
		chat.append(
			"<b>"+data.nick+":</b> "+data.msg+"<br>"
		);
	}

})
