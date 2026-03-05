#### 5.01.2026021122-alpha
##### uni-app x
* Android平台、iOS平台、鸿蒙平台 修复 API uni.previewImage 设置过多图片时显示速度变慢 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=26383)
* Android平台、iOS平台、鸿蒙平台 修复 5.0版本引发的 CSS hover-class部分场景表现和之前版本不一致 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=26281)
* Android平台 修复 5.0版本引发的 组件 rich-text 使用 webview 渲染模式云打包后无法使用 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=26115)
* Android平台 修复 5.0版本引发的 API uni.request 传递泛型请求时返回类型不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=26131)
* Android平台 修复 5.0版本引发的 uts插件中使用 `com.github.bumptech.glide:glide` 依赖库版本大于 4.9.0，云端打包后可能导致应用崩溃 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=26133)
* iOS平台 修复 API uni.chooseFile 当文件名称中包含`%`字符时选择文件不成功 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=26085)
* 【重要】鸿蒙平台 蒸汽模式 新增 CSS var 支持自定义变量 [文档](https://doc.dcloud.net.cn/uni-app-x/css/common/function.html#customvar) <https://issues.dcloud.net.cn/pages/issues/detail?id=26416>
* 鸿蒙平台 蒸汽模式 修复 组件 Touch 事件 双指捏合touchend事件次数不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=26225)
* 鸿蒙平台 蒸汽模式 修复 组件 text 不支持动态 text 节点嵌套 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=26134)
* 鸿蒙平台 蒸汽模式 修复 组件 input 某些情况 value 文本偏下 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=26170)
* 鸿蒙平台 蒸汽模式 修复 CSS transform-origin 设置百分比值大于`100%`不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=26410)
* 鸿蒙平台 蒸汽模式 修复 CSS class 分组选择器可能不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=26302)
* 鸿蒙平台 修复 组件 input 设置 font-size 无法影响 placeholder [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25710)
* 鸿蒙平台 修复 组件 video 同时存在两个及以上时图片显示异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25960)
* 鸿蒙平台 修复 API uni.request 鸿蒙系统下RequestFail返回的信息不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25935)
* 微信小程序平台 修复 4.81版本引发的 前端付费组件云编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=24434)
##### uts插件
* Android平台 回退 JSON.parse / UTSJSONObject 性能优化 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/json.html#json) <https://issues.dcloud.net.cn/pages/issues/detail?id=18524>

#### 5.0.2026013113-alpha
##### uni-app x
* 【重要】新增 鸿蒙平台 蒸汽模式，渲染性能大幅提升 [详情](https://doc.dcloud.net.cn/uni-app-x/app-harmony/harmony-vapor.html)
* 【重要】新增 CSS 样式隔离策略2.0，统一全平台样式隔离策略 [文档](https://doc.dcloud.net.cn/uni-app-x/css/common/style-isolation.html)
* 【重要】新增 CSS 组件支持external-class规范，用于组件通过属性方式修改子组件样式 [文档](https://doc.dcloud.net.cn/uni-app-x/css/common/style-isolation.html#external-class)
* Android平台、iOS平台、鸿蒙平台 新增 vue useComputedStyle用于监听组件根节点计算后样式变化 [文档](https://doc.dcloud.net.cn/uni-app-x/vue/composition-api.html#use-computed-style)
* 调整 CSS line-height 默认值为 normal。不再固定1.2 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25246)
* 新增 组件 loading [文档](https://doc.dcloud.net.cn/uni-app-x/component/loading.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=21140>
* Web平台、iOS平台、鸿蒙平台、微信小程序平台 新增 目标语言为js时为对象字面量指定类型时不再进行字段值类型校验以便更高性能的使用type [文档](https://doc.dcloud.net.cn/uni-app-x/uts/data-type.html#type) <https://issues.dcloud.net.cn/pages/issues/detail?id=25766>
* Web平台、App平台 升级 API uni.showLoading 基于loading组件重构showLoading。并不再支持点击空白区关闭loading [文档](https://doc.dcloud.net.cn/uni-app-x/api/loading.html#showloading) <https://issues.dcloud.net.cn/pages/issues/detail?id=25025>
* Web平台、App平台 新增 UniPage API 支持 querySelector/querySelectorAll 方法 [文档](https://doc.dcloud.net.cn/uni-app-x/api/unipage.html#queryselector) <https://issues.dcloud.net.cn/pages/issues/detail?id=25211>
* Web平台、App平台 调整 CSS white-space 调整靠近Web规范。App默认值调整为 keep [文档](https://doc.dcloud.net.cn/uni-app-x/css/white-space.html#hbuilderx5-0%E7%89%88%E6%9C%AC%E8%B0%83%E6%95%B4) <https://issues.dcloud.net.cn/pages/issues/detail?id=24206>
* 【重要】App平台 新增 API uni.request enableQuic 属性支持 Quic/h3 协议 [文档](https://doc.dcloud.net.cn/uni-app-x/api/request.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=24727>
* 新增 App.uvue 支持组合式 [文档](https://doc.dcloud.net.cn/uni-app-x/vue/composition-api.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=24585>
* Web平台 修复 API uni.createSelectorQuery .selectAll() 页面多根节点无法查询的问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=26051)
* Web平台 修复 4.51版本引发的 API uni.showActionSheet 非预期修改页面标题的 Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22335)
* Web平台 修复 CSS rpx 750rpx会受微信字体影响导致占不了满屏 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23250)
* Web平台 修复 运行调试 pages.json使用国际化后，无法运行到浏览器 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14433)
* App平台 新增 API uni.setInnerAudioOption 支持speakerOn、obeyMuteSwitch等参数 [文档](https://doc.dcloud.net.cn/uni-app-x/api/create-inner-audio-context.html#setinneraudiooption-兼容性) <https://issues.dcloud.net.cn/pages/issues/detail?id=22476>
* App平台 新增 API uni.getBackgroundAudioManager 支持 offPlay、offPause、offStop 等取消监听相关方法 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-background-audio-manager.html#offcanplay) <https://issues.dcloud.net.cn/pages/issues/detail?id=23448>
* App平台 升级 组件 web-view 使用 uts 标准组件模式重构 [文档](https://doc.dcloud.net.cn/uni-app-x/component/web-view.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=23174>
* App平台 修复 CSS align-items 设置min-width后, align-items: center 不起作用 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23067)
* Android平台、iOS平台 新增 CSS border-radius 支持百分比 [文档](https://doc.dcloud.net.cn/uni-app-x/css/border-radius.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=25460>
* Android平台、iOS平台 新增 发行 云端打包支持配置应用名称国际化 [文档](https://doc.dcloud.net.cn/uni-app-x/i18n.html#manifest) <https://issues.dcloud.net.cn/pages/issues/detail?id=24944>
* Android平台、iOS平台 修复 CSS background 设置为 none 时可能不会设置背景透明 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23350)
* Android平台、iOS平台 升级 组件 rich-text 使用 uts 标准组件模式重构 [文档](https://doc.dcloud.net.cn/uni-app-x/component/rich-text.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=24578>
* Android平台 新增 API uni.previewImage 未设置 longPressActions 默认长按行为为保存到系统相册 [文档](https://doc.dcloud.net.cn/uni-app-x/api/preview-image.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=25441>
* Android平台 调整 组件 全局事件 touch 事件的 preventDefault 仅在当前事件周期内生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23412)
* Android平台 修复 ref和reactive后的UTSJSONObject不支持.操作符访问第一层数据 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15846)
* Android平台 修复 组件 scroll-view 嵌套时设置子scroll-view 的 direction 属性值为 none 会导致父 scroll-view 无法滚动 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21662)
* Android平台 修复 组件 list-view 子节点为多根节点的封装组件时，更新子节点报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17610&ask_id=208416)
* Android平台 修复 4.85版本引发的 组件 waterflow 在 swiper 组件中使用会出现加载更多报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23912)
* Android平台 修复 组件 text 在 list-view 组件中使用 text 嵌套会导致 tap/click 事件无法触发 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22215)
* Android平台 修复 组件 button 设置 border 样式无效果 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18878)
* Android平台 修复 组件 input 设置 type 为 none 时部分情况获取焦点依然弹出软键盘 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23856)
* Android平台 修复 组件 textarea 设置 confirm 事件后点击软键盘的`换行`会失去焦点 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21759)
* Android平台 修复 组件 image 使用 svg 格式图片可能显示不正常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22591)
* Android平台 修复 组件 video 播放部分视频源可能没有声音 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16434)
* Android平台 修复 组件 camera 设置默认使用前置摄像头无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22248)
* Android平台 修复 组件 camera 部分情况可能引起内存泄漏 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22660)
* Android平台 修复 组件 camera 设置 mode 为 scanCode 模式时双击返回桌面可能引起应用崩溃 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=24239)
* Android平台 修复 4.31版本引发的 API getCurrentPages 可能报 `expected 'UTSArray<UniPage>', actual 'UTSArray<UniNormalPage>'`异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23798)
* Android平台 修复 API uni.arrayBufferToBase64 转换使用 slice 方法截取获得的 arrayBuffer 数据输出内容为空字符串 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20232)
* Android平台 修复 API uni.addInterceptor `return false` 无法阻止 API 执行 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23133)
* Android平台 修复 API navigator 页面跳转失败时未输出具体错误信息 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22667)
* Android平台 修复 API uni.redirectTo 跳转页面引起内存泄漏 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22277)
* Android平台 修复 API dialogPage uni.setNavigationBarColor 无法修改 dialogPage 状态栏前景色 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21804)
* Android平台 修复 API dialogPage 在 tabBar 页面中打开时获取区域信息不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23928)
* Android平台 修复 API uni.getBoundingClientRectAsync 获取元素信息在部分情况可能不准确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=24033)
* Android平台 修复 API uni.request 请求 gzip 资源时不会自动解压数据 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21720)
* Android平台 修复 API uni.downloadFile 偶发下载无响应 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25489)
* Android平台 修复 API uni.scanCode 选择图片可能出现识别二维码失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20833)
* Android平台 修复 API uni.chooseImage 在部分设备会出现顶部菜单被系统状态栏档住 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22709)
* Android平台 修复 API uni.chooseImage 部分情况可能引起内存泄漏 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=24195)
* Android平台 修复 API uni.getBackgroundAudioManager 调用 pause/stop 方法后系统音频控制面板中播放状态没有改变 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=24065)
* Android平台 修复 API uni.getRecorderManager 设置采样率sampleRate为16000不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25204)
* Android平台 修复 API uni.getFileSystemManager 调用 unzip 方法解压部分压缩文件失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21458)
* Android平台 修复 API uni.getFileSystemManager 调用 write 方法可能出现 java.io.IOExcePtion:Bad file descriptor 错误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=24228)
* Android平台 修复 API uni.getFileSystemManager 调用 write 方法写入长字符串可能引起失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=24946)
* Android平台 修复 API uni.getLocation 无法获取 speed 速度信息 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23828)
* Android平台 修复 CSS scss margin简写报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23316)
* Android平台 修复 CSS overflow 设置为 visible 时超出父元素范围时可能显示异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22823)
* Android平台 修复 CSS overflow 在部分情况可能导致事件触发混乱 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22897)
* Android平台 修复 CSS overflow 设置为 hidden 时父元素的 border 可能会被覆盖 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23497)
* Android平台 修复 CSS transition 设置 box-shadow 后 background-color 动画可能不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20603)
* Android平台 修复 DOM API UniElement animate 动画 iterations 设置为 1 时执行 2 次动画 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22132)
* Android平台 修复 DOM API UniElement querySelectorAll 返回值可能为 null [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25589)
* Android平台 修复 发行 应用市场合规检测可能报 Glide Mocks SDK 在同意隐私政策前读取图片头信息的位置信息 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25539)
* Android平台 修复 发行 调用 UniAppXApplication.onCreate 方法可能无响应 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21926)
* iOS平台 新增 match-media 组件 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25783)
* iOS平台 新增 API uni.createInnerAudioContext 支持 obeyMuteSwitch 控制是否遵循系统静音开关 [文档](https://doc.dcloud.net.cn/uni-app-x/api/create-inner-audio-context.html#createinneraudiocontext-%E5%85%BC%E5%AE%B9%E6%80%A7) <https://issues.dcloud.net.cn/pages/issues/detail?id=25457>
* iOS平台 升级 API uni.getUniVerifyManager 更新使用的 个验SDK 为 3.1.3.0 版 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-univerify-manager.html#getuniverifymanager) <https://issues.dcloud.net.cn/pages/issues/detail?id=24273>
* iOS平台 新增 发行 支持配置 uts插件 的 Bundle Identifier [文档](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-plugin.html#iosconfigjson) <https://issues.dcloud.net.cn/pages/issues/detail?id=23555>
* iOS平台 修复 vue 持续渲染场景下 onReady 不触发导致渲染异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25459)
* iOS平台 修复 组件 Click 事件 持续渲染场景下点击事件不响应 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25381)
* iOS平台 修复 组件 scroll-view 开启下拉刷新时设置 refresher-default-style为 none 时无刷新效果 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25593)
* iOS平台 修复 组件 nested-scroll 嵌套在 swiper 组件中时切换不同子滚动视图可能无法滚动 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23850)
* iOS平台 修复 组件 rich-text 不支持自定义node节点（含超长链接）自动换行 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23897)
* iOS平台 修复 组件 video 竖屏全屏时返回键被安全区域遮挡无法点击 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25323)
* iOS平台 修复 组件 camera 退出页面时可能引起应用崩溃 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19701)
* iOS平台 修复 4.84版本引发的 API uni.showModal 参数 showCancel 默认值失效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25411)
* iOS平台 修复 4.62版本引发的 API uni.setAppTheme 重启应用后无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25244)
* iOS平台 修复 API uni.downloadFile 使用 encoding 编码后的地址会引起失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23369)
* iOS平台 修复 API uni.connectSocket 设置 header 属性值可能出现异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22639)
* iOS平台 修复 API uni.createPushMessage 设置 cover 属性覆盖消息无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21635)
* iOS平台 修复 发行 设置 CFBundleName 未生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23236)
* 鸿蒙平台 新增 组件 image 支持 base64 svg [文档](https://doc.dcloud.net.cn/uni-app-x/component/image.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=22096>
* 鸿蒙平台 新增 API uni.share 支持 openCustomerServiceChat 打开客服功能 [文档](https://doc.dcloud.net.cn/uni-app-x/api/share.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=23388>
* 鸿蒙平台 修复 组件 text 动态改变text组件的line-height与letter-spacing，界面文本不更新 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22636)
* 鸿蒙平台 修复 组件 button disabled为true时click事件仍然生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25877)
* 鸿蒙平台 修复 组件 input 输入框有内容时聚焦，光标位置不在内容最后 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21990)
* 鸿蒙平台 修复 4.87版本引发的 组件 input 聚焦时设置 focus 属性为 true 无法弹出软键盘问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23198)
* 鸿蒙平台 修复 组件 switch 设置属性后导致页面中 image 加载失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22158&ask_id=212321)
* 鸿蒙平台 修复 4.75版本引发的 组件 textarea 输入内容后高度异常问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22666)
* 鸿蒙平台 修复 组件 textarea UniInputEvent.detail 丢失 cursor 属性 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22816)
* 鸿蒙平台 修复 组件 textarea style 设置 padding 效果异常问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23131)
* 鸿蒙平台 修复 组件 canvas measureText测量的文本宽度不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22568)
* 鸿蒙平台 修复 API uni.createSelectorQuery 组件使用transform:rotate(180deg)旋转，鸿蒙系统下使用uni.createSelectorQuery获取组件信息不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21879)
* 鸿蒙平台 修复 API uni.request 方法返回data是一个空字符串时报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25391)
* 鸿蒙平台 修复 API uni.request 鸿蒙HEAD请求报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25573)
* 鸿蒙平台 修复 API uni.getNetworkType 调用失败错误原因不清晰 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=24521)
* 鸿蒙平台 修复 API uni.chooseVideo chooseVideo、chooseMedia选择视频文件时返回的size单位错误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21825)
* 鸿蒙平台 修复 API uni.getBackgroundAudioManager onEnded回调函数里再次调用play无法播放音频 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=24202&ask_id=217454)
* 鸿蒙平台 修复 API uni.getFileSystemManager saveFile、saveFileSync 在保存相册图片时失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22877)
* 鸿蒙平台 修复 API uni.getUniVerifyManager 自定义一键登录报错 -20100 传入参数错误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25019&ask_id=216771)
* 鸿蒙平台 修复 API uni.share 微信分享图文时获取图片ArrayBuffer错误导致分享失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23072&ask_id=215215)
* 鸿蒙平台 修复 DOM API DrawableContext 鸿蒙 Next fillRect 报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20101)
* 鸿蒙平台 修复 运行调试 自动申请调试证书在DevEco Studio 6.0.2版本失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25354)
* 鸿蒙平台 修复 4.75版本引发的 发行 鸿蒙应用商店上架审核出现稳定性问题导致不通过 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23001)
* 微信小程序平台 修复 4.76版本引发的 v-for + slot 组合会生成多余的空白 slot 标签的 Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22609)
* 微信小程序平台 修复 编译器 命名插槽多根节点时flex样式丢失的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25934)
##### uts插件
* Android平台 优化 JSON.parse / UTSJSONObject 性能 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/json.html#json) <https://issues.dcloud.net.cn/pages/issues/detail?id=18524>
* Android平台 新增 UniActivityCallback 支持 onPictureInPictureModeChanged [文档](https://doc.dcloud.net.cn/uni-app-x/uts/utsactivitycallback.html#onPictureInPictureModeChanged) <https://issues.dcloud.net.cn/pages/issues/detail?id=19844>
* Android平台 优化 部分情况剩余参数告警 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21998)
* Android平台 优化 代码中存在没有意义的比较时忽略: Condition is always的警告 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23138)
* Android平台 优化 type中属性的值如果是type，并且不存在该type时编译器报错信息无法回到原始位置 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=24855)
* Android平台 修复 使用大的json文件时编译器提示Method too large [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25095)
* Android平台 修复 UTSJSONObject中key不能携带`.` [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=24734)
* Android平台 修复 Date 对象某些时间可能计算错误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25882)
* Android平台 修复 UniActivityKeyEventCallback 的 onKeyDown 无法拦截默认按钮事件 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25575&ask_id=216940)
* iOS平台 新增 支持配置 Swift Package Manager（SPM）依赖 [文档](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-ios-spms.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=22374>
* iOS平台 修复 uni-app兼容模式组件仅包含app-ios平台时，云打包未包含该组件 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25830)
* iOS平台 修复 云端打包部分情况可能没有包含uts插件配置 CocoaPods 依赖的动态库 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25686)

#### 4.87.2025112602-alpha
##### uni-app x
* iOS平台 修复 4.76版本引发的 CSS 某些情况下部分属性可能不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23230)

#### 4.86.2025110715-alpha
##### uni-app x
* Web平台 修复 4.81版本引发的 API dialogPage 中使用 mapContext 异常的 Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23233)
* iOS平台 修复 4.81版本引发的 组件 list-view 频繁拖动加载更多数据可能引起崩溃 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22861)
* iOS平台 修复 API uni.request 访问某些 url 地址可能引起崩溃 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21823)

#### 4.84.2025102304-alpha
##### uni-app x
* iOS平台 新增 组件 web-view 支持 disable-user-select-menu 设置是否禁用文本选择时弹出系统菜单 [文档](https://doc.dcloud.net.cn/uni-app-x/component/web-view.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=21728>

#### 4.83.2025101713-alpha
##### uni-app x
* Android平台、iOS平台 更新 uni-ad 腾讯优量汇SDK Android为 4.660.1530 版；快手广告和快手内容联盟SDK Android为 4.9.20.1 版，iOS为 4.9.20.1 版；穿山甲&GroMore SDK Android为 7.1.3.2 版，iOS为 7.2.0.0 版；Sigmob广告联盟SDK Android为 4.24.7 版，iOS为 4.20.3 版；百度百青藤广告SDK iOS为 10.02 版；章鱼广告SDK Android为 2.5.10.5 版，iOS为 2.5.10.10 版；泛连广告SDK Android为 2.8.8 版，iOS为 2.8.8.0.0 版；华夏乐游SDK Android为 3.14.9 版，iOS为 2.16.0 版；AdScope倍孜广告SDK Android为 5.2.2.0 版；Google AdMob SDK Android 为 24.6.0 版；Mintegral SDK Android为 16.9.91.1 版；Pangle SDK Android为 7.6.0.3 版；Unity SDK Android为 4.16.1 版；Liftoff SDK Android为 7.5.1.0 版；InMobi SDK Android为 10.8.7.1 版；IronSource SDK Android为 9.0.0.0 版；Applovin SDK Android为 13.4.0.0 版本；支持双十一预算 [文档](https://doc.dcloud.net.cn/uni-app-x/api/create-rewarded-video-ad.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=22382>
* Android平台 修复 4.81版本引发的 组件 input 部分情况下键盘遮挡异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22088)
* iOS平台 新增 API uni.getDeviceInfo 返回的 deviceModel 支持 iPhone 17、iPhone 17 Pro、iPhone17ProMax、iPhoneAir 等设备型号 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-device-info.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=22381>
* 鸿蒙平台 修复 页面上存在多个 scroll-view 导致点击失效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19008)

#### 4.82.2025093004-alpha
##### uni-app x
* Android平台 修复 4.81版本引发的 组件 image svg 格式图片不会跟随组件尺寸变化 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21790)
* Android平台 修复 4.81版本引发的 组件 canvas 在 Android5 设备运行报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22008)
* Android平台 修复 4.81版本引发的 CSS line-height 属性不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21819)
* iOS平台 更新 uni-ad 优量汇SDK 为 4.15.60 版 [文档](https://doc.dcloud.net.cn/uni-app-x/component/ad.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=21887>
* iOS平台 修复 4.81版本引发的 发行 提交 AppStore 审核报"二进制文件无效"，提示`ITMS-91065: Missing signature - Your app includes “Frameworks/SDWebImage.framework/SDWebImage”` [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21949)
* iOS平台 修复 组件 input 在 scrollView 中获取焦点弹起键盘遮挡输入框时，点击 webview 自动收起键盘后界面异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21902)
* iOS平台 修复 组件 video 在 iOS15 及以上系统播放时静音，开始播放后无法通过音量键调大音量 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2860)

