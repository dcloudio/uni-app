## 简介

> 自`HBuilderX 2.9.5`起支持在客户端直接使用`uniCloud.database()`方式获取数据库引用，即在前端直接操作数据库，这个功能被称为clientDB

使用clientDB的好处：不用写服务器代码了！

一个应用开发的40%工作量，就此直接省去。

当然使用clientDB需要扭转传统后台开发观念，不再编写云函数，直接在前端操作数据库。但是为了数据安全，需要在数据库上配置schema。

在db schema中，配置数据操作的权限和校验规则，阻止前端不恰当的数据读取和写入。参考：[DB-schema](https://uniapp.dcloud.net.cn/uniCloud/schema)

如果想在数据库操作之前或之后需要在云端执行额外的动作（比如获取文章详情之后阅读量+1），clientDB提供了action机制。在HBuilderX项目的`cloudfunctions/uni-clientDB-actions`目录编写上传js，参考：[actions](uniCloud/database?id=actions)

**注意**

- clientDB依赖uni-id提供用户身份和权限校验，如果你不了解uni-id，请参考[uni-id文档](https://uniapp.dcloud.net.cn/uniCloud/uni-id)
- 通常在管理控制台使用clientDB，需要获取不同角色用户拥有的权限（在权限规则内使用auth.permission），请先查阅[uni-id 角色权限](https://uniapp.dcloud.net.cn/uniCloud/uni-id?id=rbac)

## clientDB图解
![](https://static-eefb4127-9f58-4963-a29b-42856d4205ee.bspapp.com/clientdb.jpg)

## 客户端部分@jssdk

clientDB的客户端部分主要负责提供API，允许前端编写数据库操作指令，以及处理一些客户端不太方便表示的字段，比如用户ID（详情看下面语法扩展部分）

clientDB支持传统的nosql查询语法，更新增了jql查询语法。jql是一种更简单的查询语法。

**nosql查询语法示例代码**

这段示例代码，在一个前端页面，直接查询了云数据库的`list`表，并且指定了`name`字段值为`hello-uni-app`的查询条件，then的res即为返回的查询结果。

```js
// 获取db引用
const db = uniCloud.database()
// 使用uni-clientDB
db.collection('list')
  .where({
    name: "hello-uni-app"
  }).get()
  .then((res)=>{
    // res 为数据库查询结果
  }).catch((err)=>{
    
  })
```

**使用说明**

语法与云函数写查询数据库一致，目前有以下限制：

- 上传时会对query进行序列化，除Date类型、RegExp之外的所有不可序列化的参数类型均不支持（例如：undefined）
- 为方便控制禁止前端使用set方法，一般情况下也不需要前端使用set
- 更新数据库时不可使用更新操作符`db.command.inc`等
- 更新数据时键值不可使用`{'a.b.c': 1}`的形式，需要写成`{a:{b:{c:1}}}`形式（后续会对此进行优化）

### 返回值说明@returnvalue

clientDB云端默认返回值形式如下，开发者可以在action的after内用js修改返回结果，传入after内的result不带code和message。

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
|SYNTAX_ERROR										|语法错误																|
|PERMISSION_ERROR								|权限校验未通过													|
|VALIDATION_ERROR								|数据格式未通过													|
|SYSTEM_ERROR										|系统错误																|

### 前端环境变量@variable

clientDB目前内置了3个变量可以供客户端使用，客户端并非直接获得这三个变量的值，而是需要传递给云端，云数据库在数据入库时会把变量替换为实际值。

|参数名			|说明				|
|:-:			|:-:				|
|db.env.uid		|用户uid，依赖uni-id|
|db.env.now		|服务器时间戳		|
|db.env.clientIP|当前客户端IP		|

使用这些变量，将可以避免过去在服务端代码中写代码获取用户uid、时间和客户端ip的麻烦。

```js
const db = uniCloud.database()
let res = await db.collection('table').where({
  user_id: db.env.uid // 查询当前用户的数据
}).get()
```

### JQL查询语法@jsquery

`jql`，全称javascript query language，是一种js方式操作数据库的语法规范。

`jql`大幅降低了js工程师操作数据库的难度、大幅缩短开发代码量。并利用json数据库的嵌套特点，极大的简化了联表查询的复杂度。

#### JQL的诞生背景

传统的数据库查询，有sql和nosql两种查询语法。

- sql是一种字符串表达式，写法形如：

```
select * from table1 where field1="123"
```

- nosql是js方法+json方式的参数，写法形如：

```js
const db = uniCloud.database()
let res = await db.collection('table').where({
  field1: '123'
}).get()
```

sql写法，对js工程师而言有学习成本，而且无法处理非关系型的MongoDB数据库，以及sql的联表查询inner join、left join也并不易于学习。

而nosql的写法，实在过于复杂。
1. 运算符需要转码，`>`需要使用`gt`方法、`==`需要使用`eq`方法、
比如一个简单的查询，取field1>0，则需要如下复杂写法

```js
const db = uniCloud.database()
const dbCmd = db.command
let res = await db.collection('table1').where({
  field1: dbCmd.gt(0)
}).get()
```

如果要表达`或`关系，需要用`or`方法，写法更复杂

```js
field1:dbCmd.gt(4000).or(dbCmd.gt(6000).and(dbCmd.lt(8000)))
```

2. nosql的联表查询写法，比sql还复杂
sql的inner join、left join已经够乱了，而nosql的代码无论写法还是可读性，都更令人发指。比如这个联表查询：

```js
const db = uniCloud.database()
const dbCmd = db.command
const $ = dbCmd.aggregate
let res = await db.collection('orders').aggregate()
.lookup({
  from: 'books',
  let: {
    order_book: '$book',
    order_quantity: '$quantity'
  },
  pipeline: $.pipeline()
    .match(dbCmd.expr($.and([
      $.eq(['$title', '$$order_book']),
      $.gte(['$stock', '$$order_quantity'])
    ])))
    .project({
      _id: 0,
      title: 1,
      author: 1,
      stock: 1
    })
    .done(),
  as: 'bookList',
})
.end()
```

这些问题竖起一堵墙，让后端开发难度加大，成为一个“专业领域”。但其实这堵墙是完全可以推倒的。

`jql`将解决这些问题，让js工程师没有难操作的数据。

具体看以下示例

```js
const db = uniCloud.database()

// 上面的示例中的where条件可以使用以下写法
db.collection('list')
  .where('name == "hello-uni-app"')
  .get()
  .then((res)=>{
    // res 为数据库查询结果
  }).catch((err)=>{
    // err.message 错误信息
    // err.code 错误码
  })
```

除了js写法，uniCloud还提供了`<uni-clientdb>`组件，可以在前端页面中直接查询云端数据并绑定到界面上。[详情](https://ext.dcloud.net.cn/plugin?id=3256)
比如下面的代码，list表中查询到符合条件的记录可以直接绑定渲染到界面上

```html
<uni-clientdb v-slot:default="{loading, data, error, options}" :options="options"
 collection="list" where='name == "hello-uni-app"' :getone="true">
	<view v-if="error" class="error">{{error}}</view>
	<view v-else>
		{{item.name}}
	</view>
	<view class="loading" v-if="loading">加载中...</view>
</uni-clientdb>
```

**jql条件语句内变量**

以下变量同[前端环境变量](uniCloud/database.md?id=variable)

|参数名			|说明				|
|:-:			|:-:				|
|$env.uid		|用户uid，依赖uni-id|
|$env.now		|服务器时间戳		|
|$env.clientIP|当前客户端IP		|

**jql条件语句的运算符**

|运算符			|说明			|示例								|示例解释(集合查询)																		|
|:-:			|:-:			|:-:								|:-:																					|
|==				|等于			|name == 'abc'						|查询name属性为abc的记录，左侧为数据库字段												|
|!=				|不等于			|name != 'abc'						|查询name属性不为abc的记录，左侧为数据库字段											|
|>				|大于			|age>10								|查询条件的 age 属性大于 10，左侧为数据库字段											|
|>=				|大于等于		|age>=10							|查询条件的 age 属性大于等于 10，左侧为数据库字段										|
|<				|小于			|age<10								|查询条件的 age 属性小于 10，左侧为数据库字段											|
|<=				|小于等于		|age<=10							|查询条件的 age 属性小于等于 10，左侧为数据库字段										|
|in				|存在在数组中	|status in ['a','b']				|查询条件的 status 是['a','b']中的一个，左侧为数据库字段								|
|!				|非				|!(status in ['a','b'])				|查询条件的 status 不是['a','b']中的任何一个											|
|&&				|与				|uid == auth.uid && age > 10		|查询记录uid属性 为 当前用户uid 并且查询条件的 age 属性大于 10							|
|&#124;&#124;	|或				|uid == auth.uid&#124;&#124;age>10	|查询记录uid属性 为 当前用户uid 或者查询条件的 age 属性大于 10							|
|test			|正则校验		|/abc/.test(content)				|查询 content字段内包含 abc 的记录。可用于替代sql中的like。还可以写更多正则实现更复杂的功能	|

这里的test方法比较强大，格式为：`正则规则.test(fieldname)`。

具体到这个正则 `/abc/.test(content)`，类似于sql中的`content like %abc%`

### JQL联表查询扩展@lookup

`JQL`提供了更简单的联表查询方案。不需要学习join、lookup等复杂方法。

只需在db schema中，将两个表的关联字段建立映射关系，就可以把2个表当做一个虚拟表来直接查询。

比如有2个表，book表，存放书籍商品；order表存放书籍销售订单记录。

book表内有以下数据，title为书名、author为作者：

```js
{
  "_id": "1",
  "title": "西游记",
  "author": "吴承恩"
}
{
  "_id": "2",
  "title": "水浒传",
  "author": "施耐庵"
}
{
  "_id": "3",
  "title": "三国演义",
  "author": "罗贯中"
}
{
  "_id": "4",
  "title": "红楼梦",
  "author": "曹雪芹"
}
```

order表内有以下数据，book字段为book表的书籍_id，quantity为该订单销售了多少本书：

**注意编写查询条件时，除test外均为运算符左侧为数据库字段右侧右侧为常量**

### 联表查询扩展@lookup

```js
{
  "book": "1",
  "quantity": 111
}
{
  "book": "2",
  "quantity": 222
}
{
  "book": "3",
  "quantity": 333
}
{
  "book": "4",
  "quantity": 444
}
{
  "book": "3",
  "quantity": 555
}
```

如果我们要对这2个表联表查询，在订单记录中同时显示书籍名称和作者，那么首先要建立两个表中关联字段`book`的映射关系。

即，在order表的db schema中，配置字段 book 的`foreignKey`，指向 book 表的 _id 字段，如下

```json
// order表schema
{
  "bsonType": "object",
  "required": [],
  "permission": {
    ".read": true
  },
  "properties": {
    "book": {
      "bsonType": "string",
      "foreignKey": "book._id" // 使用foreignKey表示，此字段关联book表的_id。
    },
    "quantity": {
      "bsonType": "int"
    }
  }
}
```

book表的db schema也要保持正确
```json
// book表schema
{
  "bsonType": "object",
  "required": [],
  "permission": {
    ".read": true
  },
  "properties": {
    "title": {
      "bsonType": "string"
    },
    "author": {
      "bsonType": "string"
    }
  }
}
```

schema保存至云端后，即可在前端直接查询。查询表设为order和book这2个表名后，即可自动按照一个合并虚拟表来查询，filed、where等设置均按合并虚拟表来设置。

```js
// 客户端联表查询
const db = uniCloud.database()
  db.collection('order,book') // 注意collection方法内需要传入所有用到的表名，用逗号分隔，主表需要放在第一位
    .where('book.title == "三国演义"') // 查询order表内书名为“三国演义”的订单
    .field('book{title,author},quantity') // 这里联表查询book表返回book表内的title、book表内的author、order表内的quantity
    .get()
    .then(res => {
      console.log(res);
    }).catch(err => {
      console.error(err)
    })
```


上述查询会返回如下结果，可以看到书籍信息被嵌入到order表的book字段下，成为子节点。同时根据where条件设置，只返回书名为三国演义的订单记录。

```js
{
	"code": "",
	"message": "",
	"requestId": "79768ccd5808c-1754b13efc3_3",
	"data": [{
		"_id": "b8df3bd65f8f0d06018fdc250a5688bb",
		"book": [{
			"author": "罗贯中",
			"title": "三国演义"
		}],
		"quantity": 555
	}, {
		"_id": "b8df3bd65f8f0d06018fdc2315af05ec",
		"book": [{
			"author": "罗贯中",
			"title": "三国演义"
		}],
		"quantity": 333
	}]
}

```

关系型数据库做不到这种设计。jql充分利用了json文档型数据库的特点，实现了这个简化的联表查询方案。

不止是2个表，3个、4个表也可以通过这种方式查询。

不止js，`<uni-clientDB>`组件也支持所有`jql`功能，包括联表查询。

**注意**

- field参数字符串内没有冒号，{}为联表查询标志

### 排序规则扩展@orderby

传统的MongoDB的排序参数是json格式，jql支持类sql的字符串格式，书写更为简单。

sort方法和orderBy方法内可以传入一个字符串来指定排序规则。

orderBy允许进行多个字段排序格式如下

```js
orderBy('quantity desc, create_date desc') //按照quantity字段降序排序，quantity相同时按照create_date降序排序
// desc可以省略，上述代码和以下写法效果一致
orderBy('quantity, create_date')

// 注意不要写错了英文逗号
```

```js
// desc 降序
// asc 升序

// 这里以上面的order表数据为例
const db = uniCloud.database()
  db.collection('order') // 注意collection方法内需要传入所有用到的表名，用逗号分隔，主表需要放在第一位
    .orderBy('quantity desc') // 按照quantity字段降序排序
    .get()
    .then(res => {
      console.log(res);
    }).catch(err => {
      console.error(err)
    })
```

### 查询结果时返回总数@getcount

使用clientDB时可以在get方法内传入`getCount:true`来同时返回总数

```js
// 这以上面的order表数据为例
const db = uniCloud.database()
  db.collection('order') // 注意collection方法内需要传入所有用到的表名，用逗号分隔，主表需要放在第一位
    .orderBy('quantity desc') // 按照quantity字段降序排序
    .limit(1)
    .get({
      getCount:true
    })
    .then(res => {
      console.log(res);
    }).catch(err => {
      console.error(err)
    })
```

返回结果为

```js
{
	"code": "",
	"message": "",
	"data": [{
		"_id": "b8df3bd65f8f0d06018fdc250a5688bb",
		"book": "3",
		"quantity": 555
	}],
	"requestId": "26649773c9781-1754b282aef_6",
	"total": 5
}
```


### 查询结果时返回单条记录@getone
<!-- 这里需要补充文档和示例 -->

### 刷新token@refreshtoken

透传uni-id自动刷新的token给客户端

**用法**

```js
const db = uniCloud.database()

function refreshToken({
  token,
  tokenExpired
}) {
  uni.setStorageSync('uni_id_token', token)
  uni.setStorageSync('uni_id_token_expired', tokenExpired)
}
// 绑定刷新token事件
db.auth.on('refreshToken', refreshToken)
// 解绑刷新token事件
db.auth.off('refreshToken', refreshToken)
```

## schema@schema

目前schema需要在[uniCloud web控制台](https://unicloud.dcloud.net.cn)数据表的表结构处创建/修改。

schema内可以编写数据表的权限以及字段规则校验。

web控制台还可以根据schema生成前端使用的表单校验规则，无需前端再重复做一次表单校验。（需搭配`<uni-forms>组件`，[详见](https://ext.dcloud.net.cn/plugin?id=2773)）

甚至可以自动生成前端用的新增、修改数据的vue页面。[详情](https://uniapp.dcloud.net.cn/uniCloud/schema?id=%e5%a6%82%e4%bd%95%e4%bd%93%e9%aa%8c)

这些工具大幅减少了开发者的开发工作量和重复劳动。

**下面示例中使用了注释，实际使用时schema是一个标准的json文件不可使用注释。**完整属性参考[schema字段](https://uniapp.dcloud.net.cn/uniCloud/schema?id=segment)

关于如何编写permission请参考：[permission](uniCloud/database?id=permission)

```js
{
  "bsonType": "object", // 表级的类型，固定为object
  "required": ['book', 'quantity'], // 新增数据时必填字段
  "permission": { // 表级权限
    ".read": true, // 读
    ".create": false, // 新增
    ".update": false, // 更新
    ".delete": false, // 删除
  },
  "properties": { // 字段列表，注意这里是对象
    "book": { // 字段名book
      "bsonType": "string", // 字段类型
      "permission": { // 字段权限
        ".read": true, // 字段读权限
        ".write": false, // 字段写权限
      },
      "foreignKey": "book._id" // 其他表的关联字段
    },
    "quantity": {
      "bsonType": "int"
    }
  }
}
```

## permission@permission

为了更好的控制客户端行为，客户端在permission不为公有读（并非true时）时写法有以下限制：

- 不使用聚合时collection方法之后需紧跟一个where方法，这个where方法内传入的条件必须满足权限控制规则
- 使用聚合时aggregate方法之后需紧跟一个match方法，这个match方法内的条件需满足权限控制规则
- 使用lookup时只可以使用拼接子查询的写法（let+pipeline模式），做这个限制主要是因为需要确保访问需要lookup的表时也会传入查询条件，即pipeline参数里面`db.command.pipeline()`之后的match方法也需要像上一条里面的match一样限制
- 上面用于校验权限的match和where后的project和field是用来确定本次查询需要访问什么字段的（如果没有将会认为是在访问所有字段），访问的字段列表会用来确认使用那些字段权限校验。这个位置的project和field只能使用白名单模式
- 上面用于校验权限的match和where内如果有使用`db.command.expr`，那么在进行权限校验时expr方法内部的条件会被忽略，整个expr方法转化成一个不与任何条件产生交集的特别表达式，具体表现请看下面示例

实际运行时，
1. permission模块会解析前端传递的参数，分析前端操作人员的uni-id身份、要操作的数据表、字段和增删改查动作。
2. 然后从云端schema内读取数据表、字段、增删改查动作的权限配置
3. 最后根据用户身份和权限配置进行比对，以决定是否有权进行前端发起的这次数据库操作

permission规则，可以对整个表的增删改查进行控制，也可以针对字段进行控制；可以简单的配置true/false，也可以配置更具体的规则

比如permission内规定doc.a > 1,那么查询条件里面就必须有a且条件内的a也满足a>1，`{a:2}`、`{a:db.command.gt(3)}`都是满足条件的查询。

**schema内permission配置示例**

```js
// order表schema
{
  "bsonType": "object", // 表级的类型，固定为object
  "required": ['book', 'quantity'], // 新增数据时必填字段
  "permission": { // 表级权限
    ".read": "doc.uid == auth.uid", // 每个用户只能读取用户自己的数据。前提是要操作的数据doc，里面有一个字段存放了uid，即uni-id的用户id。（不配置时等同于false）
    ".create": false, // 禁止新增数据记录（不配置时等同于false）
    ".update": false, // 禁止更新数据（不配置时等同于false）
    ".delete": false, // 禁止删除数据（不配置时等同于false）
  },
  "properties": { // 字段列表，注意这里是对象
    "secret_field": { // 字段名
      "bsonType": "string", // 字段类型
      "permission": { // 字段权限
        ".read": false, // 禁止读取secret_field字段的数据
        ".write": false // 禁止写入（包括更新和新增）secret_field字段的数据，父级节点存在false时这里可以不配
      }
    },
    "uid":{
      "bsonType": "string", // 字段类型
      "foreignKey": "uni-id-users._id"
    },
    "book_id": {
      "bsonType": "string", // 字段类型
      "foreignKey": "book._id"
    }
  }
}
```

```js
// book表schema
{
  "bsonType": "object",
  "required": ['book', 'quantity'], // 新增数据时必填字段
  "permission": { // 表级权限
    ".read": "doc.status == 'OnSell'" // 允许所有人读取状态是OnSell的数据
  },
  "properties": { // 字段列表，注意这里是对象
    "title": {
      "bsonType": "string"
    },
    "author": {
      "bsonType": "string"
    },
    "secret_field": { // 字段名
      "bsonType": "string", // 字段类型
      "permission": { // 字段权限
        ".read": false, // 禁止读取secret_field字段的数据
        ".write": false // 禁止写入（包括更新和新增）secret_field字段的数据
      }
    }
  }
}
```

**请求示例**

```js
const db = uniCloud.database()
const dbCmd = db.command
const $ = dbCmd.aggregate
db.collection('order')
  .where('uid == $env.uid && book_id.status == "OnSell"')
  .field('uid,book_id{title,author}')
  .get()
```

**权限规则变量**

|变量名			|说明																																						|
|:-:			|:-:																																						|
|auth.uid		|用户id																																						|
|auth.role		|用户角色数组，参考[uni-id 角色权限](/uniCloud/uni-id?id=rbac)，注意`admin`为clientDB内置的角色，如果用户角色列表里包含`admin`则认为此用户有完全数据访问权限|
|auth.permission|用户权限数组，参考[uni-id 角色权限](/uniCloud/uni-id?id=rbac)																								|
|doc			|记录内容，用于匹配记录内容/查询条件（需要注意的是，规则内的doc对象并不是直接去校验存在于数据库的数据，而是校验客户端的查询条件）							|
|now			|当前时间戳（单位：毫秒），时间戳可以进行额外运算，如doc.publish\_date > now - 60000表示publish\_date在最近一分钟											|
|action			|当前客户端指定的action																																		|

permission为对数据的操作权限，如果要封装业务权限，可以在uni-id的业务权限表里进行配置。业务权限进一步可组装为角色。然后每个具体的uni-id用户可以被赋予某个角色。

如果在uni-id里定义了业务权限和角色，也可以在permission中通过auth.permission和auth.role来使用，以实现更灵活的配置定义。

**权限规则内可以使用的运算符**

|运算符				|说明					|示例																		|示例解释(集合查询)																										|
|:-:					|:-:					|:-:																		|:-:																																	|
|==						|等于					|auth.uid == 'abc'											|用户id为abc																													|
|!=						|不等于				|auth.uid != 'abc'											|用户id不为abc																												|
|>						|大于					|doc.age>10															|查询条件的 age 属性大于 10																						|
|>=						|大于等于			|doc.age>=10														|查询条件的 age 属性大于等于 10																				|
|<						|小于					|doc.age<10															|查询条件的 age 属性小于 10																						|
|<=						|小于等于			|doc.age<=10														|查询条件的 age 属性小于等于 10																				|
|in						|存在在数组中	|doc.status in ['a','b']								|查询条件的 status 是['a','b']中的一个，数组中所有元素类型需一致			|
|!						|非						|!(doc.status in ['a','b'])							|查询条件的 status 不是['a','b']中的任何一个，数组中所有元素类型需一致|
|&&						|与						|auth.uid == 'abc' && doc.age>10				|用户id 为 abc 并且查询条件的 age 属性大于 10													|
|&#124;&#124;	|或						|auth.uid == 'abc'&#124;&#124;doc.age>10|用户Id为abc或者查询条件的 age 属性大于 10														|

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

## action@action

action的作用是在执行前端发起的数据库操作时，额外触发一段云函数逻辑。它是一个可选模块。

当一个前端操作数据库的方式不能完全满足需求，仍然同时需要在云端再执行一些云函数时，就在前端发起数据库操作时，通过db.action("someactionname")方式要求云端同时执行这个叫someactionname的action。还可以在权限规则内指定某些操作必须使用指定的action，比如`"action in ['action-a','action-b']"`，来达到更灵活的权限控制。

如果使用`<uni-clientdb>组件`，该组件也有action属性，设置action="someactionname"即可。

**新建actions**

![新建actions](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b6846d00-1460-11eb-b997-9918a5dda011.jpg)

每个action在uni-clientDB-actions目录下存放一个以action名称命名的js文件。

在这个js文件的代码里，包括before和after两部分。

- before部分的常用用途：
	* 对前端传入的数据进行二次处理
	* 在此处开启数据库事务，万一操作数据库失败，可以在after里回滚
	
- after部分的常用用途：
	* 对将要返回给前端的数据进行二次处理
	* 也可以在此处处理错误，回滚数据库事务
	* 对数据库进行二次操作，比如前端查询一篇文章详情后，在此处对文章的阅读数+1。因为permission里定义，一般是要禁止前端操作文章的阅读数字段的，此时就应该通过action，在云函数里对阅读数+1

示例：

```js
// 客户端发起请求，给todo表新增一行数据，同时指定action为add-todo
const db = uniCloud.database()
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
```

```js
// 一个action文件示例 uni-clientDB-actions/add-todo.js
module.exports = {
  // 在数据库操作之前执行
  before: async(state,event)=>{
    // state为当前clientDB操作状态其格式见下方说明
    // event为传入云函数的event对象
    
    // before内可以操作state上的newData对象对数据进行修改，比如：
    state.newData.create_time = Date.now()
    // 指定插入或修改的数据内的create_time为Date.now()
    // 执行了此操作之后实际插入的数据会变成 {title: 'todo title', create_time: xxxx}
    // 实际上，这个场景，有更简单的实现方案：在db schema内配置defaultValue或者forceDefaultValue，即可自动处理新增记录使用当前服务器时间
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
    
    // after内可以对result进行额外处理并返回
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
    permission // 通过uni-id获取的用户权限，需要使用1.1.9以上版本的uni-id，如果未获取或者获取失败permission值为[]，注意登录时传入needPermission才可以获取permission，请参考 https://uniapp.dcloud.net.cn/uniCloud/uni-id?id=rbac
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
