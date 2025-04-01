<template>
	<view style="flex:1;" class="uni-preview-image-item-background">
		<image ref="imageView" :mode="imageMode" class="uni-preview-image-item" :src="srcPath"
			@error="previewImageError" @load="onImageLoad"></image>
		<view ref="mask" class="uni-preview-image-patch" @touchstart="onstart" @touchmove="onmove" @touchend="onend"
			@touchcancel="oncancel"></view>
		<view class="uni-preview-image-loading" v-if="!loadingFinished">
			<loadingCircle style="margin: auto;" :speed="16" :size="54" color="#d3d3d3"></loadingCircle>
		</view>
		<view style="align-items: center;justify-content: center;position: absolute;top: 0;bottom: 0;left: 0;right: 0;"
			v-if="loadError" @click="closePreviewImage">
			<text
				class="uni-preview-image-tips-error">{{(tips == null || (tips as UTSJSONObject|null)?.["error"] == null)? getLanguageString("error") : ((tips as UTSJSONObject|null)?.["error"] as string)}}</text>
			<text class="uni-preview-image-tips-retry"
				@click="reloadImage">{{(tips == null || (tips as UTSJSONObject|null)?.["retry"] == null)? getLanguageString("retry") : ((tips as UTSJSONObject|null)?.["retry"] as string)}}</text>
		</view>
	</view>
</template>

