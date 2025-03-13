import { assert } from './testUtils'

describe('compiler: transform v-model', () => {
  test(`component v-model`, () => {
    assert(
      `<Comp v-model="model" />`,
      `<comp u-i="2a9ec0b0-0" bindupdateModelValue="{{a}}" u-p="{{b||''}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o($event => _ctx.model = $event), b: _p({ modelValue: _ctx.model }) }
}`
    )
  })
  test(`component v-model with cache`, () => {
    assert(
      `<Comp v-model="model" />`,
      `<comp u-i="2a9ec0b0-0" bindupdateModelValue="{{a}}" u-p="{{b||''}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o($event => _ctx.model = $event), b: _p({ modelValue: _ctx.model }) }
}`,
      {
        cacheHandlers: true,
      }
    )
  })
  test(`component v-model with number`, () => {
    assert(
      `<Comp v-model.number="model" />`,
      `<comp u-i="2a9ec0b0-0" bindupdateModelValue="{{a}}" u-p="{{b||''}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_m($event => _ctx.model = $event, { number: true }, true)), b: _p({ modelValue: _ctx.model }) }
}`,
      {
        cacheHandlers: true,
      }
    )
  })
  test(`component v-model with trim`, () => {
    assert(
      `<Comp v-model.trim="model" />`,
      `<comp u-i="2a9ec0b0-0" bindupdateModelValue="{{a}}" u-p="{{b||''}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_m($event => _ctx.model = $event, { trim: true }, true)), b: _p({ modelValue: _ctx.model }) }
}`,
      {
        cacheHandlers: true,
      }
    )
  })
  test(`component v-model with number and trim`, () => {
    assert(
      `<Comp v-model.trim.number="model" />`,
      `<comp u-i="2a9ec0b0-0" bindupdateModelValue="{{a}}" u-p="{{b||''}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_m($event => _ctx.model = $event, { trim: true, number: true }, true)), b: _p({ modelValue: _ctx.model }) }
}`
    )
  })
  test(`input,textarea v-model`, () => {
    assert(
      `<input v-model="model" />`,
      `<input value="{{a}}" bindinput="{{b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.model, b: _o($event => _ctx.model = $event.detail.value) }
}`
    )
    assert(
      `<textarea v-model="model" />`,
      `<textarea value="{{a}}" bindinput="{{b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.model, b: _o($event => _ctx.model = $event.detail.value) }
}`
    )
  })
  test(`input v-model + v-on`, () => {
    assert(
      `<input @input="input" v-model="model" />`,
      `<input bindinput="{{a}}" value="{{b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o([$event => _ctx.model = $event.detail.value, _ctx.input]), b: _ctx.model }
}`
    )
  })
  test(`input v-model with number`, () => {
    assert(
      `<input v-model.number="model" />`,
      `<input value="{{a}}" bindinput="{{b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.model, b: _o(_m($event => _ctx.model = $event.detail.value, { number: true })) }
}`
    )
  })
  test(`input v-model with number and trim`, () => {
    assert(
      `<input v-model.trim.number="model" />`,
      `<input value="{{a}}" bindinput="{{b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.model, b: _o(_m($event => _ctx.model = $event.detail.value, { trim: true, number: true })) }
}`
    )
  })
  test(`input v-model.number + v-on`, () => {
    assert(
      `<input @input="input" v-model.number="model" />`,
      `<input bindinput="{{a}}" value="{{b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o([_m($event => _ctx.model = $event.detail.value, { number: true }), _ctx.input]), b: _ctx.model }
}`
    )
  })
})
