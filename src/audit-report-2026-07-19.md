# hello uni-app x 文档、条件编译与 Jest 覆盖审计

审计日期：2026-07-19
基线：HBuilderX `5.23.2026071804-dev`，仓库 `dev@46c58514e0cca99ef742be76f7a181c4f7573ba3`
用户指定文档快照：`C:\hbuilderx\hx_dev\plugins\hbuilderx-ai-chat\uni-agent\knowledges\uni-app-x\docs`
当前 HBuilderX 5.23 权威知识库：`C:\Users\wa\AppData\Roaming\HBuilder X\extensions\hbuilderx-ai-chat\uni-agent\knowledge-repo\knowledges\uni-app-x\docs`

两处文档目录不是同一快照。本报告先按用户指定目录完成对照，再用当前权威知识库校正最终结论；只在旧快照中成立的差异不作为项目确认错误。

## 1. 结论摘要

项目中存在确定的过期/错误条件编译、演示与文档不一致，以及大面积 Jest 漏测。

| 范围 | 文档/页面规模 | 测试规模 | 主要结论 |
|---|---:|---:|---|
| 条件编译 | 2,994 个条件 token | 238 个页面测试文件 | 3 处非法/错误条件写法，多个平台范围错误；264 处恒真占位断言分布在 195 个文件 |
| 组件 | 45 个一级目录、124 个 `.uvue`、118 个注册页面 | 79 个 Jest | 5 个已有组件目录完全无 Jest；3 个文档能力未纳入项目；逐组件矩阵均存在明确局部缺口 |
| API | 当前快照 158 份文档、108 个一级目录、166 个 `.uvue` | 89 个 Jest | 35 个 API 目录完全无 Jest；34 个可调用 API 未在 `pages/API` 直接调用；3 个测试在全部支持平台均不可达 |
| CSS | `_sidebar` 和现存文件可解析 93 个属性、91 个注册页面 | 27 个 Jest，集中矩阵约 64 属性 | 5 个属性无活动示例；29 个属性无语义断言；61 个属性只断言一个有效值；MP 集中矩阵全部跳过 |

本报告中的“漏测”要求测试断言具体属性值、事件 detail、回调字段、返回值或行为状态。仅截图、节点存在、点击不报错、`expect(1).toBe(1)` 不计语义覆盖。

## 2. 条件编译和平台范围问题

### 2.1 确认错误

