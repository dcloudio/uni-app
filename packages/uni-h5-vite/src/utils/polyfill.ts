import { resolveBuiltIn } from '@dcloudio/uni-cli-shared'
import type {
  SFCParseOptions,
  SFCParseResult,
  SFCStyleBlock,
} from '@vue/compiler-sfc'

function createDefaultSFCStyleBlock(source: string): SFCStyleBlock {
  const offset = source.length
  return {
    type: 'style',
    content: '',
    attrs: {},
    loc: {
      source: '',
      start: { line: 1, column: 1, offset },
      end: { line: 1, column: 1, offset },
    },
  }
}

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
