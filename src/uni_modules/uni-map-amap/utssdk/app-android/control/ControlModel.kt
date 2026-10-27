package uts.sdk.modules.uniMapAmap.control

class ControlPosition(val left: Float, val top: Float, val width: Float, val height: Float)

class ControlModel(val position: ControlPosition, val iconPath: String?) {
    var id: Int? = null
    var clickable: Boolean = false
}
