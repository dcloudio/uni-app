::: sourceCode
## uni.onWindowResize(callback) @onwindowresize

> issues: https://issues.dcloud.net.cn/?mid=api.ui.window.onWindowResize

:::

监听窗口尺寸变化事件

文档: [http://uniapp.dcloud.io/api/ui/window?id=onwindowresize](http://uniapp.dcloud.io/api/ui/window?id=onwindowresize)

App平台暂未提供全局的uni监听API，而是需要在页面生命周期onResize 中监听页面尺寸变化。[另见](../page.md#onresize)

### onWindowResize 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/doc/search?q=onWindowResize&amp;sector=miniprogram"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=onWindowResize&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS"}],"rows":[["4.0","4.41","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| callback | (result: [UniNamespace.WindowResizeResult](#uninamespace-values)) => void | 是 | 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 

### UniNamespace.WindowResizeResult 的属性值 @uninamespace-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| size | **WindowResizeResultSize** | 是 | 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 变化后的窗口的大小，单位为 px ，{windowWidth,windowHeight} |
| deviceOrientation | string | 否 | 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 变化后的设备方向<br/>- landscape: undefined<br/>- portrait: undefined |

#### size 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| windowWidth | number | 是 | 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 变化后的窗口宽度，单位 px |
| windowHeight | number | 是 | 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 变化后的窗口高度，单位 px |

#### deviceOrientation 的属性描述

| 合法值 | 兼容性 |
| :- |  :-: |
| "landscape" | 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x |
| "portrait" | 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x |






<!-- UTSAPIJSON.onWindowResize.example -->



::: sourceCode
## uni.offWindowResize(callback) @offwindowresize

> issues: https://issues.dcloud.net.cn/?mid=api.ui.window.offWindowResize

:::

取消监听窗口尺寸变化事件

文档: [http://uniapp.dcloud.io/api/ui/window?id=offwindowresize](http://uniapp.dcloud.io/api/ui/window?id=offwindowresize)

### offWindowResize 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/doc/search?q=offWindowResize&amp;sector=miniprogram"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=offWindowResize&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS"}],"rows":[["4.0","4.41","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| callback | (result: any) => void | 是 | 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 






<!-- UTSAPIJSON.offWindowResize.example -->



<!-- UTSAPIJSON.window.example -->

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |
