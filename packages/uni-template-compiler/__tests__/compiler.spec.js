const compiler = require('../lib')

function assertCodegen (template, templateCode, renderCode = 'with(this){}') {
  const res = compiler.compile(template, {
    resourcePath: 'test.wxml',
    mp: {
      minified: true,
      isTest: true,
      platform: 'mp-weixin'
    }
  })

  expect(res.template).toBe(templateCode)
  expect(res.render).toBe(renderCode)
}

describe('mp:compiler', () => {
  // TODO
  // it('generate directive', () => {
  //   assertCodegen(
  //     '<view v-custom1:arg1.modifier="value1" v-custom2></view>',
  //     `with(this){return _c('view',{directives:[{name:"custom1",rawName:"v-custom1:arg1.modifier",value:(value1),expression:"value1",arg:"arg1",modifiers:{"modifier":true}},{name:"custom2",rawName:"v-custom2"}]})}`
  //   )
  // })

  it('generate filters', () => {
    assertCodegen(
      '<view :id="a | b | c">text {{ d | e | f }} text</view>',
      '<view id="{{$root.f0}}">{{"text "+$root.f1+" text"}}</view>',
      'with(this){var f0=_f("c")(_f("b")(a));var f1=_f("f")(_f("e")(d));$mp.data=Object.assign({},{$root:{f0:f0,f1:f1}})}'
    )
  })

  it('generate filters with no arguments', () => {
    assertCodegen(
      '<view>{{ d | e() }}</view>',
      '<view>{{$root.f0}}</view>',
      'with(this){var f0=_f("e")(d);$mp.data=Object.assign({},{$root:{f0:f0}})}'
    )
  })

  it('generate v-for directive', () => {
    assertCodegen(
      '<view><view v-for="item in items" :key="item.uid"></view></view>',
      '<view><block wx:for="{{items}}" wx:for-item="item" wx:for-index="__i0__" wx:key="uid"><view></view></block></view>'
    )
    // iterator syntax
    assertCodegen(
      '<view><view v-for="(item, i) in items"></view></view>',
      '<view><block wx:for="{{items}}" wx:for-item="item" wx:for-index="i"><view></view></block></view>'
    )
    // TODO
    // assertCodegen(
    //   '<view><view v-for="(item, key, index) in items"></view></view>',
    //   `with(this){return _c('view',_l((items),function(item,key,index){return _c('view')}),0)}`
    // )
    // destructuring
    // TODO
    // assertCodegen(
    //   '<view><view v-for="{ a, b } in items"></view></view>',
    //   `<view><view wx:for="{{items}}" wx:for-item="{{a}}" wx:for-index="{{b}}"></view></view>`
    // )
    // TODO
    // assertCodegen(
    //   '<view><view v-for="({ a, b }, key, index) in items"></view></view>',
    //   `with(this){return _c('view',_l((items),function({ a, b },key,index){return _c('view')}),0)}`
    // )
    // v-for with extra element
    assertCodegen(
      '<view><view></view><view v-for="item in items"></view></view>',
      '<view><view></view><block wx:for="{{items}}" wx:for-item="item" wx:for-index="__i0__"><view></view></block></view>'
    )
  })

  it('generate v-if directive', () => {
    assertCodegen(
      '<view v-if="show">hello</view>',
      '<block wx:if="{{show}}"><view>hello</view></block>'
    )
  })

  it('generate v-else directive', () => {
    assertCodegen(
      '<view><view v-if="show">hello</view><view v-else>world</view></view>',
      '<view><block wx:if="{{show}}"><view>hello</view></block><block wx:else><view>world</view></block></view>'
    )
  })

  it('generate v-else-if directive', () => {
    assertCodegen(
      '<view><view v-if="show">hello</view><view v-else-if="hide">world</view></view>',
      '<view><block wx:if="{{show}}"><view>hello</view></block><block wx:else><block wx:if="{{hide}}"><view>world</view></block></block></view>'
    )
  })

  it('generate v-else-if with v-else directive', () => {
    assertCodegen(
      '<view><view v-if="show">hello</view><view v-else-if="hide">world</view><view v-else>bye</view></view>',
      '<view><block wx:if="{{show}}"><view>hello</view></block><block wx:else><block wx:if="{{hide}}"><view>world</view></block><block wx:else><view>bye</view></block></block></view>'
    )
  })

  it('generate multi v-else-if with v-else directive', () => {
    assertCodegen(
      '<view><view v-if="show">hello</view><view v-else-if="hide">world</view><view v-else-if="3">elseif</view><view v-else>bye</view></view>',
      '<view><block wx:if="{{show}}"><view>hello</view></block><block wx:else><block wx:if="{{hide}}"><view>world</view></block><block wx:else><block wx:if="{{3}}"><view>elseif</view></block><block wx:else><view>bye</view></block></block></block></view>'
    )
  })

  it('generate ref', () => {
    assertCodegen(
      '<view ref="component1"></view>',
      '<view data-ref="component1" class="vue-ref"></view>'
    )
  })

  it('generate ref on v-for', () => {
    assertCodegen(
      '<ul><li v-for="item in items" ref="component1"></li></ul>',
      '<view class="_ul"><block wx:for="{{items}}" wx:for-item="item" wx:for-index="__i0__"><view data-ref="component1" class="_li vue-ref-in-for"></view></block></view>'
    )
  })

  // it('generate v-bind directive', () => {
  //   assertCodegen(
  //     '<view v-bind="test"></view>',
  //     `<view v-bind="test"></view>`
  //   )
  // })

  // it('generate v-bind with prop directive', () => {
  //   assertCodegen(
  //     '<view v-bind.prop="test"></view>',
  //     `with(this){return _c('view',_b({},'view',test,true))}`
  //   )
  // })

  // it('generate v-bind directive with sync modifier', () => {
  //   assertCodegen(
  //     '<view v-bind.sync="test"></view>',
  //     `with(this){return _c('view',_b({},'view',test,false,true))}`
  //   )
  // })

  it('generate v-model directive', () => {
    assertCodegen(
      '<input v-model="test">',
      '<input data-event-opts="{{[[\'input\',[[\'__set_model\',[\'\',\'test\',\'$event\',[]]]]]]}}" value="{{test}}" bindinput="__e"/>'
    )
  })

  it('generate multiline v-model directive', () => {
    assertCodegen(
      '<input v-model="\n test \n">',
      '<input data-event-opts="{{[[\'input\',[[\'__set_model\',[\'\',\'test\',\'$event\',[]]]]]]}}" value="{{test}}" bindinput="__e"/>'
    )
  })

  it('generate multiline v-model directive on custom component', () => {
    assertCodegen(
      '<my-component v-model="\n test \n" />',
      '<my-component bind:input="__e" vue-id="551070e6-1" value="{{test}}" data-event-opts="{{[[\'^input\',[[\'__set_model\',[\'\',\'test\',\'$event\',[]]]]]]}}" bind:__l="__l"></my-component>'
    )
  })

  it('generate template tag', () => {
    assertCodegen(
      '<view><template><view>{{hello}}</view></template></view>',
      '<view><view>{{hello}}</view></view>'
    )
  })

  it('generate single slot', () => {
    assertCodegen('<view><slot></slot></view>', '<view><slot></slot></view>')
  })

  it('generate named slot', () => {
    assertCodegen(
      '<view><slot name="one"></slot></view>',
      '<view><slot name="one"></slot></view>'
    )
  })

  // it('generate slot fallback content', () => {
  //   assertCodegen(
  //     '<view><slot><view>hi</view></slot></view>',
  //     `with(this){return _c('view',[_t("default",[_c('view',[_v("hi")])])],2)}`
  //   )
  // })

  it('generate slot target', () => {
    assertCodegen(
      '<view slot="one">hello world</view>',
      '<view slot="one">hello world</view>'
    )
  })

  // it('generate scoped slot', () => {
  //   assertCodegen(
  //     '<foo><template slot-scope="bar">{{ bar }}</template></foo>',
  //     `with(this){return _c('foo',{scopedSlots:_u([{key:"default",fn:function(bar){return [_v(_s(bar))]}}])})}`
  //   )
  //   assertCodegen(
  //     '<foo><view slot-scope="bar">{{ bar }}</view></foo>',
  //     `with(this){return _c('foo',{scopedSlots:_u([{key:"default",fn:function(bar){return _c('view',{},[_v(_s(bar))])}}])})}`
  //   )
  // })

  // it('generate named scoped slot', () => {
  //   assertCodegen(
  //     '<foo><template slot="foo" slot-scope="bar">{{ bar }}</template></foo>',
  //     `with(this){return _c('foo',{scopedSlots:_u([{key:"foo",fn:function(bar){return [_v(_s(bar))]}}])})}`
  //   )
  //   assertCodegen(
  //     '<foo><view slot="foo" slot-scope="bar">{{ bar }}</view></foo>',
  //     `with(this){return _c('foo',{scopedSlots:_u([{key:"foo",fn:function(bar){return _c('view',{},[_v(_s(bar))])}}])})}`
  //   )
  // })

  // it('generate scoped slot with multiline v-if', () => {
  //   assertCodegen(
  //     '<foo><template v-if="\nshow\n" slot-scope="bar">{{ bar }}</template></foo>',
  //     `with(this){return _c('foo',{scopedSlots:_u([{key:"default",fn:function(bar){return (\nshow\n)?[_v(_s(bar))]:undefined}}])})}`
  //   )
  //   assertCodegen(
  //     '<foo><view v-if="\nshow\n" slot="foo" slot-scope="bar">{{ bar }}</view></foo>',
  //     `with(this){return _c(\'foo\',{scopedSlots:_u([{key:"foo",fn:function(bar){return (\nshow\n)?_c(\'view\',{},[_v(_s(bar))]):_e()}}])})}`
  //   )
  // })

  it('generate class binding', () => {
    // static
    assertCodegen(
      '<view class="class1">hello world</view>',
      '<view class="class1">hello world</view>'
    )
    // dynamic
    assertCodegen(
      '<view :class="class1">hello world</view>',
      '<view class="{{[class1]}}">hello world</view>'
    )
    //     assertCodegen(
    //       '<view :class="class1">hello world</view>',
    //       `<view class="{{$root.c0}}">hello world</view>`,
    //       `with(this){var c0=__get_class(class1);$mp.data=Object.assign({},{$root:{c0:c0}})}`
    //     )
  })

  it('generate staticStyle', () => {
    assertCodegen(
      '<view style="height:400upx">hello world</view>',
      '<view style="height:400rpx;">hello world</view>'
    )
  })

  it('generate style binding', () => {
    assertCodegen(
      '<view :style="error">hello world</view>',
      '<view style="{{(error)}}">hello world</view>'
    )
    //     assertCodegen(
    //       '<view :style="error">hello world</view>',
    //       `<view style="{{$root.s0}}">hello world</view>`,
    //       `with(this){var s0=__get_style(error);$mp.data=Object.assign({},{$root:{s0:s0}})}`
    //     )
  })

  it('generate v-show directive', () => {
    assertCodegen(
      '<view v-show="shown">hello world</view>',
      '<view hidden="{{!(shown)}}">hello world</view>'
    )
  })

  it('generate DOM props with v-bind directive', () => {
    // input + value
    assertCodegen('<input :value="msg">', '<input value="{{msg}}"/>')
    // non input
    assertCodegen('<view :value="msg"/>', '<view value="{{msg}}"></view>')
  })

  it('generate attrs with v-bind directive', () => {
    assertCodegen('<input :name="field1">', '<input name="{{field1}}"/>')
  })

  it('generate static attrs', () => {
    assertCodegen('<input name="field1">', '<input name="field1"/>')
  })

  it('generate events with v-on directive', () => {
    assertCodegen(
      '<input @input="onInput">',
      '<input data-event-opts="{{[[\'input\',[[\'onInput\',[\'$event\']]]]]}}" bindinput="__e"/>'
    )
  })

  it('generate events with method call', () => {
    assertCodegen(
      '<input @input="onInput($event);">',
      '<input data-event-opts="{{[[\'input\',[[\'onInput\',[\'$event\']]]]]}}" bindinput="__e"/>'
    )
    // empty arguments
    assertCodegen(
      '<input @input="onInput();">',
      '<input data-event-opts="{{[[\'input\',[[\'onInput\']]]]}}" bindinput="__e"/>'
    )
    // without semicolon
    assertCodegen(
      '<input @input="onInput($event)">',
      '<input data-event-opts="{{[[\'input\',[[\'onInput\',[\'$event\']]]]]}}" bindinput="__e"/>'
    )
    // multiple args
    assertCodegen(
      '<input @input="onInput($event, \'abc\', 5);">',
      '<input data-event-opts="{{[[\'input\',[[\'onInput\',[\'$event\',\'abc\',5]]]]]}}" bindinput="__e"/>'
    )
    // expression in args
    assertCodegen(
      '<input @input="onInput($event, 2+2);">',
      '<input data-event-opts="{{[[\'input\',[[\'onInput\',[\'$event\',2+2]]]]]}}" bindinput="__e"/>'
    )
    // tricky symbols in args
    //         assertCodegen(
    //             `<input @input="onInput(');[\\'());');">`,
    //             `<input data-event-id="e0" bindinput="__e"/>`,
    //             `with(this){if(!$mp.events){$mp.events=__get_event({"e0":{on:{"input":function($event){onInput(");['());")}}}})}}`
    //         )
  })

  //     it('generate events with multiple statements', () => {
  //         // normal function
  //         assertCodegen(
  //             '<input @input="onInput1();onInput2()">',
  //             `<input data-event-id="e0" bindinput="__e"/>`,
  //             `with(this){if(!$mp.events){$mp.events=__get_event({"e0":{on:{"input":function($event){onInput1();onInput2()}}}})}}`
  //         )
  //         // function with multiple args
  //         assertCodegen(
  //             '<input @input="onInput1($event, \'text\');onInput2(\'text2\', $event)">',
  //             `<input data-event-id="e0" bindinput="__e"/>`,
  //             `with(this){if(!$mp.events){$mp.events=__get_event({"e0":{on:{"input":function($event){onInput1($event,"text");onInput2("text2",$event)}}}})}}`
  //         )
  //     })

  //     it('generate events with keycode', () => {
  //         assertCodegen(
  //             '<input @input.enter="onInput">',
  //             `with(this){return _c('input',{on:{"input":function($event){if(!('button' in $event)&&_k($event.keyCode,"enter",13,$event.key,"Enter"))return null;return onInput($event)}}})}`
  //         )
  //         // multiple keycodes (delete)
  //         assertCodegen(
  //             '<input @input.delete="onInput">',
  //             `with(this){return _c('input',{on:{"input":function($event){if(!('button' in $event)&&_k($event.keyCode,"delete",[8,46],$event.key,["Backspace","Delete","Del"]))return null;return onInput($event)}}})}`
  //         )
  //         // multiple keycodes (esc)
  //         assertCodegen(
  //             '<input @input.esc="onInput">',
  //             `with(this){return _c('input',{on:{"input":function($event){if(!('button' in $event)&&_k($event.keyCode,"esc",27,$event.key,["Esc","Escape"]))return null;return onInput($event)}}})}`
  //         )
  //         // multiple keycodes (space)
  //         assertCodegen(
  //             '<input @input.space="onInput">',
  //             `with(this){return _c('input',{on:{"input":function($event){if(!('button' in $event)&&_k($event.keyCode,"space",32,$event.key,[" ","Spacebar"]))return null;return onInput($event)}}})}`
  //         )
  //         // multiple keycodes (chained)
  //         assertCodegen(
  //             '<input @keydown.enter.delete="onInput">',
  //             `with(this){return _c('input',{on:{"keydown":function($event){if(!('button' in $event)&&_k($event.keyCode,"enter",13,$event.key,"Enter")&&_k($event.keyCode,"delete",[8,46],$event.key,["Backspace","Delete","Del"]))return null;return onInput($event)}}})}`
  //         )
  //         // number keycode
  //         assertCodegen(
  //             '<input @input.13="onInput">',
  //             `with(this){return _c('input',{on:{"input":function($event){if(!('button' in $event)&&$event.keyCode!==13)return null;return onInput($event)}}})}`
  //         )
  //         // custom keycode
  //         assertCodegen(
  //             '<input @input.custom="onInput">',
  //             `with(this){return _c('input',{on:{"input":function($event){if(!('button' in $event)&&_k($event.keyCode,"custom",undefined,$event.key,undefined))return null;return onInput($event)}}})}`
  //         )
  //     })

  it('generate events with generic modifiers', () => {
    assertCodegen(
      '<input @input.stop="onInput">',
      '<input data-event-opts="{{[[\'input\',[[\'onInput\',[\'$event\']]]]]}}" catchinput="__e"/>'
    )
    assertCodegen(
      '<input @input.prevent="onInput">',
      '<input data-event-opts="{{[[\'input\',[[\'onInput\',[\'$event\']]]]]}}" bindinput="__e"/>'
    )
    assertCodegen(
      '<input @input.self="onInput">',
      '<input data-event-opts="{{[[\'input\',[[\'onInput\',[\'$event\']]]]]}}" bindinput="__e"/>'
    )
  })

  // GitHub Issues #5146
  it('generate events with generic modifiers and keycode correct order', () => {
    assertCodegen(
      '<input @keydown.enter.prevent="onInput">',
      '<input data-event-opts="{{[[\'keydown\',[[\'onInput\',[\'$event\']]]]]}}" bindkeydown="__e"/>'
    )

    assertCodegen(
      '<input @keydown.enter.stop="onInput">',
      '<input data-event-opts="{{[[\'keydown\',[[\'onInput\',[\'$event\']]]]]}}" catchkeydown="__e"/>'
    )
  })

  it('generate events with mouse event modifiers', () => {
    assertCodegen(
      '<input @click.ctrl="onClick">',
      '<input data-event-opts="{{[[\'tap\',[[\'onClick\',[\'$event\']]]]]}}" bindtap="__e"/>'
    )
    assertCodegen(
      '<input @click.shift="onClick">',
      '<input data-event-opts="{{[[\'tap\',[[\'onClick\',[\'$event\']]]]]}}" bindtap="__e"/>'
    )
    assertCodegen(
      '<input @click.alt="onClick">',
      '<input data-event-opts="{{[[\'tap\',[[\'onClick\',[\'$event\']]]]]}}" bindtap="__e"/>'
    )
    assertCodegen(
      '<input @click.meta="onClick">',
      '<input data-event-opts="{{[[\'tap\',[[\'onClick\',[\'$event\']]]]]}}" bindtap="__e"/>'
    )
    assertCodegen(
      '<input @click.exact="onClick">',
      '<input data-event-opts="{{[[\'tap\',[[\'onClick\',[\'$event\']]]]]}}" bindtap="__e"/>'
    )
    assertCodegen(
      '<input @click.ctrl.exact="onClick">',
      '<input data-event-opts="{{[[\'tap\',[[\'onClick\',[\'$event\']]]]]}}" bindtap="__e"/>'
    )
  })

  it('generate events with multiple modifiers', () => {
    assertCodegen(
      '<input @input.stop.prevent.self="onInput">',
      '<input data-event-opts="{{[[\'input\',[[\'onInput\',[\'$event\']]]]]}}" catchinput="__e"/>'
    )
  })

  it('generate events with capture modifier', () => {
    assertCodegen(
      '<input @input.capture="onInput">',
      '<input data-event-opts="{{[[\'input\',[[\'onInput\',[\'$event\']]]]]}}" capture-bind:input="__e"/>'
    )
  })

  it('generate events with once modifier', () => {
    assertCodegen(
      '<input @input.once="onInput">',
      '<input data-event-opts="{{[[\'~input\',[[\'onInput\',[\'$event\']]]]]}}" bindinput="__e"/>'
    )
  })

  it('generate events with capture and once modifier', () => {
    assertCodegen(
      '<input @input.capture.once="onInput">',
      '<input data-event-opts="{{[[\'~input\',[[\'onInput\',[\'$event\']]]]]}}" capture-bind:input="__e"/>'
    )
  })

  it('generate events with once and capture modifier', () => {
    assertCodegen(
      '<input @input.once.capture="onInput">',
      '<input data-event-opts="{{[[\'~input\',[[\'onInput\',[\'$event\']]]]]}}" capture-bind:input="__e"/>'
    )
  })

  it('generate events with inline statement', () => {
    assertCodegen(
      '<input @input="current++">',
      '<input data-event-opts="{{[[\'input\',[[\'e0\',[\'$event\']]]]]}}" bindinput="__e"/>',
      'with(this){if(!_isMounted){e0=function($event){current++}}}'
    )
  })

  it('generate events with inline function expression', () => {
    // normal function
    assertCodegen(
      '<input @input="function () { current++ }">',
      '<input data-event-opts="{{[[\'input\',[[\'e0\',[\'$event\']]]]]}}" bindinput="__e"/>',
      'with(this){if(!_isMounted){e0=function(){current++}}}'
    )
    // normal named function
    assertCodegen(
      '<input @input="function fn () { current++ }">',
      '<input data-event-opts="{{[[\'input\',[[\'e0\',[\'$event\']]]]]}}" bindinput="__e"/>',
      'with(this){if(!_isMounted){e0=function fn(){current++}}}'
    )

    // arrow with no args
    assertCodegen(
      '<input @input="()=>current++">',
      '<input data-event-opts="{{[[\'input\',[[\'e0\',[\'$event\']]]]]}}" bindinput="__e"/>',
      'with(this){if(!_isMounted){e0=()=>current++}}'
    )
    // arrow with parens, single arg
    assertCodegen(
      '<input @input="(e) => current++">',
      '<input data-event-opts="{{[[\'input\',[[\'e0\',[\'$event\']]]]]}}" bindinput="__e"/>',
      'with(this){if(!_isMounted){e0=e=>current++}}'
    )
    // arrow with parens, multi args
    assertCodegen(
      '<input @input="(a, b, c) => current++">',
      '<input data-event-opts="{{[[\'input\',[[\'e0\',[\'$event\']]]]]}}" bindinput="__e"/>',
      'with(this){if(!_isMounted){e0=(a,b,c)=>current++}}'
    )
    // arrow with destructuring
    assertCodegen(
      '<input @input="({ a, b }) => current++">',
      '<input data-event-opts="{{[[\'input\',[[\'e0\',[\'$event\']]]]]}}" bindinput="__e"/>',
      'with(this){if(!_isMounted){e0=({a,b})=>current++}}'
    )
    // arrow single arg no parens
    assertCodegen(
      '<input @input="e=>current++">',
      '<input data-event-opts="{{[[\'input\',[[\'e0\',[\'$event\']]]]]}}" bindinput="__e"/>',
      'with(this){if(!_isMounted){e0=e=>current++}}'
    )
    // with modifiers
    assertCodegen(
      '<input @input.stop="e=>current++">',
      '<input data-event-opts="{{[[\'input\',[[\'e0\',[\'$event\']]]]]}}" catchinput="__e"/>',
      'with(this){if(!_isMounted){e0=function($event){$event.stopPropagation();return(e=>current++)($event)}}}'
    )
  })

  // #3893
  it('should not treat handler with unexpected whitespace as inline statement', () => {
    assertCodegen(
      '<input @input=" onInput ">',
      '<input data-event-opts="{{[[\'input\',[[\'onInput\',[\'$event\']]]]]}}" bindinput="__e"/>'
    )
  })

  //     it('generate unhandled events', () => {
  //         assertCodegen(
  //             '<input @input="current++">',
  //             `with(this){return _c('input',{on:{"input":function(){}}})}`,
  //             ast => {
  //                 ast.events.input = undefined
  //             }
  //         )
  //     })

  //     it('generate multiple event handlers', () => {
  //         assertCodegen(
  //             '<input @input="current++" @input.stop="onInput">',
  //             `<input data-event-id="e0" catchinput="__e"/>`,
  //             `with(this){if(!$mp.events){$mp.events=__get_event({"e0":{on:{"input":[function($event){current++},function($event){$event.stopPropagation();return onInput($event)}]}}})}}`
  //         )
  //     })

  it('generate component', () => {
    assertCodegen(
      '<my-component name="mycomponent1" :msg="msg" @notify="onNotify"><div>hi</div></my-component>',
      '<my-component vue-id="551070e6-1" name="mycomponent1" msg="{{msg}}" data-event-opts="{{[[\'^notify\',[[\'onNotify\']]]]}}" bind:notify="__e" bind:__l="__l" vue-slots="{{[\'default\']}}"><view class="_div">hi</view></my-component>'
      // `with(this){if(!$mp.events){$mp.events=__get_event({"e0":{on:{"notify":onNotify},component:true}})}}`
    )
  })

  //     it('generate svg component with children', () => {
  //         assertCodegen(
  //             '<svg><my-comp><circle :r="10"></circle></my-comp></svg>',
  //             `<svg><my-comp><circle r="{{10}}"></circle></my-comp></svg>`
  //         )
  //     })

  it('generate is attribute', () => {
    assertCodegen(
      '<div is="component1"></div>',
      '<component1 vue-id="551070e6-1" bind:__l="__l"></component1>'
    )
    //         assertCodegen(
    //             '<div :is="component1"></div>',
    //             '<view is="{{component1}}"></view>'
    //         )
    // maybe a component and normalize type should be 1
    assertCodegen(
      '<div><div is="component1"></div></div>',
      '<view class="_div"><component1 vue-id="551070e6-1" bind:__l="__l"></component1></view>'
    )
  })

  //     it('generate component with inline-template', () => {
  //       // have "inline-template'"
  //       assertCodegen(
  //         '<my-component inline-template><p><span>hello world</span></p></my-component>',
  //         `with(this){return _c('my-component',{inlineTemplate:{render:function(){with(this){return _m(0)}},staticRenderFns:[function(){with(this){return _c('p',[_c('span',[_v("hello world")])])}}]}})}`
  //       )
  //       // "have inline-template attrs, but not having exactly one child element
  //       assertCodegen(
  //         '<my-component inline-template><hr><hr></my-component>',
  //         `with(this){return _c('my-component',{inlineTemplate:{render:function(){with(this){return _c('hr')}},staticRenderFns:[]}})}`
  //       )
  //       try {
  //         assertCodegen(
  //           '<my-component inline-template></my-component>',
  //           ''
  //         )
  //       } catch (e) {}
  //       expect('Inline-template components must have exactly one child element.').toHaveBeenWarned()
  //       expect(console.error.calls.count()).toBe(2)
  //     })

  it('generate static trees inside v-for', () => {
    // TODO vue的数字 item 是从1，小程序是从0，后续考虑抹平差异
    assertCodegen(
      '<div><div v-for="i in 10"><p><span></span></p></div></div>',
      '<view class="_div"><block wx:for="{{10}}" wx:for-item="i" wx:for-index="__i0__"><view class="_div"><view class="_p"><label class="_span"></label></view></view></block></view>'
    )
  })

  it('generate component with v-for', () => {
    // normalize type: 2
    assertCodegen(
      '<div><child></child><template v-for="item in list">{{ item }}</template></div>',
      '<view class="_div"><child vue-id="551070e6-1" bind:__l="__l"></child><block wx:for="{{list}}" wx:for-item="item" wx:for-index="__i0__">{{item}}</block></view>'
    )
  })

  it('generate component with comment', () => {
    assertCodegen(
      '<div><!--comment--></div>',
      '<view class="_div"></view>'
    )
  })
  // #6150
  it('generate comments with special characters', () => {
    assertCodegen(
      '<div><!--\n\'comment\'\n--></div>',
      '<view class="_div"></view>'
    )
  })
  // #8041
  it('does not squash templates inside v-pre', () => {
    assertCodegen(
      '<div v-pre><template><p>{{msg}}</p></template></div>',
      '<view class="_div"><view class="_p">{{msg}}</view></view>'
    )
  })

  it('not specified ast type', () => {
    assertCodegen(
      '',
      '<view class="_div"></view>'
    )
  })

  it('not specified directives option', () => {
    assertCodegen(
      '<p v-if="show">hello world</p>',
      '<block wx:if="{{show}}"><view class="_p">hello world</view></block>'
    )
  })

  // #9142
  it('should compile single v-for component inside template', () => {
    assertCodegen(
      '<div><template v-if="ok"><foo v-for="i in 1" :key="i"></foo></template></div>',
      '<view class="_div"><block wx:if="{{ok}}"><block wx:for="{{1}}" wx:for-item="i" wx:for-index="__i0__" wx:key="*this"><foo vue-id="{{\'551070e6-1-\'+__i0__}}" bind:__l="__l"></foo></block></block></view>'
    )
  })
})
