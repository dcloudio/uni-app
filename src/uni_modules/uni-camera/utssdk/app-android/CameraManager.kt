package uts.sdk.modules.uniCamera

import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import java.lang.ref.WeakReference
import java.util.concurrent.ConcurrentHashMap

/**
 * 相机资源管理器，为每个对象单独保存配置和回调
 */
object CameraManager {
    private val TAG = "CameraManager"
    private var cameraImpl: WeakReference<CameraImpl>? = null
    private var currentOwner: WeakReference<Any>? = null
    
    // 使用ConcurrentHashMap为每个对象保存配置
    private val configMap = ConcurrentHashMap<String, CameraConfig>()
    
    /**
     * 相机配置类，保存一个对象的相机配置和回调
     */
    data class CameraConfig(
        var cameraPosition: String = "back",
        var flashMode: String = "off",
        var zoom: Float = 1.0f,
        var isFrameCallbackActive: Boolean = false,
        var isAnalysisActive: Boolean = false,
        var initDoneCallback: ICallBack? = null,
        var stopCallback: ICallBack? = null,
        var frameCallback: ICallBack? = null,
        var analysisCallback: ICallBack? = null
    )
    
    /**
     * 获取相机实例
     * @param activity 请求相机的Activity（用于创建CameraImpl）
     * @param owner 相机所有者对象（用作配置的key）
     * @return 相机实例
     */
    @Synchronized
    fun getCameraImpl(activity: AppCompatActivity, owner: Any): CameraImpl {
        val id = getObjectId(owner)
        Log.d(TAG, "getCameraImpl: 对象=$id")
        
        // 创建新的相机实例
        val newImpl = CameraImpl(activity)

        // 使用弱引用来持有相机实例
        this.cameraImpl = WeakReference(newImpl)
        
        // 更新当前拥有者
        currentOwner = WeakReference(owner)
        
        return newImpl
    }
    
    /**
     * 设置当前活动的相机实例
     * 在恢复配置前调用，确保使用正确的相机实例
     */
    fun setCurrentCameraImpl(owner: Any, impl: CameraImpl) {
        val id = getObjectId(owner)
        Log.d(TAG, "设置当前相机实例: 对象=$id")
        this.cameraImpl = WeakReference(impl)
        currentOwner = WeakReference(owner)
    }
    
    /**
     * 保存指定对象的相机配置和回调
     */
    fun saveConfig(owner: Any) {
        val id = getObjectId(owner)
        
        cameraImpl?.get()?.let { camera ->
            val config = CameraConfig(
                cameraPosition = camera.getCurrentCameraPosition() ?: "back",
                flashMode = camera.getCurrentFlashMode() ?: "off",
                zoom = camera.getCurrentZoom() ?: 1.0f,
                isFrameCallbackActive = camera.isFrameCallbackActive(),
                isAnalysisActive = camera.isAnalysisActive(),
                initDoneCallback = camera.getInitDoneCallback(),
                stopCallback = camera.getStopCallback(),
                frameCallback = camera.getFrameCallback(),
                analysisCallback = camera.getAnalysisCallback()
            )
            
            configMap[id] = config
            Log.d(TAG, "保存对象[$id]配置: 位置=${config.cameraPosition}, 闪光灯=${config.flashMode}, 缩放=${config.zoom}, 帧回调=${config.isFrameCallbackActive}, 分析=${config.isAnalysisActive}")
        }
    }
    
    /**
     * 恢复指定对象的相机配置和回调
     */
    fun restoreConfig(owner: Any) {
        val id = getObjectId(owner)
        val config = configMap[id] ?: run {
            Log.d(TAG, "对象[$id]没有保存的配置")
            return
        }
        
        Log.d(TAG, "恢复对象[$id]配置: 位置=${config.cameraPosition}, 闪光灯=${config.flashMode}, 缩放=${config.zoom}, 帧回调=${config.isFrameCallbackActive}, 分析=${config.isAnalysisActive}")
        
        cameraImpl?.get()?.let { camera ->
            // 恢复回调
            config.initDoneCallback?.let { camera.setInitDoneCallBack(it) }
            config.stopCallback?.let { camera.setStopCallBack(it) }
            config.frameCallback?.let { camera.setFrameCallback(it) }
            
            // 恢复相机设置
            camera.switchCamera(config.cameraPosition)
            camera.setFlash(config.flashMode)
            if (camera.getCurrentZoom() != config.zoom) {
                camera.setZoom(config.zoom)
            }
            
            // 恢复帧回调状态
            if (config.isFrameCallbackActive) {
                camera.startOnFrame()
            }
            
            // 恢复分析状态
            if (config.isAnalysisActive && config.analysisCallback != null) {
                camera.startAnalysis(config.analysisCallback!!)
            }
        }
    }
    
    /**
     * 获取对象的唯一标识
     */
    private fun getObjectId(obj: Any): String {
        return obj.javaClass.name + "@" + System.identityHashCode(obj)
    }
    
    /**
     * 清除指定对象的配置
     * 在对象不再需要时调用
     */
    fun clearConfig(owner: Any) {
        val id = getObjectId(owner)
        configMap.remove(id)
        Log.d(TAG, "清除对象[$id]的配置")
    }
}
