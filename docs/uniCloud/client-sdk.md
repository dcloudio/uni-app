# uniCloud客户端sdk

uniCloud分为客户端和云端两部分，有些接口名称相同，参数也相近，在此列举客户端sdk内可以使用的接口/属性，避免混淆


## API

客户端API列表

|API														|描述																																																		|
|--															|--																																																			|
|uniCloud.callFunction()				|客户端调用云函数 [详情](https://uniapp.dcloud.net.cn/uniCloud/cf-functions?id=clientcallfunction)			|
|uniCloud.database()						|客户端访问云数据库，获取云数据库对象引用 [详情](https://uniapp.dcloud.net.cn/uniCloud/clientdb)				|
|uniCloud.uploadFile()					|客户端直接上传文件到云存储 [详情](https://uniapp.dcloud.net.cn/uniCloud/storage?id=uploadfile)					|
|uniCloud.getTempFileURL()			|客户端获取云存储文件的临时路径 [详情](https://uniapp.dcloud.net.cn/uniCloud/storage?id=gettempfileurl)	|
|uniCloud.chooseAndUploadFile()	|客户端选择文件并上传 [详情](https://uniapp.dcloud.net.cn/uniCloud/storage?id=chooseanduploadfile)			|
|uniCloud.getCurrentUserInfo()	|获取当前用户信息 [详情](https://uniapp.dcloud.io/uniCloud/client-sdk?id=client-getcurrentuserinfo)			|
|uniCloud.init()								|同时使用多个服务空间时初始化额外服务空间 [详情](https://uniapp.dcloud.net.cn/uniCloud/init)						|

### 获取当前用户信息getCurrentUserInfo@client-getcurrentuserinfo

> HBuilderX 3.1.0+

解析客户端token获取用户信息。常用于在前端判断当前登录的用户状态和用户权限，比如根据不同的权限显示隐藏某些按钮。

注意：不会发送网络请求，**注意这个仅仅是客户端接口，不校验token的合法性**

注意：需要搭配uni-id使用并要求客户端必须将token存储在storage内的`uni_id_token`内

用法：`uniCloud.getCurrentUserInfo()`

该方法为同步方法。

**响应参数**

| 字段			| 类型	| 说明							|
| ---			| ---	| ---							|
| uid			| Number|当前用户uid						|
| role			| Array	|用户角色列表。admin用户返回["admin"]			|
| permission	| Array	|用户权限列表。注意admin角色此数组为空|

未能获取用户信息时返回以下结果

```js
{
  uid: null,
  role: [],
  permission: []
}
```

**示例**
```js
console.log(uniCloud.getCurrentUserInfo().role.indexOf('admin')>-1); // 如果是admin用户的话，打印结果为true
```

### 新增拦截器@add-interceptor

> 新增于HBuilderX 3.1.20

接口形式：`uniCloud.addInterceptor(String apiName, Object interceptorMap)`

**平台兼容性**

|阿里云	|腾讯云	|
|----		|----		|
|√			|√			|


**入参说明**

| 字段					| 类型	| 必填| 说明																												|
| ---						| ---		| ---	| ---																													|
| apiName				| string| 是	| 要拦截的Api名称，可选值：callFunction、database、uploadFile	|
| interceptorMap| object| 是	| 要添加的拦截器																							|

**interceptorMap参数说明**

|参数名		|类型			|必填	|默认值	|说明					|平台差异说明	|
|---			|---			|---	|---		|---					|---					|
|invoke		|Function	|否		|				|拦截前触发		|							|
|success	|Function	|否		|				|成功回调拦截	|							|
|fail			|Function	|否		|				|失败回调拦截	|							|
|complete	|Function	|否		|				|完成回调拦截	|							|

示例

```js
uniCloud.addInterceptor('callFunction', {
  invoke(param) {
    // param为拦截Api的参数 例 {name: 'functionName', data: {'functionParam1': 1, 'functionParam2': 2}}
    // 此处返回错误可终止api执行
  },
  success(res) {
    // res为callFunction的返回值，此处可以对返回值进行修改
  },
  fail(err) {
    // err为callFunction抛出的错误
  },
  complete(res){
    // complete内res为上面的res或err
  }
})
```

### 移除拦截器@remove-interceptor

> 新增于HBuilderX 3.1.20

接口形式：`uniCloud.removeInterceptor(String apiName, Object interceptorMap)`

**入参说明**

| 字段					| 类型	| 必填| 说明																												|
| ---						| ---		| ---	| ---																													|
| apiName				| string| 是	| 要拦截的Api名称，可选值：callFunction、database、uploadFile	|
| interceptorMap| object| 是	| 要移除的拦截器，选填，不传递此参数时移除此Api所有拦截器			|

**interceptorMap参数说明**

|参数名		|类型			|必填	|默认值	|说明					|平台差异说明	|
|---			|---			|---	|---		|---					|---					|
|invoke		|Function	|否		|				|拦截前触发		|							|
|success	|Function	|否		|				|成功回调拦截	|							|
|fail			|Function	|否		|				|失败回调拦截	|							|
|complete	|Function	|否		|				|完成回调拦截	|							|

**注意：**

- 要移除的拦截器内方法需和添加的方法一致才可以移除，详情见下方示例

```js
// 错误用法，无法移除invoke拦截器
uniCloud.addInterceptor('callFunction', {
  invoke(param) {
    console.log('callFunction invoked, with param:',param)
  }
})
uniCloud.removeInterceptor('callFunction', {
  invoke(param) {
    console.log('callFunction invoked, with param:',param)
  }
})

// 正确用法
function invokeInterceptor(param) {
  console.log('callFunction invoked, with param:',param)
}
uniCloud.addInterceptor('callFunction', {
  invoke: invokeInterceptor
})
uniCloud.removeInterceptor('callFunction', {
  invoke: invokeInterceptor
})
```

## 属性

### 获取当前uniCloud实例的服务商

用法：`uniCloud.config.provider`

访问此属性会返回`tencent`、`aliyun`分别代表腾讯云和阿里云