#### image

图片。

|属性名|类型|默认值|说明|平台差异说明|
|:-|:-|:-|:-|:-|
|src|String||图片资源地址||
|mode|String|'scaleToFill'|图片裁剪、缩放的模式|<div style="width:68px;"></div>|
|lazy-load|Boolean|false|图片懒加载。只针对page与scroll-view下的image有效|微信小程序、App、百度小程序、头条小程序|
|fade-show|Boolean|true|图片显示动画效果|仅App-nvue 2.3.4+ Android有效|
|webp|boolean|false|默认不解析 webP 格式，只支持网络资源|微信小程序2.9.0|
|show-menu-by-longpress|boolean|false|开启长按图片显示识别小程序码菜单|微信小程序2.7.0|
|@error|HandleEvent||当错误发生时，发布到 AppService 的事件名，事件对象event.detail = {errMsg: 'something wrong'}||
|@load|HandleEvent||当图片载入完毕时，发布到 AppService 的事件名，事件对象event.detail = {height:'图片高度px', width:'图片宽度px'}|&nbsp;|

**Tips**

- `<image>` 组件默认宽度 300px、高度 225px；`app-nvue平台，暂时默认为屏幕宽度`
- `src` 仅支持相对路径、绝对路径，支持 base64 码；
- 页面结构复杂，css样式太多的情况，使用 image 可能导致样式生效较慢，出现 “闪一下” 的情况，此时设置 `image{will-change: transform}` ,可优化此问题。
- 自定义组件里面使用 `<image>`时，若 `src` 使用相对路径可能出现路径查找失败的情况，故建议使用绝对路径。
- webp格式的图片，app-vue下，iOS不支持，Android支持；app-nvue下，iOS和Android均支持。app-vue下也支持gif。

**mode 有效值：**

mode 有 13 种模式，其中 4 种是缩放模式，9 种是裁剪模式。

|模式|值|说明|
|:-|:-|:-|
|缩放|scaleToFill|不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素|
|缩放|aspectFit|保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。|
|缩放|aspectFill|保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。|
|缩放|widthFix|宽度不变，高度自动变化，保持原图宽高比不变|
|裁剪|top|不缩放图片，只显示图片的顶部区域|
|裁剪|bottom|不缩放图片，只显示图片的底部区域|
|裁剪|center|不缩放图片，只显示图片的中间区域|
|裁剪|left|不缩放图片，只显示图片的左边区域|
|裁剪|right|不缩放图片，只显示图片的右边区域|
|裁剪|top left|不缩放图片，只显示图片的左上边区域|
|裁剪|top right|不缩放图片，只显示图片的右上边区域|
|裁剪|bottom left|不缩放图片，只显示图片的左下边区域|
|裁剪|bottom right|不缩放图片，只显示图片的右下边区域|

**示例：** [查看示例](https://uniapp.dcloud.io/h5/pages/component/image/image)
 
```html
<template>
    <view class="page">
        <view class="image-list">
            <view class="image-item" v-for="(item,index) in array" :key="index">
                <view class="image-content">
                    <image style="width: 200px; height: 200px; background-color: #eeeeee;" :mode="item.mode" :src="src"
                        @error="imageError"></image>
                </view>
                <view class="image-title">{{item.text}}</view>
            </view>
        </view>
    </view>
</template>
```
```javascript
export default {
    data() {
        return {
            array: [{
                mode: 'scaleToFill',
                text: 'scaleToFill：不保持纵横比缩放图片，使图片完全适应'
            }, {
                mode: 'aspectFit',
                text: 'aspectFit：保持纵横比缩放图片，使图片的长边能完全显示出来'
            }, {
                mode: 'aspectFill',
                text: 'aspectFill：保持纵横比缩放图片，只保证图片的短边能完全显示出来'
            }, {
                mode: 'top',
                text: 'top：不缩放图片，只显示图片的顶部区域'
            }, {
                mode: 'bottom',
                text: 'bottom：不缩放图片，只显示图片的底部区域'
            }, {
                mode: 'center',
                text: 'center：不缩放图片，只显示图片的中间区域'
            }, {
                mode: 'left',
                text: 'left：不缩放图片，只显示图片的左边区域'
            }, {
                mode: 'right',
                text: 'right：不缩放图片，只显示图片的右边边区域'
            }, {
                mode: 'top left',
                text: 'top left：不缩放图片，只显示图片的左上边区域'
            }, {
                mode: 'top right',
                text: 'top right：不缩放图片，只显示图片的右上边区域'
            }, {
                mode: 'bottom left',
                text: 'bottom left：不缩放图片，只显示图片的左下边区域'
            }, {
                mode: 'bottom right',
                text: 'bottom right：不缩放图片，只显示图片的右下边区域'
            }],
            src: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg'
        }
    },
    methods: {
        imageError: function(e) {
            console.error('image发生error事件，携带值为' + e.detail.errMsg)
        }
    }
}
```

原图

![uniapp](https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg)

scaleToFill：不保持纵横比缩放图片，使图片完全适应

![uniapp](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/img/cat-1.png)

aspectFit：保持纵横比缩放图片，使图片的长边能完全显示出来

![uniapp](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/img/cat-2.png)

aspectFill：保持纵横比缩放图片，只保证图片的短边能完全显示出来

![uniapp](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/img/cat-3.png)

top：不缩放图片，只显示图片的顶部区域

![uniapp](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/img/cat-4.png)

bottom：不缩放图片，只显示图片的底部区域

![uniapp](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/img/cat-5.png)

center：不缩放图片，只显示图片的中间区域

![uniapp](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/img/cat-6.png)

left：不缩放图片，只显示图片的左边区域

![uniapp](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/img/cat-7.png)

right：不缩放图片，只显示图片的右边边区域

![uniapp](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/img/cat-8.png)

top left：不缩放图片，只显示图片的左上边区域

![uniapp](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/img/cat-9.png)

top right：不缩放图片，只显示图片的右上边区域

![uniapp](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/img/cat-10.png)

bottom left：不缩放图片，只显示图片的左下边区域

![uniapp](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/img/cat-11.png)

bottom right：不缩放图片，只显示图片的右下边区域

![uniapp](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/img/cat-12.png)
