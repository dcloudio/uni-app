import path from 'path'
import { extend, isFunction } from '@vue/shared'
import type { RPT2Options } from 'rollup-plugin-typescript2'
import { isInHBuilderX, isUTSCloudCompiler } from '../../shared'
interface UTS2JavaScriptOptions extends Omit<RPT2Options, 'transformers'> {
  inputDir: string
  version: string
  modules: Record<string, any>
}
type uts2js = (options: UTS2JavaScriptOptions) => import('rollup').Plugin[]

export const uts2js: uts2js = (options) => {
  const inputDir = options.inputDir
  const isWeb = process.env.UNI_UTS_PLATFORM === 'web'
  const isInHBuilderXBool = isInHBuilderX()
  const isUTSCloudCompilerBool = isUTSCloudCompiler()
  extend(options, {
    cwd: inputDir,
    check: isWeb,
    noCache:
      // modules 模式不使用缓存
      process.env.UNI_COMPILE_TARGET === 'uni_modules' ||
      process.env.NODE_ENV === 'production' ||
      isWeb,
    tsconfigOverride: {
      compilerOptions: {
        rootDir: inputDir,
        sourceMap: isWeb,
        ignoreDeprecations: '5.0',
        preserveValueImports: true,
        importsNotUsedAsValues: 'preserve',
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
    process.env.NODE_ENV === 'development'
  if (!options.tsconfig) {
    if (isInHBuilderXBool) {
      options.tsconfig = path.resolve(
        __dirname,
        '../../../lib/tsconfig/hbuilderx/tsconfig.json'
      )
    } else if (isUTSCloudCompilerBool) {
      options.tsconfig = path.resolve(
        __dirname,
        '../../../lib/tsconfig/cloud/tsconfig.json'
      )
    } else {
      options.tsconfig = path.resolve(inputDir, '../tsconfig.json')
    }
  }
  if (!options.typescript) {
    options.typescript = require('../../../lib/typescript')
  }
  if (isInHBuilderXBool || isUTSCloudCompilerBool) {
    const pluginPath = isInHBuilderXBool
      ? process.env.UNI_HBUILDERX_PLUGINS
      : path.resolve(process.cwd(), '../')
    const virtualModules = [
      'uniapp-cli-vite/node_modules/vite/client',
      'hbuilderx-language-services/builtin-dts/uts-types/common/index.d.ts',
      'hbuilderx-language-services/builtin-dts/common/HBuilderX.d.ts',
      'hbuilderx-language-services/builtin-dts/uniappx/node_modules/@dcloudio/uni-app-x/types/index.d.ts',
    ]
    const virtualPaths = {}
    virtualModules.forEach((module) => {
      virtualPaths['@dcloudio/virtual-modules/' + module] = [
        path.resolve(pluginPath, module),
      ]
    })

    extend(options.tsconfigOverride.compilerOptions, {
      paths: {
        '@dcloudio/*': [
          path.resolve(pluginPath, 'uniapp-cli-vite/node_modules/@dcloudio/*'),
        ],
        '@vue/runtime-core': [
          path.resolve(
            pluginPath,
            'uniapp-cli-vite/node_modules/@vue/runtime-core'
          ),
        ],
        vue: [
          path.resolve(
            pluginPath,
            'uniapp-cli-vite/node_modules/@vue/runtime-core'
          ),
        ],
        vuex: [path.resolve(pluginPath, 'uniapp-cli-vite/node_modules/vuex')],
        ...virtualPaths,
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
  if (isFunction(globalThis.uts2js)) {
    return globalThis.uts2js(options)
  }
  return require('../../../lib/javascript').uts2js(options)
}
