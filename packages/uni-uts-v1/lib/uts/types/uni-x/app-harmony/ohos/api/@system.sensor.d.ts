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
/**
 * @interface AccelerometerResponse
 * @permission ohos.permission.ACCELEROMETER
 * @syscap SystemCapability.Sensors.Sensor.Lite
 * @since 3
 * @deprecated since 8
 * @useinstead ohos.sensor/sensor#AccelerometerResponse
 */
export interface AccelerometerResponse {
    /**
     * X-coordinate
     *
     * @permission ohos.permission.ACCELEROMETER
     * @type { number }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     */
    x: number;
    /**
      * Y-coordinate
      *
      * @permission ohos.permission.ACCELEROMETER
      * @type { number }
      * @syscap SystemCapability.Sensors.Sensor.Lite
      * @since 3
      * @deprecated since 8
      */
    y: number;
    /**
      * Z-coordinate
      *
      * @permission ohos.permission.ACCELEROMETER
      * @type { number }
      * @syscap SystemCapability.Sensors.Sensor.Lite
      * @since 3
      * @deprecated since 8
      */
    z: number;
}
/**
 * @interface subscribeAccelerometerOptions
 * @permission ohos.permission.ACCELEROMETER
 * @syscap SystemCapability.Sensors.Sensor.Lite
 * @since 3
 * @deprecated since 8
 * @useinstead ohos.sensor/sensor.SensorId#ACCELEROMETER
 */
export interface subscribeAccelerometerOptions {
    /**
     * Execution frequency of the callback function for listening to acceleration sensor data.
     * Available values are as follows:
     *   1. game: Extremely high frequency (20 ms per callback), which is applicable to gaming.
     *   2. ui: High frequency (60 ms per callback), which is applicable to UI updating.
     *   3. normal: Regular frequency (200 ms per callback), which is application to low power consumption.
     * The default value is normal.
     *
     * @permission ohos.permission.ACCELEROMETER
     * @type { string }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     */
    interval: string;
    /**
     * Called when acceleration sensor data changes.
     *
     * @permission ohos.permission.ACCELEROMETER
     * @type { function }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     */
    success: (data: AccelerometerResponse) => void;
    /**
     * Called when the listening fails.
     *
     * @permission ohos.permission.ACCELEROMETER
     * @type { ?function }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     */
    fail?: (data: string, code: number) => void;
}
/**
 * @interface CompassResponse
 * @syscap SystemCapability.Sensors.Sensor.Lite
 * @since 3
 * @deprecated since 8
 * @useinstead ohos.sensor/sensor#MagneticFieldResponse
 */
export interface CompassResponse {
    /**
     * Direction of the device (in degrees).
     *
     * @type { number }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     */
    direction: number;
}
/**
 * @interface SubscribeCompassOptions
 * @syscap SystemCapability.Sensors.Sensor.Lite
 * @since 3
 * @deprecated since 8
 * @useinstead ohos.sensor/sensor.SensorId#MAGNETIC_FIELD
 */
export interface SubscribeCompassOptions {
    /**
     * Called when compass sensor data changes.
     *
     * @type { function }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     */
    success: (data: CompassResponse) => void;
    /**
     * Called when the listening fails.
     *
     * @type { ?function }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     */
    fail?: (data: string, code: number) => void;
}
/**
 * @interface ProximityResponse
 * @syscap SystemCapability.Sensors.Sensor.Lite
 * @since 3
 * @deprecated since 8
 * @useinstead ohos.sensor/sensor#ProximityResponse
 */
export interface ProximityResponse {
    /**
     * Distance between a visible object and the device screen
     *
     * @type { number }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     */
    distance: number;
}
/**
 * @interface SubscribeProximityOptions
 * @syscap SystemCapability.Sensors.Sensor.Lite
 * @since 3
 * @deprecated since 8
 * @useinstead ohos.sensor/sensor.SensorId#PROXIMITY
 */
export interface SubscribeProximityOptions {
    /**
     * Called when distance sensor data changes.
     *
     * @type { function }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     */
    success: (data: ProximityResponse) => void;
    /**
     * Called when the listening fails.
     *
     * @type { ?function }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     */
    fail?: (data: string, code: number) => void;
}
/**
 * @interface LightResponse
 * @syscap SystemCapability.Sensors.Sensor.Lite
 * @since 3
 * @deprecated since 8
 * @useinstead ohos.sensor/sensor#LightResponse
 */
