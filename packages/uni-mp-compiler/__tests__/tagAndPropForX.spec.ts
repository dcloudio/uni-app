import { assert } from './testUtils'
import {
  transformDirection,
  transformMPBuiltInTag,
} from '@dcloudio/uni-cli-shared'

describe('compiler: transform tagAndProp', () => {
  test('list-view', () => {
    assert(
      `<list-view />`,
      `<scroll-view enable-flex=\"true\" scroll-y=\"true\"/>`,
      `(_ctx, _cache) => {
  const __returned__ = {}
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformMPBuiltInTag, transformDirection],
      }
    )
  })
  test('list-view direction horizontal', () => {
    assert(
      `<list-view direction="horizontal" />`,
      `<scroll-view enable-flex=\"true\" scroll-x=\"true\"/>`,
      `(_ctx, _cache) => {
  const __returned__ = {}
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformMPBuiltInTag, transformDirection],
      }
    )
  })
  test('canvas', () => {
    assert(
      `<canvas />`,
      `<canvas type=\"2d\"/>`,
      `(_ctx, _cache) => {
  const __returned__ = {}
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformMPBuiltInTag, transformDirection],
      }
    )
  })
  test('checkbox fore-color', () => {
    assert(
      `<checkbox fore-color="#FF0000" />`,
      `<checkbox color=\"#FF0000\"/>`,
      `(_ctx, _cache) => {
  const __returned__ = {}
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformMPBuiltInTag, transformDirection],
      }
    )
  })
  test('checkbox foreColor', () => {
    assert(
      `<checkbox foreColor="#FF0000" />`,
      `<checkbox color=\"#FF0000\"/>`,
      `(_ctx, _cache) => {
  const __returned__ = {}
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformMPBuiltInTag, transformDirection],
      }
    )
  })
})
