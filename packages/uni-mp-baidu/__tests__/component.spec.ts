import { assert } from './testUtils'
import { customElements } from '../src/compiler/options'
describe('mp-baidu: transform component', () => {
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
  test(`match-media`, () => {
    assert(
      `<match-media/>`,
      `<uni-match-media u-i="2a9ec0b0-0"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
})
