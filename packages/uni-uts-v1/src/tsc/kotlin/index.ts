import path from 'path'
import { extend } from '@vue/shared'
import type { CompilerOptions } from 'typescript'
import { createBasicUtsOptions } from '../utils/options'

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

  const rootFiles: string[] = [
    path.resolve(__dirname, '../../../lib/kotlin/types/runtime-types.d.ts'),
  ]

  ;['env.d.ts', 'shim-uni.d.ts', 'shim-dom.d.ts', 'global.d.ts'].forEach(
    (file) => {
      rootFiles.push(
        path.resolve(__dirname, '../../../lib/tsconfig/hbuilderx', file)
      )
    }
  )
  rootFiles.push(path.resolve(options.inputDir, 'main.uts.ts'))

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
