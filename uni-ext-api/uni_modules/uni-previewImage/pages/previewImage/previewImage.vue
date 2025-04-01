<template>
	<swiper style="flex: 1;background-color: black;" :indicator-dots="false" :circular="loop" :current="current"
		@change="onPreviewImageChanged" :disable-touch="disableTouch">
		<swiper-item v-if="urls != null" v-for="(item,index) in urls">
			<uniPreviewImageItem :index="index" :src="item" :longPressAction="longPressAction" :tips="tips">
			</uniPreviewImageItem>
		</swiper-item>
	</swiper>
	<view ref="numberIndicator" v-if="indicator == 'number'" class="uni-preview-image-number-indicator-layout">
		<text class="uni-preview-image-number-indicator">{{numberIndicator}}</text>
	</view>
	<view ref="defaultIndicator" class="uni-preview-image-default-indicator-layout" v-if="indicator == 'default'"
		v-show="urls!=null">
		<view v-for="i in urls!.length" class="uni-preview-image-default-indicator" :class="((current+1) == i) ?'uni-preview-image-default-indicator-active' : 'uni-preview-image-default-indicator-default'">
		</view>
	</view>
</template>

<script>
	import uniPreviewImageItem from "../../components/uni-previewImageItem/uni-previewImageItem.vue"
	export default {
		components: {
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
				longPressAction: null as LongPressActionsOptions | null,
				tips: null as UTSJSONObject | null
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
				if (result["tips"] != null) {
					this.tips = result["tips"] as UTSJSONObject | null
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
	.uni-preview-image-default-indicator {
		width: 9px;
		height: 9px;
		border-style: solid;
		border-radius: 9px;
		margin: 2px 3px;
		border-width: .1px;
		border-color: #AAAAAA;
	}
	
	.uni-preview-image-default-indicator-default {
		background-color: #AAAAAA;
	}
	
	.uni-preview-image-default-indicator-active {
		background-color: #ffffff;
	}

	.uni-preview-image-default-indicator-layout {
		flex-direction: row;
		position: absolute;
		bottom: 0px;
		left: 0px;
		right: 0px;
		justify-content: center;
	}

	.uni-preview-image-number-indicator-layout {
		position: absolute;
		left: 0;
		right: 0;
	}

	.uni-preview-image-number-indicator {
		color: white;
		font-size: 16px;
		margin: auto;
		padding: 8px 20px;
		background-color: rgba(0, 0, 0, .3);
		line-height: 1;
		border-style: solid;
		border-width: 0px;
		border-radius: 32px;
	}
</style>