import { assert } from './testUtils'

describe('mp-jd: transform v-model input', () => {
  test(`input v-model`, () => {
    assert(
      `<input v-model="model" />`,
      `<input data-e-o="{{a}}" value="{{b}}" bindinput="__e"/>`,
      `(_ctx, _cache) => {
  return { a: { 'input': _o($event => _ctx.model = $event.detail.value) }, b: _ctx.model }
}`
    )
  })
  test(`textarea v-model`, () => {
    assert(
      `<textarea v-model="model" />`,
      `<textarea data-e-o="{{a}}" value="{{b}}" bindinput="__e"/>`,
      `(_ctx, _cache) => {
  return { a: { 'input': _o($event => _ctx.model = $event.detail.value) }, b: _ctx.model }
}`
    )
  })
})
