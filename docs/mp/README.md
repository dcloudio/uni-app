# 编译到小程序端

> HBuilderX 4.41 起支持编译到微信小程序，5.31 起支持编译到支付宝小程序。

uni-app x 项目在编译到小程序平台时，将部分特性对齐了 web 与 app 端，因此和非 uni-app x 项目编译到小程序端略有差异。

与 uni-app 相比，uni-app x 编译到小程序有 2 个显著差别：

1. uni-app x 支持 Element API
   在小程序上开发高性能应用，离不开 wxs/sjs。但 wxs/sjs 难用且不跨平台。\
   虽然小程序自身不支持 Element 操作，但 uni-app x 提供了跨平台的 Element API，并且把这些 API 映射到了小程序的 wxs/sjs 上。\
   这样即实现了跨平台一致性，又解决了小程序下 wxs/sjs 使用麻烦的问题。
2. 布局全面使用 flex
   小程序的 webview 渲染支持 flex 布局，但默认是 block 布局。\
   uni-app x 中全平台统一使用 flex 布局。

## 基础库范围

截止到 HBuilderX 4.41 发版时微信的主流基础库版本是 3.7.1，已知过老的基础库版本上，scroll-view 区域大小会不准确。请开发者检查并确保基础库版本大于 3.7.1；支付宝小程序的主流基础库版本是 2.10.38。uni-app x 主要是在这些版本库上适配。

## vue

### 自定义组件启用 virtualHost 带来的影响@virtualHost

标准的小程序下的自定义组件会多套一层 DOM，这影响性能且更会影响 flex 等样式传递。而 uni-app x 默认都是 flex 的。

