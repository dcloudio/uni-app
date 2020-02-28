### uni.onGyroscopeChange(CALLBACK)

监听陀螺仪数据变化事件。

支付宝小程序频率为 500ms/次，微信小程序频率根据 [uni.startGyroscope](/api/system/gyroscope?id=startgyroscope) 的 interval 参数设置。事件只有在调用 [uni.startGyroscope](/api/system/gyroscope?id=startgyroscope) 后才会开始监听，使用 [uni.stopGyroscope](/api/system/gyroscope?id=stopgyroscope) 可以停止监听。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|√|x|x|

**CALLBACK 参数说明**

|属性|类型|说明
|--|--|--|
|res|Object|res = {x,y,x}|

**res 的结构**

|名称|类型|描述|
|---|---|---|
|x|number|x轴方向角速度|
|y|number|y轴方向角速度|
|z|number|z轴方向角速度|

### uni.startGyroscope(OBJECT)

开始监听陀螺仪数据。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|√|x|x|

|属性|类型|默认值|必填|说明|平台说明|
|---|---|---|---|---|
|interval|string|normal|否|监听陀螺仪数据回调函数的执行频率：game（20ms/次）、ui（60ms/次）、normal（200ms/次）|微信小程序|
|success|function||否|接口调用成功的回调函数||
|fail|function||否|接口调用失败的回调函数||
|complete|function||否|接口调用结束的回调函数（调用成功、失败都会执行）|&nbsp;|

### uni.stopGyroscope(OBJECT)

停止监听陀螺仪数据。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|√|x|x|

|属性|类型|必填|说明|
|---|---|---|---|
|success|function|否|接口调用成功的回调函数|
|fail|function|否|接口调用失败的回调函数|
|complete|function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**代码示例**

```html
<template>
    <view>
        <button @click="start">开始监听陀螺仪变化</button>
        <button @click="stop">停止监听陀螺仪变化</button>
    </view>
</template>
```

```javascript
export default {
    methods: {
        start() {
            uni.onGyroscopeChange((res) => {
                console.log('gyroData.rotationRate.x = ' + res.x)
                console.log('gyroData.rotationRate.y = ' + res.y)
                console.log('gyroData.rotationRate.z = ' + res.z)
            });
            uni.startGyroscope({
                interval: "normal",
                success() {
                    console.log('success')
                },
                fail() {
                    console.log('fail')
                }
            })
        },
        stop(){
            uni.stopGyroscope({
                success() {
                    console.log('stop success!')
                },
                fail() {
                    console.log('stop fail!')
                }
            })
        }
    }
}
```

**Tips**

* 陀螺仪 相关 API 在小程序开发工具中调用可能报错，请在真机中测试