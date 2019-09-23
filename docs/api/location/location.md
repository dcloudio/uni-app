### uni.getLocation(OBJECT)
获取当前的地理位置、速度。
在微信小程序中，当用户离开应用后，此接口无法调用，除非申请后台持续定位权限；当用户点击“显示在聊天顶部”时，此接口可继续调用。

**OBJECT 参数说明**

|参数名|类型|必填|说明|平台差异说明|
|:-|:-|:-|:-|:-:|
|type|String|否|默认为 wgs84 返回 gps 坐标，gcj02 返回国测局坐标，可用于 ``uni.openLocation`` 的坐标||
|altitude|Boolean|否|传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度|App和头条小程序不支持|
|geocode|Boolean|否|默认false，是否解析地址信息|仅App平台支持|
|success|Function|是|接口调用成功的回调函数，返回内容详见返回参数说明。||
|fail|Function|否|接口调用失败的回调函数||
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|&nbsp;|

**success 返回参数说明**

|参数|说明|
|:-|:-|
|latitude|纬度，浮点数，范围为-90~90，负数表示南纬|
|longitude|经度，浮点数，范围为-180~180，负数表示西经|
|speed|速度，浮点数，单位m/s|
|accuracy|位置的精确度|
|altitude|高度，单位 m|
|verticalAccuracy|垂直精度，单位 m（Android 无法获取，返回 0）|
|horizontalAccuracy|水平精度，单位 m|
|[address](/api/location/location?id=address)|地址信息|

**address 地址信息说明**

|属性|类型|描述|说明|
|:-|:-|:-|:-|
|country|String|国家|如“中国”，如果无法获取此信息则返回undefined|
|province|String|省份名称|如“北京市”，如果无法获取此信息则返回undefined|
|city|String|城市名称|如“北京市”，如果无法获取此信息则返回undefined|
|district|String|区（县）名称|如“朝阳区”，如果无法获取此信息则返回undefined|
|street|String|街道信息|如“酒仙桥路”，如果无法获取此信息则返回undefined|
|streetNum|String|获取街道门牌号信息|如“3号”，如果无法获取此信息则返回undefined|
|poiName|String|POI信息|如“电子城．国际电子总部”，如果无法获取此信息则返回undefined|
|postalCode|String|邮政编码|如“100016”，如果无法获取此信息则返回undefined|
|cityCode|String|城市代码|如“010”，如果无法获取此信息则返回undefined|

**示例**

```javascript
uni.getLocation({
	type: 'wgs84',
	success: function (res) {
		console.log('当前位置的经度：' + res.longitude);
		console.log('当前位置的纬度：' + res.latitude);
	}
});
```

**注意**

- H5：在较新的手机浏览器上，H5 端获取定位信息，要求部署在 **https** 服务上，本地预览（localhost）仍然可以使用 http 协议。
- H5：无 GPS 模块的 PC 设备使用 Chrome 浏览器的时候，位置信息是连接谷歌服务器获取的，国内用户可能获取位置信息失败。
- H5：微信公众号可使用微信js sdk，[详见](https://ask.dcloud.net.cn/article/35380)
- App：Android由于谷歌服务被墙，想在国产手机上正常定位，需要向高德等三方服务商申请SDK资质，获取AppKey。云打包时需要在manifest的SDK配置中填写Appkey。在manifest可视化界面有详细申请指南。离线打包自行在原生工程中配置。
- App：``<map>`` 组件默认为国测局坐标gcj02，调用 ``uni.getLocation`` 返回结果传递给 ``<map>`` 组件时，需指定 type 为 gcj02。
- App：持续定位方案：iOS端可以申请持续定位权限，[参考](https://ask.dcloud.net.cn/article/12569)。Android如果进程被杀，代码无法执行。可以使用[unipush](https://ask.dcloud.net.cn/article/35622)，通过服务器激活App，执行透传消息，让App启动然后采集位置。Android上，即使自己写原生插件做后台进程，也很容易被杀，unipush是更合适的方案
- 小程序：api默认不返回详细地址中文描述。需要中文地址有2种方式：1、使用高德地图小程序sdk，在app和微信上都可以获得中文地址，[参考](http://ask.dcloud.net.cn/article/35070)。2、只考虑app，使用``plus.geolocation``也可以获取中文地址
- 可以通过用户授权API来判断用户是否给应用授予定位权限[https://uniapp.dcloud.io/api/other/authorize](https://uniapp.dcloud.io/api/other/authorize)

### uni.chooseLocation(OBJECT)
打开地图选择位置。

**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|√|x|

**OBJECT 参数说明**

|参数名|类型|必填|说明|
|:-|:-|:-|:-|
|keyword|String|否|搜索关键字，仅App平台支持|
|success|Function|是|接口调用成功的回调函数，返回内容详见返回参数说明。|
|fail|Function|否|接口调用失败的回调函数（获取定位失败、用户取消等情况下触发）|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**注意**
- 因平台差异，如果SDK配置百度地图，需要设置keyword，才能显示相关地点
- nvue下只支持高德地图，不支持百度地图
- 纯nvue项目（manifest中renderer为native），暂不支持此API。可自行基于map组件封装。


**success 返回参数说明**

|参数|说明|
|:-|:-|
|name|位置名称|
|address|详细地址|
|latitude|纬度，浮点数，范围为-90~90，负数表示南纬|
|longitude|经度，浮点数，范围为-180~180，负数表示西经|

**示例**

```javascript
uni.chooseLocation({
	success: function (res) {
		console.log('位置名称：' + res.name);
		console.log('详细地址：' + res.address);
		console.log('纬度：' + res.latitude);
		console.log('经度：' + res.longitude);
	}
});
```

**注意**
- 不同端，使用地图选择时基于的底层地图引擎不一样，如微信小程序和H5是腾讯地图，App是高德地图，详见地图map组件的使用注意事项
- 微信内置浏览器中可使用微信js sdk，[详见](https://ask.dcloud.net.cn/article/35380)
- chooseLocation属于封装型API，开发者若觉得不够灵活，可自行基于原始的map组件进行封装
