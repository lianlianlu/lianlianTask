const dns = require('dns');
//dns解析 网址解析
/*dns.lookup('www.baidu.com',(err,data)=>{
	if(!err){
		console.log(data);//61.135.169.121 百度的ip不间断的在变
	}else{
		console.log('错了');
	}
});*/
dns.lookup('www.google.com',(err,data)=>{
	if(!err){
		console.log(data);//31.13.79.1
	}else{
		console.log('错了');
	}
});