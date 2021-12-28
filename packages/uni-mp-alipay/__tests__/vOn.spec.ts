import { assert } from './testUtils'

describe('mp-alipay: transform v-on', () => {
  test('getphonenumber', () => {
    assert(
      `<button open-type='getPhoneNumber' @getphonenumber="getPhoneNumber">获取手机号</button>`,
      `<button open-type="getAuthorize" scope="phoneNumber" onGetAuthorize="{{a}}" onError="{{b}}">获取手机号</button>`,
      `(_ctx, _cache) => {
  return { a: _o($event => _ctx.$onAliGetAuthorize(_ctx.getPhoneNumber, $event)), b: _o($event => _ctx.$onAliAuthError(_ctx.getPhoneNumber, $event)) }
}`
    )
    assert(
      `<button open-type='getPhoneNumber' @getphonenumber="getPhoneNumber($event)">获取手机号</button>`,
      `<button open-type="getAuthorize" scope="phoneNumber" onGetAuthorize="{{a}}" onError="{{b}}">获取手机号</button>`,
      `(_ctx, _cache) => {
  return { a: _o($event => _ctx.$onAliGetAuthorize($event => { _ctx.getPhoneNumber($event); }, $event)), b: _o($event => _ctx.$onAliAuthError($event => { _ctx.getPhoneNumber($event); }, $event)) }
}`
    )
  })
  test('basic', () => {
    assert(
      `<view v-on:click="onClick"/>`,
      `<view onTap="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.onClick) }
}`
    )
    assert(
      `<custom v-on:click="onClick"/>`,
      `<custom onClick="{{a}}" u-i="2a9ec0b0-0" onVI="__l"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.onClick) }
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
      `<view onTap="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o($event => _ctx.i++) }
}`
    )
  })
  test('should handle multiple inline statement', () => {
    assert(
      `<view @click="foo();bar()"/>`,
      `<view onTap="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o($event => { _ctx.foo(); _ctx.bar(); }) }
}`
    )
  })
  test('should handle multi-line statement', () => {
    assert(
      `<view @click="\nfoo();\nbar()\n"/>`,
      `<view onTap="{{a}}"/>`,
      `(_ctx, _cache) => {
  with (_ctx) {
    const { o: _o } = _Vue

    return { a: _o($event => { foo(); bar(); }) }
  }
}`,
      { prefixIdentifiers: false, mode: 'function' }
    )
  })
  test('inline statement w/ prefixIdentifiers: true', () => {
    assert(
      `<view @click="foo($event)"/>`,
      `<view onTap="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o($event => _ctx.foo($event)) }
}`
    )
  })
  test('multiple inline statements w/ prefixIdentifiers: true', () => {
    assert(
      `<view @click="foo($event);bar()"/>`,
      `<view onTap="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o($event => { _ctx.foo($event); _ctx.bar(); }) }
}`
    )
  })
  test('should NOT wrap as function if expression is already function expression', () => {
    assert(
      `<view @click="$event => foo($event)"/>`,
      `<view onTap="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o($event => _ctx.foo($event)) }
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
      `<view onTap="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o($event => { _ctx.foo($event); }) }
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
      `<view onTap="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o(function ($event) { _ctx.foo($event); }) }
}`
    )
  })
  test('should NOT wrap as function if expression is complex member expression', () => {
    assert(
      `<view @click="a['b' + c]"/>`,
      `<view onTap="{{a}}"/>`,
      `(_ctx, _cache) => {
  with (_ctx) {
    const { o: _o } = _Vue

    return { a: _o(a['b' + c]) }
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
      `<view onTap="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.a['b' + _ctx.c]) }
}`
    )
  })
  test('function expression w/ prefixIdentifiers: true', () => {
    assert(
      `<view @click="e => foo(e)"/>`,
      `<view onTap="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o(e => _ctx.foo(e)) }
}`
    )
  })

  test('case conversion for kebab-case events', () => {
    assert(
      `<view v-on:foo-bar="onMount"/>`,
      `<view onFooBar="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.onMount) }
}`
    )
  })

  test('case conversion for vnode hooks', () => {
    assert(
      `<view v-on:vnode-mounted="onMount"/>`,
      `<view onVnodeMounted="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.onMount) }
}`
    )
  })

  describe('cacheHandler', () => {
    test('empty handler', () => {
      assert(
        `<view v-on:click.prevent />`,
        `<view catchTap="{{a}}"/>`,
        `(_ctx, _cache) => {
  return { a: _o(() => {}) }
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
