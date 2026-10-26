import path from 'path'
import jscc from 'rollup-plugin-jscc'
import ts from 'typescript'

// Vapor runtime 中的两套渲染器都使用配套 shared，避免混入工作区 VDOM 版本。
jest.mock('@vue/shared', () =>
  jest.requireActual(
    '../../uni-cli-shared/lib/dom2/web/@vue/shared/dist/shared.cjs.js'
  )
)

const root = path.resolve(__dirname, '../../..')

describe('Editor 组件事件声明', () => {
  let dom: any
  let vue: any
  let options: any
  let app: any
  const globals = new Map<string, any>()
  const events = [
    'ready',
    'focus',
    'blur',
    'input',
    'statuschange',
    'keyboardheightchange',
  ]

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
    ]) {
      globals.set(name, (global as any)[name])
      ;(global as any)[name] = dom.window[name]
    }
    // 同一 runtime 提供 VDOM 和 Vapor，分别验证标准组件事件及属性透传行为。
    vue = jest.requireActual(
      path.join(root, 'packages/uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js')
    )
    const shared = jest.requireActual(
      '../../uni-cli-shared/lib/dom2/web/@vue/shared/dist/shared.cjs.js'
    )
    const imports: Record<string, any> = {
      vue,
      '@vue/shared': shared,
      '../../helpers/component': {
        defineBuiltInComponent: (value: any) => value,
      },
      '../../helpers/UniElement': { UniElement: class {} },
      '../../helpers/useEvent': {},
      '../../helpers/useKeyboard': {
        props: {},
        emit: ['keyboardheightchange'],
      },
      './quill': {},
    }
    async function load(file: string): Promise<any> {
      const plugin = jscc({ values: { _X_: 0, _X_VAPOR_: 0, _NODE_JS_: 1 } })
      const code = (await (plugin.load as any).call({}, file)).code
      const output = ts.transpileModule(code, {
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          target: ts.ScriptTarget.ES2020,
          jsx: ts.JsxEmit.React,
        },
      }).outputText
      // 只加载真实组件选项，不启动 Quill；共享声明模块仍读取源码。
      if (output.includes('require("./useEditor")')) {
        imports['./useEditor'] = await load(
          path.join(path.dirname(file), 'useEditor.ts')
        )
      }
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
    options = (
      await load(
        path.join(root, 'packages/uni-components/src/vue/editor/index.tsx')
      )
    ).default
  })

  afterEach(() => {
    app?.unmount()
    app = undefined
    document.body.innerHTML = ''
  })
  afterAll(() => {
    dom.window.close()
    globals.forEach((value, name) => {
      if (value === undefined) delete (global as any)[name]
      else (global as any)[name] = value
    })
  })

  test.each([false, true])(
    '已声明事件只通过 emit 派发，普通 click 仍透传（Vapor=%s）',
    (vapor) => {
      expect(options.emits).toEqual(events)
      const listeners = Object.fromEntries(
        events.map((event) => [
          'on' + event[0].toUpperCase() + event.slice(1),
          jest.fn(),
        ])
      )
      const click = jest.fn()
      const props = { ...listeners, onClick: click }
      let context: any
      const component = {
        ...options,
        setup(_: any, ctx: any) {
          context = ctx
          return vapor
            ? vue.createPlainElement('div', null, null, true)
            : () => vue.h('div')
        },
      }
      app = vapor
        ? vue.createVaporApp(
            vue.defineVaporComponent({
              setup: () =>
                vue.createComponent(
                  vue.defineVaporComponent(component),
                  Object.fromEntries(
                    Object.entries(props).map(([key, value]) => [
                      key,
                      () => value,
                    ])
                  )
                ),
            })
          )
        : vue.createApp(component, props)
      const host = document.createElement('div')
      document.body.appendChild(host)
      app.mount(host)
      const element = host.firstElementChild as HTMLElement
      for (const event of events) {
        const key = 'on' + event[0].toUpperCase() + event.slice(1)
        expect(context.attrs[key]).toBeUndefined()
        element.dispatchEvent(new dom.window.Event(event))
        expect(listeners[key]).not.toHaveBeenCalled()
        const payload = { detail: { value: event } }
        context.emit(event, payload)
        expect(listeners[key]).toHaveBeenCalledTimes(1)
        expect(listeners[key]).toHaveBeenCalledWith(payload)
      }
      element.click()
      expect(click).toHaveBeenCalledTimes(1)
    }
  )
})
