package uts.sdk.modules.uniAccelerometer

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import io.dcloud.uts.UTSAndroid

object AccelerometerNative {

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
        try {
            val context = UTSAndroid.getAppContext() ?: UTSAndroid.getUniActivity()
            if (context == null) {
                return 701
            }

            val manager = context.getSystemService(Context.SENSOR_SERVICE) as? SensorManager
            if (manager == null) {
                return 701
            }
            sensorManager = manager

            val sensor = manager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER) ?: return 702

            sensorEventListener?.let {
                manager.unregisterListener(it)
            }

            val nativeListener = object : SensorEventListener {
                override fun onSensorChanged(event: SensorEvent?) {
                    if (event == null) {
                        return
                    }
                    val values = event.values
                    if (values.size < 3) {
                        return
                    }
                    listener?.invoke(
                        values[0].toDouble(),
                        values[1].toDouble(),
                        values[2].toDouble()
                    )
                }

                override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {
                }
            }

            val registered = manager.registerListener(nativeListener, sensor, mapIntervalToSamplingPeriodUs(interval))
            if (!registered) {
                return 703
            }

            sensorEventListener = nativeListener
            return 0
        } catch (_: Throwable) {
            return 604
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

    private fun mapIntervalToSamplingPeriodUs(interval: String): Int {
        return when (interval) {
            "game" -> 20_000
            "ui" -> 20_000
            else -> 200_000
        }
    }
}
