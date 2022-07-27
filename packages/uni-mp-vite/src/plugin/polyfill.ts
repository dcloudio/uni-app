import { extend } from '@vue/shared'
import { once } from '@dcloudio/uni-shared'
import { resolveBuiltIn } from '@dcloudio/uni-cli-shared'
import {
  SFCDescriptor,
  SFCParseOptions,
  SFCParseResult,
  SFCScriptBlock,
  SFCScriptCompileOptions,
} from '@vue/compiler-sfc'

export const rewriteCompileScriptOnce = once(rewriteCompileScript)
export const rewriteCompilerSfcParseOnce = once(rewriteCompilerSfcParse)

function rewriteCompileScript() {
  const compiler = require(resolveBuiltIn('@vue/compiler-sfc'))
  const { compileScript } = compiler
  compiler.compileScript = (
    sfc: SFCDescriptor,
    options: SFCScriptCompileOptions
  ): SFCScriptBlock => {
    if (options?.templateOptions?.compilerOptions) {
      ;(options.templateOptions.compilerOptions as any).bindingCssVars =
        sfc.cssVars || []
    }
    return compileScript(sfc, options)
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