#### 4.81.2025091909-alpha
##### uni-app x
* 【重要】新增 API uni.createWorker 支持 Worker 线程 [文档](https://doc.dcloud.net.cn/uni-app-x/api/create-worker.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=19898>
* Web平台 新增 组件 textarea 支持 change 事件 [文档](https://doc.dcloud.net.cn/uni-app-x/component/textarea.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=20815>
* Web平台 修复 API dialogPage openDialogPage 某些情况打开错误页面 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19676)
* Web平台 修复 API uni.request 响应体尝试JSON.parse失败后未返回原始响应体 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19687)
* Android平台、iOS平台 新增 uni-AD 国外广告 支持 AppLovin 渠道 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-modules.html#uni-ad) <https://issues.dcloud.net.cn/pages/issues/detail?id=20516>
* Android平台、iOS平台 更新 uni-AD 优量汇SDK Android为4.650.1520版，iOS为4.15.50版；快手SDK Android为4.6.30.1版，iOS为4.6.30.1版；华夏乐游SDK Android为3.12.2版，iOS为2.14.0版；Sigmob Android SDK为4.24.4版 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-modules.html#uni-ad) <https://issues.dcloud.net.cn/pages/issues/detail?id=19871>
* Android平台、iOS平台 新增 CSS white-space 支持 pre、preLine、preWrap、breakSpaces 属性值 [文档](https://doc.dcloud.net.cn/uni-app-x/css/white-space.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=20454>
* Android平台、iOS平台 新增 组件 image 支持 svg 格式图片 [文档](https://doc.dcloud.net.cn/uni-app-x/component/image.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=6560>
* Android平台、iOS平台 新增 组件 live-player 支持实时音视频播放 [文档](https://doc.dcloud.net.cn/uni-app-x/component/live-player.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=21339>
* Android平台、iOS平台 新增 组件 live-pusher 支持实时音视频录制 [文档](https://doc.dcloud.net.cn/uni-app-x/component/live-pusher.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=21340>
* Android平台、iOS平台 新增 组件 ad 支持展示视频广告 [文档](https://doc.dcloud.net.cn/uni-app-x/component/ad.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=19926>
* Android平台、iOS平台 新增 API uni.onNetworkStatusChange 监听网络状态变化 [文档](https://doc.dcloud.net.cn/uni-app-x/api/network-status-change.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=20054>
* Android平台、iOS平台 新增 API locationChange 支持 uni.onLocationChange、uni.startLocationUpdate、uni.startLocationUpdateBackground 等用于监听位置变化信息 [文档](https://doc.dcloud.net.cn/uni-app-x/api/location-change.html#onlocationchange) <https://issues.dcloud.net.cn/pages/issues/detail?id=16595>
* Android平台、iOS平台 新增 发行 UniAppXSDK.start方式启动应用 [文档](https://doc.dcloud.net.cn/uni-app-x/native/use/iosapi.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=18560>
* Android平台、iOS平台 修复 组件 canvas 使用 takeSnapshot 截图会存在默认背景色，无法截出背景透明图片 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20169)
* Android平台、iOS平台 修复 API uni.uploadFile 不传 file 字段报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19511)
* Android平台、iOS平台 修复 API uni.scanCode 相册选择图标可能被遮挡 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19121)
* Android平台、iOS平台 修复 CSS 使用不支持的 @media css 规则控制台无告警，编译产物不符合预期 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19396)
* Android平台、iOS平台 修复 DOM API CSSStyleDeclaration Android在 transitionend 中修改元素的属性会一直执行 transitionend 事件；iOS设置元素的高度为 auto时，元素看不到了 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19405)
* 【重要】Android平台 适配 Google Play 要求应用支持 16KB 内存页面大小 [文档](https://doc.dcloud.net.cn/uni-app-x/tutorial/android-16kb.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=19117>
* Android平台 新增 组件 camera 支持 photo-resolution 属性设置拍照图片分辨率 [文档](https://doc.dcloud.net.cn/uni-app-x/component/camera.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=20679>
* Android平台 新增 组件 web-view 支持 disable-user-select-menu 设置是否禁用文本选择时弹出系统菜单 [文档](https://doc.dcloud.net.cn/uni-app-x/component/web-view.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=21581>
* Android平台 新增 API uni.request 补充 json解析类型失败的错误码 [文档](https://doc.dcloud.net.cn/uni-app-x/api/request.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=20329>
* Android平台 新增 API uni.getLocation 更新 腾讯定位SDK 为 7.6.1.3 版 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-location.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=21586>
* Android平台 新增 API uni.requestPayment 更新 支付宝SDK 为 15.8.38 版 [文档](https://doc.dcloud.net.cn/uni-app-x/api/request-payment.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=21576>
* Android平台 新增 API push uni-push 支持 FCM [文档](https://doc.dcloud.net.cn/uni-app-x/api/uni-push.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=18885>
* Android平台 新增 DOM API UniTextElement 支持 UniTextLayout 文本测量 [文档](https://doc.dcloud.net.cn/uni-app-x/dom/unitextelement.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=20365>
* 修复 编译器 部分场景下编译器报错之后，错误信息中不包含uvue、uts [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21129)
* 修复 编译器 async函数嵌套使用时部分情况下编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19670&ask_id=209218)
* 修复 4.61版本引发的 编译器 部分情况下自动补充的类型信息不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21143)
* Android平台 修复 vue 通过type定义的带泛型的对象类型不支持响应式 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19971)
* Android平台 修复 vue defineProps传入复杂嵌套type类型编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21325)
* Android平台 修复 组件 scroll-view 嵌套 textarea 组件后无法滚动 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15280)
* Android平台 修复 组件 nested-scroll-body 存在动态加载元素时滚动视图可能会自动滚动 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19617)
* Android平台 修复 组件 waterflow load-more 插槽显示异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20342)
* Android平台 修复 组件 share-element 中 swiper 组件 circular 设置为 true 时无共享元素效果 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19506)
* Android平台 修复 组件 input maxlength 属性首次渲染时无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7709)
* Android平台 修复 组件 input 光标移动异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11324)
* Android平台 修复 组件 input auto-focus 与 focus 属性冲突时效果异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16717)
* Android平台 修复 组件 input v-model.number 时无法正确清空内容问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19584)
* Android平台 修复 组件 input v-model.number 输入小数点后非预期补零问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19585)
* Android平台 修复 组件 input 使用v-model的同时绑定一个无参input函数编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19799)
* Android平台 修复 组件 video 在安卓7设备播放 webm 视频没有背景音乐 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=9856)
* Android平台 修复 组件 video 自动播放结束后中间会出现一个刷新的图标 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14227)
* Android平台 修复 组件 camera 组件滑动时渲染异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20436)
* Android平台 修复 API uni.showModal 成功回调中调用 uni.navigateBack 报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19068)
* Android平台 修复 API uni.uploadFile 增加 User-Agent 请求头无法覆盖默认值 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19825)
* Android平台 修复 API uni.getSystemInfoSync 返回的 appLanguage 值异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18926)
* Android平台 修复 API uni.getClipboardData 在页面生命周期 onShow 中可能无法获取数据 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19482&ask_id=211227)
* Android平台 修复 API uni.scanCode 扫码有概率发生闪退 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19093)
* Android平台 修复 API uni.scanCode 部分设备多码选择画面异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19573)
* Android平台 修复 API uni.getRecorderManager 生成的 WAV 格式文件大小不对 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20035)
* Android平台 修复 API uni.getFileSystemManager 调用 getFileInfo 传入 uni.chooseFile 返回的地址无法获取文件信息 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19993)
* Android平台 修复 API uni.getFileSystemManager 复制大文件报内存超限的错误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20265)
* Android平台 修复 API uni.getFileSystemManager 调用 open 打开项目中 static 目录下的文件报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21074)
* Android平台 修复 4.25版本引发的 API uni.getLocation 缺失权限时报错信息不准确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19257)
* Android平台 修复 API uni.createPushMessage 部分情况点击推送消息无法拉起App [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20088)
* Android平台 修复 API uni.createCameraContext takePhoto 时间过长 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20512)
* Android平台 修复 CSS vue style 中直接定义 css 变量导致应用编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20359)
* Android平台 修复 CSS overflow 设置为 visible 时事件分发异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8932)
* Android平台 修复 CSS text-shadow 设置为 rgb 颜色时可能不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21125)
* Android平台 修复 CSS var自定义变量 设置 border-style 从 solid 切换为 dashed 时颜色不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20488)
* Android平台 修复 运行调试 自定义基座真机运行调用uts插件可能抛 stub 异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19968)
* iOS平台 新增 API uni.setInnerAudioOption 支持配置音频是否可与其他音频混播 [文档](https://doc.dcloud.net.cn/uni-app-x/api/create-inner-audio-context.html#setinneraudiooption) <https://issues.dcloud.net.cn/pages/issues/detail?id=19401>
* iOS平台 新增 API uni.getUniVerifyManager 更新 个验SDK 为3.1.1.0 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-univerify-manager.html#getuniverifymanager) <https://issues.dcloud.net.cn/pages/issues/detail?id=21559>
* iOS平台 新增 DOM API UniElement 元素暴露 click 方法 [文档](https://doc.dcloud.net.cn/uni-app-x/dom/unielement.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=20824>
* iOS平台 更新 uni-AD Google AdMob SDK iOS 为 12.9.0 版；Pangle SDK 为 7.6.0.0 版；Unity SDK 为 4.16.0 版；Liftoff SDK 为 7.5.2 版；InMobi SDK 为 10.8.6 版；IronSource SDK 为 8.10.0 版；Meta SDK 为 6.20.1 版；Mintegral SDK 为 7.7.9 版 [文档](https://doc.dcloud.net.cn/uni-app-x/api/create-rewarded-video-ad.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=20515>
* iOS平台 修复 4.75版本引发的 manifest.json 设置defaultAppTheme以及uniStatistics可能无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20575)
* iOS平台 修复 组件 view 默认的view没触发touch导致input的键盘无法收起 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19504)
* iOS平台 修复 组件 swiper 组件circular=true时往左第一次不执行change事件 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19208)
* iOS平台 修复 4.71版本引发的 组件 waterflow 通过 v-if 切换闪退 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21415)
* iOS平台 修复 组件 button 组件无法设置字体颜色 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19317)
* iOS平台 修复 4.55版本引发的 组件 button 取消自定义button style后，button无法恢复默认样式 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20523)
* iOS平台 修复 组件 slider 更新slider阴影效果，和其他端保持一致 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21533)
* iOS平台 修复 组件 video 开启静音且将音量设置为0，进入视频播放页播放视频此时调整声音视频声音也不会出来 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20750)
* iOS平台 修复 组件 canvas 样式opacity设为0时takeSnapshot函数截屏空白 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20294)
* iOS平台 修复 组件 web-view ios端，webview的网页中如果给iframe设置了链接，则uni向 webview发送消息就会收不到 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19858)
* iOS平台 修复 组件 web-view webview里的loading事件，经过测试发现在ios上会多次触发 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20090)
* iOS平台 修复 API uni.setTabBarItem 在pages.json中tabBar.list的item设置visible=false，在ios中动态调用uni.setTabBarItem({index:0,visible:ture})显示空白但有占位，安卓端正常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20388)
* iOS平台 修复 4.72版本引发的 API uni.pageScrollTo 设置相同值时只会执行一次 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20664)
* iOS平台 修复 4.71版本引发的 API uni.request onChunkReceived 导致的偶发crash [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20476)
* iOS平台 修复 API uni.previewImage 设置current不生效，不管填入的是几，都从第一个开始预览 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20411)
* iOS平台 修复 API push uni-push 后台服务器故障排查中点击`一键检测`引起应用闪退 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16228)
* iOS平台 修复 API uni.createPushMessage createPushMessage创建的通知点击异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16230)
* iOS平台 修复 4.76版本引发的 CSS position fixed 可能不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21144)
* iOS平台 修复 CSS border 给 scroll-view 设置 border ios 样式存在问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18797)
* iOS平台 修复 CSS text-shadow 使用 rgb/rgba 色值无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16989)
* iOS平台 修复 4.71版本引发的 CSS var自定义变量 默认值缺省时样式不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20486)
* iOS平台 修复 DOM API UniElement takeSnapshot 对 web-view 组件截图时会出现页面回滚至顶端的现象 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19449)
* iOS平台 修复 DOM API UniElement takeSnapshot 方法不触发 complete 回调 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21138)
* iOS平台 修复 4.61版本引发的 发行 IOS云打包的APP，无法读取static目录下文件内容 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20141)
* 鸿蒙平台 新增 组件 waterflow 支持waterflow及flow-item组件 [文档](https://doc.dcloud.net.cn/uni-app-x/component/waterflow.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=20812>
* 鸿蒙平台 新增 组件 switch 支持 disable 样式 [文档](https://doc.dcloud.net.cn/uni-app-x/component/switch.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=21521>
* 鸿蒙平台 新增 API 启动 获取应用启动参数 [文档](https://doc.dcloud.net.cn/uni-app-x/api/launch.html#getlaunchoptionssync) <https://issues.dcloud.net.cn/pages/issues/detail?id=19242>
* 鸿蒙平台 新增 API uni.login 支持微信登录 [文档](https://doc.dcloud.net.cn/uni-app-x/api/sign-in.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=20344>
* 鸿蒙平台 新增 API uni.share 支持微信分享 [文档](https://doc.dcloud.net.cn/uni-app-x/api/share.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=20343>
* 鸿蒙平台 新增 DOM API UniElement .focus、UniElement.blur 方法 [文档](https://doc.dcloud.net.cn/uni-app-x/dom/unielement.html#focus) <https://issues.dcloud.net.cn/pages/issues/detail?id=20940>
* 鸿蒙平台 新增 uni统计 for uni-app x [文档](https://uniapp.dcloud.net.cn/uni-stat-uniappx.html)
* 鸿蒙平台 修复 组件 Touch 事件 鸿蒙长按返回上一页如果不及时松开手指松开手指的时候会退出app [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19300)
* 鸿蒙平台 修复 组件 swiper 设置 :disable-touch="true" 无法禁止滑动问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20820)
* 鸿蒙平台 修复 组件 list-view list-item组件包含自动高度的image时image组件位置错乱 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20688)
* 鸿蒙平台 修复 组件 image 不支持unifile://协议路径 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20701)
* 鸿蒙平台 修复 组件 video 在平板上小窗全屏/非全屏切换时宽度不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19935)
* 鸿蒙平台 修复 组件 video 在 dialogPage 中全屏状态不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21359&ask_id=209965)
* 鸿蒙平台 修复 组件 web-view 鸿蒙应用访问页面始终为 pc 模式 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21311)
* 鸿蒙平台 修复 组件 web-view onLoading 在页面加载时触发多次 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21762)
* 鸿蒙平台 修复 鸿蒙上架检查，报应用在运行中出现JsCrash异常，存在设备运行崩溃问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20697&ask_id=202068)
* 鸿蒙平台 修复 API uni.chooseImage 选择 gif 图片并且不勾选原图后不显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19771&ask_id=211396)
* 鸿蒙平台 修复 API uni.compressImage 压缩的图片会变形 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20928)
* 鸿蒙平台 修复 API uni.chooseMedia 鸿蒙从相册或者拍摄选择视频时不进入回调的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18478)
* 鸿蒙平台 修复 API uni.getPushClientId 鸿蒙系统无法获取cid [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18024)
* 鸿蒙平台 修复 CSS background 动态 class 切换渐变背景色, 渐变背景色无法移除 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19037)
* 鸿蒙平台 修复 CSS color 使用iconfont时，切换颜色无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20693)
* 鸿蒙平台 修复 CSS color 概率性样式丢失 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20914)
* 鸿蒙平台 修复 CSS box-shadow 属性值 rgba 中存在空格时，样式异常问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19558)
* 鸿蒙平台 修复 CSS pointer-events 父组件设置pointer-events: none对子组件不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20923)
* 鸿蒙平台 修复 DOM API UniElement .animate iterations 设置为 Infinity 时动画只执行一次问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17615)
* 鸿蒙平台 修复 DOM API UniElement .takeSnapshot 不触发 complete 回调问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20929)
* 微信小程序平台 修复 CSS overflow 多子节点scoped slot额外添加的view有overflow:hidden样式导致内容不显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21223)
* 更新 uni-recycle-view 组件至2.0.0版本，滚动更流畅 [详情](https://ext.dcloud.net.cn/plugin?id=17385)
##### uts插件
* Web平台、iOS平台、微信小程序平台 修复 对象属性中如果包含??导致对象类型变更为object，无法使用getString等属性 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20323)
* Android平台、iOS平台 修复 字符串或模板字符串部分字符编译失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19131)
* Android平台、iOS平台 修复 4.75版本引发的 type类型嵌套部分情况下编译失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20724)
* 【重要】Android平台 新增 kotlin 版本升级2.2.0 [文档](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-for-android.html#kotlin2-%E5%8D%87%E7%BA%A7%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9) <https://issues.dcloud.net.cn/pages/issues/detail?id=20278>
* Android平台 修复 安卓端  | 和 >>> 运算符 在部分场景下与web不一致的问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17838)
* Android平台 修复 使用符号.作为key会引发无法获取值 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19443)
* Android平台 修复 watch方法中包含的async方法抛出的异常信息不够准确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19436)
* Android平台 修复 4.61版本引发的 在 uni-app 项目中 uts插件调用 uni.showModal 不展示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19773)
* iOS平台 新增 重构实现正则引擎，解决部分正则表达式与web表现不一致的问题 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/regexp.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=21001>
* iOS平台 新增 支持 currentThreadContext 获取当前线程信息、executeOnThread 指定线程执行任务和指定 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/utsios.html#utsios) <https://issues.dcloud.net.cn/pages/issues/detail?id=20466>
* iOS平台 修复 插件依赖的 pod 库包含 PrivacyInfo.xcprivacy 文件时云端打包失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20585)
* 鸿蒙平台 新增 支持uts付费插件 [文档](https://uniapp.dcloud.net.cn/plugin/publish.html#uts) <https://issues.dcloud.net.cn/pages/issues/detail?id=21368>
* 鸿蒙平台 修复 页面或组件内的对象字面量as为uts插件内导出的type时可选属性丢失 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20157)

#### 4.76.2025073103-alpha
##### uni-app x
* iOS平台 更新 API uni.requestPayment 微信支付 使用的微信 SDK 为 2.0.5 版 [文档](https://doc.dcloud.net.cn/uni-app-x/api/request-payment.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=19870>
* iOS平台 修复 pages.json tabBar 设置 text 内容为泰语显示异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16947)
* iOS平台 修复 组件 input 通过 v-model 绑定变量更新 value 不触发 @change 事件 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19615)
* iOS平台 修复 组件 textarea 添加 value 属性后 textAlign 不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19706)
* iOS平台 修复 API uni.chooseImage 选择照片时弹出系统提示  是否选择更多照片 或者 保留当前所选内容 时，选择 保留当前所选内容 后再次点击+号添加更多图片引发崩溃 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19763)
* iOS平台 修复 API uni.chooseMedia 点击“取消”按钮关闭正常触发 fail 回调，下拉手势关闭没有触发 fail 回调 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19026)
* iOS平台 修复 API uni.getBackgroundAudioManager 背景音频播放结束事件 onEnded 回调中播放下一曲无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17691)
* iOS平台 修复 4.71版本引发的 CSS 某些情况可能不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19746)

#### 4.75.2025070414-alpha
##### uni-app x
* Android平台 修复 组件 text 优化部分text嵌套时行高不正确的情况 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7529)
* Android平台 修复 API uni.getBackgroundAudioManager 可能会重复下载音乐封面图 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19233)
* iOS平台 修复 组件 video 播放 m3u8 大部分情况没有声音 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17292)
* 鸿蒙平台 修复 组件 web-view 没有给定默认高度的 Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19014)
* 鸿蒙平台 修复 组件 rich-text 当内容包含 "#" 时，"#" 后内容不解析的 Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19320)

#### 4.74.2025063012-alpha
##### uni-app x
* Android平台 修复 4.72版本引发的 vue getCurrentInstance().proxy.$page获取当前页面，某些时机报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17704)
* Android平台 修复 4.71版本引发的 组件 rich-text mode 为 web 时暗黑模式下可能显示异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19239)
* Android平台 修复 4.73版本引发的 组件 input 遮挡时上推高度异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19211)
* Android平台 修复 API dialogPage tabBar 页面 showDialogPage，切换 tabBar 后 dialogPage 无法关闭 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16059)
* Android平台 修复 4.73版本引发的 API uni.loadFontFace loadFontFace 失败问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19214)

#### 4.73.2025062714-alpha
##### uni-app x
* Web平台、Android平台 修复 API dialogPage .route 路径格式错误问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18727)
* Web平台、iOS平台、鸿蒙平台 修复 API uni.openDialogPage url 参数使用相对路径时报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18736)
* Web平台、小程序平台 修复 编译器 main.uts文件最后一行是单行注释时应用启动白屏 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18520)
* App平台 新增 组件 input type 属性支持 none/search/email/url 等类型 [文档](https://doc.dcloud.net.cn/uni-app-x/component/input.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=16245>
* App平台 新增 组件 textarea change 事件 [文档](https://doc.dcloud.net.cn/uni-app-x/component/textarea.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=16614>
* Android平台、iOS平台 新增 组件 textarea 组件支持@confirm [文档](https://doc.dcloud.net.cn/uni-app-x/component/textarea.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=16642>
* Android平台、iOS平台 修复 API uni.createInnerAudioContext 与微信小程序平台 音频、背景音频 播放细节存在的差异 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18479)
* Android平台 新增 组件 textarea confirm-type 属性支持send/search/next/go/done类型 [文档](https://doc.dcloud.net.cn/uni-app-x/component/textarea.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=18616>
* Android平台 新增 API uni.createInnerAudioContext uni.setInnerAudioOption 支持配置音频能否与其他音频混播 [文档](https://doc.dcloud.net.cn/uni-app-x/api/set-inner-audio-option.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=15042>
* Android平台 修复 组件 text 文本中存在换行符“\n”时 white-space 设置为 nowrap 效果与web平台不一致 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18612)
* Android平台 修复 组件 button 组件 设置居中可能不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1957)
* Android平台 修复 组件 input keyboardheightchange 事件回调中返回的软键盘高度不准确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18750)
* Android平台 修复 组件 input 点击收起键盘时，被点击的组件点击事件无法响应 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18795)
* Android平台 修复 组件 textarea focus 事件返回的键盘高度异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16996)
* Android平台 修复 组件 video 组件竖屏全屏时自定义子组件无法正确显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18076)
* Android平台 修复 组件 video 竖屏方向进入全屏时 fullscreenchange 事件返回的 direction 属性值仍为 horizontal [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18561)
* Android平台 修复 API dialogPage 中 textarea 组件 keyboardheightchange 事件返回的键盘弹出高度错误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16513)
* Android平台 修复 API uni.showToast 自定义 image 正式打包模式下无法展示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18597)
* Android平台 修复 4.72版本引发的 API uni.loadFontFace 加载 base64 格式字体失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19017)
* Android平台 修复 API uni.scanCode 部分设备闪退 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18488)
* Android平台 修复 API uni.saveVideoToPhotosAlbum 在部分设备上保存同一个文件几十次可能会失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18861)
* Android平台 修复 API uni.getBackgroundAudioManager 在Android 13 设备上播放结束再次调用 play 报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18804)
* Android平台 修复 CSS width 父级设置横向居中，子text定位absolute时宽度受限 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11847)
* Android平台 修复 CSS overflow 设置为 visible 同时设置 box-shadow 后子元素可能被裁剪 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18136)
* Android平台 修复 CSS box-shadow 多次触发渲染导致显示尺寸不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18383)
* Android平台 修复 DOM API UniElement requestFullscreen 在fixed定位时异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18539)
* iOS平台 修复 4.72版本引发的 组件 picker 动态赋值会不准确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18923)
* iOS平台 修复 4.18版本引发的 API pullDownRefresh 页面级下拉刷新雪花状指示器颜色没有适配 app 主题色 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18637)
* iOS平台 修复 API uni.getSystemSetting 在系统开启了蓝牙的情况获取 bluetoothEnabled 值为 false [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18063)
* iOS平台 修复 CSS border-color 某些情况下 borderColor 传入特殊字符会导致边框变成白色 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18877)

