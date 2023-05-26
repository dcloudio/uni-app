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

  it('generate string express with escape quote', () => {
    assertCodegen(
      '<view :data-text="text+\'\\\'\'"></view>',
      '<view data-text="{{$root.a0}}"></view>',
      'with(this){var a0=text+"\'";$mp.data=Object.assign({},{$root:{a0:a0}})}'
    )
    assertCodegen(
      /* eslint-disable no-template-curly-in-string */
      '<view :data-text="`${text}\'`"></view>',
      '<view data-text="{{$root.a0}}"></view>',
      /* eslint-disable no-template-curly-in-string */
      'with(this){var a0=`${text}\'`;$mp.data=Object.assign({},{$root:{a0:a0}})}'
    )
    assertCodegen(
      '<view>{{text+\'\\\'\'}}</view>',
      '<view>{{$root.t0}}</view>',
      'with(this){var t0=text+"\'";$mp.data=Object.assign({},{$root:{t0:t0}})}'
    )
    assertCodegen(
      /* eslint-disable no-template-curly-in-string */
      '<view>{{`${text}\'`}}</view>',
      '<view>{{$root.t0}}</view>',
      /* eslint-disable no-template-curly-in-string */
      'with(this){var t0=`${text}\'`;$mp.data=Object.assign({},{$root:{t0:t0}})}'
    )
    assertCodegen(
      /* eslint-disable no-template-curly-in-string */
      '<view>{{`${text}"`}}</view>',
      '<view>{{text+\'"\'}}</view>'
    )
    assertCodegen(
      '<view>{{text+"\\""}}</view>',
      '<view>{{$root.t0}}</view>',
      'with(this){var t0=text+"\\"";$mp.data=Object.assign({},{$root:{t0:t0}})}'
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
      '<my-component><template v-slot="{item}">{{item}}{{title}}<template></my-component>',
      '<my-component scoped-slots-compiler="augmented" vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}"><block wx:if="{{$root.m0}}">{{$root.m1[\'item\']+title}}</block></my-component>',
      'with(this){var m0=$hasSSP("551070e6-1");var m1=m0?$getSSP("551070e6-1","default"):null;$mp.data=Object.assign({},{$root:{m0:m0,m1:m1}})}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<my-component><template v-slot="{item}"><view @click="getValue(item)">{{item}}</view><template></my-component>',
      '<my-component generic:scoped-slots-default="test-my-component-default" data-vue-generic="scoped" vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}"></my-component>',
      'with(this){}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<my-component><template v-slot="{item}">{{getValue(item)}}<template></my-component>',
      '<my-component scoped-slots-compiler="augmented" vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}"><block wx:if="{{$root.m0}}">{{$root.m1}}</block></my-component>',
      'with(this){var m0=$hasSSP("551070e6-1");var m1=m0?getValue($getSSP("551070e6-1","default")["item"]):null;$mp.data=Object.assign({},{$root:{m0:m0,m1:m1}})}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<my-component><template v-slot="item">{{getValue(item.text)}}<template></my-component>',
      '<my-component scoped-slots-compiler="augmented" vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}"><block wx:if="{{$root.m0}}">{{$root.m1}}</block></my-component>',
      'with(this){var m0=$hasSSP("551070e6-1");var m1=m0?getValue($getSSP("551070e6-1","default").text):null;$mp.data=Object.assign({},{$root:{m0:m0,m1:m1}})}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<view><slot :item="item"><slot></view>',
      '<view><block wx:if="{{$slots.default}}"><slot></slot><scoped-slots-default item="{{item}}" class="scoped-ref" bind:__l="__l"></scoped-slots-default></block><block wx:else><slot></slot></block></view>',
      'with(this){$initSSP();if($scope.data.scopedSlotsCompiler==="augmented"){$setSSP("default",{"item":item})}$callSSP()}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<view><view v-for="(item,index) in list" :key="index"><slot :item="item"><slot></view></view>',
      '<view><block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view><block wx:if="{{$slots.default}}"><slot></slot><scoped-slots-default item="{{item.$orig}}" class="scoped-ref" bind:__l="__l"></scoped-slots-default></block><block wx:else><slot></slot></block></view></block></view>',
      'with(this){$initSSP();var l0=__map(list,function(item,index){var $orig=__get_orig(item);if($scope.data.scopedSlotsCompiler==="augmented"){$setSSP("default",{"item":$orig})}return{$orig:$orig}});$mp.data=Object.assign({},{$root:{l0:l0}});$callSSP()}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<view><view v-for="(item,index) in list" :key="index"><slot :item="item" :test="test"><slot></view></view>',
      '<view><block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view><block wx:if="{{$slots.default}}"><slot></slot><scoped-slots-default item="{{item.$orig}}" test="{{test}}" class="scoped-ref" bind:__l="__l"></scoped-slots-default></block><block wx:else><slot></slot></block></view></block></view>',
      'with(this){$initSSP();var l0=__map(list,function(item,index){var $orig=__get_orig(item);if($scope.data.scopedSlotsCompiler==="augmented"){$setSSP("default",{"item":$orig,"test":test})}return{$orig:$orig}});$mp.data=Object.assign({},{$root:{l0:l0}});$callSSP()}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<view><view v-for="(item,index) in list" :key="index"><slot :item="item" :test="test()"><slot></view></view>',
      '<view><block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view><block wx:if="{{$slots.default}}"><slot></slot><scoped-slots-default item="{{item.$orig}}" test="{{$root.m0}}" class="scoped-ref" bind:__l="__l"></scoped-slots-default></block><block wx:else><slot></slot></block></view></block></view>',
      'with(this){$initSSP();var m0=test();var l0=__map(list,function(item,index){var $orig=__get_orig(item);if($scope.data.scopedSlotsCompiler==="augmented"){$setSSP("default",{"item":$orig,"test":m0})}return{$orig:$orig}});$mp.data=Object.assign({},{$root:{m0:m0,l0:l0}});$callSSP()}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<view><view v-for="(item,index) in list" :key="index"><slot :item="item" :test="test()+item"><slot></view></view>',
      '<view><block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view><block wx:if="{{$slots.default}}"><slot></slot><scoped-slots-default item="{{item.$orig}}" test="{{$root.m0+item.$orig}}" class="scoped-ref" bind:__l="__l"></scoped-slots-default></block><block wx:else><slot></slot></block></view></block></view>',
      'with(this){$initSSP();var m0=test();var l0=__map(list,function(item,index){var $orig=__get_orig(item);if($scope.data.scopedSlotsCompiler==="augmented"){$setSSP("default",{"item":$orig,"test":m0+$orig})}return{$orig:$orig}});$mp.data=Object.assign({},{$root:{m0:m0,l0:l0}});$callSSP()}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<view><slot :item="getValue(item)"><slot></view>',
      '<view><block wx:if="{{$slots.default}}"><slot></slot><scoped-slots-default item="{{$root.m0}}" class="scoped-ref" bind:__l="__l"></scoped-slots-default></block><block wx:else><slot></slot></block></view>',
      'with(this){$initSSP();var m0=getValue(item);$mp.data=Object.assign({},{$root:{m0:m0}});if($scope.data.scopedSlotsCompiler==="augmented"){$setSSP("default",{"item":m0})}$callSSP()}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<view><slot v-bind="object"><slot></view>',
      '<view><block wx:if="{{$slots.default}}"><slot></slot></block><block wx:else><slot></slot></block></view>',
      'with(this){$initSSP();if($scope.data.scopedSlotsCompiler==="augmented"){$setSSP("default",object)}$callSSP()}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<custom-view><template v-slot:[name]="{item}"><view>{{item}}</view></template></custom-view>',
      '<custom-view scoped-slots-compiler="augmented" vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[name]}}"><view slot="{{name}}" wx:if="{{$root.m0}}">{{$root.m1[\'item\']}}</view></custom-view>',
      'with(this){var m0=$hasSSP("551070e6-1");var m1=m0?$getSSP("551070e6-1",name):null;$mp.data=Object.assign({},{$root:{m0:m0,m1:m1}})}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
  })

  it('generate scoped slot with scopedSlotsCompiler: augmented', () => {
    assertCodegen(
      '<my-component><template v-slot="{item}">{{getValue(item)}}<template></my-component>',
      '<my-component vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}"><block wx:if="{{$root.m0}}">{{$root.m1}}</block></my-component>',
      'with(this){var m0=$hasSSP("551070e6-1");var m1=m0?getValue($getSSP("551070e6-1","default")["item"]):null;$mp.data=Object.assign({},{$root:{m0:m0,m1:m1}})}',
      {
        scopedSlotsCompiler: 'augmented'
      }
    )
    assertCodegen(
      '<my-component><template v-slot="{item}">{{item}}<template></my-component>',
      '<my-component vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}"><block wx:if="{{$root.m0}}">{{$root.m1[\'item\']}}</block></my-component>',
      'with(this){var m0=$hasSSP("551070e6-1");var m1=m0?$getSSP("551070e6-1","default"):null;$mp.data=Object.assign({},{$root:{m0:m0,m1:m1}})}',
      {
        scopedSlotsCompiler: 'augmented'
      }
    )
    assertCodegen(
      '<my-component><template v-slot="item">{{getValue(item.text)}}<template></my-component>',
      '<my-component vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}"><block wx:if="{{$root.m0}}">{{$root.m1}}</block></my-component>',
      'with(this){var m0=$hasSSP("551070e6-1");var m1=m0?getValue($getSSP("551070e6-1","default").text):null;$mp.data=Object.assign({},{$root:{m0:m0,m1:m1}})}',
      {
        scopedSlotsCompiler: 'augmented'
      }
    )
    assertCodegen(
      '<my-component1><my-component2><template v-slot="{item}">{{getValue(item)}}<template></my-component2></my-component1>',
      '<my-component1 vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}"><my-component2 vue-id="{{(\'551070e6-2\')+\',\'+(\'551070e6-1\')}}" bind:__l="__l" vue-slots="{{[\'default\']}}"><block wx:if="{{$root.m0}}">{{$root.m1}}</block></my-component2></my-component1>',
      'with(this){var m0=$hasSSP("551070e6-2");var m1=m0?getValue($getSSP("551070e6-2","default")["item"]):null;$mp.data=Object.assign({},{$root:{m0:m0,m1:m1}})}',
      {
        scopedSlotsCompiler: 'augmented'
      }
    )
    assertCodegen(
      '<view><slot :item="item"><slot></view>',
      '<view><block wx:if="{{$slots.default}}"><slot></slot></block><block wx:else><slot></slot></block></view>',
      'with(this){$initSSP();{$setSSP("default",{"item":item})}$callSSP()}',
      {
        scopedSlotsCompiler: 'augmented'
      }
    )
    assertCodegen(
      '<view><slot :item="getValue(item)"><slot></view>',
      '<view><block wx:if="{{$slots.default}}"><slot></slot></block><block wx:else><slot></slot></block></view>',
      'with(this){$initSSP();{$setSSP("default",{"item":getValue(item)})}$callSSP()}',
      {
        scopedSlotsCompiler: 'augmented'
      }
    )
    assertCodegen(
      '<view><slot v-bind="object"><slot></view>',
      '<view><block wx:if="{{$slots.default}}"><slot></slot></block><block wx:else><slot></slot></block></view>',
      'with(this){$initSSP();{$setSSP("default",object)}$callSSP()}',
      {
        scopedSlotsCompiler: 'augmented'
      }
    )
    assertCodegen(
      '<my-component><template v-slot="{item}">{{item}}<my-component><template v-slot="{item}">{{item}}</template></my-component></template></my-component>',
      '<my-component vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}"><block wx:if="{{$root.m0}}">{{$root.m1[\'item\']}}<my-component vue-id="{{(\'551070e6-2\')+\',\'+(\'551070e6-1\')}}" bind:__l="__l" vue-slots="{{[\'default\']}}"><block wx:if="{{$root.m2}}">{{$root.m3[\'item\']}}</block></my-component></block></my-component>',
      'with(this){var m0=$hasSSP("551070e6-1");var m1=m0?$getSSP("551070e6-1","default"):null;var m2=$hasSSP("551070e6-2");var m3=m2?$getSSP("551070e6-2","default"):null;$mp.data=Object.assign({},{$root:{m0:m0,m1:m1,m2:m2,m3:m3}})}',
      {
        scopedSlotsCompiler: 'augmented'
      }
    )
    assertCodegen(
      '<custom-view><template v-if="test" v-for="(item1, index1) in array1" v-slot:name="{item}"><template v-for="(item2, index2) in array"><view>{{item}}</view></template></template></custom-view>',
      '<custom-view vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'name\']}}"><block wx:if="{{test}}"><block wx:for="{{$root.l1}}" wx:for-item="item1" wx:for-index="index1" wx:if="{{item1.m0}}"><view wx:for="{{item1.l0}}" wx:for-item="item2" wx:for-index="index2" slot="name">{{item2.m1[\'item\']}}</view></block></block></custom-view>',
      'with(this){var l1=test?__map(array1,function(item1,index1){var $orig=__get_orig(item1);var m0=$hasSSP("551070e6-1");var l0=m0?__map(array,function(item2,index2){var $orig=__get_orig(item2);var m1=$getSSP("551070e6-1","name");return{$orig:$orig,m1:m1}}):null;return{$orig:$orig,m0:m0,l0:l0}}):null;$mp.data=Object.assign({},{$root:{l1:l1}})}',
      {
        scopedSlotsCompiler: 'augmented'
      }
    )
  })

  it('generate scoped slot with slotMultipleInstance', () => {
    assertCodegen(
      '<my-component><template v-slot="{item}"><view>{{item}}</view></template></my-component>',
      '<my-component vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}"><block wx:if="{{$root.m0}}"><view wx:for="{{$root.l0}}" wx:for-item="_item" wx:for-index="_index" slot="{{\'default\'+(\'.\'+_index)}}">{{_item[\'item\']}}</view></block></my-component>',
      'with(this){var m0=$hasSSP("551070e6-1");var l0=m0?$getSSP("551070e6-1","default",true):null;$mp.data=Object.assign({},{$root:{m0:m0,l0:l0}})}',
      {
        scopedSlotsCompiler: 'augmented',
        slotMultipleInstance: true
      }
    )
    assertCodegen(
      '<my-component><template v-slot="item"><view>{{item}}</view></template></my-component>',
      '<my-component vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}"><block wx:if="{{$root.m0}}"><view wx:for="{{$root.l0}}" wx:for-item="_item" wx:for-index="_index" slot="{{\'default\'+(\'.\'+_index)}}">{{_item}}</view></block></my-component>',
      'with(this){var m0=$hasSSP("551070e6-1");var l0=m0?$getSSP("551070e6-1","default",true):null;$mp.data=Object.assign({},{$root:{m0:m0,l0:l0}})}',
      {
        scopedSlotsCompiler: 'augmented',
        slotMultipleInstance: true
      }
    )
    assertCodegen(
      '<my-component><template v-slot="item"><view>{{item.text}}</view></template></my-component>',
      '<my-component vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}"><block wx:if="{{$root.m0}}"><view wx:for="{{$root.l0}}" wx:for-item="_item" wx:for-index="_index" slot="{{\'default\'+(\'.\'+_index)}}">{{_item.text}}</view></block></my-component>',
      'with(this){var m0=$hasSSP("551070e6-1");var l0=m0?$getSSP("551070e6-1","default",true):null;$mp.data=Object.assign({},{$root:{m0:m0,l0:l0}})}',
      {
        scopedSlotsCompiler: 'augmented',
        slotMultipleInstance: true
      }
    )
    assertCodegen(
      '<view><slot :item="item"><slot></view>',
      '<view><block wx:if="{{$slots[\'default\']}}"><slot name="{{\'default\'+(\'.\'+$root.m0)}}"></slot></block><block wx:else><slot></slot></block></view>',
      'with(this){$initSSP();var m0=$setSSP("default",{"item":item});$mp.data=Object.assign({},{$root:{m0:m0}});$callSSP()}',
      {
        scopedSlotsCompiler: 'augmented',
        slotMultipleInstance: true
      }
    )
    assertCodegen(
      '<view><slot v-bind="item"><slot></view>',
      '<view><block wx:if="{{$slots[\'default\']}}"><slot name="{{\'default\'+(\'.\'+$root.m0)}}"></slot></block><block wx:else><slot></slot></block></view>',
      'with(this){$initSSP();var m0=$setSSP("default",item);$mp.data=Object.assign({},{$root:{m0:m0}});$callSSP()}',
      {
        scopedSlotsCompiler: 'augmented',
        slotMultipleInstance: true
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
      '<page-meta></page-meta><view><button></button></view>'
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

  it('template with array length', () => {
    assertCodegen(
      '<view>{{array.length}}</view>',
      '<view>{{$root.g0}}</view>',
      'with(this){var g0=array.length;$mp.data=Object.assign({},{$root:{g0:g0}})}'
    )
    assertCodegen(
      '<view>{{array[\'length\']}}</view>',
      '<view>{{$root.g0}}</view>',
      'with(this){var g0=array["length"];$mp.data=Object.assign({},{$root:{g0:g0}})}'
    )
    assertCodegen(
      '<button :disabled="array.length===0">hello world</button>',
      '<button disabled="{{$root.g0===0}}">hello world</button>',
      'with(this){var g0=array.length;$mp.data=Object.assign({},{$root:{g0:g0}})}'
    )
    assertCodegen(
      '<button :disabled="array.test&&test(array.test.test).length===0">hello world</button>',
      '<button disabled="{{$root.g0}}">hello world</button>',
      'with(this){var g0=array.test&&test(array.test.test).length===0;$mp.data=Object.assign({},{$root:{g0:g0}})}'
    )
    assertCodegen(
      '<view :class="\'c\'+array.length">hello world</view>',
      '<view class="{{[\'c\'+$root.g0]}}">hello world</view>',
      'with(this){var g0=array.length;$mp.data=Object.assign({},{$root:{g0:g0}})}'
    )
    assertCodegen(
      '<view :style="array.length===0?\'height:30px;\':\'height:10px;\'">hello world</view>',
      '<view style="{{($root.g0===0?\'height:30px;\':\'height:10px;\')}}">hello world</view>',
      'with(this){var g0=array.length;$mp.data=Object.assign({},{$root:{g0:g0}})}'
    )
    assertCodegen(
      '<view v-if="array.length">hello</view>',
      '<block wx:if="{{$root.g0}}"><view>hello</view></block>',
      'with(this){var g0=array.length;$mp.data=Object.assign({},{$root:{g0:g0}})}'
    )
    assertCodegen(
      '<view v-if="array&&array.length">hello</view>',
      '<block wx:if="{{$root.g0}}"><view>hello</view></block>',
      'with(this){var g0=array&&array.length;$mp.data=Object.assign({},{$root:{g0:g0}})}'
    )
    assertCodegen(
      '<view v-if="test1&&!test2&&array&&array.length">hello</view>',
      '<block wx:if="{{$root.g0}}"><view>hello</view></block>',
      'with(this){var g0=test1&&!test2&&array&&array.length;$mp.data=Object.assign({},{$root:{g0:g0}})}'
    )
    assertCodegen(
      '<view v-show="array.length">hello</view>',
      '<view hidden="{{!($root.g0)}}">hello</view>',
      'with(this){var g0=array.length;$mp.data=Object.assign({},{$root:{g0:g0}})}'
    )
    assertCodegen(
      '<view v-for="(item,index) in list" :key="index"><view v-if="item.length">{{getValue(item)}}</view></view>',
      '<block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view><block wx:if="{{item.g0}}"><view>{{item.m0}}</view></block></view></block>',
      'with(this){var l0=__map(list,function(item,index){var $orig=__get_orig(item);var g0=item.length;var m0=g0?getValue(item):null;return{$orig:$orig,g0:g0,m0:m0}});$mp.data=Object.assign({},{$root:{l0:l0}})}'
    )
    assertCodegen(
      '<view v-for="(item,index) in list" :key="index"><view v-if="Object.values(item.list).length">{{test(item.list)}}</view></view>',
      '<block wx:for="{{$root.l0}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view><block wx:if="{{item.g0}}"><view>{{item.m0}}</view></block></view></block>',
      'with(this){var l0=__map(list,function(item,index){var $orig=__get_orig(item);var g0=Object.values(item.list).length;var m0=g0?test(item.list):null;return{$orig:$orig,g0:g0,m0:m0}});$mp.data=Object.assign({},{$root:{l0:l0}})}'
    )
    assertCodegen(
      '<my-component><template v-slot="{item}">{{item.length}}<template></my-component>',
      '<my-component scoped-slots-compiler="augmented" vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}"><block wx:if="{{$root.m0}}">{{$root.g0}}</block></my-component>',
      'with(this){var m0=$hasSSP("551070e6-1");var g0=m0?$getSSP("551070e6-1","default")["item"].length:null;$mp.data=Object.assign({},{$root:{m0:m0,g0:g0}})}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<my-component><template v-slot="{item}">{{item.length}}<template></my-component>',
      '<my-component generic:scoped-slots-default="test-my-component-default" data-vue-generic="scoped" vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}"></my-component>',
      undefined,
      {
        scopedSlotsCompiler: 'legacy'
      }
    )
  })

  it('skyline gesture', () => {
    assertCodegen(
      '<vertical-drag-gesture-handler onGestureEvent="handlePan" native-view="scroll-view" shouldResponseOnMove="shouldResponse" shouldAcceptGesture="shouldAccept"/>',
      '<vertical-drag-gesture-handler onGestureEvent="handlePan" native-view="scroll-view" shouldResponseOnMove="shouldResponse" shouldAcceptGesture="shouldAccept"></vertical-drag-gesture-handler>'
    )
  })
})
