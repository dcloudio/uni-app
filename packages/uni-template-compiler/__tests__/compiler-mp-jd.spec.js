const compiler = require('../lib')

function assertCodegen (template, templateCode, renderCode = 'with(this){}', options = {}) {
  const res = compiler.compile(template, {
    resourcePath: 'test.wxml',
    mp: Object.assign({
      minified: true,
      isTest: true,
      platform: 'mp-jd'
    }, options)
  })

  expect(res.template).toBe(templateCode)
  expect(res.render).toBe(renderCode)
}

describe('mp:compiler-mp-jd', () => {
  it('match-media', () => {
    process.env.UNI_PLATFORM = 'mp-jd'
    assertCodegen(
      '<match-media min-width="300" max-width="600"><view>hello world</view></match-media>',
      '<match-media min-width="300" max-width="600"><view>hello world</view></match-media>'
    )
  })

  it('root-portal', () => {
    assertCodegen(
      '<root-portal :enable="true"><view>hello world</view></root-portal>',
      '<root-portal enable="{{true}}"><view>hello world</view></root-portal>'
    )
  })

  it('page-container', () => {
    assertCodegen(
      '<page-container :show="true" position="top"><view>hello world</view></page-container>',
      '<page-container show="{{true}}" position="top"><view>hello world</view></page-container>'
    )
  })
})
