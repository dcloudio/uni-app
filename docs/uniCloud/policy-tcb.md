## 简介

为了保护用户的数据安全，云开发提供更灵活、可扩展、更细粒度的安全规则能力，开发者可以在云后台或者小程序开发工具上自定义安全规则，限制**客户端**对数据库的访问权限。本文档主要介绍如何配置安全规则以及表达式的相关说明。

安全规则本身不收费，但是安全规则额外的数据访问会统计到计费中。

**注意**

- `get`函数会产生额外的数据访问。
- 指定文档ID查询的所有写操作会产生一次数据访问。
- 权限控制仅针对客户端

## 安全规则示例

**规则示例**

```
//云数据库
{
  "read": "auth.uid==doc._openid",
  "write": "doc.name=='zzz'"
}

//云存储
{
  "read": true,
  "write": "resource.openid == auth.uid"
}
```

以上 json 配置中解释如下：

- key：指用户的操作类型。
- value：指一个表达式。

## 操作类型

- [云数据库操作类型](#云数据库操作类型)
- [云存储操作类型](#云存储操作类型)

## 表达式

表达式是伪代码的语句，配置的时候不能过长。

### 变量

**全局变量**

|变量名	|类型		|说明														|
|:-:		|:-:		|:-:														|
|auth		|object	|用户登录信息，字段说明参见下文	|
|now		|number	|当前时间												|
|doc		|any		|文档数据或查询条件							|

**auth**

|字段名		|类型		|说明				|
|:-:			|:-:		|:-:				|
|loginType|string	|登录方式，取值为ANONYMOUS（匿名登录）、CUSTOM（自定义登录）		|
|uid			|string	|用户唯一 ID（对应数据库文档的doc._openid、云存储的resource.openid），见下面示例|

```
//云数据库
{
  "read": "auth.uid == doc._openid", //仅创建者可读
  "write": "auth.uid == doc._openid", //仅创建者可写
  "create": false //不允许客户端创建记录
}

//云存储
{
  "read": "resource.openid == auth.uid", //仅创建者可读
  "write": "resource.openid == auth.uid" //仅创建者可写
}
```

### 运算符

|运算符			|说明																								|示例																									|示例解释（集合查询）																						|
|:-:				|:-:																								|:-:																									|:-:																														|
|==					|等于																								|auth.uid == 'zzz'																		|用户的 uid 为 zzz																							|
|!=					|不等于																							|auth.uid != 'zzz'																		|用户的 uid 不为 zzz																						|
|>					|大于																								|doc.age>10																						|查询条件的 age 属性大于10																			|
|>=					|大于等于																						|doc.age>=10																					|查询条件的 age 属性大于等于10																	|
|<					|小于																								|doc.age>10																						|查询条件的 age 属性小于10																			|
|<=					|小于等于																						|doc.age>=10																					|查询条件的 age 属性小于等于10																	|
|in					|存在于集合中																				|auth.uid in ['zzz','aaa']														|用户的 uid 是['zzz','aaa']中的一个															|
|!(xx in [])|不存在于集合中，使用 in 的方式描述 !(a in [1,2,3])	|!(auth.uid in ['zzz','aaa'])													|用户的 uid 不是['zzz','aaa']中的任何一个												|
|&&					|与																									|auth.uid == 'zzz' && doc.age>10											|用户的 uid 为 zzz 并且查询条件的 age 属性大于10								|
|&#124;&#124;	|或者	|auth.uid == 'zzz' &#124;&#124; doc.age>10																					|用户的 uid 为 zzz 或者查询条件的 age 属性大于10								|
|.					|对象元素访问符																			|auth.uid																							|用户的 uid																											|
|[]					|数组访问符属性																			|get('database.collection_a.user')[auth.uid] == 'zzz'	|collection_a集合中id为user的文档，key 为用户 uid 的属性值为 zzz|

**注意**

- 比较运算符的右值必须为数值。

<!-- ### 函数

#### get

目前仅支持`get`函数，唯一的参数必须为`database.集合名称.文档id`。通过访问其它文档的数据来判断用户操作是否符合安全规则。

**使用示例**

```
{
  "read":"get('xxxx')[auth.uid] in [1,2,3]",
  "delete":"get('xxxx')[auth.uid] == 1 && doc.user in ['ersed','sfsdf'] "
}
```

**注意**

- 一个表达式最多可以有3个get函数。
- 最多可以访问2个不同的文档。
- 不允许嵌套调用，例如：get("xxxx").prop[get("xxxxx").zzzz]; -->


## 云数据库

### 配置说明

开发者可以在uniCloud控制台设置数据库权限

**目前不支持在客户端操作数据库，推荐直接使用以下配置：**

![](https://img.cdn.aliyun.dcloud.net.cn/uni-app/uniCloud/uniCloud-tcb-db-policy.png)

<!-- ### 云数据库操作类型

|操作类型	|说明																			|默认值	|
|:-:			|:-:																			|:-:		|
|read			|读文档																		|false	|
|write		|写文档，可以细分为 create、update、delete|false	|
|create		|新建文档																	|无			|
|update		|更新文档																	|无			|
|delete		|删除文档																	|无			| -->

## 云存储

### 配置说明

开发者可以在uniCloud控制台设置云存储权限。如下图所示，点击`编辑`按钮，使用默认的四条规则，点击`切换到安全规则`可以自行配置JSON格式的权限规则。

![](https://img.cdn.aliyun.dcloud.net.cn/uni-app/uniCloud/uniCloud-tcb-storage-policy.png)

### 云存储操作类型

|操作类型	|说明											|默认值	|
|:-:			|:-:											|:-:		|
|read			|读取文件，例如：download	|-			|
|write		|上传/覆盖文件，删除文件	|-			|