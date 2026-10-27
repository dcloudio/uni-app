package uts.sdk.modules.uniMapAmap.control

import android.content.Context
import android.graphics.Bitmap
import android.view.ViewGroup
import android.widget.FrameLayout
import android.widget.ImageView
import uts.sdk.modules.uniMapAmap.FrescoImageLoader
import uts.sdk.modules.uniMapAmap.ICallBack
import kotlin.math.max

class ControlManager(private val containerView: ViewGroup, private val context: Context) {
    private val controlViews = mutableListOf<ImageView>()
    private val loadHandles = mutableListOf<FrescoImageLoader.LoadHandle>()
    private var controlGeneration = 0
    private var controlTapCallback: ICallBack? = null

    /**
     * 设置控件点击回调
     * @param callback ICallBack?
     */
    fun setOnControlTapCallback(callback: ICallBack?) {
        controlTapCallback = callback
    }

    fun setControls(controlModels: List<ControlModel>) {
        controlGeneration++
        val generation = controlGeneration
        clear()
        controlModels.forEach { model ->
            val control: ImageView = if (model.clickable) {
                val button = ControlButton(context, model.id)
                button.setOnClickListener {
                    val callback = controlTapCallback ?: return@setOnClickListener
                    // 必须使用 io.dcloud.uts.Map 构造（禁止 HashMap）：UTS 层 as Map<string,any> 编译为 io.dcloud.uts.Map 强转，HashMap 会 ClassCastException
                    val detail = io.dcloud.uts.Map<String, Any>()
                    detail["controlId"] = button.controlId ?: System.identityHashCode(button)
                    val param = io.dcloud.uts.Map<String, Any>()
                    param["type"] = "controltap"
                    param["detail"] = detail
                    callback.callback(param)
                }
                button
            } else {
                val imageView = ImageView(context)
                imageView.isClickable = false
                imageView
            }
            val layoutParams = FrameLayout.LayoutParams(
                max(0f, model.position.width).toInt(),
                max(0f, model.position.height).toInt()
            )
            layoutParams.leftMargin = model.position.left.toInt()
            layoutParams.topMargin = model.position.top.toInt()
            control.layoutParams = layoutParams
            control.scaleType = ImageView.ScaleType.FIT_CENTER
            containerView.addView(control)
            controlViews.add(control)

            val iconPath = model.iconPath
            if (iconPath.isNullOrBlank()) {
                return@forEach
            }
            val handle = FrescoImageLoader.loadBitmap(context, iconPath, null, null, { resource ->
                if (controlGeneration != generation) {
                    return@loadBitmap
                }
                if (control.parent !== containerView) {
                    return@loadBitmap
                }
                control.setImageBitmap(resource)
            }, {
            })
            loadHandles.add(handle)
        }
    }

    fun destroy() {
        clear()
        controlTapCallback = null
    }

    private fun clear() {
        controlViews.forEach { view ->
            containerView.removeView(view)
        }
        controlViews.clear()
        // 取消未完成的图标加载请求
        loadHandles.forEach { handle -> handle.cancel() }
        loadHandles.clear()
    }

    private class ControlButton(context: Context, val controlId: Int?) : ImageView(context)
}
