package uts.sdk.modules.uniCamera

import android.graphics.Bitmap
import android.graphics.Matrix
import android.media.MediaMetadataRetriever
import android.os.CountDownTimer
import android.os.Handler
import android.os.Looper
import android.text.TextUtils
import android.util.Size
import android.view.Display
import android.view.Surface
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.camera.core.Camera
import androidx.camera.core.CameraSelector
import androidx.camera.core.CameraState
import androidx.camera.core.ImageAnalysis
import androidx.camera.core.ImageCapture
import androidx.camera.core.ImageCapture.FLASH_MODE_AUTO
import androidx.camera.core.ImageCapture.FLASH_MODE_OFF
import androidx.camera.core.ImageCapture.FLASH_MODE_ON
import androidx.camera.core.ImageCaptureException
import androidx.camera.core.ImageProxy
import androidx.camera.core.MirrorMode
import androidx.camera.core.Preview
import androidx.camera.core.UseCaseGroup
import androidx.camera.core.resolutionselector.ResolutionSelector
import androidx.camera.core.resolutionselector.ResolutionStrategy
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.camera.video.FallbackStrategy.higherQualityOrLowerThan
import androidx.camera.video.FileOutputOptions
import androidx.camera.video.Quality
import androidx.camera.video.QualitySelector
import androidx.camera.video.Recorder
import androidx.camera.video.Recording
import androidx.camera.video.VideoCapture
import androidx.camera.video.VideoRecordEvent
import androidx.camera.view.PreviewView
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.lifecycle.Observer
import java.io.File
import java.io.FileOutputStream
import java.io.IOException
import java.nio.ByteBuffer
import java.util.concurrent.Executors
import android.util.Log
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.launch
import java.lang.reflect.Field
import kotlin.coroutines.CoroutineContext


interface ICallBack {
    fun callback(type: String, param: Any?)
}

class CameraImpl(private val activity: AppCompatActivity) {
    private var previewView: PreviewView? = null
    private var cameraProvider: ProcessCameraProvider? = null
    private var preview: Preview? = null
    private var camera: Camera? = null
    private var imageCapture: ImageCapture? = null
    private var imageAnalysis: ImageAnalysis? = null
    private var videoCapture: VideoCapture<Recorder>? = null
    private var recording: Recording? = null
    private var selfieMirror: Boolean = true
    private var cameraSelector = CameraSelector.DEFAULT_BACK_CAMERA
    private var currentFlash = "auto"
    private var currentResolution = "medium"
    private var currentFrameSize = "medium"
    private var currentPhotoResolution = "medium"
    private var processOnce = 0
    private var captureFrameStatus = false
    private var analysisStatus = false

    // 相机打开状态
    private var cameraOpen = false

    // 帧回调状态
    private var isFrameCallbackActive = false

    // 复用的帧数据缓冲区，避免每帧都分配新内存导致 OOM
    private var reusableRgbaArray: ByteArray? = null
    private var lastFrameWidth = 0
    private var lastFrameHeight = 0

    fun getCameraPreviewView(resolution: String): View {
        currentResolution = resolution
        previewView = PreviewView(activity)
        previewView?.implementationMode = PreviewView.ImplementationMode.COMPATIBLE
        return previewView as PreviewView
    }

    fun startCamera() {
        if (previewView == null || cameraOpen) {
            return
        }
        if (cameraProvider == null) {
            val cameraProviderFuture = ProcessCameraProvider.getInstance(activity)
            cameraProviderFuture.addListener({
                previewView?.let {
                    cameraProvider = cameraProviderFuture.get()
                    startPreview()
                }
            }, ContextCompat.getMainExecutor(activity))
        } else {
            startPreview()
        }
    }

    private var currentPosition: String? = null
    fun switchCamera(position: String) {
        if (isRecording) return
        if (cameraProvider == null) {
            return
        }
        if (previewView == null) {
            return
        }
//        if (currentPosition == position) {
//            return
//        }
        when (position) {
            "front" -> {
                cameraSelector = CameraSelector.DEFAULT_FRONT_CAMERA
                startPreview()
            }

            "back" -> {
                cameraSelector = CameraSelector.DEFAULT_BACK_CAMERA
                startPreview()
            }
        }
        currentPosition = position
    }

