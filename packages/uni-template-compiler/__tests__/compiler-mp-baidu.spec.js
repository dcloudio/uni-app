const compiler = require('../lib')

function assertCodegen (template, templateCode, renderCode = 'with(this){}', options = {}) {
  const res = compiler.compile(template, {
    resourcePath: 'test.wxml',
    mp: Object.assign({
      minified: true,
      isTest: true,
      platform: 'mp-baidu'
    }, options)
  })

  expect(res.template).toBe(templateCode)
  expect(res.render).toBe(renderCode)
}

describe('mp:compiler-mp-baidu', () => {
  it('generate component', () => {
    assertCodegen(
      '<login @getphonenumber="getphonenumbers" @loaderror="loaderrors"></login>',
      '<login data-event-opts="{{[[\'getphonenumber\',[[\'getphonenumbers\',[\'$event\']]]],[\'loaderror\',[[\'loaderrors\',[\'$event\']]]]]}}" bindgetphonenumber="__e" bindloaderror="__e"></login>'
    )
  })
  it('generate class', () => {
    assertCodegen(
      '<view class="a external-class c" :class="class1">hello world</view>',
      '<view class="{{[\'a\',\'external-class\',\'c\',class1]}}">hello world</view>'
    )
  })
  it('generate v-for directive', () => {
    assertCodegen(
      '<view><view v-for="(item,index) in items" :key="item.id"></view></view>',
      '<view><block s-for="items trackBy item.id" s-for-item="item" s-for-index="index"><view></view></block></view>'
    )
  })
  it('generate scoped slot', () => {
    assertCodegen(
      '<foo><template slot-scope="bar">{{ bar.foo }}</template></foo>',
      '<foo vue-id="551070e6-1" vue-slots="{{[\'default\']}}"><block>{{foo}}</block></foo>'
    )
    assertCodegen(
      '<foo><view slot-scope="bar">{{ bar.foo }}</view></foo>',
      '<foo vue-id="551070e6-1" vue-slots="{{[\'default\']}}"><view>{{foo}}</view></foo>'
    )
  })

  it('generate named scoped slot', () => {
    assertCodegen(
      '<foo><template slot="foo" slot-scope="bar">{{ bar.foo }}</template></foo>',
      '<foo vue-id="551070e6-1" vue-slots="{{[\'foo\']}}"><block slot="foo">{{foo}}</block></foo>'
    )
    assertCodegen(
      '<foo><view slot="foo" slot-scope="bar">{{ bar.foo }}</view></foo>',
      '<foo vue-id="551070e6-1" vue-slots="{{[\'foo\']}}"><view slot="foo">{{foo}}</view></foo>'
    )
  })

  it('generate scoped slot with multiline v-if', () => {
    assertCodegen(
      '<foo><template v-if="\nshow\n" slot-scope="bar">{{ bar.foo }}</template></foo>',
      '<foo vue-id="551070e6-1" vue-slots="{{[\'default\']}}"><block><block s-if="{{show}}">{{foo}}</block><block s-else><block></block></block></block></foo>'
    )
    assertCodegen(
      '<foo><view v-if="\nshow\n" slot="foo" slot-scope="bar">{{ bar.foo }}</view></foo>',
      '<foo vue-id="551070e6-1" vue-slots="{{[\'foo\']}}"><view slot="foo" s-if="{{show}}">{{foo}}</view></foo>'
    )
  })

  it('generate scoped slot', () => {
    assertCodegen(
      '<span><slot v-bind:user="user">{{ user.lastName }}</slot></span>',
      '<label class="_span"><block s-if="{{$slots.default}}"><slot var-user="user"></slot></block><block s-else>{{user.lastName}}</block></label>'
    )
    assertCodegen(
      '<span><slot name="header" v-bind:user="user">{{ user.lastName }}</slot></span>',
      '<label class="_span"><block s-if="{{$slots.header}}"><slot name="header" var-user="user"></slot></block><block s-else>{{user.lastName}}</block></label>'
    )
    assertCodegen(
      '<span><slot name="header" v-bind="user"></slot></span>',
      '<label class="_span"><slot name="header" s-bind="user"></slot></label>'
    )
  })

  it('generate scoped slot with dynamic slot name', () => {
    assertCodegen(
      '<view><slot :name="test" :user="user"></slot></view>',
      '<view><slot name="{{test}}" var-user="user"></slot></view>'
    )
    assertCodegen(
      '<foo><template v-slot:[test]="{user}"><view>{{user}}</view></template></foo>',
      '<foo vue-id="551070e6-1" vue-slots="{{[test]}}"><view slot="{{test}}">{{user}}</view></foo>'
    )
  })

  it('generate scoped slot with scopedSlotsCompiler: auto', () => {
    assertCodegen(
      '<my-component><template v-slot="{item}">{{item}}<template></my-component>',
      '<my-component vue-id="551070e6-1" vue-slots="{{[\'default\']}}"><block>{{item}}</block></my-component>',
      'with(this){}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<my-component><template v-slot="{item}">{{getValue(item)}}<template></my-component>',
      '<my-component scoped-slots-compiler="augmented" vue-id="551070e6-1" vue-slots="{{[\'default\']}}"><block s-if="{{$root.m0}}">{{$root.m1}}</block></my-component>',
      'with(this){var m0=$hasSSP("551070e6-1");var m1=m0?getValue($getSSP("551070e6-1","default")["item"]):null;$mp.data=Object.assign({},{$root:{m0:m0,m1:m1}})}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<my-component><template v-slot="{item}">{{item}}{{title}}<template></my-component>',
      '<my-component vue-id="551070e6-1" vue-slots="{{[\'default\']}}"><block>{{item+title}}</block></my-component>',
      'with(this){}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<my-component><template v-slot="{item}">{{item}}{{getValue(title)}}<template></my-component>',
      '<my-component vue-id="551070e6-1" vue-slots="{{[\'default\']}}"><block>{{item+$root.m0}}</block></my-component>',
      'with(this){var m0=getValue(title);$mp.data=Object.assign({},{$root:{m0:m0}})}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<my-component><template v-slot="item">{{getValue(item.text)}}<template></my-component>',
      '<my-component scoped-slots-compiler="augmented" vue-id="551070e6-1" vue-slots="{{[\'default\']}}"><block s-if="{{$root.m0}}">{{$root.m1}}</block></my-component>',
      'with(this){var m0=$hasSSP("551070e6-1");var m1=m0?getValue($getSSP("551070e6-1","default").text):null;$mp.data=Object.assign({},{$root:{m0:m0,m1:m1}})}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<view><slot :item="item"><slot></view>',
      '<view><block s-if="{{$slots.default}}"><slot var-item="item"></slot></block><block s-else><slot></slot></block></view>',
      'with(this){$initSSP();if($scope.data.scopedSlotsCompiler==="augmented"){$setSSP("default",{"item":item})}$callSSP()}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<view><slot v-bind="object"><slot></view>',
      '<view><block s-if="{{$slots.default}}"><slot></slot></block><block s-else><slot></slot></block></view>',
      'with(this){$initSSP();if($scope.data.scopedSlotsCompiler==="augmented"){$setSSP("default",object)}$callSSP()}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
  })

  it('generate scoped slot with scopedSlotsCompiler: augmented', () => {
    assertCodegen(
      '<custom-view><template v-if="test" v-for="(item1, index1) in array1" v-slot:name="{item}"><template v-for="(item2, index2) in array"><view>{{item}}</view></template></template></custom-view>',
      '<custom-view vue-id="551070e6-1" vue-slots="{{[\'name\']}}"><block slot="name" s-if="{{test}}"><block s-for="$root.l1" s-for-item="item1" s-for-index="index1"><block s-if="{{item1.m0}}"><block s-for="item1.l0" s-for-item="item2" s-for-index="index2"><view>{{item2.m1[\'item\']}}</view></block></block></block></block></custom-view>',
      'with(this){var l1=test?__map(array1,function(item1,index1){var $orig=__get_orig(item1);var m0=$hasSSP("551070e6-1");var l0=m0?__map(array,function(item2,index2){var $orig=__get_orig(item2);var m1=$getSSP("551070e6-1","name");return{$orig:$orig,m1:m1}}):null;return{$orig:$orig,m0:m0,l0:l0}}):null;$mp.data=Object.assign({},{$root:{l1:l1}})}',
      {
        scopedSlotsCompiler: 'augmented'
      }
    )
  })

  it('generate scoped slot with slotMultipleInstance', () => {
    assertCodegen(
      '<my-component><template v-slot="item"><view>{{item}}</view></template></my-component>',
      '<my-component vue-id="551070e6-1" vue-slots="{{[\'default\']}}"><block slot="{{\'default\'+(\'.\'+0)}}" s-if="{{$root.m0}}"><block s-for="$root.l0" s-for-item="_item" s-for-index="_index"><view>{{_item}}</view></block></block></my-component>',
      'with(this){var m0=$hasSSP("551070e6-1");var l0=m0?$getSSP("551070e6-1","default",true):null;$mp.data=Object.assign({},{$root:{m0:m0,l0:l0}})}',
      {
        scopedSlotsCompiler: 'augmented',
        slotMultipleInstance: true
      }
    )
  })

  it('generate vue id', () => {
    assertCodegen(
      '<Test/>',
      '<test vue-id="551070e6-1"></test>'
    )
    assertCodegen(
      '<Test a="a">',
      '<test vue-id="551070e6-1" a="a"></test>'
    )
    assertCodegen(
      '<view><Test v-for="item in items" :key="item"/></view>',
      '<view><block s-for="items trackBy item" s-for-item="item" s-for-index="__i0__"><test vue-id="{{\'551070e6-1-\'+__i0__}}"></test></block></view>'
    )
    assertCodegen(
      '<view><Test v-for="item in items" :key="item"><Test v-for="item in item.items" :key="item"></Test></Test></view>',
      '<view><block s-for="items trackBy item" s-for-item="item" s-for-index="__i0__"><test vue-id="{{\'551070e6-1-\'+__i0__}}" vue-slots="{{[\'default\']}}"><block s-for="item.items trackBy item" s-for-item="item" s-for-index="__i1__"><test vue-id="{{(\'551070e6-2-\'+__i0__+\'-\'+__i1__)+\',\'+(\'551070e6-1-\'+__i0__)}}"></test></block></test></block></view>'
    )
    assertCodegen(
      '<view><Test v-for="(item,index) in items" :key="item"><Test v-for="(item,index1) in item.items" :key="item"></Test></Test></view>',
      '<view><block s-for="items trackBy item" s-for-item="item" s-for-index="index"><test vue-id="{{\'551070e6-1-\'+index}}" vue-slots="{{[\'default\']}}"><block s-for="item.items trackBy item" s-for-item="item" s-for-index="index1"><test vue-id="{{(\'551070e6-2-\'+index+\'-\'+index1)+\',\'+(\'551070e6-1-\'+index)}}"></test></block></test></block></view>'
    )
  })

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
