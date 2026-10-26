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
  let UniElement: any
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
      '__NODE_JS__',
    ]) {
      globals.set(name, (global as any)[name])
      ;(global as any)[name] = dom.window[name]
    }
    Object.assign(global, { __X__: true, __NODE_JS__: false })
    // JSDOM 不提供布局和滚动方法；模拟内部容器尺寸与原生方法，业务逻辑使用真实实现。
    for (const [key, value] of Object.entries({
      scrollHeight: 800,
      scrollWidth: 600,
      offsetHeight: 200,
      offsetWidth: 200,
    })) {
      Object.defineProperty(dom.window.HTMLElement.prototype, key, {
        configurable: true,
        get: () => value,
      })
    }
    dom.window.HTMLElement.prototype.scrollTo = function (
      x: number | ScrollToOptions,
      y?: number
    ) {
      if (typeof x === 'number') {
        this.scrollLeft = x
        this.scrollTop = y
      } else {
        if (x.left !== undefined) this.scrollLeft = x.left
        if (x.top !== undefined) this.scrollTop = x.top
      }
    }
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
      { '../web-vapor-elements': elements }
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
    const Refresher = evaluate(await compile('vue/refresher/index.tsx'), {
      vue,
      '/vue-jsx/vapor': jsx,
      '../../helpers/component': component,
      '../loading/index-x.vue': {
        default: vue.defineVaporComponent({
          props: { paused: Boolean },
          setup(props: { paused: boolean }) {
            const el = document.createElement('div')
            // 仅替代 Loading 图形，保留组件 props 更新以验证暂停状态的传递。
            vue.renderEffect(() =>
              el.setAttribute('data-paused', String(props.paused))
            )
            return el
          },
        }),
      },
    }).default
    const state = evaluate(
      await preprocess('vue/scroll-view/useScrollView.ts'),
      {
        vue,
        '@dcloudio/uni-shared': uniShared,
        '../../helpers/scroll': {
          disableScrollBounce() {},
          initScrollBounce() {},
        },
        '../../helpers/scrollend': evaluate(
          await preprocess('helpers/scrollend.ts'),
          { '@dcloudio/uni-shared': uniShared }
        ),
        '../../helpers/useEvent': {
          useCustomEvent:
            (rootRef: any, emit: Function) =>
            (name: string, _event: Event, detail: any) =>
              emit(name, { target: rootRef.value, detail }),
        },
      }
    )
    ScrollView = evaluate(await compile('vue/scroll-view/index-vapor.tsx'), {
      vue,
      '/vue-jsx/vapor': jsx,
      '../../helpers/component': component,
      '../refresher': { default: Refresher },
      './element-vapor': scrollElement,
      './useScrollView': state,
    }).default
  }, 30000)

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

  function mount(props = {}, slots = {}, active?: any) {
    const node = vue.shallowRef()
    let instance: any
    const Page = vue.defineVaporComponent({
      setup() {
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
      main: root.firstElementChild.firstElementChild as HTMLElement,
      content: root.querySelector('.uni-scroll-view-content') as HTMLElement,
    }
  }

  function scroll(main: HTMLElement, top: number, left: number, time: number) {
    main.scrollTop = top
    main.scrollLeft = left
    const event = new dom.window.Event('scroll', { bubbles: true })
    Object.defineProperty(event, 'timeStamp', { value: time })
    main.dispatchEvent(event)
  }

  test('根节点 ref 首次可见即具备滚动能力，属性和方法操作内部容器', async () => {
    const init = jest.spyOn(scrollElement, 'initScrollViewElement')
    const payload = { id: 1 }
    const direction = vue.ref('all')
    const { root, main, node, instance } = mount({
      direction: () => direction.value,
      'data-payload': () => payload,
    })
    await vue.nextTick()
    expect(root).toBeInstanceOf(dom.window.HTMLDivElement)
    expect(root).toBeInstanceOf(elements.UniViewElement)
    expect(root).toBeInstanceOf(UniElement)
    expect(root).toBeInstanceOf(scrollElement.UniScrollViewElement)
    expect(root.hasAttribute('uni-scroll-view')).toBe(true)
    expect(root.setAttribute).toBe(dom.window.Element.prototype.setAttribute)
    expect(root.removeAttribute).toBe(
      dom.window.Element.prototype.removeAttribute
    )
    expect(root.attachVmProps).toBeUndefined()
    expect(dom.window.customElements.get('uni-scroll-view')).toBeUndefined()
    expect(instance.exposed.$getMain()).toBe(main)
    expect(root.dataset.get('payload')).toBe(payload)
    root.setAttribute('data-payload', 'manual')
    expect(root.dataset.get('payload')).toBe(payload)
    expect(root.scrollHeight).toBe(800)
    expect(root.scrollWidth).toBe(600)
    root.scrollTop = 30
    root.scrollLeft = 20
    expect([main.scrollTop, main.scrollLeft]).toEqual([30, 20])
    const to = root.scrollTo
    const by = root.scrollBy
    to({ left: 40, top: 50, behavior: 'smooth' })
    by(10, 20)
    expect([root.scrollTop, root.scrollLeft]).toEqual([70, 50])
    to(5, 10)
    by({ top: 2, left: 3 })
    expect([root.scrollTop, root.scrollLeft]).toEqual([12, 8])
    direction.value = 'vertical'
    await vue.nextTick()
    root.scrollLeft = 99
    expect(root.scrollLeft).toBe(8)
    expect(main.style.overflowX).toBe('hidden')
    direction.value = 'horizontal'
    await vue.nextTick()
    root.scrollTop = 99
    expect(root.scrollTop).toBe(12)
    expect(main.style.overflowY).toBe('hidden')
    expect(root.scrollTo).toBe(to)
    expect(root.scrollBy).toBe(by)
    expect(node.value).toBe(root)
    expect(init).toHaveBeenCalledTimes(1)
  })

  test('滚动 props、scrollIntoView 和动画赋值保留既有行为', async () => {
    const props = vue.reactive({
      top: 25,
      left: 15,
      target: '',
      animation: false,
    })
    let target: HTMLElement
    const { root, main, content } = mount(
      {
        direction: () => 'all',
        scrollTop: () => props.top,
        scrollLeft: () => props.left,
        scrollIntoView: () => props.target,
        scrollWithAnimation: () => props.animation,
      },
      {
        default: () => {
          target = document.createElement('div')
          target.id = 'target'
          return target
        },
      }
    )
    await vue.nextTick()
    expect([root.scrollTop, root.scrollLeft]).toEqual([25, 15])
    props.top = 50
    props.left = 30
    await vue.nextTick()
    main.getBoundingClientRect = () => ({ top: 10, left: 20 } as DOMRect)
    target!.getBoundingClientRect = () => ({ top: 110, left: 60 } as DOMRect)
    props.target = 'target'
    await vue.nextTick()
    expect([root.scrollTop, root.scrollLeft]).toEqual([150, 70])
    props.animation = true
    await vue.nextTick()
    root.scrollTop = 900
    expect(content.style.transform).toContain('translateY(-450px)')
    expect(main.style.overflowY).toBe('hidden')
    content.dispatchEvent(new dom.window.Event('transitionend'))
    expect(root.scrollTop).toBe(600)
    expect(content.style.transform).toBe('')
    expect(main.style.overflowY).toBe('auto')
    root.scrollLeft = 900
    content.dispatchEvent(new dom.window.Event('transitionend'))
    expect(root.scrollLeft).toBe(400)
  })

  test('滚动事件、边界事件和卸载清理作用于内部容器', async () => {
    jest.useFakeTimers()
    const onScroll = jest.fn(),
      onUpper = jest.fn(),
      onLower = jest.fn(),
      onEnd = jest.fn()
    const { root, main, app } = mount({
      direction: () => 'all',
      onScroll: () => onScroll,
      onScrolltoupper: () => onUpper,
      onScrolltolower: () => onLower,
      onScrollend: () => onEnd,
    })
    await vue.nextTick()
    scroll(main, 600, 400, 300)
    expect(onScroll.mock.calls[0][0]).toEqual({
      target: root,
      detail: {
        scrollTop: 600,
        scrollLeft: 400,
        scrollHeight: 800,
        scrollWidth: 600,
        deltaX: -400,
        deltaY: -600,
      },
    })
    expect(onLower.mock.calls[0][0].detail.direction).toBe('bottom')
    scroll(main, 0, 0, 600)
    expect(onUpper.mock.calls[0][0].detail.direction).toBe('top')
    if ('onscrollend' in main)
      main.dispatchEvent(new dom.window.Event('scrollend'))
    else jest.advanceTimersByTime(100)
    expect(onEnd).toHaveBeenCalledTimes(1)
    const remove = jest.spyOn(main, 'removeEventListener')
    app.unmount()
    apps.splice(apps.indexOf(app), 1)
    scroll(main, 200, 200, 900)
    jest.advanceTimersByTime(100)
    expect(onScroll).toHaveBeenCalledTimes(2)
    expect(remove.mock.calls.map((call) => call[0])).toEqual(
      expect.arrayContaining(['scroll', 'touchstart', 'touchmove', 'touchend'])
    )
  })

  test('Refresher 开关、属性与插槽更新不替换滚动容器', async () => {
    const props = vue.reactive({
      enabled: false,
      triggered: false,
      threshold: 45,
      color: 'red',
      text: '下拉刷新',
      hidden: false,
    })
    const refresh = jest.fn(),
      restore = jest.fn(),
      update = jest.fn()
    const { root, main } = mount(
      {
        refresherEnabled: () => props.enabled,
        refresherTriggered: () => props.triggered,
        refresherDefaultStyle: () => 'none',
        refresherThreshold: () => props.threshold,
        refresherBackground: () => props.color,
        showScrollbar: () => !props.hidden,
        onRefresherrefresh: () => refresh,
        onRefresherrestore: () => restore,
        'onUpdate:refresherTriggered': () => update,
      },
      {
        refresher: () => {
          const el = document.createElement('span')
          vue.renderEffect(() => {
            el.textContent = props.text
          })
          return el
        },
      }
    )
    await vue.nextTick()
    expect(root.querySelector('.uni-scroll-view-refresher')).toBeNull()
    props.enabled = true
    await vue.nextTick()
    let refresher = root.querySelector('.uni-scroll-view-refresher')
    expect(refresher.querySelector('span').textContent).toBe('下拉刷新')
    props.triggered = true
    await vue.nextTick()
    expect(refresher.style.height).toBe('45px')
    expect(refresh).toHaveBeenCalledTimes(1)
    expect(update).toHaveBeenCalledWith(true)
    props.threshold = 60
    props.color = 'blue'
    props.text = '刷新中'
    props.hidden = true
    await vue.nextTick()
    expect(refresher.style.height).toBe('60px')
    expect(
      refresher.querySelector('.uni-scroll-view-refresher-container').style
        .height
    ).toBe('60px')
    expect(refresher.style.backgroundColor).toBe('blue')
    expect(refresher.querySelector('span').textContent).toBe('刷新中')
    expect(main.classList.contains('uni-scroll-view-scrollbar-hidden')).toBe(
      true
    )
    props.triggered = false
    await vue.nextTick()
    expect(refresher.style.height).toBe('0px')
    expect(restore).toHaveBeenCalledTimes(1)
    props.enabled = false
    await vue.nextTick()
    expect(root.querySelector('.uni-scroll-view-refresher')).toBeNull()
    props.enabled = true
    await vue.nextTick()
    refresher = root.querySelector('.uni-scroll-view-refresher')
    expect(refresher.querySelector('span').textContent).toBe('刷新中')
    expect(root.firstElementChild.firstElementChild).toBe(main)
  })

  test('默认刷新提示随状态显示和移除，样式与阈值可动态切换', async () => {
    const props = vue.reactive({
      triggered: false,
      style: 'black',
      threshold: 45,
    })
    const { root, main } = mount(
      {
        refresherEnabled: () => true,
        refresherTriggered: () => props.triggered,
        refresherDefaultStyle: () => props.style,
        refresherThreshold: () => props.threshold,
      },
      {
        refresher: () => {
          const el = document.createElement('span')
          el.textContent = '自定义刷新'
          return el
        },
      }
    )
    await vue.nextTick()
    const loading = () =>
      root.querySelector('.uni-scroll-view-refresh__loading')
    const container = () =>
      root.querySelector('.uni-scroll-view-refresher-container')
    expect(loading()).toBeNull()
    props.triggered = true
    await vue.nextTick()
    expect(loading()).not.toBeNull()
    expect(loading().getAttribute('data-paused')).toBe('false')
    expect(loading().style.color).toBe('black')
    props.style = 'white'
    await vue.nextTick()
    expect(loading().style.color).toBe('white')
    props.style = 'none'
    await vue.nextTick()
    expect(loading()).toBeNull()
    expect(container().querySelector('span').textContent).toBe('自定义刷新')
    expect(container().style.height).toBe('45px')
    props.threshold = 75
    await vue.nextTick()
    expect(container().style.height).toBe('75px')
    props.style = 'black'
    await vue.nextTick()
    expect(container()).toBeNull()
    expect(loading()).not.toBeNull()
    props.triggered = false
    await vue.nextTick()
    expect(loading()).toBeNull()
    expect(root.firstElementChild.firstElementChild).toBe(main)
  })

  test('触摸下拉暂停默认 loading，刷新时播放，恢复时移除', async () => {
    const triggered = vue.ref(false)
    const refresh = jest.fn()
    const pulling = jest.fn()
    const { root, main } = mount({
      refresherEnabled: () => true,
      refresherTriggered: () => triggered.value,
      onRefresherpulling: () => pulling,
      onRefresherrefresh: () => refresh,
      'onUpdate:refresherTriggered': () => (value: boolean) => {
        triggered.value = value
      },
    })
    await vue.nextTick()
    function touch(type: string, y: number) {
      const event = new dom.window.Event(type, {
        bubbles: true,
        cancelable: true,
      })
      const point = { identifier: 1, pageX: 0, pageY: y }
      Object.defineProperties(event, {
        touches: { value: type === 'touchend' ? [] : [point] },
        changedTouches: { value: [point] },
      })
      main.dispatchEvent(event)
    }
    touch('touchstart', 0)
    touch('touchmove', 10)
    touch('touchmove', 100)
    await vue.nextTick()
    const refresher = root.querySelector('.uni-scroll-view-refresher')
    expect(refresher.style.height).toBe('90px')
    const loading = () =>
      root.querySelector('.uni-scroll-view-refresh__loading')
    expect(loading().getAttribute('data-paused')).toBe('true')
    expect(loading().style.transform).toBe('rotate(360deg)')
    expect(pulling).toHaveBeenCalled()
    touch('touchend', 100)
    await vue.nextTick()
    expect(refresh).toHaveBeenCalledTimes(1)
    expect(triggered.value).toBe(true)
    expect(refresher.style.height).toBe('45px')
    expect(loading().getAttribute('data-paused')).toBe('false')
    expect(loading().style.transform).toBe('')
    triggered.value = false
    await vue.nextTick()
    expect(refresher.style.height).toBe('0px')
    expect(loading()).toBeNull()
  })

  test('KeepAlive 恢复滚动位置，复用原根节点与能力绑定', async () => {
    const active = vue.ref(true)
    const init = jest.spyOn(scrollElement, 'initScrollViewElement')
    const { root, main, host } = mount({ direction: () => 'all' }, {}, active)
    await vue.nextTick()
    scroll(main, 120, 80, 300)
    active.value = false
    await vue.nextTick()
    main.scrollTop = main.scrollLeft = 0
    active.value = true
    await vue.nextTick()
    expect(host.querySelector('[uni-scroll-view]')).toBe(root)
    expect([root.scrollTop, root.scrollLeft]).toEqual([120, 80])
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
