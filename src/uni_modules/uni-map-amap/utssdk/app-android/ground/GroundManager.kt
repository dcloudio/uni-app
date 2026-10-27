package uts.sdk.modules.uniMapAmap.ground

import android.content.Context
import android.graphics.Bitmap
import com.amap.api.maps.AMap
import com.amap.api.maps.model.BitmapDescriptorFactory
import com.amap.api.maps.model.GroundOverlay
import com.amap.api.maps.model.GroundOverlayOptions
import com.amap.api.maps.model.LatLng
import com.amap.api.maps.model.LatLngBounds
import uts.sdk.modules.uniMapAmap.FrescoImageLoader
import uts.sdk.modules.uniMapAmap.ICallBack

/**
 * 自定义图片图层管理器（GroundOverlay）
 * 图片统一经 Fresco 加载（支持 file://、绝对路径、网络地址），成功后按 bounds 添加到地图
 */
class GroundManager(private val context: Context, private val aMap: AMap) {
    private var mGroundCaches = mutableMapOf<String, GroundOverlay>()
    private val loadHandles = mutableListOf<FrescoImageLoader.LoadHandle>()

    fun addGroundOverlay(ground: GroundModel, callback: ICallBack) {
        // 已存在时按更新处理（对齐腾讯语义）
        updateGroundOverlay(ground, callback)
    }

    fun updateGroundOverlay(ground: GroundModel, callback: ICallBack) {
        // 高德 GroundOverlay 的 bounds 动态更新能力有限，采用移除重建策略
        mGroundCaches.remove(ground.id)?.remove()
        if (ground.src.isEmpty()) {
            callback.callback(false)
            return
        }
        loadBitmap(ground.src, object : ICallBack {
            override fun callback(param: Any?) {
                if (param !is Bitmap) {
                    // 图片加载失败（网络/路径无效），回传可区分的错误串，由 UTS 层映射为 500006
                    callback.callback(LOAD_FAILED)
                    return
                }
                try {
                    val options = GroundOverlayOptions()
                    options.image(BitmapDescriptorFactory.fromBitmap(param))
                    options.positionFromBounds(
                        LatLngBounds(
                            LatLng(ground.southwest.latitude, ground.southwest.longitude),
                            LatLng(ground.northeast.latitude, ground.northeast.longitude)
                        )
                    )
                    options.zIndex(ground.zIndex.toFloat())
                    options.visible(ground.visible)
                    // 高德 transparency 语义与 opacity 相反：1 为全透明
                    options.transparency((1.0 - ground.opacity).toFloat().coerceIn(0f, 1f))
                    val overlay = aMap.addGroundOverlay(options)
                    if (overlay != null) {
                        mGroundCaches[ground.id] = overlay
                        callback.callback(true)
                    } else {
                        callback.callback(false)
                    }
                } catch (e: Exception) {
                    callback.callback(false)
                }
            }
        })
    }

    fun removeGroundOverlay(id: String, callback: ICallBack) {
        val overlay = mGroundCaches.remove(id)
        if (overlay == null) {
            callback.callback(false)
            return
        }
        try {
            overlay.remove()
            callback.callback(true)
        } catch (e: Exception) {
            callback.callback(false)
        }
    }

    private fun loadBitmap(src: String, callback: ICallBack) {
        if (src.isEmpty()) {
            callback.callback(null)
            return
        }
        val handle = FrescoImageLoader.loadBitmap(context, src, null, null, { resource ->
            callback.callback(resource)
        }, {
            callback.callback(null)
        })
        loadHandles.add(handle)
    }

    fun destroy() {
        mGroundCaches.forEach { (_, overlay) ->
            try {
                overlay.remove()
            } catch (e: Exception) {
            }
        }
        mGroundCaches.clear()
        // 取消未完成的图片加载请求
        loadHandles.forEach { handle -> handle.cancel() }
        loadHandles.clear()
    }

    companion object {
        // 传递给 UTS 层的图片加载失败标识（与腾讯 errMsg 对齐）
        const val LOAD_FAILED = "network image loading failed"
    }
}
