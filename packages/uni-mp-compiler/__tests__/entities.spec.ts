import { assert } from './testUtils'

describe('compiler: transform entities', () => {
  test('keep entites', () => {
    assert(
      `<text>&lt;&gt;&thinsp;&nbsp;&ensp;&emsp;</text>`,
      `<text>&lt;&gt;&thinsp;&nbsp;&ensp;&emsp;</text>`,
      `(_ctx, _cache) => {
  const __returned__ = {}
  return __returned__
}`,
      {
        isX: true,
      }
    )
  })
})
