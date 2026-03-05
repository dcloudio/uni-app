package uts.sdk.modules.uniBarcodeScanning

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.ImageFormat
import android.graphics.Matrix
import android.graphics.Rect
import android.graphics.YuvImage
import android.net.Uri
import android.os.Handler
import android.os.Looper
import androidx.annotation.OptIn
import androidx.camera.core.ExperimentalGetImage
import androidx.camera.core.ImageProxy
import androidx.core.graphics.scale
import com.google.mlkit.vision.barcode.BarcodeScannerOptions
import com.google.mlkit.vision.barcode.BarcodeScanning
import com.google.mlkit.vision.barcode.common.Barcode
import com.google.mlkit.vision.common.InputImage
import org.mozilla.universalchardet.UniversalDetector
import java.io.ByteArrayOutputStream
import java.io.File
import java.io.FileOutputStream
import java.io.IOException
import java.nio.ByteBuffer
import java.util.concurrent.atomic.AtomicBoolean
import kotlin.io.encoding.Base64
import kotlin.io.encoding.ExperimentalEncodingApi

class Scanner {
    interface ScannerCallback {
        fun onScanSuccess(barcodeInformation: MutableList<BarcodeInformation>, screenShot: ScreenShot?)
        fun onScanFailure(error: String)
        fun needZoom()
        fun onLight(light: Boolean)
    }

    class BarcodeInformation(var result: String, var scanType: String, var charset: String, var rawData: String, var scanArea: IntArray) {
        override fun toString(): String {
            return "BarcodeInformation(result='$result', scanType='$scanType', charset='$charset', rawData='$rawData', scanArea=${scanArea.asList()})"
        }
    }

    class ScreenShot(val bitmap: Bitmap) {
        override fun toString(): String {
            return "ScreenShot(bitmap=$bitmap)"
        }
    }

