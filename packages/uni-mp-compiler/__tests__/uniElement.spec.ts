import { extend } from '@vue/shared'
import { assert, miniProgram } from './testUtils'

const miniProgramOptions = {
  ...miniProgram,
  component: extend({}, miniProgram.component, {
    mergeVirtualHostAttributes: true,
  }),
}

describe('compiler: transform UniElement.style.setProperty', () => {
  test('static id', () => {
    assert(
      `<view id="view"/>`,
      `<view id="view" style="{{$eS[a]}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _sei('view', 'view'), b: _s(_ses('view', { '--status-bar-height': \`\${_ctx.u_s_b_h}px\` })) }
  return __returned__
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view id="view"/>`,
      `<view style="{{$eS[a] + ';' + (virtualHostStyle || '')}}" id="{{a}}" class="{{[virtualHostClass]}}" hidden="{{virtualHostHidden || false}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _sei(_gei(_ctx, 'view'), 'view'), b: _s(_ses(_gei(_ctx, 'view'), { '--status-bar-height': \`\${_ctx.u_s_b_h}px\` })) }
  return __returned__
}`,
      {
        isX: true,
        miniProgram: miniProgramOptions,
      }
    )
    assert(
      `<custom id="custom"/>`,
      `<custom id="custom" style="{{'--status-bar-height:' + a}}" u-i="2a9ec0b0-0" u-p="{{b||''}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: _p({ id: 'custom' }) }
  return __returned__
}`,
      {
        isX: true,
      }
    )
    assert(
      `<custom id="custom"/>`,
      `<custom style="{{'--status-bar-height:' + b + ';' + (virtualHostStyle || '')}}" virtualHostStyle="{{'--status-bar-height:' + b + ';' + (virtualHostStyle || '')}}" u-i="2a9ec0b0-0" id="{{a}}" virtualHostId="{{a}}" u-p="{{c||''}}" class=\"{{[virtualHostClass]}}\" virtualHostClass=\"{{[virtualHostClass]}}\" hidden=\"{{virtualHostHidden || false}}\" virtualHostHidden=\"{{virtualHostHidden || false}}\"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _gei(_ctx, 'custom'), b: \`\${_ctx.u_s_b_h}px\`, c: _p({ id: _gei(_ctx, 'custom') }) }
  return __returned__
}`,
      {
        isX: true,
        miniProgram: miniProgramOptions,
      }
    )
    assert(
      `<unicloud-db ref="udb"/>`,
      `<unicloud-db ref="udb" style="{{$eS[a]}}" u-i="2a9ec0b0-0" id="r0-2a9ec0b0" u-p="{{c||''}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _sei('r0-2a9ec0b0', { "name": "unicloud-db", "type": 1 }, 'udb'), b: _s(_ses('r0-2a9ec0b0', { '--status-bar-height': \`\${_ctx.u_s_b_h}px\` })), c: _p({ id: 'r0-2a9ec0b0' }) }
  return __returned__
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view v-for="item in 10" id="view"/>`,
      `<view wx:for="{{a}}" wx:for-item="item" id="view" style="{{$eS[b]}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _f(10, (item, k0, i0) => { return {}; }), b: _sei('view', 'view'), c: _s(_ses('view', { '--status-bar-height': \`\${_ctx.u_s_b_h}px\` })) }
  return __returned__
}`,
      {
        isX: true,
      }
    )
  })
  test('static id with style', () => {
    assert(
      `<view id="view" style="color:red"/>`,
      `<view id="view" style="{{'color:red' + ';' + $eS[a]}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _sei('view', 'view'), b: _s(_ses('view', { '--status-bar-height': \`\${_ctx.u_s_b_h}px\` })) }
  return __returned__
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view id="view" style="color:red"/>`,
      `<view style="{{'color:red' + ';' + $eS[a] + ';' + (virtualHostStyle || '')}}" id="{{a}}" class="{{[virtualHostClass]}}" hidden="{{virtualHostHidden || false}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _sei(_gei(_ctx, 'view'), 'view'), b: _s(_ses(_gei(_ctx, 'view'), { '--status-bar-height': \`\${_ctx.u_s_b_h}px\` })) }
  return __returned__
}`,
      {
        isX: true,
        miniProgram: miniProgramOptions,
      }
    )
    assert(
      `<view id="view" style="color:red" :style="{color:'blue'}"/>`,
      `<view id="view" style="{{'color:red' + ';' + $eS[a]}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _sei('view', 'view'), b: _s(_ses('view', [{ color: 'blue' }, { '--status-bar-height': \`\${_ctx.u_s_b_h}px\` }])) }
  return __returned__
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view v-for="item in 10" id="view" style="color:red"/>`,
      `<view wx:for="{{a}}" wx:for-item="item" id="view" style="{{'color:red' + ';' + $eS[b]}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _f(10, (item, k0, i0) => { return {}; }), b: _sei('view', 'view'), c: _s(_ses('view', { '--status-bar-height': \`\${_ctx.u_s_b_h}px\` })) }
  return __returned__
}`,
      {
        isX: true,
      }
    )
  })
  test('dynamic id', () => {
    assert(
      `<view :id="viewId"/>`,
      `<view id="{{a}}" style="{{$eS[a]}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _sei(_ctx.viewId, 'view'), b: _s(_ses(_ctx.viewId, { '--status-bar-height': \`\${_ctx.u_s_b_h}px\` })) }
  return __returned__
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view :id="viewId"/>`,
      `<view id="{{a}}" style="{{$eS[a] + ';' + (virtualHostStyle || '')}}\" class=\"{{[virtualHostClass]}}\" hidden=\"{{virtualHostHidden || false}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _sei(_gei(_ctx, _ctx.viewId), 'view'), b: _s(_ses(_gei(_ctx, _ctx.viewId), { '--status-bar-height': \`\${_ctx.u_s_b_h}px\` })) }
  return __returned__
}`,
      {
        isX: true,
        miniProgram: miniProgramOptions,
      }
    )
    assert(
      `<view v-for="item in 10" :id="viewId"/>`,
      `<view wx:for="{{a}}" wx:for-item="item" id="{{b}}" style="{{$eS[b]}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _f(10, (item, k0, i0) => { return {}; }), b: _sei(_ctx.viewId, 'view'), c: _s(_ses(_ctx.viewId, { '--status-bar-height': \`\${_ctx.u_s_b_h}px\` })) }
  return __returned__
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view v-for="item in 10" :id="viewId+'_'+item"/>`,
      `<view wx:for="{{a}}" wx:for-item="item" id="{{item.a}}" style="{{$eS[item.a]}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _f(10, (item, k0, i0) => { return { a: _sei(_ctx.viewId + '_' + item, 'view'), b: _s(_ses(_ctx.viewId + '_' + item, { '--status-bar-height': \`\${_ctx.u_s_b_h}px\` })) }; }) }
  return __returned__
}`,
      {
        isX: true,
      }
    )
  })
  test('dynamic id with style', () => {
    assert(
      `<view :id="viewId" :style="{color:'red'}"/>`,
      `<view id="{{a}}" style="{{$eS[a]}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _sei(_ctx.viewId, 'view'), b: _s(_ses(_ctx.viewId, [{ color: 'red' }, { '--status-bar-height': \`\${_ctx.u_s_b_h}px\` }])) }
  return __returned__
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view v-for="item in 10" :id="viewId" :style="style"/>`,
      `<view wx:for="{{a}}" wx:for-item="item" id="{{b}}" style="{{$eS[b]}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _f(10, (item, k0, i0) => { return {}; }), b: _sei(_ctx.viewId, 'view'), c: _s(_ses(_ctx.viewId, [_ctx.style, { '--status-bar-height': \`\${_ctx.u_s_b_h}px\` }])) }
  return __returned__
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view v-for="item in 10" :id="viewId+'_'+item" :style="item.style"/>`,
      `<view wx:for="{{a}}" wx:for-item="item" id="{{item.a}}" style="{{$eS[item.a]}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _f(10, (item, k0, i0) => { return { a: _sei(_ctx.viewId + '_' + item, 'view'), b: _s(_ses(_ctx.viewId + '_' + item, [item.style, { '--status-bar-height': \`\${_ctx.u_s_b_h}px\` }])) }; }) }
  return __returned__
}`,
      {
        isX: true,
      }
    )
  })
  test('static ref', () => {
    assert(
      `<view ref="view" style="color:red"/>`,
      `<view ref="view" style=\"{{'color:red' + ';' + $eS[a]}}\" id=\"r0-2a9ec0b0\"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _sei('r0-2a9ec0b0', 'view', 'view'), b: _s(_ses('r0-2a9ec0b0', { '--status-bar-height': \`\${_ctx.u_s_b_h}px\` })) }
  return __returned__
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view v-for="item in 10" ref="view"/>`,
      `<view wx:for="{{a}}" wx:for-item="item" ref="view" style="{{$eS[item.a]}}" id="{{item.a}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _f(10, (item, k0, i0) => { return { a: _sei('r0-2a9ec0b0-' + k0, 'view', 'view', { "f": 1 }), b: _s(_ses('r0-2a9ec0b0-' + k0, { '--status-bar-height': \`\${_ctx.u_s_b_h}px\` })) }; }) }
  return __returned__
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view v-for="item in 10" ref="v0"><view v-for="item in 10" ref="v1"/></view>`,
      `<view wx:for="{{a}}" wx:for-item="item" ref="v0" style="{{$eS[item.b]}}" id="{{item.b}}"><view wx:for="{{item.a}}" wx:for-item="item" ref="v1" id="{{item.a}}" style="{{$eS[item.a]}}"/></view>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _f(10, (item, k0, i0) => { return { a: _f(10, (item, k1, i1) => { return { a: _sei('r0-2a9ec0b0-' + k1 + '-' + k0, 'view', 'v1', { "f": 1 }), b: _s(_ses('r0-2a9ec0b0-' + k1 + '-' + k0)) }; }), b: _sei('r1-2a9ec0b0-' + k0, 'view', 'v0', { "f": 1 }), c: _s(_ses('r1-2a9ec0b0-' + k0, { '--status-bar-height': \`\${_ctx.u_s_b_h}px\` })) }; }) }
  return __returned__
}`,
      {
        isX: true,
      }
    )
  })
})

