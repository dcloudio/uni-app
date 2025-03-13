##注意事项
1. 图片预览插件仅支持导入到uni-app x项目中。

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