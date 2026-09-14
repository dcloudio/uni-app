import {
  type DirectiveNode,
  type ElementNode,
  NodeTypes,
  type SimpleExpressionNode as SimpleExpression,
} from '@vue/compiler-core'
import {
  createIsCustomElement,
  isMiniProgramNativeTag,
  isMiniProgramUVueNativeTag,
} from '@dcloudio/uni-shared'
import { compile, parse as parseTemplate } from '../src'
import { MPErrorCodes } from '../src/errors'
import type { CompilerOptions } from '../src/options'
import { transform } from '../src/transform'
import { transformVBindAttrs } from '../src/transforms/transformVBindAttrs'
import { miniProgram } from './testUtils'

const originalPlatform = process.env.UNI_PLATFORM

afterEach(() => {
  if (typeof originalPlatform === 'undefined') {
    Reflect.deleteProperty(process.env, 'UNI_PLATFORM')
  } else {
    process.env.UNI_PLATFORM = originalPlatform as any
  }
})

function runTransform(
  template: string,
  options: {
    isX?: boolean
    platform?: string
    isTS?: boolean
    expressionPlugins?: CompilerOptions['expressionPlugins']
  } = {}
) {
  if (typeof options.platform === 'undefined') {
    Reflect.deleteProperty(process.env, 'UNI_PLATFORM')
  } else {
    process.env.UNI_PLATFORM = options.platform as any
  }

  const ast = parseTemplate(template, {
    isNativeTag: options.isX
      ? isMiniProgramUVueNativeTag
      : isMiniProgramNativeTag,
    isCustomElement: createIsCustomElement([]),
  })
  transform(ast as any, {
    isX: options.isX ?? true,
    isTS: options.isTS,
    expressionPlugins: options.expressionPlugins,
    nodeTransforms: [transformVBindAttrs as any],
  })
  return ast.children[0] as ElementNode
}

function compileTemplate(
  template: string,
  options: CompilerOptions,
  platform = 'mp-weixin'
) {
  process.env.UNI_PLATFORM = platform as any
  let source = ''
  compile(template, {
    root: '',
    mode: 'module',
    filename: 'foo.vue',
    prefixIdentifiers: true,
    inline: true,
    isNativeTag: options.isX
      ? isMiniProgramUVueNativeTag
      : isMiniProgramNativeTag,
    isCustomElement: createIsCustomElement([]),
    generatorOpts: {
      concise: true,
    },
    miniProgram: {
      ...miniProgram,
      ...options.miniProgram,
      emitFile({ source: templateSource }) {
        source = templateSource as string
        return ''
      },
    },
    ...options,
  })
  return source
}

function compileRenderCode(
  template: string,
  options: CompilerOptions = {},
  platform = 'mp-weixin'
) {
  process.env.UNI_PLATFORM = platform as any
  return compile(template, {
    root: '',
    mode: 'module',
    filename: 'foo.vue',
    prefixIdentifiers: true,
    inline: true,
    isNativeTag: options.isX
      ? isMiniProgramUVueNativeTag
      : isMiniProgramNativeTag,
    isCustomElement: createIsCustomElement([]),
    generatorOpts: {
      concise: true,
    },
    miniProgram: {
      ...miniProgram,
      ...options.miniProgram,
      emitFile() {
        return ''
      },
    },
    ...options,
  }).code
}

function getProp(node: ElementNode, name: string) {
  return node.props.find((prop) => {
    return (
      prop.type === NodeTypes.DIRECTIVE &&
      prop.name === 'bind' &&
      prop.arg?.type === NodeTypes.SIMPLE_EXPRESSION &&
      prop.arg.isStatic &&
      prop.arg.content === name
    )
  }) as DirectiveNode | undefined
}

function getOnProp(node: ElementNode, name: string) {
  return node.props.find((prop) => {
    return (
      prop.type === NodeTypes.DIRECTIVE &&
      prop.name === 'on' &&
      prop.arg?.type === NodeTypes.SIMPLE_EXPRESSION &&
      prop.arg.isStatic &&
      prop.arg.content === name
    )
  }) as DirectiveNode | undefined
}

