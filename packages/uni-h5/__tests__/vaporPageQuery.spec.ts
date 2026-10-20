import fs from 'fs'
import path from 'path'
import ts from 'typescript'
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

  beforeAll(() => {
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
  })

  beforeEach(() => {
    mockUseRoute.mockReset()
    global.__uniRoutes = [{ meta: { route: 'pages/index/index' } }] as any
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
    expect(mockUseRoute).not.toHaveBeenCalled()
  })

  test('多页面及 SSR 使用 Router 的当前 query', () => {
    global.__UNI_FEATURE_PAGES__ = true
    const query = { id: '123', tags: ['a', 'b'] }
    mockUseRoute.mockReturnValue({ query })
    expect(setup().pageProps).toBe(query)
    expect(mockUseRoute).toHaveBeenCalledTimes(1)
  })
})
