# uni-app x Android原生SDK

## 说明

- 从HBuilderX 4.81-alpha版开始，为了适配Kotlin版本，对gradle插件做了升级，升级SDK时需要替换原有插件。插件配置及说明参考[文档](../use/android.md#gradleplugin)。

## 正式版

### 5.07.2026041006

**[下载地址](https://web-ext-storage.dcloud.net.cn/uni-app-x/sdk/Android/Android-uni-app-x-SDK@14694-5.07.zip)**

* 更新uni-app离线打包支持，需使用HBuilderX（5.07.2026041006）版本生成本地打包App资源。
* 修复 5.0版本引发的 API uni.showLoading 未显示时调用 hideLoading 隐藏可能引起应用崩溃 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=27821)

**[历史版本](https://pan.baidu.com/s/1M6XHzokpQYJqfICTzjuQ_g?pwd=93yh)**
 
**[历史版本更新日志](https://download1.dcloud.net.cn/hbuilderx/changelog/5.07.2026041006.html)**

## alpha版

### 5.08.2026050815-alpha

**[下载地址](https://web-ext-storage.dcloud.net.cn/uni-app-x/sdk/Android/Android-uni-app-x-SDK@14772-5.08.zip)**

* 更新 uni-app x 原生SDK打包支持，需使用HBuilderX（5.08.2026050815-alpha）版本生成本地打包App资源。
* 新增 组件 editor 支持输入HTML内容。支持插入 code、link、blockquote [文档](https://doc.dcloud.net.cn/uni-app-x/component/editor.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=26637>
* 新增 API screenBrightness uni.getScreenBrightness、uni.setScreenBrightness、setKeepScreenOn 屏幕亮度获取和设置，以及设置常亮 [文档](https://doc.dcloud.net.cn/uni-app-x/api/screen-brightness.html)<https://issues.dcloud.net.cn/pages/issues/detail?id=28158>
* 修复 5.02版本引发的 组件 page-container 居中、右侧和左侧弹出改为全屏显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=27619)
* 修复 组件 navigator url 为不存在的页面时，未正确输出错误信息 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=27563)
* 新增 API dialogPage 页面跳转时，触发 dialogPage hide 生命周期 [文档](https://doc.dcloud.net.cn/uni-app-x/api/keyboard.html#onkeyboardheightchange) <https://issues.dcloud.net.cn/pages/issues/detail?id=26530>
* 修复 API dialogPage 非栈顶页面打开 dialogPage 时非预期触发 onShow 生命周期 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=26547)
* 修复 API uni.showModal 显示输入框时默认未获取焦点 [文档](https://doc.dcloud.net.cn/uni-app-x/api/modal.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=26896>
* 新增 API contact 操作通讯录联系人 [文档](https://doc.dcloud.net.cn/uni-app-x/api/contact.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=28887>
* 新增 API calendar 向系统日历添加事件 [文档](https://doc.dcloud.net.cn/uni-app-x/api/calendar.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=28522>
* 新增 API compass 获取罗盘数据 [文档](https://doc.dcloud.net.cn/uni-app-x/api/compass.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=28884>
* 新增 API accelerometer 获取加速度数据 [文档](https://doc.dcloud.net.cn/uni-app-x/api/accelerometer.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=28881>
* 新增 API gyroscope 获取陀螺仪数据 [文档](https://doc.dcloud.net.cn/uni-app-x/api/gyroscope.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=28885>
* 新增 API vibrate 振动 [文档](https://doc.dcloud.net.cn/uni-app-x/api/vibrate.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=28507>
* VDOM模式 修复 vue useComputedStyle计算外部传入样式时class优先级高于style [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=26988)
* 新增 组件 picker [文档](https://doc.dcloud.net.cn/uni-app-x/component/picker.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=27040>
* 调整 组件 video 使用 uts 标准组件模式重构 [文档](https://doc.dcloud.net.cn/uni-app-x/component/video.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=16883>
* 新增 API uni.login 微信登录 [文档](https://doc.dcloud.net.cn/uni-app-x/api/sign-in.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=26003>
* 新增 API uni.share 微信分享 [文档](https://doc.dcloud.net.cn/uni-app-x/api/share.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=26820>
* 新增 API authentication 生物认证，包括指纹和人脸识别 [文档](https://doc.dcloud.net.cn/uni-app-x/api/authentication.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=28883>
* 修复 5.0版本引发的 组件 web-view 默认宽高不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=27726)
* 新增 组件 image 支持avif格式 [文档](https://doc.dcloud.net.cn/uni-app-x/component/image.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=26819>
* 新增 CSS font-weight 支持自定义字体粗细 [文档](https://doc.dcloud.net.cn/uni-app-x/css/font-weight.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=23943>
* 修复 组件 scroll-view 属性 scroll-into-view 未支持孙子元素 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=27931)
* 修复 组件 text decode属性值动态更新无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25842)
* 修复 组件 text 设置 border-radius 无法裁剪文本 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=26200)
* 修复 5.0版本引发的 组件 rich-text 在 dialogPage 中无法正常显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=26809)
* 修复 组件 input 在 list-view 中 blur 事件可能无法正常触发 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25846)
* 修复 组件 canvas 某些情况偶现闪退 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=27348)
* 修复 组件 web-view 不支持unifile://static/路径 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=27344)
* 修复 组件 web-view 网页中的视频全屏不正常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=27420)
* 修复 API uni.switchTab 页面栈多时switchTab逐层返回跳转 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=26984)
* 修复 API uni.getElementById takeSnapshot 截图时渐变色背景的渐变尺度超出元素范围 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19982)
* 修复 API uni.getBoundingClientRectAsync 设置 box-shadow 时返回值不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25684)
* 修复 API uni.uploadFile MIME 类型不正确可能导致上传的文件无法正常下载 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=24858)
* 修复 API uni.chooseMedia 部分情况下自定义基座图片选择报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=24994)
* 修复 API uni.createCameraContext CameraContextCameraFrameListener 的 start 方法可能引发崩溃 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25800)
* 修复 5.0版本引发的 CSS overflow 设置为 hidden 时可能无法隐藏子元素 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=27215)
* 修复 4.81版本引发的 CSS bottom 动画效果异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=24808)
* 修复 DOM API UniElement requestFullscreen 方法的 navigationUI 设置为 hide 时点击事件首次不触发 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=27397)
* 修复 运行调试 控制台可能提示`WebSocketService`内存泄漏 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=24437)
* 新增 UTSJSONObject多层嵌套时，可通过`.`来访问属性 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=26652)
* 新增 条件判断语句中判断string/number/object时拉齐和JavaScript的表现 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=26054)


**[历史版本](https://pan.baidu.com/s/1OXvFjfGW6zDAyzTZGpY7hQ?pwd=aa2c)**
 
**[历史版本更新日志](https://download1.dcloud.net.cn/hbuilderx/changelog/5.08.2026050815-alpha.html)**
