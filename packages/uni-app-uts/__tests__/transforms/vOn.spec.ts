import { assert } from '../testUtils'

describe('compiler:v-on', () => {
  test('basic', () => {
    assert(
      `<text v-on:click="() => console.log('v-on:click')"/>`,
      `createElementVNode("text", new Map<string,any | null>([
  ["onClick", () => console.log('v-on:click')]
]), null, 8 /* PROPS */, ["onClick"])`
    )
    assert(
      `<text v-on:click="onClick"/>`,
      `createElementVNode("text", new Map<string,any | null>([["onClick", _ctx.onClick]]), null, 8 /* PROPS */, ["onClick"])`
    )
  })
  test('dynamic arg', () => {
    assert(
      `<text v-on:[event]="handler"/>`,
      `createElementVNode("text", new Map<string,any | null>([[toHandlerKey(_ctx.event), _ctx.handler]]), null, 16 /* FULL_PROPS */)`
    )
  })
  test('dynamic arg with complex exp', () => {
    assert(
      `<text v-on:[event(foo)]="handler"/>`,
      `createElementVNode("text", new Map<string,any | null>([[toHandlerKey(_ctx.event(_ctx.foo)), _ctx.handler]]), null, 16 /* FULL_PROPS */)`
    )
  })
  test('shorthand', () => {
    assert(
      `<text @click="() => console.warn('@click')"/>`,
      `createElementVNode("text", new Map<string,any | null>([
  ["onClick", () => console.warn('@click')]
]), null, 8 /* PROPS */, ["onClick"])`
    )
  })
  test('inline statement handler', () => {
    assert(
      `<text @click="count++"/>`,
      `createElementVNode("text", new Map<string,any | null>([
  ["onClick", () => {_ctx.count++}]
]), null, 8 /* PROPS */, ["onClick"])`
    )
  })
  test('should handle multi-line statement', () => {
    assert(
      `<text @click="\nfoo();\nbar()\n"/>`,
      `createElementVNode(\"text\", new Map<string,any | null>([
  [\"onClick\", () => {
_ctx.foo();
_ctx.bar()
}]
]), null, 8 /* PROPS */, [\"onClick\"])`
    )
    assert(
      `<text @click="a.get('b' + c)()"/>`,
      `createElementVNode("text", new Map<string,any | null>([
  [\"onClick\", () => {_ctx.a.get('b' + _ctx.c)()}]
]), null, 8 /* PROPS */, [\"onClick\"])`
    )
  })
  // test('inline statement with argument $event', () => {
  //   assert(
  //     `<text @click="foo($event)"/>`,
  //     `Inline statement cannot use $event, please use a function expression instead.`
  //   )
  // })
  // test('should NOT wrap as function if expression is already function expression', () => {
  //   assert(`<text @click="$event => foo($event)"/>`, ``)
  // })
  // test('should NOT wrap as function if expression is already function expression (with Typescript)', () => {
  //   assert(`<text @click="(e: any): any => foo(e)"/>`, ``)
  // })
  // test('should NOT wrap as function if expression is already function expression (with newlines)', () => {
  //   assert(
  //     `<text @click="
  //     $event => {
  //       foo($event)
  //     }
  //   "/>`,``
  //   )
  // })
  // test('should NOT wrap as function if expression is already function expression (with newlines + function keyword)', () => {
  //   assert(
  //     `<text @click="
  //     function($event) {
  //       foo($event)
  //     }
  //   "/>`,
  //   ``
  //   )
  // })
  test('should NOT wrap as function if expression is complex member expression', () => {
    assert(
      `<text @click="a['b' + c]"/>`,
      `createElementVNode("text", new Map<string,any | null>([
  [\"onClick\", _ctx.a['b' + _ctx.c]]
]), null, 8 /* PROPS */, [\"onClick\"])`
    )
  })
  test('case conversion for vnode hooks', () => {
    assert(
      `<text v-on:vue:mounted="onMount" @vue:before-update="onBeforeUpdate" />`,
      `createElementVNode("text", new Map<string,any | null>([
  ["onVnodeMounted", _ctx.onMount],
  ["onVnodeBeforeUpdate", _ctx.onBeforeUpdate]
]), null, 8 /* PROPS */, ["onVnodeMounted", "onVnodeBeforeUpdate"])`
    )
  })
  test('inline function expression handler', () => {
    assert(
      `<text v-on:click="() => foo()" />`,
      `createElementVNode("text", new Map<string,any | null>([
  ["onClick", () => _ctx.foo()]
]), null, 8 /* PROPS */, ["onClick"])`
    )
  })
})
