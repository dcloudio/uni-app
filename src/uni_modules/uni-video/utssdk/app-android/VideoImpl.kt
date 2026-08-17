package uts.sdk.modules.uniVideo

import android.content.Context
import android.graphics.Matrix
import android.graphics.SurfaceTexture
import android.os.Handler
import android.os.Looper
import android.util.AttributeSet
import android.view.TextureView
import android.media.AudioManager
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.common.MediaItem
import androidx.media3.common.PlaybackException
import androidx.media3.common.PlaybackParameters
import androidx.media3.common.Player
import androidx.media3.common.Timeline
import androidx.media3.common.Tracks
import androidx.media3.common.AudioAttributes
import androidx.media3.common.Metadata
import androidx.media3.exoplayer.source.DefaultMediaSourceFactory
import androidx.media3.common.text.Cue
import androidx.media3.common.text.CueGroup
import androidx.media3.common.TrackSelectionParameters
import androidx.media3.common.DeviceInfo
import androidx.media3.common.MediaMetadata
import androidx.media3.datasource.DefaultDataSource
import androidx.media3.datasource.DefaultHttpDataSource
import androidx.media3.datasource.cache.CacheDataSource
import androidx.media3.datasource.cache.LeastRecentlyUsedCacheEvictor
import androidx.media3.datasource.cache.SimpleCache
import androidx.media3.common.VideoSize
import androidx.media3.exoplayer.DefaultRenderersFactory
import java.io.File
import kotlin.math.roundToInt

class VideoImpl @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : TextureView(context, attrs, defStyleAttr), TextureView.SurfaceTextureListener, Player.Listener {

    var src: String = ""
        set(value) {
            field = value
            if (isAvailable && value.isNotEmpty()) {
                setupSource(value)
            }
        }
    var autoplay: Boolean = false
        set(value) {
            field = value
            if (value) player?.playWhenReady = true
        }
    var loop: Boolean = false
        set(value) {
            field = value
            player?.repeatMode = if (value) Player.REPEAT_MODE_ONE else Player.REPEAT_MODE_OFF
        }
    var muted: Boolean = false
        set(value) {
            field = value
            if (value) {
                player?.volume = 0f
            } else {
                player?.volume = 1f
            }
        }
    var duration: Float = 0f
        set(value) {
            field = value
            userDuration = value
        }
        get() {
            return if (field == 0f) {
                ((player?.duration ?: 0) / 1000).toFloat()
            } else {
                field
            }
        }
    var objectFit: String = "contain"
        set(value) {
            field = value
            applyObjectFit()
        }
    var playbackRate: Float = 1.0f
        set(value) {
            field = value
            player?.setPlaybackSpeed(value)
        }
    var volume: Float
        get() {
            return audioManager.getStreamVolume(AudioManager.STREAM_MUSIC).toFloat() / maxVolume
        }
        set(value) {
            audioManager.setStreamVolume(AudioManager.STREAM_MUSIC, (value * maxVolume).roundToInt(), 0)
        }
    var codec: String = "hardware"
    var httpCache: Boolean = false
    var header: Map<String, String>? = null

    private val audioManager = context.getSystemService(Context.AUDIO_SERVICE) as AudioManager
    private val maxVolume = audioManager.getStreamMaxVolume(AudioManager.STREAM_MUSIC)
    private val handler = Handler(Looper.getMainLooper())
    private val progressRunnable = object : Runnable {
        override fun run() {
            player?.let {
                currentTime = it.currentPosition / 1000f
                callback?.onTimeUpdate(currentTime)

                if (userDuration > 0 && currentTime >= userDuration) {
                    callback?.onEnded()
                    isPrepared = false
                    if (loop) {
                        it.seekTo(0)
                    } else {
                        userStop()
                        return
                    }
                }
            }
            handler.postDelayed(this, 250)
        }
    }

    internal var videoWidth: Int = 0
    internal var videoHeight: Int = 0

