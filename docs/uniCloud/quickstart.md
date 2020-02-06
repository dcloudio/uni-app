## 创建uniCloud项目
  
  - 在`HBuilderX`创建uni-app项目时勾选`启用uniCloud`
  - 在右侧选择服务供应商（目前仅支持阿里云，春节后会开放腾讯云）

![创建uniCloud项目](https://img.cdn.aliyun.dcloud.net.cn/uni-app/uniCloud/create-project.png)

  - 对于老的uni-app项目，也可以对项目点右键，菜单中选择“创建uniCloud云开发环境”
  - 新建uni-app项目的模板中，有一个`Hello uniCloud`项目模板，演示了各种云函数的使用。
  
  uniCloud云开发环境创建成功后，项目下会有一个带有云图标的特殊目录，名为“cloudfunctions”。

## 创建和绑定服务空间

项目环境建好后，需要为这个项目选择一个服务空间。如果开发者账户没有实名认证，首先需要实名认证。

一个开发者可以拥有多个服务空间，每个服务空间都是一个独立的serverless云环境，不同服务空间之间的云函数、数据库、存储都是隔离的。

服务空间和手机端项目是多对多绑定关系。同账号下，一个项目可以关联到多个服务空间。一个服务空间也可以被多个项目访问。

  - 在云函数目录`cloudfunctions`右键菜单创建服务空间，会打开web控制台进行创建

![创建服务空间](https://img.cdn.aliyun.dcloud.net.cn/uni-app/uniCloud/create-space.png)

  - 创建好服务空间后，对目录`cloudfunctions`点右键，菜单中点击`选择云服务空间`，绑定你之前创建的服务空间。
  
**说明**

- 如果未进行实名认证，会跳转至实名认证页面进行实名认证，等待实名认证审核之后可以开通服务空间
- 创建服务空间可能需要几分钟的时间，可以在控制台查看是否创建完成
- 目前只支持应用的所有者使用uniCloud，协作者无法使用
- 如果一个项目只对应一个服务空间，此时前端可直接使用这个服务空间。如果一个项目绑定了多个服务空间，则需要先做初始化，具体参考：[https://uniapp.dcloud.io/uniCloud/init](https://uniapp.dcloud.io/uniCloud/init)

## 创建云函数

`uniCloud`项目创建并绑定服务空间后，开发者可以在`cloudfunctions`目录右键创建云函数。
![新建云函数](http://img.cdn.aliyun.dcloud.net.cn/uni-app/uniCloud/unicloud-02.png)

创建后会以云函数名称为名生成一个特殊目录，该目录下自动生成index.js，是该云函数的入口文件，不可改名。如果该云函数还需要引入其他js，可在index.js入口文件中引用。

**注意**

- 不同项目使用同一个服务空间时，不可使用同名云函数，可以在uniCloud的web控制台手动删除重名云函数释放函数名。
- 创建时目前版本不校验重名，如果新云函数与服务器上已存在同名云函数，会用新函数覆盖。请务必注意。后续会修复此问题。
- 单个云函数大小限制为10M（包含node_modules）

## 编写云函数
云函数的语法，是在普通的Node.js基础上补充了uniCloud的专用API。可参考API开发文档编写，也可以直接新建项目时选择`hello uniCloud`模板体验。

HBuilderX为uniCloud开发提供了良好的语法提示和转到定义支持，对于代码中的API，选中并按下F1，也可以直接查看相应的文档。

如下为一个云函数示例
```javascript
'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const collection = db.collection('unicloud-test') // 获取表'unicloud-test'的集合对象
	const res = await collection.limit(10).get() // 获取表中的10条数据，结果为json格式
	return res // 返回json给客户端
};

```

## 运行和调试云函数
编写云函数后，在项目管理器里右键点击该云函数的目录，在弹出菜单中可选择“上传部署云函数”、“上传并运行测试云函数”。

前者仅完成部署，后者会在部署后同时运行，并打印日志出来。

在云函数编辑器里，按`Ctrl+r`运行快捷键，或点工具栏的运行，还会直接看到上传并运行云函数的快捷指令。`Ctrl+r`然后回车，即可高效的在控制台看到运行结果和日志输出。

云函数目前无法断点debug，只能打印`console.log`看日志。

## 手机端调用云函数
在uni-app的前端代码中，通过`uniCloud.callFunction`方法调用云函数。详见[callFunction文档](https://uniapp.dcloud.io/uniCloud/functions?id=callfunction)

如下代码中，调用了名为`test`的云函数，并发送了`data`的json数据作为上行参数。
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

- 在App真机运行模式下，在前端控制台也会打印云函数输出的`console.log`。

## 小程序中使用uniCloud

小程序中使用uniCloud需要在相应的小程序管理后台设置request合法域名、uploadFile合法域名。这些域名均为阿里云或腾讯云自有域名，并非DCloud所属域名。

|服务提供商	|request合法域名|uploadFile合法域名									|
|:-:				|:-:						|:-:																|
|阿里云			|api.bspapp.com	|bsppub.oss-cn-shanghai.aliyuncs.com|

## H5中使用unicloud

运行到H5端时，可以使用HBuilderX内置浏览器以解决跨域问题。如使用外部浏览器需安装跨域插件，详见：[https://ask.dcloud.net.cn/article/35267](https://ask.dcloud.net.cn/article/35267)。

发行到H5端时，需要在uniCloud后台操作，绑定安全域名，否则会因为跨域问题而无法访问。在`cloudfunctions`目录右键打开uniCloud后台。

**uniCloud后台配置安全域名：**

![](https://img.cdn.aliyun.dcloud.net.cn/uni-app/uniCloud/uniCloud-add-domain.png)


**Bug&Tips**
- 微信小程序开发工具的真机预览功能，必须添加上述域名白名单，否则无法调用云函数。模拟器的PC端预览、真机调试不受此影响。
- 云函数的初次冷启动较慢，表现为某个云函数第一次被调用时联网时间较长。第二次即可正常。并非每个手机用户都要经历一次冷启动，开发者运行过一次云函数，用户再连接时就不会经历冷启动。但长期不使用的云函数，会被回收资源。回收后再调用云函数，仍然会经历一次冷启动。
- web控制台网址：[http://unicloud.dcloud.net.cn](http://unicloud.dcloud.net.cn)，在HX中对云函数目录点右键，或者在帮助菜单中，均有入口链接。
- Q: H5端出现跨域问题如何处理？ 

  A: HBuilderX的内置浏览器不会有跨域问题（mac版需要HBuilderX 2.5.10+才解决了跨域）。外部浏览器需要安装跨域插件，可以参考 [Chrome 跨域插件免翻墙安装](https://ask.dcloud.net.cn/article/35267) 或 [firefox跨域插件](https://addons.mozilla.org/zh-CN/firefox/addon/access-control-allow-origin/)。
- 发布H5时，为解决域名跨域问题，需配置发布域名。如serverless服务商为阿里云，请向service@dcloud.io申请，提供你的appid和域名。目前DCloud还提供了m3w.cn的二级域名供开发者快速上线使用，可以免去购买域名的流程和费用，直接开通xxx.m3w.cn的二级域名。示例：[hellounicloud.m3w.cn](https://hellounicloud.m3w.cn) （暂时m3w.cn的二级域名仅为新型冠状病毒抗疫项目使用，申请时需要额外提供项目说明和域名解析IP地址）

<!-- 发行到H5端时，可以在uniCloud控制台`用户管理 - 登录设置`里配置`WEB安全域名`。 -->

<!-- **注意**
- 服务提供商为腾讯云时，需要开发者手动去管理控制台开启匿名登录[详情](/uniCloud/authentication#匿名登录) -->

