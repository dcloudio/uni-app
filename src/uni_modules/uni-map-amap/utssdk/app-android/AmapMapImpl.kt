package uts.sdk.modules.uniMapAmap

import android.content.Context
import android.content.pm.PackageManager
import android.view.MotionEvent
import android.view.View
import android.widget.FrameLayout
import com.amap.api.maps.AMap
import com.amap.api.maps.CameraUpdateFactory
import com.amap.api.maps.MapView
import com.amap.api.maps.model.CameraPosition
import com.amap.api.maps.model.LatLng
import com.amap.api.maps.model.LatLngBounds
import android.location.Location
import android.os.Bundle
import com.amap.api.location.AMapLocation
import com.amap.api.location.AMapLocationClient
import com.amap.api.location.AMapLocationClientOption
import com.amap.api.location.AMapLocationListener
import com.amap.api.maps.LocationSource
import com.amap.api.maps.MapsInitializer
import com.amap.api.maps.model.MyLocationStyle
import com.amap.api.maps.model.MyLocationStyle.LOCATION_TYPE_LOCATION_ROTATE_NO_CENTER
import uts.sdk.modules.uniMapAmap.circle.CircleManager
import uts.sdk.modules.uniMapAmap.circle.CircleModel
import uts.sdk.modules.uniMapAmap.control.ControlManager
import uts.sdk.modules.uniMapAmap.control.ControlModel
import uts.sdk.modules.uniMapAmap.ground.GroundManager
import uts.sdk.modules.uniMapAmap.ground.GroundModel
import uts.sdk.modules.uniMapAmap.includepoint.IncludePointModel
import uts.sdk.modules.uniMapAmap.latlng.BoundsModel
import uts.sdk.modules.uniMapAmap.latlng.LatLngModel
import uts.sdk.modules.uniMapAmap.marker.MarkerManager
import uts.sdk.modules.uniMapAmap.marker.MarkerModel
import uts.sdk.modules.uniMapAmap.polygon.PolygonManager
import uts.sdk.modules.uniMapAmap.polygon.PolygonModel
import uts.sdk.modules.uniMapAmap.polyline.PolylineManager
import uts.sdk.modules.uniMapAmap.polyline.PolylineModel

// v2
// 定位采用独立定位源（LocationSource + AMapLocationClient），与腾讯插件一致：
// 地图只负责展示蓝点，定位由定位 SDK 主动上报（可先回最后已知位置，冷启动更快上屏）
class AmapMapImpl : IInternalMap, LocationSource, AMapLocationListener {
    private var mapView: MapView? = null
    private var mapTouchHostLayout: MapTouchHostLayout? = null
    private var mZoomLevel = 16f
    private var circleManager: CircleManager? = null
    private var controlManager: ControlManager? = null
    private var markerManager: MarkerManager? = null
    private var polylineManager: PolylineManager? = null
    private var polygonManager: PolygonManager? = null
    private var groundManager: GroundManager? = null
    private var onUpdatedCallback: ICallBack? = null
    private var onMapTapCallback: ICallBack? = null
    private var onPoiTapCallback: ICallBack? = null
    private var onAnchorPointTapCallback: ICallBack? = null
    private var onRegionChangeCallback: ICallBack? = null
    // regionchange 状态机（对齐 iOS 语义、结构参照 Tencent）：
    // isChangeStart - 相机变化周期进行中（begin 已发、end 未发）
    private var isChangeStart = false
    // isSetUpdate - 程序性相机更新标记（setCenter/setScale/setRotate/setSkew/setCameraPosition 置 true）
    private var isSetUpdate = false
    // beginZoom - begin 时的缩放级别，end 时与最终 zoom 比较：变化为 scale，否则为 drag
    private var beginZoom = 0f

    // ---- 定位（LocationSource + AMapLocationClient）----
    private var locationClient: AMapLocationClient? = null
    private var locationChangedListener: LocationSource.OnLocationChangedListener? = null
    // 最近一次定位结果（供 moveToLocation / anchorpointtap 复用）
    private var currentLatitude = 0.0
    private var currentLongitude = 0.0
    private var currentBearing = 0f
    private var hasLocation = false

