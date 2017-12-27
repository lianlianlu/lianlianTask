/*const url = require('url');
let obj = url.parse("https://cn.bing.com/search?q=vue-cli%E5%A6%82%E4%BD%95%E9%85%8D%E7%BD%AE%E5%A4%9A%E4%B8%AA%E7%8E%AF%E5%A2%83%EF%BC%88%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83%EF%BC%8C%E6%B5%8B%E8%AF%95%E7%8E%AF%E5%A2%83%EF%BC%8C%E9%A2%84%E5%8F%91%E7%8E%AF%E5%A2%83%EF%BC%89&qs=n&form=QBLH&sp=-1&pq=undefined&sc=0-31&sk=&cvid=66565FD18FCF4CCA8006E4FBEA9B8EE1");
console.log(obj)*/

const querystring = require('querystring');
let str = `"https://cn.bing.com/search?q=
	vue-cli%E5%A6%82%E4%BD%95%E9%85%8D%E7%BD%AE%E5%A4%9A%E4%B8%AA%E7%8E%AF%E5%A2%83%EF%BC%88%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83%EF%BC%8C%E6%B5%8B%E8%AF%95%E7%8E%AF%E5%A2%83%EF%BC%8C%E9%A2%84%E5%8F%91%E7%8E%AF%E5%A2%83%EF%BC%89
	&qs=n
	&form=QBLH
	&sp=-1
	&pq=undefined
	&sc=0-31
	&sk=
	&cvid=66565FD18FCF4CCA8006E4FBEA9B8EE1"`;
let obj1 = querystring.parse(str);
console.log(obj1);

/*
	{ 
	'https://cn.bing.com/search?q': 'vue-cli如何配置多个环境（生产环境，测试环境，预发环境）',
  qs: 'n',
  form: 'QBLH',
  sp: '-1',
  pq: 'undefined',
  sc: '0-31',
  sk: '',
  cvid: '66565FD18FCF4CCA8006E4FBEA9B8EE1' 
	}

*/






