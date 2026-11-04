import fs from 'fs'
import path from 'path'
import jscc from 'rollup-plugin-jscc'
import ts from 'typescript'

const root = path.resolve(__dirname, '../../..')

async function frameworkSource(file: string, vapor: boolean) {
  const plugin = jscc({
    values: { _X_: 1, _X_VAPOR_: +vapor, _NODE_JS_: 0 },
  })
  return (await (plugin.load as any).call({}, path.join(root, file)))
    .code as string
}

function evaluate(code: string, imports: Record<string, any>, globals = {}) {
  const module = { exports: {} as any }
  const output = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText
  new Function('require', 'module', 'exports', ...Object.keys(globals), output)(
    (id: string) => {
      if (!(id in imports)) throw new Error('缺少测试依赖：' + id)
      return imports[id]
    },
    module,
    module.exports,
    ...Object.values(globals)
  )
  return module.exports
}

describe('Web Vapor 系统页面接入', () => {
  test.each([false, true])(
    'openLocation 仅在 Vapor 切换内网实现：%s',
    async (vapor) => {
      const api = await frameworkSource(
        'packages/uni-h5/src/x/service/api/index.ts',
        vapor
      )
      const pages = await frameworkSource(
        'packages/uni-h5/src/x/service/api/pages/index.ts',
        vapor
      )
      expect(
        api.includes(
          "export { openLocation } from '../../../service/api/location/openLocation'"
        )
      ).toBe(!vapor)
      expect(pages.includes("export * from './openLocation'")).toBe(vapor)
    }
  )

  test('openLocation 先注册页面，保留参数校验、格式化和回调', async () => {
    const events: string[] = []
    const page = {}
    const api = jest.fn((args) => {
      events.push('open')
      args.success({})
    })
    const helper = jest.requireActual('../../uni-api/src/helpers/api')
    const protocol = jest.requireActual(
      '../../uni-api/src/protocols/location/openLocation'
    )
    const exports = evaluate(
      fs.readFileSync(
        path.join(
          root,
          'packages/uni-h5/src/x/service/api/pages/openLocation.ts'
        ),
        'utf8'
      ),
      {
        '@dcloudio/uni-shared': jest.requireActual('../../uni-shared/src'),
        '@/uni_modules/uni-openLocation/pages/openLocation/openLocation.vue': {
          default: page,
        },
        '@/uni_modules/uni-openLocation': { openLocation: api },
        '@dcloudio/uni-api': { ...helper, ...protocol },
        '../../../framework/route': {
          registerSystemRoute: (route: string, component: unknown) => {
            expect(route).toBe('uni:openLocation')
            expect(component).toBe(page)
            events.push('register')
          },
        },
        '@vue/shared': jest.requireActual('@vue/shared'),
      }
    )
    const params = { latitude: 0, longitude: 0, scale: 12.9 }
    await expect(exports.openLocation(params)).resolves.toMatchObject({
      errMsg: 'openLocation:ok',
    })
    expect(api.mock.calls[0][0]).toMatchObject({
      latitude: 0,
      longitude: 0,
      scale: 12,
    })
    expect(params).toEqual({ latitude: 0, longitude: 0, scale: 12.9 })
    await exports.openLocation({ latitude: 1, longitude: 2 })
    expect(api.mock.calls[1][0].scale).toBe(18)
    expect(events).toEqual(['register', 'open', 'open'])
    const fail = jest.fn()
    exports.openLocation({ longitude: 2, fail })
    expect(fail).toHaveBeenCalledTimes(1)
    expect(api).toHaveBeenCalledTimes(2)
    api.mockImplementationOnce((args) =>
      args.fail({ errMsg: 'openLocation:fail cancelled' })
    )
    await expect(
      exports.openLocation({ latitude: 1, longitude: 2 })
    ).rejects.toMatchObject({ errMsg: 'openLocation:fail cancelled' })
  })

  test.each([false, true])(
    'Picker 在校验路由前按需注册，非 Vapor 不变：%s',
    async (vapor) => {
      const routes: any[] = []
      const dialogs: any[] = []
      const page = {}
      const registered = jest.fn((route, component) => {
        if (!routes.some((item) => item.path === route)) {
          routes.push({ path: route, component, meta: { route } })
        }
      })
      const exports = evaluate(
        await frameworkSource(
          'packages/uni-h5/src/x/service/api/route/openDialogPage.ts',
          vapor
        ),
        {
          '@dcloudio/uni-api': {
            createNormalizeUrl: () => (url: string) =>
              routes.some((route) => route.path === url.split('?')[0])
                ? undefined
                : 'page not found',
          },
          '../../../framework/setup/page': {
            UniDialogPageImpl: class {
              constructor(options: object) {
                Object.assign(this, options)
              }
            },
            homeSystemDialogPages: dialogs,
            incrementEscBackPageNum: jest.fn(),
          },
          '@dcloudio/uni-shared': {
            parseUrl: (url: string) => ({
              path: url.split('?')[0],
              query: { readyEventName: 'ready' },
            }),
            removeLeadingSlash: (value: string) => value.replace(/^\//, ''),
          },
          '@dcloudio/uni-core': {
            normalizeRoute: (value: string) => value,
            isSystemDialogPage: () => true,
            isSystemActionSheetDialogPage: () => false,
          },
          './utils': {},
          vue: { markRaw: (value: unknown) => value },
          '@/uni_modules/uni-form/pages/picker/picker.vue': { default: page },
          '../../../framework/route': { registerSystemRoute: registered },
        },
        {
          __uniRoutes: routes,
          getCurrentPages: () => [],
          UniError: class {},
        }
      )
      expect(registered).not.toHaveBeenCalled()
      const fail = jest.fn()
      const result = exports.openDialogPage({
        url: 'uni:picker?readyEventName=ready',
        fail,
      })
      if (vapor) {
        expect(result.$component).toBe(page)
        expect(result.options).toEqual({ readyEventName: 'ready' })
        expect(fail).not.toHaveBeenCalled()
        exports.openDialogPage({ url: 'uni:picker' })
        expect(routes).toHaveLength(1)
        expect(dialogs).toHaveLength(2)
      } else {
        expect(result).toBeNull()
        expect(fail).toHaveBeenCalledTimes(1)
        expect(registered).not.toHaveBeenCalled()
      }
      const count = registered.mock.calls.length
      exports.openDialogPage({ url: '/pages/missing', fail })
      expect(registered).toHaveBeenCalledTimes(count)
    }
  )

  test.todo('Picker Web 主题 API 适配及功能验收：待 @姬彬彬 修复')
})
