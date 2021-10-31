import { assert } from './testUtils'

describe('mp-baidu: transform component', () => {
  test(`match-media`, () => {
    assert(
      `<match-media/>`,
      `<match-media/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
})
