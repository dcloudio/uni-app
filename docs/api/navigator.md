## uni.navigateTo(options) @navigateto

保留当前页面，跳转到应用内的某个页面


### navigateTo 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | √ | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **NavigateToOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| url | string ([string.PageURIString](/uts/data-type.md#ide-string)) | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数 |
| animationType | string | 否 | - | Web: x; 微信小程序: x; Android: 4.18; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 窗口显示的动画类型<br/> |
| animationDuration | number | 否 | - | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): 5.0 | 窗口显示动画的持续时间，单位为 ms |
| events | any | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 页面间通信接口，用于监听被打开页面发送到当前页面的数据 |
| success | (result: [NavigateToSuccess](#navigatetosuccess-values)) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用成功的回调函数 |
| fail | (result: [NavigateToFail](#navigatetofail-values)) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用失败的回调函数 |
| complete | (result: [NavigateToComplete](#navigatetocomplete-values)) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用结束的回调函数（调用成功、失败都会执行） |
| routeConfig | any | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - |  |
| routeOptions | any | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - |  |
| routeType | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - |  | 

##### animationType 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| auto | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: x | 自动选择动画效果 |
| none | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 无动画效果 |
| slide-in-right | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: x | 从右侧横向滑动效果 |
| slide-in-left | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: x | 从左侧横向滑动效果 |
| slide-in-top | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: x | 从上侧竖向滑动效果 |
| slide-in-bottom | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: x | 从下侧竖向滑动效果 |
| fade-in | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: x | 从完全透明到不透明逐渐显示 |
| zoom-out | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: x | 在屏幕中间从小到大逐渐放大显示 |
| zoom-fade-out | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: x | 从大逐渐缩小并且从不透明到透明逐渐隐藏关闭动画 |
| pop-in | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 从右侧平移出栈动画效果 |

#### NavigateToSuccess 的属性值 @navigatetosuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### NavigateToFail 的属性值 @navigatetofail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 路由错误码<br/>- 4: 框架内部异常 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### NavigateToComplete 的属性值 @navigatetocomplete-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |


### 返回值 

| 类型 | 必备 |
| :- | :- |
| Promise\<**NavigateToSuccess**> | 否 |

#### Promise\<NavigateToSuccess> 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


<!-- UTSAPIJSON.navigateTo.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.page.navigator.navigateTo)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/router.html#navigateto)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=navigateTo&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=navigateTo&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=navigateTo&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=navigateTo&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=navigateTo)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=navigateTo&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## uni.redirectTo(options) @redirectto

关闭当前页面，跳转到应用内的某个页面


### redirectTo 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | √ | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **RedirectToOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| url | string ([string.PageURIString](/uts/data-type.md#ide-string)) | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数 |
| success | (result: [RedirectToSuccess](#redirecttosuccess-values)) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用成功的回调函数 |
| fail | (result: [RedirectToFail](#redirecttofail-values)) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用失败的回调函数 |
| complete | (result: [RedirectToComplete](#redirecttocomplete-values)) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### RedirectToSuccess 的属性值 @redirecttosuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### RedirectToFail 的属性值 @redirecttofail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 路由错误码<br/>- 4: 框架内部异常 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### RedirectToComplete 的属性值 @redirecttocomplete-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |


### 返回值 

| 类型 | 必备 |
| :- | :- |
| Promise\<**RedirectToSuccess**> | 否 |

#### Promise\<RedirectToSuccess> 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


<!-- UTSAPIJSON.redirectTo.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.page.navigator.redirectTo)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/router.html#redirectto)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.redirectTo.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=redirectTo&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=redirectTo&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=redirectTo&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=redirectTo&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=redirectTo)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=redirectTo&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## uni.reLaunch(options) @relaunch

关闭所有页面，打开到应用内的某个页面


### reLaunch 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | √ | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **ReLaunchOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| url | string ([string.PageURIString](/uts/data-type.md#ide-string)) | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 需要跳转的应用内页面路径 , 路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；如 'path?key=value&key2=value2'，如果跳转的页面路径是 tabBar 页面则不能带参数 |
| success | (result: [ReLaunchSuccess](#relaunchsuccess-values)) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用成功的回调函数 |
| fail | (result: [ReLaunchFail](#relaunchfail-values)) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用失败的回调函数 |
| complete | (result: [ReLaunchComplete](#relaunchcomplete-values)) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### ReLaunchSuccess 的属性值 @relaunchsuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### ReLaunchFail 的属性值 @relaunchfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 路由错误码<br/>- 4: 框架内部异常 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### ReLaunchComplete 的属性值 @relaunchcomplete-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |


### 返回值 

| 类型 | 必备 |
| :- | :- |
| Promise\<**ReLaunchSuccess**> | 否 |

#### Promise\<ReLaunchSuccess> 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


<!-- UTSAPIJSON.reLaunch.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.page.navigator.reLaunch)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/router.html#relaunch)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.reLaunch.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=reLaunch&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=reLaunch&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=reLaunch&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=reLaunch&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=reLaunch)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=reLaunch&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## uni.switchTab(options) @switchtab

跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面


### switchTab 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | √ | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **SwitchTabOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| url | string ([string.PageURIString](/uts/data-type.md#ide-string)) | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 需要跳转的 tabBar 页面的路径，路径后不能带参数 |
| success | (result: [SwitchTabSuccess](#switchtabsuccess-values)) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用成功的回调函数 |
| fail | (result: [SwitchTabFail](#switchtabfail-values)) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用失败的回调函数 |
| complete | (result: [SwitchTabComplete](#switchtabcomplete-values)) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### SwitchTabSuccess 的属性值 @switchtabsuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### SwitchTabFail 的属性值 @switchtabfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 路由错误码<br/>- 4: 框架内部异常 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### SwitchTabComplete 的属性值 @switchtabcomplete-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |


### 返回值 

| 类型 | 必备 |
| :- | :- |
| Promise\<**SwitchTabSuccess**> | 否 |

#### Promise\<SwitchTabSuccess> 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


<!-- UTSAPIJSON.switchTab.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.page.navigator.switchTab)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/router.html#switchtab)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.switchTab.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=switchTab&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=switchTab&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=switchTab&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=switchTab&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=switchTab)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=switchTab&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## uni.navigateBack(options?) @navigateback

关闭当前页面，返回上一页面或多级页面


### navigateBack 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | √ | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **NavigateBackOptions** | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| delta | number | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 返回的页面数，如果 delta 大于现有页面数，则返回到首页 |
| animationType | string | 否 | - | Web: x; 微信小程序: x; Android: 4.18; iOS: 4.25; HarmonyOS: - | 窗口关闭的动画类型<br/> |
| animationDuration | number | 否 | - | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: x | 窗口关闭动画的持续时间，单位为 ms |
| success | (result: [NavigateBackSuccess](#navigatebacksuccess-values)) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: x; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [NavigateBackFail](#navigatebackfail-values)) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用失败的回调函数 |
| complete | (result: [NavigateBackComplete](#navigatebackcomplete-values)) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: √; iOS: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### animationType 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| auto | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: x | 自动选择动画效果 |
| none | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 无动画效果 |
| slide-out-right | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: x | 横向向右侧滑出屏幕动画 |
| slide-out-left | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: x | 横向向左侧滑出屏幕动画 |
| slide-out-top | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: x | 竖向向上侧滑出屏幕动画 |
| slide-out-bottom | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: x | 竖向向下侧滑出屏幕动画 |
| fade-out | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: x | 从不透明到透明逐渐隐藏动画 |
| zoom-in | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: x | 从大逐渐缩小关闭动画 |
| zoom-fade-in | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: x | 从大逐渐缩小并且从不透明到透明逐渐隐藏关闭动画 |
| pop-out | Web: x; 微信小程序: -; Android: 4.18; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 从右侧平移出栈动画效果 |

#### NavigateBackSuccess 的属性值 @navigatebacksuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### NavigateBackFail 的属性值 @navigatebackfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 路由错误码<br/>- 4: 框架内部异常 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### NavigateBackComplete 的属性值 @navigatebackcomplete-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |


### 返回值 

| 类型 | 必备 |
| :- | :- |
| Promise\<**NavigateBackSuccess**> | 否 |

#### Promise\<NavigateBackSuccess> 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 


<!-- UTSAPIJSON.navigateBack.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.page.navigator.navigateBack)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/router.html#navigateback)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateBack.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=navigateBack&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=navigateBack&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=navigateBack&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=navigateBack&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=navigateBack)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=navigateBack&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/navigator/navigator.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/navigator/navigator.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/navigator/navigator

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/navigator/navigator

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1">
  <!-- #endif -->
    <view>
      <page-head title="navigate"></page-head>
      <view style="flex-direction: row;">
        <switch @change="onChange"></switch>
        <view class="uni-title">是否启用共享元素动画</view>
      </view>
      <share-element :share-key="data.shareElementKey">
        <image style="width: 250px; height: 176px;" src="/static/shuijiao.jpg" mode="scaleToFill"></image>
      </share-element>
      <text style="font-size: 13px;" >注意：开启共享元素动画后仅支持slide-in-right和fade-in动画效果</text>
      <view class="uni-padding-wrap uni-common-mt uni-common-mb">
        <view class="direction-row">
          <text class="label">onLoad触发时间戳:</text>
          <text>{{ data.onLoadTime }}</text>
        </view>
        <view class="direction-row">
          <text class="label">onShow触发时间戳:</text>
          <text>{{ data.onShowTime }}</text>
        </view>
        <view class="direction-row">
          <text class="label">onReady触发时间戳:</text>
          <text>{{ data.onReadyTime }}</text>
        </view>
        <view class="direction-row">
          <text class="label">onHide触发时间戳:</text>
          <text>{{ data.onHideTime }}</text>
        </view>
        <view class="direction-row">
          <text class="label">onBackPress触发时间戳:</text>
          <text>见控制台</text>
        </view>
        <view class="direction-row">
          <text class="label">onUnload触发时间戳:</text>
          <text>见控制台</text>
        </view>
        <view class="uni-btn-v">
          <button @tap="navigateTo" class="uni-btn">
            跳转新页面，并传递数据
          </button>
          <button @tap="navigateBack" class="uni-btn">返回上一页</button>
          <button @tap="redirectTo" class="uni-btn">在当前页面打开</button>
          <button @tap="switchTab" class="uni-btn">切换到模板选项卡</button>
          <button @tap="reLaunch" class="uni-btn">
            关闭所有页面，打开首页
          </button>
          <button @tap="navigateToErrorPage" class="uni-btn">
            打开不存在的页面
          </button>
          <button v-for="(item, _) in data.animationTypeList" @tap="navigateToAnimationType(item)"
            class="uni-btn">navigateTo动画({{item}})</button>
          <button class="uni-btn" @click="goOnLoadCallAPI">测试 onLoad 调用 API</button>
        </view>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import { state, setLifeCycleNum } from '@/store/index.uts'
  type AnimationType = "slide-in-right" | "slide-in-left" | "slide-in-top" | "slide-in-bottom" | "pop-in" | "fade-in" | "zoom-out" | "zoom-fade-out" | "none" | "auto"

  type DataType = {
    onLoadTime: number;
    onShowTime: number;
    onReadyTime: number;
    onHideTime: number;
    shareElementKey: string;
    animationTypeList: string[];
  }

  const data = reactive({
    onLoadTime: 0,
    onShowTime: 0,
    onReadyTime: 0,
    onHideTime: 0,
    shareElementKey: "",
    animationTypeList: [
      'slide-in-right',
      'slide-in-left',
      'slide-in-top',
      'slide-in-bottom',
      'pop-in',
      'fade-in',
      'zoom-out',
      'zoom-fade-out',
      'none'
    ]
  } as DataType)
  onLoad(() => {
    data.onLoadTime = Date.now()
    console.log('onLoad', data.onLoadTime)
  })

  onPageShow(() => {
    data.onShowTime = Date.now()
    console.log('onShow', data.onShowTime)
  })

  onReady(() => {
    data.onReadyTime = Date.now()
    console.log('onReady', data.onReadyTime)
  })

  onPageHide(() => {
    data.onHideTime = Date.now()
    console.log('onHide', data.onHideTime)
  })

  onBackPress((options : OnBackPressOptions) : boolean | null => {
    console.log('onBackPress', Date.now())
    console.log('onBackPress from', options.from)
    return null
  })

  onUnload(() => {
    console.log('onUnload', Date.now())
  })
  const reLaunch = () => {
    uni.reLaunch({
      url: '/pages/tabBar/component',
      success(result) {
        console.log('reLaunch success', result.errMsg)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum + 1)
      },
      fail(error) {
        console.log('reLaunch fail', error.errMsg)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum - 1)
      },
      complete(result) {
        console.log('reLaunch complete', result.errMsg)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum + 1)
      },
    })
  }

  const navigateTo = () => {
    uni.navigateTo({
      url: '/pages/API/navigator/new-page/new-page-1?data=Hello',
      success(result) {
        console.log('navigateTo success', result.errMsg)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum + 1)
      },
      fail(error) {
        console.log('navigateTo fail', error.errMsg)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum - 1)
      },
      complete(result) {
        console.log('navigateTo complete', result.errMsg)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum + 1)
      },
    })
  }

  const navigateToAnimationType = (animationType : AnimationType) => {
    uni.navigateTo({
      url: '/pages/API/navigator/new-page/new-page-1?data=Hello',
      animationType: animationType,
      success(result) {
        console.log('navigateTo success', result.errMsg)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum + 1)
      },
      fail(error) {
        console.log('navigateTo fail', error.errMsg)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum - 1)
      },
      complete(result) {
        console.log('navigateTo complete', result.errMsg)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum + 1)
      },
    })
  }

  const navigateToErrorPage = () => {
    uni.navigateTo({
      url: '/pages/error-page/error-page',
      success(result) {
        console.log('navigateTo success', result.errMsg)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum - 1)
      },
      fail(error) {
        console.log('navigateTo fail', error.errMsg)
        uni.showToast({
          title: error.errMsg,
          icon: 'none',
        })
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum + 1)
      },
      complete(result) {
        console.log('navigateTo complete', result.errMsg)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum + 1)
      },
    })
  }

  const navigateToDebounce = () => {
    uni.navigateTo({
      url: '/pages/API/navigator/new-page/new-page-1?data=debounce',
      success(result) {
        console.log('navigateTo success', result.errMsg)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum + 1)
      },
      fail(error) {
        console.log('navigateTo fail', error.errMsg)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum - 1)
      },
      complete(result) {
        console.log('navigateTo complete', result.errMsg)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum + 1)
      },
    })
    uni.navigateTo({
      url: '/pages/API/navigator/new-page/new-page-1?data=debounce',
      success(result) {
        console.log('navigateTo success', result.errMsg)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum - 1)
      },
      fail(error) {
        console.log('navigateTo fail', error.errMsg)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum + 1)
      },
      complete(result) {
        console.log('navigateTo complete', result.errMsg)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum + 1)
      },
    })
  }

  // 自动化测试
  const navigateToRelativePath1 = () => {
    uni.navigateTo({
      url: 'new-page/new-page-1?data=new-page/new-page-1',
      success() {
        setLifeCycleNum(state.lifeCycleNum + 1)
      },
      fail() {
        setLifeCycleNum(state.lifeCycleNum - 1)
      },
      complete() {
        setLifeCycleNum(state.lifeCycleNum + 1)
      },
    })
  }

  // 自动化测试
  const navigateToRelativePath2 = () => {
    uni.navigateTo({
      url: './new-page/new-page-1?data=./new-page/new-page-1',
      success() {
        setLifeCycleNum(state.lifeCycleNum + 1)
      },
      fail() {
        setLifeCycleNum(state.lifeCycleNum - 1)
      },
      complete() {
        setLifeCycleNum(state.lifeCycleNum + 1)
      },
    })
  }

  // 自动化测试
  const navigateToRelativePath3 = () => {
    uni.navigateTo({
      url: '../navigator/new-page/new-page-1?data=../navigator/new-page/new-page-1',
      success() {
        setLifeCycleNum(state.lifeCycleNum + 1)
      },
      fail() {
        setLifeCycleNum(state.lifeCycleNum - 1)
      },
      complete() {
        setLifeCycleNum(state.lifeCycleNum + 1)
      },
    })
  }

  const navigateBack = () => {
    uni.navigateBack({
      success(result) {
        console.log('navigateBack success', result.errMsg)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum + 1)
      },
      fail(error) {
        console.log('navigateBack fail', error.errMsg)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum - 1)
      },
      complete(result) {
        console.log('navigateBack complete', result.errMsg)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum + 1)
      },
    })
  }

  const navigateBackWithDelta1 = () => {
    uni.navigateTo({
      url: '/pages/API/navigator/new-page/new-page-1',
      success() {
        uni.navigateBack({
          delta: 1,
          success(result) {
            console.log('navigateBack success', result.errMsg)
            // 自动化测试
            setLifeCycleNum(state.lifeCycleNum + 1)
          },
          fail(error) {
            console.log('navigateBack fail', error.errMsg)
            // 自动化测试
            setLifeCycleNum(state.lifeCycleNum - 1)
          },
          complete(result) {
            console.log('navigateBack complete', result.errMsg)
            // 自动化测试
            setLifeCycleNum(state.lifeCycleNum + 1)
          },
        })
      },
    })
  }

  const navigateBackWithDelta100 = () => {
    uni.navigateTo({
      url: '/pages/API/navigator/new-page/new-page-1',
      success() {
        uni.navigateBack({
          delta: 100,
          success(result) {
            console.log('navigateBack success', result.errMsg)
            // 自动化测试
            setLifeCycleNum(state.lifeCycleNum + 1)
          },
          fail(error) {
            console.log('navigateBack fail', error.errMsg)
            // 自动化测试
            setLifeCycleNum(state.lifeCycleNum - 1)
          },
          complete(result) {
            console.log('navigateBack complete', result.errMsg)
            // 自动化测试
            setLifeCycleNum(state.lifeCycleNum + 1)
          },
        })
      },
    })
  }

  const redirectTo = () => {
    uni.redirectTo({
      url: '/pages/API/navigator/new-page/new-page-1?data=Hello',
      success(result) {
        console.log('redirectTo success', result.errMsg)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum + 1)
      },
      fail(error) {
        console.log('redirectTo fail', error.errMsg)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum - 1)
      },
      complete(result) {
        console.log('redirectTo complete', result.errMsg)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum + 1)
      },
    })
  }

  const switchTab = () => {
    uni.switchTab({
      url: '/pages/tabBar/template',
      success(result) {
        console.log('switchTab success', result.errMsg)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum + 1)
      },
      fail(error) {
        console.log('switchTab fail', error.errMsg)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum - 1)
      },
      complete(result) {
        console.log('switchTab complete', result.errMsg)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum + 1)
      },
    })
  }

  // 自动化测试
  const getLifeCycleNum = () : number => {
    return state.lifeCycleNum
  }

  // 自动化测试
  const setLifeCycleNumWrapper = (num : number) => {
    setLifeCycleNum(num)
  }

  const onChange = (event: UniSwitchChangeEvent) => {
    if(event.detail.value) {
      data.shareElementKey = "test-share-element-key"
    } else {
      data.shareElementKey = ""
    }
  }

  const goOnLoadCallAPI = () => {
    uni.navigateTo({
      url: '/pages/API/navigator/new-page/onLoad-call-api'
    })
  }

</script>

<style>
  .direction-row {
    flex-direction: row;
  }

  .label {
    width: 190px;
  }
</style>

```

:::

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |


## 页面跳转与参数传递

A页面跳转到B页面时，有两种方式给B页面传递信息：
1. A页面跳转时，B页面的URL中通过?param1=param1value&param2=param2value方式传递，然后B页面在Onload里接收参数。详见[页面onLoad生命周期](../page.md#onload)
2. 通过eventbus，详见[uni.$on、uni.$emit等API](event-bus.md)

## Bug & Tips@tips

* ``navigateTo``, ``redirectTo`` 只能打开非 tabBar 页面。
* ``switchTab`` 只能打开 ``tabBar`` 页面。
* ``reLaunch`` 可以打开任意页面。
* 页面底部的 ``tabBar`` 由页面决定，即只要是定义为 ``tabBar`` 的页面，底部都有 ``tabBar``。
* 不能在首页 ```onReady``` 之前进行页面跳转。
