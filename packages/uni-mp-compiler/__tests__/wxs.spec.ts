import { assert } from './testUtils'

describe('compiler: transform wxs', () => {
  test('basic', () => {
    assert(
      `<view :data-threshold="threshold" :change:prop="swipe.showWatch" :prop="is_show" @touchstart="swipe.touchstart">{{swipe.message}}</view>`,
      `<view data-threshold="{{a}}" change:prop="{{swipe.showWatch}}" prop="{{b}}" bindtouchstart="{{swipe.touchstart}}">{{swipe.message}}</view>`,
      `(_ctx, _cache) => {
  return { a: _ctx.threshold, b: _ctx.is_show }
}`,
      {
        filters: ['swipe'],
        cacheHandlers: true,
      }
    )
  })
  test('cacheHandlers', () => {
    assert(
      `<view :data-threshold="threshold" :change:prop="swipe.showWatch" :prop="is_show" @touchstart="swipe.touchstart"/>`,
      `<view data-threshold="{{a}}" change:prop="{{swipe.showWatch}}" prop="{{b}}" bindtouchstart="{{swipe.touchstart}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.threshold, b: _ctx.is_show }
}`,
      {
        filters: ['swipe'],
        cacheHandlers: true,
      }
    )
  })
  test('v-if', () => {
    assert(
      `<view v-if="test.aa()">123</view>`,
      `<view wx:if="{{test.aa()}}">123</view>`,
      `(_ctx, _cache) => {
  return {}
}`,
      {
        filters: ['test'],
      }
    )
    assert(
      `<view v-if="test.aa()">{{msg}}</view>`,
      `<view wx:if="{{test.aa()}}">{{a}}</view>`,
      `(_ctx, _cache) => {
  return { ...{ a: _t(_ctx.msg) } }
}`,
      {
        filters: ['test'],
      }
    )
  })
  test('v-if + v-else', () => {
    assert(
      `<view v-if="test.aa()">{{foo}}</view><view v-else>{{bar}}</view>`,
      `<view wx:if="{{test.aa()}}">{{a}}</view><view wx:else>{{b}}</view>`,
      `(_ctx, _cache) => {
  return { ...{ a: _t(_ctx.foo) }, ...{ b: _t(_ctx.bar) } }
}`,
      {
        filters: ['test'],
      }
    )
  })
  test('v-if + v-else-if + v-else', () => {
    assert(
      `<view v-if="test.aa()">{{foo}}</view><view v-else-if="test.bb()">{{foo}}</view><view v-else>{{bar}}</view>`,
      `<view wx:if="{{test.aa()}}">{{a}}</view><view wx:elif="{{test.bb()}}">{{b}}</view><view wx:else>{{c}}</view>`,
      `(_ctx, _cache) => {
  return { ...{ a: _t(_ctx.foo) }, ...{ ...{ b: _t(_ctx.foo) }, ...{ c: _t(_ctx.bar) } } }
}`,
      {
        filters: ['test'],
      }
    )
  })
  test('class', () => {
    assert(
      `<view :class="utils.fc('classA')" class="classB"><view :class="pc('classC')"><text :class="utils.fc('classD')">Hello</text></view></view>`,
      `<view class="{{[utils.fc('classA'), 'classB']}}"><view class="{{a}}"><text class="{{utils.fc('classD')}}">Hello</text></view></view>`,
      `(_ctx, _cache) => {
  return { a: _n(_ctx.pc('classC')) }
}`,
      {
        filters: ['utils'],
      }
    )
    assert(
      `<view :class="utils.fc('classA')" class="classB">Hello</view><text :class="pc('classC')">World</text><view :class="utils.fc('classD')">!</view>`,
      `<view class="{{[utils.fc('classA'), 'classB']}}">Hello</view><text class="{{a}}">World</text><view class="{{utils.fc('classD')}}">!</view>`,
      `(_ctx, _cache) => {
  return { a: _n(_ctx.pc('classC')) }
}`,
      {
        filters: ['utils'],
      }
    )
    assert(
      `<view :class="{[utils.fc('checked')]: checked, [utils.fc('disabled')]: disabled, readonly: readonly}" class="classB"/>`,
      `<view class="{{[a && utils.fc('checked'), b && utils.fc('disabled'), c && 'readonly', 'classB']}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.checked ? 1 : '', b: _ctx.disabled ? 1 : '', c: _ctx.readonly ? 1 : '' }
}`,
      {
        filters: ['utils'],
      }
    )
  })
  test('style', () => {
    assert(
      `<view :style="utils.fs('styleA')" style="color: green">Hello</view><view :style="ps('styleB')">World</view><view :style="utils.fs('styleB')">Test</view>`,
      `<view style="{{utils.fs('styleA') + ';' + 'color:green'}}">Hello</view><view style="{{a}}">World</view><view style="{{utils.fs('styleB')}}">Test</view>`,
      `(_ctx, _cache) => {
  return { a: _s(_ctx.ps('styleB')) }
}`,
      {
        filters: ['utils'],
      }
    )
    assert(
      `<view :style="utils.fs('styleA')" style="color: green"><view :style="ps('styleB')"><view :style="utils.fs('styleB')">Hello</view></view></view>`,
      `<view style="{{utils.fs('styleA') + ';' + 'color:green'}}"><view style="{{a}}"><view style="{{utils.fs('styleB')}}">Hello</view></view></view>`,
      `(_ctx, _cache) => {
  return { a: _s(_ctx.ps('styleB')) }
}`,
      {
        filters: ['utils'],
      }
    )
    assert(
      `<view :style="{'font-size': utils.fs('15px'), 'background': utils.fs('red')}" style="color: green">Hello</view>`,
      `<view style="{{'font-size:' + utils.fs('15px') + ';' + ('background:' + utils.fs('red')) + ';' + 'color:green'}}">Hello</view>`,
      `(_ctx, _cache) => {
  return {}
}`,
      {
        filters: ['utils'],
      }
    )
  })
})
