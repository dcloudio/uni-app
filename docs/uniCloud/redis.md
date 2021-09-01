# 扩展能力Redis

> 目前仅支持阿里云

redis是一个内存中的数据结构存储系统，在项目中通常作为数据库的中间件来使用。相对于直接从数据库中读取数据，速度上会有明显的提升。

## 开通Redis扩展能力@buy

参考[开通redis](uniCloud/redis-buy.md)

## 为云函数启用redis扩展能力@use-in-function

目前需要开发者手动在云函数的package.json内添加云函数的扩展能力，后续HBuilderX会提供图形化界面。（如果云函数目录下没有package.json，可以通过在云函数目录下执行`npm init -y`来生成）

下面是一个开启了redis扩展能力的云函数的package.json示例，**注意不可有注释，以下文件内容中的注释仅为说明，如果拷贝此文件，切记去除注释**

```js
{
	"name": "redis-test",
	"version": "1.0.0",
	"description": "",
	"main": "index.js",
	"extensions": {
		"uni-cloud-redis": {} // 配置为此云函数开启redis扩展能力，值为空对象留作后续追加参数，暂无内容
	},
	"author": ""
}
```

```js
// 简单的使用示例
'use strict';
const redis = uniCloud.redis()
exports.main = async (event, context) => {
	const getResult = await redis.get('my-key')
	const setResult = await redis.set('my-key', 'value-test')
	return {
    getResult,
    setResult
  }
};

```

## 数据类型@data-type

redis中数据被存储为key-value形式，key均为字符串，value有以下几种类型

### 字符串String

字符串类型，这是最简单Redis类型。需要注意的是redis并没有number类型，如果存入number类型的数据最终也会转为string类型。

```js
await redis.set('string-key', 1) // 设置string-key的值为字符串"1"
await redis.get('string-key') // 获取string-key的值，"1"
```

### 列表List

列表类型，类似JavaScript中的数组，但是有区别。严格来说List是基于链表实现的，和js中数组相比一个显著的差异就是头部插入的效率。如果你测试过往一个长度百万的数组最前面插入一位的话，你会发现这个操作会耗时很久。但是List并没有这个问题，对于List来说在前后插入数据耗时是一样的。

**注意**

- list为空时对应的键会被删除，即redis内不存在空List

```js
await redis.lpush('list-key', 1) // 往list-key左侧添加一个元素，不存在则创建
```

### 散列Hash

Hash类型类似js里面的Object。

```js
await redis.hmset('hash-key', 'key1', 'value1', 'key2', 'value2') // 批量为hash-key添加键值，不存在则创建
await redis.hset('hash-key', 'key1', 'value1') // 为hash-key添加键值，不存在则创建
```

### 集合Set

集合是String的**无序排列**，集合内的元素不可重复

```js
await redis.sadd('set-key', 'value1', 'value2') // 往集合内添加数据，不存在则创建
```

### 有序集合Sorted Sets

有序集合和集合一样也是string类型元素的集合，且不允许重复的成员。不同的是每个元素将有一个double类型的分数（分数不一定是连续的），用于对元素进行排序

```js
await redis.zadd('sorted-set-key', 1, 'value1') // 往有序集合内添加数据并指定分数，不存在则创建
await redis.zadd('sorted-set-key', 2, 'value2')
```

## API@api

