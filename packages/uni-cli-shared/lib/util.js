const path = require('path')
const hash = require('hash-sum')
const crypto = require('crypto')

const isWin = /^win/.test(process.platform)

const normalizePath = path => (isWin ? path.replace(/\\/g, '/') : path)

let aboutPkg
try {
  aboutPkg = require(path.resolve(__dirname, '../../../../../about/package.json'))
} catch (e) {}

const isInHBuilderX = !!aboutPkg
const isInHBuilderXAlpha = !!(isInHBuilderX && aboutPkg.alpha)

function removeExt (str, ext) {
  if (ext) {
    const reg = new RegExp(ext.replace(/\./, '\\.') + '$')
    return normalizePath(str.replace(reg, ''))
  }
  return normalizePath(str.replace(/\.\w+$/g, ''))
}

function hashify (filepath) {
  const relativePath = removeExt(path.relative(process.env.UNI_INPUT_DIR, filepath))
  return hash(relativePath)
}

function md5 (str) {
  const hash = crypto.createHash('md5')
  hash.update(str)
  return hash.digest('hex')
}

function cached (fn) {
  const cache = Object.create(null)
  return function cachedFn (str) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

const camelizeRE = /-(\w)/g

const camelize = cached((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})

function capitalize (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const hyphenateRE = /\B([A-Z])/g

const hyphenate = cached((str) => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
})

const REGEX_PX = /(:|\s|\(|\/)[+-]?\d+(\.\d+)?u?px/g
const REGEX_UPX = /(:|\s|\(|\/)[+-]?\d+(\.\d+)?upx/g

function convertStaticStyle (styleStr) {
  if (typeof styleStr === 'string') {
    let matches = styleStr.match(REGEX_UPX)
    if (matches && matches.length) {
      matches.forEach(function (match) {
        styleStr = styleStr.replace(match, match.substr(0, match.length - 3) + 'rpx')
      })
    }
    // TODO 不应该再支持 px 转 rpx
    if (process.UNI_TRANSFORM_PX) { // 需要转换 px
      matches = styleStr.match(REGEX_PX)
      if (matches && matches.length) {
        matches.forEach(function (match) {
          styleStr = styleStr.replace(match, match.substr(0, match.length - 2) + 'rpx')
        })
      }
    }
  }
  return styleStr
}

function hasModule (name) {
  try {
    return !!require.resolve(name)
  } catch (e) {}
  return false
}

const NODE_MODULES_REGEX = /(\.\.\/)?node_modules/g

function normalizeNodeModules (str) {
  str = str.replace(NODE_MODULES_REGEX, 'node-modules')
  if (process.env.UNI_PLATFORM === 'mp-alipay') {
    str = str.replace('node-modules/@', 'node-modules/npm-scope-')
  }
  return str
}

module.exports = {
  isInHBuilderX,
  isInHBuilderXAlpha,
  normalizeNodeModules,
  md5,
  hasOwn (obj, key) {
    return hasOwnProperty.call(obj, key)
  },
  hasModule,
  parseStyle (style = {}) {
    Object.keys(style).forEach(name => {
      if (global.uniPlugin.platforms.includes(name)) {
        if (name === process.env.UNI_PLATFORM) {
          Object.assign(style, style[name] || {})
        }
        delete style[name]
      }
    })
    return style
  },
  hashify,
  removeExt,
  camelize,
  capitalize,
  hyphenate,
  normalizePath,
  convertStaticStyle,
  getComponentName: cached((str) => {
    if (str.indexOf('wx-') === 0) {
      return str.replace('wx-', 'weixin-')
    }
    return str
  }),
  getTemplatePath () {
    return path.join(__dirname, '../template')
  }
}
