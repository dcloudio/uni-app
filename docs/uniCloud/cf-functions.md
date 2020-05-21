
## 简介

云函数是运行在云端的 `JavaScript` 代码，和普通的`Node.js`开发一样，熟悉`Node.js`的开发者可以直接上手。

如下是将传入的两个参数求和并返回客户端的云函数代码示例：

```
'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	return {
    sum:event.a + event.b
  }
}
```

云函数的传入参数有两个，一个是`event`对象，一个是`context`对象。`event`指的是触发云函数的事件，当客户端调用云函数时，`event`就是客户端调用云函数时传入的参数。`context` 对象包含了此处调用的调用信息和运行状态，可以用它来了解服务运行的情况。`uniCloud`会自动将客户端的操作系统（`os`）、运行平台（`platform`）、应用信息（`appid`）等注入`context`中，开发者可通过`context`获取每次调用的上下文，如下是一个示例：

```
'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
  ...
  //context中可获取客户端调用的上下文
  let os = context.OS //客户端操作系统，返回值：android、ios	等
  let platform = context.PLATFORM //运行平台，返回值为 mp-weixin、app-plus等
  let appid = context.APPID // manifest.json中配置的appid
  let clientIP = context.CLIENTIP // 客户端ip信息
  let clientUA = context.CLIENTUA // 客户端user-agent
	... //其它业务代码
}
```

**关于CLIENTIP、CLIENTUA**

- 通过管理端调用云函数（云函数上传并运行、腾讯云开发调试期间），使用腾讯云时想临时调试UA、IP等可以通过自行初始化`uniCloud`的方式（[同时连多服务空间](uniCloud/init.md)
）传入`debugFunction: false`来实现客户端直连调用，需要注意的是此时控制台将不会打印云函数日志。


云函数中如果要使用其他服务（比如mysql数据库、redis等），可以按照nodejs的写法即可。

**注意事项**

- 服务商为阿里云时，暂不可使用相对路径读取文件（比如`fs.readFileSync('./info.txt')`），可以使用绝对路径`fs.readFileSync(path.resolve(__dirname,'./info.txt'))`

## 访问数据库

云函数中支持访问本服务空间下的数据库，调用方式详见[规范](uniCloud/cf-database.md)

## 访问HTTP服务

