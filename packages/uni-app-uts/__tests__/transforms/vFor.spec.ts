import { assert } from '../testUtils'

describe('compiler:v-for', () => {
  test('template v-for', () => {
    assert(
      `<text v-for="item in 10" :key="item">text</text>`,
      `createElementVNode(Fragment, null, RenderHelpers.renderList(10, (item, _key_, _index_):VNode => {
  return createElementVNode("text", new Map<string,any>([["key", item]]), "text")
}), 64 /* STABLE_FRAGMENT */)`
    )
    assert(
      `<text v-for="(item, index) in [1,2,3]" :key="index">text</text>`,
      `createElementVNode(Fragment, null, RenderHelpers.renderList([1,2,3], (item, index, _index_):VNode => {
  return createElementVNode("text", new Map<string,any>([["key", index]]), "text")
}), 64 /* STABLE_FRAGMENT */)`
    )
    assert(
      `<text v-for="(item, key, index) in {a:'a',b:'b'}" :key="index">text</text>`,
      `createElementVNode(Fragment, null, RenderHelpers.renderList({a:'a',b:'b'}, (item, key, index):VNode => {
  return createElementVNode("text", new Map<string,any>([["key", index]]), "text")
}), 64 /* STABLE_FRAGMENT */)`
    )
  })
})
