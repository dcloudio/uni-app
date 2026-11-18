import fs from 'fs'
import path from 'path'
import ts from 'typescript'
import jscc from 'rollup-plugin-jscc'

// Vapor runtime 与测试模块必须使用同版本 shared，避免解析到工作区的 VDOM 版本。
jest.mock('@vue/shared', () =>
  jest.requireActual(
    '../../uni-cli-shared/lib/dom2/web/@vue/shared/dist/shared.cjs.js'
  )
)

const root = path.resolve(__dirname, '../../..')
const file = path.join(
  root,
  'packages/uni-h5/src/service/api/ui/requestComponentInfo.ts'
)

function evaluate(source: string, imports: Record<string, any>) {
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText
  const module = { exports: {} as any }
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

describe('SelectorQuery 模式兼容', () => {
  let dom: any
  let vue: any
  let query: Function
  let legacyQuery: Function
  let scrollContexts: any
  let createSelectorQuery: Function
  const apps: any[] = []
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
      'getComputedStyle',
      '__X__',
      '__APP_VIEW__',
    ]) {
      globals.set(name, (global as any)[name])
      ;(global as any)[name] =
        name === '__X__'
          ? true
          : name === '__APP_VIEW__'
          ? false
          : dom.window[name]
    }
    vue = jest.requireActual(
      path.join(root, 'packages/uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js')
    )
    scrollContexts = evaluate(
      fs.readFileSync(
        path.join(
          root,
          'packages/uni-components/src/vue/scroll-view/ScrollViewContext.ts'
        ),
        'utf8'
      ),
      {}
    )
    async function load(vapor: boolean) {
      const plugin = jscc({
        values: { _X_: 1, _X_VAPOR_: +vapor, _NODE_JS_: 0 },
      })
      const { code } = await (plugin.load as any).call({}, file)
      const output = ts.transpileModule(code, {
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          target: ts.ScriptTarget.ES2020,
        },
      }).outputText
      const module = { exports: {} as any }
      const imports: Record<string, any> = {
        vue,
        '@vue/shared': {
          ...jest.requireActual(
            '../../uni-cli-shared/lib/dom2/web/@vue/shared/dist/shared.cjs.js'
          ),
          isArray: Array.isArray,
        },
        '@dcloudio/uni-shared': jest.requireActual('@dcloudio/uni-shared'),
        '@dcloudio/uni-core': {
          getWindowOffset: () => ({ top: 5, topWindowHeight: 10 }),
        },
        '@dcloudio/uni-components': {
          getContextInfo: () => undefined,
          getScrollViewContext: scrollContexts.getScrollViewContext,
        },
      }
      new Function('require', 'module', 'exports', output)(
        (id: string) => imports[id],
        module,
        module.exports
      )
      return module.exports.requestComponentInfo
    }
    query = await load(true)
    legacyQuery = await load(false)
    const Context = class {}
    createSelectorQuery = evaluate(
      fs.readFileSync(
        path.join(
          root,
          'packages/uni-api/src/service/ui/createSelectorQuery.ts'
        ),
        'utf8'
      ),
      {
        '@vue/shared': {
          isArray: Array.isArray,
          isFunction: (fn: any) => typeof fn === 'function',
        },
        '@dcloudio/uni-shared': { resolveComponentInstance: (vm: any) => vm },
        '@dcloudio/uni-core': { getPageIdByVm: () => 1 },
        '@dcloudio/uni-platform': { requestComponentInfo: query },
        '../../helpers/api': {
          defineSyncApi: (_name: string, fn: Function) => fn,
        },
        '../context/canvas': { CanvasContext: Context },
        '../context/editor': { EditorContext: Context },
        '../context/createMapContext': { MapContext: Context },
        '../context/createVideoContext': { VideoContext: Context },
      }
    ).createSelectorQuery
  })
  afterEach(() => {
    apps.forEach((app) => app.unmount())
    apps.length = 0
    document.body.innerHTML = ''
  })
  afterAll(() => {
    dom.window.close()
    globals.forEach((value, name) => {
      if (value === undefined) delete (global as any)[name]
      else (global as any)[name] = value
    })
  })
  function mount(html: string) {
    const container = document.createElement('div')
    container.innerHTML = html
    const nodes = Array.from(container.childNodes)
    const host = document.createElement('div')
    document.body.appendChild(host)
    const app = vue.createVaporApp({ __vapor: true, setup: () => nodes })
    app.mount(host)
    apps.push(app)
    return { vm: app._instance.proxy, nodes: nodes as HTMLElement[] }
  }

  test('多根节点、查询作用域、空结果与队列位置保持一致', () => {
    const page = mount('<div class="hit" id="page" />')
    const component = mount(
      '<div class="hit" id="a"></div>文字<span class="hit" id="b"></span>'
    )
    const callback = jest.fn()
    query(
      page.vm,
      [
        { selector: '.missing', single: true, fields: { node: true } },
        {
          component: component.vm,
          selector: '.hit',
          single: false,
          fields: { node: true, id: true },
        },
        { selector: '.hit', single: true, fields: { node: true } },
        {
          component: component.vm,
          selector: '#page',
          single: false,
          fields: {},
        },
        {
          component: null,
          selector: '',
          single: true,
          fields: { id: true, rect: true },
        },
      ],
      callback
    )
    expect(callback).toHaveBeenCalledWith([
      null,
      [
        { id: 'a', node: component.nodes[0] },
        { id: 'b', node: component.nodes[2] },
      ],
      { node: page.nodes[0] },
      [],
      { id: '', left: 0, top: 0, right: 0, bottom: 0 },
    ])
  })

  test('原生节点返回自身，字段、窗口偏移和滚动属性正确', () => {
    const { vm, nodes } = mount(
      '<div id="box" data-value="v" style="color: red"></div><img id="image">'
    )
    const el = nodes[0]
    el.getBoundingClientRect = () =>
      ({
        left: 1,
        right: 21,
        top: 40,
        bottom: 70,
        width: 20,
        height: 30,
      } as DOMRect)
    for (const [name, value] of Object.entries({
      scrollLeft: 2,
      scrollTop: 3,
      scrollWidth: 200,
      scrollHeight: 300,
    })) {
      Object.defineProperty(el, name, { get: () => value })
    }
    const callback = jest.fn()
    query(
      vm,
      [
        {
          selector: '#box',
          single: true,
          fields: {
            id: true,
            dataset: true,
            node: true,
            rect: true,
            size: true,
            scrollOffset: true,
            computedStyle: ['color'],
          },
        },
        { selector: '#image', single: true, fields: { node: true } },
      ],
      callback
    )
    expect(callback.mock.calls[0][0]).toEqual([
      {
        id: 'box',
        dataset: expect.any(Map),
        node: el,
        left: 1,
        right: 21,
        top: 25,
        bottom: 55,
        width: 20,
        height: 30,
        scrollLeft: 2,
        scrollTop: 3,
        scrollWidth: 200,
        scrollHeight: 300,
        color: getComputedStyle(el).color,
      },
      { node: nodes[1] },
    ])
    expect(callback.mock.calls[0][0][0].dataset.get('value')).toBe('v')
  })

  test('dataset 快照保留 Map 保留键、原始值和 undefined 条目', () => {
    const { initVaporDataset } = jest.requireActual('@dcloudio/uni-shared')
    initVaporDataset(dom.window)
    const { vm, nodes } = mount('<div id="dataset" uni-view></div>')
    const payload = { count: 1 }
    const dataset = nodes[0].dataset as unknown as Map<string, any>
    dataset.set('get', payload).set('set', null).set('empty', undefined)
    const callback = jest.fn()
    query(
      vm,
      [{ selector: '#dataset', single: true, fields: { dataset: true } }],
      callback
    )
    const snapshot = callback.mock.calls[0][0][0].dataset
    expect(snapshot).not.toBe(dataset)
    expect(snapshot.get('get')).toBe(payload)
    expect(snapshot.has('set')).toBe(true)
    expect(snapshot.get('set')).toBe(null)
    expect(snapshot.has('empty')).toBe(true)
    expect(snapshot.get('empty')).toBeUndefined()
    dataset.clear()
    expect(snapshot.size).toBe(3)
  })

  test('node 首次请求才创建 Context，fields 与后续查询复用实例，滚动字段仍取自宿主', () => {
    const { vm, nodes } = mount(
      '<div id="scroll" uni-scroll-view></div><canvas id="canvas"></canvas>' +
        '<div id="plain"></div><div id="unregistered" uni-scroll-view></div>'
    )
    const host = nodes[0]
    const nativeScrollTo = host.scrollTo
    Object.defineProperties(host, {
      scrollLeft: { value: 12 },
      scrollTop: { value: 34 },
      scrollWidth: { value: 400 },
      scrollHeight: { value: 800 },
    })
    const controller = {
      scrollEnabled: true,
      showScrollbar: true,
      pagingEnabled: false,
      scrollTo: jest.fn(),
      scrollIntoView: jest.fn(),
    }
    const defineProperty = jest.spyOn(Object, 'defineProperty')
    const createdContexts = () =>
      defineProperty.mock.calls.filter(
        ([target, name]) =>
          target instanceof scrollContexts.ScrollViewContext &&
          name === '__v_skip'
      )
    const unregister = scrollContexts.registerScrollViewContext(
      host,
      controller
    )
    try {
      expect(createdContexts()).toHaveLength(0)
      const offset = jest.fn()
      createSelectorQuery(vm)
        .select('#scroll')
        .fields({ scrollOffset: true }, offset)
        .exec()
      expect(offset).toHaveBeenCalledWith({
        scrollLeft: 12,
        scrollTop: 34,
        scrollWidth: 400,
        scrollHeight: 800,
      })
      expect(createdContexts()).toHaveLength(0)
      const node = jest.fn()
      const fields = jest.fn()
      const all = jest.fn()
      const result = jest.fn()
      const selector = createSelectorQuery(vm)
      selector.select('#scroll').node(node)
      selector
        .select('#scroll')
        .fields({ node: true, scrollOffset: true }, fields)
      selector.selectAll('div').node(all)
      expect(createdContexts()).toHaveLength(0)
      selector.exec(result)
      const context = node.mock.calls[0][0].node
      expect(context).toBeInstanceOf(scrollContexts.ScrollViewContext)
      expect(createdContexts()).toHaveLength(1)
      expect(scrollContexts.getScrollViewContext(host)).toBe(context)
      expect(node).toHaveBeenCalledWith({ node: context })
      expect(fields).toHaveBeenCalledWith({
        node: context,
        scrollLeft: 12,
        scrollTop: 34,
        scrollWidth: 400,
        scrollHeight: 800,
      })
      expect(all).toHaveBeenCalledWith([
        { node: context },
        { node: nodes[2] },
        { node: nodes[3] },
      ])
      expect(result.mock.calls[0][0][0].node).toBe(context)
      expect(result.mock.calls[0][0][1].node).toBe(context)
      expect(context).not.toBe(host)
      expect(host.scrollTo).toBe(nativeScrollTo)
      context.scrollTo({ top: 80, animated: true })
      expect(controller.scrollTo).toHaveBeenCalledWith({
        top: 80,
        animated: true,
      })
      const canvas = jest.fn()
      createSelectorQuery(vm).select('#canvas').node(canvas).exec()
      expect(canvas).toHaveBeenCalledWith({ node: nodes[1] })
      expect(scrollContexts.getScrollViewContext(nodes[2])).toBeUndefined()
      expect(scrollContexts.getScrollViewContext(nodes[3])).toBeUndefined()
      expect(createdContexts()).toHaveLength(1)
    } finally {
      unregister()
      defineProperty.mockRestore()
    }
    const after = jest.fn()
    createSelectorQuery(vm).select('#scroll').node(after).exec()
    expect(after).toHaveBeenCalledWith({ node: host })
  })

  test('未获取 Context 就注销，不会在注册、注销或后续查询时创建实例', () => {
    const host = document.createElement('div')
    const defineProperty = jest.spyOn(Object, 'defineProperty')
    const controller = {
      scrollEnabled: true,
      showScrollbar: true,
      pagingEnabled: false,
      scrollTo: jest.fn(),
      scrollIntoView: jest.fn(),
    }
    const unregister = scrollContexts.registerScrollViewContext(
      host,
      controller
    )
    try {
      unregister()
      expect(scrollContexts.getScrollViewContext(host)).toBeUndefined()
      expect(
        defineProperty.mock.calls.filter(
          ([target, name]) =>
            target instanceof scrollContexts.ScrollViewContext &&
            name === '__v_skip'
        )
      ).toHaveLength(0)
    } finally {
      unregister()
      defineProperty.mockRestore()
    }
  })

  test.each([false, true])(
    '重新注册令旧 Context 失效，旧注销不删除新实例，同一 controller=%s',
    (reuseController) => {
      const host = document.createElement('div')
      const controller = {
        scrollEnabled: true,
        showScrollbar: true,
        pagingEnabled: false,
        scrollTo: jest.fn(),
        scrollIntoView: jest.fn(),
      }
      const replacement = reuseController
        ? controller
        : { ...controller, scrollTo: jest.fn(), scrollIntoView: jest.fn() }
      const unregister = scrollContexts.registerScrollViewContext(
        host,
        controller
      )
      const previous = scrollContexts.getScrollViewContext(host)
      const unregisterReplacement = scrollContexts.registerScrollViewContext(
        host,
        replacement
      )
      try {
        previous.scrollEnabled = false
        previous.showScrollbar = false
        previous.pagingEnabled = true
        previous.scrollTo({ top: 80 })
        previous.scrollIntoView('.target')
        expect(controller.scrollEnabled).toBe(true)
        expect(controller.showScrollbar).toBe(true)
        expect(controller.pagingEnabled).toBe(false)
        expect(controller.scrollTo).not.toHaveBeenCalled()
        expect(controller.scrollIntoView).not.toHaveBeenCalled()

        const current = scrollContexts.getScrollViewContext(host)
        expect(current).not.toBe(previous)
        unregister()
        expect(scrollContexts.getScrollViewContext(host)).toBe(current)
        current.scrollTo({ top: 120 })
        expect(replacement.scrollTo).toHaveBeenCalledWith({ top: 120 })

        unregisterReplacement()
        expect(scrollContexts.getScrollViewContext(host)).toBeUndefined()
        current.scrollTo({ top: 160 })
        current.scrollIntoView('.target')
        expect(replacement.scrollTo).toHaveBeenCalledTimes(1)
        expect(replacement.scrollIntoView).not.toHaveBeenCalled()
      } finally {
        unregister()
        unregisterReplacement()
      }
    }
  )

  test('旧模式保持外壳查找内部节点的行为', () => {
    const host = document.createElement('div')
    host.innerHTML = '<uni-canvas id="canvas"><canvas /></uni-canvas>'
    document.body.appendChild(host)
    const el = host.firstElementChild!
    const select = jest
      .spyOn(el, 'querySelector')
      .mockReturnValue(el.firstElementChild)
    const callback = jest.fn()
    legacyQuery(
      { $el: el },
      [{ selector: '#canvas', single: true, fields: { node: true } }],
      callback
    )
    expect(callback).toHaveBeenCalledWith([{ node: el.firstElementChild }])
    expect(select).toHaveBeenCalledWith('CANVAS')
  })
})
