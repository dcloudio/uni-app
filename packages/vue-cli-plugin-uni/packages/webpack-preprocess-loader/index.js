const path = require('path')
const utils = require('loader-utils')

const {
  normalizePath
} = require('@dcloudio/uni-cli-shared')

const preprocessor = require('./preprocess/lib/preprocess')

const ERRORS = {
  'html': `条件编译失败,参考示例(注意 ifdef 与 endif 必须配对使用):
<!--  #ifdef  %PLATFORM% -->
模板代码
<!--  #endif -->
`,
  'js': `条件编译失败,参考示例(注意 ifdef 与 endif 必须配对使用):
// #ifdef  %PLATFORM%
js代码
// #endif
`,
  'css': `条件编译失败,参考示例(注意 ifdef 与 endif 必须配对使用):
/*  #ifdef  %PLATFORM%  */
css代码
/*  #endif  */
`
}

const TAGS = {
  'html': 'template',
  'js': 'script',
  'css': 'style'
}

module.exports = function (content, map) {
  this.cacheable && this.cacheable()

  let types = utils.getOptions(this).type || 'js'

  const context = utils.getOptions(this).context || {}

  if (!Array.isArray(types)) {
    types = [types]
  }
  const resourcePath = this.resourcePath
  types.forEach(type => {
    try {
      content = preprocessor.preprocess(content, context, {
        type
      })
    } catch (e) {
      if (~['.nvue', '.vue'].indexOf(path.extname(resourcePath))) {
        console.error(`${TAGS[type]}节点 ${ERRORS[type]} at ` + normalizePath(path.relative(process.env.UNI_INPUT_DIR,
          resourcePath)) + ':1')
      } else {
        console.error(`${ERRORS[type]} at ` + normalizePath(path.relative(process.env.UNI_INPUT_DIR,
          resourcePath)) + ':1')
      }
    }
  })
  this.callback(null, content, map)
}
