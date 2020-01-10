### uni.getSystemInfo(OBJECT)
获取系统信息。

**OBJECT 参数说明：**

|参数名|类型|必填|说明|
|:-|:-|:-|:-|
|success|Function|是|接口调用成功的回调|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**success 返回参数说明：**

|参数|说明|平台差异说明|
|:-|:-|:-|
|brand|手机品牌|5+App、微信小程序、百度小程序、头条小程序、QQ小程序|
|model|手机型号||
|pixelRatio|设备像素比||
|screenWidth|屏幕宽度||
|screenHeight|屏幕高度||
|windowWidth|可使用窗口宽度||
|windowHeight|可使用窗口高度||
|windowTop|可使用窗口的顶部位置|5+App、H5|
|windowBottom|可使用窗口的底部位置|5+App、H5|
|statusBarHeight|状态栏的高度|头条小程序不支持|
|navigationBarHeight|导航栏的高度|百度小程序|
|titleBarHeight|标题栏高度|支付宝小程序|
|language|应用设置的语言|头条小程序不支持|
|version|引擎版本号|H5不支持|
|storage|设备磁盘容量|支付宝小程序|
|currentBattery|当前电量百分比|支付宝小程序|
|appName|宿主APP名称|头条小程序|
|AppPlatform|App平台|QQ小程序|
|host|宿主平台|百度小程序|
|app|当前运行的客户端|支付宝小程序|
|cacheLocation|上一次缓存的位置信息|百度小程序|
|system|操作系统版本||
|platform|客户端平台，值域为：`ios`、`android`||
|fontSizeSetting|用户字体大小设置。以“我-设置-通用-字体大小”中的设置为准，单位：px|微信小程序、支付宝小程序、百度小程序、QQ小程序|
|SDKVersion|客户端基础库版本|支付宝小程序和H5不支持|
|swanNativeVersion|宿主平台版本号|百度小程序|
|albumAuthorized	|	允许微信使用相册的开关（仅 iOS 有效）	|微信小程序|
|cameraAuthorized	|	允许微信使用摄像头的开关	|微信小程序|
|locationAuthorized	|	允许微信使用定位的开关	|微信小程序|
|microphoneAuthorized	|	允许微信使用麦克风的开关	|微信小程序|
|notificationAuthorized	|	允许微信通知的开关	|微信小程序|
|notificationAlertAuthorized	|	允许微信通知带有提醒的开关（仅 iOS 有效）	|微信小程序|
|notificationBadgeAuthorized	|	允许微信通知带有标记的开关（仅 iOS 有效）	|微信小程序|
|notificationSoundAuthorized	|	允许微信通知带有声音的开关（仅 iOS 有效）	|微信小程序|
|bluetoothEnabled	|	蓝牙的系统开关	|微信小程序|
|locationEnabled	|	地理位置的系统开关	|微信小程序|
|wifiEnabled	|	Wi-Fi 的系统开关	|微信小程序|
|safeArea|在竖屏正方向下的安全区域|5+App、H5、微信小程序|
|safeAreaInsets|在竖屏正方向下的安全区域插入位置（2.5.3+）|5+App、H5、微信小程序|

**Tips**
- 屏幕高度=状态栏高度+原生导航栏高度+可使用窗口高度+原生tabbar高度
- H5端，windowHeight不包含NavigationBar和TabBar的高度，windowTop等于NavigationBar高度，windowBottom等于TabBar高度，statusBarHeight为0
- APP端windowTop和windowBottom都是0，注意区分与H5端的差异

**safeArea 的结构**

|参数	|类型	|说明							|
|:-		|:-								|:-								|
|left	|Number	|安全区域左上角横坐标			|
|right	|Number	|安全区域右下角横坐标			|
|top	|Number	|安全区域左上角纵坐标			|
|bottom	|Number	|安全区域右下角纵坐标			|
|width	|Number	|安全区域的宽度，单位逻辑像素	|
|height	|Number	|安全区域的高度，单位逻辑像素	|

