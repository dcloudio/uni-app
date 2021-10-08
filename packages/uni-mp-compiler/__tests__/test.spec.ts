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
  test(`generate v-for with v-if`, () => {
    assert(
      `<view v-for="item in items"><view v-if="item.show">{{item.title}}</view></view>`,
      `<view wx:for="{{a}}" wx:for-item="item"><view wx:if="{{item.b}}">{{item.a}}</view></view>`,
      `(_ctx, _cache) => {
return {
  a: vFor(_ctx.items, item => {
    return {
      a: item.title,
      b: item.show,
      ...(item.show ? {} : {})
    };
  })
}
}`
    )
  })
})
