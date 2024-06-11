import path from 'path'
import { extend } from '@vue/shared'
import type { CompilerOptions } from 'typescript'
import { createBasicUtsOptions } from '../utils/options'

export interface UTS2KotlinOptions {
  typescript?: typeof import('typescript')
  inputDir: string
  outputDir: string
  rootFiles?: string[]
  compilerOptions?: CompilerOptions
}

export function runUTS2KotlinDev(options: UTS2KotlinOptions) {
  const { /* check, noCache, tsconfig, */ typescript, tsconfigOverride } =
    createBasicUtsOptions(options.inputDir)
  return require('../../../lib/kotlin').runDev({
    typescript,
    inputDir: options.inputDir,
    rootFiles: options.rootFiles ?? [
      path.resolve(options.inputDir, 'main.uts.ts'),
    ],
    compilerOptions: extend(tsconfigOverride.compilerOptions, {
      outDir: options.outputDir,
    }),
  } as Required<UTS2KotlinOptions>)
}
