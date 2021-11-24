import { assert } from './testUtils'
import { customElements } from '../src/compiler/options'
describe('mp-weixin: transform component', () => {
  test(`component with v-show`, () => {
    assert(
      `<custom v-show="ok"/>`,
      `<custom data-c-h="{{!a}}" u-i="2a9ec0b0-0" bind:__l="__l"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.ok }
}`
    )
  })
  test(`built-in component`, () => {
    const code = customElements.map((tag) => `<${tag}/>`).join('')
    assert(
      code,
      code,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('lazy element: editor', () => {
    assert(
      `<editor/>`,
      `<editor/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<editor @ready="ready"/>`,
      `<block wx:if="{{r0}}"><editor bindready="{{a}}"/></block>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.ready) }
}`
    )
  })
  test('lazy element: canvas', () => {
    assert(
      `<canvas/>`,
      `<canvas/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<canvas canvas-id="myCanvas" id="myCanvas"/>`,
      `<canvas canvas-id="myCanvas" id="myCanvas"/>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<canvas :id="id"/>`,
      `<block wx:if="{{r0}}"><canvas id="{{a}}"/></block>`,
      `(_ctx, _cache) => {
  return { a: _ctx.id }
}`
    )
    assert(
      `<canvas :canvas-id="id"/>`,
      `<block wx:if="{{r0}}"><canvas canvas-id="{{a}}"/></block>`,
      `(_ctx, _cache) => {
  return { a: _ctx.id }
}`
    )
    assert(
      `<canvas :canvas-id="id" :id="id"/>`,
      `<block wx:if="{{r0}}"><canvas canvas-id="{{a}}" id="{{b}}"/></block>`,
      `(_ctx, _cache) => {
  return { a: _ctx.id, b: _ctx.id }
}`
    )
  })
})
