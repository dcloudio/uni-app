import path from 'path'
import { EXTNAME_VUE, resolveBuiltIn } from '@dcloudio/uni-cli-shared'
import { SFCParseOptions } from '@vue/compiler-sfc'
/**
 * TODO 临时重写，解决 @vitejs/plugin-vue 的 Bug
 */
export function rewriteCompilerSfcParse() {
  // @ts-ignore
  const compilerSfc = require(resolveBuiltIn('@vue/compiler-sfc'))
  const { parse } = compilerSfc
  compilerSfc.parse = (source: string, options: SFCParseOptions) => {
    if (options?.filename) {
      const extname = path.extname(options.filename)
      // wxs、filter、renderjs
      if (extname && !EXTNAME_VUE.includes(extname)) {
        const tag = extname.slice(1)
        source = `<${tag}>` + source + `</${tag}>`
      }
    }
    return parse(source, options)
  }
}
