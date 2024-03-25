import { once } from '@dcloudio/uni-shared'
import { resolveBuiltIn } from '@dcloudio/uni-cli-shared'
import {
  SFCDescriptor,
  SFCScriptBlock,
  SFCScriptCompileOptions,
} from '@vue/compiler-sfc'

export const rewriteCompileScriptOnce = once(rewriteCompileScript)

function rewriteCompileScript() {
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
