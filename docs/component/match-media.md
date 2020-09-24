#### match-media

media query 匹配检测节点。

类似于网页开发中使用媒体查询来适配大屏小屏，match-media是一个可适配不同屏幕的基本视图组件。可以指定一组 media query 媒体查询规则，满足查询条件时，这个组件才会被展示。

例如在match-media组件中放置一个侧边栏，媒体查询规则设置为宽屏才显示，就可以实现在PC宽屏显示该侧边栏，而在手机窄屏中不显示侧边栏的效果。

> 从 HBuilderX 2.9+ 版本开始支持

**属性说明**

|属性名|类型|默认值|必填|说明|
|:-|:-|:-|:-|:-|
|min-width|number||否|页面最小宽度（ px 为单位）|
|max-width|number||否|页面最大宽度（ px 为单位）|
|width|number||否|页面宽度（ px 为单位）|
|min-height|number||否|页面最小高度（ px 为单位）|
|max-height|number||否|页面最大高度（ px 为单位）|
|height|number||否|页面高度（ px 为单位）|
|orientation|string||否|屏幕方向（ landscape 或 portrait ）|

> 平台差异说明: 小程序非微信端，不支持屏幕动态改变

**match-media 示例**

以下示例代码，推荐使用HBuilderX，新建uni-app项目，可直接体验完整示例。
```html

<template>
    <view>
        <match-media :min-width="375" :max-width="800" orientation="portrait">
            <view>当页面最小宽度 375， 页面宽度最大 800，且屏幕方向时显示</view>
        </match-media>

        <match-media :min-height="400" :orientation="landscape">
            <view>当页面高度不小于 400 px 且屏幕方向为纵向时展示这里</view>
        </match-media>
    </view>
</template>
```
