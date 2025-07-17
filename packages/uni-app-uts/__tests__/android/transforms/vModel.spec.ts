import { extend } from '@vue/shared'
import {
  BindingTypes,
  type CompilerOptions,
  type ComponentNode,
  type ElementNode,
  ErrorCodes,
  type ForNode,
  NORMALIZE_PROPS,
  NodeTypes,
  type ObjectExpression,
  type PlainElementNode,
  type VNodeCall,
  baseParse as parse,
  trackSlotScopes,
  transform,
  transformElement,
} from '@vue/compiler-core'
import { transformFor } from '../../../src/plugins/android/uvue/compiler/transforms/vFor'
import { transformExpression } from '../../../src/plugins/android/uvue/compiler/transforms/transformExpression'
import { transformModel } from '../../../src/plugins/android/uvue/compiler/transforms/vModel'
import { generate } from '../../../src/plugins/android/uvue/compiler/codegen'
import type { CallExpression } from '@babel/types'
import { assert } from '../testUtils'

function parseWithVModel(template: string, options: CompilerOptions = {}) {
  const ast = parse(template)

  transform(
    ast,
    extend({}, options, {
      prefixIdentifiers: options.prefixIdentifiers,
      nodeTransforms: [
        transformFor,
        transformExpression,
        transformElement,
        trackSlotScopes,
      ],
      directiveTransforms: { model: transformModel },
      expressionPlugins: ['typescript'],
    })
  )

  return ast
}

