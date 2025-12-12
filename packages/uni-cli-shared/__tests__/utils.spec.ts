import { isAppVue, normalizeIdentifier } from '../src/utils'

describe('test: packages/uni-cli-shared/src/utils.ts', () => {
  const oldInputDir = process.env.UNI_INPUT_DIR
  const oldAppX = process.env.UNI_APP_X

  afterAll(() => {
    // restore
    process.env.UNI_INPUT_DIR = oldInputDir
    process.env.UNI_APP_X = oldAppX
  })
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

  test('test: isAppVue', () => {
    // app
    process.env.UNI_APP_X = 'false'
    process.env.UNI_INPUT_DIR = '/xx/xx'
    expect(isAppVue('/xx/xx/App.vue')).toBe(true)
    // not windows

    // app_x
    process.env.UNI_APP_X = 'true'
    const fs = require('fs')
    const mockExistsSync = jest.spyOn(fs, 'existsSync').mockReturnValue(true)
    expect(isAppVue('/xx/xx/App.uvue')).toBe(true)
    mockExistsSync.mockRestore()
  })
})
