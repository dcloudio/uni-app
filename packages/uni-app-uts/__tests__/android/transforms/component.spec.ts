import { assert } from '../testUtils'

describe('compiler: component', () => {
  test('template component', () => {
    assert(
      `<view><Foo /></view>`,
      `function PagesIndexIndexRender(): any | null {
const _ctx = this
const _cache = this.$.renderCache
const _component_Foo = resolveComponent("Foo")

  return _cE("view", null, [
    _cV(_component_Foo)
  ])
}`,
      {
        mode: 'module',
      }
    )
  })
})
