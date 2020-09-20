## 简介

每个数据库操作，都要写一个云函数接口给前端，工作量很大，也占用云函数的总数量。

本插件提供了一个通用的数据库查询云函数，由前端向云函数传递要查询的条件，比如查询哪个表、查询哪些字段、where条件和排序是什么。

> 举例：在前端的list.vue列表页面，可以调用本云函数，传入列表查询条件。然后写content.vue详情页面时，无需再新建一个云函数，可以直接在content.vue页面继续调用相同的本云函数，传入详情的查询条件。

客户端的查询条件语法，与云函数里查询数据库的语法是相同的。[查询api手册](https://uniapp.dcloud.io/uniCloud/cf-database?id=%e6%9f%a5%e8%af%a2%e6%96%87%e6%a1%a3)

与某些小程序云的客户端直接操作数据库不同，本方案有2个明显优势：
- 安全：查询权限是在云函数里控制台的，能查什么表、什么字段，在云端控制。如果全部放在前端，由于前端的不可信任，相当于无法控制权限了。而某些小程序云提供的客户端权限，并不可编程，无法满足开发者的实际业务权限需求
- 包体积：某些小程序云的客户端操作数据库是一个数M大小的js sdk，如果迁移到H5和App，对应用的启动速度、性能、体积影响非常大

综上，本插件的优势在于：
1. 提高开发效率
2. 减少云函数数量
3. 安全，可控制权限
4. 性能好

注意：`clientDB`，不是操作客户端的数据库，而是操作uniCloud的云数据库；不是在客户端直接操作云数据库，而是在客户端写操作代码，在云端进行真正的数据库操作。

本项目包括云函数和客户端两部分，需要搭配使用，具体请参考下面文档。

插件地址：[https://ext.dcloud.net.cn/plugin?id=2314](https://ext.dcloud.net.cn/plugin?id=2314)

**示例项目使用须知**

1. 下载示例项目后选择服务空间
2. 在db_init.json上右键初始化数据库
3. 上传公共模块及云函数，公共模块用法参考[使用公共模块](https://uniapp.dcloud.net.cn/uniCloud/cf-common)
4. 运行项目即可

示例项目文件介绍：

<pre v-pre="" data-lang="">
	<code class="lang-" style="padding:0">
┌─cloudfunctions    云函数
│  ├─common         公共模块
|  │  └─uni-curd    数据库查询通用公共模块
|  ├─uni-clientDB   在云函数中控制权限，并调用uni-curd完成查询
|  └─db_init.json   初始化数据库
├─js_sdk            前端公共js目录
|  └─uni-clientDB   前端的js库，封装了查询语法
├─pages             业务页面文件存放的目录
│  ├─index
│  │  └─index.vue   index示例页面
├─main.js           Vue初始化入口文件
├─App.vue           应用配置，用来配置App全局样式以及监听 <a href="/frame?id=应用生命周期">应用生命周期</a>
├─manifest.json     配置应用名称、appid、logo、版本等打包信息，<a href="/collocation/manifest">详见</a>
└─pages.json        配置页面路由、导航条、选项卡等页面类信息，<a href="/collocation/pages">详见</a>
	</code>
</pre>

- 云函数里包括一个公共模块`uni-curd`和一个云函数`uni-clientDB`
- 前端包括一个js sdk`uni-clientDB`，然后就是index.vue里的示例调用
- index示例页面，里面包含两个示例一个简单查询一个分页查询

## 客户端公共模块

客户端js-sdk主要负责组装查询逻辑

**示例代码**

```js
// 引入公共模块
import db from '@/common/uni-clientDB/index.js'
const dbCmd = db.command

// 使用uni-clientDB
uniCloud.callFunction({
	name: 'uni-clientDB',
	data: {
		command: db.collection('list').where({
			name: new RegExp('龚','g'),
			time: dbCmd.gt(1105885393581)
		}).field({
			extra: false
		}).get()
	},
	success(res) {
		// ...
	},
	fail(err) {
		// ...
	}
})
```

**使用说明**

语法与云函数写查询数据库一致，目前有以下限制：

- 不可使用db.serverDate、db.Geo、db.RegExp
- 上传时会对query进行序列化，除Date类型、RegExp之外的所有不可序列化的参数类型均不支持（例如：undefined）
- 为方便控制禁止前端使用set方法，一般情况下也不需要前端使用set

## 云函数公共模块

云函数公共模块`uni-curd`主要负责解析客户端查询逻辑，对客户端行为做简单的限制

**使用示例**

```js
'use strict';
const uniCurd = require('uni-curd')
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	// 这里可以判断用户身份给予不同权限，例如：可以从event里拿到uni-id的token，根据token和客户端参数决定查询权限限制
	try {
		const res = await uniCurd({
			command: event.command,
			pagination: event.pagination,
			rules: {
				list: { // 数据表名
					// CRUD权限
					create: false,
					read: true,
					update: false,
					delete: false,
					// 是否允许使用聚合
					aggregate: false,
					// 是否允许使用联表查询，联表查询时blockedField不会对被连接的数据表生效
					lookup: false,
					// 使用聚合时blockField不会覆盖客户端的project，而是在聚合第一阶段插入project，不使用聚合时会在最后阶段插入一个field（会覆盖客户端的field方法）
					blockedField: ['extra'],
					// 不使用聚合时mixinCondition会在没有where的时候在collection方法之后插入where，有where时会跟where条件进行合并，取原条件且mixinCondition。使用聚合时会在第一阶段插入match使用混入的条件，如果有blockedField会插入在blockedField对应的project之前
					mixinCondition: {
						time: dbCmd.gt(1000000000000)
					},
					// 更多用法请参考下方参数说明文档
				}
			}
		})
		return res

	} catch (e) {
		return {
			code: 10001,
			msg: e.message
		}
	}
};

```

**参数说明**

|参数名		|类型	|是否必填	|默认值	|说明						|
|:-:		|:-:	|:-:		|:-:	|:-:						|
|command	|Object	|是			|-		|客户端上传的查询条件		|
|pagination	|Object	|否			|-		|如需分页，请在此字段内配置	|
|rules		|Object	|是			|-		|权限规则					|

**pagination参数说明**

|参数名		|类型	|是否必填	|默认值	|说明		|
|:-:		|:-:	|:-:		|:-:	|:-:		|
|pageSize	|Object	|是			|-		|每页数量	|
|current	|Object	|是			|-		|当前页码	|

**rules参数说明**

rules下可以对不同的数据表配置不同的权限，比如以下规则代表”数据表list允许插入，数据表goods允许更新“

```js
{
	list: {
		create: true,
	},
	goods: {
		update: true
	}
}
```

|参数名			|类型	|是否必填	|默认值	|说明								|
|:-:			|:-:	|:-:		|:-:	|:-:								|
|create			|Boolean|否			|false	|是否开启插入权限					|
|read			|Boolean|否			|true	|是否开启读权限						|
|update			|Boolean|否			|false	|是否开启更新权限					|
|delete			|Boolean|否			|false	|是否开启删除权限					|
|aggregate		|Boolean|否			|false	|是否允许聚合						|
|lookup			|Boolean|否			|false	|是否允许联表查询					|
|blockedField	|Array	|否			|-		|屏蔽的数据库字段，请阅读注意事项	|
|mixinCondition	|Object	|否			|-		|混入条件，请阅读注意事项			|
|hooks			|Object	|否			|-		|回调方法							|

**hooks参数说明**

|参数名				|类型		|是否必填	|默认值	|说明																							|
|:-:				|:-:		|:-:		|:-:	|:-:																							|
|beforeStageAppend	|Function	|否			|-		|每个阶段被添加之前执行																			|
|afterStageAppend	|Function	|否			|-		|每个阶段被添加之后执行																			|
|beforeSend			|Function	|否			|-		|最终阶段'get', 'end', 'count', 'add', 'remove', 'update'添加之前执行，在beforeStageAppend之后	|

**回调方法的使用**

回调参数如下：

```js
{
	state: {
		useAggregate, // 是否使用了聚合
		useLookup, // 是否使用了联表查询
		type, // 操作类型，可能的值为create、read、update、delete
		collection, // 当前数据表名
		methodList // 使用到的方法列表
	},
	stage: {
		method, // 当前阶段方法名
		args // 当前阶段方法参数
	},
	exec // 已经组装的查询指令
}
```

回调方法中可以通过返回结果修改数据库指令，例如以下示例在skip之后插入一个limit

```js
afterStageAppend: function({
	state,
	stage,
	exec
}) {
	if(stage.method === 'skip') {
		return exec.limit(1)
	}
},
```

**注意事项**

- 关于blockedField
  + 使用聚合时blockField不会覆盖客户端的project，而是在聚合第一阶段插入project
  + 不使用聚合时会在最后阶段插入一个field（会覆盖客户端的field方法）
  + blockedField仅对读操作生效

- 关于mixinCondition
  + mixinCondition内可以使用数据库操作符
  + 不使用聚合时mixinCondition会在没有where的时候在collection方法之后插入where，有where时会跟where条件进行合并，取原条件且mixinCondition。
  + 使用聚合时会在第一阶段插入match使用混入的条件，如果有blockedField会插入在blockedField对应的project之前
  + mixinCondition会对除插入以外的所有操作生效
  + 使用mixinCondition时客户端不可使用`collection('xxx').doc('xxx')`方法（1.0.8版本起即使有mixinCondition客户端也可以使用doc方法）

- 关于联表查询
  + 连接的数据表也会受所配置的权限规则中对应数据表规则限制，主要是read，目前连接的数据表不会受blockedField限制

## 参考

在线通讯录项目，完整的演示了如何基于clientDB在客户端代码里实现数据的增删改查，是学习clientDB的重要示例项目。该项目插件地址：[https://ext.dcloud.net.cn/plugin?id=2574](https://ext.dcloud.net.cn/plugin?id=2574)
