const os = require('os');
//os.loadavg()方法返回一个数组,包含1, 5, 15分钟平均负载.
/*
	平均负载是系统活动的测量,由操作系统计算得出,表达为一个分数.
	一般来说,平均负载应该理想地比系统的逻辑CPU的数目要少. 
	平均负载是UNIX相关的概念,在Windows平台上没有对应的概念.
	在Windows上,其返回值总是[0, 0, 0].
*/
  
console.log(os.hostname());
console.log(os.loadavg());