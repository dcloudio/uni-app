import fs from 'fs'
import path from 'path'
import { execFileSync } from 'child_process'
import ts from 'typescript'
import { preprocess } from '../../uni-preprocess'

jest.mock('@vue/shared', () =>
  jest.requireActual(
    '../../uni-cli-shared/lib/dom2/web/@vue/shared/dist/shared.cjs.js'
  )
)

const root = path.resolve(__dirname, '../../..')
const loadingDir = 'uni-ext-api/uni_modules/uni-loading/components/loading/'
function source(file: string) {
  return preprocess(fs.readFileSync(path.join(root, file), 'utf8'), {
    context: { WEB: true, H5: true, APP: false, MP: false, VUE3_VAPOR: true },
  }).code
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

describe('Loading 的真实 Web Vapor 编译与元素行为', () => {
  let dom: any
  let vue: any
  let elements: any
  let loading: any
  let element: any
  let compiled: string
  let observerCallback: () => void
  let size = 24
  const observe = jest.fn()
  const disconnect = jest.fn()
  const apps: any[] = []
  const globals = new Map<string, any>()

  beforeAll(() => {
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
      'ResizeObserver',
      'UniViewElementImpl',
    ]) {
      globals.set(name, (global as any)[name])
      ;(global as any)[name] = dom.window[name]
    }
    ;(global as any).ResizeObserver = class {
      constructor(callback: () => void) {
        observerCallback = callback
      }
      observe = observe
      disconnect = disconnect
    }
    dom.window.HTMLElement.prototype.getBoundingClientRect = () => ({
      width: size,
      height: size,
    })
    vue = jest.requireActual(
      path.join(root, 'packages/uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js')
    )
    const shared = jest.requireActual('@dcloudio/uni-shared')
    const { UniElement } = evaluate(
      source('packages/uni-components/src/helpers/UniElement-vapor.ts'),
      { '@dcloudio/uni-shared': shared }
    )
    elements = evaluate(
      source('packages/uni-components/src/vue/web-vapor-elements.ts'),
      {
        '../helpers/UniElement': { UniElement },
        '@dcloudio/uni-shared': shared,
      }
    )
    elements.installWebVaporElements(dom.window)
    ;(global as any).UniViewElementImpl = elements.UniViewElement
    element = evaluate(source(loadingDir + 'element.ts'), {})
    const style = evaluate(source(loadingDir + 'useLoadingStyle.ts'), { vue })
    // 使用真实 SFC 内联编译结果，验证内部普通 ref 和父组件根元素 ref。
    compiled = execFileSync(
      process.execPath,
      [
        '-e',
        `
      const fs = require('fs')
      require('./packages/uni-cli-shared/dist').initWebVaporAliases()
      const sfc = require('vue/compiler-sfc')
      const { descriptor } = sfc.parse(fs.readFileSync(0, 'utf8'), { filename: 'loading.vue' })
      process.stdout.write(sfc.compileScript(descriptor, {
        id: 'loading', vapor: true, inlineTemplate: true,
        templateOptions: { compiler: require('@dcloudio/compiler-vapor-web') }
      }).content)
    `,
      ],
      { cwd: root, input: source(loadingDir + 'loading.vue'), encoding: 'utf8' }
    )
    loading = evaluate(compiled, {
      vue,
      './element': element,
      './useLoadingStyle': style,
    }).default
  }, 30000)

  afterEach(() => {
    apps.splice(0).forEach((app) => app.unmount())
    document.body.innerHTML = ''
    observe.mockClear()
    disconnect.mockClear()
    size = 24
  })
  afterAll(() => {
    dom?.window.close()
    globals.forEach((value, key) => {
      if (value === undefined) delete (global as any)[key]
      else (global as any)[key] = value
    })
  })

  function mount() {
    const host = document.createElement('div')
    document.body.appendChild(host)
    const ref = vue.shallowRef()
    const paused = vue.ref(false)
    const bold = vue.ref(false)
    const app = vue.createVaporApp(
      vue.defineVaporComponent({
        setup() {
          const block = vue.createComponent(loading, {
            paused: () => paused.value,
            bold: () => bold.value,
            class: () => 'navigation-loading',
            style: () => ({
              display: 'inline-block',
              width: '20px',
              height: '20px',
              color: 'red',
            }),
          })
          vue.setStaticTemplateRef(block, ref)
          vue.onMounted(() => expect(ref.value.localName).toBe('div'))
          return block
        },
      })
    )
    app.mount(host)
    apps.push(app)
    return { ref, paused, bold, app }
  }

  test('静态基础宿主保持 Element 身份、透传和原生属性 API', async () => {
    expect(compiled).not.toContain('uni-loading-element')
    expect(compiled).not.toContain('__multiRoot: true')
    const define = jest.spyOn(customElements, 'define')
    try {
      const { ref } = mount()
      await vue.nextTick()
      const el = ref.value
      expect(el.localName).toBe('div')
      expect(el.hasAttribute('uni-view')).toBe(true)
      expect(el.hasAttribute('uni-loading')).toBe(true)
      expect(el.uniTagName).toBe('LOADING')
      expect(Object.prototype.hasOwnProperty.call(el, 'uniTagName')).toBe(true)
      expect(el).toBeInstanceOf(elements.UniViewElement)
      expect(el).toBeInstanceOf(element.UniLoadingElement)
      expect(document.createElement('div')).not.toBeInstanceOf(
        element.UniLoadingElement
      )
      expect(typeof el.getBoundingClientRectAsync).toBe('function')
      expect(el.classList.contains('navigation-loading')).toBe(true)
      expect(el.style.display).toBe('inline-block')
      expect(el.style.width).toBe('20px')
      expect(el.setAttribute).toBe(dom.window.Element.prototype.setAttribute)
      expect(el.removeAttribute).toBe(
        dom.window.Element.prototype.removeAttribute
      )
      expect(define).not.toHaveBeenCalled()
      expect(observe).toHaveBeenCalledTimes(1)
      expect(observe).toHaveBeenCalledWith(el)
    } finally {
      define.mockRestore()
    }
  })

  test('暂停、粗细与尺寸变化保持响应，卸载清理观察器', async () => {
    const { ref, paused, bold, app } = mount()
    await vue.nextTick()
    const spinner = ref.value.firstElementChild
    expect(spinner.style.width).toBe('24px')
    expect(spinner.style.borderWidth).toBe('1.5px')
    paused.value = true
    bold.value = true
    await vue.nextTick()
    expect(spinner.classList.contains('__uni-loading__paused')).toBe(true)
    expect(spinner.style.borderWidth).toBe('3px')
    size = 32
    observerCallback()
    await vue.nextTick()
    expect(spinner.style.width).toBe('32px')
    expect(spinner.style.borderWidth).toBe('4px')
    expect(observe).toHaveBeenCalledTimes(1)
    app.unmount()
    apps.splice(apps.indexOf(app), 1)
    expect(disconnect).toHaveBeenCalledTimes(1)
  })
})
