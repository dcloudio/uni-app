import { assert } from './testUtils'
import {
  transformDirection,
  transformMPBuiltInTag,
} from '@dcloudio/uni-cli-shared'

describe('compiler: transform tagAndProp', () => {
  test('list-view', () => {
    assert(
      `<list-view />`,
      `<scroll-view enable-flex=\"true\" enhanced=\"true\" scroll-y=\"true\"/>`,
      `(_ctx, _cache) => { "raw js"
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
      `<scroll-view enable-flex=\"true\" enhanced=\"true\" scroll-x=\"true\"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = {}
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformMPBuiltInTag, transformDirection],
      }
    )
  })
  test('scroll-view direction horizontal', () => {
    assert(
      `<scroll-view direction="horizontal" />`,
      `<scroll-view enable-flex=\"true\" enhanced=\"true\" scroll-x=\"true\"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = {}
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformMPBuiltInTag, transformDirection],
      }
    )
  })
  test('scroll-view dynamic direction', () => {
    assert(
      `<scroll-view :direction="d" />`,
      `<scroll-view enable-flex=\"true\" enhanced=\"true\" scroll-x=\"{{a}}\" scroll-y=\"{{b}}\"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _ctx.d === 'horizontal' || _ctx.d === 'all', b: !_ctx.d || _ctx.d === 'vertical' || _ctx.d === 'all' }
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
      `(_ctx, _cache) => { "raw js"
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
      `(_ctx, _cache) => { "raw js"
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
      `(_ctx, _cache) => { "raw js"
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
