import { extend, PatchFlags } from '@vue/shared'
import {
  baseParse as parse,
  transform,
  ForNode,
  ForCodegenNode,
  CompilerOptions,
  NodeTypes,
  SimpleExpressionNode,
  ErrorCodes,
  ElementNode,
  InterpolationNode,
  ConstantTypes,
  transformElement,
} from '@vue/compiler-core'
import { transformIf } from '../../../src/plugins/android/uvue/compiler/transforms/vIf'
import { transformFor } from '../../../src/plugins/android/uvue/compiler/transforms/vFor'
import { transformSlotOutlet } from '../../../src/plugins/android/uvue/compiler/transforms/transformSlotOutlet'
import { transformExpression } from '../../../src/plugins/android/uvue/compiler/transforms/transformExpression'
import { transformBind } from '../../../src/plugins/android/uvue/compiler/transforms/vBind'
import { assert, createObjectMatcher, genFlagText } from '../testUtils'
import { generate } from '../../../src/plugins/android/uvue/compiler/codegen'
import {
  FRAGMENT,
  RENDER_LIST,
  RENDER_SLOT,
} from '../../../src/plugins/android/uvue/compiler/runtimeHelpers'

function parseWithForTransform(
  template: string,
  options: CompilerOptions = {}
) {
  const ast = parse(template, options)
  transform(
    ast,
    extend({}, options, {
      prefixIdentifiers: options.prefixIdentifiers,
      nodeTransforms: [
        transformIf,
        transformFor,
        transformExpression,
        transformSlotOutlet,
        transformElement,
        ...(options.nodeTransforms || []), // user transforms
      ],
      directiveTransforms: extend(
        {},
        { bind: transformBind },
        options.directiveTransforms || {} // user transforms
      ),
    })
  )
  return {
    root: ast,
    node: ast.children[0] as ForNode & { codegenNode: ForCodegenNode },
  }
}