    private var player: ExoPlayer? = null
    private var isSourceSetup: Boolean = false
    private var callback: EventCallback? = null
    private var currentTime: Float = 0f
    private var isPrepared: Boolean = false
    private var userDuration: Float = 0f

    companion object {
        private val cacheLock = Any()
        private var cache: SimpleCache? = null
        private var cacheRefCount: Int = 0
    }

    init {
        surfaceTextureListener = this
    }

    fun setEventCallback(callback: EventCallback) {
        this.callback = callback
    }

    private fun setupPlayer() {
        if (player != null) return
        val builder = ExoPlayer.Builder(context)

        // 配置软解码
        if (codec == "software" && isSoftDecoderAvailable()) {
            val renderersFactory = DefaultRenderersFactory(context)
                .setExtensionRendererMode(DefaultRenderersFactory.EXTENSION_RENDERER_MODE_PREFER)
            builder.setRenderersFactory(renderersFactory)
        }

        // 配置 HTTP 请求头
        val httpDataSourceFactory = DefaultHttpDataSource.Factory()
        header?.let {
            if (it.isNotEmpty()) {
                httpDataSourceFactory.setDefaultRequestProperties(it)
            }
        }
        val dataSourceFactory = DefaultDataSource.Factory(context, httpDataSourceFactory)

        // 配置缓存
        if (httpCache) {
            setupCache()
            cache?.let { cache ->
                val cacheDataSourceFactory = CacheDataSource.Factory()
                    .setCache(cache)
                    .setUpstreamDataSourceFactory(dataSourceFactory)
                builder.setMediaSourceFactory(DefaultMediaSourceFactory(cacheDataSourceFactory))
            }
        } else {
            builder.setMediaSourceFactory(DefaultMediaSourceFactory(dataSourceFactory))
        }

        player = builder.build().apply {
            addListener(this@VideoImpl)
            setVideoTextureView(this@VideoImpl)
        }
        callback?.onPlayerReady()
    }

    private fun isSoftDecoderAvailable(): Boolean {
        return try {
            Class.forName("androidx.media3.decoder.ffmpeg.FfmpegAudioRenderer")
            true
        } catch (e: ClassNotFoundException) {
            try {
                Class.forName("androidx.media3.decoder.vp9.LibvpxVideoRenderer")
                true
            } catch (e: ClassNotFoundException) {
                false
            }
        }
    }

    private fun setupCache() {
        synchronized(cacheLock) {
            if (cache == null) {
                val cacheDir = File(context.cacheDir, "/uni-net-cache/video")
                if (!cacheDir.exists()) {
                    cacheDir.mkdirs()
                }
                cache = SimpleCache(cacheDir, LeastRecentlyUsedCacheEvictor(100 * 1024 * 1024))
            }
            cacheRefCount++
        }
    }

    private fun releaseCache() {
        synchronized(cacheLock) {
            if (cacheRefCount > 0) {
                cacheRefCount--
                if (cacheRefCount == 0) {
                    cache?.release()
                    cache = null
                }
            }
        }
    }

    private fun setupSource(url: String) {
        setupPlayer()
        isPrepared = false
        val mediaItem = MediaItem.fromUri(url)
        player?.setMediaItem(mediaItem)
        player?.prepare()
        isSourceSetup = true
    }

