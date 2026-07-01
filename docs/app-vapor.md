# 蒸汽模式
蒸汽模式，即vapor，是vue3的新功能，去掉了虚拟DOM。

之前的非蒸汽模式，也称之为VDOM模式。

uni-app x 的蒸汽模式，包含了去掉虚拟DOM的vue框架，以及App平台的一套基于原生渲染管线的、超过原生渲染速度的全新渲染引擎。

- HBuilderX 5.0+，鸿蒙支持蒸汽模式
- HBuilderX 5.11+，iOS支持蒸汽模式
- Android的蒸汽模式 计划于5.2发布

## 虚拟DOM的问题
近年新兴的前端框架，掀起了新一轮的性能革命，纷纷去掉了虚拟DOM。通过更复杂的编译器，生成更高效的直接操作DOM的代码。

vue中去掉虚拟DOM的版本即为蒸汽模式。

回答蒸汽模式为什么更快这个问题前，我们需要先明白虚拟DOM为什么慢。

假设我们要加载一个大页面，里面有1000个DOM元素。

在蒸汽模式之前的版本，运行时的流程实际是：
1. 创建1000个虚拟DOM，构造VNode Tree
2. 在每个VNode创建的内部逻辑中，创建对应的真实DOM，构造DOM Tree。

本来创建1000个真实DOM的树已经比较耗时了，再加上还要花时间创建1000个虚拟DOM树，造成页面加载更慢。

过去的虚拟DOM，包含了DOM操作的最佳实践，使得普通开发者写出的代码也能较高性能运行。

但蒸汽模式，通过更强大和复杂的编译器，把vue的语法编译成了包含DOM操作最佳实践的JS代码。

注意：蒸汽模式仅支持组合式API（setup），不支持选项式。

选项式的问题在于很多写法框的比较死，灵活度相比其他框架要弱。

从DCloud的角度看，去掉虚拟DOM的蒸汽模式vue框架，综合性能、生态、易用性，已超过了react等其他框架。

## 全新的渲染系统

uni-app x 引入蒸汽模式，不仅是去掉了虚拟DOM，更重要的是 uni-app x 全新的渲染系统。

出于减少技术概念和条件编译的角度，这套全新的渲染系统和蒸汽模式绑定推出，渲染系统仅有内部代号，没有对外单独命名。

对于开发者而言，写条件编译时仅需一个条件，即`// #ifdef VUE3-VAPOR`。

这个无名的渲染系统，实现了跨平台App框架的历史突破，即：**基于原生渲染管线的跨平台框架，超越原生的渲染速度**。

### 性能说明

在hello uni-app x的模板下，有一批性能测试示例：

1. 4050页面

同屏渲染2050个view，里面又套了2000个text，一共4050个元素。没有懒加载、没有复用，是view和text创建速度的硬性考验。

- 鸿蒙平台
测试设备：鸿蒙nova12(apiLevel 21，鸿蒙最低端手机)

|						|渲染耗时ms	|
|--					|--					|
|ArkUI			|798				|
|NativeNode	|672				|
|uni-app x 蒸汽模式	|280	|

NativeNode指跳过ArkUI声明式框架，纯写c代码创建这些ui元素。

uni-app x 作为一个数据驱动的响应式框架，渲染速度比裸写c代码还快数倍。

