import { assert } from '../testUtils'

describe('compiler:v-on', () => {
  test('template v-on', () => {
    assert(
      `<text v-on:click="() => console.log('v-on:click')">v-on:click</text>`,
      `createElementVNode("text", new Map<string,any | null>([
  ["onClick", () => console.log('v-on:click')]
]), "v-on:click", 8 /* PROPS */, ["onClick"])`
    )
  })
  test('template v-on shorthand', () => {
    assert(
      `<text @click="() => console.warn('@click')">@click</text>`,
      `createElementVNode("text", new Map<string,any | null>([
  ["onClick", () => console.warn('@click')]
]), "@click", 8 /* PROPS */, ["onClick"])`
    )
  })
  test('inline statement handler', () => {
    assert(
      `<text @click="count++">@click</text>`,
      `createElementVNode("text", new Map<string,any | null>([
  ["onClick", () => {_ctx.count++}]
]), "@click", 8 /* PROPS */, ["onClick"])`
    )
  })
})
