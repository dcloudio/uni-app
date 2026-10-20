import {
  NodeTypes,
  type TemplateChildNode,
  baseParse,
} from '@vue/compiler-core'
import {
  createIsCustomElement,
  isMiniProgramNativeTag,
  isMiniProgramUVueNativeTag,
} from '@dcloudio/uni-shared'
import { compile } from '../src'
import { miniProgram } from './testUtils'

function compileTemplate(
  template: string,
  { isX = false, classArray = true, mergeVirtualHostAttributes = true } = {}
) {
  let templateCode = ''
  const { code } = compile(template, {
    root: '',
    filename: 'foo.vue',
    mode: 'module',
    prefixIdentifiers: true,
    inline: true,
    isX,
    isNativeTag: isX ? isMiniProgramUVueNativeTag : isMiniProgramNativeTag,
    isCustomElement: createIsCustomElement([]),
    generatorOpts: { concise: true },
    miniProgram: {
      ...miniProgram,
      class: { array: classArray },
      component: { ...miniProgram.component, mergeVirtualHostAttributes },
      emitFile({ source }) {
        templateCode = source as string
        return ''
      },
    },
  })
  const elements: Record<string, Record<string, string>> = {}
  function visit(children: TemplateChildNode[]) {
    for (const node of children) {
      if (node.type !== NodeTypes.ELEMENT) {
        continue
      }
      const attrs: Record<string, string> = {}
      for (const prop of node.props) {
        if (prop.type === NodeTypes.ATTRIBUTE) {
          attrs[prop.name] = prop.value?.content || ''
        }
      }
      if (attrs['data-node']) {
        elements[attrs['data-node']] = attrs
      }
      visit(node.children)
    }
  }
  visit(baseParse(templateCode, { parseMode: 'html' }).children)
  return { elements, code }
}

function expectInherited(attrs: Record<string, string>) {
  expect(attrs.class).toContain('virtualHostClass')
  expect(attrs.style).toContain('virtualHostStyle')
  expect(attrs.hidden).toContain('virtualHostHidden')
  expect(attrs.id).toMatch(/^\{\{.+\}\}$/)
}

function expectNotInherited(attrs: Record<string, string>) {
  expect(attrs.class || '').not.toContain('virtualHostClass')
  expect(attrs.style || '').not.toContain('virtualHostStyle')
  expect(attrs.hidden || '').not.toContain('virtualHostHidden')
  expect(attrs.id).toBeUndefined()
}

