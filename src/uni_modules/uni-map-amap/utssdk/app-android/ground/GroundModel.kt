package uts.sdk.modules.uniMapAmap.ground

import uts.sdk.modules.uniMapAmap.latlng.LatLngModel

/**
 * 自定义图片图层（GroundOverlay）数据模型
 */
class GroundModel(
    val id: String,
    val src: String,
    val southwest: LatLngModel,
    val northeast: LatLngModel,
    var visible: Boolean,
    var zIndex: Double,
    var opacity: Double
)
