import path from 'path'
import jscc from 'rollup-plugin-jscc'
import ts from 'typescript'
import { hasOwn } from '@vue/shared'

jest.mock('@dcloudio/uni-api', () => ({
  defineSyncApi: (_name: string, implementation: Function) => implementation,
}))

async function loadForMode(
  file: string,
  vapor: boolean,
  imports: Record<string, any>
) {
  const plugin = jscc({
    values: { _X_: 1, _X_VAPOR_: +vapor, _NODE_JS_: 0 },
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
      '@vue/shared': jest.requireActual('@vue/shared'),
      '@dcloudio/uni-shared': jest.requireActual('@dcloudio/uni-shared'),
    }
    UniElement = (
      await loadForMode(
        'uni-components/src/helpers/UniElement.ts',
        true,
        elementImports
      )
    ).UniElement
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
      expect(el.dataset.name).toBe('value')
      expect(el.dataset.get).toBeUndefined()
      el.dataset.name = 'changed'
      expect(el.getAttribute('data-name')).toBe('changed')
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

  test('原生宿主能被现有 builtIn 判断识别，公开类型保留原生 dataset', () => {
    install()
    const el = document.createElement(
      'div'
    ) as unknown as import('../src/vue/web-vapor-elements').UniViewElement
    expect(isBuiltInElement(el)).toBe(false)
    el.setAttribute('uni-view', '')
    expect(isBuiltInElement(el)).toBe(true)
    const dataset: DOMStringMap = el.dataset
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
    expect((legacy as any).dataset.get).toBeInstanceOf(Function)
    expect((legacy as any).getPage()).toBeNull()
    expect(view).not.toBeInstanceOf(Progress)
    expect(view).not.toBeInstanceOf(Legacy)
  })

  test.each([false, true])(
    '真实初始化后仅旧组件使用 dataset 缓存，Vapor=%s',
    async (vapor) => {
      const Base = (
        await loadForMode(
          'uni-components/src/helpers/UniElement.ts',
          vapor,
          elementImports
        )
      ).UniElement
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
      defineBuiltInComponent({ rootElement: { name, class: LegacyField } })
      const first = document.createElement(name)
      const second = document.createElement(name)
      Object.defineProperty(LegacyField.prototype, 'tagName', {
        get() {
          throw new Error('识别旧组件不应重新读取和解析 DOM 标签名')
        },
      })
      expect(identify(first)).toBe(true)
      expect(identify(second)).toBe(true)
      expect(hasOwn(first, 'uniTagName')).toBe(false)
      expect(hasOwn(second, 'uniTagName')).toBe(false)
      if (vapor) {
        expect((first as any).uniTagName).toBe('TEST-VAPOR')
        expect((second as any).uniTagName).toBe('TEST-VAPOR')
        expect('__isUniElement' in first).toBe(false)
        expect(
          Object.getOwnPropertyDescriptor(LegacyField.prototype, 'uniTagName')
        ).toEqual({
          value: 'TEST-VAPOR',
          writable: false,
          enumerable: false,
          configurable: true,
        })
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
          expect(datasetApi.getCustomDataset(el).count).toBe('1')
          el.dataset.count = '2'
          expect(el.getAttribute('data-count')).toBe('2')
          expect(datasetApi.getCustomDataset(el).count).toBe('2')
          delete el.dataset.count
          expect(el.hasAttribute('data-count')).toBe(false)
          expect(datasetApi.getCustomDataset(el)).not.toHaveProperty('count')
          el.setAttribute('data-count', '3')
          expect(datasetApi.getCustomDataset(el).count).toBe('3')
          el.removeAttribute('data-count')
          expect(datasetApi.getCustomDataset(el)).not.toHaveProperty('count')
          expect(hasOwn(el, '__uniDataset')).toBe(false)
        }

        const payload = { count: 1 }
        first.setAttribute('data-payload', payload as any)
        expect(datasetApi.getCustomDataset(first).payload).toBe(payload)
        expect((first as any).dataset.get('payload')).toBe(payload)
        first.setAttribute('data-payload', 'updated')
        expect(datasetApi.getCustomDataset(first).payload).toBe('updated')
        expect((first as any).dataset.get('payload')).toBe('updated')
        first.removeAttribute('data-payload')
        expect(datasetApi.getCustomDataset(first)).not.toHaveProperty('payload')
        expect((first as any).dataset.has('payload')).toBe(false)
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
})
