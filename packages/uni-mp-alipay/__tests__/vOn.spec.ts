import { assert } from './testUtils'

describe('mp-alipay: transform v-on', () => {
  test('getphonenumber', () => {
    assert(
      `<button open-type='getPhoneNumber' @getphonenumber="getPhoneNumber">获取手机号</button>`,
      `<button open-type="getAuthorize" scope="phoneNumber" onGetAuthorize="{{a}}" onError="{{b}}">获取手机号</button>`,
      `(_ctx, _cache) => {
  return { a: _o($event => _ctx.$onAliGetAuthorize(_ctx.getPhoneNumber, $event), "1a"), b: _o($event => _ctx.$onAliAuthError(_ctx.getPhoneNumber, $event), "21") }
}`
    )
    assert(
      `<button open-type='getPhoneNumber' @getphonenumber="getPhoneNumber($event)">获取手机号</button>`,
      `<button open-type="getAuthorize" scope="phoneNumber" onGetAuthorize="{{a}}" onError="{{b}}">获取手机号</button>`,
      `(_ctx, _cache) => {
  return { a: _o($event => _ctx.$onAliGetAuthorize($event => { _ctx.getPhoneNumber($event); }, $event), "7e"), b: _o($event => _ctx.$onAliAuthError($event => { _ctx.getPhoneNumber($event); }, $event), "09") }
}`
    )
  })
  test('basic', () => {
    assert(
      `<view v-on:click="onClick"/>`,
      `<view onTap="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.onClick, "0c") }
}`
    )
    assert(
      `<custom v-on:click="onClick"/>`,
      `<custom onClick="{{a}}" u-i="2a9ec0b0-0" onVI="__l"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.onClick, "ca") }
}`
    )
  })
  test('event with capture modifier', () => {
    assert(
      `<view @click.capture="onClick"/>`,
      `<view capture-onTap="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.onClick, "ea") }
}`
    )
  })
  test('event with stop or prevent modifier', () => {
    assert(
      `<view @click.stop="onClick"/>`,
      `<view catchTap="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.onClick, "6f") }
}`
    )
    assert(
      `<view @click.prevent="onClick"/>`,
      `<view catchTap="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.onClick, "ea") }
}`
    )
  })
  test('event with capture modifier and stop or prevent modifier', () => {
    assert(
      `<view @touchStart.capture.stop="onClick"/>`,
      `<view capture-catchTouchStart="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.onClick, "ba") }
}`
    )
    assert(
      `<view @touchStart.capture.prevent="onClick"/>`,
      `<view capture-catchTouchStart="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.onClick, "92") }
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
  return { a: _o($event => _ctx.i++, "d2") }
}`
    )
  })
  test('should handle multiple inline statement', () => {
    assert(
      `<view @click="foo();bar()"/>`,
      `<view onTap="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o($event => { _ctx.foo(); _ctx.bar(); }, "a9") }
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

    return { a: _o($event => { foo(); bar(); }, "c7") }
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
  return { a: _o($event => _ctx.foo($event), "e4") }
}`
    )
  })
  test('multiple inline statements w/ prefixIdentifiers: true', () => {
    assert(
      `<view @click="foo($event);bar()"/>`,
      `<view onTap="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o($event => { _ctx.foo($event); _ctx.bar(); }, "ff") }
}`
    )
  })
  test('should NOT wrap as function if expression is already function expression', () => {
    assert(
      `<view @click="$event => foo($event)"/>`,
      `<view onTap="{{a}}"/>`,
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
      `<view onTap="{{a}}"/>`,
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
      `<view onTap="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o(function ($event) { _ctx.foo($event); }, "d2") }
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
      `<view onTap="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.a['b' + _ctx.c], "08") }
}`
    )
  })
  test('function expression w/ prefixIdentifiers: true', () => {
    assert(
      `<view @click="e => foo(e)"/>`,
      `<view onTap="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o(e => _ctx.foo(e), "6a") }
}`
    )
  })

  test('case conversion for kebab-case events', () => {
    assert(
      `<view v-on:foo-bar="onMount"/>`,
      `<view onFooBar="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.onMount, "bc") }
}`
    )
  })

  test('case conversion for vnode hooks', () => {
    assert(
      `<view v-on:vnode-mounted="onMount"/>`,
      `<view onVnodeMounted="{{a}}"/>`,
      `(_ctx, _cache) => {
  return { a: _o(_ctx.onMount, "fb") }
}`
    )
  })

  describe('cacheHandler', () => {
    test('empty handler', () => {
      assert(
        `<view v-on:click.prevent />`,
        `<view catchTap="{{a}}"/>`,
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
