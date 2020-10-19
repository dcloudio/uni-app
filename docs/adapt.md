### 屏幕适配指南

uni-app是以移动为先的理念诞生的。从uni-app 2.9起，提供了PC等宽屏的适配方案。

PC适配和屏幕适配略有差异。PC适配包含`宽屏适配`和`uni-app内置组件适配PC`两方面的工作。

uni-app内置组件的PC适配，又包括`PC交互习惯的UI调整`和`非webkit浏览器适配`这两部分。这块工作不在本文的讨论范围内，尤其是开发者在PC端可以随意使用普通html元素和组件，不局限于uni-app内置组件。所以本文重点讨论屏幕适配。

uni-app提供的屏幕适配方案，包括3部分：

#### 1. 页面窗体级适配方案：leftWindow、rightWindow、topWindow
以目前手机屏幕为主window，在左右上，可新扩展 leftWindow、rightWindow、topWindow，这些区域可设定在一定屏幕宽度范围自动出现或消失。这些区域各自独立，切换页面支持在各自的window内刷新，而不是整屏刷新。

各个window之间可以交互通信。

这里有2个例子：
- 分栏式的新闻模块：[https://static-7d133019-9a7e-474a-b7c2-c01751f00ca5.bspapp.com/#/](https://static-7d133019-9a7e-474a-b7c2-c01751f00ca5.bspapp.com/#/)，这个示例对应的源码在：[https://github.com/dcloudio/uni-template-news](https://github.com/dcloudio/uni-template-news)
- 分栏式的DCloud社区：[https://static-1afcc27f-ce2f-4a6d-9416-c65a6f87d24e.bspapp.com/#/](https://static-1afcc27f-ce2f-4a6d-9416-c65a6f87d24e.bspapp.com/#/)。这个示例只适配了首页。

以上示例建议使用最新版的chrome、Safari、或firefox访问。可以在PC模式和手机模式分别体验。以上示例源码的运行需使用HBuilderX 2.9+

这些例子特点如下：
- 在宽屏下会新增rightWindow区域，用于显示详情页面，点击左边的列表在右边显示详情内容。而窄屏下仍然是点击列表后新开一个页面显示详情内容。
- rightWindow里的页面是复用的，不需要重写新闻详情页面，支持把已有详情页面当组件放到 rightWindow 页面中。

这套方案是已知的、最便捷的分栏式宽屏应用适配方案。

leftWindow等配置，在pages.json里进行。文档见：[https://uniapp.dcloud.net.cn/collocation/pages?id=topwindow](https://uniapp.dcloud.net.cn/collocation/pages?id=topwindow)

pages.json 配置样例

```json
{
  "globalStyle": {
    
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


- leftWindow等方案的使用教程

如果已经有了一个为小屏设计的uni-app，在使用leftWindow等窗体适配大屏时，需理清一个思路：现有的小屏内容，放在哪个window里？

比如上面的2个例子，都是双栏式窗体，左边列表、右边详情。此时适合的做法是，将原有的小屏列表作为主window，在右边扩展rightWindow来显示详情。

以新闻示例项目为例，预览地址[https://static-7d133019-9a7e-474a-b7c2-c01751f00ca5.bspapp.com/#/](https://static-7d133019-9a7e-474a-b7c2-c01751f00ca5.bspapp.com/#/)。这个项目的源码已经内置于HBuilderX 2.9中，新建uni-app项目时选择新闻/资讯模板。

首先在这个项目的pages.json里，配置一个rightWindow，放置一个新页面right-window.vue。
```json
"rightWindow": {
    "path": "responsive/right-window.vue",
    "style": {
      "width": "calc(100vw - 450px)"
    },
    "matchMedia": {
      "minWidth": 768
    }
  }
```

rightWindow对应的页面不需要重写一遍新闻详情的页面逻辑，只需要引入之前的详情页面组件。

```html
<!--responsive/right-window.vue-->
<template>
  <view>
    <!-- 这里将 /pages/detail/detail.nvue 页面作为一个组件使用 -->
	  <!-- 路径 “/pages/detail/detail” 转为 “pages-detail-detail” 组件 -->
    <pages-detail-detail ref="detailPage"></pages-detail-detail>
  </view>
</template>

<script>
  export default {
    created(e) {
      //监听自定义事件，该事件由详情页列表的点击触发
      uni.$on('updateDetail', (e) => {
        // 执行 detailPage组件，即：/pages/detail/detail.nvue 页面的load方法
        this.$refs.detailPage.load(e.detail);
      })
    },
    onLoad() {},
    methods: {}
  }
</script>
```

然后在新闻列表页面，处理点击列表后与rightWindow交互通信的逻辑。

```js
// pages/news/news-page.nvue
goDetail(detail) {
	if (this._isWidescreen) { //若为宽屏，则触发右侧详情页的自定义事件，通知右侧窗体刷新新闻详情
		uni.$emit('updateDetail', {
			detail: encodeURIComponent(JSON.stringify(detail))
		})
	} else { // 若为窄评，则打开新窗体，在新窗体打开详情页面
		uni.navigateTo({
			url: '/pages/detail/detail?query=' + encodeURIComponent(JSON.stringify(detail))
		});
	}
},

```

可以看到，无需太多工作量，就可以快速把一个为手机窄屏开发的应用，快速适配为PC宽屏应用。并且以后的代码维护，仍然是同一套，当业务迭代时不需要多处升级。

rightWindow适用于分栏式应用，那leftWindow一般用于什么场景？

leftWindow比较适合放置导航页面。如果你的应用首页有很多tab和宫格导航，那么可以把它们重组，放在leftWindow作为导航。之前在手机竖屏上依靠多级tab和宫格导航的场景，可以在leftWindow里通过tree或折叠面板方式导航。

leftWindow除了适用于手机应用适配大屏，也适用于重新开发的PC应用，尤其是PC Admin管理控制台。

这里有一个使用uni-app做PC Admin的例子：[https://github.com/dcloudio/uni-template-admin](https://github.com/dcloudio/uni-template-admin)

目前的leftWindow、rightWindow、topWindow 只支持H5端。计划后续在Pad App上实现该配置。小程序无法支持该配置。


#### 2. 组件级适配方案：match-media组件

leftWindow等方案是页面窗体级适配方案。适于独立的页面。那么在同一个页面中，是否可以适配不同屏宽？当然可以，此时可以使用组件级适配方案。

uni-app提供了 [match-media组件](https://uniapp.dcloud.net.cn/component/match-media) 和配套的 [uni.createMediaQueryObserver](https://uniapp.dcloud.net.cn/api/ui/media-query-observer) 方法。

这是一个媒体查询适配组件，可以更简单的用于动态屏幕适配。

在`match-media`组件中放置内容，并为组件指定一组 media query 媒体查询规则，如屏幕宽度。运行时，如屏幕宽度满足查询条件，这个组件就会被展示，反之则隐藏。

`match-media`组件的优势包括：
1. 开发者能够更方便、显式地使用 Media Query 能力，而不是耦合在 CSS 文件中，难以复用。
2. 能够在模板中结合数据绑定动态地使用，不仅能做到组件的显示或隐藏，在过程式 API 中可塑性更高，例如能够根据尺寸变化动态地添加 class 类名，改变样式。
3. 能够嵌套式地使用 Media Query 组件，即能够满足局部组件布局样式的改变。
4. 组件化之后，封装性更强，能够隔离样式、模版以及绑定在模版上的交互事件，还能够提供更高的可复用性。

它的详细文档参考：[https://uniapp.dcloud.net.cn/component/match-media](https://uniapp.dcloud.net.cn/component/match-media)

当然，开发者也可以继续使用css媒体查询来适配屏幕，或者使用一些类似mobilehide、pcshow之类的css样式。

uni-app的屏幕适配推荐方案是运行时动态适配，而不是为PC版单独条件编译（虽然您也可以通过自定义条件编译来实现单独的PC版）。这样设计的好处是在ipad等设备的浏览器上可以方便的横竖屏切换。

#### 3. 内容缩放拉伸的处理

除了根据屏宽动态显示和隐藏内容，其实还有一大类屏幕适配需求，即：内容不会根据屏宽动态显示隐藏，而是缩放或拉伸。

具体来说，内容适应又有两种细分策略：
1. 局部拉伸：页面内容划分为固定区域和长宽动态适配区域，固定区域使用固定的px单位约定宽高，长宽适配区域则使用flex自动适配。当屏幕大小变化时，固定区域不变，而长宽适配区域跟着变化
2. 等比缩放：根据页面屏幕宽度缩放。rpx其实属于这种类型。在宽屏上，rpx变大，窄屏上rpx变小。

举个实际的例子，比如一个列表页面，左边有一个图标，右边是2行文字。
- 如果使用策略1，即局部拉伸，那么左边的图标部分固定一个宽高，右边的2行文字的大小也固定，但2行文字的宽度自适应，占满屏幕右侧的空间。也就是屏宽宽度变化后，只有2行文字的宽度在变化，其他一切不变。
- 如果使用策略2，即等比缩放，那么整个列表均使用rpx，在宽屏上，图标变大、右边的2行文字变大，列表项行高变大。而在窄屏上，一切又都变小。

策略2省事，设计师按750px屏宽出图，程序员直接按rpx写代码即可。但策略2的实际效果不如策略1好。程序员使用策略1，分析下界面，设定好局部拉伸区域，这样可以有更好的用户体验。

这里需要对rpx的使用特别强调一下。

在移动设备上也有很多屏幕宽度，设计师一般只会按照750px屏幕宽度出图。此时使用rpx的好处在于，各种移动设备的屏幕宽度差异不是很大，相对于750px微调缩放后的效果，尽可能的还原了设计师的设计。

但是，一旦脱离移动设备，在pc屏幕，或者pad横屏状态下，因为屏幕宽度远大于750了。此时rpx根据屏幕宽度变化的结果就严重脱离了预期，大的惨不忍睹。

为此，在uni-app 2.9+起，新增了 rpx 按750px做基准屏宽的生效范围控制，并且将 rpx 的默认最大适配宽度设为了 960 px。

也就是设计师按750px出具的设计图，可适配的最大屏幕宽度为960px，在这个范围内，rpx可以根据屏幕宽度缩放。一旦超过960，rpx再根据屏幕宽度缩放就变的没有意义了。按如下配置，在超过960宽的屏幕上，会按375px作为基准宽度，这是最大程度上保持界面不失真的策略。

当然这些配置您都可以自己定义调整，在 pages.json 的 globeStyle 里配置 rpx 的如下参数。

```json
{
  "globalStyle": {
    "rpxCalcMaxDeviceWidth": 960, // rpx 计算所支持的最大设备宽度，单位 px，默认值为 960
    "rpxCalcBaseDeviceWidth": 375, // rpx 计算使用的基准设备宽度，设备实际宽度超出 rpx 计算所支持的最大设备宽度时将按基准宽度计算，单位 px，默认值为 375
    "rpxCalcIncludeWidth": 750 // rpx 计算特殊处理的值，始终按实际的设备宽度计算，单位 rpx，默认值为 750
  },
}
```

通过上述配置中的前2个，即rpxCalcMaxDeviceWidth和rpxCalcBaseDeviceWidth，即可有效解决使用了rpx后，在宽屏下界面变的奇大无比的问题。如果你不需要特别定义这2个参数的数值，则完全可以不再pages.json配置它们，让它们保持默认的960和375即可。

但是，rpx的最大适配宽度被限定后，会带来一个新问题：如果您的代码中把750rpx当做100%来使用（官方强烈不推荐这种写法，即便是nvue不支持百分比，也应该使用flex来解决撑满问题），此时不管屏幕宽度为多少，哪怕超过了960px，您的预期仍然是要占满整个屏幕宽度，但如果按rpxCalcBaseDeviceWidth的375px的策略执行将不再占满屏宽。

此时您有两种解决方案，一种是修改代码，将里面把rpx当做百分比的代码改掉；另一种是配置rpxCalcIncludeWidth，设置某个特定数值不受rpxCalcMaxDeviceWidth约束。如上述例子中的"rpxCalcIncludeWidth": 750，代表着如果写了 750rpx，始终将按屏幕宽度百分百占满来计算。

- 关于 rpx 转 px

不少开发者之前对rpx的使用过于没有节制，后来为了适配宽屏，想要改用“局部拉伸：页面内容划分为固定区域和长宽动态适配区域”的策略，此时将回归px。

比如[DCloud社区的宽屏适配示例](https://static-1afcc27f-ce2f-4a6d-9416-c65a6f87d24e.bspapp.com/#/)和[新闻模板](https://static-7d133019-9a7e-474a-b7c2-c01751f00ca5.bspapp.com)都没有使用rpx。

如果想把rpx转px，可以在源码里正则替换，也可以使用三方已经写好的单位转换库。下面介绍下三方库的用法。

项目根目录新增文件 `postcss.config.js`，内容如下。则在编译时，编译器会自动转换rpx单位为px。

** 注意：将rpx作为百分比的用法需要手动处理

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

#### 非webkit浏览器适配

uni-app理论上不限定浏览器。在HBuilderX 2.9发版时，就新闻示例项目，在chrome、Safari、firefox、edge的最新版上均测试过，可以正常使用。

一般国内的浏览器，如360浏览器、搜狗浏览器，均支持chrome内核，只要版本够新，应该都可以访问。

如果你的应用在其他PC浏览器下异常，请检查自己代码的浏览器兼容问题。

如果你发现了uni-app框架层面、内置组件有浏览器兼容问题，欢迎在github上给我们提交pr。

一般情况下，只要基础框架没有浏览器兼容问题，那么组件层面的问题也可以通过更换组件来解决。当uni-app编译到PC浏览器端时，支持所有的vue组件，包含那些操作了dom、window的ui库，比如elementUI等。

#### 一个让手机版网页临时可用于pc浏览器的方案

如果你的h5版已经开发完毕，还没来得及适配pc，但想在pc上先用起来。那么可以在pc网页里使用iframe，约定好宽度，在里面套用uni-app的窄屏版。

当然还可以在iframe旁边放置二维码，提供手机版扫码地址。

#### 通过electron打包为windows、mac、linux客户端

有了宽屏适配，uni-app的应用就可以方便的通过electron打包为电脑客户端应用，windows、mac、linux均支持。

开发者可以随意调用electron的API，以调用更多操作系统的能力（为方便多端兼容，可以将这些特殊API写在自定义的条件编译里）

插件市场有已经封装好的一些插件，详见：[https://ext.dcloud.net.cn/search?q=electron](https://ext.dcloud.net.cn/search?q=electron)
