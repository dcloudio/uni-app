import fs from 'fs'
import path from 'path'
import { execFileSync } from 'child_process'
import ts from 'typescript'
import { preprocess } from '../../uni-preprocess'
import { transformUniElementClasses } from '../../uni-cli-shared/src/vite/plugins/uniElement'

jest.mock('@vue/shared', () =>
  jest.requireActual(
    '../../uni-cli-shared/lib/dom2/web/@vue/shared/dist/shared.cjs.js'
  )
)

const root = path.resolve(__dirname, '../../..')
const sliderDir = path.join(
  root,
  'uni-ext-api/uni_modules/uni-form/components/slider'
)
const source = fs.readFileSync(path.join(sliderDir, 'slider.vue'), 'utf8')
function prepare(code: string, vapor = true, web = true) {
  return preprocess(code, {
    context: {
      WEB: web,
      H5: web,
      APP: !web,
      APP_ANDROID: !web,
      VUE3_VAPOR: vapor,
    },
  }).code
}
function evaluate(code: string, imports: Record<string, any>) {
  const exports: any = {}
  const result = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  })
  new Function('require', 'exports', result.outputText)((id: string) => {
    if (!(id in imports)) throw new Error('缺少测试依赖：' + id)
    return imports[id]
  }, exports)
  return exports
}

