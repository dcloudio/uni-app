#### camera

**注意：camera组件仅微信基础库 1.6.0+ 生效，5+App无效**

系统相机。

需要用户授权 scope.camera

|属性名					|类型				|默认值	|说明																				|
|---|---|---|---|
|device-position|String			|back		|前置或后置，值为front, back								|
|flash					|String			|auto		|闪光灯，值为auto, on, off									|
|@stop				|EventHandle|				|摄像头在非正常终止时触发，如退出后台等情况	|
|@error			|EventHandle|				|用户不允许使用摄像头时触发									|

相关api：uni.createCameraContext

Bug & Tip

1. tip: camera 组件是由客户端创建的原生组件，它的层级是最高的，不能通过 z-index 控制层级。可使用 cover-view cover-image覆盖在上面。
2. tip: 同一页面只能插入一个 camera 组件。
3. tip: 请勿在 scroll-view、swiper、picker-view、movable-view 中使用 camera 组件。

**代码示例**
 
 ```html
<!-- camera.wxml -->
<camera device-position="back" flash="off" @error="error" style="width: 100%; height: 300px;"></camera>
<button type="primary" @tap="takePhoto">拍照</button>
<view>预览</view>
<image mode="widthFix" :src="src"></image>
 ```
 
 ```javascript
// camera.js
export default {
    methods: {
        takePhoto() {
            const ctx = uni.createCameraContext()
            ctx.takePhoto({
                quality: 'high',
                success: (res) => {
                    this.setData({
                        src: res.tempImagePath
                    })
                }
            })
        },
        error(e) {
            console.log(e.detail)
        }
    }
}
 ```
 