#### 5.04.2026031801
* 【uni-app x】
  + iOS平台 修复 组件 native-view 动态创建并销毁时可能引起崩溃 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=27240)
  + 微信小程序平台 修复 CSS 样式隔离策略和externalClass 部分情况下父组件传入的全局class不能在子组件根节点生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=27180)
* 【uni-app】
  + 小程序平台 修复 hx 项目分包未包含 node_modules 时错误将主包依赖打包到分包的问题 [详情](https://ask.dcloud.net.cn/question/218618)
  + 微信小程序平台 修复 部分情况下父组件传入的全局class不能在子组件根节点生效 [详情](https://ask.dcloud.net.cn/question/218527)
* 【uts插件】
  + Android平台 修复 5.03版本引发的 回退 JSON.parse / UTSJSONObject的处理来修复import json文件之后可能导致编译报错的问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=27264)

#### 5.03.2026031210
* 【uni-app x】
  + 【重要】新增 鸿蒙平台 蒸汽模式，渲染性能大幅提升 [详情](https://doc.dcloud.net.cn/uni-app-x/app-harmony/harmony-vapor.html)
  + 【重要】新增 CSS 样式隔离策略2.0，统一全平台样式隔离策略 [文档](https://doc.dcloud.net.cn/uni-app-x/css/common/style-isolation.html)
  + 【重要】新增 CSS 组件支持external-class规范，用于组件通过属性方式修改子组件样式 [文档](https://doc.dcloud.net.cn/uni-app-x/css/common/style-isolation.html#external-class)
  + Android平台、iOS平台、鸿蒙平台 新增 vue useComputedStyle用于监听组件根节点计算后样式变化 [文档](https://doc.dcloud.net.cn/uni-app-x/vue/composition-api.html#use-computed-style)
  + 调整 CSS line-height 默认值为 normal。不再固定1.2 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25246)
  + 新增 组件 loading [文档](https://doc.dcloud.net.cn/uni-app-x/component/loading.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=21140>
  + Web平台、iOS平台、鸿蒙平台、微信小程序平台 新增 目标语言为js时为对象字面量指定类型时不再进行字段值类型校验以便更高性能的使用type [文档](https://doc.dcloud.net.cn/uni-app-x/uts/data-type.html#type) <https://issues.dcloud.net.cn/pages/issues/detail?id=25766>
  + Web平台、App平台 升级 API uni.showLoading 基于loading组件重构showLoading。并不再支持点击空白区关闭loading [文档](https://doc.dcloud.net.cn/uni-app-x/api/loading.html#showloading) <https://issues.dcloud.net.cn/pages/issues/detail?id=25025>
  + Web平台、App平台 新增 组件 page-container 组件 [文档](https://doc.dcloud.net.cn/uni-app-x/component/page-container.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=26320>
  + Web平台、App平台 新增 UniPage API 支持 querySelector/querySelectorAll 方法 [文档](https://doc.dcloud.net.cn/uni-app-x/api/unipage.html#queryselector) <https://issues.dcloud.net.cn/pages/issues/detail?id=25211>
  + Web平台、App平台 调整 CSS white-space 调整靠近Web规范。App默认值调整为 keep [文档](https://doc.dcloud.net.cn/uni-app-x/css/white-space.html#hbuilderx5-0%E7%89%88%E6%9C%AC%E8%B0%83%E6%95%B4) <https://issues.dcloud.net.cn/pages/issues/detail?id=24206>
  + Web平台、App平台 修复 页面存在多个 onBackPress 任一返回 true 时拦截返回操作失效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=26833)
  + 【重要】App平台 新增 API uni.request enableQuic 属性支持 Quic/h3 协议 [文档](https://doc.dcloud.net.cn/uni-app-x/api/request.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=24727>
  + 新增 App.uvue 支持组合式 [文档](https://doc.dcloud.net.cn/uni-app-x/vue/composition-api.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=24585>
  + Web平台 修复 API uni.createSelectorQuery .selectAll() 页面多根节点无法查询的问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=26051)
  + Web平台 修复 4.51版本引发的 API uni.showActionSheet 非预期修改页面标题的 Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22335)
  + Web平台 修复 CSS rpx 750rpx会受微信字体影响导致占不了满屏 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23250)
  + Web平台 修复 运行调试 pages.json使用国际化后，无法运行到浏览器 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14433)
  + Web平台 修复 API uni.showModal 显示输入框时样式异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=26895)
  + App平台 新增 API uni.setInnerAudioOption 支持speakerOn、obeyMuteSwitch等参数 [文档](https://doc.dcloud.net.cn/uni-app-x/api/create-inner-audio-context.html#setinneraudiooption-兼容性) <https://issues.dcloud.net.cn/pages/issues/detail?id=22476>
  + App平台 新增 API uni.getBackgroundAudioManager 支持 offPlay、offPause、offStop 等取消监听相关方法 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-background-audio-manager.html#offcanplay) <https://issues.dcloud.net.cn/pages/issues/detail?id=23448>
  + App平台 新增 UniPage API takeSnapshot 对页面进行截图 [文档](https://doc.dcloud.net.cn/uni-app-x/api/unipage.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=26398>
  + App平台 升级 组件 web-view 使用 uts 标准组件模式重构 [文档](https://doc.dcloud.net.cn/uni-app-x/component/web-view.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=23174>
  + App平台 修复 API uni.previewImage 设置过多图片时显示速度变慢 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=26383)
  + App平台 修复 CSS align-items 设置min-width后, align-items: center 不起作用 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23067)
  + Android平台、iOS平台、鸿蒙平台 修复 样式隔离2.0时自定义组件透传hover-class不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=26676)
  + Android平台、iOS平台 新增 CSS border-radius 支持百分比 [文档](https://doc.dcloud.net.cn/uni-app-x/css/border-radius.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=25460>
  + Android平台、iOS平台 新增 发行 云端打包支持配置应用名称国际化 [文档](https://doc.dcloud.net.cn/uni-app-x/i18n.html#manifest) <https://issues.dcloud.net.cn/pages/issues/detail?id=24944>
  + Android平台、iOS平台 修复 CSS background 设置为 none 时可能不会设置背景透明 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23350)
  + Android平台、iOS平台 升级 组件 rich-text 使用 uts 标准组件模式重构 [文档](https://doc.dcloud.net.cn/uni-app-x/component/rich-text.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=24578>
  + Android平台 新增 API uni.previewImage 未设置 longPressActions 默认长按行为为保存到系统相册 [文档](https://doc.dcloud.net.cn/uni-app-x/api/preview-image.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=25441>
  + Android平台 调整 组件 全局事件 touch 事件的 preventDefault 仅在当前事件周期内生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23412)
  + Android平台 修复 ref和reactive后的UTSJSONObject不支持.操作符访问第一层数据 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15846)
  + Android平台 修复 组件 scroll-view 嵌套时设置子scroll-view 的 direction 属性值为 none 会导致父 scroll-view 无法滚动 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21662)
  + Android平台 修复 组件 list-view 子节点为多根节点的封装组件时，更新子节点报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17610&ask_id=208416)
  + Android平台 修复 4.85版本引发的 组件 waterflow 在 swiper 组件中使用会出现加载更多报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23912)
  + Android平台 修复 组件 text 在 list-view 组件中使用 text 嵌套会导致 tap/click 事件无法触发 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22215)
  + Android平台 修复 组件 button 设置 border 样式无效果 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18878)
  + Android平台 修复 组件 input 设置 type 为 none 时部分情况获取焦点依然弹出软键盘 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23856)
  + Android平台 修复 组件 textarea 设置 confirm 事件后点击软键盘的`换行`会失去焦点 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21759)
  + Android平台 修复 组件 image 使用 svg 格式图片可能显示不正常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22591)
  + Android平台 修复 组件 video 播放部分视频源可能没有声音 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16434)
  + Android平台 修复 组件 camera 设置默认使用前置摄像头无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22248)
  + Android平台 修复 组件 camera 部分情况可能引起内存泄漏 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22660)
  + Android平台 修复 组件 camera 设置 mode 为 scanCode 模式时双击返回桌面可能引起应用崩溃 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=24239)
  + Android平台 修复 4.31版本引发的 API getCurrentPages 可能报 `expected 'UTSArray<UniPage>', actual 'UTSArray<UniNormalPage>'`异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23798)
  + Android平台 修复 API uni.arrayBufferToBase64 转换使用 slice 方法截取获得的 arrayBuffer 数据输出内容为空字符串 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20232)
  + Android平台 修复 API uni.addInterceptor `return false` 无法阻止 API 执行 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23133)
  + Android平台 修复 API navigator 页面跳转失败时未输出具体错误信息 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22667)
  + Android平台 修复 API uni.redirectTo 跳转页面引起内存泄漏 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22277)
  + Android平台 修复 API dialogPage uni.setNavigationBarColor 无法修改 dialogPage 状态栏前景色 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21804)
  + Android平台 修复 API dialogPage 在 tabBar 页面中打开时获取区域信息不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23928)
  + Android平台 修复 API uni.getBoundingClientRectAsync 获取元素信息在部分情况可能不准确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=24033)
  + Android平台 修复 API uni.request 请求 gzip 资源时不会自动解压数据 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21720)
  + Android平台 修复 API uni.downloadFile 偶发下载无响应 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25489)
  + Android平台 修复 API uni.scanCode 选择图片可能出现识别二维码失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20833)
  + Android平台 修复 API uni.chooseImage 在部分设备会出现顶部菜单被系统状态栏档住 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22709)
  + Android平台 修复 API uni.chooseImage 部分情况可能引起内存泄漏 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=24195)
  + Android平台 修复 API uni.getBackgroundAudioManager 调用 pause/stop 方法后系统音频控制面板中播放状态没有改变 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=24065)
  + Android平台 修复 API uni.getRecorderManager 设置采样率sampleRate为16000不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25204)
  + Android平台 修复 API uni.getFileSystemManager 调用 unzip 方法解压部分压缩文件失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21458)
  + Android平台 修复 API uni.getFileSystemManager 调用 write 方法可能出现 java.io.IOExcePtion:Bad file descriptor 错误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=24228)
  + Android平台 修复 API uni.getFileSystemManager 调用 write 方法写入长字符串可能引起失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=24946)
  + Android平台 修复 API uni.getLocation 无法获取 speed 速度信息 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23828)
  + Android平台 修复 API uni.createCanvasContextAsync drawImage 可能出现异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=26145)
  + Android平台 修复 CSS scss margin简写报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23316)
  + Android平台 修复 CSS overflow 设置为 visible 时超出父元素范围时可能显示异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22823)
  + Android平台 修复 CSS overflow 在部分情况可能导致事件触发混乱 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22897)
  + Android平台 修复 CSS overflow 设置为 hidden 时父元素的 border 可能会被覆盖 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23497)
  + Android平台 修复 CSS transition 设置 box-shadow 后 background-color 动画可能不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20603)
  + Android平台 修复 DOM API UniElement animate 动画 iterations 设置为 1 时执行 2 次动画 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22132)
  + Android平台 修复 DOM API UniElement querySelectorAll 返回值可能为 null [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25589)
  + Android平台 修复 4.81版本引发的 DOM API UniElement animate 方法触发 margin、padding 动画仅第一次生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=26744)
  + Android平台 修复 DOM API CSSStyleDeclaration 获取部分通过 class 设置的样式返回空 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=26352)
  + Android平台 修复 发行 应用市场合规检测可能报 Glide Mocks SDK 在同意隐私政策前读取图片头信息的位置信息 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25539)
  + Android平台 修复 发行 调用 UniAppXApplication.onCreate 方法可能无响应 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21926)
  + iOS平台 新增 match-media 组件 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25783)
  + iOS平台 新增 API uni.createInnerAudioContext 支持 obeyMuteSwitch 控制是否遵循系统静音开关 [文档](https://doc.dcloud.net.cn/uni-app-x/api/create-inner-audio-context.html#createinneraudiocontext-%E5%85%BC%E5%AE%B9%E6%80%A7) <https://issues.dcloud.net.cn/pages/issues/detail?id=25457>
  + iOS平台 升级 API uni.getUniVerifyManager 更新使用的 个验SDK 为 3.1.3.0 版 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-univerify-manager.html#getuniverifymanager) <https://issues.dcloud.net.cn/pages/issues/detail?id=24273>
  + iOS平台 新增 发行 支持配置 uts插件 的 Bundle Identifier [文档](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-plugin.html#iosconfigjson) <https://issues.dcloud.net.cn/pages/issues/detail?id=23555>
  + iOS平台 修复 vue 持续渲染场景下 onReady 不触发导致渲染异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25459)
  + iOS平台 修复 组件 Click 事件 持续渲染场景下点击事件不响应 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25381)
  + iOS平台 修复 组件 scroll-view 开启下拉刷新时设置 refresher-default-style为 none 时无刷新效果 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25593)
  + iOS平台 修复 组件 nested-scroll 嵌套在 swiper 组件中时切换不同子滚动视图可能无法滚动 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23850)
  + iOS平台 修复 组件 rich-text 不支持自定义node节点（含超长链接）自动换行 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23897)
  + iOS平台 修复 组件 video 竖屏全屏时返回键被安全区域遮挡无法点击 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25323)
  + iOS平台 修复 组件 camera 退出页面时可能引起应用崩溃 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19701)
  + iOS平台 修复 4.84版本引发的 API uni.showModal 参数 showCancel 默认值失效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25411)
  + iOS平台 修复 4.62版本引发的 API uni.setAppTheme 重启应用后无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25244)
  + iOS平台 修复 API uni.downloadFile 使用 encoding 编码后的地址会引起失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23369)
  + iOS平台 修复 API uni.connectSocket 设置 header 属性值可能出现异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22639)
  + iOS平台 修复 API uni.createPushMessage 设置 cover 属性覆盖消息无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21635)
  + iOS平台 修复 API uni.chooseFile 当文件名称中包含`%`字符时选择文件不成功 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=26085)
  + iOS平台 修复 API uni.getFileSystemManager rename 不支持目录路径 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=26433)
  + iOS平台 修复 发行 设置 CFBundleName 未生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23236)
  + 鸿蒙平台 新增 组件 image 支持 base64 svg [文档](https://doc.dcloud.net.cn/uni-app-x/component/image.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=22096>
  + 鸿蒙平台 新增 API uni.share 支持 openCustomerServiceChat 打开客服功能 [文档](https://doc.dcloud.net.cn/uni-app-x/api/share.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=23388>
  + 鸿蒙平台 修复 组件 text 动态改变text组件的line-height与letter-spacing，界面文本不更新 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22636)
  + 鸿蒙平台 修复 组件 button disabled为true时click事件仍然生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25877)
  + 鸿蒙平台 修复 组件 input 输入框有内容时聚焦，光标位置不在内容最后 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21990)
  + 鸿蒙平台 修复 4.87版本引发的 组件 input 聚焦时设置 focus 属性为 true 无法弹出软键盘问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23198)
  + 鸿蒙平台 修复 组件 switch 设置属性后导致页面中 image 加载失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22158&ask_id=212321)
  + 鸿蒙平台 修复 4.75版本引发的 组件 textarea 输入内容后高度异常问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22666)
  + 鸿蒙平台 修复 组件 textarea UniInputEvent.detail 丢失 cursor 属性 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22816)
  + 鸿蒙平台 修复 组件 textarea style 设置 padding 效果异常问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23131)
  + 鸿蒙平台 修复 组件 canvas measureText测量的文本宽度不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22568)
  + 鸿蒙平台 修复 组件 swiper onLoad 初始化 100 个item 显示较慢 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=26384)
  + 鸿蒙平台 修复 组件 input 设置 font-size 无法影响 placeholder [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25710)
  + 鸿蒙平台 修复 组件 video 同时存在两个及以上时图片显示异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25960)
  + 鸿蒙平台 修复 API uni.createSelectorQuery 组件使用transform:rotate(180deg)旋转，鸿蒙系统下使用uni.createSelectorQuery获取组件信息不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21879)
  + 鸿蒙平台 修复 API uni.request 方法返回data是一个空字符串时报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25391)
  + 鸿蒙平台 修复 API uni.request 鸿蒙HEAD请求报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25573)
  + 鸿蒙平台 修复 API uni.getNetworkType 调用失败错误原因不清晰 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=24521)
  + 鸿蒙平台 修复 API uni.chooseVideo chooseVideo、chooseMedia选择视频文件时返回的size单位错误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21825)
  + 鸿蒙平台 修复 API uni.getBackgroundAudioManager onEnded回调函数里再次调用play无法播放音频 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=24202&ask_id=217454)
  + 鸿蒙平台 修复 API uni.getFileSystemManager saveFile、saveFileSync 在保存相册图片时失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22877)
  + 鸿蒙平台 修复 API uni.getUniVerifyManager 自定义一键登录报错 -20100 传入参数错误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25019&ask_id=216771)
  + 鸿蒙平台 修复 API uni.share 微信分享图文时获取图片ArrayBuffer错误导致分享失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23072&ask_id=215215)
  + 鸿蒙平台 修复 API uni.request 鸿蒙系统下RequestFail返回的信息不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25935)
  + 鸿蒙平台 修复 DOM API DrawableContext 鸿蒙 Next fillRect 报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20101)
  + 鸿蒙平台 修复 API uni.exit 退出应用后系统快照无法显示完整的退出前界面 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=26105)
  + 鸿蒙平台 修复 运行调试 自动申请调试证书在DevEco Studio 6.0.2版本失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25354)
  + 鸿蒙平台 修复 4.75版本引发的 发行 鸿蒙应用商店上架审核出现稳定性问题导致不通过 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23001)
  + 微信小程序平台 修复 4.76版本引发的 v-for + slot 组合会生成多余的空白 slot 标签的 Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22609)
  + 微信小程序平台 修复 4.81版本引发的 前端付费组件云编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=24434)
  + 微信小程序平台 修复 编译器 命名插槽多根节点时flex样式丢失的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25934)
* 【uts插件】
  + Android平台、iOS平台 修复 字符串中出现`/f`时编译器报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25844)
  + Android平台 新增 UniActivityCallback 支持 onPictureInPictureModeChanged [文档](https://doc.dcloud.net.cn/uni-app-x/uts/utsactivitycallback.html#onPictureInPictureModeChanged) <https://issues.dcloud.net.cn/pages/issues/detail?id=19844>
  + Android平台 优化 部分情况剩余参数告警 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21998)
  + Android平台 优化 代码中存在没有意义的比较时忽略: Condition is always的警告 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23138)
  + Android平台 优化 type中属性的值如果是type，并且不存在该type时编译器报错信息无法回到原始位置 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=24855)
  + Android平台 修复 使用大的json文件时编译器提示Method too large [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25095)
  + Android平台 修复 UTSJSONObject中key不能携带`.` [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=24734)
  + Android平台 修复 Date 对象某些时间可能计算错误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25882)
  + Android平台 修复 UniActivityKeyEventCallback 的 onKeyDown 无法拦截默认按钮事件 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25575&ask_id=216940)
  + iOS平台 新增 支持配置 Swift Package Manager（SPM）依赖 [文档](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-ios-spms.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=22374>
  + iOS平台 修复 uni-app兼容模式组件仅包含app-ios平台时，云打包未包含该组件 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25830)
  + iOS平台 修复 云端打包部分情况可能没有包含uts插件配置 CocoaPods 依赖的动态库 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25686)
