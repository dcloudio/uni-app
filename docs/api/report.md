<!-- ## uni.report(options) @report -->

::: sourceCode
## uni.report(options) @report

> GitCode: https://gitcode.net/dcloud/uni-api


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-stat

:::

uni统计自定义上报方法。

> 本 API 是 [uni ext api](https://uniapp.dcloud.net.cn/api/extapi.html)，需下载插件：[uni-stat](https://ext.dcloud.net.cn/plugin?name=uni-stat)


### 注意事项
`uni.report` 需要依赖 [`uni统计`](https://ext.dcloud.net.cn?name=uni-stat)，集成方式请查看[文档](https://uniapp.dcloud.net.cn/uni-stat-uniappx)。

### report 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.33 | - | 4.33 | 4.33 | - |


### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| options | **ReportOptions** | 是 | - | - | 自定义事件参数 |

#### options 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| name | string | 是 | - | - | 自定义事件名称，内置名称不允许覆盖，可选值:<br/>`uni-app-launch`：应用启动，options 参数必填，值为 onLaunch 返回值<br/>`uni-app-show`：应用进入前台<br/>`uni-app-hide`：应用进入后台<br/>`uni-app-error`：应用发生错误，options 参数必填，值为错误信息，类型为String<br/>`title`：标题采集<br/>`自定义name`：用户自定义 |
| options | any | 否 | - | - | 额外参数 |
| success | (res: [ReportSuccess](#reportsuccess-values)) => void | 否 | - | - | 接口调用成功回调 |
| fail | (err: [ReportFail](#reportfail-values)) => void | 否 | - | - | 接口调用失败回调 |
| complete | (res: any) => void | 否 | - | - | 接口调用结束回调（调用成功、失败都会执行） | 

#### ReportSuccess 的属性值 @reportsuccess-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | - | 成功的详细信息 |

#### ReportFail 的属性值 @reportfail-values 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errCode | number | 是 | - | - | 错误码 |
| errSubject | string | 是 | - | - | 统一错误主题（模块）名称 |
| data | any | 否 | - | - | 错误信息中包含的数据 |
| cause | [Error](https://uniapp.dcloud.net.cn/tutorial/err-spec.html#unierror) | 否 | - | - | 源错误信息，可以包含多个错误，详见SourceError |
| errMsg | string | 是 | - | - | - |

#### errCode 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| 61000 | - | 应用已集成uni统计，但未关联服务空间，请在uniCloud目录右键关联服务空间 |
| 61001 | - | 统计服务尚未初始化，需在`main.uts`中引入统计插件 |
| 61002 | - | name参数是uni-app-launch时， options 参数未填写 |
| 61003 | - | name参数未填写 |
| 61004 | - | name参数类型错误，应为`String`类型 |
| 61005 | - | name参数长度超限，最大不超过255 |
| 61006 | - | options参数错误，应为String或Object类型 |
| 61007 | - | options参数为String类型时，长度超限，最大不超过255 |
| 61008 | - | name参数为title时，options参数类型错误，应为String |




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
  <!-- #ifdef APP -->
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

  <!-- #ifdef APP -->
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
    uni.report({
      name: '自定义上报-report页面关闭',
      options: '1'
    })
  })

  const handleAppLaunch = () => {
    const options = uni.getLaunchOptionsSync()
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
  }

  const handleAppHide = () => {
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
  }

  const handleAppShow = () => {
    // const options = uni.getLaunchOptionsSync()
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
  }

  const handleAppError = () => {
    const errmsg = '测试错误'
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
  }

  const handleEvent = () => {
    // 此处name为用户自定义
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
  }

  const handleTitle = () => {
    // 此处name为用户自定义
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


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

