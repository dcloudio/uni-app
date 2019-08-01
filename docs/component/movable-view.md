#### movable-area

`movable-view` 的可移动区域

**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|x|

**属性说明**

|属性名|类型|默认值|说明|
|:-|:-|:-|:-|
|scale-area|Boolean|false|当里面的 movable-view 设置为支持双指缩放时，设置此值可将缩放手势生效区域修改为整个 movable-area|

**注意：movable-area 必须设置 width 和 height 属性，不设置默认为 10px**

#### movable-view

可移动的视图容器，在页面中可以拖拽滑动

**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|x|

**属性说明**

|属性名|类型|默认值|说明|平台差异说明|
|:-|:-|:-|:-|:-|
|direction|String|none|movable-view的移动方向，属性值有all、vertical、horizontal、none||
|inertia|Boolean|false|movable-view是否带有惯性|微信小程序、5+App、H5、百度小程序|
|out-of-bounds|Boolean|false|超过可移动区域后，movable-view是否还可以移动|微信小程序、5+App、H5、百度小程序|
|x|Number / String||定义x轴方向的偏移，如果x的值不在可移动范围内，会自动移动到可移动范围；改变x的值会触发动画||
|y|Number / String||定义y轴方向的偏移，如果y的值不在可移动范围内，会自动移动到可移动范围；改变y的值会触发动画||
|damping|Number|20|阻尼系数，用于控制x或y改变时的动画和过界回弹的动画，值越大移动越快|微信小程序、5+App、H5、百度小程序|
|friction|Number|2|摩擦系数，用于控制惯性滑动的动画，值越大摩擦力越大，滑动越快停止；必须大于0，否则会被设置成默认值|微信小程序、5+App、H5、百度小程序|
|disabled|Boolean|false|是否禁用||
|scale|Boolean|false|是否支持双指缩放，默认缩放手势生效区域是在movable-view内|微信小程序、5+App、H5|
|scale-min|Number|0.5|定义缩放倍数最小值|微信小程序、5+App、H5|
|scale-max|Number|10|定义缩放倍数最大值|微信小程序、5+App、H5|
|scale-value|Number|1|定义缩放倍数，取值范围为 0.5 - 10|微信小程序、5+App、H5|
|animation|Boolean|true|是否使用动画|微信小程序、5+App、H5、百度小程序|
|@change|EventHandle||拖动过程中触发的事件，event.detail = {x: x, y: y, source: source}，其中source表示产生移动的原因，值可为touch（拖动）、touch-out-of-bounds（超出移动范围）、out-of-bounds（超出移动范围后的回弹）、friction（惯性）和空字符串（setData）||
|@scale|EventHandle||缩放过程中触发的事件，event.detail = {x: x, y: y, scale: scale}，|微信小程序、5+App、H5、百度小程序|

除了基本事件外，movable-view提供了两个特殊事件

|类型|触发条件|
|:-|:-|
|htouchmove|初次手指触摸后移动为横向的移动，如果catch此事件，则意味着touchmove事件也被catch|
|vtouchmove|初次手指触摸后移动为纵向的移动，如果catch此事件，则意味着touchmove事件也被catch|

> movable-view 必须设置width和height属性，不设置默认为10px
> 
> movable-view 默认为绝对定位，top和left属性为0px
> 
> 当movable-view小于movable-area时，movable-view的移动范围是在movable-area内；当movable-view大于movable-area时，movable-view的移动范围必须包含movable-area（x轴方向和y轴方向分开考虑）

**Tips**
- movable-view必须在`<movable-area/>`组件中，并且必须是直接子节点，否则不能移动。
- 如果遇到x、y、scale属性设置不生效的问题参考：[组件属性设置不生效解决办法](/use?id=%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98)
- swiper在非H5端，不支持内嵌video、map等原生组件。更新：微信基础库2.4.4起支持了原生组件在 scroll-view、swiper、movable-view 中的使用

**示例**
```html
<template>
	<view class="page-body">
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-title uni-common-mt">
				示例 1
				<text>\nmovable-view 区域小于 movable-area</text>
			</view>
			<movable-area>
				<movable-view :x="x" :y="y" direction="all" @change="onChange">text</movable-view>
			</movable-area>
			<view @tap="tap" class="uni-link uni-center uni-common-mt">
				点击这里移动至 (30px, 30px)
			</view>
			<view class="uni-title uni-common-mt">
				示例 2
				<text>\nmovable-view区域大于movable-area</text>
			</view>
			<movable-area>
				<movable-view class="max" direction="all">text</movable-view>
			</movable-area>
		</view>
	</view>
</template>
```

```js
export default {
    data() {
        return {
            x: 0,
            y: 0,
            old: {
                x: 0,
                y: 0
            }
        }
    },
    methods: {
        tap: function(e) {
            this.x = this.old.x
            this.y = this.old.y
            this.$nextTick(function() {
                this.x = 30
                this.y = 30
            })
        },
        onChange: function(e) {
            this.old.x = e.detail.x
            this.old.y = e.detail.y
        }
    }
}
```

 ![uni](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/img/moveable-view.png)