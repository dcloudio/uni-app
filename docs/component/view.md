#### view

视图容器。

**属性说明**

|属性名|类型|默认值|说明|
|:-|:-|:-|:-|
|hover-class|String|none|指定按下去的样式类。当 hover-class="none" 时，没有点击态效果|
|hover-stop-propagation|Boolean|false|指定是否阻止本节点的祖先节点出现点击态|
|hover-start-time|Number|50|按住后多久出现点击态，单位毫秒|
|hover-stay-time|Number|400|手指松开后点击态保留时间，单位毫秒|

**示例** [查看演示](https://uniapp.dcloud.io/h5/pages/component/view/view)
 
```html
<template>
    <view>
        <view class="uni-padding-wrap uni-common-mt">
            <view class="uni-title uni-common-mt">
                flex-direction: row
                <text>\n横向布局</text>
            </view>
            <view class="uni-flex uni-row">
                <view class="flex-item uni-bg-red">A</view>
                <view class="flex-item uni-bg-green">B</view>
                <view class="flex-item uni-bg-blue">C</view>
            </view>
            <view class="uni-title uni-common-mt">
                flex-direction: column
                <text>\n纵向布局</text>
            </view>
            <view class="uni-flex uni-column">
                <view class="flex-item flex-item-V uni-bg-red">A</view>
                <view class="flex-item flex-item-V uni-bg-green">B</view>
                <view class="flex-item flex-item-V uni-bg-blue">C</view>
            </view>
        </view>
    </view>
</template>
```
 
![uniapp](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/img/view.png)
 
**Tips**

- 如果需要使用滚动视图，请使用 [scroll-view](/component/scroll-view)
- 如果使用 `<div>` 组件编译时会被转换为 `<view>`。