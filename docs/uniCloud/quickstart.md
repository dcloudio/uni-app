## 创建uniCloud项目
  
  - 在 [HBuilderX 2.5.8+](https://www.dcloud.io/hbuilderx.html) 新建项目，选择uni-app项目，并勾选`启用uniCloud`
  - 在右侧选择服务供应商



<img max-width="500px" src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/d24d7f30-4b16-11eb-bdc1-8bd33eb6adaa.jpg" />


  - 对于老的uni-app项目，也可以对项目点右键，菜单中选择“创建uniCloud云开发环境”
  - 新建uni-app项目的模板中，有一个`Hello uniCloud`项目模板，演示了各种云函数的使用。

  uniCloud云开发环境创建成功后，项目根目录下会有一个带有云图标的特殊目录，名为“uniCloud”。（即便是cli创建的项目，云函数目录也在项目的根目录下，而不是src下）
  
  非uni-app项目也可以通过使用[云函数Url化](uniCloud/http.md)来享受云函数的带来的便利。
  
## 目录结构@structure

HBuilderX 3.0起目录结构做了调整如下：


<pre v-pre="" data-lang="">
	<code class="lang-" style="padding:0">
┌──uniCloud-aliyun                    云空间目录，阿里云为uniCloud-aliyun,腾讯云为uniCloud-tcb
|   |——— cloudfunctions               云函数目录
|   |   │───common                    云函数公用模块目录 <a target="_blank" href="https://uniapp.dcloud.io/uniCloud/cf-common">详情</a>
|   |   |   └──hello-common           云函数公用模块
|   |   |      │──index.js            公用模块代码
|   |   |      └──package.json        公用模块package.json
|   |   │───uni-clientDB-actions
|   |   │      └──new_action.js       clientDB action代码 <a target="_blank" href="https://uniapp.dcloud.net.cn/uniCloud/clientdb?id=action">详情</a>
|   |   └───function-name             云函数目录
|   |         │──index.js             云函数代码
|   |         └──package.json         包含云函数的配置信息，如url化、定时设置、内存等内容 <a target="_blank" href="https://uniapp.dcloud.io/uniCloud/cf-functions?id=packagejson">详情</a>
│   └──database                       云数据目录
│         │──validateFunction         数据库扩展校验函数目录
│         │   └──new_validation.js    扩展校验函数代码 <a target="_blank" href="https://uniapp.dcloud.net.cn/uniCloud/schema?id=validatefunction">详情</a>
│         │──db_init.json             db_init.json初始化数据库文件，其中不再包含schema <a target="_blank" href="https://uniapp.dcloud.net.cn/uniCloud/hellodb?id=db-init">详情</a>
│         └──xxx.schema.json          数据表xxx的DB Schema <a target="_blank" href="https://uniapp.dcloud.net.cn/uniCloud/schema">详情</a>
根目录
	</code>
</pre>

#### 注意：uniCloud目录是存放服务端文件的目录，他和前端代码在同一个项目下这里只是方便管理。在发行前端部分，比如打包app、小程序、h5的代码包里并不会包含uniCloud目录。

HBuilderX 3.0之前版本目录结构如下：

<pre v-pre="" data-lang="">
	<code class="lang-" style="padding:0">
┌──cloudfunctions-aliyun            云空间目录，阿里云为cloudfunctions-aliyun,腾讯云为cloudfunctions-tcb
|   │───function-name               云函数目录
|   |      │──index.js              云函数代码
|   |      └──package.json          标准package.json
|   │───common                      云函数公用模块目录 <a target="_blank" href="https://uniapp.dcloud.io/uniCloud/cf-common">详情</a>
|   |   └──hello-common             云函数公用模块
|   |      │──index.js              公用模块代码
|   |      └──package.json          公用模块package.json
|   │───uni-clientDB-actions
|   │      └──new_action.js         clientDB action代码 <a target="_blank" href="https://uniapp.dcloud.net.cn/uniCloud/clientdb?id=action">详情</a>
│   │───db_init.json                初始化数据库文件 <a target="_blank" href="https://uniapp.dcloud.net.cn/uniCloud/hellodb?id=db-init">详情</a>
│   └───cloudfunctions_init.json    云函数初始化文件 <a target="_blank" href="https://uniapp.dcloud.net.cn/uniCloud/cf-functions?id=init">详情</a>
│
根目录
	</code>
</pre>


## 创建和绑定服务空间

项目环境建好后，需要为这个项目选择一个服务空间。如果开发者账户没有实名认证，首先需要实名认证（这是法定要求，也是阿里云、腾讯云等云服务商的要求）。

一个开发者可以拥有多个服务空间，每个服务空间都是一个独立的serverless云环境，不同服务空间之间的云函数、数据库、存储都是隔离的。

注：目前腾讯云仅提供1个免费服务空间，最多可创建49个收费服务空间。阿里云最多可创建50个免费服务空间。

服务空间和手机端项目是多对多绑定关系。同账号下，一个项目可以关联到多个服务空间。一个服务空间也可以被多个项目访问。


  - HBuilderX 3.0起版本，在云函数目录`uniCloud`右键菜单创建服务空间，会打开web控制台[https://unicloud.dcloud.net.cn](https://unicloud.dcloud.net.cn) 进行创建

![创建服务空间1](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/b16f9740-4c05-11eb-8a36-ebb87efcf8c0.jpg)


  - HBuilderX 3.0之前版本，在云函数目录`cloudfunctions`右键菜单创建服务空间，会打开web控制台[https://unicloud.dcloud.net.cn](https://unicloud.dcloud.net.cn) 进行创建

![创建服务空间2](https://img.cdn.aliyun.dcloud.net.cn/uni-app/uniCloud/create-space.png)


  - 创建好服务空间后，HBuilderX 3.0起版本对目录`uniCloud`点右键（HBuilderX 3.0之前版本对目录`cloudfunctions`点右键），菜单中点击`选择云服务空间`，绑定你之前创建的服务空间。

  
**说明**

- 如果未进行实名认证，会跳转至实名认证页面进行实名认证，等待实名认证审核之后可以开通服务空间。若腾讯云实名认证提示身份证下已创建过多账户，则需要在腾讯云官网注销不用的账户。
- 创建服务空间可能需要几十秒的时间，可以在web控制台查看是否创建完成。
- 一个应用，可以在[dev.dcloud.net.cn](https://dev.dcloud.net.cn)设置协作者（选择应用->设置项目成员），实现多人共同使用一个云服务空间。（需 HBuilderX 2.5.9+）。协作者可以在HBuilderX和web控制台中操作被授权的服务空间，除了删除服务空间，其他功能均可正常操作。授权其他用户访问的详细步骤请参考：[授权其他用户访问服务空间](https://uniapp.dcloud.net.cn/uniCloud/faq?id=collaborator)
- 多个项目可以复用一个服务空间，比如一个应用的用户端和管理端，在HBuilderX里可以创建成2个项目，但2个项目的服务空间可以指向一个，或者干脆把其中一个项目的服务空间绑定到另一个项目上，[详见](https://ask.dcloud.net.cn/article/37949)

## 创建云函数

`uniCloud`项目创建并绑定服务空间后，开发者可以创建云函数。

HBuilderX 3.0起版本请在`uniCloud/cloudfunctions`目录右键创建云函数

![新建云函数1](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/a18b3bb0-53d8-11eb-8ff1-d5dcf8779628.jpg)


HBuilderX 3.0之前版本在 `cloudfunctions` 目录右键创建云函数

![新建云函数2](https://img.cdn.aliyun.dcloud.net.cn/uni-app/uniCloud/unicloud-02.png)



创建后会以云函数名称为名生成一个特殊目录，该目录下自动生成index.js，是该云函数的入口文件，不可改名。如果该云函数还需要引入其他js，可在index.js入口文件中引用。

**注意**

- 不同项目使用同一个服务空间时，不可使用同名云函数，可以在uniCloud的web控制台手动删除重名云函数释放函数名。
- 在HBuilderX创建云函数时，如果新云函数与服务器上已存在同名云函数，会用新函数覆盖。
- 单个云函数大小限制为10M（包含node_modules）
- 云函数内使用commonjs规范，不可使用import、export，参考：[commonjs模块](http://nodejs.cn/api/modules.html#modules_modules_commonjs_modules)

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

## 运行和调试云函数@rundebug

编写云函数后，在项目管理器里右键点击该云函数的目录，在弹出菜单中可选择“本地运行云函数”、“上传部署云函数”、“上传并运行云函数”。

如果使用`HBuilderX 3.0.0`及以上版本还可以使用客户端连接本地云函数的方式，不同于上面三种，客户端连接本地云函数需要在运行起来的客户端对应的HBuilderX控制台上切换连接云端还是本地云函数，如下图

![](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/28f84f90-3f69-11eb-8ff1-d5dcf8779628.jpg)

- 上传部署云函数：将云函数部署到uniCloud服务空间，不会运行。（快捷键Ctrl+u）
- 上传并运行云函数：先上传云函数，并在云端立即执行该云函数。在部署后同时运行，并打印日志出来。有延时，调试时不如本地运行云函数快捷。
- 本地运行云函数：在HBuilderX自带的node环境中运行选中的云函数。云函数连接的数据库和云存储，仍然在云端。（快捷键Ctrl+u）（从HBuilderX 2.8.1起支持）
- 客户端连接本地云函数：开启一个uniCloud本地服务，运行前端项目时在HBuilderX控制台可切换访问云端云函数还是本地云函数。（从HBuilderX 3.0.0起支持）

**模式差异**

**上传部署云函数**

云函数会被上传到服务空间，不会执行。如果要测试需使用客户端调用此云函数。

**上传并运行云函数**

云函数会被上传到服务空间，然后执行一次，可以在HBuilderX内uniCloud控制台看到结果及日志。如果有配置运行测试参数，会使用配置的参数调用云函数。

上传并运行使用的资源全部都是云端资源。包括云函数、数据库、云存储。

**本地运行云函数**

云函数不会被上传到服务空间，只在本地运行，可以在HBuilderX内uniCloud控制台看到结果及日志。

这是一种独立测试云函数的方法，如需要配置前端参数，则需配置json文件，[详见](/uniCloud/quickstart?id=runparam)

本地运行时只有当前云函数会使用本地的。如果在当前云函数内使用callFunction调用其他云函数会调用云端已部署的云函数，云存储、数据库均会使用云端数据。

**客户端连接本地云函数**

云函数不会被上传到服务空间，由本地调试服务调用云函数，可以在HBuilderX内uniCloud控制台看到结果及日志。

这是一种前后端联调的方法，可较大提升联调效率。

使用clientDB操作数据库时，表结构（schema.json文件）、扩展校验函数、clientDB-actions均使用本地项目下的代码，但所操作的数据依然是云端数据，索引也是以云端为准。

客户端连接本地云函数时云函数内的callFunction也会调用本地云函数，除非目标云函数是插件市场售卖的加密云函数，此时仍会调用云端。

虽然云函数、数据库schema、validatefunction在本地了，但云存储、数据库的数据和索引，仍然在云端。也就是开发机不能纯脱线开发。

**注意**

- HBuilderX 3.0.0版本云函数目录有调整，请参考：[目录结构说明](uniCloud/quickstart.md?id=structure)

### 上传并运行云函数@uploadandrun

在项目管理器里右键点击云函数的目录，在弹出菜单中可选择“上传并运行云函数”。此外也可以打开此目录下的文件然后使用快捷键`Ctrl+r`，在弹出菜单中选择“上传并运行云函数”。上传并运行时会自动带上配置的运行测试参数。

如需配置运行测试参数请参考：[配置运行测试参数](https://uniapp.dcloud.net.cn/uniCloud/quickstart?id=runparam)

### 客户端连接本地云函数@calllocalfunction

自`HBuilderX 3.0.0`起支持客户端连接本地云函数，由客户端访问本地调试服务调用云函数。方便前后端联调、方便schema联调。

**只支持本地运行打日志。暂不支持断点debug**

**虽然云函数、数据库schema、validatefunction在本地，但云存储、数据库的数据和索引，仍然在云端。也就是开发机不能完全脱线开发。只是代码可以在本地写，免上传就能联调。**

**使用方式**

运行客户端后可以在HBuilderX控制台切换是连接本地云函数还是云端云函数，如下图所示

![](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/28f84f90-3f69-11eb-8ff1-d5dcf8779628.jpg)

**日志查看**

切换为本地云函数之后客户端的callFunction会直接调用cloudfunctions目录下的云函数。此时云函数的日志会在HBuilderX uniCloud控制台打印。如下图

![](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/b6f52050-3f7a-11eb-8a36-ebb87efcf8c0.jpg)

切换连接云端云函数还是本地云函数之后会在项目下的`.hbuilderx`目录创建一个`launch.json`文件。关于此文件的说明请参考：【链接待补充】

一个典型的`launch.json`是如下形式的（无需手动创建此文件）

```js
{
    "version": "0.0.1",
    "configurations": [
      {
        "app-plus": {
          "launchtype" : "local" // app平台连接本地云函数
        },
        "default": {
          "launchtype" : "remote" // 未配置的平台连接云端云函数
        },
        "h5": {
          "launchtype" : "remote" // h5平台连接云端云函数
        },
        "provider" : "aliyun", // 如果项目仅关联一个服务空间无需此参数
        "type" : "uniCloud" // 标识此项配置为uniCloud配置，必填
     }
    ]
}

```

**注意事项**

- 虽然云函数、数据库schema、validatefunction在本地，但云存储、数据库的数据和索引，仍然在云端。也就是开发机不能完全脱线开发。只是代码可以在本地写，免上传就能联调。
- 连接线上环境时请记得上传本地的schema、validatefunction、action
- 切换云端、本地，无需重新运行客户端
- 不同平台可以有不同的配置。但同一平台，如安卓和iOS都是app-plus，则对应着同一个配置，或者两台安卓手机也只能有一个配置
- 客户端在每次发送云函数请求之前，会发送一条请求到本地调试服务，本地服务会根据当前用户选择来通知客户端该访问本地云函数还是云端云函数
- 客户端连接本地云函数时，云函数内的callFunction也会调用本地云函数。除非目标云函数是插件市场售卖的加密云函数，此时不会调用本地，仍会调用云端
- 如果云函数或云函数依赖的公共模块有加密（在插件市场销售），则会忽略本地配置，请求云端已部署的云函数。请留意控制台输出
- 发送clientDB请求时，如果使用了加密的action（在插件市场销售），当前请求会使用云端已部署资源而不是本地资源（包括schema、validateFunction、action），请留意控制台输出
- 如果项目内关联了两个服务空间，需要在`.hbuilderx/launch.json`内配置provider参数指定哪个服务空间使用本地调试
- 当前项目运行的所有客户端都停止运行时，对本项目的调试服务会关闭，已经运行到手机的客户端将无法连接本地云函数
- 在h5端network面板的会看到一些`Request Method: OPTION`的请求，这些是跨域预检请求，忽略即可。请参考：[HTTP 的 OPTIONS 方法](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/OPTIONS)
- 云函数超时时间、运行内存配置，在本地调试时不会生效
- 目前不支持使用了腾讯云自定义登录的场景
- 开发小程序时如果想使用本地云函数进行调试，请开启小程序的忽略安全域名校验
- 如果在使用HBuilderX过程中切换了电脑网络后本地调试服务无法访问，则需要重启一次HBuilderX
- 小程序体验版无法连接本地服务，如果发布成小程序体验版请务必使用发行模式

### 本地运行云函数@runlocal

自2.8.1版本起HBuilderX支持云函数本地运行，调试云函数更加方便快捷。此外还可以方便批量导入数据及文件，不再受云函数超时限制。

**目前只支持本地运行打日志。暂不支持断点debug**

**使用方式**

在项目管理器选择要本地运行的云函数，右键选择本地运行。或者打开这个云函数内的文件，按`ctrl+r`回车。

- 如果没有安装本地运行插件，按照提示安装即可
- 如需配置运行参数请参考：[配置运行测试参数](https://uniapp.dcloud.net.cn/uniCloud/quickstart?id=runparam)

![本地运行](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/cb5457a0-4b19-11eb-8ff1-d5dcf8779628.jpg)

在云函数编辑器里，按`Ctrl+r`运行快捷键（或点工具栏的运行），可看到运行云函数的若干菜单。`Ctrl+r`然后回车或选`0`，即可高效的在控制台看到运行结果和日志输出。如下图所示：

![运行快捷键](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/723ec000-4b1a-11eb-b680-7980c8a877b8.jpg)

云函数目前无法断点debug，只能打印`console.log`看日志。

![日志](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/caddd2a0-4b1a-11eb-b680-7980c8a877b8.jpg)

运行云函数时，如需要给云函数传参，除了在前端传参外，在调试阶段，可以通过配置json文件来传测试参数。

在云函数对应的目录右键可以配置运行测试参数，如下图，选择之后会生成一个形如`${函数名}.param.json`的文件，此文件内容会在云函数`上传并运行`以及`本地运行云函数`时作为参数传入云函数内。详细用法可参考：[配置运行测试参数](https://uniapp.dcloud.net.cn/uniCloud/quickstart?id=runparam)

## 调用本地云函数注意事项

**本章节注意事项包括本地运行云函数、客户端连接本地云函数**

**使用公用模块**

本地运行的云函数使用公用模块时需注意：

- 需要在云函数内执行`npm install ../common/xxx`安装公共模块，详细请参考[云函数公用模块](uniCloud/cf-common.md)
- 如果使用`HBuilderX 3.0.0`及以上版本，可以直接在云函数目录右键选择“管理公共模块依赖”进行公共模块的引入
- 如果使用到加密的公共模块则此云函数不可本地运行
- `HBuilderX 3.0.0`版本运行uniCloud项目时，uniCloud本地调试插件会自动进行云函数依赖安装（包括公共模块和package.json里面的其他依赖）

**时区问题**

uniCloud云端的云函数使用的时区是utc+0，本地运行时使用的是本机时间，中国一般是+8。在使用“时间戳”时两者没有差异，但如果要获取年、月、日、小时要注意时区的差异。

以下方式可以获取指定时区的年、月、日、小时，可以参考一下

```js
// 获取偏移后的Date对象，例如utc+x时offset就传x
function getOffsetDate (offset) {
  return new Date(
    Date.now() + (new Date().getTimezoneOffset() + (offset || 0) * 60) * 60000
  )
}

// 获取utc+8的小时数
const hour = getOffsetDate(8).getHours()

// 获取时间戳无需使用此方式utc+0时间戳是与utc+8时间戳一致的
```

推荐使用`<uni-dateformat>`组件格式化显示日期，[详情](https://ext.dcloud.net.cn/plugin?id=3279)

**调用其他云函数**

“本地运行云函数”时云函数内callFunction会调用云端已部署的云函数

“客户端连接本地云函数时”云函数内callFunction会调用本地云函数

**数据与存储**

请务必注意云函数在本地运行时依然是连接的云端数据库与存储

云函数上传文件到云存储只有腾讯云支持。当然也可以在前端直接上传文件，此时阿里云腾讯云均支持。

**Nodejs版本**

服务空间所使用的nodejs版本为8.9，本地运行时使用的本地nodejs可能与服务空间的nodejs版本并不一致，在本地测试之后部署到云端也务必测试一下兼容性。

## 运行云函数时配置运行测试参数@runparam

在云函数的上传运行菜单或右键菜单中，有`配置运行测试参数`的功能。

可以打开一个json，配置运行参数。配置该json后，运行云函数时会将该json作为云函数调用的上行参数处理，可以在云函数中接收到参数。

![配置运行参数](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/37245420-4b1b-11eb-b997-9918a5dda011.jpg)

在云函数目录右键运行云函数，也可以在云函数编辑器里，按`Ctrl+r`运行快捷键，或点工具栏的运行

![](https://img.cdn.aliyun.dcloud.net.cn/uni-app/uniCloud/run-function-with-param-1.jpg)

此时云函数运行会携带所配置的运行参数

![运行参数](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/84352e10-4b1b-11eb-8ff1-d5dcf8779628.jpg)

**模拟客户端类型**

如果需要模拟客户端类型可以在运行参数内添加clientInfo字段

```
{
  "otherParam": "***",
  "clientInfo":{
    OS: "ios" // 系统类型 ios、android
    PLATFORM: "h5" // 客户端类型 app-plus、h5、mp-weixin、mp-alipay等
  }
}
```

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

## 手机端看日志

uni-app运行在HBuilderX内置浏览器和App环境时，在HBuilderX的控制台中，除了可以看普通手机端日志外，还可以直接看到云端的云函数里打印的console.log日志。

**示例**

所执行云函数代码

```javascript
'use strict';
exports.main = async (event, context) => {
	console.log('------------');
	console.log('云函数日志输出');
	console.log('------------');
	return {
		action: 'log demo'
	}
};
```

H5端HBuilderX内置浏览器输出云函数日志，如下图所示（注意：日志在HBuilderX控制台输出）：

![](https://img.cdn.aliyun.dcloud.net.cn/uni-app/uniCloud/uniCloud-function-log-h5.jpg)

App端真机调试输出云函数日志，如下图所示：

![](https://img.cdn.aliyun.dcloud.net.cn/uni-app/uniCloud/uniCloud-function-log.png)


- 如运行到小程序开发工具或外部浏览器，仅能在这些软件的调试控制台查看本地日志，不包含云函数里的console.log。

uniCloud的[web控制台](https://unicloud.dcloud.net.cn/)可以查看线上云函数的所有运行日志，而不仅仅是开发时的运行日志。

## clientDB - 前端直接操作数据库

uniCloud支持云函数，但其实大多数场景下并不需要写云函数，可以通过clientDB直接操作云数据库。

1. 在HBuilderX中，uniCloud\database目录下编写数据表的schema文件。上传到uniCloud。
2. 在前端通过clientDB组件或api，直接读写数据表。

详细文档另见：[clientDB](https://uniapp.dcloud.io/uniCloud/database)

## 小程序中使用uniCloud的白名单配置

各家小程序平台，均要求在小程序管理后台配置小程序应用的联网服务器域名，否则无法联网。

使用uniCloud后，开发者将不再需要自己购买、备案域名，直接将uniCloud的域名填写在小程序管理后台即可。

根据下表，在小程序管理后台设置request合法域名、uploadFile合法域名（如没有上传文件业务，可不设置）。下表的域名均为阿里云或腾讯云自有域名，并非DCloud所属域名。

|服务提供商	|request合法域名			|uploadFile合法域名					|download合法域名｜
|:-:		|:-:						|:-:								|:-:|
|阿里云		|api.bspapp.com				|bsppub.oss-cn-shanghai.aliyuncs.com|需要从云存储下载文件的时候才需要配置，不同服务空间域名不同，可以在web控制台查看文件详情里面看到|
|腾讯云		|tcb-api.tencentcloudapi.com|cos.ap-shanghai.myqcloud.com		|需要从云存储下载文件的时候才需要配置，不同服务空间域名不同，可以在web控制台查看文件详情里面看到|

**如果需要用uni.request请求云存储内的文件，需要将云存储域名（即上表中的download合法域名）配置到request合法域名内**

小程序开发工具的真机预览功能，必须添加上述域名白名单，否则无法调用云函数。模拟器的PC端预览、真机调试不受此影响。

如果遇到正确配置了合法域名但是依然报`url not in domain list`，请尝试删除手机上的小程序、清理小程序所在的客户端缓存、重启对应的小程序开发工具后重试

## H5中使用uniCloud的跨域处理@useinh5

H5前端js访问云函数，涉及跨域问题，导致前端js无法连接云函数服务器。处理方式如下：。

- 运行到H5端时，使用HBuilderX内置浏览器，可以忽略跨域问题（mac版需2.5.10+）。
- 发行到H5端时，需要在uniCloud后台操作，绑定安全域名（在部署云函数的服务空间配置部署h5的域名作为安全域名），否则会因为跨域问题而无法访问。（在`cloudfunctions`目录右键可打开uniCloud后台）

> 注意跨域配置需要带上端口信息。例如：前端页面运行于：www.xxx.com:5001，跨域配置内配置：www.xxx.com不会对此页面生效，需要配置为：www.xxx.com:5001

**uniCloud后台跨域配置：**

![](https://img.cdn.aliyun.dcloud.net.cn/uni-app/uniCloud/uniCloud-add-domain.png)

- 如果运行时，想使用外部浏览器运行，方案如下：
  * 方式1：在uniCloud web控制台绑定测试期的地址为安全域名，如配置：localhost:8080、192.168.0.1:8080（建议直接使用内置浏览器测试）
  * 方式2：在外部浏览器安装跨域插件，详见：[https://ask.dcloud.net.cn/article/35267](https://ask.dcloud.net.cn/article/35267)。要跨域的地址，详见上述文档中小程序配置安全域名章节。

**注意**

- 目前阿里云跨域配置不对云存储及前端网页托管生效，表现为云存储中图片绘制到canvas会[污染画布](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Using_images#Using_other_canvas_elements)，前端网页托管的网页不可在iframe中使用

## cli项目中使用uniCloud

如果要在cli项目中使用uniCloud，可以参考以下步骤

1. 将cli项目导入`HBuilderX`
2. 在项目根目录（src同级）创建`cloudfunctions-aliyun`或者`cloudfunctions-tcb`目录（HBuilderX 3.0以上版本请创建`uniCloud-aliyun`、`uniCloud-tcb`目录）
3. 打开`src/manifest.json`，在`基础配置-->uni-app应用标示`处点击`重新获取`
4. 在步骤2创建的目录右键关联服务空间
5. 完成

**注意**

- 运行与发行云函数只能使用HBuilderX的菜单，不可使用`package.json`内的命令
- 如果HBuilderX菜单运行不能满足需求可以考虑自行初始化服务空间[服务空间初始化](uniCloud/init.md)

**H5前端页面部署问题**

uniCloud支持前端页面部署，在HBuilderX中点发行菜单，生成H5，将生成的前端文件部署在uniCloud的前端网页托管内即可[详情参考](uniCloud/hosting.md)。

需要注意的是你仍在[uniCloud web控制台](https://unicloud.dcloud.net.cn) 配置H5安全域名。



**Tips**
- 虽然uni-app支持vscode等其他ide开发，但因为uniCloud对安全性要求极高，仅支持使用HBuilderX开发。

## web控制台@webcp

web控制台网址：[https://unicloud.dcloud.net.cn](https://unicloud.dcloud.net.cn)，在HX中对云函数目录点右键，或者在帮助菜单中，均有入口链接。

### 编辑数据库数据@editdb

在web控制台可以对数据库进行编辑。在json文档中，输入字符串、数字、bool值都是常规的操作。但有2种特殊数据类型，时间和地理位置，在编辑时有特殊的写法，请注意：

#### 添加日期@editdb-date

在web控制台添加/修改数据时，如果输入`"2020-12-02 12:12:12"`会变成字符串，而不是日期格式。此时需通过以下方式添加日期类型数据。

<!-- {
  "create_date": {
    "$date": "2020-12-02 12:12:12" // 添加utc+8时区对应的日期对象作为create_date
  }
} -->

```js
{
  "create_date": {
    "$date": 1606910053154 // 添加此时间戳对应的日期对象作为create_date
  }
}
```
注：时间戳无需如此复杂。时间戳只需直接输入不加引号的数字即可。

#### 添加地理位置点@editdb-geopoint

```js
// 将location字段设置为经度116、纬度38的地理位置点
{
  "location": {
    "type": "Point",
    "coordinates": [116,38]
  }
}
```
