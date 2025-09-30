import { assert } from './testUtils'

describe('mp-jd: transform v-on', () => {
  describe('input,textarea', () => {
    test(`input`, () => {
      assert(
        `<input @input="input"/>`,
        `<input bindinput=\"__e\" data-e-o=\"{{a}}\"/>`,
        `(_ctx, _cache) => {
  return { a: { 'input': _o(_ctx.input, "8c") } }
}`
      )
    })
    test(`textarea`, () => {
      assert(
        `<textarea @input="input"/>`,
        `<textarea bindinput=\"__e\" data-e-o=\"{{a}}\"/>`,
        `(_ctx, _cache) => {
  return { a: { 'input': _o(_ctx.input, "6e") } }
}`
      )
    })
  })

  describe('input,textarea', () => {
    test(`event`, () => {
      assert(
        `<input @click="click"/>`,
        `<input bindtap=\"{{a}}\"/>`,
        `(_ctx, _cache) => {
  return { a: _o(_ctx.click, "49") }
}`
      )
    })
    test(`textarea`, () => {
      assert(
        `<textarea @click="click"/>`,
        `<textarea bindtap=\"{{a}}\"/>`,
        `(_ctx, _cache) => {
  return { a: _o(_ctx.click, "62") }
}`
      )
    })
  })

  describe('input,textarea', () => {
    test(`input event, click event`, () => {
      assert(
        `<input @click="click" @input="input"/>`,
        `<input bindtap=\"{{a}}\" bindinput=\"__e\" data-e-o=\"{{b}}\"/>`,
        `(_ctx, _cache) => {
  return { a: _o(_ctx.click, "49"), b: { 'input': _o(_ctx.input, "72") } }
}`
      )
    })
    test(`textarea`, () => {
      assert(
        `<textarea @click="click" @input="input"/>`,
        `<textarea bindtap=\"{{a}}\" bindinput=\"__e\" data-e-o=\"{{b}}\"/>`,
        `(_ctx, _cache) => {
  return { a: _o(_ctx.click, "62"), b: { 'input': _o(_ctx.input, "75") } }
}`
      )
    })
  })
})
