#### navigation-bar

页面导航条配置节点，用于指定导航栏的一些属性。只能是 [page-meta](https://uniapp.dcloud.io/component/page-meta) 组件内的第一个节点，需要配合它一同使用。

HBuilderX 2.6.3+ 支持

|属性|类型|默认值|必填|说明|最低版本
|:-|:-|:-|:-|:-|:-|
|title|string||否|导航条标题|微信基础库 2.9.0|
|loading|string|false|否|是否在导航条显示 loading 加载提示|微信基础库 2.9.0|
|front-color|string||否|导航条前景颜色值，包括按钮、标题、状态栏的颜色，仅支持 #ffffff 和 #000000|微信基础库 2.9.0|
|background-color|string||否|导航条背景颜色值，有效值为十六进制颜色|微信基础库 2.9.0|
|color-animation-duration|number|0|否|改变导航栏颜色时的动画时长，默认为 0 （即没有动画效果）|微信基础库 2.9.0|
|color-animation-timing-func|string|"linear"|否|改变导航栏颜色时的动画方式，支持 linear 、 easeIn 、 easeOut 和 easeInOut|微信基础库 2.9.0|

**注意**
- `<navigation-bar>` 会覆盖 page.json style 节点配置


#### 示例代码

```
<template>
  <page-meta>
    <navigation-bar
      :title="nbTitle"
      :loading="nbLoading"
      :front-color="nbFrontColor"
      :background-color="nbBackgroundColor"
      :color-animation-duration="2000"
      color-animation-timing-func="easeIn"
    />
  </page-meta>
  <view class="content">
  </view>
</template>

<script>
  export default {
    data() {
      return {
        nbTitle: '标题',
        nbLoading: false,
        nbFrontColor: '#000000',
        nbBackgroundColor: '#ffffff'
      }
    },
    onLoad() {
    },
    methods: {
    }
  }
</script>
```
