
### 简介

云函数是运行在云端的 `JavaScript` 代码，和普通的`Node.js`开发一样，熟悉`Node.js`的开发者可以直接上手。

如下是将传入参数求和的云函数实现示例：

```
'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	return {
    sum:event.a + event.b
  }
}
```

云函数的传入参数有两个，一个是`event`对象，一个是`context`对象。`event`指的是触发云函数的事件，当客户端调用云函数时，`event`就是客户端调用云函数时传入的参数。`context` 对象包含了此处调用的调用信息和运行状态，可以用它来了解服务运行的情况。`uniCloud`会自动将客户端的操作系统（`os`）、运行平台（`platform`）、应用信息（`appid`）等注入`contxt`中，开发者可通过`context`获取每次调用的上下文，如下是一个示例：

```
'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
  ...
  //context中可获取客户端调用的上下文
  let os = context.OS //客户端操作系统，返回值：android、ios	等
  let platform = context.PLATFORM //运行平台，返回值为 mp-weixin、app-plus等
  let appid = context.APPID // manifest.json中配置的appid
	return {
    sum:event.a + event.b
  }
}
```

### 访问数据库

云函数中支持访问本服务空间下的数据库，调用方式详见[规范](cf-database.md)

### 访问HTTP服务

`uniCloud`提供了`uniCloud.httpclient`供开发者使用。无需额外依赖，就可以请求任何 HTTP 和 HTTPS 协议的 Web 服务。`uniCloud.httpclient`返回的是一个[urllib实例](https://github.com/node-modules/urllib)，即`uniCloud.httpclient = require('urllib').create()`

**示例代码**

```
const res = await uniCloud.httpclient.request(apiUrl, {
    method: 'POST',
    data: {
      test: 'testValue'
    }
  })
console.log(res)
```

### 使用npm

在云函数中我们可以引入第三方依赖来帮助我们更快的开发。云函数的运行环境是 `Node.js`，因此我们可以使用 `npm` 安装第三方依赖。

注意：鉴于阿里云的限制，目前仅支持全量上传云函数（整个 node_modules文件夹全部上传），因此提醒大家，精简依赖，否则可能会每次上传时间很慢，影响开发体验。

Tips:
- 目前每个云函数上传包大小限制为10M。

### 云函数调用

目前仅支持客户端调用云函数，调用方式详见[规范](functions.md)

即将支持云函数调用云函数。

### 注意事项

云函数是运行在云端的代码，运行环境由云服务器弹性调配，这是和传统`Node.js`应用很大的区别。

换言之，云函数每次执行的宿主环境（可简单理解为虚拟机或服务器硬件）可能相同，也可能不同，因此传统`Node.js`开发中将部分信息存储本地硬盘或内存的方案就不再适合，建议通过云数据库或云存储的方案替代。

另一方面，鉴于云函数的弹性调配机制，为提高运行性能，部分云厂商在一定时间周期内会复用相同的云函数实例，此时为避免数据污染，建议使用无状态的风格编写函数代码。

以如下代码为例，`count`作为全局变量，当多次调用该云函数时，可能会出现变量累加的情况（实例未复用时，每次返回0，若实例被复用，则可能返回1、2、3等各种意外情况）

```javascript
let count = 0;
module.exports = async (context) => {
  return count++
}
```


<!-- 
## uniCloud.callFunction(Object callFunctionOptions)

云函数中调用云函数。**目前仅腾讯云支持**

**callFunctionOptions参数说明**

|字段			|类型			|必填	|说明					|
|---			|---			|---	|---					|
|name			|String		|是		|云函数名称。	|
|data			|Object		|否		|云函数参数。	|
|callback	|Function	|否		|回调函数。		|

**响应参数**

|字段			|类型		|必备	|说明												|
|---			|---		|---	|---												|
|errCode	|String	|否		|状态码，操作成功则不返回。	|
|errMsg		|String	|否		|错误描述。									|
|result		|Object	|否		|云函数执行结果。						|
|requestId|String	|否		|请求序列号，用于错误排查。	|

**示例代码**

```javascript
//promise
uniCloud.callFunction({
    name: "test",
    data: { a: 1 }
}).then((res) => {
    
});
```

 -->