## ScrollViewContext

滚动组件的上下文对象，用于控制滚动位置、滚动行为、下拉刷新和下拉二级面板。<br/>通过 NodesRef.node 获取。<br/>App 蒸汽模式下适用于 scroll-view、list-view 和 waterflow。<br/>微信小程序适用于 scroll-view。

### ScrollViewContext 兼容性 <Help /> 
 Web: x; 微信小程序: √; Android(VDOM): x; Android(Vapor): 5.34; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.34




### ScrollViewContext 的属性值 @scrollviewcontext-values
| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| bounces | boolean | 是 | Web: x; 微信小程序: √; Android: x; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS: x | 设置滚动边界弹性 (仅在 iOS 下生效) |
| showScrollbar | boolean | 是 | Web: x; 微信小程序: √; Android(VDOM): x; Android(Vapor): 5.34; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.34 | 是否显示滚动条。 |
| scrollEnabled | boolean | 是 | Web: x; 微信小程序: √; Android(VDOM): x; Android(Vapor): 5.34; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.34 | 是否允许手势滚动；关闭后仍可调用滚动方法。 |
| pagingEnabled | boolean | 是 | Web: x; 微信小程序: √; Android(VDOM): x; Android(Vapor): 5.34; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.34 | 是否按页停靠。 |




<!-- CUSTOMTYPEJSON.ScrollViewContext.example -->

### ScrollViewContext 的方法 @scrollviewcontext-methods
#### scrollTo(options: ScrollViewScrollToOptions): void @scrollto

scrollTo

滚动到指定位置，越界时钳制到可滚动范围。

##### scrollTo 兼容性 <Help /> 
Web: x; 微信小程序: √; Android(VDOM): x; Android(Vapor): 5.34; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.34


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **ScrollViewScrollToOptions** | 是 | Web: x; 微信小程序: √; Android(VDOM): x; Android(Vapor): 5.34; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.34 | scrollTo 的目标坐标和动画配置。未指定的坐标保持当前位置。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| top | number | 否 | Web: x; 微信小程序: √; Android(VDOM): x; Android(Vapor): 5.34; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.34 | 垂直滚动位置，单位 px。 |
| left | number | 否 | Web: x; 微信小程序: √; Android(VDOM): x; Android(Vapor): 5.34; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.34 | 水平滚动位置，单位 px。 |
| animated | boolean | 否 | Web: x; 微信小程序: √; Android(VDOM): x; Android(Vapor): 5.34; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.34 | 未指定且未传 duration、velocity 时，使用组件的 scroll-with-animation 配置。 |
| duration | number | 否 | Web: x; 微信小程序: √; Android(VDOM): x; Android(Vapor): 5.34; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.34 | 动画时长，单位 ms；显式启用动画时默认 300，小于或等于 0 时立即定位。 |
| velocity | number | 否 | Web: x; 微信小程序: √; Android(VDOM): x; Android(Vapor): 5.34; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.34 | 动画初始速度，单位 px/s；负值按 0 处理。 | 








#### scrollIntoView(selector: string, options?: ScrollViewScrollIntoViewOptions): void @scrollintoview

scrollIntoView

滚动到当前容器内已渲染的目标节点。虚拟列表和瀑布流中的目标须已渲染。

##### scrollIntoView 兼容性 <Help /> 
Web: x; 微信小程序: √; Android(VDOM): x; Android(Vapor): 5.34; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.34


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| selector | string | 是 | Web: x |  |
| options | **ScrollViewScrollIntoViewOptions** | 否 | Web: x; 微信小程序: √; Android(VDOM): x; Android(Vapor): 5.34; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.34 | 滚动至容器内目标节点时的配置。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| alignment | string | 否 | Web: x; 微信小程序: √; Android(VDOM): x; Android(Vapor): 5.34; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.34 | 目标与容器视口的对齐方式；默认从起始位置对齐。 |
| offset | number | 否 | Web: x; 微信小程序: √; Android(VDOM): x; Android(Vapor): 5.34; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.34 | 对齐位置的偏移量，单位 px。 |
| animated | boolean | 否 | Web: x; 微信小程序: √; Android(VDOM): x; Android(Vapor): 5.34; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.34 | 是否使用动画；传入 options 且未指定时默认 true。 | 