    fun setFlash(flash: String) {
        if (isRecording) return
        currentFlash = flash
        when (flash) {
            "auto" -> {
                imageCapture?.flashMode = FLASH_MODE_AUTO
                camera?.cameraControl?.enableTorch(false)
            }

            "on" -> {
                imageCapture?.flashMode = FLASH_MODE_ON
                camera?.cameraControl?.enableTorch(false)
            }

            "off" -> {
                imageCapture?.flashMode = FLASH_MODE_OFF
                camera?.cameraControl?.enableTorch(false)
            }

            "torch" -> {
                imageCapture?.flashMode = FLASH_MODE_OFF
                camera?.cameraControl?.enableTorch(true)
            }

            else -> {
                imageCapture?.flashMode = FLASH_MODE_AUTO
                camera?.cameraControl?.enableTorch(false)
            }
        }
    }

    fun setZoom(zoom: Float) {
        var adjustedZoom = zoom
        val maxValue = camera?.cameraInfo?.zoomState?.value?.maxZoomRatio ?: 1.0f
        val minValue = 1.0f

        adjustedZoom = when {
            adjustedZoom < minValue -> minValue
            adjustedZoom > maxValue -> maxValue
            else -> adjustedZoom
        }

        camera?.cameraControl?.setZoomRatio(adjustedZoom)
    }

    fun getCurrentZoom(): Float {
        return camera?.cameraInfo?.zoomState?.value?.zoomRatio ?: 1.0f
    }


    fun setFrameSize(size: String) {
        if (isRecording) return
        currentFrameSize = size
        cameraProvider?.unbind(imageAnalysis)
        imageAnalysis = buildImageAnalysis()
        cameraProvider?.bindToLifecycle(activity, cameraSelector, imageAnalysis)
    }

    private var setupResolution = false
    fun setPhotoResolution(resolution: String){
        if (isRecording || setupResolution) return
        currentPhotoResolution = resolution
        setupResolution = true
    }

    fun takePhoto(quality: String, selfieMirror: Boolean, success: ICallBack?, fail: ICallBack?) {
        if (imageCapture == null) {
            return
        }

        imageCapture?.takePicture(Executors.newSingleThreadExecutor(), object : ImageCapture.OnImageCapturedCallback() {
            override fun onCaptureSuccess(image: ImageProxy) {
                super.onCaptureSuccess(image)
                    var bitmap = image.toBitmap()

                    val rotation = image.imageInfo.rotationDegrees
                    image.close()
                    if (rotation != 0) {
                        val matrix = Matrix()
                        matrix.postRotate(rotation.toFloat())
                        bitmap = Bitmap.createBitmap(bitmap, 0, 0, bitmap.width, bitmap.height, matrix, true)
                    }

                    if (selfieMirror && cameraSelector == CameraSelector.DEFAULT_FRONT_CAMERA) {
                        bitmap = mirrorBitmap(bitmap)
                    }

                    val file = getPicFile()
                    compressAndSaveBitmap(bitmap, getJpegQuality(quality), file)

                    Handler(Looper.getMainLooper()).post {
                        success?.callback("takephotosuccess", file.absolutePath)
                    }
            }

            override fun onError(exception: ImageCaptureException) {
                super.onError(exception)
                Handler(Looper.getMainLooper()).post {
                    fail?.callback("takephotofail", exception.message)
                }
            }
        })
    }



    private var initDoneCallBack: ICallBack? = null
    fun setInitDoneCallBack(callback: ICallBack) {
        initDoneCallBack = callback
    }

    private var stopCallBack: ICallBack? = null
    fun setStopCallBack(callback: ICallBack) {
        stopCallBack = callback
    }


    private var cameraFrameCallback: ICallBack? = null
    fun setFrameCallback(callback: ICallBack) {
        cameraFrameCallback = callback
    }