    companion object {
        private val isProcessing = AtomicBoolean(false) // 控制帧率
        private var lastAnalysisTime = 0L // 时间戳限制

        @OptIn(ExperimentalGetImage::class)
        fun processScanBarCode(
            context: Context,
            imageProxy: ImageProxy,
            scanType: List<String>,
            autoZoom: Boolean,
            width: Int,
            height: Int,
            scannerCallback: ScannerCallback?
        ) {
            val currentTime = System.currentTimeMillis()
            val filterOut = currentTime - lastAnalysisTime < 200 || !isProcessing.compareAndSet(false, true)
            if (filterOut) {
                imageProxy.close() // 确保立即关闭未使用的 imageProxy
                return
            }

            val mediaImage = imageProxy.image
            if (mediaImage == null) {
                imageProxy.close()
                isProcessing.set(false)
                return
            }
            scannerCallback?.onLight(analyzeBrightness(imageProxy))

            var bitmap = imageProxy.toBitmap()
            bitmap = rotateBitmap(bitmap, imageProxy.imageInfo.rotationDegrees)
            if (width > 0 && height > 0) {
                //bitmap转为16：9
                if (bitmap.height / bitmap.width.toFloat() > height / width.toFloat()) {
                    val newHeight = bitmap.width * height / width
                    bitmap = cropBitmap(bitmap, bitmap.width, newHeight)
                } else if (bitmap.height / bitmap.width.toFloat() < height / width.toFloat()) {
                    val newWith = bitmap.height * width / height
                    bitmap = cropBitmap(bitmap, newWith, bitmap.height)
                }
                //大小控制和预览一样
                bitmap = bitmap.scale(width, height)
            }

            val inputImage = InputImage.fromBitmap(bitmap, 0)
            _processScanBarCode(bitmap, imageProxy, inputImage, scanType, autoZoom, scannerCallback)
        }

        private fun analyzeBrightness(imageProxy: ImageProxy): Boolean {
            val yBuffer = imageProxy.planes[0].buffer // 获取 Y 平面（亮度信息）
            val yData = yBuffer.toByteArray()
            // 将 Byte 转换为无符号值，并计算平均亮度
            val brightness = yData.map { it.toInt() and 0xFF }.average()
            // 判断光线是否不足
            return brightness < 50
        }

        // 将 ByteBuffer 转换为 ByteArray
        private fun ByteBuffer.toByteArray(): ByteArray {
            rewind() // 确保缓冲区从头开始读取
            val data = ByteArray(remaining())
            get(data)
            return data
        }

        fun processScanBarCode(
            context: Context,
            filePath: String,
            scanType: List<String>,
            scannerCallback: ScannerCallback?,
        ) {
            val uri = when {
                filePath.startsWith("/storage") || filePath.startsWith("/data") -> {
                    // 如果是绝对路径，转换为 file:// 格式
                    Uri.fromFile(File(filePath))
                }

                filePath.startsWith("content://") -> {
                    // 如果是 content:// 格式，直接解析
                    Uri.parse(filePath)
                }

                filePath.startsWith("file://") -> {
                    Uri.fromFile(File(filePath.substring(7))) // 去掉 file:// 前缀
                }

                else -> {
                    null
                }
            }
            if (isUriExists(context, uri)) {
                val image = InputImage.fromFilePath(context, uri!!)
                _processScanBarCode(null, null, image, scanType, false, scannerCallback)
            } else {
                Handler(Looper.getMainLooper()).post {
                    scannerCallback?.onScanFailure("file not found")
                }
            }
        }

        private fun isUriExists(context: Context, uri: Uri?): Boolean {
            if (uri == null) {
                return false
            }
            return when (uri.scheme) {
                "content" -> isContentUriExists(context, uri) // 使用 ContentResolver 判断
                "file" -> isFileUriExists(uri) // 使用 File 判断
                else -> false // 其他类型的 Uri 不支持
            }
        }

        private fun isContentUriExists(context: Context, uri: Uri): Boolean {
            return try {
                val cursor = context.contentResolver.query(uri, null, null, null, null)
                cursor?.use {
                    it.moveToFirst()
                } != null
            } catch (e: Exception) {
                false
            }
        }

        private fun isFileUriExists(uri: Uri): Boolean {
            return try {
                val file = File(uri.path ?: "")
                file.exists()
            } catch (e: Exception) {
                false
            }
        }


        @kotlin.OptIn(ExperimentalEncodingApi::class)
        private fun _processScanBarCode(
            bitmap: Bitmap?, imageProxy: ImageProxy?, image: InputImage, scanType: List<String>, autoZoom: Boolean, scannerCallback: ScannerCallback?
        ) {
            val isVideoFrame = imageProxy != null
            try { // 添加异常捕获
                val options = BarcodeScannerOptions.Builder()
                    .setBarcodeFormats(getScanTypeFromStrings(scanType))
                    .enableAllPotentialBarcodes()
                    .build()
                val barcodeScanner = BarcodeScanning.getClient(options)

                barcodeScanner.let {
                    it.process(image)
                        .addOnSuccessListener { barcodes ->
                            if (!isVideoFrame) {
                                if (barcodes.isEmpty() || barcodes.all { it.rawBytes == null || it.rawBytes!!.isEmpty() }) {
                                    // 如果没有扫到码，或者扫到的所有码都没有有效数据，则返回失败
                                    scannerCallback?.onScanFailure("no barcode found")
                                    return@addOnSuccessListener
                                }
                            }

                            var needZoom = false
                            val barcodeInformation = mutableListOf<BarcodeInformation>()
                            for (barcode in barcodes) {
                                val boundingBox = barcode.boundingBox ?: continue

                                val rawBytes = barcode.rawBytes
                                if (autoZoom && !needZoom && isVideoFrame) {
                                    // 只要运行success回调，就说明已经扫描到了码，而具体码的内容可能没有扫描到，在这种情况下放大相机
                                    if (rawBytes == null || rawBytes.isEmpty()) {
                                        needZoom = true
                                        continue
                                    }
                                }

                                val rawValue = barcode.rawValue ?: ""
                                val format = getBarcodeFormatStr(barcode.format) ?: ""
                                rawBytes?.let {
                                    if (it.isEmpty()) {
                                        return@let
                                    }
                                    val rawBytesBase64 = Base64.encode(it)
                                    val charset = getCharset(it) ?: ""
                                    val scanArea = rectToArray(boundingBox)
                                    barcodeInformation.add(BarcodeInformation(rawValue, format, charset, rawBytesBase64, scanArea))
                                    needZoom = false
                                }
                            }
                            if (autoZoom && needZoom) {
                                scannerCallback?.needZoom()
                            }

                            if (barcodeInformation.size > 0) {
                                if (barcodeInformation.size == 1) {
                                    Handler(Looper.getMainLooper()).post {
                                        scannerCallback?.onScanSuccess(barcodeInformation, null)
                                    }
                                } else {
                                    if (isVideoFrame) {
                                        // 同时扫到多个二维码的时候，把当前帧数据也返回
                                        val screenShot = bitmap?.let { it1 -> ScreenShot(it1) }
                                        Handler(Looper.getMainLooper()).post {
                                            scannerCallback?.onScanSuccess(barcodeInformation, screenShot)
                                        }
                                    } else {
                                        // 扫图片的时候，包含多个码
                                        Handler(Looper.getMainLooper()).post {
                                            scannerCallback?.onScanSuccess(barcodeInformation, null)
                                        }
                                    }
                                }
                            }
                        }
                        .addOnFailureListener {
                            scannerCallback?.onScanFailure(it.message ?: "")
                        }
                        .addOnCompleteListener {
                            try {
                                lastAnalysisTime = System.currentTimeMillis()
                                isProcessing.set(false)
                                imageProxy?.close()
                                barcodeScanner.close() // 显式关闭扫描器（如果支持）
                            } catch (e: Exception) {
                                // 记录日志
                            }
                        }
                }
            } catch (e: Exception) {
                scannerCallback?.onScanFailure(e.message ?: "")
                imageProxy?.close()
            }
        }



        @Throws(java.lang.Exception::class)
        private fun imageProxyToBitmap(imageProxy: ImageProxy, rotationDegrees: Int): Bitmap {
//            val plane = imageProxy.planes
//            val yBuffer = plane[0].buffer // Y
//            val uBuffer = plane[1].buffer // U
//            val vBuffer = plane[2].buffer // V
//
//            val ySize = yBuffer.remaining()
//            val uSize = uBuffer.remaining()
//            val vSize = vBuffer.remaining()
//
//            val nv21 = ByteArray(ySize + uSize + vSize)
//
//            //U and V are swapped
//            yBuffer[nv21, 0, ySize]
//            vBuffer[nv21, ySize, vSize]
//            uBuffer[nv21, ySize + vSize, uSize]
            val nv21 = imageProxyToBitmap(imageProxy)

            val yuvImage = YuvImage(nv21, ImageFormat.NV21, imageProxy.width, imageProxy.height, null)
            val stream = ByteArrayOutputStream(nv21.size)
            yuvImage.compressToJpeg(Rect(0, 0, yuvImage.width, yuvImage.height), 90, stream)

            var bitmap = BitmapFactory.decodeByteArray(stream.toByteArray(), 0, stream.size())
            if (rotationDegrees != 0) {
                val matrix = Matrix()
                matrix.postRotate(rotationDegrees.toFloat())
                bitmap = Bitmap.createBitmap(bitmap, 0, 0, bitmap.width, bitmap.height, matrix, true)
            }

            return bitmap
        }

        private fun cropBitmap(bitmap: Bitmap, cropWidth: Int, cropHeight: Int): Bitmap {
            val w = bitmap.width
            val h = bitmap.height
            return Bitmap.createBitmap(bitmap, (w - cropWidth) / 2, (h - cropHeight) / 2, cropWidth, cropHeight, null, false)
        }

        private fun rotateBitmap(bitmap: Bitmap, rotationDegrees: Int): Bitmap {
            if (rotationDegrees != 0) {
                val matrix = Matrix()
                matrix.postRotate(rotationDegrees.toFloat())
                return Bitmap.createBitmap(bitmap, 0, 0, bitmap.width, bitmap.height, matrix, true)
            }
            return bitmap
        }


        private fun imageProxyToBitmap(imageProxy: ImageProxy): ByteArray {
            val yBuffer = imageProxy.planes[0].buffer // Y 平面
            val uBuffer = imageProxy.planes[1].buffer // U 平面
            val vBuffer = imageProxy.planes[2].buffer // V 平面

            val ySize = yBuffer.remaining()
            val uSize = uBuffer.remaining()
            val vSize = vBuffer.remaining()

            val nv21 = ByteArray(ySize + uSize + vSize)

            // 拷贝 Y 平面数据
            yBuffer.get(nv21, 0, ySize)

            // 拷贝 U 和 V 平面数据，交错存储为 NV21 格式
            val uvStart = ySize
            val pixelStride = imageProxy.planes[1].pixelStride
            val rowStride = imageProxy.planes[1].rowStride
            val width = imageProxy.width
            val height = imageProxy.height
            val uvHeight = height / 2

            var uvIndex = uvStart
            for (row in 0 until uvHeight) {
                var uIndex = row * rowStride
                var vIndex = row * rowStride
                for (col in 0 until width / 2) {
                    nv21[uvIndex++] = vBuffer[vIndex] // V
                    nv21[uvIndex++] = uBuffer[uIndex] // U
                    uIndex += pixelStride
                    vIndex += pixelStride
                }
            }

            return nv21
        }


        fun saveBitmapAsJPEG(context: Context, bitmap: Bitmap) {
            val file = getPicFile(context)
            var outputStream: FileOutputStream? = null
            try {
                outputStream = FileOutputStream(file)
                bitmap.compress(Bitmap.CompressFormat.JPEG, 100, outputStream) // 质量设置为 100
                outputStream.flush()
                println("JPEG image saved to: ${file.absolutePath}")
            } catch (e: IOException) {
                e.printStackTrace()
                println("Failed to save JPEG image: ${e.message}")
            } finally {
                outputStream?.close()
            }
        }

        private fun getPicFile(context: Context): File {
            val imagePath = "${context.externalCacheDir?.absolutePath}/uni-media/Pic_${System.currentTimeMillis()}.jpg"
            val file = File(imagePath)
            val parent = file.parentFile
            if (parent != null && !parent.exists()) {
                parent.mkdirs()
            }
            if (file.exists()) {
                //如果用户改过时间，可能会有重复的文件名，所以重新获取一次
                return getPicFile(context)
            }
            return file
        }

        private fun byteArrayToByteBuffer(byteArray: ByteArray): ByteBuffer {
            val byteBuffer = ByteBuffer.allocate(byteArray.size)
            byteBuffer.put(byteArray)
            byteBuffer.flip() // 准备读取
            return byteBuffer
        }

        private fun rectToArray(rect: Rect): IntArray {
            val left = rect.left
            val top = rect.top
            return intArrayOf(left, top, rect.right - left, rect.bottom - top)
        }

        private fun getScanTypeFromStrings(scanType: List<String>): Int {
            var barcodeFormat = Barcode.FORMAT_ALL_FORMATS
            if (scanType.isEmpty()) {
                return Barcode.FORMAT_ALL_FORMATS
            }
            for (type in scanType) {
                when (type) {
                    "DATA_MATRIX" -> {
                        barcodeFormat = barcodeFormat or Barcode.FORMAT_DATA_MATRIX
                    }

                    "PDF417" -> {
                        barcodeFormat = barcodeFormat or Barcode.FORMAT_PDF417
                    }

                    "QR_CODE" -> {
                        barcodeFormat = barcodeFormat or Barcode.FORMAT_QR_CODE
                    }
                }
            }
            return barcodeFormat
        }


        private fun getCharset(bytes: ByteArray): String? {
            val detector = UniversalDetector(null)
            detector.handleData(bytes)
            detector.dataEnd()
            return detector.detectedCharset
        }


        private fun getBarcodeFormatStr(format: Int): String? {
            return when (format) {
                Barcode.FORMAT_QR_CODE -> "QR_CODE"
                Barcode.FORMAT_AZTEC -> "AZTEC"
                Barcode.FORMAT_CODABAR -> "CODABAR"
                Barcode.FORMAT_CODE_39 -> "CODE_39"
                Barcode.FORMAT_CODE_93 -> "CODE_93"
                Barcode.FORMAT_CODE_128 -> "CODE_128"
                Barcode.FORMAT_DATA_MATRIX -> "DATA_MATRIX"
                Barcode.FORMAT_EAN_8 -> "EAN_8"
                Barcode.FORMAT_EAN_13 -> "EAN_13"
                Barcode.FORMAT_ITF -> "ITF"
                Barcode.FORMAT_PDF417 -> "PDF_417"
                Barcode.FORMAT_UPC_A -> "UPC_A"
                Barcode.FORMAT_UPC_E -> "UPC_E"
                else -> null
            }
        }

    }

}