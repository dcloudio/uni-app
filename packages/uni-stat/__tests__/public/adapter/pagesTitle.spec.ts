import {
  __resetPagesTitleCache,
  getPagesJsonNavigationTitle,
} from '../../../src/public/adapter/pagesTitle'

/**
 * 覆盖 VUE3 路径（`UNI_STAT_TITLE_JSON`）。
 * VUE2 在应用打包阶段走 `uni-pages` 虚拟模块，单测环境无法模拟，由构建对齐私有版。
 */
describe('adapter/pagesTitle', () => {
  const prev = process.env.UNI_STAT_TITLE_JSON

  afterEach(() => {
    __resetPagesTitleCache()
    if (prev === undefined) {
      delete process.env.UNI_STAT_TITLE_JSON
    } else {
      process.env.UNI_STAT_TITLE_JSON = prev
    }
  })

  test('按 path 命中 navigationBarTitleText', () => {
    process.env.UNI_STAT_TITLE_JSON = JSON.stringify({
      'pages/detail/detail': '订单详情页',
    })
    expect(getPagesJsonNavigationTitle('pages/detail/detail')).toBe(
      '订单详情页'
    )
    expect(getPagesJsonNavigationTitle('/pages/detail/detail')).toBe(
      '订单详情页'
    )
  })

  test('带 query 时 strip 后再查表', () => {
    process.env.UNI_STAT_TITLE_JSON = JSON.stringify({
      'pages/index/index': '首页',
    })
    expect(getPagesJsonNavigationTitle('pages/index/index?foo=1')).toBe('首页')
  })

  test('缺失 env 或解析失败 → 空串', () => {
    delete process.env.UNI_STAT_TITLE_JSON
    expect(getPagesJsonNavigationTitle('pages/a')).toBe('')
  })
})