    private fun applyObjectFit() {
        if (videoWidth == 0 || videoHeight == 0 || width == 0 || height == 0) return

        val matrix = Matrix()
        val viewWidth = width.toFloat()
        val viewHeight = height.toFloat()
        val videoAspect = videoWidth.toFloat() / videoHeight
        val viewAspect = viewWidth / viewHeight

        when (objectFit) {
            "fill" -> {
                // 拉伸填满
                matrix.reset()
            }

            "contain" -> {
                // 保持宽高比，完整显示在容器内
                if (videoAspect > viewAspect) {
                    val scaleY = viewAspect / videoAspect
                    val translateY = (viewHeight - viewHeight * scaleY) / 2
                    matrix.setScale(1f, scaleY)
                    matrix.postTranslate(0f, translateY)
                } else {
                    val scaleX = videoAspect / viewAspect
                    val translateX = (viewWidth - viewWidth * scaleX) / 2
                    matrix.setScale(scaleX, 1f)
                    matrix.postTranslate(translateX, 0f)
                }
            }

            "cover" -> {
                // 保持宽高比，裁剪填满容器
                if (videoAspect > viewAspect) {
                    val scaleX = videoAspect / viewAspect
                    val translateX = (viewWidth - viewWidth * scaleX) / 2
                    matrix.setScale(scaleX, 1f)
                    matrix.postTranslate(translateX, 0f)
                } else {
                    val scaleY = viewAspect / videoAspect
                    val translateY = (viewHeight - viewHeight * scaleY) / 2
                    matrix.setScale(1f, scaleY)
                    matrix.postTranslate(0f, translateY)
                }
            }

            else -> {
                // 默认使用 contain
                matrix.reset()
            }
        }

        setTransform(matrix)
        invalidate()
    }

    fun play() {
        player?.let {
            if (it.playbackState == Player.STATE_IDLE) {
                it.prepare()
            }
            if (it.playbackState == Player.STATE_ENDED || (userDuration > 0 && currentTime >= userDuration)) {
                it.seekTo(0)
            }
            it.play()
        }
    }

    fun pause() {
        player?.pause()
    }

    fun stop() {
        player?.stop()
        player?.seekTo(0)
        stopProgressUpdate()
        isPrepared = false
    }

    fun seek(pos: Float) {
        player?.seekTo((pos * 1000).toLong())
        currentTime = pos
        callback?.onTimeUpdate(currentTime)
    }

    private fun startProgressUpdate() {
        handler.removeCallbacks(progressRunnable)
        handler.post(progressRunnable)
    }

    private fun stopProgressUpdate() {
        handler.removeCallbacks(progressRunnable)
    }

    private fun userStop() {
        player?.stop()
        stopProgressUpdate()
    }

    fun destroy() {
        stopProgressUpdate()
        player?.removeListener(this)
        player?.setVideoTextureView(null)
        player?.release()
        player = null
        releaseCache()
        isSourceSetup = false
        surfaceTextureListener = null
    }

    fun updateLayout(width: Int, height: Int) {
        if (width <= 0 || height <= 0) return
        if (this.width != width || this.height != height) {
            layout(0, 0, width, height)
        }
        applyObjectFit()
    }

    override fun onSurfaceTextureAvailable(
        surfaceTexture: SurfaceTexture,
        width: Int,
        height: Int
    ) {
        if (src.isNotEmpty() && !isSourceSetup) {
            setupSource(src)
        }
    }

    override fun onSurfaceTextureSizeChanged(
        surfaceTexture: SurfaceTexture,
        width: Int,
        height: Int
    ) {
        applyObjectFit()
    }

    override fun onSurfaceTextureDestroyed(surfaceTexture: SurfaceTexture): Boolean {
        return true
    }

    override fun onSurfaceTextureUpdated(surfaceTexture: SurfaceTexture) {
        // 每帧更新
    }
    
    override fun onSizeChanged(w: Int, h: Int, oldw: Int, oldh: Int) {
        super.onSizeChanged(w, h, oldw, oldh)
        applyObjectFit()
    }

    // Player.Listener
    override fun onPlaybackStateChanged(playbackState: Int) {
        when (playbackState) {
            Player.STATE_IDLE -> {}
            Player.STATE_BUFFERING -> {
                callback?.onWaiting()
            }
            Player.STATE_READY -> {
                if (!isPrepared) {
                    isPrepared = true
                    callback?.onPrepared(duration)
                }
            }
            Player.STATE_ENDED -> {
                callback?.onEnded()
                stopProgressUpdate()
                isPrepared = false
            }
        }
    }

