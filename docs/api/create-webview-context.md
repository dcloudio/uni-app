<!-- ## uni.createWebviewContext(webviewId, component?) @createwebviewcontext -->

::: sourceCode
## uni.createWebviewContext(webviewId, component?) @createwebviewcontext

> GitCode: https://gitcode.com/dcloud/uni-component/tree/alpha/uni_modules/uni-web-view


> GitHub: https://github.com/dcloudio/uni-component/tree/alpha/uni_modules/uni-web-view

:::

创建 web-view 组件的上下文对象，用于操作 web-view 的行为。

参考：[web-view组件](../component/web-view.md)

在不传入第2个component参数时，默认从页面栈顶的页面来查找这个webviewContext。

在选项式和组合式中，获取组件实例略有差别。

- 选项式中，this代表当前vue实例。如果是在页面的export default内、函数外使用this，即代表该页面的组件实例。
```js
let v1 = uni.createWebviewContext("wv1", this) //获取id为wx1的web-view组件的context
```
- 组合式中，通过getCurrentInstance()!.proxy! 获取当前页面的组件实例。
```js
let v1 = uni.createWebviewContext("wv1", getCurrentInstance()!.proxy!) //获取id为wx1的web-view组件的context
```

由于本API仅在App端支持。也可以直接使用DOM API操作。UniWebViewElement比webviewContext有更多属性和方法。例如：
```js
let wv = uni.getElementById("wv1") as UniWebViewElement
```


### createWebviewContext 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | - | 3.9.0 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| webviewId | [string.WebviewIdString](/uts/data-type.md#ide-string) | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| component | [ComponentPublicInstance](/vue/options-api.md#component-instance) | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


### 返回值 

| 类型 | 描述 | 必备 |
| :- | :- | :- |
| [WebviewContext](#webviewcontext-values) | web-view组件上下文对象 | 否 |

#### WebviewContext 的方法 @webviewcontext-values 

#### back() : void @back
back
后退到 web-view 组件网页加载历史的上一页，如果不存在上一页则没有任何效果。
##### back 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | - | 3.9.0 | 4.11 | 4.61 | 5.0 |



#### forward() : void @forward
forward
前进到 web-view 组件网页加载历史的下一页，如果不存在下一页则没有任何效果。
##### forward 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | - | 3.9.0 | 4.11 | 4.61 | 5.0 |



#### reload() : void @reload
reload
重新加载 web-view 组件当前页面。
##### reload 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | - | 3.9.0 | 4.11 | 4.61 | 5.0 |



#### stop() : void @stop
stop
停止加载 web-view 组件当前网页，该方法不能阻止已经加载的 html 文档，但是能够阻止未完成的图片及延迟加载的资源。
##### stop 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | - | 3.9.0 | 4.11 | 4.61 | 5.0 |



#### evalJS(js : string) : void @evaljs
evalJS
在网页中执行指定的js脚本，在 uvue 页面中可通过此方法向 web-view 组件加载的页面发送数据
##### evalJS 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | - | 3.9.0 | 4.11 | 4.61 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| js | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


#### loadData(options: UniWebviewContextLoadDataOptions) : void @loaddata
loadData
在web-view组件中加载页面内容
##### loadData 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| x | - | 4.71 | 4.71 | 4.71 | 5.0 |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **UniWebviewContextLoadDataOptions** | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| data | string | 是 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 要加载的内容，编码后的字符串 |
| baseURL | string | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 页面的基础URL |
| mimeType | string | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 加载的页面内容类型，默认值为"text/html" |
| encoding | string | 否 | - | Web: x; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 页面内容的编码类型，默认值为"utf-8" | 

 


<!-- UTSAPIJSON.createWebviewContext.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.component.createWebviewContext)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/create-webview-context.html#createwebviewcontext)

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |


示例代码另见[web-view组件](../component/web-view.md)
