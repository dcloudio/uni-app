# uni-accelerometer
实现加速度计监听能力。

[API规范文档](https://doc.dcloud.net.cn/uni-app-x/api/accelerometer.html)

## 支持的 API
- `uni.onAccelerometerChange(callback)`
- `uni.offAccelerometerChange(callback)`
- `uni.startAccelerometer(options)`
- `uni.stopAccelerometer(options)`

## 参数说明
`startAccelerometer` 支持以下采样频率：
- `game`：约 20ms/次
- `ui`：约 20ms/次
- `normal`：约 200ms/次

回调结果结构：
- `x`：X 轴加速度，单位统一为重力加速度 `g`，与微信小程序口径一致
- `y`：Y 轴加速度，单位统一为重力加速度 `g`，与微信小程序口径一致
- `z`：Z 轴加速度，单位统一为重力加速度 `g`，与微信小程序口径一致

## 示例
```uts
const accelerometerListener : OnAccelerometerChangeCallback = (result : OnAccelerometerChangeCallbackResult) => {
	console.log('accelerometer', result.x, result.y, result.z)
}

uni.onAccelerometerChange(accelerometerListener)
uni.startAccelerometer({
	interval: 'normal',
	fail: (error) => {
		console.error('startAccelerometer:fail', error)
	}
})

onUnload(() => {
	uni.offAccelerometerChange(accelerometerListener)
	uni.stopAccelerometer()
})
```

项目内置演示页面：`pages/accelerometer/accelerometer`

## 错误码
### 通用错误码
- `601`：设备不支持加速度计
- `602`：启动监听失败
- `603`：停止监听失败
- `604`：原生内部错误

### Android 错误码
- `701`：`SensorManager` 不可用
- `702`：加速度传感器不可用
- `703`：注册传感器监听失败

### iOS 错误码
- `801`：设备不支持加速度计
- `802`：`CMMotionManager` 初始化失败
- `803`：启动加速度计失败
- `804`：停止加速度计失败

### Harmony 错误码
- `501`：加速度传感器不可用
- `502`：订阅传感器失败
- `503`：取消订阅失败

### Web 错误码
- `901`：当前环境不支持设备运动事件

## 平台说明
- Android：基于 `Sensor.TYPE_ACCELEROMETER`，原始 `m/s^2` 数据已换算为微信小程序口径的 `g`
- iOS：基于 `CoreMotion.CMMotionManager`
- Harmony：基于 `@ohos.sensor`，原始 `m/s^2` 数据已换算为微信小程序口径的 `g`
- Web：基于 `devicemotion`，原始 `m/s^2` 数据已换算为微信小程序口径的 `g`

## 权限与注意事项
- iOS 已在插件内补充 `NSMotionUsageDescription`
- Harmony 启动监听时会申请 `ohos.permission.ACCELEROMETER`
- Web 在部分浏览器中需要显式授权设备运动权限
