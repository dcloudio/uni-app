const compiler = require('../lib')

function assertCodegen (template, templateCode, renderCode = 'with(this){}', options = {}) {
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
      '<foo generic:scoped-slots-default="test-foo-default" vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}"></foo>',
      function (res) {
        expect(res.generic[0]).toBe('test-foo-default')
      }
    )
    assertCodegen(
      '<foo><view slot-scope="{bar}">{{ bar.foo }}</view></foo>',
      '<foo generic:scoped-slots-default="test-foo-default" vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}"></foo>',
      function (res) {
        expect(res.generic[0]).toBe('test-foo-default')
      }
    )
  })

  it('generate named scoped slot', () => {
    assertCodegen(
      '<foo><template slot="foo" slot-scope="{bar}">{{ bar.foo }}</template></foo>',
      '<foo generic:scoped-slots-foo="test-foo-foo" vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'foo\']}}"></foo>',
      function (res) {
        expect(res.generic[0]).toBe('test-foo-foo')
      }
    )
    assertCodegen(
      '<foo><view slot="foo" slot-scope="{bar}">{{ bar.foo }}</view></foo>',
      '<foo generic:scoped-slots-foo="test-foo-foo" vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'foo\']}}"></foo>',
      function (res) {
        expect(res.generic[0]).toBe('test-foo-foo')
      }
    )
  })

  it('generate scoped slot with multiline v-if', () => {
    assertCodegen(
      '<foo><template v-if="\nshow\n" slot-scope="{bar}">{{ bar.foo }}</template></foo>',
      '<foo generic:scoped-slots-default="test-foo-default" vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}"></foo>',
      function (res) {
        expect(res.generic[0]).toBe('test-foo-default')
      }
    )
    assertCodegen(
      '<foo><view v-if="\nshow\n" slot="foo" slot-scope="{bar}">{{ bar.foo }}</view></foo>',
      '<foo generic:scoped-slots-foo="test-foo-foo" vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'foo\']}}"></foo>',
      function (res) {
        expect(res.generic[0]).toBe('test-foo-foo')
      }
    )
  })

  it('generate scoped slot', () => {
    assertCodegen(
      '<slot v-bind:user="user"></slot>',
      '<slot></slot><scoped-slots-default user="{{user}}" bind:__l="__l"></scoped-slots-default>',
      function (res) {
        expect(res.componentGenerics['scoped-slots-default']).toBe(true)
      }
    )
    assertCodegen( // TODO vue-id
      '<span><slot v-bind:user="user">{{ user.lastName }}</slot></span>',
      '<label class="_span"><block wx:if="{{$slots.default}}"><slot></slot><scoped-slots-default user="{{user}}" bind:__l="__l"></scoped-slots-default></block><block wx:else>{{user.lastName}}</block></label>',
      function (res) {
        expect(res.componentGenerics['scoped-slots-default']).toBe(true)
      }
    )
    assertCodegen(
      '<span><slot name="header" v-bind:user="user">{{ user.lastName }}</slot></span>',
      '<label class="_span"><block wx:if="{{$slots.header}}"><slot name="header"></slot><scoped-slots-header user="{{user}}" bind:__l="__l"></scoped-slots-header></block><block wx:else>{{user.lastName}}</block></label>',
      function (res) {
        expect(res.componentGenerics['scoped-slots-header']).toBe(true)
      }
    )
  })
  it('generate page-meta', () => {
    assertCodegen( // TODO vue-id
      '<view><page-meta/><view><button></button></view></view>',
      '<page-meta vue-id="551070e6-1" bind:__l="__l"></page-meta><view><button></button></view>'
    )
  })

  it('generate v-slot', () => {
    assertCodegen(
      `<view>
		<slot-comp v-slot:test="{label}">
			<view>{{label}}</view>
		</slot-comp>
		<slot-comp v-slot:test="{label}">
			<view>{{label}}</view>
		</slot-comp>
		<slot-comp v-slot:test="{label}">
			<view>{{label}}</view>
		</slot-comp>
		<slot-comp v-slot:test="{label}">
			<view class="red">{{label}}</view>
		</slot-comp>
	</view>`,
      '<view><slot-comp generic:scoped-slots-test="test-slot-comp-test" vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'test\']}}"></slot-comp><slot-comp generic:scoped-slots-test="test-slot-comp-test1" vue-id="551070e6-2" bind:__l="__l" vue-slots="{{[\'test\']}}"></slot-comp><slot-comp generic:scoped-slots-test="test-slot-comp-test2" vue-id="551070e6-3" bind:__l="__l" vue-slots="{{[\'test\']}}"></slot-comp><slot-comp generic:scoped-slots-test="test-slot-comp-test3" vue-id="551070e6-4" bind:__l="__l" vue-slots="{{[\'test\']}}"></slot-comp></view>'
    )
  })

  it('generate ObjectExpression', () => {
    assertCodegen(
      '<view v-for="(item,key) in {x:0}" :key="key">{{item}}</view>',
      '<block wx:for="{{({x:0})}}" wx:for-item="item" wx:for-index="key" wx:key="key"><view>{{item}}</view></block>'
    )
    assertCodegen(
      '<template v-for="(item, key) in { list1, list2 }"></template>',
      '<block wx:for="{{({list1,list2})}}" wx:for-item="item" wx:for-index="key"></block>'
    )
    assertCodegen('<test :obj="{x:0}"></test>', '<test vue-id="551070e6-1" obj="{{({x:0})}}" bind:__l="__l"></test>')
    assertCodegen('<test :obj="{\'x\':0}"></test>', '<test vue-id="551070e6-1" obj="{{$root.a0}}" bind:__l="__l"></test>', 'with(this){var a0={"x":0};$mp.data=Object.assign({},{$root:{a0:a0}})}')
    assertCodegen(
      '<test :obj="{x:{x:0}}"></test>', '<test vue-id="551070e6-1" obj="{{$root.a0}}" bind:__l="__l"></test>',
      'with(this){var a0={x:{x:0}};$mp.data=Object.assign({},{$root:{a0:a0}})}'
    )
  })

  it('generate v-show directive', () => {
    assertCodegen(
      '<test v-show="shown">hello world</test>',
      '<test data-custom-hidden="{{!(shown)}}" vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}">hello world</test>'
    )
  })
})
