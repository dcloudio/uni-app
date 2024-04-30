import { resolveBuiltIn } from '@dcloudio/uni-cli-shared'
import type { SFCParseOptions, SFCParseResult } from '@vue/compiler-sfc'
import { extend } from '@vue/shared'

/**
 * nvue 需要移除 scoped
 * @param nvuePages
 */
export function createNVueCompiler() {
  const compileSfc = require(resolveBuiltIn('@vue/compiler-sfc'))
  const { parse } = compileSfc

  return extend({}, compileSfc, {
    parse(source: string, options: SFCParseOptions = {}) {
      const result = parse(source, options) as SFCParseResult
      result.descriptor.styles.forEach((style) => {
        if (style.scoped) {
          delete style.scoped
        }
      })
      return result
    },
  })
}
