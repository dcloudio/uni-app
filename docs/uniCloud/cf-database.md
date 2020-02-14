## 云数据库简介

`uniCloud`提供了一个 JSON 格式的文档型数据库，数据库中的每条记录都是一个 JSON 格式的对象。一个数据库可以有多个集合（相当于关系型数据中的表），集合可看做一个 JSON 数组，数组中的每个对象就是一条记录，记录的格式是 JSON 对象。

关系型数据库和 JSON 文档型数据库的概念对应关系如下表：

|关系型					|JSON 文档型			|
|:-							|:-								|
|数据库 database|数据库 database	|
|表 table				|集合 collection	|
|行 row					|记录 record / doc|
|列 column			|字段 field				|

`uniCloud`云函数中可访问云数据库。

鉴于安全问题，暂不支持客户端直接访问数据库。

**阿里云使用的mongoDB数据库版本为3.4，腾讯云使用的版本是4.0。此差异可能会导致本文档内的部分功能不能在阿里云使用，我们会进行标注，如果发现有遗漏欢迎向我们反馈**

## 获取数据库的引用

```js
const db = uniCloud.database();
```

**DBOptions参数说明**

|字段		|类型		|必填	|描述											|平台差异说明	|
|:-:		|:-:		|:-:	|:-:											|:-:					|
|spaceId|String	|否		|同一账号下的，服务空间ID	|仅腾讯云支持	|

## 新增集合

如果集合已存在，则报错。

**平台差异说明**

|阿里云	|腾讯云	|
|----		|----		|
|×			|√			|

```
db.createCollection(collectionName)
```

## 获取集合的引用

```js
// 获取 `user` 集合的引用
const collection = db.collection('user');
```

### 集合 Collection

通过 `db.collection(name)` 可以获取指定集合的引用，在集合上可以进行以下操作

| 类型     | 接口    | 说明                                                                               |
| -------- | ------- | ---------------------------------------------------------------------------------- |
| 写       | add     | 新增记录（触发请求）                                                               |
| 计数     | count   | 获取符合条件的记录条数                                                             |
| 读       | get     | 获取集合中的记录，如果有使用 where 语句定义查询条件，则会返回匹配结果集 (触发请求) |
| 引用     | doc     | 获取对该集合中指定 id 的记录的引用                                                 |
| 查询条件 | where   | 通过指定条件筛选出匹配的记录，可搭配查询指令（eq, gt, in, ...）使用                |
|          | skip    | 跳过指定数量的文档，常用于分页，传入 offset                                        |
|          | orderBy | 排序方式                                                                           |
|          | limit   | 返回的结果集(文档数量)的限制，有默认值和上限值                                     |
|          | field   | 指定需要返回的字段                                                                 |


查询及更新指令用于在 `where` 中指定字段需满足的条件，指令可通过 `db.command` 对象取得。


### 记录 Record / Document

通过 `db.collection(collectionName).doc(docId)` 可以获取指定集合上指定 id 的记录的引用，在记录上可以进行以下操作

| 接口| 说明	|												|
| ----| ------|----										|
| 写	| set		| 覆写记录							|
|			| update| 局部更新记录(触发请求)|
|			| remove| 删除记录(触发请求)		|
| 读	| get		| 获取记录(触发请求)		|


### 查询筛选指令 Query Command

以下指令挂载在 `db.command` 下

| 类型     | 接口 | 说明                               |
| -------- | ---- | ---------------------------------- |
| 比较运算 | eq   | 字段 ==                            |
|          | neq  | 字段 !=                            |
|          | gt   | 字段 >                             |
|          | gte  | 字段 >=                            |
|          | lt   | 字段 <                             |
|          | lte  | 字段 <=                            |
|          | in   | 字段值在数组里                     |
|          | nin  | 字段值不在数组里                   |
| 逻辑运算 | and  | 表示需同时满足指定的所有条件       |
|          | or   | 表示需同时满足指定条件中的至少一个 |


### 字段更新指令 Update Command

以下指令挂载在 `db.command` 下

| 类型 | 接口    | 说明                             |
| ---- | ------- | -------------------------------- |
| 字段 | set     | 设置字段值                       |
|      | remove  | 删除字段                         |
|      | inc     | 加一个数值，原子自增             |
|      | mul     | 乘一个数值，原子自乘             |
|      | push    | 数组类型字段追加尾元素，支持数组 |
|      | pop     | 数组类型字段删除尾元素，支持数组 |
|      | shift   | 数组类型字段删除头元素，支持数组 |
|      | unshift | 数组类型字段追加头元素，支持数组 |


## 支持的数据类型

数据库提供以下几种数据类型：
* String：字符串
* Number：数字
* Object：对象
* Array：数组
* Bool：布尔值
* GeoPoint：地理位置点
* GeoLineStringL: 地理路径
* GeoPolygon: 地理多边形
* GeoMultiPoint: 多个地理位置点
* GeoMultiLineString: 多个地理路径
* GeoMultiPolygon: 多个地理多边形
* Date：时间
* Null

**注意**

- 阿里云数据库在存入emoji表情时会导致uniCloud控制台无法获取数据列表，目前阿里正在处理此问题，开发者可以先自行过滤一下

以下对几个特殊的数据类型做个补充说明
### 时间 Date

  Date 类型用于表示时间，精确到毫秒，可以用 JavaScript 内置 Date 对象创建。需要特别注意的是，用此方法创建的时间是客户端时间，不是服务端时间。如果需要使用服务端时间，应该用 API 中提供的 serverDate 对象来创建一个服务端当前时间的标记，当使用了 serverDate 对象的请求抵达服务端处理时，该字段会被转换成服务端当前的时间，更棒的是，我们在构造 serverDate 对象时还可通过传入一个有 offset 字段的对象来标记一个与当前服务端时间偏移 offset 毫秒的时间，这样我们就可以达到比如如下效果：指定一个字段为服务端时间往后一个小时。

  那么当我们需要使用客户端时间时，存放 Date 对象和存放毫秒数是否是一样的效果呢？不是的，我们的数据库有针对日期类型的优化，建议大家使用时都用 Date 或 serverDate 构造时间对象。

  ```js
  //服务端当前时间
  new db.serverDate()
  ```

  ```js
  //服务端当前时间加1S
  new db.serverDate({
    offset: 1000
  })
  ```
  
**Tips**

- 使用阿里云作为服务提供商时，如需存入日期类型，需要`2020-02-10T04:59:05.579Z`形式，即可以在云函数中使用`new Date().toISOString()`得到。

### 地理位置

**阿里云暂不支持地理位置类型**

