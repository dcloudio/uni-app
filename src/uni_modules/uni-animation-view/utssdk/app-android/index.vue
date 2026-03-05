<template>
    <view class="defaultStyles">

    </view>
</template>
<script lang="uts">
    import Animator from 'android.animation.Animator'
    import TextUtils from 'android.text.TextUtils'
    import View from 'android.view.View'
    import LottieAnimationView from 'com.airbnb.lottie.LottieAnimationView'
    import LottieDrawable from 'com.airbnb.lottie.LottieDrawable'
	import FileInputStream from 'java.io.FileInputStream'

    class CustomAnimListener extends Animator.AnimatorListener {

        comp: UTSComponent < LottieAnimationView >
            constructor(com: UTSComponent < LottieAnimationView > ) {
                super();
                this.comp = com
            }

        override onAnimationStart(animation: Animator) {}

        override onAnimationEnd(animation: Animator, isReverse: Boolean) {
            this.comp.$emit("bindended")
        }

        override onAnimationEnd(animation: Animator) {}

        override onAnimationCancel(animation: Animator) {}

        override onAnimationRepeat(animation: Animator) {}
    }

    //原生提供以下属性或方法的实现  
    export default {
        name: "animation-view",
        /**
         * 当播放到末尾时触发 ended 事件（自然播放结束会触发回调，循环播放结束及手动停止动画不会触发）
         */
        emits: ['bindended'],
        props: {
            /**
             * 动画资源地址，目前只支持绝对路径
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
                handler(newPath: string) {

					if(this.$el != null){
						let lottieAnimationView = this.$el!
						if (!TextUtils.isEmpty(newPath)) {
							
						    if (newPath.startsWith("http://") || newPath.startsWith("https://")) {
						        lottieAnimationView.setAnimationFromUrl(newPath)
						    } else {
								// uni-app x 正式打包会放在asset中，需要特殊处理
								let realJsonPath = UTSAndroid.getResourcePath(newPath)
								if(realJsonPath.startsWith("/android_asset")){
								  lottieAnimationView.setAnimation(realJsonPath.substring(15))
								}else{
								  lottieAnimationView.setAnimation(new FileInputStream(realJsonPath),newPath)
								}
						    }
						}
						if (this.autoplay) {
						    lottieAnimationView.playAnimation()
						}
					}
                },
                immediate: false
            },
            "loop": {
                handler(newLoop: Boolean) {
					if(this.$el != null){
						if (newLoop) {
						    this.$el!.repeatCount = Int.MAX_VALUE
						} else {
						    // 不循环则设置成1次
						    this.$el!.repeatCount = 0
						}
						
						if (this.autoplay) {
						    this.$el!.playAnimation()
						}
					}
                    
                },
                immediate: false
            },

            "autoplay": {
                handler(newValue: boolean) {
					if(this.$el != null){
						if (newValue) {
						    this.$el!.playAnimation()
						}
					}
                    
                },
                immediate: false
            },

            "action": {
                handler(newAction: string) {

                    if (newAction == "play" || newAction == "pause" || newAction == "stop") {

						if(this.$el != null){
							if (this.action == "play") {
							    this.$el!.playAnimation()
							} else if (this.action == "pause") {
							    this.$el!.pauseAnimation()
							} else if (this.action == "stop") {
							    this.$el!.cancelAnimation()
							    this.$el!.clearAnimation()
							}
						}

                    } else {
                        // 非法入参，不管
                    }
                },
                immediate: false
            },

            "hidden": {
                handler(newValue: boolean) {
					if(this.$el != null){
						if (newValue) {
						    this.$el!.visibility = View.GONE
						} else {
						    this.$el!.visibility = View.VISIBLE
						}
					}
                },
                immediate: false
            },

        },
        methods: {
            setRepeatMode(repeat: string) {
				if(this.$el != null){
					if ("RESTART" == repeat) {
					    this.$el!.repeatMode = LottieDrawable.RESTART
					} else if ("REVERSE" == repeat) {
					    this.$el!.repeatMode = LottieDrawable.RESTART
					}
				}
            },
        },
        
        NVLoad(): LottieAnimationView { 
            let lottieAnimationView = new LottieAnimationView($androidContext)
            return lottieAnimationView
        },
		
        NVLoaded() { 
			if(this.$el != null){
				this.$el!.repeatMode = LottieDrawable.RESTART;
				this.$el!.visibility = View.GONE
				this.$el!.repeatCount = 0
				this.$el!.addAnimatorListener(new CustomAnimListener(this))
			}
        }
        
    }
</script>
<style>
    /* 定义默认样式值, 组件使用者没有配置时使用 */
    .defaultStyles {
        width: 750rpx;
        height: 240rpx;
    }
</style>
