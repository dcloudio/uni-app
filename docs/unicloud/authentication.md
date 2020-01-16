**本章内容仅针对腾讯云开发，阿里侧暂不支持**

## 获取登录对象

**示例代码**

```js
const uniClient = uniCloud.init({
  spaceId: 'xxxx-yyy'
});

let auth = uniClient.auth()
```


## 获取登录状态

开发者可以通过 `getLoginState()` 来获取当前的登录状态，调用 `getLoginState()` 后，SDK 会识别本地是否有登录状态，如果有，则会尝试刷新登录状态，若刷新登录状态成功，则会返回新的登录状态，否则返回 `undefined`。

**示例代码**

```js
const uniClient = uniCloud.init({
  spaceId: 'xxxx-yyy'
});
uniClient.auth().getLoginState().then(loginState => {
  if (loginState) {
    // 登录态有效
  } else {
    // 没有登录态，或者登录态已经失效
  }
})
```

## 自定义登录

`uniCloud`允许开发者使用特定的登录凭据`Ticket`对用户进行身份认证。开发者可以使用`服务端 SDK`来创建`Ticket`，并且将`token`传入到应用内，然后调用`signInWithTicket()`获得登录态。

### 获取私钥文件

登录腾讯云[云开发控制台](https://console.cloud.tencent.com/tcb)，在[用户管理页面](https://console.cloud.tencent.com/tcb/user)中，点击“登录设置”，然后**生成并下载私钥**：

**此处链接需替换为UniCloud链接【uniCloud替换标记】**

![云开发下载私钥](https://main.qcloudimg.com/raw/e08751567a86afceda9e3e8536d37c52.png)

**此处图片需替换为UniCloud图片【uniCloud替换标记】**

### 使用云函数创建登录凭据

获取私钥文件之后，重命名为`credentials.json`放在云函数同级目录即可

`服务端 SDK`内置了生成`Ticket`的接口，开发者需要提供一个自定义的`customUserId`作为用户的唯一身份标识。`Ticket`有效期为**5分钟**，过期则失效。

每个用户的`customUserId`不能相同，每次用户重新登录时，原有的登录态将会失效。

```js
let customUserId = '123456';

const ticket = uniCloud.auth().createTicket(customUserId, {
  refresh: 10 * 60 * 1000 // 每十分钟刷新一次登录态， 默认为一小时
});
// 然后把 ticket 发送给客户端
```

<!-- ### 在开发者服务器创建登录凭据

获取私钥文件之后，在服务端 SDK 初始化时，加入私钥文件的路径：

```js
// 开发者的服务端代码
// 初始化示例
const tcb = require('tcb-admin-node');

// 1. 直接使用下载的私钥文件
tcb.init({
  // ...
  spaceId: 'your-space-id',
  credentials: require('/path/to/your/tcb_custom_login.json')
});

// 2. 也可以直接传入私钥的内容
tcb.init({
  // ...
  spaceId: 'your-space-id',
  credentials: {
    private_key_id: 'xxxxxxxxxxxxx',
    private_key: 'xxxxxxxxxxx'
  }
});
``` -->

### 客户端上使用Ticket登录

创建`Ticket`之后，开发者应将`Ticket`发送至客户端，然后使用`客户端SDK`提供的 `signInWithTicket()` 登录`UniCloud`：

```js
auth.signInWithTicket(ticket).then(() => {
  // 登录成功
})
```

## 获取用户信息

任何方式登录成功后，可以调用 `getUserInfo` 获得用户的身份信息。

**响应参数**

|字段					|类型		|是否必备	|说明														|
|:-:					|:-:		|:-:			|:-:														|
|uid					|string	|是				|用户在云开发的唯一ID						|
|customUserId	|string	|否				|用户使用自定义登录传入的用户Id	|

**示例代码**
```js
const uniClient = uniCloud.init({
  spaceId: 'xxxx-yyy'
});

const auth = uniClient.auth()
auth.signInWithTicket('YourTicket').then(() => {
    // 获取用户信息
    return auth.getUserInfo()
  })
  .then(userInfo => {
    //...
  })
```

## 匿名登录
uniCloud允许开发者使用匿名登录的方式进行静默授权，可以避免强制登录。在匿名状态下可正常的调用uniCloud的资源，开发者同时可以配合安全规则针对匿名用户制定对应的访问限制。

### 开启匿名登录授权
登录腾讯云[云开发控制台](https://console.cloud.tencent.com/tcb)，在[用户管理页面](https://console.cloud.tencent.com/tcb/user)中，点击“登录设置”，然后在“匿名登录”一栏打开/关闭可用状态。

**此处链接需替换为UniCloud链接【uniCloud替换标记】**

### 客户端进行匿名登录
```js
const uniClient = uniCloud.init({
  spaceId: 'xxxx-yyy'
});
const auth = uniClient.auth();
await auth.signInAnonymously().catch(err=>{
  // 登录失败会抛出错误
});
// 匿名登录成功检测登录状态isAnonymous字段为true
const loginState = await auth.getLoginState();
console.log(loginState.isAnonymous) // true
```

#### 匿名用户重新登录

匿名用户如果要重新使用开发者提供的身份登录，可以调用`auth.signInWithTicket`来进行。[参考](#客户端上使用Ticket登录)

#### 匿名用户转化为自定义用户
目前UniCloud支持将匿名用户转化为自定义登录用户，此转正用户将会继承匿名用户在云端创建的资源，流程如下：
1. 首先需要按照自定义登录的流程搭建获取自定义登录凭证`ticket`的服务；
2. 客户端请求接口获取自定义登录凭证`ticket`。**请注意**，此`ticket`必须未注册过uniCloud，换句话说，匿名用户只能转化为新的uniCloud用户；
3. 客户端调用`auth.linkAndRetrieveDataWithTicket`API，如下：
```js
// 调用此API之前需先请求接口获取到ticket
auth.linkAndRetrieveDataWithTicket(ticket).then(res => {
  // 转正成功
}).catch(err => {
  // 转正失败会抛出错误
});
```

## 登录授权相关事件及钩子函数

### Event: 'loginStateExpire'

当登录态失效时，会触发这个事件，开发者可以在这个事件回调内，尝试重新登录 uniCloud。

```js
uniClient.on('loginStateExpire', () => {
  // 尝试重新登录
});
```

### Event: 'refreshAccessToken'

JS SDK 会在登录态生效期间，自动刷新和维护短期访问令牌（access token），每次成功刷新时会触发此事件。

对于两种登录态并存（uniCloud、自身业务登录态）的 Web 应用，这个事件可以用于同步登录态之间的状态。

```js
uniClient.on('refreshAccessToken', () => {
  // 此时 uniCloud 短期访问令牌已经刷新，可以尝试刷新自身业务的登录态
})
```

### Auth.shouldRefreshAccessToken(callback)

`shouldRefreshAccessToken` 接收一个 `callback` 函数，并且会在刷新短期访问令牌前调用此 `callback` 函数，根据返回值决定是否要刷新短期访问令牌。

对于两种登录态并存（uniCloud、自身业务登录态）的 Web 应用，可以在 `callback` 内判断自身业务登录态是否失效，从而决定是否续期 uniCloud 的短期访问令牌。

```js
auth.shouldRefreshAccessToken(() => {
  if (/* 自身业务登录态还有效 */) {
    return true;
  } else {
    return false;
  }
});
```

