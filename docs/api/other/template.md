### addTemplate

组合模板并添加至帐号下的个人模板库。

**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|x|√|x|x|

**请求地址**

```
/* 微信小程序 */
POST https://api.weixin.qq.com/cgi-bin/wxopen/template/add?access_token=ACCESS_TOKEN

/* 百度小程序 */
POST https://openapi.baidu.com/rest/2.0/smartapp/template/templateadd?access_token=ACCESS_TOKEN
```

**请求参数**

| 属性 | 类型  | 必填 | 说明 |
| --- | ----- | --- | --- |
| access_token | string | 是 | 接口调用凭证，微信小程序参考 [getAccessToken](https://developers.weixin.qq.com/miniprogram/dev/api/getAccessToken.html)，百度小程序参考[verify](https://smartprogram.baidu.com/docs/develop/api/open_userinfo/#verify/)|
| id | string | 是 | 模板标题id |
| keyword_id_list | Array.&lt;number&gt; | 是 | 开发者自行组合好的模板关键词列表，关键词顺序可以自由搭配（例如[3,5,4]或[4,5,3]），最多支持10个关键词组合 |

**返回值(Object)**

| 属性 | 类型 | 说明 |平台|
| --- | --- | --- |--|
| errcode | number | 错误码 ||
| errmsg | string | 错误信息 ||
| template_id | string | 添加至帐号下的模板id，发送APP模板消息时所需 |微信小程序|
| data | Object | {template_id} |百度小程序|

**Tips**

* POST 数据格式：JSON。
* access_token 应写在 url 上。
* 本接口应在后端服务器调用。

**请求数据示例**
```
{
  "id": "xxx",
  "keyword_id_list": [3, 4, 5]
}
```
**返回数据示例**
```
{
    "errcode": 0,
    "errmsg": "ok",
    /* "template_id": "wDYzYZVxobJivW9oMpSCpuvACOfJXQIoKUm0PY397Tc" //微信小程序 */
    "data": { // 百度小程序
        "template_id": "f34178cd598201d9dc8d5c88cd87b44cf7cd0e62NwmP" 
    }
}
```

### deleteTemplate

删除帐号下的某个模板。

**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|x|√|x|x|

**请求地址**
```
/* 微信小程序 */
POST https://api.weixin.qq.com/cgi-bin/wxopen/template/del?access_token=ACCESS_TOKEN

/* 百度小程序 */
POST https://openapi.baidu.com/rest/2.0/smartapp/template/templatedel?access_token=ACCESS_TOKEN
```

**请求参数**

| 属性 | 类型 |必填 | 说明 |
| --- | --- | --- | --- | 
| access_token | string| 是 |接口调用凭证，微信小程序参考 [getAccessToken](https://developers.weixin.qq.com/miniprogram/dev/api/getAccessToken.html)，百度小程序参考[verify](https://smartprogram.baidu.com/docs/develop/api/open_userinfo/#verify/)|
| template_id | string | 是 | 要删除的模板id |

**返回值（Object）**

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| errcode | number | 错误码 |
| errmsg | string | 错误信息 |

**Tips**

* POST 数据格式：JSON。
* access_token 应写在 url 上。
* 本接口应在后端服务器调用。

**请求数据示例**
```
{
  "template_id": "wDYzYZVxobJivW9oMpSCpuvACOfJXQIoKUm0PY397Tc"
}
```
**返回数据示例**
```
{
  "errcode": 0,
  "errmsg": "ok"
}
```


### getTemplateLibraryById

获取模板库某个模板标题下关键词库。

**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|x|√|x|x|

**请求地址**

```
/* 微信小程序 */
POST https://api.weixin.qq.com/cgi-bin/wxopen/template/library/get?access_token=ACCESS_TOKEN

/* 百度小程序 */
POST https://openapi.baidu.com/rest/2.0/smartapp/template/libraryget?access_token=ACCESS_TOKEN
```

**请求参数**

| 属性 | 类型  | 必填 | 说明 |
| --- | ----- | --- | --- |
| access_token | string | 是 | 接口调用凭证，微信小程序参考 [getAccessToken](https://developers.weixin.qq.com/miniprogram/dev/api/getAccessToken.html)，百度小程序参考[verify](https://smartprogram.baidu.com/docs/develop/api/open_userinfo/#verify/)|
| id | string | 是 | 模板标题id |

**返回值(Object)**

| 属性 | 类型 | 说明 |平台|
| --- | --- | --- |---|
| errcode | number | 错误码 |微信小程序|
| errmsg | string | 错误信息 |微信小程序|
| id | string | 模板标题 id |微信小程序|
| title | string | 模板标题 |微信小程序|
| keyword_list | Array.&lt;Object&gt; | 关键词列表 |微信小程序|
| errno | number | 错误码 |百度小程序|
| msg | string | 错误信息 |百度小程序|
| data | Object| {id,title,keyword_count,keyword_list} |百度小程序|

**keyword_list 的结构**

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| keyword_id | string | 关键词 id，添加模板时需要 |
| name | string | 关键词内容 |
| example | string | 关键词内容对应的示例 |


**Tips**

* POST 数据格式：JSON。
* access_token 应写在 url 上。
* 本接口应在后端服务器调用。

**请求数据示例**
```
{
  "id": "xxx"
}
```
**微信小程序返回数据示例**
```
{
    "errcode": 0,
    "errmsg": "ok",
    "id": "AT0002",
    "title": "购买成功通知",
    "keyword_list": [
        {
            "keyword_id": 3,
            "name": "购买地点",
            "example": "TIT造舰厂"
        },
        {
            "keyword_id": 4,
            "name": "购买时间",
            "example": "2016年6月6日"
        }
    ]
}
```

**百度小程序返回数据示例**

```js
{
    "errno": 0,
    "msg": "success",
    "data": {
        "id": "BD0016",
        "title": "取票成功通知",
        "keyword_count": 13,
        "keyword_list": [
            {
                "keyword_id": 1,
                "name": "金额",
                "example": "300元"
            },
            {
                "keyword_id": 2,
                "name": "订单号",
                "example": "321254555"
            }
        ]
    }
}
```

### getTemplateLibraryList

获取APP模板库标题列表

**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|x|√|x|x|

**请求地址**

```
/* 微信小程序 */
POST https://api.weixin.qq.com/cgi-bin/wxopen/template/library/list?access_token=ACCESS_TOKEN

/* 百度小程序 */
POST https://openapi.baidu.com/rest/2.0/smartapp/template/librarylist?access_token=ACCESS_TOKEN
```

**请求参数**

| 属性 | 类型  | 必填 | 说明 |
| --- | ----- | --- | --- |
| access_token | string | 是 | 接口调用凭证，微信小程序参考 [getAccessToken](https://developers.weixin.qq.com/miniprogram/dev/api/getAccessToken.html)，百度小程序参考[verify](https://smartprogram.baidu.com/docs/develop/api/open_userinfo/#verify/)|
| offset | number | 是 | 用于分页，表示从offset开始。从 0 开始计数。 |
| count | number | 是 | 用于分页，表示拉取count条记录。最大为 20。 |

**返回值(Object)**

| 属性 | 类型 | 说明 |平台|
| --- | --- | --- |---|
| errcode | number | 错误码 |微信小程序|
| errmsg | string | 错误信息 |微信小程序|
| list | Array.&lt;Object&gt;  | 返回模板库标题列表 |微信小程序|
| total_count | number | 模板库标题总数 |微信小程序|
| errno | number | 错误码 |百度小程序|
| msg | string | 错误信息 |百度小程序|
| data | Object | {total_count,list} |百度小程序|

**list结构说明**

|属性|类型|说明|
|---|---|---|
| id | string | 模板标题id（获取模板标题下的关键词库时需要） |
| title | string | 模板标题内容 |


**Tips**

* POST 数据格式：JSON。
* access_token 应写在 url 上。
* 本接口应在后端服务器调用。

**请求数据示例**

```
{
  "offset": 0,
  "count": 5
}
```
**微信小程序返回数据示例**
```
{
    "errcode": 0,
    "errmsg": "ok",
    "list": [
        {"id": "AT0002", "title": "购买成功通知"},
        {"id": "AT0003", "title": "交易提醒"}
    ],
    "total_count": 100
}
```
**百度小程序返回数据示例**
```
{
    "errno": 0,
    "msg": "success",
    "data": {
        "total_count": 100,
        "list": [
            {"id": "AT0002", "title": "购买成功通知"},
            {"id": "AT0003", "title": "交易提醒"}
        ]
    }
}
```

### getTemplateList

获取帐号下已存在的模板列表。

**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|x|√|x|x|

**请求地址**

```
/* 微信小程序 */
POST https://api.weixin.qq.com/cgi-bin/wxopen/template/list?access_token=ACCESS_TOKEN

/* 百度小程序 */
POST https://openapi.baidu.com/rest/2.0/smartapp/template/templatelist?access_token=ACCESS_TOKEN
```

**请求参数**

| 属性 | 类型  | 必填 | 说明 |
| --- | ----- | --- | --- |
| access_token | string | 是 | 接口调用凭证，微信小程序参考 [getAccessToken](https://developers.weixin.qq.com/miniprogram/dev/api/getAccessToken.html)，百度小程序参考[verify](https://smartprogram.baidu.com/docs/develop/api/open_userinfo/#verify/)|
| offset | number | 是 | 用于分页，表示从offset开始。从 0 开始计数。 |
| count | number | 是 | 用于分页，表示拉取count条记录。最大为 20。 |

**返回值(Object)**

| 属性 | 类型 | 说明 |平台|
| --- | --- | --- |---|
| errcode | number | 错误码 |微信小程序|
| errmsg | string | 错误信息 |微信小程序|
| list | Array.&lt;Object&gt;  | 返回模板列表 |微信小程序|
| errno | number | 错误码 |百度小程序|
| msg | string | 错误信息 |百度小程序|
| data | Object | {total_count, list} |百度小程序|

**list结构说明**

|属性|类型|说明|
|---|---|---|
| template_id | string | 添加至帐号下的模板id，发送APP模板消息时所需 |
| title | string | 模板标题 |
| content | string | 模板内容 |
| example | string | 模板内容示例 |


**Tips**

* POST 数据格式：JSON。
* access_token 应写在 url 上。
* 本接口应在后端服务器调用。

**请求数据示例**
```
{
  "offset": 0,
  "count": 1
}
```
**微信小程序返回数据示例**
```
{
    "errcode": 0,
    "errmsg": "ok",
    "list": [
        {
          "template_id": "wDYzYZVxobJivW9oMpSCpuvACOfJXQIoKUm0PY397Tc",
          "title": "购买成功通知",
          "content": "购买地点{{keyword1.DATA}}\n购买时间{{keyword2.DATA}}\n物品名称{{keyword3.DATA}}\n",
          "example": "购买地点：TIT造舰厂\n购买时间：2016年6月6日\n物品名称：咖啡\n"
        }
    ]
}
```

**百度小程序返回数据示例**

```javascript
{
    "errno": 0,
    "msg": "success",
    "data": {
        "total_count": 1,
        "list": [
            {
                "template_id": "e4313219538c4b0262e3a14a0507000e8bd79e9PTPAz",
                "title": "续费成功通知",
                "content": "购买时间{{keyword1.DATA}}\n物品名称{{keyword2.DATA}}",
                "example": "购买时间: 2016年6月6日\n物品名称: 奶茶"
            }
        ]
    }
}
```

### sendTemplateMessage

发送模板消息

**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|x|√|x|x|

**请求地址**

```
/* 微信小程序 */
POST https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=ACCESS_TOKEN

/* 百度小程序 */
POST https://openapi.baidu.com/rest/2.0/smartapp/template/templatedel?access_token=ACCESS_TOKEN
```


**请求参数**

| 属性 | 类型  | 必填 | 说明 |支持平台|
| --- | ----- | --- | --- |---|
| access_token | string | 是 | 接口调用凭证，微信小程序参考 [getAccessToken](https://developers.weixin.qq.com/miniprogram/dev/api/getAccessToken.html)，百度小程序参考[verify](https://smartprogram.baidu.com/docs/develop/api/open_userinfo/#verify/)||
| touser | string |是 | 接收者（用户）的 openid/swan_id ||
| template_id | string |是 | 所需下发的模板消息的id ||
| page | string |否 | 点击模板卡片后的跳转页面，仅限本APP内的页面。支持带参数,（示例index?foo=bar）。该字段不填则模板无跳转。 ||
| data | Object |否 | 模板内容，不填则下发空模板。具体格式请参考示例。 ||
| form_id | string |是 | 表单提交场景下，为 submit 事件带上的 [formId](/component/form)；支付场景下，为本次支付的 [prepay_id](/api/plugins/payment?id=requestpayment) |微信小程序|
| emphasis_keyword | string |否 | 模板需要放大的关键词，不填则默认无放大 |微信小程序|
| touser_openId | string |是 |接收者open_id|百度小程序|
| scene_id | string |是 |string|百度小程序|
| scene_type | number |是 | 场景type，1：表单；2：百度收银台订单；3:直连订单。 |百度小程序|
| ext | jsonString |否 | '{"xzh_id":111,"category_id":15}'|百度小程序|

**返回值(Object)**

| 属性 | 类型 | 说明 |平台|
| --- | --- | --- |---|
| errcode | number | 错误码 |微信小程序|
| errmsg | string | 错误信息 |微信小程序|
| errno | number | 错误码 |百度小程序|
| msg | string | 错误信息 |百度小程序|
| data | Object | {msg_key} |百度小程序|

**errcode 的合法值**

| 值 | 说明 |
| --- | --- |
| 40037 | template_id不正确 |
| 41028 | form_id不正确，或者过期 |
| 41029 | form_id已被使用 |
| 41030 | page不正确 |
| 45009 | 接口调用超过限额（目前默认每个帐号日调用限额为100万） |

**errno 的合法值**

| 值	| 说明					|
| ---	| ---					|
|2002	|参数错误				|
|4001	|template_id 不正确		|
|4002	|消息推送接口调用失败	|
|4003	|表单无效				|
|4004	|场景id无效				|
|6001	|无 push 权限			|


**Tips**

* POST 数据格式：JSON。
* access_token 应写在 url 上。
* 本接口应在后端服务器调用。


**微信小程序请求数据示例**
```
{
    "touser": "OPENID",
    "template_id": "TEMPLATE_ID",
    "page": "/pages/index/index",
    "form_id": "FORMID",
    "data": {
        "keyword1": {
            "value": "339208499"
        },
        "keyword2": {
            "value": "2015年01月05日 12:30"
        }
    },
    "scene_type": 1,
    "emphasis_keyword": "keyword1.DATA"
}
```
**微信小程序返回数据示例**
```
{
    "errcode": 0,
    "errmsg": "ok"
}
```

**百度小程序请求数据示例**

```javascript
{
    "touser": "SWAN_ID",
    "template_id": "TEMPLATE_ID",
    "page": "/pages/index/index",
    "data": {
        "keyword1": {
            "value": "339208499"
        },
        "keyword2": {
            "value": "2015年01月05日 12:30"
        }
    },
    "scene_id": "123456"
}
```

**百度小程序返回数据示例**
```
{
    "errno": 0,
    "msg": "success",
    "data": {
        "msg_key": 158
    }
}
```

### alipay.open.app.mini.templatemessage.send

小程序通过 openapi 给用户触达消息，主要为支付后的触达（通过消费id）和用户提交表单后的触达（通过formId）。

**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|x|√|x|x|x|

**请求地址**

```
https://openapi.alipay.com/gateway.do
```

**公共请求参数**

|名称		|类型		|必填	|描述	|示例值																										|
|---|---		|---	|---	|---																										|
|app_id		|String		|是		|支付宝分配给开发者的应用ID|2014072300007148																							|
|method		|String		|是		|接口名称|alipay.open.app.mini.templatemessage.send																	|
|format		|String		|是		|仅支持JSON|JSON																										|
|charset	|String		|是		|请求使用的编码格式，如utf-8,gbk,gb2312等|utf-8																										|
|sign_type	|String		|是		|商户生成签名字符串所使用的签名算法类型，目前支持RSA2|RSA2																										|
|sign		|String		|是		|商户请求参数的签名串，详见签名|详见示例																									|
|timestamp	|String		|是		|发送请求的时间，格式 `yyyy-MM-dd HH:mm:ss`|`2014-07-24 03:07:50`|
|version	|String		|是		|调用的接口版本，固定为：1.0|1.0																										|
|app_auth_token|String	|否	|详见[应用授权概述](https://doc.open.alipay.com/doc2/detail.htm?treeId=216&articleId=105193&docType=1)|&nbsp;|
|biz_content|String	|是		|请求参数的集合，最大长度不限，除公共参数外所有请求参数都必须放在这个参数中传递，具体参照各产品快速接入文档	|&nbsp;|