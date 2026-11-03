::: sourceCode
## uni.getBatteryInfo(options) @getbatteryinfo

> issues: https://issues.dcloud.net.cn/?mid=api.device.getBatteryInfo.getBatteryInfo


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-getbatteryinfo

:::

获取电池电量信息


> 本 API 是 [uni ext api](https://uniapp.dcloud.net.cn/api/extapi.html)，需下载插件：[uni-getbatteryinfo](https://ext.dcloud.net.cn/plugin?name=uni-getbatteryinfo)


### getBatteryInfo 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/doc/search?q=getBatteryInfo&amp;sector=miniprogram"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=getBatteryInfo&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS"}],"rows":[["4.0","4.35","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","3.9","4.11","4.61"]],"status":"PARTIALLY_SUPPORTED"}' />


### 参数 

| 名称 | 类型 | 必填 | 兼容性 |
| :- | :- | :- |  :-: |
| options | **GetBatteryInfoOptions** | 是 | 支付宝小程序: x |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| success | (res: [GetBatteryInfoSuccess](#getbatteryinfosuccess-values)) => void | 否 | 支付宝小程序: x | 接口调用成功的回调 |
| fail | (res: [UniError](/err-spec.md#unierror)) => void | 否 | 支付宝小程序: x | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | 支付宝小程序: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### GetBatteryInfoSuccess 的属性值 @getbatteryinfosuccess-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | 支付宝小程序: x |  |
| level | number | 是 | 支付宝小程序: x | 设备电量，范围1 - 100 |
| isCharging | boolean | 是 | 支付宝小程序: x | 是否正在充电中 |




### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/get-battery-info/get-battery-info.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/get-battery-info/get-battery-info.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/get-battery-info/get-battery-info

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/get-battery-info/get-battery-info

>示例
```vue
<template>
  <view>
    <text>当前电量：{{data.level}}%</text>
    <text>是否充电中：{{data.isCharging}}</text>
  </view>
</template>

<script setup lang="ts">
  type DataType = {
    level: number;
    isCharging: boolean;
  }

  const data = reactive({
    level: 0,
    isCharging: false
  } as DataType)

  onLoad(() => {
    try {
      uni.getBatteryInfo({
        success: res => {
          data.level = res.level;
          data.isCharging = res.isCharging;
        }
      });
    } catch (e) {
      console.error((e as Error).message);
      uni.showModal({
        content: (e as Error).message,
        showCancel: false
      });
    }
  })

  defineExpose({
    data
  })
</script>

```

:::





::: sourceCode
## uni.getBatteryInfoSync() @getbatteryinfosync

> issues: https://issues.dcloud.net.cn/?mid=api.device.getBatteryInfo.getBatteryInfoSync


> 源码: https://github.com/dcloudio/uni-app/tree/uni-app-x-alpha/src/uni_modules/uni-getbatteryinfo

:::

同步获取电池电量信息


> 本 API 是 [uni ext api](https://uniapp.dcloud.net.cn/api/extapi.html)，需下载插件：[uni-getbatteryinfo](https://ext.dcloud.net.cn/plugin?name=uni-getbatteryinfo)


### getBatteryInfoSync 兼容性 <Help /> 
<CompatibilityTable mode="table" table='{"headers":[{"title":"Web"},{"title":"微信小程序","href":"https://developers.weixin.qq.com/doc/search?q=getBatteryInfoSync&amp;sector=miniprogram"},{"title":"支付宝小程序","href":"https://open.alipay.com/portal/zhichi/search?keyword=getBatteryInfoSync&amp;pageIndex=1&amp;pageSize=10&amp;source=doc_top&amp;type=all"},{"title":"Android"},{"title":"iOS"},{"title":"HarmonyOS"}],"rows":[["4.0","4.35","&lt;a style=\"color:unset;\" href=\"https://vote.dcloud.net.cn/#/?name=uni-app%20x\"&gt;x&lt;/a&gt;","3.9","4.11","4.61"]],"status":"PARTIALLY_SUPPORTED"}' />




### 返回值 

| 类型 |
| :- |
| **GetBatteryInfoResult** |

#### GetBatteryInfoResult 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| level | number | 是 | 支付宝小程序: x | 设备电量，范围1 - 100 |
| isCharging | boolean | 是 | 支付宝小程序: x | 是否正在充电中 | 


<!-- UTSAPIJSON.getBatteryInfoSync.example -->



## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |

