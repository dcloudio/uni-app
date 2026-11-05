// 软键盘（IME）弹出/收起动画进度监听的 Android 原生混编实现
package uts.sdk.modules.uniKeyboard

import android.app.Activity
import android.view.View
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsAnimationCompat
import androidx.core.view.WindowInsetsCompat
import io.dcloud.uts.UTSAndroid

/**
 * 软键盘动画进度监听封装类
 *
 * 对外暴露两个静态方法（object 成员即为静态）：
 *  - onKeyboardAnimationChangeKotlin(callback)  注册单个回调
 *  - offKeyboardAnimationChangeKotlin()         注销并释放引用
 *
 * callback 参数：height 为当前键盘高度（物理像素，Type.ime() 的 bottom）；state 为 "start" / "running" / "end"。
 */
object KeyboardAnimationNative {

    // 当前注册回调时挂载动画回调的 decorView
    private var decorView: View? = null

    // 当前持有的 WindowInsetsAnimationCompat.Callback
    private var animationCallback: WindowInsetsAnimationCompat.Callback? = null

    // 当前注册的业务回调（单回调，多回调与 id 映射由 UTS 胶水层维护）
    private var keyboardCallback: ((Number, String) -> Unit)? = null

    // 记录动画过程中最后一次上报的键盘高度，用于 onEnd 兜底
    private var lastRunningHeight: Int = 0

    // 记录动画开始时键盘是否已显示，用于区分「弹出动画」与「收起动画」
    private var imeVisibleAtStart: Boolean = false

    /**
     * 注册键盘动画进度回调
     */
    fun onKeyboardAnimationChangeKotlin(callback: (height: Number, state: String) -> Unit) {
        // 先清理旧引用，避免重复注册造成回调叠加或内存泄漏
        offKeyboardAnimationChangeKotlin()

        val activity: Activity = UTSAndroid.getUniActivity() ?: return
        val view: View = activity.window?.decorView ?: return

        keyboardCallback = callback
        decorView = view
        lastRunningHeight = 0
        imeVisibleAtStart = false

        val cb = object : WindowInsetsAnimationCompat.Callback(
            WindowInsetsAnimationCompat.Callback.DISPATCH_MODE_CONTINUE_ON_SUBTREE
        ) {
            override fun onStart(
                animation: WindowInsetsAnimationCompat,
                bounds: WindowInsetsAnimationCompat.BoundsCompat
            ): WindowInsetsAnimationCompat.BoundsCompat {
                // 仅处理 IME 动画，忽略状态栏、导航栏等其他 insets 动画
                if (animation.typeMask and WindowInsetsCompat.Type.ime() != 0) {
                    val startHeight = currentImeHeight()
                    imeVisibleAtStart = startHeight > 0
                    keyboardCallback?.invoke(startHeight, "start")
                }
                return super.onStart(animation, bounds)
            }

            override fun onProgress(
                insets: WindowInsetsCompat,
                runningAnimations: MutableList<WindowInsetsAnimationCompat>
            ): WindowInsetsCompat {
                // 只有当运行列表中存在 IME 相关动画时才上报 running
                var isImeAnimating = false
                for (animation in runningAnimations) {
                    if (animation.typeMask and WindowInsetsCompat.Type.ime() != 0) {
                        isImeAnimating = true
                        break
                    }
                }
                if (isImeAnimating) {
                    val height = insets.getInsets(WindowInsetsCompat.Type.ime()).bottom
                    lastRunningHeight = height
                    keyboardCallback?.invoke(height, "running")
                }
                return insets
            }

            override fun onEnd(animation: WindowInsetsAnimationCompat) {
                // 仅处理 IME 动画，忽略其他 insets 动画
                if (animation.typeMask and WindowInsetsCompat.Type.ime() != 0) {
                    val rootInsets = decorView?.let { ViewCompat.getRootWindowInsets(it) }
                    val height: Int = if (rootInsets != null) {
                        // 能从根 WindowInsets 读取到实际 IME 高度时以实际值为准
                        rootInsets.getInsets(WindowInsetsCompat.Type.ime()).bottom
                    } else {
                        // 取不到时：收起动画结束为 0，弹出动画结束用最后一次 running 高度
                        if (imeVisibleAtStart) 0 else lastRunningHeight
                    }
                    keyboardCallback?.invoke(height, "end")
                }
                super.onEnd(animation)
            }
        }

        animationCallback = cb
        ViewCompat.setWindowInsetsAnimationCallback(view, cb)
    }

    /**
     * 注销键盘动画进度回调，并清空内部引用避免内存泄漏
     */
    fun offKeyboardAnimationChangeKotlin() {
        val view = decorView
        if (view != null) {
            ViewCompat.setWindowInsetsAnimationCallback(view, null)
        }
        decorView = null
        animationCallback = null
        keyboardCallback = null
        lastRunningHeight = 0
        imeVisibleAtStart = false
    }

    /**
     * 读取当前 decorView 根 WindowInsets 上的 IME 高度（物理像素）
     * 读不到时返回最后一次 running 记录的高度
     */
    private fun currentImeHeight(): Int {
        val view = decorView ?: return lastRunningHeight
        val rootInsets = ViewCompat.getRootWindowInsets(view) ?: return lastRunningHeight
        return rootInsets.getInsets(WindowInsetsCompat.Type.ime()).bottom
    }
}
