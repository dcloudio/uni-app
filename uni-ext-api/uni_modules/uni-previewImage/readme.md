## uni-previewImage
实现图片预览功能。  
[API规范文档](https://doc.dcloud.net.cn/uni-app-x/api/preview-image.html)  


## 插件配置

图片预览依赖模块uni-media、uni-network、uni-fileSystemManager。使用原生SDK时，需要将这些模块对应的配置添加到原生项目的依赖中，[如何配置请参考文档](https://doc.dcloud.net.cn/uni-app-x/native/modules/android/others.html)。

## API说明

### previewImage 图片预览

```
previewImage(options: PreviewImageOptions)
```

### PreviewImageOptions 参数说明

```
type PreviewImageOptions = {
	/**
	 * current 为当前显示图片的链接/索引值，不填或填写的值无效则为 urls 的第一张。
	 */
	current ?: any | null,
	/**
	 * 需要预览的图片链接列表
	 */
	urls : Array<string.ImageURIString>,
	/**
	 * 图片指示器样式
	 */
	indicator ?:
	/**
	 * 底部圆点指示器
	 */
	'default' |
	/**
	 * 顶部数字指示器
	 */
	'number' |
	/**
	 * 不显示指示器
	 */
	'none' |
	null,
	/**
	 * 是否可循环预览
	 */
	loop ?: boolean | null,
	/**
	 * 长按图片显示操作菜单，如不填默认为保存相册。
	 */
	longPressActions ?: LongPressActionsOptions | null,
	/**
	 * 接口调用成功的回调函数
	 */
	success ?: (PreviewImageSuccessCallback) | null,
	/**
	 * 接口调用失败的回调函数
	 */
	fail ?: (PreviewImageFailCallback) | null,
	/**
	 * 接口调用结束的回调函数（调用成功、失败都会执行）
	 */
	complete ?: (PreviewImageCompleteCallback) | null
};
```

### LongPressActionsOptions 参数说明

```
type LongPressActionsOptions = {
	/**
	 * 按钮的文字数组
	 */
	itemList : string[],
	/**
	 * 按钮的文字颜色，字符串格式，默认为"#000000"
	 */
	itemColor : string | null,
	/**
	 * 接口调用成功的回调函数
	 */
	success : ((result : LongPressActionsSuccessResult) => void) | null,
	/**
	 * 接口调用失败的回调函数
	 */
	fail : ((result : LongPressActionsFailResult) => void) | null,
	/**
	 * 接口调用结束的回调函数（调用成功、失败都会执行）
	 */
	complete : ((result : any) => void) | null
};
```

## 示例
```vue
<template>
	<!-- #ifdef APP -->
	<scroll-view style="flex: 1">
	<!-- #endif -->
		<view style="padding-left: 8px; padding-right: 8px">
			<view>
				<text class="text-desc">图片指示器样式</text>
				<radio-group class="cell-ct" style="background-color: white" @change="onIndicatorChanged">
					<view class="indicator-it" v-for="(item, index) in indicator" :key="item.value">
						<radio :disabled="isWeb" :checked="index == 0" :value="item.value">{{item.name}}</radio>
					</view>
				</radio-group>
			</view>
			<view>
				<checkbox-group @change="onCheckboxChange" style="margin-top: 16px; margin-bottom: 16px; margin-left: 8px">
					<checkbox :disabled="isWeb" :checked="isLoop" style="margin-right: 15px">循环播放</checkbox>
				</checkbox-group>
			</view>
			<view style="background-color: white">
				<text class="text-desc">点击图片开始预览</text>
				<view class="cell-ct" style="margin: 8px;">
					<view class="cell cell-choose-image" v-for="(image, index) in imageList" :key="index">
						<image style="width: 100px; height: 100px" mode="aspectFit" :src="image" @click="pImage(index)">
						</image>
					</view>
					<image class="cell cell-choose-image" src="/static/plus.png" @click="chooseImage">
						<view></view>
					</image>
				</view>
			</view>
		</view>
	<!-- #ifdef APP -->
	</scroll-view>
	<!-- #endif -->
</template>

<script>
	type Indicator = "number" | "default" | "none"
	type ItemType = {
		value : Indicator,
		name : string
	}
	import { previewImage } from '@/uni_modules/uni-previewImage';
	export default {
		data() {
			return {
				imageList: ["/static/logo.png",
					"https://wx2.sinaimg.cn/mw690/00839aAegy1htk3px3c2pj30u00zlwrg.jpg",
					"https://pic.rmb.bdstatic.com/bjh/news/a006b0c2e8f43f3d062f7371f99878ac.jpeg",
					"https://q3.itc.cn/q_70/images03/20241015/67ad77dab850427ba6668726c24b2407.png"],
				indicator: [{
					value: "default",
					name: "圆点"
				}, {
					value: "number",
					name: "数字"
				}, {
					value: "none",
					name: "不显示"
				}] as ItemType[],
				currentIndicator: "default" as Indicator,
				// #ifdef WEB
				isWeb: false,
				// #endif
				// #ifndef WEB
				isWeb: false,
				// #endif
				isLoop: true
			}
		},
		methods: {
			pImage(index : number) {
				previewImage({
					urls: this.imageList,
					current: index,
					indicator: this.currentIndicator,
					loop: this.isLoop,
					longPressActions: {
						itemList: ["1", "2", "3", "4"],
						itemColor: "#cc00cc",
						complete(e){
							console.log(e)
						}
					} as LongPressActionsOptions,
					complete(e){
						console.log(e)
					}
				})
			},
			chooseImage() {
				uni.chooseImage({
					sourceType: ['album'],
					success: (e) => {
						this.imageList = this.imageList.concat(e.tempFilePaths)
					},
					fail(_) {
					}
				})
			},
			onIndicatorChanged(e : UniRadioGroupChangeEvent) {
				this.currentIndicator = e.detail.value as Indicator
			},
			onCheckboxChange(_ : UniCheckboxGroupChangeEvent) {
				this.isLoop = !this.isLoop
			}
		}
	}
</script>

<style>
	.text-desc {
		margin-top: 16px;
		margin-left: 8px;
		margin-bottom: 16px;
		font-weight: bold;
	}

	.cell-ct {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
	}

	.cell {
		margin-left: 3px;
		margin-right: 3px;
		width: 100px;
		height: 100px;
	}

	.cell-choose-image {
		border-width: 1px;
		border-style: solid;
		border-color: lightgray;
	}

	.indicator-it {
		margin: 8px;
	}
</style>
```

## uts 语言介绍  
uts，全称 uni type script，是一门跨平台的、高性能的、强类型的现代编程语言。

它可以被编译为不同平台的编程语言，如：

Android平台：编译为Kotlin  
iOS平台：编译Swift  
鸿蒙OS平台：编译为ArkTS  
web平台/小程序：编译为JavaScript  

uts 采用了与 ts 基本一致的语法规范，支持绝大部分 ES6 API。

但为了跨端，uts进行了一些约束和特定平台的增补。

过去在js引擎下运行支持的语法，大部分在uts的处理下也可以平滑的在kotlin和swift中使用。但有一些无法抹平，需要使用条件编译。

和uni-app的条件编译类似，uts也支持条件编译。写在条件编译里的，可以调用平台特有的扩展语法。


## uts 插件介绍
UTS 插件是一种特定的 uni_modules 插件，其核心目的是允许 uni-app/uni-app x 开发者使用 UTS 语法来调用扩展 API（封装原生系统的API或三方SDK）。  

UTS 插件的实现代码主要位于 utssdk 目录下，并按平台进行分离和组织：  
| 目录/文件 | 目标平台 | 实现语言 | 作用描述 |
| -- | -- | -- | -- |
|utssdk/app-android|Android|UTS, Kotlin, Java|存放 UTS 插件在 Android 平台上的具体实现源码|
|utssdk/app-ios|iOS|UTS, Swift|存放 UTS 插件在 iOS 平台上的具体实现源码|
|utssdk/app-harmony|HarmonyOS (鸿蒙)|UTS, ArkTS|存放 UTS 插件在 HarmonyOS 平台上的具体实现源码|
|utssdk/*.uts|多平台共用|UTS|存放使用 UTS 语言编写的、可供 所有平台 共用的实现源码|


## 参考文档  
- [uts 语言介绍](https://doc.dcloud.net.cn/uni-app-x/uts/)
- [uts 和 ts 的差异](https://doc.dcloud.net.cn/uni-app-x/uts/uts_diff_ts.html)
- [uts 插件开发文档](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-plugin.html)
- [uts 插件原生语言混编开发文档](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-plugin-hybrid.html)
- [uts 插件 Android 平台开发注意事项](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-for-android.html)
- [uts 插件 iOS 平台开发注意事项](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-for-ios.html)
- [uts 插件 HarmonyOS 平台开发注意事项](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-for-ios.html)
