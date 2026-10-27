package uts.sdk.modules.uniVibrate

import android.content.Context
import android.os.Build
import android.os.VibrationEffect
import android.os.Vibrator
import android.os.VibratorManager
import android.os.VibrationAttributes
import io.dcloud.uts.UTSAndroid

object VibrateNative {
  private const val ERR_CONTEXT_NULL = 9001001
  private const val ERR_NOT_SUPPORTED = 9001002
  private const val ERR_TRIGGER_FAILED = 9001003

  fun vibrateShort(type: String): Int {
    val preset = getShortPreset(type)
    return vibrate(preset.first, preset.second)
  }

  fun vibrateLong(): Int = vibrate(400L, VibrationEffect.DEFAULT_AMPLITUDE)

  private fun vibrate(
    duration: Long,
    amplitude: Int,
  ): Int {
    val context = UTSAndroid.getAppContext() ?: return ERR_CONTEXT_NULL
    return try {
      val vibrator = resolveVibrator(context) ?: return ERR_NOT_SUPPORTED
      if (!vibrator.hasVibrator()) {
        return ERR_NOT_SUPPORTED
      }
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
        val attributes = VibrationAttributes.Builder()
          .setUsage(VibrationAttributes.USAGE_ALARM)
          .build()
        vibrator.vibrate(VibrationEffect.createOneShot(duration, amplitude), attributes)
      } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        vibrator.vibrate(VibrationEffect.createOneShot(duration, amplitude))
      } else {
        @Suppress("DEPRECATION")
        vibrator.vibrate(duration)
      }
      0
    } catch (_: Throwable) {
      ERR_TRIGGER_FAILED
    }
  }

  private fun resolveVibrator(context: Context): Vibrator? =
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
      val manager = context.getSystemService(Context.VIBRATOR_MANAGER_SERVICE) as? VibratorManager
      manager?.defaultVibrator
    } else {
      @Suppress("DEPRECATION")
      context.getSystemService(Context.VIBRATOR_SERVICE) as? Vibrator
    }

  private fun getShortPreset(type: String): Pair<Long, Int> =
    when (type) {
      "heavy" -> Pair(80L, 255)
      "light" -> Pair(30L, 80)
      else -> Pair(50L, 180)
    }
}
