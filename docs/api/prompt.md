## uni.showToast(options) @showtoast

显示消息提示框

### showToast 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **ShowToastOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | uni.showToast参数定义 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| title | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 提示的内容，长度与 icon 取值有关。 |
| icon | string | 否 | "success" | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: x | icon值说明 |
| image | [string.ImageURIString](/uts/data-type.md#ide-string) | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 自定义图标的本地路径（app端暂不支持gif） |
| mask | boolean | 否 | false | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 是否显示透明蒙层，防止触摸穿透 |
| duration | number | 否 | 1500 | Web: 4.0; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 提示的延迟时间，单位毫秒 |
| position | string | 否 | - | Web: x; 微信小程序: 4.41; Android: 3.91; iOS: 4.11; iOS uni-app x UTS 插件: 4.11; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | position值说明。纯文本轻提示显示位置，填写有效值后只有 title 属性生效，且不支持通过 uni.hideToast 隐藏。 |
| success | (res: ShowToastSuccess) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.showToast成功回调函数定义 |
| fail | (res: [ShowToastFail](#showtoastfail-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.showToast失败回调函数定义 |
| complete | (res: any) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.showToast完成回调函数定义 | 

##### icon 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| success | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 显示成功图标 |
| error | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 显示错误图标 |
| fail | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 显示错误图标，此时title文本无长度显示，支付宝、抖音小程序生效 |
| exception | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 显示异常图标，此时title文本无长度显示，支付宝小程序生效 |
| loading | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 显示加载图标 |
| none | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 不显示图标 |

##### position 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| top | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 居上显示 |
| center | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 居中显示 |
| bottom | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 居底显示 |

#### ShowToastFail 的属性值 @showtoastfail-values 

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
| 1 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 撤销 |
| 1001 | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 请求参数非法 |




<!-- UTSAPIJSON.showToast.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ui.toast.showToast)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/ui/prompt.html#showtoast)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=showToast&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=showToast&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=showToast&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=showToast&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=showToast)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=showToast&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

#### 注意事项 ####

+ App平台 `position` 参数特别说明

如果没有设置 `position` 字段，`uni.showToast` 会采用应用弹窗方案，即弹窗与页面生命周期绑定。 页面关闭时，当前页面弹出的所有弹窗都会被自动取消。

如果设置了`position` 字段，`uni.showToast` 会采用系统弹窗方案，即弹窗与页面无绑定关系。 页面关闭后，弹出中的/等待弹出的`Toast`会继续展示。

系统弹窗在部分系统（比如 MIUI,Google）可能会有应用图标前缀。

系统弹窗在部分系统（比如 鸿蒙 4.0以上）可能不支持顶部和居中展示。

## uni.hideToast() @hidetoast

隐藏消息提示框。





<!-- UTSAPIJSON.hideToast.example -->

### hideToast 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.11 | 4.61 | 5.0 |



### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ui.toast.hideToast)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/ui/prompt.html#hidetoast)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.hideToast.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=hideToast&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=hideToast&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=hideToast&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=hideToast&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=hideToast)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=hideToast&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)


## uni.showLoading(options) @showloading

显示 loading 提示框, 需主动调用 uni.hideLoading 才能关闭提示框。

### showLoading 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **ShowLoadingOptions** | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | uni.showLoading参数定义 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| title | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 提示的内容，长度与 icon 取值有关。 |
| mask | boolean | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x | 是否显示透明蒙层，防止触摸穿透，默认：false |
| success | (res: ShowLoadingSuccess) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.showLoading成功回调函数定义 |
| fail | (res: [ShowLoadingFail](#showloadingfail-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.showLoading失败回调函数定义 |
| complete | (res: any) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.showLoading完成回调函数定义 | 

#### ShowLoadingFail 的属性值 @showloadingfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | uni.showLoading失败回调参数 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |




<!-- UTSAPIJSON.showLoading.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ui.loading.showLoading)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/ui/prompt.html#showloading)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showLoading.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=showLoading&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=showLoading&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=showLoading&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=showLoading&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=showLoading)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=showLoading&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## uni.hideLoading() @hideloading

隐藏 loading 提示框。

### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **HideLoadingOptions** | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | uni.showLoading参数定义 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| loadingPage | [UniPage](/api/unipage.md) | 否 | - | Web: 4.0; 微信小程序: x; Android: x; iOS: x; iOS uni-app x UTS 插件: x; HarmonyOS 系统版本: 12; HarmonyOS: x | 期望隐藏的目标LoadingPage 如果为null 会关闭当前栈顶全部LoadingPage |
| success | (res: HideLoadingSuccess) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.hideLoading成功回调函数定义 |
| fail | (res: [HideLoadingFail](#hideloadingfail-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.hideLoading失败回调函数定义 |
| complete | (res: any) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | uni.hideLoading完成回调函数定义 |
| noConflict | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.22.1`<br/><br/>目前 toast 和 loading 相关接口可以相互混用，此参数可用于取消混用特性<br/> | 

#### HideLoadingFail 的属性值 @hideloadingfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | uni.showLoading失败回调参数 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |




<!-- UTSAPIJSON.hideLoading.example -->

### hideLoading 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.11 | 4.61 | 5.0 |



### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ui.loading.hideLoading)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/ui/prompt.html#hideloading)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.hideLoading.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=hideLoading&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=hideLoading&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=hideLoading&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=hideLoading&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=hideLoading)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=hideLoading&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## uni.showModal(options) @showmodal

显示模态弹窗，可以只有一个确定按钮，也可以同时有确定和取消按钮。类似于一个API整合了 html 中：alert、confirm。

### showModal 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **ShowModalOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| title | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 提示的标题 |
| content | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 提示的内容 |
| showCancel | boolean | 否 | true<br/>是否显示取消按钮，默认为 true | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| cancelText | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 取消按钮的文字，默认为"取消" |
| cancelColor | [string.ColorString](/uts/data-type.md#ide-string) | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 取消按钮的文字颜色，默认为"#000000" |
| confirmText | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 确定按钮的文字，默认为"确定" |
| confirmColor | [string.ColorString](/uts/data-type.md#ide-string) | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 确定按钮的文字颜色 |
| editable | boolean | 否 | false | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 是否显示输入框 |
| placeholderText | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 显示输入框时的提示文本 |
| success | (result: [UniShowModalResult](#unishowmodalresult-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [ShowModalFail](#showmodalfail-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### UniShowModalResult 的属性值 @unishowmodalresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| content | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | editable 为 true 时，用户输入的文本 |
| cancel | boolean | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 为 true 时，表示用户点击了取消（用于 Android 系统区分点击蒙层关闭还是点击取消按钮关闭） |
| confirm | boolean | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 为 true 时，表示用户点击了确定按钮 |

#### ShowModalFail 的属性值 @showmodalfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |


### 返回值 

| 类型 | 必备 |
| :- | :- |
| [UniPage](/api/unipage.md) | 否 |
 


<!-- UTSAPIJSON.showModal.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ui.modal.showModal)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/ui/prompt.html#showmodal)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showModal.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=showModal&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=showModal&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=showModal&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=showModal&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=showModal)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=showModal&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## uni.showActionSheet(options) @showactionsheet

从底部向上弹出操作菜单

### showActionSheet 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **ShowActionSheetOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | uni.showActionSheet函数参数定义 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| title | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 菜单标题 |
| alertText | string | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 警示文案（仅微信小程序真机有效） |
| itemList | Array&lt;string&gt; | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 按钮的文字数组 |
| itemColor | [string.ColorString](/uts/data-type.md#ide-string) | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 按钮的文字颜色，字符串格式 |
| popover | **Popover** | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 大屏设备弹出原生选择按钮框的指示区域，默认居中显示 |
| titleColor | [string.ColorString](/uts/data-type.md#ide-string) | 否 | - | Web: 4.51; 微信小程序: x; Android: 4.51; iOS: 4.51; iOS uni-app x UTS 插件: 4.51; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 菜单标题文字颜色，字符串格式 |
| cancelText | string | 否 | - | Web: 4.51; 微信小程序: x; Android: 4.51; iOS: 4.51; iOS uni-app x UTS 插件: 4.51; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 取消按钮的文字，默认为"取消" |
| cancelColor | [string.ColorString](/uts/data-type.md#ide-string) | 否 | - | Web: 4.51; 微信小程序: x; Android: 4.51; iOS: 4.51; iOS uni-app x UTS 插件: 4.51; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 取消按钮的文字颜色，字符串格式 |
| backgroundColor | [string.ColorString](/uts/data-type.md#ide-string) | 否 | - | Web: 4.51; 微信小程序: x; Android: 4.51; iOS: 4.51; iOS uni-app x UTS 插件: 4.51; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 弹框背景颜色 |
| success | (result: [ShowActionSheetSuccess](#showactionsheetsuccess-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [ShowActionSheetFail](#showactionsheetfail-values)) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### popover 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| top | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 指示区域坐标，使用原生 navigationBar 时一般需要加上 navigationBar 的高度 |
| left | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 指示区域坐标 |
| width | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 指示区域宽度 |
| height | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 指示区域高度 |

#### ShowActionSheetSuccess 的属性值 @showactionsheetsuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| tapIndex | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### ShowActionSheetFail 的属性值 @showactionsheetfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | showActionSheet 错误码<br/>- 4: 框架内部异常 |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |


itemList，即actionsheet的列表项，在app和小程序上最多6项，超出会报错。在web上超出不报错，列表区变为可滚动。



<!-- UTSAPIJSON.showActionSheet.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.ui.actionSheet.showActionSheet)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/ui/prompt.html#showactionsheet)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showActionSheet.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=showActionSheet&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=showActionSheet&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=showActionSheet&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=showActionSheet&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=showActionSheet)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=showActionSheet&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- UTSAPIJSON.prompt.example -->

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |


## Bug & Tips@tips
- 目前web和App的弹窗UI风格不统一，后续会修复
