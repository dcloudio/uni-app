import { extend } from '@vue/shared'
import { once } from '@dcloudio/uni-shared'
import { resolveBuiltIn } from '@dcloudio/uni-cli-shared'
import type {
  SFCAsyncStyleCompileOptions,
  SFCDescriptor,
  SFCParseOptions,
  SFCParseResult,
  SFCScriptBlock,
  SFCScriptCompileOptions,
  SFCStyleCompileOptions,
  SFCStyleCompileResults,
  SFCTemplateCompileOptions,
} from '@vue/compiler-sfc'

export const rewriteCompileScriptOnce = once(rewriteCompileScript)
export const rewriteCompilerSfcParseOnce = once(rewriteCompilerSfcParse)

function rewriteCompileScript() {
  const compiler = require(resolveBuiltIn('@vue/compiler-sfc'))
  const { compileScript, compileTemplate, compileStyle, compileStyleAsync } =
    compiler
  compiler.compileStyle = (
    options: SFCStyleCompileOptions
  ): SFCStyleCompileResults => {
    // https://github.com/dcloudio/uni-app/issues/4076
    options.isProd = true
    return compileStyle(options)
  }
  compiler.compileStyleAsync = (
    options: SFCAsyncStyleCompileOptions
  ): Promise<SFCStyleCompileResults> => {
    // https://github.com/dcloudio/uni-app/issues/4076
    options.isProd = true
    return compileStyleAsync(options)
  }
  // script-setup + v-bind
  compiler.compileScript = (
    sfc: SFCDescriptor,
    options: SFCScriptCompileOptions
  ): SFCScriptBlock => {
    if (options?.templateOptions?.compilerOptions) {
      ;(options.templateOptions.compilerOptions as any).bindingCssVars =
        sfc.cssVars || []
    }
    // 强制生产模式，确保 cssVar 的生成使用 hash
    // https://github.com/dcloudio/uni-app/issues/4076
    // dev模式下，会生成：{ "83a5a03c-style.color": style.color}
    options.isProd = true
    return compileScript(sfc, options)
  }
  // script + v-bind
  compiler.compileTemplate = (options: SFCTemplateCompileOptions) => {
    if (options?.compilerOptions) {
      ;(options.compilerOptions as any).bindingCssVars =
        options.ssrCssVars || []
    }
    // 同上
    options.isProd = true
    return compileTemplate(options)
  }
}

/**
 * 重写 parse，解决相同内容被缓存，未触发 template 编译的问题
 */
function rewriteCompilerSfcParse() {
  // @ts-ignore
  const compilerSfc = require(resolveBuiltIn('@vue/compiler-sfc'))
  const { parse } = compilerSfc
  compilerSfc.parse = (
    source: string,
    options: SFCParseOptions
  ): SFCParseResult => {
    const res = parse(source, options) as SFCParseResult
    // template 中，先<view>hello</view>，然后修改为<view></view>，再恢复为<view>hello</view>，
    // 此时因为 descriptor 被缓存，不会触发 compileTemplate，故 parse 时，每次生成一个全新的 descriptor
    // https://github.com/vitejs/vite/blob/v2.9.13/packages/plugin-vue/src/script.ts#L44
    // https://github.com/dcloudio/uni-app/issues/3685
    res.descriptor = extend({}, res.descriptor)
    return res
  }
}
