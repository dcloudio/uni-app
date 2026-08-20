::: sourceCode
## uni.onAppRoute(callback) @onapproute
:::

监听应用路由成功后的事件。


### onAppRoute 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 5.25 | 5.25 | 5.25 | 5.25 | 5.25 | 5.25 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| callback | (event: [AppRouteEvent](#approuteevent-values)) => void | 是 | 微信小程序: 4.41; 支付宝小程序: - | 应用路由事件回调 | 

### AppRouteEvent 的属性值 @approuteevent-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| path | string | 是 | 微信小程序: 4.41; 支付宝小程序: - | 路由页面路径，不包含开头的斜杠 |
| query | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 | 微信小程序: 4.41; 支付宝小程序: - | 路由页面参数 |
| openType | string | 是 | 微信小程序: 4.41; 支付宝小程序: - | 应用路由类型。 |
| notFound | boolean | 是 | 微信小程序: 4.41; 支付宝小程序: - | 路由页面是否不存在 |
| timeStamp | number | 是 | 微信小程序: 4.41; 支付宝小程序: - | 事件触发时的时间戳 |
| routeEventId | string | 是 | 微信小程序: 4.41; 支付宝小程序: - | 路由事件唯一标识 |
| page | IAnyObject | 否 | 微信小程序: 4.41; 支付宝小程序: - | 当前打开页面的相关配置<br/> |
| pipMode | string | 否 | 微信小程序: 4.41; 支付宝小程序: - | 可选值：<br/>- 'min': 视频页面缩小为小窗;<br/>- 'max': 视频小窗还原为页面;<br/> |
| renderer | string | 否 | 微信小程序: 4.41; 支付宝小程序: - | 渲染引擎<br/><br/>可选值：<br/>- 'webview': Webview 渲染引擎;<br/>- 'skyline': Skyline 渲染引擎;<br/>- 'xr-frame': xr-frame 解决方案;<br/> |
| webviewId | number | 否 | 微信小程序: 4.41; 支付宝小程序: - | 当前页面 id<br/> |

#### openType 的属性描述

| 合法值 |
| :- |
| appLaunch |
| navigateTo |
| navigateBack |
| redirectTo |
| reLaunch |
| switchTab |

#### pipMode 的属性描述

| 合法值 |
| :- |
| min |
| max |

#### renderer 的属性描述

| 合法值 |
| :- |
| webview |
| skyline |
| xr-frame |






<!-- UTSAPIJSON.onAppRoute.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.page.route.onAppRoute)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-route/wx.onAppRoute.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=onAppRoute&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=onAppRoute&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=onAppRoute&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=onAppRoute&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=onAppRoute)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=onAppRoute&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

::: sourceCode
## uni.offAppRoute(callback?) @offapproute
:::

取消监听应用路由事件。不传 callback 时移除全部监听器。


### offAppRoute 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 5.25 | 5.25 | 5.25 | 5.25 | 5.25 | 5.25 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| callback | (event: [AppRouteEvent](#approuteevent-values)) => void | 否 | 微信小程序: 4.41; 支付宝小程序: - | 

### AppRouteEvent 的属性值 @approuteevent-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| path | string | 是 | 微信小程序: 4.41; 支付宝小程序: - | 路由页面路径，不包含开头的斜杠 |
| query | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 | 微信小程序: 4.41; 支付宝小程序: - | 路由页面参数 |
| openType | string | 是 | 微信小程序: 4.41; 支付宝小程序: - | 应用路由类型。 |
| notFound | boolean | 是 | 微信小程序: 4.41; 支付宝小程序: - | 路由页面是否不存在 |
| timeStamp | number | 是 | 微信小程序: 4.41; 支付宝小程序: - | 事件触发时的时间戳 |
| routeEventId | string | 是 | 微信小程序: 4.41; 支付宝小程序: - | 路由事件唯一标识 |
| page | IAnyObject | 否 | 微信小程序: 4.41; 支付宝小程序: - | 当前打开页面的相关配置<br/> |
| pipMode | string | 否 | 微信小程序: 4.41; 支付宝小程序: - | 可选值：<br/>- 'min': 视频页面缩小为小窗;<br/>- 'max': 视频小窗还原为页面;<br/> |
| renderer | string | 否 | 微信小程序: 4.41; 支付宝小程序: - | 渲染引擎<br/><br/>可选值：<br/>- 'webview': Webview 渲染引擎;<br/>- 'skyline': Skyline 渲染引擎;<br/>- 'xr-frame': xr-frame 解决方案;<br/> |
| webviewId | number | 否 | 微信小程序: 4.41; 支付宝小程序: - | 当前页面 id<br/> |

