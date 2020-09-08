#### 2.8.11.20200904-alpha
* 【uni-app插件】
  + App-Android 修复 2.8.9版引出的 uni-AD 小概率出现获取广告配置数据失败导致无法显示开屏广告的Bug
* 【App插件(含5+App和uni-app的App端)】
  + iOS平台 修复 2.8.9版升级 QQ SDK引出的 在部分手机上无法正常分享到 QQ 的Bug [详情](https://ask.dcloud.net.cn/question/103383)

#### 2.8.10.20200903-alpha
* 【uni-app插件】
  + App-Android平台 修复 2.8.4版引出的 uni.request 请求默认超时时间过长的Bug
* 【uniCloud】
  + 修复 某些情况下，上传公共模块，UI卡顿的Bug
  + 调整 阿里云放开文件上传类型限制

#### 2.8.9.20200829-alpha
* 【uni-app插件】
  + 新增 uni.navigateTo 增加参数 events 支持页面间通信 [详情](https://uniapp.dcloud.net.cn/api/router?id=navigateto)
  + App平台、H5平台 优化 image 组件支持 mode="heightFix"
  + App平台 优化 uni.canvasToTempFilePath 提高执行速度
  + App平台 修复 app.vue 生命周期 onshow 某些情况下无参数的Bug [详情](https://ask.dcloud.net.cn/question/103903)
  + App平台 修复 input 组件修改 password 属性后 adjust-position 配置失效的Bug [详情](https://ask.dcloud.net.cn/question/103435)
  + App平台 修复 临时文件未清理的Bug [详情](https://ask.dcloud.net.cn/question/103456)
  + App平台 修复 nvue refresh 组件偶现下拉刷新结束后不复位的Bug [详情](https://github.com/dcloudio/uni-app/issues/1107)
  + App-Android平台 修复 Android11 设备运行白屏的Bug [详情](https://ask.dcloud.net.cn/question/105319)
  + App-Android平台 修复 2.8.4版引出的 uni.request 请求 cookie 与 webview 页面没有同步共享的Bug [详情](https://ask.dcloud.net.cn/question/103956)
  + App-Android平台 修复 2.8.4版引出的 nvue 无法加载网络字体图标文件 iconfont 的Bug [详情](https://ask.dcloud.net.cn/question/104655)
  + App-Android平台 修复 调用监听加速度、陀螺仪等 API 可能报`e.setInterval is not a function`错误的Bug [详情](https://ask.dcloud.net.cn/question/105584)
  + App-Android平台 修复 没有获取到位置权限时，调用 uni.chooseLocation 可能导致应用闪退的Bug [详情](https://ask.dcloud.net.cn/question/105312)
  + App-iOS平台 修复 scroll-view 组件在 iOS13 触摸交互卡顿的Bug [详情](https://ask.dcloud.net.cn/question/98881)
  + App-iOS平台 修复 nvue map 组件 controltap 事件返回数据参数名不正确的Bug [详情](https://ask.dcloud.net.cn/question/99769)
  + H5平台 优化 uni.previewImage 支持手势缩放
  + H5平台 修复 多个 editor 组件会重复加载依赖的Bug
  + H5平台 修复 从首页调用 uni.redirectTo 切换其他页面后首页未销毁的Bug [详情](https://ask.dcloud.net.cn/question/103503)
  + H5平台 修复 切换页面导致 textarea 组件 auto-height 属性失效的Bug
  + 小程序平台 修复 v-for 遍历复杂表达式不显示的Bug [#2012](https://github.com/dcloudio/uni-app/issues/2012)
* 【uniCloud】
  + 新增 本地运行 加入显示调试行号等信息
  + 修复 当npm镜像源为淘宝源时，某些云函数或公共模块上传失败的Bug
* 【App插件(含5+App和uni-app的App端)】
  + 新增 uni-AD 支持快手联盟的开屏和激励视频广告
  + 修复 下载文件设置的临时存储文件名过长时无法正常下载的Bug [详情](https://ask.dcloud.net.cn/question/103336)
  + Android平台 修复 UniPush 在部分魅族手机可能无法获取cid的Bug [详情](https://ask.dcloud.net.cn/question/102774)
  + Android平台 修复 设置targetversion为29时，从相册选择图片返回路径不正确的Bug [详情](https://ask.dcloud.net.cn/question/105269)
  + Android平台 修复 设置targetversion为29时，在部分 Android10 设备无法正常定位的Bug
  + iOS平台 更新 QQ 分享、登录SDK版本为3.3.9-Lite，解决分享到 QQ 显示未授权应用的问题
  + iOS平台 修复 设置页面横屏 landscape 显示时，在 iPad 设备上不显示状态栏的Bug [详情](https://ask.dcloud.net.cn/question/103386)
  + iOS平台 修复 视频播放控件 VideoPlayer 动态修改 objectFit 属性不生效的Bug

#### 2.8.7.20200820-alpha
* 【uni-app插件】
  + App-Android平台 修复 调用 plus.io.requestFileSystem 概率性出现`Failed to find taskCenter`错误信息的Bug [详情](https://ask.dcloud.net.cn/question/103902)
  + App-Android平台 修复 2.8.4版引出的 uni.request 请求 cookie 未正确处理可能引起网络请求失败的Bug [详情](https://ask.dcloud.net.cn/question/105139)
  + App-Android平台 修复 2.8.4版引出的 uni.request 请求返回的 http 响应头数据中 key 名称变成小写的Bug [详情](https://ask.dcloud.net.cn/question/103995)
  + 小程序平台 修复 v-for 中事件使用部分复杂的表达式编译报错的Bug
  + 小程序平台 修复 v-for 中嵌套 v-if 时部分复杂表达式编译后运行报错的Bug [#2011](https://github.com/dcloudio/uni-app/issues/2011)
  + 小程序平台 修复 修复部分自定义事件无参数时报错的Bug [#2021](https://github.com/dcloudio/uni-app/issues/2011)
  + 微信小程序平台 修复 属性使用复杂的对象表达式小程序开发工具编译报错的Bug [详情](https://ask.dcloud.net.cn/question/103944)
* 【uniCloud】
  + 优化 云函数插件支持写入components、js_sdk、static目录
  + web控制台 阿里云 新增 数据库集合导入导出功能 [详情](https://uniapp.dcloud.net.cn/uniCloud/cf-database?id=export)
  + web控制台 腾讯云 新增 资源概况页面
  + 短信发送 新增 3个通知类短信模板 [详情](https://uniapp.dcloud.net.cn/uniCloud/send-sms)
* 【App插件(含5+App和uni-app的App端)】
  + uni-AD 新增 信息流和激励视频的多广告源在App同次启动时随机穿插，可提升广告收益
  + uni-AD 新增 设置开屏全屏显示
  + Android平台 修复 uni-AD 开屏显示穿山甲广告点击跳过按钮后，再点击splash页面可能导致应用闪退的Bug [详情](https://ask.dcloud.net.cn/question/103601)
  + iOS平台 更新 UniPush 使用的个推SDK版本为2.4.5.1，解决在部分设备上获取唯一标识可能重复的问题
  + iOS平台 更新 uni-AD 腾讯广点通SDK版本为4.11.10，今日头条穿山甲SDK版本为3.1.0.5
  + iOS平台 修复 直播推流 LivePusher 监听事件后不触发回调的Bug

#### 2.8.4.20200805-alpha
* 【uni-app插件】
  + App平台、H5平台 优化 uni.setTabBarItem 支持 pagePath 配置
  + App平台、H5平台 修复 picker 组件设置 value 为 -1 时表现异常的Bug [#1553](https://github.com/dcloudio/uni-app/issues/1553)
  + App平台、H5平台 修复 editor 组件粘贴文字报错的Bug [详情](https://ask.dcloud.net.cn/question/102948)
  + App平台 新增 支持蓝牙相关接口 uni.setBLEMTU、uni.getBLEDeviceRSSI
  + App平台 优化 uni.request 支持返回 cookies 属性与微信小程序拉齐（基础库版本 2.10.0+）
  + App平台 修复 ibeacon 相关事件回调不触发的Bug [详情](https://ask.dcloud.net.cn/question/102136)
  + App平台 修复 当前 tab 页面不是配置的首页时，热刷新后 tabBar 消失的Bug [详情](https://ask.dcloud.net.cn/question/101612)
  + App平台 修复 从 nvue 页面调用 uni.reLaunch 切换到 vue 页面后无法设置状态栏的Bug [详情](https://ask.dcloud.net.cn/question/102594)
  + App-Android平台 更新 网络请求底层实现库 OKHttp 版本为3.12.11，提升 websocket 传输效率
  + 【重要】App-Android平台 修复 targetSdkVersion 设置为 29 时在 Android10 运行白屏的Bug，满足谷歌应用商店上架对targetSdkVersion的要求 [详情](https://ask.dcloud.net.cn/question/103166)
  + App-Android平台 修复 nvue input组件绑定值带小数点时显示异常的Bug [详情](https://ask.dcloud.net.cn/question/97745)
  + App-iOS平台 修复 nvue 页面 在 iOS9 系统白屏的Bug
  + H5平台 修复 picker 组件配置 mode="date" 且 fields="year" 时报错的Bug [#1687](https://github.com/dcloudio/uni-app/issues/1687)
  + 小程序平台 修复 v-for 中方法使用复杂表达式报错的Bug [#373](https://github.com/dcloudio/uni-app/issues/373)
  + 小程序平台 修复 v-for 中模板插值使用复杂表达式报错的Bug [详情](https://ask.dcloud.net.cn/question/102443)
  + 小程序平台 修复 v-for 遍历对象表达式报错的Bug [#449](https://github.com/dcloudio/uni-app/issues/449)
  + 小程序平台 修复 v-for 中属性值为对象表达式报错的Bug [#1450](https://github.com/dcloudio/uni-app/issues/1450)
  + 小程序平台 修复 v-for 遍历数值时模板中有复杂表达式不显示的Bug
  + 小程序平台 修复 v-if="false" 时标签内部的方法和过滤器仍然会执行的Bug [#334](https://github.com/dcloudio/uni-app/issues/334)
  + 微信小程序平台、QQ小程序平台、字节跳动小程序平台 优化 自定义组件支持 v-show 指令 [#1724](https://github.com/dcloudio/uni-app/issues/1724)
  + 支付宝小程序平台 修复 v-for 部分情况 key 不生效的Bug
  + 支付宝小程序平台 修复 支持 uni.getSavedFileList 接口
  + 支付宝小程序平台 修复 sjs 中 callMethod 不能正确调用的Bug
  + 头条小程序平台 修复 修复解构插槽不显示的Bug [详情](https://ask.dcloud.net.cn/question/80187)
  + uni-ui 新增 uni-list 组件的 clickable 属性，是否开启点击反馈
  + uni-ui 新增 uni-list 组件的 link 属性，显示右侧箭头并开启点击反馈
  + uni-ui 新增 uni-list 组件的 to 属性，直接跳转到指定页面
  + uni-ui 新增 uni-list 组件的 border 属性，是否显示列表分割线
  + uni-ui 新增 uni-rate 组件的 disabled 属性，可设置组件禁用状态（之前版本的不可点击状态）
  + uni-ui 新增 uni-rate 组件的 disabledColor 属性，可设置禁用颜色
  + uni-ui 新增 uni-rate 组件的 readonly 属性，可设置组件只读属性
  + uni-ui 新增 uni-rate 组件的 allowHalf 属性，可设置组件是否开启半星选择
  + uni-ui 新增 uni-rate 组件的 touchable 属性，可设置组件是否支持滑动手势
  + uni-ui 修复 uni-rate 组件动态传值不更新的问题
  + uni-ui 优化 uni-rate 组件的 value 属性可使用 v-model 双向绑定数据
  + uni-ui 优化 uni-popup 组件的扩展组件支持 easycom
  + uni-ui 新增 uni-swipe-action 组件的左侧滑动使用方式
  + uni-ui 新增 uni-swipe-action 组件的插槽使用方式
  + uni-ui 新增 uni-swipe-action 组件的 threshold 属性，可以控制滑动缺省值
  + uni-ui 修复 uni-swipe-aciotn 组件的滚动页面时触发滑动的Bug
  + uni-ui 优化 uni-swipe-action 组件的长列表滚动性能
* 【uniCloud】
  + 阿里云 新增 支持协作者本地运行云函数
  + 修复 HBuilderX 2.8.0引出的 公共模块右键菜单 更新依赖本模块的云函数菜单丢失的Bug
* 【App插件(含5+App和uni-app的App端)】
  + 新增 蓝牙设置最大传输单元 setBLEMTU，获取设备信号强度 getBLEDeviceRSSI 等功能 [文档](https://www.html5plus.org/doc/zh_cn/bluetooth.html#plus.bluetooth.setBLEMTU)
  + 修复 Webview窗口标题栏 titleNView 设置为透明样式时按钮的背景区域无法自适应的Bug
  + Android平台 更新 UniPush 使用的个推SDK国内渠道版本为2.14.1.0，提升消息推送到达率
  + Android平台 调整 UniPush 和 个推推送 谷歌渠道默认不显示隐私政策提示框 [详情](https://ask.dcloud.net.cn/article/36479)
  + Android平台 修复 UniPush 谷歌渠道设置不显示隐私政策提示框可能导致获取推送标识信息失败的Bug
  + Android平台 优化 native.js 自动回收对象 autoCollection 机制，避免应用长时间运行内存回收不及时的问题
  + Android平台 修复 从相册图片中扫描二维码识别率低的Bug [详情](https://ask.dcloud.net.cn/question/88500)
  + Android平台 修复 保存部分视频文件添加至相册可能无法正常显示的Bug [详情](https://ask.dcloud.net.cn/question/102669)
  + Android平台 修复 自定义基座 wap2app 真机运行 tab 无法切换的Bug [详情](https://ask.dcloud.net.cn/question/102492)
  + iOS平台 修复 直播推流 LivePusher 设置 whiteness 美白属性值不生效的Bug [详情](https://ask.dcloud.net.cn/question/102761)
  + iOS平台 修复 状态栏样式设置为非沉浸式在 iPad 设备上横屏时状态栏显示不正常的Bug
* 【uni小程序SDK】
  + Android平台 优化 小程序后台运行功能，支持关闭多任务窗口 [详情](https://nativesupport.dcloud.net.cn/UniMPDocs/API/android?id=setenablebackground)
  + Android平台 修复 小程序在manifest.json配置固定横屏或竖屏方向无效的Bug

#### 2.8.3.20200727-alpha
* 【uni-app插件】
  + H5平台 修复 启用摇树优化后 audio 组件编译报错的Bug [#1943](https://github.com/dcloudio/uni-app/issues/1943)

#### 2.8.2.20200724-alpha
* 【uni-app插件】
  + 支付宝小程序平台 修复 使用 await/async 报错的Bug [详情](https://ask.dcloud.net.cn/question/101714)
  + App-iOS平台 修复 2.8.1版引出的 nvue video 组件中 cover-view 无法覆盖显示的Bug [详情](https://ask.dcloud.net.cn/question/102165)
  + App-iOS平台 修复 nvue textarea 组件设置 auto-height 为 true 时传入初始值高度没有自适应的Bug [详情](https://github.com/dcloudio/uni-app/issues/992)
  + App-iOS平台 修复 nvue textarea 组件 linechange 事件不触发的Bug [详情](https://ask.dcloud.net.cn/question/91477)
* 【uniCloud】
  + 阿里云 修复 本地运行时云函数互调报错的Bug
* 【App插件(含5+App和uni-app的App端)】
  + iOS平台 修复 previewImage 预览图片在 iOS14 上导致应用闪退的Bug [详情](https://ask.dcloud.net.cn/question/100379)
* 【uni小程序SDK】
  + Android平台 修复 2.8.1版引出的 通过 DCUniMPSDK.getInstance().startApp 运行小程序丢失启动参数的Bug

#### 2.8.1.20200721-alpha
* 【uni-app插件】
  + App平台 修复 audio 组件不显示的Bug
  + App平台 修复 backgroundAudioManager onCanPlay 事件失效的Bug
  + App-Android平台 修复 部分平板设备 rpx 计算错误的Bug  [#1848](https://github.com/dcloudio/uni-app/issues/1848)
  + App-Android平台 修复 系统日期选择框 pickDate 设置默认、最大、最小日期不生效的Bug [详情](https://ask.dcloud.net.cn/question/95065)
  + App-Android平台 修复 2.8.0版引出的 页面切换后 input 组件设置 focus 属性可能无法正常输入的Bug [详情](https://ask.dcloud.net.cn/question/100771)
  + App-Android平台 修复 2.8.0版引出的 uni.request 请求部分网络接口可能失败的Bug
  + App-Android平台 修复 tabBar 页面首次启动可能显示区域不正常的Bug [详情](https://ask.dcloud.net.cn/question/100898)
  + App-Android平台 修复 软键盘弹出时执行 uni.reLaunch 在Android10上会导致应用闪退的Bug [详情](https://github.com/dcloudio/uni-app/issues/1895)
  + App-Android平台 修复 subNvue 原生子窗体动态显示隐藏可能引起 map 组件显示异常的Bug
  + App-iOS平台 修复 2.8.0版引出的 页面中使用 video 组件跳转到其他页面会导致应用闪退的Bug [详情](https://ask.dcloud.net.cn/question/100806)
  + App-iOS平台 修复 nvue video 组件在页面关闭后仍在后台播放，再次打开页面出现播放异常的Bug [详情](https://ask.dcloud.net.cn/question/100943)
  + App-iOS平台 修复 nvue 页面开启下拉刷新 enablePullDownRefresh 后，配置自定义导航栏显示不正常的Bug [详情](https://ask.dcloud.net.cn/question/100506)
  + 小程序平台 修复 组件的部分写法编译报错的Bug [详情](https://ask.dcloud.net.cn/question/101132)
  + 小程序平台 修复 作用域插槽中定义的 class 样式不生效的Bug [详情](https://ask.dcloud.net.cn/question/100724)
  + 小程序平台 修复 修复组件嵌套时解构插槽内事件报错的Bug [详情](https://ask.dcloud.net.cn/question/99063)
  + 小程序平台 修复 匿名插槽和具名插槽 default 不等同的Bug
  + 微信小程序平台 新增 支持生命周期 onUnhandleRejection、onShareTimeline（分享小程序到朋友圈）、onAddToFavorites
  + 微信小程序平台 优化 支持作用域插槽当作普通插槽使用 [详情](https://ask.dcloud.net.cn/question/98634)
  + 支付宝小程序平台 修复 作用域插槽不显示的Bug [#1253](https://github.com/dcloudio/uni-app/issues/1253)
  + 新建uni-app项目模板，新增来自插件市场腾讯云提供的discus!Q模板 [详情](https://ext.dcloud.net.cn/plugin?id=2336)
* 【uniCloud】
  + 【重要】新增 本地运行云函数，可连接远程数据库和云存储，大幅提升开发效率，同时方便数据导入导出 [详情](https://uniapp.dcloud.net.cn/uniCloud/quickstart?id=runlocal)
  + 【重要】新增 插件市场支持云函数付费销售，欢迎插件作者们提交高质量可售卖插件
  + 【重要】新增 uniCloud.sendSms 短信发送能力，可方便、便宜的发送验证码短信 [详情](https://uniapp.dcloud.net.cn/uniCloud/send-sms)
  + 修复 2.7.12版本引出的支付宝小程序、百度小程序下使用 uniCloud 报错的Bug
  + 修复 2.7.12版本引出的H5端 main.js 内使用 uniCloud 导致 uniCloud 不可使用的Bug
* 【App插件(含5+App和uni-app的App端)】
  + Android平台 uni-AD 更新 360广告SDK版本为5.17.3157
  + Android平台 修复 视频播放 VideoPlayer 的 src 属性无法切换相同ip不同端口的流媒体链接地址的Bug [详情](https://ask.dcloud.net.cn/question/95951)
  + Android平台 修复 消息提示框 toast 在 MIUI12 显示不正常的Bug [详情](https://ask.dcloud.net.cn/question/100601)
  + Android平台 修复 Webview窗口的 iframe 中调用请求权限 requestPermissions 报错的Bug [详情](https://ask.dcloud.net.cn/question/100592)
  + Android平台 修复 Webview窗口设置 scrollIndicator 属性可能不生效的Bug
  + Android平台 修复 连接蓝牙设备 createBLEConnection 设置 timeout 属性无效的Bug
  + Android平台 修复 获取蓝牙设备指定服务特征值的 write 属性值可能不正确的Bug [详情](https://ask.dcloud.net.cn/question/99149) 
  + iOS平台 修复 uni-AD 开屏广告点击特定基础广告时可能引起应用卡死的Bug
  + iOS平台 修复 连接多个蓝牙设备时，特征值变化事件 onBLECharacteristicValueChange 回调触发异常的Bug [详情](https://ask.dcloud.net.cn/question/99858)
  + iOS平台 修复 sqlite 执行查询SQL语句读取 big integer 类型数据不准确的Bug [详情](https://ask.dcloud.net.cn/question/100234)
  + iOS平台 修复 音频 audio 连接 airpods 等外接设备时依然使用手机扬声器播放的Bug [详情](https://ask.dcloud.net.cn/question/100719)
* 【uni小程序SDK】
  + Android平台 优化 小程序进程为应用私有进程，名称调整为`宿主包名:io.dcloud.unimp`，防止其他APP调用
  + Android平台 修复 小程序启动界面可能出现闪屏的Bug
  + iOS平台 优化 小程序启动流程，Hello uni-app 示例应用启动速度提升2倍，在iPhone11设备实测400ms内打开应用首页
  + iOS平台 修复 发送短信 sendMessage API无效的Bug

#### 2.8.0.20200701-alpha
* 【uni-app插件】
  + 优化 编译错误提示更准确，新增采集未知的编译器错误
  + App平台 修复 uni.hideLoading 会把 uni.showToast 隐藏掉的Bug
  + App平台 修复 uploadTask.abort 无效的Bug [详情](https://ask.dcloud.net.cn/question/99364)
  + App平台 修复 nvue 页面 Promise 不支持 finally 方法的Bug
  + App平台 修复 局部组件 props 中的 id 会覆盖根节点 id 属性的问题 [详情](https://ask.dcloud.net.cn/question/99900)
  + 【重要】App-Android平台 调整 JS引擎默认从 jscore 改为 V8，提升运算性能 [详情](https://ask.dcloud.net.cn/article/37465)
  + App-Android平台 新增 支持DNS解析时优先使用ipv4 [详情](https://uniapp.dcloud.net.cn/api/request/request)
  + App-Android平台 修复 启动分包后云端打包可能出现页面无法正常显示的Bug [详情](https://ask.dcloud.net.cn/question/100023)
  + App-Android平台 修复 map 组件 position 样式设置为 fixed 后可能出现地图控件无法正常显示的Bug [详情](https://ask.dcloud.net.cn/question/100128)
  + App-Android平台 修复 tabbar 页面中 webview 组件在 wgt 升级后可能出现白屏的Bug [详情](https://ask.dcloud.net.cn/question/99253)
  + App-Android平台 修复 nvue 页面使用 video 组件切换到其它 vue 页面后 input 组件无法唤起软键盘的Bug [详情](https://ask.dcloud.net.cn/question/97197)
  + App-Android平台 修复 nvue input、textarea 组件设置 adjust-position 为 false 后切换页面可能无法唤起软键盘的Bug [详情](https://ask.dcloud.net.cn/question/99416)
  + App-Android平台 修复 nvue webview 组件设置 webview-styles 的 progress 属性值后进度条显示不正常的Bug
  + App-Android平台 修复 全面屏手机横屏时页面宽高可能不正确的Bug [详情](https://ask.dcloud.net.cn/question/99365)
  + App-iOS平台 修复 iOS12以下版本 切换到深色背景页面出现闪白的Bug。需注意当 pages.json 文件中配置窗口背景色与页面 style 节点设置背景色不一致时仍可能会闪屏 [详情](https://ask.dcloud.net.cn/question/99453)
  + App-iOS平台 修复 video 组件中使用 cover-image 退出全屏后不显示的Bug [详情](https://ask.dcloud.net.cn/question/98498)
  + App-iOS平台 修复 nvue map 组件 moveToLocation 方法不触发回调的Bug [详情](https://ask.dcloud.net.cn/question/99638)
  + App-iOS平台 修复 nvue web-view 组件 schemes 无法跳转打开其他应用的Bug [详情](https://ask.dcloud.net.cn/question/99331)
  + App-iOS平台 修复 nvue 页面 picker-view 组件滚动错位的Bug
  + H5平台 修复 onPageNotFound 生命周期无效的Bug [#1743](https://github.com/dcloudio/uni-app/issues/1743)
  + H5平台 修复 iOS微信内置浏览器打开位置相关页面后无法后退的Bug [#1789](https://github.com/dcloudio/uni-app/issues/1789)
  + 微信小程序 修复 多个 v-for 嵌套时部分情况下绑定事件报错的Bug [详情](https://gitee.com/dcloud/uni-app/issues/I1KNYW)
  + 登录模版 升级 集成 uni-id 补充云函数，实现前后一体、功能完整的登录注册模板 [详情](https://github.com/dcloudio/uni-template-login)
* 【uniCloud】
  + 【重要】新增[uni-id](https://uniapp.dcloud.net.cn/uniCloud/uni-id)，实现简单、统一、可扩展的用户中心，推荐每个 uniCloud 开发者使用
  + 新增 callfunction时自动携带`uni-id`的token，无需自行开发token管理方案
  + 新增 web控制台 腾讯云 云数据库备份和恢复功能 [详情](https://uniapp.dcloud.io/uniCloud/cf-database?id=backup)
  + 新增 web控制台 腾讯云 云数据库集合名称修改功能
  + 修复 云函数内获取客户端系统类型可能为空的Bug
  + 修复 HBuilderX 导入包含common目录的云函数模板，导致原common目录被覆盖的Bug
  + 优化 HBuilderX 新建公共模块增加名称不能包含大写字母的限制
  * 修复 HBuilderX 某些情况下，上传公共模块，出现npm install失败的Bug
  + 修复 HBuilderX 公共模块 右键菜单出现两个上传公共模块菜单的Bug
  + 修复 HBuilderX 上传公共模块没有填写appid时的错误提示与上传云函数不一致的Bug
* 【App插件(含5+App和uni-app的App端)】
  + uni-AD 更新 穿山甲SDK Android更新为3.1.0.0版、iOS更新为3.1.0.1版；腾讯广告联盟SDK Android更新为4.232.1102版、iOS更新为4.11.9版。请使用广告的开发者尽早升级，老版本在部分新手机上有闪退现象
  + Android平台 修复 请求权限 plus.android.requestPermissions 传入无效权限可能引起应用崩溃的Bug
  + Android平台 修复 视频播放 安卓9及以下的刘海屏手机上全屏播放引起闪退的Bug [详情](https://ask.dcloud.net.cn/question/99064)
  + Android平台 修复 从系统相册选择文件设置最多选择图片数量 maximum 后不会触发 onmaxed 事件的Bug [详情](https://ask.dcloud.net.cn/question/100062)
  + 【重要】iOS平台 新增 云端打包支持配置自定义storyboard启动界面 [详情](https://ask.dcloud.net.cn/article/37475)
  + iOS平台 修复 uni-AD 同时并发调用多次获取信息流广告可能导致无法返回广告数据的Bug
  + iOS平台 修复 应用首页加载网络页面在启动时可能偶现白屏的Bug [详情](https://ask.dcloud.net.cn/question/99572)
  + iOS平台 修复 Webview窗口直接加载mp4视频可能显示错误页面的Bug
  + iOS平台 修复 sqlite 执行查询SQL语句读取 blob 类型数据返回乱码的Bug [详情](https://ask.dcloud.net.cn/question/98721)
  + iOS平台 修复 连接蓝牙设备 createBLEConnection 超时不触发错误回调的Bug
  + iOS平台 修复 连接蓝牙设备后 可能无法写入数据的Bug
  + iOS平台 修复 连接蓝牙设备断开后 可能无法再次连接的Bug
* 【uni小程序SDK】
  + iOS平台 新增 预加载小程序功能，可提升初次启动速度 [详情](https://nativesupport.dcloud.net.cn/UniMPDocs/Sample/ios?id=%e9%a2%84%e5%8a%a0%e8%bd%bd%e5%b0%8f%e7%a8%8b%e5%ba%8f)
  + iOS平台 新增 小程序支持后台运行功能，可提升二次启动速度 [详情](https://nativesupport.dcloud.net.cn/UniMPDocs/Sample/ios?id=%e5%bc%80%e5%90%af%e5%90%8e%e5%8f%b0%e8%bf%90%e8%a1%8c)

#### 2.7.13.20200615-alpha
* 【uni-app插件】
  + App-nvue平台 修复 HBuilderX 2.7.12 alpha 版引发的 纯 nvue 项目编译出错的Bug [详情](https://ask.dcloud.net.cn/question/99356)
  + App-Android平台 修复 nvue web-view 组件 schemes 无法跳转打开其它应用的Bug [详情](https://ask.dcloud.net.cn/question/99331)

#### 2.7.12.20200613-alpha
* 【uni-app插件】
  + 【重要】新增 自动化测试 [详情](https://uniapp.dcloud.io/collocation/auto/quick-start)
  + 【重要】新增 运行和发布到快应用联盟 [详情](https://uniapp.dcloud.io/quickstart?id=quickapp-webview)
  + App-nvue平台、H5平台 新增 API uni.preloadPage 预加载页面 [详情](https://uniapp.dcloud.net.cn/api/preload-page)
  + App-vue平台 新增 分包支持，可提升大型App启动速度 [详情](https://uniapp.dcloud.io/collocation/manifest?id=app-vue-optimization)
  + 补充 uni-app 部署 H5 到相对路径/使用file协议教程 [详情](https://ask.dcloud.net.cn/article/37432)
  + App平台、H5平台 修复 -1rpx、-1upx被错误的计算为1px的Bug [详情](https://ask.dcloud.net.cn/question/98270)
  + App平台 修复 map 组件 markers 无 id 时无法移除的Bug
  + App平台 修复 map 组件 监听 regionchange 事件报错的Bug
  + App平台 修复 textarea 组件初始化时配置 focus 属性无法获取焦点的Bug
  + App-Android平台 修复 map 组件可能无法正常显示的Bug
  + App-Android平台 修复 nvue map 组件 markers 上的气泡 callout 会跟随旋转的Bug [详情](https://ask.dcloud.net.cn/question/98195)
  + App-Android平台 修复 nvue web-view 组件中 input 标签设置 type 为 file 时选择拍照后可能无法返回图片路径的Bug
  + App-iOS平台 修复 uni.request 参数 data 为非字符串时请求失败的Bug
  + App-iOS平台 修复 uni.showToast 部分情况文本显示不全的Bug [详情](https://ask.dcloud.net.cn/question/98349)
  + H5平台 修复 picker-view 组件某些情况设置 value 不生效的Bug
  + hello uni-app 新增 在navigator示例和日历扩展ui示例中增加页面预载示例
* 【uniCloud】
  + 【重要】新增 前端网页部署。uni-app的H5页面或普通html网站，均可免费部署到uniCloud，不用再购买传统云，高速、省钱、省心。 [详情](https://uniapp.dcloud.io/uniCloud/hosting)
* 【App插件(含5+App和uni-app的App端)】
  + Android平台 修复 uni-AD 腾讯广点通开屏广告可能出现填充率过低的Bug
  + Android平台 修复 uni-AD 创建多个激励视频广告引起 onLoad onClose onError 事件回调错乱的Bug
  + Android平台 修复 选择按钮框 actionSheet 设置 title 并且 buttons 设置过多可能显示不正常的Bug [详情](https://ask.dcloud.net.cn/question/98476)
  + Android平台 修复 原生导航标题栏 titleNView 的 searchInput 搜索框动态更新后可能触发多次输入内容更新事件的Bug [详情](https://ask.dcloud.net.cn/question/98190)
  + Android平台 修复 音频 audio 的 seek 操作不触发 seeked 事件的Bug [详情](https://ask.dcloud.net.cn/question/78711)
  + Android平台 修复 图片预览 previewImage 无法显示bmp格式图片文件的Bug
  + Android平台 修复 HBuilderX2.6.11 引出的 Webview窗口设置 background 为 transparent 不生效的Bug
  + iOS平台 修复 视频播放 VideoPlayer 与 直播推流 LivePusher 同时使用时没有声音的Bug [详情](https://ask.dcloud.net.cn/question/97479)
  + iOS平台 修复 搜索蓝牙设备 startBluetoothDevicesDiscovery 可能不触发 onBluetoothAdapterStateChange 事件的Bug
  + iOS平台 修复 搜索蓝牙设备 startBluetoothDevicesDiscovery 连续调用多次触发失败回调的Bug

#### 2.7.11.20200602-alpha
* 【uni-app插件】
  + 【重要】支持运行和发布到 华为快应用 [详情](https://uniapp.dcloud.io/matter?id=quickapp-webview-huawei)
  + App平台 修复 使用小程序组件时局部组件不显示的Bug
  + App平台 修复 canvasContext.fillText 部分设备多次调用失败的Bug [详情](https://ask.dcloud.net.cn/question/97609)
  + App平台 修复 canvasContext.drawImage 无法绘制 base64 格式图像的Bug [详情](https://ask.dcloud.net.cn/question/95050)
  + App平台 修复 videoContext.stop 无效的Bug
  + App-Android平台 修复 HBuilderX2.7.8引出的 tabBar 页面无法动态更新原生导航标题栏 titleNView 的Bug
  + App-Android平台 修复 uni.reLaunch 关闭所有页面打开应用内某个页面后，uni.hideTabBar失效的Bug [详情](https://ask.dcloud.net.cn/question/97140)
  + App-Android平台 修复 uni.scanCode 二维码扫描预览界面在横屏状态下变形的Bug [详情](https://ask.dcloud.net.cn/question/96473)
  + App-Android平台 修复 uni.setNavigationBarTitle 可能不生效的Bug [详情](https://ask.dcloud.net.cn/question/97791)
  + App-Android平台 修复 wgt热更新后 uni.navigateTo 可能返回找不到访问页面错误的Bug [详情](https://ask.dcloud.net.cn/question/97930)
  + App-Android平台 修复 nvue video 组件 controls 设置为 false 时 click 事件在非全屏状态下无法触发的Bug [详情](https://ask.dcloud.net.cn/question/97439)
  + App-Android平台 修复 nvue video 组件 seek 后再设置 src 属性会导致进度跳到视频末尾的Bug [详情](https://ask.dcloud.net.cn/question/97439)
  + App-Android平台 修复 nvue livepusher 组件 device-position 属性不生效的Bug [详情](https://ask.dcloud.net.cn/question/96784)
  + App-Android平台 修复 nvue webview 组件加载网页中使用 schemes 跳转就会报错的Bug [详情](https://ask.dcloud.net.cn/question/97271)
  + App-iOS平台 修复 nvue waterfall、list、scroll-view 组件中的 loading 组件可能显示不正常的Bug [详情](https://ask.dcloud.net.cn/question/93128)
  + App-iOS平台 修复 nvue video 组件在 list 中滑动后视频可能无法正常播放的Bug
  + H5平台 修复 启用摇树优化后部分 es6 语法未转换成 es5 的Bug [详情](https://ask.dcloud.net.cn/question/98104)
  + H5平台 修复 PC 端获取屏幕宽高错误的Bug [详情](https://ask.dcloud.net.cn/question/97721)
  + 支付宝小程序 修复 nvue 页面编译后部分样式失效的Bug
  + 钉钉小程序 修复 真机使用 uni.request 发送 content-type 为 application/json 的请求时报错的Bug [详情](https://ask.dcloud.net.cn/question/97570)
* 【uniCloud】
  + 新增 HBuilderX 支持上传所有云函数及公共模块 （cloudfunctions目录，右键菜单，上传所有云函数及公共模块）
  + 新增 HBuilderX 限制新建云函数名称不能为common，避免与公共模块冲突
  + 修复 钉钉小程序真机上传文件到云存储报错的Bug [详情](https://ask.dcloud.net.cn/question/97570)
  + 腾讯云 优化 HBuilderX开发调试期间访问云函数的性能
  + 腾讯云 修复 上传文件时不进入onUploadProgress的Bug [详情](https://ask.dcloud.net.cn/question/97532)
* 【App插件(含5+App和uni-app的App端)】
  + 【重要】Android平台 新增 UniPush 支持谷歌推送FCM [文档](https://ask.dcloud.net.cn/article/37356)
  + Android平台 修复 uni-AD 腾讯广点通信息流广告可能显示不全的Bug [详情](https://ask.dcloud.net.cn/question/97376)
  + Android平台 修复 uni-AD 今日头条穿山甲点击广告开始下载后不能暂停或取消的Bug
  + Android平台 修复 uni-AD 创建信息流广告控件 createAdView 没有设置 id 时可能导致在当前页面无法再次创建的Bug
  + Android平台 修复 软键盘状态变化事件 keyboardchange 监听后回调不触发的Bug [详情](https://ask.dcloud.net.cn/question/97070)
  + iOS平台 修复 原生导航标题栏动态更新按钮样式 setTitleNViewButtonStyle 可能导致图标显示异常的Bug [详情](https://ask.dcloud.net.cn/question/96426)

#### 2.7.8.20200525-alpha
* 【uni-app插件】
  + 小程序平台 修复 组件 class 属性无值时报错的Bug
  + uni统计 修复 2.7.0.20200501-alpha 引出的统计数据上报不完整，导致uni统计日活偏少的Bug
  + App-Android平台 修复 tabbar 页面在部分手机可能高度显示不正确的Bug

#### 2.7.7.20200522-alpha
* 【uni-app插件】
  + App平台 修复 HBuilderX 2.7.6 引出的纯nvue项目编译出错的Bug [详情](https://ask.dcloud.net.cn/question/97264)
  + App-Android平台 修复 HBuilderX2.7.0 引出的 uni.request 网络请求 header 设置参数设置 content-type 无效的Bug [详情](https://ask.dcloud.net.cn/question/97246)
  + App-iOS平台 修复 pages.json 设置窗口背景色 backgroundColor 可能引起页面背景色不正确的Bug

#### 2.7.6.20200521-alpha
* 【uni-app插件】
  + 【重要】支持运行和发布到 360小程序 [详情](https://uniapp.dcloud.io/matter?id=mp-360)
  + App平台 修复  class 名称中含有 rpx、upx 时不生效的Bug [详情](https://ask.dcloud.net.cn/question/96981)
  + App-Android平台 修复 HBuilderX2.7.0 引出的 uni.hideTabBar 隐藏 tabbar 后页面高度可能不正确的Bug [详情](https://ask.dcloud.net.cn/question/96244)
  + App-Android平台 修复 nvue textarea 组件获取焦点后在部分手机可能会被软键盘遮挡的Bug [详情](https://ask.dcloud.net.cn/question/96914)
  + App-Android平台 修复 nvue live-pusher 组件调用 pause 方法暂停推流后依然录音的Bug [详情](https://ask.dcloud.net.cn/question/96411)
  + App-Android平台 修复 nvue web-view 组件中 input 标签设置 type 为 file 时无法选择文件的Bug [详情](https://ask.dcloud.net.cn/question/95220)
  + App-iOS平台 修复 vue 页面回弹无效果的Bug [详情](https://ask.dcloud.net.cn/question/91356)
  + App-iOS平台 修复 nvue ad 组件在 list 中使用可能引起滚动卡顿的Bug
  + App-iOS平台 修复 nvue web-view 组件在页面关闭时可能引起应用崩溃的Bug [详情](https://ask.dcloud.net.cn/question/97064)
  + H5平台 修复 配置基础路径为 ./ 打包后 image 组件显示异常的Bug [详情](https://ask.dcloud.net.cn/question/96767)
* 【uniCloud】
  + 【重要】 腾讯云开放，不再需要邮件申请
* 【App插件(含5+App和uni-app的App端)】
  + 新增 原生导航标题栏 titleNView 的 titleIconWidth 支持设置标题图标宽度
  + 新增 原生导航标题栏 titleNView 的 searchInput 搜索框支持清除按钮
  + 修复 原生导航标题栏 titleNView 的 titleIcon 设置 base64 图标无法支持 gif 格式图片的Bug
  + Android平台 更新 uni-AD 腾讯广点通SDK版本为4.211.1081
  + Android平台 更新 UniPush 使用的个推SDK谷歌渠道版本为4.3.8.0
  + Android平台 修复 uni-AD 腾讯广点通开屏广告可能拉伸变形显示的Bug
  + Androad平台 修复 uni-AD 开屏广告在刘海屏手机上跳过按钮可能被遮挡的Bug
  + Android平台 修复 视频播放 video 全屏时在刘海屏手机上控制栏可能被遮挡的Bug
  + Android平台 修复 页面中 input 标签 type 为 file 点击打开的选择页面不支持国际化的Bug
  + iOS平台 更新 uni-AD 今日头条穿山甲SDK版本为3.0.0.1
  + iOS平台 修复 初始化蓝牙模块 openBluetoothAdapter 可能在没有打开蓝牙时也会返回成功回调的Bug
  + iOS平台 修复 previewImage 预览图片连续快速滑动时可能显示不正常的Bug [详情](https://ask.dcloud.net.cn/question/96445)
  + iOS平台 修复 原生导航标题栏 titleNView 动态设置 type 为 transparent 可能显示不正常的Bug [详情](https://ask.dcloud.net.cn/question/96556)

#### 2.7.4.20200515-alpha
* 【uni-app插件】
  + App-Android平台 修复 真机运行时提示HBuilderX版本与手机端SDK版本不匹配的Bug
* 【uniCloud】
  + 阿里云 优化 云函数冷启动时间，经测试冷启动时间平均减少800ms

#### 2.7.3.20200514-alpha
* 【uni-app插件】
  + App平台 修复 css 中静态资源路径解析不正确的Bug
  + App-iOS平台 修复 HBuilderX2.7.0 引出的配置底部安全区原生占位后，tabbar 动态更新 backgroundColor、backgroundImage 不生效的Bug
* 【App插件(含5+App和uni-app的App端)】
  + iOS平台 更新 uni-AD 腾讯广点通SDK版本为4.11.8，解决在部分设备可能出现启动时崩溃的Bug

#### 2.7.2.20200513-alpha
* 【uni-app插件】
  + 优化 pages.json 兼容 subPackages 与 subpackages 写法
  + App平台、H5平台 修复 swiper 组件设置 current 时滚动方向错误的Bug [详情](https://ask.dcloud.net.cn/question/94961)
  + App平台 修复 页面 onLoad 参数部分情况不正确的Bug
  + App平台 修复 cover-image 组件部分情况显示不全的Bug [详情](https://ask.dcloud.net.cn/question/94554)
  + App平台 修复 storage 中读取 Array 类型数据解析不正确的Bug [详情](https://ask.dcloud.net.cn/question/96139)
  + App-Android平台 修复 v3版本 真机运行修改代码保存后应用重启，可能无法直接显示应用重启前页面的Bug
  + App-iOS平台 修复 nvue richtext 组件 lines、text-overflow 属性不生效的Bug [详情](https://ask.dcloud.net.cn/question/94667)
  + App-iOS平台 修复 tabBar 同时设置 blurEffect 和 backgroundColor 时 uni.getSystemInfo 获取到 windowBottom 错误的Bug
  + H5平台 优化 video 组件支持 show-center-play-btn 配置
  + H5平台 修复 storage 中读取 Date 类型数据解析不正确的Bug [#1661](https://github.com/dcloudio/uni-app/issues/1661)
  + H5平台 修复 Safari 浏览器横屏状态获取宽度错误的Bug [详情](https://ask.dcloud.net.cn/question/95997)
  + 微信小程序平台 修复 页面中同一个组件多个实例相同作用域插槽异常的Bug [#1662](https://github.com/dcloudio/uni-app/issues/1662)
* 【App插件(含5+App和uni-app的App端)】
  + iOS平台 修复 音频 audio 播放网络音频资源缓冲时间过长的Bug [详情](https://ask.dcloud.net.cn/question/93427)
* 【uni小程序SDK】
  + iOS平台 修复 video 组件退出全屏后页面布局错位的Bug

#### 2.7.1.20200510-alpha
* 【uni-app插件】
  + 修复 easycom 组件优先级高于用户组件同名组件的Bug
  + App平台 新增 tabbar 支持 backgroundImage 属性设置背景图片及渐变色
  + App平台 优化 短时间内调用 uni.navigateTo 避免重复跳转页面
  + App平台 修复 页面生命周期 onUnload 部分表现与旧版表现不一致的Bug [详情](https://ask.dcloud.net.cn/question/94649)
  + App平台 修复 picker 组件点击事件不冒泡的Bug [详情](https://ask.dcloud.net.cn/question/95716)
  + App平台 修复 picker 组件打包后不显示的Bug [详情](https://ask.dcloud.net.cn/question/96014)
  + App平台 修复 video 组件打包后不显示进度条的Bug [详情](https://ask.dcloud.net.cn/question/95946)
  + App平台 修复 editor 组件 br 标签不解析的Bug [详情](https://ask.dcloud.net.cn/question/95819)
  + H5平台 修复 tabBar 页面 redirectTo 到其他页面，tabBar 仍然显示的Bug [详情](https://ask.dcloud.net.cn/article/36364)
* 【App插件(含5+App和uni-app的App端)】
  + 新增 Webview窗口标题栏 titleNView 的 titleIcon 支持 GIF 格式动图
  + Android平台 修复 数据库执行查询SQL语句读取 REAL、BIGINT 等类型数值丢失精度的Bug [详情](https://ask.dcloud.net.cn/question/92964)
  + Android平台 修复 plus.gallery.save 保存网络图片成功后在系统相册中可能无法显示的Bug [详情](https://ask.dcloud.net.cn/question/75901)
  + Android平台 修复 使用 X5 Webview 内核渲染时，标题栏搜索框 searchinput 设置 autoFocus 为 true 可能无法自动获取焦点的Bug
  + Android平台 修复 使用 X5 Webview 内核渲染时，广告、视频等原生组件可能无法滚动的Bug
  + iOS平台 修复 在 iPad 设备横屏时 getSafeAreaInsets 获取安全区域的 top 值不正确的Bug [详情](https://ask.dcloud.net.cn/question/95645)
  + iOS平台 修复 Webview窗口标题栏搜索框 searchinput 动态修改 align 属性不生效的Bug

#### 2.7.0.20200501-alpha
* 【uni-app插件】
  + 【重要】 调整 App平台 自定义组件编译模式下线，应用默认以v3编译模式运行。并在manifest去除相关概念。包体积减少3M [详情](https://ask.dcloud.net.cn/article/36988)
  + 【重要】 调整 uni统计默认不再自动开启，需要此服务请手动在manifest中打开 [详情](https://ask.dcloud.net.cn/article/37234)
  + uni-app cli版支持发行到快应用平台 [详情](https://ask.dcloud.net.cn/article/37182)
  + App平台、H5平台 修复 textarea 组件 word-break 样式不生效的Bug [详情](https://ask.dcloud.net.cn/question/95172)
  + App平台、H5平台 新增 支持 onNavigationBarSearchInputFocusChanged 生命周期
  + App平台 优化 在去掉自定义组件模式的情况下保证 weex 编译模式仍然可用（nvueCompiler：weex）。但推荐开发者尽快迁移到uni-app编译模式
  + App平台 修复 input、textarea 组件快速输入时光标抖动的Bug [详情](https://ask.dcloud.net.cn/question/90460)
  + App平台 修复 pages.json 缺少 globalStyle 节点白屏的Bug
  + App平台 修复 picker 组件日期模式缺少 start 或 end 无法选择的Bug
  + App平台 修复 uni.onKeyboardHeightChange 重复监听的Bug [详情](https://ask.dcloud.net.cn/question/91818)
  + App平台 修复 downloadTask.abort 不生效的Bug [详情](https://ask.dcloud.net.cn/question/93342)
  + App平台 修复 uni.showModal 方法 content 不可为空的Bug [详情](https://ask.dcloud.net.cn/question/87180)
  + App平台 修复 nvue button 组件某些情况下 loading 样式异常的Bug [详情](https://ask.dcloud.net.cn/question/95422)
  + App平台 新增 nvue scrollview、list、waterfall、recycle-list等组件支持 scroll-top、scroll-left 属性
  + App平台 新增 video 组件支持 controlstoggle 事件
  + H5平台 修复 启用摇树优化后可能导致uniCloud功能不正常的Bug [详情](https://ask.dcloud.net.cn/question/94993)
  + 支付宝小程序 修复 uni.scanCode 设置 scanType 无效的Bug [#1578](https://github.com/dcloudio/uni-app/issues/1578)
  + uni-ui 新增 uni-drawer 组件 width 属性（仅在 vue 页面生效）、maskClick 属性，点击遮罩是否关闭抽屉
  + uni-ui 新增 uni-goods-nav 组件角标的前景色和背景色设置
  + uni-ui 新增 uni-popup 组件的信息提示、对话框、底部分享示例三种组件扩展样式
  + uni-ui 优化 uni-drawer 组件废弃 visible 属性，改用 open()、close() 方法开关抽屉，避免在某些场景不能正常关闭的 Bug
  + uni-ui 优化 uni-popup 组件部分代码逻辑，可支持自定义扩展组件
  + uni-ui 修复 uni-drawer 组件 close 回调执行两遍的 Bug
  + uni-ui 修复 uni-goods-nav 组件 buttonGroup 属性修改 color 颜色不生效的 Bug 
  + uni-ui 修复 uni-popup 组件内放置 input/textarea 获取不到焦点的 Bug
  + uni-ui 修复 uni-swipe-action 组件在 iOS13 中按钮点击失效或点击错位的 Bug
* 【uniCloud】
  + web控制台 调整 取消云存储文件类型限制。可用于托管App的apk或wgt下载
  + 阿里云 修复 某些情况下 neq 操作符无法正常使用的Bug
* 【App插件(含5+App和uni-app的App端)】
  + 修复 Webview窗口标题栏 titleNView 调用 setTitleNViewButtonStyle 动态更新按钮属性可能不生效的Bug
  + 【重要】Android平台 调整 云端打包时默认不再包含 x86 CPU类型库，减少apk包体积 [详情](https://ask.dcloud.net.cn/article/36195#nox86)
  + Android平台 更新 uni-AD 腾讯广点通SDK版本为4.191.1061，今日头条穿山甲SDK版本为2.9.5.5，360广告SDK版本为4.14.3151
  + Android平台 更新 UniPush 使用的个推SDK版本为2.14.0.0，解决由于部分厂商推送SDK版本过低导致在新设备无法接收离线推送消息的问题
  + Android平台 优化 提交应用市场检查可能误报 Trojan-Dropper.AndroidOS.Agent 病毒的问题
  + Android平台 修复 storage 存储数据内容超过 2M 后无法正常获取的Bug [详情](https://ask.dcloud.net.cn/question/93875)
  + Android平台 修复 input 输入框获取焦点后可能无法弹出软键盘的Bug [详情](https://ask.dcloud.net.cn/question/95119)
  + Android平台 修复 setUserAgent 设置 UA 可能引起应用概率性卡死的Bug [详情](https://ask.dcloud.net.cn/question/94668)
  + Android平台 修复 previewImage 预览图片界面顶部数字指示器在刘海屏手机上被遮挡的Bug [详情](https://ask.dcloud.net.cn/question/90222)
  + Android平台 修复 应用锁定横屏或竖屏后 previewImage 预览图片界面仍然可以横竖屏切换的Bug [详情](https://ask.dcloud.net.cn/question/94686)
  + iOS平台 修复 Webview窗口标题栏 titleNView 上按钮设置 select 属性，点击后下拉指示图标消失的Bug [详情](https://ask.dcloud.net.cn/question/92505)
  + iOS平台 修复 pick 从相册选择视频文件时只能使用默认压缩模式，无法选取原始视频的Bug [详情](https://ask.dcloud.net.cn/question/93738)
  + iOS平台 修复 在 iPad 设备横屏时状态栏消失的Bug [详情](https://ask.dcloud.net.cn/question/95284)

#### 2.6.16.20200427-alpha
* 【uni-app插件】
  + App平台、H5平台 修复 text 组件调整换行解析导致兼容问题的Bug [详情](https://ask.dcloud.net.cn/question/94473)
  + App平台、H5平台 修复 input、textarea 组件失去焦点时导致页面滚动到顶部的Bug [详情](https://ask.dcloud.net.cn/question/94065)
  + App平台、H5平台 修复 部分组件文本前后出现多余空格或换行的Bug [详情](https://ask.dcloud.net.cn/question/94802)
  + App平台 修复 非v3编译模式小程序组件事件监听报错的Bug [详情](https://ask.dcloud.net.cn/question/94377)
  + H5平台 修复 manifes.json 内 template 配置的模板文件不存在时框架样式错误的Bug
  + H5平台 修复 uni.chooseImage 返回的 tempFilePaths 为空Bug [详情](https://ask.dcloud.net.cn/question/94805)
* 【uniCloud】
  + 修复 某些情况下，公共模块上传失败的Bug [详情](https://ask.dcloud.net.cn/question/93580)
* 【App插件(含5+App和uni-app的App端)】
  + Android平台 修复 使用 X5 Webview 内核渲染 plus.navigator.getUserAgent 获取 UA 不正确的Bug
  + Android平台 修复 新浪微博登录时选择不授权，返回后无法再次调用登录授权的Bug [详情](https://ask.dcloud.net.cn/question/93971)
* 【uni小程序SDK】
  + Android平台 修复 小程序启动直达 nvue 页面 query 参数丢失的Bug

#### 2.6.14.20200420-alpha
* 【uni-app插件】
  + 【重要】App平台 修复 v3版本 组件之间样式隔离，解决历史项目升级v3后，部分样式错乱问题 [详情](https://ask.dcloud.net.cn/question/91501)
  + App平台、H5平台 新增 EditorContext.insertImage 支持 width、height、extClass、data 配置
  + App平台、H5平台 修复 scroll-view 子元素使用百分比尺寸时大小不正确的Bug
  + App平台、H5平台 修复 input 组件设置 value 为 null 时显示不正确的Bug [详情](https://ask.dcloud.net.cn/question/93729)
  + App平台、H5平台 修复 iOS设备键盘收起可能引起页面显示与点击位置错位的Bug [详情](https://ask.dcloud.net.cn/question/93818)
  + App平台 优化 v3版本 事件对象，支持 json 序列化输出 [详情](https://github.com/dcloudio/uni-app/issues/1559)
  + App平台 修复 vue 页面与 nvue 页面引用相同组件，条件编译失效的Bug
  + App平台 修复 v3版本 button 组件 open-type 为 feedback 不生效的Bug 
  + App平台 修复 v3版本 picker-view 组件嵌套在 uni-pop 组件内渲染不正确的Bug [详情](https://ask.dcloud.net.cn/question/93606)
  + App平台 修复 v3版本 webview 组件 src 为空时显示错误页面的Bug
  + App平台 修复 v3版本 map 组件更新 marker 影响 polyline 的Bug [详情](https://ask.dcloud.net.cn/question/93944)
  + App平台 修复 v3版本 image 组件 widthFix 模式动态修改大小时不生效的Bug [详情](https://ask.dcloud.net.cn/question/93874)
  + App平台 修复 uni.openLocation 显示位置错误的Bug [详情](https://ask.dcloud.net.cn/question/85402)
  + App-Android平台 修复 nvue rich-text 组件 img 标签可能不显示的Bug [详情](https://ask.dcloud.net.cn/question/93388)
  + App-Android平台 修复 nvue input 组件 font-size 值设置过大时光标可能不显示的Bug [详情](https://ask.dcloud.net.cn/question/93283)
  + App-Android平台 修复 vue map 组件 marker 属性打包后图片不显示的Bug [详情](https://ask.dcloud.net.cn/question/92358)
  + App-Android平台 修复 nvue 页面跳转到 vue 页面后，input 组件获得焦点时可能无法弹出软键盘的Bug [详情](https://ask.dcloud.net.cn/question/89769)
  + App-iOS 修复 uni.onBLEConnectionStateChange 不触发的bug
  + App-iOS 修复 uni.chooseImage 从相机选择图片分辨率过低的Bug [详情](https://ask.dcloud.net.cn/question/91502)
  + 小程序平台 修复 map 组件 @markertap 事件获取不到 markerId 的Bug
* 【App插件(含5+App和uni-app的App端)】
  + iOS平台 更新 uni-AD 腾讯广点通SDK版本为4.11.6
  + iOS平台 修复 uni-AD 腾讯广点通的信息流视频广告自动播放时没有静音的Bug
  + iOS平台 修复 iOS 13.4.1及以上版本在 iPad 设备应用第一次启动获取不到所有窗口对象的Bug [详情](https://ask.dcloud.net.cn/question/93308)
  + iOS平台 修复 视频播放控件 VideoPlayer 全屏时在 iPhoneX 可能出现亮度控制视图位置错乱的Bug [详情](https://ask.dcloud.net.cn/question/87370)
* 【uni小程序SDK】
  + iOS平台 补齐 wgt 编译版本与js框架版本校验，不一致会弹窗提示 [详情](https://ask.dcloud.net.cn/article/35627)
  + iOS平台 修复 小程序内 wgt 热更新资源后启动会显示一下 LaunchScreen.storyboard 页面的Bug

#### 2.6.13.20200414-alpha
* 【uni-app插件】
  + 支付宝小程序平台 修复 部分情况下编译失败的Bug
  + App-Android平台 修复 v2版本apk使用wgt升级资源后，用v3版本apk覆盖安装无法进入应用的Bug [详情](https://ask.dcloud.net.cn/question/93426)
* 【App插件(含5+App和uni-app的App端)】
  + 修复 打包模块勾选 iOS UIWebview/Android X5 Webview 后，wgt升级更新失败触发错误回调的Bug [详情](https://ask.dcloud.net.cn/question/93447)
  + Android平台 修复 确认模态框 confirm 显示时会弹出软键盘的Bug [详情](https://ask.dcloud.net.cn/question/93574)
  + iOS平台 修复 HBuilderX2.6.8 引出的Webview窗口 userAgent 不正确可能导致加载的页面内部逻辑不正确的Bug [详情](https://ask.dcloud.net.cn/question/93284)
  + iOS平台 修复 uni-AD 腾讯广点通部分视频激励广告点击关闭按钮触发 onClose 事件参数中 isEnded 属性可能为 false 的Bug

#### 2.6.12.20200412-alpha
* 【uni-app插件】
  + App平台 修复 无法获取音频暂停状态的Bug [详情](https://ask.dcloud.net.cn/question/92714)
  + App平台 修复 renderjs 中未绑定到 change:prop 的数据变更也会触发 change 事件的Bug [详情](https://ask.dcloud.net.cn/question/91887)
  + App平台 修复 v3版本 uni.arrayBufferToBase64 某些参数无法支持的Bug [详情](https://ask.dcloud.net.cn/question/92720)
  + App平台 修复 v3版本 使用小程序组件在低版本系统报错的Bug [详情](https://ask.dcloud.net.cn/question/92561)
  + App平台 修复 v3版本 text 组件首尾换行解析不正确的Bug
  + App平台 修复 v3版本 uni.canvasToTempFilePath 在低版本系统报错的Bug [详情](https://ask.dcloud.net.cn/question/92189)
  + App平台 修复 v3版本 调用 socketTask.close 不传参数报错的Bug
  + App平台 修复 v3版本 RecorderManager 事件重复执行的Bug [详情](https://ask.dcloud.net.cn/question/91885)
  + App平台 修复 v3版本 form 组件 submit 事件内无法获取 picker 值的Bug [#1545](https://github.com/dcloudio/uni-app/issues/1545)
  + App平台 修复 v3版本 uni.createBLEConnection 没有被 Promisify 的Bug [#1543](https://github.com/dcloudio/uni-app/issues/1543)
  + App-Android平台 修复 uni.sendSocketMessage 无法发送某些 bytebuffer 数据的Bug [详情](https://ask.dcloud.net.cn/question/92700)
  + App-Android平台 修复 nvue list/waterfall 组件底部使用 loading 加载更多时，无法正常触发 @loading 事件的Bug [详情](https://ask.dcloud.net.cn/question/93190)
  + App-Android平台 修复 nvue list 组件 @scroll 事件返回参数 contentOffset.y 值域不正确的Bug [详情](https://ask.dcloud.net.cn/question/92872)
  + App-Android平台 修复 nvue input 组件设置 type 为 digit/number 时弹出键盘类型不正确的问题
  + App-Android平台 修复 tabBar 页面设置 titleNView 的 type 为 transparent 滚动时标题栏透明度不发生变化的Bug
  + App-iOS平台 修复 nvue video 组件设置 @click 事件后，视频底部控制栏上除进度条以外的其他按钮失效的Bug [详情](https://ask.dcloud.net.cn/question/92727)
  + App-iOS平台 修复 v3模式 movable-area 组件嵌套 scroll-view 组件点击事件不触发的Bug [详情](https://ask.dcloud.net.cn/question/92638)
  + H5平台 优化 uni.request 增加 withCredentials 参数，支持配置跨域请求时是否携带凭证（cookies）
  + H5平台 优化 uni.uploadFile 增加 files 参数，支持上传多个文件
  + H5平台 优化 uni.uploadFile 增加 file 参数，支持上传原始 File 对象
  + H5平台 优化 uni.chooseVideo、uni.chooseImage 支持返回原始 File 对象
  + H5平台 修复 base为相对路径 ./ 时，相对路径的静态资源加载失败的Bug [详情](https://ask.dcloud.net.cn/question/92910)
  + 小程序平台 修复 条件编译中引用静态资源始终生效的Bug [#1542](https://github.com/dcloudio/uni-app/issues/1542)
  + 小程序平台 修复 启用分包优化后，当分包路径相似时 vendor 生成不正确Bug [#1440](https://github.com/dcloudio/uni-app/issues/1440)
  + 支付宝小程序平台 修复 uni.getFileInfo 提示参数不正确的Bug
* 【uniCloud】
  + 阿里云 新增 支持云函数定时触发
  + 阿里云 新增 HBuilderX内置浏览器运行H5项目时，可在前端控制台直接打印云函数的日志
  + 阿里云 优化 云函数上传并运行时有时不能立即生效的问题
  + 阿里云 修复 字节跳动小程序iOS端上传文件失败的Bug [详情](https://ask.dcloud.net.cn/question/93130)
* 【App插件(含5+App和uni-app的App端)】
  + 新增 原生导航标题栏的 titleIcon 支持 base64 图标，方便页面里已经存在的图标在滚动时绘制在原生导航栏上
  + 新增 actionSheet 取消按钮文字国际化（如设置按钮文字，则以设置文字为准，如未设置，则根据手机系统的语言显示）
  + Android平台 新增 pop-in/pop-out 动画时通过 animationAlphaBGColor 设置动画蒙层背景色，可用于避免暗色风格页面转场动画的蒙层偏白 [文档](https://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewStyles)
  + Android平台 修复 uni-AD 腾讯广点通部分视频激励广告播放 30 秒后点击关闭按钮触发 onClose 事件参数中 isEnded 属性可能为 false 的Bug
  + Android平台 修复 Webview窗口对象 loadURL 方法没有触发 overrideUrlLoading 拦截回调函数的Bug [详情](https://ask.dcloud.net.cn/question/92689)
  + Android平台 修复 显示系统软键盘 plus.key.showSoftKeybord 多次调用会触发关闭软键盘的Bug
  + Android平台 修复 storage存储键值通过 setItem 方法传入 value 为空字符串后，通过 getItem 方法返回 null 的Bug
  + Android平台 修复 同时创建两个音频播放对象，其中一个音频暂停后另一个无法播放的Bug
  + Android平台 修复 视频播放控件 VideoPlayer 播放部分 rtmp 链接可能无声音的Bug
  + iOS平台 修复 原生导航标题栏 设置 type 为 float 时，backgroundColor 的半透明效果显示不正确的Bug

#### 2.6.10.20200403-alpha
* 【uni-app插件】
  + 【重要】 App平台 调整 manifest中默认的编译模式为v3模式。如需要切换为老版自定义组件模式，需要在 manifest可视化界面 - App其他常用设置 中，去掉v3编译模式
  + 【重要】 App平台 新增 v3版本 支持纯 nvue 编译模式。两种模式不再互斥
  + 【重要】 App平台 调整 v3版本 template 节点中引用静态资源文件时（如：图片），调整查找策略为【基于当前文件的路径搜索】，与其他平台保持一致
  + App平台、H5平台 优化 v3版本 uni.moveToLocation 支持 latitude、longitude 参数
  + App平台、H5平台 修复 多列 picker 组件部分情况修改 value 不生效的Bug
  + App平台 新增 激励视频广告支持服务器回调 [详情](https://uniapp.dcloud.io/api/ad/rewarded-video-ad)
  + App平台 优化 控制台日志支持打印数组类型
  + App平台 修复 自定义组件编译模式使用 easycom 后在低版本设备白屏的Bug [详情](https://ask.dcloud.net.cn/question/92473)
  + App平台 修复 v3版本 判断浏览器专用 API（如：navigator）报错的Bug
  + App平台 修复 v3版本 uni.openLocation 点击导航栏返回后退2次的Bug [#1465](https://github.com/dcloudio/uni-app/issues/1465)
  + App平台 修复 v3版本 uni.moveToLocation 不执行回调的Bug
  + App平台 修复 v3版本 webview 组件无法收到 @message 的Bug [详情](https://ask.dcloud.net.cn/question/92296)
  + App平台 修复 v3版本 navigation-bar 组件 非首页某些属性无效的Bug
  + App-Android平台 修复 v3版本 SocketTask.onMessage 接收数据类型为 ArrayBuffer 时解析错误的Bug
  + App-Android平台 修复 nvue web-view 组件 src 属性的链接地址中带 query 参数无效的Bug [详情](https://ask.dcloud.net.cn/question/92043)
  + App-Android平台 修复 nvue web-view、image 等组件 src 属性资源地址为_doc、_download路径时可能无法正常载入的Bug
  + App-iOS平台 修复 textarea 组件在 iOS13.4 系统报错的Bug
  + App-iOS平台 修复 nvue web-view 组件 src 属性加载本地 html 文件路径中带 query 参数时无法正常显示的Bug [详情](https://ask.dcloud.net.cn/question/91311)
  + App-iOS平台 修复 锁定横屏后打开 nvue 页面使用 plus.screen 获取屏幕宽高值不对的Bug
  + App-iOS平台 修复 v3版本 uni.canvasToTempFilePath 在 ios 9.3.4 报错的Bug [详情](https://ask.dcloud.net.cn/question/92189)
  + H5平台 修复 image 组件 某些情况下相对路径无法显示的Bug [详情](https://ask.dcloud.net.cn/question/92366)
  + 小程序平台 修复 调用取消事件监听类接口报错的Bug [#1511](https://github.com/dcloudio/uni-app/issues/1511)
* 【uniCloud】
  + 修复 使用阿里云时运行到App端不输出运行日志的Bug
* 【App插件(含5+App和uni-app的App端)】
  + 新增 uni-AD 激励视频广告支持服务器回调（限今日头条穿山甲广告） [文档](https://ask.dcloud.net.cn/article/37108)
  + 新增 Webview窗口标题栏 titleNView 的 titleIcon 支持网络图标路径
  + 新增 获取当前屏幕宽高信息接口 plus.screen.getCurrentSize [文档](https://www.html5plus.org/doc/zh_cn/device.html#plus.screen.getCurrentSize)
  + Android平台 修复 Webview窗口对象 loadURL 方法 headers 参数设置无效的Bug [详情](https://ask.dcloud.net.cn/question/87597)
  + Android平台 修复 在Android10上第一次安装后启动可能引起应用崩溃的Bug [详情](https://ask.dcloud.net.cn/question/90361)
  + Android平台 修复 应用标识 AppID 使用www结尾时导致部分资源无法正常载入的Bug [详情](https://ask.dcloud.net.cn/question/91217)
  + Android平台 修复 百度语音识别时在部分设备可能返回 4004 app name unknown 错误的Bug [详情](https://ask.dcloud.net.cn/question/90982)
  + Android平台 修复 设置应用图标显示角标数字 plus.runtime.setBadgeNumber 在部分设备超过100时仍然显示99的Bug [详情](https://ask.dcloud.net.cn/question/91452)
  + Android平台 修复 文件系统目录对象 DirectoryEntry 的 getFile 方法返回错误信息不准确的Bug
  + Android平台 修复 调用 plus.gellay.pick 通过QQ浏览器选择图片或视频在部分设备可能无响应的Bug
  + Android平台 修复 HBuilderX2.5.4引出的获取Cookie值 plus.navigator.getCookie 返回数据不正确的Bug
  + iOS平台 新增 Webview窗口使用WKWebview内核在iOS11及以上设备支持js原生混淆 [详情](https://ask.dcloud.net.cn/article/36437#wkwebview)
  + iOS平台 更新 支付宝Alipay SDK版本为15.7.4，解决AppStore审核报使用废弃UIWebview APIs的问题
  + iOS平台 更新 新浪微博登录、分享SDK版本为3.2.7，解决AppStore审核报使用废弃UIWebview APIs的问题
  + iOS平台 更新 今日头条穿山甲广告SDK版本为V2.9.5.0
  + iOS平台 修复 iOS 13.3及以上版本在 iPad 设备 plus.webview.all 无法获取所有Webview窗口的Bug [详情](https://ask.dcloud.net.cn/question/90517)
  + iOS平台 修复 iOS 13.3及以上版本在 iPad 设备 mui.openWindow 设置的窗口参数获取不到的Bug [详情](https://ask.dcloud.net.cn/question/91746)
  + iOS平台 修复 iOS 13及以上版本视频播放控件 VideoPlayer 全屏时可能出现亮度控制视图位置错乱的Bug [详情](https://ask.dcloud.net.cn/question/87370)
  + iOS平台 修复 视频播放控件 VideoPlayer 在下拉通知栏页面后依然播放的Bug [详情](https://ask.dcloud.net.cn/question/90627)
  + iOS平台 修复 预览图片 plus.nativeUI.previewImage 传入长图时显示不清楚的Bug [详情](https://ask.dcloud.net.cn/question/92083)
  + iOS平台 修复 应用安装后第一次启动 splash 界面显示不正常的Bug
  + iOS平台 修复 Webview窗口 setStyle 设置 {titleNView: false} 后通过 getSytle 获取的 titleNView 数据不正确的Bug
  + iOS平台 修复 Webview窗口标题栏 titleNView 动态设置 titleText 在某些情况下可能不生效的Bug [详情](https://ask.dcloud.net.cn/question/92494)
* 【uni小程序SDK】
  + 新增 宿主与小程序通讯机制 [详情](https://ask.dcloud.net.cn/docs/#https://ask.dcloud.net.cn/article/37122)
  + iOS平台 修复 在监听小程序被关闭的方法中紧接着在打开小程序可能会崩溃的Bug
  + iOS平台 修复 uni.chooseImage 引起内存泄露的Bug

#### 2.6.7.20200326-alpha
* 【uni-app插件】
  + App平台 新增 v3版本 支持动态插槽名
  + App平台 新增 v3版本 navigation-bar 组件 titleNView 配置 [详情](https://uniapp.dcloud.io/component/navigation-bar)
  + App平台 修复 v3版本 部分情况自定义组件内事件监听无效的Bug [详情](https://ask.dcloud.net.cn/question/91519)
  + App平台 修复 v3版本 动态绑定ref报错的Bug [#1458](https://github.com/dcloudio/uni-app/issues/1458)
  + App平台 修复 v3版本 textarea 组件 placeholder-class 无默认值的Bug [详情](https://ask.dcloud.net.cn/question/91373)
  + App平台 修复 v3版本 cover-view、cover-image 组件无法在自定义组件内使用的Bug [详情](https://ask.dcloud.net.cn/question/91345)
  + App平台 修复 v3版本 低功耗蓝牙某些接口在返回 ArrayBuffer 时被转为 base64 的Bug
  + App平台 修复 v3版本 uni.canvasPutImageData 无法正常使用的Bug [详情](https://ask.dcloud.net.cn/question/91672)
  + App平台 修复 v3版本 video 组件 timeupdate 事件回调错误的Bug [详情](https://ask.dcloud.net.cn/question/91769)
  + App-Android平台 修复 国产安卓模拟器 uni.getSystemInfo 获取设备宽高错误的Bug [详情](https://ask.dcloud.net.cn/question/90270)
  + App-Android平台 修复 HBuilderX2.6.6引出的 tabBar 设置图标云端打包后可能无法显示的Bug [详情](https://ask.dcloud.net.cn/question/91426)
  + App-iOS平台 修复 设备上使用第三方输入法收起键盘输入框无法失去焦点的Bug [详情](https://ask.dcloud.net.cn/question/91254)
  + App-iOS平台 修复 部分情况 page 设置 height 为 100% 无法全屏的Bug
  + App-iOS平台 修复 含 tabBar 页面使用原生占位时在 iPhoneX 获取窗口高度错误的Bug
  + App-iOS平台 修复 picker 设置 value 过大时会滚动到空白位置的Bug [详情](https://ask.dcloud.net.cn/question/89539)
  + App-iOS平台 修复 nvue 页面中加载 base64 格式 iconfont 文件在iOS13.4系统崩溃的Bug [详情](https://ask.dcloud.net.cn/question/91721)
  + H5平台 修复 带参数 url 直达部分情况参数解析失败的Bug [#1082](https://github.com/dcloudio/uni-app/issues/1082)
  + H5平台 修复 editor 组件 input 事件重复触发的Bug [详情](https://ask.dcloud.net.cn/question/91453)
  + H5平台 修复 editor 组件 statuschange 事件无法触发的Bug [详情](https://ask.dcloud.net.cn/question/91314)
  + H5平台 修复 picker 组件未设置 value 时报错的Bug [#1422](https://github.com/dcloudio/uni-app/issues/1422)
  + H5平台 修复 textarea 组件 placeholder-class 配置无效的Bug [详情](https://ask.dcloud.net.cn/question/86851)
* 【uniCloud】
  + 新增 腾讯云（限受邀内测用户）
  + 新增 uniCloud 支持通过模板创建公共模块（common目录，右键菜单，新建公共模块）
* 【App插件(含5+App和uni-app的App端)】
  + Android平台 修复 系统选择按钮框底部取消按钮UI显示不正常的Bug [详情](https://ask.dcloud.net.cn/question/91265)
  + iOS平台 修复 云端打包启动页面中应用图标显示不清晰的Bug [详情](https://ask.dcloud.net.cn/question/91032)

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
  + App平台 新增 nvue 页面 list 组件支持 setSpecialEffects 方法，实现 swiper-list 吸顶滚动效果 [文档](https://uniapp.dcloud.io/component/list?id=setSpecialEffects)
  + App平台 修复 nvue 页面 v-slot:slotname 值为空时报错的Bug
  + App平台 修复 nvue 页面 修复部分情况下 createLivePusherContext 无法正确获取 live-pusher 上下文的Bug
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
  + 【重要】H5平台、QQ小程序 支持运行微信小程序组件 [详情](https://hellouniapp.dcloud.net.cn/pages/template/vant-button/vant-button)
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
  + H5平台 新增 支持 editor 组件 [详情](https://hellouniapp.dcloud.net.cn/pages/component/editor/editor)
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
