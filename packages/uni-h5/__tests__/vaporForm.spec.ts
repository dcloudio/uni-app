import fs from 'fs'
import path from 'path'
import { createRequire } from 'module'
import { execFileSync } from 'child_process'
import jscc from 'rollup-plugin-jscc'
import ts from 'typescript'

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
          input: await preprocess(`vue/${name}/index.tsx`, true),
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
    const shared = jest.requireActual('@vue/shared')
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
    for (const name of ['input', 'textarea']) {
      inputs[name] = evaluate(await compile(name), {
        vue,
        '@vue/shared': shared,
        '@dcloudio/uni-shared': { LINEFEED: '\n' },
        '/vue-jsx/vapor': evaluate(fs.readFileSync(runtime, 'utf8'), { vue }),
        '../../helpers/component': { defineBuiltInComponent: defineComponent },
        '../../helpers/UniElement': { UniElement },
        '../../helpers/useField': fields,
        './utils': { resolveDigitDecimalPoint() {} },
        '../resize-sensor/index': {
          default: vue.defineVaporComponent({
            setup: () => document.createElement('uni-resize-sensor'),
          }),
        },
      }).default
      dom.window.customElements.define(
        `uni-${name}`,
        class extends UniElement {}
      )
    }
  }, 30000)

  afterEach(() => {
    apps.splice(0).forEach((app) => app.unmount())
    document.body.innerHTML = ''
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
        '../common.uts': { LABEL_KEY: 'UNI_LABEL_CTX' },
        './global.uts': { UniLabelElement: class {} },
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
      expect(host.querySelectorAll(`uni-${name}`)).toHaveLength(1)
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
