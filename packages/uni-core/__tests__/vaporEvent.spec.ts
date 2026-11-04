import { JSDOM } from 'jsdom'
import path from 'path'
import jscc from 'rollup-plugin-jscc'
import ts from 'typescript'

// Vapor runtime 与测试模块必须使用同版本 shared，避免解析到工作区的 VDOM 版本。
jest.mock('@vue/shared', () =>
  jest.requireActual(
    '../../uni-cli-shared/lib/dom2/web/@vue/shared/dist/shared.cjs.js'
  )
)

async function loadForMode(
  file: string,
  vapor: boolean,
  imports: Record<string, any>,
  isX = true,
  platform = 'h5'
) {
  const plugin = jscc({
    values: { _X_: +isX, _X_VAPOR_: +vapor, _NODE_JS_: 0 },
  })
  const { code } = await (plugin.load as any).call(
    {},
    path.resolve(__dirname, '../src/view/plugin', file)
  )
  const output = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText
  const module = { exports: {} as any }
  new Function('require', 'module', 'exports', '__X__', '__PLATFORM__', output)(
    (id: string) => {
      if (!(id in imports)) throw new Error('缺少测试依赖：' + id)
      return imports[id]
    },
    module,
    module.exports,
    isX,
    platform
  )
  return module.exports
}

