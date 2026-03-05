@file:Suppress(
    "UNCHECKED_CAST",
    "USELESS_CAST",
    "INAPPLICABLE_JVM_NAME",
    "UNUSED_ANONYMOUS_PARAMETER"
)
package uts.sdk.modules.uniGetBackgroundAudioManager
import android.content.Intent
import android.media.AudioManager
import android.net.Uri
import android.webkit.CookieManager
import com.google.android.exoplayer2.DeviceInfo
import com.google.android.exoplayer2.ExoPlaybackException
import com.google.android.exoplayer2.ExoPlayer
import com.google.android.exoplayer2.MediaItem
import com.google.android.exoplayer2.MediaMetadata
import com.google.android.exoplayer2.PlaybackException
import com.google.android.exoplayer2.PlaybackParameters
import com.google.android.exoplayer2.Player
import com.google.android.exoplayer2.Timeline
import com.google.android.exoplayer2.Tracks
import com.google.android.exoplayer2.audio.AudioAttributes
import com.google.android.exoplayer2.text.Cue
import com.google.android.exoplayer2.text.CueGroup
import com.google.android.exoplayer2.trackselection.TrackSelectionParameters
import com.google.android.exoplayer2.upstream.DefaultHttpDataSource
import com.google.android.exoplayer2.upstream.HttpDataSource
import com.google.android.exoplayer2.upstream.cache.CacheDataSource
import com.google.android.exoplayer2.upstream.cache.LeastRecentlyUsedCacheEvictor
import com.google.android.exoplayer2.upstream.cache.SimpleCache
import com.google.android.exoplayer2.video.VideoSize
import io.dcloud.uts.UTSAndroid
import io.dcloud.uts.UTSJSONObject
import io.dcloud.uts.compareTo
import io.dcloud.uts.includes
import io.dcloud.uts.setInterval
import io.dcloud.uts.times
import io.dcloud.uts.utsArrayOf
import java.io.File
import java.io.IOException
import com.google.android.exoplayer2.source.DefaultMediaSourceFactory;
import android.text.TextUtils;
import android.util.Log
import io.dcloud.uts.clearInterval
import io.dcloud.uts.console
import uts.sdk.modules.uniGetBackgroundAudioManager.BackgroundAudioManager;
import uts.sdk.modules.DCloudUniGetBackgroundAudioManager.AudioService;
import uts.sdk.modules.uniGetBackgroundAudioManager.ICreateBackgroundAudioFail;
import uts.sdk.modules.uniGetBackgroundAudioManager.AudioFocusHelper;
import uts.sdk.modules.uniGetBackgroundAudioManager.CreateBackgroundAudioFailImpl;

typealias EventCallback = (result: Any) -> Unit;

object CacheManager {

    private var simpleCache: SimpleCache? = null

    // 获取 SimpleCache 实例的方法
    fun getSimpleCache(): SimpleCache {
        if (simpleCache == null) {
            // 创建缓存目录
            val cacheDir = File(UTSAndroid.getAppCachePath(), "uni-audio/background")
            if (!cacheDir.exists()) {
                cacheDir.mkdirs()
            }
            System.out.println("cacheDir=>" + cacheDir.path)
            // 创建缓存对象，最大缓存100MB
            simpleCache =
                SimpleCache(cacheDir, LeastRecentlyUsedCacheEvictor(100 * 1024 * 1024))
        }
        return simpleCache!!
    }
}

open class BackgroundAudioPlayer : BackgroundAudioManager, Player.Listener, AudioManager.OnAudioFocusChangeListener{
    open var _src: String = "";
    private var cacheDataSourceFactory: CacheDataSource.Factory? = null
    private var TAG = "BackgroundAudioPlayer"

    companion object {
        private lateinit var backgroundAudioPlayer: BackgroundAudioPlayer
        fun getInstance(): BackgroundAudioPlayer {
            if (!::backgroundAudioPlayer.isInitialized) {
                backgroundAudioPlayer = BackgroundAudioPlayer()
            }
            return backgroundAudioPlayer
        }
    }

    override var src: String
        get(): String {
            return this._src;
        }
        set(src: String) {
            if (this._src == src) {
                return;
            }
            if (this._src == "") {
                this.changeSRC(src);
                return;
            } else {
                this.stop();
            }
            this.changeSRC(src);
        }

