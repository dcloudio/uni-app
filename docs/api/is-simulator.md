<!-- ## uni.isSimulator() @issimulator -->

::: sourceCode
## uni.isSimulator() @issimulator

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-getDeviceInfo


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-getDeviceInfo

:::

判断当前是否是模拟器，Android设备上会采集传感器信息。

从4.51+，uni.getDeviceInfo里的isSimulator由于隐私政策原因，去掉了访问传感器列表。独立了一个单独的`uni.isSimulator`。

本API可以根据传感器的信息更准确的识别是否为模拟器。但本API在Android平台上线应用商店时，务必注意需要在隐私协议中声明，并确保在隐私协议被用户同意后再调用。

有些模拟器会故意伪装真机，此时可能识别不准确。

iOS平台请暂时继续使用[uni.getDeviceInfo](./get-device-info.md)

### isSimulator 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.51 | 4.51 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |




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
  <!-- #ifdef APP -->
  <scroll-view style="flex:1">
  <!-- #endif -->
    <view>
      <page-head :title="'isSimulator'"></page-head>
      <view class="uni-common-mt" style="justify-content: center;align-items: center;">
        <text>{{
		        isSimulator ? "当前设备是模拟器" : "当前设备不是模拟器"
		      }}</text>
        <text>\n注：有些模拟器会故意伪装为真机，此时识别可能会不准确</text>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup>
  const isSimulator = ref(false)
  isSimulator.value = uni.isSimulator()
</script>

<style>

</style>

```
:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.isSimulator)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/tutorial/app-sec-api.html#issimulator)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=isSimulator&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=isSimulator&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=isSimulator&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=isSimulator&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=isSimulator&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=isSimulator)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=isSimulator&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/is-simulator/is-simulator.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/is-simulator/is-simulator.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/is-simulator/is-simulator
```uvue
<template>
  <!-- #ifdef APP -->
  <scroll-view style="flex:1">
  <!-- #endif -->
    <view>
      <page-head :title="'isSimulator'"></page-head>
      <view class="uni-common-mt" style="justify-content: center;align-items: center;">
        <text>{{
		        isSimulator ? "当前设备是模拟器" : "当前设备不是模拟器"
		      }}</text>
        <text>\n注：有些模拟器会故意伪装为真机，此时识别可能会不准确</text>
      </view>
    </view>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup>
  const isSimulator = ref(false)
  isSimulator.value = uni.isSimulator()
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

