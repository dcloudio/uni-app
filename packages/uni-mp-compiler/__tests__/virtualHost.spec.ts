import { extend } from '@vue/shared'
import { assert, miniProgram } from './testUtils'

const options = {
  miniProgram: {
    ...miniProgram,
    component: extend({}, miniProgram.component, {
      mergeVirtualHostAttributes: true,
    }),
  },
}
const optionsX = {
  isX: true,
  ...options,
}

describe('virtualHost', () => {
  test('parseVirtualHostClass', () => {
    process.env.UNI_PLATFORM = 'mp-weixin'

    assert(
      `<custom/>`,
      `<custom u-i="2a9ec0b0-0" class="{{[virtualHostClass]}}" virtualHostClass="{{[virtualHostClass]}}" style="{{virtualHostStyle}}" virtualHostStyle="{{virtualHostStyle}}" hidden="{{virtualHostHidden || false}}" virtualHostHidden="{{virtualHostHidden || false}}" id="{{a}}" virtualHostId="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _gei(_ctx, '') }
}`,
      options
    )

    assert(
      `<custom class="foo"/>`,
      `<custom u-i="2a9ec0b0-0" class="{{['foo', virtualHostClass]}}" virtualHostClass="{{['foo', virtualHostClass]}}" style="{{virtualHostStyle}}" virtualHostStyle="{{virtualHostStyle}}" hidden="{{virtualHostHidden || false}}" virtualHostHidden="{{virtualHostHidden || false}}" id="{{a}}" virtualHostId="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _gei(_ctx, '') }
}`,
      options
    )

    assert(
      `<custom :class="foo"><view class="bar">Hello</view></custom>`,
      `<custom u-s="{{['d']}}" class="{{[a, virtualHostClass]}}" virtualHostClass="{{[a, virtualHostClass]}}" u-i="2a9ec0b0-0" style="{{virtualHostStyle}}" virtualHostStyle="{{virtualHostStyle}}" hidden="{{virtualHostHidden || false}}" virtualHostHidden="{{virtualHostHidden || false}}" id="{{b}}" virtualHostId="{{b}}"><view class="bar">Hello</view></custom>`,
      `(_ctx, _cache) => {
  return { a: _n(_ctx.foo), b: _gei(_ctx, '') }
}`,
      options
    )

    assert(
      `<custom/>`,
      `<custom u-i="2a9ec0b0-0" id="{{a}}" virtualHostId="{{a}}" u-p="{{b||''}}" class="{{[virtualHostClass]}}" virtualHostClass="{{[virtualHostClass]}}" style="{{virtualHostStyle}}" virtualHostStyle="{{virtualHostStyle || ''}}" hidden="{{virtualHostHidden || false}}" virtualHostHidden="{{virtualHostHidden || false}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _gei(_ctx, ''), b: _p({ id: _gei(_ctx, '') }) }
  return __returned__
}`,
      optionsX
    )

    assert(
      `<custom class="foo"/>`,
      `<custom u-i="2a9ec0b0-0" id="{{a}}" virtualHostId="{{a}}" u-p="{{b||''}}" class="{{['foo', virtualHostClass]}}" virtualHostClass="{{['foo', virtualHostClass]}}" style="{{virtualHostStyle}}" virtualHostStyle="{{virtualHostStyle || ''}}" hidden="{{virtualHostHidden || false}}" virtualHostHidden="{{virtualHostHidden || false}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _gei(_ctx, ''), b: _p({ id: _gei(_ctx, ''), class: 'foo' }) }
  return __returned__
}`,
      optionsX
    )

    assert(
      `<custom :class="foo"><view class="bar">Hello</view></custom>`,
      `<custom u-s="{{['d']}}" class="{{[b, virtualHostClass]}}" virtualHostClass="{{[b, virtualHostClass]}}" u-i="2a9ec0b0-0" id="{{a}}" virtualHostId="{{a}}" u-p="{{c||''}}" style="{{virtualHostStyle}}" virtualHostStyle="{{virtualHostStyle || ''}}" hidden="{{virtualHostHidden || false}}" virtualHostHidden="{{virtualHostHidden || false}}"><view class="bar">Hello</view></custom>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _gei(_ctx, ''), b: _n(_ctx.foo), c: _p({ id: _gei(_ctx, ''), class: _normalizeClass(_ctx.foo) }) }
  return __returned__
}`,
      optionsX
    )
  })
})
