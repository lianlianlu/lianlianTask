const http = require('http');
const url = require('url');
const fs = require('fs');

let server = http.createServer((req,res) => {
	let {pathname,query} = url.parse(req.url, true);
	let rs = fs.createReadStream(`www${pathname}`);//创建读入流
	rs.pipe(res); //把rs通过管道塞进res里面  rs ==> res

	rs.on('error',function(){
		res.writeHeader(404);
		res.write('not found');
		res.end();
	});




});

server.listen(8080);