import {
  type DirectiveNode,
  type ElementNode,
  NodeTypes,
  type SimpleExpressionNode as SimpleExpression,
  baseParse as parse,
  transform,
} from '@vue/compiler-core'
import { transformVBindAttrs } from '../src/transforms/transformVBindAttrs'

function runTransform(template: string) {
  const ast = parse(template)
  transform(ast, {
    nodeTransforms: [transformVBindAttrs as any],
  })
  return ast.children[0] as ElementNode
}

function getProp(node: ElementNode, name: string) {
  return node.props.find((p) => {
    if (
      p.type === NodeTypes.DIRECTIVE &&
      p.name === 'bind' &&
      p.arg?.type === NodeTypes.SIMPLE_EXPRESSION &&
      p.arg.isStatic &&
      p.arg.content === name
    ) {
      return true
    }
    return false
  }) as DirectiveNode | undefined
}

function getOnProp(node: ElementNode, name: string) {
  return node.props.find((p) => {
    if (
      p.type === NodeTypes.DIRECTIVE &&
      p.name === 'on' &&
      p.arg?.type === NodeTypes.SIMPLE_EXPRESSION &&
      p.arg.isStatic &&
      p.arg.content === name
    ) {
      return true
    }
    return false
  }) as DirectiveNode | undefined
}

function countOnProp(node: ElementNode, name: string) {
  return node.props.filter((p) => {
    return (
      p.type === NodeTypes.DIRECTIVE &&
      p.name === 'on' &&
      p.arg?.type === NodeTypes.SIMPLE_EXPRESSION &&
      p.arg.isStatic &&
      p.arg.content === name
    )
  }).length
}

function formatProps(node: ElementNode) {
  return node.props.map((p) => {
    if (p.type === NodeTypes.DIRECTIVE) {
      const arg =
        p.arg?.type === NodeTypes.SIMPLE_EXPRESSION && p.arg.isStatic
          ? p.arg.content
          : ''
      const exp =
        p.exp?.type === NodeTypes.SIMPLE_EXPRESSION ? p.exp.content : ''
      if (p.name === 'bind') {
        return arg ? `:${arg}=${exp}` : `v-bind=${exp}`
      }
      if (p.name === 'on') {
        return arg ? `@${arg}=${exp}` : `v-on=${exp}`
      }
      return `v-${p.name}`
    }
    if (p.type === NodeTypes.ATTRIBUTE) {
      return p.value ? `${p.name}=${p.value.content}` : p.name
    }
    return ''
  })
}

