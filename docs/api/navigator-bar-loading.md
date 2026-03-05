<!-- ## uni.showNavigationBarLoading(options?) @shownavigationbarloading -->

::: sourceCode
## uni.showNavigationBarLoading(options?) @shownavigationbarloading

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-navigationBar


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-navigationBar

:::

在当前页面显示导航条加载动画


### showNavigationBarLoading 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.61 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **ShowNavigationBarLoadingOptions** | 否 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| success | (result: [ShowNavigationBarLoadingSuccess](#shownavigationbarloadingsuccess-values)) => void | 否 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - |  |
| fail | (error: [ShowNavigationBarLoadingFail](#shownavigationbarloadingfail-values)) => void | 否 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - |  |
| complete | () => void | 否 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - |  | 

#### ShowNavigationBarLoadingSuccess 的属性值 @shownavigationbarloadingsuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - |  |

#### ShowNavigationBarLoadingFail 的属性值 @shownavigationbarloadingfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 统一错误码 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - |  |




<!-- UTSAPIJSON.showNavigationBarLoading.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.page.navigatorBarLoading.showNavigationBarLoading)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/ui/navigationbar.html#shownavigationbarloading)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/navigation-bar/wx.showNavigationBarLoading.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=showNavigationBarLoading&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=showNavigationBarLoading&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=showNavigationBarLoading&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=showNavigationBarLoading&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=showNavigationBarLoading)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=showNavigationBarLoading&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.hideNavigationBarLoading(options?) @hidenavigationbarloading -->

::: sourceCode
## uni.hideNavigationBarLoading(options?) @hidenavigationbarloading

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-navigationBar


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-navigationBar

:::

隐藏导航条加载动画


### hideNavigationBarLoading 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.61 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **HideNavigationBarLoadingOptions** | 否 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| success | (result: [HideNavigationBarLoadingSuccess](#hidenavigationbarloadingsuccess-values)) => void | 否 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - |  |
| fail | (error: [HideNavigationBarLoadingFail](#hidenavigationbarloadingfail-values)) => void | 否 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - |  |
| complete | () => void | 否 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - |  | 

#### HideNavigationBarLoadingSuccess 的属性值 @hidenavigationbarloadingsuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - |  |

#### HideNavigationBarLoadingFail 的属性值 @hidenavigationbarloadingfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 统一错误码 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: x; iOS: x; HarmonyOS: - |  |




<!-- UTSAPIJSON.hideNavigationBarLoading.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.page.navigatorBarLoading.hideNavigationBarLoading)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/ui/navigationbar.html#hidenavigationbarloading)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/navigation-bar/wx.hideNavigationBarLoading.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=hideNavigationBarLoading&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=hideNavigationBarLoading&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=hideNavigationBarLoading&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=hideNavigationBarLoading&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=hideNavigationBarLoading)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=hideNavigationBarLoading&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- UTSAPIJSON.navigatorBarLoading.example -->

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

