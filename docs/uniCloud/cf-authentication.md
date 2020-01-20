**本章内容仅针对腾讯云，阿里云暂不支持**

### uniCloud.auth()

获取`auth`的引用

```js
const auth = uniCloud.auth();
```

### auth.getUserInfo()

获取用户信息

```js
const {
  uid, //云开发用户唯一ID
  customUserId //自定义登录传入的用户Id
} = auth.getUserInfo()
```

### auth.getClientIP()

获取客户端IP地址

```js
const IP = auth.getClientIP()
```

### auth.createTicket(String customUserId, Object createTicketOptions)

开发者可以使用云函数创建登录凭证，提供给客户端进行登录操作。[详见](uniCloud/authentication.md#自定义登录)

**createTicketOptions参数说明**

|参数名	|类型		|必填	|默认值	|说明					|平台差异说明	|
|:-			|:-			|:-		|:-			|:-						|:-						|
|refresh|Number	|否		|3600000|token刷新间隔|-						|

```js
let customUserId = '123456';

const ticket = auth.createTicket(customUserId, {
  refresh: 10 * 60 * 1000 // 每十分钟刷新一次登录态， 默认为一小时
});
// 然后把 ticket 发送给客户端
```
