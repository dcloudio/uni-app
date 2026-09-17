import path from 'path'
import { NodeTypes } from '@vue/compiler-core'
import type { NodeTransform } from '@dcloudio/uni-mp-compiler'
import {
  clearMiniProgramComponentStyleIsolation,
  initPreContext,
  updateMiniProgramComponentStyleIsolation,
} from '@dcloudio/uni-cli-shared'

const filename = '/src/pages/index/index.vue'
const componentFilename = path.resolve(
  __dirname,
  'fixtures/external-class-conditional.uvue'
)

const resolveExternalClassComponent: NodeTransform = (node) => {
  if (
    node.type === NodeTypes.ELEMENT &&
    node.tag === 'external-class-conditional'
  ) {
    // 测试直接指定组件源码，模拟 easycom 已经完成组件路径解析的状态。
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
// 与真实编译入口一致，条件编译使用当前支付宝 uni-app x 上下文。
initPreContext('mp-alipay', {}, undefined, true)

const { assert } = require('./testUtils') as typeof import('./testUtils')

describe('mp-alipay: conditional externalClass 2.0', () => {
  beforeEach(() => {
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

  test('使用条件编译后的 script 分析 externalClasses', () => {
    assert(
      '<external-class-conditional alipay-class="foo" weixin-class="bar"/>',
      '<external-class-conditional alipay-class="-a-foo -p-foo" u-i="10a73a5e-0" u-p="{{a||\'\'}}"/>',
      `(_ctx, _cache) => { "raw js"
  const __returned__ = { a: _p({ ['weixin-class']: 'bar' }) }
  return __returned__
}`,
      {
        filename,
        isX: true,
        expressionPlugins: ['typescript'],
        nodeTransforms: [resolveExternalClassComponent],
      }
    )
  })
})
