import { compile } from '../src/index'

function assert(template: string, templateCode: string, renderCode: string) {
  const res = compile(template, {
    filename: 'foo.vue',
    prefixIdentifiers: true,
    inline: true,
    emitFile({ source }) {
      console.log(source)
      expect(source).toBe(templateCode)
      return ''
    },
  })
  // expect(res.template).toBe(templateCode)
  // expect(res.code).toBe(renderCode)
  // console.log(require('util').inspect(res.code, { colors: true, depth: null }))
  // console.log(require('util').inspect(res, { colors: true, depth: null }))
  console.log(res.code)
  expect(res.code).toBe(renderCode)
}

describe('compiler', () => {
  test(`basic v-if`, () => {
    assert(
      `<view v-if="ok"/>`,
      `<view wx:if="{{a}}"/>`,
      `(_ctx, _cache) => {
return {
  a: _ctx.ok,
  ...(_ctx.ok ? {} : {})
}
}`
    )
  })
})