describe('compiler: transform v-model', () => {
  test('simple expression', () => {
    assert(
      `<input v-model="model" />`,
      `_cE("input", _uM({
  modelValue: _ctx.model,
  onInput: ($event: UniInputEvent) => {(_ctx.model) = $event.detail.value}
}), null, 40 /* PROPS, NEED_HYDRATION */, ["modelValue", "onInput"])`
    )
    assert(
      `<input v-model="model" @input="onInput" />`,
      `_cE("input", _uM({
  modelValue: _ctx.model,
  onInput: [($event: UniInputEvent) => {(_ctx.model) = $event.detail.value}, _ctx.onInput] as Array<any | null>
}), null, 40 /* PROPS, NEED_HYDRATION */, ["modelValue", "onInput"])`
    )
    assert(
      `<custom-input v-model="model" @update:modelValue="handleModelValueUpdate"/>`,
      `_cV(_component_custom_input, _uM({
  modelValue: _ctx.model,
  "onUpdate:modelValue": [$event => {(_ctx.model) = $event}, _ctx.handleModelValueUpdate]
}), null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue"])`
    )
  })

  // #2426
  test('simple expression (with multilines)', () => {
    assert(
      `<input v-model="\nmodel.\nfoo\n" />`,
      `_cE("input", _uM({
  modelValue: \n_ctx.model.
foo
,
  onInput: ($event: UniInputEvent) => {(
_ctx.model.
foo
) = $event.detail.value}
}), null, 40 /* PROPS, NEED_HYDRATION */, ["modelValue", "onInput"])`
    )
  })

  test('compound expression', () => {
    assert(
      `<input v-model="model[index]" />`,
      `_cE(\"input\", _uM({
  modelValue: _ctx.model[_ctx.index],
  onInput: ($event: UniInputEvent) => {(_ctx.model[_ctx.index]) = $event.detail.value}
}), null, 40 /* PROPS, NEED_HYDRATION */, [\"modelValue\", \"onInput\"])`
    )
  })

  test('with argument', () => {
    assert(
      `<Foo v-model:title="model" />`,
      `_cV(_component_Foo, _uM({
  title: _ctx.model,
  "onUpdate:title": $event => {(_ctx.model) = $event}
}), null, 8 /* PROPS */, ["title", "onUpdate:title"])`
    )
  })

  test('with dynamic argument', () => {
    assert(
      `<Foo v-model:[value]="model" />`,
      `_cV(_component_Foo, normalizeProps(_uM({
  [_ctx.value]: _ctx.model,
  ["onUpdate:" + _ctx.value]: $event => {(_ctx.model) = $event}
})), null, 16 /* FULL_PROPS */)`
    )
  })
  test('with modifier lazy', () => {
    assert(
      `<input v-model.lazy="model" />`,
      `_cE(\"input\", _uM({
  modelValue: _ctx.model,
  onBlur: ($event: UniInputBlurEvent) => {(_ctx.model) = $event.detail.value}
}), null, 40 /* PROPS, NEED_HYDRATION */, [\"modelValue\", \"onBlur\"])`
    )
  })
  test('with modifier number', () => {
    assert(
      `<input v-model.number="model" />`,
      `_cE(\"input\", _uM({
  modelValue: _ctx.model,
  onInput: ($event: UniInputEvent) => {(_ctx.model) = looseToNumber($event.detail.value)}
}), null, 40 /* PROPS, NEED_HYDRATION */, [\"modelValue\", \"onInput\"])`
    )
  })
  test('with modifier trim', () => {
    assert(
      `<input v-model.trim="model" />`,
      `_cE(\"input\", _uM({
  modelValue: _ctx.model,
  onInput: ($event: UniInputEvent) => {(_ctx.model) = $event.detail.value.trim()}
}), null, 40 /* PROPS, NEED_HYDRATION */, [\"modelValue\", \"onInput\"])`
    )
  })
  test('expression width type', () => {
    assert(
      `<Foo v-model="model as string" />`,
      `_cV(_component_Foo, _uM({
  modelValue: _ctx.model,
  "onUpdate:modelValue": ($event: string) => {(_ctx.model) = $event}
}), null, 8 /* PROPS */, [\"modelValue\", \"onUpdate:modelValue\"])`
    )
    assert(
      `<Foo v-model="(model as string)" />`,
      `_cV(_component_Foo, _uM({
  modelValue: _ctx.model,
  "onUpdate:modelValue": ($event: string) => {(_ctx.model) = $event}
}), null, 8 /* PROPS */, [\"modelValue\", \"onUpdate:modelValue\"])`
    )
    assert(
      `<Foo v-model=" (model as string) " />`,
      `_cV(_component_Foo, _uM({
  modelValue: _ctx.model,
  "onUpdate:modelValue": ($event: string) => {(_ctx.model) = $event}
}), null, 8 /* PROPS */, [\"modelValue\", \"onUpdate:modelValue\"])`
    )
  })
  test('complex expressions wrapped in ()', () => {
    assert(
      `<my-input v-model="(obj.str as string)" />`,
      `_cV(_component_my_input, _uM({
  modelValue: _ctx.obj.str,
  \"onUpdate:modelValue\": ($event: string) => {(_ctx.obj.str) = $event}
}), null, 8 /* PROPS */, [\"modelValue\", \"onUpdate:modelValue\"])`
    )
    assert(
      `<my-input v-model="(obj['t'+i] as string)" />`,
      `_cV(_component_my_input, _uM({
  modelValue: _ctx.obj['t'+_ctx.i],
  \"onUpdate:modelValue\": ($event: string) => {(_ctx.obj['t'+_ctx.i]) = $event}
}), null, 8 /* PROPS */, [\"modelValue\", \"onUpdate:modelValue\"])`
    )
  })

  test('simple expression', () => {
    const root = parseWithVModel('<input v-model="model" />')
    const node = root.children[0] as ElementNode
    const props = ((node.codegenNode as VNodeCall).props as ObjectExpression)
      .properties

    expect(props[0]).toMatchObject({
      key: {
        content: 'modelValue',
        isStatic: true,
      },
      value: {
        content: 'model',
        isStatic: false,
      },
    })

    expect(props[1]).toMatchObject({
      key: {
        content: 'onInput',
        isStatic: true,
      },
      value: {
        children: [
          '($event: UniInputEvent) => {(',
          {
            content: 'model',
            isStatic: false,
          },
          `) = $event.detail.value}`,
        ],
      },
    })

    expect(generate(root, {} as any).code).toMatchSnapshot()
  })

  test('simple expression (with prefixIdentifiers)', () => {
    const root = parseWithVModel('<input v-model="model" />', {
      prefixIdentifiers: true,
    })
    const node = root.children[0] as ElementNode
    const props = ((node.codegenNode as VNodeCall).props as ObjectExpression)
      .properties

    expect(props[0]).toMatchObject({
      key: {
        content: 'modelValue',
        isStatic: true,
      },
      value: {
        content: '_ctx.model',
        isStatic: false,
      },
    })

    expect(props[1]).toMatchObject({
      key: {
        content: 'onInput',
        isStatic: true,
      },
      value: {
        children: [
          '($event: UniInputEvent) => {(',
          {
            content: '_ctx.model',
            isStatic: false,
          },
          `) = $event.detail.value}`,
        ],
      },
    })

    expect(generate(root, {} as any).code).toMatchSnapshot()
  })

  // #2426
  test('simple expression (with multilines)', () => {
    const root = parseWithVModel('<input v-model="\n model\n.\nfoo \n" />')
    const node = root.children[0] as ElementNode
    const props = ((node.codegenNode as VNodeCall).props as ObjectExpression)
      .properties

    expect(props[0]).toMatchObject({
      key: {
        content: 'modelValue',
        isStatic: true,
      },
      value: {
        content: '\n model\n.\nfoo \n',
        isStatic: false,
      },
    })

    expect(props[1]).toMatchObject({
      key: {
        content: 'onInput',
        isStatic: true,
      },
      value: {
        children: [
          '($event: UniInputEvent) => {(',
          {
            content: '\n model\n.\nfoo \n',
            isStatic: false,
          },
          `) = $event.detail.value}`,
        ],
      },
    })

    expect(generate(root, {} as any).code).toMatchSnapshot()
  })

  test('compound expression', () => {
    const root = parseWithVModel('<input v-model="model[index]" />')
    const node = root.children[0] as ElementNode
    const props = ((node.codegenNode as VNodeCall).props as ObjectExpression)
      .properties

    expect(props[0]).toMatchObject({
      key: {
        content: 'modelValue',
        isStatic: true,
      },
      value: {
        content: 'model[index]',
        isStatic: false,
      },
    })

    expect(props[1]).toMatchObject({
      key: {
        content: 'onInput',
        isStatic: true,
      },
      value: {
        children: [
          '($event: UniInputEvent) => {(',
          {
            content: 'model[index]',
            isStatic: false,
          },
          `) = $event.detail.value}`,
        ],
      },
    })

    expect(generate(root, {} as any).code).toMatchSnapshot()
  })

  test('compound expression (with prefixIdentifiers)', () => {
    const root = parseWithVModel('<input v-model="model[index]" />', {
      prefixIdentifiers: true,
    })
    const node = root.children[0] as ElementNode
    const props = ((node.codegenNode as VNodeCall).props as ObjectExpression)
      .properties

    expect(props[0]).toMatchObject({
      key: {
        content: 'modelValue',
        isStatic: true,
      },
      value: {
        children: [
          {
            content: '_ctx.model',
            isStatic: false,
          },
          '[',
          {
            content: '_ctx.index',
            isStatic: false,
          },
          ']',
        ],
      },
    })

    expect(props[1]).toMatchObject({
      key: {
        content: 'onInput',
        isStatic: true,
      },
      value: {
        children: [
          '($event: UniInputEvent) => {(',
          {
            children: [
              {
                content: '_ctx.model',
                isStatic: false,
              },
              '[',
              {
                content: '_ctx.index',
                isStatic: false,
              },
              ']',
            ],
          },
          `) = $event.detail.value}`,
        ],
      },
    })

    expect(generate(root, {} as any).code).toMatchSnapshot()
  })

  test('with argument', () => {
    const root = parseWithVModel('<input v-model:foo-value="model" />')
    const node = root.children[0] as ElementNode
    const props = ((node.codegenNode as VNodeCall).props as ObjectExpression)
      .properties
    expect(props[0]).toMatchObject({
      key: {
        content: 'foo-value',
        isStatic: true,
      },
      value: {
        content: 'model',
        isStatic: false,
      },
    })

    expect(props[1]).toMatchObject({
      key: {
        content: 'onUpdate:fooValue',
        isStatic: true,
      },
      value: {
        children: [
          '($event: UniInputEvent) => {(',
          {
            content: 'model',
            isStatic: false,
          },
          `) = $event.detail.value}`,
        ],
      },
    })

    expect(generate(root, {} as any).code).toMatchSnapshot()
  })

  test('with dynamic argument', () => {
    const root = parseWithVModel('<Foo v-model:[value]="model" />')
    const node = root.children[0] as ElementNode
    const props = (node.codegenNode as VNodeCall)
      .props as unknown as CallExpression

    expect(props).toMatchObject({
      type: NodeTypes.JS_CALL_EXPRESSION,
      callee: NORMALIZE_PROPS,
      arguments: [
        {
          type: NodeTypes.JS_OBJECT_EXPRESSION,
          properties: [
            {
              key: {
                content: 'value',
                isStatic: false,
              },
              value: {
                content: 'model',
                isStatic: false,
              },
            },
            {
              key: {
                children: [
                  '"onUpdate:" + ',
                  {
                    content: 'value',
                    isStatic: false,
                  },
                ],
              },
              value: {
                children: [
                  '$event => {(',
                  {
                    content: 'model',
                    isStatic: false,
                  },
                  `) = $event}`,
                ],
              },
            },
          ],
        },
      ],
    })

    expect(generate(root, {} as any).code).toMatchSnapshot()
  })

  test('with dynamic argument (with prefixIdentifiers)', () => {
    const root = parseWithVModel('<input v-model:[value]="model" />', {
      prefixIdentifiers: true,
    })
    const node = root.children[0] as ElementNode
    const props = (node.codegenNode as VNodeCall)
      .props as unknown as CallExpression

    expect(props).toMatchObject({
      type: NodeTypes.JS_CALL_EXPRESSION,
      callee: NORMALIZE_PROPS,
      arguments: [
        {
          type: NodeTypes.JS_OBJECT_EXPRESSION,
          properties: [
            {
              key: {
                content: '_ctx.value',
                isStatic: false,
              },
              value: {
                content: '_ctx.model',
                isStatic: false,
              },
            },
            {
              key: {
                children: [
                  '"onUpdate:" + ',
                  {
                    content: '_ctx.value',
                    isStatic: false,
                  },
                ],
              },
              value: {
                children: [
                  '($event: UniInputEvent) => {(',
                  {
                    content: '_ctx.model',
                    isStatic: false,
                  },
                  `) = $event.detail.value}`,
                ],
              },
            },
          ],
        },
      ],
    })

    expect(generate(root, {} as any).code).toMatchSnapshot()
  })

  test('should cache update handler w/ cacheHandlers: true', () => {
    const root = parseWithVModel('<input v-model="foo" />', {
      prefixIdentifiers: true,
      cacheHandlers: true,
    })
    expect(root.cached).toBe(1)
    const codegen = (root.children[0] as PlainElementNode)
      .codegenNode as VNodeCall
    // should not list cached prop in dynamicProps
    expect(codegen.dynamicProps).toBe(`["modelValue"]`)
    expect((codegen.props as ObjectExpression).properties[1].value.type).toBe(
      NodeTypes.JS_CACHE_EXPRESSION
    )
  })

  test('should not cache update handler if it refers v-for scope variables', () => {
    const root = parseWithVModel(
      '<input v-for="i in list" v-model="foo[i]" />',
      {
        prefixIdentifiers: true,
        cacheHandlers: true,
      }
    )
    expect(root.cached).toBe(0)
    const codegen = (
      (root.children[0] as ForNode).children[0] as PlainElementNode
    ).codegenNode as VNodeCall
    expect(codegen.dynamicProps).toBe(`["modelValue", "onInput"]`)
    expect(
      (codegen.props as ObjectExpression).properties[1].value.type
    ).not.toBe(NodeTypes.JS_CACHE_EXPRESSION)
  })

  test('should not cache update handler if it inside v-once', () => {
    const root = parseWithVModel(
      '<view v-once><input v-model="foo" /></view>',
      {
        prefixIdentifiers: true,
        cacheHandlers: true,
      }
    )
    expect(root.cached).not.toBe(2)
    expect(root.cached).toBe(1)
  })

  test('should mark update handler dynamic if it refers slot scope variables', () => {
    const root = parseWithVModel(
      '<Comp v-slot="{ foo }"><input v-model="foo.bar"/></Comp>',
      {
        prefixIdentifiers: true,
      }
    )
    const codegen = (
      (root.children[0] as ComponentNode).children[0] as PlainElementNode
    ).codegenNode as VNodeCall
    expect(codegen.dynamicProps).toBe(`["modelValue", "onInput"]`)
  })

  test('should generate modelModifiers for component v-model', () => {
    const root = parseWithVModel('<Comp v-model.trim.bar-baz="foo" />', {
      prefixIdentifiers: true,
    })
    const vnodeCall = (root.children[0] as ComponentNode)
      .codegenNode as VNodeCall
    // props
    expect(vnodeCall.props).toMatchObject({
      properties: [
        { key: { content: `modelValue` } },
        { key: { content: `onUpdate:modelValue` } },
        {
          key: { content: 'modelModifiers' },
          value: {
            content: `{ trim: true, "bar-baz": true }`,
            isStatic: false,
          },
        },
      ],
    })
    // should NOT include modelModifiers in dynamicPropNames because it's never
    // gonna change
    expect(vnodeCall.dynamicProps).toBe(`["modelValue", "onUpdate:modelValue"]`)
  })

  test('should generate modelModifiers for component v-model with arguments', () => {
    const root = parseWithVModel(
      '<Comp v-model:foo.trim="foo" v-model:bar.number="bar" />',
      {
        prefixIdentifiers: true,
      }
    )
    const vnodeCall = (root.children[0] as ComponentNode)
      .codegenNode as VNodeCall
    // props
    expect(vnodeCall.props).toMatchObject({
      properties: [
        { key: { content: `foo` } },
        { key: { content: `onUpdate:foo` } },
        {
          key: { content: 'fooModifiers' },
          value: { content: `{ trim: true }`, isStatic: false },
        },
        { key: { content: `bar` } },
        { key: { content: `onUpdate:bar` } },
        {
          key: { content: 'barModifiers' },
          value: { content: `{ number: true }`, isStatic: false },
        },
      ],
    })
    // should NOT include modelModifiers in dynamicPropNames because it's never
    // gonna change
    expect(vnodeCall.dynamicProps).toBe(
      `["foo", "onUpdate:foo", "bar", "onUpdate:bar"]`
    )
  })

  test('complex expression', () => {
    const root = parseWithVModel(`<Comp v-model="values['t'+i] as string" />`, {
      prefixIdentifiers: true,
      bindingMetadata: {
        values: BindingTypes.SETUP_CONST,
      },
    })
    const vnodeCall = (root.children[0] as ComponentNode)
      .codegenNode as VNodeCall
    // props
    expect(vnodeCall.props).toMatchObject({
      properties: [
        {
          key: { content: `modelValue` },
          value: { children: [{ content: `_ctx.values['t'+_ctx.i]` }] },
        },
        { key: { content: `onUpdate:modelValue` } },
      ],
    })
  })

  describe('errors', () => {
    test('missing expression', () => {
      const onError = jest.fn()
      parseWithVModel('<span v-model />', { onError })

      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          code: ErrorCodes.X_V_MODEL_NO_EXPRESSION,
        })
      )
    })

    test('empty expression', () => {
      const onError = jest.fn()
      parseWithVModel('<span v-model="" />', { onError })

      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          code: ErrorCodes.X_V_MODEL_MALFORMED_EXPRESSION,
        })
      )
    })

    test('mal-formed expression', () => {
      const onError = jest.fn()
      parseWithVModel('<span v-model="a + b" />', { onError })

      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          code: ErrorCodes.X_V_MODEL_MALFORMED_EXPRESSION,
        })
      )
    })

    test('allow unicode', () => {
      const onError = jest.fn()
      parseWithVModel('<span v-model="变.量" />', { onError })

      expect(onError).toHaveBeenCalledTimes(0)
    })

    test('used on scope variable', () => {
      const onError = jest.fn()
      parseWithVModel('<span v-for="i in list" v-model="i" />', {
        onError,
        prefixIdentifiers: true,
      })

      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          code: ErrorCodes.X_V_MODEL_ON_SCOPE_VARIABLE,
        })
      )
    })

    test('used on props', () => {
      const onError = jest.fn()
      parseWithVModel('<view v-model="p" />', {
        onError,
        bindingMetadata: {
          p: BindingTypes.PROPS,
        },
      })

      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          code: ErrorCodes.X_V_MODEL_ON_PROPS,
        })
      )
    })
  })
})
