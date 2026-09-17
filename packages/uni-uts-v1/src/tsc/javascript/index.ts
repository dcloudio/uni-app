import { extend, isFunction } from '@vue/shared'
import type { RPT2Options } from 'rollup-plugin-typescript2'
import type tsTypes from 'typescript'
import { createBasicUtsOptions } from '../utils/options'

type ResolvedUasmLoad =
  | string
  | {
      id: string
      entry: string
    }

interface UTS2JavaScriptOptions extends Omit<RPT2Options, 'transformers'> {
  dom2?: boolean
  platform: 'app-android' | 'app-ios' | 'app-harmony' | 'mp-weixin' | 'web'
  inputDir: string
  version: string
  modules: Record<string, any>
  sourceMap?: boolean
  sharedDataLibName?: string
  sharedDataLibAsGlobal?: boolean
  workers?: {
    resolve: () => Record<string, string>
    extname?: string
    rewriteRootDir?: string
  }
  uasm?: {
    targetArchs?: string[]
    resolve(modulePath: string): ResolvedUasmLoad | undefined
    createLoadUasmTransformer(options: {
      typescript: typeof tsTypes
      targetArchs?: string[]
      resolve(modulePath: string): ResolvedUasmLoad | undefined
      reportDiagnostic(
        context: tsTypes.TransformationContext,
        diagnostic: tsTypes.DiagnosticWithLocation
      ): void
    }): tsTypes.TransformerFactory<tsTypes.SourceFile>
  }
  extApi?: {
    collectExtApiUsageAst(
      sourceFile: tsTypes.SourceFile,
      typescript: typeof tsTypes
    ): string[] | undefined
  }
  disableUTSBooleanConversion?: boolean
  sharedData?: {
    resolveFieldMeta(name: string): { fieldId: number }
  }
}
type uts2js = (options: UTS2JavaScriptOptions) => import('rollup').Plugin[]

export const uts2js: uts2js = (options) => {
  if (options.dom2 && process.env.UNI_APP_X_VAPOR_SCRIPT_LANG === 'true') {
    const exclude = options.exclude
      ? Array.isArray(options.exclude)
        ? options.exclude
        : [options.exclude]
      : []
    options.exclude = [
      ...exclude,
      // 启用 Vapor JS/TS 脚本时，标准 TypeScript 由 Vite esbuild 处理，uts2js 只保留 UTS 请求。
      '*.ts',
      '**/*.ts',
      '*.ts[?]*',
      '**/*.ts[?]*',
      '**/*.vue?*lang.ts*',
      '**/*.uvue?*lang.ts*',
      '**/*.vue?*lang=ts*',
      '**/*.uvue?*lang=ts*',
    ]
  }
  extend(options, createBasicUtsOptions(options.inputDir, !!options.sourceMap))
  extend(options.tsconfigOverride.compilerOptions, {
    downlevelIteration: true,
  })
  if (isFunction(globalThis.uts2js)) {
    return globalThis.uts2js(options)
  }
  return require('../../../lib/javascript').uts2js(options)
}
