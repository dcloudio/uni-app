import { assert } from '../testUtils'

describe('compiler: transform tap to click', () => {
  test('transform tap to click', () => {
    assert(
      `<text @click="click">hello</text>`,
      `createElementVNode("text", new Map<string,any | null>([["onClick", _ctx.click]]), "hello", 8 /* PROPS */, ["onClick"])`
    )
    assert(
      `<text @tap="click">hello</text>`,
      `createElementVNode("text", new Map<string,any | null>([["onClick", _ctx.click]]), "hello", 8 /* PROPS */, ["onClick"])`
    )
    assert(
      `<view @tap="click">hello</view>`,
      `createElementVNode("view", new Map<string,any | null>([["onClick", _ctx.click]]), [
  createElementVNode("text", null, "hello")
], 8 /* PROPS */, ["onClick"])`
    )
    assert(
      `<button @tap="click">hello</button>`,
      `createVNode(_component_button, new Map<string,any | null>([["onClick", _ctx.click]]), new Map<string,any | null>([
  ["default", ((): any[] => ["hello"])],
  ["_", 1 /* STABLE */]
]), 8 /* PROPS */, ["onClick"])`
    )
  })
})