* 【uni-app】
  + App平台 修复 mapContext.includePoints 调用不生效的Bug [详情](https://ask.dcloud.net.cn/question/217064)
  + App平台 修复 input 组件设置 digit 属性光标调整失焦后数据错乱的Bug [详情](https://ask.dcloud.net.cn/question/203478)
  + App平台 修复 地图导航组件遮挡地理位置文字的Bug [详情](https://ask.dcloud.net.cn/question/216973)
  + Android平台 修复 4.81版本引发的 image 组件加载图片可能导致应用崩溃的Bug [详情](https://ask.dcloud.net.cn/question/215781)
  + Android平台 修复 4.81版本引发的 开启uni安全网络无法访问云端云函数的Bug
  + Android平台 修复 vue页面中调用uts插件导出方法的参数存在复杂嵌套自定义类型时报`java.lang.IllegalArgumentException: method`错误
  + iOS平台 修复 editorContext.format 传递空 name 没有终止逻辑服务执行的Bug [详情](https://ask.dcloud.net.cn/question/214259)
  + iOS平台 修复 input 组件快速输入导致失焦的Bug [详情](https://ask.dcloud.net.cn/question/216827)
  + iOS平台 修复 下拉刷新和 Swiper 组件滑动卡住的Bug [详情](https://ask.dcloud.net.cn/question/201306)
  + iOS平台 修复 4.81版本引发的 一键登录未勾选隐私协议时点击登录按钮无提示的Bug
  + 鸿蒙平台 新增 video 组件全屏 [详情](https://ask.dcloud.net.cn/question/199732)
  + 鸿蒙平台 新增 支持 darkmode [详情](https://ask.dcloud.net.cn/question/214054) [文档](https://uniapp.dcloud.net.cn/tutorial/darkmode.html#app-harmony)
  + 鸿蒙平台 新增 manifest.json 支持应用设备 DeviceTypes 支持 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=24166)
  + 鸿蒙平台 新增 page.json 支持 scrollIndicator 配置页面默认滚动条表现 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23730)
  + 鸿蒙平台 修复 getBackgroundAudioManager onWaiting 回调不执行的 Bug [详情](https://ask.dcloud.net.cn/question/214075)
  + 鸿蒙平台 修复 一键登录配置 logo 后未显示的 Bug [详情](https://ask.dcloud.net.cn/question/215265)
  + 鸿蒙平台 修复 API uni.share 微信分享图文时获取图片ArrayBuffer错误导致分享失败的 Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23072&ask_id=215215)
  + 鸿蒙平台 修复 html2canvas 无法使用的 Bug [详情](https://ask.dcloud.net.cn/question/211115)
  + 鸿蒙平台 修复 tabbar 图片错误设置可拖入到页面中展示的 Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22676&ask_id=214660)
  + 鸿蒙平台 修复 鸿蒙微信分享传递 uri 参数被忽略的 Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22780&ask_id=214779)
  + 鸿蒙平台 修复 API chooseMedia 视频选择返回值和其他平台表现不一致的 Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25490)
  + 鸿蒙平台 修复 uni.scanCode无法使用的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25577)
  + 鸿蒙平台 修复 API 版本高于 20 时访问 file 协议资源报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=26545)
  + Web平台 修复 onPageNotFound API 获取不到不存在页面的 query 参数的 Bug [详情](https://ask.dcloud.net.cn/question/214796)
  + Web平台 修复 input type="digit"时 ios连续点击小数点会删除之前输入的值的 Bug [详情](https://ask.dcloud.net.cn/question/187430)
  + 小程序平台 新增 分包支持自定义原生组件 [详情](https://ask.dcloud.net.cn/question/129409)
  + 小程序平台 修复 分包引入分包 node_modules 内容产物依然被打包到主包 vendor.js 中的 Bug [详情](https://ask.dcloud.net.cn/question/185955)
  + 微信小程序平台 修复 store-home 组件动态绑定 appid 不生效的 Bug [详情](https://ask.dcloud.net.cn/question/207708)
  + 微信小程序平台 修复 插件模式使用 canIUse API 报错的 Bug [详情](https://ask.dcloud.net.cn/question/215671)
  + 微信小程序平台 修复 unocss v66.1.2 导致无法正常生成 app.wxss 的 Bug [详情](https://ask.dcloud.net.cn/question/209637)
  + 微信小程序平台 修复 v-if 元素上的点击事件触发错误 [详情](https://ask.dcloud.net.cn/question/198957)
  + 支付宝小程序平台 修复 vue3 项目无法通过 instance.proxy.$refs 获取到组件实例 的 Bug [详情](https://ask.dcloud.net.cn/question/213028)
  + 支付宝小程序平台 修复 开启 mergeVirtualHostAttributes 时 virtualHostClass 不能正确转化的 Bug [详情](https://uniapp.dcloud.net.cn/collocation/manifest.html#mp-alipay)
  + 支付宝小程序平台 修复 showLoading API 不设置 content 会展示 undefined 的 Bug [详情](https://ask.dcloud.net.cn/question/215446)
  + 支付宝小程序平台 修复 showToast API 未设置 icon 其默认值 success 不生效的 Bug [详情](https://ask.dcloud.net.cn/question/217398)
  + 支付宝小程序平台 修复 globalStyle 中设置 onReachBottomDistance 不生效的 Bug [详情](https://ask.dcloud.net.cn/question/215012)
  + 支付宝小程序平台 修复 vue2 项目 eventChanel 监听不到上页 emit 事件的 Bug [详情](https://github.com/dcloudio/uni-app/pull/5887)
  + 支付宝小程序平台 修复 ad-feeds 组件编译属性丢失的 Bug [详情](https://ask.dcloud.net.cn/question/214361)
  + 抖音小程序平台 修复 onUploadDouyinVideo hook 无法触发的 Bug [详情](https://ask.dcloud.net.cn/question/214147)
  + 抖音小程序平台 修复 onLiveMount hook 无法触发的 Bug [详情](https://ask.dcloud.net.cn/question/197781)
  + 抖音小程序平台 修复 showTabBar/hideTabBar API 不传入 animation 参数时会报警告的 Bug [详情](https://github.com/dcloudio/uni-app/pull/5857)
  + 抖音小程序平台 修复 video-player 组件编译属性丢失的 Bug [详情](https://ask.dcloud.net.cn/question/192086)
  + 抖音小程序平台 修复 嵌套组件获取 props 为 null的 Bug [详情](https://ask.dcloud.net.cn/question/189702)
  + 小红书小程序平台 修复 video-player 组件编译属性丢失的 Bug [详情](https://ask.dcloud.net.cn/question/214258)
  + 小红书小程序平台 修复 编译小红书小程序无法正常加载组件的 Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23793)
  + 京东小程序平台 修复 在鸿蒙 Next 设备上子组件 watch、computed 不触发的 Bug [详情](https://ask.dcloud.net.cn/question/214755)
  + 京东小程序平台 新增 支持设置theme.json
  + 鸿蒙元服务平台 修复 attach 和 prop 触发不稳定的Bug [详情](https://ask.dcloud.net.cn/question/217075)
  + Web平台 修复 API 获取系统信息不识别鸿蒙的Bug
* 【uniCloud】
  + 新增 支付宝云支持云函数自定义request域名 [详情](https://doc.dcloud.net.cn/uniCloud/request-custom-domain.html)
  + 新增 前端网页托管支持上传到扩展存储 [详情](https://doc.dcloud.net.cn/uniCloud/ext-storage/dev.html#web-site)
  + 新增 扩展存储 视频转码API [详情](https://doc.dcloud.net.cn/uniCloud/ext-storage/dev.html#pfop)
  + 新增 扩展存储 getUploadFileOptions 视频上传后自动转码参数 [详情](https://doc.dcloud.net.cn/uniCloud/ext-storage/dev.html#getuploadfileoptions)
  + 新增 扩展存储 listFiles 返回值 marker [详情](https://doc.dcloud.net.cn/uniCloud/ext-storage/dev.html#listfiles)
  + 新增 uni直播 生成直播回放API [详情](https://doc.dcloud.net.cn/uniCloud/uni-live/dev.html#recording-generate)
  + 修复 关联服务空间时提示“服务空间不存在”的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23596&ask_id=215483)
  + 修复 4.87版本引发的 创建uniCloud项目后提示“缺少appid,请在manifest.json中设置appid” [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=24935)
  + 修复 4.76版本引发的 无法下载所有公共模块的 Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25160)
* 【App插件(含5+App和uni-app的App端)】
  + Android平台 更新 uni-ad Sigmob广告联盟SDK 为 4.25.5 版；AdScope倍孜广告SDK 为 5.2.3.2 版
  + Android平台 更新 地图/定位模块 GooglePlay渠道 高德地图 SDK 为 11.1.060 版，高德定位 SDK 为 11.1.060 版，解决提交 GooglePlay 报未适配支持 16KB 内存页面大小的Bug [详情](https://ask.dcloud.net.cn/question/216582)
  + Android平台 修复 配置自定义启动图为黑色图片，提交云端打包后在部分设备可能出现系统导航栏启动时闪白的问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=25292)
  + iOS平台 修复 开启 `js/nvue文件原生混淆` 先通过 wgt 升级更新应用资源后再整包覆盖安装可能导致启动卡在启动页的Bug

#### 4.87.2025121004
* 【uni-app x】
  + Web平台 修复 4.81版本引发的 API dialogPage 中使用 mapContext 异常的 Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23233)
  + iOS平台 修复 API uni.request 访问某些 url 地址可能引起崩溃 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21823)
  + iOS平台 修复 4.76版本引发的 CSS 某些情况下部分属性可能不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=23230)
* 【uni-app】
  + Android平台 修复 4.81版本引发的 uni.chooseImage 设置 crop 属性之后图片裁剪可能不生效的Bug [详情](https://ask.dcloud.net.cn/question/215441)
* 【App插件(含5+App和uni-app的App端)】
  + Android平台 修复 录音功能在某些启用16KB模式的设备无法正常使用的Bug
  + Android平台 修复 4.81版本引发的 云端打包勾选`对配置的js/nvue文件进行原生混淆`，安装后启动白屏的Bug [详情](https://ask.dcloud.net.cn/question/214978)
  + iOS平台 更新 高德地图 SDK 为 10.1.600 版，解决与其它插件一起打包可能编译失败的问题 [详情](https://ask.dcloud.net.cn/question/214993)
  + iOS平台 更新 一键登录 依赖的个验 SDK 为 3.1.3.0 版，解决联通隐私协议链接地址失效的问题

#### 4.85.2025110510
* 【uni-app x】
  + iOS平台 修复 4.84版本引发的 组件 list-view 频繁拖动加载更多数据可能引起崩溃 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22861)

#### 4.84.2025110307
* 【uni-app】
  + 修复 text 组件会将 `&nbsp;、&ensp;` 等去除的Bug [详情](https://ask.dcloud.net.cn/question/111406)
  + Android平台、iOS平台 新增 支持贴片视频广告 [文档](https://uniapp.dcloud.net.cn/uni-ad/ad-video-component.html)
  + Android平台、iOS平台 修复 chooseLocation 在腾讯地图上缺少定位图标及选点图标的Bug [详情](https://ask.dcloud.net.cn/question/213494)
  + Android平台 修复 uni.getVideoInfo、uni.CompressVideo 可能不支持 uni.chooseMedia 返回路径的Bug
  + Android平台 修复 调用 uni.chooseLocation 导致网络请求 UserAgent 异常的Bug [详情](https://ask.dcloud.net.cn/question/211788)
  + Android平台 修复 在部分设备设置为定时切换显示模式时，获取的暗黑模式信息不准确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19922)
  + App-iOS平台 适配 uni.getDeviceInfo 返回的 deviceModel 支持 iPhone 17、iPhone 17 Pro、iPhone17ProMax、iPhoneAir 等设备型号
  + web平台 新增 uni.getFacialRecognitionMetaInfo 支持实人认证 [详情](https://uniapp.dcloud.net.cn/api/plugins/facialRecognitionVerify.html#getfacialrecognitionmetainfo)
  + 鸿蒙平台 新增 API 启动 获取应用启动参数 appScheme [文档](https://uniapp.dcloud.net.cn/api/getLaunchOptionsSync.html)
  + 鸿蒙平台 新增 支持 微信登录 [详情](https://uniapp.dcloud.net.cn/api/plugins/login.html)
  + 鸿蒙平台 新增 支持 微信分享 [详情](https://uniapp.dcloud.net.cn/api/plugins/share.html)
  + 鸿蒙平台 新增 支持 屏幕亮度相关的 API [详情](https://uniapp.dcloud.net.cn/api/system/brightness.html)
  + 鸿蒙平台 新增 可使用 getLaunchOptionsSync、getEnterOptionsSync 获取 appScheme [详情](https://uniapp.dcloud.net.cn/api/getLaunchOptionsSync.html)
  + 鸿蒙平台 调整 逻辑层的 JSVM 转移到单独的子线程中运行以避免阻塞主线程 [详情](https://uniapp.dcloud.net.cn/tutorial/harmony/history.html)
  + 鸿蒙平台 修复 web-view 组件访问网页 viewport 不生效的Bug
  + 鸿蒙平台 修复 scroll-view 组件在页面启用下拉刷新时拖动期间会输出错误信息的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21035)
  + 鸿蒙平台 修复 getFileInfo 在获取媒体库文件信息时报错文件不存在 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21036)
  + 鸿蒙平台 修复 API uni.chooseMedia 不进入成功失败回调的Bug [详情](https://uniapp.dcloud.net.cn/api/media/video.html#choosemedia)
  + 鸿蒙平台 修复 API uni.chooseImage 选择 gif 图片并且不勾选原图后不显示的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19771)
  + 鸿蒙平台 修复 API uni.compressImage 压缩的图片会变形的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20928)
  + 鸿蒙平台 修复 request 请求中的 param 和 url 参数没有去重的 Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22949)
  + 鸿蒙平台 修复 requestTask 的 abort 方法执行后，没有执行到 fail 的 Bug [详情](https://ask.dcloud.net.cn/question/211391)
  + 鸿蒙平台 修复 onThemeChange 不执行的问题 [详情](https://ask.dcloud.net.cn/question/211673)
  + 鸿蒙平台 修复 previewImage 切换图片保存失败的 Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22951)
  + 鸿蒙平台 修复 web-view 组件中无法自动播放音频的 Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=22952)
  + 鸿蒙平台 修复 在首页有 web-view 组件且可返回时，侧滑返回会直接退出应用的Bug [详情](https://ask.dcloud.net.cn/question/212712)
  + 鸿蒙平台 修复 getFileSystemManager 处理相册图片异常的Bug [详情](https://ask.dcloud.net.cn/question/210544)
  + 小程序平台 新增 通过 nativeTags 自定义原生组件列表 [详情](https://ask.dcloud.net.cn/question/211939)
  + 小程序平台 修复 wxs 中动态绑定 class 和 style 不生效的Bug [详情](https://ask.dcloud.net.cn/question/183983)
  + 小程序平台 修复 分包使用 plugins export 不生效的 Bug [详情](https://github.com/dcloudio/uni-app/pull/5686)
  + 小程序平台 修复 vue2 项目设置类名为变量时未能正确编译的 Bug [详情](https://github.com/dcloudio/uni-app/pull/5664)
  + 小程序平台 修复 vue2 项目自定义项目配置不生效的 Bug [详情](https://github.com/dcloudio/uni-app/commit/dffd2ea70b004a3747f75c81b54785bb657db672)
  + 微信小程序 修复 movable-view 组件动态绑定 direction 不生效的 Bug [详情](https://github.com/dcloudio/uni-app/issues/5694)
  + 微信小程序 修复 store-coupon 组件编译属性丢失的 Bug [详情](https://ask.dcloud.net.cn/question/212955)
  + 支付宝小程序 修复 页面通过 navigateTo 跳转 eventChannel 失效的 Bug [详情](https://ask.dcloud.net.cn/question/212721)
  + 支付宝小程序 修复 组件设置 styleIsolation 编译后 js文件 和 json文件 值不一致的问题 [详情](https://ask.dcloud.net.cn/question/212443)
  + 支付宝小程序 修复 globalStyle 中设置 navigationBarTextStyle 不生效的 Bug [详情](https://ask.dcloud.net.cn/question/212945)
  + 支付宝小程序 修复 新版配置默认设置 component2: true [详情](https://ask.dcloud.net.cn/question/213028)
  + 抖音小程序 修复 draw-ad 组件编译属性丢失的 Bug [详情](https://github.com/dcloudio/uni-app/commit/36ae9194da26480708ef43671ffdea87f7100249)
  + 抖音小程序 修复 vue2 项目 sjs 不生效的 Bug [详情](https://ask.dcloud.net.cn/question/162300)
  + 小红书小程序 修复 vue2 项目 sjs 不生效的 Bug [详情](https://github.com/dcloudio/uni-app/pull/5762)
  + 小红书小程序 修复 API requestPayment 调用不生效的 Bug [详情](https://ask.dcloud.net.cn/question/194812)
  + 京东小程序 修复 vue3 项目插件中 input 事件不触发的 Bug [详情](https://ask.dcloud.net.cn/question/212442)
  + 京东小程序 修复 vue2 项目 jds 不生效的 Bug [详情](https://github.com/dcloudio/uni-app/pull/5763)
* 【uni-app x】
  + 【重要】新增 API uni.createWorker 支持 Worker 线程 [文档](https://doc.dcloud.net.cn/uni-app-x/api/create-worker.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=19898>
  + 修复 编译器 部分场景下编译器报错之后，错误信息中不包含uvue、uts [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21129)
  + 修复 编译器 async函数嵌套使用时部分情况下编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19670&ask_id=209218)
  + 修复 4.61版本引发的 编译器 部分情况下自动补充的类型信息不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21143)
  + Web平台 新增 组件 textarea 支持 change 事件 [文档](https://doc.dcloud.net.cn/uni-app-x/component/textarea.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=20815>
  + Web平台 修复 API dialogPage openDialogPage 某些情况打开错误页面 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19676)
  + Web平台 修复 API uni.request 响应体尝试JSON.parse失败后未返回原始响应体 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19687)
  + Android平台、iOS平台 新增 uni-ad 国外广告 支持 AppLovin 渠道 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-modules.html#uni-ad) <https://issues.dcloud.net.cn/pages/issues/detail?id=20516>
  + Android平台、iOS平台 更新 uni-ad 腾讯优量汇SDK Android为 4.660.1530 版，iOS为 4.15.60 版；快手广告和快手内容联盟SDK Android为 4.9.20.1 版，iOS为 4.9.20.1 版；穿山甲&GroMore SDK Android为 7.1.3.2 版，iOS为 7.2.0.0 版；Sigmob广告联盟SDK Android为 4.24.7 版，iOS为 4.20.3 版；百度百青藤广告SDK iOS为 10.02 版；章鱼广告SDK Android为 2.5.10.5 版，iOS为 2.5.10.10 版；泛连广告SDK Android为 2.8.8 版，iOS为 2.8.8.0.0 版；华夏乐游SDK Android为 3.14.9 版，iOS为 2.16.0 版；AdScope倍孜广告SDK Android为 5.2.2.0 版；Google AdMob SDK Android 为 24.6.0 版，iOS 为 12.9.0 版；Mintegral SDK Android为 16.9.91.1 版；Pangle SDK Android为 7.6.0.3 版，iOS为 7.6.0.0 版；Unity SDK Android为 4.16.1 版，iOS为 4.16.0 版；Liftoff SDK Android为 7.5.1.0 版，iOS为 7.5.2 版；InMobi SDK Android为 10.8.7.1 版，iOS为 10.8.6 版；IronSource SDK Android为 9.0.0.0 版，iOS为 8.10.0 版；Meta SDK iOS为 6.20.1 版；Mintegral SDK iOS为 7.7.9 版；支持双十一预算 [文档](https://doc.dcloud.net.cn/uni-app-x/api/create-rewarded-video-ad.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=22382>
  + Android平台、iOS平台 新增 组件 image 支持 svg 格式图片 [文档](https://doc.dcloud.net.cn/uni-app-x/component/image.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=6560>
  + Android平台、iOS平台 新增 组件 live-player 支持实时音视频播放 [文档](https://doc.dcloud.net.cn/uni-app-x/component/live-player.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=21339>
  + Android平台、iOS平台 新增 组件 live-pusher 支持实时音视频录制 [文档](https://doc.dcloud.net.cn/uni-app-x/component/live-pusher.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=21340>
  + Android平台、iOS平台 新增 组件 ad 支持展示视频广告 [文档](https://doc.dcloud.net.cn/uni-app-x/component/ad.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=19926>
  + Android平台、iOS平台 新增 组件 web-view 支持 disable-user-select-menu 设置是否禁用文本选择时弹出系统菜单 [文档](https://doc.dcloud.net.cn/uni-app-x/component/web-view.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=21581>
  + Android平台、iOS平台 新增 API uni.onNetworkStatusChange 监听网络状态变化 [文档](https://doc.dcloud.net.cn/uni-app-x/api/network-status-change.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=20054>
  + Android平台、iOS平台 新增 API locationChange 支持 uni.onLocationChange、uni.startLocationUpdate、uni.startLocationUpdateBackground 等用于监听位置变化信息 [文档](https://doc.dcloud.net.cn/uni-app-x/api/location-change.html#onlocationchange) <https://issues.dcloud.net.cn/pages/issues/detail?id=16595>
  + Android平台、iOS平台 新增 原生SDK UniAppXSDK.start() 方法来启动应用 [文档](https://doc.dcloud.net.cn/uni-app-x/native/use/iosapi.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=18560>
  + Android平台、iOS平台 新增 CSS white-space 支持 pre、preLine、preWrap、breakSpaces 属性值 [文档](https://doc.dcloud.net.cn/uni-app-x/css/white-space.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=20454>
  + Android平台、iOS平台 修复 组件 canvas 使用 takeSnapshot 截图会存在默认背景色，无法截出背景透明图片 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20169)
  + Android平台、iOS平台 修复 API uni.uploadFile 不传 file 字段报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19511)
  + Android平台、iOS平台 修复 API uni.scanCode 相册选择图标可能被遮挡 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19121)
  + Android平台、iOS平台 修复 CSS 使用不支持的 @media css 规则控制台无告警，编译产物不符合预期 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19396)
  + Android平台、iOS平台 修复 DOM API CSSStyleDeclaration Android在 transitionend 中修改元素的属性会一直执行 transitionend 事件；iOS设置元素的高度为 auto时，元素看不到了 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19405)
  + 【重要】Android平台 适配 Google Play 要求应用支持 16KB 内存页面大小 [文档](https://doc.dcloud.net.cn/uni-app-x/tutorial/android-16kb.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=19117>
  + Android平台 新增 组件 camera 支持 photo-resolution 属性设置拍照图片分辨率 [文档](https://doc.dcloud.net.cn/uni-app-x/component/camera.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=20679>
  + Android平台 新增 API uni.request 补充 json解析类型失败的错误码 [文档](https://doc.dcloud.net.cn/uni-app-x/api/request.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=20329>
  + Android平台 新增 API uni.getLocation 更新 腾讯定位SDK 为 7.6.1.3 版 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-location.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=21586>
  + Android平台 新增 API uni.requestPayment 更新 支付宝SDK 为 15.8.38 版 [文档](https://doc.dcloud.net.cn/uni-app-x/api/request-payment.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=21576>
  + Android平台 新增 API push uni-push 支持 FCM [文档](https://doc.dcloud.net.cn/uni-app-x/api/uni-push.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=18885>
  + Android平台 新增 DOM API UniTextElement 支持 UniTextLayout 文本测量 [文档](https://doc.dcloud.net.cn/uni-app-x/dom/unitextelement.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=20365>
  + Android平台 修复 vue 通过type定义的带泛型的对象类型不支持响应式 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19971)
  + Android平台 修复 vue defineProps传入复杂嵌套type类型编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21325)
  + Android平台 修复 组件 scroll-view 嵌套 textarea 组件后无法滚动 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15280)
  + Android平台 修复 组件 nested-scroll-body 存在动态加载元素时滚动视图可能会自动滚动 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19617)
  + Android平台 修复 组件 waterflow load-more 插槽显示异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20342)
  + Android平台 修复 组件 share-element 中 swiper 组件 circular 设置为 true 时无共享元素效果 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19506)
  + Android平台 修复 组件 input maxlength 属性首次渲染时无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7709)
  + Android平台 修复 组件 input 光标移动异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11324)
  + Android平台 修复 组件 input auto-focus 与 focus 属性冲突时效果异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16717)
  + Android平台 修复 组件 input v-model.number 时无法正确清空内容问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19584)
  + Android平台 修复 组件 input v-model.number 输入小数点后非预期补零问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19585)
  + Android平台 修复 组件 input 使用v-model的同时绑定一个无参input函数编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19799)
  + Android平台 修复 组件 video 在安卓7设备播放 webm 视频没有背景音乐 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=9856)
  + Android平台 修复 组件 video 自动播放结束后中间会出现一个刷新的图标 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14227)
  + Android平台 修复 组件 camera 组件滑动时渲染异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20436)
  + Android平台 修复 API uni.showModal 成功回调中调用 uni.navigateBack 报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19068)
  + Android平台 修复 API uni.uploadFile 增加 User-Agent 请求头无法覆盖默认值 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19825)
  + Android平台 修复 API uni.getSystemInfoSync 返回的 appLanguage 值无法区分繁简 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18926)
  + Android平台 修复 API uni.getClipboardData 在页面生命周期 onShow 中可能无法获取数据 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19482&ask_id=211227)
  + Android平台 修复 API uni.scanCode 扫码有概率发生闪退 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19093)
  + Android平台 修复 API uni.scanCode 部分设备多码选择画面异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19573)
  + Android平台 修复 API uni.getRecorderManager 生成的 WAV 格式文件大小不对 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20035)
  + Android平台 修复 API uni.getFileSystemManager 调用 getFileInfo 传入 uni.chooseFile 返回的地址无法获取文件信息 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19993)
  + Android平台 修复 API uni.getFileSystemManager 复制大文件报内存超限的错误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20265)
  + Android平台 修复 API uni.getFileSystemManager 调用 open 打开项目中 static 目录下的文件报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21074)
  + Android平台 修复 4.25版本引发的 API uni.getLocation 缺失权限时报错信息不准确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19257)
  + Android平台 修复 API uni.createPushMessage 部分情况点击推送消息无法拉起App [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20088)
  + Android平台 修复 API uni.createCameraContext takePhoto 时间过长 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20512)
  + Android平台 修复 CSS vue style 中直接定义 css 变量导致应用编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20359)
  + Android平台 修复 CSS overflow 设置为 visible 时事件分发异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8932)
  + Android平台 修复 CSS text-shadow 设置为 rgb 颜色时可能不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21125)
  + Android平台 修复 CSS var自定义变量 设置 border-style 从 solid 切换为 dashed 时颜色不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20488)
  + Android平台 修复 运行调试 自定义基座真机运行调用uts插件可能抛 stub 异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19968)
  + iOS平台 新增 API uni.setInnerAudioOption 支持配置音频是否可与其他音频混播 [文档](https://doc.dcloud.net.cn/uni-app-x/api/create-inner-audio-context.html#setinneraudiooption) <https://issues.dcloud.net.cn/pages/issues/detail?id=19401>
  + iOS平台 新增 API uni.getUniVerifyManager 更新 个验SDK 为3.1.1.0 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-univerify-manager.html#getuniverifymanager) <https://issues.dcloud.net.cn/pages/issues/detail?id=21559>
  + iOS平台 新增 API uni.getDeviceInfo 返回的 deviceModel 支持 iPhone 17、iPhone 17 Pro、iPhone17ProMax、iPhoneAir 等设备型号 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-device-info.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=22381>
  + iOS平台 新增 DOM API UniElement 元素暴露 click 方法 [文档](https://doc.dcloud.net.cn/uni-app-x/dom/unielement.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=20824>
  + iOS平台 修复 4.75版本引发的 manifest.json 设置defaultAppTheme以及uniStatistics可能无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20575)
  + iOS平台 修复 组件 view 默认的view没触发touch导致input的键盘无法收起 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19504)
  + iOS平台 修复 组件 swiper 组件circular=true时往左第一次不执行change事件 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19208)
  + iOS平台 修复 4.71版本引发的 组件 waterflow 通过 v-if 切换闪退 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21415)
  + iOS平台 修复 组件 button 组件无法设置字体颜色 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19317)
  + iOS平台 修复 4.55版本引发的 组件 button 取消自定义button style后，button无法恢复默认样式 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20523)
  + iOS平台 修复 组件 slider 更新slider阴影效果，和其他端保持一致 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21533)
  + iOS平台 修复 组件 video 开启静音且将音量设置为0，进入视频播放页播放视频此时调整声音视频声音也不会出来 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20750)
  + iOS平台 修复 组件 video 在 iOS15 及以上系统播放时静音，开始播放后无法通过音量键调大音量 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2860)
  + iOS平台 修复 组件 canvas 样式opacity设为0时takeSnapshot函数截屏空白 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20294)
  + iOS平台 修复 组件 web-view ios端，webview的网页中如果给iframe设置了链接，则uni向 webview发送消息就会收不到 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19858)
  + iOS平台 修复 组件 web-view webview里的loading事件，经过测试发现在ios上会多次触发 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20090)
  + iOS平台 修复 组件 input 在 scrollView 中获取焦点弹起键盘遮挡输入框时，点击 webview 自动收起键盘后界面异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21902)
  + iOS平台 修复 API uni.setTabBarItem 在pages.json中tabBar.list的item设置visible=false，在ios中动态调用uni.setTabBarItem({index:0,visible:ture})显示空白但有占位，安卓端正常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20388)
  + iOS平台 修复 4.72版本引发的 API uni.pageScrollTo 设置相同值时只会执行一次 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20664)
  + iOS平台 修复 4.71版本引发的 API uni.request onChunkReceived 导致的偶发crash [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20476)
  + iOS平台 修复 API uni.previewImage 设置current不生效，不管填入的是几，都从第一个开始预览 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20411)
  + iOS平台 修复 API push uni-push 后台服务器故障排查中点击`一键检测`引起应用闪退 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16228)
  + iOS平台 修复 API uni.createPushMessage createPushMessage创建的通知点击异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16230)
  + iOS平台 修复 4.76版本引发的 CSS position fixed 可能不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21144)
  + iOS平台 修复 CSS border 给 scroll-view 设置 border ios 样式存在问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18797)
  + iOS平台 修复 CSS text-shadow 使用 rgb/rgba 色值无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16989)
  + iOS平台 修复 4.71版本引发的 CSS var自定义变量 默认值缺省时样式不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20486)
  + iOS平台 修复 DOM API UniElement takeSnapshot 对 web-view 组件截图时会出现页面回滚至顶端的现象 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19449)
  + iOS平台 修复 DOM API UniElement takeSnapshot 方法不触发 complete 回调 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21138)
  + iOS平台 修复 4.61版本引发的 发行 IOS云打包的APP，无法读取static目录下文件内容 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20141)
  + 鸿蒙平台 新增 组件 waterflow 支持waterflow及flow-item组件 [文档](https://doc.dcloud.net.cn/uni-app-x/component/waterflow.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=20812>
  + 鸿蒙平台 新增 组件 switch 支持 disable 样式 [文档](https://doc.dcloud.net.cn/uni-app-x/component/switch.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=21521>
  + 鸿蒙平台 新增 API 启动 获取应用启动参数 [文档](https://doc.dcloud.net.cn/uni-app-x/api/launch.html#getlaunchoptionssync) <https://issues.dcloud.net.cn/pages/issues/detail?id=19242>
  + 鸿蒙平台 新增 API uni.login 支持微信登录 [文档](https://doc.dcloud.net.cn/uni-app-x/api/sign-in.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=20344>
  + 鸿蒙平台 新增 API uni.share 支持微信分享 [文档](https://doc.dcloud.net.cn/uni-app-x/api/share.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=20343>
  + 鸿蒙平台 新增 DOM API UniElement .focus、UniElement.blur 方法 [文档](https://doc.dcloud.net.cn/uni-app-x/dom/unielement.html#focus) <https://issues.dcloud.net.cn/pages/issues/detail?id=20940>
  + 鸿蒙平台 新增 uni统计 for uni-app x [文档](https://uniapp.dcloud.net.cn/uni-stat-uniappx.html)
  + 鸿蒙平台 修复 组件 Touch 事件 鸿蒙长按返回上一页如果不及时松开手指松开手指的时候会退出app [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19300)
  + 鸿蒙平台 修复 组件 swiper 设置 :disable-touch="true" 无法禁止滑动问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20820)
  + 鸿蒙平台 修复 组件 list-view list-item组件包含自动高度的image时image组件位置错乱 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20688)
  + 鸿蒙平台 修复 组件 image 不支持unifile://协议路径 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20701)
  + 鸿蒙平台 修复 组件 video 在平板上小窗全屏/非全屏切换时宽度不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19935)
  + 鸿蒙平台 修复 组件 video 在 dialogPage 中全屏状态不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21359&ask_id=209965)
  + 鸿蒙平台 修复 组件 web-view 鸿蒙应用访问页面始终为 pc 模式 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21311)
  + 鸿蒙平台 修复 组件 web-view onLoading 在页面加载时触发多次 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21762)
  + 鸿蒙平台 修复 鸿蒙上架检查，报应用在运行中出现JsCrash异常，存在设备运行崩溃问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20697&ask_id=202068)
  + 鸿蒙平台 修复 API uni.chooseImage 选择 gif 图片并且不勾选原图后不显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19771&ask_id=211396)
  + 鸿蒙平台 修复 API uni.compressImage 压缩的图片会变形 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20928)
  + 鸿蒙平台 修复 API uni.chooseMedia 鸿蒙从相册或者拍摄选择视频时不进入回调的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18478)
  + 鸿蒙平台 修复 API uni.getPushClientId 鸿蒙系统无法获取cid [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18024)
  + 鸿蒙平台 修复 CSS background 动态 class 切换渐变背景色, 渐变背景色无法移除 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19037)
  + 鸿蒙平台 修复 CSS color 使用iconfont时，切换颜色无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20693)
  + 鸿蒙平台 修复 CSS color 概率性样式丢失 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20914)
  + 鸿蒙平台 修复 CSS box-shadow 属性值 rgba 中存在空格时，样式异常问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19558)
  + 鸿蒙平台 修复 CSS pointer-events 父组件设置pointer-events: none对子组件不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20923)
  + 鸿蒙平台 修复 DOM API UniElement .animate iterations 设置为 Infinity 时动画只执行一次问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17615)
  + 鸿蒙平台 修复 DOM API UniElement .takeSnapshot 不触发 complete 回调问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20929)
  + 鸿蒙平台 修复 页面上存在多个 scroll-view 导致点击失效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19008)
  + 微信小程序平台 修复 CSS overflow 多子节点scoped slot额外添加的view有overflow:hidden样式导致内容不显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=21223)
  + 更新 uni-recycle-view 组件至2.0.0版本，滚动更流畅 [详情](https://ext.dcloud.net.cn/plugin?id=17385)
* 【uts插件】
  + 【重要】Android平台 升级 kotlin 版本升级2.2.0。其自身存在向下兼容问题需要注意 [文档](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-for-android.html#kotlin2-%E5%8D%87%E7%BA%A7%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9) <https://issues.dcloud.net.cn/pages/issues/detail?id=20278>
  + Web平台、iOS平台、微信小程序平台 修复 对象属性中如果包含??导致对象类型变更为object，无法使用getString等属性 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20323)
  + Android平台、iOS平台 修复 字符串或模板字符串部分字符编译失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19131)
  + Android平台、iOS平台 修复 4.75版本引发的 type类型嵌套部分情况下编译失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20724)
  + Android平台 修复 安卓端  | 和 >>> 运算符 在部分场景下与web不一致的问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17838)
  + Android平台 修复 使用符号.作为key会引发无法获取值 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19443)
  + Android平台 修复 watch方法中包含的async方法抛出的异常信息不够准确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19436)
  + Android平台 修复 4.61版本引发的 在 uni-app 项目中 uts插件调用 uni.showModal 不展示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19773)
  + iOS平台 新增 重构正则引擎，解决部分正则表达式与web表现不一致的问题 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/regexp.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=21001>
  + iOS平台 新增 支持 currentThreadContext 获取当前线程信息、executeOnThread 指定线程执行任务和指定 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/utsios.html#utsios) <https://issues.dcloud.net.cn/pages/issues/detail?id=20466>
  + iOS平台 修复 插件依赖的 pod 库包含 PrivacyInfo.xcprivacy 文件时云端打包失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20585)
  + iOS平台 修复 4.64版本引发的 atob 方法未兼容 base64 url 格式字符串 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20222)
  + 鸿蒙平台 新增 支持uts付费插件 [文档](https://uniapp.dcloud.net.cn/plugin/publish.html#uts) <https://issues.dcloud.net.cn/pages/issues/detail?id=21368>
  + 鸿蒙平台 修复 页面或组件内的对象字面量as为uts插件内导出的type时可选属性丢失 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20157)
