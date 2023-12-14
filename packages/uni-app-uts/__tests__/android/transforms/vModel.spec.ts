import { extend } from '@vue/shared'
import {
  baseParse as parse,
  transform,
  ElementNode,
  CompilerOptions,
  ObjectExpression,
  PlainElementNode,
  ComponentNode,
  NodeTypes,
  VNodeCall,
  NORMALIZE_PROPS,
  BindingTypes,
  ForNode,
  ErrorCodes,
  transformElement,
  trackSlotScopes,
} from '@vue/compiler-core'
import { transformFor } from '../../../src/plugins/android/uvue/compiler/transforms/vFor'
import { transformExpression } from '../../../src/plugins/android/uvue/compiler/transforms/transformExpression'
import { transformModel } from '../../../src/plugins/android/uvue/compiler/transforms/vModel'
import { generate } from '../../../src/plugins/android/uvue/compiler/codegen'
import { CallExpression } from '@babel/types'
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
    })
  )

  return ast
}

describe('compiler: transform v-model', () => {
  test('simple expression', () => {
    assert(
      `<input v-model="model" />`,
      `createElementVNode("input", utsMapOf({
  modelValue: _ctx.model,
  onInput: ($event: InputEvent): any => {_ctx.model = $event.detail.value;
return $event.detail.value;}
}), null, 40 /* PROPS, NEED_HYDRATION */, ["modelValue", "onInput"])`
    )
  })

  // #2426
  test('simple expression (with multilines)', () => {
    assert(
      `<input v-model="\nmodel.\nfoo\n" />`,
      `createElementVNode("input", utsMapOf({
  modelValue: \n_ctx.model.
foo
,
  onInput: ($event: InputEvent): any => {
_ctx.model.
foo
 = $event.detail.value;
return $event.detail.value;}
}), null, 40 /* PROPS, NEED_HYDRATION */, ["modelValue", "onInput"])`
    )
  })

  test('compound expression', () => {
    assert(
      `<input v-model="model[index]" />`,
      `createElementVNode(\"input\", utsMapOf({
  modelValue: _ctx.model[_ctx.index],
  onInput: ($event: InputEvent): any => {_ctx.model[_ctx.index] = $event.detail.value;
return $event.detail.value;}
}), null, 40 /* PROPS, NEED_HYDRATION */, [\"modelValue\", \"onInput\"])`
    )
  })

  test('with argument', () => {
    assert(
      `<Foo v-model:title="model" />`,
      `createVNode(_component_Foo, utsMapOf({
  title: _ctx.model,
  "onUpdate:title": $event => {(_ctx.model) = $event}
}), null, 8 /* PROPS */, ["title", "onUpdate:title"])`
    )
  })

  test('with dynamic argument', () => {
    assert(
      `<Foo v-model:[value]="model" />`,
      `createVNode(_component_Foo, normalizeProps(utsMapOf({
  [_ctx.value]: _ctx.model,
  ["onUpdate:" + _ctx.value]: $event => {(_ctx.model) = $event}
})), null, 16 /* FULL_PROPS */)`
    )
  })
  test('with modifier lazy', () => {
    assert(
      `<input v-model.lazy="model" />`,
      `createElementVNode(\"input\", utsMapOf({
  modelValue: _ctx.model,
  onBlur: ($event: InputBlurEvent): any => {_ctx.model = $event.detail.value;
return $event.detail.value;}
}), null, 40 /* PROPS, NEED_HYDRATION */, [\"modelValue\", \"onBlur\"])`
    )
  })
  test('with modifier number', () => {
    assert(
      `<input v-model.number="model" />`,
      `createElementVNode(\"input\", utsMapOf({
  modelValue: _ctx.model,
  onInput: ($event: InputEvent): any => {_ctx.model = _looseToNumber($event.detail.value);
return _looseToNumber($event.detail.value);}
}), null, 40 /* PROPS, NEED_HYDRATION */, [\"modelValue\", \"onInput\"])`
    )
  })
  test('with modifier trim', () => {
    assert(
      `<input v-model.trim="model" />`,
      `createElementVNode(\"input\", utsMapOf({
  modelValue: _ctx.model,
  onInput: ($event: InputEvent): any => {_ctx.model = $event.detail.value.trim();
return $event.detail.value.trim();}
}), null, 40 /* PROPS, NEED_HYDRATION */, [\"modelValue\", \"onInput\"])`
    )
  })
  test('expression width type', () => {
    assert(
      `<Foo v-model="model as string" />`,
      `createVNode(_component_Foo, utsMapOf({
  modelValue: _ctx.model,
  "onUpdate:modelValue": ($event: string) => {(_ctx.model) = $event}
}), null, 8 /* PROPS */, [\"modelValue\", \"onUpdate:modelValue\"])`
    )
  })
  test('complex expressions wrapped in ()', () => {
    assert(
      `<my-input v-model="(obj.str as string)" />`,
      `createVNode(_component_my_input, utsMapOf({
  modelValue: (_ctx.obj.str),
  \"onUpdate:modelValue\": ($event: string) => {((_ctx.obj.str)) = $event}
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
          '($event: InputEvent): any => {',
          {
            content: 'model',
            isStatic: false,
          },
          ` = $event.detail.value;
return $event.detail.value;}`,
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
          '($event: InputEvent): any => {',
          {
            content: '_ctx.model',
            isStatic: false,
          },
          ` = $event.detail.value;
return $event.detail.value;}`,
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
          '($event: InputEvent): any => {',
          {
            content: '\n model\n.\nfoo \n',
            isStatic: false,
          },
          ` = $event.detail.value;
return $event.detail.value;}`,
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
          '($event: InputEvent): any => {',
          {
            content: 'model[index]',
            isStatic: false,
          },
          ` = $event.detail.value;
return $event.detail.value;}`,
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
          '($event: InputEvent): any => {',
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
          ` = $event.detail.value;
return $event.detail.value;}`,
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
          '$event => {(',
          {
            content: 'model',
            isStatic: false,
          },
          `) = $event}`,
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
                  '$event => {(',
                  {
                    content: '_ctx.model',
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
    const root = parseWithVModel('<div v-once><input v-model="foo" /></div>', {
      prefixIdentifiers: true,
      cacheHandlers: true,
    })
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
      parseWithVModel('<div v-model="p" />', {
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
