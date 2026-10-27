package uts.sdk.modules.uniMapAmap.circle

import com.amap.api.maps.AMap
import com.amap.api.maps.model.Circle
import com.amap.api.maps.model.CircleOptions
import com.amap.api.maps.model.LatLng
import kotlin.math.max

class CircleManager(private val aMap: AMap) {
    private val circles = mutableListOf<Circle>()

    fun setCircles(circleModels: List<CircleModel>) {
        clear()
        circleModels.forEach { model ->
            val options = CircleOptions()
                .center(LatLng(model.latitude, model.longitude))
                .radius(max(0.0, model.radius))
            if (model.strokeWidth != null) {
                options.strokeWidth(max(0f, model.strokeWidth!!))
            }
            if (model.strokeColor != null) {
                options.strokeColor(model.strokeColor!!)
            }
            if (model.fillColor != null) {
                options.fillColor(model.fillColor!!)
            }
            circles.add(aMap.addCircle(options))
        }
    }

    fun destroy() {
        clear()
    }

    private fun clear() {
        circles.forEach { circle ->
            circle.remove()
        }
        circles.clear()
    }
}
