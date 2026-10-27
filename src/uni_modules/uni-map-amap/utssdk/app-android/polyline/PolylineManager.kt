package uts.sdk.modules.uniMapAmap.polyline

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Matrix
import android.graphics.Point
import com.amap.api.maps.AMap
import com.amap.api.maps.model.BitmapDescriptor
import com.amap.api.maps.model.BitmapDescriptorFactory
import com.amap.api.maps.model.LatLng
import com.amap.api.maps.model.Marker
import com.amap.api.maps.model.MarkerOptions
import com.amap.api.maps.model.NavigateArrow
import com.amap.api.maps.model.NavigateArrowOptions
import com.amap.api.maps.model.Polyline
import com.amap.api.maps.model.PolylineOptions
import uts.sdk.modules.uniMapAmap.FrescoImageLoader
import java.io.File
import kotlin.math.max

class PolylineManager(private val aMap: AMap, private val context: Context) {
    private class PolylineOverlay(val content: Polyline, val border: Polyline?) {
        var arrow: NavigateArrow? = null
        val arrowMarkers = mutableListOf<Marker>()
        var arrowDescriptor: BitmapDescriptor? = null
        var arrowBitmap: Bitmap? = null
        var arrowHandle: FrescoImageLoader.LoadHandle? = null
    }

    private val overlays = mutableListOf<PolylineOverlay>()

    fun setPolyline(polylineModels: List<PolylineModel>) {
        clear()
        polylineModels.forEach { model -> buildOverlay(model) }
    }

    private fun buildOverlay(model: PolylineModel) {
        if (model.points.size < 2) {
            return
        }
        val points = model.points.map { point -> LatLng(point.latitude, point.longitude) }
        val contentWidth = (model.width ?: 5f).coerceAtLeast(0f)
        val contentColor = model.color ?: DEFAULT_COLOR
        val colorValues = model.colorList?.takeIf { it.size >= 2 }
        val dotted = model.dottedLine

        // 边框：内容为虚线时边框保持实线，避免边框与内容虚线交叠产生脏效果
        val border = if (model.borderColor != null && (model.borderWidth ?: 0f) > 0f) {
            val borderWidth = model.borderWidth!!.coerceAtLeast(0f)
            aMap.addPolyline(
                PolylineOptions()
                    .addAll(points)
                    .color(model.borderColor!!)
                    .width(contentWidth + 2f * borderWidth)
                    .zIndex(0f)
                    .setDottedLine(false)
            )
        } else {
            null
        }

        val contentOptions = PolylineOptions()
            .addAll(points)
            .width(contentWidth)
            .zIndex(1f)
            .setDottedLine(dotted)
        if (colorValues != null) {
            contentOptions.colorValues(colorValues).useGradient(true)
        } else {
            contentOptions.color(contentColor)
        }
        val content = aMap.addPolyline(contentOptions)

        val overlay = PolylineOverlay(content, border)
        overlays.add(overlay)

        if (!model.arrowLine) {
            return
        }
        val iconPath = model.arrowIconPath
        if (iconPath.isNullOrEmpty()) {
            return
        }

        // 自定义箭头（本地/网络均可）；加载失败回退 NavigateArrow
        overlay.arrowHandle = loadArrowBitmap(iconPath, contentWidth) { bitmap ->
            if (!overlays.contains(overlay)) {
                bitmap?.recycle()
                return@loadArrowBitmap
            }
            if (bitmap == null) {
                if (overlay.arrow == null) {
                    overlay.arrow = aMap.addNavigateArrow(
                        NavigateArrowOptions()
                            .addAll(points)
                            .width(contentWidth)
                            .topColor(contentColor)
                            .sideColor(contentColor)
                            .zIndex(2f)
                            .visible(true)
                    )
                }
                return@loadArrowBitmap
            }
            val descriptor = BitmapDescriptorFactory.fromBitmap(bitmap)
            overlay.arrowBitmap = bitmap
            overlay.arrowDescriptor = descriptor
            // 箭头间距取图标高度与线宽较大者，避免密集重叠
            val spacing = max(bitmap.height.toFloat(), contentWidth)
            overlay.arrowMarkers.addAll(createArrowMarkers(points, descriptor, spacing))
        }
    }

    fun destroy() {
        clear()
    }

    private fun clear() {
        overlays.forEach { overlay ->
            overlay.content.remove()
            overlay.border?.remove()
            overlay.arrow?.remove()
            overlay.arrowMarkers.forEach { marker -> marker.remove() }
            overlay.arrowMarkers.clear()
            // 描述符/位图可能仍被地图引用，等所有叠加物移除后再释放
            overlay.arrowDescriptor?.recycle()
            overlay.arrowDescriptor = null
            if (overlay.arrowBitmap != null && !overlay.arrowBitmap!!.isRecycled) {
                overlay.arrowBitmap!!.recycle()
            }
            overlay.arrowBitmap = null
            // 取消未完成的箭头图标加载请求
            overlay.arrowHandle?.cancel()
            overlay.arrowHandle = null
        }
        overlays.clear()
    }

