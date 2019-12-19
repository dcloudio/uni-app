const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')

// 初始化环境变量
const defaultInputDir = '../../../../src'
const defaultOutputDir = '../../../../dist/' +
  (process.env.NODE_ENV === 'production' ? 'build' : 'dev') + '/' +
  process.env.UNI_PLATFORM

if (process.env.UNI_INPUT_DIR && process.env.UNI_INPUT_DIR.indexOf('./') === 0) {
  process.env.UNI_INPUT_DIR = path.resolve(process.cwd(), process.env.UNI_INPUT_DIR)
}
if (process.env.UNI_OUTPUT_DIR && process.env.UNI_OUTPUT_DIR.indexOf('./') === 0) {
  process.env.UNI_OUTPUT_DIR = path.resolve(process.cwd(), process.env.UNI_OUTPUT_DIR)
}

process.env.UNI_PLATFORM = process.env.UNI_PLATFORM || 'h5'
process.env.VUE_APP_PLATFORM = process.env.UNI_PLATFORM
process.env.UNI_INPUT_DIR = process.env.UNI_INPUT_DIR || path.resolve(__dirname, defaultInputDir)
process.env.UNI_OUTPUT_DIR = process.env.UNI_OUTPUT_DIR || path.resolve(__dirname, defaultOutputDir)

if (process.env.UNI_PLATFORM === 'app-plus') {
  process.env.UNI_OUTPUT_TMP_DIR = path.resolve(process.env.UNI_OUTPUT_DIR, '../.tmp/app-plus')
}

process.env.UNI_CLI_CONTEXT = path.resolve(__dirname, '../../../../')

process.UNI_LIBRARIES = process.UNI_LIBRARIES || ['@dcloudio/uni-ui']

if (process.env.NODE_ENV === 'production') { // 发行模式,不启用 cache
  delete process.env.UNI_USING_CACHE
}

const {
  isSupportSubPackages,
  runByHBuilderX,
  // isInHBuilderXAlpha,
  getPagesJson,
  getManifestJson
} = require('@dcloudio/uni-cli-shared')

const pagesJsonObj = getPagesJson()
// 读取分包
process.UNI_SUBPACKAGES = {}
if (Array.isArray(pagesJsonObj.subPackages)) {
  pagesJsonObj.subPackages.forEach(subPackage => {
    if (subPackage && subPackage.root) {
      const {
        name,
        root,
        independent
      } = subPackage
      process.UNI_SUBPACKAGES[root] = {
        name,
        root,
        independent
      }
    }
  })
}

const manifestJsonObj = getManifestJson()
const platformOptions = manifestJsonObj[process.env.UNI_PLATFORM] || {}

if (manifestJsonObj.debug) {
  process.env.VUE_APP_DEBUG = true
}

process.UNI_STAT_CONFIG = {
  appid: manifestJsonObj.appid
}

// 默认启用 自定义组件模式
// if (isInHBuilderXAlpha) {
let usingComponentsAbsent = false
if (!platformOptions.hasOwnProperty('usingComponents')) {
  usingComponentsAbsent = true
}
platformOptions.usingComponents = true
// }

if (process.env.UNI_PLATFORM === 'h5') {
  const optimization = platformOptions.optimization
  if (optimization) {
    // 发行模式且主动启用优化
    const treeShaking = optimization.treeShaking
    if (
      treeShaking &&
      treeShaking.enable &&
      process.env.NODE_ENV === 'production'
    ) {
      process.env.UNI_OPT_TREESHAKINGNG = true
      process.UNI_USER_APIS = new Set()
      if (Array.isArray(treeShaking.modules) && treeShaking.modules.length) {
        const {
          parseUserApis
        } = require('@dcloudio/uni-cli-shared/lib/api')
        try {
          const modules = require('@dcloudio/uni-h5/lib/modules.json')
          process.UNI_USER_APIS = parseUserApis(treeShaking.modules || [], modules)
        } catch (e) {}
      }
    }
    if (optimization.prefetch) {
      process.env.UNI_OPT_PREFETCH = true
    }
    if (optimization.preload) {
      process.env.UNI_OPT_PRELOAD = true
    }
  }
}

if (process.env.UNI_PLATFORM === 'mp-qq') { // QQ小程序 强制自定义组件模式
  platformOptions.usingComponents = true
}

