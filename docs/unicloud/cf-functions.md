
云函数是运行在云端的 `JavaScript` 代码，

**示例代码**

```
'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('Hello World')
	//返回数据给客户端
	return event
}
```

**event参数说明**

|字段				|类型			|必备	|说明						|
|---				|---			|---	|---						|
|clientInfo	|object		|是		|客户端设备信息	|

`event`其余参数为客户端上传的参数

**clientInfo参数说明**

|字段			|类型		|必备	|说明																|
|---			|---		|---	|---																|
|platform	|String	|是		|客户端平台，如：h5、app、mp-weixin	|
|platform	|String	|是		|客户端系统，如：android、ios				|

**context参数说明**

`context`为云函数所在环境原始的`context`

## 云函数特别注意

  - 以无状态的风格编写函数代码，确保您的代码不会进行任何状态维护。（见以下示例）
  - 本地存储和内存结果都是可能丢失的，如需存储文件应使用云存储。
  - 在执行方法外实例化任何可能复用的对象，例如数据库连接等。

**错误示例**

使用下面的写法可能会导致多次访问`count`值递增，而不是如预期的返回0。

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