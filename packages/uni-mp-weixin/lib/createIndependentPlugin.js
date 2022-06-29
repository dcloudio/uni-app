const AddShareAbilityToRuntimePlugin = require('./independent-plugins/add-share-ability-to-runtime-plugin')
const GenerateIndepndentEntryPlugin = require('./independent-plugins/generate-indepndent-entry-plugin')
const InjectEntryJsToIndependentPlugin = require('./independent-plugins/inject-entry-to-independent-plugin')
const InjectMainCssToIndependentCssPlugin = require('./independent-plugins/inject-main-css-to-independent-plugin')
const RunDefaultAppPlugin = require('./independent-plugins/run-default-app-plugin')
const SplitIndependentChunksPlugin = require('./independent-plugins/split-independent-chunks-plugin')
const ModifyUniAppWebpackConfigPlugin = require('./independent-plugins/modify-uniapp-webpack-config-Plugin')
const AddWxMpRuntimePlugin = require('./independent-plugins/add-weixin-mp-runtime-plugin')
const AppInterceptorPlugin = require('./independent-plugins/app-interceptor-plugin')

module.exports = function createIndependentPlugins () {
  const manifestConfig = process.UNI_MANIFEST
  const weixinConfig = manifestConfig['mp-weixin'] || {}
  const independentSwitch = !!weixinConfig.independent
  if (!independentSwitch) return []

  // 支持构造微信小程序的独立分包
  const independentPlugins = [
    new SplitIndependentChunksPlugin(),
    new ModifyUniAppWebpackConfigPlugin(), // 修改 webpack配置
    new AddShareAbilityToRuntimePlugin(), // 保证独立分包和主包使用的相同的runtime.js
    new GenerateIndepndentEntryPlugin(), // 生成独立分包执行入口文件（代替app.js
    new InjectEntryJsToIndependentPlugin(), // 为独立分包注入执行入口
    new RunDefaultAppPlugin(), // 确保app.js中的App()被执行一次
    // 独立分包中 App,getApp 调用拦截
    new AddWxMpRuntimePlugin(),
    new AppInterceptorPlugin()
  ]

  const insertAppCssToIndependentSwitch = !!weixinConfig.insertAppCssToIndependent
  if (insertAppCssToIndependentSwitch) {
    // 需要在 cacheSet 后面
    independentPlugins.push(new InjectMainCssToIndependentCssPlugin()) // 目前只对页面注入了，组件未注入
  }

  return independentPlugins
}
