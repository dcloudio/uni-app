const compiler = require('../lib')

function assertCodegen (template, generatedCode, ...args) {
  const compiled = compiler.compile(template, {
    mp: {
      platform: 'app-plus'
    },
    service: true,
    filterModules: ['swipe']
  })
  expect(compiled.render).toBe(generatedCode)
}

/* eslint-disable quotes */
describe('codegen', () => {
  it('generate block', () => {
    assertCodegen(
      '<block v-if="show"></block>',
      `with(this){return (_$s(0,'i',show))?void 0:_e()}`
    )
    assertCodegen(
      '<div><block v-for="item in items"><div></div><div></div></block></div>',
      `with(this){return _c('div',[_l((_$s(1,'f',{forItems:items})),function(item,$10,$20,$30){return [_c('div',{key:_$s(1,'f',{forIndex:$20,keyIndex:0,key:1+'-0'+$30})}),_c('div',{key:_$s(1,'f',{forIndex:$20,keyIndex:1,key:1+'-1'+$30})})]})],2)}`
    )
    assertCodegen(
      '<div><block v-for="item in items" :key="item.id"><div></div><div></div></block></div>',
      `with(this){return _c('div',[_l((_$s(1,'f',{forItems:items})),function(item,$10,$20,$30){return [_c('div',{key:_$s(1,'f',{forIndex:$20,keyIndex:0,key:item.id+'_0'})}),_c('div',{key:_$s(1,'f',{forIndex:$20,keyIndex:1,key:item.id+'_1'})})]})],2)}`
    )
    assertCodegen(
      '<div><block v-for="(item,index) in list" :key="index"><block><text>{{item}}</text></block></block></div>',
      `with(this){return _c('div',[_l((_$s(1,'f',{forItems:list})),function(item,index,$20,$30){return [[_c('text',{key:_$s(("3-"+$30),'a-key',index+'_0'+'_0')},[_v((_$s(("3-"+$30),'t0',_s(item))))])]]})],2)}`
    )
  })
  it('generate directive', () => {
    assertCodegen(
      '<p v-custom1:[arg1].modifier="value1" v-custom2></p>',
      `with(this){return _c('p',{directives:[{name:"custom1",rawName:"v-custom1:[arg1].modifier",value:(_$s(0,'v-custom1',value1)),expression:"_$s(0,'v-custom1',value1)",arg:_$s(0,'v-custom1-arg',arg1),modifiers:{"modifier":true}},{name:"custom2",rawName:"v-custom2"}],attrs:{"_i":0}})}`
    )
  })
  it('generate v-for directive', () => {
    assertCodegen(
      '<div><template v-for="item in items"><div></div><div></div></template></div>',
      `with(this){return _c('div',[_l((_$s(1,'f',{forItems:items})),function(item,$10,$20,$30){return [_c('div',{key:_$s(1,'f',{forIndex:$20,keyIndex:0,key:1+'-0'+$30})}),_c('div',{key:_$s(1,'f',{forIndex:$20,keyIndex:1,key:1+'-1'+$30})})]})],2)}`
    )
    assertCodegen(
      '<div><template v-for="item in items">text</template></div>',
      `with(this){return _c('div',[_l((_$s(1,'f',{forItems:items})),function(item,$10,$20,$30){return void 0})],2)}`
    )
    assertCodegen(
      '<div><template v-for="item in items">{{text}}</template></div>',
      `with(this){return _c('div',[_l((_$s(1,'f',{forItems:items})),function(item,$10,$20,$30){return [_v((_$s(("1-"+$30),'t0',_s(text))))]})],2)}`
    )
    assertCodegen(
      '<div><template v-for="item in items"><span></span>{{text}}</template></div>',
      `with(this){return _c('div',[_l((_$s(1,'f',{forItems:items})),function(item,$10,$20,$30){return [_c('span',{key:_$s(1,'f',{forIndex:$20,keyIndex:0,key:1+'-0'+$30})}),_v((_$s(("1-"+$30),'t0',_s(text))))]})],2)}`
    )
    assertCodegen(
      '<div><template v-for="item in items">a {{text1}} b {{text2}}</template></div>',
      `with(this){return _c('div',[_l((_$s(1,'f',{forItems:items})),function(item,$10,$20,$30){return [_v((_$s(("1-"+$30),'t0',_s(text1)))+(_$s(("1-"+$30),'t1',_s(text2))))]})],2)}`
    )
    assertCodegen(
      '<div><template v-for="item in items"><span v-if="item.sub"></span></template></div>',
      `with(this){return _c('div',[_l((_$s(1,'f',{forItems:items})),function(item,$10,$20,$30){return [(_$s(("2-"+$30),'i',item.sub))?_c('span',{key:_$s(1,'f',{forIndex:$20,keyIndex:0,key:1+'-0'+$30})}):_e()]})],2)}`
    )
  })
  it('generate text with multiple statements', () => {
    assertCodegen(
      `<div :id="'a'+b">A{{ d | e | f }}B{{text}}C</div>`,
      `with(this){return _c('div',{attrs:{"id":_$s(0,'a-id','a'+b),"_i":0}},[_v((_$s(0,'t0',_s(_f("f")(_f("e")(d)))))+(_$s(0,'t1',_s(text))))])}`
    )
  })

  it('generate v-slot', () => {
    assertCodegen(
      '<current-user v-slot="{ user }">{{ user.firstName }}</current-user>',
      `with(this){return _c('current-user',{attrs:{"_i":0},scopedSlots:_u([{key:"default",fn:function({ user }, _svm, _si){return [_v((_svm._$s(("0-"+_si),'t0',_s(user.firstName))))]}}])})}`
    )
    assertCodegen(
      '<current-user>ABCD</current-user>',
      `with(this){return _c('current-user',{attrs:{"_i":0}},[_v("")])}`
    )
    assertCodegen(
      `<current-user>
      <template v-slot:default="{result}">
        <view v-for="(item,index) in result.list">{{item.name}}</view>
      </template>
    </current-user>`,
      `with(this){return _c('current-user',{attrs:{"_i":0},scopedSlots:_u([{key:"default",fn:function({result}, _svm, _si){return _l((_svm._$s(("2-"+_si),'f',{forItems:result.list})),function(item,index,$20,$30){return _c('view',{key:_svm._$s(("2-"+_si),'f',{forIndex:$20,key:("2-"+_si)+'-'+$30}),attrs:{"_i":(("2-"+_si)+$30)}},[_v((_svm._$s((("2-"+_si)+$30),'t0',_s(item.name))))])})}}])})}`
    )
  })

  it('generate keep-alive', () => {
    assertCodegen(
      `<keep-alive exclude="componentWithStatus1"><component is="componentWithStatus"/></keep-alive>`,
      `with(this){return _c('keep-alive',{attrs:{"exclude":"componentWithStatus1","_i":0}},[_c("componentWithStatus",{tag:"component",attrs:{"_i":1}})],1)}`
    )
    assertCodegen(
      `<keep-alive :exclude="componentWithStatus1"><component :is="'componentWithStatus'+index"/></keep-alive>`,
      `with(this){return _c('keep-alive',{attrs:{"exclude":_$s(0,'a-exclude',componentWithStatus1),"_i":0}},[_c(_$s(1,'is','componentWithStatus'+index),{tag:"component",attrs:{"_i":1}})],1)}`
    )
  })
  it('generate wxs props', () => {
    assertCodegen(
      '<p :change:prop="swipe.sizeReady" :prop="pos" @touchstart="swipe.touchstart" @touchmove="swipe.touchmove" @touchend="swipe.touchend" @change="change"></p>',
      `with(this){return _c('p',{wxsProps:{"change:prop":"pos"},attrs:{"prop":_$s(0,'change:pos',pos),"_i":0},on:{"change":change}})}`
    )
  })

  it('generate staticClass and id', () => {
    assertCodegen(
      '<view id="aaa" class="bbbb"></view>',
      `with(this){return _c('view',{staticClass:_$s(0,'sc',"bbbb"),attrs:{"id":"aaa","_i":0}})}`
    )
  })
})
/* eslint-enable quotes */
