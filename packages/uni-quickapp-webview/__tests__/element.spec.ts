import { assert } from './testUtils'

describe('quickapp-webview: transform element', () => {
  test(`element with key`, () => {
    assert(
      `<view key="1" /><view :key="1" />`,
      `<view/><view/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
})
