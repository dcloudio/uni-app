package uts.sdk.modules.uniMapAmap

import android.content.Context
import android.view.View
import uts.sdk.modules.uniMapAmap.marker.MarkerModel

interface ICallBack {
    fun callback(param: Any?)
}

interface IInternalMap {
    fun getMap(context: Context): View
    fun onStart()
    fun onResume()
    fun onPause()
    fun onStop()
    fun onDestroy()

    /**
     * 设置中心点
     * @param latitude Double
     * @param longitude Double
     */
    fun setCenter(latitude: Double, longitude: Double, animate: Boolean = true)

    /**
     * 设置地图缩放级别
     * @param zoom Int
     */
    fun setScale(zoom: Int, animate: Boolean = true)

    /**
     * 获取地图缩放级别
     * @return Int
     */
    fun getScale(): Int

    /**
     * 设置地图主题
     * @param theme String satellite | normal
     */
    fun setTheme(theme: String)

    /**
     * 设置地图最小缩放级别
     * @param zoom Int
     */
    fun setMinScale(zoom: Int)

    /**
     * 获取地图最大缩放级别
     * @return Int
     */
    fun setMaxScale(zoom: Int)

    /**
     * 设置地图图层样式
     * @param type Int
     * type - 地图模式： MAP_TYPE_NORMAL：普通地图，值为1；
     * MAP_TYPE_SATELLITE：卫星地图，值为2；
     * MAP_TYPE_NIGHT 黑夜地图，夜间模式，值为3；
     * MAP_TYPE_NAVI 导航模式，值为4;
     * MAP_TYPE_BUS 公交模式，值为5。
     */
    fun setLayerStyle(type: String)

    /**
     * 显示带有方向的当前定位点
     * @param show Boolean
     */
    fun setShowLocation(show: Boolean)

    /**
     * 设置标记点
     * @param markerModels List<MarkerModel>
     */
    fun setMarkers(markerModels: List<MarkerModel>)

    /**
     * 添加标记点
     * @param markerModels List<MarkerModel>
     */
    fun addMarkers(markerModels: List<MarkerModel>)

    /**
     * 移除 marker
     * @param ids List<Int>
     */
    fun removeMarkers(ids: List<Int>)
}

