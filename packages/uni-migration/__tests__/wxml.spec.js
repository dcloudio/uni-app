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
      `<uni-shadow-root><view @touchstart="startDrag" @touchmove.stop.prevent="catchMove ? 'noop' : ''"></view></uni-shadow-root>`
    )
    assertCodegen(
      `<uni-transition bind:click="click" bindtouchstart="startDrag" catchtouchmove="{{ catchMove ? 'noop' : '' }}"/>`,
      `<uni-shadow-root><uni-transition @click="click" @touchstart.native="startDrag" @touchmove.native.stop.prevent="catchMove ? 'noop' : ''"></uni-transition></uni-shadow-root>`
    )
  })
  it('generate class', () => {
    assertCodegen(
      `<view class="van-notice-bar__content {{ !scrollable && !wrapable ? 'van-ellipsis' : '' }}"></view>`,
      `<uni-shadow-root><view :class="'van-notice-bar__content '+(!scrollable && !wrapable ? 'van-ellipsis' : '')"></view></uni-shadow-root>`
    )
  })
  it('generate v-if', () => {
    assertCodegen(
      '<block wx:if="{{ !loading }}" loading loading-text="">{{ item.name }}</block>',
      `<uni-shadow-root><block v-if="(!loading)" loading loading-text>{{ item.name }}</block></uni-shadow-root>`
    )
  })
  it('generate v-for', () => {
    assertCodegen(
      '<view wx:for="{{ isSimple(columns) ? [columns] : columns }}" wx:for-item="item1" wx:key="{{ index }}"/>',
      `<uni-shadow-root><view v-for="(item1,index) in (isSimple(columns) ? [columns] : columns)" :key="item1.index"></view></uni-shadow-root>`
    )
    assertCodegen(
      '<view wx:for="{{ columns }}" wx:for-item="item1" wx:key="item1"/>',
      `<uni-shadow-root><view v-for="(item1,index) in (columns)" :key="item1"></view></uni-shadow-root>`
    )
    assertCodegen(
      '<view wx:for="{{ columns }}" wx:for-item="index" wx:key="*this"/>',
      `<uni-shadow-root><view v-for="(index,___i___) in (columns)" :key="index"></view></uni-shadow-root>`
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
      `<uni-shadow-root><view></view></uni-shadow-root>`
    )


    assertCodegen(
      '<slot></slot>',
      `<uni-shadow-root><slot></slot></uni-shadow-root>`
    )
  })
})
