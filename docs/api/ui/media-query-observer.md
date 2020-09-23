MediaQueryObserver 对象，用于监听页面 media query 状态的变化，如界面的长宽是不是在某个指定的范围内。

### uni.createMediaQueryObserver([this])
创建并返回一个 ``MediaQueryObserver`` 对象实例。

> 从 HbuilderX 2.8.12 版本开始支持

**this说明：**

自定义组件实例。**小程序端不支持此参数，传入仅为抹平写法差异**

### MediaQueryObserver 对象的方法列表

|方法|说明|平台差异|
|:-|:-|:-|
|MediaQueryObserver.observe(Object descriptor, function callback)|开始监听页面 media query 变化情况|小程序非微信端，只查询一次，不支持监听|
|MediaQueryObserver.disconnect()|停止监听，回调函数将不再触发||

**observe 回调函数包含一个参数**

|参数|类型|说明|
|:-|:-|:-|
|matches|boolean|页面的当前状态是否满足所指定的 media query|

### 代码示例

```
<template>
    <view class="content">
        <view class="">
            matches: {{matches}}
        </view>
        <view>
            landscape: {{landscape}}
        </view>
            <button type="success" @click="remove">destroy</button>
        </view>
    </view>
</template>

<script>
    let landscapeObs, interObs
    export default {
        data() {
            return {
                matches: false,
                landscape: false,
            }
        },
        onLoad() {

        },
        mounted() {
            this.testMediaQueryObserver()
            this.landscapeObserver()

        },

        methods: {
            changeMinWidth() {
                console.log("======= changeMinWidth ======")
                var that = this
                setTimeout(() => {
                    that.minWidth =  420
                    console.log("that.minwidth", that.minWidth)
                }, 1000)

            },
            testMediaQueryObserver() {
                this.mediaQueryOb = uni.createMediaQueryObserver(this)

                this.mediaQueryOb.observe({
                    minWidth: 305,
                    maxWidth: 400,
                    orientation: 'portrait'  
                }, matches => {
                    console.log('######### matches #########', matches)
                    this.matches = matches;
                })
            },
            landscapeObserver() {
                // console.log('--------- this----------', this)
                landscapeObs = uni.createMediaQueryObserver(this)
                landscapeObs.observe({
                    }, matches => {
                        this.landscape = matches
                })
                console.log('--------- landscapeObs -------', landscapeObs)
                return landscapeObs
            },
            remove() {
                this.mediaQueryOb.disconnect()
                landscapeObs.disconnect()
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
