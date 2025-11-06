import { assert } from './testUtils'
import { customElements } from '../src/compiler/options'
import {
  transformDirection,
  transformMPBuiltInTag,
} from '@dcloudio/uni-cli-shared'

describe('mp-weixin: transform component', () => {
  beforeEach(() => {
    process.env.UNI_PLATFORM = 'mp-weixin'
  })

  test(`Components start with wx`, () => {
    assert(
      `<WxBtn/>`,
      `<weixin-btn u-i="2a9ec0b0-0" bind:__l="__l"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test(`component with v-show`, () => {
    assert(
      `<custom v-show="ok"/>`,
      `<custom data-c-h="{{!a}}" u-i="2a9ec0b0-0" bind:__l="__l"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.ok }
}`
    )
  })
  test(`built-in component`, () => {
    const code = customElements.map((tag) => `<${tag}/>`).join('')
    assert(
      code,
      code,
      `(_ctx, _cache) => {
  return {}
}`
    )

    assert(
      `<official-account-publish topic="test" background-color="#f7f7f7" :limit="3" placeholder="please input"/>`,
      `<official-account-publish topic="test" background-color="#f7f7f7" limit="{{3}}" placeholder="please input"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('lazy element: input', () => {
    assert(
      `<input/>`,
      `<input/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<input type="number"/>`,
      `<input type="number"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<input :type="type"/>`,
      `<block wx:if="{{r0}}"><input type="{{a}}"/></block>`,
      `(_ctx, _cache) => {
  return { a: _ctx.type }
}`
    )
  })
  test('lazy element: textarea', () => {
    assert(
      `<textarea></textarea>`,
      `<textarea></textarea>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<textarea @input="input"></textarea>`,
      `<block wx:if="{{r0}}"><textarea bindinput="{{a}}"></textarea></block>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.input, "6e") }
}`
    )
    assert(
      `<textarea v-model="text"></textarea>`,
      `<block wx:if="{{r0}}"><textarea value="{{a}}" bindinput="{{b}}"></textarea></block>`,
      `(_ctx, _cache) => {
  return { a: _ctx.text, b: _o($event => _ctx.text = $event.detail.value, "ec") }
}`
    )
    assert(
      `<textarea v-if="ok1" @input="input"/><textarea v-else-if="ok2"/><textarea v-else @input="input"/>`,
      `<textarea wx:if="{{a}}" bindinput="{{b}}"/><textarea wx:elif="{{c}}"/><block wx:else><textarea wx:if="{{r0}}" bindinput="{{d}}"/></block>`,
      `(_ctx, _cache) => {
  return _e({ a: _ctx.ok1 }, _ctx.ok1 ? { b: _o(_ctx.input, "74") } : _ctx.ok2 ? {} : { d: _o(_ctx.input, "bb") }, { c: _ctx.ok2 })
}`
    )
  })
  test('lazy element: editor', () => {
    assert(
      `<editor/>`,
      `<editor/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<editor @ready="ready"/>`,
      `<block wx:if="{{r0}}"><editor bindready="{{a}}"/></block>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.ready, "f8") }
}`
    )
    assert(
      `<editor v-if="ok1" @ready="ready"/><editor v-else-if="ok2"/><editor v-else/>`,
      `<editor wx:if="{{a}}" bindready="{{b}}"/><editor wx:elif="{{c}}"/><editor wx:else/>`,
      `(_ctx, _cache) => {
  return _e({ a: _ctx.ok1 }, _ctx.ok1 ? { b: _o(_ctx.ready, "f7") } : _ctx.ok2 ? {} : {}, { c: _ctx.ok2 })
}`
    )
    assert(
      `<editor v-if="ok1" @ready="ready"/><editor v-else-if="ok2"/><editor v-else @ready="ready"/>`,
      `<editor wx:if="{{a}}" bindready="{{b}}"/><editor wx:elif="{{c}}"/><block wx:else><editor wx:if="{{r0}}" bindready="{{d}}"/></block>`,
      `(_ctx, _cache) => {
  return _e({ a: _ctx.ok1 }, _ctx.ok1 ? { b: _o(_ctx.ready, "f7") } : _ctx.ok2 ? {} : { d: _o(_ctx.ready, "5d") }, { c: _ctx.ok2 })
}`
    )
  })
  test('lazy element: canvas', () => {
    assert(
      `<canvas/>`,
      `<canvas/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<canvas canvas-id="myCanvas" id="myCanvas"/>`,
      `<canvas canvas-id="myCanvas" id="myCanvas"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<canvas :id="id"/>`,
      `<block wx:if="{{r0}}"><canvas id="{{a}}"/></block>`,
      `(_ctx, _cache) => {
  return { a: _ctx.id }
}`
    )
    assert(
      `<canvas :canvas-id="id"/>`,
      `<block wx:if="{{r0}}"><canvas canvas-id="{{a}}"/></block>`,
      `(_ctx, _cache) => {
  return { a: _ctx.id }
}`
    )
    assert(
      `<canvas @touchstart="touchstart"/>`,
      `<block wx:if="{{r0}}"><canvas bindtouchstart="{{a}}"/></block>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.touchstart, "bf") }
}`
    )
    assert(
      `<canvas @touchmove="touchmove"/>`,
      `<block wx:if="{{r0}}"><canvas bindtouchmove="{{a}}"/></block>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.touchmove, "cf") }
}`
    )
    assert(
      `<canvas @touchcancel="touchcancel"/>`,
      `<block wx:if="{{r0}}"><canvas bindtouchcancel="{{a}}"/></block>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.touchcancel, "ec") }
}`
    )
    assert(
      `<canvas @touchend="touchend"/>`,
      `<block wx:if="{{r0}}"><canvas bindtouchend="{{a}}"/></block>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.touchend, "d9") }
}`
    )
    assert(
      `<canvas :canvas-id="id" :id="id"/>`,
      `<block wx:if="{{r0}}"><canvas canvas-id="{{a}}" id="{{b}}"/></block>`,
      `(_ctx, _cache) => {
  return { a: _ctx.id, b: _ctx.id }
}`
    )
    assert(
      `<canvas v-if="ok1" :canvas-id="id"/><canvas v-else-if="ok2"/><canvas v-else/>`,
      `<canvas wx:if="{{a}}" canvas-id="{{b}}"/><canvas wx:elif="{{c}}"/><canvas wx:else/>`,
      `(_ctx, _cache) => {
  return _e({ a: _ctx.ok1 }, _ctx.ok1 ? { b: _ctx.id } : _ctx.ok2 ? {} : {}, { c: _ctx.ok2 })
}`
    )
    assert(
      `<canvas v-if="ok1" :canvas-id="id"/><canvas v-else-if="ok2"/><canvas v-else :canvas-id="id"/>`,
      `<canvas wx:if="{{a}}" canvas-id="{{b}}"/><canvas wx:elif="{{c}}"/><block wx:else><canvas wx:if="{{r0}}" canvas-id="{{d}}"/></block>`,
      `(_ctx, _cache) => {
  return _e({ a: _ctx.ok1 }, _ctx.ok1 ? { b: _ctx.id } : _ctx.ok2 ? {} : { d: _ctx.id }, { c: _ctx.ok2 })
}`
    )
  })
  test('lazy element: movable-view', () => {
    assert(
      `<movable-area><movable-view direction="all">drag me</movable-view></movable-area>`,
      `<movable-area><movable-view direction="all">drag me</movable-view></movable-area>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<movable-area><movable-view :direction="direction">drag me</movable-view></movable-area>`,
      `<movable-area><block wx:if="{{r0}}"><movable-view direction="{{a}}">drag me</movable-view></block></movable-area>`,
      `(_ctx, _cache) => {
  return { a: _ctx.direction }
}`
    )
  })
  test('lazy element: scroll-view', () => {
    assert(
      `<scroll-view/>`,
      `<scroll-view/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<scroll-view @dragstart="d"/>`,
      `<block wx:if="{{r0}}"><scroll-view binddragstart="{{a}}"/></block>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.d, "c7") }
}`
    )
    assert(
      `<scroll-view @dragging="d"/>`,
      `<block wx:if="{{r0}}"><scroll-view binddragging="{{a}}"/></block>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.d, "a1") }
}`
    )
    assert(
      `<scroll-view @dragend="d"/>`,
      `<block wx:if="{{r0}}"><scroll-view binddragend="{{a}}"/></block>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.d, "0b") }
}`
    )
    assert(
      `<scroll-view @dragstart="d" @dragging="d" @dragend="d"/>`,
      `<block wx:if="{{r0}}"><scroll-view binddragstart="{{a}}" binddragging="{{b}}" binddragend="{{c}}"/></block>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.d, "c7"), b: _o(_ctx.d, "a9"), c: _o(_ctx.d, "ba") }
}`
    )
  })
  test(`skyline gesture`, () => {
    assert(
      `<vertical-drag-gesture-handler onGestureEvent="handlePan" native-view="scroll-view" shouldResponseOnMove="shouldResponse" shouldAcceptGesture="shouldAccept"/>`,
      `<vertical-drag-gesture-handler onGestureEvent="handlePan" native-view="scroll-view" shouldResponseOnMove="shouldResponse" shouldAcceptGesture="shouldAccept"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test(`skyline gesture`, () => {
    assert(
      `<span/>`,
      `<label/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })

  test('static ref with unicloud-db', () => {
    assert(
      `<unicloud-db ref="udb"/>`,
      `<unicloud-db class="r" u-r="udb" style="{{'--status-bar-height:' + c}}" u-i="2a9ec0b0-0" bind:__l="__l" id="r0-2a9ec0b0" change:eS="{{uV.sS}}" eS="{{$eS[b]}}" change:eA="{{uV.sA}}" eA="{{$eA[b]}}" u-p="{{d||''}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _sr('udb', '2a9ec0b0-0'), b: _sei('r0-2a9ec0b0', { "name": "unicloud-db", "type": 1 }, 'udb'), c: \`\${_ctx.u_s_b_h}px\`, d: _p({ id: 'r0-2a9ec0b0' }) }
  return __returned__
}`,
      {
        isX: true,
      }
    )
  })

  test('input 不填写闭合标签，会自动处理', () => {
    assert(
      `<input>`,
      `<input></input>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })

  test('uniad plugin', () => {
    assert(
      `<uniad-plugin adpid="123" unit-id="456"/>`,
      `<uniad-plugin wx:if="{{r0}}" adpid="123" unit-id="456" u-t="m" u-i="2a9ec0b0-0" bind:__l="__l"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<uniad-plugin-wx adpid="123" unit-id="456"/>`,
      `<uniad-plugin-wx wx:if="{{r0}}" adpid="123" unit-id="456" u-t="m" u-i="2a9ec0b0-0" bind:__l="__l"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })

  // 暂不上线，先注释掉
  //   test('input > keyboard-accessory', () => {
  //     assert(
  //       `<input><keyboard-accessory/></input>`,
  //       `<input><keyboard-accessory/></input>`,
  //       `(_ctx, _cache) => {
  //   return {}
  // }`
  //     )
  //   })
})

describe('mp-weixin: transform component x', () => {
  test(`rich-text`, () => {
    assert(
      `<rich-text selectable/>`,
      `<rich-text user-select style="{{'--status-bar-height:' + a}}"/>`,
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
      `<rich-text :selectable="false"/>`,
      `<rich-text user-select="{{false}}" style="{{'--status-bar-height:' + a}}"/>`,
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
      `<slider background-color="#FF0000" active-background-color="#FF0000" fore-color="#FF0000"/>`,
      `<slider backgroundColor="#FF0000" activeColor="#FF0000" block-color="#FF0000" style="{{'--status-bar-height:' + a}}"/>`,
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

  test('list-view', () => {
    assert(
      `<list-view/>`,
      `<scroll-view style="{{'--status-bar-height:' + a}}" enable-flex="true" enhanced="true" scroll-y="true"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\` }
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
      `<list-view direction="horizontal"/>`,
      `<scroll-view style="{{'--status-bar-height:' + a}}" enable-flex="true" enhanced="true" scroll-x="true"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformMPBuiltInTag, transformDirection],
      }
    )
  })

  test('list-view direction vertical', () => {
    assert(
      `<list-view direction="vertical"/>`,
      `<scroll-view style="{{'--status-bar-height:' + a}}" enable-flex="true" enhanced="true" scroll-y="true"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformMPBuiltInTag, transformDirection],
      }
    )
  })

  test('list-view direction all', () => {
    assert(
      `<list-view direction="all"/>`,
      `<scroll-view style="{{'--status-bar-height:' + a}}" enable-flex="true" enhanced="true" scroll-x="true" scroll-y="true"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformMPBuiltInTag, transformDirection],
      }
    )
  })

  test('list-view dynamic direction', () => {
    assert(
      `<list-view :direction="dir"/>`,
      `<scroll-view style="{{'--status-bar-height:' + a}}" enable-flex="true" enhanced="true" scroll-x="{{b}}" scroll-y="{{c}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: _ctx.dir === 'horizontal' || _ctx.dir === 'all', c: !_ctx.dir || _ctx.dir === 'vertical' || _ctx.dir === 'all' }
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformMPBuiltInTag, transformDirection],
      }
    )
  })

  test('scroll-view', () => {
    assert(
      `<scroll-view/>`,
      `<scroll-view style="{{'--status-bar-height:' + a}}" enable-flex="true" enhanced="true" scroll-y="true"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\` }
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
      `<scroll-view direction="horizontal"/>`,
      `<scroll-view style="{{'--status-bar-height:' + a}}" enable-flex="true" enhanced="true" scroll-x="true"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformMPBuiltInTag, transformDirection],
      }
    )
  })

  test('scroll-view direction vertical', () => {
    assert(
      `<scroll-view direction="vertical"/>`,
      `<scroll-view style="{{'--status-bar-height:' + a}}" enable-flex="true" enhanced="true" scroll-y="true"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformMPBuiltInTag, transformDirection],
      }
    )
  })

  test('scroll-view direction all', () => {
    assert(
      `<scroll-view direction="all"/>`,
      `<scroll-view style="{{'--status-bar-height:' + a}}" enable-flex="true" enhanced="true" scroll-x="true" scroll-y="true"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\` }
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
      `<scroll-view :direction="dir"/>`,
      `<scroll-view style="{{'--status-bar-height:' + a}}" enable-flex="true" enhanced="true" scroll-x="{{b}}" scroll-y="{{c}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: _ctx.dir === 'horizontal' || _ctx.dir === 'all', c: !_ctx.dir || _ctx.dir === 'vertical' || _ctx.dir === 'all' }
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformMPBuiltInTag, transformDirection],
      }
    )
  })

  test('scroll-view with existing scroll-x should not transform direction', () => {
    assert(
      `<scroll-view scroll-x="true" direction="horizontal"/>`,
      `<scroll-view scroll-x="true" direction="horizontal" style="{{'--status-bar-height:' + a}}" enable-flex="true" enhanced="true"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformMPBuiltInTag, transformDirection],
      }
    )
  })

  test('scroll-view with existing scroll-y should not transform direction', () => {
    assert(
      `<scroll-view scroll-y="true" direction="vertical"/>`,
      `<scroll-view scroll-y="true" direction="vertical" style="{{'--status-bar-height:' + a}}" enable-flex="true" enhanced="true"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      {
        isX: true,
        nodeTransforms: [transformMPBuiltInTag, transformDirection],
      }
    )
  })
})
