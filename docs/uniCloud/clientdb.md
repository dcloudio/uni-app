## clientDB简介

> 自`HBuilderX 2.9.5`起支持在客户端直接使用`uniCloud.database()`方式获取数据库引用，即在前端直接操作数据库，这个功能被称为`clientDB`

> `HBuilderX 2.9.5`以前的用户如使用过`clientDB`，在升级后请将`clientDB`的前端库和云函数删除，新版已经在前端和云端内置了`clientDB`

使用`clientDB`的好处：**不用写服务器代码了！**

1个应用开发的一半的工作量，就此直接省去。

当然使用`clientDB`需要扭转传统后台开发观念，不再编写云函数，直接在前端操作数据库。但是为了数据安全，需要在数据库上配置`DB Schema`。

在`DB Schema`中，配置数据操作的权限和字段值域校验规则，阻止前端不恰当的数据读写。详见：[DB Schema](https://uniapp.dcloud.net.cn/uniCloud/schema)

如果想在数据库操作之前或之后需要在云端执行额外的动作（比如获取文章详情之后阅读量+1），`clientDB`提供了action云函数机制。在HBuilderX项目的`cloudfunctions/uni-clientDB-actions`目录编写上传js，参考：[action](uniCloud/database?id=action)

**注意**

- `clientDB`依赖uni-id（`1.1.10+版本`）提供用户身份和权限校验，如果你不了解uni-id，请参考[uni-id文档](https://uniapp.dcloud.net.cn/uniCloud/uni-id)
- `clientDB`依赖的uni-id需要在uni-id的config.json内添加uni-id相关配置，通过uni-id的init方法传递的参数不会对clientDB生效
- 通常在管理控制台使用`clientDB`，需要获取不同角色用户拥有的权限（在权限规则内使用auth.permission），请先查阅[uni-id 角色权限](https://uniapp.dcloud.net.cn/uniCloud/uni-id?id=rbac)

## clientDB图解
![](https://static-eefb4127-9f58-4963-a29b-42856d4205ee.bspapp.com/clientdb.jpg)

`clientDB`的前端部分包括js API和`<uni-clientDB>`组件两部分。

js API可以执行所有数据库操作。`<uni-clientDB>`组件适用于查询数据库，它是js API的再封装，进一步简化查询的代码量。

目前`<uni-clientDB>`组件没有内置，而是作为一个插件单独下载，它的文档另见：[https://uniapp.dcloud.net.cn/uniCloud/uni-clientdb-component](https://uniapp.dcloud.net.cn/uniCloud/uni-clientdb-component)

以下文章重点介绍`clientDB`的js API，组件的查询语法与js API是一致的。

## clientDB前端API@jssdk

`clientDB`的客户端部分主要负责提供API，允许前端编写数据库操作指令，以及处理一些客户端不太方便表示的字段，比如用户ID（详情看下面语法扩展部分）

`clientDB`支持传统的nosql查询语法，并新增了`jql`查询语法。`jql`是一种更易用的查询语法。

**传统nosql查询语法示例**

这段示例代码，在一个前端页面，直接查询了云数据库的`list`表，并且指定了`name`字段值为`hello-uni-app`的查询条件，then里的res即为返回的查询结果。

```js
// 获取db引用
const db = uniCloud.database() //代码块为cdb
// 使用uni-clientDB
db.collection('list')
  .where({
    name: "hello-uni-app" //传统MongoDB写法，不是jql写法。实际开发中推荐使用jql写法
  }).get()
  .then((res)=>{
    // res 为数据库查询结果
  }).catch((err)=>{
    
  })
```

**使用说明**

前端操作数据库的语法与云函数一致，但有以下限制（使用jql语法时也一样）：

- 上传时会对query进行序列化，除Date类型、RegExp之外的所有不可序列化的参数类型均不支持（例如：undefined）
- 为方便控制权限，禁止前端使用set方法，一般情况下也不需要前端使用set
- 更新数据库时不可使用更新操作符`db.command.inc`等
- 更新数据时键值不可使用`{'a.b.c': 1}`的形式，需要写成`{a:{b:{c:1}}}`形式（后续会对此进行优化）

### 返回值说明@returnvalue

`clientDB`云端默认返回值形式如下，开发者可以在[action](uniCloud/database?id=action)的`after`内用js修改返回结果，传入`after`内的result不带code和message。

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
|DUPLICATE_KEY									|索引冲突																|
|SYSTEM_ERROR										|系统错误																|

### 前端环境变量@variable

`clientDB`目前内置了3个变量可以供客户端使用，客户端并非直接获得这三个变量的值，而是需要传递给云端，云数据库在数据入库时会把变量替换为实际值。

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

#### jql的诞生背景

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

1. 运算符需要转码，`>`需要使用`gt`方法、`==`需要使用`eq`方法

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

  sql的inner join、left join已经够乱了，而nosql的代码无论写法还是可读性，都更“令人发指”。比如这个联表查询：

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

3. 列表分页写法复杂

  需要使用skip，处理offset



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

具体到这个正则 `/abc/.test(content)`，类似于sql中的`content like '%abc%'`，即查询所有字段content包含abc的数据记录。

**注意编写查询条件时，除test外，均为运算符左侧为数据库字段，右侧为常量**

### JQL联表查询@lookup

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

order表内有以下数据，book_id字段为book表的书籍_id，quantity为该订单销售了多少本书：

```js
{
  "book_id": "1",
  "quantity": 111
}
{
  "book_id": "2",
  "quantity": 222
}
{
  "book_id": "3",
  "quantity": 333
}
{
  "book_id": "4",
  "quantity": 444
}
{
  "book_id": "3",
  "quantity": 555
}
```

如果我们要对这2个表联表查询，在订单记录中同时显示书籍名称和作者，那么首先要建立两个表中关联字段`book`的映射关系。

即，在order表的db schema中，配置字段 book_id 的`foreignKey`，指向 book 表的 _id 字段，如下

```json
// order表schema
{
  "bsonType": "object",
  "required": [],
  "permission": {
    "read": true
  },
  "properties": {
    "book_id": {
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
    "read": true
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

schema保存至云端后，即可在前端直接查询。查询表设为order和book这2个表名后，即可自动按照一个合并虚拟表来查询，field、where等设置均按合并虚拟表来设置。

```js
// 客户端联表查询
const db = uniCloud.database()
db.collection('order,book') // 注意collection方法内需要传入所有用到的表名，用逗号分隔，主表需要放在第一位
  .where('book_id.title == "三国演义"') // 查询order表内书名为“三国演义”的订单
  .field('book_id{title,author},quantity') // 这里联表查询book表返回book表内的title、book表内的author、order表内的quantity
  .get()
  .then(res => {
    console.log(res);
  }).catch(err => {
    console.error(err)
  })
  
// 上面的写法是clientDB的jql语法，如果不使用jql的话，写法会变得很长，大致如下
// 注意clientDB内联表查询需要用拼接子查询的方式（let+pipeline）
const db = uniCloud.database()
const dbCmd = db.command
const $ = dbCmd.aggregate
db.collection('order')
  .aggregate()
  .lookup({
    from: 'book',
    let: {
      book_id: '$book_id'
    },
    pipeline: $.pipeline()
    // 此match方法内的条件会和book表对应的权限规则进行校验，{status: 'OnSell'}会参与校验，整个expr方法转化成一个不与任何条件产生交集的特别表达式。这里如果将dbCmd.and换成dbCmd.or会校验不通过
    .match(dbCmd.expr(
        $.eq(['$_id', '$$book_id'])
      ))
    .done()
    as: 'book'
  })
  .match({
    book: {
      title: '三国演义'
    }
  })
  .end()
```


上述查询会返回如下结果，可以看到书籍信息被嵌入到order表的book_id字段下，成为子节点。同时根据where条件设置，只返回书名为三国演义的订单记录。

```js
{
	"code": "",
	"message": "",
	"data": [{
		"_id": "b8df3bd65f8f0d06018fdc250a5688bb",
		"book_id": [{
			"author": "罗贯中",
			"title": "三国演义"
		}],
		"quantity": 555
	}, {
		"_id": "b8df3bd65f8f0d06018fdc2315af05ec",
		"book_id": [{
			"author": "罗贯中",
			"title": "三国演义"
		}],
		"quantity": 333
	}]
}

```

关系型数据库做不到这种设计。`jql`充分利用了json文档型数据库的特点，实现了这个简化的联表查询方案。

不止是2个表，3个、4个表也可以通过这种方式查询。

不止js，`<uni-clientDB>`组件也支持所有`jql`功能，包括联表查询。

**注意**

- field参数字符串内没有冒号，{}为联表查询标志
- 上述示例中如果order表的`book_id`字段是数组形式存放多个book_id，也跟上述写法一致，clientDB会自动根据字段类型进行联表查询

### 查询列表分页

`jql`提供了更简单的分页方法，包括两种模式：

1. 滚动到底加载下一页
2. 点击页码按钮切换不同页

推荐通过`<uni-clientDB>`组件渲染分页列表，详见：[https://uniapp.dcloud.net.cn/uniCloud/uni-clientdb-component?id=page](https://uniapp.dcloud.net.cn/uniCloud/uni-clientdb-component?id=page)


### 指定返回字段@field

查询时可以使用field方法指定返回字段，在`<uni-clientDB>`组件中也支持field属性。不使用field方法时会返回所有字段

### 别名@alias

自`2020-11-20`起clientDB jql写法支持字段别名，主要用于在前端需要的字段名和数据库字段名称不一致的情况下对字段进行重命名。

用法形如：`author as book_author`，意思是将数据库的author字段重命名为book_author。

仍以上面的order表和book表为例

```js
// 客户端联表查询
const db = uniCloud.database()
db.collection('order,book')
  .where('book_id.title == "三国演义"')
  .field('book_id{title as book_title,author as book_author},quantity as order_quantity') // 这里联表查询book表返回book表内的title、book表内的author、order表内的quantity，并将title重命名为book_title，author重命名为book_author，quantity重命名为order_quantity
  .orderBy('order_quantity desc') // 按照order_quantity降序排列
  .get()
  .then(res => {
    console.log(res);
  }).catch(err => {
    console.error(err)
  })
```

上述请求返回的res如下

```js
{
	"code": "",
	"message": "",
	"data": [{
		"_id": "b8df3bd65f8f0d06018fdc250a5688bb",
		"book_id": [{
			"book_author": "罗贯中",
			"book_title": "三国演义"
		}],
		"order_quantity": 555
	}, {
		"_id": "b8df3bd65f8f0d06018fdc2315af05ec",
		"book_id": [{
			"book_author": "罗贯中",
			"book_title": "三国演义"
		}],
		"order_quantity": 333
	}]
}
```

**注意**

- 上面的查询指令中，上一阶段处理结果输出到下一阶段，上面的例子中表现为where中使用的是原名，orderBy中使用的是别名
- 目前不支持对联表查询的关联字段使用别名，即上述示例中的book_id不可设置别名

### 排序orderBy@orderby

传统的MongoDB的排序参数是json格式，jql支持类sql的字符串格式，书写更为简单。

sort方法和orderBy方法内可以传入一个字符串来指定排序规则。

orderBy允许进行多个字段排序，以逗号分隔。每个字段可以指定 asc(升序)、desc(降序)。

写在前面的排序字段优先级高于后面。

示例如下：

```js
orderBy('quantity asc, create_date desc') //按照quantity字段升序排序，quantity相同时按照create_date降序排序
// asc可以省略，上述代码和以下写法效果一致
orderBy('quantity, create_date desc')

// 注意不要写错成全角逗号
```

以上面的order表数据为例：

```js
const db = uniCloud.database()
  db.collection('order')
    .orderBy('quantity asc, create_date desc') // 按照quantity字段升序排序，quantity相同时按照create_date降序排序
    .get()
    .then(res => {
      console.log(res);
    }).catch(err => {
      console.error(err)
    })
    
// 上述写法等价于
const db = uniCloud.database()
  db.collection('order')
    .orderBy('quantity','asc')
    .orderBy('create_date','desc')
    .get()
    .then(res => {
      console.log(res);
    }).catch(err => {
      console.error(err)
    })
```

### 查询结果返回总数getcount@getcount

使用`clientDB`时可以在get方法内传入`getCount:true`来同时返回总数

```js
// 这以上面的order表数据为例
const db = uniCloud.database()
  db.collection('order')
    .get({
      getCount:true
    })
    .then(res => {
      console.log(res);
    }).catch(err => {
      console.error(err)
    })
    
// 如果不使用getCount，需要再调用一次count方法来返回总数
const db = uniCloud.database()
  db.collection('order')
    .get()
    .then(res => {
      console.log(res);
    }).catch(err => {
      console.error(err)
    })
  db.collection('order')
    .count()
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
	"count": 5
}
```


### 查询结果时返回单条记录getone@getone

使用`clientDB`时可以在get方法内传入`getOne:true`来返回一条数据

```js
// 这以上面的book表数据为例
const db = uniCloud.database()
  db.collection('book')
    .where({
      title: '西游记'
    })
    .get({
      getOne:true
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
	"data": {
    "_id": "1",
    "title": "西游记",
    "author": "吴承恩"
  }
}
```

### 新增数据记录add

获取到db的表对象后，通过`add`方法新增数据记录。

方法：collection.add(data)

**参数说明**

| 参数	| 类型					| 必填	|
| ----	| ------				| ----	|
| data	| object &#124; array	| 是	|

data支持一条记录，也支持多条记录一并新增到集合中。

data中不需要包括`_id`字段，数据库会自动维护该字段。

**返回值**

单条插入时

| 参数	| 类型	|  说明										|
| ----	| ------|  ----------------------------------------	|
|id		| String|插入记录的`_id`								|

批量插入时

| 参数		| 类型	|  说明										|
| ----		| ------|  ----------------------------------------	|
| inserted	| Number| 插入成功条数								|
|ids		| Array	|批量插入所有记录的`_id`						|

**示例：**

比如在user表里新增一个叫王五的记录：

```js
const db = uniCloud.database();
db.collection('user').add({name:"王五"})
```

也可以批量插入数据并获取返回值

```js
const db = uniCloud.database();
const collection = db.collection('user');
let res = await collection.add([{
  name: '张三'
},{
  name: '李四'
},{
  name: '王五'
}])
```

如果上述代码执行成功，则res的值将包括inserted:3，代表插入3条数据，同时在ids里返回3条记录的`_id`。

如果新增记录失败，会抛出异常，以下代码示例为捕获异常：

```js
// 插入1条数据，同时判断成功失败状态
const db = uniCloud.database();
db.collection("user")
	.add({name: '张三'})
	.then((res) => {
		uni.showToast({
			title: '新增成功'
		})
	})
	.catch((err) => {
		uni.showModal({
			content: err.message || '新增失败',
			showCancel: false
		})
	})
	.finally(() => {
		
	})
```

**Tips**
- 如果是非admin账户新增数据，需要在数据库中待操作表的`db schema`中要配置permission权限，赋予create为true。
- 云服务商选择阿里云时，若集合表不存在，调用add方法会自动创建集合表，并且不会报错。


### 删除数据记录remove
获取到db的表对象，然后指定要删除的记录，通过remove方法删除。

注意：如果是非admin账户删除数据，需要在数据库中待操作表的`db schema`中要配置permission权限，赋予delete为true。

指定要删除的记录有2种方式：

#### 方式1 通过指定文档ID删除

collection.doc(_id).remove()

删除单条记录

```js
const db = uniCloud.database();
db.collection("table1").doc("5f79fdb337d16d0001899566").remove()
```

删除该表所有数据
```js
const db = uniCloud.database();
let collection = db.collection("table1")
let res = await collection.get()
res.data.map(async(document) => {
  return await collection.doc(document.id).remove();
});
```

#### 方式2 条件查找文档后删除

collection.where().remove()

```js
// 删除字段a的值大于2的文档
try {
	await db.collection("table1").where("a>2").remove()
} catch (e) {
	uni.showModal({
		title: '提示',
		content: e.message
	})
}
```

#### 回调的res响应参数

| 字段		| 类型		| 必填	| 说明						|
| ---------	| -------	| ----	| ------------------------	|
| deleted	| Number	| 否	| 删除的记录数量			|

示例：判断删除成功或失败，打印删除的记录数量

```js
const db = uniCloud.database();
db.collection("table1")
  .where({
    _id: "5f79fdb337d16d0001899566"
  })
  .remove()
	.then((res) => {
		uni.showToast({
			title: '删除成功'
		})
		console.log("删除条数: ",res.deleted);
	}).catch((err) => {
		uni.showModal({
			content: err.message || '删除失败',
			showCancel: false
		})
	}).finally(() => {
		
	})
```

### 更新数据记录update

获取到db的表对象，然后指定要更新的记录，通过update方法更新。

注意：如果是非admin账户修改数据，需要在数据库中待操作表的`db schema`中要配置permission权限，赋予update为true。

collection.doc().update(Object data)

**参数说明**

| 参数 | 类型   | 必填 | 说明                                     |
| ---- | ------ | ---- | ---------------------------------------- |
| data | object | 是   | 更新字段的Object，{'name': 'Ben'} _id 非必填|

**回调的res响应参数**

| 参数	| 类型	|  说明																			|
| ----	| ------|  ----------------------------------------	|
|updated| Number| 更新成功条数，数据更新前后没变化时会返回0。用法与删除数据的响应参数示例相同	|


```js
const db = uniCloud.database();
let collection = db.collection("table1")
let res = await collection.where({_id:'doc-id'})
  .update({
    name: "Hey",
    count: {
      fav: 1
    }
  });
```

```json
// 更新前的数据
{
  "_id": "doc-id",
  "name": "Hello",
  "count": {
    "fav": 0,
    "follow": 0
  }
}

// 更新后的数据
{
  "_id": "doc-id",
  "name": "Hey",
  "count": {
    "fav": 1,
    "follow": 0
  }
}
```

更新数组时，以数组下标作为key即可，比如以下示例将数组arr内下标为1的值修改为 uniCloud

```js
const db = uniCloud.database();
let collection = db.collection("table1")
let res = await collection.where({_id:'doc-id'})
  .update({
    arr: {
      1: "uniCloud"
    }
  })
```

```json
// 更新前
{
  "_id": "doc-id",
  "arr": ["hello", "world"]
}
// 更新后
{
  "_id": "doc-id",
  "arr": ["hello", "uniCloud"]
}
```

#### 批量更新文档

```js
const db = uniCloud.database();
let collection = db.collection("table1")
let res = await collection.where("name=='hey'").update({
  age: 18,
})
```

#### 更新数组内指定下标的元素

```js
const db = uniCloud.database();
const res = await db.collection('table1').where({_id:'1'})
  .update({
    // 更新students[1]
    ['students.' + 1]: {
      name: 'wang'
    }
  })
```

```json
// 更新前
{
  "_id": "1",
  "students": [
    {
      "name": "zhang"
    },
    {
      "name": "li"
    }
  ]
}

// 更新后
{
  "_id": "1",
  "students": [
    {
      "name": "zhang"
    },
    {
      "name": "wang"
    }
  ]
}
```

#### 更新数组内匹配条件的元素

**注意：只可确定数组内只会被匹配到一个的时候使用**

```js
const db = uniCloud.database();
const res = await db.collection('table1').where({
	'students.id': '001'
}).update({
  // 将students内id为001的name改为li
	'students.$.name': 'li'
})
```


```js
// 更新前
{
  "_id": "1",
  "students": [
    {
      "id": "001",
      "name": "zhang"
    },
    {
      "id": "002",
      "name": "wang"
    }
  ]
}

// 更新后
{
  "_id": "1",
  "students": [
    {
      "id": "001",
      "name": "li"
    },
    {
      "id": "002",
      "name": "wang"
    }
  ]
}
```

注意：
- 为方便控制权限，禁止前端使用set方法，一般情况下也不需要前端使用set
- 更新数据库时不可使用更新操作符`db.command.inc`等
- 更新数据时键值不可使用`{'a.b.c': 1}`的形式，需要写成`{a:{b:{c:1}}}`形式（后续会对此进行优化）

### 其他数据库操作

clientDB支持使用聚合操作读取数据，关于聚合操作请参考[聚合操作](uniCloud/cf-database.md?id=aggregate)

例：取status等于1的随机20条数据

```js
const db = uniCloud.database()
const res = await db.collection('test').aggregate()
.match({
  status: 1
})
.sample({
  size: 20
})
.end()
```

**注意**

- 目前`<uni-clientdb>`组件暂不支持使用聚合操作读取数据

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

<!-- ### 处理错误@error

clientDB出现错误时触发，`HBuilderX 2.9.12+` 支持

**用法**

```js
const db = uniCloud.database()

function onError({
  code, // 错误码详见https://uniapp.dcloud.net.cn/uniCloud/clientdb?id=returnvalue
  message
}) {
  uni.showModal({
    content: message,
    showCancel: false
  })
}
// 绑定错误处理事件
db.auth.on('error', onError)
// 解绑错误处理事件
db.auth.off('error', onError)
``` -->

## DBSchema@schema

`DB Schema`是基于 JSON 格式定义的数据结构的规范。

它有很多重要的作用：

- 描述现有的数据格式。可以一目了然的阅读每个表、每个字段的用途。
- 设定数据操作权限(permission)。什么样的角色可以读/写哪些数据，都在这里配置。
- 设定字段值域能接受的格式(validator)，比如不能为空、需符合指定的正则格式。
- 设置数据的默认值(defaultValue/forceDefaultValue)，比如服务器当前时间、当前用户id等。
- 设定多个表的字段间映射关系(foreignKey)，将多个表按一个虚拟表直接查询，大幅简化联表查询。
- 根据schema自动生成表单维护界面，比如新建页面和编辑页面，自动处理校验规则。

这些工具大幅减少了开发者的开发工作量和重复劳动。

**`DB Schema`是`clientDB`紧密相关的配套，掌握clientDB离不开详读[DB Schema文档](uniCloud/schema)。**

**下面示例中使用了注释，实际使用时schema是一个标准的json文件不可使用注释。**完整属性参考[schema字段](https://uniapp.dcloud.net.cn/uniCloud/schema?id=segment)

```js
{
  "bsonType": "object", // 表级的类型，固定为object
  "required": ['book', 'quantity'], // 新增数据时必填字段
  "permission": { // 表级权限
    "read": true, // 读
    "create": false, // 新增
    "update": false, // 更新
    "delete": false, // 删除
  },
  "properties": { // 字段列表，注意这里是对象
    "book": { // 字段名book
      "bsonType": "string", // 字段类型
      "permission": { // 字段权限
        "read": true, // 字段读权限
        "write": false, // 字段写权限
      },
      "foreignKey": "book._id" // 其他表的关联字段
    },
    "quantity": {
      "bsonType": "int"
    }
  }
}
```

### permission@permission

`DB Schema`中的数据权限配置功能非常强大，请详读[DB Schema的数据权限控制](uniCloud/schema?id=permission)

在配置好`DB Schema`的权限后，clientDB的查询写法，尤其是非`JQL`的聚合查询写法有些限制，具体如下：
- 不使用聚合时collection方法之后需紧跟一个where方法，这个where方法内传入的条件必须满足权限控制规则
- 使用聚合时aggregate方法之后需紧跟一个match方法，这个match方法内的条件需满足权限控制规则
- 使用lookup时只可以使用拼接子查询的写法（let+pipeline模式），做这个限制主要是因为需要确保访问需要lookup的表时也会传入查询条件，即pipeline参数里面`db.command.pipeline()`之后的match方法也需要像上一条里面的match一样限制
- 上面用于校验权限的match和where后的project和field是用来确定本次查询需要访问什么字段的（如果没有将会认为是在访问所有字段），访问的字段列表会用来确认使用那些字段权限校验。这个位置的project和field只能使用白名单模式
- 上面用于校验权限的match和where内如果有使用`db.command.expr`，那么在进行权限校验时expr方法内部的条件会被忽略，整个expr方法转化成一个不与任何条件产生交集的特别表达式，具体表现请看下面示例

**schema内permission配置示例**

```js
// order表schema
{
  "bsonType": "object", // 表级的类型，固定为object
  "required": ['book', 'quantity'], // 新增数据时必填字段
  "permission": { // 表级权限
    "read": "doc.uid == auth.uid", // 每个用户只能读取用户自己的数据。前提是要操作的数据doc，里面有一个字段存放了uid，即uni-id的用户id。（不配置时等同于false）
    "create": false, // 禁止新增数据记录（不配置时等同于false）
    "update": false, // 禁止更新数据（不配置时等同于false）
    "delete": false, // 禁止删除数据（不配置时等同于false）
  },
  "properties": { // 字段列表，注意这里是对象
    "secret_field": { // 字段名
      "bsonType": "string", // 字段类型
      "permission": { // 字段权限
        "read": false, // 禁止读取secret_field字段的数据
        "write": false // 禁止写入（包括更新和新增）secret_field字段的数据，父级节点存在false时这里可以不配
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
    "read": "doc.status == 'OnSell'" // 允许所有人读取状态是OnSell的数据
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
        "read": false, // 禁止读取secret_field字段的数据
        "write": false // 禁止写入（包括更新和新增）secret_field字段的数据
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

在进行数据库操作之前，clientDB会使用permission内配置的规则对客户端操作进行一次预校验，如果预校验不通过还会通过数据库查询再进行一次校验

例：

```js
// 数据库内news表有以下数据
{
  _id: "1",
  user_id: "uid_1",
  title: "abc"
}
```

```js
// news表对应的schema内做如下配置
{
  "bsonType": "object",
  "permission": { // 表级权限
    "read": true,
    "update": "doc.user_id == auth.uid" // 只允许修改自己的数据
  },
  "properties": {
    "user_id": {
      "bsonType": "string"
    },
    "title": {
      "bsonType": "string"
    }
  }
}
```

```js
// 用户ID为uid_1的用户在客户端使用如下操作
db.collection('news').doc('1').update({
  title: 'def'
})
```

此时客户端条件里面只有`doc._id == 1`，schema内又限制的`doc.user_id == auth.uid`，所以第一次预校验无法通过，会进行一次查库校验判断是否有权限进行操作。发现auth.uid确实和doc.user_id一致，上面的数据库操作允许执行。

## action@action

action的作用是在执行前端发起的数据库操作时，额外触发一段云函数逻辑。它是一个可选模块。action是运行于云函数内的，可以使用云函数内的所有接口。

当一个前端操作数据库的方式不能完全满足需求，仍然同时需要在云端再执行一些云函数时，就在前端发起数据库操作时，通过`db.action("someactionname")`方式要求云端同时执行这个叫someactionname的action。还可以在权限规则内指定某些操作必须使用指定的action，比如`"action in ['action-a','action-b']"`，来达到更灵活的权限控制。

**注意action方法是db对象的方法，只能跟在db后面，不能跟在collection()后面**
- 正确：`db.action("someactionname").collection('table1')`
- 错误：`db.collection('table1').action("someactionname")`

如果使用`<uni-clientdb>组件`，该组件也有action属性，设置action="someactionname"即可。
```html
<uni-clientdb ref="udb" collection="table1" action="someactionname" v-slot:default="{data,pagination,loading,error}">
```

action支持一次使用多个，比如使用`db.action("action-a,action-b")`，其执行流程为`action-a.before->action-b.before->执行数据库操作->action-b.after->action-a.after`。在任一before环节抛出错误直接进入after流程，在after流程内抛出的错误会被传到下一个after流程。

action是一种特殊的云函数，它不占用服务空间的云函数数量。

目前action还不支持本地运行。后续会支持。

**新建action**

![新建action](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b6846d00-1460-11eb-b997-9918a5dda011.jpg)

每个action在uni-clientDB-actions目录下存放一个以action名称命名的js文件。

在这个js文件的代码里，包括before和after两部分，分别代表clientDB具体操作数据库前和后。

- before在clientDB执行前触发，before里的代码执行完毕后再开始操作数据库。before的常用用途：
	* 对前端传入的数据进行二次处理
	* 在此处开启数据库事务，万一操作数据库失败，可以在after里回滚
	* 如果权限或字段值域校验不想配在schema和validateFunction里，也可以在这里做校验
	
- after在clientDB执行后触发，clientDB操作数据库后触发before里的代码。after的常用用途：
	* 对将要返回给前端的数据进行二次处理
	* 也可以在此处处理错误，回滚数据库事务
	* 对数据库进行二次操作，比如前端查询一篇文章详情后，在此处对文章的阅读数+1。因为permission里定义，一般是要禁止前端操作文章的阅读数字段的，此时就应该通过action，在云函数里对阅读数+1

示例：

```js
// 客户端发起请求，给todo表新增一行数据，同时指定action为add-todo
const db = uniCloud.database()
db.action('add-todo') //注意action方法是db的方法，只能跟在db后面，不能跟在collection()后面
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
