## 简介

为了保护用户的数据安全，uniCloud提供更灵活、可扩展、更细粒度的安全规则能力，开发者可以在uniCloud web控制台上自定义安全规则，限制**客户端**对云存储的访问权限。本文档主要介绍如何配置安全规则以及表达式的相关说明。

**注意**

- 权限控制仅针对客户端

## 安全规则示例

**规则示例**

```
// 云存储
// 所有人可读，仅创建者可写
{
  "read": true,
  "write": "resource.openid == auth.uid"
}
// 非匿名用户可读，仅创建者可写
{
  "read": "auth.loginType != 'ANONYMOUS'",
  "write": "resource.openid == auth.uid"
}
```

以上 json 配置中解释如下：

- key：指用户的操作类型。
- value：指一个表达式。

## 配置说明

开发者可以在uniCloud控制台设置云存储权限。如下图所示，点击`编辑`按钮，使用默认的四条规则，点击`切换到安全规则`可以自行配置JSON格式的权限规则。

![](https://img.cdn.aliyun.dcloud.net.cn/uni-app/uniCloud/uniCloud-tcb-storage-policy.png)

## 云存储操作类型

|操作类型	|说明											|默认值	|
|:-:			|:-:											|:-:		|
|read			|读取文件，例如：getTempFileURL	|-			|
|write		|上传/覆盖文件，删除文件	|-			|

## 表达式

表达式是伪代码的语句，配置的时候不能过长。

### 变量

**全局变量**

|变量名		|类型		|说明																				|
|:-:			|:-:		|:-:																				|
|auth			|object	|用户登录信息，字段说明参见下文							|
|now			|number	|当前时间的时间戳														|
|resource	|object	|云存储资源																	|
|doc			|any		|数据库文档资源（目前不开放数据库权限配置）	|

**auth**

|字段名		|类型		|说明																												|
|:-:			|:-:		|:-:																												|
|loginType|string	|登录方式，取值为ANONYMOUS（匿名登录）、CUSTOM（自定义登录）|
|uid			|string	|用户唯一 ID（对应云存储的resource.openid），见下面示例			|

**resource**

|字段名	|类型		|说明										|
|:-:		|:-:		|:-:										|
|openid	|string	|资源创建者的用户唯一ID	|

```
//云存储
{
  "read": "resource.openid == auth.uid", //仅创建者可读
  "write": "resource.openid == auth.uid" //仅创建者可写
}
```

### 运算符

|运算符				|说明																								|示例																							|示例解释（集合查询）														|
|:-:					|:-:																								|:-:																							|:-:																						|
|==						|等于																								|auth.uid == 'zzz'																|用户的 uid 为 zzz															|
|!=						|不等于																							|auth.uid != 'zzz'																|用户的 uid 不为 zzz														|
|>						|大于																								|doc.age>10																				|查询条件的 age 属性大于10											|
|>=						|大于等于																						|doc.age>=10																			|查询条件的 age 属性大于等于10									|
|<						|小于																								|doc.age>10																				|查询条件的 age 属性小于10											|
|<=						|小于等于																						|doc.age>=10																			|查询条件的 age 属性小于等于10									|
|in						|存在于集合中																				|auth.uid in ['zzz','aaa']												|用户的 uid 是['zzz','aaa']中的一个							|
|!(xx in [])	|不存在于集合中，使用 in 的方式描述 !(a in [1,2,3])	|!(auth.uid in ['zzz','aaa'])											|用户的 uid 不是['zzz','aaa']中的任何一个				|
|&&						|与																									|auth.uid == 'zzz' && resource.openid == 'xxx'		|用户的 uid 为 zzz 并且资源的创建者id为 xxx	|
|&#124;&#124;	|或者																								|auth.uid == 'zzz' &#124;&#124; auth.uid == 'xxx'	|用户的 uid 为 zzz 或者用户的 uid 为 xxx				|
|.						|对象元素访问符																			|auth.uid																					|用户的 uid																			|

**注意**

- 比较运算符的右值必须为数值。
