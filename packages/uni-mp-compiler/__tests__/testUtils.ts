import { compile } from '../src/index'
import { CompilerOptions } from '../src/options'
export function inspect(obj: any) {
  console.log(require('util').inspect(obj, { colors: true, depth: null }))
}
export function assert(
  template: string,
  templateCode: string,
  renderCode: string,
  options: CompilerOptions = {}
) {
  const res = compile(template, {
    filename: 'foo.vue',
    prefixIdentifiers: true,
    inline: true,
    emitFile({ source }) {
      // console.log(source)
      if (!options.onError) {
        expect(source).toBe(templateCode)
      }
      return ''
    },
    ...options,
  })
  // expect(res.template).toBe(templateCode)
  // expect(res.code).toBe(renderCode)
  // console.log(require('util').inspect(res.code, { colors: true, depth: null }))
  // console.log(require('util').inspect(res, { colors: true, depth: null }))
  if (!options.onError) {
    expect(res.code).toBe(renderCode)
  }
}
