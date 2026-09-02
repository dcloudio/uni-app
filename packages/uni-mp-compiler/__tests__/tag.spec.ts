import {
  HTML_TO_MINI_PROGRAM_TAGS,
  transformTeleport,
} from '@dcloudio/uni-cli-shared'
import { assert } from './testUtils'

describe('compiler: transform tag', () => {
  test('html', () => {
    Object.keys(HTML_TO_MINI_PROGRAM_TAGS).forEach((htmlTag) => {
      // 自闭合
      assert(
        `<${htmlTag}/>`,
        `<${HTML_TO_MINI_PROGRAM_TAGS[htmlTag]}/>`,
        `(_ctx, _cache) => {
  return {}
}`
      )
      // 成对标签
      assert(
        `<${htmlTag}></${htmlTag}>`,
        `<${HTML_TO_MINI_PROGRAM_TAGS[htmlTag]}></${HTML_TO_MINI_PROGRAM_TAGS[htmlTag]}>`,
        `(_ctx, _cache) => {
  return {}
}`
      )
    })
  })
  test('built-in custom elements', () => {
    assert(
      `<uni-cloud-db-element/>`,
      `<uni-cloud-db-element u-i="2a9ec0b0-0"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('built-in custom elements (x)', () => {
    assert(
      `<uni-cloud-db-element ref="udb"/>`,
      `<view u-t="uni-cloud-db-element" ref="udb" style="{{$eS[a]}}" id="r0-2a9ec0b0"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _sei('r0-2a9ec0b0', { "name": "uni-cloud-db-element", "type": 2 }, 'udb'), b: _s(_ses('r0-2a9ec0b0', { '--status-bar-height': \`\${_ctx.u_s_b_h}px\`, '--uni-safe-area-inset-bottom': \`\${_ctx.u_s_a_i_b}px\` })) }
  return __returned__
}`,
      {
        isX: true,
      }
    )
  })
  test('teleport', () => {
    assert(
      `<teleport to="#foo" disabled defer><view/></teleport>`,
      `<root-portal enable="{{false}}"><view/></root-portal>`,
      `(_ctx, _cache) => {
  return {}
}`,
      {
        nodeTransforms: [transformTeleport],
      }
    )
    assert(
      `<teleport :to="to" :defer="isDeferred"><view/></teleport>`,
      `<root-portal><view/></root-portal>`,
      `(_ctx, _cache) => {
  return {}
}`,
      {
        nodeTransforms: [transformTeleport],
      }
    )
    assert(
      `<teleport :to="to" :disabled="disabled"><view/></teleport>`,
      `<root-portal enable="{{a}}"><view/></root-portal>`,
      `(_ctx, _cache) => {
  return { a: !_ctx.disabled }
}`,
      {
        nodeTransforms: [transformTeleport],
      }
    )
    assert(
      `<teleport :disabled="disabled" :defer="isDeferred"><view/></teleport>`,
      `<root-portal enable="{{a}}"><view/></root-portal>`,
      `(_ctx, _cache) => {
  return { a: !_ctx.disabled }
}`,
      {
        nodeTransforms: [transformTeleport],
      }
    )
    assert(
      `<teleport :to="data.to" :disabled="data.disabled ? !data.enable : false"><view/></teleport>`,
      `<root-portal enable="{{a}}"><view/></root-portal>`,
      `(_ctx, _cache) => {
  return { a: !(_ctx.data.disabled ? !_ctx.data.enable : false) }
}`,
      {
        nodeTransforms: [transformTeleport],
      }
    )
    assert(
      `<Teleport v-if="show" to="#target"><view>test Teleport</view></Teleport>`,
      `<root-portal wx:if="{{a}}"><view>test Teleport</view></root-portal>`,
      `(_ctx, _cache) => {
  return _e({ a: _ctx.show }, _ctx.show ? {} : {})
}`,
      {
        nodeTransforms: [transformTeleport],
      }
    )
    assert(
      `<Teleport :disabled="disabled" :defer="isDeferred"><view/></Teleport>`,
      `<root-portal enable="{{a}}"><view/></root-portal>`,
      `(_ctx, _cache) => {
  return { a: !_ctx.disabled }
}`,
      {
        nodeTransforms: [transformTeleport],
      }
    )
  })
})
