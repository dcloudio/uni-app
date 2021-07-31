import path from 'path'
import { normalizePath } from '../../../utils'

export function initWebpackNVueEntry(pages: UniApp.PagesJsonPageOptions[]) {
  process.UNI_NVUE_ENTRY = {}
  pages.forEach((page) => {
    if (page.style.isNVue) {
      process.UNI_NVUE_ENTRY[page.path] = genWebpackBase64Code(page.path)
    }
  })
}

function genWebpackBase64Code(route: string) {
  return `data:text/javascript;base64,${Buffer.from(
    genNVueEntryCode(route)
  ).toString('base64')}`
}

function genNVueEntryCode(route: string) {
  return `import App from '${normalizePath(
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
