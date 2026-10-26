import fs from 'fs'
import path from 'path'
import { createRequire } from 'module'
import { execFileSync } from 'child_process'
import jscc from 'rollup-plugin-jscc'
import ts from 'typescript'

// 真实 Vapor runtime 必须使用配套 shared。
jest.mock('@vue/shared', () =>
  jest.requireActual(
    '../../uni-cli-shared/lib/dom2/web/@vue/shared/dist/shared.cjs.js'
  )
)
const root = path.resolve(__dirname, '../../..')
const directory = 'packages/uni-h5/src/view/components/ad/'
const components = 'packages/uni-components/src/'
async function preprocess(file: string, vapor = true) {
  const plugin = jscc({ values: { _X_: 1, _X_VAPOR_: +vapor, _NODE_JS_: 0 } })
  return (await (plugin.load as any).call({}, path.join(root, file)))
    .code as string
}
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

describe('Web Vapor Ad 原生宿主', () => {
  let dom: any, vue: any, load: (vapor?: boolean) => any
  let provider = '10035'
  let material = '/a.png'
  const globals = new Map<string, any>(),
    apps: any[] = []
  const requests: any[] = []
  const execute = jest.fn((options) => options.success({ ok: true }))
  const request = jest.fn((options) => {
    requests.push(options)
    if (options.url.includes('/ah5v2')) {
      options.success({
        data: {
          ret: 0,
          data: {
            a: {
              a: [{ a1: provider, a3: 'placement', img: material }],
              b: [{ a1: provider, a3: 'placement-b', img: '/b.png' }],
            },
            b: { [provider]: { script: { src: '/sdk.js' } } },
          },
        },
      })
      options.complete()
    }
  })
  beforeAll(async () => {
    const { JSDOM } = jest.requireActual('jsdom')
    dom = new JSDOM('<!doctype html><body></body>', {
      url: 'https://example.test/',
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
      'customElements',
      'localStorage',
      'navigator',
      'location',
      'uni',
      '__X__',
      '__NODE_JS__',
    ]) {
      globals.set(name, Object.getOwnPropertyDescriptor(global, name))
      Object.defineProperty(global, name, {
        value: dom.window[name],
        configurable: true,
        writable: true,
      })
    }
    Object.assign(global, { __X__: true, __NODE_JS__: false, uni: { request } })
    vue = jest.requireActual(
      path.join(root, 'packages/uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js')
    )
    const shared = jest.requireActual(
      '../../uni-cli-shared/lib/dom2/web/@vue/shared/dist/shared.cjs.js'
    )
    const uniShared = jest.requireActual('@dcloudio/uni-shared')
    const UniElement = evaluate(
      await preprocess(components + 'helpers/UniElement-vapor.ts'),
      { '@vue/shared': shared, '@dcloudio/uni-shared': uniShared }
    ).UniElement
    const elements = evaluate(
      await preprocess(components + 'vue/web-vapor-elements.ts'),
      {
        '../helpers/UniElement': { UniElement },
        '@dcloudio/uni-shared': uniShared,
      }
    )
    elements.installWebVaporElements(dom.window)
    const common = {
      ...evaluate(await preprocess(components + 'helpers/useAttrs.ts'), {
        vue,
      }),
      ...evaluate(await preprocess(components + 'helpers/useEvent.ts'), {
        '@dcloudio/uni-shared': uniShared,
        '@dcloudio/uni-core': { createNativeEvent: jest.fn() },
      }),
    }
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
    const factories: any = {}
    for (const vapor of [true, false]) {
      const business = await preprocess(directory + 'useAd.ts', vapor)
      const helper = evaluate(
        await preprocess(components + 'helpers/component.ts', vapor),
        {
          '@vue/shared': shared,
          './component-vapor': evaluate(
            await preprocess(components + 'helpers/component-vapor.ts'),
            { vue }
          ),
          './component-vdom': { defineComponent: vue.defineComponent },
          './animation': { default: {} },
        }
      )
      const babelRequire = createRequire(
        nodeRequire.resolve('@vitejs/plugin-vue-jsx')
      )
      const script = vapor
        ? `const fs=require('fs'),c=require(${JSON.stringify(
            compiler
          )});process.stdout.write(c.transform(fs.readFileSync(0,'utf8'),{filename:'ad.tsx',vapor:true}).code)`
        : `const fs=require('fs'),b=require(${JSON.stringify(
            babelRequire.resolve('@babel/core')
          )});process.stdout.write(b.transformSync(fs.readFileSync(0,'utf8'),{filename:'ad.tsx',babelrc:false,configFile:false,plugins:[[require(${JSON.stringify(
            babelRequire.resolve('@vue/babel-plugin-jsx')
          )}),{optimize:true,isCustomElement:tag=>tag.startsWith('uni-')}]]}).code)`
      const compiled = execFileSync(process.execPath, ['-e', script], {
        input: await preprocess(
          directory + (vapor ? 'index-vapor.tsx' : 'index.tsx'),
          vapor
        ),
        encoding: 'utf8',
      })
      factories[String(vapor)] = () =>
        evaluate(compiled, {
          vue,
          '@dcloudio/uni-components': helper,
          '/vue-jsx/vapor': evaluate(fs.readFileSync(runtime, 'utf8'), { vue }),
          // 每个用例独立配置、脚本缓存，网络及第三方 SDK 仅在边界模拟。
          './useAd': evaluate(business, {
            vue,
            '@dcloudio/uni-components': common,
          }),
        }).default
    }
    load = (vapor = true) => factories[String(vapor)]()
  }, 30000)
  beforeEach(() => {
    jest.useFakeTimers()
    // 浏览器中全局定时器属于 window；JSDOM 与 Jest 的两个对象需指向同一组模拟定时器。
    dom.window.clearInterval = clearInterval
    dom.window.TuiaSDKLite = { execute }
  })
  afterEach(() => {
    apps.splice(0).forEach((app) => app.unmount())
    document.body.innerHTML = ''
    localStorage.clear()
    delete dom.window.TencentGDT
    provider = '10035'
    material = '/a.png'
    requests.length = 0
    request.mockClear()
    execute.mockClear()
    jest.useRealTimers()
  })
  afterAll(() => {
    dom.window.close()
    globals.forEach((descriptor, key) => {
      if (descriptor) Object.defineProperty(global, key, descriptor)
      else delete (global as any)[key]
    })
  })
  function mount(vapor = true, slots = {}) {
    const Ad = load(vapor),
      state = vue.reactive({
        adpid: 'a',
        class: 'custom-ad',
        style: { width: '320px' },
      })
    const loaded = jest.fn(),
      error = jest.fn(),
      click = jest.fn()
    const host = document.createElement('div')
    document.body.appendChild(host)
    const app = vapor
      ? vue.createVaporApp(
          vue.defineVaporComponent({
            setup: () =>
              vue.createComponent(
                Ad,
                {
                  adpid: () => state.adpid,
                  class: () => state.class,
                  style: () => state.style,
                  onLoad: () => loaded,
                  onError: () => error,
                  onClick: () => click,
                },
                slots
              ),
          })
        )
      : vue.createApp({
          render: () =>
            vue.h(
              Ad,
              { ...state, onLoad: loaded, onError: error, onClick: click },
              slots
            ),
        })
    app.config.warnHandler = (message: string) => {
      throw new Error(message)
    }
    app.config.errorHandler = (error: Error) => {
      throw error
    }
    apps.push(app)
    app.mount(host)
    const element = host.querySelector(
      vapor ? '[uni-ad]' : 'uni-ad'
    ) as HTMLElement
    return {
      app,
      state,
      loaded,
      error,
      click,
      element,
      container: element.querySelector('.uni-ad-container')!,
    }
  }
  function finishScript() {
    document
      .getElementById('uniad_provider' + provider)!
      .dispatchEvent(new dom.window.Event('load'))
  }

  test.each([true, false])(
    '默认素材、属性更新、点击及事件目标保留原行为：Vapor=%s',
    async (vapor) => {
      const { element, container, state, loaded, click } = mount(vapor)
      expect(element.tagName).toBe(vapor ? 'DIV' : 'UNI-AD')
      expect(element.className).toBe('custom-ad')
      expect(element.style.width).toBe('320px')
      if (vapor) {
        expect((element as any).uniTagName).toBe('AD')
        expect(element.setAttribute).toBe(
          dom.window.Element.prototype.setAttribute
        )
        expect(element.removeAttribute).toBe(
          dom.window.Element.prototype.removeAttribute
        )
      }
      finishScript()
      await vue.nextTick()
      expect(container.querySelector('img')!.getAttribute('src')).toBe('/a.png')
      expect(loaded).toHaveBeenCalledTimes(1)
      expect(loaded.mock.calls[0][0].target).toBe(container)
      jest.advanceTimersByTime(1)
      container.querySelector('img')!.click()
      expect(execute).toHaveBeenCalledTimes(1)
      expect(click).toHaveBeenCalledTimes(1)
      expect(requests.some((item) => item.data.at === 41)).toBe(true)
      state.adpid = 'b'
      state.class = 'updated-ad'
      await vue.nextTick()
      expect(element.querySelector('.uni-ad-container')).toBe(container)
      expect(container.querySelector('img')!.getAttribute('src')).toBe('/b.png')
      expect(element.getAttribute('adpid')).toBe('b')
      expect(element.className).toBe('updated-ad')
    }
  )

  test('Vapor 单节点自定义素材延迟创建一次，点击后移除', async () => {
    const slot = jest.fn(() => {
      const el = document.createElement('button')
      el.textContent = '自定义素材'
      return el
    })
    const { element, loaded } = mount(true, { default: slot })
    expect(slot).not.toHaveBeenCalled()
    finishScript()
    await vue.nextTick()
    expect(slot).toHaveBeenCalledTimes(1)
    expect(element.querySelector('img')).toBeNull()
    expect(element.querySelector('button')!.textContent).toBe('自定义素材')
    expect(loaded).toHaveBeenCalledTimes(1)
    ;(element.querySelector('.uni-ad-custom-material') as HTMLElement).click()
    await vue.nextTick()
    expect(execute).toHaveBeenCalledTimes(1)
    expect(element.querySelector('.uni-ad-custom-material')).toBeNull()
  })

  test.each([true, false])(
    '空默认插槽回退图片且只上报一次：Vapor=%s',
    async (vapor) => {
      const slot = jest.fn(() => [])
      const { element, loaded, state } = mount(vapor, { default: slot })
      expect(slot).not.toHaveBeenCalled()
      finishScript()
      await vue.nextTick()
      expect(slot).toHaveBeenCalledTimes(1)
      expect(element.querySelector('.uni-ad-custom-material')).toBeNull()
      expect(element.querySelector('img')!.getAttribute('src')).toBe('/a.png')
      expect(loaded).toHaveBeenCalledTimes(1)
      expect(requests.filter((item) => item.data.at === 40)).toHaveLength(1)
      state.adpid = 'b'
      await vue.nextTick()
      expect(slot).toHaveBeenCalledTimes(2)
      expect(element.querySelector('img')!.getAttribute('src')).toBe('/b.png')
      expect(loaded).toHaveBeenCalledTimes(2)
      expect(requests.filter((item) => item.data.at === 40)).toHaveLength(2)
    }
  )

  test('Vapor 素材确认前移除动态插槽仍回退图片，后续加载可恢复插槽', async () => {
    const visible = vue.ref(true)
    const slot = jest.fn(() => document.createElement('span'))
    const { element, loaded, error, state } = mount(true, {
      $: [() => (visible.value ? { name: 'default', fn: slot } : undefined)],
    })
    finishScript()
    visible.value = false
    await vue.nextTick()
    expect(slot).not.toHaveBeenCalled()
    expect(element.querySelector('.uni-ad-custom-material')).toBeNull()
    expect(element.querySelector('img')!.getAttribute('src')).toBe('/a.png')
    expect(loaded).toHaveBeenCalledTimes(1)
    expect(error).not.toHaveBeenCalled()
    expect(requests.filter((item) => item.data.at === 40)).toHaveLength(1)

    visible.value = true
    state.adpid = 'b'
    await vue.nextTick()
    expect(slot).toHaveBeenCalledTimes(1)
    expect(element.querySelector('img')).toBeNull()
    expect(element.querySelector('.uni-ad-custom-material span')).not.toBeNull()
    expect(loaded).toHaveBeenCalledTimes(2)
    expect(requests.filter((item) => item.data.at === 40)).toHaveLength(2)
  })

  test('Vapor 连续加载自定义素材及插槽更新不会漏报或重复上报', async () => {
    const text = vue.ref('素材')
    const slot = jest.fn(() => {
      const element = document.createElement('span')
      element.textContent = text.value
      return element
    })
    const { state, loaded, element } = mount(true, { default: slot })
    finishScript()
    await vue.nextTick()
    expect(loaded).toHaveBeenCalledTimes(1)
    text.value = '更新素材'
    await vue.nextTick()
    expect(element.querySelector('span')!.textContent).toBe('更新素材')
    expect(loaded).toHaveBeenCalledTimes(1)
    state.adpid = 'b'
    await vue.nextTick()
    expect(loaded).toHaveBeenCalledTimes(2)
    expect(requests.filter((item) => item.data.at === 40)).toHaveLength(2)
  })

  test.each([true, false])(
    '空插槽且无默认图片只触发 error：Vapor=%s',
    async (vapor) => {
      material = ''
      const { error, loaded, element } = mount(vapor, { default: () => [] })
      finishScript()
      await vue.nextTick()
      expect(error).toHaveBeenCalledTimes(1)
      expect(loaded).not.toHaveBeenCalled()
      expect(element.querySelector('.uni-ad-custom-material')).toBeNull()
      expect(requests.filter((item) => item.data.at === 40)).toHaveLength(0)
    }
  )

  test('Vapor 在插槽渲染前卸载不创建素材、不上报曝光', async () => {
    const slot = jest.fn(() => document.createElement('span'))
    const { app, loaded } = mount(true, { default: slot })
    finishScript()
    app.unmount()
    apps.splice(apps.indexOf(app), 1)
    await vue.nextTick()
    expect(slot).not.toHaveBeenCalled()
    expect(loaded).not.toHaveBeenCalled()
    expect(requests.filter((item) => item.data.at === 40)).toHaveLength(0)
  })

  test.each([false, true])(
    '关闭广告时完整清理插槽子组件：load 内关闭=%s',
    async (immediate) => {
      const mounted = jest.fn(),
        unmounted = jest.fn()
      const Child = vue.defineVaporComponent({
        setup() {
          vue.onMounted(mounted)
          vue.onUnmounted(unmounted)
          return document.createElement('span')
        },
      })
      const { app, loaded, element } = mount(true, {
        default: () => vue.createComponent(Child),
      })
      const close = () => {
        app.unmount()
        apps.splice(apps.indexOf(app), 1)
      }
      loaded.mockImplementation(() => {
        expect(
          element.querySelector('.uni-ad-custom-material span')
        ).not.toBeNull()
        if (immediate) close()
      })
      finishScript()
      await vue.nextTick()
      if (!immediate) close()
      await vue.nextTick()
      expect(loaded).toHaveBeenCalledTimes(1)
      expect(document.querySelector('[uni-ad]')).toBeNull()
      expect(unmounted).toHaveBeenCalledTimes(1)
      expect(unmounted.mock.calls.length).toBeGreaterThanOrEqual(
        mounted.mock.calls.length
      )
    }
  )

  test('Vapor load 内切换广告，按顺序完成加载与曝光', async () => {
    const { state, loaded } = mount(true, {
      default: () => document.createElement('span'),
    })
    loaded.mockImplementation(() => {
      if (state.adpid === 'a') state.adpid = 'b'
    })
    finishScript()
    await vue.nextTick()
    expect(loaded).toHaveBeenCalledTimes(2)
    expect(
      requests.filter((item) => item.data.at === 40).map((item) => item.data.a)
    ).toEqual(['a', 'b'])
  })

  test('Vapor 插槽渲染中切换广告，丢弃已排队的旧素材确认', async () => {
    let change: () => void = () => {}
    const slot = jest.fn(() => {
      change()
      return document.createElement('span')
    })
    const { state, loaded } = mount(true, { default: slot })
    change = () => {
      if (state.adpid === 'a') state.adpid = 'b'
    }
    finishScript()
    await vue.nextTick()
    expect(loaded).toHaveBeenCalledTimes(1)
    expect(
      requests.filter((item) => item.data.at === 40).map((item) => item.data.a)
    ).toEqual(['b'])
  })

  test.each([true, false])('脚本加载失败继续发出 error：Vapor=%s', (vapor) => {
    const { error, container } = mount(vapor)
    document
      .getElementById('uniad_provider' + provider)!
      .dispatchEvent(new dom.window.Event('error'))
    expect(error).toHaveBeenCalledTimes(1)
    expect(error.mock.calls[0][0].target).toBe(container)
  })

  test.each([true, false])(
    '广点通仍向内部 SDK 容器渲染，卸载清理定时器：Vapor=%s',
    (vapor) => {
      provider = '2'
      const interval = jest.spyOn(global, 'setInterval')
      const clear = jest.spyOn(dom.window, 'clearInterval')
      const { app, container, loaded } = mount(vapor)
      finishScript()
      const placement = dom.window.TencentGDT[0]
      const renderAd = jest.fn()
      dom.window.TencentGDT.NATIVE = { renderAd }
      placement.onComplete([{ id: 1 }])
      expect(renderAd).toHaveBeenCalledWith(
        { id: 1 },
        container.firstElementChild!.id
      )
      expect(loaded).toHaveBeenCalledTimes(1)
      expect(interval).toHaveBeenCalledTimes(1)
      expect(interval.mock.calls[0][1]).toBe(1000)
      app.unmount()
      apps.splice(apps.indexOf(app), 1)
      expect(container.children).toHaveLength(0)
      expect(clear).toHaveBeenCalledWith(interval.mock.results[0].value)
      interval.mockRestore()
      clear.mockRestore()
    }
  )
})
