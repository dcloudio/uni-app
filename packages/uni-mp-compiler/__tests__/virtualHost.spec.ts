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
      `<custom u-i="2a9ec0b0-0" class="{{[ahc]}}" ahc="{{[ahc]}}" style="{{ahs}}" ahs="{{ahs}}" hidden="{{ahh || false}}" ahh="{{ahh || false}}" id="{{a}}" ahid="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _gei(_ctx, '') }
}`,
      options
    )

    assert(
      `<custom class="foo"/>`,
      `<custom u-i="2a9ec0b0-0" class="{{['foo', ahc]}}" ahc="{{['foo', ahc]}}" style="{{ahs}}" ahs="{{ahs}}" hidden="{{ahh || false}}" ahh="{{ahh || false}}" id="{{a}}" ahid="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _gei(_ctx, '') }
}`,
      options
    )

    assert(
      `<custom :class="foo"><view class="bar">Hello</view></custom>`,
      `<custom u-s="{{['d']}}" class="{{[a, ahc]}}" ahc="{{[a, ahc]}}" u-i="2a9ec0b0-0" style="{{ahs}}" ahs="{{ahs}}" hidden="{{ahh || false}}" ahh="{{ahh || false}}" id="{{b}}" ahid="{{b}}"><view class="bar">Hello</view></custom>`,
      `(_ctx, _cache) => {
  return { a: _n(_ctx.foo), b: _gei(_ctx, '') }
}`,
      options
    )

    assert(
      `<custom/>`,
      `<custom u-i="2a9ec0b0-0" id="{{a}}" ahid="{{a}}" u-p="{{b||''}}" class="{{[ahc]}}" ahc="{{[ahc]}}" style="{{ahs}}" ahs="{{ahs}}" hidden="{{ahh || false}}" ahh="{{ahh || false}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _gei(_ctx, ''), b: _p({ id: _gei(_ctx, '') }) }
  return __returned__
}`,
      optionsX
    )

    assert(
      `<custom class="foo"/>`,
      `<custom u-i="2a9ec0b0-0" id="{{a}}" ahid="{{a}}" u-p="{{b||''}}" class="{{['foo', ahc]}}" ahc="{{['foo', ahc]}}" style="{{ahs}}" ahs="{{ahs}}" hidden="{{ahh || false}}" ahh="{{ahh || false}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _gei(_ctx, ''), b: _p({ id: _gei(_ctx, ''), class: 'foo' }) }
  return __returned__
}`,
      optionsX
    )

    assert(
      `<custom :class="foo"><view class="bar">Hello</view></custom>`,
      `<custom u-s="{{['d']}}" class="{{[b, ahc]}}" ahc="{{[b, ahc]}}" u-i="2a9ec0b0-0" id="{{a}}" ahid="{{a}}" u-p="{{c||''}}" style="{{ahs}}" ahs="{{ahs}}" hidden="{{ahh || false}}" ahh="{{ahh || false}}"><view class="bar">Hello</view></custom>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _gei(_ctx, ''), b: _n(_ctx.foo), c: _p({ id: _gei(_ctx, ''), class: _normalizeClass(_ctx.foo) }) }
  return __returned__
}`,
      optionsX
    )
  })
})