参考：[GEO地理位置](#GEO地理位置)

### Null

  Null 相当于一个占位符，表示一个字段存在但是值为空。


## 新增文档

方法1： collection.add(data)

示例：

| 参数 | 类型   | 必填 | 说明                                     |
| ---- | ------ | ---- | ---------------------------------------- |
| data | object | 是   | {_id: '10001', 'name': 'Ben'} _id 非必填 |

```js
collection.add({
  name: 'Ben'
}).then((res) => {

});
```

**Tips**

- 云服务商为阿里云时，若集合不存在，调用add方法会自动创建集合

方法2： collection.doc().set(data)

也可通过 `set` 方法新增一个文档，需先取得文档引用再调用 `set` 方法。
如果文档不存在，`set` 方法会创建一个新文档。

```js
collection.doc().set({
  name: "Hey"
});
```


## 查询文档

支持 `where()`、`limit()`、`skip()`、`orderBy()`、`get()`、`update()`、`field()`、`count()` 等操作。

只有当调用`get()` `update()`时才会真正发送请求。
注：默认取前100条数据，最大取前100条数据。

### 添加查询条件

collection.where()
参数

设置过滤条件
where 可接收对象作为参数，表示筛选出拥有和传入对象相同的 key-value 的文档。比如筛选出所有类型为计算机的、内存为 8g 的商品：

```js
db.collection('goods').where({
  category: 'computer',
  type: {
    memory: 8,
  }
})
```

如果要表达更复杂的查询，可使用高级查询指令，比如筛选出所有内存大于 8g 的计算机商品：
```js
const dbCmd = db.command // 取指令
db.collection('goods').where({
  category: 'computer',
  type: {
    memory: dbCmd.gt(8), // 表示大于 8
  }
})
```

`where` 可以使用正则表达式来查询文档，比如一下示例查询所有`name`字段以ABC开头的用户
```js
db.collection('user').where({
  name: new RegExp('^ABC')
})
```

### 获取查询数量

collection.count()

参数
```js
db.collection('goods').where({
  category: 'computer',
  type: {
    memory: 8,
  }
}).count().then(function(res) {

})
```

响应参数

| 字段      | 类型    | 必填 | 说明                     |
| --------- | ------- | ---- | ------------------------ |
| code      | string  | 否   | 状态码，操作成功则不返回 |
| message   | string  | 否   | 错误描述                 |
| total     | Integer | 否   | 计数结果                 |
| requestId | string  | 否   | 请求序列号，用于错误排查 |



### 设置记录数量

collection.limit()

参数说明

| 参数  | 类型    | 必填 | 说明           |
| ----- | ------- | ---- | -------------- |
| value | Integer | 是   | 限制展示的数值 |

使用示例

```js
collection.limit(1).get().then(function(res) {

});
```

### 设置起始位置

collection.skip()

参数说明

| 参数  | 类型    | 必填 | 说明           |
| ----- | ------- | ---- | -------------- |
| value | Integer | 是   | 跳过展示的数据 |

使用示例

```js
collection.skip(4).get().then(function(res) {

});
```

### 对结果排序

collection.orderBy()

参数说明

| 参数      | 类型   | 必填 | 说明                                |
| --------- | ------ | ---- | ----------------------------------- |
| field     | string | 是   | 排序的字段                          |
| orderType | string | 是   | 排序的顺序，升序(asc) 或 降序(desc) |

使用示例

```js
collection.orderBy("name", "asc").get().then(function(res) {

});
```

### 指定返回字段

collection.field()

参数说明

| 参数 | 类型   | 必填 | 说明                                    |
| ---- | ------ | ---- | --------------------------------------- |
| -    | object | 是   | 要过滤的字段，不返回传false，返回传true |

使用示例

```js
collection.field({ 'age': true })
```
备注：只能指定要返回的字段或者不要返回的字段。即{'a': true, 'b': false}是一种错误的参数格式

### 查询指令
#### eq

表示字段等于某个值。`eq` 指令接受一个字面量 (literal)，可以是 `number`, `boolean`, `string`, `object`, `array`。

比如筛选出所有自己发表的文章，除了用传对象的方式：

```js
const myOpenID = 'xxx'
db.collection('articles').where({
  _openid: myOpenID
})
```

还可以用指令：

```js
const dbCmd = db.command
const myOpenID = 'xxx'
db.collection('articles').where({
  _openid: dbCmd.eq(openid)
})
```

注意 `eq` 指令比对象的方式有更大的灵活性，可以用于表示字段等于某个对象的情况，比如：

```js
// 这种写法表示匹配 stat.publishYear == 2018 且 stat.language == 'zh-CN'
db.collection('articles').where({
  stat: {
    publishYear: 2018,
    language: 'zh-CN'
  }
})
// 这种写法表示 stat 对象等于 { publishYear: 2018, language: 'zh-CN' }
const dbCmd = db.command
db.collection('articles').where({
  stat: dbCmd.eq({
    publishYear: 2018,
    language: 'zh-CN'
  })
})
```

#### neq

字段不等于。`neq` 指令接受一个字面量 (literal)，可以是 `number`, `boolean`, `string`, `object`, `array`。

如筛选出品牌不为 X 的计算机：

```js
const dbCmd = db.command
db.collection('goods').where({
  category: 'computer',
  type: {
    brand: dbCmd.neq('X')
  },
})
```

#### gt

字段大于指定值。

如筛选出价格大于 2000 的计算机：

```js
const dbCmd = db.command
db.collection('goods').where({
  category: 'computer',
  price: dbCmd.gt(2000)
})
```

#### gte

字段大于或等于指定值。

#### lt

字段小于指定值。

#### lte

字段小于或等于指定值。

#### in

字段值在给定的数组中。

筛选出内存为 8g 或 16g 的计算机商品：

```js
const dbCmd = db.command
db.collection('goods').where({
  category: 'computer',
  type: {
    memory: dbCmd.in([8, 16])
  }
})
```

#### nin

字段值不在给定的数组中。

筛选出内存不是 8g 或 16g 的计算机商品：

```js
const dbCmd = db.command
db.collection('goods').where({
  category: 'computer',
  type: {
    memory: dbCmd.nin([8, 16])
  }
})
```

#### and

表示需同时满足指定的两个或以上的条件。

如筛选出内存大于 4g 小于 32g 的计算机商品：

流式写法：
```js
const dbCmd = db.command
db.collection('goods').where({
  category: 'computer',
  type: {
    memory: dbCmd.gt(4).and(dbCmd.lt(32))
  }
})
```

前置写法：
```js
const dbCmd = db.command
db.collection('goods').where({
  category: 'computer',
  type: {
    memory: dbCmd.and(dbCmd.gt(4), dbCmd.lt(32))
  }
})
```

#### or

表示需满足所有指定条件中的至少一个。如筛选出价格小于 4000 或在 6000-8000 之间的计算机：

流式写法：
```js
const dbCmd = db.command
db.collection('goods').where({
  category: 'computer',
  type: {
    price:dbCmd.lt(4000).or(dbCmd.gt(6000).and(dbCmd.lt(8000)))
  }
})
```

前置写法：
```js
const dbCmd = db.command
db.collection('goods').where({
  category: 'computer',
  type: {
    price: dbCmd.or(dbCmd.lt(4000), dbCmd.and(dbCmd.gt(6000), dbCmd.lt(8000)))
  }
})
```

如果要跨字段 “或” 操作：(如筛选出内存 8g 或 cpu 3.2 ghz 的计算机)

```js
const dbCmd = db.command
db.collection('goods').where(dbCmd.or(
  {
    type: {
      memory: dbCmd.gt(8)
    }
  },
  {
    type: {
      cpu: 3.2
    }
  }
))
```

### 正则表达式查询

#### db.RegExp

根据正则表达式进行筛选

例如下面可以筛选出 `version` 字段开头是 "数字+s" 的记录，并且忽略大小写：
```js
// 可以直接使用正则表达式
db.collection('articles').where({
  version: /^\ds/i
})

// 或者
db.collection('articles').where({
  version: new db.RegExp({
    regex: '^\\ds'   // 正则表达式为 /^\ds/，转义后变成 '^\\ds'
    options: 'i'    // i表示忽略大小写
  }) 
})
```

## 删除文档

**方式1 通过指定文档ID删除**

collection.doc(_id).remove()

```js
// 清理全部数据
collection.get()
  .then((res) => {
    const promiseList = res.data.map(document => {
      return collection.doc(document.id).remove();
    });
    Promise.all(promiseList);
  })
  .catch((e) => {

  });
```

**方式2 条件查找文档然后直接批量删除**

collection.where().remove()

```js
// 删除字段a的值大于2的文档
const dbCmd = db.command
collection.where({
  a: dbCmd.gt(2)
}).remove().then(function(res) {
  
})
```

## 更新文档

### 更新指定文档

collection.doc().update()

```js
collection.doc('doc-id').update({
  name: "Hey",
  count: {
    fav: 1
  }
});
```

```
// 更新前
{
  _id: 'xxx',
  name: "Hello",
  count: {
    fav: 0,
    follow: 0
  }
}

// 更新后
{
  _id: 'xxx',
  name: "Hey",
  count: {
    fav: 1,
    follow: 0
  }
}
```

### 更新文档，如果不存在则创建

collection.doc().set()

**注意：**

- 此方法会覆写已有字段，需注意与`update`表现不同，比如以下示例执行`set`之后`follow`字段会被删除

```js
collection.doc('doc-id').set({
  name: "Hey",
  count: {
    fav: 1
  }
}).then(function(res) {
  
});
```

```
// 更新前
{
  _id: 'xxx',
  name: "Hello",
  count: {
    fav: 0,
    follow: 0
  }
}

// 更新后
{
  _id: 'xxx',
  name: "Hey",
  count: {
    fav: 1
  }
}
```

### 批量更新文档
collection.update()

```js
const dbCmd = db.command
collection.where({name: dbCmd.eq('hey')}).update({
  age: 18,
}).then(function(res) {
  
});
```


### 更新指令

#### set

更新指令。用于设定字段等于指定值。这种方法相比传入纯 JS 对象的好处是能够指定字段等于一个对象：

```js
const dbCmd = db.command
db.collection('photo').doc('doc-id').update({
  count: dbCmd.set({
    fav: 1,
    follow: 1
  })
}).then(function(res) {
  
})
```

```
// 更新前
{
  _id: 'xxx',
  name: "Hello",
  count: {
    fav: 0,
    follow: 0
  }
}

// 更新后
{
  _id: 'xxx',
  name: "Hello",
  count: {
    fav: 1,
    follow: 1
  }
}
```

#### inc

更新指令。用于指示字段自增某个值，这是个原子操作，使用这个操作指令而不是先读数据、再加、再写回的好处是：

1. 原子性：多个用户同时写，对数据库来说都是将字段加一，不会有后来者覆写前者的情况
2. 减少一次网络请求：不需先读再写

之后的 mul 指令同理。

如给收藏的商品数量加一：

```js
const dbCmd = db.command

db.collection('user').where({
  _id: 'my-doc-id'
}).update({
  count: {
    fav: dbCmd.inc(1)
  }
}).then(function(res) {
  
})
```

```
// 更新前
{
  _id: 'xxx',
  name: "Hello",
  count: {
    fav: 0,
    follow: 0
  }
}

// 更新后
{
  _id: 'xxx',
  name: "Hello",
  count: {
    fav: 1,
    follow: 0
  }
}
```

#### mul

更新指令。用于指示字段自乘某个值。

以下示例将count内的fav字段乘10

```js
const dbCmd = db.command

db.collection('user').where({
  _id: 'my-doc-id'
}).update({
  count: {
    fav: dbCmd.mul(10)
  }
}).then(function(res) {
  
})
```

```
// 更新前
{
  _id: 'xxx',
  name: "Hello",
  count: {
    fav: 2,
    follow: 0
  }
}

// 更新后
{
  _id: 'xxx',
  name: "Hello",
  count: {
    fav: 20,
    follow: 0
  }
}
```

#### remove

更新指令。用于表示删除某个字段。如某人删除了自己一条商品评价中的评分：

```js
const dbCmd = db.command
db.collection('comments').doc('comment-id').update({
  rating: dbCmd.remove()
}).then(function(res) {
  
})

```

```
// 更新前
{
  _id: 'xxx',
  rating: 5,
  comment: 'xxxx'
}

// 更新后
{
  _id: 'xxx',
  comment: 'xxxx'
}
```

#### push
向数组尾部追加元素，支持传入单个元素或数组

```js
const dbCmd = db.command

db.collection('comments').doc('comment-id').update({
  // users: dbCmd.push('aaa')
  users: dbCmd.push(['c', 'd'])
}).then(function(res) {
  
})

```

```
// 更新前
{
  _id: 'xxx',
  users: ['a','b']
}

// 更新后
{
  _id: 'xxx',
  users: ['a','b','c','d']
}
```

#### pop
删除数组尾部元素

```js
const dbCmd = db.command

db.collection('comments').doc('comment-id').update({
  users: dbCmd.pop()
}).then(function(res) {
  
})
```

```
// 更新前
{
  _id: 'xxx',
  users: ['a','b']
}

// 更新后
{
  _id: 'xxx',
  users: ['a']
}
```

#### unshift
向数组头部添加元素，支持传入单个元素或数组。使用同push

```js
const dbCmd = db.command

db.collection('comments').doc('comment-id').update({
  // users: dbCmd.push('aaa')
  users: dbCmd.unshift(['c', 'd'])
}).then(function(res) {
  
})

```

```
// 更新前
{
  _id: 'xxx',
  users: ['a','b']
}

// 更新后
{
  _id: 'xxx',
  users: ['c','d','a','b']
}
```

#### shift
删除数组头部元素。使用同pop

```js
const dbCmd = db.command

db.collection('comments').doc('comment-id').update({
  users: dbCmd.shift()
}).then(function(res) {
  
})
```

```
// 更新前
{
  _id: 'xxx',
  users: ['a','b']
}

// 更新后
{
  _id: 'xxx',
  users: ['b']
}
```

## GEO地理位置

注意：**如果需要对类型为地理位置的字段进行搜索，一定要建立地理位置索引**。

**平台差异说明**

|阿里云	|腾讯云	|
|----		|----		|
|×			|√			|


### GEO数据类型

#### Point

用于表示地理位置点，用经纬度唯一标记一个点，这是一个特殊的数据存储类型。

签名：`Point(longitude: number, latitude: number)`

示例：
```js
new db.Geo.Point(longitude, latitude)
```

#### LineString

用于表示地理路径，是由两个或者更多的 `Point` 组成的线段。

签名：`LineString(points: Point[])`

示例：

```js
new db.Geo.LineString([
  new db.Geo.Point(lngA, latA),
  new db.Geo.Point(lngB, latB),
  // ...
])
```

#### Polygon

用于表示地理上的一个多边形（有洞或无洞均可），它是由一个或多个**闭环** `LineString` 组成的几何图形。

由一个环组成的 `Polygon` 是没有洞的多边形，由多个环组成的是有洞的多边形。对由多个环（`LineString`）组成的多边形（`Polygon`），第一个环是外环，所有其他环是内环（洞）。

签名：`Polygon(lines: LineString[])`

示例：

```js
new db.Geo.Polygon([
  new db.Geo.LineString(...),
  new db.Geo.LineString(...),
  // ...
])
```

#### MultiPoint

用于表示多个点 `Point` 的集合。

签名：`MultiPoint(points: Point[])`

示例：

```js
new db.Geo.MultiPoint([
  new db.Geo.Point(lngA, latA),
  new db.Geo.Point(lngB, latB),
  // ...
])
```

#### MultiLineString

用于表示多个地理路径 `LineString` 的集合。

签名：`MultiLineString(lines: LineString[])`

示例：

```js
new db.Geo.MultiLineString([
  new db.Geo.LineString(...),
  new db.Geo.LineString(...),
  // ...
])
```


#### MultiPolygon

用于表示多个地理多边形 `Polygon` 的集合。

签名：`MultiPolygon(polygons: Polygon[])`

示例：

```js
new db.Geo.MultiPolygon([
  new db.Geo.Polygon(...),
  new db.Geo.Polygon(...),
  // ...
])
```

### GEO操作符

#### geoNear

按从近到远的顺序，找出字段值在给定点的附近的记录。

签名：
```js
db.command.geoNear(options: IOptions)

interface IOptions {
  geometry: Point // 点的地理位置
  maxDistance?: number // 选填，最大距离，米为单位
  minDistance?: number // 选填，最小距离，米为单位
}
```


示例：

```js
db.collection('user').where({
  location: db.command.geoNear({
    geometry: new db.Geo.Point(lngA, latA),
    maxDistance: 1000,
    minDistance: 0
  })
})
```

#### geoWithin

找出字段值在指定 Polygon / MultiPolygon 内的记录，无排序

签名：

```js
db.command.geoWithin(IOptions)

interface IOptions {
  geometry: Polygon | MultiPolygon // 地理位置
}
```

示例：

```js
// 一个闭合的区域
const area = new Polygon([
  new LineString([
    new Point(lngA, latA),
    new Point(lngB, latB),
    new Point(lngC, latC),
    new Point(lngA, latA)
  ]),
])

// 搜索 location 字段在这个区域中的 user
db.collection('user').where({
  location: db.command.geoWithin({
    geometry: area
  })
})
```

#### geoIntersects

找出字段值和给定的地理位置图形相交的记录

签名：

```js
db.command.geoIntersects(IOptions)

interface IOptions {
  geometry: Point | LineString | MultiPoint | MultiLineString | Polygon | MultiPolygon // 地理位置
}
```

示例：

```js
// 一条路径
const line = new LineString([
  new Point(lngA, latA),
  new Point(lngB, latB)
])

// 搜索 location 与这条路径相交的 user
db.collection('user').where({
  location: db.command.geoIntersects({
    geometry: line
  })
})
```

<!-- ## 数据库实时推送

监听指定集合中符合查询条件的文档，通过onchange回调获得文档的变化详情
(where参数为查询条件 参考 [查询文档](#查询文档))

```js
  const uniCloud =  uniCloud.init({
      spaceId: 'YourSpaceId
  });
  const db = uniCloud.database();
  const dbCmd = db.command
  const collection = db.collection('collName') // collName 需填当前服务空间下集合名称

  let ref = collection.where({ test: dbCmd.gt(0) }).watch({
    onChange: snapshot => {
        console.log("收到snapshot**********", snapshot)
    },
    onError: error => {
      console.log("收到error**********", error)
    }
  })
```

单个doc的监听，也可以采用doc('docId').watch()形式
```js
  let ref = collection.doc('one docId').watch({
    onChange: snapshot => {
        console.log("收到snapshot**********", snapshot)
    },
    onError: error => {
      console.log("收到error**********", error)
    }
  })
```

手动关闭监听，当前监听将不再收到推送
```js
  ref.close()
```
 -->

## 聚合操作

获取数据库集合的聚合操作实例
```
db.collection('scores').aggregate()
```

### addFields

聚合阶段。添加新字段到输出的记录。经过 `addFields` 聚合阶段，输出的所有记录中除了输入时带有的字段外，还将带有 `addFields` 指定的字段。


**API 说明**

`addFields` 等同于同时指定了所有已有字段和新增字段的 `project` 阶段。

**`addFields` 的形式如下：**
```
addFields({
  <新字段>: <表达式>
})
```
`addFields` 可指定多个新字段，每个新字段的值由使用的表达式决定。

如果指定的新字段与原有字段重名，则新字段的值会覆盖原有字段的值。注意 `addFields` 不能用来给数组字段添加元素。

**示例 1：连续两次 addFields**

假设集合 scores 有如下记录：
```
{
  _id: 1,
  student: "Maya",
  homework: [ 10, 5, 10 ],
  quiz: [ 10, 8 ],
  extraCredit: 0
}
{
  _id: 2,
  student: "Ryan",
  homework: [ 5, 6, 5 ],
  quiz: [ 8, 8 ],
  extraCredit: 8
}
```
应用两次 `addFields`，第一次增加两个字段分别为 `homework` 和 `quiz` 的和值，第二次增加一个字段再基于上两个和值求一次和值。
```
const $ = db.command.aggregate
db.collection('scores').aggregate()
  .addFields({
    totalHomework: $.sum('$homework'),
    totalQuiz: $.sum('$quiz')
  })
  .addFields({
    totalScore: $.add(['$totalHomework', '$totalQuiz', '$extraCredit'])
  })
  .end()
```

返回结果如下：
```
{
  "_id" : 1,
  "student" : "Maya",
  "homework" : [ 10, 5, 10 ],
  "quiz" : [ 10, 8 ],
  "extraCredit" : 0,
  "totalHomework" : 25,
  "totalQuiz" : 18,
  "totalScore" : 43
}
{
  "_id" : 2,
  "student" : "Ryan",
  "homework" : [ 5, 6, 5 ],
  "quiz" : [ 8, 8 ],
  "extraCredit" : 8,
  "totalHomework" : 16,
  "totalQuiz" : 16,
  "totalScore" : 40
}
```

**示例 2：在嵌套记录里增加字段**

可以用点表示法在嵌套记录里增加字段。假设 vehicles 集合含有如下记录：
```
{ _id: 1, type: "car", specs: { doors: 4, wheels: 4 } }
{ _id: 2, type: "motorcycle", specs: { doors: 0, wheels: 2 } }
{ _id: 3, type: "jet ski" }
```
可以用如下操作在 `specs` 字段下增加一个新的字段 `fuel_type`，值都设为固定字符串 `unleaded`：
```
db.collection('vehicles').aggregate()
  .addFields({
    'spec.fuel_type': 'unleaded'
  })
  .end()
```

返回结果如下：
```
{ _id: 1, type: "car",
   specs: { doors: 4, wheels: 4, fuel_type: "unleaded" } }
{ _id: 2, type: "motorcycle",
   specs: { doors: 0, wheels: 2, fuel_type: "unleaded" } }
{ _id: 3, type: "jet ski",
   specs: { fuel_type: "unleaded" } }
```

**示例 3：设置字段值为另一个字段**

可以通过 `$` 加字段名组成的字符串作为值的表达式来设置字段的值为另一个字段的值。

同样用上一个集合示例，可以用如下操作添加一个字段 `vehicle_type`，将其值设置为 `type` 字段的值：
```
db.collection('vehicles').aggregate()
  .addFields({
    vehicle_type: '$type'
  })
  .end()
```
返回结果如下：
```
{ _id: 1, type: "car", vehicle_type: "car",
   specs: { doors: 4, wheels: 4, fuel_type: "unleaded" } }
{ _id: 2, type: "motorcycle", vehicle_type: "motorcycle",
   specs: { doors: 0, wheels: 2, fuel_type: "unleaded" } }
{ _id: 3, type: "jet ski", vehicle_type: "jet ski",
   specs: { fuel_type: "unleaded" } }
```

### bucket

聚合阶段。将输入记录根据给定的条件和边界划分成不同的组，每组即一个 `bucket`。

**API 说明**

每组分别作为一个记录输出，包含一个以下界为值的 `_id` 字段和一个以组中记录数为值的 `count` 字段。`count` 在没有指定 `output` 的时候是默认输出的。

`bucket` 只会在组内有至少一个记录的时候输出。

**bucket 的形式如下：**
```
bucket({
  groupBy: <expression>,
  boundaries: [<lowerbound1>, <lowerbound2>, ...],
  default: <literal>,
  output: {
    <output1>: <accumulator expr>,
    ...
    <outputN>: <accumulator expr>
  }
})
```
`groupBy` 是一个用以决定分组的表达式，会应用在各个输入记录上。可以用 `$` 前缀加上要用以分组的字段路径来作为表达式。除非用 `default` 指定了默认值，否则每个记录都需要包含指定的字段，且字段值必须在 `boundaries` 指定的范围之内。

`boundaries` 是一个数组，每个元素分别是每组的下界。必须至少指定两个边界值。数组值必须是同类型递增的值。

`default` 可选，指定之后，没有进入任何分组的记录将都进入一个默认分组，这个分组记录的 `_id` 即由 `default` 决定。`default` 的值必须小于 `boundaries` 中的最小值或大于等于其中的最大值。`default` 的值可以与 `boundaries` 元素值类型不同。

`output` 可选，用以决定输出记录除了 `_id` 外还要包含哪些字段，各个字段的值必须用累加器表达式指定。当 `output` 指定时，默认的 `count` 是不会被默认输出的，必须手动指定：
```
output: {
  count: $.sum(1),
  ...
  <outputN>: <accumulator expr>
}
```
使用 bucket 需要满足以下至少一个条件，否则会抛出错误：

每一个输入记录应用 groupBy 表达式获取的值都必须是一个在 boundaries 内的值

指定一个 default 值，该值在 boundaries 以外，或与 boundaries 元素的值不同的类型。

**示例**

假设集合 items 有如下记录：
```
{
  _id: "1",
  price: 10
}
{
  _id: "2",
  price: 50
}
{
  _id: "3",
  price: 20
}
{
  _id: "4",
  price: 80
}
{
  _id: "5",
  price: 200
}
```

对上述记录进行分组，将 [0, 50) 分为一组，[50, 100) 分为一组，其他分为一组：

```
const $ = db.command.aggregate
db.collection('items').aggregate()
  .bucket({
    groupBy: '$price',
    boundaries: [0, 50, 100],
    default: 'other',
    output: {
      count: $.sum(),
      ids: $.push('$_id')
    }
  })
  .end()
```

返回结果如下：

```
[
  {
    "_id": 0,
    "count": 2,
    "ids": [
      "1",
      "3"
    ]
  },
  {
    "_id": 50,
    "count": 2,
    "ids": [
      "2",
      "4"
    ]
  },
  {
    "_id": "other",
    "count": 22,
    "ids": [
      "5"
    ]
  }
]
```

### bucketAuto

聚合阶段。将输入记录根据给定的条件划分成不同的组，每组即一个 `bucket`。与 `bucket` 的其中一个不同之处在于无需指定 `boundaries`，`bucketAuto` 会自动尝试将记录尽可能平均的分散到每组中。

**API 说明**
每组分别作为一个记录输出，包含一个以包含组中最大值和最小值两个字段的对象为值的 _id 字段和一个以组中记录数为值的 count 字段。count 在没有指定 output 的时候是默认输出的。

**bucketAuto 的形式如下：**
```
bucketAuto({
  groupBy: <expression>,
  buckets: <number>,
  granularity: <string>,
  output: {
    <output1>: <accumulator expr>,
    ...
    <outputN>: <accumulator expr>
  }
})
```
`groupBy` 是一个用以决定分组的表达式，会应用在各个输入记录上。可以用 $ 前缀加上要用以分组的字段路径来作为表达式。除非用 `default` 指定了默认值，否则每个记录都需要包含指定的字段，且字段值必须在 `boundaries` 指定的范围之内。

`buckets` 是一个用于指定划分组数的正整数。

`granularity` 是可选枚举值字符串，用于保证自动计算出的边界符合给定的规则。这个字段仅可在所有 `groupBy` 值都是数字并且没有 `NaN` 的情况下使用。枚举值包括：`R5、R10、R20、R40、R80、1-2-5、E6、E12、E24、E48、E96、E192、POWERSOF2`。

`output` 可选，用以决定输出记录除了 `_id` 外还要包含哪些字段，各个字段的值必须用累加器表达式指定。当 `output` 指定时，默认的 `count` 是不会被默认输出的，必须手动指定：
```
output: {
  count: $.sum(1),
  ...
  <outputN>: <accumulator expr>
}
```
在以下情况中，输出的分组可能会小于给定的组数：

输入记录数少于分组数
- `groupBy` 计算得到的唯一值少于分组数
- `granularity` 的间距少于分组数
- `granularity` 不够精细以至于不能平均分配到各组

**granularity 详细说明**

`granularity` 用于保证边界值属于一个给定的数字序列。

**Renard 序列**

Renard 序列是以 10 的 5 / 10 / 20 / 40 / 80 次方根来推导的、在 1.0 到 10.0 (如果是 R80 则是 10.3) 之间的数字序列。

设置 granularity 为 R5 / R10 / R20 / R40 / R80 就把边界值限定在序列内。如果 groupBy 的值不在 1.0 到 10.0 (如果是 R80 则是 10.3) 内，则序列数字会自动乘以 10。

**E 序列**

E 序列是以 10 的 6 / 12 / 24 / 48 / 96 / 192 次方跟来推导的、带有一个特定误差的、在 1.0 到 10.0 之间的数字序列。

**1-2-5 序列**

1-2-5 序列 表现与三值 Renard 序列一样。

**2的次方序列**

由 2 的各次方组成的序列数字。

**示例**

假设集合 items 有如下记录：
```
{
  _id: "1",
  price: 10.5
}
{
  _id: "2",
  price: 50.3
}
{
  _id: "3",
  price: 20.8
}
{
  _id: "4",
  price: 80.2
}
{
  _id: "5",
  price: 200.3
}
```
对上述记录进行自动分组，分成三组：
```
const $ = db.command.aggregate
db.collection('items').aggregate()
  .bucket({
    groupBy: '$price',
    buckets: 3,
  })
  .end()
```
返回结果如下：
```
{
  "_id": {
    "min": 10.5,
    "max": 50.3
  },
  "count": 2
}
{
  "_id": {
    "min": 50.3,
    "max": 200.3
  },
  "count": 2
}
{
  "_id": {
    "min": 200.3,
    "max": 200.3
  },
  "count": 1
}
```

### count

聚合阶段。计算上一聚合阶段输入到本阶段的记录数，输出一个记录，其中指定字段的值为记录数。

**API 说明**

**count 的形式如下：**
```
count(<string>)
```
<string> 是输出记录数的字段的名字，不能是空字符串，不能以 $ 开头，不能包含 . 字符。

count 阶段等同于 group + project 的操作：
```
const $ = db.command.aggregate
db.collection('items').aggregate()
  .group({
    _id: null,
    count: $.sum(1),
  })
  .project({
    _id: 0,
  })
  .end()
```
上述操作会输出一个包含 count 字段的记录。

**示例**

假设集合 items 有如下记录：
```
{
  _id: "1",
  price: 10.5
}
{
  _id: "2",
  price: 50.3
}
{
  _id: "3",
  price: 20.8
}
{
  _id: "4",
  price: 80.2
}
{
  _id: "5",
  price: 200.3
}
```
找出价格大于 50 的记录数：
```
const $ = db.command.aggregate
db.collection('items').aggregate()
  .match({
    price: $.gt(50)
  })
  .count('expensiveCount')
  .end()
```
返回结果如下：
```
{
  "expensiveCount": 3
}
```

### geoNear

聚合阶段。将记录按照离给定点从近到远输出。

|属性								|类型			|默认值	|必填	|说明																																														|
|----								|----			|----		|----	|----																																														|
|near								|GeoPoint	|				|是		|GeoJSON Point，用于判断距离的点																																|
|spherical					|true			|				|是		|必填，值为 true																																								|
|limit							|number		|				|否		|限制返回记录数																																									|
|maxDistance				|number		|				|否		|距离最大值																																											|
|minDistance				|number		|				|否		|距离最小值																																											|
|query							|Object		|				|否		|要求记录必须同时满足该条件（语法同 where）																											|
|distanceMultiplier	|number		|				|否		|返回时在距离上乘以该数字																																				|
|distanceField			|string		|				|是		|存放距离的输出字段名，可以用点表示法表示一个嵌套字段																						|
|includeLocs				|string		|				|否		|列出要用于距离计算的字段，如果记录中有多个字段都是地理位置时有用																|
|key								|string		|				|否		|选择要用的地理位置索引。如果集合由多个地理位置索引，则必须指定一个，指定的方式是指定对应的字段	|

**API 说明**

- `geoNear` 必须为第一个聚合阶段
- 必须有地理位置索引。如果有多个，必须用 `key` 参数指定要使用的索引。

**示例**

假设集合 attractions 有如下记录：
```
{
  "_id": "geoNear.0",
  "city": "Guangzhou",
  "docType": "geoNear",
  "location": {
    "type": "Point",
    "coordinates": [
      113.30593,
      23.1361155
    ]
  },
  "name": "Canton Tower"
},
{
  "_id": "geoNear.1",
  "city": "Guangzhou",
  "docType": "geoNear",
  "location": {
    "type": "Point",
    "coordinates": [
      113.306789,
      23.1564721
    ]
  },
  "name": "Baiyun Mountain"
},
{
  "_id": "geoNear.2",
  "city": "Beijing",
  "docType": "geoNear",
  "location": {
    "type": "Point",
    "coordinates": [
      116.3949659,
      39.9163447
    ]
  },
  "name": "The Palace Museum"
},
{
  "_id": "geoNear.3",
  "city": "Beijing",
  "docType": "geoNear",
  "location": {
    "type": "Point",
    "coordinates": [
      116.2328567,
      40.242373
    ]
  },
  "name": "Great Wall"
}
```
```
const $ = db.command.aggregate
db.collection('attractions').aggregate()
  .geoNear({
    distanceField: 'distance', // 输出的每个记录中 distance 即是与给定点的距离
    spherical: true,
    near: db.Geo.Point(113.3089506, 23.0968251),
    query: {
      docType: 'geoNear',
    },
    key: 'location', // 若只有 location 一个地理位置索引的字段，则不需填
    includeLocs: 'location', // 若只有 location 一个是地理位置，则不需填
  })
  .end()
```

返回结果如下：
```
{
  "_id": "geoNear.0",
  "location": {
    "type": "Point",
    "coordinates": [
      113.30593,
      23.1361155
    ]
  },
  "docType": "geoNear",
  "name": "Canton Tower",
  "city": "Guangzhou",
  "distance": 4384.68131486958
},
{
  "_id": "geoNear.1",
  "city": "Guangzhou",
  "location": {
    "type": "Point",
    "coordinates": [
      113.306789,
      23.1564721
    ]
  },
  "docType": "geoNear",
  "name": "Baiyun Mountain",
  "distance": 6643.521654040738
},
{
  "_id": "geoNear.2",
  "docType": "geoNear",
  "name": "The Palace Museum",
  "city": "Beijing",
  "location": {
    "coordinates": [
      116.3949659,
      39.9163447
    ],
    "type": "Point"
  },
  "distance": 1894750.4414538583
},
{
  "_id": "geoNear.3",
  "docType": "geoNear",
  "name": "Great Wall",
  "city": "Beijing",
  "location": {
    "type": "Point",
    "coordinates": [
      116.2328567,
      40.242373
    ]
  },
  "distance": 1928300.3308822548
}
```

### group

聚合阶段。将输入记录按给定表达式分组，输出时每个记录代表一个分组，每个记录的 _id 是区分不同组的 key。输出记录中也可以包括累计值，将输出字段设为累计值即会从该分组中计算累计值。


**API 说明**

**group 的形式如下：**
```
group({
  _id: <expression>,
  <field1>: <accumulator1>,
  ...
  <fieldN>: <accumulatorN>
})
```

`_id` 参数是必填的，如果填常量则只有一组。其他字段是可选的，都是累计值，用 `$.sum` 等累计器(`const $ = db.command.aggregate`)，但也可以使用其他表达式。

累计器必须是以下操作符之一：

详细使用方法见[累计器操作符](#累计器操作符)

|操作符				|说明																																																					|
|----					|----																																																					|
|addToSet			|向数组中添加值，如果数组中已存在该值，不执行任何操作																													|
|avg					|返回一组集合中，指定字段对应数据的平均值																																			|
|sum					|计算并且返回一组字段所有数值的总和																																						|
|first				|返回指定字段在一组集合的第一条记录对应的值。仅当这组集合是按照某种定义排序（ sort ）后，此操作才有意义。			|
|last					|返回指定字段在一组集合的最后一条记录对应的值。仅当这组集合是按照某种定义排序（ sort ）后，此操作才有意义。		|
|max					|返回一组数值的最大值																																													|
|min					|返回一组数值的最小值																																													|
|push					|在 group 阶段，返回一组中表达式指定列与对应的值，一起组成的数组																							|
|stdDevPop		|返回一组字段对应值的标准差																																										|
|stdDevSamp		|计算输入值的样本标准偏差。如果输入值代表数据总体，或者不概括更多的数据，请改用 db.command.aggregate.stdDevPop|
|mergeObjects	|将多个文档合并为单个文档																																											|

**内存限制**

该阶段有 100M 内存使用限制。

**示例 1：按字段值分组**

假设集合 avatar 有如下记录：
```
{
  _id: "1",
  alias: "john",
  region: "asia",
  scores: [40, 20, 80],
  coins: 100
}
{
  _id: "2",
  alias: "arthur",
  region: "europe",
  scores: [60, 90],
  coins: 20
}
{
  _id: "3",
  alias: "george",
  region: "europe",
  scores: [50, 70, 90],
  coins: 50
}
{
  _id: "4",
  alias: "john",
  region: "asia",
  scores: [30, 60, 100, 90],
  coins: 40
}
{
  _id: "5",
  alias: "george",
  region: "europe",
  scores: [20],
  coins: 60
}
{
  _id: "6",
  alias: "john",
  region: "asia",
  scores: [40, 80, 70],
  coins: 120
}
```
```
const $ = db.command.aggregate
db.collection('avatar').aggregate()
  .group({
    _id: '$alias',
    num: $.sum(1)
  })
  .end()
```
返回结果如下：
```
{
  "_id": "john",
  "num": 3
}
{
  "_id": "authur",
  "num": 1
}
{
  "_id": "george",
  "num": 2
}
```

**示例 2：按多个值分组**

可以给 _id 传入记录的方式按多个值分组。还是沿用上面的示例数据，按各个区域（region）获得相同最高分（score）的来分组，并求出各组虚拟币（coins）的总量：
```
const $ = db.command.aggregate
db.collection('avatar').aggregate()
  .group({
    _id: {
      region: '$region',
      maxScore: $.max('$scores')
    },
    totalCoins: $.sum('$coins')
  })
  .end()
```
返回结果如下：
```
{
  "_id": {
    "region": "asia",
    "maxScore": 80
  },
  "totalCoins": 220
}
{
  "_id": {
    "region": "asia",
    "maxScore": 100
  },
  "totalCoins": 100
}
{
  "_id": {
    "region": "europe",
    "maxScore": 90
  },
  "totalCoins": 70
}
{
  "_id": {
    "region": "europe",
    "maxScore": 20
  },
  "totalCoins": 60
}
```

### limit

聚合阶段。限制输出到下一阶段的记录数。

**示例**

假设集合 items 有如下记录：
```
{
  _id: "1",
  price: 10
}
{
  _id: "2",
  price: 50
}
{
  _id: "3",
  price: 20
}
{
  _id: "4",
  price: 80
}
{
  _id: "5",
  price: 200
}
```
返回价格大于 20 的记录的最小的两个记录：
```
const $ = db.command.aggregate
db.collection('items').aggregate()
  .match({
    price: $.gt(20)
  })
  .sort({
    price: 1,
  })
  .limit(2)
  .end()
```
返回结果如下：
```
{
  "_id": "3",
  "price": 20
}
{
  "_id": "4",
  "price": 80
}
```

### lookup

聚合阶段。联表查询。与同个数据库下的一个指定的集合做 left outer join(左外连接)。对该阶段的每一个输入记录，lookup 会在该记录中增加一个数组字段，该数组是被联表中满足匹配条件的记录列表。lookup 会将连接后的结果输出给下个阶段。

**API 说明**

`lookup` 有两种使用方式

#### 相等匹配
将输入记录的一个字段和被连接集合的一个字段进行相等匹配时，采用以下定义：
```
lookup({
  from: <要连接的集合名>,
  localField: <输入记录的要进行相等匹配的字段>,
  foreignField: <被连接集合的要进行相等匹配的字段>,
  as: <输出的数组字段名>
})
```

**参数详细说明**

|参数字段			|说明																																																																										|
|----					|----																																																																										|
|from					|要进行连接的另外一个集合的名字																																																													|
|localField		|当前流水线的输入记录的字段名，该字段将被用于与 from 指定的集合的 foreignField 进行相等匹配。如果输入记录中没有该字段，则该字段的值在匹配时会被视作 null|
|foreignField	|被连接集合的字段名，该字段会被用于与 localField 进行相等匹配。如果被连接集合的记录中没有该字段，该字段的值将在匹配时被视作 null												|
|as						|指定连接匹配出的记录列表要存放的字段名，这个数组包含的是匹配出的来自 from 集合的记录。如果输入记录中本来就已有该字段，则该字段会被覆写									|

这个操作等价于以下伪 SQL 操作：

```
SELECT *, <output array field>
FROM collection
WHERE <output array field> IN (SELECT *
                               FROM <collection to join>
                               WHERE <foreignField>= <collection.localField>);
```

**例子：**

- 指定一个相等匹配条件
- 对数组字段应用相等匹配
- 组合 mergeObjects 应用相等匹配

#### 自定义连接条件、拼接子查询

**此用法阿里云暂不支持**

如果需要指定除相等匹配之外的连接条件，或指定多个相等匹配条件，或需要拼接被连接集合的子查询结果，那可以使用如下定义：
```
lookup({
  from: <要连接的集合名>,
  let: { <变量1>: <表达式1>, ..., <变量n>: <表达式n> },
  pipeline: [ <在要连接的集合上进行的流水线操作> ],
  as: <输出的数组字段名>
})
```

**参数详细说明**

|参数字段	|说明																																																																																																																																																				|
|----			|----																																																																																																																																																				|
|from			|要进行连接的另外一个集合的名字																																																																																																																																							|
|let			|可选。指定在 pipeline 中可以使用的变量，变量的值可以引用输入记录的字段，比如 let: { userName: '$name' } 就代表将输入记录的 name 字段作为变量 userName 的值。在 pipeline 中无法直接访问输入记录的字段，必须通过 let 定义之后才能访问，访问的方式是在 expr 操作符中用 $$变量名 的方式访问，比如 $$userName。	|
|pipeline	|指定要在被连接集合中运行的聚合操作。如果要返回整个集合，则该字段取值空数组 []。在 pipeline 中无法直接访问输入记录的字段，必须通过 let 定义之后才能访问，访问的方式是在 expr 操作符中用 $$变量名 的方式访问，比如 $$userName。																																							|
|as				|指定连接匹配出的记录列表要存放的字段名，这个数组包含的是匹配出的来自 from 集合的记录。如果输入记录中本来就已有该字段，则该字段会被覆写																																																																																			|

该操作等价于以下伪 SQL 语句：
```
SELECT *, <output array field>
FROM collection
WHERE <output array field> IN (SELECT <documents as determined from the pipeline>
                               FROM <collection to join>
                               WHERE <pipeline> );
```

**例子**

- 指定多个连接条件
- 拼接被连接集合的子查询

**示例**

**指定一个相等匹配条件**

假设 orders 集合有以下记录：
```
[
  {"_id":4,"book":"novel 1","price":30,"quantity":2},
  {"_id":5,"book":"science 1","price":20,"quantity":1},
  {"_id":6}
]
```
books 集合有以下记录：
```
[
  {"_id":"book1","author":"author 1","category":"novel","stock":10,"time":1564456048486,"title":"novel 1"},
  {"_id":"book3","author":"author 3","category":"science","stock":30,"title":"science 1"},
  {"_id":"book4","author":"author 3","category":"science","stock":40,"title":"science 2"},
  {"_id":"book2","author":"author 2","category":"novel","stock":20,"title":"novel 2"},
  {"_id":"book5","author":"author 4","category":"science","stock":50,"title":null},
  {"_id":"book6","author":"author 5","category":"novel","stock":"60"}
]
```
以下聚合操作可以通过一个相等匹配条件连接 `orders` 和 `books` 集合，匹配的字段是 `orders` 集合的 `book` 字段和 `books` 集合的 title 字段：
```
const db = cloud.database()
db.collection('orders').aggregate()
  .lookup({
    from: 'books',
    localField: 'book',
    foreignField: 'title',
    as: 'bookList',
  })
  .end()
  .then(res => console.log(res))
  .catch(err => console.error(err))
```
结果：
```
[
  {
    "_id": 4,
    "book": "novel 1",
    "price": 30,
    "quantity": 2,
    "bookList": [
      {
        "_id": "book1",
        "title": "novel 1",
        "author": "author 1",
        "category": "novel",
        "stock": 10
      }
    ]
  },
  {
    "_id": 5,
    "book": "science 1",
    "price": 20,
    "quantity": 1,
    "bookList": [
      {
        "_id": "book3",
        "category": "science",
        "title": "science 1",
        "author": "author 3",
        "stock": 30
      }
    ]
  },
  {
    "_id": 6,
    "bookList": [
      {
        "_id": "book5",
        "category": "science",
        "author": "author 4",
        "stock": 50,
        "title": null
      },
      {
        "_id": "book6",
        "author": "author 5",
        "stock": "60",
        "category": "novel"
      }
    ]
  }
]
```
对数组字段应用相等匹配
假设 authors 集合有以下记录：
```
[
  {"_id": 1, "name": "author 1", "intro": "Two-time best-selling sci-fiction novelist"},
  {"_id": 3, "name": "author 3", "intro": "UCB assistant professor"},
  {"_id": 4, "name": "author 4", "intro": "major in CS"}
]
```
books 集合有以下记录：
```
[
  {"_id":"book1","authors":["author 1"],"category":"novel","stock":10,"time":1564456048486,"title":"novel 1"},
  {"_id":"book3","authors":["author 3", "author 4"],"category":"science","stock":30,"title":"science 1"},
  {"_id":"book4","authors":["author 3"],"category":"science","stock":40,"title":"science 2"}
]
```
以下操作获取作者信息及他们分别发表的书籍，使用了 lookup 操作匹配 authors 集合的 name 字段和 books 集合的 authors 数组字段：
```
const db = cloud.database()
db.collection('authors').aggregate()
  .lookup({
    from: 'books',
    localField: 'name',
    foreignField: 'authors',
    as: 'publishedBooks',
  })
  .end()
  .then(res => console.log(res))
  .catch(err => console.error(err))
```
结果
```
[
  {
    "_id": 1,
    "intro": "Two-time best-selling sci-fiction novelist",
    "name": "author 1",
    "publishedBooks": [
      {
        "_id": "book1",
        "title": "novel 1",
        "category": "novel",
        "stock": 10,
        "authors": [
          "author 1"
        ]
      }
    ]
  },
  {
    "_id": 3,
    "name": "author 3",
    "intro": "UCB assistant professor",
    "publishedBooks": [
      {
        "_id": "book3",
        "category": "science",
        "title": "science 1",
        "stock": 30,
        "authors": [
          "author 3",
          "author 4"
        ]
      },
      {
        "_id": "book4",
        "title": "science 2",
        "category": "science",
        "stock": 40,
        "authors": [
          "author 3"
        ]
      }
    ]
  },
  {
    "_id": 4,
    "intro": "major in CS",
    "name": "author 4",
    "publishedBooks": [
      {
        "_id": "book3",
        "category": "science",
        "title": "science 1",
        "stock": 30,
        "authors": [
          "author 3",
          "author 4"
        ]
      }
    ]
  }
]
```

**组合 mergeObjects 应用相等匹配**

假设 `orders` 集合有以下记录：
```
[
  {"_id":4,"book":"novel 1","price":30,"quantity":2},
  {"_id":5,"book":"science 1","price":20,"quantity":1},
  {"_id":6}
]
```
`books` 集合有以下记录：
```
[
  {"_id":"book1","author":"author 1","category":"novel","stock":10,"time":1564456048486,"title":"novel 1"},
  {"_id":"book3","author":"author 3","category":"science","stock":30,"title":"science 1"},
  {"_id":"book4","author":"author 3","category":"science","stock":40,"title":"science 2"},
  {"_id":"book2","author":"author 2","category":"novel","stock":20,"title":"novel 2"},
  {"_id":"book5","author":"author 4","category":"science","stock":50,"title":null},
  {"_id":"book6","author":"author 5","category":"novel","stock":"60"}
]
```
以下操作匹配 orders 的 book 字段和 books 的 title 字段，并将 books 匹配结果直接 merge 到 orders 记录中。
```
var db = cloud.database()
var $ = db.command.aggregate
db.collection('orders').aggregate()
  .lookup({
    from: "books",
    localField: "book",
    foreignField: "title",
    as: "bookList"
  })
  .replaceRoot({
    newRoot: $.mergeObjects([ $.arrayElemAt(['$bookList', 0]), '$$ROOT' ])
  })
  .project({
    bookList: 0
  })
  .end()
  .then(res => console.log(res))
  .catch(err => console.error(err))
```
结果
```
[
  {
    "_id": 4,
    "title": "novel 1",
    "author": "author 1",
    "category": "novel",
    "stock": 10,
    "book": "novel 1",
    "price": 30,
    "quantity": 2
  },
  {
    "_id": 5,
    "category": "science",
    "title": "science 1",
    "author": "author 3",
    "stock": 30,
    "book": "science 1",
    "price": 20,
    "quantity": 1
  },
  {
    "_id": 6,
    "category": "science",
    "author": "author 4",
    "stock": 50,
    "title": null
  }
]
```

**指定多个连接条件**

假设 `orders` 集合有以下记录：
```
[
  {"_id":4,"book":"novel 1","price":300,"quantity":20},
  {"_id":5,"book":"science 1","price":20,"quantity":1}
]
```
`books` 集合有以下记录：
```
[
  {"_id":"book1","author":"author 1","category":"novel","stock":10,"time":1564456048486,"title":"novel 1"},
  {"_id":"book3","author":"author 3","category":"science","stock":30,"title":"science 1"}
]
```
以下操作连接 `orders` 和 `books` 集合，要求两个条件：

- orders 的 book 字段与 books 的 title 字段相等
- orders 的 quantity 字段大于或等于 books 的 stock 字段
```
const db = cloud.database()
const $ = db.command.aggregate
db.collection('orders').aggregate()
  .lookup({
    from: 'books',
    let: {
      order_book: '$book',
      order_quantity: '$quantity'
    },
    pipeline: $.pipeline()
      .match(_.expr($.and([
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
  .then(res => console.log(res))
  .catch(err => console.error(err))
```
结果：
```
[
  {
    "_id": 4,
    "book": "novel 1",
    "price": 300,
    "quantity": 20,
    "bookList": []
  },
  {
    "_id": 5,
    "book": "science 1",
    "price": 20,
    "quantity": 1,
    "bookList": [
      {
        "title": "science 1",
        "author": "author 3",
        "stock": 30
      }
    ]
  }
]
```

**拼接被连接集合的子查询**

假设 `orders` 集合有以下记录：
```
[
  {"_id":4,"book":"novel 1","price":30,"quantity":2},
  {"_id":5,"book":"science 1","price":20,"quantity":1}
]
```
`books` 集合有以下记录：
```
[
  {"_id":"book1","author":"author 1","category":"novel","stock":10,"time":1564456048486,"title":"novel 1"},
  {"_id":"book3","author":"author 3","category":"science","stock":30,"title":"science 1"},
  {"_id":"book4","author":"author 3","category":"science","stock":40,"title":"science 2"}
]
```
在每条输出记录上加上一个数组字段，该数组字段的值是对 books 集合的一个查询语句的结果：
```
const db = cloud.database()
const $ = db.command.aggregate
db.collection('orders').aggregate()
  .lookup({
    from: 'books',
    let: {
      order_book: '$book',
      order_quantity: '$quantity'
    },
    pipeline: $.pipeline()
      .match({
        author: 'author 3'
      })
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
  .then(res => console.log(res))
  .catch(err => console.error(err))
```
结果
```
[
  {
    "_id": 4,
    "book": "novel 1",
    "price": 30,
    "quantity": 20,
    "bookList": [
      {
        "title": "science 1",
        "author": "author 3",
        "stock": 30
      },
      {
        "title": "science 2",
        "author": "author 3",
        "stock": 40
      }
    ]
  },
  {
    "_id": 5,
    "book": "science 1",
    "price": 20,
    "quantity": 1,
    "bookList": [
      {
        "title": "science 1",
        "author": "author 3",
        "stock": 30
      },
      {
        "title": "science 2",
        "author": "author 3",
        "stock": 40
      }
    ]
  }
]
```

### match

聚合阶段。根据条件过滤文档，并且把符合条件的文档传递给下一个流水线阶段。

**API 说明**

**match 的形式如下：**
```
match(<查询条件>)
```

查询条件与普通查询一致，可以用普通查询操作符，注意 match 阶段和其他聚合阶段不同，不可使用聚合操作符，只能使用查询操作符。
```
// 直接使用字符串
match({
  name: 'Tony Stark'
})
```
```
// 使用操作符
const _ = db.command
match({
  age: _.gt(18)
})
```

**示例**

假设集合 articles 有如下记录：
```
{ "_id" : "1", "author" : "stark",  "score" : 80 }
{ "_id" : "2", "author" : "stark",  "score" : 85 }
{ "_id" : "3", "author" : "bob",    "score" : 60 }
{ "_id" : "4", "author" : "li",     "score" : 55 }
{ "_id" : "5", "author" : "jimmy",  "score" : 60 }
{ "_id" : "6", "author" : "li",     "score" : 94 }
{ "_id" : "7", "author" : "justan", "score" : 95 }
```

**匹配**

下面是一个直接匹配的例子：
```
db.collection('articles')
  .aggregate()
  .match({
    author: 'stark'
  })
  .end()
```
这里的代码尝试找到所有 author 字段是 stark 的文章，那么匹配如下：
```
{ "_id" : "1", "author" : "stark", "score" : 80 }
{ "_id" : "2", "author" : "stark", "score" : 85 }
```

**计数**

match 过滤出文档后，还可以与其他流水线阶段配合使用。

比如下面这个例子，我们使用 group 进行搭配，计算 score 字段大于 80 的文档数量：
```
const _ = db.command
const $ = _.aggregate
db.collection('articles')
  .aggregate()
  .match({
    score: _.gt(80)
  })
  .group({
      _id: null,
      count: $.sum(1)
  })
  .end()
```
返回值如下：
```
{ "_id" : null, "count" : 3 }
```

### project

聚合阶段。把指定的字段传递给下一个流水线，指定的字段可以是某个已经存在的字段，也可以是计算出来的新字段。

**API 说明**

**project 的形式如下：**
```
project({
  <表达式>
})
```

表达式可以有以下格式：

|格式									|说明																																														|
|----									|----																																														|
|<字段>: <1 或 true>	|指定包含某个已有字段																																						|
|_id: <0 或 false>		|舍弃 _id 字段																																									|
|<字段>: <表达式>			|加入一个新字段，或者重置某个已有字段																														|
|<字段>: <0 或 false>	|舍弃某个字段（如果你指定舍弃了某个非 _id 字段，那么在此次 project 中，你不能再使用其它表达式）	|

**指定包含字段**

_id 字段是默认包含在输出中的，除此之外其他任何字段，如果想要在输出中体现的话，必须在 project 中指定； 如果指定包含一个尚不存在的字段，那么 project 会忽略这个字段，不会加入到输出的文档中；

**指定排除字段**

如果你在 project 中指定排除某个字段，那么其它字段都会体现在输出中； 如果指定排除的是非 _id 字段，那么在本次 project 中，不能再使用其它表达式；

**加入新的字段或重置某个已有字段**

你可以使用一些特殊的表达式加入新的字段，或重置某个已有字段。

**多层嵌套的字段**

有时有些字段处于多层嵌套的底层，我们可以使用点记法：
```
"contact.phone.number": <1 or 0 or 表达式>
```
也可以直接使用嵌套的格式：
```
contact: { phone: { number: <1 or 0 or 表达式> } }
```

**示例**

假设我们有一个 articles 集合，其中含有以下文档：
```
{
    "_id": 666,
    "title": "This is title",
    "author": "Nobody",
    "isbn": "123456789",
    "introduction": "......"
}
```
**指定包含某些字段**

下面的代码使用 project，让输出只包含 _id、title 和 author 字段：
```
db.collection('articles')
  .aggregate()
  .project({
    title: 1,
    author: 1
  })
  .end()
```

输出如下：
```
{ "_id" : 666, "title" : "This is title", "author" : "Nobody" }
```

**去除输出中的 _id 字段**

_id 是默认包含在输出中的，如果不想要它，可以指定去除它：
```
db.collection('articles')
  .aggregate()
  .project({
    _id: 0,  // 指定去除 _id 字段
    title: 1,
    author: 1
  })
  .end()
```
输出如下：
```
{ "title" : "This is title", "author" : "Nobody" }
```

**去除某个非 _id 字段**

我们还可以指定在输出中去掉某个非 _id 字段，这样其它字段都会被输出：
```
db.collection('articles')
  .aggregate()
  .project({
    isbn: 0,  // 指定去除 isbn 字段
  })
  .end()
```
输出如下，相比输入，没有了 isbn 字段：
```
{
    "_id" : 666,
    "title" : "This is title",
    "author" : "Nobody",
    "introduction": "......"
}
```

**加入计算出的新字段**

假设我们有一个 students 集合，其中包含以下文档：
```
{
    "_id": 1,
    "name": "小明",
    "scores": {
        "chinese": 80,
        "math": 90,
        "english": 70
    }
}
```
下面的代码，我们使用 project，在输出中加入了一个新的字段 totalScore：
```
const { sum } = db.command.aggregate
db.collection('students')
  .aggregate()
  .project({
    _id: 0,
    name: 1,
    totalScore: sum([
        "$scores.chinese",
        "$scores.math",
        "$scores.english"
    ])
  })
  .end()
```
输出为：
```
{ "name": "小明", "totalScore": 240 }
```

**加入新的数组字段**

假设我们有一个 points 集合，包含以下文档：
```
{ "_id": 1, "x": 1, "y": 1 }
{ "_id": 2, "x": 2, "y": 2 }
{ "_id": 3, "x": 3, "y": 3 }
```

下面的代码，我们使用 project，把 x 和 y 字段，放入到一个新的数组字段 coordinate 中：
```
db.collection('points')
  .aggregate()
  .project({
    coordinate: ["$x", "$y"]
  })
  .end()
```
输出如下：
```
{ "_id": 1, "coordinate": [1, 1] }
{ "_id": 2, "coordinate": [2, 2] }
{ "_id": 3, "coordinate": [3, 3] }
```

### replaceRoot

聚合阶段。指定一个已有字段作为输出的根节点，也可以指定一个计算出的新字段作为根节点。

**API 说明**

**replaceRoot 使用形式如下：**
```
replaceRoot({
    newRoot: <表达式>
})
```
表达式格式如下：

|格式			|说明																											|
|----			|----																											|
|<字段名>	|指定一个已有字段作为输出的根节点（如果字段不存在则报错）	|
|<对象>		|计算一个新字段，并且把这个新字段作为根节点								|

**示例**

**使用已有字段作为根节点**

假设我们有一个 schools 集合，内容如下：
```
{
  "_id": 1,
  "name": "SFLS",
  "teachers": {
    "chinese": 22,
    "math": 18,
    "english": 21,
    "other": 123
  }
}
```
下面的代码使用 replaceRoot，把 teachers 字段作为根节点输出：
```
db.collection('schools')
  .aggregate()
  .replaceRoot({
    newRoot: '$teachers'
  })
  .end()
```
输出如下：
```
{
  "chinese": 22,
  "math": 18,
  "english": 21,
  "other": 123
}
```
**使用计算出的新字段作为根节点**

假设我们有一个 roles 集合，内容如下：
```
{ "_id": 1, "first_name": "四郎", "last_name": "黄" }
{ "_id": 2, "first_name": "邦德", "last_name": "马" }
{ "_id": 3, "first_name": "牧之", "last_name": "张" }
```
下面的代码使用 replaceRoot，把 first_name 和 last_name 拼在一起：
```
const { concat } = db.command.aggregate
db.collection('roles')
  .aggregate()
  .replaceRoot({
    newRoot: {
      full_name: concat(['$last_name', '$first_name'])
    }
  })
  .end()
```
输出如下：
```
{ "full_name": "黄四郎" }
{ "full_name": "马邦德" }
{ "full_name": "张牧之" }
```

### sample

聚合阶段。随机从文档中选取指定数量的记录。

**API 说明**

**sample 的形式如下：**
```
sample({
    size: <正整数>
})
```
请注意：size 是正整数，否则会出错。

**示例**

假设文档 users 有以下记录：
```
{ "name": "a" }
{ "name": "b" }
```

**随机选取**

如果现在进行抽奖活动，需要选出一名幸运用户。那么 sample 的调用方式如下：
```
db.collection('users')
  .aggregate()
  .sample({
    size: 1
  })
  .end()
```

返回了随机选中的一个用户对应的记录，结果如下：

```
{ "_id": "696529e4-7e82-4e7f-812e-5144714edff6", "name": "b" }
```

### skip

聚合阶段。指定一个正整数，跳过对应数量的文档，输出剩下的文档。

**示例**
```
db.collection('users')
  .aggregate()
  .skip(5)
  .end()
```

这段代码会跳过查找到的前 5 个文档，并且把剩余的文档输出。

### sort

聚合阶段。根据指定的字段，对输入的文档进行排序。

**API 说明**

**形式如下：**
```
sort({
    <字段名1>: <排序规则>,
    <字段名2>: <排序规则>,
})
```

<排序规则>可以是以下取值：

- 1 代表升序排列（从小到大）；
- -1 代表降序排列（从大到小）；

**示例**

升序/降序排列

假设我们有集合 articles，其中包含数据如下：
```
{ "_id": "1", "author": "stark",  "score": 80, "age": 18 }
{ "_id": "2", "author": "bob",    "score": 60, "age": 18 }
{ "_id": "3", "author": "li",     "score": 55, "age": 19 }
{ "_id": "4", "author": "jimmy",  "score": 60, "age": 22 }
{ "_id": "5", "author": "justan", "score": 95, "age": 33 }
```
```
db.collection('articles')
  .aggregate()
  .sort({
      age: -1,
      score: -1
  })
  .end()
```
上面的代码在 students 集合中进行聚合搜索，并且将结果排序，首先根据 age 字段降序排列，然后再根据 score 字段进行降序排列。

输出结果如下：
```
{ "_id": "5", "author": "justan", "score": 95, "age": 33 }
{ "_id": "4", "author": "jimmy",  "score": 60, "age": 22 }
{ "_id": "3", "author": "li",     "score": 55, "age": 19 }
{ "_id": "1", "author": "stark",  "score": 80, "age": 18 }
{ "_id": "2", "author": "bob",    "score": 60, "age": 18 }
```

### sortByCount

聚合阶段。根据传入的表达式，将传入的集合进行分组（group）。然后计算不同组的数量，并且将这些组按照它们的数量进行排序，返回排序后的结果。

**API 说明**

**sortByCount 的调用方式如下：**
```
sortByCount(<表达式>)
```

表达式的形式是：$ + 指定字段。请注意：不要漏写 $ 符号。

**示例**

**统计基础类型**

假设集合 passages 的记录如下：
```
{ "category": "Web" }
{ "category": "Web" }
{ "category": "Life" }
```
下面的代码就可以统计文章的分类信息，并且计算每个分类的数量。即对 category 字段执行 sortByCount 聚合操作。
```
db.collection('passages')
  .aggregate()
  .sortByCount('$category')
  .end()
```

返回的结果如下所示：Web 分类下有2篇文章，Life 分类下有1篇文章。
```
{ "_id": "Web", "count": 2 }
{ "_id": "Life", "count": 1 }
```
**解构数组类型**

假设集合 passages 的记录如下：tags 字段对应的值是数组类型。
```
{ "tags": [ "JavaScript", "C#" ] }
{ "tags": [ "Go", "C#" ] }
{ "tags": [ "Go", "Python", "JavaScript" ] }
```
如何统计文章的标签信息，并且计算每个标签的数量？因为 tags 字段对应的数组，所以需要借助 unwind 操作解构 tags 字段，然后再调用 sortByCount。

下面的代码实现了这个功能：
```
db.collection('passages')
  .aggregate()
  .unwind(`$tags`)
  .sortByCount(`$tags`)
  .end()
```
返回的结果如下所示：
```
{ "_id": "Go", "count": 2 }
{ "_id": "C#", "count": 2 }
{ "_id": "JavaScript", "count": 2 }
{ "_id": "Python", "count": 1 }
```

### unwind

聚合阶段。使用指定的数组字段中的每个元素，对文档进行拆分。拆分后，文档会从一个变为一个或多个，分别对应数组的每个元素。

**API 说明**

使用指定的数组字段中的每个元素，对文档进行拆分。拆分后，文档会从一个变为一个或多个，分别对应数组的每个元素。

**unwind 有两种使用形式：**

**参数是一个字段名**
```
unwind(<字段名>)
```
**参数是一个对象**
```
unwind({
    path: <字段名>,
    includeArrayIndex: <string>,
    preserveNullAndEmptyArrays: <boolean>
})
```

|字段												|类型		|说明																																																																								|
|----												|----		|----																																																																								|
|path												|string	|想要拆分的数组的字段名，需要以 $ 开头。																																																						|
|includeArrayIndex					|string	|可选项，传入一个新的字段名，数组索引会保存在这个新的字段上。新的字段名不能以 $ 开头。																															|
|preserveNullAndEmptyArrays	|boolean|如果为 true，那么在 path 对应的字段为 null、空数组或者这个字段不存在时，依然会输出这个文档；如果为 false，unwind 将不会输出这些文档。默认为 false。|

**示例**

**拆分数组**

假设我们有一个 products 集合，包含数据如下：
```
{ "_id": "1", "product": "tshirt", "size": ["S", "M", "L"] }
{ "_id": "2", "product": "pants", "size": [] }
{ "_id": "3", "product": "socks", "size": null }
{ "_id": "4", "product": "trousers", "size": ["S"] }
{ "_id": "5", "product": "sweater", "size": ["M", "L"] }
```

我们根据 size 字段对这些文档进行拆分
```
db.collection('products')
  .aggregate()
  .unwind('$size')
  .end()
```

输出如下：
```
{ "_id": "1", "product": "tshirt", "size": "S" }
{ "_id": "1", "product": "tshirt", "size": "M" }
{ "_id": "1", "product": "tshirt", "size": "L" }
{ "_id": "4", "product": "trousers", "size": "S" }
{ "_id": "5", "product": "sweater", "size": "M" }
{ "_id": "5", "product": "sweater", "size": "L" }
```

**拆分后，保留原数组的索引**

我们根据 size 字段对文档进行拆分后，想要保留原数组索引在新的 index 字段中。
```
db.collection('products')
  .aggregate()
  .unwind({
      path: '$size',
      includeArrayIndex: 'index'
  })
  .end()
```
输出如下：
```
{ "_id": "1", "product": "tshirt", "size": "S", "index": 0 }
{ "_id": "1", "product": "tshirt", "size": "M", "index": 1 }
{ "_id": "1", "product": "tshirt", "size": "L", "index": 2 }
{ "_id": "4", "product": "trousers", "size": "S", "index": 0 }
{ "_id": "5", "product": "sweater", "size": "M", "index": 0 }
{ "_id": "5", "product": "sweater", "size": "L", "index": 1 }
```

**保留字段为空的文档**

注意到我们的集合中有两行特殊的空值数据：
```
...
{ "_id": "2", "product": "pants", "size": [] }
{ "_id": "3", "product": "socks", "size": null }
...
```
如果想要在输出中保留 size 为空数组、null，或者 size 字段不存在的文档，可以使用 preserveNullAndEmptyArrays 参数
```
db.collection('products')
  .aggregate()
  .unwind({
      path: '$size',
      preserveNullAndEmptyArrays: true
  })
  .end()
```
输出如下：
```
{ "_id": "1", "product": "tshirt", "size": "S" }
{ "_id": "1", "product": "tshirt", "size": "M" }
{ "_id": "1", "product": "tshirt", "size": "L" }
{ "_id": "2", "product": "pants", "size": null }
{ "_id": "3", "product": "socks", "size": null }
{ "_id": "4", "product": "trousers", "size": "S" }
{ "_id": "5", "product": "sweater", "size": "M" }
{ "_id": "5", "product": "sweater", "size": "L" }
```

### end

标志聚合操作定义完成，发起实际聚合操作

**返回值**

Promise.&lt;Object&gt;

|属性	|类型							|说明					|
|---	|---							|---					|
|list	|Array.&lt;any&gt;|聚合结果列表	|

**示例代码**
```
const $ = db.command.aggregate
db.collection('books').aggregate()
  .group({
    // 按 category 字段分组
    _id: '$category',
    // 让输出的每组记录有一个 avgSales 字段，其值是组内所有记录的 sales 字段的平均值
    avgSales: $.avg('$sales')
  })
  .end()
  .then(res => console.log(res))
  .catch(err => console.error(err))
```


## 聚合操作符

### 算术操作符

#### abs

聚合操作符。返回一个数字的绝对值。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.abs(<number>)
```
`abs` 传入的值除了数字常量外，也可以是任何最终解析成一个数字的表达式。  

 如果表达式解析为 `null` 或者指向一个不存在的字段，则 `abs` 的结果是 `null`。如果值解析为 `NaN`，则结果是 `NaN`。  

 
#####  示例代码
 假设集合 `ratings` 有如下记录：  

 
```
{ _id: 1, start: 5, end: 8 }
{ _id: 2, start: 4, end: 4 }
{ _id: 3, start: 9, end: 7 }
{ _id: 4, start: 6, end: 7 }
```
···
可以用如下方式求得各个记录的 `start` 和 `end` 之间的绝对差异大小：  

 
```
const $ = db.command.aggregate
db.collection('ratings').aggregate()
  .project({
    delta: $.abs($.subtract(['$start', '$end']))
  })
  .end()
```
返回结果如下：  

 
```
{ "_id" : 1, "delta" : 3 }
{ "_id" : 2, "delta" : 0 }
{ "_id" : 3, "delta" : 2 }
{ "_id" : 4, "delta" : 1 }
```

#### add

聚合操作符。将数字相加或将数字加在日期上。如果数组中的其中一个值是日期，那么其他值将被视为毫秒数加在该日期上。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.add([<表达式1>, <表达式2>, ...])
```
表达式可以是形如 `$ + 指定字段`，也可以是普通字符串。只要能够被解析成字符串即可。  

 
#####  示例代码
 假设集合 `staff` 有如下记录：  

 
```
{ _id: 1, department: "x", sales: 5, engineer: 10, lastUpdate: ISODate("2019-05-01T00:00:00Z") }
{ _id: 2, department: "y", sales: 10, engineer: 20, lastUpdate: ISODate("2019-05-01T02:00:00Z") }
{ _id: 3, department: "z", sales: 20, engineer: 5, lastUpdate: ISODate("2019-05-02T03:00:00Z") }
```


**数字求和**

 可以用如下方式求得各个记录人数总数：  

 
```
const $ = db.command.aggregate
db.collection('staff').aggregate()
  .project({
    department: 1,
    total: $.add(['$sales', '$engineer'])
  })
  .end()
```
返回结果如下：  

 
```
{ _id: 1, department: "x", total: 15 }
{ _id: 2, department: "y", total: 30 }
{ _id: 3, department: "z", total: 25 }
```


**增加日期值**

 如下操作可以获取各个记录的 `lastUpdate` 加一个小时之后的值：  

 
```
const $ = db.command.aggregate
db.collection('staff').aggregate()
  .project({
    department: 1,
    lastUpdate: $.add(['$lastUpdate', 60*60*1000])
  })
  .end()
```
返回结果如下：  

 
```
{ _id: 1, department: "x", lastUpdate: ISODate("2019-05-01T01:00:00Z") }
{ _id: 2, department: "y", lastUpdate: ISODate("2019-05-01T03:00:00Z") }
{ _id: 3, department: "z", lastUpdate: ISODate("2019-05-02T04:00:00Z") }
```

#### ceil

聚合操作符。向上取整，返回大于或等于给定数字的最小整数。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.ceil(<number>)
```
`<number>` 可以是任意解析为数字的表达式。如果表达式解析为 `null` 或指向一个不存在的字段，则返回 `null`，如果解析为 `NaN`，则返回 `NaN`。  

 
#####  示例代码
 假设集合 `sales` 有如下记录：  

 
```
{ _id: 1, sales: 5.2 }
{ _id: 2, sales: 1.32 }
{ _id: 3, sales: -3.2 }
```
可以用如下方式取各个数字的向上取整值：  

 
```
const $ = db.command.aggregate
db.collection('sales').aggregate()
  .project({
    sales: $.ceil('$sales')
  })
  .end()
```
返回结果如下：  

 
```
{ _id: 1, sales: 6 }
{ _id: 2, sales: 2 }
{ _id: 3, sales: -3 }
```

#### divide

聚合操作符。传入被除数和除数，求商。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.divide([<被除数表达式>, <除数表达式>])
```
表达式可以是任意解析为数字的表达式。  

 
#####  示例代码
 假设集合 `railroads` 有如下记录：  

 
```
{ _id: 1, meters: 5300 }
{ _id: 2, meters: 64000 }
{ _id: 3, meters: 130 }
```
可以用如下方式取各个数字转换为千米之后的值：  

 
```
const $ = db.command.aggregate
db.collection('railroads').aggregate()
  .project({
    km: $.divide(['$meters', 1000])
  })
  .end()
```
返回结果如下：  

 
```
{ _id: 1, km: 5.3 }
{ _id: 2, km: 64 }
{ _id: 3, km: 0.13 }
```

#### exp

聚合操作符。取 e（自然对数的底数，欧拉数） 的 n 次方。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.exp(<exponent>)
```
`<exponent>` 可以是任意解析为数字的表达式。如果表达式解析为 `null` 或指向一个不存在的字段，则返回 `null`，如果解析为 `NaN`，则返回 `NaN`。  

 
#####  示例代码
 假设集合 `math` 有如下记录：  

 
```
{ _id: 1, exp: 0 }
{ _id: 2, exp: 1 }
{ _id: 3, exp: 2 }
```

```
const $ = db.command.aggregate
db.collection('math').aggregate()
  .project({
    result: $.exp('$exp')
  })
  .end()
```
返回结果如下：  

 
```
{ _id: 1, result: 1 }
{ _id: 2, result: 2.71828182845905 }
{ _id: 3, result: 7.38905609893065 }
```

#### floor

聚合操作符。向下取整，返回大于或等于给定数字的最小整数。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.floor(<number>)
```
`<number>` 可以是任意解析为数字的表达式。如果表达式解析为 `null` 或指向一个不存在的字段，则返回 `null`，如果解析为 `NaN`，则返回 `NaN`。  

 
#####  示例代码
 假设集合 `sales` 有如下记录：  

 
```
{ _id: 1, sales: 5.2 }
{ _id: 2, sales: 1.32 }
{ _id: 3, sales: -3.2 }
```
可以用如下方式取各个数字的向下取整值：  

 
```
const $ = db.command.aggregate
db.collection('sales').aggregate()
  .project({
    sales: $.floor('$sales')
  })
  .end()
```
返回结果如下：  

 
```
{ _id: 1, sales: 5 }
{ _id: 2, sales: 1 }
{ _id: 3, sales: -6 }
```

#### ln

聚合操作符。计算给定数字在自然对数值。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.ln(<number>)
```
`<number>` 可以是任意解析为非负数字的表达式。  

 `ln` 等价于 `log([<number>, Math.E])`，其中 `Math.E` 是 `JavaScript` 获取 `e` 的值的方法。  

 
#####  示例代码
 
#####  db.command.aggregate.ln
 聚合操作符。计算给定数字在自然对数值。  

 语法如下：  

 
```
db.command.aggregate.ln(<number>)
```
`<number>` 可以是任意解析为非负数字的表达式。  

 `ln` 等价于 `log([<number>, Math.E])`，其中 `Math.E` 是 `JavaScript` 获取 `e` 的值的方法。

#### log

聚合操作符。计算给定数字在给定对数底下的 log 值。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.log([<number>, <base>])
```
`<number>` 可以是任意解析为非负数字的表达式。`<base>` 可以是任意解析为大于 1 的数字的表达式。  

 如果任一参数解析为 `null` 或指向任意一个不存在的字段，`log` 返回 `null`。如果任一参数解析为 `NaN`，`log` 返回 `NaN`。  

 
#####  示例代码
 假设集合 `curve` 有如下记录：  

 
```
{ _id: 1, x: 1 }
{ _id: 2, x: 2 }
{ _id: 3, x: 3 }
```
计算 `log2(x)` 的值：  

 
```
const $ = db.command.aggregate
db.collection('staff').aggregate()
  .project({
    log: $.log(['$x', 2])
  })
  .end()
```
返回结果如下：  

 
```
{ _id: 1, log: 0 }
{ _id: 2, log: 1 }
{ _id: 3, log: 1.58496250072 }
```

#### log10

聚合操作符。计算给定数字在对数底为 10 下的 log 值。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.log(<number>)
```
`<number>` 可以是任意解析为非负数字的表达式。  

 `log10` 等同于 `log` 方法的第二个参数固定为 10。  

 
#####  示例代码
 
#####  db.command.aggregate.log10
 聚合操作符。计算给定数字在对数底为 10 下的 log 值。  

 语法如下：  

 
```
db.command.aggregate.log(<number>)
```
`<number>` 可以是任意解析为非负数字的表达式。  

 `log10` 等同于 `log` 方法的第二个参数固定为 10。

#### mod

聚合操作符。取模运算，取数字取模后的值。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.mod([<dividend>, <divisor>])
```
第一个数字是被除数，第二个数字是除数。参数可以是任意解析为数字的表达式。  

 
#####  示例代码
 假设集合 `shopping` 有如下记录：  

 
```
{ _id: 1, bags: 3, items: 5 }
{ _id: 2, bags: 2, items: 8 }
{ _id: 3, bags: 5, items: 16 }
```
各记录取 `items` 除以 `bags` 的余数（`items % bags`）：  

 
```
const $ = db.command.aggregate
db.collection('shopping').aggregate()
  .project({
    overflow: $.mod(['$items', '$bags'])
  })
  .end()
```
返回结果如下：  

 
```
{ _id: 1, log: 2 }
{ _id: 2, log: 0 }
{ _id: 3, log: 1 }
```

#### multiply

聚合操作符。取传入的数字参数相乘的结果。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.multiply([<expression1>, <expression2>, ...])
```
参数可以是任意解析为数字的表达式。  

 
#####  示例代码
 假设集合 `fruits` 有如下记录：  

 
```
{ "_id": 1, "name": "apple", "price": 10, "quantity": 100 }
{ "_id": 2, "name": "orange", "price": 15, "quantity": 50 }
{ "_id": 3, "name": "lemon", "price": 5, "quantity": 20 }
```
求各个水果的的总价值：  

 
```
const $ = db.command.aggregate
db.collection('fruits').aggregate()
  .project({
    name: 1,
    total: $.multiply(['$price', '$quantity']),
  })
  .end()
```
返回结果如下：  

 
```
{ "_id": 1, "name": "apple", "total": 1000 }
{ "_id": 2, "name": "orange", "total": 750 }
{ "_id": 3, "name": "lemo", "total": 100 }
```

#### pow

聚合操作符。求给定基数的指数次幂。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.pow([<base>, <exponent>])
```
参数可以是任意解析为数字的表达式。  

 
#####  示例代码
 假设集合 `stats` 有如下记录：  

 
```
{ "_id": 1, "x": 2, "y": 3 }
{ "_id": 2, "x": 5, "y": 7 }
{ "_id": 3, "x": 10, "y": 20 }
```
求 `x` 和 `y` 的平方和：  

 
```
const $ = db.command.aggregate
db.collection('stats').aggregate()
  .project({
    sumOfSquares: $.add([$.pow(['$x', 2]), $.pow(['$y', 2])]),
  })
  .end()
```
返回结果如下：  

 
```
{ "_id": 1, "sumOfSquares": 13 }
{ "_id": 2, "sumOfSquares": 74 }
{ "_id": 3, "sumOfSquares": 500 }
```

#### sqrt

聚合操作符。求平方根。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.sqrt([<number>])
```
参数可以是任意解析为非负数字的表达式。  

 
#####  示例代码
 假设直角三角形集合 `triangle` 有如下记录：  

 
```
{ "_id": 1, "x": 2, "y": 3 }
{ "_id": 2, "x": 5, "y": 7 }
{ "_id": 3, "x": 10, "y": 20 }
```
假设 `x` 和 `y` 分别为两直角边，则求斜边长：  

 
```
const $ = db.command.aggregate
db.collection('triangle').aggregate()
  .project({
    len: $.sqrt([$.add([$.pow(['$x', 2]), $.pow(['$y', 2])])]),
  })
  .end()
```
返回结果如下：  

 
```
{ "_id": 1, "len": 3.605551275463989 }
{ "_id": 2, "len": 8.602325267042627 }
{ "_id": 3, "len": 22.360679774997898 }
```

#### subtract

聚合操作符。将两个数字相减然后返回差值，或将两个日期相减然后返回相差的毫秒数，或将一个日期减去一个数字返回结果的日期。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.subtract([<expression1>, <expression2>])
```
参数可以是任意解析为数字或日期的表达式。  

 
#####  示例代码
 假设集合 `scores` 有如下记录：  

 
```
{ "_id": 1, "max": 10, "min": 1 }
{ "_id": 2, "max": 7, "min": 5 }
{ "_id": 3, "max": 6, "min": 6 }
```
求各个记录的 `max` 和 `min` 的差值。：  

 
```
const $ = db.command.aggregate
db.collection('scores').aggregate()
  .project({
    diff: $.subtract(['$max', '$min'])
  })
  .end()
```
返回结果如下：  

 
```
{ "_id": 1, "diff": 9 }
{ "_id": 2, "diff": 2 }
{ "_id": 3, "diff": 0 }
```

#### trunc

聚合操作符。将数字截断为整形。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.trunc(<number>)
```
参数可以是任意解析为数字的表达式。  

 
#####  示例代码
 假设集合 `scores` 有如下记录：  

 
```
{ "_id": 1, "value": 1.21 }
{ "_id": 2, "value": 3.83 }
{ "_id": 3, "value": -4.94 }
```

```
const $ = db.command.aggregate
db.collection('scores').aggregate()
  .project({
    int: $.trunc('$value')
  })
  .end()
```
返回结果如下：  

 
```
{ "_id": 1, "value": 1 }
{ "_id": 2, "value": 3 }
{ "_id": 3, "value": -4 }
```

### 数组操作符

#### arrayElemAt

聚合操作符。返回在指定数组下标的元素。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.arrayElemAt([<array>, <index>])
```
`<array>` 可以是任意解析为数字的表达式。  

 `<index>` 可以是任意解析为整形的表达式。如果是正数，`arrayElemAt` 返回在 `index` 位置的元素，如果是负数，`arrayElemAt` 返回从数组尾部算起的 `index` 位置的元素。  

 
#####  示例代码
 假设集合 `exams` 有如下记录：  

 
```
{ "_id": 1, "scores": [80, 60, 65, 90] }
{ "_id": 2, "scores": [78] }
{ "_id": 3, "scores": [95, 88, 92] }
```
求各个第一次考试的分数和和最后一次的分数：  

 
```
const $ = db.command.aggregate
db.collection('exams').aggregate()
  .project({
    first: $.arraElemAt(['$scores', 0]),
    last: $.arraElemAt(['$scores', -1]),
  })
  .end()
```
返回结果如下：  

 
```
{ "_id": 1, "first": 80, "last": 90 }
{ "_id": 2, "first": 78, "last": 78 }
{ "_id": 3, "first": 95, "last": 92 }
```

#### arrayToObject

聚合操作符。将一个数组转换为对象。  

     
#####  API 说明
 语法可以取两种：  

 第一种：传入一个二维数组，第二维的数组长度必须为 2，其第一个值为字段名，第二个值为字段值  

 
```
db.command.aggregate.arrayToObject([
  [<key1>, <value1>],
  [<key2>, <value2>],
  ...
])
```
第二种：传入一个对象数组，各个对象必须包含字段 `k` 和 `v`，分别指定字段名和字段值  

 
```
db.command.aggregate.arrayToObject([
  { "k": <key1>, "v": <value1> },
  { "k": <key2>, "v": <value2> },
  ...
])
```
传入 `arrayToObject` 的参数只要可以解析为上述两种表示法之一即可。  

 
#####  示例代码
 假设集合 `shops` 有如下记录：  

 
```
{ "_id": 1, "sales": [ ["max", 100], ["min", 50] ] }
{ "_id": 2, "sales": [ ["max", 70], ["min", 60] ] }
{ "_id": 3, "sales": [ { "k": "max", "v": 50 }, { "k": "min", "v": 30 } ] }
```
求各个第一次考试的分数和和最后一次的分数：  

 
```
const $ = db.command.aggregate
db.collection('shops').aggregate()
  .project({
    sales: $.arrayToObject('$sales'),
  })
  .end()
```
返回结果如下：  

 
```
{ "_id": 1, "sales": { "max": 100, "min": 50 } }
{ "_id": 2, "sales": { "max": 70, "min": 60 } }
{ "_id": 3, "sales": { "max": 50, "min": 30 } }
```

#### concatArrays

聚合操作符。将多个数组拼接成一个数组。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.arrayToObject([ <array1>, <array2>, ... ])
```
参数可以是任意解析为数组的表达式。  

 
#####  示例代码
 假设集合 `items` 有如下记录：  

 
```
{ "_id": 1, "fruits": [ "apple" ], "vegetables": [ "carrot" ] }
{ "_id": 2, "fruits": [ "orange", "lemon" ], "vegetables": [ "cabbage" ] }
{ "_id": 3, "fruits": [ "strawberry" ], "vegetables": [ "spinach" ] }
```

```
const $ = db.command.aggregate
db.collection('items').aggregate()
  .project({
    list: $.concatArrays(['$fruits', '$vegetables']),
  })
  .end()
```
返回结果如下：  

 
```
{ "_id": 1, "list": [ "apple", "carrot" ] }
{ "_id": 2, "list": [ "orange", "lemon", "cabbage" ] }
{ "_id": 3, "list": [ "strawberry", "spinach" ] }
```

#### filter

聚合操作符。根据给定条件返回满足条件的数组的子集。  

     
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.filter({
  input: <array>,
  as: <string>,
  cond: <expression>
})
```

|字段	|说明																																																											|
|----	|----																																																											|
|input|一个可以解析为数组的表达式																																																|
|as		|可选，用于表示数组各个元素的变量，默认为 this																																						|
|cond	|一个可以解析为布尔值的表达式，用于判断各个元素是否满足条件，各个元素的名字由 as 参数决定（参数名需加 $$ 前缀，如 $$this）|

参数可以是任意解析为数组的表达式。  

 
#####  示例代码
 假设集合 `fruits` 有如下记录：  

 
```
{
  "_id": 1,
  "stock": [
    { "name": "apple", "price": 10 },
    { "name": "orange", "price": 20 }
  ],
}
{
  "_id": 2,
  "stock": [
    { "name": "lemon", "price": 15 },
  ],
}
```

```
const _ = db.command
const $ = db.command.aggregate
db.collection('fruits').aggregate()
  .project({
    stock: $.filter({
      input: '$stock',
      as: 'item',
      cond: $.gte(['$$item.price', 15])
    })
  })
  .end()
```
返回结果如下：  

 
```
{ "_id": 1, "stock": [ { "name": "orange", "price": 20} ] }
{ "_id": 2, "stock": [ { "name": "lemon", "price": 15 } ] }
```

#### in

聚合操作符。给定一个值和一个数组，如果值在数组中则返回 `true`，否则返回 `false`。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.in([<value>, <array>])
```
`<value>` 可以是任意表达式。  

 `<array>` 可以是任意解析为数组的表达式。  

 
#####  示例代码
 假设集合 `shops` 有如下记录：  

 
```
{ "_id": 1, "topsellers": ["bread", "ice cream", "butter"] }
{ "_id": 2, "topsellers": ["ice cream", "cheese", "yagurt"] }
{ "_id": 3, "topsellers": ["croissant", "cucumber", "coconut"] }
```
标记销量最高的商品包含 `ice cream` 的记录。  

 
```
const $ = db.command.aggregate
db.collection('price').aggregate()
  .project({
    included: $.in(['ice cream', '$topsellers'])
  })
  .end()
```
返回结果如下：  

 
```
{ "_id": 1, "included": true }
{ "_id": 2, "included": true }
{ "_id": 3, "included": false }
```

#### indexOfArray

聚合操作符。在数组中找出等于给定值的第一个元素的下标，如果找不到则返回 -1。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.indexOfArray([ <array expression>, <search expression>, <start>, <end> ])
```

|字段	|类型		|说明																																						|
|----	|----		|----																																						|
|-		|string	|一个可以解析为数组的表达式，如果解析为 null，则 indexOfArray 返回 null					|
|-		|string	|对数据各个元素应用的条件匹配表达式																							|
|-		|integer|可选，用于指定搜索的开始下标，必须是非负整数																		|
|-		|integer|可选，用于指定搜索的结束下标，必须是非负整数，指定了 时也应指定 ，否则 默认当做|

参数可以是任意解析为数组的表达式。  

 
#####  示例代码
 假设集合 `stats` 有如下记录：  

 
```
{
  "_id": 1,
  "sales": [ 1, 6, 2, 2, 5 ]
}
{
  "_id": 2,
  "sales": [ 4, 2, 1, 5, 2 ]
}
{
  "_id": 3,
  "sales": [ 2, 5, 3, 3, 1 ]
}
```

```
const $ = db.command.aggregate
db.collection('stats').aggregate()
  .project({
    index: $.indexOfArray(['$sales', 2, 2])
  })
  .end()
```
返回结果如下：  

 
```
{ "_id": 1, "index": 2 }
{ "_id": 2, "index": 4 }
{ "_id": 3, "index": -1 }
```

#### isArray

聚合操作符。判断给定表达式是否是数组，返回布尔值。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.isArray(<expression>)
```
参数可以是任意表达式。  

 
#####  示例代码
 假设集合 `stats` 有如下记录：  

 
```
{
  "_id": 1,
  "base": 10,
  "sales": [ 1, 6, 2, 2, 5 ]
}
{
  "_id": 2,
  "base": 1,
  "sales": 100
}
```
计算总销量，如果 `sales` 是数字，则求 `sales * base`，如果 `sales` 是数组，则求数组元素之和与 `base` 的乘积。  

 
```
const $ = db.command.aggregate
db.collection('stats').aggregate()
  .project({
    sum: $.cond({
      if: $.isArray('$sales'),
      then: $.multiply([$.sum(['$sales']), '$base']),
      else: $.multiply(['$sales', '$base']),
    })
  })
  .end()
```
返回结果如下：  

 
```
{ "_id": 1, "index": 160 }
{ "_id": 2, "index": 100 }
```

#### map

聚合操作符。类似 JavaScript Array 上的 `map` 方法，将给定数组的每个元素按给定转换方法转换后得出新的数组。  

     
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.map({
  input: <expression>,
  as: <string>,
  in: <expression>
})
```

|字段	|说明																																																			|
|----	|----																																																			|
|input|一个可以解析为数组的表达式																																								|
|as		|可选，用于表示数组各个元素的变量，默认为 this																														|
|in		|一个可以应用在给定数组的各个元素上的表达式，各个元素的名字由 as 参数决定（参数名需加 $$ 前缀，如 $$this）|

#####  示例代码
 假设集合 `stats` 有如下记录：  

 
```
{
  "_id": 1,
  "sales": [ 1.32, 6.93, 2.48, 2.82, 5.74 ]
}
{
  "_id": 2,
  "sales": [ 2.97, 7.13, 1.58, 6.37, 3.69 ]
}
```
将各个数字截断为整形，然后求和  

 
```
const $ = db.command.aggregate
db.collection('stats').aggregate()
  .project({
    truncated: $.map({
      input: '$sales',
      as: 'num',
      in: $.trunc('$$num'),
    })
  })
  .project({
    total: $.sum('$truncated')
  })
  .end()
```
返回结果如下：  

 
```
{ "_id": 1, "index": 16 }
{ "_id": 2, "index": 19 }
```

#### objectToArray

聚合操作符。将一个对象转换为数组。方法把对象的每个键值对都变成输出数组的一个元素，元素形如 `{ k: <key>, v: <value> }`。  

     
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.objectToArray(<object>)
```

#####  示例代码
 假设集合 `items` 有如下记录：  

 
```
{ "_id": 1, "attributes": { "color": "red", "price": 150 } }
{ "_id": 2, "attributes": { "color": "blue", "price": 50 } }
{ "_id": 3, "attributes": { "color": "yellow", "price": 10 } }
```

```
const $ = db.command.aggregate
db.collection('items').aggregate()
  .project({
    array: $.objectToArray('$attributes')
  })
  .end()
```
返回结果如下：  

 
```
{ "_id": 1, "array": [{ "k": "color", "v": "red" }, { "k": "price", "v": 150 }] }
{ "_id": 2, "array": [{ "k": "color", "v": "blue" }, { "k": "price", "v": 50 }] }
{ "_id": 3, "array": [{ "k": "color", "v": "yellow" }, { "k": "price", "v": 10 }] }
```

#### range

聚合操作符。返回一组生成的序列数字。给定开始值、结束值、非零的步长，`range` 会返回从开始值开始逐步增长、步长为给定步长、但不包括结束值的序列。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.range([<start>, <end>, <non-zero step>])
```

|字段					|说明																									|
|----					|----																									|
|start				|开始值，一个可以解析为整形的表达式										|
|end					|结束值，一个可以解析为整形的表达式										|
|non-zero step|可选，步长，一个可以解析为非零整形的表达式，默认为 1	|

#####  示例代码
 假设集合 `stats` 有如下记录：  

 
```
{ "_id": 1, "max": 52 }
{ "_id": 2, "max": 38 }
```

```
const $ = db.command.aggregate
db.collection('stats').aggregate()
  .project({
    points: $.range([0, '$max', 10])
  })
  .end()
```
返回结果如下：  

 
```
{ "_id": 1, "points": [0, 10, 20, 30, 40, 50] }
{ "_id": 2, "points": [0, 10, 20] }
```

#### reduce

聚合操作符。类似 JavaScript 的 `reduce` 方法，应用一个表达式于数组各个元素然后归一成一个元素。  

     
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.reduce({
  input: <array>
  initialValue: <expression>,
  in: <expression>
})
```

|字段					|说明																																																				|
|----					|----																																																				|
|input				|输入数组，可以是任意解析为数组的表达式																																			|
|initialValue	|初始值																																																			|
|in						|用来作用于每个元素的表达式，在 in 中有两个可用变量，value 是表示累计值的变量，this 是表示当前数组元素的变量|

#####  示例代码
 

**简易字符串拼接**

 假设集合 `player` 有如下记录：  

 
```
{ "_id": 1, "fullname": [ "Stephen", "Curry" ] }
{ "_id": 2, "fullname": [ "Klay", "Thompsom" ] }
```
获取各个球员的全名，并加 `Player:` 前缀：  

 
```
const $ = db.command.aggregate
db.collection('player').aggregate()
  .project({
    info: $.reduce({
      input: '$fullname',
      initialValue: 'Player:',
      in: $.concat(['$$value', ' ', '$$this']),
    })
  })
  .end()
```
返回结果如下：  

 
```
{ "_id": 1, "info": "Player: Stephen Curry" }
{ "_id": 2, "info": "Player: Klay Thompson" }
```
获取各个球员的全名，不加前缀：  

 
```
const $ = db.command.aggregate
db.collection('player').aggregate()
  .project({
    name: $.reduce({
      input: '$fullname',
      initialValue: '',
      in: $.concat([
        '$$value',
        $.cond({
          if: $.eq(['$$value', '']),
          then: '',
          else: ' ',
        }),
        '$$this',
      ]),
    })
  })
  .end()
```
返回结果如下：  

 
```
{ "_id": 1, "name": "Stephen Curry" }
{ "_id": 2, "name": "Klay Thompson" }
```

#### reverseArray

聚合操作符。返回给定数组的倒序形式。  

     
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.reverseArray(<array>)
```
参数可以是任意解析为数组表达式。  

 
#####  示例代码
 假设集合 `stats` 有如下记录：  

 
```
{
  "_id": 1,
  "sales": [ 1, 2, 3, 4, 5 ]
}
```
取 `sales` 倒序：  

 
```
const $ = db.command.aggregate
db.collection('stats').aggregate()
  .project({
    reversed: $.reverseArray('$sales'),
  })
  .end()
```
返回结果如下：  

 
```
{ "_id": 1, "reversed": [5, 4, 3, 2, 1] }
```

#### size

聚合操作符。返回数组长度。  

     
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.size(<array>)
```
`<array>` 可以是任意解析为数组的表达式。  

 
#####  示例代码
 假设集合 `shops` 有如下记录：  

 
```
{ "_id": 1, "staff": [ "John", "Middleton", "George" ] }
{ "_id": 2, "staff": [ "Steph", "Jack" ] }
```
计算各个商店的雇员数量：  

 
```
const $ = db.command.aggregate
db.collection('staff').aggregate()
  .project({
    totalStaff: $.size('$staff')
  })
  .end()
```
返回结果如下：  

 
```
{ "_id": 1, "totalStaff": 3 }
{ "_id": 2, "totalStaff": 2 }
```

#### slice

聚合操作符。类似 JavaScritp 的 `slice` 方法。返回给定数组的指定子集。  

      
#####  API 说明
 语法有两种：  

 返回从开头或结尾开始的 `n` 个元素：  

 
```
db.command.aggregate.slice([<array>, <n>])
```
返回从指定位置算作数组开头、再向后或向前的 `n` 个元素：  

 
```
db.command.aggregate.slice([<array>, <position>, <n>])
```
`<array>` 可以是任意解析为数组的表达式。  

 `<position>` 可以是任意解析为整形的表达式。如果是正数，则将数组的第 `<position>` 个元素作为数组开始；如果 `<position>` 比数组长度更长，`slice` 返回空数组。如果是负数，则将数组倒数第 `<position>` 个元素作为数组开始；如果 `<position>` 的绝对值大于数组长度，则开始位置即为数组开始位置。  

 `<n>` 可以是任意解析为整形的表达式。如果 `<position>` 有提供，则 `<n>` 必须为正整数。如果是正数，`slice` 返回前 `n` 个元素。如果是负数，`slice` 返回后 `n` 个元素。  

 
#####  示例代码
 假设集合 `people` 有如下记录：  

 
```
{ "_id": 1, "hobbies": [ "basketball", "football", "tennis", "badminton" ] }
{ "_id": 2, "hobbies": [ "golf", "handball" ] }
{ "_id": 3, "hobbies": [ "table tennis", "swimming", "rowing" ] }
```
统一返回前两个爱好：  

 
```
const $ = db.command.aggregate
db.collection('fruits').aggregate()
  .project({
    hobbies: $.slice(['$hobbies', 2]),
  })
  .end()
```
返回结果如下：  

 
```
{ "_id": 1, "hobbies": [ "basketball", "football" ] }
{ "_id": 2, "hobbies": [ "golf", "handball" ] }
{ "_id": 3, "hobbies": [ "table tennis", "swimming" ] }
```

#### zip

聚合操作符。把二维数组的第二维数组中的相同序号的元素分别拼装成一个新的数组进而组装成一个新的二维数组。如可将 `[ [ 1, 2, 3 ], [ "a", "b", "c" ] ]` 转换成 `[ [ 1, "a" ], [ 2, "b" ], [ 3, "c" ] ]`。  

     
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.zip({
  inputs: [<array1>, <array2>, ...],
  useLongestLength: <boolean>,
  defaults: <array>
})
```
`inputs` 是一个二维数组（`inputs` 不可以是字段引用），其中每个元素的表达式（这个可以是字段引用）都可以解析为数组。如果其中任意一个表达式返回 `null`，`<inputs>` 也返回 `null`。如果其中任意一个表达式不是指向一个合法的字段 / 解析为数组 / 解析为 `null`，则返回错误。  

 `useLongestLength` 决定输出数组的长度是否采用输入数组中的最长数组的长度。默认为 `false`，即输入数组中的最短的数组的长度即是输出数组的各个元素的长度。  

 `defaults` 是一个数组，用于指定在输入数组长度不一的情况下时采用的数组各元素默认值。指定这个字段则必须指定 `useLongestLength`，否则返回错误。如果 `useLongestLength` 是 `true` 但是 `defaults` 是空或没有指定，则 `zip` 用 `null` 做数组元素的缺省默认值。指定各元素默认值时 `defaults` 数组的长度必须是输入数组最大的长度。  

 
#####  示例代码
 假设集合 `stats` 有如下记录：  

 
```
{ "_id": 1, "zip1": [1, 2], "zip2": [3, 4], "zip3": [5, 6] ] }
{ "_id": 2, "zip1": [1, 2], "zip2": [3], "zip3": [4, 5, 6] ] }
{ "_id": 3, "zip1": [1, 2], "zip2": [3] ] }
```


**只传 inputs**

 
```
const $ = db.command.aggregate
db.collection('items').aggregate()
  .project({
    zip: $.zip({
      inputs: [
        '$zip1', // 字段引用
        '$zip2',
        '$zip3',
      ],
    })
  })
  .end()
```
返回结果如下：  

 
```
{ "_id": 1, "zip": [ [1, 3, 5], [2, 4, 6] ] }
{ "_id": 2, "zip": [ [1, 3, 4] ] }
{ "_id": 3, "zip": null }
```


**设置 useLongestLength**

 如果设 `useLongestLength` 为 `true`：  

 
```
const $ = db.command.aggregate
db.collection('items').aggregate()
  .project({
    zip: $.zip({
      inputs: [
        '$zip1', // 字段引用
        '$zip2',
        '$zip3',
      ],
      useLongestLength: true,
    })
  })
  .end()
```
返回结果如下：  

 
```
{ "_id": 1, "zip": [ [1, 3, 5], [2, 4, 6] ] }
{ "_id": 2, "zip": [ [1, 3, 4], [2, null, 5], [null, null, 6] ] }
{ "_id": 3, "zip": null }
```


**设置 defaults**

 
```
const $ = db.command.aggregate
db.collection('items').aggregate()
  .project({
    zip: $.zip({
      inputs: [
        '$zip1', // 字段引用
        '$zip2',
        '$zip3',
      ],
      useLongestLength: true,
      defaults: [-300, -200, -100],
    })
  })
  .end()
```
返回结果如下：  

 
```
{ "_id": 1, "zip": [ [1, 3, 5], [2, 4, 6] ] }
{ "_id": 2, "zip": [ [1, 3, 4], [2, -200, 5], [-300, -200, 6] ] }
{ "_id": 3, "zip": null }
```

### 布尔操作符

#### and

聚合操作符。给定多个表达式，`and` 仅在所有表达式都返回 `true` 时返回 `true`，否则返回 `false`。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.and([<expression1>, <expression2>, ...])
```
如果表达式返回 `false`、`null`、`0`、或 `undefined`，表达式会解析为 `false`，否则对其他返回值都认为是 `true`。  

 
#####  示例代码
 假设集合 `price` 有如下记录：  

 
```
{ "_id": 1, "min": 10, "max": 100 }
{ "_id": 2, "min": 60, "max": 80 }
{ "_id": 3, "min": 30, "max": 50 }
```
求 `min` 大于等于 30 且 `max` 小于等于 80 的记录。  

 
```
const $ = db.command.aggregate
db.collection('price').aggregate()
  .project({
    fullfilled: $.and([$.gte(['$min', 30]), $.lte(['$max', 80])])
  })
  .end()
```
返回结果如下：  

 
```
{ "_id": 1, "fullfilled": false }
{ "_id": 2, "fullfilled": true }
{ "_id": 3, "fullfilled": true }
```

#### not

聚合操作符。给定一个表达式，如果表达式返回 `true`，则 `not` 返回 `false`，否则返回 `true`。注意表达式不能为逻辑表达式（`and`、`or`、`nor`、`not`）。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.not(<expression>)
```
如果表达式返回 `false`、`null`、`0`、或 `undefined`，表达式会解析为 `false`，否则对其他返回值都认为是 `true`。  

 
#####  示例代码
 假设集合 `price` 有如下记录：  

 
```
{ "_id": 1, "min": 10, "max": 100 }
{ "_id": 2, "min": 60, "max": 80 }
{ "_id": 3, "min": 30, "max": 50 }
```
求 `min` 不大于 40 的记录。  

 
```
const $ = db.command.aggregate
db.collection('price').aggregate()
  .project({
    fullfilled: $.not($.gt(['$min', 40]))
  })
  .end()
```
返回结果如下：  

 
```
{ "_id": 1, "fullfilled": true }
{ "_id": 2, "fullfilled": false }
{ "_id": 3, "fullfilled": true }
```

#### or

聚合操作符。给定多个表达式，如果任意一个表达式返回 `true`，则 `or` 返回 `true`，否则返回 `false`。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.or([<expression1>, <expression2>, ...])
```
如果表达式返回 `false`、`null`、`0`、或 `undefined`，表达式会解析为 `false`，否则对其他返回值都认为是 `true`。  

 
#####  示例代码
 假设集合 `price` 有如下记录：  

 
```
{ "_id": 1, "min": 10, "max": 100 }
{ "_id": 2, "min": 60, "max": 80 }
{ "_id": 3, "min": 30, "max": 50 }
```
求 `min` 小于 40 且 `max` 大于 60 的记录。  

 
```
const $ = db.command.aggregate
db.collection('price').aggregate()
  .project({
    fullfilled: $.or([$.lt(['$min', 30]), $.gt(['$max', 60])])
  })
  .end()
```
返回结果如下：  

 
```
{ "_id": 1, "fullfilled": true }
{ "_id": 2, "fullfilled": false }
{ "_id": 3, "fullfilled": true }
```

### 比较操作符

#### cmp

聚合操作符。给定两个值，返回其比较值：  

      
#####  API 说明
 如果第一个值小于第二个值，返回 -1
如果第一个值大于第二个值，返回 1
如果两个值相等，返回 0  

 语法如下：  

 
```
db.command.aggregate.cmp([<expression1>, <expression2>])
```

#####  示例代码
 假设集合 `price` 有如下记录：  

 
```
{ "_id": 1, "shop1": 10, "shop2": 100 }
{ "_id": 2, "shop1": 80, "shop2": 20 }
{ "_id": 3, "shop1": 50, "shop2": 50 }
```
求 `shop1` 和 `shop2` 的各个物品的价格对比。  

 
```
const $ = db.command.aggregate
db.collection('price').aggregate()
  .project({
    compare: $.cmp(['$shop1', '$shop2']))
  })
  .end()
```
返回结果如下：  

 
```
{ "_id": 1, "compare": -1 }
{ "_id": 2, "compare": 1 }
{ "_id": 3, "compare": 0 }
```

#### eq

聚合操作符。匹配两个值，如果相等则返回 `true`，否则返回 `false`。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.eq([<value1>, <value2>])
```

#####  示例代码
 假设集合 `price` 有如下记录：  

 
```
{ "_id": 1, "value": 10 }
{ "_id": 2, "value": 80 }
{ "_id": 3, "value": 50 }
```
求 `value` 等于 50 的记录。  

 
```
const $ = db.command.aggregate
db.collection('price').aggregate()
  .project({
    matched: $.eq(['$value', 50])
  })
  .end()
```
返回结果如下：  

 
```
{ "_id": 1, "matched": false }
{ "_id": 2, "matched": false }
{ "_id": 3, "matched": true }
```

#### gt

聚合操作符。匹配两个值，如果前者大于后者则返回 `true`，否则返回 `false`。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.gt([<value1>, <value2>])
```

#####  示例代码
 假设集合 `price` 有如下记录：  

 
```
{ "_id": 1, "value": 10 }
{ "_id": 2, "value": 80 }
{ "_id": 3, "value": 50 }
```
判断 `value` 是否大于 50。  

 
```
const $ = db.command.aggregate
db.collection('price').aggregate()
  .project({
    matched: $.gt(['$value', 50])
  })
  .end()
```
返回结果如下：  

 
```
{ "_id": 1, "matched": false }
{ "_id": 2, "matched": true }
{ "_id": 3, "matched": false }
```

#### gte

聚合操作符。匹配两个值，如果前者大于或等于后者则返回 `true`，否则返回 `false`。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.gte([<value1>, <value2>])
```

#####  示例代码
 假设集合 `price` 有如下记录：  

 
```
{ "_id": 1, "value": 10 }
{ "_id": 2, "value": 80 }
{ "_id": 3, "value": 50 }
```
判断 `value` 是否大于或等于 50。  

 
```
const $ = db.command.aggregate
db.collection('price').aggregate()
  .project({
    matched: $.gte(['$value', 50])
  })
  .end()
```
返回结果如下：  

 
```
{ "_id": 1, "matched": false }
{ "_id": 2, "matched": true }
{ "_id": 3, "matched": true }
```

#### lt

聚合操作符。匹配两个值，如果前者小于后者则返回 `true`，否则返回 `false`。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.lt([<value1>, <value2>])
```

#####  示例代码
 假设集合 `price` 有如下记录：  

 
```
{ "_id": 1, "value": 10 }
{ "_id": 2, "value": 80 }
{ "_id": 3, "value": 50 }
```
判断 `value` 是否小于 50。  

 
```
const $ = db.command.aggregate
db.collection('price').aggregate()
  .project({
    matched: $.lt(['$value', 50])
  })
  .end()
```
返回结果如下：  

 
```
{ "_id": 1, "matched": true }
{ "_id": 2, "matched": false }
{ "_id": 3, "matched": false }
```

#### lte

聚合操作符。匹配两个值，如果前者小于或等于后者则返回 `true`，否则返回 `false`。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.lte([<value1>, <value2>])
```

#####  示例代码
 假设集合 `price` 有如下记录：  

 
```
{ "_id": 1, "value": 10 }
{ "_id": 2, "value": 80 }
{ "_id": 3, "value": 50 }
```
判断 `value` 是否小于 50。  

 
```
const $ = db.command.aggregate
db.collection('price').aggregate()
  .project({
    matched: $.lte(['$value', 50])
  })
  .end()
```
返回结果如下：  

 
```
{ "_id": 1, "matched": true }
{ "_id": 2, "matched": false }
{ "_id": 3, "matched": true }
```

#### neq

聚合操作符。匹配两个值，如果不相等则返回 `true`，否则返回 `false`。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.neq([<value1>, <value2>])
```

#####  示例代码
 假设集合 `price` 有如下记录：  

 
```
{ "_id": 1, "value": 10 }
{ "_id": 2, "value": 80 }
{ "_id": 3, "value": 50 }
```
求 `value` 不等于 50 的记录。  

 
```
const $ = db.command.aggregate
db.collection('price').aggregate()
  .project({
    matched: $.neq(['$value', 50])
  })
  .end()
```
返回结果如下：  

 
```
{ "_id": 1, "matched": true }
{ "_id": 2, "matched": true }
{ "_id": 3, "matched": false }
```

### 条件操作符

#### cond

聚合操作符。计算布尔表达式，返回指定的两个值其中之一。  

     
#####  API 说明
 `cond` 的使用形式如下：  

 
```
cond({ if: <布尔表达式>, then: <真值>, else: <假值>  })
```
或者：  

 
```
cond([ <布尔表达式>, <真值>, <假值> ])
```
两种形式中，三个参数（`if`、`then`、`else`）都是必须的。  

 如果布尔表达式为真，那么 `$cond` 将会返回 `<真值>`，否则会返回 `<假值>`  

 
#####  示例代码
 假设集合 `items` 的记录如下：  

 
```
{ "_id": "0", "name": "item-a", "amount": 100 }
{ "_id": "1", "name": "item-b", "amount": 200 }
{ "_id": "2", "name": "item-c", "amount": 300 }
```
我们可以使用 `cond`，根据 `amount` 字段，来生成新的字段 `discount`：  

 
```
const $ = db.command.aggregate
db.collection('items').aggregate()
  .project({
    name: 1,
    discount: $.cond({
        if: $.gte(['$amount', 200]),
        then: 0.7,
        else: 0.9
    })
  })
  .end()
```
输出如下：  

 
```
{ "_id": "0", "name": "item-a", "discount": 0.9 }
{ "_id": "1", "name": "item-b", "discount": 0.7 }
{ "_id": "2", "name": "item-c", "discount": 0.7 }
```

#### ifNull

聚合操作符。计算给定的表达式，如果表达式结果为 null、undefined 或者不存在，那么返回一个替代值；否则返回原值。  

      
#####  API 说明
 `ifNull` 的使用形式如下：  

 
```
ifNull([ <表达式>, <替代值> ])
```

#####  示例代码
 假设集合 `items` 的记录如下：  

 
```
{ "_id": "0", "name": "A", "description": "这是商品A" }
{ "_id": "1", "name": "B", "description": null }
{ "_id": "2", "name": "C" }
```
我们可以使用 `ifNull`，对不存在 `desc` 字段的文档，或者 `desc` 字段为 `null` 的文档，补充一个替代值。  

 
```
const $ = db.command.aggregate
db.collection('items').aggregate()
  .project({
    _id: 0,
    name: 1,
    description: $.ifNull(['$description', '商品描述空缺'])
  })
  .end()
```
输出如下：  

 
```
{ "name": "A", "description": "这是商品A" }
{ "name": "B", "description": "商品描述空缺" }
{ "name": "C", "description": "商品描述空缺" }
```

#### switch

聚合操作符。根据给定的 `switch-case-default` 计算返回值、  

     
#####  API 说明
 `switch` 的使用形式如下：  

 
```
switch({
    branches: [
        case: <表达式>, then: <表达式>,
        case: <表达式>, then: <表达式>,
        ...
    ],
    default: <表达式>
})
```

#####  示例代码
 假设集合 `items` 的记录如下：  

 
```
{ "_id": "0", "name": "item-a", "amount": 100 }
{ "_id": "1", "name": "item-b", "amount": 200 }
{ "_id": "2", "name": "item-c", "amount": 300 }
```
我们可以使用 `switch`，根据 `amount` 字段，来生成新的字段 `discount`：  

 
```
const $ = db.command.aggregate
db.collection('items').aggregate()
  .project({
    name: 1,
    discount: $.switch({
        branches: [
            { case: $.gt(['$amount', 250]), then: 0.8 },
            { case: $.gt(['$amount', 150]), then: 0.9 }
        ],
        default: 1
    })
  })
  .end()
```
输出如下：  

 
```
{ "_id": "0", "name": "item-a", "discount": 1 }
{ "_id": "1", "name": "item-b", "discount": 0.9 }
{ "_id": "2", "name": "item-c", "discount": 0.8 }
```

### 日期操作符

#### dateFromParts

聚合操作符。给定日期的相关信息，构建并返回一个日期对象。  

**平台差异说明**

|阿里云	|腾讯云	|
|----		|----		|
|×			|√			|
     
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.dateFromParts({
    year: <year>,
    month: <month>,
    day: <day>,
    hour: <hour>,
    minute: <minute>,
    second: <second>,
    millisecond: <ms>,
    timezone: <tzExpression>
})
```
你也可以使用 ISO 8601 的标准：  

 
```
db.command.aggregate.dateFromParts({
    isoWeekYear: <year>,
    isoWeek: <week>,
    isoDayOfWeek: <day>,
    hour: <hour>,
    minute: <minute>,
    second: <second>,
    millisecond: <ms>,
    timezone: <tzExpression>
})
```

**说明**

- `timezone`字段请参考[Olson Timezone Identifier](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)，形式类似：`Asia/Shanghai`

#####  示例代码
 
```
const $ = db.command.aggregate
db
  .collection('dates')
  .aggregate()
  .project({
    _id: 0,
    date: $.dateFromParts({
        year: 2017,
        month: 2,
        day: 8,
        hour: 12,
        timezone: 'America/New_York'
    }),
  })
  .end()
```
输出如下：  

 
```
{
    "date": ISODate("2017-02-08T17:00:00.000Z")
}
```

#### dateFromString

聚合操作符。将一个日期/时间字符串转换为日期对象  

**平台差异说明**

|阿里云	|腾讯云	|
|----		|----		|
|×			|√			|

#####  API 说明
 语法如下：  

 
```
db.command.aggregate.dateFromString({
    dateString: <dateStringExpression>,
    timezone: <tzExpression>
})
```

#####  示例代码
 
```
const $ = db.command.aggregate
db
  .collection('dates')
  .aggregate()
  .project({
    _id: 0,
    date: $.dateFromString({
        dateString: "2019-05-14T09:38:51.686Z"
    })
  })
  .end()
```
输出如下：  

 
```
{
    "date": ISODate("2019-05-14T09:38:51.686Z")
}
```

#### dateToString

聚合操作符。根据指定的表达式将日期对象格式化为符合要求的字符串。  

**平台差异说明**

|阿里云	|腾讯云	|
|----		|----		|
|×			|√			|
     
#####  API 说明
 `dateToString` 的调用形式如下：  

 
```
db.command.aggregate.dateToString({
  date: <日期表达式>,
  format: <格式化表达式>,
  timezone: <时区表达式>,
  onNull: <空值表达式>
})
```
下面是四种表达式的详细说明：  

|名称					|描述																																																																																																											|
|----					|----																																																																																																											|
|日期表达式		|必选。指定字段值应该是能转化为字符串的日期。																																																																																							|
|格式化表达式	|可选。它可以是任何包含“格式说明符”的有效字符串。																																																																																				|
|时区表达式		|可选。指明运算结果的时区。它可以解析格式为 [UTC Offset](https://en.wikipedia.org/wiki/List_of_UTC_time_offsets) 或者 [Olson Timezone Identifier](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) 的字符串。|
|空值表达式		|可选。当 <日期表达式> 返回空或者不存在的时候，会返回此表达式指明的值。																																																																										|

下面是格式说明符的详细说明：  

|说明符	|描述															|合法值			|
|----		|----															|----				|
|%d			|月份的日期（2位数，0填充）				|01 - 31		|
|%G			|ISO 8601 格式的年份							|0000 - 9999|
|%H			|小时（2位数，0填充，24小时制）		|00 - 23		|
|%j			|一年中的一天（3位数，0填充）			|001 - 366	|
|%L			|毫秒（3位数，0填充）							|000 - 999	|
|%m			|月份（2位数，0填充）							|01 - 12		|
|%M			|分钟（2位数，0填充）							|00 - 59		|
|%S			|秒（2位数，0填充）								|00 - 60		|
|%w			|星期几														|1 - 7			|
|%u			|ISO 8601 格式的星期几						|1 - 7			|
|%U			|一年中的一周（2位数，0填充）			|00 - 53		|
|%V			|ISO 8601 格式的一年中的一周			|1 - 53			|
|%Y			|年份（4位数，0填充）							|0000 - 9999|
|%z			|与 UTC 的时区偏移量							|+/-[hh][mm]|
|%Z			|以分钟为单位，与 UTC 的时区偏移量|+/-mmm			|
|%%			|百分号作为字符										|%					|

#####  示例代码
 假设集合 `students` 有如下记录：  

 
```
{ "date": "1999-12-11T16:00:00.000Z", "firstName": "Yuanxin", "lastName": "Dong" }
{ "date": "1998-11-10T16:00:00.000Z", "firstName": "Weijia", "lastName": "Wang" }
{ "date": "1997-10-09T16:00:00.000Z", "firstName": "Chengxi", "lastName": "Li" }
```


**格式化日期**

 下面是将 `date` 字段的值，格式化成形如 `年份-月份-日期` 的字符串：  

 
```
const $ = db.command.aggregate
db
  .collection('students')
  .aggregate()
  .project({
    _id: 0,
    formatDate: $.dateToString({
      date: '$date',
      format: '%Y-%m-%d'
    })
  })
  .end()
```
返回的结果如下：  

 
```
{ "formatDate": "1999-12-11" }
{ "formatDate": "1998-11-10" }
{ "formatDate": "1997-10-09" }
```


**时区时间**

 下面是将 `date` 字段值格式化为上海时区时间的例子：  

 
```
const $ = db.command.aggregate
db
  .collection('students')
  .aggregate()
  .project({
    _id: 0,
    formatDate: $.dateToString({
      date: '$date',
      format: '%H:%M:%S',
      timezone: 'Asia/Shanghai'
    })
  })
  .end()
```
返回的结果如下：  

 
```
{ "formatDate": "00:00:00" }
{ "formatDate": "00:00:00" }
{ "formatDate": "00:00:00" }
```


**缺失情况的默认值**

 当指定的 `<日期表达式>` 返回空或者不存在的时候，可以设置缺失情况下的默认值：  

 
```
const $ = db.command.aggregate
db
  .collection('students')
  .aggregate()
  .project({
    _id: 0,
    formatDate: $.dateToString({
      date: '$empty',
      onNull: 'null'
    })
  })
  .end()
```
返回的结果如下：  

 
```
{ "formatDate": "null" }
{ "formatDate": "null" }
{ "formatDate": "null" }
```

#### dayOfMonth

聚合操作符。返回日期字段对应的天数（一个月中的哪一天），是一个介于 1 至 31 之间的数字。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.dayOfMonth(<日期字段>)
```

#####  示例代码
 假设集合 `dates` 有以下文档：  

 
```
{
    "_id": 1,
    "date": ISODate("2019-05-14T09:38:51.686Z")
}
```
我们使用 `dayOfMonth()` 对 `date` 字段进行投影，获取对应的日期：  

 
```
const $ = db.command.aggregate
db
  .collection('dates')
  .aggregate()
  .project({
    _id: 0,
    dayOfMonth: $.dayOfMonth('$date')
  })
  .end()
```
输出如下：  

 
```
{
    "dayOfMonth": 14
}
```

#### dayOfWeek

聚合操作符。返回日期字段对应的天数（一周中的第几天），是一个介于 1（周日）到 7（周六）之间的整数。  

      
#####  API 说明
 *注意：周日是每周的第 1 天**  

 语法如下：  

 
```
db.command.aggregate.dayOfWeek(<日期字段>)
```

#####  示例代码
 假设集合 `dates` 有以下文档：  

 
```
{
    "_id": 1,
    "date": ISODate("2019-05-14T09:38:51.686Z")
}
```
我们使用 `dayOfWeek()` 对 `date` 字段进行投影，获取对应的天数（一周中的第几天）：  

 
```
const $ = db.command.aggregate
db
  .collection('dates')
  .aggregate()
  .project({
    _id: 0,
    dayOfWeek: $.dayOfWeek('$date')
  })
  .end()
```
输出如下：  

 
```
{
    "dayOfWeek": 3
}
```

#### dayOfYear

聚合操作符。返回日期字段对应的天数（一年中的第几天），是一个介于 1 到 366 之间的整数。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.dayOfYear(<日期字段>)
```

#####  示例代码
 假设集合 `dates` 有以下文档：  

 
```
{
    "_id": 1,
    "date": ISODate("2019-05-14T09:38:51.686Z")
}
```
我们使用 `dayOfYear()` 对 `date` 字段进行投影，获取对应的天数（一年中的第几天）：  

 
```
const $ = db.command.aggregate
db
  .collection('dates')
  .aggregate()
  .project({
    _id: 0,
    dayOfYear: $.dayOfYear('$date')
  })
  .end()
```
输出如下：  

 
```
{
    "dayOfYear": 134
}
```

#### hour

聚合操作符。返回日期字段对应的小时数，是一个介于 0 到 23 之间的整数。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.hour(<日期字段>)
```

#####  示例代码
 假设集合 `dates` 有以下文档：  

 
```
{
    "_id": 1,
    "date": ISODate("2019-05-14T09:38:51.686Z")
}
```
我们使用 `hour()` 对 `date` 字段进行投影，获取对应的小时数：  

 
```
const $ = db.command.aggregate
db
  .collection('dates')
  .aggregate()
  .project({
    _id: 0,
    hour: $.hour('$date')
  })
  .end()
```
输出如下：  

 
```
{
    "hour": 9
}
```

#### isoDayOfWeek

聚合操作符。返回日期字段对应的 ISO 8601 标准的天数（一周中的第几天），是一个介于 1（周一）到 7（周日）之间的整数。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.month(<日期字段>)
```

#####  示例代码
 假设集合 `dates` 有以下文档：  

 
```
{
    "_id": 1,
    "date": ISODate("2019-05-14T09:38:51.686Z")
}
```
我们使用 `month()` 对 `date` 字段进行投影，获取对应的 ISO 8601 标准的天数（一周中的第几天）：  

 
```
const $ = db.command.aggregate
db
  .collection('dates')
  .aggregate()
  .project({
    _id: 0,
    isoDayOfWeek: $.isoDayOfWeek('$date')
  })
  .end()
```
输出如下：  

 
```
{
    "isoDayOfWeek": 2
}
```

#### isoWeek

聚合操作符。返回日期字段对应的 ISO 8601 标准的周数（一年中的第几周），是一个介于 1 到 53 之间的整数。  

      
#####  API 说明
 根据 ISO 8601 标准，周一到周日视为一周，本年度第一个周四所在的那周，视为本年度的第 1 周。  

 例如：2016 年 1 月 7 日是那年的第一个周四，那么 2016.01.04（周一）到 2016.01.10（周日） 即为第 1 周。同理，2016 年 1 月 1 日的周数为 53。  

 语法如下：  

 
```
db.command.aggregate.isoWeek(<日期字段>)
```

#####  示例代码
 假设集合 `dates` 有以下文档：  

 
```
{
    "_id": 1,
    "date": ISODate("2019-05-14T09:38:51.686Z")
}
```
我们使用 `isoWeek()` 对 `date` 字段进行投影，获取对应的 ISO 8601 标准的周数（一年中的第几周）：  

 
```
const $ = db.command.aggregate
db
  .collection('dates')
  .aggregate()
  .project({
    _id: 0,
    isoWeek: $.isoWeek('$date')
  })
  .end()
```
输出如下：  

 
```
{
    "isoWeek": 20
}
```

#### isoWeekYear

聚合操作符。返回日期字段对应的 ISO 8601 标准的天数（一年中的第几天）。  

      
#####  API 说明
 此处的“年”以第一周的周一为开始，以最后一周的周日为结束。  

 语法如下：  

 
```
db.command.aggregate.isoWeekYear(<日期字段>)
```

#####  示例代码
 假设集合 `dates` 有以下文档：  

 
```
{
    "_id": 1,
    "date": ISODate("2019-05-14T09:38:51.686Z")
}
```
我们使用 `isoWeekYear()` 对 `date` 字段进行投影，获取对应的 ISO 8601 标准的天数（一年中的第几天）：  

 
```
const $ = db.command.aggregate
db
  .collection('dates')
  .aggregate()
  .project({
    _id: 0,
    isoWeekYear: $.isoWeekYear('$date')
  })
  .end()
```
输出如下：  

 
```
{
    "isoWeekYear": 2019
}
```

#### millisecond

聚合操作符。返回日期字段对应的毫秒数，是一个介于 0 到 999 之间的整数。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.millisecond(<日期字段>)
```

#####  示例代码
 假设集合 `dates` 有以下文档：  

 
```
{
    "_id": 1,
    "date": ISODate("2019-05-14T09:38:51.686Z")
}
```
我们使用 `millisecond()` 对 `date` 字段进行投影，获取对应的毫秒数：  

 
```
const $ = db.command.aggregate
db
  .collection('dates')
  .aggregate()
  .project({
    _id: 0,
    millisecond: $.millisecond('$date'),
  })
  .end()
```
输出如下：  

 
```
{
    "millisecond": 686
}
```

#### minute

聚合操作符。返回日期字段对应的分钟数，是一个介于 0 到 59 之间的整数。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.minute(<日期字段>)
```

#####  示例代码
 假设集合 `dates` 有以下文档：  

 
```
{
    "_id": 1,
    "date": ISODate("2019-05-14T09:38:51.686Z")
}
```
我们使用 `minute()` 对 `date` 字段进行投影，获取对应的分钟数：  

 
```
const $ = db.command.aggregate
db
  .collection('dates')
  .aggregate()
  .project({
    _id: 0,
    minute: $.minute('$date')
  })
  .end()
```
输出如下：  

 
```
{
    "minute": 38
}
```

#### month

聚合操作符。返回日期字段对应的月份，是一个介于 1 到 12 之间的整数。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.month(<日期字段>)
```

#####  示例代码
 假设集合 `dates` 有以下文档：  

 
```
{
    "_id": 1,
    "date": ISODate("2019-05-14T09:38:51.686Z")
}
```
我们使用 `month()` 对 `date` 字段进行投影，获取对应的月份：  

 
```
const $ = db.command.aggregate
db
  .collection('dates')
  .aggregate()
  .project({
    _id: 0,
    month: $.month('$date')
  })
  .end()
```
输出如下：  

 
```
{
    "month": 5
}
```

#### second

聚合操作符。返回日期字段对应的秒数，是一个介于 0 到 59 之间的整数，在特殊情况下（闰秒）可能等于 60。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.second(<日期字段>)
```

#####  示例代码
 假设集合 `dates` 有以下文档：  

 
```
{
    "_id": 1,
    "date": ISODate("2019-05-14T09:38:51.686Z")
}
```
我们使用 `second()` 对 `date` 字段进行投影，获取对应的秒数：  

 
```
const $ = db.command.aggregate
db
  .collection('dates')
  .aggregate()
  .project({
    _id: 0,
    second: $.second('$date')
  })
  .end()
```
输出如下：  

 
```
{
    "second": 51
}
```

#### week

聚合操作符。返回日期字段对应的周数（一年中的第几周），是一个介于 0 到 53 之间的整数。  

      
#####  API 说明
 每周以周日为开头，**每年的第一个周日**即为 `week 1` 的开始，这天之前是 `week 0`。  

 语法如下：  

 
```
db.command.aggregate.week(<日期字段>)
```

#####  示例代码
 假设集合 `dates` 有以下文档：  

 
```
{
    "_id": 1,
    "date": ISODate("2019-05-14T09:38:51.686Z")
}
```
我们使用 `week()` 对 `date` 字段进行投影，获取对应的周数（一年中的第几周）：  

 
```
const $ = db.command.aggregate
db
  .collection('dates')
  .aggregate()
  .project({
    _id: 0,
    week: $.week('$date')
  })
  .end()
```
输出如下：  

 
```
{
    "week": 19
}
```

#### year

聚合操作符。返回日期字段对应的年份。  

      
#####  API 说明
 语法如下：  

 
```
db.command.aggregate.year(<日期字段>)
```

#####  示例代码
 假设集合 `dates` 有以下文档：  

 
```
{
    "_id": 1,
    "date": ISODate("2019-05-14T09:38:51.686Z")
}
```
我们使用 `year()` 对 `date` 字段进行投影，获取对应的年份：  

 
```
const $ = db.command.aggregate
db
  .collection('dates')
  .aggregate()
  .project({
    _id: 0,
    year: $.year('$date')
  })
  .end()
```
输出如下：  

 
```
{
    "year": 2019
}
```

#### subtract

见[subtract](#subtract)

### 常量操作符

#### literal

聚合操作符。直接返回一个值的字面量，不经过任何解析和处理。  

     
#####  API 说明
 `literal` 使用形式如下：  

 
```
literal(<值>)
```
如果 `<值>` 是一个表达式，那么 `literal` **不会**解析或者计算这个表达式，而是直接返回这个表达式。  

 
#####  示例代码
 比如我们有一个 `items` 集合，其中数据如下：  

 
```
{ "_id": "0", "price": "$1" }
{ "_id": "1", "price": "$5.60" }
{ "_id": "2", "price": "$8.90" }
```


**以字面量的形式使用 $**

 下面的代码使用 `literal`，生成了一个新的字段 `isOneDollar`，表示 `price` 字段是否严格等于 `"$1"`。  

 注意：我们这里无法使用 `eq(['$price', '$1'])`，因为 `"$1"` 是一个表达式，代表 `"1"` 字段对应的值，而不是字符串字面量 `"$1"`。  

 
```
const $ = db.command.aggregate
db.collection('items').aggregate()
  .project({
    isOneDollar: $.eq(['$price', $.literal('$1')])
  })
  .end()
```
输出如下：  

 
```
{ "_id": "0", "isOneDollar": true }
{ "_id": "1", "isOneDollar": false }
{ "_id": "2", "isOneDollar": false }
```


**投影一个字段，对应的值为 1**

 下面的代码使用 `literal`，投影了一个新的字段 `amount`，其值为 `1`。  

 
```
const $ = db.command.aggregate
db.collection('items').aggregate()
  .project({
    price: 1,
    amount: $.literal(1)
  })
  .end()
```
输出如下：  

 
```
{ "_id": "0", "price": "$1", "amount": 1 }
{ "_id": "1", "price": "$5.60", "amount": 1 }
{ "_id": "2", "price": "$8.90", "amount": 1 }
```

### 对象操作符

#### mergeObjects

聚合操作符。将多个文档合并为单个文档。  

**平台差异说明**

|阿里云	|腾讯云	|
|----		|----		|
|×			|√			|

#####  API 说明
 使用形式如下：
在 `group()` 中使用时：  

 
```
mergeObjects(<document>)
```
在其它表达式中使用时：  

 
```
mergeObjects([<document1>, <document2>, ...])
```

#####  示例代码
 

**搭配 `group()` 使用**

 假设集合 `sales` 存在以下文档：  

 
```
{ "_id": 1, "year": 2018, "name": "A", "volume": { "2018Q1": 500, "2018Q2": 500 } }
{ "_id": 2, "year": 2017, "name": "A", "volume": { "2017Q1": 400, "2017Q2": 300, "2017Q3": 0, "2017Q4": 0 } }
{ "_id": 3, "year": 2018, "name": "B", "volume": { "2018Q1": 100 } }
{ "_id": 4, "year": 2017, "name": "B", "volume": { "2017Q3": 100, "2017Q4": 250 } }
```
下面的代码使用 `mergeObjects()`，将用相同 `name` 的文档合并：  

 
```
const $ = db.command.aggregate
db.collection('sales').aggregate()
  .group({
    _id: '$name',
    mergedVolume: $.mergeObjects('$volume')
  })
  .end()
```
输出如下：  

 
```
{ "_id": "A", "mergedVolume": { "2017Q1": 400, "2017Q2": 300, "2017Q3": 0, "2017Q4": 0, "2018Q1": 500, "2018Q2": 500 } }
{ "_id": "B", "mergedVolume": { "2017Q3": 100, "2017Q4": 250, "2018Q1": 100 } }
```


**一般用法**

 假设集合 `test` 存在以下文档：  

 
```
{ "_id": 1, "foo": { "a": 1 }, "bar": { "b": 2 } }
{ "_id": 2, "foo": { "c": 1 }, "bar": { "d": 2 } }
{ "_id": 3, "foo": { "e": 1 }, "bar": { "f": 2 } }
```
下面的代码使用 `mergeObjects()`，将文档中的 `foo` 和 `bar` 字段合并为 `foobar`：  

 
```
const $ = db.command.aggregate
db.collection('sales').aggregate()
  .project({
    foobar: $.mergeObjects(['$foo', '$bar'])
  })
  .end()
```
输出结果如下：  

 
```
{ "_id": 1, "foobar": { "a": 1, "b": 2 } }
{ "_id": 2, "foobar": { "c": 1, "d": 2 } }
{ "_id": 3, "foobar": { "e": 1, "f": 2 } }
```

#### objectToArray

见[objectToArray](#objectToArray)

### 集合操作符

#### allElementsTrue

聚合操作符。输入一个数组，或者数组字段的表达式。如果数组中所有元素均为真值，那么返回 `true`，否则返回 `false`。空数组永远返回 `true`。  

      
#####  API 说明
 语法如下：  

 
```
allElementsTrue([<expression>])
```

#####  示例代码
 假设集合 `test` 有如下记录：  

 
```
{ "_id": 1, "array": [ true ] }
{ "_id": 2, "array": [ ] }
{ "_id": 3, "array": [ false ] }
{ "_id": 4, "array": [ true, false ] }
{ "_id": 5, "array": [ 0 ] }
{ "_id": 6, "array": [ "stark" ] }
```
下面的代码使用 `allElementsTrue()`，判断 `array` 字段中是否均为真值：  

 
```
const $ = db.command.aggregate
db.collection('price')
  .aggregate()
  .project({
    isAllTrue: $.allElementsTrue(['$array'])
  })
  .end()
```
返回结果如下：  

 
```
{ "_id": 1, "isAllTrue": true }
{ "_id": 2, "isAllTrue": true }
{ "_id": 3, "isAllTrue": false }
{ "_id": 4, "isAllTrue": false }
{ "_id": 5, "isAllTrue": false }
{ "_id": 6, "isAllTrue": true }
```

#### anyElementTrue

聚合操作符。输入一个数组，或者数组字段的表达式。如果数组中任意一个元素为真值，那么返回 `true`，否则返回 `false`。空数组永远返回 `false`。  

      
#####  API 说明
 语法如下：  

 
```
anyElementTrue([<expression>])
```

#####  示例代码
 假设集合 `test` 有如下记录：  

 
```
{ "_id": 1, "array": [ true ] }
{ "_id": 2, "array": [ ] }
{ "_id": 3, "array": [ false ] }
{ "_id": 4, "array": [ true, false ] }
{ "_id": 5, "array": [ 0 ] }
{ "_id": 6, "array": [ "stark" ] }
```
下面的代码使用 `anyElementTrue()`，判断 `array` 字段中是否含有真值：  

 
```
const $ = db.command.aggregate
db.collection('price')
  .aggregate()
  .project({
    isAnyTrue: $.anyElementTrue(['$array'])
  })
  .end()
```
返回结果如下：  

 
```
{ "_id": 1, "isAnyTrue": true }
{ "_id": 2, "isAnyTrue": false }
{ "_id": 3, "isAnyTrue": false }
{ "_id": 4, "isAnyTrue": true }
{ "_id": 5, "isAnyTrue": false }
{ "_id": 6, "isAnyTrue": true }
```

#### setDifference

聚合操作符，输入两个集合，输出只存在于第一个集合中的元素。  

      
#####  API 说明
 使用形式如下：  

 
```
setDifference([<expression1>, <expression2>])
```

#####  示例代码
 假设集合 `test` 存在以下数据：  

 
```
{ "_id": 1, "A": [ 1, 2 ], "B": [ 1, 2 ] }
{ "_id": 2, "A": [ 1, 2 ], "B": [ 2, 1, 2 ] }
{ "_id": 3, "A": [ 1, 2 ], "B": [ 1, 2, 3 ] }
{ "_id": 4, "A": [ 1, 2 ], "B": [ 3, 1 ] }
{ "_id": 5, "A": [ 1, 2 ], "B": [ ] }
{ "_id": 6, "A": [ 1, 2 ], "B": [ {}, [] ] }
{ "_id": 7, "A": [ ], "B": [ ] }
{ "_id": 8, "A": [ ], "B": [ 1 ] }
```
下面的代码使用 `setDifference`，找到只存在于 `B` 中的数字：  

 
```
db.collection('test')
  .aggregate()
  .project({
    isBOnly: $.setDifference(['$B', '$A'])
  })
  .end()
```

```
{ "_id": 1, "isBOnly": [] }
{ "_id": 2, "isBOnly": [3] }
{ "_id": 3, "isBOnly": [3] }
{ "_id": 4, "isBOnly": [5] }
{ "_id": 5, "isBOnly": [] }
{ "_id": 6, "isBOnly": [{}, []] }
{ "_id": 7, "isBOnly": [] }
{ "_id": 8, "isBOnly": [1] }
```

#### setEquals

聚合操作符，输入两个集合，判断两个集合中包含的元素是否相同（不考虑顺序、去重）。  

      
#####  API 说明
 使用形式如下：  

 
```
setEquals([<expression1>, <expression2>])
```

#####  示例代码
 假设集合 `test` 存在以下数据：  

 
```
{ "_id": 1, "A": [ 1, 2 ], "B": [ 1, 2 ] }
{ "_id": 2, "A": [ 1, 2 ], "B": [ 2, 1, 2 ] }
{ "_id": 3, "A": [ 1, 2 ], "B": [ 1, 2, 3 ] }
{ "_id": 4, "A": [ 1, 2 ], "B": [ 3, 1 ] }
{ "_id": 5, "A": [ 1, 2 ], "B": [ ] }
{ "_id": 6, "A": [ 1, 2 ], "B": [ {}, [] ] }
{ "_id": 7, "A": [ ], "B": [ ] }
{ "_id": 8, "A": [ ], "B": [ 1 ] }
```
下面的代码使用 `setEquals`，判断两个集合中包含的元素是否相同：  

 
```
db.collection('test')
  .aggregate()
  .project({
    sameElements: $.setEquals(['$A', '$B'])
  })
  .end()
```

```
{ "_id": 1, "sameElements": true }
{ "_id": 2, "sameElements": true }
{ "_id": 3, "sameElements": false }
{ "_id": 4, "sameElements": false }
{ "_id": 5, "sameElements": false }
{ "_id": 6, "sameElements": false }
{ "_id": 7, "sameElements": true }
{ "_id": 8, "sameElements": false }
```

#### setIntersection

聚合操作符，输入两个集合，输出两个集合的交集。  

      
#####  API 说明
 使用形式如下：  

 
```
setIntersection([<expression1>, <expression2>])
```

#####  示例代码
 假设集合 `test` 存在以下数据：  

 
```
{ "_id": 1, "A": [ 1, 2 ], "B": [ 1, 2 ] }
{ "_id": 2, "A": [ 1, 2 ], "B": [ 2, 1, 2 ] }
{ "_id": 3, "A": [ 1, 2 ], "B": [ 1, 2, 3 ] }
{ "_id": 4, "A": [ 1, 2 ], "B": [ 3, 1 ] }
{ "_id": 5, "A": [ 1, 2 ], "B": [ ] }
{ "_id": 6, "A": [ 1, 2 ], "B": [ {}, [] ] }
{ "_id": 7, "A": [ ], "B": [ ] }
{ "_id": 8, "A": [ ], "B": [ 1 ] }
```
下面的代码使用 `setIntersection`，输出两个集合的交集：  

 
```
db.collection('test')
  .aggregate()
  .project({
    commonToBoth: $.setIntersection(['$A', '$B'])
  })
  .end()
```
输出如下：  

 
```
{ "_id": 1, "commonToBoth": [ 1, 2 ] }
{ "_id": 2, "commonToBoth": [ 1, 2 ] }
{ "_id": 3, "commonToBoth": [ 1, 2 ] }
{ "_id": 4, "commonToBoth": [ 1 ] }
{ "_id": 5, "commonToBoth": [ ] }
{ "_id": 6, "commonToBoth": [ ] }
{ "_id": 7, "commonToBoth": [ ] }
{ "_id": 8, "commonToBoth": [ ] }
```

#### setIsSubset

聚合操作符，输入两个集合，判断第一个集合是否是第二个集合的子集。  

      
#####  API 说明
 使用形式如下：  

 
```
setIsSubset([<expression1>, <expression2>])
```

#####  示例代码
 假设集合 `test` 存在以下数据：  

 
```
{ "_id": 1, "A": [ 1, 2 ], "B": [ 1, 2 ] }
{ "_id": 2, "A": [ 1, 2 ], "B": [ 2, 1, 2 ] }
{ "_id": 3, "A": [ 1, 2 ], "B": [ 1, 2, 3 ] }
{ "_id": 4, "A": [ 1, 2 ], "B": [ 3, 1 ] }
{ "_id": 5, "A": [ 1, 2 ], "B": [ ] }
{ "_id": 6, "A": [ 1, 2 ], "B": [ {}, [] ] }
{ "_id": 7, "A": [ ], "B": [ ] }
{ "_id": 8, "A": [ ], "B": [ 1 ] }
```
下面的代码使用 `setIsSubset`，判断第一个集合是否是第二个集合的子集：  

 
```
db.collection('test')
  .aggregate()
  .project({
    AisSubsetOfB: $.setIsSubset(['$A', '$B'])
  })
  .end()
```

```
{ "_id": 1, "AisSubsetOfB": true }
{ "_id": 2, "AisSubsetOfB": true }
{ "_id": 3, "AisSubsetOfB": true }
{ "_id": 4, "AisSubsetOfB": false }
{ "_id": 5, "AisSubsetOfB": false }
{ "_id": 6, "AisSubsetOfB": false }
{ "_id": 7, "AisSubsetOfB": true }
{ "_id": 8, "AisSubsetOfB": true }
```

#### setUnion

聚合操作符，输入两个集合，输出两个集合的并集。  

      
#####  API 说明
 使用形式如下：  

 
```
setUnion([<expression1>, <expression2>])
```

#####  示例代码
 假设集合 `test` 存在以下数据：  

 
```
{ "_id": 1, "A": [ 1, 2 ], "B": [ 1, 2 ] }
{ "_id": 2, "A": [ 1, 2 ], "B": [ 2, 1, 2 ] }
{ "_id": 3, "A": [ 1, 2 ], "B": [ 1, 2, 3 ] }
{ "_id": 4, "A": [ 1, 2 ], "B": [ 3, 1 ] }
{ "_id": 5, "A": [ 1, 2 ], "B": [ ] }
{ "_id": 6, "A": [ 1, 2 ], "B": [ {}, [] ] }
{ "_id": 7, "A": [ ], "B": [ ] }
{ "_id": 8, "A": [ ], "B": [ 1 ] }
```
下面的代码使用 `setUnion`，输出两个集合的并集：  

 
```
db.collection('test')
  .aggregate()
  .project({
    AB: $.setUnion(['$A', '$B'])
  })
  .end()
```
输出如下：  

 
```
{ "_id": 1, "AB": [ 1, 2 ] }
{ "_id": 2, "AB": [ 1, 2 ] }
{ "_id": 3, "AB": [ 1, 2, 3 ] }
{ "_id": 4, "AB": [ 1, 2, 3 ] }
{ "_id": 5, "AB": [ 1, 2 ] }
{ "_id": 6, "AB": [ 1, 2, {}, [] ] }
{ "_id": 7, "AB": [ ] }
{ "_id": 8, "AB": [ 1 ] }
```

### 字符串操作符

#### concat

聚合操作符。连接字符串，返回拼接后的字符串。  

      
#####  API 说明
 `concat` 的语法如下：  

 
```
db.command.aggregate.concat([<表达式1>, <表达式2>, ...])
```
表达式可以是形如 `$ + 指定字段`，也可以是普通字符串。只要能够被解析成字符串即可。  

 
#####  示例代码
 假设集合 `students` 的记录如下：  

 
```
{ "firstName": "Yuanxin", "group": "a", "lastName": "Dong", "score": 84 }
{ "firstName": "Weijia", "group": "a", "lastName": "Wang", "score": 96 }
{ "firstName": "Chengxi", "group": "b", "lastName": "Li", "score": 80 }
```
借助 `concat` 可以拼接 `lastName` 和 `firstName` 字段，得到每位学生的名字全称：  

 
```
const $ = db.command.aggregate
db
  .collection('students')
  .aggregate()
  .project({
    _id: 0,
    fullName: $.concat(['$firstName', ' ', '$lastName'])
  })
  .end()
```
返回的结果如下：  

 
```
{ "fullName": "Yuanxin Dong" }
{ "fullName": "Weijia Wang" }
{ "fullName": "Chengxi Li" }
```

#### dateFromString

见[dateFromString](#dateFromString)

#### dateToString

见[dateToString](#dateToString)

#### indexOfBytes

聚合操作符。在目标字符串中查找子字符串，并返回第一次出现的 `UTF-8` 的字节索引（从0开始）。如果不存在子字符串，返回 -1。  

      
#####  API 说明
 `indexOfBytes` 的语法如下：  

 
```
db.command.aggregate.indexOfBytes([<目标字符串表达式>, <子字符串表达式>, <开始位置表达式>, <结束位置表达式>])
```
下面是 4 种表达式的详细描述：  

|表达式						|描述															|
|----							|----															|
|目标字符串表达式	|任何可以被解析为字符串的表达式		|
|子字符串表达式		|任何可以被解析为字符串的表达式		|
|开始位置表达式		|任何可以被解析为非负整数的表达式	|
|结束位置表达式		|任何可以被解析为非负整数的表达式	|

#####  示例代码
 假设集合 `students` 的记录如下：  

 
```
{ "firstName": "Yuanxin", "group": "a", "lastName": "Dong", "score": 84 }
{ "firstName": "Weijia", "group": "a", "lastName": "Wang", "score": 96 }
{ "firstName": "Chengxi", "group": "b", "lastName": "Li", "score": 80 }
```
借助 `indexOfBytes` 查找字符 `"a"` 在字段 `firstName` 中的位置：  

 
```
const $ = db.command.aggregate
db
  .collection('students')
  .aggregate()
  .project({
    _id: 0,
    aStrIndex: $.indexOfBytes(['$firstName', 'a'])
  })
  .end()
```
返回的结果如下：  

 
```
{ "aStrIndex": 2 }
{ "aStrIndex": 5 }
{ "aStrIndex": -1 }
```

#### indexOfCP

聚合操作符。在目标字符串中查找子字符串，并返回第一次出现的 `UTF-8` 的 `code point` 索引（从0开始）。如果不存在子字符串，返回 -1。  

      
#####  API 说明
 `code point` 是“码位”，又名“编码位置”。这里特指 `Unicode` 包中的码位，范围是从0（16进制）到10FFFF（16进制）。  

 `indexOfCP` 的语法如下：  

 
```
db.command.aggregate.indexOfCP([<目标字符串表达式>, <子字符串表达式>, <开始位置表达式>, <结束位置表达式>])
```
下面是 4 种表达式的详细描述：  

|表达式						|描述															|
|----							|----															|
|目标字符串表达式	|任何可以被解析为字符串的表达式		|
|子字符串表达式		|任何可以被解析为字符串的表达式		|
|开始位置表达式		|任何可以被解析为非负整数的表达式	|
|结束位置表达式		|任何可以被解析为非负整数的表达式	|

#####  示例代码
 假设集合 `students` 的记录如下：  

 
```
{ "firstName": "Yuanxin", "group": "a", "lastName": "Dong", "score": 84 }
{ "firstName": "Weijia", "group": "a", "lastName": "Wang", "score": 96 }
{ "firstName": "Chengxi", "group": "b", "lastName": "Li", "score": 80 }
```
借助 `indexOfCP` 查找字符 `"a"` 在字段 `firstName` 中的位置：  

 
```
const $ = db.command.aggregate
db
  .collection('students')
  .aggregate()
  .project({
    _id: 0,
    aStrIndex: $.indexOfCP(['$firstName', 'a'])
  })
  .end()
```
返回的结果如下：  

 
```
{ "aStrIndex": 2 }
{ "aStrIndex": 5 }
{ "aStrIndex": -1 }
```

#### split

聚合操作符。按照分隔符分隔数组，并且删除分隔符，返回子字符串组成的数组。如果字符串无法找到分隔符进行分隔，返回原字符串作为数组的唯一元素。  

      
#####  API 说明
 `split` 的语法如下：  

 
```
db.command.aggregate.split([<字符串表达式>, <分隔符表达式>])
```
字符串表达式和分隔符表达式可以是任意形式的表达式，只要它可以被解析为字符串即可。  

 
#####  示例代码
 假设集合 `students` 的记录如下：  

 
```
{ "birthday": "1999/12/12" }
{ "birthday": "1998/11/11" }
{ "birthday": "1997/10/10" }
```
通过 `split` 将每条记录中的 `birthday` 字段对应值分隔成数组，每个数组分别由代表年、月、日的3个元素组成：  

 
```
const $ = db.command.aggregate
db
  .collection('students')
  .aggregate()
  .project({
    _id: 0,
    birthday: $.split(['$birthday', '/'])
  })
  .end()
```
返回的结果如下：  

 
```
{ "birthday": [ "1999", "12", "12" ] }
{ "birthday": [ "1998", "11", "11" ] }
{ "birthday": [ "1997", "10", "10" ] }
```

#### strLenBytes

聚合操作符。计算并返回指定字符串中 `utf-8` 编码的字节数量。  

      
#####  API 说明
 `strLenBytes` 的语法如下：  

 
```
db.command.aggregate.strLenBytes(<表达式>)
```
只要表达式可以被解析成字符串，那么它就是有效表达式。  

 
#####  示例代码
 假设集合 `students` 的记录如下：  

 
```
{ "name": "dongyuanxin", "nickname": "心谭" }
```
借助 `strLenBytes` 计算 `name` 字段和 `nickname` 字段对应值的字节长度：  

 
```
const $ = db.command.aggregate
db
  .collection('students')
  .aggregate()
  .project({
    _id: 0,
    nameLength: $.strLenBytes('$name'),
    nicknameLength: $.strLenBytes('$nickname')
  })
  .end()
```
返回结果如下：  

 
```
{ "nameLength": 11, "nicknameLength": 6 }
```

#### strLenCP

聚合操作符。计算并返回指定字符串的UTF-8 [code points<span></span>](http://www.unicode.org/glossary/#code_point) 数量。  

      
#####  API 说明
 `strLenCP` 的语法如下：  

 
```
db.command.aggregate.strLenCP(<表达式>)
```
只要表达式可以被解析成字符串，那么它就是有效表达式。  

 
#####  示例代码
 假设集合 `students` 的记录如下：  

 
```
{ "name": "dongyuanxin", "nickname": "心谭" }
```
借助 `strLenCP` 计算 `name` 字段和 `nickname` 字段对应值的UTF-8 [code points<span></span>](http://www.unicode.org/glossary/#code_point)的数量：  

 
```
const $ = db.command.aggregate
db
  .collection('students')
  .aggregate()
  .project({
    _id: 0,
    nameLength: $.strLenCP('$name'),
    nicknameLength: $.strLenCP('$nickname')
  })
  .end()
```
返回结果如下：  

 
```
{ "nameLength": 11, "nicknameLength": 2 }
```

#### strcasecmp

聚合操作符。对两个字符串在不区分大小写的情况下进行大小比较，并返回比较的结果。  

      
#####  API 说明
 `strcasecmp` 的语法如下：  

 
```
db.command.aggregate.strcasecmp([<表达式1>, <表达式2>])
```
只要 `表达式1`和 `表达式2` 可以被解析成字符串，那么它们就是有效的。  

 返回的比较结果有1，0和-1三种：  

 
- 1：`表达式1` 解析的字符串 > `表达式2` 解析的字符串 - 0：`表达式1` 解析的字符串 = `表达式2` 解析的字符串 - -1：`表达式1` 解析的字符串 < `表达式2` 解析的字符串
 
#####  示例代码
 假设集合 `students` 的记录如下：  

 
```
{ "firstName": "Yuanxin", "group": "a", "lastName": "Dong", "score": 84 }
{ "firstName": "Weijia", "group": "a", "lastName": "Wang", "score": 96 }
{ "firstName": "Chengxi", "group": "b", "lastName": "Li", "score": 80 }
```
借助 `strcasecmp` 比较 `firstName` 字段值和 `lastName` 字段值的大小：  

 
```
const $ = db.command.aggregate
db
  .collection('students')
  .aggregate()
  .project({
    _id: 0,
    result: $.strcasecmp(['$firstName', '$lastName']),
  })
  .end()
```
返回结果如下：  

 
```
{ "result": 1 }
{ "result": 1 }
{ "result": -1 }
```

#### substr

聚合操作符。返回字符串从指定位置开始的指定长度的子字符串。它是 `db.command.aggregate.substrBytes` 的别名，更推荐使用后者。  

      
#####  API 说明
 `substr` 的语法如下：  

 
```
db.command.aggregate.substr([<表达式1>, <表达式2>, <表达式3>])
```
`表达式1` 是任何可以解析为字符串的有效表达式，`表达式2` 和 `表达式3` 是任何可以解析为数字的有效表达式。  

 如果 `表达式2` 是负数，返回的结果为 `""`。  

 如果 `表达式3` 是负数，返回的结果为从 `表达式2` 指定的开始位置以及之后其余部分的子字符串。  

 
#####  示例代码
 假设集合 `students` 的记录如下：  

 
```
{ "birthday": "1999/12/12", "firstName": "Yuanxin", "group": "a", "lastName": "Dong", "score": 84 }
{ "birthday": "1998/11/11", "firstName": "Weijia", "group": "a", "lastName": "Wang", "score": 96 }
{ "birthday": "1997/10/10", "firstName": "Chengxi", "group": "b", "lastName": "Li", "score": 80 }
```
借助 `substr` 可以提取 `birthday` 中的年、月、日信息，代码如下：  

 
```
const $ = db.command.aggregate
db
  .collection('students')
  .aggregate()
  .project({
    _id: 0,
    year: $.substr(['$birthday', 0, 4]),
    month: $.substr(['$birthday', 5, 2]),
    day: $.substr(['$birthday', 8, -1])
  })
  .end()
```
返回的结果如下：  

 
```
{ "day": "12", "month": "12", "year": "1999" }
{ "day": "11", "month": "11", "year": "1998" }
{ "day": "10", "month": "10", "year": "1997" }
```

#### substrBytes

聚合操作符。返回字符串从指定位置开始的指定长度的子字符串。子字符串是由字符串中指定的 `UTF-8` 字节索引的字符开始，长度为指定的字节数。  

      
#####  API 说明
 `substrBytes` 的语法如下：  

 
```
db.command.aggregate.substrBytes([<表达式1>, <表达式2>, <表达式3>])
```
`表达式1` 是任何可以解析为字符串的有效表达式，`表达式2` 和 `表达式3` 是任何可以解析为数字的有效表达式。  

 如果 `表达式2` 是负数，返回的结果为 `""`。  

 如果 `表达式3` 是负数，返回的结果为从 `表达式2` 指定的开始位置以及之后其余部分的子字符串。  

 
#####  示例代码
 假设集合 `students` 的记录如下：  

 
```
{ "birthday": "1999/12/12", "firstName": "Yuanxin", "group": "a", "lastName": "Dong", "score": 84 }
{ "birthday": "1998/11/11", "firstName": "Weijia", "group": "a", "lastName": "Wang", "score": 96 }
{ "birthday": "1997/10/10", "firstName": "Chengxi", "group": "b", "lastName": "Li", "score": 80 }
```
借助 `substrBytes` 可以提取 `birthday` 中的年、月、日信息，代码如下：  

 
```
const $ = db.command.aggregate
db
  .collection('students')
  .aggregate()
  .project({
    _id: 0,
    year: $.substrBytes(['$birthday', 0, 4]),
    month: $.substrBytes(['$birthday', 5, 2]),
    day: $.substrBytes(['$birthday', 8, -1])
  })
  .end()
```
返回的结果如下：  

 
```
{ "day": "12", "month": "12", "year": "1999" }
{ "day": "11", "month": "11", "year": "1998" }
{ "day": "10", "month": "10", "year": "1997" }
```

#### substrCP

聚合操作符。返回字符串从指定位置开始的指定长度的子字符串。子字符串是由字符串中指定的 `UTF-8` 字节索引的字符开始，长度为指定的字节数。  

      
#####  API 说明
 `substrCP` 的语法如下：  

 
```
db.command.aggregate.substrCP([<表达式1>, <表达式2>, <表达式3>])
```
`表达式1` 是任何可以解析为字符串的有效表达式，`表达式2` 和 `表达式3` 是任何可以解析为数字的有效表达式。  

 如果 `表达式2` 是负数，返回的结果为 `""`。  

 如果 `表达式3` 是负数，返回的结果为从 `表达式2` 指定的开始位置以及之后其余部分的子字符串。  

 
#####  示例代码
 假设集合 `students` 的记录如下：  

 
```
{ "name": "dongyuanxin", "nickname": "心谭" }
```
借助 `substrCP` 可以提取 `nickname` 字段值的第一个汉字：  

 
```
const $ = db.command.aggregate
db
  .collection('students')
  .aggregate()
  .project({
    _id: 0,
    firstCh: $.substrCP(['$nickname', 0, 1])
  })
  .end()
```
返回的结果如下：  

 
```
{ "firstCh": "心" }
```

#### toLower

聚合操作符。将字符串转化为小写并返回。  

     
#####  API 说明
 `toLower` 的语法如下：  

 
```
db.command.aggregate.toLower(表达式)
```
只要表达式可以被解析成字符串，那么它就是有效表达式。例如：`$ + 指定字段`。  

 
#####  示例代码
 假设集合 `students` 的记录如下：  

 
```
{ "firstName": "Yuanxin", "group": "a", "lastName": "Dong", "score": 84 }
{ "firstName": "Weijia", "group": "a", "lastName": "Wang", "score": 96 }
{ "firstName": "Chengxi", "group": "b", "lastName": "Li", "score": 80 }
```
借助 `toLower` 将 `firstName` 的字段值转化为小写：  

 
```
const $ = db.command.aggregate
db
  .collection('students')
  .aggregate()
  .project({
    _id: 0,
    result: $.toLower('$firstName'),
  })
  .end()
```
返回的结果如下：  

 
```
{ "result": "yuanxin" }
{ "result": "weijia" }
{ "result": "chengxi" }
```

#### toUpper

聚合操作符。将字符串转化为大写并返回。  

     
#####  API 说明
 `toUpper` 的语法如下：  

 
```
db.command.aggregate.toUpper(表达式)
```
只要表达式可以被解析成字符串，那么它就是有效表达式。例如：`$ + 指定字段`。  

 
#####  示例代码
 假设集合 `students` 的记录如下：  

 
```
{ "firstName": "Yuanxin", "group": "a", "lastName": "Dong", "score": 84 }
{ "firstName": "Weijia", "group": "a", "lastName": "Wang", "score": 96 }
{ "firstName": "Chengxi", "group": "b", "lastName": "Li", "score": 80 }
```
借助 `toUpper` 将 `lastName` 的字段值转化为大写：  

 
```
const $ = db.command.aggregate
db
  .collection('students')
  .aggregate()
  .project({
    _id: 0,
    result: $.toUpper('$lastName'),
  })
  .end()
```
返回的结果如下：  

 
```
{ "result": "DONG" }
{ "result": "WANG" }
{ "result": "LI" }
```

### 累计器操作符

#### addToSet

聚合操作符。聚合运算符。向数组中添加值，如果数组中已存在该值，不执行任何操作。它只能在 `group stage` 中使用。  

      
#####  API 说明
 `addToSet` 语法如下：  

 
```
db.command.aggregate.addToSet(<表达式>)
```
表达式是形如 `$ + 指定字段` 的字符串。如果指定字段的值是数组，那么整个数组会被当作一个元素。  

 
#####  示例代码
 假设集合 `passages` 的记录如下：  

 
```
{ "category": "web", "tags": [ "JavaScript", "CSS" ], "title": "title1" }
{ "category": "System", "tags": [ "C++", "C" ], "title": "title2" }
```


**非数组字段**

 每条记录的 `category` 对应值的类型是非数组，利用 `addToSet` 统计所有分类：  

 
```
const $ = db.command.aggregate
db
  .collection('passages')
  .aggregate()
  .group({
    _id: null,
    categories: $.addToSet('$category')
  })
  .end()
```
返回的结果如下：  

 
```
{ "_id": null, "categories": [ "System", "web" ] }
```


**数组字段**

 每条记录的 `tags` 对应值的类型是数组，数组不会被自动展开：  

 
```
const $ = db.command.aggregate
db
  .collection('passages')
  .aggregate()
  .group({
    _id: null,
    tagsList: $.addToSet('$tags')
  })
  .end()
```
返回的结果如下：  

 
```
{ "_id": null, "tagsList": [ [ "C++", "C" ], [ "JavaScript", "CSS" ] ] }
```

#### avg

聚合操作符。返回一组集合中，指定字段对应数据的平均值。  

      
#####  API 说明
 `avg` 的语法如下：  

 
```
db.command.aggregate.avg(<number>)
```
`avg` 传入的值除了数字常量外，也可以是任何最终解析成一个数字的表达式。它会忽略非数字值。  

 
#####  示例代码
 假设集合 `students` 的记录如下：  

 
```
{ "group": "a", "name": "stu1", "score": 84 }
{ "group": "a", "name": "stu2", "score": 96 }
{ "group": "b", "name": "stu3", "score": 80 }
{ "group": "b", "name": "stu4", "score": 100 }
```
借助 `avg` 可以计算所有记录的 `score` 的平均值：  

 
```
const $ = db.command.aggregate
db
  .collection('students')
  .aggregate()
  .group({
    _id: null,
    average: $.avg('$score')
  })
  .end()
```
返回的结果如下：  

 
```
{ "_id": null, "average": 90 }
```

#### first

聚合操作符。返回指定字段在一组集合的第一条记录对应的值。仅当这组集合是按照某种定义排序（ `sort` ）后，此操作才有意义。  

      
#####  API 说明
 `first` 的语法如下：  

 
```
db.command.aggregate.first(<表达式>)
```
表达式是形如 `$ + 指定字段` 的字符串。  

 `first` 只能在 `group` 阶段被使用，并且需要配合 `sort` 才有意义。  

 
#####  示例代码
 假设集合 `students` 的记录如下：  

 
```
{ "group": "a", "name": "stu1", "score": 84 }
{ "group": "a", "name": "stu2", "score": 96 }
{ "group": "b", "name": "stu3", "score": 80 }
{ "group": "b", "name": "stu4", "score": 100 }
```
如果需要得到所有记录中 `score` 的最小值，可以先将所有记录按照 `score` 排序，然后取出第一条记录的 `first`。  

 
```
const $ = db.command.aggregate
db
  .collection('students')
  .aggregate()
  .sort({
    score: 1
  })
  .group({
    _id: null,
    min: $.first('$score')
  })
  .end()
```
返回的数据结果如下：  

 
```
{ "_id": null, "min": 80 }
```

#### last

聚合操作符。返回指定字段在一组集合的最后一条记录对应的值。仅当这组集合是按照某种定义排序（ `sort` ）后，此操作才有意义。  

      
#####  API 说明
 `last` 的语法如下：  

 
```
db.command.aggregate.last(<表达式>)
```
表达式是形如 `$ + 指定字段` 的字符串。  

 `last` 只能在 `group` 阶段被使用，并且需要配合 `sort` 才有意义。  

 
#####  示例代码
 假设集合 `students` 的记录如下：  

 
```
{ "group": "a", "name": "stu1", "score": 84 }
{ "group": "a", "name": "stu2", "score": 96 }
{ "group": "b", "name": "stu3", "score": 80 }
{ "group": "b", "name": "stu4", "score": 100 }
```
如果需要得到所有记录中 `score` 的最大值，可以先将所有记录按照 `score` 排序，然后取出最后一条记录的 `last`。  

 
```
const $ = db.command.aggregate
db
  .collection('students')
  .aggregate()
  .sort({
    score: 1
  })
  .group({
    _id: null,
    max: $.last('$score')
  })
  .end()
```
返回的数据结果如下：  

 
```
{ "_id": null, "max": 100 }
```

#### max

聚合操作符。返回一组数值的最大值。  

      
#####  API 说明
 `max` 的语法如下：  

 
```
db.command.aggregate.max(<表达式>)
```
表达式是形如 `$ + 指定字段` 的字符串。  

 
#####  示例代码
 假设集合 `students` 的记录如下：  

 
```
{ "group": "a", "name": "stu1", "score": 84 }
{ "group": "a", "name": "stu2", "score": 96 }
{ "group": "b", "name": "stu3", "score": 80 }
{ "group": "b", "name": "stu4", "score": 100 }
```
借助 `max` 可以统计不同组（ `group` ）中成绩的最高值，代码如下：  

 
```
const $ = db.command.aggregate
db
  .collection('students')
  .aggregate()
  .group({
    _id: '$group',
    maxScore: $.max('$score')
  })
  .end()
```
返回的数据结果如下：  

 
```
{ "_id": "b", "maxScore": 100 }
{ "_id": "a", "maxScore": 96 }
```.

```

#### mergeObjects

见[mergeObjects](#mergeObjects)

#### min

聚合操作符。返回一组数值的最小值。  

      
#####  API 说明
 `min` 的语法如下：  

 
```
db.command.aggregate.min(<表达式>)
```
表达式是形如 `$ + 指定字段` 的字符串。  

 
#####  示例代码
 假设集合 `students` 的记录如下：  

 
```
{ "group": "a", "name": "stu1", "score": 84 }
{ "group": "a", "name": "stu2", "score": 96 }
{ "group": "b", "name": "stu3", "score": 80 }
{ "group": "b", "name": "stu4", "score": 100 }
```
借助 `min` 可以统计不同组（ `group` ）中成绩的最低值，代码如下：  

 
```
const $ = db.command.aggregate
db
  .collection('students')
  .aggregate()
  .group({
    _id: '$group',
    minScore: $.min('$score')
  })
  .end()
```
返回的数据结果如下：  

 
```
{ "_id": "b", "minScore": 80 }
{ "_id": "a", "minScore": 84 }
```

#### push

聚合操作符。在 `group` 阶段，返回一组中表达式指定列与对应的值，一起组成的数组。  

     
#####  API 说明
 `push` 语法如下：  

 
```
db.command.aggregate.push({
  <字段名1>: <指定字段1>,
  <字段名2>: <指定字段2>,
  ...
})
```

#####  示例代码
 假设集合 `students` 的记录如下：  

 
```
{ "group": "a", "name": "stu1", "score": 84 }
{ "group": "a", "name": "stu2", "score": 96 }
{ "group": "b", "name": "stu3", "score": 80 }
{ "group": "b", "name": "stu4", "score": 100 }
```
借助 `push` 操作，对不同分组( `group` )的所有记录，聚合所有数据并且将其放入一个新的字段中，进一步结构化和语义化数据。  

 
```
const $ = db.command.aggregate
db
  .collection('students')
  .aggregate()
  .group({
    _id: '$group',
    students: $.push({
      name: '$name',
      score: '$score'
    })
  })
  .end()
```
输出结果如下：  

 
```
{ "_id": "b", "students": [{ "name": "stu3", "score": 80 }, { "name": "stu4", "score": 100 }] }
{ "_id": "a", "students": [{ "name": "stu1", "score": 84 }, { "name": "stu2", "score": 96 }] }
```

#### stdDevPop

聚合操作符。返回一组字段对应值的标准差。  

      
#####  API 说明
 `stdDevPop` 的使用形式如下：  

 
```
db.command.aggregate.stdDevPop(<表达式>)
```
表达式传入的是指定字段，指定字段对应的值的数据类型必须是 `number` ，否则结果会返回 `null`。  

 
#####  示例代码
 假设集合 `students` 的记录如下：`a` 组同学的成绩分别是84和96，`b`组同学的成绩分别是80和100。  

 
```
{ "group":"a", "score":84 }
{ "group":"a", "score":96 }
{ "group":"b", "score":80 }
{ "group":"b", "score":100 }
```
可以用 `stdDevPop` 来分别计算 `a` 和 `b` 两组同学成绩的标准差，以此来比较哪一组同学的成绩更稳定。代码如下：  

 
```
const $ = db.command.aggregate
db.collection('students').aggregate()
  .group({
    _id: '$group',
    stdDev: $.stdDevPop('$score')
  })
  .end()
```
返回的数据结果如下：  

 
```
{ "_id": "b", "stdDev": 10 }
{ "_id": "a", "stdDev": 6 }
```

#### stdDevSamp

聚合操作符。计算输入值的样本标准偏差。如果输入值代表数据总体，或者不概括更多的数据，请改用 `db.command.aggregate.stdDevPop`。  

      
#####  API 说明
 `stdDevSamp` 的使用形式如下：  

 
```
db.command.aggregate.stdDevSamp(<表达式>)
```
表达式传入的是指定字段，`stdDevSamp` 会自动忽略非数字值。如果指定字段所有的值均是非数字，那么结果返回 `null`。  

 
#####  示例代码
 假设集合 `students` 的记录如下：  

 
```
{ "score": 80 }
{ "score": 100 }
```
可以用 `stdDevSamp` 来计算成绩的标准样本偏差。代码如下：  

 
```
const $ = db.command.aggregate
db.collection('students').aggregate()
  .group({
    _id: null,
    ageStdDev: $.stdDevSamp('$score')
  })
  .end()
```
返回的数据结果如下：  

 
```
{ "_id": null, "ageStdDev": 14.142135623730951 }
```
如果向集合 `students` 添加一条新记录，它的 `score` 字段类型是 `string`：  

 
```
{ "score": "aa" }
```
用上面代码计算标准样本偏差时，`stdDevSamp` 会自动忽略类型不为 `number` 的记录，返回结果保持不变。

#### sum

聚合操作符。计算并且返回一组字段所有数值的总和。  

      
#####  API 说明
 `sum` 的使用形式如下：  

 
```
db.command.aggregate.sum(<表达式>)
```
表达式可以传入指定字段，也可以传入指定字段组成的列表。`sum` 会自动忽略非数字值。如果字段下的所有值均是非数字，那么结果返回 0。若传入数字常量，则当做所有记录该字段的值都给给定常量，在聚合时相加，最终值为输入记录数乘以常量。  

 
#####  示例代码
 假设代表商品的集合 `goods` 的记录如下：`price` 代表商品销售额，`cost` 代表商品成本  

 
```
{ "cost": -10, "price": 100 }
{ "cost": -15, "price": 1 }
{ "cost": -10, "price": 10 }
```


**单独字段**

 借助 `sum` 可以计算所有商品的销售总和，代码如下：  

 
```
const $ = db.command.aggregate
db
  .collection('goods')
  .aggregate()
  .group({
    _id: null,
    totalPrice: $.sum('$price')
  })
  .end()
```
返回的数据结果如下：销售额是 111  

 
```
{ "_id": null, "totalPrice": 111 }
```


**字段列表**

 如果需要计算所有商品的利润总额，那么需要将每条记录的 `cost` 和 `price` 相加得到此记录对应商品的利润。最后再计算所有商品的利润总额。  

 借助 `sum`，代码如下：  

 
```
const $ = db.command.aggregate
db
  .collection('goods')
  .aggregate()
  .group({
    _id: null,
    totalProfit: $.sum(
      $.sum(['$price', '$cost'])
    )
  })
  .end()
```
返回的数据结果如下：利润总额为 76  

 
```
{ "_id": null, "totalProfit": 76 }
```

### 变量操作符

#### let

聚合操作符。自定义变量，并且在指定表达式中使用，返回的结果是表达式的结果。  

     
#####  API 说明
 `let` 的语法如下：  

 
```
db.command.aggregate.let({
  vars: {
    <变量1>: <变量表达式>,
    <变量2>: <变量表达式>,
    ...
  },
  in: <结果表达式>
})
```
`vars` 中可以定义多个变量，变量的值由 `变量表达式` 计算而来，并且被定义的变量只有在 `in` 中的 `结果表达式` 才可以访问。  

 在 `in` 的结果表达式中访问自定义变量时候，请在变量名前加上双美元符号( `$$` )并用引号括起来。  

 
#####  示例代码
 假设代表商品的集合 `goods` 的记录如下：`price` 代表商品价格，`discount` 代表商品折扣率，`cost` 代表商品成本  

 
```
{ "cost": -10, "discount": 0.95, "price": 100 }
{ "cost": -15, "discount": 0.98, "price": 1 }
{ "cost": -10, "discount": 1, "price": 10 }
```
借助 `let` 可以定义并计算每件商品实际的销售价格，并将其赋值给自定义变量 `priceTotal`。最后再将 `priceTotal` 与 `cost` 进行取和( `sum` )运算，得到每件商品的利润。  

 代码如下：  

 
```
const $ = db.command.aggregate
db
  .collection('goods')
  .aggregate()
  .project({
    profit: $.let({
      vars: {
        priceTotal: $.multiply(['$price', '$discount'])
      },
      in: $.sum(['$$priceTotal', '$cost'])
    })
  })
  .end()
```
返回的数据结果如下：  

 
```
{ "profit": 85 }
{ "profit": -14.02 }
{ "profit": 0 }
```

