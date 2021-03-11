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
|uniCloud.getCurrentUserInfo()	|获取当前用户信息 [详情](https://uniapp.dcloud.net.cn/uniCloud/storage?id=client-getcurrentuserinfo)			|
|uniCloud.init()								|同时使用多个服务空间时初始化额外服务空间 [详情](https://uniapp.dcloud.net.cn/uniCloud/init)						|

### 获取当前用户信息@client-getcurrentuserinfo

新增于HBuilderX 3.1.0版本，通过解析客户端token获取用户信息，不会发送网络请求，**注意这个仅仅是客户端接口，不校验token的合法性**

> 需要搭配uni-id使用并要求客户端必须将token存储在storage内的`uni_id_token`内

用法：`uniCloud.getCurrentUserInfo()`

**响应参数**

| 字段			| 类型	| 必填| 说明														|
| ---				| ---		| ---	| ---															|
| uid				| Number| 是	|当前用户uid											|
| role			| Array	| 是	|用户角色列表											|
| permission| Array	| 是	|用户权限列表，admin角色此数组为空|

未能获取用户信息时返回以下结果

```js
{
  uid: null,
  role: [],
  permission: []
}
```

## 属性

### 获取当前uniCloud实例的服务商

用法：`uniCloud.config.provider`

访问此属性会返回`tencent`、`aliyun`分别代表腾讯云和阿里云