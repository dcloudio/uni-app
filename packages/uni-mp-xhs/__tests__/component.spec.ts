import { assert } from './testUtils'

describe('mp-xhs: transform component', () => {
  test('lazy element: textarea', () => {
    assert(
      `<textarea></textarea>`,
      `<textarea></textarea>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<textarea @input="input"></textarea>`,
      `<block xhs:if="{{r0}}"><textarea bindinput="{{a}}"></textarea></block>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.input, "6e") }
}`
    )
    assert(
      `<textarea v-model="text"></textarea>`,
      `<block xhs:if="{{r0}}"><textarea value="{{a}}" bindinput="{{b}}"></textarea></block>`,
      `(_ctx, _cache) => {
  return { a: _ctx.text, b: _o($event => _ctx.text = $event.detail.value, "ec") }
}`
    )
    assert(
      `<textarea v-if="ok1" @input="input"/><textarea v-else-if="ok2"/><textarea v-else @input="input"/>`,
      `<textarea xhs:if="{{a}}" bindinput="{{b}}"/><textarea xhs:elif="{{c}}"/><block xhs:else><textarea xhs:if="{{r0}}" bindinput="{{d}}"/></block>`,
      `(_ctx, _cache) => {
  return _e({ a: _ctx.ok1 }, _ctx.ok1 ? { b: _o(_ctx.input, "74") } : _ctx.ok2 ? {} : { d: _o(_ctx.input, "bb") }, { c: _ctx.ok2 })
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
      `<block xhs:if="{{r0}}"><editor bindready="{{a}}"/></block>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.ready, "f8") }
}`
    )
    assert(
      `<editor v-if="ok1" @ready="ready"/><editor v-else-if="ok2"/><editor v-else/>`,
      `<editor xhs:if="{{a}}" bindready="{{b}}"/><editor xhs:elif="{{c}}"/><editor xhs:else/>`,
      `(_ctx, _cache) => {
  return _e({ a: _ctx.ok1 }, _ctx.ok1 ? { b: _o(_ctx.ready, "f7") } : _ctx.ok2 ? {} : {}, { c: _ctx.ok2 })
}`
    )
    assert(
      `<editor v-if="ok1" @ready="ready"/><editor v-else-if="ok2"/><editor v-else @ready="ready"/>`,
      `<editor xhs:if="{{a}}" bindready="{{b}}"/><editor xhs:elif="{{c}}"/><block xhs:else><editor xhs:if="{{r0}}" bindready="{{d}}"/></block>`,
      `(_ctx, _cache) => {
  return _e({ a: _ctx.ok1 }, _ctx.ok1 ? { b: _o(_ctx.ready, "f7") } : _ctx.ok2 ? {} : { d: _o(_ctx.ready, "5d") }, { c: _ctx.ok2 })
}`
    )
  })
})
