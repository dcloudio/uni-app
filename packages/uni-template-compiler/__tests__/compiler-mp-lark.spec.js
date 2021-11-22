const compiler = require('../lib')

function assertCodegen (template, templateCode, renderCode = 'with(this){}', options = {}) {
  const res = compiler.compile(template, {
    resourcePath: 'test.wxml',
    mp: Object.assign({
      minified: true,
      isTest: true,
      platform: 'mp-lark'
    }, options)
  })

  expect(res.template).toBe(templateCode)
  expect(res.render).toBe(renderCode)
}

describe('mp:compiler-mp-lark', () => {
  it('generate v-for directive', () => {
    assertCodegen(
      '<view><view v-for="(item,index) in items" :key="index"></view></view>',
      '<view><block tt:for="{{items}}" tt:for-item="item" tt:for-index="index" tt:key="index"><view></view></block></view>'
    )
  })

  it('generate ref', () => {
    assertCodegen(
      '<my-component ref="ref"></my-component>',
      '<my-component class="vue-ref" vue-id="551070e6-1" data-ref="ref" bind:__l="__l"></my-component>'
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

  it('generate v-show directive', () => {
    assertCodegen(
      '<test v-show="shown">hello world</test>',
      '<test bind:-data-custom-hidden="{{!(shown)}}" vue-id="551070e6-1" bind:__l="__l" vue-slots="{{[\'default\']}}">hello world</test>'
    )
  })
})