export interface LightResponse {
    /**
     * Light intensity, in lux.
     *
     * @type { number }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     */
    intensity: number;
}
/**
 * @interface SubscribeLightOptions
 * @syscap SystemCapability.Sensors.Sensor.Lite
 * @since 3
 * @deprecated since 8
 * @useinstead ohos.sensor/sensor.SensorId#AMBIENT_LIGHT
 */
export interface SubscribeLightOptions {
    /**
     * Called when ambient light sensor data changes.
     *
     * @type { function }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     */
    success: (data: LightResponse) => void;
    /**
     * Called when the listening fails.
     *
     * @type { ?function }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     */
    fail?: (data: string, code: number) => void;
}
/**
 * @interface StepCounterResponse
 * @permission ohos.permission.ACTIVITY_MOTION
 * @syscap SystemCapability.Sensors.Sensor.Lite
 * @since 3
 * @deprecated since 8
 * @useinstead ohos.sensor/sensor#PedometerResponse
 */
export interface StepCounterResponse {
    /**
     * Number of steps counted.
     * Each time the device restarts, the value is recalculated from 0 in phone, tablet.
     *
     * @permission ohos.permission.ACTIVITY_MOTION
     * @type { number }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     */
    steps: number;
}
/**
 * @interface SubscribeStepCounterOptions
 * @permission ohos.permission.ACTIVITY_MOTION
 * @syscap SystemCapability.Sensors.Sensor.Lite
 * @since 3
 * @deprecated since 8
 * @useinstead ohos.sensor/SensorId#PEDOMETER
 */
export interface SubscribeStepCounterOptions {
    /**
     * Called when step counter sensor data changes.
     *
     * @permission ohos.permission.ACTIVITY_MOTION
     * @type { function }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     */
    success: (data: StepCounterResponse) => void;
    /**
     * Called when the listening fails.
     *
     * @permission ohos.permission.ACTIVITY_MOTION
     * @type { ?function }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     */
    fail?: (data: string, code: number) => void;
}
/**
 * @interface BarometerResponse
 * @syscap SystemCapability.Sensors.Sensor.Lite
 * @since 3
 * @deprecated since 8
 * @useinstead ohos.sensor/sensor#BarometerResponse
 */
export interface BarometerResponse {
    /**
     * Pressure, in hpa.
     *
     * @type { number }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     */
    pressure: number;
}
/**
 * @interface SubscribeBarometerOptions
 * @syscap SystemCapability.Sensors.Sensor.Lite
 * @since 3
 * @deprecated since 8
 * @useinstead ohos.sensor/sensor.SensorId#BAROMETER
 */
export interface SubscribeBarometerOptions {
    /**
     * Called when the barometer sensor data changes.
     *
     * @type { function }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     */
    success: (data: BarometerResponse) => void;
    /**
     * Called when the listening fails.
     *
     * @type { ?function }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     */
    fail?: (data: string, code: number) => void;
}
/**
 * @interface HeartRateResponse
 * @permission ohos.permission.READ_HEALTH_DATA
 * @syscap SystemCapability.Sensors.Sensor.Lite
 * @since 3
 * @deprecated since 8
 * @useinstead ohos.sensor/sensor#HeartRateResponse
 */
export interface HeartRateResponse {
    /**
     * Heart rate.
     * 255 indicates an invalid value in lite wearable.
     *
     * @permission ohos.permission.READ_HEALTH_DATA
     * @type { number }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     */
    heartRate: number;
}
/**
 * @interface SubscribeHeartRateOptions
 * @permission ohos.permission.READ_HEALTH_DATA
 * @syscap SystemCapability.Sensors.Sensor.Lite
 * @since 3
 * @deprecated since 8
 * @useinstead ohos.sensor/sensor.SensorId#HEART_RATE
 */
