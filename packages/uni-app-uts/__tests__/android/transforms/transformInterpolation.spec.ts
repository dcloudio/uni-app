import { assert } from '../testUtils'

describe('compiler: transform interpolation', () => {
  test('transform interpolation', () => {
    assert(`<text>foo</text>`, `_cE("text", null, "foo")`)
    assert(
      `<text>{{ foo }} bar {{ baz }}</text>`,
      `_cE("text", null, _tD(_ctx.foo) + " bar " + _tD(_ctx.baz), 1 /* TEXT */)`
    )
  })
})
