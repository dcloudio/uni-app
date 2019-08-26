var path = require('path')
var styler = require('weex-styler')
var {
    normalizePath
} = require('@dcloudio/uni-cli-shared')
module.exports = function(content) {
    this.cacheable && this.cacheable()
    return 'module.exports = ' + genStyleString(content.replace(/\!important/g, ''), this)
}

// @todo:
// font-relative lengths: em, ex, ch, ic
// viewport-relative lengths: vi, vb
// https://drafts.csswg.org/css-values/#lengths
var REGEXP_LENGTH = /^([-+]?[0-9]*\.?[0-9]+)(rem|vw|vh|vmin|vmax|cm|mm|q|in|pt|pc|px)$/

function convertLength(k, v) {
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

function genStyleString(input, loader) {
    var output = '{}'
    var resourcePath = normalizePath(path.relative(process.env.UNI_INPUT_DIR, loader.resourcePath))
    styler.parse(input, function(err, obj) {
        if (err) {
            loader.emitError(err)
            return
        }
        if (obj && obj.jsonStyle) {
            if (obj.log) {
                var msgs = []
                obj.log.map((log) => {
                    if (log.reason.indexOf('NOTE:') !== 0) { //仅显示警告，错误信息
                        if (log.selectors) {
                            msgs.push(`${log.selectors}: ${log.reason} at ${resourcePath}:${log.line}`)
                        } else {
                            msgs.push(`${log.reason} at ${resourcePath}:${log.line}`)
                        }
                    }
                })
                if (msgs.length) {
                    if (isFirst) {
                        msgs.unshift(
                            `nvue中不支持如下css。如全局或公共样式受影响，建议将告警样式写在ifndef APP-PLUS-NVUE的条件编译中，详情如下：`
                        )
                        isFirst = false
                    }
                    msgs.forEach(msg => console.warn(msg))
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