#### 4.72.2025061803-alpha
##### uni-app x
* Android平台 修复 组件 text 嵌套text可能出现闪退 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18770)
* Android平台 修复 4.61版本引发的 CSS transition 动态修改style执行动画可能闪烁 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18799) [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18799)
* iOS平台 修复 4.71版本引发的 组件 scroll-view scroll-top 设置相同值时不应触发 scrollend 事件 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18773)
* iOS平台 修复 组件 text 嵌套显示多行文本时 line-height 样式不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18068)
* iOS平台 修复 组件 picker-view 切换展示时立即修改数据会引起应用闪退 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18747)
* iOS平台 修复 4.61版本引发的 API uni.getFileSystemManager readFile 和 readFileSync 方法参数 encoding 为 base64 时编码错误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18802)
* 鸿蒙平台 新增 app.uvue 支持 onExit 生命周期 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/app.html#onexit) <https://issues.dcloud.net.cn/pages/issues/detail?id=17508>
* 新增 uni-ai-x 开源的、全平台的、原生的、云端一体的ai聊天插件 [详情](https://ext.dcloud.net.cn/plugin?name=uni-ai-x)
##### uts插件
* 【重要】Android平台 修复 UTS 部分正则表现与Web平台不一致的问题，项目中使用的`PCRE`风格正则表达式需调整为标准`ECMAScript`正则表达式 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/regexp.html#regexp) <https://issues.dcloud.net.cn/pages/issues/detail?id=16951>

#### 4.71.2025061206-alpha
##### uni-app x
* 新增 vue 支持页面作为组件渲染。可用于宽屏、折叠屏适配 [文档](https://doc.dcloud.net.cn/uni-app-x/page.html#page-as-component) <https://issues.dcloud.net.cn/pages/issues/detail?id=16777>
* 新增 vue 支持通过props接收页面参数 [文档](https://doc.dcloud.net.cn/uni-app-x/page.html#page-with-props) <https://issues.dcloud.net.cn/pages/issues/detail?id=16881>
* 修复 vue `<template>`中不能直接访问uni.env [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17184)
* 新增 API 支持uniCloud.SSEChannel [文档](https://doc.dcloud.net.cn/uni-app-x/api/unicloud/sse-channel.html)
* Web平台、App平台 新增 API uni.request RequestTask 支持 onHeadersReceived、onChunkReceived 等方法。可通过POST请求AI大模型并流式接受返回 [文档](https://doc.dcloud.net.cn/uni-app-x/api/request.html#onchunkreceived) <https://issues.dcloud.net.cn/pages/issues/detail?id=17392>
* Web平台、App平台 修复 4.51版本引发的 API actionSheet 非用户交互 actionSheet 导致 actionSheet 关闭时不触发 fail 回调 [文档](https://doc.dcloud.net.cn/uni-app-x/api/action-sheet.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=17394>
* Web平台、App平台 优化 API uni.showModal content内容超长时不再截断而是滚动显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17661)
* Web平台、iOS平台、鸿蒙平台、微信小程序平台 修复 发行 v-model 指定参数类型时编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16688)
* Web平台、鸿蒙平台、微信小程序平台 新增 UniPage API 支持 width、height、statusBarHeight 等属性 [文档](https://doc.dcloud.net.cn/uni-app-x/api/unipage.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=16957>
* Web平台 修复 4.31版本引发的 编译器 hmr时可能导致应用报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17355)
* Web平台 修复 pages.json 内设置disableScroll后仍可滑动页面且控制台会报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17831)
* Web平台 新增 组件 progress 组件支持 strokeWidth 设置为rpx [文档](https://doc.dcloud.net.cn/uni-app-x/component/progress.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=17740>
* Web平台 新增 组件 web-view 组件支持load事件 [文档](https://doc.dcloud.net.cn/uni-app-x/component/web-view.html#web-view) <https://issues.dcloud.net.cn/pages/issues/detail?id=17560>
* Web平台 修复 组件 list-view 页面返回到包含list-view的页面时list-view无法保持之前的滚动位置 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16938)
* Web平台 修复 组件 textarea auto-height优先级低于样式设置的高度 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18489)
* App平台 新增 API uni.createWebviewContext 支持 loadData 方法设置字符串来显示网页 [文档](https://doc.dcloud.net.cn/uni-app-x/api/create-webview-context.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=17251>
* App平台 调整 API uni.getFileSystemManager 统一 stat、saveFile、getSavedFileList、rmdir、copyFile 实现细节 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-file-system-manager.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=17279>
* 【重要】App平台 新增 CSS 支持自定义变量 [文档](https://doc.dcloud.net.cn/uni-app-x/css/common/function.html#customvar) <https://issues.dcloud.net.cn/pages/issues/detail?id=17083>
* Android平台、iOS平台 新增 组件 rich-text 支持 mode 属性，使用 web-view 组件重构，解决各平台差异 [文档](https://doc.dcloud.net.cn/uni-app-x/component/rich-text.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=16884>
* Android平台、iOS平台 新增 组件 camera 支持 mode 属性，支持扫码 [文档](https://doc.dcloud.net.cn/uni-app-x/component/camera.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=17663>
* Android平台、iOS平台 新增 API uni.scanCode 支持扫码 [文档](https://doc.dcloud.net.cn/uni-app-x/api/scan-code.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=15407>
* Android平台、iOS平台 新增 API uni.hideKeyboard、uni.onKeyboardHeightChange、uni.offKeyboardHeightChange 操作软键盘 [文档](https://doc.dcloud.net.cn/uni-app-x/api/keyboard.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=16200>
* Android平台、iOS平台 新增 API uni.getClipboardData/uni.setClipboardData 读写系统剪贴板 [文档](https://doc.dcloud.net.cn/uni-app-x/api/clipboard.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=16591>
* Android平台、iOS平台 新增 API uni.getBackgroundAudioManager 支持 cache 属性控制音频播放是否缓存到本地 [文档](https://doc.dcloud.net.cn/uni-app-x/api/create-inner-audio-context.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=16840>
* Android平台、iOS平台 新增 API uni.openDocument 打开文档 [文档](https://doc.dcloud.net.cn/uni-app-x/api/open-document.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=16593>
* Android平台、iOS平台 修复 组件 canvas 的 context 对象画线部分函数存在内存泄漏导致应用崩溃 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17253)
* Android平台、iOS平台 新增 支持安全网络 [文档](https://doc.dcloud.net.cn/uni-app-x/api/unicloud/function.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=18154>
* Android平台、鸿蒙平台 新增 组件 match-media 安卓和鸿蒙平台支持 match-media 组件 [文档](https://doc.dcloud.net.cn/uni-app-x/component/match-media.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=18227>
* Android平台 修复 编译器 使用`<script setup>`时template中的错误部分情况无法正确回源 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18546)
* Android平台 修复 vue 响应式数组indexOf、lastIndexOf、includes方法部分情况返回值不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18527)
* Android平台 修复 vue 响应式数组调用sort方法后不触发依赖收集 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18263)
* Android平台 修复 vue app.use省略插件可选参数时运行报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15663)
* Android平台 修复 vue 在函数里面返回计算属性会报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16559)
* Android平台 修复 vue 组合式部分情况下类型推断不准确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17213)
* Android平台 修复 组件 view 切换如果有视频在里面，只能截视频其它层截不出来 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17456)
* Android平台 修复 4.51版本引发的 组件 swiper autoplay = true 且 设置了duration 动画时长，且元素个数为2时会出现一张空白的轮播图 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15860)
* Android平台 修复 4.51版本引发的 组件 swiper current 值使用计算属性时不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16302)
* Android平台 修复 组件 list-view 设置 refresher-enabled 为 false 导致嵌套滚动失效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17635)
* Android平台 修复 组件 waterflow 瀑布流设置为 1 列无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16826)
* Android平台 修复 组件 sticky-section 下 list-item 通过 DOM API 修改 style 高度后不更新 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17982)
* Android平台 修复 组件 image 未支持 uni.env 目录图片地址 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17288)
* Android平台 修复 组件 web-view 网页iframe中输入框获取焦点后可能被软键盘遮挡 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17365)
* Android平台 修复 API modal 隐藏系统底部导航栏后调用 uni.showModal/uni.showActionSheet 会显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15498)
* Android平台 修复 4.61版本引发的 API uni.showModal 部分场景不能正常弹窗 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17002)
* Android平台 修复 API uni.getRecorderManager 设置 duration 后调用 stop 函数后会继续触发 onStop 回调 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16923)
* Android平台 修复 API uni.getRecorderManager 应用关闭麦克风权限还能继续录音 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17045)
* Android平台 修复 API uni.getRecorderManager onStop 回调不返回任何内容 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17713)
* Android平台 修复 4.61版本引发的 CSS text 部分机型无法触发 click 事件 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17347)
* Android平台 修复 DOM API UniElement 安卓使用animation会报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17858)
* iOS平台 鸿蒙平台 修复 编译器 发行时依赖的js文件内使用的api没有自动添加对应的模块 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17561)
* iOS平台 更新 API uni.requestPayment 更新支付宝SDK为 15.8.32.5 版 [文档](https://doc.dcloud.net.cn/uni-app-x/api/request-payment.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=17401>
* iOS平台 修复 组件 view 系统语言设置为土耳其语时 view、image 标签提示不存在 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18046)
* iOS平台 修复 组件 swiper 在某些场景展示的内容与 current 不匹配 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17321)
* iOS平台 修复 4.64版本引发的 组件 list-view 高度动态变化时新插入的 list-item 不显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17030)
* iOS平台 修复 组件 web-view 加载网络地址页面时加载进度条高度太高 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18027)
* iOS平台 修复 API uni.navigateBack 返回页面过渡动画不自然，会闪一下 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17941)
* iOS平台 修复 API uni.startPullDownRefresh 自定义导航栏和页面级下拉刷新共存时页面显示错乱 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17605)
* iOS平台 修复 CSS border 某些场景边框可能被裁剪 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17109)
* 鸿蒙平台 优化 DOM 节点创建速度、样式应用速度
* 【重要】鸿蒙平台 新增 发行 原生SDK 鸿蒙版。可用于原生应用集成或本地打包 [文档](https://doc.dcloud.net.cn/uni-app-x/native/use/harmony.html)
* 鸿蒙平台 新增 原生鸿蒙工程和uni-app x工程联调 [文档](https://doc.dcloud.net.cn/uni-app-x/native/debug/harmony.html)
* 鸿蒙平台 新增 支持运行到 2in1 设备，包括鸿蒙PC版
* 鸿蒙平台 新增 组件 sticky-header 支持吸顶组件 sticky-header [文档](https://doc.dcloud.net.cn/uni-app-x/component/sticky-header.html)
* 鸿蒙平台 新增 组件 sticky-section 支持吸顶组件 sticky-section [文档](https://doc.dcloud.net.cn/uni-app-x/component/sticky-section.html)
* 鸿蒙平台 新增 组件 label [文档](https://doc.dcloud.net.cn/uni-app-x/component/label.html)
* 鸿蒙平台 新增 组件 swiper 子元素 touchstart touchmove 中 preventDefault 时，可以阻止 swiper 滑动行为 [文档](https://doc.dcloud.net.cn/uni-app-x/component/swiper.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=17097>
* 鸿蒙平台 新增 组件 input adjust-position: true 且在滚动容器内，弹出软键盘时优先滚动该容器使 input 可见 [文档](https://doc.dcloud.net.cn/uni-app-x/component/input.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=17212>
* 鸿蒙平台 新增 组件 textarea 支持 auto-height 属性 和 linechange 事件 [文档](https://doc.dcloud.net.cn/uni-app-x/component/textarea.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=16896>
* 鸿蒙平台 新增 组件 textarea adjust-position: true 且在滚动容器内，弹出软键盘时优先滚动该容器使 textarea 可见 [文档](https://doc.dcloud.net.cn/uni-app-x/component/textarea.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=17211>
* 鸿蒙平台 新增 支持 onLastPageBackPress 生命周期和 uni.exit 接口 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/app.html#onlastpagebackpress) <https://issues.dcloud.net.cn/pages/issues/detail?id=17825>
* 鸿蒙平台 修复 组件 view 的 hover-start-time 属性无效问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17466)
* 鸿蒙平台 修复 组件 list-view scrollIntoView部分情况下不能滚动到指定位置 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17121)
* 鸿蒙平台 修复 组件 list-view 滚动组件设置scrollIntoView时实际滚动位置不准确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17517)
* 鸿蒙平台 修复 组件 list-view 在初始化后不进行任何操作获取到的scrollHeight为0 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18575)
* 鸿蒙平台 修复 组件 input keyboardheightchange 某些情况下未触发 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16976)
* 鸿蒙平台 修复 组件 input placeholder-class 空字符串时白屏 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17315)
* 鸿蒙平台 修复 组件 input password=true 某些情况下无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17580)
* 鸿蒙平台 修复 组件 scroll-view 直接设置scrollTop部分情况下不会触发onscrollend [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18587)
* 鸿蒙平台 修复 组件 textarea adjust-position 某些情况表现异常问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16908)
* 鸿蒙平台 修复 组件 textarea 某些情况高度不符合预期 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16942)
* 鸿蒙平台 修复 组件 textarea keyboardheightchange 某些情况下未触发 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16977)
* 鸿蒙平台 修复 JSON.parse 传入多层嵌套数组时数组内部对象未转为 UTSJSONObject [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18541)
* 鸿蒙平台 新增 API themeChange 支持主题切换 [文档](https://doc.dcloud.net.cn/uni-app-x/api/theme-change.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=18011>
* 鸿蒙平台 新增 API uni.getUniverifyManager 支持 customLogin [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-univerify-manager.html#customlogin) <https://issues.dcloud.net.cn/pages/issues/detail?id=17811>
* 鸿蒙平台 修复 API uni.loadFontFace 在 app.uvue 中调用不生效 [文档](https://doc.dcloud.net.cn/uni-app-x/api/load-font-face.html#%E5%8F%82%E6%95%B0) <https://issues.dcloud.net.cn/pages/issues/detail?id=17338>
* 鸿蒙平台 修复 API getCurrentPages getPageStyle未包含默认值 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17518)
* 鸿蒙平台 修复 UniPage API 实例在onReady时获取不到正确的pageBody、safeAreaInsets [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17514)
* 微信小程序平台 新增 UniPage API 支持 pageBody、safeAreaInsets属性 [文档](https://doc.dcloud.net.cn/uni-app-x/api/unipage.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=16961>
##### uts插件
* Web平台、iOS平台、鸿蒙平台、微信小程序平台 修复 编译为js时部分情况下对象未转化为UTSJSONObject [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17197)
* Web平台、微信小程序平台 修复 uts 文件加密后编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6996)
* Android平台、iOS平台 修复 type联合类型在interface和class中编译结果不一致 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17241)
* Android平台、iOS平台 修复 变量判断非空后，后续使用仍需强制非空或可选链 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17771)
* Android平台、iOS平台 修复 interface中定义可为空属性类型为方法时缺少括号 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17249)
* Android平台、iOS平台 修复 浮点数字面量位运算编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17847)
* Android平台、iOS平台 修复 for循环中部分continue用法运行时死循环 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17519)
* Android平台 新增 Date 重构优化性能，并补齐 toLocaleString、toUTCString、getUTCMonth、valueOf 等方法 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/date.html#date) <https://issues.dcloud.net.cn/pages/issues/detail?id=17272>
* Android平台 新增 UniActivityLifeCycleCallback 的方法中 UniActivityParams 类型参数支持 activity 属性 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/utsactivitycallback.html#uniactivitylifecyclecallback) <https://issues.dcloud.net.cn/pages/issues/detail?id=16876>
* Android平台 新增 UTSAndroid.getKotlinClass [文档](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=17252>
* Android平台 修复 可选链部分情况下包含索引访问时编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18549)
* Android平台 修复 静态属性内定义的局部class不能被继承 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16899)
* Android平台 修复 部分情况下 class 构造器定义的参数属性没有正确补充 override 修饰符 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16901)
* Android平台 修复 UTSJSONObject多层嵌套时访问外部this作用域编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16690)
* Android平台 修复 UInt8Array/UInt16Array 迭代异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16496)
* Android平台 修复 for of 遍历 UInt8Array 获得的数字与web 不一致 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18121)
* Android平台 修复 setTimeout 必须要指定 时间参数 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16768)
* iOS平台、鸿蒙平台 新增 支持 TextDecoder、TextEncoder [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/textdecoder.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=17905>
* iOS平台 修复 导出函数参数中存在多层 Object 嵌套且属性 callback 时不能正常触发回调 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17151)
* iOS平台 修复 instanceof 无法直接判断带泛型的类型 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17289)
* iOS平台 修复 RegExp 某些场景下的 lastIndex 值错误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18242)
* 鸿蒙平台 修复 当class中使用与内部属性同名的外部变量时编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17909)

#### 4.63.2025042307-alpha
##### uni-app x
* App平台 新增 组件 web-view 支持获取内容高度及内容高度变化事件 [文档](https://doc.dcloud.net.cn/uni-app-x/component/web-view.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=16625>
* Android、iOS平台 新增 API uni.makePhoneCall 支持拨打电话 [文档](https://doc.dcloud.net.cn/uni-app-x/api/make-phone-call.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=16592>
* Android、iOS平台 修复 4.51版本引发的 API uni.showActionSheet 主题监听导致内存泄漏问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17201)
* Android、iOS平台 修复 4.61版本引发的 API uni.showModal 主题监听导致内存泄漏问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17230)
* Android、iOS平台 修复 4.61版本引发的 API uni.showModal 应用主题设置为跟随系统时暗黑效果不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17226)
* Android平台 修复 组件 web-view 网页中输入框获取焦点后可能被软键盘遮挡 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17222)
* Android平台 修复 DOM API UniElement animate 方法设置 opacity 导致动画不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17191)
* iOS平台 新增 API uni.connectEventSource 支持SSE [文档](https://doc.dcloud.net.cn/uni-app-x/api/connect-event-source.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=15664>
* iOS平台 修复 4.55版本引发的 组件 text selectable 文本可选效果可能无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17199)
* 鸿蒙平台 新增 编译器 支持模块摇树，根据使用情况自动添加 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-modules.html#treeshaking) <https://issues.dcloud.net.cn/pages/issues/detail?id=17140>
* 鸿蒙平台 新增 组件 web-view 支持 bounces 属性 [文档](https://doc.dcloud.net.cn/uni-app-x/component/web-view.html)
* 鸿蒙平台 修复 运行调试 uni-app x 项目启用了 uni-push 模块时运行到鸿蒙报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17159)

#### 4.62.2025041603-alpha
##### uni-app x
* App-Android平台 修复 API dialogPage 在android5.0系统设备内容显示不全 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16939)
* App-Android平台 修复 4.61版本引发的 组件 ad 打包勾选章鱼广告模块广告加载失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16948)
* App-iOS平台 修复 4.25版本引发的 组件 list-view scroll-into-view 属性可能无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16934)
* App-iOS平台 修复 组件 waterflow scroll-into-view 属性可能无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16443)
* App-iOS平台 修复 组件 input 某些场景下 hold-keyboard 设置为 true 滑动 scroll-view 依然隐藏软键盘 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17060)
* App-iOS平台 修复 组件 web-view web页面中 a 标签 target 属性值为 _blank 时点击无法跳转 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16740)
* App-iOS平台 修复 4.61版本引发的 API uni.showModal showCancel字段默认值不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16943)
* App-iOS平台 修复 CSS text-decoration-line 属性运行在 iOS18 及以上设备无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16838)
* Web平台 修复 4.61版本引发的 组件 video 播放图标不显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17035)
* 微信小程序平台 修复 编译器 $vm找不到 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16723)
* App-Harmony平台 新增 运行调试 支持运行到 x64 平台的鸿蒙模拟器 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17036)
##### uts插件
* App-Harmony平台 修复 UTSHarmony 在较早时机无法调用 getUIAbilityContext 的 Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17019)

#### 4.61.2025040322-alpha
##### uni-app x
* 【重要】新增 编译App到HarmonyOS平台 [详见](https://doc.dcloud.net.cn/uni-app-x/app-harmony/)
* App-Android平台 修复 4.53版本引发的 组件 text 触摸事件可能不响应 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16132)
##### uts
* Web平台、App-iOS平台、微信小程序平台 修复 getString/getNumber 等get方法默认值参数部分情况不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16094)
* App-Harmony平台 新增 convert2AbsFullPath、getResourcePath 方法 [详情](https://doc.dcloud.net.cn/uni-app-x/uts/utsharmony.html)

#### 4.57.2025032014-alpha
##### uni-app-x
* Web平台、微信小程序平台 修复 4.55版本引发的 编译器 运行时会提交云端编译仅App端支持的uts加密插件的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16242)
* App-Android平台 修复 4.41版本引发的 组件 waterflow 触发下拉刷新可能出现app卡死 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16133)

#### 4.54.2025030608-alpha
##### uts插件
* 新增 in 操作符支持 type 定义的类型 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/data-type.html#in-%E6%93%8D%E4%BD%9C%E7%AC%A6)
* App-Android平台 修复 4.51版本引发的 UTSJSONObject 对象使用 in 操作符编译报错的Bug

#### 4.53.2025022409-alpha
##### uni-app x
* 修复 编译器 as 语法导致对象引用丢失 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15705)
* App平台 新增 组件 兼容支持 cover-view、cover-image [文档](https://doc.dcloud.net.cn/uni-app-x/component/cover-view.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=15771>
* App-iOS平台、微信小程序平台 新增 DOM API 关键帧动画 [文档](https://doc.dcloud.net.cn/uni-app-x/dom/unielement.html#animate) <https://issues.dcloud.net.cn/pages/issues/detail?id=15642>
* App-Android平台 修复 组件 canvas 设置textBaseline="Top"绘制位置不准确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15634)
* App-Android平台 修复 组件 canvas Image释放后不会立即回收内存 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15645)
* App-Android平台 修复 组件 web-view 底部textarea弹出的软键盘遮挡界面元素 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15678)
* App-Android平台 修复 API dialogPage 在app的onLaunch或在页面的onLoad中打开dialogPage时获取不到安全区域信息 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15489)
* App-Android平台 修复 CSS border 安卓运行时解析 border 和编译时表现不一致 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15510)
* App-iOS平台 修复 4.51版本引发的 组件 Touch 事件 move 中执行 preventDefault 可能导致页面始终无法滚动 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15617)
* App-iOS平台 修复 组件 canvas ios端 Image对象 本地路径结尾带问号参数时无法被canvas渲染 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15784)
* App-iOS平台 修复 4.11版本引发的 组件 web-view 重写了 window.postMessage 函数 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15796)
* 微信小程序平台 修复 onShareAppMessage, onShareTimeline需要import才可使用 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15707)
* 微信小程序平台 修复 组合式api页面中 onShareAppMessage, onShareTimeline声明后页面也无法分享 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15708)
##### uts插件
* Web平台、App-iOS平台、微信小程序平台 修复 部分对象字面量未转化为UTSJSONObject [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15557)

#### 4.52.2025020807-alpha
##### uni-app x
* 修复 4.51版本引发的 编译器 uni-app兼容模式组件uts插件内utssdk目录、平台目录下均无index.uts时编译报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15502)
* Web平台、微信小程序平台 新增 CSS var支持安全区域相关变量 [文档](https://doc.dcloud.net.cn/uni-app-x/css/common/function.html)
* App平台 修复 4.51版本引发的 API showActionSheet appTheme 设置 auto 时，未适配系统主题问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15501)
* App平台 修复 API uni.downloadFile 下载时断网不会触发回调事件 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15497)
* App-Android平台 修复 组件 button 拆分设置border相关样式不起作用 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15526)
* App-Android平台 修复 4.51版本引发的 API showActionSheet 某些时机底部安全区适配失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15500)
* App-Android平台 修复 API uni.setAppBadgeNumber 在MIUI12以上系统设置角标不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15231)
* App-iOS平台 修复 4.51版本引发的 组件 video 播放控件上的按钮点击无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15545)
##### uts插件
* App平台 修复 4.51版本引发的 部分情况下类型收窄编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15491)

#### 4.51.2025012123-alpha
##### uni-app-x
* Web平台、App平台 新增 API UniPage 补充更多信息属性 [文档](https://doc.dcloud.net.cn/uni-app-x/api/unipage.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=10587>
* Web平台、App平台 重构 showActionSheet，基于dialogPage，支持国际化、主题、横屏、更多item数量、自定义颜色 [文档](https://doc.dcloud.net.cn/uni-app-x/api/show-action-sheet.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=6259>
* Web平台、App平台 新增 API uni.hideActionSheet 关闭栈顶页面的 actionSheet [文档](https://doc.dcloud.net.cn/uni-app-x/api/show-action-sheet.html#hideactionsheet) <https://issues.dcloud.net.cn/pages/issues/detail?id=15304>
* Web平台、App平台 修复 API dialogPage pages.json 中 navigationStyle、backgroundColorContent 配置无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14225)
* Web平台 修复 组件 list-view list-item下的自定义组件触发两次生命周期 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13858)
* Web平台 修复 API showActionSheet 内嵌套showActionSheet第二层点击itemList无法取消，取消后再也无法打开 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1765)
* Web平台 修复 API uni.createCanvasContextAsync 组件内多根节点无法获取canvas元素的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14392)
* App平台 新增 vue v-on 支持 prevent 修饰符 [文档](https://doc.dcloud.net.cn/uni-app-x/vue/modifier.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=15333>
* App平台 新增 组件 共享元素动画 [文档](https://doc.dcloud.net.cn/uni-app-x/component/share-element.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=14354>
* App平台 新增 组件 text 嵌套为子组件时响应点击事件 [文档](https://doc.dcloud.net.cn/uni-app-x/component/text.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=362>
* App平台 新增 组件 map 更改tap相关Event类型继承自UniPointerEvent [文档](https://doc.dcloud.net.cn/uni-app-x/component/map.html#unimappoitapevent) <https://issues.dcloud.net.cn/pages/issues/detail?id=14280>
* App平台 新增 组件 map 支持Marker的callout属性 [文档](https://doc.dcloud.net.cn/uni-app-x/component/map.html#%E5%B1%9E%E6%80%A7) <https://issues.dcloud.net.cn/pages/issues/detail?id=14595>
* App平台 新增 API uni.openAppAuthorizeSetting 打开系统的应用授权管理页面 [文档](https://doc.dcloud.net.cn/uni-app-x/api/open-app-authorize-setting.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=12833>
* App平台 新增 API uni.chooseMedia 选择图片或视频 [文档](https://doc.dcloud.net.cn/uni-app-x/api/choose-media.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=13164>
* App平台 新增 API uni.previewImage 基于dialogPage重构，优化指示器效果，补充长按事件，开放源码方便自定义 [文档](https://doc.dcloud.net.cn/uni-app-x/api/preview-image.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=15200>
* App平台 新增 API uni.getUniverifyManager 基于dialogPage重构内置UI，适配暗黑模式 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-univerify-manager.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=14332>
* App平台 新增 CSS 支持env方法 [文档](https://doc.dcloud.net.cn/uni-app-x/css/common/function.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=7296>
* App平台 调整 DOM API CSSStyleDeclaration getPropertyValue获取不存在的样式值时，与web一样返回空字符串 [文档](https://doc.dcloud.net.cn/uni-app-x/dom/cssstyledeclaration.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=14749>
* App平台 修复 4.31版本引发的 组件 map marker不支持title属性 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14270)
* App平台 修复 CSS 某些情况下未处理百分比导致view没有显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14572)
* App-Android平台 新增 pages.json 支持androidThreeButtonNavigationBackgroundColor配置虚拟按键导航栏背景色 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/pagesjson.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=14135>
* App-Android平台 新增 API 支持chooseFile [文档](https://doc.dcloud.net.cn/uni-app-x/api/choose-file.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=14362>
* App-Android平台 新增 API uni.isSimulator() 判断是否为模拟器 [文档](https://doc.dcloud.net.cn/uni-app-x/api/is-simulator.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=15225>
* App-Android平台 新增 API getAccessibilityInfo 获取无障碍服务相关信息 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-accessibility-info.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=15303>
* App-Android平台 新增 API uni.base64ToArrayBuffer 、uni.arrayBufferToBase64 [文档](https://doc.dcloud.net.cn/uni-app-x/api/base64.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=12771>
* App-Android平台 新增 API uni.request 支持 ArrayBuffer 数据 [文档](http://localhost:8081/uni-app-x/api/request.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=11652>
* App-Android平台 新增 API uni.request 支持sse 用于流式响应服务器推送消息 [文档](https://doc.dcloud.net.cn/uni-app-x/api/connect-event-source.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=14290>
* App-Android平台 新增 API uni.getFileSystemManager 读取文件支持content://路径 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-file-system-manager.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=14130>
* App-Android平台 新增 DOM API 关键帧动画 [文档](https://doc.dcloud.net.cn/uni-app-x/dom/unielement.html#animate) <https://issues.dcloud.net.cn/pages/issues/detail?id=13135>
* App-Android平台 修复 编译器 无法使用相对路径引入uni_modules下插件static目录 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14427)
* App-Android平台 修复 vue Array和Map的forEach、Map的for of不触发响应式收集 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15065)
* App-Android平台 修复 vue props 使用数组定义 type 类型包含 null 时编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14252)
* App-Android平台 修复 组件 list-view 对v-if的元素缓存异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13869)
* App-Android平台 修复 组件 list-view 安卓下listview中sticky-header如果是动态加载的数据，无法吸顶 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14705)
* App-Android平台 修复 组件 input 部分情况下keyboardheightchange事件不触发 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13334)
* App-Android平台 修复 组件 image 配置border-radius属性后边缘锯齿严重 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15258)
* App-Android平台 修复 4.31版本引发的 组件 video 使用view.takeSnapshot（）方法对暂停的video视频暂停页面进行截图，4.29版本使用该方法可以进行截图，更新至4.36无法进行截图，截图后图片是全黑 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14013)
* App-Android平台 修复 组件 video 组件缺少开关弹幕的API [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14195)
* App-Android平台 修复 组件 canvas y轴参数，文字却写成了X轴 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14980)
* App-Android平台 更新 组件 ad 使用的腾讯优量汇SDK为4.611.1481版，适配android 15 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15262)
* App-Android平台 修复 API setTabBar 切换tabbar页面时图标会出现短暂的闪白 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15288)
* App-Android平台 修复 API showActionSheet uni.showActionSheet 数组超过6就报错了 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14821)
* App-Android平台 修复 CSS text-overflow : ellipsis 在某些尺寸时会换行 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13663)
* App-iOS平台 新增 API uni.createInnerAudioContext 和 uni-getBackgroundAudioManager 支持音频文件Cache功能 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-background-audio-manager.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=14207>
* App-iOS平台 修复 编译器 模板内使用较新的js语法时无法在低版本iOS运行 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15088)
* App-iOS平台 修复 4.12版本引发的 vue options 名称被编译器占用 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15107)
* App-iOS平台 修复 全局事件 Touch 事件 阻止默认行为无效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14285)
* App-iOS平台 修复 全局事件 Transition 事件 transtion 0ms 不应该触发事件回调的问题，该问题导致事件断断续续 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14911)
* App-iOS平台 修复 组件 waterflow 子组件高度动态变化时未更新排版 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14645)
* App-iOS平台 修复 组件 nested-scroll 当内层滚动视图内容高度不够容器高度时可能导致外层滚动视图无法滚动的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15197)
* App-iOS平台 修复 组件 input placeholderStyle与placeholderClass优先级不对 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14742)
* App-iOS平台 修复 组件 textarea 组件placeholder内容会超过光标，影响美观 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13973)
* App-iOS平台 修复 组件 image 组件在循环本地图片路径图片加载成功了但会发出error事件 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13839)
* App-iOS平台 修复 4.33版本引发的 API uni.chooseImage 选择相册，编辑图片时裁剪框以及图片无法拖拽的问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14310)
* App-iOS平台 修复 CSS border 相同权重的 css 表现和 web 不一致 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14277)
* App-iOS平台 修复 CSS border-style 设置为dotted、dashed时显示效果不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14369)
* App-iOS平台 修复 CSS lines 设置为 1 时 text-overflow: ellipsis 无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14496)
* App-iOS平台 修复 CSS transition-property style中设置transition-property无效，且设置后通过dom设置也无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13943)
* App-iOS平台 修复 CSS transform translateX未生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14917)
* App-iOS平台 修复 CSS transform-origin 效果不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14808)
* 微信小程序平台 修复 编译器 编译为分包时部分资源引用路径不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14860)
* 微信小程序平台 修复 编译器 cli项目编译为小程序插件时输出目录不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14869)
* 微信小程序平台 修复 4.41版本引发的 vue skyline模式的页面无法显示内容 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15297)
##### uts插件
* 【重要】App平台 新增 支持更多联合类型 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/data-type.html#union-type) <https://issues.dcloud.net.cn/pages/issues/detail?id=15131>
* App平台 新增 支持类型保护、类型收窄 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/data-type.html#narrowing) <https://issues.dcloud.net.cn/pages/issues/detail?id=15132>
* App平台 新增 Array支持静态方法 from、fromAsync、isArray、of [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/array.html#from-arraylike-arraylike-t) <https://issues.dcloud.net.cn/pages/issues/detail?id=6394>
* App平台 修复 await 一个非 Promise 类型的值编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14481)
* App平台 修复 class静态getter、setter编译错误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15168)
* App-Android平台 修复 switch case 语句中使用return代替break时，case 语句不会自动合并 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=9158)
* App-Android平台 修复 Array.push数组中添加数据，运行调试一切正常，打包后就不能渲染了 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14417)
* App-Android平台 修复 promise异常安卓环境未带出文件位置 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15056)
* App-Android平台 修复 promise调用链抛出reject异常安卓结果和web不一致 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15083)
* App-Android平台 修复 uni-app环境下 setPrivacyAgree/isPrivacyAgree 数值不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14367)
* App-Android平台 修复 4.42版本引发的 uni-app项目 uts插件中修改的代码真机运行到Android14及以上系统设备非首次更新未生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15213)
* App-iOS平台 新增 ArrayBuffer 支持在UTS插件编译为swift时使用 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/arraybuffer.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=10911>
* App-iOS平台 新增 js 和 swift 基于 ArrayBuffer 的内存共享 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/arraybuffer.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=15260>
* App-iOS平台 新增 uts 插件支持依赖uni_modules目录下其他uts插件 [文档](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-plugin.html#utsplugindependent) <https://issues.dcloud.net.cn/pages/issues/detail?id=15242>

#### 4.45.2025010702-alpha
##### uts插件
* App-Android平台 修复 4.41版本引发的 String.split 使用了 Kotlin 的 removeFirst/removeLast 扩展函数与 Android15 中的 Java 函数冲突 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14804)