let isNVueCompiler = true
if (process.env.UNI_PLATFORM === 'app-plus') {
  if (platformOptions.nvueCompiler === 'weex') {
    isNVueCompiler = false
  }
  if (platformOptions.renderer !== 'native' && // 非 native
    (
      platformOptions.compilerVersion === '3' ||
      platformOptions.compilerVersion === 3
    )
  ) {
    delete process.env.UNI_USING_CACHE
    process.env.UNI_USING_V3 = true
    platformOptions.usingComponents = true
    process.env.UNI_OUTPUT_TMP_DIR = ''
    isNVueCompiler = true // v3 目前仅支持 uni-app 模式
  }
  if (platformOptions.renderer === 'native') {
    // 纯原生目前不提供 cache
    delete process.env.UNI_USING_CACHE
    process.env.UNI_USING_NATIVE = true
    process.env.UNI_USING_V8 = true
    process.env.UNI_OUTPUT_TMP_DIR = ''
  }
} else { // 其他平台，待确认配置方案
  if (
    manifestJsonObj['app-plus'] &&
    manifestJsonObj['app-plus']['nvueCompiler'] === 'weex'
  ) {
    isNVueCompiler = false
  }
}

if (isNVueCompiler) {
  process.env.UNI_USING_NVUE_COMPILER = true
}

if (platformOptions.usingComponents === true) {
  if (process.env.UNI_PLATFORM !== 'h5') {
    process.env.UNI_USING_COMPONENTS = true
  }
  if (process.env.UNI_PLATFORM === 'app-plus') {
    process.env.UNI_USING_V8 = true
  }
}

if (
  process.env.UNI_USING_COMPONENTS ||
  process.env.UNI_PLATFORM === 'h5'
) { // 自定义组件模式或 h5 平台
  const uniStatistics = Object.assign(
    manifestJsonObj.uniStatistics || {},
    platformOptions.uniStatistics || {}
  )

  if (uniStatistics.enable !== false) {
    process.env.UNI_USING_STAT = true
    if (!process.UNI_STAT_CONFIG.appid && process.env.NODE_ENV === 'production') {
      console.log()
      console.warn(`当前应用未配置Appid，无法使用uni统计，详情参考：https://ask.dcloud.net.cn/article/36303`)
      console.log()
    }
  }
}

if (process.env.UNI_USING_COMPONENTS) { // 是否启用分包优化
  if (platformOptions.optimization) {
    if (
      isSupportSubPackages() &&
      platformOptions.optimization.subPackages &&
      Object.keys(process.UNI_SUBPACKAGES).length
    ) {
      process.env.UNI_OPT_SUBPACKAGES = true
    }
  }
}

const warningMsg =
  usingComponentsAbsent
    ? `该应用之前可能是非自定义组件模式，目前以自定义组件模式运行。非自定义组件将于2019年11月1日起停止支持。详见：https://ask.dcloud.net.cn/article/36385`
    : `uni-app将于2019年11月1日起停止支持非自定义组件模式 [详情](https://ask.dcloud.net.cn/article/36385)`

const needWarning = !platformOptions.usingComponents || usingComponentsAbsent
let hasNVue = false
// 输出编译器版本等信息
if (process.env.UNI_USING_NATIVE) {
  console.log('当前nvue编译模式：' + (isNVueCompiler ? 'uni-app' : 'weex') +
    ' 。编译模式差异见：https://ask.dcloud.net.cn/article/36074')
} else if (process.env.UNI_PLATFORM !== 'h5') {
  try {
    let info = ''
    if (process.env.UNI_PLATFORM === 'app-plus') {
      const pagesPkg = require('@dcloudio/webpack-uni-pages-loader/package.json')
      if (pagesPkg) {
        const v3Tips = `（v3）详见：https://ask.dcloud.net.cn/article/36599。`
        info = '编译器版本：' + pagesPkg['uni-app']['compilerVersion'] + (process.env.UNI_USING_V3 ? v3Tips : '')
      }
      if (process.env.UNI_USING_V3) {
        console.log(info)
      } else {
        const glob = require('glob')
        hasNVue = !!glob.sync('pages/**/*.nvue', {
          cwd: process.env.UNI_INPUT_DIR
        }).length
        if (hasNVue) {
          console.log(info)
          if (needWarning) {
            console.log(warningMsg)
          }
          console.log('当前nvue编译模式：' + (isNVueCompiler ? 'uni-app' : 'weex') +
            ' 。编译模式差异见：https://ask.dcloud.net.cn/article/36074')
        } else {
          console.log(info)
          if (needWarning) {
            console.log(warningMsg)
          }
        }
      }
    } else {
      if (needWarning) {
        console.log(warningMsg)
      }
    }
  } catch (e) {}
}
if (process.env.NODE_ENV !== 'production') { // 运行模式性能提示
  let perfMsg = `请注意运行模式下，因日志输出、sourcemap以及未压缩源码等原因，性能和包体积，均不及发行模式。`
  if (hasNVue) { // app-nvue
    perfMsg = perfMsg + `尤其是app-nvue的sourcemap影响较大`
  } else if (process.env.UNI_PLATFORM.indexOf('mp-') === 0) { // 小程序
    perfMsg = perfMsg + `若要正式发布，请点击发行菜单或使用cli发布命令进行发布`
  }
  console.log(perfMsg)
}

