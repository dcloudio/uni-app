import path from 'path'
import { extend } from '@vue/shared'
import type { CompilerOptions } from 'typescript'
import { createBasicUtsOptions } from '../utils/options'
import { isInHBuilderX } from '../../shared'

export interface UTS2KotlinOptions {
  typescript?: typeof import('typescript')
  inputDir: string
  outputDir: string
  tsconfig?: string
  rootFiles?: string[]
  compilerOptions?: CompilerOptions
}

export function runUTS2KotlinDev(options: UTS2KotlinOptions) {
  const { /* check, noCache, */ tsconfig, typescript, tsconfigOverride } =
    createBasicUtsOptions(options.inputDir)

  const kotlinTypesPath = path.resolve(__dirname, '../../../lib/kotlin/types')
  const rootFiles: string[] = [path.resolve(kotlinTypesPath, 'global.d.ts')]

  ;['env.d.ts', 'shim-uni.d.ts', 'shim-dom.d.ts', 'global.d.ts'].forEach(
    (file) => {
      rootFiles.push(path.resolve(__dirname, '../../../lib/tsconfig', file))
    }
  )
  rootFiles.push(path.resolve(options.inputDir, 'main.uts.ts'))
  const pluginPath = isInHBuilderX()
    ? process.env.UNI_HBUILDERX_PLUGINS
    : path.resolve(process.cwd(), '../')
  const nodeModulesPath = path.resolve(
    pluginPath,
    'hbuilderx-language-services/builtin-dts/uniappx/node_modules'
  )
  const vueRuntimeDts = [
    path.resolve(nodeModulesPath, '@vue/runtime-core/index.d.ts'),
  ]
  extend(tsconfigOverride.compilerOptions.paths, {
    '@dcloudio/uni-runtime': [
      path.resolve(
        kotlinTypesPath,
        '@dcloudio/uni-runtime/dist/uni-runtime.d.ts'
      ),
    ],
    '@vue/reactivity': [
      path.resolve(nodeModulesPath, '@vue/reactivity/dist/reactivity.d.ts'),
    ],
    '@vue/runtime-core': vueRuntimeDts,
    vue: vueRuntimeDts,
  })

  return require('../../../lib/kotlin').runDev({
    typescript,
    inputDir: options.inputDir,
    tsconfig,
    rootFiles,
    compilerOptions: extend(tsconfigOverride.compilerOptions, {
      outDir: options.outputDir,
    }),
  } as Required<UTS2KotlinOptions>)
}
