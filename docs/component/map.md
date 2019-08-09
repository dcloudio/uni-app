#### map

地图。

**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|x|

**属性说明**

|属性名|类型|默认值|说明|平台差异说明|
|:-|:-|:-|:-|:-|
|longitude|Number||中心经度||
|latitude|Number||中心纬度||
|scale|Number|16|缩放级别，取值范围为5-18||
|markers|Array||标记点||
|polyline|Array||路线||
|circles|Array||圆||
|controls|Array||控件||
|include-points|Array||缩放视野以包含所有给定的坐标点|微信小程序、H5、百度小程序、支付宝小程序|
|show-location|Boolean||显示带有方向的当前定位点|微信小程序、H5、百度小程序、支付宝小程序|
|@markertap|EventHandle||点击标记点时触发|App平台需要指定属性 id|
|@callouttap|EventHandle||点击标记点对应的气泡时触发||
|@controltap|EventHandle||点击控件时触发||
|@regionchange|EventHandle||视野发生变化时触发|微信小程序、H5、百度小程序、支付宝小程序|
|@tap|EventHandle||点击地图时触发||
|@updated|EventHandle||在地图渲染更新完成时触发|微信小程序、H5、百度小程序|

**注意** 

- `<map>` 组件的宽/高推荐写直接量，比如：750rpx，不要设置百分比值。
- `uni-app` 只支持 `gcj02` 坐标

**markers**

标记点用于在地图上显示标记的位置

|属性|说明|类型|必填|备注|平台差异说明|
|:-|:-|:-|:-|:-|:-|
|id|标记点id|Number|是|marker点击事件回调会返回此id。建议为每个marker设置上Number类型id，保证更新marker时有更好的性能。||
|latitude|纬度|Number|是|浮点数，范围 -90 ~ 90||
|longitude|经度|Number|是|浮点数，范围 -180 ~ 180||
|title|标注点名|String|否||微信小程序、H5、支付宝小程序、百度小程序|
|iconPath|显示的图标|String|是|项目目录下的图片路径，支持相对路径写法，以'/'开头则表示相对小程序根目录；也支持临时路径||
|rotate|旋转角度|Number|否|顺时针旋转的角度，范围 0 ~ 360，默认为 0|微信小程序、支付宝小程序、百度小程序|
|alpha|标注的透明度|Number|否|默认1，无透明，范围 0 ~ 1|微信小程序、支付宝小程序、百度小程序|
|width|标注图标宽度|Number|否|默认为图片实际宽度|微信小程序、H5、支付宝小程序、百度小程序|
|height|标注图标高度|Number|否|默认为图片实际高度|微信小程序、H5、支付宝小程序、百度小程序|
|callout|自定义标记点上方的气泡窗口|Object|否|支持的属性见下表，可识别换行符。||
|label|为标记点旁边增加标签|Object|否|支持的属性见下表，可识别换行符。|微信小程序、H5、5+APP、百度小程序|
|anchor|经纬度在标注图标的锚点，默认底边中点|Object|否|{x, y}，x表示横向(0-1)，y表示竖向(0-1)。{x: .5, y: 1} 表示底边中点|微信小程序、H5、百度小程序|

**marker 上的气泡 callout**

|属性|说明|类型|平台差异说明|
|:-|:-|:-|:-|
|content|文本|String||
|color|文本颜色|String|微信小程序、H5、百度小程序|
|fontSize|文字大小|Number|微信小程序、H5、百度小程序|
|borderRadius|callout边框圆角|Number|微信小程序、H5、百度小程序|
|bgColor|背景色|String|微信小程序、H5、百度小程序|
|padding|文本边缘留白|Number|微信小程序、H5、百度小程序|
|display|'BYCLICK':点击显示; 'ALWAYS':常显|String|微信小程序、H5、百度小程序|
|textAlign|文本对齐方式。有效值: left, right, center|String|微信小程序、百度小程序|

**marker 上的气泡 label**

|属性|说明|类型|平台差异说明|
|:-|:-|:-|:-|
|content|文本|String||
|color|文本颜色|String|微信小程序、H5、百度小程序|
|fontSize|文字大小|Number|微信小程序、H5、百度小程序|
|x|label的坐标，原点是 marker 对应的经纬度|Number|微信小程序、H5、百度小程序|
|y|label的坐标，原点是 marker 对应的经纬度|Number|微信小程序、H5、百度小程序|
|borderWidth|边框宽度|Number|微信小程序、百度小程序|
|borderColor|边框颜色|String|微信小程序、百度小程序|
|borderRadius|边框圆角|Number|微信小程序、百度小程序|
|bgColor|背景色|String|微信小程序、百度小程序|
|padding|文本边缘留白|Number|微信小程序、百度小程序|
|textAlign|文本对齐方式。有效值: left, right, center|String|微信小程序、百度小程序|

**polyline**

指定一系列坐标点，从数组第一项连线至最后一项

