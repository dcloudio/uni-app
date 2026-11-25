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

### 5.38.2026112503-alpha

**[原生SDK(蒸汽模式)下载地址](https://web-ext-storage.dcloud.net.cn/uni-app-x/sdk/Android-Vapor/Android-uni-app-x-vapor-SDK@101542-5.38.zip)**

**[原生SDK(VDOM模式)下载地址](https://web-ext-storage.dcloud.net.cn/uni-app-x/sdk/Android/Android-uni-app-x-SDK@15236-5.38.zip)**

* 更新uni-app离线打包支持，需使用HBuilderX（5.38.2026112503-alpha）版本生成本地打包App资源。
- 蒸汽模式 新增 API uni.installWgt 支持 armeabi-v7a [文档](https://doc.dcloud.net.cn/uni-app-x/api/install-wgt.html#installwgt)
- 蒸汽模式 修复 组件 input 软键盘弹出时应用切换到后台，重新回到前台可能导致页面显示不正常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=34750)
- 蒸汽模式 修复 组件 input 从最近任务切换应用到后台，重新切换到前台可能导致软键盘遮挡已聚焦的输入框 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=35134)
- 蒸汽模式 修复 组件 input 设置较大的 cursor-spacing 后获取焦点弹出软键盘可能导致页面显示不正常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=35186)
- 蒸汽模式 修复 组件 textarea 设置 auto-height 后输入内容自动增高可能导致被软键盘遮挡 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=34821)
- 蒸汽模式 修复 组件 textarea page-container 内textarea键盘遮挡 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=34871)
- 蒸汽模式 修复 5.37版本引发的 组件 web-view 进页面会报 `null cannot be cast to non-null type kotlin.Boolean` 错误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=35063)

**[历史版本](https://pan.baidu.com/s/1OXvFjfGW6zDAyzTZGpY7hQ?pwd=aa2c)**
 
**[历史版本更新日志](https://download1.dcloud.net.cn/hbuilderx/changelog/5.38.2026112503-alpha.html)**