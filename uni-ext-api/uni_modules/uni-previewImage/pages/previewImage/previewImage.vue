<template>
	<swiper style="flex: 1;background-color: black;" :indicator-dots="false" :circular="loop" :current="current" @change="onPreviewImageChanged" :disable-touch="disableTouch">
		<swiper-item v-if="urls != null" v-for="(item,index) in urls">
			<uniPreviewImageItem :index="index" :src="item" :longPressAction="longPressAction"></uniPreviewImageItem>
		</swiper-item>
	</swiper>
	<view ref="numberIndicator" v-if="indicator == 'number'" class="number-indicator">
		<text class="number-indicator-text">{{numberIndicator}}</text>
	</view>
	<view ref="defaultIndicator" class="default-indicator" v-if="indicator == 'default'" v-show="urls!=null">
		<view v-for="i in urls!.length" class="indicator-style" :style="{backgroundColor:((current+1) == i) ? '#ffffff':'#AAAAAA'}">
		</view>
	</view>
</template>

<script>
	// #ifdef WEB
	import { LongPressActionsOptions } from '@/uni_modules/uni-previewImage';
	// #endif
	import uniPreviewImageItem from "../../components/uni-previewImageItem/uni-previewImageItem.vue"
	export default {
		components:{
			uniPreviewImageItem
		},
		data() {
			return {
				urls: null as Array<string> | null,
				current: 0,
				loop: false,
				// #ifdef APP-IOS
				disableTouch: false,
				// #endif
				// #ifndef APP-IOS
				disableTouch: false,
				// #endif
				numberIndicator: "",
				indicator: "number",
				longPressAction: null as LongPressActionsOptions | null
			}
		},
		onLoad() {
			// 传参
			uni.$once("__onPreviewLoadCallback", this.__onPreviewLoadCallback)
			uni.$emit("__onPreviewLoad", null)
			uni.$on("__UNIPREVIEWIMAGE", this.setDisableTouch)
			uni.$on("__UNIPREVIEWIMAGECLOSE", this.closePreviewPage)
			uni.$on("__CLOSEPREVIEWIMAGE", () => {
				this.closePreviewPage()
			})
		},
		onReady() {
			var windowInfo = uni.getWindowInfo();
			(this.$refs["numberIndicator"] as UniElement | null)?.style.setProperty("top", (windowInfo.statusBarHeight + 8) + "px");
			(this.$refs["defaultIndicator"] as UniElement | null)?.style.setProperty("bottom", ((windowInfo.screenHeight - windowInfo.safeArea.bottom) + 8) + "px")
		},
		onUnload() {
			uni.$off("__UNIPREVIEWIMAGE")
			uni.$off("__UNIPREVIEWIMAGECLOSE")
			uni.$off("__UNIPREVIEWLONGPRESS")
			uni.$off("__CLOSEPREVIEWIMAGE")
		},
		onBackPress(options : OnBackPressOptions) : boolean | null {
			// #ifdef APP-ANDROID
			// 解决安卓点击返回键没有动画的问题
			this.closePreviewPage()
			return true
			// #endif
			// #ifndef APP-ANDROID
			return false
			// #endif
		},
		methods: {
			__onPreviewLoadCallback(result : UTSJSONObject) {
				this.urls = result["urls"] as Array<string> | null
				if (result["current"] != null) {
					var c = result["current"]
					if ((typeof c == "number")) {
						var d : number = c as number
						if (d < 0 || d > this.urls!.length)
							d = 0
						this.current = d
					} else if (typeof c == 'string') {
						var index = this.urls!.indexOf(c as string)
						if (index < 0) {
							index = 0
						}
						this.current = index
					}
				}
				if (result["indicator"] != null) {
					this.indicator = result["indicator"] as string
				}
				if (result["longPressActions"] != null) {
					this.longPressAction = {
						itemList: (result["longPressActions"] as UTSJSONObject)["itemList"] as string[],
						itemColor: (result["longPressActions"] as UTSJSONObject)["itemColor"] as string | null,
					} as LongPressActionsOptions
				}
				if (result["loop"] != null) {
					this.loop = result["loop"]! as boolean
				}
				this.numberIndicator = (this.current + 1) + " / " + this.urls!.length
			},
			onPreviewImageChanged(e : UniSwiperChangeEvent) {
				this.numberIndicator = (e.detail.current + 1) + " / " + this.urls?.length
				this.current = e.detail.current
			},
			setDisableTouch(isDisable : any) {
				// this.disableTouch = isDisable as boolean
			},
			closePreviewPage() {
				uni.closeDialogPage({
					dialogPage: this.$page,
					animationType: "fade-out"
				})
			}
		}
	}
</script>
<style>
	.indicator-style {
		width: 9px;
		height: 9px;
		border-style: solid;
		border-radius: 9px;
		margin: 2px 3px;
		border-width: .1px;
		border-color: #AAAAAA;
	}

	.default-indicator {
		flex-direction: row;
		position: absolute;
		bottom: 0px;
		left: 0px;
		right: 0px;
		justify-content: center;
	}

	.number-indicator {
		position: absolute;
		color: white;
		font-size: 16px;
		text-align: center;
		left: 0;
		right: 0;
	}

	.number-indicator-text {
		color: white;
		font-size: 16px;
		margin: auto;
		padding: 8px 20px;
		background-color: rgba(0, 0, 0, .1);
		line-height: 1;
		border-style: solid;
		border-width: 0px;
		border-radius: 32px;
	}
</style>