package uts.sdk.modules.uniGetBackgroundAudioManager;

import android.content.Context
import android.media.AudioAttributes
import android.media.AudioFocusRequest
import android.media.AudioManager
import android.os.Build
import android.util.Log
import uts.sdk.modules.uniGetBackgroundAudioManager.BackgroundAudioPlayer

class AudioFocusHelper(
    private val context: Context,
    private val playerHelper: BackgroundAudioPlayer
) {

    private var isResumable = false
    private val audioManager = context.getSystemService(Context.AUDIO_SERVICE) as AudioManager

    // AudioFocusRequest for Android 26+
    private var audioFocusRequest: AudioFocusRequest? = null
    private val TAG = "AudioFocusHelper"

    private val audioFocusChangeListener = AudioManager.OnAudioFocusChangeListener { focusChange ->
        Log.d(TAG,"focusChange:"+focusChange)
        when (focusChange) {
            AudioManager.AUDIOFOCUS_LOSS_TRANSIENT -> {
                // 临时丢失焦点 (系统行为如闹钟、通知)
                if (playerHelper.player.isPlaying) {
                    isResumable = true
                    playerHelper.pause()
                }
            }

            AudioManager.AUDIOFOCUS_LOSS -> {
                // 永久丢失焦点（如其他音乐播放器）
                isResumable = false
                playerHelper.pause()
            }

            AudioManager.AUDIOFOCUS_GAIN -> {
                // 恢复音频焦点
                if (isResumable) {
                    playerHelper.play()
                    isResumable = false
                }
            }
        }
    }

    // 请求音频焦点
    fun requestAudioFocus(): Boolean {
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val audioAttributes = AudioAttributes.Builder()
                .setUsage(AudioAttributes.USAGE_MEDIA)
                .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
                .build()

            audioFocusRequest = AudioFocusRequest.Builder(AudioManager.AUDIOFOCUS_GAIN)
                .setAudioAttributes(audioAttributes)
                .setOnAudioFocusChangeListener(audioFocusChangeListener)
                .build()

            audioManager.requestAudioFocus(audioFocusRequest!!)
        } else {
            @Suppress("DEPRECATION")
            audioManager.requestAudioFocus(
                audioFocusChangeListener,
                AudioManager.STREAM_MUSIC,
                AudioManager.AUDIOFOCUS_GAIN
            )
        } == AudioManager.AUDIOFOCUS_REQUEST_GRANTED
    }

    // 放弃音频焦点
    fun abandonAudioFocus() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            audioFocusRequest?.let {
                audioManager.abandonAudioFocusRequest(it)
            }
        } else {
            @Suppress("DEPRECATION")
            audioManager.abandonAudioFocus(audioFocusChangeListener)
        }
    }
}

