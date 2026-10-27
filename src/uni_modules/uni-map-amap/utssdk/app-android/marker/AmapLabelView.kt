package uts.sdk.modules.uniMapAmap.marker

import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.graphics.Path
import android.graphics.RectF
import android.os.Build
import android.text.Layout
import android.text.StaticLayout
import android.text.TextPaint
import android.util.TypedValue
import android.view.Gravity
import android.view.View
import android.widget.FrameLayout
import android.widget.TextView
import kotlin.math.ceil
import kotlin.math.max
import kotlin.math.min

/**
 * 自绘 marker 常驻标签视图（对齐 iOS AmapMarkerLabelView）
 *
 * 结构：FrameLayout 承载背景绘制（圆角矩形 + 阴影，无箭头，区别于 callout），
 * 内部 TextView 承载多行文本。不响应任何点击（对齐 iOS isUserInteractionEnabled = false）。
 * 尺寸在 apply() 中静态计算：文本区 + padding/border 内边距。
 */
class AmapLabelView(context: Context) : FrameLayout(context) {
    companion object {
        // 与 iOS AmapMarkerLabelView 常量一致（dp 单位，绘制时乘 density）
        private const val MAXIMUM_WIDTH_DP = 300f
        private const val HORIZONTAL_SCREEN_INSET_DP = 24f
        // iOS shadowOpacity 0.18 -> alpha 46(0x2E)，radius 4dp，offset (0, 2dp)
        private const val SHADOW_COLOR = 0x2E000000
        private const val SHADOW_RADIUS_DP = 4f
        private const val SHADOW_OFFSET_Y_DP = 2f
    }

    private val textView = TextView(context)
    private val fillPaint = Paint(Paint.ANTI_ALIAS_FLAG)
    private val strokePaint = Paint(Paint.ANTI_ALIAS_FLAG)
    private val bodyPath = Path()
    private val arcRect = RectF()

    private var model = LabelModel()
    private var density = 1f
    private var labelWidth = 0
    private var labelHeight = 0
    private var viewWidth = 0
    private var viewHeight = 0
    private var contentInset = 0f

    init {
        setWillNotDraw(false)
        setLayerType(LAYER_TYPE_SOFTWARE, null)
        setBackgroundColor(Color.TRANSPARENT)
        // 对齐 iOS isUserInteractionEnabled = false，标签不响应任何点击
        isClickable = false
        textView.isClickable = false
        addView(textView)
    }

    /**
     * 应用标签样式并触发重新布局
     * @param model LabelModel
     * @param density Float 屏幕密度（px = dp * density）
     */
    fun apply(model: LabelModel, density: Float) {
        this.model = model
        this.density = density

        val fontSize = max(1f, model.fontSize)
        val padding = max(0f, model.padding)
        val borderWidth = max(0f, model.borderWidth)
        contentInset = borderWidth + padding

        val availableScreenWidth = max(1f, resources.displayMetrics.widthPixels - 2f * HORIZONTAL_SCREEN_INSET_DP * density)
        val maximumBodyWidth = min(MAXIMUM_WIDTH_DP * density, availableScreenWidth)
        val maximumLabelWidth = max(1f, maximumBodyWidth - 2f * (padding + borderWidth))

        textView.text = model.content
        textView.setTextSize(TypedValue.COMPLEX_UNIT_PX, fontSize)
        textView.setTextColor(model.color)
        textView.gravity = textGravity(model.textAlign)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            textView.breakStrategy = Layout.BREAK_STRATEGY_SIMPLE
        }

