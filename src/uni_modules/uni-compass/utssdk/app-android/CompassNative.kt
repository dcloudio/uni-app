package uts.sdk.modules.uniCompass

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.os.Build
import android.view.Surface
import io.dcloud.uts.UTSAndroid

typealias CompassUpdateListener = (Double, Int?) -> Unit

object CompassNative : SensorEventListener {

    private var sensorManager: SensorManager? = null
    private var accelerometer: Sensor? = null
    private var magneticField: Sensor? = null
    private var listener: CompassUpdateListener? = null
    private var started: Boolean = false
    private var gravityValues: FloatArray? = null
    private var magneticValues: FloatArray? = null
    private var magneticAccuracy: Int = SensorManager.SENSOR_STATUS_UNRELIABLE

    fun setListener(callback: CompassUpdateListener?) {
        listener = callback
    }

    fun removeListener() {
        listener = null
    }

    fun start(): Int {
        if (started) {
            return 0
        }

        val manager = getSensorManager() ?: return 701
        val accel = manager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER) ?: return 702
        val magnet = manager.getDefaultSensor(Sensor.TYPE_MAGNETIC_FIELD) ?: return 703

        accelerometer = accel
        magneticField = magnet
        gravityValues = null
        magneticValues = null
        magneticAccuracy = SensorManager.SENSOR_STATUS_UNRELIABLE

        val samplePeriodUs = 200_000
        val accelOk = manager.registerListener(this, accel, samplePeriodUs)
        val magnetOk = manager.registerListener(this, magnet, samplePeriodUs)
        if (!accelOk || !magnetOk) {
            manager.unregisterListener(this)
            gravityValues = null
            magneticValues = null
            accelerometer = null
            magneticField = null
            return 704
        }

        started = true
        return 0
    }

    fun stop(): Int {
        if (!started) {
            return 0
        }
        sensorManager?.unregisterListener(this)
        started = false
        gravityValues = null
        magneticValues = null
        accelerometer = null
        magneticField = null
        sensorManager = null
        return 0
    }

    override fun onSensorChanged(event: SensorEvent) {
        when (event.sensor.type) {
            Sensor.TYPE_ACCELEROMETER -> gravityValues = event.values.copyOf()
            Sensor.TYPE_MAGNETIC_FIELD -> magneticValues = event.values.copyOf()
        }

        val gravity = gravityValues ?: return
        val magnetic = magneticValues ?: return
        val rotationMatrix = FloatArray(9)
        val inclinationMatrix = FloatArray(9)
        val ready = SensorManager.getRotationMatrix(rotationMatrix, inclinationMatrix, gravity, magnetic)
        if (!ready) {
            return
        }

        val adjustedMatrix = remapCoordinateSystem(rotationMatrix)
        val orientation = FloatArray(3)
        SensorManager.getOrientation(adjustedMatrix, orientation)

        var direction = Math.toDegrees(orientation[0].toDouble())
        if (direction < 0.0) {
            direction += 360.0
        }
        if (direction >= 360.0) {
            direction %= 360.0
        }

        listener?.invoke(direction, magneticAccuracy)
    }

    override fun onAccuracyChanged(sensor: Sensor, accuracy: Int) {
        if (sensor.type == Sensor.TYPE_MAGNETIC_FIELD) {
            magneticAccuracy = accuracy
        }
    }

    private fun getSensorManager(): SensorManager? {
        if (sensorManager != null) {
            return sensorManager
        }
        val activity = UTSAndroid.getUniActivity() ?: return null
        val service = activity.applicationContext.getSystemService(Context.SENSOR_SERVICE)
        sensorManager = service as? SensorManager
        return sensorManager
    }

    private fun remapCoordinateSystem(input: FloatArray): FloatArray {
        val output = FloatArray(9)
        val activity = UTSAndroid.getUniActivity()
        val rotation = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            activity?.display?.rotation ?: Surface.ROTATION_0
        } else {
            @Suppress("DEPRECATION")
            activity?.windowManager?.defaultDisplay?.rotation ?: Surface.ROTATION_0
        }

        when (rotation) {
            Surface.ROTATION_90 -> SensorManager.remapCoordinateSystem(input, SensorManager.AXIS_Y, SensorManager.AXIS_MINUS_X, output)
            Surface.ROTATION_180 -> SensorManager.remapCoordinateSystem(input, SensorManager.AXIS_MINUS_X, SensorManager.AXIS_MINUS_Y, output)
            Surface.ROTATION_270 -> SensorManager.remapCoordinateSystem(input, SensorManager.AXIS_MINUS_Y, SensorManager.AXIS_X, output)
            else -> System.arraycopy(input, 0, output, 0, input.size)
        }
        return output
    }
}
