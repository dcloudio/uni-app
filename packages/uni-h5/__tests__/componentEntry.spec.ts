import fs from 'fs'
import path from 'path'
import { execFileSync } from 'child_process'
import ts from 'typescript'
import jscc from 'rollup-plugin-jscc'
import { compileScript, compileTemplate, parse } from '@vue/compiler-sfc'
import {
  H5_BUILT_IN_TAGS,
  TAGS,
  isH5CustomElement,
  isH5NativeTag,
} from '../../uni-shared/src/tags'
import { preprocess } from '../../uni-preprocess'

const root = path.resolve(__dirname, '..')

async function compileEntry(file: string, vapor: boolean, node: boolean) {
  const plugin = jscc({
    values: { _X_: 1, _X_VAPOR_: vapor ? 1 : 0, _NODE_JS_: node ? 1 : 0 },
  })
  return (await (plugin.load as any).call({}, path.join(root, file)))
    .code as string
}

describe('Web 框架组件入口', () => {
  test.each([false, true])('PageHead 静态绑定 Input（Vapor=%s）', (vapor) => {
    const filename = path.join(
      root,
      'src/framework/components/page/pageHead.vue'
    )
    const source = preprocess(fs.readFileSync(filename, 'utf8'), {
      type: 'js',
      context: { WEB: true, VUE3_VAPOR: vapor },
    }).code
    const { descriptor } = parse(source, { filename })
    const script = compileScript(descriptor, { id: 'page-head' })
    expect(script.bindings?.Input).toBeDefined()
    const template = compileTemplate({
      source: descriptor.template!.content,
      filename,
      id: 'page-head',
      compilerOptions: { bindingMetadata: script.bindings },
    })
    expect(template.errors).toEqual([])
    expect(template.code).not.toMatch(/resolveComponent\(["']Input["']\)/)
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
      expect(setup).toContain("from '../components/layout/index-vapor.vue'")
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
    for (const name of ['Button', 'Input', 'Textarea']) {
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
    expect(entry).not.toMatch(/default as (Button|Input|Textarea)\b/)
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
})
