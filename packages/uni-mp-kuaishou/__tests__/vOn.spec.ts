import { assert } from './testUtils'

describe('mp-kuaishou: transform v-on', () => {
  describe('input,textarea', () => {
    test(`input`, () => {
      assert(
        `<input @input="input"/>`,
        `<input bindinput="{{a}}"/>`,
        `(_ctx, _cache) => {
  return { a: _o(_ctx.input) }
}`
      )
    })
    test(`textarea`, () => {
      assert(
        `<textarea @input="input"></textarea>`,
        `<textarea bindinput="{{a}}"></textarea>`,
        `(_ctx, _cache) => {
  return { a: _o(_ctx.input) }
}`
      )
    })
  })
  describe('component', () => {
    test(`built-in event`, () => {
      assert(
        `<custom @tap="tap"/>`,
        `<custom bindtap="{{a}}" u-i="2a9ec0b0-0" bind:__l="__l"/>`,
        `(_ctx, _cache) => {
  return { a: _o(_ctx.tap) }
}`
      )
    })
    test(`custom event`, () => {
      assert(
        `<custom @click="click"/>`,
        `<custom bindclick="{{a}}" u-i="2a9ec0b0-0" bind:__l="__l"/>`,
        `(_ctx, _cache) => {
  return { a: _o(_ctx.click) }
}`
      )
    })
    test(`multi custom event`, () => {
      assert(
        `<custom @unmount="unmount" @custom-mount="mount();created();"/>`,
        `<custom bindunmount="{{a}}" bindcustomMount="{{b}}" u-i="2a9ec0b0-0" bind:__l="__l"/>`,
        `(_ctx, _cache) => {
  return { a: _o(_ctx.unmount), b: _o($event => { _ctx.mount(); _ctx.created(); }) }
}`
      )
    })
  })
  describe('event', () => {
    test(`getphonenumber`, () => {
      assert(
        `<button open-type="getPhoneNumber" @getphonenumber="getInfo"></button>`,
        `<button open-type="getPhoneNumber" bindgetphonenumber="{{a}}"></button>`,
        `(_ctx, _cache) => {
  return { a: _o(_ctx.getInfo) }
}`
      )
    })
    test(`getuserextendinfo`, () => {
      assert(
        `<button open-type="getuserextendinfo" @getuserextendinfo="getInfo"></button>`,
        `<button open-type="getuserextendinfo" bindgetuserextendinfo="{{a}}"></button>`,
        `(_ctx, _cache) => {
  return { a: _o(_ctx.getInfo) }
}`
      )
    })
  })
})
