import { assert } from './testUtils'

describe('mp-kuaishou: transform v-model', () => {
  test(`component v-model`, () => {
    assert(
      `<Comp v-model="model" />`,
      `<comp ks:if="{{b}}" u-i="2a9ec0b0-0" bind:__l="__l" bindupdateModelValue="{{a}}" u-p="{{b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o($event => _ctx.model = $event, "21"), b: _p({ modelValue: _ctx.model }) }
}`
    )
  })
  test(`component v-model with cache`, () => {
    assert(
      `<Comp v-model="model" />`,
      `<comp ks:if="{{b}}" u-i="2a9ec0b0-0" bind:__l="__l" bindupdateModelValue="{{a}}" u-p="{{b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o($event => _ctx.model = $event, "21"), b: _p({ modelValue: _ctx.model }) }
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
  return { a: _ctx.model, b: _o($event => _ctx.model = $event.detail.value, "64") }
}`
    )
    assert(
      `<textarea v-model="model" />`,
      `<textarea value="{{a}}" bindinput="{{b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.model, b: _o($event => _ctx.model = $event.detail.value, "16") }
}`
    )
  })
  test(`input v-model + v-on`, () => {
    assert(
      `<input @input="input" v-model="model" />`,
      `<input bindinput="{{a}}" value="{{b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o([$event => _ctx.model = $event.detail.value, _ctx.input], "e3"), b: _ctx.model }
}`
    )
    assert(
      `<input v-model="model" @input="input" />`,
      `<input bindinput="{{a}}" value="{{b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o([$event => _ctx.model = $event.detail.value, _ctx.input], "e3"), b: _ctx.model }
}`
    )
  })
})
