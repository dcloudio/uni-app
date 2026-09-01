## 应用路由事件概述@app-route-event

应用路由事件用于从应用级别监听主页面路由的开始和完成，也可以在路由真正执行前重写目标页面。

它适合处理路由上报、全局状态重置、访问控制、无效入口页纠正和页面迁移等与“一次路由”相关的逻辑。如果逻辑只与单个页面的创建、显示或销毁有关，应优先使用对应的[页面生命周期](../page.md#lifecycle)。

应用路由事件只作用于主页面路由。[dialogPage](./dialog-page.md) 的打开、关闭以及随所属页面销毁，均不会触发本页 API。

### API 列表

| API | 说明 |
| --- | --- |
| `uni.onBeforeAppRoute` | 监听路由执行前的事件 |
| `uni.offBeforeAppRoute` | 取消监听路由执行前的事件 |
| `uni.onAppRoute` | 监听路由成功后的事件 |
| `uni.offAppRoute` | 取消监听路由成功后的事件 |
| `uni.rewriteRoute` | 在路由执行前重写本次路由 |

### 事件时序@route-event-timing

一次成功路由的主要执行顺序如下：

```text
发起路由
  -> 解析路径并校验目标
  -> onBeforeAppRoute
  -> 执行路由逻辑
  -> 目标页面 onShow
  -> onAppRoute
  -> 路由转场动画完成
```

新页面创建时，相关事件和页面生命周期的顺序为：

```text
onBeforeAppRoute -> onLoad -> onShow -> onAppRoute
```

返回已有页面或切换到已存在的 tabBar 页面时，不会再次触发 `onLoad`，顺序为：

```text
onBeforeAppRoute -> onShow -> onAppRoute
```

`onBeforeAppRoute` 在页面栈变化以及页面创建、销毁等实际副作用发生前触发。`onAppRoute` 在路由成功且目标页面的 `onShow` 执行后触发，不等待路由转场动画完成。

### 触发场景@route-event-scenes

| 场景 | `onBeforeAppRoute` | `onAppRoute` | 可重写 |
| --- | --- | --- | --- |
| 应用启动并进入有效首页或二级页面 | 触发 | 路由成功后触发 | 是 |
| 应用直接启动到不存在的页面 | 触发，`notFound` 为 `true`；支付宝小程序固定为 `false` | 未重写时按缺页流程触发；支付宝小程序不触发 | 支持 `rewriteRoute` 的平台可重写 |
| `navigateTo`、`redirectTo`、`reLaunch` 成功 | 触发 | 路由成功后触发 | 是 |
| 切换到其他 tabBar 页面 | 触发 | 路由成功后触发 | 是，且目标必须是 tabBar 页面 |
| `switchTab` 到当前 tabBar 页面 | 不触发 | 不触发 | 否 |
| `navigateBack`、系统返回、返回手势或 Web History 后退 | 触发 | 路由成功后触发 | 否 |
| 路由 API 参数错误或目标页面校验失败 | 不触发；支付宝小程序仍会触发，且 `notFound` 为 `false` | 不触发 | 否 |
| `onBeforeAppRoute` 已触发，但路由随后取消或执行失败 | 已触发 | 不触发 | 仅可在同步回调阶段重写 |
| 应用从后台恢复，但主页面路由未变化 | 不触发 | 不触发 | 否 |
| dialogPage 打开、关闭或随所属页面销毁 | 不触发 | 不触发 | 否 |

监听器注册前已经发生的事件不会补发。如需监听或重写 `appLaunch`，应在 `onLaunch` 生命周期中或之前尽早注册监听器。

### 事件参数@app-route-event-fields

`onBeforeAppRoute` 和 `onAppRoute` 的公共事件参数含义如下：

| 属性 | 说明 |
| --- | --- |
| `path` | 目标页面路径，不包含开头的 `/` |
| `query` | 当前轮路由解析得到的页面参数 |
| `openType` | 路由类型。发生重写时保持原路由类型不变 |
| `notFound` | 当前目标页面是否不存在 |
| `routeEventId` | 应用实例内唯一的路由事件标识 |

`onAppRoute` 还会提供 `timeStamp`，表示当前轮路由事件生成时的时间戳。

不同平台可能提供额外的事件字段。编写跨平台代码时，应只依赖本节列出的公共字段。

未发生重写时，同一次路由的 `onBeforeAppRoute` 与 `onAppRoute` 使用相同的 `routeEventId`。每次成功重写都会生成新的路由事件和新的 `routeEventId`，最终的 `onAppRoute` 使用最后一轮 `onBeforeAppRoute` 的 `routeEventId`。

正常调用路由 API 时，参数错误或目标页面不存在会直接失败。除支付宝小程序外，此类失败不会产生应用路由事件。`notFound` 主要用于应用直接启动到不存在页面等已经进入路由流程的场景。

### 路由类型@app-route-open-type

| `openType` | 路由来源 |
| --- | --- |
| `appLaunch` | 应用首次启动；Web 直接访问首页或二级页面等入口路由 |
| `navigateTo` | `uni.navigateTo`；Web History 前进；无法识别为其他类型的新增页面路由 |
| `navigateBack` | `uni.navigateBack`；系统返回、返回手势；Web History 后退；小程序系统返回 |
| `redirectTo` | `uni.redirectTo` |
| `reLaunch` | `uni.reLaunch` |
| `switchTab` | `uni.switchTab`；用户切换到其他 tabBar 页面 |

::: warning 平台差异

- 微信小程序的路由事件监听要求基础库 3.5.5 及以上版本；`rewriteRoute` 要求基础库 3.8.0 及以上版本，并受微信客户端版本、运行平台和分包限制。微信开发者工具模拟器不支持 `rewriteRoute`，应在支持该能力的真机环境中验证。
- 支付宝小程序通过 `my.createRouteObserver` 实现路由事件监听。支付宝小程序开发者工具目前未提供 `my.createRouteObserver`，无法在开发者工具中验证路由事件监听相关 API，应在支持该能力的支付宝客户端真机环境中验证。支付宝的前置事件不提供目标页面是否存在的信息，因此 `onBeforeAppRoute` 的 `notFound` 固定为 `false`。当路由 API 的目标页面不存在时，支付宝仍会触发 `onBeforeAppRoute`，但不会触发 `onAppRoute`；应用直接启动到不存在的页面时同样不会触发 `onAppRoute`。支付宝小程序暂不支持 `rewriteRoute`。

:::

::: sourceCode
## uni.onAppRoute(callback) @onapproute
:::

监听应用路由成功后的事件。


### onAppRoute 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.25 | 5.25 | 5.25 | 5.25 | 5.25 |


### 参数 

| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| callback | (event: [AppRouteEvent](#approuteevent-values)) => void | 是 | 应用路由事件回调 | 

### AppRouteEvent 的属性值 @approuteevent-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| path | string | 是 | Web: 5.25; 微信小程序: 5.25; Android: 5.25; iOS: 5.25; HarmonyOS: 5.25 | 路由页面路径，不包含开头的斜杠 |
| query | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 | Web: 5.25; 微信小程序: 5.25; Android: 5.25; iOS: 5.25; HarmonyOS: 5.25 | 路由页面参数 |
| openType | string | 是 | Web: 5.25; 微信小程序: 5.25; Android: 5.25; iOS: 5.25; HarmonyOS: 5.25 | 应用路由类型。 |
| notFound | boolean | 是 | Web: 5.25; 微信小程序: 5.25; Android: 5.25; iOS: 5.25; HarmonyOS: 5.25 | 路由页面是否不存在。支付宝小程序不提供该信息，固定为 false |
| timeStamp | number | 是 | Web: 5.25; 微信小程序: 5.25; Android: 5.25; iOS: 5.25; HarmonyOS: 5.25 | 事件触发时的时间戳 |
| routeEventId | string | 是 | Web: 5.25; 微信小程序: 5.25; Android: 5.25; iOS: 5.25; HarmonyOS: 5.25 | 路由事件唯一标识 |
| page | IAnyObject | 否 | 微信小程序: 4.41 | 当前打开页面的相关配置<br/> |
| pipMode | string | 否 | 微信小程序: 4.41 | 可选值：<br/>- 'min': 视频页面缩小为小窗;<br/>- 'max': 视频小窗还原为页面;<br/> |
| renderer | string | 否 | 微信小程序: 4.41 | 渲染引擎<br/><br/>可选值：<br/>- 'webview': Webview 渲染引擎;<br/>- 'skyline': Skyline 渲染引擎;<br/>- 'xr-frame': xr-frame 解决方案;<br/> |
| webviewId | number | 否 | 微信小程序: 4.41 | 当前页面 id<br/> |

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
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.page.app-route.onAppRoute)
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

### 使用说明@on-app-route-usage

`onAppRoute` 只描述最终实际生效的路由。一次路由发生重写时，被替换的中间目标不会触发 `onAppRoute`，只有最终成功进入的页面触发一次。

监听器抛出的异常不会中断底层路由流程，但应在监听器内部妥善处理业务异常。

```uts
const appRouteCallback = (event : AppRouteEvent) => {
  console.log(`路由完成：${event.openType} ${event.path}`)
  console.log(`路由参数：${JSON.stringify(event.query)}`)
}

uni.onAppRoute(appRouteCallback)

// 不再监听时，传入注册时的同一个函数对象。
uni.offAppRoute(appRouteCallback)
```

::: sourceCode
## uni.offAppRoute(callback?) @offapproute
:::

取消监听应用路由事件。不传 callback 时移除全部监听器。


### offAppRoute 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.25 | 5.25 | 5.25 | 5.25 | 5.25 |


### 参数 

| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| callback | (event: [AppRouteEvent](#approuteevent-values)) => void | 否 | 应用路由事件回调 | 

### AppRouteEvent 的属性值 @approuteevent-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| path | string | 是 | Web: 5.25; 微信小程序: 5.25; Android: 5.25; iOS: 5.25; HarmonyOS: 5.25 | 路由页面路径，不包含开头的斜杠 |
| query | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 | Web: 5.25; 微信小程序: 5.25; Android: 5.25; iOS: 5.25; HarmonyOS: 5.25 | 路由页面参数 |
| openType | string | 是 | Web: 5.25; 微信小程序: 5.25; Android: 5.25; iOS: 5.25; HarmonyOS: 5.25 | 应用路由类型。 |
| notFound | boolean | 是 | Web: 5.25; 微信小程序: 5.25; Android: 5.25; iOS: 5.25; HarmonyOS: 5.25 | 路由页面是否不存在。支付宝小程序不提供该信息，固定为 false |
| timeStamp | number | 是 | Web: 5.25; 微信小程序: 5.25; Android: 5.25; iOS: 5.25; HarmonyOS: 5.25 | 事件触发时的时间戳 |
| routeEventId | string | 是 | Web: 5.25; 微信小程序: 5.25; Android: 5.25; iOS: 5.25; HarmonyOS: 5.25 | 路由事件唯一标识 |
| page | IAnyObject | 否 | 微信小程序: 4.41 | 当前打开页面的相关配置<br/> |
| pipMode | string | 否 | 微信小程序: 4.41 | 可选值：<br/>- 'min': 视频页面缩小为小窗;<br/>- 'max': 视频小窗还原为页面;<br/> |
| renderer | string | 否 | 微信小程序: 4.41 | 渲染引擎<br/><br/>可选值：<br/>- 'webview': Webview 渲染引擎;<br/>- 'skyline': Skyline 渲染引擎;<br/>- 'xr-frame': xr-frame 解决方案;<br/> |
| webviewId | number | 否 | 微信小程序: 4.41 | 当前页面 id<br/> |

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
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.page.app-route.offAppRoute)
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

### 移除监听器@off-app-route-usage

传入监听函数时，只移除同一个函数对象对应的监听器；不传参数或传入 `null` 时，移除通过 `onAppRoute` 注册的全部监听器。

```uts
const callback1 = (event : AppRouteEvent) => {
  console.log(event.path)
}
const callback2 = (event : AppRouteEvent) => {
  console.log(event.openType)
}

uni.onAppRoute(callback1)
uni.onAppRoute(callback2)

// 只移除 callback1。
uni.offAppRoute(callback1)

// 移除全部 onAppRoute 监听器。
uni.offAppRoute()
```

`onAppRoute` 和 `onBeforeAppRoute` 的监听器相互独立，清空其中一类不会影响另一类。

::: sourceCode
## uni.onBeforeAppRoute(callback) @onbeforeapproute
:::

监听应用路由发生前的事件。


### onBeforeAppRoute 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.25 | 5.25 | 5.25 | 5.25 | 5.25 |


### 参数 

| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| callback | (event: [BeforeAppRouteEvent](#beforeapprouteevent-values)) => void | 是 | 应用路由前置事件回调 | 

### BeforeAppRouteEvent 的属性值 @beforeapprouteevent-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| path | string | 是 | Web: 5.25; 微信小程序: 5.25; Android: 5.25; iOS: 5.25; HarmonyOS: 5.25 | 路由页面路径，不包含开头的斜杠 |
| query | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 | Web: 5.25; 微信小程序: 5.25; Android: 5.25; iOS: 5.25; HarmonyOS: 5.25 | 路由页面参数 |
| openType | string | 是 | Web: 5.25; 微信小程序: 5.25; Android: 5.25; iOS: 5.25; HarmonyOS: 5.25 | 应用路由类型。 |
| notFound | boolean | 是 | Web: 5.25; 微信小程序: 5.25; Android: 5.25; iOS: 5.25; HarmonyOS: 5.25 | 路由页面是否不存在。支付宝小程序不提供该信息，固定为 false |
| routeEventId | string | 是 | Web: 5.25; 微信小程序: 5.25; Android: 5.25; iOS: 5.25; HarmonyOS: 5.25 | 路由事件唯一标识 |
| page | IAnyObject | 否 | 微信小程序: 4.41 | 当前打开页面的相关配置<br/> |
| pipMode | string | 否 | 微信小程序: 4.41 | 可选值：<br/>- 'min': 视频页面缩小为小窗;<br/>- 'max': 视频小窗还原为页面;<br/> |
| renderer | string | 否 | 微信小程序: 4.41 | 渲染引擎<br/><br/>可选值：<br/>- 'webview': Webview 渲染引擎;<br/>- 'skyline': Skyline 渲染引擎;<br/>- 'xr-frame': xr-frame 解决方案;<br/> |
| webviewId | number | 否 | 微信小程序: 4.41 | 当前页面 id<br/> |

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
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.page.app-route.onBeforeAppRoute)
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

### 使用说明@on-before-app-route-usage

`onBeforeAppRoute` 回调同步执行。可以根据目标页面、路由参数和路由类型记录信息，也可以在该回调中同步调用 `rewriteRoute`。

```uts
const beforeAppRouteCallback = (event : BeforeAppRouteEvent) => {
  console.log(`准备路由：${event.openType} ${event.path}`)
  console.log(`路由参数：${JSON.stringify(event.query)}`)
}

// 如需处理 appLaunch，应在 App.uvue 的 onLaunch 中尽早注册。
onLaunch(() => {
  uni.onBeforeAppRoute(beforeAppRouteCallback)
})
```

同一个 `routeEventId` 对应的 `onBeforeAppRoute` 最多触发一次。重写后的目标会作为新一轮路由再次触发 `onBeforeAppRoute`，并使用新的 `routeEventId`。

::: sourceCode
## uni.offBeforeAppRoute(callback?) @offbeforeapproute
:::

取消监听应用路由前置事件。不传 callback 时移除全部监听器。


### offBeforeAppRoute 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.25 | 5.25 | 5.25 | 5.25 | 5.25 |


### 参数 

| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| callback | (event: [BeforeAppRouteEvent](#beforeapprouteevent-values)) => void | 否 | 应用路由前置事件回调 | 

### BeforeAppRouteEvent 的属性值 @beforeapprouteevent-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| path | string | 是 | Web: 5.25; 微信小程序: 5.25; Android: 5.25; iOS: 5.25; HarmonyOS: 5.25 | 路由页面路径，不包含开头的斜杠 |
| query | [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) | 是 | Web: 5.25; 微信小程序: 5.25; Android: 5.25; iOS: 5.25; HarmonyOS: 5.25 | 路由页面参数 |
| openType | string | 是 | Web: 5.25; 微信小程序: 5.25; Android: 5.25; iOS: 5.25; HarmonyOS: 5.25 | 应用路由类型。 |
| notFound | boolean | 是 | Web: 5.25; 微信小程序: 5.25; Android: 5.25; iOS: 5.25; HarmonyOS: 5.25 | 路由页面是否不存在。支付宝小程序不提供该信息，固定为 false |
| routeEventId | string | 是 | Web: 5.25; 微信小程序: 5.25; Android: 5.25; iOS: 5.25; HarmonyOS: 5.25 | 路由事件唯一标识 |
| page | IAnyObject | 否 | 微信小程序: 4.41 | 当前打开页面的相关配置<br/> |
| pipMode | string | 否 | 微信小程序: 4.41 | 可选值：<br/>- 'min': 视频页面缩小为小窗;<br/>- 'max': 视频小窗还原为页面;<br/> |
| renderer | string | 否 | 微信小程序: 4.41 | 渲染引擎<br/><br/>可选值：<br/>- 'webview': Webview 渲染引擎;<br/>- 'skyline': Skyline 渲染引擎;<br/>- 'xr-frame': xr-frame 解决方案;<br/> |
| webviewId | number | 否 | 微信小程序: 4.41 | 当前页面 id<br/> |

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
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.page.app-route.offBeforeAppRoute)
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

### 移除监听器@off-before-app-route-usage

`offBeforeAppRoute` 的移除规则与 `offAppRoute` 相同：传入注册时的同一个函数对象，只移除该监听器；不传参数或传入 `null`，移除全部前置路由监听器。

```uts
const beforeAppRouteCallback = (event : BeforeAppRouteEvent) => {
  console.log(event.path)
}

uni.onBeforeAppRoute(beforeAppRouteCallback)
uni.offBeforeAppRoute(beforeAppRouteCallback)

// 移除全部 onBeforeAppRoute 监听器。
uni.offBeforeAppRoute()
```

::: sourceCode
## uni.rewriteRoute(options) @rewriteroute
:::

在应用路由前置事件回调中重写当前路由。


### rewriteRoute 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 5.25 | 5.25 | 5.25 | 5.25 | 5.25 |


### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| options | **RewriteRouteOptions** | 是 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| url | string ([string.PageURIString](/uts/data-type.md#ide-string)) | 是 | Web: 5.25; 微信小程序: 5.25; Android: 5.25; iOS: 5.25; HarmonyOS: 5.25 | 重写后的页面路径 |
| preserveQuery | boolean | 否 | Web: 5.25; 微信小程序: 5.25; Android: 5.25; iOS: 5.25; HarmonyOS: 5.25 | 是否保留原路由参数，默认 false |
| success | (result: [RewriteRouteSuccess](#rewriteroutesuccess-values)) => void | 否 | Web: 5.25; 微信小程序: 5.25; Android: 5.25; iOS: 5.25; HarmonyOS: 5.25 | 接口调用成功的回调函数 |
| fail | (result: [RewriteRouteFail](#rewriteroutefail-values)) => void | 否 | Web: 5.25; 微信小程序: 5.25; Android: 5.25; iOS: 5.25; HarmonyOS: 5.25 | 接口调用失败的回调函数 |
| complete | (result: [RewriteRouteComplete](#rewriteroutecomplete-values)) => void | 否 | Web: 5.25; 微信小程序: 5.25; Android: 5.25; iOS: 5.25; HarmonyOS: 5.25 | 接口调用结束的回调函数 | 

#### RewriteRouteSuccess 的属性值 @rewriteroutesuccess-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

#### RewriteRouteFail 的属性值 @rewriteroutefail-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errCode | number | 是 | 路由错误码<br/>- 4: 框架内部异常 |
| errSubject | string | 是 | 统一错误主题（模块）名称 |
| data | any | 否 | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 |  |

#### RewriteRouteComplete 的属性值 @rewriteroutecomplete-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |






<!-- UTSAPIJSON.rewriteRoute.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.page.app-route.rewriteRoute)
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

### 路由重写规则@rewrite-route-rules

`rewriteRoute` 用于重写当前正在处理的路由事件，且不支持 Promise 风格调用。调用时需遵守以下规则：

- 只能在 `onBeforeAppRoute` 回调中同步调用。在回调外调用，或在回调中的异步任务内调用，都会失败。
- 同一个 `routeEventId` 只允许成功重写一次。存在多个前置监听器时，首次重写成功后，同一轮的后续重写调用会失败。
- 重写只改变目标路径和参数，不改变原路由的 `openType`。
- `navigateBack` 路由不允许重写。
- 重写后的目标必须符合原路由类型的约束。例如，`switchTab` 只能重写到 tabBar 页面，`navigateTo` 不能重写到 tabBar 页面。
- 重写目标会重新执行路径、页面存在性和路由类型校验。校验失败时保留当前轮的原目标，并通过 `fail` 返回失败信息。
- 框架会限制连续重写次数以避免循环重写，超过限制时本次重写失败。微信小程序直接使用宿主的重写能力，遵循微信小程序的限制。

`preserveQuery` 默认为 `false`：

- 为 `false` 时，使用 `url` 中携带的参数。
- 为 `true` 时，完整保留当前路由事件的参数，并丢弃 `url` 中携带的参数。

例如，当前目标参数为 `a=1`，重写地址为 `/pages/new/new?b=2`。`preserveQuery` 为 `false` 时最终参数为 `b=2`；为 `true` 时最终参数为 `a=1`。

```uts
const beforeAppRouteCallback = (event : BeforeAppRouteEvent) => {
  if (
    event.openType == 'navigateTo' &&
    event.path == 'pages/old/old'
  ) {
    uni.rewriteRoute({
      url: '/pages/new/new?from=rewrite',
      preserveQuery: false,
      success: (result) => {
        console.log(result.errMsg)
      },
      fail: (error) => {
        console.error(error.errMsg)
      },
      complete: (result) => {
        console.log(result.errMsg)
      }
    })
  }
}

uni.onBeforeAppRoute(beforeAppRouteCallback)
```

`success` 表示本次重写请求已被接受；`fail` 表示本次重写被拒绝；无论成功或失败都会调用 `complete`。

### 连续重写@continuous-route-rewrite

重写后的目标会作为新的路由事件重新触发 `onBeforeAppRoute`。因此，“同一个路由事件只允许成功重写一次”不表示一次用户跳转只能重写一次。

```text
A -> onBeforeAppRoute(routeEventId=1) -> 重写到 B
B -> onBeforeAppRoute(routeEventId=2) -> 重写到 C
C -> onBeforeAppRoute(routeEventId=3) -> 执行路由
C -> onAppRoute(routeEventId=3)
```

业务代码应避免不同重写规则之间形成循环。

完整示例代码参考 [hello uni-app x 应用路由事件示例](https://gitcode.com/dcloud/hello-uni-app-x/blob/dev/pages/API/app-route/app-route.uvue)。

## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/app-route/app-route.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/app-route/app-route.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/app-route/app-route

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/app-route/app-route

>示例
```vue
<template>
  <view class="route-page uni-theme-root">
    <page-head title="应用路由事件"></page-head>
    <view class="uni-padding-wrap">
      <view class="uni-list-cell-padding status-box">
        <text class="uni-title-text">监听状态</text>
        <text class="status-text">{{ data.isListening ? '监听中' : '已停止' }}</text>
        <text class="status-text">onBeforeAppRoute：{{ data.beforeAppRouteCount }} 次</text>
        <text class="status-text">onAppRoute：{{ data.appRouteCount }} 次</text>
      </view>

      <view class="uni-btn-v uni-common-mt">
        <button type="primary" @click="navigateToTarget">普通跳转</button>
        <button @click="navigateToRewriteTarget">重写下一次跳转</button>
        <button @click="startListen">开始监听</button>
        <button @click="stopListen">停止监听</button>
        <button @click="clearRecords">清空记录</button>
      </view>

      <view class="event-box uni-common-mt">
        <text class="uni-title-text">onBeforeAppRoute 记录</text>
        <text v-if="data.beforeAppRouteEvents.length == 0" class="event-text">暂无记录</text>
        <view v-for="(event, index) in data.beforeAppRouteEvents" :key="index" class="event-item">
          <text class="event-index">#{{ index + 1 }}</text>
          <text class="event-text">{{ event }}</text>
        </view>
      </view>
      <view class="event-box uni-common-mt">
        <text class="uni-title-text">onAppRoute 记录</text>
        <text v-if="data.appRouteEvents.length == 0" class="event-text">暂无记录</text>
        <view v-for="(event, index) in data.appRouteEvents" :key="index" class="event-item">
          <text class="event-index">#{{ index + 1 }}</text>
          <text class="event-text">{{ event }}</text>
        </view>
      </view>
      <view class="event-box uni-common-mt">
        <text class="uni-title-text">最近一次 rewriteRoute 结果</text>
        <text class="event-text">{{ data.rewriteRouteResult }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="uts">
  const TARGET_PATH = 'pages/API/app-route/app-route-target'
  const TARGET_URL = `/${TARGET_PATH}`

  type DataType = {
    isListening : boolean
    beforeAppRouteCount : number
    appRouteCount : number
    beforeAppRouteEvents : string[]
    appRouteEvents : string[]
    lastNavigateToBeforePath : string
    lastNavigateToAppRoutePath : string
    rewriteRouteResult : string
  }

  const data = reactive({
    isListening: false,
    beforeAppRouteCount: 0,
    appRouteCount: 0,
    beforeAppRouteEvents: [] as string[],
    appRouteEvents: [] as string[],
    lastNavigateToBeforePath: '',
    lastNavigateToAppRoutePath: '',
    rewriteRouteResult: ''
  } as DataType)

  let rewriteNextRoute = false

  const appRouteCallback = (event : AppRouteEvent) => {
    data.appRouteCount++
    data.appRouteEvents.push(JSON.stringify(event))
    if (event.openType == 'navigateTo') {
      data.lastNavigateToAppRoutePath = event.path
    }
  }

  const beforeAppRouteCallback = (event : BeforeAppRouteEvent) => {
    data.beforeAppRouteCount++
    data.beforeAppRouteEvents.push(JSON.stringify(event))
    if (event.openType == 'navigateTo') {
      data.lastNavigateToBeforePath = event.path
    }

    if (rewriteNextRoute && event.openType == 'navigateTo' && event.path == TARGET_PATH) {
      rewriteNextRoute = false
      uni.rewriteRoute({
        url: `${TARGET_URL}?from=rewrite`,
        success: (result) => {
          data.rewriteRouteResult = result.errMsg
        },
        fail: (error) => {
          data.rewriteRouteResult = error.errMsg
        }
      })
    }
  }

  const startListen = () => {
    if (data.isListening) {
      return
    }
    uni.onAppRoute(appRouteCallback)
    uni.onBeforeAppRoute(beforeAppRouteCallback)
    data.isListening = true
  }

  const stopListen = () => {
    if (!data.isListening) {
      return
    }
    uni.offAppRoute(appRouteCallback)
    uni.offBeforeAppRoute(beforeAppRouteCallback)
    data.isListening = false
    rewriteNextRoute = false
  }

  const clearRecords = () => {
    data.beforeAppRouteCount = 0
    data.appRouteCount = 0
    data.beforeAppRouteEvents.length = 0
    data.appRouteEvents.length = 0
    data.lastNavigateToBeforePath = ''
    data.lastNavigateToAppRoutePath = ''
    data.rewriteRouteResult = ''
  }

  const navigateToTarget = () => {
    rewriteNextRoute = false
    uni.navigateTo({
      url: `${TARGET_URL}?from=normal`
    })
  }

  const enableRewriteNextRoute = () => {
    rewriteNextRoute = true
  }

  const navigateToRewriteTarget = () => {
    enableRewriteNextRoute()
    uni.navigateTo({
      url: `${TARGET_URL}?from=source`,
      fail: () => {
        rewriteNextRoute = false
      }
    })
  }

  onLoad(() => {
    startListen()
  })

  onUnload(() => {
    stopListen()
  })

  defineExpose({
    data,
    startListen,
    stopListen,
    clearRecords,
    enableRewriteNextRoute,
    navigateToTarget,
    navigateToRewriteTarget
  })
</script>

<style>
  .status-box,
  .event-box {
    padding: 12px;
    background-color: var(--list-background-color, #ffffff);
  }

  .status-text,
  .event-text {
    margin-top: 8px;
    color: var(--text-color, #333333);
  }

  .event-text {
    width: 100%;
  }

  .event-item {
    padding-top: 8px;
    padding-bottom: 8px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: var(--border-color, #eeeeee);
  }

  .event-index {
    color: var(--active-color, #999999);
  }
</style>

```

:::

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |

