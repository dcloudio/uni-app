<!-- ## sticky-section -->

::: sourceCode
## sticky-section
:::

> 组件类型：UniStickySectionElement 

 吸顶布局容器 

 注意：暂时仅支持作为list-view的子节点, sticky-section不支持css样式！


### 兼容性
| Web | 微信小程序 | Android | iOS | HarmonyOS 系统版本 | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- | :- |
| 4.02 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | 3.98 | 4.11 | 5.0.5 | 4.71 | - |


### 属性 
| 名称 | 类型 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- |  :-: | :- |
| push-pinned-header | boolean | true | Web: x; 微信小程序: x; Android: 3.98; iOS: 4.11; HarmonyOS: x; HarmonyOS(Vapor): - | sticky-section元素重叠时是否继续上推 |
| padding | Array\<number> | [0,0,0,0\] | Web: 4.02; 微信小程序: x; Android: 3.98; iOS: 4.11; HarmonyOS: x; HarmonyOS(Vapor): - | 长度为 4 的数组，按 top、right、bottom、left 顺序指定内边距  |



<!-- UTSCOMJSON.sticky-section.component_type-->

### sticky-section使用场景

父元素滚动过程中，多个元素有固定到父元素顶部的需求。

父元素中多个元素吸顶需要使用sticky-section组件。sticky-section组件作为sticky-header组件的父容器。sticky-section组件会控制子元素的滚动吸顶业务。sticky-section组件之间可通过push-pinned-header属性控制吸顶重叠时是否上推。

**示例：**

```html
<list-view id="list-view" style="flex: 1; background-color: #f5f5f5;">
  <sticky-section v-for="sectionId in 3" :id="sectionId" push-pinned-header=false>
    <sticky-header>
      <text style="padding: 20px; background-color: #f5f5f5;">sticky-header吸顶--{{sectionId}}</text>
    </sticky-header>
    <list-item v-for="index in 20" :key="index" style="padding: 15px; margin: 5px 0;background-color: #fff;border-radius: 5px;">
      <text class="text">itme-content-{{index}}</text>
    </list-item>
  </sticky-section>
</list-view>
```

#### 注意事项  

+ Android平台、iOS平台sticky-section组件支持存放多个sticky-header子组件，多个sticky-header滚动吸顶时，后一个sticky-header会停靠在前一个sticky-header的末尾处, 仅限于同一个sticky-section父容器。多个sticky-section吸顶停靠通过push-pinned-header控制。  
+ `sticky-section` 组件，不支持设置css样式，不要通过 class 和 style 设置样式  
+ Android平台 `sticky-section` 组件作为 list-view 的子元素时需要注意，sticky-section子元素仅支持sticky-header、list-item，其他元素无法正常显示
+ 鸿蒙平台暂不支持 `padding` 属性，可通过设置子元素样式来实现类似效果  

### 子组件 @children-tags
支持所有组件

