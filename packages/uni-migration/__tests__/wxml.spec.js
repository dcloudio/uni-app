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
      `<uni-shadow-root><view @touchstart="startDrag" @touchmove.stop.prevent="_$self[(catchMove ? 'noop' : '')||'_$noop']($event)"></view></uni-shadow-root>`
    )
    assertCodegen(
      `<uni-transition bind:click="click" bindtouchstart="startDrag" catchtouchmove="{{ catchMove ? 'noop' : '' }}"/>`,
      `<uni-shadow-root><uni-transition @click="click" @touchstart.native="startDrag" @touchmove.native.stop.prevent="_$self[(catchMove ? 'noop' : '')||'_$noop']($event)"></uni-transition></uni-shadow-root>`
    )
    assertCodegen(
      '<template name="toolbar"><view bindtap="emit"></view></template>',
      // `<view @click="_$self.$parent[(emit)||'_$noop']($event)"></view>`
      `<uni-shadow-root><template v-if="wxTemplateName === 'toolbar'"><view @click="_$self.$parent[('emit')]($event)"></view></template></uni-shadow-root>`
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
    assertCodegen(
      '<view wx:for="{{ columns }}" wx:for-item="item" wx:key="{{item.value}}"/>',
      `<uni-shadow-root><view v-for="(item,index) in (columns)" :key="item.value"></view></uni-shadow-root>`
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

    assertCodegen(
      `<import src="./toolbar.wxml" /><view></view>
<wxs></wxs>`,
      `<uni-shadow-root><view></view></uni-shadow-root>`
    )

    assertCodegen(
      '<view><template is="toolbar" data="{{ showToolbar, cancelButtonText, title, confirmButtonText }}"></template></view>',
      `<uni-shadow-root><view><toolbar v-bind="{showToolbar, cancelButtonText, title, confirmButtonText}" wx-template-name="toolbar"></toolbar></view></uni-shadow-root>`
    )

    assertCodegen(
      '<template name="toolbar"><view></view></template>',
      // `<view></view>`
      `<uni-shadow-root><template v-if="wxTemplateName === 'toolbar'"><view></view></template></uni-shadow-root>`
    )

    assertCodegen(
      '<template name="toolbar1"><view></view></template><template name="toolbar2"><view></view></template>',
      `<uni-shadow-root><template v-if="wxTemplateName === 'toolbar1'"><view></view></template><template v-if="wxTemplateName === 'toolbar2'"><view></view></template></uni-shadow-root>`
    )
  })
})
