## uni.createMapContext(mapId, component?) @createmapcontext

创建并返回 map 上下文 mapContext 对象

参考：[Map组件](../component/map.md)

### createMapContext 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.31 | 4.31 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| mapId | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| component | [ComponentPublicInstance](/vue/options-api.md#component-instance) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


### 返回值 

| 类型 | 描述 | 必备 |
| :- | :- | :- |
| [MapContext](#mapcontext-values) | map组件上下文对象 | 否 |

#### MapContext 的方法 @mapcontext-values 

#### getCenterLocation(options : MapContextGetCenterLocationOptions) : void; @getcenterlocation
getCenterLocation
获取当前地图中心的经纬度，返回的是 gcj02 坐标系，可以用于 uni.openLocation
##### getCenterLocation 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | 4.31 | 4.31 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **MapContextGetCenterLocationOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| success | (result: [LocationObject](#locationobject-values)) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [MapContextFail](#mapcontextfail-values)) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

###### LocationObject 的属性值 @locationobject-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| latitude | number | 是 | - | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 纬度，浮点数，范围为-90~90，负数表示南纬 |
| longitude | number | 是 | - | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 经度，范围为-180~180，负数表示西经 |

###### MapContextFail 的属性值 @mapcontextfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误码 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 500001 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 获取当前地图中心的经纬度失败 |
| 500002 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 未找到当前定位位置 |
| 500003 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 未找到marker |
| 500004 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 创建自定义图片图层失败 |
| 500005 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 未找到自定义图层id |
| 500006 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 网络图片加载失败 |
| 500012 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 地图内部错误 |


#### moveToLocation(options : MapContextMoveToLocationOptions) : void; @movetolocation
moveToLocation
将地图中心移动到当前定位点，需要配合map组件的show-location使用
##### moveToLocation 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | 4.31 | 4.31 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **MapContextMoveToLocationOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| latitude | number | 否 | null | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 纬度，浮点数，范围为-90~90，负数表示南纬 |
| longitude | number | 否 | null | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 经度，范围为-180~180，负数表示西经 |
| success | (result: any) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [MapContextFail](#mapcontextfail-values)) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 


#### translateMarker(options : MapContextTranslateMarkerOptions) : void; @translatemarker
translateMarker
平移marker，带动画
##### translateMarker 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | 4.31 | 4.31 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **MapContextTranslateMarkerOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| markerId | number | 是 | - | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 指定marker |
| destination | [LocationObject](#locationobject-values) | 是 | - | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 指定marker移动到的目标点 |
| autoRotate | boolean | 否 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 移动过程中是否自动旋转marker |
| rotate | number | 否 | 0 | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | marker的旋转角度 |
| moveWithRotate | boolean | 否 | false | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 平移和旋转同时进行 |
| duration | number | 否 | 1000 | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 动画持续时长，平移与旋转分别计算 |
| success | (result: any) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [MapContextFail](#mapcontextfail-values)) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 


#### includePoints(options : MapContextIncludePointsOptions) : void; @includepoints
includePoints
缩放视野展示所有经纬度
##### includePoints 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | 4.31 | 4.31 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **MapContextIncludePointsOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| points | Array&lt;[LocationObject](#locationobject-values)&gt; | 是 | - | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 要显示在可视区域内的坐标点列表，[{latitude, longitude}\] |
| success | (result: any) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [MapContextFail](#mapcontextfail-values)) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 


#### getRegion(options : MapContextGetRegionOptions) : void; @getregion
getRegion
获取当前地图的视野范围
##### getRegion 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | 4.31 | 4.31 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **MapContextGetRegionOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| success | (result: [MapContextGetRegionResult](#mapcontextgetregionresult-values)) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [MapContextFail](#mapcontextfail-values)) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

###### MapContextGetRegionResult 的属性值 @mapcontextgetregionresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| southwest | [LocationObject](#locationobject-values) | 是 | - | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 西南角的经纬度 |
| northeast | [LocationObject](#locationobject-values) | 是 | - | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 东北角的经纬度 |


#### getScale(options : MapContextGetScaleOptions) : void; @getscale
getScale
获取当前地图的缩放级别
##### getScale 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | 4.31 | 4.31 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **MapContextGetScaleOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| success | (result: [MapContextGetScaleResult](#mapcontextgetscaleresult-values)) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [MapContextFail](#mapcontextfail-values)) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

###### MapContextGetScaleResult 的属性值 @mapcontextgetscaleresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| scale | number | 是 | - | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 地图缩放级别 |


#### addGroundOverlay(options : MapContextAddGroundOverlayOptions) : void; @addgroundoverlay
addGroundOverlay
创建自定义图片图层，图片会随着地图缩放而缩放
##### addGroundOverlay 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | 4.31 | 4.31 | x |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **MapContextAddGroundOverlayOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| id | string | 是 | - | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: x | 图片图层 id |
| src | string | 是 | - | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: x | 图片路径，支持网络图片、临时路径、代码包路径 |
| bounds | **Bounds** | 是 | - | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: x | 图片覆盖的经纬度范围 |
| visible | boolean | 否 | false | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: x | 是否可见 |
| zIndex | number | 否 | 0 | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: x | 图层绘制顺序 |
| opacity | number | 否 | 1 | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: x | 图层透明度 |
| success | (result: any) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [MapContextFail](#mapcontextfail-values)) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### bounds 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| southwest | [LocationObject](#locationobject-values) | 是 | - | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 西南角的经纬度 |
| northeast | [LocationObject](#locationobject-values) | 是 | - | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 东北角的经纬度 |


#### addMarkers(options : MapContextAddMarkersOptions) : void; @addmarkers
addMarkers
添加 marker
##### addMarkers 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | 4.31 | 4.31 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **MapContextAddMarkersOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| markers | Array&lt;**Marker**&gt; | 是 | - | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 同传入 map 组件的 marker 属性 |
| clear | boolean | 是 | - | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 是否先清空地图上所有 marker |
| success | (result: any) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [MapContextFail](#mapcontextfail-values)) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### markers 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| id | number | 是 | - | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 标记点id，marker点击事件回调会返回此id。建议为每个marker设置上Number类型id，保证更新marker时有更好的性能。最大限制9位数 |
| latitude | number | 是 | - | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 纬度，浮点数，范围 -90 ~ 90 |
| longitude | number | 是 | - | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 经度，浮点数，范围 -180 ~ 180 |
| iconPath | string | 是 | - | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 显示的图标，项目目录下的图片路径，支持相对路径写法，以'/'开头则表示相对小程序根目录；也支持临时路径 |
| title | string | 否 | null | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 标注点名，点击时显示，callout存在时将被忽略 |
| rotate | number | 否 | 0 | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 旋转角度，顺时针旋转的角度，范围 0 ~ 360 |
| alpha | number | 否 | 1 | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 标注的透明度，范围 0 ~ 1 |
| width | number | 否 | 默认为图片实际宽度 | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 标注图标宽度 |
| height | number | 否 | 默认为图片实际高度 | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 标注图标高度 |
| ariaLabel | string | 否 | null | Web: -; 微信小程序: -; Android: x; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 无障碍访问，（属性）元素的额外描述 |
| anchor | **Anchor** | 否 | [0.5, 1\] | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 经纬度在标注图标的锚点，默认底边中点	{x, y}，x表示横向(0-1)，y表示竖向(0-1)。{x: .5, y: 1} 表示底边中点 |
| callout | **MapMarkerCallout** | 否 | null | Web: -; 微信小程序: -; Android: 4.51; iOS: 4.51; HarmonyOS: x | 自定义标记点上方的气泡窗口 |
| label | **MapMarkerLabel** | 否 | null | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 为标记点旁边增加标签 |
| clusterId | number | 否 | null | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 自定义点聚合簇效果时使用 |
| customCallout | [MapMarkerCallout](#mapmarkercallout-values) | 否 | null | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 自定义气泡窗口 |
| joinCluster | boolean | 否 | null | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 是否参与点聚合 |

###### anchor 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| x | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| y | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

###### callout 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| content | string | 否 | "" | Web: -; 微信小程序: -; Android: 4.51; iOS: 4.51; HarmonyOS: - | 文本 |
| color | [string.ColorString](/uts/data-type.md#ide-string) | 否 | "black" | Web: -; 微信小程序: -; Android: 4.51; iOS: 4.51; HarmonyOS: - | 文本颜色 |
| fontSize | number | 否 | null | Web: -; 微信小程序: -; Android: 4.51; iOS: 4.51; HarmonyOS: - | 文字大小 |
| borderRadius | number | 否 | 0 | Web: -; 微信小程序: -; Android: 4.51; iOS: 4.51; HarmonyOS: - | 边框圆角 |
| borderWidth | number | 否 | 0 | Web: -; 微信小程序: -; Android: 4.51; iOS: 4.51; HarmonyOS: - | 边框宽度 |
| borderColor | [string.ColorString](/uts/data-type.md#ide-string) | 否 | "transparent" | Web: -; 微信小程序: -; Android: 4.51; iOS: 4.51; HarmonyOS: - | 边框颜色 |
| bgColor | [string.ColorString](/uts/data-type.md#ide-string) | 否 | "#fff" | Web: -; 微信小程序: -; Android: 4.51; iOS: 4.51; HarmonyOS: - | 背景色 |
| padding | number | 否 | 0 | Web: -; 微信小程序: -; Android: 4.51; iOS: 4.51; HarmonyOS: - | 文本边缘留白 |
| display | string | 否 | "BYCLICK" | Web: -; 微信小程序: -; Android: 4.51; iOS: 4.51; HarmonyOS: - | 'BYCLICK':点击显示; 'ALWAYS':常显 |
| textAlign | string | 否 | "left" | Web: -; 微信小程序: -; Android: 4.51; iOS: 4.51; HarmonyOS: - | 文本对齐方式。 |
| anchorX | number | 否 | 0.5 | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 横向偏移量，向右为正数 |
| anchorY | number | 否 | 1 | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 纵向偏移量，向下为正数 |

####### display 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| BYCLICK | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| ALWAYS | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |

####### textAlign 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| left | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| center | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| right | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |

###### label 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| content | string | 否 | 1 | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 文本 |
| color | string | 否 | 1 | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 文本颜色 |
| fontSize | number | 否 | 1 | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 文字大小 |
| x | number | 否 | 1 | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | label的坐标，原点是 marker 对应的经纬度 |
| y | number | 否 | 1 | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | label的坐标，原点是 marker 对应的经纬度 |
| anchorX | number | 否 | 1 | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | label的坐标，原点是 marker 对应的经纬度 |
| anchorY | number | 否 | 1 | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | label的坐标，原点是 marker 对应的经纬度 |
| borderWidth | number | 否 | 1 | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 边框宽度 |
| borderColor | string | 否 | 1 | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 边框颜色 |
| borderRadius | number | 否 | 1 | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 边框圆角 |
| bgColor | string | 否 | 1 | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 背景色 |
| padding | number | 否 | 1 | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 文本边缘留白 |
| textAlign | string | 否 | 1 | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 文本对齐方式。 |
| ariaLabel | string | 否 | 1 | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 无障碍访问，（属性）元素的额外描述 |

####### textAlign 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| left | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| center | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |
| right | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | - |


#### moveAlong(options : MapContextMoveAlongOptions) : void; @movealong
moveAlong
沿指定路径移动 marker，用于轨迹回放等场景。动画完成时触发回调事件，若动画进行中，对同一 marker 再次调用 moveAlong 方法，前一次的动画将被打断。
##### moveAlong 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | 4.31 | 4.31 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **MapContextMoveAlongOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| markerId | number | 是 | - | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 指定marker |
| path | Array&lt;[LocationObject](#locationobject-values)&gt; | 是 | - | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 移动路径的坐标串，坐标点格式 {longitude, latitude} |
| duration | number | 否 | 1000 | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 平滑移动的时间 |
| success | (result: any) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [MapContextFail](#mapcontextfail-values)) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 


#### removeGroundOverlay(options : MapContextRemoveGroundOverlayOptions) : void; @removegroundoverlay
removeGroundOverlay
移除自定义图片图层
##### removeGroundOverlay 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | 4.31 | 4.31 | x |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **MapContextRemoveGroundOverlayOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| id | string | 是 | - | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 图片图层 id |
| success | (result: any) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [MapContextFail](#mapcontextfail-values)) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 


#### removeMarkers(options : MapContextRemoveMarkersOptions) : void; @removemarkers
removeMarkers
移除 marker
##### removeMarkers 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | 4.31 | 4.31 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **MapContextRemoveMarkersOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| markerIds | Array&lt;number&gt; | 是 | - | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 要被删除的marker的id属性组成的数组 |
| success | (result: any) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [MapContextFail](#mapcontextfail-values)) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 


#### updateGroundOverlay(options : MapContextUpdateGroundOverlayOptions) : void; @updategroundoverlay
updateGroundOverlay
更新自定义图片图层。
##### updateGroundOverlay 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | 4.31 | 4.31 | x |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **MapContextUpdateGroundOverlayOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| id | string | 是 | - | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: x | 图片图层 id |
| src | string | 是 | - | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: x | 图片路径，支持网络图片、临时路径、代码包路径 |
| bounds | [Bounds](#bounds-values) | 是 | - | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: x | 图片覆盖的经纬度范围 |
| visible | boolean | 否 | true | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: x | 是否可见 |
| zIndex | number | 否 | 0 | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: x | 图层绘制顺序 |
| opacity | number | 否 | 1 | Web: -; 微信小程序: -; Android: 4.31; iOS: 4.31; HarmonyOS: x | 图层透明度 |
| success | (result: any) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [MapContextFail](#mapcontextfail-values)) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | null | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

 



### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.component.createMapContext)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/location/map.html#createmapcontext)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/media/map/MapContext.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=createMapContext&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=createMapContext&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=createMapContext&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=createMapContext&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=createMapContext)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=createMapContext&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)
