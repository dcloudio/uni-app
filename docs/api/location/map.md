### uni.createMapContext(mapId,this)
创建并返回 map 上下文 ``mapContext`` 对象。在自定义组件下，第二个参数传入组件实例this，以操作组件内 ``<map>`` 组件。

**注意：uni.createMapContext(mapId, this)**
- app-nvue 平台 2.2.5+ 支持 uni.createMapContext(mapId, this)
- app-nvue 平台 2.2.5- 需要同时设置组件属性id和ref ``<map id="map1" ref="map1"></map>``，或者直接使用 ref，例如 ``this.$refs.map1``


**平台差异说明**

|5+App|H5|微信小程序|支付宝小程序|百度小程序|头条小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|√|√|√|√|√|x|x|

mapContext

``mapContext`` 通过 mapId 跟一个 ``<map>`` 组件绑定，通过它可以操作对应的 ``<map>`` 组件。

**mapContext 对象的方法列表**

|方法|参数|说明|平台差异说明|最低版本|
|:-|:-|:-|:-|:-|
|getCenterLocation|OBJECT|获取当前地图中心的经纬度，返回的是 gcj02 坐标系，可以用于 [uni.openLocation](api/location/location?id=getlocation)|||
|moveToLocation||将地图中心移动到当前定位点，需要配合map组件的show-location使用|||
|translateMarker|OBJECT|平移marker，带动画|app-nvue 2.1.5+、微信小程序带动画||
|includePoints|OBJECT|缩放视野展示所有经纬度|app-nvue 2.1.5+||
|getRegion|OBJECT|获取当前地图的视野范围|||
|getScale|OBJECT|获取当前地图的缩放级别|||
|$getAppMap||获取原生地图对象 [plus.maps.Map](https://www.html5plus.org/doc/zh_cn/maps.html#plus.maps.Map)|app-vue自定义组件模式|1.9.3|

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

## mapSearch 模块(module)#### reverseGeocode(Object,callback)> 反向地理编码
##### Object属性|类型 |默认值|必填|说明:--|:--|:--|:--|:--|point|Object| |是|{latitude: 纬度, longitude: 经度}
##### callback 返回 Object 参数说明
属性|类型 |说明:--|:--|:--|type|String|"success" 表示成功， "fail" 表示失败code|Number| 成功返回 0,失败返回相应 code 码
message|String|失败描述
address|String|查询后地址 （成功时返回）

#### poiSearchNearBy（Object,callback);> 周边检索##### Object属性|类型 |默认值|必填|说明:--|:--|:--|:--|:--|point|Object| |是|检索的中心点坐标 {latitude: 纬度, longitude: 经度}
key|String| | 是|搜索关键字radius|Number|3000|否|检索的半径，单位为米index|Number|1|否|要获取检索结果的页号索引##### callback 返回 Object 参数说明
属性|类型 |说明:--|:--|:--|
type|String|"success" 表示成功， "fail" 表示失败code|Number| 成功返回 0,失败返回相应 code 码
message|String|失败描述
totalNumber|Number|返回的POI数目
currentNumber|Number|当前页POI数目
pageNumber|Number|页数
pageIndex|Number|当前页号索引
poiList|Array.&lt;poiObject&gt;|POI信息数组

##### poiObject
属性|类型 |说明:--|:--|:--|
location|Object|{latitude: 纬度, longitude: 经度}
name|String|名称
type|String|类型
distance|Number|距离（单位米）
address|String|地址


**Tips**

- App端使用map，nvue比vue更强大。
- H5 端获取定位信息，需要部署在 **https** 服务上，本地预览（localhost）仍然可以使用 http 协议。
- 无 GPS 模块的 PC 设备使用 Chrome 浏览器的时候，位置信息是连接谷歌服务器获取的，国内用户可能获取位置信息失败。
- App 端使用地图组件需要向高德或百度等三方服务商申请SDK资质，获取AppKey，打包时需要在manifest的SDK配置中填写Appkey。在manifest可视化界面有详细申请指南。
- ``<map>`` 组件默认为国测局坐标，调用 ``uni.getLocation`` 返回结果传递给 ``<map>`` 组件时，需指定 type 为 gcj02。
