import { assert } from './testUtils'

describe('compiler: transform scoped slots', () => {
  test('scoped + v-for + component', () => {
    assert(
      `<MyComponent :dataList="dataList">
  <template v-slot:default="slotProps">
    <view>
        <view v-for="(item, key) in dataList" :key="key">
            <test>{{ item.title }}</test>
        </view>
    </view>
  </template>
</MyComponent>`,
      `<my-component u-s="{{['d']}}" u-i="2a9ec0b0-0" u-p="{{b}}"><view wx:for="{{a}}" wx:for-item="slotProps" wx:key="b" slot="{{slotProps.c}}"><view><view wx:for="{{slotProps.a}}" wx:for-item="item" wx:key="c"><test u-s="{{['d']}}" u-i="{{item.b}}">{{item.a}}</test></view></view></view></my-component>`,
      `(_ctx, _cache) => {
  return { a: _w((slotProps, s0, i0) => { return { a: _f(_ctx.dataList, (item, key, i1) => { return { a: _t(item.title), b: '2a9ec0b0-1' + '-' + i0 + '-' + i1 + ',' + '2a9ec0b0-0', c: key }; }), b: i0, c: s0 }; }, { name: 'd', path: 'a', vueId: '2a9ec0b0-0' }), b: _p({ dataList: _ctx.dataList }) }
}`
    )
  })
})