    open fun changeSRC(src: String) {
        if (src.startsWith("http:") || src.startsWith("https:")) {
            this._src = src;
        } else {
            this._src = UTSAndroid.convert2AbsFullPath(src);
        }
        setMediaItem()
        this.player.prepare();
        if (this._startTime > 0) {
            this.player.seekTo((this._startTime * 1000).toLong());
        }
    }

    private fun setMediaItem() {
        val mediaItem = MediaItem.fromUri(this._src)
        if (_src.startsWith("http:") || _src.startsWith("https:")) {
            var uri = Uri.parse(_src)
            val userAgent =
                UTSAndroid.getWebViewInfo(UTSAndroid.getAppContext()!!)["ua"].toString();
            val cookies = CookieManager.getInstance()
                .getCookie(uri.scheme + "://" + uri.host)

            val httpDataSourceFactory = DefaultHttpDataSource.Factory()
                .setUserAgent(userAgent)  // 设置 User-Agent
                .setDefaultRequestProperties(mapOf("Cookie" to cookies)) // 设置 Cookies

            cacheDataSourceFactory?.setUpstreamDataSourceFactory(httpDataSourceFactory)
                ?.setCache(CacheManager.getSimpleCache())
                ?.setFlags(CacheDataSource.FLAG_BLOCK_ON_CACHE) // 等待直到缓存加载完
            val defaultMediaSource = DefaultMediaSourceFactory(UTSAndroid.getAppContext()!!)
            if(cacheDataSourceFactory != null && this._cache == true) {
                cacheDataSourceFactory?.let {
                    defaultMediaSource.setDataSourceFactory(it)
                }
            }
            this.player.setMediaSource(defaultMediaSource.createMediaSource(mediaItem))
        } else {
            this.player.setMediaItem(mediaItem);
        }
    }

    open var _startTime: Number = 0;
    override var startTime: Number
        get(): Number {
            return this._startTime;
        }
        set(startTime: Number) {
            if (startTime <= 0) {
                return;
            }
            this._startTime = startTime;
            if (this._src != "" && !this.player.isPlaying && !this.isPausedByUser) {
                this.player.seekTo((this._startTime * 1000).toLong());
            }
        }
    override var duration: Number
        get(): Number {
            if (this.player.playbackState == Player.STATE_READY || this.player.playbackState == Player.STATE_ENDED) {
                return this.player.duration.toDouble() / 1000;
            } else {
                return 0;
            }
        }
        set(_) {}
    override var currentTime: Number
        get(): Number {
            return this.player.currentPosition.toDouble() / 1000;
        }
        set(currentTime) {
            val positionInMillis = (currentTime.toDouble() * 1000).toLong()
            this.player.seekTo(positionInMillis)
        }
    override var paused: Boolean
        get(): Boolean {
            return !this.player.isPlaying;
        }
        set(_) {}
    override var buffered: Number
        get(): Number {
            return this.player.bufferedPosition / 1000f;
        }
        set(_) {}
    open var _playbackRate: Number = 1.0;
    override var playbackRate: Number?
        get(): Number? {
            return this._playbackRate;
        }
        set(rate) {
            if (utsArrayOf(
                    0.5,
                    0.8,
                    1.0,
                    1.25,
                    1.5,
                    2.0
                ).indexOf(rate?.toDouble()) >= 0
            ) {
                this.player.setPlaybackSpeed(rate!!.toFloat());
            }
        }
    open var _cache = true
    override var cache = true
        set(cach) {
            this._cache = cach
            if(!this.player.isPlaying && !this.isPausedByUser && !this.player.isLoading) {
                if(!TextUtils.isEmpty(this._src)) {
                    this.changeSRC(this._src)
                }
            }
        }
    override var title = "";
    override var epname = "";
    override var singer = "";
    override var coverImgUrl = ""

    override var webUrl = "";
    override var protocol = "";
    open lateinit var player: ExoPlayer;
    open var callbacks = HashMap<String, EventCallback>();
    private var errorCallBack: ((result: ICreateBackgroundAudioFail) -> Unit)? = null
    open var isPausedByUser: Boolean = false;
    open var isSeeking: Boolean = false;
    private var audioFocusHelper: AudioFocusHelper? = null
    private var isServiceStartSuccess = false
    private var isStopped = false
    private var activityDestroyCallback: (() -> Unit)? = null