    override fun getMap(context: Context): View {
		// 隐私合规：地图 SDK 与定位 SDK 均需声明（11.x 起地图渲染也依赖 MapsInitializer）
		MapsInitializer.updatePrivacyShow(context, true, true)
		MapsInitializer.updatePrivacyAgree(context, true)
		AMapLocationClient.updatePrivacyShow(context, true, true)
		AMapLocationClient.updatePrivacyAgree(context, true)
        mapView = MapView(context)
		mapView!!.onCreate(/* p0 = */ Bundle())
        mapTouchHostLayout = MapTouchHostLayout(context).also { host ->
            host.addView(
                mapView,
                FrameLayout.LayoutParams(
                    FrameLayout.LayoutParams.MATCH_PARENT,
                    FrameLayout.LayoutParams.MATCH_PARENT
                )
            )
        }
        val aMap = mapView?.map
        // 设置默认中心点和缩放级别（先于相机监听注册，避免初始相机设置误触发 regionchange/updated 事件）
        val defaultLatLng = LatLng(39.917355, 116.397553) // 北京天安门
        val cameraUpdate = CameraUpdateFactory.newCameraPosition(
            CameraPosition(defaultLatLng, mZoomLevel, 0f, 0f)
        )
        aMap?.moveCamera(cameraUpdate)
        // 注册视野变化监听（regionchange 状态机，对齐 iOS 语义）：
        // begin 无 causedBy；end 的 causedBy 三态判定：程序更新(update) / zoom 变化(scale) / 其他手势(drag)。
        // 先于 updated 监听注册，保证 onCameraChangeFinish 时 end 先于 updated 触发
        aMap?.addOnCameraChangeListener(object : AMap.OnCameraChangeListener {
            override fun onCameraChange(position: CameraPosition) {
                if (!isChangeStart) {
                    // 状态先行更新，callback 为 null 也不影响状态机流转
                    isChangeStart = true
                    beginZoom = position.zoom
                    val callback = onRegionChangeCallback ?: return
                    // 必须使用 io.dcloud.uts.Map 构造（禁止 HashMap）：UTS 层 as Map<string,any> 编译为 io.dcloud.uts.Map 强转，HashMap 会 ClassCastException
                    val param = io.dcloud.uts.Map<String, Any>()
                    param["type"] = "begin"
                    param["detail"] = io.dcloud.uts.Map<String, Any>()
                    callback.callback(param)
                }
            }

            override fun onCameraChangeFinish(position: CameraPosition) {
                if (isChangeStart) {
                    // 状态先行复位，callback 为 null 也不卡死状态机
                    isChangeStart = false
                    val causedBy = if (isSetUpdate) {
                        "update"
                    } else if (position.zoom != beginZoom) {
                        "scale"
                    } else {
                        "drag"
                    }
                    // isSetUpdate 复位放在 causedBy 判定之后、回调之前
                    isSetUpdate = false
                    val callback = onRegionChangeCallback ?: return
                    val detail = io.dcloud.uts.Map<String, Any>()
                    detail["skew"] = position.tilt
                    detail["rotate"] = position.bearing
                    val param = io.dcloud.uts.Map<String, Any>()
                    param["type"] = "end"
                    param["causedBy"] = causedBy
                    param["detail"] = detail
                    callback.callback(param)
                }
            }
        })
        // 地图加载完成（瓦片首次渲染完成）触发 updated，仅一次。
        // 与腾讯行为对齐：Android addOnMapLoadedCallback（TencentMapImpl.kt）、iOS mapViewInitComplete 均只在加载完成触发，
        // 而非每次相机变化触发（此前误用相机变化监听导致 updated 频繁触发）
        aMap?.addOnMapLoadedListener {
            onUpdatedCallback?.callback(null)
        }
        // 初始化 ControlManager
        controlManager = ControlManager(mapView!!, context)
        // 初始化 MarkerManager（气泡叠加在 mapTouchHostLayout 上层）
        if (aMap != null) {
            circleManager = CircleManager(aMap)
            markerManager = MarkerManager(aMap, context, mapTouchHostLayout!!)
            polylineManager = PolylineManager(aMap, context)
            polygonManager = PolygonManager(aMap)
            groundManager = GroundManager(context, aMap)
            initLocation(aMap, context)
        }
        // 统一注册地图点击监听（高德 setOnMapClickListener 为 set 语义，单监听器）：
        // 隐藏 BYCLICK 气泡 + 回传 tap 事件（对齐 iOS mapView(_:didSingleTappedAt:) 行为）
        aMap?.setOnMapClickListener { latLng ->
            markerManager?.onMapTapped()
            val point = aMap.projection.toScreenLocation(latLng)
            // 命中蓝点附近（24dp）时不派发 tap：该场景已由 OnMapTouchListener 派发 anchorpointtap，避免同一次点击重复触发
            if (onAnchorPointTapCallback != null && hasLocation) {
                val anchorPoint = aMap.projection.toScreenLocation(LatLng(currentLatitude, currentLongitude))
                val density = mapView?.resources?.displayMetrics?.density ?: 1f
                val threshold = 24f * density
                val dx = point.x - anchorPoint.x
                val dy = point.y - anchorPoint.y
                if (dx * dx + dy * dy <= threshold * threshold) {
                    return@setOnMapClickListener
                }
            }
            val callback = onMapTapCallback ?: return@setOnMapClickListener
            val mapViewLocation = IntArray(2)
            mapView?.getLocationOnScreen(mapViewLocation)
            // 必须使用 io.dcloud.uts.Map 构造（禁止 HashMap）：UTS 层 as Map<string,any> 编译为 io.dcloud.uts.Map 强转，HashMap 会 ClassCastException
            val detail = io.dcloud.uts.Map<String, Any>()
            detail["latitude"] = latLng.latitude
            detail["longitude"] = latLng.longitude
            detail["x"] = point.x
            detail["y"] = point.y
            detail["screenX"] = point.x + mapViewLocation[0]
            detail["screenY"] = point.y + mapViewLocation[1]
            val param = io.dcloud.uts.Map<String, Any>()
            param["type"] = "tap"
            param["detail"] = detail
            callback.callback(param)
        }
        // POI 点击监听（对齐 iOS mapView(_:didTouchPois:) 行为，detail 结构对齐 iOS：latitude/longitude/name/x/y/screenX/screenY）
        aMap?.setOnPOIClickListener { poi ->
            val callback = onPoiTapCallback ?: return@setOnPOIClickListener
            val latLng = poi.coordinate
            val point = aMap.projection.toScreenLocation(latLng)
            val mapViewLocation = IntArray(2)
            mapView?.getLocationOnScreen(mapViewLocation)
            // 必须使用 io.dcloud.uts.Map 构造（禁止 HashMap）：UTS 层 as Map<string,any> 编译为 io.dcloud.uts.Map 强转，HashMap 会 ClassCastException
            val detail = io.dcloud.uts.Map<String, Any>()
            detail["latitude"] = latLng.latitude
            detail["longitude"] = latLng.longitude
            detail["name"] = poi.name ?: ""
            detail["x"] = point.x
            detail["y"] = point.y
            detail["screenX"] = point.x + mapViewLocation[0]
            detail["screenY"] = point.y + mapViewLocation[1]
            val param = io.dcloud.uts.Map<String, Any>()
            param["type"] = "poitap"
            param["detail"] = detail
            callback.callback(param)
        }
//        aMap?.isTrafficEnabled = true;// 显示实时交通状况
        aMap?.uiSettings?.isZoomControlsEnabled = false
        // 触摸监听：
        // 1. 定位锚点点击（anchorpointtap）：高德 setOnMapClickListener 不响应蓝点上的点击（被 SDK 消费），
        //    仅 setOnMapTouchListener 能收到蓝点上的触摸，故在此按 ACTION_UP 与蓝点屏幕坐标做命中判定（阈值 24dp）
        // 2. 手势按下时复位 isSetUpdate，避免程序性相机更新标记泄漏导致 regionchange causedBy 误报 update
        aMap?.setOnMapTouchListener { event ->
            when (event.actionMasked) {
                MotionEvent.ACTION_DOWN -> {
                    isSetUpdate = false
                }
                MotionEvent.ACTION_UP -> {
                    val anchorCallback = onAnchorPointTapCallback
                    if (anchorCallback != null && hasLocation) {
                        val anchorPoint = aMap.projection.toScreenLocation(LatLng(currentLatitude, currentLongitude))
                        val density = mapView?.resources?.displayMetrics?.density ?: 1f
                        val threshold = 24f * density
                        val dx = event.x - anchorPoint.x.toFloat()
                        val dy = event.y - anchorPoint.y.toFloat()
                        if (dx * dx + dy * dy <= threshold * threshold) {
                            val mapViewLocation = IntArray(2)
                            mapView?.getLocationOnScreen(mapViewLocation)
                            // 必须使用 io.dcloud.uts.Map 构造（禁止 HashMap）：UTS 层 as Map<string,any> 编译为 io.dcloud.uts.Map 强转，HashMap 会 ClassCastException
                            val detail = io.dcloud.uts.Map<String, Any>()
                            detail["latitude"] = currentLatitude
                            detail["longitude"] = currentLongitude
                            detail["x"] = anchorPoint.x
                            detail["y"] = anchorPoint.y
                            detail["screenX"] = anchorPoint.x + mapViewLocation[0]
                            detail["screenY"] = anchorPoint.y + mapViewLocation[1]
                            val param = io.dcloud.uts.Map<String, Any>()
                            param["type"] = "anchorpointtap"
                            param["detail"] = detail
                            anchorCallback.callback(param)
                        }
                    }
                }
            }
        }
        return mapTouchHostLayout as MapTouchHostLayout
    }

