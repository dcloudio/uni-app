import fs from 'fs'
import path from 'path'
import {
  compileFrameworkTsx,
  evaluateFramework,
  jsxRuntime,
} from './utils/frameworkTsx'

jest.mock('@vue/shared', () =>
  jest.requireActual(
    '../../uni-cli-shared/lib/dom2/web/@vue/shared/dist/shared.cjs.js'
  )
)

const root = path.resolve(__dirname, '../../..')
describe('框架 TSX 动态行为', () => {
  let dom: any, vue: any, vaporVue: any, vdomVue: any, jsx: any
  const globals = new Map<string, any>(),
    apps: any[] = []
  beforeAll(async () => {
    const { JSDOM } = jest.requireActual('jsdom')
    dom = new JSDOM('<!doctype html><body></body>', {
      url: 'http://localhost/',
    })
    for (const name of [
      'window',
      'document',
      'Node',
      'Element',
      'HTMLElement',
      'SVGElement',
      'Text',
      'Comment',
      'ShadowRoot',
    ]) {
      globals.set(name, (global as any)[name])
      ;(global as any)[name] = dom.window[name]
    }
    for (const name of [
      '__X__',
      '__VAPOR__',
      '__NODE_JS__',
      '__UNI_FEATURE_WXS__',
      '__UNI_FEATURE_PAGES__',
      '__UNI_FEATURE_TABBAR__',
      '__UNI_FEATURE_NAVIGATIONBAR__',
      '__UNI_FEATURE_NAVIGATIONBAR_BUTTONS__',
      '__UNI_FEATURE_NAVIGATIONBAR_SEARCHINPUT__',
      '__UNI_FEATURE_NAVIGATIONBAR_TRANSPARENT__',
      '__UNI_FEATURE_TABBAR_MIDBUTTON__',
      '__UNI_FEATURE_PULL_DOWN_REFRESH__',
      '__UNI_FEATURE_RESPONSIVE__',
      '__UNI_FEATURE_TOPWINDOW__',
      '__UNI_FEATURE_LEFTWINDOW__',
      '__UNI_FEATURE_RIGHTWINDOW__',
      '__uniConfig',
      '__uniRoutes',
      'UniServiceJSBridge',
    ]) {
      globals.set(name, (global as any)[name])
      ;(global as any)[name] = true
    }
    global.__NODE_JS__ = false
    global.__UNI_FEATURE_WXS__ = false
    vue = jest.requireActual(
      path.join(root, 'packages/uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js')
    )
    vaporVue = vue
    // 非 Vapor 使用发行中的 VDOM runtime 和配套 shared，不能用 Vapor 内置的 VDOM 互操作来代替。
    vdomVue = evaluateFramework(
      fs.readFileSync(
        path.join(root, 'packages/uni-h5-vue/dist-x/vue.runtime.cjs.js'),
        'utf8'
      ),
      {
        '@vue/shared': jest.requireActual('@vue/shared'),
        '@dcloudio/uni-shared': jest.requireActual(
          '../../uni-shared/dist/uni-shared.cjs.js'
        ),
      }
    )
    jsx = evaluateFramework(fs.readFileSync(jsxRuntime, 'utf8'), { vue })
  })
  beforeEach(() => {
    vue = vaporVue
  })
  afterEach(() => {
    apps.splice(0).forEach((app) => app.unmount())
    document.body.innerHTML = ''
  })
  afterAll(() => {
    dom.window.close()
    for (const [k, v] of globals) (global as any)[k] = v
  })
  function load(file: string, vapor: boolean, imports: Record<string, any>) {
    const defineSystemComponent = (options: any) => {
      options.__reserved = true
      if (vapor) {
        const setup = options.setup
        options.setup = (...args: any[]) => {
          const result = setup(...args)
          return typeof result === 'function' ? result() : result
        }
        return vue.defineVaporComponent(options)
      }
      return vue.defineComponent(options)
    }
    return evaluateFramework(compileFrameworkTsx(file, vapor), {
      vue,
      '/vue-jsx/vapor': jsx,
      '@dcloudio/uni-components': {
        defineSystemComponent,
        ...imports['@dcloudio/uni-components'],
      },
      '@vue/shared': jest.requireActual(
        '../../uni-cli-shared/lib/dom2/web/@vue/shared/dist/shared.cjs.js'
      ),
      ...Object.fromEntries(
        Object.entries(imports).filter(
          ([k]) => k !== '@dcloudio/uni-components'
        )
      ),
    }).default
  }
  function mount(Component: any, vapor: boolean) {
    const host = document.createElement('div')
    document.body.appendChild(host)
    const app = (vapor ? vue.createVaporApp : vue.createApp)(Component)
    apps.push(app)
    app.mount(host)
    return host
  }
  function stub(vapor: boolean, name: string) {
    return vapor
      ? vue.defineVaporComponent({
          setup() {
            return document.createElement(name)
          },
        })
      : vue.defineComponent({
          setup() {
            return () => vue.h(name)
          },
        })
  }

  test.each([true, false])(
    '导航栏标题、loading、搜索与按钮保持动态更新（Vapor=%s）',
    async (vapor) => {
      vue = vapor ? vaporVue : vdomVue
      global.__VAPOR__ = vapor
      const navigationBar = vue.reactive({
        titleText: '标题',
        type: 'default',
        titleColor: '#000',
        buttons: [
          { text: '按钮', float: 'right' },
          { text: '选择', float: 'left', type: 'none', select: true },
        ],
      })
      const Component = load('page/pageHead', vapor, {
        '@dcloudio/uni-components': { Input: stub(vapor, 'input-stub') },
        '../../../../../uni-components/src/vue/loading': {
          default: stub(vapor, 'loading-stub'),
        },
        '@dcloudio/uni-platform': { getRealPath: (s: string) => s },
        '@dcloudio/uni-core': {
          createSvgIconVNode: evaluateFramework(
            fs.readFileSync(
              path.join(root, 'packages/uni-core/src/helpers/icon-vdom.ts'),
              'utf8'
            ),
            { vue }
          ).createSvgIcon,
          ICON_PATH_BACK: 'back',
          ICON_PATH_CLOSE: 'close',
          ICON_PATH_SEARCH: 'search',
          invokeHook: jest.fn(),
        },
        '@dcloudio/uni-shared': {},
        '../../setup/provide': {
          usePageMeta: () => ({ navigationBar, isQuit: false }),
        },
        './transparent': {},
        '../../../helpers/theme': {
          useTheme: (x: any) => x,
          parseTheme: (x: any) => x,
        },
      })
      const host = mount(Component, vapor)
      expect(host.querySelector('.uni-page-head__title')!.textContent).toBe(
        '标题'
      )
      const backPath = host.querySelector(
        '.uni-page-head-hd > .uni-page-head-btn > svg path'
      )!
      expect(backPath.getAttribute('fill')).toBe('none')
      expect(backPath.getAttribute('stroke-width')).toBe('2')
      expect(
        host
          .querySelector('.uni-page-head-btn-select svg path')!
          .getAttribute('stroke-width')
      ).toBe('2')
      navigationBar.titleText = '新标题'
      await vue.nextTick()
      expect(host.querySelector('.uni-page-head__title')!.textContent).toBe(
        '新标题'
      )
      navigationBar.loading = true
      await vue.nextTick()
      expect(
        host.querySelector(vapor ? 'loading-stub' : '.uni-loading')
      ).not.toBeNull()
      navigationBar.loading = false
      await vue.nextTick()
      expect(host.querySelector('.uni-page-head__title')!.textContent).toBe(
        '新标题'
      )
      navigationBar.searchInput = {
        placeholder: '搜索',
        disabled: true,
        align: 'left',
      }
      await vue.nextTick()
      expect(host.querySelector('input-stub')).not.toBeNull()
      expect(
        host.querySelector('.uni-page-head-search')!.textContent
      ).toContain('搜索')
      const disabledInput = host.querySelector('input-stub')
      navigationBar.searchInput.disabled = false
      await vue.nextTick()
      expect(host.querySelector('input-stub')).not.toBe(disabledInput)
      delete navigationBar.searchInput
      await vue.nextTick()
      expect(host.querySelector('.uni-page-head-search')).toBeNull()
      expect(host.querySelector('.uni-page-head__title')!.textContent).toBe(
        '新标题'
      )
    }
  )

  test.each([true, false])(
    'TabBar 列表增删、徽标更新保留已有节点（Vapor=%s）',
    async (vapor) => {
      vue = vapor ? vaporVue : vdomVue
      const tabBar = vue.reactive({
        position: 'bottom',
        shown: true,
        height: '50px',
        list: [
          { pagePath: 'a', text: 'A' },
          { pagePath: 'b', text: 'B' },
        ],
      })
      const route = vue.reactive({
        path: '/a',
        meta: { isTabBar: true, route: 'a' },
      })
      global.__uniRoutes = [{ alias: '/a' }] as any
      const Component = load('layout/tabBar', vapor, {
        'vue-router': { useRoute: () => route },
        '@dcloudio/uni-core': {
          updatePageCssVar: jest.fn(),
          invokeHook: jest.fn(),
        },
        '@dcloudio/uni-api': {},
        '@dcloudio/uni-shared': {},
        '../../../platform': { getRealPath: (s: string) => s },
        '../../setup/state': { useTabBar: () => tabBar },
        '../../../service/api/base/canIUse': {},
        '../../../service/api/ui/loadFontFace': {},
        '../../../helpers/cssVar': { normalizeWindowBottom: (x: any) => x },
      })
      const host = mount(Component, vapor)
      const first = host.querySelector('.uni-tabbar__item')
      tabBar.list[0].text = '修改'
      await vue.nextTick()
      expect(host.querySelector('.uni-tabbar__item')).toBe(first)
      expect(first!.textContent).toContain('修改')
      tabBar.list.push({ pagePath: 'c', text: 'C' })
      await vue.nextTick()
      expect(host.querySelectorAll('.uni-tabbar__item')).toHaveLength(3)
      expect(host.querySelector('.uni-tabbar__item')).toBe(first)
      tabBar.list[0].badge = '2'
      tabBar.list[0].redDot = true
      await vue.nextTick()
      expect(first!.querySelector('.uni-tabbar__badge')!.textContent).toBe('2')
      tabBar.list.pop()
      tabBar.midButton = { text: '中间按钮' }
      await vue.nextTick()
      const middle = host.querySelector('.uni-tabbar__mid')!
      expect(host.querySelectorAll('.uni-tabbar__item')).toHaveLength(3)
      tabBar.midButton.text = '更新按钮'
      await vue.nextTick()
      expect(host.querySelector('.uni-tabbar__mid')).toBe(middle)
      expect(middle.parentElement!.textContent).toContain('更新按钮')
      tabBar.list[0].visible = false
      await vue.nextTick()
      expect(host.querySelector('.uni-tabbar__mid')).toBeNull()
    }
  )
  test.each([true, false])(
    '页面正文保留刷新事件、安全区和响应式内容（Vapor=%s）',
    async (vapor) => {
      vue = vapor ? vaporVue : vdomVue
      const meta = vue.reactive({ enablePullDownRefresh: true })
      const onTouchstart = jest.fn()
      let refreshRef: any
      let resize: () => void
      const safeArea = jest.fn(() => ({ top: 1, left: 2, right: 3, bottom: 4 }))
      const Component = load('page/pageBody', vapor, {
        '@dcloudio/uni-components': {
          ResizeSensor: vapor
            ? vue.defineVaporComponent({
                props: ['onResize'],
                setup(props: any) {
                  resize = props.onResize
                  return []
                },
              })
            : vue.defineComponent({
                props: ['onResize'],
                setup(props: any) {
                  resize = props.onResize
                  return () => null
                },
              }),
        },
        '../../setup/provide': { usePageMeta: () => meta },
        './page-refresh/component.vue': {
          default: stub(vapor, 'refresh-stub'),
        },
        './page-refresh': {
          usePageRefresh: (ref: any, explicitMeta?: any) => {
            expect(explicitMeta).toBe(vapor ? meta : undefined)
            refreshRef = ref
            return { onTouchstart }
          },
        },
        '../../../helpers/safeArea': { getSafeAreaInsets: safeArea },
      })
      Component.__scopeId = 'data-v-page-body'
      const text = vue.ref('正文')
      const slotTemplate = vapor ? vue.template('<span></span>') : undefined
      const Parent = vapor
        ? vue.defineVaporComponent({
            setup: () =>
              Component(meta, () => {
                const element = slotTemplate()
                vue.renderEffect(() => {
                  element.textContent = text.value
                })
                return element
              })(),
          })
        : vue.defineComponent({
            setup: () => () =>
              vue.h(Component, null, {
                default: () => vue.h('span', null, text.value),
              }),
          })
      const host = mount(Parent, vapor)
      await vue.nextTick()
      const wrapper = host.querySelector('uni-page-wrapper') as HTMLElement
      expect(host.querySelector('uni-page-body')!.textContent).toBe('正文')
      const slotElement = host.querySelector('uni-page-body span')!
      expect(slotElement.hasAttribute('data-v-page-body-s')).toBe(!vapor)
      text.value = '更新正文'
      await vue.nextTick()
      expect(slotElement.textContent).toBe('更新正文')
      expect(refreshRef.value).toBeTruthy()
      resize!()
      expect(safeArea).toHaveBeenCalledWith(wrapper)
      expect(wrapper.style.getPropertyValue('--uni-safe-area-inset-top')).toBe(
        '1px'
      )
      wrapper.dispatchEvent(new window.Event('touchstart'))
      expect(onTouchstart).toHaveBeenCalledTimes(1)
      meta.enablePullDownRefresh = false
      await vue.nextTick()
      wrapper.dispatchEvent(new window.Event('touchstart'))
      expect(onTouchstart).toHaveBeenCalledTimes(1)
      meta.enablePullDownRefresh = true
      await vue.nextTick()
      wrapper.dispatchEvent(new window.Event('touchstart'))
      expect(onTouchstart).toHaveBeenCalledTimes(2)
    }
  )

  test('Vapor Page 传入 query、保留页面 ref，dialogPage 增删不重建已有实例', async () => {
    global.__UNI_FEATURE_NAVIGATIONBAR__ = false
    const query = { message: '页面参数' }
    let pageInstance: any
    const Content = vue.defineVaporComponent({
      props: ['message'],
      setup(props: any) {
        const el = document.createElement('main')
        el.textContent = props.message
        return el
      },
    })
    global.__UNI_FEATURE_PULL_DOWN_REFRESH__ = false
    const usePageBody = load('page/pageBody', true, {
      '@dcloudio/uni-components': { ResizeSensor: stub(true, 'resize-stub') },
      './page-refresh/component.vue': {},
      './page-refresh': {},
      '../../../helpers/safeArea': {},
    })
    const Component = load('page/index-vapor', true, {
      '../../setup/provide': {
        providePageMeta: () => ({ route: 'index', navigationBar: {} }),
        usePageRoute: () => ({ query }),
      },
      '../../../helpers/useDocumentTitle': {
        useDocumentTitle: () => {
          pageInstance = vue.getCurrentInstance()
        },
      },
      '../../../helpers/useBackgroundColorContent': {
        useBackgroundColorContent: () => {},
      },
      '../../../helpers/dom': { getStateId: () => 1 },
      '../../setup/page': {},
      '@dcloudio/uni-shared': { stringifyQuery: () => '' },
      '@dcloudio/uni-core': {
        isDialogPageInstance: () => false,
        DIALOG_TAG: 'dialog',
        SYSTEM_DIALOG_TAG: 'system-dialog',
      },
      './pageHead-vapor': {},
      './pageBody-vapor': { default: usePageBody },
    })
    Component.__uniPageComponent = Content
    const host = mount(Component, true)
    await vue.nextTick()
    expect(host.querySelector('main')!.textContent).toBe(query.message)
    expect(pageInstance.refs.page).toBeTruthy()
    const originalPageRef = pageInstance.refs.page
    const originalPageElement = host.querySelector('main')
    let mounts = 0,
      unmounts = 0
    const Dialog = vue.defineVaporComponent({
      props: ['route'],
      setup(props: any) {
        mounts++
        vue.onUnmounted(() => unmounts++)
        const el = document.createElement('aside')
        el.textContent = props.route
        return el
      },
    })
    const first = {
      route: 'first',
      options: {},
      $component: vue.markRaw(Dialog),
    }
    const second = {
      route: 'second',
      options: {},
      $component: vue.markRaw(Dialog),
    }
    pageInstance.$dialogPages.value.push(first)
    await vue.nextTick()
    const firstElement = host.querySelector('aside')
    pageInstance.$systemDialogPages.value.push(second)
    await vue.nextTick()
    expect(host.querySelector('aside')).toBe(firstElement)
    expect(host.querySelectorAll('aside')).toHaveLength(2)
    expect(mounts).toBe(2)
    pageInstance.$systemDialogPages.value.pop()
    await vue.nextTick()
    expect(host.querySelector('aside')).toBe(firstElement)
    expect(unmounts).toBe(1)
    pageInstance.$dialogPages.value.pop()
    await vue.nextTick()
    expect(host.querySelector('aside')).toBeNull()
    expect(unmounts).toBe(2)
    expect(pageInstance.refs.page).toBe(originalPageRef)
    expect(host.querySelector('main')).toBe(originalPageElement)
  })

  test.each([false, true])(
    'Vapor Layout 路由往返复用页面，窗口 ref 与属性正常（响应式=%s）',
    async (responsive) => {
      Object.assign(global, {
        __UNI_FEATURE_PAGES__: true,
        __UNI_FEATURE_RESPONSIVE__: responsive,
        __UNI_FEATURE_TABBAR__: false,
        __UNI_FEATURE_TOPWINDOW__: responsive,
        __UNI_FEATURE_LEFTWINDOW__: false,
        __UNI_FEATURE_RIGHTWINDOW__: false,
        __uniConfig: {
          globalStyle: {},
          topWindow: { style: { height: '30px' } },
        },
        UniServiceJSBridge: { on: jest.fn() },
      })
      window.matchMedia = jest.fn(() => ({
        matches: true,
        addEventListener: jest.fn(),
      })) as any
      const route = vue.reactive({ path: '/a', meta: { route: 'a' } })
      const routeKey = vue.computed(() => route.path)
      let mounts = 0
      const Page = vue.defineVaporComponent({
        setup() {
          mounts++
          const el = document.createElement('article')
          el.textContent = route.path
          return el
        },
      })
      const Window = vue.defineVaporComponent({
        props: ['matchTopWindow'],
        setup(props: any) {
          const el = document.createElement('header')
          vue.renderEffect(
            () => (el.textContent = String(props.matchTopWindow))
          )
          return el
        },
      })
      ;(global.__uniConfig.topWindow as any).component = Window
      // 模拟 RouterView 的惰性 Block 协议，页面必须在 KeepAlive 内创建。
      const RouterView = vue.defineVaporComponent({
        inheritAttrs: false,
        setup(_: any, { slots }: any) {
          return slots.default({
            get Component() {
              return vue.createComponent(Page)
            },
          })
        },
      })
      const Component = load('layout/index-vapor', true, {
        'vue-router': { VaporRouterView: RouterView, useRoute: () => route },
        '@dcloudio/uni-core': {
          updateCssVar: jest.fn(),
          getRouteOptions: () => ({ meta: {} }),
        },
        '@dcloudio/uni-shared': { RESPONSIVE_MIN_WIDTH: 768 },
        '../../setup/state': {},
        '../../setup/page': {
          getCurrentBasePages: () => [],
          useKeepAliveRoute: () => ({ routeKey, isTabBar: vue.ref(false) }),
        },
        '../../setup/provide': { usePageRoute: () => route },
        '../../../helpers/dom': { checkMinWidth: () => true },
        './state': { setLayoutState: () => {} },
        './tabBar-vapor': {},
      })
      const host = mount(Component, true)
      await vue.nextTick()
      const first = host.querySelector('article')
      expect(first!.textContent).toBe('/a')
      route.path = '/b'
      route.meta.route = 'b'
      await vue.nextTick()
      expect(host.querySelector('article')!.textContent).toBe('/b')
      route.path = '/a'
      route.meta.route = 'a'
      await vue.nextTick()
      expect(host.querySelector('article')).toBe(first)
      expect(mounts).toBe(2)
      if (responsive) {
        expect(host.querySelector('header')!.textContent).toBe('true')
        expect(
          host.querySelector('.uni-top-window')!.getAttribute('style')
        ).toContain('height: 30px')
        route.meta.topWindow = false
        await vue.nextTick()
        expect(
          (host.querySelector('uni-top-window') as HTMLElement).style.display
        ).toBe('none')
      }
    }
  )
  test('Vapor Layout 单页面直接渲染首页，不初始化 Router', async () => {
    Object.assign(global, {
      __UNI_FEATURE_PAGES__: false,
      __UNI_FEATURE_RESPONSIVE__: false,
      __UNI_FEATURE_TABBAR__: false,
      __UNI_FEATURE_TOPWINDOW__: false,
      __UNI_FEATURE_LEFTWINDOW__: false,
      __UNI_FEATURE_RIGHTWINDOW__: false,
      __uniConfig: { globalStyle: {} },
      __uniRoutes: [{ component: stub(true, 'first-page') }],
    })
    const useRoute = jest.fn(() => {
      throw new Error('单页面不应初始化 Router')
    })
    const Component = load('layout/index-vapor', true, {
      'vue-router': { useRoute },
      '@dcloudio/uni-core': {
        updateCssVar: jest.fn(),
        getRouteOptions: () => ({ meta: {} }),
      },
      '@dcloudio/uni-shared': {},
      '../../setup/state': {},
      '../../setup/page': {
        getCurrentBasePages: () => [],
        useKeepAliveRoute: useRoute,
      },
      '../../setup/provide': { usePageRoute: () => ({ path: '/' }) },
      '../../../helpers/dom': {},
      './state': { setLayoutState: () => {} },
      './tabBar-vapor': {},
    })
    const host = mount(Component, true)
    await vue.nextTick()
    expect(host.querySelector('first-page')).not.toBeNull()
    expect(useRoute).not.toHaveBeenCalled()
  })
})
