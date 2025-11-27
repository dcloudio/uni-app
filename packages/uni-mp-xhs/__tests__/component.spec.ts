import { assert } from './testUtils'
import { transformMPBuiltInTag } from '../src/compiler/transforms/transformMPBuiltInTag'

describe('mp-xhs: transform component', () => {
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
      `<block xhs:if="{{r0}}"><textarea bindinput="{{a}}"></textarea></block>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.input, "6e") }
}`
    )
    assert(
      `<textarea v-model="text"></textarea>`,
      `<block xhs:if="{{r0}}"><textarea value="{{a}}" bindinput="{{b}}"></textarea></block>`,
      `(_ctx, _cache) => {
  return { a: _ctx.text, b: _o($event => _ctx.text = $event.detail.value, "ec") }
}`
    )
    assert(
      `<textarea v-if="ok1" @input="input"/><textarea v-else-if="ok2"/><textarea v-else @input="input"/>`,
      `<textarea xhs:if="{{a}}" bindinput="{{b}}"/><textarea xhs:elif="{{c}}"/><block xhs:else><textarea xhs:if="{{r0}}" bindinput="{{d}}"/></block>`,
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
      `<block xhs:if="{{r0}}"><editor bindready="{{a}}"/></block>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.ready, "f8") }
}`
    )
    assert(
      `<editor v-if="ok1" @ready="ready"/><editor v-else-if="ok2"/><editor v-else/>`,
      `<editor xhs:if="{{a}}" bindready="{{b}}"/><editor xhs:elif="{{c}}"/><editor xhs:else/>`,
      `(_ctx, _cache) => {
  return _e({ a: _ctx.ok1 }, _ctx.ok1 ? { b: _o(_ctx.ready, "f7") } : _ctx.ok2 ? {} : {}, { c: _ctx.ok2 })
}`
    )
    assert(
      `<editor v-if="ok1" @ready="ready"/><editor v-else-if="ok2"/><editor v-else @ready="ready"/>`,
      `<editor xhs:if="{{a}}" bindready="{{b}}"/><editor xhs:elif="{{c}}"/><block xhs:else><editor xhs:if="{{r0}}" bindready="{{d}}"/></block>`,
      `(_ctx, _cache) => {
  return _e({ a: _ctx.ok1 }, _ctx.ok1 ? { b: _o(_ctx.ready, "f7") } : _ctx.ok2 ? {} : { d: _o(_ctx.ready, "5d") }, { c: _ctx.ok2 })
}`
    )
  })

  test('custom elements', () => {
    assert(
      `<video-player album-id="674548b2c1f9020001e9f9d1" episode-id="674548b2c1f9020001e9f9d2" :duration="3000" :show-mute-btn="true" @play="handlePlayVideo"></video-player>`,
      `<video-player album-id="674548b2c1f9020001e9f9d1" episode-id="674548b2c1f9020001e9f9d2" duration="{{3000}}" show-mute-btn="{{true}}" bindplay="{{a}}"></video-player>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.handlePlayVideo, "d4") }
}`
    )
    assert(
      `<post-note-button title="test title" content="test content" poi-id="3232" @error="handleError"></post-note-button>`,
      `<post-note-button title="test title" content="test content" poi-id="3232" binderror="{{a}}"></post-note-button>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.handleError, "f6") }
}`
    )
    assert(
      `<group-chat-card group-ids="sy3YiB1GGlXLTP9KLCLwFtmxWtY3Hno1yfVzYksmLiQ=,aHO9gDeRM3NhfV7+jGDO1Sh1VHPL2OIJDTQ1dQkljbk=" @error="handleError"></group-chat-card>`,
      `<group-chat-card group-ids="sy3YiB1GGlXLTP9KLCLwFtmxWtY3Hno1yfVzYksmLiQ=,aHO9gDeRM3NhfV7+jGDO1Sh1VHPL2OIJDTQ1dQkljbk=" binderror="{{a}}"></group-chat-card>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.handleError, "c8") }
}`
    )
  })
})

describe('mp-xhs: transform component x', () => {
  test('checkbox prop rename', () => {
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
      `<checkbox fore-color="#FF0000" checked/>`,
      `<checkbox color="#FF0000" checked style="{{'--status-bar-height:' + a}}"/>`,
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

  test('radio prop rename', () => {
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

  test('slider prop rename', () => {
    assert(
      `<slider active-background-color="#FF0000" fore-color="#00FF00"/>`,
      `<slider active-color="#FF0000" block-color="#00FF00" style="{{'--status-bar-height:' + a}}"/>`,
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
      `<slider active-background-color="#FF0000"/>`,
      `<slider active-color="#FF0000" style="{{'--status-bar-height:' + a}}"/>`,
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
      `<slider fore-color="#00FF00"/>`,
      `<slider block-color="#00FF00" style="{{'--status-bar-height:' + a}}"/>`,
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

  test('switch prop rename', () => {
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

  test('tag rename: list-view to scroll-view', () => {
    assert(
      `<list-view/>`,
      `<scroll-view style="{{'--status-bar-height:' + a}}"/>`,
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
      `<list-view scroll-y="true"/>`,
      `<scroll-view scroll-y="true" style="{{'--status-bar-height:' + a}}"/>`,
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