#### 4.43.2024122419-alpha
##### uni-app x
* 微信小程序平台 修复 4.42版本引发的 vue 无 id 属性的组件根节点 ref 无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14513)

#### 4.42.2024121808-alpha
##### uni-app x
* Web平台 修复 组件 checkbox 影响子元素 flex 布局的 css 不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14235)
* 微信小程序平台 修复 组件 radio、checkbox 影响子元素 flex 布局的 css 不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14234)
* 微信小程序平台 修复 DOM API uni.getElementById 无法获取自定义组件中由组件外层设置 id 的根节点 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14304)
* App-Android平台 修复 pages.json androidThreeButtonNavigationTranslucent属性横屏不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14133)
* App-Android平台 修复 pages.json androidThreeButtonNavigationTranslucent属性在 dialogPage 页面不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14134)
* App-Android平台 修复 组件 waterflow 最后一个flow-item自动显示一整行 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14244)
* App-Android平台 修复 API uni.getUniverifyManager 更新个验SDK解决合规风险问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14276)
* App-Android平台 修复 4.41版本引发的 CSS box-shadow rgb/rgba颜色显示错误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14199)
##### uts插件
* Web平台、App-iOS平台、微信小程序平台 新增 支持import type的用法 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/type-compatibility.html#import-type) <https://issues.dcloud.net.cn/pages/issues/detail?id=12941>
* Web平台、微信小程序平台 修复 兼容模式组件查找错误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14305)
* App-Android平台 修复 4.41版本引发的 模板字符串或字符串相加包含可为空的any或number类型时部分情况报空指针 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14185)
* App-Android平台 修复 4.41版本引发的 使用 import type 时可能编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14241)
* App-Android平台 修复 uni-app项目 uts插件中修改的代码真机运行到Android14及以上系统设备未生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14275)

#### 4.41.2024121203-alpha
##### uni-app x
* 【重要】uni-app-x 项目支持发布到微信小程序 [详情](https://doc.dcloud.net.cn/uni-app-x/mp/)
* 新增 DOM API UniElement getBoundingClientRectAsync 异步获取元素位置信息 [文档](https://doc.dcloud.net.cn/uni-app-x/dom/unielement.html#getBoundingClientRectAsync) <https://issues.dcloud.net.cn/pages/issues/detail?id=12092>
* 新增 API uni.openDialogPage triggerParentHide 参数控制是否触发父页面 onHide 生命周期 [文档](https://doc.dcloud.net.cn/uni-app-x/api/dialog-page.html#opendialogpage) <https://issues.dcloud.net.cn/pages/issues/detail?id=13636>
* 新增 API uni.chooseLocation 打开时触发当前页面 onHide 生命周期，关闭时触发当前页面 onShow 生命周期 [文档](https://doc.dcloud.net.cn/uni-app-x/api/choose-location.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=13836>
* 修复 编译器 返回值类型推断不支持函数类型 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13046)
* Web平台、App-iOS平台 修复 dialogPage 实例上 getElementById 等部分方法不支持的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14047)
* Web平台 修复 4.02版本引发的 组件 全局事件 部分组件触发的事件中 target 未指向内置组件根节点 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12910)
* Web平台 修复 API uni.getStorage 获取 UTSJSONObject 数组时未能取到正确结果 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14039)
* App平台 新增 组件 waterflow 瀑布流 [文档](https://doc.dcloud.net.cn/uni-app-x/component/waterflow.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=11016>
* App平台 新增 组件 input placeholderStyle支持font-family、font-style、text-align [文档](https://doc.dcloud.net.cn/uni-app-x/component/input.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=13052>
* App平台 新增 API uni.getBackgroundAudioManager 背景音频播放 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-background-audio-manager.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=12144>
* App平台 新增 API uni.openLocation 打开当前位置 [文档](https://doc.dcloud.net.cn/uni-app-x/api/open-location.html)
* App平台 新增 API uni.getUniverifyManager 支持自定义一键登录页面 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-univerify-manager.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=11020>
* App平台 新增 API uni.getUniverifyManager 调整参数类名以及返回值类名 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-univerify-manager.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=13772>
* App平台 新增 API uni.closeDialogPage 调整 animationType 默认值为 auto [文档](https://doc.dcloud.net.cn/uni-app-x/api/dialog-page.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=13942>
* App平台 修复 组件 canvas 动画过程中圆弧闪动 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13487)
* App平台 修复 CSS background-color 十六进制颜色语法与web不一致 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13371)
* App-Android平台 新增 pages.json 支持 androidThreeButtonNavigationTranslucent 配置页面内容可渲染到系统导航栏的虚拟按键区域 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/pagesjson.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=11021>
* App-Android平台 新增 API uni.chooseImage uni.saveImageToPhotosAlbum uni.getImageInfo uni.compressImage uni.chooseVideo uni.saveVideoToPhotosAlbum uni.getVideoInfo 支持内容URI地址 [文档](https://doc.dcloud.net.cn/uni-app-x/api/choose-image.html)
* App-Android平台 修复 vue 使用defineModel嵌套绑定v-model编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11505)
* App-Android平台 修复 vue ref变量类型推导优化 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12042)
* App-Android平台 修复 组件 list-view 自定义刷新样式显示异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13511)
* App-Android平台 修复 组件 textarea 部分情况下input事件不触发 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=9081)
* App-Android平台 修复 组件 canvas new Image没有触发onload事件 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12336)
* App-Android平台 修复 4.33版本引发的 API getCurrentPages 部分场景 getPageStyle 返回的 navigationStyle 值域不准 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13133)
* App-Android平台 修复 API dialogPage animationType设置zoom-fade-out不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12655)
* App-Android平台 修复 API dialogPage navigationBarTextStyle属性不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13281)
* App-Android平台 修复 API showToast 被 dialogPage 遮挡 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12993)
* App-Android平台 修复 API uni.request 指定泛型为string，接口返回404时解析失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13054)
* App-Android平台 修复 云对象返回的errSubject无法在客户端获取 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13228)
* App-Android平台 修复 CSS font-family 自定义字体、内置字体设置font-style、font-weight属性不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13100)
* App-iOS平台 新增 API uni.createInnerAudioContext 支持音频播放 [文档](https://doc.dcloud.net.cn/uni-app-x/api/create-inner-audio-context.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=12829>
* App-iOS平台 新增 API uni.chooseLocation 支持 uts 插件环境调用 [文档](https://doc.dcloud.net.cn/uni-app-x/api/choose-location.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=13780>
* App-iOS平台 修复 组件 scroll-view 内容高度小于容器高度时无法触发自定义下拉刷新 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13747)
* App-iOS平台 修复 组件 input iOS 输入框长按粘贴与touch事件冲突，导致input失焦，键盘被收起 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12621)
* App-iOS平台 修复 组件 slider 点击时事件触发错误的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13783)
* App-iOS平台 修复 组件 canvas Image支持width、height属性 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12687)
* App-iOS平台 修复 组件 canvas 通过style.setProperty方法动态修改尺寸导致渲染异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12904)
* App-iOS平台 修复 组件 canvas 反复退出进入应用偶发闪退 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13093)
* App-iOS平台 修复 API uni.$emit 不支持参数为UTSJSONObject [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12615)
* App-iOS平台 修复 API navigator iOS页面边界不应该带有阴影效果 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11585)
* App-iOS平台 修复 API dialogPage 关闭后，状态栏颜色无法更新为当前页面的设置 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13765)
* App-iOS平台 修复 API uni.createSelectorQuery 在视图滚动期间 callback 回调不及时 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13368)
* App-iOS平台 修复 API uni.getWindowInfo 在 iPhone18 设备获取的屏幕宽、高可能不正确
* App-iOS平台 修复 CSS transform 修改transform值页面闪动 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12850)
* App-iOS平台 更新 云端打包环境 XCode 为 16.1 版、iOS SDK 为 18.1 版
##### uts插件
* 新增 支持迭代协议 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/iterable.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=6511>
* Web平台、App-iOS平台 新增 编译器 编译 uts 到 js 时支持 import type 的用法 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/type-compatibility.html#import-type)
* App平台 新增 UTSJSONObject 支持点号表示法访问属性。注意返回值类型为any [文档](https://doc.dcloud.net.cn/uni-app-x/uts/data-type.html#_1-%E6%93%8D%E4%BD%9C%E7%AC%A6) <https://issues.dcloud.net.cn/pages/issues/detail?id=11072>
* App平台 修复 vue2项目下导出的class实例被vue响应式后调用方法报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13685&ask_id=202006)
* App-Android平台 新增 优化number类型的实现 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/number.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=7119>
* App-Android平台 新增 JSON.Parse 新增ignoreError参数，用于隐藏解析报错 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/json.html#parse) <https://issues.dcloud.net.cn/pages/issues/detail?id=13219>
* App-Android平台 修复 JSON.parse<string> 解析失败时返回数据应该是输入参数 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13274)
* App-Android平台 修复 4.25版本引发的 UTSJSONObject 包含 自定义type 类型数据时调用 toJSONObject 序列化可能异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13110)
* App-Android平台 修复 数组every、some、filter、find、findIndex返回值类型推断不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12985)
* App-Android平台 修复 split 函数返回结果与web不一致 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=10884)
* App-Android平台 修复 java混编模式下，不能使用 console.log [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11532)

#### 4.36.2024112612-alpha
##### uni-app x
* App平台 修复 API uni.createCanvasContextAsync 在生命周期 onLoad/onMount 中无法获取width/height [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13212)
* App-Android平台 修复 4.35版本引发的 vue keepAlive 组件切换时，触发了 update 生命周期的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13261)

#### 4.35.2024112402-alpha
##### uni-app x
* 优化 API uni.chooseLocation 新增请求参数payload，原样透传给uni-map-co，可用于用户鉴权 [详情](https://doc.dcloud.net.cn/uni-app-x/api/choose-location.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=13108>

#### 4.34.2024112020-alpha
##### uni-app x
* 修复 API uni.chooseLocation input输入框点击会闪、POI显示不准确等问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12940)
* App-Android平台 修复 组件 video 云打包后应用static目录下视频无法播放 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12871)
* App-Android平台 修复 API uni.downloadFile 部分情况下可能引起应用崩溃 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12869)
* App-Android平台 修复 API uni.saveVideoToPhotosAlbum 云打包后保存应用static目录下的视频文件失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12867)
* App-Android平台 修复 API uni.createInnerAudioContext 播放倍速仅支持设置平台专有Double数据类型 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12862)
* App-Android平台 修复 API uni.shareWithSystem shareWithSystem 云打包后应用static目录下文件无法分享 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12851)
##### uts插件
* App平台 修复 4.19版本引发的 uts加密插件包含easycom组件时，云打包报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12775)

#### 4.33.2024111702-alpha
##### uni-app x
* 新增 uni统计功能 [文档](https://uniapp.dcloud.net.cn/uni-stat-uniappx) <https://issues.dcloud.net.cn/pages/issues/detail?id=12350>
* Web平台 修复 CSS rpx 通过style.setProperty设置rpx值无法响应屏幕宽度变化 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11256)
* Web平台 修复 DOM API UniElement 在属性值为空字符串时错误的返回了null [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12306)
* Web平台 修复 4.31版本引发的 vue ssr模式运行项目时控制台报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12304)
* Web平台 修复 4.23版本引发的 运行调试 uni-app-x项目以SSR模式运行报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12179)
* App平台 新增 app.uvue 原生捕获异常触发应用生命周期onError [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/app.html#onerror) <https://issues.dcloud.net.cn/pages/issues/detail?id=7116>
* App平台 新增 API uni.chooseLocation 打开地图选择位置 [文档](https://doc.dcloud.net.cn/uni-app-x/api/choose-location.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=12430>
* App平台 新增 API uni.shareWithSystem 调用系统分享 [文档](http://doc.dcloud.net.cn/uni-app-x/api/share-with-system.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=10687>
* App平台 新增 API uni.createInnerAudioContext 支持音频播放 [文档](https://doc.dcloud.net.cn/uni-app-x/api/create-inner-audio-context.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=10686>
* App平台 新增 API uni.chooseImage 支持 pageOrientation 参数适配横竖屏 [文档](https://doc.dcloud.net.cn/uni-app-x/api/choose-image.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=10683>
* App平台 新增 API uni.chooseVideo 支持 pageOrientation 参数适配横竖屏 [文档](https://doc.dcloud.net.cn/uni-app-x/api/choose-video.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=12342>
* App平台 新增 CSS 支持内置 uni-icon 字体图标 [文档](https://doc.dcloud.net.cn/uni-app-x/css/common/at-rules.html#uniicon) <https://issues.dcloud.net.cn/pages/issues/detail?id=11994>
* App平台 修复 vue 设置样式 display: flex 时，v-show="false" 首次渲染会显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11473)
* App平台 修复 API getCurrentPages getPageStyle 返回页面样式信息不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=10274)
* App平台 修复 API uni.loadFontFace 不支持 base64 格式数据URL [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12105)
* App平台 修复 pages.json tabbar不支持字体图标在theme.json配置颜色 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11289)
* App平台 修复 组件 canvas source-atop与web效果不一致 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11284)
* App-Android平台 新增 API uni.chooseImage 支持 albumMode 参数配置使用系统相册选择图片 [文档](https://doc.dcloud.net.cn/uni-app-x/api/choose-image.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=12344>
* App-Android平台 新增 API uni.chooseVideo 支持 albumMode 参数配置使用系统相册选择视频 [文档](https://doc.dcloud.net.cn/uni-app-x/api/choose-video.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=10685>
* App-Android平台 新增 发行 云端打包支持 enableResourceOptimizations 配置关闭原生res资源文件名称混淆 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#enableresourceoptimizations) <https://issues.dcloud.net.cn/pages/issues/detail?id=12424>
* App-Android平台 修复 vue 使用h()函数时无法使用具名插槽 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12388)
* App-Android平台 修复 4.31版本引发的 vue render 函数渲染自定义组件，修改数据无法触发更新 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11752)
* App-Android平台 修复 vue v-bind与其他绑定混合使用编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12488)
* App-Android平台 修复 4.31版本引发的 pages.json hideStatusBar 属性在 dialogPage 页面失效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12321)
* App-Android平台 修复 组件 list-item 中的子元素在某些场景 boder 和 background-color 样式不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12341)
* App-Android平台 修复 4.02版本引发的 组件 rich-text 中的 a 标签某些场景下可能出现点击不触发 itemclick 事件 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11051)
* App-Android平台 修复 4.31版本引发的 组件 input 在 dialogPage 页面无法取消焦点 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12182)
* App-Android平台 修复 组件 map 设置 show-location 为 true 时偶发显示定位精度圆形遮罩 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11575)
* App-Android平台 修复 pages.json 横屏参数导致启动页面的时候会有一个切换的动作 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11147)
* App-Android平台 修复 API uni.redirectTo 某些场景窗口动画失效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11158)
* App-Android平台 修复 API push 某些情况点击离线消息不能触发 `click` 事件 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11268)
* App-Android平台 修复 API push 模块使用的 gson 库可能与uts插件的依赖库冲突 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11861)
* App-Android平台 优化 API uni.$emit 支持不传参数或传多个参数 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11588)
* App-iOS平台 新增 pages.json 支持 hideBottomNavigationIndicator 属性 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/pagesjson.html#pagesoptionspage-style) <https://issues.dcloud.net.cn/pages/issues/detail?id=10478>
* App-iOS平台 新增 pages.json 支持 hideStatusBar 属性 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/pagesjson.html#pages-globalstyle) <https://issues.dcloud.net.cn/pages/issues/detail?id=10554>
* App-iOS平台 新增 组件 video 支持子组件 [文档](https://doc.dcloud.net.cn/uni-app-x/component/video.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=10477>
* App-iOS平台 新增 API uni.exit 支持在原生SDK环境中退出应用 [文档](https://doc.dcloud.net.cn/uni-app-x/api/exit.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=11654>
* App-iOS平台 修复 组件 rich-text 点击不会触发父组件 click 事件 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6986)
* App-iOS平台 修复 组件 rich-text 设置固定高度时内容不显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=10999)
* App-iOS平台 修复 组件 slider 设置的 max 不能整除 step 时滑动到最右侧返回值可能会大于 max [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12503)
* App-iOS平台 修复 组件 canvas 在自定义组件中处理高清屏逻辑不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11696)
* App-iOS平台 修复 API uni.request 返回数据类型为不为UTSJSONObject [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11697)
* App-iOS平台 修复 API uni.getWindowInfo 返回 safeArea 中的 bottom、height 属性值不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=10935)
* App-iOS平台 修复 API uni.addInterceptor 【ios端】uni.addInterceptor拦截'switchTab'无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=10147)
* App-iOS平台 修复 4.18版本引发的 DOM API UniResizeObserver 监视元素的大小变化可能导致内存泄露 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11451)

#### 4.32.2024110103-alpha
##### uni-app x
* Web平台 修复 4.31版本引发的 rpx 渲染异常的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11253)
* App-Android平台 修复 4.31版本引发的 编译器 pages.json以及外链引入的css/scss/less文件修改后热更新不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11247)
* App-Android平台 修复 4.31版本引发的 pages.json 隐藏tabbar后可能渲染异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11269)
* App-Android平台 修复 组件 触发 @click 事件没有音效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11066)
* App-Android平台 修复 4.31版本引发的 CSS border 某些情况下border不显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11225)
* App-Android平台 修复 4.31版本引发的 CSS box-shadow 阴影渲染异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11447)
* App-iOS平台 修复 组件 canvas 中使用的 image 更新 src 时可能触发图片重复加载导致绘制异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11136)
* App-iOS平台 修复 API dialogPage 可能无法遮挡原生 tabbar [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11129)
* App-iOS平台 修复 API uni.getDeviceInfo 返回的 deviceId 值异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11436)
##### uts
* App-Android平台 修复 4.31版本引发的 number除法可能会触发 java.lang.ArithmeticException: divide by zero [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11331)
* App-Android平台 修复 4.31版本引发的 Math.abs 可能不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11332)

