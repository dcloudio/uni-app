import { once } from '@dcloudio/uni-shared'

import type {
  SFCDescriptor,
  SFCScriptBlock,
  SFCScriptCompileOptions,
} from '@vue/compiler-sfc'
import { resolveBuiltIn } from '../resolve'

export const rewriteCompileScriptSetupLangOnce = once(
  rewriteCompileScriptSetupLang
)
// 临时重写lang，用于激活 compileScript 内部判断，确保 setup 生成 export default defineComponent({})
// uts2js (iOS|web)
function rewriteCompileScriptSetupLang() {
  const compiler = require(resolveBuiltIn('@vue/compiler-sfc'))
  const { compileScript } = compiler
  // script-setup + v-bind
  compiler.compileScript = (
    sfc: SFCDescriptor,
    options: SFCScriptCompileOptions
  ): SFCScriptBlock => {
    const originalScriptSetupLang = sfc.scriptSetup?.lang
    if (originalScriptSetupLang === 'uts') {
      sfc.scriptSetup!.lang = 'ts'
    }
    const result = compileScript(sfc, options)
    if (originalScriptSetupLang === 'uts') {
      sfc.scriptSetup!.lang = 'uts'
    }
    return result
  }
}
