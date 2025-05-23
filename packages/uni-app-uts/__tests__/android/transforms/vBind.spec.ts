import { extend } from '@vue/shared'
import {
  CAMELIZE,
  type CallExpression,
  type CompilerOptions,
  type ElementNode,
  ErrorCodes,
  NORMALIZE_PROPS,
  NodeTypes,
  type ObjectExpression,
  type VNodeCall,
  helperNameMap,
  baseParse as parse,
  transform,
  transformElement,
} from '@vue/compiler-core'
import { transformBind } from '../../../src/plugins/android/uvue/compiler/transforms/vBind'
import { transformExpression } from '../../../src/plugins/android/uvue/compiler/transforms/transformExpression'
import { assert } from '../testUtils'

function parseWithVBind(
  template: string,
  options: CompilerOptions = {}
): ElementNode {
  const ast = parse(template)
  transform(
    ast,
    extend({}, options, {
      prefixIdentifiers: options.prefixIdentifiers,
      nodeTransforms: [
        transformExpression,
        transformElement,
        ...(options.nodeTransforms || []), // user transforms
      ],
      directiveTransforms: extend(
        {},
        { bind: transformBind },
        options.directiveTransforms || {} // user transforms
      ),
    })
  )
  return ast.children[0] as ElementNode
}

