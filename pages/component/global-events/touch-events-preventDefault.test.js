const PAGE_PATH = '/pages/component/global-events/touch-events-preventDefault'

describe('touch-events-test', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isMP = platformInfo.startsWith('mp')
  const isWeb = platformInfo.startsWith('web')

  if (isWeb || isMP) {
    it('other platform', () => {
      expect(1).toBe(1)
    })
    return
  }

  if (process.env.UNI_TEST_DEVICES_DIRECTION == 'landscape') {
    it('跳过横屏模式', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(500);
  })


  it('touch-event-list-preventdefault', async () => {

    let x = 25
    let y = 350

    // 横向滑动事件
    await program.swipe({
      startPoint: {x: x, y: y},
      endPoint: {x: x+200,y: y},
      duration: 300
    })

    // 竖向滑动事件
    await program.swipe({
      startPoint: {x: x, y: y},
      endPoint: {x: x, y: 100},
      duration: 300
    })

    await page.waitFor(500);
    const scrollTop = await page.data('scrollTop')
    console.log("scrollTop:", scrollTop.value)
    expect(scrollTop.value).toBeGreaterThan(0)
  })
})
