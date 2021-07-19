## 基础概念

`uniCloud`提供了一个 JSON 格式的文档型数据库。顾名思义，数据库中的每条记录都是一个 JSON 格式的文档。

它是nosql非关系型数据库，如果您之前熟悉sql关系型数据库，那么两者概念对应关系如下表：

|关系型					|JSON 文档型							|
|:-							|:-												|
|数据库 database|数据库 database					|
|表 table				|集合 collection。但行业里也经常称之为“表”。无需特意区分					|
|行 row					|记录 record / doc				|
|字段 column		|字段 field								|
|使用sql语法操作|使用MongoDB语法或jql操作	|

一个`uniCloud`服务空间，有且只有一个数据库。一个数据库支持多个集合（表）。一个集合可以有多个记录。每个记录可以有多个字段。

例如，数据库中有一个集合，名为user，存放用户信息。集合user的数据内容如下：

```json
{"name":"张三","tel":"13900000000"}
{"name":"李四","tel":"13911111111"}
```

上述数据中，每行数据表示一个用户的信息，被称之为“记录(record/doc)”。name和tel称之为“字段(field)”。而“13900000000”则是第一条记录的字段tel的值。

每行记录，都是一个完整的json文档，获取到记录后可以使用常规json方式操作。但集合并非json文档，集合是多个json文档的汇总，获取集合需要使用专门的API。

与关系型数据库的二维表格式不同，json文档数据库支持不同记录拥有不同的字段、支持多层嵌套数据。

仍然以user集合举例，要在数据库中存储每个人的每次登录时间和登录ip，则变成如下：

```json
{
	"name":"张三","tel":"13900000000","login_log":[
		{"login_date":1604186605445,"login_ip":"192.168.1.1"},
		{"login_date":1604186694137,"login_ip":"192.168.1.2"}
	]
}
{"name":"李四","tel":"13911111111"}
```

上述数据表示张三登录了2次，login_date里的值是时间戳(timestamp)格式，后续会讲解timestamp。而李四没有登录过。

可以看出json文档数据库相对于关系型数据库的灵活，李四可以没有login_log字段，也可以有这个字段但登录次数记录与张三不同。

_此处仅为举例，实际业务中，登录日志单独存放在另一个集合更好_

