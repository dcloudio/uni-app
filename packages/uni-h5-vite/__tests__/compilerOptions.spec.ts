describe('h5 compiler options', () => {
  const originalEnv = {
    UNI_APP_X: process.env.UNI_APP_X,
    UNI_APP_X_DOM2: process.env.UNI_APP_X_DOM2,
    UNI_APP_X_VAPOR: process.env.UNI_APP_X_VAPOR,
    UNI_PLATFORM: process.env.UNI_PLATFORM,
    UNI_UTS_PLATFORM: process.env.UNI_UTS_PLATFORM,
  }

  beforeEach(() => {
    jest.resetModules()
    process.env.UNI_APP_X = 'true'
    process.env.UNI_PLATFORM = 'h5'
    process.env.UNI_UTS_PLATFORM = 'web'
  })

  afterAll(() => {
    Object.entries(originalEnv).forEach(([name, value]) => {
      if (value === undefined) {
        delete process.env[name]
      } else {
        process.env[name] = value
      }
    })
  })

  test('Web Vapor 不使用 VDOM custom element 转换', () => {
    process.env.UNI_APP_X_DOM2 = 'true'
    process.env.UNI_APP_X_VAPOR = 'true'

    const { compilerOptions } = require('../src/plugin/uni')
    const { transformMatchMedia } =
      require('@dcloudio/uni-cli-shared') as typeof import('@dcloudio/uni-cli-shared')
    const { transformCustomElement } =
      require('../src/plugin/transforms/transformCustomElement') as typeof import('../src/plugin/transforms/transformCustomElement')
    const { transformPageHead } =
      require('../src/plugin/transforms/transformPageHead') as typeof import('../src/plugin/transforms/transformPageHead')

    expect(compilerOptions.nodeTransforms).toContain(transformMatchMedia)
    expect(compilerOptions.nodeTransforms).not.toContain(transformCustomElement)
    expect(compilerOptions.ssrPreTagTransforms).toContain(transformPageHead)
  })

  test('非 Vapor uni-app x 保持 custom element 转换', () => {
    delete process.env.UNI_APP_X_DOM2
    delete process.env.UNI_APP_X_VAPOR

    const { compilerOptions } = require('../src/plugin/uni')
    const { transformMatchMedia } =
      require('@dcloudio/uni-cli-shared') as typeof import('@dcloudio/uni-cli-shared')
    const { transformCustomElement } =
      require('../src/plugin/transforms/transformCustomElement') as typeof import('../src/plugin/transforms/transformCustomElement')

    expect(compilerOptions.nodeTransforms).not.toContain(transformMatchMedia)
    expect(compilerOptions.nodeTransforms).toContain(transformCustomElement)
  })

  test('SSR 在处理 page-meta 时提前转换 head', () => {
    process.env.UNI_APP_X_DOM2 = 'true'
    process.env.UNI_APP_X_VAPOR = 'true'

    const { NodeTypes, ElementTypes } = require('@vue/compiler-core')
    const { transformPageHead } =
      require('../src/plugin/transforms/transformPageHead') as typeof import('../src/plugin/transforms/transformPageHead')
    const head = {
      type: NodeTypes.ELEMENT,
      tag: 'head',
      tagType: ElementTypes.ELEMENT,
    }
    const pageMeta = {
      type: NodeTypes.ELEMENT,
      tag: 'page-meta',
      children: [head],
    }

    transformPageHead(pageMeta as any, {} as any)

    expect(head.tag).toBe('page-meta-head')
    expect(head.tagType).toBe(ElementTypes.COMPONENT)
  })
})
