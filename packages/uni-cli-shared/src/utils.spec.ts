import { normalizeIdentifier } from './utils'
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
      'PagesIndex20__Index'
    )
    expect(normalizeIdentifier('pages/index3--0/index')).toBe(
      'PagesIndex3_0Index'
    )
    expect(normalizeIdentifier('pages/index4---0/index')).toBe(
      'PagesIndex4__0Index'
    )

    expect(normalizeIdentifier('pages/index5 0/index')).toBe(
      'PagesIndex50Index'
    )
  })
})
