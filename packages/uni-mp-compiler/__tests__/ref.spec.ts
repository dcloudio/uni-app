import { transformRef } from '@dcloudio/uni-cli-shared'
import { BindingTypes } from '@vue/compiler-core'
import { assert } from './testUtils'

const nodeTransforms = [transformRef]
describe('compiler: transform ref', () => {
  test('without ref', () => {
    assert(
      `<custom/>`,
      `<custom u-i="2a9ec0b0-0"/>`,
      `(_ctx, _cache) => {
  return {}
}`,
      {
        nodeTransforms,
      }
    )
    assert(
      `<custom/><custom/><custom1/>`,
      `<custom u-i="2a9ec0b0-0"/><custom u-i="2a9ec0b0-1"/><custom1 u-i="2a9ec0b0-2"/>`,
      `(_ctx, _cache) => {
  return {}
}`,
      {
        nodeTransforms,
      }
    )
  })
  test('static ref', () => {
    assert(
      `<custom ref="custom"/>`,
      `<custom class="r" u-r="custom" u-i="2a9ec0b0-0"/>`,
      `import { resolveComponent as _resolveComponent, sr as _sr } from "vue"
const __BINDING_COMPONENTS__ = '{"custom":{"name":"_component_custom","type":"unknown"}}'
if (!Array) {const _component_custom = _resolveComponent("custom");(_component_custom)()}

export function render(_ctx, _cache) {
  return { a: _sr('custom', '2a9ec0b0-0') }
}`,
      {
        inline: false,
        nodeTransforms,
      }
    )
    assert(
      `<custom v-for="item in items" ref="custom"/>`,
      `<custom wx:for="{{a}}" wx:for-item="item" class="r-i-f" u-r="custom" u-i="{{item.b}}"/>`,
      `import { resolveComponent as _resolveComponent, sr as _sr, f as _f } from "vue"
const __BINDING_COMPONENTS__ = '{"custom":{"name":"_component_custom","type":"unknown"}}'
if (!Array) {const _component_custom = _resolveComponent("custom");(_component_custom)()}

export function render(_ctx, _cache) {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: _sr('custom', '2a9ec0b0-0' + '-' + i0, { "f": 1 }), b: '2a9ec0b0-0' + '-' + i0 }; }) }
}`,
      {
        inline: false,
        nodeTransforms,
      }
    )
  })
  test('static ref with inline', () => {
    assert(
      `<custom ref="custom"/>`,
      `<custom class="r" u-r="custom" u-i="2a9ec0b0-0"/>`,
      `(_ctx, _cache) => {
  return { a: _sr('custom', '2a9ec0b0-0') }
}`,
      {
        nodeTransforms,
      }
    )
    assert(
      `<custom v-for="item in items" ref="custom"/>`,
      `<custom wx:for="{{a}}" wx:for-item="item" class="r-i-f" u-r="custom" u-i="{{item.b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: _sr('custom', '2a9ec0b0-0' + '-' + i0, { "f": 1 }), b: '2a9ec0b0-0' + '-' + i0 }; }) }
}`,
      {
        nodeTransforms,
      }
    )
  })
  test('static ref with inline and setup-ref', () => {
    assert(
      `<custom ref="custom"/>`,
      `<custom class="r" u-r="custom" u-i="2a9ec0b0-0"/>`,
      `(_ctx, _cache) => {
  return { a: _sr(custom, '2a9ec0b0-0', { "k": "custom" }) }
}`,
      {
        bindingMetadata: {
          custom: BindingTypes.SETUP_REF,
        },
        nodeTransforms,
      }
    )
  })
  test('static ref with inline and setup-maybe-ref', () => {
    assert(
      `<custom ref="custom"/>`,
      `<custom class="r" u-r="custom" u-i="2a9ec0b0-0"/>`,
      `(_ctx, _cache) => {
  return { a: _sr(custom, '2a9ec0b0-0', { "k": "custom" }) }
}`,
      {
        bindingMetadata: {
          custom: BindingTypes.SETUP_MAYBE_REF,
        },
        nodeTransforms,
      }
    )
  })
  test('static ref with inline and setup-let', () => {
    assert(
      `<custom ref="custom"/>`,
      `<custom class="r" u-r="custom" u-i="2a9ec0b0-0"/>`,
      `(_ctx, _cache) => {
  return { a: _sr(custom, '2a9ec0b0-0', { "k": "custom" }) }
}`,
      {
        bindingMetadata: {
          custom: BindingTypes.SETUP_LET,
        },
        nodeTransforms,
      }
    )
  })
  test('dynamic ref', () => {
    assert(
      `<custom :ref="custom"/>`,
      `<custom class="r" u-r="{{b}}" u-i="2a9ec0b0-0"/>`,
      `import { resolveComponent as _resolveComponent, sr as _sr } from "vue"
const __BINDING_COMPONENTS__ = '{"custom":{"name":"_component_custom","type":"unknown"}}'
if (!Array) {const _component_custom = _resolveComponent("custom");(_component_custom)()}

export function render(_ctx, _cache) {
  return { a: _sr(_ctx.custom, '2a9ec0b0-0'), b: _ctx.custom }
}`,
      {
        inline: false,
        nodeTransforms,
      }
    )
    assert(
      `<custom v-for="item in items" :ref="custom"/>`,
      `<custom wx:for="{{a}}" wx:for-item="item" class="r-i-f" u-r="{{b}}" u-i="{{item.b}}"/>`,
      `import { resolveComponent as _resolveComponent, sr as _sr, f as _f } from "vue"
const __BINDING_COMPONENTS__ = '{"custom":{"name":"_component_custom","type":"unknown"}}'
if (!Array) {const _component_custom = _resolveComponent("custom");(_component_custom)()}

export function render(_ctx, _cache) {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: _sr(_ctx.custom, '2a9ec0b0-0' + '-' + i0, { "f": 1 }), b: '2a9ec0b0-0' + '-' + i0 }; }), b: _ctx.custom }
}`,
      {
        inline: false,
        nodeTransforms,
      }
    )
  })
  test('dynamic ref with inline', () => {
    assert(
      `<custom :ref="custom"/>`,
      `<custom class="r" u-r="{{b}}" u-i="2a9ec0b0-0"/>`,
      `(_ctx, _cache) => {
  return { a: _sr(_ctx.custom, '2a9ec0b0-0'), b: _ctx.custom }
}`,
      {
        nodeTransforms,
      }
    )
    assert(
      `<custom v-for="item in items" :ref="custom"/>`,
      `<custom wx:for="{{a}}" wx:for-item="item" class="r-i-f" u-r="{{b}}" u-i="{{item.b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: _sr(_ctx.custom, '2a9ec0b0-0' + '-' + i0, { "f": 1 }), b: '2a9ec0b0-0' + '-' + i0 }; }), b: _ctx.custom }
}`,
      {
        nodeTransforms,
      }
    )
  })
})
