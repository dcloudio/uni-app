# 微信小程序云迁移uniCloud

## 概念澄清

uniCloud，可以自选阿里云和腾讯云的serverless。类似于uni-app屏蔽了各家小程序的端侧差异，uniCloud也屏蔽了微信小程序云开发和支付宝小程序云开发的差异。

也就是说，uniCloud选择腾讯云时，和微信小程序云开发，连的是一套云服务，都是腾讯云官方提供的。

虽然硬件相同，包括API也很相似，但uniCloud和微信云开发仍然有一些软件层面的差异。

uniCloud去掉了微信云开发的一些功能，添加了更多功能。以及在生态配套上差别也比较大。

## 优劣对比

|				|微信云开发																	|uniCloud																																																|
|--				|--																			|--																																																		|
|跨端			|只有微信小程序(虽可用其他工具变相开发H5、QQ小程序，但端不够全也难以保持一致性)					|全端。App、web、各家小程序快应用全支持																																									|
|跨云			|只支持腾讯云。为其编写的云函数不能运行在其他云平台							|阿里云、腾讯云均支持，方便互相切换。对其他云也持开放态度																																				|
|定价			|价格相同。													|价格相同。DCloud只是获取腾讯云的返点，而不是加价售卖																																	|
|前端操作数据库	|使用微信的账户权限而不是应用的账户权限，无法编程，不能有效控制数据权限安全。客户端js sdk体积大，影响性能	|完善的[clientDB](https://uniapp.dcloud.io/uniCloud/clientdb)模块，使用应用自己的用户权限体系，可灵活编程，安全可靠控制权限																				|
|数据库schema	|不支持																		|完善的数据库[schema](https://uniapp.dcloud.io/uniCloud/schema)设计，自带权限验证和数据合法性验证																										|
|数据库查询语法	|MongoDB语法。学习门槛高、写法复杂，尤其联表查询很难用							|除了MongoDB语法外，支持JQL语法，大幅降低学习门槛，减少数据库操作的代码量，快速完成复杂查询																												|
|开发工具		|微信小程序工具，编码体验欠佳												|通用编程工具HBuilderX，高效操作完善，插件体系开放																																						|
|前端数据库watch	|支持。权限按微信账户体系执行												|暂未集成。有需求可到需求墙投票：[http://dev.dcloud.net.cn/wish/](http://dev.dcloud.net.cn/wish/)。同时有插件可用于解决聊天场景，[详见](https://ext.dcloud.net.cn/search?q=im&cat1=7)																										|
|opendb			|无																			|开放的数据库规范，众多价值，[详情](https://gitee.com/dcloud/opendb)																																	|
|账户服务		|仅微信登录																	|[uni-id](https://uniapp.dcloud.io/uniCloud/uni-id)支持应用自己的账户体系，手机号或email，内置短信验证码和app端一键登录，支持微信、支付宝等三方登录，支持权限、角色、社交裂变等众多功能					|
|admin系统		|不自带																		|自带开源[uniCloud admin](https://uniapp.dcloud.io/uniCloud/admin)系统，大小屏自适配，自带用户、角色、权限功能，还有更多[插件](https://ext.dcloud.net.cn/?cat1=7&cat2=74&orderBy=UpdatedDate)拿来即用	|
|支付			|仅微信支付																	|[uniPay](https://uniapp.dcloud.io/uniCloud/unipay)，跨端统一支付																																		|
|cms			|支持。但前端部分跨端不足													|支持。前端跨端、[管理端](https://ext.dcloud.net.cn/plugin?id=3543)开源																																	|
|插件生态		|腾讯云开发了部分插件															|丰富的插件生态，包含腾讯云为uniCloud开发的插件，众多现成项目模块，[详情](https://ext.dcloud.net.cn/?cat1=7&orderBy=UpdatedDate)																		|

上述差异，总结来看，uniCloud更开放、生态更丰富、开发效率更高。

开发效率之所以高的原因，包括clientDB、JQL、HBuilderX这些对效率起很大影响的重要功能和工具，也包括大量现成的轮子拿来就用。详见：[2021了，让我们把开发效率提升10倍吧！](https://mp.weixin.qq.com/s/d3y3pQqC_SMm3938_i2qNw)

## 技术迁移指南

如果已经开发了微信小程序，想迁移到uniCloud，下面提供云函数和数据库部分的技术迁移指南。

### 云函数迁移指南

#### 对接微信登录

uniCloud可以使用uni-id更简单的接入微信小程序登录。参考[uni-id微信登录](https://uniapp.dcloud.net.cn/uniCloud/uni-id?id=%e5%be%ae%e4%bf%a1%e7%99%bb%e5%bd%95)

不同于微信云开发中的直接获取openid，uni-id提供的登录接口会在数据库的uni-id-users表内添加用户记录。

如果要控制云存储的权限可以使用自定义登录，[uniCloud腾讯云自定义登录](https://uniapp.dcloud.net.cn/uniCloud/authentication)

#### 对接微信支付

uniCloud提供了uniPay来实现支付功能，同时支持微信和支付宝[unipay文档](https://uniapp.dcloud.net.cn/uniCloud/unipay)

老的微信云开发+原生小程序的代码是这样：
```js
// 云函数部分的代码
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {
  const res = await cloud.cloudPay.unifiedOrder({
    "body" : "商品描述",
    "outTradeNo" : "商户订单号",
    "spbillCreateIp" : "127.0.0.1",
    "totalFee" : 1,
	// 用于接收支付异步通知的云函数所在的服务空间ID和云函数名
    "envId": "test-f0b102",
    "functionName": "pay_cb"
  })
  return res
}

// 小程序部分的代码
wx.cloud.callFunction({
  name: '函数名',
  data: {
    // ...
  },
  success: res => {
    const payment = res.result.payment
    wx.requestPayment({
      ...payment,
      success (res) {
        console.log('pay success', res)
      },
      fail (res) {
        console.error('pay fail', err)
      }
    })
  },
  fail: console.error,
})
```

迁移到uniCloud + uni-app体系，代码改成这样：

```js
// 云函数部分的代码
const unipayIns = unipay.initWeixin({
  appId: 'your appId',
  mchId: 'your mchId',
  key: 'you parterner key',
  // pfx: fs.readFileSync('/path/to/your/pfxfile'), // p12文件路径，使用微信退款时需要，需要注意的是阿里云目前不支持以相对路径读取文件，请使用绝对路径的形式
})


exports.main = async (event, context) => {
	const res = await unipayIns.getOrderInfo({
		openid: 'user openid',
		body: '商品描述',
		outTradeNo: '商户订单号',
		totalFee: 1, // 金额，单位分
		notifyUrl: 'https://xxx.xx' // 支付结果通知地址
	})
  return res
}

// 客户端部分的代码
uniCloud.callFunction({
	name: '云函数名',
	data: {
		// ...
	},
	success(res) {
		uni.requestPayment({
			provider: 'wxpay',
			...res.result.orderInfo
			success (res) {
			  console.log('pay success', res)
			},
			fail (res) {
			  console.error('pay fail', err)
			}
		})
	}
})
```

**注意**

- uniPay和微信小程序的CloudPay接口很相似，需要注意的是uniPay接收的参数都是驼峰形式的，输出的参数也都是驼峰形式的。微信小程序的CloudPay有些接口是驼峰形式参数有些是蛇形参数

#### 临时CDN

临时CDN主要用于解决需要传输大文件到云函数的场景，使用uniCloud时可以通过先上传到云存储再传递fileID给云函数的方式实现

微信云开发写法：
```js
wx.cloud.callFunction({
  name: 'test',
  data: {
    filePathDemo: wx.cloud.CDN({
      type: 'filePath',
      filePath: 'xxxxxxxx',
    })
  },
})
```

uniCloud写法：
```js
uniCloud.uploadFile({
	filePath: filePath,
	cloudPath: 'a.jpg'
}).then(res => {
	const fileID = res.fileID
	uniCloud.callFunction({
		name: 'test',
		data: {
			filePathDemo: fileID
		}
	})
})
```

#### 微信开放接口

使用微信开放接口的场景可以替换为[mp-cloud-openapi](https://ext.dcloud.net.cn/plugin?id=1810)来实现。用法基本和微信云开发一致

微信云开发写法：
```js
const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.wxacode.createQRCode({
        path: 'page/index/index',
        width: 430
      })
    return result
  } catch (err) {
    return err
  }
}
```

uniCloud写法：
```js
// mp-cloud-openapi，地址：https://ext.dcloud.net.cn/plugin?id=1810
const openapi = require('mp-cloud-openapi')
const openapiWeixin = openapi.initWeixin({
  appId: 'appId',
  secret: 'secret'
})
exports.main = async (event, context) => {
  try {
    const result = await openapiWeixin.wxacode.createQRCode({
        path: 'page/index/index',
        width: 430
      })
    return result
  } catch (err) {
    return err
  }
}
```

### 数据库迁移指南

#### 数据导出导入

微信小程序云开发的控制台可以导出json数据，这个格式与uniCloud相同，可以将导出文件直接在uniCloud的web控制台操作导入。

#### 新增与更新数据的写法

微信小程序云开发add、update、set操作时参数比uniCloud多了一层data **从微信小程序云开发迁移时最需要注意的事项**

微信云开发写法：
```js
const res = await db.collection('todos').doc('todo-id').add({
  data: {
    description: "learn cloud database",
    done: false
  }
})
```

uniCloud写法：
```js
const res = await db.collection('todos').doc('todo-id').add({
  description: "learn cloud database",
  done: false
})
```

#### 客户端操作数据库

uniCloud内也支持客户端操作数据库（下面成为clientDB），但是与微信云开发稍有不同。主要有以下两点

- 权限依赖于uni-id
- 需要在表结构的permission里面配置权限，可以配置字段级的权限

另外clientDB支持以下扩展能力

- 数据校验能力，参考：[DB schema](https://uniapp.dcloud.net.cn/uniCloud/schema)
- 在数据库操作前/后执行额外操作，参考：[action](https://uniapp.dcloud.net.cn/uniCloud/clientdb?id=action)
- 更加简单的查询方式，参考：[JQL](https://uniapp.dcloud.net.cn/uniCloud/clientdb?id=jsquery)
