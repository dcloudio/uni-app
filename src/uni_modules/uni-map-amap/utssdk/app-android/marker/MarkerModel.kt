package uts.sdk.modules.uniMapAmap.marker

/**
 * Marker 数据模型
 */
class MarkerModel(val id: Int, var latitude: Double, var longitude: Double, val iconPath: String) {
    var title: String? = null
    var rotate: Double = 0.0
    var alpha = 1.0f
    var width: Double? = null
    var height: Double? = null
    var ariaLabel: String? = null
    var anchor = FloatArray(2)
    var label: LabelModel? = null
    var callout: CalloutModel? = null

    init {
        anchor[0] = 0.5f
        anchor[1] = 1.0f
    }
}