describe('compiler: transform UniElement.style.setProperty (wxs)', () => {
  test('static id', () => {
    assert(
      `<view id="view"/>`,
      `<view id="view" style=\"{{'--status-bar-height:' + b}}\" change:eS="{{uV.sS}}" eS="{{$eS[a]}}" change:eA="{{uV.sA}}" eA="{{$eA[a]}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _sei('view', 'view'), b: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      {
        isX: true,
      },
      {
        filter: {
          lang: 'wxs',
          setStyle: true,
        },
      }
    )
    assert(
      `<view v-for="item in 10" id="view"/>`,
      `<view wx:for="{{a}}" wx:for-item="item" id="view" style=\"{{'--status-bar-height:' + c}}\" change:eS="{{uV.sS}}" eS="{{$eS[b]}}" change:eA="{{uV.sA}}" eA="{{$eA[b]}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _f(10, (item, k0, i0) => { return {}; }), b: _sei('view', 'view'), c: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      {
        isX: true,
      },
      {
        filter: {
          lang: 'wxs',
          setStyle: true,
        },
      }
    )
  })
  test('static id with style', () => {
    assert(
      `<view id="view" style="color:red"/>`,
      `<view id="view" style=\"{{'color:red' + ';' + ('--status-bar-height:' + b)}}\" change:eS="{{uV.sS}}" eS="{{$eS[a]}}" change:eA="{{uV.sA}}" eA="{{$eA[a]}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _sei('view', 'view'), b: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      {
        isX: true,
      },
      {
        filter: {
          lang: 'wxs',
          setStyle: true,
        },
      }
    )
    assert(
      `<view id="view" style="color:red" :style="{color:'blue'}"/>`,
      `<view id="view" style=\"{{'color:red' + ';' + (b + ';' + c)}}\" change:eS="{{uV.sS}}" eS="{{$eS[a]}}" change:eA="{{uV.sA}}" eA="{{$eA[a]}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _sei('view', 'view'), b: _s({ color: 'blue' }), c: _s({ '--status-bar-height': \`\${_ctx.u_s_b_h}px\` }) }
  return __returned__
}`,
      {
        isX: true,
      },
      {
        filter: {
          lang: 'wxs',
          setStyle: true,
        },
      }
    )
    assert(
      `<view v-for="item in 10" id="view" style="color:red"/>`,
      `<view wx:for="{{a}}" wx:for-item="item" id="view" style=\"{{'color:red' + ';' + ('--status-bar-height:' + c)}}\" change:eS="{{uV.sS}}" eS="{{$eS[b]}}" change:eA="{{uV.sA}}" eA="{{$eA[b]}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _f(10, (item, k0, i0) => { return {}; }), b: _sei('view', 'view'), c: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      {
        isX: true,
      },
      {
        filter: {
          lang: 'wxs',
          setStyle: true,
        },
      }
    )
  })
  test('dynamic id', () => {
    assert(
      `<view :id="viewId"/>`,
      `<view id="{{a}}" style=\"{{'--status-bar-height:' + b}}\" change:eS="{{uV.sS}}" eS="{{$eS[a]}}" change:eA="{{uV.sA}}" eA="{{$eA[a]}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _sei(_ctx.viewId, 'view'), b: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      {
        isX: true,
      },
      {
        filter: {
          lang: 'wxs',
          setStyle: true,
        },
      }
    )
    assert(
      `<view v-for="item in 10" :id="viewId"/>`,
      `<view wx:for="{{a}}" wx:for-item="item" id="{{b}}" style=\"{{'--status-bar-height:' + c}}\" change:eS="{{uV.sS}}" eS="{{$eS[b]}}" change:eA="{{uV.sA}}" eA="{{$eA[b]}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _f(10, (item, k0, i0) => { return {}; }), b: _sei(_ctx.viewId, 'view'), c: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      {
        isX: true,
      },
      {
        filter: {
          lang: 'wxs',
          setStyle: true,
        },
      }
    )
    assert(
      `<view v-for="item in 10" :id="viewId+'_'+item"/>`,
      `<view wx:for="{{a}}" wx:for-item="item" id="{{item.a}}" style=\"{{'--status-bar-height:' + b}}\" change:eS="{{uV.sS}}" eS="{{$eS[item.a]}}" change:eA="{{uV.sA}}" eA="{{$eA[item.a]}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _f(10, (item, k0, i0) => { return { a: _sei(_ctx.viewId + '_' + item, 'view') }; }), b: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      {
        isX: true,
      },
      {
        filter: {
          lang: 'wxs',
          setStyle: true,
        },
      }
    )
  })
  test('static ref', () => {
    assert(
      `<view ref="view" style="color:red"/>`,
      `<view ref="view" style=\"{{'color:red' + ';' + ('--status-bar-height:' + b)}}\" id="r0-2a9ec0b0" change:eS="{{uV.sS}}" eS="{{$eS[a]}}" change:eA="{{uV.sA}}" eA="{{$eA[a]}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _sei('r0-2a9ec0b0', 'view', 'view'), b: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      {
        isX: true,
      },
      {
        filter: {
          lang: 'wxs',
          setStyle: true,
        },
      }
    )
    assert(
      `<view v-for="item in 10" ref="view"/>`,
      `<view wx:for="{{a}}" wx:for-item="item" ref="view" style=\"{{'--status-bar-height:' + b}}\" id="{{item.a}}" change:eS="{{uV.sS}}" eS="{{$eS[item.a]}}" change:eA="{{uV.sA}}" eA="{{$eA[item.a]}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _f(10, (item, k0, i0) => { return { a: _sei('r0-2a9ec0b0-' + k0, 'view', 'view', { "f": 1 }) }; }), b: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      {
        isX: true,
      },
      {
        filter: {
          lang: 'wxs',
          setStyle: true,
        },
      }
    )
    assert(
      `<view v-for="item in 10" ref="v0"><view v-for="item in 10" ref="v1"/></view>`,
      `<view wx:for="{{a}}" wx:for-item="item" ref="v0" style=\"{{'--status-bar-height:' + b}}\" id="{{item.b}}" change:eS="{{uV.sS}}" eS="{{$eS[item.b]}}" change:eA="{{uV.sA}}" eA="{{$eA[item.b]}}"><view wx:for="{{item.a}}" wx:for-item="item" ref="v1" id="{{item.a}}" change:eS="{{uV.sS}}" eS="{{$eS[item.a]}}" change:eA="{{uV.sA}}" eA="{{$eA[item.a]}}"/></view>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _f(10, (item, k0, i0) => { return { a: _f(10, (item, k1, i1) => { return { a: _sei('r0-2a9ec0b0-' + k1 + '-' + k0, 'view', 'v1', { "f": 1 }) }; }), b: _sei('r1-2a9ec0b0-' + k0, 'view', 'v0', { "f": 1 }) }; }), b: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      {
        isX: true,
      },
      {
        filter: {
          lang: 'wxs',
          setStyle: true,
        },
      }
    )
  })
  test('static ref with unicloud-db', () => {
    assert(
      `<unicloud-db ref="udb"/>`,
      `<unicloud-db ref="udb" style=\"{{'--status-bar-height:' + b}}\" u-i="2a9ec0b0-0" id="r0-2a9ec0b0" change:eS="{{uV.sS}}" eS="{{$eS[a]}}" change:eA="{{uV.sA}}" eA="{{$eA[a]}}" u-p="{{c||''}}"/>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _sei('r0-2a9ec0b0', { "name": "unicloud-db", "type": 1 }, 'udb'), b: \`\${_ctx.u_s_b_h}px\`, c: _p({ id: 'r0-2a9ec0b0' }) }
  return __returned__
}`,
      {
        isX: true,
      },
      {
        filter: {
          lang: 'wxs',
          setStyle: true,
        },
      }
    )
  })
})