describe('compiler: transform v-bind="$attrs"', () => {
  test('root node with v-bind="$attrs"', () => {
    const node = runTransform(`<view v-bind="$attrs">123</view>`)

    // should remove v-bind="$attrs"
    expect(
      node.props.find(
        (p) =>
          p.type === NodeTypes.DIRECTIVE &&
          p.name === 'bind' &&
          !p.arg &&
          (p.exp as SimpleExpression)?.content === '$attrs'
      )
    ).toBeUndefined()

    // Class
    const classProp = getProp(node, 'class')
    expect(classProp).toBeDefined()
    expect((classProp!.exp as SimpleExpression).content).toBe('$attrs.class')

    // Style
    const styleProp = getProp(node, 'style')
    expect(styleProp).toBeDefined()
    expect((styleProp!.exp as SimpleExpression).content).toBe('$attrs.style')

    // Id
    const idProp = getProp(node, 'id')
    expect(idProp).toBeDefined()
    expect((idProp!.exp as SimpleExpression).content).toBe('$attrs.id')

    // Click
    const clickProp = getOnProp(node, 'click')
    expect(clickProp).toBeDefined()
    expect((clickProp!.exp as SimpleExpression).content).toBe('$attrs.onClick')

    expect(formatProps(node)).toEqual([
      ':class=$attrs.class',
      ':style=$attrs.style',
      '@click=$attrs.onClick',
      ':id=$attrs.id',
    ])
  })

  test('nested node with v-bind="$attrs"', () => {
    const ast = parse(`<view><view v-bind="$attrs">123</view></view>`)
    transform(ast, {
      nodeTransforms: [transformVBindAttrs as any],
    })
    const node = (ast.children[0] as ElementNode).children[0] as ElementNode
    expect(getProp(node, 'class')).toBeDefined()
  })

  test('root node with v-bind="$attrs" and existing style', () => {
    // transformVBindAttrs only merges with DYNAMIC style/class. Static style is kept separate (Vue behavior).
    // The plugin adds :style="$attrs.style".
    const node = runTransform(
      `<view v-bind="$attrs" style="color:red">123</view>`
    )
    const styleProp = getProp(node, 'style')
    expect(styleProp).toBeDefined()
    expect((styleProp!.exp as SimpleExpression).content).toBe('$attrs.style')
  })

  test('root node with v-bind="$attrs" and existing dynamic style', () => {
    const node = runTransform(
      `<view v-bind="$attrs" :style="{ color: 'red' }">123</view>`
    )
    const styleProp = getProp(node, 'style')
    expect(styleProp).toBeDefined()
    // Should merge: [$attrs.style, original]
    expect((styleProp!.exp as SimpleExpression).content).toBe(
      `[$attrs.style, { color: 'red' }]`
    )
    expect(formatProps(node)).toEqual([
      ':class=$attrs.class',
      '@click=$attrs.onClick',
      ':id=$attrs.id',
      ":style=[$attrs.style, { color: 'red' }]",
    ])
  })

  test('should merge with existing dynamic class', () => {
    const node = runTransform(`<view :class="foo" v-bind="$attrs"/>`)
    const classProp = getProp(node, 'class')
    expect(classProp).toBeDefined()
    expect((classProp!.exp as SimpleExpression).content).toBe(
      `[foo, $attrs.class]`
    )
    expect(formatProps(node)).toEqual([
      ':class=[foo, $attrs.class]',
      ':style=$attrs.style',
      '@click=$attrs.onClick',
      ':id=$attrs.id',
    ])
  })

  test('should merge with existing dynamic class after v-bind', () => {
    const node = runTransform(`<view v-bind="$attrs" :class="foo"/>`)
    const classProp = getProp(node, 'class')
    expect(classProp).toBeDefined()
    expect((classProp!.exp as SimpleExpression).content).toBe(
      `[$attrs.class, foo]`
    )
    expect(formatProps(node)).toEqual([
      ':style=$attrs.style',
      '@click=$attrs.onClick',
      ':id=$attrs.id',
      ':class=[$attrs.class, foo]',
    ])
  })

  test('should skip id if already defined after v-bind', () => {
    const node = runTransform(`<view v-bind="$attrs" id="foo"/>`)
    // id="foo" is static attribute, not bound.
    // transformVBindAttrs checks for both Attribute 'id' and Directive 'bind' 'id'.
    // If found AFTER v-bind, it skips adding :id.
    expect(getProp(node, 'id')).toBeUndefined()
    expect(formatProps(node)).toEqual([
      ':class=$attrs.class',
      ':style=$attrs.style',
      '@click=$attrs.onClick',
      'id=foo',
    ])
  })

  test('should add id if defined before v-bind', () => {
    const node = runTransform(`<view id="foo" v-bind="$attrs"/>`)
    // id defined BEFORE. The check slice(i+1) won't find it.
    // So it adds :id="$attrs.id"
    expect(getProp(node, 'id')).toBeDefined()
    expect(formatProps(node)).toEqual([
      'id=foo',
      ':class=$attrs.class',
      ':style=$attrs.style',
      '@click=$attrs.onClick',
      ':id=$attrs.id',
    ])
  })

  test('should not transform v-bind with argument', () => {
    const node = runTransform(`<view v-bind:class="$attrs"/>`)
    const classProp = getProp(node, 'class')
    expect(classProp).toBeDefined()
    expect((classProp!.exp as SimpleExpression).content).toBe('$attrs')
    expect(getProp(node, 'style')).toBeUndefined()
    expect(getProp(node, 'id')).toBeUndefined()
    expect(getOnProp(node, 'click')).toBeUndefined()
    expect(formatProps(node)).toEqual([':class=$attrs'])
  })

  test('should merge click if already defined after v-bind', () => {
    const node = runTransform(`<view v-bind="$attrs" @click="foo">123</view>`)
    const clickProp = getOnProp(node, 'click')
    expect(clickProp).toBeDefined()
    expect((clickProp!.exp as SimpleExpression).content).toBe(
      `[$attrs.onClick, foo]`
    )
    expect(countOnProp(node, 'click')).toBe(1)
    expect(formatProps(node)).toEqual([
      ':class=$attrs.class',
      ':style=$attrs.style',
      ':id=$attrs.id',
      '@click=[$attrs.onClick, foo]',
    ])
  })

  test('should merge click if already defined before v-bind', () => {
    const node = runTransform(`<view @click="foo" v-bind="$attrs">123</view>`)
    const clickProp = getOnProp(node, 'click')
    expect(clickProp).toBeDefined()
    expect((clickProp!.exp as SimpleExpression).content).toBe(
      `[foo, $attrs.onClick]`
    )
    expect(countOnProp(node, 'click')).toBe(1)
    expect(formatProps(node)).toEqual([
      '@click=[foo, $attrs.onClick]',
      ':class=$attrs.class',
      ':style=$attrs.style',
      ':id=$attrs.id',
    ])
  })
})
