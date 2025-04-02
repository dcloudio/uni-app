import { extend } from '@vue/shared'
import {
  type CompilerOptions,
  type ElementNode,
  ErrorCodes,
  NodeTypes,
  type ObjectExpression,
  TO_HANDLER_KEY,
  type VNodeCall,
  helperNameMap,
  baseParse as parse,
  transform,
  transformElement,
} from '@vue/compiler-core'
import { transformOn } from '../../../src/plugins/android/uvue/compiler/transforms/vOn'
import { transformExpression } from '../../../src/plugins/android/uvue/compiler/transforms/transformExpression'
import { assert } from '../testUtils'

function parseWithVOn(template: string, options: CompilerOptions = {}) {
  const ast = parse(template, options)
  transform(
    ast,
    extend({}, options, {
      prefixIdentifiers: options.prefixIdentifiers,
      nodeTransforms: [transformExpression, transformElement],
      directiveTransforms: {
        on: transformOn,
      },
      ...options,
    })
  )
  return {
    root: ast,
    node: ast.children[0] as ElementNode,
  }
}

describe('compiler: v-on', () => {
  test('basic', () => {
    assert(
      `<text v-on:click="() => console.log('v-on:click')"/>`,
      `createElementVNode("text", utsMapOf({
  onClick: () => console.log('v-on:click')
}), null, 8 /* PROPS */, ["onClick"])`
    )
    assert(
      `<text v-on:click="onClick"/>`,
      `createElementVNode("text", utsMapOf({ onClick: _ctx.onClick }), null, 8 /* PROPS */, ["onClick"])`
    )
  })
  test('dynamic arg', () => {
    assert(
      `<text v-on:[event]="handler"/>`,
      `createElementVNode("text", utsMapOf({ [toHandlerKey(_ctx.event)]: _ctx.handler }), null, 16 /* FULL_PROPS */)`
    )
  })
  test('dynamic arg with complex exp', () => {
    assert(
      `<text v-on:[event(foo)]="handler"/>`,
      `createElementVNode("text", utsMapOf({ [toHandlerKey(_ctx.event(_ctx.foo))]: _ctx.handler }), null, 16 /* FULL_PROPS */)`
    )
  })
  test('shorthand', () => {
    assert(
      `<text @click="() => console.warn('@click')"/>`,
      `createElementVNode("text", utsMapOf({
  onClick: () => console.warn('@click')
}), null, 8 /* PROPS */, ["onClick"])`
    )
  })
  test('inline statement handler', () => {
    assert(
      `<text @click="count++"/>`,
      `createElementVNode("text", utsMapOf({
  onClick: () => {_ctx.count++}
}), null, 8 /* PROPS */, ["onClick"])`
    )
  })
  test('should handle multi-line statement', () => {
    assert(
      `<text @click="\nfoo();\nbar()\n"/>`,
      `createElementVNode(\"text\", utsMapOf({
  onClick: () => {
_ctx.foo();
_ctx.bar()
}
}), null, 8 /* PROPS */, [\"onClick\"])`
    )
    assert(
      `<text @click="a.get('b' + c)()"/>`,
      `createElementVNode("text", utsMapOf({
  onClick: () => {_ctx.a.get('b' + _ctx.c)()}
}), null, 8 /* PROPS */, [\"onClick\"])`
    )
  })
  test('inline statement with argument $event', () => {
    assert(
      `<text @click="foo($event as MouseEvent)"/>`,
      `createElementVNode(\"text\", utsMapOf({
  onClick: ($event: any) => {_ctx.foo($event as MouseEvent)}
}), null, 8 /* PROPS */, [\"onClick\"])`
    )
  })
  test('should NOT wrap as function if expression is already function expression', () => {
    assert(
      `<text @click="($event: MouseEvent) => foo($event)"/>`,
      `createElementVNode(\"text\", utsMapOf({
  onClick: ($event: MouseEvent) => _ctx.foo($event)
}), null, 8 /* PROPS */, [\"onClick\"])`
    )
  })
  test('should NOT wrap as function if expression is already function expression (with newlines)', () => {
    assert(
      `<text @click="
      ($event: MouseEvent) => {
        foo($event)
      }
    "/>`,
      `createElementVNode(\"text\", utsMapOf({
  onClick: 
      ($event: MouseEvent) => {
        _ctx.foo($event)
      }
    
}), null, 8 /* PROPS */, [\"onClick\"])`
    )
  })
  test('should NOT wrap as function if expression is already function expression (with newlines + function keyword)', () => {
    assert(
      `<text @click="
      function($event: MouseEvent) {
        foo($event)
      }
    "/>`,
      `createElementVNode(\"text\", utsMapOf({
  onClick: 
      function($event: MouseEvent) {
        _ctx.foo($event)
      }
    
}), null, 8 /* PROPS */, [\"onClick\"])`
    )
  })
  test('should NOT wrap as function if expression is complex member expression', () => {
    assert(
      `<text @click="a['b' + c]"/>`,
      `createElementVNode("text", utsMapOf({
  onClick: _ctx.a['b' + _ctx.c]
}), null, 8 /* PROPS */, [\"onClick\"])`
    )
  })
  test('case conversion for vnode hooks', () => {
    assert(
      `<text v-on:vue:mounted="onMount" @vue:before-update="onBeforeUpdate" />`,
      `createElementVNode("text", utsMapOf({
  onVnodeMounted: _ctx.onMount,
  onVnodeBeforeUpdate: _ctx.onBeforeUpdate
}), null, 8 /* PROPS */, ["onVnodeMounted", "onVnodeBeforeUpdate"])`
    )
  })
  test('inline function expression handler', () => {
    assert(
      `<text v-on:click="() => foo()" />`,
      `createElementVNode("text", utsMapOf({
  onClick: () => _ctx.foo()
}), null, 8 /* PROPS */, ["onClick"])`
    )
    assert(
      `<input @input="$emit('update:modelValue', $event.detail.value)" />`,
      `createElementVNode("input", utsMapOf({
  onInput: ($event: UniInputEvent) => {_ctx.$emit('update:modelValue', $event.detail.value)}
}), null, 40 /* PROPS, NEED_HYDRATION */, ["onInput"])`
    )
  })
  test('object syntax', () => {
    assert(
      `<text v-on="{mousedown: doThis, mouseup: doThat}"/>`,
      `createElementVNode("text", toHandlers(utsMapOf({mousedown: _ctx.doThis, mouseup: _ctx.doThat}), true), null, 16 /* FULL_PROPS */)`
    )
  })
  test('empty object syntax', () => {
    assert(
      `<text v-on="{ }"/>`,
      `createElementVNode("text", toHandlers(utsMapOf<string, any | null>({ }), true), null, 16 /* FULL_PROPS */)`
    )
  })
  test('simple object syntax', () => {
    assert(
      `<text v-on="{'a':'aaa'}"/>`,
      `createElementVNode("text", toHandlers(utsMapOf({'a':'aaa'}), true), null, 16 /* FULL_PROPS */)`
    )
  })
  test('parameter with type', () => {
    assert(
      `<text @click="(e: any) => click(e)" />`,
      `createElementVNode(\"text\", utsMapOf({
  onClick: (e: any) => _ctx.click(e)
}), null, 8 /* PROPS */, [\"onClick\"])`
    )
    assert(
      `<textarea @input="(e: any) => input(e)" />`,
      `createElementVNode(\"textarea\", utsMapOf({
  onInput: (e: any) => _ctx.input(e)
}), null, 40 /* PROPS, NEED_HYDRATION */, [\"onInput\"])`
    )
  })

  test('basic', () => {
    const { node } = parseWithVOn(`<view v-on:click="onClick"/>`)
    expect((node.codegenNode as VNodeCall).props).toMatchObject({
      properties: [
        {
          key: {
            content: `onClick`,
            isStatic: true,
            loc: {
              start: {
                line: 1,
                column: 12,
              },
              end: {
                line: 1,
                column: 17,
              },
            },
          },
          value: {
            content: `onClick`,
            isStatic: false,
            loc: {
              start: {
                line: 1,
                column: 19,
              },
              end: {
                line: 1,
                column: 26,
              },
            },
          },
        },
      ],
    })
  })

  test('dynamic arg', () => {
    const { node } = parseWithVOn(`<view v-on:[event]="handler"/>`)
    expect((node.codegenNode as VNodeCall).props).toMatchObject({
      properties: [
        {
          key: {
            type: NodeTypes.COMPOUND_EXPRESSION,
            children: [
              `_${helperNameMap[TO_HANDLER_KEY]}(`,
              { content: `event` },
              `)`,
            ],
          },
          value: {
            type: NodeTypes.SIMPLE_EXPRESSION,
            content: `handler`,
            isStatic: false,
          },
        },
      ],
    })
  })

  test('dynamic arg with prefixing', () => {
    const { node } = parseWithVOn(`<view v-on:[event]="handler"/>`, {
      prefixIdentifiers: true,
    })
    expect((node.codegenNode as VNodeCall).props).toMatchObject({
      properties: [
        {
          key: {
            type: NodeTypes.COMPOUND_EXPRESSION,
            children: [
              `_${helperNameMap[TO_HANDLER_KEY]}(`,
              { content: `_ctx.event` },
              `)`,
            ],
          },
          value: {
            type: NodeTypes.SIMPLE_EXPRESSION,
            content: `_ctx.handler`,
            isStatic: false,
          },
        },
      ],
    })
  })

  test('dynamic arg with complex exp prefixing', () => {
    const { node } = parseWithVOn(`<view v-on:[event(foo)]="handler"/>`, {
      prefixIdentifiers: true,
    })
    expect((node.codegenNode as VNodeCall).props).toMatchObject({
      properties: [
        {
          key: {
            type: NodeTypes.COMPOUND_EXPRESSION,
            children: [
              `_${helperNameMap[TO_HANDLER_KEY]}(`,
              { content: `_ctx.event` },
              `(`,
              { content: `_ctx.foo` },
              `)`,
              `)`,
            ],
          },
          value: {
            type: NodeTypes.SIMPLE_EXPRESSION,
            content: `_ctx.handler`,
            isStatic: false,
          },
        },
      ],
    })
  })

  test('should wrap as function if expression is inline statement', () => {
    const { node } = parseWithVOn(`<view @click="i++"/>`)
    expect((node.codegenNode as VNodeCall).props).toMatchObject({
      properties: [
        {
          key: { content: `onClick` },
          value: {
            type: NodeTypes.COMPOUND_EXPRESSION,
            children: [`() => {`, { content: `i++` }, `}`],
          },
        },
      ],
    })
  })

  test('should handle multiple inline statement', () => {
    const { node } = parseWithVOn(`<view @click="foo();bar()"/>`)
    expect((node.codegenNode as VNodeCall).props).toMatchObject({
      properties: [
        {
          key: { content: `onClick` },
          value: {
            type: NodeTypes.COMPOUND_EXPRESSION,
            // should wrap with `{` for multiple statements
            // in this case the return value is discarded and the behavior is
            // consistent with 2.x
            children: [`() => {`, { content: `foo();bar()` }, `}`],
          },
        },
      ],
    })
  })

  test('should handle multi-line statement', () => {
    const { node } = parseWithVOn(`<view @click="\nfoo();\nbar()\n"/>`)
    expect((node.codegenNode as VNodeCall).props).toMatchObject({
      properties: [
        {
          key: { content: `onClick` },
          value: {
            type: NodeTypes.COMPOUND_EXPRESSION,
            // should wrap with `{` for multiple statements
            // in this case the return value is discarded and the behavior is
            // consistent with 2.x
            children: [`() => {`, { content: `\nfoo();\nbar()\n` }, `}`],
          },
        },
      ],
    })
  })

  test('inline statement w/ prefixIdentifiers: true', () => {
    const { node } = parseWithVOn(`<view @click="foo($event)"/>`, {
      prefixIdentifiers: true,
    })
    expect((node.codegenNode as VNodeCall).props).toMatchObject({
      properties: [
        {
          key: { content: `onClick` },
          value: {
            type: NodeTypes.COMPOUND_EXPRESSION,
            children: [
              `($event: any) => {`,
              {
                type: NodeTypes.COMPOUND_EXPRESSION,
                children: [
                  { content: `_ctx.foo` },
                  `(`,
                  // should NOT prefix $event
                  { content: `$event` },
                  `)`,
                ],
              },
              `}`,
            ],
          },
        },
      ],
    })
  })

  test('multiple inline statements w/ prefixIdentifiers: true', () => {
    const { node } = parseWithVOn(`<view @click="foo($event);bar()"/>`, {
      prefixIdentifiers: true,
    })
    expect((node.codegenNode as VNodeCall).props).toMatchObject({
      properties: [
        {
          key: { content: `onClick` },
          value: {
            type: NodeTypes.COMPOUND_EXPRESSION,
            children: [
              `($event: any) => {`,
              {
                children: [
                  { content: `_ctx.foo` },
                  `(`,
                  // should NOT prefix $event
                  { content: `$event` },
                  `);`,
                  { content: `_ctx.bar` },
                  `()`,
                ],
              },
              `}`,
            ],
          },
        },
      ],
    })
  })

  test('should NOT wrap as function if expression is already function expression', () => {
    const { node } = parseWithVOn(`<view @click="$event => foo($event)"/>`)
    expect((node.codegenNode as VNodeCall).props).toMatchObject({
      properties: [
        {
          key: { content: `onClick` },
          value: {
            type: NodeTypes.SIMPLE_EXPRESSION,
            content: `$event => foo($event)`,
          },
        },
      ],
    })
  })

  test('should NOT wrap as function if expression is already function expression (with Typescript)', () => {
    const { node } = parseWithVOn(`<view @click="(e: any): any => foo(e)"/>`)
    expect((node.codegenNode as VNodeCall).props).toMatchObject({
      properties: [
        {
          key: { content: `onClick` },
          value: {
            type: NodeTypes.SIMPLE_EXPRESSION,
            content: `(e: any): any => foo(e)`,
          },
        },
      ],
    })
  })

  test('should NOT wrap as function if expression is already function expression (with newlines)', () => {
    const { node } = parseWithVOn(
      `<view @click="
      $event => {
        foo($event)
      }
    "/>`
    )
    expect((node.codegenNode as VNodeCall).props).toMatchObject({
      properties: [
        {
          key: { content: `onClick` },
          value: {
            type: NodeTypes.SIMPLE_EXPRESSION,
            content: `
      $event => {
        foo($event)
      }
    `,
          },
        },
      ],
    })
  })

  test('should NOT wrap as function if expression is already function expression (with newlines + function keyword)', () => {
    const { node } = parseWithVOn(
      `<view @click="
      function($event) {
        foo($event)
      }
    "/>`
    )
    expect((node.codegenNode as VNodeCall).props).toMatchObject({
      properties: [
        {
          key: { content: `onClick` },
          value: {
            type: NodeTypes.SIMPLE_EXPRESSION,
            content: `
      function($event) {
        foo($event)
      }
    `,
          },
        },
      ],
    })
  })

  test('should NOT wrap as function if expression is complex member expression', () => {
    const { node } = parseWithVOn(`<view @click="a['b' + c]"/>`)
    expect((node.codegenNode as VNodeCall).props).toMatchObject({
      properties: [
        {
          key: { content: `onClick` },
          value: {
            type: NodeTypes.SIMPLE_EXPRESSION,
            content: `a['b' + c]`,
          },
        },
      ],
    })
  })

  test('complex member expression w/ prefixIdentifiers: true', () => {
    const { node } = parseWithVOn(`<view @click="a['b' + c]"/>`, {
      prefixIdentifiers: true,
    })
    expect((node.codegenNode as VNodeCall).props).toMatchObject({
      properties: [
        {
          key: { content: `onClick` },
          value: {
            type: NodeTypes.COMPOUND_EXPRESSION,
            children: [
              { content: `_ctx.a` },
              `['b' + `,
              { content: `_ctx.c` },
              `]`,
            ],
          },
        },
      ],
    })
  })

  test('function expression w/ prefixIdentifiers: true', () => {
    const { node } = parseWithVOn(`<view @click="e => foo(e)"/>`, {
      prefixIdentifiers: true,
    })
    expect((node.codegenNode as VNodeCall).props).toMatchObject({
      properties: [
        {
          key: { content: `onClick` },
          value: {
            type: NodeTypes.COMPOUND_EXPRESSION,
            children: [
              { content: `e` },
              ` => `,
              { content: `_ctx.foo` },
              `(`,
              { content: `e` },
              `)`,
            ],
          },
        },
      ],
    })
  })

  test('should error if no expression AND no modifier', () => {
    const onError = jest.fn()
    parseWithVOn(`<view v-on:click />`, { onError })
    expect(onError.mock.calls[0][0]).toMatchObject({
      code: ErrorCodes.X_V_ON_NO_EXPRESSION,
      loc: {
        start: {
          line: 1,
          column: 7,
        },
        end: {
          line: 1,
          column: 17,
        },
      },
    })
  })

  test('should NOT error if no expression but has modifier', () => {
    const onError = jest.fn()
    parseWithVOn(`<view v-on:click.prevent />`, { onError })
    expect(onError).not.toHaveBeenCalled()
  })

  test('case conversion for kebab-case events', () => {
    const { node } = parseWithVOn(`<view v-on:foo-bar="onMount"/>`)
    expect((node.codegenNode as VNodeCall).props).toMatchObject({
      properties: [
        {
          key: {
            content: `onFooBar`,
          },
          value: {
            content: `onMount`,
          },
        },
      ],
    })
  })

  // TODO remove in 3.4
  test('case conversion for vnode hooks', () => {
    const { node } = parseWithVOn(`<view v-on:vnode-mounted="onMount"/>`)
    expect((node.codegenNode as VNodeCall).props).toMatchObject({
      properties: [
        {
          key: {
            content: `onVnodeMounted`,
          },
          value: {
            content: `onMount`,
          },
        },
      ],
    })
  })

  test('vue: prefixed events', () => {
    const { node } = parseWithVOn(
      `<view v-on:vue:mounted="onMount" @vue:before-update="onBeforeUpdate" />`
    )
    expect((node.codegenNode as VNodeCall).props).toMatchObject({
      properties: [
        {
          key: {
            content: `onVnodeMounted`,
          },
          value: {
            content: `onMount`,
          },
        },
        {
          key: {
            content: `onVnodeBeforeUpdate`,
          },
          value: {
            content: `onBeforeUpdate`,
          },
        },
      ],
    })
  })

  describe('cacheHandler', () => {
    test('empty handler', () => {
      const { root, node } = parseWithVOn(`<view v-on:click.prevent />`, {
        prefixIdentifiers: true,
        cacheHandlers: true,
      })
      expect(root.cached).toBe(1)
      const vnodeCall = node.codegenNode as VNodeCall
      // should not treat cached handler as dynamicProp, so no flags
      expect(vnodeCall.patchFlag).toBeUndefined()
      expect(
        (vnodeCall.props as ObjectExpression).properties[0].value
      ).toMatchObject({
        type: NodeTypes.JS_CACHE_EXPRESSION,
        index: 0,
        value: {
          type: NodeTypes.SIMPLE_EXPRESSION,
          content: `() => {}`,
        },
      })
    })

    test('member expression handler', () => {
      const { root, node } = parseWithVOn(`<view v-on:click="foo" />`, {
        prefixIdentifiers: true,
        cacheHandlers: true,
      })
      expect(root.cached).toBe(1)
      const vnodeCall = node.codegenNode as VNodeCall
      // should not treat cached handler as dynamicProp, so no flags
      expect(vnodeCall.patchFlag).toBeUndefined()
      expect(
        (vnodeCall.props as ObjectExpression).properties[0].value
      ).toMatchObject({
        type: NodeTypes.JS_CACHE_EXPRESSION,
        index: 0,
        value: {
          type: NodeTypes.COMPOUND_EXPRESSION,
          children: [
            `(...args) => {`,
            { content: `_ctx.foo && _ctx.foo(...args)` },
            `}`,
          ],
        },
      })
    })

    test('compound member expression handler', () => {
      const { root, node } = parseWithVOn(`<view v-on:click="foo.bar" />`, {
        prefixIdentifiers: true,
        cacheHandlers: true,
      })
      expect(root.cached).toBe(1)
      const vnodeCall = node.codegenNode as VNodeCall
      // should not treat cached handler as dynamicProp, so no flags
      expect(vnodeCall.patchFlag).toBeUndefined()
      expect(
        (vnodeCall.props as ObjectExpression).properties[0].value
      ).toMatchObject({
        type: NodeTypes.JS_CACHE_EXPRESSION,
        index: 0,
        value: {
          type: NodeTypes.COMPOUND_EXPRESSION,
          children: [
            `(...args) => {`,
            {
              children: [
                { content: `_ctx.foo` },
                `.`,
                { content: `bar` },
                ` && `,
                { content: `_ctx.foo` },
                `.`,
                { content: `bar` },
                `(...args)`,
              ],
            },
            `}`,
          ],
        },
      })
    })

    test('bail on component member expression handler', () => {
      const { root } = parseWithVOn(`<comp v-on:click="foo" />`, {
        prefixIdentifiers: true,
        cacheHandlers: true,
        isNativeTag: (tag: string) => tag === 'view',
      })
      expect(root.cached).toBe(0)
    })

    test('should not be cached inside v-once', () => {
      const { root } = parseWithVOn(
        `<view v-once><view v-on:click="foo"/></view>`,
        {
          prefixIdentifiers: true,
          cacheHandlers: true,
        }
      )
      expect(root.cached).not.toBe(2)
      expect(root.cached).toBe(1)
    })

    test('inline function expression handler', () => {
      const { root, node } = parseWithVOn(`<view v-on:click="() => foo()" />`, {
        prefixIdentifiers: true,
        cacheHandlers: true,
      })
      expect(root.cached).toBe(1)
      const vnodeCall = node.codegenNode as VNodeCall
      // should not treat cached handler as dynamicProp, so no flags
      expect(vnodeCall.patchFlag).toBeUndefined()
      expect(
        (vnodeCall.props as ObjectExpression).properties[0].value
      ).toMatchObject({
        type: NodeTypes.JS_CACHE_EXPRESSION,
        index: 0,
        value: {
          type: NodeTypes.COMPOUND_EXPRESSION,
          children: [`() => `, { content: `_ctx.foo` }, `()`],
        },
      })
    })

    test('inline async arrow function expression handler', () => {
      const { root, node } = parseWithVOn(
        `<view v-on:click="async () => await foo()" />`,
        {
          prefixIdentifiers: true,
          cacheHandlers: true,
        }
      )
      expect(root.cached).toBe(1)
      const vnodeCall = node.codegenNode as VNodeCall
      // should not treat cached handler as dynamicProp, so no flags
      expect(vnodeCall.patchFlag).toBeUndefined()
      expect(
        (vnodeCall.props as ObjectExpression).properties[0].value
      ).toMatchObject({
        type: NodeTypes.JS_CACHE_EXPRESSION,
        index: 0,
        value: {
          type: NodeTypes.COMPOUND_EXPRESSION,
          children: [`async () => await `, { content: `_ctx.foo` }, `()`],
        },
      })
    })

    test('inline async function expression handler', () => {
      const { root, node } = parseWithVOn(
        `<view v-on:click="async function () { await foo() } " />`,
        {
          prefixIdentifiers: true,
          cacheHandlers: true,
        }
      )
      expect(root.cached).toBe(1)
      const vnodeCall = node.codegenNode as VNodeCall
      // should not treat cached handler as dynamicProp, so no flags
      expect(vnodeCall.patchFlag).toBeUndefined()
      expect(
        (vnodeCall.props as ObjectExpression).properties[0].value
      ).toMatchObject({
        type: NodeTypes.JS_CACHE_EXPRESSION,
        index: 0,
        value: {
          type: NodeTypes.COMPOUND_EXPRESSION,
          children: [
            `async function () { await `,
            { content: `_ctx.foo` },
            `() } `,
          ],
        },
      })
    })

    test('inline statement handler', () => {
      const { root, node } = parseWithVOn(`<view v-on:click="foo++" />`, {
        prefixIdentifiers: true,
        cacheHandlers: true,
      })
      expect(root.cached).toBe(1)
      expect(root.cached).toBe(1)
      const vnodeCall = node.codegenNode as VNodeCall
      // should not treat cached handler as dynamicProp, so no flags
      expect(vnodeCall.patchFlag).toBeUndefined()
      expect(
        (vnodeCall.props as ObjectExpression).properties[0].value
      ).toMatchObject({
        type: NodeTypes.JS_CACHE_EXPRESSION,
        index: 0,
        value: {
          type: NodeTypes.COMPOUND_EXPRESSION,
          children: [
            `() => {`,
            { children: [{ content: `_ctx.foo` }, `++`] },
            `}`,
          ],
        },
      })
    })
  })
})
