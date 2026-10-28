import path from 'path'
import jscc from 'rollup-plugin-jscc'
import ts from 'typescript'
import { hasOwn } from '@vue/shared'

// Vapor runtime 与测试模块必须使用同版本 shared，避免解析到工作区的 VDOM 版本。
jest.mock('@vue/shared', () =>
  jest.requireActual(
    '../../uni-cli-shared/lib/dom2/web/@vue/shared/dist/shared.cjs.js'
  )
)
jest.mock('@vue/compiler-core', () =>
  jest.requireActual('../../uni-cli-shared/lib/dom2/web/@vue/compiler-core')
)
jest.mock('@vue/compiler-dom', () =>
  jest.requireActual('../../uni-cli-shared/lib/dom2/web/@vue/compiler-dom')
)
jest.mock('@vue/compiler-ssr', () =>
  jest.requireActual('../../uni-cli-shared/lib/dom2/web/@vue/compiler-ssr')
)
jest.mock(
  '@vue/compiler-vapor',
  () =>
    jest.requireActual('../../uni-cli-shared/lib/dom2/web/@vue/compiler-vapor'),
  { virtual: true }
)

jest.mock('@dcloudio/uni-api', () => ({
  defineSyncApi: (_name: string, implementation: Function) => implementation,
}))

async function loadForMode(
  file: string,
  vapor: boolean,
  imports: Record<string, any>,
  isX = true
) {
  const plugin = jscc({
    values: { _X_: +isX, _X_VAPOR_: +vapor, _NODE_JS_: 0 },
  })
  const { code } = await (plugin.load as any).call(
    {},
    path.resolve(__dirname, '../../', file)
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
      if (!(id in imports)) throw new Error('缺少测试依赖：' + id)
      return imports[id]
    },
    module,
    module.exports
  )
  return module.exports
}

async function loadUniElement(
  vapor: boolean,
  imports: Record<string, any>,
  isX = true
) {
  const mode = vapor ? 'vapor' : 'vdom'
  const implementation = await loadForMode(
    `uni-components/src/helpers/UniElement-${mode}.ts`,
    vapor,
    imports,
    isX
  )
  const entry = await loadForMode(
    'uni-components/src/helpers/UniElement.ts',
    vapor,
    { [`./UniElement-${mode}`]: implementation },
    isX
  )
  expect(entry.UniElement).toBe(implementation.UniElement)
  return entry
}

