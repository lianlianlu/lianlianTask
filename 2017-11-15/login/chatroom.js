(function($){
	let sock = io.connect('http://localhost:8080/');
	
		$('.chat-container').height(window.screen.height);


	//自己发言哦
	sock.on('msg_ret',(code,msg) => {
		if(code){
			alert(msg);
		}else{
			let txt = $('#send-content').val();
			let username1 = getParamValue('username');
			$('.ul1').append(`<li><h6>${username1}</h6><p>${txt}</p></li>`);
			$('#send-content').val('')
		}
	});

	//别人发言
	sock.on('msg',(name,txt)=>{
		console.log('name:', name);
		$('.ul1').append(`<li><h6>${name}</h6><p>${txt}</p></li>`);
	});

	$('#send').click(function(){
		let txt = $('#send-content').val();
		sock.emit('msg',txt);
	});

	

	function getParamValue(param) {
    var pairs = location.search.replace('?', '').split('&');
    
    for (var i = 0, len = pairs.length; i < len; i++) {
        var kv = pairs[i].split('=');
        if (kv[0] == param) {
            return kv[1];
        }
    }
    return null;
}

})(jQuery);