    // 获取当前相机位置
    fun getCurrentCameraPosition(): String {
        return when (cameraSelector) {
            CameraSelector.DEFAULT_FRONT_CAMERA -> "front"
            else -> "back"
        }
    }

    // 获取当前闪光灯模式
    fun getCurrentFlashMode(): String {
        return currentFlash
    }

    // 获取初始化完成回调
    fun getInitDoneCallback(): ICallBack? {
        return initDoneCallBack
    }

    // 获取停止回调
    fun getStopCallback(): ICallBack? {
        return stopCallBack
    }

    // 获取帧回调
    fun getFrameCallback(): ICallBack? {
        return cameraFrameCallback
    }

    // 获取帧回调状态
    fun isFrameCallbackActive(): Boolean {
        return isFrameCallbackActive
    }

    fun onDestroy() {
        // 移除相机状态观察者
        camera?.cameraInfo?.cameraState?.let {
            if (it.hasObservers()) {
                it.removeObserver(cameraStateObserver)
            }
        }

        // 停止所有活动的相机功能
        stopOnFrame()
        stopAnalysis()
        if (isRecording) {
            stopRecord()
        }

        // 注意：不在这里调用unbindAll，而是在CameraManager中管理
        // cameraProvider?.unbindAll()
    }


    private fun startPreview() {
        previewView?.also {
            try {
                // 确保先解绑所有用例，避免资源冲突
                //打印当前调用堆栈
//                Log.d("aaa", "startPreview: ${Thread.currentThread().stackTrace.joinToString("\n")}")
                cameraProvider?.unbindAll()

                preview = buildPreview()
                preview?.surfaceProvider = it.surfaceProvider
                imageCapture = buildImageCapture()
                imageAnalysis = buildImageAnalysis()
                videoCapture = buildVideoCapture()

                val useCaseGroupBuilder = UseCaseGroup.Builder()
                useCaseGroupBuilder.addUseCase(preview!!)
                useCaseGroupBuilder.addUseCase(imageCapture!!)
                useCaseGroupBuilder.addUseCase(videoCapture!!)
                if (imageAnalysis != null) {
                    useCaseGroupBuilder.addUseCase(imageAnalysis!!)
                }

                // 绑定用例到生命周期
                camera = cameraProvider?.bindToLifecycle(activity, cameraSelector, useCaseGroupBuilder.build())

                if (currentFlash == "torch") {
                    camera?.cameraControl?.enableTorch(true)
                }

                camera?.cameraInfo?.cameraState?.let {
                    if (it.hasObservers()) {
                        it.removeObserver(cameraStateObserver)
                    }
                    it.observe(activity, cameraStateObserver)
                }

                // 恢复帧回调状态
                if (isFrameCallbackActive) {
                    startOnFrame()
                }
            } catch (exc: Exception) {
                Log.e("CameraImpl", "Error starting preview: ${exc.message}")
                stopCallBack?.callback("stop", exc.message)
            }
        }
    }

    private val cameraStateObserver = Observer<CameraState> { state ->
        when (state.type) {
            CameraState.Type.OPEN -> {
                cameraOpen = true
                if (processOnce == 0) {
                    initDoneCallBack?.callback("initdone", camera?.cameraInfo?.zoomState?.value?.maxZoomRatio)
                    processOnce++
                }
            }

            CameraState.Type.CLOSED -> {
                cameraOpen = false
            }

            CameraState.Type.PENDING_OPEN -> {
            }

            CameraState.Type.OPENING -> {
            }

            CameraState.Type.CLOSING -> {
            }
        }

        if (state.error != null) {
            when (state.error!!.code) {
                CameraState.ERROR_CAMERA_DISABLED -> {
                    stopCallBack?.callback("stop", "camera is disabled")
                }

                CameraState.ERROR_CAMERA_IN_USE -> {
                    stopCallBack?.callback("stop", "camera is in use")
                }

                CameraState.ERROR_CAMERA_FATAL_ERROR -> {
                    stopCallBack?.callback("stop", "camera fatal error")
                }
            }
        }
    }