export interface SubscribeHeartRateOptions {
    /**
     * Called when the heart rate sensor data changes.
     *
     * @permission ohos.permission.READ_HEALTH_DATA
     * @type { function }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     */
    success: (data: HeartRateResponse) => void;
    /**
     * Called when the listening fails
     *
     * @permission ohos.permission.READ_HEALTH_DATA
     * @type { ?function }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     */
    fail?: (data: string, code: number) => void;
}
/**
 * @interface OnBodyStateResponse
 * @syscap SystemCapability.Sensors.Sensor.Lite
 * @since 3
 * @deprecated since 8
 * @useinstead ohos.sensor/sensor#WearDetectionResponse
 */
export interface OnBodyStateResponse {
    /**
     * Whether the sensor is worn.
     *
     * @type { boolean }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     */
    value: boolean;
}
/**
 * @interface SubscribeOnBodyStateOptions
 * @syscap SystemCapability.Sensors.Sensor.Lite
 * @since 3
 * @deprecated since 8
 * @useinstead ohos.sensor/sensor.SensorId#WEAR_DETECTION
 */
export interface SubscribeOnBodyStateOptions {
    /**
     * Called when the wearing status changes.
     *
     * @type { function }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     */
    success: (data: OnBodyStateResponse) => void;
    /**
     * Called when the listening fails.
     *
     * @type { ?function }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     */
    fail?: (data: string, code: number) => void;
}
/**
 * @interface GetOnBodyStateOptions
 * @syscap SystemCapability.Sensors.Sensor.Lite
 * @since 3
 * @deprecated since 8
 * @useinstead ohos.sensor/sensor.SensorId#WEAR_DETECTION
 */
export interface GetOnBodyStateOptions {
    /**
     * Called when the sensor wearing state is obtained
     *
     * @type { function }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     */
    success: (data: OnBodyStateResponse) => void;
    /**
     * Called when the sensor wearing state fails to be obtained
     *
     * @type { ?function }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     */
    fail?: (data: string, code: number) => void;
    /**
     * Called when the execution is completed
     *
     * @type { ?function }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     */
    complete?: () => void;
}
/**
 * @interface DeviceOrientationResponse
 * @syscap SystemCapability.Sensors.Sensor.Lite
 * @since 6
 * @deprecated since 8
 * @useinstead ohos.sensor/sensor#OrientationResponse
 */
export interface DeviceOrientationResponse {
    /**
     * alpha
     *
     * @type { number }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 6
     * @deprecated since 8
     */
    alpha: number;
    /**
     * beta
     *
     * @type { number }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 6
     * @deprecated since 8
     */
    beta: number;
    /**
     * gamma
     *
     * @type { number }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 6
     * @deprecated since 8
     */
    gamma: number;
}
/**
 * @interface SubscribeDeviceOrientationOptions
 * @syscap SystemCapability.Sensors.Sensor.Lite
 * @since 6
 * @deprecated since 8
 * @useinstead ohos.sensor/sensor.SensorId#ORIENTATION
 */
export interface SubscribeDeviceOrientationOptions {
    /**
     * Execution frequency of the callback function for listening to device orientation sensor data.
     * Available values are as follows:
     *   1. game: Extremely high frequency (20 ms per callback), which is applicable to gaming.
     *   2. ui: High frequency (60 ms per callback), which is applicable to UI updating.
     *   3. normal: Regular frequency (200 ms per callback), which is application to low power consumption.
     * The default value is normal.
     *
     * @type { string }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 6
     * @deprecated since 8
     */
    interval: string;
    /**
     * Called when device orientation sensor data changes.
     *
     * @type { function}
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 6
     * @deprecated since 8
     */
    success: (data: DeviceOrientationResponse) => void;
    /**
     * Called when the listening fails.
     *
     * @type { ?function }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 6
     * @deprecated since 8
     */
    fail?: (data: string, code: number) => void;
}
/**
 * @interface GyroscopeResponse
 * @permission ohos.permission.GYROSCOPE
 * @syscap SystemCapability.Sensors.Sensor.Lite
 * @since 6
 * @deprecated since 8
 * @useinstead ohos.sensor/sensor#GyroscopeResponse
 */
