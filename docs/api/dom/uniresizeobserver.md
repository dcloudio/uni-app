## UniResizeObserver

用于监视 UniElement 元素的大小变化。它可以观察一个或多个

### UniResizeObserver 兼容性 
 | Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.16 | x | 4.13 | 4.18 | 4.61 | 5.0 |




### 构造函数
| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (entries: Array&lt;**UniResizeObserverEntry**&gt;) => void | 是 | - | - | 每当监视的元素调整大小时，回调该函数 |

#### callback 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| borderBoxSize | Array&lt;**UniBorderBoxSize**&gt; | 是 | - | Web: 4.16; 微信小程序: x; Android: 4.13; iOS: 4.18; HarmonyOS: 4.61 | 只读属性 包含被监视的元素带有边框box大小的数组。 |
| contentBoxSize | Array&lt;**UniContentBoxSize**&gt; | 是 | - | Web: 4.16; 微信小程序: x; Android: 4.13; iOS: 4.18; HarmonyOS: 4.61 | 只读属性 包含被监视的元素内容box大小的数组。 |
| devicePixelContentBoxSize | Array&lt;**UniDevicePixelContentBoxSize**&gt; | 是 | - | Web: 4.16; 微信小程序: x; Android: 4.13; iOS: 4.18; HarmonyOS: 4.61 | 只读属性 包含被监视的元素内容box设备像素大小的数组。 |
| contentRect | [DOMRect](/api/dom/domrect.md) | 是 | - | - | 只读属性 包含被监视元素大小的DOMRect |
| target | [UniElement](/api/dom/unielement.md) | 是 | - | - | 只读属性 被监视的 UniElement |

##### borderBoxSize 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| blockSize | number | 是 | - | - | 只读属性，被监视元素含边框box的高度 |
| inlineSize | number | 是 | - | - | 只读属性，被监视元素含边框box的宽度 |

##### contentBoxSize 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| blockSize | number | 是 | - | - | 只读属性，被监视元素内容box的高度 |
| inlineSize | number | 是 | - | - | 只读属性，被监视元素内容box的宽度 |

##### devicePixelContentBoxSize 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| blockSize | number | 是 | - | - | 只读属性，被监视元素内容box的设备像素高度 |
| inlineSize | number | 是 | - | - | 只读属性，被监视元素内容box的设备像素宽度 |

### 构造函数
| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (entries: Array&lt;**UniResizeObserverEntry**&gt;, observer: [UniResizeObserver](/api/dom/uniresizeobserver.md)) => void | 是 | - | - | 每当监视的元素调整大小时，回调该函数 |

#### callback 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| borderBoxSize | Array&lt;**UniBorderBoxSize**&gt; | 是 | - | Web: 4.16; 微信小程序: x; Android: 4.13; iOS: 4.18; HarmonyOS: 4.61 | 只读属性 包含被监视的元素带有边框box大小的数组。 |
| contentBoxSize | Array&lt;**UniContentBoxSize**&gt; | 是 | - | Web: 4.16; 微信小程序: x; Android: 4.13; iOS: 4.18; HarmonyOS: 4.61 | 只读属性 包含被监视的元素内容box大小的数组。 |
| devicePixelContentBoxSize | Array&lt;**UniDevicePixelContentBoxSize**&gt; | 是 | - | Web: 4.16; 微信小程序: x; Android: 4.13; iOS: 4.18; HarmonyOS: 4.61 | 只读属性 包含被监视的元素内容box设备像素大小的数组。 |
| contentRect | [DOMRect](/api/dom/domrect.md) | 是 | - | - | 只读属性 包含被监视元素大小的DOMRect |
| target | [UniElement](/api/dom/unielement.md) | 是 | - | - | 只读属性 被监视的 UniElement |

##### borderBoxSize 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| blockSize | number | 是 | - | - | 只读属性，被监视元素含边框box的高度 |
| inlineSize | number | 是 | - | - | 只读属性，被监视元素含边框box的宽度 |

##### contentBoxSize 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| blockSize | number | 是 | - | - | 只读属性，被监视元素内容box的高度 |
| inlineSize | number | 是 | - | - | 只读属性，被监视元素内容box的宽度 |

##### devicePixelContentBoxSize 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| blockSize | number | 是 | - | - | 只读属性，被监视元素内容box的设备像素高度 |
| inlineSize | number | 是 | - | - | 只读属性，被监视元素内容box的设备像素宽度 |


### UniResizeObserver 的方法 @uniresizeobserver-methods
#### disconnect(): void @disconnect

取消所有的对 UniElement 目标的监视

##### disconnect 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.16 | x | 4.13 | 4.18 | 4.61 |








#### observe(target: UniElement): void @observe

监视指定 UniElement 大小变化

##### observe 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.16 | x | 4.13 | 4.18 | 4.61 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| target | [UniElement](/api/dom/unielement.md) | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 被监视的 UniElement | 






#### unobserve(target: UniElement): void @unobserve

结束对指定的 UniElement 的监视

##### unobserve 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.16 | x | 4.13 | 4.18 | 4.61 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| target | [UniElement](/api/dom/unielement.md) | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.0; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 取消监视的 UniElement | 







