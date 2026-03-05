## uni.onMemoryWarning(UTSCallback) @onmemorywarning

监听内存不足告警事件。


### onMemoryWarning 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: [OnMemoryWarningCallbackResult](#onmemorywarningcallbackresult-values)) => void | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x |  | 

### OnMemoryWarningCallbackResult 的属性值 @onmemorywarningcallbackresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| level | number | 是 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 仅 Android 有该字段，对应系统内存告警等级宏定义 |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.memory.onMemoryWarning)
- [参见uni-app相关文档](https://uniapp.dcloud.io/api/system/memory.html#onmemorywarning)
- [参见uni-app相关文档](https://uniapp.dcloud.io/system/memory.html#onmemorywarning)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/memory/wx.onMemoryWarning.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=onMemoryWarning&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=onMemoryWarning&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=onMemoryWarning&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=onMemoryWarning&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=onMemoryWarning)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=onMemoryWarning&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## uni.offMemoryWarning(callback?) @offmemorywarning

取消监听内存不足告警事件。不传入 callback 则取消所有监听。


### offMemoryWarning 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: [OffMemoryWarningCallbackResult](#offmemorywarningcallbackresult-values)) => void | 是 | - | Web: x; 微信小程序: -; Android: x; iOS: x; HarmonyOS: x |  | 

### OffMemoryWarningCallbackResult 的属性值 @offmemorywarningcallbackresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| level | number | 是 | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 仅 Android 有该字段，对应系统内存告警等级宏定义 |





### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.memory.offMemoryWarning)
- [参见uni-app相关文档](https://uniapp.dcloud.io/api/media/background-audio-manager.html)
- [参见uni-app相关文档](https://uniapp.dcloud.io/api/media/background-audio-manager.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/memory/wx.offMemoryWarning.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=offMemoryWarning&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=offMemoryWarning&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=offMemoryWarning&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=offMemoryWarning&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=offMemoryWarning)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=offMemoryWarning&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

