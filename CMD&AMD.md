### CMD AMD浅显理解
#### 1.初识模块化
> 最近几年，由于Javascript飞速发展，框架越做越大,已经不像过去那样全部写进一个JS文件中。但拆到多个JS文件时，就要决定哪个是入口文件，哪个是次要文件，而这些次要文件也不可能按1、2、3、4的顺序组织起来，可能是1依赖2、3,3依赖4、5，每个文件的顶部都像其他语言那样声明其依赖，最后在结束时说明如何暴露那些变量或方法给外部使用。就算你的框架只有几千行，在开发时将它们按照功能拆分为10多个文件，维护起来也非常方便。-------摘自《JavaScript框架设计》。
***
&emsp;&emsp;时下流行三种定义模块的规范：AMD,CommonJS,ES6 module。但是我们今天讨论的是CMD、AMD这两种种规范。请看下表，简单的总览一下：
#### 2.CMD
CMD规范和AMD相似，尽量保持简单，并且与CommonJS和NodeJS的Modules规范保持了很大的兼容性。这个模块的规范主打作品是seajs，虽然现在基本都已经不用了，但是精神犹存。
##### 官方说明：
- *定位*：Sea.js 则专注于 Web 浏览器端，同时通过 Node 扩展的方式可以很方便跑在 Node 环境中。
- *遵循的规范*：Sea.js 更贴近 CommonJS Modules/1.1 和 Node Modules 规范。
- *推广理念*：Sea.js 不强推，采用自主封装的方式来“海纳百川”，目前已有较成熟的封装策略（现在没了）
- *对开发调试的支持*：Sea.js 非常关注代码的开发调试，有 nocache、debug 等用于调试的插件。
- *插件机制*：Sea.js 采取的是通用事件机制，插件类型更丰富。
##### 代码说明：
- 就近依赖
`define(function(require,exports,module){
    var a = require('./');
    a.doSomething();
    //...........一堆代码
    var b = require('./b');
    b.doSomething();
    //............一堆代码
})`
- seajs使用例子
//第一步，先定义模块 myModule.js文件
`define(function(require, exports, module) {
  var $ = require('jquery.js')
  $('div').addClass('active');
  exports.data = 1;
});`
// 第二步，加载模块
`seajs.use(['myModule.js'], function(my){
    var star= my.data;
    console.log(star);  
});`
#### 3.AMD
以AMD定义的JS模块通过RequireJS能直接运行于浏览器。它的意思是“异步模块定义”，它不是原生JS支持，实际上，AMD是RequireJS在推广过程中对模块定义的规范化的产出。异步，反应了它模块加载的时候不影响它后面语句的执行，所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。
##### 解决的问题：
1. 多个js文件可能有依赖关系，被依赖的文件需要早于依赖它的文件加载到浏览器
2. js加载的时候浏览器会停止页面渲染，加载文件越多，页面失去响应时间越长
##### 代码说明：
- requireJS，它也定义了一个全局函数define()来定义模块。只不过这个函数与CMD不同的是，参数。。。哈哈，好像说的废话。我来写一下，define(模块的名字，依赖dependencies，工厂方法factory);
- 说明一下哈：
1.定义中模块的名字，可选；如果没有提供该参数，模块的名字应该默认为模块加载器请求的指定脚本的名字。如果提供了该参数，模块名必须是“顶级”的和绝对的（不允许相对名字）。
2.依赖dependencies,是一个当前模块依赖的，已被模块定义的模块标识的数组字面量。
依赖参数是可选的，如果忽略此参数，它应该默认为["require", "exports", "module"]。然而，如果工厂方法的长度属性小于3，加载器会选择以函数的长度属性指定的参数个数调用工厂方法。
3.工厂方法factory，模块初始化要执行的函数或对象。如果为函数，它应该只被执行一次。如果是对象，此对象应该为模块的输出值。
- 来段代码
`
    define("alpha", ["require", "exports", "beta"], function (require, exports, beta) {
       exports.verb = function() {
           return beta.verb();
           //Or:
           return require("beta").verb();
       }
   });
`
- requireJs使用列子
1.require.config是用来定义别名的，然后通过requirejs(['模块名1'，'模块名2'],calback(return{})
2.`main.js
    //别名配置
    requirejs.config({
        paths: {
            jquery: 'jquery.min' //可以省略.js
        }
    });
    //引入模块，用变量$表示jquery模块
    requirejs(['jquery'], function ($) {
        $('body').css('background-color','red');
    });`
3.引入模块也可以只写require()。requirejs通过define()定义模块，定义的参数上同。在此模块内的方法和变量外部是无法访问的，只有通过return返回才行.
`math.js
define('math',['jquery'], function ($) {//引入jQuery模块
    return {
        add: function(x,y){
            return x + y;
        }
    };
});`
4.将该模块命名为math.js保存。
`require(['jquery','math'], function ($,math) {
    console.log(math.add(10,100));//110
});`






