const http = require('http');
const url = require('url');
const fs = require('fs');

let server = http.createServer((req,res) => {
	let {pathname,query} = url.parse(req.url, true);

	console.log(pathname);
	fs.readFile(`www${pathname}`,(err,data)=>{
		if(err){

			res.writeHeader(404);
			res.write('not found');
		}else{
			res.write(data);
		}
		res.end();
	});


});

server.listen(8080);