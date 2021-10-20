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
  //   test(`input,textarea v-model`, () => {
  //     assert(
  //       `<input v-model="model" />`,
  //       `<input value="{{a}}" bindinput="{{b}}" />`,
  //       `(_ctx, _cache) => {
  //   return { a: _ctx.model, b: _vOn(($event)=>_ctx.model = $event.detail.value) }
  // }`
  //     )
  //   })
})
