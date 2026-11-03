<!-- ## uni.getAccessibilityInfo() @getaccessibilityinfo -->

::: sourceCode
## uni.getAccessibilityInfo() @getaccessibilityinfo

> issues: https://issues.dcloud.net.cn/?mid=api.device.getAccessibilityInfo


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-getAccessibilityInfo

:::

获取无障碍服务信息

如果手机启用了辅助应用功能，可以识别有哪些辅助应用的服务。辅助应用有时会被用于灰黑产实施自动点击，本API有助于开发者识别当前运行环境。

### getAccessibilityInfo 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS"}],"rows":[["4.51","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />




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
    <view>
      <page-head :title="'getAccessibilityInfo'"></page-head>
      <view class="uni-common-mt" >
        <text style="margin-left: 8px;">无障碍服务信息如下：</text>
        <text style="margin-top: 15px;padding: 8px;">{{
		        accessibilityInfo
		      }}</text>
      </view>
    </view>
</template>

<script setup lang="ts">
  const accessibilityInfo = ref("")
  accessibilityInfo.value = JSON.stringify(uni.getAccessibilityInfo())
</script>

<style>

</style>

```
:::



### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/get-accessibility-info/get-accessibility-info.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/get-accessibility-info/get-accessibility-info.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/get-accessibility-info/get-accessibility-info
```uvue
<template>
    <view>
      <page-head :title="'getAccessibilityInfo'"></page-head>
      <view class="uni-common-mt" >
        <text style="margin-left: 8px;">无障碍服务信息如下：</text>
        <text style="margin-top: 15px;padding: 8px;">{{
		        accessibilityInfo
		      }}</text>
      </view>
    </view>
</template>

<script setup lang="ts">
  const accessibilityInfo = ref("")
  accessibilityInfo.value = JSON.stringify(uni.getAccessibilityInfo())
</script>

<style>

</style>

```
:::

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |

