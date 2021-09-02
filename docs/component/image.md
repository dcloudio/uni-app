#### image

图片。

|属性名|类型|默认值|说明|平台差异说明|
|:-|:-|:-|:-|:-|
|src|String||图片资源地址||
|mode|String|'scaleToFill'|图片裁剪、缩放的模式|<div style="width:68px;"></div>|
|lazy-load|Boolean|false|图片懒加载。只针对page与scroll-view下的image有效|微信小程序、百度小程序、字节跳动小程序|
|fade-show|Boolean|true|图片显示动画效果|仅App-nvue 2.3.4+ Android有效|
|webp|boolean|false|默认不解析 webP 格式，只支持网络资源|微信小程序2.9.0|
|show-menu-by-longpress|boolean|false|开启长按图片显示识别小程序码菜单|微信小程序2.7.0|
|draggable|boolean|true|鼠标长按是否能拖动图片|仅 H5 平台 3.1.1+ 有效|
|@error|HandleEvent||当错误发生时，发布到 AppService 的事件名，事件对象event.detail = {errMsg: 'something wrong'}||
|@load|HandleEvent||当图片载入完毕时，发布到 AppService 的事件名，事件对象event.detail = {height:'图片高度px', width:'图片宽度px'}|&nbsp;|

**Tips**

- `<image>` 组件默认宽度 300px、高度 225px；`app-nvue平台，暂时默认为屏幕宽度`
- `src` 仅支持相对路径、绝对路径，支持 base64 码；
- 页面结构复杂，css样式太多的情况，使用 image 可能导致样式生效较慢，出现 “闪一下” 的情况，此时设置 `image{will-change: transform}` ,可优化此问题。
- 自定义组件里面使用 `<image>`时，若 `src` 使用相对路径可能出现路径查找失败的情况，故建议使用绝对路径。
- webp格式的图片在Android上是内置支持的。iOS上不同平台不一样，具体如下：app-vue下，iOS不支持；app-nvue下，iOS支持；微信小程序2.9.0起，iOS支持。
- svg 格式的图片在不同的平台支持情况不同。具体为：app-nvue 不支持 svg 格式的图片，小程序上只支持网络地址。


**mode 有效值：**

mode 有 14 种模式，其中 5 种是缩放模式，9 种是裁剪模式。

|模式|值|说明|
|:-|:-|:-|
|缩放|scaleToFill|不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素|
|缩放|aspectFit|保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。|
|缩放|aspectFill|保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。|
|缩放|widthFix|宽度不变，高度自动变化，保持原图宽高比不变|
|缩放|heightFix|高度不变，宽度自动变化，保持原图宽高比不变 **App 和 H5 平台 HBuilderX 2.9.3+ 支持、微信小程序需要基础库 2.10.3**|
|裁剪|top|不缩放图片，只显示图片的顶部区域|
|裁剪|bottom|不缩放图片，只显示图片的底部区域|
|裁剪|center|不缩放图片，只显示图片的中间区域|
|裁剪|left|不缩放图片，只显示图片的左边区域|
|裁剪|right|不缩放图片，只显示图片的右边区域|
|裁剪|top left|不缩放图片，只显示图片的左上边区域|
|裁剪|top right|不缩放图片，只显示图片的右上边区域|
|裁剪|bottom left|不缩放图片，只显示图片的左下边区域|
|裁剪|bottom right|不缩放图片，只显示图片的右下边区域|

**示例：** [查看示例](https://hellouniapp.dcloud.net.cn/pages/component/image/image)
 
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
            src: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg'
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

![uniapp](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg)

scaleToFill：不保持纵横比缩放图片，使图片完全适应

![uniapp](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6b971f70-4f31-11eb-bd01-97bc1429a9ff.png)

aspectFit：保持纵横比缩放图片，使图片的长边能完全显示出来

![uniapp](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6c4e3a70-4f31-11eb-8ff1-d5dcf8779628.png)

aspectFill：保持纵横比缩放图片，只保证图片的短边能完全显示出来

![uniapp](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6cfbdf90-4f31-11eb-8ff1-d5dcf8779628.png)

top：不缩放图片，只显示图片的顶部区域

![uniapp](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6dd1f440-4f31-11eb-8ff1-d5dcf8779628.png)

bottom：不缩放图片，只显示图片的底部区域

![uniapp](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/649ee9a0-4f31-11eb-8a36-ebb87efcf8c0.png)

center：不缩放图片，只显示图片的中间区域

![uniapp](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/65495a70-4f31-11eb-8a36-ebb87efcf8c0.png)

left：不缩放图片，只显示图片的左边区域

![uniapp](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/66211cd0-4f31-11eb-bd01-97bc1429a9ff.png)

right：不缩放图片，只显示图片的右边边区域

![uniapp](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/66e55730-4f31-11eb-8a36-ebb87efcf8c0.png)

top left：不缩放图片，只显示图片的左上边区域

![uniapp](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/67b614b0-4f31-11eb-bd01-97bc1429a9ff.png)

top right：不缩放图片，只显示图片的右上边区域

![uniapp](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6869fb60-4f31-11eb-a16f-5b3e54966275.png)

bottom left：不缩放图片，只显示图片的左下边区域

![uniapp](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/693ed790-4f31-11eb-8a36-ebb87efcf8c0.png)

bottom right：不缩放图片，只显示图片的右下边区域

![uniapp](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6a042360-4f31-11eb-a16f-5b3e54966275.png)
