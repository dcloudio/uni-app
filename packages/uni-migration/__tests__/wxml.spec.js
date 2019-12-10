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
      `<view @touchstart="startDrag" @touchmove.stop.prevent="catchMove ? 'noop' : ''"></view>`
    )
    assertCodegen(
      `<uni-transition bind:click="click" bindtouchstart="startDrag" catchtouchmove="{{ catchMove ? 'noop' : '' }}"/>`,
      `<uni-transition @click="click" @touchstart.native="startDrag" @touchmove.native.stop.prevent="catchMove ? 'noop' : ''"></uni-transition>`
    )
  })
  it('generate class', () => {
    assertCodegen(
      `<view class="van-notice-bar__content {{ !scrollable && !wrapable ? 'van-ellipsis' : '' }}"></view>`,
      `<view :class="'van-notice-bar__content '+(!scrollable && !wrapable ? 'van-ellipsis' : '')"></view>`
    )
  })
  it('generate v-if', () => {
    assertCodegen(
      '<block wx:if="{{ !loading }}" loading loading-text="">{{ item.name }}</block>',
      `<block v-if="(!loading)" loading loading-text>{{ item.name }}</block>`
    )
  })
  it('generate v-for', () => {
    assertCodegen(
      '<view wx:for="{{ isSimple(columns) ? [columns] : columns }}" wx:for-item="item1" wx:key="{{ index }}"/>',
      `<view v-for="(item1,index) in (isSimple(columns) ? [columns] : columns)" :key="item1.index"></view>`
    )
    assertCodegen(
      '<view wx:for="{{ columns }}" wx:for-item="item1" wx:key="item1"/>',
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
      `<uni-shadow-root><view></view><view></view></uni-shadow-root>`
    )

    assertCodegen(
      `<view></view>
<wxs></wxs>`,
      `<view></view>`
    )


    assertCodegen(
      '<slot></slot>',
      `<uni-shadow-root><slot></slot></uni-shadow-root>`
    )
  })
})
