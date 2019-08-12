### uni.createMapContext(mapId,this)
创建并返回 map 上下文 ``mapContext`` 对象。在自定义组件下，第二个参数传入组件实例this，以操作组件内 ``<map>`` 组件。

**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|x|

mapContext

``mapContext`` 通过 mapId 跟一个 ``<map>`` 组件绑定，通过它可以操作对应的 ``<map>`` 组件。

**mapContext 对象的方法列表**

|方法|参数|说明|平台差异说明|最低版本|
|:-|:-|:-|:-|:-|
|getCenterLocation|OBJECT|获取当前地图中心的经纬度，返回的是 gcj02 坐标系，可以用于 [uni.openLocation](api/location/location?id=getlocation)|||
|moveToLocation||将地图中心移动到当前定位点，需要配合map组件的show-location使用|||
|translateMarker|OBJECT|平移marker，带动画|App-nvue 2.1.5+、微信小程序带动画||
|includePoints|OBJECT|缩放视野展示所有经纬度|App-nvue 2.1.5+||
|getRegion|OBJECT|获取当前地图的视野范围|||
|getScale|OBJECT|获取当前地图的缩放级别|||
|$getAppMap||获取原生地图对象 [plus.maps.Map](https://www.html5plus.org/doc/zh_cn/maps.html#plus.maps.Map)|5+App自定义组件模式|1.9.3|

`$getAppMap()` 注意事项：

- 在页面中，必须在 `onReady` 中调用。
- 在组件中，必须在 `mounted` 中调用。
- `uni-app`中使用原生地图无需提供占位div，得到`$getAppMap()`后直接js使用即可。

**getCenterLocation 的 OBJECT 参数列表**

|参数|类型|必填|说明|
|:-|:-|:-|:-|
|success|Function|否|接口调用成功的回调函数 ，res = { longitude: "经度", latitude: "纬度"}|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**translateMarker 的 OBJECT 参数列表**

|参数|类型|必填|说明|
|:-|:-|:-|:-|
|markerId|Number|是|指定 marker|
|destination|Object|是|指定 marker 移动到的目标点|
|autoRotate|Boolean|是|移动过程中是否自动旋转 marker|
|rotate|Number|是|marker 的旋转角度|
|duration|Number|否|动画持续时长，默认值1000ms，平移与旋转分别计算|
|animationEnd|Function|否|	动画结束回调函数|
|fail|Function|否|	接口调用失败的回调函数|

**includePoints 的 OBJECT 参数列表**

|参数|类型|必填|说明|
|:-|:-|:-|:-|
|points|Array|是|要显示在可视区域内的坐标点列表，[{latitude, longitude}]|
|padding|Array|否|坐标点形成的矩形边缘到地图边缘的距离，单位像素。格式为[上，右，下，左]，安卓上只能识别数组第一项，上下左右的padding一致。开发者工具暂不支持padding参数。|

**getRegion 的 OBJECT 参数列表**

|参数|类型|必填|说明|
|:-|:-|:-|:-|
|success|Function|否|接口调用成功的回调函数，res = {southwest, northeast}，西南角与东北角的经纬度|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|

**getScale 的 OBJECT 参数列表**

|参数|类型|必填|说明|
|:-|:-|:-|:-|
|success|Function|否|接口调用成功的回调函数，res = {scale}|
|fail|Function|否|接口调用失败的回调函数|
|complete|Function|否|接口调用结束的回调函数（调用成功、失败都会执行）|


**Tips**

- 如果想在App端实现更多地图功能，可通过`$getAppMap()`获取原生地图对象`plus.maps.Map`，然后参考[文档](https://www.html5plus.org/doc/zh_cn/maps.html#plus.maps.Map)实现更多功能。
- H5 端获取定位信息，需要部署在 **https** 服务上，本地预览（localhost）仍然可以使用 http 协议。
- 无 GPS 模块的 PC 设备使用 Chrome 浏览器的时候，位置信息是连接谷歌服务器获取的，国内用户可能获取位置信息失败。
- App 端使用地图组件需要向高德或百度等三方服务商申请SDK资质，获取AppKey，打包时需要在manifest的SDK配置中填写Appkey。在manifest可视化界面有详细申请指南。
- ``<map>`` 组件默认为国测局坐标，调用 ``uni.getLocation`` 返回结果传递给 ``<map>`` 组件时，需指定 type 为 gcj02。