        // 用 TextView 自身画笔测量，保证测量与渲染一致；对齐 iOS byCharWrapping 的逐字符断行语义
        val textPaint = TextPaint(textView.paint)
        val alignment = textAlignment(model.textAlign)
        val maximumLabelWidthInt = maximumLabelWidth.toInt()
        val textLayout: StaticLayout = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            StaticLayout.Builder.obtain(
                model.content, 0, model.content.length, textPaint, maximumLabelWidthInt
            ).setAlignment(alignment).build()
        } else {
            @Suppress("DEPRECATION")
            StaticLayout(
                model.content, 0, model.content.length, textPaint,
                maximumLabelWidthInt, alignment, 1f, 0f, true
            )
        }

        var measuredWidth = 0f
        for (index in 0 until textLayout.lineCount) {
            measuredWidth = max(measuredWidth, textLayout.getLineWidth(index))
        }
        val resolvedLabelWidth = max(1f, min(maximumLabelWidth, ceil(measuredWidth)))
        val resolvedLabelHeight = max(fontSize + 2f * density, ceil(textLayout.height.toFloat()))

        labelWidth = resolvedLabelWidth.toInt()
        labelHeight = resolvedLabelHeight.toInt()
        val bodyWidth = ceil(resolvedLabelWidth + 2f * (padding + borderWidth))
        val bodyHeight = ceil(resolvedLabelHeight + 2f * (padding + borderWidth))
        viewWidth = bodyWidth.toInt()
        viewHeight = bodyHeight.toInt()

        // 立即完成测量，调用方可直接使用 measuredWidth/measuredHeight 定位
        measure(
            View.MeasureSpec.makeMeasureSpec(viewWidth, View.MeasureSpec.EXACTLY),
            View.MeasureSpec.makeMeasureSpec(viewHeight, View.MeasureSpec.EXACTLY)
        )
        requestLayout()
        invalidate()
    }

    override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        setMeasuredDimension(viewWidth, viewHeight)
        textView.measure(
            View.MeasureSpec.makeMeasureSpec(labelWidth, View.MeasureSpec.EXACTLY),
            View.MeasureSpec.makeMeasureSpec(labelHeight, View.MeasureSpec.EXACTLY)
        )
    }

    override fun onLayout(changed: Boolean, left: Int, top: Int, right: Int, bottom: Int) {
        super.onLayout(changed, left, top, right, bottom)
        val inset = contentInset.toInt()
        textView.layout(inset, inset, inset + labelWidth, inset + labelHeight)
    }

    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)
        val borderWidth = max(0f, model.borderWidth)
        val inset = max(0.5f, borderWidth / 2f)
        val bodyLeft = inset
        val bodyTop = inset
        val bodyRight = width - inset
        val bodyBottom = height - inset
        if (bodyRight - bodyLeft <= 0f || bodyBottom - bodyTop <= 0f) {
            return
        }

        val bodyWidth = bodyRight - bodyLeft
        val bodyHeight = bodyBottom - bodyTop
        val radius = min(max(0f, model.borderRadius), min(bodyWidth, bodyHeight) / 2f)

        bodyPath.reset()
        arcRect.set(bodyLeft, bodyTop, bodyRight, bodyBottom)
        bodyPath.addRoundRect(arcRect, radius, radius, Path.Direction.CW)

        fillPaint.style = Paint.Style.FILL
        fillPaint.color = model.bgColor
        fillPaint.setShadowLayer(SHADOW_RADIUS_DP * density, 0f, SHADOW_OFFSET_Y_DP * density, SHADOW_COLOR)
        canvas.drawPath(bodyPath, fillPaint)

        if (borderWidth > 0f) {
            strokePaint.style = Paint.Style.STROKE
            strokePaint.color = model.borderColor
            strokePaint.strokeWidth = borderWidth
            canvas.drawPath(bodyPath, strokePaint)
        }
    }

    private fun textGravity(align: String): Int {
        return when (align.lowercase()) {
            "center" -> Gravity.CENTER
            "right" -> Gravity.END or Gravity.CENTER_VERTICAL
            else -> Gravity.START or Gravity.CENTER_VERTICAL
        }
    }

    private fun textAlignment(align: String): Layout.Alignment {
        return when (align.lowercase()) {
            "center" -> Layout.Alignment.ALIGN_CENTER
            "right" -> Layout.Alignment.ALIGN_OPPOSITE
            else -> Layout.Alignment.ALIGN_NORMAL
        }
    }
}
