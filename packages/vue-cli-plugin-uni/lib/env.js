const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const loaderUtils = require('loader-utils')
const moduleAlias = require('module-alias')

require('./error-reporting')

const hasOwnProperty = Object.prototype.hasOwnProperty

function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

const defaultInputDir = 'src'
if (process.env.UNI_INPUT_DIR && process.env.UNI_INPUT_DIR.indexOf('./') === 0) {
  process.env.UNI_INPUT_DIR = path.resolve(process.cwd(), process.env.UNI_INPUT_DIR)
}
process.env.UNI_INPUT_DIR = process.env.UNI_INPUT_DIR || path.resolve(process.cwd(), defaultInputDir)

const manifestJsonObj = require('@dcloudio/uni-cli-shared/lib/manifest').getManifestJson()

process.env.UNI_APP_ID = manifestJsonObj.appid || ''
process.env.UNI_APP_NAME = manifestJsonObj.name || ''

// 小程序 vue3 标记
if (process.env.UNI_PLATFORM.indexOf('mp-') === 0) {
  if (manifestJsonObj.vueVersion === '3' || manifestJsonObj.vueVersion === 3) {
    process.env.UNI_USING_VUE3 = true
    process.env.UNI_USING_VUE3_OPTIONS_API = true
  }
}

// 初始化全局插件对象
global.uniPlugin = require('@dcloudio/uni-cli-shared/lib/plugin').init()

const platformOptions = manifestJsonObj[process.env.UNI_SUB_PLATFORM || process.env.UNI_PLATFORM] || {}
// 插件校验环境
global.uniPlugin.validate.forEach(validate => {
  validate(platformOptions, manifestJsonObj)
})
process.UNI_MANIFEST = manifestJsonObj

process.env.VUE_APP_NAME = manifestJsonObj.name

process.env.UNI_USING_V3_SCOPED = true

process.env.UNI_CLOUD_PROVIDER = JSON.stringify([])

const isH5 = !process.env.UNI_SUB_PLATFORM && process.env.UNI_PLATFORM === 'h5'
const isProduction = process.env.NODE_ENV === 'production'

if (process.env.UNI_CLOUD_SPACES) {
  try {
    const spaces = JSON.parse(process.env.UNI_CLOUD_SPACES)
    if (Array.isArray(spaces)) {
      const hasUniCloudSpace = spaces.length > 0
      if (spaces.length === 1) {
        const space = spaces[0]
        console.log(`本项目的uniCloud使用的默认服务空间spaceId为：${space.id}`)
      }

      if (
        hasUniCloudSpace &&
        isH5 &&
        isProduction
      ) {
        console.warn(
          '发布H5，需要在uniCloud后台操作，绑定安全域名，否则会因为跨域问题而无法访问。教程参考：https://uniapp.dcloud.io/uniCloud/quickstart?id=useinh5')
      } else if (
        hasUniCloudSpace &&
        isH5 &&
        !isProduction
      ) {
        console.warn(
          '当前项目使用了uniCloud，为避免云函数调用跨域问题，建议在HBuilderX内置浏览器里调试，如使用外部浏览器需处理跨域，详见：https://uniapp.dcloud.io/uniCloud/quickstart?id=useinh5'
        )
      }

      process.env.UNI_CLOUD_PROVIDER = JSON.stringify(spaces.map(space => {
        if (space.clientSecret) {
          return {
            provider: space.provider || 'aliyun',
            spaceName: space.name,
            spaceId: space.id,
            clientSecret: space.clientSecret,
            endpoint: space.apiEndpoint
          }
        } else {
          return {
            provider: space.provider || 'tencent',
            spaceName: space.name,
            spaceId: space.id
          }
        }
      }))
    }
  } catch (e) {}
}

// 初始化环境变量
const defaultOutputDir = '../../../../dist/' +
  (process.env.NODE_ENV === 'production' ? 'build' : 'dev') + '/' +
  (process.env.UNI_SUB_PLATFORM || process.env.UNI_PLATFORM)

process.env.UNI_OUTPUT_DEFAULT_DIR = path.resolve(__dirname, defaultOutputDir)
if (process.env.UNI_OUTPUT_DIR && process.env.UNI_OUTPUT_DIR.indexOf('./') === 0) {
  process.env.UNI_OUTPUT_DIR = path.resolve(process.cwd(), process.env.UNI_OUTPUT_DIR)
}

process.env.UNI_PLATFORM = process.env.UNI_PLATFORM || 'h5'
process.env.VUE_APP_PLATFORM = process.env.UNI_PLATFORM
process.env.UNI_OUTPUT_DIR = process.env.UNI_OUTPUT_DIR || process.env.UNI_OUTPUT_DEFAULT_DIR

if (process.env.UNI_PLATFORM === 'app-plus') {
  process.env.UNI_OUTPUT_TMP_DIR = path.resolve(process.env.UNI_OUTPUT_DIR, '../.tmp/app-plus')
}

process.env.UNI_CLI_CONTEXT = path.resolve(__dirname, '../../../../')

