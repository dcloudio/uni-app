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

describe('SelectorQuery 模式兼容', () => {
  let dom: any
  let vue: any
  let query: Function
  let legacyQuery: Function
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
        '@dcloudio/uni-components': { getContextInfo: () => undefined },
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
