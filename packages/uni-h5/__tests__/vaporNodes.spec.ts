import path from 'path'
import jscc from 'rollup-plugin-jscc'
import ts from 'typescript'

// 真实 Vapor runtime 必须配套加载同版本 shared，避免使用工作区的 VDOM 版本。
jest.mock('@vue/shared', () =>
  jest.requireActual(
    '../../uni-cli-shared/lib/dom2/web/@vue/shared/dist/shared.cjs.js'
  )
)

const root = path.resolve(__dirname, '../../..')

async function preprocess(file: string, vapor: boolean) {
  const plugin = jscc({
    values: { _X_: 1, _X_VAPOR_: vapor ? 1 : 0, _NODE_JS_: 0 },
  })
  return (await (plugin.load as any).call({}, path.join(root, file)))
    .code as string
}

async function load(
  file: string,
  vapor: boolean,
  imports: Record<string, any>
) {
  const code = ts.transpileModule(await preprocess(file, vapor), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText
  const module = { exports: {} as any }
  new Function('require', 'module', 'exports', code)(
    (id: string) => imports[id],
    module,
    module.exports
  )
  return module.exports
}

describe('Web Vapor 手写节点', () => {
  test.each([
    'packages/uni-h5/src/service/api/ui/popup/toast.tsx',
    'packages/uni-h5/src/service/api/ui/popup/utils.ts',
    'packages/uni-core/src/helpers/icon.ts',
    'packages/uni-components/src/helpers/component.ts',
    'packages/uni-components/src/vue/rich-text/index.tsx',
    'packages/uni-components/src/vue/rich-text/nodes-parser.ts',
    'packages/uni-components/src/helpers/component-vapor.ts',
    'packages/uni-core/src/helpers/icon-vapor.ts',
    'packages/uni-components/src/vue/rich-text/render-vapor.ts',
    'packages/uni-components/src/vue/rich-text/nodes-parser-vapor.ts',
    'packages/uni-h5/src/service/api/ui/popup/toast-vapor.tsx',
  ])('Vapor 不创建 VNode：%s', async (file) => {
    expect(await preprocess(file, true)).not.toMatch(
      /\b(?:createVNode|createTextVNode|createElementBlock|createBlock|openBlock|h)\b/
    )
  })

  test.each([
    ['packages/uni-h5/src/service/api/ui/popup/utils.ts', 'createBlock'],
    ['packages/uni-core/src/helpers/icon-vdom.ts', 'createVNode'],
    [
      'packages/uni-h5/src/service/api/ui/popup/toast-vdom.tsx',
      'createSvgIconVNode',
    ],
    [
      'packages/uni-components/src/helpers/component-vdom.ts',
      'createElementBlock',
    ],
    [
      'packages/uni-components/src/vue/rich-text/render-vdom.ts',
      'nodeList2VNode',
    ],
    [
      'packages/uni-components/src/vue/rich-text/nodes-parser-vdom.ts',
      'createTextVNode',
    ],
  ])('非 Vapor 保留原节点路径：%s', async (file, helper) => {
    expect(await preprocess(file, false)).toContain(helper)
  })

  test('SVG 模板只初始化一次，后续直接复用工厂', async () => {
    const factory = jest.fn(() => ({ firstChild: {} }))
    const template = jest.fn(() => factory)
    const renderer = await load(
      'packages/uni-core/src/helpers/icon-vapor.ts',
      true,
      {
        vue: { template, setAttr: jest.fn() },
      }
    )
    const icon = await load('packages/uni-core/src/helpers/icon.ts', true, {
      './icon-vapor': renderer,
    })
    expect(template).not.toHaveBeenCalled()
    icon.createSvgIconVNode('first')
    icon.createSvgIconVNode('second')
    expect(template).toHaveBeenCalledTimes(1)
    expect(factory).toHaveBeenCalledTimes(2)
  })

  test.each([false, true])(
    '公共入口只选择对应的模式实现（Vapor=%s）',
    async (vapor) => {
      for (const file of [
        'packages/uni-components/src/helpers/component.ts',
        'packages/uni-core/src/helpers/icon.ts',
        'packages/uni-components/src/vue/rich-text/index.tsx',
        'packages/uni-h5/src/service/api/ui/popup/toast.tsx',
      ]) {
        const code = await preprocess(file, vapor)
        expect(code).toContain(vapor ? '-vapor' : '-vdom')
        expect(code).not.toContain(vapor ? '-vdom' : '-vapor')
      }
    }
  )

  test.each([false, true])(
    '组件定义保留公共选项，仅 Vapor 展开 setup（Vapor=%s）',
    async (vapor) => {
      const define = jest.fn((options) => options)
      const runtime = await load(
        `packages/uni-components/src/helpers/component-${
          vapor ? 'vapor' : 'vdom'
        }.ts`,
        vapor,
        { vue: { defineComponent: define, defineVaporComponent: define } }
      )
      const { defineSystemComponent } = await load(
        'packages/uni-components/src/helpers/component.ts',
        vapor,
        {
          [`./component-${vapor ? 'vapor' : 'vdom'}`]: runtime,
          './animation': {},
        }
      )
      const block = {}
      const render = jest.fn(() => block)
      const setup = jest.fn(() => render)
      const options = defineSystemComponent({ setup })
      expect(options).toMatchObject({
        __reserved: true,
        compatConfig: { MODE: 3 },
      })
      expect(define).toHaveBeenCalledTimes(1)
      const props = {}
      const context = {}
      expect(options.setup(props, context)).toBe(vapor ? block : render)
      expect(setup).toHaveBeenCalledWith(props, context)
      expect(render).toHaveBeenCalledTimes(vapor ? 1 : 0)
      if (!vapor) expect(options.setup).toBe(setup)
    }
  )

  test.each([false, true])(
    '未支持组件保留各模式的节点结果（Vapor=%s）',
    async (vapor) => {
      const block = {}
      const createPlainElement = jest.fn(() => block)
      const createElementBlock = jest.fn(() => block)
      const openBlock = jest.fn()
      const runtime = await load(
        `packages/uni-components/src/helpers/component-${
          vapor ? 'vapor' : 'vdom'
        }.ts`,
        vapor,
        { vue: { createPlainElement, createElementBlock, openBlock } }
      )
      const result = runtime.createUnsupportedRender('video')
      if (vapor) {
        expect(result).toBe(block)
        expect(createPlainElement).toHaveBeenCalledWith(
          'uni-video',
          null,
          null,
          true
        )
        expect(block).toEqual({ textContent: 'video is unsupported' })
      } else {
        expect(createElementBlock).not.toHaveBeenCalled()
        expect(result()).toBe(block)
        expect(openBlock).toHaveBeenCalledTimes(1)
        expect(createElementBlock).toHaveBeenCalledWith(
          'uni-video',
          null,
          'video is unsupported'
        )
      }
    }
  )

  test('Vapor 弹层使用独立 app 和动态 props，不修改原组件 setup', async () => {
    const vue = {
      createVaporApp: jest.fn((component, props) => ({ component, props })),
    }
    const utils = await load(
      'packages/uni-h5/src/service/api/ui/popup/utils.ts',
      true,
      {
        vue,
        '../../../../helpers/useKeyboard': {},
      }
    )
    const block = {}
    const setup = jest.fn(() => block)
    const component = { setup }
    const state = { visible: true, title: 'first' }
    const close = jest.fn()
    const first = utils.createRootApp(component, state, close)
    const second = utils.createRootApp(component, state, close)
    expect(first.component).toBe(component)
    expect(second.component).toBe(component)
    expect(setup).not.toHaveBeenCalled()
    expect(component.setup).toBe(setup)
    state.title = 'second'
    expect(first.props.$[0]().title).toBe('second')
    ;(state as any).onClose('done')
    expect(state.visible).toBe(false)
    expect(close).toHaveBeenCalledWith('done')
  })
})

describe('RichText Vapor 节点规则', () => {
  let render: (nodes: any[]) => any[]
  const trigger = jest.fn()
  const vue = {
    computed: (fn: Function) => ({
      get value() {
        return fn()
      },
    }),
    toRaw: (node: any) => node,
    createFor: (source: Function, render: Function) =>
      (source() || []).map((value: any) => render({ value })),
    createKeyedFragment: (_key: Function, render: Function) => render(),
    createPlainElement: (
      name: string,
      props: any,
      slots: any,
      _root: boolean,
      _once: boolean,
      namespace: number
    ) => ({
      name,
      attrs: {},
      children: [],
      namespace,
    }),
    effectScope: () => ({ run: (fn: Function) => fn(), stop() {} }),
    insert: (children: any[], parent: any) => (parent.children = children),
    remove: (_children: any[], parent: any) => (parent.children = []),
    setDynamicProps: (node: any, props: any[]) => (node.attrs = props[0]),
    createTextNode: () => ({ text: '' }),
    renderEffect: (fn: Function) => fn(),
    setText: (node: { text: string }, text: string) => (node.text = text),
  }

  beforeAll(async () => {
    const imports = {
      vue,
      '@vue/shared': {
        ...jest.requireActual('@vue/shared'),
        Namespaces: { HTML: 0, SVG: 1, MATH_ML: 2 },
      },
      '@dcloudio/uni-platform': { getRealPath: (src: string) => '/base' + src },
    }
    const parser = await load(
      'packages/uni-components/src/vue/rich-text/nodes-parser.ts',
      true,
      imports
    )
    const { nodeList2Block } = await load(
      'packages/uni-components/src/vue/rich-text/nodes-parser-vapor.ts',
      true,
      { ...imports, './nodes-parser': parser }
    )
    render = (nodes) => nodeList2Block(() => nodes, 'data-v-test', trigger)
  })

  beforeEach(() => trigger.mockClear())

  test('保持文本类型优先级、实体解码及无效节点过滤', () => {
    expect(
      render([
        { text: '&amp;&#65;&#x42;&unknown;', name: 'p' },
        { type: 'node', name: 'p', text: '不作为文本渲染' },
        null,
        'invalid',
        { type: 'text', text: '' },
        { type: 'unknown', name: 'p' },
      ])
    ).toEqual([
      { text: '&AB&unknown;' },
      {
        name: 'p',
        attrs: { 'data-v-test': '' },
        children: [],
        namespace: 0,
      },
      [],
      [],
      [],
      [],
    ])
  })

  test('图片路径走 getRealPath，保留原始点击 detail 和事件阻止行为', () => {
    const [image] = render([{ name: 'img', attrs: { src: '/a.png' } }])
    expect(image.attrs.src).toBe('/base/a.png')
    const event = { stopPropagation: jest.fn(), preventDefault: jest.fn() }
    image.attrs.onClickCapture(event)
    expect(trigger).toHaveBeenCalledWith(event, { src: '/a.png' })
    expect(event.stopPropagation).toHaveBeenCalledTimes(1)
    expect(event.preventDefault).toHaveBeenCalledTimes(1)
    expect((event as any).returnValue).toBe(false)
  })

  test('链接 detail、class/style、自定义属性及作用域标记保持原规则', () => {
    const attrs = {
      href: '/next',
      class: ['a'],
      style: { color: 'red' },
      foo: 1,
    }
    const [link] = render([{ name: 'a', attrs }])
    expect(link.attrs).toMatchObject({ ...attrs, 'data-v-test': '' })
    link.attrs.onClickCapture({ stopPropagation() {}, preventDefault() {} })
    expect(trigger.mock.calls[0][1]).toEqual({ href: '/next' })
    expect(attrs).not.toHaveProperty('onClickCapture')
  })

  test.each([
    ['svg', 'foreignObject', {}, 1],
    ['math', 'annotation-xml', { encoding: 'text/html' }, 2],
  ])('保持 %s 命名空间及 HTML 子树边界', (name, child, attrs, namespace) => {
    const [root] = render([
      { name, children: [{ name: child, attrs, children: [{ name: 'div' }] }] },
    ])
    expect(root.namespace).toBe(namespace)
    expect(root.children[0].namespace).toBe(namespace)
    expect(root.children[0].children[0].namespace).toBe(0)
  })
})

describe('RichText Vapor 真实运行时更新', () => {
  let vue: any
  let nodeList2Block: Function
  let nodeList2VNode: Function
  let renderVaporRichText: Function
  let renderVDomRichText: Function
  const apps: any[] = []
  const errors = jest.fn()
  const keyReads = jest.fn()
  const listsCreated = jest.fn()
  const childScopesCreated = jest.fn()
  let dom: any
  const previousGlobals = new Map<string, any>()

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
      previousGlobals.set(name, (global as any)[name])
      ;(global as any)[name] = dom.window[name]
    }
    vue = jest.requireActual(
      path.join(root, 'packages/uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js')
    )
    const imports = {
      vue,
      '@vue/shared': jest.requireActual(
        path.join(
          root,
          'packages/uni-cli-shared/lib/dom2/web/@vue/shared/dist/shared.cjs.js'
        )
      ),
      '@dcloudio/uni-platform': { getRealPath: (src: string) => '/base' + src },
    }
    const parser = await load(
      'packages/uni-components/src/vue/rich-text/nodes-parser.ts',
      true,
      imports
    )
    ;({ nodeList2VNode } = await load(
      'packages/uni-components/src/vue/rich-text/nodes-parser-vdom.ts',
      false,
      { ...imports, './nodes-parser': parser }
    ))
    ;({ nodeList2Block } = await load(
      'packages/uni-components/src/vue/rich-text/nodes-parser-vapor.ts',
      true,
      {
        ...imports,
        './nodes-parser': parser,
        vue: {
          ...vue,
          // 只记录 key 提取次数，列表和调度仍使用真实 runtime。
          createFor: (source: Function, render: Function, key: Function) => {
            listsCreated()
            return vue.createFor(source, render, (...args: any[]) => {
              keyReads()
              return key(...args)
            })
          },
          effectScope: (...args: any[]) => {
            childScopesCreated()
            return vue.effectScope(...args)
          },
        },
      }
    ))
    const richText = jest.requireActual(
      path.join(root, 'packages/uni-components/src/components/rich-text')
    )
    const renderImports = {
      ...imports,
      '../../components/rich-text': richText,
      './nodes-parser-vapor': { nodeList2Block },
      './nodes-parser-vdom': { nodeList2VNode },
    }
    ;({ renderRichText: renderVaporRichText } = await load(
      'packages/uni-components/src/vue/rich-text/render-vapor.ts',
      true,
      renderImports
    ))
    ;({ renderRichText: renderVDomRichText } = await load(
      'packages/uni-components/src/vue/rich-text/render-vdom.ts',
      false,
      renderImports
    ))
  }, 20000)

  afterAll(() => {
    dom.window.close()
    previousGlobals.forEach((value, name) => {
      if (value === undefined) delete (global as any)[name]
      else (global as any)[name] = value
    })
  })

  afterEach(() => {
    apps.splice(0).forEach((app) => app.unmount())
    document.body.innerHTML = ''
    expect(errors).not.toHaveBeenCalled()
    errors.mockClear()
    keyReads.mockClear()
    listsCreated.mockClear()
    childScopesCreated.mockClear()
  })

  test.each([false, true])(
    '拆分后的 RichText 保留 ref、深层文本和 selectable 更新（Vapor=%s）',
    async (vapor) => {
      const state = vue.reactive({
        nodes: [{ name: 'p', children: [{ type: 'text', text: 'first' }] }],
        selectable: false,
        userSelect: false,
      })
      const host = document.createElement('div')
      document.body.appendChild(host)
      let rootRef: any
      const render = vapor ? renderVaporRichText : renderVDomRichText
      const define = vapor ? vue.defineVaporComponent : vue.defineComponent
      const app = (vapor ? vue.createVaporApp : vue.createApp)(
        define({
          setup() {
            rootRef = vue.ref(null)
            return render(state, rootRef, jest.fn())
          },
        })
      )
      app.config.errorHandler = errors
      apps.push(app)
      app.mount(host)
      const element = host.querySelector('uni-rich-text')!
      expect(rootRef.value).toBe(element)
      expect(element.textContent).toBe('first')
      expect(element.hasAttribute('selectable')).toBe(false)

      state.nodes[0].children[0].text = 'second'
      state.userSelect = true
      await vue.nextTick()
      expect(host.querySelector('uni-rich-text')).toBe(element)
      expect(element.textContent).toBe('second')
      expect(element.hasAttribute('selectable')).toBe(true)

      state.nodes = '<p>third</p>'
      state.userSelect = false
      await vue.nextTick()
      expect(element.textContent).toBe('third')
      expect(element.hasAttribute('selectable')).toBe(false)
      expect(rootRef.value).toBe(element)
    }
  )

  function mount(nodes: any[], vdom = false) {
    const state = vue.reactive({ nodes })
    const container = document.createElement('div')
    document.body.appendChild(container)
    const app = vdom
      ? vue.createApp({
          setup: () => () =>
            vue.h(
              'div',
              null,
              nodeList2VNode('data-v-test', jest.fn(), state.nodes)
            ),
        })
      : vue.createVaporApp(
          vue.defineVaporComponent({
            setup() {
              return vue.createPlainElement(
                'div',
                null,
                {
                  default: () =>
                    nodeList2Block(() => state.nodes, 'data-v-test', jest.fn()),
                },
                true
              )
            },
          })
        )
    app.config.errorHandler = errors
    app.mount(container)
    apps.push(app)
    return { state, element: container.firstElementChild! }
  }

  test('按 attrs.key 移动原 DOM，保留输入状态', async () => {
    const { state, element } = mount([
      { name: 'input', attrs: { key: 'a', id: 'a' } },
      { name: 'input', attrs: { key: 'b', id: 'b' } },
    ])
    const first = element.querySelector<HTMLInputElement>('#a')!
    first.value = 'typed'
    state.nodes.reverse()
    await vue.nextTick()
    expect(element.querySelector('#a')).toBe(first)
    expect(
      Array.from(element.querySelectorAll('input'), (node) => node.id)
    ).toEqual(['b', 'a'])
    expect(first.value).toBe('typed')
  })

  test('叶子节点不创建空子列表，动态添加 children 后才创建', async () => {
    const { state, element } = mount(
      Array.from({ length: 1000 }, (_, key) => ({
        name: 'p',
        attrs: { key },
      }))
    )
    expect(listsCreated).toHaveBeenCalledTimes(1)
    expect(childScopesCreated).not.toHaveBeenCalled()
    const paragraph = element.querySelector('p')!
    state.nodes[0].children = []
    await vue.nextTick()
    expect(listsCreated).toHaveBeenCalledTimes(1)

    state.nodes[0].children.push({ type: 'text', text: 'first' })
    await vue.nextTick()
    expect(listsCreated).toHaveBeenCalledTimes(2)
    expect(childScopesCreated).toHaveBeenCalledTimes(1)
    expect(element.querySelector('p')).toBe(paragraph)
    expect(paragraph.textContent).toBe('first')

    state.nodes[0].children[0].text = 'second'
    await vue.nextTick()
    expect(paragraph.textContent).toBe('second')
    expect(listsCreated).toHaveBeenCalledTimes(2)
    expect(childScopesCreated).toHaveBeenCalledTimes(1)
  })

  test('内容覆盖移除后，空 children 不创建列表，随后新增仍可渲染', async () => {
    const { state, element } = mount([
      { name: 'p', attrs: { innerHTML: 'raw' }, children: [] },
    ])
    const paragraph = element.querySelector('p')!
    delete state.nodes[0].attrs.innerHTML
    await vue.nextTick()
    expect(paragraph.textContent).toBe('')
    expect(listsCreated).toHaveBeenCalledTimes(1)
    expect(childScopesCreated).not.toHaveBeenCalled()
    state.nodes[0].children.push({ type: 'text', text: 'child' })
    await vue.nextTick()
    expect(paragraph.textContent).toBe('child')
    expect(listsCreated).toHaveBeenCalledTimes(2)
    expect(childScopesCreated).toHaveBeenCalledTimes(1)
  })

  test('select value 的初始值、option 更新及移除绑定与 VDOM 一致', async () => {
    const prop = 'value'
    const nodes = () => [
      {
        name: 'select',
        attrs: { [prop]: 'b' },
        children: ['a', 'b'].map((value) => ({
          name: 'option',
          attrs: { value },
          children: [{ type: 'text', text: value }],
        })),
      },
    ]
    const instances = [mount(nodes()), mount(nodes(), true)]
    const value = (instance: (typeof instances)[number]) =>
      instance.element.querySelector<HTMLSelectElement>('select')!.value
    expect(instances.map(value)).toEqual(['b', 'b'])

    for (const { state } of instances) {
      state.nodes[0].children.reverse()
    }
    await vue.nextTick()
    expect(instances.map(value)).toEqual(['b', 'b'])

    for (const { state } of instances) {
      state.nodes[0].children[0].attrs.value = 'c'
    }
    await vue.nextTick()
    expect(instances.map(value)).toEqual(['', ''])

    for (const { state } of instances) {
      state.nodes[0].attrs[prop] = 'c'
    }
    await vue.nextTick()
    expect(instances.map(value)).toEqual(['c', 'c'])

    for (const { state } of instances) {
      delete state.nodes[0].attrs[prop]
      state.nodes[0].children[0].attrs.value = 'd'
    }
    await vue.nextTick()
    expect(instances.map(value)).toEqual(['', ''])
  })

  test('select .value 的初始值及 option 更新复用 Vapor 标准同步机制', async () => {
    // .value 强制设置 prop；VDOM 不会像 value 一样在子节点更新后重新设置，单独验证 Vapor 语义。
    const { state, element } = mount([
      {
        name: 'select',
        attrs: { '.value': 'b' },
        children: ['a', 'b'].map((value) => ({
          name: 'option',
          attrs: { value },
        })),
      },
    ])
    const select = element.querySelector<HTMLSelectElement>('select')!
    expect(select.value).toBe('b')
    state.nodes[0].children.reverse()
    await vue.nextTick()
    expect(select.value).toBe('b')
    state.nodes[0].children[0].attrs.value = 'c'
    await vue.nextTick()
    expect(select.value).toBe('')
    state.nodes[0].attrs['.value'] = 'c'
    await vue.nextTick()
    expect(select.value).toBe('c')
    delete state.nodes[0].attrs['.value']
    state.nodes[0].children[0].attrs.value = 'd'
    await vue.nextTick()
    expect(select.value).toBe('')
  })

  test('select 初始无 option 时，动态新增及文本值更新与 VDOM 一致', async () => {
    const instances = [false, true].map((vdom) =>
      mount([{ name: 'select', attrs: { value: 'b' }, children: [] }], vdom)
    )
    const values = () =>
      instances.map(
        ({ element }) =>
          element.querySelector<HTMLSelectElement>('select')!.value
      )
    expect(values()).toEqual(['', ''])
    for (const { state } of instances) {
      state.nodes[0].children.push(
        { name: 'option', children: [{ type: 'text', text: 'a' }] },
        { name: 'option', children: [{ type: 'text', text: 'b' }] }
      )
    }
    await vue.nextTick()
    expect(values()).toEqual(['b', 'b'])
    for (const { state } of instances) {
      state.nodes[0].children[1].children[0].text = 'c'
    }
    await vue.nextTick()
    expect(values()).toEqual(['', ''])
    for (const { state } of instances) {
      state.nodes[0].attrs.value = 'c'
    }
    await vue.nextTick()
    expect(values()).toEqual(['c', 'c'])
  })

  test('单个无 key 文本更新不重新提取兄弟列表的 key', async () => {
    const { state, element } = mount(
      Array.from({ length: 1000 }, (_, i) => ({
        type: 'text',
        text: String(i),
      }))
    )
    keyReads.mockClear()
    state.nodes[0].text = 'changed'
    await vue.nextTick()
    expect(element.textContent).toMatch(/^changed1/)
    expect(keyReads).not.toHaveBeenCalled()
  })

  test('无 key 按位置复用，不与数字 key 冲突', async () => {
    const { state, element } = mount([
      { name: 'input', attrs: { key: 1, id: 'keyed' } },
      { name: 'input', attrs: { id: 'unkeyed' } },
    ])
    const keyed = element.querySelector<HTMLInputElement>('#keyed')!
    const unkeyed = element.querySelector('#unkeyed')!
    keyed.value = 'typed'
    state.nodes = [
      { name: 'input', attrs: { key: 1, id: 'keyed' } },
      { name: 'input', attrs: { id: 'updated' } },
    ]
    await vue.nextTick()
    expect(element.querySelector('#keyed')).toBe(keyed)
    expect(element.querySelector('#updated')).toBe(unkeyed)
    expect(keyed.value).toBe('typed')
  })

  test('显式 key 的标签更新不重新提取兄弟列表的 key', async () => {
    const { state, element } = mount(
      Array.from({ length: 1000 }, (_, i) => ({
        type: 'node',
        name: 'p',
        attrs: { key: i },
      }))
    )
    const sibling = element.querySelectorAll('p')[1]
    keyReads.mockClear()
    state.nodes[0].name = 'span'
    await vue.nextTick()
    expect(element.firstElementChild!.tagName).toBe('SPAN')
    expect(element.querySelectorAll('p')[0]).toBe(sibling)
    expect(keyReads).not.toHaveBeenCalled()
  })

  test.each([false, true])(
    '混合 key 重排保留无 key 节点及状态（替换数组：%s）',
    async (replace) => {
      const { state, element } = mount([
        { name: 'input', attrs: { id: 'unkeyed' } },
        { name: 'input', attrs: { key: 'keyed', id: 'keyed' } },
      ])
      const input = element.querySelector<HTMLInputElement>('#unkeyed')!
      input.value = 'typed'
      input.focus()
      if (replace) {
        state.nodes = [
          { name: 'input', attrs: { key: 'keyed', id: 'keyed' } },
          { name: 'input', attrs: { id: 'unkeyed' } },
        ]
      } else state.nodes.reverse()
      await vue.nextTick()
      expect(element.querySelector('#unkeyed')).toBe(input)
      expect(input.value).toBe('typed')
      expect(document.activeElement).toBe(input)
      expect(
        Array.from(element.querySelectorAll('input'), (node) => node.id)
      ).toEqual(['keyed', 'unkeyed'])
    }
  )

  test('混合 key 插入同类型节点时优先保留首尾匹配', async () => {
    const { state, element } = mount([
      { name: 'p', attrs: { key: 'keyed' } },
      { name: 'input', attrs: { id: 'tail' } },
    ])
    const tail = element.querySelector<HTMLInputElement>('#tail')!
    tail.value = 'typed'
    state.nodes = [
      { name: 'input', attrs: { id: 'head' } },
      { name: 'p', attrs: { key: 'keyed' } },
      { name: 'input', attrs: { id: 'tail' } },
    ]
    await vue.nextTick()
    expect(element.querySelector('#tail')).toBe(tail)
    expect(tail.value).toBe('typed')
  })

  test('稀疏数组按无效节点处理，仍能更新', async () => {
    const initial = new Array(2)
    initial[1] = { type: 'node', name: 'input', attrs: { key: 'input' } }
    const { state, element } = mount(initial)
    const input = element.querySelector('input')!
    state.nodes.reverse()
    await vue.nextTick()
    expect(element.querySelector('input')).toBe(input)
  })

  test.each([
    [
      ['p', 'span', 'p'],
      ['span', 'p', 'span'],
    ],
    [
      ['key:p', 'input'],
      ['input', 'key:p', 'input'],
    ],
    [
      ['key:p', 'input'],
      ['key:span', 'input', 'input'],
    ],
    [
      ['text:empty', 'input'],
      ['invalid', 'input', 'input'],
    ],
    [
      ['input', 'key:p', 'span', 'input'],
      ['span', 'input', 'key:p'],
    ],
  ])('无 key 身份匹配与 VDOM 一致：%j → %j', async (initial, next) => {
    function nodes(tags: string[]) {
      return tags.map((tag, index) => {
        if (tag === 'text:empty') return { type: 'text', text: '' }
        if (tag === 'invalid') return { type: 'invalid' }
        const keyed = tag.startsWith('key:')
        return {
          type: 'node',
          name: keyed ? tag.slice(4) : tag,
          attrs: { id: String(index), ...(keyed ? { key: 'keyed' } : {}) },
        }
      })
    }
    const vapor = mount(nodes(initial))
    const vdom = mount(nodes(initial), true)
    for (const instance of [vapor, vdom]) {
      Array.from(instance.element.children).forEach((node, index) => {
        ;(node as any).__identity = index
      })
      instance.state.nodes = nodes(next)
    }
    await vue.nextTick()
    const identities = (element: Element) =>
      Array.from(element.children, (node) => [
        node.tagName,
        (node as any).__identity,
      ])
    expect(identities(vapor.element)).toEqual(identities(vdom.element))
  })

  test.each(['innerHTML', 'textContent', '.innerHTML', '.textContent'])(
    '%s 覆盖 children，切换后保留宿主和焦点，列表仍可更新',
    async (prop) => {
      const { state, element } = mount([
        {
          name: 'p',
          attrs: { key: 'content', tabIndex: 0, [prop]: 'raw' },
          children: [{ type: 'text', text: 'child' }],
        },
      ])
      const paragraph = element.querySelector('p')!
      paragraph.focus()
      expect(paragraph.innerHTML).toBe('raw')
      state.nodes[0].attrs[prop] = 'new'
      state.nodes[0].children.push({ type: 'text', text: 'added' })
      await vue.nextTick()
      expect(element.querySelector('p')!.innerHTML).toBe('new')
      delete state.nodes[0].attrs[prop]
      await vue.nextTick()
      expect(element.querySelector('p')).toBe(paragraph)
      expect(document.activeElement).toBe(paragraph)
      expect(element.querySelector('p')!.textContent).toBe('childadded')
      state.nodes[0].children[0].text = 'updated'
      await vue.nextTick()
      expect(element.querySelector('p')!.textContent).toBe('updatedadded')
      state.nodes[0].attrs[prop] = 'override'
      await vue.nextTick()
      expect(element.querySelector('p')!.innerHTML).toBe('override')
      state.nodes[0].children[0].text = 'hidden'
      await vue.nextTick()
      expect(paragraph.innerHTML).toBe('override')
      state.nodes[0].attrs[prop] = null
      await vue.nextTick()
      expect(paragraph.textContent).toBe('hiddenadded')
      expect(document.activeElement).toBe(paragraph)
    }
  )
})
