import fs from 'fs'
import path from 'path'
import ts from 'typescript'
import { preprocess } from '../../uni-preprocess'

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
