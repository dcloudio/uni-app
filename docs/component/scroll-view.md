#### scroll-view

可滚动视图区域。

**属性说明**

|属性名					|类型		|默认值	|说明																							|平台差异说明	|
|:-						|:-			|:-		|:-																								|:-			|
|scroll-x				|Boolean	|false	|允许横向滚动																					|			|
|scroll-y				|Boolean	|false	|允许纵向滚动																					|			|
|upper-threshold		|Number		|50		|距顶部/左边多远时（单位px），触发 scrolltoupper 事件											|			|
|lower-threshold		|Number		|50		|距底部/右边多远时（单位px），触发 scrolltolower 事件											|			|
|scroll-top				|Number		|		|设置竖向滚动条位置																				|			|
|scroll-left			|Number		|		|设置横向滚动条位置																				|			|
|scroll-into-view		|String		|		|值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素				|			|
|scroll-with-animation	|Boolean	|false	|在设置滚动条位置时使用动画过渡																	|			|
|enable-back-to-top		|Boolean	|false	|iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向								|微信小程序	|
|show-scrollbar         |Boolean	|false	|控制是否出现滚动条| App-nvue 2.1.5+ |
|refresher-enabled		|Boolean	|false	|开启自定义下拉刷新|app-vue 2.5.12+,微信小程序基础库2.10.1+|
|refresher-threshold	|number		|45		|设置自定义下拉刷新阈值|app-vue 2.5.12+,微信小程序基础库2.10.1+|
|refresher-default-style|string		|"black"|设置自定义下拉刷新默认样式，支持设置 black，white，none，none 表示不使用默认样式|app-vue 2.5.12+,微信小程序基础库2.10.1+|
|refresher-background	|string		|"#FFF" |设置自定义下拉刷新区域背景颜色|app-vue 2.5.12+,微信小程序基础库2.10.1+|
|refresher-triggered	|boolean	|false	|设置当前下拉刷新状态，true 表示下拉刷新已经被触发，false 表示下拉刷新未被触发|app-vue 2.5.12+,微信小程序基础库2.10.1+|
|@scrolltoupper			|EventHandle|		|滚动到顶部/左边，会触发 scrolltoupper 事件														|			|
|@scrolltolower			|EventHandle|		|滚动到底部/右边，会触发 scrolltolower 事件														|			|
|@scroll				|EventHandle|		|滚动时触发，event.detail = {scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY}	|&nbsp;|
|@refresherpulling		|EventHandle|		|自定义下拉刷新控件被下拉|app-vue 2.5.12+,微信小程序基础库2.10.1+|
|@refresherrefresh		|EventHandle|		|自定义下拉刷新被触发|app-vue 2.5.12+,微信小程序基础库2.10.1+|
|@refresherrestore		|EventHandle|		|自定义下拉刷新被复位|app-vue 2.5.12+,微信小程序基础库2.10.1+|
|@refresherabort		|EventHandle|		|自定义下拉刷新被中止|app-vue 2.5.12+,微信小程序基础库2.10.1+|

使用竖向滚动时，需要给 ``<scroll-view>`` 一个固定高度，通过 css 设置 height。
 
**示例** [查看演示](https://uniapp.dcloud.io/h5/pages/component/scroll-view/scroll-view)
```html
<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-title uni-common-mt">
				Vertical Scroll
				<text>\n纵向滚动</text>
			</view>
			<view>
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
				@scroll="scroll">
					<view id="demo1" class="scroll-view-item uni-bg-red">A</view>
					<view id="demo2" class="scroll-view-item uni-bg-green">B</view>
					<view id="demo3" class="scroll-view-item uni-bg-blue">C</view>
				</scroll-view>
			</view>
			<view @tap="goTop" class="uni-link uni-center uni-common-mt">
				点击这里返回顶部
			</view>
			<view class="uni-title uni-common-mt">
				Horizontal Scroll
				<text>\n横向滚动</text>
			</view>
			<view>
				<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
					<view id="demo1" class="scroll-view-item_H uni-bg-red">A</view>
					<view id="demo2" class="scroll-view-item_H uni-bg-green">B</view>
					<view id="demo3" class="scroll-view-item_H uni-bg-blue">C</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>
```
 
```javascript
export default {
    data() {
        return {
            scrollTop: 0,
            old: {
                scrollTop: 0
            }
        }
    },
    methods: {
        upper: function(e) {
            console.log(e)
        },
        lower: function(e) {
            console.log(e)
        },
        scroll: function(e) {
            console.log(e)
            this.old.scrollTop = e.detail.scrollTop
        },
        goTop: function(e) {
            this.scrollTop = this.old.scrollTop
            this.$nextTick(function() {
                this.scrollTop = 0
            });
            uni.showToast({
                icon:"none",
                title:"纵向滚动 scrollTop 值已被修改为 0"
            })
        }
    }
}
```

**自定义下拉刷新**
```html
<template>
    <view>
        <scroll-view style="height: 300px;" scroll-y="true" refresher-enabled="true" :refresher-triggered="triggered"
            :refresher-threshold="100" refresher-background="lightgreen" @refresherpulling="onPulling"
            @refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherabort="onAbort"></scroll-view>
    </view>
</template>
```

```javascript

<script>
    export default {
        data() {
            return {
                triggered: false
            }
        },
        onLoad() {
            this._freshing = false;
            setTimeout(() => {
                this.triggered = true;
            }, 1000)
        },
        methods: {
            onPulling(e) {
                console.log("onpulling", e);
            },
            onRefresh() {
                if (this._freshing) return;
                this._freshing = true;
                setTimeout(() => {
                    this.triggered = false;
                    this._freshing = false;
                }, 3000)
            },
            onRestore() {
                this.triggered = 'restore'; // 需要重置
                console.log("onRestore");
            },
            onAbort() {
                console.log("onAbort");
            }
        }
    }
</script>

```
![uniapp](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/img/scroll-view.png)
 
**Tips**

- APP-vue和小程序中，请勿在 scroll-view 中使用 map、video 等原生组件。小程序中 scroll-view 中也不要使用 canvas、textarea 原生组件。更新：微信基础库2.4.4起支持了原生组件在 scroll-view、swiper、movable-view 中的使用。app-nvue无此限制。
- scroll-view 不适合放长列表，有性能问题。长列表滚动和下拉刷新，应该使用原生导航栏搭配页面级的滚动和下拉刷新实现。包括在app-nvue页面，长列表应该使用list而不是scroll-view
- scroll-into-view 的优先级高于 scroll-top。
- scroll-view是区域滚动，不会触发页面滚动，无法触发pages.json配置的下拉刷新、页面触底onReachBottomDistance、titleNView的transparent透明渐变。
- 若要使用下拉刷新，建议使用页面的滚动，而不是 scroll-view 。插件市场有前端模拟的下拉刷新，但性能不佳。
- 如果遇到scroll-top、scroll-left属性设置不生效的问题参考：[组件属性设置不生效解决办法](/use?id=%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98)
- scroll-view的滚动条设置，可通过css的-webkit-scrollbar自定义，包括隐藏滚动条。（nvue无此css）