<script>
	const DEFAULT_DISTANCE = 4
	const FAST_SLIDE_LENGTH = 10
	const LANGUAGE = {
		"en": {
			error: "Image loading failed",
			retry: "Retry"
		},
		"zh-Hans": {
			error: "图片加载失败",
			retry: "重试"
		},
		"zh-Hant": {
			error: "圖片加載失敗",
			retry: "重試"
		}
	}
	import {
		Friction
	} from './Friction'
	// #ifdef APP-ANDROID
	import View from "android.view.View"
	// #endif
	// #ifdef APP-IOS
	import { LongPressActionsOptions, LongPressActionsSuccessResult, LongPressActionsFailResult } from '@/uni_modules/uni-previewImage';
	// #endif

	// #ifdef APP-ANDROID
	import { LongPressActionsFailResult } from '@/uni_modules/uni-previewImage';
	// #endif
	import loadingCircle from "../loading-circle/loading-circle.vue"
	type Point = {
		x : number,
		y : number
	}
	export default {
		components: {
			loadingCircle
		},
		data() {
			return {
				imageMode: "aspectFit",
				lastTouchEndTime: 0,
				srcPath: "",
				imageView: null as UniElement | null,
				screenWidth: 0,
				screenHeight: 0,
				/* 放大系数 */
				scaleSize: 1,
				/* 上次触摸事件 */
				lastSlideTouch: null as Array<UniTouch> | null,
				/* 图片竖向滑动的距离 */
				imageTop: 0,
				/* 图片横向滑动的距离 */
				imageMarginTop: 0,
				imageLeft: 0,
				/* 是否需要动画 */
				withAnimation: false,
				imageHeight: 0,
				historyX: [0, 0],
				historyY: [0, 0],
				historyT: [0, 0],
				_friction: new Friction(1, 2),
				requestId: -1,
				needExecLongPress: false,
				// #ifdef APP
				androidView: null as View | null,
				// #endif
				downPoint: null as Point | null,
				longPressActionTimeoutId: -1,
				inScaleMode: false,
				inDoubleTapMode: false,
				startTimestamp: 0,
				clickTimeoutId: -1,
				transformOrigin: [0, 0],
				loadingFinished: false,
				devicePixelRatio: 0,
				loadError: false,
				language: "zh-Hans"
			}
		},
		props: {
			"src": {
				type: String,
				default: ""
			},
			"index": {
				type: Number,
				default: -1
			},
			"longPressAction": {
				type: Object as PropType<LongPressActionsOptions | null>
			},
			"tips": {
				type: Object as PropType<UTSJSONObject | null>
			}
		},
		watch: {
			"src": {
				handler(newValue : string, oldValue : string) {
					if (newValue != "")
						this.getSrcLocalPath(newValue)
				},
				immediate: true
			}
		},
		mounted() {
			this.imageView = this.$refs["imageView"] as UniElement | null
			// #ifdef APP-ANDROID
			this.androidView = (this.$refs["mask"] as UniElement | null)?.getAndroidView() as View | null
			// #endif
			var dpr = uni.getDeviceInfo({ filter: ["devicePixelRatio"] }).devicePixelRatio
			if (dpr == null) {
				this.devicePixelRatio = 1
			} else {
				this.devicePixelRatio = dpr
			}
			const systemInfo = uni.getSystemInfoSync()
			this.language = systemInfo.appLanguage
			// #ifdef WEB
			this.language = uni.getLocale()
			// #endif
		},
		methods: {
			getLanguageString(name:string):string{
				var object = LANGUAGE[this.language];
				if(object != null) {
					return (object as UTSJSONObject)[name] as string
				} else {
					return (LANGUAGE["en"] as UTSJSONObject)[name] as string;
				}
			},
			previewImageError(e : UniImageErrorEvent) {
				(this.$refs["mask"] as UniElement | null)?.style.setProperty("point-events", "none")
				this.loadingFinished = true
				this.loadError = true
			},
			isNetPath(url : string) {
				if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("rtmp://") || url.startsWith("rtsp://")) {
					return true;
				}
				return false;
			},
			getSrcLocalPath(url : string) {
				this.srcPath = url
			},
			onstart(e : UniTouchEvent) {
				// #ifdef APP-ANDROID
				if (this.androidView == null)
					this.androidView = (this.$refs["mask"] as UniElement | null)?.getAndroidView() as View | null
				// #endif
				this.inScaleMode = false
				this.withAnimation = false
				cancelAnimationFrame(this.requestId)
				clearTimeout(this.clickTimeoutId)
				this.lastSlideTouch = e.touches
				this.historyX = [0, 0]
				this.historyY = [0, 0]
				this.historyT = [0, 0]
				this.downPoint = { x: e.touches[0].clientX, y: e.touches[0].clientY }
				this.inDoubleTapMode = false
				this.startTimestamp = e.timeStamp
				// #ifndef APP-IOS
				e.preventDefault()
				// #endif
				this.needExecLongPress = true
				this.longPressActionTimeoutId = setTimeout(() => {
					if (this.needExecLongPress) {
						this.onLongPressAction()
					}
				}, 350)
			},
			onmove(e : UniTouchEvent) {
				if (e.touches.length == 1) {
					var currentSlideTouch = e.touches[0]
					if (this.lastSlideTouch != null) {
						var slideX = (currentSlideTouch.clientX - this.lastSlideTouch![0].clientX)
						var slideY = (currentSlideTouch.clientY - this.lastSlideTouch![0].clientY)
						var downX = Math.abs(currentSlideTouch.clientX - this.downPoint!.x)
						var downY = Math.abs(currentSlideTouch.clientY - this.downPoint!.y)
						if (downX > DEFAULT_DISTANCE || downY > DEFAULT_DISTANCE) {
							if (this.scaleSize > 1 || this.imageHeight > this.screenHeight) {
								this.imageLeft = this.imageLeft + slideX
								this.imageTop = this.imageTop + slideY;
								this.updateStyle(e, currentSlideTouch.clientX, currentSlideTouch.clientY)
							} else {
								this.needExecLongPress = true
								this.onInterceptTouchEvent(e)
							}
							this.historyX.shift()
							this.historyX.push(this.imageLeft)
							this.historyY.shift()
							this.historyY.push(this.imageTop)
							this.historyT.shift()
							this.historyT.push(e.timeStamp)
							this.lastSlideTouch = e.touches
							this.needExecLongPress = false
						} else {
							this.needExecLongPress = true
						}
					} else {
						this.lastSlideTouch = e.touches
					}
				} else if (e.touches.length >= 2) {
					this.inScaleMode = true
					var currentFirstTouch = e.touches[0]
					var currentSecondTouch = e.touches[1]
					var currentXSlideLength = currentFirstTouch.clientX - currentSecondTouch.clientX
					var currentYSlideLength = currentFirstTouch.clientY - currentSecondTouch.clientY
					var currentLongSideLength = Math.sqrt(currentXSlideLength * currentXSlideLength + currentYSlideLength * currentYSlideLength)
					if (this.lastSlideTouch != null && this.lastSlideTouch!.length >= 2) {
						var lastFirstTouch = this.lastSlideTouch![0]
						var lastSecondTouch = this.lastSlideTouch![1]
						var lastXSlideLength = lastFirstTouch.clientX - lastSecondTouch.clientX
						var lastYSlideLength = lastFirstTouch.clientY - lastSecondTouch.clientY
						var lastLongSideLength = Math.sqrt(lastXSlideLength * lastXSlideLength + lastYSlideLength * lastYSlideLength)
						if (currentLongSideLength != lastLongSideLength) {
							this.scaleSize = this.scaleSize * (currentLongSideLength / lastLongSideLength)
							this.updateStyle(e, NaN, NaN)
						}
					}
					// 双指状态下应该停掉所有的父的事件
					this.preventDefaultScall(e)
					this.needExecLongPress = false
					this.lastSlideTouch = e.touches
				}
			},
			onend(e : UniTouchEvent) {
				// 清空长按事件，避免连续点击时，仍然会触发长按事件
				// this.inScaleMode = false
				this.needExecLongPress = false
				clearTimeout(this.longPressActionTimeoutId)
				var current = Date.now()
				if (this.historyY[0] == 0 && this.historyY[1] == 0 && this.historyX[0] == 0 && this.historyX[1] == 0) {
					// 未触发move，认为不需要走惯性
					this.withAnimation = true
					if (current - this.lastTouchEndTime < 350) {
						// 区别快划和双击
						// 目前测试快划和双击的距离不一样，建议判断距离大于10的，都按照快划处理
						if (this.lastSlideTouch != null && this.lastSlideTouch!.length > 0) {
							var downX = Math.abs(this.lastSlideTouch![0].clientX - this.downPoint!.x)
							var downY = Math.abs(this.lastSlideTouch![0].clientY - this.downPoint!.y)
							if (downX > FAST_SLIDE_LENGTH || downY > FAST_SLIDE_LENGTH) {
								this.lastSlideTouch = null
								return
							}
						}
						if (this.scaleSize > 1) {
							this.scaleSize = 1
							this.imageLeft = 0
							this.updateStyle(e, NaN, NaN)
						} else if (this.scaleSize == 1) {
							this.scaleSize = 2
							this.inDoubleTapMode = true
							this.updateStyle(e, NaN, NaN)
						}
					} else if (e.touches.length == 0) {
						if (this.lastSlideTouch != null && this.lastSlideTouch!.length == 1) {
							if (e.timeStamp - this.startTimestamp < 160) {
								if (this.lastSlideTouch != null) {
									var downX = Math.abs(this.lastSlideTouch![0].clientX - this.downPoint!.x)
									var downY = Math.abs(this.lastSlideTouch![0].clientY - this.downPoint!.y)
									if (downX < FAST_SLIDE_LENGTH && downY < FAST_SLIDE_LENGTH) {
										this.clickTimeoutId = setTimeout(() => {
											uni.$emit("__UNIPREVIEWIMAGECLOSE")
										}, 200)
									}
								} else {
									this.clickTimeoutId = setTimeout(() => {
										uni.$emit("__UNIPREVIEWIMAGECLOSE")
									}, 200)
								}

							}
						}
						if (this.scaleSize > 3) {
							this.scaleSize = 3
							this.updateStyle(e, NaN, NaN)
						} else if (this.scaleSize < 1) {
							this.scaleSize = 1
							this.imageLeft = 0
							this.updateStyle(e, NaN, NaN)
						}
						this.lastTouchEndTime = current
					}
				} else {
					if (this.inScaleMode) {
						if (this.scaleSize > 3) {
							this.scaleSize = 3
							this.updateStyle(e, NaN, NaN)
						} else if (this.scaleSize < 1) {
							this.scaleSize = 1
							this.imageLeft = 0
							this.updateStyle(e, NaN, NaN)
						}
						this.lastTouchEndTime = current
					}
					var xv = 1000 * (this.historyX[1] - this.historyX[0]) / (this.historyT[1] - this.historyT[0])
					var yv = 1000 * (this.historyY[1] - this.historyY[0]) / (this.historyT[1] - this.historyT[0])
					this._friction.setVelocity(xv, yv)
					this._friction.setStartPosition(this.imageLeft, this.imageTop)
					const x0 = this._friction.displacement().x
					const y0 = this._friction.displacement().y
					var x = this.imageLeft
					if (!Number.isNaN(x0))
						x = x0 + this.imageLeft
					var y = this.imageTop
					if (!Number.isNaN(y0))
						y = y0 + this.imageTop
					this._friction.setEndPosition(x, y)
					this.doTransform(() => {
						var p = this._friction.positionAtTime(null)
						if (Number.isNaN(p.x) && Number.isNaN(p.y)) {
							cancelAnimationFrame(this.requestId)
						}
						if (!Number.isNaN(p.x))
							this.imageLeft = p.x
						if (!Number.isNaN(p.y))
							this.imageTop = p.y
						this.updateStyle(e, NaN, NaN)
					})
				}
				this.lastSlideTouch = null
				// #ifdef APP-ANDROID
				this.preventDefaultScall(e)
				// #endif
			},
			oncancel(e : UniTouchEvent) {
				this.onend(e)
				clearTimeout(this.clickTimeoutId)
			},
			doTransform(callback : (() => void)) {
				this.requestId = requestAnimationFrame(() => {
					callback()
					if (!this._friction.isDone())
						this.doTransform(callback)
				})
			},
			updateStyle(e : UniTouchEvent | null, xDistance : number, yDistance : number) {
				this.caculatorTransformOrigin(e)
				if (1 < this.scaleSize) {
					var scrollWidthLength = (this.screenWidth * (this.scaleSize - 1))
					var scrollRadio = this.transformOrigin[0] / (this.screenWidth)
					if (this.imageLeft > (scrollWidthLength * scrollRadio)) {
						this.imageLeft = (scrollWidthLength * scrollRadio)
						this.onInterceptTouchEvent(e)
					} else if (this.imageLeft < -(scrollWidthLength * (1 - scrollRadio))) {
						this.imageLeft = -(scrollWidthLength * (1 - scrollRadio))
						this.onInterceptTouchEvent(e)
					} else {
						this.preventDefaultScall(e)
					}
				} else {
					this.imageLeft = 0
					this.onInterceptTouchEvent(e)
				}
				if (this.screenHeight < (this.imageHeight * this.scaleSize)) {
					// 顶部最大可滚动距离为transform-origin的y方向的坐标减去图片真实的顶部坐标，获取图片transform-origin点上方图片可缩放的长度，诚意缩放比，减去transform-origin的y方向的坐标，即为图片顶部最大可滑动的距离
					var topMargin = (this.transformOrigin[1] - (this.imageMarginTop > 0 ? this.imageMarginTop : 0)) * this.scaleSize - this.transformOrigin[1]
					var bottomMargin = ((this.imageHeight + (this.imageMarginTop > 0 ? this.imageMarginTop : 0) - this.transformOrigin[1]) * this.scaleSize) - (this.screenHeight - this.transformOrigin[1])
					if (this.imageTop > topMargin) {
						this.imageTop = topMargin
					} else if (this.imageTop < -bottomMargin) {
						this.imageTop = -bottomMargin
					} else {
						if (!Number.isNaN(yDistance) && Math.abs(yDistance - this.downPoint!.y) > DEFAULT_DISTANCE) {
							this.preventDefaultScall(e)
						}
					}
				} else {
					if (!this.inScaleMode) {
						this.imageTop = 0
						if (!Number.isNaN(yDistance) && Math.abs(yDistance - this.downPoint!.y) > DEFAULT_DISTANCE) {
							this.preventDefaultScall(e)
						}
					} else {
						this.preventDefaultScall(e)
					}
				}
				this.imageView?.style.setProperty("transition-duration", this.withAnimation ? "200ms" : "0ms")
				this.imageView?.style.setProperty("transform-origin", (this.transformOrigin[0]) + "px " + (this.transformOrigin[1]) + "px")
				this.imageView?.style.setProperty("transform", "translate(" + (this.imageLeft) + "px," + (this.imageTop) + "px) scale(" + this.scaleSize + ")")
			},
			onLongPressAction() {
				if (this.longPressAction != null && (this.longPressAction as LongPressActionsOptions).itemList.length > 0) {
					uni.showActionSheet({
						itemList: (this.longPressAction as LongPressActionsOptions).itemList,
						itemColor: (this.longPressAction as LongPressActionsOptions).itemColor,
						success: (e) => {
							uni.$emit("__UNIPREVIEWLONGPRESS", { type: "success", tapIndex: e.tapIndex, index: this.index })
						},
						fail() {
							uni.$emit("__UNIPREVIEWLONGPRESS", { type: "fail", tapIndex: -1, index: -1 })
						}
					})
				}
			},
			onImageLoad(e : UniImageLoadEvent) {
				(this.$refs["mask"] as UniElement | null)?.style.setProperty("point-events", "none")
				uni.createSelectorQuery().in(this).select('.uni-preview-image-item').boundingClientRect().exec((ret) => {
					if (ret.length == 1) {
						var rect = this.imageView!.getBoundingClientRect()
						this.screenHeight = rect.height
						this.screenWidth = rect.width
						this.caculatorImageSize(e.detail.width / this.devicePixelRatio, e.detail.height / this.devicePixelRatio)
					}
				})
				this.loadingFinished = true
			},
			caculatorImageSize(imageWidth : number, imageHeight : number) {
				var scaleImageSize = (imageHeight / (imageWidth / this.screenWidth))
				if (scaleImageSize > this.screenHeight) {
					this.imageHeight = scaleImageSize
					this.imageMode = "aspectFill"
					this.imageView?.style.setProperty("height", scaleImageSize + "px")
				} else {
					this.imageMode = "aspectFit"
				}
				this.imageMarginTop = (this.screenHeight - scaleImageSize) / 2
				this.imageHeight = scaleImageSize
			},
			preventDefaultScall(e : UniTouchEvent | null) {
				e?.preventDefault()
				e?.stopPropagation()
			},
			onInterceptTouchEvent(e : UniTouchEvent | null) {
				if (this.inScaleMode) {
					this.preventDefaultScall(e)
					return
				}
				clearTimeout(this.clickTimeoutId)
				// #ifdef APP-ANDROID
				this.androidView?.parent?.requestDisallowInterceptTouchEvent(false)
				// #endif
			},
			reloadImage(e : UniPointerEvent) {
				(this.$refs["mask"] as UniElement | null)?.style.setProperty("point-events", "none")
				this.loadingFinished = false
				this.loadError = false
				var tempPath = this.srcPath + ""
				this.srcPath = ""
				setTimeout(() => {
					this.srcPath = tempPath
				}, 100)
				e.stopPropagation()
			},
			closePreviewImage() {
				uni.$emit("__UNIPREVIEWIMAGECLOSE")
			},
			// 计算transform-origin主要代码
			caculatorTransformOrigin(e : UniTouchEvent | null) {
				var originalCenterX : number
				var originalCenterY : number
				if (e != null) {
					if (e.touches.length >= 2) {
						var point1 = e.touches[0]
						var point2 = e.touches[1]
						originalCenterX = (point1.clientX + point2.clientX) / 2
						originalCenterY = (point1.clientY + point2.clientY) / 2
						if ((this.scaleSize * this.imageHeight) < this.screenHeight) {
							originalCenterY = this.screenHeight / 2
						}

						if (this.imageHeight > this.screenHeight && this.scaleSize >= 1) {
							originalCenterY = originalCenterY - this.imageTop / this.scaleSize
						}
						var oldTransformOrigin = [this.transformOrigin[0], this.transformOrigin[1]]
						this.transformOrigin = [originalCenterX, originalCenterY]
						if (oldTransformOrigin[0] != 0 && oldTransformOrigin[1] != 1) {
							this.imageLeft = this.imageLeft + (this.scaleSize - 1.0) * (originalCenterX - oldTransformOrigin[0])
							this.imageTop = this.imageTop + (this.scaleSize - 1.0) * (originalCenterY - oldTransformOrigin[1])
						}
					} else if (e.type == "touchend") {
						if (this.inDoubleTapMode && this.scaleSize == 2 && this.lastSlideTouch != null && this.lastSlideTouch!.length == 1) {
							originalCenterX = this.lastSlideTouch![0].clientX
							originalCenterY = this.lastSlideTouch![0].clientY
							if ((this.scaleSize * this.imageHeight) < this.screenHeight) {
								originalCenterY = this.screenHeight / 2
							}
							if (this.imageHeight > this.screenHeight) {
								originalCenterY = originalCenterY - this.imageTop
							}
							this.transformOrigin = [originalCenterX, originalCenterY]
							this.imageLeft = this.imageLeft + (this.scaleSize - 1) * (originalCenterX - this.transformOrigin[0])
							this.imageTop = this.imageTop + (this.scaleSize - 1) * (originalCenterY - this.transformOrigin[1])
						}
					}
				}
			}
		}
	}
</script>

<style>
	.uni-preview-image-item {
		width: 100%;
		height: 100%;
		transition-property: transform;
		transition-duration: 0ms;
	}

	.uni-preview-image-patch {
		width: 100%;
		height: 100%;
		background-color: transparent;
		position: absolute;
	}

	.uni-preview-image-loading {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		pointer-events: none;
	}

	.uni-preview-image-item-background {
		background-color: black;
	}

	.uni-preview-image-tips-retry {
		color: blue;
		font-size: 18px;
		margin-top: 16px;
		text-decoration-line: underline;
	}

	.uni-preview-image-tips-error {
		font-size: 18px;
		color: red;
	}
</style>