##### alignment 的属性描述

| 合法值 | 兼容性 |
| :- |  :-: |
| "start" | Web: x |
| "center" | Web: x |
| "end" | Web: x |
| "nearest" | Web: x |








#### triggerRefresh(options?: ScrollViewRefreshOptions): void @triggerrefresh

triggerRefresh

触发下拉刷新。

##### triggerRefresh 兼容性 <Help /> 
Web: x; 微信小程序: √; Android(VDOM): x; Android(Vapor): 5.34; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.34


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **ScrollViewRefreshOptions** | 否 | Web: x; 微信小程序: √; Android(VDOM): x; Android(Vapor): 5.34; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.34 | triggerRefresh、triggerTwoLevel、closeTwoLevel 的动画配置。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| duration | number | 否 | Web: x; 微信小程序: √; Android(VDOM): x; Android(Vapor): 5.34; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.34 | 动画时长，单位 ms；刷新默认 300，二级面板默认 500。 |
| easingFunction | string | 否 | Web: x; 微信小程序: √; Android(VDOM): x; Android(Vapor): 5.34; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.34 | 动画曲线，默认 ease。 |

##### easingFunction 的属性描述

| 合法值 | 兼容性 |
| :- |  :-: |
| "linear" | Web: x |
| "ease" | Web: x |
| "ease-in" | Web: x |
| "ease-out" | Web: x |
| "ease-in-out" | Web: x | 








#### closeRefresh(): void @closerefresh

closeRefresh

关闭下拉刷新。

##### closeRefresh 兼容性 <Help /> 
Web: x; 微信小程序: √; Android(VDOM): x; Android(Vapor): 5.34; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.34










#### triggerTwoLevel(options?: ScrollViewRefreshOptions): void @triggertwolevel

triggerTwoLevel

打开下拉二级面板。

##### triggerTwoLevel 兼容性 <Help /> 
Web: x; 微信小程序: √; Android(VDOM): x; Android(Vapor): 5.34; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.34


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **ScrollViewRefreshOptions** | 否 | Web: x; 微信小程序: √; Android(VDOM): x; Android(Vapor): 5.34; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.34 | triggerRefresh、triggerTwoLevel、closeTwoLevel 的动画配置。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| duration | number | 否 | Web: x; 微信小程序: √; Android(VDOM): x; Android(Vapor): 5.34; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.34 | 动画时长，单位 ms；刷新默认 300，二级面板默认 500。 |
| easingFunction | string | 否 | Web: x; 微信小程序: √; Android(VDOM): x; Android(Vapor): 5.34; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.34 | 动画曲线，默认 ease。 |

##### easingFunction 的属性描述

| 合法值 | 兼容性 |
| :- |  :-: |
| "linear" | Web: x |
| "ease" | Web: x |
| "ease-in" | Web: x |
| "ease-out" | Web: x |
| "ease-in-out" | Web: x | 








#### closeTwoLevel(options?: ScrollViewRefreshOptions): void @closetwolevel

closeTwoLevel

关闭下拉二级面板。

##### closeTwoLevel 兼容性 <Help /> 
Web: x; 微信小程序: √; Android(VDOM): x; Android(Vapor): 5.34; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.34


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| options | **ScrollViewRefreshOptions** | 否 | Web: x; 微信小程序: √; Android(VDOM): x; Android(Vapor): 5.34; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.34 | triggerRefresh、triggerTwoLevel、closeTwoLevel 的动画配置。 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| duration | number | 否 | Web: x; 微信小程序: √; Android(VDOM): x; Android(Vapor): 5.34; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.34 | 动画时长，单位 ms；刷新默认 300，二级面板默认 500。 |
| easingFunction | string | 否 | Web: x; 微信小程序: √; Android(VDOM): x; Android(Vapor): 5.34; iOS(VDOM): x; iOS(Vapor): 5.34; HarmonyOS(VDOM): x; HarmonyOS(Vapor): 5.34 | 动画曲线，默认 ease。 |

##### easingFunction 的属性描述

| 合法值 | 兼容性 |
| :- |  :-: |
| "linear" | Web: x |
| "ease" | Web: x |
| "ease-in" | Web: x |
| "ease-out" | Web: x |
| "ease-in-out" | Web: x | 








