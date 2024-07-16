import type { SFCParseOptions } from '@vue/compiler-sfc'
import { parse as babelParse } from '@babel/parser'

import {
  type SFCScriptCompileOptions,
  compileScript,
} from '../../../src/plugins/android/uvue/sfc/compiler/compileScript'

export const mockId = 'xxxxxxxx'

export function compileSFCScript(
  src: string,
  options?: Partial<SFCScriptCompileOptions>,
  parseOptions?: SFCParseOptions
) {
  const className = 'GenAnonymous'
  const { descriptor } = require('@vue/compiler-sfc').parse(src, parseOptions)
  const result = compileScript(descriptor, {
    ...options,
    id: mockId,
    root: __dirname,
    className,
    inlineTemplate: true,
    scriptAndScriptSetup: true,
    componentType: 'component',
  })
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
