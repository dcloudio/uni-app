import { assert } from '../testUtils'

describe('compiler:ref', () => {
  test('template ref', () => {
    assert(
      `<view><Foo ref="test"></Foo></view>`,
      `createElementVNode("view", null, [
  createVNode(_component_Foo, new Map<string, any | null>([["ref", "test"]]), null, 512 /* NEED_PATCH */)
])`
    )
  })
})
