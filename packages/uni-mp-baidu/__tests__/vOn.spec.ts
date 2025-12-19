import { assert } from './testUtils'

describe('mp-baidu: transform v-on', () => {
  describe('component', () => {
    test(`built-in event`, () => {
      assert(
        `<custom @tap="tap"/>`,
        `<custom bindtap="{{a}}" u-i="2a9ec0b0-0"/>`,
        `(_ctx, _cache) => {
  return { a: _o(_ctx.tap, "7e") }
}`
      )
    })
    test(`custom event`, () => {
      assert(
        `<custom @click="click"/>`,
        `<custom bindclick="__e" u-i="2a9ec0b0-0" eO="{{a}}"/>`,
        `(_ctx, _cache) => {
  return { a: _j({ 'click': _o(_ctx.click, "b5") }) }
}`
      )
    }),
      test(`multi custom event`, () => {
        assert(
          `<custom @unmount="unmount" @update:modelValue="changeHandle" @custom-mount="mount();created();"/>`,
          `<custom bindunmount="__e" bindupdateModelValue="__e" bindcustomMount="__e" u-i="2a9ec0b0-0" eO="{{a}}"/>`,
          `(_ctx, _cache) => {
  return { a: _j({ 'unmount': _o(_ctx.unmount, "27"), 'updateModelValue': _o(_ctx.changeHandle, "61"), 'customMount': _o($event => { _ctx.mount(); _ctx.created(); }, "56") }) }
}`
        )
      })
  })
})
