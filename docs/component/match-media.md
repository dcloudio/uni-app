#### match-media

media query 匹配检测节点。

可以指定一组 media query 规则，满足时，这个节点才会被展示。
通过这个节点可以实现“页面宽高在某个范围时才展示某个区域”这样的效果。

**属性说明**

|属性名|类型|默认值|必填|说明|平台差异说明|
|:-|:-|:-|:-|:-|:-|
|min-width|number||否|页面最小宽度（ px 为单位）||
|max-width|number||否|页面最大宽度（ px 为单位）||
|width|number||否|页面宽度（ px 为单位）||
|min-height|number||否|页面最小高度（ px 为单位）||
|max-height|number||否|页面最大高度（ px 为单位）||
|height|number||否|页面高度（ px 为单位）||
|orientation|string||否|屏幕方向（ landscape 或 portrait ）||

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
