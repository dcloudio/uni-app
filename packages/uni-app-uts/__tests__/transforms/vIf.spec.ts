import { assert } from '../testUtils'

describe('compiler:v-if', () => {
  test('basic v-if', () => {
    assert(
      `<view v-if="ok"/>`,
      `isTrue(_ctx.ok)\n  ? createElementVNode("view", new Map<string, any | null>([["key", 0]]))\n  : createCommentVNode("v-if", true)`
    )
  })
  test('template v-if', () => {
    assert(
      `<template v-if="ok"><view/>hello<text/></template>`,
      `isTrue(_ctx.ok)
  ? createElementVNode(Fragment, new Map<string, any | null>([[\"key\", 0]]), [
      createElementVNode(\"view\"),
      \"hello\",
      createElementVNode(\"text\")
    ], 64 /* STABLE_FRAGMENT */)
  : createCommentVNode(\"v-if\", true)`
    )
  })
  test('component v-if', () => {
    assert(
      `<Component v-if="ok"></Component>`,
      `isTrue(_ctx.ok)
  ? createVNode(_component_Component, new Map<string, any | null>([[\"key\", 0]]))
  : createCommentVNode(\"v-if\", true)`
    )
  })
  test('v-if + v-else', () => {
    assert(
      `
        <view>
          <text v-if="ok"/>
          <text v-else/>
        </view>
      `,
      `createElementVNode("view", null, [
  isTrue(_ctx.ok)
    ? createElementVNode("text", new Map<string, any | null>([["key", 0]]))
    : createElementVNode("text", new Map<string, any | null>([["key", 1]]))
])`
    )
  })
  test('v-if + v-else-if', () => {
    assert(
      `
        <view>
          <text v-if="ok"/>
          <text v-else-if="orNot"/>
          <text v-else/>
        </view>
      `,
      `createElementVNode("view", null, [
  isTrue(_ctx.ok)
    ? createElementVNode("text", new Map<string, any | null>([["key", 0]]))
    : isTrue(_ctx.orNot)
      ? createElementVNode("text", new Map<string, any | null>([["key", 1]]))
      : createElementVNode("text", new Map<string, any | null>([["key", 2]]))
])`
    )
  })
  test('v-if + v-else-if + v-else', () => {
    assert(
      `
        <view>
          <text v-if="ok"/>
          <text v-else-if="orNot">v-else-if</text>
          <text v-else>v-else</text>
        </view>
      `,
      `createElementVNode("view", null, [
  isTrue(_ctx.ok)
    ? createElementVNode("text", new Map<string, any | null>([["key", 0]]))
    : isTrue(_ctx.orNot)
      ? createElementVNode("text", new Map<string, any | null>([["key", 1]]), "v-else-if")
      : createElementVNode("text", new Map<string, any | null>([["key", 2]]), "v-else")
])`
    )
  })
  test('comment between branches', () => {
    assert(
      `
      <view v-if="ok"/>
      <!--foo-->
      <view v-else-if="orNot"/>
      <!--bar-->
      <text v-else>v-else</text>
    `,
      `isTrue(_ctx.ok)
  ? createElementVNode(\"view\", new Map<string, any | null>([[\"key\", 0]]))
  : isTrue(_ctx.orNot)
    ? createElementVNode(\"view\", new Map<string, any | null>([[\"key\", 1]]))
    : createElementVNode(\"text\", new Map<string, any | null>([[\"key\", 2]]), \"v-else\")`
    )
  })
  test('template v-if w/ single <slot/> child', () => {
    assert(
      `<template v-if="ok"><slot/></template>`,
      `isTrue(_ctx.ok)
  ? renderSlot(_ctx.$slots, \"default\", new Map<string, any | null>([[\"key\", 0]]))
  : createCommentVNode(\"v-if\", true)`
    )
  })
  test('v-if on <slot/>', () => {
    assert(
      `<slot v-if="ok"></slot>`,
      `isTrue(_ctx.ok)
  ? renderSlot(_ctx.$slots, \"default\", new Map<string, any | null>([[\"key\", 0]]))
  : createCommentVNode(\"v-if\", true)`
    )
  })
  test('multiple v-if that are sibling nodes should have different keys', () => {
    assert(
      `<view><view v-if="ok"/><view v-if="orNot"/></view>`,
      `createElementVNode("view", null, [
  isTrue(_ctx.ok)
    ? createElementVNode("view", new Map<string, any | null>([["key", 0]]))
    : createCommentVNode("v-if", true),
  isTrue(_ctx.orNot)
    ? createElementVNode("view", new Map<string, any | null>([["key", 1]]))
    : createCommentVNode("v-if", true)
])`
    )
  })
  test('increasing key: v-if + v-else-if + v-else', () => {
    assert(
      `<view><view v-if="ok"/><view v-else/><view v-if="another"/><view v-else-if="orNot"/><view v-else/></view>`,
      `createElementVNode("view", null, [
  isTrue(_ctx.ok)
    ? createElementVNode("view", new Map<string, any | null>([["key", 0]]))
    : createElementVNode("view", new Map<string, any | null>([["key", 1]])),
  isTrue(_ctx.another)
    ? createElementVNode("view", new Map<string, any | null>([["key", 2]]))
    : isTrue(_ctx.orNot)
      ? createElementVNode("view", new Map<string, any | null>([["key", 3]]))
      : createElementVNode("view", new Map<string, any | null>([["key", 4]]))
])`
    )
  })
  test('key injection (only v-bind)', () => {
    assert(
      `<view v-if="ok" v-bind="obj"/>`,
      `isTrue(_ctx.ok)
  ? createElementVNode(\"view\", normalizeProps(mergeProps(new Map<string, any | null>([[\"key\", 0]]), _ctx.obj)), null, 16 /* FULL_PROPS */)
  : createCommentVNode(\"v-if\", true)`
    )
  })
  test('key injection (before v-bind)', () => {
    assert(
      `<view v-if="ok" id="foo" v-bind="obj"/>`,
      `isTrue(_ctx.ok)
  ? createElementVNode(\"view\", mergeProps(new Map<string, any | null>([
      [\"key\", 0],
      [\"id\", \"foo\"]
    ]), _ctx.obj), null, 16 /* FULL_PROPS */)
  : createCommentVNode(\"v-if\", true)`
    )
  })
  test('key injection (after v-bind)', () => {
    assert(
      `<view v-if="ok" v-bind="obj" id="foo"/>`,
      `isTrue(_ctx.ok)
  ? createElementVNode(\"view\", mergeProps(new Map<string, any | null>([[\"key\", 0]]), _ctx.obj, new Map<string, any | null>([[\"id\", \"foo\"]])), null, 16 /* FULL_PROPS */)
  : createCommentVNode(\"v-if\", true)`
    )
  })
  test('avoid duplicate keys', () => {
    assert(
      `<view v-if="ok" key="custom_key" v-bind="obj"/>`,
      `isTrue(_ctx.ok)
  ? createElementVNode(\"view\", mergeProps(new Map<string, any | null>([[\"key\", \"custom_key\"]]), _ctx.obj), null, 16 /* FULL_PROPS */)
  : createCommentVNode(\"v-if\", true)`
    )
  })
  test('with spaces between branches', () => {
    assert(
      `<view><text v-if="ok">1</text> <text v-else-if="orNot">2</text> <text v-else>3</text></view>`,
      `createElementVNode("view", null, [
  isTrue(_ctx.ok)
    ? createElementVNode("text", new Map<string, any | null>([["key", 0]]), "1")
    : isTrue(_ctx.orNot)
      ? createElementVNode("text", new Map<string, any | null>([["key", 1]]), "2")
      : createElementVNode("text", new Map<string, any | null>([["key", 2]]), "3")
])`
    )
  })
  test('v-on with v-if', () => {
    assert(
      `<view v-on="{ click: clickEvent }" v-if="true">w/ v-if</view>`,
      `isTrue(true)
  ? createElementVNode(\"view\", mergeProps(new Map<string, any | null>([[\"key\", 0]]), toHandlers({ click: _ctx.clickEvent }, true)), [
      createElementVNode(\"text\", null, \"w/ v-if\")
    ], 16 /* FULL_PROPS */)
  : createCommentVNode(\"v-if\", true)`
    )
  })
})
