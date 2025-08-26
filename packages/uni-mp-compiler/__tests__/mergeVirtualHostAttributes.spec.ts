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

describe('complier: options with mergeVirtualHostAttributes', () => {
  test('root node with mergeVirtualHostAttributes', () => {
    assert(
      `<image/>`,
      `<image class=\"{{[virtualHostClass]}}\" style=\"{{virtualHostStyle}}\" hidden=\"{{virtualHostHidden || false}}\" id=\"{{a}}\"/>`,
      `(_ctx, _cache) => {
  return { a: _gei(_ctx, '') }
}`,
      options
    )
    assert(
      `<view><image/></view>`,
      `<view class=\"{{[virtualHostClass]}}\" style=\"{{virtualHostStyle}}\" hidden=\"{{virtualHostHidden || false}}\" id=\"{{a}}\"><image/></view>`,
      `(_ctx, _cache) => {
  return { a: _gei(_ctx, '') }
}`,
      options
    )
    assert(
      `<view ref="page"><image ref="img" /></view>`,
      `<view ref=\"page\" style=\"{{$eS[c] + ';' + (virtualHostStyle || '')}}\" id=\"{{c}}\" class=\"{{[virtualHostClass]}}\" hidden=\"{{virtualHostHidden || false}}\"><image ref=\"img\" id=\"r0-2a9ec0b0\" style=\"{{$eS[a]}}\"/></view>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _sei('r0-2a9ec0b0', 'image', 'img'), b: _s(_ses('r0-2a9ec0b0')), c: _sei(_gei(_ctx, '', 'r1-2a9ec0b0'), 'view', 'page'), d: _s(_ses(_gei(_ctx, '', 'r1-2a9ec0b0'), { '--status-bar-height': \`\${_ctx.u_s_b_h}px\` })) }
  return __returned__
}`,
      optionsX
    )
  })
  test('root node style with mergeVirtualHostAttributes', () => {
    assert(
      `<image style="width:100%"/>`,
      `<image class=\"{{[virtualHostClass]}}\" style=\"{{'width:100%' + ';' + (virtualHostStyle || '')}}\" hidden=\"{{virtualHostHidden || false}}\" id=\"{{a}}\"/>`,
      `(_ctx, _cache) => {
  return { a: _gei(_ctx, '') }
}`,
      options
    )
    assert(
      `<image :style="style"/>`,
      `<image style="{{a + ';' + (virtualHostStyle || '')}}" class="{{[virtualHostClass]}}" hidden="{{virtualHostHidden || false}}" id="{{b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _s(_ctx.style), b: _gei(_ctx, '') }
}`,
      options
    )
    assert(
      `<image style="width:100%" :style="style"/>`,
      `<image style="{{'width:100%' + ';' + a + ';' + (virtualHostStyle || '')}}" class="{{[virtualHostClass]}}" hidden="{{virtualHostHidden || false}}" id="{{b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _s(_ctx.style), b: _gei(_ctx, '') }
}`,
      options
    )
  })
  test('root node class with mergeVirtualHostAttributes', () => {
    assert(
      `<image class="class1"/>`,
      `<image class=\"{{['class1', virtualHostClass]}}\" style=\"{{virtualHostStyle}}\" hidden=\"{{virtualHostHidden || false}}\" id=\"{{a}}\"/>`,
      `(_ctx, _cache) => {
  return { a: _gei(_ctx, '') }
}`,
      options
    )
    assert(
      `<image :class="class1"/>`,
      `<image class="{{[a, virtualHostClass]}}" style="{{virtualHostStyle}}" hidden="{{virtualHostHidden || false}}" id="{{b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _n(_ctx.class1), b: _gei(_ctx, '') }
}`,
      options
    )
    assert(
      `<image class="class1" :class="class1"/>`,
      `<image class="{{['class1', a, virtualHostClass]}}" style="{{virtualHostStyle}}" hidden="{{virtualHostHidden || false}}" id="{{b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _n(_ctx.class1), b: _gei(_ctx, '') }
}`,
      options
    )
  })
  test('root node hidden with mergeVirtualHostAttributes', () => {
    assert(
      `<image :hidden="hidden"/>`,
      `<image hidden=\"{{(virtualHostHidden === undefined ? a : virtualHostHidden) || false}}\" class=\"{{[virtualHostClass]}}\" style=\"{{virtualHostStyle}}\" id=\"{{b}}\"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.hidden, b: _gei(_ctx, '') }
}`,
      options
    )
    assert(
      `<image :hidden="!show"/>`,
      `<image hidden=\"{{(virtualHostHidden === undefined ? a : virtualHostHidden) || false}}\" class=\"{{[virtualHostClass]}}\" style=\"{{virtualHostStyle}}\" id=\"{{b}}\"/>`,
      `(_ctx, _cache) => {
  return { a: !_ctx.show, b: _gei(_ctx, '') }
}`,
      options
    )
    assert(
      `<image :hidden="false"/>`,
      `<image hidden=\"{{(virtualHostHidden === undefined ? false : virtualHostHidden) || false}}\" class=\"{{[virtualHostClass]}}\" style=\"{{virtualHostStyle}}\" id=\"{{a}}\"/>`,
      `(_ctx, _cache) => {
  return { a: _gei(_ctx, '') }
}`,
      options
    )
    assert(
      `<image hidden/>`,
      `<image class="{{[virtualHostClass]}}" style="{{virtualHostStyle}}" hidden="{{(virtualHostHidden === undefined ? true : virtualHostHidden) || false}}" id="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _gei(_ctx, '') }
}`,
      options
    )
    assert(
      `<image v-show="show"/>`,
      `<image class=\"{{[virtualHostClass]}}\" style=\"{{virtualHostStyle}}\" hidden=\"{{(virtualHostHidden === undefined ? !a : virtualHostHidden) || false}}\" id=\"{{b}}\"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.show, b: _gei(_ctx, '') }
}`,
      options
    )
  })
  test('root node id with mergeVirtualHostAttributes', () => {
    assert(
      `<image id="id1"/>`,
      `<image class=\"{{[virtualHostClass]}}\" style=\"{{virtualHostStyle}}\" hidden=\"{{virtualHostHidden || false}}\" id=\"{{a}}\"/>`,
      `(_ctx, _cache) => {
  return { a: _gei(_ctx, 'id1') }
}`,
      options
    )
    assert(
      `<image :id="id1"/>`,
      `<image id=\"{{a}}\" class=\"{{[virtualHostClass]}}\" style=\"{{virtualHostStyle}}\" hidden=\"{{virtualHostHidden || false}}\"/>`,
      `(_ctx, _cache) => {
  return { a: _gei(_ctx, _ctx.id1) }
}`,
      options
    )
    assert(
      `<image id="id1" :id="id1"/>`,
      `<image id=\"{{a}}\" class=\"{{[virtualHostClass]}}\" style=\"{{virtualHostStyle}}\" hidden=\"{{virtualHostHidden || false}}\"/>`,
      `(_ctx, _cache) => {
  return { a: _gei(_ctx, 'id1') }
}`,
      options
    )
    assert(
      `<view :id="id1"></view>`,
      `<view id=\"{{a}}\" style=\"{{$eS[a] + ';' + (virtualHostStyle || '')}}\" class=\"{{[virtualHostClass]}}\" hidden=\"{{virtualHostHidden || false}}\"></view>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _sei(_gei(_ctx, _ctx.id1), 'view'), b: _s(_ses(_gei(_ctx, _ctx.id1), { '--status-bar-height': \`\${_ctx.u_s_b_h}px\` })) }
  return __returned__
}`,
      optionsX
    )
    assert(
      `<view id="page"><image ref="img" /></view>`,
      `<view style=\"{{$eS[c] + ';' + (virtualHostStyle || '')}}\" id=\"{{c}}\" class=\"{{[virtualHostClass]}}\" hidden=\"{{virtualHostHidden || false}}\"><image ref=\"img\" id=\"r0-2a9ec0b0\" style=\"{{$eS[a]}}\"/></view>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _sei('r0-2a9ec0b0', 'image', 'img'), b: _s(_ses('r0-2a9ec0b0')), c: _sei(_gei(_ctx, 'page'), 'view'), d: _s(_ses(_gei(_ctx, 'page'), { '--status-bar-height': \`\${_ctx.u_s_b_h}px\` })) }
  return __returned__
}`,
      optionsX
    )
    assert(
      `<view id="page" ref="page"><image ref="img" /></view>`,
      `<view ref=\"page\" style=\"{{$eS[c] + ';' + (virtualHostStyle || '')}}\" id=\"{{c}}\" class=\"{{[virtualHostClass]}}\" hidden=\"{{virtualHostHidden || false}}\"><image ref=\"img\" id=\"r0-2a9ec0b0\" style=\"{{$eS[a]}}\"/></view>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _sei('r0-2a9ec0b0', 'image', 'img'), b: _s(_ses('r0-2a9ec0b0')), c: _sei(_gei(_ctx, 'page', 'r1-2a9ec0b0'), 'view', 'page'), d: _s(_ses(_gei(_ctx, 'page', 'r1-2a9ec0b0'), { '--status-bar-height': \`\${_ctx.u_s_b_h}px\` })) }
  return __returned__
}`,
      optionsX
    )
  })
  test('user component attrs with mergeVirtualHostAttributes', () => {
    assert(
      `<view><custom-image/></view>`,
      `<view class=\"{{[virtualHostClass]}}\" style=\"{{virtualHostStyle}}\" hidden=\"{{virtualHostHidden || false}}\" id=\"{{a}}\"><custom-image u-i=\"2a9ec0b0-0\"/></view>`,
      `(_ctx, _cache) => {
  return { a: _gei(_ctx, '') }
}`,
      options
    )
    assert(
      `<view><custom-image v-show="show"/></view>`,
      `<view class=\"{{[virtualHostClass]}}\" style=\"{{virtualHostStyle}}\" hidden=\"{{virtualHostHidden || false}}\" id=\"{{b}}\"><custom-image virtualHostHidden=\"{{!a}}\" hidden=\"{{!a}}\" u-i=\"2a9ec0b0-0\"/></view>`,
      `(_ctx, _cache) => {
  return { a: _ctx.show, b: _gei(_ctx, '') }
}`,
      options
    )
    assert(
      `<view><custom-image id="i"/></view>`,
      `<view class=\"{{[virtualHostClass]}}\" style=\"{{virtualHostStyle}}\" hidden=\"{{virtualHostHidden || false}}\" id=\"{{b}}\"><custom-image id=\"i\" virtualHostId=\"i\" u-i=\"2a9ec0b0-0\" u-p=\"{{a||''}}\"/></view>`,
      `(_ctx, _cache) => {
  return { a: _p({ id: 'i' }), b: _gei(_ctx, '') }
}`,
      options
    )
    assert(
      `<view><custom-image :id="i"/></view>`,
      `<view class=\"{{[virtualHostClass]}}\" style=\"{{virtualHostStyle}}\" hidden=\"{{virtualHostHidden || false}}\" id=\"{{c}}\"><custom-image id=\"{{a}}\" virtualHostId=\"{{a}}\" u-i=\"2a9ec0b0-0\" u-p=\"{{b||''}}\"/></view>`,
      `(_ctx, _cache) => {
  return { a: _ctx.i, b: _p({ id: _ctx.i }), c: _gei(_ctx, '') }
}`,
      options
    )
    assert(
      `<custom-view v-show="show"><image /></custom-view>`,
      `<custom-view u-s=\"{{['d']}}\" u-i=\"2a9ec0b0-0\" class=\"{{[virtualHostClass]}}\" virtualHostClass=\"{{[virtualHostClass]}}\" style=\"{{virtualHostStyle}}\" virtualHostStyle=\"{{virtualHostStyle}}\" hidden=\"{{(virtualHostHidden === undefined ? !a : virtualHostHidden) || false}}\" virtualHostHidden=\"{{(virtualHostHidden === undefined ? !a : virtualHostHidden) || false}}\" id=\"{{b}}\" virtualHostId=\"{{b}}\"><image/></custom-view>`,
      `(_ctx, _cache) => {
  return { a: _ctx.show, b: _gei(_ctx, '') }
}`,
      options
    )
    assert(
      `<view><custom-image class="class1" style="width:100%"/></view>`,
      `<view class=\"{{[virtualHostClass]}}\" style=\"{{virtualHostStyle}}\" hidden=\"{{virtualHostHidden || false}}\" id=\"{{a}}\"><custom-image class=\"class1\" virtualHostClass=\"class1\" style=\"width:100%\" virtualHostStyle=\"width:100%\" u-i=\"2a9ec0b0-0\"/></view>`,
      `(_ctx, _cache) => {
  return { a: _gei(_ctx, '') }
}`,
      options
    )
    assert(
      `<custom-view><custom-image/></custom-view>`,
      `<custom-view u-s=\"{{['d']}}\" u-i=\"2a9ec0b0-0\" class=\"{{[virtualHostClass]}}\" virtualHostClass=\"{{[virtualHostClass]}}\" style=\"{{virtualHostStyle}}\" virtualHostStyle=\"{{virtualHostStyle}}\" hidden=\"{{virtualHostHidden || false}}\" virtualHostHidden=\"{{virtualHostHidden || false}}\" id=\"{{a}}\" virtualHostId=\"{{a}}\"><custom-image u-i=\"2a9ec0b0-1,2a9ec0b0-0\"/></custom-view>`,
      `(_ctx, _cache) => {
  return { a: _gei(_ctx, '') }
}`,
      options
    )
  })
})
