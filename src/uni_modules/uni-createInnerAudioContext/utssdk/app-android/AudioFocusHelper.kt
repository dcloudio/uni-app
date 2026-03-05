package uts.sdk.modules.uniCreateInnerAudioContext

import android.content.Context
import android.media.AudioAttributes
import android.media.AudioFocusRequest
import android.media.AudioManager
import android.media.AudioManager.OnAudioFocusChangeListener
import android.os.Build
import io.dcloud.uts.console

class AudioFocusHelper(
	context: Context,
) {
	companion object {
		var instance: AudioFocusHelper? = null

		@JvmStatic
		fun getInstance(context: Context): AudioFocusHelper {
			if (instance == null) {
				instance = AudioFocusHelper(context.applicationContext)
			}
			return instance!!
		}
	}

	private val listener =
		object : OnAudioFocusChangeListener {
			override fun onAudioFocusChange(focusChange: Int) {
				// 不实现任何操作，完全由系统行为决定，与微信一致
			}
		}

	private val audioManager = context.getSystemService(Context.AUDIO_SERVICE) as AudioManager

	// AudioFocusRequest for Android 26+
	private var audioFocusRequest: AudioFocusRequest? = null
	private val TAG = "AudioFocusHelper"

	var mixWithOther = true

	var speakerOn = true

	// 请求音频焦点
	fun requestAudioFocus() {
		if (mixWithOther) {
			// 如果允许与其他音频混合，则不请求音频焦点
			return
		}
		requestAudioFocusSingle()
	}
	
	fun requestAudioFocusSingle() {
		
		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
			val audioAttributes =
				AudioAttributes
					.Builder()
					.setUsage(AudioAttributes.USAGE_MEDIA)
					.setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
					.build()
		
			audioFocusRequest =
				AudioFocusRequest
					.Builder(AudioManager.AUDIOFOCUS_GAIN)
					.setAudioAttributes(audioAttributes)
					.setOnAudioFocusChangeListener(listener)
					.build()
		
			audioManager.requestAudioFocus(audioFocusRequest!!)
		} else {
			@Suppress("DEPRECATION")
			audioManager.requestAudioFocus(
				listener,
				AudioManager.STREAM_MUSIC,
				AudioManager.AUDIOFOCUS_GAIN,
			)
		}
	}

	// 放弃音频焦点
	fun abandonAudioFocus() {
		if (mixWithOther) {
			// 如果允许与其他音频混合，则不请求音频焦点
			return
		}
		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
			audioFocusRequest?.let {
				audioManager.abandonAudioFocusRequest(it)
			}
		} else {
			@Suppress("DEPRECATION")
			audioManager.abandonAudioFocus(listener)
		}
	}
}