### 示例
示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/component/sticky-section/sticky-section.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/component/sticky-section/sticky-section.uvue) 
>
> 该 API 不支持 Web，请运行 hello uni-app x 到 App 平台体验 
```uvue
<template>
  <page-head title="sticky-section"></page-head>
  <list-view id="list-view" ref="listViewRef" show-scrollbar=false class="page" :scroll-into-view="pageData.scrollIntoView"
    @scroll="onScroll" @scrollend="onScrollEnd" bounces="false" refresher-enabled="true" :refresher-triggered="pageData.refresherTriggered" @refresherrefresh="onRefresherrefresh">
    <list-item style="padding: 10px; margin: 5px 0;align-items: center;" :type=20>
      <button @click="gotoStickyHeader('C')" size="mini">跳转到id为C的sticky-header位置上</button>
    </list-item>
    <list-item style="padding: 10px; margin: 5px 0;align-items: center;" :type=20>
      <button @click="appendSectionItem(0)" size="mini">第一组 section 新增5条内容</button>
    </list-item>
    <list-item style="padding: 10px; margin: 5px 0;align-items: center;" :type=20>
      <button @click="deleteSection()" size="mini">删除第一组 section</button>
    </list-item>
    <sticky-section v-for="(section) in pageData.sectionArray" :key="section.name" :padding="pageData.sectionPadding"
      :push-pinned-header="true">
      <sticky-header :id="section.name">
        <text class="sticky-header-text">{{section.name}}</text>
      </sticky-header>
      <list-item v-for="(list) in section.list" :key="list.text" :name="list.text" class="content-item" :type=10>
        <text class="text">{{list.text}}</text>
      </list-item>
    </sticky-section>
    <list-item v-if="pageData.sectionArray.length > 0" style="padding: 10px; margin: 5px 0;align-items: center;" :type=30>
      <!-- <text style="color: #aaa">到底了</text> -->
      <button @click="toTop" size="mini">回到顶部</button>
    </list-item>
  </list-view>
</template>

<script setup lang="uts">
  export type sectionData = {
    name : string,
    list : sectionListItem[]
  }
  export type sectionListItem = {
    text : string
  }
  type DataType = {
    data: string[];
    sectionPadding: number[];
    scrollIntoView: string;
    scrolling: boolean;
    sectionArray: sectionData[];
    appendId: number;
    refresherTriggered: boolean;
    isReady: boolean;
  }

  const pageData = reactive({
    data: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'],
    sectionPadding: [0, 10, 0, 10],
    scrollIntoView: "",
    scrolling: false,
    sectionArray: [],
    appendId: 0,
    refresherTriggered: false,
    isReady: false//自动化测试使用
  } as DataType)

  const listViewRef = ref<UniElement | null>(null)

  const initSectionArray = () => {
    pageData.sectionArray = []
    console.log("initSectionArray start", pageData.sectionArray.length)
    pageData.data.forEach(key => {
      const list = [] as sectionListItem[]
      for (let i = 1; i < 11; i++) {
        const item = { text: key + "--item--content----" + i } as sectionListItem
        list.push(item)
      }
      const sectionDataItem = { name: key, list: list } as sectionData
      pageData.sectionArray.push(sectionDataItem)
    }
    )
    console.log("initSectionArray end", pageData.sectionArray[0].name)
  }

  onReady(() => {
    //延迟onReady再加载数据 校验issues:14705 bug
    initSectionArray()
    pageData.isReady = true
  })

  const toTop = () => {
    pageData.scrollIntoView = ""
    uni.getElementById("list-view")!.scrollTop = 0
  }

  //用于自动化测试
  const listViewScrollByY = (y : number) => {
    const listview = listViewRef.value as UniElement
    // listview.scrollBy(0, y)
    listview.scrollTop = y
  }

  const gotoStickyHeader = (id : string) => {
    // #ifdef APP
    pageData.scrollIntoView = id
    // #endif
    // #ifdef WEB
    console.log("web端不支持该功能")
    // #endif
  }

  const onScroll = () => {
    pageData.scrolling = true
  }

  const onScrollEnd = () => {
    pageData.scrolling = false
    //滚动后重置scrollIntoView = ""
    if (pageData.scrollIntoView != "") {
      pageData.scrollIntoView = ""
    }
  }

  const appendSectionItem = (index : number) => {
    const sectionDataItem = pageData.sectionArray[index]
    pageData.appendId++
    const list = [
      { text: sectionDataItem.name + "--item--content----new1--" + pageData.appendId } as sectionListItem,
      { text: sectionDataItem.name + "--item--content----new2--" + pageData.appendId } as sectionListItem,
      { text: sectionDataItem.name + "--item--content----new3--" + pageData.appendId } as sectionListItem,
      { text: sectionDataItem.name + "--item--content----new4--" + pageData.appendId } as sectionListItem,
      { text: sectionDataItem.name + "--item--content----new5--" + pageData.appendId } as sectionListItem
    ] as sectionListItem[]
    sectionDataItem.list.unshift(...list)
  }

  const deleteSection = () => {
    pageData.sectionArray.shift()
  }

  const onRefresherrefresh = (_ : UniRefresherEvent) => {
    pageData.refresherTriggered = true;
    setTimeout(() => {
      initSectionArray()
      pageData.refresherTriggered = false;
    }, 1000)
  }

  defineExpose({
    pageData,
    deleteSection,
    listViewScrollByY,
    toTop,
    gotoStickyHeader
  })
</script>

<style>
  .page {
    flex: 1;
    background-color: #f5f5f5;
  }

  .sticky-header-text {
    font-size: 16px;
    padding: 8px;
    color: #959595;
    background-color: #f5f5f5;
  }

  .content-item {
    padding: 15px;
    margin-bottom: 10px;
    background-color: #fff;
  }
</style>

```


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.view-container.sticky.sticky-section)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/component/sticky-section.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=sticky-section&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=sticky-section&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=sticky-section&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=sticky-section&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=sticky-section)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=sticky-section&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)
