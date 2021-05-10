export const API_ON_ACCELEROMETER = 'onAccelerometer'
export type API_TYPE_ON_ACCELEROMETER_CHANGE = typeof uni.onAccelerometerChange
export const API_OFF_ACCELEROMETER = 'offAccelerometer'
export type API_TYPE_OFF_ACCELEROMETER_CHANGE =
  typeof uni.offAccelerometerChange
export const API_START_ACCELEROMETER = 'startAccelerometer'
export type API_TYPE_START_ACCELEROMETER = typeof uni.startAccelerometer
export const API_STOP_ACCELEROMETER = 'stopAccelerometer'
export type API_TYPE_STOP_ACCELEROMETER = typeof uni.stopAccelerometer

export const StartAccelerometerProtocol: ApiProtocol<API_TYPE_START_ACCELEROMETER> =
  {
    interval: String as any,
  }
