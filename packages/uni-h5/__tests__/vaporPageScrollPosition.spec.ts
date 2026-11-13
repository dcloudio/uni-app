import fs from 'fs'
import path from 'path'
import ts from 'typescript'

jest.mock('@vue/shared', () =>
  jest.requireActual(
    '../../uni-cli-shared/lib/dom2/web/@vue/shared/dist/shared.cjs.js'
  )
)

test('VaporKeepAlive 插回页面后恢复各自的区域滚动位置', async () => {
  const { JSDOM } = jest.requireActual('jsdom')
  const dom = new JSDOM('<!doctype html><body></body>')
  const globals = new Map<string, any>()
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
  let app: any
  try {
    const vue = jest.requireActual(
      path.resolve(
        __dirname,
        '../../uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js'
      )
    )
    const imports: Record<string, any> = {
      vue,
      '@dcloudio/uni-core': {
        getPageInstanceByChild: (instance: any) => instance,
      },
    }
    const output = ts.transpileModule(
      fs.readFileSync(
        path.resolve(__dirname, '../src/helpers/pageBody.ts'),
        'utf8'
      ),
      { compilerOptions: { module: ts.ModuleKind.CommonJS } }
    ).outputText
    const exports = {} as any
    new Function('require', 'exports', output)(
      (id: string) => imports[id],
      exports
    )
    const route = vue.ref('a')
    const bodies = new Map<string, HTMLElement>()
    const restoredWhileConnected: boolean[] = []
    const Page = vue.defineVaporComponent({
      name: 'Page',
      setup() {
        const body = document.createElement('uni-page-body')
        const instance = vue.getCurrentInstance()
        instance.__pageBodyEl = body
        bodies.set(route.value, body)
        let top = 0
        Object.defineProperty(body, 'scrollTop', {
          get: () => top,
          set: (value: number) => {
            if (value) restoredWhileConnected.push(body.isConnected)
            top = value
          },
        })
        exports.usePageBodyScrollPosition(instance)
        // 模拟浏览器在元素脱离文档时丢弃布局和滚动偏移。
        vue.onDeactivated(() => {
          body.scrollLeft = body.scrollTop = 0
        })
        return body
      },
    })
    const Root = vue.defineVaporComponent({
      setup() {
        return vue.createComponent(
          vue.VaporKeepAlive,
          { matchBy: () => 'key' },
          {
            default: () =>
              vue.createDynamicComponent(
                () => vue.createComponent(Page),
                null,
                null,
                5,
                () => route.value
              ),
          }
        )
      },
    })
    const host = document.createElement('div')
    document.body.appendChild(host)
    app = vue.createVaporApp(Root)
    app.mount(host)
    await vue.nextTick()
    const first = bodies.get('a')!
    first.scrollLeft = 10
    first.scrollTop = 120
    route.value = 'b'
    await vue.nextTick()
    expect(first.scrollTop).toBe(0)
    const second = bodies.get('b')!
    second.scrollLeft = 20
    second.scrollTop = 240
    route.value = 'a'
    await vue.nextTick()
    expect(host.querySelector('uni-page-body')).toBe(first)
    expect(first.scrollTop).toBe(120)
    expect(first.scrollLeft).toBe(10)
    route.value = 'b'
    await vue.nextTick()
    expect(host.querySelector('uni-page-body')).toBe(second)
    expect(second.scrollTop).toBe(240)
    expect(second.scrollLeft).toBe(20)
    expect(restoredWhileConnected.every(Boolean)).toBe(true)
    expect(bodies.size).toBe(2)
  } finally {
    app?.unmount()
    dom.window.close()
    for (const [name, value] of globals) {
      ;(global as any)[name] = value
    }
  }
})
