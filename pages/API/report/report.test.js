const PAGE_PATH = '/pages/API/report/report'
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isHarmony = platformInfo.startsWith('harmony')

describe('report', () => {
  if (isMP || isHarmony || process.env.NODE_ENV != 'production') {
  	it('not support', () => {
  		expect(1).toBe(1)
  	})
  	return
  }

  let page = null
  beforeAll(async () => {
    page = await program.navigateTo(PAGE_PATH)
    await page.waitFor('view')
  })
  it('Report - onLaunch', async () => {
    await page.callMethod('handleAppLaunch')
    const msg = await page.data('msg.value')
    expect(msg).toBe('onLaunch --> report:ok')
  })
  it('Report - onShow', async () => {
    await page.callMethod('handleAppShow')
    const msg = await page.data('msg.value')
    expect(msg).toBe('onAppShow --> report:ok')
  })
  it('Report - onHide', async () => {
    await page.callMethod('handleAppHide')
    const msg = await page.data('msg.value')
    expect(msg).toBe('onAppHide --> report:ok')
  })
  it('Report - onError', async () => {
    await page.callMethod('handleAppError')
    const msg = await page.data('msg.value')
    expect(msg).toBe('onAppError --> report:ok')
  })
  it('Report - customTitle', async () => {
    await page.callMethod('handleTitle')
    const msg = await page.data('msg.value')
    expect(msg).toBe('自定义title --> report:ok')
  })
  it('Report - customEvent', async () => {
    await page.callMethod('handleEvent')
    const msg = await page.data('msg.value')
    expect(msg).toBe('自定义事件 --> report:ok')
  })
})
