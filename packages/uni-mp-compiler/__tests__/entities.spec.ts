import { assert } from './testUtils'

describe('compiler: transform entities', () => {
  test('keep entites', () => {
    assert(
      `<text>&lt;&gt;&thinsp;&nbsp;&ensp;&emsp;</text>`,
      `<text style="{{'--status-bar-height:' + a}}">&lt;&gt;&thinsp;&nbsp;&ensp;&emsp;</text>`,
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\` }
  return __returned__
}`,
      {
        isX: true,
      }
    )
  })
})
