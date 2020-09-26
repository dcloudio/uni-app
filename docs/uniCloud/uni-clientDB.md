## 简介

**重要：uni-clientDB 2.0.0版本不兼容旧版，如果你依然需要使用旧版本请在此链接下载 [uni-clientDB 1.0.8](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/839b6a50-fe54-11ea-81ea-f115fe74321c.zip)**

clientDB框架的目标：减少服务端代码开发。

如今的应用，不管是App、小程序、H5，均是前后端分离。

前端是轻不下去了，但后端是可以越来越轻的。

serveless减少了服务器的运维工作量，能不能再进一步，减少服务器的开发工作量？

答案是肯定的。

过去，大多数服务端代码开发就是这几件事：
1. 接收客户端参数，校验参数
2. 校验客户端身份和权限
3. 操作数据库
4. 对数据加工变成json返回给前端

后端工程师不停的做上述代码的逻辑，不停的为前端提供各种接口。前后端要不停的联调，甚至引入postman这种多余的工具。

clientDB的目标，就是让上述无聊的服务端代码开发，从此消失！

怎么做到？

- 首先，在前端操作数据库。前端直接写数据库增删改查的代码。
- 然后，在云端通过json配置权限和校验规则，不写代码，但保证数据库操作的安全。
- 同时，如果遇到需要写云端代码的时候，也可以通过action机制编写云函数代码进行处理。

使用clientDB也将大大减少云函数的数量，避免超过云函数的数量上限。

> 举例：在前端的list.vue列表页面，可以调用本框架，传入列表查询条件。然后写content.vue详情页面时，无需再新建一个云函数，可以直接在content.vue页面继续调用相同的本云函数，传入详情的查询条件。

