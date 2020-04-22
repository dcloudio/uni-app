const compiler = require('../lib')

function assertCodegen (template, templateCode, renderCode = 'with(this){}', options = {}) {
  const res = compiler.compile(template, {
    resourcePath: 'test.wxml',
    mp: Object.assign({
      minified: true,
      isTest: true,
      platform: 'mp-qq'
    }, options)
  })

  expect(res.template).toBe(templateCode)
  expect(res.render).toBe(renderCode)
}

describe('mp:compiler-mp-qq', () => {
  it('generate text trim', () => {
    assertCodegen(
      '<text>\nN: {{title}}\n′</text>',
      '<text>{{\'N: \'+title+"\\\\n′"}}</text>'
    )
    assertCodegen(
      '<text>我是第一行1\n我的第二行</text>',
      '<text>我是第一行1\n我的第二行</text>'
    )
    assertCodegen(
      '<text>我是第一行2\n我的第二行1{{title}}</text>',
      '<text>{{"我是第一行2\\\\n我的第二行1"+title}}</text>'
    )
    assertCodegen(
      `<text>我是第一行3
    我的第二行2{{title}}</text>`,
      '<text>{{"我是第一行3\\\\n    我的第二行2"+title}}</text>'
    )
  })
})