`uniCloud`提供了`uniCloud.httpclient`供开发者使用。无需额外依赖，就可以请求任何 HTTP 和 HTTPS 协议的 Web 服务。`uniCloud.httpclient`返回的是一个[urllib实例](https://github.com/node-modules/urllib)。

**uniCloud.httpclient.request(URL,requestOptions)**

**requestOptions参数说明**

|参数名							|类型																																																				|是否必填	|默认值	|说明																																																																																			|
|----								|----																																																				|----			|----		|----																																																																																			|
|method							|String																																																			| -				|GET		|HTTP 请求方法, 默认为：GET. 可选值： GET, POST, DELETE, PUT																																																							|
|data								|Object																																																			| -				|-			|发送的数据																																																																																|
|dataAsQueryString	|Boolean																																																		| -				|true		|是否强制转换data为queryString																																																																						|
|content						|String &#124; Buffer																																												| -				|-			|手动设置请求的payload，设置后会忽略data																																																																	|
|stream							|ReadStream																																																	|-				|-			|发送请求正文的可读数据流																																																																									|
|writeStream				|WriteStream																																																|-				|-			|接受响应数据的可写数据流																																																																									|
|consumeWriteStream	|Boolean																																																		|-				|true		|是否等待 writeStream 完全写完才算响应全部接收完毕																																																												|
|files							|Array&lt;ReadStream&#124;Buffer&#124;String&gt; &#124; Object &#124; ReadStream &#124; Buffer &#124; String| -				|-			|上传的文件，设置后将会使用 multipart/form-data 格式。如果未设置method，将会自动将method设置为POST																																				|
|contentType				|String																																																			| -				|-			|上传数据的格式，设为`json`会自动在`header`内设置`Content-Type: application/json`																																													|
|nestedQuerystring	|Boolean																																																		| -				|-			|转换data为queryString时默认不支持嵌套Object，此选项设置为true则支持转换嵌套Object																																												|
|dataType						|String																																																			| -				|-			|返回的数据格式，可选值为 'json'（返回数据转为JSON），'text'（返回数据转为字符串）， ''（返回数据不做处理，默认值）																												|
|fixJSONCtlChars		|Boolean																																																		|-				|false	|在JSON.parse之前处理响应结果中的控制字符（Control Character）																																																						|
|headers						|Object																																																			| -				|-			|请求头																																																																																		|
|timeout						|Number &#124; Array																																												| -				|-			|超时时间设置。设置为数组时第一项为请求超时，第二项为返回超时。设置为数字时相当于同时设置请求超时和返回超时，即`timeout:3000`效果等于`timeouut:[3000,3000]`								|
|auth								|String																																																			|-				|-			|简单登录授权（Basic Authentication）参数，必须按照 `user:password` 格式设置																																															|
|digestAuth					|String																																																			|-				|-			|摘要登录授权（Digest Authentication）参数，必须按照 `user:password` 格式设置																																															|
|agent							|[http.Agent](https://nodejs.org/api/http.html#http_class_http_agent)																				|-				|-			|http代理，如不使用可设为false																																																																						|
|httpsAgent					|[https.Agent](https://nodejs.org/api/https.html#https_class_https_agent)																		|-				|-			|https代理，如不使用可设为false																																																																						|
|ca									|String&#124;Buffer&#124;Array																																							|-				|-			|证书内容																																																																																	|
|rejectUnauthorized	|Boolean																																																		|-				|true		|是否在证书不受信任时返回错误																																																																							|
|pfx								|String&#124;Buffer																																													|-				|-			|包含了私钥, 证书和CA certs, 一般是 PFX 或者 PKCS12 格式																																																									|
|key								|String&#124;Buffer																																													|-				|-			|PEF格式的服务器的私钥																																																																										|
|cert								|String&#124;Buffer																																													|-				|-			|PEM格式的服务器证书密钥																																																																									|
|passphrase					|String																																																			|-				|-			|私钥或pfx密码的字符串																																																																										|
|ciphers						|String																																																			|-				|-			|使用或排除的cipher																																																																												|
|secureProtocol			|String																																																			|-				|-			|SSL 使用的方法，例如，`SSLv3_method` 强制 SSL 版本为3。																																																									|
|followRedirect			|Boolean																																																		|-				|false	|收到3xx响应时是否自动重定向																																																																							|
|maxRedirects				|Number																																																			|-				|10			|最高重定向次数																																																																														|
|formatRedirectUrl	|Function																																																		|-				|-			|手动格式化url																																																																														|
|beforeRequest			|Function																																																		|-				|-			|请求发送前的钩子																																																																													|
|streaming					|Boolean																																																		|-				|false	|是否直接返回响应流，开启 streaming 之后，HttpClient 会在拿到响应对象 res 之后马上返回， 此时 result.headers 和 result.status 已经可以读取到，只是没有读取 data 数据而已。|
|gzip								|Boolean																																																		|-				|false	|是否支持 gzip 响应格式。开启 gzip 之后，HttpClient 将自动设置 Accept-Encoding: gzip 请求头， 并且会自动解压带 Content-Encoding: gzip 响应头的数据。											|
|timing							|Boolean																																																		|-				|false	|是否开启请求各阶段的时间测量																																																																							|
|enableProxy				|Boolean																																																		|-				|false	|是否启用代理																																																																															|
|proxy							|String																																																			|-				|null		| 代理地址																																																																																|
|lookup							|Function																																																		|-				|-			|自定义DNS查询函数																																																																												|
|checkAddress				|Function																																																		|-				|-			|校验请求地址																																																																															|
|trace							|Boolean																																																		|-				|false	|是否启用捕获堆栈																																																																													|


**示例代码**

```
const res = await uniCloud.httpclient.request(apiUrl, {
    method: 'POST',
    data: {
      test: 'testValue'
    },
    dataType: 'json'
  })
console.log(res)
```

## 使用npm

在云函数中我们可以引入第三方依赖来帮助我们更快的开发。云函数的运行环境是 `Node.js`，因此我们可以使用 `npm` 安装第三方依赖。

注意：鉴于阿里云的限制，目前仅支持全量上传云函数（整个 node_modules文件夹全部上传），因此提醒大家，精简依赖，否则可能会每次上传时间很慢，影响开发体验。

Tips:
- 目前每个云函数上传包大小限制为10M。

## 客户端调用云函数

前端代码（H5前端、App、小程序），不再执行uni.request联网，而是通过`uniCloud.callFunction`调用云函数，`callFunction`定义如下：

#### 请求参数

|字段	|类型	|必填	|说明		|
|:-:	|:-:	|:-:	|:-:		|
|name	|String	|是		|云函数名称|
|data	|Object	|否		|客户端需要传递的参数|

#### 响应参数

|字段		|类型	|说明						|
|:-:		|:-:	|:-:						|
|result		|Object	|云函数执行结果				|
|requestId	|String	|请求序列号，用于错误排查	|

#### 示例代码

```javascript
// promise方式
uniCloud.callFunction({
    name: 'test',
    data: { a: 1 }
  })
  .then(res => {});

// callback方式
uniCloud.callFunction({
	name: 'test',
	data: { a: 1 },
	success(){},
	fail(){},
	complete(){}
});
```

目前仅支持客户端调用云函数，即将支持云函数调用云函数。

## 云函数中调用云函数@callbyfunction

用法同客户端调用云函数，不支持callback形式

#### 请求参数

|字段			|类型			|必填	|说明					|
|---			|---			|---	|---					|
|name			|String		|是		|云函数名称。	|
|data			|Object		|否		|云函数参数。	|

#### 响应参数

|字段			|类型		|必备	|说明												|
|---			|---		|---	|---												|
|errCode	|String	|否		|状态码，操作成功则不返回。	|
|errMsg		|String	|否		|错误描述。									|
|result		|Object	|否		|云函数执行结果。						|
|requestId|String	|否		|请求序列号，用于错误排查。	|

**示例代码**

```javascript
let callFunctionResult = await uniCloud.callFunction({
    name: "test",
    data: { a: 1 }
})
```

## 注意事项

### 云函数的启动模式（冷启动、热启动）

基于云函数按需执行的特点, 函数在不被触发的时候, 计算资源是不被激活的。

当一个云函数初次被触发时，其完整过程如下：

1. 实例化计算实例
2. 加载函数代码
3. 启动 node
4. 执行代码

函数被调用时，执行这些完整步骤的过程一般称作冷启动, 冷启动的耗时往往比较长. 

而如果函数实例和执行进程都被复用的情况下一般被定义为热启动, 热启动的性能较冷启动要好很多.

如果一个云函数实例长时间没有被再次调用，则该计算实例会被销毁；将来再次调用该云函数时，就会再次触发云函数的冷启动。

因为存在冷热启动的差异，云函数中的全局变量就可能出现每次不一样的情况。

以如下代码为例，`count`作为全局变量，当多次调用该云函数时，可能会出现变量累加的情况（实例未复用时，每次返回0，若实例被复用，则可能返回1、2、3等各种意外情况）


```javascript
let count = 0;
module.exports = async (event) => {
  return count++
  //此示例为错误示例
  //云函数实例未复用时，每次返回0
  //若实例被复用，则可能返回1、2、3等各种意外情况
}
```

### 临时存储空间

云函数是运行在云端的代码，运行环境由云服务器弹性调配，这是和传统`Node.js`应用很大的区别。

换言之，云函数每次执行的宿主环境（可简单理解为虚拟机或服务器硬件）可能相同，也可能不同，因此传统`Node.js`开发中将部分信息存储本地硬盘或内存的方案就不再适合，建议通过云数据库或云存储的方案替代。

### 云函数中的异步行为

书写云函数时应注意`async`、`await`的使用，`nodejs`有内置模块`util`可以将符合`error-first`形式`callback`的函数转换为`promise`形式，[详情参考](https://nodejs.org/api/util.html#util_util_promisify_original)，比如以下示例：

```js
const {
	promisify
} = require('util')

let testCallback = {
	value: 'testCallbackValue',
	echo: function(num, callback) {
		setTimeout(() => {
      // 第一个参数为error，第二个为返回值
			callback(null, `${this.value}:${num}`)
		}, 2000)
	}
}

exports.main = async function() {
  // num=2，不传入callback参数，callback会自动作为回调函数处理
	let val = await promisify(testCallback.echo).call(testCallback, 2)
	console.log(val)
	return val
}

```

如果想在云函数内使用回调形式可以让云函数返回一个promise，如以下示例：

```js
exports.main = async function() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('some return value')
		}, 1000)
	})
}
```



###  其它

- 云函数中使用的时区是 `UTC+0`，而不是 `UTC+8`，在云函数中使用时间时需特别注意。
- 使用阿里云作为服务商时，暂时无法使用相对路径读取文件，如：`fs.readFileSync('./info')`，可以替换为`fs.readFileSync(path.resolve(__dirname,'./info'))`



