## UniResizeObserver

用于监视 UniElement 元素的大小变化。它可以观察一个或多个

### UniResizeObserver 兼容性 <Help /> 
 | Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.16 | x | 4.13 | 4.18 | 4.61 |




### 构造函数
| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| callback | (entries: Array&lt;UniResizeObserverEntry&gt;) => void | 是 | 每当监视的元素调整大小时，回调该函数 |

### 构造函数
| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| callback | (entries: Array&lt;UniResizeObserverEntry&gt;, observer: [UniResizeObserver](/api/dom/uniresizeobserver.md)) => void | 是 | 每当监视的元素调整大小时，回调该函数 |


### UniResizeObserver 的方法 @uniresizeobserver-methods
#### disconnect(): void @disconnect

取消所有的对 UniElement 目标的监视

##### disconnect 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.16 | x | 4.13 | 4.18 | 4.61 |








#### observe(target: UniElement): void @observe

监视指定 UniElement 大小变化

##### observe 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.16 | x | 4.13 | 4.18 | 4.61 |


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| target | [UniElement](/api/dom/unielement.md) | 是 | Web: 4.0; 微信小程序: 4.41; Android: 4.0; iOS: 4.11; HarmonyOS: 4.61 | 被监视的 UniElement | 






#### unobserve(target: UniElement): void @unobserve

结束对指定的 UniElement 的监视

##### unobserve 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.16 | x | 4.13 | 4.18 | 4.61 |


##### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| target | [UniElement](/api/dom/unielement.md) | 是 | Web: 4.0; 微信小程序: 4.41; Android: 4.0; iOS: 4.11; HarmonyOS: 4.61 | 取消监视的 UniElement | 







