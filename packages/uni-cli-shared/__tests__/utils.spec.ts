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

  test('test: isAppVue', () => {
    expect(isAppVue('/xx/xx/app.vue')).toBe(true)
    expect(isAppVue('/xx/xx/app.uvue')).toBe(true)
    expect(isAppVue('/xx/xx/App.uvue')).toBe(true)
    expect(isAppVue('/xx/xx/App.vue')).toBe(true)
    expect(isAppVue('/xx/xx/App.vue')).toBe(true)
    expect(isAppVue('./xx/xx/App.vue')).toBe(true)
    expect(isAppVue('./xx/xx/App.vue')).toBe(true)
    const filePath = 'D:\\user\\file\\app.vue'
    expect(isAppVue(filePath)).toBe(true)
  })
})
