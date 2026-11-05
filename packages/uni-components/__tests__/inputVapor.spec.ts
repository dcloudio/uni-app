import fs from 'fs'
import path from 'path'
import { execFileSync } from 'child_process'
import ts from 'typescript'

jest.mock('@vue/shared', () =>
  jest.requireActual(
    '../../uni-cli-shared/lib/dom2/web/@vue/shared/dist/shared.cjs.js'
  )
)

jest.mock('@dcloudio/uni-core', () => ({
  getCurrentPageId: () => 1,
  registerViewMethod: jest.fn(),
  createNativeEvent: (event: Event) => event,
}))
jest.mock('../src/helpers/useFormField', () => ({ useFormField: jest.fn() }))

// 使用项目实际 JSX Vapor 编译器和 runtime，覆盖节点、props、事件及 refs 的联动。
describe('Web Vapor 单节点 Input', () => {
  let dom: any
  let vue: any
  let Input: any
  let elements: any
  let InputElement: any
  const previous = new Map<string, unknown>()
  const apps: any[] = []
  let insertRule: jest.SpyInstance

  beforeAll(() => {
    const { JSDOM, VirtualConsole } = jest.requireActual('jsdom')
    const virtualConsole = new VirtualConsole()
    virtualConsole.on('jsdomError', (error: any) => {
      // JSDOM 尚不支持合法的 @layer；实际层叠和渲染由 Chrome 验证。
      if (
        error.type === 'css parsing' &&
        String(error.detail).includes('@layer')
      )
        return
      throw error
    })
    dom = new JSDOM('<!doctype html><body></body>', {
      pretendToBeVisual: true,
      virtualConsole,
    })
    dom.window.HTMLElement.prototype.scrollTo = jest.fn()
    dom.window.scrollTo = jest.fn()
    // JSDOM 没有 CSSLayerBlockRule；使用相同的分组规则 API 验证增量更新，
    // 实际 @layer 层叠与伪元素渲染另由浏览器验证。
    const sheetPrototype = dom.window.CSSStyleSheet.prototype as CSSStyleSheet
    const originalInsert = sheetPrototype.insertRule
    insertRule = jest
      .spyOn(sheetPrototype, 'insertRule')
      .mockImplementation(function (
        this: CSSStyleSheet,
        rule: string,
        index?: number
      ) {
        const inserted = originalInsert.call(
          this,
          rule.replace(/^@layer [^{]+/, '@media all'),
          index
        )
        if (rule.startsWith('@layer ')) {
          const group = this.cssRules[inserted] as CSSGroupingRule
          group.insertRule = (value, position) =>
            originalInsert.call(
              group as unknown as CSSStyleSheet,
              value,
              position
            )
        }
        return inserted
      })
    for (const key of [
      'window',
      'document',
      'navigator',
      'Node',
      'Element',
      'HTMLElement',
      'SVGElement',
      'Text',
      'Comment',
      'ShadowRoot',
      'customElements',
      'getComputedStyle',
      'requestAnimationFrame',
      'cancelAnimationFrame',
      'CSS',
      '__X__',
      '__NODE_JS__',
      '__PLATFORM__',
    ]) {
      previous.set(key, (global as any)[key])
      ;(global as any)[key] =
        key === '__X__'
          ? true
          : key === '__NODE_JS__'
          ? false
          : key === '__PLATFORM__'
          ? 'h5'
          : key === 'CSS'
          ? { supports: () => false }
          : dom.window[key]
    }
    // JSDOM 不计算伪元素。这里只模拟探测伪元素的计算结果，以验证调度和清理。
    const computed = dom.window.getComputedStyle.bind(dom.window)
    global.getComputedStyle = ((field: Element, pseudo?: string) => {
      if (pseudo === '::before') {
        if (field.getAttribute('data-uni-selection-class') === 'selected')
          return computed(field)
        return {
          backgroundColor:
            (field as HTMLElement).style.getPropertyValue(
              '--uni-input-selection-probe-background'
            ) || 'rgba(0, 0, 0, 0)',
        }
      }
      return computed(field, pseudo)
    }) as typeof getComputedStyle
    vue = jest.requireActual('../../uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js')
    jest.doMock('vue', () => vue)
    const source = fs.readFileSync(
      path.resolve(__dirname, '../src/helpers/UniElement-vapor.ts'),
      'utf8'
    )
    const elementModule = { exports: {} as any }
    new Function(
      'require',
      'module',
      'exports',
      ts.transpileModule(source, {
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          target: ts.ScriptTarget.ES2020,
        },
      }).outputText
    )(jest.requireActual, elementModule, elementModule.exports)
    jest.doMock('../src/helpers/UniElement', () => elementModule.exports)
    elements = jest.requireActual('../src/vue/web-vapor-elements')
    elements.installWebVaporElements(dom.window)
    InputElement = jest.requireActual(
      '../src/vue/input/element-vapor'
    ).UniInputElement
    const file = path.resolve(__dirname, '../src/vue/input/index-vapor.tsx')
    const code = execFileSync(
      process.execPath,
      [
        '--input-type=module',
        '-e',
        `
      import {createRequire} from 'node:module';
      import fs from 'node:fs';
      const req=createRequire(import.meta.url);
      const {default:factory}=await import(req.resolve('vue-jsx/vite',{paths:['./packages/uni-h5']}));
      const plugin=factory({vapor:true});
      const file=process.argv[1];
      const result=await plugin.transform.handler.call({},fs.readFileSync(file,'utf8'),file);
      process.stdout.write(result.code);
    `,
        file,
      ],
      { cwd: path.resolve(__dirname, '../../..'), encoding: 'utf8' }
    )
    const compiled = ts.transpileModule(code, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
      },
    }).outputText
    const module = { exports: {} as any }
    const imports: Record<string, unknown> = {
      vue,
      '@dcloudio/uni-shared': jest.requireActual('@dcloudio/uni-shared'),
      '../../helpers/component': {
        defineBuiltInComponent: (options: any) =>
          vue.defineVaporComponent(
            Object.assign(options, { __reserved: true })
          ),
      },
      '../../helpers/useInputStyles': jest.requireActual(
        '../src/helpers/useInputStyles'
      ),
      './element-vapor': { UniInputElement: InputElement },
      './useInput': jest.requireActual('../src/vue/input/useInput'),
    }
    new Function('require', 'module', 'exports', compiled)(
      (key: string) => {
        if (!(key in imports)) throw new Error('缺少测试依赖：' + key)
        return imports[key]
      },
      module,
      module.exports
    )
    Input = module.exports.default
  })

  afterEach(() => {
    apps.splice(0).forEach((app) => app.unmount())
    document.body.innerHTML = ''
    expect(document.head.querySelector('[data-uni-input-styles]')).toBeNull()
  })
  afterAll(() => {
    insertRule.mockRestore()
    dom.window.close()
    previous.forEach((value, key) => {
      if (value === undefined) delete (global as any)[key]
      else (global as any)[key] = value
    })
  })

  async function mount(overrides: Record<string, unknown> = {}) {
    const props = vue.reactive(
      Object.assign(
        { id: 'native-input', value: 'hello', placeholder: '请输入' },
        overrides
      )
    )
    const events = {
      input: jest.fn(),
      change: jest.fn(),
      focus: jest.fn(),
      blur: jest.fn(),
      confirm: jest.fn(),
      update: jest.fn(),
      focusUpdate: jest.fn(),
    }
    const registerField = jest.fn()
    const host = document.createElement('uni-page-body')
    document.body.appendChild(host)
    const app = vue.createVaporApp(
      vue.defineVaporComponent({
        __scopeId: 'data-v-owner',
        setup() {
          vue.provide('UNI_FORM_CTX', {
            registerField,
            unregisterField: jest.fn(),
          })
          return vue.createComponent(Input, {
            $: [
              () =>
                Object.assign({}, props, {
                  onInput: events.input,
                  onChange: events.change,
                  onFocus: events.focus,
                  onBlur: events.blur,
                  onConfirm: events.confirm,
                  'onUpdate:modelValue': events.update,
                  'onUpdate:focus': events.focusUpdate,
                }),
            ],
          })
        },
      })
    )
    apps.push(app)
    app.mount(host)
    await vue.nextTick()
    return {
      props,
      events,
      registerField,
      host,
      field: host.firstElementChild as HTMLInputElement,
    }
  }

  const styleText = () => {
    const element = document.head.querySelector<HTMLStyleElement>(
      '[data-uni-input-styles]'
    )
    const serialize = (rules: CSSRuleList): string =>
      Array.from(rules, (rule: any) => {
        if (rule.cssRules) return serialize(rule.cssRules)
        if (!rule.style.length) return ''
        return rule.cssText
          .replace(/:\s+/g, ':')
          .replace(/\s+!important/g, '!important')
          .replace(/;\s+/g, ';')
      }).join('')
    return element?.sheet ? serialize(element.sheet.cssRules) : ''
  }

  test('只生成原生 input，公开类型、value、focus/blur 及 scoped 可用', async () => {
    const { field, host, events } = await mount()
    expect(host.children).toHaveLength(1)
    expect(field.tagName).toBe('INPUT')
    expect(field.children).toHaveLength(0)
    expect(field).toBeInstanceOf(InputElement)
    expect(field).not.toBeInstanceOf(elements.UniViewElement)
    expect(field.hasAttribute('data-v-owner')).toBe(true)
    expect((field as any).uniTagName).toBe('INPUT')
    expect(typeof (field as any).getPage).toBe('function')
    expect(field.value).toBe('hello')
    field.value = 'DOM'
    expect(field.value).toBe('DOM')
    field.focus()
    expect(document.activeElement).toBe(field)
    expect(events.focus).toHaveBeenCalledTimes(1)
    field.blur()
    expect(events.blur).toHaveBeenCalledTimes(1)
    expect(events.blur.mock.calls[0][0].target).toBe(field)
  })

  test('占位文本独立更新，不重写 value 或重建占位样式', async () => {
    const { field, props, events } = await mount({
      placeholder: 'initial',
      placeholderStyle: 'color:red',
    })
    const write = jest.spyOn(field, 'setAttribute')
    const listen = jest.spyOn(field, 'addEventListener')
    const styleWrite = jest.spyOn(
      dom.window.Node.prototype,
      'textContent',
      'set'
    )
    try {
      props.placeholder = 'updated'
      await vue.nextTick()
      expect(field.placeholder).toBe('updated')
      expect(field.value).toBe('hello')
      expect(write.mock.calls.every(([name]) => name === 'placeholder')).toBe(
        true
      )
      expect(styleWrite).not.toHaveBeenCalled()
      expect(listen).not.toHaveBeenCalled()
      props.disabled = true
      props.password = true
      await vue.nextTick()
      expect(field.placeholder).toBe('updated')
      expect(field.type).toBe('password')
      props.placeholder = null
      await vue.nextTick()
      expect(field.placeholder).toBe('')
      expect(field.hasAttribute('placeholder')).toBe(false)
      props.placeholder = 'restored'
      await vue.nextTick()
      props.placeholderClass = 'other'
      await vue.nextTick()
      expect(field.placeholder).toBe('restored')
      expect(listen).not.toHaveBeenCalled()
      props.disabled = false
      await vue.nextTick()
      field.value = 'typed'
      field.dispatchEvent(new dom.window.InputEvent('input', { bubbles: true }))
      await vue.nextTick()
      expect(events.input).toHaveBeenCalledTimes(1)
    } finally {
      write.mockRestore()
      listen.mockRestore()
      styleWrite.mockRestore()
    }
  })

  test('占位样式使用生成的 class，变更和清空不影响业务 class', async () => {
    const { field, host, props } = await mount({
      class: 'business',
      placeholderStyle: 'color:red',
    })
    const key = field.getAttribute('data-uni-placeholder-style')!
    const firstClass = `uni-input-style-${key}`
    expect(field.classList.contains(firstClass)).toBe(true)
    expect(field.classList.contains('business')).toBe(true)
    expect(styleText()).toContain(`.${firstClass}::placeholder`)
    expect(styleText()).not.toContain('[data-uni-placeholder-style=')
    expect(document.querySelector(`input.${firstClass}`)).toBe(field)
    props.placeholderStyle = 'color:blue!important'
    props.class = 'another-business'
    await vue.nextTick()
    const nextKey = field.getAttribute('data-uni-placeholder-style')!
    const nextClass = `uni-input-style-${nextKey}`
    expect(nextClass).not.toBe(firstClass)
    expect(field.classList.contains(firstClass)).toBe(false)
    expect(field.classList.contains(nextClass)).toBe(true)
    expect(field.classList.contains('another-business')).toBe(true)
    expect(styleText()).toContain(`.${nextClass}::placeholder`)
    expect(styleText()).toContain('color:blue!important;')
    expect(styleText()).not.toContain(firstClass)
    expect(host.firstElementChild).toBe(field)
    props.placeholderStyle = null
    await vue.nextTick()
    expect(field.classList.contains(nextClass)).toBe(false)
    expect(field.classList.contains('uni-input-input')).toBe(true)
    expect(field.classList.contains('another-business')).toBe(true)
    expect(styleText()).toBe('')
  })

  test('动态 disabled、password、search 和样式不替换根节点', async () => {
    const { field, host, props } = await mount({
      placeholderClass: 'hint',
      placeholderStyle: 'color:red;font-size:20px',
      selectionClass: 'selected',
    })
    expect(field.getAttribute('data-uni-placeholder-class')).toBe('hint')
    expect(field.getAttribute('data-uni-selection-class')).toBe('selected')
    expect(field.classList.contains('hint')).toBe(false)
    expect(styleText()).toContain('color:red;font-size:20px;')
    props.disabled = true
    await vue.nextTick()
    expect(field.disabled).toBe(true)
    props.disabled = false
    props.password = true
    await vue.nextTick()
    expect(field.type).toBe('password')
    props.password = false
    props.confirmType = 'search'
    props.placeholderClass = 'other'
    props.placeholderStyle = ''
    await vue.nextTick()
    expect(field.type).toBe('search')
    expect(host.firstElementChild).toBe(field)
    expect(host.querySelector('form')).toBeNull()
    expect(field.getAttribute('data-uni-placeholder-class')).toBe('other')
    expect(field.hasAttribute('data-uni-placeholder-style')).toBe(false)
    expect(styleText()).toBe('')
  })

  test('输入与 change 只派发一次，表单同步、重置和 confirm 保持可用', async () => {
    const { field, events, registerField } = await mount({ name: 'message' })
    expect(registerField).toHaveBeenCalledTimes(1)
    field.value = 'changed'
    field.dispatchEvent(
      new dom.window.InputEvent('input', { bubbles: true, data: 'd' })
    )
    await vue.nextTick()
    expect(events.input).toHaveBeenCalledTimes(1)
    expect(events.update).toHaveBeenCalledWith('changed')
    expect(events.input.mock.calls[0][0].detail.value).toBe('changed')
    expect(events.input.mock.calls[0][0].target).toBe(field)
    expect(registerField.mock.calls[0][0].getValue()).toBe('changed')
    field.dispatchEvent(new dom.window.Event('change', { bubbles: true }))
    expect(events.change).toHaveBeenCalledTimes(1)
    expect(events.change.mock.calls[0][0].detail.value).toBe('changed')
    field.dispatchEvent(
      new dom.window.KeyboardEvent('keyup', { key: 'Enter', bubbles: true })
    )
    expect(events.confirm).toHaveBeenCalledTimes(1)
    registerField.mock.calls[0][0].reset()
    await vue.nextTick()
    expect(field.value).toBe('hello')
  })

  test('数字输入限制粘贴长度和 maxlength=0，默认无限长', async () => {
    const { field, props, events } = await mount({
      type: 'number',
      maxlength: 3,
      value: '',
    })
    field.value = '12345'
    field.dispatchEvent(
      new dom.window.InputEvent('input', {
        bubbles: true,
        inputType: 'insertFromPaste',
      })
    )
    await vue.nextTick()
    expect(field.value).toBe('123')
    expect(events.input.mock.calls[0][0].detail.value).toBe('123')
    props.maxlength = 0
    await vue.nextTick()
    field.value = '1'
    field.dispatchEvent(new dom.window.InputEvent('input', { bubbles: true }))
    await vue.nextTick()
    expect(field.value).toBe('')
    props.maxlength = -1
    await vue.nextTick()
    expect(field.hasAttribute('maxlength')).toBe(false)
  })
  test('中文输入法合成期间不确认，光标和选区仍作用于原生节点', async () => {
    const { field, props, events } = await mount({ focus: true, cursor: 2 })
    await vue.nextTick()
    expect(document.activeElement).toBe(field)
    expect(field.selectionStart).toBe(2)
    props.selectionStart = 1
    props.selectionEnd = 4
    await vue.nextTick()
    expect(field.selectionStart).toBe(1)
    expect(field.selectionEnd).toBe(4)
    field.dispatchEvent(new dom.window.CompositionEvent('compositionstart'))
    field.value = '中文'
    field.dispatchEvent(
      new dom.window.InputEvent('input', { bubbles: true, isComposing: true })
    )
    field.dispatchEvent(new dom.window.KeyboardEvent('keyup', { key: 'Enter' }))
    expect(events.input).not.toHaveBeenCalled()
    expect(events.confirm).not.toHaveBeenCalled()
    field.dispatchEvent(new dom.window.CompositionEvent('compositionend'))
    await vue.nextTick()
    expect(events.input).toHaveBeenCalledTimes(1)
    expect(events.input.mock.calls[0][0].detail.value).toBe('中文')
  })

  test('选区背景继承只更新宿主变量，清空类名清理且不创建探测节点', async () => {
    const { field, props, host } = await mount({ selectionClass: 'selected' })
    field.style.backgroundColor = 'blue'
    field.focus()
    expect(
      field.style.getPropertyValue('--uni-input-selection-background')
    ).toBe('blue')
    props.selectionClass = ''
    await vue.nextTick()
    expect(
      field.style.getPropertyValue('--uni-input-selection-background')
    ).toBe('')
    expect(host.querySelectorAll('*')).toHaveLength(1)
  })

  test('选区探测只写入背景变量，清空后恢复原生选区且保留文字颜色', async () => {
    const original = global.getComputedStyle
    const read = jest
      .spyOn(global, 'getComputedStyle')
      .mockImplementation((field, pseudo) => {
        if (pseudo === '::before')
          return { backgroundColor: 'rgb(255, 0, 0)' } as CSSStyleDeclaration
        return original(field, pseudo)
      })
    try {
      const { field, props } = await mount({
        selectionClass: 'current',
        style: 'color:black',
      })
      expect(
        field.style.getPropertyValue('--uni-input-selection-background')
      ).toBe('rgb(255, 0, 0)')
      expect(field.hasAttribute('data-uni-input-selection')).toBe(true)
      expect(field.style.color).toBe('black')
      expect(field.children.length).toBe(0)
      props.selectionClass = ''
      await vue.nextTick()
      expect(field.hasAttribute('data-uni-input-selection')).toBe(false)
      expect(
        field.style.getPropertyValue('--uni-input-selection-background')
      ).toBe('')
      expect(field.style.color).toBe('black')
    } finally {
      read.mockRestore()
    }
  })

  test('未匹配背景声明时保留默认选区，显式透明仍能生效', async () => {
    const original = global.getComputedStyle
    let explicit = false
    const read = jest
      .spyOn(global, 'getComputedStyle')
      .mockImplementation((field, pseudo) => {
        if (pseudo === '::before')
          return {
            backgroundColor: explicit
              ? 'transparent'
              : (field as HTMLElement).style.getPropertyValue(
                  '--uni-input-selection-probe-background'
                ) || 'transparent',
          } as CSSStyleDeclaration
        return original(field, pseudo)
      })
    try {
      const { field } = await mount({ selectionClass: 'transparent' })
      expect(field.hasAttribute('data-uni-input-selection')).toBe(false)
      explicit = true
      field.focus()
      expect(field.hasAttribute('data-uni-input-selection')).toBe(true)
      expect(
        field.style.getPropertyValue('--uni-input-selection-background')
      ).toBe('transparent')
      expect(
        field.style.getPropertyValue('--uni-input-selection-probe-background')
      ).toBe('')
      field.blur()
    } finally {
      read.mockRestore()
    }
  })

  test('Safari 禁用颜色修复复用同一节点，禁用时不发出 focus/input', async () => {
    const vendor = Object.getOwnPropertyDescriptor(navigator, 'vendor')
    Object.defineProperty(navigator, 'vendor', {
      configurable: true,
      value: 'Apple Computer, Inc.',
    })
    ;(global as any).CSS.supports = () => true
    try {
      const { field, props, events, host } = await mount({ disabled: true })
      expect(field.readOnly).toBe(true)
      expect(field.tabIndex).toBe(-1)
      field.focus()
      expect(document.activeElement).not.toBe(field)
      expect(events.focus).not.toHaveBeenCalled()
      field.dispatchEvent(new dom.window.InputEvent('input'))
      expect(events.input).not.toHaveBeenCalled()
      props.disabled = false
      await vue.nextTick()
      expect(host.firstElementChild).toBe(field)
      expect(field.readOnly).toBe(false)
    } finally {
      if (vendor) Object.defineProperty(navigator, 'vendor', vendor)
      else delete (navigator as any).vendor
      ;(global as any).CSS.supports = () => false
    }
  })

  test('Safari 已聚焦时动态禁用会失焦并同步状态，重新启用后同一节点可聚焦', async () => {
    const vendor = Object.getOwnPropertyDescriptor(navigator, 'vendor')
    Object.defineProperty(navigator, 'vendor', {
      configurable: true,
      value: 'Apple Computer, Inc.',
    })
    ;(global as any).CSS.supports = () => true
    try {
      const { field, props, events, host } = await mount()
      field.focus()
      await vue.nextTick()
      expect(document.activeElement).toBe(field)
      expect(events.focusUpdate).toHaveBeenLastCalledWith(true)

      props.disabled = true
      await vue.nextTick()
      expect(field.readOnly).toBe(true)
      expect(field.disabled).toBe(false)
      expect(document.activeElement).not.toBe(field)
      expect(events.blur).toHaveBeenCalledTimes(1)
      expect(events.blur.mock.calls[0][0].detail.value).toBe('hello')
      expect(events.focusUpdate).toHaveBeenLastCalledWith(false)
      expect(host.firstElementChild).toBe(field)

      props.disabled = false
      await vue.nextTick()
      expect(field.readOnly).toBe(false)
      expect(document.activeElement).not.toBe(field)
      field.focus()
      await vue.nextTick()
      expect(document.activeElement).toBe(field)
      expect(events.focus).toHaveBeenCalledTimes(2)
      expect(events.focusUpdate).toHaveBeenLastCalledWith(true)
      expect(host.firstElementChild).toBe(field)
    } finally {
      if (vendor) Object.defineProperty(navigator, 'vendor', vendor)
      else delete (navigator as any).vendor
      ;(global as any).CSS.supports = () => false
    }
  })

  test.each([false, true])(
    'Safari 动态禁用会提交已有合成输入且不重复同步（compositionend 先于 blur 处理：%s）',
    async (compositionEndFirst) => {
      const vendor = Object.getOwnPropertyDescriptor(navigator, 'vendor')
      Object.defineProperty(navigator, 'vendor', {
        configurable: true,
        value: 'Apple Computer, Inc.',
      })
      ;(global as any).CSS.supports = () => true
      try {
        const { field, props, events } = await mount({ value: '' })
        field.focus()
        field.dispatchEvent(new dom.window.CompositionEvent('compositionstart'))
        field.value = '中文'
        field.dispatchEvent(
          new dom.window.InputEvent('input', {
            bubbles: true,
            data: '中文',
            isComposing: true,
          })
        )
        await vue.nextTick()
        expect(events.input).not.toHaveBeenCalled()
        expect(events.update).not.toHaveBeenCalled()

        if (compositionEndFirst) {
          field.addEventListener(
            'blur',
            () =>
              field.dispatchEvent(
                new dom.window.CompositionEvent('compositionend')
              ),
            { capture: true, once: true }
          )
        }
        props.disabled = true
        await vue.nextTick()
        expect(document.activeElement).not.toBe(field)
        expect(events.update).toHaveBeenCalledTimes(1)
        expect(events.update).toHaveBeenLastCalledWith('中文')
        expect(events.input).toHaveBeenCalledTimes(1)
        expect(events.input.mock.calls[0][0].detail.value).toBe('中文')
        expect(events.blur).toHaveBeenCalledTimes(1)
        expect(events.blur.mock.calls[0][0].detail.value).toBe('中文')
        expect(events.update.mock.invocationCallOrder[0]).toBeLessThan(
          events.blur.mock.invocationCallOrder[0]
        )

        // 延迟到达的结束/输入事件不能再次提交；禁用期间新开始的合成也不能提交。
        field.dispatchEvent(new dom.window.CompositionEvent('compositionend'))
        field.dispatchEvent(
          new dom.window.InputEvent('input', { bubbles: true })
        )
        field.dispatchEvent(new dom.window.CompositionEvent('compositionstart'))
        field.value = '禁用后的输入'
        field.dispatchEvent(
          new dom.window.InputEvent('input', {
            bubbles: true,
            isComposing: true,
          })
        )
        field.dispatchEvent(new dom.window.CompositionEvent('compositionend'))
        await vue.nextTick()
        expect(events.update).toHaveBeenCalledTimes(1)
        expect(events.input).toHaveBeenCalledTimes(1)
      } finally {
        if (vendor) Object.defineProperty(navigator, 'vendor', vendor)
        else delete (navigator as any).vendor
        ;(global as any).CSS.supports = () => false
      }
    }
  )

  test('placeholder-style 的 important 与局部变量不泄漏到 input', async () => {
    const { field } = await mount({
      placeholderStyle: '--HintColor:red; color:var(--HintColor)!important',
    })
    expect(styleText()).toContain('--HintColor:red;')
    expect(styleText()).toContain('color:var(--HintColor)!important;')
    expect(field.style.getPropertyValue('--HintColor')).toBe('')
    expect(field.hasAttribute('data-uni-placeholder-style')).toBe(true)
  })

  test('placeholder-style 空值支持初始挂载和动态清空', async () => {
    const { field, props } = await mount({ placeholderStyle: null })
    expect(field.hasAttribute('data-uni-placeholder-style')).toBe(false)
    expect(styleText()).toBe('')
    props.placeholderStyle = 'color:blue'
    await vue.nextTick()
    expect(styleText()).toContain('color:blue')
    props.placeholderStyle = null
    await vue.nextTick()
    expect(field.hasAttribute('data-uni-placeholder-style')).toBe(false)
    expect(styleText()).toBe('')
    props.placeholderStyle = undefined
    await vue.nextTick()
    expect(field.hasAttribute('data-uni-placeholder-style')).toBe(false)
    expect(styleText()).toBe('')
  })

  test('批量组件在 mounted 和 mount 返回时已有占位规则，后续不重复插入', async () => {
    const host = document.createElement('div')
    document.body.append(host)
    const mounted: boolean[] = []
    insertRule.mockClear()
    const write = jest.spyOn(dom.window.Node.prototype, 'textContent', 'set')
    const styleWrites = () =>
      write.mock.contexts.filter(
        (node) =>
          node.localName === 'style' &&
          node.hasAttribute('data-uni-input-styles')
      ).length
    try {
      const app = vue.createVaporApp(
        vue.defineVaporComponent({
          setup() {
            return Array.from({ length: 100 }, (_, i) => {
              const color = `color:rgb(${i},0,0)`
              return vue.createComponent(
                vue.defineVaporComponent({
                  setup() {
                    vue.onMounted(() => {
                      mounted.push(styleText().includes(color + ';'))
                    })
                    return vue.createComponent(Input, {
                      placeholderStyle: color,
                    })
                  },
                })
              )
            })
          },
        })
      )
      apps.push(app)
      app.mount(host)
      expect(mounted).toHaveLength(100)
      expect(mounted.every(Boolean)).toBe(true)
      expect(styleText().match(/::placeholder/g)).toHaveLength(100)
      expect(styleWrites()).toBe(0)
      expect(insertRule).toHaveBeenCalledTimes(100)
      await vue.nextTick()
      expect(styleWrites()).toBe(0)
      expect(insertRule).toHaveBeenCalledTimes(100)
    } finally {
      write.mockRestore()
    }
  })

  test('原生规则按文档共享和引用计数，相同样式只注册一次，卸载后清理', async () => {
    const first = await mount({
      placeholderStyle: '--tone:initial;color:var(--tone,red)',
    })
    const second = await mount({ placeholderStyle: 'color:var(--tone,red)' })
    const third = await mount({
      placeholderStyle: '--tone:initial;color:var(--tone,red)',
    })
    const key = first.field.getAttribute('data-uni-placeholder-style')!
    expect(third.field.getAttribute('data-uni-placeholder-style')).toBe(key)
    expect(second.field.getAttribute('data-uni-placeholder-style')).not.toBe(
      key
    )
    const styles = document.head.querySelectorAll('[data-uni-input-styles]')
    expect(styles).toHaveLength(1)
    expect(styleText().split(key)).toHaveLength(2)
    expect(styleText()).toContain('--tone:initial;color:var(--tone,red)')
    expect(first.field.style.getPropertyValue('--tone')).toBe('')
    apps.pop()!.unmount()
    expect(styleText()).toContain(key)
    apps.pop()!.unmount()
    expect(styles[0].isConnected).toBe(true)
    apps.pop()!.unmount()
    expect(styles[0].isConnected).toBe(false)
  })

  test('批量增删按需更新 CSSOM，已销毁的任务不会重新插入样式', async () => {
    const { registerInputStyle } = jest.requireActual(
      '../src/helpers/inputStyleSheet'
    )
    const { createInputPlaceholderStyle } = jest.requireActual(
      '@dcloudio/uni-shared'
    )
    const write = jest.spyOn(dom.window.Node.prototype, 'textContent', 'set')
    const cleanups: (() => void)[] = []
    try {
      for (let i = 0; i < 100; i++) {
        cleanups.push(
          registerInputStyle(
            document,
            createInputPlaceholderStyle(`color:rgb(${i},0,0)`)
          )
        )
      }
      expect(write).not.toHaveBeenCalled()
      await vue.nextTick()
      expect(write).not.toHaveBeenCalled()
      expect(styleText().match(/::placeholder/g)).toHaveLength(100)
      for (let i = 0; i < 99; i++) cleanups.pop()!()
      await vue.nextTick()
      expect(write).not.toHaveBeenCalled()
      expect(styleText().match(/::placeholder/g)).toHaveLength(1)
      cleanups.pop()!()

      const remove = registerInputStyle(
        document,
        createInputPlaceholderStyle('color:red')
      )
      remove()
      cleanups.push(
        registerInputStyle(document, createInputPlaceholderStyle('color:blue'))
      )
      await vue.nextTick()
      expect(write).not.toHaveBeenCalled()
      expect(styleText()).toContain('color:blue')
      expect(styleText()).not.toContain('color:red')
      expect(document.querySelectorAll('[data-uni-input-styles]')).toHaveLength(
        1
      )
    } finally {
      cleanups.forEach((cleanup) => cleanup())
      await vue.nextTick()
      write.mockRestore()
    }
  })

  test('单个样式反复更新复用槽位，其余规则身份和内容保持不变', async () => {
    const { registerInputStyle } = jest.requireActual(
      '../src/helpers/inputStyleSheet'
    )
    const { createInputPlaceholderStyle } = jest.requireActual(
      '@dcloudio/uni-shared'
    )
    const cleanups = Array.from({ length: 100 }, (_, i) =>
      registerInputStyle(
        document,
        createInputPlaceholderStyle(`color:rgb(${i},0,0)`)
      )
    )
    await vue.nextTick()
    const element = document.querySelector<HTMLStyleElement>(
      '[data-uni-input-styles]'
    )!
    const sheet = element.sheet!
    const retained = Array.from(sheet.cssRules).slice(1)
    const original = retained.map((rule) => rule.cssText)
    const write = jest.spyOn(dom.window.Node.prototype, 'textContent', 'set')
    insertRule.mockClear()
    try {
      for (let i = 0; i < 20; i++) {
        cleanups[0]()
        cleanups[0] = registerInputStyle(
          document,
          createInputPlaceholderStyle(`color:rgb(${i},200,200)`)
        )
        await vue.nextTick()
        expect(sheet.cssRules.length).toBe(100)
        retained.forEach((rule, index) => {
          expect(sheet.cssRules[index + 1]).toBe(rule)
          expect(rule.cssText).toBe(original[index])
        })
      }
      expect(insertRule).not.toHaveBeenCalled()
      expect(write).not.toHaveBeenCalled()
    } finally {
      write.mockRestore()
      cleanups.forEach((cleanup) => cleanup())
      await vue.nextTick()
    }
  })

  test('普通与 important 规则分别回收，保留分组及引用计数', async () => {
    const { registerInputStyle } = jest.requireActual(
      '../src/helpers/inputStyleSheet'
    )
    const { createInputPlaceholderStyle } = jest.requireActual(
      '@dcloudio/uni-shared'
    )
    const normal = registerInputStyle(
      document,
      createInputPlaceholderStyle('color:blue')
    )
    let remove = registerInputStyle(
      document,
      createInputPlaceholderStyle('color:red!important')
    )
    await vue.nextTick()
    const sheet = document.querySelector<HTMLStyleElement>(
      '[data-uni-input-styles]'
    )!.sheet!
    const group = sheet.cssRules[1] as CSSGroupingRule
    const firstRule = group.cssRules[0]
    try {
      remove()
      remove = registerInputStyle(
        document,
        createInputPlaceholderStyle('color:green!important')
      )
      await vue.nextTick()
      expect(sheet.cssRules.length).toBe(2)
      expect(group.cssRules.length).toBe(1)
      expect(group.cssRules[0]).toBe(firstRule)
      expect(
        (firstRule as CSSStyleRule).style.getPropertyPriority('color')
      ).toBe('important')
      expect((firstRule as CSSStyleRule).style.color).toBe('green')
      expect(styleText()).toContain('color:blue;')
    } finally {
      remove()
      normal()
      await vue.nextTick()
    }
  })

  test('修改外部类名不重建占位规则，也不重启选区背景刷新', async () => {
    const { field, props } = await mount({
      placeholderStyle: 'color:red',
      selectionClass: 'selected',
    })
    const sheet = document.querySelector('[data-uni-input-styles]')
    const write = jest.spyOn(dom.window.Node.prototype, 'textContent', 'set')
    const read = jest.spyOn(global, 'getComputedStyle')
    try {
      props.placeholderClass = 'another'
      await vue.nextTick()
      expect(write).not.toHaveBeenCalled()
      expect(read).not.toHaveBeenCalled()
      props.selectionClass = 'another'
      await vue.nextTick()
      expect(write).not.toHaveBeenCalled()
      expect(document.querySelector('[data-uni-input-styles]')).toBe(sheet)
      expect(field.getAttribute('data-uni-placeholder-class')).toBe('another')
    } finally {
      write.mockRestore()
      read.mockRestore()
    }
  })

  test.each([
    ['digit', '12.3', 3, '12'],
    ['digit', '-1.2', 3, '-1'],
    ['number', '1e+3', 3, '1'],
    ['number', '-12', 1, '1'],
  ])(
    '数值截断不会清空有效前缀 (%s %s)',
    async (type, value, maxlength, expected) => {
      const { field, events } = await mount({
        name: 'number',
        type,
        value: '1',
        maxlength,
      })
      field.value = value as string
      field.dispatchEvent(
        new dom.window.InputEvent('input', {
          bubbles: true,
          inputType: 'insertFromPaste',
        })
      )
      await vue.nextTick()
      expect(field.value).toBe(expected)
      expect(events.input.mock.calls[0][0].detail.value).toBe(expected)
      expect(events.update).toHaveBeenCalledWith(expected)
    }
  )

  test('初始值、受控赋值和动态 maxlength 也保持合法数值', async () => {
    const { field, props } = await mount({
      type: 'digit',
      value: '12.3',
      maxlength: 3,
    })
    expect(field.value).toBe('12')
    props.maxlength = 10
    props.value = '123.4'
    await vue.nextTick()
    expect(field.value).toBe('123.4')
    props.maxlength = 4
    await vue.nextTick()
    expect(field.value).toBe('123')
  })

  test('placeholder-style 按原顺序交给 CSSOM，保留 important 与原生关键字', async () => {
    insertRule.mockClear()
    const { props } = await mount({
      placeholderStyle: 'font-size:10px;font:italic 24px serif;font-size:20px',
    })
    expect(insertRule).toHaveBeenCalledWith(
      expect.stringContaining(
        'font-size:10px;font:italic 24px serif;font-size:20px;'
      ),
      expect.any(Number)
    )
    props.placeholderStyle = 'font-size:10px!important;font:24px serif'
    await vue.nextTick()
    expect(styleText()).toContain('font-size:10px!important;')
    expect(styleText()).toContain('font:24px serif;')
    props.placeholderStyle = 'font:initial;font-family:initial;opacity:unset'
    await vue.nextTick()
    expect(styleText()).toContain(
      'font:initial;font-family:initial;opacity:unset;'
    )
    expect(styleText()).not.toContain('serif')
  })

  test('无效声明和背景/装饰简写原样交给 CSSOM，由浏览器过滤与展开', async () => {
    insertRule.mockClear()
    const { props } = await mount({
      placeholderStyle:
        'color:red;color:rgb(1,2);font:28px serif;font:500 32px',
    })
    expect(insertRule).toHaveBeenCalledWith(
      expect.stringContaining(
        'color:red;color:rgb(1,2);font:28px serif;font:500 32px;'
      ),
      expect.any(Number)
    )
    props.placeholderStyle =
      'background:linear-gradient(red,blue);background-color:green;text-decoration:underline red wavy'
    await vue.nextTick()
    expect(styleText()).toContain(
      'background:linear-gradient(red,blue);background-color:green;text-decoration:underline red wavy;'
    )
  })

  test('静态和变量字体均由 CSS 更新，不安装逐帧刷新', async () => {
    const request = jest.spyOn(global, 'requestAnimationFrame')
    try {
      const { field, props } = await mount({
        placeholderClass: 'themed',
        placeholderStyle: 'font:var(--font)',
      })
      expect(styleText()).toContain('font:var(--font);')
      expect(request).not.toHaveBeenCalled()
      field.style.setProperty('--font', '26px monospace')
      await vue.nextTick()
      props.placeholderStyle =
        'font:oblique calc(10deg) calc(450) 32px "monospace"'
      await vue.nextTick()
      expect(styleText()).toContain(
        'font:oblique calc(10deg) calc(450) 32px "monospace";'
      )
      expect(request).not.toHaveBeenCalled()
    } finally {
      request.mockRestore()
    }
  })

  test('未聚焦选区不观察整页，聚焦后只刷新当前输入框并在失焦时停止', async () => {
    const frames = new Map<number, FrameRequestCallback>()
    let id = 0
    const request = jest
      .spyOn(global, 'requestAnimationFrame')
      .mockImplementation((callback) => {
        frames.set(++id, callback)
        return id
      })
    const cancel = jest
      .spyOn(global, 'cancelAnimationFrame')
      .mockImplementation((id) => {
        frames.delete(id)
      })
    const read = jest.spyOn(global, 'getComputedStyle')
    const originalInsert = dom.window.CSSStyleSheet.prototype.insertRule
    const originalSet = dom.window.CSSStyleDeclaration.prototype.setProperty
    try {
      const first = await mount({ selectionClass: 'selected' })
      await mount({ selectionClass: 'selected' })
      expect(dom.window.CSSStyleSheet.prototype.insertRule).toBe(originalInsert)
      expect(dom.window.CSSStyleDeclaration.prototype.setProperty).toBe(
        originalSet
      )
      read.mockClear()
      const unrelated = document.createElement('span')
      document.body.append(unrelated)
      unrelated.textContent = 'updated'
      unrelated.dispatchEvent(
        new dom.window.Event('pointerover', { bubbles: true })
      )
      await vue.nextTick()
      await Promise.resolve()
      expect(read).not.toHaveBeenCalled()
      expect(frames.size).toBe(0)

      first.field.style.backgroundColor = 'blue'
      first.field.focus()
      expect(
        first.field.style.getPropertyValue('--uni-input-selection-background')
      ).toBe('blue')
      expect(frames.size).toBe(1)
      read.mockClear()
      first.field.style.backgroundColor = 'red'
      const [frame, refresh] = Array.from(frames.entries())[0]
      frames.delete(frame)
      refresh(0)
      expect(read).toHaveBeenCalledTimes(1)
      expect(read).toHaveBeenCalledWith(first.field, '::before')
      expect(
        first.field.style.getPropertyValue('--uni-input-selection-background')
      ).toBe('red')
      first.field.blur()
      expect(frames.size).toBe(0)
    } finally {
      read.mockRestore()
      request.mockRestore()
      cancel.mockRestore()
    }
  })

  test('KeepAlive 停用期间暂停选区观察，恢复后刷新继承背景', async () => {
    const visible = vue.ref(true)
    const cached = vue.defineVaporComponent({
      name: 'CachedInput',
      setup: () =>
        vue.createComponent(Input, {
          placeholderClass: 'hint',
          selectionClass: 'selected',
          value: '',
        }),
    })
    const other = vue.defineVaporComponent({
      name: 'Other',
      setup: () => document.createElement('span'),
    })
    const app = vue.createVaporApp(
      vue.defineVaporComponent({
        setup: () =>
          vue.createComponent(
            vue.VaporKeepAlive,
            null,
            {
              default: () =>
                vue.createDynamicComponent(
                  () => (visible.value ? cached : other),
                  null,
                  null,
                  1
                ),
            },
            true
          ),
      })
    )
    apps.push(app)
    const host = document.createElement('uni-page-body')
    document.body.append(host)
    app.mount(host)
    await vue.nextTick()
    const field = host.querySelector('input')!
    field.focus()
    field.style.backgroundColor = 'blue'
    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(
      field.style.getPropertyValue('--uni-input-selection-background')
    ).toBe('blue')
    visible.value = false
    await vue.nextTick()
    expect(field.isConnected).toBe(false)
    field.style.backgroundColor = 'red'
    await new Promise((resolve) => setTimeout(resolve, 30))
    expect(
      field.style.getPropertyValue('--uni-input-selection-background')
    ).toBe('blue')
    visible.value = true
    await vue.nextTick()
    expect(host.querySelector('input')).toBe(field)
    expect(
      field.style.getPropertyValue('--uni-input-selection-background')
    ).toBe('red')
    expect(document.activeElement).not.toBe(field)
  })
})
