import { assert } from './testUtils'

describe('compiler: transform v-slot', () => {
  test('default slot', () => {
    assert(
      `<custom><template v-slot/></custom>`,
      `<custom vue-slots="{{['default']}}" class="v-r" v-i="2a9ec0b0-0"><view /></custom>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
    assert(
      `<custom>test</custom>`,
      `<custom vue-slots="{{['default']}}" class="v-r" v-i="2a9ec0b0-0">test</custom>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  test('named slots', () => {
    assert(
      `<custom><template v-slot:header/><template v-slot:default/><template v-slot:footer/></custom>`,
      `<custom vue-slots="{{['header','default','footer']}}" class="v-r" v-i="2a9ec0b0-0"><view slot="header"/><view slot="default"/><view slot="footer"/></custom>`,
      `(_ctx, _cache) => {
  return {}
}`
    )
  })
  // TODO 还未实现scoped slot
  test('scoped slots', () => {
    assert(
      `<custom><template v-slot:default="slotProps"><view>{{ slotProps.item }}</view></template></custom>`,
      `<custom vue-slots="{{['default']}}" class="v-r" v-i="2a9ec0b0-0"><view slot="default"><view>{{a}}</view></view></custom>`,
      `(_ctx, _cache) => {
  return { a: _t(_ctx.slotProps.item), b: slotProps }
}`
    )
  })
})
