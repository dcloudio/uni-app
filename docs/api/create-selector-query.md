<!-- ## uni.createSelectorQuery() @createselectorquery -->

::: sourceCode
## uni.createSelectorQuery() @createselectorquery

> GitCode: https://gitcode.com/dcloud/uni-api/tree/alpha/uni_modules/uni-createSelectorQuery


> GitHub: https://github.com/dcloudio/uni-api/tree/alpha/uni_modules/uni-createSelectorQuery

:::

返回一个SelectorQuery对象实例


createSelectorQuery是小程序的API，因小程序未开放DOM，且视图层和逻辑层分离，于是提供了一个异步的API，可以在逻辑层有限的获取一些DOM能力。

该API返回的类型为NodeRef。它和DOM的Element有区别。

大多数组件的属性和样式操作，是通过绑定vue的响应式变量data来实现的。一般不使用本API。

本API的主要用途是小程序下获取元素计算后的样式。如果您的应用不适配小程序，那么在Web和App上有更强大的[UniElement](../dom/README.md)。

小程序下有时用本API获取部分组件的上下文context，但这个写法不跨平台。跨平台的获取组件context，应该使用uni.createXXContext()。

### createSelectorQuery 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS | HarmonyOS(Vapor) |
| :- | :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 3.91 | 4.11 | 4.61 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |




**selector 说明：**

``selector`` 类似于 CSS 的选择器，但仅支持下列语法。
- ID选择器：``#the-id``
- class选择器：``.a-class``

### 返回值 

