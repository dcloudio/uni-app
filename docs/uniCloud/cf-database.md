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

## 获取数据库的引用

```js
const db = uniCloud.database();
```

<!-- **DBOptions参数说明**

|字段	|类型		|必填	|描述				|平台差异说明	|
|:-:	|:-:		|:-:	|:-:				|:-:					|
|spaceId	|String	|否		|服务空间ID	|仅腾讯云支持	|
 -->
<!-- ## 新增集合

如果集合已存在，则报错。

```
db.createCollection(collectionName)
```
 -->
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
| ----	| ------								|
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

以下对几个特殊的数据类型做个补充说明
- 时间 Date

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

<!-- 2. 地理位置

参考：[GEO地理位置](#GEO地理位置) -->

- Null

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

Tips:云服务商为阿里云时，若集合不存在，调用add方法会自动创建集合

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

<!-- ## GEO地理位置

注意：**如果需要对类型为地理位置的字段进行搜索，一定要建立地理位置索引**。

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
 -->
<!-- ## 数据库实时推送

监听指定集合中符合查询条件的文档，通过onchange回调获得文档的变化详情
(where参数为查询条件 参考 [查询文档](#查询文档))

```js
  const uniClient =  uniCloud.init({
      spaceId: 'YourSpaceId
  });
  const db = uniClient.database();
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
<!-- ## 平台差异

|差异项					|说明																							|
|:-:						|:-:																							|
|add						|使用阿里云时在集合不存在的时候调用会自动创建集合	|
|数据库实时推送	|阿里云暂不支持																		|
|GEO地理位置		|阿里云暂不支持																		| -->

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

<!-- ### geoNear

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
``` -->

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

聚合阶段。聚合阶段。联表查询。与同个数据库下的一个指定的集合做 left outer join(左外连接)。对该阶段的每一个输入记录，lookup 会在该记录中增加一个数组字段，该数组是被联表中满足匹配条件的记录列表。lookup 会将连接后的结果输出给下个阶段。

**API 说明**

`lookup` 有两种使用方式

1. 相等匹配
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

2. 自定义连接条件、拼接子查询

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

参数字段	说明
from	要进行连接的另外一个集合的名字
let	可选。指定在 pipeline 中可以使用的变量，变量的值可以引用输入记录的字段，比如 let: { userName: '$name' } 就代表将输入记录的 name 字段作为变量 userName 的值。在 pipeline 中无法直接访问输入记录的字段，必须通过 let 定义之后才能访问，访问的方式是在 expr 操作符中用 $$变量名 的方式访问，比如 $$userName。
pipeline	指定要在被连接集合中运行的聚合操作。如果要返回整个集合，则该字段取值空数组 []。在 pipeline 中无法直接访问输入记录的字段，必须通过 let 定义之后才能访问，访问的方式是在 expr 操作符中用 $$变量名 的方式访问，比如 $$userName。
as	指定连接匹配出的记录列表要存放的字段名，这个数组包含的是匹配出的来自 from 集合的记录。如果输入记录中本来就已有该字段，则该字段会被覆写

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


### 累计器操作符

#### addToSet

聚合操作符。聚合运算符。向数组中添加值，如果数组中已存在该值，不执行任何操作。它只能在 group stage 中使用。

**API 说明**

**addToSet 语法如下：**
```
db.command.aggregate.addToSet(<表达式>)
```
表达式是形如 $ + 指定字段 的字符串。如果指定字段的值是数组，那么整个数组会被当作一个元素。

**示例代码**

假设集合 passages 的记录如下：
```
{ "category": "web", "tags": [ "JavaScript", "CSS" ], "title": "title1" }
{ "category": "System", "tags": [ "C++", "C" ], "title": "title2" }
```

**非数组字段**

每条记录的 category 对应值的类型是非数组，利用 addToSet 统计所有分类：
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

每条记录的 tags 对应值的类型是数组，数组不会被自动展开：
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

**API 说明**

**avg 的语法如下：**
```
db.command.aggregate.avg(<number>)
```

avg 传入的值除了数字常量外，也可以是任何最终解析成一个数字的表达式。它会忽略非数字值。

**示例代码**
假设集合 students 的记录如下：
```
{ "group": "a", "name": "stu1", "score": 84 }
{ "group": "a", "name": "stu2", "score": 96 }
{ "group": "b", "name": "stu3", "score": 80 }
{ "group": "b", "name": "stu4", "score": 100 }
```
借助 avg 可以计算所有记录的 score 的平均值：
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

聚合操作符。返回指定字段在一组集合的第一条记录对应的值。仅当这组集合是按照某种定义排序（ sort ）后，此操作才有意义。

**API 说明**

**first 的语法如下：**
```
db.command.aggregate.first(<表达式>)
```

表达式是形如 $ + 指定字段 的字符串。

first 只能在 group 阶段被使用，并且需要配合 sort 才有意义。

**示例代码**

假设集合 students 的记录如下：
```
{ "group": "a", "name": "stu1", "score": 84 }
{ "group": "a", "name": "stu2", "score": 96 }
{ "group": "b", "name": "stu3", "score": 80 }
{ "group": "b", "name": "stu4", "score": 100 }
```
如果需要得到所有记录中 score 的最小值，可以先将所有记录按照 score 排序，然后取出第一条记录的 first。
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

聚合操作符。返回指定字段在一组集合的最后一条记录对应的值。仅当这组集合是按照某种定义排序（ sort ）后，此操作才有意义。

**API 说明**

**last 的语法如下：**
```
db.command.aggregate.last(<表达式>)
```
表达式是形如 $ + 指定字段 的字符串。

last 只能在 group 阶段被使用，并且需要配合 sort 才有意义。

**示例代码**
假设集合 students 的记录如下：
```
{ "group": "a", "name": "stu1", "score": 84 }
{ "group": "a", "name": "stu2", "score": 96 }
{ "group": "b", "name": "stu3", "score": 80 }
{ "group": "b", "name": "stu4", "score": 100 }
```
如果需要得到所有记录中 score 的最大值，可以先将所有记录按照 score 排序，然后取出最后一条记录的 last。
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

**API 说明**

**max 的语法如下：**
```
db.command.aggregate.max(<表达式>)
```
表达式是形如 $ + 指定字段 的字符串。

**示例代码**
假设集合 students 的记录如下：
```
{ "group": "a", "name": "stu1", "score": 84 }
{ "group": "a", "name": "stu2", "score": 96 }
{ "group": "b", "name": "stu3", "score": 80 }
{ "group": "b", "name": "stu4", "score": 100 }
```
借助 max 可以统计不同组（ group ）中成绩的最高值，代码如下：
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
```

#### mergeObjects

聚合操作符。将多个文档合并为单个文档。

**API 说明**

**使用形式如下： 在 group() 中使用时：**
```
mergeObjects(<document>)
```
**在其它表达式中使用时：**
```
mergeObjects([<document1>, <document2>, ...])
```
**示例代码**

**搭配 group() 使用**

假设集合 sales 存在以下文档：
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

假设集合 test 存在以下文档：
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

#### min

聚合操作符。返回一组数值的最小值。

**API 说明**

**min 的语法如下：**
```
db.command.aggregate.min(<表达式>)
```
表达式是形如 $ + 指定字段 的字符串。

**示例代码**

假设集合 students 的记录如下：
```
{ "group": "a", "name": "stu1", "score": 84 }
{ "group": "a", "name": "stu2", "score": 96 }
{ "group": "b", "name": "stu3", "score": 80 }
{ "group": "b", "name": "stu4", "score": 100 }
```
借助 min 可以统计不同组（ group ）中成绩的最低值，代码如下：
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

聚合操作符。在 group 阶段，返回一组中表达式指定列与对应的值，一起组成的数组。

**API 说明**

**push 语法如下：**
```
db.command.aggregate.push({
  <字段名1>: <指定字段1>,
  <字段名2>: <指定字段2>,
  ...
})
```
**示例代码**

假设集合 students 的记录如下：
```
{ "group": "a", "name": "stu1", "score": 84 }
{ "group": "a", "name": "stu2", "score": 96 }
{ "group": "b", "name": "stu3", "score": 80 }
{ "group": "b", "name": "stu4", "score": 100 }
```
借助 push 操作，对不同分组( group )的所有记录，聚合所有数据并且将其放入一个新的字段中，进一步结构化和语义化数据。
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

**API 说明**

**stdDevPop 的使用形式如下：**
```
db.command.aggregate.stdDevPop(<表达式>)
```

表达式传入的是指定字段，指定字段对应的值的数据类型必须是 number ，否则结果会返回 null。

**示例代码**

假设集合 students 的记录如下：a 组同学的成绩分别是84和96，b组同学的成绩分别是80和100。
```
{ "group":"a", "score":84 }
{ "group":"a", "score":96 }
{ "group":"b", "score":80 }
{ "group":"b", "score":100 }
```
可以用 `stdDevPop` 来分别计算 a 和 b 两组同学成绩的标准差，以此来比较哪一组同学的成绩更稳定。代码如下：
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

聚合操作符。计算输入值的样本标准偏差。如果输入值代表数据总体，或者不概括更多的数据，请改用 db.command.aggregate.stdDevPop。

**API 说明**

**stdDevSamp 的使用形式如下：**
```
db.command.aggregate.stdDevSamp(<表达式>)
```

表达式传入的是指定字段，stdDevSamp 会自动忽略非数字值。如果指定字段所有的值均是非数字，那么结果返回 null。

**示例代码**

假设集合 students 的记录如下：
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
如果向集合 students 添加一条新记录，它的 score 字段类型是 string：

```
{ "score": "aa" }
```
用上面代码计算标准样本偏差时，stdDevSamp 会自动忽略类型不为 number 的记录，返回结果保持不变。

#### sum

聚合操作符。计算并且返回一组字段所有数值的总和。

**API 说明**

**sum 的使用形式如下：**
```
db.command.aggregate.sum(<表达式>)
```

表达式可以传入指定字段，也可以传入指定字段组成的列表。sum 会自动忽略非数字值。如果字段下的所有值均是非数字，那么结果返回 0。若传入数字常量，则当做所有记录该字段的值都给给定常量，在聚合时相加，最终值为输入记录数乘以常量。

**示例代码**

假设代表商品的集合 goods 的记录如下：price 代表商品销售额，cost 代表商品成本
```
{ "cost": -10, "price": 100 }
{ "cost": -15, "price": 1 }
{ "cost": -10, "price": 10 }
```

**单独字段**

借助 sum 可以计算所有商品的销售总和，代码如下：
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

如果需要计算所有商品的利润总额，那么需要将每条记录的 cost 和 price 相加得到此记录对应商品的利润。最后再计算所有商品的利润总额。

借助 sum，代码如下：
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