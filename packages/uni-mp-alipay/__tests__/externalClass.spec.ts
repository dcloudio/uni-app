import path from 'path'
import { NodeTypes } from '@vue/compiler-core'
import type { NodeTransform } from '@dcloudio/uni-mp-compiler'
import {
  clearMiniProgramComponentStyleIsolation,
  updateMiniProgramComponentStyleIsolation,
} from '@dcloudio/uni-cli-shared'

const filename = '/src/pages/index/index.vue'
const componentFilename = path.resolve(
  __dirname,
  'fixtures/external-class.uvue'
)

// 测试直接指定组件源码，验证编译器只根据子组件声明识别 externalClass，不按属性名猜测。
const resolveExternalClassComponent: NodeTransform = (node) => {
  if (node.type === NodeTypes.ELEMENT && node.tag === 'external-class') {
    // @ts-expect-error importSource 是小程序编译阶段扩展的组件源码字段
    node.importSource = componentFilename
  }
}

function restoreEnv(name: string, value: string | undefined) {
  if (value === undefined) {
    delete process.env[name]
  } else {
    process.env[name] = value
  }
}

const originalPlatform = process.env.UNI_PLATFORM
const originalAppX = process.env.UNI_APP_X
const originalDom2 = process.env.UNI_APP_X_DOM2
const originalVersion = process.env.UNI_APP_STYLE_ISOLATION_VERSION
const originalInputDir = process.env.UNI_INPUT_DIR

// transformIdentifier 会在模块初始化时缓存功能开关，必须先设置环境再加载编译器测试工具。
process.env.UNI_PLATFORM = 'mp-alipay'
process.env.UNI_APP_X = 'true'
process.env.UNI_APP_X_DOM2 = 'true'
process.env.UNI_APP_STYLE_ISOLATION_VERSION = '2'
const { miniProgram } =
  require('../src/compiler/options') as typeof import('../src/compiler/options')
const { assert } = require('./testUtils') as typeof import('./testUtils')

const miniProgramWithFilterImport = {
  ...miniProgram,
  filter: {
    lang: miniProgram.filter!.lang,
    setStyle: miniProgram.filter!.setStyle,
    generate(filter: { name: string }, filename: string) {
      return `<import-sjs name="${filter.name}" from="${filename}.sjs"/>`
    },
  },
}

describe('mp-alipay: externalClass 2.0', () => {
  beforeEach(() => {
    process.env.UNI_PLATFORM = 'mp-alipay'
    process.env.UNI_APP_X = 'true'
    process.env.UNI_APP_X_DOM2 = 'true'
    process.env.UNI_APP_STYLE_ISOLATION_VERSION = '2'
    process.env.UNI_INPUT_DIR = '/src'
    updateMiniProgramComponentStyleIsolation(filename, 'app', true)
  })

  afterEach(() => {
    clearMiniProgramComponentStyleIsolation(filename)
  })

  afterAll(() => {
    restoreEnv('UNI_PLATFORM', originalPlatform)
    restoreEnv('UNI_APP_X', originalAppX)
    restoreEnv('UNI_APP_X_DOM2', originalDom2)
    restoreEnv('UNI_APP_STYLE_ISOLATION_VERSION', originalVersion)
    restoreEnv('UNI_INPUT_DIR', originalInputDir)
  })

  test('静态 externalClass 按调用页面作用域展开且不进入普通 props', () => {
    assert(
      '<external-class box-class="foo bar" normal-class="baz"/>',
      '<external-class box-class="-a-foo -p-foo -a-bar -p-bar" u-i="10a73a5e-0" u-p="{{a||\'\'}}"/>',
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _p({ ['normal-class']: 'baz' }) }
  return __returned__
}`,
      {
        filename,
        isX: true,
        nodeTransforms: [resolveExternalClassComponent],
      }
    )
  })

  test('动态和空 externalClass 保留原生属性通道', () => {
    assert(
      '<external-class :box-class="klass" empty-class=""/>',
      '<external-class box-class="{{uV.c(a,3,0)}}" empty-class="" u-i="10a73a5e-0"/>',
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _ctx.klass }
  return __returned__
}`,
      {
        filename,
        isX: true,
        nodeTransforms: [resolveExternalClassComponent],
      }
    )
  })

  test('动态 externalClass 自动引入 uniView SJS', () => {
    assert(
      '<external-class :box-class="klass" empty-class=""/>',
      '<external-class box-class="{{uV.c(a,3,0)}}" empty-class="" u-i="10a73a5e-0"/><import-sjs name="uV" from="/common/uniView.sjs"/>\n',
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _ctx.klass }
  return __returned__
}`,
      {
        filename,
        isX: true,
        miniProgram: miniProgramWithFilterImport,
        nodeTransforms: [resolveExternalClassComponent],
      }
    )
  })

  test('其他小程序平台的动态 externalClass 继续使用普通 props 通道', () => {
    Reflect.set(process.env, 'UNI_PLATFORM', 'mp-baidu')
    assert(
      '<external-class :box-class="klass"/>',
      '<external-class u-i="10a73a5e-0" u-p="{{a||\'\'}}"/>',
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _p({ ['box-class']: _ctx.klass }) }
  return __returned__
}`,
      {
        filename,
        isX: true,
        nodeTransforms: [resolveExternalClassComponent],
      }
    )
  })

  test('父组件调用时使用父组件自身的 styleIsolation mask', () => {
    updateMiniProgramComponentStyleIsolation(filename, 'app-and-page')
    assert(
      '<external-class box-class="foo"/>',
      '<external-class box-class="-a-foo -p-foo -c-foo" u-i="10a73a5e-0"/>',
      `(_ctx, _cache) => { "raw js"
  const __returned__ = {}
  return __returned__
}`,
      {
        filename,
        isX: true,
        nodeTransforms: [resolveExternalClassComponent],
      }
    )
  })

  test('静态 externalClass 禁止使用内部保留前缀', () => {
    expect(() =>
      assert('<external-class box-class="-p-foo"/>', '', '', {
        filename,
        isX: true,
        nodeTransforms: [resolveExternalClassComponent],
      })
    ).toThrow('支付宝小程序样式隔离不允许 class 使用保留前缀：-p-foo')
  })
})
