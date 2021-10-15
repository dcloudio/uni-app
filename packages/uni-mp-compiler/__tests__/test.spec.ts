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
  // console.log(require('util').inspect(res, { colors: true, depth: null }))
  console.log(res.code)
  expect(res.code).toBe(renderCode)
}

describe('compiler', () => {
  test('scope', () => {
    assert(
      `<view v-for="(item,weekIndex) in weeks" :key="weekIndex" :data-id="item.id"><view v-for="(weeks,weeksIndex) in item" :key="weeksIndex" :data-id="weeks.id"/></view>`,
      `<view wx:for="{{a}}" wx:for-item="item" wx:key="b" data-id="{{item.c}}"><view wx:for="{{item.a}}" wx:for-item="weeks" wx:key="a" data-id="{{weeks.b}}"/></view>`,
      `(_ctx, _cache) => {
  return { a: _vFor(_ctx.weeks, (item, weekIndex) => { return { a: _vFor(item, (weeks, weeksIndex) => { return { a: weeksIndex, b: weeks.id }; }), b: weekIndex, c: item.id }; }) }
}`
    )
  })
})
