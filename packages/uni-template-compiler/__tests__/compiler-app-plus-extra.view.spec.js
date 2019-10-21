const compiler = require('../lib')

function assertCodegen (template, generatedCode, ...args) {
  const compiled = compiler.compile(template, {
    mp: {
      platform: 'app-plus'
    },
    view: true
  })
  expect(compiled.render).toBe(generatedCode)
}

/* eslint-disable quotes */
describe('codegen', () => {
  it('generate directive', () => {
    assertCodegen(
      '<p v-custom1:[arg1].modifier="value1" v-custom2></p>',
      `with(this){return _c('v-uni-view',{directives:[{name:"custom1",rawName:"v-custom1:[arg1].modifier",value:(_$g(0,'v-custom1')),expression:"_$g(0,'v-custom1')",arg:_$g(0,'v-custom1-arg'),modifiers:{"modifier":true}},{name:"custom2",rawName:"v-custom2"}],attrs:{"_i":0}})}`
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
      `with(this){return _c('v-uni-view',{attrs:{"_i":0}},[_t("default",[_c('v-uni-view',{attrs:{"_i":2}},[_v((_$g(2,'t0',1)))])],{"_i":1})],2)}`
    )
  })
})
/* eslint-enable quotes */
