package uts.sdk.modules.uniMapAmap.marker

/**
 * Label 数据模型（对齐 iOS AmapMarkerLabelModel 默认值）
 * 颜色为 ARGB Int，尺寸单位为 px（胶水层已乘 density）
 */
class LabelModel {
    var content: String = ""
    var color: Int = 0xFF000000.toInt()
    var fontSize: Float = 14f
    var x: Float = 0f
    var y: Float = 0f
    var borderWidth: Float = 0f
    var borderColor: Int = 0x00000000
    var bgColor: Int = 0xFFFFFFFF.toInt()
    var borderRadius: Float = 0f
    var padding: Float = 5f
    var textAlign: String = "left"
}