    private fun replaceVideoUseCaseWithMirror() {
        if (cameraSelector == CameraSelector.DEFAULT_FRONT_CAMERA) {
            activity.runOnUiThread {
                cameraProvider?.unbind(videoCapture, preview)
                videoCapture = buildVideoCapture()
                cameraProvider?.bindToLifecycle(activity, cameraSelector, videoCapture, preview)
            }
        }
    }


    private fun buildImageCapture(): ImageCapture {
        val strategy = when (currentPhotoResolution) {
            "low" -> {
                ResolutionStrategy(Size(480, 480), ResolutionStrategy.FALLBACK_RULE_CLOSEST_HIGHER_THEN_LOWER)
            }

            "medium" -> {
                ResolutionStrategy(Size(720, 720), ResolutionStrategy.FALLBACK_RULE_CLOSEST_HIGHER_THEN_LOWER)
            }

            "high" -> {
                ResolutionStrategy(Size(1080, 1080), ResolutionStrategy.FALLBACK_RULE_CLOSEST_HIGHER_THEN_LOWER)
            }

            else -> {
                ResolutionStrategy(Size(720, 720), ResolutionStrategy.FALLBACK_RULE_CLOSEST_HIGHER_THEN_LOWER)
            }
        }

        val resolutionSelector = ResolutionSelector.Builder()
            .setResolutionStrategy(strategy)
            .build()

        imageCapture = if (currentPhotoResolution == "original") {
            ImageCapture.Builder()
                .setTargetRotation(getDisplayRotation())
                .build()
        }else {
            ImageCapture.Builder()
                .setResolutionSelector(resolutionSelector)
                .setTargetRotation(getDisplayRotation())
                .build()
        }
        when (currentFlash) {
            "auto" -> {
                imageCapture!!.flashMode = FLASH_MODE_AUTO
            }

            "on" -> {
                imageCapture!!.flashMode = FLASH_MODE_ON
            }

            "off" -> {
                imageCapture!!.flashMode = FLASH_MODE_OFF
            }

            else -> {
                imageCapture!!.flashMode = FLASH_MODE_AUTO
            }
        }
        return imageCapture as ImageCapture
    }

    private fun buildImageAnalysis(): ImageAnalysis {
//        val displayRotation = getDisplayRotation()
//        val portrait = displayRotation == Surface.ROTATION_0 || displayRotation == Surface.ROTATION_180
        val strategy = when (currentFrameSize) {
            "small" -> {
                ResolutionStrategy(Size(480, 480), ResolutionStrategy.FALLBACK_RULE_CLOSEST_HIGHER_THEN_LOWER)
            }

            "medium" -> {
                ResolutionStrategy(Size(720, 720), ResolutionStrategy.FALLBACK_RULE_CLOSEST_HIGHER_THEN_LOWER)
            }

            "large" -> {
                ResolutionStrategy(Size(1080, 1080), ResolutionStrategy.FALLBACK_RULE_CLOSEST_HIGHER_THEN_LOWER)
            }

            else -> {
                ResolutionStrategy(Size(720, 720), ResolutionStrategy.FALLBACK_RULE_CLOSEST_HIGHER_THEN_LOWER)
            }
        }

        val resolutionSelector = ResolutionSelector.Builder()
            .setResolutionStrategy(strategy)
            .build()
        return ImageAnalysis.Builder()
            .setTargetRotation(getDisplayRotation())
            .setResolutionSelector(resolutionSelector)
            .setBackpressureStrategy(ImageAnalysis.STRATEGY_KEEP_ONLY_LATEST)
//            .setOutputImageFormat(ImageAnalysis.OUTPUT_IMAGE_FORMAT_RGBA_8888)
            .build()
    }


    private fun buildVideoCapture(): VideoCapture<Recorder> {
        val qualitySelector = QualitySelector.fromOrderedList(
            listOf(Quality.HIGHEST, Quality.UHD, Quality.FHD, Quality.HD, Quality.SD),
            higherQualityOrLowerThan
                (Quality.SD)
        )
        val recorder = Recorder.Builder()
            .setQualitySelector(qualitySelector)
            .build()
        return VideoCapture.Builder(recorder)
            .setMirrorMode(if (selfieMirror) MirrorMode.MIRROR_MODE_ON_FRONT_ONLY else MirrorMode.MIRROR_MODE_OFF)
            .build()
    }

