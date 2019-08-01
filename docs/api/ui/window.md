### uni.onWindowResize(CALLBACK)
监听窗口尺寸变化事件

> 1.6.0 新增

**平台差异说明**

|5+App|H5|微信小程序	|支付宝小程序|百度小程序|头条小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|x|x|x|

**CALLBACK 参数说明**

|属性|类型|说明|
|---|---|---|
|size|Object|变化后的窗口的大小，单位为 px ，{windowWidth,windowHeight}|

**代码示例**

```javascript
uni.onWindowResize((res) => {
    console.log('变化后的窗口宽度=' + res.size.windowWidth)
    console.log('变化后的窗口高度=' + res.size.windowHeight)
})
```

### uni.offWindowResize(CALLBACK)
取消监听窗口尺寸变化事件

> 1.6.0 新增

平台差异说明

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|x|x|x|

**代码示例**

```javascript
uni.offWindowResize(() => {
    console.log('取消监听窗口尺寸变化事件')
})
```
