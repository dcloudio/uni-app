// import { inspect } from './testUtils'

import {
  addMiniProgramPageJson,
  transformComponentLink,
} from '@dcloudio/uni-cli-shared'
import { compile } from '../src/index'
import type { CompilerOptions } from '../src/options'
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

// assert(
//   `<custom class="a"
//   dd
//   a-b="b" :class="c"
//   :a-c="c" b="bb" :c="cc" :data-d="dd" @click="d" :b="d"/>`,
//   `<slot wx:for="{{a}}" wx:for-item="item"></slot>`,
//   `(_ctx, _cache) => {
// return { a: _f(_ctx.items, (item, index, i0) => { return { a: _r(\"default\", { key: index }) }; }) }
// }`,
//   {
//     inline: false,
//     nodeTransforms: [transformRef],
//   }
// )
const filename = 'pages/vant/vant'
addMiniProgramPageJson(filename, {
  usingComponents: {
    'van-button': 'wxcomponents/button/index',
  },
})
assert(
  `<van-button v-bind="a"><template #default><view/></template></van-button>`,
  `<van-button u-i="dc555fe4-0"/>`,
  `(_ctx, _cache) => {
return {}
}`,
  {
    filename,
    nodeTransforms: [transformComponentLink],
  }
)
