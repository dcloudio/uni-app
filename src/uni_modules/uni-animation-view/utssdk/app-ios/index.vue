<template>
	<view style="width: 375px;height: 120px;">

	</view>
</template>
<script lang="uts">
	import {
		LottieAnimationView,
		LottieAnimation,
		LottieLoopMode
	} from 'Lottie'
	import {
		URL,
		Bundle
	} from 'Foundation'
	import {
		UIView
	} from "UIKit"
	import {
		UTSiOS
	} from "DCloudUTSFoundation"


	//原生提供以下属性或方法的实现  
	export default {
		/**
		 * 组件名称，也就是开发者使用的标签
		 */
		name: "animation-view",
		/**
		 * 组件涉及的事件声明，只有声明过的事件，才能被正常发送
		 */
		emits: ['bindended'], // 当播放到末尾时触发 ended 事件（自然播放结束会触发回调，循环播放结束及手动停止动画不会触发）
		/**
		 * 属性声明，组件的使用者会传递这些属性值到组件
		 */
		props: {
			/**
			 * 动画资源地址，支持远程 URL 地址和本地绝对路径
			 */
			"path": {
				type: String,
				default: ""
			},
			/**
			 * 动画是否自动播放
			 */
			"autoplay": {
				type: Boolean,
				default: false
			},
			/**
			 * 动画是否循环播放
			 */
			"loop": {
				type: Boolean,
				default: false
			},
			/**
			 * 是否隐藏动画
			 */
			"hidden": {
				type: Boolean,
				default: false
			},
			/**
			 * 动画操作，可取值 play、pause、stop
			 */
			"action": {
				type: String,
				default: "stop"
			}

		},
		data() {
			return {

			}
		},
		watch: {
			"path": {
				handler(newValue: string, oldValue: string) {
					if (this.autoplay) {
						this.playAnimation()
					}
				},
				immediate: false //创建时是否通过此方法更新属性，默认值为false  
			},
			"loop": {
				handler(newValue: boolean, oldValue: boolean) {
					if (newValue) {
						this.$el.loopMode = LottieLoopMode.loop
					} else {
						this.$el.loopMode = LottieLoopMode.playOnce
					}
				},
				immediate: false //创建时是否通过此方法更新属性，默认值为false  
			},
			"autoplay": {
				handler(newValue: boolean, oldValue: boolean) {
					if (newValue) {
						this.playAnimation()
					}
				},
				immediate: false //创建时是否通过此方法更新属性，默认值为false  
			},
			"action": {
				handler(newValue: string, oldValue: string) {
					const action = newValue
					if (action == "play" || action == "pause" || action == "stop") {
						switch (action) {
							case "play":
								this.playAnimation()
								break;
							case "pause":
								this.$el.pause()
								break;
							case "stop":
								this.$el.stop()
								break;
							default:
								break;
						}
					} else {
						// 非法入参，不管
					}
				},
				immediate: false //创建时是否通过此方法更新属性，默认值为false  
			},

			"hidden": {
				handler(newValue: boolean, oldValue: boolean) {
					this.$el.isHidden = this.hidden
				},
				immediate: false //创建时是否通过此方法更新属性，默认值为false  
			},

		},
		expose: ['setRepeatMode'],
		methods: {
			// 需要对外暴露的方法
			// 设置 RepeatMode 
			setRepeatMode(repeatMode: string) {
				if (repeatMode == "RESTART") {
					if (this.loop) {
						this.$el.loopMode = LottieLoopMode.loop
					} else {
						this.$el.loopMode = LottieLoopMode.playOnce
					}
				} else if (repeatMode == "REVERSE") {
					if (this.loop) {
						this.$el.loopMode = LottieLoopMode.autoReverse
					} else {
						this.$el.loopMode = LottieLoopMode.repeatBackwards(1)
					}
				}
			},
			// 不对外暴露的方法
			// 播放动画 
			playAnimation() {
				// 构建动画资源 url
				var animationUrl: URL | null

				if (this.path.hasPrefix("http")) {
					animationUrl = new URL(string = this.path)
				} else {
					const filePath = UTSiOS.getResourcePath(this.path)
					animationUrl = new URL(fileURLWithPath = filePath)
				}

				if (animationUrl != null) {
					// 加载动画 LottieAnimation
					LottieAnimation.loadedFrom(url = animationUrl!, closure = (animation: LottieAnimation | null):
						void => {
							if (animation != null) {
								// 加载成功开始播放
								this.$el.animation = animation
								this.$el.play(completion = (isFinish: boolean): void => {
									if (isFinish) {
										// 播放完成回调事件
										this.fireEvent("bindended")
									}
								})
							}
						})
				} else {
					console.log("url 构建失败，请检查 path 是否正确")
				}
			}
		},
		created() { //创建组件，替换created  

		},
		NVBeforeLoad() { //组件将要创建，对应前端beforeMount  
			//可选实现，这里可以提前做一些操作  
		},
		NVLoad(): LottieAnimationView { //创建原生View，必须定义返回值类型（Android需要明确知道View类型，需特殊校验）  
			// 初始化 Lottie$el
			const animationView = new LottieAnimationView()
			// 默认只播放一次动画
			animationView.loopMode = LottieLoopMode.playOnce
			return animationView
		},
		NVLoaded() { //原生View已创建  

			/// 更新 props 中定义的属性值

			if (this.loop) {
				this.$el.loopMode = LottieLoopMode.loop
			}

			this.$el.isHidden = this.hidden

			if (this.autoplay) {
				this.playAnimation()
			}
		},

		NVLayouted() { //原生View布局完成  
			//可选实现，这里可以做布局后续操作  
		},

		NVBeforeUnload() { //原生View将释放  
			//可选实现，这里可以做释放View之前的操作  
		},
		NVUnloaded() { //原生View已释放  
			//可选实现，这里可以做释放View之后的操作  
		},
		unmounted() { //组件销毁  
			//可选实现  
		}
	}
</script>
