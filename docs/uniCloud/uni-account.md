## 简介

`uni-account`是一个适用于微信小程序和支付宝小程序的平台账户登录的云函数模板。`uni-account`内部对不同平台的 api 进行了拉齐，有助于开发者更方便的调用相关功能。

## 引入 uni-account

开发者可以自行选择是从插件市场导入还是从 npm 安装，引入方式略有不同，请看下面示例

```js
// 插件市场导入
const uniAccount = require('uni-account')

// npm安装
const uniAccount = require('@dcloudio/uni-account')
```

## 初始化

进行初始化操作返回 uni-account 实例

### 微信小程序

**入参说明**

| 参数名  |  类型  | 默认值 | 必填 |           说明           |
| :-----: | :----: | :----: | :--: | :----------------------: |
|  appId  | String |   -    |  是  |        小程序 ID         |
| secret  | String |   -    |  -   |        小程序密钥        |
| timeout | Number |  5000  |  否  | 请求超时时间，单位：毫秒 |

```js
const uniAccountIns = uniAccount.initWeixin({
  appId,
  secret,
})
```

### 支付宝小程序

**入参说明**

|   参数名   |  类型  | 默认值 | 必填 |           说明           |
| :--------: | :----: | :----: | :--: | :----------------------: |
|   appId    | String |   -    |  是  |        小程序 ID         |
| privateKey | String |   -    |  是  |      小程序应用私钥      |
|  timeout   | Number |  5000  |  否  | 请求超时时间，单位：毫秒 |

```js
const uniAccountIns = uniAccount.initAlipay({
  appId,
  privateKey,
})
```

## Api 列表

### 获取 openid

`uniAccountIns.code2Session`。传入`uni.login`返回的`code`来获取用户 openid 等信息

**入参说明**

| 参数名 |  类型  | 默认值 | 必填 |           说明            |
| :----: | :----: | :----: | :--: | :-----------------------: |
|  code  | String |   -    |  是  | uni.login 获取的用户 code |

**返回值说明**

|    属性    |  类型  |      说明      |         支持平台         |
| :--------: | :----: | :------------: | :----------------------: |
|   openid   | String |  用户唯一标识  | 支付宝小程序、微信小程序 |
| sessionKey | String |    会话密钥    |        微信小程序        |
|  unionid   | String | 用户唯一标识符 |        微信小程序        |

**注意**

- UnionID 为用户在微信开放平台的唯一标识符，在满足 UnionID 下发条件的情况下会返回，详见 [UnionID 机制说明](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/union-id.html)。

**示例代码**

```js
const { openid } = await uniAccountIns.code2Session(code)
```

### 更多 Api 正在补充