**safeAreaInsets 的结构**

|参数	|类型	|说明							|
|:-		|:-								|:-								|
|left	|Number	|安全区域左侧插入位置			|
|right	|Number	|安全区域右侧插入位置			|
|top	|Number	|安全区顶部插入位置			|
|bottom	|Number	|安全区域底部插入位置			|


**示例**

```javascript
uni.getSystemInfo({
	success: function (res) {
		console.log(res.model);
		console.log(res.pixelRatio);
		console.log(res.windowWidth);
		console.log(res.windowHeight);
		console.log(res.language);
		console.log(res.version);
		console.log(res.platform);
	}
});
```

### uni.getSystemInfoSync()
获取系统信息同步接口。

**同步返回参数说明**

|参数|说明|平台差异说明|
|:-|:-|:-|
|brand|手机品牌|5+App、微信小程序、百度小程序、头条小程序、QQ小程序|
|model|手机型号||
|pixelRatio|设备像素比||
|screenWidth|屏幕宽度||
|screenHeight|屏幕高度||
|windowWidth|可使用窗口宽度||
|windowHeight|可使用窗口高度||
|windowTop|可使用窗口的顶部位置|5+App、H5|
|windowBottom|可使用窗口的底部位置|5+App、H5|
|statusBarHeight|状态栏的高度|头条小程序不支持|
|navigationBarHeight|导航栏的高度|百度小程序|
|titleBarHeight|标题栏高度|支付宝小程序|
|language|应用设置的语言|头条小程序不支持|
|version|引擎版本号|H5不支持|
|storage|设备磁盘容量|支付宝小程序|
|currentBattery|当前电量百分比|支付宝小程序|
|appName|宿主APP名称|头条小程序|
|AppPlatform|App平台|QQ小程序|
|host|宿主平台|百度小程序|
|app|当前运行的客户端|支付宝小程序|
|cacheLocation|上一次缓存的位置信息|百度小程序|
|system|操作系统版本||
|platform|客户端平台，值域为：`ios`、`android`||
|fontSizeSetting|用户字体大小设置。以“我-设置-通用-字体大小”中的设置为准，单位：px|微信小程序、支付宝小程序、百度小程序、QQ小程序|
|SDKVersion|客户端基础库版本|支付宝小程序和H5不支持|
|swanNativeVersion|宿主平台版本号|百度小程序|
|albumAuthorized	|	允许微信使用相册的开关（仅 iOS 有效）	|微信小程序|
|cameraAuthorized	|	允许微信使用摄像头的开关	|微信小程序|
|locationAuthorized	|	允许微信使用定位的开关	|微信小程序|
|microphoneAuthorized	|	允许微信使用麦克风的开关	|微信小程序|
|notificationAuthorized	|	允许微信通知的开关	|微信小程序|
|notificationAlertAuthorized	|	允许微信通知带有提醒的开关（仅 iOS 有效）	|微信小程序|
|notificationBadgeAuthorized	|	允许微信通知带有标记的开关（仅 iOS 有效）	|微信小程序|
|notificationSoundAuthorized	|	允许微信通知带有声音的开关（仅 iOS 有效）	|微信小程序|
|bluetoothEnabled	|	蓝牙的系统开关	|微信小程序|
|locationEnabled	|	地理位置的系统开关	|微信小程序|
|wifiEnabled	|	Wi-Fi 的系统开关	|微信小程序|
|safeArea|在竖屏正方向下的安全区域|5+App、H5、微信小程序|
|safeAreaInsets|在竖屏正方向下的安全区域插入位置（2.5.3+）|5+App、H5、微信小程序|

**Tips**
- 使用注意同上getSystemInfo

**safeArea 的结构**

