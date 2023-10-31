import { SFCDescriptor } from '@vue/compiler-sfc'
import { compile } from '../compiler'
import { CompilerOptions } from '../compiler/options'
import { genRenderFunctionDecl } from '../compiler/utils'

export function genTemplate(
  { template }: SFCDescriptor,
  options: CompilerOptions
) {
  if (!template) {
    return {
      code: genRenderFunctionDecl(options) + ` { return null }`,
      importEasyComponents: [],
      importUTSComponents: [],
      elements: [],
      imports: [],
    }
  }
  return compile(template.content, options)
}
