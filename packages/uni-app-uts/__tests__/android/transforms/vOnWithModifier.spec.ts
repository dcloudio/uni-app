import {
  type CompilerOptions,
  type ElementNode,
  NodeTypes,
  type ObjectExpression,
  type VNodeCall,
  baseParse as parse,
  transform,
  transformElement,
} from '@vue/compiler-core'
import { transformOn } from '../../../src/plugins/android/uvue/compiler/transforms/vOnWithModifier'
import { V_ON_WITH_MODIFIERS } from '../../../src/plugins/android/uvue/compiler/runtimeHelpers'
import { transformExpression } from '../../../src/plugins/android/uvue/compiler/transforms/transformExpression'

function parseWithVOn(template: string, options: CompilerOptions = {}) {
  const ast = parse(template)
  transform(ast, {
    nodeTransforms: [transformExpression as any, transformElement],
    directiveTransforms: {
      on: transformOn as any,
    },
    ...options,
  })
  return {
    root: ast,
    props: (
      ((ast.children[0] as ElementNode).codegenNode as VNodeCall)
        .props as ObjectExpression
    ).properties,
  }
}

describe('compiler-dom: transform v-on', () => {
  it('should support multiple modifiers w/ prefixIdentifiers: true', () => {
    const warnings: string[] = []
    const {
      props: [prop],
    } = parseWithVOn(`<view @click.stop.prevent="test"/>`, {
      prefixIdentifiers: true,
      onWarn(warning) {
        warnings.push(warning.message)
      },
    })
    expect(prop).toMatchObject({
      type: NodeTypes.JS_PROPERTY,
      value: {
        callee: V_ON_WITH_MODIFIERS,
        arguments: [{ content: '_ctx.test' }, '["stop","prevent"]'],
      },
    })
    expect(warnings).toEqual([])
  })

  it('should support multiple events and modifiers options w/ prefixIdentifiers: true', () => {
    const warnings: string[] = []
    const { props } = parseWithVOn(
      `<view @click.stop="test" @keyup.enter="test" />`,
      {
        prefixIdentifiers: true,
        onWarn(warning) {
          warnings.push(warning.message)
        },
      }
    )
    const [clickProp] = props

    expect(props).toHaveLength(2)
    expect(clickProp).toMatchObject({
      type: NodeTypes.JS_PROPERTY,
      value: {
        callee: V_ON_WITH_MODIFIERS,
        arguments: [{ content: '_ctx.test' }, '["stop"]'],
      },
    })
    expect(warnings).toEqual(['.enter is not supported'])
  })

  it('should support multiple modifiers and event options w/ prefixIdentifiers: true', () => {
    const warnings: string[] = []
    const {
      props: [prop],
    } = parseWithVOn(`<view @click.stop.capture.once="test"/>`, {
      prefixIdentifiers: true,
      onWarn(warning) {
        warnings.push(warning.message)
      },
    })
    expect(prop).toMatchObject({
      type: NodeTypes.JS_PROPERTY,
      key: {
        content: `onClickOnce`,
      },
      value: {
        callee: V_ON_WITH_MODIFIERS,
        arguments: [{ content: '_ctx.test' }, '["stop"]'],
      },
    })
    expect(warnings).toEqual(['.capture is not supported'])
  })

  it('should wrap keys guard for keyboard events or dynamic events', () => {
    const warnings: string[] = []
    parseWithVOn(`<view @keydown.stop.capture.ctrl.a="test"/>`, {
      prefixIdentifiers: true,
      onWarn(warning) {
        warnings.push(warning.message)
      },
    })
    expect(warnings).toEqual([
      '.capture is not supported',
      '.ctrl is not supported',
      '.a is not supported',
    ])
  })

  it('should not wrap keys guard if no key modifier is present', () => {
    const warnings: string[] = []
    parseWithVOn(`<view @keyup.exact="test"/>`, {
      prefixIdentifiers: true,
      onWarn(warning) {
        warnings.push(warning.message)
      },
    })
    expect(warnings).toEqual(['.exact is not supported'])
  })

  it('should wrap keys guard for static key event w/ left/right modifiers', () => {
    const warnings: string[] = []
    parseWithVOn(`<view @keyup.left="test"/>`, {
      prefixIdentifiers: true,
      onWarn(warning) {
        warnings.push(warning.message)
      },
    })
    expect(warnings).toEqual(['.left is not supported'])
  })

  it('should wrap both for dynamic key event w/ left/right modifiers', () => {
    const warnings: string[] = []
    parseWithVOn(`<view @[e].left="test"/>`, {
      prefixIdentifiers: true,
      onWarn(warning) {
        warnings.push(warning.message)
      },
    })
    expect(warnings).toEqual(['.left is not supported'])
  })

  it('should not wrap normal guard if there is only keys guard', () => {
    const warnings: string[] = []
    parseWithVOn(`<view @keyup.enter="test"/>`, {
      prefixIdentifiers: true,
      onWarn(warning) {
        warnings.push(warning.message)
      },
    })
    expect(warnings).toEqual(['.enter is not supported'])
  })

  test('should transform click.right', () => {
    const warnings: string[] = []
    parseWithVOn(`<view @click.right="test"/>`, {
      onWarn(warning) {
        warnings.push(warning.message)
      },
    })
    expect(warnings).toEqual(['.right is not supported'])
    const warnings1: string[] = []
    // dynamic
    parseWithVOn(`<view @[event].right="test"/>`, {
      onWarn(warning) {
        warnings1.push(warning.message)
      },
    })
    // (_toHandlerKey(event)).toLowerCase() === "onclick" ? "onContextmenu" : (_toHandlerKey(event))
    expect(warnings1).toEqual(['.right is not supported'])
  })

  test('should transform click.middle', () => {
    const warnings: string[] = []
    parseWithVOn(`<view @click.middle="test"/>`, {
      onWarn(warning) {
        warnings.push(warning.message)
      },
    })
    expect(warnings).toEqual(['.middle is not supported'])
    // dynamic
    const warnings1: string[] = []
    parseWithVOn(`<view @[event].middle="test"/>`, {
      onWarn(warning) {
        warnings1.push(warning.message)
      },
    })
    // (_eventNaming(event)).toLowerCase() === "onclick" ? "onMouseup" : (_eventNaming(event))
    expect(warnings1).toEqual(['.middle is not supported'])
  })

  test('cache handler w/ modifiers', () => {
    const warnings: string[] = []
    const {
      root,
      // props: [prop],
    } = parseWithVOn(`<view @keyup.enter.capture="foo" />`, {
      prefixIdentifiers: true,
      cacheHandlers: true,
      onWarn(warning) {
        warnings.push(warning.message)
      },
    })
    expect(root.cached).toBe(1)
    expect(warnings).toEqual([
      '.enter is not supported',
      '.capture is not supported',
    ])
    // should not treat cached handler as dynamicProp, so it should have no
    // dynamicProps flags and only the hydration flag
    // expect((root as any).children[0].codegenNode.patchFlag).toBe(
    //   genFlagText(PatchFlags.HYDRATE_EVENTS)
    // )
    // expect(prop).toMatchObject({
    //   key: {
    //     content: `onKeyupCapture`,
    //   },
    //   value: {
    //     type: NodeTypes.JS_CACHE_EXPRESSION,
    //     index: 0,
    //     value: {
    //       type: NodeTypes.JS_CALL_EXPRESSION,
    //       callee: V_ON_WITH_KEYS,
    //     },
    //   },
    // })
  })
})
