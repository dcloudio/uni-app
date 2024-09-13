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

function createTsConfigPaths(
  pluginPath: string,
  cliVitePath: string,
  virtualModulesMap: Record<string, string> | string[]
): Record<string, string[]> {
  const virtualPaths: Record<string, string[]> = {}
  if (Array.isArray(virtualModulesMap)) {
    virtualModulesMap.forEach((module) => {
      virtualPaths['@dcloudio/virtual-modules/' + module] = [
        path.resolve(pluginPath, module),
      ]
    })
  } else {
    Object.keys(virtualModulesMap).forEach((module) => {
      virtualPaths[module] = [
        path.resolve(pluginPath, virtualModulesMap[module]),
      ]
    })
  }
  return {
    '@dcloudio/uni-app': [
      path.resolve(__dirname, '../../../lib/tsconfig/types/dcloudio__uni-app'),
    ],
    '@vue/runtime-core': [
      path.resolve(cliVitePath, 'node_modules/@vue/runtime-core'),
    ],
    vue: [path.resolve(cliVitePath, 'node_modules/@vue/runtime-core')],
    vuex: [path.resolve(cliVitePath, 'node_modules/vuex')],
    ...virtualPaths,
  }
}

export function createBasicUtsOptions(
  inputDir: string
): UTS2JavaScriptBaseOptions {
  const isWeb = process.env.UNI_UTS_PLATFORM === 'web'
  const isInHBuilderXBool = isInHBuilderX()
  const isUTSCloudCompilerBool = isUTSCloudCompiler()
  const isBuildExtApi =
    process.env.UNI_COMPILE_TARGET === 'ext-api' &&
    process.env.UNI_APP_NEXT_WORKSPACE
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
    if (isInHBuilderXBool || isUTSCloudCompilerBool || isBuildExtApi) {
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

  if (isBuildExtApi) {
    const pluginPath = path.resolve(process.env.UNI_APP_NEXT_WORKSPACE!, '../')
    const cliVitePath = path.resolve(
      pluginPath,
      'uniapp-cli-vite/macosx/uniapp-cli-vite'
    )
    const virtualModules = {
      'uniapp-cli-vite/node_modules/vite/client':
        'uniapp-cli-vite/macosx/uniapp-cli-vite/node_modules/vite/client.d.ts',
      'hbuilderx-language-services/builtin-dts/uts-types/common/index.d.ts':
        'syntaxdoc/uts/common/index.d.ts',
      'hbuilderx-language-services/builtin-dts/common/HBuilderX.d.ts':
        'syntaxdoc/specialString/specialString.d.ts',
      'hbuilderx-language-services/builtin-dts/uniappx/node_modules/@dcloudio/uni-app-x/types/index.d.ts':
        'syntaxdoc/uni-app-x/types/index.d.ts',
    }
    extend(options.tsconfigOverride.compilerOptions, {
      paths: createTsConfigPaths(pluginPath, cliVitePath, virtualModules),
      typeRoots: [path.resolve(__dirname, '../../../lib/tsconfig/types')],
    })
  } else if (isInHBuilderXBool || isUTSCloudCompilerBool) {
    const pluginPath = isInHBuilderXBool
      ? process.env.UNI_HBUILDERX_PLUGINS
      : path.resolve(process.cwd(), '../')
    const cliVitePath = path.resolve(pluginPath, 'uniapp-cli-vite')
    const virtualModules = [
      'uniapp-cli-vite/node_modules/vite/client',
      'hbuilderx-language-services/builtin-dts/uts-types/common/index.d.ts',
      'hbuilderx-language-services/builtin-dts/common/HBuilderX.d.ts',
      'hbuilderx-language-services/builtin-dts/uniappx/node_modules/@dcloudio/uni-app-x/types/index.d.ts',
    ]
    extend(options.tsconfigOverride.compilerOptions, {
      paths: createTsConfigPaths(pluginPath, cliVitePath, virtualModules),
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
