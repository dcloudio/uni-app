#### swiper

滑块视图容器。一般用于左右滑动或上下滑动，比如banner轮播图，注意是滑动切换而不是滚动。swiper下的每个swiper-item是一个滑动切换区域，不能停留在2个滑动区域之间。

**属性说明**

|属性名|类型|默认值|说明|平台差异说明|
|:-|:-|:-|:-|:-|
|indicator-dots|Boolean|false|是否显示面板指示点||
|indicator-color|Color|rgba(0, 0, 0, .3)|指示点颜色||
|indicator-active-color|Color|#000000|当前选中的指示点颜色||
|active-class|String||swiper-item 可见时的 class|支付宝小程序|
|changing-class|String||acceleration 设置为 {{true}} 时且处于滑动过程中，中间若干屏处于可见时的class|支付宝小程序|
|autoplay|Boolean|false|是否自动切换||
|current|Number|0|当前所在滑块的 index||
|current-item-id|String||当前所在滑块的 item-id ，不能与 current 被同时指定|支付宝小程序不支持|
|interval|Number|5000|自动切换时间间隔||
|duration|Number|500|滑动动画时长||
|circular|Boolean|false|是否采用衔接滑动||
|vertical|Boolean|false|滑动方向是否为纵向||
|previous-margin|String|0px|前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值|头条小程序不支持|
|next-margin|String|0px|后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值|头条小程序不支持|
|acceleration|Boolean|false|当开启时，会根据滑动速度，连续滑动多屏|支付宝小程序|
|disable-programmatic-animation|Boolean|false|是否禁用代码变动触发 swiper 切换时使用动画。|支付宝小程序|
|display-multiple-items|Number|1|同时显示的滑块数量|支付宝小程序不支持|
|skip-hidden-item-layout|Boolean|false|是否跳过未显示的滑块布局，设为 true 可优化复杂情况下的滑动性能，但会丢失隐藏状态滑块的布局信息|微信小程序、5+App|
|disable-touch|Boolean|false|是否禁止用户 touch 操作|支付宝小程序|
|touchable|Boolean|true|是否监听用户的触摸事件|头条小程序|
|easing-function|String|default|指定 swiper 切换缓动动画类型，有效值：default、linear、easeInCubic、easeOutCubic、easeInOutCubic|微信小程序|
|@change|EventHandle||current 改变时会触发 change 事件，event.detail = {current: current, source: source}||
|@transition|EventHandle||swiper-item 的位置发生改变时会触发 transition 事件，event.detail = {dx: dx, dy: dy}|微信小程序、5+App、支付宝小程序、头条小程序、QQ小程序|
|@animationfinish|EventHandle||动画结束时会触发 animationfinish 事件，event.detail = {current: current, source: source}|头条小程序不支持|

change 事件返回 detail 中包含一个 source 字段，表示导致变更的原因，可能值如下：

- autoplay 自动播放导致swiper变化。
- touch 用户划动引起swiper变化。
- 其他原因将用空字符串表示。

**swiper做左右拖动的长列表问题**
- swiper是单页组件，适合做banner图轮播和简单列表左右滑动。
- 因为性能问题，用swiper做复杂长列表，需要较高的优化技巧以及接受一些限制。
- 这是一个范例，[插件市场新闻模板示例](https://ext.dcloud.net.cn/plugin?id=103)，它在App端使用了nvue的原生渲染，实现高性能的左右拖动长列表；并支持可自定义的任何形式的下拉刷新。它在非App端使用的模式是只缓存左右一共3列的数据，dom中的数据过多时，它会自动释放。就是说App上，只要看过这一页，再进去时内容是还在的。而在非App上，只能做到缓存3页数据，其他页即便看过，再进去也会重新加载。并且非App的这种情况下，不再提供下拉刷新。虽然插件市场也有其他前端模拟的下拉刷新，但性能不佳。一般小程序的大厂案例里，提供左右拖长列表的，都是这种做法。

**Tips**

- 使用竖向滚动时，需要给 ``<scroll-view>`` 一个固定高度，通过 css 设置 height。
- 注意：其中只可放置 ``<swiper-item>`` 组件，否则会导致未定义的行为。 
- 如果遇到current、current-item-id属性设置不生效的问题参考：[组件属性设置不生效解决办法](/use?id=%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98)
- banner图的切换效果和指示器的样式，有多种风格可自定义，可在[uni-app插件市场](https://ext.dcloud.net.cn/search?q=%E8%BD%AE%E6%92%AD)搜索
- swiper在App的vue中、百度支付宝头条QQ小程序中，不支持内嵌video、map等原生组件。在微信基础库2.4.4起和App nvue2.1.5起支持内嵌原生组件。竖向的swiper内嵌视频可实现抖音、映客等视频垂直拖动切换效果。
 
#### swiper-item
仅可放置在 ``<swiper>`` 组件中，宽高自动设置为100%。

|属性名|类型|默认值|说明|
|:-|:-|:-|:-|:-|
|item-id|String||该 swiper-item 的标识符|

**示例**
```html
<template>
	<view>
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item>
							<view class="swiper-item uni-bg-red">A</view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-item uni-bg-green">B</view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-item uni-bg-blue">C</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<view class="swiper-list">
			<view class="uni-list-cell uni-list-cell-pd">
				<view class="uni-list-cell-db">指示点</view>
				<switch :checked="indicatorDots" @change="changeIndicatorDots" />
			</view>
			<view class="uni-list-cell uni-list-cell-pd">
				<view class="uni-list-cell-db">自动播放</view>
				<switch :checked="autoplay" @change="changeAutoplay" />
			</view>
		</view>
		<view class="uni-padding-wrap">
			<view class="uni-common-mt">
				<text>幻灯片切换时长(ms)</text>
				<text class="info">{{duration}}</text>
			</view>
			<slider @change="durationChange" :value="duration" min="500" max="2000" />
			<view class="uni-common-mt">
				<text>自动播放间隔时长(ms)</text>
				<text class="info">{{interval}}</text>
			</view>
			<slider @change="intervalChange" :value="interval" min="2000" max="10000" />
		</view>
	</view>
</template>
```
```javascript
export default {
    data() {
        return {
            background: ['color1', 'color2', 'color3'],
            indicatorDots: true,
            autoplay: true,
            interval: 2000,
            duration: 500
        }
    },
    methods: {
        changeIndicatorDots(e) {
            this.indicatorDots = !this.indicatorDots
        },
        changeAutoplay(e) {
            this.autoplay = !this.autoplay
        },
        intervalChange(e) {
            this.interval = e.target.value
        },
        durationChange(e) {
            this.duration = e.target.value
        }
    }
}
```
 ![uni](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/img/swiper.png)
