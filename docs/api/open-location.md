## uni.openLocation(options) @openlocation

::: warning 注意

- `HBuilderX 5.11` 起，`openLocation` 已内置在 `uni-app x` 框架内，无需再单独导入 `uni-openlocation` 插件；
- `HBuilderX 5.11` 之前，如需使用，请前往插件市场导入该插件：[插件地址](https://ext.dcloud.net.cn/plugin?name=uni-openLocation)
- 无论是内置能力还是导入 `uni-openlocation` 插件，通过 `uni.openLocation` 打开的页面都会以 `dialogPage` 的形式呈现。此时执行 `getDialogPages` 方法时，由 `openLocation` 打开的页面也会包含在返回的页面数组中，这属于正常现象。

- `HarmonyOS平台` 调用此 API 需要申请定位权限 `ohos.permission.APPROXIMATELY_LOCATION`、`ohos.permission.LOCATION`，需自行在项目中配置权限。
  :::

使用应用内置地图查看位置

### openLocation 兼容性 <Help /> 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 5.11 | 5.11 | 5.11 | 5.11 |


### 参数 

| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| options | **OpenLocationOptions** | 是 | uni.openLocation函数参数定义 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| latitude | number | 是 | Web: 4.0; 微信小程序: 5.11; Android: 5.11; iOS: 5.11; HarmonyOS: 5.11 | 纬度，范围为-90~90，负数表示南纬，使用 gcj02 国测局坐标系 |
| longitude | number | 是 | Web: 4.0; 微信小程序: 5.11; Android: 5.11; iOS: 5.11; HarmonyOS: 5.11 | 经度，范围为-180~180，负数表示西经，使用 gcj02 国测局坐标系 |
| scale | number | 否 | Web: 4.0; 微信小程序: 5.11; Android: 5.11; iOS: 5.11; HarmonyOS: 5.11 | 缩放比例，范围5~18，默认为18（微信小程序） |
| name | string | 否 | Web: 4.0; 微信小程序: 5.11; Android: 5.11; iOS: 5.11; HarmonyOS: 5.11 | 位置名 |
| address | string | 否 | Web: 4.0; 微信小程序: 5.11; Android: 5.11; iOS: 5.11; HarmonyOS: 5.11 | 地址的详细说明 |
| success | (result: [OpenLocationSuccess](#openlocationsuccess-values)) => void | 否 | Web: 4.0; 微信小程序: 5.11; Android: 5.11; iOS: 5.11; HarmonyOS: 5.11 | 接口调用成功的回调函数 |
| fail | (result: [OpenLocationFail](#openlocationfail-values)) => void | 否 | Web: 4.0; 微信小程序: 5.11; Android: 5.11; iOS: 5.11; HarmonyOS: 5.11 | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | Web: 4.0; 微信小程序: 5.11; Android: 5.11; iOS: 5.11; HarmonyOS: 5.11 | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### OpenLocationSuccess 的属性值 @openlocationsuccess-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

#### OpenLocationFail 的属性值 @openlocationfail-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errCode | number | 是 | 错误码 |
| errSubject | string | 是 | 统一错误主题（模块）名称 |
| data | any | 否 | 错误信息中包含的数据 |
| cause | [Error](/err-spec.md#unierror) | 否 | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 |  |




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
      <view class="uni-list">
        <view class="uni-list-cell">
          <view class="uni-list-cell-left">
            <view class="uni-label">经度</view>
          </view>
          <view class="uni-list-cell-db">
            <text class="readonly-text">{{ longitude }}</text>
          </view>
        </view>
        <view class="uni-list-cell">
          <view class="uni-list-cell-left">
            <view class="uni-label">纬度</view>
          </view>
          <view class="uni-list-cell-db">
            <text class="readonly-text">{{ latitude }}</text>
          </view>
        </view>
        <view class="uni-list-cell">
          <view class="uni-list-cell-left">
            <view class="uni-label">位置名称</view>
          </view>
          <view class="uni-list-cell-db">
            <text class="readonly-text">{{ name }}</text>
          </view>
        </view>
        <view class="uni-list-cell">
          <view class="uni-list-cell-left">
            <view class="uni-label">详细位置</view>
          </view>
          <view class="uni-list-cell-db">
            <text class="readonly-text">{{ address }}</text>
          </view>
        </view>
      </view>
      <view class="uni-padding-wrap">
        <view class="tips">注意：需要正确配置地图服务商的Key才能正常显示位置</view>
        <view class="uni-btn-v uni-common-mt">
          <button type="primary" @click="openLocation">查看位置</button>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="uts" setup>
  import { state, setLifeCycleNum } from '@/store/index.uts';

  type DataType = {
    dialogPagesNum: number;
  };

  // 响应式数据
  const title = ref('openLocation');
  const longitude = ref(116.39747);
  const latitude = ref(39.9085);
  const name = ref('天安门');
  const address = ref('北京市东城区东长安街');
  // 自动化测试
  const data = reactive({
    dialogPagesNum: -1,
  } as DataType);

  // 生命周期钩子
  onPageShow(() => {
    console.log('Page Show');
    // 自动化测试
    setLifeCycleNum(state.lifeCycleNum + 1);
  });

  onPageHide(() => {
    console.log('Page Hide');
    // 自动化测试
    setLifeCycleNum(state.lifeCycleNum - 1);
  });

  // 自动化测试
  const test = () => {
    const pages = getCurrentPages();
    const page = pages[pages.length - 1];
    // #ifdef APP || WEB
    const dialogPages = page.getDialogPages();
    data.dialogPagesNum = dialogPages.length;
    // #endif
  };

  // 方法
  const openLocation = () => {
    uni.openLocation({
      longitude: longitude.value,
      latitude: latitude.value,
      name: name.value,
      address: address.value,
    });
    // 自动化测试
    setTimeout(() => {
      test();
    }, 500);
  };

  // 自动化测试
  const pageSetLifeCycleNum = (value: number) => {
    setLifeCycleNum(value);
  };

  // 自动化测试
  const getLifeCycleNum = (): number => {
    return state.lifeCycleNum;
  };

  defineExpose({
    data,
    openLocation,
    pageSetLifeCycleNum,
    getLifeCycleNum,
  });
</script>

<style>
  .readonly-text {
    color: #999999;
    font-size: 14px;
    line-height: 22px;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .uni-list-cell-left {
    padding: 0 15px;
  }

  .tips {
    font-size: 12px;
    margin-top: 15px;
    opacity: 0.8;
  }
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.location.openLocation)
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
