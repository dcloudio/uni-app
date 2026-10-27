package uts.sdk.modules.uniMapAmap

import android.content.Context
import android.view.View
import uts.sdk.modules.uniMapAmap.circle.CircleModel
import uts.sdk.modules.uniMapAmap.control.ControlModel
import uts.sdk.modules.uniMapAmap.ground.GroundModel
import uts.sdk.modules.uniMapAmap.includepoint.IncludePointModel
import uts.sdk.modules.uniMapAmap.latlng.BoundsModel
import uts.sdk.modules.uniMapAmap.latlng.LatLngModel
import uts.sdk.modules.uniMapAmap.marker.MarkerModel
import uts.sdk.modules.uniMapAmap.polygon.PolygonModel
import uts.sdk.modules.uniMapAmap.polyline.PolylineModel

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
     * 显示交通路况
     * @param enable Boolean
     */
    fun setEnableTraffic(enable: Boolean)

    /**
     * 启用地图缩放手势
     * @param enable Boolean
     */
    fun setEnableZoom(enable: Boolean)

    /**
     * 启用地图旋转手势
     * @param enable Boolean
     */
    fun setEnableRotate(enable: Boolean)

    /**
     * 设置地图旋转角度，范围 0~360
     */
    fun setRotate(rotate: Float, animate: Boolean)

    /**
     * 启用地图拖拽手势
     * @param enable Boolean
     */
    fun setEnableScroll(enable: Boolean)

    /**
     * 显示指南针
     * @param show Boolean
     */
    fun setShowCompass(show: Boolean)

    /**
     * 显示比例尺控件
     * @param show Boolean
     */
    fun setShowScale(show: Boolean)

    /**
     * 启用地图 3D 建筑物效果
     * @param enable Boolean
     */
    fun setEnableBuilding(enable: Boolean)

    /**
     * 显示 POI/地图文字
     * @param enable Boolean
     */
    fun setEnablePoi(enable: Boolean)

    /**
     * 显示室内地图
     * @param enable Boolean
     */
    fun setEnableIndoorMap(enable: Boolean)

    /**
     * 启用地图俯视手势
     * @param enable Boolean
     */
    fun setEnableOverlooking(enable: Boolean)

    /**
     * 设置地图俯仰角，范围 0~60
     */
    fun setSkew(skew: Float, animate: Boolean)

    /**
     * 一次性设置中心点、缩放级别、俯仰角、旋转角度（单次相机更新，避免多次 moveCamera）
     * @param latitude Double
     * @param longitude Double
     * @param zoom Int
     * @param skew Float
     * @param rotate Float
     * @param animate Boolean
     */
    fun setCameraPosition(latitude: Double, longitude: Double, zoom: Int, skew: Float, rotate: Float, animate: Boolean)

    /**
     * 显示卫星地图
     * @param enable Boolean
     */
    fun setEnableSatellite(enable: Boolean)

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

    /**
     * 设置 marker 点击回调
     * @param callback ICallBack?
     */
    fun setOnMarkerTapCallback(callback: ICallBack?)

    /**
     * 设置气泡点击回调
     * @param callback ICallBack?
     */
    fun setOnCalloutTapCallback(callback: ICallBack?)

    /**
     * 设置地图加载完成回调
     * @param callback ICallBack?
     */
    fun setOnMapLoadedCallback(callback: ICallBack?)

    /**
     * 设置地图点击回调
     * @param callback ICallBack?
     */
    fun setOnMapClickCallback(callback: ICallBack?)

    /**
     * 设置地图 POI 点击回调
     * @param callback ICallBack?
     */
    fun setOnPoiTapCallback(callback: ICallBack?)

    /**
     * 设置定位锚点点击回调
     * @param callback ICallBack?
     */
    fun setOnAnchorPointTapCallback(callback: ICallBack?)

    /**
     * 设置视野变化回调
     * @param callback ICallBack?
     */
    fun setOnRegionChangeCallback(callback: ICallBack?)

    /**
     * 设置折线
     * @param polylineModels List<PolylineModel>
     */
    fun setPolyline(polylineModels: List<PolylineModel>)

    /**
     * 设置多边形
     * @param polygonModels List<PolygonModel>
     */
    fun setPolygons(polygonModels: List<PolygonModel>)

    /**
     * 设置圆
     * @param circleModels List<CircleModel>
     */
    fun setCircles(circleModels: List<CircleModel>)

    /**
     * 设置控件
     * @param controlModels List<ControlModel>
     */
    fun setControls(controlModels: List<ControlModel>)

    /**
     * 设置控件点击回调
     * @param callback ICallBack?
     */
    fun setOnControlTapCallback(callback: ICallBack?)

    /**
     * 缩放视野以包含所有给定坐标点
     * @param points List<IncludePointModel>
     * @param animate Boolean
     */
    fun setIncludePoints(points: List<IncludePointModel>, animate: Boolean)

    /**
     * 获取当前地图中心的经纬度（gcj02）
     * @return LatLngModel
     */
    fun getCenterLocation(): LatLngModel

    /**
     * 将地图中心移动到指定位置；latLng 为空时移动到当前定位点（定位不可用时回调 false）
     * @param latLng LatLngModel?
     * @param callback ICallBack 结果回调（Boolean）
     */
    fun moveToLocation(latLng: LatLngModel?, callback: ICallBack)

    /**
     * 平移 marker，带动画
     * 语义对齐 iOS：moveWithRotate=false 且有旋转时先旋转（30% 时长）再平移（70% 时长）；
     * autoRotate 时按移动方向角旋转；动画期间驱动 callout/label 跟随刷新；重复调用打断前次动画
     * @param markerId Int
     * @param destination LatLngModel
     * @param rotate Double?
     * @param moveWithRotate Boolean?
     * @param autoRotate Boolean 按移动方向自动旋转
     * @param duration Double? 毫秒
     * @param callback ICallBack 结果回调（Boolean，marker 未找到为 false）
     */
    fun translateMarker(
        markerId: Int,
        destination: LatLngModel,
        rotate: Double?,
        moveWithRotate: Boolean?,
        autoRotate: Boolean,
        duration: Double?,
        callback: ICallBack
    )

    /**
     * 沿指定路径移动 marker（轨迹回放），按累计距离匀速插值，每帧按线段方向绕图标中心顺时针旋转；
     * 重复调用打断前次动画
     * @param markerId Int
     * @param path List<LatLngModel>
     * @param duration Double? 毫秒
     * @param callback ICallBack 结果回调（Boolean，marker 未找到为 false）
     */
    fun moveAlong(markerId: Int, path: List<LatLngModel>, duration: Double?, callback: ICallBack)

    /**
     * 创建自定义图片图层（已存在同 id 时按更新处理）
     * @param ground GroundModel
     * @param callback ICallBack 结果回调（Boolean，图片加载/创建失败为 false）
     */
    fun addGroundOverlay(ground: GroundModel, callback: ICallBack)

    /**
     * 更新自定义图片图层（移除重建）
     * @param ground GroundModel
     * @param callback ICallBack 结果回调（Boolean）
     */
    fun updateGroundOverlay(ground: GroundModel, callback: ICallBack)

    /**
     * 移除自定义图片图层
     * @param id String
     * @param callback ICallBack 结果回调（Boolean，id 不存在为 false）
     */
    fun removeGroundOverlay(id: String, callback: ICallBack)

    /**
     * 获取当前地图的视野范围
     * @return BoundsModel（southwest 西南角 / northeast 东北角）
     */
    fun getRegion(): BoundsModel

    /**
     * 是否已配置高德 APIKey（AndroidManifest 中 com.amap.api.v2.apikey）
     * 供 UTS 层在地图未就绪时区分返回 500013
     * @return Boolean
     */
    fun hasValidAPIKey(): Boolean
}

