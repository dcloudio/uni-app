import { assert } from './testUtils'

describe('compiler: transform v-pre', () => {
  test('preserves platform tag and scope transforms', () => {
    assert(
      `<div v-pre>hello</div>`,
      `<view class="data-v-pre">hello</view>`,
      `(_ctx, _cache) => {
  return {}
}`,
      { scopeId: 'data-v-pre' }
    )
  })

  test('interpolation is emitted as text', () => {
    assert(
      `<view v-pre>{{ message }}</view>`,
      `<view>{{'{{'}} message {{'}}'}}</view>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })

  test('nested content is emitted as text', () => {
    assert(
      `<view v-pre>hello {{ message }}<text>{{ name }}</text></view>`,
      `<view>hello {{'{{'}} message {{'}}'}}<text>{{'{{'}} name {{'}}'}}</text></view>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })

  test('single braces and mixed text are emitted as text', () => {
    assert(
      `<view v-pre>{ value } / {{ message }}</view>`,
      `<view>{{'{'}} value {{'}'}} / {{'{{'}} message {{'}}'}}</view>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })

  test('static attributes are preserved and brace values stay literal', () => {
    assert(
      `<view v-pre class="code" data-value="{{ value }}">{{ message }}</view>`,
      `<view class="code" data-value="{{'{{'}} value {{'}}'}}">{{'{{'}} message {{'}}'}}</view>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })

  test('self-closing elements preserve static attributes', () => {
    assert(
      `<view v-pre class="code"/>`,
      `<view class="code"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })

  test('only the v-pre subtree is skipped', () => {
    assert(
      `<view><text v-pre>{{ skipped }}</text><text>{{ rendered }}</text></view>`,
      `<view><text>{{'{{'}} skipped {{'}}'}}</text><text>{{a}}</text></view>`,
      `(_ctx, _cache) => {
  return { a: _t(_ctx.rendered) }
}`
    )
  })

  test('directives inside v-pre are ignored', () => {
    assert(
      `<view v-pre v-if="visible"><text v-for="item in items">{{ item }}</text></view>`,
      `<view><text>{{'{{'}} item {{'}}'}}</text></view>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })

  test('works in uni-app-x mode', () => {
    assert(
      `<view v-pre>{{ message }}</view>`,
      `<view>{{'{{'}} message {{'}}'}}</view>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = {}
  return __returned__
}`,
      { isX: true }
    )
  })

  test('escapes X-mode whitespace in v-pre interpolation', () => {
    assert(
      `<view v-pre>{{ message\u2009 }}</view>`,
      `<view>{{'{{'}} message&thinsp; {{'}}'}}</view>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = {}
  return __returned__
}`,
      { isX: true }
    )
  })
})
