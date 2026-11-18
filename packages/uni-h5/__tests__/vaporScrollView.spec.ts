import fs from 'fs'
import path from 'path'
import { createRequire } from 'module'
import { execFileSync } from 'child_process'
import jscc from 'rollup-plugin-jscc'
import ts from 'typescript'

// 真实 Vapor runtime 必须使用配套 shared，避免误加载工作区 VDOM 版本。
jest.mock('@vue/shared', () =>
  jest.requireActual(
    '../../uni-cli-shared/lib/dom2/web/@vue/shared/dist/shared.cjs.js'
  )
)

const root = path.resolve(__dirname, '../../..')
const components = path.join(root, 'packages/uni-components/src')

async function preprocess(file: string, vapor = true, server = false) {
  const plugin = jscc({
    values: { _X_: 1, _X_VAPOR_: +vapor, _NODE_JS_: +server },
  })
  return (await (plugin.load as any).call({}, path.join(components, file)))
    .code as string
}

function evaluate(code: string, imports: Record<string, any>) {
  const module = { exports: {} as any }
  const output = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText
  new Function('require', 'module', 'exports', output)(
    (id: string) => {
      if (!(id in imports)) throw new Error('缺少测试依赖：' + id)
      return imports[id]
    },
    module,
    module.exports
  )
  return module.exports
}

