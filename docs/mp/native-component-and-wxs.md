# 小程序自定义组件支持

`uni-app x` 除了支持 uvue 组件之外，也实现了对原生小程序自定义组件的兼容。小程序组件不是 uvue 组件，每家小程序都有自己的组件规范，比如微信小程序的组件是 wxml、wxss ，支付宝小程序是 axml、acss。下面介绍如何在 `uni-app x` 中使用原生小程序自定义组件。

## 创建自定义小程序目录

原生小程序自定义组件需要放在 `uni-app x` 项目 `根路径` 的特定名称目录中，项目结构类似于

<pre v-pre="" data-lang="">
	<code class="lang-" style="padding:0">
┌─wxcomponents                  微信小程序自定义组件存放目录
│   └──custom                   微信小程序自定义组件
│		├─index.js
│		├─index.wxml
│		├─index.json
│		└─index.wxss
├─mycomponents                  支付宝小程序自定义组件存放目录
│   └──custom                   支付宝小程序自定义组件
│		├─index.js
│		├─index.axml
│		├─index.json
│		└─index.acss
├─pages
│  └─index
│		└─index.vue
│
├─static
├─main.ts
├─App.uvue
├─manifest.json
└─pages.json
	</code>
</pre>

目录名可以参考下方表格

| 平台         | 目录名       |
| ------------ | ------------ |
| 微信小程序   | wxcomponents |
| 支付宝小程序 | mycomponents |

此文档要求开发者对各端小程序的**自定义组件**有一定了解，没接触过小程序**自定义组件**的可以参考：

- [微信小程序自定义组件](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/)
- [支付宝小程序自定义组件](https://docs.alipay.com/mini/framework/custom-component-overview)

## 使用组件

在需要使用自定义小程序组件的页面中，添加 `usingComponents` 配置。例如，在微信小程序中：

```json
// pages.json
{
  "pages": [
    {
      "path": "index/index",
      "style": {
        "navigationBarTitleText": "首页",
        "usingComponents": {
          "custom": "/wxcomponents/custom/index"
        }
      }
    }
  ]
}
```

页面使用自定义小程序组件

```html
<template>
  <view>
    <custom :title="title" @change="handleChange"></custom>
  </view>
</template>
<script setup lang="ts">
  const title = ref("自定义组件标题");

  function handleChange() {
    // 处理自定义组件的变化事件
  }
</script>
```

# WXS

WXS 是一套运行在视图层的脚本语言，它的特点是运行在视图层。当需要避免逻辑层和渲染层交互通信折损时，可采用 WXS。

与 WXS 类似，支付宝小程序提供了 SJS，`uni-app x` 也支持使用这些功能，并将它们编译到支付宝小程序端。

**平台差异说明**

| 微信小程序 | 支付宝小程序 |
| :--------: | :----------: |
|    wxs     |     sjs      |

下面介绍如何在 `uni-app x` 中使用 WXS/SJS。

## 创建 WXS/SJS 文件

在微信小程序中，可以通过创建 `.wxs` 文件来定义 WXS 模块。例如，创建 `utils.wxs`：

```javascript
// utils.wxs
module.exports = {
  log: function () {
    console.log("log");
  },
};
```

在支付宝小程序中，可以通过创建 `.sjs` 文件来定义 SJS 模块。例如，创建 `utils.sjs`：

```javascript
// utils.sjs
function log() {
  console.log("log");
}

export default {
  log,
};
```

## 页面使用 WXS/SJS

```html
<template>
  <view>
    <image class="logo" src="/static/logo.png"></image>
    <text class="title">{{title}}</text>
    <button @click="utils.log">打印日志</button>
  </view>
</template>
<!-- #ifdef MP-ALIPAY -->
<script src="./utils.sjs" module="utils" lang="sjs"></script>
<!-- #endif -->
<!-- #ifdef MP-WEIXIN -->
<script src="./utils.wxs" module="utils" lang="wxs"></script>
<!-- #endif -->
<script setup lang="uts">
  const title = ref('标题')
</script>

<style>
  .logo {
    height: 100px;
    width: 100px;
    margin: 100px auto 25px auto;
  }

  .title {
    font-size: 18px;
    color: #8f8f94;
    text-align: center;
  }
</style>
```

## 注意事项

- **【重要】** 编写 wxs、sjs 内容时必须遵循相应语法规范
- **【重要】** `module` 所指定的模块名不可与声明的变量或者函数内的属性重名
- 微信小程序请使用 wxs 规范，[WXS 语法参考文档](https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/)
- 支付宝小程序请使用 sjs 规范，[SJS 语法参考文档](https://docs.alipay.com/mini/framework/sjs)
- 支付宝小程序 sjs 只能定义在 .sjs 文件中，然后使用 `<script>` 标签引入，不支持在 uvue 文件中直接编写
