# uni-app x Android原生SDK

## 说明

- 从HBuilderX 4.81-alpha版开始，为了适配Kotlin版本，对gradle插件做了升级，升级SDK时需要替换原有插件。插件配置及说明参考[文档](../use/android.md#gradleplugin)。

## 正式版

### 5.15.2026070915

**[下载地址](https://web-ext-storage.dcloud.net.cn/uni-app-x/sdk/Android/Android-uni-app-x-SDK@14915-5.15.zip)**

* 更新uni-app离线打包支持，需使用HBuilderX（5.15.2026070915）版本生成本地打包App资源。
* 修复 5.14版本引发的 大写的Boolean类型被识别为对象, 导致条件判断出现异常行为[详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31048)

**[历史版本](https://pan.baidu.com/s/1M6XHzokpQYJqfICTzjuQ_g?pwd=93yh)**
 
**[历史版本更新日志](https://download1.dcloud.net.cn/hbuilderx/changelog/5.15.2026070915.html)**

## alpha版

### 5.21.2026071110-alpha

**[下载地址](https://web-ext-storage.dcloud.net.cn/uni-app-x/sdk/Android/Android-uni-app-x-SDK@14927-5.21.zip)**

* 更新 uni-app x 原生SDK打包支持，需使用HBuilderX（5.21.2026071110-alpha）版本生成本地打包App资源。
* 新增 组件 rich-text css 样式 支持 color 设置文字默认颜色 [文档](https://doc.dcloud.net.cn/uni-app-x/component/rich-text.html#tips) <https://issues.dcloud.net.cn/pages/issues/detail?id=29909>
* 修复 组件 editor min-height 样式不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=30794)
* 修复 组件 video 视频播放时会静音音频播放 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=29338)
* 修复 组件 video object-fit 未对视频封面图片生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=29588)
* 修复 API uni.chooseMedia 选择 webm 文件可能引发应用崩溃或者不触发回调 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=30466&ask_id=220458)
* 修复 CSS font-weight 部分系统字体设后显示效果不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=30974)
* 修复 组件 scroll-view 元素切换 position 显示位置可能不对 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31100)
* 修复 组件 editor EditorContext.setContents 设置 html 不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31082)
* 修复 CSS 页面 style 中 @font-face 加载字体错误加载到全局问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=30166)


**[历史版本](https://pan.baidu.com/s/1OXvFjfGW6zDAyzTZGpY7hQ?pwd=aa2c)**
 
**[历史版本更新日志](https://download1.dcloud.net.cn/hbuilderx/changelog/5.21.2026071110-alpha.html)**
