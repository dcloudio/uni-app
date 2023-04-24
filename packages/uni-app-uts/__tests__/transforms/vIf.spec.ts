import { assert } from '../testUtils'

describe('compiler:v-if', () => {
  test('template v-if', () => {
    assert(
      `<view v-if="a"></view>`,
      `isTrue(_ctx.a)\n  ? createElementVNode("view", new Map<string,any>([["key", 0]]))\n  : createCommentVNode("v-if", true)`
    )
  })
  test('template v-if + v-else', () => {
    assert(
      `
        <view v-if="a">v-if</view>
        <view v-else>v-else</view>
      `,
      `isTrue(_ctx.a)\n  ? createElementVNode("view", new Map<string,any>([["key", 0]]), "v-if")\n  : createElementVNode("view", new Map<string,any>([["key", 1]]), "v-else")`
    )
  })
  test('template v-if + v-else-if + v-else', () => {
    assert(
      `
        <view v-if="a">v-if</view>
        <view v-else-if="a">v-else-if</view>
        <view v-else>v-else</view>
      `,
      `isTrue(_ctx.a)\n  ? createElementVNode("view", new Map<string,any>([["key", 0]]), "v-if")\n  : isTrue(_ctx.a)\n    ? createElementVNode("view", new Map<string,any>([["key", 1]]), "v-else-if")\n    : createElementVNode("view", new Map<string,any>([["key", 2]]), "v-else")`
    )
  })
})
