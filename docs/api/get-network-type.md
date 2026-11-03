<!-- ## uni.getNetworkType(options) @getnetworktype -->

::: sourceCode
## uni.getNetworkType(options) @getnetworktype

> issues: https://issues.dcloud.net.cn/?mid=api.network.getNetworkType


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-getNetworkType

:::

获取网络类型

### getNetworkType 兼容性 <Help /> 
Web: 4.0; 微信小程序: 4.41; 支付宝小程序: 5.31; Android: 3.9; iOS: 4.11; HarmonyOS: 4.61


### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| options | **GetNetworkTypeOptions** | 是 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 描述 |
| :- | :- | :- | :- | :- |
| success | (result: [GetNetworkTypeSuccess](#getnetworktypesuccess-values)) => void | 否 | null | 接口调用成功的回调函数 |
| fail | (result: [UniError](/err-spec.md#unierror)) => void | 否 | null | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | null | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### GetNetworkTypeSuccess 的属性值 @getnetworktypesuccess-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| networkType | string | 是 |   | 网络类型 |
| hasSystemProxy | boolean | 否 | 微信小程序: 4.41 | 需要基础库： `2.22.1`<br/><br/>设备是否使用了网络代理<br/> |
| signalStrength | number | 否 | 微信小程序: 4.41 | 信号强弱，单位 dbm<br/> |
| weakNet | boolean | 否 | 微信小程序: 4.41 | 需要基础库： `3.5.3`<br/><br/>是否处于弱网环境<br/> |




### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/get-network-type/get-network-type.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/get-network-type/get-network-type.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/get-network-type/get-network-type

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/get-network-type/get-network-type

>示例
```vue
<template>
  <page-head :title="data.title"></page-head>
  <view class="uni-padding-wrap uni-common-mt">
    <view class="uni-container">
      <view class="uni-center">网络状态</view>
      <view v-if="data.hasNetworkType == false">
        <view class="uni-center uni-common-mt">未获取</view>
        <view class="uni-center uni-common-mt">请点击下面按钮获取网络状态</view>
      </view>
      <view v-if="data.hasNetworkType == true">
        <view class="uni-center uni-common-mt">{{data.networkType}}</view>
      </view>
    </view>
    <view class="uni-btn-v uni-common-mt">
      <button type="primary" @tap="getNetworkType">获取设备网络状态</button>
      <button class="uni-common-mt" @tap="clear">清空</button>
    </view>
  </view>
</template>
<script setup lang="ts">
  type DataType = {
    title: string;
    hasNetworkType: boolean;
    networkType: string;
    connectedWifi: string;
    jest_result: boolean;
  }

  const data = reactive({
    title: 'getNetworkType',
    hasNetworkType: false,
    networkType: '',
    connectedWifi: '',
    //自动化测试例专用
    jest_result: false,
  } as DataType)

  onUnload(() => {
    data.networkType = '';
    data.hasNetworkType = false;
  })

  const getNetworkType = () => {
    uni.getNetworkType({
      success: (res) => {
        console.log(res)
        data.hasNetworkType = true;
        data.networkType = res.networkType
      },
      fail: () => {
        uni.showModal({
          content: '获取失败！',
          showCancel: false
        })
      }
    })
  }

  const clear = () => {
    data.hasNetworkType = false;
    data.networkType = '';
    data.connectedWifi = '';
  }

  //自动化测试例专用
  const jest_getNetworkType = () => {
    uni.getNetworkType({
      success: () => {
        data.jest_result = true;
      },
      fail: () => {
        data.jest_result = false;
      }
    })
  }

  defineExpose({
    data,
    jest_getNetworkType
  })
</script>

<style>

</style>

```

:::



### 注意

<md-hperm permissions="ohos.permission.GET_NETWORK_INFO" />

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |

