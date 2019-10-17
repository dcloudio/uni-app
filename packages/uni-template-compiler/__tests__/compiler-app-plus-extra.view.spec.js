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
      `with(this){return _c('v-uni-view',{directives:[{name:"custom1",rawName:"v-custom1:[arg1].modifier",value:($r['0']['v-custom1']),expression:"$r['0']['v-custom1']",arg:$r['0']['v-custom1-arg'],modifiers:{"modifier":true}},{name:"custom2",rawName:"v-custom2"}],attrs:{"_i":0}})}`
    )
  })
  it('generate v-for directive', () => {
    assertCodegen(
      '<div><template v-for="item in items"><div></div><div></div></template></div>',
      `with(this){return _c('v-uni-view',{attrs:{"_i":0}},[_l(($r['1']['v-for']),function(item,$i){return [_c('v-uni-view',{key:item['k0'],attrs:{"_i":("2-"+$i)}}),_c('v-uni-view',{key:item['k1'],attrs:{"_i":("3-"+$i)}})]})],2)}`
    )
    assertCodegen(
      '<div><template v-for="item in items"><span v-if="item.sub"></span></template></div>',
      `with(this){return _c('v-uni-view',{attrs:{"_i":0}},[_l(($r['1']['v-for']),function(item,$i){return [($r[("2-"+$i)]['v-if'])?_c('v-uni-label',{key:item['k0'],attrs:{"_i":("2-"+$i)}}):_e()]})],2)}`
    )
  })
  it('generate events with multiple statements', () => {
    assertCodegen(
      '<div>A{{ d | e | f }}B{{text}}C</div>',
      `with(this){return _c('v-uni-view',{attrs:{"_i":0}},[_v("A"+($r['0']['t0'])+"B"+($r['0']['t1'])+"C")])}`
    )
  })
})
/* eslint-enable quotes */
