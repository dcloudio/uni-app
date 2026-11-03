<!-- ## uni.isSimulator() @issimulator -->

::: sourceCode
## uni.isSimulator() @issimulator

> issues: https://issues.dcloud.net.cn/?mid=api.device.isSimulator


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-getDeviceInfo

:::

判断当前是否是模拟器，Android设备上会采集传感器信息。

从4.51+，uni.getDeviceInfo里的isSimulator由于隐私政策原因，去掉了访问传感器列表。独立了一个单独的`uni.isSimulator`。

本API可以根据传感器的信息更准确的识别是否为模拟器。但本API在Android平台上线应用商店时，务必注意需要在隐私协议中声明，并确保在隐私协议被用户同意后再调用。

有些模拟器会故意伪装真机，此时可能识别不准确。

iOS平台请暂时继续使用[uni.getDeviceInfo](./get-device-info.md)

### isSimulator 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/doc/search?q=isSimulator&amp;sector=miniprogram"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=isSimulator&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS"}],"rows":[["&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","4.51","4.51","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;"]],"status":"PARTIALLY_SUPPORTED"}' />




### 返回值 

| 类型 |
| :- |
| boolean |
 


### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/is-simulator/is-simulator.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/is-simulator/is-simulator.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/is-simulator/is-simulator
```uvue
<template>
    <view>
      <page-head :title="'isSimulator'"></page-head>
      <view class="uni-common-mt" style="justify-content: center;align-items: center;">
        <text>{{
		        isSimulator ? "当前设备是模拟器" : "当前设备不是模拟器"
		      }}</text>
        <text>\n注：有些模拟器会故意伪装为真机，此时识别可能会不准确</text>
      </view>
    </view>
</template>

<script setup lang="ts">
  const isSimulator = ref(false)
  isSimulator.value = uni.isSimulator()
</script>

<style>

</style>

```
:::



### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/is-simulator/is-simulator.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/is-simulator/is-simulator.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/is-simulator/is-simulator
```uvue
<template>
    <view>
      <page-head :title="'isSimulator'"></page-head>
      <view class="uni-common-mt" style="justify-content: center;align-items: center;">
        <text>{{
		        isSimulator ? "当前设备是模拟器" : "当前设备不是模拟器"
		      }}</text>
        <text>\n注：有些模拟器会故意伪装为真机，此时识别可能会不准确</text>
      </view>
    </view>
</template>

<script setup lang="ts">
  const isSimulator = ref(false)
  isSimulator.value = uni.isSimulator()
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

