import { SFCTemplateBlock } from '@vue/compiler-sfc'
import { compile } from './compiler'
import { CompilerOptions } from './compiler/options'
import { genRenderFunctionDecl } from './utils'

export function genTemplate(
  template: SFCTemplateBlock | null,
  options: CompilerOptions
) {
  if (!template) {
    return genRenderFunctionDecl(options) + ` { return null }`
  }
  return compile(template.content, options).code
}
