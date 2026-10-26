import fs from 'fs'
import path from 'path'
import { createRequire } from 'module'
import { execFileSync } from 'child_process'
import jscc from 'rollup-plugin-jscc'
import ts from 'typescript'

// 真实 Vapor runtime 必须配套加载同版本 shared。
jest.mock('@vue/shared', () =>
  jest.requireActual(
    '../../uni-cli-shared/lib/dom2/web/@vue/shared/dist/shared.cjs.js'
  )
)

const root = path.resolve(__dirname, '../../..')
const directory = 'packages/uni-components/src/'
async function preprocess(file: string, vapor = true) {
  const plugin = jscc({ values: { _X_: 1, _X_VAPOR_: +vapor, _NODE_JS_: 0 } })
  return (await (plugin.load as any).call({}, path.join(root, directory, file)))
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

describe('Web Vapor ResizeSensor 原生宿主', () => {
  let dom: any, vue: any, Sensor: any, VdomSensor: any
  let rect: jest.SpyInstance
  let width = 100.25,
    height = 50.75
  const globals = new Map<string, any>(),
    apps: any[] = []
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
      '__X__',
      '__NODE_JS__',
    ]) {
      globals.set(name, (global as any)[name])
      ;(global as any)[name] = dom.window[name]
    }
    Object.assign(global, { __X__: true, __NODE_JS__: false })
    vue = jest.requireActual(
      path.join(root, 'packages/uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js')
    )
    const shared = jest.requireActual(
      '../../uni-cli-shared/lib/dom2/web/@vue/shared/dist/shared.cjs.js'
    )
    const business = evaluate(
      await preprocess('vue/resize-sensor/useResizeSensor.ts'),
      { vue, '@vue/shared': shared }
    )
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
    for (const vapor of [true, false]) {
      const componentHelper = evaluate(
        await preprocess('helpers/component.ts', vapor),
        {
          '@vue/shared': shared,
          './component-vapor': evaluate(
            await preprocess('helpers/component-vapor.ts'),
            { vue }
          ),
          './component-vdom': { defineComponent: vue.defineComponent },
          './animation': { default: {} },
        }
      )
      const file =
        'vue/resize-sensor/' + (vapor ? 'index-vapor.tsx' : 'index.tsx')
      const babelRequire = createRequire(
        nodeRequire.resolve('@vitejs/plugin-vue-jsx')
      )
      const script = vapor
        ? `const fs=require('fs'),c=require(${JSON.stringify(
            compiler
          )});process.stdout.write(c.transform(fs.readFileSync(0,'utf8'),{filename:'sensor.tsx',vapor:true}).code)`
        : `const fs=require('fs'),b=require(${JSON.stringify(
            babelRequire.resolve('@babel/core')
          )});process.stdout.write(b.transformSync(fs.readFileSync(0,'utf8'),{filename:'sensor.tsx',babelrc:false,configFile:false,plugins:[[require(${JSON.stringify(
            babelRequire.resolve('@vue/babel-plugin-jsx')
          )}),{optimize:true,isCustomElement:tag=>tag.startsWith('uni-')}]]}).code)`
      const compiled = execFileSync(process.execPath, ['-e', script], {
        input: await preprocess(file, vapor),
        encoding: 'utf8',
      })
      const component = evaluate(compiled, {
        vue,
        '/vue-jsx/vapor': evaluate(fs.readFileSync(runtime, 'utf8'), { vue }),
        '../../helpers/component': componentHelper,
        './useResizeSensor': business,
      }).default
      if (vapor) Sensor = component
      else VdomSensor = component
    }
  }, 30000)
  beforeEach(() => {
    width = 100.25
    height = 50.75
    // JSDOM 不计算布局，仅模拟测量值；事件、监听和生命周期使用真实 runtime。
    rect = jest
      .spyOn(dom.window.HTMLElement.prototype, 'getBoundingClientRect')
      .mockImplementation(() => ({ width, height } as any))
  })
  afterEach(() => {
    apps.splice(0).forEach((app) => app.unmount())
    rect.mockRestore()
    document.body.innerHTML = ''
    delete dom.window.AnimationEvent
  })
  afterAll(() => {
    dom.window.close()
    globals.forEach((value, key) => {
      if (value === undefined) delete (global as any)[key]
      else (global as any)[key] = value
    })
  })
  function mount(initial = false, vapor = true, active?: any) {
    const resize = jest.fn(),
      host = document.createElement('div')
    document.body.appendChild(host)
    const Page = vue.defineVaporComponent({
      setup: () =>
        vue.createComponent(Sensor, {
          initial: () => initial,
          onResize: () => resize,
        }),
    })
    const Empty = vue.defineVaporComponent({
      setup: () => document.createElement('aside'),
    })
    const app = vapor
      ? vue.createVaporApp(
          vue.defineVaporComponent({
            setup: () =>
              active
                ? vue.createComponent(vue.VaporKeepAlive, null, {
                    default: () =>
                      vue.createDynamicComponent(() =>
                        active.value ? Page : Empty
                      ),
                  })
                : vue.createComponent(Page),
          })
        )
      : vue.createApp({
          render: () => vue.h(VdomSensor, { initial, onResize: resize }),
        })
    app.config.warnHandler = (message: string) => {
      throw new Error(message)
    }
    app.config.errorHandler = (error: Error) => {
      throw error
    }
    apps.push(app)
    app.mount(host)
    return {
      app,
      host,
      resize,
      element: host.querySelector(
        vapor ? '[uni-resize-sensor]' : 'uni-resize-sensor'
      ) as HTMLElement,
    }
  }

  test.each([true, false])(
    '初次测量、滚动更新和尺寸去重保持一致：Vapor=%s',
    async (vapor) => {
      const { element, resize, host } = mount(true, vapor)
      await vue.nextTick()
      await vue.nextTick()
      expect(element.tagName).toBe(vapor ? 'DIV' : 'UNI-RESIZE-SENSOR')
      expect(element.hasAttribute('uni-view')).toBe(false)
      expect(element.children).toHaveLength(2)
      expect(resize.mock.calls).toEqual([[{ width: 100.25, height: 50.75 }]])
      expect(host.style.position).toBe('relative')
      element.firstElementChild!.dispatchEvent(new dom.window.Event('scroll'))
      await vue.nextTick()
      expect(resize).toHaveBeenCalledTimes(1)
      height = 80.5
      element.lastElementChild!.dispatchEvent(new dom.window.Event('scroll'))
      await vue.nextTick()
      expect(resize.mock.calls[1][0]).toEqual({ width: 100.25, height: 80.5 })
      for (const child of Array.from(element.children)) {
        expect(child.scrollLeft).toBe(100000)
        expect(child.scrollTop).toBe(100000)
      }
      expect(element.setAttribute).toBe(
        dom.window.Element.prototype.setAttribute
      )
      expect(element.removeAttribute).toBe(
        dom.window.Element.prototype.removeAttribute
      )
    }
  )

  test.each([true, false])(
    '首次显示动画只处理一次：Vapor=%s',
    async (vapor) => {
      dom.window.AnimationEvent = dom.window.Event
      const { element, resize } = mount(false, vapor)
      expect(rect).not.toHaveBeenCalled()
      element.dispatchEvent(new dom.window.Event('animationstart'))
      await vue.nextTick()
      expect(resize).toHaveBeenCalledTimes(1)
      height = 99
      element.dispatchEvent(new dom.window.Event('animationstart'))
      await vue.nextTick()
      expect(rect).toHaveBeenCalledTimes(1)
    }
  )

  test('KeepAlive 激活时复用测量节点并恢复滚动探针', async () => {
    const active = vue.ref(true)
    const { host, element } = mount(false, true, active)
    await vue.nextTick()
    active.value = false
    await vue.nextTick()
    for (const child of Array.from(element.children))
      child.scrollTop = child.scrollLeft = 0
    active.value = true
    await vue.nextTick()
    expect(host.querySelector('[uni-resize-sensor]')).toBe(element)
    for (const child of Array.from(element.children)) {
      expect(child.scrollLeft).toBe(100000)
      expect(child.scrollTop).toBe(100000)
    }
  })

  test('initial 的延迟测量在立即卸载后不触发事件', async () => {
    const { app, resize } = mount(true)
    app.unmount()
    apps.splice(apps.indexOf(app), 1)
    await vue.nextTick()
    expect(resize).not.toHaveBeenCalled()
  })
})
