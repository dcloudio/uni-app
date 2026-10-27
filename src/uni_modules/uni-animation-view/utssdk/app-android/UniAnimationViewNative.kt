package uts.sdk.modules.uniAnimationView

import android.app.Activity
import android.animation.Animator
import android.animation.AnimatorListenerAdapter
import android.os.Handler
import android.os.Looper
import android.view.ViewGroup
import android.widget.FrameLayout
import android.widget.ImageView
import com.airbnb.lottie.LottieAnimationView
import com.airbnb.lottie.LottieComposition
import com.airbnb.lottie.LottieDrawable
import com.airbnb.lottie.LottieOnCompositionLoadedListener
import io.dcloud.uts.console
import java.io.File
import java.io.FileNotFoundException

class UniAnimationViewNative(
    activity: Activity
) : FrameLayout(activity) {
    private val mainHandler = Handler(Looper.getMainLooper())
    private val lottieView = LottieAnimationView(activity)
    private var destroyed = false
    private var loopEnabled = false
    private var direction = 1
    private var pendingPlay = false
    private var cancelledByControl = false
    private var dataReadyCallback: (() -> Unit)? = null
    private var completeCallback: (() -> Unit)? = null
    private var errorCallback: ((String, String) -> Unit)? = null

    private fun isNetworkPath(path: String): Boolean {
        return path.startsWith("http://") || path.startsWith("https://")
    }

    private fun getAndroidAssetPath(path: String): String? {
        val resourceAssetPrefix = "file:///android_asset/"
        if (path.startsWith(resourceAssetPrefix)) {
            return path.removePrefix(resourceAssetPrefix)
        }
        val absoluteAssetPrefix = "/android_asset/"
        if (path.startsWith(absoluteAssetPrefix)) {
            return path.removePrefix(absoluteAssetPrefix)
        }
        return null
    }

    private val animatorListener = object : AnimatorListenerAdapter() {
        override fun onAnimationEnd(animation: Animator) {
            if (cancelledByControl) {
                cancelledByControl = false
                return
            }
            if (!destroyed && !loopEnabled) {
                completeCallback?.invoke()
            }
        }
    }

    init {
        layoutParams = ViewGroup.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT
        )
        lottieView.layoutParams = LayoutParams(
            LayoutParams.MATCH_PARENT,
            LayoutParams.MATCH_PARENT
        )
        addView(lottieView)
        lottieView.scaleType = ImageView.ScaleType.FIT_CENTER
        lottieView.enableMergePathsForKitKatAndAbove(true)
        lottieView.repeatMode = LottieDrawable.RESTART
        lottieView.addAnimatorListener(animatorListener)
        lottieView.addLottieOnCompositionLoadedListener(object : LottieOnCompositionLoadedListener {
            override fun onCompositionLoaded(composition: LottieComposition) {
                if (destroyed) {
                    return
                }
                totalFrames = composition.endFrame.toInt()
                applyLoop()
                applyDirection()
                dataReadyCallback?.invoke()
                if (pendingPlay) {
                    pendingPlay = false
                    lottieView.playAnimation()
                }
            }
        })
        lottieView.setFailureListener { throwable ->
            val message = throwable.message ?: throwable.toString()
            console.error("animation-view android load failed:", throwable)
            errorCallback?.invoke("lottie", message)
        }
    }

    var totalFrames: Int = 0
        private set

    fun setDataReadyCallback(callback: (() -> Unit)?) {
        dataReadyCallback = callback
    }

    fun setCompleteCallback(callback: (() -> Unit)?) {
        completeCallback = callback
    }

    fun setErrorCallback(callback: ((String, String) -> Unit)?) {
        errorCallback = callback
    }

    fun load(path: String, loop: Boolean, autoplay: Boolean, width: Int, height: Int) {
        if (destroyed) {
            return
        }
        totalFrames = 0
        pendingPlay = false
        cancelledByControl = true
        lottieView.cancelAnimation()
        setLoop(loop)
        if (isNetworkPath(path)) {
            lottieView.setAnimationFromUrl(path)
            applyLoop()
            applyDirection()
            if (autoplay) {
                play()
            }
            lottieView.requestLayout()
            lottieView.invalidate()
            return
        }
        val assetPath = getAndroidAssetPath(path)
        val jsonContent = try {
            if (assetPath != null) {
                context.assets.open(assetPath).bufferedReader().use { it.readText() }
            } else {
                val jsonFile = File(path)
                if (!jsonFile.exists() || !jsonFile.isFile) {
                    console.error("animation-view android json not found:", path)
                    errorCallback?.invoke("invalid_path", "animation path does not exist: $path")
                    return
                }
                jsonFile.readText()
            }
        } catch (e: FileNotFoundException) {
            console.error("animation-view android json not found:", path)
            errorCallback?.invoke("invalid_path", "animation path does not exist: $path")
            return
        } catch (e: Throwable) {
            console.error("animation-view android read json failed:", e)
            errorCallback?.invoke("lottie", e.message ?: e.toString())
            return
        }
        lottieView.setAnimationFromJson(jsonContent, path)
        applyLoop()
        applyDirection()
        if (autoplay) {
            play()
        }
        lottieView.requestLayout()
        lottieView.invalidate()
    }

    fun setLoop(loop: Boolean) {
        loopEnabled = loop
        applyLoop()
    }

    private fun applyLoop() {
        lottieView.repeatCount = if (loopEnabled) LottieDrawable.INFINITE else 0
    }

    fun getCurrentFrame(): Int {
        return lottieView.frame
    }

    fun setDirection(value: Int) {
        direction = if (value < 0) -1 else 1
        applyDirection()
    }

    private fun applyDirection() {
        lottieView.speed = if (direction < 0) -1f else 1f
    }

    fun play() {
        if (destroyed) {
            return
        }
        cancelledByControl = false
        if (lottieView.composition == null) {
            pendingPlay = true
            return
        }
        pendingPlay = false
        mainHandler.post {
            if (!destroyed) {
                lottieView.playAnimation()
            }
        }
    }

    fun resume() {
        if (destroyed) {
            return
        }
        cancelledByControl = false
        if (lottieView.composition == null) {
            pendingPlay = true
            return
        }
        pendingPlay = false
        mainHandler.post {
            if (!destroyed) {
                lottieView.resumeAnimation()
            }
        }
    }

    fun pause() {
        if (!destroyed) {
            pendingPlay = false
            lottieView.pauseAnimation()
        }
    }

    fun stop() {
        if (destroyed) {
            return
        }
        pendingPlay = false
        cancelledByControl = true
        lottieView.cancelAnimation()
        lottieView.progress = if (direction < 0) 1f else 0f
    }

    fun goToAndStop(value: Double, isFrame: Boolean) {
        if (destroyed) {
            return
        }
        val progress = if (isFrame) {
            val total = if (totalFrames > 0) totalFrames.toDouble() else 1.0
            if (total <= 0) 0f else (value / total).coerceIn(0.0, 1.0).toFloat()
        } else {
            val duration = lottieView.composition?.duration?.toDouble() ?: 1.0
            if (duration <= 0) 0f else (value / duration).coerceIn(0.0, 1.0).toFloat()
        }
        pendingPlay = false
        cancelledByControl = true
        lottieView.cancelAnimation()
        lottieView.progress = progress
    }

    fun destroy() {
        if (destroyed) {
            return
        }
        destroyed = true
        pendingPlay = false
        lottieView.cancelAnimation()
        lottieView.removeAllAnimatorListeners()
        lottieView.removeAllUpdateListeners()
        dataReadyCallback = null
        completeCallback = null
        errorCallback = null
    }
}
