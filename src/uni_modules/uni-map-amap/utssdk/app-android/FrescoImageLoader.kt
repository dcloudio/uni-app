package uts.sdk.modules.uniMapAmap

import android.content.Context
import android.graphics.Bitmap
import android.net.Uri
import java.io.File
import com.facebook.common.executors.UiThreadImmediateExecutorService
import com.facebook.common.references.CloseableReference
import com.facebook.datasource.DataSource
import com.facebook.drawee.backends.pipeline.Fresco
import com.facebook.imagepipeline.common.ResizeOptions
import com.facebook.imagepipeline.datasource.BaseBitmapDataSubscriber
import com.facebook.imagepipeline.image.CloseableImage
import com.facebook.imagepipeline.request.ImageRequestBuilder

/**
 * 图片加载器（Fresco，与腾讯插件一致）
 * 支持网络地址与本地文件路径；返回 [LoadHandle] 以便在销毁时取消未完成的请求。
 * onSuccess 回传的是位图副本（copy），调用方拥有并可自行回收。
 */
object FrescoImageLoader {

    /**
     * 加载句柄：调用 cancel 关闭底层 DataSource，取消未完成的请求
     */
    class LoadHandle internal constructor(private val dataSource: DataSource<*>?) {
        fun cancel() {
            try {
                dataSource?.close()
            } catch (e: Exception) {
            }
        }
    }

    fun loadBitmap(
        context: Context,
        path: String,
        width: Int?,
        height: Int?,
        onSuccess: (Bitmap) -> Unit,
        onFailure: () -> Unit
    ): LoadHandle {
        initialize(context)
        val source = if (path.startsWith("/")) Uri.fromFile(File(path)) else Uri.parse(path)
        val requestBuilder = ImageRequestBuilder.newBuilderWithSource(source)
        if (width != null && height != null) {
            requestBuilder.setResizeOptions(ResizeOptions(width, height))
        }
        val dataSource = Fresco.getImagePipeline().fetchDecodedImage(requestBuilder.build(), null)
        dataSource.subscribe(
            object : BaseBitmapDataSubscriber() {
                override fun onNewResultImpl(bitmap: Bitmap?) {
                    if (bitmap == null) {
                        onFailure()
                    } else {
                        try {
                            onSuccess(bitmap.copy(bitmap.config ?: Bitmap.Config.ARGB_8888, false))
                        } catch (e: Exception) {
                            onFailure()
                        }
                    }
                }

                override fun onFailureImpl(dataSource: DataSource<CloseableReference<CloseableImage>>) {
                    onFailure()
                }
            },
            UiThreadImmediateExecutorService.getInstance()
        )
        return LoadHandle(dataSource)
    }

    private fun initialize(context: Context) {
        synchronized(this) {
            if (!Fresco.hasBeenInitialized()) {
                Fresco.initialize(context.applicationContext)
            }
        }
    }
}