|参数	|类型	|说明							|
|:-		|:-								|:-								|
|left	|Number	|安全区域左上角横坐标			|
|right	|Number	|安全区域右下角横坐标			|
|top	|Number	|安全区域左上角纵坐标			|
|bottom	|Number	|安全区域右下角纵坐标			|
|width	|Number	|安全区域的宽度，单位逻辑像素	|
|height	|Number	|安全区域的高度，单位逻辑像素	|

**safeAreaInsets 的结构**

|参数	|类型	|说明							|
|:-		|:-								|:-								|
|left	|Number	|安全区域左侧插入位置			|
|right	|Number	|安全区域右侧插入位置			|
|top	|Number	|安全区顶部插入位置			|
|bottom	|Number	|安全区域底部插入位置			|

**示例**

```javascript
try {
	const res = uni.getSystemInfoSync();
	console.log(res.model);
	console.log(res.pixelRatio);
	console.log(res.windowWidth);
	console.log(res.windowHeight);
	console.log(res.language);
	console.log(res.version);
	console.log(res.platform);
} catch (e) {
	// error
}
```


**获取设备标记**

H5、小程序、iOS，属于对用户隐私保护比较严格的平台，在这些平台很难获取有效的设备唯一标记。

Android已经改进用户隐私保护，在很多新手机上，获取imei等信息时需要弹框让用户授权。而Android10已经无法获取imei了。

- H5平台：
常用的方式是uv，即在uni.storage里存一个随机数，本质是存在浏览器的localstorage里。将随机数发给服务器，进行用户身份识别和统计。当然如果用户浏览器清空了localstorage、更换了浏览器、或使用隐私模式，那么就统计数据就会有误差。
- 小程序平台：
小程序也可以采用与H5类似的方式，在uni.storage里存一个随机数。如果想获取用户的微信唯一ID，也可以弹框请求用户授权。
- App iOS平台：
iOS并不提供imei的获取API，可通过[plus.device.getInfo](http://www.html5plus.org/doc/zh_cn/device.html#plus.device.getInfo) 可以获得设备的唯一标识（uuid），这个id其实也是一种随机数概念，类似于h5的uv计算，卸载app重装会发生变化；

iOS还有一个叫`idfa`的广告识别符，可通过Native.js获取，详见：[idfa介绍](https://ask.dcloud.net.cn/article/36107)。
- App Android平台：
Android也可以使用UUID，同iOS。

Android10以下可以得到imei，在[plus.device.getInfo](http://www.html5plus.org/doc/zh_cn/device.html#plus.device.getInfo) 可以获得设备的国际移动设备身份码（imei）。注意很多新手机在获取imei时会弹框要求用户授权。

Android10以上，部分国产手机支持OAID，详见[匿名设备标识符（OAID）](http://www.html5plus.org/doc/zh_cn/device.html#plus.device.getOAID)

`plus.device.getInfo`的API是从HBuilderX 2.0.3+开始提供的，老版需使用plus.devide.uuid或plus.device.imei。

### uni.canIUse(String)
判断应用的 API，回调，参数，组件等是否在当前版本可用。

平台差异说明

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|x|√|√|√|√|√|

**String 参数说明**

使用 ``${API}.${method}.${param}.${options}`` 或者 ``${component}.${attribute}.${option}`` 方式来调用，例如：

- ``${API}`` 代表 API 名字
- ``${method}`` 代表调用方式，有效值为return, success, object, callback
- ``${param}`` 代表参数或者返回值
- ``${options}`` 代表参数的可选值
- ``${component}`` 代表组件名字
- ``${attribute}`` 代表组件属性
- ``${option}`` 代表组件属性的可选值

**示例**

```javascript
uni.canIUse('getSystemInfoSync.return.screenWidth');
uni.canIUse('getSystemInfo.success.screenWidth');
uni.canIUse('showToast.object.image');
uni.canIUse('request.object.method.GET');

uni.canIUse('live-player');
uni.canIUse('text.selectable');
uni.canIUse('button.open-type.contact');
```
