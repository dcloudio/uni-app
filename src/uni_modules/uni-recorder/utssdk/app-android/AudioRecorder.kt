package uts.sdk.modules.uniRecorder

import android.media.AudioFormat
import android.media.AudioRecord
import android.media.MediaCodec
import android.media.MediaCodecInfo
import android.media.MediaFormat
import android.media.MediaMuxer
import android.media.MediaRecorder
import android.os.Handler
import android.os.Looper
import android.util.Log
import io.dcloud.feature.audio.mp3.SimpleLame
import java.io.File
import java.io.FileOutputStream
import java.io.IOException
import java.io.RandomAccessFile
import java.util.Timer
import java.util.TimerTask

class AudioRecorder() {
    private var audioRecord: AudioRecord? = null
    var isRecording = false
    var isPaused = false
    private var filePath: String? = null
    private var format: RecordingFormat? = null
    private var recordingThread: Thread? = null
    private var sampleRate = 8000 // 默认采样率
    private var channelConfig = AudioFormat.CHANNEL_IN_STEREO // 默认双声道
    private var audioEncoding = AudioFormat.ENCODING_PCM_16BIT // 默认16位
    private var bitRate = 128000 // 默认码率 (AAC/MP3)
    private var recordingListener: RecordingListener? = null
    private var audioDataListener: AudioDataListener? = null
    private var saveToFile = true
    private var mediaCodec: MediaCodec? = null
    private var mediaMuxer: MediaMuxer? = null
    private var audioTrackIndex = -1
    private var lameInitialized = false
    private val mainHandler = Handler(Looper.getMainLooper())
    private var audioBuffer: ByteArray? = null

    // 新增变量用于处理录制时长
    private var maxRecordingDuration: Long = 600000 // 默认最大录制时长为 600000 毫秒
    private var recordingStartTime: Long = 0 // 录音开始时间
    private var pauseStartTime: Long = 0 // 暂停开始时间
    private var totalPauseDuration: Long = 0 // 累计暂停时长
    private var timer: Timer? = null // 定时器用于检查录制时长

    private var presentationTimeUs: Long = 0

    // 定义错误码常量
    companion object {
        const val ERROR_RECORDING_IN_PROGRESS = 1001
        const val ERROR_NO_SUPPORTED_SAMPLE_RATE = 1107602
        const val ERROR_BUFFER_SIZE_CALCULATION_FAILED = 1107603
        const val ERROR_AUDIO_RECORD_INIT_FAILED = 1107604
        const val ERROR_AAC_ENCODER_NOT_SUPPORTED = 1107605
        const val ERROR_INITIALIZATION_FAILED = 1107604
        const val ERROR_RECORDING_START_FAILED = 1107604
        const val ERROR_FILE_CREATION_FAILED = 1008
        const val ERROR_FILE_WRITE_FAILED = 1009
        const val ERROR_CANNOT_MODIFY_DURING_RECORDING = 1010
        const val ERROR_UNKNOWN = 9999
        const val ERROR_PERMISSION_DENIED = 1107601
        const val ERROR_INVALID_FILE_PATH = 1012
        const val ERROR_FILE_ALREADY_EXISTS = 1013
    }

    enum class RecordingFormat {
        AAC, PCM, MP3, WAV
    }

    // 录音状态回调接口
    interface RecordingListener {
        fun onRecordingStarted()
        fun onRecordingStopped()
        fun onRecordingPaused()
        fun onRecordingResumed()
        fun onRecordingError(errorCode: Int, errorMessage: String)
    }

    // 音频数据回调接口
    interface AudioDataListener {
        fun onAudioData(data: ByteArray, size: Int)
        fun onAudioError(errorCode: Int, errorMessage: String)
    }

    fun getFilePath(): String? {
        return filePath
    }

    // 设置录音参数
    fun setAudioParams(sampleRate: Int, channels: Int, bitRate: Int) {
        if (isRecording) {
            notifyError(ERROR_CANNOT_MODIFY_DURING_RECORDING, "录音正在进行，无法修改录音参数")
            return
        }

        // 校验并设置采样率，如果传入值非法，则使用默认值 44100
        this.sampleRate = if (sampleRate > 0) sampleRate else 44100

        // 校验并设置码率，如果传入值非法，则使用默认值 128000
        this.bitRate = if (bitRate > 0) bitRate else 128000

        // 校验并设置通道配置，非法值将默认设置为双通道 (STEREO)
        this.channelConfig = when (channels) {
            1 -> AudioFormat.CHANNEL_IN_MONO
            2 -> AudioFormat.CHANNEL_IN_STEREO
            else -> AudioFormat.CHANNEL_IN_STEREO // 默认使用双通道
        }
    }

