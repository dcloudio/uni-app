import { extend } from '@vue/shared'
import { assert, miniProgram } from './testUtils'

const options = {
  isX: true,
  miniProgram: {
    ...miniProgram,
    component: extend({}, miniProgram.component, {
      getPropertySync: false,
      fragment: true,
      fragmentEvents: ['tap', 'longpress'],
    }),
  },
}
const disabledOptions = {
  ...options,
  miniProgram: {
    ...options.miniProgram,
    component: extend({}, options.miniProgram.component, {
      fragment: false,
    }),
  },
}

describe('fragment component events', () => {
  test('keeps the original output when Fragment is disabled', () => {
    assert(
      `<custom @tap="onTap"/>`,
      `<custom bindtap="{{a}}" u-i="2a9ec0b0-0"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _o(_ctx.onTap, "b5") }
  return __returned__
}`,
      disabledOptions
    )
  })

  test('forwards native and Vue events through u-p', () => {
    assert(
      `<custom @tap="onTap" @custom="onCustom"/>`,
      `<view style="display: contents" bindtap="{{a}}"><custom wx:if="{{c}}" u-i="2a9ec0b0-0" u-p="{{c}}"/></view>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _o(_ctx.onTap, "b5"), b: _o(_ctx.onCustom, "5f"), c: _p({ onTap: a, onCustom: b }) }
  return __returned__
}`,
      options
    )
  })

  test('does not add wrapper for Vue custom events only', () => {
    assert(
      `<custom @custom="onCustom"/>`,
      `<custom wx:if="{{b}}" u-i="2a9ec0b0-0" u-p="{{b}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _o(_ctx.onCustom, "44"), b: _p({ onCustom: a }) }
  return __returned__
}`,
      options
    )
  })

  test('moves structure and slot attributes to wrapper', () => {
    assert(
      `<custom v-if="ok" v-for="item in list" :key="item.id" slot="foo" @tap="onTap"/>`,
      `<block wx:if="{{a}}"><view wx:for="{{b}}" wx:for-item="item" wx:key="a" slot="foo" style="display: contents" bindtap="{{c}}"><custom wx:if="{{d}}" u-i="{{item.b}}" u-p="{{d}}"/></view></block>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = _e({ a: _ctx.ok }, _ctx.ok ? { b: _f(_ctx.list, (item, k0, i0) => { return { a: item.id, b: '2a9ec0b0-0' + '-' + i0 }; }), c: _o(_ctx.onTap, "7e"), d: _p({ onTap: c }) } : {})
  return __returned__
}`,
      options
    )
  })

  test('keeps key on the component when it is not used by v-for', () => {
    assert(
      `<custom :key="id" @tap="onTap"/>`,
      `<view style="display: contents" bindtap="{{a}}"><custom wx:if="{{c}}" key="{{b}}" u-i="2a9ec0b0-0" u-p="{{c}}"/></view>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _o(_ctx.onTap, "55"), b: _ctx.id, c: _p({ onTap: a }) }
  return __returned__
}`,
      options
    )
  })

  test('treats click as the tap native event alias', () => {
    assert(
      `<custom @click="onClick"/>`,
      `<view style="display: contents" bindtap="{{a}}"><custom wx:if="{{b}}" u-i="2a9ec0b0-0" u-p="{{b}}"/></view>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _o(_ctx.onClick, "d6"), b: _p({ onClick: a }) }
  return __returned__
}`,
      options
    )
  })
})