> 此处仅列举常见命令，完整命令支持请查看[redis官方文档](https://redis.io/commands)

### get

用于获取字符串类型的数据

**接口形式**

```js
await redis.get(key: string)
```

**入参说明**

|参数	|说明	|必填	|说明	|
|--		|--		|--		|--		|
|key	|键		|是		|			|

**返回值**

此接口返回获取到的数据（字符串类型），返回null表示无此键

**示例**

```js
await redis.get('string-key') // '1'
```

### set

用于设置字符串类型数据，新增、修改均可

**接口形式**

该接口有多种形式

```js
await redis.set(key: string, value: string, flag: string)
await redis.set(key: string, value: string, mode: string, duration: number)
await redis.set(key: string, value: string, mode: string, duration: number, flag: string)
```

**入参说明**

|参数			|说明											|必填	|说明																	|
|--				|--												|--		|--																		|
|key			|键												|是		|																			|
|value		|值												|是		|																			|
|flag			|区分状态进行SET					|否		|NX：不存在时才设置，EX：存在时才设置	|
|mode			|标识duration的单位				|否（duration不为空时必填）		|EX：单位秒，PX：单位毫秒							|
|duration	|过期时间，到期后自动删除	|否		|																			|

**返回值**

此接口返回字符串类型'OK'表示操作成功，返回null表示未更新

**示例**

```js
await redis.set('string-key', 1)  // redis内存储为字符串"1"
await redis.set('string-key', '1', 'NX')  // string-key不存在时设置为1
await redis.set('string-key', '1', 'EX', 100)  // string-key 100秒后过期
await redis.set('string-key', '1', 'EX', 100, 'NX')  // string-key不存在时设置为1，过期时间设置为100秒
```

### setex

键存在时，设置为指定字符串并指定过期时间

**接口形式**

```js
await redis.setex(key: string, seconds: number, value: string)
```

**入参说明**

|参数		|说明			|必填	|说明			|
|--			|--				|--		|--				|
|key		|键				|是		|					|
|seconds|过期时间	|是		|单位：秒	|
|value	|值				|是		|					|

**返回值**

此接口返回字符串类型'OK'表示操作成功，返回null表示未更新

**示例**

```js
await redis.setex('string-key', 10, 'value')  // 值设置为value，过期时间10秒
```

### setnx

键不存在时，设置为指定字符串

**接口形式**

```js
await redis.setnx(key: string, value: string)
```

**入参说明**

|参数    |说明      |必填  |说明      |
|--      |--        |--    |--        |
|key    |键        |是    |          |
|value  |值        |是    |          |

**返回值**

此接口返回字符串类型'OK'表示操作成功，返回null表示未更新

**示例**

```js
await redis.setnx('string-key', 'value')  // 值设置为value，过期时间10秒
```

### mget

批量获取指定键的值

**接口形式**

```js
await redis.mget(key1: string, key2: string, ...)
```

**入参说明**

接收一个键的列表

**返回值**

此接口按传入顺序返回获取到的数据组成的数组，存在的键返回字符串类型，不存在的键返回null

**示例**

```js
await redis.mget('key1', 'key2') // '1'
```

### mset

批量设置键值

**接口形式**

```js
await redis.mset(key1: string, value1: string, key2: string, value2: string, ...)
```

**入参说明**

接收一个键、值的列表

**返回值**

此接口只会返回OK

**示例**

```js
await redis.mset('key1', '1', 'key2', '2') // 'OK'
```

### del

用于删除执行的键

**接口形式**

```js
await redis.del(key: string)
```

**入参说明**

|参数  |说明  |必填  |说明  |
|--    |--    |--    |--    |
|key  |键    |是    |      |

**返回值**

接口返回数字1表示删除成功，数字0表示键不存在删除失败

**示例**

```js
await redis.del('string-key') // '1'
```

### incr

对指定的键执行加1操作

**接口形式**

```js
await redis.incr(key: string)
```

**入参说明**

|参数	|说明	|必填	|说明	|
|--		|--		|--		|--		|
|key	|键		|是		|			|

**返回值**

接口返回执行加一操作后的值（number类型）

**注意**

操作的值并非整数形式（例：字符串"1"是整数形式，字符串"a"非整数形式）时会直接抛出错误

**示例**

```js
await redis.set('string-key', '1')
await redis.incr('string-key') // 2
```

### incrby

在指定的键上加一个整数

**接口形式**

```js
await redis.incrby(key: string, increment: number)
```

**入参说明**

|参数			|说明			|必填	|说明	|
|--				|--				|--		|--		|
|key			|键				|是		|			|
|increment|增加的值	|是		|			|

**返回值**

接口返回执行加操作后的值（number类型）

**注意**

操作的值并非整数形式（例：字符串"1"是整数形式，字符串"a"非整数形式）时会直接抛出错误

**示例**

```js
await redis.set('string-key', '1')
await redis.incrby('string-key', 2) // 3
```

### incrbyfloat

在指定的键上加一个浮点数

**接口形式**

```js
await redis.incrbyfloat(key: string, increment: number)
```

**入参说明**

|参数			|说明																|必填	|说明	|
|--				|--																	|--		|--		|
|key			|键																	|是		|			|
|increment|增加的值，允许为负值来实现相减功能	|是		|			|

**返回值**

接口返回执行加操作后的值（number类型）

**注意**

- 操作的值并非整数形式（例：字符串"1"是整数形式，字符串"a"非整数形式）时会直接抛出错误
- 浮点数相加和js内表现一致，可能与预期结果不一致，见下方示例

**示例**

```js
await redis.set('string-key', '1.1')
await redis.incrbyfloat('string-key', 2.2) // 3.30000000000000027
// js内执行 0.1 + 0.2 会得到类似的值 3.3000000000000003
```

### decr

对指定的键执行减1操作

**接口形式**

```js
await redis.decr(key: string)
```

**入参说明**

|参数  |说明  |必填  |说明  |
|--    |--    |--    |--    |
|key  |键    |是    |      |

**返回值**

接口返回执行减1操作后的值（number类型）

**注意**

操作的值并非整数形式（例：字符串"1"是整数形式，字符串"a"非整数形式）时会直接抛出错误

**示例**

```js
await redis.set('string-key', '1')
await redis.decr('string-key') // 0
```

### decrby

在指定的键上减一个整数

**接口形式**

```js
await redis.decrby(key: string, decrement: number)
```

**入参说明**

|参数			|说明			|必填	|说明	|
|--				|--				|--		|--		|
|key			|键				|是		|			|
|decrement|减少的值	|是		|			|

**返回值**

接口返回执行加一操作后的值（number类型）

**注意**

操作的值并非整数形式（例：字符串"1"是整数形式，字符串"a"非整数形式）时会直接抛出错误

**示例**

```js
await redis.set('string-key', '1')
await redis.decrby('string-key', 2) // -1
```

### rpush

在List类型数据结尾追加数据

**接口形式**

```js
await redis.rpush(key: string, value: string)
```

**入参说明**

|参数	|说明			|必填	|说明	|
|--		|--				|--		|--		|
|key	|键				|是		|			|
|value|追加的值	|是		|			|

**返回值**

接口返回执行追加操作后List的长度

**注意**

- 如果操作的数据类型不为List，则会抛出错误
- 如果指定的key不存在，则创建一个新的List并将value追加进去


### rpushx

用法同`rpush`，仅在list存在时才在List结尾追加数据

### rpop

从List类型数据结尾删除一条数据，并返回删除的值

**注意：redis内List长度为0时会被自动删除**

**接口形式**

```js
await redis.rpop(key: string)
```

**入参说明**

|参数	|说明			|必填	|说明	|
|--		|--				|--		|--		|
|key	|键				|是		|			|

**返回值**

接口返回此次操作删除的值，如果key不存在则返回null

**注意**

- 如果操作的数据类型不为List，则会抛出错误

### lpush

在List类型数据开头追加数据

**接口形式**

```js
await redis.lpush(key: string, value: string)
```

**入参说明**

|参数	|说明			|必填	|说明	|
|--		|--				|--		|--		|
|key	|键				|是		|			|
|value|追加的值	|是		|			|

**返回值**

接口返回执行追加操作后List的长度

**注意**

- 如果操作的数据类型不为List，则会抛出错误
- 如果指定的key不存在，则创建一个新的List并将value追加进去

### lpushx

用法同`lpush`，仅在list存在时才在List开头追加数据

### lpop

从List类型数据开头删除一条数据，并返回删除的值

**注意：redis内List长度为0时会被自动删除**

**接口形式**

```js
await redis.rpop(key: string)
```

**入参说明**

|参数	|说明			|必填	|说明	|
|--		|--				|--		|--		|
|key	|键				|是		|			|

**返回值**

接口返回此次操作删除的值，如果key不存在则返回null

**注意**

- 如果操作的数据类型不为List，则会抛出错误

### linsert

在List内指定元素位置前或后插入元素，未匹配到指定元素时不插入

**接口形式**

```js
await redis.linsert(key: string, dir: 'BEFORE' | 'AFTER', pivot: string, value: string)
```

**入参说明**

|参数	|说明								|必填	|说明	|
|--		|--									|--		|--		|
|key	|键									|是		|			|
|dir	|指定在前还是后插入	|是		|			|
|pivot|指定要查找的元素		|是		|			|
|value|指定要插入的值			|是		|			|

**返回值**

接口返回插入后的list长度，未匹配到要查找的值时返回-1，key不存在时此接口返回0

**注意**

- 如果操作的数据类型不为List，则会抛出错误

### lindex

获取List内指定下标的元素

**接口形式**

```js
await redis.lindex(key: string, index: number)
```

**入参说明**

|参数	|说明			|必填	|说明	|
|--		|--				|--		|--		|
|key	|键				|是		|			|
|index|指定下标	|是		|			|

**返回值**

接口返回指定下标在list内对应的值，如果key不存在则返回null

**注意**

- 如果操作的数据类型不为List，则会抛出错误

### llen

返回List的长度

**接口形式**

```js
await redis.llen(key: string)
```

**入参说明**

|参数	|说明			|必填	|说明	|
|--		|--				|--		|--		|
|key	|键				|是		|			|

**返回值**

接口返回list的长度，如果key不存在则返回0

**注意**

- 如果操作的数据类型不为List，则会抛出错误

### exists

判断一个键是否存在

**接口形式**

```js
await redis.exists(key: string)
```

**入参说明**

|参数  |说明  |必填  |说明  |
|--    |--    |--    |--    |
|key  |键    |是    |      |

**返回值**

如果key存在返回数字1，如果key不存在返回数字0

**示例**

```js
await redis.exists('string-key') // 0 | 1
```

### expire

为指定的key设置过期时间

**接口形式**

```js
await redis.expire(key: string, seconds: number)
```

**入参说明**

|参数		|说明			|必填	|说明			|
|--			|--				|--		|--				|
|key		|键				|是		|					|
|seconds|过期时间	|是		|单位：秒	|

**返回值**

如果成功设置过期时间返回数字1，如果未成功存在返回数字0

**示例**

```js
await redis.expire('key', 600) // 设置key为600秒后过期
```

### ttl

获取过期时间剩余多少秒

**接口形式**

```js
await redis.ttl(key: string)
```

**入参说明**

|参数	|说明	|必填	|说明	|
|--		|--		|--		|--		|
|key	|键		|是		|			|

**返回值**

如果没有设置过期时间（永久有效）返回数字-1，如果不存在或者已过期返回数字-2，否则返回剩余秒数

**示例**

```js
await redis.ttl('key')
```

### multi

将多条指令作为一个原子执行。

**示例**

```js
const multi = redis.multi()
multi.set('key1', 'value1')
multi.set('key2', 'value2')
multi.set('key3', 'value3')
multi.set('key4', 'value4')
const res = await multi.exec()

// 如果执行成功
res = ['OK','OK','OK','OK']

// 某个操作出现错误
res = ['OK','OK', error, 'OK'] // error为 Error对象的实例

```

### 执行lua脚本@eval

某些情况下需要使用复杂的原子操作以避免高并发下数据修改混乱的问题，这种需求一般可通过执行lua脚本实现。如以下示例，判断redis中不存在key-test时，将其值设置为1；存在且小于10时进行加一操作；大于等于10时不进行操作直接返回。

`{0, 1}`是lua内的table类型，返回到云函数时会转为数组对应的值为`[0, 1]`

```js
const [operationType, currentValue] = await redis.eval(`local val = redis.call('get','key-test')
    local valNum = tonumber(val)
    if (val == nil) then
        redis.call('set', 'key-test', 1)
        return {0, 1}
    end
    if (valNum < 10) then
        redis.call('incrby', 'key-test', 1)
        return {1, valNum + 1}
    else
        return {2, valNum}
    end
    `, 0)
```

## FAQ@faq

- 云函数与redis的连接

  和传统开发不同，云函数实例之间是不互通的，也就是说每个使用redis的函数实例都会和redis建立一个连接，在云函数实例复用时此连接也会复用。

- 云函数本地调试

  目前不支持本地运行使用了Redis扩展能力的云函数，请上传到云端测试