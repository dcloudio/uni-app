<!-- ## custom-tab-bar -->

::: sourceCode
## custom-tab-bar
:::

自定义tabBar


### 兼容性 <Help />
| Web | 微信小程序 | 支付宝小程序 | Android | iOS | HarmonyOS |
| :- | :- | :- | :- | :- | :- |
| 4.24 | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> | <a style="color:unset;" href="https://vote.dcloud.net.cn/#/?name=uni-app%20x">x</a> |


### 属性 
| 名称 | 类型 | 兼容性 | 描述 |
| :- | :- |  :-: | :- |
| direction | string | Web: 4.0; 微信小程序: x; 支付宝小程序: x; Android: x; iOS: x | 选项的排列方向 |
| show-icon | boolean | Web: 4.0; 微信小程序: x; 支付宝小程序: x; Android: x; iOS: x | 是否显示icon |
| selected | number | Web: 4.0; 微信小程序: x; 支付宝小程序: x; Android: x; iOS: x | 选中的tabBar选项索引值 |
| @onTabItemTap | (event: [OnTabItemTapOption](#ontabitemtapoption)) => void | Web: 4.0; 微信小程序: x; 支付宝小程序: x; Android: x; iOS: x | 点击自定义 tabBar 触发事件，detail = {index, pagePath, text} |

#### direction 的属性描述

| 合法值 | 兼容性 | 描述 |
| :- |  :-: | :- |
| horizontal | Web: x; 微信小程序: x; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 选项的排列方向水平 |
| vertical | Web: x; 微信小程序: x; 支付宝小程序: x; Android: x; iOS: x; HarmonyOS: x | 选项的排列方向垂直 |



<!-- UTSCOMJSON.custom-tab-bar.component_type -->





### 小程序自定义 tabBar

本页介绍的 `<custom-tab-bar>` 组件仅支持 Web。微信小程序、支付宝小程序提供的平台自定义 tabBar 能力与本组件不同，本页的组件属性和事件不适用于这些平台。

在 uni-app x 项目中，可通过 `pages.json` 配置启用对应平台的自定义 tabBar，并在项目根目录下添加该平台约定的 tabBar 组件目录。

#### 基本结构

```text
├─custom-tab-bar/                // 微信小程序自定义 tabBar
│  ├─index.js                   // 组件数据及交互逻辑
│  ├─index.json                 // 组件配置
│  ├─index.wxml                 // 组件布局
│  └─index.wxss                 // 组件样式
├─customize-tab-bar/             // 支付宝小程序自定义 tabBar
│  ├─index.js
│  ├─index.json
│  ├─index.axml
│  └─index.acss
├─pages/
│  ├─index/
│  │  └─index.uvue
│  └─mine/
│     └─mine.uvue
├─App.uvue
├─main.ts
├─manifest.json
└─pages.json
```

编译器会将对应平台的 tabBar 目录复制到小程序产物中。这两个目录中的文件需按照对应小程序的自定义组件规范编写，不支持使用 `.uvue` 文件。

#### 配置 pages.json

通过条件编译，分别为微信小程序配置 `custom: true`、支付宝小程序配置 `customize: true`：

```jsonc
{
  "pages": [
    {
      "path": "pages/index/index",
      "style": {
        "navigationBarTitleText": "首页"
      }
    },
    {
      "path": "pages/mine/mine",
      "style": {
        "navigationBarTitleText": "我的"
      }
    }
  ],
  "globalStyle": {
    "usingComponents": {}
  },
  "tabBar": {
    // #ifdef MP-WEIXIN
    "custom": true,
    // #endif
    // #ifdef MP-ALIPAY
    "customize": true,
    // #endif
    "color": "#666666",
    "selectedColor": "#007aff",
    "backgroundColor": "#ffffff",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页"
      },
      {
        "pagePath": "pages/mine/mine",
        "text": "我的"
      }
    ]
  }
}
```

#### 编写 tabBar 组件

两个平台的 tabBar 组件 `index.json` 均需声明：

```json
{
  "component": true
}
```

组件的布局、样式和点击切换逻辑需按照对应平台的规范实现。例如，可在组件的 `data` 中维护 `selected` 字段表示选中项索引，根据该字段渲染选中样式；点击选项时，分别通过 `wx.switchTab` 或 `my.switchTab` 切换页面。

注意，这两个特殊目录会直接复制到小程序产物中，其中的代码不会作为 `.uvue` 组件编译，应使用对应平台的 API。

#### 同步选中态

每个 tabBar 页面的自定义 tabBar 组件实例相互独立。页面显示时，应获取当前页面的 tabBar 实例并更新选中态，避免切换页面后高亮状态不一致。

下面约定 tabBar 组件的 `data` 中已声明 `selected` 字段。页面使用 `<script setup>`，在 setup 阶段获取页面实例，在每次 `onShow` 时将选中态更新为 `0`：

```html
<!-- pages/index/index.uvue -->
<template>
  <view>
    <text>首页</text>
  </view>
</template>

<script setup lang="ts">
const instance = getCurrentInstance()

function syncTabBar() {
  // #ifdef MP-WEIXIN || MP-ALIPAY
  const scope = (instance?.proxy as any)?.$scope
  if (scope == null || typeof scope.getTabBar !== 'function') {
    return
  }
  const tabBar = scope.getTabBar()
  if (tabBar != null) {
    tabBar.setData({ selected: 0 })
  }
  // #endif
}

onShow(() => {
  syncTabBar()
})
</script>
```

`pages/mine/mine.uvue` 使用相同的处理方式，将 `selected` 更新为 `1`。页面中无需手动放置 `<custom-tab-bar>` 组件。

#### 微信小程序注意事项

- 基础库 2.5.0 起支持自定义 tabBar，低版本需做兼容处理。
- 应完整声明 `tabBar` 配置，用于识别 tabBar 页面及兼容低版本。这些配置不参与自定义 tabBar 的渲染，外观需由自定义组件实现。
- 自定义模式下，`wx.setTabBarItem` 等与 tabBar 样式相关的接口失效，需通过自定义组件控制显示效果。

详见 [微信小程序自定义 tabBar 文档](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/custom-tabbar.html)。

#### 支付宝小程序注意事项

- 需要基础库 2.7.20、支付宝客户端 10.2.63、小程序开发者工具 3.1.2 及以上版本。低版本显示原始 tabBar，建议完整保留 `tabBar` 配置。
- 注意配置字段为 `customize`，目录名为 `customize-tab-bar`，与微信小程序不同。
- 自定义模式下，`my.hideTabBar` 等与 tabBar 样式相关的接口失效，需通过自定义组件控制显示效果。

详见 [支付宝小程序自定义 tabBar 文档](https://opendocs.alipay.com/mini/03jry7)。


### 参见
- [相关 Bug](https://issues.dcloud.net.cn/?mid=component.page-meta.custom-tab-bar)
- [参见uni-app相关文档](https://uniapp.dcloud.io/component/custom-tab-bar.html)
- [微信小程序文档](https://developers.weixin.qq.com/doc/search.html?source=enter&query=custom-tab-bar&doc_type=miniprogram)
- [支付宝小程序文档](https://open.alipay.com/portal/zhichi/search?keyword=custom-tab-bar&pageIndex=1&pageSize=10&source=doc_top&type=all)
- [百度小程序文档](https://smartprogram.baidu.com/forum/search?query=custom-tab-bar&scope=devdocs&source=docs)
- [抖音小程序文档](https://developer.open-douyin.com/search-page?keyword=custom-tab-bar&secondType=all&type=1)
- [飞书小程序文档](https://open.feishu.cn/search?from=header&page=1&pageSize=10&q=custom-tab-bar&topicFilter=)
- [钉钉小程序文档](https://open.dingtalk.com/search?keyword=custom-tab-bar)
- [QQ小程序文档](https://q.qq.com/wiki/develop/miniprogram/frame/)
- [快手小程序文档](https://developers.kuaishou.com/page?keyword=custom-tab-bar&from=docs)
- [京东小程序文档](https://mp-docs.jd.com/doc/dev/framework/-1)
- [华为快应用文档](https://developer.huawei.com/consumer/cn/doc/quickApp-References/webview-frame-overview-0000001124793625)
- [360小程序文档](https://mp.360.cn/doc/miniprogram/dev/#/b770a184ff1f06c6b3393a0fd1132380)