export interface GyroscopeResponse {
    /**
     * X-coordinate
     *
     * @permission ohos.permission.GYROSCOPE
     * @type { number }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 6
     * @deprecated since 8
     */
    x: number;
    /**
     * Y-coordinate
     *
     * @permission ohos.permission.GYROSCOPE
     * @type { number }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 6
     * @deprecated since 8
     */
    y: number;
    /**
     * Z-coordinate
     *
     * @permission ohos.permission.GYROSCOPE
     * @type { number }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 6
     * @deprecated since 8
     */
    z: number;
}
/**
 * @interface SubscribeGyroscopeOptions
 * @permission ohos.permission.GYROSCOPE
 * @syscap SystemCapability.Sensors.Sensor.Lite
 * @since 6
 * @deprecated since 8
 * @useinstead ohos.sensor/sensor.SensorId#GYROSCOPE
 */
export interface SubscribeGyroscopeOptions {
    /**
     * Execution frequency of the callback function for listening to gyroscope sensor data.
     * Available values are as follows:
     *   1. game: Extremely high frequency (20 ms per callback), which is applicable to gaming.
     *   2. ui: High frequency (60 ms per callback), which is applicable to UI updating.
     *   3. normal: Regular frequency (200 ms per callback), which is application to low power consumption.
     * The default value is normal.
     *
     * @permission ohos.permission.GYROSCOPE
     * @type { string }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 6
     * @deprecated since 8
     */
    interval: string;
    /**
     * Called when gyroscope sensor data changes.
     *
     * @permission ohos.permission.GYROSCOPE
     * @type { function }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 6
     * @deprecated since 8
     */
    success: (data: GyroscopeResponse) => void;
    /**
     * Called when the listening fails.
     *
     * @permission ohos.permission.GYROSCOPE
     * @type { ?function }
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 6
     * @deprecated since 8
     */
    fail?: (data: string, code: number) => void;
}
/**
 * @syscap SystemCapability.Sensors.Sensor.Lite
 * @since 6
 * @deprecated since 8
 * @useinstead ohos.sensor/sensor
 */
