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
  options: { isX?: boolean; platform?: string } = {}
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
      `[foo, $attrs.onClick]`
    )
    expect((getProp(node, 'class')!.exp as SimpleExpression).content).toBe(
      `[$attrs.class, bar]`
    )
    expect((getProp(node, 'style')!.exp as SimpleExpression).content).toBe(
      `[$attrs.style, baz]`
    )
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

  test('uni-app-x 非微信小程序下仍保持原有报错', () => {
    const onError = jest.fn()
    const source = compileTemplate(
      `<view v-bind="$attrs"/>`,
      {
        isX: true,
        onError,
      },
      'mp-alipay'
    )

    expect(source).toContain(`<view`)
    expect(onError.mock.calls[0][0]).toMatchObject({
      code: MPErrorCodes.X_V_BIND_NO_ARGUMENT,
    })
  })
})
