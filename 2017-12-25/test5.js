const common = require('./libs/common.js');
//
let str = 'Content-Disposition: form-data; name="user"; en=xx; aaa=12\r\nContent-Type: text/plain';

let jsonStr = common.parseInfo(str);

console.log(jsonStr);


