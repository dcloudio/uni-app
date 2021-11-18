import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import loaderUtils from 'loader-utils'
import { once } from '@dcloudio/uni-shared'
import {
  normalizePath,
  parsePagesJsonOnce,
  removeExt,
} from '@dcloudio/uni-cli-shared'

import { createConfig } from './config'
import { initModuleAlias } from './alias'
import { NVueCompilerOptions } from '../types'
import { formatErrors } from './utils'

const initModuleAliasOnce = once(initModuleAlias)

function runWebpack(
  mode: 'production' | 'development',
  options: NVueCompilerOptions
) {
  initModuleAliasOnce()
  // 首次初始化 nvue 页面入口
  initPagesJsonNVueEntry()
  return new Promise<webpack.Compiler>((resolve, reject) => {
    const compiler = webpack(createConfig(mode, options), (err, stats) => {
      if (err) {
        return reject(err.stack || err)
      }
      if (stats) {
        if (stats.hasErrors()) {
          return reject(formatErrors(stats.compilation.errors))
        }
        if (stats.hasWarnings()) {
          const info = stats.toJson({ all: false, warnings: true })
          console.warn(info.warnings)
        }
        if (process.env.DEBUG) {
          console.log(
            stats.toString({
              all: false,
              assets: true,
              colors: true, // 在控制台展示颜色
              // timings: true,
            })
          )
        }
      }
      resolve(compiler)
    })
  })
}

export function runWebpackBuild(options: NVueCompilerOptions = {}) {
  return runWebpack('production', options)
}

export function runWebpackDev(options: NVueCompilerOptions = {}) {
  return runWebpack('development', options)
}

function initPagesJsonNVueEntry() {
  const pagesJson = parsePagesJsonOnce(process.env.UNI_INPUT_DIR, 'app')
  initWebpackNVueEntry(pagesJson.pages)
}

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
      const { parseComponent } = require('../../lib/weex-template-compiler')
      styles = parseComponent(fs.readFileSync(appVuePath, 'utf8')).styles
    }
  } catch (e) {}
  const stringifyRequest = (r: string) =>
    loaderUtils.stringifyRequest({} as any, r)
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
  const { attrsToQuery } = require('../../lib/vue-loader/lib/codegen/utils')

  const src = style.src
  const attrsQuery = attrsToQuery(style.attrs, 'css')
  const query = `?vue&type=style&index=${i}${attrsQuery}`
  return stringifyRequest(src + query)
}
