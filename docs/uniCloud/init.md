**若开发者仅有一个服务空间，`uniCloud`框架会自动绑定服务空间，开发者无需手动做初始化工作（可理解为类调用）。只有存在多服务空间时，才需要根据本文进行初始化**
```
//开发者仅创建了一个服务空间，则无需初始化
//可通过uniCloud直接调用云开发的API
uniCloud.callFunction()
uniCloud.uploadFile()
```

若开发者创建了多个服务空间，`uniCloud`无法自动绑定；需开发者在客户端代码中，手动调用初始化方法`uniCloud.init`，绑定服务空间。

`uniCloud.init`方法会返回一个`uniCloud`实例，之后云开发API的调用都需要通过该`uniCloud`实例发起（类似实例调用）。

`uniCloud.init`方法定义如下：

```
function init(options):uniCloud
```

`uniCloud.init`方法接受一个`options`参数，返回`uniCloud`实例，`uniCloud`实例可调用云函数、云存储相关API。

**options 参数说明**

|参数名				|类型		|必填				|默认值	|说明																								|
|:-:					|:-:		|:-:				|:-:		|:-:																								|
|provider			|String	|是					|-			|目前仅支持aliyun					|
|spaceId			|String	|是					|-			|服务空间ID，**注意是服务空间ID，不是服务空间名称**	|
|clientSecret	|String	|是	|-			|可以在[uniCloud控制台](https://unicloud.dcloud.net.cn)服务空间列表中查看				|
<!-- |endpoint			|String	|否					|https://api.bspapp.com	|服务空间地址																			|仅阿里云侧支持																																	| -->
<!-- |autoSignIn		|Boolean|否					|true										|是否自动匿名登录																	|仅腾讯云侧支持																																	|
|debugFunction|Boolean|否					|true										|是否启用云函数日志输出														|仅开发阶段生效，平台支持：APP、H5(使用`HBuilderX`内置浏览器获得更好的调试体验)	| -->

**示例代码**

```javascript
//开发者创建了多个服务空间，则需手动初始化
const myCloud = uniCloud.init({
  provider: 'aliyun',
  spaceId: 'xxxx-yyy',
  clientSecret: 'xxxx'
});
//通过uniCloud实例调用云开发的API
myCloud.callFunction()
myCloud.uploadFile()

```

**Tips：**
- 云函数会自动识别自己所属的服务空间，无需初始化。

<!-- **注意**

- 服务提供商为腾讯云时，需要开发者手动去管理控制台开启匿名登录才可以操作云函数[详情](/uniCloud/authentication#匿名登录) -->
