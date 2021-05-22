
## 简介@intro

云函数是运行在云端的 `JavaScript` 代码，和普通的`Node.js`开发一样，熟悉`Node.js`的开发者可以直接上手。

如下是将传入的两个参数求和并返回客户端的云函数代码示例：

```js
'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	return {
    sum:event.a + event.b
  }
}
```

云函数的传入参数有两个，一个是`event`对象，一个是`context`对象。`event`指的是触发云函数的事件，当客户端调用云函数时，`event`就是客户端调用云函数时传入的参数。`context` 对象包含了此处调用的调用信息和运行状态，可以用它来了解服务运行的情况。`uniCloud`会自动将客户端的操作系统（`os`）、运行平台（`platform`）、应用信息（`appid`）等注入`context`中，开发者可通过`context`获取每次调用的上下文，如下是一个示例：

```js
'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
  //...
  //context中可获取客户端调用的上下文
  let clientIP = context.CLIENTIP // 客户端ip信息
  let clientUA = context.CLIENTUA // 客户端user-agent
  let spaceInfo = context.SPACEINFO // 当前环境信息 {spaceId:'xxx',provider:'tencent'}
  // 以下四个属性只有使用uni-app以callFunction方式调用才能获取
  let os = context.OS //客户端操作系统，返回值：android、ios	等
  let platform = context.PLATFORM //运行平台，返回值为 mp-weixin、app-plus等
  let appid = context.APPID // manifest.json中配置的appid
  let deviceId = context.DEVICEID // 客户端标识，新增于HBuilderX 3.1.0，同uni-app客户端getSystemInfo接口获取的deviceId
	//... //其它业务代码
}
```

云函数url化的场景下无法获取`context.OS`、`context.PLATFORM`、`context.APPID`、`context.CLIENTUUID`

>在云函数URL化的场景无法获取客户端平台信息，可以在调用依赖客户端平台的接口接口之前（推荐在云函数入口）通过修改context.PLATFORM手动传入客户端平台信息供其他插件（如：uni-id）使用

例：

```js
exports.main = async (event, context) => {
	context.PLATFORM = 'app-plus'
}
```

云函数中如果要使用其他服务（比如mysql数据库、redis等），可以按照nodejs的写法即可。但注意这些非uniCloud数据库和云函数运行环境不在一起，访问速度受影响。

**注意事项**

- 服务商为阿里云时，暂不可使用相对路径读取文件（比如`fs.readFileSync('./info.txt')`），可以使用绝对路径`fs.readFileSync(path.resolve(__dirname,'./info.txt'))`
- event大小不可超过100kb

## API列表

云函数支持nodejs和js的标准API，但除了标准API外，uniCloud扩展了一批新API，实际开发中更常用的是uniCloud的扩展API。见下：

|API						|描述																					|
|--							|--																						|
|uniCloud.callFunction()	|云函数中调用另一个云函数 [见下](uniCloud/cf-functions?id=callbyfunction)				|
|uniCloud.database()		|云数据库对象 [详情](uniCloud/cf-database.md)											|
|uniCloud.uploadFile()		|云函数上传文件到云存储 [详情](uniCloud/storage?id=clouduploadfile)							|
|uniCloud.downloadFile()	|云函数下载云存储的文件到云函数运行环境 [详情](uniCloud/storage?id=clouddownloadfile)	|
|uniCloud.deleteFile()		|云函数删除云存储的文件 [详情](uniCloud/storage?id=clouddeletefile)							|
|uniCloud.getTempFileURL()	|获取云存储文件的临时路径 [详情](uniCloud/storage?id=cloudgettempfileurl)					|
|uniCloud.httpclient		|云函数中通过http连接其他系统 [见下](uniCloud/cf-functions?id=httpclient)				|
|uniCloud.logger			|云函数中打印日志到uniCloud日志记录系统（非HBuilderX控制台）[详情](uniCloud/cf-logger)	|
|uniCloud.sendSms()			|发送短信 [详见](uniCloud/send-sms.md)													|


## 特殊属性

**注意：下面所有的“客户端”均是相对于云函数而言，如果你使用自己的服务器调用云函数此时客户端是指你的服务器**

### 获取客户端IP@clientip

```js
'use strict';
exports.main = async (event, context) => {
  let clientIP = context.CLIENTIP // 客户端ip信息
}
```

### 获取客户端user-agent@client-user-agent

```js
'use strict';
exports.main = async (event, context) => {
  let clientUA = context.CLIENTUA // 客户端user-agent信息
}
```

