import type { Plugin, ResolvedConfig } from 'vite'
import type { BuildOptions, PluginBuild } from 'esbuild'

import path from 'path'
import fs from 'fs-extra'
import debug from 'debug'

import {
  APP_CONFIG_SERVICE,
  hash,
  polyfillCode,
  removeExt,
  transformWithEsbuild,
} from '@dcloudio/uni-cli-shared'

import { nvueOutDir } from '../../utils'
import { esbuildGlobals } from '../utils'
import { APP_CSS_JS } from './appCss'

const debugEsbuild = debug('uni:app-nvue-esbuild')

const emittedHashMap = new WeakMap<ResolvedConfig, Map<string, string>>()

export function uniEsbuildPlugin({
  appService,
}: {
  renderer?: 'native'
  appService: boolean
}): Plugin {
  let resolvedConfig: ResolvedConfig
  let buildOptions: BuildOptions
  const nvueOutputDir = nvueOutDir()
  const outputDir = process.env.UNI_OUTPUT_DIR
  let isFirst = true
  return {
    name: 'uni:app-nvue-esbuild',
    enforce: 'post',
    configResolved(config) {
      buildOptions = {
        format: 'iife',
        target: 'es6',
        minify: config.build.minify ? true : false,
        banner: {
          js: `"use weex:vue";
${polyfillCode}`,
        },
        bundle: true,
        write: false,
        plugins: [esbuildGlobalPlugin(esbuildGlobals(appService))],
      }
      resolvedConfig = config
      emittedHashMap.set(resolvedConfig, new Map<string, string>())
    },
    async writeBundle(_, bundle) {
      const entryPoints: string[] = []
      const assets: string[] = []
      Object.keys(bundle).forEach((name) => {
        const chunk = bundle[name]
        if (
          chunk.type === 'chunk' &&
          chunk.facadeModuleId &&
          chunk.facadeModuleId.endsWith('.nvue')
        ) {
          entryPoints.push(name)
        } else if (chunk.type === 'asset') {
          assets.push(name)
        }
      })
      // 仅 nvueOutputDir 时 copy
      if (!appService) {
        assets.forEach((name) => {
          fs.copySync(
            path.resolve(nvueOutputDir, name),
            path.resolve(outputDir, name),
            { overwrite: false }
          )
        })
      }

      if (!entryPoints.length) {
        return
      }
      const emittedHash = emittedHashMap.get(resolvedConfig)!
      const changedFiles: string[] = []
      if (buildAppCss()) {
        changedFiles.push(APP_CONFIG_SERVICE)
      }
      debugEsbuild('start', entryPoints.length, entryPoints)
      for (const filename of entryPoints) {
        await buildNVuePage(filename, buildOptions).then((code) => {
          const outputFileHash = hash(code)
          if (emittedHash.get(filename) !== outputFileHash) {
            changedFiles.push(filename)
            emittedHash.set(filename, outputFileHash)
            return fs.outputFile(path.resolve(outputDir, filename), code)
          }
        })
      }
      if (!isFirst && changedFiles.length) {
        process.env[
          changedFiles.includes(APP_CONFIG_SERVICE)
            ? 'UNI_APP_CHANGED_FILES'
            : 'UNI_APP_CHANGED_PAGES'
        ] = JSON.stringify(changedFiles)
      }
      debugEsbuild('end')
      isFirst = false
    },
  }
}

/**
 * 将 nvue 全局 css 样式注入 app-config-service.js
 * @returns
 */
function buildAppCss() {
  const appCssJsFilename = path.join(nvueOutDir(), APP_CSS_JS)
  if (!fs.existsSync(appCssJsFilename)) {
    return
  }
  const appCssJsCode = fs.readFileSync(appCssJsFilename, 'utf8')
  const appCssJsFn = new Function(
    'module',
    // vite build.target为esnext时, 生成的代码没有export default
    appCssJsCode.includes('export default')
      ? appCssJsCode.replace(`export default`, `module.exports=`)
      : appCssJsCode.replace(`exports`, `module.exports`)
  )
  const module = { exports: { styles: [] } }
  appCssJsFn(module)
  const appCssJsonCode = JSON.stringify(module.exports.styles)
  if (process.env.UNI_NVUE_APP_STYLES === appCssJsonCode) {
    return
  }
  process.env.UNI_NVUE_APP_STYLES = appCssJsonCode
  // 首次 build 时，可能还没生成 app-config-service 的文件，故仅写入环境变量
  const appConfigServiceFilename = path.join(
    process.env.UNI_OUTPUT_DIR,
    APP_CONFIG_SERVICE
  )
  if (!fs.existsSync(appConfigServiceFilename)) {
    return
  }
  const appConfigServiceCode = fs.readFileSync(appConfigServiceFilename, 'utf8')
  fs.writeFileSync(
    appConfigServiceFilename,
    wrapperNVueAppStyles(appConfigServiceCode)
  )
  return true
}

function buildNVuePage(filename: string, options: BuildOptions) {
  return transformWithEsbuild(
    `import App from './${filename}'
const webview = plus.webview.currentWebview()
if(webview){
  const __pageId = parseInt(webview.id)
  const __pagePath = '${removeExt(filename)}'
  let __pageQuery = {}
  try{ __pageQuery = JSON.parse(webview.__query__) }catch(e){}
  App.mpType = 'page'
  const app = Vue.createPageApp(App,{$store:getApp({allowDefault:true}).$store,__pageId,__pagePath,__pageQuery})
  app.provide('__globalStyles', Vue.useCssStyles([...__uniConfig.styles, ...(App.styles||[])]))
  app.mount('#root')
}`,
    path.join(nvueOutDir(), 'main.js'),
    options
  ).then((res) => {
    if (res.outputFiles) {
      return res.outputFiles[0].text
    }
    return ''
  })
}

function esbuildGlobalPlugin(options: Record<string, string>) {
  const keys = Object.keys(options)
  return {
    name: 'global',
    setup(build: PluginBuild) {
      keys.forEach((key) => {
        const namespace = key + '-ns'
        build.onResolve({ filter: new RegExp('^' + key + '$') }, ({ path }) => {
          return {
            path,
            namespace,
          }
        })
        build.onLoad({ filter: /.*/, namespace }, () => ({
          contents: `module.exports = ${options[key]}`,
          loader: 'js',
        }))
      })
    },
  }
}

export function wrapperNVueAppStyles(code: string) {
  return code.replace(
    /__uniConfig.styles=(.*);\/\/styles/,
    `__uniConfig.styles=${process.env.UNI_NVUE_APP_STYLES || '[]'};//styles`
  )
}
