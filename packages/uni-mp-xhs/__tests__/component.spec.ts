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
      `<block xhs:if="{{r0}}"><textarea bindinput="__e" data-e-o="{{a}}"></textarea></block>`,
      `(_ctx, _cache) => {
  return { a: { 'input': _o(_ctx.input) } }
}`
    )
    assert(
      `<textarea v-model="text"></textarea>`,
      `<block xhs:if="{{r0}}"><textarea value="{{a}}" bindinput="{{b}}"></textarea></block>`,
      `(_ctx, _cache) => {
  return { a: _ctx.text, b: _o($event => _ctx.text = $event.detail.value) }
}`
    )
    assert(
      `<textarea v-if="ok1" @input="input"/><textarea v-else-if="ok2"/><textarea v-else @input="input"/>`,
      `<textarea xhs:if="{{a}}" bindinput="__e" data-e-o="{{b}}"/><textarea xhs:elif="{{c}}"/><block xhs:else><textarea xhs:if="{{r0}}" bindinput="__e" data-e-o="{{d}}"/></block>`,
      `(_ctx, _cache) => {
  return _e({ a: _ctx.ok1 }, _ctx.ok1 ? { b: { 'input': _o(_ctx.input) } } : _ctx.ok2 ? {} : { d: { 'input': _o(_ctx.input) } }, { c: _ctx.ok2 })
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
      `<block xhs:if="{{r0}}"><editor bindready="__e" data-e-o="{{a}}"/></block>`,
      `(_ctx, _cache) => {
  return { a: { 'ready': _o(_ctx.ready) } }
}`
    )
    assert(
      `<editor v-if="ok1" @ready="ready"/><editor v-else-if="ok2"/><editor v-else/>`,
      `<editor xhs:if="{{a}}" bindready="__e" data-e-o="{{b}}"/><editor xhs:elif="{{c}}"/><editor xhs:else/>`,
      `(_ctx, _cache) => {
  return _e({ a: _ctx.ok1 }, _ctx.ok1 ? { b: { 'ready': _o(_ctx.ready) } } : _ctx.ok2 ? {} : {}, { c: _ctx.ok2 })
}`
    )
    assert(
      `<editor v-if="ok1" @ready="ready"/><editor v-else-if="ok2"/><editor v-else @ready="ready"/>`,
      `<editor xhs:if="{{a}}" bindready="__e" data-e-o="{{b}}"/><editor xhs:elif="{{c}}"/><block xhs:else><editor xhs:if="{{r0}}" bindready="__e" data-e-o="{{d}}"/></block>`,
      `(_ctx, _cache) => {
  return _e({ a: _ctx.ok1 }, _ctx.ok1 ? { b: { 'ready': _o(_ctx.ready) } } : _ctx.ok2 ? {} : { d: { 'ready': _o(_ctx.ready) } }, { c: _ctx.ok2 })
}`
    )
  })
})
