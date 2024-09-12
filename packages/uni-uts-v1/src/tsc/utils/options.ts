import type * as tsTypes from 'typescript'
import * as path from 'path'
import { extend } from '@vue/shared'
import { isInHBuilderX, isUTSCloudCompiler } from '../../shared'

export interface UTS2JavaScriptBaseOptions {
  cwd: string
  check: boolean
  noCache: boolean
  tsconfig: string
  typescript: typeof tsTypes
  tsconfigOverride: any
}

export function createBasicUtsOptions(
  inputDir: string
): UTS2JavaScriptBaseOptions {
  const isWeb = process.env.UNI_UTS_PLATFORM === 'web'
  const isInHBuilderXBool = isInHBuilderX()
  const isUTSCloudCompilerBool = isUTSCloudCompiler()
  const options: UTS2JavaScriptBaseOptions = {
    cwd: inputDir,
    check: isWeb,
    noCache:
      // modules 模式不使用缓存
      process.env.UNI_COMPILE_TARGET === 'uni_modules' ||
      process.env.UNI_COMPILE_TARGET === 'ext-api' ||
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
  } as UTS2JavaScriptBaseOptions

  options.tsconfigOverride.compilerOptions.sourceMap =
    process.env.NODE_ENV === 'development'
  if (!options.tsconfig) {
    if (isInHBuilderXBool || isUTSCloudCompilerBool) {
      options.tsconfig = path.resolve(
        __dirname,
        '../../../lib/tsconfig/tsconfig.json'
      )
    } else {
      options.tsconfig = path.resolve(process.cwd(), 'tsconfig.json')
    }
  }
  if (!options.typescript) {
    options.typescript = require('../../../lib/typescript')
  }

  if (
    process.env.UNI_COMPILE_TARGET === 'ext-api' &&
    process.env.UNI_APP_NEXT_WORKSPACE
  ) {
  } else if (isInHBuilderXBool || isUTSCloudCompilerBool) {
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
        '@dcloudio/uni-app': [
          path.resolve(
            __dirname,
            '../../../lib/tsconfig/types/dcloudio__uni-app'
          ),
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
  return options
}