1. SSE 测试条件恒真：[`pages/API/connect-event-source/connect-event-source.test.js:8`](pages/API/connect-event-source/connect-event-source.test.js#L8) 使用 `!isAndroid || !isIOS`，Android/iOS 均直接返回；文档 [`connect-event-source.md:23`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/api/connect-event-source.md#L23) 支持两端。第 23 行读取一次 `data` 后，第 26 行未重新读取，也会造成消息断言使用旧快照。
2. UTS event-bus 测试全部不可达：[`pages/API/event-bus/uts-event-bus.test.js:6`](pages/API/event-bus/uts-event-bus.test.js#L6) 排除 iOS，第 13 行又排除所有非 iOS；文档 [`event-bus.md:17`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/api/event-bus.md#L17) 支持 iOS UTS 插件。
3. 支付测试全部不可达：[`pages/API/request-payment/request-payment.test.js:13`](pages/API/request-payment/request-payment.test.js#L13) 排除 Web、MP、HarmonyOS、iOS、Android 和 App WebView；文档 [`request-payment.md:15`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/api/request-payment.md#L15) 支持微信小程序及 App 平台。
4. 条件运算符错误：[`pages/API/request/request.uvue:377`](pages/API/request/request.uvue#L377) 使用 `APP | MP-WEIXIN | WEB`，应使用条件编译逻辑或 `||`。
5. 条件运算符错误：[`uni_modules/uni-upgrade-center-app/pages/uni-app-x/upgrade-popup.uvue:392`](uni_modules/uni-upgrade-center-app/pages/uni-app-x/upgrade-popup.uvue#L392) 使用 `APP-NVUE | UNI-APP-X`。
6. 条件标识拼错：[`uni_modules/uni-openLocation/pages/openLocation/openLocation.uvue:538`](uni_modules/uni-openLocation/pages/openLocation/openLocation.uvue#L538) 使用 `VUE3_VAPOR`，当前合法标识是 `VUE3-VAPOR`；该 `ifndef` 倾向恒真。
7. `getBatteryInfo` 错含 HarmonyOS：[`pages.json:1445`](pages.json#L1445) 注册 HarmonyOS，页面无条件调用；当前文档 `get-battery-info.md:9-12` 明确为 `x`。
8. `createWorker` 漏测 MP：[`pages.json:2035`](pages.json#L2035) 和当前文档 `create-worker.md:38` 均支持微信小程序，但 [`create-worker.test.js:8`](pages/API/create-worker/create-worker.test.js#L8) 对 MP 占位后返回。App 必须按页面直接调用与 UTS 插件、VDOM/Vapor 分开判断，不能笼统归为支持或不支持。
9. `movable-view` 漏测 MP：入口 [`pages.json:604`](pages.json#L604) 支持 Web/MP，测试 [`movable-view.test.js:5`](pages/component/movable-view/movable-view.test.js#L5) 只测 Web。
10. App Vapor 错误注册 `@media` 示例：[`pages.json:3299`](pages.json#L3299) 包含 `VUE3-VAPOR`，页面 [`prefers-color-scheme.uvue:152`](pages/CSS/prefers-color-scheme/prefers-color-scheme.uvue#L152) 使用 `@media`；当前文档 `at-rules.md:16,30-31` 标记 Android/iOS/HarmonyOS 不支持并建议 App 使用 API。
11. HarmonyOS Vapor 无条件使用 `@import`：[`App.uvue:179`](App.uvue#L179) 导入公共 CSS；当前文档 `at-rules.md:13` 标记 HarmonyOS Vapor 不支持。
12. CSS selector 漏 Web/MP：[`selector.test.js:9`](pages/CSS/selector/selector.test.js#L9) 跳过 Web/MP。当前文档 `selector.md:3,11` 同时支持 Web/MP 的 `page` 和 App Vapor 的 `page`；因此 App Vapor 测试正确，确认缺口仅是 Web/MP。
13. MP CSS 集中测试全部短路：[`set-css.test.js:11`](pages/CSS/set-css.test.js#L11) 对 MP 只执行恒真断言；当前文档 `css/README.md:9` 明确小程序支持 Web CSS。
14. HarmonyOS DOM1 有 12 个 `skipAssert`：`border`、`border-radius`、`border-top/bottom/left/right`、`flex-flow`、`flex`、`margin`（两页）、`padding`、`text-shadow`，位置为 [`set-css.test.js:789`](pages/CSS/set-css.test.js#L789)、821、895、928、961、994、1060、1091、1134、1169、1204、1258。当前文档均声明 HarmonyOS 支持。【harmony dom1，这些值setProperty 设置后，getPropertyValue 获取为空，所以skipAssert临时跳过】

### 2.2 遗留或待确认

1. `H5` 在支付模块出现 20 次，并与 `WEB` 混用，例如 [`request-payment-uni-pay.uvue:17`](pages/API/request-payment/request-payment/request-payment-uni-pay.uvue#L17)。`H5` 是兼容旧标识，建议统一为 `WEB`；当前仅判为遗留，不直接判编译错误。
2. `APP-PLUS` 出现 14 次，集中于传统 uni-app 兼容模块；它是合法旧标识，不应在 uni-app x 分支承担有效逻辑。
3. [`pages.json:186`](pages.json#L186) 的 `APP-ANDROID || APP-HARMONY && VUE3-VAPOR || APP-IOS` 按优先级可解析，但缺括号，维护风险高；其 HarmonyOS Vapor 5.21+ 条件与当前 `sticky-section` 文档一致，不是兼容性错误。
4. `label` 当前文档总表称 Android/iOS 不支持，但属性表又标 Android Vapor 5.21、iOS Vapor 5.11 支持。项目入口未包含两端 Vapor，列为文档歧义下的高风险缺口；MP 测试漏测则独立确认。
5. 其他文档冲突：`chooseFile` 总表与参数表、CSS 单角圆角百分比、CSS 自定义变量、`background-clip` 总表与逐值表、line-height Vapor `em`。相关项目问题在修正文档数据源前只能标记疑似。
6. iOS image `padding*` 未平台化：[`padding.uvue:47`](pages/CSS/padding/padding.uvue#L47)、四个方向页面第 78 行无条件演示，集中测试 [`set-css.test.js:451`](pages/CSS/set-css.test.js#L451) 要求有效值；但当前文档的“不支持”限制文字与内嵌官方示例互相冲突。可确认测试没有 iOS 专项分支，实际支持行为需区分 VDOM/Vapor 动态验证。
7. `requestMerchantTransfer` 的当前文档支持 HarmonyOS 5.14，但要求另行下载 `uni-requestMerchantTransfer` 插件；项目未安装该插件，因此 [`pages.json:1562`](pages.json#L1562) 排除 HarmonyOS 不能直接判为条件错误。若项目目标要求覆盖全部文档 ext API，应先安装插件，再补 HarmonyOS 页面和 Jest；当前可确认的是该平台能力未纳入项目。

## 3. 组件演示和测试矩阵

### 3.1 完全缺失

- 有页面但完全无 Jest：`ad`、`camera`、`live-pusher`、`page-meta`、`share-element`。
- 文档能力未纳入当前项目：`icon`、`animation-view`、`custom-tab-bar`。其中 `animation-view` 是需下载并制作自定义基座的 ext component，不应无条件视为内置组件遗漏；另外两项也应按其受限平台建立明确纳入/排除策略。
- 文档 `_sidebar.md:84-116` 的微信专用组件整组未进入 `pages/component`。若项目目标确实包含文档中每个组件，这一整组均属缺失；若明确只覆盖通用组件，应建立排除清单和原因。

### 3.2 逐组件确认缺口

| 组件 | 演示/兼容性缺口 | Jest 缺口 | 主要证据 |
|---|---|---|---|
| 全局属性/事件 | Vapor 排除 `data-*` 读取；`android-layer-type`、fullscreen 事件缺明确演示 | `ref` 修改、hover 时序、Android 属性、fullscreen 未断言 | [`global-properties.uvue:62`](pages/component/global-properties/global-properties.uvue#L62)，[`common.md:7`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/component/common.md#L7) |
| view | 页面覆盖属性 | 除 Harmony hover 外，stop-propagation、start/stay、flatten 及其余平台无语义覆盖；flatten 需包含 Android Vapor 5.21 | [`view.test.js:10`](pages/component/view/view.test.js#L10)，当前 `view.md:27` |
| scroll-view | 缺 Android VDOM 旧 nested/associative/custom child 和 nested 生命周期、MP passive/deceleration/drag；Web 绑定不支持的 `scrollend` | 上述项、enable-back-to-top、refresher max distance、Android Vapor 5.21 `android-overscroll` 未测 | [`scroll-view.uvue:8`](pages/component/scroll-view/scroll-view.uvue#L8)，当前 `scroll-view.md:42-66,295` |
| swiper | 缺 MP/Android Vapor easing/margins、display-multiple、Android Vapor auto-height/indicator class/style/disable-bounce、skip-hidden-item-layout | 只较好覆盖 current 和三个事件，其余属性多为截图/未断言 | [`swiper.uvue:9`](pages/component/swiper/swiper.uvue#L9)，当前 `swiper.md:36,45-53` |
| list-view | Web 绑定 direction/bounces/scroll-left/scrollend；iOS/Harmony 暴露横向；隐藏 Harmony Vapor 已支持的 scroll-into-view；缺 associative/refresher 边界 | 缺平台值域、完整 refresher 生命周期、Android Vapor 5.21 `android-overscroll` | [`list-view.uvue:265`](pages/component/list-view/list-view.uvue#L265)，当前 `list-view.md:35-59` |
| waterflow | Harmony 绑定不支持的 padding；Android Vapor 的 scroll-into-view 被隐藏；缺 max-cross-axis、associative、refresher 边界、Android Vapor `android-overscroll` | 上述能力和 flow-item key/height 未测 | [`waterflow.uvue:314`](pages/component/waterflow/waterflow.uvue#L314)，当前 `waterflow.md:29-53` |
| nested-scroll-header/body | 缺多子节点、多个 body、顺序等约束反例 | header 仅截图；body 只断言 scrollTop 上界 | [`nested-scroll-header.test.js:9`](pages/component/nested-scroll-header/nested-scroll-header.test.js#L9)，[`nested-scroll-body.md:28`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/component/nested-scroll-body.md#L28) |
| sticky-header/section | 当前平台入口正确；约束场景不完整 | preload 已有语义覆盖；padding、位置、push-pinned-header 主要只截图 | [`pages.json:186`](pages.json#L186)，当前 `sticky-section.md:20-25` |
| page-container | 缺 duration、z-index 和 6 个生命周期/clickoverlay 事件 | 只断言 bottom/right、round、afterleave | [`page-container.uvue:108`](pages/component/page-container/page-container.uvue#L108)，[`page-container.md:25`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/component/page-container.md#L25) |
| match-media | 七项属性和值域有演示 | 只有截图，无匹配/不匹配行为断言 | [`match-media.test.js:1`](pages/component/match-media/match-media.test.js#L1)，[`match-media.md:24`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/component/match-media.md#L24) |
| share-element | 属性基本完整 | 整组件无 Jest，转场、飞跃物、手势返回均未测 | [`share-element.uvue:5`](pages/component/share-element/share-element.uvue#L5)，[`share-element.md:29`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/component/share-element.md#L29) |
| movable-area/view | movable-view 缺 damping、friction、disabled、animation、direction=none、h/vtouchmove | scale-area、上述属性及 change source 值域未测，MP 整体漏测 | [`movable-view.uvue:10`](pages/component/movable-view/movable-view.uvue#L10)，[`movable-view.md:24`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/component/movable-view.md#L24) |
| cover-view/image | 缺 cover-view scroll-top；cover-image 缺 referrer-policy、load/error | 仅存在性和截图 | [`cover-view.uvue:7`](pages/component/cover-view/cover-view.uvue#L7)，[`cover-image.md:20`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/component/cover-image.md#L20) |
| text | 缺 MP user-select、Vapor hover-stop、max-lines | selectable/space/decode、hover 时序、max-lines、flatten 未完整断言 | [`text-props.uvue:44`](pages/component/text/text-props.uvue#L44)，[`text.md:22`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/component/text.md#L22) |
| rich-text | 缺 MP space、Vapor selection-handle/background-color | nodes/mode/选择颜色主要靠截图，itemclick 仅部分覆盖 | [`rich-text.uvue:34`](pages/component/rich-text/rich-text.uvue#L34)，[`rich-text.md:45`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/component/rich-text.md#L45) |
| progress | 页面基本完整 | duration、active-mode、颜色和动画结果未完整断言 | [`progress.test.js:32`](pages/component/progress/progress.test.js#L32)，[`progress.md:24`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/component/progress.md#L24) |
| loading | 页面完整 | paused/bold/ios-spinner 无语义断言；Web/MP/Harmony 全跳过 | [`loading.test.js:5`](pages/component/loading/loading.test.js#L5)，[`loading.md:14`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/component/loading.md#L14) |
| native-view | 页面完整 | 未直接断言 init 的 `event.detail.element` 类型 | [`native-view.test.js:36`](pages/component/native-view/native-view.test.js#L36)，[`native-view.md:22`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/component/native-view.md#L22) |
| button | 缺 form-type、hover 起止、绝大多数 MP 开放能力；存在文档未列的 loading-text-class | MP 整套跳过；开放事件、表单、hover、loading 未测 | [`button.uvue:120`](pages/component/button/button.uvue#L120)，[`button.md:18`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/component/button.md#L18) |
| checkbox/group | 缺 name 独立表单场景 | 缺 group/name 提交和四色完整矩阵 | [`checkbox.uvue:177`](pages/component/checkbox/checkbox.uvue#L177)，[`checkbox.md:18`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/component/checkbox.md#L18) |
| form | 缺 MP report-submit/timeout，disabled 场景弱 | 缺 disabled 和 MP formId 语义断言 | [`form.uvue:6`](pages/component/form/form.uvue#L6)，[`form.md:24`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/component/form.md#L24) |
| input | 缺 MP safe-password/nickname/always-embed 等 | placeholder style 断言被注释；selection、confirm-hold、MP 专属事件不完整 | [`input.uvue:12`](pages/component/input/input.uvue#L12)，[`input.md:24`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/component/input.md#L24) |
| editor | 缺 MP enable-formats、name 表单提交 | Context 格式、撤销/重做、内容结果未逐项断言 | [`editor-edit.uvue:430`](pages/component/editor/editor-edit.uvue#L430)，[`editor.md:16`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/component/editor.md#L16) |
| label | 缺 disabled 演示；细粒度属性表显示漏 Android Vapor 5.21/iOS Vapor 5.11，但总表冲突 | disabled、Android/iOS Vapor 和 MP 未测 | [`pages.json:613`](pages.json#L613)，当前 `label.md:10-22` |
| picker | 缺 custom-item、header-text、level、name | region、cancel/columnchange detail、custom-item/level/name 未测 | [`picker.uvue:12`](pages/component/picker/picker.uvue#L12)，[`picker.md:28`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/component/picker.md#L28) |
| picker-view/column | 缺 name、MP pickstart/pickend | 缺 name、MP 两事件和 column value 独立语义 | [`picker-view.uvue:9`](pages/component/picker-view/picker-view.uvue#L9)，[`picker-view.md:18`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/component/picker-view.md#L18) |
| radio/group | 缺 name 表单提交 | 缺 group/name 和颜色完整矩阵 | [`radio.uvue:161`](pages/component/radio/radio.uvue#L161)，[`radio.md:18`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/component/radio.md#L18) |
| slider | 缺 name、changing 专项、Vapor class 完整演示 | min/max/step/disabled/show-value、change/changing detail、class 未完整测 | [`slider.uvue:135`](pages/component/slider/slider.uvue#L135)，[`slider.md:18`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/component/slider.md#L18) |
| switch | 缺 name、type=switch/checkbox | name/type/disabled 未测 | [`switch.uvue:6`](pages/component/switch/switch.uvue#L6)，[`switch.md:18`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/component/switch.md#L18) |
| textarea | 缺 name、MP fixed/show-confirm-bar；inputmode 现为 5.0+ 废弃项 | confirm/linechange/blur/input/change/update:value detail 和 MP 项不完整；cursor 默认值应按当前文档 `-1` | [`textarea.uvue:168`](pages/component/textarea/textarea.uvue#L168)，当前 `textarea.md:24-56` |
| navigator | 缺 target/delta、MP 参数、动画、hover、render-link、回调；页面有重复 id | 只测 navigate/redirect，MP 整套跳过 | [`navigator.uvue:4`](pages/component/navigator/navigator.uvue#L4)，[`navigator.md:24`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/component/navigator.md#L24) |
| image | 缺 lazy-load、webp 属性、长按菜单、draggable；fade-show 平台未隔离 | 上述属性和 flatten 结果未测 | [`image.uvue:10`](pages/component/image/image.uvue#L10)，[`image.md:18`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/component/image.md#L18) |
| video | page-gesture 错排 Web；http-cache 错含 Web/MP；show-loading/show-mute/enable-play 无条件暴露 | PIP/投屏/recycle/reuse、大量属性和 Context 方法值域未测 | [`video.uvue:112`](pages/component/video/video.uvue#L112)，[`video.md:24`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/component/video.md#L24) |
| camera | 属性、扫码、主要方法有演示 | 完全无 Jest：权限、init、stop/error/scancode、拍照/录像/帧监听均未测 | [`camera.uvue:3`](pages/component/camera/camera.uvue#L3)，[`camera.md:22`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/component/camera.md#L22) |
| live-player | 缺 MP mode/cache/PIP/casting 等 | 唯一测试只测外层 scroll-view，组件属性/事件/方法均未测 | [`live-player.test.js:7`](pages/component/live-player/live-player.test.js#L7)，[`live-player.md:20`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/component/live-player.md#L20) |
| live-pusher | 初值 `orientation="orientation"` 非法；MP 独占能力缺失 | 完全无 Jest | [`live-pusher.uvue:86`](pages/component/live-pusher/live-pusher.uvue#L86)，[`live-pusher.md:89`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/component/live-pusher.md#L89) |
| map | 缺 min/max-scale、layer-style、poi/building/indoor、anchorpointtap；Web 无条件绑定多个不支持属性；当前文档还明确整组件不支持 Android Vapor，但路由未排除 | 大多数属性/事件、Context 方法未测 | [`map.uvue:3`](pages/component/map/map.uvue#L3)，当前 `map.md:12-15,32-59` |
| canvas | MP type/canvas-id/disable-scroll/error 演示不完整 | 组件属性和 touch/longtap/error 未逐项断言 | [`canvas.uvue:1`](pages/component/canvas/canvas.uvue#L1)，[`canvas.md:36`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/component/canvas.md#L36) |
| ad | MP 只显示“暂无测试广告位”，未实际演示；缺 close/clicked | 完全无 Jest | [`ad.uvue:4`](pages/component/ad/ad.uvue#L4)，[`ad.md:30`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/component/ad.md#L30) |
| web-view | 缺 Web allow/sandbox/fullscreen、iOS inline/didterminate、dark-mode | 缺 message/download detail、上述属性和部分 Element 方法 | [`web-view.uvue:3`](pages/component/web-view/web-view.uvue#L3)，[`web-view.md:24`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/component/web-view.md#L24) |
| page-meta | 缺 root-background-color/page-font-size/orientation/resize；兼容表称 scroll-top/duration/scroll/scrolldone 不支持，但当前文档内嵌同项目示例仍使用并错误提示 App 体验，属于文档/示例/入口三方冲突 | 完全无 Jest，需先以 MP 实测确认争议行为 | [`page-meta.uvue:7`](pages/component/page-meta/page-meta.uvue#L7)，当前 `page-meta.md:10-44` |
| unicloud-db | 缺 groupby/group-field/distinct/gettree/loadtime 等集中演示 | CRUD 断言被注释；分页、树、分组、错误回调和方法 options 未测 | [`unicloud-db.test.js:20`](pages/component/unicloud-db/unicloud-db.test.js#L20)，[`unicloud-db.md:18`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/component/unicloud-db.md#L18) |

## 4. API 演示和测试矩阵

### 4.1 有页面但完全无 Jest 的 35 个目录

`accelerometer`、`authentication`、`calendar`、`capture-screen`、`choose-file`、`choose-media`、`cloud-storage`、`compass`、`create-interstitial-ad`、`create-request-permission-listener`、`create-rewarded-video-ad`、`env`、`exit`、`facial-recognition-meta-info`、`get-accessibility-info`、`get-background-audio-manager`、`get-uni-verify-manager`、`gyroscope`、`install-apk`、`is-simulator`、`make-phone-call`、`memory`、`network-status-change`、`oauth`、`open-app-authorize-setting`、`open-document`、`phoneContact`、`privacy`、`request-merchant-transfer`、`scan-code`、`screen-brightness`、`share`、`share-with-system`、`vibrate`、`virtual-payment`。

目录证据均位于 `pages/API/<目录>`；文档分别为 `docs/api` 下同名或能力族文档。这里不是“弱覆盖”，而是没有任何 `*.test.js`。

### 4.2 34 个可调用 API 未在 `pages/API/**/*.{uvue,uts}` 直接调用

- 完全无项目 API 演示：`canvasToTempFilePath`、`getPerformance`、`getBatteryInfoSync`、`onTabBarMidButtonTap`。
- Wi-Fi 整族缺失：`startWifi`、`stopWifi`、`connectWifi`、`setWifiList`、`getWifiList`、`onGetWifiList`、`offGetWifiList`、`getConnectedWifi`、`onWifiConnected`、`onWifiConnectedWithPartialInfo`、`offWifiConnected`。文档：[`wifi.md:1`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/api/wifi.md#L1)。
- Locale 整族缺失：`getLocale`、`setLocale`、`onLocaleChange`。只有 `uni-openLocation` 内部间接调用 `getLocale`，不构成 API 示例和 Jest。文档：[`locale.md:3`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/api/locale.md#L3)。
- TabBar 整族不在 `pages/API`：`showTabBar`、`hideTabBar`、`showTabBarRedDot`、`hideTabBarRedDot`、`setTabBarBadge`、`removeTabBarBadge`、`setTabBarStyle`、`setTabBarItem`。这 8 项已由 [`tabbar-api.test.js:36`](pages/tabBar/tabbar-api.test.js#L36) 在 App 侧调用，其中 5 项主要靠截图、3 项仅用于 reset 且吞掉异常；Web、MP 和当前文档新增的 Android/iOS/HarmonyOS Vapor 细分支持未验证。`onTabBarMidButtonTap` 仍完全未覆盖。
- 仅在 component 页面演示：`createCameraContext`、`createCanvasContextAsync`、`createEditorContextAsync`、`createLivePlayerContext`、`createLivePusherContext`、`createMapContext`、`createVideoContext`、`createWebViewContext`。这可以算演示，但对应 Context 文档的方法/事件并未全面测试；`createCameraContext` 当前还新增微信小程序覆盖要求。

因此，34 项的准确口径是“未在 `pages/API` 页面源码直接调用”，不是“全仓库均无测试”：其中 8 项有 `pages/tabBar` App 侧调用/截图覆盖，其余 26 项不受该测试覆盖。

### 4.3 已有 Jest 的确认缺口

1. 全平台不可达：`connect-event-source.test.js`、`event-bus/uts-event-bus.test.js`、`request-payment.test.js`。
2. 纯截图、无 API 语义断言：`choose-image`、`choose-video`、`inner-audio-path`、`element-draw`、`element-request-fullscreen-bugs`、`modal`、`preview-image`、`preview-image-multi`、`toast`。
3. 文档支持 MP 但整文件退出：`action-sheet`、`animation-frame`、`choose-image`、`choose-video`、`download-file`、`get-device-info`、`get-enter-options-sync`、`get-launch-options-sync`、`get-network-type`、`get-system-info`、`load-font-face`、`loading`、`modal`、`open-location`、`page-scroll-to`、`preview-image`、`preview-image-multi`、`request`、`requestTask`、`storage`、`storage-deprecated`、`upload-file`、`websocket/socketTask`。
4. 文档支持 iOS 但退出/漏关键能力：`base64ToArrayBuffer`、`compress-image`、`compress-video`、`event-bus`、`get-battery-info`、`get-image-info`、`get-video-info`、`keyboard`、`save-image-to-photos-album`、`save-video-to-photos-album`。
5. 文档支持 Web 但退出：`choose-video`、`compress-image`、`get-battery-info`、`get-video-info`、`keyboard`。`create-intersection-observer` 额外排除 Safari，但文档没有该限制，列为疑似。
6. HarmonyOS 漏测：`clipboard`、`get-recorder-manager`、`keyboard`、`location-change` 的支持路径被退出或仅限其他平台。
7. 当前文档新增平台仍未覆盖：Memory API 的 iOS UTS 插件 5.08；导航 API 的 iOS Vapor 5.14、`switchTab` 的 Android Vapor 5.22；TabBar API 的 Android Vapor 5.22、iOS Vapor 5.14及部分 HarmonyOS Vapor。`requestMerchantTransfer` 的 HarmonyOS 5.14 另有未安装 ext API 插件前提，见 2.2。
8. 网络 Task/事件未完整覆盖：`request` 缺 success 的 `statusCode/header/cookies`、fail/complete 和 abort/header/chunk；`upload-file`、`download-file` 缺 progress/abort/header 完整断言；`socketTask` 只断言连接状态，缺 send/close/error/header/protocol。
9. 媒体返回值/错误域不完整：`compress-image`、`compress-video`、`get-image-info`、`get-video-info`、两个 save-to-album 测试主要断言标志或截图，未覆盖文档返回字段、fail、complete。`compress-video` 还跳过 iOS/MP，Android 5/7/9/10 调用后直接返回。
10. UI API 主要依赖视觉结果：`action-sheet`、`modal`、`loading`、`toast`、`set-navigation-bar-color`、`set-navigation-bar-title`、`set-page-backgroundColorContent` 未完整断言 success/fail/complete。
11. 实例能力不完整：`create-inner-audio-context` 未覆盖全部属性和 on/off 事件；`get-recorder-manager` 只允许 Android 9+；Worker 必须按页面调用/UTS 插件及 VDOM/Vapor 拆分，现有 UTS 分支仍有无条件返回；`uni-resize-observer` MP 退出。
12. DOM/页面实例平台缺口：`create-selector-query*`、`get-element-by-id*`、`element-request-fullscreen*`、`element-takesnapshot`、`get-current-pages*` 均有文档支持平台被占位退出。
13. uniCloud：`cloud-function` 排除 Android；`database` 排除 Safari/Android；`sse-channel` 排除 App；云存储页面无 Jest。
14. 字段只做存在/类型检查：`get-app`、`get-app-base-info`、`get-app-authorize-setting`、`get-system-setting`、`get-window-info` 未逐字段验证值域和平台差异。
15. `get-battery-info.test.js` 只校验 `level >= 0`，文档值域是 1-100，且未测 `errMsg/fail/complete/getBatteryInfoSync`。

## 5. CSS 演示和测试矩阵

### 5.1 无活动示例的 5 个属性

`background-clip`、`text-decoration`、`text-decoration-color`、`text-decoration-style`、`text-decoration-thickness`。`text-decoration-line.uvue:52-58` 中仅有的 color 代码已注释。当前文档下，`background-clip` 的 Web 缺口确认、Android 因总表/逐值表冲突仅为疑似；`text-decoration-color` 确认涉及 Web 4.0、iOS Vapor 5.11、HarmonyOS Vapor 5.0；`text-decoration-thickness` 当前仅 Web 支持。

### 5.2 无属性值语义断言的 29 个属性

`background`、`background-clip`、`background-image`；`border-bottom-color`、`border-bottom-left-radius`、`border-bottom-right-radius`、`border-bottom-style`、`border-bottom-width`、`border-left-color`、`border-left-style`、`border-left-width`、`border-right-color`、`border-right-style`、`border-right-width`、`border-top-color`、`border-top-left-radius`、`border-top-right-radius`、`border-top-style`、`border-top-width`；`lines`、`overflow`、`pointer-events`；`text-decoration`、`text-decoration-color`、`text-decoration-style`、`text-decoration-thickness`；`transition`、`transition-duration`、`transition-property`。

### 5.3 只严格断言一个有效值的 61 个属性

- 布局：`min-width`、`max-width`、`height`、`min-height`、`max-height`、`visibility`、`top`、`bottom`、`left`、`right`、`position`、`box-sizing`。
- Border：`border`、`border-top`、`border-right`、`border-bottom`、`border-left`、`border-color`、`border-radius`、`border-style`、`border-width`、`box-shadow`。
- Flex：`align-content`、`align-items`、`align-self`、`flex`、`flex-basis`、`flex-direction`、`flex-flow`、`flex-grow`、`flex-shrink`、`flex-wrap`、`justify-content`。
- Margin/Padding：`margin`、`margin-top/right/bottom/left`、`padding`、`padding-top/right/bottom/left`。
- 文本：`color`、`font-family`、`font-size`、`font-style`、`font-weight`、`letter-spacing`、`line-height`、`text-align`、`text-decoration-line`、`text-overflow`、`white-space`、`text-shadow`。
- 其他：`background-color`、`opacity`、`z-index`、`transform-origin`、`transition-delay`、`transition-timing-function`。

这些测试由 [`set-css.test.js:1451`](pages/CSS/set-css.test.js#L1451) 的单个 `valueIndex` 驱动。它们证明某一个值可设置/读取，不能证明文档列出的默认值、完整枚举、合法/非法值和分平台版本范围。

`display` 覆盖 `flex/none`，`transform` 覆盖 rotate/translate/scale 三值，`width` 覆盖 `50px` 和部分默认 `auto`；这三项也仍非完整值域覆盖。

### 5.4 27 个独立 Jest 的质量

- 主要或完全依赖截图的 16 个：`transition-duration`、`transition-transform`、`translate`、`transform-origin`、`scale`、`rotate`、`font-size`、`font-family`、`function`、`background-image`、`font-family-icon`、`overflow`、`z-index`、`dynamic-border`、`border`、`border-update`。
- 有语义断言但仍有明确空洞的 11 个：`variable`、`custom_variable`、`style-isolation`、`set-css`、`selector`、`transition`、`line-height`、`letter-spacing`、`specificity`、`width`、`overflow-visible-event`。
- 独立测试对 MP 提前返回：变量/自定义变量、transition 三个测试、translate/scale/rotate/transform-origin、font-size/font-family/font-family-icon、specificity、function、background-image。除 `uni-icon` 的明确限制外，均存在文档支持路径漏测。
- `line-height`、`letter-spacing` 只在 HarmonyOS 做动态行为测试，漏 Web/Android/iOS；line-height 应按 VDOM/Vapor 区分值域，Vapor 不应要求 rpx，Vapor em 因文档冲突列疑似。`transform-origin` 漏 Web/MP/横屏；`transition-transform` 漏 Android/MP，当前文档已删除旧 Android 排除条件，因此 Android 是确认漏测；`overflow-visible-event` 漏 HarmonyOS/Web/MP。

当前 `css/README.md:283-303` 还出现 14 个 animation 悬空链接，但 `_sidebar` 和目录不存在对应文档文件：`animation`、`animation-composition`、`animation-delay`、`animation-direction`、`animation-duration`、`animation-fill-mode`、`animation-iteration-count`、`animation-name`、`animation-play-state`、`animation-range`、`animation-range-end`、`animation-range-start`、`animation-timeline`、`animation-timing-function`。它们属于权威快照生成清单异常，未纳入 93 个可解析属性分母，也不能在缺少正式属性文档时判定平台和值域覆盖。

### 5.5 演示文案/兼容性错误

1. [`display/none.uvue:7`](pages/CSS/display/none.uvue#L7) 写“display 默认值为 none”，文档 [`display.md:5`](C:/hbuilderx/hx_dev/plugins/hbuilderx-ai-chat/uni-agent/knowledges/uni-app-x/docs/css/display.md#L5) 明确默认值为 `flex`。
2. [`box-sizing.uvue:7`](pages/CSS/box-sizing/box-sizing.uvue#L7) 将 `content-box` 标成默认值，uni-app x CSS reset 默认应为 `border-box`。文档自身示例也有相同错误文案，需同时修正文档源。
3. iOS image padding 文档/测试冲突、HarmonyOS Vapor `@import`、App Vapor `@media`、selector 的 Web/MP 漏测，详见第 2 节。

## 6. Jest 基础设施问题

1. 根配置 [`jest.config.js:11`](jest.config.js#L11) 永久排除 `pages/uni-ui`，其中 12 个现有 Jest 永远不会由根配置执行：`badge-view`、`collapse`、`drag-cell`、`fab-button`、`index-bar`、`link`、`nav-bar`、`number-box`、`rate`、`refresh-box`、`tab-bar`、`time-format`。
2. 全仓只有 1 个真正的 `it.skip`，但有 264 个恒真占位断言，分布在 195/238 个页面测试文件。不支持、环境缺失和真实通过在测试报告中无法区分。
3. 215 个测试文件含任意 `return` token，其中包含 helper 的正常返回，不能全部视为提前退出；控制流可确认至少 82/89 个 API 测试存在平台提前退出。全仓提前退出总量需 AST 控制流统计后才能给出准确数字。
4. 确认的零 matcher 用例：[`swiper.test.js:89`](pages/component/swiper/swiper.test.js#L89) 的 `Trigger Event` 只等待状态；[`list-view-multiplex.test.js:21`](pages/component/list-view/list-view-multiplex.test.js#L21) 只调用滚动方法。
5. `pages.json` 445 个 path 中可映射到页面的 437 个，仅 234 个有同目录同名测试。扣除被其他测试路由引用的页面后，仍至少 99 个注册页面既无同名测试、也无测试路由引用；其中 API 48、component 27、CSS 5、template 18、tabBar 1。这个 99 是保守下界。

## 7. 文档自身冲突和动态验证边界

以下项目不能仅靠静态源码定责：

- `map` 文档同时出现 `enable-3D` 和 `enable3-d`。
- `live-pusher` 文档重复定义 `zoom`、`statechange`、`netstatus`，且兼容性不同。
- `button` 页面使用文档未列出的 `loading-text-class`，可能是实现新增或无效属性。
- 兼容表中空白、`-`、`x` 混用，空白不能可靠解释为支持。
- `choose-file` 总兼容表称 HarmonyOS 4.61 支持，但所有参数/回调又标 HarmonyOS `x`。
- `page-meta` 兼容表、内嵌示例的 App 提示、项目 MP-only 入口互相冲突。
- iOS image `padding*` 的限制文字与同一文档内嵌示例冲突。
- CSS 单角 radius 百分比、自定义变量、`background-clip` Android 值域、line-height Vapor `em` 存在文档章节间冲突。当前 `text-decoration-thickness` 已明确仅 Web 支持，Android transition 也已从疑似升级为确认漏测。
- 广告、地图、相机、直播、支付、分享、授权、WebView、共享元素依赖 SDK Key、广告位、包名、权限、网络服务、真实设备或人工手势；静态审计只能确认代码路径和断言缺口。

本次未运行跨平台 Jest、真机和编译任务，因此没有把运行时通过率冒充为覆盖率。报告是按直接静态引用、现存侧栏/文档文件及上述排除口径完成的对照；未附 AST 分支覆盖工具，因此不把它表述为动态全量覆盖率报告。

## 8. 修复优先级

1. P0：修复 3 个错误条件写法、3 个全平台不可达测试、`live-pusher` 非法值、`getBatteryInfo` HarmonyOS 入口、App Vapor `@media`、selector 的 Web/MP 漏测。
2. P1：修正 list-view/waterflow/video/map/page-meta 的属性级平台条件；补 5 个无 Jest 组件、35 个无 Jest API、5 个无活动示例 CSS。
3. P1：用真正的 `skip` 或明确的环境前置失败替代恒真占位断言；为支持平台建立矩阵，尤其 MP、iOS Vapor、HarmonyOS。
4. P2：将文档属性/入参/回调/返回值自动生成覆盖清单，CI 校验“文档项 -> 页面控件/调用 -> 至少一个语义断言”的可追踪关系。
5. P2：先统一文档中的重复属性、空白兼容性和冲突表，再处理标为“待确认”的项目；`requestMerchantTransfer` 等 ext API 应先确定插件纳入策略，不能只放开页面条件。
