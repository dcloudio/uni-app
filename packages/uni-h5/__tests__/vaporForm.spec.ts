import fs from 'fs'
import path from 'path'
import { createRequire } from 'module'
import { execFileSync } from 'child_process'
import jscc from 'rollup-plugin-jscc'
import ts from 'typescript'

// 真实 Vapor runtime 必须配套加载同版本 shared，避免使用工作区的 VDOM 版本。
jest.mock('@vue/shared', () =>
  jest.requireActual(
    '../../uni-cli-shared/lib/dom2/web/@vue/shared/dist/shared.cjs.js'
  )
)

const root = path.resolve(__dirname, '../../..')
const components = 'packages/uni-components/src/'

async function preprocess(file: string, vapor: boolean) {
  const plugin = jscc({
    values: { _X_: 1, _X_VAPOR_: +vapor, _NODE_JS_: 0 },
  })
  return (
    await (plugin.load as any).call({}, path.join(root, components, file))
  ).code as string
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

describe('旧表单组件的 Vapor 过渡适配', () => {
  let dom: any
  let vue: any
  let helpers: any
  let Button: any
  let inputElement: any
  let textareaElement: any
  let resizeTextarea: (height: number) => void
  let nativeElements: any
  let NativeUniElement: any
  let fixDisabledColor = false
  const inputs: Record<string, any> = {}
  const apps: any[] = []
  const globals = new Map<string, any>()

  beforeAll(async () => {
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
      'getComputedStyle',
      '__PLATFORM__',
      '__X__',
      '__NODE_JS__',
    ]) {
      globals.set(name, (global as any)[name])
      ;(global as any)[name] = name === '__PLATFORM__' ? 'h5' : dom.window[name]
    }
    Object.assign(global, { __X__: true, __NODE_JS__: false })
    vue = jest.requireActual(
      path.join(root, 'packages/uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js')
    )
    helpers = evaluate(await preprocess('helpers/form-vapor.ts', true), { vue })
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
    const compile = async (name: string) =>
      execFileSync(
        process.execPath,
        [
          '-e',
          `
      const fs = require('fs'); const compiler = require(${JSON.stringify(
        compiler
      )});
      process.stdout.write(compiler.transform(fs.readFileSync(0, 'utf8'), {
        filename: '${name}.tsx', vapor: true
      }).code)
    `,
        ],
        {
          input: await preprocess(
            `vue/${name}/${name === 'button' ? 'index' : 'index-vapor'}.tsx`,
            true
          ),
          encoding: 'utf8',
        }
      )
    class UniElement extends HTMLElement {
      attachVmProps() {}
    }
    const defineComponent = evaluate(
      await preprocess('helpers/component-vapor.ts', true),
      { vue }
    ).defineComponent
    Button = evaluate(await compile('button'), {
      vue,
      '/vue-jsx/vapor': evaluate(fs.readFileSync(runtime, 'utf8'), { vue }),
      '@dcloudio/uni-core': { useI18n: () => ({ t: (v: string) => v }) },
      '../../helpers/component': { defineBuiltInComponent: defineComponent },
      '../../helpers/form-vapor': helpers,
      '../../helpers/UniElement': { UniElement },
      '../../helpers/useHover': {
        useHover: () => ({ hovering: vue.ref(false), binding: {} }),
      },
      '../../helpers/useEvent': { withWebEvent: (fn: Function) => fn },
      '../../helpers/useListeners': { useListeners() {} },
      '../../helpers/useBooleanAttr': jest.requireActual(
        path.join(root, components, 'helpers/useBooleanAttr')
      ),
      '../../components/button': jest.requireActual(
        path.join(root, components, 'components/button')
      ),
    }).default
    dom.window.customElements.define('uni-button', class extends UniElement {})
    const shared = jest.requireActual(
      '../../uni-cli-shared/lib/dom2/web/@vue/shared/dist/shared.cjs.js'
    )
    const uniShared = jest.requireActual('@dcloudio/uni-shared')
    NativeUniElement = evaluate(
      await preprocess('helpers/UniElement-vapor.ts', true),
      { '@vue/shared': shared, '@dcloudio/uni-shared': uniShared }
    ).UniElement
    nativeElements = evaluate(
      await preprocess('vue/web-vapor-elements.ts', true),
      {
        '../helpers/UniElement': { UniElement: NativeUniElement },
        '@dcloudio/uni-shared': uniShared,
      }
    )
    nativeElements.installWebVaporElements(dom.window)
    inputElement = evaluate(
      await preprocess('vue/input/element-vapor.ts', true),
      { '../web-vapor-elements': nativeElements }
    )
    textareaElement = evaluate(
      await preprocess('vue/textarea/element-vapor.ts', true),
      { '../web-vapor-elements': nativeElements }
    )
    const builtIn = evaluate(await preprocess('helpers/component.ts', true), {
      '@vue/shared': shared,
      './component-vapor': { defineComponent },
      './animation': { default: {} },
    })
    const fields = evaluate(await preprocess('helpers/useField.ts', true), {
      vue,
      '@vue/shared': shared,
      '@dcloudio/uni-shared': {},
      '@dcloudio/uni-core': {
        getCurrentPageId: () => 1,
        registerViewMethod() {},
      },
      './form-vapor': helpers,
      './throttle': jest.requireActual(
        path.join(root, components, 'helpers/throttle')
      ),
      './useEvent': {
        useCustomEvent:
          (_: any, emit: Function) =>
          (name: string, _event: Event, detail: any) =>
            emit(name, { detail }),
      },
      './useUserAction': {
        useUserAction: () => ({ state: { userAction: true } }),
      },
      './useKeyboard': { props: {}, emit: [], useKeyboard() {} },
      './useScopedAttrs': { useScopedAttrs: () => ({ state: { attrs: {} } }) },
    })
    const fieldHelpers = {
      ...fields,
      useField(...args: any[]) {
        return { ...fields.useField(...args), fixDisabledColor }
      },
    }
    const inputState = evaluate(
      await preprocess('vue/input/useInput.ts', true),
      {
        vue,
        '@vue/shared': shared,
        '../../helpers/useField': fieldHelpers,
        './utils': { resolveDigitDecimalPoint() {} },
      }
    )
    const textareaState = evaluate(
      await preprocess('vue/textarea/useTextarea.ts', true),
      {
        vue,
        '@vue/shared': shared,
        '@dcloudio/uni-shared': { LINEFEED: '\n' },
        '../../helpers/useField': fieldHelpers,
      }
    )
    for (const name of ['input', 'textarea']) {
      inputs[name] = evaluate(await compile(name), {
        vue,
        '@vue/shared': shared,
        '@dcloudio/uni-shared': { LINEFEED: '\n' },
        '/vue-jsx/vapor': evaluate(fs.readFileSync(runtime, 'utf8'), { vue }),
        '../../helpers/component': builtIn,
        '../../helpers/UniElement': { UniElement },
        './element-vapor': name === 'input' ? inputElement : textareaElement,
        './useInput': inputState,
        './useTextarea': textareaState,
        '../../helpers/useField': fieldHelpers,
        './utils': { resolveDigitDecimalPoint() {} },
        '../resize-sensor/index': {
          default: vue.defineVaporComponent({
            props: { initial: Boolean },
            emits: ['resize'],
            setup(_props: any, { emit }: any) {
              // JSDOM 不计算布局，通过真实 resize 事件协议验证高度与行数处理。
              resizeTextarea = (height) => emit('resize', { height })
              return document.createElement('uni-resize-sensor')
            },
          }),
        },
      }).default
    }
  }, 30000)

  afterEach(() => {
    fixDisabledColor = false
    apps.splice(0).forEach((app) => app.unmount())
    document.body.innerHTML = ''
    jest.useRealTimers()
  })
  afterAll(() => {
    dom.window.close()
    globals.forEach((value, name) => {
      if (value === undefined) delete (global as any)[name]
      else (global as any)[name] = value
    })
  })

  function mount(setup: Function, form?: any, label?: any) {
    const Child = vue.defineVaporComponent({ setup })
    const app = vue.createVaporApp(
      vue.defineVaporComponent({
        setup() {
          if (form) vue.provide('UNI_FORM_CTX', form)
          if (label) vue.provide('UNI_LABEL_CTX', label)
          return vue.createComponent(Child)
        },
      })
    )
    app.config.warnHandler = (message: string) => {
      throw new Error(message)
    }
    app.config.errorHandler = (error: Error) => {
      throw error
    }
    const host = document.createElement('div')
    document.body.appendChild(host)
    app.mount(host)
    apps.push(app)
    return { app, host }
  }

  function createLabel(web = true) {
    // 使用已同步 Label 的实际注册、选取逻辑，避免模拟实现掩盖多按钮联动问题。
    const source = fs
      .readFileSync(
        path.join(
          root,
          'uni-ext-api/uni_modules/uni-form/components/label/label.vue'
        ),
        'utf8'
      )
      .match(/<script[^>]*>([\s\S]*?)<\/script>/)![1]
    const props = vue.reactive({ for: '', disabled: false })
    const { preprocess } = jest.requireActual(
      path.join(root, 'packages/uni-preprocess')
    )
    const script = preprocess(source, {
      type: 'js',
      context: { WEB: web, APP: !web },
    }).code
    const label = evaluate(
      `import { defineProps, withDefaults, defineOptions, provide } from 'test-macros';
      ${script}
      export { ctx, handleTap, children };`,
      {
        '../common.ts': { LABEL_KEY: 'UNI_LABEL_CTX' },
        './global.ts': { UniLabelElement: class {} },
        'test-macros': {
          defineProps: () => props,
          withDefaults: (props: any) => props,
          defineOptions() {},
          provide() {},
        },
      }
    )
    return { ...label, props }
  }

  test.each(['DOMTokenList', '数组'])(
    'Label 兼容 %s 类型的 classList',
    (kind) => {
      const label = createLabel(kind === 'DOMTokenList')
      const activate = jest.fn()
      label.ctx.register({ id: 'button', activate, getDisabled: () => false })
      for (const [className, blocked] of [
        ['', false],
        ['button-hover', false],
        ['custom-button button-hover', false],
        ['custom-child', false],
        ['custom uni-checkbox-input', true],
        ['uni-radio-input custom', true],
        ['custom uni-switch-input', true],
      ] as const) {
        const element = document.createElement('span')
        element.className = className
        const event = {
          target:
            kind === 'DOMTokenList'
              ? element
              : { classList: Array.from(element.classList) },
        }
        activate.mockClear()
        // 直接调用以捕获异常，避免 DOM 事件派发仅向控制台报告监听器错误。
        expect(() => label.handleTap(event)).not.toThrow()
        expect(activate).toHaveBeenCalledTimes(blocked ? 0 : 1)
        if (!blocked) expect(activate).toHaveBeenCalledWith(event)
      }
    }
  )

  test('字段取最新值、重置初始值，并处理改名、空名称和卸载', () => {
    const fields = new Map<string, any>()
    const form = {
      registerField: (field: any) => fields.set(field.name, field),
      unregisterField: (name: string) => fields.delete(name),
    }
    const props = vue.reactive({ name: 'input' })
    const state = vue.reactive({ value: 'initial' })
    const { app } = mount(() => {
      helpers.useVaporFormField(props, state)
      return document.createElement('input')
    }, form)
    state.value = 'edited'
    expect(fields.get('input').getValue()).toBe('edited')
    fields.get('input').reset()
    expect(state.value).toBe('initial')
    props.name = 'textarea'
    expect([...fields.keys()]).toEqual(['textarea'])
    props.name = ''
    expect(fields.size).toBe(0)
    props.name = 'restored'
    expect(fields.has('restored')).toBe(true)
    app.unmount()
    apps.pop()
    expect(fields.size).toBe(0)
  })

  test('没有 Form/Label 时可独立使用，不产生注入警告', () => {
    mount(() => {
      helpers.useVaporFormField({ name: 'standalone' }, { value: '' })
      return vue.createComponent(Button)
    })
  })

  test.each(['input', 'textarea'])(
    '%s 使用原生输入节点并同步输入、重置、焦点和禁用状态',
    async (name) => {
      const fields = new Map<string, any>()
      const form = {
        registerField: (field: any) => fields.set(field.name, field),
        unregisterField: (name: string) => fields.delete(name),
      }
      const props = vue.reactive({
        name: 'field',
        value: 'initial',
        disabled: false,
        focus: false,
      })
      const update = jest.fn()
      const { host } = mount(
        () =>
          vue.createComponent(inputs[name], {
            name: () => props.name,
            modelValue: () => props.value,
            disabled: () => props.disabled,
            focus: () => props.focus,
            'onUpdate:modelValue': () => update,
          }),
        form
      )
      await vue.nextTick()
      const element = host.querySelector(name) as HTMLInputElement
      expect(host.querySelectorAll(`div[uni-${name}][uni-view]`)).toHaveLength(
        1
      )
      expect(element.value).toBe('initial')
      element.value = 'edited'
      element.dispatchEvent(new dom.window.Event('input', { bubbles: true }))
      await vue.nextTick()
      expect(update).toHaveBeenCalledWith('edited')
      expect(fields.get('field').getValue()).toBe('edited')
      fields.get('field').reset()
      await vue.nextTick()
      expect(element.value).toBe('initial')
      props.value = 'external'
      await vue.nextTick()
      expect(element.value).toBe('external')
      props.name = 'renamed'
      props.focus = true
      await vue.nextTick()
      expect([...fields.keys()]).toEqual(['renamed'])
      expect(document.activeElement).toBe(element)
      props.disabled = true
      await vue.nextTick()
      expect(element.disabled).toBe(true)
    }
  )

  test('Input 原生根节点首次 ref 可见即具备 Element 能力，更新不重新绑定', async () => {
    const node = vue.shallowRef()
    const value = vue.ref('initial')
    const initialized = jest.spyOn(inputElement, 'initInputElement')
    let mountedRoot: any
    const { host } = mount(() => {
      const component = vue.createComponent(inputs.input, {
        value: () => value.value,
        id: () => 'native-input',
      })
      vue.setStaticTemplateRef(component, node)
      vue.onMounted(() => {
        mountedRoot = node.value
        expect(mountedRoot.value).toBe('initial')
        expect(mountedRoot.uniTagName).toBe('INPUT')
      })
      return component
    })
    try {
      const root = node.value
      expect(root).toBe(mountedRoot)
      expect(root).toBe(host.querySelector('#native-input'))
      expect(root).toBeInstanceOf(dom.window.HTMLDivElement)
      expect(root).toBeInstanceOf(NativeUniElement)
      expect(root).toBeInstanceOf(nativeElements.UniViewElement)
      expect(root).toBeInstanceOf(inputElement.UniInputElement)
      expect(root.tagName).toBe('DIV')
      expect(root.constructor).toBe(dom.window.HTMLDivElement)
      expect(root.setAttribute).toBe(dom.window.Element.prototype.setAttribute)
      expect(root.removeAttribute).toBe(
        dom.window.Element.prototype.removeAttribute
      )
      expect(root.attachVmProps).toBeUndefined()
      expect(root.__uniDataset).toBeUndefined()
      expect(dom.window.customElements.get('uni-input')).toBeUndefined()
      const field = root.querySelector('input')
      const focus = jest.spyOn(field, 'focus')
      root.focus({ preventScroll: true })
      expect(focus).toHaveBeenCalledWith({ preventScroll: true })
      expect(document.activeElement).toBe(field)
      root.value = 'manual'
      expect(field.value).toBe('manual')
      value.value = 'updated'
      await vue.nextTick()
      expect(root.value).toBe('updated')
      expect(node.value).toBe(root)
      expect(initialized).toHaveBeenCalledTimes(1)
      class Derived extends inputElement.UniInputElement {}
      expect(root).not.toBeInstanceOf(Derived)
      const plain = document.createElement('div')
      plain.setAttribute('uni-view', '')
      expect(plain).not.toBeInstanceOf(inputElement.UniInputElement)
    } finally {
      initialized.mockRestore()
    }
  })

  test('Input 的业务 dataset 透传保留原始值，实例隔离且不拦截手动属性操作', async () => {
    const data = vue.ref({ count: 1 })
    const enabled = vue.ref(true)
    const click = jest.fn((event: Event) => {
      expect(event.currentTarget).toBe(first)
      expect((event.currentTarget as any).dataset).toBe(dataset)
    })
    const { host } = mount(() => [
      vue.createComponent(inputs.input, {
        $: [() => (enabled.value ? { 'data-payload': data.value } : {})],
        onClick: () => click,
      }),
      vue.createComponent(inputs.input),
    ])
    const [first, second] = Array.from(
      host.querySelectorAll('div[uni-input]')
    ) as any[]
    const dataset = first.dataset
    expect(dataset.get('payload')).toBe(data.value)
    expect(first.getAttribute('data-payload')).toBe('[object Object]')
    expect(second.dataset).not.toBe(dataset)
    expect(second.dataset.has('payload')).toBe(false)
    first.click()
    expect(click).toHaveBeenCalledTimes(1)
    expect(click.mock.calls[0][0].target).toBe(first)
    first.setAttribute('data-payload', 'manual')
    expect(dataset.get('payload')).toBe(data.value)
    data.value = { count: 2 }
    await vue.nextTick()
    expect(dataset.get('payload')).toBe(data.value)
    enabled.value = false
    await vue.nextTick()
    expect(dataset.has('payload')).toBe(false)
    expect(first.hasAttribute('data-payload')).toBe(false)
  })

  test('Input 搜索表单与禁用修复分支切换后，Element 仍访问当前输入节点', async () => {
    jest.useFakeTimers()
    fixDisabledColor = true
    const props = vue.reactive({
      disabled: false,
      confirmType: 'search',
      value: 'initial',
    })
    const confirm = jest.fn()
    const { host } = mount(() =>
      vue.createComponent(inputs.input, {
        disabled: () => props.disabled,
        confirmType: () => props.confirmType,
        value: () => props.value,
        onConfirm: () => confirm,
      })
    )
    const root = host.querySelector('div[uni-input]') as any
    let field = root.querySelector('input')
    expect(field.parentElement.tagName).toBe('FORM')
    field.value = 'search'
    field.dispatchEvent(
      new dom.window.KeyboardEvent('keyup', { key: 'Enter', bubbles: true })
    )
    expect(confirm.mock.calls[0][0].detail.value).toBe('search')
    props.disabled = true
    await vue.nextTick()
    const readonly = root.querySelector('input')
    expect(readonly).not.toBe(field)
    expect(readonly.readOnly).toBe(true)
    root.value = 'readonly'
    expect(readonly.value).toBe('readonly')
    expect(root.value).toBe('readonly')
    props.disabled = false
    props.confirmType = 'done'
    await vue.nextTick()
    field = root.querySelector('input')
    expect(root.querySelector('form')).toBeNull()
    expect(field.readOnly).toBe(false)
    root.focus()
    expect(document.activeElement).toBe(field)
    root.value = 'restored'
    expect(field.value).toBe('restored')
    props.disabled = true
    await vue.nextTick()
    expect(root.querySelector('input').readOnly).toBe(true)
    props.value = 'after-search'
    await vue.nextTick()
    expect(root.value).toBe('after-search')
    props.confirmType = 'search'
    props.disabled = false
    await vue.nextTick()
    expect(root.querySelector('form input')).not.toBeNull()
    expect(root.querySelector('input').readOnly).toBe(false)
    props.value = 'twice'
    await vue.nextTick()
    jest.advanceTimersByTime(100)
    await vue.nextTick()
    expect(root.value).toBe('twice')
  })

  test.each([false, true])(
    'Input 搜索模式反复切换后保持值同步、事件和根节点身份，禁用修复=%s',
    async (fixDisabled) => {
      jest.useFakeTimers()
      fixDisabledColor = fixDisabled
      const props = vue.reactive({ confirmType: 'search', value: 'initial' })
      const update = jest.fn()
      const node = vue.shallowRef()
      const { host } = mount(() => {
        const component = vue.createComponent(inputs.input, {
          confirmType: () => props.confirmType,
          modelValue: () => props.value,
          'onUpdate:modelValue': () => update,
        })
        vue.setStaticTemplateRef(component, node)
        return component
      })
      const root = node.value
      const focus = root.focus
      const descriptor = Object.getOwnPropertyDescriptor(root, 'value')
      for (let i = 0; i < 4; i++) {
        const previous = root.querySelector('input')
        props.confirmType = i % 2 ? 'search' : 'done'
        await vue.nextTick()
        props.value = 'value-' + i
        await vue.nextTick()
        // useField 的外部值同步保留既有 100ms 节流，先完成该任务再检查渲染结果。
        jest.advanceTimersByTime(100)
        await vue.nextTick()
        const field = root.querySelector('input')
        expect(field).not.toBe(previous)
        expect(root.value).toBe(props.value)
        expect(field.value).toBe(props.value)
        expect(node.value).toBe(root)
        expect(host.querySelectorAll('div[uni-input]')).toHaveLength(1)
        expect(root.querySelectorAll('input')).toHaveLength(1)
        expect(root.focus).toBe(focus)
        expect(Object.getOwnPropertyDescriptor(root, 'value')).toEqual(
          descriptor
        )
        root.focus()
        expect(document.activeElement).toBe(field)
        update.mockClear()
        field.value = 'typed-' + i
        field.dispatchEvent(new dom.window.Event('input', { bubbles: true }))
        await vue.nextTick()
        jest.advanceTimersByTime(100)
        await vue.nextTick()
        expect(update).toHaveBeenCalledTimes(1)
        expect(update).toHaveBeenCalledWith(field.value)
      }
    }
  )

  test('Textarea 原生根节点保留 value 状态语义，dataset 与属性 API 不受影响', async () => {
    jest.useFakeTimers()
    const node = vue.shallowRef()
    const value = vue.ref('initial')
    const payload = { count: 1 }
    const update = jest.fn()
    const initialized = jest.spyOn(textareaElement, 'initTextareaElement')
    const { host } = mount(() => {
      const component = vue.createComponent(inputs.textarea, {
        value: () => value.value,
        'data-payload': () => payload,
        'onUpdate:value': () => update,
      })
      vue.setStaticTemplateRef(component, node)
      vue.onMounted(() => {
        expect(node.value.value).toBe('initial')
        expect(node.value.uniTagName).toBe('TEXTAREA')
      })
      return component
    })
    // useField 在 ref 的 watcher 中安装原生输入监听，先完成本轮挂载调度。
    await vue.nextTick()
    try {
      const root = node.value
      expect(root).toBe(host.querySelector('div[uni-textarea][uni-view]'))
      expect(root).toBeInstanceOf(dom.window.HTMLDivElement)
      expect(root).toBeInstanceOf(NativeUniElement)
      expect(root).toBeInstanceOf(nativeElements.UniViewElement)
      expect(root).toBeInstanceOf(textareaElement.UniTextareaElement)
      expect(root).not.toBeInstanceOf(inputElement.UniInputElement)
      expect(root.tagName).toBe('DIV')
      expect(root.setAttribute).toBe(dom.window.Element.prototype.setAttribute)
      expect(root.removeAttribute).toBe(
        dom.window.Element.prototype.removeAttribute
      )
      expect(root.attachVmProps).toBeUndefined()
      expect(dom.window.customElements.get('uni-textarea')).toBeUndefined()
      expect(root.dataset.get('payload')).toBe(payload)
      root.setAttribute('data-payload', 'manual')
      expect(root.dataset.get('payload')).toBe(payload)
      const field = root.querySelector('textarea')
      const focus = jest.spyOn(field, 'focus')
      root.focus({ preventScroll: true })
      expect(focus).toHaveBeenCalledWith({ preventScroll: true })
      root.value = 'manual'
      expect(field.value).toBe('manual')
      // 与旧版一致：赋值不更新状态、不触发事件，派发 input 后才同步。
      expect(root.value).toBe('initial')
      expect(update).not.toHaveBeenCalled()
      field.dispatchEvent(new dom.window.Event('input', { bubbles: true }))
      await vue.nextTick()
      expect(root.value).toBe('manual')
      expect(update).toHaveBeenCalledTimes(1)
      value.value = 'updated'
      await vue.nextTick()
      jest.advanceTimersByTime(100)
      await vue.nextTick()
      expect(root.value).toBe('updated')
      expect(field.value).toBe('updated')
      expect(node.value).toBe(root)
      expect(initialized).toHaveBeenCalledTimes(1)
    } finally {
      initialized.mockRestore()
    }
  })

  test.each([false, true])(
    'Textarea 搜索、禁用分支切换后保持响应式与事件，禁用修复=%s',
    async (fixDisabled) => {
      jest.useFakeTimers()
      fixDisabledColor = fixDisabled
      const props = vue.reactive({
        confirmType: 'search',
        disabled: false,
        value: 'initial',
      })
      const update = jest.fn()
      const confirm = jest.fn()
      const change = jest.fn()
      const { host } = mount(() =>
        vue.createComponent(inputs.textarea, {
          confirmType: () => props.confirmType,
          disabled: () => props.disabled,
          modelValue: () => props.value,
          'onUpdate:modelValue': () => update,
          onConfirm: () => confirm,
          onChange: () => change,
        })
      )
      const root = host.querySelector('div[uni-textarea]') as any
      const descriptor = Object.getOwnPropertyDescriptor(root, 'value')
      for (let i = 0; i < 4; i++) {
        props.confirmType = i % 2 ? 'search' : 'done'
        props.disabled = true
        await vue.nextTick()
        let field = root.querySelector('textarea')
        expect(fixDisabled ? field.readOnly : field.disabled).toBe(true)
        props.disabled = false
        props.value = 'value-' + i
        await vue.nextTick()
        jest.advanceTimersByTime(100)
        await vue.nextTick()
        field = root.querySelector('textarea')
        expect(root.querySelectorAll('textarea')).toHaveLength(1)
        expect(field.value).toBe(props.value)
        expect(root.value).toBe(props.value)
        expect(Object.getOwnPropertyDescriptor(root, 'value')).toEqual(
          descriptor
        )
        root.focus()
        expect(document.activeElement).toBe(field)
        update.mockClear()
        field.value = 'typed-' + i
        field.dispatchEvent(new dom.window.Event('input', { bubbles: true }))
        await vue.nextTick()
        expect(update).toHaveBeenCalledTimes(1)
        expect(root.value).toBe(field.value)
        field.dispatchEvent(new dom.window.Event('change', { bubbles: true }))
        expect(change.mock.calls[i][0].detail.value).toBe(field.value)
        field.dispatchEvent(
          new dom.window.KeyboardEvent('keyup', { key: 'Enter', bubbles: true })
        )
        expect(confirm.mock.calls[i][0].detail.value).toBe(field.value)
        const form = root.querySelector('form')
        if (form) {
          const event = new dom.window.Event('submit', { cancelable: true })
          form.dispatchEvent(event)
          expect(event.defaultPrevented).toBe(true)
        }
      }
    }
  )

  test('Textarea 自动高度、行数与多行测量内容保持同步', async () => {
    jest.useFakeTimers()
    const props = vue.reactive({ autoHeight: false, value: 'first\n\nlast' })
    const linechange = jest.fn()
    const { host } = mount(() =>
      vue.createComponent(inputs.textarea, {
        autoHeight: () => props.autoHeight,
        value: () => props.value,
        onLinechange: () => linechange,
      })
    )
    const root = host.querySelector('div[uni-textarea]') as HTMLElement
    root.style.lineHeight = '20px'
    const wrapper = root.querySelector('.uni-textarea-wrapper') as HTMLElement
    const compute = root.querySelector('.uni-textarea-compute')!
    const lines = () =>
      Array.from(compute.children)
        .filter((el) => el.tagName === 'DIV')
        .map((el) => el.textContent)
    expect(lines()).toEqual(['first', '.', 'last'])
    resizeTextarea(60)
    await vue.nextTick()
    expect(linechange.mock.calls[0][0].detail).toEqual({
      height: 60,
      heightRpx: (750 / window.innerWidth) * 60,
      lineCount: 3,
    })
    expect(wrapper.style.height).toBe('')
    props.autoHeight = true
    await vue.nextTick()
    expect(root.getAttribute('auto-height')).toBe('true')
    expect(wrapper.style.height).toBe('60px')
    expect(compute.classList.contains('uni-textarea-compute-auto-height')).toBe(
      true
    )
    expect(root.querySelector('textarea')!.style.overflowY).toBe('hidden')
    props.value = 'changed\nlast'
    await vue.nextTick()
    jest.advanceTimersByTime(100)
    await vue.nextTick()
    expect(lines()).toEqual(['changed', 'last'])
    // line-height 为 normal 时继续使用测量节点的高度。
    root.style.lineHeight = 'normal'
    Object.defineProperty(
      root.querySelector('.uni-textarea-line'),
      'offsetHeight',
      { value: 20 }
    )
    resizeTextarea(40)
    await vue.nextTick()
    expect(wrapper.style.height).toBe('40px')
    expect(linechange.mock.calls[1][0].detail.lineCount).toBe(2)
    props.autoHeight = false
    await vue.nextTick()
    expect(root.getAttribute('auto-height')).toBe('false')
    expect(wrapper.style.height).toBe('')
    expect(root.querySelector('textarea')!.style.overflowY).toBe('auto')
  })

  test('编译后的 Button 对接提交/重置，Label 点击不递归或重复提交', async () => {
    const form = { submit: jest.fn(), reset: jest.fn() }
    const label = createLabel()
    const children = label.children as any[]
    const props = vue.reactive({ id: '', formType: 'submit', disabled: false })
    const { app, host } = mount(
      () =>
        vue.createComponent(Button, {
          id: () => props.id,
          formType: () => props.formType,
          disabled: () => props.disabled,
        }),
      form,
      label.ctx
    )
    const button = host.querySelector('uni-button') as HTMLElement
    const initialId = children[0].id
    expect(initialId).toMatch(/^__uni_vapor_button_/)
    host.addEventListener('click', label.handleTap)
    button.click()
    expect(form.submit).toHaveBeenCalledTimes(1)
    host.click()
    expect(form.submit).toHaveBeenCalledTimes(2)
    props.id = 'named'
    props.formType = 'reset'
    await vue.nextTick()
    expect(children.map((child) => child.id)).toEqual(['named'])
    host.click()
    expect(form.reset).toHaveBeenCalledTimes(1)
    props.disabled = true
    await vue.nextTick()
    expect(children[0].getDisabled()).toBe(true)
    host.click()
    button.click()
    expect(form.reset).toHaveBeenCalledTimes(1)
    props.id = ''
    await vue.nextTick()
    expect(children.map((child) => child.id)).toEqual([initialId])
    app.unmount()
    apps.pop()
    expect(children).toHaveLength(0)
  })

  test.each(['checkbox', 'radio', 'switch'])(
    'Label 选中 %s 时，Button 点击不激活其他控件且正常冒泡',
    (name) => {
      const label = createLabel()
      const activate = jest.fn()
      label.ctx.register({ id: name, activate, getDisabled: () => false })
      const form = { submit: jest.fn(), reset: jest.fn() }
      const { host } = mount(
        () => vue.createComponent(Button, { formType: () => 'submit' }),
        form,
        label.ctx
      )
      host.addEventListener('click', label.handleTap)
      const bubbled = jest.fn()
      host.addEventListener('click', bubbled)
      const button = host.querySelector('uni-button') as HTMLElement
      button.className = 'button-hover'
      const inner = document.createElement('span')
      inner.className = 'custom-child'
      button.appendChild(inner)
      for (const targetId of ['', name]) {
        label.props.for = targetId
        activate.mockClear()
        form.submit.mockClear()
        bubbled.mockClear()
        button.click()
        inner.click()
        expect(form.submit).toHaveBeenCalledTimes(2)
        expect(bubbled).toHaveBeenCalledTimes(2)
        expect(activate).not.toHaveBeenCalled()
        // 文本节点作为事件目标时也应识别所属 Button。
        const text = inner.appendChild(document.createTextNode('提交'))
        label.handleTap({ target: text })
        expect(activate).not.toHaveBeenCalled()
        host.click()
        expect(activate).toHaveBeenCalledTimes(1)
      }
    }
  )

  test.each(['checkbox', 'radio', 'switch'])(
    'Button 与 %s 按挂载顺序注册，默认目标及 for 匹配正确',
    (name) => {
      for (const buttonFirst of [false, true]) {
        const label = createLabel()
        const activate = jest.fn()
        const form = { submit: jest.fn(), reset: jest.fn() }
        const Control = vue.defineVaporComponent({
          setup() {
            // 与新 Checkbox/Radio/Switch 一致，在 mounted 时注册。
            vue.onMounted(() => {
              label.ctx.register({
                id: name,
                activate,
                getDisabled: () => false,
              })
            })
            vue.onUnmounted(() => label.ctx.unregister(name))
            return document.createElement('span')
          },
        })
        const { app, host } = mount(
          () =>
            (buttonFirst ? [Button, Control] : [Control, Button]).map((comp) =>
              vue.createComponent(comp, {
                id: () => 'button',
                formType: () => 'submit',
              })
            ),
          form,
          label.ctx
        )
        expect(label.children.map((child: any) => child.id)).toEqual(
          buttonFirst ? ['button', name] : [name, 'button']
        )
        host.addEventListener('click', label.handleTap)
        host.click()
        expect(form.submit).toHaveBeenCalledTimes(buttonFirst ? 1 : 0)
        expect(activate).toHaveBeenCalledTimes(buttonFirst ? 0 : 1)
        for (const targetId of [name, 'button']) {
          label.props.for = targetId
          form.submit.mockClear()
          activate.mockClear()
          host.click()
          expect(form.submit).toHaveBeenCalledTimes(
            targetId === 'button' ? 1 : 0
          )
          expect(activate).toHaveBeenCalledTimes(targetId === name ? 1 : 0)
        }
        app.unmount()
        apps.pop()
        expect(label.children).toHaveLength(0)
      }
    }
  )

  test('Label 识别新 Button 根类，内部点击正常冒泡且不联动', () => {
    const label = createLabel()
    const activate = jest.fn()
    label.ctx.register({ id: 'checkbox', activate, getDisabled: () => false })
    label.props.for = 'checkbox'
    const host = document.createElement('div')
    // 新 UVue Button 在 Web 使用带 uni-button 类的 view 根节点。
    host.innerHTML =
      '<div uni-view class="uni-button"><span>提交</span><svg><path /></svg></div>'
    host.addEventListener('click', label.handleTap)
    const bubbled = jest.fn()
    host.addEventListener('click', bubbled)
    const button = host.firstElementChild as HTMLElement
    const targets = [
      button,
      ...Array.from(button.querySelectorAll('*')),
      button.querySelector('span')!.firstChild!,
    ]
    for (const target of targets) {
      target.dispatchEvent(
        new dom.window.MouseEvent('click', { bubbles: true })
      )
    }
    expect(bubbled).toHaveBeenCalledTimes(targets.length)
    expect(activate).not.toHaveBeenCalled()
    button.className = 'uni-button-other'
    button.click()
    expect(activate).toHaveBeenCalledTimes(1)
  })

  test('多 Button 的点击不串联，改名不改变默认顺序，并按最新 id 匹配和清理', async () => {
    const form = { submit: jest.fn(), reset: jest.fn() }
    const label = createLabel()
    const register = jest.spyOn(label.ctx, 'register')
    const first = vue.reactive({ id: 'first' })
    const { app, host } = mount(
      () => [
        vue.createComponent(Button, {
          id: () => first.id,
          formType: () => 'submit',
        }),
        vue.createComponent(Button, {
          id: () => 'second',
          formType: () => 'reset',
        }),
      ],
      form,
      label.ctx
    )
    host.addEventListener('click', label.handleTap)
    const buttons = host.querySelectorAll<HTMLElement>('uni-button')
    const inner = document.createElement('span')
    buttons[1].appendChild(inner)
    buttons[1].click()
    inner.click()
    expect(form.reset).toHaveBeenCalledTimes(2)
    expect(form.submit).not.toHaveBeenCalled()

    first.id = 'renamed'
    await vue.nextTick()
    expect(label.children.map((child: any) => child.id)).toEqual([
      'renamed',
      'second',
    ])
    expect(register).toHaveBeenCalledTimes(2)
    host.click()
    expect(form.submit).toHaveBeenCalledTimes(1)
    expect(form.reset).toHaveBeenCalledTimes(2)

    label.props.for = 'second'
    host.click()
    expect(form.reset).toHaveBeenCalledTimes(3)
    buttons[0].click()
    expect(form.submit).toHaveBeenCalledTimes(2)
    expect(form.reset).toHaveBeenCalledTimes(3)
    label.props.for = 'renamed'
    host.click()
    expect(form.submit).toHaveBeenCalledTimes(3)
    label.props.disabled = true
    host.click()
    expect(form.submit).toHaveBeenCalledTimes(3)
    app.unmount()
    apps.pop()
    expect(label.children).toHaveLength(0)
  })

  test('Input 非 Vapor 保留旧根节点、Custom Element 和 mounted 属性绑定', async () => {
    const vdom = await preprocess('vue/input/index.tsx', false)
    expect(vdom).toContain('class UniInputElement extends UniElement')
    expect(vdom).toContain('<uni-input ref={rootRef}>')
    expect(vdom).toContain('rootElement.attachVmProps(props)')
    expect(vdom).toContain("Object.defineProperty(rootElement, 'value'")
    expect(vdom).not.toMatch(
      /element-vapor|initInputElement|native: true|uni-view/
    )
    const helper = await preprocess('helpers/component.ts', false)
    expect(helper).toContain('customElements.define(')
    expect(helper).not.toContain('rootElement.native')
  })

  test('Textarea 非 Vapor 保留旧根节点、状态 getter 和 mounted 属性绑定', async () => {
    const vdom = await preprocess('vue/textarea/index.tsx', false)
    expect(vdom).toContain('class UniTextareaElement extends UniElement')
    expect(vdom).toContain('<uni-textarea ref={rootRef}')
    expect(vdom).toContain('rootElement.attachVmProps(props)')
    expect(vdom).toContain('return state.value')
    expect(vdom).not.toMatch(
      /element-vapor|initTextareaElement|native: true|uni-view/
    )
  })

  test.each(['helpers/useField.ts', 'vue/button/index.tsx'])(
    '%s 按模式隔离新旧协议',
    async (file) => {
      const vapor = await preprocess(file, true)
      const vdom = await preprocess(file, false)
      expect(vapor).toContain('form-vapor')
      expect(vapor).not.toMatch(
        /uniFormKey|uniLabelKey|from ['"].*useFormField|from ['"]\.\.\/form|from ['"]\.\.\/label/
      )
      expect(vdom).not.toMatch(/form-vapor|useVaporFormField|useVaporButton/)
      expect(vdom).toContain(
        file.includes('button') ? 'uniFormKey' : "useFormField('name', state)"
      )
    }
  )
})