#### openType 的属性描述

| 合法值 |
| :- |
| appLaunch |
| navigateTo |
| navigateBack |
| redirectTo |
| reLaunch |
| switchTab |

#### pipMode 的属性描述

| 合法值 |
| :- |
| min |
| max |

#### renderer 的属性描述

| 合法值 |
| :- |
| webview |
| skyline |
| xr-frame |






<!-- UTSAPIJSON.offAppRoute.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.page.route.offAppRoute)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-route/wx.offAppRoute.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=offAppRoute&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=offAppRoute&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=offAppRoute&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=offAppRoute&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=offAppRoute)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=offAppRoute&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

::: sourceCode
## uni.onBeforeAppRoute(callback) @onbeforeapproute
:::

监听应用路由发生前的事件。


### onBeforeAppRoute 兼容性 <Help /> 
| 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.25 | 5.25 | 5.25 | 5.25 | 5.25 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| callback | (event: [BeforeAppRouteEvent](#beforeapprouteevent-values)) => void | 是 | 微信小程序: 4.41; 支付宝小程序: - | 应用路由前置事件回调 | 

### BeforeAppRouteEvent 的属性值 @beforeapprouteevent-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| path | string | 是 | 微信小程序: 4.41; 支付宝小程序: - | 路由页面路径，不包含开头的斜杠 |
| query | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 | 微信小程序: 4.41; 支付宝小程序: - | 路由页面参数 |
| openType | string | 是 | 微信小程序: 4.41; 支付宝小程序: - | 应用路由类型。 |
| notFound | boolean | 是 | 微信小程序: 4.41; 支付宝小程序: - | 路由页面是否不存在 |
| routeEventId | string | 是 | 微信小程序: 4.41; 支付宝小程序: - | 路由事件唯一标识 |
| page | IAnyObject | 否 | 微信小程序: 4.41; 支付宝小程序: - | 当前打开页面的相关配置<br/> |
| pipMode | string | 否 | 微信小程序: 4.41; 支付宝小程序: - | 可选值：<br/>- 'min': 视频页面缩小为小窗;<br/>- 'max': 视频小窗还原为页面;<br/> |
| renderer | string | 否 | 微信小程序: 4.41; 支付宝小程序: - | 渲染引擎<br/><br/>可选值：<br/>- 'webview': Webview 渲染引擎;<br/>- 'skyline': Skyline 渲染引擎;<br/>- 'xr-frame': xr-frame 解决方案;<br/> |
| webviewId | number | 否 | 微信小程序: 4.41; 支付宝小程序: - | 当前页面 id<br/> |

#### openType 的属性描述

| 合法值 |
| :- |
| appLaunch |
| navigateTo |
| navigateBack |
| redirectTo |
| reLaunch |
| switchTab |

#### pipMode 的属性描述

| 合法值 |
| :- |
| min |
| max |

#### renderer 的属性描述

| 合法值 |
| :- |
| webview |
| skyline |
| xr-frame |






<!-- UTSAPIJSON.onBeforeAppRoute.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.page.route.onBeforeAppRoute)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-route/wx.onBeforeAppRoute.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=onBeforeAppRoute&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=onBeforeAppRoute&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=onBeforeAppRoute&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=onBeforeAppRoute&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=onBeforeAppRoute)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=onBeforeAppRoute&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

::: sourceCode
## uni.offBeforeAppRoute(callback?) @offbeforeapproute
:::

取消监听应用路由前置事件。不传 callback 时移除全部监听器。


