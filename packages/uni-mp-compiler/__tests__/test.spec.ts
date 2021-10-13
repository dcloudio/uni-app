// import { inspect } from './testUtils'

import { compile } from '../src'
import { CompilerOptions } from '../src/options'

function assert(
  template: string,
  templateCode: string,
  renderCode: string,
  options: CompilerOptions
) {
  const res = compile(template, {
    filename: 'foo.vue',
    prefixIdentifiers: true,
    inline: true,
    miniProgram: {
      emitFile({ source }) {
        console.log(source)
        // expect(source).toBe(templateCode)
        return ''
      },
    },
    ...options,
  })
  // expect(res.template).toBe(templateCode)
  // expect(res.code).toBe(renderCode)
  // console.log(require('util').inspect(res.code, { colors: true, depth: null }))
  console.log(require('util').inspect(res, { colors: true, depth: null }))
  console.log(res.code)
  expect(res.code).toBe(renderCode)
}

describe('compiler', () => {
  test('should wrap as function if expression is inline statement', () => {
    assert(
      `<view :class="{ a: 1, b: 0, c: true, d: false, e: null, f: undefined, g: ok, h: handle(ok), i: ok>1 }"/>`,
      `<view class="{{['a', 'c', a && 'g', b && 'h', c && 'i' ]}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.ok, b: _ctx.handle(_ctx.ok), c: _ctx.ok > 1 }
}`,
      {}
    )
  })
})