* 【App插件(含5+App和uni-app的App端)】
  + 新增 uni-ad模块 国外广告 支持 AppLovin 渠道
  + 更新 uni-ad 腾讯优量汇SDK Android为 4.660.1530 版，iOS为 4.15.60 版；快手广告和快手内容联盟SDK Android为 4.9.20.1 版，iOS为 4.9.20.1 版；穿山甲&GroMore SDK Android为 7.1.3.2 版，iOS为 7.2.0.0 版；Sigmob广告联盟SDK Android为 4.24.7 版，iOS为 4.20.3 版；百度百青藤广告SDK iOS为 10.02 版；章鱼广告SDK Android为 2.5.10.5 版，iOS为 2.5.10.10 版；泛连广告SDK Android为 2.8.8 版，iOS为 2.8.8.0.0 版；华夏乐游SDK Android为 3.14.9 版，iOS为 2.16.0 版；AdScope倍孜广告SDK Android为 5.2.2.0 版；Google AdMob SDK Android 为 24.6.0 版，iOS 为 12.9.0 版；Mintegral SDK Android为 16.9.91.1 版；Pangle SDK Android为 7.6.0.3 版，iOS为 7.6.0.0 版；Unity SDK Android为 4.16.1 版，iOS为 4.16.0 版；Liftoff SDK Android为 7.5.1.0 版，iOS为 7.5.2 版；InMobi SDK Android为 10.8.7.1 版，iOS为 10.8.6 版；IronSource SDK Android为 9.0.0.0 版，iOS为 8.10.0 版；Meta SDK iOS为 6.20.1 版；Mintegral SDK iOS为 7.7.9 版；支持双十一预算
  + 【重要】Android平台 适配 Google Play 要求应用支持 16KB 内存页面大小 [详情](https://uniapp.dcloud.net.cn/tutorial/android-16kb.html)
  + 【重要】Android平台 适配 Android16系统，解决应用会被底部系统导航栏遮挡、返回事件不触发等问题
  + Android平台 更新 分享/登录模块使用的 QQ SDK 为 3.5.17.3 版；分享/支付模块使用的 支付宝 SDK 为 15.8.38 版；定位模块使用的 腾讯定位 SDK 为 7.6.1.3 版
  + Android平台 修复 UniPush 在部分高版本设备不会弹出通知权限的Bug
  + Android平台 修复 CPU类型包含 `x86_64` 时部分模块未适配支持 16KB 内存页面大小的Bug [详情](https://ask.dcloud.net.cn/question/214039)
  + iOS平台 更新 一键登录 依赖的个验 SDK 为 3.1.1.0 版，适配支持 iOS26
  + iOS平台 修复 视频播放 video 静音模式播放后调整音量依旧无声音的Bug [详情](https://ask.dcloud.net.cn/question/187736)
  + iOS平台 修复 同意隐私协议前获取IDFA标识导致弹出`跟踪App活动`授权框的Bug [文档](https://uniapp.dcloud.net.cn/tutorial/app-ios-idfa.html#privacyregistermode)
  + 鸿蒙平台 修复 页面使用`import *`引用 uts 插件时报错的问题 [详情](https://ask.dcloud.net.cn/question/213916)
* 【uniCloud】
  + 新增 uni 直播 [文档](https://doc.dcloud.net.cn/uniCloud/uni-live/intro.html)
  + 新增 JQL支持事务操作 [文档](https://doc.dcloud.net.cn/uniCloud/jql.html#transaction)
  + 新增 关联服务空间时服务空间列表增加筛选功能 [文档](https://doc.dcloud.net.cn/uniCloud/concepts/space.html)
  + 修复 uniCloud 前端网页托管打开右侧资源列表时，用户去开通前端网页托管后，点击刷新无反应 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20849)
  + 修复 关联支付宝云后运行到鸿蒙应用上传图片报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=20759)

#### 4.76.2025082103
* 【uni-app】
  + Web平台 修复 ssr 模式下未安装 vuex 发行报错的 Bug [详情](https://ask.dcloud.net.cn/question/209401)
  + Web平台 新增 API previewImage 支持点击 esc 关闭预览 [详情](https://ask.dcloud.net.cn/question/209551)
  + Web平台 修复 API showModal 设置 editable 为 true 时输入单行中文内容会出现滚动条的 Bug [详情](https://uniapp.dcloud.net.cn/api/ui/prompt.html#showmodal)
  + 小程序平台 修复 父组件只有空白template节点时子组件插槽默认内容不生效的 Bug [详情](https://ask.dcloud.net.cn/question/210538)
  + 小程序平台 修复 v-bind:hidden 动态绑定失效的 Bug [详情](https://ask.dcloud.net.cn/question/204902)
  + 小程序平台 修复 子组件 slot 有默认内容和 props 时父组件默认插槽不生效的 Bug [详情](https://ask.dcloud.net.cn/question/199966)
  + 小程序平台 修复 多个子包引用相同图片时 Vite 默认优化导致路径被合并的 Bug [详情](https://ask.dcloud.net.cn/question/194903)
  + 微信小程序平台 修复 设置 mergeVirtualHostAttributes: true 时 virtualHostHidden 为 undefined 导致根节点 v-show 或 hidden 失效的 Bug [详情](https://uniapp.dcloud.net.cn/collocation/manifest.html#mp-weixin)
  + 微信小程序平台 修复 manifest.json 中 watchOptions 配置未同步到 project.config.json 的 Bug [详情](https://ask.dcloud.net.cn/question/210856)
  + 微信小程序平台 修复 设置 mergeVirtualHostAttributes: true 时 virtualHostStyle 为 undefined 导致 style 属性异常的 Bug [详情](https://ask.dcloud.net.cn/question/197718)
  + 支付宝小程序平台 修复 manifest.json 设置 axmlStrictCheck、enableParallelLoader 等参数不生效的 Bug [详情](https://uniapp.dcloud.net.cn/collocation/manifest.html#mp-alipay)
  + 支付宝小程序平台 修复 捕获事件修饰符 .capture 编译不生效的 Bug [详情](https://ask.dcloud.net.cn/question/209386)
  + 支付宝小程序平台 新增 manifest.json 支持配置 format、pluginResolution、developOptions、compileOptions、uploadExclude和assetsInclude [详情](https://uniapp.dcloud.net.cn/collocation/manifest.html#mp-alipay)
  + 支付宝小程序平台 修复 mpaas-component组件 编译后属性丢失的bug [详情](https://ask.dcloud.net.cn/question/209649)
  + 支付宝小程序平台 新增 支持原生 root-portal 和 share-element 组件 [详情](https://opendocs.alipay.com/mini/04y2ya?pathHash=a4fa18ca)
  + 支付宝小程序平台 新增 API pageScrollTo 支持 duration 参数 [详情](https://ask.dcloud.net.cn/question/211717)
  + 小红书小程序平台 修复 group-chat-card组件 编译属性丢失的 Bug [详情](https://ask.dcloud.net.cn/question/209459)
  + 抖音小程序平台 移除 对 swiper 组件 disable-touch 属性的转化处理 [详情](https://ask.dcloud.net.cn/question/187024)
  + 抖音小程序平台 修复 shop-follow-card组件 编译属性丢失的 Bug [详情](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/industry-plugin/e-commerce-plugin/components/shopfollowcard)
  + 抖音小程序平台 新增 支持自定义私有配置 project.private.config.json 文件 [详情](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/dev-tools/developer-instrument/development-assistance/private-config)
  + 快手小程序平台 新增 支持自定义私有配置 project.private.config.json 文件 [详情](https://open.kuaishou.com/docs/develop/developerTools/Localization-project.html)
  + 京东小程序平台 修复 使用插件时，控制台报错的 Bug [详情](https://ask.dcloud.net.cn/question/212442)
  + App平台 修复 API createIntersectionObserver 无法监听组件根节点的 Bug [详情](https://ask.dcloud.net.cn/question/209795)
  + App平台 修复 API createInnerAudioContext 设置 sessionCategory 不生效的 Bug [详情](https://ask.dcloud.net.cn/question/209800)
  + Android平台 修复 部分设备网络请求报 TLSv1 协议不支持的Bug [详情](https://ask.dcloud.net.cn/question/210922)
  + 鸿蒙平台 修复 组件或页面内无法调用 uts 插件内类的静态方法的 Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19044)
* 【uni-app x】
  + iOS平台 更新 API uni.requestPayment 微信支付 使用的微信 SDK 为 2.0.5 版 [文档](https://doc.dcloud.net.cn/uni-app-x/api/request-payment.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=19870>
  + iOS平台 修复 pages.json tabBar 设置 text 内容为泰语显示异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16947)
  + iOS平台 修复 组件 input 通过 v-model 绑定变量更新 value 不触发 @change 事件 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19615)
  + iOS平台 修复 组件 textarea 添加 value 属性后 textAlign 不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19706)
  + iOS平台 修复 API uni.chooseImage 选择照片时弹出系统提示  是否选择更多照片 或者 保留当前所选内容 时，选择 保留当前所选内容 后再次点击+号添加更多图片引发崩溃 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19763)
  + iOS平台 修复 API uni.chooseMedia 点击“取消”按钮关闭正常触发 fail 回调，下拉手势关闭没有触发 fail 回调 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19026)
  + iOS平台 修复 API uni.getBackgroundAudioManager 背景音频播放结束事件 onEnded 回调中播放下一曲无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17691)
  + iOS平台 修复 4.71版本引发的 CSS 某些情况可能不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19746)
* 【App插件(含5+App和uni-app的App端)】
  + iOS平台 更新 微信SDK 为 2.0.5 版
* 【uniCloud】
  + 新增 扩展数据库事务支持批量更新和删除 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19497)
  + 新增 阿里云服务空间 getTempFileURL 支持获取私有文件URL [文档](https://doc.dcloud.net.cn/uniCloud/storage/dev.html#cloudgettempfileurl)
  + 修复 阿里云服务空间 JQL权限控制使用get方法报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19395&ask_id=210972)

#### 4.75.2025071105
* 【uni-app】
  + App平台 修复 vue2 上使用 uni.addInterceptor 拦截切换 tabbar 异常 的 Bug [详情](https://ask.dcloud.net.cn/question/147649)
  + App平台 修复使用 createMapContext 相关方法失效的 Bug [详情](https://ask.dcloud.net.cn/question/209825)
  + App平台 修复 vue3 cli 项目 nvue 页面可能编译失败的Bug [详情](https://ask.dcloud.net.cn/question/210084)
  + Android平台 修复 pages.json 配置 tabBar 的 midButton 值为空时提交云端打包后启动应用可能无法进入首页的Bug
  + 鸿蒙平台 修复 组件或页面内无法调用 uts 插件内类的静态方法的 Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19044)
  + 鸿蒙平台 修复 previewImage 关闭之后无法重新打开的 Bug
  + 鸿蒙平台 修复 showLoading 使用返回侧滑无法关闭的 Bug
  + 鸿蒙平台 修复 swiper 内使用 v-if 切换时显示异常的 Bug
  + 鸿蒙平台 修复 service层使用Proxy包裹的数组传递到原生层时内容丢失的 Bug
  + 鸿蒙平台 修复 web-view 组件设置 margin-top 时内部点击坐标偏移 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17581)
  + 鸿蒙平台 修复 使用 crypto.getRandomValues 报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18438)
  + Web平台、小程序平台 修复 编译器 main.js文件最后一行是单行注释时应用启动白屏 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18520)
  + Web平台 修复 showToast 中 title 为英文短句时单词拆分异常的问题 [详情](https://ask.dcloud.net.cn/question/297992)
  + Web平台 修复 vue3 项目 pages.json 内设置disableScroll后仍可滑动页面且控制台会报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17831)
  + 支付宝小程序 修复 pages.json 中 tabBar 设置 overlay 编译丢失的问题 [详情](https://ask.dcloud.net.cn/question/206278)
  + 修复 vue2 button,switch,radio,checkbox 等内置组件设置 id 属性无效的问题 [详情](https://ask.dcloud.net.cn/question/170515)
* 【uni-app x】
  + 新增 vue 支持页面作为组件渲染。可用于宽屏、折叠屏适配 [文档](https://doc.dcloud.net.cn/uni-app-x/page.html#page-as-component) <https://issues.dcloud.net.cn/pages/issues/detail?id=16777>
  + 新增 vue 支持通过props接收页面参数 [文档](https://doc.dcloud.net.cn/uni-app-x/page.html#page-with-props) <https://issues.dcloud.net.cn/pages/issues/detail?id=16881>
  + 修复 vue `<template>`中不能直接访问uni.env [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17184)
  + 新增 API 支持uniCloud.SSEChannel [文档](https://doc.dcloud.net.cn/uni-app-x/api/unicloud/sse-channel.html)
  + Web平台、App平台 新增 API uni.request RequestTask 支持 onHeadersReceived、onChunkReceived 等方法。可通过POST请求AI大模型并流式接受返回 [文档](https://doc.dcloud.net.cn/uni-app-x/api/request.html#onchunkreceived) <https://issues.dcloud.net.cn/pages/issues/detail?id=17392>
  + Web平台、Android平台 修复 API dialogPage .route 路径格式错误问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18727)
  + Web平台、小程序平台 修复 编译器 main.uts文件最后一行是单行注释时应用启动白屏 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18520)
  + Web平台、App平台 修复 4.51版本引发的 API actionSheet 非用户交互 actionSheet 导致 actionSheet 关闭时不触发 fail 回调 [文档](https://doc.dcloud.net.cn/uni-app-x/api/action-sheet.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=17394>
  + Web平台、App平台 优化 API uni.showModal content内容超长时不再截断而是滚动显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17661)
  + Web平台、iOS平台、鸿蒙平台、微信小程序平台 修复 发行 v-model 指定参数类型时编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16688)
  + Web平台、iOS平台、鸿蒙平台 修复 API uni.openDialogPage url 参数使用相对路径时报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18736)
  + Web平台、鸿蒙平台、微信小程序平台 新增 UniPage API 支持 width、height、statusBarHeight 等属性 [文档](https://doc.dcloud.net.cn/uni-app-x/api/unipage.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=16957>
  + Web平台 修复 4.31版本引发的 编译器 hmr时可能导致应用报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17355)
  + Web平台 修复 pages.json 内设置disableScroll后仍可滑动页面且控制台会报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17831)
  + Web平台 新增 组件 progress 组件支持 strokeWidth 设置为rpx [文档](https://doc.dcloud.net.cn/uni-app-x/component/progress.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=17740>
  + Web平台 新增 组件 web-view 组件支持load事件 [文档](https://doc.dcloud.net.cn/uni-app-x/component/web-view.html#web-view) <https://issues.dcloud.net.cn/pages/issues/detail?id=17560>
  + Web平台 修复 组件 list-view 页面返回到包含list-view的页面时list-view无法保持之前的滚动位置 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16938)
  + Web平台 修复 组件 textarea auto-height优先级低于样式设置的高度 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18489)
  + App平台 新增 组件 input type 属性支持 none/search/email/url 等类型 [文档](https://doc.dcloud.net.cn/uni-app-x/component/input.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=16245>
  + App平台 新增 组件 textarea change 事件 [文档](https://doc.dcloud.net.cn/uni-app-x/component/textarea.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=16614>
  + App平台 新增 API uni.createWebviewContext 支持 loadData 方法设置字符串来显示网页 [文档](https://doc.dcloud.net.cn/uni-app-x/api/create-webview-context.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=17251>
  + App平台 调整 API uni.getFileSystemManager 统一 stat、saveFile、getSavedFileList、rmdir、copyFile 实现细节 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-file-system-manager.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=17279>
  + 【重要】App平台 新增 CSS 支持自定义变量 [文档](https://doc.dcloud.net.cn/uni-app-x/css/common/function.html#customvar) <https://issues.dcloud.net.cn/pages/issues/detail?id=17083>
  + App平台 调整 组件 rich-text 使用 web-view 组件重构，解决各平台差异。Android平台支持mode选项 [文档](https://doc.dcloud.net.cn/uni-app-x/component/rich-text.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=16884>
  + Android平台、iOS平台 新增 组件 textarea 组件支持@confirm [文档](https://doc.dcloud.net.cn/uni-app-x/component/textarea.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=16642>
  + Android平台、iOS平台 新增 组件 camera 支持 mode 属性，支持扫码 [文档](https://doc.dcloud.net.cn/uni-app-x/component/camera.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=17663>
  + Android平台、iOS平台 新增 API uni.scanCode 支持扫码 [文档](https://doc.dcloud.net.cn/uni-app-x/api/scan-code.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=15407>
  + Android平台、iOS平台 新增 API uni.hideKeyboard、uni.onKeyboardHeightChange、uni.offKeyboardHeightChange 操作软键盘 [文档](https://doc.dcloud.net.cn/uni-app-x/api/keyboard.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=16200>
  + Android平台、iOS平台 新增 API uni.getClipboardData/uni.setClipboardData 读写系统剪贴板 [文档](https://doc.dcloud.net.cn/uni-app-x/api/clipboard.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=16591>
  + Android平台、iOS平台 新增 API uni.getBackgroundAudioManager 支持 cache 属性控制音频播放是否缓存到本地 [文档](https://doc.dcloud.net.cn/uni-app-x/api/create-inner-audio-context.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=16840>
  + Android平台、iOS平台 新增 API uni.openDocument 打开文档 [文档](https://doc.dcloud.net.cn/uni-app-x/api/open-document.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=16593>
  + Android平台、iOS平台 修复 组件 canvas 的 context 对象画线部分函数存在内存泄漏导致应用崩溃 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17253)
  + Android平台、iOS平台 新增 支持安全网络 [文档](https://doc.dcloud.net.cn/uni-app-x/api/unicloud/function.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=18154>
  + Android平台、鸿蒙平台 新增 组件 match-media 安卓和鸿蒙平台支持 match-media 组件 [文档](https://doc.dcloud.net.cn/uni-app-x/component/match-media.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=18227>
  + Android平台、iOS平台 修复 API uni.createInnerAudioContext 与微信小程序平台 音频、背景音频 播放细节存在的差异 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18479)
  + Android平台 新增 组件 textarea confirm-type 属性支持send/search/next/go/done类型 [文档](https://doc.dcloud.net.cn/uni-app-x/component/textarea.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=18616>
  + Android平台 新增 API uni.createInnerAudioContext uni.setInnerAudioOption 支持配置音频能否与其他音频混播 [文档](https://doc.dcloud.net.cn/uni-app-x/api/set-inner-audio-option.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=15042>
  + Android平台 修复 编译器 使用`<script setup>`时template中的错误部分情况无法正确回源 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18546)
  + Android平台 修复 vue 响应式数组indexOf、lastIndexOf、includes方法部分情况返回值不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18527)
  + Android平台 修复 vue 响应式数组调用sort方法后不触发依赖收集 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18263)
  + Android平台 修复 vue app.use省略插件可选参数时运行报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15663)
  + Android平台 修复 vue 在函数里面返回计算属性会报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16559)
  + Android平台 修复 vue 组合式部分情况下类型推断不准确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17213)
  + Android平台 修复 组件 text 嵌套 text 子组件时行高可能不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7529)
  + Android平台 修复 组件 text 文本中存在换行符“\n”时 white-space 设置为 nowrap 效果与web平台不一致 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18612)
  + Android平台 修复 组件 button 组件 设置居中可能不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1957)
  + Android平台 修复 组件 input keyboardheightchange 事件回调中返回的软键盘高度不准确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18750)
  + Android平台 修复 组件 input 点击收起键盘时，被点击的组件点击事件无法响应 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18795)
  + Android平台 修复 组件 textarea focus 事件返回的键盘高度异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16996)
  + Android平台 修复 组件 video 组件竖屏全屏时自定义子组件无法正确显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18076)
  + Android平台 修复 组件 video 竖屏方向进入全屏时 fullscreenchange 事件返回的 direction 属性值仍为 horizontal [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18561)
  + Android平台 修复 组件 view 切换如果有视频在里面，只能截视频其它层截不出来 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17456)
  + Android平台 修复 4.51版本引发的 组件 swiper autoplay = true 且 设置了duration 动画时长，且元素个数为2时会出现一张空白的轮播图 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15860)
  + Android平台 修复 4.51版本引发的 组件 swiper current 值使用计算属性时不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16302)
  + Android平台 修复 组件 text 嵌套 text 可能出现闪退 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18770)
  + Android平台 修复 4.61版本引发的 CSS transition 动态修改style执行动画可能闪烁 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18799) [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18799)
  + Android平台 修复 组件 list-view 设置 refresher-enabled 为 false 导致嵌套滚动失效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17635)
  + Android平台 修复 组件 waterflow 瀑布流设置为 1 列无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16826)
  + Android平台 修复 组件 sticky-section 下 list-item 通过 DOM API 修改 style 高度后不更新 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17982)
  + Android平台 修复 组件 image 未支持 uni.env 目录图片地址 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17288)
  + Android平台 修复 组件 camera 多个页面使用 camera 组件，返回上一页面时 camera 组件黑屏 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17760)
  + Android平台 修复 组件 camera 在部分设备拍照会旋转 90° [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18429)
  + Android平台 修复 组件 web-view 在部分低版本设备上获取内容高度不准确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18463)
  + Android平台 修复 API uni.getBackgroundAudioManager 可能会重复下载音乐封面图 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19233)
  + Android平台 修复 API dialogPage tabBar 页面 showDialogPage，切换 tabBar 后 dialogPage 无法关闭 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16059)
  + Android平台 修复 API dialogPage 中 textarea 组件 keyboardheightchange 事件返回的键盘弹出高度错误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16513)
  + Android平台 修复 API uni.showToast 自定义 image 正式打包模式下无法展示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18597)
  + Android平台 修复 API uni.scanCode 部分设备闪退 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18488)
  + Android平台 修复 API uni.saveVideoToPhotosAlbum 在部分设备上保存同一个文件几十次可能会失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18861)
  + Android平台 修复 API uni.getBackgroundAudioManager 在Android 13 设备上播放结束再次调用 play 报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18804)
  + Android平台 修复 API modal 隐藏系统底部导航栏后调用 uni.showModal/uni.showActionSheet 会显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15498)
  + Android平台 修复 4.61版本引发的 API uni.showModal 部分场景不能正常弹窗 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17002)
  + Android平台 修复 API uni.getRecorderManager 设置 duration 后调用 stop 函数后会继续触发 onStop 回调 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16923)
  + Android平台 修复 API uni.getRecorderManager 应用关闭麦克风权限还能继续录音 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17045)
  + Android平台 修复 API uni.getRecorderManager onStop 回调不返回任何内容 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17713)
  + Android平台 修复 CSS width 父级设置横向居中，子text定位absolute时宽度受限 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11847)
  + Android平台 修复 CSS overflow 设置为 visible 同时设置 box-shadow 后子元素可能被裁剪 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18136)
  + Android平台 修复 CSS box-shadow 多次触发渲染导致显示尺寸不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18383)
  + Android平台 修复 4.61版本引发的 CSS text 部分机型无法触发 click 事件 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17347)
  + Android平台 修复 DOM API UniElement requestFullscreen 在fixed定位时异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18539)
  + Android平台 修复 DOM API UniElement 安卓使用animation会报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17858)
  + iOS平台 鸿蒙平台 修复 编译器 发行时依赖的js文件内使用的api没有自动添加对应的模块 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17561)
  + iOS平台 更新 API uni.requestPayment 更新支付宝SDK为 15.8.32.5 版 [文档](https://doc.dcloud.net.cn/uni-app-x/api/request-payment.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=17401>
  + iOS平台 修复 组件 video 播放 m3u8 大部分情况没有声音 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17292)
  + iOS平台 修复 组件 text 嵌套显示多行文本时 line-height 样式不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18068)
  + iOS平台 修复 组件 picker-view 切换展示时立即修改数据会引起应用闪退 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18747)
  + iOS平台 修复 组件 view 系统语言设置为土耳其语时 view、image 标签提示不存在 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18046)
  + iOS平台 修复 组件 swiper 在某些场景展示的内容与 current 不匹配 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17321)
  + iOS平台 修复 4.64版本引发的 组件 list-view 高度动态变化时新插入的 list-item 不显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17030)
  + iOS平台 修复 组件 web-view 加载网络地址页面时加载进度条高度太高 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18027)
  + iOS平台 修复 4.18版本引发的 API pullDownRefresh 页面级下拉刷新雪花状指示器颜色没有适配 app 主题色 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18637)
  + iOS平台 修复 API uni.getSystemSetting 在系统开启了蓝牙的情况获取 bluetoothEnabled 值为 false [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18063)
  + iOS平台 修复 4.61版本引发的 API uni.getFileSystemManager readFile 和 readFileSync 方法参数 encoding 为 base64 时编码错误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18802)
  + iOS平台 修复 API uni.navigateBack 返回页面过渡动画不自然，会闪一下 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17941)
  + iOS平台 修复 API uni.startPullDownRefresh 自定义导航栏和页面级下拉刷新共存时页面显示错乱 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17605)
  + iOS平台 修复 CSS border-color 某些情况下 borderColor 传入特殊字符会导致边框变成白色 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18877)
  + iOS平台 修复 CSS border 某些场景边框可能被裁剪 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17109)
  + 鸿蒙平台 优化 DOM 节点创建速度、样式应用速度
  + 【重要】鸿蒙平台 新增 发行 原生SDK 鸿蒙版。可用于原生应用集成 [文档](https://doc.dcloud.net.cn/uni-app-x/native/use/harmony.html)
  + 鸿蒙平台 新增 app.uvue 支持 onExit 生命周期 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/app.html#onexit) <https://issues.dcloud.net.cn/pages/issues/detail?id=17508>
  + 鸿蒙平台 新增 原生鸿蒙工程和uni-app x工程联调 [文档](https://doc.dcloud.net.cn/uni-app-x/native/debug/harmony.html)
  + 鸿蒙平台 新增 支持运行到 2in1 设备，包括鸿蒙PC版
  + 鸿蒙平台 新增 组件 sticky-header 支持吸顶组件 sticky-header [文档](https://doc.dcloud.net.cn/uni-app-x/component/sticky-header.html)
  + 鸿蒙平台 新增 组件 sticky-section 支持吸顶组件 sticky-section [文档](https://doc.dcloud.net.cn/uni-app-x/component/sticky-section.html)
  + 鸿蒙平台 新增 组件 label [文档](https://doc.dcloud.net.cn/uni-app-x/component/label.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=18229>
  + 鸿蒙平台 新增 组件 swiper 子元素 touchstart touchmove 中 preventDefault 时，可以阻止 swiper 滑动行为 [文档](https://doc.dcloud.net.cn/uni-app-x/component/swiper.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=17097>
  + 鸿蒙平台 新增 组件 input adjust-position: true 且在滚动容器内，弹出软键盘时优先滚动该容器使 input 可见 [文档](https://doc.dcloud.net.cn/uni-app-x/component/input.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=17212>
  + 鸿蒙平台 新增 组件 textarea 支持 auto-height 属性 和 linechange 事件 [文档](https://doc.dcloud.net.cn/uni-app-x/component/textarea.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=16896>
  + 鸿蒙平台 新增 组件 textarea adjust-position: true 且在滚动容器内，弹出软键盘时优先滚动该容器使 textarea 可见 [文档](https://doc.dcloud.net.cn/uni-app-x/component/textarea.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=17211>
  + 鸿蒙平台 新增 支持 onLastPageBackPress 生命周期和 uni.exit 接口 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/app.html#onlastpagebackpress) <https://issues.dcloud.net.cn/pages/issues/detail?id=17825>
  + 鸿蒙平台 修复 组件 web-view 没有给定默认高度的 Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19014)
  + 鸿蒙平台 修复 组件 rich-text 当内容包含 "#" 时，"#" 后内容不解析的 Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=19320)
  + 鸿蒙平台 修复 组件 view 的 hover-start-time 属性无效问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17466)
  + 鸿蒙平台 修复 组件 list-view scrollIntoView部分情况下不能滚动到指定位置 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17121)
  + 鸿蒙平台 修复 组件 list-view 滚动组件设置scrollIntoView时实际滚动位置不准确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17517)
  + 鸿蒙平台 修复 组件 list-view 在初始化后不进行任何操作获取到的scrollHeight为0 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18575)
  + 鸿蒙平台 修复 组件 input keyboardheightchange 某些情况下未触发 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16976)
  + 鸿蒙平台 修复 组件 input placeholder-class 空字符串时白屏 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17315)
  + 鸿蒙平台 修复 组件 input password=true 某些情况下无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17580)
  + 鸿蒙平台 修复 组件 scroll-view 直接设置scrollTop部分情况下不会触发onscrollend [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18587)
  + 鸿蒙平台 修复 组件 textarea adjust-position 某些情况表现异常问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16908)
  + 鸿蒙平台 修复 组件 textarea 某些情况高度不符合预期 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16942)
  + 鸿蒙平台 修复 组件 textarea keyboardheightchange 某些情况下未触发 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16977)
  + 鸿蒙平台 修复 JSON.parse 传入多层嵌套数组时数组内部对象未转为 UTSJSONObject [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18541)
  + 鸿蒙平台 新增 API themeChange 支持主题切换 [文档](https://doc.dcloud.net.cn/uni-app-x/api/theme-change.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=18011>
  + 鸿蒙平台 新增 API uni.getUniverifyManager 支持 customLogin [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-univerify-manager.html#customlogin) <https://issues.dcloud.net.cn/pages/issues/detail?id=17811>
  + 鸿蒙平台 修复 API uni.loadFontFace 在 app.uvue 中调用不生效 [文档](https://doc.dcloud.net.cn/uni-app-x/api/load-font-face.html#%E5%8F%82%E6%95%B0) <https://issues.dcloud.net.cn/pages/issues/detail?id=17338>
  + 鸿蒙平台 修复 API getCurrentPages getPageStyle未包含默认值 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17518)
  + 鸿蒙平台 修复 UniPage API 实例在onReady时获取不到正确的pageBody、safeAreaInsets [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17514)
  + 微信小程序平台 新增 UniPage API 支持 pageBody、safeAreaInsets属性 [文档](https://doc.dcloud.net.cn/uni-app-x/api/unipage.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=16961>
  + 【重要】新增 uni-ai-x 开源、全平台、原生、云端一体的AI聊天插件，方便App中引入AI能力 [详情](https://ext.dcloud.net.cn/plugin?name=uni-ai-x)
* 【uts插件】
  + Web平台、iOS平台、鸿蒙平台、微信小程序平台 修复 编译为js时部分情况下对象未转化为UTSJSONObject [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17197)
  + Web平台、微信小程序平台 修复 uts 文件加密后编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6996)
  + Android平台、iOS平台 修复 type联合类型在interface和class中编译结果不一致 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17241)
  + Android平台、iOS平台 修复 变量判断非空后，后续使用仍需强制非空或可选链 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17771)
  + Android平台、iOS平台 修复 interface中定义可为空属性类型为方法时缺少括号 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17249)
  + Android平台、iOS平台 修复 浮点数字面量位运算编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17847)
  + Android平台、iOS平台 修复 for循环中部分continue用法运行时死循环 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17519)
  + Android平台 新增 Date 重构优化性能，并补齐 toLocaleString、toUTCString、getUTCMonth、valueOf 等方法 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/date.html#date) <https://issues.dcloud.net.cn/pages/issues/detail?id=17272>
  + Android平台 新增 UniActivityLifeCycleCallback 的方法中 UniActivityParams 类型参数支持 activity 属性 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/utsactivitycallback.html#uniactivitylifecyclecallback) <https://issues.dcloud.net.cn/pages/issues/detail?id=16876>
  + Android平台 新增 UTSAndroid.getKotlinClass [文档](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=17252>
  + App平台 修复 vue 使用 ::v-deep 深度选择器控制台告警 [文档](https://issues.dcloud.net.cn/pages/issues/detail?id=18266)
  + Android平台 修复 UTS 部分正则表现与Web平台不一致的问题，项目中使用的`PCRE`风格正则表达式需调整为标准`ECMAScript`正则表达式 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/regexp.html#regexp) <https://issues.dcloud.net.cn/pages/issues/detail?id=16951>
  + Android平台 修复 可选链部分情况下包含索引访问时编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18549)
  + Android平台 修复 静态属性内定义的局部class不能被继承 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16899)
  + Android平台 修复 部分情况下 class 构造器定义的参数属性没有正确补充 override 修饰符 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16901)
  + Android平台 修复 UTSJSONObject多层嵌套时访问外部this作用域编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16690)
  + Android平台 修复 UInt8Array/UInt16Array 迭代异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16496)
  + Android平台 修复 for of 遍历 UInt8Array 获得的数字与web 不一致 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18121)
  + Android平台 修复 setTimeout 必须要指定 时间参数 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16768)
  + iOS平台、鸿蒙平台 新增 支持 TextDecoder、TextEncoder [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/textdecoder.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=17905>
  + iOS平台 修复 导出函数参数中存在多层 Object 嵌套且属性 callback 时不能正常触发回调 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17151)
  + iOS平台 修复 instanceof 无法直接判断带泛型的类型 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17289)
  + iOS平台 修复 RegExp 某些场景下的 lastIndex 值错误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=18242)
  + 鸿蒙平台 修复 当class中使用与内部属性同名的外部变量时编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17909)
* 【App插件(含5+App和uni-app的App端)】
  + iOS平台 新增 支持配置嵌入 Watch App  [文档](https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-ios.html#watchapp)
* 【【UniMPSDK】】
  + Android平台 修复 宿主为 uni-app 时开启防重签功能后打开uni小程序时会提示校验失败的Bug
* 【uniCloud】
  + 【重要】新增 扩展数据库MongoDB版。解决serverless云数据库的稳定性、语法兼容度、独立数据库工具管理等瓶颈问题 [文档](https://doc.dcloud.net.cn/uniCloud/ext-mongodb/intro.html)
  + 【重要】新增 uni-ai 支持客户端通过临时token直连LLM，避免云函数持续产生费用 [文档](https://doc.dcloud.net.cn/uniCloud/uni-ai.html#get-temp-token)
  + 新增 阿里云服务空间 getTempFileURL 支持获取私有文件URL [文档](https://doc.dcloud.net.cn/uniCloud/storage/dev.html#cloudgettempfileurl)
  + 新增 uni-ai 阿里云百炼、七牛云模型服务商 [文档](https://doc.dcloud.net.cn/uniCloud/uni-ai.html#get-llm-manager)
  + 修复 HBuilderX 执行`上传Schema扩展Js的配置`操作时失败会提示 undefined 的Bug

#### 4.66.2025051912
* 【App插件(含5+App和uni-app的App端)】
  + 更新 uni-AD模块 腾讯优量汇SDK Android为 4.640.1510 版，iOS为 4.15.40 版；快手广告和快手内容联盟SDK Android为 3.3.76.5 版；穿山甲&GroMore SDK Android为 6.8.1.7 版，iOS为 6.8.0.5 版；Sigmob广告联盟SDK Android为 4.22.2 版，iOS为 4.18.2 版；Octopus章鱼移动广告SDK Android为 1.6.3.6 版，iOS为 1.6.3.1 版；AdScope倍孜广告SDK Android为 5.2.1.3 版；泛连SDK Android为 2.8.4 版，iOS为 2.8.3.0.5 版；华夏乐游SDK Android为 3.11.3 版，iOS为 2.13.0 版，助力618促销

#### 4.65.2025051206
* 【uni-app】
  + iOS平台 修复 4.61版本引发的 API uni.getPrivacySetting 提示`未添加uni-privacy模块`的Bug [详情](https://ask.dcloud.net.cn/question/209014)
* 【uni-app x】
  + Android平台 修复 组件 web-view 网页iframe中输入框获取焦点后可能被软键盘遮挡 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17365)
* 【App插件(含5+App和uni-app的App端)】
  + iOS平台 更新 支付宝SDK为 15.8.32.5 版，解决在 iOS18 系统无法跳转到香港支付宝的问题 [详情](https://ask.dcloud.net.cn/question/208662)

#### 4.64.2025042916
* 【uni-app】
  + 修复 Vue2 项目 使用预编译器 dart-sass 时非 uni.scss 文件不能使用 @use 语法的Bug [详情](https://ask.dcloud.net.cn/question/206689)
  + Web平台 修复 在使用国际化时，leftWindow、topWindow 和 rightWindow 初始语言默认显示为英文的Bug [详情](https://github.com/dcloudio/uni-app/issues/5243)
  + App平台 修复 Canvas 设置不支持字体小数、 font-weight 不支持更多自重和数字的Bug [详情](https://github.com/dcloudio/uni-app/issues/5329)
  + App平台 修复 textarea 组件在某些情况下，在APP端 iOS 模拟器中无法渲染的Bug [详情](https://ask.dcloud.net.cn/question/206746)
  + App平台 修复 有拦截器的情况下，切换 tabbar 时索引与页面不对应的Bug [详情](https://ask.dcloud.net.cn/question/147649)
  + Android平台 修复 Vue2 模式下 data 相同值赋值不会触发 nextTick 的Bug [详情](https://ask.dcloud.net.cn/question/206600)
  + iOS平台 修复 google 地图卫星视图模式不显示建筑和道路名称的Bug [详情](https://ask.dcloud.net.cn/question/207738)
  + 鸿蒙平台 新增 UniMP 实例支持访问 appId 属性
  + 鸿蒙平台 新增 uni.getBackgroundAudioManager 现可以在通知栏中显示音频播放控制
  + 鸿蒙平台 新增 defineNativeEmbed 接口，用于定义原生嵌入组件 [详情](https://uniapp.dcloud.net.cn/tutorial/harmony/native-component.html)
  + 鸿蒙平台 调整 navigateBar 高度，调整返回按钮点击区域，调整 loading 改为在左侧
  + 鸿蒙平台 调整 uni-app 页面所在的 webview 启用 MixedMode.All
  + 鸿蒙平台 修复 setTimeout 传入错误参数导致崩溃的Bug
  + 鸿蒙平台 修复 createWebviewContext  的相关方法调用之后闪退的Bug
  + 鸿蒙平台 修复 getWindowInfo 部分设备获取的 windowHeight 少1px的Bug
  + 鸿蒙平台 修复 部分情况下主应用和小程序切换时调用 uni api 报错的Bug
  + 鸿蒙平台 修复 uni.request data 传入字符串被额外 JSON.stringify 了一次的Bug [详情](https://ask.dcloud.net.cn/question/207554)
  + 鸿蒙平台 修复 getStorage 接口返回的对象内的数组调用 push 方法无效的Bug [详情](https://ask.dcloud.net.cn/question/207828)
  + 鸿蒙平台 修复 直达页面跳转同名页面后返回直接回到了首页的 Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17091)
  + 鸿蒙平台 修复 web-view 的 update-title 默认表现错误的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17088)
  + 鸿蒙平台 修复 uts 插件内打印日志无法在 HBuilderX 控制台查看的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17092)
  + 小程序平台 修复 Node 高版本废弃部分 API 导致运行失败的Bug [详情](https://github.com/dcloudio/uni-app/issues/5300)
  + 小程序平台 修复 编译 style 产物存在冗余 runtime 判断逻辑的Bug [详情](https://github.com/dcloudio/uni-app/issues/5333)
  + 微信小程序平台 新增 支持 useExtendedLib 属性，引入 weui 工具库 [详情](https://ask.dcloud.net.cn/question/206730)
  + 支付宝小程序平台 修复 getSystemInfo 时 osName 错误的Bug [详情](https://ask.dcloud.net.cn/question/207186)
  + 小红书小程序平台 修复 产物目录下无法编入 ext.json 的Bug
  + 抖音小程序平台 修复 产物目录下无法编入 package.json 的Bug
* 【uni-app x】
  + 【重要】新增 编译App到鸿蒙平台，实现跨平台开发鸿蒙原生应用 [详见](https://doc.dcloud.net.cn/uni-app-x/app-harmony/)
  + Web平台、App平台 重构 uni.showModal，基于dialogPage，支持 uni.hideModal、国际化、暗黑主题、横屏 [文档](https://doc.dcloud.net.cn/uni-app-x/api/show-modal.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=16800>
  + Web平台、App平台 修复 4.51版本引发的 API uni.showActionSheet 菜单分割线太粗 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15574)
  + Web平台 修复 4.51版本引发的 API uni.showActionSheet 宽屏模式缺少阴影效果 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15573)
  + App平台 新增 组件 camera组件 [文档](https://doc.dcloud.net.cn/uni-app-x/component/camera.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=16169>
  + App平台 新增 组件 text 支持 css 属性 text-shadow [文档](https://doc.dcloud.net.cn/uni-app-x/css/text-shadow.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=15524>
  + App平台 新增 API uni.requestMerchantTransfer 支持调起微信请求用户确认收款 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-recorder-manager.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=15360>
  + App平台 新增 API uni.getRecorderManager 支持录音功能 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-recorder-manager.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=15781>
  + App平台 新增 API UniPage 支持 width、height、statusBarHeight 等属性 [文档](https://doc.dcloud.net.cn/uni-app-x/api/unipage.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=15946>
  + App平台 新增 API websocket 支持 ArrayBuffer 类型数据 [文档](https://doc.dcloud.net.cn/uni-app-x/api/websocket.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=15780>
  + App平台 新增 API uni.previewImage 完善图片加载失败逻辑 [文档](https://doc.dcloud.net.cn/uni-app-x/api/preview-image.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=16001>
  + App平台 新增 API uni.getVideoInfo 返回结果支持 thumbTempFilePath 获取视频缩略图 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-video-info.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=14521>
  + App平台 新增 API uni.getVideoInfo uni.compressVideo 支持返回文件字节大小 byteSize 数据，统一调整 duration、size 等属性值精度 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-video-info.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=15892>
  + App平台 新增 CSS var变量 --status-bar-height 支持动态更新 [文档](https://doc.dcloud.net.cn/uni-app-x/css/common/function.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=16070>
  + App平台 新增 CSS justify-content 支持 space-evenly [文档](https://doc.dcloud.net.cn/uni-app-x/css/justify-content.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=13351>
  + App平台 新增 CSS rpx 长度单位统一在排版引擎层计算，解决在应用窗口大小发生变化时可能显示不正确的问题 [文档](https://doc.dcloud.net.cn/uni-app-x/css/common/length.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=16115>
  + App平台 新增 DOM API UniElement 支持 requestFullscreen 请求全屏显示功能 [文档](https://doc.dcloud.net.cn/uni-app-x/dom/unielement.html#requestFullscreen) <https://issues.dcloud.net.cn/pages/issues/detail?id=14131>
  + App平台 新增 组件 web-view 支持 bounces 配置是否开启回弹效果 [文档](https://doc.dcloud.net.cn/uni-app-x/component/web-view.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=15066>
  + App平台 修复 组件 nested-scroll-header 不能动态自适应内容高度 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15744)
  + App平台 新增 组件 web-view 支持获取内容高度及内容高度变化事件 [文档](https://doc.dcloud.net.cn/uni-app-x/component/web-view.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=16625>
  + App平台 修复 API uni.createInnerAudioContext、uni.getBackgroundAudioManager无法播放m3u8音频直播源 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16202)
  + App平台 修复 DOM API UniElement takeSnapshot 截屏时会阻塞UI [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16044)
  + Android平台、iOS平台 新增 API uni.makePhoneCall 支持拨打电话 [文档](https://doc.dcloud.net.cn/uni-app-x/api/make-phone-call.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=16592>
  + Android平台、iOS平台 修复 4.51版本引发的 API uni.showActionSheet 主题监听导致内存泄漏问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17201)
  + Android平台 新增 pages.json 支持 androidThreeButtonNavigationStyle 配置系统虚拟导航栏前景色 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/pagesjson.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=15762>
  + Android平台 新增 组件 web-view 支持 android-nested-scroll 属性配置嵌套滚动行为 [文档](https://doc.dcloud.net.cn/uni-app-x/component/web-view.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=16675>
  + Android平台 新增 API uni.connectEventSource 支持 header 设置请求头 [文档](https://doc.dcloud.net.cn/uni-app-x/api/connect-event-source.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=15956>
  + Android平台 新增 UniPage API getAndroidActivity 获取安卓平台Activity对象 [文档](https://doc.dcloud.net.cn/uni-app-x/api/unipage.html#getandroidactivity) <https://issues.dcloud.net.cn/pages/issues/detail?id=16239>
  + Android平台 修复 vue 响应式 Array 调用 reverse 后结果不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16108)
  + Android平台 修复 vue 组件:style绑定`<script setup>`中定义的非响应式数据运行时报类型不兼容错误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16699)
  + Android平台 修复 4.51版本引发的 vue script setup对外导出属性的getter、setter命名函数可能调用失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15543)
  + Android平台 修复 vue inject在指定了默认值时仍告警not found [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16459)
  + Android平台 修复 pages.json androidThreeButtonNavigationTranslucent 设置为 false 时，通过 backgroundColorContent 修改虚拟按键区域颜色无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15828)
  + Android平台 修复 pages.json 横屏、分屏模式下页面默认导航栏高度可能不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16107)
  + Android平台 修复 组件 Touch 事件 设置 transform 为 rotate 后 touch 事件返回的坐标信息不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13842)
  + Android平台 修复 组件 Touch 事件 设置 scale 后触摸修改 translate 会引起闪烁 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15894)
  + Android平台 修复 组件 scroll-view 嵌套 web-view 后，操作 web-view 无法滚动 scroll-view [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13460)
  + Android平台 修复 组件 scroll-view 组件无法动态调整宽高 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16020)
  + Android平台 修复 组件 swiper 组件设置 border-radius 不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16163)
  + Android平台 修复 组件 list-view 开启下拉刷新后 sticky-header 动态加载的数据导致无法吸顶 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15395)
  + Android平台 修复 组件 list-view 父容器设置 overflow 为 visible 时导致自定义下拉刷新样式无法隐藏 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16718)
  + Android平台 修复 组件 list-item 内元素绑定 longpress 事件，list-view 滚动几页后部分 list-item 内 longpress 事件不触发 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15559)
  + Android平台 修复 4.51版本引发的 组件 sticky-header 反复切换显示后停靠位置可能异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16118)
  + Android平台 修复 组件 sticky-header 父容器内容高度发生变化 sticky-header 未能及时更新停靠位置 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16216)
  + Android平台 修复 组件 sticky-section 绑定的数据源动态 push 添加数据后引起显示错乱 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15591)
  + Android平台 修复 4.53版本引发的 组件 text tap/click 事件可能不响应 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16132)
  + Android平台 修复 组件 textarea 的 line-height 属性不支持 em 单位 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12900)
  + Android平台 修复 组件 image 加载长图片显示模糊 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15915)
  + Android平台 修复 组件 web-view 页面关闭后播放的背景音乐未关闭 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15549)
  + Android平台 修复 组件 web-view 网页中输入框获取焦点后可能被软键盘遮挡 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17222)
  + Android平台 修复 API uni.downloadFile 下载超时判断逻辑不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16354)
  + Android平台 修复 API uni.createInnerAudioContext uni.getBackgroundAudioManager 返回的 buffered 属性值不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16770)
  + Android平台 修复 API uni.getBackgroundAudioManager 播放背景音乐在 App 设置中的通知权限中通知类别显示为 uniappx [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16564)
  + Android平台 修复 3.99版本引发的 CSS box-shadow 子元素改变尺寸后导致设置 box-shadow 样式的元素渲染异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15698)
  + Android平台 修复 UniPage API 使用自定义基座包真机运行热更新可能引起页面大小异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15434)
  + Android平台 修复 UniPage API 应用生命周期 onLaunch 中弹出 DialogPage 后可能引起 tabBar 页面显示不正常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16307)
  + Android平台 修复 DOM API UniElement 未设置 background-color、border-color 时执行 animate 动画将默认色修改为白色 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15767)
  + Android平台 修复 DOM API UniElement animate 方法设置 opacity 导致动画不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17191)
  + Android平台 修复 运行调试 应用启动过程中代码报错没有日志输出 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16294)
  + Android平台 修复 API dialogPage 在android5.0系统设备内容显示不全 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16939)
  + Android平台 更新 云端打包环境 compileSdk 为 35、buildToolsVersion 为 35.0.0 、 Gradle 为 8.11.1 版、Android Gradle 插件为 8.7.3 版 [文档](https://doc.dcloud.net.cn/uni-app-x/tutorial/app-env.html)
  + iOS平台 新增 API uni.base64ToArrayBuffer 、uni.arrayBufferToBase64 [文档](https://doc.dcloud.net.cn/uni-app-x/api/base64.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=15969>
  + iOS平台 新增 API uni.request 支持 ArrayBuffer 数据 [文档](https://doc.dcloud.net.cn/uni-app-x/api/request.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=15802>
  + iOS平台 新增 API uni.chooseFile 选择文件 [文档](https://doc.dcloud.net.cn/uni-app-x/api/choose-file.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=15672>
  + iOS平台 新增 API uni.getFileSystemManager 支持在UTS插件中调用，补齐之前未支持的 readFileSync、writeFileSync 等API [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-file-system-manager.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=15551>
  + iOS平台 新增 API uni.connectEventSource 支持SSE [文档](https://doc.dcloud.net.cn/uni-app-x/api/connect-event-source.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=15664>
  + iOS平台 新增 运行调试 CocoaPods 仓储支持配置自定义source [文档](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-ios-cocoapods.html#usecocoapods) <https://issues.dcloud.net.cn/pages/issues/detail?id=16671>
  + iOS平台 新增 发行 uts插件支持原生iOS Extension [文档](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-plugin.html#iosextension) <https://issues.dcloud.net.cn/pages/issues/detail?id=4949>
  + iOS平台 修复 pages.json 非刘海屏设备上隐藏状态栏导致导航栏显示异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16747)
  + iOS平台 修复 4.25版本引发的 组件 list-view 宽度动态变化时引起子组件 list-item 复用时显示异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16126)
  + iOS平台 修复 组件 list-item CSS 设置 margin 为负数时可能引起应用闪退 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15701)
  + iOS平台 修复 组件 rich-text 嵌入 list-item 中可能引起应用闪退 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15179)
  + iOS平台 修复 组件 input 设置 selection-start、selection-end 在某些场景失效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16047)
  + iOS平台 修复 组件 input placeholder-style 设置 background-color 无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16563)
  + iOS平台 修复 组件 textarea CSS 设置 line-height 无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15274)
  + iOS平台 修复 组件 textarea 设置 hold-keyboard 为 true，scroll-view 滚动时软键盘还是会收起 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15512)
  + iOS平台 修复 组件 textarea 在 class 中设置 width、height 无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15703)
  + iOS平台 修复 组件 textarea 使用v-model 修改文本内容时光标位置会被重置到最后一行 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15895)
  + iOS平台 修复 组件 textarea 同时设置auto-height与max-height，内容高度大于max-height时视图无法滚动 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16560)
  + iOS平台 修复 4.55版本引发的 组件 text selectable 文本可选效果可能无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17199)
  + iOS平台 修复 4.25版本引发的 组件 list-view scroll-into-view 属性可能无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16934)
  + iOS平台 修复 组件 waterflow scroll-into-view 属性可能无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16443)
  + iOS平台 修复 组件 input 某些场景下 hold-keyboard 设置为 true 滑动 scroll-view 依然隐藏软键盘 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17060)
  + iOS平台 修复 组件 web-view web页面中 a 标签 target 属性值为 _blank 时点击无法跳转 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16740)
  + iOS平台 修复 4.51版本引发的 组件 web-view evaLJS 注入localstorage 数据没有在页面加载前生效，导致一开始获取不到token [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15865)
  + iOS平台 修复 API uni.getProviderSync 返回属性providerObject: Array<UniProvider>不支持JSON.stringify()的问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16557)
  + iOS平台 修复 API uni.reLaunch relaunch后跳转到新页面 还能侧滑返回到tabbar页面  原因是relaunch没有关闭tabbar页面 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15961)
  + iOS平台 修复 API uni.compressImage 压缩compressImg_开头的文件会覆盖 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16003)
  + iOS平台 修复 API uni.requestPayment 微信支付跳转微信失败且没有返回错误码的bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15902)
  + iOS平台 修复 CSS transition transform 同时应用多个变换时效果可能不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15161)
  + iOS平台 修复 CSS transition-duration 只设置transition-duration没有动画效果 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15881)
  + iOS平台 修复 CSS text-decoration-line 属性运行在 iOS18 及以上设备无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16838)
  + iOS平台 修复 DOM API UniCanvasElement 设置宽高和安卓不一致 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15732)
  + 微信小程序平台 修复 编译器 $vm找不到 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16723)
