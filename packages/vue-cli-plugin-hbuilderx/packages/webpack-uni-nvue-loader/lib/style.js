var path = require('path')
var styler = require('weex-styler')
var {
  normalizePath
} = require('@dcloudio/uni-cli-shared')
module.exports = function (content, map) {
  this.cacheable && this.cacheable()
  this.callback(null, 'module.exports = ' + genStyleString(content, this), map)
}
const uniI18n = require('@dcloudio/uni-cli-i18n')
const print = require('../../../util/console')

// @todo:
// font-relative lengths: em, ex, ch, ic
// viewport-relative lengths: vi, vb
// https://drafts.csswg.org/css-values/#lengths
var REGEXP_LENGTH = /^([-+]?[0-9]*\.?[0-9]+)(rem|vw|vh|vmin|vmax|cm|mm|q|in|pt|pc|px)$/

function convertLength (k, v) {
  if (typeof v !== 'string') {
    return v
  }
  var result = v.match(REGEXP_LENGTH)
  if (result) {
    if (result[2] === 'px') {
      return result[1]
    }
    return result[1] + 'CSS_UNIT_' + result[2].toUpperCase()
  }
  return v
}

let isFirst = true

function genStyleString (input, loader) {
  var output = '{}'
  var resourcePath = normalizePath(path.relative(process.env.UNI_INPUT_DIR, loader.resourcePath))
  styler.parse(input, function (err, obj) {
    if (err) {
      loader.emitError(err)
      return
    }
    if (obj && obj.jsonStyle) {
      if (obj.log) {
        var msgs = []
        obj.log.map((log) => {
          if (log.reason.indexOf('NOTE:') !== 0) { // 仅显示警告，错误信息
            if (log.selectors) {
              msgs.push(`${log.selectors}: ${log.reason} at ${resourcePath}:${log.line}`)
            } else {
              msgs.push(`${log.reason} at ${resourcePath}:${log.line}`)
            }
          }
        })
        if (msgs.length) {
          if (isFirst) {
            msgs.unshift(uniI18n.__('pluginHbuilderx.nvueCssWarning'))
            isFirst = false
          }
          msgs.forEach(msg => {
            switch (msg.split(':')[0]) {
              case 'ERROR':
                print.error(msg)
                break
              case 'WARNING' :
                print.warn(msg)
                break
              default:
                print.log(msg)
                break
            }
          })
        }
      }
      try {
        output = JSON.stringify(obj.jsonStyle, convertLength, 2)
          .replace(/"([-+]?[0-9]*\.?[0-9]+)CSS_UNIT_([A-Z]+)"/g, '$1 * CSS_UNIT.$2')
      } catch (e) {}
    }
  })
  return output
}
