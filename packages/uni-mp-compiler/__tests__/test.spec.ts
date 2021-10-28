// import { inspect } from './testUtils'

import { compile } from '../src'
import { CompilerOptions } from '../src/options'
import { miniProgram } from './testUtils'

function assert(
  template: string,
  templateCode: string,
  renderCode: string,
  options: CompilerOptions = {}
) {
  const res = compile(template, {
    filename: 'foo.vue',
    prefixIdentifiers: true,
    inline: true,
    generatorOpts: {
      concise: true,
    },
    miniProgram: {
      ...miniProgram,
      emitFile({ source }) {
        console.log(source)
        // expect(source).toBe(templateCode)
        return ''
      },
    },
    ...options,
  })
  // expect(res.template).toBe(templateCode)
  // expect(res.code).toBe(renderCode)
  // console.log(require('util').inspect(res.code, { colors: true, depth: null }))
  // console.log(require('util').inspect(res, { colors: true, depth: null }))
  console.log(res.code)
  expect(res.code).toBe(renderCode)
}

describe('compiler', () => {
  test('scope', () => {
    assert(
      `<unicloud-db v-slot:default="{data, loading, error, options}" collection=""><view v-if="error">{{error.message}}</view><view v-else></view></unicloud-db>`,
      `<unicloud-db v-s="{{['default']}}" collection="" v-i="2a9ec0b0-0" slot="default"><block wx:for="{{a}}" wx:for-item="v0" wx:key="c"><view wx:if="{{v0.a}}">{{v0.b}}</view><view wx:else></view></block></unicloud-db>`,
      `(_ctx, _cache) => {
  return { a: _w(({ data, loading, error, options }, s0, i0) => { return _e({ a: error }, error ? { b: _t(error.message) } : {}, { c: s0 }); }, { name: 'default', vueId: '2a9ec0b0-0' }) }
}`
    )
  })
})
