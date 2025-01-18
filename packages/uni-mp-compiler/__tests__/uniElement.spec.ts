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
      `(_ctx, _cache) => {
  const __returned__ = { a: _sei('view', 'view'), b: _s(_ses('view')) }
  return __returned__
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view id="view"/>`,
      `<view id="{{a}}" style="{{$eS[a] + ';' + virtualHostStyle}}" class="{{[virtualHostClass]}}" hidden="{{virtualHostHidden || false}}"/>`,
      `(_ctx, _cache) => {
  const __returned__ = { a: _sei(_gei(_ctx, 'view'), 'view'), b: _s(_ses(_gei(_ctx, 'view'))) }
  return __returned__
}`,
      {
        isX: true,
        miniProgram: miniProgramOptions,
      }
    )
    assert(
      `<custom id="custom"/>`,
      `<custom id="custom" u-i="2a9ec0b0-0" u-p="{{a||''}}"/>`,
      `(_ctx, _cache) => {
  const __returned__ = { a: _p({ id: 'custom' }) }
  return __returned__
}`,
      {
        isX: true,
      }
    )
    assert(
      `<custom id="custom"/>`,
      `<custom u-i="2a9ec0b0-0" id="{{a}}" virtualHostId="{{a}}" u-p="{{b||''}}" class="{{[virtualHostClass]}}" virtualHostClass="{{[virtualHostClass]}}" style="{{virtualHostStyle}}" virtualHostStyle="{{virtualHostStyle}}" hidden="{{virtualHostHidden || false}}" virtualHostHidden="{{virtualHostHidden || false}}"/>`,
      `(_ctx, _cache) => {
  const __returned__ = { a: _gei(_ctx, 'custom'), b: _p({ id: _gei(_ctx, 'custom') }) }
  return __returned__
}`,
      {
        isX: true,
        miniProgram: miniProgramOptions,
      }
    )
    assert(
      `<unicloud-db ref="udb"/>`,
      `<unicloud-db ref="udb" u-i="2a9ec0b0-0" id="r0-2a9ec0b0" style="{{$eS[a]}}" u-p="{{c||''}}"/>`,
      `(_ctx, _cache) => {
  const __returned__ = { a: _sei('r0-2a9ec0b0', { "name": "unicloud-db", "type": 1 }, 'udb'), b: _s(_ses('r0-2a9ec0b0')), c: _p({ id: 'r0-2a9ec0b0' }) }
  return __returned__
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view v-for="item in 10" id="view"/>`,
      `<view wx:for="{{a}}" wx:for-item="item" id="view" style="{{$eS[b]}}"/>`,
      `(_ctx, _cache) => {
  const __returned__ = { a: _f(10, (item, k0, i0) => { return {}; }), b: _sei('view', 'view'), c: _s(_ses('view')) }
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
      `(_ctx, _cache) => {
  const __returned__ = { a: _sei('view', 'view'), b: _s(_ses('view')) }
  return __returned__
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view id="view" style="color:red"/>`,
      `<view id="{{a}}" style="{{'color:red' + ';' + $eS[a] + ';' + virtualHostStyle}}" class="{{[virtualHostClass]}}" hidden="{{virtualHostHidden || false}}"/>`,
      `(_ctx, _cache) => {
  const __returned__ = { a: _sei(_gei(_ctx, 'view'), 'view'), b: _s(_ses(_gei(_ctx, 'view'))) }
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
      `(_ctx, _cache) => {
  const __returned__ = { a: _sei('view', 'view'), b: _s(_ses('view', { color: 'blue' })) }
  return __returned__
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view v-for="item in 10" id="view" style="color:red"/>`,
      `<view wx:for="{{a}}" wx:for-item="item" id="view" style="{{'color:red' + ';' + $eS[b]}}"/>`,
      `(_ctx, _cache) => {
  const __returned__ = { a: _f(10, (item, k0, i0) => { return {}; }), b: _sei('view', 'view'), c: _s(_ses('view')) }
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
      `(_ctx, _cache) => {
  const __returned__ = { a: _sei(_ctx.viewId, 'view'), b: _s(_ses(_ctx.viewId)) }
  return __returned__
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view :id="viewId"/>`,
      `<view id="{{a}}" style="{{$eS[a] + ';' + virtualHostStyle}}\" class=\"{{[virtualHostClass]}}\" hidden=\"{{virtualHostHidden || false}}"/>`,
      `(_ctx, _cache) => {
  const __returned__ = { a: _sei(_gei(_ctx, _ctx.viewId), 'view'), b: _s(_ses(_gei(_ctx, _ctx.viewId))) }
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
      `(_ctx, _cache) => {
  const __returned__ = { a: _f(10, (item, k0, i0) => { return {}; }), b: _sei(_ctx.viewId, 'view'), c: _s(_ses(_ctx.viewId)) }
  return __returned__
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view v-for="item in 10" :id="viewId+'_'+item"/>`,
      `<view wx:for="{{a}}" wx:for-item="item" id="{{item.a}}" style="{{$eS[item.a]}}"/>`,
      `(_ctx, _cache) => {
  const __returned__ = { a: _f(10, (item, k0, i0) => { return { a: _sei(_ctx.viewId + '_' + item, 'view'), b: _s(_ses(_ctx.viewId + '_' + item)) }; }) }
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
      `(_ctx, _cache) => {
  const __returned__ = { a: _sei(_ctx.viewId, 'view'), b: _s(_ses(_ctx.viewId, { color: 'red' })) }
  return __returned__
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view v-for="item in 10" :id="viewId" :style="style"/>`,
      `<view wx:for="{{a}}" wx:for-item="item" id="{{b}}" style="{{$eS[b]}}"/>`,
      `(_ctx, _cache) => {
  const __returned__ = { a: _f(10, (item, k0, i0) => { return {}; }), b: _sei(_ctx.viewId, 'view'), c: _s(_ses(_ctx.viewId, _ctx.style)) }
  return __returned__
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view v-for="item in 10" :id="viewId+'_'+item" :style="item.style"/>`,
      `<view wx:for="{{a}}" wx:for-item="item" id="{{item.a}}" style="{{$eS[item.a]}}"/>`,
      `(_ctx, _cache) => {
  const __returned__ = { a: _f(10, (item, k0, i0) => { return { a: _sei(_ctx.viewId + '_' + item, 'view'), b: _s(_ses(_ctx.viewId + '_' + item, item.style)) }; }) }
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
      `<view ref="view" id="r0-2a9ec0b0" style="{{'color:red' + ';' + $eS[a]}}"/>`,
      `(_ctx, _cache) => {
  const __returned__ = { a: _sei('r0-2a9ec0b0', 'view', 'view'), b: _s(_ses('r0-2a9ec0b0')) }
  return __returned__
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view v-for="item in 10" ref="view"/>`,
      `<view wx:for="{{a}}" wx:for-item="item" ref="view" id="{{item.a}}" style="{{$eS[item.a]}}"/>`,
      `(_ctx, _cache) => {
  const __returned__ = { a: _f(10, (item, k0, i0) => { return { a: _sei('r0-2a9ec0b0-' + k0, 'view', 'view', { "f": 1 }), b: _s(_ses('r0-2a9ec0b0-' + k0)) }; }) }
  return __returned__
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view v-for="item in 10" ref="v0"><view v-for="item in 10" ref="v1"/></view>`,
      `<view wx:for="{{a}}" wx:for-item="item" ref="v0" id="{{item.b}}" style="{{$eS[item.b]}}"><view wx:for="{{item.a}}" wx:for-item="item" ref="v1" id="{{item.a}}" style="{{$eS[item.a]}}"/></view>`,
      `(_ctx, _cache) => {
  const __returned__ = { a: _f(10, (item, k0, i0) => { return { a: _f(10, (item, k1, i1) => { return { a: _sei('r0-2a9ec0b0-' + k1 + '-' + k0, 'view', 'v1', { "f": 1 }), b: _s(_ses('r0-2a9ec0b0-' + k1 + '-' + k0)) }; }), b: _sei('r1-2a9ec0b0-' + k0, 'view', 'v0', { "f": 1 }), c: _s(_ses('r1-2a9ec0b0-' + k0)) }; }) }
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
      `<view id="view" change:eS="{{uV.sS}}" eS="{{$eS[a]}}"/>`,
      `(_ctx, _cache) => {
  const __returned__ = { a: _sei('view', 'view') }
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
      `<view wx:for="{{a}}" wx:for-item="item" id="view" change:eS="{{uV.sS}}" eS="{{$eS[b]}}"/>`,
      `(_ctx, _cache) => {
  const __returned__ = { a: _f(10, (item, k0, i0) => { return {}; }), b: _sei('view', 'view') }
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
      `<view id="view" style="color:red" change:eS="{{uV.sS}}" eS="{{$eS[a]}}"/>`,
      `(_ctx, _cache) => {
  const __returned__ = { a: _sei('view', 'view') }
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
      `<view id="view" style="{{'color:red' + ';' + ('color:' + 'blue')}}" change:eS="{{uV.sS}}" eS="{{$eS[a]}}"/>`,
      `(_ctx, _cache) => {
  const __returned__ = { a: _sei('view', 'view') }
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
      `<view wx:for="{{a}}" wx:for-item="item" id="view" style="color:red" change:eS="{{uV.sS}}" eS="{{$eS[b]}}"/>`,
      `(_ctx, _cache) => {
  const __returned__ = { a: _f(10, (item, k0, i0) => { return {}; }), b: _sei('view', 'view') }
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
      `<view id="{{a}}" change:eS="{{uV.sS}}" eS="{{$eS[a]}}"/>`,
      `(_ctx, _cache) => {
  const __returned__ = { a: _sei(_ctx.viewId, 'view') }
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
      `<view wx:for="{{a}}" wx:for-item="item" id="{{b}}" change:eS="{{uV.sS}}" eS="{{$eS[b]}}"/>`,
      `(_ctx, _cache) => {
  const __returned__ = { a: _f(10, (item, k0, i0) => { return {}; }), b: _sei(_ctx.viewId, 'view') }
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
      `<view wx:for="{{a}}" wx:for-item="item" id="{{item.a}}" change:eS="{{uV.sS}}" eS="{{$eS[item.a]}}"/>`,
      `(_ctx, _cache) => {
  const __returned__ = { a: _f(10, (item, k0, i0) => { return { a: _sei(_ctx.viewId + '_' + item, 'view') }; }) }
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
      `<view ref="view" style="color:red" id="r0-2a9ec0b0" change:eS="{{uV.sS}}" eS="{{$eS[a]}}"/>`,
      `(_ctx, _cache) => {
  const __returned__ = { a: _sei('r0-2a9ec0b0', 'view', 'view') }
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
      `<view wx:for="{{a}}" wx:for-item="item" ref="view" id="{{item.a}}" change:eS="{{uV.sS}}" eS="{{$eS[item.a]}}"/>`,
      `(_ctx, _cache) => {
  const __returned__ = { a: _f(10, (item, k0, i0) => { return { a: _sei('r0-2a9ec0b0-' + k0, 'view', 'view', { "f": 1 }) }; }) }
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
      `<view wx:for="{{a}}" wx:for-item="item" ref="v0" id="{{item.b}}" change:eS="{{uV.sS}}" eS="{{$eS[item.b]}}"><view wx:for="{{item.a}}" wx:for-item="item" ref="v1" id="{{item.a}}" change:eS="{{uV.sS}}" eS="{{$eS[item.a]}}"/></view>`,
      `(_ctx, _cache) => {
  const __returned__ = { a: _f(10, (item, k0, i0) => { return { a: _f(10, (item, k1, i1) => { return { a: _sei('r0-2a9ec0b0-' + k1 + '-' + k0, 'view', 'v1', { "f": 1 }) }; }), b: _sei('r1-2a9ec0b0-' + k0, 'view', 'v0', { "f": 1 }) }; }) }
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
      `<unicloud-db ref="udb" u-i="2a9ec0b0-0" id="r0-2a9ec0b0" change:eS="{{uV.sS}}" eS="{{$eS[a]}}" u-p="{{b||''}}"/>`,
      `(_ctx, _cache) => {
  const __returned__ = { a: _sei('r0-2a9ec0b0', { "name": "unicloud-db", "type": 1 }, 'udb'), b: _p({ id: 'r0-2a9ec0b0' }) }
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
