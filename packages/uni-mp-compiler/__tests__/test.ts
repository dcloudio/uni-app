// import { inspect } from './testUtils'

import { transformRef } from '@dcloudio/uni-cli-shared'
import { compile } from '../src/index'
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
        return ''
      },
    },
    ...options,
  })
  console.log(res.code)
  if (res.code === renderCode) {
    console.log('success')
  } else {
    console.error('error')
    console.error(renderCode)
  }
}

assert(
  `<custom v-for="item in items" ref="custom"/>`,
  `<slot wx:for="{{a}}" wx:for-item="item"></slot>`,
  `(_ctx, _cache) => {
return { a: _f(_ctx.items, (item, index, i0) => { return { a: _r(\"default\", { key: index }) }; }) }
}`,
  {
    inline: false,
    nodeTransforms: [transformRef],
  }
)
