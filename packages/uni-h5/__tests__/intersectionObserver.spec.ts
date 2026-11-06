import path from 'path'
import ts from 'typescript'
import jscc from 'rollup-plugin-jscc'

// Vapor runtime 与测试模块使用同版本 shared。
jest.mock('@vue/shared', () =>
  jest.requireActual(
    '../../uni-cli-shared/lib/dom2/web/@vue/shared/dist/shared.cjs.js'
  )
)

const root = path.resolve(__dirname, '../../..')

describe('IntersectionObserver 组件范围查询', () => {
  let dom: any
  let vue: any
  let api: any
  let legacyApi: any
  let createIntersectionObserver: any
  const apps: any[] = []
  const observers: any[] = []
  const globals = new Map<string, any>()

  beforeAll(async () => {
    const { JSDOM } = jest.requireActual('jsdom')
    dom = new JSDOM('<!doctype html><body></body>')
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
      'IntersectionObserver',
      '__X__',
    ]) {
      globals.set(name, (global as any)[name])
      ;(global as any)[name] = name === '__X__' ? true : dom.window[name]
    }
    ;(global as any).IntersectionObserver = jest
      .fn()
      .mockImplementation((callback, options) => {
        const observer = {
          callback,
          options,
          observe: jest.fn(),
          disconnect: jest.fn(),
        }
        observers.push(observer)
        return observer
      })
    vue = jest.requireActual(
      path.join(root, 'packages/uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js')
    )
    async function load(
      file: string,
      vapor: boolean,
      imports: Record<string, any>
    ) {
      const plugin = jscc({ values: { _X_VAPOR_: +vapor } })
      const { code } = await (plugin.load as any).call(
        {},
        path.join(root, file)
      )
      const output = ts.transpileModule(code, {
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          target: ts.ScriptTarget.ES2020,
        },
      }).outputText
      const module = { exports: {} as any }
      new Function('require', 'module', 'exports', output)(
        (id: string) => {
          if (!(id in imports)) throw new Error(`未提供测试依赖：${id}`)
          return imports[id]
        },
        module,
        module.exports
      )
      return module.exports
    }
    const helper = await load(
      'packages/uni-api/src/helpers/requestComponentObserver.ts',
      true,
      {
        '@dcloudio/uni-shared': jest.requireActual('@dcloudio/uni-shared'),
        './intersection-observer': {
          initIntersectionObserverPolyfill: () => {},
        },
      }
    )
    const imports = {
      vue,
      '@dcloudio/uni-api': helper,
      '../../../platform/dom': { findElem: (vm: any) => vm.$el },
    }
    const file = 'packages/uni-h5/src/service/api/ui/intersectionObserver.ts'
    api = await load(file, true, imports)
    legacyApi = await load(file, false, imports)
    ;({ createIntersectionObserver } = await load(
      'packages/uni-api/src/service/ui/createIntersectionObserver.ts',
      true,
      {
        '@vue/shared': {
          extend: Object.assign,
          isFunction: (value: unknown) => typeof value === 'function',
        },
        '@dcloudio/uni-shared': jest.requireActual('@dcloudio/uni-shared'),
        '@dcloudio/uni-core': { getPageIdByVm: () => 1 },
        '@dcloudio/uni-platform': api,
        '../../helpers/api': { defineSyncApi: (_name: string, fn: any) => fn },
      }
    ))
  })

  afterEach(() => {
    apps.forEach((app) => app.unmount())
    apps.length = 0
    observers.length = 0
    document.body.innerHTML = ''
    jest.restoreAllMocks()
  })

  afterAll(() => {
    dom.window.close()
    globals.forEach((value, name) => {
      if (value === undefined) delete (global as any)[name]
      else (global as any)[name] = value
    })
  })

  function mount(setup: () => any) {
    const host = document.createElement('div')
    document.body.appendChild(host)
    const app = vue.createVaporApp({ __vapor: true, setup })
    app.mount(host)
    apps.push(app)
    return { vm: app._instance.proxy, host }
  }

  function mountHtml(html: string) {
    const container = document.createElement('div')
    container.innerHTML = html
    const nodes = Array.from(container.childNodes) as HTMLElement[]
    return { ...mount(() => nodes), nodes }
  }

  function observe(component: any, options: any = {}, reqId = 1) {
    const callback = jest.fn()
    api.addIntersectionObserver({
      reqId,
      component,
      options: { selector: '.hit', ...options },
      callback,
    })
    return observers[observers.length - 1]
  }

  test('单个查询跳过文本和注释，匹配后续根元素的复合选择器', () => {
    const { vm, nodes } = mountHtml(
      '文字<!--注释--><div></div><span class="hit target"></span>'
    )
    const observer = observe(vm, { selector: '.hit.target' })
    expect(observer.observe.mock.calls).toEqual([[nodes[3]]])
    expect(observer.options.root).toBeNull()
  })

  test('observeAll 包含各根元素及其后代，不查询组件范围外的兄弟节点', () => {
    const { vm, host, nodes } = mountHtml(
      '<div class="hit"><i class="hit"></i></div>文字<span class="hit"></span>'
    )
    const outside = document.createElement('div')
    outside.className = 'hit'
    host.appendChild(outside)
    const observer = observe(vm, { observeAll: true })
    expect(observer.observe.mock.calls).toEqual([
      [nodes[0]],
      [nodes[0].firstElementChild],
      [nodes[2]],
    ])
    expect(observer.USE_MUTATION_OBSERVER).toBe(true)
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})
    outside.id = 'outside'
    const missing = observe(vm, { selector: '#outside' }, 2)
    expect(missing.observe).not.toHaveBeenCalled()
    expect(warn).toHaveBeenCalledTimes(1)
  })

  test('relativeTo 可匹配根元素，阈值和边距保持不变', () => {
    const { vm, nodes } = mountHtml(
      '<div></div><section class="root"><i class="hit"></i></section>'
    )
    const observer = observe(vm, {
      relativeToSelector: '.root',
      thresholds: [0, 0.5, 1],
      rootMargin: '1px 2px 3px 4px',
    })
    expect(observer.options).toEqual({
      root: nodes[1],
      threshold: [0, 0.5, 1],
      rootMargin: '1px 2px 3px 4px',
    })
    expect(observer.observe.mock.calls).toEqual([[nodes[1].firstElementChild]])
  })

  test('单根组件也可观察自身，空的批量查询不观察任何节点', () => {
    const el = document.createElement('div')
    el.className = 'hit'
    const { vm } = mount(() => el)
    expect(observe(vm).observe.mock.calls).toEqual([[el]])
    expect(
      observe(vm, { selector: '.missing', observeAll: true }, 2).observe
    ).not.toHaveBeenCalled()
  })

  test('公共 API 正确传递 relativeTo、observeAll 和 disconnect', () => {
    const { vm, nodes } = mountHtml(
      '<div></div><section class="root"><i class="hit"></i><b class="hit"></b></section>'
    )
    const callback = jest.fn()
    const observer = createIntersectionObserver(vm, {
      observeAll: true,
      thresholds: [0, 1],
    })
    observer.relativeTo('.root', { top: 10 }).observe('.hit', callback)
    const nativeObserver = observers[0]
    expect(nativeObserver.options).toEqual({
      root: nodes[1],
      rootMargin: '10px 0px 0px 0px',
      threshold: [0, 1],
    })
    expect(nativeObserver.observe.mock.calls).toEqual([
      [nodes[1].children[0]],
      [nodes[1].children[1]],
    ])
    observer.disconnect()
    observer.disconnect()
    expect(nativeObserver.disconnect).toHaveBeenCalledTimes(1)
  })

  test('组件之间的查询和观察器互不影响', () => {
    const firstComponent = mountHtml('<div class="hit"></div>')
    const secondComponent = mountHtml('<div class="hit"></div>')
    const first = observe(firstComponent.vm)
    const second = observe(secondComponent.vm)
    expect(first.observe.mock.calls).toEqual([[firstComponent.nodes[0]]])
    expect(second.observe.mock.calls).toEqual([[secondComponent.nodes[0]]])
    api.removeIntersectionObserver({ reqId: 1, component: firstComponent.vm })
    expect(first.disconnect).toHaveBeenCalledTimes(1)
    expect(second.disconnect).not.toHaveBeenCalled()
    api.removeIntersectionObserver({ reqId: 1, component: secondComponent.vm })
    expect(second.disconnect).toHaveBeenCalledTimes(1)
  })

  test('根节点切换后仍可分别断开同一组件的多个观察器', async () => {
    const visible = vue.ref(true)
    const { vm } = mount(() =>
      vue.createIf(
        () => visible.value,
        () => {
          const el = document.createElement('div')
          el.className = 'hit'
          return el
        }
      )
    )
    const first = observe(vm)
    const second = observe(vm, {}, 2)
    const previousRoot = vm.$el
    visible.value = false
    await vue.nextTick()
    expect(vm.$el).not.toBe(previousRoot)
    api.removeIntersectionObserver({ reqId: 1, component: vm })
    expect(first.disconnect).toHaveBeenCalledTimes(1)
    expect(second.disconnect).not.toHaveBeenCalled()
    api.removeIntersectionObserver({ reqId: 1, component: vm })
    api.removeIntersectionObserver({ reqId: 2, component: vm })
    expect(first.disconnect).toHaveBeenCalledTimes(1)
    expect(second.disconnect).toHaveBeenCalledTimes(1)
  })

  test('非 Vapor 保留原有单根查询和断开逻辑', () => {
    const el = document.createElement('div')
    el.className = 'hit'
    el.innerHTML = '<i class="hit"></i>'
    const vm = { $el: el }
    legacyApi.addIntersectionObserver({
      reqId: 1,
      component: vm,
      options: { selector: '.hit', observeAll: true },
      callback: jest.fn(),
    })
    expect(observers[0].observe.mock.calls).toEqual([[el.firstElementChild]])
    legacyApi.removeIntersectionObserver({ reqId: 1, component: vm })
    expect(observers[0].disconnect).toHaveBeenCalledTimes(1)
  })

  test('非 Vapor 保留自身匹配及 relativeTo 仅查询后代的行为', () => {
    const el = document.createElement('div')
    el.className = 'hit root'
    el.innerHTML = '<section class="root"><i class="hit"></i></section>'
    legacyApi.addIntersectionObserver({
      reqId: 1,
      component: { $el: el },
      options: { selector: '.hit', relativeToSelector: '.root' },
      callback: jest.fn(),
    })
    expect(observers[0].options.root).toBe(el.firstElementChild)
    expect(observers[0].observe.mock.calls).toEqual([[el]])
  })
})
