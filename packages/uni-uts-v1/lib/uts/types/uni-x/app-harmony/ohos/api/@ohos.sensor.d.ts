/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @file
 * @kit SensorServiceKit
 */
import { AsyncCallback, Callback } from './@ohos.base';
/**
 * This module provides the capability to subscribe to sensor data.
 * @namespace sensor
 * @syscap SystemCapability.Sensors.Sensor
 * @since 8
 */
/**
 * This module provides the capability to subscribe to sensor data.
 * @namespace sensor
 * @syscap SystemCapability.Sensors.Sensor
 * @atomicservice
 * @since 11
 */
declare namespace sensor {
    /**
     * Enum for obtain the type of sensor.
     * @enum { number }
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    /**
     * Enum for obtain the type of sensor.
     * @enum { number }
     * @syscap SystemCapability.Sensors.Sensor
     * @atomicservice
     * @since 11
     */
    enum SensorId {
        /**
         * Acceleration sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 9
         */
        /**
         * Acceleration sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @atomicservice
         * @since 11
         */
        ACCELEROMETER = 1,
        /**
         * Gyroscope sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 9
         */
        /**
         * Gyroscope sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @atomicservice
         * @since 11
         */
        GYROSCOPE = 2,
        /**
         * Ambient light sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 9
         */
        AMBIENT_LIGHT = 5,
        /**
         * Magnetic field sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 9
         */
        MAGNETIC_FIELD = 6,
        /**
         * Barometric pressure sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 9
         */
        BAROMETER = 8,
        /**
         * Hall effect sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 9
         */
        HALL = 10,
        /**
         * Proximity sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 9
         */
        PROXIMITY = 12,
        /**
         * Humidity sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 9
         */
        HUMIDITY = 13,
        /**
         * Orientation sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 9
         */
        /**
         * Orientation sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @atomicservice
         * @since 11
         */
        ORIENTATION = 256,
        /**
         * Gravity sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 9
         */
        GRAVITY = 257,
        /**
         * Linear acceleration sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 9
         */
        LINEAR_ACCELEROMETER = 258,
        /**
         * Rotation vector sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 9
         */
        ROTATION_VECTOR = 259,
        /**
         * Ambient temperature sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 9
         */
        AMBIENT_TEMPERATURE = 260,
        /**
         * Uncalibrated magnetic field sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 9
         */
        MAGNETIC_FIELD_UNCALIBRATED = 261,
        /**
         * Uncalibrated gyroscope sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 9
         */
        GYROSCOPE_UNCALIBRATED = 263,
        /**
         * Significant motion sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 9
         */
        SIGNIFICANT_MOTION = 264,
        /**
         * Pedometer detection sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 9
         */
        PEDOMETER_DETECTION = 265,
        /**
         * Pedometer sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 9
         */
        PEDOMETER = 266,
        /**
         * Heart rate sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 9
         */
        HEART_RATE = 278,
        /**
         * Wear detection sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 9
         */
        WEAR_DETECTION = 280,
        /**
         * Uncalibrated acceleration sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 9
         */
        ACCELEROMETER_UNCALIBRATED = 281
    }
    /**
     * Subscribe to accelerometer sensor data.
     * @permission ohos.permission.ACCELEROMETER
     * @param { SensorId.ACCELEROMETER } type - Indicate the sensor type to listen for, {@code SensorId.ACCELEROMETER}.
     * @param { Callback<AccelerometerResponse> } callback - callback accelerometer data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    /**
     * Subscribe to accelerometer sensor data.
     * @permission ohos.permission.ACCELEROMETER
     * @param { SensorId.ACCELEROMETER } type - Indicate the sensor type to listen for, {@code SensorId.ACCELEROMETER}.
     * @param { Callback<AccelerometerResponse> } callback - callback accelerometer data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @atomicservice
     * @since 11
     */
    function on(type: SensorId.ACCELEROMETER, callback: Callback<AccelerometerResponse>, options?: Options): void;
    /**
     * Subscribe to uncalibrated accelerometer sensor data.
     * @permission ohos.permission.ACCELEROMETER
     * @param { SensorId.ACCELEROMETER_UNCALIBRATED } type - Indicate the sensor type to listen for,{@code SensorId.ACCELEROMETER_UNCALIBRATED}.
     * @param { Callback<AccelerometerUncalibratedResponse> } callback - callback uncalibrated accelerometer data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.ACCELEROMETER_UNCALIBRATED, callback: Callback<AccelerometerUncalibratedResponse>, options?: Options): void;
    /**
     * Subscribe to ambient light sensor data.
     * @param { SensorId.AMBIENT_LIGHT } type - Indicate the sensor type to listen for, {@code SensorId.AMBIENT_LIGHT}.
     * @param { Callback<LightResponse> } callback - callback ambient data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.AMBIENT_LIGHT, callback: Callback<LightResponse>, options?: Options): void;
    /**
     * Subscribe to ambient temperature sensor data.
     * @param { SensorId.AMBIENT_TEMPERATURE } type - Indicate the sensor type to listen for, {@code SensorId.AMBIENT_TEMPERATURE}.
     * @param { Callback<AmbientTemperatureResponse> } callback - callback temperature data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.AMBIENT_TEMPERATURE, callback: Callback<AmbientTemperatureResponse>, options?: Options): void;
    /**
     * Subscribe to barometer sensor data.
     * @param { SensorId.BAROMETER } type - Indicate the sensor type to listen for, {@code SensorId.BAROMETER}.
     * @param { Callback<BarometerResponse> } callback - callback barometer data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.BAROMETER, callback: Callback<BarometerResponse>, options?: Options): void;
    /**
     * Subscribe to gravity sensor data.
     * @param { SensorId.GRAVITY } type - Indicate the sensor type to listen for, {@code SensorId.GRAVITY}.
     * @param { Callback<GravityResponse> } callback - callback gravity data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.GRAVITY, callback: Callback<GravityResponse>, options?: Options): void;
    /**
     * Subscribe to gyroscope sensor data.
     * @permission ohos.permission.GYROSCOPE
     * @param { SensorId.GYROSCOPE } type - Indicate the sensor type to listen for, {@code SensorId.GYROSCOPE}.
     * @param { Callback<GyroscopeResponse> } callback - callback gyroscope data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    /**
     * Subscribe to gyroscope sensor data.
     * @permission ohos.permission.GYROSCOPE
     * @param { SensorId.GYROSCOPE } type - Indicate the sensor type to listen for, {@code SensorId.GYROSCOPE}.
     * @param { Callback<GyroscopeResponse> } callback - callback gyroscope data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @atomicservice
     * @since 11
     */
    function on(type: SensorId.GYROSCOPE, callback: Callback<GyroscopeResponse>, options?: Options): void;
    /**
     * Subscribe to uncalibrated gyroscope sensor data.
     * @permission ohos.permission.GYROSCOPE
     * @param { SensorId.GYROSCOPE_UNCALIBRATED } type - Indicate the sensor type to listen for, {@code SensorId.GYROSCOPE_UNCALIBRATED}.
     * @param { Callback<GyroscopeUncalibratedResponse> } callback - callback uncalibrated gyroscope data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.GYROSCOPE_UNCALIBRATED, callback: Callback<GyroscopeUncalibratedResponse>, options?: Options): void;
    /**
     * Subscribe to hall sensor data.
     * @param { SensorId.HALL } type - Indicate the sensor type to listen for, {@code SensorId.HALL}.
     * @param { Callback<HallResponse> } callback - callback uncalibrated gyroscope data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.HALL, callback: Callback<HallResponse>, options?: Options): void;
    /**
     * Subscribe to heart rate sensor data.
     * @permission ohos.permission.READ_HEALTH_DATA
     * @param { SensorId.HEART_RATE } type - Indicate the sensor type to listen for, {@code SensorId.HEART_RATE}.
     * @param { Callback<HeartRateResponse> } callback - callback heart rate data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.HEART_RATE, callback: Callback<HeartRateResponse>, options?: Options): void;
    /**
     * Subscribe to humidity sensor data.
     * @param { SensorId.HUMIDITY } type - Indicate the sensor type to listen for, {@code SensorId.HUMIDITY}.
     * @param { Callback<HumidityResponse> } callback - callback humidity data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.HUMIDITY, callback: Callback<HumidityResponse>, options?: Options): void;
    /**
     * Subscribe to linear acceleration sensor data.
     * @permission ohos.permission.ACCELEROMETER
     * @param { SensorId.LINEAR_ACCELEROMETER } type - Indicate the sensor type to listen for, {@code SensorId.LINEAR_ACCELEROMETER}.
     * @param { Callback<LinearAccelerometerResponse> } callback - callback linear acceleration data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.LINEAR_ACCELEROMETER, callback: Callback<LinearAccelerometerResponse>, options?: Options): void;
    /**
     * Subscribe to magnetic field sensor data.
     * @param { SensorId.MAGNETIC_FIELD } type - Indicate the sensor type to listen for, {@code SensorId.MAGNETIC_FIELD}.
     * @param { Callback<MagneticFieldResponse> } callback - callback magnetic field data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.MAGNETIC_FIELD, callback: Callback<MagneticFieldResponse>, options?: Options): void;
    /**
     * Subscribe to uncalibrated magnetic field sensor data.
     * @param { SensorId.MAGNETIC_FIELD_UNCALIBRATED } type - Indicate the sensor type to listen for,
     *        {@code SensorId.MAGNETIC_FIELD_UNCALIBRATED}.
     * @param { Callback<MagneticFieldUncalibratedResponse> } callback - callback uncalibrated magnetic field data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.MAGNETIC_FIELD_UNCALIBRATED, callback: Callback<MagneticFieldUncalibratedResponse>, options?: Options): void;
    /**
     * Subscribe to orientation sensor data.
     * @param { SensorId.ORIENTATION } type - Indicate the sensor type to listen for, {@code SensorId.ORIENTATION}.
     * @param { Callback<OrientationResponse> } callback - callback orientation data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    /**
     * Subscribe to orientation sensor data.
     * @param { SensorId.ORIENTATION } type - Indicate the sensor type to listen for, {@code SensorId.ORIENTATION}.
     * @param { Callback<OrientationResponse> } callback - callback orientation data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @atomicservice
     * @since 11
     */
    function on(type: SensorId.ORIENTATION, callback: Callback<OrientationResponse>, options?: Options): void;
    /**
     * Subscribe to pedometer sensor data.
     * @permission ohos.permission.ACTIVITY_MOTION
     * @param { SensorId.PEDOMETER } type - Indicate the sensor type to listen for, {@code SensorId.PEDOMETER}.
     * @param { Callback<PedometerResponse> } callback - callback pedometer data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.PEDOMETER, callback: Callback<PedometerResponse>, options?: Options): void;
    /**
     * Subscribe to pedometer detection sensor data.
     * @permission ohos.permission.ACTIVITY_MOTION
     * @param { SensorId.PEDOMETER_DETECTION } type - Indicate the sensor type to listen for, {@code SensorId.PEDOMETER_DETECTION}.
     * @param { Callback<PedometerDetectionResponse> } callback - callback pedometer detection data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.PEDOMETER_DETECTION, callback: Callback<PedometerDetectionResponse>, options?: Options): void;
    /**
     * Subscribe to proximity sensor data.
     * @param { SensorId.PROXIMITY } type - Indicate the sensor type to listen for, {@code SensorId.PROXIMITY}.
     * @param { Callback<ProximityResponse> } callback - callback proximity data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.PROXIMITY, callback: Callback<ProximityResponse>, options?: Options): void;
    /**
     * Subscribe to rotation vector sensor data.
     * @param { SensorId.ROTATION_VECTOR } type - Indicate the sensor type to listen for, {@code SensorId.ROTATION_VECTOR}.
     * @param { Callback<RotationVectorResponse> } callback - callback rotation vector data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.ROTATION_VECTOR, callback: Callback<RotationVectorResponse>, options?: Options): void;
    /**
     * Subscribe to significant motion sensor data.
     * @param { SensorId.SIGNIFICANT_MOTION } type - Indicate the sensor type to listen for, {@code SensorId.SIGNIFICANT_MOTION}.
     * @param { Callback<SignificantMotionResponse> } callback - callback significant motion data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.SIGNIFICANT_MOTION, callback: Callback<SignificantMotionResponse>, options?: Options): void;
    /**
     * Subscribe to wear detection sensor data.
     * @param { SensorId.WEAR_DETECTION } type - Indicate the sensor type to listen for, {@code SensorId.WEAR_DETECTION}.
     * @param { Callback<WearDetectionResponse> } callback - callback wear detection data.
     * @param { Options } [options] - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function on(type: SensorId.WEAR_DETECTION, callback: Callback<WearDetectionResponse>, options?: Options): void;
    /**
     * Subscribe to accelerometer sensor data once.
     * @permission ohos.permission.ACCELEROMETER
     * @param { SensorId.ACCELEROMETER } type - Indicate the sensor type to listen for, {@code SensorId.ACCELEROMETER}.
     * @param { Callback<AccelerometerResponse> } callback - callback accelerometer data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.ACCELEROMETER, callback: Callback<AccelerometerResponse>): void;
    /**
     * Subscribe to uncalibrated accelerometer sensor data once.
     * @permission ohos.permission.ACCELEROMETER
     * @param { SensorId.ACCELEROMETER_UNCALIBRATED } type - Indicate the sensor type to listen for,{@code SensorId.ACCELEROMETER_UNCALIBRATED}.
     * @param { Callback<AccelerometerUncalibratedResponse> } callback - callback uncalibrated accelerometer data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.ACCELEROMETER_UNCALIBRATED, callback: Callback<AccelerometerUncalibratedResponse>): void;
    /**
     * Subscribe to ambient light sensor data once.
     * @param { SensorId.AMBIENT_LIGHT } type - Indicate the sensor type to listen for, {@code SensorId.AMBIENT_LIGHT}.
     * @param { Callback<LightResponse> } callback - callback ambient data.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.AMBIENT_LIGHT, callback: Callback<LightResponse>): void;
    /**
     * Subscribe to ambient temperature sensor data once.
     * @param { SensorId.AMBIENT_TEMPERATURE } type - Indicate the sensor type to listen for, {@code SensorId.AMBIENT_TEMPERATURE}.
     * @param { Callback<AmbientTemperatureResponse> } callback - callback temperature data.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.AMBIENT_TEMPERATURE, callback: Callback<AmbientTemperatureResponse>): void;
    /**
     * Subscribe to barometer sensor data once.
     * @param { SensorId.BAROMETER } type - Indicate the sensor type to listen for, {@code SensorId.BAROMETER}.
     * @param { Callback<BarometerResponse> } callback - callback barometer data.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.BAROMETER, callback: Callback<BarometerResponse>): void;
    /**
     * Subscribe to gravity sensor data once.
     * @param { SensorId.GRAVITY } type - Indicate the sensor type to listen for, {@code SensorId.GRAVITY}.
     * @param { Callback<GravityResponse> } callback - callback gravity data.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.GRAVITY, callback: Callback<GravityResponse>): void;
    /**
     * Subscribe to gyroscope sensor data once.
     * @permission ohos.permission.GYROSCOPE
     * @param { SensorId.GYROSCOPE } type - Indicate the sensor type to listen for, {@code SensorId.GYROSCOPE}.
     * @param { Callback<GyroscopeResponse> } callback - callback gyroscope data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.GYROSCOPE, callback: Callback<GyroscopeResponse>): void;
    /**
     * Subscribe to uncalibrated gyroscope sensor data once.
     * @permission ohos.permission.GYROSCOPE
     * @param { SensorId.GYROSCOPE_UNCALIBRATED } type - Indicate the sensor type to listen for,{@code SensorId.GYROSCOPE_UNCALIBRATED}.
     * @param { Callback<GyroscopeUncalibratedResponse> } callback - callback uncalibrated gyroscope data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.GYROSCOPE_UNCALIBRATED, callback: Callback<GyroscopeUncalibratedResponse>): void;
    /**
     * Subscribe to hall sensor data once.
     * @param { SensorId.HALL } type - Indicate the sensor type to listen for, {@code SensorId.HALL}.
     * @param { Callback<HallResponse> } callback - callback uncalibrated gyroscope data.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.HALL, callback: Callback<HallResponse>): void;
    /**
     * Subscribe to heart rate sensor data once.
     * @permission ohos.permission.READ_HEALTH_DATA
     * @param { SensorId.HEART_RATE } type - Indicate the sensor type to listen for, {@code SensorId.HEART_RATE}.
     * @param { Callback<HeartRateResponse> } callback - callback heart rate data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.HEART_RATE, callback: Callback<HeartRateResponse>): void;
    /**
     * Subscribe to humidity sensor data once.
     * @param { SensorId.HUMIDITY } type - Indicate the sensor type to listen for, {@code SensorId.HUMIDITY}.
     * @param { Callback<HumidityResponse> } callback - callback humidity data.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.HUMIDITY, callback: Callback<HumidityResponse>): void;
    /**
     * Subscribe to linear acceleration sensor data once.
     * @permission ohos.permission.ACCELEROMETER
     * @param { SensorId.LINEAR_ACCELEROMETER } type - Indicate the sensor type to listen for, {@code SensorId.LINEAR_ACCELEROMETER}.
     * @param { Callback<LinearAccelerometerResponse> } callback - callback linear acceleration data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.LINEAR_ACCELEROMETER, callback: Callback<LinearAccelerometerResponse>): void;
    /**
     * Subscribe to magnetic field sensor data once.
     * @param { SensorId.MAGNETIC_FIELD } type - Indicate the sensor type to listen for, {@code SensorId.MAGNETIC_FIELD}.
     * @param { Callback<MagneticFieldResponse> } callback - callback magnetic field data.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.MAGNETIC_FIELD, callback: Callback<MagneticFieldResponse>): void;
    /**
     * Subscribe to uncalibrated magnetic field sensor data once.
     * @param { SensorId.MAGNETIC_FIELD_UNCALIBRATED } type - Indicate the sensor type to listen for,
     *        {@code SensorId.MAGNETIC_FIELD_UNCALIBRATED}.
     * @param { Callback<MagneticFieldUncalibratedResponse> } callback - callback uncalibrated magnetic field data.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.MAGNETIC_FIELD_UNCALIBRATED, callback: Callback<MagneticFieldUncalibratedResponse>): void;
    /**
     * Subscribe to orientation sensor data once.
     * @param { SensorId.ORIENTATION } type - Indicate the sensor type to listen for, {@code SensorId.ORIENTATION}.
     * @param { Callback<OrientationResponse> } callback - callback orientation data.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.ORIENTATION, callback: Callback<OrientationResponse>): void;
    /**
     * Subscribe to pedometer sensor data once.
     * @permission ohos.permission.ACTIVITY_MOTION
     * @param { SensorId.PEDOMETER } type - Indicate the sensor type to listen for, {@code SensorId.PEDOMETER}.
     * @param { Callback<PedometerResponse> } callback - callback pedometer data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.PEDOMETER, callback: Callback<PedometerResponse>): void;
    /**
     * Subscribe to pedometer detection sensor data once.
     * @permission ohos.permission.ACTIVITY_MOTION
     * @param { SensorId.PEDOMETER_DETECTION } type - Indicate the sensor type to listen for, {@code SensorId.PEDOMETER_DETECTION}.
     * @param { Callback<PedometerDetectionResponse> } callback - callback pedometer detection data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.PEDOMETER_DETECTION, callback: Callback<PedometerDetectionResponse>): void;
    /**
     * Subscribe to proximity sensor data once.
     * @param { SensorId.PROXIMITY } type - Indicate the sensor type to listen for, {@code SensorId.PROXIMITY}.
     * @param { Callback<ProximityResponse> } callback - callback proximity data.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.PROXIMITY, callback: Callback<ProximityResponse>): void;
    /**
     * Subscribe to rotation vector sensor data once.
     * @param { SensorId.ROTATION_VECTOR } type - Indicate the sensor type to listen for, {@code SensorId.ROTATION_VECTOR}.
     * @param { Callback<RotationVectorResponse> } callback - callback rotation vector data.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.ROTATION_VECTOR, callback: Callback<RotationVectorResponse>): void;
    /**
     * Subscribe to significant motion sensor data once.
     * @param { SensorId.SIGNIFICANT_MOTION } type - Indicate the sensor type to listen for, {@code SensorId.SIGNIFICANT_MOTION}.
     * @param { Callback<SignificantMotionResponse> } callback - callback significant motion data.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.SIGNIFICANT_MOTION, callback: Callback<SignificantMotionResponse>): void;
    /**
     * Subscribe to wear detection sensor data once.
     * @param { SensorId.WEAR_DETECTION } type - Indicate the sensor type to listen for, {@code SensorId.WEAR_DETECTION}.
     * @param { Callback<WearDetectionResponse> } callback - callback wear detection data.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     *
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function once(type: SensorId.WEAR_DETECTION, callback: Callback<WearDetectionResponse>): void;
    /**
     * Unsubscribe to accelerometer sensor data.
     * @permission ohos.permission.ACCELEROMETER
     * @param { SensorId.ACCELEROMETER } type - Indicate the sensor type to listen for, {@code SensorId.ACCELEROMETER}.
     * @param { Callback<AccelerometerResponse> } callback - callback accelerometer data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    /**
     * Unsubscribe to accelerometer sensor data.
     * @permission ohos.permission.ACCELEROMETER
     * @param { SensorId.ACCELEROMETER } type - Indicate the sensor type to listen for, {@code SensorId.ACCELEROMETER}.
     * @param { Callback<AccelerometerResponse> } callback - callback accelerometer data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Sensors.Sensor
     * @atomicservice
     * @since 11
     */
    function off(type: SensorId.ACCELEROMETER, callback?: Callback<AccelerometerResponse>): void;
    /**
     * Unsubscribe to uncalibrated accelerometer sensor data.
     * @permission ohos.permission.ACCELEROMETER
     * @param { SensorId.ACCELEROMETER_UNCALIBRATED } type - Indicate the sensor type to listen for,
     *        {@code SensorId.ACCELEROMETER_UNCALIBRATED}.
     * @param { Callback<AccelerometerUncalibratedResponse> } callback - callback uncalibrated accelerometer data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.ACCELEROMETER_UNCALIBRATED, callback?: Callback<AccelerometerUncalibratedResponse>): void;
    /**
     * Unsubscribe to ambient light sensor data.
     * @param { SensorId.AMBIENT_LIGHT } type - Indicate the sensor type to listen for, {@code SensorId.AMBIENT_LIGHT}.
     * @param { Callback<LightResponse> } callback - callback ambient data.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.AMBIENT_LIGHT, callback?: Callback<LightResponse>): void;
    /**
     * Unsubscribe to ambient temperature sensor data.
     * @param { SensorId.AMBIENT_TEMPERATURE } type - Indicate the sensor type to listen for, {@code SensorId.AMBIENT_TEMPERATURE}.
     * @param { Callback<AmbientTemperatureResponse> } callback - callback temperature data.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.AMBIENT_TEMPERATURE, callback?: Callback<AmbientTemperatureResponse>): void;
    /**
     * Unsubscribe to barometer sensor data.
     * @param { SensorId.BAROMETER } type - Indicate the sensor type to listen for, {@code SensorId.BAROMETER}.
     * @param { Callback<BarometerResponse> } callback - callback barometer data.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.BAROMETER, callback?: Callback<BarometerResponse>): void;
    /**
     * Unsubscribe to gravity sensor data.
     * @param { SensorId.GRAVITY } type - Indicate the sensor type to listen for, {@code SensorId.GRAVITY}.
     * @param { Callback<GravityResponse> } callback - callback gravity data.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.GRAVITY, callback?: Callback<GravityResponse>): void;
    /**
     * Unsubscribe to gyroscope sensor data.
     * @permission ohos.permission.GYROSCOPE
     * @param { SensorId.GYROSCOPE } type - Indicate the sensor type to listen for, {@code SensorId.GYROSCOPE}.
     * @param { Callback<GyroscopeResponse> } callback - callback gyroscope data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    /**
     * Unsubscribe to gyroscope sensor data.
     * @permission ohos.permission.GYROSCOPE
     * @param { SensorId.GYROSCOPE } type - Indicate the sensor type to listen for, {@code SensorId.GYROSCOPE}.
     * @param { Callback<GyroscopeResponse> } callback - callback gyroscope data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Sensors.Sensor
     * @atomicservice
     * @since 11
     */
    function off(type: SensorId.GYROSCOPE, callback?: Callback<GyroscopeResponse>): void;
    /**
     * Unsubscribe to uncalibrated gyroscope sensor data.
     * @permission ohos.permission.GYROSCOPE
     * @param { SensorId.GYROSCOPE_UNCALIBRATED } type - Indicate the sensor type to listen for, {@code SensorId.GYROSCOPE_UNCALIBRATED}.
     * @param { Callback<GyroscopeUncalibratedResponse> } callback - callback uncalibrated gyroscope data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.GYROSCOPE_UNCALIBRATED, callback?: Callback<GyroscopeUncalibratedResponse>): void;
    /**
     * Unsubscribe to hall sensor data.
     * @param { SensorId.HALL } type - Indicate the sensor type to listen for, {@code SensorId.HALL}.
     * @param { Callback<HallResponse> } callback - callback uncalibrated gyroscope data.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.HALL, callback?: Callback<HallResponse>): void;
    /**
     * Unsubscribe to heart rate sensor data.
     * @permission ohos.permission.READ_HEALTH_DATA
     * @param { SensorId.HEART_RATE } type - Indicate the sensor type to listen for, {@code SensorId.HEART_RATE}.
     * @param { Callback<HeartRateResponse> } callback - callback heart rate data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.HEART_RATE, callback?: Callback<HeartRateResponse>): void;
    /**
     * Unsubscribe to humidity sensor data.
     * @param { SensorId.HUMIDITY } type - Indicate the sensor type to listen for, {@code SensorId.HUMIDITY}.
     * @param { Callback<HumidityResponse> } callback - callback humidity data.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.HUMIDITY, callback?: Callback<HumidityResponse>): void;
    /**
     * Unsubscribe to linear acceleration sensor data.
     * @permission ohos.permission.ACCELEROMETER
     * @param { SensorId.LINEAR_ACCELEROMETER } type - Indicate the sensor type to listen for, {@code SensorId.LINEAR_ACCELEROMETER}.
     * @param { Callback<LinearAccelerometerResponse> } callback - callback linear acceleration data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.LINEAR_ACCELEROMETER, callback?: Callback<LinearAccelerometerResponse>): void;
    /**
     * Unsubscribe to magnetic field sensor data.
     * @param { SensorId.MAGNETIC_FIELD } type - Indicate the sensor type to listen for, {@code SensorId.MAGNETIC_FIELD}.
     * @param { Callback<MagneticFieldResponse> } callback - callback magnetic field data.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.MAGNETIC_FIELD, callback?: Callback<MagneticFieldResponse>): void;
    /**
     * Unsubscribe to uncalibrated magnetic field sensor data.
     * @param { SensorId.MAGNETIC_FIELD_UNCALIBRATED } type - Indicate the sensor type to listen for,
     *        {@code SensorId.MAGNETIC_FIELD_UNCALIBRATED}.
     * @param { Callback<MagneticFieldUncalibratedResponse> } callback - callback uncalibrated magnetic field data.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.MAGNETIC_FIELD_UNCALIBRATED, callback?: Callback<MagneticFieldUncalibratedResponse>): void;
    /**
     * Unsubscribe to orientation sensor data.
     * @param { SensorId.ORIENTATION } type - Indicate the sensor type to listen for, {@code SensorId.ORIENTATION}.
     * @param { Callback<OrientationResponse> } callback - callback orientation data.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    /**
     * Unsubscribe to orientation sensor data.
     * @param { SensorId.ORIENTATION } type - Indicate the sensor type to listen for, {@code SensorId.ORIENTATION}.
     * @param { Callback<OrientationResponse> } callback - callback orientation data.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Sensors.Sensor
     * @atomicservice
     * @since 11
     */
    function off(type: SensorId.ORIENTATION, callback?: Callback<OrientationResponse>): void;
    /**
     * Unsubscribe to pedometer sensor data.
     * @permission ohos.permission.ACTIVITY_MOTION
     * @param { SensorId.PEDOMETER } type - Indicate the sensor type to listen for, {@code SensorId.PEDOMETER}.
     * @param { Callback<PedometerResponse> } callback - callback pedometer data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.PEDOMETER, callback?: Callback<PedometerResponse>): void;
    /**
     * Unsubscribe to pedometer detection sensor data.
     * @permission ohos.permission.ACTIVITY_MOTION
     * @param { SensorId.PEDOMETER_DETECTION } type - Indicate the sensor type to listen for, {@code SensorId.PEDOMETER_DETECTION}.
     * @param { Callback<PedometerDetectionResponse> } callback - callback pedometer detection data.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.PEDOMETER_DETECTION, callback?: Callback<PedometerDetectionResponse>): void;
    /**
     * Unsubscribe to proximity sensor data.
     * @param { SensorId.PROXIMITY } type - Indicate the sensor type to listen for, {@code SensorId.PROXIMITY}.
     * @param { Callback<ProximityResponse> } callback - callback proximity data.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.PROXIMITY, callback?: Callback<ProximityResponse>): void;
    /**
     * Unsubscribe to rotation vector sensor data.
     * @param { SensorId.ROTATION_VECTOR } type - Indicate the sensor type to listen for, {@code SensorId.ROTATION_VECTOR}.
     * @param { Callback<RotationVectorResponse> } callback - callback rotation vector data.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.ROTATION_VECTOR, callback?: Callback<RotationVectorResponse>): void;
    /**
     * Unsubscribe to significant motion sensor data.
     * @param { SensorId.SIGNIFICANT_MOTION } type - Indicate the sensor type to listen for, {@code SensorId.SIGNIFICANT_MOTION}.
     * @param { Callback<SignificantMotionResponse> } callback - callback significant motion data.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.SIGNIFICANT_MOTION, callback?: Callback<SignificantMotionResponse>): void;
    /**
     * Unsubscribe to wear detection sensor data.
     * @param { SensorId.WEAR_DETECTION } type - Indicate the sensor type to listen for, {@code SensorId.WEAR_DETECTION}.
     * @param { Callback<WearDetectionResponse> } callback - callback wear detection data.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function off(type: SensorId.WEAR_DETECTION, callback?: Callback<WearDetectionResponse>): void;
    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @permission ohos.permission.ACCELEROMETER
     * @param { SensorType.SENSOR_TYPE_ID_ACCELEROMETER } type - Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_ACCELEROMETER}.
     * @param { Callback<AccelerometerResponse> } callback - callback accelerometer data.
     * @param { Options } options - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#ACCELEROMETER
     */
    function on(type: SensorType.SENSOR_TYPE_ID_ACCELEROMETER, callback: Callback<AccelerometerResponse>, options?: Options): void;
    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @permission ohos.permission.ACCELEROMETER
     * @param { SensorType.SENSOR_TYPE_ID_ACCELEROMETER_UNCALIBRATED } type - Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_ACCELEROMETER_UNCALIBRATED}.
     * @param { Callback<AccelerometerUncalibratedResponse> } callback - callback accelerometer uncalibrated data.
     * @param { Options } options - Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#ACCELEROMETER_UNCALIBRATED
     */
    function on(type: SensorType.SENSOR_TYPE_ID_ACCELEROMETER_UNCALIBRATED, callback: Callback<AccelerometerUncalibratedResponse>, options?: Options): void;
    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @param { SensorType.SENSOR_TYPE_ID_AMBIENT_LIGHT } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_AMBIENT_LIGHT}.
     * @param { Callback<LightResponse> } callback - callback light data.
     * @param { Options } options - options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#AMBIENT_LIGHT
     */
    function on(type: SensorType.SENSOR_TYPE_ID_AMBIENT_LIGHT, callback: Callback<LightResponse>, options?: Options): void;
    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @param { SensorType.SENSOR_TYPE_ID_AMBIENT_TEMPERATURE } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_AMBIENT_TEMPERATURE}.
     * @param { Callback<AmbientTemperatureResponse> } callback - callback ambient temperature data.
     * @param { Options } options - options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#AMBIENT_TEMPERATURE
     */
    function on(type: SensorType.SENSOR_TYPE_ID_AMBIENT_TEMPERATURE, callback: Callback<AmbientTemperatureResponse>, options?: Options): void;
    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @param { SensorType.SENSOR_TYPE_ID_BAROMETER } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_BAROMETER}.
     * @param { Callback<BarometerResponse> } callback - callback barometer data.
     * @param { Options } options - options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#BAROMETER
     */
    function on(type: SensorType.SENSOR_TYPE_ID_BAROMETER, callback: Callback<BarometerResponse>, options?: Options): void;
    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @param { SensorType.SENSOR_TYPE_ID_GRAVITY } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_GRAVITY}.
     * @param { Callback<GravityResponse> } callback - callback gravity data.
     * @param { Options } options - options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#GRAVITY
     */
    function on(type: SensorType.SENSOR_TYPE_ID_GRAVITY, callback: Callback<GravityResponse>, options?: Options): void;
    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @permission ohos.permission.GYROSCOPE
     * @param { SensorType.SENSOR_TYPE_ID_GYROSCOPE } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_GYROSCOPE}.
     * @param { Callback<GyroscopeResponse> } callback - callback gyroscope data.
     * @param { Options } options - options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#GYROSCOPE
     */
    function on(type: SensorType.SENSOR_TYPE_ID_GYROSCOPE, callback: Callback<GyroscopeResponse>, options?: Options): void;
    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @permission ohos.permission.GYROSCOPE
     * @param { SensorType.SENSOR_TYPE_ID_GYROSCOPE_UNCALIBRATED } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_GYROSCOPE_UNCALIBRATED}.
     * @param { Callback<GyroscopeUncalibratedResponse> } callback - callback gyroscope uncalibrated data.
     * @param { Options } options - options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#GYROSCOPE_UNCALIBRATED
     */
    function on(type: SensorType.SENSOR_TYPE_ID_GYROSCOPE_UNCALIBRATED, callback: Callback<GyroscopeUncalibratedResponse>, options?: Options): void;
    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @param { SensorType.SENSOR_TYPE_ID_HALL } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_HALL}.
     * @param { Callback<HallResponse> } callback - callback hall data.
     * @param { Options } options - options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#HALL
     */
    function on(type: SensorType.SENSOR_TYPE_ID_HALL, callback: Callback<HallResponse>, options?: Options): void;
    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @permission ohos.permission.HEALTH_DATA
     * @param { SensorType.SENSOR_TYPE_ID_HEART_RATE } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_HEART_RATE}.
     * @param { Callback<HeartRateResponse> } callback - callback heart rate data.
     * @param { Options } options - options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#HEART_RATE
     */
    function on(type: SensorType.SENSOR_TYPE_ID_HEART_RATE, callback: Callback<HeartRateResponse>, options?: Options): void;
    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @param { SensorType.SENSOR_TYPE_ID_HUMIDITY } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_HUMIDITY}.
     * @param { Callback<HumidityResponse> } callback - callback humidity data.
     * @param { Options } options - options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#HUMIDITY
     */
    function on(type: SensorType.SENSOR_TYPE_ID_HUMIDITY, callback: Callback<HumidityResponse>, options?: Options): void;
    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @permission ohos.permission.ACCELEROMETER
     * @param { SensorType.SENSOR_TYPE_ID_LINEAR_ACCELERATION } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_LINEAR_ACCELERATION}.
     * @param { Callback<LinearAccelerometerResponse> } callback - callback linear accelerometer data.
     * @param { Options } options - options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#LINEAR_ACCELEROMETER
     */
    function on(type: SensorType.SENSOR_TYPE_ID_LINEAR_ACCELERATION, callback: Callback<LinearAccelerometerResponse>, options?: Options): void;
    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @param { SensorType.SENSOR_TYPE_ID_MAGNETIC_FIELD } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_MAGNETIC_FIELD}.
     * @param { Callback<MagneticFieldResponse> } callback - callback magnetic field data.
     * @param { Options } options - options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#MAGNETIC_FIELD
     */
    function on(type: SensorType.SENSOR_TYPE_ID_MAGNETIC_FIELD, callback: Callback<MagneticFieldResponse>, options?: Options): void;
    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @param { SensorType.SENSOR_TYPE_ID_MAGNETIC_FIELD_UNCALIBRATED } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_MAGNETIC_FIELD_UNCALIBRATED}.
     * @param { Callback<MagneticFieldUncalibratedResponse> } callback - callback magnetic field uncalibrated data.
     * @param { Options } options - options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#MAGNETIC_FIELD_UNCALIBRATED
     */
    function on(type: SensorType.SENSOR_TYPE_ID_MAGNETIC_FIELD_UNCALIBRATED, callback: Callback<MagneticFieldUncalibratedResponse>, options?: Options): void;
    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @param { SensorType.SENSOR_TYPE_ID_ORIENTATION } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_ORIENTATION}.
     * @param { Callback<OrientationResponse> } callback - callback orientation data.
     * @param { Options } options - options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#ORIENTATION
     */
    function on(type: SensorType.SENSOR_TYPE_ID_ORIENTATION, callback: Callback<OrientationResponse>, options?: Options): void;
    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @permission ohos.permission.ACTIVITY_MOTION
     * @param { SensorType.SENSOR_TYPE_ID_PEDOMETER } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_PEDOMETER}.
     * @param { Callback<PedometerResponse> } callback - callback pedometer data.
     * @param { Options } options - options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#PEDOMETER
     */
    function on(type: SensorType.SENSOR_TYPE_ID_PEDOMETER, callback: Callback<PedometerResponse>, options?: Options): void;
    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @permission ohos.permission.ACTIVITY_MOTION
     * @param { SensorType.SENSOR_TYPE_ID_PEDOMETER_DETECTION } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_PEDOMETER_DETECTION}.
     * @param { Callback<PedometerDetectionResponse> } callback - callback pedometer detection data.
     * @param { Options } options - options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#PEDOMETER_DETECTION
     */
    function on(type: SensorType.SENSOR_TYPE_ID_PEDOMETER_DETECTION, callback: Callback<PedometerDetectionResponse>, options?: Options): void;
    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @param { SensorType.SENSOR_TYPE_ID_PROXIMITY } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_PROXIMITY}.
     * @param { Callback<ProximityResponse> } callback - callback proximity data.
     * @param { Options } options - options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#PROXIMITY
     */
    function on(type: SensorType.SENSOR_TYPE_ID_PROXIMITY, callback: Callback<ProximityResponse>, options?: Options): void;
    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @param { SensorType.SENSOR_TYPE_ID_ROTATION_VECTOR } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_ROTATION_VECTOR}.
     * @param { Callback<RotationVectorResponse> } callback - callback rotation vector data.
     * @param { Options } options - options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#ROTATION_VECTOR
     */
    function on(type: SensorType.SENSOR_TYPE_ID_ROTATION_VECTOR, callback: Callback<RotationVectorResponse>, options?: Options): void;
    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @param { SensorType.SENSOR_TYPE_ID_SIGNIFICANT_MOTION } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_SIGNIFICANT_MOTION}.
     * @param { Callback<SignificantMotionResponse> } callback - callback significant motion data.
     * @param { Options } options - options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#SIGNIFICANT_MOTION
     */
    function on(type: SensorType.SENSOR_TYPE_ID_SIGNIFICANT_MOTION, callback: Callback<SignificantMotionResponse>, options?: Options): void;
    /**
     * Subscribe to sensor data, If the API is called multiple times, the last call takes effect.
     * @param { SensorType.SENSOR_TYPE_ID_WEAR_DETECTION } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_WEAR_DETECTION}.
     * @param { Callback<WearDetectionResponse> } callback - callback wear detection data.
     * @param { Options } options - options Optional parameters specifying the interval at which sensor data is reported, {@code Options}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#WEAR_DETECTION
     */
    function on(type: SensorType.SENSOR_TYPE_ID_WEAR_DETECTION, callback: Callback<WearDetectionResponse>, options?: Options): void;
    /**
     * Subscribe to sensor data once.
     * @permission ohos.permission.ACCELEROMETER
     * @param { SensorType.SENSOR_TYPE_ID_ACCELEROMETER } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_ACCELEROMETER}.
     * @param { Callback<AccelerometerResponse> } callback - callback accelerometer data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#ACCELEROMETER
     */
    function once(type: SensorType.SENSOR_TYPE_ID_ACCELEROMETER, callback: Callback<AccelerometerResponse>): void;
    /**
     * Subscribe to sensor data once.
     * @permission ohos.permission.ACCELEROMETER
     * @param { SensorType.SENSOR_TYPE_ID_ACCELEROMETER_UNCALIBRATED } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_ACCELEROMETER_UNCALIBRATED}.
     * @param { Callback<AccelerometerUncalibratedResponse> } callback - callback accelerometer uncalibrated data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#ACCELEROMETER_UNCALIBRATED
     */
    function once(type: SensorType.SENSOR_TYPE_ID_ACCELEROMETER_UNCALIBRATED, callback: Callback<AccelerometerUncalibratedResponse>): void;
    /**
     * Subscribe to sensor data once.
     * @param { SensorType.SENSOR_TYPE_ID_AMBIENT_LIGHT } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_AMBIENT_LIGHT}.
     * @param { Callback<LightResponse> } callback - callback light data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#AMBIENT_LIGHT
     */
    function once(type: SensorType.SENSOR_TYPE_ID_AMBIENT_LIGHT, callback: Callback<LightResponse>): void;
    /**
     * Subscribe to sensor data once.
     * @param { SensorType.SENSOR_TYPE_ID_AMBIENT_TEMPERATURE } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_AMBIENT_TEMPERATURE}.
     * @param { Callback<AmbientTemperatureResponse> } callback - callback ambient temperature data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#AMBIENT_TEMPERATURE
     */
    function once(type: SensorType.SENSOR_TYPE_ID_AMBIENT_TEMPERATURE, callback: Callback<AmbientTemperatureResponse>): void;
    /**
     * Subscribe to sensor data once.
     * @param { SensorType.SENSOR_TYPE_ID_BAROMETER } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_BAROMETER}.
     * @param { Callback<BarometerResponse> } callback - callback barometer data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#BAROMETER
     */
    function once(type: SensorType.SENSOR_TYPE_ID_BAROMETER, callback: Callback<BarometerResponse>): void;
    /**
     * Subscribe to sensor data once.
     * @param { SensorType.SENSOR_TYPE_ID_GRAVITY } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_GRAVITY}.
     * @param { Callback<GravityResponse> } callback - callback gravity data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#GRAVITY
     */
    function once(type: SensorType.SENSOR_TYPE_ID_GRAVITY, callback: Callback<GravityResponse>): void;
    /**
     * Subscribe to sensor data once.
     * @permission ohos.permission.GYROSCOPE
     * @param { SensorType.SENSOR_TYPE_ID_GYROSCOPE } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_GYROSCOPE}.
     * @param { Callback<GyroscopeResponse> } callback - callback gyroscope data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#GYROSCOPE
     */
    function once(type: SensorType.SENSOR_TYPE_ID_GYROSCOPE, callback: Callback<GyroscopeResponse>): void;
    /**
     * Subscribe to sensor data once.
     * @permission ohos.permission.GYROSCOPE
     * @param { SensorType.SENSOR_TYPE_ID_GYROSCOPE_UNCALIBRATED } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_GYROSCOPE_UNCALIBRATED}.
     * @param { Callback<GyroscopeUncalibratedResponse> } callback - callback gyroscope uncalibrated data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#GYROSCOPE_UNCALIBRATED
     */
    function once(type: SensorType.SENSOR_TYPE_ID_GYROSCOPE_UNCALIBRATED, callback: Callback<GyroscopeUncalibratedResponse>): void;
    /**
     * Subscribe to sensor data once.
     * @param { SensorType.SENSOR_TYPE_ID_HALL } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_HALL}.
     * @param { Callback<HallResponse> } callback - callback hall data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#HALL
     */
    function once(type: SensorType.SENSOR_TYPE_ID_HALL, callback: Callback<HallResponse>): void;
    /**
     * Subscribe to sensor data once.
     * @permission ohos.permission.HEART_RATE
     * @param { SensorType.SENSOR_TYPE_ID_HEART_RATE } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_HEART_RATE}.
     * @param { Callback<HeartRateResponse> } callback - callback heart rate data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#HEART_RATE
     */
    function once(type: SensorType.SENSOR_TYPE_ID_HEART_RATE, callback: Callback<HeartRateResponse>): void;
    /**
     * Subscribe to sensor data once.
     * @param { SensorType.SENSOR_TYPE_ID_HUMIDITY } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_HUMIDITY}.
     * @param { Callback<HumidityResponse> } callback - callback humidity data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#HUMIDITY
     */
    function once(type: SensorType.SENSOR_TYPE_ID_HUMIDITY, callback: Callback<HumidityResponse>): void;
    /**
     * Subscribe to sensor data once.
     * @permission ohos.permission.ACCELERATION
     * @param { SensorType.SENSOR_TYPE_ID_LINEAR_ACCELERATION } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_LINEAR_ACCELERATION}.
     * @param { Callback<LinearAccelerometerResponse> } callback - callback linear accelerometer data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#LINEAR_ACCELEROMETER
     */
    function once(type: SensorType.SENSOR_TYPE_ID_LINEAR_ACCELERATION, callback: Callback<LinearAccelerometerResponse>): void;
    /**
     * Subscribe to sensor data once.
     * @param { SensorType.SENSOR_TYPE_ID_MAGNETIC_FIELD } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_MAGNETIC_FIELD}.
     * @param { Callback<MagneticFieldResponse> } callback - callback magnetic field data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#MAGNETIC_FIELD
     */
    function once(type: SensorType.SENSOR_TYPE_ID_MAGNETIC_FIELD, callback: Callback<MagneticFieldResponse>): void;
    /**
     * Subscribe to sensor data once.
     * @param { SensorType.SENSOR_TYPE_ID_MAGNETIC_FIELD_UNCALIBRATED } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_MAGNETIC_FIELD_UNCALIBRATED}.
     * @param { Callback<MagneticFieldUncalibratedResponse> } callback - callback magnetic field uncalibrated data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#MAGNETIC_FIELD_UNCALIBRATED
     */
    function once(type: SensorType.SENSOR_TYPE_ID_MAGNETIC_FIELD_UNCALIBRATED, callback: Callback<MagneticFieldUncalibratedResponse>): void;
    /**
     * Subscribe to sensor data once.
     * @param { SensorType.SENSOR_TYPE_ID_ORIENTATION } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_ORIENTATION}.
     * @param { Callback<OrientationResponse> } callback - callback orientation data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#ORIENTATION
     */
    function once(type: SensorType.SENSOR_TYPE_ID_ORIENTATION, callback: Callback<OrientationResponse>): void;
    /**
     * Subscribe to sensor data once.
     * @permission ohos.permission.ACTIVITY_MOTION
     * @param { SensorType.SENSOR_TYPE_ID_PEDOMETER } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_PEDOMETER}.
     * @param { Callback<PedometerResponse> } callback - callback pedometer data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#PEDOMETER
     */
    function once(type: SensorType.SENSOR_TYPE_ID_PEDOMETER, callback: Callback<PedometerResponse>): void;
    /**
     * Subscribe to sensor data once.
     * @permission ohos.permission.ACTIVITY_MOTION
     * @param { SensorType.SENSOR_TYPE_ID_PEDOMETER_DETECTION } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_PEDOMETER_DETECTION}.
     * @param { Callback<PedometerDetectionResponse> } callback - callback pedometer detection data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#PEDOMETER_DETECTION
     */
    function once(type: SensorType.SENSOR_TYPE_ID_PEDOMETER_DETECTION, callback: Callback<PedometerDetectionResponse>): void;
    /**
     * Subscribe to sensor data once.
     * @param { SensorType.SENSOR_TYPE_ID_PROXIMITY } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_PROXIMITY}.
     * @param { Callback<ProximityResponse> } callback - callback proximity data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#PROXIMITY
     */
    function once(type: SensorType.SENSOR_TYPE_ID_PROXIMITY, callback: Callback<ProximityResponse>): void;
    /**
     * Subscribe to sensor data once.
     * @param { SensorType.SENSOR_TYPE_ID_ROTATION_VECTOR } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_ROTATION_VECTOR}.
     * @param { Callback<RotationVectorResponse> } callback - callback rotation vector data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#ROTATION_VECTOR
     */
    function once(type: SensorType.SENSOR_TYPE_ID_ROTATION_VECTOR, callback: Callback<RotationVectorResponse>): void;
    /**
     * Subscribe to sensor data once.
     * @param { SensorType.SENSOR_TYPE_ID_SIGNIFICANT_MOTION } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_SIGNIFICANT_MOTION}.
     * @param { Callback<SignificantMotionResponse> } callback - callback significant motion data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#SIGNIFICANT_MOTION
     */
    function once(type: SensorType.SENSOR_TYPE_ID_SIGNIFICANT_MOTION, callback: Callback<SignificantMotionResponse>): void;
    /**
     * Subscribe to sensor data once.
     * @param { SensorType.SENSOR_TYPE_ID_WEAR_DETECTION } type - type Indicate the sensor type to listen for,
     *        {@code SensorType.SENSOR_TYPE_ID_WEAR_DETECTION}.
     * @param { Callback<WearDetectionResponse> } callback - callback wear detection data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#WEAR_DETECTION
     */
    function once(type: SensorType.SENSOR_TYPE_ID_WEAR_DETECTION, callback: Callback<WearDetectionResponse>): void;
    /**
     * Unsubscribe to sensor data.
     * @permission ohos.permission.ACCELEROMETER
     * @param { SensorType.SENSOR_TYPE_ID_ACCELEROMETER } type - type Indicate the sensor type to unsubscribe,
     *        {@code SensorType.SENSOR_TYPE_ID_ACCELEROMETER}.
     * @param { Callback<AccelerometerResponse> } callback - callback accelerometer data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#ACCELEROMETER
     */
    function off(type: SensorType.SENSOR_TYPE_ID_ACCELEROMETER, callback?: Callback<AccelerometerResponse>): void;
    /**
     * Unsubscribe to sensor data.
     * @permission ohos.permission.ACCELEROMETER
     * @param { SensorType.SENSOR_TYPE_ID_ACCELEROMETER_UNCALIBRATED } type - type Indicate the sensor type to unsubscribe,
     *        {@code SensorType.SENSOR_TYPE_ID_ACCELEROMETER_UNCALIBRATED}.
     * @param { Callback<AccelerometerUncalibratedResponse> } callback - callback accelerometer uncalibrated data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#ACCELEROMETER_UNCALIBRATED
     */
    function off(type: SensorType.SENSOR_TYPE_ID_ACCELEROMETER_UNCALIBRATED, callback?: Callback<AccelerometerUncalibratedResponse>): void;
    /**
     * Unsubscribe to sensor data.
     * @param { SensorType.SENSOR_TYPE_ID_AMBIENT_LIGHT } type - type Indicate the sensor type to unsubscribe,
     *        {@code SensorType.SENSOR_TYPE_ID_AMBIENT_LIGHT}.
     * @param { Callback<LightResponse> } callback - callback light data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#AMBIENT_LIGHT
     */
    function off(type: SensorType.SENSOR_TYPE_ID_AMBIENT_LIGHT, callback?: Callback<LightResponse>): void;
    /**
     * Unsubscribe to sensor data.
     * @param { SensorType.SENSOR_TYPE_ID_AMBIENT_TEMPERATURE } type - type Indicate the sensor type to unsubscribe,
     *        {@code SensorType.SENSOR_TYPE_ID_AMBIENT_TEMPERATURE}.
     * @param { Callback<AmbientTemperatureResponse> } callback - callback ambient temperature data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#AMBIENT_TEMPERATURE
     */
    function off(type: SensorType.SENSOR_TYPE_ID_AMBIENT_TEMPERATURE, callback?: Callback<AmbientTemperatureResponse>): void;
    /**
     * Unsubscribe to sensor data.
     * @param { SensorType.SENSOR_TYPE_ID_BAROMETER } type - type Indicate the sensor type to unsubscribe,
     *        {@code SensorType.SENSOR_TYPE_ID_BAROMETER}.
     * @param { Callback<BarometerResponse> } callback - callback barometer response data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#BAROMETER
     */
    function off(type: SensorType.SENSOR_TYPE_ID_BAROMETER, callback?: Callback<BarometerResponse>): void;
    /**
     * Unsubscribe to sensor data.
     * @param { SensorType.SENSOR_TYPE_ID_GRAVITY } type - type Indicate the sensor type to unsubscribe,
     *        {@code SensorType.SENSOR_TYPE_ID_GRAVITY}.
     * @param { Callback<GravityResponse> } callback - callback gravity data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#GRAVITY
     */
    function off(type: SensorType.SENSOR_TYPE_ID_GRAVITY, callback?: Callback<GravityResponse>): void;
    /**
     * Unsubscribe to sensor data.
     * @permission ohos.permission.GYROSCOPE
     * @param { SensorType.SENSOR_TYPE_ID_GYROSCOPE } type - type Indicate the sensor type to unsubscribe,
     *        {@code SensorType.SENSOR_TYPE_ID_GYROSCOPE}.
     * @param { Callback<GyroscopeResponse> } callback - callback gyroscope data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#GYROSCOPE
     */
    function off(type: SensorType.SENSOR_TYPE_ID_GYROSCOPE, callback?: Callback<GyroscopeResponse>): void;
    /**
     * Unsubscribe to sensor data.
     * @permission ohos.permission.GYROSCOPE
     * @param { SensorType.SENSOR_TYPE_ID_GYROSCOPE_UNCALIBRATED } type - type Indicate the sensor type to unsubscribe,
     *        {@code SensorType.SENSOR_TYPE_ID_GYROSCOPE_UNCALIBRATED}.
     * @param { Callback<GyroscopeUncalibratedResponse> } callback - callback gyroscope uncalibrated data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#GYROSCOPE_UNCALIBRATED
     */
    function off(type: SensorType.SENSOR_TYPE_ID_GYROSCOPE_UNCALIBRATED, callback?: Callback<GyroscopeUncalibratedResponse>): void;
    /**
     * Unsubscribe to sensor data.
     * @param { SensorType.SENSOR_TYPE_ID_HALL } type - type Indicate the sensor type to unsubscribe,
     *        {@code SensorType.SENSOR_TYPE_ID_HALL}.
     * @param { Callback<HallResponse> } callback - callback hall data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#HALL
     */
    function off(type: SensorType.SENSOR_TYPE_ID_HALL, callback?: Callback<HallResponse>): void;
    /**
     * Unsubscribe to sensor data.
     * @permission ohos.permission.HEALTH_DATA
     * @param { SensorType.SENSOR_TYPE_ID_HEART_RATE } type - type Indicate the sensor type to unsubscribe,
     *        {@code SensorType.SENSOR_TYPE_ID_HEART_RATE}.
     * @param { Callback<HeartRateResponse> } callback - callback heart rate data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#HEART_RATE
     */
    function off(type: SensorType.SENSOR_TYPE_ID_HEART_RATE, callback?: Callback<HeartRateResponse>): void;
    /**
     * Unsubscribe to sensor data.
     * @param { SensorType.SENSOR_TYPE_ID_HUMIDITY } type - type Indicate the sensor type to unsubscribe,
     *        {@code SensorType.SENSOR_TYPE_ID_HUMIDITY}.
     * @param { Callback<HumidityResponse> } callback - callback humidity data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#HUMIDITY
     */
    function off(type: SensorType.SENSOR_TYPE_ID_HUMIDITY, callback?: Callback<HumidityResponse>): void;
    /**
     * Unsubscribe to sensor data.
     * @permission ohos.permission.ACCELEROMETER
     * @param { SensorType.SENSOR_TYPE_ID_LINEAR_ACCELERATION } type - type Indicate the sensor type to unsubscribe,
     *        {@code SensorType.SENSOR_TYPE_ID_LINEAR_ACCELERATION}.
     * @param { Callback<LinearAccelerometerResponse> } callback - callback linear accelerometer data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#LINEAR_ACCELEROMETER
     */
    function off(type: SensorType.SENSOR_TYPE_ID_LINEAR_ACCELERATION, callback?: Callback<LinearAccelerometerResponse>): void;
    /**
     * Unsubscribe to sensor data.
     * @param { SensorType.SENSOR_TYPE_ID_MAGNETIC_FIELD } type - type Indicate the sensor type to unsubscribe,
     *        {@code SensorType.SENSOR_TYPE_ID_MAGNETIC_FIELD}.
     * @param { Callback<MagneticFieldResponse> } callback - callback magnetic field data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#MAGNETIC_FIELD
     */
    function off(type: SensorType.SENSOR_TYPE_ID_MAGNETIC_FIELD, callback?: Callback<MagneticFieldResponse>): void;
    /**
     * Unsubscribe to sensor data.
     * @param { SensorType.SENSOR_TYPE_ID_MAGNETIC_FIELD_UNCALIBRATED } type - type Indicate the sensor type to unsubscribe,
     *        {@code SensorType.SENSOR_TYPE_ID_MAGNETIC_FIELD_UNCALIBRATED}.
     * @param { Callback<MagneticFieldUncalibratedResponse> } callback - callback magnetic field uncalibrated data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#MAGNETIC_FIELD_UNCALIBRATED
     */
    function off(type: SensorType.SENSOR_TYPE_ID_MAGNETIC_FIELD_UNCALIBRATED, callback?: Callback<MagneticFieldUncalibratedResponse>): void;
    /**
     * Unsubscribe to sensor data.
     * @param { SensorType.SENSOR_TYPE_ID_ORIENTATION } type - type Indicate the sensor type to unsubscribe,
     *        {@code SensorType.SENSOR_TYPE_ID_ORIENTATION}.
     * @param { Callback<OrientationResponse> } callback - callback orientation data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#ORIENTATION
     */
    function off(type: SensorType.SENSOR_TYPE_ID_ORIENTATION, callback?: Callback<OrientationResponse>): void;
    /**
     * Unsubscribe to sensor data.
     * @permission ohos.permission.ACTIVITY_MOTION
     * @param { SensorType.SENSOR_TYPE_ID_PEDOMETER } type - type Indicate the sensor type to unsubscribe, {@code SensorType.SENSOR_TYPE_ID_PEDOMETER}.
     * @param { Callback<PedometerResponse> } callback - callback pedometer data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#PEDOMETER
     */
    function off(type: SensorType.SENSOR_TYPE_ID_PEDOMETER, callback?: Callback<PedometerResponse>): void;
    /**
     * Unsubscribe to sensor data.
     * @permission ohos.permission.ACTIVITY_MOTION
     * @param { SensorType.SENSOR_TYPE_ID_PEDOMETER_DETECTION } type - type Indicate the sensor type to unsubscribe,
     *        {@code SensorType.SENSOR_TYPE_ID_PEDOMETER_DETECTION}.
     * @param { Callback<PedometerDetectionResponse> } callback - callback pedometer detection data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#PEDOMETER_DETECTION
     */
    function off(type: SensorType.SENSOR_TYPE_ID_PEDOMETER_DETECTION, callback?: Callback<PedometerDetectionResponse>): void;
    /**
     * Unsubscribe to sensor data.
     * @param { SensorType.SENSOR_TYPE_ID_PROXIMITY } type - type Indicate the sensor type to unsubscribe,
     *        {@code SensorType.SENSOR_TYPE_ID_PROXIMITY}.
     * @param { Callback<ProximityResponse> } callback - callback proximity data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#PROXIMITY
     */
    function off(type: SensorType.SENSOR_TYPE_ID_PROXIMITY, callback?: Callback<ProximityResponse>): void;
    /**
     * Unsubscribe to sensor data.
     * @param { SensorType.SENSOR_TYPE_ID_ROTATION_VECTOR } type - type Indicate the sensor type to unsubscribe,
     *        {@code SensorType.SENSOR_TYPE_ID_ROTATION_VECTOR}.
     * @param { Callback<RotationVectorResponse> } callback - callback rotation vector data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#ROTATION_VECTOR
     */
    function off(type: SensorType.SENSOR_TYPE_ID_ROTATION_VECTOR, callback?: Callback<RotationVectorResponse>): void;
    /**
     * Unsubscribe to sensor data.
     * @param { SensorType.SENSOR_TYPE_ID_SIGNIFICANT_MOTION } type - type Indicate the sensor type to unsubscribe,
     *        {@code SensorType.SENSOR_TYPE_ID_SIGNIFICANT_MOTION}.
     * @param { Callback<SignificantMotionResponse> } callback - callback significant motion data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#SIGNIFICANT_MOTION
     */
    function off(type: SensorType.SENSOR_TYPE_ID_SIGNIFICANT_MOTION, callback?: Callback<SignificantMotionResponse>): void;
    /**
     * Unsubscribe to sensor data.
     * @param { SensorType.SENSOR_TYPE_ID_WEAR_DETECTION } type - type Indicate the sensor type to unsubscribe,
     *        {@code SensorType.SENSOR_TYPE_ID_WEAR_DETECTION}.
     * @param { Callback<WearDetectionResponse> } callback - callback wear detection data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId#WEAR_DETECTION
     */
    function off(type: SensorType.SENSOR_TYPE_ID_WEAR_DETECTION, callback?: Callback<WearDetectionResponse>): void;
    /**
     * Indicates sensor information.
     * @typedef Sensor
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    interface Sensor {
        /**
         * Sensor name.
         * @type { string }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 9
         */
        sensorName: string;
        /**
         * Sensor vendor.
         * @type { string }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 9
         */
        vendorName: string;
        /**
         * Sensor firmware version.
         * @type { string }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 9
         */
        firmwareVersion: string;
        /**
         * Sensor hardware version.
         * @type { string }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 9
         */
        hardwareVersion: string;
        /**
         * Sensor type ID, {@code SensorType}.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 9
         */
        sensorId: number;
        /**
         * Maximum measurement range of the sensor.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 9
         */
        maxRange: number;
        /**
         * Minimum sample period allowed, in ns.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 9
         */
        minSamplePeriod: number;
        /**
         * Maximum sample period allowed, in ns.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 9
         */
        maxSamplePeriod: number;
        /**
         * Sensor accuracy.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 9
         */
        precision: number;
        /**
         * Sensor power.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 9
         */
        power: number;
    }
    /**
     * Obtains the sensor information of a specified type.
     * @param { SensorId } type - Indicate the sensor type, {@code SensorId}.
     * @param { AsyncCallback<Sensor> } callback - callback sensor info.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    /**
     * Obtains the sensor information of a specified type.
     * @param { SensorId } type - Indicate the sensor type, {@code SensorId}.
     * @param { AsyncCallback<Sensor> } callback - callback sensor info.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @throws { BusinessError } 14500102 - The sensor is not supported by the device.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 12
     */
    function getSingleSensor(type: SensorId, callback: AsyncCallback<Sensor>): void;
    /**
     * Obtains the sensor information of a specified type.
     * @param { SensorId } type - Indicate the sensor type, {@code SensorId}.
     * @returns { Promise<Sensor> } Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    /**
     * Obtains the sensor information of a specified type.
     * @param { SensorId } type - Indicate the sensor type, {@code SensorId}.
     * @returns { Promise<Sensor> } Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @throws { BusinessError } 14500102 - The sensor is not supported by the device.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 12
     */
    function getSingleSensor(type: SensorId): Promise<Sensor>;
    /**
     * Synchronously obtains the sensor information of a specified type.
     * @param { SensorId } type - Indicate the sensor type, {@code SensorId}.
     * @returns { Sensor } Returns sensor information.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @throws { BusinessError } 14500102 - The sensor is not supported by the device.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 12
     */
    function getSingleSensorSync(type: SensorId): Sensor;
    /**
     * Obtains all sensor information on the device.
     * @param { AsyncCallback<Array<Sensor>> } callback - callback sensor list.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getSensorList(callback: AsyncCallback<Array<Sensor>>): void;
    /**
     * Obtains all sensor information on the device.
     * @returns { Promise<Array<Sensor>> } Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getSensorList(): Promise<Array<Sensor>>;
    /**
     * Synchronously obtains all sensor information on the device.
     * @returns { Array<Sensor> } Return a list of sensor information.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 12
     */
    function getSensorListSync(): Array<Sensor>;
    /**
     * Indicates geomagnetic field data.
     * @typedef GeomagneticResponse
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface GeomagneticResponse {
        /**
         * Geomagnetic x-axis component.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        x: number;
        /**
         * Geomagnetic y-axis component.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        y: number;
        /**
         * Geomagnetic z-axis component.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        z: number;
        /**
         * The Angle between the earth's magnetic field lines and the horizontal plane.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        geomagneticDip: number;
        /**
         * The Angle of magnetic north and true north on a horizontal plane.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        deflectionAngle: number;
        /**
         * The horizontal strength of the geomagnetic field.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        levelIntensity: number;
        /**
         * The total strength of the geomagnetic field.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        totalIntensity: number;
    }
    /**
     * Indicates geographic location.
     * @typedef LocationOptions
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface LocationOptions {
        /**
         * Specifies the latitude of the point.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        latitude: number;
        /**
         * Specifies the longitude of the point.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        longitude: number;
        /**
         * Specifies the altitude of the point.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        altitude: number;
    }
    /**
     * Implements the calculation of the geomagnetic field at a specific location on Earth.
     * @param { LocationOptions } locationOptions - Indicates geographic location, {@code LocationOptions}.
     * @param { number } timeMillis - Indicates the time at which the magnetic declination is to be obtained,
     * in milliseconds since the Unix epoch.
     * @param { AsyncCallback<GeomagneticResponse> } callback - callback geomagnetic field.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#getGeomagneticInfo
     */
    function getGeomagneticField(locationOptions: LocationOptions, timeMillis: number, callback: AsyncCallback<GeomagneticResponse>): void;
    /**
     * Implements the calculation of the geomagnetic field at a specific location on Earth.
     * @param { LocationOptions } locationOptions - LocationOptions Indicates geographic location, {@code LocationOptions}.
     * @param { number } timeMillis - timeMillis Indicates the time at which the magnetic declination is to be obtained,
     * in milliseconds since the Unix epoch.
     * @returns { Promise<GeomagneticResponse> } Returns the geomagnetic field data, {@code GeomagneticResponse}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#getGeomagneticInfo
     */
    function getGeomagneticField(locationOptions: LocationOptions, timeMillis: number): Promise<GeomagneticResponse>;
    /**
     * Obtains the geomagnetic field at a specific location on the Earth.
     * @param { LocationOptions } locationOptions - LocationOptions Indicates geographic location, {@code LocationOptions}.
     * @param { number } timeMillis - timeMillis Indicates the time at which the magnetic declination is to be obtained,
     * in milliseconds since the Unix epoch.
     * @param { AsyncCallback<GeomagneticResponse> } callback - callback geomagnetic field.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getGeomagneticInfo(locationOptions: LocationOptions, timeMillis: number, callback: AsyncCallback<GeomagneticResponse>): void;
    /**
     * Obtains the geomagnetic field at a specific location on the Earth.
     * @param { LocationOptions } locationOptions - LocationOptions Indicates geographic location, {@code LocationOptions}.
     * @param { number } timeMillis - timeMillis Indicates the time at which the magnetic declination is to be obtained,
     * in milliseconds since the Unix epoch.
     * @returns { Promise<GeomagneticResponse> } Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getGeomagneticInfo(locationOptions: LocationOptions, timeMillis: number): Promise<GeomagneticResponse>;
    /**
     * Obtains the altitude at which the device is located based on the current atmospheric pressure.
     * @param { number } seaPressure - Indicates the sea level pressure, in hPa.
     * @param { number } currentPressure - Indicates the atmospheric pressure measured by the barometer, in hPa.
     * @param { AsyncCallback<number> } callback - callback device altitude.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#getDeviceAltitude
     */
    function getAltitude(seaPressure: number, currentPressure: number, callback: AsyncCallback<number>): void;
    /**
     * Obtains the altitude at which the device is located based on the current atmospheric pressure.
     * @param { number } seaPressure - seaPressure Indicates the sea level pressure, in hPa.
     * @param { number } currentPressure - currentPressure Indicates the atmospheric pressure measured by the barometer, in hPa.
     * @returns { Promise<number> } Returns the altitude in meters at which the device is located.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#getDeviceAltitude
     */
    function getAltitude(seaPressure: number, currentPressure: number): Promise<number>;
    /**
     * Obtains the altitude at which the device is located based on the current atmospheric pressure.
     * @param { number } seaPressure - seaPressure Indicates the sea level pressure, in hPa.
     * @param { number } currentPressure - currentPressure Indicates the atmospheric pressure measured by the barometer, in hPa.
     * @param { AsyncCallback<number> } callback - callback device altitude.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getDeviceAltitude(seaPressure: number, currentPressure: number, callback: AsyncCallback<number>): void;
    /**
     * Obtains the altitude at which the device is located based on the current atmospheric pressure.
     * @param { number } seaPressure - seaPressure Indicates the sea level pressure, in hPa.
     * @param { number } currentPressure - currentPressure Indicates the atmospheric pressure measured by the barometer, in hPa.
     * @returns { Promise<number> } Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getDeviceAltitude(seaPressure: number, currentPressure: number): Promise<number>;
    /**
     * Computes the geomagnetic inclination angle in radians from the inclination matrix.
     * @param { Array<number> } inclinationMatrix - Indicates the inclination matrix.
     * @param { AsyncCallback<number> } callback - callback geomagnetic inclination data.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#getInclination
     */
    function getGeomagneticDip(inclinationMatrix: Array<number>, callback: AsyncCallback<number>): void;
    /**
     * Computes the geomagnetic inclination angle in radians from the inclination matrix.
     * @param { Array<number> } inclinationMatrix - Indicates the inclination matrix.
     * @returns { Promise<number> } Returns the geomagnetic inclination angle in radians.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#getInclination
     */
    function getGeomagneticDip(inclinationMatrix: Array<number>): Promise<number>;
    /**
     * Computes the geomagnetic inclination in radians from the inclination matrix.
     * @param { Array<number> } inclinationMatrix - Indicates the inclination matrix.
     * @param { AsyncCallback<number> } callback - callback inclination in radians.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getInclination(inclinationMatrix: Array<number>, callback: AsyncCallback<number>): void;
    /**
     * Computes the geomagnetic inclination in radians from the inclination matrix.
     * @param { Array<number> } inclinationMatrix - Indicates the inclination matrix.
     * @returns { Promise<number> } Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getInclination(inclinationMatrix: Array<number>): Promise<number>;
    /**
     * Get the angle change between two rotation matrices.
     * @param { Array<number> } currentRotationMatrix - Indicates the current rotation matrix.
     * @param { Array<number> } preRotationMatrix - Indicates the current rotation matrix.
     * @param { AsyncCallback<Array<number>> } callback - callback angle variation.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#getAngleVariation
     */
    function getAngleModify(currentRotationMatrix: Array<number>, preRotationMatrix: Array<number>, callback: AsyncCallback<Array<number>>): void;
    /**
     * Get the angle change between two rotation matrices.
     * @param { Array<number> } currentRotationMatrix - currentRotationMatrix Indicates the current rotation matrix.
     * @param { Array<number> } preRotationMatrix - preRotationMatrix Indicates the current rotation matrix.
     * @returns { Promise<Array<number>> } Returns the array of number(z, x and y) in which the angle variety.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#getAngleVariation
     */
    function getAngleModify(currentRotationMatrix: Array<number>, preRotationMatrix: Array<number>): Promise<Array<number>>;
    /**
     * Get the angle variation between two rotation matrices.
     * @param { Array<number> } currentRotationMatrix - currentRotationMatrix Indicates the current rotation matrix.
     * @param { Array<number> } preRotationMatrix - preRotationMatrix Indicates the current rotation matrix.
     * @param { AsyncCallback<Array<number>> } callback - callback angle variation.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getAngleVariation(currentRotationMatrix: Array<number>, preRotationMatrix: Array<number>, callback: AsyncCallback<Array<number>>): void;
    /**
     * Get the angle variation between two rotation matrices.
     * @param { Array<number> } currentRotationMatrix -  Indicates the current rotation matrix.
     * @param { Array<number> } preRotationMatrix - preRotationMatrix Indicates the current rotation matrix.
     * @returns { Promise<Array<number>> } Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getAngleVariation(currentRotationMatrix: Array<number>, preRotationMatrix: Array<number>): Promise<Array<number>>;
    /**
     * Convert rotation vector to rotation matrix.
     * @param { Array<number> } rotationVector - Indicates the rotation vector.
     * @param { AsyncCallback<Array<number>> } callback - callback rotation matrix.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#getRotationMatrix
     */
    function createRotationMatrix(rotationVector: Array<number>, callback: AsyncCallback<Array<number>>): void;
    /**
     * Convert rotation vector to rotation matrix.
     * @param { Array<number> } rotationVector - rotationVector Indicates the rotation vector.
     * @returns { Promise<Array<number>> } Returns the rotation matrix.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#getRotationMatrix
     */
    function createRotationMatrix(rotationVector: Array<number>): Promise<Array<number>>;
    /**
     * Convert rotation vector to rotation matrix.
     * @param { Array<number> } rotationVector - rotationVector Indicates the rotation vector.
     * @param { AsyncCallback<Array<number>> } callback - callback rotation matrix.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getRotationMatrix(rotationVector: Array<number>, callback: AsyncCallback<Array<number>>): void;
    /**
     * Convert rotation vector to rotation matrix.
     * @param { Array<number> } rotationVector - rotationVector Indicates the rotation vector.
     * @returns { Promise<Array<number>> } Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getRotationMatrix(rotationVector: Array<number>): Promise<Array<number>>;
    /**
     * Indicates the axis of the new coordinate system that coincides with the XY axis of the original coordinate system.
     * @typedef CoordinatesOptions
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface CoordinatesOptions {
        /** Indicates the axis of the new coordinate system that coincides with the X axis of the original coordinate system.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        x: number;
        /** Indicates the axis of the new coordinate system that coincides with the Y axis of the original coordinate system.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        y: number;
    }
    /**
     * Rotate the provided rotation matrix so that it can be represented in a different way Coordinate System.
     * @param { Array<number> } inRotationVector - Indicates the rotation matrix to be transformed.
     * @param { CoordinatesOptions } coordinates - Indicates coordinate system guidance, {@code CoordinatesOptions}.
     * @param { AsyncCallback<Array<number>> } callback - callback rotation matrix.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#transformRotationMatrix
     */
    function transformCoordinateSystem(inRotationVector: Array<number>, coordinates: CoordinatesOptions, callback: AsyncCallback<Array<number>>): void;
    /**
     * Rotate the provided rotation matrix so that it can be represented in a different way Coordinate System.
     * @param { Array<number> } inRotationVector - inRotationVector Indicates the rotation matrix to be transformed.
     * @param { CoordinatesOptions } coordinates - coordinates Indicates coordinate system guidance, {@code CoordinatesOptions}.
     * @returns { Promise<Array<number>> } Returns the transformed rotation matrix.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#transformRotationMatrix
     */
    function transformCoordinateSystem(inRotationVector: Array<number>, coordinates: CoordinatesOptions): Promise<Array<number>>;
    /**
     * Rotate the provided rotation matrix so that it can be represented in a different way coordinate System.
     * @param { Array<number> } inRotationVector - inRotationVector Indicates the rotation matrix to be transformed.
     * @param { CoordinatesOptions } coordinates - coordinates Indicates coordinate system guidance, {@code CoordinatesOptions}.
     * @param { AsyncCallback<Array<number>> } callback - callback rotation matrix.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function transformRotationMatrix(inRotationVector: Array<number>, coordinates: CoordinatesOptions, callback: AsyncCallback<Array<number>>): void;
    /**
     * Rotate the provided rotation matrix so that it can be represented in a different way coordinate System.
     * @param { Array<number> } inRotationVector - inRotationVector Indicates the rotation matrix to be transformed.
     * @param { CoordinatesOptions } coordinates - coordinates Indicates coordinate system guidance, {@code CoordinatesOptions}.
     * @returns { Promise<Array<number>> } Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function transformRotationMatrix(inRotationVector: Array<number>, coordinates: CoordinatesOptions): Promise<Array<number>>;
    /**
     * convert a rotation vector to a normalized quaternion.
     * @param { Array<number> } rotationVector - Indicates the rotation vector.
     * @param { AsyncCallback<Array<number>> } callback - callback a normalized quaternion.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#getQuaternion
     */
    function createQuaternion(rotationVector: Array<number>, callback: AsyncCallback<Array<number>>): void;
    /**
     * convert a rotation vector to a normalized quaternion.
     * @param { Array<number> } rotationVector - rotationVector Indicates the rotation vector.
     * @returns { Promise<Array<number>> } Returns the normalized quaternion.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#getQuaternion
     */
    function createQuaternion(rotationVector: Array<number>): Promise<Array<number>>;
    /**
     * convert a rotation vector to a normalized quaternion.
     * @param { Array<number> } rotationVector - rotationVector Indicates the rotation vector.
     * @param { AsyncCallback<Array<number>> } callback - callback a normalized quaternion.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getQuaternion(rotationVector: Array<number>, callback: AsyncCallback<Array<number>>): void;
    /**
     * convert a rotation vector to a normalized quaternion.
     * @param { Array<number> } rotationVector - rotationVector Indicates the rotation vector.
     * @returns { Promise<Array<number>> } Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getQuaternion(rotationVector: Array<number>): Promise<Array<number>>;
    /**
     * Computes the device's orientation based on the rotation matrix.
     * @param { Array<number> } rotationMatrix - Indicates the rotation matrix.
     * @param { AsyncCallback<Array<number>> } callback - callback the angle of rotation around the z, x, y axis.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#getOrientation
     */
    function getDirection(rotationMatrix: Array<number>, callback: AsyncCallback<Array<number>>): void;
    /**
     * Computes the device's orientation based on the rotation matrix.
     * @param { Array<number> } rotationMatrix - rotationMatrix Indicates the rotation matrix.
     * @returns { Promise<Array<number>> } Returns the array is the angle of rotation around the z, x, y axis.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#getOrientation
     */
    function getDirection(rotationMatrix: Array<number>): Promise<Array<number>>;
    /**
     * Computes the device's orientation based on the rotation matrix.
     * @param { Array<number> } rotationMatrix - rotationMatrix Indicates the rotation matrix.
     * @param { AsyncCallback<Array<number>> } callback - callback the angle of rotation around the z, x, y axis.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getOrientation(rotationMatrix: Array<number>, callback: AsyncCallback<Array<number>>): void;
    /**
     * Computes the device's orientation based on the rotation matrix.
     * @param { Array<number> } rotationMatrix - rotationMatrix Indicates the rotation matrix.
     * @returns { Promise<Array<number>> } Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getOrientation(rotationMatrix: Array<number>): Promise<Array<number>>;
    /**
     * Indicates the response of rotation matrix.
     * @typedef RotationMatrixResponse
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface RotationMatrixResponse {
        /**
         * rotation matrix.
         * @type { Array<number> }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        rotation: Array<number>;
        /**
         * inclination matrix.
         * @type { Array<number> }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        inclination: Array<number>;
    }
    /**
     * Calculate rotation matrix based on gravity vector and geomagnetic vector.
     * @param { Array<number> } gravity - Indicates the gravity vector.
     * @param { Array<number> } geomagnetic - Indicates the geomagnetic vector.
     * @param { AsyncCallback<RotationMatrixResponse> } callback - callback rotation matrix and inclination matrix.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#getRotationMatrix
     */
    function createRotationMatrix(gravity: Array<number>, geomagnetic: Array<number>, callback: AsyncCallback<RotationMatrixResponse>): void;
    /**
     * Calculate rotation matrix based on gravity vector and geomagnetic vector.
     * @param { Array<number> } gravity - gravity Indicates the gravity vector.
     * @param { Array<number> } geomagnetic - geomagnetic Indicates the geomagnetic vector.
     * @returns { Promise<RotationMatrixResponse> } Returns the rotation matrix, {@code RotationMatrixResponse}.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor#getRotationMatrix
     */
    function createRotationMatrix(gravity: Array<number>, geomagnetic: Array<number>): Promise<RotationMatrixResponse>;
    /**
     * Calculate rotation matrix based on gravity vector and geomagnetic vector.
     * @param { Array<number> } gravity - gravity Indicates the gravity vector.
     * @param { Array<number> } geomagnetic - geomagnetic Indicates the geomagnetic vector.
     * @param { AsyncCallback<RotationMatrixResponse> } callback - callback rotation matrix and inclination matrix.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getRotationMatrix(gravity: Array<number>, geomagnetic: Array<number>, callback: AsyncCallback<RotationMatrixResponse>): void;
    /**
     * Calculate rotation matrix based on gravity vector and geomagnetic vector.
     * @param { Array<number> } gravity - gravity Indicates the gravity vector.
     * @param { Array<number> } geomagnetic - geomagnetic Indicates the geomagnetic vector.
     * @returns { Promise<RotationMatrixResponse> } Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br> 2. Incorrect parameter types; 3. Parameter verification failed.
     * @throws { BusinessError } 14500101 - Service exception.
     * @syscap SystemCapability.Sensors.Sensor
     * @since 9
     */
    function getRotationMatrix(gravity: Array<number>, geomagnetic: Array<number>): Promise<RotationMatrixResponse>;
    /**
     * Subscribe to the sensor's optional parameters.
     * @typedef Options
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    /**
     * Subscribe to the sensor's optional parameters.
     * @typedef Options
     * @syscap SystemCapability.Sensors.Sensor
     * @atomicservice
     * @since 11
     */
    interface Options {
        /**
         * Sensor event reporting event interval.
         * @type { ?number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        /**
         * Sensor event reporting event interval.
         * @type { ?(number | SensorFrequency) }
         * @syscap SystemCapability.Sensors.Sensor
         * @atomicservice
         * @since 11
         */
        interval?: number | SensorFrequency;
    }
    /**
     * The sensor reporting frequency is divided into three modes.
     * @typedef {'game' | 'ui' | 'normal'}
     * @syscap SystemCapability.Sensors.Sensor
     * @atomicservice
     * @since 11
     */
    type SensorFrequency = 'game' | 'ui' | 'normal';
    /**
     * The type of number.
     * @enum { number }
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     * @deprecated since 9
     * @useinstead sensor.SensorId
     */
    enum SensorType {
        /**
         * Acceleration sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         * @deprecated since 9
         */
        SENSOR_TYPE_ID_ACCELEROMETER = 1,
        /**
         * Gyroscope sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         * @deprecated since 9
         */
        SENSOR_TYPE_ID_GYROSCOPE = 2,
        /**
         * Ambient light sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         * @deprecated since 9
         */
        SENSOR_TYPE_ID_AMBIENT_LIGHT = 5,
        /**
         * Magnetic field sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         * @deprecated since 9
         */
        SENSOR_TYPE_ID_MAGNETIC_FIELD = 6,
        /**
         * Barometric pressure sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         * @deprecated since 9
         */
        SENSOR_TYPE_ID_BAROMETER = 8,
        /**
         * Hall effect sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         * @deprecated since 9
         */
        SENSOR_TYPE_ID_HALL = 10,
        /**
         * Proximity sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         * @deprecated since 9
         */
        SENSOR_TYPE_ID_PROXIMITY = 12,
        /**
         * Humidity sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         * @deprecated since 9
         */
        SENSOR_TYPE_ID_HUMIDITY = 13,
        /**
         * Orientation sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         * @deprecated since 9
         */
        SENSOR_TYPE_ID_ORIENTATION = 256,
        /**
         * Gravity sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         * @deprecated since 9
         */
        SENSOR_TYPE_ID_GRAVITY = 257,
        /**
         * Linear acceleration sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         * @deprecated since 9
         */
        SENSOR_TYPE_ID_LINEAR_ACCELERATION = 258,
        /**
         * Rotation vector sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         * @deprecated since 9
         */
        SENSOR_TYPE_ID_ROTATION_VECTOR = 259,
        /**
         * Ambient temperature sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         * @deprecated since 9
         */
        SENSOR_TYPE_ID_AMBIENT_TEMPERATURE = 260,
        /**
         * Uncalibrated magnetic field sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         * @deprecated since 9
         */
        SENSOR_TYPE_ID_MAGNETIC_FIELD_UNCALIBRATED = 261,
        /**
         * Uncalibrated gyroscope sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         * @deprecated since 9
         */
        SENSOR_TYPE_ID_GYROSCOPE_UNCALIBRATED = 263,
        /**
         * Significant motion sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         * @deprecated since 9
         */
        SENSOR_TYPE_ID_SIGNIFICANT_MOTION = 264,
        /**
         * Pedometer detection sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         * @deprecated since 9
         */
        SENSOR_TYPE_ID_PEDOMETER_DETECTION = 265,
        /**
         * Pedometer sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         * @deprecated since 9
         */
        SENSOR_TYPE_ID_PEDOMETER = 266,
        /**
         * Heart rate sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         * @deprecated since 9
         */
        SENSOR_TYPE_ID_HEART_RATE = 278,
        /**
         * Wear detection sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         * @deprecated since 9
         */
        SENSOR_TYPE_ID_WEAR_DETECTION = 280,
        /**
         * Uncalibrated acceleration sensor.
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         * @deprecated since 9
         */
        SENSOR_TYPE_ID_ACCELEROMETER_UNCALIBRATED = 281
    }
    /**
     * Enumerates the accuracy levels of data reported by a sensor.
     * @enum { number }
     * @syscap SystemCapability.Sensors.Sensor
     * @atomicservice
     * @since 11
     */
    enum SensorAccuracy {
        /**
         * The sensor data is unreliable. It is possible that the sensor does not contact with the device to measure.
         * @syscap SystemCapability.Sensors.Sensor
         * @atomicservice
         * @since 11
         */
        ACCURACY_UNRELIABLE = 0,
        /**
         * The sensor data is at a low accuracy level. The data must be calibrated based on the environment before being used.
         * @syscap SystemCapability.Sensors.Sensor
         * @atomicservice
         * @since 11
         */
        ACCURACY_LOW = 1,
        /**
         * The sensor data is at a medium accuracy level. You are advised to calibrate the data based on the environment before using it.
         * @syscap SystemCapability.Sensors.Sensor
         * @atomicservice
         * @since 11
         */
        ACCURACY_MEDIUM = 2,
        /**
         * The sensor data is at a high accuracy level. The data can be used directly.
         * @syscap SystemCapability.Sensors.Sensor
         * @atomicservice
         * @since 11
         */
        ACCURACY_HIGH = 3
    }
    /**
     * The basic data structure of the sensor event.
     * @typedef Response
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    /**
     * The basic data structure of the sensor event.
     * @typedef Response
     * @syscap SystemCapability.Sensors.Sensor
     * @atomicservice
     * @since 11
     */
    interface Response {
        /**
         * The timestamp of the reported sensor data.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        /**
         * The timestamp of the reported sensor data.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @atomicservice
         * @since 11
         */
        timestamp: number;
        /**
         * The accuracy levels of data reported by a sensor.
         * @type { SensorAccuracy }
         * @syscap SystemCapability.Sensors.Sensor
         * @atomicservice
         * @since 11
         */
        accuracy: SensorAccuracy;
    }
    /**
     * Acceleration sensor event data.
     * @typedef AccelerometerResponse
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    /**
     * Acceleration sensor event data.
     * @typedef AccelerometerResponse
     * @syscap SystemCapability.Sensors.Sensor
     * @atomicservice
     * @since 11
     */
    interface AccelerometerResponse extends Response {
        /**
         * Acceleration x-axis component.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        /**
         * Acceleration x-axis component.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @atomicservice
         * @since 11
         */
        x: number;
        /**
         * Acceleration y-axis component.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        /**
         * Acceleration y-axis component.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @atomicservice
         * @since 11
         */
        y: number;
        /**
         * Acceleration z-axis component
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        /**
         * Acceleration z-axis component
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @atomicservice
         * @since 11
         */
        z: number;
    }
    /**
     * Linear acceleration sensor event data.
     * @typedef LinearAccelerometerResponse
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface LinearAccelerometerResponse extends Response {
        /**
         * Linear acceleration x-axis component.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        x: number;
        /**
         * Linear acceleration y-axis component.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        y: number;
        /**
         * Linear acceleration z-axis component.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        z: number;
    }
    /**
     * Acceleration uncalibrated sensor event data.
     * @typedef AccelerometerUncalibratedResponse
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface AccelerometerUncalibratedResponse extends Response {
        /**
         * Acceleration uncalibrated x-axis component.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        x: number;
        /**
         * Acceleration uncalibrated y-axis component.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        y: number;
        /**
         * Acceleration uncalibrated z-axis component.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        z: number;
        /**
         * Acceleration uncalibrated x-axis offset.
         *
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        biasX: number;
        /**
         * Acceleration uncalibrated y-axis offset.
         *
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        biasY: number;
        /**
         * Acceleration uncalibrated z-axis offset.
         *
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        biasZ: number;
    }
    /**
     * Gravity sensor event data.
     * @typedef GravityResponse
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface GravityResponse extends Response {
        /**
         * Gravity x-axis component.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        x: number;
        /**
         * Gravity y-axis component.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        y: number;
        /**
         * Gravity z-axis component.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        z: number;
    }
    /**
     * Orientation sensor event data.
     * @typedef OrientationResponse
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    /**
     * Orientation sensor event data.
     * @typedef OrientationResponse
     * @syscap SystemCapability.Sensors.Sensor
     * @atomicservice
     * @since 11
     */
    interface OrientationResponse extends Response {
        /**
         * The device rotates at an angle around the Z axis.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        /**
         * The device rotates at an angle around the Z axis.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @atomicservice
         * @since 11
         */
        alpha: number;
        /**
         * The device rotates at an angle around the X axis.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        /**
         * The device rotates at an angle around the X axis.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @atomicservice
         * @since 11
         */
        beta: number;
        /**
         * The device rotates at an angle around the Y axis.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        /**
         * The device rotates at an angle around the Y axis.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @atomicservice
         * @since 11
         */
        gamma: number;
    }
    /**
     * Rotation vector sensor event data.
     * @typedef RotationVectorResponse
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface RotationVectorResponse extends Response {
        /**
         * Rotation vector x-axis component.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        x: number;
        /**
         * Rotation vector y-axis component.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        y: number;
        /**
         * Rotation vector z-axis component.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        z: number;
        /**
         * Scalar quantity.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        w: number;
    }
    /**
     * Gyroscope sensor event data.
     * @typedef GyroscopeResponse
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    /**
     * Gyroscope sensor event data.
     * @typedef GyroscopeResponse
     * @syscap SystemCapability.Sensors.Sensor
     * @atomicservice
     * @since 11
     */
    interface GyroscopeResponse extends Response {
        /**
         * Gyroscope x-axis component.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        /**
         * Gyroscope x-axis component.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @atomicservice
         * @since 11
         */
        x: number;
        /**
         * Gyroscope y-axis component.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        /**
         * Gyroscope y-axis component.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @atomicservice
         * @since 11
         */
        y: number;
        /**
         * Gyroscope z-axis component.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        /**
         * Gyroscope z-axis component.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @atomicservice
         * @since 11
         */
        z: number;
    }
    /**
     * Gyroscope uncalibrated sensor event data.
     * @typedef GyroscopeUncalibratedResponse
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface GyroscopeUncalibratedResponse extends Response {
        /**
         * Gyroscope uncalibrated x-axis component.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        x: number;
        /**
         * Gyroscope uncalibrated y-axis component.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        y: number;
        /**
         * Gyroscope uncalibrated z-axis component.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        z: number;
        /**
         * Gyroscope uncalibrated x-axis offset.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        biasX: number;
        /**
         * Gyroscope uncalibrated y-axis offset.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        biasY: number;
        /**
         * Gyroscope uncalibrated z-axis offset.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        biasZ: number;
    }
    /**
     * Significant motion sensor event data.
     * @typedef SignificantMotionResponse
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface SignificantMotionResponse extends Response {
        /**
         * The degree of significant motion.
         * Whether the device has a significant motion.
         * The value 1 means that the device has a significant motion, and 0 means the opposite.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        scalar: number;
    }
    /**
     * Proximity sensor event data.
     * @typedef ProximityResponse
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface ProximityResponse extends Response {
        /**
         * Indicates the degree of proximity, event 0 indicates proximity, and greater than 0 indicates distance.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        distance: number;
    }
    /**
     * Light sensor event data.
     * @typedef LightResponse
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface LightResponse extends Response {
        /**
         * Indicates light intensity, in lux.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        intensity: number;
        /**
         * Indicates color temperature, in kelvin.
         * @type { ?number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 12
         */
        colorTemperature?: number;
        /**
         * Indicates infrared luminance, in cd/m2.
         * @type { ?number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 12
         */
        infraredLuminance?: number;
    }
    /**
     * Hall sensor event data.
     * @typedef HallResponse
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface HallResponse extends Response {
        /**
         * Indicates hall status, 0 indicates open, and greater than 0 indicates suction.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        status: number;
    }
    /**
     * Magnetic field sensor event data.
     * @typedef MagneticFieldResponse
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface MagneticFieldResponse extends Response {
        /**
         * Magnetic field x-axis component.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        x: number;
        /**
         * Magnetic field y-axis component.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        y: number;
        /**
         * Magnetic field z-axis component.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        z: number;
    }
    /**
     * Magnetic field uncalibrated sensor event data.
     * @typedef MagneticFieldUncalibratedResponse
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface MagneticFieldUncalibratedResponse extends Response {
        /**
         * Magnetic field uncalibrated x-axis component.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        x: number;
        /**
         * Magnetic field uncalibrated y-axis component.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        y: number;
        /**
         * Magnetic field uncalibrated z-axis component.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        z: number;
        /**
         * Magnetic field uncalibrated x-axis offset.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        biasX: number;
        /**
         * Magnetic field uncalibrated y-axis offset.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        biasY: number;
        /**
         * Magnetic field uncalibrated z-axis offset.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        biasZ: number;
    }
    /**
     * Pedometer sensor event data.
     * @typedef PedometerResponse
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface PedometerResponse extends Response {
        /**
         * Indicates the number of steps.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        steps: number;
    }
    /**
     * Humidity sensor event data.
     * @typedef HumidityResponse
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface HumidityResponse extends Response {
        /**
         * Indicates the number of humidity.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        humidity: number;
    }
    /**
     * Pedometer detection sensor event data.
     * @typedef PedometerDetectionResponse
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface PedometerDetectionResponse extends Response {
        /**
         * Indicates the pedometer detection status, 1 indicates that a walking action has occurred,
         * and 0 indicates that no movement has occurred.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        scalar: number;
    }
    /**
     * Ambient temperature sensor event data.
     * @typedef  AmbientTemperatureResponse
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface AmbientTemperatureResponse extends Response {
        /**
         * Indicates ambient temperature, in celsius.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        temperature: number;
    }
    /**
     * Barometer sensor event data.
     * @typedef BarometerResponse
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface BarometerResponse extends Response {
        /**
         * Indicates the number of barometer, in hpa.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        pressure: number;
    }
    /**
     * Heart rate sensor event data.
     * @typedef HeartRateResponse
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface HeartRateResponse extends Response {
        /**
         * Indicates the number of heart rate.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        heartRate: number;
    }
    /**
     * Wear detection sensor event data.
     * @typedef WearDetectionResponse
     * @syscap SystemCapability.Sensors.Sensor
     * @since 8
     */
    interface WearDetectionResponse extends Response {
        /**
         * Indicates the status of wear detection, 1 for wearing, 0 for wearing not.
         * @type { number }
         * @syscap SystemCapability.Sensors.Sensor
         * @since 8
         */
        value: number;
    }
}
export default sensor;