    constructor() {
        startAudioService()
        // 创建 CacheDataSourceFactory
        cacheDataSourceFactory = CacheDataSource.Factory()
        audioFocusHelper = AudioFocusHelper(UTSAndroid.getAppContext()!!,this)
        this.player = ExoPlayer.Builder(UTSAndroid.getAppContext()!!).build();
        this.player.addListener(this);
        // 退出应用的话，如果播放器没有在播放，则停止服务
        activityDestroyCallback = {
            if(!this.player.isPlaying && this.isStopped) {
                stopPlayService()
                this.isServiceStartSuccess = false
                UTSAndroid.offAppActivityDestroy(activityDestroyCallback)
            }
        }
        UTSAndroid.onAppActivityDestroy(activityDestroyCallback!!)
    }

    private fun stopPlayService() {
        UTSAndroid.getAppContext()
            ?.stopService(Intent(UTSAndroid.getAppContext(), AudioService::class.java))
    }

    fun playInService() {
        try {
            if (this._src == "") {
                errorCallBack?.invoke(CreateBackgroundAudioFailImpl(1107609))
                return;
            }
            when (this.player.playbackState) {
                Player.STATE_IDLE -> {//停止
                    setMediaItem()
                    this.player.prepare();
                }

                Player.STATE_READY -> {//暂停或者准备好
                    if (this.isSeeking) {
                        this.isSeeking = false;
                        invokeCallBack("seeked")
                    }
                    // invokeCallBack("play")
                }
            }
            this.isPausedByUser = false;
            this.player.playWhenReady = true;

        } catch (e: Exception) {
            var fail = CreateBackgroundAudioFailImpl(1107601)
            e.message?.let {
                fail.errMsg = it
            }
            errorCallBack?.invoke(fail)
        }
    }

    var intervalId: Number= -1
    override fun play() {
        audioFocusHelper?.requestAudioFocus()
        this.isStopped = false
        if(this.isServiceStartSuccess) {
            if(AudioService.audioService == null) {
                intervalId = setInterval(fun(){
                    if(AudioService.audioService != null) {
                        AudioService.audioService?.handlerInitNotification()
                        AudioService.audioService?.playInStart()
                        clearInterval(intervalId)
                    }
                },100,1000)
            } else {
                AudioService.audioService?.handlerInitNotification()
                AudioService.audioService?.playInStart()
            }
        } else {
            startAudioService()
            if (!isServiceStartSuccess)
                errorCallBack?.invoke(CreateBackgroundAudioFailImpl(1107609))
            else {
                intervalId = setInterval(fun(){
                    if(AudioService.audioService != null) {
                        AudioService.audioService?.handlerInitNotification()
                        AudioService.audioService?.playInStart()
                        clearInterval(intervalId)
                    }
                },100,3000)
            }
        }
    }

    private fun startAudioService() {
        try {
            UTSAndroid.getAppContext()
                ?.startService(
                    Intent(
                        UTSAndroid.getAppContext(),
                        AudioService::class.java
                    )
                )
            isServiceStartSuccess = true
        } catch (_: Exception) {
            isServiceStartSuccess = false
        }
    }

    override fun pause() {
        this.isPausedByUser = true;
        this.player.playWhenReady = false;
        this.player.pause()
        invokeCallBack("pause")
        AudioService.audioService?.pause()
    }

    fun invokeCallBack(action: String, result: Any? = null) {
        this.callbacks[action]?.let {
            if (result != null) {
                it(result)
            } else {
                it(UTSJSONObject());
            }
        }
    }

    override fun stop() {
        this.isStopped = true
        this.isPausedByUser = true;
        this.player.playWhenReady = false;
        this.player.stop();
        audioFocusHelper?.abandonAudioFocus()
        invokeCallBack("stop")
		AudioService.audioService?.pause()
        // stopPlayService()
    }

    override fun seek(position: Number) {
        if (position >= 0) {
            this.isSeeking = true;
            this.player.seekTo((position * 1000).toLong());
            invokeCallBack("seeking")
        }
    }
    open fun addEvent(action: String, callback: EventCallback) {
        this.callbacks[action] = callback
    }

