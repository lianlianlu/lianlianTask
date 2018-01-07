const http = require('http');
const url = require('url');
const querystring = require('querystring');

//const myUrl = url.parse('https://passport.weibo.com/visitor/visitor?entry=miniblog&a=enter&url=https%3A%2F%2Fweibo.com%2Fu%2F6442585067&domain=.weibo.com&sudaref=https%3A%2F%2Fwww.baidu.com%2Flink%3Furl%3D9BIAxKDeDVeWhKkttsUEEvYMmZrV7owrcbbTA63vkMPcixoPUR0FoqLz4HqTozth%26wd%3D%26eqid%3Db3fb229a00036322000000025a41e957&ua=php-sso_sdk_client-0.6.23&_rand=1514269017.5327');
//console.log(querystring.parse(myUrl.path));

let server = http.createServer((req,res) => {
	let {pathname,query} = url.parse(req.url,true);
	//console.log(pathname,query);

	//POST数据
	let aBuffer = [];
	req.on('data',data=>{
		/*console.log(data);//上传文件
		console.log(data.toString())
		以下文件类型，就是需要解析的东西
		------WebKitFormBoundarypqs7nOdt5tnbdyAy\r\n
		Content-Disposition: form-data; name="user"\r\n
		\r\n
		aaa\r\n
		------WebKitFormBoundarypqs7nOdt5tnbdyAy\r\n
		Content-Disposition: form-data; name="pass"\r\n
		\r\n
		nnnn\r\n
		------WebKitFormBoundarypqs7nOdt5tnbdyAy\r\n
		Content-Disposition: form-data; name="f1"; filename="1.txt"\r\n
		Content-Type: text/plain\r\n
		\r\n
		aaa\r\n
		bbb\r\n
		ccc\r\n
		------WebKitFormBoundarypqs7nOdt5tnbdyAy--\r\n

		简化版本
		<分隔符>\r\n
		说明\r\n
		\r\n
		数据1\r\n
		<分隔符>\r\n
		说明\r\n
		数据2\r\n
		<分隔符>\r\n
		说明\r\n
		说明\r\n
		说明\r\n
		数据说明\r\n
		<分隔符>--说明\r\n



		*/
		
		//aBuffer.push(data);
	});

	req.on('end', ()=>{
		let data = Buffer.concat(aBuffer);

		//urlencoded
		const post = querystring.parse(data.toString());

		//console.log('POST数据:',post);
	});
	
});

server.listen(8080);


