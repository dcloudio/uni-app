## uni.openLocation(options) @openlocation

::: warning 注意
- Android 和 iOS 需 HBuilderX 4.41+
- Harmony 需 HBuilderX 4.61+
- App端的 openlocation 是一个独立的UTS插件，以满足自定义需求，请前往插件市场导入插件 uni-openlocation [插件地址](https://ext.dcloud.net.cn/plugin?name=uni-openLocation)
- 在使用 uni-openlocation 插件后，无论是在Web端还是App端，通过 uni.openlocation 打开的页面会以 dialogPage 的形式呈现。此时，当你执行 getDialogPages 方法时，会发现由 openlocation 打开的页面也包含在返回的页面数组中，这属于正常现象

- `HarmonyOS平台`调用此 API 需要申请定位权限`ohos.permission.APPROXIMATELY_LOCATION`、`ohos.permission.LOCATION`，需自行在项目中配置权限。
:::

使用地图查看位置


### openLocation 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.41 | 4.41 | 4.61 |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **OpenLocationOptions** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | uni.openLocation |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| latitude | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.41; iOS: 4.41; HarmonyOS: 4.61 | 纬度，范围为-90~90，负数表示南纬 |
| longitude | number | 是 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.41; iOS: 4.41; HarmonyOS: 4.61 | 经度，范围为-180~180，负数表示西经 |
| scale | number | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.41; iOS: 4.41; HarmonyOS: 4.61 | 缩放比例，范围5~18，默认为18 |
| name | string | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.41; iOS: 4.41; HarmonyOS: 4.61 | 位置名称 |
| address | string | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.41; iOS: 4.41; HarmonyOS: 4.61 | 地址的详细说明 |
| success | (res: [OpenLocationSuccess](#openlocationsuccess-values)) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.41; iOS: 4.41; HarmonyOS: 4.61 | uni.openLocation成功回调函数定义 |
| fail | (res: [OpenLocationFail](#openlocationfail-values)) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.41; iOS: 4.41; HarmonyOS: 4.61 | uni.openLocation失败回调函数定义 |
| complete | (res: any) => void | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.41; iOS: 4.41; HarmonyOS: 4.61 | uni.openLocation完成回调函数定义 | 

#### OpenLocationSuccess 的属性值 @openlocationsuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.41; iOS: 4.41; HarmonyOS: 4.61 | 错误信息<br/> |

#### OpenLocationFail 的属性值 @openlocationfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| errMsg | string | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: 4.41; iOS: 4.41; HarmonyOS: 4.61 | 错误信息<br/> |
| errSubject | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 统一错误主题（模块）名称 |
| data | any | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 源错误信息，可以包含多个错误，详见SourceError |




### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/open-location/open-location.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/open-location/open-location.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/open-location/open-location

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/open-location/open-location

>示例
```vue
<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-common-mt">
      <form @submit="openLocation">
        <view class="uni-list">
          <view class="uni-list-cell">
            <view class="uni-list-cell-left">
              <view class="uni-label">经度</view>
            </view>
            <view class="uni-list-cell-db">
              <input v-model.number="longitude" class="uni-input" type="text" :disabled="true" />
            </view>
          </view>
          <view class="uni-list-cell">
            <view class="uni-list-cell-left">
              <view class="uni-label">纬度</view>
            </view>
            <view class="uni-list-cell-db">
              <input v-model.number="latitude" class="uni-input" type="text" :disabled="true" />
            </view>
          </view>
          <view class="uni-list-cell">
            <view class="uni-list-cell-left">
              <view class="uni-label">位置名称</view>
            </view>
            <view class="uni-list-cell-db">
              <input v-model="name" class="uni-input" type="text" :disabled="true" />
            </view>
          </view>
          <view class="uni-list-cell">
            <view class="uni-list-cell-left">
              <view class="uni-label">详细位置</view>
            </view>
            <view class="uni-list-cell-db">
              <input v-model="address" class="uni-input" type="text" :disabled="true" />
            </view>
          </view>
        </view>
        <view class="uni-padding-wrap">
          <view class="tips">注意：需要正确配置地图服务商的Key才能正常显示位置</view>
          <view class="uni-btn-v uni-common-mt">
            <button type="primary" formType="submit">查看位置</button>
          </view>
        </view>
      </form>
    </view>
  </view>
</template>
<script lang="uts" setup>
  import {
    state,
    setLifeCycleNum
  } from '@/store/index.uts'

  type DataType = {
    dialogPagesNum: number
  }

  // 响应式数据
  const title = ref('openLocation')
  const longitude = ref(116.39747)
  const latitude = ref(39.9085)
  const name = ref('天安门')
  const address = ref('北京市东城区东长安街')
  // 自动化测试
  const data = reactive({
    dialogPagesNum: -1
  } as DataType)

  // 生命周期钩子
  onPageShow(() => {
    console.log("Page Show")
    // 自动化测试
    setLifeCycleNum(state.lifeCycleNum + 1)
  })

  onPageHide(() => {
    console.log("Page Hide")
    // 自动化测试
    setLifeCycleNum(state.lifeCycleNum - 1)
  })

  // 自动化测试
  const test = () => {
    const pages = getCurrentPages()
    const page = pages[pages.length - 1]
    // #ifdef APP || WEB
    const dialogPages = page.getDialogPages()
    data.dialogPagesNum = dialogPages.length
    // #endif
  }

  // 方法
  const openLocation = () => {
    uni.openLocation({
      longitude: longitude.value,
      latitude: latitude.value,
      name: name.value,
      address: address.value
    })
    // 自动化测试
    setTimeout(() => {
      test()
    }, 500)
  }

  // 自动化测试
  const pageSetLifeCycleNum = (value: number) => {
    setLifeCycleNum(value)
  }

  // 自动化测试
  const getLifeCycleNum = (): number => {
    return state.lifeCycleNum
  }

  defineExpose({
    data,
    openLocation,
    pageSetLifeCycleNum,
    getLifeCycleNum,
  })
</script>

<style>
  .uni-list-cell-left {
    padding: 0 15px;
  }

  .tips {
    font-size: 12px;
    margin-top: 15px;
    opacity: .8;
  }
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.location.openLocation)
- [参见uni-app相关文档](https://uniapp.dcloud.io/api/location/open-location.html)
- [参见uni-app相关文档](https://uniapp.dcloud.io/api/location/open-location.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.openLocation.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=openLocation&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=openLocation&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=openLocation&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=openLocation&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=openLocation)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=openLocation&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)