    fun startOnFrame() {
        captureFrameStatus = true
        isFrameCallbackActive = true
        registerAnalyzer()
    }

    fun stopOnFrame() {
        captureFrameStatus = false
        isFrameCallbackActive = false
        unRegisterAnalyzer()
        // 释放复用的缓冲区
        reusableRgbaArray = null
        lastFrameWidth = 0
        lastFrameHeight = 0
    }

    private fun registerAnalyzer(cameraOriginalFrameCallback: ICallBack? = null) {
        if (!captureFrameStatus && !analysisStatus) {
            return
        }
        imageAnalysis?.clearAnalyzer()
        imageAnalysis?.setAnalyzer(Executors.newSingleThreadExecutor()) { imageProxy ->
            // 先检查状态，避免已停止后继续处理
            if (!captureFrameStatus && !analysisStatus) {
                imageProxy.close()
                return@setAnalyzer
            }

            if (captureFrameStatus) {
                cameraFrameCallback?.let {
                    val width = imageProxy.width
                    val height = imageProxy.height
                    val requiredSize = width * height * 4

                    // 复用缓冲区：只有尺寸变化时才重新分配
                    if (reusableRgbaArray == null || lastFrameWidth != width || lastFrameHeight != height) {
                        reusableRgbaArray = ByteArray(requiredSize)
                        lastFrameWidth = width
                        lastFrameHeight = height
                    }

                    // 获取局部引用，防止在使用过程中被其他线程置空
                    val rgbaArray = reusableRgbaArray ?: return@let

                    convertYUVToRGBAReusable(imageProxy, rgbaArray)

                    // wrap() 零拷贝包装，只创建轻量包装器对象
                    val byteBuffer = ByteBuffer.wrap(rgbaArray)
                    it.callback("frame", mapOf("width" to width, "height" to height, "buffer" to byteBuffer))
                }
                if (!analysisStatus) {
                    imageProxy.close()
                }
            }
            if (analysisStatus && cameraOriginalFrameCallback != null) {
                cameraOriginalFrameCallback.callback("original_frame", imageProxy)
            }
        }
    }


