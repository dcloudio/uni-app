::: sourceCode
## uni.onWindowResize(callback) @onwindowresize
:::

监听窗口尺寸变化事件

文档: [http://uniapp.dcloud.io/api/ui/window?id=onwindowresize](http://uniapp.dcloud.io/api/ui/window?id=onwindowresize)

### onWindowResize 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| callback | (result: [UniNamespace.WindowResizeResult](#uninamespace-values)) => void | 是 | Android: x; iOS: x; HarmonyOS: x | 

### UniNamespace.WindowResizeResult 的属性值 @uninamespace-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| size | **WindowResizeResultSize** | 是 | Android: x; iOS: x; HarmonyOS: x | 变化后的窗口的大小，单位为 px ，{windowWidth,windowHeight} |
| deviceOrientation | string | 否 | Android: x; iOS: x; HarmonyOS: x | 变化后的设备方向<br/>- landscape: undefined<br/>- portrait: undefined |

#### size 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| windowWidth | number | 是 | Android: x; iOS: x; HarmonyOS: x | 变化后的窗口宽度，单位 px |
| windowHeight | number | 是 | Android: x; iOS: x; HarmonyOS: x | 变化后的窗口高度，单位 px |

#### deviceOrientation 的属性描述

| 合法值 | 兼容性 |
| :- |  :-: |
| landscape | Android: x; iOS: x; HarmonyOS: x |
| portrait | Android: x; iOS: x; HarmonyOS: x |






<!-- UTSAPIJSON.onWindowResize.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ui.window.onWindowResize)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=onWindowResize&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=onWindowResize&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=onWindowResize&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=onWindowResize&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=onWindowResize&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=onWindowResize)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=onWindowResize&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

::: sourceCode
## uni.offWindowResize(callback) @offwindowresize
:::

取消监听窗口尺寸变化事件

文档: [http://uniapp.dcloud.io/api/ui/window?id=offwindowresize](http://uniapp.dcloud.io/api/ui/window?id=offwindowresize)

### offWindowResize 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| callback | (result: any) => void | 是 | Android: x; iOS: x; HarmonyOS: x | 






<!-- UTSAPIJSON.offWindowResize.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ui.window.offWindowResize)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=offWindowResize&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=offWindowResize&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=offWindowResize&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=offWindowResize&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=offWindowResize&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=offWindowResize)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=offWindowResize&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- UTSAPIJSON.window.example -->

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |
