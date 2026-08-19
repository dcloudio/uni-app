<!-- ## uni.startPullDownRefresh(options?) @startpulldownrefresh -->

::: sourceCode
## uni.startPullDownRefresh(options?) @startpulldownrefresh

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-pullDownRefresh


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-pullDownRefresh

:::

开始下拉刷新


### startPullDownRefresh 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 5.25 | 3.91 | 4.11 | 4.61 |


### 参数 

| 名称 | 类型 | 必填 |
| :- | :- | :- |
| options | **StartPullDownRefreshOptions** | 否 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| success | (result: [StartPullDownRefreshSuccess](#startpulldownrefreshsuccess-values)) => void | 否 | 微信小程序: 4.41; 支付宝小程序: 5.25 | 接口调用成功的回调函数 |
| fail | (result: [StartPullDownRefreshFail](#startpulldownrefreshfail-values)) => void | 否 | 微信小程序: 4.41; 支付宝小程序: 5.25 | 接口调用失败的回调函数 |
| complete | (result: any) => void | 否 | 微信小程序: 4.41; 支付宝小程序: 5.25 | 接口调用结束的回调函数（调用成功、失败都会执行） | 

#### StartPullDownRefreshSuccess 的属性值 @startpulldownrefreshsuccess-values 

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 |

#### StartPullDownRefreshFail 的属性值 @startpulldownrefreshfail-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errCode | number | 是 | 下拉刷新错误码<br/>- 4: 框架内部异常 |
| errSubject | string | 是 | 统一错误主题（模块）名称 |
| data | any | 否 | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 |  |


### 返回值 

| 类型 | 必备 |
| :- | :- |
| Promise\<**StartPullDownRefreshSuccess**> | 否 |

#### Promise\<StartPullDownRefreshSuccess> 的属性描述

| 名称 | 类型 | 必备 |
| :- | :- | :- |
| errMsg | string | 是 | 



### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.page.pullDownRefresh.startPullDownRefresh)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/ui/pulldown.html#startpulldownrefresh)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/pull-down-refresh/wx.startPullDownRefresh.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=startPullDownRefresh&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=startPullDownRefresh&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=startPullDownRefresh&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=startPullDownRefresh&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=startPullDownRefresh)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=startPullDownRefresh&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

<!-- ## uni.stopPullDownRefresh() @stoppulldownrefresh -->

::: sourceCode
## uni.stopPullDownRefresh() @stoppulldownrefresh

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-pullDownRefresh


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-pullDownRefresh

:::

停止当前页面下拉刷新


### stopPullDownRefresh 兼容性 <Help /> 
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 5.25 | 3.91 | 4.11 | 4.61 |


使用：
1. 首先pages.json里配置了页面可下拉刷新`"enablePullDownRefresh": true`
2. 当用户下拉页面时触发页面生命周期`onPullDownRefresh`，iOS平台触发时机：当下拉到一定阀值就会触发`onPullDownRefresh`，并不是当手势拖拽结束时触发
3. 在合适的时机（如联网刷新数据结束），调用本API`uni.stopPullDownRefresh()`，结束下拉刷新状态

本API仅负责页面下拉刷新。如使用组件下拉刷新，另见scroll-view、list-view等组件的文档。





<!-- UTSAPIJSON.stopPullDownRefresh.example -->


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.page.pullDownRefresh.stopPullDownRefresh)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/ui/pulldown.html#stoppulldownrefresh)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/pull-down-refresh/wx.stopPullDownRefresh.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=stopPullDownRefresh&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=stopPullDownRefresh&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=stopPullDownRefresh&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=stopPullDownRefresh&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=stopPullDownRefresh)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=stopPullDownRefresh&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/pull-down-refresh/pull-down-refresh.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/pull-down-refresh/pull-down-refresh.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/pull-down-refresh/pull-down-refresh

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/pull-down-refresh/pull-down-refresh

>示例
```vue
<template>
  <!-- #ifdef APP && !VUE3-VAPOR -->
  <scroll-view style="flex: 1;">
  <!-- #endif -->
    <!-- 实际开发中，长列表应该使用list-view -->
    <view class="uni-padding-wrap uni-common-mt">
      <text class="text" v-for="(num,index) in listData" :key="index">list - {{num}}</text>
      <view v-if="showLoadMore">{{loadMoreText}}</view>
    </view>
  <!-- #ifdef APP && !VUE3-VAPOR -->
  </scroll-view>
  <!-- #endif -->
</template>
<script setup lang="uts">


  type DataType = {
    pulldownRefreshTriggered: boolean,
    startPullDownRefreshStaus: boolean
  }

  const listData = ref([] as Array<number>)
  const loadMoreText = ref("加载中...")
  const showLoadMore = ref(false)
  const max = ref(0)
  const data = reactive({
    pulldownRefreshTriggered: false,
    startPullDownRefreshStaus: false
  } as DataType)

  function initData() {
    setTimeout(() => {
      max.value = 0;
      listData.value = [];
      let dataArr : Array<number> = [];
      max.value += 20;
      for (let i : number = max.value - 19; i < max.value + 1; i++) {
        dataArr.push(i)
      }
      listData.value = listData.value.concat(dataArr);
      let status = false
      uni.stopPullDownRefresh();
    }, 1000);
  }

  function setListData() {
    let dataArr : Array<number> = [];
    max.value += 10;
    for (let i : number = max.value - 9; i < max.value + 1; i++) {
      dataArr.push(i)
    }
    listData.value = listData.value.concat(dataArr);
  }

  onReady(() => {
    let status = false
    uni.startPullDownRefresh({
      success() {
        status = true
      },
      fail() {
        status = false
      },
      complete: () => {
        data.startPullDownRefreshStaus = status
      }
    });
    initData();
  })

  onReachBottom(() => {
    console.log("onReachBottom");
    if (max.value > 40) {
      loadMoreText.value = "没有更多数据了!"
      return;
    }
    showLoadMore.value = true;
    setTimeout(() => {
      setListData();
    }, 300);
  })

  onPullDownRefresh(() => {
    console.log('onPullDownRefresh');
    data.pulldownRefreshTriggered = true
    initData();
  })

  defineExpose({
    data
  })
</script>

<style>
  .text {
    margin: 6px 0;
    width: 100%;
    background-color: #fff;
    height: 52px;
    line-height: 52px;
    text-align: center;
    color: #555;
    border-radius: 4px;
  }
</style>

```

:::

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | 微信小程序: 4.41; 支付宝小程序: - | 错误信息 |


## Tips
- 本API默认处理栈顶页面，而不是代码所在页面。[详见](./README.md#toppage)
- iOS 平台蒸汽模式开启下拉刷新会触发页面 `onPageScroll` 生命周期，此时 `scrollTop` 为负值。
