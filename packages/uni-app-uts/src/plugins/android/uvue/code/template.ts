import { SFCDescriptor } from '@vue/compiler-sfc'
import { compile } from '../compiler'
import { CompilerOptions } from '../compiler/options'
import { genRenderFunctionDecl } from '../compiler/utils'

export function genTemplate(
  { template }: SFCDescriptor,
  options: CompilerOptions
) {
  if (!template || !template.content) {
    return {
      code: genRenderFunctionDecl(options) + ` { return null }`,
      easyComponentAutoImports: {},
      importEasyComponents: [],
      importUTSComponents: [],
      elements: [],
      imports: [],
    }
  }
  return compile(template.content, options)
}

export const genTemplateCode = genTemplate
