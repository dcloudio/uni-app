MediaQueryObserver 对象，用于监听页面 media query 状态的变化，如界面的宽高是不是在某个指定的范围内。

### uni.createMediaQueryObserver([this])
创建并返回一个 ``MediaQueryObserver`` 对象实例。

**this说明：**

自定义组件实例。**小程序端不支持此参数，传入仅为抹平写法差异**

**平台兼容性**

|app|微信小程序|支付宝小程序|qq小程序|百度小程序|字节小程序|360小程序|快应用|
|:-|:-|:-|:-|:-|:-|:-|:-|
|2.8.12+，app-vue|基础库 2.11.1+|√|√|√|√|√|X|

注意：支付宝小程序、qq小程序、百度小程序、字节小程序，暂不支持监听屏幕动态改变，即只执行一次媒体查询。

### MediaQueryObserver 对象的方法列表

>tips: 和 UI 相关的 api 在组件 mountd 后执行

|方法|说明|
|:-|:-|:-|
|MediaQueryObserver.observe(Object descriptor, function callback)|开始监听页面 media query 变化情况|
|MediaQueryObserver.disconnect()|停止监听，回调函数将不再触发|

**Object descriptor**

|属性名|类型|默认值|必填|说明|
|:-|:-|:-|:-|:-|
|min-width|number||否|页面最小宽度（ px 为单位）|
|max-width|number||否|页面最大宽度（ px 为单位）|
|width|number||否|页面宽度（ px 为单位）|
|min-height|number||否|页面最小高度（ px 为单位）|
|max-height|number||否|页面最大高度（ px 为单位）|
|height|number||否|页面高度（ px 为单位）|
|orientation|string||否|屏幕方向（ landscape 或 portrait ）|

**observe 回调函数包含一个参数**

|参数|类型|说明|
|:-|:-|:-|
|matches|boolean|页面的当前状态是否满足所指定的 media query|

### 代码示例

以下示例代码，推荐使用HBuilderX，新建uni-app项目，可直接体验完整示例。

```
<template>
    <view class="content">
        <view class="">
            要求页面最小宽度 375px， 且页面宽度最大 500px，是否匹配: {{matches}}
        </view>
        <view>
            要求屏幕方向为纵向，是否匹配: {{landscape}}
        </view>
    </view>
</template>

<script>
    let landscapeOb
    export default {
        data() {
            return {
                matches: false,
                landscape: false,
                mediaQueryOb: null
            }
        },
        onLoad() {

        },
        
        // 和 UI 相关的 api 在组件 mountd 后执行
        mounted() {
            this.testMediaQueryObserver()
            this.landscapeObserver()
        },

        methods: {
            testMediaQueryObserver() {
                this.mediaQueryOb = uni.createMediaQueryObserver(this)

                this.mediaQueryOb.observe({
                    minWidth: 375,  //页面最小宽度 375px
                    maxWidth: 500  //页面宽度最大 500px
                }, matches => {
                    this.matches = matches;
                })
            },
            landscapeObserver() {
                landscapeOb = uni.createMediaQueryObserver(this)
                landscapeOb.observe({
                    orientation: 'landscape'  //屏幕方向为纵向
                }, matches => {
                        this.landscape = matches
                })
            },
            destroyed () {
                this.mediaQueryOb.disconnect()  //组件销毁时停止监听
                landscapeOb.disconnect()
            }
        }
    }
</script>

<style>
    .content {
        text-align: center;
        height: 400upx;
    }
</style>
```
