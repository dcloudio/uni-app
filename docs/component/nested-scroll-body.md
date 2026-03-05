<!-- ## nested-scroll-body -->

::: sourceCode
## nested-scroll-body
:::

> 组件类型：UniNestedScrollHeaderElement 

  scroll-view 嵌套模式场景中属于嵌套内层 scroll-view 的父节点，仅支持作为 <scroll-view type='nested'> 嵌套模式的直接子节点。不支持复数子节点，渲染时会取其第一个子节点来渲染


### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 4.11 | 4.11 | 4.61 | - |






<!-- UTSCOMJSON.nested-scroll-body.component_type-->

### 使用场景  

scroll-view 嵌套场景中。内层 scroll-view 滚动时无法与外层 scroll-view 滚动衔接，无法实现嵌套滚动连贯效果。因此提供`nested-scroll-body`节点，存放内层 scroll-view 节点。`nested-scroll-body`会与外层`nested-scroll-header`衔接滚动逻辑实现连贯滚动。开发者只需将内层滚动节点放置`nested-scroll-body`节点内即可。具体用法请参考[scroll-view嵌套模式](https://doc.dcloud.net.cn/uni-app-x/component/scroll-view.html#nested-scroll-view)

#### 注意事项  

+ `nested-scroll-body` 组件的父节点必须是 scroll-view，并且 scroll-view 下最多只能存在一个 `nested-scroll-body` 组件  
+ `nested-scroll-body` 组件不支持设置css样式，不要通过 class 和 style 设置样式  
+ `nested-scroll-body` 组件应该放在 `nested-scroll-header` 组件后面（下面）  
+ `nested-scroll-body` 组件不支持复数子节点，渲染时会取其第一个子节点来渲染  


### 子组件 @children-tags
支持所有组件

### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/component/nested-scroll-body/nested-scroll-body.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/component/nested-scroll-body/nested-scroll-body.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 

::: preview
> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/component/nested-scroll-body/nested-scroll-body
```uvue
<template>
  <scroll-view style="flex:1" type="nested" direction="vertical" refresher-enabled="true" refresher-default-style="none"
    bounces="false" :refresher-triggered="data.refresherTriggered" @refresherpulling="onRefresherpulling"
    @refresherrefresh="onRefresherrefresh" @refresherrestore="onRefreshrestore" @scrollend="scrollEnd">
    <nested-scroll-header>
      <swiper ref="header" indicator-dots="true" circular="true">
        <swiper-item v-for="i in 3" :item-id="i">
          <image src="/static/shuijiao.jpg" style="width:100% ;height: 240px;"></image>
        </swiper-item>
      </swiper>
    </nested-scroll-header>
    <nested-scroll-body>
      <view style="flex:1">
        <view style="flex-direction: row;">
          <text style="padding: 12px 15px;">nested-scroll-body</text>
        </view>
        <swiper style="flex: 1;">
          <swiper-item style="flex: 1;" v-for="item in data.swiperList">
            <!-- 嵌套滚动仅可能关闭bounces效果 会影响嵌套滚动不连贯 -->
            <list-view bounces="false" id="body-list" :scroll-top="data.scrollTop" style="flex:1" :key="item.type"
              associative-container="nested-scroll-view" :refresher-enabled="false">
              <list-item v-for="key in data.scrollData" :key="key">
                <view class="scroll-item">
                  <text class="scroll-item-title">{{key}}</text>
                </view>
              </list-item>
            </list-view>
          </swiper-item>
        </swiper>
      </view>
      <!-- dom2 nested-scroll-body 没有限制节点数量 临时注释 -->
      <!-- <text>不会渲染，因为 nested-scroll-body 只会渲染第一个子节点</text> -->
    </nested-scroll-body>
    <!-- 支持自定义样式下拉刷新slot组件 -->
    <refresh-box slot="refresher" :state="state"></refresh-box>
  </scroll-view>
</template>

<script setup lang="uts">
  import refreshBox from '../../template/custom-refresher/refresh-box/refresh-box.uvue';

  type DataType = {
    scrollData: Array<string>;
    swiperList: UTSJSONObject[];
    scrollTop: number;
    refresherTriggered: boolean;
    pullingDistance: number;
    resetting: boolean;
    testScrollTop: number;
  }

  const data = reactive({
    scrollData: [] as Array<string>,
    swiperList: [] as UTSJSONObject[],
    scrollTop: 0,
    refresherTriggered: false,
    pullingDistance: 0,
    resetting: false,
    testScrollTop: 0
  } as DataType)

  const state = computed((): number => {
    if (data.resetting) {
      return 3;
    }
    if (data.refresherTriggered) {
      return 2
    }
    if (data.pullingDistance > 45) {
      return 1
    } else {
      return 0;
    }
  })

  const onRefresherpulling = (e: RefresherEvent) => {
    data.pullingDistance = e.detail.dy;
  }

  const onRefresherrefresh = () => {
    data.refresherTriggered = true
    setTimeout(() => {
      data.refresherTriggered = false
      data.resetting = true;
    }, 1500)
  }

  const onRefreshrestore = () => {
    data.pullingDistance = 0
    data.resetting = false;
  }

  const testBodyScrollBy = (y: number) => {
    data.scrollTop = y
  }

  const scrollEnd = (e: UniScrollEvent) => {
    data.testScrollTop = e.detail.scrollTop
    console.log('testScrollTop:', data.testScrollTop)
  }

  onLoad(() => {
    setTimeout(() => {
      data.swiperList = [
        { type: 'list1'},
        { type: 'list2'},
        { type: 'list3'}
      ];
      let lists: Array<string> = []
      for (let i = 0; i < 30; i++) {
        lists.push("item---" + i)
      }
      data.scrollData = lists
    }, 500)
  })

  defineExpose({
    data,
    testBodyScrollBy
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

  .scroll-header-tiem {
    height: 200px;
    background-color: #66ccff;
    align-items: center;
    justify-content: center;
  }
</style>

```
:::


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.view-container.nested-scroll.nested-scroll-body)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/component/nested-scroll-body.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=nested-scroll-body&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=nested-scroll-body&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=nested-scroll-body&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=nested-scroll-body&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=nested-scroll-body)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=nested-scroll-body&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)
