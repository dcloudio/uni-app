import fs from 'fs'
import path from 'path'
import { execFileSync } from 'child_process'
import ts from 'typescript'
import jscc from 'rollup-plugin-jscc'
import { compileFrameworkTsx } from './utils/frameworkTsx'
import {
  H5_BUILT_IN_TAGS,
  TAGS,
  isH5CustomElement,
  isH5NativeTag,
} from '../../uni-shared/src/tags'

const root = path.resolve(__dirname, '..')

async function compileEntry(file: string, vapor: boolean, node: boolean) {
  const plugin = jscc({
    values: { _X_: 1, _X_VAPOR_: vapor ? 1 : 0, _NODE_JS_: node ? 1 : 0 },
  })
  return (await (plugin.load as any).call({}, path.join(root, file)))
    .code as string
}

describe('Web 框架组件入口', () => {
  test.each([
    [false, false],
    [false, true],
    [true, false],
    [true, true],
  ])(
    'Vapor 跳过旧视图插件，保留原生事件入口（Vapor=%s，Node=%s）',
    async (vapor, node) => {
      const code = await compileEntry(
        'src/framework/plugin/index.ts',
        vapor,
        node
      )
      const initApp = jest.fn()
      const initViewPlugin = jest.fn()
      const initServicePlugin = jest.fn()
      const setNativeEventNormalizer = jest.fn()
      const normalizeVaporNativeEvent = jest.fn()
      const imports: Record<string, any> = {
        vue: { setRealPathResolver: jest.fn(), setNativeEventNormalizer },
        '@dcloudio/uni-core': {
          initViewPlugin,
          initServicePlugin,
          normalizeVaporNativeEvent,
        },
        '@dcloudio/uni-vue': { initApp },
        '../../platform': { getRealPath: jest.fn() },
        './router': { initRouter: jest.fn() },
      }
      const exports: any = {}
      new Function(
        'require',
        'exports',
        '__UNI_FEATURE_PAGES__',
        ts.transpileModule(code, {
          compilerOptions: { module: ts.ModuleKind.CommonJS },
        }).outputText
      )(
        (id: string) => {
          if (!(id in imports)) throw new Error(`意外依赖：${id}`)
          return imports[id]
        },
        exports,
        false
      )
      const app = { config: {} }
      exports.default.install(app)
      expect(initApp).toHaveBeenCalledWith(app)
      expect(initServicePlugin).toHaveBeenCalledWith(app)
      expect(initViewPlugin).toHaveBeenCalledTimes(vapor ? 0 : 1)
      if (vapor && !node) {
        expect(setNativeEventNormalizer).toHaveBeenCalledWith(
          normalizeVaporNativeEvent
        )
      } else {
        expect(setNativeEventNormalizer).not.toHaveBeenCalled()
      }
    }
  )

  test.each([false, true])(
    '仅 VDOM 注入 animation mixin，保留已有配置（Vapor=%s）',
    async (vapor) => {
      const code = await compileEntry(
        '../uni-components/src/helpers/component.ts',
        vapor,
        true
      )
      const animation = { mounted: jest.fn() }
      const load = jest.fn((id: string) => {
        if (id === './animation') return { default: animation }
        if (id === './component-vapor' || id === './component-vdom') {
          return { defineComponent: (options: unknown) => options }
        }
        if (id === '@vue/shared') return {}
        throw new Error(`意外依赖：${id}`)
      })
      const exports: any = {}
      new Function(
        'require',
        'exports',
        '__X__',
        '__NODE_JS__',
        ts.transpileModule(code, {
          compilerOptions: { module: ts.ModuleKind.CommonJS },
        }).outputText
      )(load, exports, true, true)
      const existingMixin = {}
      for (const props of [undefined, {}, { animation: Object }]) {
        const options = { props, mixins: [existingMixin] }
        expect(exports.defineBuiltInComponent(options)).toBe(options)
        expect(options.mixins).toEqual(
          !vapor && !props?.animation
            ? [existingMixin, animation]
            : [existingMixin]
        )
      }
      const options: any = {}
      exports.defineBuiltInComponent(options)
      expect(options.mixins).toEqual(vapor ? undefined : [animation])
      const system: any = {}
      exports.defineSystemComponent(system)
      expect(system.mixins).toBeUndefined()
      expect(load.mock.calls.some(([id]) => id === './animation')).toBe(!vapor)
    }
  )

  test('Vapor 窗口直接读取公开根元素，不再使用 VNode 查找', () => {
    const layout = fs.readFileSync(
      path.join(root, 'src/framework/components/layout/index-vapor.tsx'),
      'utf8'
    )
    expect(layout).not.toContain('resolveOwnerEl')
    expect(
      layout.match(/const el = instance\.\$el as HTMLElement/g)
    ).toHaveLength(3)
  })

  test.each([false, true])('PageHead 静态绑定 Input（Vapor=%s）', (vapor) => {
    const code = compileFrameworkTsx('page/pageHead', vapor)
    expect(code).toMatch(/import\s*\{[^}]*\bInput\b/)
    expect(code).not.toMatch(/resolveComponent\(["']Input["']\)/)
  })

  test.each([false, true])(
    'Vapor 不引入旧 Picker 和 MatchMedia（Node=%s）',
    async (node) => {
      const components = await compileEntry(
        'src/view/components/index-vapor.ts',
        true,
        node
      )
      const entry = await compileEntry('src/index-vapor.ts', true, node)
      expect(components).not.toContain("from './picker/index'")
      expect(components).not.toContain(
        "from '../../x/view/components/customElements'"
      )
      expect(entry).not.toContain("from './x/view/components/customElements'")
      expect(entry).toContain("export * from './x/view/components/index-vapor'")
      expect(entry).not.toContain("from '@dcloudio/uni-components'")
      expect(entry).toContain("from './view/components/index-vapor'")
      expect(entry).not.toContain("from './view/components'")
      const setup = await compileEntry(
        'src/framework/setup/index.ts',
        true,
        node
      )
      expect(setup).not.toContain("from '../..'")
      expect(setup).toContain("from '../components/layout/index-vapor'")
    }
  )

  test.each([false, true])(
    '非 Vapor 保留旧组件入口（Node=%s）',
    async (node) => {
      const components = await compileEntry(
        'src/view/components/index.ts',
        false,
        node
      )
      expect(components).toContain(
        "import Picker, { UniPickerElement } from './picker/index'"
      )
      expect(components).not.toContain(
        "export { Picker, MatchMedia } from '@dcloudio/uni-components'"
      )
      expect(components).not.toMatch(
        /export\s*\{\s*UniPickerElement,\s*UniMatchMediaElement,?\s*\}/
      )
      expect(
        components.includes("from '../../x/view/components/customElements'")
      ).toBe(!node)
      const entry = await compileEntry('src/index.ts', false, node)
      expect(entry).toContain("from '@dcloudio/uni-components'")
      expect(entry).not.toContain(
        "export * from './x/view/components/index-vapor'"
      )
    }
  )

  test('Vapor 临时接入旧表单组件，不导出旧上下文或列表组件', () => {
    const componentsRoot = path.resolve(root, '../uni-components/src')
    const vapor = fs.readFileSync(
      path.join(componentsRoot, 'index-vapor.ts'),
      'utf8'
    )
    const standard = fs.readFileSync(
      path.join(componentsRoot, 'index.ts'),
      'utf8'
    )
    const components = fs.readFileSync(
      path.join(componentsRoot, 'vue/index-x-vapor.ts'),
      'utf8'
    )
    expect(vapor).not.toMatch(/uniFormKey|UniFormCtx|vue\/form/)
    expect(standard).toContain("export { uniFormKey } from './vue/form'")
    for (const name of ['Input', 'Textarea']) {
      expect(components).toContain(`  ${name},`)
      expect(components).toContain(`  Uni${name}Element,`)
    }
    expect(components).not.toMatch(
      /\b(?:ListView|ListItem|StickySection|StickyHeader|UniListViewElement|UniListItemElement|UniStickySectionElement|UniStickyHeaderElement)\b/
    )
  })

  test('Vapor 公开入口只包含配置启用的组件，不导出内部辅助方法', () => {
    const entry = fs.readFileSync(
      path.join(root, 'src/x/view/components/index-vapor.ts'),
      'utf8'
    )
    expect(entry).not.toMatch(/default as (Input|Textarea)\b/)
    expect(entry).toContain('default as Button')
    expect(entry).toContain('default as Progress')
    expect(entry).toContain('default as Picker')
    expect(entry).toContain('default as Loading')
    expect(entry).toContain('UniLoadingElement as UniLoadingElementImpl')
    expect(
      fs.readFileSync(
        path.resolve(root, '../uni-components/src/vue/index-x-vapor.ts'),
        'utf8'
      )
    ).not.toContain('./loading/index-x.vue')
    expect(entry).not.toContain('uni-components/src/index-vapor')
  })
})

describe('框架构建的结构标签分类', () => {
  // 直接读取构建配置中的函数，避免测试复制分类逻辑或执行配置的源码同步副作用。
  const source = fs.readFileSync(path.join(root, 'vite.config.ts'), 'utf8')
  const ast = ts.createSourceFile(
    'vite.config.ts',
    source,
    ts.ScriptTarget.Latest,
    true
  )
  const functions = ast.statements
    .filter(
      (node) =>
        ts.isFunctionDeclaration(node) &&
        ['realIsH5NativeTag', 'realIsH5CustomElement'].includes(
          node.name?.text || ''
        )
    )
    .map((node) => node.getText(ast))
    .join('\n')
  const code = ts.transpileModule(functions, {}).outputText
  const getOptions = (isX: boolean, isX_VAPOR: boolean) =>
    new Function(
      'TAGS',
      'isH5NativeTag',
      'isH5CustomElement',
      'isX',
      'isX_VAPOR',
      `${code}; return { isNativeTag: realIsH5NativeTag, isCustomElement: realIsH5CustomElement }`
    )(TAGS, isH5NativeTag, isH5CustomElement, isX, isX_VAPOR)

  test('SFC 构建配置使用框架专用标签判断', () => {
    expect(source).toContain('isNativeTag: realIsH5NativeTag')
    expect(source).toContain('isCustomElement: realIsH5CustomElement')
  })

  test.each([false, true])('非 Vapor 分类不变（X=%s）', (isX) => {
    const options = getOptions(isX, false)
    for (const tag of [
      ...TAGS,
      ...H5_BUILT_IN_TAGS,
      'div',
      'span',
      'svg',
      'UnknownComponent',
    ]) {
      expect(options.isNativeTag(tag)).toBe(isH5NativeTag(tag))
      expect(options.isCustomElement(tag)).toBe(isH5CustomElement(tag, isX))
    }
  })

  test('Vapor 仅将结构标签改为普通元素', () => {
    const options = getOptions(true, true)
    for (const tag of TAGS) {
      expect(options.isNativeTag(tag)).toBe(true)
      expect(options.isCustomElement(tag)).toBe(false)
    }
    for (const tag of [...H5_BUILT_IN_TAGS, 'div', 'svg', 'UnknownComponent']) {
      expect(options.isNativeTag(tag)).toBe(isH5NativeTag(tag))
      expect(options.isCustomElement(tag)).toBe(isH5CustomElement(tag, true))
    }
  })

  test('实际 Vapor 编译保留 slot、ref、动态属性和真正自定义元素', () => {
    const result = JSON.parse(
      execFileSync(
        process.execPath,
        [
          '-e',
          `
      const fs = require('fs');
      const { code, tags } = JSON.parse(fs.readFileSync(0, 'utf8'));
      require('./packages/uni-cli-shared/dist/hbx/alias').initWebVaporAliases();
      const { compile } = require('@dcloudio/compiler-vapor-web');
      const { isH5NativeTag, isH5CustomElement } = require('./packages/uni-shared/dist/uni-shared.cjs.js');
      const options = new Function('TAGS', 'isH5NativeTag', 'isH5CustomElement', 'isX', 'isX_VAPOR',
        code + '; return { isNativeTag: realIsH5NativeTag, isCustomElement: realIsH5CustomElement }'
      )(tags, isH5NativeTag, isH5CustomElement, true, true);
      process.stdout.write(JSON.stringify([
        compile('<uni-page-wrapper ref="wrapper" v-bind="props"><uni-page-body><slot /></uni-page-body></uni-page-wrapper>', options).code,
        compile('<uni-layout><uni-main v-if="visible"><div>{{msg}}</div></uni-main><uni-input :value="value" /></uni-layout>', options).code
      ]));
    `,
        ],
        {
          cwd: path.resolve(root, '../..'),
          input: JSON.stringify({ code, tags: TAGS }),
          encoding: 'utf8',
        }
      )
    ) as string[]
    expect(result[0]).toContain('_template("<uni-page-wrapper')
    expect(result[0]).toContain('<uni-page-body>')
    expect(result[0]).not.toContain('createPlainElement')
    expect(result[0]).toContain('createSlot')
    expect(result[0]).toContain('setDynamicProps')
    expect(result[0]).toContain('wrapper')
    expect(result[1]).toContain('_template("<uni-layout')
    expect(result[1]).toContain('_template("<uni-main')
    expect(result[1]).toContain('_createPlainElement("uni-input"')
    expect(result[1]).toContain('createIf')
    for (const output of result) {
      expect(output).not.toContain('resolveComponent')
    }
  })

  // 页面缓存与路由切换由 frameworkTsx.spec.ts 使用真实 Vapor runtime 验证。
})
