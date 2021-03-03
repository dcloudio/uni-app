#### custom-tab-bar

自定义tabBar组件。

在小程序和App端，为提升性能，在 `pages.json` 里配置固定的原生tabBar。但在H5端，这一设计并不会提升性能。

同时，H5端尤其是PC宽屏，对tabBar的位置和样式有更灵活的需求，tabBar作为一级导航，更多的时候是在PC网页顶部而不是底部。

自定义tabBar组件应需而生，它仍然读取 `pages.json` 里配置的tabBar信息，但这个组件可以自定义摆放的位置，可以灵活的配置各种css。

该组件支持 ``pages.json`` 中 ``tabBar`` 相关配置（兼容性和 H5 保持一致）， 其中不支持 ``borderStyle`` 配置。

该组件支持所有 ``tabBar`` 相关 API，例如设置 tab 徽标、显示红点、以及 switchTab 等。

**平台兼容性**

__仅 H5 支持__，HBuilderX 2.9.9 + 。

**属性说明**

|属性名|类型|默认值|说明|
|:-|:-|:-|:-|
|direction|String|horizontal|选项的排列方向 可选值：horizontal，vertical|
|show-icon|Boolean|false|是否显示icon|
|selected|Number|0|选中的tabBar选项索引值|
|onTabItemTap|EventHandle||点击事件，参数为Object，具体见下表|

``onTabItemTap`` 参数说明：

|属性|类型|说明|
|---|---|---|
|index|String|被点击tabItem的序号，从0开始|
|pagePath|String|被点击tabItem的页面路径|
|text|String|被点击tabItem的按钮文字|

本组件无需配置 tabBar 的 list，每个 tabItem 仍然从 `pages.json` 中读取。避免多端编写重复代码。

**示例**

在`hello uni-app`中，在 topWindow 中放置自定义tabBar组件，将页面一级导航放置在网页顶部。

```html
<!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中的 top-window 查看 -->
<template>
    <view>
        <custom-tab-bar direction="horizontal" :show-icon="false" :selected="selected" @onTabItemTap="onTabItemTap" />
    </view>
</template>
```

示例体验：使用PC浏览器打开[https://hellouniapp.dcloud.net.cn/](https://hellouniapp.dcloud.net.cn/)

源码获取：HBuilderX 2.9.9+起新建uni-app项目，选择hello uni-app模板。

展现效果见下方截图：

custom-tab-bar 水平布局（horizontal）：

![uniapp](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/5dc930c0-2580-11eb-8a36-ebb87efcf8c0.png)

custom-tab-bar 竖直布局（vertical）：

![uniapp](https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-dc-site/b3b68450-2595-11eb-880a-0db19f4f74bb.png)
