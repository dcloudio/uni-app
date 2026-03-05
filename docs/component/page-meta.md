<!-- ## page-meta -->

::: sourceCode
## page-meta
:::

页面元数据，用于设置页面的一些属性，如背景色、下拉刷新等


### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.41 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | - |


### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| background-text-style | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 下拉背景字体、loading 图的样式，仅支持 dark 和 light |
| background-color | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 窗口的背景色，必须为十六进制颜色值 |
| background-color-top | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 顶部窗口的背景色，必须为十六进制颜色值，仅 iOS 支持 |
| background-color-bottom | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 底部窗口的背景色，必须为十六进制颜色值，仅 iOS 支持 |
| scroll-top | string | - | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 滚动位置，可以使用 px 或者 rpx 为单位，在被设置时，页面会滚动到对应位置 |
| scroll-duration | number | - | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 滚动动画时长 |
| page-style | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 页面根节点样式，页面根节点是所有页面节点的祖先节点，相当于 HTML 中的 body 节点 |
| root-font-size | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 页面的根字体大小，页面中的所有 rem 单位，将使用这个字体大小作为参考值，即 1rem 等于这个字体大小 |
| enable-pull-down-refresh | boolean | - | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 是否开启下拉刷新 |
| root-background-color | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(string)*<br/>页面内容的背景色，用于页面中的空白部分和页面大小变化 resize 动画期间的临时空闲区域 |
| page-font-size | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(string)*<br/>页面 page 的字体大小，可以设置为 `system` ，表示使用当前用户设置的微信字体大小 |
| page-orientation | string | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: x; HarmonyOS(Vapor): - | *(string)*<br/>页面的方向，可为 `auto` `portrait` 或 `landscape` |
| @resize | (event: [UniEvent](/component/common.md#unievent)) => void | - | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 页面尺寸变化时会触发 resize 事件， event.detail = { size: { windowWidth, windowHeight } } |
| @scroll | (event: [UniEvent](/component/common.md#unievent)) => void | - | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 页面滚动时会触发 scroll 事件， event.detail = { scrollTop } |
| @scrolldone | (event: [UniEvent](/component/common.md#unievent)) => void | - | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 如果通过改变 scroll-top 属性来使页面滚动，页面滚动结束后会触发 scrolldone 事件 |



<!-- UTSCOMJSON.page-meta.component_type -->



### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/component/page-meta/page-meta.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/component/page-meta/page-meta.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 
```uvue
<template>
  <page-meta
    :background-text-style="data.bgTextStyle"
    :background-color="data.bgColor"
    :background-color-top="data.bgColorTop"
    :background-color-bottom="data.bgColorBottom"
    :scroll-top="data.scrollTop"
    :scroll-duration="2000"
    @scroll="scroll"
    @scrolldone="scrolldone"
    page-style="color: green"
    root-font-size="30px"
  >
    <navigation-bar
      :title="data.nbTitle"
      :loading="data.nbLoading"
      :front-color="data.nbFrontColor"
      :background-color="data.nbBackgroundColor"
    />
  </page-meta>
  <view class="content">
    <text class="title">页面内容</text>
    <button @click="scrollTo">点击跳到 300px 处</button>
    <view class="uni-list" v-for="(_, index) in 30" :key="index">
      <view class="uni-list-cell">{{ index }}</view>
    </view>
  </view>
</template>

<script setup lang="uts">
  type DataType = {
    bgTextStyle: string,
    scrollTop: string,
    bgColor: string,
    bgColorTop: string,
    bgColorBottom: string,
    nbTitle: string,
    nbLoading: boolean,
    nbFrontColor: string,
    nbBackgroundColor: string,
    scrollType: string | null,
    scrolldoneType: string | null,
  }

  // 使用reactive避免ref数据在自动化测试中无法访问
  const data = reactive({
    bgTextStyle: 'dark',
    scrollTop: '0px',
    bgColor: '#ff0000',
    bgColorTop: '#00ff00',
    bgColorBottom: '#0000ff',
    nbTitle: '标题',
    nbLoading: false,
    nbFrontColor: '#ffffff',
    nbBackgroundColor: '#00aaff',
    scrollType: null as string | null,
    scrolldoneType: null as string | null,
  } as DataType)

  // Methods
  function scrollTo() {
    data.scrollTop = '300px'
  }

  function scroll(e : any) {
    data.scrollType = e.type
  }

  function scrolldone(e : any) {
    data.scrolldoneType = e.type
  }

  // Lifecycle
  onLoad(() => {
    setTimeout(() => {
      data.nbLoading = true
    }, 2000)
  })

  defineExpose({
    data
  })
</script>

```


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.page-meta.page-meta)
- [参见uni-app相关文档](https://uniapp.dcloud.io/component/page-meta.html)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/component/page-meta.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=page-meta&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=page-meta&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=page-meta&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=page-meta&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=page-meta)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=page-meta&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)
