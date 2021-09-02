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
  it('generate class', () => {
    assertCodegen(
      '<view class="a external-class c" :class="class1">hello world</view>',
      '<view class="{{[\'a\',\'external-class\',\'c\',class1]}}">hello world</view>'
    )
  })
  it('generate v-for directive', () => {
    assertCodegen(
      '<view><view v-for="(item,index) in items" :key="index"></view></view>',
      '<view><block s-for="{{items}}" s-for-item="item" s-for-index="index" s-key="index"><view></view></block></view>'
    )
  })
  it('generate scoped slot', () => {
    assertCodegen(
      '<foo><template slot-scope="bar">{{ bar.foo }}</template></foo>',
      '<foo vue-id="551070e6-1" vue-slots="{{[\'default\']}}"><view>{{foo}}</view></foo>'
    )
    assertCodegen(
      '<foo><view slot-scope="bar">{{ bar.foo }}</view></foo>',
      '<foo vue-id="551070e6-1" vue-slots="{{[\'default\']}}"><view><view>{{foo}}</view></view></foo>'
    )
  })

  it('generate named scoped slot', () => {
    assertCodegen(
      '<foo><template slot="foo" slot-scope="bar">{{ bar.foo }}</template></foo>',
      '<foo vue-id="551070e6-1" vue-slots="{{[\'foo\']}}"><view slot="foo">{{foo}}</view></foo>'
    )
    assertCodegen(
      '<foo><view slot="foo" slot-scope="bar">{{ bar.foo }}</view></foo>',
      '<foo vue-id="551070e6-1" vue-slots="{{[\'foo\']}}"><view slot="foo"><view>{{foo}}</view></view></foo>'
    )
  })

  it('generate scoped slot with multiline v-if', () => {
    assertCodegen(
      '<foo><template v-if="\nshow\n" slot-scope="bar">{{ bar.foo }}</template></foo>',
      '<foo vue-id="551070e6-1" vue-slots="{{[\'default\']}}"><view><block s-if="{{show}}">{{foo}}</block><block s-else><block></block></block></view></foo>'
    )
    assertCodegen(
      '<foo><view v-if="\nshow\n" slot="foo" slot-scope="bar">{{ bar.foo }}</view></foo>',
      '<foo vue-id="551070e6-1" vue-slots="{{[\'foo\']}}"><view slot="foo"><block s-if="{{show}}"><view>{{foo}}</view></block></view></foo>'
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
  })

  it('generate scoped slot with scopedSlotsCompiler: auto', () => {
    assertCodegen(
      '<my-component><template v-slot="{item}">{{item}}<template></my-component>',
      '<my-component vue-id="551070e6-1" vue-slots="{{[\'default\']}}"><view>{{item}}</view></my-component>',
      'with(this){}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<my-component><template v-slot="{item}">{{getValue(item)}}<template></my-component>',
      '<my-component scoped-slots-compiler="augmented" vue-id="551070e6-1" vue-slots="{{[\'default\']}}"><block><block s-if="{{$root.m0}}">{{$root.m1}}</block></block></my-component>',
      'with(this){var m0=$hasScopedSlotsParams("551070e6-1");var m1=m0?getValue($getScopedSlotsParams("551070e6-1","default","item")):null;$mp.data=Object.assign({},{$root:{m0:m0,m1:m1}})}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<my-component><template v-slot="item">{{getValue(item.text)}}<template></my-component>',
      '<my-component scoped-slots-compiler="augmented" vue-id="551070e6-1" vue-slots="{{[\'default\']}}"><block><block s-if="{{$root.m0}}">{{$root.m1}}</block></block></my-component>',
      'with(this){var m0=$hasScopedSlotsParams("551070e6-1");var m1=m0?getValue($getScopedSlotsParams("551070e6-1","default").text):null;$mp.data=Object.assign({},{$root:{m0:m0,m1:m1}})}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<view><slot :item="item"><slot></view>',
      '<view><block s-if="{{$slots.default}}"><slot var-item="item"></slot></block><block s-else><slot></slot></block></view>',
      'with(this){if($scope.data.scopedSlotsCompiler==="augmented"){$setScopedSlotsParams("default",{"item":item})}}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<view><slot v-bind="object"><slot></view>',
      '<view><block s-if="{{$slots.default}}"><slot></slot></block><block s-else><slot></slot></block></view>',
      'with(this){if($scope.data.scopedSlotsCompiler==="augmented"){$setScopedSlotsParams("default",object)}}',
      {
        scopedSlotsCompiler: 'auto'
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
      '<view><block s-for="{{items}}" s-for-item="item" s-for-index="__i0__" s-key="*this"><test vue-id="{{\'551070e6-1-\'+__i0__}}"></test></block></view>'
    )
    assertCodegen(
      '<view><Test v-for="item in items" :key="item"><Test v-for="item in item.items" :key="item"></Test></Test></view>',
      '<view><block s-for="{{items}}" s-for-item="item" s-for-index="__i0__" s-key="*this"><test vue-id="{{\'551070e6-1-\'+__i0__}}" vue-slots="{{[\'default\']}}"><block s-for="{{item.items}}" s-for-item="item" s-for-index="__i1__" s-key="*this"><test vue-id="{{(\'551070e6-2-\'+__i0__+\'-\'+__i1__)+\',\'+(\'551070e6-1-\'+__i0__)}}"></test></block></test></block></view>'
    )
    assertCodegen(
      '<view><Test v-for="(item,index) in items" :key="item"><Test v-for="(item,index1) in item.items" :key="item"></Test></Test></view>',
      '<view><block s-for="{{items}}" s-for-item="item" s-for-index="index" s-key="*this"><test vue-id="{{\'551070e6-1-\'+index}}" vue-slots="{{[\'default\']}}"><block s-for="{{item.items}}" s-for-item="item" s-for-index="index1" s-key="*this"><test vue-id="{{(\'551070e6-2-\'+index+\'-\'+index1)+\',\'+(\'551070e6-1-\'+index)}}"></test></block></test></block></view>'
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
