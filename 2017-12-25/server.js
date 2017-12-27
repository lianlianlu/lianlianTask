const http = require('http');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req,res)=>{
	
	let {pathname,query} = url.parse(req.url,true);
	//console.log(pathname,query);

	req.on('data',data => {
		/*
			console.log(data.toString());
			得到的data是流文件，buffer
			------WebKitFormBoundaryn2scUzkhgQOndvm3
			Content-Disposition: form-data; name="user"

			aaa
			------WebKitFormBoundaryn2scUzkhgQOndvm3
			Content-Disposition: form-data; name="pass"

			nnnn
			------WebKitFormBoundaryn2scUzkhgQOndvm3
			Content-Disposition: form-data; name="f1"; filename="1.txt"
			Content-Type: text/plain

			aaa
			bbb
			ccc
			------WebKitFormBoundaryn2scUzkhgQOndvm3--

		*/
		

	});


});

server.listen(8080);