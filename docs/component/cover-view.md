#### cover-view
覆盖在原生组件上的文本视图。

app-vue和小程序框架，渲染引擎是webview的。但为了优化体验，部分组件如map、video、textarea、canvas通过原生控件实现，原生组件层级高于前端组件（类似flash层级高于div）。为了能正常覆盖原生组件，设计了cover-view。


**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|快应用|360小程序|快手小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|x|√|√|x|√|

* app-nvue所有组件均为原生渲染，不存在前端组件无法覆盖原生组件的问题。但为了保持多端兼容，nvue里也实现了`cover-view`，作用于普通`view`一样。
* 微信小程序部分原生组件实现了同层渲染，在指定的基础库版本上，某些原生组件可无需使用`cover-view`覆盖，[详见](https://developers.weixin.qq.com/miniprogram/dev/component/native-component.html)
* 字节跳动小程序不需要`cover-view`，因其原生组件均实现了同层渲染。
* 360小程序不存在原生组件，无此概念

支持的事件：`click`

|属性名|类型|默认值|说明|平台差异说明|
|:-|:-|:-|:-|:-|
|scroll-top|number/string||设置顶部滚动偏移量，仅在设置了 overflow-y: scroll 成为滚动元素后生效|微信小程序2.1.0|


#### cover-image
覆盖在原生组件上的图片视图。可覆盖的原生组件同`cover-view`，支持嵌套在`cover-view`里。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|快应用|360小程序|快手小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|x|√|√|x|√|

**属性说明**

|属性名|类型|默认值|说明|平台差异说明|
|:-|:-|:-|:-|:-|
|src|String||图标路径。支持本地路径、网络路径。不支持 base64 格式。||
|@load|eventhandle||图片加载成功时触发|微信小程序 2.1.0|
|@error|eventhandle||图片加载失败时触发|微信小程序 2.1.0|


app-vue上可覆盖的原生组件：`<video>`、`<map>`

支持的事件：`click`

**不支持的 CSS**

- position: fixed
- opacity
- overflow
- padding
- linebreak
- white-space

注意：nvue的cover-view不在上述限制中，它仅支持且全部支持nvue的所有css。

**Tips**

- App端vue页面 `cover-view`、`cover-image` 中不支持嵌套其它组件，包括再次嵌套`cover-view`，仅可覆盖`video`、`map`。App端nvue页面自2.1.5起没有这些限制。
- App端 `cover-image` 使用本地图像的话，打包前需要设置资源为释放模式，在manifest文件内app-plus新增runmode节点，设置值为liberate。
- App端还可以使用plus.nativeObj.view绘制原生内容，参考:[uni-app中使用5+界面控件](https://ask.dcloud.net.cn/article/35036)、[plus.nativeObj.view规范](https://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.View)
- App端还提供了更灵活和强大的`subNvue`，参考[原生子窗体subNvue](/api/window/subNVues)
- 在 video 组件中使用时，若想在全屏模式下使用`cover-view`，只有在微信小程序、App端的nvue页面可实现。
- 在App端，如果重度使用video和map，推荐使用nvue页面。
- 百度小程序iOS端暂不支持一个页面有多个video时嵌套cover-view。
- 支付宝小程序中 `cover-view` 不支持嵌套。

**微信小程序的cover-view使用注意：**
- cover-view和cover-image的aria-role仅可设置为button，读屏模式下才可以点击，并朗读出“按钮”；为空时可以聚焦，但不可点击
- 基础库 2.2.4 起支持 touch 相关事件，也可使用 hover-class 设置点击态
- 基础库 2.1.0 起支持设置 scale rotate 的 css 样式，包括 transition 动画
- 基础库 1.9.90 起 cover-view 支持 overflow: scroll，但不支持动态更新 overflow
- 基础库 1.9.90 起最外层 cover-view 支持 position: fixed
- 基础库 1.9.0 起支持插在 view 等标签下。在此之前只可嵌套在原生组件map、video、canvas、camera内，避免嵌套在其他组件内。
- 基础库 1.6.0 起支持css transition动画，transition-property只支持transform (translateX, translateY)与opacity。
- 基础库 1.6.0 起支持css opacity。
- 事件模型遵循冒泡模型，但不会冒泡到原生组件。
- 文本建议都套上cover-view标签，避免排版错误。
- 只支持基本的定位、布局、文本样式。不支持设置单边的border、background-image、shadow、overflow: visible等。
- 建议子节点不要溢出父节点
- 支持使用 z-index 控制层级
- 默认设置的样式有：white-space: nowrap; line-height: 1.2; display: block;
- 自定义组件嵌套 cover-view 时，自定义组件的 slot 及其父节点暂不支持通过 wx:if 控制显隐，否则会导致 cover-view 不显示

**示例** [查看演示](https://hellouniapp.dcloud.net.cn/pages/component/cover-view/cover-view)

以下示例代码，来自于[hello uni-app项目](https://github.com/dcloudio/hello-uniapp)，推荐使用HBuilderX，新建uni-app项目，选择hello uni-app模板，可直接体验完整示例。
```html
<!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中查看 -->
<template>
	<view class="page">
		<video class="video" id="demoVideo" :controls="false" :enable-progress-gesture="false" :show-center-play-btn="true" src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126-lite.m4v">
			<cover-view class="controls-title">简单的自定义 controls</cover-view>
			<cover-image class="controls-play img" @click="play" src="/static/play.png"></cover-image>
			<cover-image class="controls-pause img" @click="pause" src="/static/pause.png"></cover-image>
		</video>
	</view>
</template>
<script>
	export default {
		data() {
			return {}
		},
		mounted() {
			this.videoCtx = uni.createVideoContext('demoVideo')
		},
		methods: {
			play(event) {
				this.videoCtx.play();
				uni.showToast({
					title: '开始播放',
					icon: 'none'
				});
			},
			pause(event) {
				this.videoCtx.pause();
				uni.showToast({
					title: '暂停播放',
					icon: 'none'
				});
			}
		}
	}
</script>
<style>
	.page {
		display: flex;
		justify-content: center;
	}

	.video {
		position: relative;
	}

	cover-view,
	cover-image {
		display: inline-block;
	}

	.img {
		position: absolute;
		width: 100rpx;
		height: 100rpx;
		top: 50%;
		margin-top: -50rpx;
	}

	.controls-play {
		left: 50rpx;
	}

	.controls-pause {
		right: 50rpx;
	}

	.controls-title {
		width: 100%;
		text-align: center;
		color: #FFFFFF;
	}
</style>
```
