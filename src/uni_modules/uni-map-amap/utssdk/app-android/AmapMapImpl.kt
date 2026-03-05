package uts.sdk.modules.uniMapAmap

import android.content.Context
import android.view.View
import com.amap.api.maps.AMap
import com.amap.api.maps.CameraUpdateFactory
import com.amap.api.maps.MapView
import com.amap.api.maps.model.CameraPosition
import com.amap.api.maps.model.LatLng
import android.os.Bundle
import android.util.Log
import com.amap.api.location.AMapLocationClient
import com.amap.api.maps.model.MyLocationStyle
import com.amap.api.maps.model.MyLocationStyle.LOCATION_TYPE_FOLLOW
import uts.sdk.modules.uniMapAmap.marker.MarkerManager
import uts.sdk.modules.uniMapAmap.marker.MarkerModel

class AmapMapImpl : IInternalMap {
    private var mapView: MapView? = null
    private var mZoomLevel = 16f
    private var markerManager: MarkerManager? = null

    override fun getMap(context: Context): View {
		AMapLocationClient.updatePrivacyShow(context, true, true)
		AMapLocationClient.updatePrivacyAgree(context, true)
        mapView = MapView(context)
				mapView!!.onCreate(Bundle()) 
        val aMap = mapView?.map
        // 初始化 MarkerManager
        if (aMap != null) {
            markerManager = MarkerManager(aMap, context)
        }
        // 设置默认中心点和缩放级别
        val defaultLatLng = LatLng(39.917355, 116.397553) // 北京天安门
        val cameraUpdate = CameraUpdateFactory.newCameraPosition(
            CameraPosition(defaultLatLng, mZoomLevel, 0f, 0f)
        )
        aMap?.moveCamera(cameraUpdate)
        aMap?.isTrafficEnabled = true;// 显示实时交通状况
        return mapView as MapView
    }

    override fun onStart() {
        mapView?.onCreate(null)
    }

    override fun onResume() {
        mapView?.onResume()
    }

    override fun onPause() {
        mapView?.onPause()
    }

    override fun onStop() {
        // 高德地图 MapView 没有 onStop 方法
    }

    override fun onDestroy() {
        mapView?.onDestroy()
        mapView = null
    }

    override fun setCenter(latitude: Double, longitude: Double, animate: Boolean) {
        val latLng = LatLng(latitude, longitude)
        val cameraUpdate = CameraUpdateFactory.changeLatLng(latLng)
        if (animate) {
            mapView?.map?.animateCamera(cameraUpdate)
        } else {
            mapView?.map?.moveCamera(cameraUpdate)
        }
    }

    override fun setScale(zoom: Int, animate: Boolean) {
        mZoomLevel = zoom.toFloat()
        val cameraUpdate = CameraUpdateFactory.zoomTo(mZoomLevel)
        if (animate) {
            mapView?.map?.animateCamera(cameraUpdate)
        } else {
            mapView?.map?.moveCamera(cameraUpdate)
        }
    }

    override fun getScale(): Int {
        return mapView?.map?.cameraPosition?.zoom?.toInt() ?: 16
    }

    override fun setTheme(theme: String) {
        val mapType = when (theme) {
            "satellite" -> AMap.MAP_TYPE_SATELLITE
            else -> AMap.MAP_TYPE_NORMAL
        }
        mapView?.map?.mapType = mapType
    }

    override fun setMinScale(zoom: Int) {
        mapView?.map?.minZoomLevel = zoom.toFloat()
    }

    override fun setMaxScale(zoom: Int) {
        mapView?.map?.maxZoomLevel = zoom.toFloat()
    }

    override fun setLayerStyle(layerId: String) {
        mapView?.map?.mapType = layerId.toInt()
    }

    override fun setShowLocation(show: Boolean) {
        val aMap = mapView?.map
        if (aMap != null) {
            val myLocationStyle = MyLocationStyle()
            // 设置定位蓝点的样式
            myLocationStyle.myLocationType(LOCATION_TYPE_FOLLOW) // 连续定位、蓝点不会移动到地图中心点，并且蓝点会跟随设备移动
            myLocationStyle.interval(2000) // 设置连续定位模式下的定位间隔，只在连续定位模式下生效，单次定位模式下不会生效。单位为毫秒
            aMap.myLocationStyle = myLocationStyle
            aMap.isMyLocationEnabled = show
        }
    }

    override fun setMarkers(markerModels: List<MarkerModel>) {
        Log.i("AmapMapImpl", "setMarkers,size = ${markerModels.size}")
        markerManager?.setMarkers(markerModels)
    }

    override fun addMarkers(markerModels: List<MarkerModel>) {
        markerManager?.addMarkers(markerModels)
    }

    override fun removeMarkers(ids: List<Int>) {
        markerManager?.removeMarkers(ids)
    }
}

