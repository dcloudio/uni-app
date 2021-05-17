## 一键登录@univerify

univerify 是DCloud 推出的一键登录产品，通过与运营商深度合作，实现APP用户无需输入帐号密码，即可使用本机手机号码自动登录的能力。

univerify是替代短信验证登录的下一代登录验证方式，能消除现有短信验证模式等待时间长、操作繁琐和容易泄露的痛点。

## 客户端@client

客户端如何使用一键登录请参考此文档：[univerify 使用指南](/univerify)

## 云函数@cloud

客户端调用一键登录接口会获取如下结果

```js
{  
    "target": {  
        "id": "univerify",  
        "description": "一键登录",  
        "authResult": {  
            "openid": "xxx",  
            "access_token": "xxx"  
        }  
    }  
}  
```

使用上面结果中的`openid`和`access_token`即可在`云函数`内调用接口获取手机号

云函数内接口调用形式如下

```js
const res = await uniCloud.getPhoneNumber({
  provider: 'univerify',
  apiKey: 'xxx', // 在开发者中心开通服务并获取apiKey
  apiSecret: 'xxx', // 在开发者中心开通服务并获取apiSecret
  access_token: event.access_token,
  openid: event.openid
})
// res形式如下
// {
//   code: 0,
//   message: '',
//   phoneNumber: '138xxxxxxxx'
// }
```

**相关文档**
- [uniCloud快速上手](https://uniapp.dcloud.net.cn/uniCloud/quickstart)
- [云函数URL化](https://uniapp.dcloud.net.cn/uniCloud/http)

### uni-app项目

如果开发uni-app项目可以使用callFunction的方式调用云函数

```js
// 客户端
uniCloud.callFunction({
  name: 'xxx', // 你的云函数名称
  data: {
    access_token: 'xxx', // 客户端一键登录接口返回的access_token
    openid: 'xxx' // 客户端一键登录接口返回的openid
  }
}).then(res => {
  // res.result = {
  //   code: '',
  //   message: ''
  // }
}).catch(err=>{
  // 处理错误
})

// 云函数
exports.main = async function (event){
  const res = await uniCloud.getPhoneNumber({
    appid: '_UNI_ABCDEFG', // 替换成自己开通一键登录的应用的DCloud appid
  	provider: 'univerify',
  	apiKey: 'xxx', // 在开发者中心开通服务并获取apiKey
  	apiSecret: 'xxx', // 在开发者中心开通服务并获取apiSecret
  	access_token: event.access_token,
  	openid: event.openid
  })
  // 执行入库等操作，正常情况下不要把完整手机号返回给前端
  return {
    code: 0,
    message: '获取手机号成功'
  }
}
```

**注意**

- 开发期间如果重新获取过appid需要重新编译uni-app项目

### 5+项目

5+项目不可使用callFunction请求云函数，这时候可以使用云函数URL化让5+项目通过http请求的方式访问云函数

```js
// 客户端
const xhr = new plus.net.XMLHttpRequest();
xhr.onload = function(e) {
  const {
    code,
    message
  } = JSON.parse(xhr.responseText)
}
xhr.open( "POST", "https://xxx" ); // url应为云函数Url化之后的地址，可以在uniCloud web控制台云函数详情页面看到
xhr.setRequestHeader('Content-Type','application/json');
xhr.send(JSON.stringify({
  access_token: 'xxx', // 客户端一键登录接口返回的access_token
  openid: 'xxx' // 客户端一键登录接口返回的openid
}));
  
// 云函数，下面仅展示客户端使用post方式发送content-type为application/json请求的场景
exports.main = async function(event){
  let body = event.body
  if(event.isBase64Encoded) {
    body = Buffer.from(body,'base64')
  }
  const {
    access_token,
    openid
  } = JSON.parse(body)
  const res = await uniCloud.getPhoneNumber({
    provider: 'univerify',
    appid: 'xxx', // DCloud appid
    apiKey: 'xxx', // 在开发者中心开通服务并获取apiKey
    apiSecret: 'xxx', // 在开发者中心开通服务并获取apiSecret
    access_token: access_token,
    openid: openid
  })
  // 执行入库等操作，正常情况下不要把完整手机号返回给前端
  return {
    code: 0,
    message: '获取手机号成功'
  }
}
```

### 自有服务器调用

写法类似上面5+项目的云函数url化的方式，但是不同的是需要云函数返回手机号给自己服务器，这样就需要确保数据安全。

下面以一个简单的例子演示如何使用签名验证请求是否合法

```js
// 以nodejs为例
const crypto = require('crypto')

const secret = 'your-secret-string' // 自己的密钥不要直接使用示例值，且注意不要泄露
const hmac = crypto.createHmac('sha256', secret);

// 自有服务器生成签名，并以GET方式发送请求
const params = {
  access_token: 'xxx', // 客户端传到自己服务器的参数
  openid: 'xxx'
}
// 字母顺序排序后拼接签名串
const signStr = Object.keys(params).sort().map(key => {
  return `${key}=${params[key]}`
}).join('&')
hmac.update(signStr);
const sign = hmac.digest('hex')
// 最终请求如下链接，其中https://xxxx/xxx为云函数Url化地址
// https://xxxx/xxx?access_token=xxx&openid=xxx&sign=${sign} 其中${sign}为上一步得到的sign值
```


```js
// 云函数验证签名，此示例中以接受GET请求为例作演示
const crypto = require('crypto')
exports.main = async function (event){
  
  const secret = 'your-secret-string' // 自己的密钥不要直接使用示例值，且注意不要泄露
  const hmac = crypto.createHmac('sha256', secret);
  
  let params = event.queryStringParameters
  const sign = params.sign
  delete params.sign
  const signStr = Object.keys(params).sort().map(key => {
    return `${key}=${params[key]}`
  }).join('&')
  
  hmac.update(signStr);
  
  if(sign!==hmac.digest('hex')){
    throw new Error('非法访问')
  }
  
  const {
    access_token,
    openid
  } = params
  const res = await uniCloud.getPhoneNumber({
  	provider: 'univerify',
    appid: 'xxx', // DCloud appid
  	apiKey: 'xxx', // 在开发者中心开通服务并获取apiKey
  	apiSecret: 'xxx', // 在开发者中心开通服务并获取apiSecret
  	access_token: access_token,
  	openid: openid
  })
  // 返回手机号给自己服务器
  return res
}
```
