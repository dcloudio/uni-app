### uni.openSetting(OBJECT)

调起客户端小程序设置界面，返回用户设置的操作结果。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|√|√|√|√|

|属性|类型|必填|说明|
|---|---|---|---|---|
|success|function|否|接口调用成功的回调函数|
|fail|function|否|接口调用失败的回调函数|
|complete|function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**success 返回参数**

|属性|类型|说明|
|---|---|---|
|authSetting|Object|用户授权结果，其中 key 为 [scope](/api/other/authorize?id=scope-列表) 值，value 为 Boolean 值，表示用户是否允许授权|

**代码示例**

```javascript
uni.openSetting({
  success(res) {
    console.log(res.authSetting)
  }
});
```

### uni.getSetting(OBJECT)
获取用户的当前设置。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|√|√|√|√|

|属性|类型|默认值|必填|说明|
|---|---|---|---|---|
|withSubscriptions|Boolean|false |否|是否同时获取用户订阅消息的订阅状态，默认不获取。注意：withSubscriptions 只返回用户勾选过订阅面板中的“总是保持以上选择，不再询问”的订阅消息。 **（微信小程序 2.10.1 支持）**|
|success|function||否|接口调用成功的回调函数|
|fail|function||否|接口调用失败的回调函数|
|complete|function||否|接口调用结束的回调函数（调用成功、失败都会执行）|


**success 返回参数**

|属性|类型|说明|
|---|---|---|
|authSetting|Object|用户授权结果，其中 key 为 [scope](/api/other/authorize?id=scope-列表) 值，value 为 Boolean 值，表示用户是否允许授权|
|subscriptionsSetting|SubscriptionsSetting|用户订阅消息设置，接口参数`withSubscriptions`值为`true`时才会返回。**（微信小程序 2.10.1 支持）**|

#### 示例代码
```js
uni.getSetting({
   success(res) {
      console.log(res.authSetting)
   }
})
```