#### 4.31.2024102414-alpha
##### uni-app x
* 新增 vue 页面实例.options 及 onLoad 参数调整为 UTSJSONObject 类型 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-current-pages.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=9323>
* 新增 API `uni.openDialogPage`、`uni.closeDialogPage` 打开和关闭模态弹框页面 [文档](https://doc.dcloud.net.cn/uni-app-x/api/dialog-page.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=3870>
* 调整 API getApp 返回值类型为 UniApp，新增若干方法，并支持在uts插件中使用 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-app.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=3847>
* 调整 API getCurrentPages 返回值类型为 UniPage数组，新增UniPage对象若干方法，并支持在uts插件中使用 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-current-pages.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=3847>
* 新增 API eventBus 支持通过 id 移除自定义事件监听器，并支持在uts插件中使用 [文档](https://doc.dcloud.net.cn/uni-app-x/api/event-bus.html#on) <https://issues.dcloud.net.cn/pages/issues/detail?id=9068>
* Web平台、App-iOS平台 修复 vue reactive参数传一个对象字面量时返回的结果并不是UTSJSONObject [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=9175)
* Web平台、App-iOS平台 修复 instanceof UniCloudError 的用法报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7848)
* Web平台 修复 vue 使用defineModel编译告警 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=10257)
* App平台 新增 编译器 优化uts类型推导 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/#%E7%B1%BB%E5%9E%8B%E8%87%AA%E5%8A%A8%E6%8E%A8%E5%AF%BC) <https://issues.dcloud.net.cn/pages/issues/detail?id=9967>
* App平台 新增 组件 native-view组件和UniNativeViewElement，支持vue规范开发原生组件 [文档](https://doc.dcloud.net.cn/uni-app-x/component/native-view.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=3846>
* App平台 新增 `标准模式`组件，即通过vue规范和native-view来开发原生组件 [文档](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-component-vue.html)
* App平台 新增 组件 button 支持open-type=agreePrivacyAuthorization 用于同意隐私政策 [文档](https://doc.dcloud.net.cn/uni-app-x/component/button.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=8245>
* App平台 新增 组件 map 地图 [文档](https://doc.dcloud.net.cn/uni-app-x/component/map.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=3849>
* App平台 新增 uni-ad Android平台国内广告新增华为、倍孜、聚力阅盟、泛连渠道；App平台国内广告新增章鱼渠道 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-modules.html#uni-ad) <https://issues.dcloud.net.cn/pages/issues/detail?id=9102>
* App平台 新增 组件 ad 信息流广告 [文档](https://doc.dcloud.net.cn/uni-app-x/component/ad.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=9414>
* App平台 新增 API 隐私信息授权相关API [文档](https://doc.dcloud.net.cn/uni-app-x/api/privacy.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=7900>
* App平台 新增 API uni.getAppBaseInfo 支持渠道包的channel渠道信息 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-app-base-info.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=8190>
* App平台 新增 API uni.createInterstitialAd 插屏广告 [文档](https://doc.dcloud.net.cn/uni-app-x/api/create-interstitial-ad.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=7113>
* App平台 新增 API uni.requestPayment 支付失败错误码 700607 和 700608 [文档](https://doc.dcloud.net.cn/uni-app-x/api/request-payment.html#irequestpaymentfail-values) <https://issues.dcloud.net.cn/pages/issues/detail?id=8366>
* App平台 优化 provider注册机制 [文档](https://doc.dcloud.net.cn/uni-app-x/api/provider.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=7394>
* App平台 修复 编译器 在 windows 系统上运行同步文件可能不正常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=10570)
* App平台 修复 4.19版本引发的 pages.json 下拉刷新loading的样式设置backgroundTextStyle属性无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2537)
* App平台 修复 组件 list-view 组件的@scroll事件参数deltaY数据异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=9121)
* App平台 修复 3.99版本引发的 组件 picker-view，给picker-view动态设置indicator-style、mask-top-style、mask-bottom-style无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6620)
* App平台 修复 3.99版本引发的 CSS border 动态设置 boder/background 样式切换不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7236)
* App平台 修复 4.2版本引发的 编译器 软链的插件编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7397)
* App-Android平台 新增 pages.json pageStyle支持隐藏状态栏和底部指示器，实现全屏效果 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/pagesjson.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=3854>
* App-Android平台 新增 API uni.getFileSystemManager 文件管理模块支持Arraybuffer [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-file-system-manager.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=6881>
* App-Android平台 新增 发行 云端打包支持aab格式 [文档](https://doc.dcloud.net.cn/uni-app-x/tutorial/app-package.html#aab) <https://issues.dcloud.net.cn/pages/issues/detail?id=7171>
* App-Android平台 新增 发行 支持 aaptOptions、buildFeatures 配置 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#aaptoptions) <https://issues.dcloud.net.cn/pages/issues/detail?id=10770>
* App-Android平台 调整 页面内容可渲染到全面屏手势指示条区域 [详情](https://doc.dcloud.net.cn/uni-app-x/api/get-window-info.html#safearea)
* App-Android平台 修复 vue UTSJSONObject使用keyPath不触发响应式变更 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8845)
* App-Android平台 修复 vue keepAlive 组件切换时，触发了 update 生命周期 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7420)
* App-Android平台 修复 vue app.config.globalProperties无法在app.uvue中使用 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=9417)
* App-Android平台 修复 vue defineModel如果父级没有接收，则安卓没有变化 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8741)
* App-Android平台 修复 组件 scroll-view 安卓端4.23scroll-view子元素最后一个元素margin-bottom无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=3866)
* App-Android平台 修复 组件 scroll-view 组件是list-item组件的子元素时可能会不显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6623)
* App-Android平台 修复 4.18版本引发的 组件 scroll-view 嵌套滚动时 scroll-view触发了滚动行为但未触发@scroll事件 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7006)
* App-Android平台 修复 3.91版本引发的 组件 swiper 在app端，swiper第一次触发@animationfinish事件得到detail中的source为空 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2342)
* App-Android平台 修复 组件 text 设置宽高后文本无法修改为空 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=9870)
* App-Android平台 修复 组件 rich-text 组件设置selectable为true时itemclick事件无法触发 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=285)
* App-Android平台 修复 组件 video 全屏播放时点击返回键，直接返回到上一个页面了 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2184)
* App-Android平台 修复 组件 video 返回桌面，在进入是黑屏，不是暂停到当前页面 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7689)
* App-Android平台 修复 组件 canvas Contex.measureText 安卓端绘制文字会抖动 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6631)
* App-Android平台 修复 组件 canvas Context2d arc方法counterclockwise默认值不对 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7107)
* App-Android平台 修复 组件 canvas .toDataURL() 在部分安卓模拟器上卡顿 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7118)
* App-Android平台 修复 组件 canvas 放在swiper里面无法绘制，可见current项可以绘制，但是切换之后回来绘制的内容就不见了  【安卓】 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7188)
* App-Android平台 修复 组件 canvas 绘制的文字为空字符串会闪退 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8772)
* App-Android平台 修复 API uni.setTabBarItem 【安卓端】uni.setTabBarItem设置iconfont报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=9969)
* App-Android平台 修复 CSS transform 设置rotateX或者rotateY为180度时，view消失的bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=5570)
* App-iOS平台 新增 API eventBus 支持在UTS插件中使用 [文档](https://doc.dcloud.net.cn/uni-app-x/api/event-bus.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=9254>
* App-iOS平台 修复 组件 全局事件 onResize 回调参数缺少 size 数据 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8186)
* App-iOS平台 修复 组件 picker-view pickerview 上下蒙版颜色设置被覆盖 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2600)
* App-iOS平台 修复 组件 slider 设置滑块颜色不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=9361)
* App-iOS平台 修复 组件 canvas : Path2D 绘制原点与 Context 绘制原点不一致 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8748)
* App-iOS平台 修复 4.23版本引发的 API uni.setTabBarStyle 设置backgroundColor或backgroundImage时borderColor受影响 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6567)
* App-iOS平台 修复 4.25版本引发的 API uni.showActionSheet 适配横竖屏切换布局错乱 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8542)
* App-iOS平台 修复 API uni.showToast 显示位置不正常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8123)
* App-iOS平台 修复 API uni.chooseVideo 选择苹果手机拍摄的延时视频报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=9886)
* App-iOS平台 修复 4.25版本引发的 CSS border-radius 父视图添加圆角某些场景下无法裁剪子视图 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=10188)
##### uts
* Web平台、App-iOS平台 修复 部分情况下非对象字面量as为UTSJSONObject时会对这个变量创建一个新的UTSJSONObject实例 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=9059)
* App平台 修复 非根目录 config.json 资源文件打包后不存在 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8989)
* App-Android平台 新增 app-android 支持TextDecoder [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/textdecoder.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=9044>
* App-Android平台 修复 4.21版本引发的 number类型的数据在改变之后显示为3.0，4.0，5.0..... [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6450)
* App-Android平台 修复 Number 类型 toString 方法与web有差异 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6791)
* App-Android平台 修复 响应式数组扩展运算结果为空 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7897)
* App-Android平台 修复 typeof null 编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=9392)
* App-Android平台 修复 h函数 第二个参数如何使用变量传入安卓只能使用Map,web端只能使用UTSJSONObject [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1337)
* App-Android平台 修复 UTSJSONObject getXXX 数据不存在时期望返回null [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=9253)
* App-Android平台 修复 4.25版本引发的 UTSJSONObject 包含 number 类型数据时调用 toJSONObject 序列化可能异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=9447)
* App-Android平台 修复 4.25版本引发的 JSON.stringify  replacer 函数 key 参数类型 应该是 string [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=9242)
* App-Android平台 修复 Math.round(NaN) 运行报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7509)
* App-Android平台 修复 容器组件中子组件和排版相关的CSS样式设置无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6060)
* App-Android平台 修复 4.26版本引发的 uts：调用返回参数为promise类型的函数会报UTS: targetFunction does not exists 错误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=10051)
* App-iOS平台 新增 uts插件支持Promise [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/promise.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=3914>
* App-iOS平台 修复 iOS uts组件 props 数组参数 没有作用 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8582)

#### 4.28.2024092105-alpha
##### uni-app x
* App-iOS平台 修复 tabBar 页面无法横屏显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8185)
* App-iOS平台 修复 4.25版本引发的 pages.json pageOrientation 值不为 auto 时运行在 iPad 竖屏切换横屏时页面没有自动适配 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8991)

#### 4.27.2024091308-alpha
##### uni-app x
* 修复 编译器 前端付费插件依赖uts插件本地运行编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7323)
* Web平台 修复 4.25版本引发的 HBuilderX 可视化界面编辑 web 端配置后配置失效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8068)
* App-Android平台 新增 发行 云端打包支持配置 packagingOptions [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#distribute-android) <https://issues.dcloud.net.cn/pages/issues/detail?id=8067>
* App-Android平台 修复 组件 input 部分情况下，input在ScrollView中键盘弹起时，不会自动上推页面 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=5364)
* App-Android平台 修复 4.25版本引发的 组件 video 不指定宽高时全屏后可能宽高不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8363)
* App-Android平台 修复 uni-AD 上架小米应用市场提示`未经用户同意，存在收集SD卡数据的行为` [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7896)
* App-Android平台 修复 API push 使用的个推消息推送 SDK 默认获取应用列表、位置相关信息可能导致无法通过合规检测 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8054)
* App-Android平台 修复 API uni.getImageInfo 云端打包后获取图片信息可能失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7688)
* App-Android平台 修复 API uni.getVideoInfo 云端打包后获取视频信息可能失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8332)
* App-Android平台 修复 4.26版本引发的 API uni.getWindowInfo 在非全面屏手机上screenHeight、windowHeight不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8179)
* App-Android平台 修复 4.26版本引发的 运行调试 打开二级页修改保存后应用重启直达失效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8177)
* App-iOS平台 修复 组件 textarea auto-height:true时设置height，再切换为false恢复的高度不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6561)
* App-iOS平台 修复 组件 input 光标颜色失效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8521)
* App-iOS平台 修复 组件 input 动态更新某些属性可能导致cursor-spacing失效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8530)
* App-iOS平台 修复 4.26版本引发的 组件 Touch 事件 子组件和父组件同时监听 touch 事件，触摸子组件时父组件 touch 事件会多回调一次 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7832)
* App-iOS平台 修复 4.25版本引发的 组件 view click事件位置丢失 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7987)
* App-iOS平台 修复 4.26版本引发的 组件 rich-text 偶现内容不显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7533)
* App-iOS平台 修复 API uni.getLocation 腾讯定位默认配置 UIBackgroundModes 为 location [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8052)
* App-iOS平台 修复 API uni.getImageInfo 非首次获取网络图片信息失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8457)
* App-iOS平台 修复 发行 云端打包uts插件中的framework动态库不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8150)
##### uts插件
* App平台 新增 支持通过装饰器(注解)的方式定义回调函数是否一直存活 [文档](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-plugin.html#keepalive) <https://issues.dcloud.net.cn/pages/issues/detail?id=8436>
* App-Android平台 修复 函数返回的UTSJSONObject属性下的数据对象为空 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6735)
* App-Android平台 修复 UTSJSONObject 检索内部属性耗时过多 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=5147)
* App-Android平台 修复 无法声明 RegExpExecArray 类型 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=5529)
* App-Android平台 修复 4.26版本引发的 uni-app项目中 函数 默认参数与可选参数不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8199)
* App-Android平台 修复 4.26版本引发的 JSON.stringify 可能将 UTSJSONObject 中绝对值小于1的数据值转换为0 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8365)

#### 4.26.2024082213-alpha
##### uni-app-x
* App平台 新增 组件 canvas 支持绘制自定义字体 [文档](https://doc.dcloud.net.cn/uni-app-x/api/canvasrenderingcontext2d.html#custonfont) <https://issues.dcloud.net.cn/pages/issues/detail?id=5359>
* App平台 调整 API uni.getWindowInfo 返回的 screenTop 属性废弃 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7095)
* App-Android平台 修复 4.25版本引发的 编译器 当代码中定义一个包含大量数据的UTSJSONObject数组字面量时，编译报 method too large [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6906)
* App-Android平台 修复 4.25版本引发的 API uni.getLocation 导入uni-getLocation-tencent插件云打包报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6890)
* App-Android平台 修复 4.25版本引发的 API uni.getWindowInfo 返回的 screenHeight 值可能不是设备屏幕高度 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7058)
* App-Android平台 修复 4.14版本引发的 CSS overflow 多级子 view 全部设置 overflow 为 visible 后点击 view 可能引起崩溃 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6957)
* App-iOS平台 修复 组件 rich-text 设置 border 后高度会自动增加 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6989)
* App-iOS平台 修复 组件 rich-text 动态设置内容后组件高度未更新 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6991)
* App-iOS平台 修复 API uni.setTabBarStyle 取消设置backgroundImage后backgroundColor受影响的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6587)
* App-iOS平台 修复 API push 默认使用的发送通知许可描述不准确导致上架 AppStore 审核可能被拒 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7001)
* App-iOS平台 修复 CSS border-width 动态修改某些css属性可能导致border-width恢复为默认值的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6624)
##### uts插件
* App-Android平台 修复 3.91版本引发的 UTS插件在uniapp项目上运行报错，‌error: Unresolved reference: getMainExecutor‌ [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6345)

#### 4.25.2024081703-alpha
##### uni-app-x
* 新增 发行 原生SDK iOS版。可用于原生应用集成或本地打包 [文档](https://doc.dcloud.net.cn/uni-app-x/native) <https://issues.dcloud.net.cn/pages/issues/detail?id=4462>
* 新增 编译器 uts插件支持kt、java、swift代码混编 [文档](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-plugin-hybrid.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=3913>
* 新增 编译器 支持 import json 文件 [文档](https://uniapp.dcloud.net.cn/tutorial/page-json.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=2560>
* 新增 编译器 支持 .env 文件配置环境变量 [文档](https://uniapp.dcloud.net.cn/tutorial/env.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=4254>
* 新增 组件 canvas 及上下文对象 [文档](https://doc.dcloud.net.cn/uni-app-x/dom/unicanvaselement.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=3769>
* 新增 API requestAnimationFrame/cancelAnimationFrame [文档](https://doc.dcloud.net.cn/uni-app-x/api/animation-frame.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=3832>
* 新增 API uni.createSelectorQuery 补充传入参数 node/filed [文档](https://doc.dcloud.net.cn/uni-app-x/api/create-selector-query.html#fields-%E5%85%BC%E5%AE%B9%E6%80%A7) <https://issues.dcloud.net.cn/pages/issues/detail?id=3263>
* 修复 scroll-view的@scroll事件event参数中的detail类型报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2420)
* Web平台、App-iOS平台 修复 scroll-view/list-view 动态设置 refresher-triggered 为 true 时没有触发 refresherpulling 事件 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2359)
* Web平台、App-iOS平台 调整 组件 switch 移除margin-right的5px 保持和Android一致 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6708)
* Web平台 修复 组件 image 的widthFix部分场景下表现异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1762)
* App平台 新增 API 全局 Image 类用于 canvas 绘制 [文档](https://doc.dcloud.net.cn/uni-app-x/api/create-canvas-context-async.html#createimage)
* App平台 新增 DOM API UniElement getAndroidView()/getIOSView() 获取原生view [文档](https://doc.dcloud.net.cn/uni-app-x/dom/unielement.html#getandroidview) <https://issues.dcloud.net.cn/pages/issues/detail?id=3844>
* App平台 新增 API uni.getLaunchOptionsSync 返回参数补充 appLink/appScheme，获取通用链接和scheme启动参数 [文档](https://doc.dcloud.net.cn/uni-app-x/api/launch.html#getenteroptionssync) <https://issues.dcloud.net.cn/pages/issues/detail?id=2990>
* App平台 新增 API uni.getEnterOptionsSync [文档](https://doc.dcloud.net.cn/uni-app-x/api/launch.html#getlaunchoptionssync) <https://issues.dcloud.net.cn/pages/issues/detail?id=5552>
* App平台 新增 API provider开放自注册，并调整 uni.getProvider 的返回值命名 [文档](https://doc.dcloud.net.cn/uni-app-x/api/provider.html#getprovider) <https://issues.dcloud.net.cn/pages/issues/detail?id=5843>
* App平台 新增 API uni.setAppBadgeNumber 设置桌面应用图标的角标 [文档](https://doc.dcloud.net.cn/uni-app-x/api/uni-push.html#setappbadgenumber) <https://issues.dcloud.net.cn/pages/issues/detail?id=4194>
* App平台 新增 API uni.getLocation 内置腾讯定位，支持Provider属性来切换系统定位和腾讯定位 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-modules.html#uni-getlocation) <https://issues.dcloud.net.cn/pages/issues/detail?id=5666>
* App平台 新增 API uni.chooseImage UI国际化 Android平台补充法语和西班牙语；iOS平台补充中文繁体、英语、法语和西班牙语 [文档](https://doc.dcloud.net.cn/uni-app-x/i18n.html#%E6%A1%86%E6%9E%B6%E5%86%85%E7%BD%AE%E7%BB%84%E4%BB%B6%E5%92%8Capi%E5%9B%BD%E9%99%85%E5%8C%96) <https://issues.dcloud.net.cn/pages/issues/detail?id=4162>
* App平台 新增 API uni.chooseVideo UI国际化 Android平台补充法语和西班牙语；iOS平台补充中文繁体、英语、法语和西班牙语 [文档](https://doc.dcloud.net.cn/uni-app-x/i18n.html#%E6%A1%86%E6%9E%B6%E5%86%85%E7%BD%AE%E7%BB%84%E4%BB%B6%E5%92%8Capi%E5%9B%BD%E9%99%85%E5%8C%96) <https://issues.dcloud.net.cn/pages/issues/detail?id=5526>
* App平台 修复 3.99版本引发的 API uni.request 返回的数据是json字符串不会自动解析成UTSJSONObject [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=3116)
* App平台 修复 DOM API CSSStyleDeclaration app端通过style.setProperty设置元素的border样式不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2446)
* App-Android平台 新增 组件 video 支持子组件，可自定义全屏时的UI表现 [文档](https://doc.dcloud.net.cn/uni-app-x/component/video.html#children-tags)
* App-Android平台 修复 4.02版本引发的 编译器 `<script setup>`导入外部文件定义的包含条件编译的props时编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6658)
* App-Android平台 修复 4.21版本引发的 vue v-for循环JSON.parse出来的数值运行时报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=3807)
* App-Android平台 修复 vue v-slot与v-if/v-for结合使用时编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=5059)
* App-Android平台 修复 app.uvue 应用生命周期（如onLaunch）中发生异常时错误信息不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2007)
* App-Android平台 修复 组件 text 、button 横竖屏切换时文本渲染可能不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6001)
* App-Android平台 修复 组件 scroll-view 设置上下padding或者border后可能会出现滚动条 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1930)
* App-Android平台 修复 组件 scroll-view 设置scroll-into-view属性可能出现位置不对 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2598)
* App-Android平台 修复 组件 scroll-view 横向滚动设置scrollleft scroll-with-animation="true"动画不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=4442)
* App-Android平台 修复 组件 list-view @scroll事件参数event.detail中的scrollWidth为0 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2445)
* App-Android平台 修复 组件 list-item 子组件复用后 event 事件可能触发异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=5160)
* App-Android平台 修复 3.98版本引发的 组件 list-view listview中使用sticky-section和sticky-header新增数据显示不全 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2988)
* App-Android平台 修复 组件 image 组件设置border后默认mode值效果不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2654)
* App-Android平台 修复 3.99版本引发的 组件 input 设置password但不设置value会白屏 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2462)
* App-Android平台 修复 组件 web-view 进度条color设置简写RGB颜色闪退 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2130)
* App-Android平台 修复 组件 web-view pointer-events属性不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2621)
* App-Android平台 修复 组件 video 点击播放时不显示播放控件 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=3982)
* App-Android平台 修复 组件 video 中间播放按钮不清晰 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=5638)
* App-Android平台 修复 组件 video controlstoggle事件可能不触发 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=5642)
* App-Android平台 修复 组件 slider 横向多重嵌套排列的若干个slider 只有第一个可以正常拖动 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=4050)
* App-Android平台 新增 API uni.getAppAuthorizeSetting 补充相册、蓝牙的授权状态 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-app-authorize-setting.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=4378>
* App-Android平台 新增 API uni.getPushChannelManager 获取推送渠道管理器。同时废弃uni.getChannelManager [文档](https://doc.dcloud.net.cn/uni-app-x/api/uni-push.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=5242>
* App-Android平台 修复 3.99版本引发的 API uni.getSystemInfoSync 、getSystemInfo()、getWindowInfo()的screenHeight属性某些情况下高度异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2330)
* App-Android平台 修复 API uni.getSystemInfoSync getSystemInfoSync在多窗口模式下返回的screen、window、status高度错误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2570)
* App-Android平台 修复 API uni.addInterceptor 无法拦截点击tabbar的行为 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2776)
* App-Android平台 修复 API 网络 应用退出后Cookie也清除了 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2364)
* App-Android平台 修复 3.99版本引发的 API uni.request 泛型设为string时，解析失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=4010)
* App-Android平台 修复 3.99版本引发的 API websocket 回调内触发异常，导致多次触发fail回调 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2829)
* App-Android平台 修复 3.99版本引发的 API uni.getLocation type 为 wgs84 时在Android 7.x 版本无法定位 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6785)
* App-Android平台 修复 API uni.createSelectorQuery 在template有多个跟节点时无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2981)
* App-Android平台 修复 API uni.createVideoContext 调用requestFullScreen进入全屏时屏幕方向不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=3989)
* App-Android平台 修复 API uni.$emit 传对象字面量参数时编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=5321)
* App-Android平台 修复 API uni.setStorageSync 存储对象字面量时编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=5392)
* App-Android平台 修复 API uni.rpx2px 某些尺寸的设备上单位精度可能偏差 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6769)
* App-Android平台 修复 3.97版本引发的 CSS overflow 组件设置overflow:visible样式后，通过transform:translate移动组件，位置偏差 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2406)
* App-Android平台 修复 4.13版本引发的 CSS overflow 组件设置overflow:visible时，点击事件分发错误的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2481)
* App-Android平台 修复 4.13版本引发的 CSS overflow 设置overflow: visible后hover-class会失效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2490)
* App-Android平台 修复 3.99版本引发的 CSS border 某些情况下border-color与background-image同时设置时，颜色异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=4996)
* App-Android平台 修复 运行调试 离线打包基座，targetSdk34下真机运行失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2424)
* App-Android平台 修复 发行 app运行时修改部分系统设置后返回app可能会白屏 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=273)
* App-iOS平台 新增 组件 list-item 支持复用 [文档](https://doc.dcloud.net.cn/uni-app-x/component/list-item.html#list-item%E5%A4%8D%E7%94%A8%E6%9C%BA%E5%88%B6)
* App-iOS平台 新增 pages.json 支持配置页面横屏 pageOrientation 属性 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/pagesjson.html#pagesoptionspage-style)
* App-iOS平台 新增 API uni.requestVirtualPayment / uni.getVirtualPaymentManager 苹果应用内支付IAP [文档](https://doc.dcloud.net.cn/uni-app-x/api/virtual-payment.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=3843>
* App-iOS平台 新增 API navigator 支持 animationType 设置页面动画 [文档](https://doc.dcloud.net.cn/uni-app-x/api/navigator.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=5641>
* App-iOS平台 新增 API uni.compressImage 支持压缩图片 [文档](https://doc.dcloud.net.cn/uni-app-x/api/compress-image.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=4844>
* App-iOS平台 新增 API uni.getImageInfo 支持获取图片信息 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-image-info.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=4847>
* App-iOS平台 新增 API uni.getVideoInfo 支持获取视频信息 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-video-info.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=4851>
* App-iOS平台 新增 API uni.compressVideo 支持压缩视频 [文档](https://doc.dcloud.net.cn/uni-app-x/api/compress-video.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=4852>
* App-iOS平台 新增 API uni.getElementById 可在 uts 插件中使用 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-element-by-id.html#getelementbyid) <https://issues.dcloud.net.cn/pages/issues/detail?id=5573>
* App-iOS平台 新增 API uni.getPerformance 获取性能数据 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-performance.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=3018>
* App-iOS平台 修复 vue 通过 this.data 赋值ref和查询元素不全等 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=3520)
* App-iOS平台 修复 页面、应用 onLoad，应用 onShow 回调参数没有对中文解码 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6280)
* App-iOS平台 修复 pages.json tabbar是纯文字时，没有居中，并且文字超出不显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2521&ask_id=190221)
* App-iOS平台 修复 组件 全局属性和事件 根节点 template 不包含子元素时页面 onReady 事件不会触发 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2386)
* App-iOS平台 修复 组件 scroll-view/list-view refresherabort 事件返回的 dy 值不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=5349)
* App-iOS平台 修复 组件 list-view 列表加载内容过多应用闪退 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2043)
* App-iOS平台 修复 组件 list-view 自定义下拉刷新动画结束时首部的 sticky-header 组件复位动画异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2412)
* App-iOS平台 修复 组件 list-view 动态增删子元素布局可能会错乱 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2787)
* App-iOS平台 修复 组件 list-view/scroll-view 下拉刷新事件 refresherabort 可能不触发 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2448)
* App-iOS平台 修复 组件 swiper 属性autoplay设置true，首次横向滑动切换@transition事件参数e.detail.dy错误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2426)
* App-iOS平台 修复 组件 text 嵌套后对不齐 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2259)
* App-iOS平台 修复 组件 button 同时设置setProperty和attributes样式不完全生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=5017&ask_id=193724)
* App-iOS平台 修复 组件 input 当view添加touch事件后可能导致隐藏键盘的事件没有触发 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2258)
* App-iOS平台 修复 组件 input placeholderStyle 不支持设置字体大小 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=4068)
* App-iOS平台 修复 组件 rich-text click 事件不触发及点击时父节点的 click 事也不触发 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6613)
* App-iOS平台 修复 组件 web-view 组件监听 touchstart事件后和webview自身手势冲突，造成部分网页上下滑动异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=5472)
* App-iOS平台 修复 API uni.showModal uni.showModel 连续弹出无法关闭的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2466)
* App-iOS平台 修复 API uni.setTabBarItem 设置visible无法隐藏某项item [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2547)
* App-iOS平台 修复 CSS box-shadow 不显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2399)
* App-iOS平台 修复 CSS border-style 无法动态移除 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6680)
* App-iOS平台 修复 CSS flex-flow 使用缩写排版效果不稳定 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=3855)
* App-iOS平台 修复 页面关闭后某些类未全部释放销毁 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6064)
##### uts
* Web平台 新增 UTSJSONObject 补齐 keys、assign 方法 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/utsjsonobject.html#%E9%9D%99%E6%80%81%E6%96%B9%E6%B3%95) <https://issues.dcloud.net.cn/pages/issues/detail?id=4370>
* Web平台 修复 JSON.parse接收方法父级作用域传入的泛型时报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=5074)
* App-Android平台 新增 ArrayBuffer [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/arraybuffer.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=3770>
* App-Android平台 新增 atob,btoa 方法 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/global.html#atob-encodeddata-string-string) <https://issues.dcloud.net.cn/pages/issues/detail?id=2709>
* App-Android平台 新增 JSON.stringify 支持 replacer、space 参数 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/json.html#stringify-value-replacer-space) <https://issues.dcloud.net.cn/pages/issues/detail?id=1183>
* App-Android平台 新增 Date构造函数 支持的日期字符串与浏览器保持一致 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/date.html#date) <https://issues.dcloud.net.cn/pages/issues/detail?id=4518>
* App-Android平台 新增 String 支持 isWellFormed/toWellFormed [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=3479>
* App-Android平台 新增 RegExp 不支持空构造/常规字面量 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/regexp.html#regexp) <https://issues.dcloud.net.cn/pages/issues/detail?id=3705>
* App-Android平台 新增 UTSAndroid.requestSystemPermission 增加shallUnCheck 选项，用来忽略异常检测 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#requestsystempermission) <https://issues.dcloud.net.cn/pages/issues/detail?id=2346>
* App-Android平台 修复 uts API加密插件发行时编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=3467)
* App-iOS平台 修复 对class属性赋值时，没有触发属性的setter方法 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1951)
* App-iOS平台 修复 调用uts代码参数中包含callback时，UTSCallback在内存中未释放 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2288)

