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
const file = 'packages/uni-components/src/vue/movable-area/index.tsx'

async function preprocess(vapor: boolean, source = file) {
  const plugin = jscc({
    values: { _X_: 1, _X_VAPOR_: vapor ? 1 : 0, _NODE_JS_: 0 },
  })
  return (await (plugin.load as any).call({}, path.join(root, source)))
    .code as string
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

describe('Web Vapor MovableArea', () => {
  let vue: any
  let MovableArea: any
  let MovableView: any
  let Child: any
  let dom: any
  let app: any
  let host: HTMLElement
  const contexts = new Map<number, any>()
  const errors = jest.fn()
  const resize = jest.fn()
  const globals = new Map<string, any>()
  const frames = new Map<number, FrameRequestCallback>()
  const sensors = new Set<Function>()
  let frameId = 0

  // 初始化需要加载真实运行时并在子进程中编译两个组件，给 CI 冷启动预留时间。
  beforeAll(async () => {
    const { JSDOM } = jest.requireActual('jsdom')
    dom = new JSDOM(
      '<!DOCTYPE html><head><style>uni-movable-area{padding:0;border:0 solid}</style></head><body></body>'
    )
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
      'requestAnimationFrame',
      'cancelAnimationFrame',
    ]) {
      globals.set(name, (global as any)[name])
      ;(global as any)[name] = name === '__PLATFORM__' ? 'h5' : dom.window[name]
    }
    Object.assign(global, {
      __X__: true,
      __NODE_JS__: false,
      requestAnimationFrame: (callback: FrameRequestCallback) => {
        frames.set(++frameId, callback)
        return frameId
      },
      cancelAnimationFrame: (id: number) => frames.delete(id),
    })
    vue = jest.requireActual(
      path.join(root, 'packages/uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js')
    )
    const nodeRequire = createRequire(
      path.join(root, 'packages/uni-h5/package.json')
    )
    const jsx = nodeRequire.resolve('vue-jsx')
    const compiler = nodeRequire.resolve('@vue-jsx/compiler', {
      paths: [path.dirname(jsx)],
    })
    const helper = path.join(
      path.dirname(
        nodeRequire.resolve('@vue-jsx/runtime', { paths: [path.dirname(jsx)] })
      ),
      'vapor.js'
    )
    const jsxRuntime = evaluate(fs.readFileSync(helper, 'utf8'), { vue })
    const children = evaluate(
      await preprocess(
        true,
        'packages/uni-components/src/vue/movable-area/children-vapor.ts'
      ),
      { vue }
    )
    class UniElement extends HTMLElement {
      attachVmProps() {}
      getBoundingClientRect(): DOMRect {
        const width = this.localName === 'uni-movable-area' ? 200 : 20
        const height = this.localName === 'uni-movable-area' ? 100 : 20
        return {
          x: 0,
          y: 0,
          top: 0,
          left: 0,
          right: width,
          bottom: height,
          width,
          height,
          toJSON() {},
        }
      }
    }
    dom.window.customElements.define('uni-movable-area', UniElement)
    dom.window.customElements.define(
      'uni-movable-view',
      class extends UniElement {}
    )
    const sensor = vue.defineVaporComponent({
      setup(_: any, { attrs }: any) {
        resize.mockImplementation(() => attrs.onResize())
        const callback = () => attrs.onResize()
        sensors.add(callback)
        vue.onUnmounted(() => sensors.delete(callback))
        return document.createElement('uni-resize-sensor')
      },
    })
    // 编译器为 ESM，使用 Node 执行，避免改变仓库现有 Jest 的 CommonJS 配置。
    const compile = async (source: string) =>
      execFileSync(
        process.execPath,
        [
          '-e',
          `const fs = require('fs'); const compiler = require(${JSON.stringify(
            compiler
          )}); process.stdout.write(compiler.transform(fs.readFileSync(0, 'utf8'), {
          filename: ${JSON.stringify(path.join(root, source))}, vapor: true
        }).code)`,
        ],
        { input: await preprocess(true, source), encoding: 'utf8' }
      )
    const imports = {
      vue,
      '/vue-jsx/vapor': jsxRuntime,
      './children-vapor': children,
      '../../helpers/component': {
        defineBuiltInComponent(options: any) {
          const setup = options.setup
          options.setup = (props: any, ctx: any) => setup(props, ctx)()
          return vue.defineVaporComponent(options)
        },
      },
      '../../helpers/useEvent': { withWebEvent: (fn: Function) => fn },
      '../../helpers/useAttrs': {
        useAttrs: () => ({
          $listeners: vue.ref({}),
          $attrs: vue.ref({}),
          $excludeAttrs: vue.ref({}),
        }),
      },
      '../../helpers/scroll': {
        initScrollBounce() {},
        disableScrollBounce() {},
      },
      '../../helpers/UniElement': { UniElement },
      '../resize-sensor/index': { default: sensor },
      '../../components/movableArea': jest.requireActual(
        path.join(root, 'packages/uni-components/src/components/movableArea')
      ),
    }
    MovableArea = evaluate(await compile(file), imports).default
    const load = async (source: string, dependencies = {}) =>
      evaluate(
        await preprocess(true, 'packages/uni-components/src/' + source),
        { vue, ...dependencies }
      )
    const shared = jest.requireActual(
      path.join(
        root,
        'packages/uni-cli-shared/lib/dom2/web/@vue/shared/dist/shared.cjs.js'
      )
    )
    MovableView = evaluate(
      await compile('packages/uni-components/src/vue/movable-view/index.tsx'),
      {
        ...imports,
        './frame-vapor': await load('vue/movable-view/frame-vapor.ts'),
        '../../helpers/useTouchtrack': await load('helpers/useTouchtrack.ts', {
          '@vue/shared': shared,
        }),
        '../../helpers/useEvent': await load('helpers/useEvent.ts', {
          '@dcloudio/uni-shared': { normalizeTarget: (event: Event) => event },
          '@dcloudio/uni-core': { createNativeEvent: (event: Event) => event },
        }),
        '../../components/movable-view': await load(
          'components/movable-view/index.ts',
          {
            './utils': await load('components/movable-view/utils.js'),
          }
        ),
      }
    ).default
    // 与 MovableView 使用相同的 DOM ref 和挂载/卸载注册协议，记录区域算法调用。
    Child = vue.defineVaporComponent({
      props: ['id'],
      setup(props: any) {
        const element = document.createElement('uni-movable-view')
        element.dataset.id = props.id
        element.appendChild(document.createElement('span'))
        const context = {
          rootRef: vue.ref(element),
          setParent: jest.fn(),
          _setScale: jest.fn(),
          _endScale: jest.fn(),
        }
        contexts.set(props.id, context)
        const add = vue.inject('addMovableViewContext')
        const remove = vue.inject('removeMovableViewContext')
        vue.onMounted(() => add(context))
        vue.onUnmounted(() => remove(context))
        return element
      },
    })
  }, 30000)

  beforeEach(() => {
    contexts.clear()
    errors.mockClear()
    resize.mockClear()
    frames.clear()
    sensors.clear()
    host = document.createElement('div')
    document.body.appendChild(host)
  })

  afterEach(() => {
    app?.unmount()
    app = undefined
    host?.remove()
    expect(errors).not.toHaveBeenCalled()
  })

  afterAll(() => {
    dom.window.close()
    globals.forEach((value, name) => {
      if (value === undefined) delete (global as any)[name]
      else (global as any)[name] = value
    })
  })

  function mount(slot: Function, scaleArea = true) {
    app = vue.createVaporApp(
      vue.defineVaporComponent({
        setup: () =>
          vue.createComponent(
            MovableArea,
            { scaleArea: () => scaleArea },
            slot
          ),
      })
    )
    app.config.errorHandler = errors
    app.mount(host)
  }

  function pinch(target: HTMLElement, secondTarget = target) {
    for (const [type, distance] of [
      ['touchstart', 10],
      ['touchmove', 20],
      ['touchend', 0],
    ] as const) {
      touch(type, distance, target, secondTarget)
    }
  }

  function touch(
    type: string,
    distance: number,
    target = host.querySelector('uni-movable-view')!,
    secondTarget = target
  ) {
    const event = new dom.window.Event(type, { cancelable: true })
    Object.assign(event, {
      touches: distance
        ? [
            { pageX: 0, pageY: 0, target },
            { pageX: distance, pageY: 0, target: secondTarget },
          ]
        : [],
      changedTouches: [],
    })
    host.querySelector('uni-movable-area')!.dispatchEvent(event)
  }

  function flushFrames() {
    const callbacks = [...frames.values()]
    frames.clear()
    callbacks.forEach((callback) => callback(16))
  }

  async function mountViews(
    ids: any,
    scaleArea = true,
    scaleValue = vue.ref(1)
  ) {
    const scale = jest.fn()
    mount(
      () =>
        vue.createFor(
          () => ids.value,
          (id: any) =>
            vue.createComponent(MovableView, {
              scale: () => true,
              scaleValue: () => scaleValue.value,
              animation: () => false,
              direction: () => 'all',
              'data-id': () => String(id.value),
              onScale: () => (event: any) =>
                scale(id.value, event.detail.scale),
            }),
          (id: number) => id
        ),
      scaleArea
    )
    await vue.nextTick()
    sensors.forEach((callback) => callback())
    await vue.nextTick()
    scale.mockClear()
    return scale
  }

  function expectScale(id: number, scale: number) {
    expect(
      (host.querySelector(`[data-id="${id}"]`) as HTMLElement).style.transform
    ).toContain(`scale(${scale})`)
  }

  test('真实子组件分别更新，同一帧保留最新缩放，重排及新增不丢任务', async () => {
    const ids = vue.ref([1, 2])
    const scale = await mountViews(ids)
    touch('touchstart', 10)
    touch('touchmove', 15)
    touch('touchmove', 20)
    expect(frames.size).toBe(2)
    flushFrames()
    touch('touchend', 0)
    for (const id of [1, 2]) {
      expectScale(id, 2)
      expect(scale).toHaveBeenCalledWith(id, 2)
    }
    expect(scale).toHaveBeenCalledTimes(2)
    ids.value = [2, 3, 1]
    await vue.nextTick()
    pinch(host.querySelector('uni-movable-view') as HTMLElement)
    expectScale(1, 4)
    expectScale(2, 4)
    expectScale(3, 2)
    expect(frames.size).toBe(0)
  })

  test('结束手势立即提交待执行值，下一次手势基准正确', async () => {
    const scale = await mountViews(vue.ref([1, 2]))
    pinch(host.querySelector('uni-movable-view') as HTMLElement)
    expect(frames.size).toBe(0)
    pinch(host.querySelector('uni-movable-view') as HTMLElement)
    for (const id of [1, 2]) expectScale(id, 4)
    expect(scale.mock.calls).toEqual([
      [1, 2],
      [2, 2],
      [1, 4],
      [2, 4],
    ])
  })

  test('非区域缩放只更新目标，卸载取消待执行任务', async () => {
    const ids = vue.ref([1, 2])
    const scale = await mountViews(ids, false)
    touch('touchstart', 10)
    touch('touchmove', 20)
    expect(frames.size).toBe(1)
    flushFrames()
    touch('touchend', 0)
    expectScale(1, 2)
    expectScale(2, 1)
    scale.mockClear()
    touch('touchstart', 10)
    touch('touchmove', 20)
    ids.value = [2]
    await vue.nextTick()
    expect(frames.size).toBe(0)
    flushFrames()
    expect(scale).not.toHaveBeenCalled()
  })

  test('属性更新或尺寸重算后，不执行旧手势帧', async () => {
    const scaleValue = vue.ref(1)
    await mountViews(vue.ref([1]), true, scaleValue)
    touch('touchstart', 10)
    touch('touchmove', 20)
    scaleValue.value = 3
    await vue.nextTick()
    expect(frames.size).toBe(0)
    flushFrames()
    expectScale(1, 3)
    touch('touchend', 0)
    touch('touchstart', 10)
    touch('touchmove', 20)
    sensors.forEach((callback) => callback())
    expect(frames.size).toBe(0)
    flushFrames()
    expectScale(1, 3)
  })

  test('拖动与缩放共用节点级调度，两个节点不会丢失位移', async () => {
    await mountViews(vue.ref([1, 2]))
    const elements = Array.from(host.querySelectorAll('uni-movable-view'))
    function drag(element: Element, type: string, x: number) {
      const event = new dom.window.Event(type, {
        cancelable: true,
        bubbles: true,
      })
      const point = { pageX: x, pageY: 0, target: element }
      Object.assign(event, {
        touches: type === 'touchend' ? [] : [point],
        changedTouches: [point],
      })
      element.dispatchEvent(event)
    }
    for (const element of elements) {
      drag(element, 'touchstart', 0)
      drag(element, 'touchmove', 10)
      drag(element, 'touchmove', 20)
    }
    expect(frames.size).toBe(2)
    for (const element of elements) {
      drag(element, 'touchend', 20)
      expect((element as HTMLElement).style.transform).toContain(
        'translateX(20px)'
      )
    }
    expect(frames.size).toBe(0)
  })

  test('单指切换双指后结束，冒泡到区域前不丢弃最后的缩放', async () => {
    await mountViews(vue.ref([1, 2]))
    const element = host.querySelector('uni-movable-view')!
    const point = { pageX: 0, pageY: 0, target: element }
    for (const [type, touches] of [
      ['touchstart', [point]],
      ['touchstart', [point, { ...point, pageX: 10 }]],
      ['touchmove', [point, { ...point, pageX: 20 }]],
      ['touchend', []],
    ] as const) {
      const event = new dom.window.Event(type, {
        bubbles: true,
        cancelable: true,
      })
      Object.assign(event, { touches, changedTouches: [point] })
      element.dispatchEvent(event)
    }
    expectScale(1, 2)
    expectScale(2, 2)
    expect(frames.size).toBe(0)
  })

  test('Vapor 不依赖 VNode，非 Vapor 保留原节点收集与 App rebuild', async () => {
    const vapor = await preprocess(true)
    expect(vapor).not.toMatch(/VNode|flatVNode|useRebuild|children-vdom/)
    expect(vapor).toContain("from './children-vapor'")
    expect(
      await preprocess(
        true,
        'packages/uni-components/src/vue/movable-area/children-vapor.ts'
      )
    ).not.toMatch(/VNode|flatVNode|useRebuild/)
    const standard = await preprocess(false)
    expect(standard).toContain("from './children-vdom'")
    expect(standard).not.toContain('children-vapor')
    const vdom = await preprocess(
      false,
      'packages/uni-components/src/vue/movable-area/children-vdom.ts'
    )
    expect(vdom).toContain('flatVNode(defaultSlots)')
    expect(vdom).toContain('useRebuild(')
    expect(vdom).toContain('(movableViewItem as VNode).el')
  })

  test.each(['h5', 'app'])(
    '拆分后保留旧 %s 子节点收集、上下文顺序和移除行为',
    async (platform) => {
      ;(global as any).__PLATFORM__ = platform
      try {
        const provided = new Map<string, Function>()
        const rebuild = jest.fn()
        const flatVNode = jest.fn((nodes) => nodes)
        const setContexts = jest.fn()
        const { useMovableAreaChildren } = evaluate(
          await preprocess(
            false,
            'packages/uni-components/src/vue/movable-area/children-vdom.ts'
          ),
          {
            vue: {
              provide: (name: string, value: Function) =>
                provided.set(name, value),
              markRaw: (context: any) => context,
            },
            '../../helpers/flatVNode': { flatVNode },
            '../../helpers/useRebuild': { useRebuild: rebuild },
          }
        )
        const rootRef = { value: document.createElement('div') }
        const first = { rootRef: { value: document.createElement('div') } }
        const second = { rootRef: { value: document.createElement('div') } }
        rootRef.value.append(second.rootRef.value, first.rootRef.value)
        const nodes = [second, first].map((context) => ({
          el: context.rootRef.value,
        }))
        const slot = jest.fn(() => nodes)
        const render = useMovableAreaChildren(
          rootRef,
          { default: slot },
          setContexts
        )
        if (platform === 'app') {
          expect(render()).toEqual([])
          expect(rebuild).toHaveBeenCalledTimes(1)
          rebuild.mock.calls[0][0]()
          expect(render()).toBe(rootRef.value.children)
          expect(flatVNode).not.toHaveBeenCalled()
        } else {
          expect(render()).toBe(nodes)
          expect(flatVNode).toHaveBeenCalledWith(nodes)
          expect(rebuild).not.toHaveBeenCalled()
        }
        expect(slot).toHaveBeenCalled()
        const add = provided.get('addMovableViewContext')!
        const remove = provided.get('removeMovableViewContext')!
        add(first)
        add(second)
        expect(setContexts).toHaveBeenLastCalledWith([second, first])
        remove(first)
        expect(setContexts).toHaveBeenLastCalledWith([second])
        setContexts.mockClear()
        remove(first)
        expect(setContexts).not.toHaveBeenCalled()
      } finally {
        ;(global as any).__PLATFORM__ = 'h5'
      }
    }
  )

  test('静态 slot 正常渲染，仅直接子节点参与区域缩放和尺寸更新', () => {
    mount(() => [
      vue.createComponent(Child, { id: () => 1 }),
      vue.createPlainElement('div', null, () =>
        vue.createComponent(Child, { id: () => 2 })
      ),
    ])
    expect(host.querySelectorAll('uni-movable-view')).toHaveLength(2)
    pinch(contexts.get(1).rootRef.value)
    resize()
    expect(contexts.get(1)._setScale).toHaveBeenCalledWith(2)
    expect(contexts.get(1)._endScale).toHaveBeenCalledTimes(1)
    expect(contexts.get(1).setParent).toHaveBeenCalled()
    expect(contexts.get(2)._setScale).not.toHaveBeenCalled()
    expect(contexts.get(2)._endScale).not.toHaveBeenCalled()
    expect(contexts.get(2).setParent).not.toHaveBeenCalled()
  })

  test('动态列表增删、重排保留 DOM 与上下文，卸载后不再参与缩放', async () => {
    const ids = vue.ref([1, 2])
    mount(() =>
      vue.createFor(
        () => ids.value,
        (id: any) => vue.createComponent(Child, { id: () => id.value }),
        (id: number) => id
      )
    )
    const first = contexts.get(1)
    const second = contexts.get(2)
    ids.value = [2, 3, 1]
    await vue.nextTick()
    expect(
      Array.from(host.querySelectorAll('uni-movable-view'), (el) =>
        el.getAttribute('data-id')
      )
    ).toEqual(['2', '3', '1'])
    expect(contexts.get(1)).toBe(first)
    expect(contexts.get(2)).toBe(second)
    pinch(first.rootRef.value)
    for (const context of contexts.values()) {
      expect(context._setScale).toHaveBeenCalledTimes(1)
      context._setScale.mockClear()
    }
    ids.value = []
    await vue.nextTick()
    expect(host.querySelectorAll('uni-movable-view')).toHaveLength(0)
    pinch(host.querySelector('uni-movable-area') as HTMLElement)
    for (const context of contexts.values()) {
      expect(context._setScale).not.toHaveBeenCalled()
    }
    ids.value = [4]
    await vue.nextTick()
    pinch(contexts.get(4).rootRef.value)
    expect(contexts.get(4)._setScale).toHaveBeenCalledWith(2)
    expect(first._setScale).not.toHaveBeenCalled()
  })

  test('非区域缩放只操作两指命中的同一子节点，后代目标和跨子节点判断不变', () => {
    mount(
      () => [1, 2].map((id) => vue.createComponent(Child, { id: () => id })),
      false
    )
    const first = contexts.get(1)
    const second = contexts.get(2)
    pinch(first.rootRef.value.firstChild)
    expect(first._setScale).toHaveBeenCalledWith(2)
    expect(first._endScale).toHaveBeenCalledTimes(1)
    expect(second._setScale).not.toHaveBeenCalled()
    first._setScale.mockClear()
    pinch(first.rootRef.value, second.rootRef.value)
    expect(first._setScale).not.toHaveBeenCalled()
    expect(second._setScale).not.toHaveBeenCalled()
  })

  test('动态条件 slot 从空节点切换，卸载和重新挂载正确更新上下文', async () => {
    const visible = vue.ref(false)
    mount(() =>
      vue.createIf(
        () => visible.value,
        () => vue.createComponent(Child, { id: () => 1 })
      )
    )
    expect(contexts.size).toBe(0)
    visible.value = true
    await vue.nextTick()
    const previous = contexts.get(1)
    pinch(previous.rootRef.value)
    expect(previous._setScale).toHaveBeenCalledTimes(1)
    visible.value = false
    await vue.nextTick()
    pinch(host.querySelector('uni-movable-area') as HTMLElement)
    expect(previous._setScale).toHaveBeenCalledTimes(1)
    visible.value = true
    await vue.nextTick()
    const current = contexts.get(1)
    expect(current).not.toBe(previous)
    pinch(current.rootRef.value)
    expect(current._setScale).toHaveBeenCalledTimes(1)
    expect(previous._setScale).toHaveBeenCalledTimes(1)
  })
})
