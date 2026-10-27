const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isWeb = platformInfo.startsWith('web')
const isMP = platformInfo.startsWith('mp')
const isVapor = process.env.UNI_APP_X_DOM2 === "true"

const PAGE_PATH = '/pages/API/create-selector-query/create-selector-query-onScroll'

describe('create-selector-query-onScroll', () => {
  if (isWeb || isMP || isVapor || process.env.UNI_TEST_DEVICES_DIRECTION == 'landscape') {
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(500);
  })


  it('test-createSelectorQuery-onScroll', async () => {

    let x = 100
    let y = 250
    // 滑动事件
    await program.device.swipe( x, y, x, y-100, 300)

    await page.waitFor(600);
    const ret = await page.data('data.ret')
    expect(ret).toBe(true)
  })
})
