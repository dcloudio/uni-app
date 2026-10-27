package uts.sdk.modules.uniMapAmap.polyline

class PolylinePointModel(val latitude: Double, val longitude: Double)

class PolylineModel(val points: List<PolylinePointModel>) {
    var color: Int? = null
    var colorList: List<Int>? = null
    var width: Float? = null
    var dottedLine: Boolean = false
    var arrowLine: Boolean = false
    var arrowIconPath: String? = null
    var borderColor: Int? = null
    var borderWidth: Float? = null
}
