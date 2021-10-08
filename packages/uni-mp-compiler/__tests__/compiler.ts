import { compile } from '../src/index'

function assert(template: string, templateCode: string, renderCode: string) {
  const res = compile(template, {
    filename: 'foo.vue',
    prefixIdentifiers: true,
    inline: true,
    emitFile({ source }) {
      // console.log(source)
      expect(source).toBe(templateCode)
      return ''
    },
  })
  // expect(res.template).toBe(templateCode)
  // expect(res.code).toBe(renderCode)
  // console.log(require('util').inspect(res.code, { colors: true, depth: null }))
  // console.log(require('util').inspect(res, { colors: true, depth: null }))
  expect(res.code).toBe(renderCode)
}

describe('compiler', () => {
  test(`v-for directive`, () => {
    assert(
      `<view><view v-for="item in items" :key="item.uid" :data-title="data.title" :data-id="item.id">{{item.title}}</view></view>`,
      `<view><view wx:for="{{b}}" wx:for-item="item" wx:key="b" data-title="{{a}}" data-id="{{item.c}}">{{item.a}}</view></view>`,
      `(_ctx, _cache) => {
return {
  a: _ctx.data.title,
  b: vFor(_ctx.items, item => {
    return {
      a: item.title,
      b: item.uid,
      c: item.id
    };
  })
}
}`
    )
  })
  test(`v-for directive with key`, () => {
    assert(
      `<view><view v-for="(item, i) in items" :data-id="item.id">{{item.title}}</view></view>`,
      `<view><view wx:for="{{a}}" wx:for-item="item" wx:for-index="i" data-id="{{item.b}}">{{item.a}}</view></view>`,
      `(_ctx, _cache) => {
return {
  a: vFor(_ctx.items, (item, i) => {
    return {
      a: item.title,
      b: item.id
    };
  })
}
}`
    )
  })
  test(`generate v-for with v-if`, () => {
    assert(
      `<view v-for="item in items"><view v-if="item.show">{{item.title}}</view></view>`,
      `<view wx:for="{{a}}" wx:for-item="item"><view wx:if="{{item.b}}">{{item.a}}</view></view>`,
      `(_ctx, _cache) => {
return {
  a: vFor(_ctx.items, item => {
    return {
      b: item.show,
      ...(item.show ? {
        a: item.title
      } : {})
    };
  })
}
}`
    )
  })
  test(`generate v-if directive`, () => {
    assert(
      `<view v-if="show">hello</view>`,
      `<view wx:if="{{a}}">hello</view>`,
      `(_ctx, _cache) => {
return {
  a: _ctx.show,
  ...(_ctx.show ? {} : {})
}
}`
    )
  })
  test(`generate v-else directive`, () => {
    assert(
      `<view><view v-if="show">hello</view><view v-else>world</view></view>`,
      `<view><view wx:if="{{a}}">hello</view><view wx:else>world</view></view>`,
      `(_ctx, _cache) => {
return {
  a: _ctx.show,
  ...(_ctx.show ? {} : {})
}
}`
    )
  })
  test(`generate v-else-if directive`, () => {
    assert(
      `<view><view v-if="show">hello</view><view v-else-if="hide">world</view></view>`,
      `<view><view wx:if="{{a}}">hello</view><view wx:elif="{{b}}">world</view></view>`,
      `(_ctx, _cache) => {
return {
  a: _ctx.show,
  ...(_ctx.show ? {} : _ctx.hide ? {} : {}),
  b: _ctx.hide
}
}`
    )
  })
  test(`generate v-else-if with v-else directive`, () => {
    assert(
      `<view><view v-if="show">hello</view><view v-else-if="hide">world</view><view v-else>bye</view></view>`,
      `<view><view wx:if="{{a}}">hello</view><view wx:elif="{{b}}">world</view><view wx:else>bye</view></view>`,
      `(_ctx, _cache) => {
return {
  a: _ctx.show,
  ...(_ctx.show ? {} : _ctx.hide ? {} : {}),
  b: _ctx.hide
}
}`
    )
  })
  test(`generate multi v-else-if with v-else directive`, () => {
    assert(
      `<view><view v-if="show">hello</view><view v-else-if="hide">world</view><view v-else-if="3">elseif</view><view v-else>bye</view></view>`,
      `<view><view wx:if="{{a}}">hello</view><view wx:elif="{{b}}">world</view><view wx:elif="{{3}}">elseif</view><view wx:else>bye</view></view>`,
      `(_ctx, _cache) => {
return {
  a: _ctx.show,
  ...(_ctx.show ? {} : _ctx.hide ? {} : 3 ? {} : {}),
  b: _ctx.hide
}
}`
    )
  })
})
