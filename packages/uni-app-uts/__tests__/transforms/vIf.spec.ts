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
        <text v-if="a">v-if</text>
        <text v-else>v-else</text>
      `,
      `isTrue(_ctx.a)\n  ? createElementVNode("text", new Map<string,any>([["key", 0]]), "v-if")\n  : createElementVNode("text", new Map<string,any>([["key", 1]]), "v-else")`
    )
  })
  test('template v-if + v-else-if + v-else', () => {
    assert(
      `
        <text v-if="a">v-if</text>
        <text v-else-if="a">v-else-if</text>
        <text v-else>v-else</text>
      `,
      `isTrue(_ctx.a)\n  ? createElementVNode("text", new Map<string,any>([["key", 0]]), "v-if")\n  : isTrue(_ctx.a)\n    ? createElementVNode("text", new Map<string,any>([["key", 1]]), "v-else-if")\n    : createElementVNode("text", new Map<string,any>([["key", 2]]), "v-else")`
    )
  })
})
