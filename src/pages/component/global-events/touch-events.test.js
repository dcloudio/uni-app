const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')

const PAGE_PATH = '/pages/component/global-events/touch-events'

describe('touch-events-test', () => {
  if (isAndroid || isMP || isWeb || process.env.UNI_TEST_DEVICES_DIRECTION == 'landscape') {
    it('other platform', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view');
    await page.waitFor(isWeb ? 5000 : 1000);
  })

  it('screenshot', async () => {
    const image = await program.screenshot({
      fullPage: true,
    });
    expect(image).toSaveImageSnapshot();
  });

  it('touchStart-tagName-touchCount', async () => {
    const pageData = await page.data('data')
    let iconRect = pageData.iconRect
    let x = iconRect.x + iconRect.width / 2.0
    let y = iconRect.y + iconRect.height / 2.0

    // 点击图片
    await program.tap({
      x: x,
      y: y,
      duration: 100
    })

    await page.waitFor(1500);
    const touchTargets = await page.data('data.touchTargets')
    const touchTargetsCount = await page.data('data.touchTargetsCount')

    console.log('touchTargets', touchTargets)
    console.log('touchTargetsCount', touchTargetsCount)

    expect(touchTargets).toBe("IMAGEIMAGEIMAGEVIEW")
    expect(touchTargetsCount).toBe(2)
  })

})
