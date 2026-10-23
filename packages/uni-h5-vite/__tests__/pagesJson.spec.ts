import fs from 'fs'
import os from 'os'
import path from 'path'

import { PAGES_JSON_JS } from '@dcloudio/uni-cli-shared'

import { uniPagesJsonPlugin } from '../src/plugins/pagesJson'

describe('h5 pages.json page route', () => {
  const originalEnv = {
    UNI_APP_X: process.env.UNI_APP_X,
    UNI_APP_X_DOM2: process.env.UNI_APP_X_DOM2,
    UNI_APP_X_VAPOR: process.env.UNI_APP_X_VAPOR,
    UNI_INPUT_DIR: process.env.UNI_INPUT_DIR,
    UNI_PLATFORM: process.env.UNI_PLATFORM,
  }
  let inputDir: string

  beforeEach(() => {
    inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-h5-pages-json-'))
    fs.mkdirSync(path.join(inputDir, 'pages/index'), { recursive: true })
    fs.writeFileSync(path.join(inputDir, 'manifest.json'), '{}')
    fs.writeFileSync(
      path.join(inputDir, 'pages/index/index.uvue'),
      '<template><view /></template>'
    )
    process.env.UNI_APP_X = 'true'
    process.env.UNI_INPUT_DIR = inputDir
    process.env.UNI_PLATFORM = 'h5'
    delete process.env.UNI_APP_X_DOM2
    delete process.env.UNI_APP_X_VAPOR
  })

  afterEach(() => {
    fs.rmSync(inputDir, { recursive: true, force: true })
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

  function transform(vapor: boolean, ssr = false) {
    if (vapor) {
      process.env.UNI_APP_X_DOM2 = 'true'
      process.env.UNI_APP_X_VAPOR = 'true'
    }
    const plugin = uniPagesJsonPlugin() as any
    plugin.configResolved({
      command: 'serve',
      define: {},
      isProduction: false,
    })
    return plugin.transform.call(
      {},
      JSON.stringify({
        pages: [{ path: 'pages/index/index', style: {} }],
        topWindow: { path: 'windows/top' },
      }),
      path.join(inputDir, PAGES_JSON_JS),
      ssr ? { ssr: true } : undefined
    ).code as string
  }

  test('Web VDOM 保持原有 VNode 页面包装', () => {
    const code = transform(false)

    expect(code).not.toContain(
      "import '@dcloudio/uni-h5/style/framework/uvue-vapor.css'"
    )
    expect(code).toContain("import '@dcloudio/uni-h5/style/framework/uvue.css'")
    expect(code).toContain('import { defineAsyncComponent,')
    expect(code).not.toContain('defineVaporAsyncComponent')
    expect(code).toContain(
      'return createVNode(resolveComponent(async.loading))'
    )
    expect(code).toContain(
      'return createVNode(resolveComponent(async.error), { error: this.error })'
    )
    expect(code).toContain(
      'const PagesIndexIndex = defineAsyncComponent(extend('
    )
    expect(code).toContain(
      `const topWindow = defineAsyncComponent(()=>import('./windows/top')`
    )
    expect(code).toContain(
      `import { PageComponent, useI18n, setupWindow, setupPage } from '@dcloudio/uni-h5'`
    )
    expect(code).toContain('function renderPage(component,props)')
    expect(code).toContain('createBlock(PageComponent')
    expect(code).not.toContain('createVaporPageRouteComponent')
    expect(code).not.toContain("import { useRoute } from 'vue-router'")
  })

  test('Web Vapor 生成路由专属 Page 组件', () => {
    const code = transform(true)

    expect(code).toContain(
      "import '@dcloudio/uni-h5/style/framework/uvue-vapor.css'"
    )
    expect(code).not.toContain(
      "import '@dcloudio/uni-h5/style/framework/uvue.css'"
    )
    expect(code).toContain(
      "import { defineVaporAsyncComponent as defineAsyncComponent, defineVaporComponent, createAssetComponent } from 'vue'"
    )
    expect(code).not.toContain('import { defineAsyncComponent,')
    expect(code).not.toContain('createVNode')
    expect(code).not.toContain('resolveComponent')
    expect(code).toContain(
      'return createAssetComponent(async.loading, null, null, true)'
    )
    expect(code).toContain(
      'return createAssetComponent(async.error, { error: () => props.error }, null, true)'
    )
    expect(code).toContain(
      'const PagesIndexIndex = defineAsyncComponent(extend('
    )
    expect(code).toContain(
      `const topWindow = defineAsyncComponent(()=>import('./windows/top')`
    )
    expect(code).toContain(
      `import { createVaporPageRouteComponent, useI18n, setupWindow, setupPage } from '@dcloudio/uni-h5'`
    )
    expect(code).toContain("import { useRoute } from 'vue-router'")
    expect(code).toContain(
      'component:createVaporPageRouteComponent(PagesIndexIndex,()=>useRoute().query)'
    )
    expect(code).not.toContain('.$route')
    expect(code).not.toContain('function renderPage(component,props)')
    expect(code).not.toContain('createBlock(PageComponent')
  })

  test('Web Vapor SSR 保持服务端异步组件包装', () => {
    const code = transform(true, true)

    expect(code).toContain(
      "import '@dcloudio/uni-h5/style/framework/uvue-vapor.css'"
    )
    expect(code).not.toContain(
      "import '@dcloudio/uni-h5/style/framework/uvue.css'"
    )
    expect(code).toContain('import { defineAsyncComponent,')
    expect(code).not.toContain('defineVaporAsyncComponent')
    expect(code).toContain(
      'return createVNode(resolveComponent(async.loading))'
    )
    expect(code).toContain("import { useRoute } from 'vue-router'")
    expect(code).toContain(
      'component:createVaporPageRouteComponent(PagesIndexIndex,()=>useRoute().query)'
    )
    expect(code).not.toContain('.$route')
  })
})
