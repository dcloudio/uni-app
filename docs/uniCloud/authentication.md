**本章内容仅针对腾讯云开发，阿里侧暂不支持**

## 名词解释

- Ticket（票据）：由云函数调用`createTicket`返回的票据，用于客户端使用票据进行登录操作
- 匿名登录：用户未进行登录操作的状态
- 短期访问令牌：用户身份的凭证（access token），调用`signInWithTicket`或者`linkAndRetrieveDataWithTicket`之后会自动进行存储

## uniCloud.auth()

获取登录对象

**示例代码**

```js
const auth = uniCloud.auth()
```

<!-- ## auth.signInAnonymously()

进行匿名登录，详细描述参考[匿名登录](#匿名登录)

**示例代码**

```js
const auth = uniCloud.auth()
auth.signInAnonymously()
``` -->

<span id="signinwithticket"></span>
## auth.signInWithTicket()

使用，详细描述参考[登录流程](#cloudtoken)

**示例代码**

```js
auth.signInWithTicket('YourTicket').then(() => {
    // 获取用户信息
    return auth.getUserInfo()
  })
  .then(userInfo => {
    //...
  })
```

## auth.getLoginState()

开发者可以通过 `getLoginState()` 来获取当前的登录状态，调用 `getLoginState()` 后，SDK 会识别本地是否有登录状态，如果有，则会尝试刷新登录状态，若刷新登录状态成功，则会返回新的登录状态，否则返回 `undefined`。

**示例代码**

```js
auth.getLoginState().then(loginState => {
  if (loginState) {
    // 登录态有效
  } else {
    // 没有登录态，或者登录态已经失效
  }
})
```

## auth.getUserInfo()

任何方式登录成功后，可以调用 `getUserInfo` 获得用户的身份信息。

**响应参数**

|字段					|类型		|是否必备	|说明														|
|:-:					|:-:		|:-:			|:-:														|
|uid					|string	|是				|用户在云开发的唯一ID						|
<!-- |customUserId	|string	|否				|用户使用云Token传入的用户Id	| -->

**示例代码**

```js
auth.signInWithTicket('YourTicket').then(() => {
    // 获取用户信息
    return auth.getUserInfo()
  })
  .then(userInfo => {
    //...
  })
```

<span id="cloudtoken"></span>
## 登录流程

`uniCloud`允许开发者使用特定的登录凭据`Ticket`对用户进行身份认证。开发者可以使用`服务端 SDK`来创建`Ticket`，并且将`Ticket`传入到应用内，然后调用`signInWithTicket()`获得登录态。

### 第一步：获取私钥文件

登录uniCloud控制台[uniCloud控制台](http://unicloud.dcloud.net.cn/)，在`云token`中，点击“生成并下载”

**注意：重复生成私钥会使之前生成的私钥失效，并导致用户登录状态失效**

![uniCloud下载私钥](https://img.cdn.aliyun.dcloud.net.cn/uni-app/uniCloud/cloud-token-web.png)

### 第二步：使用云函数创建登录凭据

获取私钥文件（`credentials.json`）之后，放在需要生成`Ticket`的云函数内`index.js`同级即可

`服务端 SDK`内置了生成`Ticket`的接口，开发者需要提供一个自定义的`customUserId`作为用户的**唯一身份标识**。`Ticket`有效期为**5分钟**，过期则失效。

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

### 第三步：客户端上使用Ticket登录

创建`Ticket`之后，开发者应将`Ticket`发送至客户端，然后使用`客户端SDK`提供的 `signInWithTicket()` 登录`uniCloud`：

```js
auth.signInWithTicket(ticket).then(() => {
  // 登录成功
})
```


## 匿名登录
uniCloud允许开发者使用匿名登录的方式进行静默授权，可以避免强制登录。在匿名状态下可正常的调用uniCloud的资源，开发者同时可以配合安全规则针对匿名用户制定对应的访问限制。

#### 匿名用户重新登录

匿名用户如果要重新使用开发者提供的身份登录，可以调用`auth.signInWithTicket`来进行。[参考](#signinwithticket)

#### 匿名用户转化为正式用户
目前uniCloud支持将匿名用户转化为正式用户，此转正用户将会继承匿名用户在云端创建的资源，流程如下：
1. 首先需要按照[登录流程](#cloudtoken)搭建获取云Token凭证`ticket`的服务；
2. 客户端请求接口获取云Token凭证`ticket`。**请注意**，此`ticket`必须未注册过uniCloud，换句话说，匿名用户只能转化为新的uniCloud用户；
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
uniCloud.on('loginStateExpire', () => {
  // 尝试重新登录
});
```

### Event: 'refreshAccessToken'

JS SDK 会在登录态生效期间，自动刷新和维护短期访问令牌（access token），每次成功刷新时会触发此事件。

对于两种登录态并存（uniCloud、自身业务登录态）的应用，这个事件可以用于同步登录态之间的状态。

```js
uniCloud.on('refreshAccessToken', () => {
  // 此时 uniCloud 短期访问令牌已经刷新，可以尝试刷新自身业务的登录态
})
```

### Auth.shouldRefreshAccessToken(callback)

`shouldRefreshAccessToken` 接收一个 `callback` 函数，并且会在刷新短期访问令牌前调用此 `callback` 函数，根据返回值决定是否要刷新短期访问令牌。

对于两种登录态并存（uniCloud、自身业务登录态）的应用，可以在 `callback` 内判断自身业务登录态是否失效，从而决定是否续期 uniCloud 的短期访问令牌。

```js
auth.shouldRefreshAccessToken(() => {
  if (/* 自身业务登录态还有效 */) {
    return true;
  } else {
    return false;
  }
});
```

