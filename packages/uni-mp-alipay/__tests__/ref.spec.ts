import { BindingTypes } from '@vue/compiler-core'
import { assert } from './testUtils'

describe('mp-alipay: transform ref', () => {
  test('without ref', () => {
    assert(
      `<custom/>`,
      `<custom u-i="2a9ec0b0-0" onVI="__l"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<custom/><custom/><custom1/>`,
      `<custom u-i="2a9ec0b0-0" onVI="__l"/><custom u-i="2a9ec0b0-1" onVI="__l"/><custom1 u-i="2a9ec0b0-2" onVI="__l"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })

  test('static ref', () => {
    assert(
      `<custom ref="custom"/>`,
      `<custom ref="__r" u-r="custom" u-i="2a9ec0b0-0" onVI="__l"/>`,
      `import { resolveComponent as _resolveComponent } from "vue"
const __BINDING_COMPONENTS__ = '{"custom":{"name":"_component_custom","type":"unknown"}}'
if (!Array) {const _component_custom = _resolveComponent("custom");(_component_custom)()}

export function render(_ctx, _cache) {
  return {}
}`,
      {
        inline: false,
      }
    )
    assert(
      `<custom v-for="item in items" ref="custom"/>`,
      `<custom a:for="{{a}}" a:for-item="item" ref="__r" u-r-i-f="custom" u-i="{{item.a}}" onVI="__l"/>`,
      `import { resolveComponent as _resolveComponent, f as _f } from "vue"
const __BINDING_COMPONENTS__ = '{"custom":{"name":"_component_custom","type":"unknown"}}'
if (!Array) {const _component_custom = _resolveComponent("custom");(_component_custom)()}

export function render(_ctx, _cache) {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: '2a9ec0b0-0' + '-' + i0 }; }) }
}`,
      {
        inline: false,
      }
    )
  })
  test('static ref with inline', () => {
    assert(
      `<custom ref="custom"/>`,
      `<custom ref="__r" u-r="{{a}}" u-i="2a9ec0b0-0" onVI="__l"/>`,
      `(_ctx, _cache) => {
  return { a: () => ({ r: custom }) }
}`
    )
    assert(
      `<custom v-for="item in items" ref="custom"/>`,
      `<custom a:for="{{a}}" a:for-item="item" ref="__r" u-r-i-f="{{b}}" u-i="{{item.a}}" onVI="__l"/>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: '2a9ec0b0-0' + '-' + i0 }; }), b: () => ({ r: custom, f: 1 }) }
}`
    )
  })
  test('static ref with inline and setup-ref', () => {
    assert(
      `<custom ref="custom"/>`,
      `<custom ref="__r" u-r="{{a}}" u-i="2a9ec0b0-0" onVI="__l"/>`,
      `(_ctx, _cache) => {
  return { a: () => ({ r: custom, k: 'custom' }) }
}`,
      {
        bindingMetadata: {
          custom: BindingTypes.SETUP_REF,
        },
      }
    )
  })
  test('static ref with inline and setup-maybe-ref', () => {
    assert(
      `<custom ref="custom"/>`,
      `<custom ref="__r" u-r="{{a}}" u-i="2a9ec0b0-0" onVI="__l"/>`,
      `(_ctx, _cache) => {
  return { a: () => ({ r: custom, k: 'custom' }) }
}`,
      {
        bindingMetadata: {
          custom: BindingTypes.SETUP_MAYBE_REF,
        },
      }
    )
  })
  test('static ref with inline and setup-let', () => {
    assert(
      `<custom ref="custom"/>`,
      `<custom ref="__r" u-r="{{a}}" u-i="2a9ec0b0-0" onVI="__l"/>`,
      `(_ctx, _cache) => {
  return { a: () => ({ r: custom, k: 'custom' }) }
}`,
      {
        bindingMetadata: {
          custom: BindingTypes.SETUP_LET,
        },
      }
    )
  })
  test('dynamic ref', () => {
    assert(
      `<custom :ref="custom"/>`,
      `<custom ref="__r" u-r="{{a}}" u-i="2a9ec0b0-0" onVI="__l"/>`,
      `import { resolveComponent as _resolveComponent } from "vue"
const __BINDING_COMPONENTS__ = '{"custom":{"name":"_component_custom","type":"unknown"}}'
if (!Array) {const _component_custom = _resolveComponent("custom");(_component_custom)()}

export function render(_ctx, _cache) {
  return { a: _ctx.custom }
}`,
      {
        inline: false,
      }
    )
    assert(
      `<custom v-for="item in items" :ref="custom"/>`,
      `<custom a:for="{{a}}" a:for-item="item" ref="__r" u-r-i-f="{{b}}" u-i="{{item.a}}" onVI="__l"/>`,
      `import { resolveComponent as _resolveComponent, f as _f } from "vue"
const __BINDING_COMPONENTS__ = '{"custom":{"name":"_component_custom","type":"unknown"}}'
if (!Array) {const _component_custom = _resolveComponent("custom");(_component_custom)()}

export function render(_ctx, _cache) {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: '2a9ec0b0-0' + '-' + i0 }; }), b: _ctx.custom }
}`,
      {
        inline: false,
      }
    )
  })
})
