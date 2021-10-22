import { assert } from './testUtils'

describe('compiler: codegen', () => {
  test('module mode preamble', () => {
    assert(
      `<view v-for="item in items" @click="onClick"></view>`,
      `<view wx:for="{{a}}" wx:for-item="item" bindtap="{{b}}"></view>`,
      `import { vOn as _vOn, vFor as _vFor } from "vue"

export function render(_ctx, _cache) {
  return { a: _vFor(_ctx.items, (item, k0, i0) => { return {}; }), b: _vOn(_ctx.onClick) }
}`,
      { inline: false, mode: 'module', prefixIdentifiers: false }
    )
  })

  test('module mode preamble w/ optimizeImports: true', () => {
    assert(
      `<view v-for="item in items" @click="onClick"></view>`,
      `<view wx:for="{{a}}" wx:for-item="item" bindtap="{{b}}"></view>`,
      `import { vOn as _vOn, vFor as _vFor } from "vue"

export function render(_ctx, _cache) {
  return { a: _vFor(_ctx.items, (item, k0, i0) => { return {}; }), b: _vOn(_ctx.onClick) }
}`,
      { inline: false, mode: 'module' }
    )
  })

  test('function mode preamble', () => {
    assert(
      `<view v-for="item in items" @click="onClick"></view>`,
      `<view wx:for="{{a}}" wx:for-item="item" bindtap="{{b}}"></view>`,
      `const _Vue = Vue

return function render(_ctx, _cache) {
  with (_ctx) {
    const { vOn: _vOn, vFor: _vFor } = _Vue

    return { a: _vFor(items, (item, k0, i0) => { return {}; }), b: _vOn(onClick) }
  }
}`,
      { inline: false, mode: 'function', prefixIdentifiers: false }
    )
  })
  test('function mode preamble w/ prefixIdentifiers: true', () => {
    assert(
      `<view v-for="item in items" @click="onClick"></view>`,
      `<view wx:for="{{a}}" wx:for-item="item" bindtap="{{b}}"></view>`,
      `const { vOn: _vOn, vFor: _vFor } = Vue

return function render(_ctx, _cache) {
  return { a: _vFor(_ctx.items, (item, k0, i0) => { return {}; }), b: _vOn(_ctx.onClick) }
}`,
      { inline: false, mode: 'function' }
    )
  })
  test('static text', () => {
    assert(
      `hello`,
      `hello`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('interpolation', () => {
    assert(
      `{{hello}}`,
      `{{a}}`,
      `(_ctx, _cache) => {
  return { a: _toDisplayString(_ctx.hello) }
}`
    )
  })
  test('comment', () => {
    assert(
      `<!--foo-->`,
      ``,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('compound expression', () => {
    assert(
      `{{foo}}{{bar}}nested`,
      `{{a}}{{b}}nested`,
      `(_ctx, _cache) => {
  return { a: _toDisplayString(_ctx.foo), b: _toDisplayString(_ctx.bar) }
}`
    )
  })
})
