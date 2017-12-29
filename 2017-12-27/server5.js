const http = require('http');
const url = require('url');
const fs = require('fs');
const zlib = require('zlib');
const router = require('./routers/user');

let server = http.createServer((req,res) => {
	let {pathname,query} = url.parse(req.url, true);

	req.query = query;

	res.send = function (data){
		//a => array;
		//a => json
		//a => 'xxx';
		//a = > <data>------二进制
		console.log('data:',data);

	}

	//1.判断是不是一个接口
	if(false == router.emit(pathname,req,res)){
		//不是接口，如何处理
		//读取文件
		let rs = fs.createReadStream(`www${pathname}`);
		let gz = zlib.createGzip();

		res.setHeader('Content-Encoding','gzip');

		rs.pipe(gz).pipe(res);

		rs.on('error',err=>{
			//读取失败
			res.writeHeader(404);
			res.write('not found');
			res.end();
		});

	}else{
		//是个接口
		
	}

	




});

server.listen(8080);