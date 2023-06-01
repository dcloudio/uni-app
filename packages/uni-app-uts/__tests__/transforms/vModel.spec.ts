import { assert } from '../testUtils'

describe('compiler: transform v-model', () => {
  test('simple expression', () => {
    assert(
      `<input v-model="model" />`,
      `createElementVNode("input", new Map<string, any | null>([
  ["modelValue", _ctx.model],
  ["onInput", ($event: InputEvent): any => {_ctx.model = $event.detail.value;
return $event.detail.value;}]
]), null, 40 /* PROPS, HYDRATE_EVENTS */, ["modelValue", "onInput"])`
    )
  })

  // #2426
  test('simple expression (with multilines)', () => {
    assert(
      `<input v-model="\nmodel.\nfoo\n" />`,
      `createElementVNode("input", new Map<string, any | null>([
  ["modelValue", \n_ctx.model.
foo
],
  ["onInput", ($event: InputEvent): any => {
_ctx.model.
foo
 = $event.detail.value;
return $event.detail.value;}]
]), null, 40 /* PROPS, HYDRATE_EVENTS */, ["modelValue", "onInput"])`
    )
  })

  test('compound expression', () => {
    assert(
      `<input v-model="model[index]" />`,
      `createElementVNode(\"input\", new Map<string, any | null>([
  [\"modelValue\", _ctx.model[_ctx.index]],
  [\"onInput\", ($event: InputEvent): any => {_ctx.model[_ctx.index] = $event.detail.value;
return $event.detail.value;}]
]), null, 40 /* PROPS, HYDRATE_EVENTS */, [\"modelValue\", \"onInput\"])`
    )
  })

  test('with argument', () => {
    assert(
      `<Foo v-model:title="model" />`,
      `createVNode(_component_Foo, new Map<string, any | null>([
  ["title", _ctx.model],
  ["onUpdate:title", $event => ((_ctx.model) = $event)]
]), null, 8 /* PROPS */, ["title", "onUpdate:title"])`
    )
  })

  test('with dynamic argument', () => {
    assert(
      `<input v-model:[value]="model" />`,
      `createElementVNode(\"input\", normalizeProps(new Map<string, any | null>([
  [_ctx.value, _ctx.model],
  [\"onUpdate:\" + _ctx.value, $event => ((_ctx.model) = $event)]
])), null, 16 /* FULL_PROPS */)`
    )
  })
  test('with modifier lazy', () => {
    assert(
      `<input v-model.lazy="model" />`,
      `createElementVNode(\"input\", new Map<string, any | null>([
  [\"modelValue\", _ctx.model],
  [\"onBlur\", ($event: InputBlurEvent): any => {_ctx.model = $event.detail.value;
return $event.detail.value;}]
]), null, 40 /* PROPS, HYDRATE_EVENTS */, [\"modelValue\", \"onBlur\"])`
    )
  })
  test('with modifier number', () => {
    assert(
      `<input v-model.number="model" />`,
      `createElementVNode(\"input\", new Map<string, any | null>([
  [\"modelValue\", _ctx.model],
  [\"onInput\", ($event: InputEvent): any => {_ctx.model = _looseToNumber($event.detail.value);
return _looseToNumber($event.detail.value);}]
]), null, 40 /* PROPS, HYDRATE_EVENTS */, [\"modelValue\", \"onInput\"])`
    )
  })
  test('with modifier trim', () => {
    assert(
      `<input v-model.trim="model" />`,
      `createElementVNode(\"input\", new Map<string, any | null>([
  [\"modelValue\", _ctx.model],
  [\"onInput\", ($event: InputEvent): any => {_ctx.model = $event.detail.value.trim();
return $event.detail.value.trim();}]
]), null, 40 /* PROPS, HYDRATE_EVENTS */, [\"modelValue\", \"onInput\"])`
    )
  })
})
