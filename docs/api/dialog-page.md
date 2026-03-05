## dialogPage概述
HBuilderX 4.31+新增了dialogPage，适用于制作弹框和内置界面。

### 需求背景
- uni.showModal、actionsheet，自定义性不足
- 通过前端组件实现的弹框，无法覆盖pages.json的导航栏和tabbar
- 前端实现的弹框，无法拦截back按键，一点back整页关了
- 组件方式实现弹框，需要每个页面都引入组件，写法较麻烦
- 部分内置API涉及界面但没有统一管理，比如chooseLocation、previewImage等。

### dialogPage方案
dialogPage是一种背景透明的页面，可以覆盖pages.json中的导航栏和tabbar。之前的page被称为主page或parentPage。dialogPage需要挂在主page上。

dialogPage是一种特殊的page，它和主page有很多相同之处：
- dialogPage需在pages.json注册
- dialogPage有页面生命周期，onLoad里也可以拿到各种参数
- dialogPage里如果引用了组件，对于组件而言，其page就是dialogPage。组合式组件中监听onPageShow，是监听dialogPage，而不是dialogPage的parentPage。
- dialogPage可以通过uni.$on等eventbus方案进行页面级通信

dialogPage和主page的区别：
- dialogPage的背景固定为透明、大小为铺满应用。蒙层由页面内部实现，蒙层颜色、是否响应点击，均由页面内部处理。如果是模态，蒙层不应该允许点击；非模态，则点击蒙层应关闭dialogPage
- dialogPage不使用uni.navigatorTo等路由API，而是单独提供了`openDialogPage`和`closeDialogPage`
- dialogPage不影响页面栈和路由地址，在getCurrentPages里不能直接得到dialogPage（需在UniPage对象通过getDialogPages获取）
- 因为dialogPage不进入主页面栈，那么`uni.getElementById`是无法获取到dialogPage内的元素的。因为uni这个全局API是获取栈顶元素。如果想获取指定页面的元素，需获取到指定页面的UniPage对象，在这个对象上使用.getElementById方法。如果想获取当前dialogPage页面的元素，应该使用 `this.$page.getElementById()(Options API)` | `getCurrentInstance()?.proxy?.$page.getElementById()(Composition API)`。
- dialogPage在Android上并不是一个activity，而是一个全屏view，它和主page所属同一个activity。
- dialogPage默认不响应iOS侧滑返回，即disableSwipeBack默认值为true，可以在pages.json中进行配置。响应Android和Harmony的back键和back手势，可通过dialogPage onBackPress生命周期控制是否阻止Android的back键和back手势关闭dialogPage。
- dialogPage默认不影响调用页面或其parentPage的show、hide生命周期。如需影响，比如弹出全屏界面时，需手动设置triggerParentHide
- dialogPage中可以调用普通路由api，比如uni.navigateTo、navigateBack，但并不作用于dialogPage，而是作用于其parentPage。即，之前的路由API均只作用于主Page。
- 在web平台，dialogPage显示时，不影响URL的变化。
- dialogPage默认没有窗体动画。如果是半屏内容，建议在页面内通过css或uts操作页面元素进行动画，灵活度更高。如果是全屏界面，可以使用窗体动画，但没有popin这种与上一个页面的联动动画。

dialogPage的绑定：
- dialogPage需绑定在某个主页面上，即parentPage。parentPage页面关闭时，自动销毁相关dialogPage。
- 在app的onLaunch调用openDialogPage，绑定到首页。
- `openDialogPage` 时可通过 `parentPage` 参数指定所属页面，不指定时默认为当前页面。

多dialogPage注意事项：
- dialogPage可以有多个，通过UniPage对象的getDialogPages()可以获取主页面挂载的所有dialogPage。
- 多个dialogPage层叠时，可以通过close api任意关闭某个dialogPage。
- 当前 dialogPage 打开时会触发前一个 dialogPage onHide 生命周期，关闭时会触发前一个 dialogPage onShow 生命周期。
- `uni.showActionSheet`、`uni.showModal`、`uni.showLoading` 打开的弹框也是由 dialogPage 实现，所以调用这些 API 时，会触发前一个 dialogPage 的 onHide 生命周期，关闭对应弹框时，会触发前一个 dialogPage 的 onShow 生命周期。