export default class Sensor {
    /**
     * Listens to acceleration sensor data changes.
     * If this API is called multiple times, the last call takes effect.
     *
     * @permission ohos.permission.ACCELEROMETER
     * @param { subscribeAccelerometerOptions } options - options Options.
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     * @useinstead ohos.sensor/sensor.SensorId#ACCELEROMETER
     */
    static subscribeAccelerometer(options: subscribeAccelerometerOptions): void;
    /**
     * Cancels listening to acceleration sensor data.
     *
     * @permission ohos.permission.ACCELEROMETER
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     * @useinstead ohos.sensor/sensor.SensorId#ACCELEROMETER
     */
    static unsubscribeAccelerometer(): void;
    /**
     * Listens to compass sensor data changes.
     * If this API is called multiple times, the last call takes effect.
     *
     * @param { SubscribeCompassOptions } options - Options.
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     * @useinstead ohos.sensor/sensor.SensorId#MAGNETIC_FIELD
     */
    static subscribeCompass(options: SubscribeCompassOptions): void;
    /**
     * Cancels listening to compass sensor data.
     *
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     * @useinstead ohos.sensor/sensor.SensorId#MAGNETIC_FIELD
     */
    static unsubscribeCompass(): void;
    /**
     * Listens to distance sensor data changes.
     * If this API is called multiple times, the last call takes effect.
     *
     * @param { SubscribeProximityOptions } options - options Options.
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     * @useinstead ohos.sensor/sensor.SensorId#PROXIMITY
     */
    static subscribeProximity(options: SubscribeProximityOptions): void;
    /**
     * Cancels listening to distance sensor data.
     *
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     * @useinstead ohos.sensor/sensor.SensorId#PROXIMITY
     */
    static unsubscribeProximity(): void;
    /**
     * Listens to ambient light sensor data changes.
     * If this API is called multiple times, the last call takes effect.
     *
     * @param { SubscribeLightOptions } options - options Options.
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     * @useinstead ohos.sensor/sensor.SensorId#AMBIENT_LIGHT
     */
    static subscribeLight(options: SubscribeLightOptions): void;
    /**
     * Cancels listening to ambient light sensor data.
     *
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     * @useinstead ohos.sensor/sensor.SensorId#AMBIENT_LIGHT
     */
    static unsubscribeLight(): void;
    /**
     * Listens to step counter sensor data changes.
     * If this API is called multiple times, the last call takes effect.
     *
     * @permission ohos.permission.ACTIVITY_MOTION
     * @param { SubscribeStepCounterOptions } options - options Options.
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     * @useinstead ohos.sensor/sensor.SensorId#PEDOMETER
     */
    static subscribeStepCounter(options: SubscribeStepCounterOptions): void;
    /**
     * Cancels listening to step counter sensor data.
     *
     * @permission ohos.permission.ACTIVITY_MOTION
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     * @useinstead ohos.sensor/sensor.SensorId#PEDOMETER
     */
    static unsubscribeStepCounter(): void;
    /**
     * Listens to barometer sensor data changes.
     * If this API is called multiple times, the last call takes effect.
     *
     * @param { SubscribeBarometerOptions } options - options Options.
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     * @useinstead ohos.sensor/sensor.SensorId#BAROMETER
     */
    static subscribeBarometer(options: SubscribeBarometerOptions): void;
    /**
     * Cancels listening to barometer sensor data.
     *
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     * @useinstead ohos.sensor/sensor.SensorId#BAROMETER
     */
    static unsubscribeBarometer(): void;
    /**
     * Listens to changes of heart rate sensor data.
     * If this API is called multiple times, the last call takes effect.
     *
     * @permission ohos.permission.READ_HEALTH_DATA
     * @param { SubscribeHeartRateOptions } options - options Options.
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     * @useinstead ohos.sensor/sensor.SensorId#HEART_RATE
     */
    static subscribeHeartRate(options: SubscribeHeartRateOptions): void;
    /**
     * Cancels listening to heart rate sensor data.
     *
     * @permission ohos.permission.READ_HEALTH_DATA
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     * @useinstead ohos.sensor/sensor.SensorId#HEART_RATE
     */
    static unsubscribeHeartRate(): void;
    /**
     * Listens to whether a sensor is worn.
     * If this API is called multiple times, the last call takes effect.
     *
     * @param { SubscribeOnBodyStateOptions } options - options Options.
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     * @useinstead ohos.sensor/sensor.SensorId#WEAR_DETECTION
     */
    static subscribeOnBodyState(options: SubscribeOnBodyStateOptions): void;
    /**
     * Cancels listening to whether the sensor is worn.
     *
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     * @useinstead ohos.sensor/sensor.SensorId#WEAR_DETECTION
     */
    static unsubscribeOnBodyState(): void;
    /**
     * Obtains the sensor wearing state.
     *
     * @param { GetOnBodyStateOptions } options - options Options.
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 3
     * @deprecated since 8
     * @useinstead ohos.sensor/sensor.SensorId#WEAR_DETECTION
     */
    static getOnBodyState(options: GetOnBodyStateOptions): void;
    /**
     * Listens to device orientation sensor data changes.
     * If this API is called multiple times, the last call takes effect.
     *
     * @param { SubscribeDeviceOrientationOptions } options - options Options.
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 6
     * @deprecated since 8
     * @useinstead ohos.sensor/sensor.SensorId#ORIENTATION
     */
    static subscribeDeviceOrientation(options: SubscribeDeviceOrientationOptions): void;
    /**
     * Cancels listening to device orientation sensor data.
     *
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 6
     * @deprecated since 8
     * @useinstead ohos.sensor/sensor.SensorId#ORIENTATION
     */
    static unsubscribeDeviceOrientation(): void;
    /**
     * Listens to gyroscope sensor data changes.
     * If this API is called multiple times, the last call takes effect.
     *
     * @permission ohos.permission.GYROSCOPE
     * @param { SubscribeGyroscopeOptions } options - options Options.
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 6
     * @deprecated since 8
     * @useinstead ohos.sensor/sensor.SensorId#GYROSCOPE
     */
    static subscribeGyroscope(options: SubscribeGyroscopeOptions): void;
    /**
     * Cancels listening to gyroscope sensor data.
     *
     * @permission ohos.permission.GYROSCOPE
     * @syscap SystemCapability.Sensors.Sensor.Lite
     * @since 6
     * @deprecated since 8
     * @useinstead ohos.sensor/sensor.SensorId#GYROSCOPE
     */
    static unsubscribeGyroscope(): void;
}
