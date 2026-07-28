import path from 'path'
import { NodeTypes } from '@vue/compiler-core'
import type { NodeTransform } from '@dcloudio/uni-mp-compiler'
import {
  clearMiniProgramComponentStyleIsolation,
  getAlipayStyleIsolationClassMask,
} from '@dcloudio/uni-cli-shared'

const filename = '/src/pages/index/index.vue'
const componentFilename = path.resolve(
  __dirname,
  'fixtures/style-isolation-app.uvue'
)

const resolveStyleIsolationComponent: NodeTransform = (node) => {
  if (node.type === NodeTypes.ELEMENT && node.tag === 'style-isolation-app') {
    // @ts-expect-error importSource 是小程序编译阶段扩展的组件源码字段
    node.importSource = componentFilename
  }
}

const originalPlatform = process.env.UNI_PLATFORM
const originalAppX = process.env.UNI_APP_X
const originalDom2 = process.env.UNI_APP_X_DOM2
const originalVersion = process.env.UNI_APP_STYLE_ISOLATION_VERSION
const originalInputDir = process.env.UNI_INPUT_DIR
process.env.UNI_PLATFORM = 'mp-alipay'
process.env.UNI_APP_X = 'true'
process.env.UNI_APP_X_DOM2 = 'true'
process.env.UNI_APP_STYLE_ISOLATION_VERSION = '2'
const { assert } = require('./testUtils') as typeof import('./testUtils')

function restoreEnv(name: string, value: string | undefined) {
  if (value === undefined) {
    delete process.env[name]
  } else {
    process.env[name] = value
  }
}

describe('mp-alipay: styleIsolation compile order', () => {
  beforeEach(() => {
    process.env.UNI_INPUT_DIR = '/src'
  })

  afterEach(() => {
    clearMiniProgramComponentStyleIsolation(componentFilename)
  })

  afterAll(() => {
    restoreEnv('UNI_PLATFORM', originalPlatform)
    restoreEnv('UNI_APP_X', originalAppX)
    restoreEnv('UNI_APP_X_DOM2', originalDom2)
    restoreEnv('UNI_APP_STYLE_ISOLATION_VERSION', originalVersion)
    restoreEnv('UNI_INPUT_DIR', originalInputDir)
  })

  test('解析父模板组件时同步缓存子组件 styleIsolation', () => {
    assert(
      '<style-isolation-app/>',
      '<style-isolation-app u-i="10a73a5e-0"/>',
      `(_ctx, _cache) => { "raw js"
  const __returned__ = {}
  return __returned__
}`,
      {
        filename,
        isX: true,
        nodeTransforms: [resolveStyleIsolationComponent],
      }
    )

    expect(getAlipayStyleIsolationClassMask(componentFilename)).toBe(5)
  })
})
