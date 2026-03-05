<!-- ## uni.showTabBar(options?) @showtabbar -->

::: sourceCode
## uni.showTabBar(options?) @showtabbar

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-tabBar


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-tabBar

:::

显示 tabBar


### showTabBar 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.61 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **ShowTabBarOptions** | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| animation | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 是否需要动画效果 |
| success | (result: [ShowTabBarSuccess](#showtabbarsuccess-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [ShowTabBarFail](#showtabbarfail-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: [ShowTabBarComplete](#showtabbarcomplete-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### ShowTabBarSuccess 的属性值 @showtabbarsuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### ShowTabBarFail 的属性值 @showtabbarfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误码 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 100 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | TabBar 不存在 |
| 200 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 参数错误 |

#### ShowTabBarComplete 的属性值 @showtabbarcomplete-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |


### 返回值 

| 类型 | 必备 |
| :- | :- |
| Promise\<**ShowTabBarSuccess**> | 否 |

#### Promise\<ShowTabBarSuccess> 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 



### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.page.setTabBar.showTabBar)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/ui/tabbar.html#showtabbar)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/tab-bar/wx.showTabBar.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=showTabBar&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=showTabBar&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=showTabBar&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=showTabBar&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=showTabBar)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=showTabBar&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.hideTabBar(options?) @hidetabbar -->

::: sourceCode
## uni.hideTabBar(options?) @hidetabbar

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-tabBar


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-tabBar

:::

隐藏 tabBar


### hideTabBar 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.61 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **HideTabBarOptions** | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| animation | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 是否需要动画效果 |
| success | (result: [HideTabBarSuccess](#hidetabbarsuccess-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [HideTabBarFail](#hidetabbarfail-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: [HideTabBarComplete](#hidetabbarcomplete-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### HideTabBarSuccess 的属性值 @hidetabbarsuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### HideTabBarFail 的属性值 @hidetabbarfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误码 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 100 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | TabBar 不存在 |
| 200 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 参数错误 |

#### HideTabBarComplete 的属性值 @hidetabbarcomplete-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |


### 返回值 

| 类型 | 必备 |
| :- | :- |
| Promise\<**HideTabBarSuccess**> | 否 |

#### Promise\<HideTabBarSuccess> 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 



### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.page.setTabBar.hideTabBar)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/ui/tabbar.html#hidetabbar)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/tab-bar/wx.hideTabBar.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=hideTabBar&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=hideTabBar&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=hideTabBar&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=hideTabBar&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=hideTabBar)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=hideTabBar&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.showTabBarRedDot(options) @showtabbarreddot -->

::: sourceCode
## uni.showTabBarRedDot(options) @showtabbarreddot

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-tabBar


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-tabBar

:::

显示 tabBar 某一项的右上角的红点


### showTabBarRedDot 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.61 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **ShowTabBarRedDotOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| index | number | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | tabBar的哪一项，从左边算起，索引从0开始 |
| success | (result: [ShowTabBarRedDotSuccess](#showtabbarreddotsuccess-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [ShowTabBarRedDotFail](#showtabbarreddotfail-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: [ShowTabBarRedDotComplete](#showtabbarreddotcomplete-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### ShowTabBarRedDotSuccess 的属性值 @showtabbarreddotsuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### ShowTabBarRedDotFail 的属性值 @showtabbarreddotfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误码 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 100 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | TabBar 不存在 |
| 200 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 参数错误 |

#### ShowTabBarRedDotComplete 的属性值 @showtabbarreddotcomplete-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |


### 返回值 

| 类型 | 必备 |
| :- | :- |
| Promise\<**ShowTabBarRedDotSuccess**> | 否 |

#### Promise\<ShowTabBarRedDotSuccess> 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 



### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.page.setTabBar.showTabBarRedDot)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/ui/tabbar.html#showtabbarreddot)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/tab-bar/wx.showTabBarRedDot.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=showTabBarRedDot&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=showTabBarRedDot&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=showTabBarRedDot&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=showTabBarRedDot&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=showTabBarRedDot)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=showTabBarRedDot&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.hideTabBarRedDot(options) @hidetabbarreddot -->

::: sourceCode
## uni.hideTabBarRedDot(options) @hidetabbarreddot

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-tabBar


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-tabBar

:::

隐藏 tabBar 某一项的右上角的红点


### hideTabBarRedDot 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.61 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **HideTabBarRedDotOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| index | number | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | tabBar的哪一项，从左边算起，索引从0开始 |
| success | (result: [HideTabBarRedDotSuccess](#hidetabbarreddotsuccess-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [HideTabBarRedDotFail](#hidetabbarreddotfail-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: [HideTabBarRedDotComplete](#hidetabbarreddotcomplete-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### HideTabBarRedDotSuccess 的属性值 @hidetabbarreddotsuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### HideTabBarRedDotFail 的属性值 @hidetabbarreddotfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误码 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 100 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | TabBar 不存在 |
| 200 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 参数错误 |

#### HideTabBarRedDotComplete 的属性值 @hidetabbarreddotcomplete-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |


### 返回值 

| 类型 | 必备 |
| :- | :- |
| Promise\<**HideTabBarRedDotSuccess**> | 否 |

#### Promise\<HideTabBarRedDotSuccess> 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 



### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.page.setTabBar.hideTabBarRedDot)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/ui/tabbar.html#hidetabbarreddot)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/tab-bar/wx.hideTabBarRedDot.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=hideTabBarRedDot&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=hideTabBarRedDot&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=hideTabBarRedDot&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=hideTabBarRedDot&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=hideTabBarRedDot)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=hideTabBarRedDot&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.setTabBarBadge(options) @settabbarbadge -->

::: sourceCode
## uni.setTabBarBadge(options) @settabbarbadge

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-tabBar


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-tabBar

:::

为 tabBar 某一项的右上角添加文本


### setTabBarBadge 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.61 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **SetTabBarBadgeOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| index | number | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | tabBar的哪一项，从左边算起，索引从0开始 |
| text | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 显示的文本，不超过 3 个半角字符 |
| success | (result: [SetTabBarBadgeSuccess](#settabbarbadgesuccess-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [SetTabBarBadgeFail](#settabbarbadgefail-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: [SetTabBarBadgeComplete](#settabbarbadgecomplete-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### SetTabBarBadgeSuccess 的属性值 @settabbarbadgesuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### SetTabBarBadgeFail 的属性值 @settabbarbadgefail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误码 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 100 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | TabBar 不存在 |
| 200 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 参数错误 |

#### SetTabBarBadgeComplete 的属性值 @settabbarbadgecomplete-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |


### 返回值 

| 类型 | 必备 |
| :- | :- |
| Promise\<**SetTabBarBadgeSuccess**> | 否 |

#### Promise\<SetTabBarBadgeSuccess> 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 



### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.page.setTabBar.setTabBarBadge)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/ui/tabbar.html#settabbarbadge)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/tab-bar/wx.setTabBarBadge.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=setTabBarBadge&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=setTabBarBadge&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=setTabBarBadge&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=setTabBarBadge&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=setTabBarBadge)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=setTabBarBadge&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.removeTabBarBadge(options) @removetabbarbadge -->

::: sourceCode
## uni.removeTabBarBadge(options) @removetabbarbadge

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-tabBar


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-tabBar

:::

移除 tabBar 某一项右上角的文本


### removeTabBarBadge 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.61 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **RemoveTabBarBadgeOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| index | number | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | tabBar的哪一项，从左边算起，索引从0开始 |
| success | (result: [RemoveTabBarBadgeSuccess](#removetabbarbadgesuccess-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [RemoveTabBarBadgeFail](#removetabbarbadgefail-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: [RemoveTabBarBadgeComplete](#removetabbarbadgecomplete-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### RemoveTabBarBadgeSuccess 的属性值 @removetabbarbadgesuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### RemoveTabBarBadgeFail 的属性值 @removetabbarbadgefail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误码 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 100 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | TabBar 不存在 |
| 200 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 参数错误 |

#### RemoveTabBarBadgeComplete 的属性值 @removetabbarbadgecomplete-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |


### 返回值 

| 类型 | 必备 |
| :- | :- |
| Promise\<**RemoveTabBarBadgeSuccess**> | 否 |

#### Promise\<RemoveTabBarBadgeSuccess> 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 



### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.page.setTabBar.removeTabBarBadge)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/ui/tabbar.html#removetabbarbadge)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/tab-bar/wx.removeTabBarBadge.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=removeTabBarBadge&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=removeTabBarBadge&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=removeTabBarBadge&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=removeTabBarBadge&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=removeTabBarBadge)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=removeTabBarBadge&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.setTabBarStyle(options) @settabbarstyle -->

::: sourceCode
## uni.setTabBarStyle(options) @settabbarstyle

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-tabBar


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-tabBar

:::

动态设置 tabBar 的整体样式


### setTabBarStyle 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **SetTabBarStyleOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| color | string ([string.ColorString](/uts/data-type.md#ide-string)) | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: x | tab 上的文字默认颜色 |
| selectedColor | string ([string.ColorString](/uts/data-type.md#ide-string)) | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: x | tab 上的文字选中时的颜色 |
| backgroundColor | string ([string.ColorString](/uts/data-type.md#ide-string)) | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: x | tab 的背景色 |
| backgroundImage | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: x | 图片背景 |
| backgroundRepeat | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: x | 背景图平铺方式 |
| borderColor | string ([string.ColorString](/uts/data-type.md#ide-string)) | 否 | - | Web: 4.23; 微信小程序: 4.41; Android: x; iOS: 4.23; HarmonyOS: x; HarmonyOS(Vapor): x | tabbar上边框的颜色（优先级高于 borderStyle） |
| borderStyle | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: x | tabbar上边框的颜色 |
| success | (result: [SetTabBarStyleSuccess](#settabbarstylesuccess-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: x | 接口调用成功的回调函数 |
| fail | (result: [SetTabBarStyleFail](#settabbarstylefail-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (result: [SetTabBarStyleComplete](#settabbarstylecomplete-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### backgroundRepeat 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| repeat | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 背景图片在垂直方向和水平方向平铺 |
| repeat-x | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 背景图片在水平方向平铺，垂直方向拉伸 |
| repeat-y | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 背景图片在垂直方向平铺，水平方向拉伸 |
| no-repeat | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 背景图片在垂直方向和水平方向都拉伸 |

##### borderStyle 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| black | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | - |
| white | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | - |

#### SetTabBarStyleSuccess 的属性值 @settabbarstylesuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |

#### SetTabBarStyleFail 的属性值 @settabbarstylefail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 错误码 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 100 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | TabBar 不存在 |
| 200 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 参数错误 |

#### SetTabBarStyleComplete 的属性值 @settabbarstylecomplete-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |


### 返回值 

| 类型 | 必备 |
| :- | :- |
| Promise\<**SetTabBarStyleSuccess**> | 否 |

#### Promise\<SetTabBarStyleSuccess> 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  | 



### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.page.setTabBar.setTabBarStyle)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/ui/tabbar.html#settabbarstyle)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/tab-bar/wx.setTabBarStyle.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=setTabBarStyle&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=setTabBarStyle&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=setTabBarStyle&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=setTabBarStyle&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=setTabBarStyle)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=setTabBarStyle&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.setTabBarItem(options) @settabbaritem -->

::: sourceCode
## uni.setTabBarItem(options) @settabbaritem

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-tabBar


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-tabBar

:::

动态设置 tabBar 某一项的内容


### setTabBarItem 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.61 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **SetTabBarItemOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| index | number | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | tabBar 的哪一项，从左边算起，索引从0开始 |
| text | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | tab 上按钮文字 |
| iconPath | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 图片路径 |
| selectedIconPath | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 选中时的图片路径 |
| pagePath | string | 否 | - | Web: √; 微信小程序: x; Android: x; iOS: x; HarmonyOS: x | 页面绝对路径 |
| iconfont | **SetTabBarItemIconFontOptions** | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 字体图标，优先级高于 iconPath |
| visible | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | tab 是否显示 |
| success | (result: [SetTabBarItemSuccess](#settabbaritemsuccess-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [SetTabBarItemFail](#settabbaritemfail-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: [SetTabBarItemComplete](#settabbaritemcomplete-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### iconfont 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| text | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 字库 Unicode 码 |
| selectedText | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 选中后字库 Unicode 码 |
| fontSize | string | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 字体图标字号(px) |
| color | string | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 字体图标颜色 |
| selectedColor | string | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 字体图标选中颜色 |

#### SetTabBarItemSuccess 的属性值 @settabbaritemsuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### SetTabBarItemFail 的属性值 @settabbaritemfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误码 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 100 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | TabBar 不存在 |
| 200 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 参数错误 |

#### SetTabBarItemComplete 的属性值 @settabbaritemcomplete-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |


### 返回值 

| 类型 | 必备 |
| :- | :- |
| Promise\<**SetTabBarItemSuccess**> | 否 |

#### Promise\<SetTabBarItemSuccess> 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 



### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.page.setTabBar.setTabBarItem)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/ui/tabbar.html#settabbaritem)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/tab-bar/wx.setTabBarItem.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=setTabBarItem&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=setTabBarItem&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=setTabBarItem&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=setTabBarItem&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=setTabBarItem)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=setTabBarItem&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

注意：小程序上无法通过本API动态添加和删除tabbar的item。

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |


## Bug & Tips @tips
- 自 4.23 起，在非 tabbar 页面调用以上 API 会报错：hideTabBar:fail not TabBar page
- uni-app-x harmony 暂不支持隐藏TabBarItem
