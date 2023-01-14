<template>
    <view class="defaultStyles">

    </view>
</template>
<script lang="ts">
import {
    LottieAnimationView,
    LottieAnimation,
    LottieLoopMode
} from 'Lottie'
import {
    URL
} from 'Foundation'
import {
    UIView
} from "UIKit"
import {
    UTSiOS
} from "DCloudUTSFoundation"


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
        },
        /**
         * 动画是否循环播放
         */
        "autoplay": {
            type: Boolean,
        },
        /**
         * 动画是否自动播放
         */
        "loop": {
            type: Boolean,
        },
        /**
         * 是否隐藏动画
         */
        "hidden": {
            type: Boolean,
        },
        /**
         * 动画操作，可取值 play、pause、stop
         */
        "action": {
            type: String,
        }

    },
    data() {
        return {
            animationView: null as LottieAnimationView | null
        }
    },
    watch: {

        /// 注意: newValue 都需要强转成对应的类型

        "path": {
            handler(newValue: string, oldValue: string) {
                this.path = newValue
                if (this.autoplay) {
                    this.playAnimation()
                }
            },
            immediate: false //创建时是否通过此方法更新属性，默认值为false  
        },
        "loop": {
            handler(newValue: boolean, oldValue: boolean) {
                this.loop = newValue
                if (this.loop) {
                    this.animationView.loopMode = LottieLoopMode.loop
                }
            },
            immediate: false //创建时是否通过此方法更新属性，默认值为false  
        },
        "autoplay": {
            handler(newValue: boolean, oldValue: boolean) {
                this.autoplay = newValue
            },
            immediate: false //创建时是否通过此方法更新属性，默认值为false  
        },
        "action": {
            handler(newValue: string, oldValue: string) {
                const action = newValue

                if (action == "play" || action == "pause" || action == "stop") {
                    this.action = action
                    switch (action) {
                        case "play":
                            this.playAnimation()
                            break;
                        case "pause":
                            this.animationView.pause()
                            break;
                        case "stop":
                            this.animationView.stop()
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
                this.hidden = newValue
                this.animationView.isHidden = this.hidden
            },
            immediate: false //创建时是否通过此方法更新属性，默认值为false  
        },

    },
    methods: {
        // 需要对外暴露的方法
        // 设置 RepeatMode 
        setRepeatMode(repeatMode: string) {
            if (repeatMode == "RESTART") {
                if (this.loop) {
                    this.animationView.loopMode = LottieLoopMode.loop
                } else {
                    this.animationView.loopMode = LottieLoopMode.playOnce
                }
            } else if (repeatMode == "REVERSE") {
                if (this.loop) {
                    this.animationView.loopMode = LottieLoopMode.autoReverse
                } else {
                    this.animationView.loopMode = LottieLoopMode.repeatBackwards(1)
                }
            }
        },
        // 不对外暴露的方法
        // 播放动画 
        playAnimation() {
            if (this.path == null) {
                return
            }

            // 构建动画资源 url
            var animationUrl: URL | null

            if (this.path!.hasPrefix("http")) {
                animationUrl = new URL(string = this.path!)
            } else {
                var filePath = UTSiOS.getResourcePath(this.path!)
                animationUrl = new URL(filePath = filePath)
            }

            if (animationUrl != null) {
                // 加载动画 LottieAnimation
                LottieAnimation.loadedFrom(url = animationUrl!, closure = (animation: LottieAnimation): void => {
                    if (animation != null) {
                        // 加载成功开始播放
                        this.animationView.animation = animation
                        this.animationView.play(completion = (isFinish: boolean): void => {
                            if (isFinish) {
                                // 播放完成回调事件
                                this.fireEvent("bindended")
                            }
                        })
                    }
                })
            }
        }
    },
    created() { //创建组件，替换created  

    },
    measure(size: UTSSize): UTSSize { //测量组件大小
        //可选实现，仅当需要原生计算组件大小时需要实现  
        return new UTSSize(100, 100);
    },
    NVBeforeLoad() { //组件将要创建，对应前端beforeMount  
        //可选实现，这里可以提前做一些操作  
    },
    NVLoad(): UIView { //创建原生View，必须定义返回值类型（Android需要明确知道View类型，需特殊校验）  
        // 初始化 LottieAnimationView
        this.animationView = new LottieAnimationView()
        // 默认只播放一次动画
        this.animationView.loopMode = LottieLoopMode.playOnce
        return this.animationView
    },
    NVLoaded() { //原生View已创建  

        /// 更新 props 中定义的属性值

        if (this.loop) {
            this.animationView.loopMode = LottieLoopMode.loop
        }

        this.animationView.isHidden = this.hidden

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
    NVMeasure(size: UTSSize): UTSSize {
        return UTSSize(100, 100)
    },
    unmounted() { //组件销毁  
        //可选实现  
    }
}
</script>
<style>
/* 定义默认样式值, 组件使用者没有配置时使用   */
.defaultStyles {
    width: 750rpx;
    height: 240rpx;
}
</style>