    override fun onStart() {
        // 高德地图 MapView 没有 onStart 方法
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
        // 先销毁各覆盖物管理器（需在地图视图销毁前移除叠加物，并取消图片加载请求）
        markerManager?.destroy()
        markerManager = null
        polylineManager?.destroy()
        polylineManager = null
        polygonManager?.destroy()
        polygonManager = null
        groundManager?.destroy()
        groundManager = null
        circleManager?.destroy()
        circleManager = null
        controlManager?.destroy()
        controlManager = null
        // 定位：解绑定位源并释放客户端（对齐腾讯 setLocationSource(null) + deactivate）
        mapView?.map?.setLocationSource(null)
        locationClient?.stopLocation()
        locationClient?.onDestroy()
        locationClient = null
        locationChangedListener = null
        hasLocation = false
        // 清空回调引用，避免持有外部对象导致泄漏
        onUpdatedCallback = null
        onMapTapCallback = null
        onPoiTapCallback = null
        onAnchorPointTapCallback = null
        onRegionChangeCallback = null
        // 最后销毁地图视图
        mapTouchHostLayout?.removeAllViews()
        mapView?.onDestroy()
        mapView = null
        mapTouchHostLayout = null
    }

    override fun setCenter(latitude: Double, longitude: Double, animate: Boolean) {
        val aMap = mapView?.map ?: return
        // 程序性相机更新标记：end 时 causedBy 判定为 update
        isSetUpdate = true
        val latLng = LatLng(latitude, longitude)
        val cameraUpdate = CameraUpdateFactory.changeLatLng(latLng)
        if (animate) {
            aMap.animateCamera(cameraUpdate)
        } else {
            aMap.moveCamera(cameraUpdate)
        }
    }

