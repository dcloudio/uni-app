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
async function preprocess(file: string, vapor = true, node = false) {
  const plugin = jscc({
    values: { _X_: 1, _X_VAPOR_: +vapor, _NODE_JS_: +node },
  })
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

describe('Web Vapor Video 原生宿主', () => {
  let dom: any
  let vue: any
  let Video: any
  let UniVideoElement: any
  let UniElement: any
  let elements: any
  let VideoContext: any
  let loadVdomVideo: () => Promise<any>
  let compileVideoEntry: (ssr: boolean) => Promise<string>
  let createVideoWithContent: (render: () => HTMLElement) => Promise<any>
  const globals = new Map<string, any>()
  const apps: any[] = []
  const methods = new Map<string, Function>()
  const play = jest.fn(function (this: HTMLVideoElement) {
    this.dispatchEvent(new dom.window.Event('play'))
    return Promise.resolve()
  })
  const pause = jest.fn(function (this: HTMLVideoElement) {
    this.dispatchEvent(new dom.window.Event('pause'))
  })
  const directory = 'packages/uni-h5/src/view/components/video/'

  beforeAll(async () => {
    const { JSDOM } = jest.requireActual('jsdom')
    dom = new JSDOM('<!DOCTYPE html><body></body>', {
      url: 'https://example.test/',
    })
    for (const name of [
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
      '__X__',
      '__NODE_JS__',
    ]) {
      globals.set(name, (global as any)[name])
      ;(global as any)[name] = dom.window[name]
    }
    Object.assign(global, { __X__: true, __NODE_JS__: false })
    // JSDOM 不实现媒体播放；只替代浏览器播放方法，组件事件、状态和控制逻辑使用真实实现。
    Object.assign(dom.window.HTMLMediaElement.prototype, { play, pause })
    vue = jest.requireActual(
      path.join(root, 'packages/uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js')
    )
    const shared = jest.requireActual(
      '../../uni-cli-shared/lib/dom2/web/@vue/shared/dist/shared.cjs.js'
    )
    const uniShared = jest.requireActual('@dcloudio/uni-shared')
    const core = {
      initI18nVideoMsgsOnce() {},
      createNativeEvent: jest.fn(),
      useCurrentPageId: () => 1,
      getCurrentPageId: () => 1,
      registerViewMethod: (_page: number, id: string, callback: Function) =>
        methods.set(id, callback),
      unregisterViewMethod: (_page: number, id: string) => methods.delete(id),
    }
    const load = async (file: string, imports = {}) =>
      evaluate(await preprocess(file), {
        vue,
        '@vue/shared': shared,
        '@dcloudio/uni-shared': uniShared,
        '@dcloudio/uni-core': core,
        ...imports,
      })
    UniElement = (await load(components + 'helpers/UniElement-vapor.ts'))
      .UniElement
    elements = await load(components + 'vue/web-vapor-elements.ts', {
      '../helpers/UniElement': { UniElement },
    })
    elements.installWebVaporElements(dom.window)
    const helper = await load(components + 'helpers/component.ts', {
      './component-vapor': await load(
        components + 'helpers/component-vapor.ts'
      ),
      './animation': { default: {} },
    })
    const helpers = {
      ...helper,
      ...elements,
      ...(await load(components + 'helpers/useEvent.ts')),
      ...(await load(components + 'helpers/useAttrs.ts')),
      ...(await load(components + 'helpers/useContextInfo.ts')),
      ...(await load(components + 'helpers/useSubscribe.ts')),
      ...(await load(components + 'helpers/useUserAction.ts')),
    }
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
    const jsx = evaluate(fs.readFileSync(runtime, 'utf8'), { vue })
    const compile = async (file: string, ssr = false) =>
      execFileSync(
        process.execPath,
        [
          '-e',
          `
      const fs = require('fs'); const compiler = require(${JSON.stringify(
        compiler
      )});
      process.stdout.write(compiler.transform(fs.readFileSync(0, 'utf8'), {filename: 'video.tsx', vapor: true, ssr: ${ssr}}).code)
    `,
        ],
        {
          input: await preprocess(directory + file, true, ssr),
          encoding: 'utf8',
        }
      )
    compileVideoEntry = (ssr) => compile('index-vapor.tsx', ssr)
    const business = evaluate(await compile('useVideo.tsx'), {
      vue,
      '/vue-jsx/vapor': jsx,
      '@vue/shared': shared,
      '@dcloudio/uni-shared': uniShared,
      '@dcloudio/uni-components': helpers,
      '@dcloudio/uni-core': core,
      '@dcloudio/uni-platform': { getRealPath: (src: string) => src },
    })
    const module = evaluate(await compile('index-vapor.tsx'), {
      vue,
      '/vue-jsx/vapor': jsx,
      '@dcloudio/uni-components': helpers,
      './useVideo': business,
    })
    Video = module.default
    UniVideoElement = module.UniVideoElement
    createVideoWithContent = async (render) =>
      evaluate(await compileVideoEntry(false), {
        vue,
        '/vue-jsx/vapor': jsx,
        '@dcloudio/uni-components': helpers,
        './useVideo': {
          videoProps: business.videoProps,
          videoEmits: business.videoEmits,
          // 单独验证真实入口的固定容器接管，避免内部控制栏 JSX 的接管问题干扰定位。
          useVideoComponent: () => ({
            rootRef: vue.shallowRef(),
            toggleControls() {},
            methods: {},
            render,
          }),
        },
      }).default
    loadVdomVideo = async () => {
      // 非 Vapor 使用框架原有的 Babel JSX 插件，避免只验证源码字符串而漏掉渲染变化。
      const babelRequire = createRequire(
        nodeRequire.resolve('@vitejs/plugin-vue-jsx')
      )
      const compileVdom = async (file: string) =>
        execFileSync(
          process.execPath,
          [
            '-e',
            `
        const fs = require('fs');
        const babel = require(${JSON.stringify(
          babelRequire.resolve('@babel/core')
        )});
        process.stdout.write(babel.transformSync(fs.readFileSync(0, 'utf8'), {
          filename: 'video.tsx', babelrc: false, configFile: false,
          plugins: [
            [require(${JSON.stringify(
              babelRequire.resolve('@vue/babel-plugin-jsx')
            )}), { optimize: true, isCustomElement: tag => tag.startsWith('uni-') }],
            [require(${JSON.stringify(
              babelRequire.resolve('@babel/plugin-transform-typescript')
            )}), { isTSX: true, allowDeclareFields: true }]
          ]
        }).code)
      `,
          ],
          { input: await preprocess(directory + file, false), encoding: 'utf8' }
        )
      const vdomHelper = evaluate(
        await preprocess(components + 'helpers/component.ts', false),
        {
          '@vue/shared': shared,
          './component-vdom': { defineComponent: vue.defineComponent },
          './animation': { default: {} },
        }
      )
      const vdomElement = await load(components + 'helpers/UniElement-vdom.ts')
      const vdomHelpers = { ...helpers, ...vdomHelper, ...vdomElement }
      const business = evaluate(await compileVdom('useVideo.tsx'), {
        vue,
        '@vue/shared': shared,
        '@dcloudio/uni-shared': uniShared,
        '@dcloudio/uni-components': vdomHelpers,
        '@dcloudio/uni-core': core,
        '@dcloudio/uni-platform': { getRealPath: (src: string) => src },
      })
      return evaluate(await compileVdom('index.tsx'), {
        vue,
        '@dcloudio/uni-components': vdomHelpers,
        './useVideo': business,
      }).default
    }
    VideoContext = (
      await load('packages/uni-api/src/service/context/createVideoContext.ts', {
        '@dcloudio/uni-platform': {
          operateVideoPlayer: (
            id: string,
            _page: number,
            type: string,
            data = {}
          ) => methods.get('video.' + id)!({ type, data }, () => {}),
        },
        '../../helpers/api': {
          defineSyncApi: (_name: string, fn: Function) => fn,
        },
        '../../protocols/context/context': {
          API_CREATE_VIDEO_CONTEXT: 'createVideoContext',
        },
      })
    ).VideoContext
  }, 30000)

  beforeEach(() => jest.useFakeTimers())
  afterEach(() => {
    // 结算用户交互回调，避免清空计时器后残留全局交互计数。
    jest.advanceTimersByTime(0)
    apps.splice(0).forEach((app) => app.unmount())
    document.body.innerHTML = ''
    methods.clear()
    play.mockClear()
    pause.mockClear()
    jest.clearAllTimers()
    jest.useRealTimers()
    jest.restoreAllMocks()
  })
  afterAll(() => {
    dom.window.close()
    globals.forEach((value, key) => {
      if (value === undefined) delete (global as any)[key]
      else (global as any)[key] = value
    })
  })
  function mount(props: Record<string, Function> = {}, slots = {}) {
    const node = vue.shallowRef()
    const host = document.createElement('div')
    document.body.appendChild(host)
    const app = vue.createVaporApp(
      vue.defineVaporComponent({
        setup() {
          const component = vue.createComponent(
            Video,
            { id: () => 'player', src: () => '/video.mp4', ...props },
            slots
          )
          vue.setStaticTemplateRef(component, node)
          vue.onMounted(() => {
            expect(node.value.uniTagName).toBe('VIDEO')
            expect(typeof node.value.play).toBe('function')
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
    const element = node.value
    return {
      element,
      node,
      app,
      video: element.querySelector('video') as HTMLVideoElement,
      container: element.querySelector('.uni-video-container') as HTMLElement,
    }
  }

  function mouse(type: string, x: number, options: MouseEventInit = {}) {
    const event = new dom.window.MouseEvent(type, {
      bubbles: true,
      cancelable: true,
      clientX: x,
      buttons: 1,
      ...options,
    })
    Object.defineProperties(event, {
      pageX: { value: x },
      pageY: { value: options.clientY || 0 },
    })
    return event
  }

  function touch(type: string, x: number, y = 0) {
    const event = new dom.window.Event(type, {
      bubbles: true,
      cancelable: true,
    })
    Object.defineProperty(event, 'targetTouches', {
      value:
        type === 'touchend' || type === 'touchcancel'
          ? []
          : [{ pageX: x, pageY: y }],
    })
    return event
  }

  function mockProgress(element: HTMLElement, video: HTMLVideoElement) {
    const progress = element.querySelector(
      '.uni-video-progress-container'
    ) as HTMLElement
    const ball = element.querySelector('.uni-video-ball') as HTMLElement
    // JSDOM 没有布局与媒体元数据，手动提供尺寸和时长。
    Object.defineProperty(progress, 'offsetWidth', { value: 224 })
    const measure = jest
      .spyOn(ball.parentElement!, 'getBoundingClientRect')
      .mockReturnValue({ left: 50, width: 200 } as DOMRect)
    Object.defineProperty(video, 'duration', { configurable: true, value: 100 })
    video.dispatchEvent(new dom.window.Event('durationchange'))
    return { progress, ball, measure }
  }

  async function checkMouseSeeking(
    element: HTMLElement,
    video: HTMLVideoElement
  ) {
    const { ball } = mockProgress(element, video)
    video.currentTime = 20
    video.dispatchEvent(new dom.window.Event('timeupdate'))
    await vue.nextTick()

    ball.dispatchEvent(mouse('mousedown', 100, { button: 2, buttons: 2 }))
    window.dispatchEvent(mouse('mousemove', 200))
    expect(video.currentTime).toBe(20)

    ball.dispatchEvent(mouse('mousedown', 100))
    // 触屏电脑的触摸结束事件不能中断正在进行的鼠标拖动。
    ball.dispatchEvent(new dom.window.Event('touchend', { bubbles: true }))
    await vue.nextTick()
    expect(ball.style.left).toBe('20%')
    // 事件发到窗口，模拟鼠标已经移出圆点。
    window.dispatchEvent(mouse('mousemove', 200))
    await vue.nextTick()
    expect(ball.style.left).toBe('70%')
    expect(video.currentTime).toBe(20)
    window.dispatchEvent(mouse('mouseup', 220, { buttons: 0 }))
    await vue.nextTick()
    expect(video.currentTime).toBe(80)

    ball.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }))
    expect(video.currentTime).toBe(80)
    ball.dispatchEvent(mouse('mousedown', 100))
    window.dispatchEvent(mouse('mousemove', 110, { buttons: 0 }))
    await vue.nextTick()
    expect(video.currentTime).toBe(85)
    for (const [x, expected] of [
      [500, 100],
      [-200, 0],
    ]) {
      ball.dispatchEvent(mouse('mousedown', 100))
      window.dispatchEvent(mouse('mousemove', x))
      window.dispatchEvent(mouse('mouseup', x, { buttons: 0 }))
      await vue.nextTick()
      expect(video.currentTime).toBe(expected)
    }

    ball.dispatchEvent(mouse('mousedown', 100))
    window.dispatchEvent(mouse('mousemove', 200))
    await vue.nextTick()
    window.dispatchEvent(new dom.window.Event('blur'))
    await vue.nextTick()
    expect(video.currentTime).toBe(0)
    expect(ball.style.left).toBe('0%')
    video.currentTime = 5
    video.dispatchEvent(new dom.window.Event('timeupdate'))
    await vue.nextTick()
    expect(ball.style.left).toBe('5%')
  }

  test('鼠标拖动支持预览、越界、最终位置和取消，松手后不重复跳转', async () => {
    const { element, video } = mount()
    await checkMouseSeeking(element, video)
  })

  test('仅按下或点击不显示进度提示，水平移动后才显示', async () => {
    const { element, video, container } = mount({
      showCenterPlayBtn: () => false,
    })
    mockProgress(element, video)
    jest
      .spyOn(container, 'getBoundingClientRect')
      .mockReturnValue({ width: 400 } as DOMRect)
    const toast = element.querySelector('.uni-video-toast') as HTMLElement
    const setTime = jest.spyOn(video, 'currentTime', 'set')
    await vue.nextTick()
    video.dispatchEvent(mouse('mousedown', 100))
    await vue.nextTick()
    expect(toast.classList.contains('uni-video-toast-progress')).toBe(false)
    window.dispatchEvent(mouse('mousemove', 100))
    await vue.nextTick()
    expect(toast.classList.contains('uni-video-toast-progress')).toBe(false)
    window.dispatchEvent(mouse('mouseup', 100, { buttons: 0 }))
    video.dispatchEvent(mouse('click', 100))
    await vue.nextTick()
    expect(toast.classList.contains('uni-video-toast-progress')).toBe(false)
    expect(setTime).not.toHaveBeenCalled()

    video.dispatchEvent(mouse('mousedown', 100))
    window.dispatchEvent(mouse('mousemove', 200))
    await vue.nextTick()
    expect(toast.classList.contains('uni-video-toast-progress')).toBe(true)
    window.dispatchEvent(mouse('mouseup', 200, { buttons: 0 }))
    await vue.nextTick()
    expect(toast.classList.contains('uni-video-toast-progress')).toBe(false)
    expect(setTime).toHaveBeenCalledTimes(1)
  })

  test('在进度边界开始拖动时，提示时间仍与当前进度一致', async () => {
    const { element, video } = mount()
    const { ball } = mockProgress(element, video)
    video.currentTime = 100
    video.dispatchEvent(new dom.window.Event('timeupdate'))
    await vue.nextTick()
    ball.dispatchEvent(mouse('mousedown', 100))
    window.dispatchEvent(mouse('mousemove', 150))
    await vue.nextTick()
    expect(ball.style.left).toBe('100%')
    expect(
      element.querySelector('.uni-video-toast-title-current-time').textContent
    ).toBe('01:40')
    window.dispatchEvent(mouse('mouseup', 150, { buttons: 0 }))
    expect(video.currentTime).toBe(100)
  })

  test('仅上下移动圆点不会显示进度提示或提交跳转', async () => {
    const { element, video } = mount()
    const { ball } = mockProgress(element, video)
    await vue.nextTick()
    const setTime = jest.spyOn(video, 'currentTime', 'set')
    ball.dispatchEvent(mouse('mousedown', 100, { clientY: 100 }))
    window.dispatchEvent(mouse('mousemove', 100, { clientY: 50 }))
    await vue.nextTick()
    expect(element.querySelector('.uni-video-toast-progress')).toBeNull()
    window.dispatchEvent(mouse('mouseup', 100, { clientY: 50, buttons: 0 }))
    expect(setTime).not.toHaveBeenCalled()
  })

  test.each(['pageGesture', 'vslideGesture'])(
    '%s 开启时鼠标纵向拖动调节音量，且不触发进度跳转',
    async (prop) => {
      const { element, video, container } = mount({
        [prop]: () => true,
        enableProgressGesture: () => false,
        showCenterPlayBtn: () => false,
      })
      mockProgress(element, video)
      jest
        .spyOn(container, 'getBoundingClientRect')
        .mockReturnValue({ width: 400 } as DOMRect)
      video.volume = 0.5
      await vue.nextTick()
      const setTime = jest.spyOn(video, 'currentTime', 'set')
      video.dispatchEvent(mouse('mousedown', 100, { clientY: 100 }))
      await vue.nextTick()
      expect(element.querySelector('.uni-video-toast-container')).toBeNull()
      window.dispatchEvent(mouse('mousemove', 100, { clientY: 50 }))
      await vue.nextTick()
      expect(video.volume).toBe(0.75)
      expect(element.querySelector('.uni-video-toast-draw').style.width).toBe(
        '75%'
      )
      expect(element.querySelector('.uni-video-toast-progress')).toBeNull()
      // 锁定纵向手势后，横向偏移也不能切换为快进。
      window.dispatchEvent(mouse('mousemove', 200, { clientY: -100 }))
      await vue.nextTick()
      expect(video.volume).toBe(1)
      window.dispatchEvent(mouse('mousemove', 100, { clientY: 300 }))
      await vue.nextTick()
      expect(video.volume).toBe(0)
      window.dispatchEvent(mouse('mouseup', 100, { clientY: 200, buttons: 0 }))
      await vue.nextTick()
      expect(video.volume).toBe(0)
      expect(element.querySelector('.uni-video-toast-container')).toBeNull()
      expect(setTime).not.toHaveBeenCalled()
      expect(jest.getTimerCount()).toBe(0)
    }
  )

  test('鼠标音量拖动失焦后清理提示和计时器，下一次拖动仍正常', async () => {
    const { element, video, container, app } = mount({
      vslideGesture: () => true,
    })
    mockProgress(element, video)
    jest
      .spyOn(container, 'getBoundingClientRect')
      .mockReturnValue({ width: 400 } as DOMRect)
    video.volume = 0.5
    await vue.nextTick()
    for (const finish of ['blur', 'unmount']) {
      video.dispatchEvent(mouse('mousedown', 100, { clientY: 100 }))
      window.dispatchEvent(mouse('mousemove', 100, { clientY: 50 }))
      await vue.nextTick()
      expect(element.querySelector('.uni-video-toast-container')).not.toBeNull()
      if (finish === 'blur') {
        window.dispatchEvent(new dom.window.Event('blur'))
        await vue.nextTick()
        expect(element.querySelector('.uni-video-toast-container')).toBeNull()
        expect(video.volume).toBe(0.75)
      } else {
        app.unmount()
        apps.splice(apps.indexOf(app), 1)
      }
      expect(jest.getTimerCount()).toBe(0)
    }
  })

  test.each(['touchend', 'touchcancel'])(
    '触摸音量手势 %s 后清理提示和计时器',
    async (end) => {
      const { element, video } = mount({ vslideGesture: () => true })
      mockProgress(element, video)
      video.volume = 0.5
      await vue.nextTick()
      for (const [type, y] of [
        ['touchstart', 100],
        ['touchmove', 90],
        ['touchmove', 50],
        [end, 50],
      ] as const) {
        video.dispatchEvent(touch(type, 100, y))
        await vue.nextTick()
        if (type === 'touchmove') {
          expect(
            element.querySelector('.uni-video-toast-container')
          ).not.toBeNull()
          expect(element.querySelector('.uni-video-toast-progress')).toBeNull()
        }
      }
      expect(video.volume).toBe(0.75)
      expect(element.querySelector('.uni-video-toast-container')).toBeNull()
      jest.advanceTimersByTime(0)
      expect(jest.getTimerCount()).toBe(0)
    }
  )

  test.each(['圆点', '画面'])(
    '%s触摸拖动取消后恢复预览且不提交跳转',
    async (source) => {
      const { element, video } = mount()
      const { ball } = mockProgress(element, video)
      video.currentTime = 20
      video.dispatchEvent(new dom.window.Event('timeupdate'))
      await vue.nextTick()
      const setTime = jest.spyOn(video, 'currentTime', 'set')
      const target = source === '圆点' ? ball : video
      for (const [type, x] of [
        ['touchstart', 100],
        ['touchmove', 150],
        ['touchmove', 200],
      ] as const) {
        target.dispatchEvent(touch(type, x))
        await vue.nextTick()
      }
      expect(parseFloat(ball.style.left)).toBeGreaterThan(20)
      target.dispatchEvent(touch('touchcancel', 200))
      await vue.nextTick()
      expect(setTime).not.toHaveBeenCalled()
      expect(ball.style.left).toBe('20%')
      expect(element.querySelector('.uni-video-toast-progress')).toBeNull()
    }
  )

  test('从轨道开始拖动支持预览，松手只跳转一次，随后仍可正常点击', async () => {
    const { element, video } = mount()
    const { progress, ball, measure } = mockProgress(element, video)
    await vue.nextTick()
    const setTime = jest.spyOn(video, 'currentTime', 'set')
    // 轨道从 50 开始，宽度 200，按在 40% 并拖到 65%。
    progress.dispatchEvent(mouse('mousedown', 130))
    window.dispatchEvent(mouse('mousemove', 180))
    await vue.nextTick()
    expect(ball.style.left).toBe('65%')
    expect(video.currentTime).toBe(0)
    window.dispatchEvent(mouse('mouseup', 180, { buttons: 0 }))
    const click = mouse('click', 180)
    Object.defineProperty(click, 'offsetX', { value: 130 })
    progress.dispatchEvent(click)
    expect(video.currentTime).toBe(65)
    expect(setTime).toHaveBeenCalledTimes(1)
    expect(measure).toHaveBeenCalledTimes(1)

    progress.dispatchEvent(mouse('mousedown', 100))
    window.dispatchEvent(mouse('mouseup', 100, { buttons: 0 }))
    const nextClick = mouse('click', 100)
    Object.defineProperty(nextClick, 'offsetX', { value: 56 })
    progress.dispatchEvent(nextClick)
    expect(video.currentTime).toBe(25)
    expect(setTime).toHaveBeenCalledTimes(2)

    await vue.nextTick()
    video.dispatchEvent(new dom.window.Event('timeupdate'))
    await vue.nextTick()
    progress.dispatchEvent(mouse('mousedown', 130))
    window.dispatchEvent(mouse('mousemove', 180))
    await vue.nextTick()
    window.dispatchEvent(new dom.window.Event('blur'))
    await vue.nextTick()
    expect(ball.style.left).toBe('25%')
    expect(video.currentTime).toBe(25)
    expect(setTime).toHaveBeenCalledTimes(2)
  })

  test('视频画面支持鼠标左右拖动，纵向拖动和按钮不会触发快进', async () => {
    const { element, video, container } = mount()
    const { ball } = mockProgress(element, video)
    const measure = jest
      .spyOn(container, 'getBoundingClientRect')
      .mockReturnValue({ width: 400 } as DOMRect)
    video.currentTime = 20
    video.dispatchEvent(new dom.window.Event('timeupdate'))
    await vue.nextTick()

    video.dispatchEvent(mouse('mousedown', 100))
    window.dispatchEvent(mouse('mousemove', 200))
    await vue.nextTick()
    expect(ball.style.left).toBe('45%')
    expect(video.currentTime).toBe(20)
    window.dispatchEvent(mouse('mouseup', 220, { buttons: 0 }))
    await vue.nextTick()
    expect(video.currentTime).toBe(50)
    expect(measure).toHaveBeenCalledTimes(1)
    const click = jest.fn()
    element.addEventListener('click', click)
    video.dispatchEvent(mouse('click', 220))
    expect(click).not.toHaveBeenCalled()

    video.dispatchEvent(mouse('mousedown', 100))
    window.dispatchEvent(mouse('mousemove', 110, { clientY: 100 }))
    window.dispatchEvent(mouse('mouseup', 110, { buttons: 0 }))
    await vue.nextTick()
    expect(video.currentTime).toBe(50)
    expect(ball.style.left).toBe('50%')

    element
      .querySelector('.uni-video-control-button')
      .dispatchEvent(mouse('mousedown', 100))
    window.dispatchEvent(mouse('mousemove', 200))
    window.dispatchEvent(mouse('mouseup', 200, { buttons: 0 }))
    expect(video.currentTime).toBe(50)
    expect(measure).toHaveBeenCalledTimes(2)
  })

  test('关闭进度手势后不能拖动画面，但仍可拖动圆点', async () => {
    const { element, video, container } = mount({
      enableProgressGesture: () => false,
    })
    const { ball } = mockProgress(element, video)
    const measure = jest.spyOn(container, 'getBoundingClientRect')
    await vue.nextTick()
    video.dispatchEvent(mouse('mousedown', 100))
    window.dispatchEvent(mouse('mousemove', 200))
    window.dispatchEvent(mouse('mouseup', 200, { buttons: 0 }))
    expect(video.currentTime).toBe(0)
    expect(measure).not.toHaveBeenCalled()

    ball.dispatchEvent(mouse('mousedown', 100))
    window.dispatchEvent(mouse('mouseup', 200, { buttons: 0 }))
    expect(video.currentTime).toBe(50)
  })

  test.each(['mouseup', 'blur'])(
    '鼠标拖动显示控制栏，%s 后延迟三秒隐藏',
    async (end) => {
      const { element, video, container } = mount({
        showCenterPlayBtn: () => false,
      })
      mockProgress(element, video)
      jest
        .spyOn(container, 'getBoundingClientRect')
        .mockReturnValue({ width: 400 } as DOMRect)
      const bar = element.querySelector('.uni-video-bar') as HTMLElement
      video.dispatchEvent(new dom.window.Event('play'))
      await vue.nextTick()
      jest.advanceTimersByTime(3000)
      await vue.nextTick()
      expect(bar.style.display).toBe('none')

      video.dispatchEvent(mouse('mousedown', 100))
      window.dispatchEvent(mouse('mousemove', 200))
      await vue.nextTick()
      expect(bar.style.display).not.toBe('none')
      jest.advanceTimersByTime(4000)
      await vue.nextTick()
      expect(bar.style.display).not.toBe('none')
      window.dispatchEvent(
        end === 'mouseup'
          ? mouse('mouseup', 200, { buttons: 0 })
          : new dom.window.Event('blur')
      )
      await vue.nextTick()
      expect(bar.style.display).not.toBe('none')
      expect(element.querySelector('.uni-video-toast-progress')).toBeNull()
      video.dispatchEvent(mouse('click', 200))
      await vue.nextTick()
      expect(bar.style.display).not.toBe('none')
      jest.advanceTimersByTime(2999)
      await vue.nextTick()
      expect(bar.style.display).not.toBe('none')
      jest.advanceTimersByTime(1)
      await vue.nextTick()
      expect(bar.style.display).toBe('none')
    }
  )

  test('再次拖动会取消上一次隐藏计时，并在结束后重新计时', async () => {
    const { element, video, container } = mount({
      showCenterPlayBtn: () => false,
    })
    mockProgress(element, video)
    jest
      .spyOn(container, 'getBoundingClientRect')
      .mockReturnValue({ width: 400 } as DOMRect)
    const bar = element.querySelector('.uni-video-bar') as HTMLElement
    video.dispatchEvent(new dom.window.Event('play'))
    await vue.nextTick()
    for (let i = 0; i < 2; i++) {
      video.dispatchEvent(mouse('mousedown', 100))
      window.dispatchEvent(mouse('mousemove', 150))
      await vue.nextTick()
      jest.advanceTimersByTime(4000)
      await vue.nextTick()
      expect(bar.style.display).not.toBe('none')
      window.dispatchEvent(mouse('mouseup', 150, { buttons: 0 }))
      await vue.nextTick()
      jest.advanceTimersByTime(2000)
      await vue.nextTick()
      expect(bar.style.display).not.toBe('none')
    }
    jest.advanceTimersByTime(1000)
    await vue.nextTick()
    expect(bar.style.display).toBe('none')
  })

  test('鼠标拖动保留原本可见的控制栏，且不覆盖 controls=false', async () => {
    for (const controls of [true, false]) {
      const { element, video, container } = mount({
        controls: () => controls,
        showCenterPlayBtn: () => false,
      })
      mockProgress(element, video)
      jest
        .spyOn(container, 'getBoundingClientRect')
        .mockReturnValue({ width: 400 } as DOMRect)
      const bar = element.querySelector('.uni-video-bar') as HTMLElement
      await vue.nextTick()
      video.dispatchEvent(mouse('mousedown', 100))
      window.dispatchEvent(mouse('mousemove', 200))
      await vue.nextTick()
      expect(bar.style.display === 'none').toBe(!controls)
      window.dispatchEvent(mouse('mouseup', 200, { buttons: 0 }))
      await vue.nextTick()
      expect(bar.style.display === 'none').toBe(!controls)
    }
  })

  test.each(['封面', '弹幕'])(
    '%s覆盖画面时仍可使用鼠标拖动进度',
    async (overlay) => {
      const { element, video, container } = mount({
        enableDanmu: () => true,
      })
      const { ball } = mockProgress(element, video)
      jest
        .spyOn(container, 'getBoundingClientRect')
        .mockReturnValue({ width: 400 } as DOMRect)
      video.currentTime = 20
      video.dispatchEvent(new dom.window.Event('timeupdate'))
      if (overlay === '弹幕') {
        video.dispatchEvent(new dom.window.Event('play'))
      }
      await vue.nextTick()
      const layer = element.querySelector(
        overlay === '封面' ? '.uni-video-cover' : '.uni-video-danmu'
      ) as HTMLElement
      expect(layer.style.display).not.toBe('none')
      const target = overlay === '封面' ? layer : document.createElement('p')
      if (target !== layer) layer.appendChild(target)
      target.dispatchEvent(mouse('mousedown', 100))
      window.dispatchEvent(mouse('mousemove', 200))
      await vue.nextTick()
      expect(ball.style.left).toBe('45%')
      expect(video.currentTime).toBe(20)
      window.dispatchEvent(mouse('mouseup', 220, { buttons: 0 }))
      await vue.nextTick()
      expect(video.currentTime).toBe(50)
    }
  )

  test('封面播放按钮仍响应点击，不启动鼠标拖动', async () => {
    const { element, video } = mount()
    mockProgress(element, video)
    await vue.nextTick()
    const button = element.querySelector('.uni-video-cover-play-button')!
    button.dispatchEvent(mouse('mousedown', 100))
    window.dispatchEvent(mouse('mousemove', 200))
    window.dispatchEvent(mouse('mouseup', 200, { buttons: 0 }))
    expect(video.currentTime).toBe(0)
    button.dispatchEvent(mouse('click', 200))
    expect(play).toHaveBeenCalledTimes(1)
  })

  test('拖动期间只读取一次轨道宽度，下次拖动重新测量', async () => {
    const { element, video } = mount()
    const { ball, measure } = mockProgress(element, video)
    await vue.nextTick()
    ball.dispatchEvent(mouse('mousedown', 100))
    window.dispatchEvent(mouse('mousemove', 120))
    await vue.nextTick()
    expect(ball.style.left).toBe('10%')
    measure.mockReturnValue({ width: 400 } as DOMRect)
    window.dispatchEvent(mouse('mousemove', 140))
    await vue.nextTick()
    expect(ball.style.left).toBe('20%')
    window.dispatchEvent(mouse('mouseup', 140, { buttons: 0 }))
    await vue.nextTick()
    expect(video.currentTime).toBe(20)
    expect(measure).toHaveBeenCalledTimes(1)

    ball.dispatchEvent(mouse('mousedown', 100))
    window.dispatchEvent(mouse('mouseup', 140, { buttons: 0 }))
    await vue.nextTick()
    expect(video.currentTime).toBe(30)
    expect(measure).toHaveBeenCalledTimes(2)
  })

  test('轨道宽度为零时不开始拖动，恢复尺寸后仍可拖动', async () => {
    const { element, video } = mount()
    const { ball, measure } = mockProgress(element, video)
    await vue.nextTick()
    measure.mockReturnValueOnce({ width: 0 } as DOMRect)
    ball.dispatchEvent(mouse('mousedown', 100))
    window.dispatchEvent(mouse('mouseup', 200, { buttons: 0 }))
    expect(video.currentTime).toBe(0)

    ball.dispatchEvent(mouse('mousedown', 100))
    window.dispatchEvent(mouse('mouseup', 200, { buttons: 0 }))
    expect(video.currentTime).toBe(50)
  })

  test('拖动时失焦或卸载会清理窗口监听', async () => {
    const { element, video, app } = mount()
    const { ball } = mockProgress(element, video)
    await vue.nextTick()
    ball.dispatchEvent(mouse('mousedown', 100))
    window.dispatchEvent(mouse('mousemove', 200))
    window.dispatchEvent(new dom.window.Event('blur'))
    await vue.nextTick()
    expect(video.currentTime).toBe(0)
    expect(ball.style.left).toBe('0%')

    ball.dispatchEvent(mouse('mousedown', 100))
    app.unmount()
    apps.splice(apps.indexOf(app), 1)
    window.dispatchEvent(mouse('mousemove', 200))
    window.dispatchEvent(mouse('mouseup', 200, { buttons: 0 }))
    expect(video.currentTime).toBe(0)
  })

  test('触摸拖动只测量一次且不会被重复触摸重置，进度条点击仍可跳转', async () => {
    const { element, video } = mount()
    const { progress, ball, measure } = mockProgress(element, video)
    await vue.nextTick()
    for (const [type, x] of [
      ['touchstart', 100],
      ['touchmove', 150],
      ['touchstart', 175],
      ['touchmove', 200],
      ['touchend', 200],
    ] as const) {
      ball.dispatchEvent(touch(type, x))
    }
    expect(video.currentTime).toBe(50)
    expect(measure).toHaveBeenCalledTimes(1)
    const click = new dom.window.MouseEvent('click', { bubbles: true })
    Object.defineProperty(click, 'offsetX', { value: 56 })
    progress.dispatchEvent(click)
    expect(video.currentTime).toBe(25)
  })

  test('根节点、Element 类型与 dataset 正常，公开方法直接使用已有 ref', async () => {
    const payload = vue.ref({ value: 1 })
    const { element, video, node } = mount({
      'data-payload': () => payload.value,
    })
    expect(element.tagName).toBe('DIV')
    expect(element).toBeInstanceOf(UniElement)
    expect(element).toBeInstanceOf(elements.UniViewElement)
    expect(element).toBeInstanceOf(UniVideoElement)
    class Derived extends UniVideoElement {}
    expect(element).not.toBeInstanceOf(Derived)
    expect(customElements.get('uni-video')).toBeUndefined()
    expect(element.setAttribute).toBe(dom.window.Element.prototype.setAttribute)
    expect(element.removeAttribute).toBe(
      dom.window.Element.prototype.removeAttribute
    )
    expect(video.hasAttribute('uni-view')).toBe(false)
    expect(element.attachVmProps).toBeUndefined()
    // 固定容器直接插入，不为组件外壳增加动态子节点锚点。
    expect(Array.from(element.childNodes)).toEqual([element.firstElementChild])
    expect(element.dataset.get('payload')).toBe(payload.value)
    const query = jest.spyOn(element, 'querySelector')
    const initialPlay = element.play
    element.play()
    element.pause()
    element.seek('12')
    element.playbackRate(1.5)
    expect(play.mock.instances[0]).toBe(video)
    expect(pause.mock.instances[0]).toBe(video)
    expect(video.currentTime).toBe(12)
    expect(video.playbackRate).toBe(1.5)
    element.seek('无效值')
    expect(video.currentTime).toBe(12)
    element.stop()
    expect(video.currentTime).toBe(0)
    expect(query).not.toHaveBeenCalled()
    payload.value = { value: 2 }
    await vue.nextTick()
    expect(element.dataset.get('payload')).toBe(payload.value)
    expect(element.play).toBe(initialPlay)
    expect(node.value).toBe(element)
  })

  test('属性、播放事件和控制栏保持响应式，更新时复用 video', async () => {
    const state = vue.reactive({
      src: '/first.mp4',
      poster: '/first.png',
      muted: false,
      loop: false,
      objectFit: 'contain',
      showProgress: true,
    })
    const onPlay = jest.fn(),
      onTimeupdate = jest.fn(),
      onLoadedmetadata = jest.fn()
    const props: Record<string, Function> = {}
    Object.keys(state).forEach((key) => (props[key] = () => state[key]))
    const { element, video } = mount({
      ...props,
      initialTime: () => 5,
      onPlay: () => onPlay,
      onTimeupdate: () => onTimeupdate,
      onLoadedmetadata: () => onLoadedmetadata,
    })
    Object.defineProperties(video, {
      duration: { configurable: true, value: 120 },
      videoWidth: { value: 640 },
      videoHeight: { value: 360 },
    })
    video.dispatchEvent(new dom.window.Event('durationchange'))
    video.dispatchEvent(new dom.window.Event('loadedmetadata'))
    await vue.nextTick()
    expect(video.currentTime).toBe(5)
    expect(onLoadedmetadata.mock.calls[0][0].detail).toEqual({
      width: 640,
      height: 360,
      duration: 120,
    })
    element.querySelector('.uni-video-cover-play-button').click()
    await vue.nextTick()
    expect(onPlay).toHaveBeenCalledTimes(1)
    expect(onPlay.mock.calls[0][0].target).toBe(element)
    expect(element.querySelector('.uni-video-cover')).toBeNull()
    video.currentTime = 30
    video.dispatchEvent(new dom.window.Event('timeupdate'))
    await vue.nextTick()
    expect(onTimeupdate.mock.calls[0][0].detail).toEqual({
      currentTime: 30,
      duration: 120,
    })
    expect(element.querySelector('.uni-video-current-time').textContent).toBe(
      '00:30'
    )
    expect(
      element.querySelector('.uni-video-progress-played').style.width
    ).toBe('25%')
    Object.assign(state, {
      src: '/second.mp4',
      poster: '/second.png',
      muted: true,
      loop: true,
      objectFit: 'cover',
      showProgress: false,
    })
    await vue.nextTick()
    expect(video.getAttribute('src')).toBe('/second.mp4')
    expect(video.getAttribute('poster')).toBe('/second.png')
    expect(video.muted).toBe(true)
    expect(video.loop).toBe(true)
    expect(video.style.objectFit).toBe('cover')
    expect(element.querySelector('.uni-video-current-time').style.display).toBe(
      'none'
    )
    expect(element.querySelector('video')).toBe(video)
  })

  test('模拟全屏移动固定容器，退出恢复根节点，插槽和事件保持正常', async () => {
    const fullscreen = jest.fn()
    const { element, container, video } = mount(
      { onFullscreenchange: () => fullscreen },
      {
        default: () => {
          const el = document.createElement('span')
          el.textContent = '插槽'
          return el
        },
      }
    )
    expect(element.querySelector('.uni-video-slots span').textContent).toBe(
      '插槽'
    )
    element.requestFullScreen()
    await vue.nextTick()
    expect(container.parentElement).toBe(document.body)
    expect(container.classList.contains('uni-video-type-fullscreen')).toBe(true)
    expect(fullscreen.mock.calls[0][0].detail.fullScreen).toBe(true)
    element.play()
    expect(play.mock.instances[0]).toBe(video)
    element.exitFullScreen()
    await vue.nextTick()
    expect(container.parentElement).toBe(element)
    expect(fullscreen.mock.calls[1][0].detail.fullScreen).toBe(false)
    expect(container.querySelector('video')).toBe(video)
  })

  test('原生全屏继续使用内部容器，浏览器事件更新状态', async () => {
    const fullscreen = jest.fn()
    const { element, container } = mount({
      onFullscreenchange: () => fullscreen,
    })
    const request = jest.fn(),
      exit = jest.fn()
    Object.defineProperty(document, 'fullscreenEnabled', {
      configurable: true,
      value: true,
    })
    Object.assign(container, { requestFullscreen: request })
    Object.assign(document, { exitFullscreen: exit })
    try {
      // Safari 分支要求用户交互后才能请求容器全屏，使用真实 useUserAction 通道。
      document.dispatchEvent(new dom.window.MouseEvent('mousedown'))
      element.requestFullScreen()
      expect(request).toHaveBeenCalledTimes(1)
      Object.defineProperty(document, 'fullscreenElement', {
        configurable: true,
        value: container,
      })
      container.dispatchEvent(new dom.window.Event('fullscreenchange'))
      await vue.nextTick()
      expect(fullscreen.mock.calls[0][0].detail.fullScreen).toBe(true)
      element.exitFullScreen()
      expect(exit).toHaveBeenCalledTimes(1)
    } finally {
      delete (document as any).fullscreenEnabled
      delete (document as any).fullscreenElement
      delete (document as any).exitFullscreen
    }
  })

  test('VideoContext 复用原订阅通道，弹幕和卸载清理仍然生效', async () => {
    const { element, video, app, container } = mount({
      enableDanmu: () => true,
    })
    expect(element.__uniContextInfo).toMatchObject({
      id: 'player',
      type: 'video',
      page: 1,
    })
    const context = new VideoContext('player', 1)
    context.play()
    context.seek(8)
    context.playbackRate(1.25)
    expect(play).toHaveBeenCalledTimes(1)
    expect(video.currentTime).toBe(8)
    expect(video.playbackRate).toBe(1.25)
    context.sendDanmu({ text: '测试弹幕', color: '#ff0000' })
    video.currentTime = 9
    video.dispatchEvent(new dom.window.Event('timeupdate'))
    await vue.nextTick()
    expect(element.querySelector('.uni-video-danmu-item').innerText).toBe(
      '测试弹幕'
    )
    context.requestFullScreen()
    expect(container.parentElement).toBe(document.body)
    app.unmount()
    apps.splice(apps.indexOf(app), 1)
    expect(container.isConnected).toBe(false)
    expect(methods.has('video.player')).toBe(false)
  })
  test('客户端固定容器不生成动态子节点 effect，SSR 不执行 DOM 插入', async () => {
    const client = await compileVideoEntry(false)
    expect(client).not.toMatch(/setNodes|createNodes/)
    expect(client).toContain('setInsertionState(root)')
    expect(client).toContain('insert(render(), root)')
    const server = await compileVideoEntry(true)
    expect(server).not.toMatch(/setInsertionState|insert\(render\(\), root\)/)
    expect(server).toContain('render()')
  })

  test('固定容器接管复用已有 DOM，内部更新与卸载仍由组件作用域管理', async () => {
    const host = document.createElement('div')
    host.innerHTML =
      '<div uni-video uni-view id="player"><div class="uni-video-container"><video src="/first.mp4"></video></div></div>'
    document.body.appendChild(host)
    const rootNode = host.firstElementChild!
    const container = rootNode.firstElementChild!
    const video = container.firstElementChild!
    const src = vue.ref('/first.mp4')
    const template = vue.template(
      '<div class="uni-video-container"><video></video></div>'
    )
    const render = jest.fn(() => {
      const content = template()
      const player = content.firstElementChild
      vue.renderEffect(() => player.setAttribute('src', src.value))
      return content
    })
    const Component = await createVideoWithContent(render)
    const app = vue.createVaporSSRApp(Component, { id: 'player' })
    app.config.warnHandler = (message: string) => {
      throw new Error(message)
    }
    app.config.errorHandler = (error: Error) => {
      throw error
    }
    apps.push(app)
    app.mount(host)
    expect(host.firstElementChild).toBe(rootNode)
    expect(rootNode.firstElementChild).toBe(container)
    expect(container.firstElementChild).toBe(video)
    expect(rootNode.childNodes.length).toBe(1)
    expect(render).toHaveBeenCalledTimes(1)
    src.value = '/second.mp4'
    await vue.nextTick()
    expect(video.getAttribute('src')).toBe('/second.mp4')
    app.unmount()
    apps.splice(apps.indexOf(app), 1)
    src.value = '/after-unmount.mp4'
    await vue.nextTick()
    expect(video.getAttribute('src')).toBe('/second.mp4')
  })

  test('非 Vapor JSX 入口保留 Custom Element、播放方法与响应式控制栏', async () => {
    const VdomVideo = await loadVdomVideo()
    const state = vue.reactive({ src: '/old.mp4', showProgress: true })
    const host = document.createElement('div')
    document.body.appendChild(host)
    const app = vue.createApp({
      render: () => vue.h(VdomVideo, { id: 'vdom-player', ...state }),
    })
    apps.push(app)
    app.mount(host)
    const element = host.firstElementChild as any
    const video = element.querySelector('video') as HTMLVideoElement
    expect(element.localName).toBe('uni-video')
    expect(element).toBeInstanceOf(customElements.get('uni-video')!)
    expect(element.getAttribute('src')).toBe('/old.mp4')
    element.play()
    await vue.nextTick()
    expect(play.mock.instances[0]).toBe(video)
    expect(element.querySelector('.uni-video-cover')).toBeNull()
    state.src = '/updated.mp4'
    state.showProgress = false
    await vue.nextTick()
    expect(video.getAttribute('src')).toBe('/updated.mp4')
    expect(element.getAttribute('src')).toBe('/updated.mp4')
    expect(
      element.querySelector('.uni-video-progress-container').style.display
    ).toBe('none')
    expect(element.querySelector('video')).toBe(video)
    element.seek(4)
    expect(video.currentTime).toBe(4)
    expect(element.__uniContextInfo.type).toBe('video')
    await checkMouseSeeking(element, video)
  })
})