客户端的查询条件语法，与云函数里查询数据库的语法是相同的。[查询api手册](https://uniapp.dcloud.io/uniCloud/cf-database?id=%e6%9f%a5%e8%af%a2%e6%96%87%e6%a1%a3)

与某些小程序云的客户端直接操作数据库不同，本方案有2个明显优势：
- 安全：查询权限是在云端控制的，能查什么表、什么字段，在云端控制。如果全部放在前端，由于前端的不可信任，相当于无法控制权限了。而某些小程序云提供的客户端权限，并不可编程，无法满足开发者的实际业务权限需求
- 包体积：某些小程序云的客户端操作数据库是一个数M大小的js sdk，如果迁移到H5和App，对应用的启动速度、性能、体积影响非常大。但clientDB的客户端jssdk只有几k，

综上，本插件的优势在于：
1. 大幅减少服务端开发工作量
2. 减少云函数数量
3. 安全，可控制权限
4. 更轻的客户端体积

本项目包括云函数和客户端两部分，需要搭配使用，具体请参考下面文档。

插件地址：[https://ext.dcloud.net.cn/plugin?id=2314](https://ext.dcloud.net.cn/plugin?id=2314)

**示例项目使用须知**

1. 下载示例项目后选择服务空间
2. 在db_init.json上右键初始化数据库
3. 上传公共模块及云函数，公共模块用法参考[使用公共模块](https://uniapp.dcloud.net.cn/uniCloud/cf-common)
4. 运行项目即可

## 目录结构@structure

uni-clientDB项目目录结构如下

<pre v-pre="" data-lang="">
	<code class="lang-" style="padding:0">
┌─cloudfunctions              云函数
│  ├─common                   公共模块
|  │  └─uni-id	              uni-id公共模块
|  ├─uni-clientDB             在云函数中控制权限
|  |   ├─action               调用数据库查询前后执行的操作
|  |   |  └─action-name.js    action逻辑
|  |   ├─db-permission        数据库权限规则
|  |   |  └─table-name.js     表名作为文件名设置不同表的权限规则
|  |   ├─validator            数据校验规则
|  |   |  └─table-name.js     表名作为文件名设置不同表的数据校验规则
|  |   ├─index.js             clientDB云函数入口
|  |   └─package.json         clientDB云函数package.json
|  └─db_init.json             初始化数据库
├─js_sdk                      前端公共js目录
|  └─uni-clientDB             前端的js库，封装了查询语法
├─pages                       业务页面文件存放的目录
├─main.js                     Vue初始化入口文件
├─App.vue                     应用配置，用来配置App全局样式以及监听 <a href="/frame?id=应用生命周期">应用生命周期</a>
├─manifest.json               配置应用名称、appid、logo、版本等打包信息，<a href="/collocation/manifest">详见</a>
└─pages.json                  配置页面路由、导航条、选项卡等页面类信息，<a href="/collocation/pages">详见</a>
	</code>
</pre>

## 客户端js-sdk@jssdk

客户端js-sdk主要负责组装查询逻辑，以及处理一些客户端不太方便表示的字段，比如用户ID（详情看下面语法扩展部分）

**示例代码**

```js
// 引入公共模块
import db from '@/js_sdk/uni-clientDB/index.js'
const dbCmd = db.command

// 使用uni-clientDB
db.action('get-info') // 不使用action时可以不调用action方法
  .collection('list')
  .where({
    name: new RegExp('龚','g'),
    time: dbCmd.gt(1105885393581)
  }).field({
    extra: false
  }).get()
  .then((res)=>{
    
  }).catch((err)=>{
    
  })
```

**使用说明**

语法与云函数写查询数据库一致，目前有以下限制：

- 不可使用db.serverDate、db.Geo、db.RegExp
- 上传时会对query进行序列化，除Date类型、RegExp之外的所有不可序列化的参数类型均不支持（例如：undefined）
- 为方便控制禁止前端使用set方法，一般情况下也不需要前端使用set
- 更新数据库时不可使用更新操作符`db.command.inc`等
- 更新数据时键值不可使用`{'a.b.c': 1}`的形式（后续会对此进行优化）

### 语法扩展

clientDB目前内置了3个变量可以供客户端使用，客户端并非直接获得这三个变量的值，而是需要传递给clientDB云函数，云函数解析之后给赋予真正的值。

|参数名					|说明					|
|:-:						|:-:					|
|db.env.uid			|用户uid			|
|db.env.now			|服务器时间戳	|
|db.env.clientIP|当前客户端IP	|

使用这些变量，将可以避免过去在服务端代码中写代码获取用户uid、时间和客户端ip的麻烦。

## 云函数clientDB

云函数uni-clientDB主要负责解析客户端数据库操作逻辑，对客户端行为做权限以及数据格式上的限制。除了`uni-curd`之外还有以下三部分:

1. db-permission目录用于存放权限规则。db-permission下每个文件对应一个表的权限，文件名为对应的表名。
2. validator目录用于存放字段数据校验规则。和db-permission一样，validator目录下每个文件的文件名对应一个表名。
3. action目录下的预处理后处理逻辑。action下每个目录对应一个操作，前端页面在callFunction时传入action参数指明当前操作需要使用哪个action（可以在权限规则内指定某些操作必须使用指定的action，比如`"action in ['action-a','action-b']"`）

**注意**

- clientDB依赖uni-id提供用户身份，如果你不了解uni-id，请参考[uni-id文档](https://uniapp.dcloud.net.cn/uniCloud/uni-id)
- 通常在管理控制台使用clientDB，需要获取不同角色用户拥有的权限（在权限规则内使用auth.permission），请先查阅[uni-id 角色权限](https://uniapp.dcloud.net.cn/uniCloud/uni-id?id=rbac)

**云函数内部执行顺序**

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b7d96a10-ff35-11ea-8ff1-d5dcf8779628.jpg)

云函数默认返回值形式如下，开发者可以在action的after内修改返回结果，传入after内的result不带code和message。

```js
{
  code: "", // 错误码
  message: "" // 错误信息
  ... // 数据库指令执行结果
}
```

**错误码列表**

|错误码													|描述																		|
|:-:														|:-:																		|
|TOKEN_INVALID_INVALID_CLIENTID	|token校验未通过（设备特征校验未通过）	|
|TOKEN_INVALID									|token校验未通过（云端已不包含此token）	|
|TOKEN_INVALID_TOKEN_EXPIRED		|token校验未通过（token已过期）					|
|TOKEN_INVALID_WRONG_TOKEN			|token校验未通过（token校验未通过）			|
|SYNTAX_ERROR										|db-permission语法错误									|
|PERMISSION_ERROR								|权限校验未通过													|
|VALIDATION_ERROR								|数据校验未通过													|
|SYSTEM_ERROR										|系统错误																|

**我们推荐试用web控制台的数据库表结构来统一管理permission和validator，uniCloud web控制台可以通过表结构一键生成前端页面和clientDB权限及验证规则，后续HBuilderX也会内置此功能**

为了更好的控制客户端行文，客户端在db-permission不为公有读（并非true时）时写法有以下限制：

- 不使用聚合时collection方法之后需紧跟一个where方法，这个where方法内传入的条件必须满足权限控制规则
- 使用聚合时aggregate方法之后需紧跟一个match方法，这个match方法内的条件需满足权限控制规则
- 使用lookup时只可以使用拼接子查询的写法（let+pipeline模式），做这个限制主要是因为需要确保访问需要lookup的表时也会传入查询条件，即pipeline参数里面`db.command.pipeline()`之后的match方法也需要像上一条里面的match一样限制
- 上面用于校验权限的match和where后的project和field是用来确定本次查询需要访问什么字段的（如果没有将会认为是在访问所有字段），访问的字段列表会用来确认使用那些字段权限校验。这个位置的project和field只能使用白名单模式
- 上面用于校验权限的match和where内如果有使用`db.command.expr`，那么在进行权限校验时expr方法内部的条件会被忽略，整个expr方法转化成一个不与任何条件产生交集的特别表达式，具体表现请看下面示例

可以参考db-permission内的使用示例说明

### db-permission

db-permission内为数据表权限，以表名作为文件名，clientDB会自动读取要访问的表的权限。

使用db-permission之前需要先了解以下db-permission的原理。db-permission会对客户端上传的数据库指令进行校验，即客户端的查询条件应该满足db-permission内规定的条件。比如db-permission内规定doc.a > 1,那么查询条件里面就必须有a且条件内的a也满足a>1，`{a:2}`、`{a:db.command.gt(3)}`都是满足条件的查询。

**db-permission配置示例**

```js
// db-permission/order.js
module.exports = {
  // 关于权限中用到的auth对象及doc对象请看下方说明
  // 新增数据时的权限
  '.create': false,
  // 读取数据时的权限
  '.read': 'doc.uid == auth.uid',
  // 更新数据时的权限
  '.update': false,
  // 删除数据时的权限
  '.delete': false,
  // secret_field字段的权限，需要注意的是字段只有读写权限
  // 访问一个子节点时会使用所有上级权限，所有上级权限及字段本身权限都满足时才可以操作
  'secret_field': {
    // secret_field字段的读权限
    '.read': false,
    // secret_field字段的写权限
    '.write': false
  }
}

// db-permission/book.js
module.exports = {
  // 未配置的权限默认为false
  // 读取数据时的权限
  '.read': 'doc.status == "OnSell"'
}
```

**请求示例**

```js
import db from '@/js_sdk/uni-clientDB/index.js'
const dbCmd = db.command
const $ = dbCmd.aggregate
db.collection('order')
  .aggregate()
  // 此match方法内的条件会和order表对应的权限规则进行校验
  .match({
    uid: db.env.uid
  })
  // 此project方法是为了确定查询需要访问order表的哪些字段
  .project({
    _id: true,
    book_id: true
  })
  .lookup({
    from: 'book',
    let: {
      book_id: '$book_id'
    },
    pipeline: $.pipeline()
    // 此match方法内的条件会和book表对应的权限规则进行校验，{status: 'OnSell'}会参与校验，整个expr方法转化成一个不与任何条件产生交集的特别表达式。这里如果将dbCmd.and换成dbCmd.or会校验不通过
    .match(dbCmd.and([ 
      {
        status: 'OnSell'
      },
      // 指定book表的_id等于order表的book_id
      dbCmd.expr(
        $.eq(['$_id', '$$book_id'])
      )
    ]))
    // 此project方法是为了确定查询需要访问book表的哪些字段
    .project({
      book_name: true
    })
    .done()
  })
  .end()

```

**权限规则内可以使用的全局变量**

|变量名					|说明																																																																												|
|:-:						|:-:																																																																												|
|auth.uid				|用户id																																																																											|
|auth.role			|用户角色数组，参考[uni-id 角色权限](/uniCloud/uni-id?id=rbac)，注意`admin`为clientDB内置的角色，如果用户角色列表里包含`admin`则认为此用户有完全数据访问权限|
|auth.permission|用户权限数组，参考[uni-id 角色权限](/uniCloud/uni-id?id=rbac)																																															|
|doc						|记录内容，用于匹配记录内容/查询条件（需要注意的是，规则内的doc对象并不是直接去校验存在于数据库的数据，而是校验客户端的查询条件）														|
|now						|当前时间戳（单位：毫秒），时间戳可以进行额外运算，如doc.publish\_date > now - 60000表示publish\_date在最近一分钟																						|
|action					|当前客户端指定的action																																																																			|

**权限规则内可以使用的运算符**

|运算符	|说明						|示例																|示例解释(集合查询)																	|
|:-:		|:-:						|:-:																|:-:																								|
|==			|等于						|auth.uid == 'abc'									|用户id为abc																				|
|!=			|不等于					|auth.uid != 'abc'									|用户id不为abc																			|
|>			|大于						|doc.age>10													|查询条件的 age 属性大于 10													|
|>=			|大于等于				|doc.age>=10												|查询条件的 age 属性大于等于 10											|
|<			|小于						|doc.age<10													|查询条件的 age 属性小于 10													|
|<=			|小于等于				|doc.age<=10												|查询条件的 age 属性小于等于 10											|
|in			|存在在数组中		|doc.status in ['a','b']						|查询条件的 status 是['a','b']中的一个，数组中所有元素类型需一致							|
|nin		|不存在在数组中	|doc.status nin ['a','b']						|查询条件的 status 不是['a','b']中的任何一个，数组中所有元素类型需一致				|
|&&			|与							|auth.uid == 'abc' && doc.age>10	|用户id 为 abc 并且查询条件的 age 属性大于 10|
|&#124;&#124;|或	|auth.uid == 'abc'&#124;&#124;doc.age>10												|用户Id为abc或者查询条件的 age 属性大于 10|

**权限规则内可以使用的方法**

目前权限规则内仅可使用get方法，作用是根据id获取数据库中的数据。get方法接收一个字符串作为参数字符串形式为`database.表名.记录ID`

用法示例: 

```js
"get(`database.shop.${doc.shop_id}`).owner == auth.uid"
```

使用get方法时需要注意get方法的参数必须是唯一确定值，以上述示例为例

```js
// 可以使用的查询条件，此条件内doc.shop_id只能是'123123'
db.collection('street').where({
  shop_id: '123123'
}).get()

// 不可使用的查询条件，此条件内doc.shop_id可能是'123123'也可能是'456456'
const dbCmd = db.command
db.collection('street').where(dbCmd.or([
  {
    shop_id: '123123'
  },
  {
    shop_id: '456456'
  }
])).get()
```

### action

action主要用于进行数据操作前后处理数据

```js
// 客户端指定action为add-todo
import db from '@/js_sdk/uni-clientDB/index.js'
db.action('add-todo')
  .collection('todo')
  .add({
    title: 'todo title'
  })
  .then(res => {
    console.log(res)
  }).catch(err => {
    console.error(err)
  })

// 一个云函数内action文件示例 action/add-todo.js
module.exports = {
  // 在数据库操作之前执行
  before: async(state,event)=>{
    // state为当前clientDB操作状态其格式见下方说明
    // event为传入云函数的event对象
    
    // before内可以操作state上的newData对象对数据进行修改，比如：
    state.newData.create_time = Date.now()
    // 指定插入或修改的数据内的create_time为Date.now()
    // 执行了此操作之后实际插入的数据会变成 {title: 'todo title', create_time: xxxx}
    // 如果是执行插入操作时指定当前时间为创建时间的场景，有更简单的实现方案：在validator内配置defaultValue或者forceDefaultValue
  },
  // 在数据库操作之后执行
  after:async (state,event,error,result)=>{
    // state为当前clientDB操作状态其格式见下方说明
    // event为传入云函数的event对象
    // error为执行操作的错误对象，如果没有错误error的值为null
    // result为执行command返回的结果
    
    if(error) {
      throw error
    }
    
    // after内可以对result进行额外处理并返回，如果有after方法，则云函数返回值会是after方法的返回值
    result.msg = 'hello'
    return result
  }
}
```

**state**参数说明

```js
// state参数格式如下
{
  command: {
    // getMethod('where') 获取所有的where方法，返回结果为[{$method:'where',$param: [{a:1}]}]
    getMethod,
    // getMethod({name:'where',index: 0}) 获取第1个where方法的参数，结果为数组形式，例：[{a:1}]
    getParam,
    // setParam({name:'where',index: 0, param: [{a:1}]}) 设置第1个where方法的参数，调用之后where方法实际形式为：where({a:1})
    setParam
  },
  // 需要注意的是clientDB可能尚未获取用户信息，如果权限规则内没使用auth对象且数据库指令里面没使用db.env.uid则clientDB不会自动取获取用户信息
  auth: {
    uid, // 用户ID，如果未获取或者获取失败uid值为null
    role, // 通过uni-id获取的用户角色，需要使用1.1.9以上版本的uni-id，如果未获取或者获取失败role值为[]
    permission, // 通过uni-id获取的用户权限，需要使用1.1.9以上版本的uni-id，如果未获取或者获取失败permission值为[]，注意登录时传入needPermission才可以获取permission，请参考 https://uniapp.dcloud.net.cn/uniCloud/uni-id?id=rbac
    checked // 是否已经获取了用户信息
  },
  // 事务对象，如果需要用到事务可以在action的before内使用state.transaction = await db.startTransaction()传入
  transaction,
  // 更新或新增的数据
  newData,
  // 访问的集合
  collection,
  // 操作类型，可能的值'read'、'create'、'update'、'delete'
  type
}
```

### validator

validator主要是用于数据校验以及在新增数据时指定默认值，validator下的文件可以由web控制台数据库表结构生成。

一个典型的validator文件形式如下

```js
// validator/article.js
module.exports = {
  "title": {
    label: '标题',
    rules: [{
      // 校验title字段为string类型，更多校验规则详见https://uniapp.dcloud.net.cn/uniCloud/schema
      format: 'string'
    }]
  },
  "user_id": {
    // 新增数据时将user_id指定为当前用户Id，客户端不可修改
		forceDefaultValue: {
			$env: 'uid'
		}
	},
  "is_public": {
    // 新增数据时默认is_public指定为true，客户端可以修改
		defaultValue: true
	}
}
```

defaultValue和forceDefaultValue均为字段默认值，区别在于defaultValue会被客户端传值覆盖，而forceDefaultValue不允许被客户端覆盖（如果客户端传递了与forceDefaultValue不一样的值会无法通过校验）

defaultValue/forceDefaultValue内除了直接指定值之外，还可以通过`{$env: "变量名"}`的形式指定默认值为一些特殊变量，目前有以下可选变量名

```js
// 指定默认值为当前时间戳
forceDefaultValue: {
  $env: 'now'
}

// 指定默认值为当前用户ID
forceDefaultValue: {
  $env: 'uid'
}

// 指定默认值为当前客户端IP地址
forceDefaultValue: {
  $env: 'clientIP'
}
```


<!-- ## 参考

在线通讯录项目，完整的演示了如何基于clientDB在客户端代码里实现数据的增删改查，是学习clientDB的重要示例项目。该项目插件地址：[https://ext.dcloud.net.cn/plugin?id=2574](https://ext.dcloud.net.cn/plugin?id=2574) -->
