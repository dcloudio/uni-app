package uts.sdk.modules.uniMapAmap.marker

import android.content.Context
import android.view.ViewGroup
import com.amap.api.maps.AMap
import com.amap.api.maps.model.CameraPosition
import com.amap.api.maps.model.Marker
import java.util.concurrent.ConcurrentHashMap
import uts.sdk.modules.uniMapAmap.ICallBack
import uts.sdk.modules.uniMapAmap.latlng.LatLngModel

class MarkerManager(
    private val aMap: AMap,
    val context: Context,
    private val containerView: ViewGroup
) {
    private var mMarkerCaches = ConcurrentHashMap<Int, AmapMarker>()
    private var mCalloutTapCallback: ICallBack? = null
    private var mMarkerTapCallback: ICallBack? = null
    private var mMapListenerRegistered = false

    init {
        registerMapListeners()
    }

    /**
     * 注册地图监听：marker 点击切换 BYCLICK 气泡；
     * 相机变化刷新所有气泡位置（对齐 iOS InnerAmapMap 行为）
     * 地图点击监听由 AmapMapImpl 统一注册（高德 setOnMapClickListener 为 set 语义，后设覆盖先设）
     */
    private fun registerMapListeners() {
        if (mMapListenerRegistered) {
            return
        }
        mMapListenerRegistered = true
        aMap.setOnMarkerClickListener { marker ->
            handleMarkerTap(marker)
            // 消费默认行为，阻止 SDK InfoWindow 弹出
            true
        }
        aMap.addOnCameraChangeListener(object : AMap.OnCameraChangeListener {
            override fun onCameraChange(position: CameraPosition) {
                refreshAllCalloutPositions()
            }

            override fun onCameraChangeFinish(position: CameraPosition) {
                refreshAllCalloutPositions()
            }
        })
    }

    /**
     * 地图点击回调：隐藏 BYCLICK 气泡（由 AmapMapImpl 统一注册的 OnMapClickListener 触发）
     */
    fun onMapTapped() {
        hideByClickCallouts()
    }

    private fun handleMarkerTap(marker: Marker) {
        val tappedMarker = getAmapMarker(marker) ?: return
        mMarkerCaches.forEach { (_, amapMarker) ->
            if (amapMarker !== tappedMarker) {
                amapMarker.hideByClickCallout()
            }
        }
        tappedMarker.toggleByClickCallout()
        tappedMarker.bringCalloutToFront()
        tappedMarker.bringLabelToFront()
        emitMarkerTap(tappedMarker, marker)
    }

    /**
     * 设置 marker 点击回调
     * @param callback ICallBack? 回传 {type: "markertap", detail: {markerId/x/y/screenX/screenY}}
     */
    fun setOnMarkerTapCallback(callback: ICallBack?) {
        mMarkerTapCallback = callback
    }

    /**
     * 回传 markertap 事件（detail 结构对齐 iOS emitMarkerTap）
     * 必须使用 io.dcloud.uts.Map 构造（禁止 HashMap）：UTS 层 as Map<string,any> 编译为 io.dcloud.uts.Map 强转，HashMap 会 ClassCastException
     */
    private fun emitMarkerTap(tappedMarker: AmapMarker, marker: Marker) {
        val callback = mMarkerTapCallback ?: return
        val point = aMap.projection.toScreenLocation(marker.position)
        val viewLocation = IntArray(2)
        containerView.getLocationOnScreen(viewLocation)
        val detail = io.dcloud.uts.Map<String, Any>()
        detail["markerId"] = tappedMarker.markerModel.id
        detail["x"] = point.x
        detail["y"] = point.y
        detail["screenX"] = point.x + viewLocation[0]
        detail["screenY"] = point.y + viewLocation[1]
        val param = io.dcloud.uts.Map<String, Any>()
        param["type"] = "markertap"
        param["detail"] = detail
        callback.callback(param)
    }

    private fun hideByClickCallouts() {
        mMarkerCaches.forEach { (_, amapMarker) ->
            amapMarker.hideByClickCallout()
        }
    }

    private fun refreshAllCalloutPositions() {
        mMarkerCaches.forEach { (_, amapMarker) ->
            amapMarker.refreshOverlayPositions()
        }
    }

    /**
     * 设置气泡点击回调
     * @param callback ICallBack? 回传 {type: "callouttap", detail: {markerId: Int}}
     */
    fun setOnCalloutTapCallback(callback: ICallBack?) {
        mCalloutTapCallback = callback
    }

    private fun emitCalloutTap(markerId: Int) {
        val callback = mCalloutTapCallback ?: return
        // 必须使用 io.dcloud.uts.Map 构造（禁止 HashMap）：UTS 层 as Map<string,any> 编译为 io.dcloud.uts.Map 强转，HashMap 会 ClassCastException
        val detail = io.dcloud.uts.Map<String, Any>()
        detail["markerId"] = markerId
        val param = io.dcloud.uts.Map<String, Any>()
        param["type"] = "callouttap"
        param["detail"] = detail
        callback.callback(param)
    }

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
            val amapMarker = AmapMarker(markerModel, aMap, context, containerView)
            amapMarker.setCalloutTapHandler { markerId ->
                emitCalloutTap(markerId)
            }
            mMarkerCaches[markerModel.id] = amapMarker
        }
    }

    fun removeMarkers(ids: List<Int>) {
        for (id in ids) {
            val marker = mMarkerCaches.remove(id)
            marker?.destroy()
        }
    }

    /**
     * 平移 marker（marker 不存在回 false，由 UTS 层映射 500003）
     */
    fun translateMarker(
        markerId: Int,
        destination: LatLngModel,
        rotate: Double?,
        moveWithRotate: Boolean?,
        autoRotate: Boolean,
        duration: Double?,
        callback: ICallBack
    ) {
        val amapMarker = mMarkerCaches[markerId]
        if (amapMarker == null) {
            callback.callback(false)
            return
        }
        amapMarker.translateMarker(destination, rotate, moveWithRotate, autoRotate, duration, callback)
    }

    /**
     * 沿路径移动 marker（marker 不存在回 false，由 UTS 层映射 500003）
     */
    fun moveAlong(markerId: Int, path: List<LatLngModel>, duration: Double?, callback: ICallBack) {
        val amapMarker = mMarkerCaches[markerId]
        if (amapMarker == null) {
            callback.callback(false)
            return
        }
        amapMarker.moveAlong(path, duration, callback)
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
        mCalloutTapCallback = null
        mMarkerTapCallback = null
    }
}
