import { addComponentBindLink } from '@dcloudio/uni-cli-shared'
import { assert } from './testUtils'

describe('compiler: transform component', () => {
  test('basic', () => {
    assert(
      `<custom/>`,
      `<custom class="vue-ref" bind:__l="__l"/>`,
      `(_ctx, _cache) => {
  return {}
}`,
      {
        nodeTransforms: [addComponentBindLink as any],
      }
    )
  })
})
