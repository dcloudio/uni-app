### uni.chooseInvoiceTitle(OBJECT)

选择用户的发票抬头，需要用户授权 scope.invoiceTitle。

在微信小程序中，当前当前小程序必须关联一个公众号，且这个公众号是完成了[微信认证](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1496554031_RD4xe)的，才能调用 chooseInvoiceTitle。

**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|x|√|x|x|
 
**OBJECT参数说明**

|属性|类型|必填|说明|
|:-|:-|:-|:-|:-|
|success|function|否|接口调用成功的回调函数|
|fail|function|否|接口调用失败的回调函数|
|complete|function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**success返回参数说明**

|属性|类型|说明|平台差异说明|
|:-|:-|:-|:-|
|type|string|抬头类型（0：单位，1：个人）||
|title|string|抬头名称||
|taxNumber|string|抬头税号||
|companyAddress|string|单位地址||
|telephone|string|手机号码||
|bankName|string|银行名称||
|bankAccount|string|银行账号||
|errMsg|string|错误信息|微信小程序|

**示例代码**

```js
uni.chooseInvoiceTitle({
    success(res) {
        console.log(res.type);
        console.log(res.title);
        console.log(res.taxNumber);
        console.log(res.companyAddress);
        console.log(res.telephone);
        console.log(res.bankName);
        console.log(res.bankAccount);
  }
})
```