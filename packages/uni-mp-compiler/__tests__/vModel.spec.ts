import { BindingTypes } from '@vue/compiler-core'
import { assert, miniProgram } from './testUtils'

describe('compiler: transform v-model', () => {
  test(`component v-model`, () => {
    assert(
      `<Comp v-model="model" />`,
      `<comp u-i="2a9ec0b0-0" bindupdateModelValue="{{a}}" u-p="{{b||''}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o($event => _ctx.model = $event, "21"), b: _p({ modelValue: _ctx.model }) }
}`
    )
  })
  test(`component v-model with cache`, () => {
    assert(
      `<Comp v-model="model" />`,
      `<comp u-i="2a9ec0b0-0" bindupdateModelValue="{{a}}" u-p="{{b||''}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o($event => _ctx.model = $event, "21"), b: _p({ modelValue: _ctx.model }) }
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
  return { a: _o(_m($event => _ctx.model = $event, { number: true }, true), "94"), b: _p({ modelValue: _ctx.model }) }
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
  return { a: _o(_m($event => _ctx.model = $event, { trim: true }, true), "d0"), b: _p({ modelValue: _ctx.model }) }
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
  return { a: _o(_m($event => _ctx.model = $event, { trim: true, number: true }, true), "91"), b: _p({ modelValue: _ctx.model }) }
}`
    )
  })
  test(`input,textarea v-model`, () => {
    assert(
      `<input v-model="model" />`,
      `<input value="{{a}}" bindinput="{{b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.model, b: _o($event => _ctx.model = $event.detail.value, "64") }
}`
    )
    assert(
      `<textarea v-model="model" />`,
      `<textarea value="{{a}}" bindinput="{{b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.model, b: _o($event => _ctx.model = $event.detail.value, "16") }
}`
    )
  })
  test(`input v-model + v-on`, () => {
    assert(
      `<input @input="input" v-model="model" />`,
      `<input bindinput="{{a}}" value="{{b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o([$event => _ctx.model = $event.detail.value, _ctx.input], "e3"), b: _ctx.model }
}`
    )
  })
  test(`input v-model with number`, () => {
    assert(
      `<input v-model.number="model" />`,
      `<input value="{{a}}" bindinput="{{b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.model, b: _o(_m($event => _ctx.model = $event.detail.value, { number: true }), "16") }
}`
    )
  })
  test(`input v-model with number and trim`, () => {
    assert(
      `<input v-model.trim.number="model" />`,
      `<input value="{{a}}" bindinput="{{b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _ctx.model, b: _o(_m($event => _ctx.model = $event.detail.value, { trim: true, number: true }), "14") }
}`
    )
  })
  test(`input v-model.number + v-on`, () => {
    assert(
      `<input @input="input" v-model.number="model" />`,
      `<input bindinput="{{a}}" value="{{b}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o([_m($event => _ctx.model = $event.detail.value, { number: true }), _ctx.input], "d3"), b: _ctx.model }
}`
    )
  })
  test(`input v-model + v-for`, () => {
    assert(
      `<view v-for="(item,index) in props" :key="index"><input v-model="formData[item]" @input="change" /></view>`,
      `<view wx:for="{{a}}" wx:for-item="item" wx:key="c"><input bindinput="{{item.a}}" value="{{item.b}}"/></view>`,
      `(_ctx, _cache) => {
  return { a: _f(props, (item, index, i0) => { return { a: _o([$event => formData[item] = $event.detail.value, change], index), b: formData[item], c: index }; }) }
}`,
      {
        inline: true,
        bindingMetadata: {
          formData: BindingTypes.SETUP_CONST,
          change: BindingTypes.SETUP_CONST,
          props: BindingTypes.LITERAL_CONST,
        },
        miniProgram: {
          ...miniProgram,
          event: {
            key: true,
          },
        },
      }
    )
  })

  describe('lazy modifier', () => {
    const env: Record<string, string | undefined> = process.env
    const originalEnv = {
      UNI_PLATFORM: env.UNI_PLATFORM,
    }

    beforeEach(() => {
      env.UNI_PLATFORM = 'mp-weixin'
    })

    afterEach(() => {
      if (originalEnv.UNI_PLATFORM === undefined) {
        delete env.UNI_PLATFORM
      } else {
        env.UNI_PLATFORM = originalEnv.UNI_PLATFORM
      }
    })

    test('input v-model.lazy', () => {
      assert(
        `<input v-model.lazy="model" />`,
        `<input style="{{'--status-bar-height:' + a + ';' + ('--uni-safe-area-inset-bottom:' + b)}}" value="{{c}}" bindchange="{{d}}"/>`,
        `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_a_i_b}px\`, c: _ctx.model, d: _o($event => _ctx.model = $event.detail.value, "4c") }
  return __returned__
}`,
        { isX: true }
      )
    })

    test('input without lazy', () => {
      assert(
        `<input v-model="model" />`,
        `<input style="{{'--status-bar-height:' + a + ';' + ('--uni-safe-area-inset-bottom:' + b)}}" value="{{c}}" bindinput="{{d}}"/>`,
        `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_a_i_b}px\`, c: _ctx.model, d: _o($event => _ctx.model = $event.detail.value, "64") }
  return __returned__
}`,
        { isX: true }
      )
    })

    test('non uni-app-x keeps input with lazy', () => {
      assert(
        `<input v-model.lazy="model" />`,
        `<input value="{{a}}" bindinput="{{b}}"/>`,
        `(_ctx, _cache) => {
  return { a: _ctx.model, b: _o(_m($event => _ctx.model = $event.detail.value, { lazy: true }), "f2") }
}`
      )
    })

    test('input v-model.lazy + v-on', () => {
      assert(
        `<input v-model.lazy="model" @input="onInput" @change="onChange" />`,
        `<input bindinput="{{a}}" bindchange="{{b}}" style="{{'--status-bar-height:' + c + ';' + ('--uni-safe-area-inset-bottom:' + d)}}" value="{{e}}"/>`,
        `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _o(_ctx.onInput, "6a"), b: _o([$event => _ctx.model = $event.detail.value, _ctx.onChange], "11"), c: \`\${_ctx.u_s_b_h}px\`, d: \`\${_ctx.u_s_a_i_b}px\`, e: _ctx.model }
  return __returned__
}`,
        { isX: true }
      )
      assert(
        `<input @input="onInput" @change="onChange" v-model.lazy="model" />`,
        `<input bindinput="{{a}}" bindchange="{{b}}" style="{{'--status-bar-height:' + c + ';' + ('--uni-safe-area-inset-bottom:' + d)}}" value="{{e}}"/>`,
        `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _o(_ctx.onInput, "ee"), b: _o([$event => _ctx.model = $event.detail.value, _ctx.onChange], "11"), c: \`\${_ctx.u_s_b_h}px\`, d: \`\${_ctx.u_s_a_i_b}px\`, e: _ctx.model }
  return __returned__
}`,
        { isX: true }
      )
      assert(
        `<input @change="onChange" v-model.lazy="model" @input="onInput" />`,
        `<input bindchange="{{a}}" bindinput="{{b}}" style="{{'--status-bar-height:' + c + ';' + ('--uni-safe-area-inset-bottom:' + d)}}" value="{{e}}"/>`,
        `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _o([$event => _ctx.model = $event.detail.value, _ctx.onChange], "11"), b: _o(_ctx.onInput, "ab"), c: \`\${_ctx.u_s_b_h}px\`, d: \`\${_ctx.u_s_a_i_b}px\`, e: _ctx.model }
  return __returned__
}`,
        { isX: true }
      )
      assert(
        `<input v-model.lazy="model" @input="onInput" />`,
        `<input bindinput="{{a}}" style="{{'--status-bar-height:' + b + ';' + ('--uni-safe-area-inset-bottom:' + c)}}" value="{{d}}" bindchange="{{e}}"/>`,
        `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _o(_ctx.onInput, "6a"), b: \`\${_ctx.u_s_b_h}px\`, c: \`\${_ctx.u_s_a_i_b}px\`, d: _ctx.model, e: _o($event => _ctx.model = $event.detail.value, "4c") }
  return __returned__
}`,
        { isX: true }
      )
    })

    test('input v-model.lazy with trim and number', () => {
      assert(
        `<input v-model.lazy.trim="model" @change="onChange" />`,
        `<input bindchange="{{a}}" style="{{'--status-bar-height:' + b + ';' + ('--uni-safe-area-inset-bottom:' + c)}}" value="{{d}}"/>`,
        `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _o([_m($event => _ctx.model = $event.detail.value, { trim: true }), _ctx.onChange], "69"), b: \`\${_ctx.u_s_b_h}px\`, c: \`\${_ctx.u_s_a_i_b}px\`, d: _ctx.model }
  return __returned__
}`,
        { isX: true }
      )
      assert(
        `<input v-model.lazy.number="model" @change="onChange" />`,
        `<input bindchange="{{a}}" style="{{'--status-bar-height:' + b + ';' + ('--uni-safe-area-inset-bottom:' + c)}}" value="{{d}}"/>`,
        `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _o([_m($event => _ctx.model = $event.detail.value, { number: true }), _ctx.onChange], "37"), b: \`\${_ctx.u_s_b_h}px\`, c: \`\${_ctx.u_s_a_i_b}px\`, d: _ctx.model }
  return __returned__
}`,
        { isX: true }
      )
      assert(
        `<input v-model.lazy.trim.number="model" />`,
        `<input style="{{'--status-bar-height:' + a + ';' + ('--uni-safe-area-inset-bottom:' + b)}}" value="{{c}}" bindchange="{{d}}"/>`,
        `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_a_i_b}px\`, c: _ctx.model, d: _o(_m($event => _ctx.model = $event.detail.value, { trim: true, number: true }), "f1") }
  return __returned__
}`,
        { isX: true }
      )
    })

    test('input v-model.lazy + v-for', () => {
      assert(
        `<view v-for="item in items" :key="item.id"><input v-model.lazy="item.value" @change="onChange" /></view>`,
        `<view wx:for="{{a}}" wx:for-item="item" wx:key="c" style="{{'--status-bar-height:' + b + ';' + ('--uni-safe-area-inset-bottom:' + c)}}"><input bindchange="{{item.a}}" value="{{item.b}}"/></view>`,
        `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _f(_ctx.items, (item, k0, i0) => { return { a: _o([$event => item.value = $event.detail.value, _ctx.onChange], item.id), b: item.value, c: item.id }; }), b: \`\${_ctx.u_s_b_h}px\`, c: \`\${_ctx.u_s_a_i_b}px\` }
  return __returned__
}`,
        { isX: true },
        { event: { key: true } }
      )
    })

    test('input v-model.lazy with setup ref', () => {
      assert(
        `<input v-model.lazy="model" />`,
        `<input style="{{'--status-bar-height:' + a + ';' + ('--uni-safe-area-inset-bottom:' + b)}}" value="{{c}}" bindchange="{{d}}"/>`,
        `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: \`\${_ctx.u_s_b_h}px\`, b: \`\${_ctx.u_s_a_i_b}px\`, c: model.value, d: _o($event => model.value = $event.detail.value, "6d") }
  return __returned__
}`,
        { isX: true, bindingMetadata: { model: BindingTypes.SETUP_REF } }
      )
    })

    test('component v-model.lazy', () => {
      assert(
        `<CustomInput v-model.lazy="model" />`,
        `<custom-input u-i="2a9ec0b0-0" bindupdateModelValue="{{a}}" u-p="{{b||''}}"/>`,
        `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _o(_m($event => _ctx.model = $event, { lazy: true }, true), "8f"), b: _p({ modelValue: _ctx.model }) }
  return __returned__
}`,
        { isX: true }
      )
    })
  })
})