    // 设置各种监听器
    fun setRecordingListener(listener: RecordingListener?) {
        this.recordingListener = listener
    }

    fun setAudioDataListener(listener: AudioDataListener?) {
        this.audioDataListener = listener
    }

    // 设置是否保存到文件
    fun setSaveToFile(saveToFile: Boolean) {
        if (isRecording) {
            notifyError(ERROR_CANNOT_MODIFY_DURING_RECORDING, "录音正在进行，无法修改保存设置")
            return
        }
        this.saveToFile = saveToFile
    }

    // 设置最大录制时长
    fun setMaxRecordingDuration(duration: Long) {
        if (isRecording) {
            notifyError(ERROR_CANNOT_MODIFY_DURING_RECORDING, "录音正在进行，无法修改最大录制时长")
            return
        }
        this.maxRecordingDuration = duration
    }

    fun startRecording(format: RecordingFormat, fileName: String) {
        if (isRecording) {
            notifyError(ERROR_RECORDING_IN_PROGRESS, "已有录音操作正在进行")
            return
        }

        this.format = format

        // 校验文件路径
        if (saveToFile) {
            if (fileName.isBlank()) {
                notifyError(ERROR_INVALID_FILE_PATH, "文件路径不能为空")
                return
            }
            val file = File(fileName)
            if (file.isDirectory) {
                notifyError(ERROR_INVALID_FILE_PATH, "提供的路径是一个目录，而不是文件")
                return
            }
            if (file.exists()) {
                notifyError(ERROR_FILE_ALREADY_EXISTS, "文件已存在: $fileName")
                return
            }
            val parentDir = file.parentFile
            if (parentDir != null && !parentDir.exists()) {
                if (!parentDir.mkdirs()) {
                    notifyError(ERROR_FILE_CREATION_FAILED, "无法创建父目录")
                    return
                }
            }
            this.filePath = fileName
        } else {
            this.filePath = null
        }
        Log.d("AudioRecorder", "File path set to: $filePath")


        // 检测并调整采样率
        sampleRate = checkAndAdjustSampleRate()
        if (sampleRate == -1) {
            notifyError(ERROR_NO_SUPPORTED_SAMPLE_RATE, "没有支持的采样率")
            return
        }

        val bufferSize = AudioRecord.getMinBufferSize(sampleRate, channelConfig, audioEncoding)
        if (bufferSize == AudioRecord.ERROR_BAD_VALUE || bufferSize == AudioRecord.ERROR) {
            notifyError(ERROR_BUFFER_SIZE_CALCULATION_FAILED, "计算缓冲区大小失败")
            return
        }

        try {
            audioRecord = AudioRecord(
                MediaRecorder.AudioSource.MIC,
                sampleRate,
                channelConfig,
                audioEncoding,
                bufferSize
            )
        } catch (e: SecurityException) {
            notifyError(ERROR_PERMISSION_DENIED, "录音权限被拒绝: ${e.message}")
            return
        }


        if (audioRecord?.state != AudioRecord.STATE_INITIALIZED) {
            notifyError(ERROR_AUDIO_RECORD_INIT_FAILED, "AudioRecord 初始化失败")
            audioRecord?.release()
            audioRecord = null
            return
        }

        try {
            when (format) {
                RecordingFormat.AAC -> {
                    if (!checkAacEncoderSupport()) {
                        notifyError(ERROR_AAC_ENCODER_NOT_SUPPORTED, "不支持 AAC 编码")
                        return
                    }
                    initAacEncoder()
                }

                RecordingFormat.MP3 -> {
                    initLame()
                }

                RecordingFormat.WAV -> {
                    if (saveToFile && filePath != null) {
                        FileOutputStream(filePath).use { os ->
                            writeWavHeaderPlaceholder(os)
                        }
                    }
                }

                else -> {}
            }
        } catch (e: IOException) {
            notifyError(ERROR_INITIALIZATION_FAILED, "启动失败: ${e.message}")
            cleanupResources()
            return
        }

        audioRecord?.startRecording()
        if (audioRecord?.recordingState != AudioRecord.RECORDSTATE_RECORDING) {
            notifyError(ERROR_RECORDING_START_FAILED, "录音启动失败")
            cleanupResources()
            return
        }
        isRecording = true
        isPaused = false
        presentationTimeUs = 0 // 在这里重置

        // 记录录音开始时间
        recordingStartTime = System.currentTimeMillis()
        totalPauseDuration = 0

        // 启动定时器检查录制时长
        timer = Timer()
        timer?.scheduleAtFixedRate(object : TimerTask() {
            override fun run() {
                if (isRecording && !isPaused) {
                    val actualRecordingTime =
                        System.currentTimeMillis() - recordingStartTime - totalPauseDuration
                    if (actualRecordingTime >= maxRecordingDuration) {
                        mainHandler.post {
                            stopRecording()
                        }
                        cancel()
                    }
                }
            }
        }, 100, 100) // 每 100 毫秒检查一次

        audioBuffer = ByteArray(bufferSize)

        recordingThread = Thread({
            var os: FileOutputStream? = null

            try {
                if (saveToFile && filePath != null && format != RecordingFormat.AAC) {
                    os = FileOutputStream(filePath, true)
                }

                while (isRecording) {
                    val buffer = audioBuffer!!
                    val read = audioRecord?.read(buffer, 0, buffer.size) ?: -1
                    if (read != AudioRecord.ERROR_INVALID_OPERATION && read > 0) {
                        // 回调音频数据
                        if (audioDataListener != null && !isPaused) {
                            val dataCopy = buffer.copyOf(read)
                            mainHandler.post {
                                audioDataListener?.onAudioData(dataCopy, read)
                            }
                        }

                        // 处理保存逻辑
                        if (!isPaused && saveToFile && filePath != null) {
                            when (format) {
                                RecordingFormat.AAC -> encodeAac(buffer, read)
                                RecordingFormat.MP3 -> encodeToMp3(buffer, read, os)
                                RecordingFormat.PCM, RecordingFormat.WAV -> os?.write(
                                    buffer,
                                    0,
                                    read
                                )
                            }
                        }
                    }
                }
            } catch (e: IOException) {
                notifyError(ERROR_FILE_WRITE_FAILED, "录音过程中写入文件出错: ${e.message}")
            } finally {
                // 清理资源
                cleanupResources()

                // 完成文件处理
                os?.use {
                    try {
                        it.flush()
                        if (format == RecordingFormat.WAV && saveToFile && filePath != null) {
                            updateWavHeader(filePath!!, sampleRate, getChannelCount(), 16)
                        }
                    } catch (e: IOException) {
                        notifyError(ERROR_FILE_WRITE_FAILED, "文件处理出错: ${e.message}")
                    }
                }
            }
        }, "AudioRecorder Thread")

        recordingThread?.start()
        mainHandler.post {
            recordingListener?.onRecordingStarted()
        }
    }