    fun rgbaToBitmap(rgbaData: ByteArray, width: Int, height: Int): Bitmap {
        val bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888)
        val buffer = ByteBuffer.wrap(rgbaData)
        bitmap.copyPixelsFromBuffer(buffer)
        return bitmap
    }

    fun saveBitmapAsJPEG(bitmap: Bitmap) {
        val file = getPicFile()
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

    private fun byteArrayToByteBuffer(byteArray: ByteArray): ByteBuffer {
        val byteBuffer = ByteBuffer.allocate(byteArray.size)
        byteBuffer.put(byteArray)
        byteBuffer.flip() // 准备读取
        return byteBuffer
    }


    /**
     * 将 YUV 数据转换为 RGBA，写入到传入的复用缓冲区中
     */
    private fun convertYUVToRGBAReusable(image: ImageProxy, rgba: ByteArray) {
        val width = image.width
        val height = image.height

        val yBuffer = image.planes[0].buffer
        val uBuffer = image.planes[1].buffer
        val vBuffer = image.planes[2].buffer

        val yRowStride = image.planes[0].rowStride
        val uvRowStride = image.planes[1].rowStride
        val uvPixelStride = image.planes[1].pixelStride

        // 优化1：使用整数运算替代浮点运算（提升约30%性能）
        val precalcFactor = 1 shl 16  // 用于定点数运算的缩放因子
        val vFactor = (1.402f * precalcFactor).toInt()
        val uFactor = (0.344136f * precalcFactor).toInt()
        val uvFactor = (0.714136f * precalcFactor).toInt()
        val uFactor2 = (1.772f * precalcFactor).toInt()

        // 优化2：减少循环次数（每次处理2个像素）
        for (j in 0 until height step 2) {
            for (i in 0 until width step 2) {
                val yIndex = j * yRowStride + i
                val uvIndex = (j / 2) * uvRowStride + (i / 2) * uvPixelStride

                val u = uBuffer[uvIndex].toInt() and 0xFF
                val v = vBuffer[uvIndex].toInt() and 0xFF

                // 预计算公共值（减少重复计算）
                val vDiff = (v - 128) * vFactor
                val uDiff = (u - 128)
                val uvDiff = uDiff * uFactor + (v - 128) * uvFactor
                val uDiff2 = uDiff * uFactor2

                // 处理4个Y像素（2x2块）
                for (dy in 0..1) {
                    for (dx in 0..1) {
                        val y = yBuffer[yIndex + dx + dy * yRowStride].toInt() and 0xFF

                        // 使用定点数运算
                        val r = (y * precalcFactor + vDiff) shr 16
                        val g = (y * precalcFactor - uvDiff) shr 16
                        val b = (y * precalcFactor + uDiff2) shr 16

                        val rgbaIndex = ((j + dy) * width + (i + dx)) * 4
                        if (rgbaIndex + 3 < rgba.size) {
                            rgba[rgbaIndex] = r.coerceIn(0, 255).toByte()
                            rgba[rgbaIndex + 1] = g.coerceIn(0, 255).toByte()
                            rgba[rgbaIndex + 2] = b.coerceIn(0, 255).toByte()
                            rgba[rgbaIndex + 3] = 255.toByte()
                        }
                    }
                }
            }
        }
    }

    private fun unRegisterAnalyzer() {
        // 非捕获帧状态、扫码状态时，才会关闭分析器
        if (!captureFrameStatus && !analysisStatus) {
            try {
                imageAnalysis?.clearAnalyzer()
                cameraProvider?.unbind(imageAnalysis)
                imageAnalysis = buildImageAnalysis()
                cameraProvider?.bindToLifecycle(activity, cameraSelector, imageAnalysis)
            } catch (e: Exception) {

            }
        }
    }


    private var isRecording = false
    private var timeout = 30
    private var timeoutCallback: ICallBack? = null
    private var startRecordSuccess: ICallBack? = null
    private var startRecordFail: ICallBack? = null

    /**
     * stopRecord停止录制的类型 0
     * 定时停止录制的类型 1
     */
    private var stopRecordType = 0

    /**
     * 计时器
     */
    private var countDownTimer: CountDownTimer? = null

    @Synchronized
    fun startRecord(
        timeout: Int = 30, selfieMirror: Boolean = true, timeoutCallback: ICallBack?, recordSuccess: ICallBack?, recordFail:
        ICallBack?
    ) {
        if (isRecording) return
        isRecording = true
        if (this.selfieMirror != selfieMirror) {
            this.selfieMirror = selfieMirror
            replaceVideoUseCaseWithMirror()
        }
        this.timeout = timeout
        this.timeoutCallback = timeoutCallback
        this.startRecordSuccess = recordSuccess
        this.startRecordFail = recordFail
        videoCapture?.let { videoCapture ->
            recording = videoCapture.output
                .prepareRecording(activity, FileOutputOptions.Builder(getVideoFile()).build())
                .apply {
                    if (ActivityCompat.checkSelfPermission(
                            activity,
                            android.Manifest.permission.RECORD_AUDIO
                        ) == android.content.pm.PackageManager.PERMISSION_GRANTED
                    ) {
                        withAudioEnabled()
                    }
                }
                .start(ContextCompat.getMainExecutor(activity)) { recordEvent ->
                    when (recordEvent) {
                        is VideoRecordEvent.Start -> {
                            recordSuccess?.callback("recordsuccess", null)
                            countDownTimer = object : CountDownTimer(timeout * 1000L, 1000) {
                                override fun onTick(millisUntilFinished: Long) {
                                }

                                override fun onFinish() {
                                    stopRecord(1, null, null)
                                }
                            }
                            countDownTimer?.start()
                        }

                        is VideoRecordEvent.Finalize -> {
                            if (!recordEvent.hasError()) {
                                val path = recordEvent.outputResults.outputUri.path
                                if (TextUtils.isEmpty(path)) {
                                    if (stopRecordType == 1) {
                                        timeoutCallback?.callback("timeoutCallback", "video path is empty")
                                    } else {
                                        recordFail?.callback("stopRecordFail", "video path is empty")
                                    }
                                }
                                val firstFramePath = saveFirstFrame(path!!)
                                //定时停止录制
                                if (stopRecordType == 1) {
                                    timeoutCallback?.callback("timeoutCallback", mapOf("tempVideoPath" to path, "tempThumbPath" to firstFramePath))
                                } else {
                                    stopRecordSuccess?.callback(
                                        "stopRecordSuccess",
                                        mapOf("tempVideoPath" to path, "tempThumbPath" to firstFramePath)
                                    )
                                }
                            } else {
                                if (stopRecordType == 1) {
                                    timeoutCallback?.callback("timeoutCallback", recordEvent.cause?.message)
                                } else {
                                    recordFail?.callback("stopRecordFail", recordEvent.cause?.message)
                                }
                            }
                            recordReset()
                        }
                    }
                }
        }
    }

    private var stopRecordSuccess: ICallBack? = null
    private var stopRecordFail: ICallBack? = null

    @Synchronized
    fun stopRecord(stopRecordType: Int = 0, stopRecordSuccess: ICallBack? = null, stopRecordFail: ICallBack? = null) {
        if (isRecording) {
            this.stopRecordSuccess = stopRecordSuccess
            this.stopRecordFail = stopRecordFail
            this.stopRecordType = stopRecordType
            recording?.close()
            isRecording = false
            this.timeout = 30
            this.selfieMirror = true
            this.timeoutCallback = null
            this.startRecordSuccess = null
            this.startRecordFail = null
            recording = null
            countDownTimer?.cancel()
            countDownTimer = null
        }
    }

    private var analysisCallback : ICallBack? = null
    // 获取分析回调状态
    fun isAnalysisActive(): Boolean {
        return analysisStatus
    }

    // 获取分析回调
    fun getAnalysisCallback(): ICallBack? {
        return analysisCallback
    }

    fun startAnalysis(
        cameraOriginalFrameCallback: ICallBack
    ) {
        analysisStatus = true
        analysisCallback = cameraOriginalFrameCallback
        registerAnalyzer(cameraOriginalFrameCallback)
    }

    fun stopAnalysis() {
        analysisStatus = false
        unRegisterAnalyzer()
    }

    private fun recordReset() {
        this.stopRecordSuccess = null
        this.stopRecordFail = null
        this.stopRecordType = 0
        recording?.close()
        isRecording = false
        this.timeout = 30
        this.selfieMirror = true
        this.timeoutCallback = null
        this.startRecordSuccess = null
        this.startRecordFail = null
        recording = null
        countDownTimer?.cancel()
        countDownTimer = null
    }


    private fun saveFirstFrame(path: String): String? {
        MediaMetadataRetriever().apply {
            setDataSource(path)
            val bitmap = getFrameAtTime(0, MediaMetadataRetriever.OPTION_CLOSEST) ?: return null
            val file = getPicFile()
            compressAndSaveBitmap(bitmap, 100, file)
            return file.absolutePath
        }
    }


    private fun getJpegQuality(quality: String): Int {
        return when (quality) {
            "low" -> 30
            "normal" -> 90
            "high" -> 95
            "original" -> 100
            else -> 90
        }
    }

    private fun buildPreview(): Preview {
//        val displayRotation = getDisplayRotation()
//        val portrait = displayRotation == Surface.ROTATION_0 || displayRotation == Surface.ROTATION_180
        val strategy = when (currentResolution) {
            "low" -> {
                ResolutionStrategy(Size(480, 480), ResolutionStrategy.FALLBACK_RULE_CLOSEST_HIGHER_THEN_LOWER)
            }

            "medium" -> {
                ResolutionStrategy(Size(720, 720), ResolutionStrategy.FALLBACK_RULE_CLOSEST_HIGHER_THEN_LOWER)
            }

            "high" -> {
                ResolutionStrategy(Size(1080, 1080), ResolutionStrategy.FALLBACK_RULE_CLOSEST_HIGHER_THEN_LOWER)
            }

            else -> {
                ResolutionStrategy(Size(720, 720), ResolutionStrategy.FALLBACK_RULE_CLOSEST_HIGHER_THEN_LOWER)
            }
        }

        val resolutionSelector = ResolutionSelector.Builder()
            .setResolutionStrategy(strategy)
            .build()
        return Preview.Builder()
            .setResolutionSelector(resolutionSelector)
            .setTargetRotation(getDisplayRotation())
            .build()
    }

    private fun getDisplayRotation(): Int {
        val display: Display = if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.R) {
            activity.display!!
        } else {
            @Suppress("DEPRECATION")
            activity.windowManager.defaultDisplay
        }
        return when (display.rotation) {
            Surface.ROTATION_0 -> Surface.ROTATION_0
            Surface.ROTATION_90 -> Surface.ROTATION_90
            Surface.ROTATION_180 -> Surface.ROTATION_180
            Surface.ROTATION_270 -> Surface.ROTATION_270
            else -> Surface.ROTATION_0
        }
    }

    private fun getPicFile(): File {
        val imagePath = "${activity.externalCacheDir?.absolutePath}/uni-media/Pic_${System.currentTimeMillis()}.jpg"
        val file = File(imagePath)
        val parent = file.parentFile
        if (parent != null && !parent.exists()) {
            parent.mkdirs()
        }
        if (file.exists()) {
            //如果用户改过时间，可能会有重复的文件名，所以重新获取一次
            return getPicFile()
        }
        return file
    }


    private fun getVideoFile(): File {
        val videoPath = "${activity.externalCacheDir?.absolutePath}/uni-media/Video_${System.currentTimeMillis()}.mp4"
        val file = File(videoPath)
        val parent = file.parentFile
        if (parent != null && !parent.exists()) {
            parent.mkdirs()
        }
        if (file.exists()) {
            //如果用户改过时间，可能会有重复的文件名，所以重新获取一次
            return getVideoFile()
        }
        return file
    }


    private fun compressAndSaveBitmap(bitmap: Bitmap, quality: Int, file: File) {
        try {
            FileOutputStream(file).use { out ->
                bitmap.compress(Bitmap.CompressFormat.JPEG, quality, out)
                out.flush()
            }
        } catch (e: IOException) {
            e.printStackTrace()
        }
    }

    /**
     * 镜像bitmap
     * @param original Bitmap
     * @return Bitmap
     */
    private fun mirrorBitmap(original: Bitmap): Bitmap {
        val matrix = Matrix().apply { preScale(-1.0f, 1.0f) }
        return Bitmap.createBitmap(original, 0, 0, original.width, original.height, matrix, true)
    }

    fun stopCamera() {
        try {
            // 停止帧捕获
            stopOnFrame()
            // 停止分析
            stopAnalysis()
            // 停止录制
            if (isRecording) {
                stopRecord()
            }

            // 移除观察者
            camera?.cameraInfo?.cameraState?.let {
                if (it.hasObservers()) {
                    it.removeObserver(cameraStateObserver)
                }
            }

            // 解绑所有用例
            cameraProvider?.unbindAll()

            // 重置相机状态
            cameraOpen = false
            processOnce = 0
        } catch (e: Exception) {
            Log.e("CameraImpl", "Error stopping camera: ${e.message}")
        }
    }

    fun reset() {
        stopCamera()

        // 重置所有状态变量
        previewView = null
        camera = null
        preview = null
        imageCapture = null
        imageAnalysis = null
        videoCapture = null
        recording = null
        captureFrameStatus = false
        analysisStatus = false
        isFrameCallbackActive = false
        processOnce = 0

        // 清除回调引用
        initDoneCallBack = null
        stopCallBack = null
        cameraFrameCallback = null
        analysisCallback = null

        // 释放复用的缓冲区
        reusableRgbaArray = null
        lastFrameWidth = 0
        lastFrameHeight = 0
    }
}
