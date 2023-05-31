import { assert } from '../testUtils'

describe('compiler:v-bind', () => {
  test('basic', () => {
    assert(
      `<view v-bind:id="id"/>`,
      `createElementVNode("view", new Map<string, any | null>([["id", _ctx.id]]), null, 8 /* PROPS */, ["id"])`
    )
  })
  test('dynamic arg', () => {
    assert(
      `<view v-bind:[id]="id"/>`,
      `createElementVNode("view", normalizeProps(new Map<string, any | null>([[_ctx.id !== null ? _ctx.id : \"\", _ctx.id]])), null, 16 /* FULL_PROPS */)`
    )
  })
  test('.camel modifier', () => {
    assert(
      `<view v-bind:foo-bar.camel="id"/>`,
      `createElementVNode(\"view\", new Map<string, any | null>([[\"fooBar\", _ctx.id]]), null, 8 /* PROPS */, [\"fooBar\"])`
    )
  })
  test('.camel modifier w/ dynamic arg', () => {
    assert(
      `<view v-bind:[foo].camel="id"/>`,
      `createElementVNode(\"view\", normalizeProps(new Map<string, any | null>([[camelize(_ctx.foo !== null ? _ctx.foo : \"\"), _ctx.id]])), null, 16 /* FULL_PROPS */)`
    )
  })
  test('.prop modifier', () => {
    assert(
      `<view v-bind:className.prop="className"/>`,
      `createElementVNode(\"view\", new Map<string, any | null>([[\".className\", _ctx.className]]), null, 8 /* PROPS */, [\".className\"])`
    )
  })
  test('.prop modifier w/ dynamic arg', () => {
    assert(
      `<view v-bind:[fooBar].prop="className"/>`,
      'createElementVNode("view", normalizeProps(new Map<string, any | null>([[`.${_ctx.fooBar !== null ? _ctx.fooBar : ""}`, _ctx.className]])), null, 16 /* FULL_PROPS */)'
    )
  })
  test('.prop modifier (shorthand)', () => {
    assert(
      `<view .className="className"/>`,
      'createElementVNode("view", new Map<string, any | null>([[".className", _ctx.className]]), null, 8 /* PROPS */, [".className"])'
    )
  })
  test('.attr modifier', () => {
    assert(
      `<view v-bind:foo-bar.attr="id"/>`,
      'createElementVNode("view", new Map<string, any | null>([["^foo-bar", _ctx.id]]), null, 8 /* PROPS */, ["^foo-bar"])'
    )
  })
  test('simple expression', () => {
    assert(
      `<view v-bind:class="{'box': true}"></view>`,
      `createElementVNode("view", new Map<string, any | null>([
  ["class", normalizeClass(new Map<string, any | null>([['box', true]]))]
]))`
    )
  })
  test('simple expression with array', () => {
    assert(
      `<view v-bind:class="[classA, {classB: true, classC: false}]"></view>`,
      `createElementVNode("view", new Map<string, any | null>([
  ["class", normalizeClass([_ctx.classA, new Map<string, any | null>([[classB, true],[ classC, false]])])]
]), null, 2 /* CLASS */)`
    )
  })
  test('simple expression with object', () => {
    assert(
      `<view :style="{color: true ? 'blue' : 'red'}"></view>`,
      "createElementVNode(\"view\", new Map<string, any | null>([[\"style\", new Map<string, any | null>([['color', true ? 'blue' : 'red']])]]))"
    )
  })
})
