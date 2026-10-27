## uni-compass

- `onCompassChange` ：监听回调默认按每秒 5 次节流，`uni.startCompass()` 调用成功后开始采集，`uni.stopCompass()` 停止采集。
- `accuracy` 与微信小程序对齐：iOS 返回 `number`，Android 返回 `high`、`medium`、`low`、`no-contact`、`unreliable` 或 `unknow {value}`，Harmony 与 Web 使用系统原始精度值；若系统未提供则返回 `null`。

| 平台 | `accuracy` 类型 | 返回规则 | 说明 |
| --- | --- | --- | --- |
| Android | `string` | `high` / `medium` / `low` / `no-contact` / `unreliable` / `unknow {value}` | 按微信小程序 Android 语义映射系统传感器精度 |
| iOS | `number \| null` | 直接返回系统航向精度 | 与微信小程序 iOS 一致，表示系统原始数值精度 |
| Harmony | `number \| null` | 直接返回鸿蒙方向传感器原始值 | 不是微信小程序语义映射值，需按鸿蒙系统值理解 |
| Web | `number \| null` | 优先返回浏览器原始值，如 `webkitCompassAccuracy` | 不同浏览器差异较大，未提供时返回 `null` |

靠近强磁场或金属环境时会影响数据精度，可做“8”字校准，即平持手机画一个8字。
- Android：底层同时对加速度计和地磁传感器使用 200ms 采样周期，并在 UTS 层再次节流，避免双传感器合并计算时超过 5 次/秒。
- iOS：默认可用磁北方向；当应用已经拥有定位权限时，插件会优先使用 `trueHeading`，未授权时自动回退到 `magneticHeading`。
- iOS：若希望拿到真北方向，需要确保在工程配置中补充定位权限说明，例如 `NSLocationWhenInUseUsageDescription`，并由用户授予定位权限。
- Harmony：依赖系统方向传感器能力，若设备缺少相关传感器或系统接口差异较大，可能回退为不可用。
- Harmony：`accuracy` 直接透传鸿蒙方向传感器返回的原始值，与微信小程序的 iOS/Android 精度语义不同。
- Web：依赖 `deviceorientation` 事件；部分浏览器尤其是 iOS Safari 需要用户手势触发后才能申请方向权限，建议通过按钮点击来调用 `uni.startCompass()`。
- Web：桌面浏览器和部分 Android 浏览器即使编译通过，也可能因为硬件或浏览器策略拿不到真实方向数据。
- Web：要求https的网址才能使用传感器。
- Web：`accuracy` 优先返回浏览器方向事件中的原始精度值（如 Safari 的 `webkitCompassAccuracy`）；若浏览器未提供该字段则返回 `null`。
