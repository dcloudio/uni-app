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

describe('Web Vapor Editor 原生宿主', () => {
  let dom: any
  let vue: any
  let Editor: any
  let UniEditorElement: any
  let UniElement: any
  let elements: any
  let getContextInfo: Function
  const globals = new Map<string, any>()
  const apps: any[] = []
  const methods = new Map<string, Function>()
  const errors = jest.fn()

  beforeAll(async () => {
    const { JSDOM } = jest.requireActual('jsdom')
    dom = new JSDOM('<!DOCTYPE html><body></body>', {
      runScripts: 'outside-only',
      pretendToBeVisual: true,
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
      'navigator',
      'MutationObserver',
      'getComputedStyle',
      '__X__',
      '__NODE_JS__',
      '__PLATFORM__',
    ]) {
      globals.set(name, (global as any)[name])
      ;(global as any)[name] = dom.window[name]
    }
    Object.assign(global, {
      __X__: true,
      __NODE_JS__: false,
      __PLATFORM__: 'h5',
    })
    // JSDOM 缺少布局及旧编辑命令，仅补充 Quill 读取的浏览器能力。
    dom.window.document.execCommand = () => false
    dom.window.Range.prototype.getBoundingClientRect = () => ({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: 0,
      height: 0,
    })
    dom.window.Range.prototype.getClientRects = () => []
    // 使用仓库随框架发布的 Quill 1.3.7，不访问 CDN，也不替换编辑器实现。
    dom.window.eval(
      fs.readFileSync(
        path.join(root, 'packages/uni-app-vite/lib/template/__uniappquill.js'),
        'utf8'
      )
    )
    dom.window.hljs = {}
    vue = jest.requireActual(
      path.join(root, 'packages/uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js')
    )
    const shared = jest.requireActual(
      '../../uni-cli-shared/lib/dom2/web/@vue/shared/dist/shared.cjs.js'
    )
    const uniShared = jest.requireActual('@dcloudio/uni-shared')
    const load = async (source: string, imports = {}) =>
      evaluate(await preprocess(components + source), {
        vue,
        '@vue/shared': shared,
        '@dcloudio/uni-shared': uniShared,
        ...imports,
      })
    UniElement = (await load('helpers/UniElement-vapor.ts')).UniElement
    elements = await load('vue/web-vapor-elements.ts', {
      '../helpers/UniElement': { UniElement },
    })
    elements.installWebVaporElements(dom.window)
    const core = {
      useCurrentPageId: () => 7,
      getCurrentPageId: () => 7,
      registerViewMethod: (page: number, name: string, callback: Function) =>
        methods.set(page + ':' + name, callback),
      unregisterViewMethod: (page: number, name: string) =>
        methods.delete(page + ':' + name),
    }
    const context = await load('helpers/useContextInfo.ts', {
      '@dcloudio/uni-core': core,
    })
    getContextInfo = context.getContextInfo
    const subscribe = await load('helpers/useSubscribe.ts', {
      '@dcloudio/uni-core': core,
    })
    const events = await load('helpers/useEvent.ts', {
      '@dcloudio/uni-core': {},
    })
    const keyboard = await load('helpers/useKeyboard.ts')
    const formatImports: Record<string, any> = {}
    const platform = {
      getRealPath: (src: string) => src,
      getBaseSystemInfo: () => ({ platform: 'windows' }),
    }
    for (const name of [
      'divider',
      'ins',
      'align',
      'direction',
      'list',
      'background',
      'box',
      'font',
      'text',
      'image',
      'link',
      'mention',
    ]) {
      formatImports['./' + name] = await load(
        'vue/editor/quill/formats/' + name + '.ts',
        { '@dcloudio/uni-platform': platform }
      )
    }
    const quill = await load('vue/editor/quill/index.ts', {
      '@dcloudio/uni-components': { ...context, ...subscribe },
      '@dcloudio/uni-platform': platform,
      '../../../helpers/html-parser': await load('helpers/html-parser.js'),
      './loadScript': await load('vue/editor/quill/loadScript.ts'),
      './formats': await load(
        'vue/editor/quill/formats/index.ts',
        formatImports
      ),
    })
    const business = await load('vue/editor/useEditor.ts', {
      '../../helpers/useEvent': events,
      '../../helpers/useKeyboard': keyboard,
      './quill': quill,
    })
    const helper = await load('helpers/component.ts', {
      './component-vapor': await load('helpers/component-vapor.ts'),
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
        filename: 'editor.tsx', vapor: true
      }).code)
    `,
      ],
      {
        input: await preprocess(components + 'vue/editor/index-vapor.tsx'),
        encoding: 'utf8',
      }
    )

    const module = evaluate(compiled, {
      vue,
      '/vue-jsx/vapor': evaluate(fs.readFileSync(runtime, 'utf8'), { vue }),
      '../../helpers/component': helper,
      '../web-vapor-elements': elements,
      './useEditor': business,
    })
    Editor = module.default
    UniEditorElement = module.UniEditorElement
  }, 30000)

  afterEach(() => {
    apps.splice(0).forEach((app) => app.unmount())
    document.body.innerHTML = ''
    expect(methods.size).toBe(0)
    expect(errors).not.toHaveBeenCalled()
    errors.mockClear()
  })
  afterAll(() => {
    dom.window.close()
    globals.forEach((value, key) => {
      if (value === undefined) delete (global as any)[key]
      else (global as any)[key] = value
    })
  })

  function mount(props: Record<string, Function> = {}) {
    const ref = vue.shallowRef()
    const host = document.createElement('div')
    document.body.appendChild(host)
    const app = vue.createVaporApp(
      vue.defineVaporComponent({
        setup() {
          const component = vue.createComponent(Editor, {
            id: () => 'editor',
            ...props,
          })
          vue.setStaticTemplateRef(component, ref)
          vue.onMounted(() => expect(ref.value.uniTagName).toBe('EDITOR'))
          return component
        },
      })
    )
    app.config.errorHandler = errors
    apps.push(app)
    app.mount(host)
    return {
      host,
      ref,
      element: ref.value as HTMLElement,
      quill: (ref.value as any).__quill,
    }
  }

  function callEditor(method: string, options = {}) {
    const callback = jest.fn()
    methods.get('7:editor.editor')!(
      { type: method, data: { options, callbackId: 'test' } },
      callback
    )
    expect(callback).toHaveBeenCalledTimes(1)
    const result = callback.mock.calls[0][0].data
    expect(result.errMsg).toBe(method + ':ok')
    return result
  }

  test('原生宿主保持 ref、类型、dataset 和 Context 注册，Quill 在同一节点初始化', async () => {
    const ready = jest.fn()
    const payload = vue.ref({ count: 1 })
    const { element, ref, quill } = mount({
      onReady: () => ready,
      'data-payload': () => payload.value,
    })
    expect(element.tagName).toBe('DIV')
    expect(element).toBeInstanceOf(UniElement)
    expect(element).toBeInstanceOf(elements.UniViewElement)
    expect(element).toBeInstanceOf(UniEditorElement)
    class Derived extends UniEditorElement {}
    expect(element).not.toBeInstanceOf(Derived)
    expect(element.hasAttribute('uni-editor')).toBe(true)
    expect(element.hasAttribute('uni-view')).toBe(true)
    expect(element.setAttribute).toBe(dom.window.Element.prototype.setAttribute)
    expect(element.removeAttribute).toBe(
      dom.window.Element.prototype.removeAttribute
    )
    expect((element as any).attachVmProps).toBeUndefined()
    expect(dom.window.customElements.get('uni-editor')).toBeUndefined()
    expect(quill.container).toBe(element)
    expect(quill.root.parentElement).toBe(element)
    expect(quill.root.hasAttribute('uni-view')).toBe(false)
    expect(ready).toHaveBeenCalledTimes(1)
    expect(ready.mock.calls[0][0].target).toBe(element)
    expect(getContextInfo(element)).toEqual({
      id: 'editor',
      type: 'editor',
      page: 7,
    })
    expect((element.dataset as any).get('payload')).toBe(payload.value)
    payload.value = { count: 2 }
    await vue.nextTick()
    expect(ref.value).toBe(element)
    expect((element.dataset as any).get('payload')).toBe(payload.value)
  })

  test('属性更新保留 Quill 实例、内容、选区与原生内部 dataset', async () => {
    const state = vue.reactive({
      readOnly: false,
      placeholder: '请输入',
      type: '',
      color: 'red',
    })
    const { element, quill } = mount({
      readOnly: () => state.readOnly,
      placeholder: () => state.placeholder,
      type: () => state.type,
      class: () => 'custom-editor',
      style: () => ({ color: state.color }),
    })
    expect(quill.isEnabled()).toBe(true)
    expect(quill.root.dataset.placeholder).toBe('请输入')
    callEditor('setContents', { delta: { ops: [{ insert: '测试内容\n' }] } })
    quill.setSelection(1, 2, 'silent')
    state.placeholder = '新占位'
    state.type = 'none'
    state.color = 'blue'
    await vue.nextTick()
    expect((element as any).__quill).toBe(quill)
    expect(quill.root.dataset.placeholder).toBe('新占位')
    expect(quill.root.getAttribute('inputmode')).toBe('none')
    expect(quill.getText()).toBe('测试内容\n')
    expect(quill.getSelection()).toMatchObject({ index: 1, length: 2 })
    expect(element.style.color).toBe('blue')
    expect(element.classList.contains('ql-container')).toBe(true)
    state.readOnly = true
    await vue.nextTick()
    expect(quill.isEnabled()).toBe(false)
    state.readOnly = false
    state.type = ''
    await vue.nextTick()
    expect(quill.isEnabled()).toBe(true)
    expect(quill.root.hasAttribute('inputmode')).toBe(false)
  })

  test('EditorContext 内容读写、格式及焦点事件保留原行为', async () => {
    const input = jest.fn(),
      focus = jest.fn(),
      blur = jest.fn()
    const { element, quill } = mount({
      onInput: () => input,
      onFocus: () => focus,
      onBlur: () => blur,
    })
    callEditor('setContents', { html: '<p>正文</p>' })
    expect(callEditor('getContents')).toMatchObject({ text: '正文\n' })
    quill.setSelection(0, 2, 'silent')
    callEditor('format', { name: 'bold', value: true })
    expect(quill.getFormat(0, 2).bold).toBe(true)
    expect(callEditor('getSelectionText').text).toBe('正文')
    quill.insertText(2, '新增', 'user')
    expect(input).toHaveBeenCalled()
    const inputEvent = input.mock.calls[input.mock.calls.length - 1][0]
    expect(inputEvent.target === element).toBe(true)
    expect(inputEvent.detail.text).toBe('正文新增\n')
    quill.root.dispatchEvent(new dom.window.FocusEvent('focus'))
    expect(focus).toHaveBeenLastCalledWith(
      expect.objectContaining({ target: element })
    )
    quill.root.dispatchEvent(new dom.window.FocusEvent('blur'))
    expect(blur).toHaveBeenLastCalledWith(
      expect.objectContaining({ target: element })
    )
    callEditor('clear')
    expect(callEditor('getContents').text).toBe('\n')
  })

  test('非 Vapor 保留旧宿主、属性绑定及共享初始化顺序', async () => {
    const source = await preprocess(components + 'vue/editor/index.tsx', false)
    expect(source).toContain('<uni-editor ref={rootRef}')
    expect(source).toContain('rootElement.attachVmProps(props)')
    expect(source).not.toMatch(/native: true|web-vapor-elements|uni-view=""/)
    const shared = await preprocess(
      components + 'vue/editor/useEditor.ts',
      false
    )
    expect(shared.indexOf('useQuill(props, rootRef, trigger)')).toBeLessThan(
      shared.indexOf('useKeyboard(props, rootRef, trigger)')
    )
  })
})