* 【uts插件】
  + Web平台、iOS平台、微信小程序平台 修复 getString/getNumber 等get方法默认值参数部分情况不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16094)
  + App平台 修复 逻辑空赋值(??=)编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15735)
  + App平台 修复 联合类型参数传递给匹配的函数时可能编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16139)
  + Android平台 修复 带默认值的参数在函数内部不能二次赋值 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16691)
  + Android平台 修复 4.51版本引发的 Array.from 必须指定元素类型的bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16433)
  + Android平台 修复 typeof  操作 number|null 类型数据实际为 null 值时，返回值为 number [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15920)
  + Android平台 修复 4.41版本引发的 Math.PI 等内置对象数学运算结果返回值类型不是 number [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15588)
  + Android平台 修复 Regexp exec 不支持粘性搜索 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15517)
  + Android平台 修复 console.log 打印浮点数的精度与 web 存在差异 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15544)
  + Android平台 修复 console.log 打印 UniNativeViewEvent 无内容输出到控制台 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16669)
  + Android平台 修复 encodeURI 编码字符“+”不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16573)
  + Android平台 修复 vue下调用uts插件类的实例方法和静态方法不支持参数默认值 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15269)
  + iOS平台 新增 支持 atob, btoa 函数 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/global.html#atob-encodeddata-string-string) <https://issues.dcloud.net.cn/pages/issues/detail?id=15987>
  + iOS平台 修复 项目路径包含空格时，修改uts插件会报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15919)
  + 鸿蒙平台 新增 convert2AbsFullPath、getResourcePath 方法 [详情](https://doc.dcloud.net.cn/uni-app-x/uts/utsharmony.html)
  + 鸿蒙平台 修复 UTSHarmony 在较早时机无法调用 getUIAbilityContext 的 Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=17019)
* 【unicloud】
  + 新增 软件版服务空间支持跨服务空间调用云函数
  + 修复 阿里云云数据库 updateAdnReturn 传入空间不会报错的Bug [详情](https://ask.dcloud.net.cn/question/206249)
  + 修复 HBuilderX 项目存在多服务空间时，运行本地云函数不支持集群空间运行的Bug
  + 修复 下载云函数时如果本地已存在云函数弹出对话框，点击关闭会继续下载的Bug
* 【App插件(含5+App和uni-app的App端)】
  + 新增 uni-ad模块 国内广告支持 华夏乐游 渠道；iOS平台国内广告支持 泛连 渠道
  + Android平台 修复 plus.runtime.showPrivacyDialog 弹出隐私协议框点击`同意`后需重启才能生效的Bug
  + iOS平台 更新 uni-AD模块 快手广告联盟更新为 3.3.76 版本；快手内容联盟更新为 3.3.76 版本，新增618展示样式
  + iOS平台 更新 分享/登录模块 QQ SDK 为 3.5.17.4 版，解决在 iOS18 系统登录无法跳转到 QQ 的问题 [详情](https://ask.dcloud.net.cn/question/207800)
  + iOS平台 修复 模拟器运行时调用 plus.nativeUI.setUIStyle 可能会导致应用崩溃的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16708)

#### 4.57.2025032507
* 【uni-app】
  + MP-Harmony平台 新增 鸿蒙元服务支持 vue2 项目类型
* 【App插件(含5+App和uni-app的App端)】
  + 【重要】Android平台 修复 4.51版本引发的 部分设备启动白屏或停留在启动界面无法启动的Bug。请使用该版本打包过的开发者尽快升级重新打包 [详情](https://ask.dcloud.net.cn/question/206890)

#### 4.56.2025031210
* 【uni-app】
  + 【重要】Vue2 项目scss预编译器默认改用dart-sass，HBuilderX 非 Mac Arm 版可以在manifest.json中根节点配置"sassImplementationName": "node-sass"手动指定，继续使用node-sass。这2种sass编译器有语法差异 [文档](https://uniapp.dcloud.net.cn/tutorial/syntax-css.html#css-preprocessor) [详情](https://ask.dcloud.net.cn/question/206506)
  + App-Android平台 修复 4.55版本引发的 组件 Button 在 nvue 页面设置 border-radius、border 和 iOS 表现不一致的Bug [详情](https://ask.dcloud.net.cn/question/206548)
* 【uni-app-x】
  + Web平台、微信小程序平台 修复 4.55版本引发的 编译器 运行时会提交云端编译仅App端支持的uts加密插件的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16242)
  + App-Android平台 修复 4.41版本引发的 组件 waterflow 触发下拉刷新可能出现app卡死 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=16133)
* 【App插件(含5+App和uni-app的App端)】
  + Android平台 修复 4.41版本引发的 uni-AD 快捷开屏广告可能会不展示的Bug

#### 4.55.2025030718
* 【uni-app】
  + Web平台 App平台 调整 movable-view 的最小缩放比例为 0.1 [详情](https://ask.dcloud.net.cn/question/203268)
  + web平台 调整 编译解析 manifest.json 文件时优先读取 web 节点配置信息，而不是 H5 节点
  + web平台 修复 uni.chooseFile 如果传递了 type 没有对 mime 限制的Bug
  + 小程序平台 修复 4.41版本引发的 访问 uni 上不存在的属性也会获取到一个方法的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15216)
  + 小程序平台 修复 Vue2 模式下 style 绑定动态空对象引起编译报错的Bug [详情](https://ask.dcloud.net.cn/question/204410)
  + 微信小程序平台 调整 兼容基础库 2.20 以下的 getAppBaseInfo、getWindowInfo 和 getDeviceInfo [详情](https://ask.dcloud.net.cn/question/204348)
  + 微信小程序平台 修复 无法在游客模式下运行到微信小程序的 bug
  + 微信小程序平台 修复 vue3 编译器 编译为分包时部分资源引用路径不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14860)
  + 微信小程序平台 修复 vue3 编译器 cli项目编译为小程序插件时输出目录不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14869)
  + App平台 新增 uni.chooseMedia [文档](https://uniapp.dcloud.net.cn/api/media/video.html#choosemedia)
  + App平台 修复 uni.chooseLocation 在搭配腾讯定位、腾讯地图使用时，在发行或自定义基座环境下无法获取定位信息的Bug
  + App平台 vue3项目 修复 vue页面 v-if 在某些情况下子组件 ad/cover-image/live-pusher/video/web-view 不能被正确销毁的Bug [详情](https://ask.dcloud.net.cn/question/205222)
  + App-Android平台 修复 使用uts插件云端打包后没有包含隐私清单的Bug
  + App-iOS 修复 uni.requestPayment 使用苹果应用内购 IAP 在 iOS18 系统 username 参数类型不为字符串时会引起应用闪退的Bug [详情](https://ask.dcloud.net.cn/question/206161)
  + App-Harmony平台 修复 打印部分对象时崩溃的Bug
  + App-Harmony平台 修复 uni_module 内导出的 class 无法在页面中创建实例的Bug
  + App-Harmony平台 修复 uni_module 内对象字面量部分用法报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15241)
  + App-Harmony平台 修复 启动后首次 hide 事件不触发的Bug
  + App-Harmony平台 修复 canvas 绘制网络图片后使用 canvasToTempFilePath 报错画布污染的Bug
  + App-Harmony平台 修复 页面中使用 renderjs 加载本地资源时报错跨域的Bug
  + App-Harmony平台 修复 uni.getStorage 获取的对象无法赋予新字段的Bug
  + App-Harmony平台 修复 uni.getRecorderManager onStop 等监听事件重复触发的Bug [详情](https://ask.dcloud.net.cn/question/203679)
  + App-Harmony平台 修复 uni.chooseImage uni.compressImage 在所选图片名称包含中文时压缩文件路径错误的Bug
  + App-Harmony平台 修复 uni.uploadFile 在服务端返回内容大于5MB时报错的Bug
  + App-Harmony平台 调整 如果之前在 harmony-config 中自定义过 `build-profile.json5` 文件，需要在 `products` 节点中添加 `compatibleSdkVersionStage: "beta6"` 配置项 [详情](https://uniapp.dcloud.net.cn/tutorial/harmony/history.html)
  + MP-Harmony平台 调整 更新鸿蒙元服务工程模板以同步新发布的ascf基础库
  + 快手小程序平台 修复 自定义组件 ref 获取失败的Bug [详情](https://ask.dcloud.net.cn/question/204250)
* 【uni-app-x】
  + 修复 编译器 as 语法导致对象引用丢失 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15705)
  + Web平台、App平台、微信小程序平台 新增 CSS var支持安全区域相关变量 [文档](https://doc.dcloud.net.cn/uni-app-x/css/common/function.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=15290>
  + Web平台、App平台 新增 API UniPage 补充更多信息属性 [文档](https://doc.dcloud.net.cn/uni-app-x/api/unipage.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=10587>
  + Web平台、App平台 重构 showActionSheet，基于dialogPage，支持国际化、主题、横屏、更多item数量、自定义颜色 [文档](https://doc.dcloud.net.cn/uni-app-x/api/show-action-sheet.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=6259>
  + Web平台、App平台 新增 API uni.hideActionSheet 关闭栈顶页面的 actionSheet [文档](https://doc.dcloud.net.cn/uni-app-x/api/show-action-sheet.html#hideactionsheet) <https://issues.dcloud.net.cn/pages/issues/detail?id=15304>
  + App平台、微信小程序平台 新增 DOM API 关键帧动画 [文档](https://doc.dcloud.net.cn/uni-app-x/dom/unielement.html#animate) <https://issues.dcloud.net.cn/pages/issues/detail?id=15642>
  + Web平台、App平台 修复 API dialogPage pages.json 中 navigationStyle、backgroundColorContent 配置无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14225)
  + Web平台 修复 组件 list-view list-item下的自定义组件触发两次生命周期 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13858)
  + Web平台 修复 API showActionSheet 内嵌套showActionSheet第二层点击itemList无法取消，取消后再也无法打开 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1765)
  + Web平台 修复 API uni.createCanvasContextAsync 组件内多根节点无法获取canvas元素的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14392)
  + App平台 新增 vue v-on 支持 prevent 修饰符 [文档](https://doc.dcloud.net.cn/uni-app-x/vue/modifier.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=15333>
  + App平台 新增 组件 共享元素动画 [文档](https://doc.dcloud.net.cn/uni-app-x/component/share-element.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=14354>
  + App平台 新增 组件 text 嵌套为子组件时响应点击事件 [文档](https://doc.dcloud.net.cn/uni-app-x/component/text.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=362>
  + App平台 新增 组件 map 更改tap相关Event类型继承自UniPointerEvent [文档](https://doc.dcloud.net.cn/uni-app-x/component/map.html#unimappoitapevent) <https://issues.dcloud.net.cn/pages/issues/detail?id=14280>
  + App平台 新增 组件 map 支持Marker的callout属性 [文档](https://doc.dcloud.net.cn/uni-app-x/component/map.html#%E5%B1%9E%E6%80%A7) <https://issues.dcloud.net.cn/pages/issues/detail?id=14595>
  + App平台 新增 组件 兼容 cover-view、cover-image [文档](https://doc.dcloud.net.cn/uni-app-x/component/cover-view.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=15771>
  + App平台 新增 API uni.openAppAuthorizeSetting 打开系统的应用授权管理页面 [文档](https://doc.dcloud.net.cn/uni-app-x/api/open-app-authorize-setting.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=12833>
  + App平台 新增 API uni.chooseMedia 选择图片或视频 [文档](https://doc.dcloud.net.cn/uni-app-x/api/choose-media.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=13164>
  + App平台 新增 API uni.previewImage 基于dialogPage重构，优化指示器效果，补充长按事件，开放源码方便自定义 [文档](https://doc.dcloud.net.cn/uni-app-x/api/preview-image.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=15200>
  + App平台 新增 API uni.getUniverifyManager 基于dialogPage重构内置UI，适配暗黑模式 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-univerify-manager.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=14332>
  + App平台 新增 CSS 支持env方法 [文档](https://doc.dcloud.net.cn/uni-app-x/css/common/function.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=7296>
  + App平台 调整 DOM API CSSStyleDeclaration getPropertyValue获取不存在的样式值时，与web一样返回空字符串 [文档](https://doc.dcloud.net.cn/uni-app-x/dom/cssstyledeclaration.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=14749>
  + App平台 修复 4.31版本引发的 组件 map marker不支持title属性 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14270)
  + App平台 修复 CSS 某些情况下未处理百分比导致view没有显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14572)
  + App平台 修复 API uni.downloadFile 下载时断网不会触发回调事件 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15497)
  + App-Android平台 新增 pages.json 支持androidThreeButtonNavigationBackgroundColor配置虚拟按键导航栏背景色 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/pagesjson.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=14135>
  + App-Android平台 新增 API 支持chooseFile [文档](https://doc.dcloud.net.cn/uni-app-x/api/choose-file.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=14362>
  + App-Android平台 新增 API uni.isSimulator() 判断是否为模拟器 [文档](https://doc.dcloud.net.cn/uni-app-x/api/is-simulator.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=15225>
  + App-Android平台 新增 API getAccessibilityInfo 获取无障碍服务相关信息 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-accessibility-info.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=15303>
  + App-Android平台 新增 API uni.base64ToArrayBuffer 、uni.arrayBufferToBase64 [文档](https://doc.dcloud.net.cn/uni-app-x/api/base64.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=12771>
  + App-Android平台 新增 API uni.request 支持 ArrayBuffer 数据 [文档](http://localhost:8081/uni-app-x/api/request.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=11652>
  + App-Android平台 新增 API uni.request 支持sse 用于流式响应服务器推送消息 [文档](https://doc.dcloud.net.cn/uni-app-x/api/connect-event-source.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=14290>
  + App-Android平台 新增 API uni.getFileSystemManager 读取文件支持content://路径 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-file-system-manager.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=14130>
  + App-Android平台 新增 组件 swiper 支持 duration 属性设置动画播放时长 [文档](https://doc.dcloud.net.cn/uni-app-x/component/swiper.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=12914>
  + App-Android平台 修复 编译器 无法使用相对路径引入uni_modules下插件static目录 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14427)
  + App-Android平台 修复 vue Array和Map的forEach、Map的for of不触发响应式收集 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15065)
  + App-Android平台 修复 vue props 使用数组定义 type 类型包含 null 时编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14252)
  + App-Android平台 修复 组件 list-view 对v-if的元素缓存异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13869)
  + App-Android平台 修复 组件 list-view 安卓下listview中sticky-header如果是动态加载的数据，无法吸顶 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14705)
  + App-Android平台 修复 组件 input 部分情况下keyboardheightchange事件不触发 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13334)
  + App-Android平台 修复 组件 image 配置border-radius属性后边缘锯齿严重 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15258)
  + App-Android平台 修复 4.31版本引发的 组件 video 使用view.takeSnapshot（）方法对暂停的video视频暂停页面进行截图，4.29版本使用该方法可以进行截图，更新至4.36无法进行截图，截图后图片是全黑 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14013)
  + App-Android平台 修复 组件 video 组件缺少开关弹幕的API [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14195)
  + App-Android平台 修复 组件 canvas y轴参数，文字却写成了X轴 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14980)
  + App-Android平台 更新 组件 ad 使用的腾讯优量汇SDK为4.611.1481版，适配android 15 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15262)
  + App-Android平台 修复 组件 button 拆分设置border相关样式不起作用 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15526)
  + App-Android平台 修复 组件 canvas 设置textBaseline="Top"绘制位置不准确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15634)
  + App-Android平台 修复 组件 canvas Image释放后不会立即回收内存 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15645)
  + App-Android平台 修复 组件 web-view 底部textarea弹出的软键盘遮挡界面元素 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15678)
  + App-Android平台 修复 API setTabBar 切换tabbar页面时图标会出现短暂的闪白 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15288)
  + App-Android平台 修复 API showActionSheet uni.showActionSheet 数组超过6就报错了 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14821)
  + App-Android平台 修复 API uni.setAppBadgeNumber 在MIUI12以上系统设置角标不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15231)
  + App-Android平台 修复 API dialogPage 在app的onLaunch或在页面的onLoad中打开dialogPage时获取不到安全区域信息 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15489)
  + App-Android平台 修复 CSS text-overflow : ellipsis 在某些尺寸时会换行 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13663)
  + App-Android平台 修复 CSS border 安卓运行时解析 border 和编译时表现不一致 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15510)
  + App-iOS平台 新增 API uni.createInnerAudioContext 和 uni-getBackgroundAudioManager 支持音频文件Cache功能 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-background-audio-manager.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=14207>
  + App-iOS平台 修复 编译器 模板内使用较新的js语法时无法在低版本iOS运行 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15088)
  + App-iOS平台 修复 4.12版本引发的 vue options 名称被编译器占用 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15107)
  + App-iOS平台 修复 全局事件 Touch 事件 阻止默认行为无效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14285)
  + App-iOS平台 修复 全局事件 Transition 事件 transtion 0ms 不应该触发事件回调的问题，该问题导致事件断断续续 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14911)
  + App-iOS平台 修复 组件 waterflow 子组件高度动态变化时未更新排版 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14645)
  + App-iOS平台 修复 组件 nested-scroll 当内层滚动视图内容高度不够容器高度时可能导致外层滚动视图无法滚动的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15197)
  + App-iOS平台 修复 组件 input placeholderStyle与placeholderClass优先级不对 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14742)
  + App-iOS平台 修复 组件 textarea 组件placeholder内容会超过光标，影响美观 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13973)
  + App-iOS平台 修复 组件 image 组件在循环本地图片路径图片加载成功了但会发出error事件 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13839)
  + App-iOS平台 修复 组件 canvas ios端 Image对象 本地路径结尾带问号参数时无法被canvas渲染 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15784)
  + App-iOS平台 修复 4.11版本引发的 组件 web-view 重写了 window.postMessage 函数 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15796)
  + App-iOS平台 修复 4.33版本引发的 API uni.chooseImage 选择相册，编辑图片时裁剪框以及图片无法拖拽的问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14310)
  + App-iOS平台 修复 CSS border 相同权重的 css 表现和 web 不一致 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14277)
  + App-iOS平台 修复 CSS border-style 设置为dotted、dashed时显示效果不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14369)
  + App-iOS平台 修复 CSS lines 设置为 1 时 text-overflow: ellipsis 无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14496)
  + App-iOS平台 修复 CSS transition-property style中设置transition-property无效，且设置后通过dom设置也无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13943)
  + App-iOS平台 修复 CSS transform translateX未生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14917)
  + App-iOS平台 修复 CSS transform-origin 效果不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14808)
  + 微信小程序平台 修复 编译器 编译为分包时部分资源引用路径不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14860)
  + 微信小程序平台 修复 编译器 cli项目编译为小程序插件时输出目录不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14869)
  + 微信小程序平台 修复 4.41版本引发的 vue skyline模式的页面无法显示内容 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15297)
  + 微信小程序平台 修复 onShareAppMessage, onShareTimeline需要import才可使用 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15707)
  + 微信小程序平台 修复 组合式api页面中 onShareAppMessage, onShareTimeline声明后页面也无法分享 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15708)
* 【uts插件】
  + 新增 in 操作符支持 type 定义的类型 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/data-type.html#in-%E6%93%8D%E4%BD%9C%E7%AC%A6)
  + 【重要】App平台 新增 支持更多联合类型 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/data-type.html#union-type) <https://issues.dcloud.net.cn/pages/issues/detail?id=15131>
  + App平台 新增 支持类型保护、类型收窄 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/data-type.html#narrowing) <https://issues.dcloud.net.cn/pages/issues/detail?id=15132>
  + App平台 新增 Array支持静态方法 from、fromAsync、isArray、of [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/array.html#from-arraylike-arraylike-t) <https://issues.dcloud.net.cn/pages/issues/detail?id=6394>
  + Web平台、App-iOS平台、微信小程序平台 修复 部分对象字面量未转化为UTSJSONObject [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15557)
  + App平台 修复 await 一个非 Promise 类型的值编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14481)
  + App平台 修复 class静态getter、setter编译错误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15168)
  + App-Android平台 修复 switch case 语句中使用return代替break时，case 语句不会自动合并 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=9158)
  + App-Android平台 修复 Array.push数组中添加数据，运行调试一切正常，打包后就不能渲染了 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14417)
  + App-Android平台 修复 promise异常安卓环境未带出文件位置 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15056)
  + App-Android平台 修复 promise调用链抛出reject异常安卓结果和web不一致 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15083)
  + App-Android平台 修复 uni-app环境下 setPrivacyAgree/isPrivacyAgree 数值不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14367)
  + App-Android平台 修复 4.42版本引发的 uni-app项目 uts插件中修改的代码真机运行到Android14及以上系统设备非首次更新未生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15213)
  + App-iOS平台 新增 ArrayBuffer 支持在UTS插件编译为swift时使用 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/arraybuffer.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=10911>
  + App-iOS平台 新增 js 和 swift 基于 ArrayBuffer 的内存共享 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/arraybuffer.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=15260>
  + App-iOS平台 新增 uts 插件支持依赖uni_modules目录下其他uts插件 [文档](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-plugin.html#utsplugindependent) <https://issues.dcloud.net.cn/pages/issues/detail?id=15242>
* 【App插件(含5+App和uni-app的App端)】
  + Android平台 更新 uni-ad 腾讯优量汇SDK 为 4.611.1481 版，适配android 15
  + iOS平台 更新 uni-AD 快手广告和快手内容联盟SDK 为 3.3.72 版本
  + iOS平台 更新 新浪微博SDK 为 3.4.0 版本，解决在 iOS18 系统无法登录的Bug [详情](https://ask.dcloud.net.cn/question/206323)
  + iOS平台 修复 iOS 18 系统调用 plus.video.createLivePusher 引起应用崩溃的Bug [详情](https://ask.dcloud.net.cn/question/204418)
  + iOS平台 修复 uni-AD 开屏显示快手广告时频繁前后台切换可能导致页面显示不正常的Bug
* 【uniCloud】
  + 新增 un-ai minimax与讯飞部分模型支持联网搜索 [详情](https://doc.dcloud.net.cn/uniCloud/uni-ai.html)
  + 新增 uni-ai 支持 DeepSeek 模型 [详情](https://doc.dcloud.net.cn/uniCloud/uni-ai.html#get-llm-manager)
  + 修复 支付宝云数据库 count 查询时没有显式返回数量的Bug [详情](https://ask.dcloud.net.cn/question/204598)
  + 修复 3.99版本引发的uniCloud下database目录右键菜单"创建数据库扩展校验函数目录"菜单项重复的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=15199)

#### 4.45.2025010502
* 【uni-app】
  + 小程序平台 修复 4.44版本引发的 vue3项目 部分 api 无法调用的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14784)
  + 微信小程序平台 修复 vue2 项目调用 getAppBaseInfo 报错 `Cannot read property 'replace' of undefined` 的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14764)
  + 新增 uni-app 运行到鸿蒙真机时如果手机跟电脑端不在同一个局域网时会在控制台窗口中输出提示信息
* 【uts插件】
  + Web平台、App-iOS平台、微信小程序平台 修复 getString等方法第二个参数（默认值）不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14224)
  + App-Android平台 修复 4.41版本引发的 String.split 使用了 Kotlin 的 removeFirst/removeLast 扩展函数与 Android15 中的 Java 函数冲突 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14804)
* 【App插件(含5+App和uni-app的App端)】
  + Android平台 修复 uni-ad 穿山甲&GroMore 静默状态下或在后台运行可能会获取MAC地址的问题
  + iOS平台 修复 4.41版本引发的 uni-ad 某些场景下开屏广告读取缓存失败导致展示率降低的Bug

#### 4.44.2024123110
* 【uni-app】
  + Web平台 修复 4.25版本引发的 vue3项目 onPageNotFound 生命周期中使用路由 API 失效的Bug [详情](https://ask.dcloud.net.cn/question/201202)
  + 小程序平台 新增 uni.rpx2px [详情](https://uniapp.dcloud.net.cn/api/ui/font.html#rpx2px)
  + 小程序平台 优化 启用 mergeVirtualHostAttributes 配置支持合并 v-show 指令 [详情](https://uniapp.dcloud.net.cn/collocation/manifest.html)
  + 小程序平台 优化 启用 mergeVirtualHostAttributes 配置支持合并 id 属性 [详情](https://uniapp.dcloud.net.cn/collocation/manifest.html)
  + 小程序平台 修复 引用自定义组件触发告警找不到对应 json 文件的Bug [详情](https://ask.dcloud.net.cn/question/202415)
  + 微信小程序平台 新增 uni-ad 支持流量主代运营及比价，进一步提高收益 [详情](https://uniapp.dcloud.net.cn/uni-ad/ad-weixin-agency.html)
  + 微信小程序平台 修复 微信不推荐使用 getSystemInfo 引发的警告
  + MP-Harmony平台 修复 Vue3 setup 中无法获取 provider/inject 值的Bug
  + App-Harmony平台 修复 传递数组的 proxy 到原生层时会被原生层当做对象处理的 Bug
  + App-Harmony平台 修复 setTabBarItem 不生效的 Bug [详情](https://ask.dcloud.net.cn/question/201288)
  + App-Harmony平台 修复 web-view 组件报错`The type of "permissionList" must be Array<string>`的 Bug
  + App-Harmony平台 修复 CanvasContext.measureText 不生效的 Bug
  + App-Harmony平台 修复 chooseVideo 在选视频界面可以勾选多个视频的 Bug
  + App-Harmony平台 修复 connectSocket 传入 header 会在控制台告警的 Bug
  + App-Harmony平台 修复 onLocationChange 部分情况下不触发的 Bug
  + App-Harmony平台 修复 部分情况下 TabBar 图标配置不生效的 bug [详情](https://ask.dcloud.net.cn/question/202822)
  + App-Harmony平台 修复 应用首次切换到后台时 App onHide 生命周期不触发的 bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14757)
  + App-Harmony平台 调整 调用 startSoterAuthentication 时 challenge 属性必填
  + App-Harmony平台 修复 配合新版本 DevEco Studio 运行的时候热更新失效的 Bug
* 【uni-app x】
  + 【重要】uni-app-x 项目支持发布到微信小程序 [详情](https://doc.dcloud.net.cn/uni-app-x/mp/)
  + 新增 DOM API UniElement getBoundingClientRectAsync 异步获取元素位置信息 [文档](https://doc.dcloud.net.cn/uni-app-x/dom/unielement.html#getBoundingClientRectAsync) <https://issues.dcloud.net.cn/pages/issues/detail?id=12092>
  + 新增 API uni.openDialogPage triggerParentHide 参数控制是否触发父页面 onHide 生命周期 [文档](https://doc.dcloud.net.cn/uni-app-x/api/dialog-page.html#opendialogpage) <https://issues.dcloud.net.cn/pages/issues/detail?id=13636>
  + 新增 API uni.chooseLocation 打开时触发当前页面 onHide 生命周期，关闭时触发当前页面 onShow 生命周期 [文档](https://doc.dcloud.net.cn/uni-app-x/api/choose-location.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=13836>
  + 修复 编译器 返回值类型推断不支持函数类型 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13046)
  + Web平台、App-iOS平台 修复 dialogPage 实例上 getElementById 等部分方法不支持的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14047)
  + Web平台 修复 4.02版本引发的 组件 全局事件 部分组件触发的事件中 target 未指向内置组件根节点 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12910)
  + Web平台 修复 组件 checkbox 影响子元素 flex 布局的 css 不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14235)
  + Web平台 修复 API uni.getStorage 获取 UTSJSONObject 数组时未能取到正确结果 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14039)
  + App平台 新增 组件 waterflow 瀑布流 [文档](https://doc.dcloud.net.cn/uni-app-x/component/waterflow.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=11016>
  + App平台 新增 组件 input placeholderStyle支持font-family、font-style、text-align [文档](https://doc.dcloud.net.cn/uni-app-x/component/input.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=13052>
  + App平台 新增 API uni.getBackgroundAudioManager 背景音频播放 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-background-audio-manager.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=12144>
  + App平台 新增 API uni.openLocation 打开当前位置 [文档](https://doc.dcloud.net.cn/uni-app-x/api/open-location.html)
  + App平台 新增 API uni.getUniverifyManager 支持自定义一键登录页面 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-univerify-manager.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=11020>
  + App平台 新增 API uni.getUniverifyManager 调整参数类名以及返回值类名 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-univerify-manager.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=13772>
  + App平台 新增 API uni.closeDialogPage 调整 animationType 默认值为 auto [文档](https://doc.dcloud.net.cn/uni-app-x/api/dialog-page.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=13942>
  + App平台 修复 组件 canvas 动画过程中圆弧闪动 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13487)
  + App平台 修复 CSS background-color 十六进制颜色语法与web不一致 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13371)
  + App-Android平台 新增 pages.json 支持 androidThreeButtonNavigationTranslucent 配置页面内容可渲染到系统导航栏的虚拟按键区域 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/pagesjson.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=11021>
  + App-Android平台 新增 API uni.chooseImage uni.saveImageToPhotosAlbum uni.getImageInfo uni.compressImage uni.chooseVideo uni.saveVideoToPhotosAlbum uni.getVideoInfo 支持内容URI地址 [文档](https://doc.dcloud.net.cn/uni-app-x/api/choose-image.html)
  + App-Android平台 修复 vue 使用defineModel嵌套绑定v-model编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11505)
  + App-Android平台 修复 vue ref变量类型推导优化 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12042)
  + App-Android平台 修复 组件 list-view 自定义刷新样式显示异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13511)
  + App-Android平台 修复 组件 textarea 部分情况下input事件不触发 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=9081)
  + App-Android平台 修复 组件 canvas new Image没有触发onload事件 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12336)
  + App-Android平台 修复 4.33版本引发的 API getCurrentPages 部分场景 getPageStyle 返回的 navigationStyle 值域不准 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13133)
  + App-Android平台 修复 API dialogPage animationType设置zoom-fade-out不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12655)
  + App-Android平台 修复 API dialogPage navigationBarTextStyle属性不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13281)
  + App-Android平台 修复 API showToast 被 dialogPage 遮挡 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12993)
  + App-Android平台 修复 API uni.request 指定泛型为string，接口返回404时解析失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13054)
  + App-Android平台 修复 API uni.getUniverifyManager 更新个验SDK解决合规风险问题 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14276)
  + App-Android平台 修复 云对象返回的errSubject无法在客户端获取 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13228)
  + App-Android平台 修复 CSS font-family 自定义字体、内置字体设置font-style、font-weight属性不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13100)
  + App-iOS平台 新增 API uni.createInnerAudioContext 支持音频播放 [文档](https://doc.dcloud.net.cn/uni-app-x/api/create-inner-audio-context.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=12829>
  + App-iOS平台 新增 API uni.chooseLocation 支持 uts 插件环境调用 [文档](https://doc.dcloud.net.cn/uni-app-x/api/choose-location.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=13780>
  + App-iOS平台 修复 组件 scroll-view 内容高度小于容器高度时无法触发自定义下拉刷新 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13747)
  + App-iOS平台 修复 组件 input iOS 输入框长按粘贴与touch事件冲突，导致input失焦，键盘被收起 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12621)
  + App-iOS平台 修复 组件 slider 点击时事件触发错误的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13783)
  + App-iOS平台 修复 组件 canvas Image支持width、height属性 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12687)
  + App-iOS平台 修复 组件 canvas 通过style.setProperty方法动态修改尺寸导致渲染异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12904)
  + App-iOS平台 修复 组件 canvas 反复退出进入应用偶发闪退 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13093)
  + App-iOS平台 修复 API uni.$emit 不支持参数为UTSJSONObject [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12615)
  + App-iOS平台 修复 API navigator iOS页面边界不应该带有阴影效果 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11585)
  + App-iOS平台 修复 API dialogPage 关闭后，状态栏颜色无法更新为当前页面的设置 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13765)
  + App-iOS平台 修复 API uni.createSelectorQuery 在视图滚动期间 callback 回调不及时 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13368)
  + App-iOS平台 修复 API uni.getSystemInfoSync 在iphone 16 pro max 设备获取的屏幕宽、高可能不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11898)
  + App-iOS平台 修复 CSS transform 修改transform值页面闪动 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12850)
  + App-iOS平台 更新 云端打包环境 XCode 为 16.1 版、iOS SDK 为 18.1 版