    override fun setScale(zoom: Int, animate: Boolean) {
        val aMap = mapView?.map ?: return
        // 程序性相机更新标记：end 时 causedBy 判定为 update
        isSetUpdate = true
        mZoomLevel = zoom.toFloat()
        val cameraUpdate = CameraUpdateFactory.zoomTo(mZoomLevel)
        if (animate) {
            aMap.animateCamera(cameraUpdate)
        } else {
            aMap.moveCamera(cameraUpdate)
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

    override fun setLayerStyle(type: String) {
        // 非数字图层样式（如 "normal"/"night"）忽略，避免 NumberFormatException 崩溃
        val mapType = type.toIntOrNull() ?: return
        mapView?.map?.mapType = mapType
    }

    override fun setShowLocation(show: Boolean) {
        val aMap = mapView?.map
        if (aMap != null) {
            val myLocationStyle = MyLocationStyle()
            // 连续定位、蓝点不移动到地图中心点、定位标随设备方向旋转（对齐 Tencent 插件模式与 iOS 行为）
            // 不能使用 LOCATION_TYPE_LOCATE（单次定位）：首启定位失败（GPS 冷启动/权限弹窗未批准/室内弱网）后无重试，蓝点永远不显示
            myLocationStyle.myLocationType(LOCATION_TYPE_LOCATION_ROTATE_NO_CENTER)
            myLocationStyle.interval(2000) // 连续定位模式下的定位间隔，毫秒；首次失败后按此间隔自动重试
            aMap.myLocationStyle = myLocationStyle
            // 开启时会触发 LocationSource.activate 启动定位客户端并回填最后已知位置
            aMap.isMyLocationEnabled = show
        }
    }

    // ---- 定位源（与腾讯 LocationSource 模式一致）----

    /**
     * 初始化独立定位客户端，并注册为地图的定位源（须在开启蓝点前完成）
     */
    private fun initLocation(aMap: AMap, context: Context) {
        try {
            val client = AMapLocationClient(context.applicationContext)
            val option = AMapLocationClientOption()
            // 高精度连续定位；间隔与蓝点刷新一致
            option.setLocationMode(AMapLocationClientOption.AMapLocationMode.Hight_Accuracy)
            option.setOnceLocation(false)
            option.setInterval(2000)
            option.setNeedAddress(false)
            client.setLocationOption(option)
            client.setLocationListener(this)
            locationClient = client
            aMap.setLocationSource(this)
        } catch (e: Exception) {
            // 初始化失败不打印日志，错误通过 context 回调返回
        }
    }

    override fun activate(listener: LocationSource.OnLocationChangedListener?) {
        locationChangedListener = listener
        // 先回填最后已知位置，让蓝点尽快上屏（冷启动提速）
        try {
            val last = locationClient?.getLastKnownLocation()
            if (last != null && last.errorCode == 0) {
                updateCurrentLocation(last)
                locationChangedListener?.onLocationChanged(toAndroidLocation())
            }
        } catch (e: Exception) {
        }
        locationClient?.startLocation()
    }

    override fun deactivate() {
        locationClient?.stopLocation()
        locationChangedListener = null
    }

    override fun onLocationChanged(location: AMapLocation?) {
        if (location == null || location.errorCode != 0) {
            return
        }
        updateCurrentLocation(location)
        locationChangedListener?.onLocationChanged(toAndroidLocation())
    }

    private fun updateCurrentLocation(location: AMapLocation) {
        currentLatitude = location.latitude
        currentLongitude = location.longitude
        currentBearing = location.bearing
        hasLocation = true
    }

    private fun toAndroidLocation(): Location {
        val l = Location("")
        l.latitude = currentLatitude
        l.longitude = currentLongitude
        l.bearing = currentBearing
        return l
    }

    override fun setEnableTraffic(enable: Boolean) {
        mapView?.map?.isTrafficEnabled = enable
    }

    override fun setEnableZoom(enable: Boolean) {
        mapView?.map?.uiSettings?.setZoomGesturesEnabled(enable)
    }

    override fun setEnableRotate(enable: Boolean) {
        mapView?.map?.uiSettings?.setRotateGesturesEnabled(enable)
    }

    override fun setRotate(rotate: Float, animate: Boolean) {
        val aMap = mapView?.map ?: return
        // 程序性相机更新标记：end 时 causedBy 判定为 update
        isSetUpdate = true
        val cameraPosition = aMap.cameraPosition
        var bearing = rotate % 360f
        if (bearing < 0f) {
            bearing += 360f
        }
        val cameraUpdate = CameraUpdateFactory.newCameraPosition(
            CameraPosition(
                cameraPosition.target,
                cameraPosition.zoom,
                cameraPosition.tilt,
                bearing
            )
        )
        if (animate) {
            aMap.animateCamera(cameraUpdate)
        } else {
            aMap.moveCamera(cameraUpdate)
        }
    }

    override fun setEnableScroll(enable: Boolean) {
        mapView?.map?.uiSettings?.setScrollGesturesEnabled(enable)
    }

    override fun setShowCompass(show: Boolean) {
        mapView?.map?.uiSettings?.setCompassEnabled(show)
    }

    override fun setShowScale(show: Boolean) {
        mapView?.map?.uiSettings?.setScaleControlsEnabled(show)
    }

    override fun setEnableBuilding(enable: Boolean) {
        mapView?.map?.showBuildings(enable)
    }

    override fun setEnablePoi(enable: Boolean) {
        mapView?.map?.showMapText(enable)
    }

    override fun setEnableIndoorMap(enable: Boolean) {
        mapView?.map?.showIndoorMap(enable)
    }

    override fun setEnableOverlooking(enable: Boolean) {
        mapView?.map?.uiSettings?.setTiltGesturesEnabled(enable)
    }

    override fun setSkew(skew: Float, animate: Boolean) {
        val aMap = mapView?.map ?: return
        // 程序性相机更新标记：end 时 causedBy 判定为 update
        isSetUpdate = true
        val cameraPosition = aMap.cameraPosition
        val tilt = skew.coerceIn(0f, 60f)
        val cameraUpdate = CameraUpdateFactory.newCameraPosition(
            CameraPosition(
                cameraPosition.target,
                cameraPosition.zoom,
                tilt,
                cameraPosition.bearing
            )
        )
        if (animate) {
            aMap.animateCamera(cameraUpdate)
        } else {
            aMap.moveCamera(cameraUpdate)
        }
    }

    override fun setCameraPosition(latitude: Double, longitude: Double, zoom: Int, skew: Float, rotate: Float, animate: Boolean) {
        val aMap = mapView?.map ?: return
        // 程序性相机更新标记：end 时 causedBy 判定为 update
        isSetUpdate = true
        mZoomLevel = zoom.toFloat()
        var bearing = rotate % 360f
        if (bearing < 0f) {
            bearing += 360f
        }
        val tilt = skew.coerceIn(0f, 60f)
        val cameraUpdate = CameraUpdateFactory.newCameraPosition(
            CameraPosition(LatLng(latitude, longitude), mZoomLevel, tilt, bearing)
        )
        if (animate) {
            aMap.animateCamera(cameraUpdate)
        } else {
            aMap.moveCamera(cameraUpdate)
        }
    }

    override fun setEnableSatellite(enable: Boolean) {
        setTheme(if (enable) "satellite" else "normal")
    }

    override fun setMarkers(markerModels: List<MarkerModel>) {
        markerManager?.setMarkers(markerModels)
    }

    override fun addMarkers(markerModels: List<MarkerModel>) {
        markerManager?.addMarkers(markerModels)
    }

    override fun removeMarkers(ids: List<Int>) {
        markerManager?.removeMarkers(ids)
    }

    override fun setOnMarkerTapCallback(callback: ICallBack?) {
        markerManager?.setOnMarkerTapCallback(callback)
    }

    override fun setOnCalloutTapCallback(callback: ICallBack?) {
        markerManager?.setOnCalloutTapCallback(callback)
    }

    override fun setOnMapLoadedCallback(callback: ICallBack?) {
        // 接口方法名保持不变，字段实际承载 updated 语义
        onUpdatedCallback = callback
    }

    override fun setOnMapClickCallback(callback: ICallBack?) {
        onMapTapCallback = callback
    }

    override fun setOnPoiTapCallback(callback: ICallBack?) {
        onPoiTapCallback = callback
    }

    override fun setOnAnchorPointTapCallback(callback: ICallBack?) {
        onAnchorPointTapCallback = callback
    }

    override fun setOnRegionChangeCallback(callback: ICallBack?) {
        onRegionChangeCallback = callback
    }

    override fun setPolyline(polylineModels: List<PolylineModel>) {
        polylineManager?.setPolyline(polylineModels)
    }

    override fun setPolygons(polygonModels: List<PolygonModel>) {
        polygonManager?.setPolygons(polygonModels)
    }

    override fun setCircles(circleModels: List<CircleModel>) {
        circleManager?.setCircles(circleModels)
    }

    override fun setControls(controlModels: List<ControlModel>) {
        controlManager?.setControls(controlModels)
    }

    override fun setOnControlTapCallback(callback: ICallBack?) {
        controlManager?.setOnControlTapCallback(callback)
    }

    override fun setIncludePoints(points: List<IncludePointModel>, animate: Boolean) {
        if (points.isEmpty()) {
            return
        }
        if (points.size == 1) {
            setCenter(points[0].latitude, points[0].longitude, animate)
            return
        }
        val builder = LatLngBounds.Builder()
        points.forEach { point ->
            builder.include(LatLng(point.latitude, point.longitude))
        }
        val bounds = builder.build()
        // 所有点相同（零面积 bounds）时回退 setCenter，避免 newLatLngBounds 异常
        if (bounds.southwest.latitude == bounds.northeast.latitude &&
            bounds.southwest.longitude == bounds.northeast.longitude
        ) {
            setCenter(points[0].latitude, points[0].longitude, animate)
            return
        }
        val density = mapView?.context?.resources?.displayMetrics?.density ?: 1f
        val padding = (40f * density).toInt()
        val cameraUpdate = CameraUpdateFactory.newLatLngBounds(bounds, padding)
        val aMap = mapView?.map ?: return
        isSetUpdate = true
        if (animate) {
            aMap.animateCamera(cameraUpdate)
        } else {
            aMap.moveCamera(cameraUpdate)
        }
    }

    override fun getCenterLocation(): LatLngModel {
        val target = mapView?.map?.cameraPosition?.target
        return LatLngModel(target?.latitude ?: 0.0, target?.longitude ?: 0.0)
    }

    override fun moveToLocation(latLng: LatLngModel?, callback: ICallBack) {
        if (latLng != null) {
            setCenter(latLng.latitude, latLng.longitude, true)
            callback.callback(true)
            return
        }
        // 移动到当前定位点：依赖定位源回填的最近定位结果
        if (!hasLocation) {
            callback.callback(false)
            return
        }
        setCenter(currentLatitude, currentLongitude, true)
        callback.callback(true)
    }

    override fun translateMarker(
        markerId: Int,
        destination: LatLngModel,
        rotate: Double?,
        moveWithRotate: Boolean?,
        autoRotate: Boolean,
        duration: Double?,
        callback: ICallBack
    ) {
        val manager = markerManager
        if (manager == null) {
            callback.callback(false)
            return
        }
        manager.translateMarker(markerId, destination, rotate, moveWithRotate, autoRotate, duration, callback)
    }

    override fun moveAlong(markerId: Int, path: List<LatLngModel>, duration: Double?, callback: ICallBack) {
        val manager = markerManager
        if (manager == null) {
            callback.callback(false)
            return
        }
        manager.moveAlong(markerId, path, duration, callback)
    }

    override fun addGroundOverlay(ground: GroundModel, callback: ICallBack) {
        val manager = groundManager
        if (manager == null) {
            callback.callback(false)
            return
        }
        manager.addGroundOverlay(ground, callback)
    }

    override fun updateGroundOverlay(ground: GroundModel, callback: ICallBack) {
        val manager = groundManager
        if (manager == null) {
            callback.callback(false)
            return
        }
        manager.updateGroundOverlay(ground, callback)
    }

    override fun removeGroundOverlay(id: String, callback: ICallBack) {
        val manager = groundManager
        if (manager == null) {
            callback.callback(false)
            return
        }
        manager.removeGroundOverlay(id, callback)
    }

    override fun getRegion(): BoundsModel {
        val bounds = mapView?.map?.projection?.visibleRegion?.latLngBounds
        return BoundsModel(
            LatLngModel(bounds?.southwest?.latitude ?: 0.0, bounds?.southwest?.longitude ?: 0.0),
            LatLngModel(bounds?.northeast?.latitude ?: 0.0, bounds?.northeast?.longitude ?: 0.0)
        )
    }

    // 读取 AndroidManifest 中配置的高德 Key（com.amap.api.v2.apikey），未配置时返回 false，
    // 供 UTS 层在地图未就绪时返回 500013（对齐 iOS hasValidAPIKey 行为）
    override fun hasValidAPIKey(): Boolean {
        val ctx = mapView?.context ?: return false
        return try {
            val appInfo = ctx.packageManager.getApplicationInfo(ctx.packageName, PackageManager.GET_META_DATA)
            val key = appInfo.metaData?.getString("com.amap.api.v2.apikey")
            !key.isNullOrEmpty()
        } catch (e: Exception) {
            false
        }
    }

}