### 获取服务空间信息@context-space-info

```js
'use strict';
exports.main = async (event, context) => {
  let spaceInfo = context.SPACEINFO // 当前环境信息 {spaceId:'xxx',provider:'tencent'}
}
```

### 其他客户端信息@client-info

**以下四个属性只有使用uni-app以callFunction方式调用才能获取**

```js
'use strict';
exports.main = async (event, context) => {
  let os = context.OS //客户端操作系统，返回值：android、ios	等
  let platform = context.PLATFORM //运行平台，返回值为 mp-weixin、app-plus等
  let appid = context.APPID // manifest.json中配置的appid
  let deviceId = context.DEVICEID // 客户端标识，新增于HBuilderX 3.1.0，同uni-app客户端getSystemInfo接口获取的deviceId
}
```

## 访问数据库

云函数中支持访问本服务空间下的数据库，调用方式详见[规范](uniCloud/cf-database.md)

## 访问HTTP服务@httpclient

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

```js
const res = await uniCloud.httpclient.request(apiUrl, {
    method: 'POST',
    data: {
      test: 'testValue'
    },
    contentType: 'json', // 指定以application/json发送data内的数据
    dataType: 'json' // 指定返回值为json格式，自动进行parse
  })
console.log(res)
```

返回数据结构如下

```js
{
	"data": {"name": "DCloud"}, // 响应内容
	"status": 200, // 状态码
	"headers": { // 响应头，仅作示例，不同服务器返回的有差异
		"date": "Tue, 29 Dec 2020 08:10:30 GMT",
		"content-type": "application/json",
		"content-length": "276",
		"connection": "keep-alive",
		"server": "gunicorn/19.9.0",
		"access-control-allow-origin": "*",
		"access-control-allow-credentials": "true"
	}
}

```

**发送formdata类型数据**

实际业务中常有使用云函数发送formdata类型数据的需求，比如微信小程序提供的一些服务端接口（图片内容安全检测、识别图片二维码等），可以参考以下示例进行发送

```js
'use strict';
const fs = require('fs')
const path = require('path')
const FormData = require('form-data'); // 此form-data需要使用npm安装，地址：https://www.npmjs.com/package/form-data
exports.main = async (event, context) => {
  const form = new FormData()
  form.append('media', fs.readFileSync(path.resolve(__dirname, './test.jpg')), { // 为方便演示此处直接使用云函数目录下的test.jpg文件
    filename: 'test.jpg',
    contentType: 'image/jpeg'
  });
  form.append('otherParam', 'otherParam content');
  const res = await uniCloud.httpclient.request('https://httpbin.org/post', {
    method: 'POST',
    content: form.getBuffer(), // 请求内容
    headers: form.getHeaders(), // 请求头
    dataType: 'json' // 此处指定为json表示将此请求的返回值解析为json
  })
  return res
};

```

## 使用npm

云函数的运行环境是 `Node.js`，因此我们可以使用 `npm` 安装第三方依赖。

注意：阿里云目前仅支持全量上传云函数（整个 node_modules文件夹全部上传），因此提醒开发者精简依赖，否则可能会每次上传时间很慢，影响开发体验。并且太大的npm库影响云函数的运行性能。

腾讯云会在上传云函数后自动安装需要的npm依赖。

Tips:
- 目前每个云函数上传包大小限制为10M。如果npm包很大，阿里云的整体上传机制会无法满足需求。此时只能选择腾讯云，交给腾讯云自动安装依赖。

## 公共模块

云函数支持公共模块。多个云函数的共享部分，可以抽离为公共模块，然后被多个云函数引用。[详见](uniCloud/cf-common)

## 客户端调用云函数@clientcallfunction

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

## 云函数中调用云函数@callbyfunction

用法同客户端调用云函数，不支持callback形式。**云函数本地运行时使用callFunction会调用云端的云函数而不是本地云函数，连接本地云函数调试时云函数内的callFunction会调用本地云函数**

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

## 开发模式

实际项目中，很少会每个接口新建一个云函数。

更常见的开发模式有如下两种：