describe('compiler: transform v-bind="$attrs"', () => {
  test('uni-app-x 微信小程序下支持原生节点 v-bind="$attrs"', () => {
    const onError = jest.fn()
    const source = compileTemplate(`<view v-bind="$attrs"/>`, {
      isX: true,
      onError,
    })

    expect(source).toBe(
      `<view class="{{b}}" bindtap="{{c}}" id="{{a}}" style="{{$eS[a]}}"/>`
    )
    expect(onError).not.toHaveBeenCalled()
  })

  test('uni-app-x 支付宝小程序下支持原生节点 v-bind="$attrs"', () => {
    const onError = jest.fn()
    const source = compileTemplate(
      `<view v-bind="$attrs"/>`,
      {
        isX: true,
        onError,
      },
      'mp-alipay'
    )

    expect(source).toBe(
      `<view class="{{b}}" bindtap="{{c}}" id="{{a}}" style="{{$eS[a]}}"/>`
    )
    expect(onError).not.toHaveBeenCalled()
  })

  test('仅处理原生节点，不改写组件上的 v-bind="$attrs"', () => {
    const node = runTransform(`<custom v-bind="$attrs"/>`, {
      isX: true,
      platform: 'mp-weixin',
    })

    expect(node.props).toHaveLength(1)
    expect(node.props[0]).toMatchObject({
      type: NodeTypes.DIRECTIVE,
      name: 'bind',
    })
    expect((node.props[0] as DirectiveNode).arg).toBeUndefined()
    expect(
      ((node.props[0] as DirectiveNode).exp as SimpleExpression).content
    ).toBe('$attrs')
  })

  test('合并已有 class/style/click 时保留声明顺序', () => {
    const node = runTransform(
      `<view @click="foo" v-bind="$attrs" :class="bar" :style="baz"/>`,
      {
        isX: true,
        platform: 'mp-weixin',
      }
    )

    expect((getOnProp(node, 'click')!.exp as SimpleExpression).content).toBe(
      `($attrs.onClick ? [].concat((foo) || [], $attrs.onClick) : foo)`
    )
    expect((getProp(node, 'class')!.exp as SimpleExpression).content).toBe(
      `[$attrs.class, bar]`
    )
    expect((getProp(node, 'style')!.exp as SimpleExpression).content).toBe(
      `[$attrs.style, baz]`
    )
  })

  test.each(['foo()', 'count++'])(
    '合并内联 click 处理器时保留回调语义: %s',
    (handler) => {
      const node = runTransform(`<view @click="${handler}" v-bind="$attrs"/>`, {
        isX: true,
        platform: 'mp-weixin',
      })

      expect((getOnProp(node, 'click')!.exp as SimpleExpression).content).toBe(
        `($attrs.onClick ? [].concat((($event) => (${handler})) || [], $attrs.onClick) : ($event) => (${handler}))`
      )
    }
  )

  test.each(['function ($event) { foo(); }', '$event => { foo(); }'])(
    '合并带代码块的函数处理器时保留原函数: %s',
    (handler) => {
      const node = runTransform(`<view @click="${handler}" v-bind="$attrs"/>`, {
        isX: true,
        platform: 'mp-weixin',
      })

      expect((getOnProp(node, 'click')!.exp as SimpleExpression).content).toBe(
        `($attrs.onClick ? [].concat((${handler}) || [], $attrs.onClick) : ${handler})`
      )
    }
  )

  test('合并空 click 处理器时生成有效的空函数', () => {
    const node = runTransform(`<view @click="" v-bind="$attrs"/>`, {
      isX: true,
      platform: 'mp-weixin',
    })

    expect((getOnProp(node, 'click')!.exp as SimpleExpression).content).toBe(
      `($attrs.onClick ? [].concat((() => {}) || [], $attrs.onClick) : () => {})`
    )
  })

  test('合并带 TS 类型断言的函数处理器时保留原函数', () => {
    const handler = '(() => foo()) as Handler'
    const node = runTransform(`<view @click="${handler}" v-bind="$attrs"/>`, {
      isX: true,
      isTS: true,
      expressionPlugins: ['typescript'],
      platform: 'mp-weixin',
    })

    expect((getOnProp(node, 'click')!.exp as SimpleExpression).content).toBe(
      `($attrs.onClick ? [].concat((${handler}) || [], $attrs.onClick) : ${handler})`
    )
  })

  test('编译结果不会在渲染阶段执行内联 click 处理器', () => {
    const code = compileRenderCode(`<view @click="foo()" v-bind="$attrs"/>`, {
      isX: true,
    })

    expect(code).toContain(
      '_o(_ctx.$attrs.onClick ? [].concat(($event => _ctx.foo()) || [],'
    )
    expect(code).not.toContain('_o($event => _ctx.foo()')
  })

  test('uni-app 下仍保持原有报错', () => {
    const onError = jest.fn()
    const source = compileTemplate(
      `<view v-bind="$attrs"/>`,
      {
        isX: false,
        onError,
      },
      'mp-weixin'
    )

    expect(source).toContain(`<view`)
    expect(onError.mock.calls[0][0]).toMatchObject({
      code: MPErrorCodes.X_V_BIND_NO_ARGUMENT,
    })
  })

  test('uni-app-x 非微信/支付宝小程序下仍保持原有报错', () => {
    const onError = jest.fn()
    const source = compileTemplate(
      `<view v-bind="$attrs"/>`,
      {
        isX: true,
        onError,
      },
      'mp-toutiao'
    )

    expect(source).toContain(`<view`)
    expect(onError.mock.calls[0][0]).toMatchObject({
      code: MPErrorCodes.X_V_BIND_NO_ARGUMENT,
    })
  })
})
