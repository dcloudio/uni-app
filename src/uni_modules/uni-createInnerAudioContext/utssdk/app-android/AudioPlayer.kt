@file:Suppress(
    "UNCHECKED_CAST",
    "USELESS_CAST",
    "INAPPLICABLE_JVM_NAME",
    "UNUSED_ANONYMOUS_PARAMETER"
)

package uts.sdk.modules.uniCreateInnerAudioContext;

import android.content.Context
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
import com.google.android.exoplayer2.source.ProgressiveMediaSource
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
import io.dcloud.uts.UTSArray
import io.dcloud.uts.UTSJSONObject
import io.dcloud.uts.clearInterval
import io.dcloud.uts.compareTo
import io.dcloud.uts.console
import io.dcloud.uts.includes
import io.dcloud.uts.setInterval
import io.dcloud.uts.times
import io.dcloud.uts.utsArrayOf
import java.io.File
import java.io.IOException
import com.google.android.exoplayer2.source.DefaultMediaSourceFactory;
import com.google.android.exoplayer2.metadata.Metadata;
import android.text.TextUtils
import com.google.android.exoplayer2.C

typealias EventCallback = (result: Any) -> Unit;

object CacheManager {

    private var simpleCache: SimpleCache? = null

    // 获取 SimpleCache 实例的方法
    fun getSimpleCache(): SimpleCache {
        if (simpleCache == null) {
            // 创建缓存目录
            val cacheDir = File(UTSAndroid.getAppCachePath(), "uni-audio/inner")
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

    // 释放 SimpleCache 资源的方法
    fun releaseCache() {
        simpleCache?.release()  // 清理缓存并释放资源
        simpleCache = null
    }
}


open class AudioPlayer : InnerAudioContext, Player.Listener {
    open var _src: String = "";
    private var cacheDataSourceFactory: CacheDataSource.Factory? = null
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
        if (this._autoplay) {
            this.play();
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
				defaultMediaSource.setDataSourceFactory(cacheDataSourceFactory!!)
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
            if (this._src != "" && !this.player.isPlaying() && !this.isPausedByUser) {
                this.player.seekTo((this._startTime * 1000).toLong());
            }
        }
    open var _autoplay: Boolean = false;
    override var autoplay: Boolean
        get(): Boolean {
            return this._autoplay;
        }
        set(autoplay) {
            this._autoplay = autoplay;
            if (this._src == "") {
                return;
            }
            if (!this.player.isPlaying() && !this.isPausedByUser) {
                this.play();
            }
        }
    open var _loop: Boolean = false;
    override var loop: Boolean
        get(): Boolean {
            return this._loop;
        }
        set(startTime: Boolean) {
            this._loop = startTime;
            if (this._loop) {
                this.player.repeatMode = Player.REPEAT_MODE_ONE;
            } else {
                this.player.repeatMode = Player.REPEAT_MODE_OFF;
            }
        }
    open var _obeyMuteSwitch: Boolean = true;
    override var obeyMuteSwitch: Boolean
        get(): Boolean {
            return this._obeyMuteSwitch;
        }
        set(startTime: Boolean) {
            this._obeyMuteSwitch = startTime;
        }
    override var duration: Number
        get(): Number {
            if (this.player.playbackState == Player.STATE_READY || this.player.playbackState == Player.STATE_ENDED) {
                return this.player.duration.toDouble() / 1000;
            } else {
                return 0;
            }
        }
        set(_) {

        }
    override var currentTime: Number
        get(): Number {
            if (this.player.isPlaying) {
                return this.player.currentPosition.toDouble() / 1000;
            }
            return 0;
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
    open var _volume: Number = 0;
    override var volume: Number
        get(): Number {
            return this.player.volume;
        }
        set(volume) {
            var tVolume = volume;
            if (volume > 1) {
                tVolume = 1;
            } else if (volume < 0) {
                tVolume = 0;
            }
            this.player.volume = tVolume.toFloat();
            this._volume = tVolume;
        }
    open var _playbackRate: Number? = 1.0;
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
    open lateinit var player: ExoPlayer;
    open var callbacks = HashMap<String, UTSArray<EventCallback>>();
    private var errorCallBack: ((result: ICreateInnerAudioContextFail) -> Unit)? = null
    open var isPausedByUser: Boolean = false;
    open var isSeeking: Boolean = false;
    open lateinit var audioManager: AudioManager;

    constructor() {
        // 创建 CacheDataSourceFactory
        cacheDataSourceFactory = CacheDataSource.Factory()
        // 创建 ExoPlayer 实例
        this.player = ExoPlayer.Builder(UTSAndroid.getAppContext()!!).build();
        this.player.addListener(this);

        this.audioManager =
            UTSAndroid.getAppContext()!!.getSystemService(Context.AUDIO_SERVICE) as AudioManager;

    }

    override fun play() {
        try {
            if (this._src == "") {
                errorCallBack?.invoke(CreateInnerAudioContextFailImpl(1107609))
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
                    invokeCallBack("play")
                }
            }
			val attribute = AudioAttributes.Builder().setUsage(if(AudioFocusHelper.getInstance(UTSAndroid.getAppContext()!!).speakerOn) {C.USAGE_MEDIA} else {C.USAGE_VOICE_COMMUNICATION}).setContentType(C.AUDIO_CONTENT_TYPE_MUSIC).build()
			
			if(!AudioFocusHelper.getInstance(UTSAndroid.getAppContext()!!).speakerOn && AudioFocusHelper.getInstance(UTSAndroid.getAppContext()!!).mixWithOther) {
				// 如果是听筒播放并且是混播的情况下，主动获取焦点，暂停其他音频
				AudioFocusHelper.getInstance(UTSAndroid.getAppContext()!!).requestAudioFocusSingle()
			}
			player.setAudioAttributes(attribute,false)
            this.isPausedByUser = false;
            this.player.playWhenReady = true;
//            this.registerAudioManager();
			AudioFocusHelper.getInstance(UTSAndroid.getAppContext()!!).requestAudioFocus()
        } catch (e: Exception) {
            var fail = CreateInnerAudioContextFailImpl(1107601)
            e.message?.let {
                fail.errMsg = it
            }
            errorCallBack?.invoke(fail)
        }
    }

    override fun pause() {
        this.isPausedByUser = true;
        this.player.playWhenReady = false;
        this.player.pause();
//        this.unregisterAudioManager();
        invokeCallBack("pause")
    }

    fun invokeCallBack(action: String, result: Any? = null) {
        this.callbacks[action]?.forEach(fun(item: EventCallback) {
            if (result != null) {
                item(result)
            } else {
                item(UTSJSONObject());
            }
        })
    }

    override fun stop() {
        this.isPausedByUser = true;
        this.player.playWhenReady = false;
        this.player.stop();
//        this.unregisterAudioManager();
        invokeCallBack("stop")
    }

    override fun seek(position: Number) {
        if (position >= 0) {
            this.isSeeking = true;
            this.player.seekTo((position * 1000).toLong());
            invokeCallBack("seeking")
        }
    }

    override fun destroy() {
        this.callbacks.clear()
        this.errorCallBack = null
        stopTimeUpdate()
        this.player.release()
        CacheManager.releaseCache()
    }

    @Suppress("DEPRECATION")
//    open fun registerAudioManager() {
//        this.audioManager.requestAudioFocus(
//            this,
//            AudioManager.STREAM_MUSIC,
//            AudioManager.AUDIOFOCUS_GAIN_TRANSIENT_MAY_DUCK
//        );
//    }

//    @Suppress("DEPRECATION")
//    open fun unregisterAudioManager() {
//        this.audioManager.abandonAudioFocus(this);
//    }

    open fun addEvent(action: String, callback: EventCallback) {
        var playArray = this.callbacks.get(action);
        if (playArray == null) {
            playArray = UTSArray<EventCallback>();
        }
        if (playArray.indexOf(callback) < 0) {
            playArray.push(callback);
            this.callbacks.put(action, playArray);
        }
    }

    open fun removeEvent(action: String, callback: EventCallback) {
        var playArray = this.callbacks.get(action);
        if (playArray == null) {
            return;
        }
        if (playArray.indexOf(callback) >= 0) {
            playArray.splice(playArray.indexOf(callback), 1);
            this.callbacks.put(action, playArray);
        }
    }

    override fun onCanplay(callback: EventCallback) {
        this.addEvent("canplay", callback);
    }

    override fun offCanplay(callback: EventCallback) {
        this.removeEvent("canplay", callback);
    }

    override fun onPlay(callback: EventCallback) {
        this.addEvent("play", callback);
    }

    override fun offPlay(callback: EventCallback) {
        this.removeEvent("play", callback);
    }

    override fun onPause(callback: EventCallback) {
        this.addEvent("pause", callback);
    }

    override fun offPause(callback: EventCallback) {
        this.removeEvent("pause", callback);
    }

    override fun onStop(callback: EventCallback) {
        this.addEvent("stop", callback);
    }

    override fun offStop(callback: EventCallback) {
        this.removeEvent("stop", callback);
    }

    override fun onEnded(callback: EventCallback) {
        this.addEvent("ended", callback);
    }

    override fun offEnded(callback: EventCallback) {
        this.removeEvent("ended", callback);
    }

    override fun onTimeUpdate(callback: EventCallback) {
        this.addEvent("timeUpdate", callback);
        this.startTimeUpdate();
    }

    override fun offTimeUpdate(callback: EventCallback) {
        this.removeEvent("timeUpdate", callback);
        this.stopTimeUpdate();
    }

    override fun onError(callback: (result: ICreateInnerAudioContextFail) -> Unit) {
        this.errorCallBack = callback
    }

    override fun offError(callback: (result: ICreateInnerAudioContextFail) -> Unit) {
        if (this.errorCallBack == callback) {
            this.errorCallBack = null
        }
    }

    override fun onWaiting(callback: EventCallback) {
        this.addEvent("waiting", callback);
    }

    override fun offWaiting(callback: EventCallback) {
        this.removeEvent("waiting", callback);
    }

    override fun onSeeking(callback: EventCallback) {
        this.addEvent("seeking", callback);
    }

    override fun offSeeking(callback: EventCallback) {
        this.removeEvent("seeking", callback);
    }

    override fun onSeeked(callback: EventCallback) {
        this.addEvent("seeked", callback);
    }

    override fun offSeeked(callback: EventCallback) {
        this.removeEvent("seeked", callback);
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

    open fun stopTimeUpdate() {
        if (!this.isTriggerTimeUpdate) {
            return;
        }
        var timeUpdate = this.callbacks.get("timeUpdate");
        if (timeUpdate == null || timeUpdate.size == 0) {
            clearInterval(this.timeUpdateInterval.toInt());
            this.timeUpdateInterval = 0;
            this.isTriggerTimeUpdate = false;
        }
    }

    override fun onPlayerError(error: PlaybackException) {
        var fail = CreateInnerAudioContextFailImpl(1107605)
        error.message?.let {
            fail.errMsg = it
        }
        if (error is ExoPlaybackException) {
            val exoError: ExoPlaybackException = error as ExoPlaybackException;
            if (exoError.type == ExoPlaybackException.TYPE_SOURCE) {
                val sourceException: IOException = exoError.sourceException;
                if (sourceException is HttpDataSource.HttpDataSourceException) {
                    fail = CreateInnerAudioContextFailImpl(1107602)
                    val httpException: HttpDataSource.HttpDataSourceException = sourceException;
                    httpException.message?.let {
                        fail.errMsg = it
                    }
                } else {
                    sourceException.message?.let {
						if (it.includes("None of the available extractors")) {
						    fail = CreateInnerAudioContextFailImpl(1107604)
						    fail.errMsg = it
						} else {
						    fail = CreateInnerAudioContextFailImpl(1107603)
						    fail.errMsg = it
						}
					}
                    
                }
            }
        }
        this.errorCallBack?.invoke(fail)
    }

    override fun onPlaybackStateChanged(playbackState: Int) {
        if (playbackState == Player.STATE_BUFFERING) {
            invokeCallBack("waiting")
        } else if (playbackState == Player.STATE_READY) {
            if (!this.isPausedByUser && this.isSeeking) {
                this.isSeeking = false;
                invokeCallBack("seeked")
            } else {
                invokeCallBack("canplay")
                if (this.player.playWhenReady) {
                    invokeCallBack("play")
                }
            }
        } else if (playbackState == Player.STATE_ENDED) {
            invokeCallBack("ended")
            this.player.playWhenReady = false
            this.player.seekTo(0)
        }
    }


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
	override fun onMetadata(metadata:Metadata) {}
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
    override fun onPlayerStateChanged(playWhenReady: Boolean, playbackState: Int) {}
}
