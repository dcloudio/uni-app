## UniNativeViewElement

native-view 元素对象

### UniNativeViewElement 兼容性 
 | Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | 4.31 | 4.31 | 4.61 | 5.0 |

```mermaid
graph LR
  
UniNativeViewElement -- Extends --> UniElement
  style UniElement color:#42b983
  click UniElement "https://doc.dcloud.net.cn/uni-app-x/api/dom/unielement.html"
```




### UniNativeViewElement 的方法 @uninativeviewelement-methods
#### bindAndroidView(view: View): void @bindandroidview

绑定安卓平台原生view

##### bindAndroidView 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | 4.31 | x | x | x |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| view | View | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: x; HarmonyOS: x |  | 






#### bindIOSView(view: UIView): void @bindiosview

绑定IOS平台原生view

##### bindIOSView 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| - | - | x | x | 4.31 | x | x |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| view | UIView | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x |  | 






#### bindHarmonyFrameNode(node: FrameNode): void @bindharmonyframenode

绑定鸿蒙 FrameNode

##### bindHarmonyFrameNode 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | x | x | 4.61 | x |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| node | FrameNode | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - |  | 






#### bindHarmonyWrappedBuilder\<O extends Object>(builder: WrappedBuilder\<\[options: O]>, options?: ESObject): BuilderNode\<[O] @bindharmonywrappedbuilder

绑定鸿蒙 wrapperBuilder

##### bindHarmonyWrappedBuilder 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | x | x | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| builder | WrappedBuilder\<\[options: O\] | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - |  |
| options | ESObject | 否 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - |  | 


##### 返回值 

| 类型 |
| :- |
| BuilderNode\<\[O\] |
 




#### getHarmonyFrameNode(): FrameNode \| null @getharmonyframenode

获取鸿蒙 FrameNode

##### getHarmonyFrameNode 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | x | x | 4.61 | x |




##### 返回值 

| 类型 | 必备 |
| :- | :- |
| FrameNode | 否 |
 




#### getHarmonyBuilderNode\<O extends Object>(): BuilderNode\<\[O] @getharmonybuildernode

获取鸿蒙 BuilderNode

##### getHarmonyBuilderNode 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | x | x | 4.61 | x |




##### 返回值 

| 类型 |
| :- |
| BuilderNode\<\[O\] |
 




#### bindHarmonyController\<T extends Object>(controller: T): void @bindharmonycontroller

绑定鸿蒙控制器

##### bindHarmonyController 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| - | - | x | x | 4.61 | 5.0 |


##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| controller | T | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - |  | 







<!-- CUSTOMTYPEJSON.UniNativeViewElement.example -->
