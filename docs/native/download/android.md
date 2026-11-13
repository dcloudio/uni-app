# uni-app x Android原生SDK

## 说明

- 从HBuilderX 4.81-alpha版开始，为了适配Kotlin版本，对gradle插件做了升级，升级SDK时需要替换原有插件。插件配置及说明参考[文档](../use/android.md#gradleplugin)。

注意：蒸汽模式的离线sdk需 uni-app x 5.25+

## 正式版

### 5.34.2026102909

**[原生SDK(蒸汽模式)下载地址](https://web-ext-storage.dcloud.net.cn/uni-app-x/sdk/Android-Vapor/Android-uni-app-x-vapor-SDK@101387-5.34.zip)**

**[原生SDK(VDOM模式)下载地址](https://web-ext-storage.dcloud.net.cn/uni-app-x/sdk/Android/Android-uni-app-x-SDK@15179-5.34.zip)**

* 更新uni-app离线打包支持，需使用HBuilderX（5.34.2026102909）版本生成本地打包App资源。
* 蒸汽模式 修复 组件 textarea 长按无法选中文字、不显示系统菜单 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=34153)

**[历史版本](https://pan.baidu.com/s/1M6XHzokpQYJqfICTzjuQ_g?pwd=93yh)**
 
**[历史版本更新日志](https://download1.dcloud.net.cn/hbuilderx/changelog/5.34.2026102909.html)**

## alpha版

### 5.36.2026111207-alpha

**[原生SDK(蒸汽模式)下载地址](https://web-ext-storage.dcloud.net.cn/uni-app-x/sdk/Android-Vapor/Android-uni-app-x-vapor-SDK@101496-5.36.zip)**

**[原生SDK(VDOM模式)下载地址](https://web-ext-storage.dcloud.net.cn/uni-app-x/sdk/Android/Android-uni-app-x-SDK@15205-5.36.zip)**

* 更新uni-app离线打包支持，需使用HBuilderX（5.36.2026111207-alpha）版本生成本地打包App资源。
* 蒸汽模式 修复 运行调试 云端打包运行可能报`cannot locate symbol _ZNSt6__ndk127__from_chars_floating_pointIfEENS`异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33821)
* 修复 编译器 方法返回interface类型别名时无法调用返回值的实例方法 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33638)
* 修复 编译器 插件回调类型使用类型别名时无法正常回调 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=34132)
* 蒸汽模式 新增 组件 input 适配暗黑模式 [文档](https://doc.dcloud.net.cn/uni-app-x/component/input.html#tips) <https://issues.dcloud.net.cn/pages/issues/detail?id=34191>
* 修复 API uni.showModal 调用失败时触发两次 fail 和 complete 回调 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=34527)
* 更新 uni-AD 腾讯优量汇SDK Android为 4.710.1580 版，iOS为 4.16.11 版；快手广告 SDK Android为 5.9.10.1 版，iOS为 5.3.20.1 版；Sigmob广告联盟SDK Android为 4.25.86 版，iOS为 5.2.0 版；百度百青藤广告SDK iOS为 10.061 版；章鱼广告SDK Android为 2.6.10.10 版，iOS为 2.6.10.7 版；泛连广告SDK Android 为 29012 版；华夏乐游SDK Android为 4.9.5.8 版，iOS为 2.22.0 版；佳投广告SDK Android为 1.9.8 版；美数广告SDK Android为 2.5.16.7 版， iOS为 2.7.25.0 版；支持双11预算 [文档](https://doc.dcloud.net.cn/uni-app-x/api/create-rewarded-video-ad.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=33737>
* 修复 app.uvue 使用微信开放标签 `<wx-open-launch-app>` 无法冷启动打开应用 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31607)
* 修复 组件 page-container 面板偶尔不弹出 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31687)
* 修复 API uni.getSystemSetting 高版本设备蓝牙开关状态不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=34451)
* 修复 API 分享 uni.share 报 4000511 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=34097)
* 【重要】蒸汽模式 调整 字节码编译规则版本由 1 升级为 2，HBuilderX 5.36 生成的 wgt 无法安装到旧版基座 [文档](https://doc.dcloud.net.cn/uni-app-x/app-vapor.html#compiler-rule-version)
* 蒸汽模式 新增 vue 支持在 CSS 中使用 v-bind() [文档](https://doc.dcloud.net.cn/uni-app-x/vue/#css-v-bind) <https://issues.dcloud.net.cn/pages/issues/detail?id=30801>
* 蒸汽模式 新增 组件 input 支持 caret-color 自定义光标颜色 [文档](https://doc.dcloud.net.cn/uni-app-x/component/input.html#tips) <https://issues.dcloud.net.cn/pages/issues/detail?id=34326>
* 蒸汽模式 新增 组件 picker-view 支持 indicatorClass 属性 [文档](https://doc.dcloud.net.cn/uni-app-x/component/picker-view.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=34026>
* 蒸汽模式 新增 API ScrollViewContext 增强滚动容器实例 [文档](https://doc.dcloud.net.cn/uni-app-x/api/scrollviewcontext.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=33784>
* 蒸汽模式 新增 组件 input v-model 支持 lazy 修饰符 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33697)
* 蒸汽模式 修复 vue 组件定义的 props 属性名与引入的其他自定义组件名称冲突时白屏或闪退 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=34052)
* 蒸汽模式 修复 vue v-else-if 分支过多可能发生闪退 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33949)
* 蒸汽模式 修复 组件 全局事件 部分组件上prevent事件修饰符不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=34109)
* 蒸汽模式 修复 组件 list-view 部分情况下list-view销毁时崩溃 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33807)
* 蒸汽模式 修复 5.26版本引发的 组件 list-view 使用 initial-scroll-bottom 时如果item尺寸偏小向头部滚动过程中会发生跳动 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=34062)
* 蒸汽模式 修复 组件 nested-scroll-body JS侧element构造异常、tagName错误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33836)
* 蒸汽模式 修复 5.02版本引发的 组件 input placeholder-class font-size 优先级低于组件样式问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=34404)
* 蒸汽模式 修复 组件 label 和表单组件非嵌套结构不能联动 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=34101)
* 蒸汽模式 修复 组件 picker-view 动态高度后选项偏移 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=34595)
* 蒸汽模式 修复 API uni.openDialogPage 设置 animationType 时打开后快速关闭，再次调用 uni.openDialogPage 报 `page path locked` 错误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33473)
* 蒸汽模式 修复 CSS page 选择器中无单位 0 的 CSS 属性值编译失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=34654)
* 蒸汽模式 修复 CSS flex vertical 布局中 flex:1 的子元素在动态切换 class 后未正确撑开，导致 line 显示不全 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32649)
* 蒸汽模式 修复 CSS animation animation-name 包含大写字母时动画失效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=34037)
* 蒸汽模式 修复 动态字节码资源加载或解析异常导致 App 原生崩溃闪退 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33644)
* 蒸汽模式 新增 API 支持 蓝牙-通用、蓝牙-低功耗中心设备 [文档](https://doc.dcloud.net.cn/uni-app-x/api/bluetooth-le-central.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=31849>
* 蒸汽模式 新增 运行调试 真机运行时检测提示应用资源编译规则版本号与手机端SDK版本不匹配可能导致应用异常 [文档](https://developers.weixin.qq.com/miniprogram/dev/framework/) <https://issues.dcloud.net.cn/pages/issues/detail?id=33504>
* 蒸汽模式 新增 组件 list-view 支持 android-refresher-color 属性设置下拉刷新雪花前景颜色 [文档](https://doc.dcloud.net.cn/uni-app-x/component/list-view.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=33738>
* 蒸汽模式 新增 组件 waterflow 支持 android-refresher-color 属性设置下拉刷新雪花前景颜色 [文档](https://doc.dcloud.net.cn/uni-app-x/component/waterflow.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=33739>
* 蒸汽模式 新增 支持配置包含 icu 功能的 v8 JS引擎 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#js%E5%BC%95%E6%93%8E) <https://issues.dcloud.net.cn/pages/issues/detail?id=33466>
* 蒸汽模式 修复 组件 scroll-view 在 position 为 fixed 的容器中开启 refresher-enabled 后无法滚动 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33867)
* 蒸汽模式 修复 组件 page-container 两个嵌套的Key相同时渲染异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33194)
* 蒸汽模式 修复 组件 list-view 部分组件在list-view内使用引发告警 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33698)
* 蒸汽模式 修复 组件 flow-item 部分情况下图片显示不全 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33464)
* 蒸汽模式 修复 组件 text font-size 单位为 rpx 时应用窗口宽度变化导致文本可能显示不全 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33422)
* 蒸汽模式 修复 组件 text 在 scroll-view 组件中拍平时文本显示不全 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=34289)
* 蒸汽模式 修复 组件 input v-for 情况下获取焦点弹出软键盘无法上推页面 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33684)
* 蒸汽模式 修复 组件 input 获取焦点弹出软键盘时上推页面无动画效果 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=34229)
* 蒸汽模式 修复 组件 input 快速重建时部分 input 不显示及原生实例访问异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=34425)
* 蒸汽模式 修复 组件 textarea 同时设置 auto-height 与 max-height 时内容高度大于 max-height 无法滚动 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33963)
* 蒸汽模式 修复 组件 textarea 设置auto-height时，在 scroll-view 组件中无法滚动 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=34417)
* 蒸汽模式 修复 组件 image 显示超长图片模糊失真 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33365)
* 蒸汽模式 修复 组件 canvas 多个页面同时存在2个或以上 canvas 组件会出现异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33320)
* 蒸汽模式 修复 组件 canvas 反复进入退出页面引起崩溃 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33941)
* 蒸汽模式 修复 组件 web-view 网页中 `<input type="file">` 文件选择不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=34533)
* 蒸汽模式 修复 API 启动 应用退出再次快速启动可能出现白屏 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=34391)
* 蒸汽模式 修复 API uni.chooseImage 媒体选择数量控制失效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=34032)
* 蒸汽模式 修复 CSS visibility 同层级存在拍平元素时其他子元素设置 visibility 可能失效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33902)
* 蒸汽模式 修复 手势导航线隐藏后 TabBar 底部仍存在多余占位 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=34350)
* 蒸汽模式 修复 运行调试 开启调试可能引起应用崩溃 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33991)


**[历史版本](https://pan.baidu.com/s/1OXvFjfGW6zDAyzTZGpY7hQ?pwd=aa2c)**
 
**[历史版本更新日志](https://download1.dcloud.net.cn/hbuilderx/changelog/5.36.2026111207-alpha.html)**