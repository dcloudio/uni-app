import path from 'path'
import type { ResolvedConfig } from 'vite'
import { createTransformIndexHtml } from '../src/plugin/transformIndexHtml'

describe('h5 index.html Web Vapor 占位符', () => {
  const originalEnv = {
    UNI_APP_X: process.env.UNI_APP_X,
    UNI_APP_X_DOM2: process.env.UNI_APP_X_DOM2,
    UNI_INPUT_DIR: process.env.UNI_INPUT_DIR,
    UNI_PLATFORM: process.env.UNI_PLATFORM,
  }
  const html = '<title>old</title><div id="app"><!--app-html--></div>'

  beforeEach(() => {
    process.env.UNI_APP_X = 'true'
    process.env.UNI_APP_X_DOM2 = 'true'
    process.env.UNI_PLATFORM = 'h5'
    process.env.UNI_INPUT_DIR = path.resolve(
      __dirname,
      '../../playground/ssr-x/src'
    )
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

  async function transform(config: Partial<ResolvedConfig>) {
    const hook = createTransformIndexHtml({
      resolvedConfig: config as ResolvedConfig,
    }) as Function
    return (await hook(html)).html as string
  }

  test('Web Vapor CSR 移除占位符', async () => {
    const result = await transform({ command: 'serve', server: {} as any })
    expect(result).toContain('<title>hello</title>')
    expect(result).toContain('<div id="app"></div>')
  })

  test('Web Vapor SSR 开发保留占位符', async () => {
    const result = await transform({
      command: 'serve',
      server: { middlewareMode: true } as any,
    })
    expect(result).toContain('<!--app-html-->')
  })

  test.each([{ ssr: true }, { ssrManifest: true }])(
    'Web Vapor SSR 构建保留占位符：%p',
    async (build) => {
      const result = await transform({ command: 'build', build: build as any })
      expect(result).toContain('<!--app-html-->')
    }
  )

  test('Web VDOM 保留占位符', async () => {
    delete process.env.UNI_APP_X_DOM2
    const result = await transform({ command: 'serve', server: {} as any })
    expect(result).toContain('<!--app-html-->')
  })
})
