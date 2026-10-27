package uts.sdk.modules.uniMapAmap.polygon

class PolygonPointModel(val latitude: Double, val longitude: Double)

class PolygonModel(val points: List<PolygonPointModel>) {
    var strokeWidth: Float? = null
    var strokeColor: Int? = null
    var fillColor: Int? = null
    var zIndex: Float = 0f
}
