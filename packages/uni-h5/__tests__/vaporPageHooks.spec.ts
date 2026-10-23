import path from 'path'
import ts from 'typescript'
import jscc from 'rollup-plugin-jscc'

const root = path.resolve(__dirname, '../../..')

async function load(
  file: string,
  vapor: boolean,
  imports: Record<string, any>,
  globals: Record<string, any> = {}
) {
  const plugin = jscc({
    values: {
      _X_: 1,
      _X_VAPOR_: +vapor,
      _NODE_JS_: +(globals.__NODE_JS__ === true),
    },
  })
  const source = await (plugin.load as Function).call({}, path.join(root, file))
  const code = ts.transpileModule(source.code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText
  const exports = {} as any
  new Function('require', 'exports', ...Object.keys(globals), code)(
    (id: string) => {
      if (!(id in imports)) throw new Error('缺少测试依赖：' + id)
      return imports[id]
    },
    exports,
    ...Object.values(globals)
  )
  return exports
}

describe('Web Vapor 页面生命周期框架接入', () => {
  test.each([
    { optionsApi: false, ssr: false },
    { optionsApi: true, ssr: false },
    { optionsApi: false, ssr: true },
    { optionsApi: true, ssr: true },
  ])(
    'Vapor 显式注册客户端入口，旧模式保持原开关：%j',
    async ({ optionsApi, ssr }) => {
      const applyOptions = jest.fn()
      for (const vapor of [false, true]) {
        const setUniPageHooksInitializer = jest.fn()
        const initHooks = jest.fn()
        const { initApp } = await load(
          'packages/uni-vue/src/index.ts',
          vapor,
          {
            vue: { setUniPageHooksInitializer },
            '@dcloudio/uni-shared': {
              invokeCreateErrorHandler: () => {},
              invokeCreateVueAppHook: () => {},
            },
            './componentOptions': { applyOptions },
            './componentOptions/hooks': { initHooks },
            './componentInstance': {},
            './appConfig': { initOptionMergeStrategies: () => {} },
            './uni-id-mixin': {},
            './reactivity': {},
          },
          {
            __PLATFORM__: 'h5',
            __VUE_OPTIONS_API__: optionsApi,
            __UNI_FEATURE_UNI_CLOUD__: false,
            __NODE_JS__: ssr,
          }
        )
        const app = {
          config: { globalProperties: {}, optionMergeStrategies: {} },
        }
        initApp(app)
        expect((app.config.globalProperties as any).$applyOptions).toBe(
          !vapor && optionsApi ? applyOptions : undefined
        )
        expect(setUniPageHooksInitializer).toHaveBeenCalledTimes(
          vapor && !ssr ? 1 : 0
        )
        if (vapor && !ssr) {
          const initialize = setUniPageHooksInitializer.mock.calls[0][0]
          const first = { type: {}, proxy: {} }
          const second = { type: {}, proxy: {} }
          initialize(first)
          initialize(second)
          expect(initHooks.mock.calls).toEqual([
            [first.type, first, first.proxy],
            [second.type, second, second.proxy],
          ])
          initApp({
            config: { globalProperties: {}, optionMergeStrategies: {} },
          })
          // 多 App 复用同一个无状态函数，不捕获某个 App。
          expect(setUniPageHooksInitializer.mock.calls[1][0]).toBe(initialize)
        }
      }
    }
  )

  test.each(['page', 'dialog', 'preload'])(
    '复用现有 onLoad/onShow、参数及预加载规则：%s',
    async (mode) => {
      const calls: string[] = []
      const onLoad = jest.fn(() => calls.push('load'))
      const onShow = jest.fn(() => calls.push('show'))
      const invokeHook = (vm: any, name: string, args?: unknown) => {
        vm.$[name]?.forEach((hook: Function) => hook(args))
      }
      const instance = {
        type: { __scriptLang: 'ts' },
        vapor: true,
        __pageQuery: { title: 'modal', content: 'content', '1query': 'raw' },
        // Vapor 的 attrs 不能依赖删除属性来清理内部参数。
        attrs: Object.freeze({}),
        onLoad: [onLoad],
        onShow: [onShow],
      } as any
      const vm = {
        $: instance,
        $mpType: 'page',
        $basePage: {
          openType: mode === 'preload' ? 'preloadPage' : 'navigateTo',
        },
        $page: {},
      }
      const invokeNewDialogPageHook = jest.fn(() => onShow())
      const { initHooks } = await load(
        'packages/uni-vue/src/componentOptions/hooks.ts',
        true,
        {
          '@dcloudio/uni-core': {
            invokeHook,
            getPageInstanceByChild: () => ({}),
            isDialogPageInstance: () => mode === 'dialog',
            invokeNewDialogPageHook,
          },
          '@dcloudio/uni-shared': jest.requireActual('../../uni-shared/src'),
          '@vue/shared': jest.requireActual('@vue/shared'),
          vue: {},
        },
        { __PLATFORM__: 'h5', __X__: true }
      )
      initHooks(instance.type, instance, vm)
      expect(onLoad).toHaveBeenCalledTimes(1)
      expect(onLoad).toHaveBeenCalledWith(instance.__pageQuery)
      expect(calls).toEqual(mode === 'preload' ? ['load'] : ['load', 'show'])
      expect(instance.__isVisible).toBe(true)
      expect(invokeNewDialogPageHook).toHaveBeenCalledTimes(
        mode === 'dialog' ? 1 : 0
      )
    }
  )

  test.each([
    { ssr: false, vapor: true },
    { ssr: true, vapor: true },
    { ssr: false, vapor: false },
    { ssr: true, vapor: false },
  ])(
    '页面副本的 query 继承与生命周期不影响普通组件、Window 和旧模式：%j',
    async ({ ssr, vapor }) => {
      const instance = { attrs: {}, proxy: { $basePage: {} } } as any
      const query = { name1: 'value', '1query': 'raw' }
      const initUniPageHooks = jest.fn()
      const { setupPage, setupWindow } = await load(
        'packages/uni-h5/src/framework/setup/index.ts',
        vapor,
        {
          '@vue/shared': jest.requireActual('@vue/shared'),
          vue: {
            getCurrentInstance: () => instance,
            initUniPageHooks,
            reactive: (value: any) => value,
            watch: () => {},
            onBeforeMount: () => {},
            onMounted: () => {},
            onBeforeActivate: () => {},
            onBeforeDeactivate: () => {},
            onBeforeUnmount: () => {},
          },
          '@dcloudio/uni-shared': jest.requireActual('../../uni-shared/src'),
          '@dcloudio/uni-api': {},
          '@dcloudio/uni-core': {
            getPageInstanceByChild: () => ({}),
            isDialogPageInstance: () => false,
            getPageProxyId: () => 1,
            subscribeViewMethod: () => {},
          },
          '../components/layout/index-vapor.vue': {},
          '../..': {},
          './app': {},
          './page': {
            initPage: () => {},
            getPage$BasePage: (vm: any) => vm.$basePage,
          },
          './provide': {
            usePageRoute: () => ({ query }),
            usePageMeta: () => ({}),
          },
          './utils': {},
          'vue-router': {},
          '../../service/api/route/utils': {},
          '../../helpers/cssVar': { updateCurPageCssVar: () => {} },
          '../../service/api/route/appRoute': {},
          '../../x/framework/setup/page': {},
        },
        {
          __X__: true,
          __DEV__: false,
          __NODE_JS__: ssr,
          __UNI_FEATURE_PAGES__: false,
          __uniConfig: {},
        }
      )
      const original = { inheritAttrs: true }
      const page = setupPage(original, 'pages/index/index')
      expect(page).not.toBe(original)
      expect(page.inheritAttrs).toBe(vapor ? false : true)
      expect(original.inheritAttrs).toBe(true)
      for (const options of [{}, { inheritAttrs: false }]) {
        const originalSetup = jest.fn()
        const component = { ...options, setup: originalSetup }
        const routed = setupPage(component, 'pages/index/index')
        expect(routed.inheritAttrs).toBe(vapor ? false : options.inheritAttrs)
        expect(component.inheritAttrs).toBe(options.inheritAttrs)
        expect(component.setup).toBe(originalSetup)
        expect(routed.setup).not.toBe(originalSetup)
      }
      expect(setupWindow({ inheritAttrs: true }, 1).inheritAttrs).toBe(true)
      page.setup({}, {})
      expect(vapor ? instance.__pageQuery : instance.attrs.__pageQuery).toEqual(
        query
      )
      expect(instance.proxy.options).toEqual(query)
      expect(instance.proxy.$basePage.options).toEqual(query)
      expect(initUniPageHooks).toHaveBeenCalledTimes(vapor && !ssr ? 1 : 0)
      initUniPageHooks.mockClear()
      const setup = jest.fn(() => 'block')
      expect(setupPage({ setup }, 'pages/index/index').setup({}, {})).toBe(
        'block'
      )
      setupWindow({}, 1).setup({}, {})
      expect(initUniPageHooks).not.toHaveBeenCalled()
      expect(setup).toHaveBeenCalledTimes(1)
    }
  )
})
