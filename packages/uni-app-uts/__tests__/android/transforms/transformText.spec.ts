import { assert } from '../testUtils'

describe('compiler: transform text', () => {
  test('transform text', () => {
    assert(`<text>hello</text>`, `_cE("text", null, "hello")`)
    assert(`<view>hello</view>`, `_cE("view", null, "hello")`)
    assert(
      `<view><text>hello</text></view>`,
      `_cE("view", null, [
  _cE("text", null, "hello")
])`
    )
    assert(
      `<view>aaa{{bbb}}ccc</view>`,
      `_cE("view", null, "aaa" + _tD(_ctx.bbb) + "ccc", 1 /* TEXT */)`
    )
    assert(
      `<view>aaa{{bbb}}<view>ccc{{ddd}}</view>{{eee}}fff<text>{{ggg}}</text></view>`,
      `_cE("view", null, [
  "aaa" + _tD(_ctx.bbb),
  _cE("view", null, "ccc" + _tD(_ctx.ddd), 1 /* TEXT */),
  _tD(_ctx.eee) + "fff",
  _cE("text", null, _tD(_ctx.ggg), 1 /* TEXT */)
])`
    )
  })
  test('\n', () => {
    assert(
      `<view>
  <text>\\\\\n 换行</text>
  <text>\\\\n 换行</text>
  <text>\\\n 换行</text>
  <text>\\n 换行</text>
  <text>\n 换行</text>
  <text>\n 换行 \\n 换行 \\\n 换行 \\\\n 换行 \\\\\n 换行</text>
</view>`,
      `_cE(\"view\", null, [
  _cE(\"text\", null, \"\\\\\\\\ 换行\"),
  _cE(\"text\", null, \"\\\\n 换行\"),
  _cE(\"text\", null, \"\\\\ 换行\"),
  _cE(\"text\", null, \"\\n 换行\"),
  _cE(\"text\", null, \" 换行\"),
  _cE(\"text\", null, \" 换行 \\n 换行 \\\\ 换行 \\\\\\n 换行 \\\\\\\\ 换行\")
])`
    )
  })
})
