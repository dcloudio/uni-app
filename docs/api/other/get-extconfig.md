### uni.getExtConfig(OBJECT)

获取第三方平台自定义的数据字段。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|x|√|√|x|

**OBJECT参数说明**

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| success | function |  | 否 | 接口调用成功的回调函数 |
| fail | function |  | 否 | 接口调用失败的回调函数 |
| complete | function |  | 否 | 接口调用结束的回调函数（调用成功、失败都会执行） |

**success 回调参数说明**

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| extConfig | Object | 第三方平台自定义的数据 |

**Tips**

* 本接口暂时无法通过 `uni.canIUse`判断是否兼容，开发者需要自行判断 `uni.getExtConfig` 是否存在来兼容。

**示例代码**

```
if (uni.getExtConfig) {
  uni.getExtConfig({
    success(res) {
      console.log(res.extConfig)
    }
  })
}
```


### uni.getExtConfigSync()

``uni.getExtConfig`` 的同步版本。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|x|√|√|x|

**返回值(Object)**

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| extConfig | Object | 第三方平台自定义的数据 |

**Tips**

* 本接口暂时无法通过 `uni.canIUse`判断是否兼容，开发者需要自行判断 `uni.getExtConfigSync` 是否存在来兼容。

**代码示例**

```
const extConfig = uni.getExtConfigSync ? uni.getExtConfigSync() : {}
console.log(extConfig)
```