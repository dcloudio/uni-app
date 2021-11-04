import { assert } from './testUtils'

describe('mp-baidu: transform v-on', () => {
  describe('component', () => {
    test(`built-in event`, () => {
      assert(
        `<custom @tap="tap"/>`,
        `<custom bindtap="{{a}}" u-i="2a9ec0b0-0"/>`,
        `(_ctx, _cache) => {
  return { a: _o(_ctx.tap) }
}`
      )
    })
    test(`custom event`, () => {
      assert(
        `<custom @click="click"/>`,
        `<custom bindclick="__e" u-i="2a9ec0b0-0" eO="{{a}}"/>`,
        `(_ctx, _cache) => {
  return { a: { 'click': _o(_ctx.click) } }
}`
      )
    }),
      test(`multi custom event`, () => {
        assert(
          `<custom @unmount="unmount" @custom-mount="mount();created();"/>`,
          `<custom bindunmount="__e" bind:custom-mount="__e" u-i="2a9ec0b0-0" eO="{{a}}"/>`,
          `(_ctx, _cache) => {
  return { a: { 'custom-mount': _o($event => { _ctx.mount(); _ctx.created(); }), 'unmount': _o(_ctx.unmount) } }
}`
        )
      })
  })
})
