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

### 5.37.2026112003-alpha

**[原生SDK(蒸汽模式)下载地址](https://web-ext-storage.dcloud.net.cn/uni-app-x/sdk/Android-Vapor/Android-uni-app-x-vapor-SDK@101519-5.37.zip)**

**[原生SDK(VDOM模式)下载地址](https://web-ext-storage.dcloud.net.cn/uni-app-x/sdk/Android/Android-uni-app-x-SDK@15225-5.37.zip)**

* 更新uni-app离线打包支持，需使用HBuilderX（5.37.2026112003-alpha）版本生成本地打包App资源。
- 【重要】蒸汽模式 组件 input、textarea 还原背景色为透明，取消5.36版本的默认暗黑适配背景色逻辑；统一placeholder颜色light下#808080、dark下#5f5f5f [文档](https://doc.dcloud.net.cn/uni-app-x/component/input.html) [https://issues.dcloud.net.cn/pages/issues/detail?id=34802](https://issues.dcloud.net.cn/pages/issues/detail?id=34802)
- 蒸汽模式 修复 组件 ad 在 list-view 复用时可能出现广告显示错乱 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=34446)
- 蒸汽模式 修复 组件 ad 部分素材高度渲染异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=34797)


**[历史版本](https://pan.baidu.com/s/1OXvFjfGW6zDAyzTZGpY7hQ?pwd=aa2c)**
 
**[历史版本更新日志](https://download1.dcloud.net.cn/hbuilderx/changelog/5.37.2026112003-alpha.html)**