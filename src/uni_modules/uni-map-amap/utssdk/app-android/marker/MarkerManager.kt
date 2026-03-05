package uts.sdk.modules.uniMapAmap.marker

import android.content.Context
import com.amap.api.maps.AMap
import com.amap.api.maps.model.Marker
import java.util.concurrent.ConcurrentHashMap

class MarkerManager(val aMap: AMap, val context: Context) {
    private var mMarkerCaches = ConcurrentHashMap<Int, AmapMarker>()

    fun setMarkers(list: List<MarkerModel>) {
        clearMarkers()
        addMarkers(list)
    }

    fun addMarkers(list: List<MarkerModel>) {
        for (markerModel in list) {
            if (mMarkerCaches.containsKey(markerModel.id)) {
                val amapMarker = mMarkerCaches[markerModel.id]
                amapMarker?.updateMarkerOptions(markerModel)
                continue
            }
            mMarkerCaches[markerModel.id] = AmapMarker(markerModel, aMap, context)
        }
    }

    fun removeMarkers(ids: List<Int>) {
        for (id in ids) {
            val marker = mMarkerCaches.remove(id)
            marker?.destroy()
        }
    }

    fun clearMarkers() {
        mMarkerCaches.forEach { (_, u) ->
            u.destroy()
        }
        mMarkerCaches.clear()
    }

    fun getAmapMarker(marker: Marker): AmapMarker? {
        mMarkerCaches.forEach { (_, u) ->
            if (u.getRealMarker() === marker) {
                return u
            }
        }
        return null
    }

    fun destroy() {
        clearMarkers()
    }
}

