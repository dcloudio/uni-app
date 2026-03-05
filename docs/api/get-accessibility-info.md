<!-- ## uni.getAccessibilityInfo() @getaccessibilityinfo -->

::: sourceCode
## uni.getAccessibilityInfo() @getaccessibilityinfo

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-getAccessibilityInfo


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-getAccessibilityInfo

:::

获取无障碍服务信息

如果手机启用了辅助应用功能，可以识别有哪些辅助应用的服务。辅助应用有时会被用于灰黑产实施自动点击，本API有助于开发者识别当前运行环境。

### getAccessibilityInfo 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | 4.51 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |




### 返回值 

| 类型 |
| :- |
| [UTSJSONObject](/uts/buildin-object-api/utsjsonobject.md) |
 


### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/get-accessibility-info/get-accessibility-info.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/get-accessibility-info/get-accessibility-info.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/get-accessibility-info/get-accessibility-info
```uvue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex:1">
  <!-- #endif -->
    <view>
      <page-head :title="'getAccessibilityInfo'"></page-head>
      <view class="uni-common-mt" >
        <text style="margin-left: 8px;">无障碍服务信息如下：</text>
        <text style="margin-top: 15px;padding: 8px;">{{
		        accessibilityInfo
		      }}</text>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup>
  const accessibilityInfo = ref("")
  accessibilityInfo.value = JSON.stringify(uni.getAccessibilityInfo())
</script>

<style>

</style>

```
:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.getAccessibilityInfo)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=getAccessibilityInfo&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getAccessibilityInfo&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getAccessibilityInfo&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getAccessibilityInfo&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getAccessibilityInfo&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getAccessibilityInfo)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getAccessibilityInfo&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/get-accessibility-info/get-accessibility-info.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/get-accessibility-info/get-accessibility-info.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/get-accessibility-info/get-accessibility-info
```uvue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex:1">
  <!-- #endif -->
    <view>
      <page-head :title="'getAccessibilityInfo'"></page-head>
      <view class="uni-common-mt" >
        <text style="margin-left: 8px;">无障碍服务信息如下：</text>
        <text style="margin-top: 15px;padding: 8px;">{{
		        accessibilityInfo
		      }}</text>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup>
  const accessibilityInfo = ref("")
  accessibilityInfo.value = JSON.stringify(uni.getAccessibilityInfo())
</script>

<style>

</style>

```
:::

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

