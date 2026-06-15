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
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.25 | 4.41 | 4.25 | 4.25 | 4.61 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **CreateCanvasContextAsyncOptions** | 是 |  |   |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| id | [string.IDString](/uts/data-type.md#ide-string) | 是 |  | Web: 4.25; 微信小程序: 4.41; Android: 4.25; iOS: 4.25; HarmonyOS:   | canvas 元素的 id 属性 |
| success | (context: JSAble) => void | 否 |  | Web: 4.25; 微信小程序: 4.41; Android: 4.25; iOS: 4.25; HarmonyOS:   | 接口调用成功的回调函数 |
| fail | (error: [UniError](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror)) => void | 否 |  | Web: 4.25; 微信小程序: 4.41; Android: 4.25; iOS: 4.25; HarmonyOS:   | 接口调用失败的回调函数 |
| complete | () => void | 否 |  | Web: 4.25; 微信小程序: 4.41; Android: 4.25; iOS: 4.25; HarmonyOS:   | 接口调用结束的回调函数（调用成功、失败都会执行） | 




<!-- UTSAPIJSON.createCanvasContextAsync.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.canvas.createCanvasContextAsync)

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 |  | Web:  ; 微信小程序: 4.41; Android:  ; iOS:  ; HarmonyOS:   | 错误信息 |



### 注意事项

- CanvasContext的toDataURL方法在 App-Android 平台暂不支持在页面的onLoad和组件的onMount生命周期中调用
