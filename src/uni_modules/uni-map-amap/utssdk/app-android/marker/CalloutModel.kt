package uts.sdk.modules.uniMapAmap.marker

/**
 * Callout 数据模型（对齐 iOS AmapMarkerCalloutModel 默认值）
 * 颜色为 ARGB Int，尺寸单位为 px（胶水层已乘 density）
 */
class CalloutModel {
    var content: String = ""
    var color: Int = 0xFF000000.toInt()
    var fontSize: Float = 14f
    var borderRadius: Float = 10f
    var borderWidth: Float = 0f
    var borderColor: Int = 0x00000000
    var bgColor: Int = 0xFFFFFFFF.toInt()
    var padding: Float = 10f
    var display: String = "BYCLICK"
    var textAlign: String = "left"
}
