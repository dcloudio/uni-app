# pages.json

`pages.json` 文件是 uni-app x 的页面管理配置文件，决定**应用的首页**、页面文件的路径、窗口样式、原生的导航栏、底部的原生tabbar 等。

**所有页面，均需在pages.json中注册，否则不会被打包到应用中。**

在HBuilderX中新建页面，默认会在pages.json中自动注册。在HBuilderX中删除页面文件，也会在状态栏提示从pages.json中移除注册。

除了管理页面，pages.json支持对页面进行特殊配置，比如应用首页的tabbar、每个页面的顶部导航栏设置。

但这些uni-app中设计的功能，主要是为了解决页面由webview渲染带来的性能问题，由原生提供一些配置来优化。

uni-app x的app平台，页面不再由webview渲染，其实不需要原生提供特殊配置来优化。但为了开发的便利和多端的统一，也支持了tabbar和导航栏设置。\
但不再支持uni-app的app-plus专用配置以及tabbar的midbutton。

导航栏高度为 44px (不含状态栏)，tabBar 高度为 50px (不含安全区)。

如pages.json中配置的导航栏和tabbar功能无法满足你的需求，可以不在pages.json中配置，自己用view做导航栏和tabbar。\
hello uni-app x有相关示例，参考：
- 自定义导航栏：[插件地址](https://ext.dcloud.net.cn/plugin?id=14618)
- 自定义tabbar：[源码参考](https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/pages/template/custom-tab-bar/custom-tab-bar.uvue)；注意事项[见下](#pages-tabbar)
插件市场也有其他封装好的插件，请自行搜索。

## 配置项列表

<!-- PAGESJSON.pages.description -->

| 属性 | 类型 | 默认值 | 必填 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- | :- |
| globalStyle | [globalStyle 配置项列表](#pages-globalstyle) | - | 否 | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 默认页面的窗口表现 |
| pages | Array\<[PagesOptionsPage](#pagesoptionspage)> | - | 是 | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 页面路径及窗口表现 |
| tabBar | [tabBar 配置项列表](#pages-tabbar) | - | 否 | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 底部 tab 的表现 |
| topWindow | [topWindow 配置项列表](#pages-topwindow) | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 上窗体 |
| leftWindow | [leftWindow 配置项列表](#pages-leftwindow) | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 左窗体 |
| rightWindow | [rightWindow 配置项列表](#pages-rightwindow) | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 右窗体 |
| condition | [condition 配置项列表](#pages-condition) | - | 否 | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 启动模式 |
| subPackages | Array\<[PagesSubPackages](#pagessubpackages)> | - | 否 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 分包加载配置 |
| preloadRule | [preloadRule 配置项列表](#pages-preloadrule) | - | 否 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 声明分包预下载的规则 |
| workers | string | - | 否 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 使用 Worker 处理多线程任务时，设置 Worker 代码放置的目录 |
| easycom | [easycom 配置项列表](#pages-easycom) | - | 否 | Web: 4.0; 微信小程序: √; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 组件自动引入规则 |
| uniIdRouter | [uniIdRouter 配置项列表](#pages-uniidrouter) | - | 否 | Web: 4.0; 微信小程序: 4.41; Android: 3.99; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 根据用户登录状态、页面是否要求登录、以及接口返回的用户token验证状态自动跳转登录页面。详细教程：[详见](https://doc.dcloud.net.cn/uniCloud/uni-id/summary.html#uni-id-router) |
| entryPagePath | string | - | 否 | Web: x; 微信小程序: √; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 默认启动首页 |

<!-- PAGESJSON.pages.compatibility -->

### globalStyle 配置项列表 @pages-globalstyle

globalStyle节点里是所有页面都生效的全局样式配置。它的配置与页面级style基本相同，但优先级低于页面级style配置。

默认页面的窗口表现

| 属性 | 类型 | 默认值 | 必填 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- | :- |
| navigationBarBackgroundColor | string ([string.ColorString](/uts/data-type.md#ide-string)) | `app`: #F8F8F8<br/>`web`: #F8F8F8<br/>`mp-weixin、mp-qq、mp-baidu、mp-toutiao、mp-lark、mp-jd`: #000000<br/>`mp-alipay、mp-kuaishou`: #ffffff | 否 | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 导航栏背景颜色（同状态栏背景色） |
| navigationBarTextStyle | string ([string.ThemeJsonString](/uts/data-type.md#ide-string)) | "black" | 否 | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 导航栏标题颜色，仅支持 black/white（支付宝小程序不支持，请使用 [my.setNavigationBar](https://opendocs.alipay.com/mini/api/xwq8e6)）。 |
| navigationBarTitleText | string | - | 否 | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 导航栏标题文字内容 |
| navigationStyle | 'default' \| 'custom' | "default" | 否 | Web: 4.0; 微信小程序: √; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 导航栏样式，仅支持 default/custom。custom即取消默认的原生导航栏，需看[使用注意](https://uniapp.dcloud.net.cn/collocation/pages.html#customnav)。 |
| backgroundColor | string ([string.ColorString](/uts/data-type.md#ide-string)) | "#ffffff" | 否 | Web: x; 微信小程序: 4.41; Android: 3.99; iOS: 4.18; HarmonyOS: -; HarmonyOS(Vapor): - | 下拉刷新显示出来的窗口的背景色（无下拉刷新时，此颜色无效果） |
| backgroundColorContent | string ([string.ColorString](/uts/data-type.md#ide-string)) | "#ffffff" | 否 | Web: 4.11; 微信小程序: 4.41; Android: 4.0; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 页面容器背景色 |
| backgroundTextStyle | string ([string.ThemeJsonString](/uts/data-type.md#ide-string)) | "dark" | 否 | Web: x; 微信小程序: 4.41; Android: 4.31; iOS: 4.31; HarmonyOS: -; HarmonyOS(Vapor): - | 下拉 loading 的样式，仅支持 dark / light |
| enablePullDownRefresh | boolean | false | 否 | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 是否开启下拉刷新，详见[页面生命周期](https://doc.dcloud.net.cn/uni-app-x/page.html)。 |
| onReachBottomDistance | number | 50 | 否 | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 页面上拉触底事件触发时距页面底部距离，单位只支持px，详见[页面生命周期](https://doc.dcloud.net.cn/uni-app-x/page.html)。 |
| backgroundColorTop | string ([string.ColorString](/uts/data-type.md#ide-string)) | "#ffffff" | 否 | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 顶部窗口的背景色(bounce回弹区域), 仅 iOS 平台 |
| backgroundColorBottom | string ([string.ColorString](/uts/data-type.md#ide-string)) | "#ffffff" | 否 | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 底部窗口的背景色(bounce回弹区域), 仅 iOS 平台 |
| titleImage | string ([string.ImageURIString](/uts/data-type.md#ide-string)) | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 导航栏图片地址（替换当前文字标题），支付宝小程序内必须使用https的图片链接地址 |
| transparentTitle | 'always' \| 'auto' \| 'none' | "none" | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 导航栏整体（前景、背景）透明设置。支持 always 一直透明 / auto 滑动自适应 / none 不透明 |
| titlePenetrate | 'YES' \| 'NO' | "NO" | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 导航栏点击穿透 |
| pageOrientation | 'auto' \| 'portrait' \| 'landscape' | "portrait" | 否 | Web: x; 微信小程序: 4.41; Android: 4.13; iOS: 4.25; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 横屏配置，屏幕旋转设置，仅支持 auto / portrait / landscape 详见 [响应显示区域变化](https://uniapp.dcloud.net.cn/collocation/pages.html#globalstyle)。 |
| hideStatusBar | boolean | false | 否 | Web: x; 微信小程序: x; Android: 4.31; iOS: 4.33; HarmonyOS: 4.61; HarmonyOS(Vapor): - | 是否隐藏系统顶部状态栏 |
| hideBottomNavigationIndicator | boolean | false | 否 | Web: x; 微信小程序: x; Android: 4.31; iOS: 4.33; HarmonyOS: -; HarmonyOS(Vapor): - | 是否隐藏系统底部导航栏 |
| androidThreeButtonNavigationTranslucent | boolean | false | 否 | Web: x; 微信小程序: x; Android: 4.41; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 页面内容是否可以渲染到虚拟按键区域 |
| androidThreeButtonNavigationBackgroundColor | string ([string.ColorString](/uts/data-type.md#ide-string)) | - | 否 | Web: x; 微信小程序: x; Android: 4.51; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 虚拟按键区域背景色 |
| androidThreeButtonNavigationStyle | string ([string.ThemeJsonString](/uts/data-type.md#ide-string)) | - | 否 | Web: x; 微信小程序: x; Android: 4.61; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 虚拟按键区域前景色 |
| animationType | 'slide-in-right' \| 'slide-in-left' \| 'slide-in-top' \| 'slide-in-bottom' \| 'fade-in' \| 'zoom-out' \| 'zoom-fade-out' \| 'pop-in' | "pop-in" | 否 | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 窗口显示的动画效果，详见：[窗口动画](https://uniapp.dcloud.net.cn/api/router.html#animation)。 |
| animationDuration | number | 300 | 否 | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 窗口显示动画的持续时间，单位为 ms |
| allowsBounceVertical | 'YES' \| 'NO' | "YES" | 否 | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 是否允许向下拉拽。默认 YES。如果需要下拉刷新，值必须为YES |
| usingComponents | object | - | 否 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 引用小程序组件，参考 [小程序组件](https://uniapp.dcloud.net.cn/tutorial/miniprogram-subject.html)。 |
| renderingMode | string | - | 否 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 同层渲染，webrtc(实时音视频) 无法正常时尝试配置 seperated 强制关掉同层 |
| leftWindow | boolean | true | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 当存在 leftWindow时，默认是否显示 leftWindow |
| topWindow | boolean | true | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 当存在 topWindow时，默认是否显示 topWindow |
| rightWindow | boolean | true | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 当存在 rightWindow时，默认是否显示 rightWindow |
| rpxCalcMaxDeviceWidth | number | 960 | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | rpx 计算所支持的最大设备宽度，单位 px |
| rpxCalcBaseDeviceWidth | number | 375 | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | rpx 计算使用的基准设备宽度，设备实际宽度超出 rpx 计算所支持的最大设备宽度时将按基准宽度计算，单位 px |
| rpxCalcIncludeWidth | number | 750 | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | rpx 计算特殊处理的值，始终按实际的设备宽度计算，单位 rpx |
| dynamicRpx | boolean | false | 否 | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 动态 rpx，屏幕大小变化会重新渲染 rpx |
| maxWidth | number | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 单位px，当浏览器可见区域宽度大于maxWidth时，两侧留白，当小于等于maxWidth时，页面铺满；不同页面支持配置不同的maxWidth；maxWidth = leftWindow(可选)+page(页面主体)+rightWindow(可选) |
| enableUcssReset | boolean | true | 否 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 是否启用ucss样式覆盖 |
| app-plus | [app-plus 配置项列表](#globalstyle-app-plus) | - | 否 | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 5+ App 特有配置 |
| h5 | [h5 配置项列表](#globalstyle-h5) | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | H5 特有配置 |
| mp-alipay | [mp-alipay 配置项列表](#globalstyle-mp-alipay) | - | 否 | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 支付宝小程序特有配置 |
| mp-weixin | [mp-weixin 配置项列表](#globalstyle-mp-weixin) | - | 否 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 微信小程序特有配置 |
| mp-baidu | [mp-baidu 配置项列表](#globalstyle-mp-baidu) | - | 否 | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 百度小程序特有配置 |
| mp-toutiao | object | - | 否 | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 头条小程序特有配置 |
| mp-qq | object | - | 否 | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | QQ小程序特有配置 |
| mp-kuaishou | object | - | 否 | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 快手小程序特有配置 |
| mp-jd | object | - | 否 | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 设置编译到 mp-jd 平台的特定样式 |
| mp-lark | object | - | 否 | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 飞书小程序特有配置 |

<!-- PAGESJSON.pages_globalStyle.compatibility -->

#### h5 配置项列表 @globalstyle-h5

H5 特有配置

| 属性 | 类型 | 默认值 | 必填 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- | :- |
| titleNView | [titleNView 配置项列表](#h5-titlenview) | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 导航栏设置 |
| pullToRefresh | [pullToRefresh 配置项列表](#h5-pulltorefresh) | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 下拉刷新 |

<!-- PAGESJSON.globalStyle_h5.compatibility -->

##### titleNView 配置项列表 @h5-titlenview

导航栏设置

| 属性 | 类型 | 默认值 | 必填 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- | :- |
| backgroundColor | string ([string.ColorString](/uts/data-type.md#ide-string)) | "#f7f7f7" | 否 | - | 背景颜色，颜色值格式为"#RRGGBB"。 |
| buttons | array | - | 否 | - | 自定义按钮，参考 [buttons](https://uniapp.dcloud.net.cn/collocation/pages.html?id=h5-titlenview-buttons)。 |
| titleColor | string ([string.ColorString](/uts/data-type.md#ide-string)) | "#000000" | 否 | - | 标题文字颜色 |
| titleText | string | - | 否 | - | 标题文字内容 |
| titleSize | string | - | 否 | - | 标题文字字体大小 |
| type | 'defaultValue' \| 'transparent' | "defaultValue" | 否 | - | 导航栏样式。"default"-默认样式；"transparent"-透明渐变。 |
| searchInput | object | - | 否 | - | 导航栏上的搜索框样式，详见：[searchInput](https://uniapp.dcloud.net.cn/collocation/pages.html?id=h5-searchinput)。 |

<!-- PAGESJSON.h5_titleNView.compatibility -->

##### pullToRefresh 配置项列表 @h5-pulltorefresh

下拉刷新

| 属性 | 类型 | 默认值 | 必填 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- | :- |
| support | boolean | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 是否开启窗口的下拉刷新功能 |
| color | string ([string.ColorString](/uts/data-type.md#ide-string)) | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 颜色值格式为"#RRGGBB"，仅"circle"样式下拉刷新支持此属性。 |
| type | 'defaultValue' \| 'circle' | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 下拉刷新控件样式 |
| height | string | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 窗口的下拉刷新控件进入刷新状态的拉拽高度。支持百分比，如"10%"；像素值，如"50px"。 |
| range | string | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 窗口可下拉拖拽的范围。支持百分比，如"10%"；像素值，如"50px"。 |
| offset | string | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 下拉刷新控件的起始位置。仅对"circle"样式下拉刷新控件有效，用于定义刷新控件下拉时的起始位置。支持百分比，如"10%"；像素值，如"50px"。 |
| contentdown | [contentdown 配置项列表](#pulltorefresh-contentdown) | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 在下拉可刷新状态时下拉刷新控件显示的内容 |
| contentover | [contentover 配置项列表](#pulltorefresh-contentover) | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 在释放可刷新状态时下拉刷新控件显示的内容 |
| contentrefresh | [contentrefresh 配置项列表](#pulltorefresh-contentrefresh) | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 在正在刷新状态时下拉刷新控件显示的内容 |

<!-- PAGESJSON.h5_pullToRefresh.compatibility -->


###### contentdown 配置项列表 @pulltorefresh-contentdown

在下拉可刷新状态时下拉刷新控件显示的内容

| 属性 | 类型 | 默认值 | 必填 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- | :- |
| caption | string | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 下拉刷新控件上显示的标题内容 |

<!-- PAGESJSON.pullToRefresh_contentdown.compatibility -->


###### contentover 配置项列表 @pulltorefresh-contentover

在释放可刷新状态时下拉刷新控件显示的内容

| 属性 | 类型 | 默认值 | 必填 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- | :- |
| caption | string | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 下拉刷新控件上显示的标题内容 |

<!-- PAGESJSON.pullToRefresh_contentover.compatibility -->

###### contentrefresh 配置项列表 @pulltorefresh-contentrefresh

在正在刷新状态时下拉刷新控件显示的内容

| 属性 | 类型 | 默认值 | 必填 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- | :- |
| caption | string | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 下拉刷新控件上显示的标题内容 |

<!-- PAGESJSON.pullToRefresh_contentrefresh.compatibility -->


#### mp-weixin 配置项列表 @globalstyle-mp-weixin

微信小程序特有配置

| 属性 | 类型 | 默认值 | 必填 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- | :- |
| homeButton | boolean | false | 否 | - | 在非首页、非页面栈最底层页面或非tabbar内页面中的导航栏展示home键 |
| backgroundColorTop | HexColor | "#ffffff" | 否 | - | 顶部窗口的背景色，仅 iOS 支持 |
| backgroundColorBottom | HexColor | "#ffffff" | 否 | - | 顶部窗口的背景色，仅 iOS 支持 |
| restartStrategy | 'homePage' \| 'homePageAndLatestPage' | "homePage" | 否 | - | 重新启动策略配置。支持 homePage / homePageAndLatestPage |
| initialRenderingCache | 'static' \| 'dynamic' | - | 否 | - | 页面初始渲染缓存配置。支持 static / dynamic |
| visualEffectInBackground | 'none' \| 'hidden' | "none" | 否 | - | 切入系统后台时，隐藏页面内容，保护用户隐私。支持 hidden / none |
| handleWebviewPreload | 'static' \| 'manual' \| 'none' | "static" | 否 | - | 控制预加载下个页面的时机。支持 static / manual / auto |
| enableUcssReset | boolean | true | 否 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 是否启用ucss样式覆盖 |

<!-- PAGESJSON.globalStyle_mp-weixin.compatibility -->

### pages 配置项列表 @pagesoptionspage

pages节点里注册页面，数据格式是数组，数组每个项都是一个对象，通过path属性指定页面路径，通过style指定该页面的样式配置。

<!-- PAGESJSON.PagesOptionsPage.description -->

| 属性 | 类型 | 默认值 | 必填 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- | :- |
| path | string ([string.PageURIString](/uts/data-type.md#ide-string)) | - | 是 | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 配置页面路径 |
| style | [style 配置项列表](#pagesoptionspage-style) | - | 否 | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 配置页面窗口表现，配置项参考下方 [pageStyle](https://doc.dcloud.net.cn/uni-app-x/collocation/pagesjson.html#pagesoptionspage-style)。 |
| needLogin | boolean | false | 否 | Web: 4.0; 微信小程序: x; Android: 3.99; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 是否需要登录才可访问 |

<!-- PAGESJSON.PagesOptionsPage.compatibility -->

**Tips：**

- **pages节点的第一项为应用入口页（即首页）**
- **应用中新增/减少页面**，都需要对 pages 数组进行修改
- 文件名**不需要写后缀**，框架会自动寻找路径下的页面资源
- 页面路径必须与真实的文件路径大小写保持一致，即**大小写敏感**

**示例**

假使开发目录为：

<pre v-pre="" data-lang="">
	<code class="lang-" style="padding:0">
┌─pages
│  ├─index
│  │  └─index.uvue
│  └─login
│     └─login.uvue
├─static
├─main.uts
├─App.uvue
├─manifest.json
└─pages.json
	</code>
</pre>

则需要在 pages.json 中填写

```json
{
    "pages": [
        {
            "path": "pages/index/index",
            "style": { ... }
        }, {
            "path": "pages/login/login",
            "style": { ... }
        }
    ]
}
```


#### style 配置项列表 @pagesoptionspage-style

用于设置每个页面的状态栏、导航条的颜色、文字等信息。

页面中配置项会覆盖 [globalStyle](#pages-globalstyle) 中相同的配置项

配置页面窗口表现，配置项参考下方 [pageStyle](https://doc.dcloud.net.cn/uni-app-x/collocation/pagesjson.html#pagesoptionspage-style)。

| 属性 | 类型 | 默认值 | 必填 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- | :- |
| navigationBarBackgroundColor | string ([string.ColorString](/uts/data-type.md#ide-string)) | `app`: #F8F8F8<br/>`web`: #F8F8F8<br/>`mp-weixin、mp-qq、mp-baidu、mp-toutiao、mp-lark、mp-jd`: #000000<br/>`mp-alipay、mp-kuaishou`: #ffffff | 否 | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 导航栏背景颜色（同状态栏背景色） |
| navigationBarTextStyle | 'white' \| 'black' | "black" | 否 | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 导航栏标题颜色，仅支持 black/white |
| navigationBarTitleText | string | - | 否 | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 导航栏标题文字内容 |
| navigationBarShadow | [navigationBarShadow 配置项列表](#style-navigationbarshadow) | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 导航栏阴影，配置参考下方 [导航栏阴影](https://doc.dcloud.net.cn/uni-app-x/collocation/pagesjson.html#pagesoptionspage-style) |
| navigationStyle | 'default' \| 'custom' | "default" | 否 | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 导航栏样式，仅支持 default/custom。custom即取消默认的原生导航栏，需看[使用注意](https://uniapp.dcloud.net.cn/collocation/pages.html#customnav)。 |
| disableScroll | boolean | false | 否 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 设置为 true 则页面整体不能上下滚动（bounce效果），只在页面配置中有效，在globalStyle中设置无效(仅 IOS 支持)。 |
| backgroundColor | string ([string.ColorString](/uts/data-type.md#ide-string)) | "#ffffff" | 否 | Web: x; 微信小程序: 4.41; Android: 3.99; iOS: 4.18; HarmonyOS: -; HarmonyOS(Vapor): - | 下拉刷新显示出来的窗口的背景色（无下拉刷新时，此颜色无效果） |
| backgroundColorContent | string ([string.ColorString](/uts/data-type.md#ide-string)) | "#ffffff" | 否 | Web: 4.11; 微信小程序: 4.41; Android: 4.0; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 页面容器背景色 |
| backgroundTextStyle | 'dark' \| 'light' | "dark" | 否 | Web: x; 微信小程序: 4.41; Android: 4.31; iOS: 4.31; HarmonyOS: -; HarmonyOS(Vapor): - | 下拉 loading 的样式，仅支持 dark/light |
| enablePullDownRefresh | boolean | false | 否 | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 是否开启下拉刷新，详见[页面生命周期](https://doc.dcloud.net.cn/uni-app-x/page.html)。 |
| onReachBottomDistance | number | 50 | 否 | Web: 4.0; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 页面上拉触底事件触发时距页面底部距离，单位只支持px，详见[页面生命周期](https://doc.dcloud.net.cn/uni-app-x/page.html)。 |
| pageOrientation | 'auto' \| 'portrait' \| 'landscape' | "portrait" | 否 | Web: x; 微信小程序: 4.41; Android: 4.13; iOS: 4.25; HarmonyOS: -; HarmonyOS(Vapor): - | 页面旋转设置，支持 auto 设备自适应 / portrait 竖向 / landscape 横向 |
| hideStatusBar | boolean | false | 否 | Web: x; 微信小程序: x; Android: 4.31; iOS: 4.33; HarmonyOS: -; HarmonyOS(Vapor): - | 是否隐藏系统顶部状态栏 |
| hideBottomNavigationIndicator | boolean | false | 否 | Web: x; 微信小程序: x; Android: 4.31; iOS: 4.33; HarmonyOS: -; HarmonyOS(Vapor): - | 是否隐藏系统底部导航栏 |
| androidThreeButtonNavigationTranslucent | boolean | false | 否 | Web: x; 微信小程序: x; Android: 4.41; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 页面内容是否可以渲染到虚拟按键区域 |
| androidThreeButtonNavigationBackgroundColor | string ([string.ColorString](/uts/data-type.md#ide-string)) | - | 否 | Web: x; 微信小程序: x; Android: 4.51; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 虚拟按键区域背景色 |
| androidThreeButtonNavigationStyle | string ([string.ThemeJsonString](/uts/data-type.md#ide-string)) | - | 否 | Web: x; 微信小程序: x; Android: 4.61; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 虚拟按键区域前景色 |
| backgroundColorTop | string ([string.ColorString](/uts/data-type.md#ide-string)) | "#ffffff" | 否 | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 顶部窗口的背景色(bounce回弹区域), 仅 iOS 平台 |
| backgroundColorBottom | string ([string.ColorString](/uts/data-type.md#ide-string)) | "#ffffff" | 否 | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 底部窗口的背景色(bounce回弹区域), 仅 iOS 平台 |
| disableSwipeBack | boolean | false | 否 | Web: x; 微信小程序: x; Android: x; iOS: 4.18; HarmonyOS: x; HarmonyOS(Vapor): - | 是否禁用右滑手势关闭页面 |
| titleImage | string ([string.ImageURIString](/uts/data-type.md#ide-string)) | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 导航栏图片地址（替换当前文字标题），支付宝小程序内必须使用https的图片链接地址 |
| transparentTitle | 'always' \| 'auto' \| 'none' | "none" | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 导航栏整体（前景、背景）透明设置。支持 always 一直透明 / auto 滑动自适应 / none 不透明 |
| titlePenetrate | 'YES' \| 'NO' | "NO" | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 导航栏点击穿透 |
| enableUcssReset | boolean | true | 否 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 是否启用ucss样式覆盖 |
| app-plus | [app-plus 配置项列表](#style-app-plus) | - | 否 | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 编译到 App 平台的特定样式 |
| h5 | [h5 配置项列表](#style-h5) | - | 否 | - | 编译到 H5 平台的特定样式 |
| mp-alipay | [mp-alipay 配置项列表](#style-mp-alipay) | - | 否 | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 支付宝小程序特有配置 |
| mp-weixin | [mp-weixin 配置项列表](#style-mp-weixin) | - | 否 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 微信小程序特有配置 |
| mp-baidu | [mp-baidu 配置项列表](#style-mp-baidu) | - | 否 | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 百度小程序特有配置 |
| mp-toutiao | object | - | 否 | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 头条小程序特有配置 |
| mp-qq | object | - | 否 | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | QQ小程序特有配置 |
| mp-kuaishou | object | - | 否 | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 快手小程序特有配置 |
| mp-jd | object | - | 否 | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 设置编译到 mp-jd 平台的特定样式 |
| mp-lark | object | - | 否 | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 飞书小程序特有配置 |
| usingComponents | object | - | 否 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 引用小程序组件，参考 [小程序组件https://uniapp.dcloud.net.cn/tutorial/miniprogram-subject.html#小程序自定义组件支持)。 |
| leftWindow | boolean | true | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 当存在 leftWindow时，当前页面是否显示 leftWindow |
| topWindow | boolean | true | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 当存在 topWindow时，当前页面是否显示 topWindow |
| rightWindow | boolean | true | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 当存在 rightWindow时，当前页面是否显示 rightWindow |
| maxWidth | number | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 单位px，当浏览器可见区域宽度大于maxWidth时，两侧留白，当小于等于maxWidth时，页面铺满；不同页面支持配置不同的maxWidth；maxWidth = leftWindow(可选)+page(页面主体)+rightWindow(可选) |

<!-- PAGESJSON.PagesOptionsPage_style.compatibility -->

<a id="pagesoptionspage-tips"></a>

**Tips**
- 横屏
	* Web：横竖屏由手机浏览器控制，无法在pages.json中指定。uni-app x的页面和基础组件都支持自适应宽屏界面
	* Android：默认是竖屏。从4.13起支持配置pageOrientation实现横屏或自动旋转适应
	* iOS：在iPhone手机上默认竖屏，在iPad上默认自动旋转适应。从4.25起iPhone设置支持配置pageOrientation，iPad设备不受pageOrientation配置影响（表现为自动旋转适配），如需在iPad设备固定某个方向可以在项目的 Info.plist 中配置应用可支持的横竖屏列表来配置，详见[应用可支持横竖屏列表配置](https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-ios.html#orientation)，配置后应用将限定在可支持的横竖屏列表中配置的值（如配置应用可支持的列表仅为横屏，则应用只能显示为横屏）。uni-app x的页面和基础组件都支持自适应宽屏界面
- 状态栏
	* 手机顶部状态栏的背景色、前景色(white/black)与navigationBarBackgroundColor和navigationBarTextStyle相同
	* 小程序平台，pages.json中各个颜色的设置仅支持普通的16进制数值。App和Web支持设为transparent，即透明。
	* 如需动态设置状态栏颜色，使用api [uni.setNavigationBarColor](../api/set-navigation-bar-color.md)
	* 当navigationStyle设为custom时，原生导航栏不显示。此时需要注意系统状态栏背景色恒为透明。
	* 注意不同手机的状态栏高度并不相同，如需获取本机的状态栏高度，使用api [uni.getWindowInfo](../api/get-window-info.md) 或 css变量 [--status-bar-height](../css/common/variable.md)
	* 配置hideStatusBar可以隐藏状态栏
	* 同时隐藏状态栏hideStatusBar和底部指示器hideBottomNavigationIndicator，可以实现页面全屏
- 下拉刷新
	* pages.json中下拉刷新是页面级配置，方便使用但灵活度有限。
	* 如需自定义下拉刷新，请使用[scroll-view](../component/scroll-view.md)或[list-view](../component/list-view.md)的下拉刷新。
- Android系统导航栏 (通常指手机底部按钮或手势指示条区域)
	* 系统导航栏的背景颜色与backgroundColorContent颜色一致，导航栏的前景色会根据backgroundColorContent颜色自动适配 (4.21版本开始支持)
	* tabBar页面的系统导航栏背景颜色取值策略[参考](#tabbar-tips)
	* 系统导航栏为全面屏手势时，HBuilderX4.31版本调整页面内容可以渲染到手势指示条区域（低版本页面内容会自动避开手势指示条区域），如需适配可以通过[uni.getWindowInfo](../api/get-window-info.md)获取安全区域底部插入位置信息进行适配
	* HBuilderX4.41版本起，App-Android平台支持配置页面内容是否渲染到虚拟按键区域，但横屏时会默认渲染到该区域且无法修改此行为，属于当前版本遗留问题，后续修复。

**style示例**
```javascript
{
  "pages": [{
      "path": "pages/index/index",
      "style": {
        "navigationBarTitleText": "首页",//设置页面标题文字
        "enablePullDownRefresh":true//开启下拉刷新
      }
    },
    ...
  ]
}
```

##### navigationBarShadow 配置项列表 @style-navigationbarshadow

导航栏阴影，配置参考下方 [导航栏阴影](https://doc.dcloud.net.cn/uni-app-x/collocation/pagesjson.html#pagesoptionspage-style)

| 属性 | 类型 | 默认值 | 必填 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- | :- |
| colorType | 'grey' \| 'blue' \| 'green' \| 'orange' \| 'red' \| 'yellow' | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 阴影的颜色，支持：grey、blue、green、orange、red、yellow |

<!-- PAGESJSON.style_navigationBarShadow.compatibility -->

#### 页面背景色@background
- 页面容器背景色：可在页面 json 文件中通过 backgroundColorContent 属性配置，支持 #RRGGBB 写法，默认为白色
- 窗口背景色：可在页面 json 文件中通过 backgroundColor 属性配置，支持 #RRGGBB 写法，默认为白色。被页面容器背景色覆盖，仅在页面设置下拉刷新时才可能看到此颜色

##### h5 配置项列表 @style-h5

编译到 H5 平台的特定样式

| 属性 | 类型 | 默认值 | 必填 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- | :- |
| titleNView | [titleNView 配置项列表](#h5-titlenview) | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 导航栏设置 |
| pullToRefresh | [pullToRefresh 配置项列表](#h5-pulltorefresh) | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 下拉刷新 |

<!-- PAGESJSON.style_h5.compatibility -->


##### mp-weixin 配置项列表 @style-mp-weixin

微信小程序特有配置

| 属性 | 类型 | 默认值 | 必填 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- | :- |
| homeButton | boolean | false | 否 | - | 在非首页、非页面栈最底层页面或非tabbar内页面中的导航栏展示home键 |
| backgroundColorTop | HexColor | "#ffffff" | 否 | - | 顶部窗口的背景色，仅 iOS 支持 |
| backgroundColorBottom | HexColor | "#ffffff" | 否 | - | 顶部窗口的背景色，仅 iOS 支持 |
| restartStrategy | 'homePage' \| 'homePageAndLatestPage' | "homePage" | 否 | - | 重新启动策略配置。支持 homePage / homePageAndLatestPage |
| initialRenderingCache | 'static' \| 'dynamic' | - | 否 | - | 页面初始渲染缓存配置。支持 static / dynamic |
| visualEffectInBackground | 'none' \| 'hidden' | "none" | 否 | - | 切入系统后台时，隐藏页面内容，保护用户隐私。支持 hidden / none |
| handleWebviewPreload | 'static' \| 'manual' \| 'none' | "static" | 否 | - | 控制预加载下个页面的时机。支持 static / manual / auto |
| enableUcssReset | boolean | true | 否 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 是否启用ucss样式覆盖 |

<!-- PAGESJSON.style_mp-weixin.compatibility -->


### tabBar 配置项列表 @pages-tabbar

tabbar节点用于配置应用的tabbar，仅支持配置一个。如需在更多页面配置tabbar，见下面的自定义tabbar。

- 自定义tabbar：[源码参考](https://gitcode.com/dcloud/hello-uni-app-x/blob/alpha/pages/template/custom-tab-bar/custom-tab-bar.uvue)
自定义tabbar的逻辑较多，这里写出pages.json的tabbar的逻辑，供自定义tabbar参考：
1. tabbar页面刚开始只载入第一个子tab组件，其他tab组件是在点击相应的选项卡时v-if设为true来创建
2. 一个子tab一旦被v-if加载后，不要再v-if设为false去掉，也不通过v-show控制，而是通过css的visibility来控制显示和隐藏。这样可以保留每个子tab的状态，比如滚动位置、输入框内容。切换tab也会更快速。

底部 tab 的表现

| 属性 | 类型 | 默认值 | 必填 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- | :- |
| color | string ([string.ColorString](/uts/data-type.md#ide-string)) | - | 是 | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | tab 上的文字默认颜色 |
| selectedColor | string ([string.ColorString](/uts/data-type.md#ide-string)) | - | 是 | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | tab 上的文字选中时的颜色 |
| backgroundColor | string ([string.ColorString](/uts/data-type.md#ide-string)) | - | 是 | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | tab 的背景色 |
| borderStyle | string ([string.ThemeJsonString](/uts/data-type.md#ide-string)) | "black" | 否 | Web: 4.0; 微信小程序: 4.41; Android: 4.0; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | tabbar 上边框的颜色，可选值 black、white，black对应颜色rgba(0,0,0,0.33)，white对应颜色rgba(255,255,255,0.33)。 |
| blurEffect | 'dark' \| 'extralight' \| 'light' \| 'none' | "none" | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 高斯模糊效果 |
| list | Array\<[PagesOptionsTabbarList](#pagesoptionstabbarlist)> | - | 是 | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | tab 的列表，详见 list 属性说明，最少2个、最多5个 tab |
| position | 'top' \| 'bottom' | "bottom" | 否 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | tabbar 的位置,可选值 bottom、top。 |
| fontSize | string | "10px" | 否 | Web: 4.0; 微信小程序: x; Android: 3.9; iOS: 4.18; HarmonyOS: -; HarmonyOS(Vapor): - | 文字默认大小 |
| iconWidth | string | "24px" | 否 | Web: 4.0; 微信小程序: x; Android: 3.9; iOS: 4.18; HarmonyOS: -; HarmonyOS(Vapor): - | 图标默认宽度（高度等比例缩放） |
| spacing | string | "3px" | 否 | Web: 4.0; 微信小程序: x; Android: 3.9; iOS: 4.18; HarmonyOS: -; HarmonyOS(Vapor): - | 图标和文字的间距 |
| height | string | "50px" | 否 | Web: 4.0; 微信小程序: x; Android: 3.9; iOS: 4.18; HarmonyOS: -; HarmonyOS(Vapor): - | tabBar 默认高度 |
| midButton | [midButton 配置项列表](#tabbar-midbutton) | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 中间按钮 仅在 list 项为偶数时有效 |
| iconfontSrc | string | - | 否 | Web: 4.0; 微信小程序: x; Android: 3.9; iOS: 4.18; HarmonyOS: -; HarmonyOS(Vapor): - | list设置 iconfont 属性时，需要指定字体文件路径 |
| backgroundImage | string | - | 否 | Web: x; 微信小程序: x; Android: 3.9; iOS: 4.18; HarmonyOS: -; HarmonyOS(Vapor): - | 设置背景图片，优先级高于 backgroundColor |
| backgroundRepeat | 'repeat' \| 'repeat-x' \| 'repeat-y' \| 'no-repeat' | "no-repeat" | 否 | Web: x; 微信小程序: x; Android: 3.9; iOS: 4.18; HarmonyOS: -; HarmonyOS(Vapor): - | 设置标题栏的背景图平铺方式 |
| redDotColor | string ([string.ColorString](/uts/data-type.md#ide-string)) | - | 否 | Web: x; 微信小程序: x; Android: 3.9; iOS: 4.18; HarmonyOS: -; HarmonyOS(Vapor): - | tabbar上红点颜色 |

<!-- PAGESJSON.pages_tabBar.compatibility -->

<a id="tabbar-tips"></a>

**Tips**
- backgroundColor
	- app-android平台：系统导航（System navigation）栏的背景色会与 tabBar 背景色保持一致。如果应用没有配置 tabBar 页面导航栏背景颜色取值策略[参考](#pagesoptionspage-tips)
	- app-ios平台：tabBar 会自动适配安全区域，底部安全区域背景色会与 tabBar 背景色保持一致。如果应用没有配置 tabBar，则不会自动适配底部安全区域，开发者需根据应用实际情况自行处理。


#### PagesOptionsTabbarList 配置项列表 @pagesoptionstabbarlist

<!-- PAGESJSON.PagesOptionsTabbarList.description -->

| 属性 | 类型 | 默认值 | 必填 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- | :- |
| iconfont | [iconfont 配置项列表](#pagesoptionstabbarlist-iconfont) | - | 否 | Web: 4.0; 微信小程序: x; Android: 3.9; iOS: 4.18; HarmonyOS: -; HarmonyOS(Vapor): - | 字体图标，优先级高于 iconPath |
| pagePath | string ([string.PageURIString](/uts/data-type.md#ide-string)) | - | 是 | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 页面路径，必须在 pages 中先定义 |
| text | string | - | 是 | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | tab 上按钮文字，在 App 和 H5 平台为非必填。例如中间可放一个没有文字的+号图标 |
| iconPath | string ([string.ImageURIString](/uts/data-type.md#ide-string)) | - | 否 | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px，当 position 为 top 时，此参数无效，不支持网络图片，不支持字体图标 |
| selectedIconPath | string ([string.ImageURIString](/uts/data-type.md#ide-string)) | - | 否 | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 选中时的图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px ，当 position 为 top 时，此参数无效 |
| visible | boolean | - | 否 | Web: 4.0; 微信小程序: x; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 该项是否显示，默认显示 |

<!-- PAGESJSON.PagesOptionsTabbarList.compatibility -->

**tabbar示例**
```json
"tabBar": {
	"color": "#7A7E83",
	"selectedColor": "#3cc51f",
	"borderStyle": "black",
	"backgroundColor": "#ffffff",
	"list": [{
		"pagePath": "pages/component/index",
		"iconPath": "static/image/icon_component.png",
		"selectedIconPath": "static/image/icon_component_HL.png",
		"text": "组件"
	}, {
		"pagePath": "pages/API/index",
		"iconPath": "static/image/icon_API.png",
		"selectedIconPath": "static/image/icon_API_HL.png",
		"text": "接口"
	}]
}
```

##### iconfont 配置项列表 @pagesoptionstabbarlist-iconfont

字体图标，优先级高于 iconPath

| 属性 | 类型 | 默认值 | 必填 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- | :- |
| text | string | - | 否 | Web: 4.0; 微信小程序: x; Android: 3.9; iOS: 4.18; HarmonyOS: -; HarmonyOS(Vapor): - | 字库 Unicode 码 |
| selectedText | string | - | 否 | Web: 4.0; 微信小程序: x; Android: 3.9; iOS: 4.18; HarmonyOS: -; HarmonyOS(Vapor): - | 选中后字库 Unicode 码 |
| fontSize | string | - | 否 | Web: 4.0; 微信小程序: x; Android: 3.9; iOS: 4.18; HarmonyOS: -; HarmonyOS(Vapor): - | 字体图标字号(px) |
| color | string ([string.ColorString](/uts/data-type.md#ide-string)) | - | 否 | Web: 4.0; 微信小程序: x; Android: 3.9; iOS: 4.18; HarmonyOS: -; HarmonyOS(Vapor): - | 字体图标颜色 |
| selectedColor | string ([string.ColorString](/uts/data-type.md#ide-string)) | - | 否 | Web: 4.0; 微信小程序: x; Android: 3.9; iOS: 4.18; HarmonyOS: -; HarmonyOS(Vapor): - | 字体图标选中颜色 |

<!-- PAGESJSON.PagesOptionsTabbarList_iconfont.compatibility -->

#### midButton 配置项列表 @tabbar-midbutton

中间按钮 仅在 list 项为偶数时有效

| 属性 | 类型 | 默认值 | 必填 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- | :- |
| width | string | "80px" | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 中间按钮的宽度，tabBar 其它项为减去此宽度后平分，默认值为与其它项平分宽度 |
| height | string | "80px" | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 中间按钮的高度，可以大于 tabBar 高度，达到中间凸起的效果 |
| text | string | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 中间按钮的文字 |
| iconPath | string ([string.ImageURIString](/uts/data-type.md#ide-string)) | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 中间按钮的图片路径 |
| iconWidth | string | "24px" | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 图标默认宽度（高度等比例缩放） |
| backgroundImage | string ([string.ImageURIString](/uts/data-type.md#ide-string)) | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 中间按钮的背景图片路径 |
| iconfont | object | - | 否 | Web: x; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 字体图标，优先级高于 iconPath |

<!-- PAGESJSON.tabBar_midButton.compatibility -->

### topWindow 配置项列表 @pages-topwindow

上窗体

| 属性 | 类型 | 默认值 | 必填 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- | :- |
| path | string | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 配置页面路径 |
| style | object | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 配置页面窗口表现，配置项参考下方 [pageStyle](https://uniapp.dcloud.net.cn/collocation/pages.html?id=style) |
| matchMedia | [matchMedia 配置项列表](#topwindow-matchmedia) | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 配置显示该窗口的规则，配置项参考下方 [matchMedia](https://uniapp.dcloud.net.cn/collocation/pages.html?id=matchmedia) |

<!-- PAGESJSON.pages_topWindow.compatibility -->

#### matchMedia 配置项列表 @topwindow-matchmedia

配置显示该窗口的规则，配置项参考下方 [matchMedia](https://uniapp.dcloud.net.cn/collocation/pages.html?id=matchmedia)

| 属性 | 类型 | 默认值 | 必填 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- | :- |
| minWidth | number | 768 | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 当设备可见区域宽度  minWidth 时，显示该 window+ |

<!-- PAGESJSON.topWindow_matchMedia.compatibility -->

### leftWindow 配置项列表 @pages-leftwindow

左窗体

| 属性 | 类型 | 默认值 | 必填 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- | :- |
| path | string | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 配置页面路径 |
| style | object | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 配置页面窗口表现，配置项参考下方 [pageStyle](https://uniapp.dcloud.net.cn/collocation/pages.html?id=style) |
| matchMedia | [matchMedia 配置项列表](#leftwindow-matchmedia) | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 配置显示该窗口的规则，配置项参考下方 [matchMedia](https://uniapp.dcloud.net.cn/collocation/pages.html?id=matchmedia) |

<!-- PAGESJSON.pages_leftWindow.compatibility -->

#### matchMedia 配置项列表 @leftwindow-matchmedia

配置显示该窗口的规则，配置项参考下方 [matchMedia](https://uniapp.dcloud.net.cn/collocation/pages.html?id=matchmedia)

| 属性 | 类型 | 默认值 | 必填 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- | :- |
| minWidth | number | 768 | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 当设备可见区域宽度  minWidth 时，显示该 window+ |

<!-- PAGESJSON.leftWindow_matchMedia.compatibility -->

### rightWindow 配置项列表 @pages-rightwindow

右窗体

| 属性 | 类型 | 默认值 | 必填 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- | :- |
| path | string | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 配置页面路径 |
| style | object | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 配置页面窗口表现，配置项参考下方 [pageStyle](https://uniapp.dcloud.net.cn/collocation/pages.html?id=style) |
| matchMedia | [matchMedia 配置项列表](#rightwindow-matchmedia) | - | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 配置显示该窗口的规则，配置项参考下方 [matchMedia](https://uniapp.dcloud.net.cn/collocation/pages.html?id=matchmedia) |

<!-- PAGESJSON.pages_rightWindow.compatibility -->

#### matchMedia 配置项列表 @rightwindow-matchmedia

配置显示该窗口的规则，配置项参考下方 [matchMedia](https://uniapp.dcloud.net.cn/collocation/pages.html?id=matchmedia)

| 属性 | 类型 | 默认值 | 必填 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- | :- |
| minWidth | number | 768 | 否 | Web: 4.0; 微信小程序: x; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 当设备可见区域宽度  minWidth 时，显示该 window+ |

<!-- PAGESJSON.rightWindow_matchMedia.compatibility -->

### condition 配置项列表 @pages-condition

启动模式配置，仅开发期间生效，用于模拟直达页面的场景。教程[详见](https://uniapp.dcloud.net.cn/collocation/pages.html#condition)

启动模式

| 属性 | 类型 | 默认值 | 必填 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- | :- |
| current | number | - | 是 | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 当前激活的模式，list节点的索引值。 |
| list | Array\<[PagesConditionItem](#pagesconditionitem)> | - | 是 | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 启动模式列表 |

<!-- PAGESJSON.pages_condition.compatibility -->

#### PagesConditionItem 配置项列表 @pagesconditionitem

<!-- PAGESJSON.PagesConditionItem.description -->

| 属性 | 类型 | 默认值 | 必填 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- | :- |
| name | string | - | 是 | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 启动模式名称 |
| path | string ([string.PageURIString](/uts/data-type.md#ide-string)) | - | 是 | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 启动页面路径 |
| query | string | - | 否 | Web: 4.0; 微信小程序: 4.41; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 启动参数，可在页面的 onLoad 函数里获得 |

<!-- PAGESJSON.PagesConditionItem.compatibility -->



### easycom 配置项列表 @pages-easycom

easycom是uni-app提供的一种简化组件使用的方式。一般情况下组件放置在符合规范的位置时即可自动引用。

但有时组件的路径或文件名无法满足easycom默认规范要求，可以在pages.json里进行规则的自定义。

自定义easycom的详细教程[详见](https://uniapp.dcloud.net.cn/collocation/pages.html#easycom)

组件自动引入规则

| 属性 | 类型 | 默认值 | 必填 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- | :- |
| autoscan | boolean | true | 否 | Web: 4.0; 微信小程序: √; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 是否开启自动扫描，开启后将会自动扫描符合components/组件名称/组件名称.vue/uvue目录结构的组件 |
| custom | object | - | 否 | Web: 4.0; 微信小程序: √; Android: 3.9; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 以正则方式自定义组件匹配规则。如果autoscan不能满足需求，可以使用custom自定义匹配规则 |

<!-- PAGESJSON.pages_easycom.compatibility -->

### uniIdRouter 配置项列表 @pages-uniidrouter

根据用户登录状态、页面是否要求登录、以及接口返回的用户token验证状态自动跳转登录页面。详细教程：[详见](https://doc.dcloud.net.cn/uniCloud/uni-id/summary.html#uni-id-router)

| 属性 | 类型 | 默认值 | 必填 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- | :- |
| loginPage | string ([string.PageURIString](/uts/data-type.md#ide-string)) | - | 否 | Web: 4.0; 微信小程序: 4.41; Android: 3.99; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 登录页面路径 |
| resToLogin | boolean | - | 否 | Web: 4.0; 微信小程序: 4.41; Android: 3.99; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | 是否开启自动根据响应体判断跳转登录页面，默认true（开启） |
| needLogin | Array\<string,[string.PageURIString](/uts/data-type.md#ide-string)> | - | 否 | Web: 4.0; 微信小程序: 4.41; Android: 3.99; iOS: 4.11; HarmonyOS: -; HarmonyOS(Vapor): - | - |

<!-- PAGESJSON.pages_uniIdRouter.compatibility -->


### subPackages 配置项列表 @pagessubpackages

分包加载配置，此配置为小程序的分包加载机制。详细教程[详见](https://uniapp.dcloud.net.cn/collocation/pages.html#subpackages)

subPackages 节点接收一个数组，数组每一项都是应用的子包，其属性值如下：

<!-- PAGESJSON.PagesSubPackages.description -->

| 属性 | 类型 | 默认值 | 必填 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- | :- |
| root | string | - | 是 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 子包的根目录 |
| pages | Array\<[SubPackagePagesOptionsPage](#subpackagepagesoptionspage)> | - | 是 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 子包由哪些页面组成，参数同 pages |

<!-- PAGESJSON.PagesSubPackages.compatibility -->

### preloadRule 配置项列表 @pages-preloadrule

分包预载配置。

配置preloadRule后，在进入小程序某个页面时，由框架自动预下载可能需要的分包，提升进入后续分包页面时的启动速度

preloadRule 中，key 是页面路径，value 是进入此页面的预下载配置，每个配置有以下几项：

声明分包预下载的规则

| 属性 | 类型 | 默认值 | 必填 | 兼容性 | 描述 |
| :- | :- | :- | :- | :- | :- |
| network | 'all' \| 'wifi' | "wifi" | 否 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 在指定网络下预下载，可选值为：all（不限网络）、wifi（仅wifi下预下载） |
| packages | Array\<string> | - | 是 | Web: x; 微信小程序: 4.41; Android: x; iOS: x; HarmonyOS: -; HarmonyOS(Vapor): - | 进入页面后预下载分包的 root 或 name。__APP__ 表示主包。 |

<!-- PAGESJSON.pages_preloadRule.compatibility -->

## 参见
[相关 Bug](https://issues.dcloud.net.cn/?mid=collocation.pages_json)
