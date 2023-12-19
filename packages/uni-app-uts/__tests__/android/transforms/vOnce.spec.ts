import { NodeTypes, SET_BLOCK_TRACKING, baseParse } from '@vue/compiler-core'
import { getBaseTransformPreset } from '../../../src/plugins/android/uvue/compiler/index'
import { transform } from '../../../src/plugins/android/uvue/compiler/transform'
import { TemplateCompilerOptions } from '../../../src/plugins/android/uvue/compiler/options'
import { generate } from '../../../src/plugins/android/uvue/compiler/codegen'
import { RENDER_SLOT } from '../../../src/plugins/android/uvue/compiler/runtimeHelpers'

function transformWithOnce(
  template: string,
  options: TemplateCompilerOptions = {}
) {
  const ast = baseParse(template)
  const [nodeTransforms, directiveTransforms] = getBaseTransformPreset()
  transform(ast, {
    nodeTransforms,
    directiveTransforms,
    ...options,
  })
  return ast
}

describe('compiler: v-once transform', () => {
  test('as root node', () => {
    const root = transformWithOnce(`<view :id="foo" v-once />`)
    expect(root.cached).toBe(1)
    expect(root.helpers).toContain(SET_BLOCK_TRACKING)
    expect(root.codegenNode).toMatchObject({
      type: NodeTypes.JS_CACHE_EXPRESSION,
      index: 0,
      value: {
        type: NodeTypes.VNODE_CALL,
        tag: `"view"`,
      },
    })
    expect(generate(root).code).toMatchSnapshot()
  })

  test('on nested plain element', () => {
    const root = transformWithOnce(`<view><view :id="foo" v-once /></view>`)
    expect(root.cached).toBe(1)
    expect(root.helpers).toContain(SET_BLOCK_TRACKING)
    expect((root.children[0] as any).children[0].codegenNode).toMatchObject({
      type: NodeTypes.JS_CACHE_EXPRESSION,
      index: 0,
      value: {
        type: NodeTypes.VNODE_CALL,
        tag: `"view"`,
      },
    })
    expect(generate(root).code).toMatchSnapshot()
  })

  test('on component', () => {
    const root = transformWithOnce(`<view><Comp :id="foo" v-once /></view>`)
    expect(root.cached).toBe(1)
    expect(root.helpers).toContain(SET_BLOCK_TRACKING)
    expect((root.children[0] as any).children[0].codegenNode).toMatchObject({
      type: NodeTypes.JS_CACHE_EXPRESSION,
      index: 0,
      value: {
        type: NodeTypes.VNODE_CALL,
        tag: `_component_Comp`,
      },
    })
    expect(generate(root).code).toMatchSnapshot()
  })

  test('on slot outlet', () => {
    const root = transformWithOnce(`<view><slot v-once /></view>`)
    expect(root.cached).toBe(1)
    expect(root.helpers).toContain(SET_BLOCK_TRACKING)
    expect((root.children[0] as any).children[0].codegenNode).toMatchObject({
      type: NodeTypes.JS_CACHE_EXPRESSION,
      index: 0,
      value: {
        type: NodeTypes.JS_CALL_EXPRESSION,
        callee: RENDER_SLOT,
      },
    })
    expect(generate(root).code).toMatchSnapshot()
  })

  // v-once inside v-once should not be cached
  test('inside v-once', () => {
    const root = transformWithOnce(`<view v-once><view v-once/></view>`)
    expect(root.cached).not.toBe(2)
    expect(root.cached).toBe(1)
  })

  // cached nodes should be ignored by hoistStatic transform
  // test('with hoistStatic: true', () => {
  //   const root = transformWithOnce(`<view><view v-once /></view>`, {
  //     hoistStatic: true,
  //   })
  //   expect(root.cached).toBe(1)
  //   expect(root.helpers).toContain(SET_BLOCK_TRACKING)
  //   expect(root.hoists.length).toBe(0)
  //   expect((root.children[0] as any).children[0].codegenNode).toMatchObject({
  //     type: NodeTypes.JS_CACHE_EXPRESSION,
  //     index: 0,
  //     value: {
  //       type: NodeTypes.VNODE_CALL,
  //       tag: `"view"`,
  //     },
  //   })
  //   expect(generate(root).code).toMatchSnapshot()
  // })

  test('with v-if/else', () => {
    const root = transformWithOnce(`<view v-if="BOOLEAN" v-once /><p v-else/>`)
    expect(root.cached).toBe(1)
    expect(root.helpers).toContain(SET_BLOCK_TRACKING)
    expect(root.children[0]).toMatchObject({
      type: NodeTypes.IF,
      // should cache the entire v-if/else-if/else expression, not just a single branch
      codegenNode: {
        type: NodeTypes.JS_CACHE_EXPRESSION,
        value: {
          type: NodeTypes.JS_CONDITIONAL_EXPRESSION,
          consequent: {
            type: NodeTypes.VNODE_CALL,
            tag: `"view"`,
          },
          alternate: {
            type: NodeTypes.VNODE_CALL,
            tag: `"p"`,
          },
        },
      },
    })
  })

  test('with v-for', () => {
    const root = transformWithOnce(`<view v-for="i in list" v-once />`)
    expect(root.cached).toBe(1)
    expect(root.helpers).toContain(SET_BLOCK_TRACKING)
    expect(root.children[0]).toMatchObject({
      type: NodeTypes.FOR,
      // should cache the entire v-for expression, not just a single branch
      codegenNode: {
        type: NodeTypes.JS_CACHE_EXPRESSION,
      },
    })
  })
})
