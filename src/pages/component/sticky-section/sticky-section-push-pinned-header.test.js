const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isHarmony = platformInfo.startsWith('harmony')
const isWeb = platformInfo.startsWith('web')
const isVapor = process.env.UNI_APP_X_DOM2 === "true"

describe('component-native-sticky-section', () => {
  if (isMP || isWeb || (!isVapor && isHarmony)) {
  	it('skip', () => {
  		expect(1).toBe(1)
  	})
  	return
  }

  let page
  beforeAll(async () => {
    page = await program.reLaunch('/pages/component/sticky-section/sticky-section-push-pinned-header')
    await page.waitFor('view')
    await page.waitFor(1000);
  })

  it('check_push_pinned_header', async () => {
    // 滚动到B，期望headerB在headerA之下
    await page.callMethod('testScroll')
    await page.waitFor(1000)
    const image1 = await program.screenshot({fullPage: true});
    expect(image1).toSaveImageSnapshot();
    // 滚动到C，期望headerC在headerA之下，且将headerB顶出可视区，因为headerB对应的section的push-pinned-header为true
    await page.callMethod('testScroll')
    await page.waitFor(1000)
    const image2 = await program.screenshot({fullPage: true});
    expect(image2).toSaveImageSnapshot();
  })
})
