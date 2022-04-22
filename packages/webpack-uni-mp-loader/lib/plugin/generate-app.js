const {
  getPlatformExts
} = require('../shared')

const {
  getShadowCss,
  getPlatformGlobal
} = require('@dcloudio/uni-cli-shared')

const {
  getSpecialMethods
} = require('@dcloudio/uni-cli-shared/lib/cache')

module.exports = function generateApp (compilation) {
  const ext = getPlatformExts().style

  let importMainCss = ''
  let importVendorCss = ''

  if (
    process.env.NODE_ENV === 'production' &&
    process.env.UNI_PLATFORM !== 'app-plus'
  ) {
    const targetCssName = `common/main${ext}`

    if (!compilation.assets[targetCssName]) {
      compilation.assets[targetCssName] = {
        size () {
          return Buffer.byteLength(getShadowCss(), 'utf8')
        },
        source () {
          return getShadowCss()
        }
      }
    } else {
      const source = compilation.assets[targetCssName].source() + getShadowCss()
      compilation.assets[targetCssName] = {
        size () {
          return Buffer.byteLength(source, 'utf8')
        },
        source () {
          return source
        }
      }
    }
  }

  // 框架预设样式 用于隐藏自定义组件
  // TODO 分平台 import 不同 css
  const platforms = ['mp-weixin', 'mp-qq', 'mp-jd', 'mp-xhs', 'mp-toutiao', 'mp-lark']
  const presetStyle = platforms.includes(process.env.UNI_PLATFORM) ? '[data-custom-hidden="true"],[bind-data-custom-hidden="true"]{display: none !important;}' : ''

  if (compilation.assets[`common/main${ext}`]) { // 是否存在 main.css
    importMainCss = `@import './common/main${ext}';`
  }

  if (compilation.assets[`common/vendor${ext}`]) { // 是否存在 vendor.css
    importVendorCss += `@import './common/vendor${ext}';`
  }

  const runtimeJsPath = 'common/runtime.js'

  const asset = compilation.assets[runtimeJsPath]
  if ( // app 和 baidu 不需要
    process.env.UNI_PLATFORM !== 'app-plus' &&
    process.env.UNI_PLATFORM !== 'mp-baidu' &&
    asset &&
    !asset.source.__$wrappered
  ) {
    const source =
      `
  !function(){try{var a=Function("return this")();a&&!a.Math&&(Object.assign(a,{isFinite:isFinite,Array:Array,Date:Date,Error:Error,Function:Function,Math:Math,Object:Object,RegExp:RegExp,String:String,TypeError:TypeError,setTimeout:setTimeout,clearTimeout:clearTimeout,setInterval:setInterval,clearInterval:clearInterval}),"undefined"!=typeof Reflect&&(a.Reflect=Reflect))}catch(a){}}();
  ${asset.source()}
  `
    const newSource = function () {
      return source
    }
    newSource.__$wrappered = true
    compilation.assets[runtimeJsPath].source = newSource
  }

  const specialMethods = getSpecialMethods()

  let beforeCode = ''
  if (Object.keys(specialMethods).length) {
    beforeCode = `${getPlatformGlobal()}.specialMethods = ${JSON.stringify(specialMethods)}`
  }

  return [{
    file: 'app.js',
    source: `${beforeCode}
require('./common/runtime.js')
require('./common/vendor.js')
require('./common/main.js')`
  }, {
    file: 'app' + ext,
    source: `${importMainCss}
${importVendorCss}
${presetStyle}`
  }]
}
