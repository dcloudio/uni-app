#### map

地图。

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|x|1.9.0+|

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
|include-points|Array||缩放视野以包含所有给定的坐标点|App-nvue 2.1.5+、微信小程序、H5、百度小程序、支付宝小程序|
|enable-3D|Boolean|false|是否显示3D楼块|App-nvue 2.1.5+、微信小程序2.3.0|
|show-compass|Boolean|false|是否显示指南针|App-nvue 2.1.5+、微信小程序2.3.0|
|enable-overlooking|Boolean|false|是否开启俯视|App-nvue 2.1.5+、微信小程序2.3.0|
|enable-satellite|Boolean|false|是否开启卫星图|App-nvue 2.1.5+、微信小程序2.7.0|
|enable-traffic|Boolean|false|是否开启实时路况|App-nvue 2.1.5+、微信小程序2.7.0|
|show-location|Boolean||显示带有方向的当前定位点|微信小程序、H5、百度小程序、支付宝小程序|
|polygons|Array.`<polygon>`||多边形|App-nvue 2.1.5+、微信小程序、百度小程序、支付宝小程序|
|@markertap|EventHandle||点击标记点时触发，e.detail = {markerId}|App-nvue 2.3.3+, App平台需要指定 marker 对象属性 id|
|@labeltap|EventHandle||点击label时触发，e.detail = {markerId} |微信小程序2.9.0|
|@callouttap|EventHandle||点击标记点对应的气泡时触发，e.detail = {markerId}||
|@controltap|EventHandle||点击控件时触发，e.detail = {controlId}||
|@regionchange|EventHandle||视野发生变化时触发|微信小程序、H5、百度小程序、支付宝小程序|
|@tap|EventHandle||点击地图时触发; App-nuve、微信小程序2.9支持返回经纬度||
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
|title|标注点名|String|否|点击时显示，callout存在时将被忽略|App-nvue 2.1.5+、微信小程序、H5、支付宝小程序、百度小程序|
|iconPath|显示的图标|String|是|项目目录下的图片路径，支持相对路径写法，以'/'开头则表示相对小程序根目录；也支持临时路径||
|rotate|旋转角度|Number|否|顺时针旋转的角度，范围 0 ~ 360，默认为 0|App-nvue 2.1.5+、微信小程序、支付宝小程序、百度小程序|
|alpha|标注的透明度|Number|否|默认1，无透明，范围 0 ~ 1|App-nvue 2.1.5+、微信小程序、支付宝小程序、百度小程序|
|width|标注图标宽度|Number|否|默认为图片实际宽度|App-nvue 2.1.5+、微信小程序、H5、支付宝小程序、百度小程序|
|height|标注图标高度|Number|否|默认为图片实际高度|App-nvue 2.1.5+、微信小程序、H5、支付宝小程序、百度小程序|
|callout|自定义标记点上方的气泡窗口|Object|否|支持的属性见下表，可识别换行符。|App-nvue 2.1.5+|
|label|为标记点旁边增加标签|Object|否|支持的属性见下表，可识别换行符。|App-nvue 2.1.5+、微信小程序、H5、App、百度小程序|
|anchor|经纬度在标注图标的锚点，默认底边中点|Object|否|{x, y}，x表示横向(0-1)，y表示竖向(0-1)。{x: .5, y: 1} 表示底边中点|App-nvue 2.1.5+、微信小程序、H5、百度小程序|

**marker 上的气泡 callout**

|属性|说明|类型|平台差异说明|
|:-|:-|:-|:-|
|content|文本|String||
|color|文本颜色|String|App-nvue 2.1.5+、微信小程序、H5、百度小程序|
|fontSize|文字大小|Number|App-nvue 2.1.5+、微信小程序、H5、百度小程序|
|borderRadius|callout边框圆角|Number|App-nvue 2.1.5+、微信小程序、H5、百度小程序|
|bgColor|背景色|String|App-nvue 2.1.5+、微信小程序、H5、百度小程序|
|padding|文本边缘留白|Number|App-nvue 2.1.5+、微信小程序、H5、百度小程序|
|display|'BYCLICK':点击显示; 'ALWAYS':常显|String|App-nvue 2.1.5+、微信小程序、H5、百度小程序|
|textAlign|文本对齐方式。有效值: left, right, center|String|App-nvue 2.1.5+、微信小程序、百度小程序|

**marker 上的标签 label**

|属性|说明|类型|平台差异说明|
|:-|:-|:-|:-|
|content|文本|String||
|color|文本颜色|String|App-nvue 2.1.5+、微信小程序、H5、百度小程序|
|fontSize|文字大小|Number|App-nvue 2.1.5+、微信小程序、H5、百度小程序|
|x|label的坐标，原点是 marker 对应的经纬度|Number|App-nvue 2.1.5+、微信小程序、H5、百度小程序|
|y|label的坐标，原点是 marker 对应的经纬度|Number|App-nvue 2.1.5+、微信小程序、H5、百度小程序|
|borderWidth|边框宽度|Number|App-nvue 2.1.5+、微信小程序、百度小程序|
|borderColor|边框颜色|String|App-nvue 2.1.5+、微信小程序、百度小程序|
|borderRadius|边框圆角|Number|App-nvue 2.1.5+、微信小程序、百度小程序|
|bgColor|背景色|String|App-nvue 2.1.5+、微信小程序、百度小程序|
|padding|文本边缘留白|Number|App-nvue 2.1.5+、微信小程序、百度小程序|
|textAlign|文本对齐方式。有效值: left, right, center|String|App-nvue 2.1.5+、微信小程序、百度小程序|

