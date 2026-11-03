<!-- ## uni.showNavigationBarLoading(options?) @shownavigationbarloading -->

::: sourceCode
## uni.showNavigationBarLoading(options?) @shownavigationbarloading

> issues: https://issues.dcloud.net.cn/?mid=api.page.navigatorBarLoading.showNavigationBarLoading


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-navigationBar

:::

在当前页面显示导航条加载动画


### showNavigationBarLoading 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/doc/search?q=showNavigationBarLoading&amp;sector=miniprogram"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=showNavigationBarLoading&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS(VDOM)","group":"HarmonyOS","subtitle":"VDOM"},{"title":"HarmonyOS(Vapor)","group":"HarmonyOS","subtitle":"Vapor"}],"rows":[["4.0","4.41","5.31","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","4.61","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **ShowNavigationBarLoadingOptions** | 否 | Android: x; iOS: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| success | (result: [ShowNavigationBarLoadingSuccess](#shownavigationbarloadingsuccess-values)) => void | 否 | Android: x; iOS: x |
| fail | (error: [ShowNavigationBarLoadingFail](#shownavigationbarloadingfail-values)) => void | 否 | Android: x; iOS: x |
| complete | () => void | 否 | Android: x; iOS: x | 

#### ShowNavigationBarLoadingSuccess 的属性值 @shownavigationbarloadingsuccess-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| errMsg | string | 是 | Android: x; iOS: x |

#### ShowNavigationBarLoadingFail 的属性值 @shownavigationbarloadingfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Android: x; iOS: x | 统一错误码 |
| errSubject | string | 是 | Android: x; iOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Android: x; iOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Android: x; iOS: x |  |




<!-- UTSAPIJSON.showNavigationBarLoading.example -->



<!-- ## uni.hideNavigationBarLoading(options?) @hidenavigationbarloading -->

::: sourceCode
## uni.hideNavigationBarLoading(options?) @hidenavigationbarloading

> issues: https://issues.dcloud.net.cn/?mid=api.page.navigatorBarLoading.hideNavigationBarLoading


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-navigationBar

:::

隐藏导航条加载动画


### hideNavigationBarLoading 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/doc/search?q=hideNavigationBarLoading&amp;sector=miniprogram"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=hideNavigationBarLoading&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS(VDOM)","group":"HarmonyOS","subtitle":"VDOM"},{"title":"HarmonyOS(Vapor)","group":"HarmonyOS","subtitle":"Vapor"}],"rows":[["4.0","4.41","5.31","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","4.61","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **HideNavigationBarLoadingOptions** | 否 | Android: x; iOS: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| success | (result: [HideNavigationBarLoadingSuccess](#hidenavigationbarloadingsuccess-values)) => void | 否 | Android: x; iOS: x |
| fail | (error: [HideNavigationBarLoadingFail](#hidenavigationbarloadingfail-values)) => void | 否 | Android: x; iOS: x |
| complete | () => void | 否 | Android: x; iOS: x | 

#### HideNavigationBarLoadingSuccess 的属性值 @hidenavigationbarloadingsuccess-values 

| 名称 | 类型 | 必备 | 兼容性 |
| :- | :- | :- |  :-: |
| errMsg | string | 是 | Android: x; iOS: x |

#### HideNavigationBarLoadingFail 的属性值 @hidenavigationbarloadingfail-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errCode | number | 是 | Android: x; iOS: x | 统一错误码 |
| errSubject | string | 是 | Android: x; iOS: x | 统一错误主题（模块）名称 |
| data | any | 否 | Android: x; iOS: x | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 |   | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | Android: x; iOS: x |  |




<!-- UTSAPIJSON.hideNavigationBarLoading.example -->



<!-- UTSAPIJSON.navigatorBarLoading.example -->

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |


## Tips
- 本API默认处理栈顶页面，而不是代码所在页面。[详见](./README.md#toppage)