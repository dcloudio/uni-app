import { assert } from './testUtils'
import { customElements } from '../src/compiler/options'
describe('mp-weixin: transform component', () => {
  test(`built-in component`, () => {
    const code = customElements.map((tag) => `<${tag}/>`).join('')
    assert(
      code,
      code,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('lazy element', () => {
    assert(
      `<editor/>`,
      `<editor/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<editor @ready="ready"/>`,
      `<block wx:if="{{r0}}"><editor bindready="{{a}}"/></block>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.ready) }
}`
    )
  })
})
