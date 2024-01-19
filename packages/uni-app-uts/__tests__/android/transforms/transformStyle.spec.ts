import { assert } from '../testUtils'

describe('compiler:static style', () => {
  test('template static style', () => {
    assert(
      `<view style="width:100px;height:60px;background-color:red;opacity:.5;"></view>`,
      `createElementVNode(\"view\", utsMapOf({
  style: normalizeStyle(utsMapOf({"width":"100px","height":"60px","background-color":"red","opacity":".5"}))
}), null, 4 /* STYLE */)`
    )
  })
  test('template v-bind style', () => {
    assert(
      `<view :style="{width:'100px', height:'60px', opacity: .5}"></view>`,
      `createElementVNode(\"view\", utsMapOf({
  style: normalizeStyle(utsMapOf({width:'100px', height:'60px', opacity: .5}))
}), null, 4 /* STYLE */)`
    )
  })
  test('template static style + v-bind style', () => {
    assert(
      `<view style="width:100px;opacity:.5;" :style="{height: '60px'}"></view>`,
      `createElementVNode(\"view\", utsMapOf({
  style: normalizeStyle([utsMapOf({"width":"100px","opacity":".5"}), utsMapOf({height: '60px'})])
}), null, 4 /* STYLE */)`
    )
  })
})
