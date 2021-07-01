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
  it('generate class', () => {
    assertCodegen(
      '<view class="a external-class c" :class="class1">hello world</view>',
      '<view class="{{[\'a\',\'external-class\',\'c\',class1]}}">hello world</view>'
    )
  })
  it('generate scoped slot', () => {
    assertCodegen(
      '<foo><template slot-scope="{bar}">{{ bar.foo }}</template></foo>',
      '<foo generic:scoped-slots-default="test-foo-default" data-vue-generic="scoped" vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}"></foo>',
      function (res) {
        expect(res.generic[0]).toBe('test-foo-default')
      }
    )
    assertCodegen(
      '<foo><view slot-scope="{bar}">{{ bar.foo }}</view></foo>',
      '<foo generic:scoped-slots-default="test-foo-default" data-vue-generic="scoped" vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}"></foo>',
      function (res) {
        expect(res.generic[0]).toBe('test-foo-default')
      }
    )
    assertCodegen(
      '<uni-clientdb v-slot:default="{data}"><uni-table><uni-tr><uni-th align="center">日期</uni-th></uni-tr></uni-table></uni-clientdb>',
      '<uni-clientdb generic:scoped-slots-default="test-uni-clientdb-default" data-vue-generic="scoped" vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}"></uni-clientdb>',
      function (res) {
        expect(res.generic[0]).toBe('test-uni-clientdb-default')
        const wxmlKey = Object.keys(res.files)[0]
        expect(res.files[wxmlKey]).toBe(
          '<uni-table vue-id="551070e6-2" bind:__l="__l" vue-slots="{{[\'default\']}}"><uni-tr vue-id="{{(\'551070e6-3\')+\',\'+(\'551070e6-2\')}}" bind:__l="__l" vue-slots="{{[\'default\']}}"><uni-th vue-id="{{(\'551070e6-4\')+\',\'+(\'551070e6-3\')}}" align="center" bind:__l="__l" vue-slots="{{[\'default\']}}">日期</uni-th></uni-tr></uni-table>'
        )
      }
    )
  })

  it('generate named scoped slot', () => {
    assertCodegen(
      '<foo><template slot="foo" slot-scope="{bar}">{{ bar.foo }}</template></foo>',
      '<foo generic:scoped-slots-foo="test-foo-foo" data-vue-generic="scoped" vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'foo\']}}"></foo>',
      function (res) {
        expect(res.generic[0]).toBe('test-foo-foo')
      }
    )
    assertCodegen(
      '<foo><view slot="foo" slot-scope="{bar}">{{ bar.foo }}</view></foo>',
      '<foo generic:scoped-slots-foo="test-foo-foo" data-vue-generic="scoped" vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'foo\']}}"></foo>',
      function (res) {
        expect(res.generic[0]).toBe('test-foo-foo')
      }
    )
  })

  it('generate scoped slot with multiline v-if', () => {
    assertCodegen(
      '<foo><template v-if="\nshow\n" slot-scope="{bar}">{{ bar.foo }}</template></foo>',
      '<foo generic:scoped-slots-default="test-foo-default" data-vue-generic="scoped" vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}"></foo>',
      function (res) {
        expect(res.generic[0]).toBe('test-foo-default')
      }
    )
    assertCodegen(
      '<foo><view v-if="\nshow\n" slot="foo" slot-scope="{bar}">{{ bar.foo }}</view></foo>',
      '<foo generic:scoped-slots-foo="test-foo-foo" data-vue-generic="scoped" vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'foo\']}}"></foo>',
      function (res) {
        expect(res.generic[0]).toBe('test-foo-foo')
      }
    )
  })

  it('generate scoped slot with scopedSlotsCompiler: auto', () => {
    assertCodegen(
      '<my-component><template v-slot="{item}">{{item}}<template></my-component>',
      '<my-component generic:scoped-slots-default="test-my-component-default" data-vue-generic="scoped" vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}"></my-component>',
      'with(this){}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<my-component><template v-slot="{item}">{{getValue(item)}}<template></my-component>',
      '<my-component scoped-slots-compiler="augmented" vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}"><block><block wx:if="{{$root.m0}}">{{$root.m1}}</block></block></my-component>',
      'with(this){var m0=$hasScopedSlotsParams("551070e6-1");var m1=m0?getValue($getScopedSlotsParams("551070e6-1","default","item")):null;$mp.data=Object.assign({},{$root:{m0:m0,m1:m1}})}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<my-component><template v-slot="item">{{getValue(item.text)}}<template></my-component>',
      '<my-component scoped-slots-compiler="augmented" vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}"><block><block wx:if="{{$root.m0}}">{{$root.m1}}</block></block></my-component>',
      'with(this){var m0=$hasScopedSlotsParams("551070e6-1");var m1=m0?getValue($getScopedSlotsParams("551070e6-1","default").text):null;$mp.data=Object.assign({},{$root:{m0:m0,m1:m1}})}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<view><slot :item="item"><slot></view>',
      '<view><block wx:if="{{$slots.default}}"><slot></slot><scoped-slots-default item="{{item}}" class="scoped-ref" bind:__l="__l"></scoped-slots-default></block><block wx:else><slot></slot></block></view>',
      'with(this){if($scope.data.scopedSlotsCompiler==="augmented"){$setScopedSlotsParams("default",{"item":item})}}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<view><view v-for="(item,index) in list" :key="index"><slot :item="item"><slot></view></view>',
      '<view><block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view><block wx:if="{{$slots.default}}"><slot></slot><scoped-slots-default item="{{item.$orig}}" class="scoped-ref" bind:__l="__l"></scoped-slots-default></block><block wx:else><slot></slot></block></view></block></view>',
      'with(this){var l0=__map(list,function(item,index){var $orig=__get_orig(item);if($scope.data.scopedSlotsCompiler==="augmented"){$setScopedSlotsParams("default",{"item":$orig})}return{$orig:$orig}});$mp.data=Object.assign({},{$root:{l0:l0}})}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<view><view v-for="(item,index) in list" :key="index"><slot :item="item" :test="test"><slot></view></view>',
      '<view><block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view><block wx:if="{{$slots.default}}"><slot></slot><scoped-slots-default item="{{item.$orig}}" test="{{test}}" class="scoped-ref" bind:__l="__l"></scoped-slots-default></block><block wx:else><slot></slot></block></view></block></view>',
      'with(this){var l0=__map(list,function(item,index){var $orig=__get_orig(item);if($scope.data.scopedSlotsCompiler==="augmented"){$setScopedSlotsParams("default",{"item":$orig,"test":test})}return{$orig:$orig}});$mp.data=Object.assign({},{$root:{l0:l0}})}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<view><view v-for="(item,index) in list" :key="index"><slot :item="item" :test="test()"><slot></view></view>',
      '<view><block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view><block wx:if="{{$slots.default}}"><slot></slot><scoped-slots-default item="{{item.$orig}}" test="{{$root.m0}}" class="scoped-ref" bind:__l="__l"></scoped-slots-default></block><block wx:else><slot></slot></block></view></block></view>',
      'with(this){var m0=test();var l0=__map(list,function(item,index){var $orig=__get_orig(item);if($scope.data.scopedSlotsCompiler==="augmented"){$setScopedSlotsParams("default",{"item":$orig,"test":m0})}return{$orig:$orig}});$mp.data=Object.assign({},{$root:{m0:m0,l0:l0}})}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<view><view v-for="(item,index) in list" :key="index"><slot :item="item" :test="test()+item"><slot></view></view>',
      '<view><block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view><block wx:if="{{$slots.default}}"><slot></slot><scoped-slots-default item="{{item.$orig}}" test="{{$root.m0+item.$orig}}" class="scoped-ref" bind:__l="__l"></scoped-slots-default></block><block wx:else><slot></slot></block></view></block></view>',
      'with(this){var m0=test();var l0=__map(list,function(item,index){var $orig=__get_orig(item);if($scope.data.scopedSlotsCompiler==="augmented"){$setScopedSlotsParams("default",{"item":$orig,"test":m0+$orig})}return{$orig:$orig}});$mp.data=Object.assign({},{$root:{m0:m0,l0:l0}})}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<view><slot :item="getValue(item)"><slot></view>',
      '<view><block wx:if="{{$slots.default}}"><slot></slot><scoped-slots-default item="{{$root.m0}}" class="scoped-ref" bind:__l="__l"></scoped-slots-default></block><block wx:else><slot></slot></block></view>',
      'with(this){var m0=getValue(item);$mp.data=Object.assign({},{$root:{m0:m0}});if($scope.data.scopedSlotsCompiler==="augmented"){$setScopedSlotsParams("default",{"item":m0})}}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<view><slot v-bind="object"><slot></view>',
      '<view><block wx:if="{{$slots.default}}"><slot></slot></block><block wx:else><slot></slot></block></view>',
      'with(this){if($scope.data.scopedSlotsCompiler==="augmented"){$setScopedSlotsParams("default",object)}}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
  })

  it('generate scoped slot with scopedSlotsCompiler: augmented', () => {
    assertCodegen(
      '<my-component><template v-slot="{item}">{{getValue(item)}}<template></my-component>',
      '<my-component vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}"><block><block wx:if="{{$root.m0}}">{{$root.m1}}</block></block></my-component>',
      'with(this){var m0=$hasScopedSlotsParams("551070e6-1");var m1=m0?getValue($getScopedSlotsParams("551070e6-1","default","item")):null;$mp.data=Object.assign({},{$root:{m0:m0,m1:m1}})}',
      {
        scopedSlotsCompiler: 'augmented'
      }
    )
    assertCodegen(
      '<my-component><template v-slot="{item}">{{item}}<template></my-component>',
      '<my-component vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}"><block><block wx:if="{{$root.m0}}">{{$root.m1}}</block></block></my-component>',
      'with(this){var m0=$hasScopedSlotsParams("551070e6-1");var m1=m0?$getScopedSlotsParams("551070e6-1","default","item"):null;$mp.data=Object.assign({},{$root:{m0:m0,m1:m1}})}',
      {
        scopedSlotsCompiler: 'augmented'
      }
    )
    assertCodegen(
      '<my-component><template v-slot="item">{{getValue(item.text)}}<template></my-component>',
      '<my-component vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}"><block><block wx:if="{{$root.m0}}">{{$root.m1}}</block></block></my-component>',
      'with(this){var m0=$hasScopedSlotsParams("551070e6-1");var m1=m0?getValue($getScopedSlotsParams("551070e6-1","default").text):null;$mp.data=Object.assign({},{$root:{m0:m0,m1:m1}})}',
      {
        scopedSlotsCompiler: 'augmented'
      }
    )
    assertCodegen(
      '<my-component1><my-component2><template v-slot="{item}">{{getValue(item)}}<template></my-component2></my-component1>',
      '<my-component1 vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}"><my-component2 vue-id="{{(\'551070e6-2\')+\',\'+(\'551070e6-1\')}}" bind:__l="__l" vue-slots="{{[\'default\']}}"><block><block wx:if="{{$root.m0}}">{{$root.m1}}</block></block></my-component2></my-component1>',
      'with(this){var m0=$hasScopedSlotsParams("551070e6-2");var m1=m0?getValue($getScopedSlotsParams("551070e6-2","default","item")):null;$mp.data=Object.assign({},{$root:{m0:m0,m1:m1}})}',
      {
        scopedSlotsCompiler: 'augmented'
      }
    )
    assertCodegen(
      '<view><slot :item="item"><slot></view>',
      '<view><block wx:if="{{$slots.default}}"><slot></slot></block><block wx:else><slot></slot></block></view>',
      'with(this){{$setScopedSlotsParams("default",{"item":item})}}',
      {
        scopedSlotsCompiler: 'augmented'
      }
    )
    assertCodegen(
      '<view><slot :item="getValue(item)"><slot></view>',
      '<view><block wx:if="{{$slots.default}}"><slot></slot></block><block wx:else><slot></slot></block></view>',
      'with(this){{$setScopedSlotsParams("default",{"item":getValue(item)})}}',
      {
        scopedSlotsCompiler: 'augmented'
      }
    )
    assertCodegen(
      '<view><slot v-bind="object"><slot></view>',
      '<view><block wx:if="{{$slots.default}}"><slot></slot></block><block wx:else><slot></slot></block></view>',
      'with(this){{$setScopedSlotsParams("default",object)}}',
      {
        scopedSlotsCompiler: 'augmented'
      }
    )
  })

  it('generate scoped slot', () => {
    assertCodegen(
      '<slot v-bind:user="user"></slot>',
      '<slot></slot><scoped-slots-default user="{{user}}" class="scoped-ref" bind:__l="__l"></scoped-slots-default>',
      function (res) {
        expect(res.componentGenerics['scoped-slots-default']).toBe(true)
      }
    )
    assertCodegen( // TODO vue-id
      '<span><slot v-bind:user="user">{{ user.lastName }}</slot></span>',
      '<label class="_span"><block wx:if="{{$slots.default}}"><slot></slot><scoped-slots-default user="{{user}}" class="scoped-ref" bind:__l="__l"></scoped-slots-default></block><block wx:else>{{user.lastName}}</block></label>',
      function (res) {
        expect(res.componentGenerics['scoped-slots-default']).toBe(true)
      }
    )
    assertCodegen(
      '<span><slot name="header" v-bind:user="user">{{ user.lastName }}</slot></span>',
      '<label class="_span"><block wx:if="{{$slots.header}}"><slot name="header"></slot><scoped-slots-header user="{{user}}" class="scoped-ref" bind:__l="__l"></scoped-slots-header></block><block wx:else>{{user.lastName}}</block></label>',
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
      '<view><slot-comp generic:scoped-slots-test="test-slot-comp-test" data-vue-generic="scoped" vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'test\']}}"></slot-comp><slot-comp generic:scoped-slots-test="test-slot-comp-test1" data-vue-generic="scoped" vue-id="551070e6-2" bind:__l="__l" vue-slots="{{[\'test\']}}"></slot-comp><slot-comp generic:scoped-slots-test="test-slot-comp-test2" data-vue-generic="scoped" vue-id="551070e6-3" bind:__l="__l" vue-slots="{{[\'test\']}}"></slot-comp><slot-comp generic:scoped-slots-test="test-slot-comp-test3" data-vue-generic="scoped" vue-id="551070e6-4" bind:__l="__l" vue-slots="{{[\'test\']}}"></slot-comp></view>'
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
    assertCodegen('<test :obj="{x:0}"></test>',
      '<test vue-id="551070e6-1" obj="{{({x:0})}}" bind:__l="__l"></test>')
    assertCodegen('<test :obj="{\'x\':0}"></test>',
      '<test vue-id="551070e6-1" obj="{{$root.a0}}" bind:__l="__l"></test>',
      'with(this){var a0={"x":0};$mp.data=Object.assign({},{$root:{a0:a0}})}')
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
