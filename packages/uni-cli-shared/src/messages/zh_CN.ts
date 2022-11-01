export default {
  'app.compiler.version': '编译器版本：{version}',
  compiling: '正在编译中...',
  'dev.performance':
    '请注意运行模式下，因日志输出、sourcemap 以及未压缩源码等原因，性能和包体积，均不及发行模式。',
  'dev.performance.nvue': '尤其是 app-nvue 的 sourcemap 影响较大',
  'dev.performance.mp':
    '若要正式发布，请点击发行菜单或使用 cli 发布命令进行发布',
  'build.done': 'DONE  Build complete.',
  'dev.watching.start': '开始差量编译...',
  'dev.watching.end': 'DONE  Build complete. Watching for changes...',
  'dev.watching.end.pages': 'DONE  Build complete. PAGES:{pages}',
  'dev.watching.end.files': 'DONE  Build complete. FILES:{files}',
  'stat.warn.appid':
    '当前应用未配置 appid，无法使用 uni 统计，详情参考：https://ask.dcloud.net.cn/article/36303',
  'stat.warn.version':
    '当前应用未配置uni统计版本，默认使用1.0版本；建议使用uni统计2.0版本 ，私有部署数据更安全，代码开源可定制。详情：https://uniapp.dcloud.io/uni-stat',
  'stat.warn.tip': '已开启 uni统计{version} 版本',
  'i18n.fallbackLocale.default':
    '当前应用未在 manifest.json 配置 fallbackLocale，默认使用：{locale}',
  'i18n.fallbackLocale.missing':
    '当前应用配置的 fallbackLocale 或 locale 为：{locale}，但 locale 目录缺少该语言文件',
  'easycom.conflict': 'easycom组件冲突：',
  'mp.component.args[0]': '{0}的第一个参数必须为静态字符串',
  'mp.component.args[1]': '{0}需要两个参数',
  'mp.360.unsupported': 'vue3暂不支持360小程序',
  'file.notfound': '{file} 文件不存在',
  'uts.ios.tips':
    '项目使用了uts插件，iOS平台uts插件代码修改后需要重新生成[自定义基座](https://uniapp.dcloud.net.cn/tutorial/run/run-app.html#customplayground)才能生效',
} as const
