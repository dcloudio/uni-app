const compiler = require('../lib')

function assertCodegen (template, templateCode, renderCode = 'with(this){}', options = {}) {
  const res = compiler.compile(template, {
    resourcePath: 'test.qxml',
    mp: Object.assign({
      minified: true,
      isTest: true,
      platform: 'quickapp-webview'
    }, options)
  })

  expect(res.template).toBe(templateCode)
  expect(res.render).toBe(renderCode)
}

describe('mp:compiler-quickapp-webview', () => {
  it('generate v-for directive', () => {
    assertCodegen(
      '<view><view v-for="(item,index) in items" :key="index"></view></view>',
      '<view><block qa:for="{{items}}" qa:for-item="item" qa:for-index="index" qa:key="index"><view></view></block></view>'
    )
  })

  it('generate v-else-if with v-else directive', () => {
    assertCodegen(
      '<view><view v-if="show">hello</view><view v-else-if="hide">world</view><view v-else>bye</view></view>',
      '<view><block qa:if="{{show}}"><view>hello</view></block><block qa:else><block qa:if="{{hide}}"><view>world</view></block><block qa:else><view>bye</view></block></block></view>'
    )
  })
})