describe('compiler: v-bind', () => {
  test('basic', () => {
    assert(
      `<view v-bind:id="id"/>`,
      `_cE("view", _uM({ id: _ctx.id }), null, 8 /* PROPS */, ["id"])`
    )
  })
  test('object expression', () => {
    assert(
      `<view v-bind="{id}"/>`,
      `_cE("view", normalizeProps(guardReactiveProps(_uM({id: _ctx.id}))), null, 16 /* FULL_PROPS */)`
    )
  })
  test('dynamic arg', () => {
    assert(
      `<view v-bind:[id]="id"/>`,
      `_cE("view", normalizeProps(_uM({ [_ctx.id !== null ? _ctx.id : ""]: _ctx.id })), null, 16 /* FULL_PROPS */)`
    )
  })
  test('.camel modifier', () => {
    assert(
      `<view v-bind:foo-bar.camel="id"/>`,
      `_cE("view", _uM({ fooBar: _ctx.id }), null, 8 /* PROPS */, ["fooBar"])`
    )
  })
  test('.camel modifier w/ dynamic arg', () => {
    assert(
      `<view v-bind:[foo].camel="id"/>`,
      `_cE("view", normalizeProps(_uM({ [camelize(_ctx.foo !== null ? _ctx.foo : "")]: _ctx.id })), null, 16 /* FULL_PROPS */)`
    )
  })
  test('.prop modifier', () => {
    assert(
      `<view v-bind:className.prop="className"/>`,
      `_cE("view", _uM({ ".className": _ctx.className }), null, 40 /* PROPS, NEED_HYDRATION */, [".className"])`
    )
  })
  test('.prop modifier w/ dynamic arg', () => {
    assert(
      `<view v-bind:[fooBar].prop="className"/>`,
      '_cE("view", normalizeProps(_uM({ [`.${_ctx.fooBar !== null ? _ctx.fooBar : ""}`]: _ctx.className })), null, 48 /* FULL_PROPS, NEED_HYDRATION */)'
    )
  })
  test('.prop modifier (shorthand)', () => {
    assert(
      `<view .className="className"/>`,
      '_cE("view", _uM({ ".className": _ctx.className }), null, 40 /* PROPS, NEED_HYDRATION */, [".className"])'
    )
  })
  test('.attr modifier', () => {
    assert(
      `<view v-bind:foo-bar.attr="id"/>`,
      '_cE("view", _uM({ "^foo-bar": _ctx.id }), null, 8 /* PROPS */, ["^foo-bar"])'
    )
  })
  test('simple expression', () => {
    assert(
      `<view v-bind:class="{'box': true}"></view>`,
      `_cE("view", _uM({
  class: _nC(_uM({'box': true}))
}), null, 2 /* CLASS */)`
    )
  })
  test('simple expression with array', () => {
    assert(
      `<view v-bind:class="[classA, {classB: true, classC: false}]"></view>`,
      `_cE("view", _uM({
  class: _nC([_ctx.classA, _uM({classB: true, classC: false})])
}), null, 2 /* CLASS */)`
    )
  })
  test('simple expression with array with variable', () => {
    assert(
      `<view v-bind:class="[classA, {[classB]: true, [classC]: false}]"></view>`,
      `_cE("view", _uM({
  class: _nC([_ctx.classA, _uM({[_ctx.classB]: true, [_ctx.classC]: false})])
}), null, 2 /* CLASS */)`
    )
  })
  test('simple expression with object', () => {
    assert(
      `<view :style="{color: true ? 'blue' : 'red'}"></view>`,
      `_cE("view", _uM({
  style: _nS(_uM({color: true ? 'blue' : 'red'}))
}), null, 4 /* STYLE */)`
    )
  })
  test('complex expression', () => {
    assert(
      `<rich-text :nodes="[{'name':'div','attrs':{'class':'div-class','style':'line-height: 60px; color: red; text-align:center;'},'children':[{'type':'text','text':'this is text'}]}]" />`,
      `_cE("rich-text", _uM({ nodes: [_uM({'name':'div','attrs':_uM({'class':'div-class','style':'line-height: 60px; color: red; text-align:center;'}),'children':[_uM({'type':'text','text':'this is text'})]})] }), null, 8 /* PROPS */, ["nodes"])`
    )
  })
  test('empty object syntax with \n', () => {
    assert(
      `<rich-text
  :nodes="[
    {
      'name': 'div',
      'attrs': {
        'class': 'div-class',
        'style': 'line-height: 60px; color: red; text-align:center;'
      },
      'children': [
        { 'type': 'text', 'text': 'this is text' },
        { 'type': 'text', 'text': 'this is text' },
      ]
    }
  ]"
/>`,
      `_cE("rich-text", _uM({ nodes: [
    _uM({
      'name': 'div',
      'attrs': _uM({
        'class': 'div-class',
        'style': 'line-height: 60px; color: red; text-align:center;'
      }),
      'children': [
        _uM({ 'type': 'text', 'text': 'this is text' }),
        _uM({ 'type': 'text', 'text': 'this is text' }),
      ]
    })
  ] }), null, 8 /* PROPS */, ["nodes"])`
    )
  })
  test('style with empty {\n }', () => {
    assert(
      `<text :style="{
    }" />`,
      `_cE("text", _uM({
  style: _nS(_uM<string, any | null>({
    }))
}), null, 4 /* STYLE */)`
    )
  })
  test('object value width expression', () => {
    assert(
      `<view class="search" @click="toSearchPage" :style="{'width':700 +'rpx',
      'top':0 +'px'}" />`,
      `_cE("view", _uM({
  class: "search",
  onClick: _ctx.toSearchPage,
  style: _nS(_uM({'width':700 +'rpx',
      'top':0 +'px'}))
}), null, 12 /* STYLE, PROPS */, ["onClick"])`
    )
  })
  test('object value width all number expression', () => {
    assert(
      `<view class="search" @click="toSearchPage" :style="{'opacity': 1 + 1}" />`,
      `_cE("view", _uM({
  class: "search",
  onClick: _ctx.toSearchPage,
  style: _nS(_uM({'opacity': 1 + 1}))
}), null, 12 /* STYLE, PROPS */, ["onClick"])`
    )
  })
  test('object value width expression (with data)', () => {
    assert(
      `<view :style="{'opacity': count > 0.3 ? 1 : count * 3, 'color': 'red'}" />`,
      `_cE("view", _uM({
  style: _nS(_uM({'opacity': _ctx.count > 0.3 ? 1 : _ctx.count * 3, 'color': 'red'}))
}), null, 4 /* STYLE */)`
    )
  })
  test('prop with type object', () => {
    assert(
      `<Foo :obj="{name: 'name'}" />`,
      `_cV(_component_Foo, _uM({ obj: {name: 'name'} }))`
    )
  })
  test('v-bind all props', () => {
    assert(
      `<Foo v-bind="{name: 'name', age: 18, obj: {key: 'value'}}" />`,
      `_cV(_component_Foo, normalizeProps(guardReactiveProps(_uM({name: 'name', age: 18, obj: {key: 'value'}}))), null, 16 /* FULL_PROPS */)`
    )
  })
  test('v-bind all props with variable', () => {
    assert(
      `<Foo v-bind="allProps" />`,
      `_cV(_component_Foo, normalizeProps(guardReactiveProps(_ctx.allProps)), null, 16 /* FULL_PROPS */)`
    )
  })

  test('basic', () => {
    const node = parseWithVBind(`<view v-bind:id="id"/>`)
    const props = (node.codegenNode as VNodeCall).props as ObjectExpression
    expect(props.properties[0]).toMatchObject({
      key: {
        content: `id`,
        isStatic: true,
        loc: {
          start: {
            line: 1,
            column: 14,
          },
          end: {
            line: 1,
            column: 16,
          },
        },
      },
      value: {
        content: `id`,
        isStatic: false,
        loc: {
          start: {
            line: 1,
            column: 18,
          },
          end: {
            line: 1,
            column: 20,
          },
        },
      },
    })
  })

  test('dynamic arg', () => {
    const node = parseWithVBind(`<view v-bind:[id]="id"/>`)
    const props = (node.codegenNode as VNodeCall).props as CallExpression
    expect(props).toMatchObject({
      type: NodeTypes.JS_CALL_EXPRESSION,
      callee: NORMALIZE_PROPS,
      arguments: [
        {
          type: NodeTypes.JS_OBJECT_EXPRESSION,
          properties: [
            {
              key: {
                content: `id !== null ? id : ""`,
                isStatic: false,
              },
              value: {
                content: `id`,
                isStatic: false,
              },
            },
          ],
        },
      ],
    })
  })

  test('should error if no expression', () => {
    const onError = jest.fn()
    const node = parseWithVBind(`<view v-bind:arg />`, { onError })
    const props = (node.codegenNode as VNodeCall).props as ObjectExpression
    expect(onError.mock.calls[0][0]).toMatchObject({
      code: ErrorCodes.X_V_BIND_NO_EXPRESSION,
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
    expect(props.properties[0]).toMatchObject({
      key: {
        content: `arg`,
        isStatic: true,
      },
      value: {
        content: ``,
        isStatic: true,
      },
    })
  })

  test('.camel modifier', () => {
    const node = parseWithVBind(`<view v-bind:foo-bar.camel="id"/>`)
    const props = (node.codegenNode as VNodeCall).props as ObjectExpression
    expect(props.properties[0]).toMatchObject({
      key: {
        content: `fooBar`,
        isStatic: true,
      },
      value: {
        content: `id`,
        isStatic: false,
      },
    })
  })

  test('.camel modifier w/ dynamic arg', () => {
    const node = parseWithVBind(`<view v-bind:[foo].camel="id"/>`)
    const props = (node.codegenNode as VNodeCall).props as CallExpression
    expect(props).toMatchObject({
      type: NodeTypes.JS_CALL_EXPRESSION,
      callee: NORMALIZE_PROPS,
      arguments: [
        {
          type: NodeTypes.JS_OBJECT_EXPRESSION,
          properties: [
            {
              key: {
                content: `_${helperNameMap[CAMELIZE]}(foo !== null ? foo : "")`,
                isStatic: false,
              },
              value: {
                content: `id`,
                isStatic: false,
              },
            },
          ],
        },
      ],
    })
  })

  test('.camel modifier w/ dynamic arg + prefixIdentifiers', () => {
    const node = parseWithVBind(`<view v-bind:[foo(bar)].camel="id"/>`, {
      prefixIdentifiers: true,
    })
    const props = (node.codegenNode as VNodeCall).props as CallExpression
    expect(props).toMatchObject({
      type: NodeTypes.JS_CALL_EXPRESSION,
      callee: NORMALIZE_PROPS,
      arguments: [
        {
          type: NodeTypes.JS_OBJECT_EXPRESSION,
          properties: [
            {
              key: {
                children: [
                  `_${helperNameMap[CAMELIZE]}(`,
                  `(`,
                  { content: `_ctx.foo` },
                  `(`,
                  { content: `_ctx.bar` },
                  `)`,
                  `) || ""`,
                  `)`,
                ],
              },
              value: {
                content: `_ctx.id`,
                isStatic: false,
              },
            },
          ],
        },
      ],
    })
  })

  test('.prop modifier', () => {
    const node = parseWithVBind(`<view v-bind:fooBar.prop="id"/>`)
    const props = (node.codegenNode as VNodeCall).props as ObjectExpression
    expect(props.properties[0]).toMatchObject({
      key: {
        content: `.fooBar`,
        isStatic: true,
      },
      value: {
        content: `id`,
        isStatic: false,
      },
    })
  })

  test('.prop modifier w/ dynamic arg', () => {
    const node = parseWithVBind(`<view v-bind:[fooBar].prop="id"/>`)
    const props = (node.codegenNode as VNodeCall).props as CallExpression
    expect(props).toMatchObject({
      type: NodeTypes.JS_CALL_EXPRESSION,
      callee: NORMALIZE_PROPS,
      arguments: [
        {
          type: NodeTypes.JS_OBJECT_EXPRESSION,
          properties: [
            {
              key: {
                content: '`.${fooBar !== null ? fooBar : ""}`',
                isStatic: false,
              },
              value: {
                content: `id`,
                isStatic: false,
              },
            },
          ],
        },
      ],
    })
  })

  test('.prop modifier w/ dynamic arg + prefixIdentifiers', () => {
    const node = parseWithVBind(`<view v-bind:[foo(bar)].prop="id"/>`, {
      prefixIdentifiers: true,
    })
    const props = (node.codegenNode as VNodeCall).props as CallExpression
    expect(props).toMatchObject({
      type: NodeTypes.JS_CALL_EXPRESSION,
      callee: NORMALIZE_PROPS,
      arguments: [
        {
          type: NodeTypes.JS_OBJECT_EXPRESSION,
          properties: [
            {
              key: {
                children: [
                  `'.' + (`,
                  `(`,
                  { content: `_ctx.foo` },
                  `(`,
                  { content: `_ctx.bar` },
                  `)`,
                  `) || ""`,
                  `)`,
                ],
              },
              value: {
                content: `_ctx.id`,
                isStatic: false,
              },
            },
          ],
        },
      ],
    })
  })

  test('.prop modifier (shorthand)', () => {
    const node = parseWithVBind(`<view .fooBar="id"/>`)
    const props = (node.codegenNode as VNodeCall).props as ObjectExpression
    expect(props.properties[0]).toMatchObject({
      key: {
        content: `.fooBar`,
        isStatic: true,
      },
      value: {
        content: `id`,
        isStatic: false,
      },
    })
  })

  test('.attr modifier', () => {
    const node = parseWithVBind(`<view v-bind:foo-bar.attr="id"/>`)
    const props = (node.codegenNode as VNodeCall).props as ObjectExpression
    expect(props.properties[0]).toMatchObject({
      key: {
        content: `^foo-bar`,
        isStatic: true,
      },
      value: {
        content: `id`,
        isStatic: false,
      },
    })
  })
})
