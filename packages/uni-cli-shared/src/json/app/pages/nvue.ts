import fs from 'fs'
import path from 'path'
import { normalizePath, removeExt } from '../../../utils'

export function initWebpackNVueEntry(pages: UniApp.PagesJsonPageOptions[]) {
  process.UNI_NVUE_ENTRY = {}
  pages.forEach(({ path, style: { isNVue, subNVues } }) => {
    if (isNVue) {
      process.UNI_NVUE_ENTRY[path] = genWebpackBase64Code(
        genNVueEntryCode(path)
      )
    }
    if (!Array.isArray(subNVues)) {
      return
    }
    subNVues.forEach(({ path }) => {
      if (!path) {
        return
      }
      const subNVuePath = removeExt(normalizePath(path.split('?')[0]))
      process.UNI_NVUE_ENTRY[subNVuePath] = genWebpackBase64Code(
        genNVueEntryCode(subNVuePath)
      )
    })
  })
}

function genWebpackBase64Code(code: string) {
  return `data:text/javascript;base64,${Buffer.from(code).toString('base64')}`
}

function genNVueEntryCode(route: string) {
  return `import '${genWebpackBase64Code(genNVueAppStyle())}'
import App from '${normalizePath(
    path.resolve(process.env.UNI_INPUT_DIR, route)
  )}.nvue?mpType=page'  
if (typeof Promise !== 'undefined' && !Promise.prototype.finally) {
    Promise.prototype.finally = function(callback) {
    var promise = this.constructor
    return this.then(function(value) {
        return promise.resolve(callback()).then(function() {
        return value
        })
    }, function(reason) {
        return promise.resolve(callback()).then(function() {
        throw reason
        })
    })
    }
}
App.mpType = 'page'
App.route = '${route}'
App.el = '#root'
new Vue(App)
`
}

interface VueSfcStyle {
  src?: string
  attrs: Record<string, string>
}

function genNVueAppStyle() {
  if (process.env.UNI_NVUE_COMPILER !== 'uni-app') {
    return ''
  }
  const appVuePath = path.resolve(process.env.UNI_INPUT_DIR, 'App.vue')
  let code = 'Vue.prototype.__$appStyle__ = {}\n'
  let styles = []
  try {
    if (fs.existsSync(appVuePath)) {
      const {
        parseComponent,
      } = require('@dcloudio/uni-cli-nvue/lib/weex-template-compiler')
      styles = parseComponent(fs.readFileSync(appVuePath, 'utf8')).styles
    }
  } catch (e) {}
  const loaderUtils = require('loader-utils')
  const stringifyRequest = (r: string) => loaderUtils.stringifyRequest({}, r)
  styles.forEach((style: VueSfcStyle, index: number) => {
    if (!style.src) {
      style.src = normalizePath(appVuePath)
    }
    code =
      code +
      `import __style${index} from ${genStyleRequest(
        style,
        index,
        stringifyRequest
      )}
Vue.prototype.__merge_style(__style${index},Vue.prototype.__$appStyle__)\n`
  })
  return code
}

function genStyleRequest(
  style: VueSfcStyle,
  i: number,
  stringifyRequest: Function
) {
  const {
    attrsToQuery,
  } = require('@dcloudio/uni-cli-nvue/lib/vue-loader/lib/codegen/utils')

  const src = style.src
  const attrsQuery = attrsToQuery(style.attrs, 'css')
  const query = `?vue&type=style&index=${i}${attrsQuery}`
  return stringifyRequest(src + query)
}