    private fun initAacEncoder() {
        val audioFormat = MediaFormat.createAudioFormat(
            MediaFormat.MIMETYPE_AUDIO_AAC,
            sampleRate,
            getChannelCount()
        )
        audioFormat.setInteger(MediaFormat.KEY_BIT_RATE, bitRate)
        audioFormat.setInteger(
            MediaFormat.KEY_AAC_PROFILE,
            MediaCodecInfo.CodecProfileLevel.AACObjectLC
        )

        mediaCodec = MediaCodec.createEncoderByType(MediaFormat.MIMETYPE_AUDIO_AAC)
        mediaCodec?.configure(audioFormat, null, null, MediaCodec.CONFIGURE_FLAG_ENCODE)
        mediaCodec?.start()

        mediaMuxer = MediaMuxer(filePath!!, MediaMuxer.OutputFormat.MUXER_OUTPUT_MPEG_4)
    }

    private fun encodeAac(buffer: ByteArray, length: Int) {
        if (isPaused) return
        var offset = 0
        while (offset < length && isRecording) {
            val inputBufferIndex = mediaCodec?.dequeueInputBuffer(-1) ?: -1
            if (inputBufferIndex >= 0) {
                val inputBuffer = mediaCodec?.getInputBuffer(inputBufferIndex)
                inputBuffer?.clear()

                val capacity = inputBuffer?.capacity() ?: 0
                val size = if (length - offset > capacity) capacity else length - offset

                if (size > 0) {
                    inputBuffer?.put(buffer, offset, size)

                    // 使用手动维护的时间戳
                    mediaCodec?.queueInputBuffer(
                        inputBufferIndex,
                        0,
                        size,
                        presentationTimeUs,
                        0
                    )
                    // 根据写入的数据量计算下一帧的时间戳
                    // 时间戳单位为微秒 (us)
                    // (size * 1_000_000L) / (sampleRate * channels * bytesPerSample)
                    presentationTimeUs += (size.toLong() * 1000000) / (sampleRate * getChannelCount() * 2)

                    offset += size
                }
            }

            // 处理编码后的数据
            val bufferInfo = MediaCodec.BufferInfo()
            var outputBufferIndex = mediaCodec?.dequeueOutputBuffer(bufferInfo, 0) ?: -1
            while (outputBufferIndex >= 0) {
                val outputBuffer = mediaCodec?.getOutputBuffer(outputBufferIndex)
                if (audioTrackIndex == -1) {
                    audioTrackIndex = mediaMuxer?.addTrack(mediaCodec?.outputFormat!!) ?: -1
                    mediaMuxer?.start()
                }
                outputBuffer?.position(bufferInfo.offset)
                outputBuffer?.limit(bufferInfo.offset + bufferInfo.size)
                if (bufferInfo.size > 0 && bufferInfo.presentationTimeUs > 0) {
                    mediaMuxer?.writeSampleData(audioTrackIndex, outputBuffer!!, bufferInfo)
                }
                mediaCodec?.releaseOutputBuffer(outputBufferIndex, false)
                outputBufferIndex = mediaCodec?.dequeueOutputBuffer(bufferInfo, 0) ?: -1
            }
        }
    }

