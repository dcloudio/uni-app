import { assert } from '../testUtils'

describe('compiler:v-model', () => {
  test('input v-model', () => {
    assert(
      `<input type="text" v-model="title" />`,
      `createElementVNode("input", new Map<string,any | null>([
  ["type", "text"],
  ["modelValue", _ctx.title],
  ["onInput", ($event: InputEvent): any => {_ctx.title = $event.detail.value;
return $event.detail.value;}]
]), null, 40 /* PROPS, HYDRATE_EVENTS */, ["modelValue", "onInput"])`
    )
  })

  test('textarea v-model', () => {
    assert(
      `<textarea v-model="title" />`,
      `createElementVNode("textarea", new Map<string,any | null>([
  ["modelValue", _ctx.title],
  ["onInput", ($event: InputEvent): any => {_ctx.title = $event.detail.value;
return $event.detail.value;}]
]), null, 40 /* PROPS, HYDRATE_EVENTS */, ["modelValue", "onInput"])`
    )
  })
})
