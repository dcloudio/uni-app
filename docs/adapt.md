## 大屏适配指南

目前市面上的用户设备大致可分为小屏的手机端、中屏的平板、大屏的 PC 端三类，而在这三类设备中又会有细小的尺寸差别，也称作屏幕碎片化。

按照一般的适配原则，结合uni-app特点，通常在以下三种情况中需要进行适配：


#### 1. 同一类设备下，尺寸有细微差别

使用 rpx 单位，在尺寸差别不大的情况下对页面布局进行等比缩放。


#### 2. 在允许屏幕旋转的情况下，可分为横屏与竖屏

pages.json 配置 `"pageOrientation": "auto"` 时会允许屏幕旋转，此时可以配置左右窗口页面


#### 3. 不同类设备或者 PC

利用 leftWindow、rightWindow 便能实现更加简单响应式的适配方案

1. 指定 leftWindow 或 rightWindow 页面，根据窗口的宽度或高度自动显示
2. 支持把已有页面当组件放到 leftWindow 或 rightWindow 页面中



2.8.12+  新增了一组过程式与定义式接口 [match-media](https://uniapp.dcloud.net.cn/api/ui/media-query-observer)

开发者可以通过 [`<match-media></match-media>`](https://uniapp.dcloud.net.cn/component/match-media) 和 `uni.createMediaQueryObserver` 来显式地使用媒体查询能力，对于多端适配来说，它有以下优势：

1. 开发者能够更方便、显式地使用 Media Query 能力，而不是耦合在 CSS 文件中，难以复用。
2. 能够在模板中结合数据绑定动态地使用，不仅能做到组件的显示或隐藏，在过程式 API 中可塑性更高，例如能够根据尺寸变化动态地添加 class 类名，改变样式。
3. 能够嵌套式地使用 Media Query 组件，即能够满足局部组件布局样式的改变。
4. 组件化之后，封装性更强，能够隔离样式、模版以及绑定在模版上的交互事件，还能够提供更高的可复用性。


2.8.12+ 

新增 上，左，右窗口配置

**平台差异说明**

|App|H5|微信小程序|支付宝小程序|百度小程序|字节跳动小程序|QQ小程序|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|x|√|x|x|x|x|x|


pages.json 配置

```json
{
  "globalStyle": {
    "rpxCalcMaxDeviceWidth": 960, // rpx 计算所支持的最大设备宽度，单位 px，默认值为 960
    "rpxCalcBaseDeviceWidth": 375, // rpx 计算使用的基准设备宽度，设备实际宽度超出 rpx 计算所支持的最大设备宽度时将按基准宽度计算，单位 px，默认值为 375
    "rpxCalcIncludeWidth": 750 // rpx 计算特殊处理的值，始终按实际的设备宽度计算，单位 rpx，默认值为 750
  },
  "topWindow": {
    "path": "responsive/top-window.vue", // 指定 topWindow 页面文件
    "style": {
      "height": "44px"
    }
  },
  "leftWindow": {
    "path": "responsive/left-window.vue", // 指定 leftWindow 页面文件
    "style": {
      "width": 300
    }
  },
  "rightWindow": {
    "path": "responsive/right-window.vue", // 指定 rightWindow 页面文件
    "style": {
      "width": "calc(100vw - 400px)" // 页面宽度
    },
    "matchMedia": {
      "minWidth": 768 //生效条件，当窗口宽度大于768px时显示
    }
  }
}
```


### 适配注意事项

项目中使用了rpx/upx，适配PC时会遇到显示过大问题

- 配置rpx/upx响应范围

```json
{
  "globalStyle": {
    "rpxCalcMaxDeviceWidth": 960, // rpx 计算所支持的最大设备宽度，单位 px，默认值为 960
    "rpxCalcBaseDeviceWidth": 375, // rpx 计算使用的基准设备宽度，设备实际宽度超出 rpx 计算所支持的最大设备宽度时将按基准宽度计算，单位 px，默认值为 375
    "rpxCalcIncludeWidth": 750 // rpx 计算特殊处理的值，始终按实际的设备宽度计算，单位 rpx，默认值为 750
  },
}
```

- 编译时将rpx/upx转为px，项目根目录新增文件 `postcss.config.js`
** 注意：将rpx/upx作为百分比的用法需要手动处理

```js
// postcss.config.js

const path = require('path')
module.exports = {
  parser: 'postcss-comment',
  plugins: {
    'postcss-import': {
      resolve(id, basedir, importOptions) {
        if (id.startsWith('~@/')) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(3))
        } else if (id.startsWith('@/')) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(2))
        } else if (id.startsWith('/') && !id.startsWith('//')) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(1))
        }
        return id
      }
    },
    'autoprefixer': {
      overrideBrowserslist: ["Android >= 4", "ios >= 8"],
      remove: process.env.UNI_PLATFORM !== 'h5'
    },
    // 借助postcss-px-to-viewport插件，实现rpx转px，文档：https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md
    // 以下配置，可以将rpx转换为1/2的px，如20rpx=10px，如果要调整比例，可以调整 viewportWidth 来实现
    'postcss-px-to-viewport': {
      unitToConvert: 'rpx',
      viewportWidth: 200,
      unitPrecision: 5,
      propList: ['*'],
      viewportUnit: 'px',
      fontViewportUnit: 'px',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: undefined,
      include: undefined,
      landscape: false
    },
    '@dcloudio/vue-cli-plugin-uni/packages/postcss': {}
  }
}
```
