import { assert } from './testUtils'
import { customElements } from '../src/compiler/options'

describe('mp-jd: transform component', () => {
  test('lazy element', () => {
    assert(
      `<switch/>`,
      `<switch/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<switch @change="change"/>`,
      `<switch bindchange="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.change) }
}`
    )
  })
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
})