describe('Web Vapor ScrollView 原生宿主', () => {
  let dom: any
  let vue: any
  let ScrollView: any
  let elements: any
  let scrollElement: any
  let scrollContexts: any
  let usePageRefresh: Function
  let refreshHook: jest.Mock
  let UniElement: any
  let nativeScrollTo: jest.Mock
  const apps: any[] = []
  const globals = new Map<string, any>()

  beforeAll(async () => {
    const { JSDOM } = jest.requireActual('jsdom')
    dom = new JSDOM('<!DOCTYPE html><body></body>')
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
      'customElements',
      '__X__',
      '__X_VAPOR__',
      '__VAPOR__',
      '__NODE_JS__',
    ]) {
      globals.set(name, (global as any)[name])
      ;(global as any)[name] = dom.window[name]
    }
    Object.assign(global, {
      __X__: true,
      __X_VAPOR__: true,
      __VAPOR__: true,
      __NODE_JS__: false,
    })
    // JSDOM 不提供布局和滚动方法；模拟视口尺寸与原生方法，业务逻辑使用真实实现。
    for (const [key, value] of Object.entries({
      scrollHeight: 800,
      scrollWidth: 600,
      clientHeight: 200,
      clientWidth: 200,
      offsetHeight: 220,
      offsetWidth: 220,
    })) {
      Object.defineProperty(dom.window.HTMLElement.prototype, key, {
        configurable: true,
        get: () => value,
      })
    }
    nativeScrollTo = jest.fn(function (
      this: HTMLElement,
      x: number | ScrollToOptions,
      y?: number
    ) {
      const options = typeof x === 'number' ? { left: x, top: y } : x
      if (options.left !== undefined) {
        this.scrollLeft = Math.max(
          0,
          Math.min(options.left, this.scrollWidth - this.clientWidth)
        )
      }
      if (options.top !== undefined) {
        this.scrollTop = Math.max(
          0,
          Math.min(options.top, this.scrollHeight - this.clientHeight)
        )
      }
    })
    dom.window.HTMLElement.prototype.scrollTo = nativeScrollTo
    dom.window.HTMLElement.prototype.scrollBy = function (
      x: number | ScrollToOptions,
      y?: number
    ) {
      if (typeof x === 'number')
        this.scrollTo(this.scrollLeft + x, this.scrollTop + y!)
      else
        this.scrollTo({
          left: this.scrollLeft + (x.left || 0),
          top: this.scrollTop + (x.top || 0),
        })
    }
    vue = jest.requireActual(
      path.join(root, 'packages/uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js')
    )
    const shared = jest.requireActual(
      '../../uni-cli-shared/lib/dom2/web/@vue/shared/dist/shared.cjs.js'
    )
    const uniShared = jest.requireActual('@dcloudio/uni-shared')
    UniElement = evaluate(await preprocess('helpers/UniElement-vapor.ts'), {
      '@vue/shared': shared,
      '@dcloudio/uni-shared': uniShared,
    }).UniElement
    elements = evaluate(await preprocess('vue/web-vapor-elements.ts'), {
      '../helpers/UniElement': { UniElement },
      '@dcloudio/uni-shared': uniShared,
    })
    elements.installWebVaporElements(dom.window)
    scrollElement = evaluate(
      await preprocess('vue/scroll-view/element-vapor.ts'),
      { vue, '../web-vapor-elements': elements }
    )
    const component = evaluate(await preprocess('helpers/component.ts'), {
      '@vue/shared': shared,
      './component-vapor': evaluate(
        await preprocess('helpers/component-vapor.ts'),
        { vue }
      ),
      './animation': { default: {} },
    })
    const nodeRequire = createRequire(
      path.join(root, 'packages/uni-h5/package.json')
    )
    const jsxDir = path.dirname(nodeRequire.resolve('vue-jsx'))
    const compiler = nodeRequire.resolve('@vue-jsx/compiler', {
      paths: [jsxDir],
    })
    const runtime = path.join(
      path.dirname(
        nodeRequire.resolve('@vue-jsx/runtime', { paths: [jsxDir] })
      ),
      'vapor.js'
    )
    const jsx = evaluate(fs.readFileSync(runtime, 'utf8'), { vue })
    const compile = async (file: string) =>
      execFileSync(
        process.execPath,
        [
          '-e',
          `
      const fs = require('fs'); const compiler = require(${JSON.stringify(
        compiler
      )});
      process.stdout.write(compiler.transform(fs.readFileSync(0, 'utf8'), {
        filename: 'component.tsx', vapor: true
      }).code)
    `,
        ],
        { input: await preprocess(file), encoding: 'utf8' }
      )
    scrollContexts = evaluate(
      await preprocess('vue/scroll-view/ScrollViewContext.ts'),
      {}
    )
    const state = evaluate(
      await preprocess('vue/scroll-view/useScrollView-vapor.ts'),
      {
        vue,
        './ScrollViewContext': scrollContexts,
        '../../helpers/scrollend': evaluate(
          await preprocess('helpers/scrollend.ts'),
          { '@dcloudio/uni-shared': uniShared }
        ),
        '../../helpers/useEvent': evaluate(
          await preprocess('helpers/useEvent.ts'),
          {
            '@dcloudio/uni-shared': uniShared,
            '@dcloudio/uni-core': { createNativeEvent: jest.fn() },
          }
        ),
      }
    )
    refreshHook = jest.fn()
    usePageRefresh = evaluate(
      fs.readFileSync(
        path.join(
          root,
          'packages/uni-h5/src/framework/components/page/page-refresh/index.ts'
        ),
        'utf8'
      ),
      {
        vue,
        '@dcloudio/uni-core': { invokeHook: refreshHook },
        '@dcloudio/uni-api': {
          API_START_PULL_DOWN_REFRESH: 'startPullDownRefresh',
          API_STOP_PULL_DOWN_REFRESH: 'stopPullDownRefresh',
        },
        '@dcloudio/uni-components': {
          useSubscribe: () => {},
          withWebEvent: (handler: Function) => handler,
        },
        '../../../setup/provide': {},
        '@dcloudio/uni-shared': uniShared,
      }
    ).usePageRefresh
    ScrollView = evaluate(await compile('vue/scroll-view/index-vapor.tsx'), {
      vue,
      '/vue-jsx/vapor': jsx,
      '../../helpers/component': component,
      './element-vapor': scrollElement,
      './useScrollView-vapor': state,
    }).default
  }, 30000)

  beforeEach(() => jest.clearAllMocks())

  afterEach(() => {
    apps.splice(0).forEach((app) => app.unmount())
    document.body.innerHTML = ''
    jest.useRealTimers()
    jest.restoreAllMocks()
  })
  afterAll(() => {
    dom.window.close()
    globals.forEach((value, key) => {
      if (value === undefined) delete (global as any)[key]
      else (global as any)[key] = value
    })
  })

  function mount(props = {}, slots = {}, active?: any, setupPage?: () => void) {
    const node = vue.shallowRef()
    let instance: any
    const Page = vue.defineVaporComponent({
      setup() {
        setupPage?.()
        instance = vue.createComponent(ScrollView, props, slots)
        vue.setStaticTemplateRef(instance, node)
        vue.onMounted(() => expect(node.value.uniTagName).toBe('SCROLL-VIEW'))
        return instance
      },
    })
    const Empty = vue.defineVaporComponent({
      setup: () => document.createElement('aside'),
    })
    const App = vue.defineVaporComponent({
      setup: () =>
        active
          ? vue.createComponent(vue.VaporKeepAlive, null, {
              default: () =>
                vue.createDynamicComponent(() => (active.value ? Page : Empty)),
            })
          : vue.createComponent(Page),
    })
    const host = document.createElement('div')
    document.body.appendChild(host)
    const app = vue.createVaporApp(App)
    app.config.warnHandler = (message: string) => {
      throw new Error(message)
    }
    app.config.errorHandler = (error: Error) => {
      throw error
    }
    apps.push(app)
    app.mount(host)
    const root = node.value as any
    return {
      root,
      node,
      host,
      app,
      instance,
    }
  }

  function scroll(main: HTMLElement, top: number, left: number, time: number) {
    main.scrollTop = top
    main.scrollLeft = left
    const event = new dom.window.Event('scroll', { bubbles: true })
    Object.defineProperty(event, 'timeStamp', { value: time })
    main.dispatchEvent(event)
  }

  function scrollEnd(main: HTMLElement) {
    if ('onscrollend' in main)
      main.dispatchEvent(new dom.window.Event('scrollend'))
    else jest.advanceTimersByTime(100)
  }

  test('getAttribute 读取 props 默认值和更新值，保持 DOM 属性独立', async () => {
    const threshold = vue.ref(80)
    const { root, instance } = mount({ upperThreshold: () => threshold.value })
    expect(root.__uniProps).toBe(instance.props)
    expect(root.getAttribute('upper-threshold')).toBe('80')
    expect(root.getAttribute('lower-threshold')).toBe('50')
    expect(root.getAttribute('scroll-with-animation')).toBe('false')
    root.setAttribute('upper-threshold', 'dom')
    expect(root.getAttribute('upper-threshold')).toBe('80')
    expect(Element.prototype.getAttribute.call(root, 'upper-threshold')).toBe(
      'dom'
    )
    const method = root.getAttribute
    threshold.value = 120
    await vue.nextTick()
    expect(root.getAttribute).toBe(method)
    expect(root.getAttribute('upperThreshold')).toBe('120')
    expect(document.createElement('div').getAttribute).toBe(
      Element.prototype.getAttribute
    )
  })

  test('根节点直接承载插槽，原生属性和方法在 ref 首次可见时可用', async () => {
    const init = jest.spyOn(scrollElement, 'initScrollViewElement')
    const payload = { id: 1 }
    const direction = vue.ref('all')
    const { root, node, instance } = mount(
      {
        direction: () => direction.value,
        'data-payload': () => payload,
      },
      { default: () => document.createElement('article') }
    )
    await vue.nextTick()
    expect(root).toBeInstanceOf(dom.window.HTMLDivElement)
    expect(root).toBeInstanceOf(elements.UniViewElement)
    expect(root).toBeInstanceOf(UniElement)
    expect(root).toBeInstanceOf(scrollElement.UniScrollViewElement)
    expect(root.hasAttribute('uni-scroll-view')).toBe(true)
    expect(root.children).toHaveLength(1)
    expect(root.firstElementChild.tagName).toBe('ARTICLE')
    expect(root.setAttribute).toBe(dom.window.Element.prototype.setAttribute)
    expect(root.removeAttribute).toBe(
      dom.window.Element.prototype.removeAttribute
    )
    expect(root.attachVmProps).toBeUndefined()
    expect(dom.window.customElements.get('uni-scroll-view')).toBeUndefined()
    expect(instance.exposed.$getMain()).toBe(root)
    expect(root.dataset.get('payload')).toBe(payload)
    root.setAttribute('data-payload', 'manual')
    expect(root.dataset.get('payload')).toBe(payload)
    expect(root.scrollHeight).toBe(800)
    expect(root.scrollWidth).toBe(600)
    expect(Object.getOwnPropertyDescriptor(root, 'scrollTop')).toBeUndefined()
    expect(
      Object.getOwnPropertyDescriptor(root, 'scrollHeight')
    ).toBeUndefined()
    root.scrollTop = 30
    root.scrollLeft = 20
    expect([root.scrollTop, root.scrollLeft]).toEqual([30, 20])
    const to = root.scrollTo
    const by = root.scrollBy
    expect(to).toBe(dom.window.HTMLElement.prototype.scrollTo)
    expect(by).toBe(dom.window.HTMLElement.prototype.scrollBy)
    expect(Object.getOwnPropertyDescriptor(root, 'scrollTo')).toBeUndefined()
    expect(Object.getOwnPropertyDescriptor(root, 'scrollBy')).toBeUndefined()
    root.scrollTo({ left: 40, top: 50, behavior: 'smooth' })
    root.scrollBy(10, 20)
    expect([root.scrollTop, root.scrollLeft]).toEqual([70, 50])
    root.scrollTo(5, 10)
    root.scrollBy({ top: 2, left: 3 })
    expect([root.scrollTop, root.scrollLeft]).toEqual([12, 8])
    direction.value = 'vertical'
    await vue.nextTick()
    root.scrollLeft = 99
    expect(root.scrollLeft).toBe(99)
    expect(root.style.overflowX).toBe('hidden')
    direction.value = 'horizontal'
    await vue.nextTick()
    root.scrollTop = 99
    expect(root.scrollTop).toBe(99)
    expect(root.style.overflowY).toBe('hidden')
    expect(root.scrollTo).toBe(to)
    expect(root.scrollBy).toBe(by)
    expect(node.value).toBe(root)
    expect(init).toHaveBeenCalledTimes(1)
  })

  test('双向 props 和带冒号的 scrollIntoView 一次提交原生滚动，动画由根节点样式控制', async () => {
    const direction = vue.ref('all')
    const props = vue.reactive({
      top: '25',
      left: '15',
      target: '',
      animation: false,
    })
    let target: HTMLElement
    const { root } = mount(
      {
        direction: () => direction.value,
        scrollTop: () => props.top,
        scrollLeft: () => props.left,
        scrollIntoView: () => props.target,
        scrollWithAnimation: () => props.animation,
      },
      {
        default: () => {
          target = document.createElement('div')
          target.id = 'target:item'
          return target
        },
      }
    )
    await vue.nextTick()
    expect([root.scrollTop, root.scrollLeft]).toEqual([25, 15])
    expect(root.style.scrollBehavior).toBe('auto')
    nativeScrollTo.mockClear()
    props.top = 50
    props.left = 30
    await vue.nextTick()
    expect(nativeScrollTo).toHaveBeenCalledTimes(1)
    expect(nativeScrollTo).toHaveBeenLastCalledWith({
      top: 50,
      left: 30,
    })
    root.getBoundingClientRect = () => ({ top: 10, left: 20 } as DOMRect)
    Object.defineProperties(root, {
      clientTop: { value: 5 },
      clientLeft: { value: 3 },
    })
    target!.getBoundingClientRect = () => ({ top: 110, left: 60 } as DOMRect)
    nativeScrollTo.mockClear()
    props.animation = true
    props.target = 'target:item'
    await vue.nextTick()
    expect(nativeScrollTo).toHaveBeenCalledTimes(1)
    expect(nativeScrollTo).toHaveBeenLastCalledWith({
      top: 145,
      left: 67,
    })
    expect(root.style.scrollBehavior).toBe('smooth')
    expect([root.scrollTop, root.scrollLeft]).toEqual([145, 67])
    nativeScrollTo.mockClear()
    props.animation = true
    props.top = 900
    props.left = 900
    await vue.nextTick()
    expect(nativeScrollTo).toHaveBeenCalledTimes(1)
    expect(nativeScrollTo).toHaveBeenLastCalledWith({
      top: 900,
      left: 900,
    })
    expect([root.scrollTop, root.scrollLeft]).toEqual([600, 400])
    expect(root.style.transform).toBe('')
    expect(root.style.transition).toBe('')
    root.scrollTop = 100
    expect(root.scrollTop).toBe(100)
    expect(nativeScrollTo).toHaveBeenCalledTimes(1)
    props.top = -100
    props.left = -100
    await vue.nextTick()
    expect([root.scrollTop, root.scrollLeft]).toEqual([0, 0])
    nativeScrollTo.mockClear()
    direction.value = 'vertical'
    props.animation = false
    props.top = '90'
    props.left = '100'
    await vue.nextTick()
    expect(nativeScrollTo).toHaveBeenCalledTimes(1)
    expect(nativeScrollTo).toHaveBeenLastCalledWith({
      top: 90,
    })
    expect(root.style.scrollBehavior).toBe('auto')
    expect([root.scrollTop, root.scrollLeft]).toEqual([90, 0])
  })

  test('Context 动画参数独立于根节点的 scrollWithAnimation 默认行为', async () => {
    const animation = vue.ref(true)
    const { root } = mount({
      direction: () => 'all',
      scrollWithAnimation: () => animation.value,
    })
    await vue.nextTick()
    const context = scrollContexts.getScrollViewContext(root)
    expect(context).toBeDefined()
    expect(root.style.scrollBehavior).toBe('smooth')
    nativeScrollTo.mockClear()
    context.scrollTo({ top: 80, left: 30, animated: false })
    expect(nativeScrollTo).toHaveBeenLastCalledWith({
      top: 80,
      left: 30,
      behavior: 'instant',
    })
    animation.value = false
    await vue.nextTick()
    expect(root.style.scrollBehavior).toBe('auto')
    context.scrollTo({ top: 120, animated: true })
    expect(nativeScrollTo).toHaveBeenLastCalledWith({
      top: 120,
      behavior: 'smooth',
    })
    expect(root.scrollTo).toBe(dom.window.HTMLElement.prototype.scrollTo)
  })

  test('内层实际滚动不触发外层分页，滚动链到外层后按实际位移分页', async () => {
    jest.useFakeTimers()
    const inner = vue.shallowRef()
    const onEnd = jest.fn()
    const { root } = mount(
      { onScrollend: () => onEnd },
      {
        default: () => {
          const instance = vue.createComponent(ScrollView)
          vue.setStaticTemplateRef(instance, inner)
          return instance
        },
      }
    )
    await vue.nextTick()
    scrollContexts.getScrollViewContext(root).pagingEnabled = true
    scroll(root, 145, 0, 100)
    scrollEnd(root)
    nativeScrollTo.mockClear()
    onEnd.mockClear()
    const computedStyle = jest.spyOn(dom.window, 'getComputedStyle')

    inner.value.dispatchEvent(
      new dom.window.WheelEvent('wheel', { bubbles: true, deltaY: 145 })
    )
    scroll(inner.value, 145, 0, 300)
    expect(computedStyle).not.toHaveBeenCalled()
    scrollEnd(inner.value)
    expect(inner.value.scrollTop).toBe(145)
    expect(root.scrollTop).toBe(145)
    expect(nativeScrollTo).not.toHaveBeenCalled()
    expect(onEnd).not.toHaveBeenCalled()

    scroll(inner.value, 600, 0, 600)
    scrollEnd(inner.value)
    inner.value.dispatchEvent(
      new dom.window.WheelEvent('wheel', { bubbles: true, deltaY: 200 })
    )
    scroll(root, 345, 0, 900)
    scrollEnd(root)
    expect(root.scrollTop).toBe(400)
    expect(nativeScrollTo).toHaveBeenCalledTimes(1)
    expect(nativeScrollTo).toHaveBeenLastCalledWith({
      top: 400,
      behavior: 'smooth',
    })
    scroll(root, 400, 0, 1200)
    scrollEnd(root)
    expect(onEnd).toHaveBeenCalledTimes(1)
    expect(onEnd.mock.calls[0][0].detail.scrollTop).toBe(400)
  })

  test('原生滚动条拖动保留实际位置，正常派发结束且不建立分页意图', async () => {
    jest.useFakeTimers()
    const onEnd = jest.fn()
    const { root } = mount({ onScrollend: () => onEnd })
    await vue.nextTick()
    scrollContexts.getScrollViewContext(root).pagingEnabled = true
    nativeScrollTo.mockClear()
    root.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 220, height: 220 } as DOMRect)
    function pointer(type: string) {
      const event = new dom.window.MouseEvent(type, {
        bubbles: true,
        button: 0,
        clientX: 210,
        clientY: 100,
      })
      Object.defineProperties(event, {
        pointerId: { value: 1 },
        pointerType: { value: 'mouse' },
      })
      root.dispatchEvent(event)
    }

    pointer('pointerdown')
    scroll(root, 145, 0, 300)
    pointer('pointerup')
    scrollEnd(root)
    expect(root.scrollTop).toBe(145)
    expect(nativeScrollTo).not.toHaveBeenCalled()
    expect(onEnd).toHaveBeenCalledTimes(1)
    expect(onEnd.mock.calls[0][0].detail.scrollTop).toBe(145)
  })

  test.each(['input', 'textarea'])(
    '%s 内按键不建立分页意图，容器 PageDown 仍正常分页',
    async (tag) => {
      jest.useFakeTimers()
      const editor = document.createElement(tag)
      const { root } = mount({}, { default: () => editor })
      await vue.nextTick()
      scrollContexts.getScrollViewContext(root).pagingEnabled = true
      nativeScrollTo.mockClear()
      editor.dispatchEvent(
        new dom.window.KeyboardEvent('keydown', {
          bubbles: true,
          key: 'PageDown',
        })
      )
      scroll(root, 145, 0, 300)
      scrollEnd(root)
      expect(root.scrollTop).toBe(145)
      expect(nativeScrollTo).not.toHaveBeenCalled()

      root.dispatchEvent(
        new dom.window.KeyboardEvent('keydown', {
          bubbles: true,
          key: 'PageDown',
        })
      )
      scroll(root, 345, 0, 600)
      scrollEnd(root)
      expect(root.scrollTop).toBe(400)
      expect(nativeScrollTo).toHaveBeenCalledTimes(1)
      expect(nativeScrollTo).toHaveBeenLastCalledWith({
        top: 400,
        behavior: 'smooth',
      })
    }
  )

  test.each([
    [
      'flex column-reverse LTR',
      'vertical',
      'flex',
      'column-reverse',
      'ltr',
      -1,
    ],
    [
      'inline-flex row-reverse LTR',
      'horizontal',
      'inline-flex',
      'row-reverse',
      'ltr',
      -1,
    ],
    ['flex row-reverse RTL', 'horizontal', 'flex', 'row-reverse', 'rtl', 1],
    ['flex row LTR', 'horizontal', 'flex', 'row', 'ltr', 1],
    ['flex row RTL', 'horizontal', 'flex', 'row', 'rtl', -1],
    ['flex column RTL', 'vertical', 'flex', 'column', 'rtl', 1],
    ['block row-reverse LTR', 'horizontal', 'block', 'row-reverse', 'ltr', 1],
    [
      'flex row wrap-reverse LTR',
      'vertical',
      'flex',
      'row',
      'ltr',
      -1,
      'wrap-reverse',
    ],
    [
      'flex row-reverse wrap-reverse LTR',
      'vertical',
      'flex',
      'row-reverse',
      'ltr',
      -1,
      'wrap-reverse',
    ],
    [
      'flex column wrap-reverse LTR',
      'horizontal',
      'flex',
      'column',
      'ltr',
      -1,
      'wrap-reverse',
    ],
    [
      'inline-flex column-reverse wrap-reverse LTR',
      'horizontal',
      'inline-flex',
      'column-reverse',
      'ltr',
      -1,
      'wrap-reverse',
    ],
    [
      'flex column wrap-reverse RTL',
      'horizontal',
      'flex',
      'column',
      'rtl',
      1,
      'wrap-reverse',
    ],
    [
      'block row wrap-reverse LTR',
      'vertical',
      'block',
      'row',
      'ltr',
      1,
      'wrap-reverse',
    ],
    ['flex row wrap LTR', 'vertical', 'flex', 'row', 'ltr', 1, 'wrap'],
  ] as const)(
    '%s 分页从原点和回滚时均按实际坐标方向吸附',
    async (
      _name,
      direction,
      display,
      flexDirection,
      textDirection,
      sign,
      flexWrap: string = 'nowrap'
    ) => {
      jest.useFakeTimers()
      const onEnd = jest.fn()
      const { root } = mount({ direction, onScrollend: () => onEnd })
      await vue.nextTick()
      Object.assign(root.style, {
        display,
        flexDirection,
        flexWrap,
        direction: textDirection,
      })
      const horizontal = direction === 'horizontal'
      const property = horizontal ? 'scrollLeft' : 'scrollTop'
      const option = horizontal ? 'left' : 'top'
      Object.defineProperty(root, horizontal ? 'scrollWidth' : 'scrollHeight', {
        configurable: true,
        value: 1000,
      })
      // JSDOM 没有反向布局；只模拟该宿主的原生坐标范围，不改默认滚动 mock。
      const scrollTo = jest.fn((options: ScrollToOptions) => {
        const position = options[option]
        if (position !== undefined) {
          root[property] =
            sign < 0
              ? Math.max(-800, Math.min(0, position))
              : Math.max(0, Math.min(800, position))
        }
      })
      Object.defineProperty(root, 'scrollTo', {
        configurable: true,
        value: scrollTo,
      })
      scrollContexts.getScrollViewContext(root).pagingEnabled = true

      function scrollPosition(position: number, time: number) {
        scroll(root, horizontal ? 0 : position, horizontal ? position : 0, time)
      }
      function scrollEnd() {
        if ('onscrollend' in root)
          root.dispatchEvent(new dom.window.Event('scrollend'))
        else jest.advanceTimersByTime(100)
      }
      function wheel(delta: number) {
        root.dispatchEvent(
          new dom.window.WheelEvent('wheel', {
            bubbles: true,
            deltaX: horizontal ? delta : 0,
            deltaY: horizontal ? 0 : delta,
          })
        )
      }

      wheel(sign * 145)
      scrollPosition(sign * 145, 300)
      scrollEnd()
      expect(scrollTo).toHaveBeenLastCalledWith({
        [option]: sign * 200,
        behavior: 'smooth',
      })
      expect(root[property]).toBe(sign * 200)
      expect(onEnd).not.toHaveBeenCalled()
      scrollPosition(sign * 200, 600)
      scrollEnd()
      expect(onEnd).toHaveBeenCalledTimes(1)
      expect(onEnd.mock.calls[0][0].detail[property]).toBe(sign * 200)

      scrollPosition(sign * 500, 900)
      scrollEnd()
      scrollTo.mockClear()
      onEnd.mockClear()
      wheel(-sign * 145)
      scrollPosition(sign * 355, 1200)
      scrollEnd()
      expect(scrollTo).toHaveBeenCalledTimes(1)
      expect(scrollTo).toHaveBeenCalledWith({
        [option]: sign * 400,
        behavior: 'smooth',
      })
      expect(root[property]).toBe(sign * 400)
      expect(onEnd).not.toHaveBeenCalled()
      scrollPosition(sign * 400, 1500)
      scrollEnd()
      expect(onEnd).toHaveBeenCalledTimes(1)
      expect(onEnd.mock.calls[0][0].detail[property]).toBe(sign * 400)
    }
  )

  test.each([
    ['column-reverse', 'column-reverse', 'nowrap'],
    ['row wrap-reverse', 'row', 'wrap-reverse'],
  ])(
    '%s 触摸从原点进入负坐标，手势归属和分页使用同一方向',
    async (_name, flexDirection, flexWrap) => {
      jest.useFakeTimers()
      const { root } = mount()
      await vue.nextTick()
      Object.assign(root.style, {
        display: 'flex',
        flexDirection,
        flexWrap,
        direction: 'ltr',
      })
      const scrollTo = jest.fn((options: ScrollToOptions) => {
        if (options.top !== undefined)
          root.scrollTop = Math.max(-600, Math.min(0, options.top))
      })
      Object.defineProperty(root, 'scrollTo', {
        configurable: true,
        value: scrollTo,
      })
      scrollContexts.getScrollViewContext(root).pagingEnabled = true

      function touch(type: string, y: number) {
        const event = new dom.window.Event(type, { bubbles: true })
        const point = { identifier: 1, pageX: 0, pageY: y }
        Object.defineProperties(event, {
          touches: { value: type === 'touchend' ? [] : [point] },
          changedTouches: { value: [point] },
        })
        const stop = jest.spyOn(event, 'stopPropagation')
        root.dispatchEvent(event)
        return stop
      }

      touch('touchstart', 100)
      expect(touch('touchmove', 120)).toHaveBeenCalledTimes(1)
      scroll(root, -145, 0, 300)
      touch('touchend', 120)
      if ('onscrollend' in root)
        root.dispatchEvent(new dom.window.Event('scrollend'))
      else jest.advanceTimersByTime(100)
      expect(scrollTo).toHaveBeenCalledTimes(1)
      expect(scrollTo).toHaveBeenCalledWith({ top: -200, behavior: 'smooth' })
      expect(root.scrollTop).toBe(-200)
    }
  )

  test('不存在的 scrollIntoView 不移动，非法 ID 输出错误且不抛选择器异常', async () => {
    const target = vue.ref('')
    mount({ scrollIntoView: () => target.value })
    await vue.nextTick()
    nativeScrollTo.mockClear()
    target.value = 'missing'
    await vue.nextTick()
    expect(nativeScrollTo).not.toHaveBeenCalled()
    const error = jest.spyOn(console, 'error').mockImplementation(() => {})
    target.value = '12-invalid'
    await vue.nextTick()
    expect(error).toHaveBeenCalledWith('id error: scroll-into-view=12-invalid')
    expect(nativeScrollTo).not.toHaveBeenCalled()
  })

  test('滚动事件、边界事件和卸载清理作用于根节点，视口尺寸不包含边框', async () => {
    jest.useFakeTimers()
    const onScroll = jest.fn(),
      onUpper = jest.fn(),
      onLower = jest.fn(),
      onEnd = jest.fn()
    const { root, app } = mount({
      direction: () => 'all',
      onScroll: () => onScroll,
      onScrolltoupper: () => onUpper,
      onScrolltolower: () => onLower,
      onScrollend: () => onEnd,
    })
    await vue.nextTick()
    scroll(root, 530, 330, 300)
    expect(onLower).not.toHaveBeenCalled()
    const event = onScroll.mock.calls[0][0]
    expect(event.type).toBe('scroll')
    expect(event.target === root).toBe(true)
    expect(event.currentTarget === root).toBe(true)
    expect(event.detail).toEqual({
      scrollTop: 530,
      scrollLeft: 330,
      scrollHeight: 800,
      scrollWidth: 600,
      deltaX: -330,
      deltaY: -530,
    })
    scroll(root, 600, 400, 600)
    expect(onLower.mock.calls[0][0].detail.direction).toBe('bottom')
    scroll(root, 0, 0, 900)
    expect(onUpper.mock.calls[0][0].detail.direction).toBe('top')
    if ('onscrollend' in root)
      root.dispatchEvent(new dom.window.Event('scrollend'))
    else jest.advanceTimersByTime(100)
    expect(onEnd).toHaveBeenCalledTimes(1)
    const remove = jest.spyOn(root, 'removeEventListener')
    app.unmount()
    apps.splice(apps.indexOf(app), 1)
    scroll(root, 200, 200, 1200)
    jest.advanceTimersByTime(100)
    expect(onScroll).toHaveBeenCalledTimes(3)
    expect(remove.mock.calls.map((call) => call[0])).toEqual(
      expect.arrayContaining([
        'scroll',
        'touchstart',
        'touchmove',
        'touchend',
        'touchcancel',
      ])
    )
  })

  test('字符串零阈值只在边界触发事件，200ms 内不重复触发', async () => {
    const onUpper = jest.fn(),
      onLower = jest.fn()
    const { root } = mount({
      upperThreshold: () => '0',
      lowerThreshold: () => '0',
      onScrolltoupper: () => onUpper,
      onScrolltolower: () => onLower,
    })
    await vue.nextTick()
    scroll(root, 580, 0, 300)
    expect(onLower).not.toHaveBeenCalled()
    scroll(root, 600, 0, 1000)
    expect(onLower).toHaveBeenCalledTimes(1)
    scroll(root, 599, 0, 1050)
    scroll(root, 600, 0, 1100)
    expect(onLower).toHaveBeenCalledTimes(1)
    scroll(root, 599, 0, 1250)
    scroll(root, 600, 0, 1300)
    expect(onLower).toHaveBeenCalledTimes(2)
    scroll(root, 0, 0, 1400)
    expect(onUpper.mock.calls[0][0].detail.direction).toBe('top')
  })

  test('手势在滚动边界交给外层，touchcancel 和 touchend 清理手势状态', async () => {
    const { root } = mount()
    await vue.nextTick()
    function touch(type: string, y: number) {
      const event = new dom.window.Event(type, { bubbles: true })
      const point = { identifier: 1, pageX: 0, pageY: y }
      Object.defineProperties(event, {
        touches: {
          value: type === 'touchend' || type === 'touchcancel' ? [] : [point],
        },
        changedTouches: { value: [point] },
      })
      const stop = jest.spyOn(event, 'stopPropagation')
      root.dispatchEvent(event)
      return stop
    }
    touch('touchstart', 100)
    expect(touch('touchmove', 120)).not.toHaveBeenCalled()
    // 尚未越过起点时反转，仍应按当前增量恢复内部滚动。
    expect(touch('touchmove', 110)).toHaveBeenCalledTimes(1)
    expect(touch('touchmove', 80)).toHaveBeenCalledTimes(1)
    root.scrollTop = 600
    expect(touch('touchmove', 80)).not.toHaveBeenCalled()
    touch('touchcancel', 80)
    root.scrollTop = 0
    expect(touch('touchmove', 80)).not.toHaveBeenCalled()
    touch('touchstart', 100)
    expect(touch('touchmove', 80)).toHaveBeenCalledTimes(1)
    touch('touchend', 80)
    expect(touch('touchmove', 60)).not.toHaveBeenCalled()
  })

  test.each([1, 0])(
    '默认纵向滚动中的横向抖动不会触发父页下拉刷新，纵向增量=%s',
    async (jitterY) => {
      const refreshElement = document.createElement('div')
      refreshElement.innerHTML =
        '<div class="uni-page-refresh"><div class="uni-page-refresh-inner"></div></div>'
      let handlers: any
      const { root, host } = mount({ scrollTop: 200 }, {}, undefined, () => {
        handlers = usePageRefresh(
          { value: { $el: refreshElement } },
          {
            id: 1,
            enablePullDownRefresh: true,
            pullToRefresh: { range: 50, height: 50 },
          }
        )
      })
      await vue.nextTick()
      host.appendChild(refreshElement)
      host.addEventListener('touchstart', handlers.onTouchstartPassive, {
        passive: true,
      })
      host.addEventListener('touchmove', handlers.onTouchmove)
      host.addEventListener('touchend', handlers.onTouchend)

      function touch(type: string, x: number, y: number) {
        const event = new dom.window.Event(type, {
          bubbles: true,
          cancelable: true,
        })
        const point = { identifier: 1, pageX: x, pageY: y }
        Object.defineProperties(event, {
          touches: { value: type === 'touchend' ? [] : [point] },
          changedTouches: { value: [point] },
        })
        root.dispatchEvent(event)
        return event
      }

      touch('touchstart', 0, 100)
      touch('touchmove', 0, 120)
      const firstJitter = touch('touchmove', 3, 120 + jitterY)
      touch('touchmove', 3, 180)
      const secondJitter = touch('touchmove', 6, 180 + jitterY)
      touch('touchend', 6, 180 + jitterY)

      expect(firstJitter.defaultPrevented).toBe(false)
      expect(secondJitter.defaultPrevented).toBe(false)
      expect(refreshElement.className).toBe('')
      expect(refreshHook).not.toHaveBeenCalled()
      expect(root.scrollTop).toBe(200)

      // 内层到达顶部后，真实父页刷新逻辑仍能接管新的下拉手势。
      root.scrollTop = 0
      touch('touchstart', 0, 100)
      touch('touchmove', 0, 120)
      touch('touchmove', 0, 180)
      touch('touchend', 0, 180)
      expect(
        refreshElement.classList.contains('uni-page-refresh--refreshing')
      ).toBe(true)
      expect(refreshHook).toHaveBeenCalledWith(1, 'onPullDownRefresh')
    }
  )

  test('方向、滚动条、业务样式和插槽更新保持同一个根节点', async () => {
    const props = vue.reactive({
      direction: 'vertical',
      hidden: false,
      text: 'initial',
    })
    const { root, node } = mount(
      {
        direction: () => props.direction,
        showScrollbar: () => !props.hidden,
        class: () => 'business-scroll',
        style: () => ({
          height: '300px',
          padding: '12px',
          border: '8px solid black',
        }),
      },
      {
        default: () => {
          const element = document.createElement('article')
          vue.renderEffect(() => {
            element.textContent = props.text
          })
          return element
        },
      }
    )
    await vue.nextTick()
    const child = root.firstElementChild
    expect(root.style.overflowY).toBe('auto')
    props.direction = 'horizontal'
    props.hidden = true
    props.text = 'updated'
    await vue.nextTick()
    expect(node.value).toBe(root)
    expect(root.firstElementChild).toBe(child)
    expect(child.textContent).toBe('updated')
    expect(root.style.overflowX).toBe('auto')
    expect(root.style.overflowY).toBe('hidden')
    expect(root.style.height).toBe('300px')
    expect(root.style.padding).toBe('12px')
    expect(root.style.borderWidth).toBe('8px')
    expect(root.classList.contains('business-scroll')).toBe(true)
    expect(root.classList.contains('uni-scroll-view-scrollbar-hidden')).toBe(
      true
    )
    props.hidden = false
    await vue.nextTick()
    expect(root.classList.contains('uni-scroll-view-scrollbar-hidden')).toBe(
      false
    )
    expect(root.classList.contains('business-scroll')).toBe(true)
  })

  test('KeepAlive 立即恢复根节点滚动位置，复用原节点与能力绑定', async () => {
    const active = vue.ref(true)
    const init = jest.spyOn(scrollElement, 'initScrollViewElement')
    const { root, host } = mount(
      { direction: () => 'all', scrollWithAnimation: () => true },
      {},
      active
    )
    await vue.nextTick()
    scroll(root, 120, 80, 300)
    active.value = false
    await vue.nextTick()
    root.scrollTop = root.scrollLeft = 0
    active.value = true
    await vue.nextTick()
    expect(host.querySelector('[uni-scroll-view]')).toBe(root)
    expect([root.scrollTop, root.scrollLeft]).toEqual([120, 80])
    expect(nativeScrollTo).toHaveBeenLastCalledWith({
      top: 120,
      left: 80,
      behavior: 'instant',
    })
    expect(init).toHaveBeenCalledTimes(1)
  })

  test('非 Vapor 保留旧宿主和 mounted 绑定，服务端不初始化 DOM 能力', async () => {
    const vdom = await preprocess('vue/scroll-view/index.tsx', false)
    expect(vdom).toContain('<uni-scroll-view ref={rootRef}>')
    expect(vdom).toContain('rootElement.attachVmProps(props)')
    expect(vdom).toContain('main.value!.scrollTo.bind(main.value!)')
    expect(vdom).not.toMatch(/element-vapor|native: true|uni-view/)
    const server = await preprocess(
      'vue/scroll-view/index-vapor.tsx',
      true,
      true
    )
    expect(server).not.toMatch(/initScrollViewElement\(root/)
  })
})
