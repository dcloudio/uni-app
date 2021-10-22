// import { inspect } from './testUtils'

import { compile } from '../src'
import { CompilerOptions } from '../src/options'

function assert(
  template: string,
  templateCode: string,
  renderCode: string,
  options: CompilerOptions = {}
) {
  const res = compile(template, {
    filename: 'foo.vue',
    prefixIdentifiers: true,
    inline: true,
    miniProgram: {
      slot: {
        fallback: false,
      },
      directive: 'wx:',
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
  // console.log(require('util').inspect(res, { colors: true, depth: null }))
  console.log(res.code)
  expect(res.code).toBe(renderCode)
}

describe('compiler', () => {
  test('scope', () => {
    assert(
      `<view :class="{ red: isRed }"/>`,
      `<view class="{{[a && 'red']}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.isRed ? 1 : 0 }
}`
    )
  })
})
