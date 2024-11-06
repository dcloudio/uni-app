import { assert } from './testUtils'

describe('compiler: transform UniElement.style.setProperty', () => {
  test('static id', () => {
    assert(
      `<view id="view"/>`,
      `<view id="view" style="{{$eS[a]}}"/>`,
      `(_ctx, _cache) => {
  return { a: _sei('view', 'view'), b: _s(_ses('view')) }
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view v-for="item in 10" id="view"/>`,
      `<view wx:for="{{a}}" wx:for-item="item" id="view" style="{{$eS[b]}}"/>`,
      `(_ctx, _cache) => {
  return { a: _f(10, (item, k0, i0) => { return {}; }), b: _sei('view', 'view'), c: _s(_ses('view')) }
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
  return { a: _sei('view', 'view'), b: _s(_ses('view')) }
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view id="view" style="color:red" :style="{color:'blue'}"/>`,
      `<view id="view" style="{{'color:red' + ';' + $eS[a]}}"/>`,
      `(_ctx, _cache) => {
  return { a: _sei('view', 'view'), b: _s(_ses('view', { color: 'blue' })) }
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view v-for="item in 10" id="view" style="color:red"/>`,
      `<view wx:for="{{a}}" wx:for-item="item" id="view" style="{{'color:red' + ';' + $eS[b]}}"/>`,
      `(_ctx, _cache) => {
  return { a: _f(10, (item, k0, i0) => { return {}; }), b: _sei('view', 'view'), c: _s(_ses('view')) }
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
  return { a: _sei(_ctx.viewId, 'view'), b: _s(_ses(_ctx.viewId)) }
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view v-for="item in 10" :id="viewId"/>`,
      `<view wx:for="{{a}}" wx:for-item="item" id="{{b}}" style="{{$eS[b]}}"/>`,
      `(_ctx, _cache) => {
  return { a: _f(10, (item, k0, i0) => { return {}; }), b: _sei(_ctx.viewId, 'view'), c: _s(_ses(_ctx.viewId)) }
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view v-for="item in 10" :id="viewId+'_'+item"/>`,
      `<view wx:for="{{a}}" wx:for-item="item" id="{{item.a}}" style="{{$eS[item.a]}}"/>`,
      `(_ctx, _cache) => {
  return { a: _f(10, (item, k0, i0) => { return { a: _sei(_ctx.viewId + '_' + item, 'view'), b: _s(_ses(_ctx.viewId + '_' + item)) }; }) }
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
  return { a: _sei(_ctx.viewId, 'view'), b: _s(_ses(_ctx.viewId, { color: 'red' })) }
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view v-for="item in 10" :id="viewId" :style="style"/>`,
      `<view wx:for="{{a}}" wx:for-item="item" id="{{b}}" style="{{$eS[b]}}"/>`,
      `(_ctx, _cache) => {
  return { a: _f(10, (item, k0, i0) => { return {}; }), b: _sei(_ctx.viewId, 'view'), c: _s(_ses(_ctx.viewId, _ctx.style)) }
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view v-for="item in 10" :id="viewId+'_'+item" :style="item.style"/>`,
      `<view wx:for="{{a}}" wx:for-item="item" id="{{item.a}}" style="{{$eS[item.a]}}"/>`,
      `(_ctx, _cache) => {
  return { a: _f(10, (item, k0, i0) => { return { a: _sei(_ctx.viewId + '_' + item, 'view'), b: _s(_ses(_ctx.viewId + '_' + item, item.style)) }; }) }
}`,
      {
        isX: true,
      }
    )
  })
  test('static ref', () => {
    assert(
      `<view ref="view" style="color:red"/>`,
      `<view ref="view" id="2a9ec0b0-r0" style="{{'color:red' + ';' + $eS[a]}}"/>`,
      `(_ctx, _cache) => {
  return { a: _sei('2a9ec0b0-r0', 'view', 'view'), b: _s(_ses('2a9ec0b0-r0')) }
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view v-for="item in 10" ref="view"/>`,
      `<view wx:for="{{a}}" wx:for-item="item" ref="view" id="{{item.a}}" style="{{$eS[item.a]}}"/>`,
      `(_ctx, _cache) => {
  return { a: _f(10, (item, k0, i0) => { return { a: _sei('2a9ec0b0-r0-' + k0, 'view', 'view', { "f": 1 }), b: _s(_ses('2a9ec0b0-r0-' + k0)) }; }) }
}`,
      {
        isX: true,
      }
    )
    assert(
      `<view v-for="item in 10" ref="v0"><view v-for="item in 10" ref="v1"/></view>`,
      `<view wx:for="{{a}}" wx:for-item="item" ref="v0" id="{{item.b}}" style="{{$eS[item.b]}}"><view wx:for="{{item.a}}" wx:for-item="item" ref="v1" id="{{item.a}}" style="{{$eS[item.a]}}"/></view>`,
      `(_ctx, _cache) => {
  return { a: _f(10, (item, k0, i0) => { return { a: _f(10, (item, k1, i1) => { return { a: _sei('2a9ec0b0-r0-' + k1 + '-' + k0, 'view', 'v1', { "f": 1 }), b: _s(_ses('2a9ec0b0-r0-' + k1 + '-' + k0)) }; }), b: _sei('2a9ec0b0-r1-' + k0, 'view', 'v0', { "f": 1 }), c: _s(_ses('2a9ec0b0-r1-' + k0)) }; }) }
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
  return { a: _sei('view', 'view') }
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
  return { a: _f(10, (item, k0, i0) => { return {}; }), b: _sei('view', 'view') }
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
  return { a: _sei('view', 'view') }
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
  return { a: _sei('view', 'view') }
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
  return { a: _f(10, (item, k0, i0) => { return {}; }), b: _sei('view', 'view') }
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
  return { a: _sei(_ctx.viewId, 'view') }
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
  return { a: _f(10, (item, k0, i0) => { return {}; }), b: _sei(_ctx.viewId, 'view') }
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
  return { a: _f(10, (item, k0, i0) => { return { a: _sei(_ctx.viewId + '_' + item, 'view') }; }) }
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
      `<view ref="view" style="color:red" id="2a9ec0b0-r0" change:eS="{{uV.sS}}" eS="{{$eS[a]}}"/>`,
      `(_ctx, _cache) => {
  return { a: _sei('2a9ec0b0-r0', 'view', 'view') }
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
  return { a: _f(10, (item, k0, i0) => { return { a: _sei('2a9ec0b0-r0-' + k0, 'view', 'view', { "f": 1 }) }; }) }
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
  return { a: _f(10, (item, k0, i0) => { return { a: _f(10, (item, k1, i1) => { return { a: _sei('2a9ec0b0-r0-' + k1 + '-' + k0, 'view', 'v1', { "f": 1 }) }; }), b: _sei('2a9ec0b0-r1-' + k0, 'view', 'v0', { "f": 1 }) }; }) }
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
