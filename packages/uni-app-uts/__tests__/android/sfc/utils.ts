import { parse, SFCParseOptions } from '@vue/compiler-sfc'
import { parse as babelParse } from '@babel/parser'

import {
  compileScript,
  SFCScriptCompileOptions,
} from '../../../src/plugins/android/uvue/sfc/compiler/compileScript'
import { genTemplateCode } from '../../../src/plugins/android/uvue/code/template'
import { resolveGenTemplateCodeOptions } from '../../../src/plugins/android/uvue/sfc/template'
export const mockId = 'xxxxxxxx'

export function compileSFCScript(
  src: string,
  options?: Partial<SFCScriptCompileOptions>,
  parseOptions?: SFCParseOptions
) {
  const { descriptor } = parse(src, parseOptions)
  const result = compileScript(descriptor, {
    ...options,
    id: mockId,
    className: '',
    inlineTemplate: true,
    scriptAndScriptSetup: true,
  })
  if (options?.inlineTemplate) {
    const isInline = !!descriptor.scriptSetup
    const templateResult = genTemplateCode(
      descriptor,
      resolveGenTemplateCodeOptions(descriptor.filename, src, descriptor, {
        mode: 'module',
        inline: isInline,
        rootDir: '',
        sourceMap: false,
        bindingMetadata: result.bindings,
      })
    )
    result.content = result.content.replace(
      `"INLINE_RENDER"`,
      templateResult.code
    )
  }
  return result
}

export function assertCode(code: string) {
  // parse the generated code to make sure it is valid
  try {
    babelParse(code, {
      sourceType: 'module',
      plugins: ['typescript'],
    })
  } catch (e: any) {
    console.log(code, e)
    throw e
  }
  // console.log(code)
  expect(code).toMatchSnapshot()
}
