import { assert } from './testUtils'
import {
  transformDirection,
  transformMPBuiltInTag,
  transformTeleport,
} from '@dcloudio/uni-cli-shared'

describe('compiler: transform tagAndProp', () => {
  test('list-view', () => {
    assert(
      `<list-view />`,
      `<scroll-view style=\"{{'--status-bar-height:' + a + ';' + ('--uni-safe-area-inset-bottom:' + b)}}\" enable-flex=\"true\" enhanced=\"true\" scroll-y=\"true\"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_a_i_b}px\` }
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
      `<scroll-view style=\"{{'--status-bar-height:' + a + ';' + ('--uni-safe-area-inset-bottom:' + b)}}\" enable-flex=\"true\" enhanced=\"true\" scroll-x=\"true\"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_a_i_b}px\` }
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
      `<scroll-view style=\"{{'--status-bar-height:' + a + ';' + ('--uni-safe-area-inset-bottom:' + b)}}\" enable-flex=\"true\" enhanced=\"true\" scroll-x=\"true\"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_a_i_b}px\` }
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
      `<scroll-view style=\"{{'--status-bar-height:' + a + ';' + ('--uni-safe-area-inset-bottom:' + b)}}\" enable-flex=\"true\" enhanced=\"true\" scroll-x=\"{{c}}\" scroll-y=\"{{d}}\"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_a_i_b}px\`, c: _ctx.d === 'horizontal' || _ctx.d === 'all', d: !_ctx.d || _ctx.d === 'vertical' || _ctx.d === 'all' }
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformMPBuiltInTag, transformDirection],
      }
    )
  })
  test('scroll-view dynamic member direction', () => {
    assert(
      `<scroll-view :direction="data.direction" />`,
      `<scroll-view style=\"{{'--status-bar-height:' + a + ';' + ('--uni-safe-area-inset-bottom:' + b)}}\" enable-flex=\"true\" enhanced=\"true\" scroll-x=\"{{c}}\" scroll-y=\"{{d}}\"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_a_i_b}px\`, c: _ctx.data.direction === 'horizontal' || _ctx.data.direction === 'all', d: !_ctx.data.direction || _ctx.data.direction === 'vertical' || _ctx.data.direction === 'all' }
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
      `<canvas style=\"{{'--status-bar-height:' + a + ';' + ('--uni-safe-area-inset-bottom:' + b)}}\" type=\"2d\"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_a_i_b}px\` }
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
      `<checkbox color=\"#FF0000\" style=\"{{'--status-bar-height:' + a + ';' + ('--uni-safe-area-inset-bottom:' + b)}}\"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_a_i_b}px\` }
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
      `<checkbox color=\"#FF0000\" style=\"{{'--status-bar-height:' + a + ';' + ('--uni-safe-area-inset-bottom:' + b)}}\"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformMPBuiltInTag, transformDirection],
      }
    )
  })
  test('teleport', () => {
    assert(
      `<teleport to="body" defer><view /></teleport>`,
      `<root-portal style=\"{{'--status-bar-height:' + a + ';' + ('--uni-safe-area-inset-bottom:' + b)}}\"><view/></root-portal>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformTeleport],
      }
    )
    assert(
      `<teleport :to="to" :defer="isDeferred"><view /></teleport>`,
      `<root-portal style=\"{{'--status-bar-height:' + a + ';' + ('--uni-safe-area-inset-bottom:' + b)}}\"><view/></root-portal>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformTeleport],
      }
    )
    assert(
      `<teleport :to="to"><view /></teleport>`,
      `<root-portal style=\"{{'--status-bar-height:' + a + ';' + ('--uni-safe-area-inset-bottom:' + b)}}\"><view/></root-portal>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformTeleport],
      }
    )
    assert(
      `<teleport :to="data.to"><view /></teleport>`,
      `<root-portal style=\"{{'--status-bar-height:' + a + ';' + ('--uni-safe-area-inset-bottom:' + b)}}\"><view/></root-portal>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformTeleport],
      }
    )
    assert(
      `<teleport disabled><view /></teleport>`,
      `<root-portal enable="{{false}}" style=\"{{'--status-bar-height:' + a + ';' + ('--uni-safe-area-inset-bottom:' + b)}}\"><view/></root-portal>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformTeleport],
      }
    )
    assert(
      `<teleport :disabled="disabled"><view /></teleport>`,
      `<root-portal enable="{{a}}" style=\"{{'--status-bar-height:' + b + ';' + ('--uni-safe-area-inset-bottom:' + c)}}\"><view/></root-portal>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: !_ctx.disabled, b: \`\${_ctx.u_s_b_h}px\`, c: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformTeleport],
      }
    )
    assert(
      `<teleport :disabled="disabled" :defer="isDeferred"><view /></teleport>`,
      `<root-portal enable="{{a}}" style=\"{{'--status-bar-height:' + b + ';' + ('--uni-safe-area-inset-bottom:' + c)}}\"><view/></root-portal>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: !_ctx.disabled, b: \`\${_ctx.u_s_b_h}px\`, c: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformTeleport],
      }
    )
    assert(
      `<teleport :disabled="data.disabled"><view /></teleport>`,
      `<root-portal enable="{{a}}" style=\"{{'--status-bar-height:' + b + ';' + ('--uni-safe-area-inset-bottom:' + c)}}\"><view/></root-portal>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: !_ctx.data.disabled, b: \`\${_ctx.u_s_b_h}px\`, c: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformTeleport],
      }
    )
    assert(
      `<Teleport :disabled="data.disabled" :defer="isDeferred"><view /></Teleport>`,
      `<root-portal enable="{{a}}" style=\"{{'--status-bar-height:' + b + ';' + ('--uni-safe-area-inset-bottom:' + c)}}\"><view/></root-portal>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: !_ctx.data.disabled, b: \`\${_ctx.u_s_b_h}px\`, c: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformTeleport],
      }
    )
  })
})