- 不写云函数，客户端直接操作数据库，开发效率更高。详见：[clientDB](uniCloud/database)
- 使用路由框架，在一个云函数内通过控制器、路由的方式编写服务器接口，控制更灵活。插件市场有很多这类插件，[详见](https://ext.dcloud.net.cn/search?q=%E8%B7%AF%E7%94%B1&orderBy=WeekDownload&cat1=7)

## 云函数配置

### 超时时间

**注意**

- 目前阿里云的超时时间和腾讯云有区别，如果在阿里云云函数运行超过10秒那么客户端没法同步接收返回结果，但是云函数仍会运行到配置的超时时间。腾讯云在云函数运行到配置的超时时间之前客户端都是可以收到返回结果的。

### 固定出口IP@eip

serverless默认是没有固定的服务器IP的，因为有很多服务器在后面供随时调用，每次调用到哪个服务器、哪个ip都不固定。

但一些三方系统，要求配置固定ip白名单，比如微信公众号的js sdk，此时只能提供固定ip地址。

目前腾讯云的收费版，提供了云函数的固定出口ip。ip属于有价资源，阿里云和腾讯云的免费版不提供这方面的能力。

在uniCloud [Web控制台](https://unicloud.dcloud.net.cn)，创建付费的腾讯云服务空间，选择一个云函数，在云函数的详情界面可以开启固定出口ip。开启后界面上会显示可用的固定ip。拿着这个ip去需要固定ip的界面（如微信公众号管理界面）配置即可。

**注意**

- 同一个服务空间内所有开启固定出口IP的云函数使用的是同一个IP。
- 如果你是免费版升配到付费版，开启`固定IP`功能后，会导致付费版到期无法自动降级到免费版，请注意按时续费

### 单实例多并发@concurrency

> 仅阿里云支持

默认情况下云函数仅支持单实例单并发，即同一时间一个实例仅可为一个用户服务（不同用户同一时间访问会被分派到不同实例进行处理）。通过修改云函数单实例并发度，可以修改云函数同一时间最多能处理多少请求。

假设同时有3个请求需要处理，当实例并发度设置为1时，需要创建3个实例来处理这3个请求，每个实例分别处理1个请求。而每开启一个实例都会引发云函数冷启动；当云函数的实例并发度设置为10时（即1个实例可以同时处理10个请求），只需要创建1个实例就能处理这3个请求。这样后面2个并发请求不会造成云函数的冷启动。

**开启方式**

云函数详情页面配置单实例并发度即可，支持1-100之间的数值

**效果**

- 有效减少并发请求时云函数冷启动次数
  
**使用注意**

- 云函数内存使用量会随着并发量增大而增加
- 如果并发的不同请求对全局变量同时进行读写会污染全局变量，可能会导致意想不到的后果，开启单实例多并发后请不要编写修改全局变量的代码，除非你熟悉这种技术带来的特殊应用，比如下文进阶部分提到的ip过滤。

**适用场景**

|场景																	|适用性	|理由																																	|
|:-:																	|:-:		|:-:																																	|
|函数中有较多时间在等待下游服务的响应	|适用		|等待响应一般不消耗资源，在一个实例内并发处理可以节省费用。						|
|函数中有共享状态且不能并发访问				|不适用	|例如全局变量，多请求并发执行修改共享状态可能会导致错误。							|
|单个请求的执行要消耗大量CPU及内存资源|不适用	|多请求并发执行会造成资源争抢，可能会导致内存不足（OOM）或者延时增加。|

**关于uni-id的特殊说明**

```js
// 开启单实例多并发前的uni-id用法
const uniID = require('uni-id')
exports.main = async function(event, context) {
  const res = uniID.login({
    // ...一些参数
  })
  return res
}

// 由于uni-id默认会从一个内置全局变量上获取客户端平台信息，不同请求会修改此全局变量可能造成混乱，开启单实例多并发后需要将uni-id修改为如下写法
let uniID = require('uni-id')
exports.main = async function(event, context) {
  let uniIDIns = uniID.createInstance({ // 创建uni-id实例，其上方法同uniID
    context: context, // 传入context防止不同请求互相影响
    config: {} // 完整uni-id配置信息，使用config.json进行配置时无需传此参数
  })
  const res = uniIDIns.login({
    // ...一些参数
  })
  return res
}
```

**进阶**

开启单实例多并发后的全局变量复用并非一定是坏的结果，如果你很了解此行为，也可以对此进行有效的利用

例：[ip-filter](https://ext.dcloud.net.cn/plugin?id=4619)中就利用云函数全局缓存一些ip访问信息来限制单ip访问频率，可以下载示例项目体验一下

## 云函数package.json@packagejson

HBuilderX 3.0版本之前，package.json只是一个标准的package.json，一般来说安装依赖或公共模块才需要。HBuilderX 3.0及以上版本，package.json也可以用来配置云函数。

uniCloud web控制台提供了很多云函数的设置，比如内存大小、url化、定时触发等，从HBuilderX 3.0起，在云函数的package.json里也可以编写这些设置。

开发者在本地编写云函数的设置，上传云函数，这些设置会自动在云端生效。（本地不生效）

在云端设置了非默认参数后，HBuilderX下载云函数到本地时，也会自动把设置项放入package.json中下载下来。

package.json是一个标准json文件，不可带注释。下面是一个package.json示例。

```json
{
  "name": "add-article",
  "version": "1.0.0",
  "description": "新增文章",
  "main": "index.js",
  "dependencies": {
    
  },
  "cloudfunction-config": {
      "memorySize": 256,
      "timeout": 5,
      "triggers": [{
          "name": "myTrigger",
          "type": "timer",
          "config": "0 0 2 1 * * *"
      }],
      "path": ""
    }
}
```

其中cloudfunction-config字段是云函数配置，支持的配置如下

```js
{
  "concurrency": 10, // 单个云函数实例最大并发量，不配置的情况下默认是1
  "memorySize": 256, // 函数的最大可用内存，单位MB，可选值： 128|256|512|1024|2048，默认值256
  "timeout": 5, // 函数的超时时间，单位秒，默认值5。最长为60秒，阿里云在定时触发时最长可以是600秒
  // triggers 字段是触发器数组，目前仅支持一个触发器，即数组只能填写一个，不可添加多个
  "triggers": [{
      // name: 触发器的名字，规则见https://uniapp.dcloud.net.cn/uniCloud/trigger，name不对阿里云生效
      "name": "myTrigger",
      // type: 触发器类型，目前仅支持 timer (即 定时触发器)，type不对阿里云生效
      "type": "timer",
      // config: 触发器配置，在定时触发器下，config 格式为 cron 表达式，规则见https://uniapp.dcloud.net.cn/uniCloud/trigger。使用阿里云时会自动忽略最后一位，即代表年份的一位在阿里云不生效
      "config": "0 0 2 1 * * *"
  }],
  // 云函数Url化path部分，阿里云需要以/http/开头
  "path": ""
}
```

**注意**

- 插件作者在发布插件时，如果云函数有特殊设置，应该放入package.json中，然后发布到插件市场。这样就不用再通过说明文档一步一步引导用户去配置云函数定时触发器、内存、url化路径等
- 在web控制台修改云函数配置后，通过HBuilderX的下载云函数菜单会在package.json内添加修改后的云函数配置
- 上传云函数时，如果项目下的package.json内包含云函数配置会同时进行云函数的配置更新
- package.json只有云端部署才生效，本地运行不生效。
- cloudfunction-config不可删除云端配置。例：云端已配置triggers（定时触发器），删除cloudfunction-config内的trigger不会删掉云端的定时触发器

## 使用cloudfunctions_init初始化云函数@init

`HBuilderX 2.9`版本，`uniCloud`提供了`cloudfunctions_init.json`来方便开发者快速进行云函数的初始化操作，即在HBuilderX工具中，一次性完成所有云函数的配置。

**注意：HBuilderX 3.0.0版本起不再使用cloudfunctions_init.json来初始化云函数。改为使用在云函数目录下通过package.json进行配置，具体见上个章节**

详细调整如下：

不再使用cloudfunctions_init.json，内容被分散到每个云函数的package.json的`cloudfunction-config`字段下

package.json是一个标准json文件，不可带注释。下面是一个package.json示例

```json
{
  "name": "add-article",
  "version": "1.0.0",
  "description": "新增文章",
  "main": "index.js",
  "dependencies": {
    
  },
  "cloudfunction-config": {
      "memorySize": 256,
      "timeout": 5,
      "triggers": [{
          "name": "myTrigger",
          "type": "timer",
          "config": "0 0 2 1 * * *"
      }],
      "path": ""
    }
}
```

cloudfunction-config说明如下

```js
{
  "memorySize": 256, // 函数的最大可用内存，单位MB，可选值： 128|256|512|1024|2048，默认值256
  "timeout": 5, // 函数的超时时间，单位秒，默认值5。最长为60秒，阿里云在定时触发时最长可以是600秒
  // triggers 字段是触发器数组，目前仅支持一个触发器，即数组只能填写一个，不可添加多个
  "triggers": [{
      // name: 触发器的名字，规则见https://uniapp.dcloud.net.cn/uniCloud/trigger，name不对阿里云生效
      "name": "myTrigger",
      // type: 触发器类型，目前仅支持 timer (即 定时触发器)，type不对阿里云生效
      "type": "timer",
      // config: 触发器配置，在定时触发器下，config 格式为 cron 表达式，规则见https://uniapp.dcloud.net.cn/uniCloud/trigger。使用阿里云时会自动忽略最后一位，即代表年份的一位在阿里云不生效
      "config": "0 0 2 1 * * *"
  }],
  // 云函数Url化path部分，阿里云需要以/http/开头
  "path": ""
}
```

**HBuilderX 3.0.0之前版本，请继续阅读下面文档**

**使用方式**
- 在`cloudfucntions`目录右键即可创建`cloudfunctions_init.json`，
- 编写好json内容，在`cloudfunctions_init.json`上右键初始化云函数配置。

**cloudfunctions_init.json形式如下**

```json
{
    "fun-name": { // 云函数名称
        "memorySize": 256, // 函数的最大可用内存，单位MB，可选值： 128|256|512|1024|2048，默认值256
        "timeout": 5, // 函数的超时时间，单位秒，默认值5。最长为60秒，阿里云在定时触发时最长可以是600秒
        // triggers 字段是触发器数组，目前仅支持一个触发器，即数组只能填写一个，不可添加多个
        "triggers": [{
            // name: 触发器的名字，规则见https://uniapp.dcloud.net.cn/uniCloud/trigger，name不对阿里云生效
            "name": "myTrigger",
            // type: 触发器类型，目前仅支持 timer (即 定时触发器)，type不对阿里云生效
            "type": "timer",
            // config: 触发器配置，在定时触发器下，config 格式为 cron 表达式，规则见https://uniapp.dcloud.net.cn/uniCloud/trigger。使用阿里云时会自动忽略最后一位，即代表年份的一位在阿里云不生效
            "config": "0 0 2 1 * * *"
        }],
        // 云函数Url化path部分，阿里云需要以/http/开头
        "path": ""
    }
}

```

## 注意事项

### 云函数的启动模式（冷启动、热启动）@launchtype

基于云函数按需执行的特点, 函数在不被触发的时候, 计算资源是不被激活的。

当一个云函数初次被触发时，其完整过程如下：

1. 实例化计算实例
2. 加载函数代码
3. 启动 node
4. 执行代码

函数被调用时，执行这些完整步骤的过程一般称作冷启动, 冷启动的耗时长于热启动，一般在一秒出头。 

而如果函数实例和执行进程都被复用的情况下一般被定义为热启动, 热启动没有性能问题。

如果一个云函数实例长时间没有被再次调用，则该计算实例会被回收；后续再次调用该云函数时，就会再次触发云函数的冷启动。

不同云厂商的函数实例回收时间，以及优化冷启动的建议，[参考](https://uniapp.dcloud.io/uniCloud/faq?id=%e4%ba%91%e5%87%bd%e6%95%b0%e8%ae%bf%e9%97%ae%e6%97%b6%e5%bf%ab%e6%97%b6%e6%85%a2%e6%80%8e%e4%b9%88%e5%9b%9e%e4%ba%8b%ef%bc%9f)

因为存在冷热启动的差异，云函数中的全局变量就可能出现每次不一样的情况。也就是云函数是无状态的。

以如下代码为例，`count`作为全局变量，当多次调用该云函数时，可能会出现变量累加的情况（实例未复用时，每次返回0，若实例被复用，则可能返回1、2、3等各种意外情况）。所以不要这么使用。


```javascript
let count = 0;
module.exports = async (event) => {
  return count++
  //此示例为错误示例
  //云函数实例未复用时，每次返回0
  //若实例被复用，则可能返回1、2、3等各种意外情况
}
```

**require由于存在缓存，也存在同样的问题。尽量不要直接修改require返回的内容**

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

- 云端的云函数中使用的时区是 `UTC+0`，而不是 `UTC+8`，在云函数中使用时间时需特别注意。云函数在HBuilderX本地运行时，时区则是电脑的时区，很可能是 `UTC+8`。建议使用时间戳，可以规避时区问题。
- 使用阿里云作为服务商时，暂时无法使用相对路径读取文件，如：`fs.readFileSync('./info')`，可以替换为`fs.readFileSync(path.resolve(__dirname,'./info'))`
- 阿里云目前能同步返回数据的最大超时时间为10秒，即云函数运行超过10秒时客户端会收到超时报错。如果你在uniCloud web控制台配置了10秒以上的超时时间，云函数是可以运行到10秒以上的，只是客户端无法接收到返回值，腾讯云没有此限制。

