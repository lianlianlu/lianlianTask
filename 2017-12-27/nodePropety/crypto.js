const crypto = require('crypto');
//加密
let hash = crypto.createHash('md5');

hash.update('abc');
hash.update('efg');

console.log(hash.digest('hex'));
/*
	hash.update('abcefg');
*/
//fbd7809b1f99a5b790068736a1c62cf0
/*
	hash.update('abc');
	hash.update('efg');
*/
//fbd7809b1f99a5b790068736a1c62cf0