调用时机注意事项：
- 最早的调用时机是在app的onLaunch里调用openDialogPage，不支持在main.uts中调用openDialogPage。

app-android平台注意事项：
- dialogPage不会创建Android原生Activity，复用parentPage的Android原生Activity。

<!-- ## uni.openDialogPage(options) @opendialogpage -->

::: sourceCode
## uni.openDialogPage(options) @opendialogpage

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-dialogPage


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-dialogPage

:::

打开模态弹窗页面

### openDialogPage 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.31 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.31 | 4.31 | 4.31 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **OpenDialogPageOptions** | 是 | - | Web: 4.31; 微信小程序: x; Android: 4.31; iOS: 4.31; iOS uni-app x UTS 插件: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 打开 dialogPage 参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| url | string ([string.PageURIString](/uts/data-type.md#ide-string)) | 是 | - | Web: 4.31; 微信小程序: x; Android: 4.31; iOS: 4.31; iOS uni-app x UTS 插件: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数 |
| animationType | string | 否 | none | Web: 4.31; 微信小程序: x; Android: 4.31; iOS: 4.31; iOS uni-app x UTS 插件: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 窗口显示的动画类型<br/> |
| animationDuration | number | 否 | - | Web: 4.31; 微信小程序: x; Android: 4.31; iOS: 4.31; iOS uni-app x UTS 插件: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 窗口关闭动画的持续时间，单位为 ms |
| disableEscBack | boolean | 否 | false | Web: 4.31; 微信小程序: x; Android: 4.31; iOS: 4.31; iOS uni-app x UTS 插件: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 是否禁用按键盘 ESC 时关闭 |
| parentPage | [UniPage](/api/unipage.md) | 否 | - | Web: 4.31; 微信小程序: x; Android: 4.31; iOS: 4.31; iOS uni-app x UTS 插件: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 要绑定的父级页面实例 |
| triggerParentHide | boolean | 否 | false | Web: 4.41; 微信小程序: x; Android: 4.41; iOS: 4.41; iOS uni-app x UTS 插件: 4.41; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 是否触发父页面的 onHide 生命周期 |
| success | (result: [OpenDialogPageSuccess](#opendialogpagesuccess-values)) => void | 否 | - | Web: 4.31; 微信小程序: x; Android: 4.31; iOS: 4.31; iOS uni-app x UTS 插件: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用成功的回调函数 |
| fail | (result: [OpenDialogPageFail](#opendialogpagefail-values)) => void | 否 | - | Web: 4.31; 微信小程序: x; Android: 4.31; iOS: 4.31; iOS uni-app x UTS 插件: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用失败的回调函数 |
| complete | (result: [OpenDialogPageComplete](#opendialogpagecomplete-values)) => void | 否 | - | Web: 4.31; 微信小程序: x; Android: 4.31; iOS: 4.31; iOS uni-app x UTS 插件: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### animationType 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| auto | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 自动选择动画效果 |
| none | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 无动画效果 |
| slide-in-right | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 从右侧横向滑动效果 |
| slide-in-left | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 左侧横向滑动效果 |
| slide-in-top | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 从上侧竖向滑动效果 |
| slide-in-bottom | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 从下侧竖向滑动效果 |
| fade-in | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 从透明到不透明逐渐显示效果 |
| zoom-out | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 从小到大逐渐放大显示效果 |
| zoom-fade-out | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 从小到大逐渐放大并且从透明到不透明逐渐显示效果 |

#### OpenDialogPageSuccess 的属性值 @opendialogpagesuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - |  |

#### OpenDialogPageFail 的属性值 @opendialogpagefail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 路由错误码<br/>- 4: 框架内部异常 |
| errSubject | string | 是 | - | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - |  |

#### OpenDialogPageComplete 的属性值 @opendialogpagecomplete-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - |  |


### 返回值 

| 类型 | 必备 |
| :- | :- |
| [UniPage](/api/unipage.md) | 否 |
 


<!-- UTSAPIJSON.openDialogPage.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.page.dialogPage.openDialogPage)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=openDialogPage&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=openDialogPage&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=openDialogPage&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=openDialogPage&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=openDialogPage&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=openDialogPage)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=openDialogPage&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.closeDialogPage(options?) @closedialogpage -->

::: sourceCode
## uni.closeDialogPage(options?) @closedialogpage

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-dialogPage


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-dialogPage

:::

关闭模态弹窗页面


`closeDialogPage` 可通过 `dialogPage` 参数指定要关闭的 `dialogPage`, 不指定时默认关闭当前页面的所有 `dialogPage`。

### closeDialogPage 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.31 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.31 | 4.31 | 4.31 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **CloseDialogPageOptions** | 否 | - | Web: 4.31; 微信小程序: x; Android: 4.31; iOS: 4.31; iOS uni-app x UTS 插件: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 关闭 dialogPage 参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| dialogPage | [UniPage](/api/unipage.md) | 否 | - | Web: 4.31; 微信小程序: x; Android: 4.31; iOS: 4.31; iOS uni-app x UTS 插件: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 要关闭的 dialogPage 实例 |
| animationType | string | 否 | auto | Web: x; 微信小程序: x; Android: 4.31; iOS: 4.31; iOS uni-app x UTS 插件: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 窗口关闭的动画类型<br/> |
| animationDuration | number | 否 | - | Web: x; 微信小程序: x; Android: 4.31; iOS: 4.31; iOS uni-app x UTS 插件: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 窗口关闭动画的持续时间，单位为 ms |
| success | (result: [CloseDialogPageSuccess](#closedialogpagesuccess-values)) => void | 否 | - | Web: 4.31; 微信小程序: x; Android: 4.31; iOS: 4.31; iOS uni-app x UTS 插件: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用成功的回调函数 |
| fail | (result: [CloseDialogPageFail](#closedialogpagefail-values)) => void | 否 | - | Web: 4.31; 微信小程序: x; Android: 4.31; iOS: 4.31; iOS uni-app x UTS 插件: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用失败的回调函数 |
| complete | (result: [CloseDialogPageComplete](#closedialogpagecomplete-values)) => void | 否 | - | Web: 4.31; 微信小程序: x; Android: 4.31; iOS: 4.31; iOS uni-app x UTS 插件: 4.31; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 接口调用结束的回调函数（调用成功、失败都会执行） | 

##### animationType 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| auto | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 自动选择动画效果 |
| none | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 无动画效果 |
| slide-out-right | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 横向向右侧滑出屏幕动画 |
| slide-out-left | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 横向向左侧滑出屏幕动画 |
| slide-out-top | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 竖向向上侧滑出屏幕动画 |
| slide-out-bottom | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 竖向向下侧滑出屏幕动画 |
| fade-out | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 从不透明到透明逐渐隐藏动画 |
| zoom-in | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 从大逐渐缩小关闭动画 |
| zoom-fade-in | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 从大逐渐缩小并且从不透明到透明逐渐隐藏关闭动画 |

#### CloseDialogPageSuccess 的属性值 @closedialogpagesuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - |  |

#### CloseDialogPageFail 的属性值 @closedialogpagefail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 路由错误码<br/>- 4: 框架内部异常 |
| errSubject | string | 是 | - | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - |  |

#### CloseDialogPageComplete 的属性值 @closedialogpagecomplete-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: x; Android: -; iOS: -; HarmonyOS: - |  |


### 返回值 

| 类型 |
| :- |
| null |
 


<!-- UTSAPIJSON.closeDialogPage.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.page.dialogPage.closeDialogPage)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=closeDialogPage&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=closeDialogPage&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=closeDialogPage&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=closeDialogPage&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=closeDialogPage&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=closeDialogPage)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=closeDialogPage&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/dialog-page/dialog-page.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/dialog-page/dialog-page.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/dialog-page/dialog-page

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/dialog-page/dialog-page

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex: 1;">
  <!-- #endif -->
  <view class="uni-padding-wrap">
    <view class="uni-common-mt flex-row" v-if="data.pageBody != null"><text>pageBody: {</text>
      <text>top: </text><text id="page-body-top">{{data.pageBody!.top}}</text><text>,</text>
      <text>right: </text><text id="page-body-right">{{data.pageBody!.right}}</text><text>,</text>
      <text>bottom: </text><text id="page-body-bottom">{{data.pageBody!.bottom}}</text><text>,</text>
      <text>left: </text><text id="page-body-left">{{data.pageBody!.left}}</text><text>,</text>
      <text>width: </text><text id="page-body-width">{{data.pageBody!.width}}</text><text>,</text>
      <text>height: </text><text id="page-body-height">{{data.pageBody!.height}}</text>
      <text>}</text>
    </view>
    <view class="uni-common-mt flex-row" v-if="data.safeAreaInsets != null"><text>safeAreaInsets: {</text>
      <text>top: </text><text id="page-safe-area-insets-top">{{data.safeAreaInsets!.top}}</text><text>,</text>
      <text>right: </text><text id="page-safe-area-insets-right">{{data.safeAreaInsets!.right}}</text><text>,</text>
      <text>bottom: </text><text id="page-safe-area-insets-bottom">{{data.safeAreaInsets!.bottom}}</text><text>,</text>
      <text>left: </text><text id="page-safe-area-insets-left">{{data.safeAreaInsets!.left}}</text><text>}</text>
    </view>
    <!-- #ifdef APP-ANDROID || APP-IOS || APP-HARMONY || WEB -->
    <view class="uni-common-mt flex-row" v-if="data.width != null"><text>width: </text><text id="page-width">{{data.width!}}</text>
    </view>
    <view class="uni-common-mt flex-row" v-if="data.height != null"><text>height: </text><text id="page-height">{{data.height!}}</text>
    </view>
    <view class="uni-common-mt flex-row" v-if="data.statusBarHeight != null"><text>statusBarHeight: </text><text id="page-statusBarHeight">{{data.statusBarHeight!}}</text>
    </view>
    <!-- #endif -->
    <button class="uni-common-mt" id="go-next-page" @click="goNextPage">
      go next page
    </button>
    <button class="uni-common-mt" id="open-dialog1" @click="openDialog1">
      open dialog 1
    </button>
    <button class="uni-common-mt" id="open-dialog11" @click="openDialog11">
      open dialog 1-1
    </button>
    <button class="uni-common-mt" id="open-dialog1-wrong-path" @click="openDialog1WrongPath">
      open dialog page 1 with wrong path
    </button>
    <button class="uni-common-mt" id="go-next-page-open-dialog1" @click="goNextPageOpenDialog1">
      go next page & open dialog1
    </button>
    <button class="uni-common-mt" id="open-dialog3" @click="openDialog3">
      open dialog 3 test page style
    </button>
    <button class="uni-common-mt" id="open-dialog4" @click="openDialogWithTriggerParentHide">
      openDialog with triggerParentHide
    </button>
    <button class="uni-common-mt" id="open-dialog5" @click="openDialogCheckMoreAttribute">
      openDialog check more attribute
    </button>
    <button class="uni-common-mt" id="open-dialog1-with-relative-path" @click="openDialogWithRelativePath">
      openDialog with relative path
    </button>
    <button class="uni-common-mt" id="open-dialog6" @click="openDialogCheckSetNavigationBarColor">
      openDialog check setNavigationBarColor
    </button>
    <button class="uni-common-mt" @click="openDialogWithTextarea">
      openDialog with textarea
    </button>
    <button class="uni-common-mt" @click="openDialogWithInput">
      openDialog with input
    </button>
    <text class="uni-common-mt choose-open-animation-type-title">choose open dialogPage animationType</text>
    <radio-group class="choose-open-animation-type-radio-group" @change="handleOpenAnimationType">
      <radio class="ml-10 uni-common-mt" v-for="item in data.openAnimationTypeList" :key="item" :value="item"
        :checked="data.openAnimationType == item">{{ item }}
      </radio>
    </radio-group>
  </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import {
    state,
    setLifeCycleNum
  } from '@/store/index.uts'

  type OpenAnimationType =
    'auto' |
    'none' |
    'slide-in-right' |
    'slide-in-left' |
    'slide-in-top' |
    'slide-in-bottom' |
    'fade-in' |
    'zoom-out' |
    'zoom-fade-out'

  type DataType = {
    pageBody: UniPageBody | null;
    safeAreaInsets: UniSafeAreaInsets | null;
    width: number | null;
    height: number | null;
    statusBarHeight: number | null;
    jest_click_x: number;
    jest_click_y: number;
    openAnimationType: OpenAnimationType;
    openAnimationTypeList: string[];
  }

  const data = reactive({
    pageBody: null,
    safeAreaInsets: null,
    width: null,
    height: null,
    statusBarHeight: null,
    jest_click_x: -1,
    jest_click_y: -1,
    openAnimationType: 'none',
    openAnimationTypeList: [
      'auto',
      'none',
      'slide-in-right',
      'slide-in-left',
      'slide-in-top',
      'slide-in-bottom',
      'fade-in',
      'zoom-out',
      'zoom-fade-out'
    ]
  } as DataType)
  onLoad(() => {
    console.log('dialogPage parent onLoad')
  })

  onPageShow(() => {
    console.log('dialogPage parent onShow')
    setLifeCycleNum(state.lifeCycleNum + 10)
  })

  onReady(() => {
    console.log('dialogPage parent onReady')
    const currentPage = getCurrentPages()[getCurrentPages().length - 1]
    data.pageBody = currentPage.pageBody;
    data.safeAreaInsets = currentPage.safeAreaInsets
    // #ifdef APP-ANDROID || APP-IOS || APP-HARMONY || WEB
    data.width = currentPage.width
    data.height = currentPage.height
    data.statusBarHeight = currentPage.statusBarHeight
    // #endif
  })

  onPageHide(() => {
    console.log('dialogPage parent onHide')
    setLifeCycleNum(state.lifeCycleNum - 10)
  })

  onUnload(() => {
    console.log('dialogPage parent onUnload')
  })
  const goNextPage = () => {
    uni.navigateTo({
      url: '/pages/API/dialog-page/next-page'
    })
  }
  const openDialog1 = () => {
    uni.openDialogPage({
      url: '/pages/API/dialog-page/dialog-1?name=dialog1',
      animationType: data.openAnimationType,
      success(res) {
        console.log('openDialogPage1 success', res)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum + 1)
      },
      fail(err) {
        console.log('openDialogPage1 fail', err)
        setLifeCycleNum(state.lifeCycleNum - 4)
      },
      complete(res) {
        console.log('openDialogPage1 complete', res)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum + 1)
      }
    })
  }
  const openDialog11 = () => {
    uni.openDialogPage({
      url: '/pages/API/dialog-page/dialog-1-1',
      animationType: data.openAnimationType
    })
  }
  const openDialog2 = () => {
    uni.openDialogPage({
      url: '/pages/API/dialog-page/dialog-2',
      animationType: data.openAnimationType,
      disableEscBack: true,
      success(res) {
        console.log('openDialog2 success', res)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum + 1)
      },
      fail(err) {
        console.log('openDialog2 fail', err)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum - 4)
      },
      complete(res) {
        console.log('openDialog2 complete', res)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum + 1)
      }
    })
  }
  const openDialog1WrongPath = () => {
    uni.openDialogPage({
      url: '/pages/API/dialog-page/dialog-11?name=dialog1',
      success(res) {
        console.log('openDialogPage1 success', res)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum + 1)
      },
      fail(err) {
        console.log('openDialogPage1 fail', err)
        setLifeCycleNum(state.lifeCycleNum - 4)
      },
      complete(res) {
        console.log('openDialogPage1 complete', res)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum + 1)
      }
    })
  }
  const goNextPageOpenDialog1 = () => {
    uni.navigateTo({
      url: '/pages/API/dialog-page/next-page',
      success() {
        setTimeout(() => {
          uni.openDialogPage({
            url: '/pages/API/dialog-page/dialog-1?name=dialog1',
            animationType: data.openAnimationType,
            success(res) {
              console.log('openDialogPage1 success', res)
              // 自动化测试
              setLifeCycleNum(state.lifeCycleNum + 1)
            },
            fail(err) {
              console.log('openDialogPage1 fail', err)
              // 自动化测试
              setLifeCycleNum(state.lifeCycleNum - 4)
            },
            complete(res) {
              console.log('openDialogPage1 complete', res)
              // 自动化测试
              setLifeCycleNum(state.lifeCycleNum + 1)
            }
          })
        }, 2000)
      }
    })
  }
  const closeDialog = () => {
    uni.closeDialogPage({
      success(res) {
        console.log('closeDialog success', res)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum + 1)
      },
      fail(err) {
        console.log('closeDialog fail', err)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum - 4)
      },
      complete(res) {
        console.log('closeDialog complete', res)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum + 1)
      }
    })
  }
  const closeSpecifiedDialog = (index : number) => {
    const dialogPages = getCurrentPages()[getCurrentPages().length - 1].getDialogPages()
    uni.closeDialogPage({
      dialogPage: dialogPages[index],
      success(res) {
        console.log('closeSomeOneDialog success', res)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum + 1)
      },
      fail(err) {
        console.log('closeSomeOneDialog fail', err)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum - 4)
      },
      complete(res) {
        console.log('closeSomeOneDialog complete', res)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum + 1)
      }
    })
  }
  // 自动化测试
  const openDialog4 = () => {
    uni.openDialogPage({
      url: '/pages/API/dialog-page/dialog-4',
    })
  }
  const openDialogWithTriggerParentHide = () => {
    uni.openDialogPage({
      url: `/pages/API/dialog-page/dialog-4?tag=${Date.now()}`,
      triggerParentHide: true,
      success(res) {
        console.log('openDialogWithTriggerParentHide success', res)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum + 1)
      },
      fail(err) {
        console.log('openDialogWithTriggerParentHide fail', err)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum - 4)
      },
      complete(res) {
        console.log('openDialogWithTriggerParentHide complete', res)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum + 1)
      }
    })
  }
  const openDialogCheckMoreAttribute = () => {
    uni.openDialogPage({
      url: '/pages/API/dialog-page/dialog-5',
    })
  }
  const openDialogCheckSetNavigationBarColor = () => {
    uni.openDialogPage({
      url: '/pages/API/dialog-page/dialog-6',
    })
  }
  const openDialogWithTextarea = () => {
    uni.openDialogPage({
      url: '/pages/API/dialog-page/dialog-textarea'
    })
  }
  const openDialogWithInput = () => {
    uni.openDialogPage({
      url: '/pages/API/dialog-page/dialog-input'
    })
  }
  const setLifeCycleNumFunc = (value : number) => {
    setLifeCycleNum(value)
  }
  const getLifeCycleNum = () : number => {
    return state.lifeCycleNum
  }
  const closeDialogSimple = () => {
    uni.closeDialogPage()
  }
  const jest_getTapPoint = () => {
    const systemInfo = uni.getSystemInfoSync()
    let ratio = 1
    if (systemInfo.platform == 'android') {
      ratio = systemInfo.devicePixelRatio
    }
    data.jest_click_x = systemInfo.screenWidth / 2 * ratio
    data.jest_click_y = systemInfo.statusBarHeight * ratio + 10
  }
  const openDialog2Simple = () => {
    uni.openDialogPage({
      url: '/pages/API/dialog-page/dialog-2'
    });
  }
  const setPageStyleForTest = (style : UTSJSONObject) => {
    const pages = getCurrentPages()[getCurrentPages().length - 1].getDialogPages();
    if (pages.length > 0) pages[pages.length - 1].setPageStyle(style);
  }
  const setPageStyleForTest2 = (style : UTSJSONObject) => {
    getCurrentPages()[getCurrentPages().length - 1].setPageStyle(style);
  }
  const openDialog3 = () => {
    uni.openDialogPage({ url: '/pages/API/dialog-page/dialog-3', animationType: data.openAnimationType })
  }
  const handleOpenAnimationType = (e : RadioGroupChangeEvent) => {
    data.openAnimationType = e.detail.value as OpenAnimationType
  }
  const openDialogWithRelativePath = () => {
    uni.openDialogPage({
      url: './dialog-1?name=dialog1',
      animationType: data.openAnimationType,
      success(res) {
        console.log('openDialogPage1 success', res)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum + 1)
      },
      fail(err) {
        console.log('openDialogPage1 fail', err)
        setLifeCycleNum(state.lifeCycleNum - 4)
      },
      complete(res) {
        console.log('openDialogPage1 complete', res)
        // 自动化测试
        setLifeCycleNum(state.lifeCycleNum + 1)
      }
    })
  }
  // 自动化测试
  const getDialogPage = () : UniPage | null => {
    const dialogPages = getCurrentPages()[getCurrentPages().length - 1].getDialogPages()
    return dialogPages.length > 0 ? dialogPages[0] : null
  }
  // 自动化测试
  const getDialogPageRoute = () : string => {
    const dialogPage = getDialogPage()
    if(dialogPage != null){
      return dialogPage.route
    }
    return ''
  }
  // 自动化测试
  const dialogPageCheckGetDialogPages = () : boolean => {
    const dialogPage = getDialogPage()!
    const dialogPages = dialogPage.getDialogPages()
    const res = dialogPages.length == 0
    return res
  }
  // 自动化测试
  const dialogPageGetPageStyle = () : UTSJSONObject => {
    const dialogPage = getDialogPage()!
    return dialogPage.getPageStyle()
  }
  // 自动化测试
  const dialogPageSetPageStyle = () => {
    const dialogPage = getDialogPage()!
    dialogPage.setPageStyle({
      backgroundColorContent: 'red'
    })
  }
  // 自动化测试
  const dialogPageCheckGetElementById = () : boolean => {
    const dialogPage = getDialogPage()!
    const element = dialogPage.getElementById('dialog1-go-next-page')
    let res = element != null
    // #ifndef APP-ANDROID
    if (res) {
      const elPage = element!.getPage()
      console.log('elPage', elPage)
      res = elPage === dialogPage
    }
    // #endif
    return res
  }
  // 自动化测试
  const dialogCheckGetAndroidView = () : boolean => {
    const dialogPage = getDialogPage()!
    const androidView = dialogPage.getAndroidView()
    const res = androidView != null
    return res
  }
  // 自动化测试
  const dialogCheckGetIOSView = () : boolean => {
    const dialogPage = getDialogPage()!
    const IOSView = dialogPage.getIOSView()
    const res = IOSView != null
    return res
  }
  // 自动化测试
  const dialogCheckGetHTMLElement = () : boolean => {
    const dialogPage = getDialogPage()!
    const HTMLView = dialogPage.getHTMLElement()
    const res = HTMLView != null
    return res
  }

  defineExpose({
    data,
    getLifeCycleNum,
    setLifeCycleNum: setLifeCycleNumFunc,
    openDialog1,
    openDialog11,
    openDialog2,
    openDialog1WrongPath,
    goNextPageOpenDialog1,
    closeDialog,
    closeSpecifiedDialog,
    openDialog4,
    openDialogWithTriggerParentHide,
    openDialogCheckMoreAttribute,
    openDialogWithInput,
    closeDialogSimple,
    jest_getTapPoint,
    openDialog2Simple,
    setPageStyleForTest,
    setPageStyleForTest2,
    openDialog3,
    openDialogWithRelativePath,
    getDialogPageRoute,
    dialogPageCheckGetDialogPages,
    dialogPageGetPageStyle,
    dialogPageSetPageStyle,
    dialogPageCheckGetElementById,
    dialogCheckGetAndroidView,
    dialogCheckGetIOSView,
    dialogCheckGetHTMLElement,
    openDialogCheckSetNavigationBarColor
  })
