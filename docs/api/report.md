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
  <!-- #ifdef APP && !VUE3-VAPOR -->
  <scroll-view style="flex:1">
  <!-- #endif -->
    <page-head title="report"></page-head>
    <view class="tips">
      <view class="tips-title">调用信息：</view>
      <view class="tips-content">{{msg.value}}</view>
    </view>
    <view class="page">

      <button class="normal-button" type="default" @click="handleAppLaunch">
        模拟应用启动
      </button>
      <button class="normal-button" type="default" @click="handleAppHide">
        模拟应用切入后台
      </button>
      <button class="normal-button" type="default" @click="handleAppShow">
        模拟应用切入前台
      </button>
      <button class="normal-button" type="default" @click="handleAppError">
        模拟应用错误
      </button>
      <button class="normal-button" type="default" @click="handleTitle">
        模拟自定义title
      </button>
      <button class="normal-button" type="default" @click="handleEvent">
        模拟自定义事件
      </button>
      <text class="instructions">
        当前页面调用API均为模拟，请查看文档，在特定场景下使用以上 API。请在main.uts中设置统计debug配置为true，并点击按钮查控制台输出。
      </text>
    </view>

  <!-- #ifdef APP && !VUE3-VAPOR -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  type MsgType = {
    value: string
  }
  // 使用reactive避免ref数据在自动化测试中无法访问
  const msg = reactive({ value: '点击按钮，测试上报' } as MsgType)

  onLoad(() => {
    uni.report({
      name: '自定义上报-report页面打开',
      options: '1'
    })
  })

  onUnmounted(() => {
    // #ifndef APP-IOS
    uni.report({
      name: '自定义上报-report页面关闭',
      options: '1'
    })
    // #endif

  })

  const handleAppLaunch = () => {
    const options = uni.getLaunchOptionsSync()
    // #ifndef APP-IOS
    uni.report({
      name: 'uni-app-launch',
      options: options,
      success: (res) => {
        msg.value = 'onLaunch --> ' + res.errMsg
        console.log(res);
      }, fail: (err) => {
        msg.value = 'onLaunch --> ' + err.errMsg
        console.log(err);
      }
    })
    // #endif

  }

  const handleAppHide = () => {
    // #ifndef APP-IOS
    uni.report({
      name: 'uni-app-hide',
      success: (res) => {
        msg.value = 'onAppHide --> ' + res.errMsg
        console.log(res);
      }, fail: (err) => {
        msg.value = 'onAppHide --> ' + err.errMsg
        console.log(err);
      }
    })
    // #endif

  }

  const handleAppShow = () => {
    // const options = uni.getLaunchOptionsSync()
    // #ifndef APP-IOS
    uni.report({
      name: 'uni-app-show',
      success: (res) => {
        msg.value = 'onAppShow --> ' + res.errMsg
        console.log(res);
      }, fail: (err) => {
        msg.value = 'onAppShow --> ' + err.errMsg
        console.log(err);
      }
    })
    // #endif

  }

  const handleAppError = () => {
    const errmsg = '测试错误'
    // #ifndef APP-IOS
    uni.report({
      name: 'uni-app-error',
      options: errmsg,
      success: (res) => {
        msg.value = 'onAppError --> ' + res.errMsg
        console.log(res);
      }, fail: (err) => {
        msg.value = 'onAppError --> ' + err.errMsg
        console.log(err);
      }
    })
    // #endif

  }

  const handleEvent = () => {
    // 此处name为用户自定义
    // #ifndef APP-IOS
    uni.report({
      name: 'custom-event',
      options: {
        title: '自定义事件',
        total: 1
      },
      success: (res) => {
        msg.value = '自定义事件 --> ' + res.errMsg
        console.log(res);
      }, fail: (err) => {
        msg.value = '自定义事件 --> ' + err.errMsg
        console.log(err);
      }
    })
    // #endif

  }

  const handleTitle = () => {
    // 此处name为用户自定义
    // #ifndef APP-IOS
    uni.report({
      name: 'title',
      options: '自定义title测试上报',
      success: (res) => {
        msg.value = '自定义title --> ' + res.errMsg
        console.log(res);
      }, fail: (err) => {
        msg.value = '自定义title --> ' + err.errMsg
        console.log(err);
      }
    })
    // #endif

  }

  defineExpose({
    msg,
    handleAppLaunch,
    handleAppHide,
    handleAppShow,
    handleAppError,
    handleEvent,
    handleTitle
  })
</script>

<style>
  .page {
    padding: 15px;
  }

  .tips {
    margin: 15px;
    padding: 15px;
    background-color: #f5f5f5;
    font-size: 14px;
    text-align: center;
  }

  .tips-title {
    font-size: 16px;
    color: #333;
    margin-bottom: 10px;
  }

  .tips-content {
    font-size: 14px;
    color: #999;
  }

  .normal-button {
    width: 100%;
    margin-bottom: 10px;
  }

  .instructions {
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    background-color: #eee;
    font-size: 12px;
    color: #999;
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