describe.each([
  { isX: false, classArray: true },
  { isX: false, classArray: false },
  { isX: true, classArray: true },
  { isX: true, classArray: false },
])('virtual host roots (isX=$isX, classArray=$classArray)', (options) => {
  test('inherits on the root without descending into ordinary elements', () => {
    const { elements } = compileTemplate(
      '<view data-node="root"><image data-node="child" v-if="ok"/></view>',
      options
    )
    expectInherited(elements.root)
    expectNotInherited(elements.child)
  })

  test('inherits on each branch of an if chain with comments and whitespace', () => {
    const { elements } = compileTemplate(
      `<view data-node="a" v-if="ok"/>
       <!-- between branches -->
       <image data-node="b" v-else-if="other"/>
       <text data-node="c" v-else/>`,
      options
    )
    expectInherited(elements.a)
    expectInherited(elements.b)
    expectInherited(elements.c)
    expect(elements.a['wx:if']).toBeDefined()
    expect(elements.b['wx:elif']).toBeDefined()
    expect(elements.c['wx:else']).toBe('')
  })

  test.each([
    '<view data-node="a" v-if="ok"/>',
    '<view data-node="a" v-if="ok"/><image data-node="b" v-else-if="other"/>',
  ])('inherits without a final else: %s', (template) => {
    const { elements } = compileTemplate(template, options)
    Object.values(elements).forEach(expectInherited)
  })

  test('inherits through nested template branches', () => {
    const { elements } = compileTemplate(
      `<template v-if="outer">
         <view data-node="a" v-if="inner"/>
         <image data-node="b" v-else/>
       </template>
       <text data-node="c" v-else/>`,
      options
    )
    expectInherited(elements.a)
    expectInherited(elements.b)
    expectInherited(elements.c)
  })

  test('analyzes single and multiple roots separately for each branch', () => {
    const { elements } = compileTemplate(
      `<template v-if="ok"><view data-node="a"/><image data-node="b"/></template>
       <template v-else-if="other"><text data-node="c"/></template>
       <view data-node="d" v-else/>`,
      options
    )
    expectNotInherited(elements.a)
    expectNotInherited(elements.b)
    expectInherited(elements.c)
    expectInherited(elements.d)
  })

  test.each(['content', '{{ message }}'])(
    'does not ignore meaningful text in a branch: %s',
    (text) => {
      const { elements } = compileTemplate(
        `<template v-if="ok">${text}<view data-node="a"/></template>
         <image data-node="b" v-else/>`,
        options
      )
      expectNotInherited(elements.a)
      expectInherited(elements.b)
    }
  )

  test.each([
    '<view data-node="a"/><image data-node="b"/>',
    '<view data-node="a" v-if="ok"/><image data-node="b" v-if="!ok"/>',
    '<view data-node="a"/><image data-node="b" v-if="ok"/>',
    '<view data-node="a"/>content',
    '<view data-node="a"/>{{ message }}',
    '<view data-node="a" v-for="item in items"/>',
  ])('does not inherit on fragment roots: %s', (template) => {
    const { elements } = compileTemplate(template, options)
    Object.values(elements).forEach(expectNotInherited)
  })

  test('does not inherit when two if chains are sibling roots', () => {
    const { elements } = compileTemplate(
      `<view data-node="a" v-if="first"/>
       <image data-node="b" v-else/>
       <view data-node="c" v-if="second"/>
       <image data-node="d" v-else/>`,
      options
    )
    expect(Object.keys(elements)).toEqual(['a', 'b', 'c', 'd'])
    Object.values(elements).forEach(expectNotInherited)
  })

  test('does not inherit on a loop branch or suppress the single else root', () => {
    const { elements } = compileTemplate(
      `<view data-node="a" v-if="ok" v-for="item in items"/>
       <image data-node="b" v-else/>`,
      options
    )
    expectNotInherited(elements.a)
    expectInherited(elements.b)
  })

  test('merges local class and style on a conditional root', () => {
    const { elements } = compileTemplate(
      `<view data-node="a" v-if="ok" class="local" :class="classes" style="color:red" :style="styles"/>
       <image data-node="b" v-else/>`,
      options
    )
    expectInherited(elements.a)
    expect(elements.a.class).toContain("'local'")
    expect(elements.a.style).toContain('color:red')
    expectInherited(elements.b)
  })

  test('forwards attributes when a branch root is a user component', () => {
    const { elements } = compileTemplate(
      '<custom-a data-node="a" v-if="ok"/><custom-b data-node="b" v-else/>',
      options
    )
    for (const attrs of Object.values(elements)) {
      expectInherited(attrs)
      expect(attrs.virtualHostClass).toContain('virtualHostClass')
      expect(attrs.virtualHostStyle).toContain('virtualHostStyle')
      expect(attrs.virtualHostHidden).toContain('virtualHostHidden')
      expect(attrs.virtualHostId).toBe(attrs.id)
    }
  })

  test('respects mergeVirtualHostAttributes being disabled', () => {
    const { elements } = compileTemplate(
      '<view data-node="a" v-if="ok"/><image data-node="b" v-else/>',
      { ...options, mergeVirtualHostAttributes: false }
    )
    expectNotInherited(elements.a)
    expectNotInherited(elements.b)
  })
})

test('updates class and style data when switching conditional roots', () => {
  const { code } = compileTemplate(
    '<view v-if="ok" :class="classes" :style="styles"/><image v-else/>'
  )
  const render = new Function('_e', '_gei', '_n', '_s', `return (${code})`)(
    Object.assign,
    () => '',
    (value: unknown) => value,
    (value: unknown) => value
  )
  const ctx = { ok: true, classes: 'first', styles: 'color:red' }
  expect(Object.values(render(ctx, {}))).toEqual(
    expect.arrayContaining(['first', 'color:red'])
  )
  ctx.ok = false
  expect(Object.values(render(ctx, {}))).not.toContain('first')
  ctx.ok = true
  ctx.classes = 'second'
  ctx.styles = 'color:blue'
  expect(Object.values(render(ctx, {}))).toEqual(
    expect.arrayContaining(['second', 'color:blue'])
  )
})