</script>

<style>
  .uni-padding-wrap{
    padding-bottom: var(--uni-safe-area-inset-bottom);
  }

  .ml-10 {
    margin-left: 10px;
  }

  .choose-open-animation-type-title {
    font-weight: bold;
  }

  .choose-open-animation-type-radio-group {
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }
  .flex-row{
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>

```

:::

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |


## Tips
* 可通过如下方式获取 `dialogPage`。
```js
// 1. 通过 parentPage 获取 dialogPage 集合
const pages = getCurrentPages()
// 获取当前页面
const page = pages[pages.length-1]
// 获取当前页面的 `dialogPage` 集合
const dialogPages = page.getDialogPages()

// 2. 在 dialogPage 中通过 this.$page 获取 dialogPage 实例 (组件中不支持)
// 选项式 API
const dialogPage = this.$page
// 组合式 API
const currentInstance = getCurrentInstance()
const dialogPage = currentInstance?.proxy?.$page
```
* tabBar 页面中的 `dialogPage`，在 App 端不会随 tabBar 页面切换而隐藏，在 Web 端会随 tabBar 页面切换而隐藏。\
即：在 tabA 页面打开 dialogPage 后 switchTab 到 tabB 页面
在 App 端 dialogPage 仍会显示,\
在 Web 端 dialogPage 会隐藏，再次 switchTab 到 tabA 页面 dialogPage 会显示。
