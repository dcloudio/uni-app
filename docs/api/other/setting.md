### uni.openSetting(OBJECT)

调起客户端小程序设置界面，返回用户设置的操作结果。

**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
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

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
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

#### 示例代码
```js
uni.getSetting({
   success(res) {
      console.log(res.authSetting)
   }
})
```