* 【uts插件】
  + 新增 支持迭代协议 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/iterable.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=6511>
  + Web平台、App-iOS平台、微信小程序平台 新增 支持import type的用法 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/type-compatibility.html#import-type) <https://issues.dcloud.net.cn/pages/issues/detail?id=12941>
  + Web平台、微信小程序平台 修复 兼容模式组件查找错误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14305)
  + App平台 新增 UTSJSONObject 支持点号表示法访问属性。注意返回值类型为any [文档](https://doc.dcloud.net.cn/uni-app-x/uts/data-type.html#_1-%E6%93%8D%E4%BD%9C%E7%AC%A6) <https://issues.dcloud.net.cn/pages/issues/detail?id=11072>
  + App平台 修复 vue2项目下导出的class实例被vue响应式后调用方法报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13685&ask_id=202006)
  + App-Android平台 新增 优化number类型的实现 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/number.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=7119>
  + App-Android平台 新增 JSON.Parse 新增ignoreError参数，用于隐藏解析报错 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/json.html#parse) <https://issues.dcloud.net.cn/pages/issues/detail?id=13219>
  + App-Android平台 修复 JSON.parse<string> 解析失败时返回数据应该是输入参数 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13274)
  + App-Android平台 修复 4.25版本引发的 UTSJSONObject 包含 自定义type 类型数据时调用 toJSONObject 序列化可能异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13110)
  + App-Android平台 修复 数组every、some、filter、find、findIndex返回值类型推断不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12985)
  + App-Android平台 修复 split 函数返回结果与web不一致 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=10884)
  + App-Android平台 修复 java混编模式下，不能使用 console.log [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11532)
  + App-Android平台 修复 uni-app项目 uts插件中修改的代码真机运行到Android14及以上系统设备未生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14275)
* 【App插件(含5+App和uni-app的App端)】
  + Android平台 更新 uni-AD模块 泛连广告SDK为 2.8.1 版
  + Android平台 更新 一键登录使用的个验SDK为 3.2.0.0 版，修复安全检测报`receiver导出`风险问题 [详情](https://ask.dcloud.net.cn/question/202586)
  + Android平台 更新 云端打包环境 compileSdk 为 35、buildToolsVersion 为 35.0.0 、 Gradle 为 8.11.1 版、Android Gradle 插件为 8.7.3 版 [文档](https://uniapp.dcloud.net.cn/tutorial/app-env.html#android%E5%B9%B3%E5%8F%B0%E4%BA%91%E7%AB%AF%E6%89%93%E5%8C%85%E7%8E%AF%E5%A2%83)
  + Android平台 修复 配置 targetSdkVersion 为 35 后在安卓15设备页面底部内容可能会被系统按键导航栏盖住的Bug [详情](https://ask.dcloud.net.cn/question/202585)
  + iOS平台 更新 云端打包环境 XCode 为 16.1 版、iOS SDK 为 18.1 版
* 【uniCloud】
  + 修复 12月份之后新创建的腾讯云服务空间使用unicloud客户端SDK请求云函数时报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14037)
  + 修复 支付宝云数据库不支持arrayElemAt运算符的Bug [详情](https://ask.dcloud.net.cn/question/200275)
  + 修复 运行鸿蒙元服务/应用时，无法切换本地或者云端云函数运行的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=14038)

#### 4.36.2024112817
* 【uni-app】
  + 【重要】支持发布为鸿蒙元服务 [详情](https://uniapp.dcloud.net.cn/tutorial/mp-harmony/intro.html)
  + 【重要】App-HarmonyOS平台 调整 逻辑层从 ArkTS 环境加载改为使用 JSVM 加载 [详情](https://uniapp.dcloud.net.cn/tutorial/harmony/history.html)
  + 【重要】App-HarmonyOS平台 调整 项目 manifest.json 中的配置调整到和 app-plus 同级的 app-harmony 中
  + 修复 4.25版本引发的 vue3项目 static 目录条件编译失效的Bug [详情](https://ask.dcloud.net.cn/question/199019) [详情](https://ask.dcloud.net.cn/question/199184)
  + 修复 4.25版本引发的 vue3项目 三方依赖使用 require 加载 json 文件编译报错的Bug [详情](https://ask.dcloud.net.cn/question/199088) [详情](https://ask.dcloud.net.cn/question/199002) [详情](https://ask.dcloud.net.cn/question/198500)
  + Web平台 修复 input 设置maxLength 粘贴文本时不触发change事件的Bug [详情](https://ask.dcloud.net.cn/question/196650)
  + Web平台 调整 腾讯地图在 manifest.json 内的配置项由 qqmap 调整为 tencent，qqmap仍然支持 [详情](https://uniapp.dcloud.net.cn/collocation/manifest.html#h5sdkconfig)
  + 小程序平台 修复 vue3实例$children内的子组件没有动态删除的Bug [详情](https://github.com/dcloudio/uni-app/issues/5143)
  + 微信小程序平台 修复 补充store-home、store-product自定义节点 [详情](https://github.com/dcloudio/uni-app/issues/5135)
  + 微信小程序平台 修复 混合发布时运行生命周期报错的Bug [详情](https://ask.dcloud.net.cn/question/188049)
  + 小红书小程序平台 修复 分享微信群无法自定义标题和图片的Bug [详情](https://ask.dcloud.net.cn/question/198199)
  + App-Android/iOS平台 新增 API uni.getLocation 支持腾讯定位 [详情](https://uniapp.dcloud.net.cn/tutorial/app-geolocation.html#tencent)
  + App-Android/iOS平台 新增 地图组件、chooseLocation、openLocation 支持使用腾讯地图 [详情](https://uniapp.dcloud.net.cn/component/map.html)
  + App-Android/iOS平台 修复 swiper-item个数动态减少后渲染和交互异常的Bug [详情](https://ask.dcloud.net.cn/question/175252)
  + App-Android/iOS平台 修复 4.25版本引发的 vue3项目 页面组件setup情况下子组件无法通过$root.$scope获取getAppWebview的Bug [详情](https://ask.dcloud.net.cn/question/199111)
  + App-Android平台 修复 targetsdkVersion 设置大于等于33 webview 深色模式不生效的Bug [详情](https://ask.dcloud.net.cn/question/198181)
  + App-Android平台 修复 部分横屏设备上二级页面显示可能不全的Bug [详情](https://ask.dcloud.net.cn/question/166536)
  + App-HarmonyOS平台 新增 支持uni小程序SDK [详情](https://nativesupport.dcloud.net.cn/)
  + App-HarmonyOS平台 新增 支持 renderjs
  + App-HarmonyOS平台 新增 支持 uni.upx2px
  + App-HarmonyOS平台 新增 tabBar 支持 midButton
  + App-HarmonyOS平台 新增 发行制作 wgt 包时可勾选编译 sourcemap [详情](https://uniapp.dcloud.net.cn/uni-stat-v2.html#create-sourcemap)
  + App-HarmonyOS平台 新增 web-view 组件支持位置大小配置
  + App-HarmonyOS平台 新增 web-view 组件支持下载能力
  + App-HarmonyOS平台 新增 web-view 组件支持点击 tel 协议的 url
  + App-HarmonyOS平台 新增 picker 组件 fields 属性支持 month 和 year
  + App-HarmonyOS平台 修复 部分场景下拉刷新引发应用崩溃的Bug
  + App-HarmonyOS平台 修复 部分情况下快速返回页面应用报错的Bug
  + App-HarmonyOS平台 修复 部分情况下 tabBar 页面导航栏文字重叠的Bug
  + App-HarmonyOS平台 修复 组件 dataset 属性层级较深时，无法在事件内的 dataset 中获取的Bug
  + App-HarmonyOS平台 修复 web-view 组件部分操作导致崩溃的Bug
  + App-HarmonyOS平台 修复 web-view 组件在自定义组件内无法获取 context 的Bug
  + App-HarmonyOS平台 修复 web-view 组件接收消息格式错误的 Bug
  + App-HarmonyOS平台 修复 多个页面包含 web-view 组件时，webviewContext 方法混乱的bug
  + App-HarmonyOS平台 修复 picker 组件 mode="multiSelector" 数据变更时不联动的Bug [详情](https://ask.dcloud.net.cn/question/198236)
  + App-HarmonyOS平台 修复 picker 组件 mode="time" 时打开不显示 value 显示当前时间的Bug
  + App-HarmonyOS平台 修复 picker 组件 mode="date" 时选择日期后再打开日期不改变的Bug
  + App-HarmonyOS平台 修复 uni 接口 fail 回调内无法获取 errMsg 属性的Bug
  + App-HarmonyOS平台 新增 网络请求相关接口持久化保存 cookie，并且发送请求时会自动携带
  + App-HarmonyOS平台 新增 uni.getImageInfo 支持网络图片
  + App-HarmonyOS平台 新增 支持 uni.getAppAuthorizeSetting Api [详情](https://uniapp.dcloud.net.cn/api/system/getappauthorizesetting.html#getappauthorizesetting)
  + App-HarmonyOS平台 新增 支持 uni.getSystemSetting Api [详情](https://uniapp.dcloud.net.cn/api/system/getsystemsetting.html)
  + App-HarmonyOS平台 新增 支持 uni.compressImage Api [详情](https://uniapp.dcloud.net.cn/api/media/image.html#compressimage)
  + App-HarmonyOS平台 新增 支持 uni.shareWithSystem Api [详情](https://uniapp.dcloud.net.cn/api/plugins/share.html#sharewithsystem)
  + App-HarmonyOS平台 新增 uni.login 支持华为登录 [详情](https://uniapp.dcloud.net.cn/api/plugins/login.html#login)
  + App-HarmonyOS平台 新增 uni.setBackgroundColor [详情](https://uniapp.dcloud.net.cn/api/ui/bgcolor.html#setbackgroundcolor)
  + App-HarmonyOS平台 新增 uni.setBackgroundTextStyle [详情](https://uniapp.dcloud.net.cn/api/ui/bgcolor.html#setbackgroundtextstyle)
  + App-HarmonyOS平台 新增 uni.showNavigationBarLoading [详情](https://uniapp.dcloud.net.cn/api/ui/navigationbar.html#shownavigationbarloading)
  + App-HarmonyOS平台 新增 uni.hideNavigationBarLoading [详情](https://uniapp.dcloud.net.cn/api/ui/navigationbar.html#hidenavigationbarloading)
  + App-HarmonyOS平台 新增 uni.startLocationUpdateBackground [详情](https://uniapp.dcloud.net.cn/api/location/location-change.html#startlocationupdatebackground)
  + App-HarmonyOS平台 新增 uni.offWindowResize [详情](https://uniapp.dcloud.net.cn/api/ui/window.html#offwindowresize)
  + App-HarmonyOS平台 新增 uni.createMediaQueryObserver [详情](https://uniapp.dcloud.net.cn/api/ui/media-query-observer.html#createmediaqueryobserver)
  + App-HarmonyOS平台 新增 uni.getPushClientId、uni.onPushMessag、uni.offPushMessag、uni.createPushMessag、uni.setAppBadgeNumber Api
  + App-HarmonyOS平台 修复 页面内表单元素的 auto-focus 无法拉起键盘的 Bug
  + App-HarmonyOS平台 修复 网络请求返回非法 cookie 导致应用崩溃的Bug
  + App-HarmonyOS平台 修复 网络请求重定向时返回的 cookie 被设置到错误的 url 的Bug
  + App-HarmonyOS平台 修复 网络请求 api 访问 http 链接返回的 cookie 无法保存的Bug [详情](https://ask.dcloud.net.cn/question/200536)
  + App-HarmonyOS平台 修复 网络请求 api 在 url 非法时未进入任何回调的Bug
  + App-HarmonyOS平台 修复 uni.previewImage 在图片放大后无法移动的 Bug
  + App-HarmonyOS平台 修复 调用 web-view 组件 evalJs 等方法不生效的Bug
  + App-HarmonyOS平台 修复 web-view 组件无法加载沙盒中 html 文件的 Bug
  + App-HarmonyOS平台 修复 web-view 组件内请求摄像头、麦克风权限不生效的Bug [详情](https://ask.dcloud.net.cn/question/200562)
  + App-HarmonyOS平台 修复 canvas 组件绘制本地图片时因画布污染导致无法调用 canvasToTempFilePath 的 Bug [详情](https://ask.dcloud.net.cn/question/201151)
  + App-HarmonyOS平台 修复 uni.getImageInfo 获取某些图片的信息时报错的Bug
  + App-HarmonyOS平台 修复 uni.scanCode 返回的 code 类型不正确的Bug
  + App-HarmonyOS平台 修复 uni.openLocation 进入导航页面后点击页面自带的返回按钮白屏的Bug
  + App-HarmonyOS平台 修复 uni.uploadFile 仅传递 files 参数不传 filePath 参数时报错的Bug
  + App-HarmonyOS平台 修复 uni.canvasToTempFilePath 调用不触发回调的 Bug [详情](https://ask.dcloud.net.cn/question/199849)
  + App-HarmonyOS平台 修复 uni.compressImage 调用报错的Bug
  + App-HarmonyOS平台 修复 uni.request 设置的 cookie 对 webview 内部的资源请求无效的Bug
  + App-HarmonyOS平台 修复 网络请求返回多个 cookie 时 uni.request 返回的 cookies 字段格式错误的Bug
  + App-HarmonyOS平台 修复 使用 uni.addPhoneContact 添加后查看联系人有大片空白的Bug
  + App-HarmonyOS平台 修复 uni.showLoading 点击 mask 自动关闭的Bug
  + App-HarmonyOS平台 修复 uni.chooseImage 接口 sizeType 不生效的Bug
  + App-HarmonyOS平台 修复 uni.chooseImage 未勾选原图时未压缩图片的Bug
  + App-HarmonyOS平台 修复 uni.getLocation 接口部分情况下无法返回正确位置信息的Bug
  + App-HarmonyOS平台 修复 MapContext 上的方法回调不触发的Bug
  + App-HarmonyOS平台 修复 支付宝支付成功未触发成功回调的Bug
  + App-HarmonyOS平台 调整 调用 uni.getRecorderManager().start() 可不传参数
  + App-HarmonyOS平台 调整 WebviewContext evalJs 方法重命名为 evalJS，旧方法暂时保留但不推荐使用
  + App-HarmonyOS平台 调整 web-view 组件支持加载 https、http 混合内容
  + App-HarmonyOS平台 调整 web-view 组件内请求定位权限时不再额外弹窗
  + App-HarmonyOS平台 调整 web-view 组件内请求定位权限时自动申请 ohos.permission.LOCATION 权限
  + App-HarmonyOS平台 调整 Picker 组件 mode="multiSelector" 时在宽屏上的显示效果
  + App-HarmonyOS平台 调整 构造 UTSJSONObject 时不再递归所有属性的值
  + App-HarmonyOS平台 调整 鸿蒙项目默认仅保留基础的网络权限，其他权限需要在`harmony-configs`内自行配置
  + App-HarmonyOS平台 调整 腾讯地图、支付宝支付功能需要在`manifest.json -> 鸿蒙配置`中重新配置
  + App-HarmonyOS平台 调整 统一 userAgent 配置，web-view组件、网络请求遵循同一个 userAgent
  + App-HarmonyOS平台 调整 picker 组件禁用循环滚动
  + App-HarmonyOS平台 调整 web-view 组件允许加载 https 证书过期、错误的资源
  + App-HarmonyOS平台 调整 uni.navigateBack 不再判断页面有没有 webview 组件，直接返回。
  + App-HarmonyOS平台 调整 uni.saveImageToPhotosAlbum、uni.saveVideoToPhotosAlbum 不再申请权限
  + App-HarmonyOS平台 调整 uni.downloadFile、uni.saveFile 接口返回的 tempFilePath 不再添加 file 协议
* 【uni-app x】
  + 新增 vue 页面实例.options 及 onLoad 参数调整为 UTSJSONObject 类型 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-current-pages.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=9323>
  + 新增 API `uni.openDialogPage`、`uni.closeDialogPage` 打开和关闭模态弹框页面 [文档](https://doc.dcloud.net.cn/uni-app-x/api/dialog-page.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=3870>
  + 调整 API getApp 返回值类型为 UniApp，新增若干方法，并支持在uts插件中使用 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-app.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=3847>
  + 调整 API getCurrentPages 返回值类型为 UniPage数组，新增UniPage对象若干方法，并支持在uts插件中使用 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-current-pages.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=3847>
  + 新增 API eventBus 支持通过 id 移除自定义事件监听器，并支持在uts插件中使用 [文档](https://doc.dcloud.net.cn/uni-app-x/api/event-bus.html#on) <https://issues.dcloud.net.cn/pages/issues/detail?id=9068>
  + 新增 uni统计功能 [文档](https://uniapp.dcloud.net.cn/uni-stat-uniappx) <https://issues.dcloud.net.cn/pages/issues/detail?id=12350>
  + 修复 API uni.createCanvasContextAsync 在生命周期 onLoad/onMount 中无法获取width/height [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=13212)
  + Web平台、App-iOS平台 修复 vue reactive参数传一个对象字面量时返回的结果并不是UTSJSONObject [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=9175)
  + Web平台、App-iOS平台 修复 instanceof UniCloudError 的用法报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7848)
  + Web平台 修复 vue 使用defineModel编译告警 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=10257)
  + Web平台 修复 CSS rpx 通过style.setProperty设置rpx值无法响应屏幕宽度变化 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11256)
  + Web平台 修复 DOM API UniElement 在属性值为空字符串时错误的返回了null [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12306)
  + Web平台 修复 4.23版本引发的 运行调试 uni-app-x项目以SSR模式运行报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12179)
  + Web平台 调整 腾讯地图在 manifest.json 内的配置项由 qqmap 调整为 tencent，qqmap仍然支持 [详情](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html)
  + App平台 新增 编译器 优化uts类型推导 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/#%E7%B1%BB%E5%9E%8B%E8%87%AA%E5%8A%A8%E6%8E%A8%E5%AF%BC) <https://issues.dcloud.net.cn/pages/issues/detail?id=9967>
  + App平台 新增 组件 native-view组件和UniNativeViewElement，支持vue规范开发原生组件 [文档](https://doc.dcloud.net.cn/uni-app-x/component/native-view.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=3846>
  + App平台 新增 `标准模式`组件，即通过vue规范和native-view来开发原生组件 [文档](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-component-vue.html)
  + App平台 新增 组件 button 支持open-type=agreePrivacyAuthorization 用于同意隐私政策 [文档](https://doc.dcloud.net.cn/uni-app-x/component/button.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=8245>
  + App平台 新增 组件 map 地图 [文档](https://doc.dcloud.net.cn/uni-app-x/component/map.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=3849>
  + App平台 新增 uni-ad Android平台国内广告新增华为、倍孜、聚力阅盟、泛连渠道；App平台国内广告新增章鱼渠道 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-modules.html#uni-ad) <https://issues.dcloud.net.cn/pages/issues/detail?id=9102>
  + App平台 新增 组件 ad 信息流广告 [文档](https://doc.dcloud.net.cn/uni-app-x/component/ad.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=9414>
  + App平台 新增 API 隐私信息授权相关API [文档](https://doc.dcloud.net.cn/uni-app-x/api/privacy.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=7900>
  + App平台 新增 API uni.getAppBaseInfo 支持渠道包的channel渠道信息 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-app-base-info.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=8190>
  + App平台 新增 API uni.createInterstitialAd 插屏广告 [文档](https://doc.dcloud.net.cn/uni-app-x/api/create-interstitial-ad.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=7113>
  + App平台 新增 API uni.requestPayment 支付失败错误码 700607 和 700608 [文档](https://doc.dcloud.net.cn/uni-app-x/api/request-payment.html#irequestpaymentfail-values) <https://issues.dcloud.net.cn/pages/issues/detail?id=8366>
  + App平台 新增 API uni.chooseLocation 打开地图选择位置 [文档](https://doc.dcloud.net.cn/uni-app-x/api/choose-location.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=12430>
  + App平台 新增 API uni.shareWithSystem 调用系统分享 [文档](http://doc.dcloud.net.cn/uni-app-x/api/share-with-system.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=10687>
  + App平台 新增 API uni.chooseImage 支持 pageOrientation 参数适配横竖屏 [文档](https://doc.dcloud.net.cn/uni-app-x/api/choose-image.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=10683>
  + App平台 新增 API uni.chooseVideo 支持 pageOrientation 参数适配横竖屏 [文档](https://doc.dcloud.net.cn/uni-app-x/api/choose-video.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=12342>
  + App平台 新增 CSS 支持内置 uni-icon 字体图标 [文档](https://doc.dcloud.net.cn/uni-app-x/css/common/at-rules.html#uniicon) <https://issues.dcloud.net.cn/pages/issues/detail?id=11994>
  + App平台 新增 app.uvue 原生捕获异常触发应用生命周期onError [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/app.html#onerror) <https://issues.dcloud.net.cn/pages/issues/detail?id=7116>
  + App平台 优化 provider注册机制 [文档](https://doc.dcloud.net.cn/uni-app-x/api/provider.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=7394>
  + App平台 修复 编译器 在 windows 系统上运行同步文件可能不正常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=10570)
  + App平台 修复 4.2版本引发的 编译器 软链的插件编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7397)
  + App平台 修复 4.19版本引发的 pages.json 下拉刷新loading的样式设置backgroundTextStyle属性无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2537)
  + App平台 修复 vue 设置样式 display: flex 时，v-show="false" 首次渲染会显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11473)
  + App平台 修复 pages.json tabbar不支持字体图标在theme.json配置颜色 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11289)
  + App平台 修复 组件 list-view 组件的@scroll事件参数deltaY数据异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=9121)
  + App平台 修复 组件 canvas source-atop与web效果不一致 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11284)
  + App平台 修复 3.99版本引发的 组件 picker-view，给picker-view动态设置indicator-style、mask-top-style、mask-bottom-style无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6620)
  + App平台 修复 API getCurrentPages getPageStyle 返回页面样式信息不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=10274)
  + App平台 修复 API uni.loadFontFace 不支持 base64 格式数据URL [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12105)
  + App平台 修复 3.99版本引发的 CSS border 动态设置 boder/background 样式切换不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7236)
  + App-Android平台 新增 pages.json pageStyle支持隐藏状态栏和底部指示器，实现全屏效果 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/pagesjson.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=3854>
  + App-Android平台 新增 API uni.getFileSystemManager 文件管理模块支持Arraybuffer [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-file-system-manager.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=6881>
  + App-Android平台 新增 API uni.createInnerAudioContext 支持音频播放 [文档](https://doc.dcloud.net.cn/uni-app-x/api/create-inner-audio-context.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=10686>
  + App-Android平台 新增 API uni.chooseImage 支持 albumMode 参数配置使用系统相册选择图片 [文档](https://doc.dcloud.net.cn/uni-app-x/api/choose-image.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=12344>
  + App-Android平台 新增 API uni.chooseVideo 支持 albumMode 参数配置使用系统相册选择视频 [文档](https://doc.dcloud.net.cn/uni-app-x/api/choose-video.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=10685>
  + App-Android平台 新增 发行 云端打包支持aab格式 [文档](https://doc.dcloud.net.cn/uni-app-x/tutorial/app-package.html#aab) <https://issues.dcloud.net.cn/pages/issues/detail?id=7171>
  + App-Android平台 新增 发行 云端打包支持 aaptOptions、buildFeatures 配置 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#aaptoptions) <https://issues.dcloud.net.cn/pages/issues/detail?id=10770>
  + App-Android平台 新增 发行 云端打包支持 enableResourceOptimizations 配置关闭原生res资源文件名称混淆 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#enableresourceoptimizations) <https://issues.dcloud.net.cn/pages/issues/detail?id=12424>
  + App-Android平台 调整 页面内容可渲染到全面屏手势指示条区域 [详情](https://doc.dcloud.net.cn/uni-app-x/api/get-window-info.html#safearea)
  + App-Android平台 优化 API uni.$emit 支持不传参数或传多个参数 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11588)
  + App-Android平台 修复 vue UTSJSONObject使用keyPath不触发响应式变更 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8845)
  + App-Android平台 修复 vue keepAlive 组件切换时，触发了 update 生命周期 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7420)
  + App-Android平台 修复 vue app.config.globalProperties无法在app.uvue中使用 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=9417)
  + App-Android平台 修复 vue defineModel如果父级没有接收，则安卓没有变化 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8741)
  + App-Android平台 修复 vue 使用h()函数时无法使用具名插槽 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12388)
  + App-Android平台 修复 vue v-bind与其他绑定混合使用编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12488)
  + App-Android平台 修复 pages.json 横屏参数导致启动页面的时候会有一个切换的动作 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11147)
  + App-Android平台 修复 组件 scroll-view 安卓端4.23scroll-view子元素最后一个元素margin-bottom无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=3866)
  + App-Android平台 修复 组件 scroll-view 组件是list-item组件的子元素时可能会不显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6623)
  + App-Android平台 修复 4.18版本引发的 组件 scroll-view 嵌套滚动时 scroll-view触发了滚动行为但未触发@scroll事件 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7006)
  + App-Android平台 修复 3.91版本引发的 组件 swiper 在app端，swiper第一次触发@animationfinish事件得到detail中的source为空 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2342)
  + App-Android平台 修复 组件 text 设置宽高后文本无法修改为空 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=9870)
  + App-Android平台 修复 组件 rich-text 组件设置selectable为true时itemclick事件无法触发 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=285)
  + App-Android平台 修复 组件 video 全屏播放时点击返回键，直接返回到上一个页面了 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2184)
  + App-Android平台 修复 组件 video 返回桌面，在进入是黑屏，不是暂停到当前页面 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7689)
  + App-Android平台 修复 组件 canvas Contex.measureText 安卓端绘制文字会抖动 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6631)
  + App-Android平台 修复 组件 canvas Context2d arc方法counterclockwise默认值不对 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7107)
  + App-Android平台 修复 组件 canvas .toDataURL() 在部分安卓模拟器上卡顿 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7118)
  + App-Android平台 修复 组件 canvas 放在swiper里面无法绘制，可见current项可以绘制，但是切换之后回来绘制的内容就不见了  【安卓】 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7188)
  + App-Android平台 修复 组件 canvas 绘制的文字为空字符串会闪退 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8772)
  + App-Android平台 修复 组件 触发 @click 事件没有音效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11066)
  + App-Android平台 修复 组件 list-item 中的子元素在某些场景 boder 和 background-color 样式不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12341)
  + App-Android平台 修复 4.02版本引发的 组件 rich-text 中的 a 标签某些场景下可能出现点击不触发 itemclick 事件 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11051)
  + App-Android平台 修复 组件 video 云打包后应用static目录下视频无法播放 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12871)
  + App-Android平台 修复 API uni.setTabBarItem 【安卓端】uni.setTabBarItem设置iconfont报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=9969)
  + App-Android平台 修复 CSS transform 设置rotateX或者rotateY为180度时，view消失的bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=5570)
  + App-Android平台 修复 API uni.redirectTo 某些场景窗口动画失效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11158)
  + App-Android平台 修复 API push 某些情况点击离线消息不能触发 `click` 事件 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11268)
  + App-Android平台 修复 API push 模块使用的 gson 库可能与uts插件的依赖库冲突 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11861)
  + App-Android平台 修复 API uni.saveVideoToPhotosAlbum 云打包后保存应用static目录下的视频文件失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12867)
  + App-Android平台 修复 API uni.shareWithSystem shareWithSystem 云打包后应用static目录下文件无法分享 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12851)
  + App-Android平台 修复 API uni.downloadFile 部分情况下可能引起应用崩溃 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12869)
  + App-Android平台 修复 API uni.createInnerAudioContext 播放倍速仅支持平台专有Double数据类型而不支持number类型的 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12862)
  + App-iOS平台 新增 pages.json 支持 hideBottomNavigationIndicator 属性 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/pagesjson.html#pagesoptionspage-style) <https://issues.dcloud.net.cn/pages/issues/detail?id=10478>
  + App-iOS平台 新增 pages.json 支持 hideStatusBar 属性 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/pagesjson.html#pages-globalstyle) <https://issues.dcloud.net.cn/pages/issues/detail?id=10554>
  + App-iOS平台 新增 组件 video 支持子组件 [文档](https://doc.dcloud.net.cn/uni-app-x/component/video.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=10477>
  + App-iOS平台 新增 API eventBus 支持在UTS插件中使用 [文档](https://doc.dcloud.net.cn/uni-app-x/api/event-bus.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=9254>
  + App-iOS平台 新增 API uni.exit 支持在原生SDK环境中退出应用 [文档](https://doc.dcloud.net.cn/uni-app-x/api/exit.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=11654>
  + App-iOS平台 修复 组件 全局事件 onResize 回调参数缺少 size 数据 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8186)
  + App-iOS平台 修复 组件 picker-view pickerview 上下蒙版颜色设置被覆盖 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2600)
  + App-iOS平台 修复 组件 slider 设置滑块颜色不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=9361)
  + App-iOS平台 修复 组件 canvas : Path2D 绘制原点与 Context 绘制原点不一致 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8748)
  + App-iOS平台 修复 组件 canvas 中使用的 image 更新 src 时可能触发图片重复加载导致绘制异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11136)
  + App-iOS平台 修复 组件 rich-text 点击不会触发父组件 click 事件 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6986)
  + App-iOS平台 修复 组件 rich-text 设置固定高度时内容不显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=10999)
  + App-iOS平台 修复 组件 slider 设置的 max 不能整除 step 时滑动到最右侧返回值可能会大于 max [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12503)
  + App-iOS平台 修复 组件 canvas 在自定义组件中处理高清屏逻辑不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11696)
  + App-iOS平台 修复 4.23版本引发的 API uni.setTabBarStyle 设置backgroundColor或backgroundImage时borderColor受影响 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6567)
  + App-iOS平台 修复 4.25版本引发的 API uni.showActionSheet 适配横竖屏切换布局错乱 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8542)
  + App-iOS平台 修复 API uni.showToast 显示位置不正常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8123)
  + App-iOS平台 修复 API uni.chooseVideo 选择苹果手机拍摄的延时视频报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=9886)
  + App-iOS平台 修复 API uni.openDialogPage 可能无法遮挡原生 tabBar 的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11129)
  + App-iOS平台 修复 API uni.getDeviceInfo 返回的 deviceId 值异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11436)
  + App-iOS平台 修复 API uni.request 返回数据类型为不为UTSJSONObject [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11697)
  + App-iOS平台 修复 API uni.getWindowInfo 返回 safeArea 中的 bottom、height 属性值不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=10935)
  + App-iOS平台 修复 API uni.addInterceptor 【ios端】uni.addInterceptor拦截'switchTab'无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=10147)
  + App-iOS平台 修复 4.18版本引发的 DOM API UniResizeObserver 监视元素的大小变化可能导致内存泄露 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11451)
  + App-iOS平台 修复 4.25版本引发的 CSS border-radius 父视图添加圆角某些场景下无法裁剪子视图 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=10188)
* 【uts】
  + Web平台、App-iOS平台 修复 部分情况下非对象字面量as为UTSJSONObject时会对这个变量创建一个新的UTSJSONObject实例 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=9059)
  + App平台 修复 非根目录 config.json 资源文件打包后不存在 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8989)
  + App平台 修复 4.19版本引发的 uts加密插件包含easycom组件时，云打包报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=12775)
  + App-Android平台 新增 app-android 支持TextDecoder [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/textdecoder.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=9044>
  + App-Android平台 修复 4.21版本引发的 number类型的数据在改变之后显示为3.0，4.0，5.0..... [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6450)
  + App-Android平台 修复 Number 类型 toString 方法与web有差异 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6791)
  + App-Android平台 修复 响应式数组扩展运算结果为空 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7897)
  + App-Android平台 修复 typeof null 编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=9392)
  + App-Android平台 修复 h函数 第二个参数如何使用变量传入安卓只能使用Map,web端只能使用UTSJSONObject [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1337)
  + App-Android平台 修复 UTSJSONObject getXXX 数据不存在时期望返回null [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=9253)
  + App-Android平台 修复 4.25版本引发的 JSON.stringify  replacer 函数 key 参数类型 应该是 string [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=9242)
  + App-Android平台 修复 Math.round(NaN) 运行报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7509)
  + App-Android平台 修复 容器组件中子组件和排版相关的CSS样式设置无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6060)
  + App-Android平台 修复 4.26版本引发的 uts：调用返回参数为promise类型的函数会报UTS: targetFunction does not exists 错误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=10051)
  + App-iOS平台 新增 uts插件支持Promise [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/promise.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=3914>
  + App-iOS平台 修复 iOS uts组件 props 数组参数 没有作用 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8582)
