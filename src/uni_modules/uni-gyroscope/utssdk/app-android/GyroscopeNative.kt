package uts.sdk.modules.uniGyroscope

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import io.dcloud.uts.UTSAndroid

object GyroscopeNative {

    private var listener: ((Double, Double, Double) -> Unit)? = null
    private var sensorManager: SensorManager? = null
    private var sensorEventListener: SensorEventListener? = null

    fun setListener(callback: (Double, Double, Double) -> Unit) {
        listener = callback
    }

    fun removeListener() {
        listener = null
    }

    fun start(interval: String): Int {
        return try {
            val context = UTSAndroid.getAppContext() ?: UTSAndroid.getUniActivity() ?: return 701
            val manager = context.getSystemService(Context.SENSOR_SERVICE) as? SensorManager ?: return 701
            val sensor = manager.getDefaultSensor(Sensor.TYPE_GYROSCOPE) ?: return 702
            sensorManager = manager
            sensorEventListener?.let {
                manager.unregisterListener(it)
            }
            val nativeListener = object : SensorEventListener {
                override fun onSensorChanged(event: SensorEvent?) {
                    if (event == null || event.values.size < 3) {
                        return
                    }
                    listener?.invoke(
                        event.values[0].toDouble(),
                        event.values[1].toDouble(),
                        event.values[2].toDouble()
                    )
                }

                override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {
                }
            }
            val registered = manager.registerListener(nativeListener, sensor, mapInterval(interval))
            if (!registered) {
                return 703
            }
            sensorEventListener = nativeListener
            0
        } catch (_: Throwable) {
            704
        }
    }

    fun stop(): Int {
        return try {
            val manager = sensorManager
            val nativeListener = sensorEventListener
            if (manager != null && nativeListener != null) {
                manager.unregisterListener(nativeListener)
            }
            sensorEventListener = null
            0
        } catch (_: Throwable) {
            603
        }
    }

    private fun mapInterval(interval: String): Int {
        return when (interval) {
            "game" -> 20_000
            "ui" -> 60_000
            else -> 200_000
        }
    }
}
