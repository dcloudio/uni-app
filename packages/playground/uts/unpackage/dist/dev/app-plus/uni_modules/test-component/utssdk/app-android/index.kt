@file:Suppress("UNCHECKED_CAST")
package uts.modules.modules.testComponent;
import io.dcloud.uts.*;
import io.dcloud.uts.Map;
import kotlinx.coroutines.CoroutineScope;
import kotlinx.coroutines.Deferred;
import kotlinx.coroutines.Dispatchers;
import io.dcloud.feature.uniapp.ui.action.AbsComponentData;
import io.dcloud.feature.uniapp.ui.component.AbsVContainer;
import android.animation.Animator;
import com.taobao.weex.annotation.JSMethod;
import com.airbnb.lottie.LottieAnimationView;
import com.airbnb.lottie.LottieDrawable;
import android.text.TextUtils;
import io.dcloud.uts.component.UTSComponent;
import io.dcloud.uts.component.UTSSize;
import io.dcloud.feature.uniapp.UniSDKInstance;
import android.view.View;
import com.taobao.weex.ui.component.WXComponentProp;
open class CustomAnimListener : Animator.AnimatorListener {
    open var comp: UTSComponent<LottieAnimationView>;
    constructor(com: UTSComponent<LottieAnimationView>) : super() {
        this.comp = com;
    }
    override fun onAnimationStart(animation: Animator?) {}
    override fun onAnimationEnd(animation: Animator?, isReverse: Boolean) {
        this.comp.emit("bindended");
    }
    override fun onAnimationEnd(animation: Animator?) {}
    override fun onAnimationCancel(animation: Animator?) {}
    override fun onAnimationRepeat(animation: Animator?) {}
}
open class AnimationViewComponent : UTSComponent<LottieAnimationView> {
    constructor(instance: UniSDKInstance?, parent: AbsVContainer<*>?, componentData: AbsComponentData<*>?) : super(instance, parent, componentData) ;
    open var path: String = "";
    open var autoplay: Boolean = false;
    open var loop: Boolean = false;
    open var hidden: Boolean = false;
    open var action: String = "stop";
    override fun created() {}
    override fun NVBeforeLoad() {}
    override fun NVLoad(): LottieAnimationView {
        var lottieAnimationView = LottieAnimationView(getContext());
        return lottieAnimationView;
    }
    override fun NVLoaded() {
        this.`$el`.repeatMode = LottieDrawable.RESTART;
        this.`$el`.visibility = View.GONE;
        this.`$el`.repeatCount = 0;
        this.`$el`.addAnimatorListener(CustomAnimListener(this));
    }
    override fun NVLayouted() {}
    override fun NVBeforeUnload() {}
    override fun NVUnloaded() {}
    override fun NVMeasure(size: UTSSize): UTSSize {
        return UTSSize(100, 100);
    }
    override fun unmounted() {}
    @JSMethod(uiThread = false)
    open fun setRepeatMode(repeat: String) {
        if ("RESTART" == repeat) {
            this.`$el`.repeatMode = LottieDrawable.RESTART;
        } else if ("REVERSE" == repeat) {
            this.`$el`.repeatMode = LottieDrawable.RESTART;
        }
    }
    @JSMethod(uiThread = false)
    open fun privateMethod() {}
    override fun `$init`() {
        this.`$watch`<String>("path", fun(newPath, oldPath){
            var lottieAnimationView = this.`$el`;
            if (lottieAnimationView != null && !TextUtils.isEmpty(newPath)) {
                if (newPath.startsWith("http://") || newPath.startsWith("https://")) {
                    lottieAnimationView.setAnimationFromUrl(newPath);
                } else {
                    lottieAnimationView.setAnimation(newPath);
                }
            }
            if (this.autoplay) {
                lottieAnimationView.playAnimation();
            }
        }
        );
        this.`$watch`<Boolean>("loop", fun(newLoop, oldLoop){
            if (newLoop) {
                this.`$el`.repeatCount = Int.MAX_VALUE;
            } else {
                this.`$el`.repeatCount = 0;
            }
            if (this.autoplay) {
                this.`$el`.playAnimation();
            }
        }
        );
        this.`$watch`<Boolean>("autoplay", fun(newValue, oldValue){
            if (newValue) {
                this.`$el`.playAnimation();
            }
        }
        );
        this.`$watch`<String>("action", fun(newAction, oldAction){
            if (newAction == "play" || newAction == "pause" || newAction == "stop") {
                if (this.action == "play") {
                    this.`$el`.playAnimation();
                } else if (this.action == "play") {
                    this.`$el`.pauseAnimation();
                } else if (this.action == "stop") {
                    this.`$el`.cancelAnimation();
                    this.`$el`.clearAnimation();
                }
            }
        }
        );
        this.`$watch`<Boolean>("hidden", fun(newValue, oldValue){
            if (newValue) {
                this.`$el`.visibility = View.GONE;
            } else {
                this.`$el`.visibility = View.VISIBLE;
            }
        }
        );
    }
    @WXComponentProp(name = "path")
    open fun componentSetPath(value: String) {
        this.path = value;
        this.`$componentWatchDispatch`("path", value);
    }
    @WXComponentProp(name = "autoplay")
    open fun componentSetAutoplay(value: Boolean) {
        this.autoplay = value;
        this.`$componentWatchDispatch`("autoplay", value);
    }
    @WXComponentProp(name = "loop")
    open fun componentSetLoop(value: Boolean) {
        this.loop = value;
        this.`$componentWatchDispatch`("loop", value);
    }
    @WXComponentProp(name = "hidden")
    open fun componentSetHidden(value: Boolean) {
        this.hidden = value;
        this.`$componentWatchDispatch`("hidden", value);
    }
    @WXComponentProp(name = "action")
    open fun componentSetAction(value: String) {
        this.action = value;
        this.`$componentWatchDispatch`("action", value);
    }
}