describe('Web Vapor 原生宿主 Element', () => {
  let dom: any
  let elements: typeof import('../src/vue/web-vapor-elements')
  let UniElement: typeof import('../src/helpers/UniElement').UniElement
  let isBuiltInElement: (el: HTMLElement) => boolean
  let elementImports: Record<string, any>
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
      'customElements',
      'getComputedStyle',
      '__X__',
      '__PLATFORM__',
      '__NODE_JS__',
      '__UNI_FEATURE_LONGPRESS__',
    ]) {
      globals.set(name, (global as any)[name])
      ;(global as any)[name] =
        name === '__X__'
          ? true
          : name === '__PLATFORM__'
          ? 'h5'
          : name === '__NODE_JS__' || name === '__UNI_FEATURE_LONGPRESS__'
          ? false
          : dom.window[name]
    }
    elementImports = {
      '@vue/shared': jest.requireActual(
        '../../uni-cli-shared/lib/dom2/web/@vue/shared/dist/shared.cjs.js'
      ),
      '@dcloudio/uni-shared': jest.requireActual('@dcloudio/uni-shared'),
    }
    const elementModule = await loadUniElement(true, elementImports)
    UniElement = elementModule.UniElement
    jest.doMock('../src/helpers/UniElement', () => ({ UniElement }))
    elements = await import('../src/vue/web-vapor-elements')
    isBuiltInElement = (
      await loadForMode('uni-core/src/helpers/util.ts', true, elementImports)
    ).isBuiltInElement
  })

  afterAll(() => {
    dom.window.close()
    globals.forEach((value, name) => {
      if (value === undefined) delete (global as any)[name]
      else (global as any)[name] = value
    })
  })

  function install(realm = dom.window) {
    elements.installWebVaporElements(realm)
  }

  test('仅 Vapor 初始化后安装公共 API，保持原生节点与属性语义', () => {
    expect(dom.window.HTMLDivElement.prototype.getPage).toBeUndefined()
    elements.installWebVaporElements()
    expect(dom.window.HTMLDivElement.prototype.getPage).toBeUndefined()
    expect(
      Object.getOwnPropertyDescriptor(UniElement, Symbol.hasInstance)
    ).toBeUndefined()
    const nativeDataset = Object.getOwnPropertyDescriptor(
      dom.window.HTMLElement.prototype,
      'dataset'
    )
    install()
    for (const [tag, marker, name, Type, Host] of [
      [
        'div',
        'uni-view',
        'VIEW',
        elements.UniViewElement,
        dom.window.HTMLDivElement,
      ],
      [
        'canvas',
        'uni-view',
        'VIEW',
        elements.UniViewElement,
        dom.window.HTMLCanvasElement,
      ],
      [
        'span',
        'uni-text',
        'TEXT',
        elements.UniTextElement,
        dom.window.HTMLSpanElement,
      ],
      [
        'img',
        'uni-image',
        'IMAGE',
        elements.UniImageElement,
        dom.window.HTMLImageElement,
      ],
    ] as const) {
      const el = document.createElement(tag) as any
      const prototype = Object.getPrototypeOf(el)
      el.setAttribute(marker, '')
      document.body.appendChild(el)
      expect(el).toBeInstanceOf(Type)
      expect(el).toBeInstanceOf(UniElement)
      expect(el).toBeInstanceOf(Host)
      expect(el.constructor).toBe(Host)
      expect(el.tagName).toBe(tag.toUpperCase())
      expect(el.uniTagName).toBe(name)
      expect('__isUniElement' in el).toBe(false)
      expect(isBuiltInElement(el)).toBe(true)
      expect(Object.getPrototypeOf(el)).toBe(prototype)
      expect(Object.keys(el)).toEqual([])
      el.setAttribute('data-name', 'value')
      expect(el.dataset.name).toBeNull()
      expect(el.dataset).toBeInstanceOf(Map)
      el.dataset.name = 'changed'
      expect(el.getAttribute('data-name')).toBe('value')
      el.style.setProperty('margin-left', '1px')
      expect(el.style.getPropertyValue('margin-left')).toBe('1px')
      expect(el.style.__patchRpx__).toBeUndefined()
      expect(el.getBoundingClientRectAsync).toBe(
        UniElement.prototype.getBoundingClientRectAsync
      )
      expect(document.querySelector('[' + marker + ']')).toBe(el)
      const listener = jest.fn((event: Event) => {
        expect(event.target).toBe(el)
        expect(event.currentTarget).toBe(el)
      })
      el.addEventListener('click', listener)
      el.dispatchEvent(new dom.window.Event('click'))
      expect(listener).toHaveBeenCalledTimes(1)
      el.remove()
    }
    expect(
      Object.getOwnPropertyDescriptor(
        dom.window.HTMLElement.prototype,
        'dataset'
      )
    ).toEqual(nativeDataset)
    expect(dom.window.HTMLElement.prototype.getPage).toBeUndefined()
  })

  test.each([
    ['div', 'uni-view'],
    ['span', 'uni-text'],
    ['img', 'uni-image'],
  ])('基础宿主 %s 的 dataset 保留类型，与手动属性操作独立', (tag, marker) => {
    install()
    const el = document.createElement(tag)
    el.setAttribute(marker, '')
    el.setAttribute('data-count', '1')
    el.setAttribute('data-get', 'reserved')
    el.setAttribute('data-v-scope', '')
    ;(el as any).$uniDataset = { 'data-count': '1', 'data-get': 'reserved' }
    const { getCustomDataset, normalizeTarget, createUniDOMStringMap } =
      elementImports['@dcloudio/uni-shared']
    // 查询首次读取也应触发惰性初始化，之后直接复用同一份 Map。
    const dataset = getCustomDataset(el)
    expect(dataset).toBeInstanceOf(Map)
    expect(el.dataset).toBe(dataset)
    expect((el as any).$uniDataset).toBe(dataset)
    expect(dataset.get('count')).toBe('1')
    expect(dataset.get('get')).toBe('reserved')
    expect(dataset.has('vScope')).toBe(false)
    expect(getCustomDataset(el)).toBe(dataset)
    expect(normalizeTarget(el).dataset).toBe(dataset)
    const snapshot = createUniDOMStringMap(getCustomDataset(el))
    expect(snapshot).not.toBe(dataset)
    expect(snapshot.get('get')).toBe('reserved')
    const payload = { count: 2 }
    dataset.set('payload', payload)
    expect(dataset.payload).toBe(payload)
    dataset.set('empty', undefined)
    expect(dataset.has('empty')).toBe(true)
    expect(dataset.get('empty')).toBeUndefined()
    el.removeAttribute('data-empty')
    expect(dataset.has('empty')).toBe(true)
    dataset.delete('empty')
    expect(dataset.has('empty')).toBe(false)
    dataset.count = 3
    expect(snapshot.get('count')).toBe('1')
    expect(el.getAttribute('data-count')).toBe('1')
    dataset.clear()
    expect(dataset.size).toBe(0)
    expect(el.hasAttribute('data-v-scope')).toBe(true)
    expect((el as any).__uniDataset).toBeUndefined()
    const other = document.createElement(tag)
    other.setAttribute(marker, '')
    ;(other.dataset as any).set('payload', payload)
    expect((other.dataset as any).get('payload')).toBe(payload)
    expect(other.dataset).not.toBe(dataset)
    const plain = document.createElement(tag)
    plain.dataset.count = '4'
    expect(plain.getAttribute('data-count')).toBe('4')
    expect(plain.dataset).not.toBeInstanceOf(Map)
  })

  test('未使用新 dataset 机制的节点保留缓存合并，不按 Map 类型误判', () => {
    const { getCustomDataset, createUniDOMStringMap } =
      elementImports['@dcloudio/uni-shared']
    const el = document.createElement('div')
    const dataset = createUniDOMStringMap({ count: '1' })
    Object.defineProperty(el, 'dataset', { value: dataset })
    ;(el as any).__uniDataset = { count: 2 }
    expect(getCustomDataset(el)).toEqual({ count: 2 })
    ;(el as any).$uniDataset = { 'data-count': 'initial' }
    expect(getCustomDataset(el)).toEqual({ count: 2 })
  })

  test('原生宿主能被现有 builtIn 判断识别，公开类型提供 uni dataset', () => {
    install()
    const el = document.createElement(
      'div'
    ) as unknown as import('../src/vue/web-vapor-elements').UniViewElement
    expect(isBuiltInElement(el)).toBe(false)
    el.setAttribute('uni-view', '')
    expect(isBuiltInElement(el)).toBe(true)
    const dataset: import('@dcloudio/uni-shared').UniDOMStringMap = el.dataset
    expect(dataset).toBe(el.dataset)
  })

  test('Vapor 模板克隆、ref、事件和 uni 查询返回同一个原生对象', async () => {
    install()
    const vue = jest.requireActual(
      path.resolve(
        __dirname,
        '../../uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js'
      )
    )
    const { getElementById } = await import(
      '../../uni-h5/src/x/service/api/element/getElementById'
    )
    const host = document.createElement('uni-page-body')
    document.body.appendChild(host)
    const factory = vue.template(
      '<div uni-view id="native-view"><span uni-text></span><img uni-image></div>'
    )
    const node = vue.ref()
    let el: HTMLElement
    const app = vue.createVaporApp({
      __vapor: true,
      setup() {
        el = factory()
        vue.setStaticTemplateRef(el, node)
        return el
      },
    })
    try {
      app.mount(host)
      expect(node.value).toBe(el!)
      expect(getElementById('native-view')).toBe(el!)
      expect(node.value).toBeInstanceOf(elements.UniViewElement)
      expect(node.value.firstChild).toBeInstanceOf(elements.UniTextElement)
      expect(node.value.lastChild).toBeInstanceOf(elements.UniImageElement)
      const listener = jest.fn((event: Event) =>
        expect(event.currentTarget).toBe(node.value)
      )
      node.value.addEventListener('click', listener)
      node.value.dispatchEvent(new dom.window.Event('click'))
      expect(listener).toHaveBeenCalledTimes(1)
    } finally {
      app.unmount()
      host.remove()
    }
  })

  test('普通 DOM、错配标记、SVG 不属于 UniElement，标记变化立即生效', () => {
    install()
    for (const el of [
      document.createElement('div'),
      document.createElement('span'),
      document.createElement('img'),
      document.createElementNS('http://www.w3.org/2000/svg', 'div'),
    ]) {
      el.setAttribute('uni-image', '')
      if (el.localName === 'img') el.removeAttribute('uni-image')
      if (el.namespaceURI !== 'http://www.w3.org/1999/xhtml') {
        el.setAttribute('uni-view', '')
      }
      expect(el).not.toBeInstanceOf(UniElement)
      expect((el as any).__isUniElement).toBeFalsy()
      expect(isBuiltInElement(el as HTMLElement)).toBe(false)
      expect((el as any).getPage?.() ?? null).toBeNull()
    }
    const el = document.createElement('div') as any
    el.setAttribute('uni-view', '')
    expect(el).toBeInstanceOf(elements.UniViewElement)
    expect(el).not.toBeInstanceOf(elements.UniTextElement)
    el.removeAttribute('uni-view')
    expect(el).not.toBeInstanceOf(UniElement)
    expect(el.uniTagName).toBeUndefined()
    expect(isBuiltInElement(el)).toBe(false)
    for (const value of [null, undefined, 1, {}, 'div']) {
      expect((value as any) instanceof elements.UniViewElement).toBe(false)
      expect((value as any) instanceof UniElement).toBe(false)
    }
  })

  test('保留 CustomElement 继承判断，子类不能误认普通 view', () => {
    install()
    class Progress extends elements.UniViewElement {}
    class Legacy extends UniElement {}
    dom.window.customElements.define('test-progress', Progress)
    dom.window.customElements.define('test-legacy', Legacy)
    const progress = document.createElement('test-progress')
    const legacy = document.createElement('test-legacy')
    const view = document.createElement('div')
    view.setAttribute('uni-view', '')
    expect(progress).toBeInstanceOf(Progress)
    expect(progress).toBeInstanceOf(elements.UniViewElement)
    expect(progress).toBeInstanceOf(UniElement)
    expect(legacy).toBeInstanceOf(Legacy)
    expect(legacy).toBeInstanceOf(UniElement)
    expect('__isUniElement' in legacy).toBe(false)
    expect((legacy as any).dataset.get).toBeUndefined()
    expect((legacy as any).getPage()).toBeNull()
    expect(view).not.toBeInstanceOf(Progress)
    expect(view).not.toBeInstanceOf(Legacy)
  })

  test.each([false, true])(
    'Vapor 不注册旧宿主，非 Vapor 保留注册和 dataset 缓存，Vapor=%s',
    async (vapor) => {
      const Base = (await loadUniElement(vapor, elementImports)).UniElement
      class LegacyField extends Base {}
      const runtime = {
        defineComponent: (options: any) => options,
        createUnsupportedRender: jest.fn(),
      }
      const { defineBuiltInComponent } = await loadForMode(
        'uni-components/src/helpers/component.ts',
        vapor,
        {
          '@vue/shared': elementImports['@vue/shared'],
          './component-vapor': runtime,
          './component-vdom': runtime,
          './animation': { default: {} },
        }
      )
      const { isBuiltInElement: identify } = await loadForMode(
        'uni-core/src/helpers/util.ts',
        vapor,
        elementImports
      )
      const name = vapor ? 'uni-test-vapor' : 'uni-test-vdom'
      const rootElement = { name, class: LegacyField }
      const component = defineBuiltInComponent({ rootElement })
      expect(component.rootElement).toBe(rootElement)
      expect(customElements.get(name)).toBe(vapor ? undefined : LegacyField)
      const first = document.createElement(name)
      const second = document.createElement(name)
      Object.defineProperty(LegacyField.prototype, 'tagName', {
        get() {
          throw new Error('识别旧组件不应重新读取和解析 DOM 标签名')
        },
      })
      expect(identify(first)).toBe(!vapor)
      expect(identify(second)).toBe(!vapor)
      expect(hasOwn(first, 'uniTagName')).toBe(false)
      expect(hasOwn(second, 'uniTagName')).toBe(false)
      if (vapor) {
        expect('uniTagName' in first).toBe(false)
        expect('uniTagName' in LegacyField.prototype).toBe(false)
        expect('__isUniElement' in first).toBe(false)
      } else {
        expect((first as any).__isUniElement).toBe(true)
        expect('uniTagName' in first).toBe(false)
      }

      const datasetApi = await loadForMode(
        'uni-shared/src/dom/customDataset.ts',
        vapor,
        {
          '@vue/shared': elementImports['@vue/shared'],
          '../utils': elementImports['@dcloudio/uni-shared'],
        }
      )
      const { initView } = await loadForMode(
        'uni-core/src/view/init/index.ts',
        vapor,
        {
          '@dcloudio/uni-shared': datasetApi,
          './longPress': { initLongPress: jest.fn() },
          './rem': { useRem: jest.fn() },
          '../../helpers': { isBuiltInElement: identify },
        }
      )
      const prototype = dom.window.HTMLElement.prototype
      const { setAttribute, removeAttribute } = prototype
      try {
        initView()
        for (const [tag, marker] of [
          ['div', 'uni-view'],
          ['span', 'uni-text'],
          ['img', 'uni-image'],
          ['div', ''],
          ['uni-unregistered', ''],
        ]) {
          const el = document.createElement(tag)
          if (marker) el.setAttribute(marker, '')
          el.setAttribute('data-v-12345678', '')
          expect(hasOwn(el, '__uniDataset')).toBe(false)
          el.setAttribute('data-count', '1')
          if (marker) (el.dataset as any).set('count', '1')
          expect(datasetApi.getCustomDataset(el).count).toBe('1')
          el.dataset.count = '2'
          expect(el.getAttribute('data-count')).toBe(marker ? '1' : '2')
          expect(datasetApi.getCustomDataset(el).count).toBe('2')
          delete el.dataset.count
          expect(el.hasAttribute('data-count')).toBe(!!marker)
          expect(Object.keys(datasetApi.getCustomDataset(el))).not.toContain(
            'count'
          )
          el.setAttribute('data-count', '3')
          if (marker) expect((el.dataset as any).has('count')).toBe(false)
          else expect(datasetApi.getCustomDataset(el).count).toBe('3')
          el.removeAttribute('data-count')
          expect(Object.keys(datasetApi.getCustomDataset(el))).not.toContain(
            'count'
          )
          expect(hasOwn(el, '__uniDataset')).toBe(false)
          if (marker) {
            const payload = { count: 4 }
            ;(el.dataset as any).set('set', payload)
            const dataset = datasetApi.getCustomDataset(el)
            expect(dataset).toBe(el.dataset)
            expect(dataset.get('set')).toBe(payload)
            const snapshot =
              elementImports['@dcloudio/uni-shared'].createUniDOMStringMap(
                dataset
              )
            expect(snapshot.get('set')).toBe(payload)
            dataset.set('set', 'changed')
            expect(snapshot.get('set')).toBe(payload)
          }
        }

        if (vapor) {
          expect(prototype.setAttribute).toBe(setAttribute)
          expect(prototype.removeAttribute).toBe(removeAttribute)
          first.setAttribute('data-payload', 'native')
          expect(first.dataset.payload).toBe('native')
          expect(hasOwn(first, '__uniDataset')).toBe(false)
        } else {
          const payload = { count: 1 }
          first.setAttribute('data-payload', payload as any)
          expect(datasetApi.getCustomDataset(first).payload).toBe(payload)
          expect((first as any).dataset.get('payload')).toBe(payload)
          first.setAttribute('data-payload', 'updated')
          expect(datasetApi.getCustomDataset(first).payload).toBe('updated')
          expect((first as any).dataset.get('payload')).toBe('updated')
          first.removeAttribute('data-payload')
          expect(datasetApi.getCustomDataset(first)).not.toHaveProperty(
            'payload'
          )
          expect((first as any).dataset.has('payload')).toBe(false)
        }
      } finally {
        prototype.setAttribute = setAttribute
        prototype.removeAttribute = removeAttribute
      }
    }
  )

  test('复用页面归属，普通 DOM 不读取页面状态', async () => {
    install()
    const { setUniElementPage } = await import('@dcloudio/uni-shared')
    const page = document.createElement('uni-page')
    const owner = {} as UniPage
    setUniElementPage(page, owner)
    const el = document.createElement('span') as any
    page.appendChild(el)
    const closest = jest.spyOn(el, 'closest')
    expect(el.getPage()).toBeNull()
    expect(closest).not.toHaveBeenCalled()
    el.setAttribute('uni-text', '')
    expect(el.getPage()).toBe(owner)
    expect(el.uniPage).toBe(owner)
    el.remove()
    expect(el.getPage()).toBeNull()
  })

  test('矩形 API 保留 Promise、回调与异常行为', async () => {
    install()
    const el = document.createElement('img') as any
    el.setAttribute('uni-image', '')
    const rect = el.getBoundingClientRect()
    const measure = jest
      .spyOn(el, 'getBoundingClientRect')
      .mockReturnValue(rect)
    expect(await el.getBoundingClientRectAsync()).toBe(rect)
    const error = new Error('callback')
    const log = jest.spyOn(console, 'error').mockImplementation(() => {})
    const complete = jest.fn()
    expect(
      el.getBoundingClientRectAsync({
        success() {
          throw error
        },
        complete,
      })
    ).toBeUndefined()
    expect(complete).toHaveBeenCalledWith(rect)
    expect(log).toHaveBeenCalledWith(error)
    measure.mockImplementation(() => {
      throw error
    })
    await expect(el.getBoundingClientRectAsync()).rejects.toBe(error)
    expect(() => el.getBoundingClientRectAsync({})).toThrow(error)
    log.mockRestore()
  })

  test('跨 Window 识别与显式安装，重复安装不覆盖已有实现', () => {
    install()
    const { JSDOM } = jest.requireActual('jsdom')
    const other = new JSDOM('<div uni-view></div>')
    try {
      const el = other.window.document.querySelector('div')
      expect(el).toBeInstanceOf(elements.UniViewElement)
      expect(el).toBeInstanceOf(UniElement)
      expect(el.getPage).toBeUndefined()
      const existing = () => 'existing'
      Object.defineProperty(other.window.HTMLDivElement.prototype, 'getPage', {
        value: existing,
      })
      install(other.window)
      install(other.window)
      expect(el.getPage).toBe(existing)
      expect(el.uniTagName).toBe('VIEW')
      const proto = dom.window.HTMLDivElement.prototype
      const method = proto.getPage
      install()
      expect(proto.getPage).toBe(method)
      for (const key of [
        'getPage',
        'uniPage',
        'getBoundingClientRectAsync',
        'uniTagName',
      ]) {
        expect(Object.getOwnPropertyDescriptor(proto, key)?.enumerable).toBe(
          false
        )
      }
    } finally {
      other.window.close()
    }
  })

  test('静态初始数据只关联不创建 Map，读取不扫描 DOM，克隆实例隔离', () => {
    const { JSDOM } = jest.requireActual('jsdom')
    const other = new JSDOM('<!doctype html><body></body>')
    const read = jest.spyOn(
      other.window.HTMLElement.prototype,
      'dataset',
      'get'
    )
    try {
      install(other.window)
      const template = other.window.document.createElement('template')
      template.innerHTML =
        '<div uni-view data-count="1"><span uni-text></span><img uni-image></div>'
      const initial = Object.freeze({ 'data-count': '1' })
      for (let i = 0; i < 1000; i++) {
        const clone = template.content.cloneNode(true)
        clone.firstElementChild.$uniDataset = initial
        other.window.document.body.appendChild(clone)
      }
      const el = other.window.document.body.firstElementChild
      expect(el.$uniDataset).toBe(initial)
      expect(el.firstElementChild.$uniDataset).toBeUndefined()
      el.setAttribute('data-v-scope', '')
      el.setAttribute('data-count', '2')
      expect(read).not.toHaveBeenCalled()
      const dataset = el.dataset
      expect(dataset.get('count')).toBe('1')
      expect(dataset.has('vScope')).toBe(false)
      expect(read).not.toHaveBeenCalled()
      expect(el.dataset).toBe(dataset)
      el.setAttribute('data-count', '3')
      expect(dataset.get('count')).toBe('1')
      dataset.set('count', 'logical')
      expect(el.nextElementSibling.$uniDataset).toBe(initial)
      expect(el.nextElementSibling.dataset.get('count')).toBe('1')
      expect(el.nextElementSibling.dataset).not.toBe(dataset)
      expect(read).not.toHaveBeenCalled()
    } finally {
      read.mockRestore()
      other.window.close()
    }
  })

  test('IntersectionObserver 从实际宿主生成 dataset 快照，不丢失保留键', async () => {
    install()
    const el = document.createElement('div')
    el.setAttribute('uni-view', '')
    const dataset = el.dataset as any
    const payload = { count: 1 }
    dataset.set('get', payload).set('empty', undefined)
    const previous = (global as any).IntersectionObserver
    let deliver: Function
    ;(global as any).IntersectionObserver = class {
      constructor(callback: Function) {
        deliver = callback
      }
      observe() {}
    }
    try {
      const { requestComponentObserver } = await loadForMode(
        'uni-api/src/helpers/requestComponentObserver.ts',
        true,
        {
          '@dcloudio/uni-shared': elementImports['@dcloudio/uni-shared'],
          './intersection-observer': {
            initIntersectionObserverPolyfill: jest.fn(),
          },
        }
      )
      const callback = jest.fn()
      requestComponentObserver(
        el,
        { selector: 'div', thresholds: [0] },
        callback
      )
      const rect = {
        top: 0,
        left: 0,
        right: 10,
        bottom: 10,
        width: 10,
        height: 10,
      }
      deliver!([
        {
          target: el,
          intersectionRatio: 1,
          boundingClientRect: rect,
          intersectionRect: rect,
          rootBounds: rect,
        },
      ])
      const snapshot = callback.mock.calls[0][0].dataset
      expect(snapshot).not.toBe(dataset)
      expect(snapshot.get('get')).toBe(payload)
      expect(snapshot.has('empty')).toBe(true)
      expect(snapshot.get('empty')).toBeUndefined()
      dataset.clear()
      expect(snapshot.size).toBe(2)
    } finally {
      ;(global as any).IntersectionObserver = previous
    }
  })

  test('同步后的 SFC 编译产物与真实宿主 dataset、事件联动', async () => {
    install()
    const vue = jest.requireActual(
      '../../uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js'
    )
    const sfc = jest.requireActual(
      '../../uni-cli-shared/lib/dom2/web/@vue/compiler-sfc'
    )
    const compiler = jest.requireActual('@dcloudio/compiler-vapor-web')
    const data = vue.ref({ 'data-value': undefined, 'data-get': { count: 1 } })
    const click = jest.fn()
    const { descriptor } =
      sfc.parse(`<script setup vapor>const data = _data; const click = _click;</script>
      <template><view :data-count="1" v-bind="data" @click="click"><text :data-count="2"/><image :data-count="3"/></view></template>`)
    const { content } = sfc.compileScript(descriptor, {
      id: 'dataset',
      vapor: true,
      isProd: true,
      inlineTemplate: true,
      genDefaultAs: '__sfc__',
      templateOptions: {
        compiler: { parse: compiler.parse, compile: compiler.compile },
      },
    })
    const code = content
      .replace(/\bimport {/g, 'const {')
      .replace(/ as _/g, ': _')
      .replace(/} from ['"]vue['"]/g, '} = Vue')
    const Component = new Function(
      'Vue',
      '_data',
      '_click',
      `${code}\nreturn __sfc__`
    )(vue, data, click)
    const app = vue.createVaporApp(Component)
    const host = document.createElement('div')
    const prototype = dom.window.HTMLElement.prototype
    const { setAttribute, removeAttribute } = prototype
    try {
      document.body.appendChild(host)
      app.mount(host)
      const el = host.firstElementChild as HTMLElement
      const dataset = el.dataset as any
      expect(dataset.get('count')).toBe(1)
      expect(dataset.has('value')).toBe(true)
      expect(dataset.get('value')).toBeUndefined()
      expect(dataset.get('get')).toBe(data.value['data-get'])
      expect((el.firstElementChild as any).dataset.get('count')).toBe(2)
      expect((el.lastElementChild as any).dataset.get('count')).toBe(3)
      el.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }))
      expect(click).toHaveBeenCalledTimes(1)
      expect(click.mock.calls[0][0].target.dataset).toBe(dataset)
      data.value = { 'data-value': null }
      await vue.nextTick()
      expect(dataset.has('get')).toBe(false)
      expect(dataset.has('value')).toBe(true)
      expect(dataset.get('value')).toBe(null)
      data.value = {}
      await vue.nextTick()
      expect(dataset.has('value')).toBe(false)
      expect((el as any).__uniDataset).toBeUndefined()
    } finally {
      app.unmount()
      prototype.setAttribute = setAttribute
      prototype.removeAttribute = removeAttribute
      host.remove()
    }
  })

  test.each([false, true])(
    '独立 Window 初始化不叠加属性拦截，Vapor=%s',
    async (vapor) => {
      const { JSDOM } = jest.requireActual('jsdom')
      const other = new JSDOM('<!doctype html><body></body>')
      const previous = global.HTMLElement
      ;(global as any).HTMLElement = other.window.HTMLElement
      try {
        const Base = (await loadUniElement(vapor, elementImports)).UniElement
        class Legacy extends Base {}
        if (vapor) {
          Object.defineProperty(Legacy.prototype, 'uniTagName', {
            value: 'FIELD',
          })
          install(other.window)
        }
        other.window.customElements.define('uni-field', Legacy)
        const prototype = other.window.HTMLElement.prototype
        const installedSet = prototype.setAttribute
        const installedRemove = prototype.removeAttribute
        const datasetApi = await loadForMode(
          'uni-shared/src/dom/customDataset.ts',
          vapor,
          {
            '@vue/shared': elementImports['@vue/shared'],
            '../utils': elementImports['@dcloudio/uni-shared'],
          }
        )
        const { initView } = await loadForMode(
          'uni-core/src/view/init/index.ts',
          vapor,
          {
            '@dcloudio/uni-shared': datasetApi,
            './longPress': { initLongPress: jest.fn() },
            './rem': { useRem: jest.fn() },
            '../../helpers': {
              isBuiltInElement: (el: any) => !!el.__isUniElement,
            },
          }
        )
        initView()
        const initializedSet = prototype.setAttribute
        const initializedRemove = prototype.removeAttribute
        initView()
        expect(prototype.setAttribute).toBe(initializedSet)
        expect(prototype.removeAttribute).toBe(initializedRemove)
        if (vapor) {
          expect(initializedSet).toBe(installedSet)
          expect(initializedRemove).toBe(installedRemove)
        } else {
          expect(initializedSet).not.toBe(installedSet)
        }
        for (const Host of [
          other.window.HTMLDivElement,
          other.window.HTMLSpanElement,
          other.window.HTMLImageElement,
        ]) {
          expect(Object.hasOwn(Host.prototype, 'setAttribute')).toBe(false)
          expect(Object.hasOwn(Host.prototype, 'removeAttribute')).toBe(false)
          if (!vapor)
            expect(Object.hasOwn(Host.prototype, 'dataset')).toBe(false)
        }
        const payload = { count: 1 }
        if (vapor) {
          const el = other.window.document.createElement('uni-field')
          expect(el.setAttribute).toBe(installedSet)
          expect(el.removeAttribute).toBe(installedRemove)
          el.setAttribute('data-payload', payload as any)
          expect(el.dataset.payload).toBe('[object Object]')
          expect(el.__uniDataset).toBeUndefined()
          expect(el.attachVmProps).toBeUndefined()
        } else {
          const el = other.window.document.createElement('uni-field')
          el.setAttribute('data-removed', payload as any)
          el.removeAttribute('data-removed')
          el.setAttribute('data-payload', payload as any)
          expect(el.__uniDataset.payload).toBe(payload)
          const dataset = el.dataset
          expect(dataset.has('removed')).toBe(false)
          expect(dataset.get('payload')).toBe(payload)
          el.setAttribute('data-payload', null as any)
          expect(dataset.has('payload')).toBe(true)
          expect(dataset.get('payload')).toBeNull()
          el.removeAttribute('data-payload')
          expect(dataset.has('payload')).toBe(false)
          expect(el.__uniDataset).toEqual({})
        }
        const plain = other.window.document.createElement('div')
        plain.setAttribute('data-value', payload as any)
        expect(plain.dataset).not.toBeInstanceOf(Map)
        expect(plain.dataset.value).toBe('[object Object]')
        expect(plain.__uniDataset).toBeUndefined()
        if (vapor)
          expect(() => plain.setAttribute('1-invalid', 'ignored')).toThrow()
        else plain.setAttribute('1-invalid', 'ignored')
        expect(plain.hasAttribute('1-invalid')).toBe(false)
        if (vapor) {
          const native = other.window.document.createElement('span')
          native.setAttribute('uni-text', '')
          native.setAttribute('DATA-payload', payload as any)
          expect(native.dataset.has('payload')).toBe(false)
          native.removeAttribute('DaTa-payload')
          expect(native.dataset.has('payload')).toBe(false)
          expect(native.__uniDataset).toBeUndefined()
        }
      } finally {
        ;(global as any).HTMLElement = previous
        other.window.close()
      }
    }
  )

  test('Vapor 不改写原生属性 API，手动属性修改不影响 dataset', () => {
    const { JSDOM } = jest.requireActual('jsdom')
    const other = new JSDOM('<!doctype html>')
    try {
      const proto = other.window.HTMLElement.prototype
      const set = proto.setAttribute
      const remove = proto.removeAttribute
      install(other.window)
      expect(proto.setAttribute).toBe(set)
      expect(proto.removeAttribute).toBe(remove)
      for (const [tag, marker] of [
        ['div', 'uni-view'],
        ['span', 'uni-text'],
        ['img', 'uni-image'],
      ]) {
        const el = other.window.document.createElement(tag)
        el.setAttribute(marker, '')
        el.$uniDataset = { 'data-id': 'initial' }
        el.setAttribute('data-id', 'manual')
        expect(el.setAttribute).toBe(set)
        expect(el.removeAttribute).toBe(remove)
        expect(el.dataset.get('id')).toBe('initial')
        el.removeAttribute('data-id')
        expect(el.dataset.get('id')).toBe('initial')
        el.dataset.set('id', 'logical')
        expect(el.hasAttribute('data-id')).toBe(false)
      }
    } finally {
      other.window.close()
    }
  })

  test('普通属性操作不识别节点、不读取 dataset', () => {
    install()
    const el = document.createElement('div')
    Object.defineProperties(el, {
      uniTagName: {
        get() {
          throw new Error('普通属性不应读取 uniTagName')
        },
      },
      dataset: {
        get() {
          throw new Error('普通属性不应读取 dataset')
        },
      },
    })
    for (const key of ['id', 'title', 'class', 'style', 'aria-label']) {
      el.setAttribute(key, 'value')
      expect(el.getAttribute(key)).toBe('value')
      el.removeAttribute(key)
      expect(el.hasAttribute(key)).toBe(false)
    }
  })

  test('Vapor 基类不再覆盖原生属性、dataset、样式和标签名', () => {
    for (const name of [
      'getAttribute',
      'setAttribute',
      'removeAttribute',
      'dataset',
      'style',
      'tagName',
      'nodeName',
      'attachVmProps',
    ]) {
      expect(Object.hasOwn(UniElement.prototype, name)).toBe(false)
    }
    class Native extends UniElement {}
    customElements.define('test-native-base', Native)
    const el = document.createElement('test-native-base') as any
    expect(el.tagName).toBe('TEST-NATIVE-BASE')
    expect(el.nodeName).toBe('TEST-NATIVE-BASE')
    expect(el.setAttribute).toBe(Element.prototype.setAttribute)
    expect(el.removeAttribute).toBe(Element.prototype.removeAttribute)
    expect(Object.keys(el)).toEqual([])
  })

  test.each([
    [false, false],
    [false, true],
  ])(
    '拆分保留旧组件的直接继承与属性行为，Vapor=%s，X=%s',
    async (vapor, isX) => {
      const { UniElement: Base } = await loadUniElement(
        vapor,
        elementImports,
        isX
      )
      expect(Object.getPrototypeOf(Base.prototype)).toBe(HTMLElement.prototype)
      class Legacy extends Base {}
      const tag = `uni-split-${+vapor}-${+isX}`
      dom.window.customElements.define(tag, Legacy)
      const el = document.createElement(tag) as any
      expect(el).toBeInstanceOf(Base)
      expect(el.__isUniElement).toBe(vapor ? undefined : true)
      expect(el.tagName).toBe(`SPLIT-${+vapor}-${+isX}`)
      expect(el.nodeName).toBe(el.tagName)
      el.setAttribute('data-value', 'dom')
      el.attachVmProps({ dataValue: 7 })
      expect(el.getAttribute('data-value')).toBe('7')
      expect(Element.prototype.getAttribute.call(el, 'data-value')).toBe('dom')
      el.style.setProperty('width', '10px')
      expect(el.style.width).toBe('10px')
      const setProperty = el.style.setProperty
      expect(el.style.setProperty).toBe(setProperty)
      if (!isX) {
        expect(el.dataset).not.toBeInstanceOf(Map)
        expect(el.getPage).toBeUndefined()
        expect(el.setAttribute).toBe(HTMLElement.prototype.setAttribute)
        expect(el.removeAttribute).toBe(HTMLElement.prototype.removeAttribute)
      }
    }
  )
})