    /**
     * 加载箭头图标（本地文件同步解码，网络地址经 Fresco 异步加载），
     * 统一按高度缩放并保持宽高比，再顺时针旋转 -90°（图标默认朝上转成沿路径方向）
     */
    private fun loadArrowBitmap(iconPath: String, contentWidth: Float, onReady: (Bitmap?) -> Unit): FrescoImageLoader.LoadHandle? {
        val targetHeight = max(contentWidth.toInt(), 8)
        val file = File(iconPath)
        if (file.isFile) {
            var bitmap: Bitmap? = null
            try {
                bitmap = BitmapFactory.decodeFile(iconPath)
            } catch (error: Throwable) {
                bitmap = null
            }
            onReady(scaleAndRotate(bitmap, targetHeight, true))
            return null
        }
        return FrescoImageLoader.loadBitmap(context, iconPath, null, null, { resource ->
            // Fresco 回传的是位图副本，可回收
            onReady(scaleAndRotate(resource, targetHeight, true))
        }, {
            onReady(null)
        })
    }

    private fun scaleAndRotate(source: Bitmap?, targetHeight: Int, recycleSrc: Boolean): Bitmap? {
        if (source == null || source.isRecycled || source.height <= 0) {
            return null
        }
        val targetWidth = max(1, (source.width.toFloat() / source.height.toFloat() * targetHeight).toInt())
        val scaled = Bitmap.createScaledBitmap(source, targetWidth, targetHeight, true)
        if (recycleSrc && scaled !== source) {
            source.recycle()
        }
        val matrix = Matrix()
        matrix.postRotate(-90f)
        val rotated = Bitmap.createBitmap(scaled, 0, 0, scaled.width, scaled.height, matrix, true)
        if (rotated !== scaled) {
            scaled.recycle()
        }
        return rotated
    }

    private fun createArrowMarkers(
        points: List<LatLng>,
        descriptor: BitmapDescriptor,
        spacing: Float
    ): List<Marker> {
        val markers = mutableListOf<Marker>()
        val safeSpacing = if (spacing > 0f) spacing else 1f
        val projection = aMap.projection
        val screenPoints = points.map { point -> projection.toScreenLocation(point) }
        var remaining = safeSpacing
        for (index in 0 until points.size - 1) {
            if (markers.size >= MAX_ARROW_MARKERS) {
                return markers
            }
            val start = points[index]
            val end = points[index + 1]
            val screenStart = screenPoints[index]
            val screenEnd = screenPoints[index + 1]
            val segmentLength = Math.hypot(
                (screenEnd.x - screenStart.x).toDouble(),
                (screenEnd.y - screenStart.y).toDouble()
            ).toFloat()
            val bearing = calculateBearing(start, end)
            if (segmentLength < safeSpacing / 2f) {
                markers.add(
                    addArrowMarker(descriptor, interpolateLatLng(start, end, 0.5f), bearing)
                )
            } else {
                var traveled = 0f
                while (segmentLength - traveled >= remaining) {
                    traveled += remaining
                    val ratio = traveled / segmentLength
                    markers.add(
                        addArrowMarker(descriptor, interpolateLatLng(start, end, ratio), bearing)
                    )
                    remaining = safeSpacing
                    if (markers.size >= MAX_ARROW_MARKERS) {
                        return markers
                    }
                }
                remaining -= segmentLength - traveled
            }
        }
        return markers
    }

    private fun addArrowMarker(
        descriptor: BitmapDescriptor,
        position: LatLng,
        bearing: Double
    ): Marker {
        val clockwiseAngle = (bearing % 360.0).toFloat()
        val counterClockwiseAngle = (360f - clockwiseAngle) % 360f
        val marker = aMap.addMarker(
            MarkerOptions()
                .position(position)
                .icon(descriptor)
                .anchor(0.5f, 0.5f)
                .rotateAngle(counterClockwiseAngle)
                .draggable(false)
                .zIndex(2f)
        )
        marker.setClickable(false)
        return marker
    }

    private fun calculateBearing(start: LatLng, end: LatLng): Double {
        val deltaLatitude = end.latitude - start.latitude
        val deltaLongitude = end.longitude - start.longitude
        val middleLatitudeRadians = Math.toRadians((start.latitude + end.latitude) / 2.0)
        var bearing = Math.toDegrees(
            Math.atan2(deltaLongitude * Math.cos(middleLatitudeRadians), deltaLatitude)
        )
        if (bearing < 0) {
            bearing += 360.0
        }
        return bearing
    }

    private fun interpolateLatLng(start: LatLng, end: LatLng, ratio: Float): LatLng {
        return LatLng(
            start.latitude + (end.latitude - start.latitude) * ratio,
            start.longitude + (end.longitude - start.longitude) * ratio
        )
    }

    private companion object {
        const val DEFAULT_COLOR: Int = 0xFF2DD7FF.toInt()
        const val MAX_ARROW_MARKERS: Int = 256
    }
}