    private fun initLame() {
        val channels = getChannelCount()
        SimpleLame.init(sampleRate, channels, sampleRate, bitRate / 1000, 7)
        lameInitialized = true
    }

    private fun encodeToMp3(pcmBuffer: ByteArray, pcmSize: Int, outputStream: FileOutputStream?) {
        if (!lameInitialized) return

        val channels = getChannelCount()
        // 调整MP3缓冲区大小以适应最坏情况
        val mp3Buffer = ByteArray((pcmSize * 1.25).toInt() + 7200)
        val encodedSize: Int

        if (channels == 1) {
            // 单声道处理
            val sampleCount = pcmSize / 2
            val shortBuffer = ShortArray(sampleCount)
            for (i in 0 until sampleCount) {
                shortBuffer[i] = ((pcmBuffer[2 * i].toInt() and 0xFF) or
                        (pcmBuffer[2 * i + 1].toInt() shl 8)).toShort()
            }
            // 假设SimpleLame.encode对于单声道，第二个声道参数传null
            encodedSize = SimpleLame.encode(shortBuffer, shortBuffer, sampleCount, mp3Buffer)
        } else {
            // 立体声处理
            // 每个采样点占用4字节（左右声道各2字节），所以采样点数是 pcmSize / 4
            val sampleCount = pcmSize / 4
            val leftChannel = ShortArray(sampleCount)
            val rightChannel = ShortArray(sampleCount)

            for (i in 0 until sampleCount) {
                // 从交错的PCM数据中分离左右声道
                // 左声道样本
                leftChannel[i] = ((pcmBuffer[4 * i].toInt() and 0xFF) or
                        (pcmBuffer[4 * i + 1].toInt() shl 8)).toShort()
                // 右声道样本
                rightChannel[i] = ((pcmBuffer[4 * i + 2].toInt() and 0xFF) or
                        (pcmBuffer[4 * i + 3].toInt() shl 8)).toShort()
            }
            encodedSize = SimpleLame.encode(leftChannel, rightChannel, sampleCount, mp3Buffer)
        }

        if (encodedSize > 0) {
            try {
                outputStream?.write(mp3Buffer, 0, encodedSize)
            } catch (e: IOException) {
                notifyError(ERROR_FILE_WRITE_FAILED, "写入MP3文件失败: ${e.message}")
            }
        }
    }

    fun pauseRecording() {
        if (!isRecording || isPaused) return
        isPaused = true
        // 记录暂停开始时间
        pauseStartTime = System.currentTimeMillis()
        mainHandler.post {
            recordingListener?.onRecordingPaused()
        }
    }

