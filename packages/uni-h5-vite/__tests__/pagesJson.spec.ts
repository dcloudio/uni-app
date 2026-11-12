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
    for (const ext of ['vue', 'uvue']) {
      fs.writeFileSync(
        path.join(inputDir, `pages/index/index.${ext}`),
        '<template><view /></template>'
      )
    }
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

  function transform(
    vapor: boolean,
    ssr = false,
    navigationBuild = false,
    pagesJson: Record<string, unknown> = {
      pages: [{ path: 'pages/index/index', style: {} }],
      topWindow: { path: 'windows/top' },
    }
  ) {
    if (vapor) {
      process.env.UNI_APP_X_DOM2 = 'true'
      process.env.UNI_APP_X_VAPOR = 'true'
    }
    const plugin = uniPagesJsonPlugin() as any
    plugin.configResolved({
      command: navigationBuild ? 'build' : 'serve',
      define: navigationBuild
        ? {
            __UNI_FEATURE_NAVIGATIONBAR__: true,
            __UNI_FEATURE_NAVIGATIONBAR_SEARCHINPUT__: true,
          }
        : {},
      isProduction: navigationBuild,
    })
    return plugin.transform.call(
      {},
      JSON.stringify(pagesJson),
      path.join(inputDir, PAGES_JSON_JS),
      ssr ? { ssr: true } : undefined
    ).code as string
  }

  describe.each([
    { name: 'uni-app Vue3', uniAppX: false, vapor: false },
    { name: 'uni-app x VDOM', uniAppX: true, vapor: false },
    { name: 'uni-app x Vapor', uniAppX: true, vapor: true },
  ])('$name 窗口显隐配置', ({ uniAppX, vapor }) => {
    test.each([
      [undefined, undefined, undefined],
      [false, undefined, false],
      [true, undefined, true],
      [false, true, true],
      [true, false, false],
      [false, false, false],
      [true, true, true],
      [undefined, false, false],
      [undefined, true, true],
    ])('全局=%s，页面=%s，路由=%s', (globalValue, pageValue, expected) => {
      if (!uniAppX) {
        delete process.env.UNI_APP_X
      }
      const windowStyle = (value: boolean | undefined) => ({
        topWindow: value,
        leftWindow: value,
        rightWindow: value,
      })
      const code = transform(vapor, false, false, {
        pages: [{ path: 'pages/index/index', style: windowStyle(pageValue) }],
        globalStyle: {
          ...windowStyle(globalValue),
          backgroundColor: '#123456',
        },
      })
      const meta = JSON.parse(code.match(/^  meta: (.+)$/m)![1])
      for (const key of ['topWindow', 'leftWindow', 'rightWindow']) {
        expect(meta[key]).toBe(expected)
        if (expected === undefined) {
          expect(meta).not.toHaveProperty(key)
        }
      }
      expect(meta).not.toHaveProperty('backgroundColor')
    })

    test('平台专属配置和分包页面继承窗口显隐，页面之间互不影响', () => {
      if (!uniAppX) {
        delete process.env.UNI_APP_X
      }
      fs.mkdirSync(path.join(inputDir, 'sub'))
      for (const name of ['index', 'detail']) {
        fs.writeFileSync(
          path.join(inputDir, 'sub', `${name}.${uniAppX ? 'uvue' : 'vue'}`),
          '<template><view /></template>'
        )
      }
      const code = transform(vapor, false, false, {
        globalStyle: {
          topWindow: true,
          web: { topWindow: false, leftWindow: false, rightWindow: true },
        },
        pages: [
          {
            path: 'pages/index/index',
            style: { web: { leftWindow: true, rightWindow: false } },
          },
        ],
        subPackages: [
          {
            root: 'sub',
            pages: [
              { path: 'index', style: {} },
              { path: 'detail', style: { h5: { topWindow: true } } },
            ],
          },
        ],
      })
      const metas = Array.from(code.matchAll(/^  meta: (.+)$/gm), (match) =>
        JSON.parse(match[1])
      )
      expect(metas).toEqual([
        expect.objectContaining({
          topWindow: false,
          leftWindow: true,
          rightWindow: false,
        }),
        expect.objectContaining({
          topWindow: false,
          leftWindow: false,
          rightWindow: true,
        }),
        expect.objectContaining({
          topWindow: true,
          leftWindow: false,
          rightWindow: true,
        }),
      ])
    })
  })

  test.each([false, true])(
    '导航栏发行入口不全量加载 Loading 样式（Vapor=%s）',
    (vapor) => {
      const code = transform(vapor, false, true)
      expect(
        code.includes(
          "import '@dcloudio/uni-components/style-x-vapor/loading.css'"
        )
      ).toBe(false)
      expect(code).not.toContain(
        "import '@dcloudio/uni-components/style-x/loading.css'"
      )
      expect(
        code.includes("import '@dcloudio/uni-h5/style/vapor/input.css'")
      ).toBe(vapor)
      expect(
        code.includes("import '@dcloudio/uni-components/style/input.css'")
      ).toBe(!vapor)
    }
  )

  test('Web VDOM 保持原有 VNode 页面包装', () => {
    const code = transform(false)

    expect(code).toContain("import '@dcloudio/uni-components/style/swiper.css'")
    expect(code).toContain(
      "import '@dcloudio/uni-components/style/swiper-item.css'"
    )
    expect(code).not.toContain('style-x-vapor/swiper')
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
      "import '@dcloudio/uni-components/style-x-vapor/swiper.css'"
    )
    expect(code).toContain(
      "import '@dcloudio/uni-components/style-x-vapor/swiper-item.css'"
    )
    expect(code).not.toContain(
      "import '@dcloudio/uni-components/style/swiper.css'"
    )
    expect(code).not.toContain(
      "import '@dcloudio/uni-components/style/swiper-item.css'"
    )
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
    expect(code).not.toContain('useRoute')
    expect(code).toContain(
      'component:createVaporPageRouteComponent(PagesIndexIndex)'
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
    expect(code).not.toContain('useRoute')
    expect(code).toContain(
      'component:createVaporPageRouteComponent(PagesIndexIndex)'
    )
    expect(code).not.toContain('.$route')
  })
})
