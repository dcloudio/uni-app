export default {
  'app.compiler.version': 'Compiler version: {version}',
  compiling: 'Compiling...',
  'dev.performance':
    'Please note that in running mode, due to log output, sourcemap, and uncompressed source code, the performance and package size are not as good as release mode.',
  'dev.performance.nvue':
    'Especially the sourcemap of app-nvue has a greater impact',
  'dev.performance.mp':
    'To officially release, please click the release menu or use the cli release command to release',
  'build.done': 'DONE  Build complete.',
  'dev.watching.start': 'Compiling...',
  'dev.watching.end': 'DONE  Build complete. Watching for changes...',
  'dev.watching.end.pages': 'DONE  Build complete. PAGES:{pages}',
  'dev.watching.end.files': 'DONE  Build complete. FILES:{files}',
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
} as const
