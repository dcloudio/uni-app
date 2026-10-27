# uni-app x Android原生SDK

## 说明

- 从HBuilderX 4.81-alpha版开始，为了适配Kotlin版本，对gradle插件做了升级，升级SDK时需要替换原有插件。插件配置及说明参考[文档](../use/android.md#gradleplugin)。

注意：蒸汽模式的离线sdk需 uni-app x 5.25+

## 正式版

### 5.33.2026102401

**[原生SDK(蒸汽模式)下载地址](https://web-ext-storage.dcloud.net.cn/uni-app-x/sdk/Android-Vapor/Android-uni-app-x-vapor-SDK@101358-5.33.zip)**

**[原生SDK(VDOM模式)下载地址](https://web-ext-storage.dcloud.net.cn/uni-app-x/sdk/Android/Android-uni-app-x-SDK@15168-5.33.zip)**

* 更新uni-app离线打包支持，需使用HBuilderX（5.33.2026102401）版本生成本地打包App资源。
* 【重要】蒸汽模式 新增 应用资源wgt热更新 [文档](https://doc.dcloud.net.cn/uni-app-x/api/install-wgt.html#tips) <https://issues.dcloud.net.cn/pages/issues/detail?id=32098>
* 【重要】蒸汽模式 新增 uvue script 支持 lang="ts" 和 lang="js" 并**默认为ts**。独立文件也分离处理。ts/js下不再支持uts专用对象 [文档](https://doc.dcloud.net.cn/uni-app-x/vue/#lang) <https://issues.dcloud.net.cn/pages/issues/detail?id=31884>
* 蒸汽模式 新增 uasm插件。类似 wasm。同时在 App平台支持 Node API [文档](http://doc.dcloud.net.cn/uni-app-x/plugin/uasm-plugin.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=17204>
* 蒸汽模式 新增 API uniCloud 支持组合式定义datacom [文档](https://doc.dcloud.net.cn/uni-app-x/api/unicloud/) <https://issues.dcloud.net.cn/pages/issues/detail?id=33522>
* 修复 编译器 部分api类型信息缺失 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32544)
* 新增 API toast 允许设置是否与页面绑定 [文档](https://doc.dcloud.net.cn/uni-app-x/api/toast.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=32914>
* 新增 API uni.getFileSystemManager 支持 unzipSync 同步解压zip文件 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-file-system-manager.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=32516>
* 新增 API uni.getFileSystemManager getFileInfo 支持计算 sha256 摘要 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-file-system-manager.html#getfileinfo) <https://issues.dcloud.net.cn/pages/issues/detail?id=32932>
* 新增 UniPage API TabBar 页面支持 onTabItemTap 生命周期 [文档](https://doc.dcloud.net.cn/uni-app-x/page.html#ontabitemtap) <https://issues.dcloud.net.cn/pages/issues/detail?id=32343>
* 修复 pages.json TabBar 未配置 selectedColor 时显示有误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33166)
* 修复 API uni.navigateBack 自定义基座且未使用 uni.hideLoading 时调用 uni.navigateBack 报错 uni-showLoading not found [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31939)
* 新增 组件 ad-drama 短剧组件 [文档](https://doc.dcloud.net.cn/uni-app-x/api/create-drama-ad.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=32816>
* 修复 组件 camera 部分情况可能引起内存泄漏 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22660)
* 修复 API uni.onPushMessage 回调首次执行后被释放 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32385)
* 升级 组件 map 更新腾讯地图 sdk 为 6.18.0 版，适配支持 16KB 内存页面大小 [文档](https://doc.dcloud.net.cn/uni-app-x/component/map.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=32831>
* 升级 API push 更新个推 SDK 为 3.3.15 版，适配支持 16KB 内存页面大小 [文档](https://doc.dcloud.net.cn/uni-app-x/api/uni-push.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=33091>
* 修复 组件 video 部分折叠屏设备上首帧闪烁 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32583)
* 修复 API uni.getFileSystemManager unzip 解压部分zip文件可能失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33128)
* 修复 API uni.startFacialRecognitionVerify 更新阿里云金融级实人认证SDK为 2.3.52 版，适配支持 16KB 内存页面大小 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33055)
* 修复 DOM API UniElement 分屏模式下调用 requestFullscreen 显示异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32709)
* 蒸汽模式 新增 pages.json 支持配置 backgroundTextStyle 属性 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/pagesjson.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=32612>
* 蒸汽模式 新增 组件 text 支持 CSS 样式 word-break [文档](https://doc.dcloud.net.cn/uni-app-x/css/word-break.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=32705>
* 蒸汽模式 新增 CSS animation 及 @keyframes 关键帧动画 [文档](https://doc.dcloud.net.cn/uni-app-x/css/animation.html#animation) <https://issues.dcloud.net.cn/pages/issues/detail?id=31169>
* 蒸汽模式 新增 CSS calc 支持数学计算样式 [文档](https://doc.dcloud.net.cn/uni-app-x/css/common/function.html#calc) <https://issues.dcloud.net.cn/pages/issues/detail?id=32256>
* 蒸汽模式 新增 DOM API UniElement 支持 attributes 返回当前元素上所有属性元素的集合 [文档](https://doc.dcloud.net.cn/uni-app-x/api/dom/unielement.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=32488>
* 蒸汽模式 新增 API uni.convert2AbsFullPath 将相对路径转换为平台的绝对路径地址 [文档](https://doc.dcloud.net.cn/uni-app-x/api/convert2-abs-full-path.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=33471>
* 修复 编译器 动态组件配合 v-for 运行报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33138)
* 蒸汽模式 修复 vue 组合使用v-for v-if时部分情况编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33263)
* 蒸汽模式 修复 vue Teleport 包含 slot 时的字节码编译错误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32570)
* 蒸汽模式 修复 vue 组件插槽中空文本节点被丢弃的问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32633)
* 蒸汽模式 修复 5.26版本引发的 组件 list-view 滚动锚定、初始滚动到底部功能触发滚动时概率出现闪烁 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33120)
* 蒸汽模式 修复 组件 list-view 部分情况下list-item尺寸变化引发重排导致界面空白 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33123)
* 蒸汽模式 修复 组件 rich-text native模式 nodes 使用节点列表数据类型时 text 中存在特殊字符会无法显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33106)
* 蒸汽模式 修复 组件 rich-text native模式 list-view 内 rich-text 折叠展开后内容不显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33286)
* 蒸汽模式 修复 组件 waterflow 超高flow-item部分情况不显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33511)
* 蒸汽模式 修复 组件 rich-text native mode时richtext组件选中文字时点击页面其他部分无法取消选中 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33573)
* 蒸汽模式 修复 CSS page标签选择器背景色生效时机 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32858)
* 蒸汽模式 修复 CSS var自定义变量 组件中使用 useComputedStyle 后动态更新 class 中的 var 样式不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32577)
* 蒸汽模式 修复 CSS animation 使用 calc() 设置的长度值无动画效果 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33455)
* 蒸汽模式 修复 DOM API UniElement animate 方法在同一元素创建多个动画无法并行运行，创建新动画会中断正在执行的其他动画 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33577)
* 蒸汽模式 新增 UniApp API 支持 restart 重启应用 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-app.html#restart) <https://issues.dcloud.net.cn/pages/issues/detail?id=31806>
* 蒸汽模式 修复 API uni.setTabBarStyle setTabBarStyle 未传文字颜色时重置 TabBar 文字颜色 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32448)
* 蒸汽模式 修复 组件 input dialogPage 中输入框聚焦页面上推后，键盘收起页面位置未恢复 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33205)
* 蒸汽模式 修复 API themeChange 切换主题与动态组件冲突导致闪退 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32559)
* 蒸汽模式 修复 manifest.json 安卓端蒸汽模式设置横屏跳转页面问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32329)
* 蒸汽模式 修复 组件 scroll-view 设置 refresher-enabled 为 true 开启下拉刷新后 v-if 切换节点出现旧视图残留叠加 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33208)
* 蒸汽模式 修复 组件 list-view 打开页面获取数据后偶现整个列表变空白 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32994)
* 蒸汽模式 修复 组件 rich-text native模式 大屏幕设备可能文字渲染毛刺 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32452)
* 蒸汽模式 修复 组件 rich-text native模式 显示不完整 切割内容导致文字无故换行 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33376&ask_id=221751)
* 蒸汽模式 修复 组件 native-view 特定情况下 init 事件可能不触发 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32523)
* 蒸汽模式 修复 组件 input onLoad 发起 request 请求后赋值偶现不显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32325)
* 蒸汽模式 修复 组件 image svg 格式图片设置 fade-show 为 true 无效果 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32929)
* 蒸汽模式 修复 组件 canvas v-if 切换后再访问原 CanvasContext 引发异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32767)
* 蒸汽模式 修复 API uni.showLoading 页面销毁的过程中loading偶现异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33086)
* 蒸汽模式 修复 API uni.hideLoading 配置动画类型后无法关闭加载框 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33188)
* 蒸汽模式 修复 API uni.getWindowInfo 分屏模式下获取到的安全区域信息不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32665)
* 蒸汽模式 修复 API uni.onPushMessage requestPermission 参数默认值错误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32668)
* 蒸汽模式 修复 API uni.getFileSystemManager fstat、stat回调内的Stat实例无法调用isFile、isDirectory方法 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33568)
* 蒸汽模式 修复 CSS z-index 偶发不生效导致元素被遮挡 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32983)
* 蒸汽模式 修复 CSS box-shadow 渲染区域拦截点击事件导致低 z-index 元素无法响应点击 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32642)
* 蒸汽模式 修复 CSS var自定义变量 退出应用后重新进入 --status-bar-height 可能失效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31801)
* 蒸汽模式 修复 DOM API UniElement 使用 rpx 样式时页面尺寸变化可能引发闪退 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33288)
* 蒸汽模式 修复 运行调试 app后台状态下热更新崩溃 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32896)
* 蒸汽模式 修复 运行调试 云端打包运行可能报`cannot locate symbol _ZNSt6__ndk127__from_chars_floating_pointIfEENS`异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33821)
* VDOM模式 修复 CSS var自定义变量 padding 使用 var 情况下简写不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32648)
* hello uni-app x 重构为标准ts，提升编译速度 [详情](https://gitcode.com/dcloud/hello-uni-app-x/tree/alpha)
* uni-ui x 新增 uni-icons 适配蒸汽模式 [详情](https://doc.dcloud.net.cn/uni-app-x/component/uni-ui-x/uni-icons.html)
* 蒸汽模式 修复 5.25版本引发的 插件导出的方法接收非 double 类型数字时调用报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32998)
* 蒸汽模式 修复 convert2AbsFullPath不支持SD卡路径文件 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33361)

