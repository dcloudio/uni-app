import { assert } from '../testUtils'

describe('compiler:v-text', () => {
  test('template v-text', () => {
    assert(
      `<text v-text="a"/>`,
      `_cE("text", _uM({
  value: _tD(_ctx.a)
}), null, 8 /* PROPS */, ["value"])`
    )
  })
})
