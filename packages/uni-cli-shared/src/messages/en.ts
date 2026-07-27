export default {
  'app.compiler.version': 'Compiler version: {version}',
  'view.render.compiler.target': 'Current view.render compile target: {target}',
  'view.render.compiler.target.bytecode': 'bytecode',
  'view.render.compiler.target.nativecode': 'nativecode',
  'style.isolation.version': 'Style isolation version: {version}',
  'style.isolation.version.upgrade':
    'Style isolation version: {version}. Upgrading to 2.0 is recommended.',
  compiling: 'Compiling...',
  'dev.performance':
    'Please note that in running mode, due to log output, sourcemap, and uncompressed source code, the performance and package size are not as good as release mode.',
  'dev.performance.nvue':
    'Especially the sourcemap of app-nvue has a greater impact',
  'dev.performance.mp':
    'To officially release, please click the release menu or use the cli release command to release',
  'dev.performance.web':
    '\nVite is compiled on demand, and clicking on an uncompiled page at runtime will compile first and then load, resulting in a slower display, and there is no such problem after release.',
  'build.done': 'DONE  Build complete.',
  'dev.watching.start': 'Incremental Compiling...',
  'dev.watching.end': 'DONE  Build complete. Watching for changes...',
  'dev.watching.end.pages': 'DONE  Build complete. PAGES:{pages}',
  'dev.watching.end.files': 'DONE  Build complete. FILES:{files}',
  'dev.watching.restart.vapor':
    'DONE  Restart required. Switching vapor mode requires restarting to take effect.',
  'dev.watching.restart.independentSubPackages':
    'DONE  Restart required. Changing independent subpackage roots requires restarting to take effect.',
  'dev.watching.vapor.render.target':
    'vapor-render-target in manifest.json was changed to {manifestTarget}, but the running console is still {runtimeTarget}.',
  'build.failed': 'DONE  Build failed.',
  'compiler.build.failed': 'Build failed with errors.',
  'stat.warn.appid':
    'The current application is not configured with Appid, and uni statistics cannot be used. For details, see https://ask.dcloud.net.cn/article/36303',
  'stat.warn.version':
    'The uni statistics type is not configured. The default type is public. You can set it to public or private. Details: https://uniapp.dcloud.io/uni-stat',
  'stat.warn.tip': 'uni statistics enabled: {type}',
  'i18n.fallbackLocale.default':
    'fallbackLocale is missing in manifest.json, use: {locale}',
  'i18n.fallbackLocale.missing': './local/{locale}.json is missing',
  'easycom.conflict': 'easycom component conflict: ',
  'dom2.compatible.component':
    'Vapor mode does not support the uni-app compatibility component {name}. The implementation file {file} was detected. Please use the standard UTS component implementation for this purpose.',
  'dom2.root.scroll.view':
    'Pages are scrollable in Vapor mode. Remove the root scroll-view to avoid nested scrolling. Details: https://doc.dcloud.net.cn/uni-app-x/page.html#disablescroll',
  'mp.component.args[0]': 'The first parameter of {0} must be a static string',
  'mp.component.args[1]': '{0} requires two parameters',
  'mp.360.unsupported': '360 is unsupported',
  'file.notfound': '{file} is not found',
  'uts.ios.tips':
    'The project uses the uts plugin. After the uts plug-in code is modified, the [Custom playground native runner](https://uniapp.dcloud.net.cn/tutorial/run/run-app.html#customplayground) needs to be regenerated to take effect',
  'uts.android.compiler.server':
    'The project uses the uts plugin, installing the uts Android runtime extension...',
  'uts.ios.windows.tips':
    'When running on Windows to iOS mobile phone, the modification of the uts plugin code needs to be submitted to the cloud to package the custom playground to take effect.',
  'uts.ios.standard.tips':
    'When the standard playground runs to an IOS phone, the uts plugin is temporarily not supported. If you need to call the uts plugin, please use a custom playground',
  'prompt.run.message': 'Run method: open {devtools}, import {outputDir} run.',
  'prompt.run.devtools.app': 'HBuilderX',
  'prompt.run.devtools.app-harmony': 'HBuilderX',
  'prompt.run.devtools.mp-harmony': 'HBuilderX',
  'prompt.run.devtools.mp-alipay': 'Alipay Mini Program Devtools',
  'prompt.run.devtools.mp-baidu': 'Baidu Mini Program Devtools',
  'prompt.run.devtools.mp-kuaishou': 'Kuaishou Mini Program Devtools',
  'prompt.run.devtools.mp-lark': 'Lark Mini Program Devtools',
  'prompt.run.devtools.mp-qq': 'QQ Mini Program Devtools',
  'prompt.run.devtools.mp-toutiao': 'Douyin Mini Program Devtools',
  'prompt.run.devtools.mp-weixin': 'Weixin Mini Program Devtools',
  'prompt.run.devtools.mp-jd': 'Jingdong Mini Program Devtools',
  'prompt.run.devtools.mp-xhs': 'Xiaohongshu Mini Program Devtools',
  'prompt.run.devtools.quickapp-webview':
    'Quick App Alliance Devtools | Huawei Quick App Devtools',
  'prompt.run.devtools.quickapp-webview-huawei': 'Huawei Quick App Devtools',
  'prompt.run.devtools.quickapp-webview-union': 'Quick App Alliance Devtools',
  'uvue.unsupported': 'uvue does not support {platform} platform',
  'uvue.dev.watching.end.empty':
    'The compilation outcome remains unchanged; there is no need to synchronize.',
  'uni_modules.import': 'Plug-in [{0}] only supports @/uni_modules/{1}.',
  'pages.json.page.notfound': 'The page "{pagePath}" does not exist.',
  'pages.json.page.slash': 'The Path "{pagePath}" cannot start with "/"',
  'pages.json.tabbar.page.notfound':
    'The tabBar page "{pagePath}" is not declared in "pages.json".',
} as const
