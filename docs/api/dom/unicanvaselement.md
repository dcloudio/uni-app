## UniCanvasElement

canvas 组件的 DOM 元素对象。

参考：[canvas组件](../component/canvas.md)

```mermaid
graph LR
  
UniCanvasElement -- Extends --> UniElement
  style UniElement color:#42b983
  click UniElement "https://doc.dcloud.net.cn/uni-app-x/api/dom/unielement.html"
```


### UniCanvasElement 的属性值 @unicanvaselement-values
| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| width | number | 是 | - | Web: 4.21; 微信小程序: x; Android: 4.25; iOS: 4.25; iOS uni-app x UTS 插件: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | Canvas宽度(注意:App平台只读不支持设置) |
| height | number | 是 | - | Web: 4.21; 微信小程序: x; Android: 4.25; iOS: 4.25; iOS uni-app x UTS 插件: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | Canvas高度(注意:App平台只读不支持设置) |


### UniCanvasElement 兼容性 
 | Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.21 | x | 4.25 | 4.25 | 4.25 | 4.61 | 5.0 |

<!-- CUSTOMTYPEJSON.UniCanvasElement.example -->

### UniCanvasElement 的方法 @unicanvaselement-methods
#### getContext(contentType: string): CanvasRenderingContext2D \| null @getcontext

返回 Canvas 的绘图上下文

##### getContext 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.21 | x | 4.25 | 4.25 | 4.25 | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| contentType | string | 是 | - | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - |  | 


##### 返回值 

| 类型 | 必备 |
| :- | :- |
| [CanvasRenderingContext2D](/api/canvasrenderingcontext2d.md) | 否 |
 




#### toBlob(callback: BlobCallback): void @toblob

创造 Blob 对象

##### toBlob 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.21 | x | x | x | x | x | x |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | BlobCallback | 是 | - | Web: -; 微信小程序: x; Android: x; iOS: x; HarmonyOS: x |  | 






#### toBlob(callback: BlobCallback, type: string): void @toblob



##### toBlob 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | - | - | - |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | BlobCallback | 是 | - | - | - |
| type | string | 是 | - | - | - | 






#### toBlob(callback: BlobCallback, type: string, quality: number): void @toblob



##### toBlob 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | - | - | - |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | BlobCallback | 是 | - | - | - |
| type | string | 是 | - | - | - |
| quality | number | 是 | - | - | - | 






#### toDataURL(type?: string \| null, encoderOptions?: any \| null): string @todataurl

返回一个包含图片展示的 data URI (iOS平台不支持webp格式)
如果画布的高度或宽度是 0，那么会返回字符串“data:,”。
如果传入的类型非“image/png”，但是返回的值以“data:image/png”开头，那么该传入的类型是不支持的。

##### toDataURL 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.21 | x | 4.25 | 4.25 | x | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| type | string | 否 | - | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - |  |
| encoderOptions | any | 否 | - | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - |  | 


##### 返回值 

| 类型 |
| :- |
| string |
 




<!-- CUSTOMTYPEJSON.UniCanvasElement.methods.toDataURL_1.name -->

<!-- CUSTOMTYPEJSON.UniCanvasElement.methods.toDataURL_1.description -->

<!-- CUSTOMTYPEJSON.UniCanvasElement.methods.toDataURL_1.compatibility -->

<!-- CUSTOMTYPEJSON.UniCanvasElement.methods.toDataURL_1.param -->

<!-- CUSTOMTYPEJSON.UniCanvasElement.methods.toDataURL_1.returnValue -->

<!-- CUSTOMTYPEJSON.UniCanvasElement.methods.toDataURL_1.tutorial -->

<!-- CUSTOMTYPEJSON.UniCanvasElement.methods.toDataURL_2.name -->

<!-- CUSTOMTYPEJSON.UniCanvasElement.methods.toDataURL_2.description -->

<!-- CUSTOMTYPEJSON.UniCanvasElement.methods.toDataURL_2.compatibility -->

<!-- CUSTOMTYPEJSON.UniCanvasElement.methods.toDataURL_2.param -->

<!-- CUSTOMTYPEJSON.UniCanvasElement.methods.toDataURL_2.returnValue -->

<!-- CUSTOMTYPEJSON.UniCanvasElement.methods.toDataURL_2.tutorial -->

**注意事项**
- toDataURL方法在 App-Android 平台暂不支持在页面的onLoad和组件的onMount生命周期中调用
