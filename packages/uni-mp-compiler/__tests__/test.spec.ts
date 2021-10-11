// import { inspect } from './testUtils'

import { compile } from '../src'

function assert(template: string, templateCode: string, renderCode: string) {
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
  })
  // expect(res.template).toBe(templateCode)
  // expect(res.code).toBe(renderCode)
  // console.log(require('util').inspect(res.code, { colors: true, depth: null }))
  console.log(require('util').inspect(res, { colors: true, depth: null }))
  console.log(res.code)
  expect(res.code).toBe(renderCode)
}

describe('compiler', () => {
  test(`keyed v-for`, () => {
    assert(
      `<view v-for="(item) in items" :key="item" />`,
      `<view wx:for="{{a}}" wx:for-item="item" wx:key="*this"/>`,
      `(_ctx, _cache) => {
return {
  a: vFor(_ctx.items, item => {
    return {};
  })
}
}`
    )
  })
})