对于初学者，如果不了解数据库设计，可以参考[opendb](https://gitee.com/dcloud/opendb)，已经预置了大量常见的数据库设计。

对于不熟悉传统数据库，但掌握json的js工程师而言，uniCloud的云数据库更亲切，没有传统数据库高昂的学习成本。

在uniCloud web控制台新建表时，在下面的模板中也可以选择各种`opendb`表模板，直接创建。

**字段的值，支持以下类型：**
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
* Null：相当于一个占位符，表示一个字段存在但是值为空。

DB Schema中还扩展了其他字段类型，但其实都是基本类型的扩展，比如file类型其实是一种特殊的object，而password类型是一种特殊的string类型。

uniCloud同时支持阿里云和腾讯云，它们的数据库大体相同，有细微差异。阿里云的数据库是mongoDB4.0，腾讯云则使用自研的文档型数据库（兼容mongoDB 4.0版本）。uniCloud基本抹平了不同云厂商的差异，有差异的部分会在文档中单独标注。

如果想在云函数连接其他数据库，如mysql/redis，用法和nodejs连接这些数据库是一样的。插件市场已经有人提供了插件，见下。但注意这些用法推荐用于数据导入，主业务开发不建议这么使用。因为其他服务器上的数据库和云函数环境物理上不在一起，连接会比较慢。

- [云函数连接Mysql数据库示例](https://ext.dcloud.net.cn/plugin?id=1925)
- [云函数连接Redis数据库示例](https://ext.dcloud.net.cn/plugin?id=1846)

## 操作数据库的2种方法

云数据库支持通过云函数访问，也支持在客户端访问云数据库。

- 云函数操作数据库是较为传统的开发方式，使用nodejs写云函数、使用传统的MongoDB的API操作云数据库。

- 客户端访问云数据库，称为[clientDB](https://uniapp.dcloud.net.cn/uniCloud/clientdb)。这种开发方式可大幅提升开发效率，避免开发者开发服务器代码，并且支持更易用的`jql`语法操作数据库，是更为推荐的开发方式。[clientDB](https://uniapp.dcloud.net.cn/uniCloud/clientdb)有单独一套权限和字段值控制系统，无需担心数据库安全。（使用[clientDB](https://uniapp.dcloud.net.cn/uniCloud/clientdb)推荐HBuilderX 2.9.5以上版本。2.9.5以下的版本需单独下载插件，并且不支持`jql`，不再推荐使用。）

不管使用哪种方法，都有很多公共的概念或功能。本文档将讲述这些公共的内容。

同时左侧导航有2种方法的专项链接，描述它们各自特有的功能。
- [云函数使用传统MongoDB语法操作数据库](uniCloud/cf-database)
- [前端操作数据库，clientDB和jql](uniCloud/clientdb)

## 获取数据库对象@database

想要通过代码操作数据库，第一步要获取服务空间里的数据库对象。

不管云函数还是前端，获取数据库连接都是如下写法。前端写法需2.9.5起支持。

```js
const db = uniCloud.database(); //代码块为cdb
```

js中敲下代码块`cdb`，即可快速输入上述代码。

**DBOptions参数说明**

> DBOptions仅腾讯云在云函数内可用

|字段		|类型		|必填	|描述											|平台差异说明	|
|:-:		|:-:		|:-:	|:-:											|:-:					|
|spaceId|String	|否		|同一账号下的，服务空间ID	|仅腾讯云支持	|

```js
// 如果ID为tcb-space-demo的服务空间也在你的账号下，可以通过这种方式访问tcb-space-demo的数据库。调用此接口的服务空间和tcb-space-demo对应的服务空间均为腾讯云才可以正常使用
const db = uniCloud.database({
  spaceId: 'tcb-space-demo'
});
```

 
## 创建一个集合/数据表@createCollection

新建的服务空间，没有数据表。需要首先创建集合/数据表。

可以在uniCloud的web控制台([https://unicloud.dcloud.net.cn](https://unicloud.dcloud.net.cn))在web页面创建数据表，也可以通过代码创建数据表。

通过代码创建数据表的方式，阿里云和腾讯云有差别：

- 阿里云

调用add方法，给某数据表新增数据记录时，如果该数据表不存在，会自动创建该数据表。如下代码给table1数据表新增了一条数据，如果table1不存在，会自动创建。

```js
const db = uniCloud.database();
db.collection("table1").add({name: 'Ben'})
```

- 腾讯云

腾讯云提供了专门的创建数据表的API，此API仅支持云函数内运行，不支持clientDB调用。

```js
const db = uniCloud.database();
db.createCollection("table1")
```

**注意**
* 如果数据表已存在，腾讯云调用createCollection方法会报错
* 腾讯云调用collection的add方法不会自动创建数据表，不存在的数据表会报错
* 阿里云没有createCollection方法

## 集合/数据表的3个组成部分

每个数据表，其实包含3个部分：
- data：数据内容
- index：索引
- schema：数据表格式定义

在uniCloud的web控制台可以看到一个数据表的3部分内容。

### 数据内容@dbdata

data很简单，就是存放的数据记录(record)。

实际上，创建一条新记录，是不管在web控制台创建，还是通过API创建，每条记录都会自带一个`_id`字段用以作为该记录的唯一标志。

`_id`字段是每个数据表默认自带且不可删除的字段。同时，它也是数据表的索引。

阿里云使用的是标准的mongoDB，`_id`是自增的，后创建的记录的`_id`总是大于先生成的`_id`。传统数据库的自然数自增字段在多物理机的大型数据库下很难保持同步，大型数据库均使用`_id`这种长度较长、不会重复且仍然保持自增规律的方式。

**腾讯云使用的是兼容mongoDB的自研数据库，`_id`并非自增**

插入/导入数据时也可以自行指定`_id`而不使用自动生成的`_id`，这样可以很方便的将其他数据库的数据迁移到uniCloud云数据库

### 数据库索引@dbindex

所谓索引，是指在数据表的众多字段中挑选一个或多个字段，让数据库引擎优先处理这些字段。设置为索引的字段，在通过该字段查询记录时可以获得更快的查询速度。但设置过多索引也不合适，会造成数据新增和删除变慢。

一个数据表可以有多个字段被设为索引。

索引分唯一型和非唯一型。

唯一型索引要求整个数据表多个记录的该字段的值不能重复。比如`_id`就是唯一型索引。

假使有2个人都叫“张三”，那么他们在user数据表里的区分就是依靠不同的`_id`来区分。

如果我们要根据name字段来查询，为了提升查询速度，此时可以把name字段设为非唯一索引。

索引内容较多，还有“组合索引”、“稀疏索引”、“地理位置索引”、“TTL索引”等概念。有单独的文档详细讲述索引，另见：[数据库索引](/uniCloud/db-index)


**在web控制台添加上述索引**

![](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/fca53140-1d91-11eb-880a-0db19f4f74bb.jpg)

**注意**
- 如果记录中已经存在多个记录某字段相同的情况，那么将该字段设为唯一型索引会失败。
- 如果已经设置某字段为唯一索引，在新增和修改记录时如果该字段的值之前在其他记录已存在，会失败。
- 假如记录中不存在某个字段，则对索引字段来说其值默认为 null，如果该索引字段设为唯一型索引，则不允许存在两个或以上的该字段为null或不存在该字段的记录。此时需要设置稀疏索引来解决多个null重复的问题


### 数据表格式定义@dbschema

`DB Schema`是集合的表结构描述。描述数据表有哪些字段、值域类型是什么、是否必填、数据操作权限等很多内容。

因为json文档数据库的灵活性，data数据的字段可以不在schema的描述范围内。

`DB Schema`更多是为搭配clientDB使用的，如果使用clientDB则需要详细阅读`DB Schema`的文档。

`DB Schema`涉及内容较多，另见文档：[https://uniapp.dcloud.io/uniCloud/schema](uniCloud/schema)


## 获取集合/数据表对象

创建好数据表后，可以通过API获取数据表对象。
```js
const db = uniCloud.database();
// 获取名为 `table1` 数据表的引用
const collection = db.collection('table1');
```

**集合/数据表 Collection 的方法**

通过 `db.collection(name)` 可以获取指定数据表的引用，在数据表上可以进行以下操作

| 类型		| 接口		| 说明																														|
| --------	| -------	| ----------------------------------------------------------------------------------										|
| 写		| add		| 新增记录（触发请求）																										|
| 计数		| count		| 获取符合条件的记录条数																									|
| 读		| get		| 获取数据表中的记录，如果有使用 where 语句定义查询条件，则会返回匹配结果集 (触发请求)										|
| 引用		| doc		| 获取对该数据表中指定 id 的记录的引用																						|
| 查询条件	| where		| 通过指定条件筛选出匹配的记录，可搭配查询指令（eq, gt, in, ...）使用														|
|			| skip		| 跳过指定数量的文档，常用于分页，传入 offset。clientDB组件有封装好的更易用的分页，[另见](uniCloud/uni-clientdb-component)	|
|			| orderBy	| 排序方式																													|
|			| limit		| 返回的结果集(文档数量)的限制，有默认值和上限值																			|
|			| field		| 指定需要返回的字段																										|

collection对象的方法可以增和查数据，删和改不能直接操作，需要collection对象通过doc或get得到指定的记录后再调用remove或update方法进行删改。

具体前端clientDB和云函数各自增删改查的方法，请单独参考文档：
- [云函数使用传统MongoDB语法操作数据库](uniCloud/cf-database)
- [前端操作数据库，clientDB和jql](uniCloud/clientdb)

## 数据导入导出和备份@dbmigration

uniCloud数据库提供了多种数据导入导出和备份方案。

- db\_init.json：常用于插件市场的插件做环境初始化。完整支持数据、索引、schema三部分。不适合处理大量数据，操作可能超时
- 数据库回档备份和恢复。仅腾讯云支持。支持数据和索引，不支持schema
- 数据库导入导出。仅阿里云支持，适用于大数据量操作。仅支持数据，不支持索引和schema

除上述三种方法外，开发者还可以编程处理数据的导入导出。如进行大量数据操作，建议在HBuilderX的本地运行云函数环境中操作，这样可以避免触发云端的云函数超时限制。

下面对三种方法的使用方式进行详细说明：

### `db_init.json`初始化数据库@db-init

`db_init.json`定义了一个json格式，里面包含了表名、表数据、表索引等表的相关数据。

在HBuilderX中，项目的cloudfunctions目录（HBuilderX 2.5.11 - 2.9.11版本） 或 uniCloud/database 目录（HBuilderX 3.0+版本），可以放置`db_init.json`文件，对该文件点右键，可以按`db_init.json`的描述，在云服务空间创建相应的表、初始化表中的数据、索引和schema。

这个功能尤其适合插件作者，可以快速初始化插件所需的数据库环境。

**`db_init.json`的数据格式**

`db_init.json`包含三部分：数据内容(data)、数据表索引(index)、数据表结构(schema)，形式如下

**注意：HBuilderX 3.0.0以上版本schema不再放在db_init.json内，而是独立放在uniCloud/database/目录下。**

详细调整如下：

- db_init.json位置由`cloudfunctions/db_init.json`移至`uniCloud/database/db_init.json`
- schema不再放在db_init.json内，每个表都有一个单独的schema文件，比如news表对应的schema为`uniCloud/database/news.schema.json`
- schema可以在`uniCloud/database`目录上右键创建
- `db_init.json`文件右键初始化云数据库时依然会带上schema进行数据库的初始化，除schema外HBuilderX3.0.0以上版本使用db_init.json初始化数据库还会带上扩展校验函数，扩展校验函数位于`uniCloud/database/validateFunction`目录下，扩展校验函数文档详见：[validateFunction](https://uniapp.dcloud.net.cn/uniCloud/schema?id=validatefunction)

**HBuilderX 3.0.0版本之前的db_init.json示例**

```json
{
  "collection_test": { // 集合（表名）
    "data": [ // 数据
      {
        "_id": "da51bd8c5e37ac14099ea43a2505a1a5", // 一般不带_id字段，防止导入时数据冲突。
        "name": "tom"
      }
    ],
    "index": [{ // 索引
      "IndexName": "index_a", // 索引名称
      "MgoKeySchema": { // 索引规则
        "MgoIndexKeys": [{
          "Name": "index", // 索引字段
          "Direction": "1" // 索引方向，1：ASC-升序，-1：DESC-降序，2dsphere：地理位置
        }],
        "MgoIsUnique": false, // 索引是否唯一
        "MgoIsSparse": false // 是否为稀疏索引，请参考 https://uniapp.dcloud.net.cn/uniCloud/db-index.md?id=sparse
      }
    }],
    "schema": { // HBuilderX 3.0.0以上版本schema不在此处，而是放在database目录下单独的`表名.schema.json`文件内
      "bsonType": "object",
      "permission": {
        ".read": true,
        ".create": false,
        ".update": false,
        ".delete": false
      },
      "required": [
        "image_url"
      ],
      "properties": {
        "_id": {
          "description": "ID，系统自动生成"
        },
        "image_url": {
          "bsonType": "string",
          "description": "可以是在线地址，也支持本地地址",
          "label": "图片url"
        }
      }
    }
  }
}

```

在HBuilderX中对上述`db_init.json`点右键，可初始化数据库到云服务空间，创建`collection_test`表，并按上述json配置设置该表的index索引和schema，以及插入data下的数据。

[opendb](https://gitee.com/dcloud/opendb)的表，在`db_init.json`中初始化时，不建议自定义index和schema。系统会自动从opendb规范中读取最新的index和schema。

**使用`db_init.json`导入数据库**

在HBuilderX中，对项目下的cloudfunctions目录下的`db_init.json`点右键，即可选择`初始化云数据库`。将`db_init.json`里的内容导入云端。

注意事项：
- 目前`db_init.json`为同步导入形式，无法导入大量数据。导入大量数据请使用web控制台的数据库的导入功能。
- 如果`db_init.json`中的表名与opendb中任意表名相同，且`db_init.json`中该表名内没有编写schema和index，则在初始化时会自动拉取最新的opendb规范内对应表的schema和index。
- 如果`db_init.json`中的数据表在服务空间已存在，且`db_init.json`中该表含有schema和index，则在初始化时schema会被替换，新增索引会被添加，已存在索引不受影响。

**生成`db_init.json`的方式**

在uniCloud web控制台的数据库界面，左侧导航点击 生成`db_init.json`，会将选择的表的内容、索引、表结构导出为`db_init.json`文件。

注意事项：
- 如果表名与opendb中任意表名相同，web控制台导出时将不会带上schema和index。
- web控制台导出时默认不包括`_id`字段，在导入时，数据库插入新记录时会自动补`_id`字段。如果需要指定`_id`，需要手工补足数据。

在db_init.json内可以使用以下形式定义Date类型的数据：

```js
{
  "dateObj": { // dateObj字段就是日期类型的数据
    "$date": "2020-12-12T00:00:00.000Z" // ISO标准日期字符串
  }
}
```

### 数据库回档备份和恢复@backup

uniCloud腾讯云版会在每天自动备份一次数据库，最多保留7天。这让开发者不再担心数据丢失。

**操作说明**

1. 登录[uniCloud后台](https://unicloud-dev.dcloud.net.cn/)
2. 点击左侧菜单`云数据库 --> 数据库回档`，点击`新建回档`
3. 选择可回档时间
4. 选择需要回档的集合（注意：回档后集合不能与现有集合重名，如需对集合重命名可以在集合列表处操作）

![数据库回档](https://img.cdn.aliyun.dcloud.net.cn/uni-app/uniCloud/unicloud-db-backup.jpg)


### 数据导出为文件@export

**此功能暂时只有阿里云支持**

此功能主要用于导出整个集合的数据

**用法**

1. 进入[uniCloud web控制台](https://unicloud.dcloud.net.cn/home)，选择服务空间，或者直接在HBuilderX云函数目录`cloudfunctions`上右键打开uniCloud web控制台
2. 进入云数据库选择希望导入数据的集合
3. 点击导出按钮
4. 选择导出格式，如果选择csv格式还需要选择导出字段
5. 点击确定按钮等待下载开始即可

**注意**

- 导出的json文件并非一般情况下的json，而是每行一条json数据的文本文件
- 导出为csv时必须填写字段选项。字段之间使用英文逗号隔开。例如：`_id, name, age, gender`
- 数据量较大时可能需要等待一段时间才可以开始下载

### 从文件导入数据@import

**此功能暂时只有阿里云支持**

uniCloud提供的`db_init.json`主要是为了对数据库进行初始化，并不适合导入大量数据。与`db_init.json`不同，数据导入功能可以导入大量数据，目前支持导入 CSV、JSON 格式（关于json格式看下面注意事项）的文件数据。

**用法**

1. 进入[uniCloud web控制台](https://unicloud.dcloud.net.cn/home)，选择服务空间，或者直接在HBuilderX云函数目录`cloudfunctions`上右键打开uniCloud web控制台
2. 进入云数据库选择希望导入数据的集合
3. 点击导入，选择json文件或csv文件
4. 选择处理冲突模式（关于处理冲突模式请看下方注意事项）
5. 点击确定按钮等待导入完成即可

**注意**

- 目前导入文件最大限制为50MB
- 导入导出文件无法保留索引和schema
- 导入导出csv时数据类型会丢失，即所有字段均会作为字符串导入
- 冲突处理模式为设定记录_id冲突时的处理方式，`insert`表示冲突时依旧导入记录但是是新插入一条，`upsert`表示冲突时更新已存在的记录
- 这里说的json文件并不是标准的json格式，而是形如下面这样每行一个json格式的数据库记录的文件
  ```json
  {"a":1}
  {"a":2}
  ```

> 如果是自己拼接的json格式数据请注意：如果存在集合A关联集合B的字段的场景需要保证关联字段在A、B内是一致的（特别需要注意的是各种与_id关联的字段）

例：

**正确示例**

```js
// 这里为了方便看数据进行了格式化，实际导入所需的json文件是每行一条记录
// article集合
{
  "user_id": {
    $oid: "601cf1dbf194b200018ed8ec"
  }
}
// user集合
{
  "_id": {
    $oid: "601cf1dbf194b200018ed8ec"
  }
}
```

**错误示例**

```js
// 这里为了方便看数据进行了格式化，实际导入所需的json文件是每行一条记录
// article集合
{
  "user_id": "601cf1dbf194b200018ed8ec"
}
// user集合
{
  "_id": {
    $oid: "601cf1dbf194b200018ed8ec"
  }
}
```