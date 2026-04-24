import {
  __resetTitle,
  clearPageTitle,
  getCurrentTitle,
  setConfigTitle,
  setPageTitle,
  setReportTitle,
} from '../../../public/domain/title'

describe('domain/title', () => {
  beforeEach(() => {
    __resetTitle()
  })

  test('初始三段均为空串', () => {
    expect(getCurrentTitle()).toEqual({ ttn: '', ttpj: '', ttc: '' })
  })

  test('setPageTitle / setConfigTitle / setReportTitle 各自独立', () => {
    setPageTitle('p')
    setConfigTitle('cfg')
    setReportTitle('r')
    expect(getCurrentTitle()).toEqual({ ttn: 'p', ttpj: 'cfg', ttc: 'r' })
  })

  test('非字符串输入 → 视为空串（避免污染上行）', () => {
    setPageTitle(123)
    setConfigTitle({ a: 1 })
    setReportTitle(undefined)
    expect(getCurrentTitle()).toEqual({ ttn: '', ttpj: '', ttc: '' })
  })

  test('clearPageTitle 仅清 page，不影响 config / report', () => {
    setPageTitle('p')
    setConfigTitle('cfg')
    setReportTitle('r')
    clearPageTitle()
    expect(getCurrentTitle()).toEqual({ ttn: '', ttpj: 'cfg', ttc: 'r' })
  })

  test('返回值是浅拷贝，外部 mutate 不影响内部', () => {
    setPageTitle('p')
    const t = getCurrentTitle()
    t.ttn = 'leak'
    expect(getCurrentTitle().ttn).toBe('p')
  })
})
