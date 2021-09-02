## uniCloud响应体规范

uniCloud响应体规范（uniCloud response format），是DCloud官方制定的、服务器给客户端返回json数据的一种建议格式。后续uni-id、uni-pay、clientDB等均会调整为此结构

**由来**

uniCloud服务器给客户端返回的数据格式是json，但json的格式具体是什么没有约定。比如返回错误码，是叫code还是叫errCode？错误内容是message还是errMsg？内容的国际化如何处理？

如果没有一套统一的格式，在客户端将无法编写有效的网络拦截器，无法统一处理错误。

同时如果不同的插件，云端返回的数据格式千差万别，那使用者整合这些插件也会非常麻烦。国际化更无法落地。

为此DCloud推出了`uniCloud响应体规范`。

为尽可能的与uni-app前端的API错误回调风格接近，uniCloud响应体规范定义的云端返回信息内应包含`errCode`和`errMsg`，示例如下

```js
// 失败返回值
{
  errCode: 'uni-id-account-banned',
  errMsg: '账号被禁用'
}

// 成功返回值
{
  errCode: 0,
  errMsg: '登录成功',
  uid: 'xxx' // 其他信息
}
```

## errCode

errCode在成功时应返回数字`0`,失败时应返回一个以插件id开头的“字符串”，每个单词以连字符（`-`）分割。做出这样的规定是为了防止不同插件之间出现重复错误码

以`'uni-id-account-banned'`错误码为例，`uni-id`为插件id，`account-banned`为错误缩写。

如果业务开发的代码并不发布插件市场，那么为了避免下载了一个市场的插件产生冲突，推荐使用不包含“-”的字符串来做errCode（插件市场的所有插件ID必须包含“-”）。

后续uniCloud会提供自动根据errCode对errMsg进行国际化处理的功能，开发者仅需保证云函数返回值满足`uniCloud响应体规范`即可。

## errMsg

errMsg用于存放具体错误信息，包括展示给开发者、终端用户的错误信息

<!-- 占位变量格式说明：

## 支持情况
1. 从xx版本开始，clientDB遵循该格式
2. 推荐开发者的云函数在返回json数据给客户端时也遵循这种格式。
3. uniCloud客户端sdk后续会提供callFunction及数据库操作的拦截器，开发者可以在拦截器内对特定的错误码进行处理。例如：在收到token过期的错误码时进行提示并跳转到登录页面
4. uniCloud admin和uni-starter等插件内置的网络拦截器也均将支持该格式。

历史兼容说明： -->