import { resolve } from 'node:path'
import { EasyComContext } from '../src'
import { parseEasyComTag, parseGlob } from '../src/easycom/options'
const inputDir = resolve(__dirname, 'examples/easycom')
const outputDir = resolve(__dirname, 'examples/easycom/unpackage/dist/dev/app')
describe('easycom', () => {
  test('parseGlob', () => {
    expect(
      parseGlob('@dcloudio/uni-ui/lib/uni-*/uni-*.vue', inputDir)
    ).toContain('/easycom/node_modules/@dcloudio/uni-ui/lib/uni-*/uni-*.vue')
  })
  test('parseEasyComTag', () => {
    const easyComTag = parseEasyComTag(
      '^uni-(.*)',
      '@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue',
      inputDir
    )
    expect(easyComTag).toMatchObject({
      tag: '^uni-(.*)',
      path: '@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue',
    })
    expect(easyComTag.glob).toContain(
      `/easycom/node_modules/@dcloudio/uni-ui/lib/uni-*/uni-*.vue`
    )
    expect(
      easyComTag.parseTag(
        `/easycom/node_modules/@dcloudio/uni-ui/lib/uni-badge/uni-badge.vue`
      )
    ).toBe('uni-badge')
  })
  test('searchComponents', () => {
    const ctx = new EasyComContext({
      inputDir,
      outputDir,
      dts: resolve(inputDir, 'easycom.d.ts'),
    })
    ctx.searchComponents()
    expect(ctx.componentMap['test']).not.toBeUndefined()
    expect(ctx.componentMap['uni-badge']).not.toBeUndefined()
    ctx.generateDeclaration()
  })
})
