import { assert } from './testUtils'
import { customElements } from '../src/compiler/options'
describe('mp-weixin: transform component', () => {
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
  return { a: _o(_ctx.input) }
}`
    )
    assert(
      `<textarea v-model="text"></textarea>`,
      `<block wx:if="{{r0}}"><textarea value="{{a}}" bindinput="{{b}}"></textarea></block>`,
      `(_ctx, _cache) => {
  return { a: _ctx.text, b: _o($event => _ctx.text = $event.detail.value) }
}`
    )
    assert(
      `<textarea v-if="ok1" @input="input"/><textarea v-else-if="ok2"/><textarea v-else @input="input"/>`,
      `<textarea wx:if="{{a}}" bindinput="{{b}}"/><textarea wx:elif="{{c}}"/><block wx:else><textarea wx:if="{{r0}}" bindinput="{{d}}"/></block>`,
      `(_ctx, _cache) => {
  return _e({ a: _ctx.ok1 }, _ctx.ok1 ? { b: _o(_ctx.input) } : _ctx.ok2 ? {} : { d: _o(_ctx.input) }, { c: _ctx.ok2 })
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
  return { a: _o(_ctx.ready) }
}`
    )
    assert(
      `<editor v-if="ok1" @ready="ready"/><editor v-else-if="ok2"/><editor v-else/>`,
      `<editor wx:if="{{a}}" bindready="{{b}}"/><editor wx:elif="{{c}}"/><editor wx:else/>`,
      `(_ctx, _cache) => {
  return _e({ a: _ctx.ok1 }, _ctx.ok1 ? { b: _o(_ctx.ready) } : _ctx.ok2 ? {} : {}, { c: _ctx.ok2 })
}`
    )
    assert(
      `<editor v-if="ok1" @ready="ready"/><editor v-else-if="ok2"/><editor v-else @ready="ready"/>`,
      `<editor wx:if="{{a}}" bindready="{{b}}"/><editor wx:elif="{{c}}"/><block wx:else><editor wx:if="{{r0}}" bindready="{{d}}"/></block>`,
      `(_ctx, _cache) => {
  return _e({ a: _ctx.ok1 }, _ctx.ok1 ? { b: _o(_ctx.ready) } : _ctx.ok2 ? {} : { d: _o(_ctx.ready) }, { c: _ctx.ok2 })
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
  return { a: _o(_ctx.touchstart) }
}`
    )
    assert(
      `<canvas @touchmove="touchmove"/>`,
      `<block wx:if="{{r0}}"><canvas bindtouchmove="{{a}}"/></block>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.touchmove) }
}`
    )
    assert(
      `<canvas @touchcancel="touchcancel"/>`,
      `<block wx:if="{{r0}}"><canvas bindtouchcancel="{{a}}"/></block>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.touchcancel) }
}`
    )
    assert(
      `<canvas @touchend="touchend"/>`,
      `<block wx:if="{{r0}}"><canvas bindtouchend="{{a}}"/></block>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.touchend) }
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
  return { a: _o(_ctx.d) }
}`
    )
    assert(
      `<scroll-view @dragging="d"/>`,
      `<block wx:if="{{r0}}"><scroll-view binddragging="{{a}}"/></block>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.d) }
}`
    )
    assert(
      `<scroll-view @dragend="d"/>`,
      `<block wx:if="{{r0}}"><scroll-view binddragend="{{a}}"/></block>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.d) }
}`
    )
    assert(
      `<scroll-view @dragstart="d" @dragging="d" @dragend="d"/>`,
      `<block wx:if="{{r0}}"><scroll-view binddragstart="{{a}}" binddragging="{{b}}" binddragend="{{c}}"/></block>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.d), b: _o(_ctx.d), c: _o(_ctx.d) }
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
      `<unicloud-db class="r" u-r="udb" u-i="2a9ec0b0-0" bind:__l="__l" id="r0-2a9ec0b0" change:eS="{{uV.sS}}" eS="{{$eS[b]}}" u-p="{{c||''}}"/>`,
      `(_ctx, _cache) => {
  const __returned__ = { a: _sr('udb', '2a9ec0b0-0'), b: _sei('r0-2a9ec0b0', { "name": "unicloud-db", "type": 1 }, 'udb'), c: _p({ id: 'r0-2a9ec0b0' }) }
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
