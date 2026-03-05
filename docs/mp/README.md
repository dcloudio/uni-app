# 编译到小程序端

> 新增于 HBuilderX 4.41+

uni-app x 项目在编译到小程序平台时，将部分特性对齐了web与app端，因此和非uni-app x项目编译到小程序端略有差异。

## 基础库范围
截止到4.41发版时微信的主流基础库版本是3.7.1。uni-app x主要是在这个版本库上适配。已知过老的基础库版本上，scroll-view区域大小会不准确。请开发者检查并确保基础库版本大于3.7.1。

## uts

推荐使用uts跨端开发，但微信小程序上也支持js/ts。

## vue

### 自定义组件启用virtualHost带来的影响@virtualHost

标准的小程序下的自定义组件会多套一层DOM，这会影响flex等样式。而uni-app x默认都是flex的。

所以为了拉齐样式表现，uni-app x 项目在编译到小程序时，默认启用了virtualHost，该配置是小程序平台提供的一种策略，可以取消多套的一层。\n
同时默认启用了[mergeVirtualHostAttributes特性](https://uniapp.dcloud.net.cn/collocation/manifest.html#mp-weixin)，在取消多套的一层后，将原本父层的属性设置，合并到子层。

`去掉一层`以及`合并父属性到子`，这2件事会对真实渲染的DOM产生影响。*尤其会影响在组件外获取组件的DOM*。

我们先看一个例子：

有个组件c1，父级外层代码如下
```html
<c1 id="c1parent" ref="c1ref" class="class1parent"></c1>
```

c1组件的代码如下：
```html
<template>
    <view class="classchild">
    </view>
</template>
```

然后看下mergeVirtualHostAttributes属性合并策略（HBuilderX 4.42+）：
1. 仅将组件外层设置的 id、style、class 以及 v-show 指令生成的 hidden 属性，这4个属性合并到 vue 组件编译成的小程序组件根节点上，其他外层设置的属性都丢弃了。
2. 仅对组件是单个根节点才会合并，组件内多个根节点的时候不会合并。父层全部丢弃。

根据策略看，上述代码在运行时合并后，父层的id、class属性合并到组件根节点上，所以`class1parent` 和 `classchild` 同时生效。

父层通过`uni.createSelectorQuery().in(this.$page).select('#c1parent')`拿不到NodesRef。

但createSelectorQuery是支持设定查找范围的，上面的代码是在页面里查找，如果在父层代码里通过in方法指定查找组件，例如：`uni.createSelectorQuery().in(this.$refs['c1ref'] as ComponentPublicInstance).select('#c1parent') `，可以拿到c1组件的NodesRef

父层通过`uni.getElementById("c1parent")`也可以拿到UniElement。

实际上，不管是通过`.class1parent` 还是 `.classchild`，都可以拿到。因为样式合并后，这2个class在运行时同时存在。

vue组件的方法调用不受影响，ref取到组件后，可以直接调用组件的方法。

### refs@refs

非 uni-app x 项目使用refs取内置组件引用时会获取到undefined，而 uni-app x 项目会获取到对应的UniElement。

## dom

### UniElement

小程序端逻辑层与视图层分离，导致大多数同步的dom api都不可用。

UniElement在小程序端仅支持如下属性/方法：

- id 元素的id属性
- nodeName 元素的节点名
- tagName 元素的标签名
- style 元素的style对象，可以通过style对象调用style.setProperty方法
- getBoundingClientRectAsync 异步获取元素的布局位置信息
- getAttribute 获取元素的属性值，目前仅支持id、style

**注意**

- 小程序端只有UniElement，不支持UniButtonElement、UniViewElement等类
- 小程序端在各种事件在target、currentTarget指向未配置id的组件时，event.target、event.currentTarget会返回一个功能缺失的UniElement，仅能访问dataset、offsetTop、offsetLeft属性。
- 小程序端在各种事件在target、currentTarget指向配置了id的组件时，event.target、event.currentTarget会返回一个功能和getElementById一致的UniElement，除了能访问getElementById返回的UniElement的各种属性方法之外，还能访问dataset、offsetTop、offsetLeft属性。

### 事件

click、tap事件上补充了如下属性，使其表现更像PointerEvent：

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

App平台的ucss和webview的标准css略有差异。为保证多端统一，uni-app-x编译到小程序端时，会进行浏览器样式重置，内置组件根元素带有一些默认样式，详情参考：[uvue css使用](../css/README.md)。

如果你不开发App，且不需要样式重置，想使用原始的小程序样式，那么可以在pages.json的globalStyle或对应的页面style内配置`enableUcssReset`为false来关闭ucss样式重置。参考：[page.json文档](../collocation/pagesjson.md)

## skyline

对skyline的支持处于实验阶段。

目前编译器会根据页面是否为skyline来决定是否注入ucss样式覆盖，仅webview渲染的页面才会进行ucss样式覆盖。

worklet函数暂不支持写在uvue、uts文件内，推荐从js文件内引用。

## 其他差异

### 文件命名
页面或组件目录下，不能使用与 `uvue` 同名的 `uts` 文件。\
小程序端 `uvue` 文件会被编译为同名的 `js、json、wxml、wxss` 文件，如果存在同名 `uts` 文件，会导致冲突。

### 实体字符

uni-app x项目在编译到小程序端时，如果页面内静态的使用了实体字符`&gt;、&lt;、&thinsp;、&nbsp;、&ensp;、&emsp;`则会在最终输出的小程序页面文件中保留这些实体字符，例如`&nbsp;`在微信小程序的wxml文件中仍为`&nbsp;`不会被转为空格， 而非uni-app-x项目`&nbsp;`会转为空格。

### radio、checkbox组件使用justify-content等属性对齐插槽内容与选择框时与app、web表现不一致

> 此表现后续可能会调整，请勿依赖此特性进行布局

由于小程序端radio、checkbox组件内部有一层额外节点，如下属性设置在根节点上不能按预期方式布局插槽内容与选择框

```
flex-direction
align-content
justify-content
align-items
```

## 开发和调试

在HBuilderX底部状态栏选择语法平台，确保有微信小程序平台，否则代码提示不会有微信专有API。如果选择其他平台，但代码里在非MP-WEIXIN的条件编译里写了微信专有代码，ide会告警。
