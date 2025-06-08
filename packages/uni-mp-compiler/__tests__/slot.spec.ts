import { assert } from './testUtils'

describe('compiler: transform slot', () => {
  test('basic', () => {
    assert(
      `<button><slot/></button>`,
      `<button><slot/></button>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<button><slot name="default"/></button>`,
      `<button><slot/></button>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('dynamic', () => {
    assert(
      `<button><slot :name="name"/></button>`,
      `<button><slot name="{{a}}"/></button>`,
      `(_ctx, _cache) => {
  return { a: _d(_ctx.name) }
}`
    )
    assert(
      `<button><slot :name="'title'+index" :content="{name:'name1'}"></slot></button>`,
      `<button><slot name="{{a}}"></slot></button>`,
      `(_ctx, _cache) => {
  return { a: _d('title' + _ctx.index), b: _r(_d('title' + _ctx.index), { content: { name: 'name1' } }) }
}`
    )
    assert(
      `<view v-for="(item,index) in 3" :key="index"><slot :name="'title'+index" :content="{name:'name'+index}"></slot></view>`,
      `<view wx:for="{{a}}" wx:for-item="item" wx:key="c"><slot name="{{item.a}}"></slot></view>`,
      `(_ctx, _cache) => {
  return { a: _f(3, (item, index, i0) => { return { a: _d('title' + index + '-' + i0), b: _r(_d('title' + index), { content: { name: 'name' + index } }, i0), c: index }; }) }
}`
    )
    assert(
      `<view v-for="(item,index) in 3" :key="index"><slot :name="item.slot" :content="{name:'name'+index}"></slot></view>`,
      `<view wx:for="{{a}}" wx:for-item="item" wx:key="c"><slot name="{{item.a}}"></slot></view>`,
      `(_ctx, _cache) => {
  return { a: _f(3, (item, index, i0) => { return { a: _d(item.slot), b: _r(_d(item.slot), { content: { name: 'name' + index } }, i0), c: index }; }) }
}`
    )
  })
  test('fallback content', () => {
    assert(
      `<button><slot>Submit</slot></button>`,
      `<button><block wx:if="{{$slots.d}}"><slot></slot></block><block wx:else>Submit</block></button>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('fallback content with prop', () => {
    assert(
      `<button><slot :foo="foo">Submit</slot></button>`,
      `<button><block wx:if="{{$slots.d}}"><slot name="d"></slot><slot/></block><block wx:else>Submit</block></button>`,
      `(_ctx, _cache) => {
  return { a: _r("d", { foo: _ctx.foo }) }
}`
    )
  })
  test('names slots', () => {
    assert(
      `<button><slot name="text"/></button>`,
      `<button><slot name="text"/></button>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('names slots with fallback content 带横线', () => {
    assert(
      `<button><slot name="text-name">Submit</slot></button>`,
      `<button><block wx:if="{{$slots['text-name']}}"><slot name="text-name"></slot></block><block wx:else>Submit</block></button>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })

  test('names slots with fallback content', () => {
    assert(
      `<button><slot name="text">Submit</slot></button>`,
      `<button><block wx:if="{{$slots.text}}"><slot name="text"></slot></block><block wx:else>Submit</block></button>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })

  test('names slots with fallback content name start with number', () => {
    assert(
      `<button><slot name="1A">Submit</slot></button>`,
      `<button><block wx:if=\"{{$slots['1A']}}\"><slot name=\"1A\"></slot></block><block wx:else>Submit</block></button>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })

  test('names slots with fallback content name is number', () => {
    assert(
      `<button><slot name="1">Submit</slot></button>`,
      `<button><block wx:if=\"{{$slots['1']}}\"><slot name=\"1\"></slot></block><block wx:else>Submit</block></button>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })

  test('slot with component', () => {
    assert(
      `<view><custom><slot><view>fallback</view></slot></custom></view>`,
      `<view><custom u-s="{{['d']}}" u-i="2a9ec0b0-0"><block wx:if="{{$slots.d}}"><slot></slot></block><block wx:else><view>fallback</view></block></custom></view>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('slot with v-if', () => {
    assert(
      `<slot v-if="header" name="header"/><slot v-else-if="body" name="body"/><slot v-else name="footer"/>`,
      `<slot wx:if="{{a}}" name="header"/><slot wx:elif="{{b}}" name="body"/><slot wx:else name="footer"/>`,
      `(_ctx, _cache) => {
  return _e({ a: _ctx.header }, _ctx.header ? {} : _ctx.body ? {} : {}, { b: _ctx.body })
}`
    )
    assert(
      `<slot v-if="header" name="header"><view>header</view></slot><slot v-else-if="body" name="body"><view>body</view></slot><slot v-else name="footer"><view>footer</view></slot>`,
      `<block wx:if="{{a}}"><block wx:if="{{$slots.header}}"><slot name="header"></slot></block><block wx:else><view>header</view></block></block><block wx:elif="{{b}}"><block wx:if="{{$slots.body}}"><slot name="body"></slot></block><block wx:else><view>body</view></block></block><block wx:else><block wx:if="{{$slots.footer}}"><slot name="footer"></slot></block><block wx:else><view>footer</view></block></block>`,
      `(_ctx, _cache) => {
  return _e({ a: _ctx.header }, _ctx.header ? {} : _ctx.body ? {} : {}, { b: _ctx.body })
}`
    )
  })
  test('slot with v-for', () => {
    assert(
      `<slot v-for="(item,index) in items" :key="index"></slot>`,
      `<slot wx:for="{{a}}" wx:for-item="item" name="{{item.a}}"></slot>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, index, i0) => { return { a: "d-" + i0, b: _r("d", { key: index }, i0) }; }) }
}`
    )
    assert(
      `<slot v-for="(item,index) in items" :key="index" name="test"></slot>`,
      `<slot wx:for="{{a}}" wx:for-item="item" name="{{item.a}}"></slot>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, index, i0) => { return { a: "test-" + i0, b: _r("test", { key: index }, i0) }; }) }
}`
    )
  })
  test('slot with v-for + v-for', () => {
    assert(
      `<view v-for="(item,index) in items" :key="index"><slot v-for="(item1,index1) in item.list" :key="index1"></slot></view>`,
      `<view wx:for="{{a}}" wx:for-item="item" wx:key="b"><slot wx:for="{{item.a}}" wx:for-item="item1" name="{{item1.a}}"></slot></view>`,
      `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, index, i0) => { return { a: _f(item.list, (item1, index1, i1) => { return { a: "d-" + i0 + '-' + i1, b: _r("d", { key: index1 }, i0 + '-' + i1) }; }), b: index }; }) }
}`
    )
  })
})
