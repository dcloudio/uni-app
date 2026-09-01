# uni-app x Android原生SDK

## 说明

- 从HBuilderX 4.81-alpha版开始，为了适配Kotlin版本，对gradle插件做了升级，升级SDK时需要替换原有插件。插件配置及说明参考[文档](../use/android.md#gradleplugin)。

注意：蒸汽模式的离线sdk需 uni-app x 5.25+

## 正式版

### 5.24.2026081301

**[下载地址](https://web-ext-storage.dcloud.net.cn/uni-app-x/sdk/Android/Android-uni-app-x-SDK@15006-5.24.zip)**

* 更新uni-app离线打包支持，需使用HBuilderX（5.24.2026081301）版本生成本地打包App资源。
* 修复 5.21版本引发的 vue useComputedStyle部分情况下无法获取更新的样式 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31912)

**[历史版本](https://pan.baidu.com/s/1M6XHzokpQYJqfICTzjuQ_g?pwd=93yh)**
 
**[历史版本更新日志](https://download1.dcloud.net.cn/hbuilderx/changelog/5.24.2026081301.html)**

## alpha版

### 5.25.2026082807-alpha

**[原生SDK(蒸汽模式)下载地址](https://web-ext-storage.dcloud.net.cn/uni-app-x/sdk/Android-Vapor/Android-uni-app-x-vapor-SDK@101080-5.25.zip)**

**[原生SDK(VDOM模式)下载地址](https://web-ext-storage.dcloud.net.cn/uni-app-x/sdk/Android/Android-uni-app-x-SDK@15055-5.25.zip)**

* 新增 API uni.onAppRoute、uni.onBeforeAppRoute、uni.rewriteRoute 支持页面路由监听及重写 [文档](https://doc.dcloud.net.cn/uni-app-x/api/app-route.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=31599>
* 变更 组件 rich-text 使用 user-select 属性替代 selectable [文档](https://doc.dcloud.net.cn/uni-app-x/component/rich-text.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=31518>
* 优化 API uni.showLoading 调整背景透明度与消息提示框相同 [文档](https://doc.dcloud.net.cn/uni-app-x/api/loading.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=31614>
* 优化 API uni.createVideoContext playbackRate 设置播放倍速的取值范围 [文档](https://doc.dcloud.net.cn/uni-app-x/api/create-video-context.html#playbackrate) <https://issues.dcloud.net.cn/pages/issues/detail?id=32253>
* 修复 组件 video 点击进度条跳转后 controls 自动隐藏定时器未重置 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31671)
* 新增 API 广告 美数渠道 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-modules.html#uni-ad) <https://issues.dcloud.net.cn/pages/issues/detail?id=32000>
* 新增 API uni.requestSystemPermission 支持申请系统权限 [文档](https://doc.dcloud.net.cn/uni-app-x/api/request-system-permission.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=31823>
* 优化 API push 申请系统通知权限逻辑 [文档](https://doc.dcloud.net.cn/uni-app-x/api/uni-push.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=31815>
* 修复 组件 view dialogPage 中 view 全屏后和 dialogPage 显示重叠 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31990)
* 修复 组件 video 在 dialogPage 中不显示播放控制按钮 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31916)
* 修复 组件 video 在 dialogPage 中无法退出全屏 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32066)
* 修复 组件 input maxlength 属性支持字符串类型 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31799)

**[历史版本](https://pan.baidu.com/s/1OXvFjfGW6zDAyzTZGpY7hQ?pwd=aa2c)**
 
**[历史版本更新日志](https://download1.dcloud.net.cn/hbuilderx/changelog/5.25.2026082807-alpha.html)**
