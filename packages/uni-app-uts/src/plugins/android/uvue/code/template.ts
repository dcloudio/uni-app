import { SFCDescriptor } from '@vue/compiler-sfc'
import { compile } from '../compiler'
import { TemplateCompilerOptions } from '../compiler/options'
import { genRenderFunctionDecl } from '../compiler/utils'

export function genTemplate(
  { template }: SFCDescriptor,
  options: TemplateCompilerOptions
) {
  if (!template || !template.content) {
    return {
      code:
        options.mode === 'module'
          ? genRenderFunctionDecl(options) + ` { return null }`
          : `null`,
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
