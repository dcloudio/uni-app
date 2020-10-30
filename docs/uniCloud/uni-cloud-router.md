# uni-cloud-router

> 基于 koa 风格的 uniCloud 云函数路由库，同时支持 uniCloud 客户端及 URL 化访问

---

- [云函数端](#云函数端)
  - [安装](#安装)
  - [目录结构](#目录结构)
  - [控制器（Controller）](#控制器controller)
    - [如何编写 Controller](#如何编写-controller)
    - [获取请求参数](#获取请求参数)
    - [调用 Service](#调用-service)
    - [定制 URL 化返回的状态码](#定制-url-化返回的状态码)
  - [服务（Service）](#服务service)
    - [使用场景](#使用场景)
    - [如何编写 Service](#如何编写-service)
    - [使用 Service](#使用-service)
  - [中间件（Middleware）](#中间件middleware)
    - [开发中间件](#开发中间件)
    - [使用中间件](#使用中间件)
  - [Context](#context)
    - [获取方式](#获取方式)
- [客户端](#客户端)
  - [发送请求](#发送请求)
  - [返回结果](#返回结果)

## 云函数端

### 安装

```bash
npm install --save uni-cloud-router
```

### 目录结构

```bash
├── package.json
├── index.js // 云函数入口文件
├── config.js // 用于配置 router 应用根目录、中间件等
├── controller // 用于解析用户的输入，处理后返回相应的结果
|   ├── user.js
├── service (可选) //用于编写业务逻辑层，建议使用
|   ├── user.js
```

```js
// index.js (通常无需改动)
const Router = require('uni-cloud-router').Router // 引入 Router
const router = new Router(require('./config.js')) // 根据 config 初始化 Router
exports.main = async (event, context) => {
  return router.serve(event, context) // 由 Router 接管云函数
}
```

```js
// config.js
module.exports = {
  debug: true, // 调试模式时，将返回 stack 错误堆栈
  baseDir: __dirname, // 必选，应用根目录
  middleware: [], // 自定义中间件
}
```

```js
// controller/user.js
const uniID = require('uni-id')
const Controller = require('uni-cloud-router').Controller
// 必须继承 Controller
module.exports = class UserController extends Controller {
  async login() {
    const { username, password } = this.ctx.data // 获取请求参数
    // 使用 uni-id 登录
    return uniID.login({
      username,
      password,
    })
  }
}
```

### 控制器（Controller）

负责解析用户的输入，处理后返回相应的结果。

推荐 Controller 层主要对用户的请求参数进行处理（校验、转换），然后调用对应的 service 方法处理业务，得到业务结果后封装并返回：

1. 获取用户传递过来的请求参数。
2. 校验、组装参数。
3. 调用 Service 进行业务处理，必要时处理转换 Service 的返回结果，让它适应用户的需求。
4. 将结果响应给用户。

#### 如何编写 Controller

所有的 Controller 文件都必须放在 `controller` 目录下，可以支持多级目录，访问的时候可以通过目录名级联访问。

```js
// controller/post.js
const Controller = require('uni-cloud-router').Controller
// 必须继承 Controller 类
module.exports = class PostController extends Controller {
  async create() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate({
      title: { type: 'string' },
      content: { type: 'string' },
    })
    // 组装参数
    const author = ctx.auth.uid
    const post = Object.assign(ctx.data, { author })
    // 调用 Service 进行业务处理
    return service.post.create(post)
  }
}
```

定义的 Controller 类，会在每一个请求访问时实例化一个全新的对象，会有下面几个属性挂在 `this` 上。

- `this.ctx`：当前请求的上下文对象的实例，通过它我们可以拿到各种便捷属性和方法。
- `this.service`：应用定义的 service，通过它我们可以访问到抽象出的业务层，等同于 `this.ctx.service`。
- `this.db`：等同于 `uniCloud.database()`。
- `this.curl`：等同于 `uniCloud.httpclient.request`。
- `this.throw`：抛出异常信息，等同于 `this.ctx.throw`。

#### 获取请求参数

通过在 Controller 上绑定的 Context 实例的 data 属性，获取请求发送过来的参数

```js
class PostController extends Controller {
  async listPosts() {
    const data = this.ctx.data
    // {
    //   username: 'demo',
    //   password: 'demo',
    // }
  }
}
```

#### 调用 Service

通过 Service 层进行业务逻辑的封装，不仅能提高代码的复用性，同时可以让业务逻辑更好测试。

Controller 中可以调用任何一个 Service 上的任何方法，同时 Service 是懒加载的，只有当访问到它的时候才会去实例化它。

```js
class PostController extends Controller {
  async create() {
    const { ctx, service } = this
    const author = ctx.auth.uid
    const post = Object.assign(ctx.data, { author })
    // 调用 service 进行业务处理
    return service.post.create(post)
  }
}
```

Service 的具体写法，请查看 [Service](#服务service) 章节。

#### 定制 URL 化返回的状态码

```js
class PostController extends Controller {
  async create() {
    // 设置状态码为 201
    this.ctx.status = 201 // 仅当使用 HTTP/HTTPS 请求时生效
  }
}
```

### 服务（Service）

业务逻辑封装的一个抽象层，有以下几个好处：

- 保持 Controller 中的逻辑更加简洁。
- 保持业务逻辑的独立性，抽象出来的 Service 可以被多个 Controller 重复调用。
- 将逻辑和展现分离，更容易编写测试用例。

#### 使用场景

- 复杂数据的处理，比如要展现的信息需要从数据库获取，还要经过一定的规则计算，才能返回用户显示。或者计算完成后，更新到数据库。
- 第三方服务的调用，比如 微信模板消息推送 等。

#### 如何编写 Service

所有的 Service 文件都必须放在 `service` 目录下，可以支持多级目录，访问的时候可以通过目录名级联访问。

```js
// service/post.js
const Service = require('uni-cloud-router').Service
// 必须继承 Service
module.exports = class PostService extends Service {
  async create(data) {
    return this.db.add(data)
  }
}
```

定义的 Service 类是懒加载的，只有当访问到它的时候才会去实例化它，会有下面几个属性挂在 `this` 上。

- `this.ctx`：当前请求的上下文对象的实例，通过它我们可以拿到各种便捷属性和方法。
- `this.service`：应用定义的 service，通过它我们可以访问到抽象出的业务层，等同于 `this.ctx.service`。
- `this.db`：等同于 `uniCloud.database()`。
- `this.curl`：等同于 `uniCloud.httpclient.request`。
- `this.throw`：抛出异常信息，等同于 `this.ctx.throw`。

#### 使用 Service

[在 Controller 中调用 Service](#调用-service)

### 中间件（Middleware）

在路由请求前，后添加处理逻辑，实现一些特定功能，如：用户登录，权限校验等

#### 开发中间件

与 koa 保持一致，参考：[koa 中间件](https://demopark.github.io/koa-docs-Zh-CN/guide.html)

```js
// middleware/auth.js
const uniID = require('uni-id')
module.exports = (options) => {
  // 初始化 uniID 配置
  uniID.init(options)
  // 返回中间件函数
  return async function auth(ctx, next) {
    // 校验 token
    const auth = uniID.checkToken(ctx.event.uniIdToken)
    if (auth.code) {
      // 校验失败，抛出错误信息
      throw { code: auth.code, message: auth.message }
    }
    ctx.auth = auth // 设置当前请求的 auth 对象
    await next() // 执行后续中间件
  }
}
```

示例：

- [uni-id 校验 token 中间件](https://github.com/dcloudio/uni-template-admin/blob/master/cloudfunctions-aliyun/uni-admin/middleware/auth.js)
- [uni-id 校验 permission 中间件](https://github.com/dcloudio/uni-template-admin/blob/master/cloudfunctions-aliyun/uni-admin/middleware/permission.js)
- [云函数 URL 化中间件](https://github.com/fxy060608/uni-cloud-router/blob/master/src/middleware/http.ts)

#### 使用中间件

1. 通过 config.js 配置

```js
const auth = require('./middleware/auth.js') // 引入 auth 中间件
module.exports = {
  debug: true, // 调试模式时，将返回 stack 错误堆栈
  baseDir: __dirname, // 指定应用根目录
  middleware: [
    [
      //数组格式，第一个元素为中间件，第二个元素为中间件生效规则配置
      auth({ tokenSecret: 'tokenSecret-demo' }), // 注册中间件
      { enable: true, ignore: /\/login$/ }, // 配置当前中间件生效规则，该规则表示以`/login`结尾的路由不会执行 auth 中间件校验 token
    ],
  ],
}
```

2. 中间件配置项

- enable 控制中间件是否开启。
- match 设置