| 类型 |
| :- |
| [SelectorQuery](#selectorquery-values) |

#### SelectorQuery 的方法 @selectorquery-values 

#### in(component: any \| null): SelectorQuery @in
in
将选择器的选取范围更改为自定义组件component内
##### in 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | 4.41 | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| component | any | 否 | - | - |  | 

##### 返回值 

| 类型 |
| :- |
| [SelectorQuery](#selectorquery-values) |
 

#### select(selector: string): NodesRef @select
select
在当前页面下选择第一个匹配选择器selector的节点
##### select 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | 4.41 | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| selector | string | 是 | - | - | - | 

##### 返回值 

| 类型 |
| :- |
| [NodesRef](#nodesref-values) |

###### NodesRef 的方法 @nodesref-values 

###### boundingClientRect( callback: SelectorQueryNodeInfoCallback \| null,    ): SelectorQuery @boundingclientrect
boundingClientRect
添加节点的布局位置的查询请求，相对于显示区域，以像素为单位
###### boundingClientRect 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 否 | - | - |  | 

###### 返回值 

| 类型 |
| :- |
| [SelectorQuery](#selectorquery-values) |
 

###### scrollOffset(callback: SelectorQueryNodeInfoCallback): SelectorQuery @scrolloffset
scrollOffset
添加节点的滚动位置查询请求，以像素为单位
###### scrollOffset 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | - | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | - |  | 

###### 返回值 

| 类型 |
| :- |
| [SelectorQuery](#selectorquery-values) |
 

###### fields( fields: NodeField,        callback: SelectorQueryNodeInfoCallback \| null,    ): SelectorQuery @fields
fields
获取节点的相关信息，需要获取的字段在fields中指定
###### fields 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.25 | 4.25 | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| fields | **NodeField** | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  |
| callback | (result: any) => void | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 

#### fields 的属性描述

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| id | boolean | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 是否返回节点 id |
| dataset | boolean | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 是否返回节点 dataset |
| rect | boolean | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 是否返回节点布局位置（left right top bottom） |
| size | boolean | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 是否返回节点尺寸（width height） |
| scrollOffset | boolean | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 是否返回节点的 scrollLeft scrollTop，节点必须是 scroll-view 或者 viewport |
| properties | Array&lt;string&gt; | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 指定属性名列表，返回节点对应属性名的当前属性值（只能获得组件文档中标注的常规属性值，id class style 和事件绑定的属性值不可获取） |
| computedStyle | Array&lt;string&gt; | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 指定样式名列表，返回节点对应样式名的当前值 |
| context | boolean | 否 | - | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: - | 是否返回节点对应的 Context 对象 |
| node | boolean | 否 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - | 是否返回节点对应的 Node 实例 |

###### 返回值 

| 类型 |
| :- |
| [SelectorQuery](#selectorquery-values) |
 

###### context(callback: SelectorQueryNodeInfoCallback): SelectorQuery @context
context
添加节点的 Context 对象查询请求
###### context 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 4.41 | x | x | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 

###### 返回值 

| 类型 |
| :- |
| [SelectorQuery](#selectorquery-values) |
 

###### node(callback: (result: any) => void): SelectorQuery @node
node
获取 Node 节点实例。目前支持 Canvas 的获取。
获取节点的相关信息，需要获取的字段在fields中指定
###### node 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| 4.0 | 4.41 | 4.25 | 4.25 | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: any) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 

###### 返回值 

| 类型 |
| :- |
| [SelectorQuery](#selectorquery-values) |
 
 

#### selectAll(selector: string): NodesRef @selectall
selectAll
在当前页面下选择匹配选择器selector的所有节点
##### selectAll 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | 4.41 | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| selector | string | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 

##### 返回值 

| 类型 |
| :- |
| [NodesRef](#nodesref-values) |
 

#### selectViewport(): NodesRef @selectviewport
selectViewport
选择显示区域
##### selectViewport 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | 4.41 | - | - | - |


##### 返回值 

| 类型 |
| :- |
| [NodesRef](#nodesref-values) |
 

#### exec(callback: (result: Array\<any>) => void \| null): NodesRef \| null @exec
exec
执行所有的请求
##### exec 兼容性 
| Web | 微信小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- |
| - | 4.41 | - | - | - |

##### 参数 

| 名称 | 类型 | 必填 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| callback | (result: Array&lt;any&gt;) => void | 是 | - | Web: -; 微信小程序: -; Android: -; iOS: -; HarmonyOS: - |  | 

##### 返回值 

| 类型 | 必备 |
| :- | :- |
| [NodesRef](#nodesref-values) | 否 |
 
 


##### NodeInfo 属性值

|属性		|类型		|说明							|
|---		|---		|---							|
|id			|String	|节点的 ID				|
|dataset|Object	|节点的 dataset		|
|left		|Number	|节点的左边界坐标	|
|right	|Number	|节点的右边界坐标	|
|top		|Number	|节点的上边界坐标	|
|bottom	|Number	|节点的下边界坐标	|
|width	|Number	|节点的宽度				|
|height	|Number	|节点的高度				|


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=api.dom.createSelectorQuery)
- [参见uni-app相关文档](https://uniapp.dcloud.net.cn/api/ui/nodes-info.html#createselectorquery)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/wxml/SelectorQuery.html)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=createSelectorQuery&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=createSelectorQuery&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=createSelectorQuery&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=createSelectorQuery&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=createSelectorQuery)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=createSelectorQuery&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)

组件内使用

```html
<template>
  <view>
    <button @click="getNodeInfo">getNodeInfo</button>
    <view class="rect-1-2">
      <view class="rect rect1"></view>
      <view class="rect rect2"></view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        nodeInfoList: [] as NodeInfo[]
      }
    },
    props: {
    },
    methods: {
      getNodeInfo() {
        uni.createSelectorQuery().in(this).select('.rect1').boundingClientRect().exec((ret) => {
          this.nodeInfoList.length = 0
          this.nodeInfoList.push(ret[0] as NodeInfo)
        })
      }
    }
  }
</script>
```

### 示例

示例为[hello uni-app x alpha分支](https://gitcode.com/dcloud/hello-uni-app-x/blob/prod_alpha/pages/API/create-selector-query/create-selector-query.uvue)，与最新HBuilderX Alpha版同步。与最新正式版同步的master分支示例[另见](https://gitcode.com/dcloud/hello-uni-app-x/blob/master//pages/API/create-selector-query/create-selector-query.uvue) 
::: preview https://hellouniappx.dcloud.net.cn/web/#/pages/API/create-selector-query/create-selector-query

> appRedirect https://hellouniappx.dcloud.net.cn/appredirect.html?path=pages/API/create-selector-query/create-selector-query

>示例
```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view class="page-scroll-view" style="padding-bottom: var(--uni-safe-area-inset-bottom);">
  <!-- #endif -->
    <view class="page uni-list-cell-db-text" id="page">
      <page-head :title="data.title"></page-head>
      <button class="btn btn-get-node-info" @click="getNodeInfo">getNodeInfo</button>
      <button class="btn btn-get-all-node-info" @click="getAllNodeInfo">getAllNodeInfo</button>
      <view id="rect-1-2" class="rect-1-2">
        <view class="rect rect1"></view>
        <view class="rect rect2"></view>
      </view>
      <view class="rect-info-1-2">
        <view class="rect-info" v-for="(nodeInfo, index) in data.nodeInfoList" :key="index">
          <view class="node-info-item">
            <text class="node-info-item-k">left: </text>
            <text class="node-info-item-v">{{nodeInfo.left}}</text>
          </view>
          <view class="node-info-item">
            <text class="node-info-item-k">top: </text>
            <text class="node-info-item-v">{{nodeInfo.top}}</text>
          </view>
          <view class="node-info-item">
            <text class="node-info-item-k">right: </text>
            <text class="node-info-item-v">{{nodeInfo.right}}</text>
          </view>
          <view class="node-info-item">
            <text class="node-info-item-k">bottom: </text>
            <text class="node-info-item-v">{{nodeInfo.bottom}}</text>
          </view>
          <view class="node-info-item">
            <text class="node-info-item-k">width: </text>
            <text class="node-info-item-v">{{nodeInfo.width}}</text>
          </view>
          <view class="node-info-item">
            <text class="node-info-item-k">height: </text>
            <text class="node-info-item-v">{{nodeInfo.height}}</text>
          </view>
        </view>
      </view>
      <node-child class="node-child"></node-child>
      <text>子组件多根节点</text>
      <multi-child ref="multiChildRef" id="multi-child"></multi-child>
      <text>子组件多根节点(仅测试，用于验证查询是否超出范围)</text>
      <multi-child id="multi-child-2"></multi-child>
      <view>
        <text>测试.fields</text>
        <text>{{data.fieldsResultContainNode}}</text>
      </view>
      <view>
        <text>测试.node</text>
        <text>{{data.nodeResultContainNode}}</text>
      </view>
      <canvas id="canvas1"></canvas>

      <!-- text 组件 -->
      <view class="uni-common-mt">
        <text class="uni-title-text">Text 组件查询示例</text>
        <text id="test-text" class="test-text">这是一个测试文本元素</text>
        <button class="btn" @click="getTextNodeInfo">查询 Text 节点信息</button>
        <view v-if="data.textNodeInfo" class="rect-info">
          <view class="node-info-item">
            <text class="node-info-item-k">left: </text>
            <text class="node-info-item-v">{{data.textNodeInfo!.left}}</text>
          </view>
          <view class="node-info-item">
            <text class="node-info-item-k">right: </text>
            <text class="node-info-item-v">{{data.textNodeInfo!.right}}</text>
          </view>
          <view class="node-info-item">
            <text class="node-info-item-k">top: </text>
            <text class="node-info-item-v">{{data.textNodeInfo!.top}}</text>
          </view>
          <view class="node-info-item">
            <text class="node-info-item-k">bottom: </text>
            <text class="node-info-item-v">{{data.textNodeInfo!.bottom}}</text>
          </view>
          <view class="node-info-item">
            <text class="node-info-item-k">width: </text>
            <text class="node-info-item-v">{{data.textNodeInfo!.width}}</text>
          </view>
          <view class="node-info-item">
            <text class="node-info-item-k">height: </text>
            <text class="node-info-item-v">{{data.textNodeInfo!.height}}</text>
          </view>
        </view>
      </view>

      <!-- image 组件 -->
      <view class="uni-common-mt">
        <text class="uni-title-text">Image 组件查询示例</text>
        <image id="test-image" class="test-image" src="/static/test-image/logo.png" mode="aspectFit"></image>
        <button class="btn" @click="getImageNodeInfo">查询 Image 节点信息</button>
        <view v-if="data.imageNodeInfo" class="rect-info">
          <view class="node-info-item">
            <text class="node-info-item-k">left: </text>
            <text class="node-info-item-v">{{data.imageNodeInfo!.left}}</text>
          </view>
          <view class="node-info-item">
            <text class="node-info-item-k">right: </text>
            <text class="node-info-item-v">{{data.imageNodeInfo!.right}}</text>
          </view>
          <view class="node-info-item">
            <text class="node-info-item-k">top: </text>
            <text class="node-info-item-v">{{data.imageNodeInfo!.top}}</text>
          </view>
          <view class="node-info-item">
            <text class="node-info-item-k">bottom: </text>
            <text class="node-info-item-v">{{data.imageNodeInfo!.bottom}}</text>
          </view>
          <view class="node-info-item">
            <text class="node-info-item-k">width: </text>
            <text class="node-info-item-v">{{data.imageNodeInfo!.width}}</text>
          </view>
          <view class="node-info-item">
            <text class="node-info-item-k">height: </text>
            <text class="node-info-item-v">{{data.imageNodeInfo!.height}}</text>
          </view>
        </view>
      </view>

      <!-- scroll-view 组件 -->
      <view class="uni-common-mt">
        <text class="uni-title-text">Scroll-view 组件查询示例</text>
        <scroll-view id="test-scroll-view" class="test-scroll-view">
          <view style="padding: 10px;">
            <text v-for="i in 10" :key="i">Scroll-view 第 {{i}} 行</text>
          </view>
        </scroll-view>
        <button class="btn" @click="getScrollViewNodeInfo">查询 Scroll-view 节点信息</button>
        <view v-if="data.scrollViewNodeInfo" class="rect-info">
          <view class="node-info-item">
            <text class="node-info-item-k">left: </text>
            <text class="node-info-item-v">{{data.scrollViewNodeInfo!.left}}</text>
          </view>
          <view class="node-info-item">
            <text class="node-info-item-k">right: </text>
            <text class="node-info-item-v">{{data.scrollViewNodeInfo!.right}}</text>
          </view>
          <view class="node-info-item">
            <text class="node-info-item-k">top: </text>
            <text class="node-info-item-v">{{data.scrollViewNodeInfo!.top}}</text>
          </view>
          <view class="node-info-item">
            <text class="node-info-item-k">bottom: </text>
            <text class="node-info-item-v">{{data.scrollViewNodeInfo!.bottom}}</text>
          </view>
          <view class="node-info-item">
            <text class="node-info-item-k">width: </text>
            <text class="node-info-item-v">{{data.scrollViewNodeInfo!.width}}</text>
          </view>
          <view class="node-info-item">
            <text class="node-info-item-k">height: </text>
            <text class="node-info-item-v">{{data.scrollViewNodeInfo!.height}}</text>
          </view>
        </view>
      </view>
    </view>
    <navigator url="/pages/API/create-selector-query/create-selector-query-onScroll"><button>滚动容器中的createSelectorQuery</button></navigator>
  <!-- #ifdef APP -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup lang="uts">
  import nodeChild from './nodes-info-child.uvue'
  import multiChild from './selector-query-child-multi.uvue'

  type NodeInfoType = {
    left : number | null,
    top : number | null,
    right : number | null,
    bottom : number | null,
    width : number | null,
    height : number | null,
  }

  type DataType = {
    title: string;
    nodeInfoList: NodeInfoType[];
    rootNodeInfo: NodeInfoType | null;
    selectCount: number;
    selectAllCount: number;
    fieldsResultContainNode: boolean;
    nodeResultContainNode: boolean;
    textNodeInfo: NodeInfoType | null;
    imageNodeInfo: NodeInfoType | null;
    scrollViewNodeInfo: NodeInfoType | null;
  }
  // 使用reactive避免ref数据在自动化测试中无法访问
  const data = reactive({
    title: 'createSelectorQuery',
    nodeInfoList: [],
    // 仅用于自动化测试
    rootNodeInfo: null,
    //供自动化测试使用
    // resizeRectValid: false
    // TODO
    selectCount: 0,
    selectAllCount: 0,
    fieldsResultContainNode: false,
    nodeResultContainNode: false,
    textNodeInfo: null,
    imageNodeInfo: null,
    scrollViewNodeInfo: null
  } as DataType)

  const multiChildRef = ref<ComponentPublicInstance | null>(null)

  // 仅用于自动化测试
  const onChildReady = (count: number, allCount: number) => {
    // 通过事件传递数据，子组件在ready时通过事件发送数据
    data.selectCount = count
    data.selectAllCount = allCount
  }

  // 仅用于自动化测试
  const getRootNodeInfo = (selector: string) => {
    uni.createSelectorQuery().select(selector).boundingClientRect().exec((ret) => {
      if (ret.length == 1) {
        const nodeInfo = ret[0] as NodeInfo;
        const nodeType = {
          left: nodeInfo.left,
          top: nodeInfo.top,
          right: nodeInfo.right,
          bottom: nodeInfo.bottom,
          width: nodeInfo.width,
          height: nodeInfo.height,
        } as NodeInfoType;
        data.rootNodeInfo = nodeType
      }
    })
  }

  const getNodeInfo = () => {
    uni.createSelectorQuery().select('.rect1').boundingClientRect().exec((ret) => {
      data.nodeInfoList.length = 0
      const i = ret[0] as NodeInfo
      data.nodeInfoList.push({
        left: i.left,
        top: i.top,
        right: i.right,
        bottom: i.bottom,
        width: i.width,
        height: i.height,
      } as NodeInfoType)
    })
  }

  const getAllNodeInfo = () => {
    uni.createSelectorQuery().selectAll('.rect').boundingClientRect().exec((ret) => {
      data.nodeInfoList.length = 0
      const array = ret[0] as NodeInfo[]
      array.forEach((i) => {
        data.nodeInfoList.push({
          left: i.left,
          top: i.top,
          right: i.right,
          bottom: i.bottom,
          width: i.width,
          height: i.height,
        } as NodeInfoType)
      })
    })
  }

  // test .fields
  const testFields = () => {
    uni.createSelectorQuery().select('.rect1').fields({
      node: true
    } as NodeField, (ret) => {
      const isElement = (ret as NodeInfo).node instanceof UniElement
      if (isElement) {
        data.fieldsResultContainNode = true
      } else {
        data.fieldsResultContainNode = false
      }
    }).exec()
  }

  // test .node
  const testNode = () => {
    uni.createSelectorQuery().select('#canvas1').node((ret) => {
      const isElement = (ret as NodeInfo).node instanceof UniElement
      const isCanvasElement = ((ret as NodeInfo).node as UniCanvasElement).tagName == 'CANVAS'
      if (isElement && isCanvasElement) {
        data.nodeResultContainNode = true
      } else {
        data.nodeResultContainNode = false
      }
    }).exec()
  }

  // 查询 text 节点信息
  const getTextNodeInfo = () => {
    uni.createSelectorQuery().select('#test-text').boundingClientRect().exec((ret) => {
      if (ret.length > 0) {
        const i = ret[0] as NodeInfo
        data.textNodeInfo = {
          left: i.left,
          top: i.top,
          right: i.right,
          bottom: i.bottom,
          width: i.width,
          height: i.height,
        } as NodeInfoType
      }
    })
  }

  // 查询 image 节点信息
  const getImageNodeInfo = () => {
    uni.createSelectorQuery().select('#test-image').boundingClientRect().exec((ret) => {
      if (ret.length > 0) {
        const i = ret[0] as NodeInfo
        data.imageNodeInfo = {
          left: i.left,
          top: i.top,
          right: i.right,
          bottom: i.bottom,
          width: i.width,
          height: i.height,
        } as NodeInfoType
      }
    })
  }

  // 查询 scroll-view 节点信息
  const getScrollViewNodeInfo = () => {
    uni.createSelectorQuery().select('#test-scroll-view').boundingClientRect().exec((ret) => {
      if (ret.length > 0) {
        const i = ret[0] as NodeInfo
        data.scrollViewNodeInfo = {
          left: i.left,
          top: i.top,
          right: i.right,
          bottom: i.bottom,
          width: i.width,
          height: i.height,
        } as NodeInfoType
      }
    })
  }

  onLoad(() => {
    uni.$on('childDataReady', onChildReady)
  })

  onUnload(() => {
    uni.$off('childDataReady', onChildReady)
  })

  onReady(() => {
    testFields()
    testNode()
  })

  onResize(() => {
    //供自动化测试使用
    /* var rect12Element = uni.getElementById("rect-1-2")
    if(rect12Element != null) {
      var domRect = rect12Element.getBoundingClientRect()
      if(domRect.width > 100) {
        data.resizeRectValid = true
      }
    } */
  })

  defineExpose({
    data,
    getRootNodeInfo,
    getTextNodeInfo,
    getImageNodeInfo,
    getScrollViewNodeInfo
  })
</script>

<style>
  .page {
    padding: 15px;
  }

  .btn {
    margin-top: 15px;
  }

  .rect-1-2 {
    flex-direction: row;
    margin-top: 15px;
  }

  .rect {
    width: 150px;
    height: 100px;
  }

  .rect1 {
    background-color: dodgerblue;
  }

  .rect2 {
    margin-left: auto;
    background-color: seagreen;
  }

  .rect-info-1-2 {
    flex-direction: row;
    margin-top: 15px;
  }

  .rect-info {
    flex: 1;
    flex-direction: column;
  }

  .node-info-item {
    flex-direction: row;
  }

  .node-info-item-k {
    width: 72px;
    line-height: 2;
  }

  .node-info-item-v {
    font-weight: bold;
    line-height: 2;
  }

  .test-text {
    padding: 10px;
    background-color: #d6d6d6;
    margin: 10px 0;
    font-size: 16px;
    color: #333;
  }

  .test-image {
    margin: 10px 0;
    width: 100px;
    height: 100px;
  }

  .test-scroll-view {
    margin: 10px 0;
    width: 300px;
    height: 100px;
    border: 1px solid #ccc;
  }

</style>

```

:::

**exec 示例说明：**

`exec()` 返回所有动作的集合，每一项的数据类型取决于查询动作，结果排序按照调用动作顺序

示例：

```js
uni.createSelectorQuery().select('.rect1').boundingClientRect((res) => {
  // 共返回 1 条结果，第一项数据类型为 NodeInfo
  // res = [ {} ]

  const nodeInfoArray = res as NodeInfo[]
  const nodeInfoArrayItem = nodeInfoArray[0]
  console.log('info', nodeInfoArrayItem.width, nodeInfoArrayItem.height)
}).exec()
```

```js
uni.createSelectorQuery().selectAll('.rect1').boundingClientRect((res) => {
  // 共返回 1 条结果，第一项数据类型为 NodeInfo[]
  // res = [ [{},{}] ]

  const nodeInfoArray = res as NodeInfo[]
  const nodeInfoArrayItem = nodeInfoArray[0]
  nodeInfoArrayItem.foreach((item: NodeInfo) => {
    console.log('item', item.width, item.height)
  })
}).exec()
```

```js
uni.createSelectorQuery().select('.rect1').selectAll('.rect2').boundingClientRect((res) => {
  // 共返回 2 条结果，第一项数据类型为 NodeInfo，第二项数据类型类型为 NodeInfo[]
  // res = [ {}, [{},{}] ]

  const nodeInfoArray = res as NodeInfo[]

  const nodeInfoItem0 = nodeInfoArray[0]
  console.log('nodeInfoItem0', nodeInfoItem0.width, nodeInfoItem0.height)

  const nodeInfoItem1 = nodeInfoArray[1]
  nodeInfoItem1.foreach((item: NodeInfo) => {
    console.log('item', item.width, item.height)
  })
}).exec()
```


通过id查询组件内多节点

和单根节点组件有所不同，有着多个根节点的组件需要透传 attribute

页面

```html
<template>
  <view>
    <custom-component1 id="custom-component1"></custom-component1>

    <button @click="query">query</button>
  </view>
</template>
<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
      query() {
        uni.createSelectorQuery().in(this).select('#scustom-component1').boundingClientRect().exec((ret) => {
          console.log(ret)
        })
      }
    }
  }
</script>
```

组件 custom-component1

```html
<template>
  <text>1</text>
  <text v-bind="$attrs">2</text>
  <text>3</text>
</template>
```

**注意事项：**

1. App 平台 `<template>` 下如果存在多个节点，会导致非第一个节点查询不到的问题
2. Web 平台 `<template>` 下如果存在多个节点，如果是在组件内部查询，可能会导致查询到其他组件或页面的元素
3. HarmonyOS 平台 `<template>` 下如果存在多个节点，蒸汽模式下会导致查询不到的问题

## 通用类型


### GeneralCallbackResult 

| 名称 | 类型 | 必备 | 默认值 | 兼容性 | 描述 |
| :- | :- | :- | :- |  :-: | :- |
| errMsg | string | 是 | - | Web: -; 微信小程序: 4.41; Android: -; iOS: -; HarmonyOS: - | 错误信息 |

