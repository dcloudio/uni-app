#### uniCloud.init(Object initOptions)

服务空间初始化，返回uniCloud实例。调用云资源之前必须调用此方法。

**在一个项目只对应一个服务空间的情况下，会自动执行初始化操作用户无需再次执行。后续开发者可以直接使用uniCloud.callFunction等API**

**initOptions 参数说明**

|参数名				|类型		|必填				|默认值	|说明																								|平台差异说明		|
|:-:					|:-:		|:-:				|:-:		|:-:																								|:-:						|
|provider			|String	|是					|-			|选择服务供应商（可选值tencent，aliyun）						|								|
|spaceId			|String	|是					|-			|服务空间ID，**注意是服务空间ID，不是服务空间名称**	|								|
|clientSecret	|String	|阿里云必填	|-			|服务空间secret key，可以在uniCloud控制台查看				|仅阿里云侧支持	|
<!-- |endpoint			|String	|否					|https://api.bspapp.com	|服务空间地址																			|仅阿里云侧支持																																	| -->
<!-- |autoSignIn		|Boolean|否					|true										|是否自动匿名登录																	|仅腾讯云侧支持																																	|
|debugFunction|Boolean|否					|true										|是否启用云函数日志输出														|仅开发阶段生效，平台支持：APP、H5(使用`HBuilderX`内置浏览器获得更好的调试体验)	| -->

**示例**

```javascript
const uniClient = uniCloud.init({
  provider: 'aliyun',
  spaceId: 'xxxx-yyy',
  clientSecret: 'xxxx'
});
```

<!-- **注意**

- 服务提供商为腾讯云时，需要开发者手动去管理控制台开启匿名登录才可以操作云函数[详情](/uniCloud/authentication#匿名登录) -->