    fun resumeRecording() {
        if (!isRecording || !isPaused) return
        isPaused = false
        // 计算本次暂停时长并累加到总暂停时长
        totalPauseDuration += System.currentTimeMillis() - pauseStartTime
        mainHandler.post {
            recordingListener?.onRecordingResumed()
        }
    }

    fun stopRecording() {
        if (!isRecording) return
        isRecording = false
        isPaused = false

        // 取消定时器
        timer?.cancel()
        timer = null

        // 等待录音线程结束，避免竞态条件
        try {
            recordingThread?.join()
        } catch (e: InterruptedException) {
            Thread.currentThread().interrupt()
            Log.e("AudioRecorder", "Recording thread interrupted", e)
        }
        recordingThread = null

        // 线程结束后再清理资源
        when (format) {
            RecordingFormat.AAC -> {
                try {
                    mediaCodec?.signalEndOfInputStream()
                    val bufferInfo = MediaCodec.BufferInfo()
                    var outputBufferIndex = mediaCodec?.dequeueOutputBuffer(bufferInfo, 10000) ?: -1
                    while (outputBufferIndex >= 0) {
                        val outputBuffer = mediaCodec?.getOutputBuffer(outputBufferIndex)
                        if (audioTrackIndex != -1 && outputBuffer != null && bufferInfo.size > 0 && bufferInfo.presentationTimeUs > 0) {
                            outputBuffer.position(bufferInfo.offset)
                            outputBuffer.limit(bufferInfo.offset + bufferInfo.size)
                            mediaMuxer?.writeSampleData(audioTrackIndex, outputBuffer, bufferInfo)
                        }
                        mediaCodec?.releaseOutputBuffer(outputBufferIndex, false)
                        outputBufferIndex = mediaCodec?.dequeueOutputBuffer(bufferInfo, 10000) ?: -1
                    }
                } catch (e: Exception) {
                    Log.e("AudioRecorder", "Error during AAC stream end signaling", e)
                } finally {
                    try {
                        mediaCodec?.stop()
                        mediaCodec?.release()
                    } catch (e: Exception) {
                        Log.e("AudioRecorder", "MediaCodec stop/release failed", e)
                    }
                    try {
                        mediaMuxer?.stop()
                        mediaMuxer?.release()
                    } catch (e: Exception) {
                        Log.e("AudioRecorder", "MediaMuxer stop/release failed", e)
                    }
                    mediaCodec = null
                    mediaMuxer = null
                    audioTrackIndex = -1
                }
            }

            RecordingFormat.MP3 -> {
                if (lameInitialized) {
                    try {
                        val mp3Buffer = ByteArray(7200)
                        val encodedSize = SimpleLame.flush(mp3Buffer)
                        if (encodedSize > 0) {
                            FileOutputStream(filePath, true).use {
                                it.write(
                                    mp3Buffer,
                                    0,
                                    encodedSize
                                )
                            }
                        }
                    } catch (e: IOException) {
                        notifyError(ERROR_FILE_WRITE_FAILED, "MP3 flush failed: ${e.message}")
                    } finally {
                        SimpleLame.close()
                        lameInitialized = false
                    }
                }
            }

            else -> {}
        }

        // audioRecord 的清理可以保留在这里
        try {
            audioRecord?.stop()
            audioRecord?.release()
        } catch (e: Exception) {
            Log.e("AudioRecorder", "AudioRecord stop/release failed", e)
        }
        audioRecord = null

        mainHandler.post {
            recordingListener?.onRecordingStopped()
        }
    }

    private fun cleanupResources() {
        try {
            audioRecord?.stop()
            audioRecord?.release()
        } catch (e: Exception) {
            Log.e("AudioRecorder", "AudioRecord cleanup failed: ${e.message}")
        }
        audioRecord = null

        if (lameInitialized) {
            SimpleLame.close()
            lameInitialized = false
        }
        audioBuffer = null
    }

    private fun getChannelCount(): Int {
        return if (channelConfig == AudioFormat.CHANNEL_IN_MONO) 1 else 2
    }

