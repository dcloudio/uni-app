import path from 'path'
import { normalizePath } from '@dcloudio/uni-cli-shared'
import { uniMainJsPlugin } from '../src/plugins/mainJs'
import { resolveDistDir } from '../src/utils/utils'

const inputDir = normalizePath(path.resolve('/project/src'))
const source = `import App from './App.vue'
import { createSSRApp } from 'vue'

export function createApp() {
  const app = createSSRApp(App)
  return { app }
}
`

describe('h5 Web Vapor runtime', () => {
  const originalEnv = {
    UNI_APP_X: process.env.UNI_APP_X,
    UNI_APP_X_DOM2: process.env.UNI_APP_X_DOM2,
    UNI_APP_X_VAPOR: process.env.UNI_APP_X_VAPOR,
    UNI_INPUT_DIR: process.env.UNI_INPUT_DIR,
    UNI_PLATFORM: process.env.UNI_PLATFORM,
  }

  beforeEach(() => {
    process.env.UNI_APP_X = 'true'
    process.env.UNI_INPUT_DIR = inputDir
    process.env.UNI_PLATFORM = 'h5'
    delete process.env.UNI_APP_X_DOM2
    delete process.env.UNI_APP_X_VAPOR
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

  function transform(vapor: boolean, ssr?: boolean) {
    if (vapor) {
      process.env.UNI_APP_X_DOM2 = 'true'
      process.env.UNI_APP_X_VAPOR = 'true'
    }
    const plugin = uniMainJsPlugin() as any
    plugin.configResolved({
      command: 'build',
      build: ssr === undefined ? {} : { ssrManifest: true },
    })
    return plugin.transform.call(
      { getCombinedSourcemap: () => null },
      source,
      `${inputDir}/main.ts`,
      ssr === undefined ? undefined : { ssr }
    ).code as string
  }

  test('普通 uni-app x Web 保持 VDOM runtime', () => {
    const code = transform(false)

    expect(code).toContain('createVueApp as createSSRApp')
    expect(code).not.toContain('createVaporApp')
    expect(resolveDistDir()).toBe('dist-x')
  })

  test('Web Vapor CSR 使用 Vapor runtime', () => {
    const code = transform(true)

    expect(code).toContain('createVaporApp as createSSRApp')
    expect(code).not.toContain('createVueApp')
    expect(resolveDistDir()).toBe('dist-x-vapor')
  })

  test('Web Vapor SSR 客户端使用 Vapor hydration runtime', () => {
    expect(transform(true, false)).toContain(
      'createVaporSSRApp as createSSRApp'
    )
  })

  test('Web Vapor SSR 服务端保留 createSSRApp', () => {
    const code = transform(true, true)

    expect(code).toContain('import { createSSRApp }')
    expect(code).not.toContain('createVaporSSRApp')
  })
})
