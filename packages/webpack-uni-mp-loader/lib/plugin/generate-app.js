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
    const entryPage = Object.keys(process.UNI_ENTRY)[1]
    const targetCssName = entryPage ? (entryPage + ext) : `common/main${ext}`

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

  if (compilation.assets[`common/main${ext}`]) { // 是否存在 main.css
    importMainCss = `@import './common/main${ext}';`
  }

  if (compilation.assets[`common/vendor${ext}`]) { // 是否存在 vendor.css
    importVendorCss += `@import './common/vendor${ext}';`
  }

  const runtimeJsPath = 'common/runtime.js'

  if ( // app 和 baidu 不需要
    process.env.UNI_PLATFORM !== 'app-plus' &&
    process.env.UNI_PLATFORM !== 'mp-baidu' &&
    compilation.assets[runtimeJsPath]
  ) {
    const source =
      `
  !function(){try{var r=Function("return this")();r&&!r.Math&&Object.assign(r,{Array:Array,Date:Date,Error:Error,Function:Function,Math:Math,Object:Object,RegExp:RegExp,String:String,TypeError:TypeError,setTimeout:setTimeout,clearTimeout:clearTimeout,setInterval:setInterval,clearInterval:clearInterval})}catch(r){}}();
  ${compilation.assets[runtimeJsPath].source()}
  `
    compilation.assets[runtimeJsPath] = {
      size () {
        return Buffer.byteLength(source, 'utf8')
      },
      source () {
        return source
      }
    }
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
${importVendorCss}`
  }]
}
