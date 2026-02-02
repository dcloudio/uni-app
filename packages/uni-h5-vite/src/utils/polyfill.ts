import {
  createDefaultSFCStyleBlock,
  resolveBuiltIn,
} from '@dcloudio/uni-cli-shared'
import type { SFCParseOptions, SFCParseResult } from '@vue/compiler-sfc'

/**
 * 重写 @vue/compiler-sfc 的 parse 函数
 * web 平台下，如果 SFC 没有 style，注入一个默认的空 style
 */
export function rewriteCompilerSfcParse() {
  const compilerSfc = require(resolveBuiltIn('@vue/compiler-sfc'))
  const { parse } = compilerSfc
  compilerSfc.parse = (
    source: string,
    options: SFCParseOptions
  ): SFCParseResult => {
    const result: SFCParseResult = parse(source, options)
    // 如果没有 style，注入一个默认的空 style
    if (result.descriptor.styles.length === 0) {
      result.descriptor.styles = [createDefaultSFCStyleBlock(source)]
    }
    return result
  }
}
