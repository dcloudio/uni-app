# uni-app x iOS原生SDK

## 正式版

### 5.14.2026070214

**[下载地址](https://web-ext-storage.dcloud.net.cn/uni-app-x/sdk/iOS/UniAppX-iOS%405.14.zip)**

### uni-app x
* 新增 组件 editor 支持输入HTML内容。支持插入 code、link、blockquote [文档](https://doc.dcloud.net.cn/uni-app-x/component/editor.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=26637>
* 新增 API screenBrightness uni.getScreenBrightness、uni.setScreenBrightness、setKeepScreenOn 屏幕亮度获取和设置，以及设置常亮 [文档](https://doc.dcloud.net.cn/uni-app-x/api/screen-brightness.html)<https://issues.dcloud.net.cn/pages/issues/detail?id=28158>
* 修复 组件 video 非全屏时不阻止 touch 事件冒泡 [文档](https://doc.dcloud.net.cn/uni-app-x/component/video.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=30007>
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
* 调整 API uni.openLocation 调整为内置 API [文档](https://uniapp.dcloud.net.cn/api/location/open-location.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=28556>
* 新增 组件 picker [文档](https://doc.dcloud.net.cn/uni-app-x/component/picker.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=27040>
* 调整 组件 video 使用 uts 标准组件模式重构 [文档](https://doc.dcloud.net.cn/uni-app-x/component/video.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=16883>
* 新增 API uni.login 微信登录 [文档](https://doc.dcloud.net.cn/uni-app-x/api/sign-in.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=26003>
* 新增 API uni.share 微信分享 [文档](https://doc.dcloud.net.cn/uni-app-x/api/share.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=26820>
* 新增 API authentication 生物认证，包括指纹和人脸识别 [文档](https://doc.dcloud.net.cn/uni-app-x/api/authentication.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=28883>
* 修复 5.0版本引发的 组件 web-view 默认宽高不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=27726)
* 新增 组件 web-view 支持 ios-allows-inline-media-playback 属性设置视频是否支持内联播放 [文档](https://doc.dcloud.net.cn/uni-app-x/component/web-view.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=26974>
* 新增 发行 支持配置原生资源保存到编译uts插件生成的动态库Framework Bundle中 [文档](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-plugin.html#embedresources) <https://issues.dcloud.net.cn/pages/issues/detail?id=28723>
* 更新 API facialRecognitionMetaInfo 使用的 金融级实人认证 SDK 为 2.3.45 版 [文档](https://doc.dcloud.net.cn/uni-app-x/api/facial-recognition-meta-info.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=29622>
* 更新 云端打包环境 XCode 为 26.3 版、iOS SDK 为 26.2 版，支持iOS13及以上系统 [详情](https://doc.dcloud.net.cn/uni-app-x/tutorial/app-env.html)
* 修复 manifest.json uni-ad Gromore开屏广告偶现无法关闭启动页 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=27613)
* 修复 API uni.request response 中的 header 键名大小写不统一 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25399)
* 修复 API uni.getRecorderManager 默认录音时间不准确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=26958)
* 修复 组件 nested-scroll-header 嵌套横向 scroll-view 组件时手势冲突 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=29957)
* 新增 UTSJSONObject多层嵌套时，可通过`.`来访问属性 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=26652)
* 新增 条件判断语句中判断string/number/object时拉齐和JavaScript的表现 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=26054)
* 修复 函数入参为type对象类型且包含UTSJSONObject数组时运行闪退 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=29085)
* 修复 编译器 当代码中定义的对象体积过大、嵌套层级过深时，编译器会抛出Method too large异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=27177)

**[历史版本](https://pan.baidu.com/s/1PVLzui3QRkG5brzTxSYJlg?pwd=amqt)**
 
**[历史版本更新日志](https://download1.dcloud.net.cn/hbuilderx/changelog/5.07.2026041006.html)**

## alpha版

###  5.14.2026062614-alpha
**[下载地址](https://web-ext-storage.dcloud.net.cn/uni-app-x/sdk/iOS/UniAppX-iOS%405.14.zip)

### uni-app x

* 修复 5.08版本引发的 组件 video 设置 object-fit 为 cover 无效果 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=29170)
* 修复 5.08版本引发的 组件 video 首次加载可能闪烁 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=29628)
* 修复 vue2 项目在 iOS 26.4 之后有概率启动白屏 [文档](https://ask.dcloud.net.cn/question/218144)

**[历史版本](https://pan.baidu.com/s/130Rvlh2jdsp3aJ4YtigoJQ?pwd=xy7s)**
 
**[历史版本更新日志](https://download1.dcloud.net.cn/hbuilderx/changelog/5.13.2026061207-alpha.html)**
