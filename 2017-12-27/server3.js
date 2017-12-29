const http = require('http');
const url = require('url');
const fs = require('fs');
const zlib = require('zlib');

let server = http.createServer((req,res) => {
	let {pathname,query} = url.parse(req.url, true);

	let gzig = zlib.createGzip();
	let rs = fs.createReadStream(`www${pathname}`);//创建读入流
	let ws = fs.createWriteStream('bbb.gz');//创建写入流
	

	rs.pipe(gzig).pipe(ws);



	rs.on('error',function(){
		res.writeHeader(404);
		res.write('not found');
		res.end();
	});




});

server.listen(8080);