    open fun removeEvent(action: String) {
        this.callbacks.remove(action)
    }

    override fun onCanplay(callback: EventCallback) {
        this.addEvent("canplay", callback);
    }
	
	override fun offCanplay() {
	    this.removeEvent("canplay");
	}

    override fun onPlay(callback: EventCallback) {
        this.addEvent("play", callback);
    }
	
	override fun offPlay() {
	    this.removeEvent("play");
	}

    override fun onPause(callback: EventCallback) {
        this.addEvent("pause", callback);
    }
	
	override fun offPause() {
	    this.removeEvent("pause");
	}

    override fun onStop(callback: EventCallback) {
        this.addEvent("stop", callback);
    }
	
	override fun offStop() {
	    this.removeEvent("stop");
	}

    override fun onEnded(callback: EventCallback) {
        this.addEvent("ended", callback);
    }
	
	override fun offEnded() {
	    this.removeEvent("ended");
	}

    override fun onSeeking(callback: (result: Any) -> Unit) {
        this.addEvent("seeking", callback);
    }
	
	override fun offSeeking() {
	    this.removeEvent("seeking");
	}

    override fun onSeeked(callback: (result: Any) -> Unit) {
        this.addEvent("seeked", callback);
    }
	
	override fun offSeeked() {
	    this.removeEvent("seeked");
	}

    override fun onTimeUpdate(callback: EventCallback) {
        this.addEvent("timeUpdate", callback);
        this.startTimeUpdate();
    }
	
	override fun offTimeUpdate() {
	    this.removeEvent("timeUpdate");
	    clearInterval(this.timeUpdateInterval)
	}

    override fun onPrev(callback: EventCallback) {
        this.addEvent("prev", callback);
    }
	
	override fun offPrev() {
	    this.removeEvent("prev");
	}

    override fun onNext(callback: EventCallback) {
        this.addEvent("next", callback);
    }
	
	override fun offNext() {
	    this.removeEvent("next");
	}

    override fun onError(callback: (result: ICreateBackgroundAudioFail) -> Unit) {
        this.errorCallBack = callback
    }
	
	override fun offError() {
	    this.errorCallBack = null
	}


    override fun onWaiting(callback: EventCallback) {
        this.addEvent("waiting", callback);
    }
	
	override fun offWaiting() {
	    this.removeEvent("waiting");
	}

    open var isTriggerTimeUpdate = false;
    open var timeUpdateInterval: Number = 0;
    open fun startTimeUpdate() {
        if (this.isTriggerTimeUpdate) {
            return;
        }
        this.isTriggerTimeUpdate = true;
        this.timeUpdateInterval = setInterval(fun() {
            if (this.player.isPlaying) {
                invokeCallBack("timeUpdate")
            }
        }, 750);
    }

    override fun onPlayerStateChanged(playWhenReady: Boolean, playbackState: Int) {
        if (playbackState == Player.STATE_BUFFERING) {
            invokeCallBack("waiting")
        } else if (playbackState == Player.STATE_READY) {
            Log.e("AudioService", "onPlayerStateChanged: ${playbackState},${playWhenReady}")
            if (!this.isPausedByUser && this.isSeeking) {
                this.isSeeking = false;
                AudioService.audioService?.notifyChange()
                invokeCallBack("seeked")
            } else {
                invokeCallBack("canplay")
                if (this.player.playWhenReady) {
					AudioService.audioService?.canPlay()
                    invokeCallBack("play")
                }
            }
        } else if (playbackState == Player.STATE_ENDED) {
            if (playWhenReady){
                invokeCallBack("ended")
            }
            AudioService.audioService?.onEnd()
            this.player.playWhenReady = false
            this.player.seekTo(0)
        }
    }

