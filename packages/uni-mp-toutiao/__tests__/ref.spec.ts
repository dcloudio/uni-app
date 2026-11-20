import { BindingTypes } from '@vue/compiler-core'
import { assert } from './testUtils'
import { transformRef } from '../src/compiler/transforms/transformRef'

describe('mp-toutiao x: transform ref', () => {
  const options = {
    nodeTransforms: [transformRef],
  }

  test('uses component.ref while preserving the ref payload', () => {
    assert(
      `<custom ref="custom"/>`,
      `<custom tt:ref="__r" u-r="{{a}}" u-i="2a9ec0b0-0"/>`,
      `(_ctx, _cache) => {
  return { a: () => ({ r: 'custom' }) }
}`,
      options
    )
  })

  test('keeps ref-in-for metadata', () => {
    assert(
      `<custom v-for="item in items" ref="custom"/>`,
      `<custom tt:for="{{a}}" tt:for-item="item" tt:ref="__r" u-r-i-f="{{b}}" u-i="{{item.a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: '2a9ec0b0-0' + '-' + i0 }; }), b: () => ({ r: 'custom', f: 1 }) }
}`,
      options
    )
  })

  test('keeps dynamic refs on the callback path', () => {
    assert(
      `<custom :ref="custom"/>`,
      `<custom tt:ref="__r" u-r="{{a}}" u-i="2a9ec0b0-0"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.custom }
}`,
      options
    )
  })

  test('keeps setup ref metadata', () => {
    assert(
      `<custom ref="custom"/>`,
      `<custom tt:ref="__r" u-r="{{a}}" u-i="2a9ec0b0-0"/>`,
      `(_ctx, _cache) => {
  return { a: () => ({ r: custom, k: 'custom' }) }
}`,
      {
        ...options,
        bindingMetadata: {
          custom: BindingTypes.SETUP_REF,
        },
      }
    )
  })
})

describe('mp-toutiao: transform ref compatibility', () => {
  test('keeps the selector-based transform for regular uni-app', () => {
    assert(
      `<custom ref="custom"/>`,
      `<custom class="r" u-r="custom" u-i="2a9ec0b0-0" bind:__l="__l"/>`,
      `(_ctx, _cache) => {
  return { a: _sr('custom', '2a9ec0b0-0') }
}`
    )
  })
})
