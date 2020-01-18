const compiler = require('../lib')

function assertCodegen (template, templateCode, renderCode = `with(this){}`, options = {}) {
  const res = compiler.compile(template, {
    resourcePath: 'test.wxml',
    mp: Object.assign({
      minified: true,
      isTest: true,
      platform: 'mp-alipay'
    }, options)
  })

  expect(res.template).toBe(templateCode)
  expect(res.render).toBe(renderCode)
}

describe('mp:compiler-mp-alipay', () => {
  it('generate v-for directive', () => {
    assertCodegen(
      '<view><view v-for="(item,index) in items" :key="index"></view></view>',
      `<view><block a:for="{{items}}" a:for-item="item" a:for-index="index" a:key="index"><view></view></block></view>`
    )
  })

  it('generate v-else-if with v-else directive', () => {
    assertCodegen(
      '<view><view v-if="show">hello</view><view v-else-if="hide">world</view><view v-else>bye</view></view>',
      `<view><block a:if="{{show}}"><view>hello</view></block><block a:else><block a:if="{{hide}}"><view>world</view></block><block a:else><view>bye</view></block></block></view>`
    )
  })
  it('generate ref', () => {
    assertCodegen(
      '<component1 ref="c1">text</component1>',
      `<component1 vue-id="551070e6-1" ref="__r" data-ref="c1" onVueInit="__l">text</component1>`
    )
    assertCodegen(
      '<component1 :ref="c2">text<text>123213</text></component1>',
      `<component1 vue-id="551070e6-1" ref="__r" data-ref="{{c2}}" onVueInit="__l">text<text>123213</text></component1>`
    )
    assertCodegen(
      '<component1 v-for="item in items" ref="c3"></component1>',
      `<block a:for="{{items}}" a:for-item="item" a:for-index="__i0__"><component1 vue-id="{{'551070e6-1-'+__i0__}}" ref="__r" data-ref-in-for="c3" onVueInit="__l"></component1></block>`
    )
    assertCodegen(
      '<component1 v-for="item in items" :ref="c4"></component1>',
      `<block a:for="{{items}}" a:for-item="item" a:for-index="__i0__"><component1 vue-id="{{'551070e6-1-'+__i0__}}" ref="__r" data-ref-in-for="{{c4}}" onVueInit="__l"></component1></block>`
    )
  })
  it('generate default slot', () => {
    assertCodegen(
      '<component1>text</component1>',
      `<component1 vue-id="551070e6-1" onVueInit="__l">text</component1>`
    )
    assertCodegen(
      '<component1>text<text>123213</text></component1>',
      `<component1 vue-id="551070e6-1" onVueInit="__l">text<text>123213</text></component1>`
    )
    assertCodegen(
      '<component1>text<block slot="right"></block></component1>',
      `<component1 vue-id="551070e6-1" onVueInit="__l">text<view slot="right"></view></component1>`
    )
  })
  it('generate class binding', () => {
    assertCodegen(
      '<div :class="{ active: isActive }">1</div>',
      `<view class="{{(('_div')+' '+((isActive)?'active':''))}}">1</view>`
    )
    assertCodegen(
      `<p class="static" :class="{ active: isActive, 'text-danger': hasError }">2</p>`,
      `<view class="{{((('static _p')+' '+((isActive)?'active':''))+' '+((hasError)?'text-danger':''))}}">2</view>`
    )
    assertCodegen(
      '<p class="static" :class="[activeClass, errorClass]">3</p>',
      `<view class="{{((('static _p')+' '+activeClass)+' '+errorClass)}}">3</view>`
    )
    assertCodegen(
      `<p class="static" :class="[isActive ? activeClass : '', errorClass]">4</p>`,
      `<view class="{{((('static _p')+' '+(isActive?activeClass:''))+' '+errorClass)}}">4</view>`
    )
    assertCodegen(
      `<p class="static" :class="[{ active: isActive }, errorClass]">5</p>`,
      `<view class="{{((('static _p')+' '+[(isActive)?'active':''])+' '+errorClass)}}">5</view>`
    )
    assertCodegen(
      `<div class="container" :class="computedClassObject">6</div>`,
      `<view class="{{(('container _div')+' '+computedClassObject)}}">6</view>`
    )
    //     assertCodegen(
    //       `<div class="container" :class="computedClassObject">6</div>`,
    //       `<view class="{{$root.c0}}">6</view>`,
    //       `with(this){var c0=__get_class(computedClassObject,"container");$mp.data=Object.assign({},{$root:{c0:c0}})}`
    //     )
    assertCodegen(
      `<p :class="index === currentIndex ? activeClass : itemClass">7</p>`,
      `<view class="{{(('_p')+' '+(index===currentIndex?activeClass:itemClass))}}">7</view>`
    )
    assertCodegen(
      `<p :class="'m-content-head-'+message.user">8</p>`,
      `<view class="{{(('_p')+' '+('m-content-head-'+message.user))}}">8</view>`
    )
    assertCodegen(
      `<p :class="classStr1 || classStr2" class="bg">9</p>`,
      `<view class="{{(('bg _p')+' '+(classStr1||classStr2))}}">9</view>`
    )
  })

  it('generate getPhoneNumber', () => {
    assertCodegen(
      '<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号</button>',
      `<button open-type="getAuthorize" scope="phoneNumber" data-event-opts="{{[['getAuthorize',[['$onAliGetAuthorize',['getPhoneNumber','$event']]]],['error',[['$onAliAuthError',['getPhoneNumber','$event']]]]]}}" onGetAuthorize="__e" onError="__e">获取手机号</button>`
    )
  })

  it('generate events with v-on directive', () => {
    assertCodegen(
      `<uni-list-item title="标题文字" note="描述信息" show-extra-icon="true" :extra-icon="{color: '#4cd964',size: '22',type: 'spinner'}"></uni-list-item>`,
      `<uni-list-item vue-id="551070e6-1" title="标题文字" note="描述信息" show-extra-icon="true" extra-icon="{{$root.a0}}" onVueInit="__l"></uni-list-item>`,
      `with(this){var a0={color:"#4cd964",size:"22",type:"spinner"};$mp.data=Object.assign({},{$root:{a0:a0}})}`
    )

    assertCodegen(
      `<view @click="onClick" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchCancel" @longtap="onLongTap" @longpress="onLongPress"></view>`,
      `<view data-event-opts="{{[['tap',[['onClick',['$event']]]],['touchStart',[['onTouchStart',['$event']]]],['touchMove',[['onTouchMove',['$event']]]],['touchEnd',[['onTouchEnd',['$event']]]],['touchCancel',[['onTouchCancel',['$event']]]],['longTap',[['onLongTap',['$event']]]],['longTap',[['onLongPress',['$event']]]]]}}" onTap="__e" onTouchStart="__e" onTouchMove="__e" onTouchEnd="__e" onTouchCancel="__e" onLongTap="__e"></view>`
    )

    assertCodegen(
      `<form @submit="formSubmit" @reset="formReset"/>`,
      `<form data-event-opts="{{[['submit',[['formSubmit',['$event']]]]]}}" onSubmit="__e" onReset="formReset"></form>`
    )

    assertCodegen(
      `<map @callouttap="calloutTap" @controltap="controlTap" @markertap="markerTap" @regionchange="regionChange" @tap="tap"/>`,
      `<map data-event-opts="{{[['tap',[['tap',['$event']]]]]}}" onCalloutTap="calloutTap" onControlTap="controlTap" onMarkerTap="markerTap" onRegionChange="regionChange" onTap="__e"></map>`
    )

    assertCodegen(
      `<view @transitionend="transitionEnd" @animationstart="animationStart" @animationiteration="animationIteration" @animationend="animationEnd" @firstappear="firstAppear"/>`,
      `<view data-event-opts="{{[['transitionEnd',[['transitionEnd',['$event']]]],['animationStart',[['animationStart',['$event']]]],['animationIteration',[['animationIteration',['$event']]]],['animationEnd',[['animationEnd',['$event']]]],['firstAppear',[['firstAppear',['$event']]]]]}}" onTransitionEnd="__e" onAnimationStart="__e" onAnimationIteration="__e" onAnimationEnd="__e" onFirstAppear="__e"></view>`
    )

    assertCodegen(
      `<scroll-view @scrolltoupper="scrollToUpper" @scrolltolower="scrollToLower"/>`,
      `<scroll-view data-event-opts="{{[['scrollToUpper',[['scrollToUpper',['$event']]]],['scrollToLower',[['scrollToLower',['$event']]]]]}}" onScrollToUpper="__e" onScrollToLower="__e"></scroll-view>`
    )

    assertCodegen(
      `<movable-view @changeend="changeEnd"/>`,
      `<movable-view data-event-opts="{{[['changeEnd',[['changeEnd',['$event']]]]]}}" onChangeEnd="__e"></movable-view>`
    )
  })
})
