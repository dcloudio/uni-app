**本章内容仅选择腾讯云作为服务商时支持**

## 操作场景

云函数URL化 是 uniCloud 为开发者提供的 HTTP 访问服务，让开发者可以通过 HTTP 访问到自己的云函数。

- 当对某一函数开启URL化后，只要根据 HTTP 即可访问到函数，开发者需要关注业务和资源安全。
- 安全：为了保障业务安全性，开发者需在代码中做好权限控制和安全防护，避免未授权访问触发敏感操作。
- 计费：云函数开启了URL化后，如果遇到大量恶意访问，消耗云函数资源，开发者可以将云函数访问地址设置为空即可停止 HTTP 访问支持。


本文档主要指导您如何在uniCloud web控制台管理和使用云函数URL化。

## 操作步骤

### 设置云函数 HTTP 访问地址

1. 登录[uniCloud后台](https://unicloud.dcloud.net.cn/)，选择需要管理的服务空间。
2. 单击左侧菜单栏【云函数】，进入云函数页面。
3. 点击需要配置的云函数的【详情】按钮，配置访问路径。

![](https://img.cdn.aliyun.dcloud.net.cn/uni-app/uniCloud/edit-function-config.png)

### 绑定自定义域名

1. 单击左侧菜单栏【云函数】，进入云函数页面。
2. 单击【云函数URL化】，在弹出的配置窗口中进行配置。
![](https://img.cdn.aliyun.dcloud.net.cn/uni-app/uniCloud/cloud-function-urlify.png)
>!
>- 每个服务空间最多绑定1个自定义域名。
>- uniCloud提供默认域名供体验和测试该特性，域名规范如：`${spaceId}.service.tcloudbase.com`。
>- 绑定自定义域名之前，请先设置您默认域名的 CNAME 记录值为`${spaceId}.service.tcloudbase.com`，CNAME 记录不存在时会导致域名绑定失败，另外需要注意的是此域名必须已经备案。
>- 单个服务空间可支持被访问的最大 QPS 为5000，单个云函数可支持被访问的最大 QPS 为2000（具体频次受函数并发限制）。
>- 默认域名可支持被访问的最大 QPS 为200，推荐您绑定自定义域名以获取更大的访问频次。

### 通过 HTTP 访问云函数

- 方式一：通过`https://${spaceId}.service.tcloudbase.com/${path}`直接访问函数，其中`${spaceId}`是服务空间 ID，`${path}`是配置的函数触发路径。
```sh
$ curl https://${spaceId}.service.tcloudbase.com/${path}
```

- 方式二：直接在浏览器内打开`https://${spaceId}.service.tcloudbase.com/${path}`。

### 云函数的入参

使用 HTTP 访问云函数时，HTTP 请求会被转化为特殊的结构体，称之为**集成请求**，结构如下：

```shell
{
    path: 'HTTP请求路径，如 /hello',
    httpMethod: 'HTTP请求方法，如 GET',
    headers: {HTTP请求头},
    queryStringParameters: {HTTP请求的Query，键值对形式},
    requestContext: {云开发相关信息},
    body: 'HTTP请求体',
    isBase64Encoded: 'true or false，表示body是否为Base64编码'
}
```

下面是一个示例：
```shell
{
    path: '/',
    httpMethod: 'GET',
    headers: {
        'host': 'env-id.service.tcloudbase.com',
        'connection': 'close',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8'
    },
    requestContext: {
        requestId: 'cdbb96328072184d19d3fcd243e8cc4d',
        envId: 'env-id', //服务空间Id
        appId: 123456789,
        uin: 123456789
    },
    isBase64Encoded: false,
    body: ''
}
```


**示例**

使用GET请求`https://${spaceId}.service.tcloudbase.com/${functionPath}?a=1&b=2`，云函数接收到的`event`为

```
{
    path: '/',
    httpMethod: 'GET',
    headers: {HTTP请求头},
    queryStringParameters: {a: "1", b: "2"},
    requestContext: {云开发相关信息},
    isBase64Encoded: false
}
```


使用POST请求`https://${spaceId}.service.tcloudbase.com/${functionPath}`，云函数接收到的`event`为请求发送的数据

```
// 以uni.request为例
uni.request({
  method: 'POST',
  url: 'https://${spaceId}.service.tcloudbase.com/${functionPath}',
  data: {
    a: 1,
    b: 2
  },
  success(res) {
    console.log(res);
  }
})

// 云函数收到的event为
{a: 1, b: 2}
```


### 云函数的返回值

云函数可以返回`string`、`object`、`number`等类型的数据，或者返回 [集成响应](#Integrationresponse)，随后云接入会将返回值转化为正常的 HTTP 响应。

#### 返回字符串或数字

云函数返回字符串，那么：
```js
module.exports.main = function() {
    return 'hello gateway'
}
```

最终 HTTP 响应为：
```shell
HTTP/1.1 200 OK
date: Mon, 16 Dec 2019 08:35:31 GMT
content-type: text/plain; charset=utf-8
content-length: 13

hello gateway
```

#### 返回 Object

返回的`Object`会被转换为 JSON，同时 HTTP 响应的`content-type`会被设置为 `application/json`：

```js
module.exports.main = function() {
    return {
        foo: 'bar'
    }
}
```

最终 HTTP 响应为：
```shell
HTTP/1.1 200 OK
date: Mon, 16 Dec 2019 08:35:31 GMT
content-type: application/json; charset=utf-8
content-length: 13

{"foo":"bar"}
```

<span id="Integrationresponse"></span>
#### 返回集成响应

云函数可以返回如下这样特殊结构的**集成响应**，来自由地控制响应体：

```json
{
    "isBase64Encoded": true|false,
    "statusCode": httpStatusCode,
    "headers": { "headerName": "headerValue", ... },
    "body": "..."
}
```

##### 使用集成响应返回 HTML

将`content-type`设置为`text/html`，即可在`body`中返回 HTML，会被浏览器自动解析：

```js
module.exports.main = function() {
    return {
        statusCode: 200,
        headers: {
            'content-type': 'text/html'
        },
        body: '<h1>Hello</h1>'
    }
}
```

最终 HTTP 响应为：
```shell
HTTP/1.1 200 OK
date: Mon, 16 Dec 2019 08:35:31 GMT
content-type: text/html; charset=utf-8
content-length: 14

<h1>Hello</h1>
```

##### 使用集成响应返回 JS 文件

将`content-type`设置为`application/javascript`，即可在`body`中返回 JavaScript 文件：

```js
module.exports.main = function() {
    return {
        statusCode: 200,
        headers: {
            'content-type': 'application/javascript'
        },
        body: 'console.log("Hello!")'
    }
}
```

最终 HTTP 响应为：
```shell
HTTP/1.1 200 OK
date: Mon, 16 Dec 2019 08:35:31 GMT
content-type: application/javascript; charset=utf-8
content-length: 21

console.log("Hello!")
```

##### 使用集成响应返回二进制文件

如果返回体是诸如图片、音视频这样的二进制文件，那么可以将`isBase64Encoded`设置为`true`，并且将二进制文件内容转为 Base64 编码的字符串，例如：

```js
module.exports.main = function() {
    return {
        isBase64Encoded: true,
        statusCode: 200,
        headers: {
            'content-type': 'image/png'
        },
        body: 'iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAY...'
    }
}
```

最终 HTTP 响应为一张 PNG 图片：

```shell
HTTP/1.1 200 OK
date: Mon, 16 Dec 2019 08:35:31 GMT
content-type: image/png
content-length: 9897

<binary payload...>
```