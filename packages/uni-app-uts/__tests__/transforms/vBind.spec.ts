import { assert } from '../testUtils'

describe('compiler:v-bind', () => {
  test('template v-bind', () => {
    assert(
      `<view v-bind:class="{'box': true}"></view>`,
      `createElementVNode("view", new Map<string,any | null>([
  ["class", normalizeClass(new Map<string,any | null>([['box', true]]))]
]))`
    )
  })
  test('template v-bind shorthand', () => {
    assert(
      `<view :class="['box']"></view>`,
      `createElementVNode("view", new Map<string,any | null>([
  ["class", normalizeClass(['box'])]
]))`
    )
  })
  test('template v-bind with array', () => {
    assert(
      `<view v-bind:class="[classA, {classB: true, classC: false}]"></view>`,
      `createElementVNode("view", new Map<string,any | null>([
  ["class", normalizeClass([_ctx.classA, new Map<string,any | null>([[classB, true],[ classC, false]])])]
]), null, 2 /* CLASS */)`
    )
  })
  test('template v-bind with object', () => {
    assert(
      `<view :style="{color: true ? 'blue' : 'red'}"></view>`,
      "createElementVNode(\"view\", new Map<string,any | null>([[\"style\", new Map<string,any | null>([['color', true ? 'blue' : 'red']])]]))"
    )
  })
})