原生ArkUI的开源工程见[https://gitcode.com/dcloud/test4050-harmony-arkui](https://gitcode.com/dcloud/test4050-harmony-arkui)，开发者可以自行编译测试数据，重现实验。

点击链接：[4050对比视频](https://www.bilibili.com/video/BV1RpPQzAEDS/?vd_source=eef2a939bbe2563836b506d2f2098835)。左边为`arkUI原生`，右边为`uni-app x 蒸汽模式`。

另外我们也测试了其他跨平台框架在鸿蒙的表现，包括基于k/n方案的跨平台框架，实际运行速度比原生的ArkUI要慢的多，更无法与uni-app x蒸汽模式相比，

- iOS平台
测试设备：iPhoneXR(iOS18.5)

|					|渲染耗时ms	|
|--				|--					|
|原生UIKit|388				|
|SwiftUI	|1619				|
|uni-app x 蒸汽模式|181	|

iOS原生自身的优化做的很好，都通过AOT编译为了机器码。SwiftUI是数据驱动的声明式框架，比UIKit慢是正常的。但uni-app x 作为数据驱动的响应式框架，做到了比原生UIKit更数倍。

原生iOS的开源工程见[https://gitcode.com/dcloud/test4050-ios](https://gitcode.com/dcloud/test4050-ios)，开发者可以自行编译测试数据，重现实验。

另外，不管是哪个App平台，即便uni-app x不使用拍平，仍然比原生渲染更快。

2. 死亡复杂长列表页面

4000行数据，7.4M的JSON，渲染2万个元素，占据普通手机1333屏左右。

每行超过40+元素，包括文字、图片、视频、vue组件；每行嵌套10+层。

列表中还有大量的阴影、圆角、边框等复杂渲染样式。

在鸿蒙nova12(鸿蒙最低端手机)、iPhoneXR(2018年上市)上，瞬间进入页面。

上下手滑列表，满帧运行；拖着滚动条极快滑动，平均帧率90以上，不会出现白块灰块。（在手机设置搜索“刷新率”，打开强制120Hz体验）

在120Hz高刷屏上，8.3ms内无法完成新列表项的加载，就会掉帧。列表越复杂，越难以在8.3ms内完成渲染。

而uni-app x 蒸汽模式极快的渲染速度，支撑开发者构造非常复杂的列表，也可以丝般顺滑。

点击链接：[长列表对比视频](https://www.bilibili.com/video/BV1dpPQzAEYN/?vd_source=eef2a939bbe2563836b506d2f2098835)。左边是原生arkui，右边是uni-app x蒸汽模式。

3. rich-text 5万字长文多图页面

5万字长文、59张图片。瞬间进入页面。上下快滑列表，不会出现白块灰块。人手滑不出掉帧。

[视频链接](https://www.bilibili.com/video/BV1RWPQzaE7o/?vd_source=9e6b69fd9d38ab4e16ec7e61541f2294)
**注：录屏时帧率只能为60Hz，实际使用时是完整的120Hz**

这些内容，都可以手机上直观的亲身体验：
1. 使用鸿蒙next手机的应用商店，搜索“DCloud开发者中心系统”，或扫描下方二维码

    ![](https://web-ext-storage.dcloud.net.cn/uni-app-x/hello-uniappx-qrcode.png)#{width=200px height=200px}

2. 在HBuilderX 5.0+新建 hello uni-app x项目，manifest中开启蒸汽模式，运行到鸿蒙设备，切记选择release模式运行来测试性能。iOS则需要5.11+，iOS不涉及release模式。

更详细专业的benchmark报告，[详见](./vapor-benchmark.md)

### 释疑
关于uni-app x的蒸汽模式为什么这么快，很多人可能有疑问，比如

- uni-app x 的App平台到底是自渲染还是原生渲染？

答案是原生渲染。uni-app x 选择原生渲染是为了更好的和原生生态无缝融合、以及降低内存占用。

- 为什么都是原生渲染，uni-app x的蒸汽模式比原生渲染更快？

这里面涉及数千项工程优化，举例一些：

1. Android的compose ui也是基于原生渲染管线的，但没有使用Android自带的view、textview，而是实现了自己的组件系统。
	
	这条路可行，只不过compose ui没有成为一个好标杆，它实际渲染速度比view体系更慢。（在上述4050示例对比中，有原生view和compose ui的测试例，[详见](https://gitcode.com/dcloud/test4050-android)）
	
	`uni-app x 蒸汽模式`，也几乎没有使用系统自带的组件，不管是textView、recycleView、viewPage...，或者是鸿蒙的arkUI相关组件，基本都没用。全新研发的组件做到了性能更高。
	
2. 视图层代码，即vue里template和style里的代码，被直接编译为优化度非常高的C代码。它的运行速度远快于arkts、kotlin及k/n。
	
- 这些优化有没有副作用？

App平台因为要编译C代码，所以真机运行的编译速度变慢不少。

但从5.11起，新推出了字节码，来替代机器码模式。字节码模式大幅改善编译速度，且性能下降微乎其微。

所以从5.11起，可以理解为没有副作用了

- 基于原生渲染，是否涉及跨平台的不一致问题？

uni-app x 蒸汽模式中的组件，基本都是使用跨平台的C++和uts编写的，几乎没有各平台的原生组件。因为是一套代码，所以可以很好的保持跨平台一致性。

之前uni-app x VDOM模式时，不同平台的组件差异还较多，这个问题在全平台完成蒸汽模式后会大幅减少。

## 体验方式
下载HBuilderX 5.0+，运行hello uni-app x的[alpha分支](https://gitcode.com/dcloud/hello-uni-app-x)。

如果要在自己的项目下打开蒸汽模式，需要在manifest.json的可视化界面首页中勾选蒸汽模式。

### 运行注意
- 蒸汽模式要求鸿蒙的最新版本为API 20，即鸿蒙6.0。可在manifest可视化界面鸿蒙配置中设置最低版本。低于目标版本会编译报错。
比如
```
The project's compatibleSdkVersion: 17 cannot be lower than the minimum compatible version 20 required by the dependencies: @dcloudio/uni-app-x-runtime.
```
- 反复差量编译，会打断鸿蒙deveco的Build流程，会出现偶发错误。
    即在deveco制作hap时，有新的差量编译任务进来后，有时候deveco可以正常重编；有时候会报如下错：
```
ninja: error: failed recompaction: Permission denied。
```
    此时需要重新运行一次。（ninja是deveco自带的c++编译器）
- 运行默认是debug模式，性能较差。如果要测试性能，可以选择以release方式运行（在运行弹出的界面可以选择）。release方式运行接近正式打包后的性能，但仍然略微低于正式包。

## 开发注意

对比非蒸汽，蒸汽模式有一些变更调整，有一些待完成TODO，说明如下：

### vue蒸汽模式自身变更
- **仅支持组合式，不支持选项式。这是vue框架自身的新版约束**

    选项式转组合式，AI可以帮忙。hello uni-app x里大量的选项式页面都是用uni-agent转成了组合式，以适配蒸汽模式。详见[uni-agent](https://doc.dcloud.net.cn/uni-app-x/ai/)
- 不再支持mixin

### css
- 变更：因为性能原因，运行时不支持复杂关系选择器，只支持简单的class选择器和分组选择器 [详见](css/common/selector.md)

    替代方案：使用 BEM 命名规范, 通过类名表达层级关系, 例如：`.parent .child` 替换为 `.parent__child`。scss是编译时方案，不影响运行时性能，仍可使用。

- 变更：css的样式隔离策略，仅支持样式隔离策略2.0。它相对于1.0有较大调整 [详见](css/common/style-isolation.md)

    **组件默认不受外部css同名影响，不管是页面还是全局css，外部的同名class默认都不能影响组件样式。**

    如需受外部影响，组件可以在 `<script setup>` 中 defineOptions 中定义 styleIsolation，默认值为：isolated。可以改为  app 或 app-and-page。

### 全局文件
pages.json
- TODO：iOS暂无tabbar，但有独立的[uni-tab组件](./component/uni-ui-x/uni-tab.md)。自定义组件的性能与pages.json中的tabbar没有差别。

### 组件
- 变更：不再支持uts兼容模式组件，仅支持uts标准模式组件，即使用native-view的开发方式。
- 变更：布尔属性规范化。scroll-view等部分组件布尔属性默认值从true改为false。
- 变更：list-view的变化和限制
    * list-view支持vue实例、dom的全面复用，进一步降低内存占用。不再需要之前模板示例中的复用长列表、分批加载长列表。
    * list-item的v-for必须要有:key。否则无法复用。
    * list-view下仅第一个在list-item上的v-for且有:key属性，才支持复用。如果一个list-view下多组list-item各自有v-for，第2个起的v-for并不复用
    * 符合条件能复用的list-item会当做真正的list-item，其他不符合复用条件的list-item都会被编译为view。
    * list-item和list-view需要有编译器能识别的父子关系，否则list-item会被编译成view。即，list-item、list-view不能分别包装在不同的组件内。同时出于性能考虑，最好不要包装这2个组件。
    * list-view不支持横向滚动
    * list-item宽度固定为100%。从css中获取position属性的值固定为absolute。
    * list-item不支持直接以文字节点作为子节点，必须使用text包裹文字内容。
    * list-item不支持设置margin
- 变更：swiper组件的变化
    * 可以通过indicator-class、indicator-active-class自定义默认指示器的样式
    * 可通过 `<template v-slot:indicator>` ，传入自定义的指示器
    * 支持3D轮播
    * swiper-item的position属性的值固定为absolute
    * swiper默认高度为150px。如需根据内容高度撑开，可使用auto-height属性。
- 新增：view、text、image这3个组件的flatten拍平属性

  拍平即不创建独立元素，而是绘制在父上。在审查元素边界时无法看到红框。

  `<view flatten></view>`

  该属性为初始化属性，不支持动态修改。

  被拍平的元素存在一些限制，具体如下，可根据需要设置flatten属性。
  * 拍平的元素无法支持事件（如click、touch）
  * 拍平的元素不支持截图API：takeSnapshot
  * 拍平时如下css不支持：
    + 不支持 [visibility](css/visibility.md)
    + 不支持 [z-index](css/z-index.md)
    + 不支持 [background-image](css/background-image.md)
    + 不支持 [pointer-events](css/pointer-events.md)
    + [box-shadow](css/box-shadow.md) 不支持设置 inset 及 spreadRadius
    + [display](css/display.md) 为 fixed 时显示存在缺陷，无法覆盖其它非 fixed 的元素
  * image组件拍平后无法播放动画，gif、webp动画仅显示第一帧
  * view组件拍平后css属性transform、overflow、display、opacity存在缺陷，如果view存在子元素，这些样式不会对非拍平的子元素产生效果

  注意：当自定义组件的单根节点是（view、text、image）时，该自定义组件会自动支持flatten属性，并将其传递给它的单根节点，如果在不符合要求的自定义组件上使用flatten属性，则会被自动忽略。

### 拍平（flatten）在鸿蒙平台注意事项
支持 flatten属性的组件（如 View、Text、Image）在逻辑上均可设置为 true 以进行“拍平”，但实际性能优化效果需满足以下条件：
`仅当存在至少两个相邻元素同时设置为拍平时，才能提升性能，否则可能导致性能下降。`

相邻元素包括：
- 兄弟节点
  不要求直接紧挨，例如父元素 P 下有 C1、C2、C3 三个子元素，只要其中任意两个或以上设置为拍平，即可带来性能提升。
- 父子节点
  要求直接紧邻，例如 P → C → G 三层结构中：
  + 对 P 和 C、C 和 G，或 P、C、G 同时拍平，可优化性能。
  + 若仅对 P 和 G 拍平（中间隔了 C），则无法优化。
- 混合情况
  只要存在至少两个相邻节点（父子或兄弟）同时拍平，即可获得性能优化。

### API
- TODO：iOS暂无tabbar相关api。需使用uni-tab-bar组件相关属性设置。
- 没有页面下拉刷新及相关生命周期。需要使用scroll-view相关api

#### Element API
- uni.createSelectorQuery 不支持多根节点组件的获取
- TODO：缺少Drawable。dom2的view、text创建足够快且支持拍平，故优先级不高

    在蒸汽模式之前，为了高性能绘制，经常不能使用view和text组件，而是需要通过Drawable对象来绘制线条和文字，这种写法无法跨平台且复杂。\
    在蒸汽模式后，开发者可以正常使用view和text跨平台的开发，比如hello uni-app x的模板中的[日历示例](https://gitcode.com/dcloud/hello-uni-app-x/blob/master/pages/template/calendar-vapor/calendar-vapor.uvue)，之前是Drawable绘制，现在都是拍平的text组件。

其他还有一些差异，见文档的兼容性说明。

## 视图层编译目标 @vapor-render-target

uni-app x 是逻辑层和视图层分离，逻辑层即script内，是uts/js。视图层是`template`和`style`区域。

App平台的蒸汽模式下，视图层有较大的变化。

VDOM模式的视图层是编译为uts/js代码，然后驱动原生渲染。

而蒸汽模式的视图层，把`template`和`style`直接编译为底层c代码对应的机器码/字节码。

根据编译目标不同，App平台的视图层产物分为字节码和机器码两种模式。

### 机器码

机器码模式，是把`template`和`style`编译为优化度非常高的C代码，再经平台编译器编译为机器码运行。

优点：
- 渲染性能高一点点。

缺点：
- 编译速度比字节码模式慢非常多，因为需要编译C代码。大型工程的c++编译是非常非常慢的。
- 开发阶段的差量编译体验差。
- iOS只能在mac电脑上开发。

### 字节码

为了平衡机器码的性能和开发易用性。从5.11起新增了字节码编译模式。字节码也是二进制格式。

优点：
- 编译速度更快。
- 开发阶段支持差量更新。
- 发行后支持 wgt 热更新。（暂未上线）

缺点：
- 渲染性能低于机器码3%左右。由于蒸汽模式比原生快了数倍，所以字节码虽比机器码慢了一点点，但仍快过原生数倍。

正常情况下，使用字节码即可。

因为最初在5.0版上线鸿蒙蒸汽模式时只有机器码，所以目前在鸿蒙上是提供了字节码或机器码2个选项。

而在5.11上线iOS蒸汽模式时，只提供了字节码选项。实测机器码会造成云打包iOS非常非常慢，暂不计划开放。