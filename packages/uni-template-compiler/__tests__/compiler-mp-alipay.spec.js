const compiler = require('../lib')

function assertCodegen (template, templateCode, renderCode = 'with(this){}', mpOptions = {}, baseOptions = {}) {
  const res = compiler.compile(template, Object.assign({
    resourcePath: 'test.wxml',
    mp: Object.assign({
      minified: true,
      isTest: true,
      platform: 'mp-alipay'
    }, mpOptions)
  }, baseOptions))

  expect(res.template).toBe(templateCode)
  expect(res.render).toBe(renderCode)
}

describe('mp:compiler-mp-alipay', () => {
  it('generate v-for directive', () => {
    assertCodegen(
      '<view><view v-for="(item,index) in items" :key="index"></view></view>',
      '<view><view a:for="{{items}}" a:for-item="item" a:for-index="index" a:key="index"></view></view>'
    )
  })

  it('generate v-else-if with v-else directive', () => {
    assertCodegen(
      '<view><view v-if="show">hello</view><view v-else-if="hide">world</view><view v-else>bye</view></view>',
      '<view><block a:if="{{show}}"><view>hello</view></block><block a:else><block a:if="{{hide}}"><view>world</view></block><block a:else><view>bye</view></block></block></view>'
    )
  })
  it('generate ref', () => {
    assertCodegen(
      '<component1 ref="c1">text</component1>',
      '<component1 vue-id="551070e6-1" ref="__r" data-ref="c1" onVueInit="__l" vue-slots="{{[\'default\']}}">text</component1>'
    )
    assertCodegen(
      '<component1 :ref="c2">text<text>123213</text></component1>',
      '<component1 vue-id="551070e6-1" ref="__r" data-ref="{{c2}}" onVueInit="__l" vue-slots="{{[\'default\']}}">text<text>123213</text></component1>'
    )
    assertCodegen(
      '<component1 v-for="item in items" ref="c3"></component1>',
      '<component1 vue-id="{{\'551070e6-1-\'+__i0__}}" ref="__r" data-ref-in-for="c3" a:for="{{items}}" a:for-item="item" a:for-index="__i0__" onVueInit="__l"></component1>'
    )
    assertCodegen(
      '<component1 v-for="item in items" :ref="c4"></component1>',
      '<component1 vue-id="{{\'551070e6-1-\'+__i0__}}" ref="__r" data-ref-in-for="{{c4}}" a:for="{{items}}" a:for-item="item" a:for-index="__i0__" onVueInit="__l"></component1>'
    )
    assertCodegen(
      '<component1>text</component1>',
      '<component1 vue-id="551070e6-1" data-com-type="wx" ref="__r" onVueInit="__l" vue-slots="{{[\'default\']}}">text</component1>',
      undefined,
      undefined,
      {
        wxComponents: { component1: '/mycomponents/component1' }
      }
    )
    assertCodegen(
      '<component1 @change="onChange" @cancle="onCancle">text</component1>',
      '<component1 onChange="__e" onCancle="__e" vue-id="551070e6-1" data-event-opts="{{[[\'^change\',[[\'onChange\']]],[\'^cancle\',[[\'onCancle\']]]]}}" data-com-type="wx" ref="__r" data-event-list="onChange,onCancle" onVueInit="__l" vue-slots="{{[\'default\']}}">text</component1>',
      undefined,
      undefined,
      {
        wxComponents: { component1: '/mycomponents/component1' }
      }
    )
    assertCodegen(
      '<credit-pay @change="onChange" @cancle="onCancle">text</credit-pay>',
      '<plugin-wrapper onChange="__e" onCancle="__e" vue-id="551070e6-1" onPluginWrap="__w" data-event-opts="{{[[\'^change\',[[\'onChange\']]],[\'^cancle\',[[\'onCancle\']]]]}}" data-com-type="wx" data-event-list="onChange,onCancle" onVueInit="__l" vue-slots="{{[\'default\']}}"><credit-pay onChange="{{\'onChange\'+\'551070e6-1\'}}" onCancle="{{\'onCancle\'+\'551070e6-1\'}}" onVueInit="__l" vue-slots="{{[\'default\']}}">text</credit-pay></plugin-wrapper>',
      undefined,
      undefined,
      {
        wxComponents: { 'credit-pay': 'plugin://myPlugin/CreditPay' }
      }
    )
  })
  it('generate slot fallback content', () => {
    assertCodegen(
      '<view><slot>slot</slot></view>',
      '<view><block a:if="{{$slots.$default}}"><slot></slot></block><block a:else>slot</block></view>'
    )
  })
  it('generate default slot', () => {
    assertCodegen(
      '<component1>text</component1>',
      '<component1 vue-id="551070e6-1" onVueInit="__l" vue-slots="{{[\'default\']}}">text</component1>'
    )
    assertCodegen(
      '<component1>text<text>123213</text></component1>',
      '<component1 vue-id="551070e6-1" onVueInit="__l" vue-slots="{{[\'default\']}}">text<text>123213</text></component1>'
    )
    assertCodegen(
      '<component1>text<block slot="right"></block></component1>',
      '<component1 vue-id="551070e6-1" onVueInit="__l" vue-slots="{{[\'default\',\'right\']}}">text<block slot="right"></block></component1>'
    )
  })

  it('generate scoped slot', () => {
    assertCodegen(
      '<component1 :text="\'text\'"><template v-slot="props"><view :class="{text:props.text}">{{props.text}}</view></template></component1>',
      '<component1 vue-id="551070e6-1" text="text" onVueInit="__l" vue-slots="{{[\'default\']}}"><view class="{{((props.text)?\'text\':\'\')}}" slot-scope="props">{{props.text}}</view></component1>'
    )
    assertCodegen(
      '<component1 :text="\'text\'"><template v-slot="{text}"><view :class="{text:text}">{{text}}</view></template></component1>',
      '<component1 vue-id="551070e6-1" text="text" onVueInit="__l" vue-slots="{{[\'default\']}}"><view class="{{((__SCOPED__.text)?\'text\':\'\')}}" slot-scope="__SCOPED__">{{__SCOPED__.text}}</view></component1>'
    )
  })

  it('generate scoped slot with dynamic slot name', () => {
    assertCodegen(
      '<view><slot :name="test" :user="user"></slot></view>',
      '<view><slot name="{{test}}" user="{{user}}"></slot></view>'
    )
    assertCodegen(
      '<foo><template v-slot:[test]="{user}"><view>{{user}}</view></template></foo>',
      '<foo vue-id="551070e6-1" onVueInit="__l" vue-slots="{{[test]}}"><view slot="{{test}}" slot-scope="__SCOPED__">{{__SCOPED__.user}}</view></foo>'
    )
  })

  it('generate scoped slot with scopedSlotsCompiler: auto', () => {
    assertCodegen(
      '<my-component><template v-slot="{item}">{{item}}<template></my-component>',
      '<my-component vue-id="551070e6-1" onVueInit="__l" vue-slots="{{[\'default\']}}"><block slot-scope="__SCOPED__">{{__SCOPED__.item}}</block></my-component>',
      'with(this){}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<my-component><template v-slot="{item}">{{getValue(item)}}<template></my-component>',
      '<my-component scoped-slots-compiler="augmented" vue-id="551070e6-1" onVueInit="__l" vue-slots="{{[\'default\']}}"><block a:if="{{$root.m0}}">{{$root.m1}}</block></my-component>',
      'with(this){var m0=$hasSSP("551070e6-1");var m1=m0?getValue($getSSP("551070e6-1","default")["item"]):null;$mp.data=Object.assign({},{$root:{m0:m0,m1:m1}})}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<my-component><template v-slot="{item}">{{item}}{{title}}<template></my-component>',
      '<my-component vue-id="551070e6-1" onVueInit="__l" vue-slots="{{[\'default\']}}"><block slot-scope="__SCOPED__">{{__SCOPED__.item+title}}</block></my-component>',
      'with(this){}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<my-component><template v-slot="{item}">{{item}}{{getValue(title)}}<template></my-component>',
      '<my-component vue-id="551070e6-1" onVueInit="__l" vue-slots="{{[\'default\']}}"><block slot-scope="__SCOPED__">{{__SCOPED__.item+$root.m0}}</block></my-component>',
      'with(this){var m0=getValue(title);$mp.data=Object.assign({},{$root:{m0:m0}})}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<my-component><template v-slot="item">{{getValue(item.text)}}<template></my-component>',
      '<my-component scoped-slots-compiler="augmented" vue-id="551070e6-1" onVueInit="__l" vue-slots="{{[\'default\']}}"><block a:if="{{$root.m0}}">{{$root.m1}}</block></my-component>',
      'with(this){var m0=$hasSSP("551070e6-1");var m1=m0?getValue($getSSP("551070e6-1","default").text):null;$mp.data=Object.assign({},{$root:{m0:m0,m1:m1}})}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<view><slot :item="item"><slot></view>',
      '<view><block a:if="{{$slots.$default}}"><slot item="{{item}}"></slot></block><block a:else><slot></slot></block></view>',
      'with(this){$initSSP();if($scope.props.scopedSlotsCompiler==="augmented"){$setSSP("default",{"item":item})}$callSSP()}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
    assertCodegen(
      '<view><slot v-bind="object"><slot></view>',
      '<view><block a:if="{{$slots.$default}}"><slot></slot></block><block a:else><slot></slot></block></view>',
      'with(this){$initSSP();if($scope.props.scopedSlotsCompiler==="augmented"){$setSSP("default",object)}$callSSP()}',
      {
        scopedSlotsCompiler: 'auto'
      }
    )
  })

  it('generate scoped slot with scopedSlotsCompiler: augmented', () => {
    assertCodegen(
      '<my-component><template v-slot="{item}">{{item}}<template></my-component>',
      '<my-component vue-id="551070e6-1" onVueInit="__l" vue-slots="{{[\'default\']}}"><block a:if="{{$root.m0}}">{{$root.m1[\'item\']}}</block></my-component>',
      'with(this){var m0=$hasSSP("551070e6-1");var m1=m0?$getSSP("551070e6-1","default"):null;$mp.data=Object.assign({},{$root:{m0:m0,m1:m1}})}',
      {
        scopedSlotsCompiler: 'augmented'
      }
    )
    assertCodegen(
      '<my-component><template v-slot:test="{item}">{{item}}<template></my-component>',
      '<my-component vue-id="551070e6-1" onVueInit="__l" vue-slots="{{[\'test\']}}"><block slot="test" a:if="{{$root.m0}}">{{$root.m1[\'item\']}}</block></my-component>',
      'with(this){var m0=$hasSSP("551070e6-1");var m1=m0?$getSSP("551070e6-1","test"):null;$mp.data=Object.assign({},{$root:{m0:m0,m1:m1}})}',
      {
        scopedSlotsCompiler: 'augmented'
      }
    )
    assertCodegen(
      '<my-component><template v-slot:[test]="{item}">{{item}}<template></my-component>',
      '<my-component vue-id="551070e6-1" onVueInit="__l" vue-slots="{{[test]}}"><text slot="{{test}}" a:if="{{$root.m0}}">{{$root.m1[\'item\']}}</text></my-component>',
      'with(this){var m0=$hasSSP("551070e6-1");var m1=m0?$getSSP("551070e6-1",test):null;$mp.data=Object.assign({},{$root:{m0:m0,m1:m1}})}',
      {
        scopedSlotsCompiler: 'augmented'
      }
    )
  })

  it('generate class binding', () => {
    assertCodegen(
      '<div :class="{ active: isActive }">1</div>',
      '<view class="{{((\'_div\')+\' \'+((isActive)?\'active\':\'\'))}}">1</view>'
    )
    assertCodegen(
      '<p class="static" :class="{ active: isActive, \'text-danger\': hasError }">2</p>',
      '<view class="{{((((\'static\')+\' \'+\'_p\')+\' \'+((isActive)?\'active\':\'\'))+\' \'+((hasError)?\'text-danger\':\'\'))}}">2</view>'
    )
    assertCodegen(
      '<p class="static" :class="[activeClass, errorClass]">3</p>',
      '<view class="{{((((\'static\')+\' \'+\'_p\')+\' \'+activeClass)+\' \'+errorClass)}}">3</view>'
    )
    assertCodegen(
      '<p class="static" :class="[isActive ? activeClass : \'\', errorClass]">4</p>',
      '<view class="{{((((\'static\')+\' \'+\'_p\')+\' \'+(isActive?activeClass:\'\'))+\' \'+errorClass)}}">4</view>'
    )
    assertCodegen(
      '<p class="static" :class="[{ active: isActive }, errorClass]">5</p>',
      '<view class="{{((((\'static\')+\' \'+\'_p\')+\' \'+((isActive)?\'active\':\'\'))+\' \'+errorClass)}}">5</view>'
    )
    assertCodegen(
      '<p class="static" :class="[{ active: isActive, disabled: isDisabled }, errorClass]">52</p>',
      '<view class="{{((((\'static\')+\' \'+\'_p\')+\' \'+(((isActive)?\'active\':\'\')+\' \'+((isDisabled)?\'disabled\':\'\')))+\' \'+errorClass)}}">52</view>'
    )
    assertCodegen(
      '<div class="container" :class="computedClassObject">6</div>',
      '<view class="{{(((\'container\')+\' \'+\'_div\')+\' \'+computedClassObject)}}">6</view>'
    )
    //     assertCodegen(
    //       `<div class="container" :class="computedClassObject">6</div>`,
    //       `<view class="{{$root.c0}}">6</view>`,
    //       `with(this){var c0=__get_class(computedClassObject,"container");$mp.data=Object.assign({},{$root:{c0:c0}})}`
    //     )
    assertCodegen(
      '<p :class="index === currentIndex ? activeClass : itemClass">7</p>',
      '<view class="{{((\'_p\')+\' \'+(index===currentIndex?activeClass:itemClass))}}">7</view>'
    )
    assertCodegen(
      '<p :class="\'m-content-head-\'+message.user">8</p>',
      '<view class="{{((\'_p\')+\' \'+(\'m-content-head-\'+message.user))}}">8</view>'
    )
    assertCodegen(
      '<p :class="classStr1 || classStr2" class="bg">9</p>',
      '<view class="{{(((\'bg\')+\' \'+\'_p\')+\' \'+(classStr1||classStr2))}}">9</view>'
    )
    assertCodegen(
      '<p class="static" :class="[{ active: isActive }, errorClass, [flex, \'flex-row\']]">10</p>',
      '<view class="{{(((((\'static\')+\' \'+\'_p\')+\' \'+((isActive)?\'active\':\'\'))+\' \'+errorClass)+\' \'+((flex)+\' \'+\'flex-row\'))}}">10</view>'
    )
    assertCodegen(
      '<p class="a external-class c" :class="class1">hello world</p>',
      '<view class="{{(((((\'a\')+\' \'+\'external-class\')+\' \'+\'c\')+\' \'+\'_p\')+\' \'+class1)}}">hello world</view>'
    )
  })

  it('generate attrs with mergeVirtualHostAttributes', () => {
    assertCodegen(
      '<custom-view>hello world</custom-view>',
      '<custom-view vue-id="551070e6-1" onVueInit="__l" virtualHostStyle="{{virtualHostStyle}}" virtualHostClass="{{(virtualHostClass)}}" vue-slots="{{[\'default\']}}">hello world</custom-view>',
      'with(this){}',
      {
        mergeVirtualHostAttributes: true
      }
    )
    assertCodegen(
      '<custom-view :class="class1" :style="style">hello world</custom-view>',
      '<custom-view vue-id="551070e6-1" onVueInit="__l" virtualHostStyle="{{(style)+virtualHostStyle}}" virtualHostClass="{{((class1)+\' \'+virtualHostClass)}}" vue-slots="{{[\'default\']}}">hello world</custom-view>',
      'with(this){}',
      {
        mergeVirtualHostAttributes: true
      }
    )
    assertCodegen(
      '<view><custom-view>hello world</custom-view></view>',
      '<view class="{{(virtualHostClass)}}" style="{{virtualHostStyle}}"><custom-view vue-id="551070e6-1" onVueInit="__l" vue-slots="{{[\'default\']}}">hello world</custom-view></view>',
      'with(this){}',
      {
        mergeVirtualHostAttributes: true
      }
    )
    assertCodegen(
      '<view><custom-view :class="class1" :style="style">hello world</custom-view></view>',
      '<view class="{{(virtualHostClass)}}" style="{{virtualHostStyle}}"><custom-view vue-id="551070e6-1" onVueInit="__l" virtualHostStyle="{{(style)}}" virtualHostClass="{{(class1)}}" vue-slots="{{[\'default\']}}">hello world</custom-view></view>',
      'with(this){}',
      {
        mergeVirtualHostAttributes: true
      }
    )
  })

  it('generate getPhoneNumber', () => {
    assertCodegen(
      '<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号</button>',
      '<button open-type="getAuthorize" scope="phoneNumber" data-event-opts="{{[[\'getAuthorize\',[[\'$onAliGetAuthorize\',[\'getPhoneNumber\',\'$event\']]]],[\'error\',[[\'$onAliAuthError\',[\'getPhoneNumber\',\'$event\']]]]]}}" onGetAuthorize="__e" onError="__e">获取手机号</button>'
    )
  })

  it('generate events with v-on directive', () => {
    assertCodegen(
      '<uni-list-item title="标题文字" note="描述信息" show-extra-icon="true" :extra-icon="{color: \'#4cd964\',size: \'22\',type: \'spinner\'}"></uni-list-item>',
      '<uni-list-item vue-id="551070e6-1" title="标题文字" note="描述信息" show-extra-icon="true" extra-icon="{{({color:\'#4cd964\',size:\'22\',type:\'spinner\'})}}" onVueInit="__l"></uni-list-item>',
      'with(this){}'
    )

    assertCodegen(
      '<view @click="onClick" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchCancel" @longtap="onLongTap" @longpress="onLongPress"></view>',
      '<view data-event-opts="{{[[\'tap\',[[\'onClick\',[\'$event\']]]],[\'touchStart\',[[\'onTouchStart\',[\'$event\']]]],[\'touchMove\',[[\'onTouchMove\',[\'$event\']]]],[\'touchEnd\',[[\'onTouchEnd\',[\'$event\']]]],[\'touchCancel\',[[\'onTouchCancel\',[\'$event\']]]],[\'longTap\',[[\'onLongTap\',[\'$event\']]]],[\'longTap\',[[\'onLongPress\',[\'$event\']]]]]}}" onTap="__e" onTouchStart="__e" onTouchMove="__e" onTouchEnd="__e" onTouchCancel="__e" onLongTap="__e"></view>'
    )

    assertCodegen(
      '<form @submit="formSubmit" @reset="formReset"/>',
      '<form data-event-opts="{{[[\'submit\',[[\'formSubmit\',[\'$event\']]]]]}}" onSubmit="__e" onReset="formReset"></form>'
    )

    assertCodegen(
      '<map @callouttap="calloutTap" @controltap="controlTap" @markertap="markerTap" @regionchange="regionChange" @tap="tap"/>',
      '<map data-event-opts="{{[[\'tap\',[[\'tap\',[\'$event\']]]]]}}" onCalloutTap="calloutTap" onControlTap="controlTap" onMarkerTap="markerTap" onRegionChange="regionChange" onTap="__e"></map>'
    )

    assertCodegen(
      '<view @transitionend="transitionEnd" @animationstart="animationStart" @animationiteration="animationIteration" @animationend="animationEnd" @firstappear="firstAppear"/>',
      '<view data-event-opts="{{[[\'transitionEnd\',[[\'transitionEnd\',[\'$event\']]]],[\'animationStart\',[[\'animationStart\',[\'$event\']]]],[\'animationIteration\',[[\'animationIteration\',[\'$event\']]]],[\'animationEnd\',[[\'animationEnd\',[\'$event\']]]],[\'firstAppear\',[[\'firstAppear\',[\'$event\']]]]]}}" onTransitionEnd="__e" onAnimationStart="__e" onAnimationIteration="__e" onAnimationEnd="__e" onFirstAppear="__e"></view>'
    )

    assertCodegen(
      '<scroll-view @scrolltoupper="scrollToUpper" @scrolltolower="scrollToLower"/>',
      '<scroll-view data-event-opts="{{[[\'scrollToUpper\',[[\'scrollToUpper\',[\'$event\']]]],[\'scrollToLower\',[[\'scrollToLower\',[\'$event\']]]]]}}" onScrollToUpper="__e" onScrollToLower="__e"></scroll-view>'
    )

    assertCodegen(
      '<movable-view @changeend="changeEnd"/>',
      '<movable-view data-event-opts="{{[[\'changeEnd\',[[\'changeEnd\',[\'$event\']]]]]}}" onChangeEnd="__e"></movable-view>'
    )

    assertCodegen(
      '<life-follow @close="close"/>',
      '<life-follow data-event-opts="{{[[\'close\',[[\'close\',[\'$event\']]]]]}}" onClose="__e"></life-follow>'
    )
  })
  it('template with array length', () => {
    assertCodegen(
      '<view>{{array.length}}</view>',
      '<view>{{array.length}}</view>'
    )
  })
})