#### 4.23.2024070309-alpha
##### uni-app-x
* 新增 API uni.setTabBarStyle/pages.json 支持传递 borderColor 设定自定义边框颜色，优先级高于 borderStyle [详情](https://doc.dcloud.net.cn/uni-app-x/api/set-tabbar.html#settabbarstyle)
* Web平台、App-Android平台 调整 API uni.setTabBarStyle/pages.json 中 borderStyle 只支持 black/white [详情](https://doc.dcloud.net.cn/uni-app-x/api/set-tabbar.html#settabbarstyle)
* Web平台 修复 4.22版本引出的 开发阶段内置浏览器白屏的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2722)
* Web平台 修复 4.21版提供的 canvas API 缺失 toDataURL/toBlob 方法的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2811)
* App平台 调整 API uni.getDeviceInfo 返回数据中的 devicePixelRatio 属性类型为 number [详情](https://doc.dcloud.net.cn/uni-app-x/api/get-device-info.html#%E8%BF%94%E5%9B%9E%E5%80%BC)
* App-iOS平台 修复 4.22版本引出的 自定义组件样式污染造成渲染变慢的bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2592)
* App-iOS平台 修复 组件 form submit/reset 事件 target 属性为 null 的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2798)
* App-iOS平台 修复 uts组件插件触发 event 事件参数中缺少 type、target 等属性的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2801)
* App-Android平台 修复 组件 list-view 设置 scroll-top 属性值域与 upper-threshold 属性值域相同时，部分安卓设备可能不触发 scrolltoupper 事件的Bug[详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2847)
##### uts
* App-iOS平台 新增 UTSJSONObject 支持 assign、keys 等静态方法 [详情](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/utsjsonobject.html#%E9%9D%99%E6%80%81%E6%96%B9%E6%B3%95)
* App-iOS平台 修复 UTSJSONObject 中包含 Map 类型数据可能会引起崩溃的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2047)

#### 4.22.2024062415-alpha
##### uni-app-x
* Web平台 修复 input 在 type="digit"，在有初始值的情况下输入小数点时输入框清空的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2601)
* Web平台 修复 tabBar切换时不能记忆滚动位置的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2516)
* App-Android平台 修复 响应式API可能存在内存泄漏的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2543)
* App-Android平台 修复 组件 switch 在 list-view 组件中显示状态可能不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2482)
* App-iOS平台 新增 uni-ad 开屏广告 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-modules.html#uni-ad)
* App-iOS平台 新增 uni-ad 激励视频广告 [文档](https://doc.dcloud.net.cn/uni-app-x/api/create-rewarded-video-ad.html)
* App-iOS平台 修复 组件 button 动态设置 text 文本重复显示的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2507)
* App-iOS平台 修复 API uni.setTabBarStyle 参数 backgroundImage 无效的bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2523)
* App-iOS平台 修复 自定义组件样式污染的bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2592)
* App-iOS平台 修复 `Info.plist` 中配置应用支持的横竖屏后云端打包无效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2639)

#### 4.21.2024061818-alpha
##### uni-app-x
* 新增 onError 应用生命周期 [详情](https://doc.dcloud.net.cn/uni-app-x/collocation/app.html)
* Web平台 调整 移除老版 canvas 规范, 使用 W3C 规范及微信小程序新版规范 [详情](https://doc.dcloud.net.cn/uni-app-x/component/canvas.html)
* Web平台 修复 暗黑模式下，theme.json 中配置 tabbar 的 iconPath 或 selectedIconPath 或 midButton -> backgroundImage 的路径不以 / 开头时在发行模式下图片 404 不显示的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2472)
* Web平台 修复 uni.setTabBarStyle后minbutton消失的bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2513)
* App-Android平台 调整 系统底栏背景色与页面 backgroundColorContent 颜色一致 [详情](https://doc.dcloud.net.cn/uni-app-x/collocation/pagesjson.html#pagesoptionspage-tips)
* App-Android平台 修复 离线打包 number 类型判断相等可能与云打包结果不一致的bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2422)
* App-Android平台 修复 响应式数组调用 unshift 方法不触发响应式变更 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2151)
* App-Android平台 调整 input/textarea 组件同时设置 modelValue 和 value 时，modelValue 优先级更高 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2236)
* App-iOS平台 修复 uts 插件事件包含大写触发后无法接收事件的bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2525)
##### uts
* App-Android平台 修复 可选 number 类型判断相等结果可能不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2439)
* App-Android平台 修复 UTSJSONObject 通过 getXXX 方法获取对象属性返回的不是引用的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2340)
* App-Android平台 修复 JSON.parse 返回的数字类型通过 console.log 打印输出类型不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2427)
* App-iOS平台 修复 4.18版本引出的 uts组件插件使用时设置 style 可能会被默认 style 覆盖的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2411)

#### 4.19.2024060704-alpha
##### uni-app-x
* 新增 uni_modules 前端 easycom 组件支持加密付费销售 [详情](https://uniapp.dcloud.net.cn/plugin/publish.html#components-pay)
* App平台 新增 uniCloud.chooseAndUploadFile 支持选择视频并上传 [详情](https://doc.dcloud.net.cn/uni-app-x/api/unicloud/storage.html#chooseanduploadfile)
* App平台 调整 API uni.onAppThemeChange 计算后的应用主题值变化才会触发监听回调 [详情](https://doc.dcloud.net.cn/uni-app-x/api/theme.html#onappthemechange)
* App-iOS平台 修复 4.18版本引出的 触发 @longpress 事件引起应用闪退的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2334)
* App-iOS平台 修复 组件 list-item 在 v-for 使用数组方法会错乱的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2287)
* App-iOS平台 修复 API uni.setAppTheme 设置主题状态应用退出后未保存的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2372)
* App-iOS平台 修复 uts 付费插件编译报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2085)
##### uts
* App-Android平台 修复 可选链调用的后续连续调用也必须手动增加可选链的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2144)
* App-iOS平台 修复 uts 插件中导出 class 包含 init 构造函数编译报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2177)
* App-iOS平台 修复 uts 插件中 interface 定义 Promise 返回值编译报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2251)

#### 4.18.2024060311-alpha
##### uni-app-x
* 新增 theme.json 用于pages.json中颜色主题变量定义，处理暗黑模式的pages.json兼容 [详情](https://doc.dcloud.net.cn/uni-app-x/collocation/themejson.html)
* 新增 switch 组件属性 backgroundColor/activeBackgroundColor/foreColor/activeForeColor [详情](https://doc.dcloud.net.cn/uni-app-x/component/switch.html)
* 新增 slider 组件属性 activeBackgroundColor/foreColor/valueColor [详情](https://doc.dcloud.net.cn/uni-app-x/component/slider.html)
* 新增 radio 组件属性 foreColor 替代 iconColor/color [详情](https://doc.dcloud.net.cn/uni-app-x/component/radio-group.html)
* 新增 checkbox 组件属性 foreColor 替代 iconColor/color [详情](https://doc.dcloud.net.cn/uni-app-x/component/checkbox-group.html)
* 新增 API $setPageStyle 支持更多属性 [详情](https://doc.dcloud.net.cn/uni-app-x/api/get-current-pages.html#setpagestyle)
* 调整 vue框架 validateProp 方法, required prop 存在 default value 时不告警 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1600)
* Web平台 新增 服务端渲染（ssr） [详情](https://doc.dcloud.net.cn/uni-app-x/web/ssr.html)
* Web平台 调整 去除 uni-text、uni-input、uni-textarea、uni-view 组件根节点的`color: black`样式
* Web平台 修复 pages.json 下拉刷新默认背景色不为透明的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1726)
* Web平台 修复 组件 input/textarea 同时设置 modelValue 和 value 显示效果不一致的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2236)
* Web平台 修复 组件 list-item 包含在自定义组件内时在 list-view 内不显示的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2199)
* Web平台 修复 API uni.getAppBaseInfo、uni.getSystemInfo 内缺少部分属性的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1917)
* Web平台 修复 API uni.getVideoInfo 返回的 size 属性单位不为KB的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2250)
* Web平台 修复 API $getPageStyle获取到的对象不是UTSJSONObject的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1916)
* App平台 新增 manifest 设置 url scheme，可从外部打开App [详情](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#urlscheme)
* App平台 新增 API uni.chooseVideo 支持拍摄视频或从手机相册中选视频 [详情](https://doc.dcloud.net.cn/uni-app-x/api/choose-video.html)
* App平台 新增 API uni.saveVideoToPhotosAlbum 支持保存视频到相册 [详情](https://doc.dcloud.net.cn/uni-app-x/api/save-video-to-photos-album.html)
* App平台 新增 API uni.getProvider 成功回调参数支持 providers [详情](https://doc.dcloud.net.cn/uni-app-x/api/get-provider.html)
* App平台 新增 API uni.getDeviceInfo 返回数据支持os、rom相关属性 [详情](https://doc.dcloud.net.cn/uni-app-x/api/get-device-info.html)
* App平台 新增 API uni.setAppTheme 设置应用主题；uni.onAppThemeChange 监听应用主题变化；uni.onOsThemeChange 监听系统主题变化 [详情](https://doc.dcloud.net.cn/uni-app-x/api/theme.html)
* App平台 新增 API uni.getSystemInfo、uni.getAppBaseInfo 返回数据支持 `appTheme` 属性 [详情](https://doc.dcloud.net.cn/uni-app-x/api/get-app-base-info.html)
* App平台 修复 部分内置组件事件触发缺少target属性的Bug[详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1932)
* App平台 修复 组件 textarea 设置 flex 为 1 时高度异常的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2045)
* App-Android平台 新增 `uni-app x 原生SDK`，可用于原生App集成和离线打包 [详情](https://doc.dcloud.net.cn/uni-app-x/native/)
* App-Android平台 新增 API uni.getImageInfo 支持获取图片信息 [详情](https://doc.dcloud.net.cn/uni-app-x/api/get-image-info.html)
* App-Android平台 新增 API uni.compressImage 支持压缩图片 [详情](https://doc.dcloud.net.cn/uni-app-x/api/compress-image.html)
* App-Android平台 新增 API uni.getVideoInfo 支持获取视频信息 [详情](https://doc.dcloud.net.cn/uni-app-x/api/get-video-info.html)
* App-Android平台 新增 API uni.compressVideo 支持压缩视频 [详情](https://doc.dcloud.net.cn/uni-app-x/api/compress-video.html)
* App-Android平台 新增 API uni.navigateTo/uni.navigateBack 参数 animationType [详情](https://doc.dcloud.net.cn/uni-app-x/api/navigator.html#navigateto)
* App-Android平台 新增 组件 navigator 参数 animationType [详情](https://doc.dcloud.net.cn/uni-app-x/component/navigator.html)
* App-Android平台 新增 pages.json 配置页面动画属性 animationType [详情](https://doc.dcloud.net.cn/uni-app-x/collocation/pagesjson.html)
* App-Android平台 修复 首次安装可能重复打开首页的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2231)
* App-Android平台 修复 小窗口模式应用导航栏高度不正确的问题Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2117)
* App-Android平台 修复 异步创建组件时可能会崩溃的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2133)
* App-Android平台 修复 组件内发生异常可能不会输出到控制台的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=880)
* App-Android平台 修复 tabBar 同时设置 borderStyle、backgroundColor 为深色时会显示一条白线的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2116)
* App-Android平台 修复 组件 scroll-view 设置 scroll-top 属性不触发 scroll 事件的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2249)
* App-Android平台 修复 组件 swiper 竖向滑动动画过快的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1550)
* App-Android平台 修复 组件 swiper 嵌套时在部分场景可能滑动冲突Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1069)
* App-Android平台 修复 组件 swiper 部分场景事件触发顺序可能错乱的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1944)
* App-Android平台 修复 组件 video 未设置 direction 属性时进入全屏视频方向可能不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2042)
* App-Android平台 修复 组件 video 通过 uni.createVideoContext 调用 stop 后重新播放不显示视频封面图的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2314)
* App-Android平台 修复 组件 web-view 在滚动容器中可能出现滑动冲突的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1488)
* App-Android平台 修复 组件 web-view 设置 android-layer-type 属性无效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2088)
* App-Android平台 修复 组件 web-view 中输入框获取焦点后可能被软键盘遮挡的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1771)
* App-Android平台 修复 API uni.showToast 同时弹出多个提示框显示异常的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1663)
* App-Android平台 修复 uniIdRouter 在首页是需要登录的页面时未自动跳转到登录页面的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2027)
* App-Android平台 修复 VUE ref、reactive、readonly、shallowRef、shallowReactive、shallowReadonly 使用泛型+对象/数组字面量编译报错的Bug [详情](http://git.dcloud.io/uni-app-next/uts/commit/5f9278a020c435a35b0a782e2d56fcc9dbd78f08)
* App-Android平台 修复 VUE v-for 不支持循环 UTSJSONObject 的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1839)
* App-Android平台 修复 VUE inject 不支持泛型的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1787)
* App-Android平台 更新 一键登录使用的个推核心组件SDK为 3.2.13.0 版，个验SDK为 3.1.6.3 版，解决与 uni-push 一起使用存在冲突的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1749)
* App-Android平台 优化 组件 slider 在滚动容器中的行为 [详情](https://doc.dcloud.net.cn/uni-app-x/component/slider.html)
* App-iOS平台 新增 splash 在 manifest.json 中配置`storyboard`启动界面 [详情](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-splashscreen.html#ios)
* App-iOS平台 补齐 tabbar 支持 fontSize、iconWidth、spacing、iconfontSrc、backgroundImage 等属性 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/pagesjson.html#pages-tabbar)
* App-iOS平台 补齐 API uni-push [详情](https://doc.dcloud.net.cn/uni-app-x/api/push.html)
* App-iOS平台 补齐 API uni.requestPayment 支持支付宝支付、微信支付 [详情](https://doc.dcloud.net.cn/uni-app-x/api/request-payment.html)
* App-iOS平台 补齐 API uni.getUniverifyManager 支持一键登录 [详情](https://doc.dcloud.net.cn/uni-app-x/api/request-payment.html)
* App-iOS平台 补齐 API UniResizeObserver 监视 UniElement 元素的大小变化 [详情](https://doc.dcloud.net.cn/uni-app-x/dom/uniresizeobserver.html)
* App-iOS平台 调整 onShow 生命周期由页面动画完成时触发改为固定在 onCreate 之后触发 [详情](https://doc.dcloud.net.cn/uni-app-x/page.html#lifecycle)
* App-iOS平台 调整 组件 text 渲染高度计算逻辑，靠近 safari 浏览器渲染逻辑
* App-iOS平台 修复 云端打包 未勾选`支持iPad`生成的安装包仍然可全屏运行在iPad设备的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2105)
* App-iOS平台 修复 组件 touch 事件返回数据不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2165)
* App-iOS平台 修复 组件 scroll-view 自定义下拉刷新可能引起某些元素不显示的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1669)
* App-iOS平台 修复 组件 progress 回调事件不完整的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2237)
* App-iOS平台 修复 组件 事件回调包装不完整的 Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2240)
* App-iOS平台 修复 CSS 样式支持 cubic-bezier [详情](https://doc.dcloud.net.cn/uni-app-x/css/transition-timing-function.html)
* App-iOS平台 修复 CSS background-image 动态设置空字符时没有恢复默认值的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2033)
* App-iOS平台 修复 CSS opacity 值为 0 时不响应点击事件的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2200)
* App-iOS平台 修复 API uni.downloadFile 下载地址中含有特殊字符会导致失败的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2235)
##### uts
* Web平台 App-iOS平台 调整 uts 编译为 js 时 any 类型调整为包含 null 类型 [详情](https://doc.dcloud.net.cn/uni-app-x/uts/type-compatibility.html#any%E7%B1%BB%E5%9E%8B)
* Web平台 App-iOS平台 修复 JSON.parse传入泛型为Map时报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1985)
* App平台 修复 类的成员变量使用对象字面量初始化 type 类型时编译报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1924)
* App-Android平台 新增 UTSJSONObject 支持 assign、keys 等静态方法 [详情](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/utsjsonobject.html#%E9%9D%99%E6%80%81%E6%96%B9%E6%B3%95)
* App-Android平台 新增 UTSAndroid.onActivityCallback 监听 activity 各种生命周期 [详情](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#onactivitycallback-callback-pageroute)
* App-Android平台 新增 UTSAndroid.onPrivacyAgreeChange 监听同意应用隐私政策状态变更 [详情](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#onprivacyagreechange)
* App-Android平台 优化 JSON.parse 解析数据速度 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1561)
* App-Android平台 修复 JSON.parse 在部分场景下输出日志错乱的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1952)
* App-Android平台 修复 Date 构造函数不支持部分格式字符串的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1774)
* App-Android平台 修复 console.log 无法打印复杂对象的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1399)
* App-Android平台 修复 Math.ceil/floor/round 不支持64位整型数字的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1817)
* App-Android平台 修复 UTSAndroid.offAppActivityPause 可能会引发应用闪退的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1613)
* App-Android平台 修复 模板字符串不支持转义的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=883)
* App-iOS平台 修复 uni.request 携带泛型报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2049)
* App-iOS平台 修复 参数签名传递 function 表达式编译报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1852)
* App-iOS平台 修复 当 switch 的 case 语句块仅包含break时编译报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1640)
* App-iOS平台 修复 部分情况下赋值语句编译不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1520)

#### 4.17.2024051110-alpha
##### uni-app-x
* Web平台 修复 4.16 引出的 input 组件 type="number" 时触发不了 input 事件的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1960)
##### uts插件
* App-iOS平台 修复 HBuilderX安装路径中包含空格或者中文时，UTS插件真机运行编译失败的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1950)

#### 4.16.2024051009-alpha
##### uni-app-x
* Web平台 新增 $setPageStyle、$getPageStyle 支持 backgroundColorContent 属性 [详情](https://doc.dcloud.net.cn/uni-app-x/api/get-current-pages.html#setpagestyle)
* Web平台 补齐 API UniResizeObserver 监视 UniElement 元素的大小变化 [详情](https://doc.dcloud.net.cn/uni-app-x/dom/uniresizeobserver.html)
* Web平台 修复 4.11版本引出的 因升级vue版本导致 css内使用v-bind且值包含rpx时无效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1830)
* App平台 修复 CSS border 在某些情况下渲染导常的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1701)
* App平台 修复 CSS position 设置为 fixed 时某些情况下位置不对的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1681)
* App平台 修复 CSS flex-direction 设置为 row，flex-wrap 为 wrap 且设置 min-height 时可能高度计算不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1528)
* App-Android平台 修复 组件 image 设置 mode 为 widthFix 在部分场景图片显示可能不完整的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1764)
* App-Android平台 修复 组件 input、textarea 的 keyboardheightchange、focus 事件某些情况下返回键盘高度为 0 的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1362)
* App-Android平台 修复 组件 input、textarea 在 list-view 中获取焦点可能被弹出软键盘遮挡的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1846)
* App-Android平台 修复 4.11版引出的 组件 list-view 设置 scroll-top 属性滚动位置与预期不符的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1922)
* App-Android平台 修复 组件 list-item 子元素使用 v-show 控制是否显示时可能出现异常的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1857)
* App-Android平台 修复 组件 text 设置宽高和边框时 text-align 居中效果不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1383)
* App-Android平台 修复 API uni.getSystemInfo 返回 osTheme 字段值为 null 的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1688)
* App-Android平台 修复 UniElement 获取 offsetLeft 属性值异常的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1539)
* App-Android平台 修复 CSS 同时设置 display 和 visibility 可能出现其中一个属性不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1923)
* App-iOS平台 新增 组件 textarea 支持 confirm-type 属性 [详情](https://doc.dcloud.net.cn/uni-app-x/component/textarea.html)
* App-iOS平台 修复 组件 video 在 list-view 中全屏播放后退出全屏无法回到原来位置上的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1491)
* App-iOS平台 修复 组件 video 在 iPad 设备全屏播放时可能无法横屏显示的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1565)
* App-iOS平台 修复 API uni.setNavigationBarColor 传入非法值时导航栏背景色变为白色的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1841)
* App-iOS平台 修复 API $setPageStyle 在 page.json 中关闭页面下拉刷新时，无法通过 $setPageStyle 方法动态开启页面下拉刷新的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1838)
* App-iOS平台 修复 API $setPageStyle 动态设置页面容器背景色不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1837)
* App-iOS平台 修复 API $getPageStyle 返回值可能是旧值的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1871)
* App-iOS平台 修复 Tab 页面创建时 onShow 触发次数有误的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1809)
* App-iOS平台 修复 调用 uni.createWebviewContext 打印警告的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1902)

#### 4.14.2024042905-alpha
##### uni-app-x
* Web平台 修复 $setPageStyle 动态修改 enablePullDownRefresh 为 true 无效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1632)
* App平台 调整 4.13版引出的 uni.getSystemInfo 返回 uniPlatform 字段值，从`app-android`和`app-ios`回退为 `app` [详情](https://doc.dcloud.net.cn/uni-app-x/api/get-system-info.html#getsysteminfo-%E5%85%BC%E5%AE%B9%E6%80%A7)
* App-Android平台 修复 DOM API UniResizeObserver 监视元素大小变化在部分场景回调不准确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1696)
* App-Android平台 调整 组件 switch 关闭时的背景色由 #e5e5e5 调整为 #e9e9ea，与其他平台拉齐 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1705)
* App-iOS平台 修复 app.uvue 不支持多个 style 标签的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1699)
* App-iOS平台 修复 keep-alive 渲染结果不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1627)
* App-iOS平台 修复 组件 swiper 某些情况下首个 swiper-item 内容不显示的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1618)
* App-iOS平台 修复 组件 swiper 开启循环后 change 事件回调参数 detail.current 值可能不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1706)
* App-iOS平台 修复 API uni.uploadFile 上传多个文件时崩溃的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1625)
* App-iOS平台 修复 API uni.getAppBaseInfo 标准基座真机运行获取 appId 属性值不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1672)
* App-iOS平台 修复 CSS background-image 某些情况下无效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1667)
* App-iOS平台 修复 CSS border-radius 动态设置可能不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1619)
* App-iOS平台 修复 CSS transition 的 transform 动画设置 translate 值为百分比时动画效果不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1633)
* App-iOS平台 修复 CSS border-color 运行时展开样式错误的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1537)
* App-iOS平台 修复 在 iOS15 以下部分组件写法会导致页面初始化报错的Bug（该改动可能引起原生插件回调与 vue 任务队列先后顺序的细微变化） [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1671)
##### uts插件
* App-Android平台 修复 setInterval 间隔时间参数为0或者负数会不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1111)
* App-Android平台 修复 UTS组件不支持Map类型参数的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1153)

