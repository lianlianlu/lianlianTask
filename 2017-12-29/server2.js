const express = require('express');

let server = express();
server.listen(8080);

//静态资源
server.use(express.static('./www/'));






