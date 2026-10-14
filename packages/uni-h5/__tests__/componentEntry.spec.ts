import fs from 'fs'
import path from 'path'
import jscc from 'rollup-plugin-jscc'

const root = path.resolve(__dirname, '..')

async function compileEntry(file: string, vapor: boolean, node: boolean) {
  const plugin = jscc({
    values: { _X_: 1, _X_VAPOR_: vapor ? 1 : 0, _NODE_JS_: node ? 1 : 0 },
  })
  return (await (plugin.load as any).call({}, path.join(root, file)))
    .code as string
}

describe('Web 框架组件入口', () => {
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
    expect(entry).not.toContain('uni-components/src/index-vapor')
  })
})
