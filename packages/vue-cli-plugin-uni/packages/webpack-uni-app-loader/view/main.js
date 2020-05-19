const fs = require('fs')
const path = require('path')
const hash = require('hash-sum')
const loaderUtils = require('loader-utils')

const {
  parse
} = require(require.resolve('@vue/component-compiler-utils', {
  paths: [require.resolve('vue-loader')]
})) // 确保使用的与 vue-loader 一致

const {
  getGlobalUsingComponentsCode
} = require('@dcloudio/uni-cli-shared/lib/pages')

const traverse = require('@dcloudio/webpack-uni-mp-loader/lib/babel/global-component-traverse')

const genStylesCode = require('../../vue-loader/lib/codegen/styleInjection')

const {
  parseComponents
} = require('./util')

function getDefineComponents ({
  components
}) {
  return components.map(({
    name,
    source
  }) => `Vue.component('${name}',require('${source}').default)`)
}

const appVueFilePath = path.resolve(process.env.UNI_INPUT_DIR, 'app.vue')

function getStylesCode (loaderContext) {
  if (!fs.existsSync(appVueFilePath)) {
    return
  }
  const source = fs.readFileSync(appVueFilePath, 'utf8')
  const {
    minimize,
    sourceMap,
    rootContext,
    resourcePath,
    resourceQuery
  } = loaderContext

  const options = loaderUtils.getOptions(loaderContext) || {}

  const filename = path.basename(resourcePath)
  const context = rootContext || process.cwd()
  const sourceRoot = path.dirname(path.relative(context, resourcePath))
  const descriptor = parse({
    source,
    compiler: options.compiler,
    filename,
    sourceRoot,
    needMap: sourceMap
  })

  // styles
  let stylesCode = ''
  if (descriptor.styles.length) {
    const isProduction = options.productionMode || minimize || process.env.NODE_ENV === 'production'

    const stringifyRequest = r => loaderUtils.stringifyRequest(loaderContext, r)

    // module id for scoped CSS & hot-reload
    const rawShortFilePath = path
      .relative(context, resourcePath)
      .replace(/^(\.\.[/\\])+/, '')

    const shortFilePath = rawShortFilePath.replace(/\\/g, '/') + resourceQuery

    const needsHotReload = false

    const id = hash(
      isProduction
        ? (shortFilePath + '\n' + source)
        : shortFilePath
    )
    stylesCode = genStylesCode(
      loaderContext,
      descriptor.styles,
      id,
      resourcePath,
      stringifyRequest,
      needsHotReload,
      true, // needs explicit injection?
      'app-vue'
    )
  }
  return stylesCode.replace(/main\.[jt]s/g, 'App.vue')
}

module.exports = function (source, map) {
  // 追加小程序全局自定义组件(仅v3)
  source = getGlobalUsingComponentsCode() + source
  const automatorCode = process.env.UNI_AUTOMATOR_WS_ENDPOINT
    ? 'import \'@dcloudio/uni-app-plus/dist/automator.view\''
    : ''
  this.callback(null,
    `
import 'uni-pages?${JSON.stringify({ type: 'view' })}'
${automatorCode}
function initView(){
    ${getStylesCode(this)}
    typeof injectStyles ==='function' && injectStyles()
    ${getDefineComponents(parseComponents(source, traverse)).join('\n')}
    UniViewJSBridge.publishHandler('webviewReady')
}
if(typeof plus !== 'undefined'){
  initView()
} else {
  document.addEventListener('plusready',initView)
}
`,
    map)
}
