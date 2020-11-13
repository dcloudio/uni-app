#### custom-tab-bar

自定义tabBar。

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

**示例**

如下为`hello uni-app`中的源码示例，展现效果见下方截图：

```html
<!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中查看 -->
<template>
    <view>
        <custom-tab-bar direction="horizontal" :show-icon="false" :selected="selected" @onTabItemTap="onTabItemTap" />
    </view>
</template>
```

![uniapp](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/5dc930c0-2580-11eb-8a36-ebb87efcf8c0.png)

**Tips**

- 该组件目前支持 ``pages.json`` 中 ``tabBar`` 相关配置， 其中不支持 ``borderStyle`` 配置
- 该组件支持所有 ``tabBar`` 相关 API
