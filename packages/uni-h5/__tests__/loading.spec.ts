import fs from 'fs'
import path from 'path'
import ts from 'typescript'
import { preprocess } from '../../uni-preprocess'
import { parse } from '@vue/compiler-sfc'
import jscc from 'rollup-plugin-jscc'

const root = path.resolve(__dirname, '../../..')
const loadingDir = 'uni-ext-api/uni_modules/uni-loading/components/loading/'

function loadingSource(file: string, web: boolean, vapor: boolean) {
  return preprocess(
    fs.readFileSync(path.join(root, loadingDir, file), 'utf8'),
    {
      context: { WEB: web, H5: web, MP: !web, APP: false, VUE3_VAPOR: vapor },
    }
  ).code
}

describe('Loading 平台观察器', () => {
  test.each([
    [true, false],
    [true, true],
    [false, true],
  ])('只创建并清理一个观察器（Web=%s，Vapor=%s）', (web, vapor) => {
    const source = fs.readFileSync(
      path.resolve(
        __dirname,
        '../../../uni-ext-api/uni_modules/uni-loading/components/loading/useLoadingStyle.ts'
      ),
      'utf8'
    )
    const code = ts.transpileModule(
      preprocess(source, {
        type: 'js',
        context: { WEB: web, APP: !web, VUE3_VAPOR: vapor },
      }).code,
      { compilerOptions: { module: ts.ModuleKind.CommonJS } }
    ).outputText
    const observe = jest.fn()
    const disconnect = jest.fn()
    const native = jest.fn(() => ({ observe, disconnect }))
    const uni = jest.fn(() => ({ observe, disconnect }))
    let mounted!: () => void
    let unmounted!: () => void
    let effect!: () => void
    const vue = {
      ref: (value: unknown) => ({ value }),
      onMounted: (fn: () => void) => (mounted = fn),
      onUnmounted: (fn: () => void) => (unmounted = fn),
      watchEffect: (fn: () => void) => {
        effect = fn
        fn()
      },
    }
    const module = { exports: {} as any }
    new Function(
      'require',
      'ResizeObserver',
      'UniResizeObserver',
      'module',
      'exports',
      code
    )(() => vue, native, uni, module, module.exports)
    const element = {
      getBoundingClientRect: () => ({ width: 32, height: 20 }),
    }
    const bold = { value: false }
    const style = module.exports.useLoadingStyle({ value: element }, bold)
    mounted()
    expect(native).toHaveBeenCalledTimes(web ? 1 : 0)
    expect(uni).toHaveBeenCalledTimes(web ? 0 : 1)
    expect(observe).toHaveBeenCalledTimes(1)
    expect(observe).toHaveBeenCalledWith(element)
    expect(style.width.value).toBe('20px')
    expect(style.borderWidth.value).toBe('1.25px')
    bold.value = true
    effect()
    expect(style.borderWidth.value).toBe('2.5px')
    expect(observe).toHaveBeenCalledTimes(1)
    unmounted()
    expect(disconnect).toHaveBeenCalledTimes(1)
  })
})

describe('Loading 宿主与平台隔离', () => {
  test('Web Vapor 使用单个基础根节点和普通 ref', () => {
    const { descriptor, errors } = parse(
      loadingSource('loading.vue', true, true)
    )
    expect(errors).toEqual([])
    const elements = descriptor.template!.ast!.children.filter(
      (node) => node.type === 1
    ) as any[]
    expect(elements).toHaveLength(1)
    expect(elements[0].tag).toBe('view')
    expect(descriptor.template!.content).toContain('ref="LoadingRef"')
    expect(descriptor.template!.content).not.toContain('uni-loading=""')
    expect(descriptor.template!.content).not.toContain('uni-loading-element')
    const element = loadingSource('element.ts', true, true)
    expect(element).not.toContain('Symbol.hasInstance')
    expect(element).not.toContain('initLoadingElement')
  })

  test.each([
    [true, false],
    [false, false],
    [false, true],
  ])('旧 Web 和 MP 保持原宿主及 Element（Web=%s，Vapor=%s）', (web, vapor) => {
    const source = loadingSource('loading.vue', web, vapor)
    expect(source).toContain('<uni-loading-element')
    expect(source).not.toContain('uni-loading=""')
    expect(source).not.toContain('setLoadingRef')
    const element = loadingSource('element.ts', web, vapor)
    expect(element).not.toContain('Symbol.hasInstance')
    expect(element).not.toContain('initLoadingElement')
  })

  test('内部 Loading 入口在两种构建只引入对应实现', async () => {
    const file = 'packages/uni-components/src/vue/loading/index.ts'
    for (const vapor of [false, true]) {
      const plugin = jscc({
        values: { _X_: 1, _X_VAPOR_: +vapor, _NODE_JS_: 0 },
      })
      const { code } = await (plugin.load as any).call(
        {},
        path.join(root, file)
      )
      expect(
        code.includes(
          '@dcloudio/uni-ext-component/uni-loading/components/loading/loading.uvue'
        )
      ).toBe(vapor)
      expect(code.includes('./index-x.vue')).toBe(!vapor)
    }
  })
})
