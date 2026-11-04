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

describe('Web Vapor Canvas 原生宿主', () => {
  let dom: any
  let vue: any
  let Canvas: any
  let UniCanvasElement: any
  let UniElement: any
  let elements: any
  let query: Function
  let createCanvasContextAsync: Function
  let getContext: jest.Mock
  let toBlob: jest.Mock
  let toDataURL: jest.Mock
  const contexts = new WeakMap<HTMLCanvasElement, object>()
  const globals = new Map<string, any>()
  const apps: any[] = []

  beforeAll(async () => {
    const { JSDOM } = jest.requireActual('jsdom')
    dom = new JSDOM('<!DOCTYPE html><body></body>')
    // 加载真实框架样式，覆盖原生 canvas 的默认显示尺寸。
    const style = dom.window.document.createElement('style')
    style.textContent = fs.readFileSync(
      path.join(root, 'packages/uni-h5/style/framework/uvue-vapor.css'),
      'utf8'
    )
    dom.window.document.head.appendChild(style)
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
      'Image',
      '__X__',
      '__NODE_JS__',
      '__APP_VIEW__',
    ]) {
      globals.set(name, (global as any)[name])
      ;(global as any)[name] = dom.window[name]
    }
    Object.assign(global, {
      __X__: true,
      __NODE_JS__: false,
      __APP_VIEW__: false,
    })
    // JSDOM 不提供绘图实现；这里验证参数、this、返回值和异常均原样交给原生 canvas。
    getContext = jest.fn(function (this: HTMLCanvasElement, type: string) {
      if (type === 'throw') throw new Error('native canvas error')
      if (type !== '2d') return null
      if (!contexts.has(this)) contexts.set(this, { canvas: this })
      return contexts.get(this)
    })
    toDataURL = jest.fn(function (this: HTMLCanvasElement) {
      return `data:image/png;base64,${this.width}x${this.height}`
    })
    toBlob = jest.fn(function (
      this: HTMLCanvasElement,
      callback: BlobCallback,
      type?: string
    ) {
      callback(
        new dom.window.Blob([String(this.width)], { type: type || 'image/png' })
      )
    })
    Object.assign(dom.window.HTMLCanvasElement.prototype, {
      getContext,
      toDataURL,
      toBlob,
    })
    vue = jest.requireActual(
      path.join(root, 'packages/uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js')
    )
    const shared = jest.requireActual(
      '../../uni-cli-shared/lib/dom2/web/@vue/shared/dist/shared.cjs.js'
    )
    const uniShared = jest.requireActual('@dcloudio/uni-shared')
    const load = async (file: string, imports = {}) =>
      evaluate(await preprocess(file), {
        vue,
        '@vue/shared': shared,
        '@dcloudio/uni-shared': uniShared,
        ...imports,
      })
    UniElement = (await load(components + 'helpers/UniElement-vapor.ts'))
      .UniElement
    elements = await load(components + 'vue/web-vapor-elements.ts', {
      '../helpers/UniElement': { UniElement },
    })
    elements.installWebVaporElements(dom.window)
    const element = await load(components + 'vue/canvas/element-vapor.ts', {
      '../../helpers/UniElement': { UniElement },
    })
    UniCanvasElement = element.UniCanvasElement
    const helper = await load(components + 'helpers/component.ts', {
      './component-vapor': await load(
        components + 'helpers/component-vapor.ts'
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
    const compiled = execFileSync(
      process.execPath,
      [
        '-e',
        `
      const fs = require('fs'); const compiler = require(${JSON.stringify(
        compiler
      )});
      process.stdout.write(compiler.transform(fs.readFileSync(0, 'utf8'), {
        filename: 'canvas.tsx', vapor: true
      }).code)
    `,
      ],
      {
        input: await preprocess(components + 'vue/canvas/index-vapor.tsx'),
        encoding: 'utf8',
      }
    )

    Canvas = evaluate(compiled, {
      vue,
      '/vue-jsx/vapor': evaluate(fs.readFileSync(runtime, 'utf8'), { vue }),
      '../../helpers/component': helper,
      './element-vapor': element,
      './props-x': await load(components + 'vue/canvas/props-x.ts'),
    }).default
    query = (
      await load('packages/uni-h5/src/service/api/ui/requestComponentInfo.ts', {
        '@dcloudio/uni-core': {
          getWindowOffset: () => ({ top: 0, topWindowHeight: 0 }),
        },
        '@dcloudio/uni-components': { getContextInfo: () => undefined },
      })
    ).requestComponentInfo
    createCanvasContextAsync = (
      await load(
        'packages/uni-h5/src/service/api/context/createCanvasContextAsync.ts',
        {
          '@dcloudio/uni-platform': { getRealPath: (src: string) => src },
          '../../../framework/setup/page': { getCurrentBasePages: () => [] },
          '../ui/requestComponentInfo': { requestComponentInfo: query },
        }
      )
    ).createCanvasContextAsync
  }, 30000)

  afterEach(() => {
    apps.splice(0).forEach((app) => app.unmount())
    document.body.innerHTML = ''
    getContext.mockClear()
    toBlob.mockClear()
    toDataURL.mockClear()
  })
  afterAll(() => {
    dom.window.close()
    globals.forEach((value, name) => {
      if (value === undefined) delete (global as any)[name]
      else (global as any)[name] = value
    })
  })

  function mount(props: Record<string, Function> = {}) {
    const node = vue.shallowRef()
    const host = document.createElement('uni-app')
    document.body.appendChild(host)
    const app = vue.createVaporApp(
      vue.defineVaporComponent({
        setup() {
          const canvas = vue.createComponent(Canvas, {
            id: () => 'canvas',
            ...props,
          })
          vue.setStaticTemplateRef(canvas, node)
          vue.onMounted(() => {
            expect(node.value.uniTagName).toBe('CANVAS')
            expect(node.value.getContext('2d').canvas).toBe(node.value)
          })
          return canvas
        },
      })
    )
    app.config.errorHandler = (error: Error) => {
      throw error
    }
    app.config.warnHandler = (message: string) => {
      throw new Error(message)
    }
    apps.push(app)
    app.mount(host)
    return {
      element: node.value,
      canvas: node.value as HTMLCanvasElement,
      node,
      vm: app._instance.proxy,
    }
  }

  test('原生宿主保留逻辑类型、组件 ref、dataset 与事件，实例之间相互独立', async () => {
    const payload = vue.ref({ count: 1 })
    const click = jest.fn()
    const { element, canvas, node } = mount({
      'data-payload': () => payload.value,
      onClick: () => click,
    })
    expect(element.tagName).toBe('CANVAS')
    expect(element).toBe(canvas)
    expect(element.firstElementChild).toBeNull()
    expect(element).toBeInstanceOf(UniElement)
    expect(element).not.toBeInstanceOf(elements.UniViewElement)
    expect(element).toBeInstanceOf(UniCanvasElement)
    class Derived extends UniCanvasElement {}
    expect(element).not.toBeInstanceOf(Derived)
    expect(canvas).toBeInstanceOf(dom.window.HTMLCanvasElement)
    expect(canvas.hasAttribute('uni-view')).toBe(false)
    expect(canvas.hasAttribute('uni-canvas')).toBe(true)
    expect(Object.prototype.hasOwnProperty.call(canvas, 'width')).toBe(false)
    expect(Object.prototype.hasOwnProperty.call(canvas, 'height')).toBe(false)
    expect(typeof element.getPage).toBe('function')
    expect(typeof element.getBoundingClientRectAsync).toBe('function')
    const plainCanvas = document.createElement('canvas')
    expect(plainCanvas).not.toBeInstanceOf(UniElement)
    expect(plainCanvas).not.toBeInstanceOf(UniCanvasElement)
    expect(plainCanvas.dataset).toBeInstanceOf(dom.window.DOMStringMap)
    expect(element.setAttribute).toBe(dom.window.Element.prototype.setAttribute)
    expect(element.removeAttribute).toBe(
      dom.window.Element.prototype.removeAttribute
    )
    expect(element.attachVmProps).toBeUndefined()
    expect(dom.window.customElements.get('uni-canvas')).toBeUndefined()
    expect(element.dataset.get('payload')).toBe(payload.value)
    canvas.click()
    expect(click).toHaveBeenCalledTimes(1)
    const second = mount().element
    expect(element.getContext('2d')).not.toBe(second.getContext('2d'))
    expect(element.dataset).not.toBe(second.dataset)
    payload.value = { count: 2 }
    await vue.nextTick()
    expect(node.value).toBe(element)
    expect(element.firstElementChild).toBeNull()
    expect(element.dataset.get('payload')).toBe(payload.value)
  })

  test('独立 Canvas 标识保留基础样式和 hidden，不启用 View 布局', () => {
    const { canvas } = mount()
    const style = dom.window.getComputedStyle(canvas)
    expect(style.boxSizing).toBe('border-box')
    expect(style.flexShrink).toBe('0')
    expect(style.display).not.toBe('flex')
    canvas.setAttribute('hidden', '')
    expect(dom.window.getComputedStyle(canvas).display).toBe('none')
    canvas.removeAttribute('hidden')
    expect(dom.window.getComputedStyle(canvas).display).not.toBe('none')
  })

  test('默认显示尺寸不随绘图缓冲区变化，用户样式可覆盖并恢复默认值', async () => {
    const size = vue.reactive({ width: 640, height: 320 })
    const style = vue.ref({})
    const { canvas } = mount({
      width: () => size.width,
      height: () => size.height,
      style: () => style.value,
    })
    const expectDisplaySize = (width: string, height: string) => {
      const computed = dom.window.getComputedStyle(canvas)
      expect(computed.width).toBe(width)
      expect(computed.height).toBe(height)
    }
    expect(canvas.width).toBe(640)
    expect(canvas.height).toBe(320)
    expectDisplaySize('300px', '150px')
    size.width = 800
    size.height = 400
    await vue.nextTick()
    expect(canvas.width).toBe(800)
    expect(canvas.height).toBe(400)
    expectDisplaySize('300px', '150px')
    canvas.width = 1024
    canvas.height = 512
    expectDisplaySize('300px', '150px')
    style.value = { width: '200px', height: '100px' }
    await vue.nextTick()
    expectDisplaySize('200px', '100px')
    expect(canvas.width).toBe(1024)
    expect(canvas.height).toBe(512)
    style.value = {}
    await vue.nextTick()
    expectDisplaySize('300px', '150px')
  })

  test('尺寸遵循原生 canvas 规则，样式尺寸和绘图缓冲区尺寸相互独立', async () => {
    const size = vue.reactive({ width: 640, height: 320 })
    const { element, canvas } = mount({
      width: () => size.width,
      height: () => size.height,
      style: () => ({ width: '200px', height: '100px' }),
    })
    expect(canvas.width).toBe(640)
    expect(canvas.height).toBe(320)
    expect(element.style.width).toBe('200px')
    size.width = 800
    size.height = 400
    await vue.nextTick()
    expect(element.width).toBe(800)
    expect(element.height).toBe(400)
    const reference = document.createElement('canvas')
    for (const value of [0, 100.8, -1]) {
      element.width = value
      reference.width = value
      expect(canvas.width).toBe(reference.width)
      expect(element.width).toBe(reference.width)
    }
    canvas.height = 123
    expect(element.height).toBe(123)
    expect(element.style.height).toBe('100px')
  })

  test('方法绑定一次，参数、返回值及异常保留原生行为，调用时不查询 DOM', () => {
    const { element, canvas } = mount()
    const lookup = jest.spyOn(element, 'querySelector')
    const firstChild = jest.spyOn(element, 'firstElementChild', 'get')
    const methods = [element.getContext, element.toBlob, element.toDataURL]
    const options = { alpha: false }
    expect(element.getContext('2d', options).canvas).toBe(canvas)
    expect(getContext).toHaveBeenLastCalledWith('2d', options)
    expect(
      getContext.mock.instances[getContext.mock.instances.length - 1]
    ).toBe(canvas)
    expect(element.getContext('unsupported')).toBeNull()
    expect(() => element.getContext('throw')).toThrow('native canvas error')
    const callback = jest.fn()
    element.toBlob(callback, 'image/jpeg', 0.5)
    expect(toBlob).toHaveBeenLastCalledWith(callback, 'image/jpeg', 0.5)
    expect(callback.mock.calls[0][0].type).toBe('image/jpeg')
    expect(element.toDataURL('image/jpeg', 0.8)).toBe(
      'data:image/png;base64,300x150'
    )
    expect(toDataURL).toHaveBeenLastCalledWith('image/jpeg', 0.8)
    expect(methods[0]('2d').canvas).toBe(canvas)
    expect([element.getContext, element.toBlob, element.toDataURL]).toEqual(
      methods
    )
    element.width = 400
    expect(element.width).toBe(400)
    expect(lookup).not.toHaveBeenCalled()
    expect(firstChild).not.toHaveBeenCalled()
    lookup.mockRestore()
    firstChild.mockRestore()
  })

  test('SelectorQuery 和 createCanvasContextAsync 使用同一个原生宿主', async () => {
    const { element, canvas, vm } = mount()
    const result = jest.fn()
    query(
      vm,
      [
        {
          component: vm,
          selector: '#canvas',
          single: true,
          fields: { node: true },
        },
      ],
      result
    )
    expect(result.mock.calls[0][0][0].node).toBe(element)
    const success = jest.fn(),
      complete = jest.fn()
    createCanvasContextAsync({ id: 'canvas', component: vm, success, complete })
    await vue.nextTick()
    expect(success).toHaveBeenCalledTimes(1)
    expect(complete).toHaveBeenCalledTimes(1)
    const context = success.mock.calls[0][0]
    expect(context.getContext('2d').canvas).toBe(canvas)
    expect(context.toDataURL()).toBe(element.toDataURL())
    const callback = jest.fn()
    context.toBlob(callback, 'image/jpeg', 0.7)
    expect(toBlob).toHaveBeenLastCalledWith(callback, 'image/jpeg', 0.7)
  })

  test('非 Vapor 保留原宿主和 Element 实现，服务端不绑定原生绘图能力', async () => {
    const standard = await preprocess(
      components + 'vue/canvas/index-x.tsx',
      false
    )
    expect(standard).toContain('<uni-canvas ref={rootRef}>')
    expect(standard).toContain('rootElement.attachVmProps(props)')
    expect(standard).toContain("this.querySelector('canvas')")
    expect(standard).not.toMatch(/native: true|element-vapor|uni-view=""/)
    const plugin = jscc({ values: { _X_: 1, _X_VAPOR_: 1, _NODE_JS_: 1 } })
    const code = (
      await (plugin.load as any).call(
        {},
        path.join(root, components + 'vue/canvas/index-vapor.tsx')
      )
    ).code
    expect(code).not.toContain('initCanvasElement(root)')
  })
})
