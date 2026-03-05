## UniPage



uni-app x中，每个页面都对应一个UniPage对象。

如果是dialogPage，也可以通过UniPage的getDialogPage方法获取。

通过UniPage对象，可以获取/修改页面的pageStyle，让pages.json中的页面设置可以动态修改；可以继续获取原生页面对象，如原生view；可以继续获取页面的vue示例，通过vm属性。

UniPage在App和Web平台较完善，在小程序端受小程序未开放，很多功能无法实现。具体见兼容性表格。




### UniPage 的属性值 @unipage-values
| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| route | string | 是 | - | Web: 4.31; 微信小程序: x; Android: 4.31; iOS: 4.31; iOS uni-app x UTS 插件: 4.31; HarmonyOS: 4.61 | 页面的路由地址 |
| options | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 | - | Web: 4.31; 微信小程序: x; Android: 4.31; iOS: 4.31; iOS uni-app x UTS 插件: 4.31; HarmonyOS: x | 页面的路由参数信息 |
| vm | **VueComponent** | 否 | - | Web: 4.31; 微信小程序: x; Android: 4.31; iOS: 4.31; iOS uni-app x UTS 插件: x; HarmonyOS: 4.61 | UniPage vue 实例对象 |
| pageBody | **UniPageBody** | 是 | - | Web: 4.51; 微信小程序: x; Android: 4.51; iOS: 4.51; HarmonyOS: 4.61 | UniPage 页面可使用区域信息，单位为px |
| safeAreaInsets | **UniSafeAreaInsets** | 是 | - | Web: 4.51; 微信小程序: x; Android: 4.51; iOS: 4.51; HarmonyOS: 4.61 | UniPage 安全区域插入位置（与屏幕边界的距离）信息 |
| fullscreenElement | [UniElement](/api/dom/unielement.md) | 否 | - | Web: x; 微信小程序: x; Android: 4.61; iOS: 4.61; HarmonyOS: 4.61 | 已经进入全屏状态的元素 |
| width | number | 是 | - | Web: 4.63; 微信小程序: 4.63; Android: 4.61; iOS: 4.61; iOS uni-app x UTS 插件: 4.61; HarmonyOS: 4.63 | 页面窗口宽度 |
| height | number | 是 | - | Web: 4.63; 微信小程序: 4.63; Android: 4.61; iOS: 4.61; iOS uni-app x UTS 插件: 4.61; HarmonyOS: 4.63 | 页面窗口高度 |
| statusBarHeight | number | 是 | - | Web: 4.63; 微信小程序: 4.63; Android: 4.61; iOS: 4.61; iOS uni-app x UTS 插件: 4.61; HarmonyOS: 4.63 | 页面状态栏高度 |
| ~~$vm~~ | [VueComponent](#vuecomponent-values) | 否 | - | Web: 4.31; 微信小程序: x; Android: 4.31; iOS: 4.31; iOS uni-app x UTS 插件: x; HarmonyOS: 4.61 | UniPage vue 实例对象 |

#### vm 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| $data | Map\<string, any> | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.11; iOS uni-app x UTS 插件: x; HarmonyOS: 4.61 |  |
| $props | Map\<string, any> | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.11; iOS uni-app x UTS 插件: x; HarmonyOS: 4.61 |  |
| $attrs | Map\<string, any> | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.11; iOS uni-app x UTS 插件: x; HarmonyOS: 4.61 |  |
| $slots | Map\<string, any> | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.11; iOS uni-app x UTS 插件: x; HarmonyOS: 4.61 |  |
| $refs | Map\<string, any> | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.11; iOS uni-app x UTS 插件: x; HarmonyOS: 4.61 |  |
| $parent | VueComponent | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.11; iOS uni-app x UTS 插件: x; HarmonyOS: 4.61 |  |
| $root | VueComponent | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.11; iOS uni-app x UTS 插件: x; HarmonyOS: 4.61 |  |
| $options | VueComponentOptions | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.11; iOS uni-app x UTS 插件: x; HarmonyOS: 4.61 |  |
| $el | [UniElement](/api/dom/unielement.md) | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.11; iOS uni-app x UTS 插件: x; HarmonyOS: 4.61 |  |
| $page | [UniPage](/api/unipage.md) | 是 | - | Web: 4.31; 微信小程序: -; Android: 4.31; iOS: 4.31; iOS uni-app x UTS 插件: x; HarmonyOS: - |  |

#### pageBody 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| left | number | 是 | - | Web: -; 微信小程序: -; Android: 4.51; iOS: 4.51; HarmonyOS: - | 页面内容区域左上角横坐标 |
| right | number | 是 | - | Web: -; 微信小程序: -; Android: 4.51; iOS: 4.51; HarmonyOS: - | 页面内容区域右下角横坐标 |
| top | number | 是 | - | Web: -; 微信小程序: -; Android: 4.51; iOS: 4.51; HarmonyOS: - | 页面内容区域左上角纵坐标 |
| bottom | number | 是 | - | Web: -; 微信小程序: -; Android: 4.51; iOS: 4.51; HarmonyOS: - | 页面内容区域右下角纵坐标 |
| width | number | 是 | - | Web: -; 微信小程序: -; Android: 4.51; iOS: 4.51; HarmonyOS: - | 页面内容区域宽度 |
| height | number | 是 | - | Web: -; 微信小程序: -; Android: 4.51; iOS: 4.51; HarmonyOS: - | 页面内容区域高度 |

#### safeAreaInsets 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| left | number | 是 | - | Web: -; 微信小程序: -; Android: 4.51; iOS: 4.51; HarmonyOS: - | 安全区域左侧插入位置（距离左边边界距离） |
| right | number | 是 | - | Web: -; 微信小程序: -; Android: 4.51; iOS: 4.51; HarmonyOS: - | 安全区域右侧插入位置（距离右边边界距离） |
| top | number | 是 | - | Web: -; 微信小程序: -; Android: 4.51; iOS: 4.51; HarmonyOS: - | 安全区顶部插入位置（距离顶部边界距离） |
| bottom | number | 是 | - | Web: -; 微信小程序: -; Android: 4.51; iOS: 4.51; HarmonyOS: - | 安全区域底部插入位置（距离底部边界距离） |


### UniPage 兼容性 
 | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | - | - | - |

### UniPage 的方法 @unipage-methods
#### getPageStyle(): UTSJSONObject @getpagestyle

获取当前页面样式。详细属性配置请参考PageStyle

pages.json里的页面配置，即page下的style节点的内容，可以通过本API获取。但注意这里获取的是UniPage上的最终生效值，不是pages.json里的原始配置。

##### getPageStyle 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.31 | x | 4.31 | 4.31 | 4.31 | 4.61 |




##### 返回值 

| 类型 |
| :- |
| [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) |
 




#### setPageStyle(style: UTSJSONObject): void @setpagestyle

设置当前页面样式。详细属性配置请参考PageStyle

pages.json里的内容是静态的，通过本API可以动态设置UniPage的Style，但并非所有页面样式都支持动态配置，具体见下PageStyle。

##### setPageStyle 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.31 | x | 4.31 | 4.31 | 4.31 | 4.61 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| style | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 | - | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - |  | 






::: warning 注意
- HBuilderX 4.31+，$getPageStyle和$setPageStyle不再需要加前缀$。
- 使用`选项式 API` 时，不可创建 `route`、`options` 同名响应式变量，否则会覆盖当前 `page 实例` 的同名属性。
- 4.31 前仅 `Web` 与 `iOS(非 uts 插件)` 端支持通过 `page.$vm` 获取 vue 实例。\
	4.31+ 仅 `iOS uts 插件` 环境不支持通过 `page.vm` 获取 vue 实例。
:::

**PageStyle**

支持当前页面 `style` 节点属性（注意并非所有 pages.json 的 pageStyle 都可以动态修改）

|属性                          |类型    |Android|iOS   |HarmonyOS|web  |默认值  |
|:-:                          |:-:    |:-:    |:-:  |:-:  |:-:  |:-:    |
|enablePullDownRefresh        |Boolean|4.13    |4.13  |4.61 |4.13  |false  |
|backgroundColorContent        |String  |4.15  |4.15  |4.61 |4.18  |#ffffff|
|navigationBarBackgroundColor  |String  |4.18  |4.18  |4.61 |4.18  |#007AFF|
|navigationBarTextStyle        |String  |4.18  |4.18  |4.61 |4.18  |white  |
|navigationBarTitleText        |String  |4.18  |4.18  |4.61 |4.18  |""    |
|navigationStyle              |String  |x      |x     |4.61 |4.18  |default|
|backgroundColor              |String  |4.18   |4.18  |4.61 |x     |#ffffff|
|backgroundTextStyle          |String  |4.31   |4.31  |x    |x     |dark  |
|onReachBottomDistance        |Number  |x      |x     |4.61 |4.18  |50      |
|pageOrientation              |String  |4.18   |4.25  |x    |x     |auto    |
|disableSwipeBack              |Boolean|x      |4.18  |x    |x     |false |
|hideStatusBar                  |Boolean|4.31  |x     |x    |x     |false|
|hideBottomNavigationIndicator  |Boolean|4.31  |x     |x    |x     |false|

**注意事项**
- web端由于会自动摇树优化未使用的特性，如果整个项目中都没有使用到下拉刷新`enablePullDownRefresh`，那么下拉刷新功能会被摇掉，此时设置打开下拉刷新将无效。
- app-android平台的页面是activity，不支持`backgroundColorContent`设为透明。
- 4.15版本前，app-ios平台在page.json 中设置页面 `enablePullDownRefresh` 为 `false` 时，无法通过 `$setPageStyle` 方法动态开启页面下拉刷新。新版已修复该问题。

#### getParentPage(): UniPage \| null @getparentpage

用于 dialogPage 获取所属父页面

##### getParentPage 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.31 | x | 4.31 | 4.31 | 4.31 | 4.61 |




##### 返回值 

| 类型 | 必备 |
| :- | :- |
| [UniPage](/api/unipage.md) | 否 |
 




#### getDialogPages(): UniPage[\] @getdialogpages

获取当前页面的 dialog 子页面集合

##### getDialogPages 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.31 | x | 4.31 | 4.31 | 4.31 | 4.61 |




##### 返回值 

| 类型 |
| :- |
| Array&lt;[UniPage](/api/unipage.md)&gt; |
 




#### getElementById(id: string.IDString \| string): UniElement \| null @getelementbyid

返回一个匹配特定 ID 的元素， 如果不存在，返回 null。\
如果需要获取指定的节点类型，需要使用 as 进行类型转换。\
ID 区分大小写，且应该是唯一的。如果存在多个匹配的元素，则返回第一个匹配的元素。


##### getElementById 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.31 | x | 4.31 | 4.31 | 4.61 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| id | [string.IDString](/uts/data-type.md#ide-string) \| string | 是 | - | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - |  | 


##### 返回值 

| 类型 | 描述 | 必备 |
| :- | :- | :- |
| [UniElement](/api/dom/unielement.md) | 所有组件的 DOM 元素对象基类，描述了 UVUE DOM 元素所普通具有的属性和方法。 | 否 |
 




#### getAndroidView(): View \| null @getandroidview

返回 android 平台页面根 view


##### getAndroidView 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | x | 4.31 | x | x |




##### 返回值 

| 类型 | 必备 |
| :- | :- |
| View | 否 |
 




#### getAndroidActivity(): Activity \| null @getandroidactivity

返回 android 平台加载页面内容的Activity


##### getAndroidActivity 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | x | 4.61 | x | x |




##### 返回值 

| 类型 | 必备 |
| :- | :- |
| Activity | 否 |
 




#### getIOSView(): UIView \| null @getiosview

返回 ios 平台页面根 view


##### getIOSView 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| x | x | x | x | 4.33 | x |




##### 返回值 

| 类型 | 必备 |
| :- | :- |
| UIView | 否 |
 




#### getHTMLElement(): UniElement \| null @gethtmlelement

返回页面 HTML Element 对象


##### getHTMLElement 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.31 | x | x | x | x |




##### 返回值 

| 类型 | 描述 | 必备 |
| :- | :- | :- |
| [UniElement](/api/dom/unielement.md) | 所有组件的 DOM 元素对象基类，描述了 UVUE DOM 元素所普通具有的属性和方法。 | 否 |
 





#### exitFullscreen(options: ExitFullscreenOptions \| null): void @exitfullscreen

将当前在全屏模式下显示的元素退出全屏模式，恢复全屏之前的状态


用于逆转先前调用 [UniElement.requestFullscreen](/dom/unielement.md#requestfullscreen) 的效果。

##### exitFullscreen 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| x | x | 4.61 | x | 4.61 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **ExitFullscreenOptions** | 否 | - | Web: x; 微信小程序: x; Android: -; iOS: x; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| success | () => void | 否 | - | Web: x; 微信小程序: x; Android: -; iOS: x; HarmonyOS: - | 成功回调 |
| fail | (error: [IFullscreenError](#ifullscreenerror-values)) => void | 否 | - | Web: x; 微信小程序: x; Android: -; iOS: x; HarmonyOS: - | 失败回调 |
| complete | (result?: any) => void | 否 | - | Web: x; 微信小程序: x; Android: -; iOS: x; HarmonyOS: - | 完成回调 | 

###### IFullscreenError 的属性值 @ifullscreenerror-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 错误码 |
| errSubject | string | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 106600 | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 当前页面已经有element处于全屏状态 |
| 106601 | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 当前element不支持全屏 |
| 106602 | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 当前页面没有element处于全屏状态 |
| 106603 | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 页面已销毁或者尚未就绪 |
| 106604 | Web: x; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 组件未就绪 |






#### createElement(tagName: string): UniElement @createelement

createElement

创建组件


##### createElement 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | x | x | x | 4.63 | x |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| tagName | string | 是 | - | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: - |  | 


##### 返回值 

| 类型 | 描述 |
| :- | :- |
| [UniElement](/api/dom/unielement.md) | 所有组件的 DOM 元素对象基类，描述了 UVUE DOM 元素所普通具有的属性和方法。 |
 




#### onLayoutChange(callback: UniPageOnLayoutChangeCallback): number @onlayoutchange

onLayoutChange

监听页面布局变化更新事件

##### onLayoutChange 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS 系统版本 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| - | - | x | x | 6.0 | x | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (res: [UniPagePerformanceTiming](#unipageperformancetiming-values)) => void | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x |  | 

##### UniPagePerformanceTiming 的属性值 @unipageperformancetiming-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| duration | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 性能计时持续的时间，单位为ms |


##### 返回值 

| 类型 |
| :- |
| number |
 




#### offLayoutChange(id: number): void @offlayoutchange

offLayoutChange

取消监听页面布局变化更新事件

##### offLayoutChange 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS 系统版本 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| - | - | x | x | 6.0 | x | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| id | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x |  | 






#### onRenderChange(callback: UniPageOnRenderChangeCallback): number @onrenderchange

onRenderChange

监听页面渲染变化更新事件

##### onRenderChange 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS 系统版本 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| - | - | x | x | 6.0 | x | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (res: [UniPagePerformanceRenderTiming](#unipageperformancerendertiming-values)) => void | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x |  | 

##### UniPagePerformanceRenderTiming 的属性值 @unipageperformancerendertiming-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| updateDuration | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 更新渲染属性的总时间，单位为ms |
| duration | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x | 性能计时持续的时间，单位为ms |


##### 返回值 

| 类型 |
| :- |
| number |
 




#### offRenderChange(id: number): void @offrenderchange

offRenderChange

取消监听页面渲染变化更新事件

##### offRenderChange 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS 系统版本 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| - | - | x | x | 6.0 | x | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| id | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x |  | 






#### onTouchStart(callback: UniPageOnTouchEventCallback): number @ontouchstart

onTouchStart

监听页面触摸开始事件

##### onTouchStart 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS 系统版本 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| - | - | x | x | 6.0 | x | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (event: [UniTouchEvent](/component/common.md#unitouchevent)) => void | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x |  | 


##### 返回值 

| 类型 |
| :- |
| number |
 




#### offTouchStart(id: number): void @offtouchstart

offTouchStart

取消监听页面触摸开始事件

##### offTouchStart 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS 系统版本 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| - | - | x | x | 6.0 | x | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| id | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x |  | 






#### onTouchEnd(callback: UniPageOnTouchEventCallback): number @ontouchend

onTouchEnd

监听页面触摸结束事件

##### onTouchEnd 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS 系统版本 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| - | - | x | x | 6.0 | x | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (event: [UniTouchEvent](/component/common.md#unitouchevent)) => void | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x |  | 


##### 返回值 

| 类型 |
| :- |
| number |
 




#### offTouchEnd(id: number): void @offtouchend

offTouchEnd

取消监听页面触摸结束事件

##### offTouchEnd 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS 系统版本 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| - | - | x | x | 6.0 | x | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| id | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x |  | 






#### querySelector(selector: string.cssSelectorString): UniElement \| null @queryselector

querySelector

返回页面中与指定选择器或选择器组匹配的第一个 Element对象。如果找不到匹配项，则返回null

##### querySelector 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) | HarmonyOS uni-app x UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- | :- |
| 5.0 | x | 5.0 | 5.0 | x | 5.0 | 5.0 | x |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| selector | [string.cssSelectorString](/uts/data-type.md#ide-string) | 是 | - | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | CSS 选择器字符串 | 


##### 返回值 

| 类型 | 描述 | 必备 |
| :- | :- | :- |
| [UniElement](/api/dom/unielement.md) | 所有组件的 DOM 元素对象基类，描述了 UVUE DOM 元素所普通具有的属性和方法。 | 否 |
 




#### querySelectorAll(selector: string.cssSelectorString): UniElement[\] @queryselectorall

querySelectorAll

返回页面中与指定选择器或选择器组匹配的元素列表。

##### querySelectorAll 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) | HarmonyOS uni-app x UTS 插件 |
| :- | :- | :- | :- | :- | :- | :- | :- |
| 5.0 | x | 5.0 | 5.0 | x | 5.0 | 5.0 | x |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| selector | [string.cssSelectorString](/uts/data-type.md#ide-string) | 是 | - | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | CSS 选择器字符串 | 


##### 返回值 

| 类型 |
| :- |
| Array&lt;[UniElement](/api/dom/unielement.md)&gt; |
 




#### ~~$setPageStyle(style: UTSJSONObject): void~~ @$setpagestyle

设置当前页面样式。详细属性配置请参考PageStyle  **已废弃，仅为了向下兼容保留**

##### $setPageStyle 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.13 | x | 4.13 | 4.13 | 4.61 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| style | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 | - | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - |  | 






#### ~~$getPageStyle(): UTSJSONObject~~ @$getpagestyle

获取当前页面样式。详细属性配置请参考PageStyle  **已废弃，仅为了向下兼容保留**

##### $getPageStyle 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.13 | x | 4.13 | 4.13 | 4.61 |




##### 返回值 

| 类型 |
| :- |
| [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) |
 




<!-- CUSTOMTYPEJSON.UniPage.example -->

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/get-current-pages/get-current-pages.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/get-current-pages/get-current-pages.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/get-current-pages/get-current-pages

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/get-current-pages/get-current-pages

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view class="page-scroll-view">
  <!-- #endif -->
    <view id="container">
      <page-head title="getCurrentPages"></page-head>
      <view class="uni-padding-wrap">
        <button @click="_getCurrentPages">getCurrentPages</button>
        <view v-if="data.pages.length" style="padding: 15px 0px">
          <text>当前页面栈中 {{ data.pages.length }} 个页面，列表如下：</text>
          <template v-for="(page, index) in data.pages" :key="page">
            <text style="margin-top: 5px">index: {{ index }}, route: {{ page }}</text>
          </template>
        </view>
        <button class="uni-common-mt" @click="check$page">page check $page</button>
        <!-- #ifndef MP -->
        <button class="uni-common-mt" @click="checkGetParentPage">
          check getParentPage
        </button>
        <button class="uni-common-mt" @click="checkGetDialogPages">
          check getDialogPages
        </button>
        <button id="check-get-element-by-id-btn" class="uni-common-mt" @click="checkGetElementById">
          check getElementById
        </button>
        <button class="uni-common-mt" @click="checkGetAndroidView">
          check getAndroidView
        </button>
        <button class="uni-common-mt" @click="checkGetIOSView">
          check getIOSView
        </button>
        <button class="uni-common-mt" @click="checkGetHTMLElement">
          check getHTMLElement
        </button>
        <button class="uni-common-mt" @click="checkQuerySelector">
          check querySelector
        </button>
        <button class="uni-common-mt" @click="checkQuerySelectorAll">
          check querySelectorAll
        </button>
        <!-- #endif -->
        <!-- #ifdef APP-ANDROID -->
        <button class="uni-common-mt" @click="checkGetAndroidActivity">
          check getAndroidActivity
        </button>
        <!-- #endif -->
      </view>
      <!-- #ifndef MP -->
      <page-head title="currentPageStyle"></page-head>
      <template v-for="(item, index) in data.PageStyleArray">
        <view class="page-style-item" v-if="data.currentPageStyle[item.key] != null" :key="index">
          <view class="item-text">
            <text class="item-text-key">{{ item.key }}:</text>
            <text class="item-text-value">{{
              data.currentPageStyle[item.key]
            }}</text>
          </view>
          <view class="set-value" v-if="item.type == 'boolean'">
            <switch :checked="data.currentPageStyle.getBoolean(item.key)"
              @change="switchChange(item.key, $event as UniSwitchChangeEvent)">
            </switch>
          </view>
          <view class="set-value" v-else-if="item.type == 'number'">
            <slider :value="data.currentPageStyle.getNumber(item.key)" :show-value="true"
              @change="sliderChange(item.key, $event as UniSliderChangeEvent)" />
          </view>
          <view class="set-value" v-else-if="item.type == 'string'">
            <radio-group class="radio-set-value" @change="radioChange(item.key, $event as RadioGroupChangeEvent)">
              <radio class="radio-value" v-for="(item2, index2) in item.value" :key="index2" :value="item2">{{ item2 }}
              </radio>
            </radio-group>
          </view>
        </view>
      </template>
      <!-- #ifndef APP-HARMONY -->
      <button style="margin: 10px" @click="goSetDisablePullDownRefresh">
        go set disable pullDownRefresh
      </button>
      <!-- #endif -->
      <!-- #endif -->
      <ComponentCheckPage ref="componentCheckPage" />
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import ComponentCheckPage from './component-check-page.uvue'
  import { PageStyleItem, PageStyleArray } from './page-style.uts';

  const currentInstance = getCurrentInstance()

  const componentCheckPage = ref<ComponentPublicInstance | null>(null)

  type DataType = {
    checked: boolean;
    pages: string[];
    PageStyleArray: PageStyleItem[];
    currentPageStyle: UTSJSONObject;
    testing: boolean;
  }

  const data = reactive({
    checked: false,
    pages: [] as string[],
    PageStyleArray: PageStyleArray,
    currentPageStyle: {},
    testing: false
  } as DataType)

  const pageStyleText = computed(() : string => {
    return JSON.stringify(data.currentPageStyle)
  })

  const getPageStyle = () : UTSJSONObject => {
    const pages: UniPage[] = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    data.currentPageStyle = currentPage.getPageStyle()
    console.log(data.currentPageStyle)
    return data.currentPageStyle;
  }

  const setPageStyle = (style : UTSJSONObject) => {
    console.log('setPageStyle:', style);
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    currentPage.setPageStyle(style);
  }

  // #ifndef MP
  onLoad(() => {
    getPageStyle();
  })
  // #endif

  onReady(() => {
    // #ifdef APP-ANDROID
    setPageStyle({
      'androidThreeButtonNavigationBackgroundColor': 'transparent',
      'androidThreeButtonNavigationStyle': 'black'
    });
    getPageStyle();
    // #endif
  })

  onPullDownRefresh(() => {
    setTimeout(() => {
      uni.stopPullDownRefresh()
    }, 2000)
  })
  const startPullDownRefresh = () => {
    uni.startPullDownRefresh()
  }
  const _getCurrentPages = () => {
    data.pages.length = 0
    const pages = getCurrentPages()
    data.pages.push(pages[0].route)
    if (data.pages[0].includes('/tabBar/') || data.pages[0] == '/') {
      data.checked = true
    }
    for (let i = 1; i < pages.length; i++) {
      data.pages.push(pages[i].route)
      if (pages[i].route.includes('/tabBar/')) {
        data.checked = false
      }
    }
  }

  const setStyleValue = (key : string, value : any) => {
    const style = {}
    style[key] = value
    setPageStyle(style)
    getPageStyle()
  }

  /// get-set-page-style
  const radioChange = (key : string, e : RadioGroupChangeEvent) => {
    setStyleValue(key, e.detail.value);
  }
  const sliderChange = (key : string, e : UniSliderChangeEvent) => {
    setStyleValue(key, e.detail.value);
  }
  const switchChange = (key : string, e : UniSwitchChangeEvent) => {
    setStyleValue(key, e.detail.value);
  }

  const goSetDisablePullDownRefresh = () => {
    uni.navigateTo({
      url: '/pages/API/get-current-pages/set-page-style-disable-pull-down-refresh'
    });
  }
  const getCurrentPage = () : UniPage => {
    const pages = getCurrentPages()
    return pages[pages.length - 1]
  }
  const check$page = () : boolean => {
    const page = getCurrentPage()
    const $page = currentInstance?.proxy?.$page
    let res = $page === page
    if (data.testing && res) {
      res = page.options['test'] == '123'
      if (res) {
        res = page.route == 'pages/API/get-current-pages/get-current-pages'
      }
    }
    console.log('check $page', res)
    uni.showToast(res ? { title: 'check success' } : { title: 'check fail', icon: 'error' })
    return res
  }
  const componentCheck$page = () : boolean => {
    const res = componentCheckPage.value?.$callMethod('check$page') as boolean
    console.log('component check $page', res)
    return res
  }
  const checkGetParentPage = () : boolean => {
    const page = getCurrentPage()
    const parentPage = page.getParentPage()
    const res = parentPage == null
    console.log('check getParentPage', res)
    uni.showToast(res ? { title: 'check success' } : { title: 'check fail', icon: 'error' })
    return res
  }
  const checkGetDialogPages = () : boolean => {
    const page = getCurrentPage()
    const dialogPages = page.getDialogPages()
    const res = Array.isArray(dialogPages) && dialogPages.length == 0
    uni.showToast(res ? { title: 'check success' } : { title: 'check fail', icon: 'error' })
    console.log('check getDialogPages', res)
    return res
  }
  const checkGetElementById = () : boolean => {
    const page = getCurrentPage()
    const element = page.getElementById('check-get-element-by-id-btn')
    let res = element != null
    // #ifndef APP-ANDROID
    if (res) {
      const elPage = element!.getPage()
      console.log('elPage', elPage)
      res = elPage === page
    }
    // #endif
    console.log('check getElementById', res)
    uni.showToast(res ? { title: 'check success' } : { title: 'check fail', icon: 'error' })
    return res
  }
  const checkGetAndroidView = () : boolean => {
    const page = getCurrentPage()
    const androidView = page.getAndroidView()
    const res = androidView != null
    console.log('check getAndroidView', res)
    uni.showToast(res ? { title: 'check success' } : { title: 'check fail', icon: 'error' })
    return res
  }
  const checkGetIOSView = () : boolean => {
    const page = getCurrentPage()
    const IOSView = page.getIOSView()
    const res = IOSView != null
    console.log('check getIOSView', res)
    uni.showToast(res ? { title: 'check success' } : { title: '仅 IOS uts 插件环境支持', icon: 'error' })
    return res
  }
  const checkGetHTMLElement = () : boolean => {
    const page = getCurrentPage()
    const HTMLView = page.getHTMLElement()
    const res = HTMLView != null
    console.log('check getHTMLElement', res)
    uni.showToast(res ? { title: 'check success' } : { title: 'check fail', icon: 'error' })
    return res
  }
  const checkGetAndroidActivity = () : boolean => {
    const page = getCurrentPage()
    const activity = page.getAndroidActivity()
    const res = activity != null
    console.log('check getAndroidActivity', res)
    uni.showToast(res ? { title: 'check success' } : { title: 'check fail', icon: 'error' })
    return res
  }

  const checkQuerySelector = () : boolean => {
    const page = getCurrentPage()
    const container = page.querySelector('#container')
    const doesNotExist = page.querySelector('#does-not-exist')
    const res = (container != null) && (doesNotExist == null)
    console.log('check checkQuerySelector', res)
    uni.showToast(res ? { title: 'check success' } : { title: 'check fail', icon: 'error' })
    return res
  }
  const checkQuerySelectorAll = () : boolean => {
    const page = getCurrentPage()
    const btnList = page.querySelectorAll('.uni-common-mt')
    const doesNotExistList = page.querySelectorAll('.does-not-exist')
    const res = (btnList.length > 1) && (doesNotExistList.length == 0)
    console.log('check checkQuerySelectorAll', res)
    uni.showToast(res ? { title: 'check success' } : { title: 'check fail', icon: 'error' })
    return res
  }

  defineExpose({
    data,
    pageStyleText,
    _getCurrentPages,
    getPageStyle,
    setPageStyle,
    startPullDownRefresh,
    check$page,
    componentCheck$page,
    checkGetParentPage,
    checkGetDialogPages,
    checkGetElementById,
    checkGetAndroidView,
    checkGetIOSView,
    checkGetHTMLElement,
    checkQuerySelector,
    checkQuerySelectorAll,
    checkGetAndroidActivity
  })
</script>

<style>
  .page {
    flex: 1;
    padding: 10px;
  }

  .page-style {
    margin-top: 15px;
  }

  .page-style-item {
    padding: 10px;
    margin-top: 10px;
    background-color: #ffffff;
    border-radius: 5px;
  }

  .item-text {
    flex-direction: row;
  }

  .item-text-key {
    font-weight: bold;
  }

  .item-text-value {
    margin-left: 5px;
  }

  .set-value {
    margin-top: 10px;
  }

  .radio-set-value {
    flex-direction: row;
  }

  .radio-value {
    margin-left: 10px;
  }
</style>

```

:::
