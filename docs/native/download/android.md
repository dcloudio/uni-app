# uni-app x Android原生SDK

## 说明

- 从HBuilderX 4.81-alpha版开始，为了适配Kotlin版本，对gradle插件做了升级，升级SDK时需要替换原有插件。插件配置及说明参考[文档](../use/android.md#gradleplugin)。

注意：蒸汽模式的离线sdk还未发版，请关注更新。

## 正式版

### 5.23.2026080626

**[下载地址](https://web-ext-storage.dcloud.net.cn/uni-app-x/sdk/Android/Android-uni-app-x-SDK@14987-5.23.zip)**

* 更新uni-app离线打包支持，需使用HBuilderX（5.23.2026080626）版本生成本地打包App资源。
* 新增 组件 rich-text css 样式 支持 color 设置文字默认颜色 [文档](https://doc.dcloud.net.cn/uni-app-x/component/rich-text.html#tips) <https://issues.dcloud.net.cn/pages/issues/detail?id=29909>
* 修复 组件 editor min-height 样式不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=30794)
* 修复 CSS var自定义变量 从 rgba 切换到非 rgba 颜色值（hex / hsl / 关键字）失效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=30250)
* 修复 组件 video 视频播放时会静音音频播放 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=29338)
* 修复 组件 video object-fit 未对视频封面图片生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=29588)
* 新增 API uni.request enableQuic 开启时默认支持 Brotli [文档](https://doc.dcloud.net.cn/uni-app-x/api/request.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=31527>
* 修复 组件 image 无法加载 unifile://static/ 路径的图片 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31514)
* 修复 API uni.navigateTo 在Android高版本上且开启预测性返回后，页面跳转卡顿，生命周期异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31202)
* 修复 API uni.startLocationUpdateBackground 设置targetSdkVersion为36时，可能会出现崩溃的问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31431)
* 修复 API uni.chooseMedia 选择 webm 文件可能引发应用崩溃或者不触发回调 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=30466&ask_id=220458)
* 修复 API previewImage 默认长按图片显示的操作菜单国际化语言可能不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31749)
* 修复 CSS font-weight 部分系统字体设后显示效果不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=30974)
* 修复 组件 video 快速来回随机拖拽进度条或双指点击进度条会显示会卡住，同时屏幕中间时间数字也不消失 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31251)
* 修复 组件 scroll-view 元素切换 position 显示位置可能不对 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31100)
* 修复 组件 editor EditorContext.setContents 设置 html 不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31082)
* 修复 CSS 页面 style 中 @font-face 加载字体错误加载到全局问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=30166)

**[历史版本](https://pan.baidu.com/s/1M6XHzokpQYJqfICTzjuQ_g?pwd=93yh)**
 
**[历史版本更新日志](https://download1.dcloud.net.cn/hbuilderx/changelog/5.23.2026080626.html)**

## alpha版

### 5.23.2026080313-alpha

**[下载地址](https://web-ext-storage.dcloud.net.cn/uni-app-x/sdk/Android/Android-uni-app-x-SDK@14987-5.23.zip)**

* 更新 uni-app x 原生SDK打包支持，需使用HBuilderX（5.23.2026080313-alpha）版本生成本地打包App资源。
* 新增 API uni.request enableQuic 开启时默认支持 Brotli [文档](https://doc.dcloud.net.cn/uni-app-x/api/request.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=31527>
* 修复 5.21版本引发的 组件 video fullscreenclick 事件的 screenWidth 和 screenHeight 值不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31715)
* 修复 API previewImage 默认长按图片显示的操作菜单国际化语言可能不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31749)

**[历史版本](https://pan.baidu.com/s/1OXvFjfGW6zDAyzTZGpY7hQ?pwd=aa2c)**
 
**[历史版本更新日志](https://download1.dcloud.net.cn/hbuilderx/changelog/5.23.2026080313-alpha.html)**
