const compiler = require('../lib')

function assertCodegen (template, generatedCode, ...args) {
  const compiled = compiler.compile(template, {
    mp: {
      platform: 'app-plus'
    },
    service: true
  })
  expect(compiled.render).toBe(generatedCode)
}

/* eslint-disable quotes */
describe('codegen', () => {
  it('generate block', () => {
    assertCodegen(
      '<block v-if="show"></block>',
      `with(this){return (_$i(0,show))?void 0:_e()}`
    )
    assertCodegen(
      '<div><block v-for="item in items"><div></div><div></div></block></div>',
      `with(this){return _c('div',[_l((_$f(1,{forItems:items})),function(item,$10,$20,$30){return [_c('div',{key:_$f(1,{forIndex:$20,keyIndex:0,key:1+'-0'+$30})}),_c('div',{key:_$f(1,{forIndex:$20,keyIndex:1,key:1+'-1'+$30})})]})],2)}`
    )
    assertCodegen(
      '<div><block v-for="item in items" :key="item.id"><div></div><div></div></block></div>',
      `with(this){return _c('div',[_l((_$f(1,{forItems:items})),function(item,$10,$20,$30){return [_c('div',{key:_$f(1,{forIndex:$20,keyIndex:0,key:item.id+'_0'})}),_c('div',{key:_$f(1,{forIndex:$20,keyIndex:1,key:item.id+'_1'})})]})],2)}`
    )
  })
  it('generate directive', () => {
    assertCodegen(
      '<p v-custom1:[arg1].modifier="value1" v-custom2></p>',
      `with(this){return _c('p',{extras:{"v-custom1":value1,"v-custom1-arg":arg1},attrs:{"_i":0}})}`
    )
  })
  it('generate v-for directive', () => {
    assertCodegen(
      '<div><template v-for="item in items"><div></div><div></div></template></div>',
      `with(this){return _c('div',[_l((_$f(1,{forItems:items})),function(item,$10,$20,$30){return [_c('div',{key:_$f(1,{forIndex:$20,keyIndex:0,key:1+'-0'+$30})}),_c('div',{key:_$f(1,{forIndex:$20,keyIndex:1,key:1+'-1'+$30})})]})],2)}`
    )
    assertCodegen(
      '<div><template v-for="item in items">text</template></div>',
      `with(this){return _c('div',[_l((_$f(1,{forItems:items})),function(item,$10,$20,$30){return [_c('text',{key:_$f(1,{forIndex:$20,keyIndex:0,key:1+'-0'+$30}),attrs:{"_i":("1-"+$30)}})]})],2)}`
    )
    assertCodegen(
      '<div><template v-for="item in items">{{text}}</template></div>',
      `with(this){return _c('div',[_l((_$f(1,{forItems:items})),function(item,$10,$20,$30){return [_c('text',{key:_$f(1,{forIndex:$20,keyIndex:0,key:1+'-0'+$30}),extras:{t0:_s(text)},attrs:{"_i":("1-"+$30)}})]})],2)}`
    )
    assertCodegen(
      '<div><template v-for="item in items"><span></span>{{text}}</template></div>',
      `with(this){return _c('div',[_l((_$f(1,{forItems:items})),function(item,$10,$20,$30){return [_c('span',{key:_$f(1,{forIndex:$20,keyIndex:0,key:1+'-0'+$30})}),_c('text',{extras:{t0:_s(text)},attrs:{"_i":("1-"+$30)}})]})],2)}`
    )
    assertCodegen(
      '<div><template v-for="item in items">a {{text1}} b {{text2}}</template></div>',
      `with(this){return _c('div',[_l((_$f(1,{forItems:items})),function(item,$10,$20,$30){return [_c('text',{key:_$f(1,{forIndex:$20,keyIndex:0,key:1+'-0'+$30}),extras:{t0:_s(text1),t1:_s(text2)},attrs:{"_i":("1-"+$30)}})]})],2)}`
    )
    assertCodegen(
      '<div><template v-for="item in items"><span v-if="item.sub"></span></template></div>',
      `with(this){return _c('div',[_l((_$f(1,{forItems:items})),function(item,$10,$20,$30){return [(_$i(("2-"+$30),item.sub))?_c('span',{key:_$f(1,{forIndex:$20,keyIndex:0,key:1+'-0'+$30})}):_e()]})],2)}`
    )
  })
  it('generate text with multiple statements', () => {
    assertCodegen(
      '<div>A{{ d | e | f }}B{{text}}C</div>',
      `with(this){return _c('div',[_c('text',{extras:{t0:_s(_f("f")(_f("e")(d))),t1:_s(text)},attrs:{"_i":0}})])}`
    )
  })
})
/* eslint-enable quotes */
