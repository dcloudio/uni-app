# uni-app 更新日志
======================================
#### 2.6.6.20200320-alpha
* 【uni-app插件】
  + 优化 静态资源引入方式 [详情](https://uniapp.dcloud.io/frame?id=resource)
  + 修复 内联 wxs 里包含“!”符号时报错的Bug [详情](https://ask.dcloud.net.cn/question/90581)
  + 修复 TypeScript 项目部分情况(存在 easycom 组件)，内置组件报未注册的Bug [#1400](https://github.com/dcloudio/uni-app/issues/1400)
  + 修复 uni.scss 内条件编译失效的Bug [详情](https://ask.dcloud.net.cn/question/90454)
  + 修复 vue.config.js 设置 transpileDependencies 失效的Bug [详情](https://ask.dcloud.net.cn/question/90068)
  + App平台、H5平台 修复 createAnimation 时 backgroundColor无效的Bug [详情](https://ask.dcloud.net.cn/question/91190)
  + App平台 调整 v3版本 使用 wx.xxx 方式调用接口不进行 Promise 封装
  + App平台 修复 热刷新页面参数被 encode 多次的Bug
  + App平台 修复 vue 页面 ad 组件 无法销毁的Bug
  + App平台 修复 uni.setNavigationBarColor 无法设置返回按钮的颜色的Bug
  + App平台 修复 tabBar 的 midButton 点击高出tabBar高度区域无响应的Bug [详情](https://ask.dcloud.net.cn/question/87821)
  + App平台 修复 纯 nvue 模式 uni.relaunch 会导致应用闪退的Bug [详情](https://ask.dcloud.net.cn/question/89364)
  + App平台 修复 非v3编译模式 uni.getImageInfo 返回 path 不是本地路径的Bug [详情](https://ask.dcloud.net.cn/question/90689)
  + App平台 修复 v3版本 部分情况组件事件监听混乱，导致页面渲染异常的Bug [详情](https://ask.dcloud.net.cn/question/91169)
  + App平台 修复 v3版本 fast 模式 storage相关API报错的Bug [详情](https://ask.dcloud.net.cn/question/90554)
  + App平台 修复 v3版本 通过 v-if 切换部分组件时报错的Bug [详情](https://ask.dcloud.net.cn/question/90200)
  + App平台 修复 v3版本 css 条件编译为非 nvue 页面报错 may not be supported 的Bug [详情](https://ask.dcloud.net.cn/question/90523)
  + App平台 修复 v3版本 await this.$nextTick() 触发时机不正确的Bug [详情](https://ask.dcloud.net.cn/question/87434)
  + App平台 修复 v3版本 切换到已显示 tabBar 页面时触发该页面 onHide 的Bug [详情](https://ask.dcloud.net.cn/question/91106)
  + App平台 修复 v3版本 从非 tabBar 页面调用 uni.switchTab 切换到一个已存在的 tabBar 页面，onShow 不执行的Bug
  + App平台 修复 v3版本 nvue 页面 swiper 组件的 @transition 事件在某些情况下回调不正确的Bug [详情](https://ask.dcloud.net.cn/question/88906)
  + App平台 修复 v3版本 swiper 组件作为插槽内容在其他组件中表现不正常的Bug [详情](https://ask.dcloud.net.cn/question/89853)
  + App平台 修复 v3版本 map 组件 @markertap、@callouttap 事件回调值错误的Bug [详情](https://ask.dcloud.net.cn/question/88656)
  + App平台 修复 v3版本 map 组件 @regionchange 事件无效的Bug [详情](https://ask.dcloud.net.cn/question/88656)
  + App平台 修复 v3版本 nvue 页面 map 相关API：getRegion，getCenterLocation 无效的Bug [详情](https://ask.dcloud.net.cn/question/90327)
  + App平台 修复 v3版本 canvas 组件宽度或高度为0时报错的Bug [详情](https://ask.dcloud.net.cn/question/90647)
  + App平台 修复 v3版本 部分情况下绘制 canvas 组件报错的Bug [详情](https://ask.dcloud.net.cn/question/90328)
  + App平台 修复 v3版本 uni.canvasToTempFilePath 配置 fileType 参数不生效的Bug [详情](https://ask.dcloud.net.cn/question/89273)
  + App平台 修复 v3版本 uni.previewImage 参数 longPressActions 无效的Bug
  + App平台 修复 v3版本 uni.sendSocketMessage 发送 ArrayBuffer 类型数据报错的Bug [详情](https://ask.dcloud.net.cn/question/90434)
  + App平台 修复 v3版本 socketTask.onOpen 内调用 socketTask.send 报错的Bug
  + App平台 修复 v3版本 uni.createBLEConnection 回调不触发的Bug
  + App平台 修复 v3版本 uni.readBLECharacteristicValue 无法读取特征值数据的Bug
  + App平台 修复 v3版本 uni.writeBLECharacteristicValue 写入二进制数据报错的Bug
  + App平台 修复 v3版本 subNvue style 内的 mask 属性被错误的应用在 subNvue 上的Bug [详情](https://ask.dcloud.net.cn/question/91097)
  + App平台 修复 nvue 页面 v-slot:slotname 值为空时报错的Bug
  + App平台 修复 nvue 页面 修复部分情况下 createLivePusherContext 无法正确获取 live-pusher 上下文的Bug
  + App平台 新增 nvue 页面 list 组件支持 setSpecialEffects 方法，实现 swiper-list 吸顶滚动效果 [文档](https://uniapp.dcloud.io/component/list?id=setSpecialEffects)
  + App平台 修复 nvue 页面 map 组件 markers、polyline、polygons、circles 属性无法重置的Bug [详情](https://ask.dcloud.net.cn/question/86786)
  + App平台 修复 nvue 页面 自定义组件中无法正常使用 video 相关 API 的Bug [详情](https://ask.dcloud.net.cn/question/90877)
  + App-Android平台 优化 storage 相关 API 性能 [注意事项](https://ask.dcloud.net.cn/article/37071)
  + App-Android平台 修复 pages.json 内配置 softinputMode 为 adjustResize 部分情况下失效的Bug [详情](https://ask.dcloud.net.cn/question/90145)
  + App-Android平台 修复 nvue video 组件在页面中存在多个且包含 cover-view 全屏播放时闪退的Bug [详情](https://ask.dcloud.net.cn/question/88718)
  + App-Android平台 修复 nvue video 组件设置 click 事件后视频操作按钮无法触发的Bug [详情](https://ask.dcloud.net.cn/question/90291)
  + App-Android平台 修复 nvue waterfall 组件加入 Refresh 后item排版错乱的Bug [详情](https://ask.dcloud.net.cn/question/83130)
  + App-Android平台 修复 tabBar 的 midButton 设置 backgroundImage 显示不正常的Bug [详情](https://ask.dcloud.net.cn/question/89800)
  + App-Android平台 修复 v3版本 map 组件绑定宽高后无法动态修改的Bug [详情](https://ask.dcloud.net.cn/question/89771)
  + App-Android平台 修复 v3版本 nvue 为首页时 autoclose 设置为 false 也会自动关闭启动页的Bug [详情](https://ask.dcloud.net.cn/question/90080)
  + App-iOS平台 新增 API uni.onUIStyleChange 监听系统主题状态变化（限v3） [详情](https://uniapp.dcloud.io/api/system/theme?id=onuistylechange)
  + App-iOS平台 优化 API uni.showActionSheet 在 iPad 设备支持 popover 设置弹出指示区域（限v3）
  + App-iOS平台 修复 HBuilderX2.6.4引出的调用 API uni.setClipboardData 可能引起应用崩溃的Bug [详情](https://ask.dcloud.net.cn/question/90439)
  + App-iOS平台 修复 HBuilderX2.6.4引出的调用 uni.showToast 可能引起应用崩溃的Bug [详情](https://ask.dcloud.net.cn/question/90520)
  + App-iOS平台 修复 配置底部安全区原生占位后，非 tabBar 页面获取的窗口高度错误的Bug
  + H5平台 优化 支持 manifest.json 配置 h5->router->base 值为 "./" 部署到相对路径
  + H5平台 修复 pages.json 配置 navigationBarShadow 无效的Bug [#607](https://github.com/dcloudio/uni-app/issues/607)
  + H5平台 修复 配置 transparentTitle 为 always 失效的Bug [详情](https://ask.dcloud.net.cn/question/91135)
  + H5平台 修复 解决PC模式图像预览页面滑动会关闭的Bug
  + H5平台 修复 部分情况下 webview 组件位置不正确的Bug [详情](https://ask.dcloud.net.cn/question/90987)
  + H5平台 修复 picker 组件 mode=time 失效的Bug [#1421](https://github.com/dcloudio/uni-app/issues/1421)
  + 微信小程序平台 修复 组件缺少 script 节点时运行报错的Bug [#1411](https://github.com/dcloudio/uni-app/issues/1411)
  + hello uni-app 新增 swiper-list 模板
* 【uniCloud】
  + 新增 公共函数功能 [详情](https://uniapp.dcloud.io/uniCloud/quickstart?id=common)
  + 修复 客户端上传文件在web控制台显示大小为0的Bug
* 【App插件(含5+App和uni-app的App端)】
  + 新增 原生标题栏支持自定义返回按钮角标、标题图标、副标题等功能 [文档](https://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewTitleNViewStyles)
  + 修复 Webview窗口的 WebviewEvent 事件回调函数参数没有 target 属性的Bug [详情](https://ask.dcloud.net.cn/question/90403)
  + Android平台 优化 本地数据存储 plus.storage 性能，新增异步操作接口 [注意事项](https://ask.dcloud.net.cn/article/37071)
  + Android平台 修复 uni-AD 激励视频云端打包勾选穿山甲，广告平台没有通过审核时可能引起应用崩溃的Bug [详情](https://ask.dcloud.net.cn/question/91251)
  + Android平台 修复 提交华为应用市场检查可能误报 TrojanDropper.Agent.EIY 病毒的Bug
  + Android平台 修复 页面中a标签设置非法链接后，点击可能出现应用闪退的Bug [详情](https://ask.dcloud.net.cn/question/90425)
  + Android平台 修复 在部分华为手机上修改文件名之后，使用input标签type为file时获取文件名称可能为随机数字的Bug
  + Android平台 修复 Webview窗口标题栏（titleNView）设置type为transparent时，其它原生控件（如VideoPlayer）可能会覆盖标题栏的Bug [详情](https://github.com/dcloudio/uni-app/issues/1298)
  + Android平台 修复 页面中input标签触发软键盘收回时可能影响 WebviewStyles 中的top属性不生效的Bug [详情](https://ask.dcloud.net.cn/question/91003)
  + Android平台 修复 HBuilderX2.6.4引出的Webview窗口标题栏（titleNView）动态修改 titleColor 不生效的Bug
  + Android平台 修复 获取UA值 plus.navigator.getUserAgent 返回为空的Bug [详情](https://ask.dcloud.net.cn/question/89762)
  + Android平台 修复 视频播放控件 VideoPlayer 跳转到指定位置之后，弹幕仍然按照之前的进度播放的Bug
  + Android平台 修复 视频播放控件 VideoPlayer 未指定 direction 时没有根据视频的宽高自动选择 direction 的Bug [详情](https://ask.dcloud.net.cn/question/89600)
  + Android平台 修复 地图控件 setCenter 后不触发 onstatuschanged 事件的Bug [详情](https://ask.dcloud.net.cn/question/48182)
  + Android平台 修复 在Android4.4系统设备无法正常运行的Bug
  + 【重要】iOS平台 新增 UIWebview独立模块，默认不再包含UIWebview相关代码 [详情](https://ask.dcloud.net.cn/article/36348#uiwebview)
  + iOS平台 新增 系统选择按钮框 plus.nativeUI.actionSheet 在iPad设备支持 popover 设置弹出指示区域 [文档](https://www.html5plus.org/doc/zh_cn/nativeui.html#plus.nativeUI.ActionSheetStyles)
  + iOS平台 新增 本地数据存储 plus.storage 异步操作接口 [文档](https://www.html5plus.org/doc/zh_cn/storage.html)
  + iOS平台 更新 友盟统计SDK版本为6.1.0
  + iOS平台 更新 微信登录、分享、支付SDK版本为1.8.6.2
  + iOS平台 修复 视频播放控件 VideoPlayer 设置 show-center-play-btn 属性不生效的Bug [详情](https://ask.dcloud.net.cn/question/90673)
  + iOS平台 修复 Webview窗口标题栏（titleNView）中 button 按钮设置 colorPressed 不生效的Bug [详情](https://ask.dcloud.net.cn/question/90616)
  + iOS平台 修复 新浪微博分享 type 为 web 类型时 pictures 属性不生效的Bug
  + iOS平台 修复 系统选择按钮框 plus.nativeUI.actionSheet 显示后不关闭，通过HBuilderX真机运行更新资源可能引起崩溃的Bug
* 【uni小程序SDK】
  + 新增 获取当前显示小程序页面直达Url方法（用于启动直达二级页面）[iOS](https://ask.dcloud.net.cn/article/37068#getCurrentPageUrl)、[Android](https://ask.dcloud.net.cn/article/36984#getCurrentPageUrl)
  + 新增 获取已部署的小程序资源版本信息方法 [iOS](https://ask.dcloud.net.cn/article/37068#getUniMPVersionInfo)、[Android](https://ask.dcloud.net.cn/article/36984#getAppVersionInfo)
  + 新增 胶囊按钮添加点击效果
  + 开放 小程序内部调用 plus.runtime.install 热更新wgt资源 [详情](https://ask.dcloud.net.cn/article/35667)
  + iOS平台 修复 原生工程勾选 'Hide status bar' 导致小程序页面导航栏被系统状态栏挡住的Bug
  + iOS平台 修复 pickDate、pickTime 无法显示的Bug

#### 2.6.5.20200314
* 【uni-app插件】
  + 新增 页面属性配置节点 page-meta [详情](https://uniapp.dcloud.io/component/page-meta)
  + App平台 【重要】 老版自定义组件编译模式将于4月1日下线 [详情](https://ask.dcloud.net.cn/article/36988)
  + App平台 【重要】 新增 vue页面引用的js，支持原生混淆（限v3） [详情](https://ask.dcloud.net.cn/article/36437)
  + App平台、H5平台 优化 canvas 组件大小改变时不再丢失内容
  + App平台 新增 原生导航栏支持自定义返回按钮、标题居左、导航栏背景图、背景渐变色等功能 [文档](https://uniapp.dcloud.io/collocation/pages?id=app-titlenview)
  + App平台 新增 video 组件全屏点击事件 fullscreenclick
  + App平台 新增 uni.shareWithSystem 调用系统分享组件发送分享消息 [详情](https://uniapp.dcloud.io/api/plugins/share?id=sharewithsystem)
  + App平台 优化 真机运行时，强化错误提示，输出vue警告日志（限v3）[详情](https://ask.dcloud.net.cn/question/89193)
  + App平台 优化 vue 页面 input、textarea 组件支持 show-confirm-bar 属性（限v3）
  + App平台 优化 picker 组件支持 fields 属性
  + App平台 优化 支持更多 crypto 加密库 [详情](https://ask.dcloud.net.cn/question/89334)
  + App平台 修复 非 v3编译模式 webview 组件高度不正确的Bug [详情](https://ask.dcloud.net.cn/question/89683)  
  + App平台 修复 v3版本 vue 页面热刷新时 onLoad 参数被重复编码的Bug
  + App平台 修复 v3版本 vue map 组件 scale 属性和 tap 事件无效问题 [详情](https://ask.dcloud.net.cn/question/89491)
  + App平台 修复 v3版本 uni.getStorage 部分情况下获取数据格式错误的Bug [详情](https://ask.dcloud.net.cn/question/87866)
  + App平台 修复 v3版本 $nextTick 无法返回 Promise 的Bug
  + App平台 修复 v3版本 点击 tabBar 会重复触发 onShow 的Bug [详情](https://ask.dcloud.net.cn/question/87497)
  + App平台 修复 v3版本 input、textarea 组件 cursor-spacing 属性为字符串时报错的Bug
  + App平台 修复 v3版本 picker-view 组件内的 navigator 组件无法跳转的Bug [详情](https://ask.dcloud.net.cn/question/87794)
  + App平台 修复 v3版本 input 组件使用 v-model 后 input 事件会重复触发的Bug
  + App平台 修复 v3版本 多个 tabBar 页面同时使用 subNvue 时，点击蒙层关闭不正常的Bug [详情](https://ask.dcloud.net.cn/question/89050)
  + App平台 修复 v3版本 部分情况组件渲染不正确的Bug [#1334](https://github.com/dcloudio/uni-app/issues/1334)
  + App平台 修复 v3版本 部分情况文本节点渲染不正确的Bug [详情](https://ask.dcloud.net.cn/question/89557)
  + App平台 修复 v3版本 vue map 组件动态修改 v-if 无效隐藏的Bug [详情](https://ask.dcloud.net.cn/question/89986)
  + App平台 修复 v3版本 nvue map API translateMarker 无效的Bug
  + App平台 修复 v3版本 cover-view 组件部分样式渲染不正确的Bug [详情](https://ask.dcloud.net.cn/question/89609)
  + App平台 修复 v3版本 使用 renderjs 后，低版本系统运行异常的Bug [详情](https://github.com/dcloudio/uni-app/issues/1373)
  + App平台 修复 v3版本 真机运行 修改 pages.json 触发多次同步手机端文件的Bug
  + App平台 修复 非v3模式 app.vue 中使用 css 变量不生效的Bug [详情](https://ask.dcloud.net.cn/question/89367)
  + App平台 修复 uni.uploadFile 的 formData 属性中不能包含数值类型的Bug [详情](https://ask.dcloud.net.cn/question/87951)
  + App平台 修复 nvue页面 movable-view 组件 inertia 属性不生效的Bug
  + App平台 修复 uni.request 在 content-type 为 application/json 时自动对 data 序列化 [详情](https://ask.dcloud.net.cn/question/89474)
  + App平台 修复 某些情况下事件接收参数不正确的Bug [详情](https://ask.dcloud.net.cn/question/89818)
  + App-Android平台 修复 nvue map 组件不设置 markers 属性导致tap事件不触发的Bug
  + App-Android平台 修复 云打包后 uni.getImageInfo() 获取本地图片信息可能会触发失败回调的Bug
  + App-Android平台 修复 v3版本 wgt热更新后无法打开新增页面的Bug [详情](https://ask.dcloud.net.cn/question/88829)
  + App-Android平台 修复 nvue video 组件在页面中存在多个且包含 cover-view 全屏播放时闪退的Bug [详情](https://ask.dcloud.net.cn/question/88718)
  + App-iOS平台 修复 v3版本 wgt热更新后 plus.runtime.restart 卡在启动页的Bug [详情](https://ask.dcloud.net.cn/question/89966)
  + App-iOS平台 修复 v3版本 video 组件部分情况无法显示的bug
  + App-iOS平台 修复 nvue web-view 组件加载本地文件显示空白的Bug [详情](https://ask.dcloud.net.cn/question/90114)
  + App-iOS平台 修复 nvue image 组件使用相对路径加载图片可能会不显示的Bug [详情](https://ask.dcloud.net.cn/question/89117)
  + App-iOS平台 修复 video 组件设置 muted 为0静音后再设置为1时无法重新开启声音的bug [详情](https://ask.dcloud.net.cn/question/89106)
  + H5平台 优化 内置组件响应鼠标事件，可在PC浏览器正常拖动和滚动
  + H5平台 优化 “网络不给力”现象，调整页面加载超时时间和提示文案
  + H5平台 优化 修改代码后提升页面热更新速度
  + H5平台 修复 picker 组件设置 fields 属性后返回值格式错误的Bug
  + H5平台 修复 picker 组件设置 value 部分情况无法触发视图更新的Bug [#1162](https://github.com/dcloudio/uni-app/issues/1162)
  + H5平台 修复 uni.createSelectorQuery 返回的节点信息中 bottom 值错误的Bug [详情](https://ask.dcloud.net.cn/question/85968)
  + H5平台 修复 map 组件无法同时加载多个实例的Bug [详情](https://ask.dcloud.net.cn/question/88735)
  + H5平台 修复 movable-view 组件限制移动方向后，拖动操作会出现中断的Bug
  + H5平台 修复 tranparentTitle 失效的Bug [详情](https://ask.dcloud.net.cn/question/89354)
  + H5平台 修复 部分浏览器中 uni.getSystemInfo 获取 windowTop、windowHeight 值错误的Bug [#1348](https://github.com/dcloudio/uni-app/issues/1348)
  + H5平台 修复 在页面 onReady 生命周期内绘制canvas 绘制内容会一闪消失的Bug [详情](https://ask.dcloud.net.cn/question/81675)
  + 小程序平台 修复 easycom 无法正常使用驼峰式命名组件的Bug [详情](https://ask.dcloud.net.cn/question/87925)
  + 小程序平台 修复 App.vue 包含 template 节点时，导致 app.json 生成错误的Bug [#1351](https://github.com/dcloudio/uni-app/issues/1351)
  + 微信小程序平台 修复 控制台没有输出生命周期内异常的Bug [详情](https://ask.dcloud.net.cn/question/89440)
  + 钉钉小程序平台 调整 uni.request 在 content-type 为 application/json 时自动序列化 data
  + uni-ui 修复 NoticeBar 通告栏组件关闭按钮不显示的Bug
  + uni-ui 修复 IndexedList 索引列表组件非全屏显示时，右侧索引位置与点击位置偏移的Bug
* 【uniCloud】
  + 新增 云函数 批量上传功能
  + 新增 云函数 运行调试传参功能（右键【配置运行测试参数】) [详情](https://uniapp.dcloud.io/uniCloud/quickstart?id=%e8%bf%90%e8%a1%8c%e5%92%8c%e8%b0%83%e8%af%95%e4%ba%91%e5%87%bd%e6%95%b0)
  + 新增 云数据库 通过db_init.json初始化数据的功能 [详情](https://uniapp.dcloud.io/uniCloud/quickstart?id=%e4%bd%bf%e7%94%a8db_initjson%e5%88%9d%e5%a7%8b%e5%8c%96%e9%a1%b9%e7%9b%ae%e6%95%b0%e6%8d%ae%e5%ba%93)
  + 新增 云数据库 支持在web控制台配置索引
  + 优化 web控制台体验 [详情](https://uniapp.dcloud.io/uniCloud/release)
* 【uni-AD】 
  + 优化 激励视频广告内部加载逻辑，完善错误信息 [详情](https://ask.dcloud.net.cn/article/36718#rewarderror)
  + 优化 web控制台。原dev.dcloud.net.cn中的广告相关页面，统一迁移到新的[https://uniad.dcloud.net.cn/](https://uniad.dcloud.net.cn/)
* 【App插件(含5+App和uni-app的App端)】
  + 新增 原生标题栏支持自定义返回按钮、标题居左、标题栏背景图、背景渐变色等功能 [文档](https://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewTitleNViewStyles)
  + 新增 视频播放控件 VideoPlayer 支持全屏播放时点击事件 fullscreenclick [文档](https://www.html5plus.org/doc/zh_cn/video.html#plus.video.VideoPlayerEvents)
  + Android平台 新增 原生隐私与政策提示框配置 [详情](https://ask.dcloud.net.cn/article/36937)
  + Android平台 优化 云端打包默认需要的系统权限，支持配置是否自动添加第三方SDK需要的权限 [详情](https://ask.dcloud.net.cn/article/36982)
  + Android平台 优化 Webview窗口加载可缩放页面时默认隐藏系统缩放控制条 [详情](https://ask.dcloud.net.cn/question/89088)
  + Android平台 修复 获取系统语言信息 plus.os.language 字符中没有包含地区信息的Bug
  + iOS平台 新增 适配iOS13+引入的暗黑模式 DarkMode [文档](https://ask.dcloud.net.cn/article/36995)
  + iOS平台 新增 应用使用Push（消息推送）模块后启动时不弹出“发送通知”系统授权框的配置方法 [详情](https://ask.dcloud.net.cn/article/36955#push)
  + iOS平台 修复 视频播放控件 VideoPlayer 设置 objectFit 属性不生效的bug [详情](https://ask.dcloud.net.cn/question/88221)
  + iOS平台 修复 使用WKWebview内核 plus.orientation.getCurrentOrientation 无法获取设备方向信息的Bug
  + Hello H5+ 新增 标题栏自定义返回按钮、标题居左、背景图、背景渐变色等示例
* 【uni小程序SDK】
  + 新增 启动小程序支持传入参数及直达指定页面 [详情](https://ask.dcloud.net.cn/docs/#https://ask.dcloud.net.cn/article/37010)
  + 新增 关闭当前小程序方法及小程序关闭回调方法 [详情](https://ask.dcloud.net.cn/docs/#https://ask.dcloud.net.cn/article/37014)
  + 新增 获取当前运行的小程序appid方法
  + Android平台 修复启动小程序后调用扫码可能引起的闪退问题 [详情](https://ask.dcloud.net.cn/question/89827)

#### 2.6.4.20200310-alpha
* 【uni-app插件】
  + App平台 新增 uni.shareWithSystem 调用系统分享组件发送分享消息 [详情](https://uniapp.dcloud.io/api/plugins/share?id=sharewithsystem)
  + App平台 修复 非 v3编译模式 webview 组件高度不正确的Bug [详情](https://ask.dcloud.net.cn/question/89683)  
  + App平台 修复 v3版本 uni.request 的 header 内使用小写的 content-type 会报错的Bug [详情](https://ask.dcloud.net.cn/question/90214)
  + App平台 修复 v3版本 vue 页面热刷新时 onLoad 参数被重复编码的Bug
  + App平台 修复 v3版本 vue map 组件 scale 属性和 tap 事件无效问题 [详情](https://ask.dcloud.net.cn/question/89491)
  + App-Android平台 修复 v3版本 wgt热更新后无法打开新增页面的Bug [详情](https://ask.dcloud.net.cn/question/88829)
  + App-iOS平台 修复 v3版本 wgt热更新后 plus.runtime.restart 卡在启动页的Bug [详情](https://ask.dcloud.net.cn/question/89966)
  + App-iOS平台 修复 v3版本 video 组件部分情况无法显示的bug
  + App-iOS平台 修复 nvue web-view 组件加载本地文件显示空白的Bug [详情](https://ask.dcloud.net.cn/question/90114)
* 【5+App插件】
  + 优化 uni-AD 激励视频广告内部加载逻辑，完善错误信息 [详情](https://ask.dcloud.net.cn/article/36718#rewarderror)

#### 2.6.3.20200305-alpha
* 【uni-app插件】
  + 新增 页面属性配置节点 page-meta [详情](https://uniapp.dcloud.io/component/page-meta)
  + App平台、H5平台 调整 canvas 组件大小改变时不再丢失内容
  + App平台 【重要】 老版自定义组件编译模式将于4月1日下线 [详情](https://ask.dcloud.net.cn/article/36988)
  + App平台 【重要】 新增 vue页面引用的js，支持原生混淆（限v3） [详情](https://ask.dcloud.net.cn/article/36437)
  + App平台 新增 video 组件全屏点击事件 fullscreenclick
  + App平台 优化 真机运行时，强化错误提示，输出vue警告日志（限v3）[详情](https://ask.dcloud.net.cn/question/89193)
  + App平台 优化 vue 页面 input、textarea 组件支持 show-confirm-bar 属性（限v3）
  + App平台 优化 picker 组件支持 fields 属性
  + App平台 优化 支持更多 crypto 加密库 [详情](https://ask.dcloud.net.cn/question/89334)
  + App平台 修复 v3版本 uni.getStorage 部分情况下获取数据格式错误的Bug [详情](https://ask.dcloud.net.cn/question/87866)
  + App平台 修复 v3版本 $nextTick 无法返回 Promise 的Bug
  + App平台 修复 v3版本 点击 tabBar 会重复触发 onShow 的Bug [详情](https://ask.dcloud.net.cn/question/87497)
  + App平台 修复 v3版本 input、textarea 组件 cursor-spacing 属性为字符串时报错的Bug
  + App平台 修复 v3版本 picker-view 组件内的 navigator 组件无法跳转的Bug [详情](https://ask.dcloud.net.cn/question/87794)
  + App平台 修复 v3版本 input 组件使用 v-model 后 input 事件会重复触发的Bug
  + App平台 修复 v3版本 多个 tabBar 页面同时使用 subNvue 时，点击蒙层关闭不正常的Bug [详情](https://ask.dcloud.net.cn/question/89050)
  + App平台 修复 v3版本 部分情况组件渲染不正确的Bug [#1334](https://github.com/dcloudio/uni-app/issues/1334)
  + App平台 修复 v3版本 部分情况文本节点渲染不正确的Bug [详情](https://ask.dcloud.net.cn/question/89557)
  + App平台 修复 v3版本 vue map 组件动态修改 v-if 无效隐藏的Bug [详情](https://ask.dcloud.net.cn/question/89986)
  + App平台 修复 v3版本 nvue map API translateMarker 无效的Bug
  + App平台 修复 v3版本 cover-view 组件部分样式渲染不正确的Bug [详情](https://ask.dcloud.net.cn/question/89609)
  + App平台 修复 v3版本 使用 renderjs 后，低版本系统运行异常的Bug [详情](https://github.com/dcloudio/uni-app/issues/1373)
  + App平台 修复 v3版本 真机运行 修改 pages.json 触发多次同步手机端文件的Bug
  + App平台 修复 非v3模式 app.vue 中使用 css 变量不生效的Bug [详情](https://ask.dcloud.net.cn/question/89367)
  + App平台 修复 uni.uploadFile 的 formData 属性中不能包含数值类型的Bug [详情](https://ask.dcloud.net.cn/question/87951)
  + App平台 修复 nvue页面 movable-view 组件 inertia 属性不生效的Bug
  + App平台 修复 uni.request 在 content-type 为 application/json 时自动对 data 序列化 [详情](https://ask.dcloud.net.cn/question/89474)
  + App平台 修复 某些情况下事件接收参数不正确的Bug [详情](https://ask.dcloud.net.cn/question/89818)
  + App-Android平台 修复 nvue map 组件不设置 markers 属性导致tap事件不触发的Bug
  + App-Android平台 修复 云打包后 uni.getImageInfo() 获取本地图片信息可能会触发失败回调的Bug
  + App-iOS平台 修复 nvue image 组件使用相对路径加载图片可能会不显示的Bug [详情](https://ask.dcloud.net.cn/question/89117)
  + App-iOS平台 修复 video 组件设置 muted 为0静音后再设置为1时无法重新开启声音的bug [详情](https://ask.dcloud.net.cn/question/89106)
  + H5平台 优化 内置组件响应鼠标事件，可在PC浏览器正常拖动和滚动
  + H5平台 优化 “网络不给力”现象，调整页面加载超时时间和提示文案
  + H5平台 优化 修改代码后提升页面热更新速度
  + H5平台 修复 picker 组件设置 fields 属性后返回值格式错误的Bug
  + H5平台 修复 picker 组件设置 value 部分情况无法触发视图更新的Bug [#1162](https://github.com/dcloudio/uni-app/issues/1162)
  + H5平台 修复 uni.createSelectorQuery 返回的节点信息中 bottom 值错误的Bug [详情](https://ask.dcloud.net.cn/question/85968)
  + H5平台 修复 map 组件无法同时加载多个实例的Bug [详情](https://ask.dcloud.net.cn/question/88735)
  + H5平台 修复 movable-view 组件限制移动方向后，拖动操作会出现中断的Bug
  + H5平台 修复 tranparentTitle 失效的Bug [详情](https://ask.dcloud.net.cn/question/89354)
  + H5平台 修复 部分浏览器中 uni.getSystemInfo 获取 windowTop、windowHeight 值错误的Bug [#1348](https://github.com/dcloudio/uni-app/issues/1348)
  + H5平台 修复 在页面 onReady 生命周期内绘制canvas 绘制内容会一闪消失的Bug [详情](https://ask.dcloud.net.cn/question/81675)
  + 小程序平台 修复 easycom 无法正常使用驼峰式命名组件的Bug [详情](https://ask.dcloud.net.cn/question/87925)
  + 小程序平台 修复 App.vue 包含 template 节点时，导致 app.json 生成错误的Bug [#1351](https://github.com/dcloudio/uni-app/issues/1351)
  + 微信小程序平台 修复 控制台没有输出生命周期内异常的Bug [详情](https://ask.dcloud.net.cn/question/89440)
  + 钉钉小程序平台 调整 uni.request 在 content-type 为 application/json 时自动序列化 data
  + uni-ui 修复 NoticeBar 通告栏组件关闭按钮不显示的Bug
  + uni-ui 修复 IndexedList 索引列表组件非全屏显示时，右侧索引位置与点击位置偏移的Bug
* 【5+App插件】
  + 新增 原生标题栏支持自定义返回按钮、标题居左、标题栏背景图、背景渐变色等功能 [文档](https://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewTitleNViewStyles)
  + 新增 视频播放控件 VideoPlayer 支持全屏播放时点击事件 fullscreenclick [文档](https://www.html5plus.org/doc/zh_cn/video.html#plus.video.VideoPlayerEvents)
  + Android平台 新增 原生隐私与政策提示框配置 [详情](https://ask.dcloud.net.cn/article/36937)
  + Android平台 优化 云端打包默认需要的系统权限，支持配置是否自动添加第三方SDK需要的权限 [详情](https://ask.dcloud.net.cn/article/36982)
  + Android平台 优化 Webview窗口加载可缩放页面时默认隐藏系统缩放控制条 [详情](https://ask.dcloud.net.cn/question/89088)
  + Android平台 修复 获取系统语言信息 plus.os.language 字符中没有包含地区信息的Bug
  + iOS平台 新增 适配iOS13+引入的暗黑模式 DarkMode [文档](https://ask.dcloud.net.cn/article/36995)
  + iOS平台 新增 应用使用Push（消息推送）模块后启动时不弹出“发送通知”系统授权框的配置方法 [详情](https://ask.dcloud.net.cn/article/36955#push)
  + iOS平台 修复 视频播放控件 VideoPlayer 设置 objectFit 属性不生效的bug [详情](https://ask.dcloud.net.cn/question/88221)
  + iOS平台 修复 使用WKWebview内核 plus.orientation.getCurrentOrientation 无法获取设备方向信息的Bug
* 【uni小程序SDK】
  + 新增 启动小程序支持传入参数及直达指定页面 [详情](https://ask.dcloud.net.cn/docs/#https://ask.dcloud.net.cn/article/37010)
  + 新增 关闭当前小程序方法及小程序关闭回调方法 [详情](https://ask.dcloud.net.cn/docs/#https://ask.dcloud.net.cn/article/37014)
  + 新增 获取当前运行的小程序appid方法
  + Android平台 修复启动小程序后调用扫码可能引起的闪退问题 [详情](https://ask.dcloud.net.cn/question/89827)

#### 2.6.1.20200226
* 【uni-app插件】
  + App-iOS平台 修复 非 v3 编译模式真机运行时提示框架版本不一致的Bug

#### 2.6.0.20200223
* 【uni-app插件】
  + 【重要】uniCloud公测。serverless模式，全端云开发，js编写后端代码 [详情](https://uniapp.dcloud.io/uniCloud/README)
  + 【重要】uni小程序sdk公测。原生App内嵌本sdk，快速实现小程序能力，或部分栏目实现动态化 [详情](https://ask.dcloud.net.cn/docs/#https://ask.dcloud.net.cn/article/36941)
  + 【重要】新增 uni-AD 广告联盟。整合App、小程序等多端广告，整合腾讯广点通、头条穿山甲、360广告联盟等众多广告源，提供最佳变现平台
  + 【重要】App平台 新增 ad 组件（可用于banner或信息流）、激励视频广告API [详情](https://uniad.dcloud.net.cn/)
  + 【重要】新增 easycom 组件模式，简化组件使用。无需在页面里引入和注册组件，按实际使用打包 [详情](https://uniapp.dcloud.io/collocation/pages?id=easycom)
  + 【重要】App平台、H5平台 新增 renderjs，替代 wxs ，减少逻辑层和视图层的通讯折损 [详情](https://uniapp.dcloud.io/frame?id=renderjs)
  + 【重要】App平台 优化 v3版本 真机运行时修改 vue 文件，手机端重启直达修改页面，无需手动配置 condition
  + 优化 非 scoped 样式支持 >>>、/deep/、::v-deep 语法 [详情](https://github.com/dcloudio/uni-app/issues/1143)
  + App平台、H5平台、微信小程序 新增 uni.getSystemInfo 返回数据支持属性 safeAreaInsets
  + App平台、H5平台、字节跳动小程序平台 新增 swiper 组件支持 disable-touch 属性
  + APP平台、H5平台 调整 默认请求超时时间（request、connectSocket、uploadFile、downloadFile）对齐微信小程序由6秒改为60秒
  + App平台 优化 支持 CSS 变量 --window-top
  + App平台 优化 调试控制台日志输出
  + App平台 优化 v3版本 uni.request API 失败回调中返回详细信息
  + App平台 调整 uni.getSystemInfo 获取的 windowHeight 和 H5平台一致，不再包含 windowTop、windowBottom
  + APP平台 修复 nvue 页面 picker 组件时间、日期类型使用默认值报错的Bug [详情](https://ask.dcloud.net.cn/question/87203)
  + APP平台 修复 nvue 页面 appear、disappear 事件不返回 direction 的Bug
  + App平台 修复 自定义组件模式 vue 文件不包含 script 节点时运行报错的Bug [详情](https://ask.dcloud.net.cn/question/87323)
  + App平台 修复 v3版本 原生组件 fixed 定位无效的Bug [详情](https://ask.dcloud.net.cn/question/87475)
  + App平台 修复 v3版本 uni.createSelectorQuery 无法查询到 id 的Bug [详情](https://ask.dcloud.net.cn/question/87644)
  + App平台 修复 v3版本 非 tab 首页（nvue）显示 tabBar 的Bug [详情](https://ask.dcloud.net.cn/question/87536)
  + App平台 修复 v3版本 div、span 等 H5 组件样式不生效的Bug
  + App平台 修复 v3版本 videoContext.requestFullScreen 不生效的Bug [详情](https://ask.dcloud.net.cn/question/87202)
  + App平台 修复 v3版本 组件 dataset 属性可能导致运行报错的Bug
  + App平台 修复 v3版本 vue 页面 map 组件 部分API无效及属性无法动态更新的Bug [详情](https://ask.dcloud.net.cn/question/86872)
  + App平台 修复 v3版本 uni.request 在 content-type 为 urlencoded 时传入非 Object 的 data 时参数处理不正确的Bug [详情](https://github.com/dcloudio/uni-app/issues/1218)
  + App平台 修复 v3版本 alwaysShowBeforeRender 为 false 时无法关闭启动界面的Bug [详情](https://ask.dcloud.net.cn/question/87038)
  + App平台 修复 v3版本 InnerAudioContext 对象的 seek、onTimeUpdate 方法无效的Bug [详情](https://ask.dcloud.net.cn/question/86891)
  + App平台 修复 v3版本 行内样式设置背景图无效的Bug [详情](https://ask.dcloud.net.cn/question/86898)
  + App平台 修复 v3版本 app-plus 下配置 pullToRefresh 无效的Bug
  + App平台 修复 v3版本 subNvue mask 无法遮盖 tabBar 的Bug
  + App平台 修复 v3版本 多个循环时数据可能混乱的Bug [详情](https://ask.dcloud.net.cn/question/89091)
  + App平台 修复 非v3编译模式 自定义组件失效的Bug [#1271](https://github.com/dcloudio/uni-app/issues/1271)
  + App-iOS平台 修复 v3版本 部分情况下 rpx 计算错误的Bug
  + App-iOS平台 修复 video 组件未播放时调用 seek 可能导致界面不正常的bug [详情](https://ask.dcloud.net.cn/question/80013)
  + App-iOS平台 修复 页面中使用字体图标时可能无法正常显示的Bug
  + App-iOS平台 修复 tabBar 自定义高度时红点和角标显示位置不正确的Bug [详情](https://ask.dcloud.net.cn/question/87344)
  + App-iOS平台 修复 nvue input 组件 placeholder-style 和 placeholder-class 设置 fontSize 不生效的Bug
  + App-iOS平台 修复 nvue list 组件设置 bounce 为 false 可能导致页面无法滚动的Bug
  + App-iOS平台 修复 nvue map 组件使用 controls 控件提交云端打包后可能会引起崩溃的Bug [详情](https://ask.dcloud.net.cn/question/86521)
  + App-Android平台 修复 tabBar 设置 midButton 可能显示不全的Bug [详情](https://ask.dcloud.net.cn/question/87744)
  + App-Android平台 修复 nvue map 组件 markers 更新频繁可能出现失败的Bug [详情](https://ask.dcloud.net.cn/question/87625)
  + App-Android平台 修复 nvue textarea 组件设置 maxlength 为 -1 时无法输入文字的Bug [详情](https://ask.dcloud.net.cn/question/87503)
  + App-Android平台 修复 nvue 页面中组件设置 hover-class 后，页面关闭可能出现闪退的Bug [详情](https://ask.dcloud.net.cn/question/87016)
  + App-Android平台 修复 nvue video 组件下使用 cover-view 后，视频全屏后可能出现排版混乱的Bug [详情](https://ask.dcloud.net.cn/question/86879)
  + App-Android平台 修复 uni.request 在 responseType 为 arraybuffer 时，返回数据可能不准确的Bug [详情](https://ask.dcloud.net.cn/question/86405)
  + App-Android平台 修复 websocket 发送内容中包含特殊字符可能导致发送失败的Bug [详情](https://ask.dcloud.net.cn/question/86670)
  + H5平台 修复 input 组件设置 placeholder 的 top 样式显示错位的Bug [#1222](https://github.com/dcloudio/uni-app/issues/1222)
  + H5平台 修复 启用摇树优化后 uni.previewImage 失效的Bug [#1168](https://github.com/dcloudio/uni-app/issues/1168)
  + H5平台 修复 启用摇树优化后 animation 属性失效的Bug [#1231](https://github.com/dcloudio/uni-app/issues/1231)
  + H5平台 修复 启用摇树优化后 页面样式错乱的Bug [详情](https://ask.dcloud.net.cn/question/87495)
  + H5平台 修复 video 组件销毁报错的Bug [详情](https://ask.dcloud.net.cn/question/86959)
  + H5平台 修复 uni.chooseVideo 在微信内置浏览器无法触发回调的Bug [详情](https://ask.dcloud.net.cn/question/86968)
  + H5平台 修复 audio 组件无法显示的Bug [详情](https://ask.dcloud.net.cn/question/87045)
  + H5平台 修复 部分浏览器上 Object.assign 报错的Bug [#1116](https://github.com/dcloudio/uni-app/issues/1116)
  + H5平台 修复 部分浏览器上 uni.canvasToTempFilePath 报错的Bug [详情](https://ask.dcloud.net.cn/question/87032)
  + hello uni-app 新增 ad 组件示例 和 激励视频广告 API 示例
  + Hello uni-app 优化 canvas 组件示例，使用 renderjs 实现 App端高性能动画
  + uni-ui 新增 uni-combox 可写可选组合框组件
  + uni-ui 修复 v3版本 app-vue 页面中 swipe-action 组件无法滑动的Bug
  + 新增 uni-ui 项目模板，该项目通过 easycom 引入所有 uni-ui 组件，可方便的开发项目
* 【5+App插件】
  + 【重要】新增 plus.ad 广告模块，聚合穿山甲、广点通、360联盟等uni-AD联盟服务，支持信息流、banner、激励视频等应用内自定义广告 [文档](https://www.html5plus.org/doc/zh_cn/ad.html)
  + 新增 Webview窗口样式支持设置禁止调用plus属性 disablePlus，解决加载外部页面时可能调用plus对应用造成危害的隐患 [详情](https://ask.dcloud.net.cn/question/85390)
  + 新增 数据库执行SQL语句 plus.sqlite.executeSql 支持一次传入多条语句，解决Android平台一条SQL语句中不支持以分号分割多条命令的需求 [详情](https://ask.dcloud.net.cn/article/36810)
  + 新增 推送 支持异步获取客户端推送标识接口 plus.push.getClientInfoAsync，解决同步接口可能返回空数据的问题 [文档](https://www.html5plus.org/doc/zh_cn/push.html#plus.push.getClientInfoAsync)
  + 【重要】Android平台 新增 腾讯X5内核。可解决rom自定义主题字体适配、低端机浏览器兼容性等问题 [详情](https://ask.dcloud.net.cn/article/36806)
  + Android平台 修复 Webview窗口创建并显示后立即关闭可能出现闪退的Bug [详情](https://ask.dcloud.net.cn/question/86918)
  + Android平台 修复 在定时器回调函数中调用 plus.screen.lockOrientation 可能会引起应用闪退的Bug
  + Android平台 修复 在部分手机上获取OAID可能触发错误回调，错误信息提示不支持的Bug [详情](https://ask.dcloud.net.cn/question/87441)
  + Android平台 修复 调用系统分享消息 plus.share.sendWithSystem 标题不支持国际化的Bug [详情](https://ask.dcloud.net.cn/question/87936)
  + Android平台 修复 音频播放对象 AudioPlayer 触发end事件之后，调用 stop 和 destroy 方法会出现闪退的Bug [详情](https://ask.dcloud.net.cn/question/73227)
  + iOS平台 修复 在非刘海屏手机获取应用的安全区域 plus.navigator.getSafeAreaInsets 返回 deviceTop 数据可能不正确的Bug
  + iOS平台 修复 调用 plus.gallery.pick 选择相册中的照片后, 连续快速点击完成按钮可能会引起应用崩溃的Bug [详情](https://ask.dcloud.net.cn/question/87123)
  + iOS平台 修复 视频播放控件 VideoPlayer 暂停播放后手势快进或后退操作时，没有更新进度条上显示时间的Bug

#### 2.5.11.20200212-alpha
* 【uni-app插件】
  + App平台 新增 API uni.createRewardedVideoAd，激励视频广告 [详情](https://uniapp.dcloud.io/component/ad-rewarded-video)
  + hello uni-app 新增 ad 组件示例
  + hello uni-app 新增 激励视频广告 API示例
* 【5+App插件】
  + 新增 uni-AD 支持激励视频广告 [文档](https://www.html5plus.org/doc/zh_cn/ad.html#plus.ad.createRewardedVideoAd)
  + 新增 推送 支持异步获取客户端推送标识接口 plus.push.getClientInfoAsync，解决同步接口可能返回空数据的问题 [文档](https://www.html5plus.org/doc/zh_cn/push.html#plus.push.getClientInfoAsync)
  + iOS平台 修复 HBuilderX2.5.8引出的视频播放控件无法播放直播地址的Bug [详情](https://ask.dcloud.net.cn/question/88393)

#### 2.5.10.20200205-alpha
* 【uni-app插件】
  + APP平台、H5平台 优化 默认请求超时时间（request、connectSocket、uploadFile、downloadFile）对齐微信小程序由6秒改为60秒
* 【5+App插件】
  + Android平台 修复 调用系统分享消息 plus.share.sendWithSystem 标题不支持国际化的Bug [详情](https://ask.dcloud.net.cn/question/87936)

#### 2.5.9.20200203-alpha
* 【uni-app插件】
  + uniCloud 支持 H5平台的发布
  + uniCloud 支持设置协作者，多人使用相同AppID的项目，可绑定同一服务空间。方法：[开发者中心](https://dev.dcloud.net.cn) -> 选择应用 -> 项目成员管理。
  + uniCloud 修复 H5平台 main.js 内使用 uniCloud 报错的Bug
  + uniCloud 修复 App平台 callback 方式调用云函数报错的Bug
  + uniCloud 修复 上传 mp3 文件报错的Bug
  + uni-ui 新增 uni-combox 组合框组件

#### 2.5.8.20200128-alpha
* 【uni-app插件】
  + 【重要】uniCloud公测。serverless模式，全端云开发，js编写后端代码 [详情](https://uniapp.dcloud.io/uniCloud/README)
  + App-Android平台 修复 tabBar 设置 midButton 可能显示不全的Bug [详情](https://ask.dcloud.net.cn/question/87744)
  + App-iOS平台 修复 video 组件未播放时调用 seek 可能导致界面不正常的bug [详情](https://ask.dcloud.net.cn/question/80013)
  + App-iOS平台 修复 nvue input 组件 placeholder-style 和 placeholder-class 设置 fontSize 不生效的Bug
  + App-iOS平台 修复 页面中使用字体图标时可能无法正常显示的Bug
* 【5+App插件】
  + iOS平台 修复 视频播放控件 VideoPlayer 暂停播放后手势快进或后退操作时，没有更新进度条上显示时间的Bug

#### 2.5.7.20200116-alpha
* 【uni-app插件】
  + App平台 修复 v3版本 原生组件 fixed 定位无效的Bug [详情](https://ask.dcloud.net.cn/question/87475)
  + App平台 修复 v3版本 uni.createSelectorQuery 无法查询到 id 的Bug [详情](https://ask.dcloud.net.cn/question/87644)
  + App平台 修复 v3版本 非 tab 首页（nvue）显示 tabBar 的Bug [详情](https://ask.dcloud.net.cn/question/87536)
  + App平台 修复 v3版本 div、span 等 H5 组件样式不生效的Bug
  + App平台 修复 v3版本 videoContext.requestFullScreen 不生效的Bug [详情](https://ask.dcloud.net.cn/question/87202)
  + App平台 修复 v3版本 vue map 组件 API 不支持通过 $getAppMap 获取原生 map 对象的Bug
  + App-Android平台 修复 nvue map 组件 markers 更新频繁可能出现失败的Bug [详情](https://ask.dcloud.net.cn/question/87625)
  + H5平台 修复 启用摇树优化后 页面样式错乱的Bug [详情](https://ask.dcloud.net.cn/question/87495)
  + uni-ui 修复 v3版本 app-vue 页面中 swipe-action 组件无法滑动的Bug
* 【5+App插件】
  + Android平台 优化 uni-AD 使用今日头条穿山甲广告，在Android8及以上版本华为手机没有访问设备信息权限时只显示抖音广告的Bug
  + Android平台 修复 音频播放对象 AudioPlayer 触发end事件之后，调用 stop 和 destroy 方法会出现闪退的Bug [详情](https://ask.dcloud.net.cn/question/73227)

#### 2.5.6.20200113-alpha
* 【uni-app插件】
  + App平台 修复 非v3编译模式 自定义组件失效的Bug [#1271](https://github.com/dcloudio/uni-app/issues/1271)
  + App平台 修复 v3版本 组件 dataset 属性可能导致运行报错的Bug
  + App平台 优化 v3版本 uni.request API 失败回调中返回详细信息
  + App-Android平台 修复 nvue textarea 组件设置 maxlength 为 -1 时无法输入文字的Bug [详情](https://ask.dcloud.net.cn/question/87503)
  + App-iOS平台 修复 nvue list 组件设置 bounce 为 false 可能导致页面无法滚动的Bug
  + H5平台 修复 input 组件设置 placeholder 的 top 样式显示错位的Bug [#1222](https://github.com/dcloudio/uni-app/issues/1222)
* 【5+App插件】
  + 新增 Webview窗口样式支持设置禁止调用plus属性 disablePlus，解决加载外部页面时可能调用plus对应用造成危害的隐患 [详情](https://ask.dcloud.net.cn/question/85390)

#### 2.5.5.20200111-alpha
* 【uni-app插件】
  + 【重要】easycom 支持自动扫描组件，符合目录规则的组件，无需在pages.json配置即可直接使用 [详情](https://uniapp.dcloud.io/collocation/pages?id=easycom)
  + 【重要】App平台、H5平台 新增 支持 renderjs，替代 wxs ，以 vue 组件的写法运行在视图层 [详情](https://uniapp.dcloud.io/frame?id=renderjs)
  + App平台、H5平台、字节跳动小程序平台 新增 swiper 组件支持 disable-touch 属性
  + App平台 修复 自定义组件模式 vue 文件不包含 script 节点时运行报错的Bug [详情](https://ask.dcloud.net.cn/question/87323)
  + APP平台 修复 nvue 页面 picker 组件时间、日期类型使用默认值报错的Bug [详情](https://ask.dcloud.net.cn/question/87203)
  + APP平台 修复 nvue 页面 appear、disappear 事件不返回 direction 的Bug
  + App平台 修复 v3版本 vue 页面 map 组件 部分API无效及属性无法动态更新的Bug [详情](https://ask.dcloud.net.cn/question/86872)
  + App平台 修复 v3版本 uni.request 在 content-type 为 urlencoded 时传入非 Object 的 data 时参数处理不正确的Bug [详情](https://github.com/dcloudio/uni-app/issues/1218)
  + App平台 修复 v3版本 alwaysShowBeforeRender 为 false 时无法关闭启动界面的Bug [详情](https://ask.dcloud.net.cn/question/87038)
  + App平台 修复 v3版本 InnerAudioContext 对象的 seek、onTimeUpdate 方法无效的Bug [详情](https://ask.dcloud.net.cn/question/86891)
  + App-Android平台 修复 uni.request 在 responseType 为 arraybuffer 时，返回数据可能不准确的Bug [详情](https://ask.dcloud.net.cn/question/86405)
  + App-iOS平台 修复 tabBar 自定义高度时红点和角标显示位置不正确的Bug [详情](https://ask.dcloud.net.cn/question/87344)
  + H5平台 修复 启用摇树优化后 easycom 组件失效的Bug [详情](https://ask.dcloud.net.cn/question/87170)
  + H5平台 修复 启用摇树优化后 uni.previewImage 失效的Bug [#1168](https://github.com/dcloudio/uni-app/issues/1168)
  + H5平台 修复 启用摇树优化后 animation 属性失效的Bug [#1231](https://github.com/dcloudio/uni-app/issues/1231)
  + H5平台 修复 部分浏览器上 Object.assign 报错的Bug [#1116](https://github.com/dcloudio/uni-app/issues/1116)
  + H5平台 修复 部分浏览器上 uni.canvasToTempFilePath 报错的Bug [详情](https://ask.dcloud.net.cn/question/87032)
  + Hello uni-app 优化 canvas 组件示例使用renderjs实现
* 【5+App插件】
  + 新增 数据库执行SQL语句 plus.sqlite.executeSql 支持一次传入多条语句，解决Android平台一条SQL语句中不支持以分号分割多条命令的需求 [详情](https://ask.dcloud.net.cn/article/36810)
  + Android平台 修复 在定时器回调函数中调用 plus.screen.lockOrientation 可能会引起应用闪退的Bug
  + Android平台 修复 在部分手机上获取OAID可能触发错误回调，错误信息提示不支持的Bug [详情](https://ask.dcloud.net.cn/question/87441)
  + iOS平台 修复 调用 plus.gallery.pick 选择相册中的照片后, 连续快速点击完成按钮可能会引起应用崩溃的bug [详情](https://ask.dcloud.net.cn/question/87123)

#### 2.5.3-20200107-alpha
* 【uni-app插件】
  + 【重要】新增 easycom 组件模式，简化组件使用。无需在页面里引入和注册组件，打包时会自动剔除没有使用的组件 [详情](https://uniapp.dcloud.io/collocation/pages?id=easycom)
  + 【重要】新增 uni-AD 广告联盟。整合App、小程序等多端广告，整合腾讯广点通、头条穿山甲、360广告联盟等众多SDK [详情](https://uniad.dcloud.net.cn/)
  + 【重要】App平台 新增 ad 组件，支持信息流、banner等应用内自定义广告 [详情](https://uniapp.dcloud.io/component/ad)
  + 【重要】App平台 优化 v3版本 运行时修改 vue 页面，手机端重启后可直达修改页面，无需手动配置 condition
  + 优化 非 scoped 样式支持 >>>、/deep/、::v-deep 语法[详情](https://github.com/dcloudio/uni-app/issues/1143)
  + App平台、H5平台、微信小程序 新增 uni.getSystemInfo 返回数据支持属性 safeAreaInsets
  + App平台 优化 调试控制台日志输出
  + App平台 优化 支持 CSS 变量 --window-top
  + App平台 优化 uni.getSystemInfo 获取的 windowHeight 不含 windowTop、windowBottom
  + App平台 修复 v3版本 行内样式设置背景图无效的Bug [详情](https://ask.dcloud.net.cn/question/86898)
  + App平台 修复 v3版本 app-plus 下配置 pullToRefresh 无效的Bug
  + App平台 修复 v3版本 subNvue mask 无法遮盖 tabBar 的Bug
  + App平台 修复 v3版本 vue map 组件动态更新中心点 latitude、longitude 无效的Bug [详情](https://ask.dcloud.net.cn/question/86963)
  + App-Android平台 修复 HBuilderX2.4.7引出的 nvue swiper 组件设置 autoplay 属性时最后一页会跳掉不显示的Bug [详情](https://ask.dcloud.net.cn/question/86856)
  + App-Android平台 修复 websocket 发送内容中包含特殊字符可能导致发送失败的Bug [详情](https://ask.dcloud.net.cn/question/86670)
  + App-Android平台 修复 nvue 页面中组件设置 hover-class 后，页面关闭可能出现闪退的Bug [详情](https://ask.dcloud.net.cn/question/87016)
  + App-Android平台 修复 nvue video 组件下使用 cover-view 后，视频全屏后可能出现排版混乱的Bug [详情](https://ask.dcloud.net.cn/question/86879)
  + App-iOS平台 修复 nvue map 组件使用 controls 控件提交云端打包后可能会引起崩溃的Bug [详情](https://ask.dcloud.net.cn/question/86521)
  + App-iOS平台 修复 v3版本 部分情况下 rpx 计算错误的Bug
  + H5平台 修复 video 组件销毁报错的Bug [详情](https://ask.dcloud.net.cn/question/86959)
  + H5平台 修复 audio 组件无法显示的Bug [详情](https://ask.dcloud.net.cn/question/87045)
  + H5平台 修复 uni.chooseVideo 在微信内置浏览器无法触发回调的Bug [详情](https://ask.dcloud.net.cn/question/86968)
  + 新增 uni-ui 项目模板。该项目通过 easycom 引入所有 uni-ui 组件，可方便的开发项目
* 【5+App插件】
  + 【重要】新增 uni-AD 广告联盟。整合App、小程序等多端广告，整合腾讯广点通、头条穿山甲、360广告联盟等众多SDK [详情](https://uniad.dcloud.net.cn/)
  + 【重要】新增 plus.ad 广告模块，支持信息流、banner等应用内自定义广告 [文档](https://www.html5plus.org/doc/zh_cn/ad.html)
  + 【重要】Android平台 新增 腾讯X5内核。可解决rom自定义主题字体适配、低端机浏览器兼容性等问题 [详情](https://ask.dcloud.net.cn/article/36806)
  + Android平台 修复 Webview窗口创建并显示后立即关闭可能出现闪退的Bug [详情](https://ask.dcloud.net.cn/question/86918)
  + iOS平台 修复 在非刘海屏手机获取应用的安全区域 plus.navigator.getSafeAreaInsets 返回 deviceTop 数据可能不正确的Bug

#### 2.5.1.20200103
* 【uni-app插件】
  + 【重要】App端重大架构升级 `v3编译器`，更快的启动速度、更好的性能、更多vue语法支持、可webview调试视图层。新项目默认开启v3，可通过【manifest.json-App其他设置】开启关闭v3 [详情](https://ask.dcloud.net.cn/article/36599)
  + 【重要】H5平台、QQ小程序 支持运行微信小程序组件 [详情](https://uniapp.dcloud.io/h5/pages/template/vant-button/vant-button)
  + 【重要】App平台 新增 pages.json 配置屏幕方向。横屏应用请在这里配置，app.vue里生效较晚 [详情](https://uniapp.dcloud.io/collocation/pages?id=globalstyle)
  + 优化 非 scoped 样式支持 >>>,/deep/,::v-deep语法[详情](https://github.com/dcloudio/uni-app/issues/1143)
  + App平台 优化 选择位置 支持在搜索结果中选择
  + App平台 优化 picker 组件按钮文字增加多语言支持
  + App平台 修复 v3版本 block 或 template 使用 v-for 且仅包含文本节点时渲染不正确的 Bug [详情](https://github.com/dcloudio/uni-app/issues/1206)
  + App平台 修复 image 组件初始值为空字符串时会执行一次@error事件的Bug
  + App平台 修复 input 组件失焦时会触发一次@input的Bug [详情](https://ask.dcloud.net.cn/question/84456)
  + App平台 修复 webview 组件在非沉浸式状态栏下高度不正确的Bug
  + App平台 修复 chooseImage 传入字符串格式 sizeType 导致报错的Bug
  + App平台 修复 纯 nvue 环境 uni.request 数据格式错误的Bug [#1100](https://github.com/dcloudio/uni-app/issues/1100)
  + App平台 修复 nvue input 组件动态设置 password 属性不生效的Bug
  + App平台 修复 v-for 中监听事件某些情况参数不正确的Bug
  + App平台 修复 picker 组件内容为空字符串时排版错位的Bug [详情](https://ask.dcloud.net.cn/question/85682)
  + App平台 修复 App.vue onError 部分异常未捕获的 Bug [详情](https://github.com/dcloudio/uni-app/issues/1093)
  + App-Android平台 新增 nvue 通用属性 elevation 设置组件的层级阴影，解决 box-shadow 样式在设置圆角或动画时显示不正常的问题 [详情](https://uniapp.dcloud.io/use-weex?id=android平台阴影box-shadow问题)
  + App-Android平台 优化 应用退出后不清掉后台，反复热启动导致底层通信timeout引起的白屏问题
  + App-Android平台 修复 部分使用64位CPU的手机上可能出现白屏的Bug [详情](https://ask.dcloud.net.cn/question/83611)
  + App-Android平台 修复 nvue image 组件在部分手机上设置 fade-show 属性值为false可能仍然会闪烁的Bug 
  + App-Android平台 修复 nvue swipe 组件设置 circular 属性值为true时从首页直接跳到最后一页可能出现页面无法正常渲染的Bug
  + App-Android平台 修复 tabbar 的 midButton 不设置图片时显示默认图片的Bug [详情](https://ask.dcloud.net.cn/question/84908)
  + App-Android平台 修复 nvue map 组件中标注点设置 translateMarker 旋转角度后，点气泡也会随之旋转的Bug [详情](https://ask.dcloud.net.cn/question/84676)
  + App-Android平台 修复 nvue 页面中使用 animation 动画，关闭页面可能会闪退的Bug [详情](https://ask.dcloud.net.cn/question/84902)
  + App-Android平台 修复 nvue scroll-view 组件中嵌套 list 组件，list高度大于scroll-view剩余高度时高度可能不正常的Bug [详情](https://ask.dcloud.net.cn/question/85496)
  + App-Android平台 修复 tabBar 动态设置某一项的内容会导致选中状态失效的Bug [详情](https://ask.dcloud.net.cn/question/80941)
  + 【重要】App-iOS平台 新增 uni.login 支持Apple登录 [详情](https://ask.dcloud.net.cn/article/36651)
  + App-iOS平台 新增 nvue 普通 view 组件支持设置高斯模糊（毛玻璃）效果 [详情](https://ask.dcloud.net.cn/article/36617#view)
  + App-iOS平台 修复 nvue input 组件设置 maxlength 属性后，@input事件返回value值与实际显示值不一致的Bug [详情](https://github.com/dcloudio/uni-app/issues/1073)
  + App-iOS平台 修复 tabbar及标题栏上设置字体图标可能无法正常显示的Bug
  + App-iOS平台 修复 nvue map 组件不设置 marker 的 title 及 callout 时会显示空白标注的Bug [详情](https://ask.dcloud.net.cn/question/85874)
  + App-iOS平台 修复 nvue map 组件使用 controls 控件提交云端打包后可能会引起崩溃的Bug [详情](https://ask.dcloud.net.cn/question/86521)
  + App-iOS平台 修复 使用 uni.hideKeyboard 输入框无法失去焦点的Bug [详情](https://ask.dcloud.net.cn/question/85681)
  + H5平台 新增 支持 editor 组件 [详情](https://uniapp.dcloud.io/h5/pages/component/editor/editor)
  + H5平台 新增 支持使用 nodesRef.context 获取 VideoContext、CanvasContext 和 MapContext 对象
  + H5平台 新增 video 组件支持 @loadedmetadata、@progress 事件
  + H5平台 优化 发行时 index.css 文件名包含 hash 以便更好的控制缓存 [详情](https://ask.dcloud.net.cn/question/84990)
  + H5平台 优化 video 组件全屏展示效果 [详情](https://ask.dcloud.net.cn/question/85223)
  + H5平台 优化 canvas 组件内存占用
  + H5平台 修复 css 变量 --window-bottom 在全面屏设备不准确的Bug [详情](https://ask.dcloud.net.cn/question/83069)
  + H5平台 修复 canvasContext.measureText 报错的Bug [详情](https://ask.dcloud.net.cn/question/84858)
  + H5平台 修复 uni.createAnimation 动画不正确的Bug [详情](https://ask.dcloud.net.cn/question/84862)
  + H5平台 修复 webview 页面调用 uni API 无效的Bug [详情](https://ask.dcloud.net.cn/question/84977)
  + H5平台 修复 tabBar 文字较多时角标（红点）错位的Bug [详情](https://ask.dcloud.net.cn/question/83293)
  + H5平台 修复 textarea 组件未设置 line-height 时 linechange 事件 lineCount 值错误的Bug [#1123](https://github.com/dcloudio/uni-app/issues/1123)
  + H5平台 修复 swiper 组件动画过程中销毁组件会报错的Bug [#1123](https://github.com/dcloudio/uni-app/issues/1127)
  + H5平台 修复 image 组件 src 包含英文括号时无法正常的Bug [#1090](https://github.com/dcloudio/uni-app/pull/1090)
  + H5平台 修复 globalStyle 下 h5 节点配置不生效的Bug
  + H5平台 修复 editor 组件未配置图像控件时报错的Bug
  + H5平台 修复 在不支持 localStorage 的环境运行时框架报错的Bug [#1155](https://github.com/dcloudio/uni-app/issues/1155)
  + 支付宝小程序平台 新增 支持 onBackPress [详情](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=%E9%A1%B5%E9%9D%A2%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)
  + 支付宝小程序平台 新增 支持配置 mini.project.json (manifest.json->mp-alipay) [#1164](https://github.com/dcloudio/uni-app/issues/1164)
  + 支付宝小程序平台 修复 使用 createIntersectionObserver 报错的Bug
  + 支付宝小程序平台 修复 使用 createSelectorQuery().in(this) 报错的Bug [详情](https://github.com/dcloudio/uni-app/issues/1190)
  + uni-ui 新增 vue doc，在HBuilderX中可以给予更完善的代码提示 [什么是vue doc](https://ask.dcloud.net.cn/article/35814)
  + hello uni-app 新增 canvas 组件示例(App端使用wxs实现高性能动画)
* 【5+App插件】
  + Android平台 更新 高德地图SDK（7.1.0）
  + Android平台 修复 Webview窗口关闭后可能出现内存占用不释放的Bug [详情](https://ask.dcloud.net.cn/question/83587)
  + Android平台 修复 数据库执行SQL语句 plus.sqlite.executeSql 不支持多条sql语句的Bug [详情](https://ask.dcloud.net.cn/question/74376)
  + Android平台 修复 真机运行默认将日志保存到SD卡中，长时间运行可能出现日志文件过大的Bug
  + 【重要】iOS平台 新增 支持苹果授权登录（Sign in with Apple） [教程](https://ask.dcloud.net.cn/article/36651)
  + iOS平台 修复 音频播放对象（AudioPlayer）播放网络音频时，缓存完成恢复播放时没有触发 onPlay 事件的Bug
  + iOS平台 修复 Webview窗口的titleUpdate事件可能不触发导致无法修改页面标题的Bug [详情](https://ask.dcloud.net.cn/question/84115)
  + iOS平台 修复 Webview窗口的标题栏（titleNView）设置titleSize属性不生效的Bug
  + iOS平台 修复 系统日期选择框（plus.nativeUI.pickDate）、时间选择框（plus.nativeUI.pickTime）在横屏时显示不正常的Bug
  + iOS平台 修复 应用切换到后台，从其它应用传参数激活到前台时 plus.runtime.arguments 可能不更新的Bug
  + iOS平台 修复 录音对象（AudioRecorder）录制mp3格式音频设置 channels 参数值为 mono 不生效的Bug [详情](https://ask.dcloud.net.cn/question/85493)
  + iOS平台 修复 录音对象（AudioRecorder）设置音频播放模式 setSessionCategory 可能不生效的Bug
  + iOS平台 修复 iOS13调用 plus.screen.setBrightness 方法可能会导致页面失去响应的Bug
  + iOS平台 修复 在非刘海屏手机获取应用的安全区域 plus.navigator.getSafeAreaInsets 返回 deviceTop 数据可能不正确的Bug

#### 2.5.0.20191231-alpha
* 【uni-app插件】
  + App平台 新建项目默认使用v3编译器，如不需要v3编译，请在【manifest-App常用其他配置】取消
  + App平台 新增 v3版本 支持配置 nvue 首页 fast 启动模式，即不等待逻辑层初始化完毕，直接启动渲染层 [详情](https://uniapp.dcloud.io/collocation/manifest?id=app-plus)
  + App平台 修复 v3版本 globalStyle 内配置页面动画不生效的Bug [详情](https://ask.dcloud.net.cn/question/85654)
  + App平台 修复 v3版本 无法读取非v3版本存储的 storage 数据的Bug
  + App平台 修复 picker 组件内容为空字符串时排版错位的Bug [详情](https://ask.dcloud.net.cn/question/85682)
  + App-iOS平台 修复 tabbar及标题栏上设置字体图标可能无法正常显示的Bug
  + App-iOS平台 修复 nvue map 组件不设置 marker 的 title 及 callout 时会显示空白标注的Bug [详情](https://ask.dcloud.net.cn/question/85874)
  + App-iOS平台 修复使用 uni.hideKeyboard 输入框无法失去焦点的Bug [详情](https://ask.dcloud.net.cn/question/85681)
  + H5平台 新增 video 组件支持 @loadedmetadata、@progress 事件
  + H5平台 优化 video 组件全屏展示效果 [详情](https://ask.dcloud.net.cn/question/85223)
  + H5平台 优化 canvas 组件内存占用
  + H5平台 修复 globalStyle 下 h5 节点配置不生效的Bug
  + H5平台 修复 editor 组件未配置图像控件时报错的Bug
  + H5平台 修复 在不支持 localStorage 的环境运行时框架报错的Bug [#1155](https://github.com/dcloudio/uni-app/issues/1155)
  + 支付宝小程序平台 新增 支持 onBackPress [详情](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=%E9%A1%B5%E9%9D%A2%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)
  + 支付宝小程序平台 修复 使用 createSelectorQuery().in(this) 报错的Bug [详情](https://github.com/dcloudio/uni-app/issues/1190)
  + 支付宝小程序平台 新增 支持配置 mini.project.json (manifest.json->mp-alipay) [#1164](https://github.com/dcloudio/uni-app/issues/1164)
  + uni-ui 新增vue doc，在HBuilderX中可以给予更完善的代码提示 [什么是vue doc](https://ask.dcloud.net.cn/article/35814)
* 【5+App插件】
  + Android平台 修复 HBuilderX2.4.9引出的在无网环境下应用启动可能崩溃的Bug
  + Android平台 修复 真机运行默认将日志保存到SD卡中，长时间运行可能出现日志文件过大的Bug
  + iOS平台 修复 录音对象（AudioRecorder）录制mp3格式音频设置 channels 参数值为 mono 不生效的Bug [详情](https://ask.dcloud.net.cn/question/85493)
  + iOS平台 修复 录音对象（AudioRecorder）设置音频播放模式 setSessionCategory 可能不生效的Bug
  + iOS平台 修复 iOS13调用 plus.screen.setBrightness 方法可能会导致页面失去响应的Bug

#### 2.4.9.20191223-alpha
* 【uni-app插件】
  + App平台 修复 v3版本 uCharts 某些图表类型无法显示的Bug
  + App-Android平台 修复 HBuilderX2.4.8引出的 nvue list 组件的下拉刷新功能无法使用的Bug
  + App-Android平台 修复 tabBar 动态设置某一项的内容会导致选中状态失效的Bug [详情](https://ask.dcloud.net.cn/question/80941)

#### 2.4.8.20191220-alpha
* 【uni-app插件】
  + App平台 修复 v-for 中监听事件某些情况参数不正确的Bug
  + App平台 修复 uni.login 微信登录提示“没有这些scope权限”的Bug [详情](https://ask.dcloud.net.cn/question/85417)
  + App-Android平台 修复 nvue map 组件中标注点设置 translateMarker 旋转角度后，点气泡也会随之旋转的Bug [详情](https://ask.dcloud.net.cn/question/84676)
  + App-Android平台 修复 nvue 页面中使用 animation 动画，关闭页面可能会闪退的Bug [详情](https://ask.dcloud.net.cn/question/84902)
  + App-Android平台 优化 应用退出后不清掉后台，反复热启动导致底层通信timeout引起的白屏问题
  + App-Android平台 修复 nvue scroll-view 组件中嵌套 list 组件，list高度大于scroll-view剩余高度时高度可能不正常的Bug [详情](https://ask.dcloud.net.cn/question/85496)
  + App-iOS平台 新增 nvue 普通 view 组件支持设置高斯模糊（毛玻璃）效果 [详情](https://ask.dcloud.net.cn/article/36617#view)
  + H5平台 优化 发行时 index.css 文件名包含 hash 以便更好的控制缓存 [详情](https://ask.dcloud.net.cn/question/84990)
  + H5平台 修复 tabBar 文字较多时角标（红点）错位的Bug [详情](https://ask.dcloud.net.cn/question/83293)
  + H5平台 修复 textarea 组件未设置 line-height 时 linechange 事件 lineCount 值错误的Bug [#1123](https://github.com/dcloudio/uni-app/issues/1123)
  + H5平台 修复 swiper 组件动画过程中销毁组件会报错的Bug [#1123](https://github.com/dcloudio/uni-app/issues/1127)
  + H5平台 修复 image 组件 src 包含英文括号时无法正常的Bug [#1090](https://github.com/dcloudio/uni-app/pull/1090)
  + 支付宝小程序平台 修复 使用 createIntersectionObserver 报错的Bug
* 【5+App插件】
  + Android平台 更新 高德地图SDK（7.1.0）
  + iOS平台 修复 应用切换到后台，从其它应用传参数激活到前台时 plus.runtime.arguments 可能不更新的Bug 

#### 2.4.7.20191216-alpha
* 【uni-app插件】
  + 【重要】H5平台、QQ小程序 支持运行微信小程序组件 [详情](https://uniapp.dcloud.io/h5/pages/template/vant-button/vant-button)
  + 【重要】App平台 新增 pages.json 配置屏幕方向。横屏应用请在这里配置，app.vue里生效较晚 [详情](https://uniapp.dcloud.io/collocation/pages?id=globalstyle)
  + App平台 优化 选择位置 支持在搜索结果中选择
  + App平台 优化 picker 组件按钮文字增加多语言支持
  + App平台 优化 v3版本 支持微信小程序组件
  + App平台 修复 v3版本 uni.getBackgroundAudioManager 不触发 onTimeUpdate 回调的Bug
  + App平台 修复 v3版本 onTabItemTap 生命周期不触发的Bug
  + App平台 修复 image 组件初始值为空字符串时会执行一次@error事件的Bug
  + App平台 修复 input 组件失焦时会触发一次@input的Bug [详情](https://ask.dcloud.net.cn/question/84456)
  + App平台 修复 webview 组件在非沉浸式状态栏下高度不正确的Bug
  + App平台 修复 chooseImage 传入字符串格式 sizeType 导致报错的Bug
  + App平台 修复 纯 nvue 环境 uni.request 数据格式错误的Bug [#1100](https://github.com/dcloudio/uni-app/issues/1100)
  + App平台 修复 nvue input 组件动态设置 password 属性不生效的Bug
  + App-Android平台 新增 nvue 通用属性 elevation 设置组件的层级阴影，解决 box-shadow 样式在设置圆角或动画时显示不正常的问题 [详情](https://uniapp.dcloud.io/use-weex?id=android平台阴影box-shadow问题)
  + App-Android平台 修复 部分使用64位CPU的手机上可能出现白屏的Bug [详情](https://ask.dcloud.net.cn/question/83611)
  + App-Android平台 修复 nvue image 组件在部分手机上设置 fade-show 属性值为false可能仍然会闪烁的Bug 
  + App-Android平台 修复 nvue swipe 组件设置 circular 属性值为true时从首页直接跳到最后一页可能出现页面无法正常渲染的Bug
  + App-Android平台 修复 tabbar 的 midButton 不设置图片时显示默认图片的Bug [详情](https://ask.dcloud.net.cn/question/84908)
  + 【重要】App-iOS平台 新增 uni.login 支持Apple登录 [详情](https://ask.dcloud.net.cn/article/36651)
  + App-iOS平台 修复 nvue input 组件设置 maxlength 属性后，@input事件返回value值与实际显示值不一致的Bug [详情](https://github.com/dcloudio/uni-app/issues/1073)
  + H5平台 新增 支持 editor 组件 [详情](https://uniapp.dcloud.io/h5/pages/component/editor/editor)
  + H5平台 新增 支持使用 nodesRef.context 获取 VideoContext、CanvasContext 和 MapContext 对象
  + H5平台 修复 css 变量 --window-bottom 在全面屏设备不准确的Bug [详情](https://ask.dcloud.net.cn/question/83069)
  + H5平台 修复 canvasContext.measureText 报错的Bug [详情](https://ask.dcloud.net.cn/question/84858)
  + H5平台 修复 uni.createAnimation 动画不正确的Bug [详情](https://ask.dcloud.net.cn/question/84862)
  + H5平台 修复 webview 页面调用 uni API 无效的Bug [详情](https://ask.dcloud.net.cn/question/84977)
  + hello uni-app 新增 canvas 组件示例(App端使用wxs实现高性能动画)
* 【5+App插件】
  + Android平台 修复 Webview窗口关闭后可能出现内存占用不释放的Bug [详情](https://ask.dcloud.net.cn/question/83587)
  + 【重要】iOS平台 新增 支持苹果授权登录（Sign in with Apple） [教程](https://ask.dcloud.net.cn/article/36651)
  + iOS平台 修复 音频播放对象（AudioPlayer）播放网络音频时，缓存完成恢复播放时没有触发 onPlay 事件的Bug
  + iOS平台 修复 Webview窗口的titleUpdate事件可能不触发导致无法修改页面标题的Bug [详情](https://ask.dcloud.net.cn/question/84115)
  + iOS平台 修复 Webview窗口的标题栏（titleNView）设置titleSize属性不生效的Bug
  + iOS平台 修复 系统日期选择框（plus.nativeUI.pickDate）、时间选择框（plus.nativeUI.pickTime）在横屏时显示不正常的Bug

#### 2.4.6.20191210
* 【uni-app插件】
  + App平台 修复 纯 vue 项目配置 condition 后运行报错的Bug [详情](https://ask.dcloud.net.cn/question/84752)
  + App-Android平台 修复 选择位置 概率出现定位中心点不居中的Bug [详情](https://ask.dcloud.net.cn/question/84819)
  + H5平台 修复 发行模式启用摇树优化后，运行报 getApp 出错的Bug [详情](https://ask.dcloud.net.cn/question/84763)

#### 2.4.5.20191209
* 【uni-app插件】
  + 新增 支持在页面文件调用 `App.vue` 中定义的函数方法 [#665](https://github.com/dcloudio/uni-app/issues/665)
  + 优化 `babel.config.js` 文件里的 `@vue/babel-preset-app` 支持配置 `modules:false` ，让打包后的代码体积更小，运行更快 [#929](https://github.com/dcloudio/uni-app/issues/929)
  + 修复 发行模式下使用 scss ，部分情况条件编译不生效的 Bug [1013](https://github.com/dcloudio/uni-app/issues/1013)
  + App平台 新增 nvue(uni-app编译模式) 控制是否自动包裹 scroll 组件（通过 pages.json 里 style 的 `disableScroll` 属性配置页面) [详见](https://uniapp.dcloud.io/collocation/pages?id=style)
  + App平台 新增 nvue(uni-app编译模式) webview 组件加载的HTML支持调用部分uni API [详情](https://ask.dcloud.net.cn/question/83399)
  + App平台 优化 选择位置，全新UI、支持传入经纬度参数、一键到达当前位置
  + App平台 修复 真机运行 指定页面为首页时白屏的Bug
  + App平台 修复 nvue 导航栏 titleNView 的 type 属性设置为 transparent 时不生效的Bug [详情](https://ask.dcloud.net.cn/question/66907)
  + App平台 修复 nvue(weex编译模式) uni.scanCode 打开扫码页面空白的Bug [详情](https://ask.dcloud.net.cn/question/83820)
  + App平台 修复 nvue picker 组件多次打开后无法关闭的Bug [详情](https://ask.dcloud.net.cn/question/83417)
  + App-Android平台 优化 应用退出后不清掉后台，再次启动可能出现白屏的问题 [详情](https://ask.dcloud.net.cn/question/77397)
  + App-Android平台 修复 首页为 nvue 时反复启动应用后可能出现假死状态的Bug [详情](https://ask.dcloud.net.cn/question/83611)
  + App-Android平台 修复 应用在 tabbar 页面跳转到其它页面在Android10上可能出现图片闪烁的Bug
  + App-Android平台 修复 nvue scroll-view 组件无法触发 touchstart/touchend 事件及动态设置 scroll-left 属性可能不生效的Bug [详情](https://ask.dcloud.net.cn/question/83256)
  + App-Android平台 修复 nvue input 组件设置 autofocus 属性为 true 在subnvue页面可能出现软键盘弹出后自动隐藏的Bug [详情](https://ask.dcloud.net.cn/question/83014)
  + App-Android平台 修复 nvue map 组件下的view子节点不显示的Bug [详情](https://ask.dcloud.net.cn/question/83719)
  + App-Android平台 修复 nvue live-pusher 组件推流成功后拉流可能显示绿屏或卡在首帧的Bug [详情](https://ask.dcloud.net.cn/question/83198)
  + App-iOS平台 新增 tabbar和navigationBar 支持设置高斯模糊（毛玻璃）效果 [详情](https://ask.dcloud.net.cn/article/36617)
  + App-iOS平台 修复 nvue view 组件设置 border 属性可能引起应用崩溃的Bug [详情](https://ask.dcloud.net.cn/question/83206)
  + App-iOS平台 修复 iOS 13 系统中 textarea 输入的内容，比 placeholder 偏左一点的Bug [详情](https://ask.dcloud.net.cn/question/83373)
  + App-iOS平台 修复 faceID 识别成功时不能正确触发成功回调的Bug [详情](https://ask.dcloud.net.cn/question/83068)
  + App-iOS平台 修复 网络请求 uni.request 设置请求的 header 中存在非字符串值可能会引起崩溃的Bug
  + H5平台 新增 uni.chooseImage 、uni.chooseVideo 支持返回文件名
  + H5平台 新增 支持使用 uni.loadFontFace 加载字体
  + H5平台 修复 webview 组件 加载的HTML中调用 uni.getEnv 错误的Bug [详情](https://github.com/dcloudio/uni-app/issues/1011)
  + H5平台 修复 h5 平台组件的自定义事件无法接收多个参数的Bug [#1016](https://github.com/dcloudio/uni-app/issues/1016)
  + H5平台 修复 在企业微信中 uni.chooseImage 无法使用的Bug [详情](https://github.com/dcloudio/uni-app/issues/82872)
  + 小程序平台 修复 不能直接在模版内使用 $emit 的 Bug [详情](https://ask.dcloud.net.cn/question/82865)
  + 微信小程序平台 修复在发行模式使用 lodash@4.17.15 ，运行报错的 Bug[#994](https://github.com/dcloudio/uni-app/issues/994)
  + 支付宝小程序平台 修复 for 循环中 ref 生成的多个组件数组长度不准确的Bug [#930](https://github.com/dcloudio/uni-app/issues/930)
  + 字节跳动小程序平台 修复 当 rpx 后跟着 !important 时，发行模式下 rpx 未被编译成px的Bug [#1014](https://github.com/dcloudio/uni-app/issues/1014)
  + 百度小程序平台 修复 页面 onShow 只能触发一次的Bug
  + uni-ui 新增 uni-transition 过渡动画组件
  + uni-ui 新增 uni-fab 悬浮按钮支持nvue
  + uni-ui 优化 uni-calendar 切换月份必选中每月1号的Bug
  + uni-ui 优化 uni-calendar 视图样式,优化逻辑代码实现,使性能更好
  + uni-ui 优化 uni-calendar 切换月份返回事件
  + uni-ui 优化 uni-grid 用户可自定义宫格内容，如添加角标、红点、修改背景色等
  + uni-ui 优化 uni-load-more 支持调整图标大小
  + uni-ui 优化 uni-popup 弹出层动画，使动画更流畅
  + uni-ui 优化 uni-swipe-action 组件间联动效果更流畅
  + uni-ui 修复 uni-calendar 动态获取 selected 属性就会导致切换不了月份的Bug
  + uni-ui 修复 uni-calendar H5 端选择月份按钮不能点击的Bug
  + uni-ui 修复 uni-grid 正方形宫格显示不正确的Bug
  + uni-ui 修复 uni-grid 动态数据不渲染的Bug
  + uni-ui 修复 uni-popup 点击蒙版关闭后，再次打开弹框失败的Bug
  + uni-ui 修复 uni-popup type 属性为静态值时导致弹出层错误的Bug
  + uni-ui 修复 uni-swipe-action autoClose 属性开启状态下滑动不正常的Bug
* 【5+App插件】
  + Android平台 优化 启动时申请手机存储权限，若用户拒绝则会弹出说明文字。满足部分应用商店要求的权限申请需申明的要求 [详情](https://ask.dcloud.net.cn/article/36549#externalstorage)
  + Android平台 修复 Webview窗口设置drag滑屏操作手势，快速滑动操作可能引起白屏的Bug [详情](https://ask.dcloud.net.cn/question/82668)
  + Android平台 修复 视频播放控件（VideoPlayer）可能无法播放某些本地视频文件的Bug
  + Andrpid平台 修复 数据库执行SQL语句（plus.sqlite.executeSql）传入错误sql语句时，可能在控制台输出错误日志且不触发错误回调的Bug [详情](https://ask.dcloud.net.cn/question/83203)
  + iOS平台 新增 Webview窗口原生标题栏样式属性 blurEffect，支持高斯模糊（毛玻璃）效果 [详情](https://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewTitleNViewStyles)
  + iOS平台 补齐 直播推流（LivePusher）控件支持设置最小码率（min-bitrate）和最大码率（max-bitrate）
  + iOS平台 修复 Webview窗口原生标题栏的搜索框（searchInput）获取焦点会导致placeholder文字移位的Bug [详情](https://ask.dcloud.net.cn/question/83027)
  + iOS平台 修复 图片预览（plus.nativeUI.previewImage）可能出现长图片不能滚动的Bug [详情](https://ask.dcloud.net.cn/question/82455)
  + iOS平台 修复 图片预览（plus.nativeUI.previewImage）可能无法正常显示部分网络地址图片的Bug [详情](https://ask.dcloud.net.cn/question/83542)
  + iOS平台 修复 使用UniPush或个推推送在后台统计数据中没有展示数和点击数的Bug [详情](https://ask.dcloud.net.cn/question/83292)
  + iOS平台 修复 用户拒绝访问相机后，调用摄像头拍照或录像时不会触发错误回调的Bug
  + iOS平台 修复 配置使用高德或百度地图后，定位默认没有使用gcj02坐标的Bug
  + iOS平台 修复 系统日期（plus.nativeUI.pickDate）、时间（plus.nativeUI.pickTime）选择框与系统提示框遮罩颜色不一致的Bug
  + iOS平台 修复 苹果应用内支付IAP恢复购买接口（restoreComplateRequest）有可能不会返回恢复购买凭证的Bug

#### 2.4.4.20191129-alpha
* 【uni-app插件】
  + App平台 优化 选择位置，全新UI、新增参数 latitude、longitude，一键到达当前位置
  + App平台 修复 真机运行指定页面为首页时白屏的Bug
  + App平台 修复 v3版本 webview 组件返回不正确的Bug
  + App平台 修复 v3版本 uni.request header 属性 Content-Type=application/x-www-form-urlencoded 时请求异常的Bug
  + App平台 修复 v3版本 隐藏原生导航栏的 tabBar 页面状态栏颜色不正确的Bug
  + App平台 修复 weex 编译模式 uni.scanCode 打开扫码页面空白的Bug [详情](https://ask.dcloud.net.cn/question/83820)
  + App平台 修复 nvue 页面导航栏 titleNView 的 type 属性设置为 transparent 时不生效的Bug [详情](https://ask.dcloud.net.cn/question/66907)
  + App-Android平台 修复 首页为 nvue 时反复启动应用后可能出现假死状态的Bug [详情](https://ask.dcloud.net.cn/question/83611)
  + App-iOS平台 新增 tabbar 支持设置高斯模糊（毛玻璃）效果 [详情](https://ask.dcloud.net.cn/article/36617)
  + App-iOS平台 修复 网络请求 uni.request 设置请求的 header 中存在非字符串值可能会引起崩溃的Bug
  + H5平台 新增 uni.chooseImage 、uni.chooseVideo 支持返回文件名
  + H5平台 新增 支持使用 uni.loadFontFace 加载字体
* 【5+App插件】
  + iOS平台 修复 苹果应用内支付IAP恢复购买接口（restoreComplateRequest）有可能不会返回恢复购买凭证的Bug
  + iOS平台 修复 预览图片（previewImage）可能无法正常显示部分网络地址图片的Bug [详情](https://ask.dcloud.net.cn/question/83542)

#### 2.4.3.20191125-alpha
* 【uni-app插件】
  + 【重要】App端重大架构升级 “v3编译器”，更快的启动速度、更好的性能、更多vue语法支持、可webview调试视图层。可通过设置`manifest.json`文件中`app-plus`节点下的`compilerVersion:3 `启用新架构 [详情](https://ask.dcloud.net.cn/article/36599)
  + 新增 支持在页面文件调用 `App.vue` 中定义的函数方法 [#665](https://github.com/dcloudio/uni-app/issues/665)
  + 修复 发行模式下使用 scss ，部分情况条件编译不生效的 Bug [1013](https://github.com/dcloudio/uni-app/issues/1013)
  + 优化 `babel.config.js` 文件里的 `@vue/babel-preset-app` 支持配置 `modules:false` ，让打包出来的代码体积更小，运行更快 [#929](https://github.com/dcloudio/uni-app/issues/929)
  + App平台 新增 uni-app编译模式的nvue页面 控制是否自动包裹 scroll 组件（通过 pages.json 里 style 的 `disableScroll` 属性配置页面) [详见](https://uniapp.dcloud.io/collocation/pages?id=style)
  + App平台 新增 uni-app编译模式的nvue页面 webview 组件加载的HTML支持调用部分uni API [详情](https://ask.dcloud.net.cn/question/83399)
  + App平台 修复 nvue 页面中 picker 组件多次打开后无法关闭的Bug [详情](https://ask.dcloud.net.cn/question/83417)
  + App-Android平台 优化 应用退出后不清掉后台，再热启动可能出现白屏的问题 [详情](https://ask.dcloud.net.cn/question/77397)
  + App-Android平台 修复 应用在 tabbar 页面跳转到其它页面在Android10上可能出现图片闪烁的Bug
  + App-Android平台 修复 nvue scroll-view 组件无法触发 touchstart/touchend 事件及动态设置 scroll-left 属性可能不生效的Bug [详情](https://ask.dcloud.net.cn/question/83256)
  + App-Android平台 修复 nvue input 组件设置 autofocus 属性为 true 在subnvue页面可能出现软键盘弹出后自动隐藏的Bug [详情](https://ask.dcloud.net.cn/question/83014)
  + App-Android平台 修复 nvue map 组件下的view子节点不显示的Bug [详情](https://ask.dcloud.net.cn/question/83719)
  + App-Android平台 修复 nvue live-pusher 组件推流成功后拉流可能显示绿屏或卡在首帧的Bug [详情](https://ask.dcloud.net.cn/question/83198)
  + App-iOS平台 修复 nvue view 组件设置 border 属性可能引起应用崩溃的Bug [详情](https://ask.dcloud.net.cn/question/83206)
  + App-iOS平台 修复 iOS 13 系统中 textarea 输入的内容，比 placeholder 偏左一点的Bug [详情](https://ask.dcloud.net.cn/question/83373)
  + App-iOS平台 修复 faceID 识别成功时不能正确触发成功回调的Bug [详情](https://ask.dcloud.net.cn/question/83068)
  + H5平台 修复 webview 组件 加载的HTML中调用 uni.getEnv 错误的Bug [详情](https://github.com/dcloudio/uni-app/issues/1011)
  + H5平台 修复 h5 平台组件的自定义事件无法接收多个参数的Bug [#1016](https://github.com/dcloudio/uni-app/issues/1016)
  + H5平台 修复 在企业微信中 uni.chooseImage 无法使用的Bug [详情](https://github.com/dcloudio/uni-app/issues/82872)
  + 小程序平台 修复 不能直接在模版内使用 $emit 的 Bug [详情](https://ask.dcloud.net.cn/question/82865)
  + 微信小程序平台 修复在发行模式使用 lodash@4.17.15 ，运行报错的 Bug[#994](https://github.com/dcloudio/uni-app/issues/994)
  + 支付宝小程序平台 修复 for 循环中 ref 生成的多个组件数组长度不准确的Bug [#930](https://github.com/dcloudio/uni-app/issues/930)
  + 字节跳动小程序平台 修复 当 rpx 后跟着 !important 时，发行模式下 rpx 未被编译成px的Bug [#1014](https://github.com/dcloudio/uni-app/issues/1014)
  + 百度小程序平台 修复 页面 onShow 只能触发一次的Bug
  + uni-ui 新增 uni-transition 过渡动画组件
  + uni-ui 新增 uni-fab 悬浮按钮支持nvue
  + uni-ui 修复 uni-calendar 动态获取 selected 属性就会导致切换不了月份的Bug
  + uni-ui 修复 uni-calendar H5 端选择月份按钮不能点击的Bug
  + uni-ui 优化 uni-calendar 切换月份必选中每月1号的Bug
  + uni-ui 优化 uni-calendar 视图样式,优化逻辑代码实现,使性能更好
  + uni-ui 优化 uni-calendar 切换月份返回事件
  + uni-ui 修复 uni-grid 正方形宫格显示不正确的Bug
  + uni-ui 修复 uni-grid 动态数据不渲染的Bug
  + uni-ui 优化 uni-grid 用户可自定义宫格内容，如添加角标、红点、修改背景色等
  + uni-ui 优化 uni-load-more 支持调整图标大小
  + uni-ui 修复 uni-popup 点击蒙版关闭后，再次打开弹框失败的Bug
  + uni-ui 修复 uni-popup type 属性为静态值时导致弹出层错误的Bug
  + uni-ui 优化 uni-popup 弹出层动画，使动画更流畅
  + uni-ui 修复 uni-swipe-action autoClose 属性开启状态下滑动不正常的Bug
  + uni-ui 优化 uni-swipe-action 组件间联动效果更流畅
* 【5+App插件】
  + Android平台 优化 启动时申请手机存储权限，若用户拒绝则会弹出说明文字。满足部分应用商店要求的权限申请需申明的要求 [详情](https://ask.dcloud.net.cn/article/36549#externalstorage)
  + Android平台 修复 Webview窗口设置drag滑屏操作手势，快速滑动操作可能引起白屏的Bug [详情](https://ask.dcloud.net.cn/question/82668)
  + Android平台 修复 视频播放控件（VideoPlayer）可能无法播放某些本地视频文件的Bug
  + Andrpid平台 修复 数据库执行SQL语句（plus.sqlite.executeSql）传入错误sql语句时，可能在控制台输出错误日志且不触发错误回调的Bug [详情](https://ask.dcloud.net.cn/question/83203)
  + iOS平台 新增 Webview窗口原生标题栏样式属性 blurEffect，支持模糊毛玻璃）效果 [详情](https://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewTitleNViewStyles)
  + iOS平台 补齐 直播推流（LivePusher）控件支持设置最小码率（min-bitrate）和最大码率（max-bitrate）
  + iOS平台 修复 Webview窗口原生标题栏的搜索框（searchInput）获取焦点会导致placeholder文字移位的Bug [详情](https://ask.dcloud.net.cn/question/83027)
  + iOS平台 修复 图片预览（plus.nativeUI.previewImage）可能出现长图片不能滚动的Bug [详情](https://ask.dcloud.net.cn/question/82455)
  + iOS平台 修复 使用UniPush或个推推送在后台统计数据中没有展示数和点击数的Bug [详情](https://ask.dcloud.net.cn/question/83292)
  + iOS平台 修复 用户拒绝访问相机后，调用摄像头拍照或录像时不会触发错误回调的Bug
  + iOS平台 修复 配置使用高德或百度地图后，定位默认没有使用gcj02坐标的Bug
  + iOS平台 修复 系统日期（plus.nativeUI.pickDate）、时间（plus.nativeUI.pickTime）选择框与系统提示框遮罩颜色不一致的Bug
* 【mui】
  + iOS平台 wkwebview下，plusready未触发时调用mui.ajax，在控制台输出正确的告警提醒

#### 2.4.2.20191115
* 【uni-app插件】
  + APP平台 修复 当`manifest.json`中`nvueCompiler`配置项不是`weex`时，picker 组件文字超出无法隐藏的Bug [详情](https://ask.dcloud.net.cn/question/83048)
  + APP平台 修复 当`manifest.json`中`nvueCompiler`配置项不是`weex`时，uni.scanCode 接口无法回调的Bug [详情](https://ask.dcloud.net.cn/question/82984)
  + APP平台 修复 当`manifest.json`中`nvueCompiler`配置项不是`weex`时，uni.chooseLocation 接口无法回调的Bug [详情](https://ask.dcloud.net.cn/question/82988)
  + App-Android平台 修复 nvue barcode 组件设置 autostart 为true时在部分设备可能出现黑屏的Bug
  + App-iOS平台 修复 纯nvue项目 侧滑关闭后无法触发上个页面生命周期 onShow 的Bug [详情](https://ask.dcloud.net.cn/question/81830)
  + H5平台 修复 uni.getImageInfo 回调信息中 path 错误的Bug [详情](https://ask.dcloud.net.cn/question/82793)
  + H5平台 修复 路由后退时弹出的 picker 无法自动关闭的Bug [详情](https://ask.dcloud.net.cn/question/82684)
  + H5平台 修复 在夸克浏览器（iOS）onReachBottom 生命周期只触发一次的Bug [详情](https://ask.dcloud.net.cn/question/67636)
  + H5平台 修复 在手机QQ浏览器 onReachBottom 无法触发的Bug [详情](https://ask.dcloud.net.cn/question/82795)
  + H5平台 修复 在网络断开的情况下 SocketTask.send 回调不正确的Bug [#744](https://github.com/dcloudio/uni-app/issues/744)
  + 微信小程序 调整微信基础库版本为2.9.2，解决微信2.9.3基础库input事件不触发的Bug [详情](https://developers.weixin.qq.com/community/develop/doc/000a067cd0c6102d0d79558e65bc00?highLine=bindinput)
  + 钉钉小程序 修复 多层组件嵌套的情况下，子组件生命周期不触发的Bug
  + 百度小程序 修复 onShow在onLoad之前触发的Bug [详情](https://ask.dcloud.net.cn/question/82822)
* 【5+App插件】
  + iOS平台 修复 创建本地消息（plus.push.createMessage）在iOS10及以上系统只显示最后一条的Bug [详情](https://ask.dcloud.net.cn/question/82560)

#### 2.4.2.20191115-alpha
* 【uni-app插件】
  + APP平台 修复 当`manifest.json`中`nvueCompiler`配置项不是`weex`时，picker 组件文字超出无法隐藏的Bug [详情](https://ask.dcloud.net.cn/question/83048)
  + APP平台 修复 当`manifest.json`中`nvueCompiler`配置项不是`weex`时，uni.scanCode 接口无法回调的Bug [详情](https://ask.dcloud.net.cn/question/82984)
  + APP平台 修复 当`manifest.json`中`nvueCompiler`配置项不是`weex`时，uni.chooseLocation 接口无法回调的Bug [详情](https://ask.dcloud.net.cn/question/82988)
  + App-Android平台 修复 nvue barcode 组件设置 autostart 为true时在部分设备可能出现黑屏的Bug
  + App-iOS平台 修复 纯nvue项目 侧滑关闭后无法触发上个页面生命周期 onShow 的Bug [详情](https://ask.dcloud.net.cn/question/81830)
  + H5平台 修复 uni.getImageInfo 回调信息中 path 错误的Bug [详情](https://ask.dcloud.net.cn/question/82793)
  + H5平台 修复 路由后退时弹出的 picker 无法自动关闭的Bug [详情](https://ask.dcloud.net.cn/question/82684)
  + H5平台 修复 在夸克浏览器（iOS）onReachBottom 生命周期只触发一次的Bug [详情](https://ask.dcloud.net.cn/question/67636)
  + H5平台 修复 在手机QQ浏览器 onReachBottom 无法触发的Bug [详情](https://ask.dcloud.net.cn/question/82795)
  + H5平台 修复 在网络断开的情况下 SocketTask.send 回调不正确的Bug [#744](https://github.com/dcloudio/uni-app/issues/744)
  + 微信小程序 调整微信基础库版本为2.9.2，解决微信2.9.3基础库input事件不触发的Bug [详情](https://developers.weixin.qq.com/community/develop/doc/000a067cd0c6102d0d79558e65bc00?highLine=bindinput)
  + 钉钉小程序 修复 多层组件嵌套的情况下，子组件生命周期不触发的Bug
  + 百度小程序 修复 onShow在onLoad之前触发的Bug [详情](https://ask.dcloud.net.cn/question/82822)
* 【5+App插件】
  + iOS平台 修复 创建本地消息（plus.push.createMessage）在iOS10及以上系统只显示最后一条的Bug [详情](https://ask.dcloud.net.cn/question/82560)

#### 2.4.1.20191114
* 【uni-app插件】
  + 【重要】公告：非自定义组件模式停止支持 [详情](https://ask.dcloud.net.cn/article/36385)
  + 【重要】nvue文件编译模式默认从 weex 模式修改为 uni-app 模式。推荐使用多端可用、更成熟、组件更丰富的 uni-app 模式。如仍需使用 weex 模式，需在manifest中手动配置
  + 【重要】uni ui 新版正式发布，同时兼容vue和nvue。欢迎插件市场作者也升级自己的组件，同时兼容nvue [详情](https://uniapp.dcloud.io/component/README?id=uniui)
  + App平台 新增 自定义组件模式下的 crypto.getRandomValues 方法，获取符合密码学要求的安全随机值
  + App平台 新增 生物认证API，包括指纹和 Apple Face ID [详情](https://uniapp.dcloud.io/api/system/authentication)
  + APP平台 新增 nvue picker 组件支持多列
  + APP平台 优化 picker、扫码、选择位置、打开位置API的界面通过原生实现，提升性能体验（nvue为weex编译模式时未优化）
  + APP平台 修复 swiper 设置为autoplay时滑动导致速度加快的Bug [详情](https://ask.dcloud.net.cn/question/82431)
  + App平台 修复 uni.requestPayment API 回调结果中没有支付收据的Bug [详情](https://github.com/dcloudio/uni-app/issues/621#issuecomment-518001954)
  + App-Android平台 优化 weex原生渲染引擎的圆角和边框绘制效率
  + App-Android平台 修复 tabBar 页面真机运行可能无法同步更新的Bug
  + App-Android平台 修复 64位专用包 启动时概率出现白屏的Bug [详情](https://ask.dcloud.net.cn/question/79556)
  + App-Android平台 修复 input 组件在部分场景获取焦点可能引起软键盘闪现后自动关闭的Bug [详情](https://ask.dcloud.net.cn/question/81642)
  + App-Android平台 修复 nvue input 组件密码框焦点切换时可能出现自动关闭软键盘的Bug [详情](https://ask.dcloud.net.cn/question/81779)
  + App-Android平台 修复 nvue map 组件在真机运行同步更新时可能无法显示的Bug [详情](https://ask.dcloud.net.cn/question/81364)
  + App-Android平台 修复 nvue video 组件在应用首页中可能无法正常播放视频的Bug [详情](https://ask.dcloud.net.cn/question/81877)
  + App-Android平台 修复 nvue video 组件前后台切换不触发 onShow/onHide 事件的Bug [详情](https://ask.dcloud.net.cn/question/81812)
  + App-Android平台 修复 websocket 传输数据类型为 ArrayBuffer 某些情况下报错的Bug [详情](https://ask.dcloud.net.cn/question/81687)
  + App-iOS平台 修复 nvue页面在iOS13及以上系统默认字体不对的Bug
  + App-iOS平台 修复 nvue list 组件 scroll 事件返回的 isDragging 属性不正确的Bug [详情](https://github.com/dcloudio/uni-app/issues/932)
  + App-iOS平台 修复 nvue list 组件滚动时 scrollStart/scrollEnd 事件返回参数值为负数的Bug
  + App-iOS平台 修复 nvue swiper 组件动态修改 current 属性触发 transition 事件返回的参数不准确的Bug
  + App-iOS平台 修复 uni.hideKeyboard 不能收起软键盘的Bug [#903](https://github.com/dcloudio/uni-app/issues/903)
  + App-iOS平台 修复 picker 组件可能被软键盘遮挡的Bug [#888](https://github.com/dcloudio/uni-app/issues/888)
  + App-iOS平台 修复 input 组件输入中文时失焦导致文字消失的Bug [#888](https://github.com/dcloudio/uni-app/issues/888)
  + App-iOS平台 修复 nvue text 组件设置 line-height 属性可能引起显示不正确的Bug
  + App-iOS平台 修复 nvue live-pusher 组件设置 whiteness 属性为false不生效的Bug
  + App-iOS平台 修复 nvue barcode 组件动态修改属性不生效的Bug
  + H5平台 修复 wxs getDataset() 函数获取不到参数的Bug。uni ui 的 swiperaction 组件的问题也因此得到修复 [详情](https://ask.dcloud.net.cn/question/82718)
  + H5平台 修复 picker 组件初始值不是合法日期/时间的情况下返回值不正确的Bug
  + 百度小程序 修复 新版百度小程序生命周期下组件内mounted不触发的Bug
  + 百度小程序 修复 页面 onShow 触发两次的Bug [详情](https://ask.dcloud.net.cn/question/81243)
  + 百度小程序 修复 3.105.17 以上的调试库页面 onReady 事件比 onLoad 事件执行的要早的Bug [详情](https://ask.dcloud.net.cn/question/81504)
  + uni ui 优化 uni-swipe-action 组件在nvue中使用 BindingX ，使跟手动画更流畅
  + uni ui 优化 uni-list 组件在nvue中使用原生list组件，提升性能
  + uni ui 修复 uniNoticeBar跑马灯组件，在Android平台webview版本高于66时，且在隐藏的tabbar的vue页面中使用，造成App卡顿的Bug [详情](https://ask.dcloud.net.cn/article/36537)
  + hello uni-app 新增 生物认证API示例
  + 新闻模板 优化 顶部tab栏目增加下滑横线（支持app-nvue、app-vue、h5、微信小程序、qq小程序，其他端暂无下滑横线）
* 【5+App插件】
  + Android平台 新增 获取移动智能设备标识公共服务平台提供的匿名设备标识符[OAID](https://www.html5plus.org/doc/zh_cn/device.html#plus.device.getOAID)、开发者匿名设备标识符VAID、及应用匿名设备标识符AAID，可用于解决Android10无法获取设备标识（如IMEI、IMSI、Wi-Fi MAC地址等）的问题
  + Android平台 新增 在manifest中配置 App 启动时申请设备IMEI等信息的权限策略，默认调整为应用第一次启动时申请 [详情](https://ask.dcloud.net.cn/article/36549)
  + Android平台 新增 Webview窗口支持暂停（[pause](https://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewObject.pause)）和恢复（[resume](https://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewObject.resume)）操作，解决页面中如果存在持续渲染隐藏后可能引起卡顿的Bug [详情](https://ask.dcloud.net.cn/article/36537)
  + Android平台 新增 文件上传支持配置分块上传参数[chunkSize](https://www.html5plus.org/doc/zh_cn/uploader.html#plus.uploader.UploadOptions)，解决不能真实返回上传进度的Bug [详情](https://ask.dcloud.net.cn/question/79930)
  + Android平台 修复 Webview子窗口先隐藏（hide）再添加（append）到父窗口依然显示的Bug [详情](https://ask.dcloud.net.cn/question/81427)
  + Android平台 修复 二维码（Barcode）扫描在设备横屏时显示异常的Bug [详情](https://ask.dcloud.net.cn/question/79997)
  + Android平台 修复 创建视频播放控件（VideoPlayer）时，没有开始播放视频也会停止后台背景音频的Bug [详情](https://ask.dcloud.net.cn/question/82034)
  + Android平台 优化 视频播放的操作条的拖动误触和图标美化问题
  + Android平台 修复 在部分设备上插拔usb硬件设备可能引起应用重启的Bug [详情](https://ask.dcloud.net.cn/question/81362)
  + iOS平台 修复 Webview窗口使用WKWebview内核时截屏绘制（draw）设置 clip 参数无效的Bug [详情](https://ask.dcloud.net.cn/question/45969)
  + iOS平台 修复 Webview窗口全部关闭（close）时可能引起应用崩溃的Bug
  + iOS平台 修复 Webview窗口设置自定义标题栏按钮点击时可能引起应用崩溃的Bug
  + iOS平台 修复 视频播放（VideoPlayer）控件无法自动识别视频方向的Bug [详情](https://ask.dcloud.net.cn/question/79320)
  + iOS平台 修复 调用摄像头拍照（captureImage）时设置resolution参数为high、low、medium时可能引起图片显示方向不正确的Bug [详情](https://ask.dcloud.net.cn/question/80814)
  + iOS平台 修复 系统相册选择图片（plus.gallery.pick）可能返回不是选中图片的Bug [详情](https://ask.dcloud.net.cn/question/81055)
  + iOS平台 修复 文件下载暂停后再继续文件名后面会自动添加数字的Bug [详情](https://ask.dcloud.net.cn/question/66523)
  + iOS平台 修复 平台绝对路径转换成本地URL路径（plus.io.convertAbsoluteFileSystem）可能返回null的Bug [详情](https://ask.dcloud.net.cn/question/51954)
  + iOS平台 修复 设置应用屏幕常亮（plus.device.setWakelock）在iOS13.1.3系统可能引起崩溃的Bug
  + iOS平台 修复 Native.JS获取当前Webview窗口的原生实例对象（plus.ios.currentWebview）可能返回为空的Bug [详情](https://ask.dcloud.net.cn/question/81037)

#### 2.4.1.20191114-alpha
* 【uni-app插件】
  + App-iOS平台 修复 picker 组件 range 数据量较大时无法打开的Bug

#### 2.4.0.20191112-alpha
* 【uni-app插件】
  + 【重要】nvue文件编译模式默认从 weex 模式修改为 uni-app 模式。推荐使用多端可用、更成熟、组件更丰富的 uni-app 模式。如仍需使用 weex 模式，需在manifest中手动配置
  + 【重要】uni ui 新版正式发布，同时兼容vue和nvue。欢迎插件市场作者也升级自己的组件，同时兼容nvue [详情](https://uniapp.dcloud.io/component/README?id=uniui)
  + 【重要】自定义组件模式新增 crypto.getRandomValues 方法，获取符合密码学要求的安全随机值
  + H5平台 修复 wxs getDataset() 函数获取不到参数的Bug。uni ui 的 swiperaction 组件的问题也因此得到修复 [详情](https://ask.dcloud.net.cn/question/82718)
  + APP平台 新增 nvue picker 组件支持多列
  + APP平台 优化 picker、扫码、选择位置、打开位置API的界面通过原生实现，提升性能体验（nvue为weex编译模式时未优化）
  + APP平台 修复 swiper 设置为autoplay时滑动导致速度加快的BUG [详情](https://ask.dcloud.net.cn/question/82431)
  + App-iOS平台 修复 nvue页面在iOS13及以上系统默认字体不对的Bug
  + App-iOS平台 修复 nvue list 组件 scroll 事件返回的 isDragging 属性不正确的Bug [详情](https://github.com/dcloudio/uni-app/issues/932)
  + App-iOS平台 修复 nvue swiper 组件动态修改 current 属性触发 transition 事件返回的参数不准确的Bug
  + 百度小程序平台 修复 新版百度小程序生命周期下组件内mounted不触发的BUG
  + uni ui 优化 uni-swipe-action 组件在nvue中使用 BindingX ，使跟手动画更流畅
  + uni ui 优化 uni-list 组件在nvue中使用原生list组件，提升性能
  + 新闻模板 优化 顶部tab栏目增加下滑横线（支持app-nvue、app-vue、h5、微信小程序、qq小程序，其他端暂无下滑横线）
* 【5+App插件】
  + Android平台 新增 获取移动智能设备标识公共服务平台提供的匿名设备标识符[OAID](https://www.html5plus.org/doc/zh_cn/device.html#plus.device.getOAID)、开发者匿名设备标识符VAID、及应用匿名设备标识符AAID，可用于解决Android10无法获取设备标识（如IMEI、IMSI、Wi-Fi MAC地址等）的问题
  + Android平台 修复 创建视频播放控件（VideoPlayer）时，没有开始播放视频也会停止后台背景音频的Bug [详情](https://ask.dcloud.net.cn/question/82034)
  + Android平台 优化 视频播放的操作条的拖动误触和图标美化问题
  + iOS平台 修复 平台绝对路径转换成本地URL路径（plus.io.convertAbsoluteFileSystem）可能返回null的Bug [详情](https://ask.dcloud.net.cn/question/51954)

#### 2.3.9.20191104-alpha
* 【uni-app插件】
  + App平台 修复 uni.requestPayment API 回调结果中没有支付收据的Bug [详情](https://github.com/dcloudio/uni-app/issues/621#issuecomment-518001954)
  + App-Android平台 修复 tabBar 页面真机运行可能无法同步更新的Bug

#### 2.3.8.20191103-alpha
* 【uni-app插件】
  + 【重要】 公告：非自定义组件模式停止支持 [详情](https://ask.dcloud.net.cn/article/36385)
  + App平台 新增 生物认证API，包括指纹和 Apple Face ID [详情](https://uniapp.dcloud.io/api/system/authentication)
  + App-Android平台 修复 64位专用包 启动时概率出现白屏的Bug [详情](https://ask.dcloud.net.cn/question/79556)
  + App-Android平台 优化 weex原生渲染引擎的圆角和边框绘制效率
  + App-Android平台 修复 input 组件在部分场景获取焦点可能引起软键盘闪现后自动关闭的Bug [详情](https://ask.dcloud.net.cn/question/81642)
  + App-Android平台 修复 nvue input 组件密码框焦点切换时可能出现自动关闭软键盘的Bug [详情](https://ask.dcloud.net.cn/question/81779)
  + App-Android平台 修复 nvue map 组件在真机运行同步更新时可能无法显示的Bug [详情](https://ask.dcloud.net.cn/question/81364)
  + App-Android平台 修复 nvue video 组件在应用首页中可能无法正常播放视频的Bug [详情](https://ask.dcloud.net.cn/question/81877)
  + App-Android平台 修复 nvue video 组件前后台切换不触发 onShow/onHide 事件的Bug [详情](https://ask.dcloud.net.cn/question/81812)
  + App-Android平台 修复 websocket 传输数据类型为 ArrayBuffer 某些情况下报错的Bug [详情](https://ask.dcloud.net.cn/question/81687)
  + App-iOS平台 修复 uni.hideKeyboard 不能收起软键盘的Bug [#903](https://github.com/dcloudio/uni-app/issues/903)
  + App-iOS平台 修复 picker 组件可能被软键盘遮挡的Bug [#888](https://github.com/dcloudio/uni-app/issues/888)
  + App-iOS平台 修复 input 组件输入中文时失焦导致文字消失的Bug [#888](https://github.com/dcloudio/uni-app/issues/888)
  + App-iOS平台 修复 nvue text 组件设置 line-height 属性可能引起显示不正确的Bug
  + App-iOS平台 修复 nvue list 组件滚动时 scrollStart/scrollEnd 事件返回参数值为负数的Bug
  + App-iOS平台 修复 nvue live-pusher 组件设置 whiteness 属性为false不生效的Bug
  + App-iOS平台 修复 nvue barcode 组件动态修改属性不生效的Bug
  + H5平台 修复 picker 组件初始值不是合法日期/时间的情况下返回值不正确的Bug
  + 百度小程序 修复 页面 onShow 触发两次的Bug [详情](https://ask.dcloud.net.cn/question/81243)
  + 百度小程序 修复 3.105.17 以上的调试库页面 onReady 事件比 onLoad 事件执行的要早的Bug [详情](https://ask.dcloud.net.cn/question/81504)
  + uni ui 修复 uniNoticeBar跑马灯组件，在Android平台webview版本高于66时，且在隐藏的tabbar的vue页面中使用，造成App卡顿的Bug [详情](https://ask.dcloud.net.cn/article/36537)
  + hello uni-app 新增 生物认证API示例
* 【5+App插件】
  + Android平台 新增 在manifest中配置 App 启动时申请设备IMEI等信息的权限策略，默认调整为应用第一次启动时申请 [详情](https://ask.dcloud.net.cn/article/94#permissionPhoneState)
  + Android平台 新增 Webview窗口支持暂停（[pause](https://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewObject.pause)）和恢复（[resume](https://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewObject.resume)）操作，解决页面中如果存在持续渲染隐藏后可能引起卡顿的Bug [详情](https://ask.dcloud.net.cn/article/36537)
  + Android平台 新增 文件上传支持配置分块上传参数[chunkSize](https://www.html5plus.org/doc/zh_cn/uploader.html#plus.uploader.UploadOptions)，解决不能真实返回上传进度的Bug [详情](https://ask.dcloud.net.cn/question/79930)
  + Android平台 修复 Webview子窗口先隐藏（hide）再添加（append）到父窗口依然显示的Bug [详情](https://ask.dcloud.net.cn/question/81427)
  + Android平台 修复 二维码（Barcode）扫描在设备横屏时显示异常的Bug [详情](https://ask.dcloud.net.cn/question/79997)
  + Android平台 修复 在部分设备上插拔usb硬件设备可能引起应用重启的Bug [详情](https://ask.dcloud.net.cn/question/81362)
  + iOS平台 修复 Webview窗口使用WKWebview内核时截屏绘制（draw）设置 clip 参数无效的Bug [详情](https://ask.dcloud.net.cn/question/45969)
  + iOS平台 修复 Webview窗口全部关闭（close）时可能引起应用崩溃的Bug
  + iOS平台 修复 Webview窗口设置自定义标题栏按钮点击时可能引起应用崩溃的Bug
  + iOS平台 修复 视频播放（VideoPlayer）控件无法自动识别视频方向的Bug [详情](https://ask.dcloud.net.cn/question/79320)
  + iOS平台 修复 调用摄像头拍照（captureImage）时设置resolution参数为high、low、medium时可能引起图片显示方向不正确的Bug [详情](https://ask.dcloud.net.cn/question/80814)
  + iOS平台 修复 系统相册选择图片（plus.gallery.pick）可能返回不是选中图片的Bug [详情](https://ask.dcloud.net.cn/question/81055)
  + iOS平台 修复 文件下载暂停后再继续文件名后面会自动添加数字的Bug [详情](https://ask.dcloud.net.cn/question/66523)
  + iOS平台 修复 设置应用屏幕常亮（plus.device.setWakelock）在iOS13.1.3系统可能引起崩溃的Bug
  + iOS平台 修复 Native.JS获取当前Webview窗口的原生实例对象（plus.ios.currentWebview）可能返回为空的Bug [详情](https://ask.dcloud.net.cn/question/81037)

#### 2.3.7.20191024
* 【uni-app插件】
  + 修复 在 App.vue 的 onLaunch 中，不支持 this.globalData 的 Bug
  + H5平台 修复 开启 treeShaking 后 picker 组件无法使用的Bug [#841](https://github.com/dcloudio/uni-app/issues/841)
  + App-Android平台 修复 input组件使用特定输入法（如搜狗）时，无法正常切换键盘模式的Bug [详情](https://ask.dcloud.net.cn/question/80172)
  + App-iOS平台 修复 nvue map组件的标记点（markers）的 iconPath 属性值设置为相对路径时可能引起应用崩溃的Bug [详情](https://ask.dcloud.net.cn/question/79444)
* 【5+App插件】
  + Android平台 修复 微信分享内容包含网络图片时，第二次操作分享会失败的Bug [详情](https://ask.dcloud.net.cn/question/81234)
  + iOS平台 修复 图片预览（plus.nativeUI.previewImage）3张图片且current属性设置为2时显示不正常的Bug [详情](https://ask.dcloud.net.cn/question/79564)
  + 5+引擎开源，开发者可自主编译自己的引擎，[Android地址](https://github.com/dcloudio/H5P.Android)、[iOS引擎地址](https://github.com/dcloudio/H5P.iOS)

#### 2.3.7.20191024-alpha
* 【uni-app插件】
  + 修复 在 App.vue 的 onLaunch 中，不支持 this.globalData 的 Bug
  + H5平台 修复 开启 treeShaking 后 picker 组件无法使用的Bug [#841](https://github.com/dcloudio/uni-app/issues/841)
  + App-Android平台 修复 input组件使用特定输入法（如搜狗）时，无法正常切换键盘模式的Bug [详情](https://ask.dcloud.net.cn/question/80172)
  + App-iOS平台 修复 nvue map组件的标记点（markers）的 iconPath 属性值设置为相对路径时可能引起应用崩溃的Bug [详情](https://ask.dcloud.net.cn/question/79444)
  + hello uni-app 新增 websocket示例
  + hello uni-app 新增 组件通讯示例
* 【5+App插件】
  + Android平台 修复 微信分享内容包含网络图片时，第二次操作分享会失败的Bug [详情](https://ask.dcloud.net.cn/question/81234)
  + iOS平台 修复 图片预览（plus.nativeUI.previewImage）3张图片且current属性设置为2时显示不正常的Bug [详情](https://ask.dcloud.net.cn/question/79564)
  + 5+引擎开源，开发者可自主编译自己的引擎，[Android地址](https://github.com/dcloudio/H5P.Android)、[iOS引擎地址](https://github.com/dcloudio/H5P.iOS)

#### 2.3.6.20191021
* 【uni-app插件】
  + App平台 修复 nvue bindingx API bind 参数导致异常的Bug [详情](https://ask.dcloud.net.cn/question/80735)
  + App平台 修复 tabBar 设置 borderStyle 为 black 不生效的Bug [详情](https://ask.dcloud.net.cn/question/80921)
  + App平台 修复 tabBar 使用默认高度时 uni.getSystemInfo 获取的 windowHeight 不正确的Bug [详情](https://ask.dcloud.net.cn/question/80888)
  + App-Android平台 修复 tabBar 调用 uni.setTabBarItem 动态设置tabBar某一项内容导致选中状态失效的Bug [详情](https://ask.dcloud.net.cn/question/80941)
  + App-iOS平台 修复 tabBar 页面因内存不足而白屏后无法自动恢复的Bug [详情](https://ask.dcloud.net.cn/question/80927)
  + App-iOS平台 修复 tabBar 设置 icon 图标可能无法显示的Bug [详情](https://ask.dcloud.net.cn/question/80946)
  + App-iOS平台 修复 nvue list组件 scroll 事件返回的参数缺少 isDragging 属性的Bug [详情](https://ask.dcloud.net.cn/question/80928)
* 【5+App插件】
  + Android平台 修复 HBuilderX2.3.5引出的上传文件 uploadFile 可能失败的Bug [详情](https://ask.dcloud.net.cn/question/80815)

#### 2.3.6.20191021-alpha
* 【uni-app插件】
  + App平台 修复 nvue bindingx API bind 参数导致异常的Bug [详情](https://ask.dcloud.net.cn/question/80735)
  + App平台 修复 tabBar 设置 borderStyle 为 black 不生效的Bug [详情](https://ask.dcloud.net.cn/question/80921)
  + App平台 修复 tabBar 使用默认高度时 uni.getSystemInfo 获取的 windowHeight 不正确的Bug [详情](https://ask.dcloud.net.cn/question/80888)
  + App-Android平台 修复 tabBar 调用 uni.setTabBarItem 动态设置tabBar某一项内容导致选中状态失效的Bug [详情](https://ask.dcloud.net.cn/question/80941)
  + App-iOS平台 修复 tabBar 页面因内存不足而白屏后无法自动恢复的Bug [详情](https://ask.dcloud.net.cn/question/80927)
  + App-iOS平台 修复 tabBar 设置 icon 图标可能无法显示的Bug [详情](https://ask.dcloud.net.cn/question/80946)
  + App-iOS平台 修复 nvue list组件 scroll 事件返回的参数缺少 isDragging 属性的Bug [详情](https://ask.dcloud.net.cn/question/80928)
* 【5+App插件】
  + Android平台 修复 HBuilderX2.3.4引出的上传文件 uploadFile 可能失败的Bug [详情](https://ask.dcloud.net.cn/question/80815)

#### 2.3.5.20191018
* 【uni-app插件】
  + 【重要】App平台 重构 tabBar，原生支持 midButton（中间凸起），支持高度调节（App、H5默认高度统一为50px），降低内存占用，避免iOS白屏。注意不再支持通过 plus API 操作 tabBar [详情](https://uniapp.dcloud.io/collocation/pages?id=tabbar)
  + App平台 新增 nvue 云打包支持原生混淆源码 [详情](https://ask.dcloud.net.cn/article/36437)
  + App平台 新增 nvue （uni-app编译模式）内置 bindingx 模块，可以免安装node模块直接使用
  + App平台 新增 nvue API uni.createSelectorQuery(仅支持id选择器)
  + App平台 修复 nvue swiper组件纵向滚动时，transition 事件属性值不正确的Bug [详情](https://ask.dcloud.net.cn/question/79694)
  + App平台 修复 nvue swiper组件设置 current 后滑动不触发 change 事件的Bug [详情](https://ask.dcloud.net.cn/question/79469)
  + App平台 修复 nvue 部分机型样式 width 设置为 750rpx 不会占满整个屏幕的Bug [详情](https://ask.dcloud.net.cn/question/79565)
  + App平台 修复 nvue barcode组件扫码成功触发 marked 事件返回参数条码数据为空的Bug [详情](https://ask.dcloud.net.cn/question/79475)
  + App平台 修复 uni.canvasGetImageData 和 uni.canvasPutImageData 位置大小不正确的Bug [详情](https://ask.dcloud.net.cn/question/79273)
  + App平台 修复 使用 plus.webview API 手工创建webview时，默认注入uni-app组件样式，导致干扰html页面样式的Bug
  + App-Android平台 修复 WebSocket 在Android4.4手机上使用 ws 协议时无法连接服务器的Bug [详情](https://ask.dcloud.net.cn/question/79534)
  + App-Android平台 修复 WebSocket 传输二进制数据时 uni.onSocketMessage 返回为字符串数据的Bug
  + App-Android平台 修复 nvue video组件的 show-progress 属性值设置为 false 不生效的Bug [详情](https://github.com/dcloudio/uni-app/issues/788)
  + App-Android平台 修复 nvue video组件在 swiper 中实现仿抖音效果时滑动不灵敏的Bug
  + App-Android平台 修复 nvue live-pusher组件动态设置 beauty whiteness 属性值无效的Bug [详情](https://ask.dcloud.net.cn/question/80285)
  + App-Android平台 修复 nvue live-pusher组件没有开始推流时无法切换摄像头的Bug
  + App-Android平台 修复 nvue image组件的 src 属性值为空时 placeholder 无法正常显示的Bug
  + App-iOS平台 新增 nvue live-pusher组件支持 orientation 属性设置画面方向 
  + App-iOS平台 修复 nvue map组件的点击控件事件 @controltap 不响应的Bug [详情](https://ask.dcloud.net.cn/question/80170)
  + 百度小程序 修复 开发时修改保存页面，百度模拟器页面无法正常刷新的Bug
  + uni ui 实现nvue化，源码及示例工程详见：[https://github.com/dcloudio/uni-ui/tree/nvue-uni-ui](https://github.com/dcloudio/uni-ui/tree/nvue-uni-ui)
  + uni统计 修复 关闭统计的情况下，统计系统事件（如：登录、分享）还能上报数据的 Bug
* 【5+App插件】
  + 【重要】Android平台 更新 个推/UniPush SDK（4.3.7.0），解决无法上架谷歌应用市场（GooglePlay）的问题 [详情](https://ask.dcloud.net.cn/article/36479)
  + 【重要】Android平台 修复 MIUI11中toast背景为白色，导致前景色无法看清的Bug [详情](https://ask.dcloud.net.cn/question/80328)
  + 【重要】iOS平台 更新 微信登录、分享、支付SDK（1.8.6.1），适配iOS13，需要配置通用链接（Universal Links）[详情](https://ask.dcloud.net.cn/article/36445)
  + Android平台 更新 微信登录、分享、支付SDK（5.4.3），适配Android10
  + Android平台 更新 QQ登录、分享SDK（3.3.5），新浪微博登录、分享SDK（4.4.1）
  + Android平台 更新 高德地图SDK（6.8.0），解决在部分手机上可能出现黑屏的Bug
  + Android平台 修复 数据库查询SQL语句（plus.sqlite.selectSql）返回结果中的浮点数据类型精度丢失的Bug [详情](https://ask.dcloud.net.cn/question/79541)
  + Android平台 修复 在双卡手机上获取国际移动用户识别码（IMSI）只能返回一个值的Bug [详情](https://ask.dcloud.net.cn/question/79863)
  + Android平台 修复 Android10设备上获取设备唯一标识（UUID）为空的Bug [详情](https://ask.dcloud.net.cn/question/80200)
  + Android平台 修复 上传任务（plus.uploader.createUpload）提交的请求头中包含多个Cookie的Bug [详情](https://ask.dcloud.net.cn/question/74619)
  + Android平台 修复 蓝牙断开设备连接（plus.bluetooth.closeBLEConnection）可能不触发onBLEConnectionStateChange事件的Bug
  + Android平台 修复 微信分享图片无法加载带重定向的url链接的Bug
  + Android平台 修复 Webview窗口动画在特定情况下可能会将pop-in/out动画自动变为slide-in/out-right的Bug
  + iOS平台 更新 QQ登录、分享SDK（3.3.6），新浪微博登录、分享SDK（3.2.5）
  + iOS平台 修复 iOS13上配置后台播放音乐可能引起应用崩溃的Bug [详情](https://ask.dcloud.net.cn/question/80253)
  + iOS平台 修复 图片压缩（plus.zip.compressImage）设置缩放图片的宽度（width）和高度（height）无效的Bug [详情](https://ask.dcloud.net.cn/question/79993)
  + iOS平台 修复 iPhone11上查询设备是否为刘海屏（plus.navigator.hasNotchInScreen）返回值不正确的Bug [详情](https://ask.dcloud.net.cn/question/80291)
  + iOS平台 修复 视频播放（VideoPlayer）控件设置 show-progress 属性不生效的Bug
  + iOS平台 修复 视频播放（VideoPlayer）控件设置 autoplay 属性值为 true 后加载雪花可能显示不正常的Bug
  + iOS平台 修复 指纹识别（Fingerprint）判断当前设备是否支持（plus.fingerprint.isSupport）返回值可能不正确的Bug
  + iOS平台 修复 Webview窗口设置软键盘模式（softinputMode）为adjustResize时，新开页面并弹出软键盘后返回可能白屏的Bug
  + iOS平台 修复 数据库（SQLite）多次打开数据库后，调用判断数据库是否打开（plus.sqlite.isOpenDatabase）返回值可能不正确的Bug
  + iOS平台 修复 数据库（SQLite）在HX中真机运行可能出现SQL语句操作（plus.sqlite.executeSql）无法正常执行的Bug
  + iOS平台 修复 系统相册选择图片文件时如果相册中没有图片返回时loading界面不消失的Bug

#### 2.3.5.20191018-alpha
* 【5+App插件】
  + 【重要】Android平台 修复 MIUI11中toast背景为白色，导致前景色无法看清的Bug [详情](https://ask.dcloud.net.cn/question/80328)
  + iOS平台 修复 系统相册选择图片文件时如果相册中没有图片返回时loading界面不消失的Bug

#### 2.3.4.20191014-alpha
* 【uni-app插件】
  + 【重要】App平台 重构 tabBar，原生支持 midButton（中间凸起），支持高度调节（App、H5默认高度统一为50px），降低内存占用，避免iOS白屏。注意不再支持通过 plus API 操作 tabBar [详情](https://uniapp.dcloud.io/collocation/pages?id=tabbar)
  + App平台 新增 nvue 云打包支持原生混淆源码 [详情](https://ask.dcloud.net.cn/article/36437)
  + App平台 新增 nvue （uni-app编译模式）内置 bindingx 模块，可以免安装node模块直接使用
  + App平台 新增 nvue API uni.createSelectorQuery(仅支持id选择器)
  + App平台 修复 nvue swiper组件纵向滚动时，transition 事件属性值不正确的Bug [详情](https://ask.dcloud.net.cn/question/79694)
  + App平台 修复 nvue swiper组件设置 current 后滑动不触发 change 事件的Bug [详情](https://ask.dcloud.net.cn/question/79469)
  + App平台 修复 nvue 部分机型样式 width 设置为 750rpx 不会占满整个屏幕的Bug [详情](https://ask.dcloud.net.cn/question/79565)
  + App平台 修复 nvue barcode组件扫码成功触发 marked 事件返回参数条码数据为空的Bug [详情](https://ask.dcloud.net.cn/question/79475)
  + App平台 修复 uni.canvasGetImageData 和 uni.canvasPutImageData 位置大小不正确的Bug [详情](https://ask.dcloud.net.cn/question/79273)
  + App平台 修复 使用 plus.webview API 手工创建webview时，默认注入uni-app组件样式，导致干扰html页面样式的Bug
  + App-Android平台 修复 WebSocket 在Android4.4手机上使用 ws 协议时无法连接服务器的Bug [详情](https://ask.dcloud.net.cn/question/79534)
  + App-Android平台 修复 WebSocket 传输二进制数据时 uni.onSocketMessage 返回为字符串数据的Bug
  + App-Android平台 修复 nvue video组件的 show-progress 属性值设置为 false 不生效的Bug [详情](https://github.com/dcloudio/uni-app/issues/788)
  + App-Android平台 修复 nvue video组件在 swiper 中实现仿抖音效果时滑动不灵敏的Bug
  + App-Android平台 修复 nvue live-pusher组件动态设置 beauty whiteness 属性值无效的Bug [详情](https://ask.dcloud.net.cn/question/80285)
  + App-Android平台 修复 nvue live-pusher组件没有开始推流时无法切换摄像头的Bug
  + App-Android平台 修复 nvue image组件的 src 属性值为空时 placeholder 无法正常显示的Bug
  + App-iOS平台 新增 nvue live-pusher组件支持 orientation 属性设置画面方向 
  + App-iOS平台 修复 nvue map组件的点击控件事件 @controltap 不响应的Bug [详情](https://ask.dcloud.net.cn/question/80170)
  + 百度小程序 修复 开发时修改保存页面，百度模拟器页面无法正常刷新的Bug
  + uni统计 修复 关闭统计的情况下，统计系统事件（如：登录、分享）还能上报数据的 Bug
  + uni ui 实现nvue化，首批支持的组件已更新到hello uni-app新版示例中
* 【5+App插件】
  + 【重要】Android平台 更新 个推/UniPush SDK（4.3.7.0），解决无法上架谷歌应用市场（GooglePlay）的问题 [详情](https://ask.dcloud.net.cn/article/36479)
  + Android平台 更新 微信登录、分享、支付SDK（5.4.3），适配Android10
  + Android平台 更新 QQ登录、分享SDK（3.3.5），新浪微博登录、分享SDK（4.4.1）
  + Android平台 更新 高德地图SDK（6.8.0），解决在部分手机上可能出现黑屏的Bug
  + Android平台 修复 数据库查询SQL语句（plus.sqlite.selectSql）返回结果中的浮点数据类型精度丢失的Bug [详情](https://ask.dcloud.net.cn/question/79541)
  + Android平台 修复 在双卡手机上获取国际移动用户识别码（IMSI）只能返回一个值的Bug [详情](https://ask.dcloud.net.cn/question/79863)
  + Android平台 修复 Android10设备上获取设备唯一标识（UUID）为空的Bug [详情](https://ask.dcloud.net.cn/question/80200)
  + Android平台 修复 上传任务（plus.uploader.createUpload）提交的请求头中包含多个Cookie的Bug [详情](https://ask.dcloud.net.cn/question/74619)
  + Android平台 修复 蓝牙断开设备连接（plus.bluetooth.closeBLEConnection）可能不触发onBLEConnectionStateChange事件的Bug
  + Android平台 修复 微信分享图片无法加载带重定向的url链接的Bug
  + Android平台 修复 Webview窗口动画在特定情况下可能会将pop-in/out动画自动变为slide-in/out-right的Bug
  + iOS平台 更新 微信登录、分享、支付SDK（1.8.6.1），适配iOS13，需要配置通用链接（Universal Links）[详情](https://ask.dcloud.net.cn/article/36445)
  + iOS平台 更新 QQ登录、分享SDK（3.3.6），新浪微博登录、分享SDK（3.2.5）
  + iOS平台 修复 iOS13上配置后台播放音乐可能引起应用崩溃的Bug [详情](https://ask.dcloud.net.cn/question/80253)
  + iOS平台 修复 图片压缩（plus.zip.compressImage）设置缩放图片的宽度（width）和高度（height）无效的Bug [详情](https://ask.dcloud.net.cn/question/79993)
  + iOS平台 修复 iPhone11上查询设备是否为刘海屏（plus.navigator.hasNotchInScreen）返回值不正确的Bug [详情](https://ask.dcloud.net.cn/question/80291)
  + iOS平台 修复 视频播放（VideoPlayer）控件设置 show-progress 属性不生效的Bug
  + iOS平台 修复 视频播放（VideoPlayer）控件设置 autoplay 属性值为 true 后加载雪花可能显示不正常的Bug
  + iOS平台 修复 指纹识别（Fingerprint）判断当前设备是否支持（plus.fingerprint.isSupport）返回值可能不正确的Bug
  + iOS平台 修复 Webview窗口设置软键盘模式（softinputMode）为adjustResize时，新开页面并弹出软键盘后返回可能白屏的Bug
  + iOS平台 修复 数据库（SQLite）多次打开数据库后，调用判断数据库是否打开（plus.sqlite.isOpenDatabase）返回值可能不正确的Bug
  + iOS平台 修复 数据库（SQLite）在HX中真机运行可能出现SQL语句操作（plus.sqlite.executeSql）无法正常执行的Bug

#### 2.3.3.20190924-alpha
* 【uni-app插件】
  + App-Android平台 新增 uni.request 网络请求增加参数 sslVerify，配置是否验证 ssl 证书。但建议使用普遍受信的证书而不是忽略证书校验。[详情](https://uniapp.dcloud.io/api/request/request)
  + App-iOS平台 调整 非自定义组件模式 逻辑层默认从 WKWebview 切回 UIWebview，避免 uni.request 无法跨域的问题。但仍建议开发者尽快升级自定义组件模式
  + App-iOS平台 新增 非自定义组件模式 iOS13上页面无法滚动的问题，如不能很快升级为自定义组件模式，可临时使用本文的方案2来解决，[详情](https://ask.dcloud.net.cn/article/36410)
  + App-iOS平台 修复 nvue swiper组件包含子组件少于3个时布局可能不正确的Bug
  + App-iOS平台 修复 nvue video组件退出全屏动画会闪现底层组件的Bug 
  + H5端 修复 监听页面滚动（onPageScroll）后切换页面报错的Bug [详情](https://ask.dcloud.net.cn/question/78955)
* 【5+App插件】
  + iOS平台 修复 iOS13上保存图片到系统相册（plus.gallery.save）失败的Bug

#### 2.3.3.20190923
* 【uni-app插件】
  + App-Android平台 新增 uni.request 网络请求增加参数 sslVerify，配置是否验证 ssl 证书。但建议使用普遍受信的证书而不是忽略证书校验。[详情](https://uniapp.dcloud.io/api/request/request)
  + App-iOS平台 调整 非自定义组件模式 逻辑层默认从 WKWebview 切回 UIWebview，避免 uni.request 无法跨域的问题。但仍建议开发者尽快升级自定义组件模式
  + App-iOS平台 新增 非自定义组件模式 iOS13上页面无法滚动的问题，如不能很快升级为自定义组件模式，可临时使用本文的方案2来解决，[详情](https://ask.dcloud.net.cn/article/36410)
  + App-iOS平台 修复 nvue swiper组件包含子组件少于3个时布局可能不正确的Bug
  + App-iOS平台 修复 nvue video组件退出全屏动画会闪现底层组件的Bug 
  + H5端 修复 监听页面滚动（onPageScroll）后切换页面报错的Bug [详情](https://ask.dcloud.net.cn/question/78955)
* 【5+App插件】
  + iOS平台 修复 iOS13上保存图片到系统相册（plus.gallery.save）失败的Bug

#### 2.3.2.20190921
* 【uni-app插件】
  + App平台 修复 uni.writeBLECharacteristicValue 无法写入数据的Bug [详情](https://ask.dcloud.net.cn/question/79204)
  + App平台 修复 调用 uni.pageScrollTo 时页面内元素 fixed 定位失效的Bug [详情](https://ask.dcloud.net.cn/question/73179)
  + App平台 修复 调用 uni.switchTab 某些情况下白屏的Bug
  + App平台 修复 nvue map组件的点击标记点事件（@markertap）参数中markerId属性不正确的Bug
  + App平台 修复 调用 uni.setNavigationBarColor 导致其他页面状态栏颜色一起改变的Bug
  + App平台 修复 应用启动后立刻调用 uni.hideTabBar 导致页面高度错误的Bug [详情](https://ask.dcloud.net.cn/question/77611)
  + App-iOS平台 修复 调用 uni.setNavigationBarColor 导致隐藏状态的导航栏显示的Bug
  + App-iOS平台 修复 nvue swiper组件 垂直滑动且高度较低时内容可能出现重叠的Bug 
  + App-iOS平台 修复 nvue refresh组件 某些情况下闪退的Bug
  + H5平台 修复 longpress 事件消息对象的 touches/changedTouches 属性不正确的Bug [详情](https://ask.dcloud.net.cn/question/79149)
  + uni统计 修复 网络异常时，上报重试机制失效的Bug
* 【5+App插件】
  + Android平台 修复 系统相册选择文件（plus.gallery.pick）设置selected参数时多次选择失效的Bug [详情](https://ask.dcloud.net.cn/question/78931)
  + iOS平台 修复 视频播放（VideoPlayer）控件退出全屏后状态栏方向不对的Bug [详情](https://ask.dcloud.net.cn/question/79171)
  + iOS平台 修复 iOS13上获取系统状态栏样式（plus.navigator.getStatusBarStyle）总是反馈dark的Bug。此问题同时会导致uni-app状态栏颜色混乱的Bug [详情](https://ask.dcloud.net.cn/question/79189)
  + iOS平台 修复 iOS13上获取系统状态高度不正确的Bug [详情](https://ask.dcloud.net.cn/question/79219)
  + iOS平台 修复 iOS13上WKWebview的input组件设置自动聚焦无效的Bug

#### 2.3.2.20190921-alpha
* 【uni-app插件】
  + App平台 修复 uni.writeBLECharacteristicValue 无法写入数据的Bug [详情](https://ask.dcloud.net.cn/question/79204)
  + App平台 修复 调用 uni.pageScrollTo 时页面内元素 fixed 定位失效的Bug [详情](https://ask.dcloud.net.cn/question/73179)
  + App平台 修复 调用 uni.switchTab 某些情况下白屏的Bug
  + App平台 修复 nvue map组件的点击标记点事件（@markertap）参数中markerId属性不正确的Bug
  + App平台 修复 调用 uni.setNavigationBarColor 导致其他页面状态栏颜色一起改变的Bug
  + App平台 修复 应用启动后立刻调用 uni.hideTabBar 导致页面高度错误的Bug [详情](https://ask.dcloud.net.cn/question/77611)
  + App-iOS平台 修复 调用 uni.setNavigationBarColor 导致隐藏状态的导航栏显示的Bug
  + App-iOS平台 修复 nvue swiper组件 垂直滑动且高度较低时内容可能出现重叠的Bug 
  + App-iOS平台 修复 nvue refresh组件 某些情况下闪退的Bug
  + H5平台 修复 longpress 事件消息对象的 touches/changedTouches 属性不正确的Bug [详情](https://ask.dcloud.net.cn/question/79149)
  + uni统计 修复 网络异常时，上报重试机制失效的Bug
* 【5+App插件】
  + Android平台 修复 系统相册选择文件（plus.gallery.pick）设置selected参数时多次选择失效的Bug [详情](https://ask.dcloud.net.cn/question/78931)
  + iOS平台 修复 视频播放（VideoPlayer）控件退出全屏后状态栏方向不对的Bug [详情](https://ask.dcloud.net.cn/question/79171)
  + iOS平台 修复 iOS13上获取系统状态栏样式（plus.navigator.getStatusBarStyle）总是反馈dark的Bug。此问题同时会导致uni-app状态栏颜色混乱的Bug [详情](https://ask.dcloud.net.cn/question/79189)
  + iOS平台 修复 iOS13上获取系统状态高度不正确的Bug [详情](https://ask.dcloud.net.cn/question/79219)
  + iOS平台 修复 iOS13上WKWebview的input组件设置自动聚焦无效的Bug

#### 2.3.1.20190920
* 【uni-app插件】
  + App平台 修复 vue页面 scroll-view 组件在 iOS13 无法滚动的 Bug [详情](https://ask.dcloud.net.cn/question/78627)
  + H5平台 修复 uni.request 方法发起 GET 请求之前出现 OPTIONS 预检请求的 Bug
  + 字节跳动小程序 修复 this.$refs 部分场景无法获取组件引用的 Bug [#791](https://github.com/dcloudio/uni-app/issues/791)
  + uni统计 修复 小程序端发行后所有页面都添加 onShareAppMessage 的 Bug [#792](https://github.com/dcloudio/uni-app/issues/792)

#### 2.3.1.20190920-alpha
* 【uni-app插件】
  + App平台 修复 vue页面 scroll-view 组件在 iOS13 无法滚动的 Bug [详情](https://ask.dcloud.net.cn/question/78627)
  + H5平台 修复 uni.request 方法发起 GET 请求之前出现 OPTIONS 预检请求的 Bug
  + 字节跳动小程序 修复 this.$refs 部分场景无法获取组件引用的 Bug [#791](https://github.com/dcloudio/uni-app/issues/791)
  + uni统计 修复 小程序端发行后所有页面都添加 onShareAppMessage 的 Bug [#792](https://github.com/dcloudio/uni-app/issues/792)

#### 2.3.0.20190919
* 【uni-app插件】
  + 【重要】uni统计平台上线，一份报表，掌握业务全景 [详情](https://tongji.dcloud.net.cn) 注意小程序需加 tongji.dcloud.io 到域名白名单
  + 【重要】调整：编译模式默认为自定义组件模式。若开发者需要非自定义组件模式，需在manifest.json中明确配置usingComponents节点为false
  + 【重要】公告：非自定义组件模式，将于2019年11月1日起，停止支持。请开发者尽快升级 [详情](https://ask.dcloud.net.cn/article/36385)
  + 【重要】App/微信小程序/H5 新增 支持wxs，支付宝小程序平台支持SJS，百度小程序平台支持Filter [详情](https://uniapp.dcloud.io/frame?id=wxs)
  + 【重要】App平台 优化使用Tab时应用的内存占用，提升Android平台窗体动画和页面滚动的平滑度（自定义组件模式）
  + 【重要】App平台 iOS环境，uni-app 编译模式下的nvue页面及所有vue页面，web-view组件从UIWebview调整为WKWebview。[详情](https://ask.dcloud.net.cn/article/36348)
  + 【重要】App平台 新增 nvue 页面支持 vuex 的使用 [详情](https://uniapp.dcloud.io/use-weex?id=vue-%e5%92%8c-nvue-%e5%85%b1%e4%ba%ab%e7%9a%84%e5%8f%98%e9%87%8f%e5%92%8c%e6%95%b0%e6%8d%ae)
  + 新增 编译时增加警告信息（不影响运行）
  + 新增 支持sass-loader 8.0.0版本 [#776](https://github.com/dcloudio/uni-app/issues/776)
  + 优化 image 组件支持自闭合写法 [#625](https://github.com/dcloudio/uni-app/issues/625)
  + 优化 autoprefixer 目标浏览器兼容，减少生成的 css 代码
  + 修复 部分模板写法导致编译器报错的Bug [#604](https://github.com/dcloudio/uni-app/issues/604)
  + 修复 mode 不正确导致 cli 下读取 .env 错误的Bug [#710](https://github.com/dcloudio/uni-app/issues/710)
  + 修复 for 循环中绑定多个事件方法，参数获取不正确的Bug [#720](https://github.com/dcloudio/uni-app/issues/720)
  + 修复 静态资源过大时编译报错的 Bug
  + 修复 部分样式编译时未自动增加 webkit 前缀的 Bug [#769](https://github.com/dcloudio/uni-app/issues/769)
  + App/H5/支付宝小程序平台 新增 导航栏支持配置图片(titleImage) [详情](https://uniapp.dcloud.io/collocation/pages?id=style)
  + App/H5/支付宝小程序平台 新增 支持导航栏透明(transparentTitle) [详情](https://uniapp.dcloud.io/collocation/pages?id=style)
  + App/H5平台 新增 uni.getSystemInfo 支持返回安全区信息（safeArea）
  + App/H5平台 新增 swiper 组件支持 transition 事件
  + App/H5平台 修复 input、textarea 组件禁用状态黑色文字在 iOS 颜色变浅的 Bug
  + App平台 优化 页面背景样式生效时机，解决深色背景等特定场景下，页面切换时闪白的问题
  + App平台 修复 iOS13 页面无法滚动的Bug [详情](https://ask.dcloud.net.cn/question/77877)
  + App平台 新增 uni.onKeyboardHeightChange 支持监听键盘高度变化
  + App平台 新增 uni.getSystemInfo 支持返回手机品牌信息（brand） [详情](https://ask.dcloud.net.cn/question/77313)
  + App平台 新增 nvue 中支持 uni.scss
  + App平台 新增 uni-app 编译模式下的 nvue 页面支持 recycle-list 组件 [详情](https://uniapp.dcloud.io/component/recycle-list)
  + App平台 新增 uni-app 编译模式下的 nvue 页面支持 picker-view 组件
  + App平台 优化 websocket 支持创建多个连接，支持收发 ArrayBuffer 类型数据
  + App平台 优化 renderer配置为native的纯nvue项目，uni.request 发起网络请求时，Content-Type 默认设置为 application/json
  + App平台 优化 uni.request 自动去除 url 首尾空白字符
  + App平台 优化 input 组件 @focus 事件支持获取键盘高度
  + App平台 优化 nvue Android系统switch的样式与性能
  + App平台 优化 nvue button 组件内部支持嵌套 text 组件
  + App平台 修复 nvue 环境 movable-area 组件手势和滚动冲突的 Bug
  + App平台 修复 调用 setNavigationBarTitle 不生效的Bug
  + App平台 修复 微信自定义组件运行时报错的Bug [详情](https://ask.dcloud.net.cn/question/77358)
  + App平台 修复 键盘高度变化事件不生效的 Bug
  + App平台 修复 页面中 web-view 组件的页面加载完成之前标题栏会显示 null 的 Bug
  + App平台 修复 解决 scroll-view、movable-view 组件触摸滑动时会触发下拉刷新的 Bug
  + App平台 修复 纯nvue项目 uni.scanCode、uni.chooseLocation 接口不触发回调的Bug
  + App平台 修复 纯nvue项目 uni.stopPullDownRefresh 不生效的Bug
  + App平台 修复 纯nvue项目 开发运行期间新增 nvue 页面，热更新白屏的Bug
  + App-Android平台 修复 uni-app中网络请求设置method为DELETE时请求参数丢失的Bug [详情](https://ask.dcloud.net.cn/question/77624)
  + App-Android平台 修复 uni-app自定义组件模式下websocket连接报some error occur错误的Bug [详情](https://ask.dcloud.net.cn/question/78789)
  + App-Android平台 修复 nvue web-view组件无法使用定位功能的Bug [详情](https://ask.dcloud.net.cn/question/76909)
  + App-Android平台 修复 nvue textarea、input组件首次触发focus事件时无法获取键盘高度的Bug [详情](https://ask.dcloud.net.cn/question/76923)
  + App-Android平台 修复 nvue map组件中添加的子组件无法正常显示的Bug [详情](https://ask.dcloud.net.cn/question/78307)
  + App-Android平台 修复 nvue video标签设置control属性为false时，未播放状态下仍然显示控制栏的Bug
  + App-Android平台 修复 nvue input标签设置adjust-position属性不生效，及KeyboardHeightChange事件不触发的Bug [详情](https://ask.dcloud.net.cn/question/78796)
  + App-Android平台 修复 HBuilderX2.2.0引出的uni原生插件调用（uni.requireNativePlugin）使用时报错的Bug [详情](https://ask.dcloud.net.cn/question/76962)
  + App-iOS平台 修复 uni-app中subNVue页面可能无法接收到父页面通过subNVue.postMessage发送的消息的Bug [详情](https://ask.dcloud.net.cn/question/77312)
  + App-iOS平台 修复 nvue iPhoneX设备软键盘弹出时页面偏移位置不准确的Bug [详情](https://ask.dcloud.net.cn/question/76783)
  + App-iOS平台 修复 nvue map组件添加的子组件可能无法显示的Bug [详情](https://ask.dcloud.net.cn/question/76719)
  + App-iOS平台 修复 nvue swipe组件高度动态变化后切页显示不正常的Bug [详情](https://ask.dcloud.net.cn/question/77500)
  + App-iOS平台 修复 nvue video标签设置封面图片（poster）后动态修改src属性可能引起应用崩溃的Bug [详情](https://ask.dcloud.net.cn/question/77353)
  + App-iOS平台 修复 nvue video标签设置自动播放（autoplay）为true不生效的Bug
  + App-iOS平台 修复 nvue video标签中退出全屏后覆盖元素显示不正常的Bug
  + App-iOS平台 修复 nvue input组件设置adjust-position属性值为false无效的Bug [详情](https://ask.dcloud.net.cn/question/78472)
  + App-iOS平台 修复 nvue webSocket模块设置多个协议（protocol）导致连接服务器失败的Bug
  + App-iOS平台 修复 nvue bindingx在uni-app编译模式下拖拽组件时偏移系数不正确的Bug
  + App-iOS平台 修复 uni原生插件实现代理方法（application:openURL:options:）后与第三方应用交互（如调用微信登录）引起应用崩溃的Bug
  + App-iOS平台 修复 uni原生插件实现代理方法（application:handleOpenURL:）不触发，导致无法获取第三方应用返回数据的Bug
  + H5平台 新增 支持导航栏点击穿透配置（titlePenetrate） [详情](https://uniapp.dcloud.io/collocation/pages?id=style)
  + H5平台 新增 支持 icon 组件。注意此功能会与老版的uni ui的icon组件重名 [详情](https://ask.dcloud.net.cn/article/36404)
  + H5平台 优化 uni.getNetworkType 支持 Safari 浏览器
  + H5平台 修复 rich-text 内部节点包含多个 class 时渲染不正确的 Bug [#756](https://github.com/dcloudio/uni-app/issues/756)
  + H5平台 修复 input 组件 confirm-type 值为 search 时文字垂直不居中的 Bug
  + H5平台 修复 input 组件的 change 事件会冒泡到父组件的Bug [详情](https://ask.dcloud.net.cn/question/77962)
  + H5平台 修复 animation 属性中部分动画不生效的 Bug
  + H5平台 修复 svg 或非base64格式的 Data URI 无法使用的Bug [#668](https://github.com/dcloudio/uni-app/issues/668)
  + 小程序平台 新增 uni.getMenuButtonBoundingClientRect 接口，可获取导航栏右上角胶囊按钮的布局位置信息 [详情](https://uniapp.dcloud.io/api/ui/menuButton?id=getmenubuttonboundingclientrect)
  + 小程序平台 优化 发行时压缩 css 代码
  + 微信小程序平台 修复 当使用小程序插件后，调用数组方法修改数组未触发界面渲染的 Bug [#694](https://github.com/dcloudio/uni-app/issues/694)
  + 支付宝小程序平台 新增 支持分包加载功能
  + 支付宝小程序 新增 button 组件 open-type 属性支持 getPhoneNumber
  + 百度/字节跳动小程序平台 修复 开发工具 sourcemap 无效的Bug [#724](https://github.com/dcloudio/uni-app/issues/724)
  + hello uni-app 新增 nvue地图 组件及API示例
  + hello uni-app 新增 全屏视频上下滑动的示例模板
  + hello uni-app 新增 globalData和vuex的示例模板
  + hello uni-app 优化 cover-view 组件示例(App端使用nvue实现)，支持在视频全屏界面覆盖遮罩物
  + hello uni-app 优化 video 组件示例，新增播放、暂停、设置倍速等能力演示
  + uni-ui 新增 SearchBar 搜索输入框
  + uni-ui 新增 GoodsNav 商品详情页底部购物车、购买导航条
  + uni-ui 新增 Fav 收藏按钮
  + uni-ui 优化 SwipeAction 滑动操作组件，App平台、H5 平台、微信小程序平台利用 wxs 实现跟手式流畅拖动
  + uni-ui 优化 Collapse 折叠面板在低配设备中动画卡顿的问题
  + uni-ui 优化 LoadMore 加载图标可按平台配置或由用户指定，Android平台默认circle，iOS平台默认雪花
  + uni-ui 优化 SwipeDot 优化指示器样式
  + uni-ui 修复 Icons 组件在 H5 平台不显示的BUG。老用户请更新Icons组件 [详情](https://ask.dcloud.net.cn/article/36404)
  + 新闻模板 优化 拖动标签卡时更快的渲染页面、无网络时引导用户设置
* 【5+App插件】
  + 【重要】Android平台 优化 窗体动画popin/popout的效率，Android6+加入老窗体透明alpha效果（同时注意此时动画时长设置不再生效）
  + 【重要】iOS平台 默认Webview从UIWebview改为WKWebview，从iOS13开始苹果将UIWebview列为过期API。[详情](https://ask.dcloud.net.cn/article/36348)
  + 修复 nvue页面在非自定义组件模式下module（模块）只能触发一次回调事件（如webSockets的onMessage事件）的Bug
  + Android平台 修复 部分平板设备横屏显示时可能出现灰色区域的Bug [详情](https://ask.dcloud.net.cn/question/77055)
  + Android平台 修复 图片压缩转换（plus.zip.compressImage）后exif头信息丢失的Bug [详情](https://github.com/dcloudio/uni-app/issues/437)
  + Android平台 修复 获取图片信息（plus.io.getImageInfo）传入网络图片地址无法下载图片时控制台输出Unexpected identifier错误的Bug [详情](https://ask.dcloud.net.cn/question/77363)
  + Android平台 修复 设置应用全屏显示（plus.navigator.setFullscreen）时在部分刘海屏设备显示区域可能不正确的Bug
  + Android平台 修复 Webview窗口动画在Android6以下设备可能出现残影的Bug
  + Android平台 修复 使用plus.io.resolveLocalFileSystemURL方法传入路径非'/'结尾是获取目录对象entry不正确，导致entry.getDirectory创建子目录路径不对的Bug
  + iOS平台 新增 云打包支持配置Capabilities，如通用链接（Universal Link）[详情](https://ask.dcloud.net.cn/article/36393)
  + iOS平台 新增 创建本地消息（plus.push.createMessage）支持设置标题（title）和副标题（subtitle） [详情](https://ask.dcloud.net.cn/question/78475)
  + iOS平台 更新 UniPush&个推推送SDK（2.4.1.0）适配iOS13
  + iOS平台 更新 友盟统计SDK（6.0.5）适配iOS13，注意：新版本要求应用使用广告标识IDFA [详情](https://ask.dcloud.net.cn/article/74)
  + iOS平台 修复 使用录音对象（AudioRecorder）时如果用户不允许访问麦克风（未授权）不触发失败回调的Bug
  + iOS平台 修复 音频播放对象（AudioPlayer）的setStyles方法设置开始播放位置（startTime）不准确，isPaused方法获取播放状态不准确的Bug [详情](https://ask.dcloud.net.cn/question/76201)
  + iOS平台 修复 视频播放（VideoPlayer）控件无法播放带身份认证的rtsp地址的Bug [详情](https://ask.dcloud.net.cn/question/76526)
  + iOS平台 修复 视频播放（VideoPlayer）控件在iOS13上退出全屏后显示位置不正确的Bug
  + iOS平台 修复 蓝牙（Bluetooth）停止搜索设备后再开始可能无法返回之前搜索到的设备，及搜索设置allowDuplicatesKey参数无效的Bug。
  + iOS平台 修复 获取网络gif图片信息（plus.io.getImageInfo）引起应用崩溃的Bug
  + iOS平台 修复 Webview窗口设置滑屏（drag）后，侧滑返回操作可能引起应用崩溃的Bug [详情](https://ask.dcloud.net.cn/question/77462)
  + iOS平台 修复 应用仅配置横屏时调用系统相册选择图片（plus.gallery.pick）时引起应用崩溃的Bug [详情](https://ask.dcloud.net.cn/question/77394)
  + iOS平台 修复 图片压缩转换（plus.zip.compressImage）处理图片分辨率过高可能造成内存溢出引起应用崩溃的Bug [详情](https://github.com/dcloudio/uni-app/issues/713)
  + iOS平台 修复 图片预览（plus.nativeUI.previewImage）显示高分辨率图片可能超出内存溢出引起应用崩溃的Bug
  + iOS平台 修复 直播推流（LivePusher）控件配置开启摄像头（enable-camera）属性导致无法推视频流的Bug
  + iOS平台 修复 直播推流（LivePusher）控件设置视频模式（mode）属性和宽高比（aspect）属性可能不生效的Bug
  + iOS平台 修复 获取图片信息（plus.io.getImageInfo）传入网络图片地址无法下载图片时触发成功回调的Bug
  + iOS平台 修复 Webview窗口背景设置为深色时，Tab栏上面会出现白条的Bug [详情](https://ask.dcloud.net.cn/question/77442)
  + iOS平台 修复 Webview窗口使用WKWebview内核时overrideUrlLoading方法无效的Bug [详情](https://ask.dcloud.net.cn/question/78173)
  + iOS平台 修复 蓝牙（Bluetooth）开始搜索后不停止直接关闭页面可能会引起应用崩溃的Bug

#### 2.3.0.20190919-alpha
* 【uni-app插件】
  + App平台 修复 nvue 页面 picker-view 组件初次渲染可能错乱的 Bug
  + App-iOS平台 修复 nvue video标签设置自动播放（autoplay）为true不生效的Bug
* 【5+App插件】
  + iOS平台 新增 云打包支持配置Capabilities，如通用链接（Universal Link）[详情](https://ask.dcloud.net.cn/article/36393)
  + iOS平台 修复 使用录音对象（AudioRecorder）时如果用户不允许访问麦克风（未授权）不触发失败回调的Bug
  + iOS平台 修复 视频播放（VideoPlayer）控件在iOS13上退出全屏后显示位置不正确的Bug

#### 2.2.7.20190917-alpha
* 【uni-app插件】
  + 【重要】App平台 优化 不显示的Tab页面，释放渲染内存占用，提升窗体动画和页面滚动的平滑度
  + 【重要】uni统计 优化 统计接口上报性能，已启用uni统计的历史项目，请在小程序后台request安全域名中新增（不是替换）：tongji.dcloud.io
  + 修复 兼容sass-loader 8.0.0版本 [#776](https://github.com/dcloudio/uni-app/issues/776)
  + App平台 新增 nvue 中支持 uni.scss
  + App平台 修复 setNavigationBarTitle不生效的Bug
  + hello uni-app 优化 cover-view 组件示例(App端使用nvue实现)，支持在视频全屏界面覆盖遮罩物
  + hello uni-app 优化 video 组件示例，新增播放、暂停、设置倍速等能力演示
* 【5+App插件】
  + Android平台 修复 uni-app自定义组件模式下websocket连接报some error occur错误的Bug [详情](https://ask.dcloud.net.cn/question/78789)
  + Android平台 修复 nvue页面中input标签设置adjust-position属性不生效，及KeyboardHeightChange事件不触发的Bug [详情](https://ask.dcloud.net.cn/question/78796)
  + iOS平台 新增 创建本地消息（plus.push.createMessage）支持设置标题（title）和副标题（subtitle） [详情](https://ask.dcloud.net.cn/question/78475)
  + iOS平台 修复 蓝牙（Bluetooth）开始搜索后不停止直接关闭页面可能会引起应用崩溃的Bug

#### 2.2.6.20190914-alpha
* 【uni-app插件】
  + 【重要】 App平台 优化使用Tab时应用的内存占用，提升窗体动画和页面滚动的平滑度（自定义组件模式）
  + 【重要】 公告：非自定义组件模式，将于11月1日起，停止支持。请开发者尽快升级 [详情](https://ask.dcloud.net.cn/article/36385)
  + 新增 编译时增加警告信息（不影响运行）
  + 修复 静态资源过大时编译报错的 Bug
  + 修复 部分样式编译时未自动增加 webkit 前缀的 Bug [#769](https://github.com/dcloudio/uni-app/issues/769)
  + App平台/H5平台 新增 支持导航栏透明配置（transparentTitle） [详情](https://uniapp.dcloud.io/collocation/pages?id=style)
  + App平台/H5平台 修复 input、textarea 组件禁用状态黑色文字在 iOS 颜色变浅的 Bug
  + App平台 新增 导航栏支持配置图片（titleImage） [详情](https://uniapp.dcloud.io/collocation/pages?id=style)
  + App平台 新增 nvue 环境支持 recycle-list 组件 [详情](https://uniapp.dcloud.io/component/recycle-list)
  + App平台 新增 nvue 环境支持 picker-view 组件
  + App平台 修复 nvue 环境 movable-area 组件手势和滚动冲突的 Bug
  + App平台 优化 websocket 支持创建多个连接，支持收发 ArrayBuffer 类型数据
  + App平台 修复 键盘高度变化事件不生效的 Bug
  + App平台 修复 页面中 web-view 组件的页面加载完成之前标题栏会显示 null 的 Bug
  + H5平台 新增 支持导航栏点击穿透配置（titlePenetrate） [详情](https://uniapp.dcloud.io/collocation/pages?id=style)
  + H5平台 修复 rich-text 内部节点包含多个 class 时渲染不正确的 Bug [#756](https://github.com/dcloudio/uni-app/issues/756)
  + uni统计 运行测试时不再上报数据，仅发行后才报数
  + uni统计 修复预览模式自定义统计（uni.report）报错的问题
* 【5+App插件】
  + 【重要】Android平台 优化 窗体动画popin/popout的效率，Android6+加入老窗体透明alpha效果（同时注意此时动画时长设置不再生效）
  + Android平台 修复 nvue页面中video标签设置control属性为false时，未播放状态下仍然显示控制栏的Bug
  + iOS平台 更新 个推&UniPush推送SDK（2.4.1.0）适配iOS13
  + iOS平台 修复 Webview窗口使用WKWebview内核时overrideUrlLoading方法无效的Bug [详情](https://ask.dcloud.net.cn/question/78173)
  + iOS平台 修复 直播推流（LivePusher）控件设置视频模式（mode）属性和宽高比（aspect）属性可能不生效的Bug
  + iOS平台 修复 nvue页面中input组件设置adjust-position属性值为false无效的Bug [详情](https://ask.dcloud.net.cn/question/78472)
  + iOS平台 修复 nvue页面中webSocket模块设置多个协议（protocol）导致连接服务器失败的Bug
  + iOS平台 修复 nvue页面中bindingx在uni-app编译模式下拖拽组件时偏移系数不正确的Bug

#### 2.2.5.20190907-alpha
* 【uni-app插件】
  + 【重要】新增 nvue 页面支持 vuex 的使用 [详情](https://uniapp.dcloud.io/use-weex?id=vue-%e5%92%8c-nvue-%e5%85%b1%e4%ba%ab%e7%9a%84%e5%8f%98%e9%87%8f%e5%92%8c%e6%95%b0%e6%8d%ae)
  + 【重要】调整 App平台 iOS下，vue及nvue页面的uni-app编译模式下，web-view组件从UIWebview改为WKWebview。[详情](https://ask.dcloud.net.cn/article/36348)
  + 优化 wxs 支持script方式写法，方便着色、格式化、语法校验 [详情](https://uniapp.dcloud.io/frame?id=wxs)
  + 优化 image 组件支持自闭合写法 [#625](https://github.com/dcloudio/uni-app/issues/625)
  + 优化 autoprefixer 目标浏览器兼容，减少生成的 css 代码
  + 修复 部分模板写法导致编译器报错的Bug [#604](https://github.com/dcloudio/uni-app/issues/604)
  + 修复 mode 不正确导致 cli 下读取 .env 错误的Bug [#710](https://github.com/dcloudio/uni-app/issues/710)
  + 修复 for 循环中绑定多个事件方法，参数获取不正确的Bug [#720](https://github.com/dcloudio/uni-app/issues/720)
  + App/H5平台 新增 uni.getSystemInfo 支持返回安全区信息（safeArea）
  + App/H5平台 新增 swiper 组件支持 transition 事件
  + App平台 优化 tab切换减少白屏概率
  + App平台 优化 页面背景样式生效时机，解决深色背景等特定场景下，页面切换时闪白的问题
  + App平台 修复 iOS13 页面无法滚动的Bug [详情](https://ask.dcloud.net.cn/question/77877)
  + App平台 新增 uni.getSystemInfo 支持返回手机品牌信息（brand） [详情](https://ask.dcloud.net.cn/question/77313)
  + App平台 修复 纯nvue项目中 uni.scanCode、uni.chooseLocation 接口不触发回调的Bug
  + App平台 修复 纯nvue项目中 uni.stopPullDownRefresh 不生效的Bug
  + App平台 修复 纯nvue项目中 开发运行期间新增 nvue 页面，热更新白屏的Bug
  + App平台 优化 nvue Android版switch的样式与性能
  + App平台 优化 nvue button 组件内部支持嵌套 text 组件
  + H5平台/支付宝平台 新增 导航栏配置项titleImage（导航栏标题图） [详情](https://uniapp.dcloud.io/collocation/pages?id=style)
  + H5平台 修复 input 组件的 change 事件会冒泡到父组件的Bug [详情](https://ask.dcloud.net.cn/question/77962)
  + H5平台 修复 svg 或非base64格式的 Data URI 无法使用的Bug [#668](https://github.com/dcloudio/uni-app/issues/668)
  + 小程序平台 新增 uni.getMenuButtonBoundingClientRect 接口，可获取导航栏右上角胶囊按钮的布局位置信息 [详情](https://uniapp.dcloud.io/api/ui/menuButton?id=getmenubuttonboundingclientrect)
  + 小程序平台 优化 发行时压缩 css 代码
  + 百度/字节跳动小程序平台 修复 开发工具 sourcemap 无效的Bug [#724](https://github.com/dcloudio/uni-app/issues/724)
  + 支付宝小程序 新增 button 组件 open-type 属性支持 getPhoneNumber
  + hello uni-app 新增 nvue地图 组件及API示例
  + hello uni-app 新增 全屏视频上下滑动 示例模板
  + uni-ui 新增 SearchBar 搜索输入框
  + uni-ui 新增 GoodsNav 商品详情页底部购物车、购买导航条
  + uni-ui 新增 Fav 收藏按钮
  + uni-ui 优化 SwipeAction 滑动操作组件，App平台、H5 平台、微信小程序平台使用 wxs 实现跟手式流畅拖动
  + uni-ui 优化 Collapse 折叠面板在低配设备中动画卡顿的问题
  + uni-ui 优化 LoadMore 加载图标可按平台配置或由用户指定，Android平台默认circle，iOS平台默认雪花
  + uni-ui 优化 SwipeDot 优化指示器样式
  + uni-ui 修复 Icons 组件在 H5 平台不显示的BUG。老用户请更新Icons组件 [详情](https://ask.dcloud.net.cn/article/36404)
  + 新闻模板 优化 拖动标签卡时更快的渲染页面、无网络时引导用户设置
  + uni统计 修复 页面标题和页面 url 不匹配的Bug
  + uni统计 修复 选项卡页面 url 上报不正确的Bug
* 【5+App插件】
  + 【重要】iOS平台 默认Webview从UIWebview改为WKWebview。从iOS13开始苹果将UIWebview列为过期API。[详情](https://ask.dcloud.net.cn/article/36348)
  + Android平台 修复 uni-app中网络请求设置method为DELETE时请求参数丢失的Bug [详情](https://ask.dcloud.net.cn/question/77624)
  + Android平台 修复 部分平板设备横屏显示时可能出现灰色区域的Bug [详情](https://ask.dcloud.net.cn/question/77055)
  + Android平台 修复 图片压缩转换（plus.zip.compressImage）后exif头信息丢失的Bug [详情](https://github.com/dcloudio/uni-app/issues/437)
  + Android平台 修复 获取图片信息（plus.io.getImageInfo）传入网络图片地址无法下载图片时控制台输出Unexpected identifier错误的Bug [详情](https://ask.dcloud.net.cn/question/77363)
  + Android平台 修复 设置应用全屏显示（plus.navigator.setFullscreen）时在部分刘海屏设备显示区域可能不正确的Bug
  + Android平台 修复 Webview窗口动画在Android6以下设备可能出现残影的Bug
  + Android平台 修复 使用plus.io.resolveLocalFileSystemURL方法传入路径非'/'结尾是获取目录对象entry不正确，导致entry.getDirectory创建子目录路径不对的Bug
  + Android平台 修复 nvue页面中map组件中添加的子组件无法正常显示的Bug [详情](https://ask.dcloud.net.cn/question/78307)
  + iOS平台 更新 友盟统计SDK（6.0.5）适配iOS13，注意：新版本要求应用使用广告标识IDFA [详情](https://ask.dcloud.net.cn/article/74)
  + iOS平台 修复 Webview窗口设置滑屏（drag）后，侧滑返回操作可能引起应用崩溃的Bug [详情](https://ask.dcloud.net.cn/question/77462)
  + iOS平台 修复 应用仅配置横屏时调用系统相册选择图片（plus.gallery.pick）时引起应用崩溃的Bug [详情](https://ask.dcloud.net.cn/question/77394)
  + iOS平台 修复 图片压缩转换（plus.zip.compressImage）处理图片分辨率过高可能造成内存溢出引起应用崩溃的Bug [详情](https://github.com/dcloudio/uni-app/issues/713)
  + iOS平台 修复 图片预览（plus.nativeUI.previewImage）显示高分辨率图片可能超出内存溢出引起应用崩溃的Bug
  + iOS平台 修复 直播推流（LivePusher）控件配置开启摄像头（enable-camera）属性导致无法推视频流的Bug
  + iOS平台 修复 获取图片信息（plus.io.getImageInfo）传入网络图片地址无法下载图片时触发成功回调的Bug
  + iOS平台 修复 Webview窗口背景设置为深色时，Tab栏上面会出现白条的Bug [详情](https://ask.dcloud.net.cn/question/77442)
  + iOS平台 修复 nvue页面中swipe组件高度动态变化后切页显示不正常的Bug [详情](https://ask.dcloud.net.cn/question/77500)
  + iOS平台 修复 nvue页面中video标签设置封面图片（poster）后动态修改src属性可能引起应用崩溃的Bug [详情](https://ask.dcloud.net.cn/question/77353)
  + iOS平台 修复 nvue页面中video标签中退出全屏后覆盖元素显示不正常的Bug
  + iOS平台 修复 uni原生插件实现代理方法（application:handleOpenURL:）不触发，导致无法获取第三方应用返回数据的Bug

#### 2.2.4.20190823-alpha
* 【uni-app插件】
  + 【重要】App/微信小程序平台 新增 支持wxs，支付宝小程序平台支持SJS，百度小程序平台支持Filter [详情](https://uniapp.dcloud.io/frame?id=wxs)
  + App平台 修复 微信自定义组件运行时报错的Bug [详情](https://ask.dcloud.net.cn/question/77358)
* 【5+App插件】
  + Android平台 优化 窗口动画效率，提升页面显示/关闭动画流畅度
  + iOS平台 修复 subNVue页面可能无法接收到父页面通过subNVue.postMessage发送的消息的Bug [详情](https://ask.dcloud.net.cn/question/77312)
  + iOS平台 修复 uni原生插件实现代理方法（application:openURL:options:）后与第三方应用交互（如调用微信登录）引起应用崩溃的Bug
  + iOS平台 修复 获取网络gif图片信息（plus.io.getImageInfo）引起应用崩溃的Bug

#### 2.2.3.20190822-alpha
* 【uni-app插件】
  + 【重要】uni统计平台上线，一份报表，掌握业务全景 [详情](https://tongji.dcloud.net.cn)
  + App平台 新增 uni.onKeyboardHeightChange 支持监听键盘高度变化
  + App平台 优化 renderer配置为native的纯nvue项目，uni.request 发起网络请求时，Content-Type 默认设置为 application/json
  + App平台 优化 input 组件 @focus 事件支持获取键盘高度
  + App平台 优化 uni.request 自动去除 url 首尾空白字符
  + App平台 修复 解决 scroll-view、movable-view 组件触摸滑动时会触发下拉刷新的 Bug
  + H5平台 新增 支持 icon 组件。注意此功能会与老版的uni ui的icon组件重名 [详情](https://ask.dcloud.net.cn/article/36404)
  + H5平台 优化 uni.getNetworkType 支持 Safari 浏览器
  + H5平台 修复 input 组件 confirm-type 值为 search 时文字垂直不居中的 Bug
  + H5平台 修复 animation 属性中部分动画不生效的 Bug
  + 微信小程序平台 修复 当使用小程序插件后，调用数组方法修改数组未触发界面渲染的 Bug [#694](https://github.com/dcloudio/uni-app/issues/694)
  + 支付宝小程序平台 新增 支持分包加载功能
* 【5+App插件】
  + 修复 nvue页面在非自定义组件模式下module（模块）只能触发一次回调事件（如webSockets的onMessage事件）的Bug
  + Android平台 修复 HBuilderX2.2.0引出的uni原生插件调用（uni.requireNativePlugin）使用时报错的Bug [详情](https://ask.dcloud.net.cn/question/76962)
  + Android平台 修复 nvue页面中web-view组件无法使用定位功能的Bug [详情](https://ask.dcloud.net.cn/question/76909)
  + Android平台 修复 nvue页面中textarea、input组件首次触发focus事件时无法获取键盘高度的Bug [详情](https://ask.dcloud.net.cn/question/76923)
  + iOS平台 修复 音频播放对象（AudioPlayer）的setStyles方法设置开始播放位置（startTime）不准确，isPaused方法获取播放状态不准确的Bug [详情](https://ask.dcloud.net.cn/question/76201)
  + iOS平台 修复 视频播放（VideoPlayer）控件无法播放带身份认证的rtsp地址的Bug [详情](https://ask.dcloud.net.cn/question/76526)
  + iOS平台 修复 蓝牙（Bluetooth）停止搜索设备后再开始可能无法返回之前搜索到的设备，及搜索设置allowDuplicatesKey参数无效的Bug。
  + iOS平台 修复 nvue页面在iPhoneX设备软键盘弹出时页面偏移位置不准确的Bug [详情](https://ask.dcloud.net.cn/question/76783)
  + iOS平台 修复 nvue页面中map组件添加的子组件可能无法显示的Bug [详情](https://ask.dcloud.net.cn/question/76719)

#### 2.2.2.20190816
* 【uni-app插件】
  + App平台 修复 uni.chooseLocation 界面搜索地点导致地图高度异常的Bug [详情](https://ask.dcloud.net.cn/question/76645)
* 【5+App插件】
  + Android平台 修复 部分情况下软键盘隐藏后页面底部留白的Bug [详情](https://ask.dcloud.net.cn/question/76683)
  + Android平台 修复 plus.gallery.pick选择视频后返回失败的Bug

#### 2.2.1.20190813
* 【uni-app插件】
  + App平台 修复 uni.request 接口中 responseType 参数设置为 arraybuffer 时,请求无效的 Bug [详情](https://ask.dcloud.net.cn/question/66153)
  + H5平台 修复 开启摇树优化（treeShaking）后，多构建出一份无效文件的Bug [#638](https://github.com/dcloudio/uni-app/issues/638)
* 【5+App插件】
  + Android平台 修复 在小米手机上选择本地视频总是返回失败回调的Bug [详情](https://ask.dcloud.net.cn/question/76469)
  + Android平台 修复 nvue页面中input组件弹出软键盘后报js错误（Failed to receiveTasks, instance is not available）的Bug
  + iOS平台 更新 高德地图SDK：基础SDK（v1.5.7）、3D地图SDK（v6.9.0）、搜索功能（v6.9.0），修复多次打开关闭地图页面引起应用崩溃的Bug [  + 详情](https://ask.dcloud.net.cn/question/66225)  + 
  + iOS平台 修复 视频播放（VideoPlayer）控件的timeupd  + ate事件不触发的Bug [详情](https://ask.dcloud.net.cn/question/76470)  + 
  + iOS平台 修复 视频播放（VideoPlayer）控件全屏时音量  + 调节手势功能无效的Bug  + 
  + iOS平台 修复 Webview窗口配置系统软键盘模式（softinputMode）为adjustResize，收起软键盘后窗口高度无法恢复的Bug [详情](  + https://ask.dcloud.net.cn/question/76374)
  + iOS平台 修复 uni-app项目打包模块配置中勾选“Maps(地图)”但不配置高德或百度地图SDK参数引起提交云端打包失败的Bug

#### 2.2.0.20190812
* 【uni-app插件】
  + 【重要】H5平台 新增 支持配置摇树优化，打包时裁剪不需要的组件及API，大幅减少H5框架的发行体积，提高首次加载渲染速度 [详情](https://uniapp.dcloud.io/collocation/manifest?id=optimization)
  + 【重要】App平台 自定义组件模式 优化 uni.request 的实现，加快联网速度，尤其是上拉翻页的速度
  + 【重要】App平台 支持纯 nvue 项目，manifest配置 "app-plus" -> "renderer":"native"，可不加载基于 webview 的运行框架，减少包体积、提升启动速度。（新建项目选新闻模板可体验）
  + 【重要】App平台 nvue 的 uni-app 编译模式 新增 组件：cover-view（支持嵌套、滚动）、cover-image、progress、button、checkbox、radio、switch、form、slider、barcode、live-pusher、map（map 组件实现与微信对齐，目前仅支持高德地图）
  + 【重要】App平台 nvue 的 uni-app 编译模式 优化组件 `swiper`，支持竖向滑动，内嵌 video，实现抖音式视频上下滑动效果（微信基础库 2.4.0以上亦可实现类似功能）
  + 【重要】App平台 nvue 的 uni-app 编译模式 优化组件 `video`，支持内嵌 cover-view，并支持视频全屏后通过 cover-view 自定义全屏界面内容（用法同微信小程序）
  + 【重要】App平台 nvue 的 uni-app 编译模式 优化组件 `rich-text`，支持加粗、文字换行
  + 【重要】App平台 nvue 的 uni-app 编译模式 iOS上支持点击顶部状态栏滚动页面到顶部，组件 `scroll-view` 支持enableBackToTop属性为true以实现相同效果
  + 【重要】App平台 nvue 的 uni-app 编译模式 软键盘弹出事件（focus）中支持获取软键盘的高度 [详情](https://uniapp.dcloud.io/component/input)
  + 【重要】App平台 Android 系统 input、textarea、editor 键盘弹出方式默认从 adjustResize 调整为 adjustPan，即输入法弹出后窗体不是缩小而是上推，让软键盘弹出和收起更顺滑，并且与iOS、及各种小程序平台的实现逻辑统一。如不需要此功能，需在 pages.json 中 style->app-plus 节点下设 "softinputMode": "adjustResize"。另 editor 组件目前仍然是 adjustResize
  + 【重要】新增 支持 vue.config.js 配置文件，可自定义 webpack 配置选项，包括增加自定义静态资源目录、小程序自定义组件目录，方便老项目转换 [详情](https://uniapp.dcloud.io/collocation/vue-config)
  + 【重要】新增 CLI版支持 package.json 配置文件扩展，自行扩展条件编译平台（如钉钉小程序、H5-weixin等） [详情](https://uniapp.dcloud.io/collocation/package)
  + 新增 提供离线文档[https://github.com/dcloudio/uni-app/tree/master/docs](https://github.com/dcloudio/uni-app/tree/master/docs)
  + App平台 Android平台 新增 uni-app（自定义组件模式及 nvue 页面）适配支持 arm64-v8a（64位）CPU类型，解决 Google Play 发布 app 必须支持64位的问题 [详情](https://ask.dcloud.net.cn/article/36195)
  + App平台 weex版本升级为最新的0.26.0
  + App平台 uni.chooseLocation 新增 keyword 参数，解决启用百度地图后，选择位置界面附近地址列表为空的 Bug
  + App平台 修复 当 pages.json 中配置页面过多时，windows平台编译报 ENAMETOOLONG 错误的 Bug
  + App平台 修复 static 下部分类型资源文件未打包的 Bug [#619](https://github.com/dcloudio/uni-app/issues/619)
  + App平台 修复 nvue 在 uni-app 编译模式下，nvue页面无法接收参数的 Bug
  + App平台 iOS系统 修复 uni.openLocation 打开的位置展示页面，地图显示不全的 Bug [详情](https://ask.dcloud.net.cn/question/75754)
  + 微信小程序平台 新增 支持在分包内引入插件代码包 [#620](https://github.com/dcloudio/uni-app/issues/620)
  + hello uni-app 首页选项卡页面，重构为 nvue，提升渲染速度
  + hello uni-app 使用定位、相册等功能时，新增权限判断，优化用户体验
  + uni-ui 新增 Calendar 日历组件新增打点、范围选择，优化性能
  + uni-ui 新增 Grid 宫格组件新增红点、数字角标、图片角标显示、点击事件
  + uni-ui 新增 Card 卡片组件新增图文卡片模式
  + uni-ui 新增 Popup 弹出层组件新增动画效果
  + uni-ui 优化 Grid 宫格组件代码重构，修改传值方式，定制度更高
  + uni-ui 修复 Calendar 日历组件高度渲染不正确的 Bug 
  + uni-ui 修复 Collapse 折叠面板组件在动画模式下，动态添加数据高度不正确的 Bug
  + uni-ui 修复 Popup 弹出层组件底部弹出示例样式错乱的 Bug
  + uni-ui 修复 Popup 弹出层组件顶部弹出在 H5 端位置不正确的 Bug
  + uni-ui 修复 LoadMore 加载更多组件不显示”加载中“动画的 bug
  + 新闻/资讯App模板 所有页面均使用nvue实现
* 【5+App插件】
  + 【重要】Android平台 新增 5+ APP和uni-app适配支持arm64-v8a（64位）CPU类型，解决GooglePlay提审要求64位的问题 [详情](https://ask.dcloud.net.cn/article/36195)
  + 【重要】Android平台 更新 支付宝SDK版本为15.6.5，修复SDK版本过低可能被Google Play下架的Bug [详情](https://ask.dcloud.net.cn/question/76073)
  + 新增 支持manifest.json文件中设置屏幕方向（screenOrientation）真机运行时可立即生效（无需提交云端打包） [文档](https://ask.dcloud.net.cn/article/94#screenOrientation)
  + Android平台 新增 适配最新的Android Q（API等级29）系统 [详情](https://ask.dcloud.net.cn/article/36199)
  + Android平台 新增 可在打包时取消x86 cpu支持，以减少apk体积
  + Android平台 修复 部分安卓4.4手机上获取设备信息（plus.device.getInfo）无法返回imei的Bug
  + Android平台 修复 微信登录第一次授权登录可能返回失败的Bug [详情](https://ask.dcloud.net.cn/question/74869)
  + Android平台 修复 华为手机调用plus.runtime.setBadgeNumber(0)无法清除应用角标的Bug [详情](https://ask.dcloud.net.cn/question/72276)
  + iOS平台 新增 视频播放（VideoPlayer）控件支持设置倍速播放（playbackRate）
  + iOS平台 修复 视频播放（VideoPlayer）控件在页面关闭后可能还会在后台重新播放的Bug [详情](https://ask.dcloud.net.cn/question/74022)
  + iOS平台 修复 横竖屏设置中landscape-primary、landscape-secondary方向与android平台相反的Bug
  + iOS平台 修复 使用plus.maps.create创建地图设置宽高为用百分比时计算不准确的Bug [详情](https://ask.dcloud.net.cn/question/75754)
  + iOS平台 修复 蓝牙（Bluetooth）订阅特征值变化（notifyBLECharacteristicValueChange）后触发onBLECharacteristicValueChange事件逻辑不正确的Bug
  + iOS平台 修复 蓝牙（Bluetooth）特征值的写（write）属性可能获取不正确的Bug
  + iOS平台 修复 蓝牙（Bluetooth）特征值读（readBLECharacteristicValue）或写（writeBLECharacteristicValue）操作可能不触发回调的Bug

#### 2.1.3.20190724
* 【uni-app插件】
  + 修复 项目路径包含空格时，debugger 的 sourcemap 不正确导致无法打断点的Bug
  + App平台 修复 input 组件 type 值为 number 时 password 属性不生效的 Bug [#556](https://github.com/dcloudio/uni-app/issues/556)
  + App平台 修复 取消扫码会触发扫码成功回调的 Bug
  + App平台 修复 调用 uni.setNavigationBarTitle、uni.setNavigationBarColor 接口会导致隐藏状态的导航栏显示的 Bug
  + App平台 修复 部分特殊设备上 input textarea 组件中 input 事件无法触发的 Bug [详情](https://ask.dcloud.net.cn/question/74222)
  + H5平台 修复 uni.hideLoading 部分场景下失效的 Bug
  + 百度小程序平台 修复 uni.request 方法 dataType 设置为非 json 类型，仍按 json 解析的 Bug [#558](https://github.com/dcloudio/uni-app/issues/558)
* 【5+App插件】
  + Android平台 修复 Webview子窗口调用plus.webview.startAnimation动画可能引起页面不显示的Bug [详情](https://ask.dcloud.net.cn/question/74759)
  + Android平台 修复 Webview窗口软键盘弹出高度可能不正确的Bug [详情](https://ask.dcloud.net.cn/question/74854)
  + Android平台 修复 Webview父子窗口都设置statusbar后导致显示不正确的Bug，统一为父子窗口同时设置statusbar后仅子窗口的statusbar生效
  + Android平台 修复 Webview窗口的标题栏（titleNView）设置搜索框（searchInput）后可能会同时显示标题文字（titleText）的Bug [详情](https://ask.dcloud.net.cn/question/75179)
  + Android平台 修复 wap2app应用首页为选项卡页面在全面屏手机第一次打开底部可能有空白的Bug [详情](https://ask.dcloud.net.cn/question/74896)
  + Android平台 修复 图片进行扫码识别（plus.barcode.scan）返回数据多出引号的Bug [详情](https://ask.dcloud.net.cn/question/74738)
  + Android平台 修复 获取设备信息（plus.device.getInfo）在部分只有一个IMEI号的设备（如华为荣耀6等）无返回值的Bug [详情](https://ask.dcloud.net.cn/question/74855)
  + Android平台 修复 uni-app应用中nvue页面使用uni-app编译模式打包后覆盖安装使用了weex模式（老模式）版本引起nvue页面白屏的Bug
  + iOS平台 修复 Webvie窗口中通过new plus.maps.Map方法创建地图控件后再调用append方法添加其它子窗口会引起地图控件变成全屏大小的Bug
  + iOS平台 修复 UniPush通过苹果APNS通道下发payload为字符串内容时，点击触发click事件中消息对象的payload属性值自动转换为包含无效数据json类型的Bug
  + iOS平台 修复 nvue页面中获取渠道标识（plus.runtime.channel）返回值不正确的Bug
  + iOS平台 修复 真机运行时偶发页面无法渲染（白屏）的Bug [详情](https://ask.dcloud.net.cn/question/74782)

#### 2.1.1.20190716
* 【uni-app插件】
  + 修复 TypeScript 项目中包含 nvue 时编译报错的Bug
  + App端 优化 titleNView 配置为字符串"false"时，等同于布尔型false，均为隐藏导航栏
  + App端（Android平台） 修复部分场景下，导航栏标题显示为页面url的Bug
  + H5端 修复 input 组件在 flex 布局下默认宽度为0的Bug
  + H5端 修复 input 组件设置高度后文字默认未垂直居中的Bug
  + hello uni-app 修复顶部选项卡（nvue版本）下拉刷新无法回弹的Bug
* 【5+App插件】
  + iOS平台 修复 uni-app使用非自定义组件模式编译可能出现卡在splash界面或崩溃闪退的Bug [详情](https://ask.dcloud.net.cn/question/74644)
  + iOS平台 修复 5+应用使用WKWebview在某些情况下可能引起闪退的Bug
  + iOS平台 修复 webview的circle样式下拉刷新操作不流畅和显示细节不正确的Bug [详情](https://ask.dcloud.net.cn/question/74717)
  + Android平台 修复 nvue页面中image标签的placeholder属性设置本地地址可能引起崩溃的Bug [详情](https://ask.dcloud.net.cn/question/74646)
  + Android平台 修复 原生控件对象（plus.nativeObj.View）不添加到Webview窗口直接显示后无法正常关闭的Bug [详情](https://ask.dcloud.net.cn/question/74744)

#### 2.1.0.20190713
* 【uni-app插件】
  + 【重要】App平台 新增 debug调试功能（限自定义组件模式），支持vue/nvue页面断点调试、支持nvue页面element审查 [详情](https://uniapp.dcloud.io/snippet?id=%e5%85%b3%e4%ba%8e-app-%e7%9a%84%e8%b0%83%e8%af%95)
  + 【重要】App平台 nvue 新增 uni-app编译模式。以后同时存在weex编译模式和uni-app编译模式。uni-app编译模式将不再使用weex组件，而是改用uni基础组件，目前已支持部分组件，并支持nvue页面编译到H5和小程序端 [详情](https://ask.dcloud.net.cn/article/36074)
  + 【重要】App平台 nvue 新增 编译时校验css合法性，对于App平台的nvue不支持的样式在控制台给予告警（不影响编译结果） [详情](https://ask.dcloud.net.cn/article/36093)
  + 调整 推荐使用rpx替代upx，rpx支持全端动态绑定，无需再使用uni.upx2px [详情](https://ask.dcloud.net.cn/article/36130)
  + 修复 内置CSS变量应用于calc方法时，在特定场景下失效的Bug [详情](https://ask.dcloud.net.cn/question/67834)
  + 修复 自定义组件模式下，未直接修改 props 仍报 [Vue warn]: Avoid mutating a prop directly… 异常信息的Bug [详情](https://ask.dcloud.net.cn/question/72649)
  + 修复 自定义组件模式下，非 h5 平台，当计算属性发生错误，导致页面其他数据不再更新的 Bug [#530](https://github.com/dcloudio/uni-app/issues/530)
  + App/H5平台 修复 input 组件 letter-spacing 样式不生效的 Bug [#485](https://github.com/dcloudio/uni-app/issues/485)
  + App/H5平台 修复 textarea 组件在 iOS 设备上自增高度计算错误的 Bug [详情](https://ask.dcloud.net.cn/question/68372)
  + App/H5平台 修复 input 组件 min-height 样式不生效的 Bug
  + App平台 新增 支持 navigationStyle 配置为 custom 时隐藏导航栏
  + App平台 新增 nvue 在uni-app编译模式下，新增支持全局样式（App.vue中的样式，会作用于页面级.nvue文件）
  + App平台 新增 uni.getLocation 接口支持获取海拔高度
  + App平台 优化 uni.previewImage 的 longPressActions 回调支持返回图片索引值
  + App平台 优化 uni.connectSocket 接口支持 protocols 参数配置
  + App平台 优化 组件 style 动态绑定样式支持 upx 单位
  + App平台 修复 backgroundAudioManager 对象 onStop 事件监听不生效的 Bug
  + App平台 修复 uni.getSavedFileList、uni.getSavedFileInfo 能获取到已删除文件信息的 Bug [详情](https://ask.dcloud.net.cn/question/77936)
  + App平台 修复 map 组件 中的 iconPath 不支持本地路径的 Bug [详情](https://ask.dcloud.net.cn/question/72660)
  + App平台 修复 uni.getStorageInfo 无法获取缓存信息的 Bug [详情](https://ask.dcloud.net.cn/question/70600)
  + App平台 修复 textarea 组件 @blur 事件中未返回 cursor 参数的 Bug [#365](https://github.com/dcloudio/uni-app/issues/365)
  + App平台 修复 uni.chooseLocation 打开的位置选择页面，下方的地点列表某些情况无法自动加载的 Bug [详情](https://ask.dcloud.net.cn/question/73007)
  + App平台 修复 cover-view 组件无法销毁的 Bug
  + App平台 修复 cover-view 组件在安卓平台，特定情况下无法显示文字的 Bug
  + App平台 修复 cover-image 组件在自定义组件编译模式，无法使用网络图片路径的 Bug [详情](https://ask.dcloud.net.cn/question/69236)
  + App平台 修复 uni.scanCode 在 iOS 设备上侧滑返回不触发 fail 回调的 Bug [详情](https://ask.dcloud.net.cn/question/73372)
  + App平台 修复 在 uni.scanCode 回调函数内调用 uni.setNavigationBarTitle 接口不生效的 Bug [详情](https://ask.dcloud.net.cn/question/73593)
  + App平台 修复 input 组件设置 disabled 属性后，在 iOS 平台文字颜色变浅的 Bug [详情](https://ask.dcloud.net.cn/question/72971)
  + App平台 修复 uni.chooseVideo 返回值中 duration/width/height 错误的 Bug [详情](https://ask.dcloud.net.cn/question/71001)
  + App平台 修复 非自定义组件模式 InnerAudioContext 对象无法销毁的 Bug
  + App平台 修复 InnerAudioContext 对象获取 buffered 值不正确的 Bug [详情](https://ask.dcloud.net.cn/question/73902)
  + H5平台 新增 uni.createIntersectionObserver 接口支持
  + H5平台 新增 uni.createAnimation 接口支持，组件支持 animation 属性
  + H5平台 新增 video 组件支持配置 x5-playsinline 属性
  + H5平台 优化 uni.showModal 内容支持通过 \n 实现换行显示 [详情](https://ask.dcloud.net.cn/question/67355)
  + H5平台 优化 自动修改 document.title 为 navigationBarTitleText 的值 [#394](https://github.com/dcloudio/uni-app/issues/394)
  + H5平台 优化 URL 参数解析方式 [#445](https://github.com/dcloudio/uni-app/issues/445)
  + H5平台 优化 页面生命周期 onLaunch、onShow 中支持获取 path、query 参数 [#408](https://github.com/dcloudio/uni-app/issues/408)
  + H5平台 修复 在页面或组件内定义 input 组件 placeholder-class 不生效的 Bug [详情](https://ask.dcloud.net.cn/question/62846)
  + H5平台 修复 InnerAudioContext 对象 buffered 属性读取报错的 Bug [详情](https://ask.dcloud.net.cn/question/73902)
  + H5平台 修复 onPageScroll、onReachBottom 等生命周期无法触发的 Bug
  + H5平台 修复 uni.canvasToTempFilePath 接口 desWidth、desHeight 参数不生效的 Bug
  + H5平台 修复 微信浏览器中 uni.openLocation 打开的查看位置页面，“去这里”按钮点击无效的 Bug [详情](https://ask.dcloud.net.cn/question/73089)
  + H5平台 修复 mixin 中定义的 onLoad、onShow 等页面生命周期钩子函数不生效的 Bug [详情](https://ask.dcloud.net.cn/question/69412)
  + H5平台 修复 textarea 组件设置 auto-height 属性后，在 Chrome 浏览器内仍然显示滚动条的 Bug [详情](https://ask.dcloud.net.cn/question/68372)
  + H5平台 修复 textarea 组件在特定场景下，不触发@input事件的 Bug [详情](https://ask.dcloud.net.cn/question/73221)
  + H5平台 修复 uni.showLoading 方法 mask 参数配置无效的 Bug
  + H5平台 修复 innerAudioContext 对象的 src 属性使用相对路径时，音频无法播放的 Bug [详情](https://ask.dcloud.net.cn/question/73632)
  + H5平台 修复 uni.previewImage 不传 current 参数时，运行报错的 Bug
  + H5平台 修复 movable-area 组件 scale 事件中无法获取 x、y 属性的Bug [#408](https://github.com/dcloudio/uni-app/issues/415)
  + H5平台 修复 navigator 组件 delta 属性不生效的Bug [详情](https://ask.dcloud.net.cn/question/65354)
  + H5平台 修复 uni.navigateBack 接口 delta 值大于1时中间页面未销毁的Bug [详情](https://ask.dcloud.net.cn/question/62639)
  + H5平台 修复 在 Chrome 浏览器中快速滑动 swiper 组件，可能会导致动画卡死的 Bug [#107](https://github.com/dcloudio/uni-app/issues/107)
  + H5平台 修复 在 iOS 浏览器中点击 view 组件显示半透明高亮效果的 Bug [#440](https://github.com/dcloudio/uni-app/issues/440)
  + 微信小程序平台 修复 页面默认显示分享菜单的Bug [#411](https://github.com/dcloudio/uni-app/issues/411)
  + 支付宝小程序平台 新增 transitionend/animationstart/animationiteration/animationend 通用事件支持
  + 支付宝小程序平台 新增 scroll-view 组件支持scrolltoupper/scrolltolower事件
  + 支付宝小程序平台 修复 无法使用npm方式引入@dcloudio/uni-ui的Bug  [#431](https://github.com/dcloudio/uni-app/issues/431)
  + 支付宝小程序平台 修复 web-view 组件中 postMessage 不能正常触发 @message 事件的 Bug [#389](https://github.com/dcloudio/uni-app/issues/389)
  + 百度小程序平台 修复 页面直达时，onLoad生命周期不触发的Bug
  + 百度小程序平台 修复 App.vue中onShow不触发的Bug [详情](https://ask.dcloud.net.cn/question/71446)
  + 字节跳动小程序平台 修复 getCurrentPages 接口返回的页面对象中route属性缺失的Bug [详情](https://ask.dcloud.net.cn/question/72603)
  + uni-ui 修复 LoadMore 加载更多组件不显示加载中动画的 Bug
  + hello uni-app 小程序平台 当用户拒绝定位权限后，再次点击获取定位时，引导用户去设置中开启
  + 新闻/资讯App模板 nvue页面使用新的uni-app编译模式，用uni基础组件重写，实现了nvue页面直接跨多端，App端新增了自定义的下拉刷新
  + 登录模板 修复 在支付宝平台页面高度设置 100% 未生效的Bug
  + 登录模板 修复 在字节跳动小程序上自定义组件编译模式下输入框样式错乱的 Bug
* 【5+App插件】
  + 【重要】新增 5+App添加UniPush功能，替代之前的个推和小米推送。[详情](https://ask.dcloud.net.cn/article/35622)
  + 【重要】新增 获取设备信息方法（plus.device.getInfo），不再推荐使用plus.device.imei。把属性改为方法可以避免Android平台在应用启动时被某些手机提示需要电话权限的问题。[详情](https://ask.dcloud.net.cn/article/36075)
  + 【重要】Android平台 云端打包API等级（targetSdkVersion）默认值调整为26，满足各主流应用市场的上架要求
  + 新增 获取应用（ipa/apk）版本号（plus.runtime.versionCode）接口 [文档](https://www.html5plus.org/doc/zh_cn/runtime.html#plus.runtime.versionCode)
  + 新增 获取应用信息（plus.runtime.getProperty）支持manifest.json文件中的版本号（version->code字段值） [文档](https://www.html5plus.org/doc/zh_cn/runtime.html#plus.runtime.WidgetInfo)
  + 修复 网络请求接口（plus.net.XMLHttpRequest）获取HTTP响应头部信息字段中多一个空格的Bug
  + Android平台 优化 图片预览（plus.nativeUI.previewImage）界面未沉浸式状态栏效果
  + Android平台 修复 配置渠道云端打包后获取的渠道信息（plus.runtime.channel）总是为空的Bug [详情](https://ask.dcloud.net.cn/question/72721)
  + Android平台 修复 HBuilderX2.0.0版本引出的plus.io.getImageInfo一直触发失败回调的Bug [详情](https://ask.dcloud.net.cn/question/72240)
  + Android平台 修复 搜索蓝牙设备（plus.bluetooth.startBluetoothDevicesDiscovery）设置为允许重复上报相同设备（allowDuplicatesKey参数为true）时，获取设备列表为空的Bug
  + Android平台 修复 图片预览（plus.nativeUI.previewImage）设置两张图片且loop为true会闪退的Bug [详情](https://ask.dcloud.net.cn/question/72711)
  + Android平台 完善 原生图片对象（plus.nativeObj.Bitmap）保存图片（save）方法兼容非预期参数 [详情](https://ask.dcloud.net.cn/question/72937)
  + Android平台 修复 使用unipush模块提交华为应用市场报“HMS根证书文件”错误的Bug [详情](https://ask.dcloud.net.cn/question/73258)
  + Android平台 修复 Webview窗口在某些情况（如退出视频全屏播放、弹出软键盘按home键后再切回前台、wap2app应用设置statusbar）可能出现底部空缺的Bug [详情](https://ask.dcloud.net.cn/question/72909)
  + Android平台 修复 subnvue窗口在某些情况下调用setStyle无效的Bug
  + Android平台 修复 视频控件（VideoPlayer）可能偶发出现进度条不更新不消失的Bug
  + Android平台 修复 视频播放（VideoPlayer）控件提交云端打包后无法播放本地视频文件的Bug [详情](https://ask.dcloud.net.cn/question/74129)
  + Android平台 修复 应用第一次运行时调用定位功能可能不弹出定位权限申请框也不触发错误回调的Bug [详情](https://ask.dcloud.net.cn/question/73081)
  + Android平台 修复 原生控件（NView）绘制字体图标在部分魅族手机上可能无法显示的Bug [详情](https://ask.dcloud.net.cn/question/64233)
  + Android平台 修复 部分手机上设置titleNView后可能引起页面高度不对的Bug [详情](https://ask.dcloud.net.cn/article/74198)
  + Android平台 修复 通过plus.runtime.launchApplication启动的应用可能出现plus.runtime.arguments更新失败的Bug [详情](https://ask.dcloud.net.cn/question/74479)
  + Android平台 修复 nvue页面云端打包后设置字体（font-family）属性可能无效的Bug
  + Android平台 修复 nvue页面创建WebSockets连接服务器总是反馈超时错误的Bug
  + Android平台 修复 uni-app为多tab应用，切换显示nvue页面时可能出现顶部留白的Bug [详情](https://ask.dcloud.net.cn/question/73687)
  + iOS平台 修复 提交苹果应用市场（AppStore）审核提示违反Guideline2.5.2的Bug [详情](https://ask.dcloud.net.cn/question/70813)
  + iOS平台 修复 音频播放（AudioPlayer）后台播放网络音乐时控制页面（iOS锁屏控制页）进度显示不准确的Bug [详情](https://ask.dcloud.net.cn/question/71891)
  + iOS平台 修复 数据库（SQLite）在多个页面同时操作时可能无效的Bug [详情](https://ask.dcloud.net.cn/question/72299)
  + iOS平台 修复 Webview窗口设置不替换H5标准定位接口（replacewebapi：{geolocation:'none'}）不生效的Bug
  + iOS平台 修复 日期选择（plus.nativeUI.pickDate）设置显示日期小于起始日期时默认返回的日期不正确的Bug [详情](https://ask.dcloud.net.cn/question/71886)
  + iOS平台 修复 获取图片信息（plus.io.getImageInfo）可能不触发回调的Bug [详情](https://ask.dcloud.net.cn/question/71511)
  + iOS平台 修复 非自定义组件模式在某些情况子窗口高度计算不正确的Bug [详情](https://ask.dcloud.net.cn/question/72889)
  + iOS平台 修复 视频控件（VideoPlayer）播放时拖放调整进度后可能不触发播放结束事件的Bug
  + iOS平台 修复 子Webview窗口中软键盘收起后页面无法自动恢复的Bug [详情](https://ask.dcloud.net.cn/question/74321)
  + iOS平台 修复 蓝牙（Bluetooth）第一次获取本机蓝牙适配器状态（getBluetoothAdapterState）不触发回调的Bug [详情](https://ask.dcloud.net.cn/question/73242)
  + iOS平台 修复 蓝牙（Bluetooth）特征值的write操作类型值为false时无法写入数据的Bug [详情](https://ask.dcloud.net.cn/question/69458)
  + iOS平台 修复 蓝牙（Bluetooth）特征值的notify操作类型值为true时无法订阅的Bug [详情](https://ask.dcloud.net.cn/question/72063)
  + iOS平台 修复 nvue页面打开vue页面后弹出软键盘时可能会露出之前nvue页面内容的Bug
  + iOS平台 修复 nvue页面中img标签src属性不支持"_doc"等开头的图片地址的Bug [详情](https://ask.dcloud.net.cn/question/64986)
  + iOS平台 修复 地图控件中的标点对象（marker）在新开页面后再返回时点击报js错误的bug [详情](https://ask.dcloud.net.cn/question/74517)
  + iOS平台 修复 nvue页面中获取渠道标识（plus.runtime.channel）返回值不正确的Bug

#### 2.0.1.20190614
* 【5+App插件】
  + Android平台 修复 配置渠道云端打包后获取的渠道信息（plus.runtime.channel）总是为空的Bug [详情](https://ask.dcloud.net.cn/question/72721)
  + Android平台 修复 图片预览（plus.nativeUI.previewImage）设置两张图片且loop为true会闪退的Bug [详情](https://ask.dcloud.net.cn/question/72711)

#### 2.0.0.20190610
* 【uni-app插件】
  + 【重要】App平台 新增 subNVue ，支持使用原生组件绘制自定义导航栏、全屏遮罩等 [详情](https://uniapp.dcloud.io/api/window/subNVues)
  + 【重要】支付宝/百度/字节跳动小程序平台 新增 支持自定义组件模式，提升性能和增强vue语法支持，[详见](https://ask.dcloud.net.cn/article/35843)
  + 新增 uni.$on,uni.$once,uni.$off,uni.$emit 方法，提供更优雅的页面间通信解决方案 [详情](https://uniapp.dcloud.io/api/window/communication)
  + 新增 组件 editor 富文本编辑器组件，包括微信和App平台 [详情](https://uniapp.dcloud.io/component/editor)
  + 新增 pages.json支持配置导航栏下方的阴影线navigationbarshadow [详情](https://uniapp.dcloud.io/collocation/pages?id=navigationbarshadow)
  + 修复 map 组件 @regionchange 事件绑定不生效的bug [详情](https://ask.dcloud.net.cn/article/35534)
  + 修复 更多 v-model 用法支持 [详情](https://ask.dcloud.net.cn/question/71517)
  + App平台 新增 uni.chooseVideo API 支持 camera、maxDuration 参数 [详情](https://uniapp.dcloud.io/api/media/video?id=choosevideo)
  + App平台 新增 getLocation 支持geocode参数，开发者可控制是否解析省市街道地址信息 [详情](https://uniapp.dcloud.io/api/location/location?id=getlocation)
  + App平台 新增 getLocation 成功回调中增加 address 属性，支持获取省市街道地址信息 [详情](https://uniapp.dcloud.io/api/location/location?id=getlocation)
  + App平台 修复 getLocation 经纬度获取成功、但地址解析失败时，未触发成功回调的Bug
  + App平台 修复 项目中仅包含 nvue 页面时运行报错的Bug
  + App平台 修复 偶发编译出错后再次保存代码不再继续编译的Bug
  + App平台 修复 popup类型的subNVue在特定场景下弹出时，遮罩未覆盖底部选项卡的Bug [详情](https://ask.dcloud.net.cn/question/72091)
  + App平台 修复 部分 iOS 机型上 uni.canvasToTempFilePath 保存的图像内容空白的问题 [详情](https://ask.dcloud.net.cn/question/71200)
  + App平台 修复 picker 组件在部分安卓手机上关闭时报错的Bug
  + App平台 修复 picker 组件在 iOS8 设备上无法显示的Bug
  + App平台 修复 uni.previewimage 接口的 longPressActions 回调无效的Bug
  + H5平台 新增 innerAudioContext 实现取消事件监听方法 [#393](https://github.com/dcloudio/uni-app/issues/393)
  + H5平台 优化 picker、picker-view 组件滚动停止过慢的问题 [#278](https://github.com/dcloudio/uni-app/issues/278)、[#367](https://github.com/dcloudio/uni-app/issues/367)
  + H5平台 修复 Safari 浏览器调用 uni.getSystemInfoSync 接口报错的Bug
  + H5平台 修复 uni.getSystemInfoSync 在部分手机上执行异常的Bug [详情](https://ask.dcloud.net.cn/question/71622)
  + H5平台 修复 picker 组件设置 start 属性后导致部分日期无法选择的Bug [#404](https://github.com/dcloudio/uni-app/issues/404)
  + H5平台 修复 video 组件全屏后播放控件被视频遮挡的Bug [详情](https://ask.dcloud.net.cn/question/71831)
  + H5平台 修复 页面点击事件中获取的x坐标不正确的Bug [详情](https://ask.dcloud.net.cn/question/71921)
  + H5平台 修复 uni.showToast() 被部分页面元素遮挡的Bug [详情](https://ask.dcloud.net.cn/question/70914)
  + H5平台 修复 某些情况下外部修改 history 导致路由卡在当前页面、无法后退的Bug
  + H5平台 修复 部分浏览器上 canvas 监听 touch 事件无法获取触发坐标的Bug
  + H5平台 修复 image 组件的src属性为空时，错误触发资源请求的Bug
  + H5平台 修复 movable-view 组件的animation属性无效的Bug
  + 微信小程序平台 新增 支持workers目录配置 [详情](https://uniapp.dcloud.io/collocation/manifest?id=mp-weixin)
  + 支付宝小程序平台 新增 设置TabBar 相关API [详情](https://uniapp.dcloud.io/api/ui/tabbar?id=settabbaritem)
  + 支付宝小程序平台 修复 uni.showLoading() 在小程序开发者工具 v0.32.3 版本下报错的Bug [详情](https://ask.dcloud.net.cn/question/71332)
  + 百度小程序平台 修复 自定义组件模式下，页面的 onShow 生命周期不触发的Bug
  + hello uni-app 新增 原生子窗体（subNVue）示例
  + hello uni-app 新增 iBeacon 示例
  + hello uni-app 新增 editor 富文本编辑器示例
  + hello uni-app 在支付宝/百度/字节跳动小程序平台，开启[自定义组件模式](https://ask.dcloud.net.cn/article/35843)
* 【5+App插件】
  + 新增 Webview窗口标题栏（titleNView）支持获取输入搜索内容功能（getTitleNViewSearchInputText） [文档](https://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewObject.getTitleNViewSearchInputText)
  + 新增 Webview窗口标题栏（titleNView）支持监听搜索输入框焦点变化事件（titleNViewSearchInputFocusChanged） [文档](https://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewEvent)
  + Android平台 修复 Webview窗口未设置标题栏（titleNView）时可能出现显示错误的Bug
  + Android平台 修复 数据库多次执行事务（plus.sqlite.transaction）可能不成功的Bug
  + Android平台 修复 蓝牙（Bluetooth）搜索设备返回的advertisData数据丢失前连个字节的Bug [详情](https://ask.dcloud.net.cn/question/70486)
  + Android平台 修复 部分设备上开启全面屏手势的情况下获取屏幕高度（plus.screen.resolutionHeight）不正确的Bug [详情](https://ask.dcloud.net.cn/question/71725)
  + Android平台 修复 网络请求（plus.net.XMLHttpRequest）没有共享cookie的Bug [详情](https://ask.dcloud.net.cn/question/71287)
  + Android平台 修复 视频控件（VideoPlayer）切换视频可能出现无法播放的Bug
  + Android平台 修复 视频控件（VideoPlayer）播放部分rtmp协议视频可能出现没有声音的Bug [详情](https://ask.dcloud.net.cn/question/69609)
  + Android平台 修复 uni-app应用设置窗口背景透明不生效的Bug [详情](https://ask.dcloud.net.cn/question/70793)
  + Android平台 修复 调用摄像头（Camera）录像完成后点击播放可能触发错误回调的Bug [详情](https://ask.dcloud.net.cn/question/71210)
  + iOS平台 修复 提交苹果应用市场（AppStore）审核提示违反Guideline2.5.2的Bug [详情](https://ask.dcloud.net.cn/question/70813)
  + iOS平台 修复 音频播放（AudioPlayer）后台播放网络音乐时控制页面（iOS锁屏控制页）进度显示不准确的Bug [详情](https://ask.dcloud.net.cn/question/71891)
  + iOS平台 修复 日期选择对话框（plus.nativeUI.pickDate）返回日期可能不准确的Bug [详情](https://ask.dcloud.net.cn/question/71886)
  + iOS平台 修复 Webview窗口移除原生控件（plus.nativeObj.View）不生效的Bug
  + iOS平台 修复 Webview窗口获取样式（getStyle）返回的json对象键名称全部为小写的Bug

#### 1.9.9.20190522
* 【重要】 App平台 nvue中可使用所有plus API，大幅改进weex API能力不足的问题（限自定义组件模式）
* App平台 修复 在 onLaunch 或首页的 onLoad/onReady 等生命周期内路由跳转失败的Bug [详情](https://ask.dcloud.net.cn/question/71248)
* App平台 修复 uni.previewImage 不传 current 参数可能导致运行报错的Bug
* App平台 修复 onTabItemTap 触发时机，修改为每次点击切换均触发（原来的逻辑是首次切换不触发）

#### 1.9.8.20190518
* 修复 1.9.7引入的 @-moz-keyframes @-ms-keyframes @-o-keyframes 编译报错 [详情](https://ask.dcloud.net.cn/question/71173) 。另注意手机端不应该添加-moz、-ms、-o等前缀语法

#### 1.9.7.20190517
* 修复 使用预编译语言部分情况下条件编译无效的Bug [详情](https://ask.dcloud.net.cn/question/70065)
* uni.previewImage 支持传入图片的索引值 [详情](https://uniapp.dcloud.io/api/media/image?id=previewimage)
* 微信平台 兼容微信开发者工具-开发版(Nightly Build)
* App平台 新增 图片预览支持长按显示操作菜单 [详情](https://uniapp.dcloud.io/api/media/image?id=unipreviewimageobject)
* App平台 修复 uni.scanCode 从相册选择二维码，成功回调中 scanType 为空的 bug [详情](https://ask.dcloud.net.cn/question/70461)
* App平台 修复 设置剪切板内容后弹出的toast图标错误的Bug
* App平台 修复 各种waiting、toast样式不统一的Bug
* App平台 修复 自定义组件模式下，map 对象 translateMarker 方法无效及animationEnd不回调的Bug [详情](https://ask.dcloud.net.cn/question/70333)
* App平台 修复 地图缩放时 getScale 返回结果不准确的Bug [详情](https://ask.dcloud.net.cn/question/70148)
* App平台 修复 onNavigationBarSearchInputClicked 在 .nvue 上没有响应的Bug [详情](https://ask.dcloud.net.cn/question/70137)
* App平台 修复 获取蓝牙设备信息中 advertisData 值不正确的bug [详情](https://ask.dcloud.net.cn/question/70486)
* App平台 优化 picker、picker-view 组件滚动停止过慢的问题
* App平台（Android）修复 uni.showModal 点击返回不触发取消回调的Bug [详情](https://ask.dcloud.net.cn/question/70327)
* App平台（iOS）优化 因内存问题导致wkwebview页面白屏时，支持自动恢复页面数据
* App平台（iOS）修复 在 iOS 8.x/9.x 低版本系统上，启动白屏的Bug
* App平台（iOS）修复 下拉刷新在特殊场景下拉失效的Bug [详情](https://ask.dcloud.net.cn/question/69185)
* App平台（iOS）修复 自定义组件模式下，地图初始化时设置经纬度属性未立即生效的Bug
* App平台（iOS）修复 自定义组件模式下，同一页面多个 input 框点击时光标乱跳的Bug [详情](https://ask.dcloud.net.cn/question/69557)
* App平台（iOS 12.2）修复 input 组件自动聚焦失败的Bug
* App平台（iOS 12.2）修复 多 input 组件页面，切换焦点时，导致页面抖动的Bug
* H5平台 新增 map 组件 支持开发者配置自己申请的腾讯地图秘钥（key），解决因共用秘钥对应配额耗尽导致定位失败的Bug [详情](https://uniapp.dcloud.io/collocation/manifest?id=h5sdkconfig)
* H5平台 修复 canvas 不支持设置渐变色的Bug [详情](https://github.com/dcloudio/uni-app/issues/371)
* H5平台 修复 map 组件 @tap 不触发的Bug [详情](https://ask.dcloud.net.cn/question/63988)
* H5平台（iOS特定版本） 修复 标签的 data-* 属性值在事件中获取失败的Bug [详情](https://ask.dcloud.net.cn/question/70246)
* H5平台 修复 canvas 属性 更新width height无效的Bug [详情](https://ask.dcloud.net.cn/question/69804)
* H5平台 修复 canvasToTempFilePath API 生成宽高不准确bug
* 支付宝小程序 修复 当值为0或false等值时，uni.getStorage 读取结果不正确的Bug [#337](https://github.com/dcloudio/uni-app/issues/271)
* 支付宝小程序 修复 支付接口调用报错的Bug [详情](https://ask.dcloud.net.cn/question/69972)
* uni-ui 新增 uniIndexedList 索引列表组件 [详情](https://ext.dcloud.net.cn/plugin?id=375)
* hello uni-app 新增 radio, checkbox, switch, slider 修改颜色、大小示例
* hello uni-app 优化 chat聊天模板，input输入框在iOS上取消软键盘顶部的完成横条
* hello uni-app 新增 指纹示例
* hello uni-app 新增 SQLite 示例

#### 1.9.4.20190426
* 修复 特定场景执行发行导致文件体积增大的问题 [详情](https://ask.dcloud.net.cn/question/69568)
* App平台 新增 video 组件 支持 direction 属性，可控制视频全屏方向 [详情](https://uniapp.dcloud.io/component/video)
* App平台 修复 input 组件 设置 type 属性为 idcard 时，无法输入字母 `X` 的bug
* App平台（iOS） 修复 调用 $getAppMap 异常的bug
* App平台（iOS） 修复 uni.showToast() 设置 position 属性后，title 属性失效的bug [详情](https://ask.dcloud.net.cn/question/69481)
* App平台（Android） 修复 uni.removeStorage 在 nvue 下使用报错的 bug [详情](https://ask.dcloud.net.cn/question/69595)
* H5平台 修复 非 uni-app 的 canvas 组件默认高清导致历史代码兼容问题 [详情](https://ask.dcloud.net.cn/question/69432)
* H5平台 修复 picker 组件 range-key 属性不生效的bug [详情](https://ask.dcloud.net.cn/question/69423)
* H5平台 修复 picker 组件 value 属性为空时，@change 事件返回信息不完整的bug [详情](https://ask.dcloud.net.cn/question/69358)
* H5平台 修复 canvasToTempFilePath API，fileType参数兼容jpg/jpeg格式 [详情](https://ask.dcloud.net.cn/question/65036)
* uni-ui 修复 popup 组件在页面内容超出一屏后，弹出层不居中的bug [详情](https://ask.dcloud.net.cn/question/69494)
* hello uni-app 优化 从列表到详情示例的上拉体验


#### 1.9.3.20190422
  * 新增 自定义组件模式下 组件支持通过 extends mixins 继承 props [详情](https://ask.dcloud.net.cn/question/69051)
  * 新增 template模板模式下 TypeScript工程支持使用装饰符 @Component
  * App平台 自定义组件模式 新增 获取原生地图对象的方法 MapContext.$getAppMap() [详情](https://uniapp.dcloud.io/api/location/map?id=createmapcontext)
  * App平台 自定义组件模式 修复 在 iOS8 版本启动失败的 bug
  * App平台 自定义组件模式 修复 未启用 tabBar 的项目调用 reLaunch 导致 App 退出的问题 [详情](https://ask.dcloud.net.cn/question/68841)
  * H5平台 优化 canvas 组件支持高清显示 [详情](https://ask.dcloud.net.cn/question/69001)
  * H5平台 修复 HBuilderX 1.9.2 alpha 版中运行到浏览器白屏的问题
  * H5平台 修复 运行至部分低版本浏览器白屏的问题 [详情](https://ask.dcloud.net.cn/question/69189)
  * H5平台 修复 部分浏览器环境下调用 uni.chooseImage() 导致页面滚动的问题 [详情](https://ask.dcloud.net.cn/question/68335)
  * H5平台 修复 页面后退至 tabBar 页面时丢失滚动位置的问题 [详情](https://ask.dcloud.net.cn/question/68427)
  * H5平台 修复 页面后退时 scroll-view 滚动位置不正确的问题 [详情](https://ask.dcloud.net.cn/question/68427)
  * H5平台 修复 特定内置组件样式会影响到部分外部元素样式的bug [#282](https://github.com/dcloudio/uni-app/issues/282)
  * H5平台 修复 uni.showModal() 点击空白区域，弹窗会消失的bug [#311](https://github.com/dcloudio/uni-app/issues/311)
  * 微信小程序 修复 swiper scroll-view 等组件绑定事件在 vconsole 中报 JSON 序列化错误的问题 [详情](https://ask.dcloud.net.cn/question/69277)
  * 支付宝小程序 优化 兼容新的 request 规范 [详情](https://ask.dcloud.net.cn/question/69180)
  * uni-ui 修复 popup 居中弹出（插屏广告）示例在部分手机上样式不正确的问题
  * uni-ui 修复 calendar 日历组件获取高度错误的问题
  * uni-ui 优化 notice-bar 等组件设置节点 id 的实现
  * hello uni-app 新增 request 示例添加 Promise 方式的使用
  * hello uni-app 优化 分享示例，分享类型和对应支持的分享渠道关联（如选择图文分享时，QQ分享渠道自动变为可不用状态）
  * hello uni-app 优化 echarts 示例的传值方式，解决百度小程序不显示的问题

#### 1.9.2.20190417
* App平台 新增 自定义组件模式下输出日志时显示正确的行号
* H5平台 修复 API 返回的 Promise 对象不正确的问题 [详情](https://ask.dcloud.net.cn/question/68867)

#### 1.9.1.20190415
* 修复 调用 uni 方法返回的 Promise 对象不正确的问题 [#295](https://github.com/dcloudio/uni-app/issues/295)
* App端 新增 自定义组件模式下支持 loadFontFace 方法动态加载字体 [详情](https://uniapp.dcloud.io/api/ui/font?id=loadfontface)

#### 1.9.0.20190412
* 【重要】App平台 升级为新版编译器（自定义组件模式），提升App启动速度、减少js阻塞、提升组件性能、支持过滤器等更多vue语法 [详情](https://ask.dcloud.net.cn/article/35818)
* 【重要】插件市场支持付费原生插件，欢迎插件作者们踊跃提交原生插件。示例[https://ext.dcloud.net.cn/plugin?id=135](https://ext.dcloud.net.cn/plugin?id=135)
* 新增 自定义组件模式下，支持在 `v-for` 中使用 `v-model`、`v-bind` 指令的 `sync` 修饰符
* 新增 uni.showActiveSheet() 支持 `titile` 属性，仅 App/H5 平台生效
* 修复 自定义组件模式下，支持直接修改 `v-on` 事件绑定传入的响应式数据参数 [详情](https://ask.dcloud.net.cn/question/67921)
* 修复 uni.connectSocket() 返回的 SocketTask 不正确的bug
* App平台 新增 网络请求支持在 `header` 头信息中设置 `Cookie` 关键字为 `key` [详情](https://ask.dcloud.net.cn/question/68260)
* App平台 新增 uni.showToast() 支持 `position` 属性，可以显示纯文本轻提示
* App平台 修复 uni.canvasPutImageData() 执行报错的bug，[详情](https://ask.dcloud.net.cn/question/66334)
* App平台 修复 清除本地缓存后 nvue 页面报 launch webview id is not ready 错误的问题 [详情](https://ask.dcloud.net.cn/question/64961)
* App平台（Android） 修复 部分低版本 Android 手机执行 `uni.reLaunch()` 报错的问题 [详情](https://ask.dcloud.net.cn/question/67888)
* App平台 修复 navigator 组件默认动画不生效的bug
* App平台 修复 `自定义组件模式`下调用 uni.connectSocket() 报错的问题 [详情](https://ask.dcloud.net.cn/question/68362)
* App平台 修复 `自定义组件模式`下扫码功能非首次打开时报错的问题 [详情](https://ask.dcloud.net.cn/question/68550)
* H5平台 修复 uni.reLaunch() 后 getCurrentPages() 获取不正确的bug [详情](https://ask.dcloud.net.cn/question/68134)
* H5平台 修复 canvas 接口无法获取坐标的问题 [详情](https://ask.dcloud.net.cn/question/67791)
* H5平台 修复 image 组件加载无协议的网络图片资源无效的问题
* 微信小程序 新增 `自定义组件模式`下支持 `v-text` 指令
* 微信小程序 新增 支持在根目录下添加 `ext.json` 及 `sitemap.json` [详情](https://github.com/dcloudio/uni-app/issues/223)
* 微信小程序 修复 text 组件内文字不能换行以及不显示空格的问题 [详情](https://ask.dcloud.net.cn/question/67894)
* uni-ui 新增 轮播图指示点（uni-swiper-dot）组件 [详情](https://ext.dcloud.net.cn/plugin?id=284)
* uni-ui 修复 部分组件在支付宝小程序中垂直居中不生效的bug
* hello uni-app 修复 部分页面在支付宝小程序中垂直居中不生效的bug
* hello uni-app 新增 列表到详情模板兼容支付宝小程序
* hello uni-app 新增 u-link 组件，方便在各平台使用超链接
* hello uni-app 新增 在 uni-app 中使用第三方微信小程序组件（vant ui）的示例
* hello uni-app 强化`通过scheme打开三方app示例`，直接打开应用商店指定应用方便评分、直接打开QQ联系人聊天、地图指定位置导航、打开淘宝指定页面。
  
#### 1.8.2.20190401
* 新增 微信小程序启用`自定义组件模式`时，支持v-text指令

#### 1.8.1.20190330
* 微信小程序 修复 text 组件内文字不能换行以及不显示空格的问题 [详情](https://ask.dcloud.net.cn/question/67894)
* App平台（Android） 修复 部分低版本 Android 手机执行 uni.reLaunch() 报错的问题 [详情](https://ask.dcloud.net.cn/question/67888)
  
#### 1.8.0.20190330
* 【重要】架构全新重写，大幅提升微信小程序端的性能体验，并增加若干 Vue 语法支持。[详情](https://ask.dcloud.net.cn/article/35699)
* 【重要】App平台 新增 UniPush推送服务，统一手机厂商（苹果、华为、小米、OPPO、魅族）和三方推送（个推）通道，提升推送消息送达率。[详情](https://ask.dcloud.net.cn/article/35622)
* App平台 优化数据通讯机制，修复滚动监听延迟的问题
* App平台 修复 特定场景页面转场无动画或动画配置不生效的问题
* App平台 修复 多 tabbar 显示时，非最新 tabbar 页面不触发 onUnload 生命周期的问题 [详情](https://ask.dcloud.net.cn/question/67024)
* App平台 修复 iOS 端 web-view 组件内页面样式不正确的bug
* App平台 修复 CanvasContext.draw 使用本地相同图片多次绘制，特定情况绘制失败的问题
* H5平台 新增 SelectorQuery 对象支持 in 方法
* H5平台 新增 uni.getImageInfo 返回 path 属性
* H5平台 新增 CanvasContext 增加部分属性支持 [详情](https://uniapp.dcloud.io/api/canvas/CanvasContext)
* H5平台 修复 CanvasContext 调用 path 相关API报错的问题
* H5平台 修复 onNavigationBarSearchInputChanged 钩子函数获取到的数据不正确的bug
* H5平台 修复 textarea 组件自动计算高度不正确的问题
* 【重要】hello uni-app 改版，底部选项卡拆分为四个（内置组件、接口、扩展组件uni-ui、模板）
* hello uni-app 新增 蓝牙示例
* hello uni-app 新增 cover-view 示例
* hello uni-app 更新 toast示例，App 端补充底部 toast 示例
* hello uni-app 修复 grid 组件元素未满一行样式不正确的bug
* hello uni-app 修复 grid 组件 click 事件返回值不正确的bug
* hello uni-app 修复 部分设备录音无法播放的bug
* hello uni-app 修复 手势示例 key 冲突的bug
* hello uni-app 修复 im 示例 message 属性类型错误的bug
* hello uni-app 修复 uParse 在部分场景下，显示异常的bug

#### 1.7.0.20190314
* 【重要】支持App资源在线热更新 [详情](https://ask.dcloud.net.cn/article/35667)
* 修复 uni.webview.js 在字节跳动小程序真机环境无效的问题 [v1.5.0](https://js.cdn.aliyun.dcloud.net.cn/dev/uni-app/uni.webview.1.5.0.js)
* 修复 rich-text 组件 ins 标签嵌套在 span 标签中无法渲染的问题 [详情](https://ask.dcloud.net.cn/question/65382)
* 修复 uni.getProvider 获取 push 服务供应商的信息始终为 igexin 的bug
* 【重要】App平台 新增 转场动画配置，详见[pages.json](https://uniapp.dcloud.io/collocation/pages?id=app-plus)、[navigator](https://uniapp.dcloud.io/component/navigator)、[uni.navigateTo](https://uniapp.dcloud.io/api/router?id=navigateto)
* App平台 修复 设置 web-view 组件的 webview-styles 属性在部分设备上报错的问题 [详情](https://ask.dcloud.net.cn/question/66498)
* App平台 修复 查看位置界面，点击去这里按钮，启动百度地图导航时，目的地坐标偏移的问题
* App平台 优化 扫码界面调整为全屏显示
* App平台（iOS） 修复 在特定情况下获取系统信息报错的bug
* App平台（iOS） 修复 QQ 分享无法选择图文类型的问题
* H5平台 新增 titleNView 支持 searchInput 配置 [详情](https://uniapp.dcloud.io/collocation/pages?id=h5-searchinput)
* H5平台 新增 titleNView -> buttons 支持配置 background、badgeText、redDot、select、width [详情](https://uniapp.dcloud.io/collocation/pages?id=h5-titlenview-buttons)
* H5平台 优化 页面对象增加 $mp 属性兼容 mpvue 用法 [#227](https://github.com/dcloudio/uni-app/issues/227)
* H5平台 修复 条件编译中的 CSS 在运行/生产环境下编译结果不一致的bug [#188](https://github.com/dcloudio/uni-app/issues/188)
* H5平台 修复 navigator 组件 navigatorBack 限制了 url 参数的问题 [#195](https://github.com/dcloudio/uni-app/issues/195)
* H5平台 修复 首页导航栏配置左侧按钮无效的问题 [详情](https://ask.dcloud.net.cn/question/65994)
* H5平台 修复 低版本 safari 浏览器下调用 uni.chooseImage/uni.chooseVideo 方法无效的问题 [详情](https://ask.dcloud.net.cn/question/66000)
* H5平台 修复 input 组件半透明时背景显示异常的问题
* H5平台 修复 修改 input 组件的 maxlength 属性时报错的问题
* H5平台 修复 picker 组件关闭时内部状态未重置的问题 [#192](https://github.com/dcloudio/uni-app/issues/192)
* H5平台 修复 picker-view 组件 change 事件返回值错误的问题 [#193](https://github.com/dcloudio/uni-app/issues/193)
* H5平台 修复 uni.request 在无参数的GET请求时，地址拼接中冗余一个 ？的问题
* H5平台 修复 使用透明渐变导航栏导致页面高度不准确的问题
* H5平台 修复 tabbar 组件在 iPhoneX 上超出底部安全区的问题
* H5平台 修复 cover-view、cover-image 无法监听点击事件的问题 [详情](https://ask.dcloud.net.cn/question/66416)
* H5平台 修复 swiper 组件动态设置 current-item-id 不生效的问题 [详情](https://ask.dcloud.net.cn/question/66491)
* H5平台 修复 uni.chooseVideo 返回结果中部分信息不准确的问题
* H5平台 修复 uni.getSystemInfoSync 接口返回的 statusBarHeight 属性拼写与其他平台不同的问题
* H5平台 修复 image 组件部分情况下加载 base64 资源失败的问题
* 支付宝小程序 修复 uni.canvasToTempFilePath 未能正确返回 tempFilePath 值的问题
* 支付宝小程序 修复 uni.setScreenBrightness/uni.getScreenBrightness 传入参数与返回结果参数不正确的问题
* uni-ui 新增 左滑操作菜单插件 [详情](https://ext.dcloud.net.cn/plugin?id=181)
* hello uni-app 新增 SwipeAction（滑动操作）扩展组件
* hello uni-app 新增 Calendar（日历）扩展组件
* hello uni-app 新增 Pagination(分页器) 扩展组件
* hello uni-app 新增 NoticeBar(通告栏) 扩展组件
* hello uni-app 新增 屏幕亮度 API 示例 
* hello uni-app 新增 保存媒体到本地 API 示例 
* hello uni-app 新增 震动 API 示例 
* hello uni-app 新增 打开系统浏览器或三方App示例
* hello uni-app 新增 设置 tabBar 示例
* hello uni-app 新增 获取节点信息示例
* hello uni-app 新增 获取节点布局交互状态示例
* hello uni-app 修复 number-box 组件按钮禁用状态显示不正确的问题
* hello uni-app 新增 App端自定义转场动画示例
* hello uni-app 新增 H5端导航栏带搜索框示例
* hello uni-app 新增 H5端导航栏带城市选择示例
* hello uni-app 新增 H5端导航栏带红点和角标示例
* hello uni-app 新增 iOS端隐藏软键盘上的导航条示例


#### 1.6.2.20190220
* 【重要】新增 uni-app 支持发行到字节跳动小程序 [详情](https://ask.dcloud.net.cn/article/35563)
* 新增 窗口大小变化监听接口 uni.onWindowResize、uni.offWindowResize [详情](https://uniapp.dcloud.io/api/ui/window?id=onwindowresize)
* 修复 upx 负数转换和正数不一致的问题 [#180](https://github.com/dcloudio/uni-app/issues/180)
* 新增 uni.webview.js 支持字节跳动小程序 [v1.4.9](https://js.cdn.aliyun.dcloud.net.cn/dev/uni-app/uni.webview.1.4.9.js)
* App平台 新增 picker 组件支持多列选择器（mode: multiSelector）
* App平台 新增 manifest的启动图配置增加白屏时不关闭splash启动图 [详情](https://ask.dcloud.net.cn/article/35565)
* App平台 修复 uni.notifyBLECharacteristicValueChange 方法调用无效的bug
* App平台 修复 uni.getSystemInfo/uni.getSystemInfoSync 接口返回部分参数不准确的bug
* App平台 修复 上传和下载接口服务端返回状态码不为200时判断为失败的问题
* App平台 修复 uni.uploadFile 接口上传文件到阿里云oss失败的兼容问题
* App平台 修复 uni.setTabBarItem 接口未设置图标参数时报错的bug
* App平台 优化 iOS 平台支持配置底部安全区占位 [详情](https://ask.dcloud.net.cn/article/35564)
* H5平台 修复 map 组件 controls 点击无效的bug
* H5平台 修复 input 组件 placeholder 位置不正确的bug
* H5平台 修复 input 组件文字颜色无法通过动态修改 class 来调整的bug
* H5平台 修复 movable-view 组件动态设置显示/隐藏后，组件状态异常的bug [#163](https://github.com/dcloudio/uni-app/issues/163)
* H5平台 修复 image 组件 mode=widthFix 不生效的bug
* H5平台 修复 上传文件路径为 base64 时文件没有扩展名的问题
* hello uni-app 新增 添加联系人信息示例
* hello uni-app 新增 picker 组件在 App 平台支持多列选择器
* hello uni-app 新增 悬浮按钮（fab button）扩展组件
* hello uni-app 新增 导航栏带搜索框的示例


#### 1.5.4.20190127
* 修复 错误过滤css属性选择器通配符（*），注意：非属性选择器中依然不支持通配符（*）
* 修复 未检测到微信开发者工具时，特殊情况编译卡死的bug
* 优化 微信小程序在特定场景数据渲染慢的问题


#### 1.5.2.20190121
* 修复 编译至 app 时触发 babel 500kb 限制
* 修复 文本节点未移除前后空格及换行符
* 修复 scss,less,stylus等文件引用的 css 文件中条件编译不生效
* 修复 vue 文件 template 节点为空时编译器报错
* 优化 自动移除 css 文件中的多余分号
* 优化 自动移除 css 文件中的 * 通配符选择器 

#### 1.5.1.20190120
* 修复 components 目录引用组件查找失败的问题
* 修复 @import 引用 css 文件查找失败的问题
* 修复 组件嵌套 slot 导致的事件冲突问题
* 优化 发行至小程序的包体积

#### 1.5.0.20190119
* 【重要】变更 为加快调试速度，运行到微信小程序时取消代码压缩。正式发布，需点击发行菜单操作
* 优化 首页未渲染时不关闭splash，避免白屏（手动设置延迟关闭splash不再生效）
* 优化 减小编译器体积，精简依赖文件
* 新增 支持字体及背景图片使用本地资源（编译器自动将其编译为base64方式，要求大小在40k以内）
* 新增 新闻/资讯App模板，已上传[插件市场](https://ext.dcloud.net.cn/plugin?id=103)
* 新增 底部tab带加号的模板，已上传[插件市场](https://ext.dcloud.net.cn/plugin?id=98)
* 新增 一批跨各家小程序的API，如小程序间互跳、收货地址、发票抬头等，[详情](https://uniapp.dcloud.io/api/README)
* 新增 less/scss/stylus/ts 等预编译语言支持条件编译 [详情](https://uniapp.dcloud.io/platform?id=%E6%A0%B7%E5%BC%8F%E7%9A%84%E6%9D%A1%E4%BB%B6%E7%BC%96%E8%AF%91)
* 新增 typescript 在vue里内联使用
* 新增 支持通过 process.env.NODE_ENV 进行运行环境判断，并提供快捷代码块uEnvDev、uEnvProd，[详情](https://uniapp.dcloud.io/frame?id=运行环境判断)
* 修复 uni-app 项目上层目录中含有 node_modules 目录时，模块依赖查找错误，导致运行到 H5 平台时页面白屏的bug
* App平台 新增 TabBar 相关 API：setTabBarItem、setTabBarStyle、hideTabBar、showTabBar
* App平台 修复 TabBar 在 iOS 平台左上角多显示一个小点的问题
* App平台 修复 rich-text 组件无法解析部分富文本信息的问题
* App平台 修复 map 组件动态改变 polyline 属性不生效的问题
* App平台 修复 下拉刷新后页面点击事件第一次触发不正确的问题
* H5平台 新增 组件：cover-view、cover-image
* H5平台 优化 image 组件支持浏览器中的长按识别
* H5平台 优化 reLaunch 及 redirectTo 实现，和其他端保持一致
* H5平台 优化 TabBar 的 badge 位置与小程序表现一致
* H5平台 优化 TabBar 的 icon 大小与 APP 端表现一致
* H5平台 修复 选择文件后导致页面滚动的问题
* H5平台 修复 页面 onUnload 不触发的 bug
* H5平台 修复 选择节点时不包含当前页面节点的问题
* H5平台 修复 节点操作 API 在 created 生命周期内调用报错的问题。
* H5平台 修复 点击事件缺少的信息的问题
* H5平台 修复 部分组件不能使用 hidden 属性控制显示状态的问题
* H5平台 修复 uni.pageScrollTo 在微信内置浏览器无效的问题
* H5平台 解决 swiper 组件设置 skipHiddenItemLayout 属性报错的问题
* H5平台 修复 swiper 组件动态修改内容后自动播放停止的问题
* H5平台 修复 swiper 组件同时显示多个 swiper-item 时指示器显示不正确的问题
* H5平台 修复 swiper 组件上拖动导致父组件表现异常的问题
* H5平台 修复 text 组件 selectable 属性无效的问题
* H5平台 修复 map 组件 markertap 事件不触发的问题
* H5平台 修复 map 组件 callout 点击事件不触发的问题
* H5平台 修复 picker 组件 start 和 end 值不合法时表现异常的问题
* H5平台 修复 picker 组件和 actionSheet 组件未使用时在 Safari 内可见的问题
* H5平台 修复 web-view 组件 src 属性动态修改不生效的问题
* H5平台 新增 video 组件开放 TBS 同层播放器相关配置
* H5平台 修复 部分场景获取安卓手机型号出错的问题 [#134](https://github.com/dcloudio/uni-app/issues/134)
* hello uni-app 百度小程序版已上架，[详情](https://m3w.cn/uniapp)
* hello uni-app 新增 导航栏显示图片的示例
* hello uni-app 新增 导航栏带红点和角标的示例
* hello uni-app 新增 导航栏带城市选择的示例
* hello uni-app 优化 顶部可拖动选项卡（原生）支持配置是否可拖动
* hello uni-app 优化 H5 平台模板文件更名为 template.h5.html，避免文件名引发的误解
* hello uni-app 更新 city.data.js，使用最新的城市区县数据

#### 1.4.1.20181228
* 修复 CSS中条件编译导致运行至App和微信小程序失败的bug

#### 1.4.0.20181227
* 【重要】新增 uni-app添加支付宝和百度小程序运行 [详情](https://ask.dcloud.net.cn/article/35393)
* 【重要】新增 uni-app插件市场，支持前端组件、js sdk、页面模板、项目模板、原生插件等多种类型 [https://ext.dcloud.net.cn](https://ext.dcloud.net.cn)
* 【重要】新增 uni-app支持原生插件云打包
* 新增 条件编译 static 支持平台目录，不同平台可定义自己的独有静态文件 [详情](https://uniapp.dcloud.io/frame?id=%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84)
* 新增 条件编译 支持多平台“或”运算符：||。例如： // #ifdef MP-WEIXIN || MP-BAIDU 代表在微信小程序和百度小程序均生效
* 新增 条件编译 pages.json 支持条件编译。pages.json里不引用的页面不会打包，可以更自由的管理不同平台文件的打包策略。
* 修复 条件编译 使用 ifndef 导致编译错误的问题
* 新增 manifest.json 中（mp-weixin 节点下） 新增 permission 配置，用于微信小程序接口权限相关设置
* 新增 蓝牙相关API [文档](https://uniapp.dcloud.io/api/system/bluetooth)
* 新增 低功耗蓝牙相关API [文档](https://uniapp.dcloud.io/api/system/ble)
* 新增 iBeacon相关API [文档](https://uniapp.dcloud.io/api/system/ibeacon)
* 优化 css 编译报错提示
* 修复 v-for item 部分写法编译失败的问题
* H5平台 新增 canvas 组件和相关 API
* H5平台 优化 导航栏自定义按钮支持 float 属性
* H5平台 修复 uni.showModal 内容过多显示超出屏幕的问题
* H5平台 修复 picker 组件未设置 value 属性值时报错的问题
* H5平台 修复 TabBar 页面 onHide 钩子函数不触发的问题
* H5平台 修复 map 组件中 marker 图像不显示的问题
* H5平台 修复 AudioContext 事件监听报错的问题
* H5平台 修复 swiper 组件动态设置 current 后 swiper 不切换的问题
* H5平台 修复 swiper 组件设置属性 previous-margin、next-margin 显示异常的问题
* H5平台 修复 picker 组件显示的选中项不正确的问题 [#103](https://github.com/dcloudio/uni-app/issues/103)
* H5平台 修复 picker 组件动态设置高度后显示异常的问题
* H5平台 修复 radio 组件设置 color 属性不生效的问题 [#119](https://github.com/dcloudio/uni-app/issues/119)
* H5平台 修复 picker 组件 columnchange 事件不触发的问题
* hello uni-app 优化 radio-group 组件的切换逻辑，兼容支付宝/百度小程序
* hello uni-app 优化 echarts 示例，兼容H5
* hello uni-app 修复 自定义懒加载占位图位置不正确的问题
* hello uni-app 优化 H5平台放开手势识别、图标裁剪等与 canvas 有关的示例


#### 1.3.1.20181211
* 优化 编译时提供更明确的错误提示
* 优化 支持在 main.js 引入 css 模块
* 修复 onReady 触发两次的问题
* 修复 number 类型的 input 组件设置 maxlength 无效的bug
* 修复 number 类型的 input 组件输入无效数值导致 placeholder 和数字重叠的bug
* App平台 优化 web-view 组件支持自定义进度条 progress
* App平台 优化 titleNView配置支持左右内边距（padding/padding-left/padding-right）和按钮的宽度（width）
* App平台 修复 video 组件静音属性不生效的问题
* App平台 修复 date 类型的 picker 组件未设置开始结束时间在部分设备不能选择日期的问题
* App平台 修复 TabBar 组件图像和文本均未设置的情况下报错的问题
* App平台 修复 引入小程序组件时获取当前 Webview 对象失败的问题
* App平台 修复 nvue 中 uni.getStorage 某些情况无法获取数据的问题
* App平台 修复 nvue 中 uni.setStorage 导致 iOS 设备崩溃的问题
* App平台 修复 在线打包过的应用某些情况下运行到真机报错的问题
* iOS平台 修复 canvas 组件保存到文件时绘制的图像不显示的问题
* iOS平台 修复 uni.request 方法 GET 请求无法使用 data 传参的问题
* H5平台 新增 组件 movable-area、movable-view、web-view
* H5平台 优化 文件上传时保留原始文件名
* H5平台 优化 input 和 textarea 组件在 iOS 设备上禁用状态颜色不一致的情况
* H5平台 修复 swiper 组件未包含子组件时显示异常的问题
* H5平台 修复 picker 组件可选择错误的日期的问题 [#89](https://github.com/dcloudio/uni-app/issues/89)
* H5平台 修复 uni.request GET 类型请求的 url 拼接不规范导致部分服务器无法识别参数的问题
* H5平台 修复 WebSocket 事件监听报错的bug

#### 1.2.1.20181126
* 修复 真机运行到不支持viewport-fit=cover属性的设备上时，控制台出现相关警告的问题

#### 1.2.0.20181122
* 【重要】uni-app 支持发布到H5平台 注意事项参考[ask.dcloud.net.cn/article/35232](https://ask.dcloud.net.cn/article/35232)
* uni-app框架开源，欢迎大家star鼓励，[github地址](https://github.com/dcloudio/uni-app)
* uni-app支持通过vue-cli脚手架创建项目模板并运行到H5平台
* 新增 条件编译 #ifndef 代表非此平台的条件编译（如<!-- #ifndef H5 -->代表非H5平台，也就是uni-app目前支持的App及小程序平台）
* 新增 API tabBar支持设置红点和角标 参考[uni-app规范](https://uniapp.dcloud.io/api/ui/tabbar)
* 新增 API 监听网络状态变化，参考[uni-app规范](https://uniapp.dcloud.io/api/system/network?id=onnetworkstatuschange)
* 新增 button 组件的 open-type 属性支持 feedback 值域，参考[uni-app规范](https://uniapp.dcloud.io/component/button)
* 新增 manifest.json 配置 navigateToMiniProgramAppIdList 节点，可配置需需跳转的小程序列表
* 优化 web-view 组件 增加网页加载进度条
* 优化 web-view 组件 标题与页面 title 同步
* 修复 uni.request method 为 PUT、DELETE 时，参数信息丢失的问题
* 修复 picker 组件 cancel 事件不触发的问题
* 修复 复杂场景下组件数据渲染异常的问题
* 修复 uni.canvasToTempFilePath 方法设置参数destWidth、destHeight不生效的问题
* 优化 input 组件 type="number" 在 App 端支持输入小数点
* 新增 nvue 支持第三方weex ui库，参考[uni-app规范](https://uniapp.dcloud.io/use-weex?id=nvue-中使用-weex-第三方库)
* 新增 nvue 支持 bindingx
* 新增 nvue 支持顶部原生导航的 onNavigationBarButtonTap 事件
* 修复 nvue 初始化时得不到 storage 的问题
* 修复 nvue Android平台 不支持 Websocket 功能的问题
* 修复 nvue Android平台 页面未设置 titleNView 时可能显示不正常的问题
* 修复 nvue iOS平台 弹出软键盘后收回区域可能不对的问题
* 修复 nvue iOS平台使用 uni.request 不能设置data的问题
* 优化 hello uni-app web-view页面 增加和其它页面进行传参及跳转
* 优化 hello uni-app 示例，样式更统一，uni.css有较大升级，老项目升级时需注意测试


#### 1.1.0.20181030
* 【重要】uni-app的官方视频教程发布了！ [参考](https://ke.qq.com/course/343370)
* 【重要】新增 web-view组件在App环境支持加载本地html文件，方便引用dom相关库及方便5+项目向uni-app分步迁移。[参考](https://uniapp.dcloud.io/component/web-view)
* 新增 自定义返回逻辑，点击手机back时可先关闭弹出类自定义组件。 [参考](https://ask.dcloud.net.cn/article/35120)
* 新增 cover-view,cover-image 组件（仅支持在 video,map 中使用，暂不支持互相嵌套）。[参考](https://uniapp.dcloud.io/component/cover-view)
* 优化 WebSocket 支持 ArrayBuffer 类型的数据通信
* 优化 uni.showToast 显示文字在 iOS 平台字体过小的问题
* 调整 sourcemap文件的生成目录，微信开发者工具发布小程序时不再提示忽略文件
* 修复 pages.json 调整部分内容时编译不生效的bug
* 修复 uni.saveFile 在Android平台保存文件后返回路径不正确的bug
* 修复 manifest.json文件中networkTimeout节点下 downloadFile、uploadFile 配置项有效值单位不正确的bug
* 修复 map 组件使用 v-show 切换时地图不显示的bug
* 修复 map 组件动态修改 scale 值不生效的bug
* 修复 video 组件的 timeupdate/fullscreenchange 事件回调中，event.detail 参数信息缺失的bug
* 修复 uni.getSystemInfo 在App平台下获取系统语言不正确的bug
* hello uni-app 优化顶部选项卡模板，vue/nvue 复用共同的js逻辑和css样式
* hello uni-app 新增 tag标签 模板
* hello uni-app 新增 web-view组件加载本地html的示例（仅App平台生效）
* hello uni-app 修复 问题反馈 模板 新增图片会覆盖前一张图片的bug
* hello uni-app 新增 倒计时 模板(感谢网友hcoder-深海)
* hello uni-app 新增 插屏弹窗 模板(感谢网友hcoder-深海)
* hello uni-app 新增 表单验证 模板(感谢网友hcoder-深海)


#### 1.0.1.20181012
* 优化 uni.chooseImage 在App平台补齐sizeType参数，可直接压缩图片，不需要使用plus api压缩了
* 修复 video组件 初始化时报错的问题
* 修复 video组件 poster属性不支持本地路径的问题
* 修复 地图API mapContext 的 getRegion,getScale 接口 success/fail 回调不触发的bug
* 修复 地图API uni.chooseLocation 在Android 4.4平台打开地图显示白屏的bug
* 修复 nvue无法在iOS模拟器渲染的问题，Android也仅支持谷歌官方模拟器
* 修复 部分手机桌面启动uni-app，首页偶发渲染白屏的bug
* 修复 canvas API uni.canvasToTempFilePath接口在canvas中含有图像时调用失败的bug
	
#### 1.0.0.20181010
* 【重要】开放 uni-app支持原生sdk集成，离线打包，自由扩展原生能力 [参考](https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/104)
* 【重要】开放 兼容微信小程序 JS SDK，丰富的小程序生态内容可直接引入uni-app并且3端通用 [参考文档及各种小程序SDK资源汇总](https://ask.dcloud.net.cn/article/35070)
* 【重要】开放 兼容微信小程序自定义组件并且3端通用 [参考](https://uniapp.dcloud.io/frame?id=%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%BB%84%E4%BB%B6%E6%94%AF%E6%8C%81)
* 【重要】开放 nvue 原生渲染，引入weex，解决某些场景webview无法高性能实现的问题(如左右拖动的复杂tab列表) 注：暂不支持模拟器 [参考](https://uniapp.dcloud.io/use-weex)
* 【重要】开放 npm 支持 [参考](https://uniapp.dcloud.io/frame?id=npm%E6%94%AF%E6%8C%81)
* 新增 web-view 组件里的网页支持使用uni跳转api跳转到指定路由页面 [参考](https://uniapp.dcloud.io/component/web-view)
* 优化 发行到App平台时，自动完成js业务代码的混淆压缩
* 新增 尺寸单位转换方法 uni.upx2px() [参考规范](https://uniapp.dcloud.io/frame?id=upx2px)
* 修复 slot 内无法使用{{}}插入数据
* 修复 slot 内使用自定义组件数据错乱
* 修复 打开多个相同页面数据错乱，例如商品详情页面A跳转详情页面B
* 调整 unifile:// 文件路径调整为5+识别的plus.io的目录结构，方便plus API继续操作文件
* 修复 uni.login 无法切换登录账户的问题
* 修复 uni.chooseLocation 定位不准的问题
* 优化 pages.json 支持在 app-plus 节点下使用 upx 单位
* 优化 condition 启动二级页面时支持back至首页
* 优化 App平台地图控件从腾讯地图调整为高德原生地图（使用时注意需要向高德申请Appkey）
* 优化 video组件 支持rtmp等非http协议的视频源
* 修复 video组件 设置 duration 属性无效的bug 
* 修复 真机调试时，修改main.js代码，未自动热更新的bug
* hello uni-app 新增 原生nvue左右滑动选项卡示例
* hello uni-app 新增 movable-area示例
* hello uni-app 新增 小程序支付演示
* hello uni-app 新增 自定义导航栏组件支持下拉刷新
* hello uni-app 新增 列表到详情模板中详情页底部增加小程序banner广告演示
* hello uni-app 新增 时间轴timeline 模板示例
* hello uni-app 新增 模板 步骤提示 (感谢网友hcoder-深海)
* hello uni-app 新增 模板 滚动公告 (感谢网友hcoder-深海)
* hello uni-app 新增 模板 评论列表 (感谢网友hcoder-深海)
* hello uni-app 修复 segmented-control 示例退出重进后数据未重置的问题



#### 0.1.50.20180918-alpha
*  优化 下拉刷新配置
*  修复 uploadFile 参数 files 不生效
*  修复 组件内联 style 中使用 background-image 相对路径不生效
*  修复 组件 picker-view 无法正确选中
*  修复 部分历史创建的uni-app项目在iOS平台真机运行报错的bug
*  修复 模板 索引列表在微信小程序平台，滑动右侧索引导致整体界面跟随滑动的bug

#### 0.1.49.20180917
* 【重要】 新增 upx 作为响应式尺寸单位，px 变为传统的物理像素，历史项目升级参考 [教程](https://ask.dcloud.net.cn/article/35014)
* 新增 支持注册全局组件 [文档](https://uniapp.dcloud.io/use?id=%E5%85%A8%E5%B1%80%E7%BB%84%E4%BB%B6)
* 新增 pages.json app-plus 支持pullToRefresh配置 [文档](https://uniapp.dcloud.io/collocation/pages?id=下拉刷新)
* 优化 iOS平台 从UIWebview切换为WKWebview，提升页面图片渲染速度
* 新增 小程序平台 分包预下载（hello uni-app示例为方便分包调整了目录结构）
* 修复 css 变量 var(--status-bar-height) 部分情况不生效 
* 修复 组件嵌套 slot 无法传递 props
* 优化 组件 input 支持focus属性，自动弹出键盘（目前iOS部分版本仍有兼容问题）
* 优化 组件 input 支持confirm-type=search属性，键盘右下角显示为搜索样式
* 优化 组件 swiper 在iOS平台屏幕边缘的滑动体验
* 修复 uni.openLocation无法调用系统导航的问题
* 修复 iOS setNavigationBarColor 改变frontColor时未修改状态栏颜色
* 修复 组件 picker-view value属性不生效的bug
* 修复 页面onLoad事件内立即执行reLaunch不生效的bug
* 优化 back逻辑，优先关闭当前显示的 loading 或 toast，再关闭页面
* hello uni-app 新增 input 示例新增自动弹出键盘、搜索框
* hello uni-app 新增 侧滑导航示例
* hello uni-app 新增 多列选择、联动选择示例（含城市选择）
* hello uni-app 新增 自定义导航栏示例
* hello uni-app 优化 导航栏示例中App原生按钮的写法和样式
* hello uni-app 新增 load more（加载更多）示例
* hello uni-app 新增 segment control（分段选择器）示例
* hello uni-app 新增 indexed-list（索引列表）示例
* hello uni-app 新增 图片懒加载示例
* hello uni-app 新增 手势图片锁屏示例
* hello uni-app 新增 IM chat示例（感谢网友xcecd@qq.com）



#### 0.1.48.20180906-alpha
* 更新 mpvue 相关插件至最新
* 新增 小程序平台 分包加载，参考[pages.json配置说明](https://uniapp.dcloud.io/collocation/pages?id=subpackages)
* 新增 TypeScript 预编译器支持，实现了 <script lang="ts" src="xx.ts"></script> 引用方式的自动识别
* 新增 内置 autoprefixer ，自动处理css兼容性(iOS>=8,Android>=4)，修复iOS8上部分组件变形的问题
* 新增 App平台 二级页面支持单独取消原生导航栏，支持定义导航栏为透明渐变模式
* 新增 组件 picker-view，规范参考[picker-view](https://uniapp.dcloud.io/component/picker-view)
* 修复 uni.switchTab跳转的bug，注意switchTab跳转后会关闭所有非tabbar页面。可用于初始页为欢迎页、登陆页，之后switchTab到业务首页的场景
* 修复 uni.request 未返回 header 的问题
* 修复 组件 textarea 有时无法输入汉字的问题
* 修复 组件 input 数字类型无法输入小数点的问题
* 修复 启动后立即切换tab，可能卡死的问题
* hello uni-app 页面跳转 新增switchTab、reLaunch演示
* hello uni-app 新增 EChart图标示例
* hello uni-app 新增 可拖动九宫格示例
* hello uni-app 新增 自定义导航栏（透明渐变、自定义按钮）示例
* hello uni-app 优化 列表到详情模板 详情页改为透明渐变导航
* hello uni-app 新增 图片、头像剪切示例（感谢网友杨大宝）
* hello uni-app 新增 二维码生成示例（感谢网友诗小柒）
* 更多三方扩展，参考[https://ask.dcloud.net.cn/explore/category-12__is_recommend-1](https://ask.dcloud.net.cn/explore/category-12__is_recommend-1)
* 新增 应用模板：图片浏览App模板
* 新增 应用模板：登录注册模板
* 新增 [mpvue项目（组件）迁移指南、示例及资源汇总](https://ask.dcloud.net.cn/article/34945)


#### 0.1.47.20180823-alpha
* 修复 通过<style lang="less"></style>方式使用less、scss、stylus预编译语言开发，云端打包时编译报错的问题

    
#### 0.1.47.20180821-alpha
* 新增 支持vue里通过<style lang="less"></style>方式使用less、scss、stylus这3种预编译语言。需先在HBuilderX插件安装中安装对应编译插件
* 新增 pages.json 中 globalStyle, style 节点支持分平台配置，可在App侧单独定义titleNView。[参考pages.json说明](https://uniapp.dcloud.io/collocation/pages?id=app-plus)
* 新增 App中监听原生Title的按钮点击事件onNavigationBarButtonTap
* 优化 编译的错误日志提示语
* 补充 启动时指定关闭Splash的延时时间
* 新增 uni.canvasToTempFilePath，可把canvas区域保存为图片
* 支持 iPhone X 安全区域配置（默认：App 包含 tabBar 时，自动启用底部安全区域，背景色为 tabBar 背景色，无 tabBar 时，不启用安全区域。也可在App侧参考5+的manifest规范配置）
* 修复 非首页配置 navigationBarTextStyle 不生效
* 修复 组件 video show-play-center-btn 不生效
* 修复 组件 input 标签属性 value="" 导致运行时显示为 true
* 修复 组件 input 类型为 number 时输入报错
* 修复 组件 input 在 iOS 平台焦点错乱，快速输入异常，删除时光标错乱
* 修复 组件 input 数字类型输入非法字符时 placeholder 不消失
* 修复 组件 map 的 translateMarker 方法不生效
* 修复 uni.navigateBack delta 参数不生效
* 修复 uni.getSystemInfo/uni.getSystemInfoSync 返回 platform 不正确
* 修复 uni.reLaunch 参数丢失
* 修复 onLoad 事件内立刻调用 uni.startPullDownRefresh 不生效
* 修复 App 生命周期 onShow,onHide 在 app 切换到前台、后台不触发的问题
* 新增 新项目模板默认添加 mp-weixin->appid 节点
* hello uni-app：支持app端首页单独设置原生导航栏，并在右上角增加关于介绍按钮
* hello uni-app：新增 接口 媒体 文件示例
* hello uni-app：新增 模板 markdown渲染富文本（用于图文新闻、资讯、笔记快速渲染）
* hello uni-app：新增 模板 问题反馈


#### 0.1.46.20180810-alpha
* 修复 Android4.4、5.0的兼容问题
* 修复 不支持iOS模拟器的问题
* 优化 iOS上的运行性能，尤其是示例中模板tab示例的卡顿
* 升级 mpvue至1.0.13
* 修复 uniapp的appid为空时真机运行白屏的问题
* 优化 部分手机上splash关闭过早造成白屏的问题
* 新增 css变量var(—status-bar-height)，微信小程序固定为25px，App环境为真实状态栏高度，[详见](https://uniapp.dcloud.io/frame?id=css%E5%8F%98%E9%87%8F)
* 修复 pages.json修改page的style不编译的问题
* 优化 video组件从HTML5 video改为原生video
* 修复 解决大部分情况下，页面data数据未重置导致的页面显示旧数据
* 修复 reLaunch每次都会出现启动splash的问题
* 更新 对接最新的5+分享接口，支持小程序分享
* 修复 禁用 .babelrc 对编译器的影响
* 更新 扫码支持 onlyFromCamera、scanType 参数
* 修复 有时运行到微信模拟器未生成project.config.json的问题
* 优化 previewImage
* 优化 dns.js(localhost)报错提示
* 更新 调整App运行时的userAgent
* 更新 调整 input 组件数字输入，身份证输入，带小数点的数字键盘对应的类型
* hello uni-app：新增商品列表模板


#### 0.1.45.20180728-alpha
* 【重要】新增uni-app，使用vue技术，开发一次，iOS、Android、微信小程序三端同时生成。[详见](https://uniapp.dcloud.io/)
* 【重要】调整uniapp策略，之前的原生渲染uniapp改为nml项目[详见](https://ask.dcloud.net.cn/article/13507)
*  uni-app：新增条件编译，采用类似 //#ifdef APP-PLUS 的写法做平台条件编译，代码块名为ifdef，还可双击ifdef选中整体代码段落。[详见](https://uniapp.dcloud.io/platform)
