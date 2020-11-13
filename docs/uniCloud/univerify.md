## 一键登录@univerify

univerify 是DCloud 推出的一键登录产品，通过与运营商深度合作，实现APP用户无需输入帐号密码，即可使用本机手机号码自动登录的能力。

univerify是替代短信验证登录的下一代登录验证方式，能消除现有短信验证模式等待时间长、操作繁琐和容易泄露的痛点。

## 客户端@client

客户端如何使用一键登录请参考此文档：[univerify 使用指南](https://ask.dcloud.net.cn/article/38009)

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

**相关文档**
- [uniCloud快速上手](https://uniapp.dcloud.net.cn/uniCloud/quickstart)
- [云函数URL化](https://uniapp.dcloud.net.cn/uniCloud/http)

**uni-app项目**

如果开发uni-app项目可以使用callFunction的方式调用云函数

```js
// 客户端
uniCloud.callFunction({
  name: 'xxx', // 你的云函数名称
  data: {
    accessToken: 'xxx', // 客户端一键登录接口返回的accessToken
    openid: 'xxx' // 客户端一键登录接口返回的openid
  }
}).then(res => {
  // res.result = {
  //   code: '',
  //   message: '',
  //   phoneNumber: '138xxxxxxx'
  // }
}).catch(err=>{
  // 处理错误
})

// 云函数
module.exports = async(event){
  const res = await uniCloud.getPhoneNumber({
  	provider: 'univerify',
  	apiKey: 'xxx', // 在开发者中心开通服务并获取apiKey
  	apiSecret: 'xxx', // 在开发者中心开通服务并获取apiSecret
  	accessToken: event.accessToken,
  	openid: event.openid
  })
  return res
}
```

**5+项目**

5+项目不可使用callFunction请求云函数，这时候可以使用云函数URL化让5+项目通过http请求的方式访问云函数

```js
// 客户端
const xhr = new plus.net.XMLHttpRequest();
xhr.onload = function(e) {
  const {
    code,
    message,
    phoneNumer // 取得手机号
  } = JSON.parse(xhr.responseText)
}
xhr.open( "POST", "https://xxx" ); // url应为云函数Url化之后的地址，可以在uniCloud web控制台云函数详情页面看到
xhr.setRequestHeader('Content-Type','application/json');
xhr.send(JSON.stringify({
  accessToken: 'xxx', // 客户端一键登录接口返回的accessToken
  openid: 'xxx' // 客户端一键登录接口返回的openid
}));
  
// 云函数，下面仅展示客户端使用post方式发送content-type为application/json请求的场景
module.exports = async(event){
  let body = event.body
  if(event.isBase64Encoded) {
    body = Buffer.from(body,'base64')
  }
  const {
    accessToken,
    openid
  } = JSON.parse(body)
  const res = await uniCloud.getPhoneNumber({
  	provider: 'univerify',
    appid: 'xxx', // DCloud appid，不同于callFunction方式调用，使用云函数Url化需要传递DCloud appid参数
  	apiKey: 'xxx', // 在开发者中心开通服务并获取apiKey
  	apiSecret: 'xxx', // 在开发者中心开通服务并获取apiSecret
  	accessToken: accessToken,
  	openid: openid
  })
  return res
}
```