    override fun onPlayerError(error: PlaybackException) {
        callback?.onError(error.message)
    }

    override fun onIsPlayingChanged(isPlaying: Boolean) {
        if (isPlaying) {
            callback?.onPlay()
            startProgressUpdate()
        } else {
            if (player?.playbackState == Player.STATE_BUFFERING && player?.playWhenReady == true) return
            callback?.onPause()
            stopProgressUpdate()
        }
    }

    override fun onVideoSizeChanged(videoSize: VideoSize) {
        videoWidth = videoSize.width
        videoHeight = videoSize.height
        applyObjectFit()
    }

    override fun onIsLoadingChanged(isLoading: Boolean) {
        player?.let {
            callback?.onProgress(it.bufferedPercentage)
        }
    }

    override fun onPositionDiscontinuity(oldPosition: Player.PositionInfo, newPosition: Player.PositionInfo, reason: Int) {
        if (reason == Player.DISCONTINUITY_REASON_AUTO_TRANSITION && loop) {
            callback?.onEnded()
            callback?.onPrepared(duration)
            callback?.onPlay()
        }
    }

    override fun onEvents(player: Player, events: Player.Events) {}
    override fun onTimelineChanged(timeline: Timeline, reason: Int) {}
    override fun onMediaItemTransition(mediaItem: MediaItem?, reason: Int) {}
    override fun onTracksChanged(tracks: Tracks) {}
    override fun onMediaMetadataChanged(mediaMetadata: MediaMetadata) {}
    override fun onPlaylistMetadataChanged(mediaMetadata: MediaMetadata) {}
    override fun onLoadingChanged(isLoading: Boolean) {}
    override fun onAvailableCommandsChanged(availableCommands: Player.Commands) {}
    override fun onTrackSelectionParametersChanged(parameters: TrackSelectionParameters) {}
    override fun onPlayerStateChanged(playWhenReady: Boolean, playbackState: Int) {}
    override fun onPlayWhenReadyChanged(playWhenReady: Boolean, reason: Int) {}
    override fun onPlaybackSuppressionReasonChanged(playbackSuppressionReason: Int) {}
    override fun onRepeatModeChanged(repeatMode: Int) {}
    override fun onShuffleModeEnabledChanged(shuffleModeEnabled: Boolean) {}
    override fun onPlayerErrorChanged(error: PlaybackException?) {}
    override fun onPositionDiscontinuity(reason: Int) {}
    override fun onPlaybackParametersChanged(playbackParameters: PlaybackParameters) {}
    override fun onSeekBackIncrementChanged(seekBackIncrementMs: Long) {}
    override fun onSeekForwardIncrementChanged(seekForwardIncrementMs: Long) {}
    override fun onMaxSeekToPreviousPositionChanged(maxSeekToPreviousPositionMs: Long) {}
    override fun onAudioSessionIdChanged(audioSessionId: Int) {}
    override fun onAudioAttributesChanged(audioAttributes: AudioAttributes) {}
    override fun onVolumeChanged(volume: Float) {}
    override fun onSkipSilenceEnabledChanged(skipSilenceEnabled: Boolean) {}
    override fun onDeviceInfoChanged(deviceInfo: DeviceInfo) {}
    override fun onDeviceVolumeChanged(volume: Int, muted: Boolean) {}
    override fun onSurfaceSizeChanged(width: Int, height: Int) {}
    override fun onRenderedFirstFrame() {}
    override fun onCues(cues: MutableList<Cue>) {}
    override fun onCues(cueGroup: CueGroup) {}
    override fun onMetadata(metadata: Metadata) {}
}

interface EventCallback {
    fun onPlay()
    fun onPause()
    fun onEnded()
    fun onStop()
    fun onError(errMsg: String?)
    fun onPrepared(duration: Number)
    fun onTimeUpdate(currentTime: Number)
    fun onWaiting()
    fun onProgress(buffered: Number)
    fun onPlayerReady()
}
