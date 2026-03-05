const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')
const isHarmony = platformInfo.startsWith('harmony')

const PAGE_PATH = '/pages/component/global-events/touch-events-bubbles'

describe('touch-events-test', () => {

  if (isAndroid || isWeb || isMP || process.env.UNI_TEST_DEVICES_DIRECTION == 'landscape') {
    it('other platform', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view');
    await page.waitFor(500);
  })

  it('touch-event-bubbles-test1', async () => {
    const pageData = await page.data('data')
    let iconRect = pageData.iconRect
    if (isHarmony && iconRect.x < 20) {
      iconRect.x = 144
    }
    let x = iconRect.x + 10
    let y = iconRect.y + 25

    // 滑动事件
    await program.swipe({
      startPoint: {x: x, y: y},
      endPoint: {x: x,y: y+15},
      duration: 200
    })

    await page.waitFor(1500);
    await page.callMethod('isPassTest1')
    const ret = await page.data('data.ret1')
    expect(ret).toBe(true)
  })

  it('touch-event-bubbles-test2', async () => {
    const pageData = await page.data('data')
    let viewEleRect = pageData.viewEleRect
    if (isHarmony && viewEleRect.x < 20) {
      viewEleRect.x = 144
    }
    let x = viewEleRect.x + 10
    let y = viewEleRect.y + 25

    // 滑动事件
    await program.swipe({
      startPoint: {x: x, y: y},
      endPoint: {x: x,y: y+15},
      duration: 200
    })

    await page.waitFor(1500);
    await page.callMethod('isPassTest2')
    const ret = await page.data('data.ret2')
    expect(ret).toBe(true)
  })
})
