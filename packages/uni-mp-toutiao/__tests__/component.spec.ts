import { assert } from './testUtils'

describe('mp-baidu: transform component', () => {
  test(`match-media`, () => {
    assert(
      `<match-media/>`,
      `<uni-match-media u-i="2a9ec0b0-0" bind:__l="__l"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
})
