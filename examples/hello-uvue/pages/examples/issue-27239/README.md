## 微信小程序Bug

```html
<!-- pages/index/index.wxml -->
<view>
  <button bind:tap="test">toggle items</button>
  <view wx:for="{{items}}" wx:for-item="item" wx:key="key">
    <view>
      <text id="{{item.id}}">{{item.name}}</text>
    </view>
  </view>
</view>
```

```js
// pages/index/index.js
Page({
  data: {
    items: [{
      name: '0',
      id: 't-0',
      key: 0
    }, {
      name: '1',
      id: 't-1',
      key: 1
    }]
  },
  test() {
    this.setData({
      'items[0].name': '1',
      'items[0].key': '1',
      'items[1].name': '0',
      'items[1].key': '0'
    })
  }
})
```

上述代码点击测试按钮后，text的id和预期不一致。预期无论切换前后text id顺序均为t-0、t-1。

实际可能出现的情况：两个都变成t-1、先t-1后t-0