const moduleAlias = require('module-alias')

// 将 template-compiler 指向修订后的版本
moduleAlias.addAlias('vue-template-compiler', '@dcloudio/vue-cli-plugin-uni/packages/vue-template-compiler')
moduleAlias.addAlias('@megalo/template-compiler', '@dcloudio/vue-cli-plugin-uni/packages/@megalo/template-compiler')
moduleAlias.addAlias('mpvue-template-compiler', '@dcloudio/vue-cli-plugin-uni/packages/mpvue-template-compiler')
// vue-loader
moduleAlias.addAlias('vue-loader', '@dcloudio/vue-cli-plugin-uni/packages/vue-loader')

if (process.env.UNI_USING_V3 && process.env.UNI_PLATFORM === 'app-plus') {
  moduleAlias.addAlias('vue-style-loader', '@dcloudio/vue-cli-plugin-uni/packages/app-vue-style-loader')
}

if (process.env.UNI_PLATFORM === 'h5') {
  moduleAlias.addAlias('vue-style-loader', '@dcloudio/vue-cli-plugin-uni/packages/h5-vue-style-loader')
}

// vue cache
if ( // 非 h5 ,非 v3,非 native
  process.env.UNI_PLATFORM !== 'h5' &&
  !process.env.UNI_USING_V3 &&
  !process.env.UNI_USING_NATIVE
) {
  moduleAlias.addAlias('./loaders/pitcher', (fromPath, request, alias) => {
    if (fromPath.indexOf('vue-loader') !== -1) {
      return require.resolve('@dcloudio/vue-cli-plugin-hbuilderx/packages/vue-loader/lib/loaders/pitcher')
    }
    return request
  })
}

if (process.env.UNI_PLATFORM === 'mp-toutiao') {
  // !important 始终带有一个空格
  moduleAlias.addAlias(
    'postcss-normalize-whitespace',
    '@dcloudio/vue-cli-plugin-uni/packages/postcss-normalize-whitespace'
  )
}

if (runByHBuilderX) {
  const oldError = console.error
  console.error = function (msg) {
    if (typeof msg === 'string' && msg.includes(
      '[BABEL] Note: The code generator has deoptimised the styling of')) {
      const filePath = msg.replace('[BABEL] Note: The code generator has deoptimised the styling of ', '').split(
        ' as ')[0]
      console.log('[警告] `' + path.relative(process.env.UNI_INPUT_DIR, filePath) +
        '` 文件体积超过 500KB，已跳过压缩以及 ES6 转 ES5 的处理，手机端使用过大的js库影响性能。')
    } else {
      oldError.apply(console, arguments)
      // TODO 如果是首次运行遇到错误直接退出
    }
  }
}

if (
  process.env.UNI_USING_CACHE &&
  process.env.UNI_PLATFORM !== 'h5' &&
  !process.env.UNI_USING_V3 &&
  !process.env.UNI_USING_NATIVE
) { // 使用 cache, 拷贝 cache 的 json
  const cacheJsonDir = path.resolve(
    process.env.UNI_CLI_CONTEXT,
    'node_modules/.cache/uni-pages-loader/' + process.env.UNI_PLATFORM
  )
  if (!fs.existsSync(cacheJsonDir)) { //  创建 cache 目录
    mkdirp(cacheJsonDir)
  } else {
    require('@dcloudio/uni-cli-shared/lib/cache').restore()
  }
}
// 组件自动导入配置
process.UNI_AUTO_COMPONENTS = []
const usingAutoImportComponents = pagesJsonObj.usingAutoImportComponents
if (usingAutoImportComponents) {
  Object.keys(usingAutoImportComponents).forEach(pattern => {
    process.UNI_AUTO_COMPONENTS.push({
      pattern: new RegExp(pattern),
      replacement: usingAutoImportComponents[pattern]
    })
  })
}

runByHBuilderX && console.log(`正在编译中...`)

module.exports = {
  manifestPlatformOptions: platformOptions
}
