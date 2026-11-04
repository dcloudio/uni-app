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

describe('Web Vapor WebView 原生宿主', () => {
  let dom: any
  let vue: any
  let WebView: any
  let UniWebViewElement: any
  let UniElement: any
  let elements: any
  let bridgeHandler: Function
  const apps: any[] = []
  const globals = new Map<string, any>()
  const bridgeOn = jest.fn()
  const navigateTo = jest.fn()
  const getRealPath = jest.fn((src: string) => src)
  const directory = 'packages/uni-h5/src/view/components/web-view/'

  beforeAll(async () => {
    const { JSDOM } = jest.requireActual('jsdom')
    dom = new JSDOM('<!DOCTYPE html><body></body>', {
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
      '__X__',
      '__NODE_JS__',
      'uni',
      'UniServiceJSBridge',
    ]) {
      globals.set(name, (global as any)[name])
      ;(global as any)[name] = dom.window[name]
    }
    Object.assign(global, {
      __X__: true,
      __NODE_JS__: false,
      uni: { navigateTo },
      UniServiceJSBridge: { on: bridgeOn },
    })
    vue = jest.requireActual(
      path.join(root, 'packages/uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js')
    )
    const shared = jest.requireActual(
      '../../uni-cli-shared/lib/dom2/web/@vue/shared/dist/shared.cjs.js'
    )
    const uniShared = jest.requireActual('@dcloudio/uni-shared')
    UniElement = evaluate(
      await preprocess(components + 'helpers/UniElement-vapor.ts'),
      { '@vue/shared': shared, '@dcloudio/uni-shared': uniShared }
    ).UniElement
    elements = evaluate(
      await preprocess(components + 'vue/web-vapor-elements.ts'),
      {
        '../helpers/UniElement': { UniElement },
        '@dcloudio/uni-shared': uniShared,
      }
    )
    elements.installWebVaporElements(dom.window)
    const helper = evaluate(
      await preprocess(components + 'helpers/component.ts'),
      {
        '@vue/shared': shared,
        './component-vapor': evaluate(
          await preprocess(components + 'helpers/component-vapor.ts'),
          { vue }
        ),
        './animation': { default: {} },
      }
    )
    const event = evaluate(
      await preprocess(components + 'helpers/useEvent.ts'),
      {
        '@dcloudio/uni-shared': uniShared,
        '@dcloudio/uni-core': { createNativeEvent: jest.fn() },
      }
    )
    const attrs = evaluate(
      await preprocess(components + 'helpers/useAttrs.ts'),
      { vue }
    )
    bridgeHandler = evaluate(
      await preprocess('packages/uni-h5/src/service/onWebInvokeAppService.ts'),
      {}
    ).onWebInvokeAppService
    const business = evaluate(await preprocess(directory + 'useWebView.ts'), {
      vue,
      '@vue/shared': shared,
      '@dcloudio/uni-shared': uniShared,
      '@dcloudio/uni-components': { ...event, ...attrs },
      '@dcloudio/uni-platform': { getRealPath },
      '../../../service/onWebInvokeAppService': {
        onWebInvokeAppService: bridgeHandler,
      },
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
      process.stdout.write(compiler.transform(fs.readFileSync(0, 'utf8'), {filename: 'web-view.tsx', vapor: true}).code)
    `,
      ],
      {
        input: await preprocess(directory + 'index-vapor.tsx'),
        encoding: 'utf8',
      }
    )
    const module = evaluate(compiled, {
      vue,
      '/vue-jsx/vapor': evaluate(fs.readFileSync(runtime, 'utf8'), { vue }),
      '@dcloudio/uni-components': { ...helper, ...elements },
      './useWebView': business,
    })
    WebView = module.default
    UniWebViewElement = module.UniWebViewElement
  }, 30000)

  afterEach(() => {
    apps.splice(0).forEach((app) => app.unmount())
    document.body.innerHTML = ''
    getRealPath.mockClear()
    navigateTo.mockClear()
  })
  afterAll(() => {
    dom.window.close()
    globals.forEach((value, key) => {
      if (value === undefined) delete (global as any)[key]
      else (global as any)[key] = value
    })
  })
  function mount(props: Record<string, Function> = {}) {
    const node = vue.shallowRef()
    const host = document.createElement('div')
    document.body.appendChild(host)
    const app = vue.createVaporApp(
      vue.defineVaporComponent({
        setup() {
          const component = vue.createComponent(WebView, {
            src: () => 'about:blank',
            ...props,
          })
          vue.setStaticTemplateRef(component, node)
          vue.onMounted(() => {
            expect(node.value.uniTagName).toBe('WEB-VIEW')
            expect(node.value.firstElementChild.tagName).toBe('IFRAME')
          })
          return component
        },
      })
    )
    app.config.warnHandler = (message: string) => {
      throw new Error(message)
    }
    app.config.errorHandler = (error: Error) => {
      throw error
    }
    apps.push(app)
    app.mount(host)
    return {
      element: node.value,
      iframe: node.value.firstElementChild as HTMLIFrameElement,
      node,
      app,
    }
  }

  test('根节点 ref、逻辑类型和原生属性 API 正常，多实例只注册一次通信', () => {
    const { element, iframe } = mount()
    expect(element.tagName).toBe('DIV')
    expect(element).toBeInstanceOf(UniElement)
    expect(element).toBeInstanceOf(elements.UniViewElement)
    expect(element).toBeInstanceOf(UniWebViewElement)
    class Derived extends UniWebViewElement {}
    expect(element).not.toBeInstanceOf(Derived)
    expect(element.setAttribute).toBe(dom.window.Element.prototype.setAttribute)
    expect(element.removeAttribute).toBe(
      dom.window.Element.prototype.removeAttribute
    )
    expect(element.attachVmProps).toBeUndefined()
    expect(customElements.get('uni-web-view')).toBeUndefined()
    expect(iframe.hasAttribute('uni-view')).toBe(false)
    const second = mount()
    expect(second.iframe).not.toBe(iframe)
    expect(bridgeOn).toHaveBeenCalledTimes(1)
    expect(bridgeOn.mock.calls[0][1]).toBe(bridgeHandler)
    bridgeOn.mock.calls[0][1](
      { name: 'navigateTo', arg: { url: '/pages/test' } },
      1
    )
    expect(navigateTo).toHaveBeenCalledWith({ url: '/pages/test' })
  })

  test('class、style 和事件保留在宿主，其他属性仍传给 iframe 并响应更新', async () => {
    const state = vue.reactive({
      title: '初始标题',
      class: 'first',
      width: '200px',
    })
    const click = jest.fn()
    const { element, iframe } = mount({
      id: () => 'webview',
      title: () => state.title,
      class: () => state.class,
      style: () => ({ width: state.width }),
      onClick: () => click,
    })
    expect(iframe.id).toBe('webview')
    expect(iframe.title).toBe('初始标题')
    expect(element.id).toBe('')
    expect(element.classList.contains('uni-webview')).toBe(true)
    expect(element.classList.contains('first')).toBe(true)
    expect(element.style.width).toBe('200px')
    expect(iframe.className).toBe('')
    expect(iframe.style.width).toBe('')
    element.click()
    expect(click).toHaveBeenCalledTimes(1)
    state.title = '更新标题'
    state.class = 'second'
    state.width = '300px'
    await vue.nextTick()
    expect(iframe.title).toBe('更新标题')
    expect(element.classList.contains('first')).toBe(false)
    expect(element.classList.contains('second')).toBe(true)
    expect(element.style.width).toBe('300px')
    expect(element.firstElementChild).toBe(iframe)
  })

  test('src 更新复用 iframe，load 事件的目标和 detail 保持旧协议', async () => {
    const src = vue.ref('/first')
    const load = jest.fn()
    const { element, iframe, node } = mount({
      src: () => src.value,
      onLoad: () => load,
    })
    expect(iframe.getAttribute('src')).toBe('/first')
    iframe.dispatchEvent(new dom.window.Event('load'))
    expect(load).toHaveBeenCalledTimes(1)
    const event = load.mock.calls[0][0]
    expect(event.target).toBe(element)
    expect(event.currentTarget).toBe(element)
    expect(event.detail).toEqual({ src: '/first', url: '/first' })
    src.value = '/second'
    await vue.nextTick()
    expect(getRealPath).toHaveBeenLastCalledWith('/second')
    expect(iframe.getAttribute('src')).toBe('/second')
    expect(node.value).toBe(element)
    expect(element.firstElementChild).toBe(iframe)
    iframe.dispatchEvent(new dom.window.Event('load'))
    expect(load.mock.calls[load.mock.calls.length - 1][0].detail).toEqual({
      src: '/second',
      url: '/second',
    })
  })

  test('卸载停止 src 更新，非 Vapor 保留旧宿主和属性读取机制', async () => {
    const src = vue.ref('/first')
    const { iframe, app } = mount({ src: () => src.value })
    app.unmount()
    apps.splice(apps.indexOf(app), 1)
    getRealPath.mockClear()
    src.value = '/after-unmount'
    await vue.nextTick()
    expect(getRealPath).not.toHaveBeenCalled()
    expect(iframe.getAttribute('src')).toBe('/first')
    const standard = await preprocess(directory + 'index-x.tsx', false)
    expect(standard).toContain('<uni-web-view')
    expect(standard).toContain('rootElement.attachVmProps(props)')
    expect(standard).not.toMatch(/native: true|uni-view=""/)
  })
})
