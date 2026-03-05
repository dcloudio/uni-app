<!-- ## uni.onNetworkStatusChange(callback) @onnetworkstatuschange -->

::: sourceCode
## uni.onNetworkStatusChange(listener) @onnetworkstatuschange

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-getNetworkType


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-getNetworkType

:::

监听网络状态变化


### onNetworkStatusChange 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.81 | 4.81 | 4.81 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| listener | (result: [OnNetworkStatusChangeCallbackResult](#onnetworkstatuschangecallbackresult-values)) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 

### OnNetworkStatusChangeCallbackResult 的属性值 @onnetworkstatuschangecallbackresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| isConnected | boolean | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.81; Android uni-app x UTS 插件: 4.81; iOS: 4.81; iOS uni-app x UTS 插件: 4.81; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 当前是否有网络连接<br/> |
| networkType | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.81; Android uni-app x UTS 插件: 4.81; iOS: 4.81; iOS uni-app x UTS 插件: 4.81; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 网络类型(wifi、2g、3g、4g、5g、unknown、none)<br/> |


### 返回值 

| 类型 |
| :- |
| number |
 


<!-- UTSAPIJSON.onNetworkStatusChange.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.network.networkStatusChange.onNetworkStatusChange)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/network.html#onnetworkstatuschange)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/network/wx.onNetworkStatusChange.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=onNetworkStatusChange&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=onNetworkStatusChange&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=onNetworkStatusChange&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=onNetworkStatusChange&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=onNetworkStatusChange)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=onNetworkStatusChange&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.offNetworkStatusChange(callback) @offnetworkstatuschange -->

::: sourceCode
## uni.offNetworkStatusChange(listener?) @offnetworkstatuschange

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-getNetworkType


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-getNetworkType

:::

取消监听网络状态变化


### offNetworkStatusChange 兼容性 
| Web | 微信小程序 | Android | iOS | iOS uni-app x UTS 插件 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.81 | 4.81 | 4.81 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| listener | number \| (result: [OnNetworkStatusChangeCallbackResult](#onnetworkstatuschangecallbackresult-values)) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 

### OnNetworkStatusChangeCallbackResult 的属性值 @onnetworkstatuschangecallbackresult-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| isConnected | boolean | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.81; Android uni-app x UTS 插件: 4.81; iOS: 4.81; iOS uni-app x UTS 插件: 4.81; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 当前是否有网络连接<br/> |
| networkType | string | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.81; Android uni-app x UTS 插件: 4.81; iOS: 4.81; iOS uni-app x UTS 插件: 4.81; HarmonyOS: 4.61; HarmonyOS(Vapor): 5.0 | 网络类型(wifi、2g、3g、4g、5g、unknown、none)<br/> |




<!-- UTSAPIJSON.offNetworkStatusChange.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.network.networkStatusChange.offNetworkStatusChange)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/network.html#offnetworkstatuschange)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/network/wx.offNetworkStatusChange.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=offNetworkStatusChange&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=offNetworkStatusChange&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=offNetworkStatusChange&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=offNetworkStatusChange&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=offNetworkStatusChange)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=offNetworkStatusChange&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/network-status-change/network-status-change.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/network-status-change/network-status-change.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/network-status-change/network-status-change

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/network-status-change/network-status-change

>示例
```vue
<template>
  <page-head title="networkStatusChange"></page-head>
  <view class="uni-list-cell-padding status-box">
    <text class="uni-title-text">网络状态</text>
    <view class="uni-row uni-common-mt">
      <text class="uni-hello-text">是否连接：</text>
      <text>{{ isConnected ? '已连接' : '未连接' }}</text>
    </view>
    <view class="uni-row uni-common-mt">
      <text class="uni-hello-text">网络类型：</text>
      <text>{{ networkType }}</text>
    </view>
    <view class="uni-row uni-common-mt">
      <text class="uni-hello-text">监听状态：</text>
      <text>{{ listenStatus }}</text>
    </view>
  </view>
  <view class="uni-list-cell-padding uni-common-mt">
    <button type="primary" @click="startListen">开始监听</button>
    <button type="default" class="uni-common-mt" @click="stopListen">停止监听</button>
  </view>
</template>

<script lang="uts" setup>
  const isConnected = ref(false)
  const networkType = ref('unknown')
  const listenStatus = ref('未监听')
  const networkCallback = ref<((result : OnNetworkStatusChangeCallbackResult) => void) | null>(null)
  // 获取当前网络状态
  const getCurrentNetworkStatus = () => {
    uni.getNetworkType({
      success: (res) => {
        networkType.value = res.networkType
        isConnected.value = res.networkType != 'none'
      },
      fail: () => {
        console.log('获取网络状态失败')
        networkType.value = 'unknown'
        isConnected.value = false
      }
    })
  }
  // 开始监听
  const startListen = () => {
    if (networkCallback.value != null) {
      listenStatus.value = '正在监听'
      return
    }
    networkCallback.value = (result : OnNetworkStatusChangeCallbackResult) => {
      console.log('网络状态: ', result);
      isConnected.value = result.isConnected
      networkType.value = result.networkType
      if (!result.isConnected) {
        networkType.value = 'none'
      }
    }
    uni.onNetworkStatusChange(networkCallback.value)
    // console.log('开始监听网络状态')
    listenStatus.value = '正在监听'
  }
  // 停止监听
  const stopListen = () => {
    if (networkCallback.value == null) {
      listenStatus.value = '未监听'
      return
    }
    uni.offNetworkStatusChange(networkCallback.value)
    networkCallback.value = null
    // console.log('停止监听网络状态')
    listenStatus.value = '停止监听'
  }

  onLoad(() => {
    getCurrentNetworkStatus()
  })
  onUnload(() => {
    stopListen()
  })
</script>

<style>
  .status-box {
    background-color: #FFFFFF;
    margin: 0 20px;
  }
</style>

```

:::

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

