<!-- ## uni.getNetworkType(options) @getnetworktype -->

::: sourceCode
## uni.getNetworkType(options) @getnetworktype

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-getNetworkType


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-getNetworkType

:::

获取网络类型

### getNetworkType 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.9 | 4.11 | 4.61 | 5.0 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **GetNetworkTypeOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| success | (result: [GetNetworkTypeSuccess](#getnetworktypesuccess-values)) => void | 否 | null | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用成功的回调函数 |
| fail | (result: [GetNetworkTypeFail](#getnetworktypefail-values)) => void | 否 | null | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | null | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### GetNetworkTypeSuccess 的属性值 @getnetworktypesuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| networkType | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 网络类型 |
| hasSystemProxy | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `2.22.1`<br/><br/>设备是否使用了网络代理<br/> |
| signalStrength | number | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 信号强弱，单位 dbm<br/> |
| weakNet | boolean | 否 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 需要基础库： `3.5.3`<br/><br/>是否处于弱网环境<br/> |

#### GetNetworkTypeFail 的属性值 @getnetworktypefail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误码 |
| errMsg | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误描述信息 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |
| name | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| message | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |




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
<script setup lang="uts">
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


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.network.getNetworkType)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/system/network.html#getnetworktype)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/device/network/wx.getNetworkType.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=getNetworkType&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=getNetworkType&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=getNetworkType&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=getNetworkType&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=getNetworkType)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=getNetworkType&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

