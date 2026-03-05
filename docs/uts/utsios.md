# UTSiOS

app-iOS平台专有内置对象。在uni-app和uni-app x的uts环境中均可使用。

## 静态方法


### getCurrentViewController()

获取当前 app 显示的 UIViewController。



**返回值**
| 类型 | 描述 |
| :- | :- |
| UIViewController | 当前 app 显示的 UIViewController | 


<!-- UTSJSON.UTSiOS.getCurrentViewController.test -->

**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.11 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


### getKeyWindow()

获取当前app的keyWindow。



**返回值**
| 类型 | 描述 |
| :- | :- |
| UIWindow | 当前app的keyWindow. | 


<!-- UTSJSON.UTSiOS.getKeyWindow.test -->

**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.11 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


### colorWithString(value)

获取指定的颜色。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| value | string | 是 | - | - | 需要转换的代表色值的字符串，支持一下格式：精简写法的十六进制 如：#f00，十六进制 如：#ff0000，RGB 如：rgb(255, 0, 0)，RGBA 如:rgba(255, 0, 0, 0.5)，色值关键字，如： red | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| UIColor | UIColor 实例对象 注：如转换失败 默认会返回 黑色 | 


<!-- UTSJSON.UTSiOS.colorWithString.test -->

**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.11 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


### getResourcePath(resourceName)

获取资源文件的原生平台路径。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| resourceName | string | 是 | - | - | 资源文件相对于项目的绝对路径, 如：“/static/logo.png” | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 该资源在原生平台的路径 | 


<!-- UTSJSON.UTSiOS.getResourcePath.test -->

**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.11 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


### getUserAgent()

获取当前应用的 UserAgent。



**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 当前应用的 UserAgent。 | 


<!-- UTSJSON.UTSiOS.getUserAgent.test -->

**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.11 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


### getDataPath()

获取当前运行app的dataPath



**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 当前运行app的dataPath。 | 


<!-- UTSJSON.UTSiOS.getDataPath.test -->

**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.11 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


### convert2AbsFullPath()

将文件的项目相对地址转换为运行期对应的绝对地址<br/>

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| inputPath | string | 是 | - | - | 待转换的文件相对路径 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 转换后文件绝对路径 | 


<!-- UTSJSON.UTSiOS.convert2AbsFullPath.test -->

**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.11 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


### destroyInstance()

销毁指定的原生实例对象。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| obj | AnyObject | 是 | - | - | 要销毁的对象。 | 


**返回值**
| 类型 |
| :- |
| void | 


<!-- UTSJSON.UTSiOS.destroyInstance.test -->

**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.25 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |



### isSimulator()

是否是模拟器。



**返回值**
| 类型 | 描述 |
| :- | :- |
| boolean | 当前是模拟器 true, 当前是真机：false | 


<!-- UTSJSON.UTSiOS.isSimulator.test -->

**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.11 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


<!-- UTSJSON.UTSiOS.isSimulator.tutorial -->

### getDeviceId()

获取设备 deviceId。



**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 当前设备的 deviceId | 


<!-- UTSJSON.UTSiOS.getDeviceId.test -->

**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.11 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


<!-- UTSJSON.UTSiOS.getDeviceId.tutorial -->

### getModel()

获取设备型号。



**返回值**
| 类型 |
| :- |
| string | 


<!-- UTSJSON.UTSiOS.getModel.test -->

**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.11 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


<!-- UTSJSON.UTSiOS.getModel.tutorial -->

### getAppId()

获取当前运行的app的AppId。



**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 当前运行的app的AppId。 | 


<!-- UTSJSON.UTSiOS.getAppId.test -->

**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.11 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


<!-- UTSJSON.UTSiOS.getAppId.tutorial -->

### isUniMp()

获取当前运行环境是否是unimp。



**返回值**
| 类型 | 描述 |
| :- | :- |
| boolean | 是否是unimp。 | 


<!-- UTSJSON.UTSiOS.isUniMp.test -->

**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.11 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


<!-- UTSJSON.UTSiOS.isUniMp.tutorial -->

### getAppName()

获取manifest.json 中配置的应用名称



**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 应用名称。 | 


<!-- UTSJSON.UTSiOS.getAppName.test -->

**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.11 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


<!-- UTSJSON.UTSiOS.getAppName.tutorial -->

### getAppVersion()

获取manifest.json 中配置的应用版本名称。



**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 应用版本名称。 | 


<!-- UTSJSON.UTSiOS.getAppVersion.test -->

**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.11 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


<!-- UTSJSON.UTSiOS.getAppVersion.tutorial -->

### getAppVersionCode()

获取manifest.json 中配置的应用版本号。



**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 应用版本号。 | 


<!-- UTSJSON.UTSiOS.getAppVersionCode.test -->

**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.11 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


<!-- UTSJSON.UTSiOS.getAppVersionCode.tutorial -->

### getOsLanguage()

获取操作系统设置的语言。



**返回值**
| 类型 | 描述 |
| :- | :- |
| string | os language。 | 


<!-- UTSJSON.UTSiOS.getOsLanguage.test -->

**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.11 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


<!-- UTSJSON.UTSiOS.getOsLanguage.tutorial -->

### getAppWgtVersion()

获取应用资源（wgt）的版本名称。



**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 应用资源（wgt）的版本名称。 | 


<!-- UTSJSON.UTSiOS.getAppWgtVersion.test -->

**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.11 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


<!-- UTSJSON.UTSiOS.getAppWgtVersion.tutorial -->

### getInnerVersion()

获取引擎版本号。



**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 引擎版本号。 | 


<!-- UTSJSON.UTSiOS.getInnerVersion.test -->

**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.11 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


<!-- UTSJSON.UTSiOS.getInnerVersion.tutorial -->

### getSystemSetting()

获取系统设置信息。



**返回值**
| 类型 | 描述 |
| :- | :- |
| Map\<string, any> | 系统设置信息。 | 


<!-- UTSJSON.UTSiOS.getSystemSetting.test -->

**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.11 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


<!-- UTSJSON.UTSiOS.getSystemSetting.tutorial -->

### getOsTheme()

获取系统当前主题。



**返回值**
| 类型 | 描述 |
| :- | :- |
| string | 系统当前主题信息。 | 


<!-- UTSJSON.UTSiOS.getOsTheme.test -->

**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.18 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


<!-- UTSJSON.UTSiOS.getOsTheme.tutorial -->

### onOsThemeChange(callback)

监听系统主题变化（需要调用取消监听避免内存泄露）。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (theme: string) => void | 是 | - | - | 监听函数 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 监听id。 | 


<!-- UTSJSON.UTSiOS.onOsThemeChange.test -->

**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.18 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


<!-- UTSJSON.UTSiOS.onOsThemeChange.tutorial -->

### offOsThemeChange(callbackId)

取消监听系统主题变化。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callbackId | number | 是 | - | - | 监听id | 


**返回值**
| 类型 |
| :- |
| void | 


<!-- UTSJSON.UTSiOS.offOsThemeChange.test -->

**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.18 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


<!-- UTSJSON.UTSiOS.offOsThemeChange.tutorial -->

### getAppTheme()

获取App当前主题。



**返回值**
| 类型 | 描述 |
| :- | :- |
| string | App当前主题信息。 | 


<!-- UTSJSON.UTSiOS.getAppTheme.test -->

**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.18 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


<!-- UTSJSON.UTSiOS.getAppTheme.tutorial -->

### setAppTheme(theme)

设置App当前主题。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| theme | string | 是 | - | - | 要设置的主题信息 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| void | App当前主题信息。 | 


<!-- UTSJSON.UTSiOS.setAppTheme.test -->

**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.18 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


<!-- UTSJSON.UTSiOS.setAppTheme.tutorial -->

### onAppThemeChange(callback)

监听app theme变化（需要调用取消监听避免内存泄露）。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (theme: string) => void | 是 | - | - | 监听函数 | 


**返回值**
| 类型 | 描述 |
| :- | :- |
| number | 监听id。 | 


<!-- UTSJSON.UTSiOS.onAppThemeChange.test -->

**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.18 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


<!-- UTSJSON.UTSiOS.onAppThemeChange.tutorial -->

### offAppThemeChange(callbackId)

取消监听app theme变化。

**参数**
| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callbackId | number | 是 | - | - | 监听id | 


**返回值**
| 类型 |
| :- |
| void | 


<!-- UTSJSON.UTSiOS.offAppThemeChange.test -->

**兼容性**

**uni-app x 兼容性**
| iOS | iOS UTS 插件 |
| :- | :- |
| 4.18 | - |


**uni-app 兼容性**
| iOS UTS 插件 |
| :- |
| - |


<!-- UTSJSON.UTSiOS.offAppThemeChange.tutorial -->
