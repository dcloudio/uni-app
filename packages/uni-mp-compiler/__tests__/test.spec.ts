// import { inspect } from './testUtils'

import { compile } from '../src'

function assert(template: string, templateCode: string, renderCode: string) {
  const res = compile(template, {
    filename: 'foo.vue',
    prefixIdentifiers: true,
    inline: true,
    emitFile({ source }) {
      console.log(source)
      // expect(source).toBe(templateCode)
      return ''
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
  test('template v-for key no prefixing on attribute key', () => {
    assert(
      `<template v-for="item in items" key="key">test</template>`,
      `<block wx:for="{{a}}" wx:for-item="item" key="key">test</block>`,
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