process.UNI_LIBRARIES = process.UNI_LIBRARIES || ['@dcloudio/uni-ui']

if (process.env.NODE_ENV === 'production') { // 发行模式,不启用 cache
  delete process.env.UNI_USING_CACHE
}

const {
  normalizePath,
  isSupportSubPackages,
  runByHBuilderX,
  getPagesJson
} = require('@dcloudio/uni-cli-shared')

process.env.RUN_BY_HBUILDERX = JSON.stringify(runByHBuilderX)

const {
  initUniModules
} = require('@dcloudio/uni-cli-shared/lib/uni_modules')

initUniModules()

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

process.UNI_PAGES = pagesJsonObj

if (manifestJsonObj.debug) {
  process.env.VUE_APP_DEBUG = true
}

process.UNI_STAT_CONFIG = {
  appid: manifestJsonObj.appid
}

// 默认启用 自定义组件模式
// if (isInHBuilderXAlpha) {
let usingComponentsAbsent = false
if (!hasOwn(platformOptions, 'usingComponents')) {
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
  const buffer = fs.readFileSync(require.resolve('@dcloudio/uni-h5/dist/index.css'))
  process.env.VUE_APP_INDEX_CSS_HASH = loaderUtils.getHashDigest(buffer, 'md5', 'hex', 8)
}

if (process.env.UNI_PLATFORM === 'mp-qq') { // QQ小程序 强制自定义组件模式
  platformOptions.usingComponents = true
}

let isNVueCompiler = true
if (process.env.UNI_PLATFORM === 'app-plus') {
  if (platformOptions.nvueCompiler === 'weex') {
    isNVueCompiler = false
  }

  delete process.env.UNI_USING_CACHE
  if (platformOptions.renderer === 'native') {
    process.env.UNI_USING_V3_NATIVE = true
  } else {
    process.env.UNI_USING_V3 = true
    platformOptions.usingComponents = true
  }
  process.env.UNI_OUTPUT_TMP_DIR = ''
  // isNVueCompiler = true // v3 目前仅支持 uni-app 模式

  // v3 支持指定 js 混淆（仅发行模式）
  if (
    process.env.NODE_ENV === 'production' &&
    process.env.UNI_USING_V3
  ) {
    const resources = platformOptions.confusion &&
      platformOptions.confusion.resources
    const resourcesKeys = resources &&
      Object.keys(resources).filter(filepath => path.extname(filepath) === '.js')
    if (resourcesKeys && resourcesKeys.length) {
      process.UNI_CONFUSION = resourcesKeys.map(filepath =>
        normalizePath(path.resolve(process.env.UNI_INPUT_DIR, filepath))
      )
    }
  }
} else { // 其他平台，待确认配置方案
  if (
    manifestJsonObj['app-plus'] &&
    manifestJsonObj['app-plus'].nvueCompiler === 'weex'
  ) {
    isNVueCompiler = false
  }
}

if (isNVueCompiler) {
  process.env.UNI_USING_NVUE_COMPILER = true
}

if (platformOptions.nvueStyleCompiler === 'uni-app') {
  process.env.UNI_USING_NVUE_STYLE_COMPILER = true
} else {
  platformOptions.nvueStyleCompiler = 'weex'
}

if (platformOptions.usingComponents === true) {
  if (process.env.UNI_PLATFORM !== 'h5') {
    process.env.UNI_USING_COMPONENTS = true
  }
  if (process.env.UNI_PLATFORM === 'app-plus') {
    process.env.UNI_USING_V8 = true
  }
}

// 兼容历史配置 betterScopedSlots
const modes = ['legacy', 'auto', 'augmented']
const scopedSlotsCompiler = !platformOptions.scopedSlotsCompiler && platformOptions.betterScopedSlots ? modes[2]
  : platformOptions.scopedSlotsCompiler
process.env.SCOPED_SLOTS_COMPILER = modes.includes(scopedSlotsCompiler) ? scopedSlotsCompiler : modes[1]
// 快手小程序抽象组件编译报错，如未指定 legacy 固定为 augmented 模式
if (process.env.UNI_PLATFORM === 'mp-kuaishou' && process.env.SCOPED_SLOTS_COMPILER !== modes[0]) {
  process.env.SCOPED_SLOTS_COMPILER = modes[2]
}