#### 4.13.2024042321-alpha
##### uni-app-x
* 新增 API $getPageStyle 和 $setPageStyle，获取和设置pages.json的页面style [详情](https://doc.dcloud.net.cn/uni-app-x/api/get-current-pages.html)
* 新增 云对象及云函数调用时支持传泛型 [云对象客户端API文档](https://doc.dcloud.net.cn/uni-app-x/api/unicloud/object.html)、[云函数客户端API文档](https://doc.dcloud.net.cn/uni-app-x/api/unicloud/function.html)
* 编译器 修复 script 节点内语法报错时，行号不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1290)
* Web平台、App-iOS平台 补齐 $callMethod支持调用defineExpose导出的方法 [详情](https://doc.dcloud.net.cn/uni-app-x/component/#callmethod)
* Web平台、App-iOS平台 修复 构造UniError时不支持无参数及一个参数的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1455)
* Web平台 修复 css内使用v-bind无效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1370)
* Web平台 修复 backgroundColorContent显示高度不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1427)
* Web平台 修复 textarea组件动态切换autoHeight不能实时生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1502)
* Web平台 修复 textarea、input组件disable状态下设置cursor样式无效的Bug
* Web平台 修复 request接口返回数组时错误的处理为了UTSJSONObject的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1582)
* Web平台 调整 界面相关Api（showLoading、showToast、showModal、showActionSheet）样式调整，对齐App端
* App平台 调整 组件 web-view 的 message 事件回调参数 detail.data 类型为 Array<UTSJSONObject>，load、loading 事件回调参数 detail.url 为 detail.src 属性 [详情](https://doc.dcloud.net.cn/uni-app-x/component/web-view.html#%E4%BA%8B%E4%BB%B6)
* App平台 调整 uni.getSystemInfo 返回 uniPlatform 字段值域分为 `app-android` 与 `app-ios` [详情](https://doc.dcloud.net.cn/uni-app-x/api/get-system-info.html#getsysteminfo-%E5%85%BC%E5%AE%B9%E6%80%A7)
* App平台 修复 CSS position 设置 absolute 时父元素的 padding 布局与 web 不一致的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1219)
* App-Android平台 新增 页面 style 配置项支持 pageOrientation 来实现横屏或自旋转适应 [详情](https://doc.dcloud.net.cn/uni-app-x/collocation/pagesjson.html#pages-json)
* App-Android平台 新增 API FileSystemManager 支持 appendFile、readCompressedFile 等文件操作方法 [详情](https://doc.dcloud.net.cn/uni-app-x/api/get-file-system-manager.html)
* App-Android平台 新增 API uni.$off 支持第二个参数为可选 [详情](https://doc.dcloud.net.cn/uni-app-x/api/event-bus.html#off)
* App-Android平台 新增 API UniResizeObserver 监视 UniElement 元素的大小变化 [详情](https://doc.dcloud.net.cn/uni-app-x/dom/uniresizeobserver.html)
* App-Android平台 修复 项目下包含云对象但是页面内未使用uniCloud时云打包报错的Bug
* App-Android平台 修复 template 节点运行时异常导致应用闪退的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1578)
* App-Android平台 修复 script setup 下 defineSlots 定义作用域插槽编译报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1551)
* App-Android平台 修复 uts插件打包自定义基座后，编译报错依赖找不到的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1379)
* App-Android平台 修复 ref 类型数据在模板上插值显示不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1344)
* App-Android平台 修复 script setup 下定义 ref 类型绑定 v-model 时，编译可能报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1338)
* App-Android平台 修复 script setup 下函数声明不能递归调用的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1312)
* App-Android平台 修复 4.02版引出的运行时异常信息显示不正确[详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1518)
* App-Android平台 修复 组件 view 设置 overflow 为 visible 时超出父元素区域无法响应点击和触摸事件的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=157)
* App-Android平台 修复 组件 scroll-view 子元素设置 overflow 为 visible 不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1175)
* App-Android平台 修复 组件 sticky-header 吸顶后可能与 list-view 下拉刷新区域重叠的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1242)
* App-Android平台 修复 组件 sticky-header 吸顶后部分场景中可能被 list-view 覆盖的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1241)
* App-Android平台 修复 组件 swiper 嵌套 scroll-view 后触发下拉刷新可能会阻碍 swiper 左右滑动的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1231)
* App-Android平台 修复 组件 input、textarea 在某些情况下可能被输入法遮挡的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=947)
* App-Android平台 修复 组件 textarea 设置 auto-height 导致高度异常的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1298)
* App-Android平台 修复 组件 slider 宽度发生变化或父容器大小发生变化后显示错乱的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=296)
* App-Android平台 修复 组件 keep-alive 和 component 结合使用，切换打开过的组件可能出现空白的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1189)
* App-Android平台 修复 组件 web-view 无法获取精准位置信息的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1563)
* App-Android平台 修复 4.11版引出的 组件 scroll-view 自定义下拉刷新时 refresher-max-drag-distance 属性不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1512)
* App-Android平台 修复 4.11版引出的 CSS transition-duration 设置为 0ms 时 transform 可能不执行的bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1473)
* App-Android平台 修复 退出应用时会可能短暂显示白屏的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=896)
* App-iOS平台 新增 运行时的异常信息显示源码位置 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1519)
* App-iOS平台 新增 onPageScroll 生命周期 [详情](https://doc.dcloud.net.cn/uni-app-x/page.html)
* App-iOS平台 新增 组件 web-view 支持 horizontalScrollBarAccess、verticalScrollBarAccess 属性 [详情](https://doc.dcloud.net.cn/uni-app-x/component/web-view.html#%E5%B1%9E%E6%80%A7)
* App-iOS平台 新增 API uni.downloadFile 的 filePath 属性支持 uni.env [详情](https://doc.dcloud.net.cn/uni-app-x/api/download-file.html#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)
* App-iOS平台 新增 CSS transition-property 支持 all | none [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1381)
* App-iOS平台 修复 组件 scroll-view 因为计算精度问题可能导致横向竖向同时能滑动的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1463)
* App-iOS平台 修复 组件 text 通过 class 设置 line-height 不带单位的值时高度不正常的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1458)
* App-iOS平台 修复 组件 switch 父元素有点击事件时不能响应点击手势的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1475)
* App-iOS平台 修复 组件 input type 属性动态赋值时 v-modol 无效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1510)
* App-iOS平台 修复 组件 textarea 设置 cursor 属性会触发 focus 的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1465)
* App-iOS平台 修复 组件 textarea 设置 cursor-color 为空时光标颜色会变成白色的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1469)
* App-iOS平台 修复 组件 textarea 设置 auto-height 导致高度异常的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1298)
* App-iOS平台 修复 组件 textarea 输入内容后 placeholder 没隐藏的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1526)
* App-iOS平台 修复 组件 progress 组件初始化未能正确赋值的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1504)
* App-iOS平台 修复 组件 slider 点击滑轨不会触发 change 事件的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1485)
* App-iOS平台 修复 组件 picker-view 初始化赋值不能立即执行的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1506)
* App-iOS平台 修复 组件 video 仅使用video组件，不使用createVideoContext时，云打包缺少video模块的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1556)
* App-iOS平台 修复 组件 web-view 不触发 load 事件的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1322)
* App-iOS平台 修复 组件 swiper 设置 current 默认值无效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1543)
* App-iOS平台 修复 组件 嵌套子组件样式不能继承父组件样式的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1505)
* App-iOS平台 修复 API selectorQuery.in 传入组件实例无效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1507)
* App-iOS平台 修复 API DrawableContext 设置 font 存在字体信息(如"13px Arial")时文字绘制失败的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1472)
* App-iOS平台 修复 API uni.showModal 点击取消按钮回调函数中 confirm 参数值为 true 的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1326)
* App-iOS平台 修复 API uni-getSystemInfo 返回的 windowTop 值不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1577)
* App-iOS平台 修复 CSS 元素宽或高为0时设置背景渐变色导致应用闪退的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1471)
* App-iOS平台 修复 CSS box-shadow 设置为 none 时可能显示白色阴影的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1467)
* App-iOS平台 修复 CSS backgroundColor 做 transition 动画时缺失透明度导致颜色不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1468)
* App-iOS平台 修复 CSS border-style 为 solid 且设置 border-width 时 border-radius无效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1470)
* App-iOS平台 修复 CSS position 从 fixed 动态切换成其他值无效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1527)
* App-iOS平台 修复 CSS pointer-events 设置为 none 不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1530)
* App-iOS平台 修复 CSS transition 动画在某些情况下异常的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1531)
* App-iOS平台 修复 CSS 元素动态设置 Style 空值切换不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1589)
* App-iOS平台 修复 事件冒泡在部分情况下可能自动停止的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1509)
##### uts插件
* App平台 优化 API插件模板中 unierror.uts 错误对象构造函数，兼容 web 平台使用
* App平台 修复 正则表达式包含双引号时编译报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1428)
* App-Android平台 修复 Date toISOString/toJSON 返回日期数据可能偏差一天的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1464)
* App-iOS平台 修复 if else 空语句时编译报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1351)
* App-iOS平台 修复 class定义无参constructor时编译报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1342)
* App-iOS平台 修复 class定义boolean类型的getter、setter时编译报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1332)

#### 4.12.2024041009-alpha
##### uni-app-x
* Web平台 调整 回滚HBuilderX 4.11版本将z-index默认值设为0的调整 [详情](https://doc.dcloud.net.cn/uni-app-x/css/z-index.html)
* App-Android平台 修复 4.11版引出的 CSS z-index 可能引发下标越界异常的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1272)
* App-iOS平台 新增 组件 text 支持嵌套子 text 组件 [文档](https://doc.dcloud.net.cn/uni-app-x/component/text.html#%E5%AD%90%E7%BB%84%E4%BB%B6)
* App-iOS平台 修复 进入应用首页立即调用 uni.hideTabbar 可能导致页面底部区域高度异常的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1364)
* App-iOS平台 修复 页面 onReady 生命周期在特定设备触发时机不准确可能导致页面显示异常的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1367)
* App-iOS平台 修复 uni-id-pages-x 云端打包后报`undefined class: UTSSDKModulesDCloudUniNetworkIndexSwift`错误的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1353)
##### uts插件
* iOS平台 修复 对象字面量as成uni-module app-js内的type时未能转为指定类型的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1314)

#### 4.11.2024040401-alpha
##### uni-app-x
* 【重要】新增 编译到iOS平台
* 【重要】Web平台 调整 vue版本由3.2.47升级为3.4.21，支持defineOptions、defineModel、toValue等新特性
* Web平台 新增 scroll-view、list-view支持自定义下拉刷新 [详情](https://doc.dcloud.net.cn/uni-app-x/component/scroll-view.html)
* Web平台 新增 list-view支持下拉刷新相关属性、事件 [详情](https://doc.dcloud.net.cn/uni-app-x/component/list-view.html)
* Web平台 新增 页面样式及globalStyle支持backgroundColorContent [详情](https://doc.dcloud.net.cn/uni-app-x/collocation/pagesjson.html#pages-globalstyle)
* Web平台 修复 scroll-view组件下拉刷新相关事件缺少dy属性的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=932)
* Web平台 修复 navigator组件内子元素部分样式无效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1025)
* Web平台 修复 input、textarea组件内maxlength无法限制uts内设置的值的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1204)
* Web平台 调整 textarea、input maxlength属性调整为传入非法值时不限制长度，默认调整为不限制长度
* Web平台 调整 progress组件percent属性传入非法值时显示为0%，此前为NaN
* Web平台 调整 内置组件、页面容器默认z-index由auto调整为0
* Web平台 调整 body的font-family调整为`"-apple-system", HelveticaNeue;`，iOS上与系统字体保持一致
* Web平台 调整 组件 switch 关闭时的背景色由 rgba(0,0,0,.1) 调整为 #e9e9ea
* App-Android平台 新增 computed 支持类型自动推导 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=833)
* App-Android平台 新增 v-for 指令支持循环Map、Set对象 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1200)
* App-Android平台 新增 组件 nested-scroll-header、nested-scroll-body [详情](https://doc.dcloud.net.cn/uni-app-x/component/nested-scroll-header.html)
* App-Android平台 新增 组件 scroll-view 支持 type 属性设置 `nested` 嵌套模式 [详情](https://doc.dcloud.net.cn/uni-app-x/component/scroll-view.html#nested-scroll-view)
* App-Android平台 新增 组件 web-view 支持 horizontalScrollBarAccess、verticalScrollBarAccess 属性设置是否显示横向、竖向滚动条 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=598)
* App-Android平台 新增 API uni.requestPayment 支持微信支付 [详情](https://doc.dcloud.net.cn/uni-app-x/api/request-payment.html)
* App-Android平台 新增 CSS transition-property 支持 `all` 和 `none`，默认值调整为 `all`
* App-Android平台 修复 静态引入 static 目录中的只读资源，编译可能报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=992)
* App-Android平台 修复 uts 插件内 easycom 组件不能正常使用的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1034)
* App-Android平台 修复 复杂的响应式对象修改后可能不触发页面渲染的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1123)
* App-Android平台 修复 模板上文本插值Map、Set类型不显示实际内容的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1182)
* App-Android平台 修复 defineProps 定义 any 类型属性时编译报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1198)
* App-Android平台 修复 组件 list-view 的 show-scrollbar 属性默认不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1050)
* App-Android平台 修复 组件 input、textarea 未设置 placeholder 时设置 placeholder-style 可能引起异常崩溃的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1042)
* App-Android平台 修复 组件 input、textarea 在 scroll-view 中获取焦点可能被弹出软键盘遮挡的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1128)
* App-Android平台 修复 组件 input、textarea 的 keyboardheightchange 事件返回的键盘高度可能不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1158)
* App-Android平台 修复 组件 input 设置 password 属性先于 value 属性可能导致 value 不显示的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=990)
* App-Android平台 修复 组件 web-view 加载的网页中 `<input type="file"/>` 文件选择不支持 multiple 属性的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=541)
* App-Android平台 修复 组件 web-view 加载网页默认无法显示全部宽度且无法缩放的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1047)
* App-Android平台 修复 组件 video 无法加载本地绝对路径资源的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=786)
* App-Android平台 修复 组件 video 设置 header 属性无效Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1210)
* App-Android平台 修复 CSS background-image 属性动态修改不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1160)
* App-Android平台 修复 CSS font-size 属性动态修改后文本高度可能不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=377)
* App-Android平台 修复 CSS z-index 可能引发下标越界异常的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1077)
* App-Android平台 修复 CSS white-space 属性为 nowrap 时 text-overflow 的 ellipsis 效果可能不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=959)
* App-Android平台 修复 Windows 系统 本机不含 vcruntime 时编译报错的Bug [详情](https://ask.dcloud.net.cn/question/187931)
* uni-ui 新增 `<uni-recycle-view>`虚拟长列表组件，解决长列表初始化卡顿和内存占用问题 [详见](https://ext.dcloud.net.cn/plugin?id=17385)
##### uts插件
* 编译器 修复 Windows 平台 编译器相关动态库没有数字签名导致可能被某些防病毒软件拦截进而导致编译失败的Bug
* Web平台 修复 解构时默认值无法覆盖null的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1076)
* App平台 修复 interface 中可选属性可能编译不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1202)
* App-Android平台 修复 声明 UTSJSONObject 类型后，无法二次赋值的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=851)
* App-Android平台 修复 switch 语句 default 语句仅包含 break 时，编译报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=852)
* App-Android平台 修复 String.match 与web平台不一致的Bug [详情]( https://issues.dcloud.net.cn/pages/issues/detail?id=835)
* App-Android平台 修复 String.replace 匹配的捕获组结果与web平台不一致的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1056)
* App-Android平台 修复 RegExp.exec 匹配的捕获组结果与web平台不一致的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=954)

#### 4.07.2024032807-alpha
##### uni-app x 插件
* Web平台 修复 4.06版引出的 button 更改 border-radius 后边框样式不对的Bug

#### 4.05.2024032021-alpha
##### uni-app-x
* Web平台 修复 部分情况下picker-view、picker-view-column值显示错误并额外触发了change事件的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1009)
* App-Android平台 修复 4.02版引出的 uni.createSelectorQuery 获取的组件对象调用 boundingClientRect 返回数据不准的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=948)
* App-Android平台 修复 组件 button 设置 hover-class 属性在特定情况与web平台效果不一致的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1028)

#### 4.04.2024031519-alpha
##### uni-app x 插件
* Web平台 优化 减少编译耗时
* Web平台 修复 uni.rpx2px在项目发行后调用报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=930)
* Web平台 修复 instanceof UniXXXElement 报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=940)
* App-Android平台 修复 组件 text 内容从非空设置为空文本无效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=950)
* App-Android平台 修复 组件 text 设置高度后无法修改文本内容的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=981)
* App-Android平台 修复 4.02版引出的 组件 button 属性样式部分情况可能无效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=900)
* App-Android平台 修复 4.02版引出的 组件 button 组件 hover-class 设置为 none 无效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=958)

#### 4.03.2024031101-alpha
##### uni-app x 插件
* 修复 3.98 引发的 pages.json 检查页面文件是否存在时，部分条件编译不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=909)
* Web平台 调整 运行到浏览器时将script标签内代码编译为可以在低版本浏览器运行的兼容代码
* App-Android平台 修复 APP-PLUS 条件编译的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=910)
* App-Android平台 修复 4.02版引出的 组件 button 的 disabled 属性在部分场景设置无效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=900)
* App-Android平台 修复 4.02版引出的 组件 button 的对象类型 `UniButtonElement` 编译报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=907)

#### 4.02.2024030621-alpha
##### uni-app x 插件
* 新增 API uni.rpx2px [详情](https://doc.dcloud.net.cn/uni-app-x/api/rpx2px.html)
* 调整 pages.json 中配置的页面路径大小写敏感
* 修复 UniElement tagName、nodeName获取内置组件的标签与组件名不一致的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=766)
* 修复 vue $parent未跳过内置组件的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=773)
* Web平台 新增 组件 list-view、list-item组件 [详情](https://doc.dcloud.net.cn/uni-app-x/component/list-view.html)
* Web平台 新增 组件 sticky-section、sticky-header组件 [详情](https://doc.dcloud.net.cn/uni-app-x/component/sticky.html)
* Web平台 修复 部分场景下类型推断时未将对象字面量作为UTSJSONObject使用的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=819)
* Web平台 修复 类型字面量内带有any[]时无法正确创建实例的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=767)
* Web平台 修复 非全局声明的type在变量声明为此类型时不会自动创建实例的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=782)
* Web平台 修复 vue $forceUpdate未能更新内置组件插槽内容的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=776)
* Web平台 修复 使用热更新uts文件内新导出的type时报找不到导出的type的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=823)
* Web平台 修复 API request、uploadFile、downloadFile接口timeout参数传null时会直接超时的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=805)
* App-Android平台 新增 API uni.requestPayment，支持支付宝支付 [详情](https://doc.dcloud.net.cn/uni-app-x/api/request-payment.html)
* App-Android平台 修复 组件 button 渲染宽高与Web端不一致的问题 [详情](https://doc.dcloud.net.cn/uni-app-x/component/button.html)
* App-Android平台 修复 组件 text 无文本内容时组件宽度不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=777)
* App-Android平台 修复 组件 text 子组件设置 background-color 样式无效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=276)
* App-Android平台 修复 组件 text 子组件无法修改文本内容的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=562)
* App-Android平台 修复 组件 image 请求网络图片无法共享cookie的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=820)
* App-Android平台 修复 组件 list-item 动态调整宽高不生效的Bug [详情](https://ask.dcloud.net.cn/question/185517)
* App-Android平台 修复 组件 list-view 部分场景修改refresher-triggered属性值域可能不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=796)
* App-Android平台 修复 组件 list-view 部分场景删除插槽子元素报错Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=769)
* App-Android平台 修复 CSS 4.0版本引出的 position 属性设置为 fixed 后 z-index 属性无效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=726)
* App-Android平台 修复 tabBar 配置 pagePath 有误时点击 tab 切换崩溃的Bug[详情](https://issues.dcloud.net.cn/pages/issues/detail?id=779)
* App-Android平台 修复 使用 UTSAndroid.getJavaClass 获取导入的类时可能编译报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=809)
* App-Android平台 优化 type类型响应式对象的构造方式，避免使用反射，优化性能
* App-Android平台 修复 关联其他项目的服务空间并使用其中的云对象时报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=817)
* App-Android平台 修复 unicloud-db组件，使用 setup 语法，作用域插槽中无法使用data的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=761)
* App-Android平台 修复 云对象返回数字错误码时报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=840)
* App-Android平台 更新 云端打包环境 compileSdkVersion 为 34
##### uts插件
* Android平台 新增 `typeof` 操作符支持平台专有字符类型 `Char` [详情](https://doc.dcloud.net.cn/uni-app-x/uts/operator.html#typeof)
* App-Android平台 修复 局部定义 class 时，构造函数使用 super 报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=802)
* App-Android平台 新增 interface.uts 文件支持 export declare 语法 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=744)
* App-Android平台 修复 import * as Types from 'xxx' 导入 type 类型编译报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=696)
* App-iOS平台 新增 @UTSiOS.keyword('fileprivate') 注解，用于解决自定义swift类，属性的访问控制

#### 4.01.2024020211-alpha
##### uni-app x 插件
* Web平台 新增 绑定class、style时支持Map类型 [详情](https://doc.dcloud.net.cn/uni-app-x/vue/#class-%E4%B8%8E-style-%E7%BB%91%E5%AE%9A)
* Web平台 调整 类型校验失败由报错调整为警告且不中断编译
* Web平台 调整 navigator组件真实渲染出的节点中a标签由uni-navigator标签外部移动到uni-navigator标签内部
* Web平台 调整 getStorage、getStorageSync接口返回对象类型数据时转化为UTSJSONObject类型
* Web平台 调整 request接口返回的data转化为UTSJSONObject类型
* Web平台 修复 未使用到的easycom组件内包含错误或web端不支持的用法导致编译报错的Bug
* Web平台 修复 部分场景下对象字面量as为指定类型时报错的Bug
* Web平台 修复 引用.uvue文件时未带后缀提示找不到模块的Bug
* Web平台 修复 部分场景下uts文件内使用条件编译无效的Bug
* App-Android平台 新增 组件 公共属性 `android-layer-type` 支持配置视图渲染模型，开启硬件加速 [详情](https://doc.dcloud.net.cn/uni-app-x/component/common.html#android-layer-type)
* App-Android平台 修复 特殊元素(list-view等)删除插槽内子元素报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=388)
* App-Android平台 修复 data 中定义的变量名，与外部导入的变量同名时，引发运行时报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=701)
* App-Android平台 修复 pages.json 中使用条件编译时，可能报错 must contain at least 1 page 的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=690)
* App-Android平台 修复 4.0 引发的部分复杂场景运行时报错 Comparison method violates its general contract! 的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=687)
* App-Android平台 修复 仅使用 easycom 组件类型编译报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=678)
* App-Android平台 修复 @import 引入的 scss 文件内部条件编译不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=671)
* App-Android平台 修复 组件里import uts文件路径不对，但编译时不会指向正确的源码的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=275)
* App-Android平台 修复 组件 input 默认高度计算不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=693)
* App-Android平台 修复 组件 input 设置 value 属性后首次输入文字时 input 事件不触发的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=699)
* App-Android平台 修复 组件 textarea 行高计算不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=695)
* App-Android平台 修复 组件 textarea 多行滚动时不显示滚动条的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=694)
* App-Android平台 修复 组件 input、textarea 获取焦点弹出的软键盘隐藏时关闭页面可能引起异常崩溃的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=716)
* App-Android平台 修复 组件 image 的 src 属性设置 `file:///android_asset/` 格式图片路径无法正常显示的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=723)
* App-Android平台 修复 组件 video 播放PCM音频格式的视频可能没有声音的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=713)
* App-Android平台 修复 API uni.createSelectorQuery 无法查询根节点的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=672)
##### uts插件
* App-Android平台 修复 async 方法参数数量超过一个时运行报错的Bug

