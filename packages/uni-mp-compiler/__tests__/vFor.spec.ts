import {
  type ElementNode,
  ErrorCodes,
  type InterpolationNode,
  NodeTypes,
  type SimpleExpressionNode,
} from '@vue/compiler-core'
import { compile } from '../src'
import type { CompilerOptions } from '../src/options'
import type { ForElementNode } from '../src/transforms/vFor'
import { assert } from './testUtils'

function parseWithForTransform(
  template: string,
  options: CompilerOptions = {}
) {
  const { ast } = compile(template, {
    generatorOpts: {
      concise: true,
    },
    ...options,
  })

  return {
    root: ast,
    node: ast.children[0] as ForElementNode,
  }
}

describe(`compiler: v-for`, () => {
  describe(`codegen`, () => {
    test(`number expression`, () => {
      assert(
        `<view v-for="index in 5" />`,
        `<view wx:for="{{a}}" wx:for-item="index" wx:for-index="i0"/>`,
        `(_ctx, _cache) => {
  return { a: _f(5, (index, k0, i0) => { return {}; }) }
}`
      )
      assert(
        `<view v-for="index of 5" />`,
        `<view wx:for="{{a}}" wx:for-item="index" wx:for-index="i0"/>`,
        `(_ctx, _cache) => {
  return { a: _f(5, (index, k0, i0) => { return {}; }) }
}`
      )
    })
    test(`value`, () => {
      assert(
        `<view v-for="(item) in items" />`,
        `<view wx:for="{{a}}" wx:for-item="item"/>`,
        `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return {}; }) }
}`
      )
    })
    test('object de-structured value', () => {
      assert(
        `<view v-for="({ id, value }) in items" />`,
        `<view wx:for="{{a}}" wx:for-item="v0"/>`,
        `(_ctx, _cache) => {
  return { a: _f(_ctx.items, ({ id, value }, k0, i0) => { return {}; }) }
}`
      )
    })
    test('array de-structured value', () => {
      assert(
        `<view v-for="([ id, value ]) in items" />`,
        `<view wx:for="{{a}}" wx:for-item="v0"/>`,
        `(_ctx, _cache) => {
  return { a: _f(_ctx.items, ([id, value], k0, i0) => { return {}; }) }
}`
      )
    })
    test(`value and key`, () => {
      assert(
        `<view v-for="(item, key) in items" />`,
        `<view wx:for="{{a}}" wx:for-item="item"/>`,
        `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, key, i0) => { return {}; }) }
}`
      )
    })
    test(`value, key and index`, () => {
      assert(
        `<view v-for="(item, key, index) in items" />`,
        `<view wx:for="{{a}}" wx:for-item="item"/>`,
        `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, key, index) => { return {}; }) }
}`
      )
    })
    test(`skipped key`, () => {
      assert(
        `<view v-for="(value,,index) in items" />`,
        `<view wx:for="{{a}}" wx:for-item="value"/>`,
        `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (value, k0, index) => { return {}; }) }
}`
      )
    })
    test(`skipped value and key`, () => {
      assert(
        `<view v-for="(,,index) in items" />`,
        `<view wx:for="{{a}}" wx:for-item="v0"/>`,
        `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (v0, k0, index) => { return {}; }) }
}`
      )
    })
    test(`unbracketed value`, () => {
      assert(
        `<view v-for="item in items" />`,
        `<view wx:for="{{a}}" wx:for-item="item"/>`,
        `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return {}; }) }
}`
      )
    })
    test(`unbracketed value and key`, () => {
      assert(
        `<view v-for="item, key in items" />`,
        `<view wx:for="{{a}}" wx:for-item="item"/>`,
        `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, key, i0) => { return {}; }) }
}`
      )
    })
    test(`unbracketed value, key and index`, () => {
      assert(
        `<view v-for="value, key, index in items" />`,
        `<view wx:for="{{a}}" wx:for-item="value"/>`,
        `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (value, key, index) => { return {}; }) }
}`
      )
    })
    test(`unbracketed skipped key`, () => {
      assert(
        `<view v-for="value, , index in items" />`,
        `<view wx:for="{{a}}" wx:for-item="value"/>`,
        `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (value, k0, index) => { return {}; }) }
}`
      )
    })
    test(`unbracketed skipped value and key`, () => {
      assert(
        `<view v-for=", , index in items" />`,
        `<view wx:for="{{a}}" wx:for-item="v0"/>`,
        `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (v0, k0, index) => { return {}; }) }
}`
      )
    })
    test(`template v-for`, () => {
      assert(
        `<template v-for="item in items">hello<view/></template>`,
        `<block wx:for="{{a}}" wx:for-item="item">hello<view/></block>`,
        `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return {}; }) }
}`
      )
    })
    test(`template v-for w/ <slot/>`, () => {
      assert(
        `<template v-for="item in items"><slot/></template>`,
        `<block wx:for="{{a}}" wx:for-item="item"><slot/></block>`,
        `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return {}; }) }
}`
      )
    })
    // #1907 TODO 待优化
    test(`template v-for key injection with single child`, () => {
      assert(
        `<template v-for="item in items" :key="item.id"><view :id="item.id" /></template>`,
        `<block wx:for="{{a}}" wx:for-item="item" wx:key="b"><view id="{{item.a}}"/></block>`,
        `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: item.id, b: item.id }; }) }
}`
      )
    })
    test(`v-for on <slot/>`, () => {
      assert(
        `<slot v-for="item in items"></slot>`,
        `<slot wx:for="{{a}}" wx:for-item="item"></slot>`,
        `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return {}; }) }
}`
      )
    })
    test(`keyed v-for`, () => {
      assert(
        `<view v-for="(item) in items" :key="item" />`,
        `<view wx:for="{{a}}" wx:for-item="item" wx:key="a"/>`,
        `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: item }; }) }
}`
      )
    })
    test(`keyed template v-for`, () => {
      assert(
        `<template v-for="item in items" :key="item">hello<view/></template>`,
        `<block wx:for="{{a}}" wx:for-item="item" wx:key="a">hello<view/></block>`,
        `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: item }; }) }
}`
      )
    })
    test(`v-if + v-for`, () => {
      assert(
        `<view v-if="ok" v-for="i in list"/>`,
        `<block wx:if="{{a}}"><view wx:for="{{b}}" wx:for-item="i"/></block>`,
        `(_ctx, _cache) => {
  return _e({ a: _ctx.ok }, _ctx.ok ? { b: _f(_ctx.list, (i, k0, i0) => { return {}; }) } : {})
}`
      )
    })
    // 1637
    test(`v-if + v-for on <template>`, () => {
      assert(
        `<template v-if="ok" v-for="i in list"><view>1</view></template>`,
        `<block wx:if="{{a}}"><block wx:for="{{b}}" wx:for-item="i"><view>1</view></block></block>`,
        `(_ctx, _cache) => {
  return _e({ a: _ctx.ok }, _ctx.ok ? { b: _f(_ctx.list, (i, k0, i0) => { return {}; }) } : {})
}`
      )
    })
    test(`v-for on element with custom directive`, () => {
      // <view v-for="i in list" v-foo/>
    })
  })

  describe('errors', () => {
    test('missing expression', () => {
      const onError = jest.fn()
      parseWithForTransform('<view v-for />', { onError })

      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          code: ErrorCodes.X_V_FOR_NO_EXPRESSION,
        })
      )
    })
    test('empty expression', () => {
      const onError = jest.fn()
      parseWithForTransform('<view v-for="" />', { onError })

      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          code: ErrorCodes.X_V_FOR_MALFORMED_EXPRESSION,
        })
      )
    })

    test('invalid expression', () => {
      const onError = jest.fn()
      parseWithForTransform('<view v-for="items" />', { onError })

      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          code: ErrorCodes.X_V_FOR_MALFORMED_EXPRESSION,
        })
      )
    })

    test('missing source', () => {
      const onError = jest.fn()
      parseWithForTransform('<view v-for="item in" />', { onError })

      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          code: ErrorCodes.X_V_FOR_MALFORMED_EXPRESSION,
        })
      )
    })

    test('missing value', () => {
      const onError = jest.fn()
      parseWithForTransform('<view v-for="in items" />', { onError })

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
      const source = '<view v-for="item in items" />'
      const {
        node: { vFor: forNode },
      } = parseWithForTransform(source)

      const itemOffset = source.indexOf('item')
      const value = forNode.value as SimpleExpressionNode
      expect(forNode.valueAlias).toBe('item')
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
      const source = '<view v-for="( item ) in items" />'
      const {
        node: { vFor: forNode },
      } = parseWithForTransform(source)

      const itemOffset = source.indexOf('item')
      const value = forNode.value as SimpleExpressionNode
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
      const source = '<view v-for="(  { id, key }) in items" />'
      const {
        node: { vFor: forNode },
      } = parseWithForTransform(source)

      const value = forNode.value as SimpleExpressionNode
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
      const source = '<view v-for="( item, key, index ) in items" />'
      const {
        node: { vFor: forNode },
      } = parseWithForTransform(source)

      const itemOffset = source.indexOf('item')
      const value = forNode.value as SimpleExpressionNode
      expect(value.content).toBe('item')
      expect(value.loc.start.offset).toBe(itemOffset)
      expect(value.loc.start.line).toBe(1)
      expect(value.loc.start.column).toBe(itemOffset + 1)
      expect(value.loc.end.line).toBe(1)
      expect(value.loc.end.column).toBe(itemOffset + 1 + `item`.length)

      const keyOffset = source.indexOf('key')
      const key = forNode.key as SimpleExpressionNode
      expect(key.content).toBe('key')
      expect(key.loc.start.offset).toBe(keyOffset)
      expect(key.loc.start.line).toBe(1)
      expect(key.loc.start.column).toBe(keyOffset + 1)
      expect(key.loc.end.line).toBe(1)
      expect(key.loc.end.column).toBe(keyOffset + 1 + `key`.length)

      const indexOffset = source.indexOf('index')
      const index = forNode.index as SimpleExpressionNode
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
      const source = '<view v-for="( item,, index ) in items" />'
      const {
        node: { vFor: forNode },
      } = parseWithForTransform(source)

      const itemOffset = source.indexOf('item')
      const value = forNode.value as SimpleExpressionNode
      expect(value.content).toBe('item')
      expect(value.loc.start.offset).toBe(itemOffset)
      expect(value.loc.start.line).toBe(1)
      expect(value.loc.start.column).toBe(itemOffset + 1)
      expect(value.loc.end.line).toBe(1)
      expect(value.loc.end.column).toBe(itemOffset + 1 + `item`.length)

      const indexOffset = source.indexOf('index')
      const index = forNode.index as SimpleExpressionNode
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
        skipTransformIdentifier: true,
      })
      expect(node.vFor.source).toMatchObject({
        type: NodeTypes.SIMPLE_EXPRESSION,
        content: `_ctx.list`,
      })
    })

    test('should prefix v-for source w/ complex expression', () => {
      const { node } = parseWithForTransform(
        `<view v-for="i in list.concat([foo])"/>`,
        {
          prefixIdentifiers: true,
          skipTransformIdentifier: true,
        }
      )
      expect(node.vFor.source).toMatchObject({
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
        { prefixIdentifiers: true, skipTransformIdentifier: true }
      )
      const view = node as ElementNode
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
        { prefixIdentifiers: true, skipTransformIdentifier: true }
      )
      const view = node as ElementNode
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
        { prefixIdentifiers: true, skipTransformIdentifier: true }
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
        { prefixIdentifiers: true, skipTransformIdentifier: true }
      )
      const outerDiv = node as ElementNode
      const innerExp = (outerDiv.children[0] as ElementNode)
        .children[0] as InterpolationNode
      expect(innerExp.content).toMatchObject({
        type: NodeTypes.COMPOUND_EXPRESSION,
        children: [{ content: 'i' }, ` + `, { content: `_ctx.j` }],
      })

      // when an inner v-for shadows a variable of an outer v-for and exit,
      // it should not cause the outer v-for's alias to be removed from known ids
      const outerExp = outerDiv.children[1] as InterpolationNode
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
        { prefixIdentifiers: true, skipTransformIdentifier: true }
      )
      expect(node.vFor.value).toMatchObject({
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
      const view = node as ElementNode
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
      assert(
        `<view v-for="item in items" :key="itemKey(item)">test</view>`,
        `<view wx:for="{{a}}" wx:for-item="item" wx:key="a">test</view>`,
        `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: _ctx.itemKey(item) }; }) }
}`
      )
    })

    // #2085
    test('template v-for key expression prefixing', () => {
      assert(
        `<template v-for="item in items" :key="itemKey(item)">test</template>`,
        `<block wx:for="{{a}}" wx:for-item="item" wx:key="a">test</block>`,
        `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return { a: _ctx.itemKey(item) }; }) }
}`
      )
    })

    test('template v-for key no prefixing on attribute key', () => {
      assert(
        `<template v-for="item in items" key="key">test</template>`,
        `<block wx:for="{{a}}" wx:for-item="item" key="key">test</block>`,
        `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return {}; }) }
}`
      )
    })
  })
})
