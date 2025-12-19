import { addMiniProgramPageJson } from '@dcloudio/uni-cli-shared'
import { customElements } from '../src/compiler/options'
import { assert } from './testUtils'
import { transformMPBuiltInTag } from '../src/compiler/transforms/transformMPBuiltInTag'

const blankScript = `(_ctx, _cache) => {
  return {}
}`
describe('mp-alipay: transform component', () => {
  test(`built-in component`, () => {
    // 这里已经包含了自定义组件
    const code = customElements.map((tag) => `<${tag}/>`).join('')
    assert(code, code, blankScript)
  })
  test('match-media', () => {
    assert(
      `<match-media min-width="600" max-height="1000"/>`,
      `<match-media min-width="600" max-height="1000"/>`,
      blankScript
    )
  })
  test(`mini program component`, () => {
    const filename = 'pages/vant/vant'
    addMiniProgramPageJson(filename, {
      usingComponents: {
        'van-button': 'mycomponents/button/index',
      },
    })
    assert(
      `<van-button/>`,
      `<van-button u-t="m" u-i="dc555fe4-0" onVI="__l"/>`,
      blankScript,
      {
        filename,
      }
    )
  })

  test('alipay open component - webview', () => {
    assert(
      `<web-view
    src="https://https://uniapp.dcloud.io/"
    @message="onmessage"
  ></web-view>`,
      `<web-view src=\"https://https://uniapp.dcloud.io/\" onMessage=\"{{a}}\"></web-view>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.onmessage, "69") }
}`
    )
  })
  test('alipay open component - join-group-chat', () => {
    assert(
      `<join-group-chat template-id="your_template_id" />`,
      `<join-group-chat template-id="your_template_id"/>`,
      blankScript
    )
    assert(
      `<join-group-chat template-id="your_template_id"></join-group-chat>`,
      `<join-group-chat template-id="your_template_id"></join-group-chat>`,
      blankScript
    )
  })
  test('alipay open component - mpaas-component', () => {
    assert(
      `<mpaas-component class="c111" id="mpass" type="custom_map" latitude="120" longitude="130"/>`,
      `<mpaas-component class="c111" id="mpass" type="custom_map" latitude="120" longitude="130"/>`,
      blankScript
    )
    assert(
      `<mpaas-component class="c111" id="mpass" type="custom_map" latitude="120" longitude="130"></mpaas-component>`,
      `<mpaas-component class="c111" id="mpass" type="custom_map" latitude="120" longitude="130"></mpaas-component>`,
      blankScript
    )
  })
  test('alipay open component - root-portal', () => {
    assert(
      `<root-portal :enable="true"/>`,
      `<root-portal enable="{{true}}"/>`,
      blankScript
    )
  })
  test('alipay open component - share-element', () => {
    assert(
      `<share-element :duration="400" :transform="true" easing-function="ease-out"/>`,
      `<share-element duration="{{400}}" transform="{{true}}" easing-function="ease-out"/>`,
      blankScript
    )
  })
  test('alipay open component - subscribe-message', () => {
    // <subscribe-message template-id='xxxxx' onComplete="completeHandler" />
    assert(
      `<subscribe-message template-id='xxxxx' onComplete="completeHandler" />`,
      `<subscribe-message template-id="xxxxx" onComplete="completeHandler"/>`,
      blankScript
    )
    assert(
      `<subscribe-message template-id='xxxxx' @complete="completeHandler" />`,
      `<subscribe-message template-id="xxxxx" onComplete="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.completeHandler, "88") }
}`
    )
  })

  test('alipay open component - ad-feeds', () => {
    assert(
      `<ad-feeds space-code="ad_tiny_123" @renderSuccess="renderSuccess" />`,
      `<ad-feeds space-code="ad_tiny_123" onRenderSuccess="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.renderSuccess, "ee") }
}`
    )
  })

  test(`button chooseAvatar`, () => {
    assert(
      `<button open-type="chooseAvatar" @chooseavatar="onChooseAvatar" />`,
      `<button open-type="chooseAvatar" onChooseAvatar="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.onChooseAvatar, "3e") }
}`
    )
  })
})

describe('mp-alipay: transform component x', () => {
  test(`canvas`, () => {
    assert(
      `<canvas/>`,
      `<canvas style="{{'--status-bar-height:' + a}}" type="2d"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformMPBuiltInTag],
      }
    )

    assert(
      `<canvas type="2d"/>`,
      `<canvas type="2d" style="{{'--status-bar-height:' + a}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformMPBuiltInTag],
      }
    )

    assert(
      `<canvas type="webgl"/>`,
      `<canvas type="webgl" style="{{'--status-bar-height:' + a}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformMPBuiltInTag],
      }
    )
  })

  test(`checkbox`, () => {
    assert(
      `<checkbox fore-color="#FF0000"/>`,
      `<checkbox color="#FF0000" style="{{'--status-bar-height:' + a}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformMPBuiltInTag],
      }
    )

    assert(
      `<checkbox fore-color="#FF0000"/>`,
      `<checkbox color="#FF0000" style="{{'--status-bar-height:' + a}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformMPBuiltInTag],
      }
    )
  })

  test(`radio`, () => {
    assert(
      `<radio active-background-color="#FF0000"/>`,
      `<radio color="#FF0000" style="{{'--status-bar-height:' + a}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformMPBuiltInTag],
      }
    )

    assert(
      `<radio color="#FF0000"/>`,
      `<radio color="#FF0000" style="{{'--status-bar-height:' + a}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformMPBuiltInTag],
      }
    )
  })

  test(`switch`, () => {
    assert(
      `<switch active-background-color="#FF0000"/>`,
      `<switch color="#FF0000" style="{{'--status-bar-height:' + a}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformMPBuiltInTag],
      }
    )

    assert(
      `<switch color="#FF0000"/>`,
      `<switch color="#FF0000" style="{{'--status-bar-height:' + a}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformMPBuiltInTag],
      }
    )
  })

  test(`slider`, () => {
    assert(
      `<slider active-background-color="#FF0000" fore-color="#FF0000"/>`,
      `<slider active-color="#FF0000" handle-color="#FF0000" style="{{'--status-bar-height:' + a}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformMPBuiltInTag],
      }
    )
  })
})
