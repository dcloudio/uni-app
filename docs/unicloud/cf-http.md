#### 云函数内发送Http请求

`uniCloud`提供了`uniCloud.httpclient`供开发者使用。无需额外依赖，就可以请求任何 HTTP 和 HTTPS 协议的 Web 服务。`uniCloud.httpclient`返回的是一个[urllib实例](https://github.com/node-modules/urllib)，即`uniCloud.httpclient = require('urllib').create()`

**示例代码**

```
const res = await uniCloud.httpclient.request(apiUrl, {
    method: 'POST',
    data: {
      test: 'testValue'
    }
  })
console.log(res)
```