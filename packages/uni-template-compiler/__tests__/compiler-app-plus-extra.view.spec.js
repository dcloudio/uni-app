const compiler = require('../lib')

function assertCodegen (template, generatedCode, ...args) {
  const compiled = compiler.compile(template, {
    mp: {
      platform: 'app-plus'
    },
    view: true,
    filterModules: ['swipe']
  })
  expect(compiled.render).toBe(generatedCode)
}

/* eslint-disable quotes */
describe('codegen', () => {
  it('generate directive', () => {
    assertCodegen(
      '<p v-custom1:[arg1].modifier="value1" v-custom2></p>',
      `with(this){return _c('v-uni-view',{attrs:{"_i":0}})}`
    )
  })
  it('generate v-for directive', () => {
    assertCodegen(
      '<div><template v-for="item in items"><div></div><div></div></template></div>',
      `with(this){return _c('v-uni-view',{attrs:{"_i":0}},[_l((_$g(1,'f')),function(item,$10,$20,$30){return [_c('v-uni-view',{key:item['k0'],attrs:{"_i":("2-"+$30)}}),_c('v-uni-view',{key:item['k1'],attrs:{"_i":("3-"+$30)}})]})],2)}`
    )
    assertCodegen(
      '<div><template v-for="item in items"><span v-if="item.sub"></span></template></div>',
      `with(this){return _c('v-uni-view',{attrs:{"_i":0}},[_l((_$g(1,'f')),function(item,$10,$20,$30){return [(_$g(("2-"+$30),'i'))?_c('v-uni-label',{key:item['k0'],attrs:{"_i":("2-"+$30)}}):_e()]})],2)}`
    )
  })
  it('generate events with multiple statements', () => {
    assertCodegen(
      '<div>A{{ d | e | f }}B{{text}}C</div>',
      `with(this){return _c('v-uni-view',{attrs:{"_i":0}},[_v("A"+(_$g(0,'t0'))+"B"+(_$g(0,'t1'))+"C")])}`
    )
  })
  it('generate slot fallback content', () => {
    assertCodegen(
      '<div><slot><div>{{hi}}</div></slot></div>',
      `with(this){return _c('v-uni-view',{attrs:{"_i":0}},[_t("default",[_c('v-uni-view',{attrs:{"_i":2}},[_v((_$g(2,'t0')))])],{"_i":1})],2)}`
    )
  })
  it('generate v-slot', () => {
    assertCodegen(
      '<current-user v-slot="{ user }">{{ user.firstName }}</current-user>',
      `with(this){return _c('current-user',{attrs:{"_i":0},scopedSlots:_u([{key:"default",fn:function({ user }, _svm, _si){return [_v((_svm._$g(("0-"+_si),'t0')))]}}])})}`
    )
  })
  it('generate keep-alive', () => {
    assertCodegen(
      `<keep-alive exclude="componentWithStatus1"><component is="componentWithStatus"/></keep-alive>`,
      `with(this){return _c('keep-alive',{attrs:{"exclude":"componentWithStatus1","_i":0}},[_c("componentWithStatus",{tag:"component",attrs:{"_i":1}})],1)}`
    )
    assertCodegen(
      `<keep-alive :exclude="componentWithStatus1"><component :is="'componentWithStatus'+index"/></keep-alive>`,
      `with(this){return _c('keep-alive',{attrs:{"exclude":_$g(0,'a-exclude'),"_i":0}},[_c(_$g(1,'is'),{tag:"component",attrs:{"_i":1}})],1)}`
    )
  })
  it('generate wxs props', () => {
    assertCodegen(
      '<p :change:prop="swipe.sizeReady" :prop="pos" @touchstart="swipe.touchstart" @touchmove="swipe.touchmove" @touchend="swipe.touchend" @change="change"></p>',
      `with(this){return _c('v-uni-view',{wxsProps:{"change:prop":"pos"},attrs:{"change:prop":swipe.sizeReady,"prop":_$gc(0,'change:pos'),"_i":0},on:{"touchstart":function($event){$event = $handleWxsEvent($event);swipe.touchstart($event, $getComponentDescriptor())},"touchmove":function($event){$event = $handleWxsEvent($event);swipe.touchmove($event, $getComponentDescriptor())},"touchend":function($event){$event = $handleWxsEvent($event);swipe.touchend($event, $getComponentDescriptor())},"change":function($event){return $handleViewEvent($event)}}})}`
    )
  })
})
/* eslint-enable quotes */
