### uni.chooseAddress(OBJECT)

获取用户收货地址。调起用户编辑收货地址原生界面，并在编辑完成后返回用户选择的地址，需要用户授权 scope.address。
 
**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|√|√|√|x|
 
**OBJECT参数说明**

| 属性 | 类型  | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| success | function|否 | 接口调用成功的回调函数 |
| fail | function|否 | 接口调用失败的回调函数 |
| complete | function|否 | 接口调用结束的回调函数（调用成功、失败都会执行） |

**success返回参数说明**


| 属性 | 类型 | 说明 |平台差异说明|
| --- | --- | --- |---|
| userName | string | 收货人姓名 ||
| postalCode | string | 邮编 ||
| provinceName | string | 国标收货地址第一级地址 ||
| cityName | string | 国标收货地址第一级地址 ||
| detailInfo | string | 详细收货地址信息 ||
| nationalCode | string | 收货地址国家码 ||
| telNumber | string | 收货人手机号码 ||
| errMsg | string | 错误信息 |微信小程序|


**示例代码**

```js
uni.chooseAddress({
  success(res) {
    console.log(res.userName)
    console.log(res.postalCode)
    console.log(res.provinceName)
    console.log(res.cityName)
    console.log(res.countyName)
    console.log(res.detailInfo)
    console.log(res.nationalCode)
    console.log(res.telNumber)
  }
})
```