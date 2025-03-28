import fs from 'fs'
import path from 'path'
import type { Plugin } from 'vite'
import type { EmittedAsset } from 'rollup'
import type { ParserOptions } from '@vue/compiler-core'
import type {
  CompilerOptions,
  SFCStyleCompileOptions,
  TemplateCompiler,
} from '@vue/compiler-sfc'
import type { UniViteCopyPluginOptions } from './plugins/copy'
export { getIsStaticFile } from './plugins/vitejs/plugins/static'

export const cssTarget = 'chrome53'
export interface CopyOptions {
  /**
   * 静态资源，配置的目录，在 uni_modules 中同样支持
   */
  assets?: string[]
  targets?: UniViteCopyPluginOptions['targets']
}

interface UniVitePluginUniOptions {
  compiler?: TemplateCompiler
  styleOptions?: Pick<SFCStyleCompileOptions, 'postcssPlugins'>
  compilerOptions?: {
    miniProgram?: {
      emitFile?: (emittedFile: EmittedAsset) => string
    }
    isNativeTag?: ParserOptions['isNativeTag']
    isVoidTag?: ParserOptions['isVoidTag']
    isCustomElement?: ParserOptions['isCustomElement']
    directiveTransforms?: CompilerOptions['directiveTransforms']
    nodeTransforms?: CompilerOptions['nodeTransforms']
    whitespace?: CompilerOptions['whitespace']
  }
  jsxOptions?: {
    babelPlugins?: any[]
  }
  copyOptions?: CopyOptions | (() => CopyOptions)
}
export interface UniVitePlugin extends Plugin {
  uni?: UniVitePluginUniOptions
}

export * from './utils'
export * from './plugins'
export * from './features'
export * from './autoImport'

export * from './cloud'
export * from './extApi'

// https://github.com/vitejs/vite/blob/aac2ef77521f66ddd908f9d97020b8df532148cf/packages/vite/src/node/server/searchRoot.ts#L38
// vite 在初始化阶段会执行 initTSConfck，此时会 searchForWorkspaceRoot，如果找到了 pnpm-workspace.yaml 文件，会将其作为 root
// HBuilderX 项目，root 一定是 UNI_INPUT_DIR，所以需要重写 fs.existsSync，不重写的话，可能会找错，
// 一旦找错目录，而该目录下有 N 多文件目录，会导致遍历及其缓慢
export function rewriteExistsSyncHasRootFile() {
  const existsSync = fs.existsSync
  const pnpmWorkspaceYaml = path.join(
    process.env.UNI_INPUT_DIR,
    'pnpm-workspace.yaml'
  )
  fs.existsSync = (path) => {
    if (path === pnpmWorkspaceYaml) {
      return true
    }
    return existsSync(path)
  }
}
