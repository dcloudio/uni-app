## uni.getBatteryInfo(options) @getbatteryinfo

获取电池电量信息


> 本 API 是 [uni ext api](https://uniapp.dcloud.net.cn/api/extapi.html)，需下载插件：[uni-getbatteryinfo](https://ext.dcloud.net.cn/plugin?name=uni-getbatteryinfo)


### getBatteryInfo 兼容性 
| Web | 微信小程序 | Android | Android uni-app x UTS 插件 | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.35 | 3.9 | 3.9 | 4.11 | 4.11 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **GetBatteryInfoOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| success | (res: [GetBatteryInfoSuccess](#getbatteryinfosuccess-values)) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 接口调用成功的回调 |
| fail | (res: [UniError](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror)) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 接口调用失败的回调函数 |
| complete | (res: any) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### GetBatteryInfoSuccess 的属性值 @getbatteryinfosuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x |  |
| level | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 设备电量，范围1 - 100 |
| isCharging | boolean | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 是否正在充电中 |




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

<script setup lang="uts">
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


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.getBatteryInfo.getBatteryInfo)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=getBatteryInfo&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getBatteryInfo&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getBatteryInfo&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getBatteryInfo&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getBatteryInfo&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getBatteryInfo)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getBatteryInfo&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## uni.getBatteryInfoSync() @getbatteryinfosync

同步获取电池电量信息


> 本 API 是 [uni ext api](https://uniapp.dcloud.net.cn/api/extapi.html)，需下载插件：[uni-getbatteryinfo](https://ext.dcloud.net.cn/plugin?name=uni-getbatteryinfo)


### getBatteryInfoSync 兼容性 
| Web | 微信小程序 | Android | Android uni-app x UTS 插件 | iOS | iOS uni-app x UTS 插件 | HarmonyOS |
| :- | :- | :- | :- | :- | :- | :- |
| 4.0 | 4.35 | 3.9 | 3.9 | 4.11 | 4.11 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |




### 返回值 

| 类型 |
| :- |
| **GetBatteryInfoResult** |

#### GetBatteryInfoResult 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| level | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 设备电量，范围1 - 100 |
| isCharging | boolean | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: x | 是否正在充电中 | 


<!-- UTSAPIJSON.getBatteryInfoSync.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.device.getBatteryInfo.getBatteryInfoSync)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=getBatteryInfoSync&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getBatteryInfoSync&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getBatteryInfoSync&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getBatteryInfoSync&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getBatteryInfoSync&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getBatteryInfoSync)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getBatteryInfoSync&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

