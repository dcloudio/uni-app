## 简介

自`HBuilderX 2.9.5`起支持在客户端直接使用`uniCloud.database()`方式获取数据库引用来使用clientDB。

使用客户端访问数据库需要做以下工作

1. 在web控制台编写需要客户端访问的数据表的表结构，参考：[DB-schema](https://uniapp.dcloud.net.cn/uniCloud/schema)
2. 如果使用用户身份做权限验证需要使用uni-id，参考：[uni-id文档](https://uniapp.dcloud.net.cn/uniCloud/uni-id)
3. 如果想在数据库操作之前或之后执行额外的动作（比如获取文章详情之后阅读量+1），可以在HBuilderX内项目下`cloudfunctions/uni-clientDB-actions`目录编写上传，参考：[actions](uniCloud/database?id=actions)

**注意**

- clientDB依赖uni-id提供用户身份和权限校验，如果你不了解uni-id，请参考[uni-id文档](https://uniapp.dcloud.net.cn/uniCloud/uni-id)
- 通常在管理控制台使用clientDB，需要获取不同角色用户拥有的权限（在权限规则内使用auth.permission），请先查阅[uni-id 角色权限](https://uniapp.dcloud.net.cn/uniCloud/uni-id?id=rbac)

## 客户端部分@jssdk

clientDB的客户端部分主要负责提供API，允许前端编写数据库操作指令，以及处理一些客户端不太方便表示的字段，比如用户ID（详情看下面语法扩展部分）

**示例代码**

这段示例代码，在一个前端页面，直接查询了云数据库的`list`表，并且指定了`name`为`hello-uni-app`为`where`的查询条件，then的res即为返回的查询结果。

```js
// 获取db引用
const db = uniCloud.database()
const dbCmd = db.command

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
|SYNTAX_ERROR										|db-permission语法错误									|
|PERMISSION_ERROR								|权限校验未通过													|
|VALIDATION_ERROR								|数据格式未通过													|
|SYSTEM_ERROR										|系统错误																|

### 变量@variable

clientDB目前内置了3个变量可以供客户端使用，客户端并非直接获得这三个变量的值，而是需要传递给clientDB云函数，云函数解析之后给赋予真正的值。

|参数名					|说明					|
|:-:						|:-:					|
|db.env.uid			|用户uid，依赖uni-id			|
|db.env.now			|服务器时间戳	|
|db.env.clientIP|当前客户端IP	|

使用这些变量，将可以避免过去在服务端代码中写代码获取用户uid、时间和客户端ip的麻烦。

### 查询条件扩展@jsquery

客户端支持使用类js语法进行查询条件的编写。具体看以下示例

```js
const db = uniCloud.database()
const dbCmd = db.command

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

**条件内可以使用的变量**

|变量名					|说明																																																																												|
|:-:						|:-:																																																																												|
|auth.uid				|用户id																																																																											|
|auth.role			|用户角色数组，参考[uni-id 角色权限](/uniCloud/uni-id?id=rbac)，注意`admin`为clientDB内置的角色，如果用户角色列表里包含`admin`则认为此用户有完全数据访问权限|
|auth.permission|用户权限数组，参考[uni-id 角色权限](/uniCloud/uni-id?id=rbac)																																															|
|now						|当前时间戳（单位：毫秒），时间戳可以进行额外运算，如publish\_date > now - 60000表示publish\_date在最近一分钟																						|


**条件语句内可以使用的运算符**

|运算符				|说明					|示例															|示例解释(集合查询)																						|
|:-:					|:-:					|:-:															|:-:																													|
|==						|等于					|name == 'abc'										|查询name属性为abc的记录，左侧为数据库字段										|
|!=						|不等于				|name != 'abc'										|查询name属性不为abc的记录，左侧为数据库字段									|
|>						|大于					|age>10														|查询条件的 age 属性大于 10，左侧为数据库字段									|
|>=						|大于等于			|age>=10													|查询条件的 age 属性大于等于 10，左侧为数据库字段							|
|<						|小于					|age<10														|查询条件的 age 属性小于 10，左侧为数据库字段									|
|<=						|小于等于			|age<=10													|查询条件的 age 属性小于等于 10，左侧为数据库字段							|
|in						|存在在数组中	|status in ['a','b']							|查询条件的 status 是['a','b']中的一个，左侧为数据库字段			|
|!						|非						|!(status in ['a','b'])						|查询条件的 status 不是['a','b']中的任何一个									|
|&&						|与						|uid == auth.uid && age > 10			|查询记录uid属性 为 当前用户uid 并且查询条件的 age 属性大于 10|
|&#124;&#124;	|或						|uid == auth.uid&#124;&#124;age>10|查询记录uid属性 为 当前用户uid 或者查询条件的 age 属性大于 10|
|test					|正则校验			|/abc/.test(content)							|查询 content 内包含abc的记录	。可用于替代sql中的like。还可以写更多正则实现更复杂的功能	|

### 联表查询扩展@lookup

clientDB内提供了更简单的联表查询方案，使用方式如下

1. 在schema内配置关联字段`foreignKey`，参考下面order和book表的schema
2. 客户端使用新写法查询即可

如下面示例配置order表的book字段foreignKey为book表的_id。

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
      "foreignKey": "book._id"
    },
    "quantity": {
      "bsonType": "int"
    }
  }
}

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

假设order表内有以下数据

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

book表内有以下数据

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

上述查询会返回如下结果

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

**注意**

- field参数字符串内没有冒号，{}为联表查询标志

### 排序规则扩展@orderby

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

目前schema需要在[uniCloud web控制台](https://unicloud.dcloud.net.cn)数据表的表结构处创建/修改，schema内可以编写数据表的权限以及字段规则校验，web控制台还可以根据schema生成新增修改界面。

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

## action@actions

action的作用是额外触发一段云函数逻辑。它是一个可选模块。当一个前端操作数据库的方式不能完全满足需求，仍然同时需要在云端再执行一些云函数时，就在前端发起数据库操作时，通过db.action("someactionname")方式要求云端同时执行这个叫someactionname的action。还可以在权限规则内指定某些操作必须使用指定的action，比如`"action in ['action-a','action-b']"`，来达到更灵活的权限控制。

每个action在action目录下存放一个以action名称命名的js文件。

在这个js文件中，包括before和after两部分。

- before部分的常用用途：
	* 对前端传的数据进行二次处理
	* 在此处开启数据库事务，万一操作数据库失败，可以在after里回滚
	
- after部分的常用用途：
	* 对将要回传给前端的数据进行二次处理
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
// 一个action文件示例 action/add-todo.js
module.exports = {
  // 在数据库操作之前执行
  before: async(state,event)=>{
    // state为当前clientDB操作状态其格式见下方说明
    // event为传入云函数的event对象
    
    // before内可以操作state上的newData对象对数据进行修改，比如：
    state.newData.create_time = Date.now()
    // 指定插入或修改的数据内的create_time为Date.now()
    // 执行了此操作之后实际插入的数据会变成 {title: 'todo title', create_time: xxxx}
    // 实际上，这个场景，有更简单的实现方案：在db schema、validator内配置defaultValue或者forceDefaultValue，即可自动处理新增记录使用当前服务器时间
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
