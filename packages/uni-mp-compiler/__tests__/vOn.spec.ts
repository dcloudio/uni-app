import { type ElementNode, ErrorCodes } from '@vue/compiler-core'
import { compile } from '../src'
import type { CompilerOptions } from '../src/options'
import { assert } from './testUtils'

function parseWithVOn(template: string, options: CompilerOptions = {}) {
  const { ast } = compile(template, {
    generatorOpts: {
      concise: true,
    },
    ...options,
  })
  return {
    root: ast,
    node: ast.children[0] as ElementNode,
  }
}

describe('compiler: transform v-on', () => {
  test('basic', () => {
    assert(
      `<view v-on:click="onClick"/>`,
      `<view bindtap="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.onClick, "0c") }
}`
    )
    assert(
      `<custom v-on:click="onClick"/>`,
      `<custom bindclick="{{a}}" u-i="2a9ec0b0-0"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.onClick, "ca") }
}`
    )
  })
  test('dynamic arg', () => {
    // <view v-on:[event]="handler"/>
  })
  test('dynamic arg with prefixing', () => {
    // <view v-on:[event]="handler"/>
  })
  test('dynamic arg with complex exp prefixing', () => {
    // <view v-on:[event(foo)]="handler"/>
  })
  test('should wrap as function if expression is inline statement', () => {
    assert(
      `<view @click="i++"/>`,
      `<view bindtap="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o($event => _ctx.i++, "d2") }
}`
    )
  })
  test('should handle multiple inline statement', () => {
    assert(
      `<view @click="foo();bar()"/>`,
      `<view bindtap="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o($event => { _ctx.foo(); _ctx.bar(); }, "a9") }
}`
    )
  })
  test('should handle multi-line statement', () => {
    assert(
      `<view @click="\nfoo();\nbar()\n"/>`,
      `<view bindtap="{{a}}"/>`,
      `(_ctx, _cache) => {
  with (_ctx) {
    const { o: _o } = _Vue

    return { a: _o($event => { foo(); bar(); }, "c7") }
  }
}`,
      { prefixIdentifiers: false, mode: 'function' }
    )
  })
  test('inline statement w/ prefixIdentifiers: true', () => {
    assert(
      `<view @click="foo($event)"/>`,
      `<view bindtap="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o($event => _ctx.foo($event), "e4") }
}`
    )
  })
  test('multiple inline statements w/ prefixIdentifiers: true', () => {
    assert(
      `<view @click="foo($event);bar()"/>`,
      `<view bindtap="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o($event => { _ctx.foo($event); _ctx.bar(); }, "ff") }
}`
    )
  })
  test('should NOT wrap as function if expression is already function expression', () => {
    assert(
      `<view @click="$event => foo($event)"/>`,
      `<view bindtap="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o($event => _ctx.foo($event), "7c") }
}`
    )
  })
  test('should NOT wrap as function if expression is already function expression (with newlines)', () => {
    assert(
      `<view @click="
  $event => {
    foo($event)
  }
"/>`,
      `<view bindtap="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o($event => { _ctx.foo($event); }, "5c") }
}`
    )
  })
  test('should NOT wrap as function if expression is already function expression (with newlines + function keyword)', () => {
    assert(
      `<view @click="
  function($event) {
    foo($event)
  }
"/>`,
      `<view bindtap="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o(function ($event) { _ctx.foo($event); }, "d2") }
}`
    )
  })
  test('should NOT wrap as function if expression is complex member expression', () => {
    assert(
      `<view @click="a['b' + c]"/>`,
      `<view bindtap="{{a}}"/>`,
      `(_ctx, _cache) => {
  with (_ctx) {
    const { o: _o } = _Vue

    return { a: _o(a['b' + c], "c2") }
  }
}`,
      {
        prefixIdentifiers: false,
        mode: 'function',
      }
    )
  })
  test('complex member expression w/ prefixIdentifiers: true', () => {
    assert(
      `<view @click="a['b' + c]"/>`,
      `<view bindtap="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.a['b' + _ctx.c], "08") }
}`
    )
  })
  test('function expression w/ prefixIdentifiers: true', () => {
    assert(
      `<view @click="e => foo(e)"/>`,
      `<view bindtap="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o(e => _ctx.foo(e), "6a") }
}`
    )
  })
  test('should error if no expression AND no modifier', () => {
    const onError = jest.fn()
    parseWithVOn(`<div v-on:click />`, { onError })
    expect(onError.mock.calls[0][0]).toMatchObject({
      code: ErrorCodes.X_V_ON_NO_EXPRESSION,
      loc: {
        start: {
          line: 1,
          column: 6,
        },
        end: {
          line: 1,
          column: 16,
        },
      },
    })
  })
  test('should NOT error if no expression but has modifier', () => {
    const onError = jest.fn()
    parseWithVOn(`<div v-on:click.prevent />`, { onError })
    expect(onError).not.toHaveBeenCalled()
  })

  test('case conversion for kebab-case events', () => {
    assert(
      `<view v-on:foo-bar="onMount"/>`,
      `<view bind:foo-bar="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.onMount, "bc") }
}`
    )
  })

  test('case conversion for vnode hooks', () => {
    assert(
      `<view v-on:vnode-mounted="onMount"/>`,
      `<view bind:vnode-mounted="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.onMount, "fb") }
}`
    )
  })

  describe('cacheHandler', () => {
    test('empty handler', () => {
      assert(
        `<view v-on:click.prevent />`,
        `<view catchtap="{{a}}"/>`,
        `(_ctx, _cache) => {
  return { a: _o(() => {}, "2a") }
}`
      )
    })

    test('member expression handler', () => {
      // <div v-on:click="foo" />
    })

    test('compound member expression handler', () => {
      // <div v-on:click="foo.bar" />
    })

    test('bail on component member expression handler', () => {
      // <comp v-on:click="foo" />
    })

    test('should not be cached inside v-once', () => {
      // <div v-once><div v-on:click="foo"/></div>
    })

    test('inline function expression handler', () => {
      // <div v-on:click="() => foo()" />
    })

    test('inline async arrow function expression handler', () => {
      // <div v-on:click="async () => await foo()" />
    })

    test('inline async function expression handler', () => {
      // <div v-on:click="async function () { await foo() } " />
    })

    test('inline statement handler', () => {
      // <div v-on:click="foo++" />
    })
  })
})
