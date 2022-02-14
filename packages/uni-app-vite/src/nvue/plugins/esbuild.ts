import type { Plugin } from 'vite'
import type { BuildOptions, PluginBuild } from 'esbuild'

import path from 'path'
import fs from 'fs-extra'
import debug from 'debug'

import {
  APP_SERVICE_FILENAME,
  transformWithEsbuild,
} from '@dcloudio/uni-cli-shared'

import { nvueOutDir } from '../../utils'
import { esbuildGlobals } from '../utils'
import { APP_CSS_JS } from './appCss'

const debugEsbuild = debug('uni:app-nvue-esbuild')

export function uniEsbuildPlugin({
  renderer,
  app,
}: {
  renderer?: 'native'
  app: boolean
}): Plugin {
  let buildOptions: BuildOptions
  const outputDir = process.env.UNI_OUTPUT_DIR
  return {
    name: 'uni:app-nvue-esbuild',
    enforce: 'post',
    configResolved(config) {
      buildOptions = {
        format: 'iife',
        minify: config.build.minify ? true : false,
        banner: {
          js: `"use weex:vue";`,
        },
        bundle: true,
        write: false,
        plugins: [esbuildGlobalPlugin(esbuildGlobals)],
      }
    },
    async writeBundle(_, bundle) {
      const entryPoints: string[] = []
      Object.keys(bundle).forEach((name) => {
        const chunk = bundle[name]
        if (
          chunk.type === 'chunk' &&
          chunk.facadeModuleId &&
          chunk.facadeModuleId.endsWith('.nvue')
        ) {
          entryPoints.push(name)
        }
      })
      if (app) {
        debugEsbuild('start', APP_SERVICE_FILENAME)
        await buildNVueAppService(buildOptions).then((code) => {
          return fs.outputFile(
            path.resolve(outputDir, APP_SERVICE_FILENAME),
            code
          )
        })
      }
      debugEsbuild('start', entryPoints.length, entryPoints)
      for (const filename of entryPoints) {
        await buildNVuePage(renderer, filename, buildOptions).then((code) => {
          return fs.outputFile(path.resolve(outputDir, filename), code)
        })
      }
      debugEsbuild('end')
    },
  }
}

function buildNVueAppService(options: BuildOptions) {
  return transformWithEsbuild(
    `import './app.js'`,
    path.join(nvueOutDir(), 'main.js'),
    options
  ).then((res) => {
    if (res.outputFiles) {
      return res.outputFiles[0].text
    }
    return ''
  })
}

function buildNVuePage(
  renderer: 'native' | undefined,
  filename: string,
  options: BuildOptions
) {
  return transformWithEsbuild(
    `import App from './${filename}'
${
  renderer === 'native'
    ? 'const AppStyles = __uniConfig.appStyles || []'
    : `import { AppStyles } from '${APP_CSS_JS}'`
}
const webview = plus.webview.currentWebview()
const __pageId = parseInt(webview.id)
const __pagePath = webview.__path__
let __pageQuery = {}
try{ __pageQuery = JSON.parse(webview.__query__) }catch(e){}
App.mpType = 'page'
const app = Vue.createApp(App,{$store:getApp().$store,__pageId,__pagePath,__pageQuery})
app.provide('__globalStyles', Vue.useCssStyles([...AppStyles, ...(App.styles||[])]))
app.mount('#root')`,
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