describe('Web Vapor 原生事件', () => {
  let dom: JSDOM
  let normalize: (event: Event) => Event
  let vaporEvents: any
  let vdomEvents: any
  const legacyEvents: Record<string, any> = {}
  const previous = new Map<string, any>()

  beforeAll(async () => {
    dom = new JSDOM('<!doctype html><body></body>')
    for (const name of ['Event', 'CustomEvent', 'HTMLElement']) {
      previous.set(name, (global as any)[name])
      ;(global as any)[name] = (dom.window as any)[name]
    }
    const helpers = {
      isBuiltInElement: (el: any) => !!el.uniTagName,
      getWindowTop: () => 0,
    }
    const imports = {
      '@vue/shared': jest.requireActual(
        '../../uni-cli-shared/lib/dom2/web/@vue/shared/dist/shared.cjs.js'
      ),
      '@dcloudio/uni-shared': jest.requireActual('@dcloudio/uni-shared'),
      '../../helpers': helpers,
      '../../helpers/util': helpers,
      './componentWxs': { wrapperH5WxsEvent: jest.fn() },
    }
    vaporEvents = await loadForMode('componentInstance.ts', true, imports)
    vdomEvents = await loadForMode('componentInstance.ts', false, imports)
    for (const platform of ['h5', 'app']) {
      legacyEvents[platform] = await loadForMode(
        'componentInstance.ts',
        false,
        imports,
        false,
        platform
      )
    }
    normalize = (
      await loadForMode('componentInstance-vapor.ts', true, {
        ...imports,
        './componentInstance': vaporEvents,
      })
    ).normalizeVaporNativeEvent
  })
  afterAll(() => {
    previous.forEach((value, name) => {
      ;(global as any)[name] = value
    })
    dom.window.close()
  })

  test('仅归一化内置宿主，保留原始 target，绑定原生事件方法', () => {
    const root = dom.window.document.createElement('uni-input') as any
    root.uniTagName = 'INPUT'
    const input = root.appendChild(dom.window.document.createElement('input'))
    let result: any
    root.addEventListener('click', (event: Event) => {
      result = normalize(event)
      result.preventDefault()
    })
    const event = new dom.window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      detail: 1,
    })
    input.dispatchEvent(event)
    expect(result).toBeDefined()
    expect(result.target).toBe(root)
    expect(result.currentTarget).toBe(root)
    expect(result.detail).toEqual({})
    expect(event.target).toBe(input)
    expect(event.defaultPrevented).toBe(true)
    const plain = dom.window.document.createElement('div')
    plain.addEventListener('click', (event) => {
      result = normalize(event)
    })
    const plainEvent = new dom.window.MouseEvent('click')
    plain.dispatchEvent(plainEvent)
    expect(result).toBe(plainEvent)
  })

  test('保留 image 后写入的 detail 和 CustomEvent 对象 detail', () => {
    const image = dom.window.document.createElement('img') as any
    image.uniTagName = 'IMAGE'
    let normalized: any
    image.addEventListener('load', (event: Event) => {
      normalized = normalize(event)
      normalized.detail = { width: 320, height: 180 }
    })
    image.dispatchEvent(new dom.window.Event('load'))
    expect(normalized.detail).toEqual({ width: 320, height: 180 })
    const detail = { value: 'value' }
    image.addEventListener('change', (event: Event) => {
      normalized = normalize(event)
    })
    image.dispatchEvent(new dom.window.CustomEvent('change', { detail }))
    expect(normalized.detail).toBe(detail)
  })

  test('委托监听移动 currentTarget 后仍保留当前宿主，Text target 可正常上溯', () => {
    const root = dom.window.document.createElement('span') as any
    root.uniTagName = 'TEXT'
    const target = root.appendChild(dom.window.document.createTextNode('text'))
    let current: Element | null = root
    const event = new dom.window.Event('click')
    Object.defineProperties(event, {
      currentTarget: { get: () => current },
      target: { value: target, configurable: true },
    })
    const result = normalize(event)
    current = null
    expect(result.currentTarget).toBe(root)
    expect(result.target).toBe(root)
    expect(event.target).toBe(target)
    expect(event.currentTarget).toBeNull()
  })

  test('实际 Vapor 运行时与 image 包装器共同保留尺寸 detail', () => {
    const runtime = jest.requireActual(
      '../../uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js'
    )
    const image = dom.window.document.createElement('img') as any
    Object.defineProperties(image, {
      uniTagName: { value: 'IMAGE' },
      naturalWidth: { value: 320 },
      naturalHeight: { value: 180 },
    })
    const handler = jest.fn()
    runtime.setNativeEventNormalizer(normalize)
    try {
      runtime.on(image, 'load', runtime.withImageEventDetail(handler, 'load'))
      image.dispatchEvent(new dom.window.Event('load'))
      expect(handler).toHaveBeenCalledTimes(1)
      expect(handler.mock.calls[0][0].detail).toEqual({
        width: 320,
        height: 180,
      })
      expect(handler.mock.calls[0][0].currentTarget).toBe(image)
    } finally {
      runtime.setNativeEventNormalizer()
    }
  })

  test('原始事件处理器经过 self 修饰符后仍按真实 DOM target 过滤', () => {
    const runtime = jest.requireActual(
      '../../uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js'
    )
    const root = dom.window.document.createElement('uni-input') as any
    root.uniTagName = 'INPUT'
    const input = root.appendChild(dom.window.document.createElement('input'))
    const raw = Object.assign(jest.fn(), { __wwe: true })
    runtime.setNativeEventNormalizer(normalize)
    try {
      runtime.on(root, 'click', runtime.withModifiers(raw, ['self']))
      input.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }))
      // 子 input 不是监听宿主，原始事件的 self 判断不应被 target 归一化改变。
      expect(raw).not.toHaveBeenCalled()
    } finally {
      runtime.setNativeEventNormalizer()
    }
  })

  test('共享 createNativeEvent：Vapor 可读取后写入的 detail，VDOM 保留创建时快照', () => {
    const root = dom.window.document.createElement('div') as any
    root.uniTagName = 'VIEW'
    let vapor: any
    let vdom: any
    root.addEventListener('load', (event: Event) => {
      vapor = vaporEvents.createNativeEvent(event)
      vdom = vdomEvents.createNativeEvent(event)
      ;(event as any).detail = { width: 320 }
    })
    root.dispatchEvent(new dom.window.Event('load'))
    expect(vapor.detail).toEqual({ width: 320 })
    expect(vdom.detail).toEqual({})
    expect(vapor.currentTarget).toBe(root)
    expect(vdom.currentTarget).toBe(root)
  })

  test.each([false, true])(
    '共享包装保留对象 detail、触摸数据和原生方法，Vapor=%s',
    (vapor) => {
      const root = dom.window.document.createElement('div') as any
      root.uniTagName = 'VIEW'
      const detail = { value: 'value' }
      const touches = [{ clientX: 10 }]
      const event = new dom.window.CustomEvent('touchstart', {
        detail,
        cancelable: true,
      })
      Object.assign(event, { touches, changedTouches: touches, _stopped: true })
      let result: any
      root.addEventListener('touchstart', () => {
        result = (vapor ? vaporEvents : vdomEvents).createNativeEvent(event)
        result.preventDefault()
      })
      root.dispatchEvent(event)
      expect(result.detail).toBe(detail)
      expect(result.touches).toBe(touches)
      expect(result.changedTouches).toBe(touches)
      expect(result._stopped).toBe(true)
      expect(result.type).toBe(event.type)
      expect(result.timeStamp).toBe(event.timeStamp)
      expect(event.defaultPrevented).toBe(true)
    }
  )

  test.each(['h5', 'app'])(
    '普通 uni-app 仍返回旧事件结构和点击坐标，平台=%s',
    (platform) => {
      const root = dom.window.document.createElement('uni-view') as any
      root.uniTagName = 'VIEW'
      root.id = 'legacy'
      const event = new dom.window.MouseEvent('click', {
        clientX: 10,
        clientY: 20,
        cancelable: true,
      })
      // 当前 JSDOM 未实现浏览器 MouseEvent 的 x/y 别名。
      Object.defineProperties(event, {
        x: { get: () => event.clientX },
        y: { get: () => event.clientY },
      })
      let result: any
      root.addEventListener('click', () => {
        result = legacyEvents[platform].$nne(event)[0]
        if (platform === 'h5') result.preventDefault()
      })
      root.dispatchEvent(event)
      expect(result).not.toBeInstanceOf(dom.window.Event)
      expect(result.target.id).toBe('legacy')
      expect(result.currentTarget.id).toBe('legacy')
      expect(result.detail).toEqual({ x: 10, y: 20 })
      expect(result.touches).toHaveLength(1)
      expect(result.changedTouches).toEqual(result.touches)
      expect(event.defaultPrevented).toBe(platform === 'h5')
    }
  )
})
