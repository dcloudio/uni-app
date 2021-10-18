import { assert } from './testUtils'

describe('compiler: transform v-slot', () => {
  test('default slot', () => {
    assert(
      `<template v-slot/>`,
      `<block />`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('named slot', () => {
    assert(
      `<template v-slot:header/><template v-slot:default/><template v-slot:footer/>`,
      `<block slot="header"/><block slot="default"/><block slot="footer"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  // TODO 还未实现scoped slot
  test('named slot', () => {
    assert(
      `<template v-slot:default="slotProps"><view>{{ slotProps.item }}</view></template>`,
      `<block slot="default"><view>{{a}}</view></block>`,
      `(_ctx, _cache) => {
  return { a: _toDisplayString(_ctx.slotProps.item), b: slotProps }
}`
    )
  })
})
