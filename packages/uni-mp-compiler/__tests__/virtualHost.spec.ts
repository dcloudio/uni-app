import { extend } from '@vue/shared'
import { assert, miniProgram } from './testUtils'

const optionsX = {
  isX: true,
  miniProgram: {
    ...miniProgram,
    component: extend({}, miniProgram.component, {
      mergeVirtualHostAttributes: true,
    }),
  },
}

describe('virtualHost', () => {
  test('parseVirtualHostClass', () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    assert(
      `<custom/>`,
      `<custom style="{{'--status-bar-height:' + b + ';' + (virtualHostStyle || '')}}" virtualHostStyle="{{'--status-bar-height:' + b + ';' + (virtualHostStyle || '')}}" u-i="2a9ec0b0-0" id="{{a}}" virtualHostId="{{a}}" u-p="{{c||''}}" class="{{[d]}}" virtualHostClass="{{[d]}}" hidden="{{virtualHostHidden || false}}" virtualHostHidden="{{virtualHostHidden || false}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _gei(_ctx, ''), b: \`\${_ctx.u_s_b_h}px\`, c: _p({ id: _gei(_ctx, '') }), d: _pvhc(this.$scope.data.virtualHostClass) }
  return __returned__
}`,
      optionsX
    )

    assert(
      `<custom class="foo"/>`,
      `<custom style="{{'--status-bar-height:' + b + ';' + (virtualHostStyle || '')}}" virtualHostStyle="{{'--status-bar-height:' + b + ';' + (virtualHostStyle || '')}}" u-i="2a9ec0b0-0" id="{{a}}" virtualHostId="{{a}}" u-p="{{c||''}}" class="{{['foo', d]}}" virtualHostClass="{{['foo', d]}}" hidden="{{virtualHostHidden || false}}" virtualHostHidden="{{virtualHostHidden || false}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _gei(_ctx, ''), b: \`\${_ctx.u_s_b_h}px\`, c: _p({ id: _gei(_ctx, '') }), d: _pvhc(this.$scope.data.virtualHostClass) }
  return __returned__
}`,
      optionsX
    )
  })
})
