import path from 'path'
import { execFileSync } from 'child_process'
import ts from 'typescript'
import { rollup } from 'rollup'
import { checkWebVaporVNodes } from '../../../scripts/checkWebVaporVNodes'

const root = path.resolve(__dirname, '../../..')

describe('Web Vapor CustomTabBar', () => {
  let vue: any
  let Component: any
  let code: string
  let dom: any
  let app: any
  let host: HTMLElement
  let tabBar: any
  let route: any
  const globals = new Map<string, any>()

  beforeAll(() => {
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
    vue = jest.requireActual(
      path.join(root, 'packages/uni-h5-vue/dist-x-vapor/vue.runtime.cjs.js')
    )
    code = execFileSync(
      process.execPath,
      [
        '-e',
        `
      const fs = require('fs');
      require('./packages/uni-cli-shared/dist/hbx/alias').initWebVaporAliases();
      const compiler = require('@vue/compiler-sfc');
      const filename = 'packages/uni-components/lib-x-vapor/custom-tab-bar/custom-tab-bar.vue';
      const { descriptor, errors } = compiler.parse(fs.readFileSync(filename, 'utf8'), { filename });
      require('assert/strict').deepEqual(errors, []);
      require('assert/strict').ok(descriptor.scriptSetup, 'Vapor 内置组件必须使用 script setup');
      process.stdout.write(compiler.compileScript(descriptor, {
        id: 'custom-tab-bar', vapor: true, inlineTemplate: true,
        templateOptions: { compiler: require('@dcloudio/compiler-vapor-web'),
          compilerOptions: { isNativeTag: tag => ['uni-tabbar', 'div', 'img'].includes(tag) }
        }
      }).content);
    `,
      ],
      { cwd: root, encoding: 'utf8' }
    )
    code = ts.transpileModule(code, {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2020,
      },
    }).outputText
    const module = { exports: {} as any }
    const compiled = ts.transpileModule(code, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
      },
    }).outputText
    new Function('require', 'module', 'exports', compiled)(
      (id: string) => {
        if (id === 'vue') return vue
        if (id === 'vue-router') return { useRoute: () => route }
        if (id === '@dcloudio/uni-h5')
          return {
            useTabBar: () => tabBar,
            getRealPath: (value: string) => '/web/' + value,
          }
        throw new Error('缺少测试依赖：' + id)
      },
      module,
      module.exports
    )
    Component = module.exports.default
  })

  beforeEach(() => {
    host = document.createElement('div')
    document.body.appendChild(host)
    tabBar = vue.reactive({
      backgroundColor: '#fff',
      color: '#333',
      selectedColor: '#007aff',
      selectedIndex: 0,
      list: [
        {
          pagePath: 'pages/a',
          text: 'A',
          iconPath: 'a.png',
          selectedIconPath: 'a-active.png',
        },
        {
          pagePath: 'pages/b',
          text: 'B',
          iconPath: 'b.png',
          selectedIconPath: 'b-active.png',
          redDot: true,
          badge: '2',
        },
        { pagePath: 'pages/hidden', text: 'Hidden', visible: false },
      ],
    })
    route = vue.reactive({ meta: { isTabBar: false, route: '' } })
  })

  afterEach(() => {
    app?.unmount()
    app = undefined
    host.remove()
  })

  afterAll(() => {
    dom?.window.close()
    for (const [name, value] of globals) {
      if (value === undefined) delete (global as any)[name]
      else (global as any)[name] = value
    }
  })

  test('延迟编译的组件同样通过框架 VNode 检测', async () => {
    expect(code).toContain('defineVaporComponent')
    expect(Component.name).toBe('CustomTabBar')
    expect(Component.emits).toBeUndefined()
    const bundle = await rollup({
      input: 'entry',
      external: (id) => id !== 'entry',
      plugins: [
        {
          name: 'test-entry',
          resolveId: (id) => (id === 'entry' ? id : null),
          load: (id) => (id === 'entry' ? code : null),
        },
        checkWebVaporVNodes(),
      ],
    })
    try {
      await expect(bundle.generate({ format: 'es' })).resolves.toBeDefined()
    } finally {
      await bundle.close()
    }
  })

  test('真实 Vapor 挂载、点击事件及路由同步保持原行为', async () => {
    const tap = jest.fn()
    app = vue.createVaporApp(Component, { onOnTabItemTap: () => tap })
    const vm = app.mount(host)
    expect(vm.selected).toBe(0)
    expect(vm.showIcon).toBe(true)
    expect(vm.direction).toBe('horizontal')
    expect(host.querySelectorAll('.uni-tabbar__item')).toHaveLength(2)
    expect(host.querySelector('img')!.getAttribute('src')).toBe(
      '/web/a-active.png'
    )
    ;(host.querySelectorAll('.uni-tabbar__item')[1] as HTMLElement).click()
    await vue.nextTick()
    expect(tap).toHaveBeenCalledTimes(1)
    expect(tap.mock.calls[0][0]).toEqual({
      index: 1,
      text: 'B',
      pagePath: 'pages/b',
    })
    expect(tabBar.selectedIndex).toBe(1)
    route.meta.isTabBar = true
    route.meta.route = 'pages/a'
    await vue.nextTick()
    expect(vm.selectedIndex).toBe(0)
    expect(tabBar.selectedIndex).toBe(0)
  })

  test('外部 selected 更新及横纵向、无图标模式', async () => {
    const selected = vue.ref(1)
    app = vue.createVaporApp(
      vue.defineVaporComponent(() =>
        vue.createComponent(Component, {
          selected: () => selected.value,
          direction: 'vertical',
          showIcon: false,
        })
      )
    )
    app.mount(host)
    expect(host.querySelector('img')).toBeNull()
    expect(
      (host.querySelector('.uni-tabbar') as HTMLElement).style.flexDirection
    ).toBe('column')
    selected.value = 0
    await vue.nextTick()
    expect(tabBar.selectedIndex).toBe(0)
  })
})
