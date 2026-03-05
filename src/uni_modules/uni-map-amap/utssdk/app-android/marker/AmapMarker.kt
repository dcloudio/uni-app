package uts.sdk.modules.uniMapAmap.marker

import android.R.attr.height
import android.R.attr.width
import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.util.Log
import com.amap.api.maps.AMap
import com.amap.api.maps.model.BitmapDescriptorFactory
import com.amap.api.maps.model.LatLng
import com.amap.api.maps.model.Marker
import com.amap.api.maps.model.MarkerOptions
import com.bumptech.glide.Glide
import com.bumptech.glide.request.target.CustomTarget
import com.bumptech.glide.request.transition.Transition
import uts.sdk.modules.uniMapAmap.ICallBack
import java.io.File

class AmapMarker(val markerModel: MarkerModel, val aMap: AMap, val context: Context) {
    private var mMarker: Marker? = null

    init {
        createMarkerOptions(markerModel, object : ICallBack {
            override fun callback(param: Any?) {
                Log.i("iconPath", "callback,param = $param")
                if (param is MarkerOptions) {
                    mMarker = aMap.addMarker(param)
                }
            }
        })
    }

    private fun createMarkerOptions(markerModel: MarkerModel, completeCallback: ICallBack) {
        Log.i("iconPath", "createMarkerOptions")
        createBitmapDescriptor(markerModel.iconPath, markerModel.width?.toInt(), markerModel.height?.toInt(), object : ICallBack {
            override fun callback(param: Any?) {
                val markerOptions = MarkerOptions()
                    .position(LatLng(markerModel.latitude, markerModel.longitude))
                    .title(markerModel.title)
                markerOptions.rotateAngle(markerModel.rotate.toFloat())
                markerOptions.alpha(markerModel.alpha)
                markerOptions.anchor(markerModel.anchor[0], markerModel.anchor[1])

                if (param is android.graphics.Bitmap) {
                    markerOptions.icon(BitmapDescriptorFactory.fromBitmap(param))
                }
                completeCallback.callback(markerOptions)
            }
        })
    }

    fun updateMarkerOptions(markerModel: MarkerModel) {
        createBitmapDescriptor(markerModel.iconPath, markerModel.width?.toInt(), markerModel.height?.toInt(), object : ICallBack {
            override fun callback(param: Any?) {
                mMarker?.position = LatLng(markerModel.latitude, markerModel.longitude)
                mMarker?.title = markerModel.title
                mMarker?.setRotateAngle(markerModel.rotate.toFloat())
                mMarker?.alpha = markerModel.alpha
                mMarker?.setAnchor(markerModel.anchor[0], markerModel.anchor[1])
                if (param is android.graphics.Bitmap) {
                    mMarker?.setIcon(BitmapDescriptorFactory.fromBitmap(param))
                }
            }
        })
    }

    private fun createBitmapDescriptor(iconPath: String, width: Int?, height: Int?, callback: ICallBack) {
        Log.i("iconPath", "iconPath:$iconPath,width:$width,height:$height")
        if (iconPath.startsWith("http://") || iconPath.startsWith("https://")) {
            // 网络图片
            Glide.with(context)
                .asBitmap()
                .load(iconPath)
                .into(object : CustomTarget<Bitmap>() {
                    override fun onResourceReady(resource: Bitmap, transition: Transition<in Bitmap>?) {
                        val bitmap = if (width != null && height != null) {
                            Bitmap.createScaledBitmap(resource, width, height, true)
                        } else {
                            resource
                        }
                        callback.callback(bitmap)
                    }

                    override fun onLoadCleared(placeholder: android.graphics.drawable.Drawable?) {
                    }
                })
        } else {
            // 本地图片
            val file = File(iconPath)
            if (file.exists()) {
                val bitmap = BitmapFactory.decodeFile(iconPath)
                val finalBitmap = if (width != null && height != null && bitmap != null) {
                    Bitmap.createScaledBitmap(bitmap, width, height, true)
                } else {
                    bitmap
                }
                Log.i("iconPath", "本地图片,finalBitmap:$finalBitmap")
                callback.callback(finalBitmap)
            } else {
                // 使用默认图标
                callback.callback(null)
            }
        }
    }

    fun getRealMarker(): Marker? {
        return mMarker
    }

    fun destroy() {
        mMarker?.remove()
        mMarker = null
    }
}

