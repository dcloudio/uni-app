import type { Plugin } from 'vite'
import type { BuildOptions, PluginBuild } from 'esbuild'

import path from 'path'
import fs from 'fs-extra'
import debug from 'debug'

import { transformWithEsbuild } from '@dcloudio/uni-cli-shared'

import { nvueOutDir } from '../../utils'

const debugEsbuild = debug('uni:app-nvue-esbuild')

export function uniEsbuildPlugin(): Plugin {
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
        plugins: [esbuildGlobalPlugin({ vue: 'Vue' })],
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
      debugEsbuild('start', entryPoints.length, entryPoints)
      for (const filename of entryPoints) {
        await buildNVuePage(filename, buildOptions).then((code) => {
          return fs.outputFile(path.resolve(outputDir, filename), code)
        })
      }
      debugEsbuild('end')
    },
  }
}

function buildNVuePage(filename: string, options: BuildOptions) {
  return transformWithEsbuild(
    `import App from './${filename}'
import { AppStyles } from './app.css.js'
const app = Vue.createApp(App)
app.provide('__appStyles', Vue.useCssStyles(AppStyles))
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