* 【App插件(含5+App和uni-app的App端)】
  + 新增 uni-AD模块 国外广告 支持 Meta、Unity、Liftoff、inmobi、IronSource、Mintegral 等渠道（暂未开放，有需求的开发者在uniad的im群中申请）
  + 更新 uni-AD模块 腾讯优量汇SDK Android为 4.603.1473 版，iOS为 4.15.10 版；快手广告和快手内容联盟SDK Android为 3.3.69 版，iOS为 3.3.69 版；穿山甲&GroMore SDK Android为 6.4.1.6 版，iOS为 6.4.1.0 版；Sigmob广告联盟SDK Android为 4.19.5 版，iOS为 4.15.5 版；百度百青藤广告SDK iOS为 5.371 版；Octopus章鱼移动广告SDK Android为 1.6.1.6 版；Google AdMob SDK iOS 为 11.10.0 版；Pangle SDK iOS为 6.2.0.8 版
  + Android平台 新增 uni-AD模块 国内广告支持 泛连、聚力阅盟 等渠道
  + Android平台 新增 云端打包支持 aaptOptions 配置 [文档](https://uniapp.dcloud.net.cn/collocation/manifest-app.html#aaptoptions)
  + Android平台 新增 云端打包支持 enableResourceOptimizations 配置关闭原生res资源文件名称混淆 [文档](https://uniapp.dcloud.net.cn/collocation/manifest-app.html#enableresourceoptimizations)
  + Android平台 更新 登录模块 Facebook SDK 为 17.0.2 版，解决误删`com.google.android.gms.permission.AD_ID`权限的Bug
  + Android平台 更新 UniPush 谷歌渠道 使用的个推 SDK 为 4.4.3.13 版，解决部分Android14设备无法拉起应用的Bug
  + Android平台 修复 UniPush 使用的个推消息推送 SDK 默认获取IMSI、关联启动应用导致无法通过合规检测的Bug
  + Android平台 修复 云端打包证书密码中包含特殊字符时可能提示 `Keystore was tampered with, or password was incorrect` 错误的Bug [详情](https://ask.dcloud.net.cn/question/201240)
  + iOS平台 新增 uni-AD模块 支持 章鱼广告联盟 渠道
  + iOS平台 修复 音频播放 AudioPlayer 在 iOS16 及以下系统断开耳机时声音暂停了但没有回调 onPause 事件的Bug
  + Android平台 修复 UniPush 在部分高版本设备点击通知无法唤起应用的Bug [详情](https://ask.dcloud.net.cn/question/200520)
  + App-iOS平台 修复 视频选择开启压缩后在iphone16设备上无法触发回调的Bug [详情](https://ask.dcloud.net.cn/question/199797)
* 【uniCloud】
  + 【重要】 新增 uni云开发软件版私有化部署 [详情](https://doc.dcloud.net.cn/uniCloud/software)
  + 新增 手机号二三要素实名核验服务 [详情](https://doc.dcloud.net.cn/uniCloud/uni-rpia/mobile-verify/intro.html)
  + 新增 统一推送服务扩展库 uni-cloud-push 支持鸿蒙next [详情](https://doc.dcloud.net.cn/uniCloud/uni-cloud-push/api.html)
  + 修复 4.25版本引发的 本地运行云函数包含Redis时报"函数不允许调用"的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=10362)
  + 修复 本地开发时运行到APP/小程序平台，在uni-app控制台没有切换本地云函数和云端云函数按钮的Bug [详情](https://ask.dcloud.net.cn/question/200657)
  + 修复 新建云开发环境后，部分情况下uniCloud文件夹显示顺序不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=11421)

#### 4.29.2024093009
* 【uniapp】
  + 修复 4.28版本引发的 vue3项目 static 目录条件编译失效的Bug [详情](https://ask.dcloud.net.cn/question/199019) [详情](https://ask.dcloud.net.cn/question/199184)
  + 修复 4.28版本引发的 vue3项目 三方依赖使用 require 加载 json 文件编译报错的Bug [详情](https://ask.dcloud.net.cn/question/199088) [详情](https://ask.dcloud.net.cn/question/199002) [详情](https://ask.dcloud.net.cn/question/198500)
  + App平台 修复 4.28版本引发的 vue3项目 页面组件setup情况下子组件无法通过$root.$scope获取getAppWebview的Bug [详情](https://ask.dcloud.net.cn/question/199111)
* 【uts】
  + App-Android平台 修复 4.28版本引发的 UTSJSONObject 包含 number 类型数据时调用 toJSONObject 序列化可能异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=9447)
* 【App插件(含5+App和uni-app的App端)】
  + iOS平台 修复 iPhone 16 设备无法获取手机型号的Bug
  + iOS平台 修复 iOS 18 系统调用拨打电话等API失败的Bug [详情](https://ask.dcloud.net.cn/question/198814)
* 【uniCloud】
  + 修复 4.28版本引发的 只在分包中使用 uniCloud 导致无法运行/发行的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=9360)

#### 4.28.2024092502
* 【uni-app】
  + 【重要】开放鸿蒙next的运行、发行、生成wgt [详情](https://uniapp.dcloud.net.cn/tutorial/run/run-app-harmony.html)
  + Web平台 修复 image 的 widthFix 部分场景下表现异常的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1762)
  + Web平台 修复 App-vue平台 input组件的type属性渲染的Bug [详情](https://github.com/dcloudio/uni-app/issues/4800)
  + Web平台 修复 input组件中传入值为null时直接报错的bug [详情](https://ask.dcloud.net.cn/question/194772)
  + Web平台 修复 vue3自定义组件无法触发onReachBottom,onPageScroll事件的Bug [详情](https://ask.dcloud.net.cn/question/194675)
  + Web平台 修复 App.vue 同级存在 App.uvue 时运行报错的Bug
  + Web平台 修复 map在高德地图下calloutmap返回markerid为NaN的bug [详情](https://ask.dcloud.net.cn/question/195628)
  + 微信小程序平台 修复 xr-frame组件标签属性透传的Bug [详情](https://ask.dcloud.net.cn/question/196249)
  + 支付宝小程序平台 修复 button 处理 chooseAvatar 事件失败的Bug [详情](https://ask.dcloud.net.cn/question/195634)
  + 头条小程序平台 修复 开启 virtualHost 后添加 watch 页面卡住无反应的Bug [详情](https://ask.dcloud.net.cn/question/193756)
  + App-Android平台 修复 4.12版本引发的 部分场景下低版本webview语法错误的Bug [详情](https://ask.dcloud.net.cn/question/194534)
  + App-Android平台 修复 uni.chooseImage 选择`拍摄`可能会多次申请相机权限的Bug [详情](https://ask.dcloud.net.cn/question/194968)
  + App-iOS平台 修复 nvue map 组件使用 google 地图时 circles 无法删除的Bug [详情](https://ask.dcloud.net.cn/question/195622)
  + App-Android平台 更新 SoLoader SDK 为 0.10.5 版，解决因 SoLoader 版本低可能无法通过 GooglePlay 审核的问题 [详情](https://ask.dcloud.net.cn/question/197371)
  + App-Android平台 修复 合规检测可能报 `com.taobao.weex SDK 收集设备“AndroidID”` 的Bug [详情](https://ask.dcloud.net.cn/question/197538)
  + App-iOS平台 修复 nvue map 组件使用 v-if 指令设置为 false 时没有及时销毁原生地图实例的Bug
  + App-iOS平台 修复 nvue web-view 组件在某些情况可能会显示 js 源码的Bug [详情](https://ask.dcloud.net.cn/question/194214)
* 【uni-app x】
  + 新增 发行 原生SDK iOS版。可用于原生应用集成或本地打包 [文档](https://doc.dcloud.net.cn/uni-app-x/native) <https://issues.dcloud.net.cn/pages/issues/detail?id=4462>
  + 新增 编译器 uts插件支持kt、java、swift代码混编 [文档](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-plugin-hybrid.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=3913>
  + 新增 编译器 支持 import json 文件 [文档](https://uniapp.dcloud.net.cn/tutorial/page-json.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=2560>
  + 新增 编译器 支持 .env 文件配置环境变量 [文档](https://uniapp.dcloud.net.cn/tutorial/env.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=4254>
  + 新增 组件 canvas 及上下文对象 [文档](https://doc.dcloud.net.cn/uni-app-x/dom/unicanvaselement.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=3769>
  + 新增 API uni.createSelectorQuery 补充传入参数 node/filed [文档](https://doc.dcloud.net.cn/uni-app-x/api/create-selector-query.html#fields-%E5%85%BC%E5%AE%B9%E6%80%A7) <https://issues.dcloud.net.cn/pages/issues/detail?id=3263>
  + 修复 scroll-view的@scroll事件event参数中的detail类型报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2420)
  + 修复 编译器 前端付费插件依赖uts插件本地运行编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7323)
  + Web平台、App-iOS平台 调整 组件 switch 移除margin-right的5px 保持和Android一致 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6708)
  + Web平台、App-iOS平台 修复 scroll-view/list-view 动态设置 refresher-triggered 为 true 时没有触发 refresherpulling 事件 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2359)
  + Web平台 修复 组件 image 的widthFix部分场景下表现异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1762)
  + App平台 新增 API requestAnimationFrame/cancelAnimationFrame [文档](https://doc.dcloud.net.cn/uni-app-x/api/animation-frame.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=3832>
  + App平台 新增 API 全局 Path2D 类用于 canvas 绘制 [文档](https://doc.dcloud.net.cn/uni-app-x/api/path2d.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=6512>
  + App平台 新增 API 全局 Image 类用于 canvas 绘制 [文档](https://doc.dcloud.net.cn/uni-app-x/api/create-canvas-context-async.html#createimage) <https://issues.dcloud.net.cn/pages/issues/detail?id=6513>
  + App平台 新增 DOM API UniElement getAndroidView()/getIOSView() 获取原生view [文档](https://doc.dcloud.net.cn/uni-app-x/dom/unielement.html#getandroidview) <https://issues.dcloud.net.cn/pages/issues/detail?id=3844>
  + App平台 新增 API uni.getLaunchOptionsSync 返回参数补充 appLink/appScheme，获取通用链接和scheme启动参数 [文档](https://doc.dcloud.net.cn/uni-app-x/api/launch.html#getenteroptionssync) <https://issues.dcloud.net.cn/pages/issues/detail?id=2990>
  + App平台 新增 API uni.getEnterOptionsSync [文档](https://doc.dcloud.net.cn/uni-app-x/api/launch.html#getlaunchoptionssync) <https://issues.dcloud.net.cn/pages/issues/detail?id=5552>
  + App平台 新增 API provider开放自注册，并调整 uni.getProvider 的返回值命名 [文档](https://doc.dcloud.net.cn/uni-app-x/api/provider.html#getprovider) <https://issues.dcloud.net.cn/pages/issues/detail?id=5843>
  + App平台 新增 API uni.setAppBadgeNumber 设置桌面应用图标的角标 [文档](https://doc.dcloud.net.cn/uni-app-x/api/uni-push.html#setappbadgenumber) <https://issues.dcloud.net.cn/pages/issues/detail?id=4194>
  + App平台 新增 API uni.getLocation 内置腾讯定位，支持Provider属性来切换系统定位和腾讯定位 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-modules.html#uni-getlocation) <https://issues.dcloud.net.cn/pages/issues/detail?id=5666>
  + App平台 新增 API uni.chooseImage UI国际化 Android平台补充法语和西班牙语；iOS平台补充中文繁体、英语、法语和西班牙语 [文档](https://doc.dcloud.net.cn/uni-app-x/i18n.html#%E6%A1%86%E6%9E%B6%E5%86%85%E7%BD%AE%E7%BB%84%E4%BB%B6%E5%92%8Capi%E5%9B%BD%E9%99%85%E5%8C%96) <https://issues.dcloud.net.cn/pages/issues/detail?id=4162>
  + App平台 新增 API uni.chooseVideo UI国际化 Android平台补充法语和西班牙语；iOS平台补充中文繁体、英语、法语和西班牙语 [文档](https://doc.dcloud.net.cn/uni-app-x/i18n.html#%E6%A1%86%E6%9E%B6%E5%86%85%E7%BD%AE%E7%BB%84%E4%BB%B6%E5%92%8Capi%E5%9B%BD%E9%99%85%E5%8C%96) <https://issues.dcloud.net.cn/pages/issues/detail?id=5526>
  + App平台 新增 组件 canvas 支持绘制自定义字体 [文档](https://doc.dcloud.net.cn/uni-app-x/api/canvasrenderingcontext2d.html#custonfont) <https://issues.dcloud.net.cn/pages/issues/detail?id=5359>
  + App平台 调整 API uni.getWindowInfo 返回的 screenTop 属性废弃 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7095)
  + App平台 修复 3.99版本引发的 API uni.request 返回的数据是json字符串不会自动解析成UTSJSONObject [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=3116)
  + App平台 修复 DOM API CSSStyleDeclaration app端通过style.setProperty设置元素的border样式不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2446)
  + App-Android平台 新增 组件 video 支持子组件，可自定义全屏时的UI表现 [文档](https://doc.dcloud.net.cn/uni-app-x/component/video.html#children-tags) <https://issues.dcloud.net.cn/pages/issues/detail?id=4032>
  + App-Android平台 新增 发行 云端打包支持配置 packagingOptions [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest.html#distribute-android) <https://issues.dcloud.net.cn/pages/issues/detail?id=8067>
  + App-Android平台 新增 API uni.getAppAuthorizeSetting 补充相册、蓝牙的授权状态 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-app-authorize-setting.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=4378>
  + App-Android平台 新增 API uni.getPushChannelManager 获取推送渠道管理器。同时废弃uni.getChannelManager [文档](https://doc.dcloud.net.cn/uni-app-x/api/uni-push.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=5242>
  + App-Android平台 修复 4.02版本引发的 编译器 `<script setup>`导入外部文件定义的包含条件编译的props时编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6658)
  + App-Android平台 修复 vue v-slot与v-if/v-for结合使用时编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=5059)
  + App-Android平台 修复 组件 input 部分情况下，input在ScrollView中键盘弹起时，不会自动上推页面 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=5364)
  + App-Android平台 修复 组件 text 、button 横竖屏切换时文本渲染可能不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6001)
  + App-Android平台 修复 组件 scroll-view 设置上下padding或者border后可能会出现滚动条 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1930)
  + App-Android平台 修复 组件 scroll-view 设置scroll-into-view属性可能出现位置不对 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2598)
  + App-Android平台 修复 组件 scroll-view 横向滚动设置scrollleft scroll-with-animation="true"动画不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=4442)
  + App-Android平台 修复 组件 list-view @scroll事件参数event.detail中的scrollWidth为0 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2445)
  + App-Android平台 修复 组件 list-item 子组件复用后 event 事件可能触发异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=5160)
  + App-Android平台 修复 3.98版本引发的 组件 list-view listview中使用sticky-section和sticky-header新增数据显示不全 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2988)
  + App-Android平台 修复 组件 image 组件设置border后默认mode值效果不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2654)
  + App-Android平台 修复 3.99版本引发的 组件 input 设置password但不设置value会白屏 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2462)
  + App-Android平台 修复 组件 web-view 进度条color设置简写RGB颜色闪退 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2130)
  + App-Android平台 修复 组件 web-view pointer-events属性不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2621)
  + App-Android平台 修复 组件 video 点击播放时不显示播放控件 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=3982)
  + App-Android平台 修复 组件 video 中间播放按钮不清晰 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=5638)
  + App-Android平台 修复 组件 video controlstoggle事件可能不触发 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=5642)
  + App-Android平台 修复 组件 slider 横向多重嵌套排列的若干个slider 只有第一个可以正常拖动 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=4050)
  + App-Android平台 修复 API push 使用的个推消息推送 SDK 默认获取应用列表、位置相关信息可能导致无法通过合规检测 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8054)
  + App-Android平台 修复 API uni.getImageInfo 云端打包后获取图片信息可能失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7688)
  + App-Android平台 修复 API uni.getVideoInfo 云端打包后获取视频信息可能失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8332)
  + App-Android平台 修复 4.21版本引发的 vue v-for循环JSON.parse出来的数值运行时报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=3807)
  + App-Android平台 修复 app.uvue 应用生命周期（如onLaunch）中发生异常时错误信息不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2007)
  + App-Android平台 修复 3.97版本引发的 CSS overflow 组件设置overflow:visible样式后，通过transform:translate移动组件，位置偏差 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2406)
  + App-Android平台 修复 4.13版本引发的 CSS overflow 组件设置overflow:visible时，点击事件分发错误的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2481)
  + App-Android平台 修复 4.13版本引发的 CSS overflow 设置overflow: visible后hover-class会失效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2490)
  + App-Android平台 修复 3.99版本引发的 CSS border 某些情况下border-color与background-image同时设置时，颜色异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=4996)
  + App-Android平台 修复 运行调试 离线打包基座，targetSdk34下真机运行失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2424)
  + App-Android平台 修复 发行 app运行时修改部分系统设置后返回app可能会白屏 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=273)
  + App-Android平台 修复 4.14版本引发的 CSS overflow 多级子 view 全部设置 overflow 为 visible 后点击 view 可能引起崩溃 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6957)
  + App-Android平台 修复 uni-AD 上架小米应用市场提示`未经用户同意，存在收集SD卡数据的行为` [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7896)
  + App-iOS平台 新增 组件 list-item 支持复用 [文档](https://doc.dcloud.net.cn/uni-app-x/component/list-item.html#list-item%E5%A4%8D%E7%94%A8%E6%9C%BA%E5%88%B6) <https://issues.dcloud.net.cn/pages/issues/detail?id=6744>
  + App-iOS平台 新增 pages.json 支持配置页面横屏 pageOrientation 属性 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/pagesjson.html#pagesoptionspage-style) <https://issues.dcloud.net.cn/pages/issues/detail?id=6743>
  + App-iOS平台 新增 API uni.requestVirtualPayment / uni.getVirtualPaymentManager 苹果应用内支付IAP [文档](https://doc.dcloud.net.cn/uni-app-x/api/virtual-payment.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=3843>
  + App-iOS平台 新增 API navigator 支持 animationType 设置页面动画 [文档](https://doc.dcloud.net.cn/uni-app-x/api/navigator.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=5641>
  + App-iOS平台 新增 API uni.compressImage 支持压缩图片 [文档](https://doc.dcloud.net.cn/uni-app-x/api/compress-image.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=4844>
  + App-iOS平台 新增 API uni.getImageInfo 支持获取图片信息 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-image-info.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=4847>
  + App-iOS平台 新增 API uni.getVideoInfo 支持获取视频信息 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-video-info.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=4851>
  + App-iOS平台 新增 API uni.compressVideo 支持压缩视频 [文档](https://doc.dcloud.net.cn/uni-app-x/api/compress-video.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=4852>
  + App-iOS平台 新增 API uni.getElementById 可在 uts 插件中使用 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-element-by-id.html#getelementbyid) <https://issues.dcloud.net.cn/pages/issues/detail?id=5573>
  + App-iOS平台 新增 API uni.getPerformance 获取性能数据 [文档](https://doc.dcloud.net.cn/uni-app-x/api/get-performance.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=3018>
  + App-iOS平台 修复 组件 全局属性和事件 根节点 template 不包含子元素时页面 onReady 事件不会触发 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2386)
  + App-iOS平台 修复 组件 scroll-view/list-view refresherabort 事件返回的 dy 值不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=5349)
  + App-iOS平台 修复 组件 list-view 列表加载内容过多应用闪退 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2043)
  + App-iOS平台 修复 组件 list-view 自定义下拉刷新动画结束时首部的 sticky-header 组件复位动画异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2412)
  + App-iOS平台 修复 组件 list-view 动态增删子元素布局可能会错乱 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2787)
  + App-iOS平台 修复 组件 list-view/scroll-view 下拉刷新事件 refresherabort 可能不触发 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2448)
  + App-iOS平台 修复 组件 swiper 属性autoplay设置true，首次横向滑动切换@transition事件参数e.detail.dy错误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2426)
  + App-iOS平台 修复 组件 text 嵌套后对不齐 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2259)
  + App-iOS平台 修复 组件 button 同时设置setProperty和attributes样式不完全生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=5017&ask_id=193724)
  + App-iOS平台 修复 组件 input 当view添加touch事件后可能导致隐藏键盘的事件没有触发 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2258)
  + App-iOS平台 修复 组件 input placeholderStyle 不支持设置字体大小 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=4068)
  + App-iOS平台 修复 组件 rich-text click 事件不触发及点击时父节点的 click 事也不触发 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6613)
  + App-iOS平台 修复 组件 web-view 组件监听 touchstart事件后和webview自身手势冲突，造成部分网页上下滑动异常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=5472)
  + App-iOS平台 修复 组件 rich-text 设置 border 后高度会自动增加 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6989)
  + App-iOS平台 修复 组件 rich-text 动态设置内容后组件高度未更新 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6991)
  + App-iOS平台 修复 组件 textarea auto-height:true时设置height，再切换为false恢复的高度不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6561)
  + App-iOS平台 修复 组件 input 光标颜色失效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8521)
  + App-iOS平台 修复 组件 input 动态更新某些属性可能导致cursor-spacing失效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8530)
  + App-iOS平台 修复 API uni.getLocation 腾讯定位默认配置 UIBackgroundModes 为 location [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8052)
  + App-iOS平台 修复 API uni.getImageInfo 非首次获取网络图片信息失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8457)
  + App-iOS平台 修复 API uni.setTabBarStyle 取消设置backgroundImage后backgroundColor受影响的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6587)
  + App-iOS平台 修复 API push 默认使用的发送通知许可描述不准确导致上架 AppStore 审核可能被拒 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7001)
  + App-iOS平台 修复 API uni.showModal uni.showModel 连续弹出无法关闭的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2466)
  + App-iOS平台 修复 API uni.setTabBarItem 设置visible无法隐藏某项item [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2547)
  + App-iOS平台 修复 CSS box-shadow 不显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2399)
  + App-iOS平台 修复 CSS border-style 无法动态移除 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6680)
  + App-iOS平台 修复 CSS flex-flow 使用缩写排版效果不稳定 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=3855)
  + App-iOS平台 修复 CSS border-width 动态修改某些css属性可能导致border-width恢复为默认值的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6624)
  + App-iOS平台 修复 发行 云端打包uts插件中的framework动态库不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8150)
  + App-iOS平台 修复 tabBar 页面无法横屏显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=8185)
  + App-iOS平台 修复 页面关闭后某些类未全部释放销毁 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6064)
  + App-iOS平台 修复 页面、应用 onLoad，应用 onShow 回调参数没有对中文解码 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6280)
  + App-iOS平台 修复 pages.json tabbar是纯文字时，没有居中，并且文字超出不显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2521&ask_id=190221)
  + App-iOS平台 修复 vue 通过 this.data 赋值ref和查询元素不全等 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=3520)
* 【uts】
  + Web平台 新增 UTSJSONObject 补齐 keys、assign 方法 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/utsjsonobject.html#%E9%9D%99%E6%80%81%E6%96%B9%E6%B3%95) <https://issues.dcloud.net.cn/pages/issues/detail?id=4370>
  + Web平台 修复 JSON.parse接收方法父级作用域传入的泛型时报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=5074)
  + 【重要】App平台 调整 JS环境中调用`uts插件`导出的方法中的回调函数参数默认只能触发一次，解决频繁调用这类方法可能引起内存泄露的问题，此调整会影响需持续触发的回调函数参数，适配方法参考[文档](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-plugin.html#keepalive)
  + App平台 新增 支持通过装饰器(注解)的方式定义回调函数是否一直存活 [文档](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-plugin.html#keepalive) <https://issues.dcloud.net.cn/pages/issues/detail?id=8436>
  + App-Android平台 新增 ArrayBuffer [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/arraybuffer.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=3770>
  + App-Android平台 新增 atob,btoa 方法 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/global.html#atob-encodeddata-string-string) <https://issues.dcloud.net.cn/pages/issues/detail?id=2709>
  + App-Android平台 新增 JSON.stringify 支持 replacer、space 参数 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/json.html#stringify-value-replacer-space) <https://issues.dcloud.net.cn/pages/issues/detail?id=1183>
  + App-Android平台 新增 Date构造函数 支持的日期字符串与浏览器保持一致 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/date.html#date) <https://issues.dcloud.net.cn/pages/issues/detail?id=4518>
  + App-Android平台 新增 String 支持 isWellFormed/toWellFormed [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/string.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=3479>
  + App-Android平台 新增 RegExp 不支持空构造/常规字面量 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/buildin-object-api/regexp.html#regexp) <https://issues.dcloud.net.cn/pages/issues/detail?id=3705>
  + App-Android平台 新增 UTSAndroid.requestSystemPermission 增加shallUnCheck 选项，用来忽略异常检测 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#requestsystempermission) <https://issues.dcloud.net.cn/pages/issues/detail?id=2346>
  + App-Android平台 修复 uts API加密插件发行时编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=3467)
  + App-Android平台 修复 3.91版本引发的 UTS插件在uniapp项目上运行报错，‌error: Unresolved reference: getMainExecutor‌ [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6345)
  + App-Android平台 修复 函数返回的UTSJSONObject属性下的数据对象为空 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=6735)
  + App-Android平台 修复 UTSJSONObject 检索内部属性耗时过多 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=5147)
  + App-Android平台 修复 无法声明 RegExpExecArray 类型 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=5529)
  + App-iOS平台 修复 对class属性赋值时，没有触发属性的setter方法 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1951)
  + App-iOS平台 修复 调用uts代码参数中包含callback时，UTSCallback在内存中未释放 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2288)
