## 创建uniCloud项目
  
  - 在 [HBuilderX 2.5.8+](https://www.dcloud.io/hbuilderx.html) 新建项目，选择uni-app项目，并勾选`启用uniCloud`
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
- 一个应用，可以在[dev.dcloud.net.cn](https://dev.dcloud.net.cn)设置协作者（选择应用->设置项目成员），实现多人共同使用一个云服务空间。（需 HBuilderX 2.5.9+）
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
编写云函数后，在项目管理器里右键点击该云函数的目录，在弹出菜单中可选择“上传部署云函数”、“上传并运行测试云函数”。如下图所示：


前者仅完成部署，后者会在部署后同时运行，并打印日志出来。

在云函数编辑器里，按`Ctrl+r`运行快捷键，或点工具栏的运行，还会直接看到上传并运行云函数的快捷指令。`Ctrl+r`然后回车或选`0`，即可高效的在控制台看到运行结果和日志输出。

云函数目前无法断点debug，只能打印`console.log`看日志。

![](https://img.cdn.aliyun.dcloud.net.cn/uni-app/uniCloud/uniCloud-run-function.png)

![](https://img.cdn.aliyun.dcloud.net.cn/uni-app/uniCloud/uniCloud-run-function-2.png)

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

uni-app运行在各端，均可查看手机端日志。额外的，在App真机运行模式下，在HBuilderX的自带控制台也会打印云函数输出的`console.log`。

**App端真机调试输出云函数日志，如下图所示**

所执行云函数代码

```
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

日志输出

![](https://img.cdn.aliyun.dcloud.net.cn/uni-app/uniCloud/uniCloud-function-log.png)

- 运行到H5，需要在浏览器的控制台查看日志，但仅包含前端日志，不包含云函数内部的console.log。
- 运行到小程序，需要在小程序开发工具的控制台查看日志，但仅包含前端日志，不包含云函数内部的console.log。

目前uniCloud的web控制台还不能查看运行日志，后续会提供此功能。

## 小程序中使用uniCloud

小程序中使用uniCloud需要在相应的小程序管理后台设置request合法域名、uploadFile合法域名。这些域名均为阿里云或腾讯云自有域名，并非DCloud所属域名。

|服务提供商	|request合法域名|uploadFile合法域名									|
|:-:				|:-:						|:-:																|
|阿里云			|api.bspapp.com	|bsppub.oss-cn-shanghai.aliyuncs.com|

小程序开发工具的真机预览功能，必须添加上述域名白名单，否则无法调用云函数。模拟器的PC端预览、真机调试不受此影响。

## H5中使用uniCloud

H5前端js访问云函数，涉及跨域问题，导致前端js无法连接云函数服务器。处理方式如下：。

- 运行到H5端时，使用HBuilderX内置浏览器，可以忽略跨域问题（mac版需2.5.10+）。

- 发行到H5端时，需要在uniCloud后台操作，绑定安全域名，否则会因为跨域问题而无法访问。（在`cloudfunctions`目录右键可打开uniCloud后台）

**uniCloud后台配置安全域名：**

![](https://img.cdn.aliyun.dcloud.net.cn/uni-app/uniCloud/uniCloud-add-domain.png)

- 如果运行时，想使用外部浏览器运行，方案如下：
  * 方式1：在uniCloud web控制台绑定测试期的地址为安全域名，如配置：localhost:8080、192.168.0.1:8080
  * 方式2：在外部浏览器安装跨域插件，详见：[https://ask.dcloud.net.cn/article/35267](https://ask.dcloud.net.cn/article/35267)。要跨域的地址，详见上述文档中小程序配置安全域名章节。


**H5前端页面部署问题**

阿里云Serverless暂未支持H5前端页面部署，需开发者自行准备web服务器，在HBuilderX中点发行菜单，生成H5，将生成的前端文件部署在Nginx等web服务器下。

然后自行注册或使用已有域名，在域名服务商处处理好域名的解析，指向你的Nginx等服务器ip。

最后将该域名通过uniCloud后台配置为安全域名，即可在浏览器中访问。

**m3w.cn二级域名申请**

若为新冠抗疫需紧急上线H5，来不及注册域名，可申请使用DCloud提供的m3w.cn的二级域名，示例：[hellounicloud.m3w.cn](https://hellounicloud.m3w.cn) 。此时请使用你注册DCloud账户的邮箱向service@dcloud.io发邮件申请，提供你的appid、计划使用的二级域名名称、解析的ip地址、应用的使用用途。

## 使用db_init.json初始化项目数据库

自`HBuilderX 2.5.11`起`uniCloud`提供了`db_init.json`来方便开发者快速进行数据库的初始化操作。

**使用说明**

- 在`cloudfucntions`目录右键即可创建`db_init.json`，
- 在`db_init.json`上右键初始化数据库。

**db_init.json形式如下**

```
{
    "collection_test": { // 集合（表名）
        "data": [ // 数据
           {
                "_id": "da51bd8c5e37ac14099ea43a2505a1a5",
               "name": "tom"
           }
        ],
        "index": [{ // 索引
            "IndexName": "index_a", // 索引名称
            "MgoKeySchema": { // 索引规则
                "MgoIndexKeys": [{
                    "Name": "index", // 索引字段
                    "Direction": 1 // 索引方向，1：ASC-升序，-1：DESC-降序
                }],
                "MgoIsUnique": false // 索引是否唯一
            }
        }]
    }
}
```

**Bug&Tips**
- 早期阿里云的云函数的初次冷启动较慢，表现为某个云函数第一次被调用时联网时间较长，可能要5秒左右。第二次即可正常。此问题阿里云已修复，需重新上传部署云函数后生效。
- web控制台网址：[http://unicloud.dcloud.net.cn](http://unicloud.dcloud.net.cn)，在HX中对云函数目录点右键，或者在帮助菜单中，均有入口链接。

<!-- **注意**
- 服务提供商为腾讯云时，需要开发者手动去管理控制台开启匿名登录[详情](/uniCloud/authentication#匿名登录) -->

