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

describe('Web Vapor Map 原生宿主', () => {
  let dom: any,
    vue: any,
    Component: any,
    UniMapElement: any,
    UniElement: any,
    elements: any
  let loadVdomMap: () => Promise<any>
  let provider = 'qq'
  let ready: (sdk: any) => void
  const instances: any[] = [],
    circles: any[] = [],
    apps: any[] = []
  const globals = new Map<string, any>(),
    subscriptions = new Map<string, Function>()
  const loadMaps = jest.fn((_libraries, callback) => {
    ready = callback
  })
  const directory = 'packages/uni-h5/src/view/components/map/'
  const location = {
    getIsAMap: () => provider === 'amap',
    getIsBMap: () => provider === 'bmap',
  }
  class LatLng {
    constructor(public latitude: number, public longitude: number) {}
    lat() {
      return this.latitude
    }
    lng() {
      return this.longitude
    }
    getLat() {
      return this.latitude
    }
    getLng() {
      return this.longitude
    }
  }
  class LngLat extends LatLng {
    constructor(lng: number, lat: number) {
      super(lat, lng)
    }
  }
  class Point {
    constructor(public lng: number, public lat: number) {}
  }
  class Bounds {
    points: any[] = []
    extend(point: any) {
      this.points.push(point)
    }
    getSouthWest() {
      return new LatLng(10, 20)
    }
    getNorthEast() {
      return new LatLng(30, 40)
    }
  }
  class SDKMap {
    events: Record<string, Function> = {}
    center: any
    zoom: number
    setCenter = jest.fn((value) => {
      this.center = value
    })
    setZoom = jest.fn((value) => {
      this.zoom = value
    })
    fitBounds = jest.fn()
    setBounds = jest.fn()
    enableScrollWheelZoom = jest.fn()
    add = jest.fn()
    addOverlay = jest.fn()
    constructor(public container: HTMLElement, public options: any) {
      this.center = options.center
      this.zoom = options.zoom
      instances.push(this)
    }
    centerAndZoom(center: any, zoom: number) {
      this.center = center
      this.zoom = zoom
    }
    getCenter() {
      return this.center
    }
    getZoom() {
      return this.zoom
    }
    getBounds() {
      return new Bounds()
    }
    addEventListener(name: string, callback: Function) {
      this.events[name] = callback
    }
  }
  class Circle {
    setMap = jest.fn()
    constructor(public options: any) {
      circles.push(this)
    }
  }
  const events = {
    addListener: (map: SDKMap, name: string, callback: Function) => {
      map.events[name] = callback
      return { remove: () => delete map.events[name] }
    },
  }
  const sdk = {
    Map: SDKMap,
    LatLng,
    LngLat,
    Point,
    LatLngBounds: Bounds,
    Bounds,
    Circle,
    event: events,
    Event: events,
  }

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
    ]) {
      globals.set(name, (global as any)[name])
      ;(global as any)[name] = dom.window[name]
    }
    Object.assign(global, { __X__: true, __NODE_JS__: false })
    vue = jest.requireActual(
      path.join(root, 'packages/uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js')
    )
    const shared = jest.requireActual(
      '../../uni-cli-shared/lib/dom2/web/@vue/shared/dist/shared.cjs.js'
    )
    const uniShared = jest.requireActual('@dcloudio/uni-shared')
    const core = {
      createNativeEvent: jest.fn(),
      useCurrentPageId: () => 1,
      getCurrentPageId: () => 1,
      registerViewMethod: (_page: number, id: string, callback: Function) =>
        subscriptions.set(id, callback),
      unregisterViewMethod: (_page: number, id: string) =>
        subscriptions.delete(id),
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
      ...(await load(components + 'helpers/useContextInfo.ts')),
      ...(await load(components + 'helpers/useSubscribe.ts')),
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
    const compile = async (file: string) =>
      execFileSync(
        process.execPath,
        [
          '-e',
          `
      const fs = require('fs'); const compiler = require(${JSON.stringify(
        compiler
      )});
      process.stdout.write(compiler.transform(fs.readFileSync(0, 'utf8'), {filename: 'map.tsx', vapor: true}).code)
    `,
        ],
        { input: await preprocess(directory + file), encoding: 'utf8' }
      )
    const dependencies = {
      vue,
      '@vue/shared': shared,
      '@dcloudio/uni-shared': uniShared,
      '../../../helpers/location': location,
      './maps': { loadMaps },
      './MapLocation': { CONTEXT_ID: 'MAP_LOCATION' },
      '../../../helpers/hexToRgba': await load(
        'packages/uni-h5/src/helpers/hexToRgba.ts'
      ),
      '@dcloudio/uni-platform': { getRealPath: (src: string) => src },
    }
    const business = await load(directory + 'useMap.ts', {
      ...dependencies,
      '@dcloudio/uni-components': helpers,
    })
    const children = {
      './MapCircle': {
        default: evaluate(await compile('MapCircle.tsx'), {
          ...dependencies,
          '/vue-jsx/vapor': jsx,
          '@dcloudio/uni-components': helpers,
        }).default,
      },
      './MapControl': {
        default: evaluate(await compile('MapControl.tsx'), {
          ...dependencies,
          '/vue-jsx/vapor': jsx,
          '@dcloudio/uni-components': helpers,
        }).default,
      },
    }
    for (const file of [
      'MapMarker.tsx',
      'MapPolyline.tsx',
      'map-polygon/index.tsx',
    ]) {
      Object.assign(children, {
        ['./' + file.replace('.tsx', '')]: {
          default: evaluate(await compile(file), {
            ...dependencies,
            '/vue-jsx/vapor': jsx,
            '@dcloudio/uni-components': helpers,
            '../../../../helpers/location': location,
            '../../../../helpers/hexToRgba':
              dependencies['../../../helpers/hexToRgba'],
            './props': await load(directory + 'map-polygon/props.ts'),
          }).default,
        },
      })
    }
    // 定位服务未改动，本次不触发外部位置与指南针 API。
    const empty = {
      default: vue.defineVaporComponent({
        setup: () => document.createComment(''),
      }),
    }
    Object.assign(children, {
      './MapLocation': empty,
    })
    const module = evaluate(await compile('index-vapor.tsx'), {
      vue,
      '/vue-jsx/vapor': jsx,
      '@dcloudio/uni-components': helpers,
      './useMap': business,
      ...children,
    })
    Component = module.default
    UniMapElement = module.UniMapElement
    loadVdomMap = async () => {
      const babelRequire = createRequire(
        nodeRequire.resolve('@vitejs/plugin-vue-jsx')
      )
      const compiled = execFileSync(
        process.execPath,
        [
          '-e',
          `
        const fs = require('fs'), babel = require(${JSON.stringify(
          babelRequire.resolve('@babel/core')
        )});
        process.stdout.write(babel.transformSync(fs.readFileSync(0, 'utf8'), {
          filename: 'map.tsx', babelrc: false, configFile: false,
          plugins: [[require(${JSON.stringify(
            babelRequire.resolve('@vue/babel-plugin-jsx')
          )}), {optimize:true,isCustomElement:tag=>tag.startsWith('uni-')}], [require(${JSON.stringify(
            babelRequire.resolve('@babel/plugin-transform-typescript')
          )}), {isTSX:true,allowDeclareFields:true}]]
        }).code)
      `,
        ],
        {
          input: await preprocess(directory + 'index.tsx', false),
          encoding: 'utf8',
        }
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
      return evaluate(compiled, {
        vue,
        '@dcloudio/uni-components': { ...vdomHelper, ...vdomElement },
        './useMap': business,
        ...children,
      }).default
    }
  }, 30000)

  afterEach(() => {
    apps.splice(0).forEach((app) => app.unmount())
    document.body.innerHTML = ''
    instances.length = 0
    circles.length = 0
    subscriptions.clear()
    loadMaps.mockClear()
    provider = 'qq'
  })
  afterAll(() => {
    dom.window.close()
    globals.forEach((value, key) => {
      if (value === undefined) delete (global as any)[key]
      else (global as any)[key] = value
    })
  })
  function mount(props: Record<string, Function> = {}, slots = {}) {
    const node = vue.shallowRef(),
      host = document.createElement('div')
    document.body.appendChild(host)
    const app = vue.createVaporApp(
      vue.defineVaporComponent({
        setup() {
          const comp = vue.createComponent(
            Component,
            {
              id: () => 'map',
              latitude: () => 30,
              longitude: () => 120,
              scale: () => 16,
              ...props,
            },
            slots
          )
          vue.setStaticTemplateRef(comp, node)
          vue.onMounted(() => expect(node.value.uniTagName).toBe('MAP'))
          return comp
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
    return { element: node.value, node, app }
  }

  test.each(['qq', 'google', 'amap', 'bmap'])(
    '%s 保留 SDK 容器、坐标与缩放更新，实例不重建',
    async (mode) => {
      provider = mode
      const point = vue.reactive({ latitude: 30, longitude: 120, scale: 16 })
      const { element, node } = mount({
        latitude: () => point.latitude,
        longitude: () => point.longitude,
        scale: () => point.scale,
        libraries: () => ['geometry'],
      })
      expect(element.tagName).toBe('DIV')
      expect(element).toBeInstanceOf(UniMapElement)
      expect(element).toBeInstanceOf(UniElement)
      expect(element).toBeInstanceOf(elements.UniViewElement)
      expect(element.setAttribute).toBe(
        dom.window.Element.prototype.setAttribute
      )
      expect(element.removeAttribute).toBe(
        dom.window.Element.prototype.removeAttribute
      )
      expect(customElements.get('uni-map')).toBeUndefined()
      expect(loadMaps.mock.calls[0][0]).toEqual(['geometry'])
      ready(sdk)
      const map = instances[0],
        container = element.firstElementChild
      expect(map.container).toBe(container)
      expect(container.hasAttribute('uni-view')).toBe(false)
      expect(container.style.width).toBe('100%')
      expect(container.style.height).toBe('100%')
      expect(map.options.center).toEqual(
        mode === 'bmap' ? new Point(120, 30) : new LatLng(30, 120)
      )
      Object.assign(point, { latitude: 31, longitude: 121, scale: 12 })
      await vue.nextTick()
      expect(map.setCenter).toHaveBeenCalledTimes(1)
      expect(map.setZoom).toHaveBeenCalledWith(12)
      expect(instances).toHaveLength(1)
      expect(node.value).toBe(element)
      expect(element.firstElementChild).toBe(container)
    }
  )

  test('地图事件、MapContext 订阅、dataset 和插槽保留原协议', async () => {
    const tap = jest.fn(),
      updated = jest.fn(),
      region = jest.fn(),
      scale = jest.fn(),
      payload = vue.ref({ value: 1 })
    const { element, app } = mount(
      {
        onTap: () => tap,
        onUpdated: () => updated,
        onRegionchange: () => region,
        'onUpdate:scale': () => scale,
        'data-payload': () => payload.value,
      },
      {
        default: () => {
          const el = document.createElement('span')
          el.textContent = '覆盖内容'
          return el
        },
      }
    )
    ready(sdk)
    expect(updated).toHaveBeenCalledTimes(1)
    expect(updated.mock.calls[0][0].target).toBe(element)
    expect(element.querySelector('span').textContent).toBe('覆盖内容')
    expect(element.dataset.get('payload')).toBe(payload.value)
    payload.value = { value: 2 }
    await vue.nextTick()
    expect(element.dataset.get('payload')).toBe(payload.value)
    const map = instances[0]
    map.events.click()
    expect(tap).toHaveBeenCalledTimes(1)
    map.events.dragstart()
    map.events.dragend()
    expect(region.mock.calls[1][0].detail.centerLocation).toEqual({
      latitude: 30,
      longitude: 120,
    })
    map.zoom = 15
    map.events.zoom_changed()
    expect(scale).toHaveBeenCalledWith(15)
    const success = jest.fn()
    subscriptions.get('map.map')!(
      { type: 'getCenterLocation', data: { success } },
      () => {}
    )
    expect(success).toHaveBeenCalledWith({
      latitude: 30,
      longitude: 120,
      errMsg: 'getCenterLocation:ok',
    })
    expect(element.__uniContextInfo).toMatchObject({
      type: 'map',
      id: 'map',
      page: 1,
    })
    app.unmount()
    apps.splice(apps.indexOf(app), 1)
    expect(subscriptions.has('map.map')).toBe(false)
  })

  test.each(['markers', 'polyline', 'circles', 'polygons'])(
    '%s 在 SDK 加载前可挂载和移除，不产生无效 Block 告警',
    async (name) => {
      const overlays = vue.ref([
        { id: 1, points: [], latitude: 30, longitude: 120 },
      ])
      const { element } = mount({ [name]: () => overlays.value })
      expect(element.children).toHaveLength(2)
      overlays.value = []
      await vue.nextTick()
      expect(element.children).toHaveLength(2)
      expect(instances).toHaveLength(0)
    }
  )

  test('真实 Circle 和 Control 使用相同 SDK 上下文，更新和移除不重建地图', async () => {
    const circleList = vue.ref([{ latitude: 30, longitude: 120, radius: 100 }]),
      controls = vue.ref([
        {
          id: 1,
          iconPath: '/control.png',
          position: { left: 5, top: 10 },
          clickable: true,
        },
      ]),
      tap = jest.fn()
    const { element } = mount({
      circles: () => circleList.value,
      controls: () => controls.value,
      onControltap: () => tap,
    })
    ready(sdk)
    expect(circles[0].options.map).toBe(instances[0])
    expect(circles[0].options.radius).toBe(100)
    const icon = element.querySelector('.uni-map-control-icon')
    expect(icon.getAttribute('src')).toBe('/control.png')
    icon.click()
    expect(tap.mock.calls[0][0].target).toBe(element)
    expect(tap.mock.calls[0][0].detail).toEqual({ controlId: 1 })
    circleList.value = [{ latitude: 31, longitude: 121, radius: 200 }]
    controls.value = []
    await vue.nextTick()
    expect(circles[0].setMap).toHaveBeenCalledWith(null)
    expect(circles[circles.length - 1].options.radius).toBe(200)
    expect(element.querySelector('.uni-map-control')).toBeNull()
    expect(instances).toHaveLength(1)
    circleList.value = []
    await vue.nextTick()
    expect(circles[circles.length - 1].setMap).toHaveBeenCalledWith(null)
  })

  test('非 Vapor 保留旧 Custom Element、属性读取与 SDK 初始化路径', async () => {
    const VdomMap = await loadVdomMap(),
      state = vue.reactive({ latitude: 30, longitude: 120, scale: 16 }),
      host = document.createElement('div')
    document.body.appendChild(host)
    const app = vue.createApp({
      render: () => vue.h(VdomMap, { id: 'old-map', ...state }),
    })
    apps.push(app)
    app.mount(host)
    const element = host.firstElementChild as any
    ready(sdk)
    expect(element.localName).toBe('uni-map')
    expect(element).toBeInstanceOf(customElements.get('uni-map')!)
    expect(element.getAttribute('latitude')).toBe('30')
    expect(instances[0].container).toBe(element.firstElementChild)
    state.latitude = 31
    await vue.nextTick()
    expect(element.getAttribute('latitude')).toBe('31')
    expect(instances[0].setCenter).toHaveBeenCalledTimes(1)
  })
})
