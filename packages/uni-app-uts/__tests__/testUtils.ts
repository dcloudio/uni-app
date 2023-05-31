import { compile } from '../src/plugins/uvue/compiler/index'
import { CompilerOptions } from '../src/plugins/uvue/compiler/options'

export function assert(
  template: string,
  templateCode: string,
  options: CompilerOptions = { targetLanguage: 'kotlin' }
) {
  const compilerOptions: CompilerOptions = {
    filename: 'PagesIndexIndex',
    prefixIdentifiers: true,
    ...options,
  }
  const res = compile(template, compilerOptions)
  if (typeof expect !== 'undefined') {
    expect(res.code).toBe(templateCode)
  }
  return res
}
