<!-- ## uni.report(options) @report -->

::: sourceCode
## uni.report(eventKey, param?) @report

> GitCode: https://gitcode.net/dcloud/uni-api


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-stat

:::

自定义统计上报

`param` 为对象时会序列化为 JSON 字符串，其他类型会转换为字符串。`eventKey` 为 `title` 时，`param` 仅支持字符串，用于设置页面标题。


### 注意事项
`uni.report` 需要依赖 [`uni统计`](https://ext.dcloud.net.cn?name=uni-stat)，集成方式请查看[文档](https://uniapp.dcloud.net.cn/uni-stat-uniappx)。

### report 兼容性 <Help /> 
| Web | 微信小程序 | Android(VDOM) | Android(Vapor) | iOS(VDOM) | iOS(Vapor) | HarmonyOS(VDOM) | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- | :- |
| 5.25 | 5.25 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.25 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.25 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 5.25 |


### 参数 

| 名称 | 类型 | 必填 | 描述 |
| :- | :- | :- | :- |
| eventKey | string | 是 | 自定义事件名称 |
| param | any | 否 | 自定义事件参数 | 




### 如何使用自定义上报@custom-report

```js
// 参数支持字符串
uni.report({
 name:'购买',
 options:'购买成功'
})

// 参数支持对象
uni.report({
 name:'购买',
 options:{
  id:'1000',
  name:'上衣',
  price:'998',
  msg:'购买成功'
  // ...
 }
})
```

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/report/report.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/report/report.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/report/report

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/report/report

>示例
```vue
<template>
  <scroll-view class="page">
    <page-head title="uni统计 2.0"></page-head>
    <view class="status-panel">
      <text class="status-title">最近操作</text>
      <text class="status-content">{{ state.message }}</text>
    </view>

    <view class="section">
      <text class="section-title">自定义事件</text>
      <button class="normal-button" @click="reportObject">对象参数事件</button>
      <button class="normal-button" @click="reportString">字符串参数事件</button>
      <button class="normal-button" @click="reportEmpty">空参数事件</button>
      <button class="normal-button" @click="reportPair">连续上报两个同名事件</button>
    </view>

    <view class="section">
      <text class="section-title">上下文与参数</text>
      <button class="normal-button" @click="reportTitle">标题上下文</button>
      <button class="normal-button" @click="reportBaseInfo">基础信息快照</button>
      <button class="normal-button" @click="goBack">返回上一页</button>
    </view>
  </scroll-view>
</template>

<script setup lang="uts">
  type StateType = {
    message: string
  }

  const state = reactive({ message: '页面打开事件已触发' } as StateType)

  const reportStat = (type: string, value?: any): boolean => {
    uni.report(type, value)
    return true
  }

  onLoad(() => {
    const marker = Date.now()
    reportStat('report_page_open', {
      marker: marker,
      route: 'pages/API/report/report'
    })
  })

  const reportObject = () => {
    const marker = Date.now()
    if (reportStat('object_probe', {
      marker: marker,
      source: 'hello-uni-app-x',
      count: 1
    })) {
      state.message = 'object_probe：' + marker
    }
  }

  const reportString = () => {
    if (reportStat('string_probe', '中文 a&b=c ? # 空格')) {
      state.message = 'string_probe：特殊字符'
    }
  }

  const reportEmpty = () => {
    if (reportStat('empty_probe')) {
      state.message = 'empty_probe：无参数'
    }
  }

  const reportPair = () => {
    const marker = Date.now()
    const first = reportStat('duplicate_probe', { marker: marker, index: 1 })
    const second = reportStat('duplicate_probe', { marker: marker, index: 2 })
    if (first && second) {
      state.message = 'duplicate_probe：连续两次 ' + marker
    }
  }

  const reportTitle = () => {
    const marker = Date.now()
    uni.setNavigationBarTitle({ title: 'uni统计标题测试' })
    const titleReported = reportStat('title', '业务统计标题')
    const probeReported = reportStat('title_context_probe', { marker: marker })
    if (titleReported && probeReported) {
      state.message = 'title_context_probe：' + marker
    }
  }

  const reportBaseInfo = () => {
    const marker = Date.now()
    const app = uni.getAppBaseInfo()
    const device = uni.getDeviceInfo()
    const windowInfo = uni.getWindowInfo()
    const launch = uni.getLaunchOptionsSync()
    if (reportStat('base_info_probe', {
      marker: marker,
      app: JSON.stringify(app),
      device: JSON.stringify(device),
      window: JSON.stringify(windowInfo),
      launch: JSON.stringify(launch)
    })) {
      state.message = 'base_info_probe：' + marker
    }
  }

  const goBack = () => {
    uni.navigateBack()
  }

  defineExpose({
    state,
    reportObject,
    reportString,
    reportEmpty,
    reportPair,
    reportTitle,
    reportBaseInfo,
    goBack
  })
</script>

<style>
  .page {
    flex: 1;
    background-color: #f5f6f8;
  }

  .status-panel,
  .section {
    margin: 12px 16px;
    padding: 16px;
    background-color: #ffffff;
    border-radius: 8px;
  }

  .status-title,
  .section-title {
    display: flex;
    margin-bottom: 12px;
    color: #202124;
    font-size: 17px;
    font-weight: 600;
  }

  .status-content {
    color: #5f6673;
    font-size: 14px;
  }

  .normal-button {
    width: 100%;
    margin-top: 10px;
  }
</style>

```

:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.stat.report)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/other/report.html)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=report&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=report&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=report&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=report&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=report&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=report)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=report&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

## 通用类型


### GeneralCallbackResult @generalcallbackresult-values 

| 名称 | 类型 | 必备 | 描述 |
| :- | :- | :- | :- |
| errMsg | string | 是 | 错误信息 |

