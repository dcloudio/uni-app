import { assert } from '../testUtils'

describe('compiler:v-text', () => {
  test('template v-text', () => {
    assert(
      `<text v-text="a"/>`,
      `createElementVNode("text", utsMapOf({
  value: toDisplayString(_ctx.a)
}), null, 8 /* PROPS */, ["value"])`
    )
  })
})
