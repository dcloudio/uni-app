import { assert } from '../testUtils'

describe('compiler: transform text', () => {
  test('transform text', () => {
    assert(`<text>foo</text>`, `createElementVNode("text", null, "foo")`)
    assert(
      `<text>{{ foo }} bar {{ baz }}</text>`,
      `createElementVNode("text", null, toDisplayString(_ctx.foo) + " bar " + toDisplayString(_ctx.baz), 1 /* TEXT */)`
    )
  })
})
