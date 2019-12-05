const {
  transformTemplate
} = require('../lib/mp-weixin/transform/template-transformer')

function assertCodegen(wxmlCode, vueCode) {
  expect(transformTemplate(wxmlCode)[0]).toBe(vueCode)
}
describe('wxml:compiler', () => {
  it('generate event', () => {
    assertCodegen(
      `<view bindtouchstart="startDrag" catchtouchmove="{{ catchMove ? 'noop' : '' }}"/>`,
      `<view @touchstart="startDrag" @touchmove.stop="catchMove ? 'noop' : ''"></view>`
    )
  })
  it('generate v-if', () => {
    assertCodegen(
      '<block wx:if="{{ !loading }}" loading loading-text="">{{ item.name }}</block>',
      `<block v-if="!loading" loading loading-text>{{ item.name }}</block>`
    )
  })
  it('generate v-for', () => {
    assertCodegen(
      '<view wx:for="{{ isSimple(columns) ? [columns] : columns }}" wx:for-item="item1" wx:key="{{ index }}"/>',
      `<view v-for="(item1,index) in (isSimple(columns) ? [columns] : columns)" :key="item1.index"></view>`
    )
    assertCodegen(
      '<view wx:for="{{ columns }}" wx:for-item="item1" wx:key="*this"/>',
      `<view v-for="(item1,index) in (columns)" :key="item1"></view>`
    )
    assertCodegen(
      '<view wx:for="{{ columns }}" wx:for-item="index" wx:key="*this"/>',
      `<view v-for="(index,___i___) in (columns)" :key="index"></view>`
    )
  })
  it('generate root element', () => {
    assertCodegen(
      '<view></view><view></view>',
      `<view><view></view><view></view></view>`
    )

    assertCodegen(
      `<view></view>
<wxs></wxs>`,
      `<view></view>`
    )


    assertCodegen(
      '<slot></slot>',
      `<view><slot></slot></view>`
    )
  })
})
