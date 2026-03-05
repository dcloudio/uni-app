<!-- ## nested-scroll-header -->

::: sourceCode
## nested-scroll-header
:::

> 组件类型：UniNestedScrollHeaderElement 

  scroll-view 嵌套模式场景中属于外层 scroll-view 的节点，仅支持作为 <scroll-view type='nested'> 嵌套模式的直接子节点。不支持复数子节点，渲染时会取其第一个子节点来渲染


### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.11 | 4.11 | 4.61 | - |






<!-- UTSCOMJSON.nested-scroll-header.component_type-->

### 使用场景  

scroll-view 嵌套场景中。外层 scroll-view 滚动时无法与内层 scroll-view 滚动衔接连贯滚动，因此提供`nested-scroll-header`节点，存放除内层 scroll-view 以外的内容节点。`nested-scroll-body`内部 scroll-view 滚动时会检测`nested-scroll-header`节点滚动位置，约束内层 scroll-view 滚动逻辑，实现嵌套模式下衔接连贯滚动。开发者只需将外层要显示内容节点放置`nested-scroll-header`节点内即可。具体用法请参考[scroll-view嵌套模式](https://doc.dcloud.net.cn/uni-app-x/component/scroll-view.html#nested-scroll-view)

#### 注意事项  

+ `nested-scroll-header` 组件不支持设置css样式，不要通过 class 和 style 设置样式  
+ `nested-scroll-header` 组件应该放在 `nested-scroll-body` 组件前面（上面）  
+ `nested-scroll-header` 组件不支持多个子节点，渲染时只会取第一个子节点来渲染  

### 子组件 @children-tags
支持所有组件

### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/component/nested-scroll-header/nested-scroll-header.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/component/nested-scroll-header/nested-scroll-header.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/component/nested-scroll-header/nested-scroll-header
```uvue
<template>
  <scroll-view style="flex:1" type="nested" direction="vertical">
    <nested-scroll-header>
      <view class="scroll-header-tiem1">
        <text>会渲染的nested-scroll-header</text>
      </view>
      <!-- dom2 nested-scroll-header 没有限制节点数量 临时注释 -->
      <!-- <view class="scroll-header-tiem1">
        <text>不会渲染nested-scroll-header，因为 nested-scroll-header 只会渲染第一个子节点</text>
      </view> -->
    </nested-scroll-header>
    <nested-scroll-header>
      <swiper ref="headerRef" indicator-dots="true" circular="true">
        <swiper-item v-for="i in num" :item-id="i">
          <view class="scroll-header-tiem2">
            <text>如果存在多个头部节点，那么就使用多个 nested-scroll-header 来将其包裹</text>
          </view>
        </swiper-item>
      </swiper>
    </nested-scroll-header>
    <nested-scroll-body>
      <scroll-view style="flex:1" associative-container="nested-scroll-view">
        <view v-for="key in scrollData">
          <view class="scroll-item">
            <text class="scroll-item-title">{{key}}</text>
          </view>
        </view>
      </scroll-view>
    </nested-scroll-body>
  </scroll-view>
</template>

<script setup lang="uts">
  const scrollData = ref([] as Array<string>)
  const num = ref(0)
  const headerRef = ref<UniSwiperElement | null>(null)

  onLoad(() => {
    let lists : Array<string> = []
    for (let i = 0; i < 30; i++) {
      lists.push("item---" + i)
    }
    scrollData.value = lists
  })

  onReady(() => {
    num.value = 3
  })

</script>

<style>
  .scroll-item {
    margin-left: 6px;
    margin-right: 6px;
    margin-top: 6px;
    background-color: #fff;
    border-radius: 4px;
  }

  .scroll-item-title {
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #555;
  }

  .scroll-header-tiem1 {
    height: 200px;
    background-color: #66ccff;
    align-items: center;
    justify-content: center;
  }

  .scroll-header-tiem2 {
    height: 100px;
    background-color: #89ff8d;
    align-items: center;
    justify-content: center;
  }
</style>

```
:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.view-container.nested-scroll.nested-scroll-header)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/component/nested-scroll-header.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=nested-scroll-header&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=nested-scroll-header&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=nested-scroll-header&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=nested-scroll-header&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=nested-scroll-header)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=nested-scroll-header&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)