    override fun onPlayerError(error: PlaybackException) {
        error.printStackTrace()
        var fail = CreateBackgroundAudioFailImpl(1107605)
        error.message?.let {
            fail.errMsg = it
        }
        if (error is ExoPlaybackException) {
            val exoError: ExoPlaybackException = error as ExoPlaybackException;
            if (exoError.type == ExoPlaybackException.TYPE_SOURCE) {
                val sourceException: IOException = exoError.sourceException;
                if (sourceException is HttpDataSource.HttpDataSourceException) {
                    fail = CreateBackgroundAudioFailImpl(1107602)
                    val httpException: HttpDataSource.HttpDataSourceException = sourceException;
                    httpException.message?.let {
                        fail.errMsg = it
                    }
                } else {
                    sourceException.message?.let {
                        if (it.includes("None of the available extractors")) {
                            fail = CreateBackgroundAudioFailImpl(1107604)
                            fail.errMsg = it
                        } else {
                            fail = CreateBackgroundAudioFailImpl(1107603)
                            fail.errMsg = it
                        }
                    }

                }
            }
        }
        this.errorCallBack?.invoke(fail)
    }

    override fun onPlaybackStateChanged(playbackState: Int) {}
    override fun onEvents(player: Player, events: Player.Events) {}
    override fun onTimelineChanged(timeline: Timeline, reason: Int) {}
    override fun onMediaItemTransition(mediaItem: MediaItem?, reason: Int) {}
    override fun onTracksChanged(tracks: Tracks) {}
    override fun onMediaMetadataChanged(mediaMetadata: MediaMetadata) {}
    override fun onPlaylistMetadataChanged(mediaMetadata: MediaMetadata) {}
    override fun onIsLoadingChanged(isLoading: Boolean) {}
    override fun onLoadingChanged(isLoading: Boolean) {}
    override fun onAvailableCommandsChanged(availableCommands: Player.Commands) {}
    override fun onTrackSelectionParametersChanged(parameters: TrackSelectionParameters) {}
    override fun onPlayWhenReadyChanged(playWhenReady: Boolean, reason: Int) {}
    override fun onPlaybackSuppressionReasonChanged(playbackSuppressionReason: Int) {}
    override fun onIsPlayingChanged(isPlaying: Boolean) {}
    override fun onRepeatModeChanged(repeatMode: Int) {}
    override fun onShuffleModeEnabledChanged(shuffleModeEnabled: Boolean) {}
    override fun onPlayerErrorChanged(error: PlaybackException?) {}
    override fun onPositionDiscontinuity(reason: Int) {}
    // override fun onMetadata(metadata:Metadata) {}
    override fun onPositionDiscontinuity(
        oldPosition: Player.PositionInfo,
        newPosition: Player.PositionInfo,
        reason: Int
    ) {
    }

    override fun onPlaybackParametersChanged(playbackParameters: PlaybackParameters) {}
    override fun onSeekBackIncrementChanged(seekBackIncrementMs: Long) {}
    override fun onSeekForwardIncrementChanged(seekForwardIncrementMs: Long) {}
    override fun onMaxSeekToPreviousPositionChanged(maxSeekToPreviousPositionMs: Long) {}
    override fun onSeekProcessed() {}
    override fun onAudioSessionIdChanged(audioSessionId: Int) {}
    override fun onAudioAttributesChanged(audioAttributes: AudioAttributes) {}
    override fun onVolumeChanged(volume: Float) {}
    override fun onSkipSilenceEnabledChanged(skipSilenceEnabled: Boolean) {}
    override fun onDeviceInfoChanged(deviceInfo: DeviceInfo) {}
    override fun onDeviceVolumeChanged(volume: Int, muted: Boolean) {}
    override fun onVideoSizeChanged(videoSize: VideoSize) {}
    override fun onSurfaceSizeChanged(width: Int, height: Int) {}
    override fun onRenderedFirstFrame() {}
    override fun onCues(cues: MutableList<Cue>) {}
    override fun onCues(cueGroup: CueGroup) {}
    override fun onAudioFocusChange(focusChange: Int) {
        when(focusChange) {
            AudioManager.AUDIOFOCUS_GAIN -> {
                if(!this.isPausedByUser && !this.player.isPlaying) {
                    play()
                }
            }
            AudioManager.AUDIOFOCUS_LOSS ->{
                pause()
            }
            AudioManager.AUDIOFOCUS_LOSS_TRANSIENT ->{
                this.player.playWhenReady = false;
                this.player.pause()
                invokeCallBack("pause")
                AudioService.audioService?.pause()
            }
        }
    }
}
