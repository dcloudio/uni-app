#### camera
相机。

**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|
|x|x|√|x|√|x|

* 在 App 端，可以使用API方式来调用摄像头，而不是组件方式。并且App端目前无法通过cover-view覆盖摄像头，有相关需求见下方插件。
	* [uni.chooseImage](/api/media/image?id=chooseimage) 和 [uni.chooseVideo](/api/media/video?id=choosevideo) 可以拍照或录像，但它们会同时允许用户选择相册。
	* 使用`plus.camera`的API可以直接调起全屏的摄像头，详见：[https://www.html5plus.org/doc/zh_cn/camera.html](http://www.html5plus.org/doc/zh_cn/camera.html) 调用原生摄像头进行相关操作。
* 如开发身份证扫描、银行卡识别等ocr识别需求，在微信小程序和百度小程序中使用本camera组件，将图片发送给服务器识别，插件市场有封装好的[模板](https://ext.dcloud.net.cn/search?q=%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%9B%B8%E6%9C%BA)；在App端使用[原生插件](https://ext.dcloud.net.cn/search?q=ocr)
* 活体检测、人脸识别另见文档[生物认证](/api/other/authentication)

**属性说明**

|属性名|类型|默认值|说明|平台差异说明|
|:-|:-|:-|:-|:-|
|mode|String|normal	|有效值为 normal, scanCode	|微信小程序|
|device-position|String			|back		|前置或后置，值为front, back|													|
|flash			|String			|auto		|闪光灯，值为auto, on, off|													|
|@stop		|EventHandle	|			|摄像头在非正常终止时触发，如退出后台等情况|													|
|@error		|EventHandle	|			|用户不允许使用摄像头时触发|													|
|@scancode		|EventHandle	|			|在扫码识别成功时触发，仅在 mode="scanCode" 时生效|微信小程序											|

**Tips：**
* camera 组件是由客户端创建的原生组件，它的层级是最高的，不能通过 z-index 控制层级。可使用 cover-view cover-image 覆盖在上面。
* 请勿在 scroll-view、swiper、picker-view、movable-view 中使用 camera 组件。
* 同一页面只能插入一个 camera 组件。
* 相关API：[reateCameraContext](/api/media/camera-context)


**代码示例**

```html
<template>
	<view>
        <camera device-position="back" flash="off" @error="error" style="width: 100%; height: 300px;"></camera>
        <button type="primary" @click="takePhoto">拍照</button>
        <view>预览</view>
        <image mode="widthFix" :src="src"></image>
    </view>
</template>
```

```javasacript
export default {
    data() {
        return {
            src:""
        }
    },
    methods: {
         takePhoto() {
            const ctx = uni.createCameraContext();
            ctx.takePhoto({
                quality: 'high',
                success: (res) => {
                    this.src = res.tempImagePath
                }
            });
        },
        error(e) {
            console.log(e.detail);
        }
    }
}
```