* 【uniCloud】
  + 新增 uni-app x 客户端 SDK 支持连接支付宝云 WebSocket API [详情](https://doc.dcloud.net.cn/uniCloud/websocket.html#unicloud-connectwebsocket)
  + 新增 云函数中获取当前运行环境标识 [详情](https://doc.dcloud.net.cn/uniCloud/cf-callfunction.html#context)
  + 调整 uni-app-x 安卓端 UniCloudError detail 属性类型由必备调整为不必备
  + 调整 uni-app-x 安卓端 导出 UniCloudChooseAndUploadFileItem、UniCloudChooseAndUploadFileItem 类型到全局
  + 修复 uni-app-x 发行到安卓时项目内使用了uniCloud对象但是未关联服务空间时发行报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=3826)
  + 修复 支付宝云 Nodejs18 版本使用安全网络报错的Bug [详情](https://ask.dcloud.net.cn/question/191326)
  + 修复 4.18 版本引发的 上传云函数安装依赖时报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=7190)
* 【App插件(含5+App和uni-app的App端)】
  + Android平台 新增 uni-AD模块 支持 Octopus章鱼移动广告 和 AdScope倍孜广告 [文档](https://uniapp.dcloud.net.cn/uni-ad.html)
  + Android平台 更新 uni-AD模块 Google AdMob SDK 为 23.2.0 版；Pangle SDK 为 6.2.0.0 版
  + Android平台 更新 云端打包环境 compileSdk 为 34、buildToolsVersion 为 34.0.0 、 Gradle 为 8.5 版、Android Gradle 插件为 8.2.2 版、JDK 为 Amazon corretto 17.0.12.7.1 版 [文档](https://uniapp.dcloud.net.cn/tutorial/app-env.html#android%E5%B9%B3%E5%8F%B0%E4%BA%91%E7%AB%AF%E6%89%93%E5%8C%85%E7%8E%AF%E5%A2%83)
  + Android平台 修复 部分小米设备启动应用立即申请`发送通知`权限，解决小米商城审核问题 [详情](https://ask.dcloud.net.cn/question/194065)
  + Android平台 修复 高德地图可能被检测报频繁采集数据，解决vivo商城审核问题 [详情](https://ask.dcloud.net.cn/question/194104)
  + Android平台 修复 设置 targetSdkVersion 大于等于 29 时自定义启动图可能显示异常的Bug [详情](https://ask.dcloud.net.cn/question/195273)
  + Android平台 修复 UniPush 使用的个推消息推送 SDK 默认获取应用列表、位置相关信息可能导致无法通过合规检测的Bug
  + iOS平台 更新 云端打包环境 XCode 为 15.4 版、iOS SDK 为 17.5 版
  + iOS平台 更新 uni-AD模块 穿山甲&Gromore SDK 为 6.4.0.1 版
  + iOS平台 修复 音频播放 AudioPlayer 被其他三方中止播放时没有回调 pause 事件的Bug
  + iOS平台 修复 音频播放 AudioPlayer 在弱网环境下触发 onWaiting 后可能不触发 onPlay 的Bug

#### 4.24.2024072208
* 【uni-app】
  + App平台 修复 uni.chooseLocation 页面获取当前位置报错的Bug [详情](https://ask.dcloud.net.cn/question/195066)
  + Web平台 修复 使用腾讯定位/地图时获取 gcj02 坐标系位置失败的Bug [详情](https://ask.dcloud.net.cn/question/195113)
* 【uni-app-x】
  + Web平台 修复 使用腾讯定位/地图时获取 gcj02 坐标系位置失败的Bug [详情](https://ask.dcloud.net.cn/question/195113)

#### 4.23.2024070804
* 【uni-app】
  + 修复 4.0版引出的 vue2 项目普通目录下的 static 目录被编译器复制到输出目录的Bug [详情](https://ask.dcloud.net.cn/question/190650)
  + 修复 input 组件 type="digit" 时，Web 和 App 上无法输入小数点的Bug [详情](https://ask.dcloud.net.cn/question/190763)
  + Web平台 修复 当 router.base 为 ./ 时，部分情况下 image 引用图片加载不成功的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1570)
  + Web平台 修复 Vue3 项目暗黑模式下，theme.json 中配置 tabbar 的 iconPath 或 selectedIconPath 或 midButton -> backgroundImage 的路径不以 / 开头时在发行模式下图片 404 不显示的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2472)
  + Web平台 修复 在 iOS 16 系统中，input type="digit" 时无法删除小数点的Bug [详情](https://ask.dcloud.net.cn/question/193171)
  + Web平台 修复 API uni.getVideoInfo 返回的 size 属性单位不为KB的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2250)
* 【uni-app-x】
  + Web平台 新增 服务端渲染（ssr） [详情](https://doc.dcloud.net.cn/uni-app-x/web/ssr.html)
  + Web平台 新增 $setPageStyle、$getPageStyle 支持 backgroundColorContent 属性 [详情](https://doc.dcloud.net.cn/uni-app-x/api/get-current-pages.html#setpagestyle)
  + Web平台 补齐 API UniResizeObserver 监视 UniElement 元素的大小变化 [详情](https://doc.dcloud.net.cn/uni-app-x/dom/uniresizeobserver.html)
  + Web平台 调整 去除 uni-text、uni-input、uni-textarea、uni-view 组件根节点的`color: black`样式
  + Web平台 修复 pages.json 下拉刷新默认背景色不为透明的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1726)
  + Web平台 修复 暗黑模式下，theme.json 中配置 tabbar 的 iconPath 或 selectedIconPath 或 midButton -> backgroundImage 的路径不以 / 开头时在发行模式下图片 404 不显示的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2472)
  + Web平台 修复 组件 input/textarea 同时设置 modelValue 和 value 显示效果不一致的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2236)
  + Web平台 修复 组件 list-item 包含在自定义组件内时在 list-view 内不显示的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2199)
  + Web平台 修复 API uni.getAppBaseInfo、uni.getSystemInfo 内缺少部分属性的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1917)
  + Web平台 修复 API uni.getVideoInfo 返回的 size 属性单位不为KB的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2250)
  + Web平台 修复 API $getPageStyle获取到的对象不是UTSJSONObject的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1916)
* 【uts】
  + Web平台 App-iOS平台 调整 uts 编译为 js 时 any 类型调整为包含 null 类型 [详情](https://doc.dcloud.net.cn/uni-app-x/uts/type-compatibility.html#any%E7%B1%BB%E5%9E%8B)
  + Web平台 App-iOS平台 修复 JSON.parse传入泛型为Map时报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1985)
* 【uniCloud】
  + 调整 客户端调用本地云函数时如果连接不到本地调试服务则自动切换为连接云端云函数。
  + 调整 客户端请求云函数、云对象的 clientInfo 内仅保留部分字段，移除 oaid、safeAreaInsets 等信息，避免 vivo 商店报警 [详情](https://doc.dcloud.net.cn/uniCloud/cf-functions.html#get-client-infos)
  + 新增 客户端API uniCloud.setCustomClientInfo 用于自定义客户端信息 [详情](https://doc.dcloud.net.cn/uniCloud/client-sdk.html#set-custom-client-info)
  + 新增 uni-app-x 项目支持 multiSend [详情](https://doc.dcloud.net.cn/uni-app-x/api/unicloud/database.html#multisend)
  + 新增 扩展存储新增管理端接口 getDomains、getCdnTop，可用于实时监听cdn流量 [详情](https://doc.dcloud.net.cn/uniCloud/ext-storage/dev.html#getdomains)
  + 新增 扩展存储新增CDN流量监控告警定时任务模板 [详情](https://doc.dcloud.net.cn/uniCloud/ext-storage/dev.html#cdnsecurewarn)
  + 修复 ip防刷部分条件下不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2063)
  + 修复 上传云函数时 npm install 报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2180)
  + 修复 初始化向导没有上传schema扩展js的配置的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2289)
  + 修复 导入插件时不支持支付宝云的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=2290)

#### 4.15.2024050802
* 【uni-app 插件】
  + Web平台 修复 4.14版本引出的 因升级vue版本导致 部分事件监听报错的Bug [详情](https://ask.dcloud.net.cn/question/190670)
  + Web平台 修复 4.14版本引出的 因升级vue版本导致 css内使用v-bind且值包含rpx时无效的Bug [详情](https://ask.dcloud.net.cn/question/190828)
  + Web平台 修复 4.14版本引出的 因升级vite版本导致 ssr运行报错的Bug [详情](https://ask.dcloud.net.cn/question/190830)
  + App平台 修复 4.14版本引出的 scroll-view下拉刷新样式丢失的Bug [详情](https://ask.dcloud.net.cn/question/190805)
  + 微信小程序平台 修复 4.14版本引出的 因微信skyline支持 span 标签导致的编译异常 [详情](https://ask.dcloud.net.cn/question/190418)
* 【uni-app-x】
  + Web平台 修复 4.14版本引出的 因升级vue版本导致 css内使用v-bind且值包含rpx时无效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1830)
  + App-Android平台 修复 组件 image 设置 mode 为 widthFix 在部分场景图片显示可能不完整的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1764)
  + App-Android平台 修复 UniElement 获取 offsetLeft 属性值异常的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1539)
  + App-iOS平台 新增 组件 textarea 支持 confirm-type 属性 [详情](https://doc.dcloud.net.cn/uni-app-x/component/textarea.html)
  + App-iOS平台 修复 API $setPageStyle 动态设置页面容器背景色不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1837)
  + App-iOS平台 修复 API $setPageStyle page.json 中设置页面 enablePullDownRefresh 为 false 时，无法通过 $setPageStyle 方法动态开启页面下拉刷新的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1838)
  + App-iOS平台 修复 API uni.setNavigationBarColor 传入非法值时导航栏背景色变为白色的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1841)
* 【uniCloud】
  + 修复 4.14版本引出的 调用本地云函数时云函数调用其他云函数报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1708)

#### 4.14.2024043013
* 【uni-app 插件】
  + 【重要】Web平台 调整 vue版本由3.2.47升级为3.4.21，支持defineOptions、defineModel、toValue等新特性
  + Vue3 项目 升级编译器依赖的 vite 版本为5.2.8
  + Web平台 修复 vue3版本 scroll-view无法使用自定义下拉刷新的Bug
  + Web平台 修复 onNavigationBarSearchInputClicked 生命周期 在部分浏览器下不触发的Bug [详情](https://ask.dcloud.net.cn/question/189465)
  + App平台 修复 vue3 项目配置原生js混淆后，云打包运行不正常的Bug [详情](https://ask.dcloud.net.cn/question/190488)
  + App平台 修复 Vue2 cli项目使用 webpack5.x 时，部分情况下资源文件找不到的Bug [详情](https://ask.dcloud.net.cn/question/188778)
  + 微信小程序平台 新增 支持的skyline内置组件：draggable-sheet、grid-builder、list-builder、nested-scroll-body、nested-scroll-header、open-container、 share-element、snapshot、span [详情](https://ask.dcloud.net.cn/question/178372)
  + 百度小程序平台 修复 public静态资源引入路径有误导致icons不显示的问题 [详情](https://ask.dcloud.net.cn/question/189033)
  + 支付宝小程序平台 新增 支持 join-group-chat、subscribe-message 开放组件 [详情](https://ask.dcloud.net.cn/question/190053)
* 【uni-app-x】
  + 【重要】新增 编译到iOS平台
  + 【重要】Web平台 调整 vue版本由3.2.47升级为3.4.21，支持defineOptions、defineModel、toValue等新特性
  + 新增 API $getPageStyle 和 $setPageStyle，获取和设置pages.json的页面style [详情](https://doc.dcloud.net.cn/uni-app-x/api/get-current-pages.html)
  + 新增 云对象及云函数调用时支持传泛型 [云对象客户端API文档](https://doc.dcloud.net.cn/uni-app-x/api/unicloud/object.html)、[云函数客户端API文档](https://doc.dcloud.net.cn/uni-app-x/api/unicloud/function.html)
  + 编译器 修复 script 节点内语法报错时，行号不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1290)
  + Web平台、App-iOS平台 补齐 $callMethod 支持调用 defineExpose 导出的方法 [详情](https://doc.dcloud.net.cn/uni-app-x/component/#callmethod)
  + Web平台、App-iOS平台 修复 构造UniError时不支持无参数及一个参数的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1455)
  + Web平台、App-Android平台 调整 统一了组件 switch 关闭时的背景色
  + Web平台 调整 页面默认字体为`"-apple-system", HelveticaNeue;`，iOS上与系统字体保持一致
  + Web平台 补齐 pages.json 中配置 backgroundColorContent [详情](https://doc.dcloud.net.cn/uni-app-x/collocation/pagesjson.html#pages-globalstyle)
  + Web平台 新增 组件 scroll-view、list-view支持自定义下拉刷新 [详情](https://doc.dcloud.net.cn/uni-app-x/component/scroll-view.html)
  + Web平台 修复 css内使用v-bind无效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1370)
  + Web平台 修复 组件 input、textarea 在 disable 状态下设置 cursor 样式无效的Bug
  + Web平台 修复 组件 input、textarea 的 maxlength 无法限制 uts 内设置的值的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1204)
  + Web平台 调整 组件 input、textarea 的 maxlength 调整为传入非法值时不限制长度
  + Web平台 修复 组件 textarea 动态切换 autoHeight 不能实时生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1502)
  + Web平台 修复 组件 navigator 子元素部分样式无效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1025)
  + Web平台 调整 组件 progress 的 percent 属性传入非法值时显示为0%，此前为NaN
  + Web平台 修复 API uni.request返回数组时错误的处理为了UTSJSONObject的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1582)
  + Web平台 调整 Api 界面相关（showLoading、showToast、showModal、showActionSheet）样式调整，对齐App端
  + Web平台 修复 构造UniError时不支持无参数及一个参数的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1455)
  + App平台 调整 组件 web-view 的 message 事件回调参数 detail.data 类型为 Array<UTSJSONObject>，load、loading 事件回调参数 detail.url 为 detail.src 属性 [详情](https://doc.dcloud.net.cn/uni-app-x/component/web-view.html#%E4%BA%8B%E4%BB%B6)
  + App-Android平台 新增 computed 支持类型自动推导 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=833)
  + App-Android平台 新增 v-for 指令支持循环Map、Set对象 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1200)
  + App-Android平台 修复 编译器 Windows 系统 本机不含 vcruntime 时编译报错的Bug [详情](https://ask.dcloud.net.cn/question/187931)
  + App-Android平台 修复 编译器 静态引入 static 目录中的只读资源，编译可能报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=992)
  + App-Android平台 修复 编译器 项目下包含云对象但是页面内未使用uniCloud时云打包报错的Bug
  + App-Android平台 修复 编译器 uts插件打包自定义基座后，编译报错依赖找不到的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1379)
  + App-Android平台 修复 uts 插件内 easycom 组件不能正常使用的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1034)
  + App-Android平台 修复 vue 复杂的响应式对象修改后可能不触发页面渲染的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1123)
  + App-Android平台 修复 vue 模板上文本插值Map、Set类型不显示实际内容的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1182)
  + App-Android平台 修复 vue defineProps 定义 any 类型属性时编译报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1198)
  + App-Android平台 修复 vue ref 类型数据在模板上插值显示不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1344)
  + App-Android平台 修复 vue script setup 下 defineSlots 定义作用域插槽编译报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1551)
  + App-Android平台 修复 vue script setup 下定义 ref 类型绑定 v-model 时，编译可能报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1338)
  + App-Android平台 修复 vue script setup 下函数声明不能递归调用的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1312)
  + App-Android平台 修复 vue keep-alive 和 component 结合使用，切换打开过的组件可能出现空白的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1189)
  + App-Android平台 修复 4.02版引出的 运行时异常信息显示不正确[详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1518)
  + App-Android平台 修复 template 节点运行时异常导致应用闪退的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1578)
  + App-Android平台 新增 页面 style 配置项支持 pageOrientation 来实现横屏或自旋转适应 [详情](https://doc.dcloud.net.cn/uni-app-x/collocation/pagesjson.html#pages-json)
  + App-Android平台 新增 组件 nested-scroll-header、nested-scroll-body 更简单的嵌套滚动组件 [详情](https://doc.dcloud.net.cn/uni-app-x/component/nested-scroll-header.html)
  + App-Android平台 新增 组件 scroll-view 支持 type 属性设置 `nested` 嵌套模式 [详情](https://doc.dcloud.net.cn/uni-app-x/component/scroll-view.html#nested-scroll-view)
  + App-Android平台 新增 组件 web-view 支持 horizontalScrollBarAccess、verticalScrollBarAccess 属性设置是否显示横向、竖向滚动条 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=598)
  + App-Android平台 修复 组件 view 设置 overflow 为 visible 时超出父元素区域无法响应点击和触摸事件的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=157)
  + App-Android平台 修复 组件 scroll-view 子元素设置 overflow 为 visible 不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1175)
  + App-Android平台 修复 组件 swiper 嵌套 scroll-view 后触发下拉刷新可能会阻碍 swiper 左右滑动的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1231)
  + App-Android平台 修复 组件 list-view 的 show-scrollbar 属性默认不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1050)
  + App-Android平台 修复 组件 sticky-header 吸顶后可能与 list-view 下拉刷新区域重叠的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1242)
  + App-Android平台 修复 组件 sticky-header 吸顶后部分场景中可能被 list-view 覆盖的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1241)
  + App-Android平台 修复 组件 input、textarea 未设置 placeholder 时设置 placeholder-style 可能引起异常崩溃的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1042)
  + App-Android平台 修复 组件 input、textarea 在 scroll-view 中获取焦点可能被弹出软键盘遮挡的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1128)
  + App-Android平台 修复 组件 input、textarea 的 keyboardheightchange 事件返回的键盘高度可能不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1158)
  + App-Android平台 修复 组件 input、textarea 在某些情况下可能被输入法遮挡的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=947)
  + App-Android平台 修复 组件 input 设置 password 属性先于 value 属性可能导致 value 不显示的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=990)
  + App-Android平台 修复 组件 textarea 设置 auto-height 导致高度异常的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1298)
  + App-Android平台 修复 组件 web-view 加载的网页中 `<input type="file"/>` 文件选择不支持 multiple 属性的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=541)
  + App-Android平台 修复 组件 web-view 加载网页默认无法显示全部宽度且无法缩放的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1047)
  + App-Android平台 修复 组件 web-view 无法获取精准位置信息的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1563)
  + App-Android平台 修复 组件 video 无法加载本地绝对路径资源的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=786)
  + App-Android平台 修复 组件 video 设置 header 属性无效Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1210)
  + App-Android平台 修复 组件 slider 宽度发生变化或父容器大小发生变化后显示错乱的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=296)
  + App-Android平台 新增 API uni.requestPayment 支持微信支付 [详情](https://doc.dcloud.net.cn/uni-app-x/api/request-payment.html)
  + App-Android平台 新增 API FileSystemManager 支持 appendFile、readCompressedFile 等文件操作方法 [详情](https://doc.dcloud.net.cn/uni-app-x/api/get-file-system-manager.html)
  + App-Android平台 新增 API uni.$off 支持第二个参数为可选 [详情](https://doc.dcloud.net.cn/uni-app-x/api/event-bus.html#off)
  + App-Android平台 新增 DOM API UniResizeObserver 监视 UniElement 元素的大小变化 [详情](https://doc.dcloud.net.cn/uni-app-x/dom/uniresizeobserver.html)
  + App-Android平台 新增 CSS transition-property 支持 `all` 和 `none`，默认值调整为 `all`
  + App-Android平台 修复 CSS position 设置 absolute 时父元素的 padding 布局与 web 不一致的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1219)
  + App-Android平台 修复 CSS background-image 属性动态修改不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1160)
  + App-Android平台 修复 CSS font-size 属性动态修改后文本高度可能不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=377)
  + App-Android平台 修复 CSS z-index 可能引发下标越界异常的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1077)
  + App-Android平台 修复 CSS white-space 属性为 nowrap 时 text-overflow 的 ellipsis 效果可能不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=959)
  + App-Android平台 修复 退出应用时会可能短暂显示白屏的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=896)
  + uni-ui 新增 `<uni-recycle-view>`虚拟长列表组件，解决长列表初始化卡顿和内存占用问题 [详见](https://ext.dcloud.net.cn/plugin?id=17385)
* 【uts插件】
  + 编译器 修复 Windows 平台 编译器相关动态库没有数字签名导致可能被某些防病毒软件拦截进而导致编译失败的Bug
  + Web平台 修复 解构时默认值无法覆盖null的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1076)
  + App平台 优化 API插件模板中 unierror.uts 错误对象构造函数，兼容 web 平台使用
  + App平台 修复 interface 中可选属性可能编译不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1202)
  + App平台 修复 正则表达式包含双引号时编译报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1428)
  + App-Android平台 修复 声明 UTSJSONObject 类型后，无法二次赋值的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=851)
  + App-Android平台 修复 switch 语句 default 语句仅包含 break 时，编译报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=852)
  + App-Android平台 修复 String.match 与web平台不一致的Bug [详情]( https://issues.dcloud.net.cn/pages/issues/detail?id=835)
  + App-Android平台 修复 RegExp.exec 匹配的捕获组结果与web平台不一致的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=954)
  + App-Android平台 修复 Date toISOString/toJSON 返回日期数据可能偏差一天的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1464)
  + App-iOS平台 修复 对象字面量 a s成 uni-module app-js 内的 type 时未能转为指定类型的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1314)
  + App-iOS平台 修复 if else 空语句时编译报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1351)
  + App-iOS平台 修复 class定义无参 constructor 时编译报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1342)
  + App-iOS平台 修复 class定义 boolean 类型的 getter、setter 时编译报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1332)
* 【App插件(含5+App和uni-app的App端)】
  + 【重要】iOS平台 新增 支持隐私清单，满足Appstore从5月1日起的新合规要求 [文档](https://uniapp.dcloud.net.cn/tutorial/app-ios-privacyinfo.html)
  + 更新 uni-AD 腾讯优量汇SDK iOS为 4.14.70 版；穿山甲&GroMore SDK iOS为 6.0.0.5 版；快手广告SDK Android为 4.14.32 版，iOS为 3.3.63 版；快手内容联盟SDK Android为 4.14.32 版，iOS为 3.3.61 版；Sigmob广告联盟SDK iOS为 4.12.4 版；百度百青藤广告SDK iOS为 5.34 版；Google AdMob SDK iOS为 11.2.0 版；
  + 调整 uni-AD 广告对象 getProvider 方法和激励视频对象 onVerify 回调事件中返回的广告提供商标识取值范围为 china、global
  + Android平台 更新 统计模块 友盟统计 SDK 为 9.6.8 版 [详情](https://ask.dcloud.net.cn/question/189922)
  + Android平台 更新 UniPush使用的个推核心组件 SDK 为 3.2.13.0 版；个推SDK为 3.3.5.0 版，解决合规检测报频繁收集信息的Bug [详情](https://ask.dcloud.net.cn/question/188266)
  + Android平台 修复 手动杀死进程可能会报 java.util.ConcurrentModificationException 的Bug [详情](https://ask.dcloud.net.cn/question/186990)
  + Android平台 修复 plus.downloader.createDownload 在部分设备设置文件保存路径非法时，下载成功后返回的 filename 不正确的Bug [详情](https://ask.dcloud.net.cn/question/188982)
  + iOS平台 更新 推送模块 FCM SDK 为 10.23.1 版
  + iOS平台 更新 统计模块 Google 统计 SDK 为 10.23.1 版
  + iOS平台 更新 登录模块 Facebook SDK 为 17.0.0 版；Google SDK 为 7.1.0 版
  + iOS平台 修复 离线SDK集成 PDFNet.framework 运行时闪退的Bug
  + iOS平台 修复 一键登录 更换移动手机卡可能仍然返回上一个手机号的Bug
  + iOS平台 修复 atob 处理特定字符串可能异常的Bug
  + iOS平台 修复 原生插件中使用共享文件报无权限错误的Bug
* 【uniCloud】
  + 修复 4.07 版本引出的无法上传至前端网页托管的Bug [详情](https://ask.dcloud.net.cn/question/188503)

#### 4.08.2024040127
* 【App插件(含5+App和uni-app的App端)】
  + Android平台 更新 地图/定位模块 高德地图 SDK 为10.0.600 版，高德定位 SDK 为 6.4.3 版，解决在部分设备可能定位失败的Bug [详情](https://ask.dcloud.net.cn/question/187119)
* 【uniCloud】
  + 修复 4.07 版本引出的无法上传至前端网页托管的Bug [详情](https://ask.dcloud.net.cn/question/188503)

#### 4.07.2024032720
* 【uni-app 插件】
  + Web平台、APP平台 修复 4.06版引出的 button 更改 border-radius 后边框样式不对的Bug [详情](https://ask.dcloud.net.cn/question/188417)
* 【uni-app x 插件】
  + Web平台 修复 4.06版引出的 button 更改 border-radius 后边框样式不对的Bug
* 【uniCloud】
  + 修复 上传/下载所有公共模块时HBuilderX控制台无响应的Bug [详情](https://ask.dcloud.net.cn/question/188162)
  + 修复 Web发行目录从H5调整为Web后，导致的上传前端网页托管失败的Bug

#### 4.06.2024032513
* 【uni-app 插件】
  + 微信小程序平台 新增 `uni.requestVirtualPayment` 虚拟支付API [详情](https://uniapp.dcloud.net.cn/api/plugins/virtualPayment.html)
  + App平台 修复 wgt热更新后无法调用 uts 加密插件的Bug [详情](https://ask.dcloud.net.cn/question/187762)
  + App平台 修复 制作应用 wgt 包时包含 uts 插件的Bug [详情](https://ask.dcloud.net.cn/question/181181)
  + App平台 修复 uni.getFileSystemManager 错误提示信息不准确的Bug [详情](https://ask.dcloud.net.cn/question/184457)
  + App平台 修复 Vue2 项目 nvue 页面引用不到非 static 目录静态资源的Bug
  + App-Android平台 修复 应用非首次启动可能偶发崩溃的Bug
  + App-Android平台 修复 uni.getStorageSync 特定情况可能丢失字符的Bug [详情](https://ask.dcloud.net.cn/question/187167)
  + App-Android平台 修复 nvue textarea 组件特定情况可能引起崩溃的Bug [详情](https://ask.dcloud.net.cn/question/187514)
  + App平台 修复 Vue2 Cli 项目 nvue 页面编译报错的Bug [详情](https://ask.dcloud.net.cn/question/186784)
  + App-Android平台 新增 API uni.getChannelManager，获取通知渠道管理器 [详情](https://uniapp.dcloud.net.cn/api/plugins/push.html#getChannelManager)
  + App-Android平台 修复 首次安装调用 uni.scanCode 可能会出现黑屏的Bug [详情](https://ask.dcloud.net.cn/question/185913)
  + App-Android平台 修复 uni.chooseLocation 安装后首次调用无法获取位置列表的Bug [详情](https://ask.dcloud.net.cn/question/183239)
  + App-Android平台 修复 nvue swiper 组件内嵌 swiper 设置 disable-touch 时外层 swiper 无法滑动的Bug
  + Web平台 修复 Vue3 项目自动化测试 element.input 方法报错的Bug [详情](https://ask.dcloud.net.cn/question/184815)
  + Web平台 修复 Vue3 项目 ssr 运行报错的Bug [详情](https://ask.dcloud.net.cn/question/185205)
  + Web平台 修复 Vue3 项目 ssr 打包报错的Bug [详情](https://ask.dcloud.net.cn/question/184125)
  + Web平台 调整 navigator组件真实渲染出的节点中a标签由uni-navigator标签外部移动到uni-navigator标签内部
  + Web平台 新增 vue3 scroll-view 组件支持 show-scrollbar 属性
  + Web平台、App-Vue平台 新增 input 组件支持 cursor-color 属性 [详情](https://uniapp.dcloud.net.cn/component/input.html#input)
  + Web平台、App-Vue平台 新增 textarea 组件支持 cursor-color 属性 [详情](https://uniapp.dcloud.net.cn/component/textarea.html#textarea)
  + Web平台 修复 Vue2 项目打包后静态资源重复的Bug [详情](https://ask.dcloud.net.cn/question/184480)
  + Web平台 优化 vue3 项目 getCurrentPages() 返回 options 属性 [详情](https://ask.dcloud.net.cn/question/183580)
  + 抖音小程序平台 新增 组件支持 virtualHost 配置 [详情](https://uniapp.dcloud.net.cn/tutorial/vue3-api.html#其他配置)
  + 抖音小程序平台 修复 Vue3 项目使用插件时属性丢失的Bug [详情](https://ask.dcloud.net.cn/question/185513)
  + 抖音小程序平台 修复 Vue2 项目使用国际化报错的Bug [详情](https://ask.dcloud.net.cn/question/161008)
  + 微信小程序平台 修复 Vue2 项目 workers 配置为对象报错的Bug [详情](https://github.com/dcloudio/uni-app/issues/4589)
  + 微信小程序平台 修复 Vue2 项目 class 换行导致小程编译报错的Bug [详情](https://ask.dcloud.net.cn/question/184192)
  + 抖音小程序平台 修复 rtc-room 组件属性无效的Bug [详情](https://github.com/dcloudio/uni-app/issues/4627)
  + 支付宝小程序平台 修复 globalObjectMode 配置为 enable 编译报错的Bug [详情](https://ask.dcloud.net.cn/question/183499)
  + 支付宝小程序平台 修复 原生小程序组件传递 props 无效的Bug [详情](https://github.com/dcloudio/uni-app/issues/4376)
  + 小程序平台 修复 页面内有较大的 base64 字符时编译慢的Bug [详情](https://github.com/dcloudio/uni-app/issues/4661)
* 【uni-app x 插件】
  + Web平台 修复 部分情况下picker-view、picker-view-column值显示错误并额外触发了change事件的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1009)
  + Web平台 优化 减少编译耗时
  + Web平台 修复 uni.rpx2px在项目发行后调用报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=930)
  + Web平台 修复 instanceof UniXXXElement 报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=940)
  + Web平台 调整 运行到浏览器时将script标签内代码编译为可以在低版本浏览器运行的兼容代码
  + Web平台 新增 组件 list-view、list-item组件 [详情](https://doc.dcloud.net.cn/uni-app-x/component/list-view.html)
  + Web平台 新增 组件 sticky-section、sticky-header组件 [详情](https://doc.dcloud.net.cn/uni-app-x/component/sticky.html)
  + Web平台 修复 部分场景下类型推断时未将对象字面量作为UTSJSONObject使用的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=819)
  + Web平台 修复 类型字面量内带有any[]时无法正确创建实例的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=767)
  + Web平台 修复 非全局声明的type在变量声明为此类型时不会自动创建实例的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=782)
  + Web平台 修复 vue $forceUpdate未能更新内置组件插槽内容的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=776)
  + Web平台 修复 使用热更新uts文件内新导出的type时报找不到导出的type的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=823)
  + Web平台 修复 API request、uploadFile、downloadFile接口timeout参数传null时会直接超时的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=805)
  + Web平台 新增 绑定class、style时支持Map类型 [详情](https://doc.dcloud.net.cn/uni-app-x/vue/#class-%E4%B8%8E-style-%E7%BB%91%E5%AE%9A)
  + Web平台 调整 类型校验失败由报错调整为警告且不中断编译
  + Web平台 调整 navigator组件真实渲染出的节点中a标签由uni-navigator标签外部移动到uni-navigator标签内部
  + Web平台 调整 getStorage、getStorageSync接口返回对象类型数据时转化为UTSJSONObject类型
  + Web平台 调整 request接口返回的data转化为UTSJSONObject类型
  + Web平台 修复 未使用到的easycom组件内包含错误或web端不支持的用法导致编译报错的Bug
  + Web平台 修复 部分场景下对象字面量as为指定类型时报错的Bug
  + Web平台 修复 引用.uvue文件时未带后缀提示找不到模块的Bug
  + Web平台 修复 部分场景下uts文件内使用条件编译无效的Bug
  + 【重要】新增 编译到Web平台 [详情](https://doc.dcloud.net.cn/uni-app-x/web/)
  + App-Android平台 修复 组件 button 设置 hover-class 属性在特定情况与web平台效果不一致的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=1028)
  + App-Android平台 修复 组件 text 内容从非空设置为空文本无效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=950)
  + App-Android平台 修复 组件 text 设置高度后无法修改文本内容的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=981)
  + App-Android平台 修复 APP-PLUS 条件编译的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=910)
  + 修复 3.98版引出的 pages.json 检查页面文件是否存在时，部分条件编译不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=909)
  + App-Android平台 新增 API uni.requestPayment，支持支付宝支付 [详情](https://doc.dcloud.net.cn/uni-app-x/api/request-payment.html)
  + App-Android平台 修复 API uni.showActionSheet 点击列表项会触发 fail 回调的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=832)
  + App-Android平台 修复 API uni.setStorage 储存纯数字字符串后取出来类型会变成`number`的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=652)
  + App-Android平台 修复 组件 button 渲染宽高与Web端不一致的问题 [详情](https://doc.dcloud.net.cn/uni-app-x/component/button.html)
  + App-Android平台 修复 组件 text 无文本内容时组件宽度不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=777)
  + App-Android平台 修复 组件 text 子组件设置 background-color 样式无效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=276)
  + App-Android平台 修复 组件 text 子组件无法修改文本内容的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=562)
  + App-Android平台 修复 组件 image 请求网络图片无法共享cookie的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=820)
  + App-Android平台 修复 组件 list-item 动态调整宽高不生效的Bug [详情](https://ask.dcloud.net.cn/question/185517)
  + App-Android平台 修复 组件 list-view 部分场景修改refresher-triggered属性值域可能不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=796)
  + App-Android平台 修复 组件 list-view 部分场景删除插槽子元素报错Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=769)
  + App-Android平台 修复 tabBar 配置 pagePath 有误时点击 tab 切换崩溃的Bug[详情](https://issues.dcloud.net.cn/pages/issues/detail?id=779)
  + App-Android平台 修复 使用 UTSAndroid.getJavaClass 获取导入的类时可能编译报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=809)
  + App-Android平台 优化 type类型响应式对象的构造方式，避免使用反射，优化性能
  + App-Android平台 修复 关联其他项目的服务空间并使用其中的云对象时报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=817)
  + App-Android平台 修复 unicloud-db组件，使用 setup 语法，作用域插槽中无法使用data的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=761)
  + App-Android平台 修复 云对象返回数字错误码时报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=840)
  + App-Android平台 修复 从非 tab 页面切换到 tab 页面动画异常的Bug [详情](https://ask.dcloud.net.cn/question/187078)
  + App-Android平台 更新 云端打包环境 compileSdkVersion 为 34
  + App-Android平台 新增 组件 公共属性 `android-layer-type` 支持配置视图渲染模型，开启硬件加速 [详情](https://doc.dcloud.net.cn/uni-app-x/component/common.html#android-layer-type)
  + App-Android平台 修复 特殊元素(list-view等)删除插槽内子元素报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=388)
  + App-Android平台 修复 data 中定义的变量名，与外部导入的变量同名时，引发运行时报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=701)
  + App-Android平台 修复 pages.json 中使用条件编译时，可能报错 must contain at least 1 page 的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=690)
  + App-Android平台 修复 仅使用 easycom 组件类型编译报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=678)
  + App-Android平台 修复 @import 引入的 scss 文件内部条件编译不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=671)
  + App-Android平台 修复 组件里import uts文件路径不对，但编译时不会指向正确的源码的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=275)
  + App-Android平台 修复 组件 input 默认高度计算不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=693)
  + App-Android平台 修复 组件 input 设置 value 属性后首次输入文字时 input 事件不触发的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=699)
  + App-Android平台 修复 组件 textarea 行高计算不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=695)
  + App-Android平台 修复 组件 textarea 多行滚动时不显示滚动条的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=694)
  + App-Android平台 修复 组件 input、textarea 获取焦点弹出的软键盘隐藏时关闭页面可能引起异常崩溃的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=716)
  + App-Android平台 修复 组件 image 的 src 属性设置 `file:///android_asset/` 格式图片路径无法正常显示的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=723)
  + App-Android平台 修复 组件 video 播放PCM音频格式的视频可能没有声音的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=713)
  + App-Android平台 修复 API uni.createSelectorQuery 无法查询根节点的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=672)
  + 【重要】App-Android平台 新增 vue 组合式 API [详情](https://doc.dcloud.net.cn/uni-app-x/vue/#composition-api)
  + 【重要】调整 组件事件类型名称增加 Uni 前缀，避免与浏览器全局事件冲突 [详情](https://doc.dcloud.net.cn/uni-app-x/component/common.html#rename-event-type)
  + 编译器 修复 pages.json 中 APP-ANDROID、APP-IOS 不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=523)
  + App-Android平台 新增 uni-ad 激励视频广告 [详情](https://doc.dcloud.net.cn/uni-app-x/api/create-rewarded-video-ad.html)
  + App-Android平台 新增 vue 内置组件 KeepAlive [详情](https://doc.dcloud.net.cn/uni-app-x/vue/#component)
  + App-Android平台 新增 vue 内置组件 Teleport [详情](https://doc.dcloud.net.cn/uni-app-x/vue/#component)
  + App-Android平台 新增 vue watch 支持 deep、immediate 配置 [详情](https://doc.dcloud.net.cn/uni-app-x/vue/#options-api-compatibility)
  + App-Android平台 新增 vue 组件 props 支持字符串数组方式声明，此时所有 prop 类型为 any | null [详情](https://doc.dcloud.net.cn/uni-app-x/component/#props)
  + App-Android平台 新增 API 监听权限申请事件，适用于应用商店要求申请权限时弹出用途说明 [详情](https://doc.dcloud.net.cn/uni-app-x/api/create-request-permission-listener.html)
  + App-Android平台 新增 css变量 [详情](https://doc.dcloud.net.cn/uni-app-x/css/#variable)
  + App-Android平台 新增 CSS white-space [详情](https://doc.dcloud.net.cn/uni-app-x/css/white-space)
  + App-Android平台 新增 pages.json 中 backgroundColorContent 配置页面容器背景色 [详情](https://doc.dcloud.net.cn/uni-app-x/collocation/pagesjson.html#pages-globalstyle)
  + App-Android平台 新增 组件 input、textarea 支持 hold-keyboard [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=291)
  + App-Android平台 新增 组件 input 的 blur 事件回调参数支持 cursor 属性 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=512)
  + App-Android平台 调整 二级页面导航栏标题文字居中显示
  + App-Android平台 调整 组件 scroll-view、list-view 设置横向或纵向滚动属性为 direction，设置回弹效果属性为 bounces [详情](https://doc.dcloud.net.cn/uni-app-x/component/scroll-view.html)
  + App-Android平台 调整 组件 scroll-view、list-view 默认高度为子元素高度之和，即默认不出现滚动条，需通过 css 属性设置容器高度才会出现滚动条 [详情](https://doc.dcloud.net.cn/uni-app-x/component/scroll-view.html#app%E5%B9%B3%E5%8F%B0)
  + App-Android平台 调整 组件 view 的 hover-class 按下状态在组件区域内移动不会取消，移动到组件区域外才会取消 [详情](https://doc.dcloud.net.cn/uni-app-x/component/view.html#app)
  + App-Android平台 调整 组件 click/tap 事件在组件区域内移动不会取消，移动到组件区域外才会取消 [详情](https://doc.dcloud.net.cn/uni-app-x/component/common.html#tap)
  + App-Android平台 调整 组件 text 渲染 baseline 计算逻辑，靠近浏览器渲染逻辑
  + App-Android平台 调整 组件 input、textarea 点击输入框外的屏幕，默认关闭软键盘
  + App-Android平台 调整 组件 input 的 font-size 默认值为 16px
  + App-Android平台 调整 组件 textarea 的 font-size 默认值为 16px，line-height 默认值为 1.2em，width 默认值为300px [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=492)
  + App-Android平台 调整 组件 web-view 默认宽高为100%
  + App-Android平台 调整 组件 web-view 网页加载完成事件名称 loaded 改为 load
  + App-Android平台 调整 组件 video 默认宽度为300px，高度为225px [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=457)
  + App-Android平台 调整 API uni.getSystemInfo、uni.getAppBaseInfo 返回的uni编译器版本属性命名中的`Compile`改为`Compiler` [详情](https://doc.dcloud.net.cn/uni-app-x/api/get-system-info.html)
  + App-Android平台 调整 css transition-duration 动画时长不设置单位时不再当做毫秒，统一为web的策略，必须设置单位，无单位当做非法值，造成动画不生效 [详情](https://doc.dcloud.net.cn/uni-app-x/css/transition-duration.html)
  + App-Android平台 修复 template 非预期的将 object 编译为 map 的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=244)
  + App-Android平台 修复 部分组件嵌套导致页面关闭时无法回收的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=535)
  + App-Android平台 修复 MuMu模拟器多次切换页面后再次进入白屏的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=436)
  + App-Android平台 修复 vue 不同组件同名props且default均为通过Function返回时，默认值被污染的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=374)
  + App-Android平台 修复 vue 组件配置 mixins，emits 丢失 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=348)
  + App-Android平台 修复 组件 scroll-view 设置 border 导致滚动视图显示不完整的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=510)
  + App-Android平台 修复 组件 scroll-view 动态修改 refresher-default-style 属性不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=641)
  + App-Android平台 修复 组件 scroll-view 的 show-scrollbar 属性默认值不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=648)
  + App-Android平台 修复 组件 scroll-view 开启下拉刷新，设置 padding 属性后滚动条位置异常的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=661)
  + App-Android平台 修复 组件 swiper 监听 animationfinish 事件可能不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=502)
  + App-Android平台 修复 组件 swiper 设置 autoplay 未设置 circluar 滚动到顶没有从头开始运行的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=556)
  + App-Android平台 修复 组件 swiper 相互嵌套时只能滚动外层 swiper 的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=558)
  + App-Android平台 修复 组件 swiper 在 scroll-view 中滑动效果异常的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=500)
  + App-Android平台 修复 组件 list-view 嵌套在 scroll-view 中反复滚动后可能出现无法再滚动的Bug[详情](https://issues.dcloud.net.cn/pages/issues/detail?id=289)
  + App-Android平台 修复 组件 list-view 设置隐藏再显示可能无法正常显示内容的Bug[详情](https://issues.dcloud.net.cn/pages/issues/detail?id=283)
  + App-Android平台 修复 组件 sticky-header 在部分场景吸顶位置与父容器顶部位置存在偏移的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=323)
  + App-Android平台 修复 组件 text 多次更新后高度计算不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=563)
  + App-Android平台 修复 组件 input、textarea 在 list-view 中复用时内容异常的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=382)
  + App-Android平台 修复 组件 input、textarea 的 auto-focus 属性多次生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=491)
  + App-Android平台 修复 组件 input、textarea 的 cusor、selection-start、selection-end 属性多次设置不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=516)
  + App-Android平台 修复 组件 textarea 监听 focus 事件返回可能导致闪退的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=609)
  + App-Android平台 修复 组件 textarea 设置 padding 尺寸不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=618)
  + App-Android平台 修复 组件 image mode 属性设置为 widthFix、heightFix 显示效果不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=493)
  + App-Android平台 修复 组件 image 设置 border-radius 时 mode 属性失效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=332)
  + App-Android平台 修复 组件 video 在 list-view 中使用可能出现异常的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=288)
  + App-Android平台 修复 组件 click/tap 事件在连续点击操作时因触发双击导致丢失事件的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=364)
  + App-Android平台 修复 CSS height 小于 padding 时排版高度计算不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=496)
  + App-Android平台 修复 CSS flex-basis 为百分比父节点存在 padding 时排版换行计算不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=352)
  + App-Android平台 修复 CSS flex 设置为 1 且最外层和叶子结点未设置高度时排版高度计算不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=497)
  + App-Android平台 修复 CSS position 设置为 fixed 节点相互嵌套时，动态更新内层节点不显示的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=537)
  + App-Android平台 修复 CSS transition、transform 同时设置后动态修改 transform 可能不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=353)
  + App-Android平台 修复 CSS transition、transform 同时设置后在系统`开发者选项`中关闭所有动画 transform 可能不执行的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=634)
  + App-Android平台 修复 API uni.toast、uni.showModal等交互反馈弹窗在 onShow 生命周期调用可能无法正常显示的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=520)
  + App-Android平台 修复 API uni.request、uni.uploadFile、uni.downloadFile 等网络请求无法共享 cookie 的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=335)
  + App-Android平台 修复 API uni.showModal、uni.showActionSheet 交互反馈弹窗通过手势操作关闭不触发 `complete` 回调的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=597)
  + App-Android平台 修复 API uni.showModal 弹窗在英文系统中 `确认` 按钮上的文字不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=589)
  + App-Android平台 修复 API Event 事件对象通过 JSON.stringify 输出字符串内容不全的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=495)
  + App-Android平台 修复 API uni.saveImageToPhotosAlbum 可能无法保存 `static` 目录下图片的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=525)
  + App-Android平台 修复 API uni.previewImage 可能无法保存 `static` 目录下图片的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=524)
  + App-Android平台 修复 API uni.getWindowInfo 在页面 onReady 生命周期获取 windowHeight 可能不准确的Bug[详情](https://issues.dcloud.net.cn/pages/issues/detail?id=260)
  + App-Android平台 修复 API uni.getStorageSync 获取保存为 json 格式字符串数据返回空字符串的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=572)
  + App-Android平台 修复 DOM API UniElement 对象的 getBoundingClientRect() 方法，在页面 onResize 生命周期获取元素的 DOMRect 信息可能异常的Bug[详情](https://issues.dcloud.net.cn/pages/issues/detail?id=266)
  + App-Android平台 修复 DOM API 部分组件无法通过 getAttribute 方法获取 value 的Bug
  + 新增 API uni.rpx2px [详情](https://doc.dcloud.net.cn/uni-app-x/api/rpx2px.html)
  + 调整 pages.json 中配置的页面路径大小写敏感
  + 修复 UniElement tagName、nodeName获取内置组件的标签与组件名不一致的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=766)
  + 修复 vue $parent未跳过内置组件的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=773)
