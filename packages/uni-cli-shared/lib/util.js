const path = require('path')
const fs = require('fs')
const hash = require('hash-sum')
const crypto = require('crypto')
const escapeStringRegexp = require('escape-string-regexp')
const escapeGlob = require('glob-escape')
const webpack = require('webpack')

const isWin = /^win/.test(process.platform)

const normalizePath = path => (isWin ? path.replace(/\\/g, '/') : path)

let aboutPkg
try {
  aboutPkg = require(path.resolve(__dirname, '../../../../../about/package.json'))
} catch (e) {}

const isInHBuilderX = !!aboutPkg
const isInHBuilderXAlpha = !!(isInHBuilderX && aboutPkg.alpha)

function getCLIContext () {
  var context = path.resolve(__dirname, '../../../../')
  // const isInHBuilderX = fs.existsSync(path.resolve(context, 'bin/uniapp-cli.js'))
  if (isInHBuilderX) {
    return context
  }
  const pnpmFind = __dirname.match(/.+?[/\\].pnpm[/\\]/)
  if (pnpmFind) {
    const pnpm = pnpmFind[0]
    context = path.resolve(pnpm, '../../')
  }
  const isInCLI = fs.existsSync(path.resolve(context, './src'))
  if (isInCLI) {
    return context
  }
  return process.cwd()
}

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
  str = normalizePath(str).replace(NODE_MODULES_REGEX, 'node-modules')
  // HBuilderX 内置模块路径转换
  str = str.replace(/.*\/plugins\/uniapp-cli\/node[-_]modules/, 'node-modules')
  if (process.env.UNI_PLATFORM === 'mp-alipay') {
    str = str.replace('node-modules/@', 'node-modules/npm-scope-')
  }
  return str
}

const _hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * pathToRegexp
 * @param {string} pathString
 * @param {{start:?boolean,end:?boolean,global:?boolean}?} options
 * @returns {RegExp}
 */
function pathToRegexp (pathString, options = {}) {
  return new RegExp((options.start ? '^' : '') + escapeStringRegexp(pathString) + (options.end ? '$' : ''), 'i' + (options.global ? 'g' : ''))
}

/**
 * pathToGlob
 * @param {string} pathString
 * @param {string} glob
 * @param {{windows:?boolean,escape:?boolean}?} options
 * @returns {string}
 */
function pathToGlob (pathString, glob, options = {}) {
  const isWindows = 'windows' in options ? options.windows : /^win/.test(process.platform)
  const useEscape = options.escape
  const str = isWindows ? pathString.replace(/\\/g, '/') : pathString
  let safeStr = escapeGlob(str)
  if (isWindows || !useEscape) {
    safeStr = safeStr.replace(/\\(.)/g, '[$1]')
  }
  return path.posix.join(safeStr, glob)
}
/**
 * 字节跳动小程序可以配置 ext:// 开头的插件页面模板，如 ext://microapp-trade-plugin/order-confirm
 * @param pagePath
 * @returns
 */
function isNormalPage (pagePath) {
  return !pagePath.startsWith('ext://')
}

function createSource (content) {
  return webpack.version[0] > 4 ? new webpack.sources.RawSource(content) : {
    size () {
      return Buffer.byteLength(content, 'utf8')
    },
    source () {
      return content
    }
  }
}

function deleteAsset (compilation, name) {
  if ('deleteAsset' in compilation) {
    compilation.deleteAsset(name)
  } else {
    delete compilation.assets[name]
  }
}

module.exports = {
  isNormalPage,
  isInHBuilderX,
  isInHBuilderXAlpha,
  getCLIContext,
  normalizeNodeModules,
  md5,
  hasOwn (obj, key) {
    return _hasOwnProperty.call(obj, key)
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
  pathToRegexp,
  pathToGlob,
  getComponentName: cached((str) => {
    if (str.indexOf('wx-') === 0) {
      return str.replace('wx-', 'weixin-')
    }
    return str
  }),
  getTemplatePath () {
    return path.join(__dirname, '../template')
  },
  createSource,
  deleteAsset
}
