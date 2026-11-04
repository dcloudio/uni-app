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

describe('Web Vapor Icon 原生宿主', () => {
  let dom: any
  let vue: any
  let Icon: any
  let UniIconElement: any
  let UniElement: any
  let elements: any
  let icons: any
  const apps: any[] = []
  const globals = new Map<string, any>()
  const upx2px = jest.fn((value: number) => value / 2)

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
      '__X__',
      '__NODE_JS__',
      'uni',
    ]) {
      globals.set(name, (global as any)[name])
      ;(global as any)[name] = dom.window[name]
    }
    Object.assign(global, { __X__: true, __NODE_JS__: false, uni: { upx2px } })
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
    const renderer = evaluate(
      await preprocess('packages/uni-core/src/helpers/icon-vapor.ts'),
      { vue }
    )
    icons = evaluate(
      await preprocess('packages/uni-core/src/helpers/icon.ts'),
      { './icon-vapor': renderer }
    )
    const util = evaluate(
      await preprocess('packages/uni-core/src/helpers/util.ts'),
      { '@vue/shared': shared }
    )
    const core = { ...icons, rpx2px: util.rpx2px }
    const business = evaluate(
      await preprocess(components + 'vue/icon/useIcon.ts'),
      { vue, '@dcloudio/uni-core': core, '@dcloudio/uni-shared': uniShared }
    )
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
        filename: 'icon.tsx', vapor: true
      }).code)
    `,
      ],
      {
        input: await preprocess(components + 'vue/icon/index-vapor.tsx'),
        encoding: 'utf8',
      }
    )
    const module = evaluate(compiled, {
      vue,
      '/vue-jsx/vapor': evaluate(fs.readFileSync(runtime, 'utf8'), { vue }),
      '@dcloudio/uni-core': core,
      '../../helpers/component': helper,
      '../web-vapor-elements': elements,
      './useIcon': business,
    })
    Icon = module.default
    UniIconElement = module.UniIconElement
  }, 30000)

  afterEach(() => {
    apps.splice(0).forEach((app) => app.unmount())
    document.body.innerHTML = ''
    upx2px.mockClear()
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
          const component = vue.createComponent(Icon, {
            type: () => 'success',
            ...props,
          })
          vue.setStaticTemplateRef(component, node)
          vue.onMounted(() => expect(node.value.uniTagName).toBe('ICON'))
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
    return { root: node.value as HTMLElement, node, host }
  }

  test.each([
    ['success', 'SUCCESS', '#007aff'],
    ['success_no_circle', 'SUCCESS_NO_CIRCLE', '#007aff'],
    ['info', 'INFO', '#10aeff'],
    ['warn', 'WARN', '#f76260'],
    ['waiting', 'WAITING', '#10aeff'],
    ['cancel', 'CANCEL', '#f43530'],
    ['download', 'DOWNLOAD', '#007aff'],
    ['search', 'SEARCH', '#b2b2b2'],
    ['clear', 'CLEAR', '#b2b2b2'],
  ])('%s 保留 SVG 路径、默认颜色与尺寸', (type, key, color) => {
    const { root } = mount({ type: () => type })
    const svg = root.querySelector('svg')!
    expect(svg.namespaceURI).toBe('http://www.w3.org/2000/svg')
    expect(svg.getAttribute('viewBox')).toBe('0 0 32 32')
    expect(svg.getAttribute('width')).toBe('23')
    expect(svg.getAttribute('height')).toBe('23')
    expect(svg.querySelector('path')!.getAttribute('d')).toBe(
      icons['ICON_PATH_' + key]
    )
    expect(svg.querySelector('path')!.getAttribute('fill')).toBe(color)
  })

  test('原生根节点保持 Element、ref、dataset 和事件能力，不注册 Custom Element', async () => {
    const payload = { count: 1 }
    const attrs = vue.ref({ 'data-payload': payload })
    const click = jest.fn()
    const { root, node } = mount({ onClick: () => click })
    expect(root.tagName).toBe('DIV')
    expect(root).toBeInstanceOf(dom.window.HTMLDivElement)
    expect(root).toBeInstanceOf(UniElement)
    expect(root).toBeInstanceOf(elements.UniViewElement)
    expect(root).toBeInstanceOf(UniIconElement)
    expect(root.hasAttribute('uni-icon')).toBe(true)
    expect(root.hasAttribute('uni-view')).toBe(true)
    expect(dom.window.customElements.get('uni-icon')).toBeUndefined()
    expect((root as any).attachVmProps).toBeUndefined()
    expect(root.setAttribute).toBe(dom.window.Element.prototype.setAttribute)
    expect(root.removeAttribute).toBe(
      dom.window.Element.prototype.removeAttribute
    )
    class Derived extends UniIconElement {}
    expect(root).not.toBeInstanceOf(Derived)
    const plain = document.createElement('div')
    plain.setAttribute('uni-view', '')
    expect(plain).not.toBeInstanceOf(UniIconElement)
    root.click()
    expect(click).toHaveBeenCalledTimes(1)
    expect(click.mock.calls[0][0].target).toBe(root)
    expect(node.value).toBe(root)
    const second = mount({
      'data-payload': () => attrs.value['data-payload'],
    }).root
    expect((second.dataset as any).get('payload')).toBe(
      attrs.value['data-payload']
    )
    expect(root.dataset).not.toBe(second.dataset)
    second.setAttribute('data-payload', 'manual')
    expect((second.dataset as any).get('payload')).toBe(
      attrs.value['data-payload']
    )
    attrs.value = { 'data-payload': { count: 2 } }
    await vue.nextTick()
    expect((second.dataset as any).get('payload')).toBe(
      attrs.value['data-payload']
    )
  })

  test('type、size、color 动态更新及无效图标恢复不替换宿主', async () => {
    const props = vue.reactive({
      type: 'success',
      size: 23 as number | string,
      color: '',
    })
    const { root, node } = mount({
      type: () => props.type,
      size: () => props.size,
      color: () => props.color,
    })
    const descriptor = Object.getOwnPropertyDescriptor(root, 'uniTagName')
    props.type = 'warn'
    props.size = '40rpx'
    props.color = '#123456'
    await vue.nextTick()
    let svg = root.querySelector('svg')!
    expect(root.querySelectorAll('svg')).toHaveLength(1)
    expect(svg.getAttribute('width')).toBe('20')
    expect(svg.getAttribute('height')).toBe('20')
    expect(upx2px).toHaveBeenCalledWith(40)
    expect(svg.querySelector('path')!.getAttribute('d')).toBe(
      icons.ICON_PATH_WARN
    )
    expect(svg.querySelector('path')!.getAttribute('fill')).toBe('#123456')
    for (const type of ['unknown', '', 'info']) {
      props.type = type
      await vue.nextTick()
      expect(root.querySelectorAll('svg')).toHaveLength(type === 'info' ? 1 : 0)
      expect(node.value).toBe(root)
    }
    props.color = ''
    props.size = '32px'
    await vue.nextTick()
    svg = root.querySelector('svg')!
    expect(svg.getAttribute('width')).toBe('32')
    expect(svg.querySelector('path')!.getAttribute('fill')).toBe('#10aeff')
    expect(Object.getOwnPropertyDescriptor(root, 'uniTagName')).toEqual(
      descriptor
    )
  })

  test('非 Vapor 保留旧宿主、mounted 绑定及 SVG helper', async () => {
    const code = await preprocess(components + 'vue/icon/index.tsx', false)
    expect(code).toContain('<uni-icon ref={rootRef}>')
    expect(code).toContain('rootElement.attachVmProps(props)')
    expect(code).toContain('createSvgIconVNode(')
    expect(code).not.toMatch(/native: true|web-vapor-elements|uni-view/)
  })
})
