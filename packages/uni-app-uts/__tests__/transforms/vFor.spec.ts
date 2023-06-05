import { assert } from '../testUtils'

describe('compiler:v-for', () => {
  test('number expression', () => {
    assert(
      `<text v-for="item in 10" :key="item" />`,
      `createElementVNode(Fragment, null, RenderHelpers.renderList(10, (item, _, _):VNode => {
  return createElementVNode("text", new Map<string, any | null>([["key", item]]))
}), 64 /* STABLE_FRAGMENT */)`
    )
  })
  test('value', () => {
    assert(
      `<text v-for="(item) in items" />`,
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, (item, _, _):VNode => {
  return createElementVNode("text")
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('value and key', () => {
    assert(
      `<text v-for="(item, index) in [1,2,3]" :key="index" />`,
      `createElementVNode(Fragment, null, RenderHelpers.renderList([1,2,3], (item, index, _):VNode => {
  return createElementVNode("text", new Map<string, any | null>([["key", index]]))
}), 64 /* STABLE_FRAGMENT */)`
    )
  })
  test('value, key and index', () => {
    assert(
      `<text v-for="(item, key, index) in {a:'a',b:'b'}" :key="index" />`,
      `createElementVNode(Fragment, null, RenderHelpers.renderList({a:'a',b:'b'}, (item, key, index):VNode => {
  return createElementVNode("text", new Map<string, any | null>([["key", index]]))
}), 64 /* STABLE_FRAGMENT */)`
    )
  })
  test('array de-structured value', () => {
    assert(
      '<text v-for="([ id, value ]) in items" />',
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, ([ id, value ], _, _):VNode => {
  return createElementVNode(\"text\")
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('object de-structured value', () => {
    assert(
      '<text v-for="({ id, value }) in items" />',
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, ({ id, value }, _, _):VNode => {
  return createElementVNode("text")
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('skipped value', () => {
    assert(
      '<text v-for="(,key,index) in items" />',
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, (_, key, index):VNode => {
  return createElementVNode("text")
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('skipped key', () => {
    assert(
      '<text v-for="(value,,index) in items" />',
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, (value, _, index):VNode => {
  return createElementVNode("text")
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('skipped value & key', () => {
    assert(
      '<text v-for="(,,index) in items" />',
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, (_, _, index):VNode => {
  return createElementVNode("text")
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('skipped value and key', () => {
    assert(
      '<text v-for="(,,index) in items" />',
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, (_, _, index):VNode => {
  return createElementVNode("text")
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('unbracketed value', () => {
    assert(
      '<text v-for="item in items" />',
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, (item, _, _):VNode => {
  return createElementVNode(\"text\")
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('unbracketed value and key', () => {
    assert(
      '<text v-for="item, key in items" />',
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, (item, key, _):VNode => {
  return createElementVNode(\"text\")
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('unbracketed value and key', () => {
    assert(
      '<text v-for="value, key, index in items" />',
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, (value, key, index):VNode => {
  return createElementVNode(\"text\")
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('unbracketed skipped key', () => {
    assert(
      '<text v-for="value, , index in items" />',
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, (value, _, index):VNode => {
  return createElementVNode(\"text\")
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('unbracketed skipped value and key', () => {
    assert(
      '<text v-for=", , index in items" />',
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, (_, _, index):VNode => {
  return createElementVNode(\"text\")
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('source complex expression', () => {
    assert(
      '<text v-for="i in list.concat([foo])" />',
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.list.concat([_ctx.foo]), (i, _, _):VNode => {
  return createElementVNode(\"text\")
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('should not prefix v-for alias', () => {
    assert(
      '<text v-for="i in list">{{ i }}{{ j }}</text>',
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.list, (i, _, _):VNode => {
  return createElementVNode("text", null, toDisplayString(i) + toDisplayString(_ctx.j), 1 /* TEXT */)
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('should not prefix v-for aliases (multiple)', () => {
    assert(
      '<text v-for="(i, j, k) in list">{{ i + j + k }}{{ l }}</text>',
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.list, (i, j, k):VNode => {
  return createElementVNode("text", null, toDisplayString(i + j + k) + toDisplayString(_ctx.l), 1 /* TEXT */)
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('should prefix id outside of v-for', () => {
    assert(
      '<text><text v-for="i in list" />{{ i }}</text>',
      `createElementVNode("text", null, [
  createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.list, (i, _, _):VNode => {
    return createElementVNode("text")
  }), 256 /* UNKEYED_FRAGMENT */),
  toDisplayString(_ctx.i)
])`
    )
  })
  test('nested v-for', () => {
    assert(
      `<view v-for="i in list">
  <text v-for="i in list">{{ i + j }}</text>{{ i }}
</view>`,
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.list, (i, _, _):VNode => {
  return createElementVNode(\"view\", null, [
    createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.list, (i, _, _):VNode => {
      return createElementVNode(\"text\", null, toDisplayString(i + _ctx.j), 1 /* TEXT */)
    }), 256 /* UNKEYED_FRAGMENT */),
    createElementVNode("text", null, toDisplayString(i), 1 /* TEXT */)
  ])
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('v-for aliases w/ complex expressions', () => {
    assert(
      `<text v-for="({ foo = bar, baz: [qux = quux] }) in list">
  {{ foo + bar + baz + qux + quux }}
</text>`,
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.list, ({ foo = _ctx.bar, baz: [qux = _ctx.quux] }, _, _):VNode => {
  return createElementVNode(\"text\", null, toDisplayString(foo + _ctx.bar + _ctx.baz + qux + _ctx.quux), 1 /* TEXT */)
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('element v-for key expression prefixing', () => {
    assert(
      `<text v-for="item in items" :key="itemKey(item)">test</text>`,
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, (item, _, _):VNode => {
  return createElementVNode(\"text\", new Map<string, any | null>([
    [\"key\", _ctx.itemKey(item)]
  ]), \"test\")
}), 128 /* KEYED_FRAGMENT */)`
    )
  })
  test('template v-for key no prefixing on attribute key', () => {
    assert(
      `<template v-for="item in items" key="key">test</template>`,
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, (item, _, _):VNode => {
  return createElementVNode(Fragment, new Map<string, any | null>([[\"key\", \"key\"]]), [\"test\"], 64 /* STABLE_FRAGMENT */)
}), 128 /* KEYED_FRAGMENT */)`
    )
  })
  test('template v-for key injection with single child', () => {
    assert(
      `<template v-for="item in items" :key="item.id"><text :id="item.id" /></template>`,
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, (item, _, _):VNode => {
  return createElementVNode(\"text\", new Map<string, any | null>([
    [\"key\", item.id],
    [\"id\", item.id]
  ]), null, 8 /* PROPS */, [\"id\"])
}), 128 /* KEYED_FRAGMENT */)`
    )
  })
  test('v-for on <slot/>', () => {
    assert(
      `<slot v-for="item in items"></slot>`,
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, (item, _, _):VNode => {
  return renderSlot(_ctx.$slots, \"default\")
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
  test('keyed v-for', () => {
    assert(
      `<text v-for="(item) in items" :key="item" />`,
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, (item, _, _):VNode => {
  return createElementVNode(\"text\", new Map<string, any | null>([[\"key\", item]]))
}), 128 /* KEYED_FRAGMENT */)`
    )
  })
  test('keyed template v-for', () => {
    assert(
      `<template v-for="(item) in items" :key="item"><text/></template>`,
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.items, (item, _, _):VNode => {
  return createElementVNode(\"text\", new Map<string, any | null>([[\"key\", item]]))
}), 128 /* KEYED_FRAGMENT */)`
    )
  })
  test('v-if + v-for', () => {
    assert(
      `<view v-if="ok" v-for="i in list"/>`,
      `isTrue(_ctx.ok)
  ? createElementVNode(Fragment, new Map<string, any | null>([[\"key\", 0]]), RenderHelpers.renderList(_ctx.list, (i, _, _):VNode => {
      return createElementVNode(\"view\")
    }), 256 /* UNKEYED_FRAGMENT */)
  : createCommentVNode(\"v-if\", true)`
    )
  })
  test('v-if + v-for on <template>', () => {
    assert(
      `<template v-if="ok" v-for="i in list"/>`,
      `isTrue(_ctx.ok)
  ? createElementVNode(Fragment, new Map<string, any | null>([[\"key\", 0]]), RenderHelpers.renderList(_ctx.list, (i, _, _):VNode => {
      return createElementVNode(Fragment, null, [], 64 /* STABLE_FRAGMENT */)
    }), 256 /* UNKEYED_FRAGMENT */)
  : createCommentVNode(\"v-if\", true)`
    )
  })
  test('v-for on element with custom directive', () => {
    assert(
      `<view v-for="i in list" v-foo/>`,
      `createElementVNode(Fragment, null, RenderHelpers.renderList(_ctx.list, (i, _, _):VNode => {
  return withDirectives(createElementVNode(\"view\", null, null, 512 /* NEED_PATCH */), [
    [_directive_foo]
  ])
}), 256 /* UNKEYED_FRAGMENT */)`
    )
  })
})
