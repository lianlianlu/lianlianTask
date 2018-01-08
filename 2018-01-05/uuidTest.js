const common = require('./libs/common')
let uuid = common.uuid();
let md5Pass = common.md5('111111');

console.log(uuid);
console.log(md5Pass);