if (
  process.env.UNI_USING_COMPONENTS ||
  process.env.UNI_PLATFORM === 'h5'
) { // 自定义组件模式或 h5 平台
  const uniStatistics = Object.assign(
    manifestJsonObj.uniStatistics || {},
    platformOptions.uniStatistics || {}
  )

  if (uniStatistics.enable === true) {
    process.env.UNI_USING_STAT = true
    if (!process.UNI_STAT_CONFIG.appid && process.env.NODE_ENV === 'production') {
      console.log()
      console.warn('当前应用未配置Appid，无法使用uni统计，详情参考：https://ask.dcloud.net.cn/article/36303')
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
    ? '该应用之前可能是非自定义组件模式，目前以自定义组件模式运行。非自定义组件已于2019年11月1日起停止支持。详见：https://ask.dcloud.net.cn/article/36385'
    : 'uni-app已于2019年11月1日起停止支持非自定义组件模式 [详情](https://ask.dcloud.net.cn/article/36385)'

const needWarning = !platformOptions.usingComponents || usingComponentsAbsent
let hasNVue = false
// 输出编译器版本等信息
if (process.env.UNI_USING_NATIVE || process.env.UNI_USING_V3_NATIVE) {
  console.log('当前nvue编译模式' + (process.env.UNI_USING_V3_NATIVE ? '（v3）' : '') + '：' + (isNVueCompiler ? 'uni-app'
    : 'weex') +
    ' 。编译模式差异见：https://ask.dcloud.net.cn/article/36074')
} else if (process.env.UNI_PLATFORM !== 'h5' && process.env.UNI_PLATFORM !== 'quickapp-native') {
  try {
    let info = ''
    if (process.env.UNI_PLATFORM === 'app-plus') {
      const pagesPkg = require('@dcloudio/webpack-uni-pages-loader/package.json')
      if (pagesPkg) {
        const v3Tips = '（v3）详见：https://ask.dcloud.net.cn/article/36599。'
        info = '编译器版本：' + pagesPkg['uni-app'].compilerVersion + (process.env.UNI_USING_V3 ? v3Tips : '')
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
  let perfMsg = '请注意运行模式下，因日志输出、sourcemap以及未压缩源码等原因，性能和包体积，均不及发行模式。'
  if (hasNVue) { // app-nvue
    perfMsg = perfMsg + '尤其是app-nvue的sourcemap影响较大'
  } else if (process.env.UNI_PLATFORM.indexOf('mp-') === 0) { // 小程序
    perfMsg = perfMsg + '若要正式发布，请点击发行菜单或使用cli发布命令进行发布'
  }
  console.log(perfMsg)
}

// 将 template-compiler 指向修订后的版本
moduleAlias.addAlias('vue-template-compiler', '@dcloudio/vue-cli-plugin-uni/packages/vue-template-compiler')
moduleAlias.addAlias('@megalo/template-compiler', '@dcloudio/vue-cli-plugin-uni/packages/@megalo/template-compiler')
moduleAlias.addAlias('mpvue-template-compiler', '@dcloudio/vue-cli-plugin-uni/packages/mpvue-template-compiler')
// vue-loader
moduleAlias.addAlias('vue-loader', '@dcloudio/vue-cli-plugin-uni/packages/vue-loader')

if (process.env.UNI_USING_V3 && process.env.UNI_PLATFORM === 'app-plus') {
  moduleAlias.addAlias('./runtime/getUrl.js', '@dcloudio/vue-cli-plugin-uni/lib/app-plus/getUrl.js')
  moduleAlias.addAlias('../runtime/getUrl.js', '@dcloudio/vue-cli-plugin-uni/lib/app-plus/getUrl.js')
  moduleAlias.addAlias('vue-style-loader', '@dcloudio/vue-cli-plugin-uni/packages/app-vue-style-loader')
}

if (process.env.UNI_PLATFORM === 'h5') {
  moduleAlias.addAlias('vue-style-loader', '@dcloudio/vue-cli-plugin-uni/packages/h5-vue-style-loader')
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
  !process.env.UNI_USING_NATIVE &&
  !process.env.UNI_USING_V3_NATIVE
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

const {
  initAutoImportComponents,
  initAutoImportScanComponents
} = require('@dcloudio/uni-cli-shared/lib/pages')

process.UNI_AUTO_SCAN_COMPONENTS = !(pagesJsonObj.easycom && pagesJsonObj.easycom.autoscan === false)
initAutoImportComponents(pagesJsonObj.easycom)
if (process.UNI_AUTO_SCAN_COMPONENTS) {
  initAutoImportScanComponents()
}

global.uniPlugin.configureEnv.forEach(configureEnv => {
  configureEnv()
})

if (
  process.env.UNI_PLATFORM === 'h5' ||
  (
    process.env.UNI_PLATFORM === 'app-plus' &&
    process.env.UNI_USING_V3
  )
) {
  const migrate = require('@dcloudio/uni-migration')
  const wxcomponentDirs = [path.resolve(process.env.UNI_INPUT_DIR, 'wxcomponents')]
  global.uniModules.forEach(module => {
    wxcomponentDirs.push(path.resolve(process.env.UNI_INPUT_DIR, 'uni_modules', module, 'wxcomponents'))
  })
  wxcomponentDirs.forEach(wxcomponentsDir => {
    if (fs.existsSync(wxcomponentsDir)) { // 转换 mp-weixin 小程序组件
      migrate(wxcomponentsDir, false, {
        silent: true // 不输出日志
      })
    }
  })
}

if (process.env.UNI_PLATFORM.startsWith('mp-')) {
  console.log('小程序各家浏览器内核及自定义组件实现机制存在差异，可能存在样式布局兼容问题，参考：https://uniapp.dcloud.io/matter?id=mp')
}

runByHBuilderX && console.log('正在编译中...')

module.exports = {
  manifestPlatformOptions: platformOptions
}
