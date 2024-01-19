import path from 'path'
import { extend, isArray, isFunction } from '@vue/shared'
import type { RPT2Options } from 'rollup-plugin-typescript2'
import { isInHBuilderX } from '../../shared'
interface UTS2JavaScriptOptions extends Omit<RPT2Options, 'transformers'> {
  inputDir: string
  version: string
  modules: Record<string, any>
}
type uts2js = (options: UTS2JavaScriptOptions) => import('rollup').Plugin[]

export const uts2js: uts2js = (options) => {
  const inputDir = options.inputDir
  // TODO 目前开发阶段禁用缓存，禁用check
  extend(options, {
    cwd: inputDir,
    clean: true,
    check: process.env.UNI_UTS_PLATFORM === 'web',
    tsconfigOverride: {
      compilerOptions: {
        rootDir: inputDir,
        sourceMap: process.env.UNI_UTS_PLATFORM === 'web',
        ignoreDeprecations: '5.0',
        preserveValueImports: true,
        verbatimModuleSyntax: false,
      },
    },
  })
  if (!options.tsconfigOverride) {
    options.tsconfigOverride = {}
  }
  if (!options.tsconfigOverride.compilerOptions) {
    options.tsconfigOverride.compilerOptions = {}
  }
  options.tsconfigOverride.compilerOptions.sourceMap =
    process.env.UNI_UTS_PLATFORM === 'web'
  if (!options.tsconfig) {
    if (isInHBuilderX()) {
      options.tsconfig = path.resolve(
        __dirname,
        '../../../lib/tsconfig/hbuilderx/tsconfig.json'
      )
    } else {
      options.tsconfig = path.resolve(inputDir, '../tsconfig.json')
    }
  }
  if (!options.typescript) {
    options.typescript = require('../../../lib/typescript')
  }
  if (isInHBuilderX()) {
    const hxPluginPath = process.env.UNI_HBUILDERX_PLUGINS
    extend(options.tsconfigOverride.compilerOptions, {
      paths: {
        '@dcloudio/*': [
          path.resolve(
            hxPluginPath,
            'uniapp-cli-vite/node_modules/@dcloudio/*'
          ),
        ],
        '@vue/runtime-core': [
          path.resolve(
            hxPluginPath,
            'uniapp-cli-vite/node_modules/@vue/runtime-core'
          ),
        ],
        vue: [
          path.resolve(
            hxPluginPath,
            'uniapp-cli-vite/node_modules/@vue/runtime-core'
          ),
        ],
      },
      typeRoots: [path.resolve(__dirname, '../../../lib/tsconfig/types')],
    })
  } else {
    extend(options.tsconfigOverride.compilerOptions, {
      paths: {
        vue: [path.resolve(inputDir, '../node_modules/@vue/runtime-core')],
      },
      typeRoots: [path.resolve(__dirname, '../../../lib/tsconfig/types')],
    })
  }
  // @ts-expect-error
  if (isFunction(globalThis.uts2js)) {
    // @ts-expect-error
    return globalThis.uts2js(options)
  }
  const plugins = require('../../../lib/javascript').uts2js(options)
  if (isArray(plugins)) {
    plugins.forEach((p) => {
      if (p.name === 'uts') {
        // 强制放到 auto import 之后执行
        p.enforce = 'post'
      }
    })
  }
  return plugins
}
