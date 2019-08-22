const compiler = require('../lib')

function assertCodegen (template, templateCode, renderCode = `with(this){}`, options = {}) {
  const res = compiler.compile(template, {
    resourcePath: 'test.wxml',
    mp: Object.assign({
      minified: true,
      isTest: true,
      platform: 'mp-weixin'
    }, options)
  })

  expect(res.template).toBe(templateCode)

  if (typeof renderCode === 'function') {
    renderCode(res)
  } else {
    expect(res.render).toBe(renderCode)
  }
}

describe('mp:compiler-mp-weixin', () => {
  it('generate scoped slot', () => {
    assertCodegen(
      '<foo><template slot-scope="{bar}">{{ bar.foo }}</template></foo>',
      `<foo generic:scoped-slots-default="test-foo-default" vue-id="1" bind:__l="__l" vue-slots="{{['default']}}"></foo>`,
      function (res) {
        expect(res.generic[0]).toBe('test-foo-default')
      }
    )
    assertCodegen(
      '<foo><view slot-scope="{bar}">{{ bar.foo }}</view></foo>',
      `<foo generic:scoped-slots-default="test-foo-default" vue-id="1" bind:__l="__l" vue-slots="{{['default']}}"></foo>`,
      function (res) {
        expect(res.generic[0]).toBe('test-foo-default')
      }
    )
  })

  it('generate named scoped slot', () => {
    assertCodegen(
      '<foo><template slot="foo" slot-scope="{bar}">{{ bar.foo }}</template></foo>',
      `<foo generic:scoped-slots-foo="test-foo-foo" vue-id="1" bind:__l="__l" vue-slots="{{['foo']}}"></foo>`,
      function (res) {
        expect(res.generic[0]).toBe('test-foo-foo')
      }
    )
    assertCodegen(
      '<foo><view slot="foo" slot-scope="{bar}">{{ bar.foo }}</view></foo>',
      `<foo generic:scoped-slots-foo="test-foo-foo" vue-id="1" bind:__l="__l" vue-slots="{{['foo']}}"></foo>`,
      function (res) {
        expect(res.generic[0]).toBe('test-foo-foo')
      }
    )
  })

  it('generate scoped slot with multiline v-if', () => {
    assertCodegen(
      '<foo><template v-if="\nshow\n" slot-scope="{bar}">{{ bar.foo }}</template></foo>',
      `<foo generic:scoped-slots-default="test-foo-default" vue-id="1" bind:__l="__l" vue-slots="{{['default']}}"></foo>`,
      function (res) {
        expect(res.generic[0]).toBe('test-foo-default')
      }
    )
    assertCodegen(
      '<foo><view v-if="\nshow\n" slot="foo" slot-scope="{bar}">{{ bar.foo }}</view></foo>',
      `<foo generic:scoped-slots-foo="test-foo-foo" vue-id="1" bind:__l="__l" vue-slots="{{['foo']}}"></foo>`,
      function (res) {
        expect(res.generic[0]).toBe('test-foo-foo')
      }
    )
  })

  it('generate scoped slot', () => {
    assertCodegen(// TODO vue-id
      '<span><slot v-bind:user="user">{{ user.lastName }}</slot></span>',
      `<label class="_span"><block wx:if="{{$slots.default}}"><scoped-slots-default user="{{user}}" bind:__l="__l"></scoped-slots-default></block><block wx:else>{{user.lastName}}</block></label>`,
      function (res) {
        expect(res.componentGenerics['scoped-slots-default']).toBe(true)
      }
    )
    assertCodegen(
      '<span><slot name="header" v-bind:user="user">{{ user.lastName }}</slot></span>',
      `<label class="_span"><block wx:if="{{$slots.header}}"><scoped-slots-header user="{{user}}" bind:__l="__l"></scoped-slots-header></block><block wx:else>{{user.lastName}}</block></label>`,
      function (res) {
        expect(res.componentGenerics['scoped-slots-header']).toBe(true)
      }
    )
  })
})
