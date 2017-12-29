const http = require('http');
const url = require('url');
const fs = require('fs');

let server = http.createServer((req,res) => {
	let {pathname,query} = url.parse(req.url, true);

	switch(pathname){
		case:'/login':
		//xxx
		break;
		case: '/rg':
		//xxx
		break;
		case ''
	}




});

server.listen(8080);