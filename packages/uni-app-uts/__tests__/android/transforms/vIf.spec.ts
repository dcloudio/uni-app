import { extend } from '@vue/shared'
import {
  CREATE_COMMENT,
  type CommentNode,
  type CompilerOptions,
  type ConditionalExpression,
  type ElementNode,
  ElementTypes,
  ErrorCodes,
  FRAGMENT,
  type IfBranchNode,
  type IfConditionalExpression,
  type IfNode,
  MERGE_PROPS,
  NORMALIZE_PROPS,
  NodeTypes,
  type SimpleExpressionNode,
  TO_HANDLERS,
  type TextNode,
  type VNodeCall,
  baseParse as parse,
  transform,
  transformElement,
} from '@vue/compiler-core'
import { transformIf } from '../../../src/plugins/android/uvue/compiler/transforms/vIf'
import { transformSlotOutlet } from '../../../src/plugins/android/uvue/compiler/transforms/transformSlotOutlet'
import { generate } from '../../../src/plugins/android/uvue/compiler/codegen'
import { RENDER_SLOT } from '../../../src/plugins/android/uvue/compiler/runtimeHelpers'
import { assert, createObjectMatcher } from '../testUtils'

function parseWithIfTransform(
  template: string,
  options: CompilerOptions = {},
  returnIndex: number = 0,
  childrenLen: number = 1
) {
  const ast = parse(template)
  transform(
    ast,
    extend({}, options, {
      prefixIdentifiers: options.prefixIdentifiers,
      nodeTransforms: [
        transformIf,
        transformSlotOutlet,
        transformElement,
        ...(options.nodeTransforms || []), // user transforms
      ],
    })
  )
  if (!options.onError) {
    expect(ast.children.length).toBe(childrenLen)
    for (let i = 0; i < childrenLen; i++) {
      expect(ast.children[i].type).toBe(NodeTypes.IF)
    }
  }
  return {
    root: ast,
    node: ast.children[returnIndex] as IfNode & {
      codegenNode: IfConditionalExpression
    },
  }
}

