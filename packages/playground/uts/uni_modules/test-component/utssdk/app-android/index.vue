<template>
    <view class="defaultStyles">

    </view>
</template>
<script lang="ts">
import Animator from 'android.animation.Animator'
import TextUtils from 'android.text.TextUtils'
import View from 'android.view.View'
import LottieAnimationView from 'com.airbnb.lottie.LottieAnimationView'
import LottieDrawable from 'com.airbnb.lottie.LottieDrawable'


class CustomAnimListener extends Animator.AnimatorListener {

    comp: UTSComponent<LottieAnimationView>
    constructor(com: UTSComponent<LottieAnimationView>) {
        super();
        this.comp = com
    }

    override onAnimationStart(animation: Animator | null) {
    }

    override onAnimationEnd(animation: Animator | null, isReverse: Boolean) {
        this.comp.emit("bindended")
    }

    override onAnimationEnd(animation: Animator | null) {
    }

    override onAnimationCancel(animation: Animator | null) {
    }

    override onAnimationRepeat(animation: Animator | null) {
    }
}

//原生提供以下属性或方法的实现  
export default {
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
			default:""
        },
        /**
         * 动画是否循环播放
         */
        "autoplay": {
            type: Boolean,
			default:false
        },
        /**
         * 动画是否自动播放
         */
        "loop": {
            type: Boolean,
			default:false
        },
        /**
         * 是否隐藏动画
         */
        "hidden": {
            type: Boolean,
			default:false
        },
        /**
         * 动画操作，可取值 play、pause、stop
         */
        "action": {
            type: String,
			default:"stop"
        }

    },
    data() {
        return {

        }
    },
    watch: {
        "path": {
            handler(newPath: string, oldPath: string) {

                let lottieAnimationView = this.$el

                if (lottieAnimationView != null && !TextUtils.isEmpty(newPath)) {
                    if (newPath.startsWith("http://") || newPath.startsWith("https://")) {
                        lottieAnimationView.setAnimationFromUrl(newPath)
                    } else {
                        // 默认是asset了
                        lottieAnimationView.setAnimation(newPath)
                    }
                }
                if (this.autoplay) {
                    lottieAnimationView.playAnimation()
                }
            },
            immediate: false   //创建时是否通过此方法更新属性，默认值为false  
        },
        "loop": {
            handler(newLoop: Boolean, oldLoop: Boolean) {

                if (newLoop) {
                    this.$el.repeatCount = Int.MAX_VALUE
                } else {
                    // 不循环则设置成1次
                    this.$el.repeatCount = 0
                }

                if (this.autoplay) {
                    this.$el.playAnimation()
                }
            },
            immediate: false   //创建时是否通过此方法更新属性，默认值为false  
        },

        "autoplay": {
            handler(newValue: boolean, oldValue: boolean) {

                if (newValue) {
                    this.$el.playAnimation()
                }
            },
            immediate: false   //创建时是否通过此方法更新属性，默认值为false  
        },

        "action": {
            handler(newAction: string, oldAction: string) {

                if (newAction == "play" || newAction == "pause" || newAction == "stop") {


                    if (this.action == "play") {
                        this.$el.playAnimation()
                    } else if (this.action == "play") {
                        this.$el.pauseAnimation()
                    } else if (this.action == "stop") {
                        this.$el.cancelAnimation()
                        this.$el.clearAnimation()
                    }

                } else {
                    // 非法入参，不管
                }
            },
            immediate: false   //创建时是否通过此方法更新属性，默认值为false  
        },

        "hidden": {
            handler(newValue: boolean, oldValue: boolean) {

                if (newValue) {
                    this.$el.visibility = View.GONE
                } else {
                    this.$el.visibility = View.VISIBLE
                }
            },
            immediate: false   //创建时是否通过此方法更新属性，默认值为false  
        },

    },
    methods: {
        setRepeatMode(repeat: string) {
            if ("RESTART" == repeat) {
                this.$el.repeatMode = LottieDrawable.RESTART
            } else if ("REVERSE" == repeat) {
                this.$el.repeatMode = LottieDrawable.RESTART
            }
        },
        privateMethod() {	//如何定义不对外暴露的API？ 暂不支持，需在export外写  
        }
    },
    created() {			//创建组件，替换created  

    },
    NVBeforeLoad() {		//组件将要创建，对应前端beforeMount  
        //可选实现，这里可以提前做一些操作  
    },
    NVLoad(): LottieAnimationView {     //创建原生View，必须定义返回值类型（Android需要明确知道View类型，需特殊校验）  
        //必须实现  
        let lottieAnimationView = new LottieAnimationView(getContext())
        return lottieAnimationView
    },
    NVLoaded() {			//原生View已创建  
        //可选实现，这里可以做后续操作  
        this.$el.repeatMode = LottieDrawable.RESTART;
        this.$el.visibility = View.GONE
        this.$el.repeatCount = 0
        this.$el.addAnimatorListener(new CustomAnimListener(this))

    },
    NVLayouted() {	//原生View布局完成  
        //可选实现，这里可以做布局后续操作  
    },
    NVBeforeUnload() {		//原生View将释放  
        //可选实现，这里可以做释放View之前的操作  
    },
    NVUnloaded() {			//原生View已释放  
        //可选实现，这里可以做释放View之后的操作  
    },
    NVMeasure(size: UTSSize): UTSSize {
        return UTSSize(100, 100)
    },
    unmounted() {	//组件销毁  
        //可选实现  
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