describe('Slider 原生根节点的专有 Element API', () => {
  let dom: any
  let vue: any
  let Slider: any
  let SliderElement: any
  let common: any
  const saved = new Map<string, any>()
  const apps: any[] = []

  function setGlobal(name: string, value: any) {
    saved.set(name, (global as any)[name])
    ;(global as any)[name] = value
  }
  beforeAll(() => {
    const { JSDOM } = jest.requireActual('jsdom')
    dom = new JSDOM('<!DOCTYPE html><body></body>', { pretendToBeVisual: true })
    for (const key of [
      'window',
      'document',
      'Node',
      'Element',
      'HTMLElement',
      'SVGElement',
      'Text',
      'Comment',
      'ShadowRoot',
    ]) {
      setGlobal(key, dom.window[key])
    }
    setGlobal(
      'requestAnimationFrame',
      dom.window.requestAnimationFrame.bind(dom.window)
    )
    setGlobal(
      'cancelAnimationFrame',
      dom.window.cancelAnimationFrame.bind(dom.window)
    )
    setGlobal('UniViewElementImpl', dom.window.HTMLElement)
    vue = jest.requireActual(
      path.join(root, 'packages/uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js')
    )
    // 与框架 AutoImport 一致，仅提供组件实际使用的 Vue API，不覆盖 DOM 全局对象。
    for (const key of [
      'ref',
      'computed',
      'useAttrs',
      'watch',
      'watchEffect',
      'onMounted',
      'onUnmounted',
      'onBeforeUnmount',
      'nextTick',
      'inject',
    ]) {
      setGlobal(key, vue[key])
    }
    const elements = evaluate(
      transformUniElementClasses(
        prepare(fs.readFileSync(path.join(sliderDir, 'global.ts'), 'utf8')),
        path.join(sliderDir, 'global.ts')
      )!.code,
      {}
    )
    SliderElement = elements.UniSliderElement
    common = evaluate(
      prepare(fs.readFileSync(path.join(sliderDir, '../common.ts'), 'utf8')),
      {}
    )
    const code = execFileSync(
      process.execPath,
      [
        '-e',
        `
      const fs = require('fs')
      require('./packages/uni-cli-shared/dist').initWebVaporAliases()
      const sfc = require('vue/compiler-sfc')
      const { descriptor } = sfc.parse(fs.readFileSync(0, 'utf8'), { filename: 'slider.vue' })
      process.stdout.write(sfc.compileScript(descriptor, {
        id: 'slider', vapor: true, inlineTemplate: true, isProd: true,
        templateOptions: { compiler: require('@dcloudio/compiler-vapor-web') }
      }).content)
    `,
      ],
      { cwd: root, input: prepare(source), encoding: 'utf8' }
    )
    Slider = evaluate(code, {
      vue,
      './global.ts': elements,
      '../common.ts': common,
    }).default
  }, 30000)
  afterEach(() => {
    apps.splice(0).forEach((app) => app.unmount())
    document.body.innerHTML = ''
  })
  afterAll(() => {
    dom?.window.close()
    saved.forEach((value, key) => {
      if (value === undefined) delete (global as any)[key]
      else (global as any)[key] = value
    })
  })

  function mount(value = 20, form?: any) {
    const host = document.createElement('main')
    document.body.appendChild(host)
    const prop = vue.ref(value)
    const rootRef = vue.shallowRef()
    const change = jest.fn()
    const app = vue.createVaporApp(
      vue.defineVaporComponent({
        setup() {
          if (form) vue.provide(common.FORM_KEY, form)
          const block = vue.createComponent(Slider, {
            id: () => 'slider-test',
            name: () => 'amount',
            value: () => prop.value,
            min: () => 10,
            max: () => 95,
            step: () => 10,
            showValue: () => true,
            onChange: () => change,
            onChanging: () => change,
          })
          vue.setStaticTemplateRef(block, rootRef)
          // 父组件 mounted 取得的 ref 已具备 value；更早的内部 ref 时机由编译器运行时测试覆盖。
          vue.onMounted(() => expect(rootRef.value.value).toBe(value))
          return block
        },
      })
    )
    app.mount(host)
    apps.push(app)
    return { root: rootRef.value, prop, change }
  }

  test('ref、DOM 查询取得同一个原生根，写入更新内部值及视觉状态', async () => {
    const { root: el, change } = mount()
    expect(el).toBeInstanceOf(HTMLElement)
    expect(el).toBeInstanceOf(SliderElement)
    expect(el.uniTagName).toBe('SLIDER')
    expect(el.tagName).toBe('DIV')
    expect(el.constructor).toBe(dom.window.HTMLDivElement)
    expect(document.getElementById('slider-test')).toBe(el)
    el.value = 50
    await vue.nextTick()
    expect(el.value).toBe(50)
    expect(
      el.querySelector('[role=slider]').getAttribute('aria-valuenow')
    ).toBe('50')
    expect(el.querySelector('span[uni-text]').textContent).toBe('50')
    expect(el.querySelector('.slider-track-fill').style.transform).toBe(
      'scaleX(0.499)'
    )
    expect(change).not.toHaveBeenCalled()
  })

  test('复用组件边界处理、props 更新和表单取值、重置逻辑', async () => {
    let field: any
    const form = {
      registerField: (value: any) => {
        field = value
      },
      unregisterField: jest.fn(),
    }
    const { root: el, prop } = mount(20, form)
    await vue.nextTick()
    el.value = 999
    expect(el.value).toBe(90)
    expect(field.getValue()).toBe(90)
    el.value = -1
    expect(el.value).toBe(10)
    el.value = NaN
    expect(el.value).toBe(10)
    prop.value = 40
    await vue.nextTick()
    expect(el.value).toBe(40)
    field.reset()
    expect(el.value).toBe(20)
  })

  test('多个实例共享访问器，但状态互相独立，原生属性 API 保持原引用', () => {
    const a = mount(20).root
    const b = mount(30).root
    expect(Object.getOwnPropertyDescriptor(a, 'value')!.get).toBe(
      Object.getOwnPropertyDescriptor(b, 'value')!.get
    )
    a.value = 60
    expect(b.value).toBe(30)
    expect(a.setAttribute).toBe(HTMLElement.prototype.setAttribute)
    expect(a.removeAttribute).toBe(HTMLElement.prototype.removeAttribute)
    expect(a.vm.getCurrentValue()).toBe(60)
  })

  test('卸载后释放接口引用，保留原类访问器的 vm 缺失行为', () => {
    const el = mount().root
    const getter = Object.getOwnPropertyDescriptor(el, 'value')!.get
    apps.pop().unmount()
    expect(el.vm).toBeNull()
    expect(Object.getOwnPropertyDescriptor(el, 'value')!.get).toBe(getter)
    expect(el.value).toBeUndefined()
  })

  test.each([
    [false, true],
    [true, false],
  ])('非 Web Vapor 不接入原生根绑定：%s %s', (vapor, web) => {
    const code = prepare(source, vapor, web)
    expect(code).not.toContain('initSliderElement')
    expect(code).not.toContain('element-vapor.ts')
    expect(code).toContain('class: UniSliderElement')
  })

  test('KeepAlive 停用、恢复保留同一根节点及接口，销毁才释放', async () => {
    const show = vue.ref(true)
    const other = vue.defineVaporComponent({
      setup: () => document.createElement('aside'),
    })
    const host = document.createElement('main')
    document.body.appendChild(host)
    const app = vue.createVaporApp(
      vue.defineVaporComponent({
        setup: () =>
          vue.createComponent(vue.VaporKeepAlive, null, {
            default: () =>
              vue.createDynamicComponent(() => (show.value ? Slider : other), {
                id: () => 'cached-slider',
                value: () => 20,
              }),
          }),
      })
    )
    app.mount(host)
    apps.push(app)
    await vue.nextTick()
    const el = host.querySelector('[uni-slider]') as any
    const getter = Object.getOwnPropertyDescriptor(el, 'value')!.get
    el.value = 40
    show.value = false
    await vue.nextTick()
    expect(host.contains(el)).toBe(false)
    expect(el.value).toBe(40)
    show.value = true
    await vue.nextTick()
    expect(host.querySelector('[uni-slider]')).toBe(el)
    expect(el.value).toBe(40)
    expect(Object.getOwnPropertyDescriptor(el, 'value')!.get).toBe(getter)
    apps.pop().unmount()
    expect(el.vm).toBeNull()
    expect(Object.getOwnPropertyDescriptor(el, 'value')!.get).toBe(getter)
  })
})
