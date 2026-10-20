import fs from 'fs'
import path from 'path'
import ts from 'typescript'
import jscc from 'rollup-plugin-jscc'
import { compileScript, parse } from '@vue/compiler-sfc'
import { usePageRoute } from '../src/framework/setup/provide/page'

const mockUseRoute = jest.fn()
jest.mock('vue-router', () => ({ useRoute: () => mockUseRoute() }))
jest.mock('@dcloudio/uni-core', () => ({ PolySymbol: Symbol }))

describe('Vapor 页面查询参数', () => {
  const originalPages = global.__UNI_FEATURE_PAGES__
  const originalRoutes = global.__uniRoutes
  const originalLocation = global.location
  let setup: Function
  const initPages: Record<string, Function> = {}
  const initXPage = jest.fn()
  const pageMeta = { route: 'pages/index/index', id: 1 }

  beforeAll(async () => {
    const filename = path.resolve(
      __dirname,
      '../src/framework/components/page/index-vapor.vue'
    )
    const { descriptor } = parse(fs.readFileSync(filename, 'utf8'), {
      filename,
    })
    const script = compileScript(descriptor, { id: 'vapor-page-query' })
    const code = ts.transpileModule(script.content, {
      compilerOptions: { module: ts.ModuleKind.CommonJS },
    }).outputText
    const imports = {
      vue: {
        defineComponent: (options: unknown) => options,
        getCurrentInstance: () => ({
          attrs: {},
          type: { __uniPageComponent: {} },
        }),
        ref: (value: unknown) => ({ value }),
        provide: () => {},
      },
      '../../setup/provide': {
        providePageMeta: () => ({ navigationBar: {} }),
        usePageRoute,
      },
      '../../../helpers/useDocumentTitle': { useDocumentTitle: () => {} },
      '../../../helpers/useBackgroundColorContent': {
        useBackgroundColorContent: () => {},
      },
      '../../../helpers/dom': { getStateId: () => 1 },
      '@dcloudio/uni-core': { isDialogPageInstance: () => false },
      '@dcloudio/uni-shared': {},
      '../../setup/page': {},
      './pageHead.vue': {},
      './pageBody.vue': {},
    }
    const exports = {} as any
    new Function('require', 'exports', '__UNI_FEATURE_NAVIGATIONBAR__', code)(
      (id: keyof typeof imports) => {
        if (!(id in imports)) throw new Error('缺少测试依赖：' + id)
        return imports[id]
      },
      exports,
      false
    )
    setup = () => exports.default.setup({}, { expose: () => {} })

    // 同时执行实际页面初始化，避免只验证外层 Page 而遗漏 Router 注入。
    for (const vapor of [true, false]) {
      const plugin = jscc({
        values: { _X_: 1, _X_VAPOR_: +vapor, _NODE_JS_: 0 },
      })
      const source = await (plugin.load as Function).call(
        {},
        path.resolve(__dirname, '../src/framework/setup/page.ts')
      )
      const imports = {
        vue: {},
        '@vue/shared': {},
        'vue-router': { useRoute: () => mockUseRoute() },
        '@dcloudio/uni-core': {
          initPageInternalInstance: (
            _type: string,
            fullPath: string,
            _query: unknown,
            meta: unknown
          ) => ({ fullPath, meta }),
          initPageVm: (vm: any, page: unknown) => (vm.$basePage = page),
        },
        '@dcloudio/uni-shared': {},
        './provide': { usePageRoute, usePageMeta: () => pageMeta },
        '../../service/api/route/utils': {},
        '../../helpers/cssVar': {},
        '../../helpers/dom': { getStateId: () => 1 },
        './utils': {},
        '../../x/service/api/route/utils': {},
        '../../x/framework/setup/page': { initXPage },
      }
      const exports = {} as any
      const code = ts.transpileModule(source.code, {
        compilerOptions: { module: ts.ModuleKind.CommonJS },
      }).outputText
      new Function('require', 'exports', '__X__', code)(
        (id: keyof typeof imports) => {
          if (!(id in imports)) throw new Error('缺少测试依赖：' + id)
          return imports[id]
        },
        exports,
        true
      )
      initPages[String(vapor)] = exports.initPage
    }
  })

  beforeEach(() => {
    mockUseRoute.mockReset()
    initXPage.mockClear()
    global.__uniRoutes = [{ path: '/', meta: { ...pageMeta } }] as any
  })

  afterAll(() => {
    global.__UNI_FEATURE_PAGES__ = originalPages
    global.__uniRoutes = originalRoutes
    global.location = originalLocation
  })

  test.each([
    ['http://localhost/', {}],
    [
      'http://localhost/?name=test%20value&count=2',
      { name: 'test value', count: '2' },
    ],
    ['http://localhost/#/pages/index/index?name=test', { name: 'test' }],
  ])('单页面不依赖 Router：%s', (href, query) => {
    global.__UNI_FEATURE_PAGES__ = false
    global.location = { href } as Location
    expect(setup().pageProps).toEqual(query)
    const vm = {} as any
    initPages.true(vm)
    expect(initXPage).toHaveBeenCalledWith(
      vm,
      expect.objectContaining({ path: '/pages/index/index', query }),
      vm.$basePage
    )
    expect(vm.$basePage.eventChannel).toBeUndefined()
    expect(mockUseRoute).not.toHaveBeenCalled()
  })

  test('多页面及 SSR 使用 Router 的当前 query', () => {
    global.__UNI_FEATURE_PAGES__ = true
    const query = { id: '123', tags: ['a', 'b'] }
    const channel = {}
    const route = {
      query,
      path: '/pages/index/index',
      fullPath: '/pages/index/index?id=123',
      meta: { ...pageMeta, eventChannel: channel },
    }
    mockUseRoute.mockReturnValue(route)
    expect(setup().pageProps).toBe(query)
    const vm = {} as any
    initPages.true(vm)
    expect(initXPage).toHaveBeenCalledWith(vm, route, vm.$basePage)
    expect(vm.$basePage.eventChannel).toBe(channel)
    const replacement = {}
    vm.$basePage.eventChannel = replacement
    expect(route.meta.eventChannel).toBe(replacement)
    expect(mockUseRoute).toHaveBeenCalledTimes(2)
  })

  test.each([false, true])('VDOM 保持原有取参方式（多页=%s）', (pages) => {
    global.__UNI_FEATURE_PAGES__ = pages
    const route = pages
      ? { fullPath: '/pages/index/index', meta: pageMeta, query: {} }
      : undefined
    const vm = { $route: route } as any
    initPages.false(vm)
    expect(initXPage).toHaveBeenCalledWith(vm, route, vm.$basePage)
    expect(
      Object.getOwnPropertyDescriptor(vm.$basePage, 'eventChannel')
    ).toBeUndefined()
    expect(mockUseRoute).not.toHaveBeenCalled()
  })
})
