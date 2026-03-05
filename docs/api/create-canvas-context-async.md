<!-- ## uni.createCanvasContextAsync(options) @createcanvascontextasync -->

::: sourceCode
## uni.createCanvasContextAsync(options) @createcanvascontextasync

> GitCode: https://gitcode.com/dcloud/uni-component/tree/alpha/uni_modules/uni-canvas


> GitHub: https://github.com/dcloudio/uni-component/tree/alpha/uni_modules/uni-canvas

:::

获取CanvasContext对象实例


uni.createCanvasContextAsync 方法可以异步获取页面上指定id的canvas组件的上下文对象CanvasContext。

因微信小程序获取CanvasContext只能异步，所以为了跨端，本API也被设计成了异步API，需要在回调中获取CanvasContext。

获取到CanvasContext对象后，还需通过getContext("2d")方法获取[CanvasRenderingContext2D](./canvasrenderingcontext2d.md)对象。

如果不考虑小程序，那么Web和App其实支持通过uni.getElementById方式同步获取[UniCanvasElement](../dom/unicanvaselement.md)。

参考文档：
- [canvas组件文档](../component/canvas.md)
- [CanvasRenderingContext2D文档](./canvasrenderingcontext2d.md)

### createCanvasContextAsync 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.25 | 4.41 | 4.25 | 4.25 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **CreateCanvasContextAsyncOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| id | [string.IDString](/uts/data-type.md#ide-string) | 是 | - | Web: 4.25; 微信小程序: 4.41; Android: 4.25; iOS: 4.25; HarmonyOS: - | canvas 元素的 id 属性 |
| component | [ComponentPublicInstance](/vue/options-api.md#component-instance) | 否 | - | Web: 4.25; 微信小程序: 4.41; Android: 4.25; iOS: 4.25; HarmonyOS: - | 组件或页面实例，限定在什么范围内查找id |
| success | (context: [CanvasContext](#canvascontext-values)) => void | 否 | - | Web: 4.25; 微信小程序: 4.41; Android: 4.25; iOS: 4.25; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (error: [UniError](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror)) => void | 否 | - | Web: 4.25; 微信小程序: 4.41; Android: 4.25; iOS: 4.25; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | () => void | 否 | - | Web: 4.25; 微信小程序: 4.41; Android: 4.25; iOS: 4.25; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### CanvasContext 的方法 @canvascontext-values 

#### getContext(type: '2d'): CanvasRenderingContext2D \| null @getcontext
getContext

##### getContext 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| type | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 

##### 返回值 

| 类型 | 描述 | 必备 |
| :- | :- | :- |
| [CanvasRenderingContext2D](/api/canvasrenderingcontext2d.md) | canvas元素的绘图2D渲染上下文, 它用于绘制形状、文本、图像和其他对象 | 否 |
 

#### toBlob(callback: CanvasContextToBlobCallback, type?: string, quality?: number): void @toblob
toBlob
创造 Blob 对象
##### toBlob 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.25 | 4.41 | x | x | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (blob: Blob) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| type | string | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| quality | number | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### toDataURL(): string @todataurl
toDataURL
返回一个包含图片展示的 data URI
##### toDataURL 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.25 | 4.41 | 4.25 | 4.25 | 4.61 | 5.0 |


##### 返回值 

| 类型 |
| :- |
| string |
 

#### createImage(): Image @createimage
createImage
返回一个包含图片展示的 data URI
##### createImage 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.25 | 4.41 | 4.25 | 4.25 | 4.61 | 5.0 |


##### 返回值 

| 类型 | 描述 |
| :- | :- |
| [Image](/api/image.md) | 重复的图像源，支持代码包路径和本地临时路径 (本地路径) |
 

#### createPath2D(): Path2D @createpath2d
createPath2D
返回一个包含图片展示的 data URI
##### createPath2D 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.25 | 4.41 | 4.25 | 4.25 | 4.61 | 5.0 |


##### 返回值 

| 类型 |
| :- |
| [Path2D](/api/path2d.md) |
 

#### requestAnimationFrame(callback: RequestAnimationFrameCallback): number; @requestanimationframe
requestAnimationFrame
在下一次重绘之前，调用用户提供的回调函数
##### requestAnimationFrame 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.25 | 4.41 | 4.25 | 4.25 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (time: number) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 

##### 返回值 

| 类型 |
| :- |
| number |
 

#### cancelAnimationFrame(taskId: number): void; @cancelanimationframe
cancelAnimationFrame
取消一个先前通过调用 uni.requestAnimationFrame() 方法添加到计划中的动画帧请求
##### cancelAnimationFrame 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.25 | 4.41 | 4.25 | 4.25 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| taskId | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 





<!-- UTSAPIJSON.createCanvasContextAsync.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.canvas.createCanvasContextAsync)

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |



### 注意事项

- CanvasContext的toDataURL方法在 App-Android 平台暂不支持在页面的onLoad和组件的onMount生命周期中调用