    // WAV文件头处理方法
    private fun writeWavHeaderPlaceholder(os: FileOutputStream) {
        // RIFF header
        os.write("RIFF".toByteArray())
        os.write(intToByteArray(0)) // 文件大小，稍后更新
        os.write("WAVE".toByteArray())

        // fmt chunk
        os.write("fmt ".toByteArray())
        os.write(intToByteArray(16)) // fmt chunk大小
        os.write(shortToByteArray(1.toShort())) // 音频格式：PCM
        os.write(shortToByteArray(getChannelCount().toShort())) // 通道数
        os.write(intToByteArray(sampleRate)) // 采样率
        os.write(intToByteArray(sampleRate * getChannelCount() * 2)) // 字节率
        os.write(shortToByteArray((getChannelCount() * 2).toShort())) // 块对齐
        os.write(shortToByteArray(16.toShort())) // 位深度

        // data chunk
        os.write("data".toByteArray())
        os.write(intToByteArray(0)) // 数据大小，稍后更新
    }

    private fun updateWavHeader(filePath: String, sampleRate: Int, channels: Int, bitDepth: Int) {
        try {
            val file = File(filePath)
            val fileSize = file.length()
            val dataSize = fileSize - 44 // WAV文件头大小为44字节

            val raf = RandomAccessFile(file, "rw")

            // 更新RIFF chunk大小
            raf.seek(4)
            raf.write(intToByteArray((fileSize - 8).toInt()))

            // 更新采样率相关参数（如果需要）
            raf.seek(24)
            raf.write(intToByteArray(sampleRate))

            raf.seek(28)
            raf.write(intToByteArray(sampleRate * channels * (bitDepth / 8)))

            // 更新data chunk大小
            raf.seek(40)
            raf.write(intToByteArray(dataSize.toInt()))

            raf.close()
        } catch (e: IOException) {
            notifyError(ERROR_FILE_WRITE_FAILED, "更新 WAV 文件头出错: ${e.message}")
        }
    }

    // 辅助方法：将int转换为字节数组（小端序）
    private fun intToByteArray(value: Int): ByteArray {
        return byteArrayOf(
            (value and 0xFF).toByte(),
            ((value shr 8) and 0xFF).toByte(),
            ((value shr 16) and 0xFF).toByte(),
            ((value shr 24) and 0xFF).toByte()
        )
    }

    // 辅助方法：将short转换为字节数组（小端序）
    private fun shortToByteArray(value: Short): ByteArray {
        return byteArrayOf(
            (value.toInt() and 0xFF).toByte(),
            ((value.toInt() shr 8) and 0xFF).toByte()
        )
    }

    private fun checkAndAdjustSampleRate(): Int {
        // 优先检查当前设置的采样率是否支持
        if (sampleRate > 0) {
            val bufferSize = AudioRecord.getMinBufferSize(sampleRate, channelConfig, audioEncoding)
            if (bufferSize > 0) {
                return sampleRate
            }
        }

        val supportedSampleRates = intArrayOf(44100, 48000, 22050, 16000, 11025, 8000)
        for (rate in supportedSampleRates) {
            if (rate == sampleRate) continue
            val bufferSize = AudioRecord.getMinBufferSize(rate, channelConfig, audioEncoding)
            if (bufferSize > 0) {
                return rate
            }
        }
        return -1
    }

    private fun checkAacEncoderSupport(): Boolean {
        val audioFormat = MediaFormat.createAudioFormat(
            MediaFormat.MIMETYPE_AUDIO_AAC,
            sampleRate,
            getChannelCount()
        )
        audioFormat.setInteger(MediaFormat.KEY_BIT_RATE, bitRate)
        audioFormat.setInteger(
            MediaFormat.KEY_AAC_PROFILE,
            MediaCodecInfo.CodecProfileLevel.AACObjectLC
        )

        try {
            val codec = MediaCodec.createEncoderByType(MediaFormat.MIMETYPE_AUDIO_AAC)
            codec.configure(audioFormat, null, null, MediaCodec.CONFIGURE_FLAG_ENCODE)
            codec.release()
            return true
        } catch (e: Exception) {
            return false
        }
    }

    private fun notifyError(errorCode: Int, errorMessage: String) {
        mainHandler.post {
            recordingListener?.onRecordingError(errorCode, errorMessage)
            audioDataListener?.onAudioError(errorCode, errorMessage)
        }
    }

    fun release() {
        stopRecording()
        recordingListener = null
        audioDataListener = null
    }
}