**polyline**

指定一系列坐标点，从数组第一项连线至最后一项

|属性|说明|类型|必填|备注|平台差异说明|
|:-|:-|:-|:-|:-|:-|
|points|经纬度数组|Array|是|[{latitude: 0, longitude: 0}]||
|color|线的颜色|String|否|8位十六进制表示，后两位表示alpha值，如：#0000AA||
|width|线的宽度|Number|否|||
|dottedLine|是否虚线|Boolean|否|默认false|App-nvue 2.1.5+、微信小程序、H5、百度小程序、支付宝小程序|
|arrowLine|带箭头的线|Boolean|否|默认false，微信小程序开发者工具暂不支持该属性|App-nvue 2.1.5+、微信小程序、百度小程序|
|arrowIconPath|更换箭头图标|String|否|在arrowLine为true时生效|App-nvue 2.1.5+、微信小程序、百度小程序|
|borderColor|线的边框颜色|String|否||App-nvue 2.1.5+、微信小程序、H5、百度小程序|
|borderWidth|线的厚度|Number|否||App-nvue 2.1.5+、微信小程序、H5、百度小程序|

**polygon**<br>
指定一系列坐标点，根据 points 坐标数据生成闭合多边形

属性|说明|类型|必填|备注
:--|:--|:--|:--|:--|
points|经纬度数组|array|是|[{latitude: 0, longitude: 0}]
strokeWidth|描边的宽度|Number|否|
strokeColor|描边的颜色|String|否|十六进制|
fillColor|填充颜色|String|否|十六进制|
zIndex|设置多边形 Z 轴数值|Number|否|

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

**示例** [查看示例](https://uniapp.dcloud.io/h5/pages/component/map/map)

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
      id:0, // 使用 marker点击事件 需要填写id
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

- 小程序和app-vue中，`<map>` 组件是由引擎创建的原生组件，它的层级是最高的，不能通过 z-index 控制层级。在`<map>`上绘制内容，可使用组件自带的marker、controls等属性，也可以使用`<cover-view>`组件。App端还可以使用plus.nativeObj.view 或 subNVue 绘制原生内容，[参考](/component/native-component)。另外App端nvue文件不存在层级问题。从微信基础库2.8.3开始，支持map组件的同层渲染，不再有层级问题。
- App端nvue文件的map和小程序拉齐度更高。vue里的map则与plus.map功能一致，和小程序的地图略有差异。**App端使用map推荐使用nvue。**
- 在涉及层级问题的小程序中和app-vue中，请勿在 scroll-view、swiper、picker-view、movable-view 中使用 `<map>` 组件。
- 小程序和 app-vue 中，css 动画对 `<map>` 组件无效。
- map 组件使用的经纬度是国测局坐标，调用 uni.getLocation 接口需要指定 type 为 gcj02。
- `<map>` 组件在不同平台的底层引擎是不同的：H5、微信小程序为腾讯地图；App、支付宝小程序为高德地图；百度小程序端为百度地图。app-vue也可以使用百度地图，在manifest中配置，打包后生效，但app-nvue只支持高德地图。另外选择地图、查看地图位置的API也仅支持高德地图。App端如无特殊必要，建议使用高德地图。
- map 组件默认的api是参考微信小程序的，如需要使用plus.map，可以通过`$getAppMap`获取原生地图对象，[详见](https://uniapp.dcloud.io/api/location/map)。注意nvue的map组件不是plus.map对象，无法使用`$getAppMap`
- H5 端获取定位信息，需要部署在 **https** 服务上，本地预览（localhost）仍然可以使用 http 协议。
- 无 GPS 模块的 PC 设备使用 Chrome 浏览器的时候，位置信息是连接谷歌服务器获取的，国内用户可能获取位置信息失败。
- App 端使用地图组件需要向高德或百度等三方服务商申请SDK资质，获取AppKey，打包时需要在manifest文件中勾选相应模块，在SDK配置中填写Appkey。注意申请包名和打包时的包名需匹配一致，证书信息匹配。在manifest可视化界面有详细申请指南。
- ios nvue Color 不支持 ARGB 十六进制，使用 rgba(r,g,b,a) 代替

##### FAQ

Q：应用中使用了 `<map>` 组件，打包为App时，提示缺少权限模块怎么办？
A：App端原生地图，依赖第三方的 SDK，因此打包移动应用时，需要在manifest中勾选相关的权限并填写 key 信息。详见：[https://ask.dcloud.net.cn/article/29](https://ask.dcloud.net.cn/article/29)

Q：国外应用想使用谷歌地图/google地图怎么办？
A：1. 可以在web-view下调用谷歌的web地图；2. 可以写一个原生插件封装谷歌原生地图，具体参考uni-app插件市场的原生插件开发教程
