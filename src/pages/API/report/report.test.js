const PAGE_PATH = '/pages/API/report/report'
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isApp = platformInfo.startsWith('android') ||
  platformInfo.startsWith('ios') ||
  platformInfo.startsWith('harmony')
const isVapor = process.env.UNI_APP_X_DOM2 === 'true'

describe('uni-stat report', () => {
  if (isApp && !isVapor) {
    it('not support in app vdom', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page = null

  beforeAll(async () => {
    page = await program.navigateTo(PAGE_PATH)
    await page.waitFor('view')
  })

  it('reports an object event', async () => {
    await page.callMethod('reportObject')
    expect(await page.data('state.message')).toMatch(/^object_probe：\d+$/)
  })

  it('reports a string event', async () => {
    await page.callMethod('reportString')
    expect(await page.data('state.message')).toBe('string_probe：特殊字符')
  })

  it('reports an event without value', async () => {
    await page.callMethod('reportEmpty')
    expect(await page.data('state.message')).toBe('empty_probe：无参数')
  })

  it('keeps two same-name events', async () => {
    await page.callMethod('reportPair')
    expect(await page.data('state.message')).toMatch(/^duplicate_probe：连续两次 \d+$/)
  })

  it('reports title context', async () => {
    await page.callMethod('reportTitle')
    expect(await page.data('state.message')).toMatch(/^title_context_probe：\d+$/)
  })

  it('reports runtime base information', async () => {
    await page.callMethod('reportBaseInfo')
    expect(await page.data('state.message')).toMatch(/^base_info_probe：\d+$/)
  })
})
