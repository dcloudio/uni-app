export default {
  'app.compiler.version': 'Compiler version: {version}',
  compiling: 'Compiling...',
  'dev.performance':
    'Please note that in running mode, due to log output, sourcemap, and uncompressed source code, the performance and package size are not as good as release mode.',
  'dev.exclusion':
    'Please configure the antivirus software to set up an exclusion list for scanning, reducing system resource consumption. [详情](https://uniapp.dcloud.net.cn/uni-app-x/compiler/#tips)',
  'dev.performance.nvue':
    'Especially the sourcemap of app-nvue has a greater impact',
  'dev.performance.mp':
    'To officially release, please click the release menu or use the cli release command to release',
  'dev.performance.web':
    '\nVite is compiled on demand, and clicking on an uncompiled page at runtime will compile first and then load, resulting in a slower display, and there is no such problem after release.',
  'build.done': 'DONE  Build complete.',
  'dev.watching.start': 'Compiling...',
  'dev.watching.end': 'DONE  Build complete. Watching for changes...',
  'dev.watching.end.pages': 'DONE  Build complete. PAGES:{pages}',
  'dev.watching.end.files': 'DONE  Build complete. FILES:{files}',
  'build.failed': 'DONE  Build failed.',
  'compiler.build.failed': 'Build failed with errors.',
  'stat.warn.appid':
    'The current application is not configured with Appid, and uni statistics cannot be used. For details, see https://ask.dcloud.net.cn/article/36303',
  'stat.warn.version':
    'The uni statistics version is not configured. The default version is 1.0.uni statistics version 2.0 is recommended, private deployment data is more secure and code is open source and customizable. details: https://uniapp.dcloud.io/uni-stat',
  'stat.warn.tip': 'uni statistics version: {version}',
  'i18n.fallbackLocale.default':
    'fallbackLocale is missing in manifest.json, use: {locale}',
  'i18n.fallbackLocale.missing': './local/{locale}.json is missing',
  'easycom.conflict': 'easycom component conflict: ',
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
  'prompt.run.devtools.mp-alipay': 'Alipay Mini Program Devtools',
  'prompt.run.devtools.mp-baidu': 'Baidu Mini Program Devtools',
  'prompt.run.devtools.mp--kuaishou': 'Kuaishou Mini Program Devtools',
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
} as const
