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
  console.log(require('util').inspect(res, { colors: true, depth: null }))
  console.log(res.code)
  expect(res.code).toBe(renderCode)
}

describe('compiler', () => {
  test('scope', () => {
    assert(
      `<view v-for="item in items"><view v-for="item1 in item1" :data-id="item.id" :data-title="item1.title"/></view>`,
      `<view wx:for="{{a}}" wx:for-item="item"><view wx:for="{{b}}" wx:for-item="item1" data-id="{{item.a}}" data-title="{{item1.a}}"/></view>`,
      `(_ctx, _cache) => {
  return { a: _vFor(_ctx.items, item => { return { a: item.id }; }), b: _vFor(_ctx.item1, item1 => { return { a: item1.title }; }) }
}`
    )
  })
})
