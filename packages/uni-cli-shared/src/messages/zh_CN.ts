export default {
  'app.compiler.version': '编译器版本：{version}',
  'view.render.compiler.target': '当前视图层编译目标：{target}',
  'view.render.compiler.target.bytecode': '字节码',
  'view.render.compiler.target.nativecode': '机器码',
  'style.isolation.version':
    '当前样式隔离策略：{version}。详见：https://doc.dcloud.net.cn/uni-app-x/css/common/style-isolation.html',
  'style.isolation.version.upgrade':
    '当前样式隔离策略：{version}。推荐升级为 2.0。详见：https://doc.dcloud.net.cn/uni-app-x/css/common/style-isolation.html',
  compiling: '正在编译中...',
  'dev.performance':
    '请注意运行模式下，因日志输出、sourcemap 以及未压缩源码等原因，性能和包体积，均不及发行模式。',
  'dev.performance.nvue': '尤其是 app-nvue 的 sourcemap 影响较大',
  'dev.performance.mp':
    '若要正式发布，请点击发行菜单或使用 cli 发布命令进行发布',
  'dev.performance.web':
    '\nvite是按需编译，运行时点击某个未编译页面会先编译后加载，导致显示较慢，发行后无此问题。',
  'build.done': 'DONE  Build complete.',
  'dev.watching.start': '开始差量编译...',
  'dev.watching.end': 'DONE  Build complete. Watching for changes...',
  'dev.watching.end.pages': 'DONE  Build complete. PAGES:{pages}',
  'dev.watching.end.files': 'DONE  Build complete. FILES:{files}',
  'dev.watching.restart.vapor':
    'DONE  Restart required. 切换蒸汽模式需要重新运行才能生效。',
  'dev.watching.restart.independentSubPackages':
    'DONE  Restart required. 独立分包 root 列表变化需要重新运行才能生效。',
  'dev.watching.vapor.render.target':
    'manifest.json 中更改了视图层编译目标为{manifestTarget}，但注意运行控制台还是{runtimeTarget}。',
  'build.failed': 'DONE  Build failed.',
  'compiler.build.failed': '编译失败',
  'stat.warn.appid':
    '当前应用未配置 appid，无法使用 uni 统计，详情参考：https://ask.dcloud.net.cn/article/36303',
  'stat.warn.version':
    '当前应用未配置 uni 统计版本，默认使用公有版；可配置为公有版或私有版。详情：https://uniapp.dcloud.io/uni-stat',
  'stat.warn.tip': '已开启uni 统计 2.0{type}',
  'i18n.fallbackLocale.default':
    '当前应用未在 manifest.json 配置 fallbackLocale，默认使用：{locale}',
  'i18n.fallbackLocale.missing':
    '当前应用配置的 fallbackLocale 或 locale 为：{locale}，但 locale 目录缺少该语言文件',
  'easycom.conflict': 'easycom组件冲突：',
  'dom2.compatible.component':
    '蒸汽模式不支持 uni-app 兼容模式组件 {name}，检测到其实现文件为 {file}。请改用标准模式的UTS组件实现来实现。',
  'dom2.root.scroll.view':
    '蒸汽模式下页面可滚动，建议移除根节点 scroll-view，以避免嵌套滚动。详情: https://doc.dcloud.net.cn/uni-app-x/page.html#disablescroll',
  'mp.component.args[0]': '{0}的第一个参数必须为静态字符串',
  'mp.component.args[1]': '{0}需要两个参数',
  'mp.360.unsupported': 'vue3暂不支持360小程序',
  'file.notfound': '{file} 文件不存在',
  'uts.ios.tips':
    '项目使用了uts插件，iOS平台uts插件代码修改后需要重新生成[自定义基座](https://uniapp.dcloud.net.cn/tutorial/run/run-app.html#customplayground)才能生效',
  'uts.android.compiler.server':
    '项目使用了uts插件，正在安装 uts Android 运行扩展...',
  'uts.ios.windows.tips':
    'iOS手机在windows上使用标准基座真机运行无法使用uts插件，如需使用uts插件请提交云端打包自定义基座',
  'uts.ios.standard.tips':
    'iOS手机在标准基座真机运行暂不支持uts插件，如需调用uts插件请使用自定义基座',
  'prompt.run.message': '运行方式：打开 {devtools}, 导入 {outputDir} 运行。',
  'prompt.run.devtools.app': 'HBuilderX',
  'prompt.run.devtools.app-harmony': 'HBuilderX',
  'prompt.run.devtools.mp-harmony': 'HBuilderX',
  'prompt.run.devtools.mp-alipay': '支付宝小程序开发者工具',
  'prompt.run.devtools.mp-baidu': '百度开发者工具',
  'prompt.run.devtools.mp-kuaishou': '快手开发者工具',
  'prompt.run.devtools.mp-lark': '飞书开发者工具',
  'prompt.run.devtools.mp-qq': 'QQ小程序开发者工具',
  'prompt.run.devtools.mp-toutiao': '抖音开发者工具',
  'prompt.run.devtools.mp-weixin': '微信开发者工具',
  'prompt.run.devtools.mp-jd': '京东开发者工具',
  'prompt.run.devtools.mp-xhs': '小红书开发者工具',
  'prompt.run.devtools.quickapp-webview':
    '快应用联盟开发者工具 | 华为快应用开发者工具',
  'prompt.run.devtools.quickapp-webview-huawei': '华为快应用开发者工具',
  'prompt.run.devtools.quickapp-webview-union': '快应用联盟开发者工具',
  'uvue.unsupported': 'uvue 暂不支持 {platform} 平台',
  // 重要：HBuilderX也会用到，如果调整了文案，需要同步调整HBuilderX的文案
  'uvue.dev.watching.end.empty':
    '本次代码变更，编译结果未发生变化，跳过同步手机端程序文件。',
  'uni_modules.import':
    '插件[{0}]仅支持 @/uni_modules/{1} 方式引入，不支持直接导入内部文件 {2}。',
  'pages.json.page.notfound':
    '页面"{pagePath}"不存在，请确保填写的页面路径不包含文件后缀，且必须与真实的文件路径大小写保持一致。',
  'pages.json.page.slash': '路径 "{pagePath}" 不能以 "/" 开头',
  'pages.json.tabbar.page.notfound':
    'tabBar 中配置的页面 "{pagePath}" 未在 pages.json 中注册。',
} as const
