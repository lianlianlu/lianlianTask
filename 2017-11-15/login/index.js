(function($){
	let sock = io.connect('http://localhost:8080/');

	//注册
	sock.on('reg_ret',(code,msg)=>{
		alert(code);
		if(code){
			alert('注册失败：' + msg);
		}else{
			alert('恭喜你，注册成功');
		}
	});

	$('.register').click(function(){
		var username = $('#username').val();
		var pass = $('#psd').val();
		sock.emit('reg',username,pass);
	});

})(jQuery);