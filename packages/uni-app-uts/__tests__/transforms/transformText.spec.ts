import { assert } from '../testUtils'

describe('compiler: transform text', () => {
  test('transform text', () => {
    assert(`<text>hello</text>`, `createElementVNode("text", null, "hello")`)
    assert(
      `<view>hello</view>`,
      `createElementVNode("view", null, [
  createElementVNode("text", null, "hello")
])`
    )
    assert(
      `<view><text>hello</text></view>`,
      `createElementVNode("view", null, [
  createElementVNode("text", null, "hello")
])`
    )
    assert(
      `<view>aaa{{bbb}}ccc</view>`,
      `createElementVNode("view", null, [
  createElementVNode("text", null, "aaa" + toDisplayString(_ctx.bbb) + "ccc", 1 /* TEXT */)
])`
    )
    assert(
      `<view>aaa{{bbb}}<view>ccc{{ddd}}</view>{{eee}}fff<text>{{ggg}}</text></view>`,
      `createElementVNode("view", null, [
  createElementVNode("text", null, "aaa" + toDisplayString(_ctx.bbb), 1 /* TEXT */),
  createElementVNode("view", null, [
    createElementVNode("text", null, "ccc" + toDisplayString(_ctx.ddd), 1 /* TEXT */)
  ]),
  createElementVNode("text", null, toDisplayString(_ctx.eee) + "fff", 1 /* TEXT */),
  createElementVNode("text", null, toDisplayString(_ctx.ggg), 1 /* TEXT */)
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
      `createElementVNode(\"view\", null, [
  createElementVNode(\"text\", null, \"\\\\\\\\ 换行\"),
  createElementVNode(\"text\", null, \"\\\\n 换行\"),
  createElementVNode(\"text\", null, \"\\\\ 换行\"),
  createElementVNode(\"text\", null, \"\\n 换行\"),
  createElementVNode(\"text\", null, \" 换行\"),
  createElementVNode(\"text\", null, \" 换行 \\n 换行 \\\\ 换行 \\\\\\n 换行 \\\\\\\\ 换行\")
])`
    )
  })
})
