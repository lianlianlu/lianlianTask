let express = require('express');
let cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser());

app.get("/",function(req,res){
	console.log("Cookies:" ,req.cookies);
	res.end();
});

app.listen(8081);