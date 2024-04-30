import { ErrorCodes, type IfNode, NodeTypes } from '@vue/compiler-core'
import { compile } from '../src'
import type { CompilerOptions } from '../src/options'
import { assert } from './testUtils'

function compileWithIfTransform(
  template: string,
  options: CompilerOptions = {},
  returnIndex: number = 0,
  childrenLen: number = 1
) {
  const { ast } = compile(template, {
    generatorOpts: {
      concise: true,
    },
    ...options,
  })
  if (!options.onError) {
    expect(ast.children.length).toBe(childrenLen)
    for (let i = 0; i < childrenLen; i++) {
      expect(ast.children[i].type).toBe(NodeTypes.IF)
    }
  }
  return {
    root: ast,
    node: ast.children[returnIndex] as IfNode,
  }
}

describe(`compiler: v-if`, () => {
  describe(`codegen`, () => {
    test(`basic v-if`, () => {
      assert(
        `<view v-if="ok"/>`,
        `<view wx:if="{{a}}"/>`,
        `(_ctx, _cache) => {
  return _e({ a: _ctx.ok }, _ctx.ok ? {} : {})
}`
      )
    })
    test(`template v-if`, () => {
      assert(
        `<template v-if="ok"><view/>hello<view/></template>`,
        `<block wx:if="{{a}}"><view/>hello<view/></block>`,
        `(_ctx, _cache) => {
  return _e({ a: _ctx.ok }, _ctx.ok ? {} : {})
}`
      )
    })
    test(`template v-if w/ single <slot/> child`, () => {
      assert(
        `<template v-if="ok"><slot/></template>`,
        `<block wx:if="{{a}}"><slot/></block>`,
        `(_ctx, _cache) => {
  return _e({ a: _ctx.ok }, _ctx.ok ? {} : {})
}`
      )
    })
    test(`v-if on <slot/>`, () => {
      assert(
        `<slot v-if="ok"/>`,
        `<slot wx:if="{{a}}"/>`,
        `(_ctx, _cache) => {
  return _e({ a: _ctx.ok }, _ctx.ok ? {} : {})
}`
      )
    })
    test(`component v-if`, () => {
      //       assert(
      //         `<Component v-if="ok"></Component>`,
      //         `<Component wx:if="{{a}}"></Component>`,
      //         `(_ctx, _cache) => {
      //   return _e({ a: _ctx.ok }, _ctx.ok ? {} : {})
      // }`
      //       )
    })
    test(`v-if + v-else`, () => {
      assert(
        `<view v-if="ok"/><view v-else/>`,
        `<view wx:if="{{a}}"/><view wx:else/>`,
        `(_ctx, _cache) => {
  return _e({ a: _ctx.ok }, _ctx.ok ? {} : {})
}`
      )
    })
    test(`v-if + v-else-if`, () => {
      assert(
        `<view v-if="ok"/><view v-else-if="orNot"/>`,
        `<view wx:if="{{a}}"/><view wx:elif="{{b}}"/>`,
        `(_ctx, _cache) => {
  return _e({ a: _ctx.ok }, _ctx.ok ? {} : _ctx.orNot ? {} : {}, { b: _ctx.orNot })
}`
      )
    })
    test(`v-if + v-else-if + v-else`, () => {
      assert(
        `<view v-if="ok"/><view v-else-if="orNot"/><template v-else>fine</template>`,
        `<view wx:if="{{a}}"/><view wx:elif="{{b}}"/><block wx:else>fine</block>`,
        `(_ctx, _cache) => {
  return _e({ a: _ctx.ok }, _ctx.ok ? {} : _ctx.orNot ? {} : {}, { b: _ctx.orNot })
}`
      )
    })
    test(`multiple v-if that are sibling nodes should have different keys`, () => {
      // <div v-if="ok"/><p v-if="orNot"/>
    })
    test(`increasing key: v-if + v-else-if + v-else`, () => {
      // <div v-if="ok"/><p v-else/><div v-if="another"/><p v-else-if="orNot"/><p v-else/>
    })
    test(`key injection (only v-bind)`, () => {
      // <div v-if="ok" v-bind="obj"/>
    })
    test(`key injection (before v-bind)`, () => {
      // <div v-if="ok" id="foo" v-bind="obj"/>
    })
    test(`key injection (after v-bind)`, () => {
      // <div v-if="ok" v-bind="obj" id="foo"/>
    })
    test(`key injection (w/ custom directive)`, () => {
      // <div v-if="ok" v-foo />
    })
    test(`v-if + v-else-if + v-else-if + v-else`, () => {
      assert(
        `<view v-if="ok"/><view v-else-if="orNot"/><view v-else-if="3"/><template v-else>fine</template>`,
        `<view wx:if="{{a}}"/><view wx:elif="{{b}}"/><view wx:elif="{{3}}"/><block wx:else>fine</block>`,
        `(_ctx, _cache) => {
  return _e({ a: _ctx.ok }, _ctx.ok ? {} : _ctx.orNot ? {} : 3 ? {} : {}, { b: _ctx.orNot })
}`
      )
    })
    test(`comment between branches`, () => {
      assert(
        `
        <view v-if="ok"/>
        <!--foo-->
        <view v-else-if="orNot"/>
        <!--bar-->
        <template v-else>fine</template>
      `,
        `<view wx:if="{{a}}"/><view wx:elif="{{b}}"/><block wx:else>fine</block>`,
        `(_ctx, _cache) => {
  return _e({ a: _ctx.ok }, _ctx.ok ? {} : _ctx.orNot ? {} : {}, { b: _ctx.orNot })
}`
      )
    })
    test(`with spaces between branches`, () => {
      assert(
        `<view v-if="ok"/> <view v-else-if="no"/> <view v-else/>`,
        `<view wx:if="{{a}}"/><view wx:elif="{{b}}"/><view wx:else/>`,
        `(_ctx, _cache) => {
  return _e({ a: _ctx.ok }, _ctx.ok ? {} : _ctx.no ? {} : {}, { b: _ctx.no })
}`
      )
    })
    test(`with comments`, () => {
      assert(
        `
        <template v-if="ok">
        <!--comment1-->
        <view v-if="ok2">
          <!--comment2-->
        </view>
        <!--comment3-->
        <view v-else/>
        <!--comment4-->
        <view/>
      </template>
        `,
        `<block wx:if="{{a}}"><view wx:if="{{b}}"></view><view wx:else/><view/></block>`,
        `(_ctx, _cache) => {
  return _e({ a: _ctx.ok }, _ctx.ok ? _e({ b: _ctx.ok2 }, _ctx.ok2 ? {} : {}) : {})
}`
      )
    })
    test(`v-on with v-if`, () => {
      // <button v-on="{ click: clickEvent }" v-if="true">w/ v-if</button>
    })

    test(`v-for + v-if + v-else`, () => {
      assert(
        `<view v-for="item in items"><uni-icons v-if="ok"/><uni-icons v-else :title="item.title"/></view>`,
        `<view wx:for="{{a}}" wx:for-item="item"><uni-icons wx:if="{{b}}" u-i="{{item.a}}"/><uni-icons wx:else u-i="{{item.b}}" u-p="{{item.c||''}}"/></view>`,
        `(_ctx, _cache) => {
  return { a: _f(_ctx.items, (item, k0, i0) => { return _ctx.ok ? { a: '2a9ec0b0-0' + '-' + i0 } : { b: '2a9ec0b0-1' + '-' + i0, c: _p({ title: item.title }) }; }), b: _ctx.ok }
}`
      )
    })
  })

  describe('errors', () => {
    test('error on v-else missing adjacent v-if', () => {
      const onError = jest.fn()

      const { node: node1 } = compileWithIfTransform(`<view v-else/>`, {
        onError,
      })
      expect(onError.mock.calls[0]).toMatchObject([
        {
          code: ErrorCodes.X_V_ELSE_NO_ADJACENT_IF,
          loc: node1.loc,
        },
      ])

      const { node: node2 } = compileWithIfTransform(
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

      const { node: node3 } = compileWithIfTransform(
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

      const { node: node1 } = compileWithIfTransform(
        `<view v-else-if="foo"/>`,
        {
          onError,
        }
      )
      expect(onError.mock.calls[0]).toMatchObject([
        {
          code: ErrorCodes.X_V_ELSE_NO_ADJACENT_IF,
          loc: node1.loc,
        },
      ])

      const { node: node2 } = compileWithIfTransform(
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

      const { node: node3 } = compileWithIfTransform(
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
      } = compileWithIfTransform(
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

    // test('error on user key', () => {
    //   const onError = jest.fn()
    //   // dynamic
    //   compileWithIfTransform(
    //     `<view v-if="ok" :key="a + 1" /><view v-else :key="a + 1" />`,
    //     { onError }
    //   )
    //   expect(onError.mock.calls[0]).toMatchObject([
    //     {
    //       code: ErrorCodes.X_V_IF_SAME_KEY,
    //     },
    //   ])
    //   // static
    //   compileWithIfTransform(
    //     `<view v-if="ok" key="1" /><view v-else key="1" />`,
    //     {
    //       onError,
    //     }
    //   )
    //   expect(onError.mock.calls[1]).toMatchObject([
    //     {
    //       code: ErrorCodes.X_V_IF_SAME_KEY,
    //     },
    //   ])
    // })
  })
})
