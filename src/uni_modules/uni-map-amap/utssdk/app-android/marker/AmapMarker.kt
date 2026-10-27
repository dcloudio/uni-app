package uts.sdk.modules.uniMapAmap.marker

import android.animation.Animator
import android.animation.AnimatorListenerAdapter
import android.animation.ValueAnimator
import android.content.Context
import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.Point
import android.view.View
import android.view.ViewGroup
import android.view.animation.LinearInterpolator
import android.widget.FrameLayout
import androidx.annotation.DrawableRes
import com.amap.api.maps.AMap
import com.amap.api.maps.model.BitmapDescriptorFactory
import com.amap.api.maps.model.LatLng
import com.amap.api.maps.model.Marker
import com.amap.api.maps.model.MarkerOptions
import uts.sdk.modules.uniMapAmap.FrescoImageLoader
import uts.sdk.modules.uniMapAmap.ICallBack
import uts.sdk.modules.uniMapAmap.latlng.LatLngModel

class AmapMarker(
    var markerModel: MarkerModel,
    val aMap: AMap,
    val context: Context,
    private val containerView: ViewGroup?
) {
    private var mMarker: Marker? = null
    private var calloutView: AmapCalloutView? = null
    private var labelView: AmapLabelView? = null
    private var mCalloutTapHandler: ((Int) -> Unit)? = null
    private var mLoadedIconWidth = 0
    private var mLoadedIconHeight = 0
    // 气泡可见性：BYCLICK 逻辑状态 + 是否移出可视区（移出时隐藏，避免残留在边界）
    private var calloutByClickVisible = false
    private var calloutOffscreen = false
    // 已销毁标记：图片异步回调在销毁后不得再操作地图/视图（避免幽灵 marker 与残留）
    private var destroyed = false
    // 当前图标加载请求，销毁或重新加载时取消，避免回调悬挂与内存泄漏
    private var iconLoadHandle: FrescoImageLoader.LoadHandle? = null

    init {
        setupCallout(markerModel)
        setupLabel(markerModel)
        createMarkerOptions(markerModel, object : ICallBack {
            override fun callback(param: Any?) {
                if (destroyed) {
                    return
                }
                if (param is MarkerOptions) {
                    mMarker = aMap.addMarker(param)
                    refreshCalloutPosition()
                    refreshLabelPosition()
                }
            }
        })
    }

    private fun createMarkerOptions(markerModel: MarkerModel, completeCallback: ICallBack) {
        createBitmapDescriptor(markerModel.iconPath, markerModel.width?.toInt(), markerModel.height?.toInt(), object : ICallBack {
            override fun callback(param: Any?) {
                if (destroyed) {
                    return
                }
                val markerOptions = MarkerOptions()
                    .position(LatLng(markerModel.latitude, markerModel.longitude))
                    .title(markerModel.title)
                markerOptions.rotateAngle(amapAngleFromClockwise(markerModel.rotate.toFloat()))
                markerOptions.alpha(markerModel.alpha)
                markerOptions.anchor(markerModel.anchor[0], markerModel.anchor[1])

                if (param is Bitmap) {
                    markerOptions.icon(BitmapDescriptorFactory.fromBitmap(param))
                }
                completeCallback.callback(markerOptions)
            }
        })
    }

    fun updateMarkerOptions(markerModel: MarkerModel) {
        this.markerModel = markerModel
        setupCallout(markerModel)
        setupLabel(markerModel)
        createBitmapDescriptor(markerModel.iconPath, markerModel.width?.toInt(), markerModel.height?.toInt(), object : ICallBack {
            override fun callback(param: Any?) {
                if (destroyed) {
                    return
                }
                mMarker?.position = LatLng(markerModel.latitude, markerModel.longitude)
                mMarker?.title = markerModel.title
                mMarker?.rotateAngle = amapAngleFromClockwise(markerModel.rotate.toFloat())
                mMarker?.alpha = markerModel.alpha
                mMarker?.setAnchor(markerModel.anchor[0], markerModel.anchor[1])
                if (param is Bitmap) {
                    mMarker?.setIcon(BitmapDescriptorFactory.fromBitmap(param))
                }
                refreshCalloutPosition()
                refreshLabelPosition()
            }
        })
    }

    /**
     * 解析 callout 模型：优先取 marker.callout；
     * 无 callout 且 title 非空时降级为默认样式 callout（content = title）；
     * content 为空则不创建（对齐 iOS configureCallout）
     */
    private fun resolveCalloutModel(markerModel: MarkerModel): CalloutModel? {
        val model = markerModel.callout ?: run {
            val title = markerModel.title
            if (!title.isNullOrEmpty()) {
                CalloutModel().apply { content = title }
            } else {
                null
            }
        } ?: return null
        if (model.content.isEmpty()) {
            return null
        }
        return model
    }

    private fun setupCallout(markerModel: MarkerModel) {
        val calloutModel = resolveCalloutModel(markerModel)
        if (calloutModel == null) {
            removeCalloutView()
            return
        }
        val container = containerView ?: return

        var view = calloutView
        if (view == null) {
            view = AmapCalloutView(context)
            view.markerId = markerModel.id
            view.onTapped = mCalloutTapHandler
            // 初始置于屏幕外，待 marker 就位后由 refreshCalloutPosition 移入，避免闪现
            val layoutParams = FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.WRAP_CONTENT,
                FrameLayout.LayoutParams.WRAP_CONTENT
            )
            layoutParams.leftMargin = -10000
            layoutParams.topMargin = -10000
            container.addView(view, layoutParams)
            calloutView = view
        }
        view.apply(calloutModel, context.resources.displayMetrics.density)
        // ALWAYS 常驻可见；BYCLICK 初始隐藏（对齐 iOS）
        calloutByClickVisible = isAlwaysCallout()
        refreshCalloutPosition()
    }

    /**
     * 依据 BYCLICK 状态与是否移出可视区，综合决定气泡可见性
     */
    private fun applyCalloutVisibility() {
        val view = calloutView ?: return
        val visible = !calloutOffscreen && (isAlwaysCallout() || calloutByClickVisible)
        view.visibility = if (visible) View.VISIBLE else View.INVISIBLE
    }

    private fun removeCalloutView() {
        val view = calloutView ?: return
        (view.parent as? ViewGroup)?.removeView(view)
        view.onTapped = null
        calloutView = null
    }

    /**
     * 解析 label 模型：仅 marker.label 非空且 content 非空才创建（无 title 降级，对齐 iOS configureLabel）
     */
    private fun setupLabel(markerModel: MarkerModel) {
        val labelModel = markerModel.label
        if (labelModel == null || labelModel.content.isEmpty()) {
            removeLabelView()
            return
        }
        val container = containerView ?: return

        var view = labelView
        if (view == null) {
            view = AmapLabelView(context)
            // 初始置于屏幕外，待 marker 就位后由 refreshLabelPosition 移入，避免闪现
            val layoutParams = FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.WRAP_CONTENT,
                FrameLayout.LayoutParams.WRAP_CONTENT
            )
            layoutParams.leftMargin = -10000
            layoutParams.topMargin = -10000
            container.addView(view, layoutParams)
            labelView = view
        }
        view.apply(labelModel, context.resources.displayMetrics.density)
        // label 始终可见，无 ALWAYS/BYCLICK 概念（对齐 iOS）
        view.visibility = View.VISIBLE
        refreshLabelPosition()
    }

    private fun removeLabelView() {
        val view = labelView ?: return
        (view.parent as? ViewGroup)?.removeView(view)
        labelView = null
    }

    /**
     * 按当前相机状态刷新气泡位置：
     * 屏幕点 = aMap.projection.toScreenLocation(marker.position)；
     * 气泡水平居中于 marker（按 anchor 换算图标中心）；底部箭头尖对准 marker 图标顶部。
     * marker 未就位时跳过。
     */
    fun refreshCalloutPosition() {
        val view = calloutView ?: return
        val marker = mMarker ?: return
        val screenPoint = aMap.projection.toScreenLocation(marker.position)
        val iconWidth = markerModel.width?.toInt() ?: mLoadedIconWidth
        val iconHeight = markerModel.height?.toInt() ?: mLoadedIconHeight
        val anchorX = markerModel.anchor[0]
        val anchorY = markerModel.anchor[1]
        val viewWidth = view.measuredWidth
        val viewHeight = view.measuredHeight
        if (viewWidth <= 0 || viewHeight <= 0) {
            return
        }

        val mapWidth = containerView?.width ?: 0
        val mapHeight = containerView?.height ?: 0
        // marker 完全移出可视区（含图标尺寸余量）时隐藏气泡，避免残留在边界
        calloutOffscreen = mapWidth > 0 && mapHeight > 0 && (
            screenPoint.x < -iconWidth || screenPoint.x > mapWidth + iconWidth ||
                screenPoint.y < -iconHeight || screenPoint.y > mapHeight + iconHeight)
        if (calloutOffscreen) {
            applyCalloutVisibility()
            return
        }
        val centerX = screenPoint.x + ((0.5f - anchorX) * iconWidth).toInt()
        val iconTopY = screenPoint.y - (anchorY * iconHeight).toInt()
        val iconBottomY = screenPoint.y + ((1f - anchorY) * iconHeight).toInt()

        // 上方空间不足时翻转到 marker 下方显示（对齐地图原生 InfoWindow 边界避让行为）
        val spaceAbove = iconTopY
        val spaceBelow = mapHeight - iconBottomY
        val showAbove = if (spaceAbove >= viewHeight) true else if (spaceBelow >= viewHeight) false else true
        var top : Int
        if (showAbove) {
            top = iconTopY - viewHeight
            view.arrowDown = true
        } else {
            top = iconBottomY
            view.arrowDown = false
        }

        var left = centerX - viewWidth / 2
        if (mapWidth > 0) {
            if (left < 0) left = 0
            if (left + viewWidth > mapWidth) left = mapWidth - viewWidth
        }
        if (mapHeight > 0 && top + viewHeight > mapHeight) {
            top = mapHeight - viewHeight
        }
        if (top < 0) top = 0

        val layoutParams = view.layoutParams as? FrameLayout.LayoutParams
        if (layoutParams != null) {
            layoutParams.width = viewWidth
            layoutParams.height = viewHeight
            layoutParams.leftMargin = left
            layoutParams.topMargin = top
        }
        // 相机逐帧刷新场景，直接 layout 避免触发容器整体重排
        view.layout(left, top, left + viewWidth, top + viewHeight)
        applyCalloutVisibility()
    }

    /**
     * 按当前相机状态刷新标签位置（对齐 iOS positionLabel 语义）：
     * label 左上角 = (图标右边界 + x, 图标顶边 + y)，默认紧贴图标右侧显示、顶部与图标平齐，不遮挡图标。
     * 图标右边界 = screenPoint.x + (1 - anchorX) * iconW；图标顶边 = screenPoint.y - anchorY * iconH。
     * iconW/iconH 与 callout 定位一致（markerModel 优先，否则 Fresco 回调实际尺寸）。
     * marker 未就位时跳过。
     */
    fun refreshLabelPosition() {
        val view = labelView ?: return
        val marker = mMarker ?: return
        val labelModel = markerModel.label ?: return
        val screenPoint = aMap.projection.toScreenLocation(marker.position)
        val iconWidth = markerModel.width?.toInt() ?: mLoadedIconWidth
        val iconHeight = markerModel.height?.toInt() ?: mLoadedIconHeight
        val anchorX = markerModel.anchor[0]
        val anchorY = markerModel.anchor[1]
        val viewWidth = view.measuredWidth
        val viewHeight = view.measuredHeight
        if (viewWidth <= 0 || viewHeight <= 0) {
            return
        }

        val mapWidth = containerView?.width ?: 0
        val mapHeight = containerView?.height ?: 0
        // marker 完全移出可视区时隐藏标签
        val offscreen = mapWidth > 0 && mapHeight > 0 && (
            screenPoint.x < -iconWidth || screenPoint.x > mapWidth + iconWidth ||
                screenPoint.y < -iconHeight || screenPoint.y > mapHeight + iconHeight)
        if (offscreen) {
            view.visibility = View.INVISIBLE
            return
        }
        view.visibility = View.VISIBLE
        val iconRight = screenPoint.x + ((1f - anchorX) * iconWidth).toInt()
        val iconTop = screenPoint.y - (anchorY * iconHeight).toInt()
        var left = (iconRight + labelModel.x).toInt()
        var top = (iconTop + labelModel.y).toInt()
        // 边界内约束，避免标签越界被裁剪
        if (mapWidth > 0) {
            if (left < 0) left = 0
            if (left + viewWidth > mapWidth) left = mapWidth - viewWidth
        }
        if (mapHeight > 0) {
            if (top < 0) top = 0
            if (top + viewHeight > mapHeight) top = mapHeight - viewHeight
        }

        val layoutParams = view.layoutParams as? FrameLayout.LayoutParams
        if (layoutParams != null) {
            layoutParams.width = viewWidth
            layoutParams.height = viewHeight
            layoutParams.leftMargin = left
            layoutParams.topMargin = top
        }
        // 相机逐帧刷新场景，直接 layout 避免触发容器整体重排
        view.layout(left, top, left + viewWidth, top + viewHeight)
    }

    /**
     * 同步刷新 callout 与 label 位置（相机变化时由 MarkerManager 调用）
     */
    fun refreshOverlayPositions() {
        refreshCalloutPosition()
        refreshLabelPosition()
    }

    private fun isAlwaysCallout(): Boolean {
        val model = markerModel.callout ?: return false
        return model.display.uppercase() == "ALWAYS"
    }

    /**
     * marker 点击时切换 BYCLICK 气泡可见性（ALWAYS 不响应）
     */
    fun toggleByClickCallout() {
        if (calloutView == null || isAlwaysCallout()) {
            return
        }
        calloutByClickVisible = !calloutByClickVisible
        applyCalloutVisibility()
    }

    /**
     * 地图点击时隐藏 BYCLICK 气泡（ALWAYS 不受影响）
     */
    fun hideByClickCallout() {
        if (calloutView == null || isAlwaysCallout()) {
            return
        }
        calloutByClickVisible = false
        applyCalloutVisibility()
    }

    /**
     * 将气泡提升到容器最上层
     */
    fun bringCalloutToFront() {
        calloutView?.bringToFront()
    }

    /**
     * 将标签提升到容器最上层（与气泡一致，marker 点击时调用）
     */
    fun bringLabelToFront() {
        labelView?.bringToFront()
    }

    /**
     * 注入气泡点击回调（回传 markerId）
     */
    fun setCalloutTapHandler(handler: ((Int) -> Unit)?) {
        mCalloutTapHandler = handler
        calloutView?.onTapped = handler
    }

    private var errorBitmap: Bitmap? = null
    private fun createBitmapDescriptor(iconPath: String, width: Int?, height: Int?, callback: ICallBack) {
        // 取消上一次未完成的加载请求（更新/重建图标时）
        clearIconLoad()
        iconLoadHandle = FrescoImageLoader.loadBitmap(context, iconPath, width, height, { resource ->
            if (destroyed) {
                return@loadBitmap
            }
            mLoadedIconWidth = resource.width
            mLoadedIconHeight = resource.height
            callback.callback(resource)
        }, {
            if (destroyed) {
                return@loadBitmap
            }
            val drawableId = context.resources.getIdentifier("uni_app_map_marker_ic", "drawable", context.packageName)
            val fallbackBitmap = if (drawableId != 0) {
                getBitmapFromDrawable(drawableId, width, height)
            } else {
                null
            }
            errorBitmap = fallbackBitmap
            if (fallbackBitmap != null) {
                mLoadedIconWidth = fallbackBitmap.width
                mLoadedIconHeight = fallbackBitmap.height
            }
            callback.callback(fallbackBitmap)
        })
    }

    /**
     * 取消当前图标加载请求（Fresco），避免回调悬挂与内存泄漏
     */
    private fun clearIconLoad() {
        val handle = iconLoadHandle ?: return
        iconLoadHandle = null
        handle.cancel()
    }

    private fun getBitmapFromDrawable(@DrawableRes drawableRes: Int, width: Int?, height: Int?): Bitmap? {
        val drawable = context.getDrawable(drawableRes) ?: return null
        val bitmap = Bitmap.createBitmap(width ?: drawable.intrinsicWidth, height ?: drawable.intrinsicHeight, Bitmap.Config.ARGB_8888)
        val canvas = Canvas(bitmap)
        drawable.setBounds(0, 0, width ?: canvas.width, height ?: canvas.height)
        drawable.draw(canvas)
        return bitmap
    }

    fun getRealMarker(): Marker? {
        return mMarker
    }

    // region context 动画（translateMarker / moveAlong）

    /**
     * 当前移动动画引用（translateMarker / moveAlong 自绘 ValueAnimator），
     * 新动画启动前统一取消，实现重复调用打断前次动画（对齐 iOS generation 语义）
     */
    private var moveAnimator: ValueAnimator? = null

    /**
     * 取消进行中的移动动画（不触发完成回调）
     */
    fun cancelMoveAnimations() {
        moveAnimator?.cancel()
        moveAnimator = null
    }

    /**
     * 平移 marker 到目标点，带动画（绕图标中心顺时针旋转，微信/iOS 语义）
     *
     * 高德 rotateAngle 为绕 anchor 的逆时针旋转，与目标语义存在两点差异：
     * 1. 方向：顺时针 θ 转换为 (360-θ)%360
     * 2. 轴心：通过每帧中心点补偿实现绕中心旋转——中心目标 C(t) 线性插值，
     *    anchor(t) = C(t) + R(θ(t))·v（v = anchor-中心 原像素向量，R 为屏幕系顺时针矩阵），
     *    position 设为 anchor(t) 的反投影经纬度；终态中心视觉 = target - v（微信布局中心）
     * 调度对齐 iOS：moveWithRotate=false 且有旋转时先旋转（30% 时长）再平移（70% 时长）；
     * autoRotate 按移动方向方位角；动画期间驱动 callout/label 跟随刷新
     */
    fun translateMarker(
        destination: LatLngModel,
        rotate: Double?,
        moveWithRotate: Boolean?,
        autoRotate: Boolean,
        duration: Double?,
        callback: ICallBack
    ) {
        val marker = mMarker
        if (marker == null) {
            callback.callback(false)
            return
        }
        cancelMoveAnimations()
        val totalDuration = (duration ?: 1000.0).toLong().coerceAtLeast(1L)
        val target = LatLng(destination.latitude, destination.longitude)
        val startAnchor = marker.position

        // 角度统一为顺时针语义（微信/iOS）：正北为 0，顺时针增加
        val thetaStart = normalizeClockwise(markerModel.rotate.toFloat())
        var thetaEnd = thetaStart
        if (rotate != null) {
            thetaEnd = normalizeClockwise(rotate.toFloat())
        } else if (autoRotate) {
            val dx = target.longitude - startAnchor.longitude
            val dy = target.latitude - startAnchor.latitude
            if (dx != 0.0 || dy != 0.0) {
                thetaEnd = normalizeClockwise(Math.toDegrees(Math.atan2(dx, dy)).toFloat())
            }
        }

        // anchor 相对图标中心的原始像素向量（v = anchor - center）
        val iconW = markerModel.width ?: mLoadedIconWidth.toDouble()
        val iconH = markerModel.height ?: mLoadedIconHeight.toDouble()
        val vx = ((markerModel.anchor[0] - 0.5f) * iconW).toFloat()
        val vy = ((markerModel.anchor[1] - 0.5f) * iconH).toFloat()

        val rotateFirst = thetaEnd != thetaStart && moveWithRotate == false
        val samePosition = startAnchor.latitude == target.latitude && startAnchor.longitude == target.longitude

        if (totalDuration <= 0L || (samePosition && !rotateFirst)) {
            applyTranslateEndState(marker, target, thetaEnd, vx, vy)
            callback.callback(true)
            return
        }

        val animator = ValueAnimator.ofFloat(0f, 1f)
        animator.duration = totalDuration
        animator.interpolator = LinearInterpolator()
        animator.addUpdateListener { anim ->
            val f = anim.animatedValue as Float
            // 先转后移：前 30% 只旋转，后 70% 只平移；否则旋转与平移同步
            val thetaF = if (rotateFirst) {
                lerpClockwise(thetaStart, thetaEnd, (f / 0.3f).coerceAtMost(1f))
            } else {
                lerpClockwise(thetaStart, thetaEnd, f)
            }
            val moveF = if (rotateFirst) {
                ((f - 0.3f) / 0.7f).coerceIn(0f, 1f)
            } else {
                f
            }
            applyClockwiseFrame(marker, startAnchor, target, thetaStart, thetaF, moveF, vx, vy)
            refreshOverlayPositions()
        }
        animator.addListener(object : AnimatorListenerAdapter() {
            override fun onAnimationEnd(animation: Animator) {
                applyTranslateEndState(marker, target, thetaEnd, vx, vy)
                callback.callback(true)
            }
        })
        animator.start()
        moveAnimator = animator
    }

    /**
     * 单帧应用：中心点线性插值 + anchor 旋转补偿（绕中心旋转的等效实现）
     * 投影取当帧值，动画期间地图拖动时保持相对正确
     */
    private fun applyClockwiseFrame(
        marker: Marker,
        startAnchor: LatLng,
        target: LatLng,
        thetaStart: Float,
        thetaF: Float,
        moveF: Float,
        vx: Float,
        vy: Float
    ) {
        val projection = aMap.projection
        val startScreen = projection.toScreenLocation(startAnchor)
        val targetScreen = projection.toScreenLocation(target)
        // 起始视觉中心 = startAnchor + R(θ_start)·(-v)；终点布局中心 = target + (-v)
        val startOffset = rotateClockwise(-vx, -vy, thetaStart)
        val cStartX = startScreen.x + startOffset[0]
        val cStartY = startScreen.y + startOffset[1]
        val cEndX = targetScreen.x - vx
        val cEndY = targetScreen.y - vy
        val cx = cStartX + (cEndX - cStartX) * moveF
        val cy = cStartY + (cEndY - cStartY) * moveF
        // anchor(t) = C(t) + R(θ(t))·v
        val anchorOffset = rotateClockwise(vx, vy, thetaF)
        val ax = cx + anchorOffset[0]
        val ay = cy + anchorOffset[1]
        marker.setRotateAngle(amapAngleFromClockwise(thetaF))
        marker.setPosition(projection.fromScreenLocation(Point(Math.round(ax), Math.round(ay))))
    }

    /**
     * 终态：视觉对齐微信布局（中心 = target - v），旋转角 θ_end，同步模型后回调
     */
    private fun applyTranslateEndState(marker: Marker, target: LatLng, thetaEnd: Float, vx: Float, vy: Float) {
        val projection = aMap.projection
        val targetScreen = projection.toScreenLocation(target)
        // anchor_final = C_end + R(θ_end)·v = (target - v) + R(θ_end)·v
        val anchorOffset = rotateClockwise(vx, vy, thetaEnd)
        val ax = targetScreen.x - vx + anchorOffset[0]
        val ay = targetScreen.y - vy + anchorOffset[1]
        marker.setRotateAngle(amapAngleFromClockwise(thetaEnd))
        marker.setPosition(projection.fromScreenLocation(Point(Math.round(ax), Math.round(ay))))
        markerModel.rotate = thetaEnd.toDouble()
        markerModel.latitude = target.latitude
        markerModel.longitude = target.longitude
        refreshOverlayPositions()
    }

    /**
     * 归一化顺时针角度到 [0, 360)
     */
    private fun normalizeClockwise(angle: Float): Float {
        var a = angle % 360f
        if (a < 0f) {
            a += 360f
        }
        return a
    }

    /**
     * 顺时针角度转高德逆时针 rotateAngle
     */
    private fun amapAngleFromClockwise(theta: Float): Float {
        return (360f - normalizeClockwise(theta)) % 360f
    }

    /**
     * 顺时针角度最短弧插值
     */
    private fun lerpClockwise(from: Float, to: Float, t: Float): Float {
        var d = (to - from) % 360f
        if (d > 180f) {
            d -= 360f
        } else if (d < -180f) {
            d += 360f
        }
        return normalizeClockwise(from + d * t)
    }

    /**
     * 屏幕坐标系（y 向下）顺时针旋转矩阵作用于向量
     */
    private fun rotateClockwise(dx: Float, dy: Float, theta: Float): FloatArray {
        val rad = Math.toRadians(theta.toDouble())
        val cos = Math.cos(rad).toFloat()
        val sin = Math.sin(rad).toFloat()
        return floatArrayOf(dx * cos - dy * sin, dx * sin + dy * cos)
    }

    /**
     * 沿路径移动 marker（轨迹回放），按累计距离匀速插值
     * 语义对齐 translateMarker（微信/iOS）：path 点为布局钉点（anchor 语义），
     * 每帧中心补偿实现绕图标中心顺时针旋转（中心 = 钉点 − v，anchor = 中心 + R(θ)·v），
     * 朝向按当前线段方位角指数平滑收敛（跨线段不跳变）；重复调用打断前次动画；
     * 语义对齐 iOS：path 空直接成功；duration<=0 跳到终点
     */
    fun moveAlong(path: List<LatLngModel>, duration: Double?, callback: ICallBack) {
        if (path.isEmpty()) {
            callback.callback(true)
            return
        }
        val marker = mMarker
        if (marker == null) {
            callback.callback(false)
            return
        }
        cancelMoveAnimations()
        val points = path.map { LatLng(it.latitude, it.longitude) }
        val totalDuration = duration ?: 1000.0

        if (totalDuration <= 0.0) {
            applyMoveAlongFinalState(marker, points)
            callback.callback(true)
            return
        }

        // 累计距离（经度按中点纬度 cos 修正，动画插值精度足够）
        val cumulative = DoubleArray(points.size)
        for (i in 1 until points.size) {
            cumulative[i] = cumulative[i - 1] + distanceBetween(points[i - 1], points[i])
        }
        val totalDistance = cumulative[points.size - 1]
        if (totalDistance <= 0.0) {
            applyMoveAlongFinalState(marker, points)
            callback.callback(true)
            return
        }

        // anchor 相对图标中心的原始像素向量（v = anchor - center）
        val iconW = markerModel.width ?: mLoadedIconWidth.toDouble()
        val iconH = markerModel.height ?: mLoadedIconHeight.toDouble()
        val vx = ((markerModel.anchor[0] - 0.5f) * iconW).toFloat()
        val vy = ((markerModel.anchor[1] - 0.5f) * iconH).toFloat()

        // 当前顺时针角（帧间可变捕获，指数平滑收敛到线段方向）
        var currentTheta = normalizeClockwise(markerModel.rotate.toFloat())

        val animator = ValueAnimator.ofFloat(0f, 1f)
        animator.duration = totalDuration.toLong()
        animator.interpolator = LinearInterpolator()
        animator.addUpdateListener { anim ->
            val traveled = (anim.animatedValue as Float).toDouble() * totalDistance
            // 定位当前线段
            var segIndex = 1
            while (segIndex < cumulative.size - 1 && cumulative[segIndex] < traveled) {
                segIndex++
            }
            val segStart = points[segIndex - 1]
            val segEnd = points[segIndex]
            val segLength = cumulative[segIndex] - cumulative[segIndex - 1]
            val t = if (segLength <= 0.0) 1.0 else (traveled - cumulative[segIndex - 1]) / segLength
            val lat = segStart.latitude + (segEnd.latitude - segStart.latitude) * t
            val lng = segStart.longitude + (segEnd.longitude - segStart.longitude) * t
            // 朝向目标角：当前线段方位角（顺时针语义）
            val dx = segEnd.longitude - segStart.longitude
            val dy = segEnd.latitude - segStart.latitude
            if (dx != 0.0 || dy != 0.0) {
                val targetTheta = normalizeClockwise(Math.toDegrees(Math.atan2(dx, dy)).toFloat())
                currentTheta = lerpClockwise(currentTheta, targetTheta, 0.25f)
            }
            // 中心补偿：中心 = 钉点 − v，anchor = 中心 + R(θ)·v
            val projection = aMap.projection
            val pinScreen = projection.toScreenLocation(LatLng(lat, lng))
            val anchorOffset = rotateClockwise(vx, vy, currentTheta)
            val ax = pinScreen.x - vx + anchorOffset[0]
            val ay = pinScreen.y - vy + anchorOffset[1]
            marker.setRotateAngle(amapAngleFromClockwise(currentTheta))
            marker.setPosition(projection.fromScreenLocation(Point(Math.round(ax), Math.round(ay))))
            refreshOverlayPositions()
        }
        animator.addListener(object : AnimatorListenerAdapter() {
            override fun onAnimationEnd(animation: Animator) {
                applyMoveAlongFinalState(marker, points)
                callback.callback(true)
            }
        })
        animator.start()
        moveAnimator = animator
    }

    /**
     * 终态：视觉对齐微信布局（中心 = 末点 − v，绕中心顺时针旋转至末段方向），同步模型
     */
    private fun applyMoveAlongFinalState(marker: Marker, points: List<LatLng>) {
        val last = points[points.size - 1]
        // 末段方向（顺时针语义）；单点路径保持当前模型角度
        var thetaEnd = normalizeClockwise(markerModel.rotate.toFloat())
        if (points.size >= 2) {
            val dx = last.longitude - points[points.size - 2].longitude
            val dy = last.latitude - points[points.size - 2].latitude
            if (dx != 0.0 || dy != 0.0) {
                thetaEnd = normalizeClockwise(Math.toDegrees(Math.atan2(dx, dy)).toFloat())
            }
        }
        val iconW = markerModel.width ?: mLoadedIconWidth.toDouble()
        val iconH = markerModel.height ?: mLoadedIconHeight.toDouble()
        val vx = ((markerModel.anchor[0] - 0.5f) * iconW).toFloat()
        val vy = ((markerModel.anchor[1] - 0.5f) * iconH).toFloat()
        val projection = aMap.projection
        val lastScreen = projection.toScreenLocation(last)
        val anchorOffset = rotateClockwise(vx, vy, thetaEnd)
        val ax = lastScreen.x - vx + anchorOffset[0]
        val ay = lastScreen.y - vy + anchorOffset[1]
        marker.setRotateAngle(amapAngleFromClockwise(thetaEnd))
        marker.setPosition(projection.fromScreenLocation(Point(Math.round(ax), Math.round(ay))))
        markerModel.rotate = thetaEnd.toDouble()
        markerModel.latitude = last.latitude
        markerModel.longitude = last.longitude
        refreshOverlayPositions()
    }

    private fun distanceBetween(a: LatLng, b: LatLng): Double {
        val latRad = Math.toRadians((a.latitude + b.latitude) / 2.0)
        val dx = (b.longitude - a.longitude) * Math.cos(latRad)
        val dy = b.latitude - a.latitude
        return Math.sqrt(dx * dx + dy * dy)
    }

    // endregion

    fun destroy() {
        destroyed = true
        cancelMoveAnimations()
        clearIconLoad()
        removeCalloutView()
        removeLabelView()
        mMarker?.remove()
        mMarker = null
        if (errorBitmap != null && !errorBitmap!!.isRecycled) {
            errorBitmap!!.recycle()
        }
        errorBitmap = null
    }
}
