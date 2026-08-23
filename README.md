<p>简体中文 | <a href="./README_en-US.md">English</a></p>

`uni-app`是一个使用 [Vue.js](https://vuejs.org/) 开发所有前端应用的框架，开发者编写一套代码，可发布到iOS、Android、鸿蒙、Web（响应式）、以及各种小程序（微信/支付宝/百度/抖音/飞书/QQ/快手/钉钉/淘宝/京东/小红书）、快应用、鸿蒙元服务等多个平台。

`DCloud`公司拥有上千万开发者、数百万应用、几十亿手机端月活用户、数万款uni-app插件，开发者可以放心选择。

`uni-app`分 `uni-app` 和 `uni-app x`。

- uni-app：老一代uni-app，App引擎采用与小程序相同的技术架构，逻辑层使用js，渲染层使用web-view。
- uni-app x：新一代 uni-app，也是本项目的主分支。蒸汽模式支持使用js/ts/uts开发页面，App平台使用原生渲染，但拥有比原生view体系更优秀的渲染性能。

1. 在view和text组件性能测试中，uni-app x 在Android、iOS、鸿蒙 3个App平台的渲染速度是原生的2~3倍。
2. 在长列表掉帧测试中，uni-app x 的长列表帧率，在Android、iOS、鸿蒙 3个App平台，是原生的2~4倍。

除了view、text、list，还有更多评测内容，详见benchmark目录下的3个平台的评测报告。
- [uni-app x Android平台性能评测报告](https://github.com/dcloudio/uni-app/benchmark/vapor-benchmark-android.md)
- [uni-app x iOS平台性能评测报告](https://github.com/dcloudio/uni-app/benchmark/vapor-benchmark-ios.md)
- [uni-app x 鸿蒙平台性能评测报告](https://github.com/dcloudio/uni-app/benchmark/vapor-benchmark-harmony.md)

uts是一门类ts的、跨平台的语言。uts在Android平台编译为kotlin、在iOS平台编译为swift、在鸿蒙next平台上编译为ArkTS、在Web和小程序平台编译为js。uts语言主要用于原生插件扩展。

`uni-app`在手，做啥都不愁。不管用户需要做哪个平台的项目，你都可以快速交付，不需要转换开发思维、不需要更改开发习惯。

即使不跨端，`uni-app`也是更好的小程序开发框架、更好的App开发框架、更方便的Web开发框架。
- 更好的小程序框架：vue的通用性、生态，比小程序厂商自定语法要好的多。
- 更好的App框架：vue的模板写法，是一种AI熟悉的、简单而成熟的声明式写法。比如原生的命令式写法的开发效率高的多，而原生提供的声明式写法又性能不佳。在AI时代，由于声明式的约束，让AI犯错的机会也少的多、消耗的token也少的多。

`uni-app`是一个AI友好的技术框架，使用AI擅长的vue、js/ts、css即可完成应用开发。`uni-app`还为AI模型训练提供了强化学习工具，[详见](https://doc.dcloud.net.cn/uni-app-x/ai/cli-for-aimodel.html)。同时DCloud公司提供了[uni-agent](https://doc.dcloud.net.cn/uni-app-x/ai/)，可以更方便的使用AI开发`uni-app`

## 快速体验

<div class="quick">
    <!-- <h3 id="快速体验"><a href="/README?id=%e5%bf%ab%e9%80%9f%e4%bd%93%e9%aa%8c" data-id="快速体验" class="anchor"><span>快速体验</span></a></h3> -->
    <image src="https://web-ext-storage.dcloud.net.cn/doc/uni_app_qrcode.png" alt="hello uni-app x 示例效果图"/>
    <p>注：<br/>
        <em>- 某些平台不能提交简单demo，故补充了一些其他功能；hello uni-app (x)示例代码可从 <a href="https://github.com/dcloudio/hello-uniapp">github</a> 获取</em></br>
        <em>- 快应用仅支持 vivo 、oppo、华为</em></br>
    </p>
</div>

## 仓库介绍

uni-app x 分支，为 uni-app x 版本的开源仓库。

uni-app，分 vue2 和 vue3，分支分别是：uni-app-vue2、uni-app-vue3。

uni-app x分支目录说明：
- benchmark 目录下为性能评测报告
- docs 目录为文档
- examples 目录为示例项目
- src 目录为源码
- test 目录为测试例
- CHANGELOG.md 为更新日志

## 一套代码，运行到多个平台

`uni-app`实现了一套代码，同时运行到多个平台；如下图所示，一套代码，同时运行到iOS模拟器、Android模拟器、web、微信开发者工具、支付宝小程序Studio、百度开发者工具、抖音开发者工具、QQ开发者工具（底部每个终端选项卡，代表1个终端模拟器）：

![](https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/dev1x8.jpg)

实际运行效果如下（点击图片可放大）：

![](https://web-ext-storage.dcloud.net.cn/doc/uni-app-multiport-202478.png)
