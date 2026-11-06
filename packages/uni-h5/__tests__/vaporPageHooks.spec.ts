import path from 'path'
import ts from 'typescript'
import jscc from 'rollup-plugin-jscc'
import { set } from '../../uni-vue/src/componentInstance'

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
        const initOptionMergeStrategies = jest.fn()
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
            './componentInstance': { set },
            './appConfig': { initOptionMergeStrategies },
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
        // Web Vapor 客户端关闭 Options API 后不再注入 $set，响应式对象直接赋值即可。
        // 旧模式和服务端仍遵循原有开关。
        expect((app.config.globalProperties as any).$set).toBe(
          optionsApi ? set : undefined
        )
        expect(initOptionMergeStrategies).toHaveBeenCalledTimes(
          vapor && !ssr ? 0 : 1
        )
        if (!vapor || ssr) {
          expect(initOptionMergeStrategies).toHaveBeenCalledWith(
            app.config.optionMergeStrategies
          )
        }
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
          '../components/layout/index-vapor': {},
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

describe('Web 弹窗不覆盖父页窗口变量', () => {
  async function createPageHarness(vapor: boolean) {
    const { JSDOM } = jest.requireActual('jsdom')
    const dom = new JSDOM('<!doctype html><html><body></body></html>')
    const { document } = dom.window
    const shared = jest.requireActual('../../uni-shared/src')
    let instance: any
    let pageMeta: any
    let parentPage: any
    let lifecycle: Record<string, Function[]>
    const dialogs: any[] = []
    const systemDialogs: any[] = []
    const tabBar = { shown: true, height: '50px' }
    const globals = {
      __X__: true,
      __DEV__: false,
      __NODE_JS__: false,
      __PLATFORM__: 'h5',
      __UNI_FEATURE_PAGES__: false,
      __UNI_FEATURE_NAVIGATIONBAR__: true,
      __UNI_FEATURE_TABBAR__: true,
      __uniConfig: { uvue: { 'flex-direction': 'column' } },
      document,
      window: dom.window,
    }
    const vue = {
      getCurrentInstance: () => instance,
      reactive: (value: any) => value,
      watch: () => {},
      nextTick: (callback: Function) => callback(),
      onBeforeMount: (callback: Function) =>
        lifecycle.beforeMount.push(callback),
      onMounted: (callback: Function) => lifecycle.mounted.push(callback),
      onBeforeActivate: (callback: Function) =>
        lifecycle.activate.push(callback),
      onBeforeDeactivate: () => {},
      onBeforeUnmount: (callback: Function) => lifecycle.unmount.push(callback),
      withModifiers: (callback: Function) => callback,
    }
    const dialogHelpers = await load(
      'packages/uni-core/src/helpers/dialogPage.ts',
      vapor,
      {
        '@dcloudio/uni-shared': shared,
        '@dcloudio/uni-core': { getCurrentPage: () => parentPage },
        './hook': { invokeHook: jest.fn() },
      },
      { ...globals, getCurrentPages: () => [parentPage] }
    )
    const core = {
      ...dialogHelpers,
      invokeHook: jest.fn(),
      getCurrentPage: () => parentPage,
      getPageProxyId: () => 1,
      subscribeViewMethod: () => {},
      unsubscribeViewMethod: () => {},
      disableScrollListener: () => {},
    }
    const domHelpers = await load(
      'packages/uni-core/src/helpers/dom.ts',
      vapor,
      { vue, 'safe-area-insets': { default: {} } },
      globals
    )
    const cssHelpers = await load(
      'packages/uni-h5/src/helpers/cssVar.ts',
      vapor,
      {
        '@dcloudio/uni-shared': shared,
        '@dcloudio/uni-core': domHelpers,
        '../framework/setup/state': { useTabBar: () => tabBar },
        '../service/api/base/canIUse': { cssEnv: true, cssConstant: false },
      },
      globals
    )
    const pageHelpers = await load(
      'packages/uni-h5/src/framework/setup/page.ts',
      vapor,
      {
        vue,
        '@vue/shared': jest.requireActual('@vue/shared'),
        'vue-router': {},
        '@dcloudio/uni-core': core,
        '@dcloudio/uni-shared': shared,
        './provide': {},
        '../../service/api/route/utils': {},
        '../../helpers/cssVar': cssHelpers,
        '../../helpers/dom': { getStateId: () => 1 },
        './utils': { getScopeId: (value: any) => value.type.__scopeId },
        '../../x/service/api/route/utils': {},
        '../../x/framework/setup/page': {},
      },
      globals
    )
    const { setupPage } = await load(
      'packages/uni-h5/src/framework/setup/index.ts',
      vapor,
      {
        vue,
        '@vue/shared': jest.requireActual('@vue/shared'),
        '@dcloudio/uni-shared': shared,
        '@dcloudio/uni-api': {},
        '@dcloudio/uni-core': core,
        '../components/layout/index-vapor': {},
        '../..': {},
        './app': {},
        './page': { ...pageHelpers, initPage: () => {} },
        './provide': {
          usePageRoute: () => ({ query: {}, meta: pageMeta }),
          usePageMeta: () => pageMeta,
        },
        './utils': {},
        'vue-router': {},
        '../../service/api/route/utils': {},
        '../../helpers/cssVar': cssHelpers,
        '../../service/api/route/appRoute': { dispatchWebAppRoute: () => {} },
        '../../x/framework/setup/page': { useBackgroundColorContent: () => {} },
      },
      globals
    )
    const { closeDialogPage } = await load(
      'packages/uni-h5/src/x/service/api/route/closeDialogPage.ts',
      vapor,
      {
        '../../../framework/setup/page': { decrementEscBackPageNum: () => {} },
        '@dcloudio/uni-core': core,
        '@dcloudio/uni-shared': shared,
      },
      { ...globals, getCurrentPages: () => [parentPage] }
    )
    function createPage(meta: any, type?: 'dialog' | 'systemDialog') {
      const pageRoot = document.createElement('uni-page')
      pageRoot.appendChild(document.createElement('uni-page-body'))
      document.body.appendChild(pageRoot)
      const layout = {
        type: { name: 'Page' },
        attrs: { 'data-type': type, route: 'uni:modal?title=test' },
        proxy: { $el: pageRoot },
      }
      const vm = { $basePage: { meta }, $page: null as any }
      instance = {
        type: { __scopeId: type ? 'data-v-dialog' : 'data-v-parent' },
        parent: layout,
        root: { type: {} },
        proxy: vm,
        attrs: {},
      }
      pageMeta = meta
      lifecycle = { beforeMount: [], mounted: [], activate: [], unmount: [] }
      const hooks = lifecycle
      const current = instance
      const page = {
        route: type === 'systemDialog' ? 'uni:modal' : 'pages/dialog',
        vm,
        $disableEscBack: true,
        $triggerParentHide: true,
        getParentPage: () => parentPage,
        getDialogPages: () => dialogs,
        $getSystemDialogPages: () => systemDialogs,
      }
      vm.$page = page
      if (type) {
        ;(type === 'dialog' ? dialogs : systemDialogs).push(page)
      } else {
        parentPage = page
        ;(vm as any).$pageLayoutInstance = {
          $systemDialogPages: { value: systemDialogs },
        }
      }
      setupPage({ setup: () => {} }, 'pages/test').setup({}, {})
      return {
        page,
        mount: () => {
          hooks.beforeMount.forEach((callback) => callback())
          hooks.mounted.forEach((callback) => callback())
        },
        activate: () => {
          current.__isVisible = false
          hooks.activate.forEach((callback) => callback())
        },
        close: () => {
          closeDialogPage({ dialogPage: page })
          hooks.unmount.forEach((callback) => callback())
          pageRoot.remove()
        },
      }
    }
    return {
      createPage,
      tabBar,
      style: document.documentElement.style,
      variables: () =>
        ['--window-top', '--window-bottom'].map((name) =>
          document.documentElement.style.getPropertyValue(name)
        ),
      dispose: () => dom.window.close(),
    }
  }

  test.each([true, false])(
    '普通和系统弹窗初始化、显示、激活及关闭保留父页偏移：vapor=%s',
    async (vapor) => {
      const harness = await createPageHarness(vapor)
      let write: jest.SpyInstance | undefined
      try {
        harness
          .createPage({ navigationBar: { type: 'default' }, isTabBar: true })
          .mount()
        const parentVariables = harness.variables()
        expect(parentVariables).toEqual([
          'calc(44px + env(safe-area-inset-top))',
          'calc(50px + env(safe-area-inset-bottom))',
        ])
        write = jest.spyOn(harness.style, 'setProperty')
        const dialogs = (['dialog', 'systemDialog'] as const).map((type) => {
          const dialog = harness.createPage(
            {
              navigationBar: { style: 'custom', type: 'default' },
              isTabBar: false,
            },
            type
          )
          expect(harness.variables()).toEqual(parentVariables)
          dialog.mount()
          dialog.activate()
          expect(harness.variables()).toEqual(parentVariables)
          return dialog
        })
        for (const dialog of dialogs.reverse()) {
          dialog.close()
          expect(harness.variables()).toEqual(parentVariables)
        }
        expect(write).not.toHaveBeenCalled()
      } finally {
        write?.mockRestore()
        harness.dispose()
      }
    }
  )

  test.each([true, false])(
    '普通页面切换和重新激活仍按导航栏、tabBar 更新偏移：vapor=%s',
    async (vapor) => {
      const harness = await createPageHarness(vapor)
      try {
        const parent = harness.createPage({
          navigationBar: { type: 'default' },
          isTabBar: true,
        })
        parent.mount()
        const parentVariables = harness.variables()
        harness.createPage({ navigationBar: { style: 'custom' } }).mount()
        expect(harness.variables()).toEqual([
          'calc(0px + env(safe-area-inset-top))',
          'calc(0px + env(safe-area-inset-bottom))',
        ])
        parent.activate()
        expect(harness.variables()).toEqual(parentVariables)
        harness.tabBar.shown = false
        parent.activate()
        expect(harness.variables()[1]).toBe(
          'calc(0px + env(safe-area-inset-bottom))'
        )
      } finally {
        harness.dispose()
      }
    }
  )
})
