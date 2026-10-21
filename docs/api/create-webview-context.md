::: sourceCode
## uni.createWebViewContext(webviewId, component?) @createwebviewcontext

> GitCode: https://gitcode.com/dcloud/uni-component/tree/alpha/uni_modules/uni-web-view


> GitHub: https://github.com/dcloudio/uni-component/tree/alpha/uni_modules/uni-web-view

:::

创建 web-view 上下文 WebViewContext 对象。

参考：[web-view组件](../component/web-view.md)

在不传入第2个component参数时，默认从页面栈顶的页面来查找这个webviewContext。

在选项式和组合式中，获取组件实例略有差别。

- 选项式中，this代表当前vue实例。如果是在页面的export default内、函数外使用this，即代表该页面的组件实例。
```js
let v1 = uni.createWebViewContext("wv1", this) //获取id为wx1的web-view组件的context
```
- 组合式中，通过getCurrentInstance()!.proxy! 获取当前页面的组件实例。
```js
let v1 = uni.createWebViewContext("wv1", getCurrentInstance()!.proxy!) //获取id为wx1的web-view组件的context
```

由于本API仅在App端支持。也可以直接使用DOM API操作。UniWebViewElement比webviewContext有更多属性和方法。例如：
```js
let wv = uni.getElementById("wv1") as UniWebViewElement
```

### createWebViewContext 兼容性 <Help /> 
| Android | iOS | HarmonyOS |
| :- | :- | :- |
| 3.9.0 | 4.11 | 5.08 |


### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| webviewId | [string.WebviewIdString](/uts/data-type.md#ide-string) | 是 |
| component | [ComponentPublicInstance](/vue/options-api.md#component-instance) | 否 | 




### 返回值 

| 类型 | 必备 |
| :- | :- |
| [WebViewContext](#webviewcontext-values) | 否 |

#### WebViewContext 的方法 @webviewcontext-values 

#### back() : void @back
back
后退到 web-view 组件网页加载历史的上一页，如果不存在上一页则没有任何效果。
##### back 兼容性 <Help /> 
| Android | iOS | HarmonyOS |
| :- | :- | :- |
| 3.9.0 | 4.11 | 4.61 |




#### forward() : void @forward
forward
前进到 web-view 组件网页加载历史的下一页，如果不存在下一页则没有任何效果。
##### forward 兼容性 <Help /> 
| Android | iOS | HarmonyOS |
| :- | :- | :- |
| 3.9.0 | 4.11 | 4.61 |




#### reload() : void @reload
reload
重新加载 web-view 组件当前页面。
##### reload 兼容性 <Help /> 
| Android | iOS | HarmonyOS |
| :- | :- | :- |
| 3.9.0 | 4.11 | 4.61 |




#### stop() : void @stop
stop
停止加载 web-view 组件当前网页，该方法不能阻止已经加载的 html 文档，但是能够阻止未完成的图片及延迟加载的资源。
##### stop 兼容性 <Help /> 
| Android | iOS | HarmonyOS |
| :- | :- | :- |
| 3.9.0 | 4.11 | 4.61 |




#### evalJS(js : string) : void @evaljs
evalJS
在网页中执行指定的js脚本，在 uvue 页面中可通过此方法向 web-view 组件加载的页面发送数据
##### evalJS 兼容性 <Help /> 
| Android | iOS | HarmonyOS |
| :- | :- | :- |
| 3.9.0 | 4.11 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| js | string | 是 | 



#### getContentHeight() : number @getcontentheight
getContentHeight
获取webview内容高度
##### getContentHeight 兼容性 <Help /> 
| Android | iOS | HarmonyOS |
| :- | :- | :- |
| 4.63 | 4.63 | 5.08 |



##### 返回值 

| 类型 |
| :- |
| number |
 

#### loadData(options: UniWebviewContextLoadDataOptions) : void @loaddata
loadData
在web-view组件中加载页面内容
##### loadData 兼容性 <Help /> 
| Android | iOS | HarmonyOS |
| :- | :- | :- |
| 4.71 | 4.71 | 4.71 |

##### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| options | **UniWebviewContextLoadDataOptions** | 是 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| data | string | 是 | 要加载的内容，编码后的字符串 |
| baseURL | string | 否 | 页面的基础URL |
| mimeType | string | 否 | 加载的页面内容类型，默认值为"text/html" |
| encoding | string | 否 | 页面内容的编码类型，默认值为"utf-8" | 


 


<!-- UTSAPIJSON.createWebViewContext.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.component.createWebViewContext)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/create-webview-context.html#createwebviewcontext)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=createWebViewContext&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=createWebViewContext&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=createWebViewContext&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=createWebViewContext&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=createWebViewContext&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=createWebViewContext)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=createWebViewContext&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- UTSAPIJSON.createWebViewContext.example -->


<!-- ## uni.createWebviewContext(webviewId, component?) @createwebviewcontext -->

::: sourceCode
## uni.~~createWebviewContext(webviewId, component?)~~ @createwebviewcontext

> GitCode: https://gitcode.com/dcloud/uni-component/tree/alpha/uni_modules/uni-web-view


> GitHub: https://github.com/dcloudio/uni-component/tree/alpha/uni_modules/uni-web-view

:::

  **已废弃，仅为了向下兼容保留，建议使用`createWebViewContext`。
创建 web-view 上下文 WebviewContext 对象。**

早期，本API的大小写不规范，`createWebviewContext`的view的首字母`v`没有大写。

目前不规范的API已经废弃，推荐使用上方的`uni.createWebViewContext`。

- app-android 平台在蒸汽模式下仅支持`V`大写的方式 ，不再支持向下兼容写法。

### createWebviewContext 兼容性 <Help /> 
| Web | Android | iOS | HarmonyOS |
| :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 3.9.0 | 4.11 | 4.61 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| webviewId | [string.WebviewIdString](/uts/data-type.md#ide-string) | 是 | Web: x |
| component | [ComponentPublicInstance](/vue/options-api.md#component-instance) | 否 |   | 


### 返回值 

| 类型 | 必备 |
| :- | :- |
| [WebViewContext](#webviewcontext-values) | 否 |

#### WebViewContext 的方法 @webviewcontext-values 

#### back() : void @back
back
后退到 web-view 组件网页加载历史的上一页，如果不存在上一页则没有任何效果。
##### back 兼容性 <Help /> 
| Web | Android | iOS | HarmonyOS |
| :- | :- | :- | :- |
| x | 3.9.0 | 4.11 | 4.61 |




#### forward() : void @forward
forward
前进到 web-view 组件网页加载历史的下一页，如果不存在下一页则没有任何效果。
##### forward 兼容性 <Help /> 
| Web | Android | iOS | HarmonyOS |
| :- | :- | :- | :- |
| x | 3.9.0 | 4.11 | 4.61 |




#### reload() : void @reload
reload
重新加载 web-view 组件当前页面。
##### reload 兼容性 <Help /> 
| Web | Android | iOS | HarmonyOS |
| :- | :- | :- | :- |
| x | 3.9.0 | 4.11 | 4.61 |




#### stop() : void @stop
stop
停止加载 web-view 组件当前网页，该方法不能阻止已经加载的 html 文档，但是能够阻止未完成的图片及延迟加载的资源。
##### stop 兼容性 <Help /> 
| Web | Android | iOS | HarmonyOS |
| :- | :- | :- | :- |
| x | 3.9.0 | 4.11 | 4.61 |




#### evalJS(js : string) : void @evaljs
evalJS
在网页中执行指定的js脚本，在 uvue 页面中可通过此方法向 web-view 组件加载的页面发送数据
##### evalJS 兼容性 <Help /> 
| Web | Android | iOS | HarmonyOS |
| :- | :- | :- | :- |
| x | 3.9.0 | 4.11 | 4.61 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| js | string | 是 | Web: x | 



#### getContentHeight() : number @getcontentheight
getContentHeight
获取webview内容高度
##### getContentHeight 兼容性 <Help /> 
| Web | Android | iOS | HarmonyOS |
| :- | :- | :- | :- |
| x | 4.63 | 4.63 | 5.08 |



##### 返回值 

| 类型 |
| :- |
| number |
 

#### loadData(options: UniWebviewContextLoadDataOptions) : void @loaddata
loadData
在web-view组件中加载页面内容
##### loadData 兼容性 <Help /> 
| Web | Android | iOS | HarmonyOS |
| :- | :- | :- | :- |
| x | 4.71 | 4.71 | 4.71 |

##### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **UniWebviewContextLoadDataOptions** | 是 | Web: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| data | string | 是 | Web: x | 要加载的内容，编码后的字符串 |
| baseURL | string | 否 | Web: x | 页面的基础URL |
| mimeType | string | 否 | Web: x | 加载的页面内容类型，默认值为"text/html" |
| encoding | string | 否 | Web: x | 页面内容的编码类型，默认值为"utf-8" | 


 


<!-- UTSAPIJSON.createWebviewContext.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.component.createWebviewContext)

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |


示例代码另见[web-view组件](../component/web-view.md)
