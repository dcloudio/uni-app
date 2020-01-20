## 创建uniCloud项目
  
  - 在`HBuilderX`创建uni-app项目时勾选`启用uniCloud`
  - 在右侧选择服务供应商（目前仅支持阿里云，春节后会开放腾讯云）
  - **服务提供商为阿里云时，暂不支持发行到H5端**

![创建uniCloud项目](https://img.cdn.aliyun.dcloud.net.cn/uni-app/uniCloud/create-project.png)

  - 对于老的uni-app项目，也可以对项目点右键，菜单中选择“创建uniCloud云开发环境”
  - 新建uni-app项目的模板中，有一个`Hello uniCloud`项目模板，演示了各种云函数的使用。
  
  uniCloud云开发环境创建成功后，项目下会有一个带有云图标的特殊目录，名为“cloudfunctions”。

## 创建和绑定服务空间

项目环境建好后，需要为这个项目选择一个服务空间。如果开发者账户没有实名认证，首先需要实名认证。

一个开发者可以拥有多个服务空间，每个服务空间都是一个独立的serverLess云环境，不同服务空间之间的云函数、数据库、存储都是隔离的。

服务空间和手机端项目是多对多绑定关系。同账号下，一个项目可以关联到多个服务空间。一个服务空间也可以被多个项目访问。

  - 在云函数目录`cloudfunctions`右键菜单创建服务空间，会打开web控制台进行创建

![创建服务空间](https://img.cdn.aliyun.dcloud.net.cn/uni-app/uniCloud/create-space.png)

  - 创建好服务空间后，对目录`cloudfunctions`点右键，菜单中点击选择服务空间，完成绑定关系。
  
**说明**

- 如果未进行实名认证，这时会跳转至实名认证页面进行实名认证，等待实名认证审核之后可以开通服务空间
- 创建服务空间可能需要几分钟的时间，可以在控制台查看是否创建完成
- 目前只支持应用的所有者使用uniCloud，协作者无法使用

## 创建云函数

`uniCloud`项目创建完成之后，开发者可以在`cloudfunctions`目录右键创建云函数。

创建后会以云函数名称为名生成一个特殊目录，该目录下自动有一个index.js的入口文件，不可改名。如果需要引入其他js，可以在这个index.js的入口文件中引用。

**注意**

- 不同项目使用同一个服务空间时，不可使用同名云函数，可以在uniCloud的web控制台手动删除重名云函数释放函数名。
- 创建时目前版本不校验重名，如果新云函数与服务器上已存在同名云函数，会用新函数覆盖。请务必注意。后续会修复此问题。
- 单个云函数大小限制为10M（包含node_modules）

## 编写云函数
云函数是普通的Node.js补充了uniCloud的专用API，可参考开发文档编写，也可以直接新建项目时选择`hello uniCloud`模板体验。

HBuilderX为uniCloud开发提供了良好的语法提示和转到定义支持，对于代码中的API，选中并按下F1，也可以直接查看相应的文档。

## 运行和调试云函数
编写云函数后，在项目管理器里右键点击该云函数的目录，在弹出菜单中可选择“上传部署云函数”、“上传并运行测试云函数”。

前者仅完成部署，后者会在部署后同时运行，并打印日志出来。

在云函数文档里，按`ctrl+r`运行快捷键，或点工具栏的运行，还会直接看到上传并运行云函数的快捷指令。`ctrl+r`然后回车，即可在控制台看到运行结果和日志输出。

## 手机端调用云函数
在uni-app的前端代码中，通过uniCloud.callFunction方法调用云函数。详见[callFunction文档](https://uniapp.dcloud.io/uniCloud/functions?id=callfunction)

如下代码中，调用了名为`add`的云函数，并发送了`data`的json数据作为上行参数。
```javascript
uniCloud.callFunction({
  name: 'add',
  data: {
    name: 'DCloud',
    subType: 'uniCloud'
  }
})
```

- 在App真机运行模式下，在前端控制台也会打印云函数输出的`console.log`。

## FAQ

- Q:H5端出现跨域问题如何处理？ 
- A:HBuilderX自带的内置浏览器不会有跨域问题。外部浏览器可以参考 [Chrome 跨域插件免翻墙安装](https://ask.dcloud.net.cn/article/35267) 或 [firefox跨域插件](https://addons.mozilla.org/zh-CN/firefox/addon/access-control-allow-origin/)。**服务商为阿里云时暂不支持发行到H5端（近期会进行支持，敬请期待）**<!-- 发行到H5端时，可以在uniCloud控制台`用户管理 - 登录设置`里配置`WEB安全域名`。 -->


<!-- **注意**

- 服务提供商为腾讯云时，需要开发者手动去管理控制台开启匿名登录[详情](/uniCloud/authentication#匿名登录) -->

