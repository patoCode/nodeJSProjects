$('#post-comment').hide();

$('#btn-toggle-comment').click(function(e){
	e.preventDefault();
	$('#post-comment').slideToggle();
})

$('#btn-like').click(function(e){
	e.preventDefault();
	let imgId = $(this).data('id');
	console.log("HOLA ID: ",imgId);
	$.post('/image/'+imgId+'/like')
	.done(data=>{
		console.log(data);
		$('.likes-count').text(data.likes);
	})
});

$('#btn-delete').click(function(e){
	e.preventDefault();
	let btn = $(this);
	const response = confirm("Seguro, de que deseas eliminar esta imagen?");
	if(response){
		let imageId = btn.data('id');
		$.ajax({
			url: '/image/'+imageId,
			type: 'DELETE'
		})
		.done(function(result){
			if(result)
			{
				btn.removeClass('btn-danger').addClass('btn-info');
				btn.find('i').removeClass('fa-times').addClass('fa-check');
				btn.text('Eliminado')
			}
		});

	}
	else{}
});