describe('compiler: v-if', () => {
  test('basic v-if', () => {
    assert(
      `<view v-if="ok"/>`,
      `isTrue(_ctx.ok)\n  ? _cE("view", _uM({ key: 0 }))\n  : _cC("v-if", true)`
    )
  })
  test('template v-if', () => {
    assert(
      `<template v-if="ok"><view/>hello<text/></template>`,
      `isTrue(_ctx.ok)
  ? _cE(Fragment, _uM({ key: 0 }), [
      _cE("view"),
      "hello",
      _cE("text")
    ], 64 /* STABLE_FRAGMENT */)
  : _cC("v-if", true)`
    )
  })
  test('component v-if', () => {
    assert(
      `<Component v-if="ok"></Component>`,
      `isTrue(_ctx.ok)
  ? _cV(_component_Component, _uM({ key: 0 }))
  : _cC("v-if", true)`
    )
  })
  test('v-if + v-else', () => {
    assert(
      `
        <view>
          <text v-if="ok"/>
          <text v-else/>
        </view>
      `,
      `_cE("view", null, [
  isTrue(_ctx.ok)
    ? _cE("text", _uM({ key: 0 }))
    : _cE("text", _uM({ key: 1 }))
])`
    )
  })
  test('v-if + v-else-if', () => {
    assert(
      `
        <view>
          <text v-if="ok"/>
          <text v-else-if="orNot"/>
          <text v-else/>
        </view>
      `,
      `_cE("view", null, [
  isTrue(_ctx.ok)
    ? _cE("text", _uM({ key: 0 }))
    : isTrue(_ctx.orNot)
      ? _cE("text", _uM({ key: 1 }))
      : _cE("text", _uM({ key: 2 }))
])`
    )
  })
  test('v-if + v-else-if + v-else', () => {
    assert(
      `
        <view>
          <text v-if="ok"/>
          <text v-else-if="orNot">v-else-if</text>
          <text v-else>v-else</text>
        </view>
      `,
      `_cE("view", null, [
  isTrue(_ctx.ok)
    ? _cE("text", _uM({ key: 0 }))
    : isTrue(_ctx.orNot)
      ? _cE("text", _uM({ key: 1 }), "v-else-if")
      : _cE("text", _uM({ key: 2 }), "v-else")
])`
    )
  })
  test('comment between branches', () => {
    assert(
      `
      <view v-if="ok"/>
      <!--foo-->
      <view v-else-if="orNot"/>
      <!--bar-->
      <text v-else>v-else</text>
    `,
      `isTrue(_ctx.ok)
  ? _cE("view", _uM({ key: 0 }))
  : isTrue(_ctx.orNot)
    ? _cE("view", _uM({ key: 1 }))
    : _cE("text", _uM({ key: 2 }), "v-else")`
    )
  })
  test('template v-if w/ single <slot/> child', () => {
    assert(
      `<template v-if="ok"><slot/></template>`,
      `isTrue(_ctx.ok)
  ? renderSlot(_ctx.$slots, "default", _uM({ key: 0 }))
  : _cC("v-if", true)`
    )
  })
  test('v-if on <slot/>', () => {
    assert(
      `<slot v-if="ok"></slot>`,
      `isTrue(_ctx.ok)
  ? renderSlot(_ctx.$slots, "default", _uM({ key: 0 }))
  : _cC("v-if", true)`
    )
  })
  test('multiple v-if that are sibling nodes should have different keys', () => {
    assert(
      `<view><view v-if="ok"/><view v-if="orNot"/></view>`,
      `_cE("view", null, [
  isTrue(_ctx.ok)
    ? _cE("view", _uM({ key: 0 }))
    : _cC("v-if", true),
  isTrue(_ctx.orNot)
    ? _cE("view", _uM({ key: 1 }))
    : _cC("v-if", true)
])`
    )
  })
  test('increasing key: v-if + v-else-if + v-else', () => {
    assert(
      `<view><view v-if="ok"/><view v-else/><view v-if="another"/><view v-else-if="orNot"/><view v-else/></view>`,
      `_cE("view", null, [
  isTrue(_ctx.ok)
    ? _cE("view", _uM({ key: 0 }))
    : _cE("view", _uM({ key: 1 })),
  isTrue(_ctx.another)
    ? _cE("view", _uM({ key: 2 }))
    : isTrue(_ctx.orNot)
      ? _cE("view", _uM({ key: 3 }))
      : _cE("view", _uM({ key: 4 }))
])`
    )
  })
  test('key injection (only v-bind)', () => {
    assert(
      `<view v-if="ok" v-bind="obj"/>`,
      `isTrue(_ctx.ok)
  ? _cE("view", normalizeProps(mergeProps(_uM({ key: 0 }), _ctx.obj)), null, 16 /* FULL_PROPS */)
  : _cC("v-if", true)`
    )
  })
  test('key injection (before v-bind)', () => {
    assert(
      `<view v-if="ok" id="foo" v-bind="obj"/>`,
      `isTrue(_ctx.ok)
  ? _cE("view", mergeProps(_uM({
      key: 0,
      id: "foo"
    }), _ctx.obj), null, 16 /* FULL_PROPS */)
  : _cC("v-if", true)`
    )
  })
  test('key injection (after v-bind)', () => {
    assert(
      `<view v-if="ok" v-bind="obj" id="foo"/>`,
      `isTrue(_ctx.ok)
  ? _cE("view", mergeProps(_uM({ key: 0 }), _ctx.obj, _uM({ id: "foo" })), null, 16 /* FULL_PROPS */)
  : _cC("v-if", true)`
    )
  })
  test('avoid duplicate keys', () => {
    assert(
      `<view v-if="ok" key="custom_key" v-bind="obj"/>`,
      `isTrue(_ctx.ok)
  ? _cE("view", mergeProps(_uM({ key: "custom_key" }), _ctx.obj), null, 16 /* FULL_PROPS */)
  : _cC("v-if", true)`
    )
  })
  test('with spaces between branches', () => {
    assert(
      `<view><text v-if="ok">1</text> <text v-else-if="orNot">2</text> <text v-else>3</text></view>`,
      `_cE("view", null, [
  isTrue(_ctx.ok)
    ? _cE("text", _uM({ key: 0 }), "1")
    : isTrue(_ctx.orNot)
      ? _cE("text", _uM({ key: 1 }), "2")
      : _cE("text", _uM({ key: 2 }), "3")
])`
    )
  })
  test('v-on with v-if', () => {
    assert(
      `<view v-on="{ click: clickEvent }" v-if="true">w/ v-if</view>`,
      `true
  ? _cE("view", mergeProps(_uM({ key: 0 }), toHandlers(_uM({ click: _ctx.clickEvent }), true)), "w/ v-if", 16 /* FULL_PROPS */)
  : _cC("v-if", true)`
    )
  })

  test('v-if test expr', () => {
    assert(
      `<view v-if="true"/>`,
      `true
  ? _cE("view", _uM({ key: 0 }))
  : _cC("v-if", true)`
    )
    assert(
      `<view v-if="false"/>`,
      `false
  ? _cE("view", _uM({ key: 0 }))
  : _cC("v-if", true)`
    )
    assert(
      `<view v-if="a"/>`,
      `isTrue(_ctx.a)
  ? _cE("view", _uM({ key: 0 }))
  : _cC("v-if", true)`
    )
    assert(
      `<view v-if="1==1"/>`,
      `1==1
  ? _cE("view", _uM({ key: 0 }))
  : _cC("v-if", true)`
    )
    assert(
      `<view v-if="a==1"/>`,
      `_ctx.a==1
  ? _cE("view", _uM({ key: 0 }))
  : _cC("v-if", true)`
    )
    assert(
      `<view v-if="a===1"/>`,
      `_ctx.a===1
  ? _cE("view", _uM({ key: 0 }))
  : _cC("v-if", true)`
    )
    assert(
      `<view v-if="a!=1"/>`,
      `_ctx.a!=1
  ? _cE("view", _uM({ key: 0 }))
  : _cC("v-if", true)`
    )
    assert(
      `<view v-if="a!==1"/>`,
      `_ctx.a!==1
  ? _cE("view", _uM({ key: 0 }))
  : _cC("v-if", true)`
    )
    assert(
      `<view v-if="a<1"/>`,
      `_ctx.a<1
  ? _cE("view", _uM({ key: 0 }))
  : _cC("v-if", true)`
    )
    assert(
      `<view v-if="a>1"/>`,
      `_ctx.a>1
  ? _cE("view", _uM({ key: 0 }))
  : _cC("v-if", true)`
    )
    assert(
      `<view v-if="a<=1"/>`,
      `_ctx.a<=1
  ? _cE("view", _uM({ key: 0 }))
  : _cC("v-if", true)`
    )
    assert(
      `<view v-if="a>=1"/>`,
      `_ctx.a>=1
  ? _cE("view", _uM({ key: 0 }))
  : _cC("v-if", true)`
    )
    assert(
      `<view v-if="a>=1"/><view v-else-if="a>=2"/>`,
      `_ctx.a>=1
  ? _cE("view", _uM({ key: 0 }))
  : _ctx.a>=2
    ? _cE("view", _uM({ key: 1 }))
    : _cC("v-if", true)`
    )
  })

  describe('transform', () => {
    test('basic v-if', () => {
      const { node } = parseWithIfTransform(`<view v-if="ok"/>`)
      expect(node.type).toBe(NodeTypes.IF)
      expect(node.branches.length).toBe(1)
      expect((node.branches[0].condition as SimpleExpressionNode).content).toBe(
        `ok`
      )
      expect(node.branches[0].children.length).toBe(1)
      expect(node.branches[0].children[0].type).toBe(NodeTypes.ELEMENT)
      expect((node.branches[0].children[0] as ElementNode).tag).toBe(`view`)
    })

    test('template v-if', () => {
      const { node } = parseWithIfTransform(
        `<template v-if="ok"><view/>hello<p/></template>`
      )
      expect(node.type).toBe(NodeTypes.IF)
      expect(node.branches.length).toBe(1)
      expect((node.branches[0].condition as SimpleExpressionNode).type).toBe(
        NodeTypes.SIMPLE_EXPRESSION
      )
      expect((node.branches[0].condition as SimpleExpressionNode).content).toBe(
        'ok'
      )
      expect(node.branches[0].children.length).toBe(3)
      expect(node.branches[0].children[0].type).toBe(NodeTypes.ELEMENT)
      expect((node.branches[0].children[0] as ElementNode).tag).toBe(`view`)
      expect(node.branches[0].children[1].type).toBe(NodeTypes.TEXT)
      expect((node.branches[0].children[1] as TextNode).content).toBe(`hello`)
      expect(node.branches[0].children[2].type).toBe(NodeTypes.ELEMENT)
      expect((node.branches[0].children[2] as ElementNode).tag).toBe(`p`)
    })

    test('component v-if', () => {
      const { node } = parseWithIfTransform(`<Component v-if="ok"></Component>`)
      expect(node.type).toBe(NodeTypes.IF)
      expect(node.branches.length).toBe(1)
      expect((node.branches[0].children[0] as ElementNode).tag).toBe(
        `Component`
      )
      expect((node.branches[0].children[0] as ElementNode).tagType).toBe(
        ElementTypes.COMPONENT
      )
      // #2058 since a component may fail to resolve and fallback to a plain
      // element, it still needs to be made a block
      expect(
        ((node.branches[0].children[0] as ElementNode)!
          .codegenNode as VNodeCall)!.isBlock
      ).toBe(true)
    })

    test('v-if + v-else', () => {
      const { node } = parseWithIfTransform(`<view v-if="ok"/><p v-else/>`)
      expect(node.type).toBe(NodeTypes.IF)
      expect(node.branches.length).toBe(2)

      const b1 = node.branches[0]
      expect((b1.condition as SimpleExpressionNode).content).toBe(`ok`)
      expect(b1.children.length).toBe(1)
      expect(b1.children[0].type).toBe(NodeTypes.ELEMENT)
      expect((b1.children[0] as ElementNode).tag).toBe(`view`)

      const b2 = node.branches[1]
      expect(b2.condition).toBeUndefined()
      expect(b2.children.length).toBe(1)
      expect(b2.children[0].type).toBe(NodeTypes.ELEMENT)
      expect((b2.children[0] as ElementNode).tag).toBe(`p`)
    })

    test('v-if + v-else-if', () => {
      const { node } = parseWithIfTransform(
        `<view v-if="ok"/><p v-else-if="orNot"/>`
      )
      expect(node.type).toBe(NodeTypes.IF)
      expect(node.branches.length).toBe(2)

      const b1 = node.branches[0]
      expect((b1.condition as SimpleExpressionNode).content).toBe(`ok`)
      expect(b1.children.length).toBe(1)
      expect(b1.children[0].type).toBe(NodeTypes.ELEMENT)
      expect((b1.children[0] as ElementNode).tag).toBe(`view`)

      const b2 = node.branches[1]
      expect((b2.condition as SimpleExpressionNode).content).toBe(`orNot`)
      expect(b2.children.length).toBe(1)
      expect(b2.children[0].type).toBe(NodeTypes.ELEMENT)
      expect((b2.children[0] as ElementNode).tag).toBe(`p`)
    })

    test('v-if + v-else-if + v-else', () => {
      const { node } = parseWithIfTransform(
        `<view v-if="ok"/><p v-else-if="orNot"/><template v-else>fine</template>`
      )
      expect(node.type).toBe(NodeTypes.IF)
      expect(node.branches.length).toBe(3)

      const b1 = node.branches[0]
      expect((b1.condition as SimpleExpressionNode).content).toBe(`ok`)
      expect(b1.children.length).toBe(1)
      expect(b1.children[0].type).toBe(NodeTypes.ELEMENT)
      expect((b1.children[0] as ElementNode).tag).toBe(`view`)

      const b2 = node.branches[1]
      expect((b2.condition as SimpleExpressionNode).content).toBe(`orNot`)
      expect(b2.children.length).toBe(1)
      expect(b2.children[0].type).toBe(NodeTypes.ELEMENT)
      expect((b2.children[0] as ElementNode).tag).toBe(`p`)

      const b3 = node.branches[2]
      expect(b3.condition).toBeUndefined()
      expect(b3.children.length).toBe(1)
      expect(b3.children[0].type).toBe(NodeTypes.TEXT)
      expect((b3.children[0] as TextNode).content).toBe(`fine`)
    })

    test('comment between branches', () => {
      const { node } = parseWithIfTransform(`
        <view v-if="ok"/>
        <!--foo-->
        <p v-else-if="orNot"/>
        <!--bar-->
        <template v-else>fine</template>
      `)
      expect(node.type).toBe(NodeTypes.IF)
      expect(node.branches.length).toBe(3)

      const b1 = node.branches[0]
      expect((b1.condition as SimpleExpressionNode).content).toBe(`ok`)
      expect(b1.children.length).toBe(1)
      expect(b1.children[0].type).toBe(NodeTypes.ELEMENT)
      expect((b1.children[0] as ElementNode).tag).toBe(`view`)

      const b2 = node.branches[1]
      expect((b2.condition as SimpleExpressionNode).content).toBe(`orNot`)
      expect(b2.children.length).toBe(1)
      expect(b2.children[0].type).toBe(NodeTypes.ELEMENT)
      expect((b2.children[0] as ElementNode).tag).toBe(`p`)

      const b3 = node.branches[2]
      expect(b3.condition).toBeUndefined()
      expect(b3.children.length).toBe(1)
      expect(b3.children[0].type).toBe(NodeTypes.TEXT)
      expect((b3.children[0] as TextNode).content).toBe(`fine`)
    })

    test('should prefix v-if condition', () => {
      const { node } = parseWithIfTransform(`<view v-if="ok"/>`, {
        prefixIdentifiers: true,
      })
      expect(node.branches[0].condition).toMatchObject({
        type: NodeTypes.SIMPLE_EXPRESSION,
        content: `_ctx.ok`,
      })
    })
  })

  describe('errors', () => {
    test('error on v-else missing adjacent v-if', () => {
      const onError = jest.fn()

      const { node: node1 } = parseWithIfTransform(`<view v-else/>`, {
        onError,
      })
      expect(onError.mock.calls[0]).toMatchObject([
        {
          code: ErrorCodes.X_V_ELSE_NO_ADJACENT_IF,
          loc: node1.loc,
        },
      ])

      const { node: node2 } = parseWithIfTransform(
        `<view/><view v-else/>`,
        { onError },
        1
      )
      expect(onError.mock.calls[1]).toMatchObject([
        {
          code: ErrorCodes.X_V_ELSE_NO_ADJACENT_IF,
          loc: node2.loc,
        },
      ])

      const { node: node3 } = parseWithIfTransform(
        `<view/>foo<view v-else/>`,
        { onError },
        2
      )
      expect(onError.mock.calls[2]).toMatchObject([
        {
          code: ErrorCodes.X_V_ELSE_NO_ADJACENT_IF,
          loc: node3.loc,
        },
      ])
    })

    test('error on v-else-if missing adjacent v-if or v-else-if', () => {
      const onError = jest.fn()

      const { node: node1 } = parseWithIfTransform(`<view v-else-if="foo"/>`, {
        onError,
      })
      expect(onError.mock.calls[0]).toMatchObject([
        {
          code: ErrorCodes.X_V_ELSE_NO_ADJACENT_IF,
          loc: node1.loc,
        },
      ])

      const { node: node2 } = parseWithIfTransform(
        `<view/><view v-else-if="foo"/>`,
        { onError },
        1
      )
      expect(onError.mock.calls[1]).toMatchObject([
        {
          code: ErrorCodes.X_V_ELSE_NO_ADJACENT_IF,
          loc: node2.loc,
        },
      ])

      const { node: node3 } = parseWithIfTransform(
        `<view/>foo<view v-else-if="foo"/>`,
        { onError },
        2
      )
      expect(onError.mock.calls[2]).toMatchObject([
        {
          code: ErrorCodes.X_V_ELSE_NO_ADJACENT_IF,
          loc: node3.loc,
        },
      ])

      const {
        node: { branches },
      } = parseWithIfTransform(
        `<view v-if="notOk"/><view v-else/><view v-else-if="ok"/>`,
        { onError },
        0
      )

      expect(onError.mock.calls[3]).toMatchObject([
        {
          code: ErrorCodes.X_V_ELSE_NO_ADJACENT_IF,
          loc: branches[branches.length - 1].loc,
        },
      ])
    })

    test('error on user key', () => {
      const onError = jest.fn()
      // dynamic
      parseWithIfTransform(
        `<view v-if="ok" :key="a + 1" /><view v-else :key="a + 1" />`,
        { onError }
      )
      expect(onError.mock.calls[0]).toMatchObject([
        {
          code: ErrorCodes.X_V_IF_SAME_KEY,
        },
      ])
      // static
      parseWithIfTransform(
        `<view v-if="ok" key="1" /><view v-else key="1" />`,
        {
          onError,
        }
      )
      expect(onError.mock.calls[1]).toMatchObject([
        {
          code: ErrorCodes.X_V_IF_SAME_KEY,
        },
      ])
    })
  })

  describe('codegen', () => {
    function assertSharedCodegen(
      node: IfConditionalExpression,
      depth: number = 0,
      hasElse: boolean = false
    ) {
      expect(node).toMatchObject({
        type: NodeTypes.JS_CONDITIONAL_EXPRESSION,
        test: {
          content: `ok`,
        },
        consequent: {
          type: NodeTypes.VNODE_CALL,
          isBlock: true,
        },
        alternate:
          depth < 1
            ? hasElse
              ? {
                  type: NodeTypes.VNODE_CALL,
                  isBlock: true,
                }
              : {
                  type: NodeTypes.JS_CALL_EXPRESSION,
                  callee: CREATE_COMMENT,
                }
            : {
                type: NodeTypes.JS_CONDITIONAL_EXPRESSION,
                test: {
                  content: `orNot`,
                },
                consequent: {
                  type: NodeTypes.VNODE_CALL,
                  isBlock: true,
                },
                alternate: hasElse
                  ? {
                      type: NodeTypes.VNODE_CALL,
                      isBlock: true,
                    }
                  : {
                      type: NodeTypes.JS_CALL_EXPRESSION,
                      callee: CREATE_COMMENT,
                    },
              },
      })
    }

    test('basic v-if', () => {
      const {
        root,
        node: { codegenNode },
      } = parseWithIfTransform(`<view v-if="ok"/>`)
      assertSharedCodegen(codegenNode)
      expect(codegenNode.consequent).toMatchObject({
        tag: `"view"`,
        props: createObjectMatcher({ key: `[0]` }),
      })
      expect(codegenNode.alternate).toMatchObject({
        type: NodeTypes.JS_CALL_EXPRESSION,
        callee: CREATE_COMMENT,
      })
      expect(generate(root, {} as any).code).toMatchSnapshot()
    })

    test('template v-if', () => {
      const {
        root,
        node: { codegenNode },
      } = parseWithIfTransform(
        `<template v-if="ok"><view/>hello<p/></template>`
      )
      assertSharedCodegen(codegenNode)
      expect(codegenNode.consequent).toMatchObject({
        type: NodeTypes.VNODE_CALL,
        tag: FRAGMENT,
        props: createObjectMatcher({ key: `[0]` }),
        children: [
          { type: NodeTypes.ELEMENT, tag: 'view' },
          { type: NodeTypes.TEXT, content: `hello` },
          { type: NodeTypes.ELEMENT, tag: 'p' },
        ],
      })
      expect(codegenNode.alternate).toMatchObject({
        type: NodeTypes.JS_CALL_EXPRESSION,
        callee: CREATE_COMMENT,
      })
      expect(generate(root, {} as any).code).toMatchSnapshot()
    })

    test('template v-if w/ single <slot/> child', () => {
      const {
        // root,
        node: { codegenNode },
      } = parseWithIfTransform(`<template v-if="ok"><slot/></template>`)
      expect(codegenNode.consequent).toMatchObject({
        type: NodeTypes.JS_CALL_EXPRESSION,
        callee: RENDER_SLOT,
        arguments: ['$slots', '"default"', createObjectMatcher({ key: `[0]` })],
      })
      // expect(generate(root, {} as any).code).toMatchSnapshot()
    })

    test('v-if on <slot/>', () => {
      const {
        root,
        node: { codegenNode },
      } = parseWithIfTransform(`<slot v-if="ok"></slot>`)
      expect(codegenNode.consequent).toMatchObject({
        type: NodeTypes.JS_CALL_EXPRESSION,
        callee: RENDER_SLOT,
        arguments: ['$slots', '"default"', createObjectMatcher({ key: `[0]` })],
      })
      expect(generate(root, {} as any).code).toMatchSnapshot()
    })

    test('v-if + v-else', () => {
      const {
        root,
        node: { codegenNode },
      } = parseWithIfTransform(`<view v-if="ok"/><p v-else/>`)
      assertSharedCodegen(codegenNode, 0, true)
      expect(codegenNode.consequent).toMatchObject({
        tag: `"view"`,
        props: createObjectMatcher({ key: `[0]` }),
      })
      expect(codegenNode.alternate).toMatchObject({
        tag: `"p"`,
        props: createObjectMatcher({ key: `[1]` }),
      })
      expect(generate(root, {} as any).code).toMatchSnapshot()
    })

    test('v-if + v-else-if', () => {
      const {
        root,
        node: { codegenNode },
      } = parseWithIfTransform(`<view v-if="ok"/><p v-else-if="orNot" />`)
      assertSharedCodegen(codegenNode, 1)
      expect(codegenNode.consequent).toMatchObject({
        tag: `"view"`,
        props: createObjectMatcher({ key: `[0]` }),
      })
      const branch2 = codegenNode.alternate as ConditionalExpression
      expect(branch2.consequent).toMatchObject({
        tag: `"p"`,
        props: createObjectMatcher({ key: `[1]` }),
      })
      expect(generate(root, {} as any).code).toMatchSnapshot()
    })

    test('v-if + v-else-if + v-else', () => {
      const {
        root,
        node: { codegenNode },
      } = parseWithIfTransform(
        `<view v-if="ok"/><p v-else-if="orNot"/><template v-else>fine</template>`
      )
      assertSharedCodegen(codegenNode, 1, true)
      expect(codegenNode.consequent).toMatchObject({
        tag: `"view"`,
        props: createObjectMatcher({ key: `[0]` }),
      })
      const branch2 = codegenNode.alternate as ConditionalExpression
      expect(branch2.consequent).toMatchObject({
        tag: `"p"`,
        props: createObjectMatcher({ key: `[1]` }),
      })
      expect(branch2.alternate).toMatchObject({
        tag: FRAGMENT,
        props: createObjectMatcher({ key: `[2]` }),
        children: [
          {
            type: NodeTypes.TEXT,
            content: `fine`,
          },
        ],
      })
      expect(generate(root, {} as any).code).toMatchSnapshot()
    })

    test('multiple v-if that are sibling nodes should have different keys', () => {
      const { root } = parseWithIfTransform(
        `<view v-if="ok"/><p v-if="orNot"/>`,
        {},
        0 /* returnIndex, just give the default value */,
        2 /* childrenLen */
      )

      const ifNode = root.children[0] as IfNode & {
        codegenNode: IfConditionalExpression
      }
      expect(ifNode.codegenNode.consequent).toMatchObject({
        tag: `"view"`,
        props: createObjectMatcher({ key: `[0]` }),
      })
      const ifNode2 = root.children[1] as IfNode & {
        codegenNode: IfConditionalExpression
      }
      expect(ifNode2.codegenNode.consequent).toMatchObject({
        tag: `"p"`,
        props: createObjectMatcher({ key: `[1]` }),
      })
      expect(generate(root, {} as any).code).toMatchSnapshot()
    })

    test('increasing key: v-if + v-else-if + v-else', () => {
      const { root } = parseWithIfTransform(
        `<view v-if="ok"/><p v-else/><view v-if="another"/><p v-else-if="orNot"/><p v-else/>`,
        {},
        0 /* returnIndex, just give the default value */,
        2 /* childrenLen */
      )
      const ifNode = root.children[0] as IfNode & {
        codegenNode: IfConditionalExpression
      }
      expect(ifNode.codegenNode.consequent).toMatchObject({
        tag: `"view"`,
        props: createObjectMatcher({ key: `[0]` }),
      })
      expect(ifNode.codegenNode.alternate).toMatchObject({
        tag: `"p"`,
        props: createObjectMatcher({ key: `[1]` }),
      })
      const ifNode2 = root.children[1] as IfNode & {
        codegenNode: IfConditionalExpression
      }
      expect(ifNode2.codegenNode.consequent).toMatchObject({
        tag: `"view"`,
        props: createObjectMatcher({ key: `[2]` }),
      })
      const branch = ifNode2.codegenNode.alternate as IfConditionalExpression
      expect(branch.consequent).toMatchObject({
        tag: `"p"`,
        props: createObjectMatcher({ key: `[3]` }),
      })
      expect(branch.alternate).toMatchObject({
        tag: `"p"`,
        props: createObjectMatcher({ key: `[4]` }),
      })
      expect(generate(root, {} as any).code).toMatchSnapshot()
    })

    test('key injection (only v-bind)', () => {
      const {
        node: { codegenNode },
      } = parseWithIfTransform(`<view v-if="ok" v-bind="obj"/>`)
      const branch1 = codegenNode.consequent as VNodeCall
      expect(branch1.props).toMatchObject({
        type: NodeTypes.JS_CALL_EXPRESSION,
        callee: NORMALIZE_PROPS,
        arguments: [
          {
            type: NodeTypes.JS_CALL_EXPRESSION,
            callee: MERGE_PROPS,
            arguments: [
              createObjectMatcher({ key: `[0]` }),
              { content: `obj` },
            ],
          },
        ],
      })
    })

    test('key injection (before v-bind)', () => {
      const {
        node: { codegenNode },
      } = parseWithIfTransform(`<view v-if="ok" id="foo" v-bind="obj"/>`)
      const branch1 = codegenNode.consequent as VNodeCall
      expect(branch1.props).toMatchObject({
        type: NodeTypes.JS_CALL_EXPRESSION,
        callee: MERGE_PROPS,
        arguments: [
          createObjectMatcher({
            key: '[0]',
            id: 'foo',
          }),
          { content: `obj` },
        ],
      })
    })

    test('key injection (after v-bind)', () => {
      const {
        node: { codegenNode },
      } = parseWithIfTransform(`<view v-if="ok" v-bind="obj" id="foo"/>`)
      const branch1 = codegenNode.consequent as VNodeCall
      expect(branch1.props).toMatchObject({
        type: NodeTypes.JS_CALL_EXPRESSION,
        callee: MERGE_PROPS,
        arguments: [
          createObjectMatcher({ key: `[0]` }),
          { content: `obj` },
          createObjectMatcher({
            id: 'foo',
          }),
        ],
      })
    })

    test('key injection (w/ custom directive)', () => {
      const {
        node: { codegenNode },
      } = parseWithIfTransform(`<view v-if="ok" v-foo />`)
      const branch1 = codegenNode.consequent as VNodeCall
      expect(branch1.directives).not.toBeUndefined()
      expect(branch1.props).toMatchObject(createObjectMatcher({ key: `[0]` }))
    })

    // #6631
    test('avoid duplicate keys', () => {
      const {
        node: { codegenNode },
      } = parseWithIfTransform(
        `<view v-if="ok" key="custom_key" v-bind="obj"/>`
      )
      const branch1 = codegenNode.consequent as VNodeCall
      expect(branch1.props).toMatchObject({
        type: NodeTypes.JS_CALL_EXPRESSION,
        callee: MERGE_PROPS,
        arguments: [
          createObjectMatcher({
            key: 'custom_key',
          }),
          { content: `obj` },
        ],
      })
    })

    test('with spaces between branches', () => {
      const {
        node: { codegenNode },
      } = parseWithIfTransform(
        `<view v-if="ok"/> <view v-else-if="no"/> <view v-else/>`
      )
      expect(codegenNode.consequent).toMatchObject({
        tag: `"view"`,
        props: createObjectMatcher({ key: `[0]` }),
      })
      const branch = codegenNode.alternate as ConditionalExpression
      expect(branch.consequent).toMatchObject({
        tag: `"view"`,
        props: createObjectMatcher({ key: `[1]` }),
      })
      expect(branch.alternate).toMatchObject({
        tag: `"view"`,
        props: createObjectMatcher({ key: `[2]` }),
      })
    })

    test('with comments', () => {
      const { node } = parseWithIfTransform(`
          <template v-if="ok">
            <!--comment1-->
            <view v-if="ok2">
              <!--comment2-->
            </view>
            <!--comment3-->
            <b v-else/>
            <!--comment4-->
            <p/>
          </template>
        `)
      expect(node.type).toBe(NodeTypes.IF)
      expect(node.branches.length).toBe(1)

      const b1 = node.branches[0]
      expect((b1.condition as SimpleExpressionNode).content).toBe(`ok`)
      expect(b1.children.length).toBe(4)

      expect(b1.children[0].type).toBe(NodeTypes.COMMENT)
      expect((b1.children[0] as CommentNode).content).toBe(`comment1`)

      expect(b1.children[1].type).toBe(NodeTypes.IF)
      expect((b1.children[1] as IfNode).branches.length).toBe(2)
      const b1b1: ElementNode = (b1.children[1] as IfNode).branches[0]
        .children[0] as ElementNode
      expect(b1b1.type).toBe(NodeTypes.ELEMENT)
      expect(b1b1.tag).toBe('view')
      expect(b1b1.children[0].type).toBe(NodeTypes.COMMENT)
      expect((b1b1.children[0] as CommentNode).content).toBe('comment2')

      const b1b2: IfBranchNode = (b1.children[1] as IfNode)
        .branches[1] as IfBranchNode
      expect(b1b2.children[0].type).toBe(NodeTypes.ELEMENT)
      expect((b1b2.children[0] as ElementNode).tag).toBe(`b`)

      expect(b1.children[2].type).toBe(NodeTypes.COMMENT)
      expect((b1.children[2] as CommentNode).content).toBe(`comment4`)

      expect(b1.children[3].type).toBe(NodeTypes.ELEMENT)
      expect((b1.children[3] as ElementNode).tag).toBe(`p`)
    })

    // #6843
    test('should parse correctly with comments: true in prod', () => {
      parseWithIfTransform(
        `
          <template v-if="ok">
            <!--comment1-->
            <view v-if="ok2">
              <!--comment2-->
            </view>
            <!--comment3-->
            <b v-else/>
            <!--comment4-->
            <p/>
          </template>
        `,
        { comments: true }
      )
    })
  })

  test('v-on with v-if', () => {
    const {
      node: { codegenNode },
    } = parseWithIfTransform(
      `<button v-on="{ click: clickEvent }" v-if="true">w/ v-if</button>`
    )

    expect((codegenNode.consequent as any).props.type).toBe(
      NodeTypes.JS_CALL_EXPRESSION
    )
    expect((codegenNode.consequent as any).props.callee).toBe(MERGE_PROPS)
    expect(
      (codegenNode.consequent as any).props.arguments[0].properties[0].value
        .content
    ).toBe('0')
    expect((codegenNode.consequent as any).props.arguments[1].callee).toBe(
      TO_HANDLERS
    )
  })
})
