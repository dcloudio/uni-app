import fs from 'fs-extra'
import { resolve } from 'path'
import type { EmittedFile } from 'rollup'
import { transformMain } from '../../../src/plugins/android/uvue/sfc/main'
import type { ResolvedOptions } from '../../../src/plugins/android/uvue/sfc/index'

describe('SFC sourceMap', () => {
  const root = resolve(__dirname, 'examples/sourcemap/src')
  const outDir = resolve(__dirname, 'examples/sourcemap/dist')
  const pagesDir = resolve(root, 'pages')
  const mockOptions: ResolvedOptions = {
    root,
    sourceMap: true,
    targetLanguage: 'kotlin',
    classNamePrefix: 'Gen',
    componentType: 'page',
    genDefaultAs: '__sfc__',
  }
  const mockPluginContext = {
    resolve: (id: string) => id,
  } as any

  beforeAll(() => {
    // Set required environment variables
    ;(process.env as any).UNI_INPUT_DIR = root
  })

  afterAll(() => {
    delete (process.env as any).UNI_INPUT_DIR
  })

  function createTest(name: string) {
    return async () => {
      const filename = resolve(pagesDir, `${name}.vue`)
      const vueCode = fs.readFileSync(filename, 'utf-8')

      await transformMain(vueCode, filename, mockOptions, {
        ...mockPluginContext,
        emitFile: (options: EmittedFile) => {
          const { type, fileName } = options
          if (type === 'asset') {
            if (fileName?.endsWith('.map')) {
              // 输出sourcemap文件
              fs.outputFileSync(
                resolve(outDir, fileName),
                options.source as string
              )
              // 验证sourcemap内容
              expect(options.source).toMatchSnapshot(`${name}.vue.map`)
            } else if (fileName?.endsWith('.vue')) {
              // 输出生成的代码文件
              fs.outputFileSync(
                resolve(outDir, fileName),
                options.source as string
              )
              expect(options.source).toMatchSnapshot(`${name}.vue`)
            }
          }
        },
      })
    }
  }

  test('template only', createTest('template'))
  test('template with script', createTest('template-script'))
  test('template with script setup', createTest('template-setup'))
  test('template with style', createTest('template-style'))

  // 测试不同块顺序 - 两个块
  test('script-template order', createTest('script-template'))
  test('style-template order', createTest('style-template'))
  test('setup-template order', createTest('setup-template'))

  // 测试不同块顺序 - 三个块（全排列）
  test('template-script-style order', createTest('template-script-style'))
  test('template-style-script order', createTest('template-style-script'))
  test('script-template-style order', createTest('script-template-style'))
  test('script-style-template order', createTest('script-style-template'))
  test('style-template-script order', createTest('style-template-script'))
  test('style-script-template order', createTest('style-script-template'))

  // 测试script setup的所有排列组合
  test('template-setup-style order', createTest('template-setup-style'))
  test('template-style-setup order', createTest('template-style-setup'))
  test('setup-template-style order', createTest('setup-template-style'))
  test('setup-style-template order', createTest('setup-style-template'))
  test('style-template-setup order', createTest('style-template-setup'))
  test('style-setup-template order', createTest('style-setup-template'))
})
