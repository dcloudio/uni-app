import fs from 'fs'
import path from 'path'
import { execFileSync } from 'child_process'
import {
  compileFrameworkTsx,
  evaluateFramework,
  jsxRuntime,
} from './utils/frameworkTsx'

jest.mock('@vue/shared', () =>
  jest.requireActual(
    '../../uni-cli-shared/lib/dom2/web/@vue/shared/dist/shared.cjs.js'
  )
)

const root = path.resolve(__dirname, '../../..')

function compileTeleports() {
  return JSON.parse(
    execFileSync(
      process.execPath,
      [
        '-e',
        `
const fs = require('fs'), path = require('path'), ts = require('typescript');
const alias = require('./packages/uni-cli-shared/node_modules/module-alias');
alias.addAliases(Object.fromEntries(['compiler-core', 'compiler-dom', 'compiler-sfc', 'compiler-ssr', 'compiler-vapor', 'shared']
  .map(name => ['@vue/' + name, path.resolve('packages/uni-cli-shared/lib/dom2/web/@vue/' + name)])));
alias.addAlias('@dcloudio/compiler-vapor-web', path.resolve('packages/uni-cli-shared/lib/dom2/web/@vue/compiler-vapor-web'));
const compiler = require('@dcloudio/compiler-vapor-web'), sfc = require('@vue/compiler-sfc');
const transform = {};
new Function('require', 'exports', ts.transpileModule(fs.readFileSync('packages/uni-cli-shared/src/vue/transforms/transformWebVaporTeleport.ts', 'utf8'),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText)(require, transform);
const template = '<section class="source"><teleport to="page"><span class="static" /></teleport>' +
  '<teleport :to="target" :disabled="disabled" :defer="defer"><span class="dynamic" /></teleport>' +
  '<teleport v-bind="{ to: target, disabled, defer }"><span class="spread" /></teleport>' +
  '<teleport to="#external"><span class="external" /></teleport></section>';
const options = { mode: 'module', prefixIdentifiers: true, nodeTransforms: [transform.transformWebVaporTeleport] };
const source = '<script setup lang="ts">defineProps<{ target: string | Element; disabled: boolean; defer: boolean }>()</script><template>' + template + '</template>';
const descriptor = sfc.parse(source, { filename: 'page-teleport.vue' }).descriptor;
process.stdout.write(JSON.stringify({
  inline: sfc.compileScript(descriptor, { id: 'teleport', vapor: true, inlineTemplate: true,
    templateOptions: { compiler, compilerOptions: options } }).content,
  render: compiler.compile(template, options).code,
  ssr: compiler.compile('<teleport to="page"><span /></teleport>', { ...options, ssr: true }).code
}));
`,
      ],
      { cwd: root, encoding: 'utf8' }
    )
  ) as { inline: string; render: string; ssr: string }
}