### offBeforeAppRoute 兼容性 <Help /> 
| 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.25 | 5.25 | 5.25 | 5.25 | 5.25 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| callback | (event: [BeforeAppRouteEvent](#beforeapprouteevent-values)) => void | 否 | 微信小程序: 4.41; 支付宝小程序: - | 

### BeforeAppRouteEvent 的属性值 @beforeapprouteevent-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| path | string | 是 | 微信小程序: 4.41; 支付宝小程序: - | 路由页面路径，不包含开头的斜杠 |
| query | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 | 微信小程序: 4.41; 支付宝小程序: - | 路由页面参数 |
| openType | string | 是 | 微信小程序: 4.41; 支付宝小程序: - | 应用路由类型。 |
| notFound | boolean | 是 | 微信小程序: 4.41; 支付宝小程序: - | 路由页面是否不存在 |
| routeEventId | string | 是 | 微信小程序: 4.41; 支付宝小程序: - | 路由事件唯一标识 |
| page | IAnyObject | 否 | 微信小程序: 4.41; 支付宝小程序: - | 当前打开页面的相关配置<br/> |
| pipMode | string | 否 | 微信小程序: 4.41; 支付宝小程序: - | 可选值：<br/>- 'min': 视频页面缩小为小窗;<br/>- 'max': 视频小窗还原为页面;<br/> |
| renderer | string | 否 | 微信小程序: 4.41; 支付宝小程序: - | 渲染引擎<br/><br/>可选值：<br/>- 'webview': Webview 渲染引擎;<br/>- 'skyline': Skyline 渲染引擎;<br/>- 'xr-frame': xr-frame 解决方案;<br/> |
| webviewId | number | 否 | 微信小程序: 4.41; 支付宝小程序: - | 当前页面 id<br/> |

#### openType 的属性描述

| 合法值 |
| :- |
| appLaunch |
| navigateTo |
| navigateBack |
| redirectTo |
| reLaunch |
| switchTab |

#### pipMode 的属性描述

| 合法值 |
| :- |
| min |
| max |

#### renderer 的属性描述

| 合法值 |
| :- |
| webview |
| skyline |
| xr-frame |






<!-- UTSAPIJSON.offBeforeAppRoute.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.page.route.offBeforeAppRoute)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-route/wx.offBeforeAppRoute.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=offBeforeAppRoute&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=offBeforeAppRoute&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=offBeforeAppRoute&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=offBeforeAppRoute&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=offBeforeAppRoute)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=offBeforeAppRoute&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

::: sourceCode
## uni.rewriteRoute(options) @rewriteroute
:::

在应用路由前置事件回调中重写当前路由。


### rewriteRoute 兼容性 <Help /> 
| 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.25 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.25 | 5.25 | 5.25 |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **RewriteRouteOptions** | 是 | 支付宝小程序: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| url | string ([string.PageURIString](/uts/data-type.md#ide-string)) | 是 | 微信小程序: 4.41; 支付宝小程序: x | 重写后的页面路径 |
| preserveQuery | boolean | 否 | 微信小程序: 4.41; 支付宝小程序: x | 是否保留原路由参数，默认 false |
| success | (result: [RewriteRouteSuccess](#rewriteroutesuccess-values)) => void | 否 | 微信小程序: 4.41; 支付宝小程序: x | 接口调用成功的回调函数 |
| fail | (result: [RewriteRouteFail](#rewriteroutefail-values)) => void | 否 | 微信小程序: 4.41; 支付宝小程序: x | 接口调用失败的回调函数 |
| complete | (result: [RewriteRouteComplete](#rewriteroutecomplete-values)) => void | 否 | 微信小程序: 4.41; 支付宝小程序: x | 接口调用结束的回调函数 | 

#### RewriteRouteSuccess 的属性值 @rewriteroutesuccess-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| errMsg | string | 是 | 支付宝小程序: x |

#### RewriteRouteFail 的属性值 @rewriteroutefail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | 支付宝小程序: x | 路由错误码<br/>- 4: 框架内部异常 |
| errSubject | string | 是 | 支付宝小程序: x | 统一错误主题（模块）名称 |
| data | any | 否 | 支付宝小程序: x | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | 支付宝小程序: x |  |

#### RewriteRouteComplete 的属性值 @rewriteroutecomplete-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| errMsg | string | 是 | 支付宝小程序: x |






<!-- UTSAPIJSON.rewriteRoute.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.page.route.rewriteRoute)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.rewriteRoute.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=rewriteRoute&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=rewriteRoute&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=rewriteRoute&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=rewriteRoute&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=rewriteRoute)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=rewriteRoute&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- UTSAPIJSON.route.example -->

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | 微信小程序: 4.41; 支付宝小程序: - | 错误信息 |
