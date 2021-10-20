import { assert } from './testUtils'

describe('compiler: transform v-model', () => {
  test(`component v-model`, () => {
    assert(
      `<Comp v-model="model" />`,
      `<comp class="vue-ref" modelValue="{{a}}" bindupdateModelValue="{{b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.model, b: _vOn($event => _ctx.model = $event.detail.__args__[0]) }
}`
    )
  })
  test(`component v-model with cache`, () => {
    assert(
      `<Comp v-model="model" />`,
      `<comp class="vue-ref" modelValue="{{a}}" bindupdateModelValue="{{b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.model, b: _vOn($event => _ctx.model = $event.detail.__args__[0]) }
}`,
      {
        cacheHandlers: true,
      }
    )
  })
  test(`input,textarea v-model`, () => {
    assert(
      `<input v-model="model" />`,
      `<input value="{{a}}" bindinput="{{b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.model, b: _vOn($event => _ctx.model = $event.detail.value) }
}`
    )
    assert(
      `<textarea v-model="model" />`,
      `<textarea value="{{a}}" bindinput="{{b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.model, b: _vOn($event => _ctx.model = $event.detail.value) }
}`
    )
  })
  test(`input v-model + v-on`, () => {
    assert(
      `<input @input="input" v-model="model" />`,
      `<input bindinput="{{a}}" value="{{b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _vOn([$event => _ctx.model = $event.detail.value, _ctx.input]), b: _ctx.model }
}`
    )
  })
})