**[历史版本](https://pan.baidu.com/s/1M6XHzokpQYJqfICTzjuQ_g?pwd=93yh)**
 
**[历史版本更新日志](https://download1.dcloud.net.cn/hbuilderx/changelog/5.33.2026102401.html)**

## alpha版

### 5.33.2026102115-alpha

**[原生SDK(蒸汽模式)下载地址](https://web-ext-storage.dcloud.net.cn/uni-app-x/sdk/Android-Vapor/Android-uni-app-x-vapor-SDK@101358-5.33.zip)**

**[原生SDK(VDOM模式)下载地址](https://web-ext-storage.dcloud.net.cn/uni-app-x/sdk/Android/Android-uni-app-x-SDK@15168-5.33.zip)**

* 更新uni-app离线打包支持，需使用HBuilderX（5.33.2026102115-alpha）版本生成本地打包App资源。
* Android平台 蒸汽模式 修复 运行调试 云端打包运行可能报`cannot locate symbol _ZNSt6__ndk127__from_chars_floating_pointIfEENS`异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=33821)


**[历史版本](https://pan.baidu.com/s/1OXvFjfGW6zDAyzTZGpY7hQ?pwd=aa2c)**
 
**[历史版本更新日志](https://download1.dcloud.net.cn/hbuilderx/changelog/5.33.2026102115-alpha.html)**