所以为了拉齐样式表现，uni-app x 项目在编译到小程序时，默认启用了 virtualHost，该配置是小程序平台提供的一种策略，可以取消多套的一层。\n
同时默认启用了[mergeVirtualHostAttributes 特性](https://uniapp.dcloud.net.cn/collocation/manifest.html#mp-weixin)，在取消多套的一层后，将原本父层的属性设置，合并到子层。

`去掉一层`以及`合并父属性到子`，这 2 件事会对真实渲染的 DOM 产生影响。_尤其会影响在组件外获取组件的 DOM_。

我们先看一个例子：

有个组件 c1，父级外层代码如下

```html
<c1 id="c1parent" ref="c1ref" class="class1parent"></c1>
```

c1 组件的代码如下：

```html
<template>
  <view class="classchild"> </view>
</template>
```

然后看下 mergeVirtualHostAttributes 属性合并策略（HBuilderX 4.42+）：

1. 仅将组件外层设置的 id、style、class 以及 v-show 指令生成的 hidden 属性，这 4 个属性合并到 vue 组件编译成的小程序组件根节点上，其他外层设置的属性都丢弃了。
2. 仅对组件是单个根节点才会合并，组件内多个根节点的时候不会合并。父层全部丢弃。

根据策略看，上述代码在运行时合并后，父层的 id、class 属性合并到组件根节点上，所以`class1parent` 和 `classchild` 同时生效。

父层通过`uni.createSelectorQuery().in(this.$page).select('#c1parent')`拿不到 NodesRef。

但 createSelectorQuery 是支持设定查找范围的，上面的代码是在页面里查找，如果在父层代码里通过 in 方法指定查找组件，例如：`uni.createSelectorQuery().in(this.$refs['c1ref'] as ComponentPublicInstance).select('#c1parent') `，可以拿到 c1 组件的 NodesRef

父层通过`uni.getElementById("c1parent")`也可以拿到 UniElement。

实际上，不管是通过`.class1parent` 还是 `.classchild`，都可以拿到。因为样式合并后，这 2 个 class 在运行时同时存在。

vue 组件的方法调用不受影响，ref 取到组件后，可以直接调用组件的方法。

### refs@refs

非 uni-app x 项目使用 refs 取内置组件引用时会获取到 undefined，而 uni-app x 项目会获取到对应的 UniElement。

## dom

### UniElement

小程序端逻辑层与视图层分离，导致大多数同步的 dom api 都不可用。

UniElement 在小程序端仅支持如下属性/方法：

- id 元素的 id 属性
- nodeName 元素的节点名
- tagName 元素的标签名
- style 元素的 style 对象，可以通过 style 对象调用 style.setProperty 方法
- getBoundingClientRectAsync 异步获取元素的布局位置信息
- getAttribute 获取元素的属性值，目前仅支持 id、style

**注意**

- 小程序端只有 UniElement，不支持 UniButtonElement、UniViewElement 等类
- 小程序端在各种事件在 target、currentTarget 指向未配置 id 的组件时，event.target、event.currentTarget 会返回一个功能缺失的 UniElement，仅能访问 dataset、offsetTop、offsetLeft 属性。
- 小程序端在各种事件在 target、currentTarget 指向配置了 id 的组件时，event.target、event.currentTarget 会返回一个功能和 getElementById 一致的 UniElement，除了能访问 getElementById 返回的 UniElement 的各种属性方法之外，还能访问 dataset、offsetTop、offsetLeft 属性。

### 事件

click、tap 事件上补充了如下属性，使其表现更像 PointerEvent：

```
event.x
event.y
event.clientX
event.clientY
event.pageX
event.pageY
event.screenX
event.screenY
```

## css

### 样式重置

App 平台的 ucss 和 webview 的标准 css 略有差异。为保证多端统一，uni-app-x 编译到小程序端时，会进行浏览器样式重置，内置组件根元素带有一些默认样式，详情参考：[uvue css 使用](../css/README.md)。

如果你不开发 App，且不需要样式重置，想使用原始的小程序样式，那么可以在 pages.json 的 globalStyle 或对应的页面 style 内配置 `enableUcssReset` 为 false 来关闭 ucss 样式重置。参考：[page.json 文档](../collocation/pagesjson.md)

## 微信小程序 skyline

对 skyline 的支持处于实验阶段。

目前编译器会根据页面是否为 skyline 来决定是否注入 ucss 样式覆盖，仅 webview 渲染的页面才会进行 ucss 样式覆盖。

worklet 函数暂不支持写在 uvue、uts 文件内，推荐从 js 文件内引用。

## 其他差异

### 文件命名

页面或组件目录下，不能使用与 `uvue` 同名的 `uts` 文件。\
小程序端 `uvue` 文件会被编译为同名的 `js、json、wxml/axml、wxss/acss` 文件，如果存在同名 `uts` 文件，会导致冲突。

### 实体字符

uni-app x 项目在编译到小程序端时，如果页面内静态的使用了实体字符`&gt;、&lt;、&thinsp;、&nbsp;、&ensp;、&emsp;`则会在最终输出的小程序页面文件中保留这些实体字符，例如`&nbsp;`在小程序的 wxml/axml 文件中仍为`&nbsp;`不会被转为空格， 而非 uni-app-x 项目`&nbsp;`会转为空格。

### 微信小程序注意事项@mp-weixin

#### radio、checkbox 组件使用 justify-content 等属性对齐插槽内容与选择框时与 app、web 表现不一致

> 此表现后续可能会调整，请勿依赖此特性进行布局

由于小程序端 radio、checkbox 组件内部有一层额外节点，如下属性设置在根节点上不能按预期方式布局插槽内容与选择框

```
flex-direction
align-content
justify-content
align-items
```

### 支付宝小程序注意事项@mp-alipay

编译到支付宝小程序时需注意以下平台差异：

- 组件和 API 的支付宝平台限制请参阅对应文档
- 支付宝小程序支持暗黑模式，需要通过 `themeLocation` 指定 `theme.json`，详见[暗黑主题适配教程](../api/theme-change.md)。
- 支付宝小程序不支持完全自定义导航栏，`navigationStyle: "custom"` 不生效，详见[pages.json 页面配置](../collocation/pagesjson.md)。

## 开发和调试

在 HBuilderX 底部状态栏选择语法平台，确保有指定的小程序平台，否则代码提示不会有该小程序专有 API。如果选择其他平台，但代码里在非当前小程序的条件编译里写了其他小程序平台专有代码，ide 会告警。
