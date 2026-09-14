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

### 5.26.2026091402-alpha

**[原生SDK(蒸汽模式)下载地址](https://web-ext-storage.dcloud.net.cn/uni-app-x/sdk/Android-Vapor/Android-uni-app-x-vapor-SDK@101163-5.26.zip)**

**[原生SDK(VDOM模式)下载地址](https://web-ext-storage.dcloud.net.cn/uni-app-x/sdk/Android/Android-uni-app-x-SDK@15075-5.26.zip)**

* 更新uni-app离线打包支持，需使用HBuilderX（5.26.2026091402-alpha）版本生成本地打包App资源。
* 蒸汽模式 修复 组件 scroll-view 容器或内容变化引发的滚动不会触发scrollend事件 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32611)
* 蒸汽模式 修复 组件 list-view list-item高度变成0时未重排后续item位置 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32592)
* 蒸汽模式 修复 组件 list-view initial-scroll-bottom属性部分情况下未将初始位置滚动到底部 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32614)
* 蒸汽模式 修复 组件 list-view 滚动期间及滚动结束瞬间概率出现闪烁 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32910)
* 蒸汽模式 修复 组件 list-view 开启 scroll-anchoring 后追加消息可能出现白屏 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32913)
* 蒸汽模式 修复 组件 text 嵌套 text 上使用 v-if 或 v-for 时可能无法显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32539)
* 蒸汽模式 修复 组件 rich-text 设置 translateY 后可能内容显示不完整 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32820)
* 蒸汽模式 修复 5.25版本引发的 组件 rich-text 页面滚动到页面上边缘偶现闪白 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32911)
* 蒸汽模式 修复 组件 image 没有设置 fade-show 加载网络图片首次显示会有渐变动画效果 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32762)
* 蒸汽模式 修复 5.25版本引发的 组件 画布 2D 绘制指令全部执行成功但画布始终空白不上屏 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32730)
* 蒸汽模式 修复 API uni.exit 执行 redirectTo 后可能无法正常退出显示白屏 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32768)
* 蒸汽模式 修复 5.25版本引发的 API uni.getUniVerifyManager 调用报 `parameters length error` 错误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32757)
### uts插件
* 蒸汽模式 修复 字面量.toFloat方式声明的变量被编译为了Number类型 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32906)
* 蒸汽模式 修复 5.25版本引发的 uts插件导出的常量不能被页面组件引用 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32903)
* 蒸汽模式 修复 5.25版本引发的 暴露给页面组件调用的class上含可为空的function类型属性时编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32624)

**[历史版本](https://pan.baidu.com/s/1OXvFjfGW6zDAyzTZGpY7hQ?pwd=aa2c)**
 
**[历史版本更新日志](https://download1.dcloud.net.cn/hbuilderx/changelog/5.26.2026091402-alpha.html)**