* 【uts插件】
  + 编译器 修复 特殊值域string构成的数组类型编译报错的Bug
  + App-Android平台 新增 UTSAndroid.getJavaClass 获取 Android 原生对象的 Java Class [详情](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#getjavaclass)
  + App-Android平台 修复 Date 无法解析日期时间格式字符串（如“2024-01-09 22:00:00”）的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=499)
  + App-Android平台 修复 typeof 运算符返回 NaN、INFINITY 的数据类型不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=557)
  + App-Android平台 修复 Array.includes 判断元素类型为 number 时可能返回结果不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=559)
  + App-Android平台 修复 Number.toString 不支持指定转换进制基数的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=308)
  + App-Android平台 修复 Number.toFixed 方法在 android6.0 以下设备返回值异常的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=233)
  + App-Android平台 修复 不同属性名编译可能冲突报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=568)
  + App-Android平台 修复 编译告警 No cast needed 的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=527)
  + App-Android平台 修复 当顶部存在多个相同变量名时可能存在访问错乱的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=334)
  + App-Android平台 修复 部分情况下正则表达式转换错误的Bug [详情](https://ask.dcloud.net.cn/question/183344)
  + App-Android平台 优化 类型不匹配时的错误提示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=358)
  + App-Android平台 修复 interface 中泛型方法编译不正确的Bug
  + App-Android、App-iOS 平台 修复 interface 中 readonly 属性不生效的Bug
  + App-Android、App-iOS 平台 修复 负数小数点0可能被移除的问题，比如 -1.0 => -1
  + App-Android平台 修复 async 方法参数数量超过一个时运行报错的Bug
  + Android平台 新增 `typeof` 操作符支持平台专有字符类型 `Char` [详情](https://doc.dcloud.net.cn/uni-app-x/uts/operator.html#typeof)
  + App-Android平台 修复 局部定义 class 时，构造函数使用 super 报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=802)
  + App-Android平台 新增 interface.uts 文件支持 export declare 语法 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=744)
  + App-Android平台 修复 import * as Types from 'xxx' 导入 type 类型编译报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=696)
  + App-iOS平台 新增 @UTSiOS.keyword('fileprivate') 注解，用于解决自定义swift类，属性的访问控制

#### 3.99.2023122704
* 【uni-app 插件】
  + 新增 编译器 nvue + vue2 支持使用ts开发。方便插件作者的库全面升级为ts。
  + Web平台、App-Vue平台 新增 radio 组件支持 backgroundColor、borderColor、activeBackgroundColor、activeBorderColor、iconColor 属性  [详情](https://uniapp.dcloud.net.cn/component/radio.html#radio)
  + Web平台、App-Vue平台 新增 checkbox 组件支持 backgroundColor、borderColor、activeBackgroundColor、activeBorderColor、iconColor 属性 [详情](https://uniapp.dcloud.net.cn/component/checkbox.html#checkbox)
  + Web平台 新增 Vue3 项目支持百度地图 [详情](https://uniapp.dcloud.net.cn/collocation/manifest#h5sdkconfig)
  + Web平台 修复 Vue3 CLI 创建的项目打包后多根节点组件属性丢失的Bug [详情](https://ask.dcloud.net.cn/question/182569)
  + Web平台 修复 map 组件使用高德地图 circles 的 fillColor、color 属性设置透明度无效的Bug [详情](https://ask.dcloud.net.cn/question/159809)
  + App-Android平台 修复 uni.downloadFile 下载完成发后会多触发一次 onProgressUpdate 事件的Bug
  + App-iOS平台 修复 nvue map 组件选择 google 地图时，使用自定义气泡导致应用崩溃的Bug [详情](https://ask.dcloud.net.cn/question/183494)
  + App平台 修复 vite.config.js 配置 target 为 esnext 时 nvue 页面报错的Bug [详情](https://ask.dcloud.net.cn/question/183180)
  + 小程序平台 修复 Vue3 项目 script setup 中 onError 无效的Bug [详情](https://github.com/dcloudio/uni-app/issues/4276)
  + 小程序平台 修复 Vue3 项目插槽内容为单根节点时 v-if 无效的Bug [详情](https://github.com/dcloudio/uni-app/issues/4486)
  + 支付宝小程序平台 新增 组件支持 styleIsolation 配置，默认值 apply-shared [详情](https://uniapp.dcloud.net.cn/collocation/manifest.html#mp-alipay)
  + 飞书小程序平台 修复 Vue3 项目作用域插槽不显示内容的Bug [详情](https://ask.dcloud.net.cn/question/181927)
* 【uni-app x插件】
  + 修复 编译器 部分情况下报错信息未回溯到源码的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=246) [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=253) [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=264)
  + 修复 编译器 组件递归使用时编译报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=225)
  + 优化 编译器 真机运行调用未包含的被摇掉的api的错误提示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=227)
  + 修复 应用 onLaunch 生命周期调用 route API 异常的Bug
  + 新增 vue框架 支持 app.use 注册 vue 插件 [详情](https://doc.dcloud.net.cn/uni-app-x/vue/index.html#app-instance)
  + 新增 vue框架 app.config.globalProperties 注册全局属性 [详情](https://doc.dcloud.net.cn/uni-app-x/vue/index.html#app-instance)
  + 新增 vue框架 动态组件 [详情](https://doc.dcloud.net.cn/uni-app-x/vue/index.html#special-elements)
  + 新增 vue框架 provide/inject 用于组件通信 [详情](https://doc.dcloud.net.cn/uni-app-x/vue/index.html#composition-options)
  + 新增 vue框架 mixin 混入 [详情](https://doc.dcloud.net.cn/uni-app-x/vue/index.html#composition-options)
  + 新增 vue框架 v-html 指令 [详情](https://doc.dcloud.net.cn/uni-app-x/component/index.html#directives)
  + 新增 vue框架 v-once 指令、v-memo 指令、v-pre 指令 [详情](https://doc.dcloud.net.cn/uni-app-x/vue/index.html#directives)
  + 新增 vue框架 componentInstance.$forceUpdate [详情](https://doc.dcloud.net.cn/uni-app-x/vue/index.html#component-instance)
  + 新增 vue框架 支持 render 函数 [详情](https://doc.dcloud.net.cn/uni-app-x/vue/index.html#rendering-options)
  + 新增 全局变量 globalData [详情](https://doc.dcloud.net.cn/uni-app-x/collocation/app.html#globaldata)
  + 新增 splash 在 manifest.json 中配置启动封面 [详情](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-splashscreen.html)
  + 新增 uni-ad 开屏广告 [详情](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-modules.html#uni-ad)
  + 新增 组件 input 的属性 cursor-color，用于调整光标颜色 [详情](https://doc.dcloud.net.cn/uni-app-x/component/input.html#%E5%B1%9E%E6%80%A7)
  + 新增 API uni.getUniverifyManager，App一键登陆 [详情](https://doc.dcloud.net.cn/uni-app-x/api/get-univerify-manager.html)
  + 新增 API uni.getFileSystemManager，本地文件管理 [详情](https://doc.dcloud.net.cn/uni-app-x/api/get-file-system-manager.html)
  + 优化 规范了文件系统使用，对cache文件进行了详细约定 [详情](https://doc.dcloud.net.cn/uni-app-x/api/file-system-spec.html)
  + 新增 API uni-push 支持荣耀厂商推送
  + 修复 API uni.toast、uni.showModal等交互反馈弹窗在 onReady 生命周期前调用可能无法正常显示的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=312))
  + 补齐 CSS background-image 的 linear-gradient 渐变方向支持 to bottom left 、to top right [详情](https://doc.dcloud.net.cn/uni-app-x/css/background-image.html)
  + 修复 CSS 先后设置 box-shadow 与 border 属性导致后设置的样式不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=280)
  + 修复 CSS z-index 属性可能引发下标越界异常的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=215)
  + 修复 CSS position 设置为 fixed 时 z-index 可能不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=274)
  + 修复 CSS transition 初始值为百分比时动态设置 length 值动画效果不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=262)
  + 修复 CSS transition-property 属性值动态更新为 background-color 时不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=298)
  + 修复 CSS transform-origin 在设置 transition-property 为 transform 时不生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=299)
  + 修复 组件 text 在某些情况设置 max-width 后高度不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=257)
  + 修复 组件 video 无法播放本地m3u8文件的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=229)
  + 修复 组件 list-view 无法通过 scroll-into-view 属性滚动到 sticky-header 组件位置的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=261)
  + 修复 组件 list-item 被复用后 click 事件无法正常触发的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=271)
  + 修复 组件 view 设置 overflow 为 visible 后需同时对父元素设置 overflow 为 visible 才能生效的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=259)
  + 修复 组件 view 设置 overflow 为 hidden 后子元素显示区域可能占用 border 边框区域的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=304)
  + 修复 TouchEvent 事件在超出父视图可视区域后 screenX、screenY 属性值可能不正确的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=245)
  + 修复 系统切换暗黑模式导致应用白屏
  + 优化 App打release包后，应用资源不再释放到存储卡，提升首次启动速度
  + 调整 API uni.installApk 安装apk，从ext api改为内置api [详情](https://doc.dcloud.net.cn/uni-app-x/api/install-apk.html)
  + 调整 App真机运行标准基座内置 uni-facialRecognitionVerify 实人认证模块，方便调试开发
  + 修复 App真机运行调用 uni.exit 后可能导致应用异常崩溃的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=169)
  + 新增 ui库 uni-icons 支持uni-app x [详情](https://uniapp.dcloud.net.cn/component/uniui/uni-icons.html)
  + 新增 ui库 uni-data-picker 支持uni-app x [详情](https://uniapp.dcloud.net.cn/component/uniui/uni-data-picker.html)
  + 新增 ui库 uni-loading 支持uni-app x [详情](https://ext.dcloud.net.cn/plugin?id=15980)
  + 新增 uni-cms 客户端插件 uni-cms-article [详情](https://ext.dcloud.net.cn/plugin?id=11701)
  + 更新 模板 App升级中心 支持在通知栏显示下载进度
  + 更新 模板 uni-id-pages-x v1.0.4+ 不再支持配置项：`config.needLogin`，改用uni-id-router替代 [详情](https://ext.dcloud.net.cn/plugin?name=uni-id-pages-x)
* 【uts插件】
  + 新增 Android平台 UTSAndroid.getFileProviderUri，方便控制应用内文件对外分享 [详情](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html#getfileprovideruri)
  + 优化 新建uni_modules插件的UTS插件模板，默认包含完整演示UTS插件API/组件示例
  + 修复 Android平台 本地 libs 三方依赖变更后不生效的Bug [详情](https://ask.dcloud.net.cn/question/182382)
  + 修复 多个解构语句可能编译报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=217)
  + 修复 App-iOS平台 类继承时属性 override 报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=207)
  + 修复 App-Android平台 UTSJSONObject对象定义方法后，不能通过索引调用的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=234)
  + 修复 App-Android平台 顶层变量、type 属性、类实例属性、类静态属性仅首字母大小写区分时编译报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=286)
* 【App插件(含5+App和uni-app的App端)】
  + 更新 一键登录使用的个验 SDK Android为 3.1.6.0 版，iOS为 3.0.6.0 版，解决联通运营商一键认证服务主体变更导致新开通应用预登录可能失败的问题
  + Android平台 更新 UniPush使用的个推核心组件 SDK 为 3.2.9.0 版，个推 SDK 为 3.3.3.0 版，支持荣耀厂商推送；谷歌渠道个推 SDK 为 4.4.3.6 版，适配Android14
  + iOS平台 更新 支付模块 微信 SDK 为 2.0.2 版；支付宝 SDK 为 15.8.6 版； Paypal SDK 为 1.2.0 版；Stripe SDK 为 23.18.2 版
  + iOS平台 更新 分享/登录模块 微信 SDK 为 2.0.2 版；QQ SDK 为 3.5.14 版；新浪微博 SDK 为 3.3.4 版；Facebook SDK 为 16.2.1 版；Google SDK 为 7.0.0 版
  + iOS平台 更新 地图/定位模块 高德地图 SDK 为 9.7.0 版，高德定位 SDK 为 2.10.0 版；百度地图 SDK 为 6.6.0 版，百度定位 SDK 为 2.0.9 版
  + iOS平台 更新 统计模块 友盟基础库 SDK 为 7.4.2 版，友盟统计 SDK 为 9.6.1 版；Google 统计 SDK 为 10.18.0 版
  + iOS平台 更新 uni-AD模块 Google AdMob SDK 为 10.13.0 版
  + iOS平台 修复 iPhone 15 设备无法获取手机型号的Bug [详情](https://ask.dcloud.net.cn/question/182298)
  + iOS平台 修复 iOS17系统视频播放控件 video 竖屏状态下进入全屏后退出全屏无法正常显示的Bug
* 【uniCloud】
  + 【重要】新增 七牛云扩展存储 价格更优、权限更灵活 [详情](https://doc.dcloud.net.cn/uniCloud/ext-storage/intro.html)
  + 新增 uni-app-x 项目支持 uniIdRouter [详情](https://doc.dcloud.net.cn/uniCloud/uni-id/summary.html#uni-id-router)
  + 新增 支付宝小程序云 支持云函数URL化
  + 补齐 支付宝小程序云 支持ide中运行JQL文件
  + 修复 支付宝小程序云 doc get 未兼容返回值为 null 的Bug [详情](https://ask.dcloud.net.cn/question/182457)
  + 修复 支付宝小程序云 数据库 where、match 查询对象时结果不正确的Bug
  + 修复 支付宝小程序云 云存储上传失败时，失败原因未在前端展示的Bug
  + 修复 支付宝小程序云 uni.getTempFileURL API 返回只有文件名的Bug
  + 修复 项目存在多个云厂商时，上传云函数识别云厂商错误的Bug
  + 修复 database 目录右击菜单“上传Schema扩展Js的配置”提示“请绑定服务空间”的Bug [详情](https://ask.dcloud.net.cn/question/182971)
  + 修复 创建 Schema 时，存在数据量大的 init_data.json 会导致无法正确下载的Bug
  + 修复 单独上传 uni-clientDB-actions 文件时会导致覆盖之前上传的 action 的Bug [详情](https://ask.dcloud.net.cn/question/182598)
  + 修复 上传云函数、创建schema、上传/下载校验函数时，如果存在时在弹窗中选择跳过将会跳过所有的Bug
  + 修复 初始化向导删除 db_init.json 文案的Bug
  + 优化 关联服务空间时可以跨不同云厂商切换服务空间

#### 3.98.2023112510
* 【uni-app】
  + 优化 编译时如 static 目录下存在被忽略的、非当前平台可用的目录，会给出强调提示 [详情](https://uniapp.dcloud.net.cn/tutorial/platform.html#static)
  + 修复 vue3 项目 vite.config.js 配置 target 未作用到 renderjs 的Bug [详情](https://ask.dcloud.net.cn/question/180135)
  + 修复 使用 uni ext-api，升级更新 wgt 后，调用可能报错的Bug [详情](https://ask.dcloud.net.cn/question/180309)
  + 修复 使用 uni ext api，且云打包同时勾选Android和iOS，发行后的安装包未能正确包含uni ext api插件的Bug [详情](https://ask.dcloud.net.cn/question/181295)
  + uni统计2 修复 支付宝小程序云报错 spaceAppId required 的bug [详情](https://ask.dcloud.net.cn/question/181491)
* 【uni-app x插件】
  + 新增 组件 form 表单 [详情](https://doc.dcloud.net.cn/uni-app-x/component/form.html)
  + 新增 组件 sticky-section 分段吸顶 [详情](https://doc.dcloud.net.cn/uni-app-x/component/sticky.html#sticky-section)
  + 新增 uni-push [详情](https://doc.dcloud.net.cn/uni-app-x/api/push.html)
  + 新增 uni.addInterceptor 拦截器，可拦截部分API [详情](https://doc.dcloud.net.cn/uni-app-x/api/interceptor.html)
  + 新增 uni.setNavigationBarTitle [详情](https://doc.dcloud.net.cn/uni-app-x/api/set-navigation-bar-title.html)
  + 调整 uni.downloadFile 下载默认目录调整为app的cache目录下的uniDownloads目录，方便被rom的清理工具清理 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=201)
  + 补充 uni.getAppBaseInfo 获取获取包名、签名信息 [详情](https://doc.dcloud.net.cn/uni-app-x/api/get-app-base-info.html)
  + 补充 组件 scroll-view 支持 nested-scroll-child，可将嵌套滚动的父滚动视图滚动余量传递给子视图 [详情](https://doc.dcloud.net.cn/uni-app-x/component/scroll-view.html)
  + 补充 组件 web-view 支持 download 事件，以及 loading、loaded 事件回调参数支持 url 属性 [详情](https://doc.dcloud.net.cn/uni-app-x/component/web-view.html)
  + 补充 组件 image、video 的 src 属性及 css 中，支持非 static 目录的静态资源
  + 修复 组件 text 固定宽高时，设置 padding-left 和 padding-right 可能导致文本不居中的Bug
  + 修复 组件 text 设置 space 属性时，换行符 \n 有时无法正常显示的Bug
  + 修复 组件 text 设置 line-height 属性可能不生效的Bug
  + 修复 组件 scroll-view、list-view 同时设置 scroll-y、scroll-x属性为 false 时，组件的 touch 相关事件不触发的Bug
  + 修复 组件 swiper current 属性可能不生效的Bug [详情](https://ask.dcloud.net.cn/question/181396)
  + 修复 组件 swiper-item 的 overflow 属性值为 hidden 时子元素未被裁剪的Bug
  + 修复 组件 list-item 执行复用时遇到 text 组件嵌套可能会闪退的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=216)
  + 修复 组件 checkbox-group 动态修改 checkbox 组件的 check 属性时，form 组件提交的 value 不正确的Bug
  + 修复 组件 radio-group 动态修改 radio 组件的 check 属性时，form 组件提交的 value 不正确的Bug
  + 修复 组件 slider 当父容器可滚动且显示 value 且当前滑块值为最大值时，无法直接在滑块的右半径上按下拖动的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=218)
  + 修复 组件 video 部分 event 回调没有属性值的Bug [详情](https://ask.dcloud.net.cn/question/180748)
  + 新增 uvue 文件支持引入 ts 后缀的文件，等同于 uts 后缀。方便插件同时兼容uni-app和uni-app x
  + 优化 编译器 项目存在大量css代码时的编译速度
  + 修复 easycom组件类型在非uvue页面中使用报错的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=177)
  + 修复 uvue 页面文件名与 easycom 组件同名时渲染不正确Bug
  + 修复 动态创建的根节点 class 样式丢失的Bug
  + 修复 v-model 绑定的表达式包裹 () 运行失败的Bug
  + 修复 在自定义组件中使用 class 定制另一个自定义组件根节点样式不生效的Bug
  + 修复 data 中定义的 UTSJSONObject 修改后，不触发渲染的Bug
  + 调整 各项目模板的 index.html （web平台专有文件）中引入入口文件从 main.js 改为 main（即main.uts，后缀可省略）
  + 修复 Element 的 style 调用 setProperty 更新 transition-duration 属性值不支持单位为s(秒)的Bug
  + 修复 uni.loadFontFace 多次请求同一网络字体时可能触发错误回调的Bug
  + 修复 uni.toast、uni.showModal等交互反馈弹窗在onLoad等特定场景可能引起应用崩溃的Bug
  + 修复 uni.getLocation 系统定位获取位置慢的Bug
  + 补充 css position 属性设置为 absolute 时，margin 支持取值 auto
  + 补充 真机运行标准基座内置所有常用权限。减少因权限造成的打包自定义基座的频率
  + 新增 模板 App升级中心兼容uni-app x [详见](https://ext.dcloud.net.cn/plugin?id=4542)
  + 新增 模板 uni-id-pages-x 方便开发账户系统 [详情](https://doc.dcloud.net.cn/uniCloud/uni-id/app-x.html)
  + 修复 部分情况下真机运行 appid 为空导致应用异常崩溃的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=162)
  + 修复 使用 v-if 显示组件的 background 样式设置为线性渐变可能引起崩溃的Bug [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=164)
* 【uts插件】
  + 新增 App-Android平台 uni-app x项目开发的uts原生组件定义的对外方法支持返回值
  + 新增 App-iOS平台 真机运行适配支持 XCode15
  + 新增 uts插件支持监听应用的原生生命周期回调函数 [详情](https://uniapp.dcloud.net.cn/plugin/uts-plugin.html#hooksclass)
  + 新增 uts组件插件支持 NVUpdateStyles 生命周期监听组件的样式更新 [详情](https://uniapp.dcloud.net.cn/plugin/uts-component.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)
  + 优化 异步函数在 uni-app x 中使用时默认与框架运行在同一线程
  + 修复 位移赋值类操作符，当右侧为复杂表达式，计算结果不正确的Bug
  + 修复 部分位运算组合使用时优先级不正确的Bug
  + 修复 Number 参与的运算结果可能整型溢出的Bug
  + 修复 Number 参与的除法运算除数不能为0的Bug
  + 修复 App-Android平台 Array join 返回值与 web 不一致的Bug
  + 修复 相同interface、class定义了不同属性，方法调用失败的Bug
  + 修复 App-Android平台 string 的 indexOf 方法参数类型不正确的Bug
  + 调整 App-Android平台 uts组件插件内置对象 $androidContext 可为空 [详情](https://uniapp.dcloud.net.cn/plugin/uts-component.html#%E5%86%85%E7%BD%AE%E5%AF%B9%E8%B1%A1%E5%92%8C%E5%87%BD%E6%95%B0)
  + 修复 uni-app 项目 vue2 下开发uts插件报错可能未指向源码的Bug
  + 修复 自定义基座真机运行时hooksClass 相关回调重复调用的Bug
  + 修复 App-iOS平台 使用 uts 插件（含ext api）后因底层依赖 uni-getDeviceInfo 有读取 IDFA 的代码导致可能影响应用上架审核的Bug
* 【App插件(含5+App和uni-app的App端)】
  + Android平台 更新 uni-AD 模块 穿山甲&GroMore SDK为 5.7.0.5 版，解决加载广告可能会崩溃的Bug
  + Android平台 更新 一键登录使用的个推核心组件SDK为 3.2.9.0 版，个验SDK为 3.1.4.0 版
  + Android平台 更新 uni实人认证使用的阿里云金融级实人认证SDK为 2.3.7 版
* 【uniCloud】
  + 【重要】新增 uniCloud支付宝小程序云版，全端可用、uni-app和uni-app x均可用。价格更优，限制更少，支持域名备案
  + 【重要】调整 废弃 `db_init.json`，每个collection由schema.json、index.json、init_data.json、schema.ext.js 4个文件描述 [详情](https://doc.dcloud.net.cn/uniCloud/hellodb.html#init-db)
  + 优化 基于模板新建schema/新建schemajs时，如模板是由多个文件组成的，允许用户选择创建具体的文件

#### 3.95.2023102806
* 【uni-app x插件】
  + 新增 ext api `uni.installApk` 安装apk [详情](https://doc.dcloud.net.cn/uni-app-x/api/install-apk.html)
  + App-Android平台 新增 真机运行标准基座支持安装apk权限
  + App-Android平台 修复 使用云对象提交云端打包后可能运行报错的Bug [详情](https://ask.dcloud.net.cn/question/180404)

#### 3.94.2023102613
* 【uni-app】
  + 新增 条件编译 提供 uniVersion 用于区分编译器版本。可用于插件适配不同版本的uni-app [详情](https://uniapp.dcloud.net.cn/tutorial/platform.html#uniVersion)
  + 新增 条件编译 static目录支持app、web子目录 [详情](https://uniapp.dcloud.net.cn/tutorial/platform.html#static)
  + App平台 修复 云端打包 Storage 相关接口设置和获取内容异常的Bug [详情](https://github.com/dcloudio/uni-app/issues/4556)
  + App-Android平台 修复 uni.downloadFile 下载 wgt 文件可能没有文件后缀的Bug [详情](https://ask.dcloud.net.cn/question/176447)
  + App-iOS平台 修复 nvue 页面在 iOS17 设备可能引起崩溃的Bug [详情](https://ask.dcloud.net.cn/question/179220)
  + App-iOS平台 修复 应用语言设置为英文时，nvue map 组件仍然显示中文的Bug [详情](https://ask.dcloud.net.cn/question/178833)
  + 微信小程序平台 修复 subscribe 组件属性无效的Bug [详情](https://ask.dcloud.net.cn/question/178893)
  + 支付宝小程序平台 修复 lottie 组件属性无效的Bug [详情](https://github.com/dcloudio/uni-app/issues/4510)
  + 抖音小程序平台 修复 Vue2 项目运行到抖音 27.2.0 版本以上 $refs 失效的Bug [详情](https://github.com/dcloudio/uni-app/pull/4555)
* 【uts插件】
  + 调整 通过数字字面量定义变量未申明类型时默认推导为 number 类型 [详情](https://uniapp.dcloud.net.cn/uts/data-type.html#autotypefornumber)
  + 调整 typeof 获取实例对象类型支持平台专有数字类型 Int、Float、Double等 [详情](https://uniapp.dcloud.net.cn/uts/operator.html#typeof)
  + 调整 instanceof 不再支持判断基础类型 number、string、boolean [详情](https://uniapp.dcloud.net.cn/uts/operator.html#instanceof)
  + 调整 JSON.parse 解析json字符串支持返回 Array、number、boolean、string 等数据类型 [详情](https://uniapp.dcloud.net.cn/uts/buildin-object-api/json.html#parse)
  + 新增 JSON.parse 支持传入泛型解析为指定 type 类型 [详情](https://uniapp.dcloud.net.cn/uts/data-type.html#%E6%8A%8Ajson%E5%AF%B9%E8%B1%A1%E8%BD%AC%E4%B8%BAtype)
  + 新增 UTSJSONObject 通过 getBoolean、getString、getNumber、getJSON 等方法访问属性，并支持传入 keyPath 格式参数 [详情](https://uniapp.dcloud.net.cn/uts/data-type.html#%E8%AE%BF%E9%97%AE-utsjsonobject-%E4%B8%AD%E7%9A%84%E5%B1%9E%E6%80%A7%E6%95%B0%E6%8D%AE)
  + 新增 UTSJSONObject 支持 hasOwnProperty [详情](https://uniapp.dcloud.net.cn/uts/buildin-object-api/utsjsonobject.html#hasOwnProperty)
  + 新增 number 类型支持与平台专有数字类型相互转换方法 toInt、toFloat、toDouble、from 等 [详情](https://uniapp.dcloud.net.cn/uts/buildin-object-api/number.html)
  + 新增 type 自定义类型支持 for...in 遍历 [详情](https://uniapp.dcloud.net.cn/uts/data-type.html#type)
  + 新增 Regexp 正则表达式支持 flags 属性 [详情](https://uniapp.dcloud.net.cn/uts/buildin-object-api/regexp.html#flags)
  + 新增 支持 encodeURI、decodeURI、encodeURIComponent、decodeURIComponent 等全局方法 [详情](https://uniapp.dcloud.net.cn/uts/buildin-object-api/global.html#encodeuri)
  + 新增 支持使用数值字面量和字符串字面量用作类型注解 [详情](https://uniapp.dcloud.net.cn/uts/literal.html)
  + 新增 uni.request 请求的 method 支持 OPTIONS [详情](https://doc.dcloud.net.cn/uni-app-x/api/request.html)
  + 新增 await 支持与 Promise 一同使用 [详情](https://uniapp.dcloud.net.cn/uts/operator.html#await)
  + 修复 parseInt 解析超过整型数据范围返回值为 NaN 的Bug
  + 修复 for 循环中包含复杂continue、break时，执行不正确的Bug
  + 修复 class 中无法访问外部定义的与类内部属性、方法同名的变量的Bug
  + 新增 App-Android平台 Promise [详情](https://uniapp.dcloud.net.cn/uts/buildin-object-api/promise.html)
  + 新增 App-Android平台 支持 Array.fromNative 方法将原生 ByteArray/LongArray/ShortArray 类型转换为 Array
  + 更新 App-Android平台 编译使用的 Android SDK 为 33
  + 修复 App-Android平台 部分场景下位运算符异常的Bug
  + 修复 App-Android平台 number 的 toFixed 方法返回结果可能异常的Bug
  + 修复 App-Android平台 number 数据类型的位运算操作可能引起崩溃的Bug
  + 修复 App-Android平台 console 输出对象信息中包含 private 属性和方法的Bug
  + 修复 App-Android平台 number 数据类型在某些情况除法运行结果不正确的Bug
  + 修复 App-Android平台 vue 页面调用 API 传参对象中包含`Any`类型字段时可能出现异常的Bug
  + 修复 App-iOS平台 class 实例对象调用带参数标签的方法编译报错的Bug
  + 补齐 App-iOS平台 支持 parseInt、parseFloat、isNan、isFinite 等全局方法
  + 补齐 App-iOS平台 string 类型支持 toString、valueOf 等方法
  + 补齐 App-iOS平台 Array 类型支持 toString、sort 等方法
  + 补齐 App-iOS平台 Date 类型支持 toString、 valueOf、toUTCString、toTimeString、toDateString、parse 等方法
  + 修复 App-iOS平台 函数参数不支持 class 数组类型的Bug
  + 修复 App-iOS平台 vue 页面中调用 API 参数不支持 null 的Bug
* 【App插件(含5+App和uni-app的App端)】
  + 更新 uni-AD SDK，对接双11预算，其中腾讯优量汇SDK Android为 4.542.1412 版，iOS为 4.14.45 版；穿山甲&GroMore SDK Android为 5.6.1.6 版，iOS为 5.7.0.4 版；快手广告SDK Android为 3.3.53.3 版，iOS为 3.3.53 版；快手内容联盟SDK Android为 3.3.53 版；Sigmob广告联盟SDK Android为 4.12.7 版，iOS为 4.10.0 版；百度百青藤广告SDK Android为 9.322 版，iOS为 5.324 版；华为广告SDK Android为 13.4.66.300 版
  + Android平台 更新 Google 统计 SDK 为 21.3.0 版；Google 推送 SDK 为 23.2.1 版
  + Android平台 更新 Facebook 登录 SDK 为 16.1.3 版，解决登录异常的问题 [详情](https://ask.dcloud.net.cn/question/175402)
  + Android平台 调整 默认支持CPU类型为arm64-v8a，解决在华为新设备（如Mate60、X5）应用启动慢的问题 [详情](https://uniapp.dcloud.net.cn/tutorial/app-android-abifilters.html#default)
  + Android平台 修复 targetSdkVersion 设置为 33 在 Android13 设备保存图片到相册失败的Bug
  + Android平台 修复 上架 OPPO 应用市场可能提示`含数字天堂(dcloud)广告插件`的Bug [详情](https://ask.dcloud.net.cn/question/174958)
  + Android平台 修复 uni-AD 红包广告可能不展示的Bug
  + iOS平台 修复 3.7.12版更新个验SDK引出的 一键登录弹窗模式下点击关闭不会触发 fail 回调的Bug [详情](https://ask.dcloud.net.cn/question/177253)
* 【uniCloud】
  + 优化 阿里云 callFunction、url化方式调用云函数最大超时时间由60秒调整为120秒
  + 新增 uni-app x 项目支持 [详情](https://doc.dcloud.net.cn/uni-app-x/unicloud/)