describe('Web Vapor Teleport page 目标', () => {
  let dom: any, vue: any, jsx: any, usePageBody: any
  const globals = new Map<string, any>()
  const apps: any[] = []
  let compiled: ReturnType<typeof compileTeleports>
  let warn: jest.SpyInstance

  beforeAll(() => {
    const { JSDOM } = jest.requireActual('jsdom')
    dom = new JSDOM('<!doctype html><body></body>')
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
    for (const [name, value] of Object.entries({
      __X__: true,
      __NODE_JS__: false,
      __UNI_FEATURE_PULL_DOWN_REFRESH__: false,
      __UNI_FEATURE_NAVIGATIONBAR__: false,
    })) {
      globals.set(name, (global as any)[name])
      ;(global as any)[name] = value
    }
    vue = jest.requireActual(
      path.join(root, 'packages/uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js')
    )
    jsx = evaluateFramework(fs.readFileSync(jsxRuntime, 'utf8'), { vue })
    const ResizeSensor = vue.defineVaporComponent({ setup: () => [] })
    usePageBody = evaluateFramework(
      compileFrameworkTsx('page/pageBody', true),
      {
        vue,
        '/vue-jsx/vapor': jsx,
        '@dcloudio/uni-components': { ResizeSensor },
        './page-refresh/component.vue': {},
        './page-refresh': {},
        '../../../helpers/safeArea': {},
        '../../../helpers/useBackgroundColorContent': {
          useBackgroundColorContent: () => {},
        },
      }
    ).default
    compiled = compileTeleports()
  })
  beforeEach(() => {
    warn = jest.spyOn(console, 'warn').mockImplementation(() => {})
  })
  afterEach(() => {
    apps.splice(0).forEach((app) => app.unmount())
    document.body.innerHTML = ''
    const calls = warn.mock.calls
    warn.mockRestore()
    expect(calls).toHaveLength(0)
  })
  afterAll(() => {
    dom.window.close()
    for (const [name, value] of globals) (global as any)[name] = value
  })

  test.each([true, false])(
    '普通页和弹页的静态/动态/整对象目标指向各自正文（inline=%s）',
    async (inline) => {
      const Content = inline
        ? evaluateFramework(compiled.inline, { vue }).default
        : vue.defineVaporComponent({
            props: ['target', 'disabled', 'defer'],
            setup() {
              return evaluateFramework(compiled.render, { vue }).render(
                vue.getCurrentInstance().proxy
              )
            },
          })
      const target = vue.ref('page' as string | Element)
      const disabled = vue.ref(false)
      const defer = vue.ref(false)
      const route = vue.ref('page')
      const bodies: HTMLElement[] = []
      function page(dialog: boolean) {
        return vue.defineVaporComponent({
          name: 'Page',
          setup() {
            const instance = vue.getCurrentInstance()
            instance.__pageBodyId = dialog ? 2 : 1
            const bodyRef = vue.shallowRef(null)
            Object.defineProperty(instance, '__pageBodyEl', {
              configurable: true,
              get: () => bodyRef.value,
            })
            instance.page = {
              vm: { $pageLayoutInstance: instance },
            }
            const render = usePageBody(
              {
                id: instance.__pageBodyId,
                route: dialog ? 'dialog' : 'index',
                navigationBar: {},
              },
              () =>
                vue.createComponent(Content, {
                  target: () => target.value,
                  disabled: () => disabled.value,
                  defer: () => defer.value,
                }),
              {
                attrs: dialog ? { 'data-type': 'dialog' } : {},
                onElement: (element: HTMLElement | null) => {
                  bodyRef.value = element
                  if (element) bodies.push(element)
                },
              }
            )
            return dialog ? render() : [render(), vue.createComponent(Dialog)]
          },
        })
      }
      const Dialog = page(true)
      const Page = page(false)
      const Other = vue.defineVaporComponent({
        setup: () => document.createElement('other-page'),
      })
      const Root = vue.defineVaporComponent({
        setup: () =>
          vue.createComponent(
            vue.VaporKeepAlive,
            { matchBy: () => 'key' },
            {
              default: () =>
                vue.createDynamicComponent(
                  () =>
                    vue.createComponent(route.value === 'page' ? Page : Other),
                  null,
                  null,
                  5,
                  () => route.value
                ),
            }
          ),
      })
      const host = document.createElement('div')
      const external = document.createElement('aside')
      external.id = 'external'
      document.body.append(host, external)
      const app = vue.createVaporApp(Root)
      apps.push(app)
      app.mount(host)
      await vue.nextTick()
      expect(bodies).toHaveLength(2)
      for (const body of bodies) {
        expect(body.querySelectorAll(':scope > .static')).toHaveLength(1)
        expect(body.querySelectorAll(':scope > .dynamic')).toHaveLength(1)
        expect(body.querySelectorAll(':scope > .spread')).toHaveLength(1)
        expect(body.querySelector('.source .dynamic')).toBeNull()
      }
      expect(external.querySelectorAll('.external')).toHaveLength(2)
      target.value = '#external'
      await vue.nextTick()
      expect(external.querySelectorAll('.dynamic')).toHaveLength(2)
      expect(external.querySelectorAll('.spread')).toHaveLength(2)
      target.value = 'page'
      defer.value = true
      await vue.nextTick()
      for (const body of bodies) {
        expect(body.querySelectorAll(':scope > .dynamic')).toHaveLength(1)
        expect(body.querySelectorAll(':scope > .spread')).toHaveLength(1)
      }
      disabled.value = true
      await vue.nextTick()
      for (const body of bodies) {
        expect(body.querySelector('.source .dynamic')).not.toBeNull()
        expect(body.querySelector('.source .spread')).not.toBeNull()
      }
      disabled.value = false
      target.value = external
      await vue.nextTick()
      expect(external.querySelectorAll('.dynamic')).toHaveLength(2)
      expect(external.querySelectorAll('.spread')).toHaveLength(2)
      route.value = 'other'
      await vue.nextTick()
      expect(bodies.every((body) => !body.isConnected)).toBe(true)
      target.value = 'page'
      await vue.nextTick()
      route.value = 'page'
      await vue.nextTick()
      expect(bodies.every((body) => body.isConnected)).toBe(true)
      for (const body of bodies) {
        expect(body.querySelectorAll(':scope > .dynamic')).toHaveLength(1)
        expect(body.querySelectorAll(':scope > .spread')).toHaveLength(1)
      }
    }
  )

  test('实际 Page 的响应式正文引用支持初次挂载的普通页和弹页', async () => {
    const originalRoutes = (global as any).__uniRoutes
    ;(global as any).__uniRoutes = [
      { path: '/dialog', meta: { navigationBar: { style: 'custom' } } },
    ]
    try {
      const Content = evaluateFramework(compiled.inline, { vue }).default
      const setup = Content.setup
      Content.setup = (...args: any[]) => {
        const instance = vue.getCurrentInstance()
        instance.page = { vm: { $pageLayoutInstance: instance.parent } }
        return setup(...args)
      }
      const defineSystemComponent = (options: any) => {
        const setup = options.setup
        options.setup = (...args: any[]) => setup(...args)()
        return vue.defineVaporComponent(options)
      }
      const Page = evaluateFramework(
        compileFrameworkTsx('page/index-vapor', true),
        {
          vue,
          '/vue-jsx/vapor': jsx,
          '@dcloudio/uni-components': { defineSystemComponent },
          '../../../helpers/useDocumentTitle': { useDocumentTitle: () => {} },
          '../../../helpers/dom': { getStateId: () => 1 },
          '../../../helpers/pageBody': { usePageBodyScrollPosition: () => {} },
          '../../setup/provide': {
            providePageMeta: () =>
              vue.reactive({
                id: 1,
                route: 'index',
                navigationBar: { style: 'custom' },
              }),
            usePageRoute: () => ({
              query: { target: 'page', disabled: false, defer: false },
            }),
          },
          './dialogPageRenderer-vapor': { dialogPageRenderer: vue.ref(null) },
          './pageHead-vapor': {},
          './pageBody-vapor': { default: usePageBody },
          '../../setup/page': { createDialogPageId: () => -1 },
          '@dcloudio/uni-core': {
            isDialogPageInstance: (instance: any) =>
              !!instance.attrs['data-type'],
            isNormalDialogPageInstance: () => true,
            isSystemDialogPageInstance: () => false,
          },
        }
      ).default
      Page.__uniPageComponent = Content
      const Root = vue.defineVaporComponent({
        setup() {
          vue.provide('parentInstance', {
            $dialogPages: vue.ref([{}]),
            $systemDialogPages: vue.ref([]),
          })
          return [
            vue.createComponent(Page),
            vue.createComponent(Page, {
              route: () => '/dialog',
              'data-type': () => 'dialog',
            }),
          ]
        },
      })
      const host = document.createElement('div')
      const external = document.createElement('aside')
      external.id = 'external'
      document.body.append(host, external)
      const app = vue.createVaporApp(Root)
      apps.push(app)
      app.mount(host)
      await vue.nextTick()
      const bodies = Array.from(host.querySelectorAll('uni-page-body'))
      expect(bodies).toHaveLength(2)
      for (const body of bodies) {
        expect(body.querySelectorAll(':scope > .static')).toHaveLength(1)
        expect(body.querySelectorAll(':scope > .dynamic')).toHaveLength(1)
        expect(body.querySelectorAll(':scope > .spread')).toHaveLength(1)
      }
    } finally {
      ;(global as any).__uniRoutes = originalRoutes
    }
  })

  test('SSR 保持字符串目标，不调用浏览器页面方法', () => {
    expect(compiled.ssr).toContain('page')
    expect(compiled.ssr).not.toContain('getHTMLElement')
    expect(compiled.ssr).not.toContain('$__uniTeleportRuntime')
  })
})