#### 4.0.2024012711-alpha
##### uni-app x 插件
* 【重要】新增 编译到Web平台 [详情](https://doc.dcloud.net.cn/uni-app-x/web/)
* 【重要】App-Android平台 新增 vue 组合式 API [详情](https://doc.dcloud.net.cn/uni-app-x/vue/#composition-api)
* 【重要】调整 组件事件类型名称增加 Uni 前缀，避免与浏览器全局事件冲突 [详情](https://doc.dcloud.net.cn/uni-app-x/component/common.html#rename-event-type)
* 编译器 修复 pages.json 中 APP-ANDROID、APP-IOS 不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=523)
* App-Android平台 新增 uni-ad 激励视频广告 [详情](https://doc.dcloud.net.cn/uni-app-x/api/create-rewarded-video-ad.html)
* App-Android平台 新增 vue 内置组件 KeepAlive [详情](https://doc.dcloud.net.cn/uni-app-x/vue/#component)
* App-Android平台 新增 vue 内置组件 Teleport [详情](https://doc.dcloud.net.cn/uni-app-x/vue/#component)
* App-Android平台 新增 vue watch 支持 deep、immediate 配置 [详情](https://doc.dcloud.net.cn/uni-app-x/vue/#options-api-compatibility)
* App-Android平台 新增 vue 组件 props 支持字符串数组方式声明，此时所有 prop 类型为 any | null [详情](https://doc.dcloud.net.cn/uni-app-x/component/#props)
* App-Android平台 新增 API 监听权限申请事件，适用于应用商店要求申请权限时弹出用途说明 [详情](https://doc.dcloud.net.cn/uni-app-x/api/create-request-permission-listener.html)
* App-Android平台 新增 css变量 [详情](https://doc.dcloud.net.cn/uni-app-x/css/#variable)
* App-Android平台 新增 CSS white-space [详情](https://doc.dcloud.net.cn/uni-app-x/css/white-space)
* App-Android平台 新增 pages.json 中 backgroundColorContent 配置页面容器背景色 [详情](https://doc.dcloud.net.cn/uni-app-x/collocation/pagesjson.html#pages-globalstyle)
* App-Android平台 新增 组件 input、textarea 支持 hold-keyboard [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=291)
* App-Android平台 新增 组件 input 的 blur 事件回调参数支持 cursor 属性 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=512)
* App-Android平台 调整 二级页面导航栏标题文字居中显示
* App-Android平台 调整 组件 scroll-view、list-view 设置横向或纵向滚动属性为 direction，设置回弹效果属性为 bounces [详情](https://doc.dcloud.net.cn/uni-app-x/component/scroll-view.html)
* App-Android平台 调整 组件 scroll-view、list-view 默认高度为子元素高度之和，即默认不出现滚动条，需通过 css 属性设置容器高度才会出现滚动条 [详情](https://doc.dcloud.net.cn/uni-app-x/component/scroll-view.html#app%E5%B9%B3%E5%8F%B0)
* App-Android平台 调整 组件 view 的 hover-class 按下状态在组件区域内移动不会取消，移动到组件区域外才会取消 [详情](https://doc.dcloud.net.cn/uni-app-x/component/view.html#app)
* App-Android平台 调整 组件 click/tap 事件在组件区域内移动不会取消，移动到组件区域外才会取消 [详情](https://doc.dcloud.net.cn/uni-app-x/component/common.html#tap)
* App-Android平台 调整 组件 text 渲染 baseline 计算逻辑，靠近浏览器渲染逻辑
* App-Android平台 调整 组件 input、textarea 点击输入框外的屏幕，默认关闭软键盘
* App-Android平台 调整 组件 input 的 font-size 默认值为 16px
* App-Android平台 调整 组件 textarea 的 font-size 默认值为 16px，line-height 默认值为 1.2em，width 默认值为300px [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=492)
* App-Android平台 调整 组件 web-view 默认宽高为100%
* App-Android平台 调整 组件 web-view 网页加载完成事件名称 loaded 改为 load
* App-Android平台 调整 组件 video 默认宽度为300px，高度为225px [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=457)
* App-Android平台 调整 API uni.getSystemInfo、uni.getAppBaseInfo 返回的uni编译器版本属性命名中的`Compile`改为`Compiler` [详情](https://doc.dcloud.net.cn/uni-app-x/api/get-system-info.html)
* App-Android平台 调整 css transition-duration 动画时长不设置单位时不再当做毫秒，统一为web的策略，必须设置单位，无单位当做非法值，造成动画不生效 [详情](https://doc.dcloud.net.cn/uni-app-x/css/transition-duration.html)
* App-Android平台 修复 template 非预期的将 object 编译为 map 的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=244)
* App-Android平台 修复 部分组件嵌套导致页面关闭时无法回收的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=535)
* App-Android平台 修复 MuMu模拟器多次切换页面后再次进入白屏的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=436)
* App-Android平台 修复 vue 不同组件同名props且default均为通过Function返回时，默认值被污染的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=374)
* App-Android平台 修复 vue 组件配置 mixins，emits 丢失 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=348)
* App-Android平台 修复 组件 scroll-view 设置 border 导致滚动视图显示不完整的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=510)
* App-Android平台 修复 组件 scroll-view 动态修改 refresher-default-style 属性不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=641)
* App-Android平台 修复 组件 scroll-view 的 show-scrollbar 属性默认值不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=648)
* App-Android平台 修复 组件 scroll-view 开启下拉刷新，设置 padding 属性后滚动条位置异常的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=661)
* App-Android平台 修复 组件 swiper 监听 animationfinish 事件可能不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=502)
* App-Android平台 修复 组件 swiper 设置 autoplay 未设置 circluar 滚动到顶没有从头开始运行的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=556)
* App-Android平台 修复 组件 swiper 相互嵌套时只能滚动外层 swiper 的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=558)
* App-Android平台 修复 组件 swiper 在 scroll-view 中滑动效果异常的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=500)
* App-Android平台 修复 组件 list-view 嵌套在 scroll-view 中反复滚动后可能出现无法再滚动的Bug[详情](https://issues.dcloud.net.cn/pages/issues/detail?id=289)
* App-Android平台 修复 组件 list-view 设置隐藏再显示可能无法正常显示内容的Bug[详情](https://issues.dcloud.net.cn/pages/issues/detail?id=283)
* App-Android平台 修复 组件 sticky-header 在部分场景吸顶位置与父容器顶部位置存在偏移的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=323)
* App-Android平台 修复 组件 text 多次更新后高度计算不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=563)
* App-Android平台 修复 组件 input、textarea 在 list-view 中复用时内容异常的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=382)
* App-Android平台 修复 组件 input、textarea 的 auto-focus 属性多次生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=491)
* App-Android平台 修复 组件 input、textarea 的 cusor、selection-start、selection-end 属性多次设置不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=516)
* App-Android平台 修复 组件 textarea 监听 focus 事件返回可能导致闪退的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=609)
* App-Android平台 修复 组件 textarea 设置 padding 尺寸不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=618)
* App-Android平台 修复 组件 image mode 属性设置为 widthFix、heightFix 显示效果不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=493)
* App-Android平台 修复 组件 image 设置 border-radius 时 mode 属性失效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=332)
* App-Android平台 修复 组件 video 在 list-view 中使用可能出现异常的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=288)
* App-Android平台 修复 组件 click/tap 事件在连续点击操作时因触发双击导致丢失事件的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=364)
* App-Android平台 修复 CSS height 小于 padding 时排版高度计算不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=496)
* App-Android平台 修复 CSS flex-basis 为百分比父节点存在 padding 时排版换行计算不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=352)
* App-Android平台 修复 CSS flex 设置为 1 且最外层和叶子结点未设置高度时排版高度计算不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=497)
* App-Android平台 修复 CSS position 设置为 fixed 节点相互嵌套时，动态更新内层节点不显示的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=537)
* App-Android平台 修复 CSS transition、transform 同时设置后动态修改 transform 可能不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=353)
* App-Android平台 修复 CSS transition、transform 同时设置后在系统`开发者选项`中关闭所有动画 transform 可能不执行的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=634)
* App-Android平台 修复 API uni.toast、uni.showModal等交互反馈弹窗在 onShow 生命周期调用可能无法正常显示的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=520)
* App-Android平台 修复 API uni.request、uni.uploadFile、uni.downloadFile 等网络请求无法共享 cookie 的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=335)
* App-Android平台 修复 API uni.showModal、uni.showActionSheet 交互反馈弹窗通过手势操作关闭不触发 `complete` 回调的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=597)
* App-Android平台 修复 API uni.showModal 弹窗在英文系统中 `确认` 按钮上的文字不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=589)
* App-Android平台 修复 API Event 事件对象通过 JSON.stringify 输出字符串内容不全的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=495)
* App-Android平台 修复 API uni.saveImageToPhotosAlbum 可能无法保存 `static` 目录下图片的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=525)
* App-Android平台 修复 API uni.previewImage 可能无法保存 `static` 目录下图片的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=524)
* App-Android平台 修复 API uni.getWindowInfo 在页面 onReady 生命周期获取 windowHeight 可能不准确的Bug[详情](https://issues.dcloud.net.cn/pages/issues/detail?id=260)
* App-Android平台 修复 API uni.getStorageSync 获取保存为 json 格式字符串数据返回空字符串的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=572)
* App-Android平台 修复 DOM API UniElement 对象的 getBoundingClientRect() 方法，在页面 onResize 生命周期获取元素的 DOMRect 信息可能异常的Bug[详情](https://issues.dcloud.net.cn/pages/issues/detail?id=266)
* App-Android平台 修复 DOM API 部分组件无法通过 getAttribute 方法获取 value 的Bug
##### uts插件
* 编译器 修复 特殊值域string构成的数组类型编译报错的Bug
* App-Android平台 新增 UTSAndroid.getJavaClass 获取 Android 原生对象的 Java Class [详情](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#getjavaclass)
* App-Android平台 修复 Date 无法解析日期时间格式字符串（如“2024-01-09 22:00:00”）的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=499)
* App-Android平台 修复 typeof 运算符返回 NaN、INFINITY 的数据类型不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=557)
* App-Android平台 修复 Array.includes 判断元素类型为 number 时可能返回结果不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=559)
* App-Android平台 修复 Number.toString 不支持指定转换进制基数的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=308)
* App-Android平台 修复 Number.toFixed 方法在 android6.0 以下设备返回值异常的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=233)
* App-Android平台 修复 不同属性名编译可能冲突报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=568)
* App-Android平台 修复 编译告警 No cast needed 的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=527)
* App-Android平台 修复 当顶部存在多个相同变量名时可能存在访问错乱的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=334)
* App-Android平台 修复 部分情况下正则表达式转换错误的Bug [详情](https://ask.dcloud.net.cn/question/183344)
* App-Android平台 优化 类型不匹配时的错误提示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=358)
* App-Android平台 修复 interface 中泛型方法编译不正确的Bug
* App-Android、App-iOS 平台 修复 interface 中 readonly 属性不生效的Bug
* App-Android、App-iOS 平台 修复 负数小数点0可能被移除的问题，比如 -1.0 => -1

#### 3.99.2023121601-alpha
##### uni-app x插件
* 修复 编译器 部分情况下报错信息未回溯到源码的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=246) [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=253) [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=264)
* 修复 编译器 组件递归使用时编译报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=225)
* 优化 编译器 真机运行调用未包含的被摇掉的api的错误提示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=227)
* 修复 应用 onLaunch 生命周期调用 route API 异常的Bug
* 新增 vue框架 支持 app.use 注册 vue 插件 [详情](https://doc.dcloud.net.cn/uni-app-x/vue/index.html#app-instance)
* 新增 vue框架 app.config.globalProperties 注册全局属性 [详情](https://doc.dcloud.net.cn/uni-app-x/vue/index.html#app-instance)
* 新增 vue框架 动态组件 [详情](https://doc.dcloud.net.cn/uni-app-x/vue/index.html#special-elements)
* 新增 vue框架 provide/inject 用于组件通信 [详情](https://doc.dcloud.net.cn/uni-app-x/vue/index.html#composition-options)
* 新增 vue框架 mixin 混入 [详情](https://doc.dcloud.net.cn/uni-app-x/vue/index.html#composition-options)
* 新增 vue框架 v-html 指令 [详情](https://doc.dcloud.net.cn/uni-app-x/component/index.html#directives)
* 新增 vue框架 v-once 指令、v-memo 指令、v-pre 指令 [详情](https://doc.dcloud.net.cn/uni-app-x/vue/index.html#directives)
* 新增 vue框架 componentInstance.$forceUpdate [详情](https://doc.dcloud.net.cn/uni-app-x/vue/index.html#component-instance)
* 新增 vue框架 支持 render 函数 [详情](https://doc.dcloud.net.cn/uni-app-x/vue/index.html#rendering-options)
* 新增 全局变量 globalData [详情](https://doc.dcloud.net.cn/uni-app-x/collocation/app.html#globaldata)
* 新增 splash 在 manifest.json 中配置启动封面 [详情](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-splashscreen.html)
* 新增 uni-ad 开屏广告 [详情](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-modules.html#uni-ad)
* 新增 组件 input 的属性 cursor-color，用于调整光标颜色 [详情](https://doc.dcloud.net.cn/uni-app-x/component/input.html#%E5%B1%9E%E6%80%A7)
* 新增 API uni.getUniverifyManager，App一键登陆 [详情](https://doc.dcloud.net.cn/uni-app-x/api/get-univerify-manager.html)
* 新增 API uni.getFileSystemManager，本地文件管理 [详情](https://doc.dcloud.net.cn/uni-app-x/api/get-file-system-manager.html)
* 优化 规范了文件系统使用，对cache文件进行了详细约定 [详情](https://doc.dcloud.net.cn/uni-app-x/api/file-system-spec.html)
* 新增 API uni-push 支持荣耀厂商推送
* 修复 API uni.toast、uni.showModal等交互反馈弹窗在 onReady 生命周期前调用可能无法正常显示的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=312)
* 补齐 CSS background-image 的 linear-gradient 渐变方向支持 to bottom left 、to top right [详情](https://doc.dcloud.net.cn/uni-app-x/css/background-image.html)
* 修复 CSS 先后设置 box-shadow 与 border 属性导致后设置的样式不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=280)
* 修复 CSS z-index 属性可能引发下标越界异常的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=215)
* 修复 CSS position 设置为 fixed 时 z-index 可能不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=274)
* 修复 CSS transition 初始值为百分比时动态设置 length 值动画效果不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=262)
* 修复 CSS transition-property 属性值动态更新为 background-color 时不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=298)
* 修复 CSS transform-origin 在设置 transition-property 为 transform 时不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=299)
* 修复 组件 text 在某些情况设置 max-width 后高度不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=257)
* 修复 组件 video 无法播放本地m3u8文件的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=229)
* 修复 组件 list-view 无法通过 scroll-into-view 属性滚动到 sticky-header 组件位置的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=261)
* 修复 组件 list-item 被复用后 click 事件无法正常触发的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=271)
* 修复 组件 view 设置 overflow 为 visible 后需同时对父元素设置 overflow 为 visible 才能生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=259)
* 修复 组件 view 设置 overflow 为 hidden 后子元素显示区域可能占用 border 边框区域的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=304)
* 修复 TouchEvent 事件在超出父视图可视区域后 screenX、screenY 属性值可能不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=245)
* 修复 系统切换暗黑模式导致应用白屏
* 优化 App打release包后，应用资源不再释放到存储卡，提升首次启动速度
* 调整 API uni.installApk 安装apk，从ext api改为内置api [详情](https://doc.dcloud.net.cn/uni-app-x/api/install-apk.html)
* 调整 App真机运行标准基座内置 uni-facialRecognitionVerify 实人认证模块，方便调试开发
* 修复 App真机运行调用 uni.exit 后可能导致应用异常崩溃的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=169)
* 新增 ui库 uni-icons 支持uni-app x [详情](https://uniapp.dcloud.net.cn/component/uniui/uni-icons.html)
* 新增 ui库 uni-data-picker 支持uni-app x [详情](https://uniapp.dcloud.net.cn/component/uniui/uni-data-picker.html)
* 新增 uni-cms 客户端插件 uni-cms-article [详情](https://ext.dcloud.net.cn/plugin?id=11701)
* 更新 模板 App升级中心 支持在通知栏显示下载进度
* 更新 模板 uni-id-pages-x v1.0.4+ 不再支持配置项：`config.needLogin`，改用uni-id-router替代 [详情](https://ext.dcloud.net.cn/plugin?name=uni-id-pages-x)
##### uts插件
* 新增 Android平台 UTSAndroid.getFileProviderUri，方便控制应用内文件对外分享 [详情](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#getfileprovideruri)
* 优化 新建uni_modules插件的UTS插件模板，默认包含完整演示UTS插件API/组件示例
* 修复 Android平台 本地 libs 三方依赖变更后不生效的Bug [详情](https://ask.dcloud.net.cn/question/182382)
* 修复 多个解构语句可能编译报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=217)
* 修复 App-iOS平台 类继承时属性 override 报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=207)
* 修复 App-Android平台 UTSJSONObject对象定义方法后，不能通过索引调用的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=234)
* 修复 App-Android平台 顶层变量、type 属性、类实例属性、类静态属性仅首字母大小写区分时编译报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=286)

#### 3.98.2023112011-alpha
##### uni-app x插件
* 优化 编译器 项目存在大量css代码时的编译速度
* 新增 组件 sticky-section 分段吸顶 [详情](https://doc.dcloud.net.cn/uni-app-x/component/sticky.html#sticky-section)
* 新增 API uni-push [详情](https://doc.dcloud.net.cn/uni-app-x/api/push.html)
* 新增 css position 属性设置为 absolute 时，margin 支持取值 auto
* 调整 API uni.downloadFile 下载默认目录调整为app的cache目录下的uniDownloads目录，方便被rom的清理工具清理 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=201)
* 修复 组件 video 部分 event 回调没有属性值的Bug [详情](https://ask.dcloud.net.cn/question/180748)
* 修复 组件 swiper current 属性可能不生效的Bug [详情](https://ask.dcloud.net.cn/question/181396)
* 修复 组件 list-item 执行复用时遇到 text 组件嵌套可能会闪退的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=216)
* 修复 组件 checkbox-group 动态修改 checkbox 组件的 check 属性时，form 组件提交的 value 不正确的Bug
* 修复 组件 radio-group 动态修改 radio 组件的 check 属性时，form 组件提交的 value 不正确的Bug
* 修复 组件 slider 当父容器可滚动且显示 value 且当前滑块值为最大值时，无法直接在滑块的右半径上按下拖动的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=218)
* 修复 组件 scroll-view、list-view 同时设置 scroll-y、scroll-x属性为 false 时，组件的 touch 相关事件不触发的Bug
* 修复 easycom组件类型在非uvue页面中使用报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=177)
* 修复 3.97引出的 首页面 onLoad 生命周期调用 uni.showLoading 可能会崩溃的Bug [详情](https://ask.dcloud.net.cn/question/181567)
* 修复 css 代码中引用非 static 目录的静态资源失败的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=231)
* 修复 部分情况下真机运行 appid 为空导致应用异常崩溃的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=162)
* 修复 使用 v-if 显示组件的 background 样式设置为线性渐变可能引起崩溃的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=164)
* 调整 各项目模板的 index.html （web平台专有文件）中引入入口文件从 main.js 改为 main（即main.uts，后缀可省略）
* 新增 模板 App升级中心兼容uni-app x [详见](https://ext.dcloud.net.cn/plugin?id=4542)
* 新增 模板 uni-id-pages-x [详情](https://doc.dcloud.net.cn/uniCloud/uni-id/app-x.html)
##### uts插件
* 优化 异步函数在 uni-app x 中使用时默认与框架运行在同一线程
* 修复 部分位运算组合使用时优先级不正确的Bug
* 修复 App-Android平台 Array join 返回值与 web 不一致的Bug
* 修复 自定义基座真机运行时hooksClass 相关回调重复调用的Bug
* 修复 App-iOS平台 使用 uts 插件（含ext api）后因底层依赖 uni-getDeviceInfo 有读取 IDFA 的代码导致可能影响应用上架审核的Bug
* 修复 Number 参与的运算结果可能整型溢出的Bug
* 修复 Number 参与的除法运算除数不能为0的Bug

#### 3.97.2023110504-alpha
##### uni-app x插件
* 新增 form 组件 [详情](https://doc.dcloud.net.cn/uni-app-x/component/form.html)
* 新增 uni.addInterceptor 拦截器，可拦截部分API [详情](https://doc.dcloud.net.cn/uni-app-x/api/interceptor.html)
* 新增 uni.setNavigationBarTitle [详情](https://doc.dcloud.net.cn/uni-app-x/api/set-navigation-bar-title.html)
* 新增 uni.getAppBaseInfo 获取获取包名、签名信息 [详情](https://doc.dcloud.net.cn/uni-app-x/api/get-app-base-info.html)
* 新增 scroll-view 组件支持 nested-scroll-child，可将嵌套滚动的父滚动视图滚动余量传递给子视图 [详情](https://doc.dcloud.net.cn/uni-app-x/component/scroll-view.html)
* 新增 web-view 组件支持 download 事件，以及 loading、loaded 事件回调参数支持 url 属性 [详情](https://doc.dcloud.net.cn/uni-app-x/component/web-view.html)
* 新增 image、video 组件 src 支持非 static 目录的静态资源
* 新增 uvue 文件支持引入 ts 后缀的文件，等同于 uts 后缀
* 新增 App-Android平台 真机运行标准基座内置所有常用权限
* 修复 动态创建的根节点 class 样式丢失的Bug
* 修复 v-model 绑定的表达式包裹 () 运行失败的Bug
* 修复 在自定义组件中使用 class 定制另一个自定义组件根节点样式不生效的Bug
* 修复 data 中定义的 UTSJSONObject 修改后，不触发渲染的Bug
* 修复 uvue 页面文件名与 easycom 组件同名时渲染不正确Bug
* 修复 text 组件固定宽高时，设置 padding-left 和 padding-right 可能导致文本不居中的Bug
* 修复 text 组件设置 space 属性时，换行符 \n 有时无法正常显示的Bug
* 修复 text 组件设置 line-height 属性可能不生效的Bug
* 修复 swiper-item 组件 overflow 属性值为 hidden 时子元素未被裁剪的Bug
* 修复 uni.loadFontFace 多次请求同一网络字体时可能触发错误回调的Bug
* 修复 Element 的 style 调用 setProperty 更新 transition-duration 属性值不支持单位为s(秒)的Bug
* 修复 uni.toast、uni.showModal等交互反馈弹窗在onLoad等特定场景可能引起应用崩溃的Bug
* 修复 App-Android平台 uni.getLocation 使用系统定位获取位置信息慢的Bug
##### uts插件
* 修复 位移赋值类操作符，当右侧为复杂表达式，计算结果不正确的Bug
* 修复 相同interface、class定义了不同属性，方法调用失败的Bug
* 修复 App-Android平台 string 的 indexOf 方法参数类型不正确的Bug
* 新增 App-Android平台 uni-app x项目开发的uts原生组件定义的对外方法支持返回值
* 新增 App-iOS平台 真机运行适配支持 XCode15
* 新增 uts插件支持监听应用的原生生命周期回调函数 [详情](https://uniapp.dcloud.net.cn/plugin/uts-plugin.html#hooksclass)
* 新增 uts组件插件支持 NVUpdateStyles 生命周期监听组件的样式更新 [详情](https://uniapp.dcloud.net.cn/plugin/uts-component.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)
* 调整 App-Android平台 uts组件插件内置对象 $androidContext 可为空 [详情](https://uniapp.dcloud.net.cn/plugin/uts-component.html#%E5%86%85%E7%BD%AE%E5%AF%B9%E8%B1%A1%E5%92%8C%E5%87%BD%E6%95%B0)
* 修复 uni-app 项目 vue2 下开发uts插件报错可能未指向源码的Bug

#### 3.94.2023102311-alpha
##### uni-app x插件
* 修复 多根节点时，uni.getElementById 获取失败的Bug
* 修复 web-view 组件点击网页中的输入框无法弹出软键盘的Bug
* 修复 scroll-view 组件的子组件滑动松手后惯性滚动时没有触发 nestedprescroll 事件的Bug
##### uts插件
* App-Android平台 更新 编译使用的 Android SDK 为 33
* App-Android平台 修复 number 的 toFixed 方法返回结果可能异常的Bug
* App-Android平台 修复 number 数据类型的位运算操作可能引起崩溃的Bug

#### 3.93.2023101913-alpha
##### uni-app x插件
* 新增 sticky-header 吸顶组件 [详情](https://doc.dcloud.net.cn/uni-app-x/component/sticky-header.html)
* 新增 unicloud-db 组件 [详情](https://doc.dcloud.net.cn/uni-app-x/component/unicloud-db.html)
* 新增 takeSnapshot 截图api [详情](https://doc.dcloud.net.cn/uni-app-x/dom/element.html#takeSnapshot)
* 新增 transitionend 动画结束事件 [详情](https://doc.dcloud.net.cn/uni-app-x/component/common.html#transitionend)
* 新增 css border-*-width 属性值支持 thin | medium | thick
* 新增 摇树优化 代码中未使用的内置模块（如video）会自动摇掉，减少安装包体积 [详情](https://doc.dcloud.net.cn/uni-app-x/manifest.html#treeShaking)
* 优化 组件类型，内置组件和自定义组件可更方便的获取类型并调用组件方法 [详情](https://doc.dcloud.net.cn/uni-app-x/component/#methods)
* 优化 uni.getElementById 支持泛型 [详情](https://doc.dcloud.net.cn/uni-app-x/api/get-element.html)
* 新增 list-view 组件的下拉刷新支持自定义样式
* 修复 list-view 组件嵌套 swiper 时 swiper-item 可能重复显示的Bug
* 修复 list-view 组件某些情况子节点位置错乱的Bug
* 修复 video 组件在 Android8.0 以下设备使用硬解码可能引起崩溃的Bug
* 修复 web-view 组件在 Android11 及以上设备可能无法加载本地网页的Bug
* 修复 text 组件动态修改 display 属性可能出现渲染异常的Bug
* 修复 css position 属性设置为 fixed 时，z-index 属性可能不生效的Bug
* 修复 uvue 文件 methods 中定义的方法不能递归访问的Bug [详情](https://ask.dcloud.net.cn/question/179395)
* 修复 目录包含特殊字符编译报错的Bug
* 修复 ref 绑定节点移除时，$refs 数据未更新的Bug
##### uts插件
* 新增 await 支持与 Promise 一同使用 [详情](https://uniapp.dcloud.net.cn/uts/operator.html#await)
* 新增 UTSJSONObject 支持 hasOwnProperty [详情](https://uniapp.dcloud.net.cn/uts/buildin-object-api/utsjsonobject.html#hasOwnProperty)
* 修复 parseInt 解析超过整型数据范围返回值为 NaN 的Bug
* App-Android平台 修复 console 输出对象信息中包含 private 属性和方法的Bug
* App-Android平台 修复 number 数据类型在某些情况除法运行结果不正确的Bug
* App-iOS平台 修复 vue 页面中调用 API 参数不支持 null 的Bug

#### 3.92.2023101106-alpha
##### uni-app x插件
* App-Android平台 修复 uni-app-x 项目 onLoad 生命周期调用 route API 交互异常的Bug
* App-Android平台 修复 uni-app-x 项目非 tabBar 首页调用 uni.switchTab 应用崩溃的Bug
##### uts插件
* 修复 App-Android平台 vue 页面调用 API 传参对象中包含`Any`类型字段时可能出现异常的Bug

#### 3.91.2023092719-alpha
##### uts插件
* 调整 通过数字字面量定义变量未申明类型时默认推导为 number 类型 [详情](https://uniapp.dcloud.net.cn/uts/data-type.html#autotypefornumber)
* 调整 typeof 获取实例对象类型支持平台专有数字类型 Int、Float、Double等 [详情](https://uniapp.dcloud.net.cn/uts/operator.html#typeof)
* 调整 instanceof 不再支持判断基础类型 number、string、boolean [详情](https://uniapp.dcloud.net.cn/uts/operator.html#instanceof)
* 调整 JSON.parse 解析json字符串支持返回 Array、number、boolean、string 等数据类型 [详情](https://uniapp.dcloud.net.cn/uts/buildin-object-api/json.html#parse)
* 新增 JSON.parse 支持传入泛型解析为指定 type 类型 [详情](https://uniapp.dcloud.net.cn/uts/data-type.html#%E6%8A%8Ajson%E5%AF%B9%E8%B1%A1%E8%BD%AC%E4%B8%BAtype)
* 新增 UTSJSONObject 通过 getBoolean、getString、getNumber、getJSON 等方法访问属性，并支持传入 keyPath 格式参数 [详情](https://uniapp.dcloud.net.cn/uts/data-type.html#%E8%AE%BF%E9%97%AE-utsjsonobject-%E4%B8%AD%E7%9A%84%E5%B1%9E%E6%80%A7%E6%95%B0%E6%8D%AE)
* 新增 number 类型支持与平台专有数字类型相互转换方法 toInt、toFloat、toDouble、from 等 [详情](https://uniapp.dcloud.net.cn/uts/buildin-object-api/number.html)
* 新增 type 自定义类型支持 for...in 遍历 [详情](https://uniapp.dcloud.net.cn/uts/data-type.html#type)
* 新增 Regexp 正则表达式支持 flags 属性 [详情](https://uniapp.dcloud.net.cn/uts/buildin-object-api/regexp.html#flags)
* 新增 支持 encodeURI、decodeURI、encodeURIComponent、decodeURIComponent 等全局方法 [详情](https://uniapp.dcloud.net.cn/uts/buildin-object-api/global.html#encodeuri)
* 新增 支持使用数值字面量和字符串字面量用作类型注解 [详情](https://uniapp.dcloud.net.cn/uts/literal.html)
* 新增 uni.request 请求的 method 支持 OPTIONS [详情](https://doc.dcloud.net.cn/uni-app-x/api/request.html)
* 新增 App-Android平台 Promise [详情](https://uniapp.dcloud.net.cn/uts/buildin-object-api/promise.html)
* 新增 App-Android平台 支持 Array.fromNative 方法将原生 ByteArray/LongArray/ShortArray 类型转换为 Array
* 修复 App-Android平台 部分场景下位运算符异常的Bug
* 修复 App-iOS平台 class 实例对象调用带参数标签的方法编译报错的Bug
* 补齐 App-iOS平台 支持 parseInt、parseFloat、isNan、isFinite 等全局方法
* 补齐 App-iOS平台 string 类型支持 toString、valueOf 等方法
* 补齐 App-iOS平台 Array 类型支持 toString、sort 等方法
* 补齐 App-iOS平台 Date 类型支持 toString、 valueOf、toUTCString、toTimeString、toDateString、parse 等方法
* 修复 App-iOS平台 函数参数不支持 class 数组类型的Bug
* 修复 for 循环中包含复杂continue、break时，执行不正确的Bug
* 修复 class 中无法访问外部定义的与类内部属性、方法同名的变量的Bug