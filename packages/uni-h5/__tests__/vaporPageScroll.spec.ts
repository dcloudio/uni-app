import fs from 'fs'
import path from 'path'
import ts from 'typescript'
import {
  createScrollListener,
  disableScrollListener,
} from '../../uni-core/src/helpers/scroll'
import { normalizePageSelector } from '../src/helpers/pageSelector'

describe('Web Vapor 页面区域滚动', () => {
  let dom: any
  const globals = new Map<string, any>()
  const callbacks = new Map<number, FrameRequestCallback>()
  let frameId = 0
  const scrollTo = jest.fn()
  const getCurrentPage = jest.fn()
  const getPageBody = jest.fn((instance) => instance.body)
  const resolve = jest.fn()
  let pageScrollTo: Function
  let legacyPageScrollTo: Function
  let initPageScrollListener: Function
  let vue: typeof import('vue')
  const publishHandler = jest.fn()

  beforeAll(() => {
    const { JSDOM } = jest.requireActual('jsdom')
    dom = new JSDOM('<!doctype html><body></body>')
    for (const name of [
      'window',
      'document',
      'requestAnimationFrame',
      'cancelAnimationFrame',
    ]) {
      globals.set(name, (global as any)[name])
      ;(global as any)[name] = dom.window[name]
    }
    global.requestAnimationFrame = (callback) => {
      callbacks.set(++frameId, callback)
      return frameId
    }
    global.cancelAnimationFrame = jest.fn((id) => callbacks.delete(id))

    const code = ts.transpileModule(
      fs.readFileSync(
        path.resolve(__dirname, '../src/service/api/ui/pageScrollTo.ts'),
        'utf8'
      ),
      { compilerOptions: { module: ts.ModuleKind.CommonJS } }
    ).outputText
    function load(vapor: boolean) {
      const exports = {} as any
      const imports: Record<string, any> = {
        '@dcloudio/uni-api': {
          defineAsyncApi: (_name: string, handler: Function) => handler,
        },
        '@dcloudio/uni-shared': { scrollTo },
        '@dcloudio/uni-core': { getCurrentPage },
        '../../../helpers/pageBody': { getPageBody },
        '../../../helpers/pageSelector': { normalizePageSelector },
      }
      new Function('require', 'exports', '__VAPOR__', code)(
        (id: string) => imports[id],
        exports,
        vapor
      )
      return exports.pageScrollTo
    }
    pageScrollTo = load(true)
    legacyPageScrollTo = load(false)
    vue = jest.requireActual('vue')
    const pageCode = ts.transpileModule(
      fs.readFileSync(
        path.resolve(__dirname, '../src/framework/setup/page.ts'),
        'utf8'
      ),
      { compilerOptions: { module: ts.ModuleKind.CommonJS } }
    ).outputText
    const imports: Record<string, any> = {
      vue,
      '@vue/shared': jest.requireActual('@vue/shared'),
      'vue-router': {},
      '@dcloudio/uni-core': { createScrollListener, disableScrollListener },
      '@dcloudio/uni-shared': {
        ON_PAGE_SCROLL: 'onPageScroll',
        ON_REACH_BOTTOM: 'onReachBottom',
        ON_REACH_BOTTOM_DISTANCE: 50,
      },
      './provide': {},
      '../../helpers/pageBody': { getPageBody },
      '../../helpers/dom': { getStateId: () => 1 },
      '../../helpers/cssVar': {},
      './utils': {},
      '../../service/api/route/utils': {},
      '../../x/service/api/route/utils': {},
      '../../x/framework/setup/page': {},
    }
    const exports = {} as any
    new Function(
      'require',
      'exports',
      '__VAPOR__',
      '__X__',
      'UniViewJSBridge',
      pageCode
    )((id: string) => imports[id], exports, true, true, { publishHandler })
    initPageScrollListener = exports.initPageScrollListener
  })

  beforeEach(() => {
    jest.useFakeTimers()
    jest.clearAllMocks()
    callbacks.clear()
    document.body.innerHTML = ''
  })

  afterEach(() => {
    jest.clearAllTimers()
    jest.useRealTimers()
  })

  afterAll(() => {
    for (const [name, value] of globals) {
      ;(global as any)[name] = value
    }
    dom.window.close()
  })

  function frame(time = performance.now()) {
    const pending = [...callbacks.values()]
    callbacks.clear()
    pending.forEach((callback) => callback(time))
  }

  function createBody(height = 200, scrollHeight = 1000) {
    const body = document.createElement('uni-page-body')
    document.body.appendChild(body)
    Object.defineProperties(body, {
      clientHeight: { value: height, configurable: true },
      scrollHeight: { value: scrollHeight, configurable: true },
    })
    body.scrollTo = jest.fn((options: ScrollToOptions) => {
      if (options.behavior === 'instant') {
        body.scrollTop = options.top!
      }
    }) as typeof body.scrollTo
    getCurrentPage.mockReturnValue({ vm: { $: { body } } })
    return body
  }

  test('pageScrollTo 即时定位当前页，并约束在有效滚动范围内', () => {
    const other = createBody()
    other.scrollTop = 30
    const body = createBody()
    pageScrollTo({ scrollTop: 900, duration: 0 }, { resolve })
    expect(body.scrollTo).toHaveBeenLastCalledWith({
      top: 800,
      behavior: 'instant',
    })
    pageScrollTo({ scrollTop: -10, duration: 0 }, { resolve })
    expect(body.scrollTo).toHaveBeenLastCalledWith({
      top: 0,
      behavior: 'instant',
    })
    expect(callbacks.size).toBe(0)
    expect(other.scrollTop).toBe(30)
    expect(other.scrollTo).not.toHaveBeenCalled()
    expect(document.documentElement.scrollTop).toBe(0)
    expect(scrollTo).not.toHaveBeenCalled()
  })

  test.each([100, 800])(
    'duration=%d 按实际帧时间推进，并在指定时长到达目标',
    (duration) => {
      const body = createBody()
      pageScrollTo({ scrollTop: 600, duration }, { resolve })
      expect(resolve).toHaveBeenCalledTimes(1)
      expect(body.scrollTop).toBe(0)
      frame(duration / 2)
      expect(body.scrollTop).toBe(300)
      frame(duration)
      expect(body.scrollTop).toBe(600)
      expect(callbacks.size).toBe(0)
      expect(body.scrollTo).toHaveBeenLastCalledWith({
        top: 600,
        behavior: 'instant',
      })
    }
  )

  test('丢帧时按已流逝时间完成，而非延长到固定帧数', () => {
    const body = createBody()
    pageScrollTo({ scrollTop: 600, duration: 100 }, { resolve })
    frame(150)
    expect(body.scrollTop).toBe(600)
    expect(callbacks.size).toBe(0)
  })

  test('即时请求取消本页未完成的动画', () => {
    const body = createBody()
    pageScrollTo({ scrollTop: 600, duration: 200 }, { resolve })
    frame(50)
    expect(body.scrollTop).toBe(150)
    pageScrollTo({ scrollTop: 320, duration: 0 }, { resolve })
    frame(200)
    expect(body.scrollTop).toBe(320)
    expect(callbacks.size).toBe(0)
  })

  test('新动画从当前位置开始，并取消旧动画', () => {
    const body = createBody()
    pageScrollTo({ scrollTop: 600, duration: 200 }, { resolve })
    jest.advanceTimersByTime(50)
    frame()
    expect(body.scrollTop).toBe(150)
    pageScrollTo({ scrollTop: 500, duration: 100 }, { resolve })
    jest.advanceTimersByTime(50)
    frame()
    expect(body.scrollTop).toBe(325)
    jest.advanceTimersByTime(50)
    frame()
    expect(body.scrollTop).toBe(500)
    expect(callbacks.size).toBe(0)
  })

  test('不同页面的动画互不取消', () => {
    const first = createBody()
    pageScrollTo({ scrollTop: 400, duration: 200 }, { resolve })
    const second = createBody()
    pageScrollTo({ scrollTop: 500, duration: 100 }, { resolve })
    frame(100)
    expect(first.scrollTop).toBe(200)
    expect(second.scrollTop).toBe(500)
    frame(200)
    expect(first.scrollTop).toBe(400)
    expect(second.scrollTop).toBe(500)
  })

  test('外部滚动或页面卸载后停止动画', () => {
    const body = createBody()
    pageScrollTo({ scrollTop: 600, duration: 200 }, { resolve })
    frame(50)
    body.scrollTop = 220
    frame(100)
    expect(body.scrollTop).toBe(220)
    expect(callbacks.size).toBe(0)
    pageScrollTo({ scrollTop: 600, duration: 200 }, { resolve })
    body.remove()
    frame(200)
    expect(body.scrollTop).toBe(220)
    expect(callbacks.size).toBe(0)
  })

  test('selector 在当前页面查找，坐标扣除正文位置并应用 offsetTop', () => {
    const other = createBody()
    other.innerHTML = '<div class="target"></div>'
    const body = createBody()
    body.innerHTML = '<div class="target"></div>'
    body.scrollTop = 20
    body.getBoundingClientRect = () => ({ top: 44 } as DOMRect)
    body.firstElementChild!.getBoundingClientRect = () =>
      ({ top: 144 } as DOMRect)
    pageScrollTo(
      { selector: '.target', offsetTop: 10, duration: 0 },
      { resolve }
    )
    expect(body.scrollTop).toBe(130)
    expect(other.scrollTop).toBe(0)
  })

  test('存在弹页时 pageScrollTo 继续滚动当前普通页面', () => {
    const body = createBody()
    const dialogBody = createBody()
    dialogBody.scrollTop = 40
    const dialogPage = { vm: { $: { body: dialogBody } } }
    getCurrentPage.mockReturnValue({
      vm: { $: { body } },
      getDialogPages: () => [dialogPage],
    })
    pageScrollTo({ scrollTop: 100, duration: 0 }, { resolve })
    expect(body.scrollTop).toBe(100)
    expect(dialogBody.scrollTop).toBe(40)
  })

  test('page selector 滚到正文原点，page 后代 selector 使用正文内的坐标', () => {
    const body = createBody()
    body.innerHTML = '<div class="target"></div>'
    body.scrollTop = 120
    pageScrollTo({ selector: 'page', offsetTop: 8, duration: 0 }, { resolve })
    expect(body.scrollTo).toHaveBeenLastCalledWith({
      top: 8,
      behavior: 'instant',
    })
    body.scrollTop = 120
    body.getBoundingClientRect = () => ({ top: 44 } as DOMRect)
    body.firstElementChild!.getBoundingClientRect = () =>
      ({ top: 64 } as DOMRect)
    pageScrollTo(
      { selector: 'page .target', offsetTop: 10, duration: 0 },
      { resolve }
    )
    expect(body.scrollTo).toHaveBeenLastCalledWith({
      top: 150,
      behavior: 'instant',
    })
    expect(callbacks.size).toBe(0)
  })

  test('非蒸汽模式继续使用原有 document 滚动实现', () => {
    legacyPageScrollTo({ scrollTop: 30, duration: 0 }, { resolve })
    expect(scrollTo).toHaveBeenCalledWith(30, 0, true)
    expect(getCurrentPage).not.toHaveBeenCalled()
    expect(resolve).toHaveBeenCalledTimes(1)
  })

  test('onPageScroll 和 onReachBottom 使用本页正文的偏移和高度', () => {
    const body = createBody()
    const onPageScroll = jest.fn()
    const onReachBottom = jest.fn()
    const listener = createScrollListener({
      scrollElement: body,
      onPageScroll,
      onReachBottom,
      onReachBottomDistance: 50,
    })
    body.scrollTop = 760
    listener()
    frame()
    expect(onPageScroll).toHaveBeenCalledWith(760)
    expect(onReachBottom).toHaveBeenCalledTimes(1)
    listener.dispose()
  })

  test('未指定区域容器时保留原有 window 滚动事件与触底计算', () => {
    const properties = [
      [window, 'innerHeight', 800],
      [window, 'scrollY', 350],
      [window, 'pageYOffset', 350],
      [document.documentElement, 'scrollHeight', 1200],
    ] as const
    const descriptors = properties.map(([target, key]) =>
      Object.getOwnPropertyDescriptor(target, key)
    )
    properties.forEach(([target, key, value]) =>
      Object.defineProperty(target, key, { value, configurable: true })
    )
    const onPageScroll = jest.fn()
    const onReachBottom = jest.fn()
    const listener = createScrollListener({
      onPageScroll,
      onReachBottom,
      onReachBottomDistance: 50,
    })
    try {
      listener()
      frame()
      expect(onPageScroll).toHaveBeenCalledWith(350)
      expect(onReachBottom).toHaveBeenCalledTimes(1)
    } finally {
      listener.dispose()
      properties.forEach(([target, key], index) => {
        const descriptor = descriptors[index]
        if (descriptor) {
          Object.defineProperty(target, key, descriptor)
        } else {
          delete (target as any)[key]
        }
      })
    }
  })

  test('不同页面的延迟触底检查互不取消，卸载后停止回调', () => {
    const first = createBody()
    const second = createBody()
    const firstReachBottom = jest.fn()
    const secondReachBottom = jest.fn()
    const firstListener = createScrollListener({
      scrollElement: first,
      onReachBottom: firstReachBottom,
      onReachBottomDistance: 50,
    })
    const secondListener = createScrollListener({
      scrollElement: second,
      onReachBottom: secondReachBottom,
      onReachBottomDistance: 50,
    })
    first.scrollTop = 100
    firstListener()
    frame()
    first.scrollTop = 760
    second.scrollTop = 100
    secondListener()
    frame()
    jest.advanceTimersByTime(300)
    expect(firstReachBottom).toHaveBeenCalledTimes(1)
    expect(secondReachBottom).not.toHaveBeenCalled()
    firstListener.dispose()
    secondListener.dispose()
    second.scrollTop = 760
    jest.advanceTimersByTime(500)
    expect(secondReachBottom).not.toHaveBeenCalled()
  })

  test('普通页和弹页独立派发事件，动态禁用及卸载只清理对应正文', async () => {
    function createPage(id: number) {
      const scope = vue.effectScope()
      const body = createBody()
      const meta = vue.reactive({
        disableScroll: false,
        onReachBottomDistance: 50,
        navigationBar: {},
      })
      const instance = {
        body,
        scope,
        proxy: { $basePage: { id } },
        onPageScroll: [() => {}],
        onReachBottom: [() => {}],
      }
      initPageScrollListener(instance, meta)
      return { body, scope, meta }
    }
    const parent = createPage(1)
    const dialog = createPage(-2)
    await vue.nextTick()
    parent.body.scrollTop = 760
    dialog.body.scrollTop = 120
    parent.body.dispatchEvent(new dom.window.Event('scroll'))
    dialog.body.dispatchEvent(new dom.window.Event('scroll'))
    frame()
    expect(publishHandler.mock.calls).toEqual([
      ['onPageScroll', { scrollTop: 760 }, 1],
      ['onReachBottom', {}, 1],
      ['onPageScroll', { scrollTop: 120 }, -2],
    ])
    publishHandler.mockClear()
    dialog.meta.disableScroll = true
    await vue.nextTick()
    dialog.body.dispatchEvent(new dom.window.Event('scroll'))
    const textarea = document.createElement('textarea')
    dialog.body.appendChild(textarea)
    const touch = new dom.window.Event('touchmove', {
      cancelable: true,
      bubbles: true,
    })
    textarea.dispatchEvent(touch)
    expect(touch.defaultPrevented).toBe(false)
    parent.body.dispatchEvent(new dom.window.Event('scroll'))
    frame()
    expect(publishHandler).toHaveBeenCalledTimes(1)
    expect(publishHandler).toHaveBeenCalledWith(
      'onPageScroll',
      { scrollTop: 760 },
      1
    )
    parent.scope.stop()
    dialog.scope.stop()
    publishHandler.mockClear()
    parent.body.dispatchEvent(new dom.window.Event('scroll'))
    dialog.body.dispatchEvent(new dom.window.Event('scroll'))
    frame()
    expect(publishHandler).not.toHaveBeenCalled()
  })

  test('弹页子组件后续注册的滚动与触底 hook 持续更新本页监听', async () => {
    const body = createBody()
    const scope = vue.effectScope()
    const meta = vue.reactive({ navigationBar: {} })
    const instance = {
      body,
      scope,
      proxy: { $basePage: { id: -2 } },
      type: {},
      attrs: {},
    } as any
    const lifecycle = {
      onBeforeMount: () => {},
      onMounted: () => {},
      onBeforeActivate: () => {},
      onBeforeDeactivate: () => {},
      onBeforeUnmount: () => {},
    }
    const imports: Record<string, any> = {
      vue: Object.assign({}, vue, lifecycle, {
        getCurrentInstance: () => instance,
      }),
      '@vue/shared': jest.requireActual('@vue/shared'),
      '@dcloudio/uni-shared': {
        decodedQuery: (query: any) => query,
        parseQuery: () => ({}),
      },
      '@dcloudio/uni-core': {
        getPageInstanceByChild: () => ({ attrs: { route: 'pages/dialog' } }),
        isDialogPageInstance: () => true,
        getPageProxyId: () => -2,
        subscribeViewMethod: () => {},
      },
      '@dcloudio/uni-api': {},
      '../components/layout/index-vapor': {},
      '../..': {},
      './app': {},
      './page': {
        initPage: () => {},
        getPage$BasePage: () => instance.proxy.$basePage,
        initPageScrollListener,
      },
      './provide': {
        usePageRoute: () => ({ query: {} }),
        usePageMeta: () => meta,
      },
      './utils': {},
      'vue-router': {},
      '../../service/api/route/utils': {},
      '../../helpers/cssVar': {},
      '../../service/api/route/appRoute': {},
      '../../x/framework/setup/page': {},
    }
    const output = ts.transpileModule(
      fs.readFileSync(
        path.resolve(__dirname, '../src/framework/setup/index.ts'),
        'utf8'
      ),
      { compilerOptions: { module: ts.ModuleKind.CommonJS } }
    ).outputText
    const exports = {} as any
    new Function(
      'require',
      'exports',
      '__VAPOR__',
      '__X__',
      '__DEV__',
      '__NODE_JS__',
      '__UNI_FEATURE_PAGES__',
      '__uniConfig',
      output
    )((id: string) => imports[id], exports, true, true, false, false, false, {})
    scope.run(() => {
      exports.setupPage({ setup: () => {} }, 'pages/dialog').setup()
    })
    instance.onPageScroll.push(() => {})
    await vue.nextTick()
    await vue.nextTick()
    body.scrollTop = 120
    body.dispatchEvent(new dom.window.Event('scroll'))
    frame()
    expect(publishHandler).toHaveBeenCalledWith(
      'onPageScroll',
      { scrollTop: 120 },
      -2
    )
    publishHandler.mockClear()
    instance.onReachBottom.push(() => {})
    await vue.nextTick()
    await vue.nextTick()
    body.scrollTop = 760
    body.dispatchEvent(new dom.window.Event('scroll'))
    frame()
    expect(publishHandler).toHaveBeenCalledWith('onReachBottom', {}, -2)
    scope.stop()
  })
})
