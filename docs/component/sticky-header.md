<!-- ## sticky-header -->

::: sourceCode
## sticky-header
:::

> 组件类型：UniStickyHeaderElement 

 吸顶布局容器 

 注意：暂时仅支持作为list-view、sticky-section的子节点, sticky-header不支持css样式！当一个容器视图设置多个sticky-header时，后一个sticky-header会停靠在前一个sticky-header的末尾处。


### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS 系统版本 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.02 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 3.93 | 4.11 | 5.0.5 | 4.71 | - |


### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| padding | Array\<number> | [0,0,0,0\] | Web: 4.02; 微信小程序: x; Android: 3.98; iOS: 4.11; HarmonyOS: x; HarmonyOS(Vapor): - | 长度为 4 的数组，按 top、right、bottom、left 顺序指定内边距  |



<!-- UTSCOMJSON.sticky-header.component_type-->

### 使用场景  

父元素滚动过程中，实现某个子元素固定到父元素顶部的需求

需求其实就是元素吸顶。可将需要吸顶元素放入sticky-header组件中，sticky-header组件作为父元素的子元素，放到吸顶元素原来的位置即可。

**示例：**

```html
<list-view id="list-view" style="flex: 1; background-color: #f5f5f5;">
  <sticky-header>
    <!-- 固定到父元素顶部的元素 -->
    <text style="padding: 20px; background-color: #f5f5f5;">向上滑动页面，体验sticky-header吸顶效果。</text>
  </sticky-header>
  <list-item v-for="index in 20" :key="index" style="padding: 15px; margin: 5px 0;background-color: #fff;border-radius: 5px;">
    <text class="text">itme-content-{{index}}</text>
  </list-item>
</list-view>
```

#### 注意事项  

+ 同一元素下不能存在多 `sticky-header` 组件，使用多个 `sticky-header` 组件需分别放到 `sticky-section` 中
+ `sticky-header` 组件，不支持设置css样式，不要通过 class 和 style 设置样式  
+ 鸿蒙平台暂不支持 `padding` 属性，可通过设置子元素样式来实现类似效果  
+ 鸿蒙平台 `sticky-header` 组件只能作为 `sticky-section` 的子元素使用  
+ 鸿蒙平台API版本低于17的设备不支持 `sticky-header` 组件，可在滚动容器里自行监听滚动，设置某个区域的top为固定值来实现吸顶效果，参考hello uni-app x的模板->[scroll-view自定义滚动吸顶示例](https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/pages/template/scroll-sticky/scroll-sticky.uvue)  


### 子组件 @children-tags
支持所有组件

### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/component/sticky-header/sticky-header.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/component/sticky-header/sticky-header.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 
```uvue
<template>
  <list-view :scroll-y="true" class="page" bounces="false" show-scrollbar=false :scroll-top="data.scroll_top_input"
    :refresher-enabled="data.refresher_enabled_boolean" :refresher-triggered="data.refresher_triggered_boolean"
    @refresherrefresh="list_view_refresherrefresh">
    <list-item type=1>
      <swiper indicator-dots="true" circular="true" style="height: 240px;">
        <swiper-item v-for="i in 3" :item-id="i + ''">
          <image src="/static/shuijiao.jpg" style="height: 240px; width: 100%;"></image>
          <text style="position: absolute;">{{i}}</text>
        </swiper-item>
      </swiper>
    </list-item>
    <list-item class="content-item" type=2>
      <text class="text">向上滑动页面，体验sticky-header吸顶效果。</text>
    </list-item>
    <sticky-section>
      <sticky-header>
        <scroll-view style="background-color: #f5f5f5; flex-direction: row;" direction="horizontal"
          :show-scrollbar="false">
          <view style="align-self: flex-start; flex-direction: row;">
            <text ref="swipertab" class="sift-item" v-for="(name,index) in data.sift_item" @click="clickTH(index)">
              {{name}}
            </text>
          </view>
        </scroll-view>
      </sticky-header>

      <list-item v-for="(item,index) in data.list_item" :key="index" class="content-item" type=3>
        <text class="text">{{item}}</text>
      </list-item>
    </sticky-section>
  </list-view>
</template>

<script setup lang="uts">
  type DataType = {
    sift_item: string[];
    list_item: string[];
    refresher_enabled_boolean: boolean;
    refresher_triggered_boolean: boolean;
    scroll_top_input: number;
  }

  const data = reactive({
    sift_item: ["排序", "筛选"],
    list_item: [],
    refresher_enabled_boolean: true,
    refresher_triggered_boolean: false,
    scroll_top_input: 0
  } as DataType)

  const loadListData = () => {
    let lists : Array<string> = []
    for (let i = 0; i < 40; i++) {
      lists.push("item---" + i)
    }
    data.list_item = lists
  }

  onLoad(() => {
    loadListData()
  })

  const list_view_refresherrefresh = () => {
    console.log("下拉刷新被触发 ")
    data.refresher_triggered_boolean = true
    setTimeout(() => {
      data.refresher_triggered_boolean = false
    }, 1500)
  }

  const confirm_scroll_top_input = (value : number) => {
    data.scroll_top_input = value
  }

  const clickTH = (index : number) => {
    console.log("点击表头：" + index);
  }

  //自动化测试使用
  const clearListData = () => {
    data.list_item = []
  }

  defineExpose({
    confirm_scroll_top_input,
    clearListData
  })
</script>

<style>
  .page {
    flex: 1;
    background-color: #f5f5f5;
  }

  .content-item {
    padding: 15px;
    margin-bottom: 10px;
    background-color: #fff;
  }

  .text {
    font-size: 14px;
    color: #666;
    line-height: 20px;
  }

  .sift-item {
    color: #555;
    font-size: 16px;
    padding: 12px 15px;
  }
</style>

```


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.view-container.sticky.sticky-header)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/component/sticky-header.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=sticky-header&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=sticky-header&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=sticky-header&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=sticky-header&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=sticky-header)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=sticky-header&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)