|属性|说明|类型|必填|备注|平台差异说明|
|:-|:-|:-|:-|:-|:-|
|points|经纬度数组|Array|是|[{latitude: 0, longitude: 0}]||
|color|线的颜色|String|否|8位十六进制表示，后两位表示alpha值，如：#0000AA||
|width|线的宽度|Number|否|||
|dottedLine|是否虚线|Boolean|否|默认false|微信小程序、H5、百度小程序、支付宝小程序|
|arrowLine|带箭头的线|Boolean|否|默认false，微信小程序开发者工具暂不支持该属性|微信小程序、百度小程序|
|arrowIconPath|更换箭头图标|String|否|在arrowLine为true时生效|微信小程序、百度小程序|
|borderColor|线的边框颜色|String|否||微信小程序、H5、百度小程序|
|borderWidth|线的厚度|Number|否||微信小程序、H5、百度小程序|

**circles**

在地图上显示圆

|属性|说明|类型|必填|备注|
|:-|:-|:-|:-|:-|
|latitude|纬度|Number|是|浮点数，范围 -90 ~ 90|
|longitude|经度|Number|是|浮点数，范围 -180 ~ 180|
|color|描边的颜色|String|否|8位十六进制表示，后两位表示alpha值，如：#0000AA|
|fillColor|填充颜色|String|否|8位十六进制表示，后两位表示alpha值，如：#0000AA|
|radius|半径|Number|是||
|strokeWidth|描边的宽度|Number|否|&nbsp;|

**controls**

在地图上显示控件，控件不随着地图移动

|属性|说明|类型|必填|备注|
|:-|:-|:-|:-|:-|
|id|控件id|Number|否|在控件点击事件回调会返回此id|
|position|控件在地图的位置|Object|是|控件相对地图位置|
|iconPath|显示的图标|String|是|项目目录下的图片路径，支持相对路径写法，以'/'开头则表示相对项目根目录；也支持临时路径|
|clickable|是否可点击|Boolean|否|默认不可点击|

**position**

|属性|说明|类型|必填|备注|
|:-|:-|:-|:-|:-|
|left|距离地图的左边界多远|Number|否|默认为0|
|top|距离地图的上边界多远|Number|否|默认为0|
|width|控件宽度|Number|否|默认为图片宽度|
|height|控件高度|Number|否|默认为图片高度|

地图组件的经纬度必填，如果不填经纬度则默认值是北京的经纬度。

**示例**

```html
<template>
	<view>
		<view class="page-body">
			<view class="page-section page-section-gap">
				<map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="covers">
				</map>
			</view>
		</view>
	</view>
</template>
```

```javascript
export default {
	data() {
		return {
			title: 'map',
			latitude: 39.909,
			longitude: 116.39742,
			covers: [{
				latitude: 39.909,
				longitude: 116.39742,
				iconPath: '../../../static/location.png'
			}, {
				latitude: 39.90,
				longitude: 116.39,
				iconPath: '../../../static/location.png'
			}]
		}
	},
	methods: {

	}
}
```

map 组件相关操作的 JS API：[uni.createMapContext](api/location/map?id=createmapcontext)

**注意事项**

- 小程序和 App 中，`<map>` 组件是由引擎创建的原生组件，它的层级是最高的，不能通过 z-index 控制层级。在`<map>`上绘制内容，可使用组件自带的marker、controls等属性，也可以使用`<cover-view>`组件。App端还可以使用plus.nativeObj.view 或 subNVue 绘制原生内容。[详见](/component/native-component)
- 小程序和 App 中，请勿在 scroll-view、swiper、picker-view、movable-view 中使用 `<map>` 组件。
- 小程序和 App 中，css 动画对 `<map>` 组件无效。
- map 组件使用的经纬度是国测局坐标，调用 uni.getLocation 接口需要指定 type 为 gcj02。
- `<map>` 组件在不同平台的底层引擎是不同的：H5、微信小程序为腾讯地图；App、支付宝小程序为高德地图；百度小程序端为百度地图。App端也可以使用百度地图，在manifest的源码视图中配置，具体[参考](http://ask.dcloud.net.cn/article/29)
- map 组件默认的api是参考微信小程序的，如果觉得不够用，可以用plus.map，可以通过`$getAppMap`获取原生地图对象，[详见](https://uniapp.dcloud.io/api/location/map)
- H5 端获取定位信息，需要部署在 **https** 服务上，本地预览（localhost）仍然可以使用 http 协议。
- 无 GPS 模块的 PC 设备使用 Chrome 浏览器的时候，位置信息是连接谷歌服务器获取的，国内用户可能获取位置信息失败。
- App 端使用地图组件需要向高德或百度等三方服务商申请SDK资质，获取AppKey，打包时需要在manifest文件中勾选相应模块，在SDK配置中填写Appkey。在manifest可视化界面有详细申请指南。


##### FAQ

Q：应用中使用了 `<map>` 组件，打包为原生应用时，提示缺少权限模块怎么办？
A：原生的地图，依赖第三方的 SDK，因此打包移动应用时，需要勾选相关的权限并填写 key 信息。详见：[http://ask.dcloud.net.cn/article/35090](http://ask.dcloud.net.cn/article/35090)

Q：国外应用想使用谷歌地图/google地图怎么办？
A：1. 可以在web-view下调用谷歌的web地图；2. 可以写一个原生插件封装谷歌原生地图，具体参考uni-app插件市场的原生插件开发教程
