package uts.sdk.modules.uniScanCode

import android.graphics.Bitmap
import android.os.Handler
import android.os.Looper
import android.util.Log
import android.widget.ImageView
import java.io.ByteArrayOutputStream
import java.nio.ByteBuffer

class DrawHelper {
    companion object {

        fun drawImageWithBitmap(imageView: ImageView, bitmap: Bitmap) {
            Handler(Looper.getMainLooper()).post {
                imageView.setImageBitmap(bitmap)
                imageView.scaleType = ImageView.ScaleType.FIT_XY
            }
        }

        fun drawImage(imageView: ImageView, width: Int, height: Int, rotationDegrees: Int, currentFrame: ByteBuffer?) {
            currentFrame?.let { buffer ->
                // 将ByteBuffer转换为byte数组
                val data = ByteArray(buffer.remaining())
                buffer.get(data)

                // 在子线程处理图像转换
                Thread {
                    try {
                        // 创建YuvImage对象（假设是NV21格式）
                        val yuvImage = android.graphics.YuvImage(
                            data,
                            android.graphics.ImageFormat.NV21,
                            width,
                            height,
                            null
                        )

                        // 转换为JPEG格式
                        val outputStream = ByteArrayOutputStream()
                        yuvImage.compressToJpeg(
                            android.graphics.Rect(0, 0, width, height),
                            80,
                            outputStream
                        )

                        // 生成Bitmap
                        val bitmap = android.graphics.BitmapFactory.decodeByteArray(
                            outputStream.toByteArray(),
                            0,
                            outputStream.size()
                        )

                        val rotationBitmap = rotateBitmap(bitmap, rotationDegrees.toFloat())

                        if (!bitmap.isRecycled) {
                            bitmap.recycle()
                        }

                        Handler(Looper.getMainLooper()).post {
                            imageView.setImageBitmap(rotationBitmap)
                            imageView.scaleType = ImageView.ScaleType.FIT_XY
                        }
                    } catch (e: Exception) {
                        Log.e("aaa", "格式转换失败: ${e.message}")
                    }
                }.start()
            }
        }


        private fun rotateBitmap(bitmap: Bitmap, rotationDegrees: Float): Bitmap {
            val matrix = android.graphics.Matrix()
            matrix.postRotate(rotationDegrees) // 设置旋转角度
            val rotatedBitmap = Bitmap.createBitmap(bitmap, 0, 0, bitmap.width, bitmap.height, matrix, true)
            return rotatedBitmap
        }
    }
}