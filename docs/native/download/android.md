# uni-app x Android原生SDK

## 说明

- 从HBuilderX 4.81-alpha版开始，为了适配Kotlin版本，对gradle插件做了升级，升级SDK时需要替换原有插件。插件配置及说明参考[文档](../use/android.md#gradleplugin)。

注意：蒸汽模式的离线sdk需 uni-app x 5.25+

## 正式版

### 5.26.2026091802

**[原生SDK(蒸汽模式)下载地址](https://web-ext-storage.dcloud.net.cn/uni-app-x/sdk/Android-Vapor/Android-uni-app-x-vapor-SDK@101163-5.26.zip)**

**[原生SDK(VDOM模式)下载地址](https://web-ext-storage.dcloud.net.cn/uni-app-x/sdk/Android/Android-uni-app-x-SDK@15075-5.26.zip)**

* 更新uni-app离线打包支持，需使用HBuilderX（5.26.2026091802）版本生成本地打包App资源。
* 新增 API uni.onAppRoute、uni.onBeforeAppRoute、uni.rewriteRoute 支持页面路由监听及重写 [文档](https://doc.dcloud.net.cn/uni-app-x/api/app-route.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=31599>
* 变更 组件 rich-text 使用 user-select 属性替代 selectable [文档](https://doc.dcloud.net.cn/uni-app-x/component/rich-text.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=31518>
* 优化 API uni.showLoading 调整背景透明度与消息提示框相同 [文档](https://doc.dcloud.net.cn/uni-app-x/api/loading.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=31614>
* 蒸汽模式 新增 组件 表单相关组件适配暗黑模式 [文档](https://doc.dcloud.net.cn/uni-app-x/component/switch.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=31289>
* 修复 编译器 蒸汽模式下独立 .ts 文件中调用支持摇树的 uni API 时，云打包后的基座提示缺少对应模块 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32167)
* 优化 API uni.createVideoContext playbackRate 设置播放倍速的取值范围 [文档](https://doc.dcloud.net.cn/uni-app-x/api/create-video-context.html#playbackrate) <https://issues.dcloud.net.cn/pages/issues/detail?id=32253>
* 修复 组件 video 点击进度条跳转后 controls 自动隐藏定时器未重置 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31671)
* 新增 API 广告 美数渠道 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-modules.html#uni-ad) <https://issues.dcloud.net.cn/pages/issues/detail?id=32000>
* 新增 API uni.requestSystemPermission 主动申请系统权限 [文档](https://doc.dcloud.net.cn/uni-app-x/api/request-system-permission.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=31823>
* 新增 发行 云打包支持自适应图标 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/manifest-android.html#adaptiveicon) <https://issues.dcloud.net.cn/pages/issues/detail?id=29277>
* 优化 API push 申请系统通知权限逻辑 [文档](https://doc.dcloud.net.cn/uni-app-x/api/uni-push.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=31815>
* 修复 组件 view dialogPage 中 view 全屏后和 dialogPage 显示重叠 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31990)
* 修复 组件 video 在 dialogPage 中不显示播放控制按钮 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31916)
* 修复 组件 video 在 dialogPage 中无法退出全屏 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32066)
* 蒸汽模式、VDOM模式 修复 组件 input maxlength 属性支持字符串类型 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31799)
* 蒸汽模式 新增 vue 内置组件Teleport [文档](https://doc.dcloud.net.cn/uni-app-x/vue/built-in.html#teleport) <https://issues.dcloud.net.cn/pages/issues/detail?id=30782>
* 蒸汽模式 新增 pages.json 支持配置页面滚动相关属性 enableBackToTop、bounces、androidOverscroll [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/pagesjson.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=32082>
* 蒸汽模式 新增 组件 list-view 支持scroll-into-view跳转到item、header或section [文档](https://doc.dcloud.net.cn/uni-app-x/component/list-view.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=31678>
* 蒸汽模式 新增 组件 list-view 支持滚动锚定特性 [文档](https://doc.dcloud.net.cn/uni-app-x/component/list-view.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=31833>
* 蒸汽模式 新增 组件 list-view 支持默认显示到底部 [文档](https://doc.dcloud.net.cn/uni-app-x/component/list-view.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=32464>
* 蒸汽模式 新增 组件 waterflow 支持通过scroll-into-view跳转到flow-item [文档](https://doc.dcloud.net.cn/uni-app-x/component/waterflow.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=31974>
* 蒸汽模式 新增 组件 web-view 支持 associative-container 属性 [文档](https://doc.dcloud.net.cn/uni-app-x/component/web-view.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=32177>
* 蒸汽模式 新增 CSS @media prefers-color-scheme 媒体查询，方便适配暗黑 [文档](https://doc.dcloud.net.cn/uni-app-x/css/common/at-rules.html#media) <https://issues.dcloud.net.cn/pages/issues/detail?id=31052>
* 蒸汽模式 新增 CSS 支持 direction 属性 设置文本方向 [文档](https://doc.dcloud.net.cn/uni-app-x/css/direction.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=31692>
* 蒸汽模式 新增 CSS text-align 支持 justify 设置文字向两侧对齐 [文档](https://doc.dcloud.net.cn/uni-app-x/css/text-align.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=31601>
* 蒸汽模式 新增 CSS backdrop-filter 属性 实现毛玻璃效果 [文档](https://doc.dcloud.net.cn/uni-app-x/css/backdrop-filter.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=31677>
* 蒸汽模式 新增 scheme启动及获取参数，可实现直达 [文档](https://doc.dcloud.net.cn/uni-app-x/collocation/app.html#%E5%8F%82%E6%95%B0-2) <https://issues.dcloud.net.cn/pages/issues/detail?id=32465> <https://issues.dcloud.net.cn/pages/issues/detail?id=32459> <https://issues.dcloud.net.cn/pages/issues/detail?id=31788>
* 蒸汽模式 新增 devTools 支持元素、网络、存储审查 [文档](https://doc.dcloud.net.cn/uni-app-x/tutorial/debug/devtools.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=31885>
* 蒸汽模式 新增 离线原生 SDK 集成 [文档](https://doc.dcloud.net.cn/uni-app-x/native/) <https://issues.dcloud.net.cn/pages/issues/detail?id=32417>
* 蒸汽模式 新增 uni统计2.0 [文档](https://uniapp.dcloud.net.cn/uni-stat-public.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=32445>
* 蒸汽模式 修复 组件 swiper 大小发生变化后没有自动计算布局 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32051)
* 蒸汽模式 修复 组件 list-view 部分情况下记录的sticky-section顺序异常导致界面错乱 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31835)
* 蒸汽模式 修复 组件 list-view 清空list-item时占位高度没消失 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31892)
* 蒸汽模式 修复 组件 list-view 追加数据后视口出现空白，滚动后恢复 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32156)
* 蒸汽模式 修复 组件 text 嵌套子text上使用不支持的样式时编译报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31722)
* 蒸汽模式 修复 组件 scroll-view 容器或内容变化引发的滚动不会触发scrollend事件 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32611)
* 蒸汽模式 修复 组件 list-view list-item高度变成0时未重排后续item位置 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32592)
* 蒸汽模式 修复 组件 list-view initial-scroll-bottom属性部分情况下未将初始位置滚动到底部 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32614)
* 蒸汽模式 修复 组件 list-view 滚动期间及滚动结束瞬间概率出现闪烁 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32910)
* 蒸汽模式 修复 组件 list-view 开启 scroll-anchoring 后追加消息可能出现白屏 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32913)
* 蒸汽模式 修复 CSS useComputedStyle 支持 css 变量。同时基于useComputedStyle的input、textarea、loading也支持了css变量 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31606)
* 蒸汽模式 修复 CSS 变量的 !important 不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31626)
* 蒸汽模式 修复 组件 canvas lineDashOffset值超过50就不会有变化 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32144)
* 蒸汽模式 修复 组件 canvas 性能优化 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32285)
* 蒸汽模式 优化 框架快照化以提升应用启动速度 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32284)
* 蒸汽模式 优化 so 库导出符号表以减少安装包大小 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32290)
* 蒸汽模式 新增 组件 scroll-view 支持 android-refresher-color 属性设置下拉刷新雪花前景颜色 [文档](https://doc.dcloud.net.cn/uni-app-x/component/scroll-view.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=32104>
* 蒸汽模式 修复 vue 动态插槽中包含组件时编译失败 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32103)
* 蒸汽模式 修复 组件 text 嵌套 text 上使用 v-if 或 v-for 时可能无法显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32539)
* 蒸汽模式 修复 组件 rich-text 设置 translateY 后可能内容显示不完整 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32820)
* 蒸汽模式 修复 组件 image 没有设置 fade-show 加载网络图片首次显示会有渐变动画效果 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32762)
* 蒸汽模式 修复 组件 Click 事件 中调用 uni.closeDialogPage 引起应用崩溃 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32504)
* 蒸汽模式 修复 组件 view 元素设置为拍平后，非拍平的子元素显示位置可能不正常 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32469)
* 蒸汽模式 修复 组件 scroll-view direction设置为 all 时上下滑动可能与父的 bounces 效果冲突 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32237)
* 蒸汽模式 修复 组件 rich-text mode 为 native 流式绘制列表加载闪烁 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=30729)
* 蒸汽模式 修复 组件 rich-text mode 为 native 流式绘制表格、代码块时闪烁 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32426)
* 蒸汽模式 修复 组件 native-view 动态添加原生子 View 可能无法显示 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31372)
* 蒸汽模式 修复 组件 native-view 截图如果页面存在拍平元素可能报错 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31818)
* 蒸汽模式 修复 组件 native-view 设置 fixed 定位后无法通过 v-if 删除 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32208)
* 蒸汽模式 修复 组件 input 去掉拼写检查的红色下划线 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31724)
* 蒸汽模式 修复 组件 input 设置padding时，下沿被裁 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32017)
* 蒸汽模式 修复 组件 input 自动聚焦时，光标位置错误 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32295)
* 蒸汽模式 修复 组件 video 在 list-view 中快速滚动 src 设置错乱 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32457)
* 蒸汽模式 修复 组件 canvas createImage 无法共用 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31588)
* 蒸汽模式 修复 组件 canvas 2D fillStyle 设置 rgba 透明度（alpha）无效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32186)
* 蒸汽模式 修复 API uni.exit 执行 redirectTo 后可能无法正常退出显示白屏 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32768)
* 蒸汽模式 修复 API uni.previewImage 当图片格式为SVG时会变形 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31653)
* 蒸汽模式 修复 API uni.showModal 成功回调内调用 navigateBack 崩溃 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31922)
* 蒸汽模式 修复 CSS overflow 安卓蒸汽模式 某些场景，定位层中的滚动组件无法滚动 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31290)
* 蒸汽模式 修复 CSS border border-bottom、border-right 某些情况可能被子元素覆盖 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32513)
* 蒸汽模式 修复 CSS transition 多元素执行transition时不同步导致闪烁 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31454)
* 蒸汽模式 修复 CSS transition 无单位长度值参与 transition 时，动画目标值被错误归零 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31761)
* 蒸汽模式 修复 CSS transform transition 动画未结束时设置新 transform 值不生效 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32507)
* 蒸汽模式 修复 UniPage API 部分设备 pageBody 取值不正确 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32036)
* 蒸汽模式 修复 DOM API UniElement 关闭页面时可能引起应用崩溃 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31739&ask_id=31971)
* 新增 uni-ui x uni-tab 支持毛玻璃效果 [文档](https://doc.dcloud.net.cn/uni-app-x/component/uni-ui-x/uni-tab.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=32439>
* 新增 uni-ai x 适配蒸汽模式，高性能的AI流式聊天 [文档](https://doc.dcloud.net.cn/uniCloud/uni-ai-x.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=32450>
* 蒸汽模式 优化 uts插件通道通信性能 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31458)
* 蒸汽模式 新增 UTSAndroid.destroyInstance 注销JS层引用的原生对象 [文档](https://doc.dcloud.net.cn/uni-app-x/uts/utsandroid.html) <https://issues.dcloud.net.cn/pages/issues/detail?id=32198>
* 蒸汽模式 修复 uts插件向JS返回数据对象时，部分数据为空值 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=31986)
* 蒸汽模式 修复 字面量.toFloat方式声明的变量被编译为了Number类型 [详情](https://issues.dcloud.net.cn/pages/issues/detail?id=32906)

**[历史版本](https://pan.baidu.com/s/1M6XHzokpQYJqfICTzjuQ_g?pwd=93yh)**
 
**[历史版本更新日志](https://download1.dcloud.net.cn/hbuilderx/changelog/5.26.2026091802.html)**

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