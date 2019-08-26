const fs = require('fs')
const path = require('path')

const loaderUtils = require('loader-utils')

const {
  parseComponent
} = require('weex-template-compiler')

const {
  attrsToQuery
} = require('vue-loader/lib/codegen/utils')

const {
  normalizePath
} = require('@dcloudio/uni-cli-shared')

const appVuePath = path.resolve(process.env.UNI_INPUT_DIR, 'App.vue')

function genStyleRequest(style, i, stringifyRequest) {
  const src = style.src || normalizePath(appVuePath)
  const attrsQuery = attrsToQuery(style.attrs, 'css')
  const query = `?vue&type=style&index=${i}${attrsQuery}`
  return stringifyRequest(src + query)
}

function getAppStyleCode(stringifyRequest) {
  if (!process.env.UNI_USING_NVUE_COMPILER) {
    return ''
  }
  let code = 'App.appStyle = {}\n'
  let styles = []
  try {
    if (fs.existsSync(appVuePath)) {
      styles = parseComponent(fs.readFileSync(appVuePath, 'utf8')).styles
    }
  } catch (e) {}
  styles.forEach((style, index) => {
    code = code +
      `Vue.prototype.__merge_style(require(${genStyleRequest(style,index,stringifyRequest)}).default,App.appStyle)\n`
  })
  return code
}

module.exports = function(content) {
  this.cacheable && this.cacheable()

  const loaderContext = this

  const statCode = process.env.UNI_USING_STAT ? `import '@dcloudio/uni-stat';` : ''

  if (this.resourceQuery) {
    const params = loaderUtils.parseQuery(this.resourceQuery)
    if (params && params.page) {

      const stringifyRequest = r => loaderUtils.stringifyRequest(loaderContext, r)

      params.page = decodeURIComponent(params.page)
      // import Vue from 'vue'是为了触发 vendor 合并
      return `
${statCode}
import App from './${normalizePath(params.page)}.nvue?mpType=page'
App.mpType = 'page'
App.route = '${params.page}'
App.el = '#root'
${getAppStyleCode(stringifyRequest)}
new Vue(App)
`
    }
  }
  return statCode + content
}
