import { isAppVue, normalizeIdentifier } from '../src/utils'
describe('test: packages/uni-cli-shared/src/utils.ts', () => {
  test('test:normalizeIdentifier', () => {
    // 根据 path 返回合法 js 变量
    expect(normalizeIdentifier('pages/index/index')).toBe('PagesIndexIndex')
    expect(normalizeIdentifier('pages/index0.0/index')).toBe(
      'PagesIndex00Index'
    )
    // note: filter `-`
    expect(normalizeIdentifier('pages/index1-0/index')).toBe(
      'PagesIndex10Index'
    )
    expect(normalizeIdentifier('pages/index2-0///index')).toBe(
      'PagesIndex20Index'
    )
    expect(normalizeIdentifier('pages/index3--0/index')).toBe(
      'PagesIndex30Index'
    )
    expect(normalizeIdentifier('pages/index4---0/index')).toBe(
      'PagesIndex40Index'
    )

    expect(normalizeIdentifier('pages/index5 0/index')).toBe(
      'PagesIndex50Index'
    )
    expect(normalizeIdentifier('2pages/index6/index')).toBe(
      '_2pagesIndex6Index'
    )
  })
  test('test:isAppVue', () => {
    // define env.UNI_INPUT_DIR
    process.env.UNI_INPUT_DIR = 'UNI_INPUT_DIR'
    // mock path.resolve() 结果
    const path = require('path')
    const fs = require('fs')
    path.resolve = jest.fn().mockReturnValue('UNI_INPUT_DIR/App.uvue')

    // 判断 .uvue
    fs.existsSync = jest.fn().mockReturnValue(true)
    expect(isAppVue('UNI_INPUT_DIR/App.uvue')).toBe(true)
    expect(isAppVue('UNI_INPUT_DIR/pages/index/index.uvue')).toBe(false)
    expect(isAppVue('UNI_INPUT_DIR/pages/index/indexApp.uvue')).toBe(false)

    path.resolve = jest.fn().mockReturnValue('UNI_INPUT_DIR/App.vue')

    // 判断 .vue
    fs.existsSync = jest.fn().mockReturnValue(false)
    expect(isAppVue('UNI_INPUT_DIR/App.vue')).toBe(true)
    expect(isAppVue('UNI_INPUT_DIR/pages/index/index.vue')).toBe(false)
    expect(isAppVue('UNI_INPUT_DIR/pages/index/indexApp.vue')).toBe(false)

    // 清理
    process.env.UNI_INPUT_DIR = ''
    path.resolve.mockClear()
    fs.existsSync.mockClear()
  })
})
