import { assert } from '../testUtils'

describe('compiler: transform interpolation', () => {
  test('transform interpolation', () => {
    assert(`<text>foo</text>`, `createElementVNode("text", null, "foo")`)
    assert(
      `<text>{{ foo }} bar {{ baz }}</text>`,
      `createElementVNode("text", null, toDisplayString(_ctx.foo) + " bar " + toDisplayString(_ctx.baz), 1 /* TEXT */)`
    )
  })
})
