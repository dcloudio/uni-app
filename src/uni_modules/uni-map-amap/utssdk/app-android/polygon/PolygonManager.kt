package uts.sdk.modules.uniMapAmap.polygon

import com.amap.api.maps.AMap
import com.amap.api.maps.model.LatLng
import com.amap.api.maps.model.Polygon
import com.amap.api.maps.model.PolygonOptions

class PolygonManager(private val aMap: AMap) {
    private val polygons = mutableListOf<Polygon>()

    fun setPolygons(polygonModels: List<PolygonModel>) {
        clear()
        // zIndex 升序稳定排序，相等时保持数组顺序，后添加的在地图上层（对齐 iOS）
        val sortedModels = polygonModels.withIndex().sortedWith(
            compareBy({ it.value.zIndex }, { it.index })
        ).map { it.value }
        sortedModels.forEach { model ->
            if (model.points.size < 3) {
                return@forEach
            }

            val points = model.points.map { point ->
                LatLng(point.latitude, point.longitude)
            }
            val options = PolygonOptions().addAll(points)
            if (model.strokeWidth != null) {
                options.strokeWidth(model.strokeWidth!!)
            }
            if (model.strokeColor != null) {
                options.strokeColor(model.strokeColor!!)
            }
            if (model.fillColor != null) {
                options.fillColor(model.fillColor!!)
            }
            options.zIndex(model.zIndex)
            polygons.add(aMap.addPolygon(options))
        }
    }

    fun destroy() {
        clear()
    }

    private fun clear() {
        polygons.forEach { polygon ->
            polygon.remove()
        }
        polygons.clear()
    }
}
