const compiler = require('../lib')

function assertCodegen (template, templateCode, renderCode = 'with(this){}') {
  const res = compiler.compile(template, {
    resourcePath: 'it.wxml',
    mp: Object.assign(
      {
        minified: true,
        isTest: true,
        platform: 'mp-weixin'
      },
      { mergeVirtualHostAttributes: true }
    )
  })

  expect(res.template).toBe(templateCode)

  if (typeof renderCode === 'function') {
    renderCode(res)
  } else {
    expect(res.render).toBe(renderCode)
  }
}

describe('compiler-mp-merge-virtual-host-attributes', () => {
  it('root node class', () => {
    assertCodegen(
      '<view class="red blue"><text>hello world</text></view>',
      '<view class="{{[\'red\',\'blue\',virtualHostClass]}}" style="{{virtualHostStyle}}"><text>hello world</text></view>'
    )

    assertCodegen(
      '<view class="red blue"></view>',
      '<view class="{{[\'red\',\'blue\',virtualHostClass]}}" style="{{virtualHostStyle}}"></view>'
    )

    assertCodegen(
      '<view :class="class1"><text>hello world</text></view>',
      '<view class="{{[class1,virtualHostClass]}}" style="{{virtualHostStyle}}"><text>hello world</text></view>'
    )

    assertCodegen(
      '<view class="red blue" :class="class1"><text>hello world</text></view>',
      '<view class="{{[\'red\',\'blue\',class1,virtualHostClass]}}" style="{{virtualHostStyle}}"><text>hello world</text></view>'
    )

    assertCodegen(
      '<view class="red blue" :class="{ class1: true }"><text>hello world</text></view>',
      '<view class="{{[\'red\',\'blue\',(true)?\'class1\':\'\',virtualHostClass]}}" style="{{virtualHostStyle}}"><text>hello world</text></view>'
    )
  })

  it('root node style', () => {
    assertCodegen(
      '<view style="color: red"><text>hello world</text></view>',
      '<view class="{{[virtualHostClass]}}" style="{{\'color:red;\'+(virtualHostStyle||\'\')}}"><text>hello world</text></view>'
    )

    assertCodegen(
      '<view style="color: red"></view>',
      '<view class="{{[virtualHostClass]}}" style="{{\'color:red;\'+(virtualHostStyle||\'\')}}"></view>'
    )

    assertCodegen(
      '<view style="color: red" :style="style1"><text>hello world</text></view>',
      '<view style="{{\'color:red;\'+(style1)+virtualHostStyle}}" class="{{[virtualHostClass]}}"><text>hello world</text></view>'
    )
  })

  it('root node class and style', () => {
    assertCodegen(
      '<view class="red blue" style="color: red"><text>hello world</text></view>',
      '<view class="{{[\'red\',\'blue\',virtualHostClass]}}" style="{{\'color:red;\'+(virtualHostStyle||\'\')}}"><text>hello world</text></view>'
    )

    assertCodegen(
      '<view class="red blue" style="color: red" :style="style1"><text>hello world</text></view>',
      '<view style="{{\'color:red;\'+(style1)+virtualHostStyle}}" class="{{[\'red\',\'blue\',virtualHostClass]}}"><text>hello world</text></view>'
    )

    assertCodegen(
      '<view class="red blue" style="color: red" :class="class1"><text>hello world</text></view>',
      '<view class="{{[\'red\',\'blue\',class1,virtualHostClass]}}" style="{{\'color:red;\'+(virtualHostStyle||\'\')}}"><text>hello world</text></view>'
    )

    assertCodegen(
      '<view class="red blue" style="color: red" :class="class1" :style="style1"><text>hello world</text></view>',
      '<view class="{{[\'red\',\'blue\',class1,virtualHostClass]}}" style="{{\'color:red;\'+(style1)+virtualHostStyle}}"><text>hello world</text></view>'
    )
  })

  it('child node with v-for directive', () => {
    assertCodegen(
      '<view><text v-for="item in 3" :key="item">hello world {{ item }}</text></view>',
      '<view class="{{[virtualHostClass]}}" style="{{virtualHostStyle}}"><block wx:for="{{3}}" wx:for-item="item" wx:for-index="__i0__" wx:key="*this"><text>{{"hello world "+item}}</text></block></view>'
    )

    assertCodegen(
      '<view><text v-for="item in 3" :key="item" style="color: red" class="blue">hello world {{ item }}</text></view>',
      '<view class="{{[virtualHostClass]}}" style="{{virtualHostStyle}}"><block wx:for="{{3}}" wx:for-item="item" wx:for-index="__i0__" wx:key="*this"><text class="blue" style="color:red;">{{"hello world "+item}}</text></block></view>'
    )

    assertCodegen(
      '<view><text v-for="item in 3" :key="item" :style="{ color: \'red\' }" :class="{ \'blue\': true }">hello world {{ item }}</text></view>',
      '<view class="{{[virtualHostClass]}}" style="{{virtualHostStyle}}"><block wx:for="{{3}}" wx:for-item="item" wx:for-index="__i0__" wx:key="*this"><text class="{{[(true)?\'blue\':\'\']}}" style="{{\'color:\'+(\'red\')+\';\'}}">{{"hello world "+item}}</text></block></view>'
    )
  })
})
