const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isVapor = process.env.UNI_APP_X_DOM2 === 'true'
const isApp = platformInfo.startsWith('android') || platformInfo.startsWith('ios') || platformInfo.startsWith('harmony')
const isSupported = platformInfo.startsWith('web') || platformInfo.startsWith('mp-weixin') || (isApp && isVapor)
const PAGE_PATH = '/pages/template/echarts-miniprogram/echarts-miniprogram'

describe('echarts-miniprogram', () => {
  if (!isSupported) {
    it('only supports web, WeChat mini program or app vapor', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    await page.waitFor(1500)
  })

  it('initializes chart and switches data set', async () => {
    const button = await page.$('.action-button')
    let state = await page.callMethod('jest_getState')

    expect(button).not.toBeNull()
    expect(await button.text()).toBe('Switch data set')
    expect(state.chartInited).toBe(true)
    expect(state.activeDataSet).toBe(0)

    await button.tap()
    await page.waitFor(100)
    state = await page.callMethod('jest_getState')

    expect(state.activeDataSet).toBe(1)
  })
})
