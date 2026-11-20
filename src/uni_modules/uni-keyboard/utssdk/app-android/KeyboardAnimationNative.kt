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
 * callback 参数：ime 为软键盘占据的底部高度，tappable 为可点击系统栏（导航栏）高度，
 * 均为物理像素原始值；state 为 "start" / "running" / "end"。
 *
 * 注：本层只上报原始值，不做相减，最终需要抬升的高度由 UTS 胶水层决定。
 */
object KeyboardAnimationNative {

    // 当前注册回调时挂载动画回调的 decorView
    private var decorView: View? = null

    // 当前持有的 WindowInsetsAnimationCompat.Callback
    private var animationCallback: WindowInsetsAnimationCompat.Callback? = null

    // 当前注册的业务回调（单回调，多回调与 id 映射由 UTS 胶水层维护）
    private var keyboardCallback: ((Number, Number, String) -> Unit)? = null

    // 记录动画过程中最后一次上报的原始 ime.bottom，用于 onEnd 兜底
    private var lastRunningIme: Int = 0

    // 记录动画过程中最后一次上报的原始 tappableElement.bottom，用于 onEnd 兜底
    private var lastRunningTappable: Int = 0

    // 记录动画开始时键盘是否已显示，用于区分「弹出动画」与「收起动画」
    private var imeVisibleAtStart: Boolean = false

    /**
     * 注册键盘动画进度回调
     *
     * @return 是否注册成功。当没有可用的 UniActivity / decorView 时返回 false，
     *         调用方应据此保留「未注册」状态，以便后续重新尝试注册。
     */
    fun onKeyboardAnimationChangeKotlin(callback: (ime: Number, tappable: Number, state: String) -> Unit): Boolean {
        // 先清理旧引用，避免重复注册造成回调叠加或内存泄漏
        offKeyboardAnimationChangeKotlin()

        val activity: Activity = UTSAndroid.getUniActivity() ?: return false
        val view: View = activity.window?.decorView ?: return false

        keyboardCallback = callback
        decorView = view
        lastRunningIme = 0
        lastRunningTappable = 0
        imeVisibleAtStart = false

        val cb = object : WindowInsetsAnimationCompat.Callback(
            WindowInsetsAnimationCompat.Callback.DISPATCH_MODE_CONTINUE_ON_SUBTREE
        ) {
            override fun onStart(
                animation: WindowInsetsAnimationCompat,
                bounds: WindowInsetsAnimationCompat.BoundsCompat
            ): WindowInsetsAnimationCompat.BoundsCompat {
                // 仅处理 IME 动画，忽略状态栏、导航栏等其他 insets 动画
                if (isImeTypeMask(animation.typeMask)) {
                    val ime = currentIme()
                    val tappable = currentTappable()
                    imeVisibleAtStart = ime > 0
                    keyboardCallback?.invoke(ime, tappable, "start")
                }
                return super.onStart(animation, bounds)
            }

            override fun onProgress(
                insets: WindowInsetsCompat,
                runningAnimations: MutableList<WindowInsetsAnimationCompat>
            ): WindowInsetsCompat {
                // 只有当运行列表中存在 IME 相关动画时才上报 running
                if (runningAnimations.any { isImeTypeMask(it.typeMask) }) {
                    val ime = insets.getInsets(WindowInsetsCompat.Type.ime()).bottom
                    val tappable = insets.getInsets(WindowInsetsCompat.Type.tappableElement()).bottom
                    lastRunningIme = ime
                    lastRunningTappable = tappable
                    keyboardCallback?.invoke(ime, tappable, "running")
                }
                return insets
            }

            override fun onEnd(animation: WindowInsetsAnimationCompat) {
                if (isImeTypeMask(animation.typeMask)) {
                    // API>=30 能读到可用的根 WindowInsets 时以实际值为准；
                    // API<30 系统/兼容层读不到可靠的 ime 值，统一走兜底逻辑，避免弹出动画结束被写成 0
                    val rootInsets = reliableRootInsets()
                    var ime: Int
                    var tappable: Int
                    if (rootInsets != null) {
                        ime = rootInsets.getInsets(WindowInsetsCompat.Type.ime()).bottom
                        tappable = rootInsets.getInsets(WindowInsetsCompat.Type.tappableElement()).bottom
                    } else {
                        // 收起动画（开始时就已显示）结束归零，弹出动画结束用最后一次 running 值
                        ime = if (imeVisibleAtStart) 0 else lastRunningIme
                        tappable = lastRunningTappable
                    }
                    keyboardCallback?.invoke(ime, tappable, "end")
                }
                super.onEnd(animation)
            }
        }

        animationCallback = cb
        ViewCompat.setWindowInsetsAnimationCallback(view, cb)
        return true
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
        lastRunningIme = 0
        lastRunningTappable = 0
        imeVisibleAtStart = false
    }

    /**
     * 判断动画是否属于 IME（软键盘）类型
     * API<30 时 compat 上报的 typeMask 不等于 ime 位，需直接放行
     */
    private fun isImeTypeMask(typeMask: Int): Boolean {
        return android.os.Build.VERSION.SDK_INT < 30 ||
            (typeMask and WindowInsetsCompat.Type.ime() != 0)
    }

    /**
     * 读取可用于判断 ime 高度的根 WindowInsets。
     * API<30 时系统/兼容层无法提供可靠的 ime 值（往往恒为 0），直接返回 null 以走兜底逻辑。
     */
    private fun reliableRootInsets(): WindowInsetsCompat? {
        if (android.os.Build.VERSION.SDK_INT < 30) return null
        val view = decorView ?: return null
        return ViewCompat.getRootWindowInsets(view)
    }

    /**
     * 读取当前 decorView 根 WindowInsets 上的原始 ime.bottom（物理像素）
     * 读不到时返回最后一次 running 记录的值
     */
    private fun currentIme(): Int {
        val rootInsets = reliableRootInsets() ?: return lastRunningIme
        return rootInsets.getInsets(WindowInsetsCompat.Type.ime()).bottom
    }

    /**
     * 读取当前 decorView 根 WindowInsets 上的原始 tappableElement.bottom（物理像素）
     * 读不到时返回最后一次 running 记录的值
     */
    private fun currentTappable(): Int {
        val rootInsets = reliableRootInsets() ?: return lastRunningTappable
        return rootInsets.getInsets(WindowInsetsCompat.Type.tappableElement()).bottom
    }
}