describe('compiler: v-for', () => {
  test('number expression', () => {
    assert(
      `<text v-for="item in 10" :key="item" />`,
      `createElementVNode(Fragment, null, RenderHelpers.renderList(10, (item, _, _, _): VNode => {
  return createElementVNode("text", utsMapOf({ key: item }))
}), 64 /* STABLE_FRAGMENT */)`
    )
  })
  test('value', () => {
    assert(
      `<text v-for="(item) in items" />`,
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, (item, _, _, _): VNode => {
  return createElementVNode("text")
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('value and key', () => {
    assert(
      `<text v-for="(item, index) in [1,2,3]" :key="index" />`,
      `createElementVNode(Fragment, null, RenderHelpers.renderList([1,2,3], (item, index, _, _): VNode => {
  return createElementVNode("text", utsMapOf({ key: index }))
}), 64 /* STABLE_FRAGMENT */)`
    )
  })
  test('value, key and index', () => {
    assert(
      `<text v-for="(item, key, index) in {a:'a',b:'b'}" :key="index" />`,
      `createElementVNode(Fragment, null, RenderHelpers.renderList({a:'a',b:'b'}, (item, key, index, _): VNode => {
  return createElementVNode("text", utsMapOf({ key: index }))
}), 64 /* STABLE_FRAGMENT */)`
    )
  })
  test('array de-structured value', () => {
    assert(
      '<text v-for="([ id, value ]) in items" />',
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, ([ id, value ], _, _, _): VNode => {
  return createElementVNode(\"text\")
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('object de-structured value', () => {
    assert(
      '<text v-for="({ id, value }) in items" />',
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, ({ id, value }, _, _, _): VNode => {
  return createElementVNode("text")
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('skipped value', () => {
    assert(
      '<text v-for="(,key,index) in items" />',
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, (_, key, index, _): VNode => {
  return createElementVNode("text")
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('skipped key', () => {
    assert(
      '<text v-for="(value,,index) in items" />',
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, (value, _, index, _): VNode => {
  return createElementVNode("text")
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('skipped value & key', () => {
    assert(
      '<text v-for="(,,index) in items" />',
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, (_, _, index, _): VNode => {
  return createElementVNode("text")
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('skipped value and key', () => {
    assert(
      '<text v-for="(,,index) in items" />',
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, (_, _, index, _): VNode => {
  return createElementVNode("text")
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('unbracketed value', () => {
    assert(
      '<text v-for="item in items" />',
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, (item, _, _, _): VNode => {
  return createElementVNode(\"text\")
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('unbracketed value and key', () => {
    assert(
      '<text v-for="item, key in items" />',
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, (item, key, _, _): VNode => {
  return createElementVNode(\"text\")
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('unbracketed value and key', () => {
    assert(
      '<text v-for="value, key, index in items" />',
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, (value, key, index, _): VNode => {
  return createElementVNode(\"text\")
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('unbracketed skipped key', () => {
    assert(
      '<text v-for="value, , index in items" />',
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, (value, _, index, _): VNode => {
  return createElementVNode(\"text\")
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('unbracketed skipped value and key', () => {
    assert(
      '<text v-for=", , index in items" />',
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, (_, _, index, _): VNode => {
  return createElementVNode(\"text\")
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('source complex expression', () => {
    assert(
      '<text v-for="i in list.concat([foo])" />',
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.list.concat([_ctx.foo]), (i, _, _, _): VNode => {
  return createElementVNode(\"text\")
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('should not prefix v-for alias', () => {
    assert(
      '<text v-for="i in list">{{ i }}{{ j }}</text>',
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.list, (i, _, _, _): VNode => {
  return createElementVNode("text", null, toDisplayString(i) + toDisplayString(_ctx.j), 1 /* TEXT */)
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('should not prefix v-for aliases (multiple)', () => {
    assert(
      '<text v-for="(i, j, k) in list">{{ i + j + k }}{{ l }}</text>',
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.list, (i, j, k, _): VNode => {
  return createElementVNode("text", null, toDisplayString(i + j + k) + toDisplayString(_ctx.l), 1 /* TEXT */)
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('should prefix id outside of v-for', () => {
    assert(
      '<text><text v-for="i in list" />{{ i }}</text>',
      `createElementVNode("text", null, [
  createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.list, (i, _, _, _): VNode => {
    return createElementVNode("text")
  }), 256 /* UNKEYED_FRAGMENT */),
  toDisplayString(_ctx.i)
])`
    )
  })
  test('nested v-for', () => {
    assert(
      `<view v-for="i in list">
  <text v-for="i in list">{{ i + j }}</text>{{ i }}
</view>`,
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.list, (i, _, _, _): VNode => {
  return createElementVNode(\"view\", null, [
    createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.list, (i, _, _, _): VNode => {
      return createElementVNode(\"text\", null, toDisplayString(i + _ctx.j), 1 /* TEXT */)
    }), 256 /* UNKEYED_FRAGMENT */),
    toDisplayString(i)
  ])
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('v-for aliases w/ complex expressions', () => {
    assert(
      `<text v-for="({ foo = bar, baz: [qux = quux] }) in list">
  {{ foo + bar + baz + qux + quux }}
</text>`,
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.list, ({ foo = _ctx.bar, baz: [qux = _ctx.quux] }, _, _, _): VNode => {
  return createElementVNode(\"text\", null, toDisplayString(foo + _ctx.bar + _ctx.baz + qux + _ctx.quux), 1 /* TEXT */)
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('element v-for key expression prefixing', () => {
    assert(
      `<text v-for="item in items" :key="itemKey(item)">test</text>`,
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, (item, _, _, _): VNode => {
  return createElementVNode(\"text\", utsMapOf({
    key: _ctx.itemKey(item)
  }), \"test\")
}), 128 /* KEYED_FRAGMENT */)`
    )
  })
  test('template v-for key no prefixing on attribute key', () => {
    assert(
      `<template v-for="item in items" key="key">test</template>`,
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, (item, _, _, _): VNode => {
  return createElementVNode(Fragment, utsMapOf({ key: "key" }), [\"test\"], 64 /* STABLE_FRAGMENT */)
}), 128 /* KEYED_FRAGMENT */)`
    )
  })
  test('template v-for key injection with single child', () => {
    assert(
      `<template v-for="item in items" :key="item.id"><text :id="item.id" /></template>`,
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, (item, _, _, _): VNode => {
  return createElementVNode(\"text\", utsMapOf({
    key: item.id,
    id: item.id
  }), null, 8 /* PROPS */, [\"id\"])
}), 128 /* KEYED_FRAGMENT */)`
    )
  })
  test('v-for on <slot/>', () => {
    assert(
      `<slot v-for="item in items"></slot>`,
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, (item, _, _, _): VNode => {
  return renderSlot(_ctx.$slots, \"default\")
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('keyed v-for', () => {
    assert(
      `<text v-for="(item) in items" :key="item" />`,
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, (item, _, _, _): VNode => {
  return createElementVNode(\"text\", utsMapOf({ key: item }))
}), 128 /* KEYED_FRAGMENT */)`
    )
  })
  test('keyed template v-for', () => {
    assert(
      `<template v-for="(item) in items" :key="item"><text/></template>`,
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, (item, _, _, _): VNode => {
  return createElementVNode(\"text\", utsMapOf({ key: item }))
}), 128 /* KEYED_FRAGMENT */)`
    )
  })
  test('v-if + v-for', () => {
    assert(
      `<view v-if="ok" v-for="i in list"/>`,
      `isTrue(_ctx.ok)
  ? createElementVNode(Fragment, utsMapOf({ key: 0 }), RenderHelpers.renderList(_ctx.list, (i, _, _, _): VNode => {
      return createElementVNode(\"view\")
    }), 256 /* UNKEYED_FRAGMENT */)
  : createCommentVNode(\"v-if\", true)`
    )
  })
  test('v-if + v-for on <template>', () => {
    assert(
      `<template v-if="ok" v-for="i in list"/>`,
      `isTrue(_ctx.ok)
  ? createElementVNode(Fragment, utsMapOf({ key: 0 }), RenderHelpers.renderList(_ctx.list, (i, _, _, _): VNode => {
      return createElementVNode(Fragment, null, [], 64 /* STABLE_FRAGMENT */)
    }), 256 /* UNKEYED_FRAGMENT */)
  : createCommentVNode(\"v-if\", true)`
    )
  })
  test('v-for on element with custom directive', () => {
    assert(
      `<view v-for="i in list" v-foo/>`,
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.list, (i, _, _, _): VNode => {
  return withDirectives(createElementVNode(\"view\", null, null, 512 /* NEED_PATCH */), [
    [_directive_foo]
  ])
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  describe('transform', () => {
    test('number expression', () => {
      const { node: forNode } = parseWithForTransform(
        '<text v-for="index in 5" />'
      )
      expect(forNode.keyAlias).toBeUndefined()
      expect(forNode.objectIndexAlias).toBeUndefined()
      expect((forNode.valueAlias as SimpleExpressionNode).content).toBe('index')
      expect((forNode.source as SimpleExpressionNode).content).toBe('5')
    })

    test('value', () => {
      const { node: forNode } = parseWithForTransform(
        '<text v-for="(item) in items" />'
      )
      expect(forNode.keyAlias).toBeUndefined()
      expect(forNode.objectIndexAlias).toBeUndefined()
      expect((forNode.valueAlias as SimpleExpressionNode).content).toBe('item')
      expect((forNode.source as SimpleExpressionNode).content).toBe('items')
    })

    test('object de-structured value', () => {
      const { node: forNode } = parseWithForTransform(
        '<text v-for="({ id, value }) in items" />'
      )
      expect(forNode.keyAlias).toBeUndefined()
      expect(forNode.objectIndexAlias).toBeUndefined()
      expect((forNode.valueAlias as SimpleExpressionNode).content).toBe(
        '{ id, value }'
      )
      expect((forNode.source as SimpleExpressionNode).content).toBe('items')
    })

    test('array de-structured value', () => {
      const { node: forNode } = parseWithForTransform(
        '<text v-for="([ id, value ]) in items" />'
      )
      expect(forNode.keyAlias).toBeUndefined()
      expect(forNode.objectIndexAlias).toBeUndefined()
      expect((forNode.valueAlias as SimpleExpressionNode).content).toBe(
        '[ id, value ]'
      )
      expect((forNode.source as SimpleExpressionNode).content).toBe('items')
    })

    test('value and key', () => {
      const { node: forNode } = parseWithForTransform(
        '<text v-for="(item, key) in items" />'
      )
      expect(forNode.keyAlias).not.toBeUndefined()
      expect((forNode.keyAlias as SimpleExpressionNode).content).toBe('key')
      expect(forNode.objectIndexAlias).toBeUndefined()
      expect((forNode.valueAlias as SimpleExpressionNode).content).toBe('item')
      expect((forNode.source as SimpleExpressionNode).content).toBe('items')
    })

    test('value, key and index', () => {
      const { node: forNode } = parseWithForTransform(
        '<text v-for="(value, key, index) in items" />'
      )
      expect(forNode.keyAlias).not.toBeUndefined()
      expect((forNode.keyAlias as SimpleExpressionNode).content).toBe('key')
      expect(forNode.objectIndexAlias).not.toBeUndefined()
      expect((forNode.objectIndexAlias as SimpleExpressionNode).content).toBe(
        'index'
      )
      expect((forNode.valueAlias as SimpleExpressionNode).content).toBe('value')
      expect((forNode.source as SimpleExpressionNode).content).toBe('items')
    })

    test('skipped key', () => {
      const { node: forNode } = parseWithForTransform(
        '<text v-for="(value,,index) in items" />'
      )
      expect(forNode.keyAlias).toBeUndefined()
      expect(forNode.objectIndexAlias).not.toBeUndefined()
      expect((forNode.objectIndexAlias as SimpleExpressionNode).content).toBe(
        'index'
      )
      expect((forNode.valueAlias as SimpleExpressionNode).content).toBe('value')
      expect((forNode.source as SimpleExpressionNode).content).toBe('items')
    })

    test('skipped value and key', () => {
      const { node: forNode } = parseWithForTransform(
        '<text v-for="(,,index) in items" />'
      )
      expect(forNode.keyAlias).toBeUndefined()
      expect(forNode.objectIndexAlias).not.toBeUndefined()
      expect((forNode.objectIndexAlias as SimpleExpressionNode).content).toBe(
        'index'
      )
      expect(forNode.valueAlias).toBeUndefined()
      expect((forNode.source as SimpleExpressionNode).content).toBe('items')
    })

    test('unbracketed value', () => {
      const { node: forNode } = parseWithForTransform(
        '<text v-for="item in items" />'
      )
      expect(forNode.keyAlias).toBeUndefined()
      expect(forNode.objectIndexAlias).toBeUndefined()
      expect((forNode.valueAlias as SimpleExpressionNode).content).toBe('item')
      expect((forNode.source as SimpleExpressionNode).content).toBe('items')
    })

    test('unbracketed value and key', () => {
      const { node: forNode } = parseWithForTransform(
        '<text v-for="item, key in items" />'
      )
      expect(forNode.keyAlias).not.toBeUndefined()
      expect((forNode.keyAlias as SimpleExpressionNode).content).toBe('key')
      expect(forNode.objectIndexAlias).toBeUndefined()
      expect((forNode.valueAlias as SimpleExpressionNode).content).toBe('item')
      expect((forNode.source as SimpleExpressionNode).content).toBe('items')
    })

    test('unbracketed value, key and index', () => {
      const { node: forNode } = parseWithForTransform(
        '<text v-for="value, key, index in items" />'
      )
      expect(forNode.keyAlias).not.toBeUndefined()
      expect((forNode.keyAlias as SimpleExpressionNode).content).toBe('key')
      expect(forNode.objectIndexAlias).not.toBeUndefined()
      expect((forNode.objectIndexAlias as SimpleExpressionNode).content).toBe(
        'index'
      )
      expect((forNode.valueAlias as SimpleExpressionNode).content).toBe('value')
      expect((forNode.source as SimpleExpressionNode).content).toBe('items')
    })

    test('unbracketed skipped key', () => {
      const { node: forNode } = parseWithForTransform(
        '<text v-for="value, , index in items" />'
      )
      expect(forNode.keyAlias).toBeUndefined()
      expect(forNode.objectIndexAlias).not.toBeUndefined()
      expect((forNode.objectIndexAlias as SimpleExpressionNode).content).toBe(
        'index'
      )
      expect((forNode.valueAlias as SimpleExpressionNode).content).toBe('value')
      expect((forNode.source as SimpleExpressionNode).content).toBe('items')
    })

    test('unbracketed skipped value and key', () => {
      const { node: forNode } = parseWithForTransform(
        '<text v-for=", , index in items" />'
      )
      expect(forNode.keyAlias).toBeUndefined()
      expect(forNode.objectIndexAlias).not.toBeUndefined()
      expect((forNode.objectIndexAlias as SimpleExpressionNode).content).toBe(
        'index'
      )
      expect(forNode.valueAlias).toBeUndefined()
      expect((forNode.source as SimpleExpressionNode).content).toBe('items')
    })
  })

  describe('errors', () => {
    test('missing expression', () => {
      const onError = jest.fn()
      parseWithForTransform('<text v-for />', { onError })

      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          code: ErrorCodes.X_V_FOR_NO_EXPRESSION,
        })
      )
    })

    test('empty expression', () => {
      const onError = jest.fn()
      parseWithForTransform('<text v-for="" />', { onError })

      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          code: ErrorCodes.X_V_FOR_MALFORMED_EXPRESSION,
        })
      )
    })

    test('invalid expression', () => {
      const onError = jest.fn()
      parseWithForTransform('<text v-for="items" />', { onError })

      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          code: ErrorCodes.X_V_FOR_MALFORMED_EXPRESSION,
        })
      )
    })

    test('missing source', () => {
      const onError = jest.fn()
      parseWithForTransform('<text v-for="item in" />', { onError })

      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          code: ErrorCodes.X_V_FOR_MALFORMED_EXPRESSION,
        })
      )
    })

    test('missing value', () => {
      const onError = jest.fn()
      parseWithForTransform('<text v-for="in items" />', { onError })

      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          code: ErrorCodes.X_V_FOR_MALFORMED_EXPRESSION,
        })
      )
    })

    test('<template v-for> key placement', () => {
      const onError = jest.fn()
      parseWithForTransform(
        `
      <template v-for="item in items">
        <view :key="item.id"/>
      </template>`,
        { onError }
      )

      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          code: ErrorCodes.X_V_FOR_TEMPLATE_KEY_PLACEMENT,
        })
      )

      // should not warn on nested v-for keys
      parseWithForTransform(
        `
      <template v-for="item in items">
        <view v-for="c in item.children" :key="c.id"/>
      </template>`,
        { onError }
      )
      expect(onError).toHaveBeenCalledTimes(1)
    })
  })

  describe('source location', () => {
    test('value & source', () => {
      const source = '<text v-for="item in items" />'
      const { node: forNode } = parseWithForTransform(source)

      const itemOffset = source.indexOf('item')
      const value = forNode.valueAlias as SimpleExpressionNode
      expect((forNode.valueAlias as SimpleExpressionNode).content).toBe('item')
      expect(value.loc.start.offset).toBe(itemOffset)
      expect(value.loc.start.line).toBe(1)
      expect(value.loc.start.column).toBe(itemOffset + 1)
      expect(value.loc.end.line).toBe(1)
      expect(value.loc.end.column).toBe(itemOffset + 1 + `item`.length)

      const itemsOffset = source.indexOf('items')
      expect((forNode.source as SimpleExpressionNode).content).toBe('items')
      expect(forNode.source.loc.start.offset).toBe(itemsOffset)
      expect(forNode.source.loc.start.line).toBe(1)
      expect(forNode.source.loc.start.column).toBe(itemsOffset + 1)
      expect(forNode.source.loc.end.line).toBe(1)
      expect(forNode.source.loc.end.column).toBe(
        itemsOffset + 1 + `items`.length
      )
    })

    test('bracketed value', () => {
      const source = '<text v-for="( item ) in items" />'
      const { node: forNode } = parseWithForTransform(source)

      const itemOffset = source.indexOf('item')
      const value = forNode.valueAlias as SimpleExpressionNode
      expect(value.content).toBe('item')
      expect(value.loc.start.offset).toBe(itemOffset)
      expect(value.loc.start.line).toBe(1)
      expect(value.loc.start.column).toBe(itemOffset + 1)
      expect(value.loc.end.line).toBe(1)
      expect(value.loc.end.column).toBe(itemOffset + 1 + `item`.length)

      const itemsOffset = source.indexOf('items')
      expect((forNode.source as SimpleExpressionNode).content).toBe('items')
      expect(forNode.source.loc.start.offset).toBe(itemsOffset)
      expect(forNode.source.loc.start.line).toBe(1)
      expect(forNode.source.loc.start.column).toBe(itemsOffset + 1)
      expect(forNode.source.loc.end.line).toBe(1)
      expect(forNode.source.loc.end.column).toBe(
        itemsOffset + 1 + `items`.length
      )
    })

    test('de-structured value', () => {
      const source = '<text v-for="(  { id, key }) in items" />'
      const { node: forNode } = parseWithForTransform(source)

      const value = forNode.valueAlias as SimpleExpressionNode
      const valueIndex = source.indexOf('{ id, key }')
      expect(value.content).toBe('{ id, key }')
      expect(value.loc.start.offset).toBe(valueIndex)
      expect(value.loc.start.line).toBe(1)
      expect(value.loc.start.column).toBe(valueIndex + 1)
      expect(value.loc.end.line).toBe(1)
      expect(value.loc.end.column).toBe(valueIndex + 1 + '{ id, key }'.length)

      const itemsOffset = source.indexOf('items')
      expect((forNode.source as SimpleExpressionNode).content).toBe('items')
      expect(forNode.source.loc.start.offset).toBe(itemsOffset)
      expect(forNode.source.loc.start.line).toBe(1)
      expect(forNode.source.loc.start.column).toBe(itemsOffset + 1)
      expect(forNode.source.loc.end.line).toBe(1)
      expect(forNode.source.loc.end.column).toBe(
        itemsOffset + 1 + `items`.length
      )
    })

    test('bracketed value, key, index', () => {
      const source = '<text v-for="( item, key, index ) in items" />'
      const { node: forNode } = parseWithForTransform(source)

      const itemOffset = source.indexOf('item')
      const value = forNode.valueAlias as SimpleExpressionNode
      expect(value.content).toBe('item')
      expect(value.loc.start.offset).toBe(itemOffset)
      expect(value.loc.start.line).toBe(1)
      expect(value.loc.start.column).toBe(itemOffset + 1)
      expect(value.loc.end.line).toBe(1)
      expect(value.loc.end.column).toBe(itemOffset + 1 + `item`.length)

      const keyOffset = source.indexOf('key')
      const key = forNode.keyAlias as SimpleExpressionNode
      expect(key.content).toBe('key')
      expect(key.loc.start.offset).toBe(keyOffset)
      expect(key.loc.start.line).toBe(1)
      expect(key.loc.start.column).toBe(keyOffset + 1)
      expect(key.loc.end.line).toBe(1)
      expect(key.loc.end.column).toBe(keyOffset + 1 + `key`.length)

      const indexOffset = source.indexOf('index')
      const index = forNode.objectIndexAlias as SimpleExpressionNode
      expect(index.content).toBe('index')
      expect(index.loc.start.offset).toBe(indexOffset)
      expect(index.loc.start.line).toBe(1)
      expect(index.loc.start.column).toBe(indexOffset + 1)
      expect(index.loc.end.line).toBe(1)
      expect(index.loc.end.column).toBe(indexOffset + 1 + `index`.length)

      const itemsOffset = source.indexOf('items')
      expect((forNode.source as SimpleExpressionNode).content).toBe('items')
      expect(forNode.source.loc.start.offset).toBe(itemsOffset)
      expect(forNode.source.loc.start.line).toBe(1)
      expect(forNode.source.loc.start.column).toBe(itemsOffset + 1)
      expect(forNode.source.loc.end.line).toBe(1)
      expect(forNode.source.loc.end.column).toBe(
        itemsOffset + 1 + `items`.length
      )
    })

    test('skipped key', () => {
      const source = '<text v-for="( item,, index ) in items" />'
      const { node: forNode } = parseWithForTransform(source)

      const itemOffset = source.indexOf('item')
      const value = forNode.valueAlias as SimpleExpressionNode
      expect(value.content).toBe('item')
      expect(value.loc.start.offset).toBe(itemOffset)
      expect(value.loc.start.line).toBe(1)
      expect(value.loc.start.column).toBe(itemOffset + 1)
      expect(value.loc.end.line).toBe(1)
      expect(value.loc.end.column).toBe(itemOffset + 1 + `item`.length)

      const indexOffset = source.indexOf('index')
      const index = forNode.objectIndexAlias as SimpleExpressionNode
      expect(index.content).toBe('index')
      expect(index.loc.start.offset).toBe(indexOffset)
      expect(index.loc.start.line).toBe(1)
      expect(index.loc.start.column).toBe(indexOffset + 1)
      expect(index.loc.end.line).toBe(1)
      expect(index.loc.end.column).toBe(indexOffset + 1 + `index`.length)

      const itemsOffset = source.indexOf('items')
      expect((forNode.source as SimpleExpressionNode).content).toBe('items')
      expect(forNode.source.loc.start.offset).toBe(itemsOffset)
      expect(forNode.source.loc.start.line).toBe(1)
      expect(forNode.source.loc.start.column).toBe(itemsOffset + 1)
      expect(forNode.source.loc.end.line).toBe(1)
      expect(forNode.source.loc.end.column).toBe(
        itemsOffset + 1 + `items`.length
      )
    })
  })

  describe('prefixIdentifiers: true', () => {
    test('should prefix v-for source', () => {
      const { node } = parseWithForTransform(`<view v-for="i in list"/>`, {
        prefixIdentifiers: true,
      })
      expect(node.source).toMatchObject({
        type: NodeTypes.SIMPLE_EXPRESSION,
        content: `_ctx.list`,
      })
    })

    test('should prefix v-for source w/ complex expression', () => {
      const { node } = parseWithForTransform(
        `<view v-for="i in list.concat([foo])"/>`,
        { prefixIdentifiers: true }
      )
      expect(node.source).toMatchObject({
        type: NodeTypes.COMPOUND_EXPRESSION,
        children: [
          { content: `_ctx.list` },
          `.`,
          { content: `concat` },
          `([`,
          { content: `_ctx.foo` },
          `])`,
        ],
      })
    })

    test('should not prefix v-for alias', () => {
      const { node } = parseWithForTransform(
        `<view v-for="i in list">{{ i }}{{ j }}</view>`,
        { prefixIdentifiers: true }
      )
      const view = node.children[0] as ElementNode
      expect((view.children[0] as InterpolationNode).content).toMatchObject({
        type: NodeTypes.SIMPLE_EXPRESSION,
        content: `i`,
      })
      expect((view.children[1] as InterpolationNode).content).toMatchObject({
        type: NodeTypes.SIMPLE_EXPRESSION,
        content: `_ctx.j`,
      })
    })

    test('should not prefix v-for aliases (multiple)', () => {
      const { node } = parseWithForTransform(
        `<view v-for="(i, j, k) in list">{{ i + j + k }}{{ l }}</view>`,
        { prefixIdentifiers: true }
      )
      const view = node.children[0] as ElementNode
      expect((view.children[0] as InterpolationNode).content).toMatchObject({
        type: NodeTypes.COMPOUND_EXPRESSION,
        children: [
          { content: `i` },
          ` + `,
          { content: `j` },
          ` + `,
          { content: `k` },
        ],
      })
      expect((view.children[1] as InterpolationNode).content).toMatchObject({
        type: NodeTypes.SIMPLE_EXPRESSION,
        content: `_ctx.l`,
      })
    })

    test('should prefix id outside of v-for', () => {
      const { node } = parseWithForTransform(
        `<view><view v-for="i in list" />{{ i }}</view>`,
        { prefixIdentifiers: true }
      )
      expect((node.children[1] as InterpolationNode).content).toMatchObject({
        type: NodeTypes.SIMPLE_EXPRESSION,
        content: `_ctx.i`,
      })
    })

    test('nested v-for', () => {
      const { node } = parseWithForTransform(
        `<view v-for="i in list">
              <view v-for="i in list">{{ i + j }}</view>{{ i }}
            </view>`,
        { prefixIdentifiers: true }
      )
      const outerView = node.children[0] as ElementNode
      const innerFor = outerView.children[0] as ForNode
      const innerExp = (innerFor.children[0] as ElementNode)
        .children[0] as InterpolationNode
      expect(innerExp.content).toMatchObject({
        type: NodeTypes.COMPOUND_EXPRESSION,
        children: [{ content: 'i' }, ` + `, { content: `_ctx.j` }],
      })

      // when an inner v-for shadows a variable of an outer v-for and exit,
      // it should not cause the outer v-for's alias to be removed from known ids
      const outerExp = outerView.children[1] as InterpolationNode
      expect(outerExp.content).toMatchObject({
        type: NodeTypes.SIMPLE_EXPRESSION,
        content: `i`,
      })
    })

    test('v-for aliases w/ complex expressions', () => {
      const { node } = parseWithForTransform(
        `<view v-for="({ foo = bar, baz: [qux = quux] }) in list">
              {{ foo + bar + baz + qux + quux }}
            </view>`,
        { prefixIdentifiers: true }
      )
      expect(node.valueAlias!).toMatchObject({
        type: NodeTypes.COMPOUND_EXPRESSION,
        children: [
          `{ `,
          { content: `foo` },
          ` = `,
          { content: `_ctx.bar` },
          `, baz: [`,
          { content: `qux` },
          ` = `,
          { content: `_ctx.quux` },
          `] }`,
        ],
      })
      const view = node.children[0] as ElementNode
      expect((view.children[0] as InterpolationNode).content).toMatchObject({
        type: NodeTypes.COMPOUND_EXPRESSION,
        children: [
          { content: `foo` },
          ` + `,
          { content: `_ctx.bar` },
          ` + `,
          { content: `_ctx.baz` },
          ` + `,
          { content: `qux` },
          ` + `,
          { content: `_ctx.quux` },
        ],
      })
    })

    test('element v-for key expression prefixing', () => {
      const {
        node: { codegenNode },
      } = parseWithForTransform(
        '<view v-for="item in items" :key="itemKey(item)">test</view>',
        { prefixIdentifiers: true }
      )
      const innerBlock = codegenNode.children.arguments[1].returns
      expect(innerBlock).toMatchObject({
        type: NodeTypes.VNODE_CALL,
        tag: `"view"`,
        props: createObjectMatcher({
          key: {
            type: NodeTypes.COMPOUND_EXPRESSION,
            children: [
              // should prefix outer scope references
              { content: `_ctx.itemKey` },
              `(`,
              // should NOT prefix in scope variables
              { content: `item` },
              `)`,
            ],
          },
        }),
      })
    })

    // #2085
    test('template v-for key expression prefixing', () => {
      const {
        node: { codegenNode },
      } = parseWithForTransform(
        '<template v-for="item in items" :key="itemKey(item)">test</template>',
        { prefixIdentifiers: true }
      )
      const innerBlock = codegenNode.children.arguments[1].returns
      expect(innerBlock).toMatchObject({
        type: NodeTypes.VNODE_CALL,
        tag: FRAGMENT,
        props: createObjectMatcher({
          key: {
            type: NodeTypes.COMPOUND_EXPRESSION,
            children: [
              // should prefix outer scope references
              { content: `_ctx.itemKey` },
              `(`,
              // should NOT prefix in scope variables
              { content: `item` },
              `)`,
            ],
          },
        }),
      })
    })

    test('template v-for key no prefixing on attribute key', () => {
      const {
        node: { codegenNode },
      } = parseWithForTransform(
        '<template v-for="item in items" key="key">test</template>',
        { prefixIdentifiers: true }
      )
      const innerBlock = codegenNode.children.arguments[1].returns
      expect(innerBlock).toMatchObject({
        type: NodeTypes.VNODE_CALL,
        tag: FRAGMENT,
        props: createObjectMatcher({
          key: {
            type: NodeTypes.SIMPLE_EXPRESSION,
            content: 'key',
          },
        }),
      })
    })
  })

  describe('codegen', () => {
    function assertSharedCodegen(
      node: ForCodegenNode,
      keyed: boolean = false,
      customReturn: boolean = false,
      disableTracking: boolean = true
    ) {
      expect(node).toMatchObject({
        type: NodeTypes.VNODE_CALL,
        tag: FRAGMENT,
        disableTracking,
        patchFlag: !disableTracking
          ? genFlagText(PatchFlags.STABLE_FRAGMENT)
          : keyed
          ? genFlagText(PatchFlags.KEYED_FRAGMENT)
          : genFlagText(PatchFlags.UNKEYED_FRAGMENT),
        children: {
          type: NodeTypes.JS_CALL_EXPRESSION,
          callee: RENDER_LIST,
          arguments: [
            {}, // to be asserted by each test
            {
              type: NodeTypes.JS_FUNCTION_EXPRESSION,
              returns: customReturn
                ? {}
                : {
                    type: NodeTypes.VNODE_CALL,
                    isBlock: disableTracking,
                  },
            },
          ],
        },
      })
      const renderListArgs = node.children.arguments
      return {
        source: renderListArgs[0] as SimpleExpressionNode,
        params: (renderListArgs[1] as any).params,
        returns: (renderListArgs[1] as any).returns,
        innerVNodeCall: customReturn
          ? null
          : (renderListArgs[1] as any).returns,
      }
    }

    test('basic v-for', () => {
      const {
        root,
        node: { codegenNode },
      } = parseWithForTransform('<text v-for="(item) in items" />')
      expect(assertSharedCodegen(codegenNode)).toMatchObject({
        source: { content: `items` },
        params: [
          { content: `item` },
          { content: `_` },
          { content: `_` },
          { content: `_` },
        ],
        innerVNodeCall: {
          tag: `"text"`,
        },
      })
      expect(generate(root, {} as any).code).toMatchSnapshot()
    })

    test('value + key + index', () => {
      const {
        root,
        node: { codegenNode },
      } = parseWithForTransform('<text v-for="(item, key, index) in items" />')
      expect(assertSharedCodegen(codegenNode)).toMatchObject({
        source: { content: `items` },
        params: [
          { content: `item` },
          { content: `key` },
          { content: `index` },
          { content: `_` },
        ],
      })
      expect(generate(root, {} as any).code).toMatchSnapshot()
    })

    test('skipped value', () => {
      const {
        root,
        node: { codegenNode },
      } = parseWithForTransform('<text v-for="(, key, index) in items" />')
      expect(assertSharedCodegen(codegenNode)).toMatchObject({
        source: { content: `items` },
        params: [
          { content: `_` },
          { content: `key` },
          { content: `index` },
          { content: `_` },
        ],
      })
      expect(generate(root, {} as any).code).toMatchSnapshot()
    })

    test('skipped key', () => {
      const {
        root,
        node: { codegenNode },
      } = parseWithForTransform('<text v-for="(item,,index) in items" />')
      expect(assertSharedCodegen(codegenNode)).toMatchObject({
        source: { content: `items` },
        params: [
          { content: `item` },
          { content: `_` },
          { content: `index` },
          { content: `_` },
        ],
      })
      expect(generate(root, {} as any).code).toMatchSnapshot()
    })

    test('skipped value & key', () => {
      const {
        root,
        node: { codegenNode },
      } = parseWithForTransform('<text v-for="(,,index) in items" />')
      expect(assertSharedCodegen(codegenNode)).toMatchObject({
        source: { content: `items` },
        params: [
          { content: `_` },
          { content: `_` },
          { content: `index` },
          { content: `_` },
        ],
      })
      expect(generate(root, {} as any).code).toMatchSnapshot()
    })

    test('v-for with constant expression', () => {
      const {
        root,
        node: { codegenNode },
      } = parseWithForTransform('<p v-for="item in 10">{{item}}</p>', {
        prefixIdentifiers: true,
      })

      expect(
        assertSharedCodegen(
          codegenNode,
          false /* keyed */,
          false /* customReturn */,
          false /* disableTracking */
        )
      ).toMatchObject({
        source: { content: `10`, constType: ConstantTypes.CAN_STRINGIFY },
        params: [
          { content: `item` },
          { content: `_` },
          { content: `_` },
          { content: `_` },
        ],
        innerVNodeCall: {
          tag: `"p"`,
          props: undefined,
          isBlock: false,
          children: {
            type: NodeTypes.INTERPOLATION,
            content: {
              type: NodeTypes.SIMPLE_EXPRESSION,
              content: 'item',
              isStatic: false,
              constType: ConstantTypes.NOT_CONSTANT,
            },
          },
          patchFlag: genFlagText(PatchFlags.TEXT),
        },
      })
      expect(generate(root, {} as any).code).toMatchSnapshot()
    })

    test('template v-for', () => {
      const {
        root,
        node: { codegenNode },
      } = parseWithForTransform(
        '<template v-for="item in items">hello<text/></template>'
      )
      expect(assertSharedCodegen(codegenNode)).toMatchObject({
        source: { content: `items` },
        params: [
          { content: `item` },
          { content: `_` },
          { content: `_` },
          { content: `_` },
        ],
        innerVNodeCall: {
          tag: FRAGMENT,
          props: undefined,
          isBlock: true,
          children: [
            { type: NodeTypes.TEXT, content: `hello` },
            { type: NodeTypes.ELEMENT, tag: `text` },
          ],
          patchFlag: genFlagText(PatchFlags.STABLE_FRAGMENT),
        },
      })
      expect(generate(root, {} as any).code).toMatchSnapshot()
    })

    test('template v-for w/ <slot/>', () => {
      const {
        root,
        node: { codegenNode },
      } = parseWithForTransform(
        '<template v-for="item in items"><slot/></template>'
      )
      expect(
        assertSharedCodegen(codegenNode, false, true /* custom return */)
      ).toMatchObject({
        source: { content: `items` },
        params: [
          { content: `item` },
          { content: `_` },
          { content: `_` },
          { content: `_` },
        ],
        returns: {
          type: NodeTypes.JS_CALL_EXPRESSION,
          callee: RENDER_SLOT,
        },
      })
      expect(generate(root, {} as any).code).toMatchSnapshot()
    })

    // #1907
    test('template v-for key injection with single child', () => {
      const {
        root,
        node: { codegenNode },
      } = parseWithForTransform(
        '<template v-for="item in items" :key="item.id"><text :id="item.id" /></template>'
      )
      expect(assertSharedCodegen(codegenNode, true)).toMatchObject({
        source: { content: `items` },
        params: [
          { content: `item` },
          { content: `_` },
          { content: `_` },
          { content: `_` },
        ],
        innerVNodeCall: {
          type: NodeTypes.VNODE_CALL,
          tag: `"text"`,
          props: createObjectMatcher({
            key: '[item.id]',
            id: '[item.id]',
          }),
        },
      })
      expect(generate(root, {} as any).code).toMatchSnapshot()
    })

    test('v-for on <slot/>', () => {
      const {
        root,
        node: { codegenNode },
      } = parseWithForTransform('<slot v-for="item in items"></slot>')
      expect(
        assertSharedCodegen(codegenNode, false, true /* custom return */)
      ).toMatchObject({
        source: { content: `items` },
        params: [
          { content: `item` },
          { content: `_` },
          { content: `_` },
          { content: `_` },
        ],
        returns: {
          type: NodeTypes.JS_CALL_EXPRESSION,
          callee: RENDER_SLOT,
        },
      })
      expect(generate(root, {} as any).code).toMatchSnapshot()
    })

    test('keyed v-for', () => {
      const {
        root,
        node: { codegenNode },
      } = parseWithForTransform('<text v-for="(item) in items" :key="item" />')
      expect(assertSharedCodegen(codegenNode, true)).toMatchObject({
        source: { content: `items` },
        params: [
          { content: `item` },
          { content: `_` },
          { content: `_` },
          { content: `_` },
        ],
        innerVNodeCall: {
          tag: `"text"`,
          props: createObjectMatcher({
            key: `[item]`,
          }),
        },
      })
      expect(generate(root, {} as any).code).toMatchSnapshot()
    })

    test('keyed template v-for', () => {
      const {
        root,
        node: { codegenNode },
      } = parseWithForTransform(
        '<template v-for="item in items" :key="item">hello<text/></template>'
      )
      expect(assertSharedCodegen(codegenNode, true)).toMatchObject({
        source: { content: `items` },
        params: [
          { content: `item` },
          { content: `_` },
          { content: `_` },
          { content: `_` },
        ],
        innerVNodeCall: {
          tag: FRAGMENT,
          props: createObjectMatcher({
            key: `[item]`,
          }),
          children: [
            { type: NodeTypes.TEXT, content: `hello` },
            { type: NodeTypes.ELEMENT, tag: `text` },
          ],
          patchFlag: genFlagText(PatchFlags.STABLE_FRAGMENT),
        },
      })
      expect(generate(root, {} as any).code).toMatchSnapshot()
    })

    test('v-if + v-for', () => {
      const {
        root,
        node: { codegenNode },
      } = parseWithForTransform(`<view v-if="ok" v-for="i in list"/>`)
      expect(codegenNode).toMatchObject({
        type: NodeTypes.JS_CONDITIONAL_EXPRESSION,
        test: { content: `ok` },
        consequent: {
          type: NodeTypes.VNODE_CALL,
          props: createObjectMatcher({
            key: `[0]`,
          }),
          isBlock: true,
          disableTracking: true,
          patchFlag: genFlagText(PatchFlags.UNKEYED_FRAGMENT),
          children: {
            type: NodeTypes.JS_CALL_EXPRESSION,
            callee: RENDER_LIST,
            arguments: [
              { content: `list` },
              {
                type: NodeTypes.JS_FUNCTION_EXPRESSION,
                params: [
                  { content: `i` },
                  { content: `_` },
                  { content: `_` },
                  { content: `_` },
                ],
                returns: {
                  type: NodeTypes.VNODE_CALL,
                  tag: `"view"`,
                  isBlock: true,
                },
              },
            ],
          },
        },
      })
      expect(generate(root, {} as any).code).toMatchSnapshot()
    })

    // 1637
    test('v-if + v-for on <template>', () => {
      const {
        root,
        node: { codegenNode },
      } = parseWithForTransform(`<template v-if="ok" v-for="i in list"/>`)
      expect(codegenNode).toMatchObject({
        type: NodeTypes.JS_CONDITIONAL_EXPRESSION,
        test: { content: `ok` },
        consequent: {
          type: NodeTypes.VNODE_CALL,
          props: createObjectMatcher({
            key: `[0]`,
          }),
          isBlock: true,
          disableTracking: true,
          patchFlag: genFlagText(PatchFlags.UNKEYED_FRAGMENT),
          children: {
            type: NodeTypes.JS_CALL_EXPRESSION,
            callee: RENDER_LIST,
            arguments: [
              { content: `list` },
              {
                type: NodeTypes.JS_FUNCTION_EXPRESSION,
                params: [
                  { content: `i` },
                  { content: `_` },
                  { content: `_` },
                  { content: `_` },
                ],
                returns: {
                  type: NodeTypes.VNODE_CALL,
                  tag: FRAGMENT,
                  isBlock: true,
                },
              },
            ],
          },
        },
      })
      expect(generate(root, {} as any).code).toMatchSnapshot()
    })

    test('v-for on element with custom directive', () => {
      const {
        root,
        node: { codegenNode },
      } = parseWithForTransform('<view v-for="i in list" v-foo/>')
      const { returns } = assertSharedCodegen(codegenNode, false, true)
      expect(returns).toMatchObject({
        type: NodeTypes.VNODE_CALL,
        directives: { type: NodeTypes.JS_ARRAY_EXPRESSION },
      })
      expect(generate(root, {} as any).code).toMatchSnapshot()
    })
  })
})
