import { assert } from '../testUtils'

describe('compiler:v-for', () => {
  test('template v-for', () => {
    assert(
      `<view v-for="item in 10" :key="item">text</view>`,
      `createElementVNode(Fragment, null, renderList(10, (item, _key_, _index_):VNode => {
  return createElementVNode("view", new Map<string,any>([["key", item]]), "text")
}), 64 /* STABLE_FRAGMENT */)`
    )
    assert(
      `<view v-for="(item, index) in [1,2,3]" :key="index">text</view>`,
      `createElementVNode(Fragment, null, renderList([1,2,3], (item, index, _index_):VNode => {
  return createElementVNode("view", new Map<string,any>([["key", index]]), "text")
}), 64 /* STABLE_FRAGMENT */)`
    )
    assert(
      `<view v-for="(item, key, index) in {a:'a',b:'b'}" :key="index">text</view>`,
      `createElementVNode(Fragment, null, renderList({a:'a',b:'b'}, (item, key, index):VNode => {
  return createElementVNode("view", new Map<string,any>([["key", index]]), "text")
}), 64 /* STABLE_FRAGMENT */)`
    )
  })
})
