import { transformRef } from '@dcloudio/uni-cli-shared'
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
      `<custom class="r" data-r="custom" u-i="2a9ec0b0-0"/>`,
      `(_ctx, _cache) => {
  return {}
}`,
      {
        nodeTransforms,
      }
    )
    assert(
      `<custom v-for="item in items" ref="custom"/>`,
      `<custom wx:for="{{a}}" wx:for-item="item" class="r-i-f" data-r="custom" u-i="{{item.a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: '2a9ec0b0-0' + '-' + i0 }; }) }
}`,
      {
        nodeTransforms,
      }
    )
  })
  test('dynamic ref', () => {
    assert(
      `<custom :ref="custom"/>`,
      `<custom class="r" data-r="{{a}}" u-i="2a9ec0b0-0"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.custom }
}`,
      {
        nodeTransforms,
      }
    )
    assert(
      `<custom v-for="item in items" :ref="custom"/>`,
      `<custom wx:for="{{a}}" wx:for-item="item" class="r-i-f" data-r="{{b}}" u-i="{{item.a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: '2a9ec0b0-0' + '-' + i0 }; }), b: _ctx.custom }
}`,
      {
        nodeTransforms,
      }
    )
  })
})
